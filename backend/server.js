const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { createClient } = require("@supabase/supabase-js");


const app = express();
app.use(cors());
app.use(express.json());

const path = require('path');
app.use(express.static(path.join(__dirname, '..', 'ui-ux')));

app.listen(3000, () => console.log('Server running on http://localhost:3000'));

const opts = { auth: { autoRefreshToken: false, persistSession: false } };

const admin = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, opts);

const authClient = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_PUBLISHABLE_KEY, opts);

const BAN_FOREVER = "876000h"; 

async function loadAllowedProfile(userId) {
    const { data: profile, error } = await admin
        .from("app_users")
        .select("id, email, role, status, is_active, is_blocked, is_deleted, must_change_password")
        .eq("id", userId)
        .single();

    if (error || !profile || profile.is_deleted) {
        return { status: 403, error: "Account unavailable." };
    }
    if (profile.is_blocked) {
        return { status: 403, error: "Your account has been blocked. Contact an administrator." };
    }
    if (profile.status === "rejected") {
        return { status: 403, error: "Your account registration was not approved." };
    }
    if (profile.status === "approved" && !profile.is_active) {
        return { status: 403, error: "Your account is inactive. Contact an administrator." };
    }
    if (!profile.is_active || profile.status !== "approved") {
        return { status: 403, error: "Your account is pending approval." };
    }
    return { profile };
}

async function requireAuth(req, res, next) {
    const token = (req.headers.authorization || "").replace(/^Bearer\s+/i, "");
    if (!token) return res.status(401).json({ error: "Not authenticated." });

    const { data, error } = await admin.auth.getUser(token);
    if (error || !data.user) return res.status(401).json({ error: "Session expired. Please log in again." });

    const result = await loadAllowedProfile(data.user.id);
    if (result.error) return res.status(result.status).json({ error: result.error });

    req.token = token;
    req.user = data.user;
    req.profile = result.profile;
    next();
}

function requirePasswordSet(req, res, next) {
    if (req.profile.must_change_password) {
        return res.status(403).json({
            error: "You must set a new password first.",
            must_change_password: true
        });
    }
    next();
}

function requireAdmin(req, res, next) {
    if (!["admin", "superadmin"].includes(req.profile.role)) return res.status(403).json({ error: "Admins only." });
    next();
}

async function requireManageableUser(req, res, next) {
    const { data, error } = await admin
        .from("app_users")
        .select("id, role, status, is_active, is_blocked, is_deleted, email")
        .eq("id", req.params.id)
        .maybeSingle();
    if (error) return res.status(500).json({ error: "Unable to verify the target account." });
    if (!data || data.is_deleted) return res.status(404).json({ error: "User not found." });
    if (req.profile.role !== "superadmin" && ["admin", "superadmin"].includes(String(data.role).toLowerCase())) {
        return res.status(403).json({ error: "Admins cannot manage other admin accounts." });
    }
    req.targetProfile = data;
    next();
}

function requirePendingUser(req, res, next) {
    const target = req.targetProfile;
    if (target.is_blocked || ["approved", "rejected"].includes(target.status)) {
        return res.status(409).json({ error: "Only pending accounts can be approved or disapproved." });
    }
    next();
}


app.get("/api/test", async (req, res) => {
    const { data, error } = await admin.from("app_users").select("id").limit(1);
    if (error) return res.status(500).json({ success: false, error: error.message });
    res.json({ success: true, message: "Node.js connected to Supabase!", data });
});

app.post("/api/register", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ error: "Email and password are required." });
    if (password.length < 8) return res.status(400).json({ error: "Password must be at least 8 characters." });

    try {
        const { data, error } = await admin.auth.admin.createUser({
            email,
            password,
            email_confirm: true
        });

        if (error) return res.status(400).json({ error: error.message });

        res.status(201).json({
            message: "Registration successful. Your account is pending approval.",
            user: { id: data.user.id, email }
        });
    } catch (err) {
        console.error("Registration error:", err);
        res.status(500).json({ error: "Server error during registration." });
    }
});

app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and password are required." });

    try {
        const { data: existing } = await admin
            .from("app_users")
            .select("id")
            .ilike("email", email)
            .maybeSingle();

        if (existing) {
            const pre = await loadAllowedProfile(existing.id);
            if (pre.error) return res.status(pre.status).json({ error: pre.error });
        }

        const { data, error } = await authClient.auth.signInWithPassword({ email, password });
        if (error || !data.session) {
            return res.status(401).json({ error: "Invalid email or password." });
        }

        const result = await loadAllowedProfile(data.user.id);
        if (result.error) {
            await admin.auth.admin.signOut(data.session.access_token, "global").catch(() => {});
            return res.status(result.status).json({ error: result.error });
        }

        res.json({
            access_token: data.session.access_token,
            refresh_token: data.session.refresh_token,
            expires_at: data.session.expires_at,
            must_change_password: result.profile.must_change_password,
            user: {
                id: result.profile.id,
                email: result.profile.email,
                role: result.profile.role
            }
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error: "Server error during login." });
    }
});

app.post("/api/refresh", async (req, res) => {
    const { refresh_token } = req.body;
    if (!refresh_token) return res.status(400).json({ error: "Refresh token required." });

    const { data, error } = await authClient.auth.refreshSession({ refresh_token });
    if (error || !data.session) return res.status(401).json({ error: "Session expired. Please log in again." });

    const result = await loadAllowedProfile(data.user.id);
    if (result.error) {
        await admin.auth.admin.signOut(data.session.access_token, "global").catch(() => {});
        return res.status(result.status).json({ error: result.error });
    }

    res.json({
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
        expires_at: data.session.expires_at,
        must_change_password: result.profile.must_change_password
    });
});

app.post("/api/logout", async (req, res) => {
    const token = (req.headers.authorization || "").replace(/^Bearer\s+/i, "");
    if (token) await admin.auth.admin.signOut(token, "global").catch(() => {});
    res.json({ message: "Logged out." });
});

app.post("/api/request-password-reset", async (req, res) => {
    const email = typeof req.body.email === "string" ? req.body.email.trim() : "";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: "Enter a valid email address." });
    }

    try {
        const { error } = await authClient.auth.resetPasswordForEmail(email);
        if (error) {
            console.error("Password reset email error:", error);
            return res.status(error.status === 429 ? 429 : 502).json({
                error: "Unable to send a reset code. Please try again later."
            });
        }
        res.json({ message: "If an account exists for this email, a verification code has been sent." });
    } catch (err) {
        console.error("Password reset email error:", err);
        res.status(500).json({ error: "Unable to send a reset code. Please try again later." });
    }
});

app.post("/api/verify-password-reset", async (req, res) => {
    const email = typeof req.body.email === "string" ? req.body.email.trim() : "";
    const code = typeof req.body.code === "string" ? req.body.code.trim() : "";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !/^\d{8}$/.test(code)) {
        return res.status(400).json({ error: "Enter a valid email address and eight-digit code." });
    }

    try {
        const recoveryClient = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_PUBLISHABLE_KEY, opts);
        const { data, error } = await recoveryClient.auth.verifyOtp({
            email,
            token: code,
            type: "recovery"
        });
        if (error || !data.session) {
            return res.status(400).json({ error: "The verification code is invalid or expired." });
        }
        res.json({ access_token: data.session.access_token });
    } catch (err) {
        console.error("Password reset verification error:", err);
        res.status(500).json({ error: "Unable to verify the reset code. Please try again." });
    }
});

app.post("/api/reset-password", async (req, res) => {
    const token = (req.headers.authorization || "").replace(/^Bearer\s+/i, "");
    const { newPassword } = req.body;
    if (!token) return res.status(401).json({ error: "Password reset verification is required." });
    if (typeof newPassword !== "string" || newPassword.length < 8) {
        return res.status(400).json({ error: "Password must be at least 8 characters." });
    }

    try {
        const { data, error: tokenError } = await admin.auth.getUser(token);
        if (tokenError || !data.user) {
            return res.status(401).json({ error: "The reset session is invalid or expired. Request a new code." });
        }

        const { error } = await admin.auth.admin.updateUserById(data.user.id, { password: newPassword });
        if (error) return res.status(400).json({ error: error.message });
        res.json({ message: "Password reset successfully." });
    } catch (err) {
        console.error("Password reset error:", err);
        res.status(500).json({ error: "Unable to reset the password. Please try again." });
    }
});

app.get("/api/me", requireAuth, (req, res) => {
    res.json({ user: req.profile });
});

app.post("/api/set-password", requireAuth, async (req, res) => {
    const { newPassword } = req.body;
    if (!newPassword || newPassword.length < 8) {
        return res.status(400).json({ error: "Password must be at least 8 characters." });
    }

    const { error } = await admin.auth.admin.updateUserById(req.user.id, { password: newPassword });
    if (error) return res.status(400).json({ error: error.message });

    await admin.from("app_users").update({ must_change_password: false }).eq("id", req.user.id);

    res.json({ message: "Password updated." });
});

app.get("/api/dashboard", requireAuth, requirePasswordSet, (req, res) => {
    res.json({ message: `Welcome, ${req.profile.email}` });
});


app.get("/api/admin/users", requireAuth, requirePasswordSet, requireAdmin, async (req, res) => {
    const { data, error } = await admin
        .from("app_users")
        .select("id, email, role, status, is_active, is_blocked, is_deleted, created_at")
        .order("created_at", { ascending: false });
    if (error) return res.status(400).json({ error: error.message });

    const authUsers = [];
    for (let page = 1; ; page += 1) {
        const { data: authData, error: authError } = await admin.auth.admin.listUsers({ page, perPage: 1000 });
        if (authError) return res.status(500).json({ error: "Unable to load account details." });
        authUsers.push(...authData.users);
        if (authData.users.length < 1000) break;
    }

    const authUsersById = new Map(authUsers.map(user => [user.id, user]));
    const users = (data || [])
        .filter(user => req.profile.role === "superadmin" || String(user.role).toLowerCase() !== "superadmin")
        .map(user => {
            const authUser = authUsersById.get(user.id);
            const metadata = authUser ? authUser.user_metadata || {} : {};
            return {
                ...user,
                first_name: metadata.first_name || "",
                last_name: metadata.last_name || ""
            };
        });
    res.json({ users });
});

app.put("/api/admin/users/:id", requireAuth, requirePasswordSet, requireAdmin, requireManageableUser, async (req, res) => {
    const firstName = typeof req.body.firstName === "string" ? req.body.firstName.trim() : "";
    const lastName = typeof req.body.lastName === "string" ? req.body.lastName.trim() : "";
    const email = typeof req.body.email === "string" ? req.body.email.trim() : "";
    const role = typeof req.body.role === "string" ? req.body.role.trim().toLowerCase() : "";
    const status = typeof req.body.status === "string" ? req.body.status.trim().toLowerCase() : "";
    if (firstName.length > 100 || lastName.length > 100) return res.status(400).json({ error: "Names must be 100 characters or fewer." });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: "Enter a valid email address." });
    if (!["user", "admin", "superadmin"].includes(role)) return res.status(400).json({ error: "Select a valid role." });
    if (req.profile.role !== "superadmin" && role !== "user") {
        return res.status(403).json({ error: "Only a superadmin can assign admin roles." });
    }
    if (!["active", "inactive", "pending", "blocked", "disapproved"].includes(status)) {
        return res.status(400).json({ error: "Select a valid account status." });
    }

    const { data: authUserData, error: authUserError } = await admin.auth.admin.getUserById(req.params.id);
    if (authUserError || !authUserData.user) return res.status(404).json({ error: "Authentication account not found." });
    const authUser = authUserData.user;
    const authUpdates = {
        user_metadata: { ...authUser.user_metadata, first_name: firstName, last_name: lastName }
    };
    if (email.toLowerCase() !== (req.targetProfile.email || "").toLowerCase()) {
        authUpdates.email = email;
        authUpdates.email_confirm = true;
    }
    if ((status === "blocked") !== req.targetProfile.is_blocked) {
        authUpdates.ban_duration = status === "blocked" ? BAN_FOREVER : "none";
    }
    const { error: authError } = await admin.auth.admin.updateUserById(req.params.id, authUpdates);
    if (authError) return res.status(400).json({ error: authError.message });

    const profileUpdates = {
        email,
        role,
        status: ["active", "inactive", "blocked"].includes(status) ? "approved" : status === "disapproved" ? "rejected" : "pending",
        is_active: status === "active" || status === "blocked",
        is_blocked: status === "blocked"
    };
    const { error: profileError } = await admin.from("app_users").update(profileUpdates).eq("id", req.params.id);
    if (profileError) {
        console.error("Update user profile error:", profileError);
        return res.status(500).json({ error: "Authentication was updated, but the user profile could not be saved." });
    }
    res.json({ message: "User account updated." });
});

app.post("/api/admin/users/:id/approve", requireAuth, requirePasswordSet, requireAdmin, requireManageableUser, requirePendingUser, async (req, res) => {
    const { error } = await admin
        .from("app_users")
        .update({ status: "approved", is_active: true })
        .eq("id", req.params.id);
    if (error) return res.status(400).json({ error: error.message });
    res.json({ message: "User approved." });
});

app.post("/api/admin/users/:id/disapprove", requireAuth, requirePasswordSet, requireAdmin, requireManageableUser, requirePendingUser, async (req, res) => {
    const { error } = await admin.from("app_users").update({ status: "rejected", is_active: false }).eq("id", req.params.id);
    if (error) return res.status(400).json({ error: error.message });
    res.json({ message: "User disapproved." });
});

app.post("/api/admin/users/:id/block", requireAuth, requirePasswordSet, requireAdmin, requireManageableUser, async (req, res) => {
    const id = req.params.id;
    if (id === req.user.id) return res.status(400).json({ error: "You cannot block yourself." });

    const { error } = await admin.from("app_users").update({ is_blocked: true, is_active: true, status: "approved" }).eq("id", id);
    if (error) return res.status(400).json({ error: error.message });

    const { error: banError } = await admin.auth.admin.updateUserById(id, { ban_duration: BAN_FOREVER });
    if (banError) return res.status(400).json({ error: banError.message });

    res.json({ message: "User blocked." });
});

app.post("/api/admin/users/:id/unblock", requireAuth, requirePasswordSet, requireAdmin, requireManageableUser, async (req, res) => {
    const id = req.params.id;

    const { error } = await admin.from("app_users").update({ is_blocked: false }).eq("id", id);
    if (error) return res.status(400).json({ error: error.message });

    const { error: banError } = await admin.auth.admin.updateUserById(id, { ban_duration: "none" });
    if (banError) return res.status(400).json({ error: banError.message });

    res.json({ message: "User unblocked." });
});

app.post("/api/admin/users", requireAuth, requirePasswordSet, requireAdmin, async (req, res) => {
    const firstName = typeof req.body.firstName === "string" ? req.body.firstName.trim() : "";
    const lastName = typeof req.body.lastName === "string" ? req.body.lastName.trim() : "";
    const email = typeof req.body.email === "string" ? req.body.email.trim() : "";
    const tempPassword = typeof req.body.tempPassword === "string" ? req.body.tempPassword : "";
    const role = typeof req.body.role === "string" ? req.body.role.trim().toLowerCase() : "user";
    const status = typeof req.body.status === "string" ? req.body.status.trim().toLowerCase() : "active";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !tempPassword || tempPassword.length < 8) {
        return res.status(400).json({ error: "Email and a temporary password (min 8 chars) are required." });
    }
    if (firstName.length > 100 || lastName.length > 100) return res.status(400).json({ error: "Names must be 100 characters or fewer." });
    if (!["user", "admin", "superadmin"].includes(role)) return res.status(400).json({ error: "Select a valid role." });
    if (req.profile.role !== "superadmin" && role !== "user") {
        return res.status(403).json({ error: "Only a superadmin can create admin accounts." });
    }
    if (!["active", "inactive", "pending", "blocked", "disapproved"].includes(status)) {
        return res.status(400).json({ error: "Select a valid account status." });
    }

    const { data, error } = await admin.auth.admin.createUser({
        email,
        password: tempPassword,
        email_confirm: true,
        user_metadata: { first_name: firstName, last_name: lastName }
    });
    if (error) return res.status(400).json({ error: error.message });

    if (status === "blocked") {
        const { error: banError } = await admin.auth.admin.updateUserById(data.user.id, { ban_duration: BAN_FOREVER });
        if (banError) return res.status(500).json({ error: "User was created, but the blocked status could not be applied." });
    }

    const { error: updateError } = await admin
        .from("app_users")
        .update({
            role,
            status: ["active", "inactive", "blocked"].includes(status) ? "approved" : status === "disapproved" ? "rejected" : "pending",
            is_active: status === "active" || status === "blocked",
            is_blocked: status === "blocked",
            must_change_password: true
        })
        .eq("id", data.user.id);
    if (updateError) return res.status(500).json({ error: "User was created, but the profile status could not be saved." });

    res.status(201).json({ message: "User created with " + status + " status." });
});


const PORT = 3000;
app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(cors());
app.use(express.json());

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
    if (req.profile.role !== "admin") return res.status(403).json({ error: "Admins only." });
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
    res.json({ users: data });
});

app.post("/api/admin/users/:id/approve", requireAuth, requirePasswordSet, requireAdmin, async (req, res) => {
    const { error } = await admin
        .from("app_users")
        .update({ status: "approved", is_active: true })
        .eq("id", req.params.id);
    if (error) return res.status(400).json({ error: error.message });
    res.json({ message: "User approved." });
});

app.post("/api/admin/users/:id/block", requireAuth, requirePasswordSet, requireAdmin, async (req, res) => {
    const id = req.params.id;
    if (id === req.user.id) return res.status(400).json({ error: "You cannot block yourself." });

    const { error } = await admin.from("app_users").update({ is_blocked: true }).eq("id", id);
    if (error) return res.status(400).json({ error: error.message });

    const { error: banError } = await admin.auth.admin.updateUserById(id, { ban_duration: BAN_FOREVER });
    if (banError) return res.status(400).json({ error: banError.message });

    res.json({ message: "User blocked." });
});

app.post("/api/admin/users/:id/unblock", requireAuth, requirePasswordSet, requireAdmin, async (req, res) => {
    const id = req.params.id;

    const { error } = await admin.from("app_users").update({ is_blocked: false }).eq("id", id);
    if (error) return res.status(400).json({ error: error.message });

    const { error: banError } = await admin.auth.admin.updateUserById(id, { ban_duration: "none" });
    if (banError) return res.status(400).json({ error: banError.message });

    res.json({ message: "User unblocked." });
});

app.post("/api/admin/users", requireAuth, requirePasswordSet, requireAdmin, async (req, res) => {
    const { email, tempPassword } = req.body;
    if (!email || !tempPassword || tempPassword.length < 8) {
        return res.status(400).json({ error: "Email and a temporary password (min 8 chars) are required." });
    }

    const { data, error } = await admin.auth.admin.createUser({
        email,
        password: tempPassword,
        email_confirm: true
    });
    if (error) return res.status(400).json({ error: error.message });

    const { error: updateError } = await admin
        .from("app_users")
        .update({ status: "approved", is_active: true, must_change_password: true })
        .eq("id", data.user.id);
    if (updateError) return res.status(400).json({ error: updateError.message });

    res.status(201).json({ message: "User created. They must set a new password on first login." });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));
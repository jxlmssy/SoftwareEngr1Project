const express = require("express");
const cors = require("cors");
require("dotenv").config(); // loads SUPABASE_* keys from the .env file
 
const { createClient } = require("@supabase/supabase-js");
 
const app = express();
app.use(cors());          // allow cross-origin requests
app.use(express.json());  // parse JSON request bodies
 
// Serve the front-end files (HTML/CSS/JS) from the sibling "ui-ux" folder
const path = require('path');
app.use(express.static(path.join(__dirname, '..', 'ui-ux')));
 
 
// Supabase client options: this is a server, so don't store or auto-refresh sessions
const opts = { auth: { autoRefreshToken: false, persistSession: false } };
 
// "admin" client uses the SERVICE ROLE key: full access, bypasses row-level
// security. Used for database queries and auth admin operations. Never expose it to the browser.
const admin = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, opts);
 
// "authClient" uses the public/publishable key: used for user-facing auth
// actions such as signing in, refreshing sessions and sending reset emails.
const authClient = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_PUBLISHABLE_KEY, opts);
 
// Ban duration used to "block" a user in Supabase Auth (876000 hours is roughly 100 years)
const BAN_FOREVER = "876000h"; 
 

// ACCOUNT STATE CHECK

// Loads a user's profile from app_users and decides whether they may use the
// system. Returns { profile } if allowed, or { status, error } with a
// user-friendly message for: deleted, blocked, rejected, inactive, or pending.
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
    // Anything else that isn't approved + active is treated as still pending
    if (!profile.is_active || profile.status !== "approved") {
        return { status: 403, error: "Your account is pending approval." };
    }
    return { profile };
}

// MIDDLEWARE (reusable checks that run before route handlers)

 
// Requires a valid Bearer token. Verifies it with Supabase, loads the user's
// profile, rejects unapproved/blocked accounts, then attaches
// req.token, req.user (auth user) and req.profile (app_users row).
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
 
// Blocks access until the user has replaced their temporary password
function requirePasswordSet(req, res, next) {
    if (req.profile.must_change_password) {
        return res.status(403).json({
            error: "You must set a new password first.",
            must_change_password: true
        });
    }
    next();
}
 
// Only admins and superadmins may continue
function requireAdmin(req, res, next) {
    if (!["admin", "superadmin"].includes(req.profile.role)) return res.status(403).json({ error: "Admins only." });
    next();
}
 
// For routes with /:id. Loads the target user and makes sure the caller is
// allowed to manage them: the target must exist and not be deleted, and only
// a superadmin may manage admin/superadmin accounts. Sets req.targetProfile.
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
 
// Approve/disapprove only apply to accounts that are still pending and not blocked
function requirePendingUser(req, res, next) {
    const target = req.targetProfile;
    if (target.is_blocked || target.status !== "pending") {
        return res.status(409).json({ error: "Only pending accounts can be approved or disapproved." });
    }
    next();
}
 

// MODULE ACCESS HELPERS
// Modules are numbered 1-5: 1 Customer, 2 Product, 3 HR, 4 Sales, 5 Reports

const ALL_MODULES = [1, 2, 3, 4, 5];
 
// Returns the module ids a user may see. Admins/superadmins get all of them;
// regular users get the list saved in app_metadata.modules (sanitised to valid numbers).
function allowedModules(authUser, profile) {
    if (["admin", "superadmin"].includes(profile.role)) return ALL_MODULES;
    const m = authUser && authUser.app_metadata && authUser.app_metadata.modules;
    return Array.isArray(m) ? m.map(Number).filter(n => ALL_MODULES.includes(n)) : [];
}
 
 
 
// Blocks the route unless the given module is enabled for this user
function requireModule(moduleId) {
    return (req, res, next) => {
        if (!allowedModules(req.user, req.profile).includes(moduleId)) {
            return res.status(403).json({ error: "You do not have access to this module." });
        }
        next();
    };
}
 
// Stricter than requireModule: the module must be visible AND the specific
// right (e.g. "customer_add") must be granted. Admins skip the right check.
// The right name is looked up in rights_catalogue to get its id, then compared
// with the user's saved permissions in app_metadata.permissions.
// (Defined here but not currently used by any route in this file.)
function requireRight(moduleId, rightName) {
    return async (req, res, next) => {
        if (!allowedModules(req.user, req.profile).includes(moduleId)) {
            return res.status(403).json({ error: "You do not have access to this module." });
        }
        if (["admin", "superadmin"].includes(req.profile.role)) return next();
        const { data, error } = await admin.from("rights_catalogue").select("right_id")
            .eq("right_name", rightName).eq("is_deleted", false).maybeSingle();
        const perms = (req.user.app_metadata && req.user.app_metadata.permissions) || [];
        if (error || !data || !perms.some(p => Number(p.module_id) === moduleId && Number(p.right_id) === Number(data.right_id))) {
            return res.status(403).json({ error: "You do not have permission to do this." });
        }
        next();
    };
}
 
// PUBLIC / AUTH ROUTES

// Health check: confirms the server can reach Supabase
app.get("/api/test", async (req, res) => {
    const { data, error } = await admin.from("app_users").select("id").limit(1);
    if (error) return res.status(500).json({ success: false, error: error.message });
    res.json({ success: true, message: "Node.js connected to Supabase!", data });
});
 
// Self-registration. Creates the Supabase auth user (email auto-confirmed).
// The account then waits for admin approval before it can log in
// (the app_users profile row is presumably created by a database trigger).
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
 
// Login. Steps:
//  1. If the email matches a known profile, check its status first so blocked/
//     pending users get a specific message instead of a generic failure.
//  2. Sign in with Supabase using email + password.
//  3. Re-check the profile; if not allowed, revoke the new session.
//  4. Return tokens, the must_change_password flag, and basic user info + modules.
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and password are required." });
 
    try {
        const { data: existing } = await admin
            .from("app_users")
            .select("id")
            .ilike("email", email)   // case-insensitive match
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
            // Not allowed: sign the session out everywhere
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
                role: result.profile.role,
                modules: allowedModules(data.user, result.profile)
            }
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error: "Server error during login." });
    }
});
 
// Exchange a refresh token for a new access token (called by the front-end
// when /me returns 401). Also re-checks the account so a user who was blocked
// meanwhile can't keep renewing their session.
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
 
// Logout: revokes the user's sessions on all devices ("global"). Always succeeds.
app.post("/api/logout", async (req, res) => {
    const token = (req.headers.authorization || "").replace(/^Bearer\s+/i, "");
    if (token) await admin.auth.admin.signOut(token, "global").catch(() => {});
    res.json({ message: "Logged out." });
});
 
// ---------------------------------------------------------------------
// PASSWORD RESET FLOW (3 steps)
//   1. request-password-reset : email a verification code
//   2. verify-password-reset  : exchange email + code for a short-lived token
//   3. reset-password         : use that token to set the new password
// ---------------------------------------------------------------------
 
// Step 1: send the reset code. The success message is deliberately vague
// ("If an account exists...") so it doesn't reveal which emails are registered.
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
 
// Step 2: verify the 8-digit code. A fresh client is used so the recovery
// session doesn't touch any shared client. Returns a recovery access token.
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
 
// Step 3: set the new password using the recovery token from step 2
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
 

// LOGGED-IN USER ROUTES
 
// Returns the current user's profile plus the modules they can access
app.get("/api/me", requireAuth, (req, res) => {
    res.json({ user: { ...req.profile, modules: allowedModules(req.user, req.profile) } });
});
 
// Set a new password (used for the forced first-login change) and clear the
// must_change_password flag.
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
 
// Simple welcome message; requires a real (non-temporary) password
app.get("/api/dashboard", requireAuth, requirePasswordSet, (req, res) => {
    res.json({ message: `Welcome, ${req.profile.email}` });
});
 
 

// ADMIN: USER MANAGEMENT
 
// List all users. Joins app_users (role/status) with Supabase Auth data
// Admins don't see superadmin accounts.
app.get("/api/admin/users", requireAuth, requirePasswordSet, requireAdmin, async (req, res) => {
    const { data, error } = await admin
        .from("app_users")
        .select("id, email, role, status, is_active, is_blocked, is_deleted, created_at")
        .order("created_at", { ascending: false });
    if (error) return res.status(400).json({ error: error.message });
 
    // Page through every auth user
    const authUsers = [];
    for (let page = 1; ; page += 1) {
        const { data: authData, error: authError } = await admin.auth.admin.listUsers({ page, perPage: 1000 });
        if (authError) return res.status(500).json({ error: "Unable to load account details." });
        authUsers.push(...authData.users);
        if (authData.users.length < 1000) break; // last page reached
    }
 
    // Merge the names into the profile rows
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
 
// List every available right (id + name) so the front-end can map checkbox
// labels to right ids in the Rights modal
app.get("/api/rights-catalogue", requireAuth, requirePasswordSet, requireAdmin, async (req, res) => {
    try {
        const { data, error } = await admin
            .from("rights_catalogue")
            .select("right_id, right_name")
            .eq("is_deleted", false)
            .order("right_name", { ascending: true });
        if (error) throw error;
        res.json({
            rights: data || []
        });
    } catch (error) {
        console.error("Rights catalogue error:", error);
        res.status(500).json({
            error: "Unable to load rights catalogue."
        });
    }
});
 
// Edit a user: name, email, role and status. Validates input, enforces that
// only a superadmin can assign admin roles, updates Supabase Auth (metadata,
// email, ban state), then updates the app_users profile row.
app.put("/api/admin/users/:id", requireAuth, requirePasswordSet, requireAdmin, requireManageableUser, async (req, res) => {
    // Read and normalise inputs
    const firstName = typeof req.body.firstName === "string" ? req.body.firstName.trim() : "";
    const lastName = typeof req.body.lastName === "string" ? req.body.lastName.trim() : "";
    const email = typeof req.body.email === "string" ? req.body.email.trim() : "";
    const role = typeof req.body.role === "string" ? req.body.role.trim().toLowerCase() : "";
    const status = typeof req.body.status === "string" ? req.body.status.trim().toLowerCase() : "";
    // Validation
    if (firstName.length > 100 || lastName.length > 100) return res.status(400).json({ error: "Names must be 100 characters or fewer." });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: "Enter a valid email address." });
    if (!["user", "admin", "superadmin"].includes(role)) return res.status(400).json({ error: "Select a valid role." });
    if (req.profile.role !== "superadmin" && role !== "user") {
        return res.status(403).json({ error: "Only a superadmin can assign admin roles." });
    }
    if (!["active", "inactive", "pending", "blocked", "disapproved"].includes(status)) {
        return res.status(400).json({ error: "Select a valid account status." });
    }
 
    // Update the Supabase Auth side first
    const { data: authUserData, error: authUserError } = await admin.auth.admin.getUserById(req.params.id);
    if (authUserError || !authUserData.user) return res.status(404).json({ error: "Authentication account not found." });
    const authUser = authUserData.user;
    const authUpdates = {
        user_metadata: { ...authUser.user_metadata, first_name: firstName, last_name: lastName }
    };
    // Only change the email if it actually changed
    if (email.toLowerCase() !== (req.targetProfile.email || "").toLowerCase()) {
        authUpdates.email = email;
        authUpdates.email_confirm = true;
    }
    // Only change the ban if the blocked state is changing
    if ((status === "blocked") !== req.targetProfile.is_blocked) {
        authUpdates.ban_duration = status === "blocked" ? BAN_FOREVER : "none";
    }
    const { error: authError } = await admin.auth.admin.updateUserById(req.params.id, authUpdates);
    if (authError) return res.status(400).json({ error: authError.message });
 
    // Then the app_users profile: map the UI status to status/is_active/is_blocked
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
 
// Read a user's saved rights and modules 
app.get("/api/admin/users/:id/rights", requireAuth, requirePasswordSet, requireAdmin, async (req, res) => {
    try {
        const userId = req.params.id;
 
        const { data: authData, error: authError } =
            await admin.auth.admin.getUserById(userId);
        if (authError || !authData.user) {
            return res.status(404).json({
                error: "User not found."
            });
        }
        const savedPermissions =
            authData.user.app_metadata?.permissions || [];
        res.json({
            permissions: savedPermissions,
            modules: authData.user.app_metadata?.modules || []
        });
    } catch (error) {
        console.error("Load rights error:", error);
        res.status(500).json({
            error: "Unable to load rights."
        });
    }
});
 
 
// Save a user's rights. Validates every { module_id, right_id } pair:
//  - the module must be 1-5
//  - the right must exist in rights_catalogue
// Duplicates are dropped. The visible modules saved are the modules of the
// chosen rights plus any extra modules sent in req.body.modules.
app.put("/api/admin/users/:id/rights", requireAuth, requirePasswordSet, requireAdmin, async (req, res) => {
        try {
            const userId = req.params.id;
            const permissions = req.body.permissions;
 
            if (!Array.isArray(permissions)) {
                return res.status(400).json({
                    error: "Permissions must be an array."
                });
            }
            // Make sure the target user exists
            const { data: user, error: userError } = await admin
                .from("app_users")
                .select("id, role")
                .eq("id", userId)
                .maybeSingle();
 
            if (userError) throw userError;
            if (!user) {
                return res.status(404).json({
                    error: "User not found."
                });
            }
            // Load the valid rights (id -> name)
            const { data: catalogue, error: catalogueError } = await admin
                .from("rights_catalogue")
                .select("right_id, right_name")
                .eq("is_deleted", false);
 
            if (catalogueError) throw catalogueError;
 
            const validRights = new Map(
                (catalogue || []).map(right => [
                    Number(right.right_id),
                    right.right_name
                ])
            );
 
            const modulePrefixes = {
                1: "customer_",
                2: "product_",
                3: "hr_",
                4: "sales_",
                5: "reports_"
            };
            const savedPermissions = [];
            const seen = new Set(); // for removing duplicates
 
            for (const permission of permissions) {
                const moduleId = Number(permission.module_id);
                const rightId = Number(permission.right_id);
 
                const rightName = validRights.get(rightId);
 
                if (!modulePrefixes[moduleId]) {
                    return res.status(400).json({
                        error: "Invalid module selected."
                    });
                }
                if (!rightName ||
                    !rightName.startsWith(modulePrefixes[moduleId])) {
                    return res.status(400).json({
                        error: "Invalid right selected for this module."
                    });
                }
                const key = `${moduleId}-${rightId}`;
                if (seen.has(key)) continue;
                seen.add(key);
                savedPermissions.push({
                    module_id: moduleId,
                    right_id: rightId
                });
            }
            const { data: authData, error: authError } =
                await admin.auth.admin.getUserById(userId);
            if (authError) throw authError;
            const existingMetadata =
                authData.user.app_metadata || {};
 
            // Modules explicitly ticked as visible (even with no individual rights)
            const extraModules = Array.isArray(req.body.modules)
                ? req.body.modules.map(Number).filter(n => modulePrefixes[n])
                : [];
            const savedModules = [
                ...new Set([...savedPermissions.map(p => p.module_id), ...extraModules])
            ];
            const { error: updateError } =
                await admin.auth.admin.updateUserById(userId, {
                    app_metadata: {
                        ...existingMetadata,
                        permissions: savedPermissions,
                        modules: savedModules
                    }
                });
            if (updateError) throw updateError;
            res.json({
                message: "Rights saved successfully.",
                count: savedPermissions.length
            });
        } catch (error) {
            console.error("Save rights error:", error);
            res.status(500).json({
                error: "Unable to save rights."
            });
        }
    }
);
 

// DATA ENDPOINTS (read-only lists shown in the dashboard tables)

// All customers, newest customer number first
app.get("/api/customer", requireAuth, async (req, res) => {
  const { data, error } = await admin
    .from("customer")
    .select("custno, custname, address, payterm, is_deleted, stamp")
    .order("custno", { ascending: false });
  if (error) {
    console.error("Customer load error:", error);
    return res.status(500).json({ error: "Unable to load customers." });
  }
  res.json({ rows: data });
});
 
// All products with their current price. Prices come from the price-history
// table, sorted newest first, so the first price seen for each product code is
// the latest one. Products with no price history show 0.
app.get("/api/product", requireAuth, async (req, res) => {
  const { data: products, error } = await admin
    .from("product")
    .select("prodcode, description, unit, is_deleted, stamp")
    .order("prodcode");
  if (error) {
    console.error("Product load error:", error);
    return res.status(500).json({ error: "Unable to load products." });
  }
 
  const { data: prices, error: priceError } = await admin
    .from("pricehist")
    .select("prodcode, unitprice, effdate")
    .order("effdate", { ascending: false });
  if (priceError) console.error("Price load error:", priceError);
 
 
  // Map of prodcode -> latest unit price
  const latest = new Map();
  (prices || []).forEach(p => {
    if (!latest.has(p.prodcode)) latest.set(p.prodcode, p.unitprice);
  });
 
  res.json({
    rows: products.map(p => ({ ...p, price: latest.get(p.prodcode) ?? 0 }))
  });
});
 
// All employees. Only users with access to module 3 (Human Resources) may call this.
app.get("/api/employee", requireAuth, requireModule(3), async (req, res) => {
  const { data, error } = await admin
    .from("employee")
    .select("empno, lastname, firstname, gender, birthdate, hiredate, sepdate, is_deleted, stamp")
    .order("empno");
  if (error) {
    console.error("Employee load error:", error);
    return res.status(500).json({ error: "Unable to load employees." });
  }
  res.json({ rows: data });
});
 
// All sales, newest first. "transno" is renamed to "id" to match what the front-end expects.
app.get("/api/sales", requireAuth, async (req, res) => {
  const { data, error } = await admin
    .from("sales")
    .select("transno, salesdate, custno, empno, is_deleted, stamp")
    .order("salesdate", { ascending: false });
  if (error) {
    console.error("Sales load error:", error);
    return res.status(500).json({ error: "Unable to load sales." });
  }
  res.json({ rows: data.map(s => ({
    id: s.transno,
    salesdate: s.salesdate,
    custno: s.custno,
    empno: s.empno,
    is_deleted: s.is_deleted,
    stamp: s.stamp
  })) });
});
 

// ADMIN: ACCOUNT STATUS ACTIONS

// Approve a pending account: marks it approved and active
app.post("/api/admin/users/:id/approve", requireAuth, requirePasswordSet, requireAdmin, requireManageableUser, requirePendingUser, async (req, res) => {
    const { error } = await admin
        .from("app_users")
        .update({ status: "approved", is_active: true })
        .eq("id", req.params.id);
    if (error) return res.status(400).json({ error: error.message });
    res.json({ message: "User approved." });
});
 
// Disapprove (reject) a pending account
app.post("/api/admin/users/:id/disapprove", requireAuth, requirePasswordSet, requireAdmin, requireManageableUser, requirePendingUser, async (req, res) => {
    const { error } = await admin.from("app_users").update({ status: "rejected", is_active: false }).eq("id", req.params.id);
    if (error) return res.status(400).json({ error: error.message });
    res.json({ message: "User disapproved." });
});
 
// Block a user: flags the profile and bans them in Supabase Auth so they
// can't sign in. Admins cannot block themselves.
app.post("/api/admin/users/:id/block", requireAuth, requirePasswordSet, requireAdmin, requireManageableUser, async (req, res) => {
    const id = req.params.id;
    if (id === req.user.id) return res.status(400).json({ error: "You cannot block yourself." });
 
    const { error } = await admin.from("app_users").update({ is_blocked: true, is_active: true, status: "approved" }).eq("id", id);
    if (error) return res.status(400).json({ error: error.message });
 
    const { error: banError } = await admin.auth.admin.updateUserById(id, { ban_duration: BAN_FOREVER });
    if (banError) return res.status(400).json({ error: banError.message });
 
    res.json({ message: "User blocked." });
});
 
// Unblock a user: clears the profile flag and lifts the auth ban
app.post("/api/admin/users/:id/unblock", requireAuth, requirePasswordSet, requireAdmin, requireManageableUser, async (req, res) => {
    const id = req.params.id;
 
    const { error } = await admin.from("app_users").update({ is_blocked: false }).eq("id", id);
    if (error) return res.status(400).json({ error: error.message });
 
    const { error: banError } = await admin.auth.admin.updateUserById(id, { ban_duration: "none" });
    if (banError) return res.status(400).json({ error: banError.message });
 
    res.json({ message: "User unblocked." });
});
 
// Create a user directly (admin action). The account is created with a
// temporary password and must_change_password = true, so the user is forced to
// pick their own password at first login. Role and status are validated, and
// only a superadmin can create admin accounts.
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
 
    // Create the auth account (names are saved in user_metadata)
    const { data, error } = await admin.auth.admin.createUser({
        email,
        password: tempPassword,
        email_confirm: true,
        user_metadata: { first_name: firstName, last_name: lastName }
    });
    if (error) return res.status(400).json({ error: error.message });
 
    // If created as blocked, apply the auth ban too
    if (status === "blocked") {
        const { error: banError } = await admin.auth.admin.updateUserById(data.user.id, { ban_duration: BAN_FOREVER });
        if (banError) return res.status(500).json({ error: "User was created, but the blocked status could not be applied." });
    }
 
    // Update the profile row with the chosen role/status and force a password change
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
 
 
// Start the server on port 3000
const PORT = 3000;
app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));
 

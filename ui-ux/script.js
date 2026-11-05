document.addEventListener("DOMContentLoaded", function () {
    const API = "/api";

    const landingView = document.getElementById("landingView");
    const dashboardView = document.getElementById("dashboardView");
    const authModalOverlay = document.getElementById("authModalOverlay");
    const closeModalBtn = document.getElementById("closeModalBtn");

    const signInScreen = document.getElementById("signInScreen");
    const registerScreen = document.getElementById("registerScreen");
    const resetScreen = document.getElementById("resetScreen");
    const resetMessage = document.getElementById("resetMessage");
    const userManagementNav = document.getElementById("userManagementNav");
    const administrationLabel = document.getElementById("administrationLabel");
    const dashboardHome = document.getElementById("dashboardHome");
    const userManagementView = document.getElementById("userManagementView");
    const usersTableBody = document.getElementById("usersTableBody");
    const userManagementFeedback = document.getElementById("userManagementFeedback");
    const addUserModal = document.getElementById("addUserModal");
    const editUserModal = document.getElementById("editUserModal");
    let currentUserRole = "user";
    let usersLoaded = false;
    let usersById = new Map();

    const coverCards = document.querySelectorAll(".coverflow-card");
    const prevSlideBtn = document.getElementById("prevSlideBtn");
    const nextSlideBtn = document.getElementById("nextSlideBtn");
    const dots = document.querySelectorAll("#carouselDots .dot");
    let activeCardIndex = 0;
    const totalCards = coverCards.length;

    function updateCoverflow() {
        coverCards.forEach((card, index) => {
            let offset = index - activeCardIndex;
            if (offset < -1 && offset < totalCards / -2) offset += totalCards;
            if (offset > 1 && offset > totalCards / 2) offset -= totalCards;

            card.className = "coverflow-card " + card.classList[1];
            if (offset === -1) card.classList.add("pos--1");
            else if (offset === 0) card.classList.add("pos-0");
            else if (offset === 1) card.classList.add("pos-1");
            else card.classList.add("pos-hidden");
        });
        dots.forEach((dot, index) => dot.classList.toggle("active", index === activeCardIndex));
    }

    if (coverCards.length > 0) {
        updateCoverflow();
        coverCards.forEach((card, i) => card.addEventListener("click", () => { activeCardIndex = i; updateCoverflow(); }));
        if (nextSlideBtn) nextSlideBtn.addEventListener("click", () => { activeCardIndex = (activeCardIndex + 1) % totalCards; updateCoverflow(); });
        if (prevSlideBtn) prevSlideBtn.addEventListener("click", () => { activeCardIndex = (activeCardIndex - 1 + totalCards) % totalCards; updateCoverflow(); });
        dots.forEach((dot, i) => dot.addEventListener("click", () => { activeCardIndex = i; updateCoverflow(); }));
        setInterval(() => { activeCardIndex = (activeCardIndex + 1) % totalCards; updateCoverflow(); }, 4500);
    }

    let firstLoginMode = false;
    let resetFlow = "request";
    let recoveryAccessToken = "";

    const signInFields = [{ input: "signInEmail", error: "signInEmailError" }, { input: "signInPassword", error: "signInPasswordError" }];
    const registerFields = [{ input: "registerUsername", error: "registerUsernameError" }, { input: "registerEmail", error: "registerEmailError" }, { input: "registerPassword", error: "registerPasswordError" }, { input: "confirmPassword", error: "confirmPasswordError" }];
    const resetFields = [{ input: "resetEmail", error: "resetEmailError" }, { input: "resetCode", error: "resetCodeError" }, { input: "newPassword", error: "newPasswordError" }, { input: "confirmNewPassword", error: "confirmNewPasswordError" }];

    function saveSession(result) {
        sessionStorage.setItem("access_token", result.access_token);
        sessionStorage.setItem("refresh_token", result.refresh_token);
        if (result.user && result.user.id) sessionStorage.setItem("user_id", result.user.id);
    }

    function clearSession() {
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("refresh_token");
        sessionStorage.removeItem("user_id");
    }

    async function post(path, body, token) {
        const res = await fetch(API + path, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: "Bearer " + token } : {})
            },
            body: JSON.stringify(body || {})
        });
        let data = {};
        try { data = await res.json(); } catch (_) {}
        return { ok: res.ok, status: res.status, data };
    }


    async function fetchMe() {
        let token = sessionStorage.getItem("access_token");
        if (!token) return null;

        let res = await fetch(API + "/me", { headers: { Authorization: "Bearer " + token } });

        if (res.status === 401) {
            const refresh = sessionStorage.getItem("refresh_token");
            if (!refresh) return null;
            const r = await post("/refresh", { refresh_token: refresh });
            if (!r.ok) return null;
            saveSession(r.data);
            token = r.data.access_token;
            res = await fetch(API + "/me", { headers: { Authorization: "Bearer " + token } });
        }

        if (!res.ok) return null;
        const data = await res.json();
        return data.user;
    }

    function displayName(user) {
        return user.username || (user.email ? user.email.split("@")[0] : "User");
    }

    function openModal(screen) {
        authModalOverlay.classList.remove("hidden");
        showScreen(screen);
        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        authModalOverlay.classList.add("hidden");
        document.body.style.overflow = "";
        clearErrors([...signInFields, ...registerFields, ...resetFields]);
        recoveryAccessToken = "";
        if (!firstLoginMode) resetFlow = "request";
    }

    function showScreen(screen) {
        [signInScreen, registerScreen, resetScreen].forEach(s => s.classList.add("hidden"));
        screen.classList.remove("hidden");
        if (screen === resetScreen) {
            firstLoginMode = false;
            document.getElementById("resetForm").reset();
        }
    }

    function showFirstLoginPassword() {
        openModal(resetScreen);
        firstLoginMode = true;
        resetFlow = "first-login";
        recoveryAccessToken = "";
        document.getElementById("resetForm").reset();
        resetMessage.textContent = "";
        resetMessage.className = "form-message";
        document.getElementById("resetHeading").textContent = "Set your password";
        document.getElementById("resetSubtitle").textContent = "You must create a new password before continuing.";
        document.getElementById("resetEmailGroup").classList.add("hidden");
        document.getElementById("resetCodeGroup").classList.add("hidden");
        document.getElementById("newPasswordGroup").classList.remove("hidden");
        document.getElementById("confirmNewPasswordGroup").classList.remove("hidden");
        document.getElementById("resetSubmitButton").classList.remove("hidden");
        document.getElementById("resetSubmitButton").textContent = "Save Password";
    }

    function showResetRequest() {
        firstLoginMode = false;
        resetFlow = "request";
        recoveryAccessToken = "";
        document.getElementById("resetEmail").readOnly = false;
        document.getElementById("resetEmailGroup").classList.remove("hidden");
        document.getElementById("resetCodeGroup").classList.add("hidden");
        document.getElementById("newPasswordGroup").classList.add("hidden");
        document.getElementById("confirmNewPasswordGroup").classList.add("hidden");
        document.getElementById("resetSubmitButton").classList.remove("hidden");
        document.getElementById("resetHeading").textContent = "Reset password";
        document.getElementById("resetSubtitle").textContent = "Enter your email address and we'll send you an eight-digit verification code.";
        document.getElementById("resetSubmitButton").textContent = "Send Code";
        resetMessage.textContent = "";
        resetMessage.className = "form-message";
        openModal(resetScreen);
    }

    function showResetCode() {
        resetFlow = "verify";
        document.getElementById("resetHeading").textContent = "Reset your password";
        document.getElementById("resetSubtitle").textContent = "Enter the eight-digit code sent to your email.";
        document.getElementById("resetEmail").readOnly = true;
        document.getElementById("resetEmailGroup").classList.remove("hidden");
        document.getElementById("resetCodeGroup").classList.remove("hidden");
        document.getElementById("newPasswordGroup").classList.add("hidden");
        document.getElementById("confirmNewPasswordGroup").classList.add("hidden");
        document.getElementById("resetSubmitButton").classList.remove("hidden");
        document.getElementById("resetSubmitButton").textContent = "Verify Code";
    }

    function showVerifiedResetPassword() {
        resetFlow = "recovery";
        document.getElementById("resetHeading").textContent = "Choose a new password";
        document.getElementById("resetSubtitle").textContent = "Enter and confirm your new password to finish resetting your account.";
        document.getElementById("resetEmail").readOnly = true;
        document.getElementById("resetEmailGroup").classList.remove("hidden");
        document.getElementById("resetCodeGroup").classList.add("hidden");
        document.getElementById("newPasswordGroup").classList.remove("hidden");
        document.getElementById("confirmNewPasswordGroup").classList.remove("hidden");
        document.getElementById("resetSubmitButton").classList.remove("hidden");
        document.getElementById("resetSubmitButton").textContent = "Reset Password";
        resetMessage.textContent = "";
        resetMessage.className = "form-message";
    }

    function navigateToDashboard(name, role) {
        const userName = name || "User";
        currentUserRole = ["admin", "superadmin"].includes(String(role || "").toLowerCase())
            ? String(role).toLowerCase()
            : "user";
            resetDashboardState();
        document.getElementById("dashUserName").textContent = userName;
        const roleBadge = document.getElementById("dashUserRole");
        roleBadge.textContent = currentUserRole === "superadmin"
            ? "Superadmin"
            : currentUserRole.charAt(0).toUpperCase() + currentUserRole.slice(1);
        roleBadge.className = "user-role-label " + currentUserRole;
        const canManageUsers = ["admin", "superadmin"].includes(currentUserRole);
        userManagementNav.classList.toggle("hidden", !canManageUsers);
        administrationLabel.classList.toggle("hidden", !canManageUsers);
        document.getElementById("bannerUserName").textContent = userName.split(" ")[0];
        closeModal();
        landingView.classList.add("hidden");
        dashboardView.classList.remove("hidden");
        window.scrollTo(0, 0);
    }

    function showDashboardPage(page) {
        const showUsers = page === "users" && ["admin", "superadmin"].includes(currentUserRole);
        dashboardHome.classList.toggle("hidden", showUsers);
        userManagementView.classList.toggle("hidden", !showUsers);
        document.querySelector(".dash-page-title").textContent = showUsers ? "User Management" : "Dashboard";
        document.querySelectorAll("[data-dashboard-page]").forEach(button => {
            button.classList.toggle("active", button.dataset.dashboardPage === (showUsers ? "users" : "dashboard"));
        });
        if (showUsers && !usersLoaded) loadUsers();
    }

    function showUserManagementFeedback(text, isError) {
        userManagementFeedback.textContent = text;
        userManagementFeedback.classList.toggle("hidden", !text);
        userManagementFeedback.classList.toggle("error", Boolean(isError));
        userManagementFeedback.classList.toggle("success", Boolean(text) && !isError);
    }

    function createUserCell(text, className) {
        const cell = document.createElement("td");
        if (className) cell.className = className;
        cell.textContent = text || "";
        return cell;
    }

    function createUserAction(label, action, userId, variant) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "user-action-btn" + (variant ? " " + variant : "");
        button.dataset.userAction = action;
        button.dataset.userId = userId;
        button.textContent = label;
        return button;
    }

    function renderUsers(users) {
        usersTableBody.replaceChildren();
        usersById = new Map(users.map(user => [user.id, user]));
        const visibleUsers = (currentUserRole === "superadmin"
            ? users
            : users.filter(user => !user.is_deleted && String(user.role).toLowerCase() !== "superadmin")).slice();
        const roleOrder = { superadmin: 0, admin: 1, user: 2 };
        visibleUsers.sort((a, b) => {
            const roleA = roleOrder[String(a.role || "user").toLowerCase()] ?? 3;
            const roleB = roleOrder[String(b.role || "user").toLowerCase()] ?? 3;
            return roleA - roleB || new Date(b.created_at) - new Date(a.created_at);
        });

        if (!visibleUsers.length) {
            const row = document.createElement("tr");
            const cell = createUserCell("No user accounts found.", "users-table-state");
            cell.colSpan = 5;
            row.append(cell);
            usersTableBody.append(row);
            return;
        }

        visibleUsers.forEach(user => {
            const row = document.createElement("tr");
            const role = String(user.role || "user").toLowerCase();
            const profileStatus = String(user.status || "").toLowerCase();
            const active = user.is_active === true || user.is_active === "true" || user.is_active === 1;
            const inactive = user.is_active === false || user.is_active === "false" || user.is_active === 0;
            const status = user.is_deleted
                ? { label: "Deleted", className: "blocked" }
                : profileStatus === "rejected"
                    ? { label: "Disapproved", className: "blocked" }
                    : user.is_blocked
                        ? { label: "Blocked", className: "blocked" }
                           : (profileStatus === "inactive" || (profileStatus === "approved" && inactive))
                            ? { label: "Inactive", className: "inactive" }
                            : (profileStatus === "approved" && active)
                                ? { label: "Active", className: "active" }
                                : { label: "Pending", className: "pending" };
                                
            const emailName = [user.first_name, user.last_name].filter(Boolean).join(" ") ||
                (user.email || "").split("@")[0].replace(/[._-]+/g, " ").replace(/\b\w/g, char => char.toUpperCase()) ||
                "User";
            row.append(createUserCell(emailName, "user-name-cell"));
            row.append(createUserCell(user.email, "user-email-cell"));

            const roleCell = document.createElement("td");
            const roleClasses = {
            superadmin: "superadmin-role",
            admin: "admin-role"
            };

            const roleBadge = document.createElement("span");
            roleBadge.className = "role-badge " + (roleClasses[role] || "user-role");
            roleBadge.textContent = role === "superadmin" ? "Superadmin" : role.charAt(0).toUpperCase() + role.slice(1);
            roleCell.append(roleBadge);
            row.append(roleCell);

            const statusCell = document.createElement("td");
            const statusBadge = document.createElement("span");
            statusBadge.className = "status-badge " + status.className;
            statusBadge.textContent = status.label;
            statusCell.append(statusBadge);
            row.append(statusCell);

            const actionsCell = document.createElement("td");
            const actions = document.createElement("div");
            actions.className = "user-actions-cell";
            const canManageTarget = currentUserRole === "superadmin" || !["admin", "superadmin"].includes(role);
            const requiresApproval = status.label === "Pending";
            if (canManageTarget && requiresApproval && !user.is_blocked && !user.is_deleted) {
                actions.append(createUserAction("Approve", "approve", user.id, "approve"));
                actions.append(createUserAction("Disapprove", "disapprove", user.id, "disapprove"));
            } else if (canManageTarget && status.label === "Blocked" && !user.is_deleted) {
                actions.append(createUserAction("Unblock", "unblock", user.id));
            } else if (canManageTarget && status.label === "Active" && user.id !== sessionStorage.getItem("user_id")) {
                actions.append(createUserAction("Block", "block", user.id, "danger"));
            }
            if (canManageTarget && status.label !== "Deleted"){
                actions.append(createUserAction("Rights", "rights", user.id)); 
                actions.append(createUserAction("Edit ✎", "edit", user.id, "edit"));
        }
            actionsCell.append(actions);
            row.append(actionsCell);
            usersTableBody.append(row);
        });
    }

    async function loadUsers() {
        usersTableBody.replaceChildren();
        const row = document.createElement("tr");
        const cell = createUserCell("Loading users...", "users-table-state");
        cell.colSpan = 5;
        row.append(cell);
        usersTableBody.append(row);
        showUserManagementFeedback("", false);
        try {
            const response = await fetch(API + "/admin/users", {
                headers: { Authorization: "Bearer " + sessionStorage.getItem("access_token") }
            });
            const data = await response.json();
            if (!response.ok) {
                usersLoaded = false;
                showUserManagementFeedback(data.error || "Unable to load users.", true);
                usersTableBody.replaceChildren();
                return;
            }
            usersLoaded = true;
            renderUsers(data.users);
        } catch (error) {
            console.error("Load users error:", error);
            usersLoaded = false;
            showUserManagementFeedback("Unable to connect to the server.", true);
            usersTableBody.replaceChildren();
        }
    }

    async function updateUserStatus(action, userId) {
        const button = [...usersTableBody.querySelectorAll("[data-user-action]")].find(candidate =>
            candidate.dataset.userId === userId && candidate.dataset.userAction === action
        );
        if (button) button.disabled = true;
        showUserManagementFeedback("", false);
        try {
            const response = await fetch(API + "/admin/users/" + encodeURIComponent(userId) + "/" + action, {
                method: "POST",
                headers: { Authorization: "Bearer " + sessionStorage.getItem("access_token") }
            });
            const data = await response.json();
            if (!response.ok) {
                showUserManagementFeedback(data.error || "Unable to update user.", true);
                if (button) button.disabled = false;
                return;
            }
            usersLoaded = false;
            await loadUsers();
            showUserManagementFeedback(data.message || "User updated.", false);
        } catch (error) {
            console.error("Update user error:", error);
            showUserManagementFeedback("Unable to connect to the server.", true);
            if (button) button.disabled = false;
        }
    }

    function populateRoleSelect(select, selectedRole) {
        select.replaceChildren();
        const roles = currentUserRole === "superadmin" ? ["user", "admin", "superadmin"] : ["user"];
        roles.forEach(role => {
            const option = document.createElement("option");
            option.value = role;
            option.textContent = role === "superadmin" ? "Superadmin" : role.charAt(0).toUpperCase() + role.slice(1);
            select.append(option);
        });
        select.value = String(selectedRole || "user").toLowerCase();
    }

    function openEditUserModal(userId) {
        const user = usersById.get(userId);
        if (!user) {
            showUserManagementFeedback("Unable to find that user. Refresh the list and try again.", true);
            return;
        }
        const form = document.getElementById("editUserForm");
        form.dataset.userId = userId;
        document.getElementById("editUserFirstName").value = user.first_name || "";
        document.getElementById("editUserLastName").value = user.last_name || "";
        document.getElementById("editUserEmail").value = user.email || "";
        populateRoleSelect(document.getElementById("editUserRole"), user.role);
        const status = user.is_blocked
            ? "blocked"
            : user.status === "rejected"
                ? "disapproved"
                : user.is_active === false || user.is_active === "false" || user.is_active === 0
                    ? "inactive"
                    : user.is_active && user.status === "approved"
                        ? "active"
                        : "pending";
        document.getElementById("editUserStatus").value = status;
        document.getElementById("editUserEmailError").textContent = "";
        const message = document.getElementById("editUserMessage");
        message.textContent = "";
        message.className = "form-message";
        editUserModal.classList.remove("hidden");
    }

    function closeEditUserModal() {
        editUserModal.classList.add("hidden");
    }

    async function saveEditedUser(event) {
        event.preventDefault();
        const form = event.currentTarget;
        const email = document.getElementById("editUserEmail").value.trim();
        const emailError = document.getElementById("editUserEmailError");
        const message = document.getElementById("editUserMessage");
        emailError.textContent = "";
        if (!isValidEmail(email)) {
            emailError.textContent = "Enter a valid email address.";
            return;
        }
        const submit = document.getElementById("editUserSubmitBtn");
        submit.disabled = true;
        try {
            const response = await fetch(API + "/admin/users/" + encodeURIComponent(form.dataset.userId), {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + sessionStorage.getItem("access_token")
                },
                body: JSON.stringify({
                    firstName: document.getElementById("editUserFirstName").value.trim(),
                    lastName: document.getElementById("editUserLastName").value.trim(),
                    email,
                    role: document.getElementById("editUserRole").value,
                    status: document.getElementById("editUserStatus").value
                })
            });
            const data = await response.json();
            if (!response.ok) {
                message.textContent = data.error || "Unable to update user.";
                message.className = "form-message error";
                return;
            }
            closeEditUserModal();
            usersLoaded = false;
            await loadUsers();
            showUserManagementFeedback(data.message || "User account updated.", false);
        } catch (error) {
            console.error("Edit user error:", error);
            message.textContent = "Unable to connect to the server.";
            message.className = "form-message error";
        } finally {
            submit.disabled = false;
        }
    }

    function navigateToLanding() {
        dashboardView.classList.add("hidden");
        landingView.classList.remove("hidden");
        window.scrollTo(0, 0);
    }

    function resetDashboardState() {
    usersLoaded = false;
    usersById = new Map();
    usersTableBody.replaceChildren();
    showUserManagementFeedback("", false);
    closeAddUserModal();
    closeEditUserModal();
    showDashboardPage("dashboard");   // always start on the dashboard home
    }

    function setFieldError(inputId, errorId, msg) {
        document.getElementById(inputId).classList.add("invalid");
        document.getElementById(inputId).classList.remove("valid");
        document.getElementById(errorId).textContent = msg;
    }

    function clearFieldError(inputId, errorId) {
        document.getElementById(inputId).classList.remove("invalid");
        document.getElementById(errorId).textContent = "";
    }

    function setFieldValid(inputId, errorId) {
        document.getElementById(inputId).classList.remove("invalid");
        document.getElementById(inputId).classList.add("valid");
        document.getElementById(errorId).textContent = "";
    }

    function clearErrors(fields) {
        fields.forEach(f => {
            clearFieldError(f.input, f.error);
            document.getElementById(f.input).classList.remove("valid");
        });
    }

    const isValidEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);


    document.getElementById("navSignInBtn").addEventListener("click", () => openModal(signInScreen));
    document.getElementById("heroSignInBtn").addEventListener("click", () => openModal(signInScreen));
    document.getElementById("navRegisterBtn").addEventListener("click", () => openModal(registerScreen));
    document.getElementById("heroRegisterBtn").addEventListener("click", () => openModal(registerScreen));
    closeModalBtn.addEventListener("click", () => {

        if (firstLoginMode) {
            post("/logout", {}, sessionStorage.getItem("access_token")).catch(() => {});
            clearSession();
            firstLoginMode = false;
        }
        closeModal();
    });
    authModalOverlay.addEventListener("click", e => { if (e.target === authModalOverlay) closeModalBtn.click(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape") closeModalBtn.click(); });

    document.getElementById("googleBtnSignIn").addEventListener("click", () => navigateToDashboard("Google User", "user"));
    document.getElementById("googleBtnRegister").addEventListener("click", () => navigateToDashboard("Google User", "user"));
    document.getElementById("sidebarToggleBtn").addEventListener("click", () => dashboardView.querySelector(".dash-sidebar").classList.toggle("collapsed"));

    document.getElementById("logoutBtn").addEventListener("click", async () => {
        const token = sessionStorage.getItem("access_token");
        await post("/logout", {}, token).catch(() => {});
        clearSession();
        currentUserRole = "user";
        resetDashboardState();
        navigateToLanding();
    });

    userManagementNav.addEventListener("click", () => showDashboardPage("users"));
    document.querySelector("[data-dashboard-page='dashboard']").addEventListener("click", () => showDashboardPage("dashboard"));
    usersTableBody.addEventListener("click", event => {
    const button = event.target.closest("[data-user-action]");
    if (!button) return;
    const action = button.dataset.userAction;
    const userId = button.dataset.userId;

    if (action === "edit") {
        openEditUserModal(userId);
    } else if (action === "rights") {
        const u = usersById.get(userId) || {};
        const name = [u.first_name, u.last_name].filter(Boolean).join(" ") || u.email || "";
        window.openRightsModal(userId, name);
    } else {
        updateUserStatus(action, userId);
    }
});

    document.getElementById("addUserBtn").addEventListener("click", () => {
        document.getElementById("addUserForm").reset();
        populateRoleSelect(document.getElementById("addUserRole"), "user");
        document.getElementById("addUserMessage").textContent = "";
        document.getElementById("addUserMessage").className = "form-message";
        document.getElementById("addUserEmailError").textContent = "";
        document.getElementById("addUserPasswordError").textContent = "";
        addUserModal.classList.remove("hidden");
    });

    function closeAddUserModal() {
        addUserModal.classList.add("hidden");
    }

    document.getElementById("closeAddUserBtn").addEventListener("click", closeAddUserModal);
    addUserModal.addEventListener("click", event => {
        if (event.target === addUserModal) closeAddUserModal();
    });

    document.getElementById("addUserForm").addEventListener("submit", async event => {
        event.preventDefault();
        const email = document.getElementById("addUserEmail").value.trim();
        const tempPassword = document.getElementById("addUserPassword").value;
        const emailError = document.getElementById("addUserEmailError");
        const passwordError = document.getElementById("addUserPasswordError");
        const message = document.getElementById("addUserMessage");
        emailError.textContent = "";
        passwordError.textContent = "";
        message.textContent = "";
        if (!isValidEmail(email)) {
            emailError.textContent = "Enter a valid email address.";
            return;
        }
        if (tempPassword.length < 8) {
            passwordError.textContent = "Use at least 8 characters.";
            return;
        }

        const submit = document.getElementById("addUserSubmitBtn");
        submit.disabled = true;
        try {
            const result = await post("/admin/users", {
                firstName: document.getElementById("addUserFirstName").value.trim(),
                lastName: document.getElementById("addUserLastName").value.trim(),
                email,
                tempPassword,
                role: document.getElementById("addUserRole").value,
                status: document.getElementById("addUserStatus").value
            }, sessionStorage.getItem("access_token"));
            if (!result.ok) {
                message.textContent = result.data.error || "Unable to create user.";
                message.className = "form-message error";
                return;
            }
            closeAddUserModal();
            usersLoaded = false;
            await loadUsers();
            showUserManagementFeedback(result.data.message || "User created.", false);
        } catch (error) {
            console.error("Create user error:", error);
            message.textContent = "Unable to connect to the server.";
            message.className = "form-message error";
        } finally {
            submit.disabled = false;
        }
    });

    document.getElementById("closeEditUserBtn").addEventListener("click", closeEditUserModal);
    editUserModal.addEventListener("click", event => {
        if (event.target === editUserModal) closeEditUserModal();
    });
    document.getElementById("editUserForm").addEventListener("submit", saveEditedUser);

    document.getElementById("switchToRegisterLink").addEventListener("click", e => { e.preventDefault(); showScreen(registerScreen); });
    document.getElementById("switchToSignInLink").addEventListener("click", e => { e.preventDefault(); showScreen(signInScreen); });

    const forgotLink = document.getElementById("forgotPasswordLink");
    if (forgotLink) forgotLink.addEventListener("click", e => {
        e.preventDefault();
        showResetRequest();
    });

    const backLink = document.getElementById("backToSignInLink");
    if (backLink) backLink.addEventListener("click", e => { e.preventDefault(); closeModalBtn.click(); openModal(signInScreen); });

    document.querySelectorAll(".toggle-password").forEach(btn => {
        btn.addEventListener("click", () => {
            const input = document.getElementById(btn.dataset.target);
            input.type = input.type === "password" ? "text" : "password";
            btn.textContent = input.type === "password" ? "Show" : "Hide";
        });
    });

    [...signInFields, ...registerFields, ...resetFields].forEach(f => {
        const input = document.getElementById(f.input);
        if (input) input.addEventListener("input", () => clearFieldError(f.input, f.error));
    });

    document.getElementById("resetCode").addEventListener("input", e => {
        e.target.value = e.target.value.replace(/\D/g, "").slice(0, 8);
    });

    document.getElementById("resendCodeLink").addEventListener("click", async e => {
        e.preventDefault();
        if (resetFlow !== "verify") return;
        const email = document.getElementById("resetEmail").value.trim();
        const resendLink = e.currentTarget;
        resendLink.textContent = "Sending...";
        resendLink.setAttribute("aria-disabled", "true");
        try {
            const r = await post("/request-password-reset", { email });
            resetMessage.textContent = r.ok
                ? (r.data.message || "A verification code has been sent.")
                : (r.data.error || "Unable to resend the code.");
            resetMessage.className = "form-message " + (r.ok ? "success" : "error");
        } catch (err) {
            console.error("Password reset code resend error:", err);
            resetMessage.textContent = "Unable to connect to the server.";
            resetMessage.className = "form-message error";
        } finally {
            resendLink.textContent = "Resend";
            resendLink.removeAttribute("aria-disabled");
        }
    });

    document.getElementById("signInForm").addEventListener("submit", async e => {
        e.preventDefault();
        clearErrors(signInFields);

        const msg = document.getElementById("signInMessage");
        msg.textContent = "";
        msg.className = "form-message";

        const id = document.getElementById("signInEmail").value.trim();
        const pwd = document.getElementById("signInPassword").value;
        let valid = true;

        if (!id) { setFieldError("signInEmail", "signInEmailError", "Enter your email or username."); valid = false; }
        else setFieldValid("signInEmail", "signInEmailError");

        if (!pwd) { setFieldError("signInPassword", "signInPasswordError", "Enter your password."); valid = false; }
        else setFieldValid("signInPassword", "signInPasswordError");

        if (!valid) return;

        msg.textContent = "Logging in...";
        msg.className = "form-message success";

        try {
            const r = await post("/login", { email: id, password: pwd });

            if (!r.ok) {
                msg.textContent = r.data.error || "Login failed.";
                msg.className = "form-message error";
                return;
            }

            saveSession(r.data);
            document.getElementById("signInForm").reset();
            msg.textContent = "";

            if (r.data.must_change_password) {
                showFirstLoginPassword();
                return;
            }

            navigateToDashboard(displayName(r.data.user), r.data.user.role);
        } catch (err) {
            console.error("Login error:", err);
            msg.textContent = "Unable to connect to the server.";
            msg.className = "form-message error";
        }
    });

    const registerMessage = document.getElementById("registerMessage");

    document.getElementById("registerForm").addEventListener("submit", async e => {
        e.preventDefault();

        clearErrors(registerFields);
        registerMessage.textContent = "";
        registerMessage.className = "form-message";

        const user = document.getElementById("registerUsername").value.trim();
        const email = document.getElementById("registerEmail").value.trim();
        const pwd = document.getElementById("registerPassword").value;
        const cpwd = document.getElementById("confirmPassword").value;

        let valid = true;

        if (!user || user.length < 3) {
            setFieldError("registerUsername", "registerUsernameError", "Min 3 characters required.");
            valid = false;
        } else {
            setFieldValid("registerUsername", "registerUsernameError");
        }

        if (!isValidEmail(email)) {
            setFieldError("registerEmail", "registerEmailError", "Enter a valid email.");
            valid = false;
        } else {
            setFieldValid("registerEmail", "registerEmailError");
        }

        if (!pwd || pwd.length < 8) {
            setFieldError("registerPassword", "registerPasswordError", "Min 8 characters required.");
            valid = false;
        } else {
            setFieldValid("registerPassword", "registerPasswordError");
        }

        if (pwd !== cpwd) {
            setFieldError("confirmPassword", "confirmPasswordError", "Passwords do not match.");
            valid = false;
        } else {
            setFieldValid("confirmPassword", "confirmPasswordError");
        }

        if (!valid) return;

        try {
            const r = await post("/register", { username: user, email: email, password: pwd });

            if (!r.ok) {
                registerMessage.textContent = r.data.error || "Registration failed.";
                registerMessage.className = "form-message error";
                return;
            }

            registerMessage.textContent = r.data.message;
            registerMessage.className = "form-message success";
            document.getElementById("registerForm").reset();
            clearErrors(registerFields);

        } catch (error) {
            console.error("Registration error:", error);
            registerMessage.textContent = "Unable to connect to the server.";
            registerMessage.className = "form-message error";
        }
    });

    document.getElementById("resetForm").addEventListener("submit", async e => {
        e.preventDefault();
        clearErrors(resetFields);
        resetMessage.textContent = "";
        resetMessage.className = "form-message";

        if (resetFlow === "request") {
            const email = document.getElementById("resetEmail").value.trim();
            if (!isValidEmail(email)) {
                setFieldError("resetEmail", "resetEmailError", "Enter a valid email address.");
                return;
            }

            try {
                const r = await post("/request-password-reset", { email });
                if (!r.ok) {
                    resetMessage.textContent = r.data.error || "Unable to send a verification code.";
                    resetMessage.className = "form-message error";
                    return;
                }

                showResetCode();
                resetMessage.textContent = r.data.message || "A verification code has been sent.";
                resetMessage.className = "form-message success";
            } catch (err) {
                console.error("Password reset request error:", err);
                resetMessage.textContent = "Unable to connect to the server.";
                resetMessage.className = "form-message error";
            }
            return;
        }

        if (resetFlow === "verify") {
            const email = document.getElementById("resetEmail").value.trim();
            const code = document.getElementById("resetCode").value.trim();
            if (!/^\d{8}$/.test(code)) {
                setFieldError("resetCode", "resetCodeError", "Enter the eight-digit code from your email.");
                return;
            }

            try {
                const r = await post("/verify-password-reset", { email, code });
                if (!r.ok || !r.data.access_token) {
                    resetMessage.textContent = r.data.error || "The code could not be verified.";
                    resetMessage.className = "form-message error";
                    return;
                }

                recoveryAccessToken = r.data.access_token;
                showVerifiedResetPassword();
            } catch (err) {
                console.error("Password reset verification error:", err);
                resetMessage.textContent = "Unable to connect to the server.";
                resetMessage.className = "form-message error";
            }
            return;
        }

        const npwd = document.getElementById("newPassword").value;
        const cpwd = document.getElementById("confirmNewPassword").value;
        if (npwd.length < 8) { setFieldError("newPassword", "newPasswordError", "Min 8 characters."); return; }
        if (npwd !== cpwd) { setFieldError("confirmNewPassword", "confirmNewPasswordError", "Passwords do not match."); return; }

        try {
            const token = firstLoginMode
                ? sessionStorage.getItem("access_token")
                : recoveryAccessToken;
            const endpoint = firstLoginMode ? "/set-password" : "/reset-password";
            const r = await post(endpoint, { newPassword: npwd }, token);
            if (!r.ok) {
                const error = r.data.error || (firstLoginMode ? "Could not save password." : "Could not reset password.");
                if (firstLoginMode) setFieldError("newPassword", "newPasswordError", error);
                else {
                    resetMessage.textContent = error;
                    resetMessage.className = "form-message error";
                }
                return;
            }

            if (firstLoginMode) {
                firstLoginMode = false;
                resetFlow = "request";
                const me = await fetchMe();
                navigateToDashboard(me ? displayName(me) : "User", me ? me.role : "user");
                return;
            }

            recoveryAccessToken = "";
            resetFlow = "complete";
            document.getElementById("newPasswordGroup").classList.add("hidden");
            document.getElementById("confirmNewPasswordGroup").classList.add("hidden");
            document.getElementById("resetSubmitButton").classList.add("hidden");
            resetMessage.textContent = "Password reset successfully. You can now sign in.";
            resetMessage.className = "form-message success";
        } catch (err) {
            console.error("Password reset error:", err);
            if (firstLoginMode) setFieldError("newPassword", "newPasswordError", "Unable to connect to the server.");
            else {
                resetMessage.textContent = "Unable to connect to the server.";
                resetMessage.className = "form-message error";
            }
        }
    });
    

    (function () {
    const API = "/api";
 
    const SECTIONS = [
        { id: "customer", title: "Customer Management", cols: 1, items: [
            "Add Customer", "Delete Customer", "Edit Customer"
        ]},
        { id: "product", title: "Product Management", cols: 2, items: [
            "Add Product", "Edit Product", "Delete Product", "Add Price", "Edit Price", "Delete Price"
        ]},
        { id: "hr", title: "Human Resources", cols: 3, full: true, items: [
            "Add Job", "Delete Employee", "Add Department",
            "Delete Job", "Add Job History", "Delete Department",
            "Edit Department", "Delete Job History", "Edit Employee",
            "Add Employee", "Edit Job", "View Job History"
        ]},
        { id: "sales", title: "Sales", cols: 1, items: [
            "Add Sale", "Delete Sale", "Add Sale Detail", "Delete Sale Detail",
            "Edit Sale", "View Sale Detail", "Edit Sale Detail"
        ]},
        { id: "reports", title: "Reports", cols: 1, items: [
            "Top Customers", "Top Products", "All Employees", "Top Sales",
            "Product Master List", "Active Employees", "Employee Job History"
        ]}
    ];
 
    const modal = document.getElementById("rightsModal");
    const grid = document.getElementById("rightsGrid");
    const message = document.getElementById("rightsMessage");
    const saveBtn = document.getElementById("saveRightsBtn");
    let currentUserId = null;

const MODULE_IDS = {
    customer: 1,
    product: 2,
    hr: 3,
    sales: 4,
    reports: 5
};

let rightsCatalogue = [];
let rightIdByName = new Map();
let rightsCatalogueLoaded = false;

const RIGHT_NAME_MAP = {
    customer: {
        "Add Customer": "customer_add",
        "Delete Customer": "customer_delete",
        "Edit Customer": "customer_edit"
    },

    product: {
        "Add Product": "product_add",
        "Edit Product": "product_edit",
        "Delete Product": "product_delete",
        "Add Price": "product_price_add",
        "Edit Price": "product_price_edit",
        "Delete Price": "product_price_delete"
    },

    hr: {
        "Add Job": "hr_job_add",
        "Delete Employee": "hr_employee_delete",
        "Add Department": "hr_department_add",
        "Delete Job": "hr_job_delete",
        "Add Job History": "hr_jobhist_add",
        "Delete Department": "hr_department_delete",
        "Edit Department": "hr_department_edit",
        "Delete Job History": "hr_jobhist_delete",
        "Edit Employee": "hr_employee_edit",
        "Add Employee": "hr_employee_add",
        "Edit Job": "hr_job_edit",
        "View Job History": "hr_jobhist_view"
    },

    sales: {
        "Add Sale": "sales_add",
        "Delete Sale": "sales_delete",
        "Add Sale Detail": "sales_detail_add",
        "Delete Sale Detail": "sales_detail_delete",
        "Edit Sale": "sales_edit",
        "View Sale Detail": "sales_detail_view",
        "Edit Sale Detail": "sales_detail_edit"
    },

    reports: {
        "Top Customers": "reports_top_customers",
        "Top Products": "reports_top_products",
        "All Employees": "reports_all_employees",
        "Top Sales": "reports_top_sales",
        "Product Master List": "reports_product_master_list",
        "Active Employees": "reports_active_employees",
        "Employee Job History": "reports_employee_jobhist"
    }
};
 
    function showMessage(text, isError) {
        message.textContent = text;
        message.className = "form-message" + (text ? (isError ? " error" : " success") : "");
    }
 
    grid.innerHTML = SECTIONS.map(sec => `
        <section class="rights-section ${sec.full ? "full" : ""}" data-section="${sec.id}">
            <div class="rights-toggles">
                <button type="button" data-action="all">All</button>
                <button type="button" data-action="none">None</button>
            </div>
            <h3>${sec.title}</h3>
            <div class="rights-options cols-${sec.cols}">
                ${sec.items.map(name => `
                    <label>
                        <input type="checkbox" data-section="${sec.id}" value="${RIGHT_NAME_MAP[sec.id][name]}">
                        <span>${name}</span>
                    </label>`).join("")}
            </div>
        </section>`).join("");
 
    grid.addEventListener("click", e => {
        const btn = e.target.closest("button[data-action]");
        if (!btn) return;
        const on = btn.dataset.action === "all";
        btn.closest(".rights-section")
            .querySelectorAll("input[type=checkbox]")
            .forEach(cb => (cb.checked = on));
    });
 
 function getRights() {

    const permissions = [];

    SECTIONS.forEach(sec => {

        const moduleId = MODULE_IDS[sec.id];

        const checkedBoxes = grid.querySelectorAll(
            `input[data-section="${sec.id}"]:checked`
        );

        checkedBoxes.forEach(cb => {

            const rightName = RIGHT_NAME_MAP[sec.id][cb.nextElementSibling.textContent.trim()];

            const rightId = rightIdByName.get(rightName);

            if (rightId !== undefined) {
                permissions.push({
                    module_id: moduleId,
                    right_id: rightId
                });
            }

        });

    });

    return permissions;
}
 
   
function setRights(permissions) {
    const selectedRights = new Set(
        (permissions || []).map(permission => {
            for (const [rightName, rightId] of rightIdByName) {
                if (rightId === Number(permission.right_id)) {
                    return rightName;
                }
            }
            return null;
        }).filter(Boolean)
    );

    grid.querySelectorAll("input[type=checkbox]").forEach(cb => {
        cb.checked = selectedRights.has(cb.value);
    });
}

 
   async function openRightsModal(userId, userName) {

    currentUserId = userId;

    showMessage("", false);

    setRights([]);

    modal.querySelector(".modal-subtitle").textContent = userName
        ? `To edit rights of ${userName}'s account, fill out the following.`
        : "To edit rights of a user's account, fill out the following.";

    modal.classList.remove("hidden");

    saveBtn.disabled = true;
    

    try {

        // STEP 1: Load the catalogue only once.
if (!rightsCatalogueLoaded) {
    const catalogueResponse = await fetch(API + "/rights-catalogue", {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.getItem("access_token")
        }
    });

    const catalogueData = await catalogueResponse.json();

    if (!catalogueResponse.ok) {
        throw new Error(
            catalogueData.error || "Unable to load rights catalogue."
        );
    }

    rightsCatalogue = catalogueData.rights || [];

    rightIdByName = new Map(
        rightsCatalogue.map(right => [
            right.right_name,
            Number(right.right_id)
        ])
    );

    rightsCatalogueLoaded = true;
}

        // Check that every checkbox has a matching catalogue entry.
        const expectedRights = SECTIONS.flatMap(sec =>
    sec.items.map(name => RIGHT_NAME_MAP[sec.id][name])
);


        const missingRights = expectedRights.filter(
            name => !rightIdByName.has(name)
        );

        if (missingRights.length > 0) {
            throw new Error(
                "Missing rights in rights_catalogue: " +
                missingRights.join(", ")
            );
        }

        // STEP 2: Load the selected user's existing permissions.
        const response = await fetch(
    API + "/admin/users/" + encodeURIComponent(userId) + "/rights",
    {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.getItem("access_token")
        }
    }
);


        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.error || "Unable to load current rights."
            );
        }

        // STEP 3: Check the user's existing permissions.
        if (currentUserId === userId) {
            setRights(data.permissions);
        }

    } catch (error) {

        console.error("Load rights error:", error);

        showMessage(
            error.message || "Unable to load rights.",
            true
        );

    } finally {

        saveBtn.disabled = false;

    }
}


window.openRightsModal = openRightsModal;
 
    function closeRightsModal() {
        modal.classList.add("hidden");
        currentUserId = null;
    }
 
    document.getElementById("closeRightsBtn").addEventListener("click", closeRightsModal);
    modal.addEventListener("click", e => { if (e.target === modal) closeRightsModal(); });
    document.addEventListener("keydown", e => {
        if (e.key === "Escape" && !modal.classList.contains("hidden")) closeRightsModal();
    });
 
    
    saveBtn.addEventListener("click", async () => {
        if (!currentUserId) return;
        saveBtn.disabled = true;
        showMessage("", false);
        try {
            const res = await fetch(API + "/admin/users/" + encodeURIComponent(currentUserId) + "/rights", {
                method: "PUT",
                headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + sessionStorage.getItem("access_token")
},

                body: JSON.stringify({ permissions: getRights() })
            });
            let data = {};
            try { data = await res.json(); } catch (_) {}
            if (!res.ok) {
                showMessage(data.error || "Unable to save rights.", true);
                return;
            }
            showMessage(data.message || "Rights saved.", false);
            setTimeout(closeRightsModal, 700);
        } catch (err) {
            console.error("Save rights error:", err);
            showMessage("Unable to connect to the server.", true);
        } finally {
            saveBtn.disabled = false;
        }
    });
 
    window.openRightsModal = openRightsModal;
})();


    (async function restoreSession() {
        if (!sessionStorage.getItem("access_token")) return;
        try {
            const me = await fetchMe();
            if (!me) { clearSession(); return; }
            if (me.must_change_password) { showFirstLoginPassword(); return; }
            navigateToDashboard(displayName(me), me.role);
        } catch (err) {
            console.error("Session restore failed:", err);
        }
    })();
});
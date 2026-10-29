document.addEventListener("DOMContentLoaded", function () {
    const API = "http://localhost:3000/api";

    const landingView = document.getElementById("landingView");
    const dashboardView = document.getElementById("dashboardView");
    const authModalOverlay = document.getElementById("authModalOverlay");
    const closeModalBtn = document.getElementById("closeModalBtn");

    const signInScreen = document.getElementById("signInScreen");
    const registerScreen = document.getElementById("registerScreen");
    const resetScreen = document.getElementById("resetScreen");

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

    const signInFields = [{ input: "signInEmail", error: "signInEmailError" }, { input: "signInPassword", error: "signInPasswordError" }];
    const registerFields = [{ input: "registerUsername", error: "registerUsernameError" }, { input: "registerEmail", error: "registerEmailError" }, { input: "registerPassword", error: "registerPasswordError" }, { input: "confirmPassword", error: "confirmPasswordError" }];
    const resetFields = [{ input: "resetEmail", error: "resetEmailError" }, { input: "resetCode", error: "resetCodeError" }, { input: "newPassword", error: "newPasswordError" }, { input: "confirmNewPassword", error: "confirmNewPasswordError" }];

    function saveSession(result) {
        sessionStorage.setItem("access_token", result.access_token);
        sessionStorage.setItem("refresh_token", result.refresh_token);
    }

    function clearSession() {
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("refresh_token");
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
        document.getElementById("resetHeading").textContent = "Set your password";
        document.getElementById("resetSubtitle").textContent = "You must create a new password before continuing.";
        document.getElementById("resetEmailGroup").classList.add("hidden");
        document.getElementById("resetCodeGroup").classList.add("hidden");
        document.getElementById("newPasswordGroup").classList.remove("hidden");
        document.getElementById("confirmNewPasswordGroup").classList.remove("hidden");
        document.getElementById("resetSubmitButton").textContent = "Save Password";
    }

    function navigateToDashboard(name) {
        const userName = name || "User";
        document.getElementById("dashUserName").textContent = userName;
        document.getElementById("bannerUserName").textContent = userName.split(" ")[0];
        closeModal();
        landingView.classList.add("hidden");
        dashboardView.classList.remove("hidden");
        window.scrollTo(0, 0);
    }

    function navigateToLanding() {
        dashboardView.classList.add("hidden");
        landingView.classList.remove("hidden");
        window.scrollTo(0, 0);
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

    document.getElementById("googleBtnSignIn").addEventListener("click", () => navigateToDashboard("Google User"));
    document.getElementById("googleBtnRegister").addEventListener("click", () => navigateToDashboard("Google User"));
    document.getElementById("sidebarToggleBtn").addEventListener("click", () => dashboardView.querySelector(".dash-sidebar").classList.toggle("collapsed"));

    document.getElementById("logoutBtn").addEventListener("click", async () => {
        const token = sessionStorage.getItem("access_token");
        await post("/logout", {}, token).catch(() => {});
        clearSession();
        navigateToLanding();
    });

    document.getElementById("switchToRegisterLink").addEventListener("click", e => { e.preventDefault(); showScreen(registerScreen); });
    document.getElementById("switchToSignInLink").addEventListener("click", e => { e.preventDefault(); showScreen(signInScreen); });

    const forgotLink = document.getElementById("forgotPasswordLink");
    if (forgotLink) forgotLink.style.display = "none";

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

            navigateToDashboard(displayName(r.data.user));
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
        if (!firstLoginMode) return;

        const npwd = document.getElementById("newPassword").value;
        const cpwd = document.getElementById("confirmNewPassword").value;
        if (npwd.length < 8) { setFieldError("newPassword", "newPasswordError", "Min 8 characters."); return; }
        if (npwd !== cpwd) { setFieldError("confirmNewPassword", "confirmNewPasswordError", "Passwords do not match."); return; }

        try {
            const token = sessionStorage.getItem("access_token");
            const r = await post("/set-password", { newPassword: npwd }, token);
            if (!r.ok) { setFieldError("newPassword", "newPasswordError", r.data.error || "Could not save password."); return; }

            firstLoginMode = false;
            const me = await fetchMe();
            navigateToDashboard(me ? displayName(me) : "User");
        } catch (err) {
            console.error("Set password error:", err);
            setFieldError("newPassword", "newPasswordError", "Unable to connect to the server.");
        }
    });

    (async function restoreSession() {
        if (!sessionStorage.getItem("access_token")) return;
        try {
            const me = await fetchMe();
            if (!me) { clearSession(); return; }
            if (me.must_change_password) { showFirstLoginPassword(); return; }
            navigateToDashboard(displayName(me));
        } catch (err) {
            console.error("Session restore failed:", err);
        }
    })();
});
<<<<<<< HEAD:.github/ui-ux/script.js
document.addEventListener("DOMContentLoaded", function () {
    const landingView = document.getElementById("landingView");
    const dashboardView = document.getElementById("dashboardView");
    const authModalOverlay = document.getElementById("authModalOverlay");
    const closeModalBtn = document.getElementById("closeModalBtn");

    const signInScreen = document.getElementById("signInScreen");
    const registerScreen = document.getElementById("registerScreen");
    const resetScreen = document.getElementById("resetScreen");
=======
const loginScreen = document.getElementById("loginScreen");
const signupScreen = document.getElementById("signupScreen");
const resetScreen = document.getElementById("resetScreen");
>>>>>>> 2e54572093020e62110cd15b3e38345c4c48987e:ui-ux/script.js

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

    let resetStep = "email";
    const signInFields = [{ input: "signInEmail", error: "signInEmailError" }, { input: "signInPassword", error: "signInPasswordError" }];
    const registerFields = [{ input: "registerUsername", error: "registerUsernameError" }, { input: "registerEmail", error: "registerEmailError" }, { input: "registerPassword", error: "registerPasswordError" }, { input: "confirmPassword", error: "confirmPasswordError" }];
    const resetFields = [{ input: "resetEmail", error: "resetEmailError" }, { input: "resetCode", error: "resetCodeError" }, { input: "newPassword", error: "newPasswordError" }, { input: "confirmNewPassword", error: "confirmNewPasswordError" }];

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
            resetStep = "email";
            document.getElementById("resetHeading").textContent = "Reset your password";
            document.getElementById("resetSubtitle").textContent = "Enter your email address or username to receive a code.";
            document.getElementById("resetEmailGroup").classList.remove("hidden");
            document.getElementById("resetCodeGroup").classList.add("hidden");
            document.getElementById("newPasswordGroup").classList.add("hidden");
            document.getElementById("confirmNewPasswordGroup").classList.add("hidden");
            document.getElementById("resetSubmitButton").textContent = "Send Code";
            document.getElementById("resetEmail").disabled = false;
            document.getElementById("resetForm").reset();
        }
    }

    function navigateToDashboard(name) {
        const userName = name || "Google User";
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
    closeModalBtn.addEventListener("click", closeModal);
    authModalOverlay.addEventListener("click", e => { if (e.target === authModalOverlay) closeModal(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

    document.getElementById("googleBtnSignIn").addEventListener("click", () => navigateToDashboard("Google User"));
    document.getElementById("googleBtnRegister").addEventListener("click", () => navigateToDashboard("Google User"));
    document.getElementById("sidebarToggleBtn").addEventListener("click", () => dashboardView.querySelector(".dash-sidebar").classList.toggle("collapsed"));
    document.getElementById("logoutBtn").addEventListener("click", navigateToLanding);

    document.getElementById("switchToRegisterLink").addEventListener("click", e => { e.preventDefault(); showScreen(registerScreen); });
    document.getElementById("switchToSignInLink").addEventListener("click", e => { e.preventDefault(); showScreen(signInScreen); });
    document.getElementById("forgotPasswordLink").addEventListener("click", e => { e.preventDefault(); showScreen(resetScreen); });
    document.getElementById("backToSignInLink").addEventListener("click", e => { e.preventDefault(); showScreen(signInScreen); });

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

    document.getElementById("signInForm").addEventListener("submit", e => {
        e.preventDefault();
        clearErrors(signInFields);
        const id = document.getElementById("signInEmail").value.trim();
        const pwd = document.getElementById("signInPassword").value;
        let valid = true;

        if (!id) { setFieldError("signInEmail", "signInEmailError", "Enter your email or username."); valid = false; }
        else setFieldValid("signInEmail", "signInEmailError");

        if (!pwd) { setFieldError("signInPassword", "signInPasswordError", "Enter your password."); valid = false; }
        else setFieldValid("signInPassword", "signInPasswordError");

        if (valid) {
            document.getElementById("signInMessage").textContent = "Logging in...";
            document.getElementById("signInMessage").className = "form-message success";
            setTimeout(() => navigateToDashboard(id.includes("@") ? id.split("@")[0] : id), 600);
        }
    });

    document.getElementById("registerForm").addEventListener("submit", e => {
        e.preventDefault();
        clearErrors(registerFields);
        const user = document.getElementById("registerUsername").value.trim();
        const email = document.getElementById("registerEmail").value.trim();
        const pwd = document.getElementById("registerPassword").value;
        const cpwd = document.getElementById("confirmPassword").value;
        let valid = true;

        if (!user || user.length < 3) { setFieldError("registerUsername", "registerUsernameError", "Min 3 characters required."); valid = false; }
        else setFieldValid("registerUsername", "registerUsernameError");

        if (!isValidEmail(email)) { setFieldError("registerEmail", "registerEmailError", "Enter a valid email."); valid = false; }
        else setFieldValid("registerEmail", "registerEmailError");

        if (!pwd || pwd.length < 8) { setFieldError("registerPassword", "registerPasswordError", "Min 8 characters required."); valid = false; }
        else setFieldValid("registerPassword", "registerPasswordError");

        if (pwd !== cpwd) { setFieldError("confirmPassword", "confirmPasswordError", "Passwords do not match."); valid = false; }
        else setFieldValid("confirmPassword", "confirmPasswordError");

<<<<<<< HEAD:.github/ui-ux/script.js
        if (valid) {
            showScreen(signInScreen);
            document.getElementById("signInMessage").textContent = "Account created successfully. Log in now.";
            document.getElementById("signInMessage").className = "form-message success";
=======
    if (!isValid) return;

    showMessage("loginMessage",
        "Logging in...",
        "success");
        
    
}); 

document.getElementById("signupForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    clearFormErrors(signupFields);
    clearMessage("signupMessage");

    const username = document.getElementById("signupUsername").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    let isValid = true;

    if (!username) {
        showFieldError("signupUsername", "signupUsernameError",
            "Please enter a username.");
        isValid = false;
    } else if (username.length < 3) {
        showFieldError("signupUsername", "signupUsernameError",
            "Username must be at least 3 characters long.");
        isValid = false;
    } else {
        markFieldValid("signupUsername", "signupUsernameError");
    }

    if (!email) {
        showFieldError("signupEmail", "signupEmailError",
            "Please enter your email address.");
        isValid = false;
    } else if (!isValidEmail(email)) {
        showFieldError("signupEmail", "signupEmailError",
            "Please enter a valid email address.");
        isValid = false;
    } else {
        markFieldValid("signupEmail", "signupEmailError");
    }

    if (!password) {
        showFieldError("signupPassword", "signupPasswordError",
            "Please create a password.");
        isValid = false;
    } else if (password.length < 8) {
        showFieldError("signupPassword", "signupPasswordError",
            "Password must be at least 8 characters long.");
        isValid = false;
    } else {
        markFieldValid("signupPassword", "signupPasswordError");
    }

    if (!confirmPassword) {
        showFieldError("confirmPassword", "confirmPasswordError",
            "Please confirm your password.");
        isValid = false;
    } else if (password !== confirmPassword) {
        showFieldError("confirmPassword", "confirmPasswordError",
            "Passwords do not match.");
        isValid = false;
    } else {
        markFieldValid("confirmPassword", "confirmPasswordError");
    }

    if (!isValid) return;

    showMessage(
        "signupMessage",
        "Creating your account...",
        "success"
    );

    const { data, error } = await supabaseClient.auth.signUp({
        email: email,
        password: password
    });

    if (error) {
        showMessage(
            "signupMessage",
            error.message,
            "error"
        );
        return;
    }

    console.log("Supabase signup:", data);

    showScreen(loginScreen);

    showMessage(
        "loginMessage",
        "Account created! Please check your email to verify your account.",
        "success"
    );
});

document.getElementById("resetForm").addEventListener("submit", function (event) {
    event.preventDefault();
    clearMessage("resetMessage");

    if (resetStep === "email") {
        clearFormErrors([{ input: "resetEmail", error: "resetEmailError" }]);

        const email = document.getElementById("resetEmail").value.trim();

        if (!email) {
            showFieldError("resetEmail", "resetEmailError",
                "Please enter your email address.");
            return;
        }

        if (!isValidEmail(email)) {
            showFieldError("resetEmail", "resetEmailError",
                "Please enter a valid email address.");
            return;
        }

        markFieldValid("resetEmail", "resetEmailError");

        resetStep = "code";
        document.getElementById("resetEmail").disabled = true;
        document.getElementById("resetCodeGroup").classList.remove("hidden");
        document.getElementById("resetSubtitle").textContent =
            "Enter the verification code sent to your email address.";
        document.getElementById("resetSubmitButton").textContent = "Verify Code";

        showMessage("resetMessage",
            "Email validated. Enter the verification code sent to your email address.",
            "success");

        document.getElementById("resetCode").focus();
        return;
    }

    if (resetStep === "code") {
        clearFormErrors([{ input: "resetCode", error: "resetCodeError" }]);

        const code = document.getElementById("resetCode").value.trim();

        if (!code) {
            showFieldError("resetCode", "resetCodeError",
                "Please enter the verification code.");
            return;
        }

        if (!/^\d{6}$/.test(code)) {
            showFieldError("resetCode", "resetCodeError",
                "Please enter a valid 6-digit verification code.");
            return;
        }

        markFieldValid("resetCode", "resetCodeError");

        resetStep = "password";

        document.getElementById("resetHeading").textContent = "Create new password";
        document.getElementById("resetSubtitle").textContent =
            "Create a new password and confirm it to finish resetting your password.";

        document.getElementById("resetEmailGroup").classList.add("hidden");
        document.getElementById("resetCodeGroup").classList.add("hidden");
        document.getElementById("newPasswordGroup").classList.remove("hidden");
        document.getElementById("confirmNewPasswordGroup").classList.remove("hidden");
        document.getElementById("resetSubmitButton").textContent = "Continue Logging In";
        document.getElementById("resetDividerText").textContent =
            "REMEMBERED YOUR PASSWORD?";

        document.getElementById("newPassword").focus();
        return;
    }

    if (resetStep === "password") {
        clearFormErrors([
            { input: "newPassword", error: "newPasswordError" },
            { input: "confirmNewPassword", error: "confirmNewPasswordError" }
        ]);

        const newPassword = document.getElementById("newPassword").value;
        const confirmNewPassword = document.getElementById("confirmNewPassword").value;
        let isValid = true;

        if (!newPassword) {
            showFieldError("newPassword", "newPasswordError",
                "Please enter your new password.");
            isValid = false;
        } else if (newPassword.length < 8) {
            showFieldError("newPassword", "newPasswordError",
                "Password must be at least 8 characters long.");
            isValid = false;
        } else {
            markFieldValid("newPassword", "newPasswordError");
        }

        if (!confirmNewPassword) {
            showFieldError("confirmNewPassword", "confirmNewPasswordError",
                "Please confirm your new password.");
            isValid = false;
        } else if (newPassword !== confirmNewPassword) {
            showFieldError("confirmNewPassword", "confirmNewPasswordError",
                "Passwords do not match.");
            isValid = false;
        } else if (newPassword.length >= 8) {
            markFieldValid("confirmNewPassword", "confirmNewPasswordError");
        }

        if (!isValid) return;

        showScreen(loginScreen);

        showMessage("loginMessage",
            "Log in with your new password.",
            "success");
    }
});

document.getElementById("resendCodeLink").addEventListener("click", function (event) {
    event.preventDefault();

    if (resetStep !== "code") return;

    document.getElementById("resetCode").value = "";
    clearFieldError("resetCode", "resetCodeError");
    clearMessage("resetMessage");

    document.getElementById("resendMessage").textContent =
        "A new code has been sent to your email.";

    document.getElementById("resetCode").focus();
});

document.querySelectorAll(".toggle-password").forEach(function (button) {
    button.addEventListener("click", function () {
        const input = document.getElementById(button.dataset.target);

        if (input.type === "password") {
            input.type = "text";
            button.textContent = "Hide";
            button.setAttribute("aria-label", "Hide password");
        } else {
            input.type = "password";
            button.textContent = "Show";
            button.setAttribute("aria-label", "Show password");
>>>>>>> 2e54572093020e62110cd15b3e38345c4c48987e:ui-ux/script.js
        }
    });

    document.getElementById("resetForm").addEventListener("submit", e => {
        e.preventDefault();
        if (resetStep === "email") {
            const email = document.getElementById("resetEmail").value.trim();
            if (!isValidEmail(email)) { setFieldError("resetEmail", "resetEmailError", "Enter valid email."); return; }
            setFieldValid("resetEmail", "resetEmailError");
            resetStep = "code";
            document.getElementById("resetEmail").disabled = true;
            document.getElementById("resetCodeGroup").classList.remove("hidden");
            document.getElementById("resetSubtitle").textContent = "Enter the 6-digit code sent to your email.";
            document.getElementById("resetSubmitButton").textContent = "Verify Code";
        } else if (resetStep === "code") {
            const code = document.getElementById("resetCode").value.trim();
            if (!/^\d{6}$/.test(code)) { setFieldError("resetCode", "resetCodeError", "Enter 6-digit code."); return; }
            setFieldValid("resetCode", "resetCodeError");
            resetStep = "password";
            document.getElementById("resetHeading").textContent = "Create new password";
            document.getElementById("resetSubtitle").textContent = "Enter and confirm your new password.";
            document.getElementById("resetCodeGroup").classList.add("hidden");
            document.getElementById("newPasswordGroup").classList.remove("hidden");
            document.getElementById("confirmNewPasswordGroup").classList.remove("hidden");
            document.getElementById("resetSubmitButton").textContent = "Continue Logging In";
        } else if (resetStep === "password") {
            const npwd = document.getElementById("newPassword").value;
            const cpwd = document.getElementById("confirmNewPassword").value;
            if (npwd.length < 8) { setFieldError("newPassword", "newPasswordError", "Min 8 characters."); return; }
            if (npwd !== cpwd) { setFieldError("confirmNewPassword", "confirmNewPasswordError", "Passwords do not match."); return; }
            showScreen(signInScreen);
            document.getElementById("signInMessage").textContent = "Password reset successful. Log in.";
            document.getElementById("signInMessage").className = "form-message success";
        }
    });

    document.getElementById("resendCodeLink").addEventListener("click", e => {
        e.preventDefault();
        document.getElementById("resendMessage").textContent = "New code sent!";
    });
});
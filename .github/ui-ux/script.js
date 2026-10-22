document.addEventListener("DOMContentLoaded", function () {
    const landingView = document.getElementById("landingView");
    const dashboardView = document.getElementById("dashboardView");

    const authModalOverlay = document.getElementById("authModalOverlay");
    const closeModalBtn = document.getElementById("closeModalBtn");

    const signInScreen = document.getElementById("signInScreen");
    const registerScreen = document.getElementById("registerScreen");
    const resetScreen = document.getElementById("resetScreen");

    const navSignInBtn = document.getElementById("navSignInBtn");
    const navRegisterBtn = document.getElementById("navRegisterBtn");
    const heroSignInBtn = document.getElementById("heroSignInBtn");
    const heroRegisterBtn = document.getElementById("heroRegisterBtn");

    const googleBtnSignIn = document.getElementById("googleBtnSignIn");
    const googleBtnRegister = document.getElementById("googleBtnRegister");

    const sidebarToggleBtn = document.getElementById("sidebarToggleBtn");
    const dashSidebar = document.getElementById("dashSidebar");
    const logoutBtn = document.getElementById("logoutBtn");

    const dashUserName = document.getElementById("dashUserName");
    const bannerUserName = document.getElementById("bannerUserName");

    const switchToRegisterLink = document.getElementById("switchToRegisterLink");
    const switchToSignInLink = document.getElementById("switchToSignInLink");
    const forgotPasswordLink = document.getElementById("forgotPasswordLink");
    const backToSignInLink = document.getElementById("backToSignInLink");

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

        dots.forEach((dot, index) => {
            if (index === activeCardIndex) dot.classList.add("active");
            else dot.classList.remove("active");
        });
    }

    if (coverCards.length > 0) {
        updateCoverflow();

        coverCards.forEach((card, index) => {
            card.addEventListener("click", () => {
                activeCardIndex = index;
                updateCoverflow();
            });
        });

        if (nextSlideBtn && prevSlideBtn) {
            nextSlideBtn.addEventListener("click", () => {
                activeCardIndex = (activeCardIndex + 1) % totalCards;
                updateCoverflow();
            });

            prevSlideBtn.addEventListener("click", () => {
                activeCardIndex = (activeCardIndex - 1 + totalCards) % totalCards;
                updateCoverflow();
            });
        }

        dots.forEach(dot => {
            dot.addEventListener("click", (e) => {
                activeCardIndex = parseInt(e.target.dataset.index, 10);
                updateCoverflow();
            });
        });

        setInterval(() => {
            activeCardIndex = (activeCardIndex + 1) % totalCards;
            updateCoverflow();
        }, 4500);
    }

    let resetStep = "email";

    const signInFields = [
        { input: "signInEmail", error: "signInEmailError" },
        { input: "signInPassword", error: "signInPasswordError" }
    ];

    const registerFields = [
        { input: "registerUsername", error: "registerUsernameError" },
        { input: "registerEmail", error: "registerEmailError" },
        { input: "registerPassword", error: "registerPasswordError" },
        { input: "confirmPassword", error: "confirmPasswordError" }
    ];

    const resetFields = [
        { input: "resetEmail", error: "resetEmailError" },
        { input: "resetCode", error: "resetCodeError" },
        { input: "newPassword", error: "newPasswordError" },
        { input: "confirmNewPassword", error: "confirmNewPasswordError" }
    ];

    function openModal(screenToShow) {
        authModalOverlay.classList.remove("hidden");
        showScreen(screenToShow);
        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        authModalOverlay.classList.add("hidden");
        document.body.style.overflow = "";
        clearAllFieldErrors();
        clearAllMessages();
    }

    function showScreen(screen) {
        [signInScreen, registerScreen, resetScreen].forEach(s => s.classList.add("hidden"));
        screen.classList.remove("hidden");

        clearAllFieldErrors();
        clearAllMessages();

        if (screen === resetScreen) {
            resetStep = "email";
            document.getElementById("resetHeading").textContent = "Reset your password";
            document.getElementById("resetSubtitle").textContent = "To begin resetting your password, enter your email address or username. We will send a code to your email address.";
            document.getElementById("resetEmailGroup").classList.remove("hidden");
            document.getElementById("resetCodeGroup").classList.add("hidden");
            document.getElementById("newPasswordGroup").classList.add("hidden");
            document.getElementById("confirmNewPasswordGroup").classList.add("hidden");
            document.getElementById("resetSubmitButton").textContent = "Send Code";

            document.getElementById("resetEmail").disabled = false;
            document.getElementById("resetEmail").value = "";
            document.getElementById("resetCode").value = "";
            document.getElementById("newPassword").value = "";
            document.getElementById("confirmNewPassword").value = "";
        }
    }

    function navigateToDashboard(userDisplayName) {
        const name = userDisplayName || "Google User";
        dashUserName.textContent = name;
        bannerUserName.textContent = name.split(" ")[0];

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

    function showFieldError(inputId, errorId, message) {
        const input = document.getElementById(inputId);
        const error = document.getElementById(errorId);

        input.classList.add("invalid");
        input.classList.remove("valid");
        error.textContent = message;
    }

    function clearFieldError(inputId, errorId) {
        const input = document.getElementById(inputId);
        const error = document.getElementById(errorId);

        input.classList.remove("invalid");
        error.textContent = "";
    }

    function markFieldValid(inputId, errorId) {
        const input = document.getElementById(inputId);
        const error = document.getElementById(errorId);

        input.classList.remove("invalid");
        input.classList.add("valid");
        error.textContent = "";
    }

    function showMessage(messageId, message, type) {
        const element = document.getElementById(messageId);
        element.textContent = message;
        element.className = "form-message " + type;
    }

    function clearMessage(messageId) {
        const element = document.getElementById(messageId);
        element.textContent = "";
        element.className = "form-message";
    }

    function clearFormErrors(fields) {
        fields.forEach(field => {
            clearFieldError(field.input, field.error);
            document.getElementById(field.input).classList.remove("valid");
        });
    }

    function clearAllFieldErrors() {
        clearFormErrors(signInFields);
        clearFormErrors(registerFields);
        clearFormErrors(resetFields);
    }

    function clearAllMessages() {
        clearMessage("signInMessage");
        clearMessage("registerMessage");
        clearMessage("resetMessage");
        document.getElementById("resendMessage").textContent = "";
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    navSignInBtn.addEventListener("click", () => openModal(signInScreen));
    heroSignInBtn.addEventListener("click", () => openModal(signInScreen));

    navRegisterBtn.addEventListener("click", () => openModal(registerScreen));
    heroRegisterBtn.addEventListener("click", () => openModal(registerScreen));

    closeModalBtn.addEventListener("click", closeModal);

    authModalOverlay.addEventListener("click", function (event) {
        if (event.target === authModalOverlay) {
            closeModal();
        }
    });

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && !authModalOverlay.classList.contains("hidden")) {
            closeModal();
        }
    });

    googleBtnSignIn.addEventListener("click", () => navigateToDashboard("Google User"));
    googleBtnRegister.addEventListener("click", () => navigateToDashboard("Google User"));

    sidebarToggleBtn.addEventListener("click", function () {
        dashSidebar.classList.toggle("collapsed");
    });

    logoutBtn.addEventListener("click", function () {
        navigateToLanding();
    });

    switchToRegisterLink.addEventListener("click", (e) => {
        e.preventDefault();
        showScreen(registerScreen);
    });

    switchToSignInLink.addEventListener("click", (e) => {
        e.preventDefault();
        showScreen(signInScreen);
    });

    forgotPasswordLink.addEventListener("click", (e) => {
        e.preventDefault();
        showScreen(resetScreen);
    });

    backToSignInLink.addEventListener("click", (e) => {
        e.preventDefault();
        showScreen(signInScreen);
    });

    document.querySelectorAll(".toggle-password").forEach(button => {
        button.addEventListener("click", function () {
            const input = document.getElementById(button.dataset.target);
            if (input.type === "password") {
                input.type = "text";
                button.textContent = "Hide";
            } else {
                input.type = "password";
                button.textContent = "Show";
            }
        });
    });

    [...signInFields, ...registerFields, ...resetFields].forEach(field => {
        const input = document.getElementById(field.input);
        if (input) {
            input.addEventListener("input", () => clearFieldError(field.input, field.error));
        }
    });

    document.getElementById("signInForm").addEventListener("submit", function (e) {
        e.preventDefault();
        clearFormErrors(signInFields);
        clearMessage("signInMessage");

        const identifier = document.getElementById("signInEmail").value.trim();
        const password = document.getElementById("signInPassword").value;
        let isValid = true;

        if (!identifier) {
            showFieldError("signInEmail", "signInEmailError", "Please enter your email or username.");
            isValid = false;
        } else if (identifier.includes("@") && !isValidEmail(identifier)) {
            showFieldError("signInEmail", "signInEmailError", "Please enter a valid email address.");
            isValid = false;
        } else {
            markFieldValid("signInEmail", "signInEmailError");
        }

        if (!password.trim()) {
            showFieldError("signInPassword", "signInPasswordError", "Please enter your password.");
            isValid = false;
        } else {
            markFieldValid("signInPassword", "signInPasswordError");
        }

        if (isValid) {
            showMessage("signInMessage", "Logging in...", "success");
            setTimeout(() => {
                navigateToDashboard(identifier.includes("@") ? identifier.split("@")[0] : identifier);
            }, 600);
        }
    });

    document.getElementById("registerForm").addEventListener("submit", function (e) {
        e.preventDefault();
        clearFormErrors(registerFields);
        clearMessage("registerMessage");

        const username = document.getElementById("registerUsername").value.trim();
        const email = document.getElementById("registerEmail").value.trim();
        const password = document.getElementById("registerPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        let isValid = true;

        if (!username) {
            showFieldError("registerUsername", "registerUsernameError", "Please enter a username.");
            isValid = false;
        } else if (username.length < 3) {
            showFieldError("registerUsername", "registerUsernameError", "Username must be at least 3 characters long.");
            isValid = false;
        } else {
            markFieldValid("registerUsername", "registerUsernameError");
        }

        if (!email) {
            showFieldError("registerEmail", "registerEmailError", "Please enter your email address.");
            isValid = false;
        } else if (!isValidEmail(email)) {
            showFieldError("registerEmail", "registerEmailError", "Please enter a valid email address.");
            isValid = false;
        } else {
            markFieldValid("registerEmail", "registerEmailError");
        }

        if (!password) {
            showFieldError("registerPassword", "registerPasswordError", "Please create a password.");
            isValid = false;
        } else if (password.length < 8) {
            showFieldError("registerPassword", "registerPasswordError", "Password must be at least 8 characters long.");
            isValid = false;
        } else {
            markFieldValid("registerPassword", "registerPasswordError");
        }

        if (!confirmPassword) {
            showFieldError("confirmPassword", "confirmPasswordError", "Please confirm your password.");
            isValid = false;
        } else if (password !== confirmPassword) {
            showFieldError("confirmPassword", "confirmPasswordError", "Passwords do not match.");
            isValid = false;
        } else {
            markFieldValid("confirmPassword", "confirmPasswordError");
        }

        if (isValid) {
            showScreen(signInScreen);
            showMessage("signInMessage", "Your account has been successfully created. Log in now.", "success");
        }
    });

    document.getElementById("resetForm").addEventListener("submit", function (e) {
        e.preventDefault();
        clearMessage("resetMessage");

        if (resetStep === "email") {
            clearFormErrors([{ input: "resetEmail", error: "resetEmailError" }]);
            const email = document.getElementById("resetEmail").value.trim();

            if (!email) {
                showFieldError("resetEmail", "resetEmailError", "Please enter your email address.");
                return;
            }
            if (email.includes("@") && !isValidEmail(email)) {
                showFieldError("resetEmail", "resetEmailError", "Please enter a valid email address.");
                return;
            }

            markFieldValid("resetEmail", "resetEmailError");
            resetStep = "code";

            document.getElementById("resetEmail").disabled = true;
            document.getElementById("resetCodeGroup").classList.remove("hidden");
            document.getElementById("resetSubtitle").textContent = "Enter the verification code sent to your email address.";
            document.getElementById("resetSubmitButton").textContent = "Verify Code";
            showMessage("resetMessage", "Email validated. Enter the verification code sent to your email address.", "success");
            return;
        }

        if (resetStep === "code") {
            clearFormErrors([{ input: "resetCode", error: "resetCodeError" }]);
            const code = document.getElementById("resetCode").value.trim();

            if (!code || !/^\d{6}$/.test(code)) {
                showFieldError("resetCode", "resetCodeError", "Please enter a valid 6-digit verification code.");
                return;
            }

            markFieldValid("resetCode", "resetCodeError");
            resetStep = "password";

            document.getElementById("resetHeading").textContent = "Create new password";
            document.getElementById("resetSubtitle").textContent = "Create a new password and confirm it to finish resetting your password.";
            document.getElementById("resetEmailGroup").classList.add("hidden");
            document.getElementById("resetCodeGroup").classList.add("hidden");
            document.getElementById("newPasswordGroup").classList.remove("hidden");
            document.getElementById("confirmNewPasswordGroup").classList.remove("hidden");
            document.getElementById("resetSubmitButton").textContent = "Continue Logging In";
            return;
        }

        if (resetStep === "password") {
            const newPassword = document.getElementById("newPassword").value;
            const confirmNewPassword = document.getElementById("confirmNewPassword").value;

            if (newPassword.length < 8) {
                showFieldError("newPassword", "newPasswordError", "Password must be at least 8 characters long.");
                return;
            }
            if (newPassword !== confirmNewPassword) {
                showFieldError("confirmNewPassword", "confirmNewPasswordError", "Passwords do not match.");
                return;
            }

            showScreen(signInScreen);
            showMessage("signInMessage", "Log in with your new password.", "success");
        }
    });

    document.getElementById("resendCodeLink").addEventListener("click", function (e) {
        e.preventDefault();
        document.getElementById("resendMessage").textContent = "A new code has been sent to your email.";
    });
});

const loginScreen = document.getElementById("loginScreen");
const signupScreen = document.getElementById("signupScreen");
const resetScreen = document.getElementById("resetScreen");

const loginFields = [
    { input: "loginUsername", error: "loginUsernameError" },
    { input: "loginPassword", error: "loginPasswordError" }
];

const signupFields = [
    { input: "signupUsername", error: "signupUsernameError" },
    { input: "signupEmail", error: "signupEmailError" },
    { input: "signupPassword", error: "signupPasswordError" },
    { input: "confirmPassword", error: "confirmPasswordError" }
];

const resetFields = [
    { input: "resetEmail", error: "resetEmailError" },
    { input: "resetCode", error: "resetCodeError" },
    { input: "newPassword", error: "newPasswordError" },
    { input: "confirmNewPassword", error: "confirmNewPasswordError" }
];

let resetStep = "email";

function showScreen(screen) {
    [loginScreen, signupScreen, resetScreen].forEach(function (item) {
        item.classList.add("hidden");
    });

    screen.classList.remove("hidden");

    clearAllFieldErrors();
    clearAllMessages();

    if (screen === resetScreen) {
        resetStep = "email";

        document.getElementById("resetHeading").textContent = "Reset your password";
        document.getElementById("resetSubtitle").textContent =
            "To begin resetting your password, enter your email address. We will send a verification code to your email.";

        document.getElementById("resetEmailGroup").classList.remove("hidden");
        document.getElementById("resetCodeGroup").classList.add("hidden");
        document.getElementById("newPasswordGroup").classList.add("hidden");
        document.getElementById("confirmNewPasswordGroup").classList.add("hidden");

        document.getElementById("resetSubmitButton").textContent = "Send Code";
        document.getElementById("resetDividerText").textContent =
            "REMEMBERED YOUR PASSWORD?";

        document.getElementById("resetEmail").disabled = false;
        document.getElementById("resetEmail").value = "";
        document.getElementById("resetCode").value = "";
        document.getElementById("newPassword").value = "";
        document.getElementById("confirmNewPassword").value = "";
        document.getElementById("resendMessage").textContent = "";
    }

    const heading = screen.querySelector("h1");

    if (heading) {
        heading.setAttribute("tabindex", "-1");
        heading.focus();
    }
}

document.getElementById("showSignupLink").addEventListener("click", function (event) {
    event.preventDefault();
    showScreen(signupScreen);
});

document.getElementById("showLoginFromSignup").addEventListener("click", function (event) {
    event.preventDefault();
    showScreen(loginScreen);
});

document.getElementById("forgotPasswordLink").addEventListener("click", function (event) {
    event.preventDefault();
    showScreen(resetScreen);
});

document.getElementById("backToLoginLink").addEventListener("click", function (event) {
    event.preventDefault();
    showScreen(loginScreen);
});

function showFieldError(inputId, errorId, message) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);

    input.classList.add("invalid");
    input.classList.remove("valid");
    input.setAttribute("aria-invalid", "true");
    error.textContent = message;
}

function clearFieldError(inputId, errorId) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);

    input.classList.remove("invalid");
    input.removeAttribute("aria-invalid");
    error.textContent = "";
}

function markFieldValid(inputId, errorId) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);

    input.classList.remove("invalid");
    input.classList.add("valid");
    input.setAttribute("aria-invalid", "false");
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
    fields.forEach(function (field) {
        clearFieldError(field.input, field.error);
        document.getElementById(field.input).classList.remove("valid");
    });
}

function clearAllFieldErrors() {
    clearFormErrors(loginFields);
    clearFormErrors(signupFields);
    clearFormErrors(resetFields);
}

function clearAllMessages() {
    clearMessage("loginMessage");
    clearMessage("signupMessage");
    clearMessage("resetMessage");
    document.getElementById("resendMessage").textContent = "";
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

[
    ...loginFields,
    ...signupFields,
    ...resetFields
].forEach(function (field) {
    const input = document.getElementById(field.input);

    input.addEventListener("input", function () {
        clearFieldError(field.input, field.error);

        if (field.input === "signupPassword" || field.input === "confirmPassword") {
            clearFieldError("confirmPassword", "confirmPasswordError");
        }

        if (field.input === "newPassword" || field.input === "confirmNewPassword") {
            clearFieldError("confirmNewPassword", "confirmNewPasswordError");
        }

        if (field.input === "resetCode") {
            clearMessage("resetMessage");
        }
    });
});

document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    clearFormErrors(loginFields);
    clearMessage("loginMessage");

    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value;
    let isValid = true;

    if (!username) {
        showFieldError("loginUsername", "loginUsernameError",
            "Please enter your email or username.");
        isValid = false;
    } else if (username.includes("@") && !isValidEmail(username)) {
        showFieldError("loginUsername", "loginUsernameError",
            "Please enter a valid email address.");
        isValid = false;
    } else {
        markFieldValid("loginUsername", "loginUsernameError");
    }

    if (!password.trim()) {
        showFieldError("loginPassword", "loginPasswordError",
            "Please enter your password.");
        isValid = false;
    } else {
        markFieldValid("loginPassword", "loginPasswordError");
    }

    if (!isValid) return;

    showMessage("loginMessage",
        "Logging in...",
        "success");
});

document.getElementById("signupForm").addEventListener("submit", function (event) {
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

        showScreen(loginScreen);

        showMessage("loginMessage",
            "Your account has been successfully created. Log in now.",
            "success");
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
        }
    });
});

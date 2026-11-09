# Authentication Test Cases

## 1. Objective

To verify that the registration, login, logout, set password, and reset password features work as expected, including expired and reused password tokens.

## 2. Test Cases

### TC-01 — Register with Valid Details

**Test Data:** Valid name, unused email address, and valid password.

**Steps:**
1. Open the Register page.
2. Enter valid required information.
3. Submit the form.

**Expected Result:** The account is created successfully or the expected next step is displayed.

**Actual Result:** To be recorded after testing.

**Status:** Not Run

### TC-02 — Register with Invalid or Missing Information

**Test Data:** Missing required fields or an invalid email address.

**Steps:**
1. Open the Register page.
2. Leave a required field empty or enter an invalid email.
3. Submit the form.

**Expected Result:** The application rejects invalid information and displays appropriate validation feedback.

**Actual Result:** To be recorded after testing.

**Status:** Not Run

### TC-03 — Login with Valid Credentials

**Test Data:** Correct email and password for a registered test account.

**Steps:**
1. Open the Login page.
2. Enter valid credentials.
3. Submit the form.

**Expected Result:** The user is authenticated and redirected to the expected page.

**Actual Result:** To be recorded after testing.

**Status:** Not Run

### TC-04 — Login with an Incorrect Password

**Test Data:** Registered email and incorrect password.

**Steps:**
1. Open the Login page.
2. Enter the test email and incorrect password.
3. Submit the form.

**Expected Result:** Login is rejected, and an appropriate error message is displayed.

**Actual Result:** To be recorded after testing.

**Status:** Not Run

### TC-05 — Logout Successfully

**Test Data:** An authenticated test session.

**Steps:**
1. Log in using valid credentials.
2. Select Logout.
3. Attempt to access the protected page again.

**Expected Result:** The user is logged out, and protected content requires authentication again.

**Actual Result:** To be recorded after testing.

**Status:** Not Run

### TC-06 — Set Password with a Valid Token

**Test Data:** Valid, unused set-password token and a password that meets the application's rules.

**Steps:**
1. Open the set-password link.
2. Enter the new password and confirmation, if required.
3. Submit the form.

**Expected Result:** The application accepts the token and sets the password successfully.

**Actual Result:** To be recorded after testing.

**Status:** Not Run

### TC-07 — Set Password with an Expired Token

**Test Data:** Expired set-password token.

**Steps:**
1. Open the set-password link using the expired token.
2. Attempt to set a new password.
3. Observe the result.

**Expected Result:** The application rejects the expired token and does not change the password.

**Actual Result:** To be recorded after testing.

**Status:** Not Run

### TC-08 — Set Password Using a Reused Token

**Test Data:** A set-password token that has already been used successfully.

**Steps:**
1. Complete a successful set-password operation.
2. Open the same link again.
3. Attempt to set another password.

**Expected Result:** The application rejects the reused token and does not allow another password change through it.

**Actual Result:** To be recorded after testing.

**Status:** Not Run

### TC-09 — Reset Password with a Valid Token

**Test Data:** Valid, unused password-reset token and a new password.

**Steps:**
1. Open the Forgot Password flow.
2. Request a reset link if necessary.
3. Open the reset link.
4. Enter and submit the new password.
5. Attempt to log in with the new password.

**Expected Result:** The password is reset successfully, and the new password can be used to log in.

**Actual Result:** To be recorded after testing.

**Status:** Not Run

### TC-10 — Reset Password with an Expired Token

**Test Data:** Expired password-reset token.

**Steps:**
1. Open the reset link using the expired token.
2. Attempt to submit a new password.
3. Observe the result.

**Expected Result:** The application rejects the expired token and does not change the password.

**Actual Result:** To be recorded after testing.

**Status:** Not Run

### TC-11 — Reset Password Using a Reused Token

**Test Data:** A password-reset token that has already been used successfully.

**Steps:**
1. Complete a successful password reset.
2. Open the same reset link again.
3. Attempt to set another password.

**Expected Result:** The application rejects the reused token and does not allow another password change through it.

**Actual Result:** To be recorded after testing.

**Status:** Not Run

## 3. Test Execution Summary

| Test ID | Test Scenario | Status | Actual Result |
|---|---|---|---|
| TC-01 | Register with valid details | Passed | The Account was successfully created. |
| TC-02 | Register with invalid or missing information | Passed | The System prevented submission. |
| TC-03 | Login with valid credentials | Passed | The User successfully logged in |
| TC-04 | Login with an incorrect password | Passed | The System rejected the incorrect password |
| TC-05 | Logout successfully | Passed | The user successfully logged out, and the session ended. |
| TC-06 | Set password with a valid token | Passed | The system accepted the valid token and successfully set the password. |
| TC-07 | Set password with an expired token | Passed | The system rejected the expired token and did not change the password. |
| TC-08 | Set password using a reused token | Passed | The system rejected the reused token and did not allow another password change. |
| TC-09 | Reset password with a valid token | Passed | The password was successfully reset, and the user was able to log in using the new password. |
| TC-10 | Reset password with an expired token | Passed | The system rejected the expired reset token and did not allow the password to be changed. |
| TC-11 | Reset password using a reused token | Passed | The system rejected the reused reset token and did not allow another password change using the same token. |

## 4. Bug Log

No bugs were observed in the test cases executed. All tested features passed their expected results.

## 5. Notes and Follow-up

- Tests not yet run: None
- Blocked tests and reasons: None
- Retests needed: None
- Overall result: Passed – All 11 test cases were successfully executed and passed.

**Reminder:** All test results are based on the actual testing performed.

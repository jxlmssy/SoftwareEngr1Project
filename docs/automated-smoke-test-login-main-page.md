# Automated Smoke Test: Login and Main Page 

## 1. Objective

To automate basic smoke tests that verify whether users can successfully log in and access the application's main page.

## 2. Test Cases

### TC-01: Login with valid credentials
- **Test Data:** Valid registered email and password from the test environment.
- **Steps:**
  1. Open the application login page.
  2. Enter a valid email address.
  3. Enter the correct password.
  4. Click the Login button.
- **Expected Result:** Login succeeds, and the user is redirected to the main page.

### TC-02: Login with invalid credentials
- **Test Data:** Registered email and incorrect password.
- **Steps:**
  1. Open the login page.
  2. Enter a registered email address.
  3. Enter an incorrect password.
  4. Click the Login button.
- **Expected Result:** Login is rejected, and an appropriate error message is displayed.

### TC-03: Main page loads successfully
- **Test Data:** Valid authenticated test account.
- **Steps:**
  1. Log in using valid credentials.
  2. Wait for the main page to load.
  3. Verify that the main page is displayed.
- **Expected Result:** The main page loads without errors and displays its expected main content.

### TC-04: Protected main page requires authentication
- **Test Data:** User who is not logged in.
- **Steps:**
  1. Open the application without logging in.
  2. Attempt to access the main page directly.
- **Expected Result:** The application redirects the user to the login page or denies access.

## 3. Automation Requirements

- Use the automated testing framework already configured in the project.
- Automate the login and main page checks.
- Use test credentials from environment variables or the project's approved test configuration.
- Do not hardcode passwords, API keys, or other secrets.
- Ensure the tests can be executed repeatedly.

## 4. Test Execution Summary

| Test ID | Test Scenario | Status | Actual Result |
|---|---|---|---|
| TC-01 | Login with valid credentials | Not Run | N/A |
| TC-02 | Login with invalid credentials | Not Run | N/A |
| TC-03 | Main page loads successfully | Not Run | N/A |
| TC-04 | Protected main page requires authentication | Not Run | N/A |

## 5. Bug Log

| Bug ID / Issue Link | Related Test ID | Steps to Reproduce | Expected Result | Actual Result | Severity | Status |
|---|---|---|---|---|---|---|
| None recorded yet | — | — | — | — | — | — |

## 6. Notes

- Record actual automated test results after execution.
- Mark tests as Pass, Fail, or Blocked.
- Create GitHub Issues for confirmed defects.
- Include relevant test output or screenshots when available.
- Do not include actual passwords or secret values in the document.

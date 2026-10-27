# Test Plan and Acceptance Criteria

## 1. Test Plan

### 1.1 Objective

The objective of this test plan is to verify that the Sign Up, Log In, and Dashboard features work as expected, identify defects, and document test results.

### 1.2 Scope

**Features to test**
- Sign-up form validation and account creation
- Login with valid and invalid credentials
- Dashboard access after login
- Dashboard access when the user is not logged in
- Logout and session behavior, if implemented

### 1.3 Test Approach

1. Prepare sample test data.
2. Execute the test cases in Section 2 against the available application.
3. Compare actual behavior with expected results.
4. Record each test as Pass, Fail, Blocked, or Not Run.
5. Record observed failures and reproduction steps in Section 3.
6. Retest failed cases after fixes are provided.

### 1.4 Test Environment

- Application URL/build: To be recorded
- Browser/device: To be recorded
- Test account: Use a dedicated test account; do not include real passwords in this document.
- Test date: To be recorded during execution

### 1.5 Acceptance Criteria

- Test cases include steps, test data, and expected results.
- Actual results and statuses are recorded after test execution.
- Failed test cases have corresponding bug reports when applicable.
- Tests that cannot be executed are marked Blocked or Not Run, with a reason.
- Observed bugs are logged as GitHub Issues.

## 2. Test Cases

### TC-01 — Sign Up with Valid Details

**Test Data:** A valid sample name, unused email address, and password that meets the system's rules.

**Steps:**
1. Open the Sign Up page.
2. Enter valid required details.
3. Submit the form.

**Expected Result:** The system accepts the details and creates the account or displays the documented next step.

**Actual Result:** To be recorded after testing.

**Status:** Not Run

### TC-02 — Sign Up with Required Fields Empty

**Test Data:** Leave one or more required fields empty.

**Steps:**
1. Open the Sign Up page.
2. Leave required fields empty.
3. Submit the form.

**Expected Result:** The system prevents submission or clearly identifies the required fields.

**Actual Result:** To be recorded after testing.

**Status:** Not Run

### TC-03 — Sign Up with Invalid Email Format

**Test Data:** An invalid email format, such as `alexexample.com`.

**Steps:**
1. Open the Sign Up page.
2. Enter an invalid email and otherwise valid sample details.
3. Submit the form.

**Expected Result:** The system rejects the invalid email and indicates the validation issue.

**Actual Result:** To be recorded after testing.

**Status:** Not Run

### TC-04 — Sign Up with an Existing Email

**Test Data:** The email address of an existing test account.

**Steps:**
1. Open the Sign Up page.
2. Enter the existing test email and otherwise valid details.
3. Submit the form.

**Expected Result:** If duplicate registration is not allowed, the system prevents the duplicate account and displays an appropriate message.

**Actual Result:** To be recorded after testing.

**Status:** Not Run

### TC-05 — Sign Up with Mismatched Passwords

**Precondition:** The form has Password and Confirm Password fields.

**Test Data:** Different values in the two password fields.

**Steps:**
1. Open the Sign Up page.
2. Enter valid sample details.
3. Enter different passwords in the two password fields.
4. Submit the form.

**Expected Result:** The system prevents submission and indicates that the passwords do not match.

**Actual Result:** To be recorded after testing.

**Status:** Not Run

### TC-06 — Log In with Valid Credentials

**Precondition:** A test account has been created.

**Test Data:** The test account's correct email and password.

**Steps:**
1. Open the Log In page.
2. Enter the correct test-account credentials.
3. Submit the form.

**Expected Result:** The system authenticates the user and opens the dashboard or the expected post-login page.

**Actual Result:** To be recorded after testing.

**Status:** Not Run

### TC-07 — Log In with an Incorrect Password

**Precondition:** A test account exists.

**Test Data:** Correct test email and incorrect password.

**Steps:**
1. Open the Log In page.
2. Enter the test email and an incorrect password.
3. Submit the form.

**Expected Result:** Login is rejected, an appropriate error message appears, and the user is not authenticated.

**Actual Result:** To be recorded after testing.

**Status:** Not Run

### TC-08 — Log In with Required Fields Empty

**Test Data:** Leave the email and/or password empty.

**Steps:**
1. Open the Log In page.
2. Leave one or both required fields empty.
3. Submit the form.

**Expected Result:** The system prevents login and indicates the missing required information.

**Actual Result:** To be recorded after testing.

**Status:** Not Run

### TC-09 — Open Dashboard After Successful Login

**Precondition:** A test account exists.

**Test Data:** Valid test-account credentials.

**Steps:**
1. Log in with valid credentials.
2. Observe the page displayed after login.
3. Check the dashboard's visible content and navigation.

**Expected Result:** The dashboard loads successfully, and its implemented content and navigation appear without unexpected errors.

**Actual Result:** To be recorded after testing.

**Status:** Not Run

### TC-10 — Open Dashboard Without Logging In

**Precondition:** The dashboard route is known, and the user is logged out.

**Test Data:** The dashboard URL in a logged-out browser session.

**Steps:**
1. Log out or open a fresh private browser session.
2. Enter the dashboard URL directly.
3. Observe the result.

**Expected Result:** If the dashboard is protected, the system blocks access to protected content and redirects to Log In or displays an access-denied response.

**Actual Result:** To be recorded after testing.

**Status:** Not Run

### TC-11 — Log Out

**Precondition:** The user is logged in and a logout feature is implemented.

**Test Data:** An authenticated test session.

**Steps:**
1. Log in.
2. Select Log Out.
3. Try to open the protected dashboard again.

**Expected Result:** The session ends, and protected dashboard content is no longer accessible without logging in again.

**Actual Result:** To be recorded after testing.

**Status:** Not Run

### TC-12 — Check Dashboard Navigation

**Precondition:** The user is logged in and dashboard navigation items are implemented.

**Test Data:** Available dashboard navigation items and buttons.

**Steps:**
1. Log in.
2. Click each implemented navigation item or button.
3. Observe the destination or action.

**Expected Result:** Each implemented item opens the correct page or performs its documented action without broken links or unexpected errors.

**Actual Result:** To be recorded after testing.

**Status:** Not Run

## 3. Test Results and Bug Log

### 3.1 Test Execution Summary

| Test ID | Test Scenario | Status | Actual Result |
|---|---|---|---|
| TC-01 | Sign Up with valid details | Not Run | N/A |
| TC-02 | Sign Up with required fields empty | Not Run | N/A |
| TC-03 | Sign Up with invalid email format | Not Run | N/A |
| TC-04 | Sign Up with an existing email | Not Run | N/A |
| TC-05 | Sign Up with mismatched passwords | Not Run | N/A |
| TC-06 | Log In with valid credentials | Not Run | N/A |
| TC-07 | Log In with an incorrect password | Not Run | N/A |
| TC-08 | Log In with required fields empty | Not Run | N/A |
| TC-09 | Open dashboard after login | Not Run | N/A |
| TC-10 | Open dashboard without login | Not Run | N/A |
| TC-11 | Log out | Not Run | N/A |
| TC-12 | Check dashboard navigation | Not Run | N/A |


### 3.2 Bug Log

Create a GitHub Issue for each observed defect. Do not record hypothetical problems as confirmed bugs.

| Bug ID | Related Test | Steps to Reproduce | Expected Result | Actual Result | Severity | Status |
|---|---|---|---|---|---|---|
| To be assigned | To be recorded | To be recorded | To be recorded | To be recorded | To be assigned | To be assigned |

If no bugs are found, record that no bugs were observed in the test cases executed, after testing is complete.

### 3.3 Notes and Follow-up

- Tests not yet run: To be recorded
- Blocked tests and reasons: To be recorded, if applicable
- Retests needed: To be recorded, if applicable
- Overall result: Pending execution

**Reminder:** Update the actual results and statuses after running each test. Do not mark an unexecuted test as Pass.


# Sprint 1 Smoke and Regression Test Cases

## Task ID

S2-TST-05

## Description

Run the Sprint 1 smoke and regression tests to check if the authentication and user management features are still working after the Sprint 2 database migrations, views, and navigation updates.

## Objective

To verify that the existing Sprint 1 features continue to work properly and that the recent Sprint 2 changes did not introduce any unexpected problems.

## Test Cases

| Test Case ID | Test Scenario | Test Steps | Test Data | Expected Result | Status | Actual Result |
|---|---|---|---|---|---|---|
| TC-001 | Open Landing Page | 1. Open the application. 2. Check if the landing page loads. 3. Check the Sign In and Register options. | Application URL | Landing page loads successfully with Sign In and Register options. | Not Run | Not yet tested |
| TC-002 | Register New Account | 1. Open the Register page. 2. Enter valid details. 3. Submit the form. 4. Check if the account is created. | First Name: Test; Last Name: Account; Unique test email; Valid test password | Account is created successfully with the default User role. | Not Run | Not yet tested |
| TC-003 | Login with Valid Credentials | 1. Open the Login page. 2. Enter valid credentials. 3. Click Login. 4. Check the dashboard. | Existing active test account | User logs in successfully and reaches the correct dashboard. | Not Run | Not yet tested |
| TC-004 | Login with Invalid Credentials | 1. Open the Login page. 2. Enter an incorrect email or password. 3. Click Login. 4. Check the response. | Invalid email or password | Login is rejected and an appropriate error message is displayed. | Not Run | Not yet tested |
| TC-005 | Access Dashboard Without Login | 1. Log out of the application. 2. Open the dashboard URL directly. 3. Check the system response. | Logged-out browser session | Access is denied or the visitor is redirected to the Login page. | Not Run | Not yet tested |
| TC-006 | Logout from the Application | 1. Login using a valid account. 2. Click Logout. 3. Try accessing the dashboard again. | Existing active test account | User is logged out and cannot access protected pages using the previous session. | Not Run | Not yet tested |
| TC-007 | Forgot Password | 1. Open the Login page. 2. Click Forgot Password. 3. Enter a registered email. 4. Submit the request. | Registered test email | Password reset request is accepted and an appropriate confirmation is displayed. | Not Run | Not yet tested |
| TC-008 | Open User Management as Admin | 1. Login using an Admin account. 2. Open the dashboard. 3. Click User Management. | Admin test account | Admin can access the User Management page according to assigned permissions. | Not Run | Not yet tested |
| TC-009 | View User List | 1. Login as an authorized Admin. 2. Open User Management. 3. Check the user list. 4. Verify the displayed records. | Existing test user accounts | User list loads successfully and displays the available user records. | Not Run | Not yet tested |
| TC-010 | Update User Role | 1. Login using an authorized administrator account. 2. Open User Management. 3. Select a test user. 4. Change the user's role to another permitted role. 5. Save the changes. | Existing test user and permitted role | The updated user role is saved and displayed correctly. | Not Run | Not yet tested |
| TC-011 | Blocked User Login | 1. Login as an authorized administrator. 2. Block a designated test user. 3. Log out. 4. Try logging in using the blocked account. | Blocked test user account | The blocked user cannot log in and an appropriate message is displayed. | Not Run | Not yet tested |
| TC-012 | Navigation Based on User Role | 1. Login using an Admin account. 2. Check the navigation menu. 3. Log out. 4. Login using a regular User account. 5. Compare the available menus. | Admin and User test accounts | Each account only sees the navigation options allowed for its role and assigned permissions. | Not Run | Not yet tested |

## Test Execution Summary

| Status | Count |
|---|---:|
| Pass | 0 |
| Fail | 0 |
| Not Run | 12 |
| **Total** | **12** |

## Bug Log

| Bug ID | Test Case ID | Bug Description | Status |
|---|---|---|---|
| N/A | N/A | No bugs recorded yet. | N/A |

## Notes

- Run the regression tests after the S2-DEV-08 changes are available.
- Execute each test case and record its actual result.
- Change the status to Pass or Fail based on the actual test result.
- Create a GitHub Issue for every failed test or discovered bug.
- Use test accounts only. Do not include real passwords or private account information.
- Do not mark tests as Pass unless they have been successfully executed.

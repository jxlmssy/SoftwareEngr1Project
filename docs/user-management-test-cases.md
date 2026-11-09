# User Management Test Cases 

## 1. Objective

To verify the User Management functions, including adding, editing, blocking/unblocking, approving users, designating Admin accounts, protecting Superadmin accounts, and enforcing the last-Superadmin guard.

## 2. Test Cases

### TC-01: Add a user
- **Test Data:** Valid new user details.
- **Steps:**
  1. Log in as an authorized user manager.
  2. Open the User Management page.
  3. Select Add User.
  4. Enter valid user details.
  5. Submit the form.
- **Expected Result:** The new user is successfully created and appears in the user list.

### TC-02: Add a user with invalid details
- **Test Data:** Invalid email or missing required information.
- **Steps:**
  1. Open the Add User form.
  2. Enter incomplete or invalid details.
  3. Submit the form.
- **Expected Result:** The user is not created, and appropriate validation messages are displayed.

### TC-03: Edit user details
- **Test Data:** Existing user account and updated valid information.
- **Steps:**
  1. Open User Management.
  2. Select an existing user.
  3. Click Edit.
  4. Update the permitted information.
  5. Save the changes.
- **Expected Result:** The updated information is saved and displayed correctly.

### TC-04: Block a user
- **Test Data:** Active user account.
- **Steps:**
  1. Open User Management.
  2. Select an active user.
  3. Click Block.
  4. Confirm the action if prompted.
- **Expected Result:** The account is blocked, and its status is updated.

### TC-05: Unblock a user
- **Test Data:** Blocked user account.
- **Steps:**
  1. Open User Management.
  2. Select a blocked user.
  3. Click Unblock.
  4. Confirm the action if prompted.
- **Expected Result:** The account is unblocked, and its status is updated.

### TC-06: Approve a pending user
- **Test Data:** Registered user with Pending approval status.
- **Steps:**
  1. Open the pending users list.
  2. Select a pending user.
  3. Click Approve.
  4. Confirm the action if prompted.
- **Expected Result:** The user is approved, and the account status is updated.

### TC-07: Designate a user as Admin
- **Test Data:** Eligible user account and authorized account manager.
- **Steps:**
  1. Open User Management.
  2. Select an eligible user.
  3. Choose the option to assign the Admin role.
  4. Confirm or save the change.
- **Expected Result:** The selected user's role changes to Admin.

### TC-08: Admin cannot view Superadmin accounts
- **Test Data:** Admin account and existing Superadmin account.
- **Steps:**
  1. Log in using the Admin account.
  2. Open User Management.
  3. Search for or attempt to access a Superadmin account.
- **Expected Result:** The Admin cannot view or access protected Superadmin account details.

### TC-09: Admin cannot edit Superadmin accounts
- **Test Data:** Admin account and existing Superadmin account.
- **Steps:**
  1. Log in using the Admin account.
  2. Attempt to access the Superadmin account's edit option.
  3. Attempt the edit through the approved test interface, if applicable.
- **Expected Result:** The edit operation is denied, and the Superadmin account remains unchanged.

### TC-10: Prevent removal or demotion of the last Superadmin
- **Test Data:** Test environment with exactly one active Superadmin.
- **Steps:**
  1. Log in using an account authorized to manage Superadmin accounts.
  2. Attempt to remove or demote the only active Superadmin.
  3. Confirm the action if prompted.
- **Expected Result:** The operation is rejected, and at least one active Superadmin remains.

### TC-11: Remove or demote a Superadmin when another exists
- **Test Data:** Test environment with at least two active Superadmin accounts.
- **Steps:**
  1. Log in using an authorized account.
  2. Select one Superadmin account.
  3. Attempt to remove or demote that account.
  4. Confirm the action if prompted.
- **Expected Result:** The operation follows the system's permissions and succeeds only if another active Superadmin remains.

## 3. Test Execution Summary

| Test ID | Test Scenario | Status | Actual Result |
|---|---|---|---|
| TC-01 | Add a user | Passed | The user was successfully added to the system. |
| TC-02 | Add a user with invalid details | Passed | The system rejected the invalid details and prevented the user from being added. |
| TC-03 | Edit user details | Passed | The user details were successfully updated. |
| TC-04 | Block a user | Passedn | The selected user was successfully blocked. |
| TC-05 | Unblock a user | Passed | The selected user was successfully unblocked. |
| TC-06 | Approve a pending user | Passed | The pending user was successfully approved. |
| TC-07 | Designate a user as Admin | Passed | The selected user was successfully assigned the Admin role. |
| TC-08 | Admin cannot view Superadmin accounts | Passed | The Admin could not view Superadmin accounts in User Management. |
| TC-09 | Admin cannot edit Superadmin accounts | Passed | The Admin could not edit Superadmin accounts. |
| TC-10 | Prevent removal or demotion of the last Superadmin | Not Run | N/A |
| TC-11 | Remove or demote a Superadmin when another exists | Not Run | N/A |

## 4. Bug Log

| Bug ID / Issue Link | Related Test ID | Steps to Reproduce | Expected Result | Actual Result | Severity | Status |
|---|---|---|---|---|---|---|
| None recorded yet | — | — | — | — | — | — |

## 5. Notes

- Record actual results after executing each test.
- Replace Not Run with Pass, Fail, or Blocked.
- Create GitHub Issues for confirmed defects.
- Use authorized test accounts and a safe test environment.
- Do not use the production Superadmin account for destructive tests.
- Never include real passwords or secret tokens in this document.

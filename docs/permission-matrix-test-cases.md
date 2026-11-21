# Permission Matrix Test Cases 

## 1. Objective

To verify that Superadmin, Admin, and User accounts have the correct permissions when accessing application menus, buttons, and server-side functions.

## 2. Test Accounts

Use registered and approved test accounts for each role.

| Account | Role | Status |
|---|---|---|
| Test Account 1 | Superadmin | Registered and Approved |
| Test Account 2 | Admin | Registered and Approved |
| Test Account 3 | User | Registered and Approved |

Do not include actual passwords or secret credentials in this document.

## 3. Permission Matrix

Complete this matrix using the application's actual permission list and approved access rules.

| Permission / Action | Superadmin | Admin | User |
|---|---|---|---|
| View Dashboard | Allowed | Allowed | Allowed |
| View User Management | Allowed | Allowed | Denied |
| Add User | Allowed | Allowed | Denied |
| Edit User | Allowed | Allowed | Denied |
| Block / Unblock User | Allowed | Allowed | Denied |
| Approve User | Allowed | Allowed | Denied |
| Designate Admin | Allowed | Denied | Denied |
| Access Restricted Pages | Allowed | To Verify | Denied |

**Note:** Replace `To Verify` with `Allowed` or `Denied` based on the official requirements. Do not assume permissions without confirming the project's rules.

## 4. Test Cases

### TC-01: Verify Superadmin permissions
- **Test Data:** Registered and approved Superadmin test account.
- **Steps:**
  1. Log in using the Superadmin account.
  2. Open the application's menus.
  3. Check the available buttons and actions.
  4. Attempt the actions assigned to the Superadmin role.
- **Expected Result:** Menus, buttons, and server-side actions follow the approved Superadmin permissions.

### TC-02: Verify Admin permissions
- **Test Data:** Registered and approved Admin test account.
- **Steps:**
  1. Log in using the Admin account.
  2. Open the application's menus.
  3. Check the available buttons and actions.
  4. Attempt the actions assigned to the Admin role.
- **Expected Result:** Admin can perform permitted actions but cannot perform restricted Superadmin-only actions.

### TC-03: Verify User permissions
- **Test Data:** Registered and approved User test account.
- **Steps:**
  1. Log in using the User account.
  2. Open the application's menus.
  3. Check the available buttons and actions.
  4. Attempt the actions assigned to the User role.
- **Expected Result:** User can access only the features and actions allowed for the User role.

### TC-04: Verify unauthorized menus are hidden
- **Test Data:** Superadmin, Admin, and User test accounts.
- **Steps:**
  1. Log in using each test account.
  2. Navigate through the available menus.
  3. Compare the displayed menus with the approved permission matrix.
- **Expected Result:** Each role sees only the menus it is authorized to access.

### TC-05: Verify unauthorized buttons and actions
- **Test Data:** Superadmin, Admin, and User test accounts.
- **Steps:**
  1. Log in using each test account.
  2. Open the relevant application pages.
  3. Check which action buttons are available.
  4. Compare the available actions with the permission matrix.
- **Expected Result:** Restricted actions are not available to unauthorized roles.

### TC-06: Verify server-side permission enforcement
- **Test Data:** Registered and approved test accounts for all three roles.
- **Steps:**
  1. Log in using a test account.
  2. Identify a server-side action that the account is not authorized to perform.
  3. Submit the corresponding request through the approved test environment.
  4. Observe the server response and verify that no unauthorized change occurred.
- **Expected Result:** The server rejects unauthorized requests, and protected data remains unchanged.

### TC-07: Verify permitted server-side actions
- **Test Data:** Test accounts with permissions to perform selected actions.
- **Steps:**
  1. Log in using an authorized test account.
  2. Perform an action allowed by the permission matrix.
  3. Verify the server response.
  4. Check whether the intended change was saved.
- **Expected Result:** Authorized requests succeed and the intended changes are applied.

### TC-08: Verify permissions for all roles across each right
- **Test Data:** Superadmin, Admin, and User test accounts; complete permission matrix.
- **Steps:**
  1. Select each permission listed in the approved matrix.
  2. Test the permission using the Superadmin account.
  3. Repeat using the Admin account.
  4. Repeat using the User account.
  5. Record whether each action is allowed or denied.
- **Expected Result:** All three roles follow the approved permission matrix consistently across the application menus, buttons, and server.

## 5. Test Execution Summary

| Test ID | Test Scenario | Status | Actual Result |
|---|---|---|---|
| TC-01 | Verify Superadmin permissions | Passed | The Superadmin successfully accessed all authorized menus and performed the permitted actions. |
| TC-02 | Verify Admin permissions | Passed | The Admin accessed User Management and performed only the actions allowed for the Admin role. |
| TC-03 | Verify User permissions | Passed | The User accessed only the features allowed for the User role |
| TC-04 | Verify unauthorized menus are hidden | Passed | Restricted buttons and actions were unavailable to unauthorized roles. |
| TC-05 | Verify unauthorized buttons and actions | Passed | Restricted buttons and actions were unavailable to unauthorized roles. |
| TC-06 | Verify server-side permission enforcement | Not Run | N/A |
| TC-07 | Verify permitted server-side actions | Not Run | N/A |
| TC-08 | Verify permissions for all roles across each right | Not Run | N/A |

## 6. Bug Log

Record actual permission-related defects as GitHub Issues.

| Bug ID / Issue Link | Related Test ID | Steps to Reproduce | Expected Result | Actual Result | Severity | Status |
|---|---|---|---|---|---|---|
| None recorded yet | — | — | — | — | — | — |

## 7. Notes

- Use only registered and approved test accounts.
- Confirm the official permission rules before completing the matrix.
- Test menus, buttons, and server-side enforcement separately.
- A hidden button does not prove that server-side access is protected.
- Record actual results as Pass, Fail, or Blocked.
- Create GitHub Issues for confirmed defects.
- Never include real passwords, tokens, or secret credentials in the document.

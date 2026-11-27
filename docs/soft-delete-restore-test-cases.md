# Soft Delete and Restore Test Cases

## Task ID
S2-TST-03

## Description
Test soft delete and restore functionality, including checking whether a parent record can be deleted when it still has active child records.

## 1. Test Scope

This document covers:
- Soft deleting a record.
- Restoring a deleted record.
- Checking if deleted records are marked as Inactive.
- Preventing deletion of parent records with active child records.
- Allowing deletion after all active child records are handled.
- Checking record visibility based on user roles.
- Verifying that deleted records are not permanently removed.

## 2. Test Cases

### TC-01: Soft Delete a Record Without Active Children

**Precondition:** An active record exists with no active child records.

**Test Steps:**
1. Log in as Admin or Superadmin.
2. Open the module containing the test record.
3. Select an active record with no active child records.
4. Click Delete.
5. Confirm the deletion.

**Test Data:**
- Test Record: TEST-001
- Status: Active
- Active Child Records: None

**Expected Result:**
- The system successfully soft deletes the record.
- The record's status changes to Inactive.
- The record is not permanently removed from the database.

**Status:** Not Run

**Actual Result:** Not yet tested.

---

### TC-02: Verify Deleted Record Status

**Precondition:** A record has been successfully soft deleted.

**Test Steps:**
1. Log in as Admin or Superadmin.
2. Open the module containing the deleted record.
3. Select the Inactive tab.
4. Search for the deleted record.
5. Check its status.

**Test Data:**
- Test Record: TEST-001
- Expected Status: Inactive

**Expected Result:**
- The deleted record appears in the Inactive list.
- Its status is displayed as Inactive.

**Status:** Not Run

**Actual Result:** Not yet tested.

---

### TC-03: Restore an Inactive Record

**Precondition:** An inactive record exists.

**Test Steps:**
1. Log in as Admin or Superadmin.
2. Open the module containing the inactive record.
3. Select the Inactive tab.
4. Find the test record.
5. Click Restore.
6. Confirm the action if required.

**Test Data:**
- Test Record: TEST-001
- Current Status: Inactive

**Expected Result:**
- The system successfully restores the record.
- Its status changes back to Active.
- The record becomes available in the Active list.

**Status:** Not Run

**Actual Result:** Not yet tested.

---

### TC-04: Prevent Deletion of a Parent With Active Child Records

**Precondition:** A parent record has at least one active child record.

**Test Steps:**
1. Log in as Admin or Superadmin.
2. Open the parent module.
3. Select a parent record with an active child record.
4. Click Delete.
5. Confirm the action if required.
6. Check the system response.

**Test Data:**
- Parent Record: TEST-PARENT-001
- Child Record: TEST-CHILD-001
- Parent Status: Active
- Child Status: Active

**Expected Result:**
- The system prevents the parent record from being deleted.
- An appropriate message explains that active child records must be handled first.
- The parent record remains Active.

**Status:** Not Run

**Actual Result:** Not yet tested.

---

### TC-05: Allow Parent Deletion After All Child Records Are Inactive

**Precondition:** A parent record has child records, but all child records are already inactive.

**Test Steps:**
1. Log in as Admin or Superadmin.
2. Open the parent module.
3. Find a parent record whose child records are all inactive.
4. Click Delete.
5. Confirm the deletion.
6. Check the parent's status.

**Test Data:**
- Parent Record: TEST-PARENT-002
- Child Record: TEST-CHILD-002
- Parent Status: Active
- Child Status: Inactive

**Expected Result:**
- The system allows the parent record to be soft deleted if no active child records remain.
- The parent's status changes to Inactive.
- The record is not permanently removed.

**Status:** Not Run

**Actual Result:** Not yet tested.

---

### TC-06: Prevent Deletion When One of Multiple Child Records Is Still Active

**Precondition:** A parent record has multiple child records, and at least one child record is active.

**Test Steps:**
1. Log in as Admin or Superadmin.
2. Open the parent module.
3. Select a parent record with multiple child records.
4. Check that at least one child record is Active.
5. Click Delete.
6. Check the system response.

**Test Data:**
- Parent Record: TEST-PARENT-003
- Child Record 1: Inactive
- Child Record 2: Active

**Expected Result:**
- The system prevents the parent record from being deleted.
- The parent remains Active because at least one active child record still exists.

**Status:** Not Run

**Actual Result:** Not yet tested.

---

### TC-07: Verify Restored Parent Record and Its Child Records

**Precondition:** A parent record has been soft deleted and is ready for restoration.

**Test Steps:**
1. Log in as Admin or Superadmin.
2. Open the parent module.
3. Find the inactive parent record.
4. Click Restore.
5. Open the related child module.
6. Check the status of the child records.

**Test Data:**
- Parent Record: TEST-PARENT-004
- Related Child Record: TEST-CHILD-004

**Expected Result:**
- The parent record is restored successfully.
- Its related child records retain their existing statuses unless the application is designed to restore them automatically.
- Existing relationships between the parent and child records remain intact.

**Status:** Not Run

**Actual Result:** Not yet tested.

---

### TC-08: Verify Deleted Records Are Hidden From Regular Users

**Precondition:** An inactive record exists.

**Test Steps:**
1. Log in as a regular User.
2. Open the relevant module.
3. Search for the inactive record.
4. Check whether it appears in the list.

**Test Data:**
- Test Record: TEST-001
- User Role: User
- Record Status: Inactive

**Expected Result:**
- The inactive record is not visible to regular Users.
- Only active records are displayed.

**Status:** Not Run

**Actual Result:** Not yet tested.

---

### TC-09: Verify Restore Permission

**Precondition:** An inactive record exists.

**Test Steps:**
1. Log in as a regular User.
2. Open the relevant module.
3. Check whether the inactive record or Restore action is visible.
4. Attempt to access the Restore action only if the application allows it.
5. Check the system response.

**Test Data:**
- Test Record: TEST-001
- User Role: User

**Expected Result:**
- Regular Users cannot restore inactive records.
- Restore functionality is available only to authorized roles, such as Admin or Superadmin.

**Status:** Not Run

**Actual Result:** Not yet tested.

---

### TC-10: Verify Record Data After Restore

**Precondition:** A record has been soft deleted and is ready for restoration.

**Test Steps:**
1. Log in as Admin or Superadmin.
2. Open the Inactive list.
3. Select the deleted test record.
4. Click Restore.
5. Open the restored record.
6. Check its saved information and related records.

**Test Data:**
- Test Record: TEST-001
- Original Name and Details: Record the original information before deletion.

**Expected Result:**
- The record is restored successfully.
- Its original information remains unchanged.
- Its existing relationships are retained.

**Status:** Not Run

**Actual Result:** Not yet tested.

## 3. Test Execution Summary

| Test Case | Description | Status | Actual Result |
|---|---|---|---|
| TC-01 | Soft Delete Without Active Children | Not Run | N/A |
| TC-02 | Verify Deleted Record Status | Not Run | N/A |
| TC-03 | Restore an Inactive Record | Not Run | N/A |
| TC-04 | Prevent Deletion With Active Children | Not Run | N/A |
| TC-05 | Delete Parent After Children Are Inactive | Not Run | N/A |
| TC-06 | Prevent Deletion With At Least One Active Child | Not Run | N/A |
| TC-07 | Verify Restored Parent and Child Records | Not Run | N/A |
| TC-08 | Deleted Records Hidden From Users | Not Run | N/A |
| TC-09 | Verify Restore Permission | Not Run | N/A |
| TC-10 | Verify Record Data After Restore | Not Run | N/A |

### Execution Notes
- Total Test Cases: 10
- Passed: 0
- Failed: 0
- Not Run: 10
- Blocked: 0
- Retests Needed: 0
- Overall Result: Not Run – Test execution is pending.

## 4. Bug Log

| Bug ID | Test Case | Description | Status |
|---|---|---|---|
| None | N/A | No confirmed bugs recorded yet. | N/A |

## 5. Acceptance Criteria Checklist

- [x] Soft delete and restore test cases are written.
- [x] Test cases include steps, test data, and expected results.
- [ ] Test results are recorded as Pass or Fail after execution.
- [ ] Any confirmed bugs are logged as issues.
- [ ] Tests are reviewed and completed.

# Customer Module Test Cases

## 1. Objective

To verify that the Customer Module allows authorized users to add, view, search, edit, delete, and restore customer records correctly.

## 2. Test Data

| Field | Sample Test Data |
|---|---|
| Customer Name | ABC Trading |
| Address | 123 Main Street, California |
| Payment Terms | 30D |
| Alternative Payment Terms | COD |
| Another Payment Term | 45D |

## 3. Test Cases

### TC-01: Add a customer
- **Test Data:** ABC Trading, 123 Main Street, California, 30D
- **Steps:**
  1. Log in using an account with permission to add customers.
  2. Open Customer Management.
  3. Click Add Customer.
  4. Enter the customer name, address, and payment terms.
  5. Save the record.
- **Expected Result:** The customer should be successfully added and displayed in the customer list.

### TC-02: Add a customer with an empty name
- **Test Data:** Empty customer name, 123 Main Street, California, 30D
- **Steps:**
  1. Open Customer Management.
  2. Click Add Customer.
  3. Leave the customer name empty.
  4. Enter the address and payment terms.
  5. Save the record.
- **Expected Result:** The system should prevent the customer from being saved without a customer name.

### TC-03: View customer records
- **Test Data:** Existing customer records
- **Steps:**
  1. Open Customer Management.
  2. View the customer list.
  3. Check the displayed customer information.
- **Expected Result:** The system should display the available customer records correctly.

### TC-04: Search for a customer
- **Test Data:** ABC Trading
- **Steps:**
  1. Open Customer Management.
  2. Enter ABC Trading in the search field.
  3. Review the search results.
- **Expected Result:** The system should display the matching customer record.

### TC-05: Edit customer details
- **Test Data:** Change ABC Trading's address to 456 New Street, California.
- **Steps:**
  1. Open Customer Management.
  2. Find ABC Trading.
  3. Click Edit.
  4. Update the address.
  5. Save the changes.
- **Expected Result:** The customer information should be updated successfully.

### TC-06: Update customer payment terms
- **Test Data:** Change payment terms from 30D to COD.
- **Steps:**
  1. Open Customer Management.
  2. Find an existing customer.
  3. Click Edit.
  4. Change the payment terms.
  5. Save the changes.
- **Expected Result:** The customer's payment terms should be updated successfully.

### TC-07: Delete a customer
- **Test Data:** An existing customer record.
- **Steps:**
  1. Open Customer Management.
  2. Find the selected customer.
  3. Click Delete.
  4. Confirm the action if prompted.
- **Expected Result:** The customer should be marked as Inactive and should no longer appear in the active customer list.

### TC-08: Restore a deleted customer
- **Test Data:** An inactive customer record.
- **Steps:**
  1. Open Customer Management using an Admin or Superadmin account.
  2. Select the Inactive tab.
  3. Find the deleted customer.
  4. Click Restore.
- **Expected Result:** The customer should be restored and appear in the active customer list.

### TC-09: Verify customer payment terms
- **Test Data:** 30D, 45D, and COD
- **Steps:**
  1. Open Customer Management.
  2. Add or edit customer records.
  3. Select each available payment term.
  4. Save and review the records.
- **Expected Result:** The system should accept the supported payment terms and display the selected value correctly.

### TC-10: Verify customer visibility by role
- **Test Data:** Admin and User accounts; active and inactive customer records.
- **Steps:**
  1. Log in using an Admin account.
  2. Open Customer Management and check the Active, Inactive, and All tabs.
  3. Log out and sign in using a User account with Customer viewing permission.
  4. Open Customer Management and review the displayed records.
- **Expected Result:** Admin should be able to view active and inactive customer records. User should only see active customer records, without the Status and Stamp columns.

## 4. Test Execution Summary

| Test ID | Test Scenario | Status | Actual Result |
|---|---|---|---|
| TC-01 | Add a customer | Not Run | N/A |
| TC-02 | Add a customer with an empty name | Not Run | N/A |
| TC-03 | View customer records | Not Run | N/A |
| TC-04 | Search for a customer | Not Run | N/A |
| TC-05 | Edit customer details | Not Run | N/A |
| TC-06 | Update customer payment terms | Not Run | N/A |
| TC-07 | Delete a customer | Not Run | N/A |
| TC-08 | Restore a deleted customer | Not Run | N/A |
| TC-09 | Verify customer payment terms | Not Run | N/A |
| TC-10 | Verify customer visibility by role | Not Run | N/A |

## 5. Bug Log

| Bug ID / Issue Link | Related Test ID | Steps to Reproduce | Expected Result | Actual Result | Severity | Status |
|---|---|---|---|---|---|---|
| None recorded yet | — | — | — | — | — | — |

## 6. Notes

- Execute all test cases using approved test accounts.
- Record actual results after testing.
- Mark each test as Passed, Failed, or Blocked.
- Create GitHub Issues for confirmed defects.
- Do not include actual passwords or secret credentials in this document.

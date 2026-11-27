# Per-Right Permission Test Cases – Customer and Product

## Task ID
S2-TST-04

## Description
Test individual permissions for Customer and Product Management, including Add, Edit, Delete, and Price History actions.

## 1. Test Scope

This document covers:
- Add Customer permission.
- Edit Customer permission.
- Delete Customer permission.
- Add Product permission.
- Edit Product permission.
- Delete Product permission.
- Add Price permission.
- Edit Price permission.
- Delete Price permission.
- Verifying that users can only perform actions allowed by their assigned rights.

## 2. Test Setup

**Test Accounts:**
- Admin Account – Used to assign and remove permissions.
- Test User Account – Used to verify the assigned permissions.

**Important:**
- Use a regular User account for permission testing.
- Enable the relevant module before testing its individual permissions.
- Grant only the specific permission being tested.
- Remove the permission after testing the allowed action.
- Use test records to avoid affecting important existing data.

## 3. Test Cases

### TC-01: Verify Add Customer Permission

**Precondition:** A test User account exists and has access to Customer Management.

**Test Steps:**
1. Log in as Admin.
2. Open User Management.
3. Select the test User account.
4. Open the Rights settings.
5. Enable Add Customer permission.
6. Log in using the test User account.
7. Open Customer Management.
8. Try adding a new customer.
9. Log back in as Admin and remove the Add Customer permission.
10. Log in again as the test User and check if the Add Customer action is available.

**Test Data:**
- Test User: testuser
- Customer Name: Permission Test Customer
- Address: 123 Test Street
- Payment Terms: COD

**Expected Result:**
- When Add Customer is granted, the User can add a customer successfully.
- When Add Customer is removed, the User cannot add a new customer.

**Status:** Not Run

**Actual Result:** Not yet tested.

---

### TC-02: Verify Edit Customer Permission

**Precondition:** An existing active customer record is available.

**Test Steps:**
1. Log in as Admin.
2. Open User Management and select the test User.
3. Enable Edit Customer permission.
4. Log in as the test User.
5. Open Customer Management.
6. Select an existing customer.
7. Edit the customer's address or payment terms.
8. Save the changes.
9. Log back in as Admin and remove the Edit Customer permission.
10. Log in again as the test User and check if editing is allowed.

**Test Data:**
- Customer Code: Use an existing test customer.
- Updated Address: 456 Updated Street
- Updated Payment Terms: COD

**Expected Result:**
- When Edit Customer is granted, the User can update customer information.
- When Edit Customer is removed, the User cannot edit customer information.

**Status:** Not Run

**Actual Result:** Not yet tested.

---

### TC-03: Verify Delete Customer Permission

**Precondition:** An active test customer with no active child records is available.

**Test Steps:**
1. Log in as Admin.
2. Open User Management and select the test User.
3. Enable Delete Customer permission.
4. Log in as the test User.
5. Open Customer Management.
6. Select the test customer.
7. Click Delete and confirm the action.
8. Check the customer's status.
9. Log back in as Admin and remove the Delete Customer permission.
10. Log in again as the test User and check if the Delete action is available.

**Test Data:**
- Customer Code: TEST-CUST-001
- Customer Status: Active

**Expected Result:**
- When Delete Customer is granted, the User can soft delete the test customer.
- The customer becomes Inactive instead of being permanently removed.
- When Delete Customer is removed, the User cannot delete another customer.

**Status:** Not Run

**Actual Result:** Not yet tested.

---

### TC-04: Verify Add Product Permission

**Precondition:** A test User account exists and has access to Product Management.

**Test Steps:**
1. Log in as Admin.
2. Open User Management and select the test User.
3. Enable Add Product permission.
4. Log in as the test User.
5. Open Product Management.
6. Click Add Product.
7. Enter the required product details.
8. Save the product.
9. Log back in as Admin and remove the Add Product permission.
10. Log in again as the test User and check if adding a product is allowed.

**Test Data:**
- Product Code: TEST-P-001
- Description: Permission Test Product
- Unit: Piece

**Expected Result:**
- When Add Product is granted, the User can add a new product.
- When Add Product is removed, the User cannot add another product.

**Status:** Not Run

**Actual Result:** Not yet tested.

---

### TC-05: Verify Edit Product Permission

**Precondition:** An existing active test product is available.

**Test Steps:**
1. Log in as Admin.
2. Open User Management and select the test User.
3. Enable Edit Product permission.
4. Log in as the test User.
5. Open Product Management.
6. Select the test product.
7. Edit its description or unit.
8. Save the changes.
9. Log back in as Admin and remove the Edit Product permission.
10. Log in again as the test User and check if editing is allowed.

**Test Data:**
- Product Code: TEST-P-001
- Updated Description: Updated Permission Test Product
- Unit: Piece

**Expected Result:**
- When Edit Product is granted, the User can update product information.
- When Edit Product is removed, the User cannot edit product information.

**Status:** Not Run

**Actual Result:** Not yet tested.

---

### TC-06: Verify Delete Product Permission

**Precondition:** An active test product is available and has no active price history records that would block deletion.

**Test Steps:**
1. Log in as Admin.
2. Open User Management and select the test User.
3. Enable Delete Product permission.
4. Log in as the test User.
5. Open Product Management.
6. Select the test product.
7. Click Delete and confirm the action.
8. Check the product status.
9. Log back in as Admin and remove the Delete Product permission.
10. Log in again as the test User and check if the Delete action is available.

**Test Data:**
- Product Code: TEST-P-002
- Product Status: Active

**Expected Result:**
- When Delete Product is granted, the User can soft delete the test product if no active child records prevent deletion.
- The product becomes Inactive.
- When Delete Product is removed, the User cannot delete another product.

**Status:** Not Run

**Actual Result:** Not yet tested.

---

### TC-07: Verify Add Price Permission

**Precondition:** An existing active product is available.

**Test Steps:**
1. Log in as Admin.
2. Open User Management and select the test User.
3. Enable Add Price permission.
4. Log in as the test User.
5. Open Product Management.
6. Select an active product.
7. Open its Prices or Price History section.
8. Add a new price record.
9. Save the record.
10. Log back in as Admin and remove the Add Price permission.
11. Log in again as the test User and check if adding a price is allowed.

**Test Data:**
- Product Code: TEST-P-001
- Effective Date: Use a valid date.
- Unit Price: 100.00

**Expected Result:**
- When Add Price is granted, the User can add a price record.
- The new price appears in the product's Price History.
- When Add Price is removed, the User cannot add another price record.

**Status:** Not Run

**Actual Result:** Not yet tested.

---

### TC-08: Verify Edit Price Permission

**Precondition:** An existing active product has a price history record.

**Test Steps:**
1. Log in as Admin.
2. Open User Management and select the test User.
3. Enable Edit Price permission.
4. Log in as the test User.
5. Open Product Management.
6. Select a product and open its Price History.
7. Select an existing price record.
8. Change its unit price.
9. Save the changes.
10. Log back in as Admin and remove the Edit Price permission.
11. Log in again as the test User and check if editing a price is allowed.

**Test Data:**
- Product Code: TEST-P-001
- Existing Unit Price: 100.00
- Updated Unit Price: 120.00

**Expected Result:**
- When Edit Price is granted, the User can update the existing price record.
- The updated price is saved successfully.
- When Edit Price is removed, the User cannot edit another price record.

**Status:** Not Run

**Actual Result:** Not yet tested.

---

### TC-09: Verify Delete Price Permission

**Precondition:** An active product has an active price history record.

**Test Steps:**
1. Log in as Admin.
2. Open User Management and select the test User.
3. Enable Delete Price permission.
4. Log in as the test User.
5. Open Product Management.
6. Select a product and open its Price History.
7. Select a test price record.
8. Click Delete and confirm the action.
9. Check the price record's status.
10. Log back in as Admin and remove the Delete Price permission.
11. Log in again as the test User and check if the Delete action is available.

**Test Data:**
- Product Code: TEST-P-001
- Price Record: Use an existing test price.
- Price Status: Active

**Expected Result:**
- When Delete Price is granted, the User can soft delete the test price record.
- The price record becomes Inactive instead of being permanently removed.
- When Delete Price is removed, the User cannot delete another price record.

**Status:** Not Run

**Actual Result:** Not yet tested.

## 4. Test Execution Summary

| Test Case | Description | Status | Actual Result |
|---|---|---|---|
| TC-01 | Add Customer Permission | Not Run | N/A |
| TC-02 | Edit Customer Permission | Not Run | N/A |
| TC-03 | Delete Customer Permission | Not Run | N/A |
| TC-04 | Add Product Permission | Not Run | N/A |
| TC-05 | Edit Product Permission | Not Run | N/A |
| TC-06 | Delete Product Permission | Not Run | N/A |
| TC-07 | Add Price Permission | Not Run | N/A |
| TC-08 | Edit Price Permission | Not Run | N/A |
| TC-09 | Delete Price Permission | Not Run | N/A |

### Execution Notes
- Total Test Cases: 9
- Passed: 0
- Failed: 0
- Not Run: 9
- Blocked: 0
- Retests Needed: 0
- Overall Result: Not Run – Test execution is pending.

## 5. Bug Log

| Bug ID | Test Case | Description | Status |
|---|---|---|---|
| None | N/A | No confirmed bugs recorded yet. | N/A |

## 6. Acceptance Criteria Checklist

- [x] Per-right permission test cases are written for Customer and Product.
- [x] Add, Edit, and Delete permissions are covered.
- [x] Add, Edit, and Delete Price permissions are covered.
- [x] Test cases include steps, test data, and expected results.
- [ ] Test results are recorded as Pass or Fail after execution.
- [ ] Any confirmed bugs are logged as issues.
- [ ] Tests are reviewed and completed.

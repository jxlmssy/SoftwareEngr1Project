# Product and Price History Test Cases

## 1. Objective

To verify that the Product Management and Price History modules work correctly, including adding, viewing, searching, editing, deleting, restoring products, and managing product prices.

## 2. Test Scope

- View and search product records
- Add and edit products
- Validate required product fields and duplicate product codes
- Delete and restore products
- View product price history
- Add, edit, delete, and restore price records
- Validate price values and effective dates
- Verify the current price based on the latest effective date
- Verify product and price visibility based on user roles

## 3. Test Cases

### TC-01: View Product Records

**Test Data:**
- Existing product records

**Steps:**
1. Log in using an account with Product Management access.
2. Open the Product Management module.
3. Review the displayed product records.

**Expected Result:**
- The product list should display the available product codes, descriptions, units, and current prices correctly.

**Actual Result:** Not yet tested.

**Status:** Not Run

---

### TC-02: Add a New Product

**Test Data:**
- Product Code: TEST-P-001
- Description: Test Product
- Unit: Piece

**Steps:**
1. Open Product Management.
2. Click Add Product.
3. Enter the product code, description, and unit.
4. Click Save.

**Expected Result:**
- The product should be successfully added and displayed in the product list.

**Actual Result:** Not yet tested.

**Status:** Not Run

---

### TC-03: Add a Product with Empty Required Fields

**Test Data:**
- Product Code: TEST-P-002
- Description: Empty
- Unit: Piece

**Steps:**
1. Open the Add Product form.
2. Enter the product code and unit.
3. Leave the description field empty.
4. Click Save.

**Expected Result:**
- The system should prevent the product from being saved and display a validation message.

**Actual Result:** Not yet tested.

**Status:** Not Run

---

### TC-04: Add a Product with an Existing Product Code

**Test Data:**
- Product Code: An existing product code
- Description: Duplicate Test Product
- Unit: Piece

**Steps:**
1. Open the Add Product form.
2. Enter an existing product code.
3. Enter the description and unit.
4. Click Save.

**Expected Result:**
- The system should reject the duplicate product code and prevent the duplicate record from being added.

**Actual Result:** Not yet tested.

**Status:** Not Run

---

### TC-05: Search for a Product

**Test Data:**
- Product Code: TEST-P-001

**Steps:**
1. Open Product Management.
2. Enter the product code or description in the search field.
3. Review the search results.

**Expected Result:**
- The system should display the matching product record.

**Actual Result:** Not yet tested.

**Status:** Not Run

---

### TC-06: Edit Product Details

**Test Data:**
- Product Code: TEST-P-001
- Updated Description: Updated Test Product
- Updated Unit: Box

**Steps:**
1. Find the test product in the product list.
2. Click Edit.
3. Update its description and unit.
4. Click Save.

**Expected Result:**
- The product details should be successfully updated and displayed in the product list.

**Actual Result:** Not yet tested.

**Status:** Not Run

---

### TC-07: Delete a Product

**Test Data:**
- Product Code: TEST-P-001

**Steps:**
1. Find the test product.
2. Click Delete.
3. Confirm the action.

**Expected Result:**
- The product should be marked as Inactive.
- The product should no longer appear in the active product list.
- Its related price history should remain available.

**Actual Result:** Not yet tested.

**Status:** Not Run

---

### TC-08: Restore a Deleted Product

**Test Data:**
- Product Code: TEST-P-001

**Steps:**
1. Log in as Admin or Superadmin.
2. Open the Inactive products list.
3. Find the deleted test product.
4. Click Restore.

**Expected Result:**
- The product should return to the active product list.
- Its existing product information and related price history should remain intact.

**Actual Result:** Not yet tested.

**Status:** Not Run

---

### TC-09: View Product Price History

**Test Data:**
- Product Code: P-003

**Steps:**
1. Open Product Management.
2. Find product P-003.
3. Click Prices.
4. Review the displayed price history.

**Expected Result:**
- The system should display the price records associated with the selected product, including their effective dates and unit prices.

**Actual Result:** Not yet tested.

**Status:** Not Run

---

### TC-10: Add a New Price Record

**Test Data:**
- Product Code: TEST-P-001
- Effective Date: 2026-06-01
- Unit Price: 120.00

**Steps:**
1. Open the price history of TEST-P-001.
2. Click Add Price.
3. Enter the effective date and unit price.
4. Click Save Price.

**Expected Result:**
- The new price record should be successfully saved and displayed in the product's price history.

**Actual Result:** Not yet tested.

**Status:** Not Run

---

### TC-11: Add a Duplicate Price Record

**Test Data:**
- Product Code: TEST-P-001
- Effective Date: 2026-06-01
- Unit Price: 150.00

**Steps:**
1. Open the price history of TEST-P-001.
2. Click Add Price.
3. Enter the same effective date as an existing active price record for that product.
4. Enter a different unit price.
5. Click Save Price.

**Expected Result:**
- The system should prevent another active price record with the same product code and effective date from being added.

**Actual Result:** Not yet tested.

**Status:** Not Run

---

### TC-12: Add a Price with an Invalid Value

**Test Data:**
- Product Code: TEST-P-001
- Effective Date: 2026-07-01
- Unit Price: -50.00

**Steps:**
1. Open the price history of TEST-P-001.
2. Click Add Price.
3. Enter the effective date.
4. Enter a negative unit price.
5. Click Save Price.

**Expected Result:**
- The system should reject the negative price and display a validation message.
- The invalid price record should not be saved.

**Actual Result:** Not yet tested.

**Status:** Not Run

---

### TC-13: Edit an Existing Price Record

**Test Data:**
- Product Code: TEST-P-001
- Effective Date: 2026-06-01
- Original Unit Price: 120.00
- Updated Unit Price: 130.00

**Steps:**
1. Open the price history of TEST-P-001.
2. Find the price record with the effective date 2026-06-01.
3. Click Edit.
4. Change the unit price to 130.00.
5. Click Update Price.

**Expected Result:**
- The unit price should be updated successfully.
- The effective date should remain unchanged.

**Actual Result:** Not yet tested.

**Status:** Not Run

---

### TC-14: Delete and Restore a Price Record

**Test Data:**
- Product Code: TEST-P-001
- Effective Date: 2026-06-01

**Steps:**
1. Open the price history of TEST-P-001.
2. Delete the selected price record.
3. Confirm the action.
4. Open the inactive price records.
5. Click Restore on the deleted price record.

**Expected Result:**
- The selected price record should become Inactive after deletion.
- An Admin or Superadmin should be able to restore it.
- The restored price record should appear in the active price history again.

**Actual Result:** Not yet tested.

**Status:** Not Run

---

### TC-15: Verify Current Price Based on Effective Date

**Test Data:**
- Product Code: TEST-P-001
- Price 1: 100.00, Effective Date: 2026-01-01
- Price 2: 120.00, Effective Date: 2026-06-01
- Price 3: 150.00, Effective Date: 2027-01-01

**Steps:**
1. Add the three price records using their respective effective dates.
2. Return to Product Management.
3. Find TEST-P-001.
4. Check the displayed Current Price.

**Expected Result:**
- The Current Price should be 120.00 because it has the latest effective date that is not in the future.
- The future price of 150.00 should not be treated as the current price.

**Actual Result:** Not yet tested.

**Status:** Not Run

---

## 4. Test Execution Summary

| Test ID | Test Scenario | Status | Actual Result |
|---|---|---|---|
| TC-01 | View Product Records | Not Run | N/A |
| TC-02 | Add a New Product | Not Run | N/A |
| TC-03 | Empty Required Fields | Not Run | N/A |
| TC-04 | Duplicate Product Code | Not Run | N/A |
| TC-05 | Search for a Product | Not Run | N/A |
| TC-06 | Edit Product Details | Not Run | N/A |
| TC-07 | Delete a Product | Not Run | N/A |
| TC-08 | Restore a Deleted Product | Not Run | N/A |
| TC-09 | View Product Price History | Not Run | N/A |
| TC-10 | Add a New Price Record | Not Run | N/A |
| TC-11 | Duplicate Price Record | Not Run | N/A |
| TC-12 | Invalid Price Value | Not Run | N/A |
| TC-13 | Edit an Existing Price | Not Run | N/A |
| TC-14 | Delete and Restore Price | Not Run | N/A |
| TC-15 | Verify Current Price | Not Run | N/A |

## 5. Bug Log

| Bug ID | Description | Severity | Status |
|---|---|---|---|
| None recorded yet | No confirmed bugs recorded. | N/A | N/A |

## 6. Notes and Follow-up

- Tests not yet run: 15
- Blocked tests and reasons: None
- Retests needed: To be determined after execution
- Overall result: Not Run – Test execution is pending.
- Record the actual result of every test after execution.
- Create a GitHub issue for every confirmed defect.
- Use approved test accounts and avoid including passwords or private credentials in this document.

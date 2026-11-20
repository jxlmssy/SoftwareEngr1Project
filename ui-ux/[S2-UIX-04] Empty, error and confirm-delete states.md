# Empty, Error and Confirm-Delete States: Mockups and Handoff Notes
<img width="1965" height="914" alt="no customers" src="https://github.com/user-attachments/assets/8d523ab6-fd13-48cf-b2ba-a928b3ed5e40" />
<img width="492" height="313" alt="Screenshot 2026-11-20 235723" src="https://github.com/user-attachments/assets/7822e143-0302-41e7-8e57-5af9414f7be4" />
<img width="1965" height="914" alt="no products" src="https://github.com/user-attachments/assets/ee02c0f6-4493-4717-8739-9479d28e97d4" />
<img width="610" height="531" alt="Screenshot 2026-11-20 235900" src="https://github.com/user-attachments/assets/00a6d7ce-74e5-4526-9230-1b8e84828719" />
<img width="238" height="422" alt="Screenshot 2026-11-21 000735" src="https://github.com/user-attachments/assets/bb737934-fa7c-420d-bf14-d8af61373fd0" />

# Description
This document outlines the mockups and developer handoff notes for task **[S2-UIX-04]**. It adds the empty, error and confirm-delete states to the Customer Management and Product Management screens built in **[S2-UIX-03]** for the Hope, Inc. ERP system. It uses the same dark interface with white dialogs, navy primary actions and red destructive actions.

**File & Assets**
- **UI Blueprint & Repository:** https://www.figma.com/design/O1EsT9in4dEaMgsvskkPuj/SOFT-ENGR-GRP?node-id=0-1&t=iR3IiLJhCXCr15Ke-1
- **Main View Panels:** customers (empty), Customer search (no results), Error Add Customer, CUST Delete Confirmation, CUST Restore Confirmation, products (empty), Product search (no results), Error Add Product, Error Add Price, internet connection - error load products, PROD Delete Confirmation, PROD Restore Confirmation, Price Delete Confirmation.

**Screen Components and User Flow**
1. **Customer Management: Empty and Search States**
- **Empty List:** Shown when there are no customers. The table header stays visible. The body shows a `+` icon, the title "Add your first customer", the helper text "Customers you add will show up here." and a navy + Add Customer button.
- **No Search Results:** Shown when a search matches nothing. A dialog card with a search icon, the title "No customer match your search", the helper text "Check the spelling or try a different word." and a Clear search button. The X closes the card.

2. **Customer Management: Error States**
- **Error Add Customer:** The Add Customer dialog with invalid fields outlined in red and a red message under each field:
  - Customer Number: "This customer number already exists."
  - Customer Name: "Customer name is required."
  - Address: "Address is required."
  - Payment Terms: "Payment terms are required."
- **Load Error:** Same pattern as the product load error below, titled "Couldn't load customers". Needs a frame in Figma.

3. **Customer Management: Confirm Dialogs**
- **Delete Confirmation:** Cancel and a red Delete button. Delete turns the row Inactive.
- **Restore Confirmation:** Cancel and a navy Restore button. Restore turns the row Active.

4. **Product Management: Empty and Search States**
- **Empty List:** The title "Add your first product", the helper text "Products you add will show up here." and a navy + Add Product button.
- **No Search Results:** A search icon, the title "No products match your search", the helper text "Check the spelling or try a different word." and a Clear search button.
- **Price History Empty:** "No price history for this product." (from S2-UIX-03).

5. **Product Management: Error States**
- **Error Add Product:** Red outlines and messages for:
  - Product Code: "This product code already exists."
  - Description: "Product description is required."
  - Unit: "Unit is required."
- **Error Add Price:** Red outlines and messages for:
  - Product Code: "This product code already exists."
  - Effective Date: "Effective date is required."
  - Unit Price: required message (to be confirmed in the design).
- **Internet Connection, Error Load Products:** The product table stays on screen with its data. A red banner at the bottom says "Couldn't load products. Check your connection and try again." with a Try again button.

6. **Product Management: Confirm Dialogs**
- **PROD Delete Confirmation:** White dialog with an X. The title is "Delete product?". The body reads "P0001 · Laptop Computer 14in will be marked Inactive. You can restore it later." Buttons: Cancel (outlined) and a red Delete. The body shows the product code and description of the selected row.
- **PROD Restore Confirmation:** The title is "Restore product?". The body reads "P0006 · Desktop Computer will become Active again." Buttons: Cancel (outlined) and a navy Restore.
- **Price Delete Confirmation:** Opened from Delete on a row in Price History. The title is "Delete product?". The body reads "The ₱71,300.00 price effective 2026-06-01 will be removed from this product's history." Buttons: Cancel (outlined) and a red Delete. The body shows the price (₱, thousands separator, 2 decimals) and the effective date (YYYY-MM-DD) of the selected row.

**Developer Handoff Notes**
- **Source of truth:** Take colors, font sizes, spacing, radii and component states from the Figma file (Dev Mode / Inspect). This document describes structure and behavior only.
- **Shared components:** Build once and configure per screen:
  - `EmptyState` (icon, title, description, action button)
  - `NoResults` (icon, title, description, Clear search)
  - Inline field error (red border and message)
  - `ErrorBanner` (title, description, Try again)
  - Confirm dialog (delete and restore)
- **Display rules:**
  - Empty state: zero records for the selected tab and no search term. The header + Add button stays visible.
  - No results: a search term with zero matches. Clear search empties the input and restores the list. The X does the same.
  - Load error: shown instead of the empty state when the request fails. Keep any loaded rows visible. Try again retries the request.
  - Priority when several apply: load error, then validation error, then empty, then no results.
- **Validation behavior:**
  - Validate on submit, and on blur after a field is touched.
  - Do not close the dialog on error. Focus the first invalid field.
  - Uniqueness errors (customer number, product code) come from the server response.
  - Set `aria-invalid` on invalid fields and link messages with `aria-describedby`.
- **Flows:**
  - Delete → confirmation → row becomes Inactive, red tint, Restore only.
  - Restore → confirmation → row becomes Active.
  - Price History → Delete on a price row → Price Delete Confirmation → the price is removed from the history. Closing the confirmation returns to Price History.
  - Cancel, X and Esc close the dialog. Enter does not confirm a delete.
  - Show a loading state on Delete and Restore. On failure, show an inline error and keep the dialog open.
- **Accessibility:** Focus trap in dialogs, return focus to the trigger on close, use `role="alert"` for the load error banner, and check the helper text contrast.
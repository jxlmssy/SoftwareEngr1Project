# Hi-fi Mockups and Handoff Notes
<img width="1965" height="914" alt="customers" src="https://github.com/user-attachments/assets/cfb5165d-debc-461e-85b1-084f4a7e6a41" />
<img width="852" height="367" alt="image" src="https://github.com/user-attachments/assets/dc0515de-f55e-4eeb-95d9-38bb9ba3725a" />
<img width="1965" height="914" alt="products" src="https://github.com/user-attachments/assets/0e38ecbc-bd2a-4b88-b999-05f7d0296434" />
<img width="430" height="502" alt="image" src="https://github.com/user-attachments/assets/484eb837-87d8-47c8-b568-f5abd3c92325" />

# Description
This document outlines the hi-fi mockups and developer handoff notes for task **[S2-UIX-03]**. It applies the final visual design (dark interface with white dialogs and navy primary actions) to the Customer Management and Product Management screens defined in **[S2-UIX-01]** and **[S2-UIX-02]** for the Hope, Inc. ERP system.

**File & Assets**
- **UI Blueprint & Repository:** https://www.figma.com/design/O1EsT9in4dEaMgsvskkPuj/SOFT-ENGR-GRP?node-id=0-1&t=iR3IiLJhCXCr15Ke-1
- **Main View Panels:** CUST window (header and sidebar), customers, customers selection, Add Customer, Edit Customer, CUST Delete Confirmation, CUST Restore Confirmation, PROD window (header and sidebar), products, product selection, Add Product, Edit Product, Price History, Price Selection, Add Price, Edit Price, PROD Delete Confirmation, PROD Restore Confirmation.

**Screen Components and User Flow**
1. **Header & Navigation (CUST window and PROD window)**
- **Header & Top Bar:** System branding (Hope, Inc. ERP), current screen title, logged-in user badge (Superadmin), and a logout icon. A collapsed header variant is also provided.
- **Navigation Sidebar:** Persistent menu with Dashboard, Customers, Products, Human Resources, Sales, and Reports, plus an ADMINISTRATIONS section with User Management. The active screen's link is highlighted. A collapsed sidebar variant is also provided.

2. **Customer Management**
- **Sub-Header:** "Customer Management" with the subtext "Client management, account tracking, and support history."
- **Status Filter Tabs:** Active (5), Inactive (3), All (8), with counts.
- **Search Bar:** "Search customer..." input.
- **Header Action:** + Add Customer button.
- **Customer Data Table:** CUST NO, NAME, ADDRESS, TERMS (45D or COD), STATUS (green Active / red Inactive), STAMP, ACTIONS.
- **Row-Level Actions:** Active rows have Edit and Delete. Inactive rows are tinted red and have Restore only.
- **Filter States:** The "customers selection" frames show the list under the Active, Inactive and All tabs.

3. **Customer Dialogs**
- **Add Customer:** Fields Customer Number, Customer Name, Address, Payment Terms. Full-width navy button.
- **Edit Customer:** Same fields, pre-filled. Full-width navy button.
- **Delete Confirmation:** "Delete product?" dialog with Cancel and a red Delete button.
- **Restore Confirmation:** "Restore product?" dialog with Cancel and a navy Restore button.

4. **Product Management**
- **Sub-Header:** "Product Management" with the subtext "Stock management, product listing, and fulfillment."
- **Status Filter Tabs:** Active (6), Inactive (2), All (8), with counts.
- **Search Bar:** "Search product..." input.
- **Header Action:** + Add Product button.
- **Product Data Table:** PR CODE, DESCRIPTION, UNIT, CURRENT PRICE (in ₱), STATUS, STAMP, ACTIONS.
- **Row-Level Actions:** Active rows have Prices, Edit and Delete. Inactive rows are tinted red and have Restore only.
- **Filter States:** The "product selection" frames show the list under the Active, Inactive and All tabs.

5. **Product Dialogs**
- **Add Product:** Fields Product Code, Description, Unit. Full-width navy button.
- **Edit Product:** Same fields, pre-filled. Full-width navy button.
- **Delete Confirmation:** "Delete product?" dialog with Cancel and a red Delete button.
- **Restore Confirmation:** "Restore product?" dialog with Cancel and a navy Restore button.

6. **Price History (opened from the Prices button)**
- **Price History Dialog:** Title, product name and unit as subtext, Active/Inactive/All tabs with counts, + Add Price button, and a table of EFFECTIVE DATE, UNIT PRICE, STATUS, STAMP, ACTION (Edit, Delete).
- **Price Selection:** Frames show the dialog with data, with no price history ("No price history for this product."), and under each filter tab.
- **Add Price:** Fields Product Code, Effective Date (date picker), Unit Price. Save Price button.
- **Edit Price:** Same fields, pre-filled. Save Price button.

**Developer Handoff Notes**
- **Source of truth:** Take colors, font sizes, spacing, radii and component states from the Figma file (Dev Mode / Inspect). This document describes structure and behavior only.
- **Shared components:** App header, sidebar (expanded and collapsed), segmented status filter with counts, search input, data table, status badge (Active green, Inactive red), row action buttons, form dialog (add and edit), confirm dialog (delete and restore), primary navy button, red destructive button.
- **Reuse:** Customer and Product screens share the same layout and components. Build the table, filter tabs, form dialog and confirm dialog once and configure them per screen.
- **Flows:**
  - List → + Add → Add dialog. Edit → Edit dialog.
  - Delete → confirmation → row becomes Inactive. Restore → confirmation → row becomes Active.
  - Products only: Prices → Price History dialog → + Add Price / Edit → Add Price / Edit Price dialogs.
  - Dialogs close with the X or Cancel and return to the list.
- **Status behavior:** Active/Inactive/All tabs filter the table and show counts. Inactive rows use a red row tint and show Restore only.
- **Formats:** Currency in ₱ with thousands separator and 2 decimals. Price effective dates shown as YYYY-MM-DD. Stamps shown as `CREATED|EDITED|DELETED user, date and time`.
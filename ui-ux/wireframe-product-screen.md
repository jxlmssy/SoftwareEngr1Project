# Wireframes Product and Price History Screens
<img width="1965" height="914" alt="wireframe products" src="https://github.com/user-attachments/assets/d0d592ec-2bf1-45e3-9009-bf565644cbe1" />
<img width="1158" height="416" alt="Price" src="https://github.com/user-attachments/assets/907bc276-ada7-4ff6-8a33-7125c26dd8fd" />
<img width="525" height="570" alt="Edit Product" src="https://github.com/user-attachments/assets/13cf9acf-4f78-47e8-993b-b1a5159a8706" />
<img width="525" height="570" alt="Edit Price" src="https://github.com/user-attachments/assets/22195b2a-ce47-4ef4-b6f9-70a8493efaa5" />
<img width="525" height="570" alt="Add Product" src="https://github.com/user-attachments/assets/dc8ce21c-976b-4910-9050-ced0abe5f9fd" />
<img width="525" height="570" alt="Add Price" src="https://github.com/user-attachments/assets/8d927197-170b-4cb0-b430-be72e3255b3e" />
<img width="1128" height="859" alt="Price Selection" src="https://github.com/user-attachments/assets/dddc12a1-aba3-45ff-b212-72279bb8cc30" />
<img width="525" height="246" alt="Delete Confirmation" src="https://github.com/user-attachments/assets/2f549ecc-a530-4413-a500-6704463a6384" />
<img width="525" height="246" alt="RestoreConfirmation" src="https://github.com/user-attachments/assets/8d321102-add7-40cd-8860-885d12a9ba53" />

# Description
This document outlines the wireframe design and UI structure for task **[S2-UIX-02]**. It establishes the Product Management screen layout and the Price History screens, including the product data table, status filters, search, row-level actions, and the Add Product, Edit Product, Price History, Add Price and Edit Price dialogs for the Hope, Inc. ERP system.
 
**File & Assets**
- **UI Blueprint & Repository:** https://www.figma.com/design/O1EsT9in4dEaMgsvskkPuj/SOFT-ENGR-GRP?node-id=0-1&t=iR3IiLJhCXCr15Ke-1
- **Main View Panels:** Header & Top Bar, Navigation Sidebar, Product Management List, Add Product Dialog, Edit Product Dialog, Price History Dialog, Add Price Dialog, Edit Price Dialog.
**Screen Components and User Flow**
1. **Header & Navigation**
- **Header & Top Bar:** Displays system branding (Hope, Inc. ERP), current screen title (Product Management), logged-in user profile badge (Superadmin), and a logout action icon.
- **Navigation Sidebar:** Persistent menu featuring links to Dashboard, Customers, Products, Human Resources, Sales, and Reports, plus an ADMINISTRATIONS section containing User Management. The Products link corresponds to the active screen.
2. **Product Management List**
- **Sub-Header:** Screen title "Product Management" and description subtext: "Stock management, product listing, and fulfillment."
- **Status Filter Tabs:** Toggle between Active (6), Inactive (2), and All (8) products, with record counts shown per tab.
- **Search Bar:** "Search product..." input for quickly finding a product record.
- **Header Action:** + Add Product button for manually creating a new product record.
- **Product Data Table:** Displays columns for PR CODE (e.g., P0001–P0008), DESCRIPTION, UNIT (pcs, bag, ream, box, pad, meter), CURRENT PRICE (in ₱), STATUS (Active, Inactive), STAMP (CREATED, EDITED or DELETED with user and date and time), and row-level ACTIONS.
- **Row-Level Actions:** Active rows show Prices, Edit and Delete buttons. Inactive rows are highlighted in red and show only a Restore button.
- **Filter States:** Separate frames show the list under the Active, Inactive and All tabs.
3. **Add Product Dialog**
- **Header:** Title "Add Product" with subtext "To add a product, fill out the following." and a close (X) icon.
- **Fields:** Product Code (placeholder "e.g. P0001"), Description ("Enter product description"), Unit ("e.g. pcs, bag, box, pad, meter").
- **Action:** Primary button to save the new product.
4. **Edit Product Dialog**
- **Header:** Title "Edit Product" with a close (X) icon.
- **Fields:** Product Code, Description and Unit, using the same layout as Add Product.
- **Action:** Primary button to update the product.
5. **Price History Dialog**
- **Entry Point:** Opened with the Prices button on a product row.
- **Header:** Title "Price History" with the product name and unit as subtext (e.g., "Laptop Computer 14in · Unit: pcs").
- **Status Filter Tabs:** Active (2), Inactive (0), and All (2), with record counts.
- **Header Action:** + Add Price button.
- **Price Data Table:** Displays columns for EFFECTIVE DATE (e.g., 2026-06-01), UNIT PRICE (e.g., ₱71,300.00), STATUS (Active), STAMP (CREATED, user, date and time), and row-level ACTION.
- **Row-Level Actions:** Edit and Delete buttons per price record.
- **Empty State:** A frame shows the table with the message "No price history for this product."
6. **Add Price Dialog**
- **Header:** Title "Add Price" with subtext "To add a price, fill out the following." and a close (X) icon.
- **Fields:** Product Code, Effective Date (date picker), Unit Price (0.00).
- **Action:** Save Price button.
7. **Edit Price Dialog**
- **Header:** Title "Edit Price" with a close (X) icon.
- **Fields:** Product Code, Effective Date (date picker), Unit Price (0.00).
- **Action:** Save Price button.
**Developer Handoff Notes**
- **Flow:** Products list → Prices button → Price History dialog → Add Price / Edit Price dialogs. Add Product and Edit Product dialogs open from the list's + Add Product and Edit buttons.
- **Components:** `ProductTable`, `StatusFilterTabs`, `SearchInput`, `ProductFormDialog` (add and edit), `PriceHistoryDialog`, `PriceFormDialog` (add and edit), reusable table row action buttons.
- **Display Formats:** Currency in ₱ with thousands separator and 2 decimals. Price effective dates shown as YYYY-MM-DD. Stamps shown as `CREATED|EDITED|DELETED user, date and time`.
- **Status Behavior:** Active/Inactive/All tabs filter by status and show counts. Inactive records use red row highlighting in the product list and a Restore action.
- **Confirmation Buttons:** Delete confirmation, and Restore confirmation
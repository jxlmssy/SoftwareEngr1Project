# Wireframes Customer Screen
![alt text](<wireframe customers.png>)

# Description
This document outlines the wireframe design and UI structure for task **[S2-UIX-01]**. It establishes the Customer Management screen layout, including the customer data table, status filters, search, and row-level actions for the Tiramis-u, Inc. ERP system.

**File & Assets**
- **UI Blueprint & Repository:** https://www.figma.com/design/O1EsT9in4dEaMgsvskkPuj/SOFT-ENGR-GRP?node-id=0-1&t=x2WqRU3IWrTBjh7A-1
- **Main View Panels:** Header & Top Bar, Navigation Sidebar, Customer Management List.

**Screen Components and User Flow**
1. **Header & Navigation**
- **Header & Top Bar:** Displays system branding (Tiramis-u, Inc. ERP), current screen title (Customer Management), logged-in user profile badge (Superadmin), and a logout action icon.
- **Navigation Sidebar:** Persistent menu featuring links to Dashboard, Customers, Products, Human Resources, Sales, and Reports, plus an ADMINISTRATIONS section containing User Management. The Customers link corresponds to the active screen.

2. **Customer Management List**
- **Sub-Header:** Screen title "Customer Management" and description subtext: "Client management, account tracking, and support history."
- **Status Filter Tabs:** Toggle between Active (5), Inactive (3), and All (8) customers, with record counts shown per tab.
- **Search Bar:** "Search customer..." input for quickly finding a customer record.
- **Header Action:** + Add Customer button for manually creating a new customer record.
- **Customer Data Table:** Displays columns for CUST NO (e.g., C0075–C0082), NAME, ADDRESS, TERMS (45D or COD), STATUS (Active, Inactive), STAMP (date and time of the record), and row-level ACTIONS.
- **Row-Level Actions:** Contextual controls per row, including Edit and Delete buttons.
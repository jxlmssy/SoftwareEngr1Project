# Wireframes Main Page, User Management List and Rights Dialog
![alt text](<Main Page Dashboard.png>)
![alt text](<User Management.png>)
![alt text](<Rights Dialog.png>)

# Description
This document outlines the core wireframe designs, and UI structure for task **[S1-UIX-03]**. It establishes the complete administrative dashboard (main page) layout, user management table, user edit modal, and detailed pe  rmission/rights management dialog for the Tiramis-u, Inc. ERP system.

**File & Assets**
- **UI Blueprint & Repository:** https://www.figma.com/design/O1EsT9in4dEaMgsvskkPuj/SOFT-ENGR-GRP?node-id=0-1&t=x2WqRU3IWrTBjh7A-1
- **Main View Panels:** Main Page (Dashboard), Navigation Sidebar, User Management List, Edit User Account Modal, and User Rights/Permissions Dialog.

**Screen Components and User Flow**
1. **Dashboard Main Page**
- **Header & Top Bar:** Displays system branding (Tiramis-u, Inc. ERP), current screen title (Dashboard), logged-in user profile badge (Google User), logout action icon, and a personalized welcome prompt ("Welcome back, Google!").   
- **Navigation Sidebar:** Persistent menu featuring links to Dashboard, User Management, Human Resources, Customers, Products, Sales, and Reports. 

2. **User Management List**
- **Sub-Header:** Screen title "User Management" and description subtext: "Superadmin controls for managing user accounts, assigning roles, and customizing access permissions."   
- **User Data Table:** Displays columns for NAME, EMAIL, ROLE (Superadmin, Admin, User), STATUS (Active, Pending), and row-level ACTIONS.   
- **Row-Level Actions:** Contextual controls per row including Block, Edit, Rights, Approve, and Disapprove buttons.   
- **Header Action:** + Add User button for manually creating accounts. 

3. **Edit User's Account Modal**
- **Form Inputs:** Fields for First Name, Last Name, and Email.   
- **Role Selection Dropdown:** Presets for Superadmin, Admin, and User.   
- **Status Selection Dropdown:** Options for Active, Pending, Blocked, and Disapproved.   
- **Primary Action:** Save edit button.   

4. **Rights Dialog (Permission Management)**
- **Module Permissions Checkboxes:**
    - **Customer Management:** Checkboxes for Add Customer, Delete Customer, and Edit Customer.   
    - **Product Management:** Checkboxes for Add Product, Delete Product, Edit Product, Edit Price, Add Price, and Delete Price.   
    - **Human Resources:** Checkboxes for Add Job, Delete Job, Edit Department, Add Employee, Delete Employee, Add Job History, Delete Job History, Edit Job, Add Department, Delete Department, Edit Employee, and View Job History.   
    - **Sales:** Checkboxes for Add Sale, Delete Sale, Add Sale Detail, Delete Sale Detail, Edit Sale, View Sale Detail, and Edit Sale Detail.   
    - **Reports:** Checkboxes for Top Customers, Top Products, All Employees, Top Sales, Product Master List, Active Employees, and Employee Job History.  
- **Bulk Controls & Action:** Individual All / None selection toggles per module block and a primary Save rights submission button.  
# Module Sprint Map

This document outlines the allocation of the six (6) core system modules across the 4 Sprints (8 weeks total) for the HOPE, Inc. ERP system.

## Summary Overview

| Module | Target Sprint | Primary Focus / Key Features |
| :--- | :---: | :--- |
| **1. Authentication & User Management** | **Sprint 1** | User registration, login/logout, password reset, user management, role & per-action rights assignment. |
| **2. Customer Management** | **Sprint 2** | Customer CRUD operations, active views, search, filtering, and soft delete/restore capabilities. |
| **3. Product & Pricing Management** | **Sprint 2** | Product CRUD operations, price history tracking with effective dates, and current-price calculations. |
| **4. Human Resources (HR)** | **Sprint 3** | Department & Job CRUD, Employee profiles, job history tracking (promotions/transfers), and role-restricted salary visibility. |
| **5. Sales Management** | **Sprint 4** | Sales transactions, auto-numbered headers, line item details with auto-filled pricing, payment processing, and balance tracking. |
| **6. Reports & Audit** | **Sprint 4** | Master Lists, HR reports, Top N analysis (Customers/Products/Sales), PDF export, and Superadmin audit log viewer. |

---

## Detailed Sprint Breakdown

### Sprint 1: Weeks 1–2
* **Modules**: Authentication & User Management
* **Deliverables**:
  * Project scaffold & database migrations (`app_user`, `role`, `module`, `rights_catalogue`, `user_permission`).
  * Authentication flows: Registration (pending approval), login/logout, password reset token flows.
  * User Management: User listing, block/unblock, superadmin approval, per-action rights modal (Customer, Product, HR, Sales, Reports).
  * Design system, wireframes, test plans, and initial repository/Scrum setup.

### Sprint 2: Weeks 3–4
* **Modules**: Customer Management & Product/Pricing Management
* **Deliverables**:
  * **Customer**: Listing with search/filter, create/edit form, soft delete & restore.
  * **Product**: Listing with search/filter, create/edit form, soft delete & restore.
  * **Pricing**: Price history management (effective dates) and current-price logic.
  * Database indexing, child-record verification, test cases, and hi-fi UI mockups.

### Sprint 3: Weeks 5–6
* **Modules**: Human Resources (HR)
* **Deliverables**:
  * Department and Job management (CRUD).
  * Employee management (CRUD, separation dates, soft delete/restore).
  * Job history tracking (promotions, transfers, salary history).
  * Fine-grained permission checks restricting salary and job history visibility (`View Job History` right).

### Sprint 4: Weeks 7–8
* **Modules**: Sales Management & Reports/Audit
* **Deliverables**:
  * **Sales**: Sales order entry, auto-populated unit prices based on sale date, line item management, payment recording, and balance tracking.
  * **Reports**: 7 core system reports (Product Master List, Active/All Employees, Employee Job History, Top Customers/Products/Sales) with PDF/Print export support.
  * **Audit**: Superadmin audit log viewer for tracking rights changes and sensitive actions.
  * End-to-end testing, regression pass, release checklist, and final retrospective.
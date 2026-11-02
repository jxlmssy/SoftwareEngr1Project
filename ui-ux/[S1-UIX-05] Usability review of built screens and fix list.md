# S1-UIX-05: Usability Review and Fix List

**Build reviewed:** `index.html`, `script.js`, `style.css` (connected to the `/api` backend)
**Screens:** Landing, Login, Register, password reset, Dashboard, User Management, Add/Edit User

**Severity:** High = blocks use or is a design/security gap. Medium = confusing or an accessibility barrier. Low = polish.

## Fix list

| ID | Sev | Problem | Suggested fix |
|----|-----|---------|---------------|
| F1 | High | Rights dialog and Rights button are missing. They are in the S1-UIX-04 mockups but not in the build. | Build them, or remove them from the mockups and notes. |
| F2 | Medium | Escape or clicking outside during "Set your password" silently logs the user out. | Ignore both in first-login mode. |
| F3 | Medium | Block and Disapprove happen on one click with no confirmation. | Add a confirm step. |
| F4 | Medium | A user can block or demote themselves from their own Edit modal. | Disable role and status on your own account (and reject it on the server). |
| F5 | Medium | Admin and Superadmin use the same green badge. The mockup has Superadmin in gold. | Add a gold Superadmin badge. |
| F6 | Medium | "Remember me" does nothing, and closing the tab logs the user out. | Implement it or remove it. |

## Confirm with backend

1. Pending, Blocked and Disapproved accounts are rejected at login.
2. Duplicate emails are rejected on add and edit.
3. Users cannot change their own role or status, and Admins cannot change Admins or Superadmins.
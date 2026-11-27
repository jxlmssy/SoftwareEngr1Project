# S2-UIX-05: Usability Review and Fix List
<img width="1450" height="672" alt="image" src="https://github.com/user-attachments/assets/7ab5c936-aaaf-4ea8-b5c7-f553ad4da129" />
<img width="1452" height="672" alt="image" src="https://github.com/user-attachments/assets/02973957-1977-481c-983a-cdf62edc090c" />
 
**Build reviewed:** `index.html`, `script.js`, `style.css`

**Screens:** Landing, Login, Register, password reset, Dashboard, Customers, Products (Price History), User Management, Add/Edit User, Rights
 
**Severity:** High = blocks use or is a design/security gap. Medium = confusing or an accessibility barrier. Low = polish.
 
## Fix list
 
| ID | Sev | Problem | Suggested fix |
|----|-----|---------|---------------|
| F1 | High | Customers and Products live only in memory. Changes are lost on refresh and never reach `/api`. | Connect them to the backend, or label them as a demo. |
| F2 | High | If loading rights fails, the boxes stay cleared and Save is still enabled, so an admin can wipe a user's rights. | Keep Save disabled after a load error and add Retry. |
| F3 | High | The module checkbox in each Rights heading is loaded but never sent on save. | Send it on save, or remove it if modules come from the rights. |
| F4 | Medium | Dashboard cards show fixed numbers as live data ("₱68,4k", 39.15%, 61 open orders). Cards lift on hover and show a pointer, but do nothing. | Use real data or remove the figures. Fix "₱68.4k". Make the cards link or remove the hover effect. |
| F5 | Medium | Current Price is the latest effective date even if it is in the future, and Price History does not mark the current row. | Compare with today and mark Current / Scheduled / Superseded. |
| F6 | Medium | Delete looks the same as Edit and Prices in every row, and "Delete", "Inactive" and "DELETED" all mean the same thing. | Give Delete a danger style and use one wording pair, for example Deactivate / Reactivate. |
| F7 | Medium | Approve, Disapprove, Block and Unblock happen on one click with no confirmation. | Add a confirm step that names the user. |
| F8 | Medium | A Superadmin can block or demote themselves in their own Edit modal. | Disable role and status on your own account, and reject it on the server. |
| F9 | Medium | Escape, outside click or X during "Set your password" silently logs the user out. | Ignore all three in first-login mode. |
| F10 | Medium | "Remember me" does nothing, and closing the tab logs the user out. | Implement it or remove it. |
 
## Confirm with backend
 
1. Pending, Blocked and Disapproved accounts are rejected at login.
2. Duplicate emails are rejected on add and edit.
3. Users cannot change their own role or status, and Admins cannot change Admins or Superadmins.
 
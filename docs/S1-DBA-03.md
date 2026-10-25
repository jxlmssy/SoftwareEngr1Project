# S1-DBA-03

## Roles and Permissions Database Structure

### Tables Created

- role
- module
- rights_catalogue
- user_permission

### Features

- Role-based authorization
- Soft delete support
- User blocking support

### Verification Queries

```sql
SELECT * FROM role;
SELECT * FROM module;
SELECT * FROM user_permission;
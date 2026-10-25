# S1-DBA-05

## Seed Data

### Default Roles

- user
- manager
- admin
- superadmin

### Modules

- Customer
- Product
- Human Resources
- Sales
- Reports

### Rights Catalogue

- 36 rights inserted into rights_catalogue

### Superadmin Accounts

One superadmin account was created for each team member.

### Security

- No passwords are stored in the repository.
- Password management is handled through Supabase Authentication.
- First-time password setup is performed through account authentication workflows.

## Verification Queries

```sql
SELECT * FROM role;

SELECT * FROM module;

SELECT COUNT(*) FROM rights_catalogue;

SELECT e*ail, role
FROM app_users
WHERE rol* = 'superadmin';
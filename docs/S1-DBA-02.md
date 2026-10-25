# S1-DBA-02

## Migration: HOPE Base Tables and Sample Data

### Tables Migrated

- customer
- department
- employee
- job
- jobhistory
- payment
- pricehist
- product
- sales
- salesdetail

### Verification Queries

```sql
SELECT COUNT(*) FROM employee;
SELECT COUNT(*) FROM customer;
SELECT COUNT(*) FROM product;
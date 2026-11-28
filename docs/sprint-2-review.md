# Sprint 2 Review and Retrospective

**Task ID:** S2-SM-05

**Owner:** Jixell Massey Ogbinar (Scrum Master)

**Sprint:** 2 (Customer and Product modules; started November 17, 2026)

**Date held:** [date of the meeting]

**Attendees:** Jasmine Ferrer, Jixell Massey Ogbinar, Chadwick Dela Cruz, Joanne Coree Corpus, Alexa Jane De Lima

> Prepared from what is merged to `main` as of November 28, 2026. Update the numbers

## Part A: Sprint Review

### 1. Sprint Goal
Deliver the Customer and Product modules: list with search and filter, create and edit,
soft delete and restore, price history with effective dates, a current-price display, and
per-action rights checks (Add, Edit, Delete) on both modules.

### 2. Planned vs Merged

| Role | Planned | Merged |
| --- | --- | --- |
| Developer | 8 | 1 |
| DB Admin | 6 | 6 |
| Tester | 6 | 6 |
| UI/UX Designer | 5 | 5 |
| Scrum Master | 5 | 5 (including this) |
| **Team total** | **30** | **23** |

Reference point: the repo showed 20 of 30 as of Nov 28, before SM-03 to SM-05 were merged.
Use the sheet's Merged count as the final number. See `docs/sprint-2-velocity-burndown.md`.

### 3. What Was Delivered
- Customer list on the main page with search and filter, showing active customers only for
  regular users (DEV-01, PR #162)
- Database: customer active view and indexes, price-as-of-date query, validation
  constraints, child-record delete checks, demo data, and search performance indexes
  (DBA-01 to DBA-06)
- Customer and product wireframes, hi-fi mockups, empty, error and confirm-delete states,
  and a usability review with a fix list (UIX-01 to UIX-05)
- Test cases for customers, products and price history, soft delete and restore,
  per-right permissions, a Sprint 1 regression set, and a bug report and fix verification
  process (TST-01 to TST-06)
- Sprint 2 planning notes, the Sprint 1 retro follow-up, the mid-sprint check, and the
  velocity and burndown report (SM-01 to SM-04)

### 4. Demo
Show in this order:
1. Log in as a user with Customer rights
2. Open the customer list and search by name
3. Use the filter
4. Log in as a user without Customer rights and show the list cannot be opened
5. [Any DEV task merged before the meeting]

### 5. Not Finished and Why

| Task | Status | Why |
| --- | --- | --- |
| DEV-02 customer create/edit | Not merged | [ ] |
| DEV-03 customer soft delete/restore | Not merged | [ ] |
| DEV-04 product list | Not merged | [ ] |
| DEV-05 product create/edit | Not merged | [ ] |
| DEV-06 product soft delete/restore | Not merged | [ ] |
| DEV-07 price history | Not merged | [ ] |
| DEV-08 current-price display and rights checks | Not merged | [ ] |

Common cause seen in the repo: the DB views and constraints that DEV-01 to DEV-06 depend
on (DBA-01, DBA-03) merged on Nov 27, so Developer work could not start on the real
tables until then. These tasks move to the top of the Sprint 3 backlog.

Test results are also not finished: most test cases are still "Not Run" because the
features they test are not built yet.

## Part B: Retrospective

### 6. What Went Well
- DB Admin, Tester and UI/UX finished all of their planned tasks (17 of 17)
- Every change went through a PR; no direct commits to `main` this sprint
- Sprint 2 issues were created from the template before work started
- The usability review found real problems (for example, a Superadmin could block
  themselves) and gave a fix list


### 7. What Did Not Go Well
- The Developer finished 1 of 8 tasks, so the sprint goal was not met
- Blocking DB tasks merged late in the sprint (Nov 27) instead of first
- Work was merged in batches: nothing for four days (Nov 23 to 26), then 11 tasks in one
  day (Nov 27)
- Branches still did not use Task IDs (`test/testing`, `new/ui-ux`,
  `setup/initial-project-structure`)
- PRs were opened from `main` into feature branches to sync them, which added empty merges
- Carried-over items are still open: `.env.example`, the duplicate DBA document, and
  recorded test results


### 8. What We Learned
- Order matters: tasks that block others must be merged first
- A burndown only helps if work is merged as it is finished


### 9. Actions for Sprint 3

| Action | Owner | Due |
| --- | --- | --- |
| Carry DEV-02 to DEV-08 into Sprint 3 at the top of the backlog | Jixell | Sprint 3 day 1 |
| Merge tasks that block other roles by day 2 of the sprint | Chadwick, Joanne | Sprint 3 day 2 |
| Plan the Developer's load per role, in small tasks | Jixell, Jasmine | Sprint 3 planning |
| Open a PR as soon as each task is done | Everyone | Ongoing |
| Name branches `feature/S3-XXX-00-name` | Everyone | Every branch |
| Update branches with `git pull origin main`, not a PR from `main` | Everyone | Ongoing |
| Run tests within a day of each feature merge and record Pass, Fail or Blocked | Alexa | Ongoing |
| Add `.env.example` and delete `docs/docs/S1-DBA-04.md` | Jasmine, Chadwick | Sprint 3 day 1 |
| Confirm the course end date and the Sprint 3 and 4 dates | Jixell | Sprint 3 planning |

### 10. Velocity
Sprint 1 merged 30 of 30 tasks. Sprint 2 merged [23] of 30. Plan Sprint 3 at about the same
team total, but with fewer or smaller Developer tasks plus the 7 carried-over ones.

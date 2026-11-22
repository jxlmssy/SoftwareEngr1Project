# Sprint 2 Planning Notes and Board

**Task ID:** S2-SM-01
**Owner:** Jixell Massey Ogbinar (Scrum Master)

**Sprint:** 2 (Customer and Product modules)

**Recorded on:** November 22, 2026
**Planning meeting held:** November 22, 2026

**Attendees:** Chadwick Dela Cruz, Joanne Coree Corpus, Alexa Jane De Lima, Jasmine Mae Ferrer, Jixell Massey Ogbinar

**Sprint dates:** November 17, 2026 to N/A. Course end date: N/A

> These notes were written after Sprint 2 had already started. The status snapshot comes
> from what is merged to `main` as of Nov 22, 2026.

## 1. Sprint Goal
Deliver the Customer and Product modules: list with search and filter, create and edit,
soft delete and restore, price history with effective dates, a current-price display, and
per-action rights checks (Add, Edit, Delete) on both modules.

## 2. Scope: 30 Planned Tasks

| Role | Tasks | Work |
| --- | --- | --- |
| Developer | 8 | Customer list, create/edit, soft delete/restore; product list, create/edit, soft delete/restore; price history; current-price display and rights checks |
| DB Admin | 6 | Active views and indexes; price-as-of-date query; validation constraints; child-record delete checks; demo data; search performance |
| Tester | 6 | Customer test cases; product and price history cases; soft delete/restore tests; per-right permission tests; Sprint 1 regression; bug reports |
| UI/UX Designer | 5 | Customer and product wireframes; hi-fi mockups and handoff; empty, error and confirm-delete states; usability review |
| Scrum Master | 5 | Planning notes and board; retro follow-up; mid-sprint check; velocity and burndown; review and retrospective |

All 30 issues are created from the Sprint task template and added to the project board.

## 3. Dependencies and Order of Work
1. **DB Admin first:** S2-DBA-01 (views and indexes) and S2-DBA-03 (constraints) unblock
   the Developer's list and form tasks.
2. **Designer to Developer:** the wireframes and hi-fi mockups (UIX-01 to UIX-04) are the
   build reference for DEV-01 to DEV-06.
3. **Price history:** S2-DBA-02 (price as of a date) comes before S2-DEV-07 and DEV-08.
4. **Tester follows Developer:** test cases can be written from the mockups, but results
   need merged features (TST-03 to TST-06).
5. **Usability review last:** S2-UIX-05 needs built screens.

## 4. Status Snapshot (Nov 22)

| Role | Done on `main` | Open |
| --- | --- | --- |
| Developer | 0 of 8 | All eight |
| DB Admin | 0 of 6 | All six |
| Tester | 1 of 6 (customer test cases) | TST-02 to TST-06 |
| UI/UX Designer | 4 of 5 (wireframes, hi-fi mockups, states) | UIX-05 usability review |
| Scrum Master | 0 of 5 | All five (this document is S2-SM-01) |
| **Team** | **5 of 30** | **25** |

## 5. Board Setup
- **Columns:** Backlog, In progress, In review, Merged.
- **Every card** is an issue made from the Sprint task template, titled `[S2-XXX-00] name`.
- **Branches and PRs** carry the Task ID, for example `feature/S2-DEV-01-customer-list`.
- **Moving a card:** to In review when the PR is opened, to Merged when it merges, and the
  sprint sheet is updated the same day.

## 6. Definition of Done
As in `docs/team-agreement.md`: the PR is merged and reviewed by someone else, the work is
tested, the Task ID is linked, and the sheet shows Merged with the PR link.

## 7. Risks
- **Developer and DB Admin work has not started**, and it is the critical path for the
  whole sprint.
- **Timeline.** Sprint 2 was planned for weeks 3-4 and is running far later. We need the
  course end date to decide what to compress for Sprints 3 and 4.
- **No merged PRs between Nov 9 and Nov 17.** Communication needs to be steadier.
- **Testing depends on features** that are not built yet.

## 8. Commitments

| Action | Owner | Due |
| --- | --- | --- |
| Merge S2-DBA-01 and S2-DBA-03 so the Developer can start | Chadwick |  |
| Open the first Developer PR (S2-DEV-01 customer list) | Jasmine |  |
| Write the customer and product test cases | Alexa |  |
| Hand off the mockups with notes to the Developer | Joanne |  |
| Mid-sprint check (S2-SM-03) | Jixell |  | 
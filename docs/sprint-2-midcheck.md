# Sprint 2 Mid-Sprint Check and Impediment Log

**Task ID:** S2-SM-03

**Owner:** Jixell Massey Ogbinar (Scrum Master)

**Sprint:** 2 (Customer and Product modules)

**Checked on:** November 28, 2026, against `main`

**Check meeting held:** November 28, 2026

**Attendees:** Jasmine Ferrer, Jixell Massey Ogbinar, Chadwick Dela Cruz, Joanne Coree Corpus, Alexa Jane De Lima

## 1. Purpose
A short check on how Sprint 2 is going: what is done, what is next, and what is blocking
the team. It also re-checks the open items from `docs/sprint-1-retro-followup.md`.

## 2. Progress Against the 30 Sprint 2 Tasks
Based on what is merged to `main` as of Nov 28. Each owner should confirm their own row.

| Role | Planned | Evidence on `main` | Still open |
| --- | --- | --- | --- |
| Developer | 8 | DEV-01 customer list with search and filter (PR #162) | DEV-02 to DEV-08 |
| DB Admin | 6 | DBA-01 to DBA-06 in `supabase/migrations/` (PRs #136 to #147) | None |
| Tester | 6 | TST-01 customer cases (#119), TST-02 product and price history cases (#144), TST-03 soft delete/restore (#155), TST-04 per-right permissions (#158), TST-05 Sprint 1 regression (#159), TST-06 bug reports (#160) | Most test cases are still "Not Run" |
| UI/UX Designer | 5 | Customer and product wireframes, hi-fi mockups, empty/error/confirm-delete states, usability review (PRs #117 to #134) | None |
| Scrum Master | 5 | SM-01 planning notes (#132), SM-02 retro follow-up (#133) | SM-03 (this document), SM-04 velocity and burndown, SM-05 review and retrospective |
| **Team** | **30** | **20 merged** | **10** |

**Since the Nov 22 snapshot (5 of 30), the team merged 15 more tasks.** All DB Admin, Tester
and UI/UX work is merged. The remaining work is almost all Developer work.

## 3. What Each Member Reported
| Member | Done since last check | Next | Blockers |
| --- | --- | --- | --- |
| Jixell (SM) | SM-01, SM-02 | SM-03 to SM-05 | [ ] |
| Jasmine (DEV) | DEV-01 customer list | [ ] | [ ] |
| Chadwick (DBA) | DBA-01 to DBA-06 | Support DEV tasks | [ ] |
| Alexa (TST) | TST-01 to TST-06 documents | Run test cases as features merge | [ ] |
| Joanne (UIX) | UIX-01 to UIX-05 | Support DEV with the mockups | [ ] |

## 4. Impediment Log
| # | Blocker | Who is affected | Owner | Status | Action taken |
| --- | --- | --- | --- | --- | --- |
| 1 | 7 of 8 Developer tasks are not merged, and they are the critical path | Whole team, Tester | Jasmine | Open | Split the remaining work into small PRs; others help where they can |
| 2 | The DB views and constraints that unblock DEV (DBA-01, DBA-03) only merged on Nov 27 | Developer | Chadwick | Resolved | All six DBA tasks are now on `main` |
| 3 | Test cases are written, but most results are still "Not Run" and the bug report log is empty | Tester | Alexa | Open | Run the tests for each feature as soon as it merges |
| 4 | Most merges came on a single day (11 tasks on Nov 27); nothing merged Nov 24 to 26 | Whole team | Jixell | Open | Open PRs as soon as each task is done instead of batching |
| 5 | Branches still are not named with the Task ID (`test/testing`, `new/ui-ux`, `feature/customer_module`, `setup/initial-project-structure` for DBA work) | Whole team | Everyone | Open | Use `feature/S2-XXX-00-name` for every new branch |
| 6 | PRs opened from `main` into feature branches (#125, #146, #148, #151, #153), followed by merges with no changes | Whole team | Jixell | Open | Update a branch locally with `git pull origin main` instead of opening a PR |
| 7 | Migration files have no `.sql` extension or number order (`S2-DBA-01` vs `001_hope_db.sql`) | DBA, anyone setting up the DB | Chadwick | Open | Rename to `004_...sql`, `005_...sql` in run order |
| 8 | No `.env.example` in the repo (carried over from Sprint 1) | Everyone running the backend | Jasmine | Open | Add it with variable names only |
| 9 | `docs/docs/S1-DBA-04.md` duplicate still in the repo (carried over from Sprint 1) | DBA | Chadwick | Open | Delete it in a small PR |
| 10 | `docs/sprint-1-review.md` is empty on `main` | SM, course review | Jixell | Open | Merge the filled-in Sprint 1 review |
| 11 | Sprint 2 end date and course end date are still not set | Whole team | Jixell | Open | Confirm with the instructor and update the planning notes |
| 12 | [Blocker raised at the meeting] | [ ] | [ ] | [ ] | [ ] |

## 5. Re-Check of Sprint 1 Retro Follow-Up
From `docs/sprint-1-retro-followup.md`, items that were still open on Nov 22:

| Action | Status on Nov 28 |
| --- | --- |
| Use Task-ID branch names | Not done (see impediment 5) |
| Add `.env.example` | Not done (see impediment 8) |
| Delete `docs/docs/S1-DBA-04.md` | Not done (see impediment 9) |
| Record Sprint 1 test results | Started: `docs/sprint-1-smoke-regression-test-cases.md` has some Pass, Fail and Blocked results |
| Test each feature within a day of its merge | Not started; DEV-01 merged today (Nov 28) |

## 6. Risks to Sprint 2
- **DEV-02 to DEV-08 are not merged.** Create/edit, soft delete/restore, price history and
  rights checks for both modules are still to be built.
- **Testing depends on these features**, so most test results cannot be recorded yet.
- **The sprint has no end date**, and Sprint 3 (HR) cannot be planned until one is set.

## 7. Decisions and Actions
| Action | Owner | Due |
| --- | --- | --- |
| Open PRs for DEV-02 (customer create/edit) and DEV-03 (customer soft delete/restore) | Jasmine |  |
| Run the customer test cases against DEV-01 and record results | Alexa |  |
| Rename the Sprint 2 migration files in run order | Chadwick |  |
| Add `.env.example` and delete the duplicate DBA document | Jasmine, Chadwick |  |
| Merge the Sprint 1 review and set the Sprint 2 end date | Jixell |  |
| Update the sprint sheet with Merged status and PR links | Each member | Same day as each merge |

## 8. Next Check
Sprint 2 review and retrospective (S2-SM-05): 

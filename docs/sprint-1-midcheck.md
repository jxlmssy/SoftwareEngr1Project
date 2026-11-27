# Sprint 1 Mid-Sprint Check and Impediment Log

**Task ID:** S1-SM-04
**Owner:** Jixell Massey Ogbinar (Scrum Master)
**Sprint:** 1
**Check date:** [date of the meeting]
**Attendees:** [names]

## 1. Purpose
A short check on how Sprint 1 is going: what is done, what is next, and what is blocking
the team.

## 2. Progress Against the 30 Sprint 1 Tasks
Based on what is merged to `main` as of Nov 1. Each owner should confirm their own row.

| Role | Planned | Evidence on `main` | Still open |
| --- | --- | --- | --- |
| Scrum Master | 5 | SM-01 templates and branch protection, SM-02 module map, SM-03 team agreement | SM-04 (this document), SM-05 review and retrospective |
| Developer | 8 | DEV-01 scaffold and DB connection, DEV-02 register, DEV-03 login and logout with sessions, DEV-04 reset password | DEV-05 User Management (in progress on `Admin-UserManagement`), DEV-06 superadmin approval, DEV-07 rights dialog, DEV-08 main page and permission check |
| DB Admin | 6 | Migrations 001-003 and documents for DBA-02 to DBA-06 | DBA-01 setup README needs confirming |
| Tester | 6 | TST-01 test plan, TST-02 authentication test cases (written) | TST-03 to TST-06 |
| UI/UX Designer | 5 | UIX-01 design system, UIX-02 and UIX-03 wireframes, UIX-04 hi-fi mockups | UIX-05 usability review |

**Roughly 18 of 30 tasks have evidence on `main`.** Remaining work is mostly Developer
(rights, approval, main page) and Tester (execution, regression, bug verification).

## 3. What Each Member Reported
| Member | Done since last check | Next | Blockers |
| --- | --- | --- | --- |
| Jixell (SM) | [ ] | [ ] | [ ] |
| Jasmine (DEV) | [ ] | [ ] | [ ] |
| Chadwick (DBA) | [ ] | [ ] | [ ] |
| Alexa (TST) | [ ] | [ ] | [ ] |
| Joanne (UIX) | [ ] | [ ] | [ ] |

## 4. Impediment Log
| # | Blocker | Who is affected | Owner | Status | Action taken |
| --- | --- | --- | --- | --- | --- |
| 1 | Commits made directly to `main` without a PR | Whole team | Jixell | Resolved | Reverted in PR #48; branch protection turned on |
| 2 | Merge conflict on the test cases file after the revert | Tester, SM | Jixell | Resolved | Restored through PR #51 |
| 3 | Issues were created before the issue template existed | SM, all roles | Jixell | Open | Add template sections to Sprint 1 issues; use the template from now on |
| 4 | `.env` values must be shared privately; no `.env.example` in the repo | Everyone running the backend | Jasmine | Open | Add `.env.example` with variable names only |
| 5 | Windows setup problems (Node.js install, PowerShell scripts, wrong folder) | Members running the project | Jixell | Resolved | Setup steps written for the team |
| 6 | `README.md` still has two lines; no run instructions | New members and testers | Jasmine | Open | Add install and run steps |
| 7 | `server.js` calls `app.listen` twice on port 3000 | Developer, Tester | Jasmine | Open | Check and remove the duplicate |
| 8 | No user approval screen yet, so pending users cannot be approved when testing | Tester | Jasmine | Open | Finish User Management (DEV-05, DEV-06) |
| 9 | A duplicate file at `docs/docs/S1-DBA-04.md` | DBA | Chadwick | Open | Remove the duplicate |
| 10 | [Blocker raised at the meeting] | [ ] | [ ] | [ ] | [ ] |

## 5. Risks to Sprint 1
- The rights dialog, approval and main page tasks (DEV-06 to DEV-08) are not started
  and are the longest items.
- Testing of permissions (TST-04) depends on DEV-07 and DEV-08 being merged.
- Some tasks were merged late, so Sprint 1 will finish after its planned dates.

## 6. Decisions and Actions
| Action | Owner | Due |
| --- | --- | --- |
| Update the sprint sheet with Merged status and PR links | Each member | [date] |
| Open a PR for DEV-05 (User Management) | Jasmine | [date] |
| Run the authentication test cases and record results | Alexa | [date] |
| Add `.env.example` and README run steps | Jasmine | [date] |

## 7. Next Check
[Date of the next check]
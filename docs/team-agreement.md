# Team Working Agreement, Definition of Done, and Role Guide

This document establishes our team's operational guidelines, standards for completed work, and individual role responsibilities for the HOPE, Inc. ERP project.

---

## 1. Working Agreement

* **Branching & Commits**: No direct commits to `main`[cite: 2]. All work must be completed on feature branches (`feature/S1-DEV-01-scaffold` or `fix/S1-DEV-03-login`) and submitted via Pull Request (PR).
* **Code Reviews**: Every PR requires at least one approving peer review before merging[cite: 1, 2]. Reviews must be completed within **24 hours** of submission[cite: 2].
* **Communication & Blockers**: Post any impediments or blocking issues in the team group chat on the **same day** they arise[cite: 2].
* **Meetings**: Attend scheduled daily/sprint standups and mid-sprint checks on designated days[cite: 2].
* **Task Tracker**: Keep task status up to date on both the GitHub Project board and the `HOPE_Sprint_Task_Plan_revised.xlsx` tracking sheet[cite: 2].

---

## 2. Definition of Done (DoD)

A task or story is considered **Done** only when all of the following conditions are met:

1. **Pull Request Merged**: The feature branch is merged into `main` after receiving approval from a teammate[cite: 1, 2].
2. **PR & Issue Templates Used**: The PR description follows the repo template, referencing the exact Task ID (e.g., `S1-DEV-03`) and passing all checklist items (tested, reviewed, no secrets)[cite: 1, 2].
3. **Testing**: Code changes have been tested against acceptance criteria with no breaking bugs or regression issues[cite: 2].
4. **Task Tracking Updated**: The corresponding GitHub Project card is moved to "Done" and the task status in the Excel sheet is set to `"Merged"` with the PR link pasted[cite: 2].

---

## 3. Role Guide & Assignments

| Role | Assigned Team Member | Core Responsibilities |
| :--- | :--- | :--- |
| **Developer** | Jasmine Mae Ferrer | Owns application code, API routes, frontend components, and business logic implementation. Responsible for writing clean, tested code and opening feature PRs[cite: 1]. |
| **DB Admin** | Chadwick Aaron Dela Cruz | Owns database schemas, SQL migration scripts, seed data, database connections, and index performance tuning[cite: 1]. Ensures database integrity and audit logging[cite: 1]. |
| **Tester** | Alexa Jane De Lima | Owns test planning, test case creation, automated/manual smoke testing, bug reporting, and fix verification across all modules[cite: 1]. |
| **UI/UX Designer** | Joanne Coree Corpus | Owns design system components, wireframes, hi-fi mockups, usability reviews, and UI handoffs for all module screens[cite: 1]. |
| **Scrum Master** | Jixell Massey Ogbinar | Owns repo governance, GitHub Project board management, mid-sprint check-ins, impediment tracking, velocity updates, and sprint retrospectives[cite: 1, 2]. |
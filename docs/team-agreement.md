# Team Working Agreement, Definition of Done, and Role Guide

**Document ID:** S1-SM-03  
**Status:** Approved  
**Due Date:** Sprint 1, Day 2  

---

## 🤝 1. Working Agreement

This agreement defines how our team collaborates, communicates, and maintains accountability throughout this 8-week project.

### 💻 Code & Repository Management
*   **Protected Main Branch:** Direct commits to the `main` branch are strictly prohibited. All changes must be introduced via Pull Requests (PRs).
*   **PR Review Turnaround:** Every PR requires at least one review from another team member. Reviews must be completed within **24 hours** of submission.
*   **PR Structural Cleanliness:** Empty files or placeholder commits are not permitted. Every PR must represent a functional, single planned task.

### 📢 Communication & Blocker Escalation
*   **Impediment Logging:** If a blocker arises, it must be posted in the team group chat on the **same calendar day** so the Scrum Master can log it.
*   **Standups & Synchronous Alignment:** The team will meet synchronously on set days to align on mid-sprint checks and review retrospective action items.

---

## ✅ 2. Definition of Done (DoD)

A task is officially counted as finished and ready for lab scoring only when it satisfies all the following criteria:

1.  **Code Review:** The PR has been reviewed and approved by at least one eligible peer.
2.  **Validation:** The task has successfully passed its corresponding test cases and acceptance criteria.
3.  **PR Status:** The Pull Request is successfully **Merged** into the target branch.
4.  **Traceability:** The PR link is explicitly pasted into the tracking system and linked to its unique Task ID (e.g., `S1-DEV-01`).
5.  **Master Plan Update:** The "HOPE, Inc. ERP" master planning sheet status is formally updated to **"Merged"**.

---

## 👥 3. Role Guide & Ownership Matrix

This matrix establishes absolute clarity on domain ownership. Each member owns their respective deliverables to ensure the team hits its target metrics of **30 PRs per sprint** (120 total).

### 📋 Scrum Master (SM)
*   **Owner:** Jixell Massey Ogbinar
*   **Domain Ownership:** Repository configuration (branch protection, issue templates), sprint board health, impediment tracking, and publishing sprint reviews/retrospective reports. Keeps the module-to-sprint map aligned to ensure zero timeline slippage.

### 💻 Developer (DEV)
*   **Owner:** Jasmine Mae Ferrer
*   **Domain Ownership:** Core application scaffolding, session handling, environment configurations, API endpoint building, user management mechanics, and business logic execution for Customer, Product, HR, Sales, and Reports modules.

### 🗄️ Database Administrator (DBA)
*   **Owner:** Chadwick Aaron Dela Cruz
*   **Domain Ownership:** Relational database schemas, active views, seed data catalogs, constraint validation (e.g., pay terms, units), query performance tuning, audit log triggers, and database backup/restore orchestration scripts.

### 🧪 Tester (TST)
*   **Owner:** Alexa Jane De Lima
*   **Domain Ownership:** Drafting formal sprint test plans, map matrices (roles x per-action rights), building automated smoke tests, evaluating edge cases (expired/reused tokens), verifying bug fixes, and providing final test sign-off certification.

### 🎨 UI/UX Designer (UIX)
*   **Owner:** Joanne Coree Corpus
*   **Domain Ownership:** Establishing core design systems (typography, color palettes), rendering low-fi wireframes and hi-fi mockups, producing developer handoff documentation, and conducting post-build system usability reviews.

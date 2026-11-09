# HOPE, Inc. ERP

Group project for **Software Engineering 1**. A web-based ERP system with secure
sign-in, user management, per-action rights, and a main page that shows each user only
the modules they are allowed to use.

## Features (Sprint 1)
- Register (new accounts wait for approval), login and logout with sessions
- Set a password on first login, and reset a forgotten password
- User Management: add, edit, approve, block and unblock users
- Per-action rights by module, assigned through a rights dialog
- Main page with modules shown by role and rights

Planned later: Customer, Product, HR, Sales and Reports modules
(see `docs/module-sprint-map.md`).

## Tech Stack
- **Backend:** Node.js and Express
- **Database and auth:** Supabase (PostgreSQL)
- **Frontend:** HTML, CSS and JavaScript, served by the backend

## Project Structure
```
backend/     Express server and API (server.js)
ui-ux/       Frontend pages, styles and design documents
supabase/    Database migrations (run in order: 001, 002, 003)
docs/        Test plan, test cases, team agreement and sprint reports
.github/     PR and issue templates
```

## Requirements
- [Node.js](https://nodejs.org) (LTS version)
- A Supabase project with the three keys below (ask the Developer for them)

No Docker is needed.

## Setup

### 1. Get the code
```
git clone https://github.com/jxlmssy/SoftwareEngr1Project
cd SoftwareEngr1Project
```

### 2. Install packages
```
cd backend
npm install
```

On Windows PowerShell, if `npm` is blocked, use `npm.cmd install` instead.

### 3. Set up the database
Open your Supabase project, go to the **SQL Editor**, and run the files in
`supabase/migrations/` in this order:
1. `001_hope_db.sql`
2. `002_roles_permissions.sql`
3. `003_password_reset.sql`

### 4. Add your environment file
Create a file named `.env` inside the `backend` folder:
```
SUPABASE_URL=your-supabase-project-url
SUPABASE_PUBLISHABLE_KEY=your-publishable-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

**Never commit `.env` or share the service role key.** It is already listed in `.gitignore`.

### 5. Run the app
From the `backend` folder:
```
npm start
```
Open **http://localhost:3000** in your browser. You can check the database connection at
http://localhost:3000/api/test. Press **Ctrl+C** in the terminal to stop the server.

## Running in GitHub Codespaces
1. Add the three keys above as Codespaces secrets in your GitHub settings.
2. Create a codespace on `main`, then run `cd backend`, `npm install` and `npm start`.
3. Open port 3000 from the **Ports** tab.

## Troubleshooting
| Problem | Fix |
| --- | --- |
| `fatal: not a git repository` | Open the terminal inside the `SoftwareEngr1Project` folder |
| `npm` is not recognized | Install Node.js, then restart VS Code |
| PowerShell blocks `npm` | Use `npm.cmd`, or run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` |
| `Cannot find module` | Run `npm install` in the `backend` folder |
| Connection or table errors | Check the `.env` values and that all three migrations ran |

## How We Work
- Never commit directly to `main`. Create a branch named with the Task ID, for example
  `feature/S2-DEV-01-customer-list`, then open a pull request.
- Every PR uses the PR template and needs one review before merging.
- Each task has an issue created from the Sprint task template.
- Details are in `docs/team-agreement.md`.

## Team
| Role | Member |
| --- | --- |
| Scrum Master | Jixell Massey Ogbinar |
| Developer | Jasmine Mae Ferrer |
| DB Admin | Chadwick Aaron Dela Cruz |
| Tester | Alexa Jane De Lima |
| UI/UX Designer | Joanne Coree Corpus |

## Documentation
- Team agreement: `docs/team-agreement.md`
- Module and sprint plan: `docs/module-sprint-map.md`
- Test plan and test cases: `docs/test-plan.md` and the other files in `docs/`
- Design system and mockups: `ui-ux/`
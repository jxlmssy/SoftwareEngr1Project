# Authentication Test Cases

## Scope and Notes

These cases are a test plan only. No test execution is recorded here.

The repository contains a standalone authentication UI prototype in `.github/ui-ux/`. It performs client-side form validation and screen transitions, but does not connect to an authentication service or persist accounts, passwords, reset codes, or sessions. The repository instructions specify Next.js, Supabase Auth and Database, RLS on all Supabase tables, and a `superadmin` default role for signups in development. No Next.js application, Supabase configuration, schema, or RLS policies are present in the files reviewed.

Cases marked **Prototype** can check the current form behavior only. Cases marked **Backend required** describe checks for the integrated application and cannot be verified against the prototype alone. Expected behavior that depends on unspecified policies or security requirements is identified as an assumption to confirm.

## Test Cases

### AT-01: Login with valid credentials (Backend required)

- **Test Case ID:** AT-01
- **Test Scenario:** Sign in with a registered account's valid identifier and password.
- **Preconditions:** An active account exists and its valid credentials are available. Confirm whether login accepts email, username, and/or phone; the UI refers to all three but its label names email or username.
- **Test Steps:**
  1. Open the login screen.
  2. Enter the registered identifier and correct password.
  3. Submit the form.
- **Expected Result:** The credentials are verified by the authentication service and a valid authenticated session is established. The user is taken to the application’s authenticated destination. The current prototype only displays “Logging in...” and does not authenticate.

### AT-02: Login with invalid credentials (Backend required)

- **Test Case ID:** AT-02
- **Test Scenario:** Reject an unknown account, incorrect password, or invalid identifier/password pair.
- **Preconditions:** Authentication backend is available; test credentials do not match an active account.
- **Test Steps:**
  1. Open the login screen.
  2. Enter an unknown identifier or a known identifier with an incorrect password.
  3. Submit the form.
- **Expected Result:** No session is established and access to authenticated content is denied. A safe error is shown. Confirm whether the error must avoid revealing whether an account exists. The prototype does not check credentials.

### AT-03: Login with empty fields (Prototype)

- **Test Case ID:** AT-03
- **Test Scenario:** Submit the login form with both fields empty, then with either field empty.
- **Preconditions:** Login screen is open.
- **Test Steps:**
  1. Submit with both fields empty.
  2. Enter a non-empty identifier, leave the password empty, and submit.
  3. Enter a password, leave the identifier empty, and submit.
- **Expected Result:** Submission is blocked in each case and the corresponding field-level required message is shown. No login attempt is made.

### AT-04: Login with invalid input format (Prototype)

- **Test Case ID:** AT-04
- **Test Scenario:** Submit an identifier that looks like an email but is malformed.
- **Preconditions:** Login screen is open.
- **Test Steps:**
  1. Enter `person@` as the identifier and a non-empty password.
  2. Submit the form.
- **Expected Result:** Submission is blocked and an invalid email message is shown. A non-email identifier is not format-checked by the prototype; confirm whether username and phone formats have requirements.

### AT-05: Sign up with valid information (Prototype UI; account creation backend required)

- **Test Case ID:** AT-05
- **Test Scenario:** Submit a new username, valid unused email, and matching password/confirmation.
- **Preconditions:** Signup screen is open; the email is not already registered. Use a username of at least 3 characters and a password of at least 8 characters.
- **Test Steps:**
  1. Enter a username of at least 3 characters.
  2. Enter a valid unused email address.
  3. Enter a password of at least 8 characters and the same value in confirmation.
  4. Submit the form.
- **Expected Result:** The prototype validates the fields, returns to login, and displays an account-created message. It does not create or persist an account. In the integrated application, account creation must be confirmed by Supabase Auth; confirm email verification and the post-signup flow.

### AT-06: Sign up with invalid information (Prototype)

- **Test Case ID:** AT-06
- **Test Scenario:** Reject missing or malformed signup values and mismatched passwords.
- **Preconditions:** Signup screen is open.
- **Test Steps:** Submit separate attempts using each invalid combination:
  1. Missing username; username shorter than 3 characters.
  2. Missing email; malformed email such as `person@`.
  3. Missing password; password shorter than 8 characters.
  4. Missing confirmation; confirmation different from the password.
- **Expected Result:** Each invalid attempt is blocked with an error on the relevant field; the form does not show successful account creation. These checks reflect the current prototype's validation rules, not confirmed backend password policy.

### AT-07: Register using an existing email (Backend required)

- **Test Case ID:** AT-07
- **Test Scenario:** Attempt to create a second account with an already registered email.
- **Preconditions:** An account with the test email already exists; signup backend is available.
- **Test Steps:**
  1. Open signup.
  2. Enter otherwise-valid signup information using the registered email.
  3. Submit the form.
- **Expected Result:** A duplicate account is not created. The application shows a safe, actionable result consistent with the email-enumeration policy. The prototype has no account store and will show its success message for any values that pass client validation.

### AT-08: Password reset with a registered email (Backend required)

- **Test Case ID:** AT-08
- **Test Scenario:** Request password recovery for an email associated with an account.
- **Preconditions:** A registered account exists and the reset service/email delivery is configured.
- **Test Steps:**
  1. Open “Forgot password?”.
  2. Enter the registered email and submit.
  3. Check the configured delivery channel for the recovery message/code.
- **Expected Result:** A valid recovery mechanism is issued and delivered; no password changes until the recovery proof is verified. The prototype only checks email syntax and advances to the code screen; it does not look up an account or send email.

### AT-09: Password reset with an unregistered email (Backend required)

- **Test Case ID:** AT-09
- **Test Scenario:** Request password recovery for an email not associated with an account.
- **Preconditions:** The email is not registered; reset service is available.
- **Test Steps:**
  1. Open “Forgot password?”.
  2. Enter the unregistered email and submit.
- **Expected Result:** No recovery credential is issued and no account is changed. The response should match the confirmed account-enumeration policy; a generic response is recommended so registered accounts cannot be inferred. The prototype advances identically for any syntactically valid email.

### AT-10: Reject an invalid password-reset code (Backend required; format check is Prototype only)

- **Test Case ID:** AT-10
- **Test Scenario:** Reject an incorrect, expired, reused, or malformed reset code.
- **Preconditions:** A reset request has been initiated for a registered account. Code lifetime and single-use requirements are confirmed.
- **Test Steps:**
  1. Submit a malformed code, then an incorrect code.
  2. Where supported, retry with an expired code and with a code already used successfully.
- **Expected Result:** The backend rejects each invalid code and does not allow a password change. The prototype only requires exactly six digits and accepts any six-digit value; expiry, correctness, and reuse are not checked.

### AT-11: Complete password reset and log in with the new password (Backend required)

- **Test Case ID:** AT-11
- **Test Scenario:** Reset a registered account's password and verify the new credentials.
- **Preconditions:** A registered account and a valid, unused reset credential are available; the reset service is configured.
- **Test Steps:**
  1. Request a reset for the registered email.
  2. Submit the valid recovery credential.
  3. Enter a new password meeting the confirmed policy and confirm it.
  4. Complete the reset, then log in using the registered identifier and new password.
  5. Attempt login with the old password.
- **Expected Result:** The new password is saved only after recovery is verified; login with the new password succeeds and the old password no longer works. The prototype checks for a minimum of 8 characters and a match, then displays “Log in with your new password”; it does not save or change a password.

### AT-12: Complete authentication flow (Backend required)

- **Test Case ID:** AT-12
- **Test Scenario:** Exercise registration, login, password recovery, and login with the recovered password end to end.
- **Preconditions:** A clean test email is available; authentication and email delivery are configured; any email verification requirement is understood.
- **Test Steps:**
  1. Register a new account with valid information.
  2. Complete any required email verification.
  3. Log in with the new account.
  4. Sign out if the application provides sign-out.
  5. Request and complete a password reset.
  6. Log in with the new password and verify the old password is rejected.
- **Expected Result:** Each transition succeeds only after the required service verification; authenticated access is granted only to the valid session. The prototype can demonstrate navigation and local validation, but does not provide registration, verification, sessions, sign-out, or password persistence.

### AT-13: Server-side enforcement when client validation is bypassed (Backend required)

- **Test Case ID:** AT-13
- **Test Scenario:** Ensure invalid or unauthorized authentication operations cannot be performed by skipping or altering browser-side validation.
- **Preconditions:** An integrated application and test environment are available; authorized test tooling is approved.
- **Test Steps:**
  1. Submit signup, login, and reset requests with invalid values while bypassing the UI checks.
  2. Inspect service responses and resulting account/session state.
- **Expected Result:** The trusted service enforces validation and authorization; bypassing client checks does not create accounts, authenticate invalid credentials, or change passwords. Confirm the authoritative validation rules with the backend implementation.

### AT-14: Password and recovery-secret handling (Backend required)

- **Test Case ID:** AT-14
- **Test Scenario:** Check that credentials and reset secrets are not exposed or retained insecurely.
- **Preconditions:** Integrated application and approved test environment are available.
- **Test Steps:**
  1. Submit login, signup, and password-reset forms.
  2. Inspect rendered messages, URLs, browser storage, and application logs available to the tester for password or recovery-secret disclosure.
  3. Verify password fields are masked by default and the show/hide control changes visibility without changing the value.
- **Expected Result:** Passwords and recovery secrets are not echoed into messages, URLs, or inappropriate client storage/logs; password inputs are masked by default. The prototype provides show/hide controls, but backend handling and session storage cannot be assessed until integrated.

### AT-15: Unauthenticated access is blocked by Supabase RLS (Backend required; policy confirmation required)

- **Test Case ID:** AT-15
- **Test Scenario:** Verify unauthenticated clients cannot read or mutate data protected by RLS.
- **Preconditions:** Supabase is configured; identify the tables and operations intended to require authentication and the expected anonymous-access exceptions.
- **Test Steps:**
  1. With no authenticated session, attempt the relevant reads, inserts, updates, and deletes through the application/API client.
  2. Check returned rows/errors and confirm no protected data changed.
- **Expected Result:** RLS policies deny operations not explicitly allowed for unauthenticated users. The repository instruction requires RLS on all Supabase tables, but no schema or policies are present; table-specific expected access must be confirmed before execution.

### AT-16: Authenticated user and role isolation under RLS (Backend required; policy confirmation required)

- **Test Case ID:** AT-16
- **Test Scenario:** Verify a signed-in user cannot access another user's data or perform actions outside the assigned role.
- **Preconditions:** At least two test accounts and the role/policy matrix are available. Repository guidance lists `superadmin`, `admin`, and `user`, and says development signups default to `superadmin`; confirm whether that default is active and which policies each role should receive.
- **Test Steps:**
  1. Sign in as each test role and attempt only the documented reads/writes for that role.
  2. Attempt to access or modify another user's protected records where records are user-scoped.
  3. Verify the role assigned at signup in the development environment, if applicable.
- **Expected Result:** RLS enforces the approved per-role and per-user access matrix; denied actions do not expose or modify protected data. Exact permissions and whether records are user-scoped are not defined in the repository and must be confirmed.

### AT-17: Reset-request and login abuse controls (Backend required; requirements confirmation required)

- **Test Case ID:** AT-17
- **Test Scenario:** Check authentication endpoints resist repeated guessing or reset requests.
- **Preconditions:** Backend is integrated and its rate-limit/lockout behavior and test thresholds are documented.
- **Test Steps:**
  1. Make repeated failed login attempts within the approved test limits.
  2. Make repeated reset requests for a test account.
  3. Observe responses, throttling, and account availability.
- **Expected Result:** Configured abuse protections are applied without exposing credentials or account existence. The repository does not specify rate limits, lockout behavior, or thresholds; confirm these before execution.

## Clarifications Needed

- Confirm whether this standalone prototype is the intended target or whether an integrated Next.js/Supabase application exists outside the files reviewed.
- Confirm supported login identifiers; phone login is mentioned in prototype copy but has no distinct format or authentication implementation.
- Confirm email verification, password policy beyond the prototype's 8-character minimum, session behavior, and sign-out behavior.
- Confirm password-reset delivery, code/token format, expiry, single-use behavior, resend limits, and account-enumeration response policy.
- Provide the Supabase schema and RLS policy/role matrix, including whether development signups really receive `superadmin` and what each role may access.
- Confirm expected rate limiting or lockout behavior for login and reset requests.
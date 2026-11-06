# Bug Reports and Fix Verification — S1-TST-06

## 1. Objective

To document software defects, report bugs through GitHub Issues, and verify whether reported bugs have been properly fixed after developer updates.

## 2. Proposed Test Cases

### TC-01: Identify and reproduce a bug
- **Test Data:** Application feature with an observed unexpected behavior.
- **Steps:**
  1. Open the application.
  2. Navigate to the affected feature.
  3. Perform the steps that caused the unexpected behavior.
  4. Repeat the steps to confirm whether the issue is reproducible.
- **Expected Result:** The issue can be consistently reproduced, and the observed behavior is documented.

### TC-02: Document a bug report
- **Test Data:** Reproducible defect and relevant test account.
- **Steps:**
  1. Record the affected feature.
  2. Write the steps to reproduce the issue.
  3. Record the expected result.
  4. Record the actual result.
  5. Include relevant screenshots or error messages, if available.
- **Expected Result:** The bug report contains enough information for the developer to understand and reproduce the issue.

### TC-03: Create a GitHub Issue for a bug
- **Test Data:** A confirmed defect and its bug report details.
- **Steps:**
  1. Open the project repository on GitHub.
  2. Navigate to the Issues tab.
  3. Select New Issue.
  4. Enter the bug title and description.
  5. Submit the issue.
- **Expected Result:** A GitHub Issue is successfully created with complete bug details and a unique issue number.

### TC-04: Verify a reported bug after a fix
- **Test Data:** A previously reported bug and a developer-provided fix.
- **Steps:**
  1. Review the reported bug and its reproduction steps.
  2. Check that the developer's fix is available in the test environment.
  3. Repeat the original reproduction steps.
  4. Compare the actual behavior with the expected result.
- **Expected Result:** The original issue no longer occurs, and the feature behaves as expected.

### TC-05: Record a failed fix verification
- **Test Data:** A reported bug whose fix does not resolve the original issue.
- **Steps:**
  1. Open the updated application.
  2. Repeat the original bug reproduction steps.
  3. Observe whether the defect still occurs.
  4. Record the actual result.
- **Expected Result:** The verification is marked as Fail, and the developer is informed that the issue remains unresolved.

### TC-06: Perform regression testing after a bug fix
- **Test Data:** A fixed feature and its related existing test cases.
- **Steps:**
  1. Open the updated application.
  2. Execute the original test case.
  3. Execute related test cases that may be affected by the fix.
  4. Record the results.
- **Expected Result:** The reported bug is fixed, and related functionality continues to work correctly.

### TC-07: Update the bug status after verification
- **Test Data:** A GitHub Issue with a completed fix verification result.
- **Steps:**
  1. Review the verification result.
  2. If the fix works, record the result and update the issue status according to team workflow.
  3. If the fix fails, document the remaining problem and notify the developer.
- **Expected Result:** The GitHub Issue accurately reflects the current verification status.

## 3. Test Execution Summary

| Test ID | Test Scenario | Status | Actual Result |
|---|---|---|---|
| TC-01 | Identify and reproduce a bug | Not Run | N/A |
| TC-02 | Document a bug report | Not Run | N/A |
| TC-03 | Create a GitHub Issue for a bug | Not Run | N/A |
| TC-04 | Verify a reported bug after a fix | Not Run | N/A |
| TC-05 | Record a failed fix verification | Not Run | N/A |
| TC-06 | Perform regression testing after a bug fix | Not Run | N/A |
| TC-07 | Update the bug status after verification | Not Run | N/A |

## 4. Bug Report Log

Record actual bugs discovered during testing.

| Bug ID / GitHub Issue Link | Bug Title | Steps to Reproduce | Expected Result | Actual Result | Severity | Status |
|---|---|---|---|---|---|---|
| None recorded yet | — | — | — | — | — | — |

## 5. Fix Verification Log

Record the results after developers provide fixes.

| Bug ID / Issue Link | Fix Description | Verification Result | Actual Result | Remarks |
|---|---|---|---|---|
| None verified yet | — | Not Run | Pending verification | — |

## 6. Notes

- Only report actual defects discovered during testing.
- Do not create fake bug reports just to fill the bug log.
- Mark verification as Pass only when the original issue is resolved.
- Mark verification as Fail if the bug still occurs.
- Record screenshots or other evidence when available.
- Update the GitHub Issue with the verification result.
- If no bugs have been found yet, indicate that no bugs have been recorded rather than inventing issues.

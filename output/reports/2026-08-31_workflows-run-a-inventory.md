# MAP / EXHAUSTIVE FILE INVENTORY — WORKFLOWS RUN A
Group: `workflows` + `feature-hierarchies`
Corpus: `/mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE`, SAP 2026_08, Professional Edition, crawled 2026-08-29.
Directory sizes verified this run: admin-guides **1209**, tools-guides **650**, release-notes 138, release-note-summaries 233.
All `sourceFile` paths below are `<guide-dir>/<filename>.md` relative to ROOT. No `CONCUR_INVOICE/` prefix.

---

## 0. CORPUS-WIDE RAW `<table>` CENSUS (the mandated one, run over BOTH guide dirs)

```
grep -rlc "<table" ROOT/admin-guides ROOT/tools-guides
```
**31 files in admin-guides, 1 in tools-guides — the brief's figure is exactly reproduced.**
Full list with `grep -c "<table"` counts:

| count | file |
|---|---|
| 5 | admin-guides/configure-forms-and-fields-for-purchase-order-copy-down-to-pr-f926eac7.md |
| 5 | admin-guides/policies-the-purchase-order-policy-new-experience-5a1ba7ef.md |
| 2 | admin-guides/overview-attendee-forms-and-fields-96aa4b66.md |
| 1 | **admin-guides/additional-approver-situations-fbb5034c.md** ← WORKFLOWS-RELEVANT |
| 1 | **admin-guides/filter-authorized-approvers-by-workflow-approval-step-aae69350.md** ← WORKFLOWS-RELEVANT |
| 1 | **admin-guides/invoice-settings-cace748d.md** ← WORKFLOWS > SETTINGS TAB, PACKED |
| 1 | admin-guides/create-a-conditional-rule-in-the-editor-86a92887.md ← RULED OUT (print condition rules) |
| 1 | admin-guides/global-level-a53bf756.md ← RULED OUT (account codes, built G5) |
| 1 | admin-guides/configuring-forms-and-fields-in-capture-processing-7c14446c.md |
| 1 | admin-guides/creating-card-accounts-cf71feb4.md |
| 1 | admin-guides/example-data-f7ca8383.md |
| 1 | admin-guides/invoice-barcode-content-type-81641f43.md |
| 1 | admin-guides/invoice-text-content-type-02b21c13.md |
| 1 | admin-guides/onboarding-card-accounts-with-payment-providers-bf273997.md |
| 1 | admin-guides/sample-record-4ae2b08c.md |
| 1 | admin-guides/sample-record-c83b2160.md |
| 1 | admin-guides/sample-record-type-100-{0902106a,2deb79ae,626cb419,dd94ecfd}.md (4 files) |
| 1 | admin-guides/sample-record-type-200-{3c0a370d,b660ce2e,c45336e5}.md (3 files) |
| 1 | admin-guides/sample-record-type-210-91f4d609.md |
| 1 | admin-guides/sample-record-type-300-{2e278186,4e6c56cf,7da0dd27}.md (3 files) |
| 1 | admin-guides/sample-record-type-310-{04182982,1303b053}.md (2 files) |
| 1 | admin-guides/sample-record-type-410-157e0ab8.md |
| 1 | admin-guides/sample-record-type-420-85d647a0.md |
| 1 | **tools-guides/what-fields-are-extracted-during-the-ocr-process-8eddb3cf.md** (the sole tools-guides raw table; Capture Processing, built G4 — not this group) |

**THREE raw-table files land on Workflows. ZERO land on Feature Hierarchies** (every FH file returns `grep -o "<table" | wc -l` = 0 — verified individually, see §2.3).

---

# PAGE 1 — WORKFLOWS

## 1.1 Search log (literal commands)

```bash
R=/mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE
A="$R/concur-invoice-professional-edition-admin-guides"
T="$R/concur-invoice-professional-edition-tools-guides"

# --- 1. FILENAME SWEEP, BOTH DIRS, EQUAL WEIGHT ---
ls "$A" | grep -iE 'workflow|approv|approval-status|reason-c|confirmation|notification|escalat|timeout|delegate|step'
ls "$T" | grep -iE 'workflow|approv|approval-status|reason-c|confirmation|notification|escalat|timeout|delegate|step'
#   -> 213 admin-guides hits, 60 tools-guides hits

# --- 2. CONTENT SWEEP, BOTH DIRS ---
grep -rli "Workflows tool" "$A"                    # 11 files;  "$T" -> 0
for p in "Workflows tab" "Workflow tab" "Workflows page" "Workflow page" "Settings tab" \
         "Approval Statuses" "Authorized Approvers" "Email Notifications" "Confirmation Agreement" \
         "Reason Category" "Step Rules" "Steps page" "General page" "ad hoc step"; do
  grep -rli -- "$p" "$A" | wc -l ; grep -rli -- "$p" "$T" | wc -l ; done
grep -rl "Workflows tab" "$A" "$T"     ; grep -rl "Workflows page" "$A" "$T"
grep -rl "Steps page"    "$A" "$T"     ; grep -rl "General page"   "$A" "$T"
grep -rl "Step Rules"    "$A" "$T"     ; grep -rl "Settings tab"   "$A" "$T"

# distinctive nouns / named controls
for p in "skip step" "Steps Can Be Added By" "Editable By" "Approval Time Expired" "Assignment Timeout" \
         "Allow Timeout Extensions" "Expire After This Many Days" "self-approval" "Prompt for Approver" \
         "recall" "Send Back" "escalat" "single step" "Cost Object Hierarchy Type" "Authorized Approver Level" \
         "Modify Workflow Step" "Add Workflow Step" "Require Hardcopy Receipts" "Hold for Invoice Hard Copy"; do
  grep -rli -- "$p" "$A" "$T"; done

# --- NAVIGATION PHRASING ---
grep -rl "Workflows (left menu)" "$A" "$T"              # 8 files
grep -rl "Invoice Processing Admin" "$A" "$T"           # 24 files (21 admin, 3 tools + 1)
grep -rhoP '(?<=Click )[A-Z][A-Za-z &/-]{2,40}(?= \(left menu\))' "$A" "$T" | sort | uniq -c | sort -rn

# --- SETTINGS FAMILY COHESION (the mechanical proof) ---
grep -rl "apply globally to" "$A" "$T"
#   -> EXACTLY invoice-settings-cace748d.md, purchase-order-settings-a5a997b4.md,
#      purchase-request-settings-b0bce285.md  AND NOTHING ELSE. Confirmed.

# --- CANDIDATE SET ---
grep -rli -e "Workflows tab" -e "Workflow tab" -e "Workflows page" -e "Workflow page" -e "Workflows tool" \
  -e "Settings tab" -e "Approval Statuses" -e "Authorized Approver" -e "Email Notification" \
  -e "Confirmation Agreement" -e "Reason Category" -e "Reason Code" -e "Step Rules" -e "Steps page" \
  -e "workflow step" -e "workflow rule" -e "ad hoc step" -e "self-approval" -e "send back" \
  -e "Approval Time Expired" -e "Assignment Timeout" -e "cost object approv" "$A" "$T"
#   -> 227 files (192 admin / 35 tools). Measured every one:

# --- 3/4. TABLE + CATALOG MEASUREMENT OF EVERY CANDIDATE (leading-whitespace-safe) ---
while read f; do p="$R/$f"; echo "$(stat -c%s "$p") $(grep -cP '^\s*\|' "$p") \
  $(grep -o '<tr' "$p"|wc -l) $(grep -cP '^\s*-   ' "$p") $f"; done < wf-candidates.txt | sort -k2 -rn

# --- REVISION-HISTORY CLASSIFIER ---
grep -n "Revision History" general-information-8b3b0308.md cost-object-approval-8b3d1e0f.md \
       authorized-approvers-8b3c26cc.md email-notifications-8b3dbad4.md   # all -> line 28

# --- PACKED RAW TABLE PROOF ---
grep -c '<tr' invoice-settings-cace748d.md       # 1  (line count — MISLEADING)
grep -o '<tr' invoice-settings-cace748d.md|wc -l # 3  (occurrence count — TRUE)
grep -o "<table.*</table>" invoice-settings-cace748d.md | sed 's|</tr>|\n|g;s|<td[^>]*>|\nCELL: |g;s|<[^>]*>||g'

# --- GRAPH CROSS-CHECK ---
python3 -c "...walk kg-invoice-config.json for every 'sourceFile' key..."
```

## 1.2 Raw `<table>` census for the Workflows candidate set

| file | `grep -c "<table"` | `grep -o "<tr"\|wc -l` | verdict |
|---|---|---|---|
| admin-guides/invoice-settings-cace748d.md | 1 | **3** (`grep -c '<tr'` = 1 — LIES) | **PACKED. 3 settings hidden on one line.** Confirmed by cell dump. |
| admin-guides/additional-approver-situations-fbb5034c.md | 1 | 7 | 1 header + 6 rows of **illustrative** approver/limit/cost-object data. NOT a roster. |
| admin-guides/filter-authorized-approvers-by-workflow-approval-step-aae69350.md | 1 | 3 | **illustrative** level-assignment example (Employee>Line Manager>Country Mgr>HR). NOT a roster. |
| every other Workflows candidate | 0 | 0 | markdown-only |

Verbatim cell dump of the packed table in `invoice-settings-cace748d.md` (three settings a markdown-only extractor loses):
1. `Prevent this payment request submission when exception level exceeds X`
2. `Filter payment request items to those that are applicable to Cost Object`
3. `Allow processor to recall a payment request to last processor step`

→ **Settings-tab payload = 5 (Invoice: 2 markdown + 3 packed) + 3 (PR) + 1 (PO) = NINE.** Brief confirmed exactly.

## 1.3 Long-catalog census (~10+ entries), Workflows

Counted with `grep -cP '^\s*\|'` (leading-whitespace-safe — SAP indents tables inside numbered steps) and `grep -cP '^\s*-   '`.

| file | rows | what it enumerates | class |
|---|---|---|---|
| general-information-8b3b0308.md | **139** | **REVISION HISTORY** (dated doc changes) | **HISTORY, NOT ROSTER.** Mine for structure/dates/history claims only. Still MUST STAY: it is the proof for the Settings-tab placement and carries the uiVariant contradiction. |
| cost-object-approval-8b3d1e0f.md | **85** | REVISION HISTORY | HISTORY |
| create-a-new-workflow-554e86aa.md | **85** | **28 named General-page fields** | **ROSTER — the densest field source in the group** |
| authorized-approvers-8b3c26cc.md | **64** | REVISION HISTORY | HISTORY (real content is the twin `authorized-approvers-8b3ab7ad.md`) |
| email-notifications-8b3dbad4.md | **61** | REVISION HISTORY | HISTORY (real catalog is `variables-for-invoices-or-purchase-requests-26e917cb.md`) |
| variables-for-invoices-or-purchase-requests-26e917cb.md | 58 | **18 email variables** in 9 label/value pairs, Field\|Variable\|Description | **ROSTER** |
| default-workflows-a6fa157a.md | 50 | default workflow steps (Step Order\|Step Name\|Role) for Default Payment Workflow + PO Payment Workflow | ROSTER (system defaults) |
| default-approval-statuses-34c83d58.md | 48 | default approval statuses (Approval Status\|Description\|Approval Action) | **ROSTER / value set** |
| conditional-expressions-and-the-condition-page-4d98af34.md | 38 (+32 bullets) | 8 condition-editor columns (A..H) **plus** a 7-entry Data Object list **plus** a 15-entry `Request` field catalog and a `Employee` field catalog | **ROSTER + 3 catalogs** |
| work-with-the-step-rules-page-4c33cda0.md | 29 | rule fields + the **workflow ACTION catalog** (Change Approver, Generate Exception, Send Back to Employee, Send Email, Skip Step, Force Evaluation) | ROSTER |
| work-with-the-steps-page-fab249d1.md | 28 | 9 Add/Modify Workflow Step fields | ROSTER |
| understand-the-hierarchy-b65d7089.md | 69 | example approver data | ILLUSTRATIVE (see FH page) |
| global-group-vs-authorized-approver-hierarchy-8a960238.md | 25 | 2-column config-step matrix, Global-group-only vs AA hierarchy | **ROSTER (procedure matrix), shared with Feature Hierarchies** |
| filter-authorized-approvers-by-workflow-approval-step-aae69350.md | 21 (+1 raw) | example Name\|Level table | ILLUSTRATIVE |
| workflow-creation-process-1d37b85f.md | 19 | 3 workflow types (Centralized / Decentralized / Approver-Directed) | ROSTER |
| access-workflow-fa9892a7.md | 16 | 4 Workflows-tab LIST COLUMNS (Workflow Name, Workflow Type, Steps Can Be Added By, Editable By) | ROSTER |
| authorized-approver-list-a9522ec8.md | 16 | 4 Authorized Approver List fields (Approver, Can approve exception, Approval Limit, Level) | ROSTER |
| adding-an-invoice-approval-status-d8cbbe5d.md | 16 | Status / Action Text / Editable By Group(s) | ROSTER |
| work-with-purchase-requests-approvals-1c39ee21.md | 16 | SAME 3 fields — the **Purchase Request sub-tab twin** | ROSTER (sub-tab evidence) |
| create-a-confirmation-agreement-3e153f29.md | 16 | Name / Title / Text / Editable by Group(s) | ROSTER |
| modify-an-email-notification-a6e5f4ba.md | 16 | Email Notification Name / Notification Type / Display as From / Overwrite all Languages | ROSTER |
| create-a-new-invoice-delegate-configuration-fcf42662.md | 22 | delegate config fields | **DEFERRED — Delegate Configurations is Run B** |
| create-email-reminders-604c4a46.md | 49 | reminder fields | **DEFERRED — Email Reminders is Run B** |
| email-message-replacement-tokens-c9cc4af4.md | 21 | reminder tokens, Add Email Reminder page | **DEFERRED — Run B** |
| select-an-email-notification-in-the-workflows-tab-663bb8ac.md | 13 | 3 notification slots on the workflow object | ROSTER |
| invoice-settings-cace748d.md | 10 md + 3 packed | **5 Settings-tab controls** | ROSTER |
| purchase-request-settings-b0bce285.md | 13 | 3 Settings-tab controls | ROSTER |
| purchase-order-settings-a5a997b4.md | ~7 | 1 Settings-tab control | ROSTER |

**Measured table payload for the page ≈ 605 non-history rows** (954 total minus the 349 revision-history rows). The four history files hold **37%** of raw payload — brief reproduced exactly.

Long BULLET runs worth naming: `conditional-expressions-and-the-condition-page-4d98af34.md` (32), `create-a-new-workflow-554e86aa.md` (17 — carries the *value sets* for Approval Time Expired Action {No Action, Send to Approver' Approver, Skip to the Next Step}, Assignment Timeout Action {Add Processor Step, Send Back to the Employee}, Cost Object Hierarchy Type {Level, Limit}, Email Notifications {Approval Request, Status Change, Sent Back} and the Email-Notification template names {Default Payment Request Status Change, Default Payment Request Pending Notification, Default Payment Request Status Change Notification}), `general-information-8b3b0308.md` (11).

## 1.4 mustRead — Workflows (86 files)

Ranked. Reasons are load-bearing; the extractor should not need to guess.

### A. Workflow OBJECT wizard — General / Steps / Step Rules / Condition
1. **admin-guides/create-a-new-workflow-554e86aa.md** — 14,383 B, 85 rows, **28 named General-page fields**, the densest file in the group. Contains all four "homeless" timeout fields (Approval Time Expired Action, Expire After This Many Days, Assignment Timeout Action, Allow Timeout Extensions for This Many Days) **plus a fifth the brief did not name: `Expiration Email to Approver`**. Also the conditional "This option is only available if either the Approval Time Expired Action or Assignment Timeout Action options are enabled."
2. **admin-guides/work-with-the-steps-page-fab249d1.md** — Add Workflow Step page, 9 fields: Step Name, Role, Approver Editable By, Deletable By, Initial Status, Approval Actions, Email Employee when step is complete, Can exit step with blocking exceptions.
3. **admin-guides/work-with-the-step-rules-page-4c33cda0.md** — 11,246 B. Rule fields (Name, Force Evaluation) + the **action catalog** (Change Approver, Generate Exception, Send Back to Employee, Send Email, Skip Step). "workflow rules execute at the beginning of the Step before any human interaction."
4. **admin-guides/conditional-expressions-and-the-condition-page-4d98af34.md** — the **WORKFLOWS-side** condition editor (A: Left Parenthesis … H: And/Or), Data Object list, Request/Employee field catalogs. **Dedupe on FILES, not fields:** the Audit-Rules side is `the-condition-page-5d4ea870.md`, already mined and correctly NOT seeded here. This file is cited by ZERO graph fields today.
5. **admin-guides/create-a-new-workflow-15992497.md** — the conceptual twin (distinct loio 15992497, 2,017 B). Carries the ONLY fully nested nav phrasing in the corpus: "the General page in the Workflows tab of the Workflows tool". Already the source of `dep.g1.026`.
6. **admin-guides/access-workflow-fa9892a7.md** — Workflows-tab LIST columns + `Invoice Processing Admin` middle-node nav.
7. **admin-guides/edit-workflow-properties-409a8f0b.md** — Modify/double-click → General page; nav WITHOUT the middle node (C8).
8. **admin-guides/edit-and-reorder-workflow-steps-41535156.md** — Modify Workflow Steps window; `Step Order` column; "You cannot reorder all steps."
9. **admin-guides/edit-workflow-rules-and-actions-abdf9b11.md** — Edit Condition window / Edit Action window (C6 wizard vocabulary).
10. **admin-guides/delete-a-workflow-or-workflow-steps-e9a84a07.md** — Remove button gating; "cannot delete a workflow that is currently assigned to a policy". **Resolves `dep.g1.021`.**
11. **admin-guides/workflow-creation-process-1d37b85f.md** — 6,071 B, 19 rows. Three workflow types. Says the centralized/decentralized switch lives in **"the Settings section of the Workflows tool"** — a C1 variant, and a second independent placement proof for the Settings family.
12. **admin-guides/overview-5ce8a567.md** — **field the seeds missed:** `Use default approver lookup to find authorized approver`, and it says the option is "on the Workflows page (in Step 1)" — a **C7 depth-collapse instance** plus a **wizard-page-as-"Step 1"** naming variant. Do NOT create a second node.
13. **admin-guides/restrict-ad-hoc-steps-to-authorized-approvers-8a523257.md** — `Restrict Authorized Approver for` value set {None of the steps, All Employee-Editable steps, …}. Enumerate the full list; do not complete it.
14. **admin-guides/understand-ad-hoc-steps-ce0af3e7.md** — conditional-visibility edge: the ad-hoc options "do not appear in Workflow until you have selected Authorized Approver feature is available for workflows on the Configuration tab of the Authorized Approvers tab."
15. **admin-guides/step-2-activate-the-feature-27a421e2.md** — `Cost Object Hierarchy Type` with value set **{Level, Limit}**; nav VIA the Invoice Processing Admin menu (C8, middle node present).
16. **admin-guides/self-approval-of-cost-object-based-workflows-20fd435d.md** — `Allow Self Cost Object Approval` on "the General step" (C6).
17. **admin-guides/administrator-experience-8b302852.md** — `Require Hardcopy Receipts`; the **conditional-visibility edge to BOTH the Steps page and the Step Rules page** (`Hold for Invoice Hard Copy`). Also the singular/plural collision in adjacent sentences ("On the Workflow page" / "on the Workflows page") — C3.
18. **admin-guides/step-3-optional-select-enable-the-required-hardcopy-receipt-setting-c50e377e.md** — second, procedural source for the same setting with `Workflows (left menu)` nav.
19. **admin-guides/about-vendor-approval-workflow-step-and-timeout-b3d1bd2c.md** — record "Workflow Step Timeout Duration" / "Approval Action" as a **LABEL CONTRADICTION** against #1's four fields, NOT as orphan fields.
20. **admin-guides/required-steps-43399a5d.md** — the three mandatory system steps (Payment Request Submitted, Prepayment Validation, Pending Payment, Payment Accounting Extract).
21. **admin-guides/understand-steps-and-workflow-rules-7cc4696b.md** — step/rule semantics.
22. **admin-guides/general-workflow-terminology-48a34eb8.md** — vocabulary for the whole page.
23. **admin-guides/workflow-errors-6b89e3f8.md** — error/validation constraints on step ordering.

### B. NEW FINDS — controls no prior artefact seeded (all verified this run)
24. **admin-guides/allowing-automatic-transmittal-of-purchase-orders-0f2e7fae.md** — `Allow employee to automatically transmit Purchase Orders`, reached by "Administration Invoice Workflows Workflows tab by opening a PR workflow". **Not in the 86-file seed set. Real field.**
25. **admin-guides/managing-items-on-purchase-request-belonging-to-the-same-vendor-37e7bf0f.md** — `Consolidate all items on a Purchase Request for the same vendor into a single Purchase Order`, with an explicit two-state description (Selected/Enabled = default; Cleared/Disabled). **Also the corpus's cleanest source of the SINGULAR "Workflow tab" (C3).**
26. **admin-guides/step-1-assign-the-level-to-the-workflow-step-6035f10a.md** — `Role` field on the Modify Workflow Step window, `Authorized Approver Level` field, and the conditional "The Authorized Approver Level field appears only if the Authorized Approver option is selected in the Role field." Full `Workflows (left menu)` → Workflows tab → Steps page path.
27. **admin-guides/step-2-assign-the-level-to-the-approver-d8bf669c.md** — `Level` field in the New/Modify Authorized Approver window; **the corpus's most explicit SUB-TAB click path**: "Click the Authorized Approvers tab and then the Authorized Approver List tab."
28. **admin-guides/filter-authorized-approvers-by-workflow-approval-step-aae69350.md** — the feature narrative behind #26/#27 (raw table = illustrative only).
29. **admin-guides/configure-the-level-filter-8b3bfd21.md** — thin pointer, but it is the topic that NAMES the feature.
30. **admin-guides/configuration-of-the-level-filter-8177f2cc.md** — second thin pointer; note the quoted-label form `"Level"`.
31. **admin-guides/approve-forward-feature-b847d65b.md** — gives `Steps Can Be Added By` values as "Approver Only or Both Employee and Approver" **on the Workflows page**; compare against #1's wording before emitting a value set (likely a label contradiction).
32. **admin-guides/allowing-the-approver-to-approve-and-then-forward-the-invoice-31e0b70c.md** — same control, PR flavour, "selecting an approver under the Steps Can Be Added By list".

### C. Settings tab (the label-collision zone — name these "Settings tab" / "Workflow Settings", NEVER "Invoice Settings")
33. **admin-guides/invoice-settings-cace748d.md** — 5 controls (2 markdown + 3 PACKED RAW). Carries `Type a number from one to 99.` and the label-drift twin forms. Currently cited only by `dep.g2.011`, zero fields.
34. **admin-guides/purchase-request-settings-b0bce285.md** — 3 controls incl. `Prevent purchase request submission when exception level exceeds X` (resolves `dep.g2.012`). Also carries `Type a number from one to 99.`
35. **admin-guides/purchase-order-settings-a5a997b4.md** — 1 control, `Prevent purchase order transmission when exception level exceeds X` (resolves `dep.g2.013`). Also `Type a number from one to 99.`
36. **admin-guides/preventing-po-transmittal-when-po-exceeds-specified-exception-level-51b11602.md** — independent nav proof ("Administration Invoice Workflows Settings tab") and a **shorter label variant** without the trailing X.
37. **admin-guides/enabling-and-disabling-an-invoice-workflow-setting-0e1e6d33.md** — the save procedure; names the surface **"the Workflow Settings page"** — a fourth C1 variant.
38. **admin-guides/workflow-settings-8b3b98e1.md** — 743 B stub; the topic that names "Workflow Settings" as a thing. THIN.

### D. Authorized Approvers tab (+ Configuration / Authorized Approver List sub-tabs)
39. **admin-guides/procedure-2d20b513.md** — **the Configuration sub-tab roster**: the `Authorized Approver feature is available for workflows` checkbox, `Minimum Exception Level`, `Maximum Exception Level`. Full `Workflows (left menu)` → Authorized Approvers tab → Configuration tab path.
40. **admin-guides/authorized-approver-list-a9522ec8.md** — the Authorized Approver List sub-tab roster (Approver, Can approve exception, Approval Limit, Level).
41. **admin-guides/authorized-approvers-8b3ab7ad.md** — **the real content twin.** Prefer over 8b3c26cc.
42. **admin-guides/authorized-approvers-overview-8b3bd2d0.md**
43. **admin-guides/create-an-authorized-approver-step-4640b5a5.md** — Add Workflow Step + Authorized Approver Level, Step Rules cross-ref.
44. **admin-guides/edit-authorized-approver-information-8b3c119a.md**
45. **admin-guides/remove-authorized-approvers-8b3c5273.md**
46. **admin-guides/step-2-activate-the-authorized-approver-feature-c87493ee.md**
47. **admin-guides/using-the-default-approver-hierarchy-for-authorized-approvers-e977da80.md**
48. **admin-guides/find-authorized-approver-using-default-approver-lookup-8b8d58c1.md**
49. **admin-guides/setting-an-unlimited-approval-amount-9d98b489.md**
50. **admin-guides/definition-of-amount-for-limit-approval-06806875.md** — defines "amount" for the Approval Limit field.
51. **admin-guides/how-the-system-determines-which-approver-an-employee-uses-1c83d905.md**
52. **admin-guides/global-group-vs-authorized-approver-hierarchy-8a960238.md** — 25-row config-step matrix. **ALSO a Feature Hierarchies mustRead** — it is the ordering evidence FH-before-Workflows.
53. **admin-guides/level-based-approvals-and-limit-based-approvals-b335cf33.md**
54. **admin-guides/how-level-based-cost-object-approvals-work-8b3cf6b4.md**
55. **admin-guides/how-limit-based-cost-object-approvals-work-8b3d0a3b.md**
56. **admin-guides/direct-approval-under-limit-based-cost-object-approval-1d8b6bca.md**
57. **admin-guides/step-3-edit-the-workflow-steps-f2731590.md** — COA ordering constraint: "The Vendor Approval system step *cannot* precede the Cost Object Approval step."
58. **admin-guides/step-3-add-edit-the-workflow-options-workflow-steps-workflow-rules-14d98974.md** — thin, but it is the COA-guide's Step 3 anchor.
59. **admin-guides/benefits-of-using-cost-object-approval-ed5de5de.md**
60. **admin-guides/cost-object-approval-differences-between-concur-invoice-and-concur-expense-8b3ce225.md**
61. **tools-guides/how-single-step-approval-workflow-works-40145f24.md** — **the uiVariant counter-evidence**: "uses the Authorized Approvers link from workflows in the classic interface". Ties the Authorized Approvers link, the approval-limit value and the skip-step rule into one narrative.

### E. Approval Statuses tab (+ Invoice / Purchase Request sub-tabs)
62. **admin-guides/accessing-the-approval-statuses-tab-7ec7bb6e.md** — nav via Invoice Processing Admin.
63. **admin-guides/adding-an-invoice-approval-status-d8cbbe5d.md** — Status / Action Text / Editable By Group(s).
64. **admin-guides/work-with-purchase-requests-approvals-1c39ee21.md** — **the Purchase Request sub-tab twin**, identical three fields. Sub-tab proof.
65. **admin-guides/editing-invoice-approval-status-d6564019.md**
66. **admin-guides/deleting-invoice-approval-status-9c96fcaa.md**
67. **admin-guides/work-with-invoice-approval-statuses-8b3bab8c.md**
68. **admin-guides/default-approval-statuses-34c83d58.md** — 48-row catalog of default statuses + approval actions. **DO NOT TRUNCATE.**
69. **admin-guides/approval-status-flags-4f534f16.md**
70. **admin-guides/approval-and-payment-statuses-8b3aa475.md**

### F. Email Notifications tab
71. **admin-guides/accessing-and-managing-email-notifications-8b3d94c0.md**
72. **admin-guides/access-email-notifications-9f806b0b.md**
73. **admin-guides/add-an-email-notification-c237a2de.md** — the `Find workflow emails where` list with values **{Payment Requests Notifications, Purchase Request Notifications}**; the Copy flow; wizard steps **General → Primary Recipient → Delegate Recipient**; `Email Subject`, `Email Body`, `Source Edit`. Not a table, so a table-only extractor loses all of it.
74. **admin-guides/modify-an-email-notification-a6e5f4ba.md** — Email Notification Name / Notification Type / Display as From / Overwrite all Languages.
75. **admin-guides/remove-an-email-notification-596d2df1.md**
76. **admin-guides/select-an-email-notification-in-the-workflows-tab-663bb8ac.md** — the three notification slots ON the workflow object (Approval Request / Status Change / Sent Back Notification) + `Workflows (left menu)` + General page.
77. **admin-guides/general-information-00eca1ce.md** — the semantics parent: "%" enclosure, and the **L-prefix rule** that makes the variable set usable.
78. **admin-guides/variables-for-invoices-or-purchase-requests-26e917cb.md** — **THE REAL CATALOG. 18 distinct variables in 9 label/value pairs. ENUMERATE ALL 18.**
79. **admin-guides/overview-8b3df67d.md** — the three notification trigger events; nav "Administration > Invoice > Workflows, on the Email Notifications tab"; the 10MB attachment limit.
80. **admin-guides/email-notifications-for-purchase-requests-6991c389.md**

### G. Confirmation Agreements tab
81. **admin-guides/access-the-confirmation-agreement-tab-666fa0ac.md** — nav; **and the SINGULAR "Confirmation Agreement tab" in its own title against the plural "Confirmation Agreements tab" in its own step 3 (C5, in one file).**
82. **admin-guides/create-a-confirmation-agreement-3e153f29.md** — Name / Title / Text / Editable by Group(s).
83. **admin-guides/editing-a-confirmation-agreement-dc406a56.md**
84. **admin-guides/deleting-a-confirmation-agreement-8cc92339.md**
85. **admin-guides/activating-the-confirmation-agreement-feature-bdfc1dce.md** — links the agreement to the General-page `Submit Confirmation Agreement` / `Approval Confirmation Agreement` fields.
86. **admin-guides/confirmation-agreements-8b3aca2e.md**

### H. Reason Category and Codes tab
87. **admin-guides/reason-category-and-codes-8b3b27d4.md**
88. **admin-guides/creating-a-reason-code-b2b61596.md** — `Reason Category`, `Reason Code`; **the C9 role-gate contradiction: "The Invoice Configuration administrator (_Restricted_) role is required to use the options on this tab."**
89. **admin-guides/modifying-a-reason-code-91457a6d.md**
90. **admin-guides/deleting-a-reason-code-e664c8c4.md**

### I. Identity, page-hood, defaults, history (mine for structure/dates, NEVER as a field roster where marked)
91. **admin-guides/general-information-8b3b0308.md** — **REVISION HISTORY, 139 rows. NOT A ROSTER.** Must stay: (a) "Addition of two new options to the Settings tab:" followed by the two rows that are literally rows 4–5 of the packed table in cace748d — the Settings-tab placement proof; (b) "New Settings tab option: Prevent purchase order transmissions setting."; (c) the uiVariant line "Updated images and text to the new UI for the Workflows Tool …" containing the once-corpus-wide typo **"Worflows"**; (d) the label-drift forms "Filter invoice items to those that are applicable to Cost Object" and "Allow processor to recall an invoice to last processor step".
92. **admin-guides/cost-object-approval-8b3d1e0f.md** — REVISION HISTORY, 85 rows. HISTORY ONLY.
93. **admin-guides/authorized-approvers-8b3c26cc.md** — REVISION HISTORY, 64 rows. HISTORY ONLY.
94. **admin-guides/email-notifications-8b3dbad4.md** — REVISION HISTORY, 61 rows, **exactly ONE variable**. HISTORY ONLY. Do not treat as the variable catalog.
95. **admin-guides/workflows-tool-8b3b4dbe.md** — page identity.
96. **admin-guides/create-and-configure-workflows-8b3add35.md**
97. **admin-guides/edit-and-delete-workflows-properties-and-steps-8b3af043.md**
98. **admin-guides/default-workflows-a6fa157a.md** — 50-row default-step catalog for both default workflows. **DO NOT TRUNCATE.**
99. **admin-guides/workflow-the-default-po-payment-workflow-8b35b62d.md**
100. **admin-guides/workflow-667cee21.md** — PR workflow; names the `Default Purchase Request Workflow` option and the `Skip Vendor Approval if Vendor is Approved` skip step; **and the FH forward reference "must be configured using Invoice Feature Hierarchies before selection via the Policy tool" (NBSP separators, no ">").**
101. **admin-guides/purchase-request-workflow-0cc46220.md**
102. **admin-guides/example-of-typical-purchase-order-workflow-6d3b90d0.md**
103. **admin-guides/additional-approver-situations-fbb5034c.md** — RAW TABLE (illustrative). Keep for the **configuration semantics**: "Any settings configured at the workflow level apply for the entire workflow"; "The _prompt for approver_ setting has no affect within the cost object approval step."
104. **admin-guides/self-approval-for-purchase-requests-1f53fbb1.md**
105. **admin-guides/delegate-self-approval-1b627285.md** — pairs with the General-page `Allow delegated approvers to approve their own requests`.
106. **admin-guides/exception-helper-within-the-audit-rules-and-workflow-tools-07dfd781.md** — shared-editor evidence; supports the file-level dedupe against Audit Rules.
107. **admin-guides/step-8-vendor-approved-workflow-step-2f0d90b9.md** — the Vendor Approval system step in workflow terms.

> mustRead count: **107 files. The 86-file recon floor is beaten by 21**, of which 9 are genuinely new controls or contradictions (items 12, 24, 25, 26, 27, 31, 32, 36, 37).

## 1.5 alsoRelevant — Workflows

Corroboration, runtime narrative that constrains config, or cross-page:
`admin-guides/approver-terminology-8559861c.md`, `admin-guides/approver-user-interface-8b3cba3e.md`,
`admin-guides/approval-flow-page-c73e063f.md`, `admin-guides/what-happens-when-an-approver-clicks-an-approval-action-89053b3f.md`,
`admin-guides/approver-experience-8b30e784.md`, `admin-guides/approver-and-processor-experience-021fc80a.md`,
`admin-guides/examples-f8248518.md` (worked example, 90 rows — ILLUSTRATIVE),
`admin-guides/example-of-level-based-approval-1b91e559.md`, `admin-guides/example-of-limit-based-approval-e7b62a4b.md`,
`admin-guides/additional-scenarios-and-conditions-8b3ca5b7.md`, `admin-guides/terminology-e1e1ed99.md`,
`admin-guides/delegates-and-proxies-a88c80e0.md`, `admin-guides/delegates-proxies-approvers-and-processors-8b283bfd.md`,
`admin-guides/receiving-exception-email-notifications-from-concur-invoice-28039049.md`,
`admin-guides/managing-invoice-notifications-68ddee50.md`, `admin-guides/delegates-email-notification-7c866769.md`,
`admin-guides/setting-the-purchase-email-notification-preferences-6652207b.md`,
`admin-guides/workflow-guides-8b3b85da.md` / `-8b3c7b2a.md` / `-8b3d6ede.md` / `-8b3e09a7.md`
  (four distinct loio, four distinct body md5, **identical 4-row payload listing four EXTERNAL setup guides. NO NODE, NO FIELDS.** They are why this area *looks* like four pages),
`tools-guides/workflow-and-approval-routing-8b4ff6c9.md`, `tools-guides/add-approval-steps-2e17fab0.md`,
`tools-guides/recall-invoice-to-last-processor-step-27ae1061.md` (runtime side of the recall setting),
`tools-guides/send-an-invoice-to-an-additional-approver-afd572de.md`,
`tools-guides/view-the-approval-workflow-of-an-invoice-d8046bec.md`, `tools-guides/view-the-approval-flow-*.md` (3 files),
`tools-guides/purchase-request-approver-experience-8b50b701.md`,
`tools-guides/email-notifications-of-status-change-and-required-approvals-6d58db17.md`,
`admin-guides/user-administrator-fcfd570c.md` (the Authorized Approval Limits window — **OUT OF SCOPE, Administration > Company. Write a forward reference and leave it unresolved.**)

## 1.6 Ruled OUT for Workflows, with reasons

| file | why not |
|---|---|
| `admin-guides/create-a-conditional-rule-in-the-editor-86a92887.md` (raw table) | **PRINT CONDITION RULES** — "Print Condition Rule Name", "Click Next. The Conditions page appears", "Print Condition Rules List page". Not the Workflows condition editor. Belongs to print-format/reminder configuration. |
| `admin-guides/global-level-a53bf756.md` (raw table) | Account-code global level — **Accounting Administration, BUILT Group 5.** |
| `tools-guides/the-query-builder-and-the-condition-editor-af058a80.md` and `-e10473f9.md` | Duplicate titles, different loio, ~19 KB of table — the **Processor RUNTIME Query Builder**, not config. **DO-NOT-CONFUSE with the Condition page.** Deliberately NOT seeded. |
| `admin-guides/prevent-approver-from-adding-and-deleting-line-items-in-an-invoice-9de9dba8.md` | Explicitly "On the **Invoice Settings page**" — the BUILT Group 1 page. `Hide Add and Delete Item Link for Payment Approver User`. **Cited by zero graph nodes today → report as a possible Invoice Settings gap, do NOT home it on Workflows.** |
| `admin-guides/prevent-processor-to-change-vendor-pending-processor-in-workflow-edbca7d1.md` | Same — "On the **Invoice Settings page**", `Allow processor users to change vendor on requests pending processor roles`. **Also cited by zero graph nodes. Report, don't re-home.** |
| `admin-guides/available-invoice-settings-8b3411f0.md` | The BUILT Invoice Settings page's source (12 field citations). Nothing moves. |
| `admin-guides/procedure-configure-settings-068fa6f3.md` (69 rows) | The **Attendees** page's Settings tab — Group 5. A "Settings tab" false positive. |
| `admin-guides/step-4-additional-configuration-steps-37f6c7ba.md` | Tax Validation setup — Company Locations / Forms and Fields / Tax Administration, all BUILT. |
| `tools-guides/available-actions-e164ad23.md` (83 rows) | Invoice **Processor** role capability matrix — runtime permissions, not workflow config. |
| `admin-guides/create-email-reminders-604c4a46.md`, `create-reminder-rules-b0a7fac5.md`, `email-message-replacement-tokens-c9cc4af4.md`, `access-email-reminders-96f3ca18.md` | **Email Reminders — WORKFLOWS RUN B. Do not build here.** |
| `admin-guides/delegate-configuration-8b2bd26d.md` (91 rows), `create-a-new-invoice-delegate-configuration-fcf42662.md` (22), `edit-…-c7f51424.md`, `delete-…-92627a9b.md`, `access-and-view-payment-delegate-configurations-8ed1298f.md` (37), `special-considerations-for-*` | **Delegate Configurations — WORKFLOWS RUN B.** |
| `admin-guides/the-condition-page-5d4ea870.md` | **AUDIT RULES side, already mined (16 fields).** File-level dedupe boundary. |
| release-notes / release-note-summaries (371 files) | Not a field or value source. Consulted only to date the UI-variant claim; **cited as sourceFile nowhere.** |

## 1.7 Findings the extractor must carry (not fix here)

- **EXISTING-GRAPH DEFECTS, REPORT ONLY.** Verified against `output/kg-invoice-config.json` this run: `dep.g2.011` cites `invoice-settings-cace748d.md` while targeting page "Invoice Settings" (should be Workflows > Settings tab); `dep.g2ar.025` duplicates `dep.g2ar.024` on an "Invoice Settings" target whose quote names Workflows and Settings; `page.exceptions.navPathAlternates` contains "Administration > Invoice > Workflows > Settings", which is not a route to Exceptions.
- **BRIEF CORRECTION (measured).** The brief says "zero of the 486 graph fields cite any of the three [settings] files." True for FIELDS. But all three ARE cited once each — in `configDependencies` (`dep.g2.011/012/013`). Same for the FH files (`bcaf1f5a` ×2, `8b510285`, `cc91aa73`, `c4035783`). No rebuild debt; just don't report them as uncited.
- **uiVariant = "undifferentiated".** No `*-new-experience-*` twin exists for any workflow file (`ls | grep new-experience` over both dirs returns no workflow topic). The Sept 19 2025 revision line claims a replacement-in-place; `tools-guides/how-single-step-approval-workflow-works-40145f24.md` claims the classic interface. Two dated statements, opposite directions, one corpus version. **Emit as a contradiction node. Do not claim "both".**
- **C8 nav depth, measured.** `Invoice Processing Admin` appears in 21 admin-guides + 3 tools-guides files; 5 workflow topics route through it (`access-workflow-fa9892a7`, `accessing-the-approval-statuses-tab-7ec7bb6e`, `access-the-confirmation-agreement-tab-666fa0ac`, `self-approval-of-cost-object-based-workflows-20fd435d`, `step-2-activate-the-feature-27a421e2`) and 8 use `Workflows (left menu)` without it. **Record BOTH; the driver tries the middle node first.**
- **Left-menu label census, both dirs, this run:** Invoice Settings 3, **Workflows 2**, Image Handling 2, Forms and Fields 2, User Permissions 1, User Administration 1, Purchase Order Matching Rules 1, Policies 1, Localization 1, List Management 1, Invoice Preferences 1, **Feature Hierarchies 1**. Zero for Approval Statuses / Authorized Approvers / Email Notifications / Workflow Settings / Confirmation Agreements / Reason Category and Codes / Purchase Request Settings / Purchase Order Settings. **The seven-tabs-one-page verdict is reproduced. Do not re-litigate.**

---

# PAGE 2 — FEATURE HIERARCHIES

## 2.1 Search log (literal commands)

```bash
# --- 1. FILENAME SWEEP, BOTH DIRS ---
ls "$A" | grep -iE 'hierarch|source-list|segment|level|vendor-employee-access'   # 37 hits
ls "$T" | grep -iE 'hierarch|source-list|segment|level|vendor-employee-access'   # 19 hits

# --- 2. CONTENT SWEEP, BOTH DIRS ---
grep -rli "Feature Hierarch" "$A" "$T"          # 13 admin + 11 tools = 24 files
for p in "Feature Hierarchies" "Feature Hierarchy" "Source List" "Modify Hierarchy" "Segment Name" \
         "cost object approver hierarchy" "authorized approver hierarchy" "invoice routing" \
         "Invoice Payment" "vendor employee access"; do
  grep -rli -- "$p" "$A" | wc -l; grep -rli -- "$p" "$T" | wc -l; done
#   Feature Hierarchies a=10 t=7 | Source List a=6 t=7 | Modify Hierarchy a=4 t=1 | Segment Name a=1 t=1

# --- NAVIGATION ---
grep -rl "Feature Hierarchies (left menu)" "$A" "$T"     # -> exactly 1 file (bcaf1f5a)
grep -oP 'Administration.{0,40}Hierarchies' <each nav file> | cat -A     # NBSP PROOF

# --- 3. RAW TABLE CENSUS (every FH candidate, individually) ---
for f in <18 FH candidates>; do grep -o '<table' "$f" | wc -l; done      # ALL ZERO

# --- 4. LONG CATALOG CENSUS ---
for f in <18 FH candidates>; do grep -cP '^\s*\|' "$f"; done
grep -c "of the source list attached to the Invoice Vendor Employee Access feature hierarchy" \
     admin-guides/vendor-group-mapping-record-type-310-6eb8ffdc.md      # -> 10
grep -o "Level [0-9]* Code" tools-guides/the-import-template-fields-and-descriptions-8b51ca3d.md | sort -u
```

## 2.2 NBSP HAZARD — VERIFIED BYTE-EXACTLY THIS RUN

`cat -A` output for the nav clauses:
```
hierarchies-7f68a876.md          : AdministrationM-BM- M-BM- InvoiceM-BM- M-BM- Hierarchies
professional-edition-fb3e6aa2.md : Administration M-BM- M-BM- Invoice M-BM- M-BM- Feature Hierarchies
```
`M-BM-` is U+00A0. **`grep -c '>'` returns 0 on `hierarchies-7f68a876.md` and `professional-edition-fb3e6aa2.md`** — there is no `>` anywhere in either file. **NEVER `grep -F` across a menu arrow on this page.** Quote around the separators or the quote will not verify and the node dies.

Note also `hierarchies-7f68a876.md` writes the label as plain **"Hierarchies"**, not "Feature Hierarchies" — carry that alias. And per the critic: the quote `"Hierarchies (explained below)."` verifies but does NOT carry the path; the path is in the preceding NBSP clause. Use a span that includes the separators, or demote it to an aliases citation.

## 2.3 Raw `<table>` census, Feature Hierarchies

**Every candidate: 0.** Explicitly measured:

| file | bytes | md rows (`^\s*\|`) | `<table` |
|---|---|---|---|
| tools-guides/step-2-associate-the-feature-hierarchy-to-the-source-list-bcaf1f5a.md | 2,041 | 0 | **0** |
| admin-guides/professional-edition-fb3e6aa2.md | 1,516 | 0 | **0** |
| tools-guides/step-1-create-the-source-list-in-list-management-cc91aa73.md | 2,231 | 0 | **0** |
| tools-guides/create-the-invoice-routing-feature-hierarchy-8b510285.md | 1,291 | 0 | **0** |
| admin-guides/hierarchies-7f68a876.md | 997 | 0 | **0** |
| admin-guides/workflow-667cee21.md | 1,896 | 0 | **0** |
| admin-guides/step-1-define-the-cost-object-approver-hierarchy-6e7b7dc6.md | 1,289 | 0 | **0** |
| admin-guides/step-1-define-the-invoice-authorized-approver-hierarchy-fed7c7fe.md | 985 | 0 | **0** |
| tools-guides/overview-of-steps-37e3c289.md | 1,537 | 0 | **0** |
| tools-guides/configure-for-vendor-employee-access-8b52a235.md | 838 | 0 | **0** |
| tools-guides/vendor-manager-terminology-8b54bff7.md | 1,715 | 0 | **0** |
| tools-guides/additional-documentation-a105a5d7.md | 1,764 | 0 | **0** |
| admin-guides/create-hierarchy-and-import-connected-list-data-c6ab8a52.md | 1,028 | 0 | **0** |
| admin-guides/user-administrator-fcfd570c.md | 4,603 | 0 | **0** |
| admin-guides/understand-the-hierarchy-b65d7089.md | 5,065 | **69** | 0 |
| admin-guides/global-group-vs-authorized-approver-hierarchy-8a960238.md | 2,247 | **25** | 0 |
| tools-guides/the-import-template-fields-and-descriptions-8b51ca3d.md | 3,319 | **47** | 0 |
| admin-guides/vendor-group-mapping-record-type-310-6eb8ffdc.md | 4,384 | **74** | 0 |

**Every field-bearing FH file returns 0 indented table rows and 0 raw tables.** The brief's claim is exactly reproduced. The four files that DO carry rows are all either illustrative or import specs — none is a page-field roster.

## 2.4 Long-catalog census, Feature Hierarchies

| file | rows | enumerates | class |
|---|---|---|---|
| admin-guides/understand-the-hierarchy-b65d7089.md | **69** | example approver/limit/default-approver DATA across two worked examples | **ILLUSTRATIVE — SKIPPED as a field/value source, deliberately.** Kept for the hard forward reference "You must define the authorized approver hierarchy (Invoice > Feature Hierarchies) and import/create its associated source list before the authorized approver feature can be activated." (note: THIS file uses a real `>`), and for "By default, the Request Authorized Approver hierarchy uses the Request and Employee fields". |
| admin-guides/vendor-group-mapping-record-type-310-6eb8ffdc.md | **74** | **10 hierarchy Level fields** ("Level N of the source list attached to the Invoice Vendor Employee Access feature hierarchy", N = 1..10) | **DEDUPE-FLAGGED REFERENCE ONLY.** Import spec, not a page field. Confirms the Level range for the Vendor Employee Access hierarchy. |
| tools-guides/the-import-template-fields-and-descriptions-8b51ca3d.md | **47** | Vendor-Employee-Access import fields incl. Level 1/2 Code | **DEDUPE-FLAGGED REFERENCE ONLY** for Level semantics. |
| admin-guides/global-group-vs-authorized-approver-hierarchy-8a960238.md | **25** | 2-column config-step matrix, "Global group only" vs "Authorized Approver hierarchy" | ROSTER (procedure ordering). **Shared with Workflows.** |

**BRIEF CORRECTION, MEASURED.** The brief warns not to re-emit the Group 5 Level value set "already owned" from `the-import-template-fields-and-descriptions-8b51ca3d.md`. That value set (`vset.g5g5.unnamed.level-1-code-level-10-code-…`) and `range.g5g5.009` actually cite a **DIFFERENT file**: `tools-guides/the-import-template-fields-and-descriptions-8b4aa547.md` (1,478 B, 19 rows, Hierarchy Mappings import). `8b51ca3d` (3,319 B, 47 rows, Vendor Employee Access import) is cited by nothing. **There are FIVE duplicate-title `the-import-template-fields-and-descriptions-*.md` files** (8b4aa547, 8b4e1af3, 8b51ca3d, 8b52534d, 8b53850b). The dedupe instruction still holds — do not re-emit a Level value set — but the file identities in the brief are swapped.

## 2.5 mustRead — Feature Hierarchies (12 files)

1. **tools-guides/step-2-associate-the-feature-hierarchy-to-the-source-list-bcaf1f5a.md** — **THE FIELD SOURCE.** `Source List`, `Level` (with "this is the default and cannot be changed" for the Employee value), `Segment Name` list, `Modify Hierarchy` button, the feature-name selector (Invoice Vendor Employee Access). **The ONLY file corpus-wide containing "Feature Hierarchies (left menu)".** Nav = Administration → Invoice → Feature Hierarchies, **no middle segment.** Already cited by `dep.g5g5.050` and `dep.g5g5.051`.
2. **admin-guides/professional-edition-fb3e6aa2.md** — the second full procedure, DIFFERENT feature: select `Invoice Payment` feature name → `Modify Hierarchy` → source list → `New` → set the **level to Request** → select the custom field → Save. **NBSP nav, no `>` anywhere in the file.** Gives the Level value `Request` against bcaf1f5a's `Employee` — record BOTH, they are provisioning/feature-dependent, do not reconcile.
3. **tools-guides/step-1-create-the-source-list-in-list-management-cc91aa73.md** — where the Source List is actually created (List Management, BUILT G5). Resolves the "Step 2 without Step 1" gap. `List Name`, `Item Code`, multi-level connected lists. **Emit the FH→List Management ordering edge; do NOT re-home List Management fields.**
4. **tools-guides/create-the-invoice-routing-feature-hierarchy-8b510285.md** — the **Invoice Routing** feature hierarchy: source list + segments (Custom 10/11/12 as invoice header fields). Already cited by `dep.g2.003`. Feeds the BUILT Routing Configuration page.
5. **admin-guides/hierarchies-7f68a876.md** — the **"Hierarchies"** menu-label alias no prior artefact recorded, and the statement that both Authorized Approver and COA workflows require their hierarchy configured here FIRST. NBSP hazard: no `>` in the file.
6. **admin-guides/understand-the-hierarchy-b65d7089.md** — the **HARD FORWARD REFERENCE into the Workflows build** ("You must define the authorized approver hierarchy (Invoice > Feature Hierarchies) … before the authorized approver feature can be activated"), plus the Request-Authorized-Approver default fields. **Its 69 rows are ILLUSTRATIVE and are being skipped as a roster on purpose — say so in notes.**
7. **admin-guides/global-group-vs-authorized-approver-hierarchy-8a960238.md** — 25-row matrix naming "Define the Invoice Authorized Approver hierarchy: Set up the hierarchy / Create a connected (multi-level) list of the hierarchy levels" as step 1. Ordering evidence. **Shared with Workflows.**
8. **admin-guides/step-1-define-the-cost-object-approver-hierarchy-6e7b7dc6.md** — the **role-gate stated in contrast to the Workflows gate inside one flow**: "This portion of the configuration requires permissions for the **Feature Hierarchies** section in Administration" (step 1) vs `step-2-activate-the-feature-27a421e2.md` / `step-3-edit-the-workflow-steps-f2731590.md` "permissions for the **Workflows** section in Administration" (steps 2–3). **Two gates, two peer surfaces, in SAP's own contrast — the page-hood proof.** Also the explicit external-guide deferral.
9. **admin-guides/step-1-define-the-invoice-authorized-approver-hierarchy-fed7c7fe.md** — the AA-hierarchy anchor. THIN (985 B, no procedure) — an honest data point for coverage "partial".
10. **admin-guides/workflow-667cee21.md** — the PR-side forward reference: "PR hierarchies are set up independently, including Authorized Approval and COA. These must be configured using Invoice Feature Hierarchies before selection via the Policy tool." **NBSP, 3 occurrences, no `>`.** Shared with Workflows.
11. **tools-guides/overview-of-steps-37e3c289.md** — **page-hood evidence, belongs in identityNotes NOT navPathEvidence.** Framing: "The administrator uses the following tools in the order presented", then Step 1 List Management, **Step 2 Feature Hierarchies**, Step 3 Group Configurations, Step 4 Forms and Fields, Step 5 Vendor Employee Access Import, Step 6 User Administration — naming Feature Hierarchies a peer TOOL of three already-built pages.
12. **admin-guides/create-hierarchy-and-import-connected-list-data-c6ab8a52.md** — the hierarchy-creation + connected-list step; another explicit deferral to the external Shared guide.

**Dedupe-flagged reference only (read, do NOT emit fields or value sets from):**
- `tools-guides/the-import-template-fields-and-descriptions-8b51ca3d.md` (47 rows) — Level semantics.
- `admin-guides/vendor-group-mapping-record-type-310-6eb8ffdc.md` (74 rows) — Levels 1–10 for the Vendor Employee Access hierarchy.

## 2.6 alsoRelevant — Feature Hierarchies

`tools-guides/configure-for-vendor-employee-access-8b52a235.md` (the multi-tool framing),
`tools-guides/vendor-manager-terminology-8b54bff7.md` ("A vendor group created using List Management, Feature Hierarchies, and Group Configurations"),
`tools-guides/additional-documentation-a105a5d7.md` (names the external Shared: Feature Hierarchies Setup Guide — **coverage-gap evidence**),
`tools-guides/before-you-begin-9b98872a.md`, `tools-guides/step-3-set-up-the-named-vendor-groups-in-group-configurations-abf369db.md`,
`tools-guides/step-4-add-the-custom-field-to-the-employee-form-da376eef.md` (the Custom 02 field from the FH step reaching the Employee form),
`tools-guides/auto-assign-an-invoice-using-hierarchies-c4035783.md` (already cited by `dep.g2.004`; **Routing Configuration side**),
`admin-guides/ownership-assignment-order-of-assignment-638460cb.md`,
`admin-guides/preventing-po-transmittal-when-po-exceeds-specified-exception-level-51b11602.md` (names the external FH guide),
`admin-guides/user-administrator-fcfd570c.md` (**OUT OF SCOPE** — Administration > Company; the Authorized Approval Limits link appears only "If the Authorized Approver feature is activated and the company's Authorized Approver hierarchy has at least one level (in addition to Global)". Write the forward reference; leave unresolved.)

## 2.7 Ruled OUT for Feature Hierarchies

| file | why not |
|---|---|
| **`admin-guides/overview-8b2edfd0.md`** | **REMOVED PER CRITIC, CONFIRMED.** It is a **GROUP CONFIGURATIONS** topic ("Group Configurations in Concur Invoice allow administrators to define and manage hierarchical groups"). Group Configurations is BUILT (G1, 22 fields). Seeding it here is the exact setup for re-homing G1 fields and it inflates measured richness so the thinness disguises itself. **NOT a field source for this page.** |
| `tools-guides/overview-8b4a5692.md` | Says the Hierarchy Mapping List tab is "for the Invoice Routing Feature Hierarchy **in Administration Invoice Routing Configuration**". That tab belongs to the BUILT **Routing Configuration** page, not Feature Hierarchies. Useful boundary evidence; do not home it here. |
| `tools-guides/hierarchy-mappings-import-8b4a7ddb.md`, `import-hierarchy-mappings-information-8b4a69e7.md`, `access-hierarchy-mappings-import-708f5fdc.md`, `search-for-hierarchy-mappings-1dea6bb6.md`, `step-1-download-hierarchy-mappings-template-…-d981b372.md`, `step-2-populate-template-with-hierarchy-mappings-6f4fe850.md`, `over-night-hierarchy-mapping-import-available-059c9571.md`, `populate-the-routing-configuration-page-by-using-the-hierarchy-import-15601ce7.md`, `use-hierarchy-mappings-in-invoice-*.md` | **Hierarchy MAPPINGS import** — a Routing Configuration/import surface already represented in the graph (5 of these are already cited). Different object from a feature hierarchy. |
| `admin-guides/account-code-hierarchy-869f7eca.md`, `accessing-the-account-code-hierarchy-page-edce1aa5.md`, `adding-a-new-account-code-hierarchy-level-d3074f8c.md`, `ledger-and-account-code-hierarchy-levels-73c7c458.md`, `levels-of-account-codes-8e2fcbe1.md`, `global-level-a53bf756.md`, `maintaining-hierarchies-and-account-codes-8b272263.md`, `step-2-defining-the-expense-account-code-hierarchy-4a179387.md`, `adding-a-new-segment-d6dfb07b.md`, `editing-a-segment-f79aecf7.md`, `deleting-a-segment-62b49ad9.md` | **ACCOUNT CODE hierarchy — Accounting Administration, BUILT G5.** A "hierarchy"/"segment"/"level" homonym trap; several are already cited by the graph. **Do not re-home.** |
| all `*vat*level*`, `*single-level-vat*`, `using-the-tax-field-at-both-the-invoice-and-line-item-levels-a55b90c8.md` | "level" homonym — VAT header/line-item level. Tax Administration, BUILT G5. |
| `admin-guides/configuration-of-the-level-filter-*.md`, `configure-the-level-filter-*.md`, `step-1-assign-the-level-to-the-workflow-step-*.md`, `step-2-assign-the-level-to-the-approver-*.md` | "Level" homonym — the **Workflows** authorized-approver level filter. Homed on Workflows (§1.4 items 26–30). |

## 2.8 The honest coverage statement for this page

`coverage: "partial"`, and verifyNotes must say **why**: SAP files the substance of this surface in the external **"Shared: Feature Hierarchies Setup Guide"**, which is **not in this corpus**. Four separate in-corpus topics defer to it by name (`step-1-define-the-cost-object-approver-hierarchy-6e7b7dc6.md`, `create-hierarchy-and-import-connected-list-data-c6ab8a52.md`, `understand-the-hierarchy-b65d7089.md`, `additional-documentation-a105a5d7.md`, plus `preventing-po-transmittal-…-51b11602.md` and `step-2-associate-…-bcaf1f5a.md`). **Expect ~5 fields: Source List, Level, Segment Name, the feature-name selector, Modify Hierarchy.** Thin with a documented reason is the correct, publishable answer. **Do not manufacture fields around the gap.**

Navigation: **Administration > Invoice > Feature Hierarchies, no middle segment.** `Invoice Processing Admin` is **UNATTESTED** for this page (it appears in 24 corpus files, none of them an FH nav topic) — record UNATTESTED, **not absent**. The left-menu entry is a **SIBLING** of Workflows, not a child; an automation driver routed to it via a Workflows path **WILL FAIL**. That is an active harm, not a filing preference.

`uiVariant`: no `*-new-experience-*` twin exists for any FH file. **Do not claim "new" or "both".**

## 2.9 Files that legitimately belong to BOTH pages

State the dual membership rather than assigning arbitrarily:
- `admin-guides/global-group-vs-authorized-approver-hierarchy-8a960238.md` — the config-step matrix spans both.
- `admin-guides/understand-the-hierarchy-b65d7089.md` — FH object, Workflows consumer.
- `admin-guides/workflow-667cee21.md` — PR workflow topic that carries the FH forward reference.
- `admin-guides/step-1-define-the-cost-object-approver-hierarchy-6e7b7dc6.md` — FH-gated step 1 of a Workflows-gated COA flow.
- `admin-guides/step-1-define-the-invoice-authorized-approver-hierarchy-fed7c7fe.md` — same.
- `admin-guides/user-administrator-fcfd570c.md` — forward reference from BOTH into the out-of-scope Company surface.

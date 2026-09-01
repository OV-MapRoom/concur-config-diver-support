# ADVERSARIAL CRITIC — COMPLETENESS (what is MISSING)
**Run:** Email Reminders + Delegate Configurations (Workflows group B), 2026-09-01
**Lens:** completeness. Every claim below has a command behind it.
**Abbreviations:** `AG` = `concur-invoice-professional-edition-admin-guides/`, `TG` = `concur-invoice-professional-edition-tools-guides/`.
ROOT = `/mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE`

---

## HEADLINE

I ran an independent census over a **69-file pool** (my own `grep -rli "reminder"` ∪ `grep -rli "delegat"` across BOTH guide directories, which is wider than the map's 34+27) and re-derived every count from source. **The build is materially complete on both rosters, both value catalogues and the boundary against Workflows.** All 384 `sourceQuote`/`sourceFile` pairs in the merge-bound and extract files verify byte-for-byte (0 misses, my own verifier, below).

Five things would still change the graph. In severity order:

1. **Three named condition-editor controls on the Email Reminders rule wizard were refused on a rationale the built graph twice contradicts.** (SEVERE — breaks the mandatory first step of the page's own workflow.)
2. **A 24-row catalog on the ALREADY-BUILT Invoice Settings page is in the graph at 13.** Surfaced from this run's own pool. 11 named settings with enumerated Default Status values are missing. (SEVERE, out-of-scope-for-merge, needs its own correction pass.)
3. **3 of the 6 entries of the delegate terminology catalogue never reach a merge-bound file.** (MEDIUM.)
4. **Delegate Configurations' defining semantics — the cascading-permission model — exists only in extract prose, in no record.** (MEDIUM.)
5. **A cross-surface `Display as From` data-type divergence between Email Reminders and the built Workflows Email Notifications tab is unrecorded.** (MEDIUM — it is the strongest *positive* evidence the two surfaces are distinct, and a real driver hazard.)

Everything else I tested came back clean, and the clean bills are stated as findings, not omitted.

---

## 1. MUST-READ FILES NEVER CITED

The digest's `mustReadNeverCited` is **wrong in both directions**. I recomputed citations two ways.

### 1a. Census across ALL parts (rosters + synth + extracts)
Only **one** declared must-read is cited nowhere at all:

| file | citations, all parts |
|---|---|
| `AG/overview-8b2c769e.md` | **0** |

The digest also named `AG/delete-email-reminders-8f693700.md` (actually **2**), `AG/edit-reminder-rules-8f2edae9.md` (actually **1**) and `AG/delete-an-invoice-delegate-configuration-92627a9b.md` (actually **4**). Those three declarations are stale — all three are cited, and `delete-an-invoice-delegate-configuration-92627a9b.md` in fact grounds the `remove` and `confirm-yes` fields on Delegate Configurations.

### 1b. Census restricted to MERGE-BOUND files only (`roster-*.json` + `synth-*.json`)
This is the census that matters, and it is worse. **Six declared must-reads reach the merge with ZERO citations**, of which only one was declared:

| page | file | merge-bound citations | declared as a skip? |
|---|---|---|---|
| Email Reminders | `AG/overview-8b2c769e.md` | 0 | yes |
| Email Reminders | `AG/best-practices-when-localizing-subject-and-email-message-fields-48515f40.md` | 0 | yes |
| Delegate Configurations | `AG/overview-8b2ba917.md` | **0** | **NO** |
| Delegate Configurations | `AG/audit-invoice-delegate-actions-3660a51f.md` | **0** | yes |
| Delegate Configurations | `AG/invoice-user-f11cccd8.md` | **0** | **NO** |
| Delegate Configurations | `AG/user-administrator-5aa3eb5e.md` | **0** | yes |

### 1c. What a graph would have gained from each — file by file, read in full

**`AG/overview-8b2c769e.md` (1,488 B, 0 tables, 0 pipe rows) — CLEAN BILL.**
Read in full. Two bullets (`Overdue Disbursement`, `Approving`) that are business scenarios, not an option list, plus the interval-driven semantics and one worked example. There is no control here and emitting the two bullets as a value set would have invented an enumeration. **The skip is honest and correct.** The one thing it uniquely carries — "Email Reminders tool is used to set up email messages to be sent on an interval basis" — is the cleanest one-line statement of the Workflows boundary in the corpus and belongs in the page node's notes, but it is not a record.

**`AG/best-practices-when-localizing-...-48515f40.md` — CLEAN BILL.** Its 2,000-char/double-byte rule is already carried verbatim inside `field.email-reminders.email-message`'s notes (verified: the notes quote it). Citing it again would duplicate.

**`AG/overview-8b2ba917.md` — NOT CLEAN. See finding #4 (§7c).** This file is the page's whole reason for existing:
> `Concur Invoice delegate configurations define the subset of invoice permissions that delegates are allowed to have within Concur Invoice.`

`grep -l "cascading\|subset of invoice permissions\|template that allows or denies" roster-*.json synth-*.json` returns **nothing**; the same grep over `extract-*.json` returns `extract-delegate-configurations-procedure.json`. The map itself said (map-inventory.md:279) "**This is the cascading-permission model and it should be the page's `notes`**". It is not in any record.

**`AG/invoice-user-f11cccd8.md` + `AG/user-administrator-5aa3eb5e.md` — NOT CLEAN, one small gap.** Both carry, verbatim (`grep -F -c` = 1 in each):
> `The columns that appear for the delegate will vary, depending on the settings in the delegates configuration file`

This is the single best piece of evidence that this page drives what the consumer surfaces show. `synth-dependencies.json` has five `User Administration` targets and **none** of them is grounded on this sentence — they cite `approver-terminology`, `fcf42662`, `0ee0f0b9`, `8b30fb06`. One dependency record is missing and the quote for it is available and verified.

**`AG/audit-invoice-delegate-actions-3660a51f.md` — CLEAN BILL.** Read in full. Three permanently-recorded actions (last modifier; submitter + time; approver + time). Behaviour, no control, no toggle. The skip declaration is honest. Page-notes material at most.

**`AG/delete-email-reminders-8f693700.md` / `AG/edit-reminder-rules-8f2edae9.md` — CLEAN BILL and both ARE cited.** Read both in full (1,175 B / 1,145 B). Zero tables, zero pipe rows. `delete-email-reminders` step 3 is `Select Remove.` with **no confirmation dialog documented at all**, which is exactly the asymmetry the `remove-button` split proposal rests on — a real driver hazard, correctly reported.

---

## 2. FILES THE INVENTORY NEVER FOUND

I did not trust the reading list. I re-ran discovery with synonyms and stems, in both directories, weighted equally.

### 2a. Stem widening — `delegat` vs `delegate`
```
grep -rli "delegate" AG TG   -> 34
grep -rli "delegat"  AG TG   -> 38   (33 AG + 5 TG)
comm -13 <(...delegate...) <(...delegat...)
```
**Four files the inventory's search shape could not reach:**
`AG/permissions-8b36c11f.md`, `AG/permissions-8b387d5d.md`, `AG/permissions-8b63f76c.md`, `AG/step-2-assign-the-level-to-the-approver-d8bf669c.md`.
Opened all four. Every hit is the phrase *"task delegation"* inside the AI-written abstract paragraph. `grep -c "<table"` = 0 and `grep -cP '^\s*\|'` = 0 on all four. **CLEAN BILL — nothing was lost.**

### 2b. Stem widening — `remind` vs `reminder`
```
grep -rli "reminder" AG TG -> 31 (28 AG + 3 TG)
grep -rli "remind"   AG TG -> 36
```
**Five extra files:** `confirmation-types-b4a94761.md`, `cost-object-approval-8b3d1e0f.md`, `ownership-assignment-order-of-assignment-638460cb.md`, `special-considerations-for-delegate-configurations-8b2bfccb.md`, `use-invoice-for-field-preparation-of-capture-processing-fields-617e72f7.md`.
Grepped every `remind` occurrence in each. All five are the participle ("the user can be reminded", "Employees should be reminded", "reminds the Verifier"). **CLEAN BILL.**

### 2c. Other synonym sweeps, reported as zeros
- `comm -13 <(reminder-set) <(overdue-set)` → **empty**: no `overdue` file outside the reminder set.
- `grep -rn "Purchase Request Delegates"` → 3 files, all already in the pool.
- `grep -rn "Add Delegate Configuration -"` → **exactly one hit, and it is `- Invoice`** (`fcf42662.md:33`). No `- Purchase Request` variant exists. (Feeds §7.)
- `grep -rl "Invoice Processing Admin"` → 24 files. **None is a delegate file** (loop over all 38 `delegat` files returns nothing). The map's "UNATTESTED for Delegate Configurations" ruling is correct and I confirmed it independently.
- `grep -rlF "Invoice Configuration administrator (Restricted)"` → **exactly 9 files (5 AG + 4 TG)**, matching the crosscut lens exactly. None is a delegate file. **The "no documented role gate on Delegate Configurations" finding is HONEST, not lazy.** The only role vocabulary anywhere on the page is `The Configuration administrator can restrict the delegates based on the following choices:` (fcf42662.md:78) — an actor mention, not a visibility gate. Correctly not borrowed.

### 2d. A structural discovery route, tested and closed
I tried to enumerate each guide structurally rather than by keyword:
```
grep -h "^deliverable_loio:" AG/*.md | sort | uniq -c  ->  1209  5d4d01ab28704a4fbfa543f20b66966c
grep -h "^deliverable_loio:" TG/*.md | sort | uniq -c  ->   650  4b7ddd72185c41b997afef66de878da2
```
**`deliverable_loio` is a PER-DIRECTORY CONSTANT, exactly like `deliverable_id`.** The brief names only `deliverable_id`; this extends the known-constant list. There is no TOC and no per-guide grouping key in the front matter. **Keyword search is the only discovery mechanism in this corpus** — worth recording so no future run spends tokens on this route.

---

## 3. RAW `<table>` SWEEP

Run over the full 69-file pool, both directories:
```
for f in $POOL; do t=$(grep -c "<table" $f); r=$(grep -c "<tr" $f); ...
```
**Exactly two non-zeros, both 1/1, and both correctly excluded:**

| file | `<table` | `<tr` | class | verdict |
|---|---|---|---|---|
| `AG/create-a-conditional-rule-in-the-editor-86a92887.md` | 1 | 1 | **settings table** (2-field roster: Print Condition Rule Name, Editable By) | belongs to **Print Condition Rules**, a different object and list page. Surfaces only on the word-collision "print **reminder** rules". Correctly excluded from Email Reminders. |
| `AG/additional-approver-situations-fbb5034c.md` | 1 | 1 | **illustrative example** (6-row Row/Approver/Limit/Department/Division/Cost Center worked example, sample tenant data) | correctly skipped. |

**Nothing in the "settings table" category is missing from the graph for either page in this run.** The measured zero-raw-table baseline the brief predicted holds for both page sets; the two non-zeros only appear once the pool is widened past the seed sets, and the map already named both. **CLEAN BILL, verified independently rather than assumed.**

---

## 4. LONG CATALOG SWEEP

### 4a. Pipe-cell census over all 69 pool files, `>= 10` cell-openers

| openers | naive `^\| ` | file | class | disposition |
|---|---|---|---|---|
| 139 | 47 | `AG/general-information-8b3b0308.md` | Workflows guide revision history (~45 entries) | correctly classified HISTORY |
| 91 | 31 | `AG/email-reminders-8b2caa99.md` | 29 dated revision entries | HISTORY |
| 91 | 31 | `AG/delegate-configuration-8b2bd26d.md` | 29 dated revision entries | HISTORY |
| 85 | 0 | `AG/create-a-new-workflow-554e86aa.md` | Workflows roster | ALREADY MINED (35 citations) |
| 71 | 25 | `AG/the-condition-page-5d4ea870.md` | Audit Rules condition editor | ALREADY MINED |
| 59 | 21 | `TG/the-query-builder-and-the-condition-editor-e10473f9.md` | query builder | ruled out, correct |
| **49** | **0** | `AG/create-email-reminders-604c4a46.md` | **ROSTER, 15 rows** | **all 15 in graph** |
| 38 | 0 | `AG/add-groups-ec5d8d8b.md` | Group Configurations | ALREADY MINED |
| **37** | **0** | `AG/access-and-view-payment-delegate-configurations-8ed1298f.md` | **ROSTER, 11 rows** | all 11 collapsed as aliases, see §5b |
| 28 | 0 | `AG/work-with-the-steps-page-fab249d1.md` | Workflows Steps | ALREADY MINED |
| **22** | **0** | `AG/create-a-new-invoice-delegate-configuration-fcf42662.md` | **ROSTER, 6 rows + 7 nested** | all 13 in graph |
| **21** | **6** | `AG/email-message-replacement-tokens-c9cc4af4.md` | **4 tokens** | all 4 in graph, orphan re-homed |
| 13 | 0 | `AG/select-an-email-notification-in-the-workflows-tab-663bb8ac.md` | Workflows Email Notifications | ALREADY BUILT — correctly untouched |
| **13** | **0** | `AG/create-reminder-rules-b0a7fac5.md` | **ROSTER, 3 rows** | all 3 in graph |
| 10 | 4 | `TG/overview-502953fc.md` | 2-row Disabled/Enabled state matrix | **not in the map's catalogue table** — see §4c |
| 10 | 4 | `AG/restrict-use-of-delete-request-link-...-f201c8db.md` | 2-row Disabled/Enabled state matrix | **not in the map's catalogue table** — see §4c |

The naive `^| ` anchor returns **0** on all five real rosters. Confirmed independently.

### 4b. Bullet-run census (the shape a table census cannot see), `>= 6` bullets
```
for f in $POOL; do b=$(grep -cP '^\s*-   ' $f); [ "$b" -ge 6 ] && echo "$b $f"; done
```
288 `the-condition-page` · 224 `TG/the-query-builder` · 20 `additional-approver-situations` · 17 `create-a-new-workflow` · **14 `AG/approver-terminology-8559861c.md`** · 11 `general-information` · 11 `create-reminder-rules` · 10 `create-email-reminders` · 9 `fcf42662` · **6 `AG/terminology-e1e1ed99.md`**.

`approver-terminology-8559861c.md` (6,899 B) — read in full. Four approver-role definitions plus decision logic. It names four settings; I probed all four against the built graph:

| named setting | in graph? |
|---|---|
| `Authorized Approver feature is available for workflows` | ✅ `page.workflows` |
| `Steps Can Be Added By` | ✅ `page.workflows` (×2) |
| `Allow users to select their own approver for payment requests` | ✅ `page.workflows` |
| `Prompt for approver when a payment request is submitted` | ❌ not in graph — but the file places it "in the User Administration page or Profile", an unbuilt non-admin surface. **Correctly absent.** |

**CLEAN BILL on this file** — the run's only extraction from it (`the delegate must already have the Invoice Approver role.`) is the right one.

### 4c. The two files the map's catalogue table omitted — and what they lead to
`TG/overview-502953fc.md` and `AG/restrict-use-of-delete-request-link-...-f201c8db.md` were both *ruled out* in the map's prose (correctly, for Delegate Configurations) but neither appears in either catalogue-census table, so the count was never stated. I opened both. Each carries a **2-row Setting-State / Actions matrix** for the *Hide Payment Request Delete Link* feature, and each explicitly places the control on a built page:
> `On the Invoice Settings page, toggle (enable) Hide Payment Request Delete Link for Payment User checkbox.` (`grep -F -c` = 1)

That pointer is what surfaced **finding #2**, below.

---

## 5. TRUNCATION — every enumeration that DID reach the graph, counted against source

### 5a. Email Reminders — no truncation found

| enumeration | source count (my count, from the file) | in graph | verdict |
|---|---|---|---|
| Email Reminders tab roster | **15** rows (49 openers = 1 sep + 16×3, 2 cols) | 15 | ✅ |
| Rules tab roster | **3** rows (13 openers = 1 sep + 4×3) | 3 | ✅ |
| Replacement tokens | **4** (21 openers = 1 sep + 5×4, 3 cols) | 4 on `email-message` | ✅ |
| Replacement tokens on `email-subject` | **3** | 3 | ✅ and **correctly** 3, not 4 — grounded on `This variable is not supported in the Email Subject field.` This is precision, not truncation. |
| `Reminder Type` (Reminders tab) | 3 | 3 | ✅ |
| `Reminder Type` (Rules tab) | 3 | 3 | ✅ |
| `Frequency` | 5 | 5 | ✅ |
| Pre-defined rules | 2 | 2 | ✅ |
| List-of-Records sub-catalogue | 2 | 2 | ✅ |
| `Copy to Approver` / `Copy to Employee` | Yes + No, **both sides quoted** | ['Yes','No'] each | ✅ |
| `Active` | **only `Yes` is documented** | ['Yes'] | ✅ **correctly NOT completed.** This is the invented-Yes defect in mirror image and the run did not commit it. |
| `Editable By` / `rule_editable_by` | `Global Group` + tenant group tree | ['Global Group'] | ✅ deliberately partial, stated as such |
| Buttons | 8 | 8 | ✅ |
| **TOTAL** | **26** | **26** | ✅ |

### 5b. Delegate Configurations — no truncation, correct alias collapse

| enumeration | source | in graph | verdict |
|---|---|---|---|
| List-view roster | **11** rows (37 openers = 1 sep + 12×3) | collapsed into the editor's controls | ✅ every one of the 11 appears as a `dropped` record with an explicit "NOT A REFUTATION — intra-page alias duplication" rationale. 9 drops, all alias/duplicate. |
| Editor roster | **6** rows (22 openers = 1 sep + 7×3) | 6 | ✅ |
| `Restrictions` nested bullets | 2 | 2 | ✅ |
| `Delegate Settings For User Administrators and Employees` nested bullets | 5 | 5 | ✅ |
| `Inheritance` / `No Inheritance` | 2 captions | 2 | ✅ both printed verbatim; not a completed pair |
| Tabs | 2 (`Invoice`, `Purchase Request`), 4 independent attestations | 2, as one tab-strip field | ✅ (split reported, not taken — see §8c) |
| **Terminology catalogue** | **6** entries | **3 reach a merge-bound file** | ❌ **see finding #3** |
| **TOTAL** | **12 controls + 2 headings + tab strip + 5 buttons** | **20** | ✅ 12 unique controls confirms the 11–13 estimate, not the recon's ~25 |

### 5c. Grounding integrity — my own independent verifier
I recursively walked every `{sourceQuote, sourceFile}` pair in `roster-*.json`, `synth-*.json` and all six `extract-*.json` (including nested `readings[]` in contradictions) and tested each with a Python substring check against the corpus file:
```
sourceQuote pairs checked: 384   MISSES: 0
```
**384/384 verbatim. Zero misses.** Independent of the lenses' own claims.

### 5d. Cross-page dependency resolution
All **12** dependencies this run points at an already-built page resolve against a real `field.<page>.<name>` in `output/kg-invoice-config.json` (Group Configurations ×5, Workflows ×4, Authorized Approval Limits ×2, plus one more). **Zero MISSes.** Contrast with the pre-existing `dep.g1.059` — see §9.

---

## 6. COMPRESSED RANGES

```
grep -nP "between \d+ and \d+|\b\d{1,3}\s*[-–—]\s*\d{1,3}\b|Custom\s*\d|through \d+" $POOL
```

**Exactly ONE compressed range belongs to this run's two pages** and it is recorded:
- `AG/create-email-reminders-604c4a46.md:140` — `Enter a valid integer between 1 and 31. Use \> for the last day of the month.`
- Recorded as `range.wfb.001`, `count: 31`, expansion present, `appliesToFieldId: field.email-reminders.specific-days`, `resolved: true`. ✅
- **En-dash / hyphen:** the range is written in WORDS (`between 1 and 31`) and contains **no dash of any kind**, so there is no transcription hazard. The file's one en-dash (line 105, `Within Today minus 59 –`) is prose, not a range. Confirmed by `grep -nP "–"`. ✅

**One soft gap in the range record.** The same cell documents a **32nd, non-numeric accepted token**: `Use \> for the last day of the month.` with the worked example `10, 20, >`. It is deliberately excluded from `expandsTo` and from `validValues`, with the reasoning stated at length in notes. The reasoning is defensible (it is a sentinel, not a member of the integer range), **but a driver reads `validValues`, not notes** — it will never produce `>`. Recommend a one-value companion set or an explicit `acceptedTokens` entry. Low severity, fully documented either way.

**Adjacent observation (not this run's pages).** `AG/the-condition-page-5d4ea870.md` carries **8 distinct compressed-range shapes in 16 occurrences**:
`Custom 01 - 20` (×4), `Custom 01-20` (×2), `Org Unit 1-6` (×2), `Address 1 - 3` (×2), `Org Unit 1 - 6`, `Custom 01-25`, `Custom 01-24`, `Custom 01 – 21` (**en-dash**), `Custom 01 - 10`, `Attendee Entry Custom 1-5`. The built graph holds only two Custom ranges (`Custom 1–24`, `Custom 1–20`). ~6 range shapes are unrecorded on `page.audit-rules`, and the two that are recorded carry en-dash labels that do not match their hyphenated source strings. Out of scope for this merge; worth a ticket.

---

## 7. THIN PAGES — honest or lazy?

### 7a. Purchase Request tab of Delegate Configurations — **HONEST. Proven.**
Four independent attestations that the tab exists. Then:
- `grep -rn "Add Delegate Configuration -"` over both dirs → **one hit, `- Invoice`**.
- No file in the corpus contains a Purchase-Request-specific delegate field roster.
- `terminology-e1e1ed99.md` defines `Purchase Request Delegates` conceptually and nothing more.

**The tab is real and its contents are undocumented.** Thin is the correct answer and the run did not mirror the Invoice roster onto it. **Do not create a `Purchase Request (tab)` field with an empty roster behind it** — that is the zero-hit page node mistake in miniature.

### 7b. No role gate on Delegate Configurations — **HONEST. Proven.** (See §2c.) The `(Restricted)` vocabulary gates 9 surfaces corpus-wide, none of them this one, and it was not borrowed.

### 7c. Delegate Configurations page node — **NOT thin, but currently EMPTY of its own semantics.**
The page is `documentedBasis: moderate` / `coverage: partial`, which is right for fields. But the *page node* has no merge-bound carrier for the one paragraph that says what the page does. `AG/overview-8b2ba917.md` (uncited, undeclared) and `fcf42662.md` both state the cascading-permission model verbatim; the only surviving copy is prose inside `extract-delegate-configurations-procedure.json`. **This is finding #4.**

### 7d. `Conditions - Step 2` of the reminder-rule wizard — **the "thin" ruling is HALF right and half a defect. This is finding #1. See §8d.**

### 7e. Should any node NOT exist?
No. Both page nodes are richly attested (15+3 and 11+6 documented rows respectively, plus nav quotes, plus CRUD topics). Neither is a zero-hit page. The two child surfaces — the Email Reminder window / New Reminder Rule Step 1–2 wizard, and the Add/Modify Delegate Configuration window — are correctly ruled **modals, not pages**, on the three-test argument (no own menu destination, no own role gate, no own object model). I re-checked the negative: `Administration > Invoice > Delegate Configurations > New` terminates at the parent. Endorsed.

---

## 8. NEW EXPERIENCE / LEGACY, AND THE BOUNDARY

### 8a. UI-variant sweep — **CLEAN BILL, `undifferentiated` is correct for both pages**
```
ls AG TG | grep -Ei "new-experience|legacy|classic|current-ui|nextgen"
```
→ 8 files, none of them a reminder or delegate topic (`policies-the-purchase-order-policy-new-experience`, `purchase-order-matching-rules-new-experience`, `configure-custom-audit-rules-legacy-ui`, `using-the-invoice-manager-page-new-experience`, `using-the-unassigned-invoice-page-new-experience`, `end-user-experience-new-experience`, `comparison-classic-and-current-client-managed-capture-offerings`, `legacy-records-professional-only`).

Body sweep over the 69-file pool for `new experience|legacy|two user interfaces|current UI|NextGen`: **three hits, all inside revision-history tables**:
- `delegate-configuration-8b2bd26d.md:189` and `:295` — revision entries
- `email-reminders-8b2caa99.md:243` — revision entry

**Not one topic body in either page set carries the `two user interfaces` boilerplate** (which exists in 39 corpus files). There is no legacy/new-experience twin of either page, and no risk of the PO-Policy-stub defect repeating here. `uiVariant: undifferentiated` is a measured result, not a default.

### 8b. THE BOUNDARY, BOTH DIRECTIONS — answered with commands

I read the built graph with `python3`. `page.workflows` holds **114 fields**, of which **17** touch "notification", including the Email Notifications tab set: `approval-request-notification`, `status-change-notification`, `sent-back-notification`, `email-notification-name`, `email-notification-type`, `email-notification-display-as-from`, `email-notification-overwrite-all-languages`, `email-notification-source-edit-button`, `email-notification-use-primary-recipient-email`, `email-subject`, `email-body`, `expiration-email-to-approver`, `email-notifications-field`, `email-notif-find-workflow-emails-where`.

**(b) Did anything documented as a NOTIFICATION get emitted here? — NO. ZERO leaks.**
```
Counter of sourceFile across all 26 Email Reminders fields:
  create-email-reminders-604c4a46.md 17
  create-reminder-rules-b0a7fac5.md   5
  edit-email-reminders-2a2638ad.md    1
  copy-reminder-rules-9350776e.md     1
  delete-email-reminders-8f693700.md  1
  delete-reminder-rules-ab4f8d33.md   1
leaks from {add-an-email-notification, modify-an-email-notification,
            select-an-email-notification-in-the-workflows-tab,
            create-a-new-workflow, edit-workflow-properties,
            conditional-expressions-and-the-condition-page}: 0
```
All 26 come from six Email Reminders topics. **Clean.**

**(a) Did anything documented as a REMINDER get dropped because it looked like a notification? — NO, with one nuance worth recording.**
I took the 21 files that contain the literal string `Email Reminder` and asked the built graph which fields cite one:
```
BUILT-GRAPH fields sourced from an Email-Reminder-mentioning file: 11
  all 11 are page.workflows, all from work-with-the-steps-page-fab249d1.md
```
All 11 are Steps-page controls and belong to Workflows. The reminder word enters that file only at **line 118**, a *More Information* cross-reference. Reading the surrounding cell (lines 105–118): SAP documents `Email Employee when step is complete` as localizable and points at the **Email Reminders Setup Guide** for that localization. So the cross-reference is real and directional: **the localization behaviour of a Workflows step's email is documented in the Email Reminders guide.** That is a legitimate `page.workflows → Email Reminders` dependency the run does not emit. Very low severity, but it is the one genuine thread between the two surfaces and it is currently unrecorded in both directions.

Also: `droppedCount` for Email Reminders is **0**. Nothing was dropped at all, so nothing could have been dropped for looking like a notification.

**A NEW BOUNDARY FINDING — `Display as From` collides across the two surfaces with incompatible data types. This is finding #5.**
`grep -rlF "Display as From"` returns **exactly three files**: `create-email-reminders-604c4a46.md` (this run), `add-an-email-notification-c237a2de.md` and `modify-an-email-notification-a6e5f4ba.md` (built Workflows). Both quotes verify `grep -F -c` = 1:

| surface | quote | takes |
|---|---|---|
| **Email Reminders** (this run) | `Input the name you would like the recipient to see on the notification. The @ symbol is not permitted in this name.` | a **NAME**, and `@` is **forbidden** |
| **Workflows › Email Notifications** (built, `field.workflows.email-notification-display-as-from`) | `Type the email address you would like the recipient to see when they receive the notification.` | an **EMAIL ADDRESS** |

This is the *strongest positive proof in the corpus that the two surfaces are different objects* — and it is a live automation hazard: a driver that carries a `Display as From` value from one surface to the other writes an `@`-bearing address into a field that forbids `@`. Emit as a cross-page contradiction anchored on `field.email-reminders.display-as-from` with a second reading from the Workflows twin. Neither the 18 contradictions nor the 34 dependencies carries it.

### 8c. COUNT CALIBRATION — both pages land where the pre-flight recon predicted, not where the ~25 estimate did

**Email Reminders: 26 = 15 (Reminders tab) + 3 (Rules tab) + 8 buttons.** The pre-flight put it near "21 controls plus buttons"; 18 controls + 8 buttons is the same shape. **The buttons were NOT dropped** (`new`, `modify`, `copy-button-rule`, `remove`, `confirm-yes`, `save`, `next`, `finish`) and **the Rules-tab trio was NOT dropped** (`rule_name`, `rule_reminder_type`, `rule_editable_by`, correctly prefixed against the three guaranteed same-page label collisions). ✅

**Delegate Configurations: 20 = 12 unique controls + 2 section headings + 1 tab strip + 5 buttons.** The recon's ~25 collapses to 12 exactly as predicted, and every collapsed alias is preserved as a `dropped` record with a stated rationale rather than silently deleted. **I looked hard for a control counted twice and found none.** ✅

**Raw-table baseline confirmed:** `grep -c "<table"` and `grep -c "<tr"` both return **0** for every file in both page sets. The two non-zeros in the wider pool are named in §3. A zero raw-table census here is the expected answer, not evidence of a lazy sweep. And cell-openers are not rows — the run got this right everywhere (49→15, 37→11, 22→6, 21→4, 13→3).

**Three splits proposed and not taken** (`new-button`, `modify-button`, `remove-button` → per-object twins). I endorse all three, and **`remove-button` is the one that must actually be executed**: the two Remove controls have *different documented consequences* — reminder side `Select Remove.` with no dialog at all; rule side `Select the rule to delete, and then choose Remove.` followed by a confirmation **and** a cascade (`If a rule is deleted that is currently associated with an email reminder, it will deactivate the email reminder.`). A driver treating them as one control will hang waiting for an absent dialog, or silently deactivate a reminder. The split note's punctuation warning is correct and I re-verified it: the rule-side step reads `Choose New` with **no trailing period**.

### 8d. FINDING #1 — the Conditions Step 2 controls

`AG/create-reminder-rules-b0a7fac5.md` step 5 names three controls in imperative prose. All verified:
```
grep -F -c "Select the appropriate Data Object."                    -> 1
grep -F -c "Select the Field/Value from the helper pane."           -> 2
grep -F -c "Select the appropriate Operator from the helper pane."  -> 1
grep -F -c "Select the next appropriate Data Object."               -> 1
```
The run refused to emit them, with the stated rationale (roster + procedure + tables lenses all agree): *"names these as prose steps with no field table and no enumerated values… importing that page's operator/data-object catalogues here would be an unattested cross-page assumption."*

**The refusal conflates two separate questions and gets the second one wrong.**
- *Should the Audit Rules VALUE catalogues be imported?* **No** — and refusing that is correct and well argued.
- *Should the three CONTROLS, grounded imperatively in this page's own source file, be emitted?* **Yes**, and the built graph says so twice.

**Precedent, from the graph on disk:**
```
page.audit-rules : condition-data-object-left/right, condition-field-value-left/right,
                   condition-operator, data-object, field-value, operator, second-field-value …
page.workflows   : workflow-condition-data-object-b, -field-value-c, -operator-d,
                   -data-object-e, -field-value-f
                   (from conditional-expressions-and-the-condition-page-4d98af34.md — its OWN
                    topic, NOT imported from Audit Rules)
```
Workflows did exactly what Email Reminders should do: it emitted its own condition-editor controls from its own source, and **four of its five carry `validValues: []`**. The graph already accepts condition-editor controls with zero enumerated values as legitimate fields.

**And the run is internally inconsistent about it.** Every one of the 8 emitted buttons is grounded on a prose imperative from the same kind of numbered list — including `next-button`, whose quote is `Choose Next.` from **step 4 of this very file**, one step above `Select the appropriate Data Object.` in step 5. Prose imperatives were accepted as sufficient grounding for a button and refused for a named list control in the same numbered procedure.

**Consequence:** rule-before-reminder is the page's mandatory ordering (three independent statements). A driver following the graph reaches `Conditions - Step 2` and finds `next-button` and `finish-button` and nothing to interact with in between. **The graph cannot drive the first mandatory step of its own page.**

**Recommendation:** emit 3 fields (`rule_condition_data_object`, `rule_condition_field_value`, `rule_condition_operator`), `validValues: []`, `fieldType: dropdown`, each with its verbatim quote above, and notes stating explicitly that the operator/data-object catalogues are **NOT** enumerated for reminders anywhere in the corpus and must not be imported from `the-condition-page-5d4ea870.md`. Optionally 5, following the Workflows B/C/D/E/F pattern, since the file names a *second* Data Object and a *second* Field/Value. The **thin ruling on the catalogues stands and should be published as such**; only the controls change.

---

## 9. UNDETERMINED BY THE DOCUMENTATION — ranked

These are properties of the corpus, not a to-do list. Recording them accurately is the deliverable.

1. **`Reminder Type` — one control, two incompatible option lists AND an incompatible definition of the option they share.** Reminders tab: `Approval Request - Vendor Request` / shared option fires on `a cash advance request`. Rules tab: `Approval Request - Payment Vendor` / same shared option fires on `an invoice`. Both grounded, `contr.wfb.001`, emitted unreconciled. **There is no correct list to find.** The run correctly refused to let `pre-defined-rules-220a1fe7.md` (whose default-rule names echo the Rules-tab spelling) break the tie — that would be one-sided corroboration from a rule NAME, not a Reminder Type.
2. **"Cash advance request" in an Invoice product.** SAP's own text, almost certainly Expense boilerplate, and the corpus offers nothing to resolve it. Recorded verbatim; do not clean it.
3. **The Purchase Request tab is structurally attested four times and never enumerated once.** Structure described, contents absent. (§7a)
4. **The reminder-rule condition editor's catalogues.** After finding #1 the three controls are grounded; their option lists are not, anywhere, for reminders. Whether it is the same editor as Audit Rules' is never stated. Likely provisioning-dependent. **Stays thin.**
5. **The delegate scope taxonomy vs the tab count.** `terminology-e1e1ed99.md` enumerates **three** delegate kinds — `Invoice Delegates`, `Invoice Request Delegates`, `Purchase Request Delegates` — against a **two**-tab page. The corpus never maps the three onto the two. Unresolvable, and currently unrecorded (finding #3).
6. **`Active` has only one documented side.** `Select Yes to make this email reminder active.` No `No` anywhere. Left at `['Yes']`. Correct.
7. **`Editable By` beyond `Global Group`** is the tenant's own group tree — provisioning-dependent by construction, deliberately partial.
8. **Whether reminder scheduling ALWAYS needs a service request** (`contr.wfb.007`) — mandatory in one topic, conditional in another.
9. **Group-move consequences contradict** (`contr.wfb.010`): `8b2bfccb` says the system "will not remove or update existing delegate assignments"; `77a887a4` says out-of-group assignments and disallowed rights "are removed automatically". Both verbatim, both emitted.
10. **No role gate for Delegate Configurations exists in the corpus.** A documented absence, not an omission. (§2c)
11. **`Specific days` input semantics** — duplicates, ordering, and 29/30/31 in short months are never addressed.
12. **Five/six/eight names for the same child window on each page.** Emitted as label-drift contradictions rather than reconciled. Correct.
13. **`dep.g1.059` will still not resolve after this merge.** Its target is `{page: "Delegate Configurations", field: "Delegate Configuration"}` — label-shaped, and no field on the new page is or should be named that. It is the **only** pre-existing dependency in the whole graph pointing at either new page (verified: 1 of 454). The honest fix is repointing it at `applies-to-groups`, whose own cell repeats the one-per-group cardinality. The run reported this and did not contort naming to force it. Endorsed.

---

## FINDING #2 (out of scope for this merge, but it would change the graph)

**`page.invoice-settings` carries 13 of the 24 rows of `AG/available-invoice-settings-8b3411f0.md`.**

Discovery path: `TG/overview-502953fc.md` and `AG/restrict-use-of-delete-request-link-...-f201c8db.md` both surfaced in **this run's delegate pool** (10 cell-openers each) and both point at the Invoice Settings page.

Measured:
- `grep -cP '^\s*\|'` on `available-invoice-settings-8b3411f0.md` = **101**; exactly one separator line (`| --- | --- | --- |`), 3 columns ⇒ (101−1)/4 = **25 rows = 1 header + 24 data rows**. I extracted all 24 labels programmatically.
- Built fields on `page.invoice-settings` = **13**, of which 9 cite this file.
- Diffing the 24 source labels against the 13 built labels: **11 named settings are absent**, each with a documented `Default Status` value in the third column:

```
Hide Payment Request Delete Link for Payment User                              Disabled (cleared)
Hide Add and Delete Item Link for Payment Processor User                       Disabled (cleared)
Hide Add and Delete Item Link for Payment Approver User                        Disabled (cleared)
Allow processor users to approve requests that are pending other approvers     Enabled (selected)
Allow users to manage favorite allocations for payment and purchase request    Enabled (selected)
Limit Processors, Approvers, or Managers to use invoice owners vendor list     Disabled (cleared)
Assign invoice to Purchase Request Owner                                       Disabled (cleared)
Allow Purchase Request Owners to Transmit their own Purchase Orders            Disabled (cleared)
Allow Purchase Request Owners to Edit their own Purchase Orders                Disabled (cleared)
Enable Create and Approval for Invoice Vendor                                  Enabled (selected)
Allow system to associate Invoice lines to Purchase Order lines by data attrs  Disabled (cleared)
```
(A 12th, `Default recurring Invoice Generation Offset`, is present under different casing — not a real miss.)

Two of the eleven have a **dedicated topic each** with its own 2-row state matrix and an explicit placement quote (`On the Invoice Settings page, toggle (enable) Hide Payment Request Delete Link for Payment User checkbox.`, `grep -F -c` = 1). This is precisely the "24-row catalog captured at 13" shape the previous critic found, on a Group 1 page. **Do not fold it into this merge — it needs its own correction pass on `page.invoice-settings`.**

---

## FINDING #3 — the delegate terminology catalogue reaches the merge at 3 of 6

`AG/terminology-e1e1ed99.md` has **0** on both table anchors and was found only by reading; the map called it "this page's richest alias source". Six entries, each with a definition. Tested for survival into merge-bound files:

```
grep -l "<term>" roster-*.json synth-*.json
  Invoice Delegates          -> roster, contradictions, dependencies, steps   ✅
  Temporary Approval Delegation -> present (10 occurrences)                    ✅
  Delegate Restriction to Group -> present (10 occurrences)                    ✅
  Invoice Request Delegates  -> (nothing)                                      ❌
  Purchase Request Delegates -> (nothing)                                      ❌
  Delegated Approver         -> (nothing)                                      ❌
```
The three lost entries exist only as prose inside `extract-delegate-configurations-tables.json`'s notes, which is a lens working file, not a record source. All three quotes are grounded (`grep -F -c` = 1 each on the definitions). Two of the three are the delegate-scope taxonomy that bears directly on the two-tab structure and on the thin Purchase Request finding; the third (`Delegated Approver: An employee acting as a delegate for an Approver or AP User.`) is the concept that bridges to `delegate-self-approval-1b627285.md` and the built Workflows self-approval field.

**Recommendation:** carry all six as a page-level terminology/alias record on `page.delegate-configurations` — anchored on the PAGE, not on a field (the crosscut lens was right that no field legitimately owns it, and an empty `appliesToField` is the 17-unwired-sets defect). Never at 3 of 6.

---

## FINDING #4 — the page's defining semantics have no record carrier

`AG/overview-8b2ba917.md`, an undeclared uncited must-read, plus `fcf42662.md`, both state the cascading-permission model. `grep -l` over `roster-*.json synth-*.json` for `cascading|subset of invoice permissions|template that allows or denies` returns **nothing**. Available verbatim:
> `Concur Invoice delegate configurations define the subset of invoice permissions that delegates are allowed to have within Concur Invoice.`
> `The configuration is a template that allows or denies permissions to the user or the User Admin. The subset of permissions is identical. There is no option to provide separate permissions for specific employees or by their assigned roles.`

Also missing a record: the varying-columns consumer dependency (§1c), quote verified in **both** `invoice-user-f11cccd8.md` and `user-administrator-5aa3eb5e.md`.

**Recommendation:** page-node `notes` from the first two quotes, plus one dependency record `delegate_settings_… → User Administration / Invoice Delegates` grounded on the varying-columns sentence.

---

## SUMMARY OF CLEAN BILLS (each one a real finding)

- **384/384 sourceQuotes verbatim, my own verifier, zero misses.**
- **Zero notification→reminder leaks and zero reminder→notification leaks.** The Workflows boundary held in both directions, proved with commands.
- **12/12 cross-page dependency targets resolve** against the built graph.
- Raw-table census: **2 non-zeros in a 69-file pool, both correctly excluded**, both named.
- Stem widening (`delegat`, `remind`) yields **9 extra files, all boilerplate, zero controls lost**.
- No new-experience / legacy twin exists for either page — **`undifferentiated` is measured, not assumed**.
- `Active` left at `['Yes']`; `Inheritance`/`No Inheritance` both printed verbatim. **No pair was invented.**
- Alias collapse on Delegate Configurations is correct: 12 unique controls, every alias preserved as a `dropped` record with a stated rationale — not a silent deletion.
- Purchase Request tab thinness and the absent Delegate Configurations role gate are both **honest documentary absences**, proved by exhaustive search.
- `deliverable_loio` joins `deliverable_id` as a per-directory constant — the structural-enumeration route is closed for good.

# Adversarial Critic — COMPLETENESS — page `authorized-approval-limits`

Lens: **completeness (what is MISSING)**. Every claim below has a command behind it.
Corpus root: `/mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE`
Graph read: `/mnt/c/Users/manci/PROJECTS/concur-config-diver-support/output/kg-invoice-config.json`
(22 pages / 607 fields / 436 deps / 41 steps / 114 valueSets / 60 contradictions / 17 ranges — measured, not quoted from the digest.)

**Headline verdict: the build is honest, unusually well-reasoned, and NOT padded — but it is under-read.
37 of the 64 files the map inventoried (58%) were never opened by any extraction lens, and one of the
run's own load-bearing justifications is factually false against the built graph.**

---

## 0. Baseline measurements taken before criticising anything

```
ls admin-guides | wc -l                     -> 1209
ls tools-guides | wc -l                     ->  650
grep -rilF "Authorized Approval Limits" both dirs
    -> admin-guides/user-administration-8b167b96.md
       admin-guides/user-administrator-fcfd570c.md      (exactly 2, ZERO tools-guides)
grep -c "<table" on both primaries          -> 0 and 0
grep -o "<tr" | wc -l on both primaries     -> 0 and 0
grep -cP '^\s*\|' on both primaries         -> 0 and 0
```
The run's central structural claim — **both primaries are genuinely table-free** — is CONFIRMED
independently. `synth-ranges.json` = `{"compressedRanges": []}` is also confirmed correct (§6).

Roster emitted **9 fields**, `droppedCount: 0`, `repairedCount: 5`, `splitsProposed: []`.

---

## 1. MUST-READ FILES NEVER CITED

`mustReadNeverCited` is declared empty and `mustReadSkipsDeclared` carries 17 entries. I opened every
must-read file and graded it. The skip reasons are, with one exception, accurate and the measurements
inside them re-verify. Specifically I re-ran and confirm:

| must-read file | run's claim | my measurement | verdict |
|---|---|---|---|
| `user-administrator-fcfd570c.md` | table-free, prose-only | 0 tables / 0 `<tr>` / 0 pipes, 77 lines | **accurate** |
| `step-4-assign-the-proper-rights-to-users-86389a18.md` | table-free | 0/0/0 | accurate |
| `step-4-assign-the-proper-rights-to-users-82481079.md` | table-free, 3-item bullet | 0/0/0 | accurate |
| `configuration-8b3be88b.md` | table-free | 0/0/0 | accurate |
| `configuration-8b3cce3f.md` | 0 tables, 0 pipes | 0/0/0 | accurate |
| `edit-authorized-approver-information-8b3c119a.md` | 0/0 | 0/0/0 | accurate |
| `remove-authorized-approvers-8b3c5273.md` | 0/0 | 0/0/0 | accurate |
| `level-based-approvals-and-limit-based-approvals-b335cf33.md` | table-free | 0/0/0 | accurate |
| `assigning-the-approver-for-the-purchase-request-user-20294611.md` | nav only, 0/0 | 0/0/0 | accurate |
| `workflow-and-approval-routing-8b4ff6c9.md` | table-free scope sentence | 0/0/0 | accurate |
| `additional-approver-situations-fbb5034c.md` | 1 `<table>`, 7 `<tr>`, illustrative | **1 / 7 / 0 — exact** | accurate, correct skip |
| `global-group-vs-authorized-approver-hierarchy-8a960238.md` | 25 pipes, 4 data steps | 25 pipes, **4 data rows** confirmed | accurate, no truncation |
| `filter-authorized-approvers-by-workflow-approval-step-aae69350.md` | 1 `<table>`, `grep -c "<tr"`=1 LIES, `grep -o` = 3 | **1 / 3 / 21 — the trap reproduces exactly** | accurate |
| `employee-import-e28f2294.md` | 19 pipes, 2 fields (#15, #16) | 19 pipes, **2 data rows** confirmed | accurate, no truncation |
| `understand-the-process-3966259c.md` | 6th attestation, dropped to avoid padding | confirmed | accurate |
| `setting-an-unlimited-approval-amount-9d98b489.md` | one-act null recipe | 23 lines, single sentence | accurate |
| `step-2-assign-the-level-to-the-approver-d8bf669c.md` | record type 720 | confirmed | accurate |

**Clean bill on §1.** Nothing on the must-read list was skipped for a bad reason. This is genuinely
better than the last three rounds on this project. The problem is not the must-read list — it is
everything the map found that never made the must-read list (§2).

**One correction inside a skip note.** The skip note for `global-level-a53bf756.md` does not exist,
because that file never appears in `filesActuallyRead` at all — yet it is one of only **three** raw-`<table>`
files in the whole candidate set (§3). It is a *correct* skip (it is the Accounting-Administration
account-code table, pulled in by a "Global level" term collision) but the skip was never *declared*.

---

## 2. FILES THE INVENTORY NEVER FOUND — and, far worse, FILES IT FOUND AND NOBODY OPENED

### 2a. The inventory itself is good
I re-ran the searches independently, in **both** guide directories, with synonyms the mapper may not
have tried: `signing authority`, `limit approver`, `exception approver`, `approval authority`,
`cost object approval`, `Invoice User Administration`, `unlimited`, `Cost Object Approver`,
`Authorized Approver hierarchy`, `Expense and Invoice Settings`, `Approval Limit Currency`,
`Can approve exception`, `Manager Approval Limit`.

Tools-guides sweep is **complete**: `grep -rilF "User Administration" tools-guides` returns 14 files,
and **all 14 are in `filesActuallyRead`**. `signing authority`, `limit approver`, `exception approver`,
`cost object approval`, `approval authority`, `Invoice User Administration` all return **ZERO**
tools-guides hits. Hard-won rule #1 was obeyed. Clean bill.

Only two relevant files exist that the inventory never listed, and both are no-gain:
* `admin-guides/general-information-8b3b0308.md` — 467 lines, **139 pipe rows**, `grep -c '<table'`=0,
  **46 revision-history rows** (`grep -cE '^\| $'` = 46). It is the *Workflows General Information*
  guide revision history. Nothing for this page. **Should nonetheless be catalogued** so it is not
  re-discovered as a missed 46-row catalog on a later pass — the run catalogued the other two revision
  histories (8b3c26cc, 8b3d1e0f) precisely for that reason and missed the biggest one.
* `admin-guides/hierarchies-7f68a876.md` — 23 lines, 0 tables. Small but real (see §2b gain list).

### 2b. THE ACTUAL DEFECT: 37 of 64 inventoried files were never opened

```
inventory unique files                       -> 64
union of filesRead across all three lenses   -> 37
inventoried but never read by ANY lens       -> 37   (58%)
```

I opened all 37. Grading:

**NO GAIN — correct to skip, and I confirm it (19 files).**
`account-code-hierarchy-869f7eca`, `adding-a-new-account-code-hierarchy-level-d3074f8c`,
`ledger-and-account-code-hierarchy-levels-73c7c458`, `levels-of-account-codes-8e2fcbe1`,
`step-3-account-codes-procedures-eb2f2f80`, `global-level-a53bf756` (all Accounting Administration,
already built); `step-2-assign-the-tax-administrator-role-b903b7c8` (Tax Administration);
`limit-vendors-available-to-the-ap-user-role-dd8bbfe1`; `e-bunsho-timestamp-092c1c08`;
`view-validation-status-98f82b1e`; `import-limits-d1b4e727` (tools-guides, 3,000-record invoice
import cap — pure term collision on "limit"); `limitations-f5fac4b5` (Peppol, 16 pipes / 4 rows —
term collision); `create-a-new-invoice-delegate-configuration-fcf42662` and `user-administrator-5aa3eb5e`
(both **Delegates** — Workflows Run B, correctly deferred; 5aa3eb5e is a second file titled
"User Administrator" documenting the *Invoice Delegates / Purchase Request Delegates* links in the
same User Administration surface — a sibling, not this window);
`overview-5ce8a567`, `restrict-ad-hoc-steps-to-authorized-approvers-8a523257`,
`step-1-assign-the-level-to-the-workflow-step-6035f10a`,
`using-the-default-approver-hierarchy-for-authorized-approvers-e977da80` (all already-built Workflows
fields — e977da80 matched "Authorized Approver check box" only as a substring of
`Use default approver lookup to find authorized approver check boxes`, i.e. a false positive);
`set-a-default-shipping-and-billing-address-f772bed1` (sibling link in the same section; map-phase).

**NO GAIN but should have been CATALOGUED (2 files).**
`authorized-approvers-8b3c26cc` (`grep -cE '^\| $'` = **21** revision rows; the run said 20 — off by one)
and `cost-object-approval-8b3d1e0f` (**27** revision rows; the run said "roughly 27" — correct).
Both were catalogued without being opened, which is acceptable here because I verified both really are
revision histories: each has exactly one `| --- | --- |` separator at line 38 under a `Revision History`
heading.

**REAL GAIN — seven files with content this graph should carry (see §4 for the enumerations).**
`authorized-approvers-overview-8b3bd2d0`, `authorized-approvers-8b3ab7ad`, `approval-status-flags-4f534f16`,
`approver-terminology-8559861c`, `how-limit-based-cost-object-approvals-work-8b3d0a3b`,
`understand-the-hierarchy-b65d7089`, `employee-import-f6a516c8`.

**MARGINAL (9 files) — opened, nothing owed.**
`create-an-authorized-approver-step-4640b5a5` (67 lines; a Workflows *Steps* page procedure —
`Restrict approvers to those with limit authority` / `…exception authority` / `Authorized Approver Level`
are all already built on page.workflows), `how-the-system-determines-which-approver-an-employee-uses-1c83d905`,
`step-1-define-the-invoice-authorized-approver-hierarchy-fed7c7fe` (21-line content-free stub),
`step-1-define-the-cost-object-approver-hierarchy-6e7b7dc6` (permission note already carried on
`dep.gworkflows.047`), `step-2-activate-the-authorized-approver-feature-c87493ee` (21-line stub),
`configure-the-level-filter-8b3bfd21` (pure pointer to aae69350),
`required-roles-for-setup-ef627f4b` (Invoice Pay roles), `how-level-based-cost-object-approvals-work-8b3cf6b4`
(see §9 — promises a table that is not in the file), `employee-import-6954b441` (defers to the external
Shared spec).

---

## 3. RAW `<table>` SWEEP — measured, and it comes back CLEAN

Built the relevant set by content, not by the inventory:
```
grep -rilE "authorized approver|approval limit|cost object approv|approval authority" both dirs -> 86 files
```
Then `grep -c "<table"` on all 86. **Exactly three hits, corpus-wide:**

| file | `<table>` | `grep -o "<tr" \| wc -l` | pipes | disposition |
|---|---|---|---|---|
| `admin-guides/additional-approver-situations-fbb5034c.md` | 1 | **7** | 0 | **illustrative** — 6 example approvers A–F with example limits against example cost objects. Correctly skipped, skip declared. |
| `admin-guides/filter-authorized-approvers-by-workflow-approval-step-aae69350.md` | 1 | **3** (`grep -c "<tr"` returns 1 and lies — trap reproduced) | 21 | **illustrative** — workflow-step/level example. Correctly skipped. |
| `admin-guides/invoice-settings-cace748d.md` | 1 | 3 | 10 | belongs to the **already-built Invoice Settings / Workflows** surface, not this page. |

**Nothing in the "settings table" category is missing.** The run's `rawTableFilesInInventory`
(2 entries) is complete for this page. This is a clean bill with a command behind it.

Note the one undeclared skip: `global-level-a53bf756.md` also carries `1 <table> / 4 <tr> / 44 pipes`
but is Accounting-Administration account-code example data (Tables 1–3, `(code)` placeholders and
tenant-shaped codes like `6100-01`). Correct to skip; the skip was never written down.

---

## 4. LONG CATALOG SWEEP — enumerations of 10+ that never reached the graph

`grep -cP '^\s*\|'` across all 86 relevant files, filtered to `>= 10` pipes and 0 raw tables, returns
26 files. All 26 resolve to: already-built Workflows content (`create-a-new-workflow-554e86aa` 85,
`work-with-the-steps-page-fab249d1` 28, `work-with-the-step-rules-page-4c33cda0` 29,
`conditional-expressions-and-the-condition-page-4d98af34` 38, `workflow-creation-process-1d37b85f` 19,
four `workflow-guides-*` at 16 each), Delegates/Run B (`delegate-configuration-8b2bd26d` 91,
`access-and-view-payment-delegate-configurations-8ed1298f` 37, `create-a-new-invoice-delegate-configuration-fcf42662` 22),
revision histories (139 / 85 / 64), runtime **example** tables (`examples-f8248518` 90 — an
"Authorized Approver Table" of example approvers/limits; `approver-action-approved-4e3e0532` 30;
`approver-action-approved-73c69e93` 30; `approver-action-approved-using-cost-object-direct-approval-07bd5cc2` 28),
and the four already-catalogued page-relevant tables. **No settings catalog is missing.**

### But five *prose* enumerations of real value were never extracted

None is 10+ rows; all are short, complete, documented lists that bear directly on this page's controls,
and all five sit in files the extraction lenses never opened. **Every quote below is `grep -F -c` = 1
against the named file.**

**(a) `admin-guides/authorized-approvers-overview-8b3bd2d0.md` — the canonical two-member permission
enumeration.** This is the guide's own definition of what an authorized approver record holds, and it
is the missing frame for why branch B pairs `can_approve_exception` against `currency + Amount`:
* `"Limit approval: If the company wants to use limit approval, the administrator assigns each authorized approver an amount limit."`
* `"Exception approval: If the company wants to use exception approval, the administrator defines a minimum and maximum exception level."`
* `"An authorized approver can have limit approval, exception approval, or both."`
The second bullet is a **third, independent attestation** of the exception-range scope fence
(dep #9 cites 8b3be88b, dep #10 cites fcfd570c) — and it is the only one that says the *administrator
defines* the min/max, tying it to the built `field.workflows.minimum-exception-level` /
`field.workflows.maximum-exception-level` by action, not just by location. The "or both" rule is the
formal counterpart of fcfd570c's `"If an approver has both types of approval authority, the administrator defines both."` (`grep -F -c` = 1), which the run also never emitted as a dependency.

**(b) `admin-guides/authorized-approvers-8b3ab7ad.md` — a THREE-member list that contradicts (a).**
`"Authorized approvers will have limit, level, and/or exception approval and are affected by the authorized approver hierarchy."`
8b3bd2d0 enumerates **two** kinds (limit, exception). 8b3ab7ad enumerates **three** (limit, level,
exception). Both are admin-guides topics in the authorized-approver family. **This is direct third-party
evidence on the run's own CONTESTED `cost_object_approval_level`** — the corpus cannot agree with
itself on whether "level" is a kind of authorized-approver authority at all. The run recorded the Level
contradiction with two readings (8b167b96 "select a level" vs aae69350 "Levels cannot be added to
approvers via User Administration"); readings three and four exist and were never found.

**(c) `admin-guides/approval-status-flags-4f534f16.md` — a two-member flag enumeration.**
`"Limit Approved flag for limit approvals"` / `"Exception Approved flag for exception approvals"`.
Both of this page's zero-value notes (`approval_limit_amount`, `manager_approval_limit`) turn on the
sentence `"since the Limit Approved status is not changed"` and on `"create workflow rules based on the Limit Approved flag"` — the run quotes the *consequence* while the file that *defines* the flags,
including their reset-to-No behaviour and the fact that the flag "is merely an indicator; it does not
affect the workflow", was never opened.

**(d) `admin-guides/how-limit-based-cost-object-approvals-work-8b3d0a3b.md` — the amount definition for
the COST OBJECT path.**
`"The cost object approval limit logic uses the net amount of the line, not the gross amount."`
`"Tax and shipping amounts are not included in the limit calculation."`
The run captured `definition-of-amount-for-limit-approval-06806875.md` (the *authorized approver* limit
definition: requested/approved invoice total). It never captured the **different** definition that
governs the same numeric value on the branch-B / cost-object path: **line net amount, tax and shipping
excluded**. Two documented definitions of "the amount this field is compared against", on two paths,
for the same control — that is exactly the kind of provisioning-dependent divergence this graph exists
to record, and half of it is absent.

**(e) `admin-guides/approver-terminology-8559861c.md` — the delegate-inheritance rule.**
`"then the delegate inherits all the capabilities of that authorized approver, including that authorized approver's limits, currencies, and exception authority"`
Note the **plural** "limits, currencies" — corroborating dep #15's cardinality constraint from the
other direction. Also names the backing table `CT_AUTHORIZED_APPROVER`, which is the cleanest
corpus-stated evidence for the three-setter / one-record verdict the whole run rests on.

**(f) minor, `admin-guides/employee-import-f6a516c8.md`** — `"the default PR, Authorized, and COA approvers within the associated field record sets (360, 720, etc.)"`. This is the only place in the
corpus that names record set **720** as *Authorized* alongside **710** as COA in one sentence; the run
built the 710-vs-720 distinction (the heart of its Level hypothesis) from two separate files.

---

## 5. TRUNCATION — every enumeration that DID reach the graph, recounted

| enumeration | in graph | in source (my count) | verdict |
|---|---|---|---|
| 8a960238 configuration-step matrix | 4 data steps | **4** data rows (`# / Step / Global group only / Authorized Approver hierarchy`), 25 pipe lines | **no truncation** |
| e28f2294 record set 710 field table | 2 fields (#15, #16) | **2** data rows, 19 pipe lines | **no truncation** |
| a9522ec8 New Authorized Approver table | 4 controls (all Workflows-owned) | **4** data rows, 16 pipe lines | **no truncation**, correct boundary |
| fbb5034c example approvers | skipped (illustrative) | 6 data rows + header = 7 `<tr>` | correct skip, count exact |
| aae69350 raw table | skipped (illustrative) | 3 `<tr>` | correct skip, count exact |
| 8b3c26cc revision history | catalogued at 20 | **21** rows | off by one, harmless |
| 8b3d1e0f revision history | catalogued at ~27 | **27** rows | exact |
| 8b3b0308 revision history | **not catalogued at all** | **46** rows | see §2a |

**Zero truncation defects.** Rule #2 was respected.

---

## 6. COMPRESSED RANGES — measured ZERO, and the zero is correct

```
for each of the 86 relevant files:
  grep -HnoE "Custom ?[0-9]+ ?[-–—] ?[0-9]+|[0-9]+ ?[–—] ?[0-9]+|Level [0-9] ?[-–] ?[0-9]"
  -> NO MATCHES ANYWHERE
```
`synth-ranges.json` = `{"compressedRanges": []}` is **correct and now measured**. There is no
`Custom 01 - 20`-style compression anywhere on this surface, en-dash or hyphen.

**One adjacent finding worth a note, not a range node.** The only place in the corpus that indicates
how many levels an authorized approver hierarchy can carry is an *example* table header in
`understand-the-hierarchy-b65d7089.md` (line 115 `Level 6`, line 119 `Level 7`), running
`Level 1 = Country | Level 2 = Company | Level 3 = Division | Level 4 = Cost Center | Level 5 | Level 6 | Level 7`.
This must **NOT** become `validValues` on `hierarchy_level_selector` — the names are tenant example
data and the header is illustrative. But "the corpus never states the level cardinality; the only
signal is an example that runs to Level 7" is a legitimate §9 entry and it is currently absent.

Related, and separately absent: en-dash vs hyphen matters in this file set. `understand-the-process-3966259c.md`
states the three-setter triple **twice with two different dash characters** (the run caught this and
recorded it — good). The zero-value Notes in `fcfd570c` use an **en dash** in
`"the next authorized approver or processor – depending on how the workflow is designed"` — anyone
re-quoting that with a hyphen will fail the validator.

---

## 7. THIN PAGES — is the thinness honest?

**Honest, and the page node is justified.** Two admin-guides topics are *dedicated* to this window
(`fcfd570c` §"Authorized Approver Feature Hierarchy", `8b167b96` in full), both name it by its literal
UI label, and both give a numbered procedure. `documentedBasis: "moderate"` / `coverage: "partial"` is
the right grade. This is nothing like the zero-hit page node the last run had to delete.

The genuinely thin parts are thin in the corpus, not in the build:
* **No currency list exists.** `grep -rn` for an enumerated currency catalogue across both dirs returns
  nothing; the only domain statement anywhere is `employee-import-e28f2294.md`'s
  `"Can be either three-digit or three-letter currency code; must be a valid currency in the list of system (reimbursement) currencies"` (note: the source line ends with **no period** — the run's repair
  of that was correct and I re-verified it).
* **No on-screen caption for the branch-B currency control or the left-pane selector.** Both primaries
  describe the *action* only. The parenthesised descriptive labels are the right call and match the
  built graph's own convention (`field.image-handling.imagingconfigrowselect`, `field.audit-rules.*-link`).
* **`validValues` empty on both numeric controls is CONSISTENT with the graph.** I checked: **all 21
  `number` fields in the built graph carry `validValues: []`**, and **no `configValueSet` anywhere in
  the graph uses a sentinel like `0`/`null`/`blank`.** Putting the 0-and-null semantics in `notes` is
  therefore the only slot the schema offers, and the run used it correctly on both branches. Not a defect.

---

## 8. NEW EXPERIENCE / LEGACY — the expected ZERO holds, measured

```
filenames with variant markers, both dirs  -> 8, exactly as predicted:
  comparison-classic-and-current-client-managed-capture-offerings-2fe966db.md
  configure-custom-audit-rules-legacy-ui-6cb4534e.md
  end-user-experience-new-experience-85c2652b.md
  legacy-records-professional-only-8b425e3b.md
  policies-the-purchase-order-policy-new-experience-5a1ba7ef.md
  purchase-order-matching-rules-new-experience-6c8fb80f.md
  using-the-invoice-manager-page-new-experience-f83ba5fa.md
  using-the-unassigned-invoice-page-new-experience-072e2f18.md
NONE touches this surface.

grep -c "Fiori" on both primaries          -> 0 and 0
grep -rlF "SAP Fiori UI themes are implemented" both dirs -> 57 files (generic guide boilerplate)
  ...of the 64 inventoried candidates, exactly ONE carries it:
     admin-guides/authorized-approvers-overview-8b3bd2d0.md
```
`uiVariant: "undifferentiated"` is **correct**. 8b3bd2d0's Fiori sentence is the boilerplate that
appears on 57 files corpus-wide; it is a home-page-navigation hedge, not a variant of this window, and
it must not be promoted. **Do not create a fourth "both" claim.**

The `40145f24` hedge (`"the Authorized Approvers link from workflows in the classic interface"`) is
confirmed to be the **Workflows** surface: I read the file in full; every "More Information" pointer in
it goes to *Concur Invoice: Workflows – General Information Setup Guide* / *Shared: User Administration
User Guide*, never to this window. Correctly recorded and correctly not acted on.

## 8b. THE COUNT ITSELF

Recon predicted **8** (7 if the hierarchy selector is navigation). The run emitted **9**. The delta is
exactly `authorized_approval_limits_link` — the trigger link — which recon did not count.

**That is not over-emission.** The built graph carries **149 `button`/`link`-typed fields across 22
pages**, including pure navigation triggers (`field.policies.modify`, `field.group-configurations.new`,
`field.capture-processing-admin.manage-email-alias-action`, `field.feature-hierarchies.modify-hierarchy-button`).
Emitting the link is the graph's own convention and a driver must click it. **Keep it.** Branch A is
present and complete (all three controls), so the feared "whole branch-A rendering lost" did not happen.

**The count is nonetheless wrong in the other direction: it should be 10.** See finding §8b-i below.

### §8b-i — BRANCH A's `Save` IS DOCUMENTED AND IS MISSING
```
grep -F -c "The administrator makes the appropriate choices and clicks Save." \
  admin-guides/user-administrator-fcfd570c.md   -> 1
```
The run considered this and wrote, in the procedure lens' notes, that it emitted no Save because
"neither primary documents Save/Cancel/Done **for the window itself**", calling it "an honest coverage
gap". That reasoning silently flattens the branch distinction the rest of the run defends everywhere
else. Branch A is **not** the window — branch A is the inline User Administration rendering, and for
branch A the corpus documents the commit action verbatim, in the *same sentence* the run already used
as the reveal-dependency for `manager_approval_limit` and `approval_limit_currency_branch_a`.

Precedent is overwhelming: **21 of 22 built pages carry a Save or Done button field**
(`field.group-configurations.save`, `field.exceptions.savebutton`, `field.image-handling.imagingconfigsave`,
`field.audit-rules.save-exception`, `field.tax-administration.buttonsave`, `field.feature-hierarchies.save-button`
"Click Save.", `field.workflows.btn-save-step`, …). Without this node a driver on branch A fills two
fields and never persists them.

The honest shape is: **branch A has a documented Save; branch B has NO documented commit action at
all** — 8b167b96's procedure ends at step 3 and fcfd570c's branch-B bullet list ends at
`"If an approver has both types of approval authority, the administrator defines both."` That asymmetry
is a §9 entry, not a reason to withhold the attested half.

### §8b-ii — THE HIERARCHY-SELECTOR ASYMMETRY, stated as required
Confirmed by inspection of all 114 `field.workflows.*` records: **the built Workflows page carries no
left-side group/level selector**, even though `authorized-approver-list-a9522ec8.md` steps 4–5 describe
one there (`"On the left side of the page, select the  icon to expand the desired group."` /
`"Select the group that is associated this authorized approver."`, and the Note
`"The groups that appear here are from the Authorized Approver Hierarchy."`). This run **does** emit
`hierarchy_level_selector`. The inconsistency is real and is now stated. My recommendation: keep this
page's selector (it is an explicit numbered step in **both** primaries and doubly attested) and log the
Workflows omission for Run B rather than deleting a well-grounded control to match a gap.

---

## 9. UNDETERMINED BY THE DOCUMENTATION — ranked

The run's six contradictions are all real, all correctly left unresolved, and all re-verified. Ranked
with my additions marked **[NEW]**:

1. **Does a `Level` control exist in this window at all?** `8b167b96`: `"For level-based cost object approval, select a level."` vs `aae69350`: `"Levels cannot be added to approvers via User Administration."`
   **[NEW]** and now four-way: `8b3bd2d0` enumerates only **two** authority kinds (limit, exception);
   `8b3ab7ad` enumerates **three** (limit, level, exception). The corpus does not agree with itself
   about whether "level" is an authorized-approver authority. Provisioning-dependent (Cost Object
   Approver thread vs Authorized Approver thread) is the most plausible explanation and remains a
   hypothesis, not a resolution.
2. **Which feature gates the link** — Authorized Approver (fcfd570c) or Cost Object Approver (8b167b96).
   8b167b96 internally requires **both**; fcfd570c names only one. Unresolvable from the corpus.
3. **[NEW] What "amount" the limit is compared against.** `06806875` (authorized-approver path):
   requested/approved **invoice** amount. `8b3d0a3b` (cost-object path): **line net** amount, tax and
   shipping excluded, and a 0.00-net line does not trigger limit approval at all. Same control, two
   documented semantics, path-dependent. This belongs in the graph and is currently absent.
4. **One act or two for an unlimited amount.** 8b167b96 + 9d98b489 say clear the amount; a9522ec8
   (Workflows) says clear currency *and* amount. Correctly not imported onto this window.
5. **[NEW] Branch B has no documented commit action.** Branch A saves; the window never does. A driver
   must discover the button at runtime.
6. **Section-label drift, three ways** — `Expense and Invoices Setting` (fcfd570c ×2, singular),
   `Expense and Invoices Settings` (8b167b96 ×2, plural), `Expense and Invoice Settings`
   (8b167b96 line 21 + 5e3daf7c + 20294611 + f772bed1 + two tools-guides files). Correctly recorded.
7. **Click-path depth**, four to nine renderings, `Company Admin` vs `Company Administration`.
   Correctly recorded by the map phase (9 navPathEvidence rows).
8. **[NEW] Menu-node drift for the hierarchy prerequisite.** `understand-the-hierarchy-b65d7089.md`
   writes `(Invoice > Feature Hierarchies)`; `hierarchies-7f68a876.md` writes
   `Administration  Invoice  Hierarchies` (glyphs stripped, and the node named **Hierarchies**, not
   *Feature* Hierarchies). The built `page.feature-hierarchies` navPath is
   `['Administration','Invoice','Feature Hierarchies', …]`. A third alias, unrecorded.
9. **Workflows tab name**, `Authorized Approvers tab` vs `Authorized Approver tab`. Correctly recorded.
10. **[NEW] Level cardinality is never stated** — only an example running to Level 7 (§6).
11. **[NEW] A promised table is missing from the crawl.** `how-level-based-cost-object-approvals-work-8b3cf6b4.md`
    says `"The table below lists the expenses on an invoice."` and then contains **zero** tables and
    **zero** pipe rows (`grep -c '<table'`=0, `grep -cP '^\s*\|'`=0). Structure described, never
    enumerated — a corpus property, worth recording so nobody hunts for it twice.
12. **The currency domain is never enumerated** — only "3 characters", "three-digit or three-letter",
    "must be a valid currency in the list of system (reimbursement) currencies". No value set can
    honestly be built. Correctly left at `validValues: []`.

---

## THE ONE FACTUAL ERROR — read this before merging

`synth-valuesets.json → orphanCandidates[0]` refuses to wire the two-member `Level` / `Limit`
enumeration from `level-based-approvals-and-limit-based-approvals-b335cf33.md` on this stated ground:

> "The Workflows page is already built with 114 fields but carries **no such type field** in this graph,
> so there is currently **nothing legal to wire to**."

**That is false.** The field exists and is already populated:

```
field.workflows.cost-object-hierarchy-type
  page:         page.workflows
  label:        "Cost Object Hierarchy Type"
  fieldType:    dropdown
  validValues:  ["Level", "Limit"]
  sourceQuote:  "In the Cost Object Hierarchy Type field, select the desired type: Level or Limit."
  sourceFile:   admin-guides/step-2-activate-the-feature-27a421e2.md
```

Its own `notes` even cite `level-based-approvals-and-limit-based-approvals-b335cf33.md`,
`how-level-based-cost-object-approvals-work-8b3cf6b4.md` and
`how-limit-based-cost-object-approvals-work-8b3d0a3b.md` for the value semantics — the exact files this
run treated as orphan-only. The graph carries **one** dependency touching it (`dep.gworkflows.047`,
`field.feature-hierarchies.feature-name precedes field.workflows.cost-object-hierarchy-type`) and **zero**
value sets.

**Consequence.** The precedence rule that the run itself calls "the single most valuable sentence on
this page for a config writer" —
`"The cost object configuration defines the type—either limit or level. If you complete both areas in this window—the Approval Limit area and the Level field—Concur Invoice will use the one that applies to your configuration and ignore the other."`
— is emitted as two *page-internal* `depends_on` edges (deps #7 and #8) with the deciding setting left
as unresolved prose. It should terminate at `field.workflows.cost-object-hierarchy-type`. As built, a
driver standing on `cost_object_approval_level` or `approval_limit_amount` is told its value may be
silently ignored, and is given **no path to the control that decides** — even though the graph already
knows exactly where that control lives and what its two values are.

This is not a padding risk and it invents nothing: both endpoints already exist, and the value set is
already recorded on the target. Fix by re-pointing deps #7 and #8, and drop `orphanCandidates[0]`
(its `whyNoOwner` and `whatWouldFixIt` are both wrong).

---

## SUMMARY OF WHAT WOULD CHANGE THE GRAPH

1. Re-point the precedence dependency at `field.workflows.cost-object-hierarchy-type`; retract
   `orphanCandidates[0]`. *(false premise, verified)*
2. Emit branch A's `Save` button (10th control). *(quote verified at 1; 21/22 pages have one)*
3. Add the cost-object amount definition from `8b3d0a3b` (net line amount, tax/shipping excluded,
   0.00-net does not trigger) as a second, path-dependent reading against
   `definition-of-amount-for-limit-approval-06806875.md`. *(both quotes verified at 1)*
4. Add readings 3 and 4 to the contested-`Level` contradiction from `8b3bd2d0` (two kinds) and
   `8b3ab7ad` (three kinds). *(both verified at 1)*
5. Add the ordering prerequisite `"You must define the authorized approver hierarchy (Invoice > Feature Hierarchies) and import/create its associated source list before the authorized approver feature can be activated."`
   as a `precedes` edge into `page.feature-hierarchies`. *(verified at 1; corroborated by 8a960238 row 1,
   X-marked under the Authorized Approver hierarchy column only)*
6. Add 8b3bd2d0's `"Exception approval: …the administrator defines a minimum and maximum exception level."`
   as a third attestation on the exception-range scope fence, and fcfd570c's
   `"If an approver has both types of approval authority, the administrator defines both."` as the
   both-branches rule. *(both verified at 1)*
7. Add the `Limit Approved` / `Exception Approved` flag pair from `4f534f16` behind the zero-value
   semantics both amount controls already carry. *(both verified at 1)*
8. Add the delegate-inheritance consumption rule from `8559861c` (`limits, currencies, and exception authority`, `CT_AUTHORIZED_APPROVER`). *(verified at 1)*
9. Catalogue `general-information-8b3b0308.md` (46-row revision history) so it is not re-discovered;
   correct `8b3c26cc` from 20 to 21 rows.
10. Record the §9 **[NEW]** undetermined entries: no branch-B commit action; `Hierarchies` vs
    `Feature Hierarchies` menu alias; level cardinality never stated (example runs to Level 7);
    `8b3cf6b4`'s promised-but-absent table.
11. State the hierarchy-selector asymmetry against the built Workflows page in the page notes (§8b-ii).

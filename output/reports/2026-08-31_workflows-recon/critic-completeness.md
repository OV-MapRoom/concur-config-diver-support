# ADVERSARIAL CRITIC — COMPLETENESS (what is MISSING)
**Workflows / Approval group, SAP Concur Invoice Professional Edition, corpus 2026_08 (crawled 2026-08-29).**
Lens: completeness. Every count below is from a command I ran; every quote below returns >= 1 from
`grep -F -c` against the cited file. Where I INFER rather than MEASURE I say so and give the check
that would settle it.

ROOT = `/mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE`
`<admin>` = `concur-invoice-professional-edition-admin-guides` (1209 files)
`<tools>` = `concur-invoice-professional-edition-tools-guides` (650 files)

---

## HEADLINE

The roster's **page count is right** and its **hardest calls are right**. I could not break the
one-page verdict, I could not find an eighth tab, I reproduced the Finding (1) clincher exactly, and
all 16 sourceQuotes I spot-checked are verbatim. **The failures are all failures of REACH, not of
judgement**, and there are seven of them. The most serious is that the roster wrote off a
**documented admin surface with its own click path, its own role gate and seven named fields** —
the **Authorized Approval Limits window** — on the false grounds that the corpus defers it to an
external Shared guide. It does not. Two admin-guides files document it directly, and a third file
states in one sentence that there are **three** places authorized approvers are defined, of which
the roster models only one.

Second most serious: a **Group Configurations overview is sitting in the Feature Hierarchies seed
list** as its third-largest file, on the thinnest page in the group. That is a live risk of
re-homing already-built Group 1 fields, which the brief forbids outright.

---

## 1. MY OWN SWEEP — STARTED FROM THE CORPUS, NOT THE ROSTER

### 1.1 Synonym sweep (both guide dirs, file counts, `grep -rli`)

```
authorization 93   authorisation 0   sign-off 0   signoff 1   endorse 1   review 188  reviewer 2
chain 10   ladder 0   tier 2   band 1   limit 239   threshold 13   escalation 6   reminder 31
nudge 0   overdue 3   SLA 0(word-bounded)   timeout 7   expire 9   lapse 8   substitute 2
out-of-office 0   backup approver 0   alternate 3   reassign 28   forward 17   skip 24   bypass 8
auto-approve 0   straight-through 4   exception handler 0   send back 25   recall 11
unsubmit 29   withdraw 2
```

Note the calibration trap: a naive `aging` census returns **145** and is almost entirely
`Managing`/`packaging`. `SLA` returns 10 unbounded and **0** with `-w`. Neither is a signal.

**What the synonyms turned up that the six sweeps did not:**

| hit | file | why it matters |
|---|---|---|
| `timeout` | `<admin>/create-a-new-workflow-15992497.md`, `create-a-new-workflow-554e86aa.md` | **kills the roster's "orphan timeout fields" deferral** — see §3.3 |
| `limit` | `<admin>/user-administrator-fcfd570c.md` (4,603 B), `user-administration-8b167b96.md` (2,314 B) | **an undocumented-in-roster admin surface** — see §3.1 |
| `escalation` | `<admin>/permissions-8b3dcfce.md`, `permissions-8b387d5d.md`, `permissions-8b40a9ac.md`, `permissions-8b63f76c.md`, `examples-f8248518.md` | four duplicate-titled `permissions-*.md` files, none opened by any sweep |
| `threshold` | `<admin>/setting-the-automatic-submission-conditions-for-submit-action-88fe4a03.md` (2,564 B) | unseeded, unclassified anywhere |
| `reminder` | `<admin>/pre-defined-rules-220a1fe7.md`, `overview-8b2c769e.md` | **two unseeded Email Reminders value-set files** — see §3.5 |

### 1.2 Nav-idiom censuses — I reproduced the roster's and then went past them

`grep -rhoP "[A-Z][A-Za-z &/-]{2,40}\(left menu\)"` over both dirs → **30 distinct labels**, matching
the roster. **Calibration check the roster did not run:** `grep -rho "(left menu)"` returns **60**
occurrences and the 30 labels account for exactly **60** — so nothing is hidden behind a label the
regex could not shape-match. The census is complete. **Confirmed, not just repeated.**

Complementary census, `Invoice Processing Admin (menu|navigation menu|list)…` → 11 destinations,
including `Email Reminders` (1). Matches the roster. **Confirmed.**

Third census the roster did not run — `Administration > Invoice > X` with ASCII `>` — turned up one
label found nowhere else in any artefact:

> `Administration > Invoice > Image Handling as the Invoice Configuration Administrator, or, for vendors, Administration > Invoice > Vendor Handling.`
> — `<admin>/imaging-configuration-8b314b9a.md` (single occurrence corpus-wide)

`Vendor Handling` is a **21st Administration > Invoice label** that appears in no artefact and no
graph node. Out of this group's domain (it is Image Handling's vendor twin, G4) but recorded here so
it is not lost, exactly as the roster did for Change Log.

Fourth census — NBSP-separated paths, `Administration[\x{00a0} ]+Invoice[\x{00a0} ]+X` — confirms
`Feature Hierarchies` (1) and `Hierarchies` (1), i.e. the roster's grep hazard is real and its alias
capture is right. **Confirmed.**

### 1.3 Filename sweep

`ls <admin> <tools> | grep -icE 'workflow|approv'` → **132 files**. I read or sized every one.

---

## 2. THE THIRTEEN — ATTRIBUTION TESTED, AND A THIRD ACCOUNTING THE ROSTER MISSED

The roster offers two accountings and prefers `7 tabs + 3 wizard pages + 3 settings tables`. I ran an
independent **"X page" census** over the 120 files that mention any of
`Approval Statuses | Authorized Approver | Confirmation Agreement | Reason Category | Email Notification | Step Rules | Workflows (tool|page|tab) | workflow step`:

```
13 Approval Flow   12 Workflows   8 Steps   7 Step Rules   6 General   4 User Administration
4 Exceptions   3 Delegate Configurations   2 Settings   2 Authorized Approvers
1 Edit Workflow   1 Condition Editor   1 "Conditional expressions and the Condition [page]"
```

and a **"X window" census** over the same set:

```
4 Edit Action   2 Edit Condition   2 Authorized Approval Limits   2 Final Review/Confirmation
1 Request Status   1 Report Status   1 New Authorized Approver   1 Modify Workflow Step(s)
1 Add Workflow Step   1 Email Reminder   1 Modify Authorized Approver   1 Cost Object Summary
```

**A third accounting reaches 13 and fits the roster's OWN stated criterion better than its preferred
one.** The roster says it prefers accounting #1 "because it maps onto NAMED ARTEFACTS WITH THEIR OWN
TOPIC TITLES." By that criterion:

```
7 tabs + General + Steps + Step Rules + The Condition Page + Edit Condition window + Edit Action window = 13
```

`The Condition Page` has **its own topic title twice over** (`the-condition-page-5d4ea870.md`,
`the-condition-page-3408dec8.md`, plus `conditional-expressions-and-the-condition-page-4d98af34.md`),
whereas `Invoice Settings` / `Purchase Request Settings` / `Purchase Order Settings` are the ones the
roster has to argue are page-like. I cannot choose between the three accountings either — but the
roster should not claim its preferred one is the best fit for its own criterion when a third
accounting fits it better. **This does not change the page count.** It changes how confidently the
reconciliation should be stated.

**What I could NOT break:** an eighth tab. Tab-label census over the 95-file superset, after
stripping `On the / Click the / The / Select the / In the / Use the / Done on the` prefixes:

```
14 Workflows | 9 Email Notifications | 6 Authorized Approvers | 6 Confirmation Agreements
6 Approval Statuses | 5 Reason Category and Codes | 1 Settings | 1 Payment Request Approval Statuses (former label)
sub-tabs: 4 Invoice | 3 Purchase Request | 4 Configuration | 2 Authorized Approver List
```

Exactly seven, exactly four sub-tabs, one historical rename. Non-workflow strays in the set
(`Scan Configurations`, `New Exception`, `Other Settings`, `Verification`) all resolve to built pages.
**Seven tabs CONFIRMED.** Note `Settings` scores **1** — the roster's C1 is not overstated.

---

## 3. DEFERRALS I WOULD REVERSE, AND SEEDS I WOULD CHANGE

### 3.1 SEVERE — "Approver / Default Approver … assignment" is a WRONG rejection that loses a real, documented admin surface

The roster's deferral reads: *"every tools-guides topic that touches it defers to the external
Shared: User Administration User Guide, which is NOT in this corpus … Model these as
permanently-unresolved external endpoints; do NOT create page nodes."*

**That is false for the Authorized Approval Limits window.** Two ADMIN-GUIDES files document it
directly, with a click path, a role gate and named fields:

- `<admin>/user-administrator-fcfd570c.md` — **4,603 B**
- `<admin>/user-administration-8b167b96.md` — **2,314 B**

Verified quotes (each `grep -F -c` → 1):

> `The Authorized Approval Limits window appears.` — user-administrator-fcfd570c.md
> `the user must have the User Admin rights and the Invoice User Administration rights` — user-administrator-fcfd570c.md
> `The actual exception levels apply to all authorized approvers and are defined on the Authorized Approvers tab in Workflows.` — user-administrator-fcfd570c.md
> `Assign the permissions manually in User Administration` — `<admin>/step-4-assign-the-proper-rights-to-users-86389a18.md`
> `The amount is set for each approver in the Authorized Approver List, in User Administration, or in the employee import.` — `<admin>/configuration-8b3be88b.md`

**Click path (measured, verbatim in fcfd570c):** `Administration > Company > Company Admin > User
Administration` → *Expense and Invoices Setting* section → `Authorized Approval Limits` link →
Authorized Approval Limits window.

**Fields the corpus names on it:** Authorized Approver check box · Manager Approval Limit ·
Approval Limit Currency · hierarchy Level (left pane) · Can approve exception check box ·
currency + Amount · the Approval Limit area vs the Level field (with an explicit precedence rule:
*"Concur Invoice will use the one that applies to your configuration and ignore the other"*).
Plus two documented valid-value semantics: **0 = in the chain, no final authority**; **null = unlimited**
(`<admin>/setting-an-unlimited-approval-amount-9d98b489.md`).

This passes **both halves** of the brief's tiebreaker — own entry point, own role gate — and the
corpus explicitly enumerates it as one of **three** ways authorized approvers are defined, of which
the roster models exactly one (the Workflows > Authorized Approvers tab). The per-user approval
**limit** — the single value that decides whether an invoice can be limit-approved at all — currently
has **no home anywhere on the roster**.

The other half of that deferral (employee import record type 720) **is correct**: I opened both
`employee-import-f6a516c8.md` (1,235 B) and `employee-import-6954b441.md` (923 B) — duplicate titles,
different content, both defer to `Shared: Employee Import Specification`, which is not in this corpus.

*Scope caveat, stated honestly:* this surface is under `Administration > Company`, not
`Administration > Invoice`, so it sits outside the 20 built pages' menu. That is an argument about
where to file it, **not** an argument that the corpus does not document it — and the roster's
rejection sentence asserts the latter.

**ACTION:** add page node `authorized-approval-limits` (seedFiles: the two files above +
`setting-an-unlimited-approval-amount-9d98b489.md`, `definition-of-amount-for-limit-approval-06806875.md`,
`configuration-8b3be88b.md`, both `step-4-assign-the-proper-rights-to-users-*.md`), flagged as outside
the Invoice menu, in **Run A** (it shares `configuration-8b3be88b.md` and the limit-definition topics
with the Authorized Approvers tab). If the orchestrator refuses non-Invoice-menu page nodes, then at
absolute minimum **replace the false sentence** in the deferral with the click path and field list above.

### 3.2 SEVERE — a Group Configurations overview is seeded on Feature Hierarchies

`<admin>/overview-8b2edfd0.md` (**3,485 B**) is in the roster's Feature Hierarchies `seedFiles` and is
its **third-largest seed by bytes** on a page the roster itself predicts will yield ~5 fields.

It is not a Feature Hierarchies topic. Verified:

> `Group Configurations in Concur Invoice allow administrators to define and manage hierarchical groups` (`grep -F -c` → 1)
> `The Group Configurations tool is not visible if you have the Invoice Configuration administrator (Restricted) role.` (→ 1)

Its body describes the Group Configurations tool, its **Invoice tab** and its **Vendor Access tab**.
Feature Hierarchies appears once, as step 2 of a three-step narrative. Group Configurations is
**built (Group 1, 22 fields)**. Seeding it on the thinnest page in this group, on a page whose whole
risk profile is "will manufacture fields because the real spec is in an external guide," is the
precise setup for re-homing built G1 fields — which the brief forbids.

**Two better replacements exist, both cross-directory, both unopened by any sweep:**

- `<tools>/step-1-create-the-source-list-in-list-management-cc91aa73.md` (2,231 B) — **step 1 of the
  very six-step flow whose step 2 the roster already seeds** (`step-2-associate-the-feature-hierarchy-to-the-source-list-bcaf1f5a.md`).
  The roster seeded step 2 and the overview and skipped step 1, which is where the **Source List** —
  the one field the roster says this page documents well — is created.
- `<tools>/the-import-template-fields-and-descriptions-8b51ca3d.md` (**3,319 B, 47 indented table rows**)
  — as a **reference, not a seed**. It defines the Level semantics against a named feature hierarchy:
  > `Level 1 of the source list attached to the Invoice Vendor Employee Access feature hierarchy.` (→ 1)

  **CORRECTION TO MY OWN FIRST READING, which I am recording rather than deleting.** I initially wrote
  that this file "has never been cited or seeded by anything" — that was wrong, and it is exactly the
  observation-vs-inference error the brief calibrates on. A raw string count over the graph returns **4**
  occurrences: `dep.g5g5.052`, `vset.g5g5.unnamed.level-1-code-level-10-code-…`, `contr.g5g5.024`,
  `range.g5g5.009`. **Group 5 already owns its Level 1–10 value set.** My duplicate-title alarm was
  therefore only half right: the twin pair is real (8b51ca3d 47 rows / 8b4aa547 19 rows, the latter
  cited by the built Routing Configuration page), but the richer twin is **not** unread material.
  **Consequence for the build:** cite it on Feature Hierarchies for the "Level N of the source list
  attached to the *named* feature hierarchy" semantics, and **dedupe against
  `vset.g5g5.unnamed.level-1-code-level-10-code-…` before extracting** — do not re-derive that value set.

**ACTION:** drop `overview-8b2edfd0.md` from Feature Hierarchies seeds; add
`<tools>/step-1-create-the-source-list-in-list-management-cc91aa73.md` as a seed and
`<tools>/the-import-template-fields-and-descriptions-8b51ca3d.md` as a dedupe-flagged reference.

### 3.3 SEVERE — the "Vendor Approval step timeout" deferral records a homeless field family that is not homeless

The roster defers `about-vendor-approval-workflow-step-and-timeout-b3d1bd2c.md` with:
*"NO CLICK PATH ANYWHERE in the corpus … RECORD AS UNRESOLVED rather than inferring a home."*

The roster's **literal** claim is true — `grep -rn "Workflow Step Timeout Duration"` returns hits in
that one file only. Its **conclusion** is not. The timeout family has an explicit, fully-nested home:

> `the Approval Time Expired Action list on the General page in the Workflows tab of the Workflows tool`
> — `<admin>/create-a-new-workflow-15992497.md` (`grep -F -c` → 1)

and `<admin>/create-a-new-workflow-554e86aa.md` documents **four** General-page timeout fields
(lines 69, 99, 136, 152): `Approval Time Expired Action`, `Expire After This Many Days`,
`Assignment Timeout Action`, `Allow Timeout Extensions for This Many Days`, plus the conditional
`This option is only available if either the Approval Time Expired Action or Assignment Timeout Action options are enabled.`
The same family surfaces as a **valid value** in `default-approval-statuses-34c83d58.md`
(`Approval Time Expired`) and as a feature in `default-workflows-a6fa157a.md`.

**Measured:** four named General-page timeout fields with a nested click path.
**Inferred (label me a hypothesis):** `Workflow Step Timeout Duration` / `Approval Action` in
b3d1bd2c are prose labels for `Expire After This Many Days` / `Approval Time Expired Action`.
**Check that would settle it:** compare b3d1bd2c's worked example ("set to 5 days") against the
554e86aa description of `Expire After This Many Days` — the semantics are the same, the labels are not.

**ACTION:** rewrite the deferral to attach the timeout family to the Workflows General page, and
record b3d1bd2c as a **label contradiction** (`Workflow Step Timeout Duration` vs
`Expire After This Many Days`) rather than as two orphan fields. Leaving it "unresolved" means the
build will not extract four documented fields it can see.

### 3.4 The graph's own unresolved `page: "Workflows"` endpoints — the roster names 3 of 9

I enumerated every unresolved dependency endpoint whose `page` is not one of the built 20:

```
9  Workflows          dep.g1.021 dep.g1.026 dep.g2.014 dep.g4.045
                      dep.g2ar.021 dep.g2ar.022 dep.g2ar.023 dep.g2ar.024 dep.g2ar.026
4  Feature Hierarchies dep.g1.061 dep.g2.003 dep.g5g5.050 dep.g5g5.051   (roster: correct)
1  Delegate Configurations dep.g1.059                                    (roster: correct)
1  Purchase Request Settings dep.g2.012   1  Purchase Order Settings dep.g2.013
```

Three of the five the roster misses **pre-commit FIELD NAMES on the Workflows page**:
`workflow_first_step` (dep.g2ar.021, dep.g2ar.023), `workflow_approval_steps` (dep.g2ar.022),
`exception_level_limit` (dep.g2ar.024, dep.g2ar.026). `dep.g4.045` adds an e-Bunsho timestamp
precondition on `invoice submission for approval`.

**ACTION:** list all nine in the roster. A build that does not know the graph has already named
`workflow_first_step`, `workflow_approval_steps` and `exception_level_limit` will either duplicate
them under different names or leave five dependency edges dangling.

*Correction to my own reading:* `dep.g1.060 → page "User Administration"` is about **vendor
availability**, not approval limits — it does **not** corroborate §3.1. §3.1 stands on corpus
evidence alone.

### 3.5 Unseeded value-set files on the two Run-B pages

**Email Reminders** (roster: 16 seeds, `longCatalogs: 2`):
- `<admin>/pre-defined-rules-220a1fe7.md` (1,119 B) — the **pre-defined reminder rule catalog**, a
  two-value valid-value set for the Rules tab:
  > `Overdue Payment Request Approvals: Invoices that have not been approved within 7 days of submission of the invoice.` (→ 1)
- `<admin>/overview-8b2c769e.md` (1,488 B) — names the reminder **types** (Overdue Disbursement, Approving).
- `<admin>/best-practices-when-localizing-subject-and-email-message-fields-48515f40.md` (1,317 B) —
  the roster mentions it only inside the *Localization* deferral and seeds it nowhere.

**Delegate Configurations** (roster: 9 seeds):
- `<admin>/terminology-e1e1ed99.md` (2,026 B) — a **six-entry delegate terminology catalog**:
  Invoice Delegates · Invoice Request Delegates · Purchase Request Delegates · Temporary Approval
  Delegation · Delegate Restriction to Group · Delegated Approver.
  > `Temporary Approval Delegation: A method for designating an employee to act as an approver for a specified duration of time.` (→ 1)
  Three of those six are field-shaped and two (Delegate Restriction to Group, Temporary Approval
  Delegation) map onto controls the roster names in prose but seeds no source for.
- `<admin>/overview-8b2ba917.md` (1,223 B) — the permission-subset model, which is the page's whole
  semantics:
  > `Concur Invoice delegate configurations define the subset of invoice permissions that delegates are allowed to have within Concur Invoice.` (→ 1)

**Reason Category and Codes tab** (the group's closest call, carried at medium confidence on
**three** files): two more exist and are unseeded — `<admin>/modifying-a-reason-code-91457a6d.md`
(1,123 B) and `<admin>/reason-category-and-codes-8b3b27d4.md` (866 B). If that tab's page-vs-tab call
is ever revisited, it should be revisited on all five files, not three.

### 3.6 The Workflows uiVariant verdict is inverted

The roster: *"uiVariant = undifferentiated. THIS IS A BUILD RISK, NOT A MISSING PAGE: if the
automation targets New Experience, Workflows is the one config area for which the corpus offers no
New Experience guidance at all."*

The Workflows guide's own revision history, dated **September 19, 2025**, says:

> `Updated images and text to the new UI for the Workflows Tool` — `<admin>/general-information-8b3b0308.md` (→ 1)

`grep -rn "new UI"` over both guide dirs returns **6 hits corpus-wide**; this is the only one that
names an admin config tool. So the Workflows topics in this corpus **are** new-UI topics, rewritten
in place. The absence of a `*-new-experience-*` twin is a **replacement**, not a coverage gap — which
is exactly the question the brief's item 4 asks and the roster answered the other way.

**Counter-evidence, which must be recorded not reconciled:**
> `uses the Authorized Approvers link from workflows in the classic interface`
> — `<tools>/how-single-step-approval-workflow-works-40145f24.md` (→ 1)

One topic still routes the admin through the classic interface. Two dated statements, opposite
directions, one corpus version.

**ACTION:** change the uiVariant note from "no New Experience guidance / build risk" to
"**new UI, rewritten in place 2025-09-19; one contradicting classic-interface reference in tools-guides**."
The practical consequence is the reverse of what the roster tells the build.

*Also note the text trap:* that revision-history line misspells the product noun —
`Edit and Delete Worflows` — a third spelling trap beside `Polices` and `Administration >Invoice`.

### 3.7 The Delegate Configurations "two user interfaces" hint is boilerplate, not a signal

The roster records: *"delegate-configuration-8b2bd26d.md's revision history records 'added
information about two user interfaces', which is a UI-variant HINT."*

`grep -rn "two user interfaces"` over both guide dirs returns **40 files**, including
`audit-rules-8b297db8.md`, `policies-8b34cecf.md`, `forms-and-fields-8b2e66f6.md`,
`invoice-settings-8b345df1.md`, `routing-configuration-8b511516.md` — i.e. most of the **20
already-built pages**. It is a **2014-vintage boilerplate revision-history line**, not a
page-specific signal. Recording it on one page and not the other 39 invites a downstream builder to
act on noise.

**ACTION:** delete it from `delegate-configurations.uiVariantEvidence`.

---

## 4. NEW EXPERIENCE TWINS — REPRODUCED IN FULL, ROSTER CONFIRMED

`ls <admin> <tools> <release-notes> <release-note-summaries> | grep -i new-experience` → **5 files**:

| bytes | file |
|---|---|
| 15,800 | `<admin>/policies-the-purchase-order-policy-new-experience-5a1ba7ef.md` |
| 4,804 | `<admin>/purchase-order-matching-rules-new-experience-6c8fb80f.md` |
| 3,376 | `<tools>/using-the-unassigned-invoice-page-new-experience-072e2f18.md` |
| 2,410 | `<tools>/using-the-invoice-manager-page-new-experience-f83ba5fa.md` |
| 1,056 | `<admin>/end-user-experience-new-experience-85c2652b.md` |

`grep -rl "New Experience"` → **9 files**. **None is workflow configuration.** The roster's census is
exact. The two tools-guides NE files are AP-processor runtime lists, correctly deferred.

**Is any roster page about to repeat the 1,490 → 15,800 debt?** No — but the debt itself is still
live and is **not this group's**: `policies-the-purchase-order-policy-new-experience-5a1ba7ef.md`
(15,800 B, **5 real `<table>` elements, 14 `<tr>`, 86 `<p>`**). **No `configField` cites it.** It is
referenced three times elsewhere in the graph (once inside `page.purchase-order-matching-rules`, and in
`range.g3.001` / `range.g3.002`), so it is known to the graph but its 5 real tables have never been
mined into fields, and the page it describes (Policies) is built. Reported so it is not lost a third
time; **no action for this group.**

**Replacement vs revision:** see §3.6 — for Workflows the evidence says *revised in place*, which is
why no twin exists. That is the answer to item 4's second question.

---

## 5. RAW `<table>` SWEEP — FULL CENSUS, BOTH DIRS

`grep -rlE '<table>|<table '` over both guide dirs → **32 files** (prose `<table name and permission name>`
excluded by requiring `>` or an attribute, as instructed). In the workflow domain:

| tbl | tr | `<p` | bytes | file | seeded? |
|---|---|---|---|---|---|
| 1 | 7 | 36 | 8,664 | `<admin>/additional-approver-situations-fbb5034c.md` | **yes** (Workflows) |
| 1 | 3 | 14 | 6,234 | `<admin>/filter-authorized-approvers-by-workflow-approval-step-aae69350.md` | **yes** (Workflows) |
| 1 | 3 | 6 | 4,901 | `<admin>/invoice-settings-cace748d.md` | **yes** (Workflows) |
| 1 | 3 | 6 | 2,278 | `<admin>/create-a-conditional-rule-in-the-editor-86a92887.md` | **no — but not workflow** |

**The roster's `rawTableFiles: 3` for Workflows is CORRECT and all three are seeded.** Email
Reminders 0, Delegate Configurations 0, Feature Hierarchies 0 — all confirmed.

The fourth is **Print Condition Rules**, a surface that is neither built nor on any roster:
> `Click Done to return to the Print Condition Rules List page.` (→ 1)
It has a New → General step → Conditions page → Done flow, a two-field table (Print Condition Rule
Name, Editable By) and its own permission sentence about "create" rights. Companion files:
`the-condition-page-3408dec8.md`, `print-condition-editor-8b364c62.md`,
`work-with-print-condition-rules-and-content-ids-1b70c30e.md`,
`access-the-printed-invoices-condition-849f65a7.md`; graph endpoints `Printed Invoices` (dep.g1.020,
dep.g1.030) and `Print Format Administration` (dep.g5.055). **Out of scope for this group — report to
Group 6/7 like Change Log.**

**I also verified the exclusion that matters most:** `<admin>/the-condition-page-5d4ea870.md`
(11,176 B, 71 rows) is the **third-largest file in the whole workflow domain** and is **absent from
the Workflows seed list**. That is **correct**: it is the Audit Rules condition page and already
sources **16 built Audit Rules fields**. Its own first line says
`The Condition page in Audit Rules is similar to the Condition page used for Workflow and Processor.`
The roster's dedupe instruction is right and its omission is deliberate, not a miss.

---

## 6. LONG CATALOG SWEEP — indented-aware (`grep -cP '^\s*\|'`)

Workflow-domain admin files with >= 10 rows (top of list):

```
135  approved-vendor-v3-8b465c46.md (5,931 B)        vendor domain, not workflow
 91  delegate-configuration-8b2bd26d.md              REVISION HISTORY (roster correct)
 91  email-reminders-8b2caa99.md                     REVISION HISTORY (roster correct)
 85  create-a-new-workflow-554e86aa.md               seeded — the densest real haul
 85  cost-object-approval-8b3d1e0f.md                seeded
 71  the-condition-page-5d4ea870.md                  Audit Rules (built) — correctly out
 69  understand-the-hierarchy-b65d7089.md            seeded (FH) — worked example, roster correct
 64  authorized-approvers-8b3c26cc.md                seeded
 61  email-notifications-8b3dbad4.md                 seeded
 50  default-workflows-a6fa157a.md                   seeded
 49  create-email-reminders-604c4a46.md              seeded — 0 on "^| ", 49 on "^\s*\|" (trap live)
 49  routing-configuration-hierarchy-8b45d8d3.md     UNSEEDED — Routing Config (built), see below
 48  default-approval-statuses-34c83d58.md           seeded
 38  conditional-expressions-and-the-condition-page-4d98af34.md  seeded
 37  access-and-view-payment-delegate-configurations-8ed1298f.md seeded
 29  work-with-the-step-rules-page-4c33cda0.md       seeded
 22  create-a-new-invoice-delegate-configuration-fcf42662.md     seeded
 21  filter-authorized-approvers-by-workflow-approval-step-aae69350.md seeded
```

**Every long catalog in the workflow domain is either seeded, correctly excluded, or a revision
history the roster already flags.** The one exception is `the-import-template-fields-and-descriptions-8b51ca3d.md`
(47 rows, `<tools>`) — see §3.2.

Tools-guides workflow-adjacent catalogs, none of which any sweep opened:

```
78  the-query-builder-and-the-condition-editor-af058a80.md (9,534 B)   PR/PO Processor
59  the-query-builder-and-the-condition-editor-e10473f9.md (9,414 B)   Invoice Processor
76  proxy-logon-8b4e8cf0.md (3,415 B)                                   revision history
```

The two **duplicate-titled, different-loio** Query Builder files are **9 KB each, uncited by the
graph, unseeded and unmentioned in the roster**. They are **not** workflow config — they document the
Processor's runtime search Query Builder — but they say so about the shared Condition surface:

> `The Query Builder window in Invoice Processor is very similar to the Condition page within several of the other features in the Invoice Configuration administrator.` (→ 1)

**ACTION (small):** name them in the Step Rules deferral as "do not confuse / do not seed," so a later
run does not rediscover 19 KB of table and mistake it for a Workflows catalog. This is the
methodological consequence of §7.

**One catalog far bigger than anything in this group, uncited by the graph and belonging to nobody:**
`<admin>/details-section-49500221.md` — **29,059 B, 1,360 indented table rows**, a Col#/Field
Name/Data Type/Format/Description spec for the invoice extraction and import process. Group 7 (Ops) /
import-extract domain. **Not this group's** — reported so it is not lost.

---

## 7. SEED QUALITY — sorted by bytes, per page

**Workflows — GOOD.** Top ten of the domain by `wc -c`, all seeded except the deliberate Audit Rules
exclusion:

```
14,383 create-a-new-workflow-554e86aa.md            seed
11,246 work-with-the-step-rules-page-4c33cda0.md    seed
11,176 the-condition-page-5d4ea870.md               Audit Rules — correctly out (16 built fields)
 9,326 conditional-expressions-and-the-condition-page-4d98af34.md  seed
 8,664 additional-approver-situations-fbb5034c.md   seed
 6,899 approver-terminology-8559861c.md             seed
 6,726 work-with-the-steps-page-fab249d1.md         seed
 6,719 general-information-8b3b0308.md              seed
 6,234 filter-authorized-approvers-by-workflow-approval-step-aae69350.md seed
 6,071 workflow-creation-process-1d37b85f.md        seed
```

No stub-aiming. **This page's seed list is sound.**

**Feature Hierarchies — DEFECTIVE.** See §3.2: its #3 seed is a Group Configurations topic, and the
step-1 of its own six-step flow is missing.

**Email Reminders / Delegate Configurations — INCOMPLETE.** See §3.5.

**CROSS-DIRECTORY COVERAGE — the roster's weakest methodological move.** The roster ran
`grep -rl -e "Workflows tool" -e "Workflows page" -e "Workflows tab"` over `<tools>` → **0**, and
concluded *"aim the build at admin-guides only."* I reproduced the **0**. The conclusion does not
follow: **16 tools-guides files say `Invoice Configuration administrator`**, including
`how-single-step-approval-workflow-works-40145f24.md` (which the roster quotes but does not seed),
`overview-of-steps-37e3c289.md` (which it does seed), three `required-roles-*.md` role matrices
(one with 36 table rows), and both Query Builder files. Tools-guides is not empty of admin content;
it is empty of that **one phrasing**. On the last group the critic's single most valuable addition
was exactly a tools-guides corroboration — and this roster has written the directory off by a
phrasing test.

**ACTION:** replace the "admin-guides only" instruction with "admin-guides is the field source;
tools-guides is checked for corroboration via `Invoice Configuration administrator`, `(left menu)`
and `Invoice Processing Admin`," and seed
`<tools>/how-single-step-approval-workflow-works-40145f24.md` on Workflows (it is the only topic that
ties the Authorized Approvers link, the approval-limit value and the skip-step rule together).

---

## 8. THE SPLIT

The split is **structurally sound and I would keep it**: Run A `{Workflows + Feature Hierarchies}`,
Run B `{Email Reminders + Delegate Configurations}`.

- It does not cut through a page, so `--patch` is safe. **Confirmed.**
- The shared-file argument holds: `comm` confirms Workflows ∩ Feature Hierarchies = 2 files, one of
  which (`understand-the-hierarchy-b65d7089.md`, 69 rows) is a long catalog two runs would read twice.
- The single Run-A/Run-B shared file (`delegate-self-approval-1b627285.md`, 1,284 B) and its
  do-not-extract instruction are correct.

**Two changes forced by my findings:**

1. **Authorized Approval Limits must go in Run A**, not Run B and not its own run. It shares
   `configuration-8b3be88b.md` and `definition-of-amount-for-limit-approval-06806875.md` with the
   Workflows Authorized Approvers tab, and its exception-level sentence points straight at that tab.
   Splitting it out would make two runs read the same limit-definition topics — the exact defect the
   roster's own pairing argument exists to avoid.
2. The imbalance the roster calls irreducible gets **worse** (Run A gains ~7 fields and 2 files, plus
   the two tools-guides seeds). Still irreducible for the stated reason; the model-tier advice stands
   and should be restated more strongly.

---

## 9. THE FIVE INHERITED FINDINGS — VERDICTS AUDITED, AND A SIXTH

| # | roster verdict | my audit |
|---|---|---|
| (1) settings family | confirmed, answer (a) | **CONFIRMED, reproduced exactly.** `select their own approver`: available-invoice-settings-8b3411f0.md **0** / invoice-settings-cace748d.md **2**; the roster's extra datum (purchase-request-settings-b0bce285.md also **2**) also reproduces, as does purchase-order-settings-a5a997b4.md **0**. `grep -rl "apply globally to"` over both dirs returns **exactly those three files**. `Type a number from one to 99.` returns **1** in each of the three. Table counts in cace748d reproduce: `<tr` **3**, `<p` **6**, indented md rows **10**. **No change.** |
| (2) one page, seven tabs | confirmed | **CONFIRMED** three independent ways (§2). Graph string counts reproduce exactly: `Approval Statuses` 0, `Email Notifications` 0, `Authorized Approver` 0, `Step Rules` 0, `Workflows` 36, `Workflows > Settings` 1. Release-note heading `Workflows Page` verified at line 80 of 6df11845 with the three bullets quoted. **Under-evidenced in one respect:** the roster's preference between its two 13-accountings is asserted on a criterion that a **third** accounting fits better (§2). |
| (3) Feature Hierarchies is its own page | confirmed | **CONFIRMED** — both halves of the tiebreaker verified. **But its seed list is defective (§3.2), which undercuts the "thin is correct" prediction: the page looks less thin than it is because one seed belongs to a built page.** |
| (4) Routing Configuration boundary clean | confirmed | **CONFIRMED.** I re-read all 10 built field names; none is approval-shaped. `workflow-and-approval-routing-8b4ff6c9.md` falls on the Workflows side and seeds nothing. One addition: `<admin>/routing-configuration-hierarchy-8b45d8d3.md` (49 rows) is unseeded and uncited — it belongs to the **built** Routing Configuration page, not here; flagging it only so no one re-homes it into Feature Hierarchies on the word "hierarchy". |
| (5) end-user traps | confirmed | **CONFIRMED as a method.** Every runtime rejection in `deferred` does name a config home — I checked all of them. **One home is factually wrong (§3.1)** and one is wrongly recorded as nonexistent (§3.3). |

### THE SIXTH — nobody was chartered to settle this, and it is the same kind of ambiguity

**Is the corpus's Workflows documentation describing the CURRENT admin UI or a superseded one?**
Two dated, contradictory statements exist (§3.6): a 2025-09-19 revision-history line saying the
Workflows Tool topics were updated to the new UI, and a tools-guides topic routing the admin through
"the classic interface." Findings (1)–(5) settle *which page owns what*; **none of them settles which
UI generation the click paths describe** — and click paths are, per the brief, the only navigation
knowledge this group will ever have. If the automation drives a UI the 2025 rewrite already changed,
every navPath in this roster is wrong in the same way at the same time. This is a **single point of
failure for the whole group** and it is currently recorded, in the roster, backwards.

---

## 10. UNDETERMINED BY THE DOCUMENTATION — ranked

These are properties of the corpus. None is a to-do against a tenant.

1. **UI generation of the Workflows click paths.** §3.6 / the sixth finding. Two dated statements in
   opposite directions. Unsettleable from the corpus; settleable only by observing the live UI.
2. **The role gate on Reason Category and Codes.** `The Invoice Configuration administrator (_Restricted_) role is required to use the options on this tab.`
   vs the release note's `This role has read-only access; therefore, actions such as New, Copy, and Remove are disabled.`
   Both verbatim, both 2026_08. The roster's C9 is right that this cannot be settled here. I add only
   that the release note is a **read-only-role enumeration**, so its silence on four of seven tabs is
   evidence about that role, not about the tabs.
3. **Whether Authorized Approval Limits is in scope.** The surface is documented (§3.1); what is
   undetermined is whether a `Administration > Company` surface belongs to a graph whose 20 built
   pages are all `Administration > Invoice`. That is a scoping decision for the orchestrator, not a
   corpus question — but the roster currently forecloses it with a false factual claim.
4. **Which of three 13-accountings the lost map used.** §2. Three now fit; the corpus cannot choose.
5. **The `Settings` tab's status.** One tab-label occurrence corpus-wide, against three path-less
   prose alternates (`Settings section of the Workflows tool`, `Settings page`, `Workflow Settings page`).
   The roster's tiebreak (only the tab reading carries a click path) is the best available reading,
   but it rests on a single occurrence and should be labelled as such.
6. **Feature Hierarchies' field roster.** SAP defers it to the external *Shared: Feature Hierarchies
   Setup Guide*, absent from this corpus. Thin is the correct answer; §3.2 only makes the thinness
   measurable rather than disguised.
7. **`about-vendor-approval-workflow-step-and-timeout-b3d1bd2c.md`'s labels.** §3.3 gives the family
   a home; whether `Workflow Step Timeout Duration` is a synonym of `Expire After This Many Days` or a
   genuinely distinct step-level control is not stated anywhere.

---

## APPENDIX — unclaimed surfaces surfaced by this sweep, out of this group's scope

Reported so they are not lost, in the manner the roster used for Change Log.

- **Vendor Manager** — 5 unresolved graph endpoints (`dep.g1.077`, `dep.g4.032`, `dep.g5g5.025`,
  `Vendor Manager > Manage Vendors` dep.g4.025, `Vendor Manager > Vendor Mapping List` dep.g4.026)
  plus `<tools>/vendor-manager-8b542597.md` (the file is in tools-guides, not admin-guides). No group has claimed it.
- **Print Condition Rules** — §5. Has a real `<table>`, a New/Save flow and a `List page`.
- **Form Types** — 4 unresolved endpoints (dep.g1.022–025).
- **Printed Invoices** (dep.g1.020, dep.g1.030) / **Print Format Administration** (dep.g5.055) /
  **Validations** (dep.g5.052) / **Check Configurations** (dep.g5g5.053).
- **Vendor Handling** — §1.2, one corpus-wide mention.
- **`details-section-49500221.md`** — 29,059 B / 1,360 rows, uncited, import-extract domain.
- **`policies-the-purchase-order-policy-new-experience-5a1ba7ef.md`** — 15,800 B, 5 real `<table>`,
  uncited by any field, belongs to the **built** Policies page. Outstanding NE debt, still open.

# Sweep B — admin-guides filename + content sweep, WORKFLOW / APPROVAL configuration surface

Corpus: `/mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE`
Owned directory: `concur-invoice-professional-edition-admin-guides/` (1209 files), swept exhaustively.
Release notes used ONLY to corroborate a page name / role gate, and labelled as such.
SAP 2026_08, Professional Edition, crawled 2026-08-29. Date of sweep: 2026-08-31.

---

## HEADLINE

**"Workflows" is ONE admin page with SEVEN tabs, not thirteen pages.** It has its own
left-menu entry under `Administration > Invoice > Invoice Processing Admin`, and every other
workflow surface in this directory is reached only by clicking a tab inside it. The corpus
never once gives any of those tabs its own left-menu entry.

The seven tabs are: **Workflows**, **Settings**, **Email Notifications**, **Authorized
Approvers**, **Approval Statuses**, **Confirmation Agreements**, **Reason Category and Codes**.
Two of them carry sub-tabs of their own. The Workflows tab opens a three-step wizard
(General → Steps → Step Rules) over the *workflow object*.

Three genuinely separate left-menu pages sit adjacent and are NOT tabs of Workflows:
**Email Reminders**, **Delegate Configurations**, **Feature Hierarchies**.

Finding (1) is **CONFIRMED and is answer (a)**: Invoice Settings (`cace748d`), Purchase
Request Settings and Purchase Order Settings are all three tables on the **Workflows >
Settings tab**. Corroborated four independent ways, including a release-history line inside
the guide itself. `invoice-settings-cace748d.md` was never Invoice Settings rebuild debt —
it never belonged to the built Invoice Settings page at all.

---

## 1. WHAT I SEARCHED

### Filename sweep (`ls | grep -i`) over 1209 admin-guides files

| term | hits | term | hits |
|---|---|---|---|
| workflow | 35 | reminder | 14 |
| approv | 78 | notification | 13 |
| step- | 85 | cost-object | 13 |
| rule- | 36 | status | 12 |
| email | 43 | routing | 3 |
| level | 21 | self-approval | 3 |
| delegate | 17 | timeout | 1 |
| action | 16 | notify | 1 |
| hierarch | 15 | pending | 1 |
| | | exception-level | 1 |

Zero filename hits: `escalat`, `proxy`, `single-step`, `recall`, `send-back`, `reject`,
`threshold`, `route`, `queue`, `reassign`, `substitute`, `out-of-office`, `backup`.

### Content sweep (`grep -rli`) over the same 1209 files

`approv` 271 · `workflow` 222 · `notification` 63 · `delegate` 29 · `email reminder` 25 ·
`send back` 13 · `self-approval` 8 · `timeout` 7 · `escalat` 6 · `recall` 4 · `reassign` 3 ·
`proxy` 3 · `substitute` 2 · `out of office` 0.

The content sweep found **three surfaces whose filenames never say "workflow"**:
Confirmation Agreements (6 files), Reason Category and Codes (4 files), and the
Settings-family tables. Reason Category and Codes in particular is only reachable by
content grep — no filename in the corpus contains the word "workflow" for it.

### Cross-directory check (tools-guides)

`grep -rl -e "Workflows tool" -e "Workflows page" -e "Workflows tab"` over
`concur-invoice-professional-edition-tools-guides/` returns **ZERO files**.
The 23 workflow/approval-named tools-guides files are all approver/processor **runtime**
topics (`approve-invoices-`, `view-the-approval-flow-` ×3, `moving-through-the-batch-
verification-workflow-`, `purchase-request-approver-experience-`, …).
**Build implication: aim the Workflows field build at admin-guides only.**

---

## 2. GROUP SIZES (real `wc -c`, not impressions)

| group | files | bytes |
|---|---|---|
| Workflow object + wizard (Workflows tab, General/Steps/Step Rules) | 20 | 73,567 |
| Authorized Approvers (tab + sub-tabs + hierarchy + level filter) | 30 | 67,312 |
| Delegate Configurations | 17 | 33,041 |
| Email Reminders | 14 | 30,920 |
| Cost Object Approval | 13 | 20,831 |
| Email Notifications tab | 9 | 18,382 |
| Approval Statuses tab | 9 | 15,216 |
| Settings tab (incl. the 3-member settings family) | 6 | 13,587 |
| Confirmation Agreements tab | 6 | 8,633 |
| Reason Category and Codes tab | 4 | 4,310 |

Richest single files: `create-a-new-workflow-554e86aa.md` 14,383 B ·
`work-with-the-step-rules-page-4c33cda0.md` 11,246 B ·
`conditional-expressions-and-the-condition-page-4d98af34.md` 9,326 B ·
`work-with-the-steps-page-fab249d1.md` 6,726 B ·
`filter-authorized-approvers-by-workflow-approval-step-aae69350.md` 6,234 B ·
`create-a-new-invoice-delegate-configuration-fcf42662.md` 6,302 B ·
`understand-the-hierarchy-b65d7089.md` 5,065 B.

### Census calibration — the warnings in the brief are all live here

| file | bytes | `^\|␣` naive | `^\s*\|` correct | `<table[ >]` | `<tr` | `<p` |
|---|---|---|---|---|---|---|---|
| create-a-new-workflow-554e86aa.md | 14383 | **0** | **85** | 0 | 0 | 0 |
| work-with-the-steps-page-fab249d1.md | 6726 | 0 | 28 | 0 | 0 | 0 |
| work-with-the-step-rules-page-4c33cda0.md | 11246 | 0 | 29 | 0 | 0 | 0 |
| invoice-settings-cace748d.md | 4901 | 4 | 10 | **1** | **1** | **6** |
| purchase-request-settings-b0bce285.md | 3735 | 5 | 13 | 0 | 0 | 0 |
| purchase-order-settings-a5a997b4.md | 1417 | 3 | 7 | 0 | 0 | 0 |
| default-approval-statuses-34c83d58.md | 3405 | 15 | 48 | 0 | 0 | 0 |
| authorized-approver-list-a9522ec8.md | 3773 | 0 | 16 | 0 | 0 | 0 |
| procedure-2d20b513.md (AA Configuration tab) | 1554 | 0 | 10 | 0 | 0 | 0 |

The single richest file in the whole domain returns **0** on the naive anchor. And
`invoice-settings-cace748d.md` is a **packed `<tr>`**: one `<tr>` carrying six `<p>` cells =
three extra settings rows on top of its two markdown rows.

**CORRECTION TO THE INHERITED BRIEF:** `invoice-settings-cace748d.md` is described in the
brief as "a 3-row Setting|Description table". It is **five settings**, not three:
2 markdown rows (*Allow users to select their own approver for payment requests*, *Display
payment request approval links to approvers on the home page*) + 3 packed-HTML rows (*Prevent
this payment request submission when exception level exceeds X*, *Filter payment request
items to those that are applicable to Cost Object*, *Allow processor to recall a payment
request to last processor step*). A build that trusts the "3-row" figure loses two controls.

---

## 3. FINDING (1) — SETTLED. Answer is (a).

Reproduced the clincher:

```
grep -c "select their own approver" .../available-invoice-settings-8b3411f0.md   -> 0
grep -c "select their own approver" .../invoice-settings-cace748d.md             -> 2
bytes: 8368 (available-invoice-settings) vs 4901 (invoice-settings-cace748d)
```

`available-invoice-settings-8b3411f0.md` opens "The Invoice Settings page includes the
following settings used to activate a feature:" — it is the built page's own roster and shares
**no** field with the settings family. Cross-check: each of the four distinctive strings
"Prevent this payment request submission", "Filter payment request items", "Allow processor to
recall", "approval links to approvers on the home page" appears **only** in the three family
files, nowhere else in 1209 admin-guides files.

Four independent pieces of positive evidence put the whole family on **Workflows > Settings**:

1. `preventing-po-transmittal-when-po-exceeds-specified-exception-level-51b11602.md` — the PO
   member: "A setting in Workflows can be used to prevent PO transmission if the PO exceeds a
   specified exception level." and (nav line, NBSP separators) "The setting appears in
   Administration Invoice Workflows Settings tab", plus "works just as the payment or purchase
   request settings of this type" — which explicitly ties all three members to one tab.
2. `approver-terminology-8559861c.md` — the invoice member's headline field: "Allow users to
   select their own approver for payment requests flag is set in Workflow Settings".
3. `create-a-new-workflow-554e86aa.md` and `work-with-the-steps-page-fab249d1.md` both refer
   to that same field as being "on the Settings page" *from inside the Workflows wizard*.
4. `general-information-8b3b0308.md` (the Workflow – General Information guide's own revision
   history): "Addition of two new options to the Settings tab:" followed by *Filter invoice
   items to those that are applicable to Cost Object* and *Allow processor to recall an invoice
   to last processor step* — i.e. two of the packed rows of `invoice-settings-cace748d.md`; and
   "New Settings tab option: Prevent purchase order transmissions setting." — the PO member.

Plus `exceptions-then-portion-of-the-if-then-statement-6a3d96b1.md`: "The limit is set using
the Invoice Admin, Workflows, and Settings." and `exceptions-d945b953.md`: "(via Invoice
Configuration Administrator Workflows Settings)".

**Answer (c) is refuted.** The invoice member is NOT Invoice Settings rebuild debt; it never
belonged to the built Invoice Settings page. Do not re-home it *back* — home it *here*.

**PROSE NUMERIC RANGE — flagged for the build.** All three exception-level threshold controls
are bounded by the prose string `Type a number from one to 99.` (verbatim, present in all
three family files). No digit-based range regex will find it. Same phrasing also appears in
`exceptions-d945b953.md` as "up to 99" exception levels.

### Two mis-homed endpoints in the EXISTING graph (findings about the graph, not new pages)

* `dep.g2.011` targets page **"Invoice Settings"**, field *"Prevent this payment request
  submission when exception level exceeds X"*, citing `invoice-settings-cace748d.md`. That
  target belongs on **Workflows > Settings tab**.
* `dep.g2ar.025` targets page **"Invoice Settings"**, field `exception_level_limit`, on the
  quote "The limit is set using the Invoice Admin, Workflows, and Settings." The quote names
  *Workflows > Settings*, not the Invoice Settings page. It should collapse into `dep.g2ar.024`
  (same quote, target "Workflows / exception_level_limit"), which is already correct.

Confirmed by reading `/mnt/c/Users/manci/PROJECTS/concur-config-diver-support/output/kg-invoice-config.json`: **zero** `configFields` cite `cace748d`,
`b0bce285` or `a5a997b4`; each string occurs exactly once in the whole graph, in a dependency.

---

## 4. FINDING (2) — SETTLED ON CLICK PATHS AND ROLE GATES. ONE PAGE, SEVEN TABS.

### The page

`Administration > Invoice > Invoice Processing Admin > Workflows`

* `access-workflow-fa9892a7.md`: "From the Invoice Processing Admin menu, click Workflows." →
  "The Workflows tab on the Workflows page appears."
* `select-an-email-notification-in-the-workflows-tab-663bb8ac.md`: "Click Workflows (left
  menu). The Workflows page appears." — **left-menu entry, 8 files carry this exact phrasing.**
* Role gate: `workflows-tool-8b3b4dbe.md` "Both the Global Invoice Configuration administrator
  and the Group Invoice Configuration administrator can view the Workflows tool."
  `step-2-activate-the-feature-27a421e2.md` "This portion of the configuration requires
  permissions for the Workflows section in Administration."
* **Release-note corroboration** (labelled as a release note):
  `release-notes/updated-read-only-access-for-invoice-configuration-administrator-restricted-role-6df11845.md`
  — "The Invoice Configuration Administrator (Restricted) can view invoice configuration
  settings for Workflows, Policies, Group Configurations, and Forms and Fields." and "then
  choose a page from the Invoice Processing Admin list". Workflows is listed as a *page* in the
  Invoice Processing Admin list, in the same breath as three pages already in the graph.

### The seven tabs (all reached only by clicking inside the Workflows page)

| tab | click-path evidence |
|---|---|
| **Workflows** | "The Workflows tab on the Workflows page appears." (`access-workflow-fa9892a7`) |
| **Settings** | "Addition of two new options to the Settings tab:" (`general-information-8b3b0308`); "you must clear a setting in the Settings section of the Workflows tool" (`workflow-creation-process-1d37b85f`) |
| **Email Notifications** | "To access the Email Notifications tab: 1. Click Administration > Invoice. 2. Click Workflows. 3. Select the Email Notifications tab." (`access-email-notifications-9f806b0b`) |
| **Authorized Approvers** | "Click Administration > Invoice > Workflows (left menu). The Workflows page appears." → "Click the Authorized Approvers tab." (`authorized-approver-list-a9522ec8`) |
| **Approval Statuses** | "From the Invoice Processing Admin menu, click Workflows." → "Select the Approval Statuses tab." (`accessing-the-approval-statuses-tab-7ec7bb6e`) |
| **Confirmation Agreements** | "On the Confirmation Agreements tab of the Workflows page, either:" (`editing-a-confirmation-agreement-dc406a56`) |
| **Reason Category and Codes** | "Click the Reason Category and Codes tab." (`creating-a-reason-code-b2b61596`); "The Invoice Configuration administrator (_Restricted_) accesses Workflows Reason Category and Codes …" (`overview-9c8ca06e`) |

### Sub-tabs (two levels deep — a real structural feature of this page)

* Authorized Approvers → **Configuration** ("Click the Authorized Approvers tab." →
  "Click the Configuration tab.", `procedure-2d20b513`) and **Authorized Approver List**
  ("Click the Authorized Approver List tab.", `authorized-approver-list-a9522ec8`).
  Corroborated by `understand-ad-hoc-steps-ce0af3e7`: "on the Configuration tab of the
  Authorized Approvers tab".
* Approval Statuses → **Invoice** ("Click Approval Statuses tab, and then the Invoice tab.",
  `adding-an-invoice-approval-status-d8cbbe5d`) and **Purchase Request**
  ("Administration > Invoice > Workflows > Approval Statuses > Purchase Request",
  `work-with-purchase-requests-approvals-1c39ee21`). This exactly matches the graph's existing
  unresolved endpoint "Approval Statuses > Purchase Request" — independent corroboration.

### The wizard (NOT pages — a modal sequence over the workflow OBJECT)

`Workflows tab` → select workflow → `Copy` / `Modify` / double-click →
**General page** → Next → **Steps page** → **Step Rules page** → Done.
Evidence: `create-a-new-workflow-554e86aa` "On the Workflows tab, select the desired workflow
and click Copy." / "The General page appears." / "Click Next." / "The Steps page appears.";
`edit-workflow-rules-and-actions-abdf9b11` "On the Step Rules page, either:";
`work-with-the-step-rules-page-4c33cda0` "When done with all rules and actions, click Done on
the Workflows tab." — the wizard returns you to the tab, which is the giveaway that it is a
wizard, not navigation.

Nested dialogs off the wizard: **Add Workflow Step** / **Modify Workflow Step**,
**Edit Condition**, **Edit Action**, **New Authorized Approver** / **Modify Authorized
Approver**, **Confirmation Agreement** window, **Request Status** window, **Modify Email
Notification** window (its own 3-step General → Primary Recipient → Delegate Recipient wizard).

### The PAGE vs the OBJECT

`workflows-tool-8b3b4dbe`: "The administrator can set up as many workflow scenarios as
required within the system." A *workflow* is an object; there are many. Both
`create-a-new-workflow-*.md` files are about the OBJECT, not a page.
`create-a-new-workflow-15992497` even nests the two nouns: "the Approval Time Expired Action
list on the **General page** in the **Workflows tab** of the **Workflows tool**."

### CONTRADICTIONS TO RECORD (do not reconcile)

1. **Settings — "tab" vs "page" vs "section".** `general-information-8b3b0308` and
   `preventing-po-transmittal-…-51b11602` say **Settings tab**;
   `enabling-and-disabling-an-invoice-workflow-setting-0e1e6d33` says "On the **Workflow
   Settings page**, select a setting option."; `workflow-creation-process-1d37b85f` says
   "**Settings section** of the Workflows tool"; `create-a-new-workflow-554e86aa` and
   `work-with-the-steps-page-fab249d1` say "the **Settings page**". Four labels, one surface.
   I treat it as a tab because only the tab reading has an explicit click path.
2. **Authorized Approvers — "tab" vs "page".** `authorized-approver-list-a9522ec8` and
   `step-4-assign-the-proper-rights-to-users-82481079` say **tab**; `create-a-new-workflow-554e86aa`
   says "defined on the **Authorized Approvers page** within Workflows" and
   `workflow-creation-process-1d37b85f` says "use the **Add Authorized Approvers page** within
   Workflows"; `configuration-8b3be88b` says singular "**Authorized Approver tab**".
3. **Email Notifications tab (plural)** vs **"Email Notification tab" (singular)** in
   `create-a-new-workflow-554e86aa`.
4. **Confirmation Agreements tab (plural)** vs **"Confirmation Agreement tab" (singular)** in
   `access-the-confirmation-agreement-tab-666fa0ac` and `create-a-confirmation-agreement-3e153f29`.
5. **Nav path abbreviation.** `access-workflow-fa9892a7` and `accessing-the-approval-statuses-tab-7ec7bb6e`
   route through the **Invoice Processing Admin** menu node; `edit-workflow-properties-409a8f0b`
   ("Click Administration > Invoice." / "Click Workflows.") and the eight "(left menu)" topics
   omit it. Per the brief this is an abbreviation, not a second page — but recorded.
6. **Dialog naming.** "The Add Workflow Step **page** appears" (`work-with-the-steps-page-fab249d1`)
   vs "The Add Workflow Step **window** appears" (`create-an-authorized-approver-step-4640b5a5`);
   "Modify Workflow Step**s** window" (`edit-and-reorder-workflow-steps-41535156`) vs
   "Modify Workflow Step window" (`step-1-assign-the-level-to-the-workflow-step-6035f10a`).
7. **Renamed tab (release-history, in-guide).** `general-information-8b3b0308`: "Updated images
   to reflect change of **Payment Request Approval Statuses tab** to **Approval Statuses tab**."
   The old label survives in prose: `create-a-new-workflow-15992497` and
   `workflow-creation-process-1d37b85f` both still say "*Payment Request Approval Statuses*
   section". Alias, not a second surface.

### The FOUR `workflow-guides-*.md` files — DIFFED

| file | bytes | loio |
|---|---|---|
| workflow-guides-8b3b85da.md | 1,473 | 8b3b85da70891014bbdd65f9448c9095 |
| workflow-guides-8b3c7b2a.md | 1,784 | 8b3c7b2a70891014bbdd65f9448c9095 |
| workflow-guides-8b3d6ede.md | 1,769 | 8b3d6ede70891014bbdd65f9448c9095 |
| workflow-guides-8b3e09a7.md | 1,663 | 8b3e09a770891014bbdd65f9448c9095 |

**Verdict: the SAME landing topic republished four times — once as the front matter of each of
the four guides in the family.** All four carry an identical 4-row table listing
*Concur Invoice: Workflow – General Information*, *– Authorized Approvers*, *– Cost Object
Approvals*, *– Email Notifications*, and the identical sentence "Refer to these guides when
configuring and maintaining workflows." They differ ONLY in a machine-generated summary
paragraph and italic markup (8b3b85da has no summary paragraph and italicises the guide names;
8b3e09a7 drops a space in "Workflow –Authorized Approvers"). Different loio, same deliverable,
same content.

**This is the strongest structural signal available and it points AT ONE PAGE, not several.**
The workflow domain is *four guides* — but three of those four (Authorized Approvers, Cost
Object Approvals, Email Notifications) document a **tab or a feature inside the same page**,
not a separate page. SAP split the documentation by *topic*; it did not split the UI. That is
exactly the Audit Rules precedent (one page, three tabs, "Validation Rules" an alias), not the
Forms and Fields precedent (two pages, two different role gates, two different click paths).
There is only one left-menu entry and only one role gate for the whole thing.

### The TWO `create-a-new-workflow-*.md` files — DIFFED

| file | bytes | loio | content |
|---|---|---|---|
| create-a-new-workflow-15992497.md | 2,017 | 1599249793e440e794e4293a73dc68b4 | prose only: you cannot build from scratch, you must copy; then associate to a policy; a note about the Approval Time Expired Action list |
| create-a-new-workflow-554e86aa.md | 14,383 | 554e86aad4494ef2b3af767ea746e15f | the full 25-field roster of the **General page**, steps 1–3 of the wizard |

**Verdict: SAME procedure on the SAME page — ONE page, not two.** Both describe copying an
existing workflow on the Workflows tab of the Workflows page. `15992497` is the conceptual
preamble ("To create a new workflow, an administrator must copy an existing invoice
workflow"); `554e86aa` is the field-level procedure ("On the Workflows tab, select the desired
workflow and click Copy."). They are not two workflow types and not two pages. `554e86aa` is
**the single richest field source in the domain** and is where the General-page build must aim.
Note that `15992497` is the one that cites the *nested* nav ("the General page in the Workflows
tab of the Workflows tool"), so it is worth keeping for navigation even though it has no table.

---

## 5. FINDING (3) — FEATURE HIERARCHIES. Verdict: **its own page; belongs to neither
Workflows nor Routing Configuration; claim it as a shared prerequisite page.**

It is unambiguously a left-menu page:
* tools-guides `step-2-associate-the-feature-hierarchy-to-the-source-list-bcaf1f5a.md`:
  "Click Feature Hierarchies (left menu)."
* admin-guides `professional-edition-fb3e6aa2.md`: "Go to Administration Invoice Feature
  Hierarchies." → "Select the Invoice Payment feature name." → "Select Modify Hierarchy."
* Role gate: `step-1-define-the-cost-object-approver-hierarchy-6e7b7dc6.md` — "This portion of
  the configuration requires permissions for the Feature Hierarchies section in Administration."
  A *separate* permission from the Workflows permission quoted in `step-2-activate-the-feature-27a421e2.md`.

It serves at least **five** named feature hierarchies across at least four config domains:
Invoice Routing (tools-guides `create-the-invoice-routing-feature-hierarchy-8b510285.md`),
Invoice Payment (`professional-edition-fb3e6aa2.md`), Invoice Vendor Employee Access
(tools-guides `step-2-associate-…-bcaf1f5a.md`), Payment Authorized Approver
(`understand-the-hierarchy-b65d7089.md` — "You must define the authorized approver hierarchy
(Invoice > Feature Hierarchies) … before the authorized approver feature can be activated"),
and Cost Object Approver (`step-1-define-the-cost-object-approver-hierarchy-6e7b7dc6.md`).

So: **not PO-domain (Group 3 was right), not Workflows-owned, not Routing-owned.** It is a
cross-cutting page like List Management, whose Source List it consumes. Its own left-menu
entry and its own role gate make it a PAGE by this recon's own tiebreaker.

**Recommendation, so it is not left unclaimed a second time:** build it as its own page node
`Feature Hierarchies`, navPath `Administration > Invoice > Feature Hierarchies`. Workflows and
Routing Configuration then both point *at* it. It resolves four already-written dependency
endpoints (dep.g1.061, dep.g2.003, dep.g5g5.050, dep.g5g5.051) — every one of which is about a
Source List, i.e. exactly the field this page owns. If this group cannot take it, it belongs in
Group 7, but it must not be dropped: the authorized-approver feature literally cannot be
activated without it, so the Workflows build has a hard forward reference into it.

---

## 6. FINDING (4) — THE BOUNDARY AGAINST ROUTING CONFIGURATION. **CLEAN. No overlap.**

Routing Configuration's 10 built fields, read out of the graph, are ALL hierarchy-mapping
import mechanics — `search_routing_mappings`, `employee_last_name`, `segment_1_3`,
`delete_flag`, `employee_id`, `level_1_10_code`, `browse_button`, `import_button`,
`download_template_button`, `import_details_type_filter` — all cited to tools-guides files
(`search-for-hierarchy-mappings-`, `the-import-template-fields-and-descriptions-`,
`step-1/3/4-…`). Routing Configuration is the page where you **upload a spreadsheet that maps
employees to hierarchy nodes so an unassigned invoice gets an owner.**

That is *invoice ownership assignment*, upstream of workflow. **Workflows never touches it.**
Not one control I found in 1209 admin-guides files duplicates a Routing Configuration field,
and the admin-guides directory contains only three `routing`-named files
(`custom-routing-field-32424721.md`, `routing-configuration-hierarchy-8b45d8d3.md`,
`routing-options-auto-assigning-the-invoice-984476ee.md`), all of which are about invoice
*assignment*, not approval steps.

`tools-guides/workflow-and-approval-routing-8b4ff6c9.md` (1,502 B): **falls on the Workflows
side, and it configures nothing.** It is best-practice prose for PO-based invoice policies —
"All workflow options available for non-PO policies are also available to a PO-based invoice
policy. This includes options such as workflow rules and Authorized Approvers." It names no
page, no field, no click path. Despite the word "Routing" in its title it has nothing to do
with the Routing Configuration page; "approval routing" here means *the shape of the approval
chain*, which is configured on Workflows > Workflows tab > Steps/Step Rules. Classify:
**feature-name-only**. Useful as narrative, useless as a field source.

The word "routing" is a genuine three-way homonym in this product and the build should carry
the distinction explicitly:
1. **Routing Configuration** (built) = employee→hierarchy mapping import → invoice *ownership*.
2. **approval routing** = the ordered approval chain → Workflows > Steps + Step Rules.
3. **Invoice Routing feature hierarchy** = the hierarchy object → Feature Hierarchies page.

### Boundary against Audit Rules / Exceptions (Group 2, already built)

Exceptions is a hub, as the brief says. The audit rule assigns an exception a **level**
(built, `field.audit-rules.exception-level`). The **threshold at which that level blocks** is a
Workflows > Settings tab control (three of them: invoice, PR, PO). Those are different fields on
different pages and both sides are needed. `dep.g2ar.024` already states this correctly. Do not
re-home the Audit Rules exception-level field; do add the three threshold fields here.
`exception-helper-within-the-audit-rules-and-workflow-tools-07dfd781.md` confirms both tools
share the Exception Helper dialog — that is a shared *dialog*, not a page for either group.

---

## 7. FINDING (5) — END-USER TRAPS. Every rejection names where its configuration lives.

| rejected screen | evidence it is runtime | WHERE ITS CONFIGURATION LIVES |
|---|---|---|
| **Approval Flow page** (`approval-flow-page-c73e063f.md`) | "The Approval Flow for Invoice page appears by clicking Details > Approval Flow in an opened invoice in the legacy UI." | Workflows > Workflows tab > **General page**: *Steps Can Be Added By*, *Do not display the skip steps to the employee*, *Restrict Authorized Approver for*, *Restrict approvers to those with limit/exception authority for employee-added steps*; Workflows > **Steps page**: *Approver Editable By*, *Deletable By*; Workflows > **Settings tab**: *Allow users to select their own approver for payment requests*. |
| **Approve / Send Back to Employee links under My Work on the home page** | described in `invoice-settings-cace748d.md` and `purchase-request-settings-b0bce285.md` | Workflows > **Settings tab**: *Display payment request approval links to approvers on the home page* / *Display purchase request approval links to approvers on the home page*. |
| **Requests Pending Your Approval window** | named in `purchase-request-settings-b0bce285.md` | same — Workflows > Settings tab, the purchase-request member. |
| **Approver experience / approver UI** (`approver-experience-8b30e784.md`, `approver-user-interface-8b3cba3e.md`, `approver-and-processor-experience-021fc80a.md`, `what-happens-when-an-approver-clicks-an-approval-action-89053b3f.md`, all `approver-action-*.md`) | runtime narratives of clicking Approve/Send Back | The **actions offered** are configured on Workflows > Steps page, *Approval Actions* field (`work-with-the-steps-page-fab249d1.md`: "the system displays a multiple selection list of actions to the approver in the Approval Actions field. The Workflow administrator can select which of these actions should be available"). The **button text and resulting status** come from Workflows > **Approval Statuses tab > Invoice tab** (*Status*, *Action Text*, *Description*, *Editable By Group(s)*). |
| **Recall** (employee recalls a submitted invoice) | runtime action | Workflows > General page: *Allow employee to recall payment requests*; processor-side recall: Workflows > Settings tab, *Allow processor to recall a payment request to last processor step*. |
| **Delegate / proxy switching, "acting as"** (`delegate-experience-8b30fb06.md`, `delegates-submit-a-payment-or-purchase-request-0ee0f0b9.md`, `when-the-delegate-cannot-submit-53c9cb69.md`) | runtime | **Delegate Configurations** page (separate left-menu page — see §8) plus Workflows > General page *Allow delegated approvers to approve their own requests*. |
| **Reason code selection when a processor returns an invoice** | runtime, mandatory step for the processor | Workflows > **Reason Category and Codes tab** (`creating-a-reason-code-b2b61596.md`). |
| **Confirmation / Final Review windows on submit and approve** | runtime modal | Workflows > **Confirmation Agreements tab** (creates the agreement) + Workflows > General page *Submit Confirmation Agreement* / *Approval Confirmation Agreement* (selects it). |
| **Invoice Manager / Unassigned Invoice / batch verification / Approvals list** (tools-guides `using-the-invoice-manager-page-new-experience-f83ba5fa.md`, `moving-through-the-batch-verification-workflow-01738020.md`, `view-the-approval-flow-*.md` ×3, `approve-invoices-ff0ac72c.md`) | processor/approver runtime, all in tools-guides | Ownership assignment: **Routing Configuration** (Group 2, built) + **Invoice Settings** (built, *Assign Invoice to Purchase Request Owner*). Verification forms: **Capture Processing Admin** (Group 4, built). None of it is Workflows. |
| **Change Log** (`accessing-the-change-log-8b2b0deb.md`, "From the Invoice Processing Admin menu, select Change Log.") | a real left-menu page, but a **read-only audit viewer** — it configures nothing | Nothing configures it. It is a genuine unclaimed left-menu page and belongs to Group 7 (Ops), not to Workflows. Reported so it is not lost. |

The inverse trap, stated explicitly: **an approval STEP is an admin object and an approver
action at once.** `work-with-the-steps-page-fab249d1.md` (admin: Step Name, Role, Approver
Editable By, Deletable By, Initial Status, Approval Actions) is CONFIG.
`add-approval-steps-2e17fab0.md` and `send-an-invoice-to-an-additional-approver-afd572de.md`
in tools-guides are the *same noun* executed at runtime on the Approval Flow page — NOT config.
Filename alone will not separate them; the discriminator is whether the topic sits in
admin-guides under the Workflows wizard.

---

## 8. THE THREE ADJACENT LEFT-MENU PAGES (not tabs of Workflows)

### Email Reminders — **separate tool, own left-menu entry, own role gate. 14 files, 30,920 B.**
* `access-email-reminders-96f3ca18.md`: "From the Invoice Processing Admin navigation menu,
  choose Email Reminders." → "The Email Reminders page appears."
* `email-reminders-tool-8b2c8a11.md`: "The Email Reminders tool is visible if you have the
  Invoice Configuration administrator (Restricted) role." — a role gate **different** from the
  Workflows gate (Workflows requires Global/Group Invoice Configuration administrator).
* Has its own tabs: `create-reminder-rules-b0a7fac5.md` "On the Email Reminders page, select
  the Rules tab."
* It is workflow-adjacent (reminders fire on *Pending Approval* status) but by this recon's
  own tiebreaker — own left-menu entry AND own role gate — it is a **page, not a tab**.
* **Do not confuse with the Email Notifications tab.** Notifications are event-driven emails
  configured *inside* Workflows and assigned to a workflow; Reminders are scheduled nag emails
  configured on their own page with their own rule engine. Two different surfaces, both
  emailing approvers. This is the single easiest collapse error in this domain.

### Delegate Configurations — **separate tool, own left-menu entry. 17 files, 33,041 B.**
* `access-and-view-payment-delegate-configurations-8ed1298f.md`: "To access the Delegate
  Configurations tool:" → "Select Delegate Configurations (left menu) , the Delegate
  Configurations page appears." → "Select the Invoice or Purchase Request tab."
* Tabs: Invoice / Purchase Request (`create-a-new-invoice-delegate-configuration-fcf42662.md`).
* Governs who may prepare/submit/approve on behalf of whom — this is approval configuration,
  and `dep.g1.059` already names it as an unresolved endpoint (Group Configurations → Delegate
  Configurations, "Each group within your company can only have one Invoice delegate
  configuration"). A **page**, adjacent to Workflows, not inside it.

### Feature Hierarchies — see §5.

---

## 9. NOT PAGES — feature names and guides with no screen of their own

* **Cost Object Approval** (13 files, 20,831 B) — a *guide* and a *feature*. Its controls are
  split across Workflows > General page (*Cost Object Hierarchy Type*, *Allow Self Cost Object
  Approval*), Workflows > Settings tab (*Filter payment request items to those that are
  applicable to Cost Object*), Workflows > Steps page, and Feature Hierarchies (the COA
  hierarchy). `self-approval-of-cost-object-based-workflows-20fd435d.md` is explicit: "To
  configure this, the admin needs to activate this feature in the Workflows tool." No screen
  of its own. **Do not create a Cost Object Approval page.**
* **Authorized Approvers** as a *guide* — the guide is real, the page is not; it is a tab
  (§4). The corpus does say "Authorized Approvers page within Workflows" twice, which is the
  contradiction recorded above; but the only two topics with an actual click path both say tab.
* **Workflow and Approval Routing** — feature-name-only (§6).
* **Purchase Request Workflow / Default PO Payment Workflow / Default Workflows** — these are
  *workflow objects* shipped by default, not pages.
* **Workflow Guides** — a documentation index (§4), not a screen.
* **Exception Helper** — a shared dialog inside both Audit Rules and Workflows.
* **Approve/Forward feature**, **Ad hoc steps**, **Approval Time Expired / timeout** — all
  fields on Workflows > General page, not surfaces.

---

## 10. WHERE THE RICH MATERIAL IS (aim the build here, do not build it now)

1. `create-a-new-workflow-554e86aa.md` — 14,383 B, 85 indent-tolerant table rows, ~25 fields.
   **The General page roster.** Highest-value file in the domain by a wide margin.
2. `work-with-the-step-rules-page-4c33cda0.md` — 11,246 B — Step Rules page, rule/action model.
3. `conditional-expressions-and-the-condition-page-4d98af34.md` — 9,326 B — the condition editor.
4. `work-with-the-steps-page-fab249d1.md` — 6,726 B — Steps page / Add Workflow Step fields.
5. `invoice-settings-cace748d.md` + `purchase-request-settings-b0bce285.md` +
   `purchase-order-settings-a5a997b4.md` — 10,053 B combined — the Settings tab, **9 settings**
   (5 + 3 + 1) once the packed `<tr>` is counted.
6. `authorized-approver-list-a9522ec8.md` (3,773 B) + `procedure-2d20b513.md` (1,554 B) —
   Authorized Approvers tab: Approver, Can approve exception, Approval Limit, Level;
   Configuration sub-tab: feature activation checkbox, Minimum/Maximum Exception Level.
7. `adding-an-invoice-approval-status-d8cbbe5d.md` (1,746 B) + `default-approval-statuses-34c83d58.md`
   (3,405 B, 48 rows) — Approval Statuses tab, 4 fields + the default status catalogue.
8. `add-an-email-notification-c237a2de.md` (3,505 B) + `modify-an-email-notification-a6e5f4ba.md`
   (2,683 B) — Email Notifications tab + its 3-step editor.
9. `create-a-confirmation-agreement-3e153f29.md` (2,293 B) — Confirmation Agreements tab, 4 fields.
10. `creating-a-reason-code-b2b61596.md` (1,284 B) — Reason Category and Codes tab, 2 fields.
11. Adjacent pages if claimed: `create-a-new-invoice-delegate-configuration-fcf42662.md` (6,302 B),
    `access-and-view-payment-delegate-configurations-8ed1298f.md` (3,872 B),
    `create-reminder-rules-b0a7fac5.md` (3,979 B), `create-email-reminders-604c4a46.md`.

### New Experience

**There is no New Experience twin anywhere in the workflow/approval configuration area.**
`ls | grep -i new-experience` over admin-guides returns exactly three files
(`end-user-experience-`, `policies-the-purchase-order-policy-`, `purchase-order-matching-rules-`),
none of them workflow. A `grep -c "New Experience"` over every admin-guides file whose name
contains workflow/approv/reminder/delegate/notification returns **0 on every file**. The two
tools-guides NE files (`using-the-invoice-manager-page-new-experience-f83ba5fa.md`,
`using-the-unassigned-invoice-page-new-experience-072e2f18.md`) are processor runtime screens,
not config. Conclusion: **the Workflows admin surface is documented in legacy form only.** If
the automation targets New Experience, the Workflows page is the one config area where the
corpus offers no NE guidance at all — flag that as a build risk, not as a missing page.

`approval-flow-page-c73e063f.md` is the only workflow-area topic that acknowledges both UIs
("in the legacy UI. In the new UI, users click Actions > Approval Flow") — and it is an
end-user page.

---

## 11. FINAL ROSTER PROPOSED BY THIS SWEEP

**1 page** with **7 tabs** (2 of which have sub-tabs) and **1 embedded 3-step wizard**, plus
**3 adjacent left-menu pages** that this group should claim or explicitly hand off:

```
Workflows                              [PAGE, high confidence]
 ├─ Workflows tab                      [TAB]  → General → Steps → Step Rules   [WIZARD]
 ├─ Settings tab                       [TAB]  ← Invoice / Purchase Request / Purchase Order Settings
 ├─ Email Notifications tab            [TAB]  → Modify Email Notification      [WIZARD]
 ├─ Authorized Approvers tab           [TAB]  → Configuration | Authorized Approver List [SUB-TABS]
 ├─ Approval Statuses tab              [TAB]  → Invoice | Purchase Request      [SUB-TABS]
 ├─ Confirmation Agreements tab        [TAB]
 └─ Reason Category and Codes tab      [TAB, own role gate]

Email Reminders                        [PAGE, own left-menu entry + own role gate]
Delegate Configurations                [PAGE, own left-menu entry]
Feature Hierarchies                    [PAGE, own left-menu entry + own role gate, shared prerequisite]
```

That is **4 pages**, not 13. If the lost map's 13 rows sat under one left-menu entry, the most
likely reading is that it counted the seven tabs + General/Steps/Step Rules + the adjacent
pages as rows. **Thin is the correct answer here, and the thinness is itself the finding:**
SAP documented this area as four *guides* and one *page*, and the guide count is what inflates
the apparent page count.

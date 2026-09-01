# Sweep E — GRAPHREFS: Workflow / Approval page-identity recon

Sweep: **graphrefs** (entry vector = the existing knowledge graph's own forward references, then corroborated into the corpus)
Date: 2026-08-31 · Corpus 2026_08, Professional Edition, crawled 2026-08-29
Graph read: `/mnt/c/Users/manci/PROJECTS/concur-config-diver-support/output/kg-invoice-config.json` (v0.6.0, 20 pages / 486 fields / 375 deps / 34 steps / 36 contradictions)

---

## HEADLINE

**Workflows is ONE page with SEVEN top-level tabs, not thirteen pages and not one flat page.** The corpus
attests a single left-menu entry (`Administration > Invoice > Invoice Processing Admin > Workflows`,
13 independent click paths) opening a page whose tabs are **Workflows, Approval Statuses, Email
Notifications, Settings, Authorized Approvers, Confirmation Agreements, and Reason Category and Codes**.
Two of those tabs carry their own nested tabs. **All three members of the Invoice/PR/PO "Settings"
family live on the Workflows > Settings tab — including the invoice member**, which means
`invoice-settings-cace748d.md` is *not* Invoice Settings page content and must not be re-homed there.
Feature Hierarchies is a real, separate left-menu page that belongs to nobody yet.

---

## 1. WHAT I READ OUT OF THE GRAPH (Sweep E task 1–5)

### 1.1 Unresolved dependency endpoints, ranked (239 total unresolved endpoint references)

All eight seed counts **VERIFIED EXACTLY**:

| count | page name on the unresolved endpoint |
|---|---|
| 36 | Audit Rules |
| 16 | Policies |
| 13 | Forms and Fields |
| 11 | Invoice |
| **9** | **Workflows** ✔ (seed said 9) |
| 9 | Capture Processing Admin |
| 9 | Capture Processing > Verification tab |
| 7 | Invoice Settings |
| **5** | **User Permissions** ✔ |
| **4** | **Feature Hierarchies** ✔ |
| **1** | **Purchase Request Settings** ✔ |
| **1** | **Purchase Order Settings** ✔ |
| **1** | **Delegate Configurations** ✔ |
| **1** | **Employee Import** ✔ |
| **1** | **User Administration** ✔ |

### 1.2 The nine Workflows endpoints, read and followed into the corpus

| dep id | field slot | what the sourceQuote actually says | verdict |
|---|---|---|---|
| dep.g1.021 | "workflow deletion" | *"The system does not allow you to delete a workflow that is currently assigned to a policy."* | about the **workflow OBJECT**, not a control. Lifecycle rule on the Workflows tab. |
| dep.g1.026 | "Workflow" | *"Once you have created the workflow, you must associate it to a policy."* | the **OBJECT** again. Confirms Workflows tab is where objects are built. |
| dep.g2.014 | "Settings" | *"A workflow setting exists that prevents an invoice from being submitted if it has an exception of a certain level."* | names the **Settings tab**. Real. |
| dep.g4.045 | "invoice submission for approval" | e-Bunsho timestamp gate | **runtime behaviour**, not a control. No Workflows field here. |
| dep.g2ar.021 | `workflow_first_step` | Audit Rules event semantics | **Audit Rules condition token**, per the brief's warning. Not a Workflows control. |
| dep.g2ar.023 | `workflow_first_step` | same | same — Audit Rules side. |
| dep.g2ar.022 | `workflow_approval_steps` | random-rule timing | same — Audit Rules side. |
| dep.g2ar.024 | `exception_level_limit` | **"The limit is set using the Invoice Admin, Workflows, and Settings."** | **the single best navigation quote in the whole sweep.** Names the Settings tab as the home of the blocking threshold. |
| dep.g2ar.026 | `exception_level_limit` | *"Depending on your exception level settings, it may prevent invoice submission."* | same target. |

**Net:** of nine Workflows endpoints, **only three (g2.014, g2ar.024, g2ar.026) point at a real Workflows
control**, and all three point at the *same* control on the *same* tab — the exception-level submission
block on **Workflows > Settings**. Four are Audit Rules tokens; two are the workflow object's lifecycle.
The "9 Workflows endpoints" signal is real but much narrower than its count suggests.

### 1.3 ConfigStep sequence entries naming pages not in configPages

Zero workflow pages. The 14 non-page `sequence[].page` values are all Audit Rules tabs/wizard
steps (Conditions 46, Random 12, New Exception 11, Audit Rule 10, Exception 10, Validation 9,
Validation Rule 8, Custom Rules 7, Rule Type 4, Custom Audit Rule List 4, Actions 3,
Create New Custom Audit Rule 3, Quick View 2) plus `Administration > Invoice` 6. **No workflow
surface leaked into any step sequence.**

### 1.4 Notes naming a workflow surface

- `field.policies.invoice-workflow` notes: *"Options are workflows built in the Workflows area of the Administrator"* — the Policies group already recorded that workflows are built elsewhere.
- step `g1-s1` rationale carries the corpus quote *"You create invoice workflows in the Workflows area of the Administrator."*
- step `g2-blocking-exception-audit-rule` rationale: *"All exceptions created in the Exceptions page appear as options for the Audit Rules tool and Workflows tool when creating rules."* — **"Workflows tool"** as a peer of "Audit Rules tool".
- `field.image-handling.imagehandlingexceptionshelperpane` notes: the Exceptions helper pane is *"shared with Audit Rules, Workflows, and Invoice Processor"*.
- `field.audit-rules.and-or` notes quote the corpus: *"The Condition page in Audit Rules is similar to the Condition page used for Workflow and Processor."* — implies a **Workflow Condition editor** exists (it does: the Step Rules page).

### 1.5 ConfigContradictions touching the workflow area

**NONE.** The only contradiction whose text matches workflow terms is `contr.g3.010` (three-way
matching rule count), which is a PO Matching issue, not a workflow issue. The workflow area enters
this build with **zero inherited contradictions** — every contradiction below is new to this sweep.

### 1.6 THE 10 FIELD NAMES ON THE BUILT ROUTING CONFIGURATION PAGE (finding 4)

`page.routing-configuration`, navPath `Administration > Invoice > Invoice Processing Admin > Routing Configuration`,
url `/expense/admin/invoice/routingConfig.asp`, coverage `good`. Verbatim, with sourceFiles:

| # | label | name | sourceFile (all tools-guides) |
|---|---|---|---|
| 1 | **Search Routing Mappings** | search_routing_mappings | search-for-hierarchy-mappings-1dea6bb6.md |
| 2 | **Employee Last Name** | employee_last_name | search-for-hierarchy-mappings-1dea6bb6.md |
| 3 | **Segment 1 - 3** | segment_1_3 | search-for-hierarchy-mappings-1dea6bb6.md |
| 4 | **Delete?** | delete_flag | the-import-template-fields-and-descriptions-8b4aa547.md |
| 5 | **Employee ID** | employee_id | the-import-template-fields-and-descriptions-8b4aa547.md |
| 6 | **Level 1 Code - Level 10 Code** | level_1_10_code | the-import-template-fields-and-descriptions-8b4aa547.md |
| 7 | **Browse** | browse_button | step-3-upload-and-import-template-and-data-b9a80bb6.md |
| 8 | **Import** | import_button | step-3-upload-and-import-template-and-data-b9a80bb6.md |
| 9 | **Download Template** | download_template_button | step-1-download-hierarchy-mappings-template-excel-spreadsheet-d981b372.md |
| 10 | **Type** (Import Details filter) | import_details_type_filter | step-4-review-import-details-414c8cd5.md |

**BOUNDARY VERDICT (finding 4): the boundary is clean and wide.** Routing Configuration as built is
*entirely* a hierarchy-mapping import/search utility (invoice **owner** auto-assignment). It contains
**no approver, no step, no rule, no notification, no exception-threshold control**. Nothing this sweep
proposes collides with any of those 10. There is **no mis-homing to report** — I checked every one.

`tools-guides/workflow-and-approval-routing-8b4ff6c9.md` (1,502 B) **falls on the WORKFLOWS side, not
Routing Configuration** — despite the word "routing" in its title it never mentions hierarchy mappings,
Level codes or the Routing Configuration page. It is prose best-practice guidance
(*"All workflow options available for non-PO policies are also available to a PO-based invoice policy."*)
that defers outward to the *Concur Invoice: Workflows – General Information Setup Guide*. It names **no
page and no click path**, so it is a FEATURE-NAME-ONLY topic and must not become a node.

---

## 2. TWO NAMES THE BRIEF ASKED ME TO TEST HARDEST — AND A CORRECTION TO THE BRIEF

The brief says *"The graph already carries endpoint references to four distinct workflow surfaces:
'Workflows', 'Workflows > Settings tab', an 'Email Notifications tab', and 'Approval Statuses >
Purchase Request'."*

**That is not true of the graph.** Verified by raw string count over the whole 1.84 MB JSON:

```
"Approval Statuses"     -> 0 occurrences
"Email Notifications"   -> 0 occurrences
"Workflows > Settings"  -> 1 occurrence
```

So:

- **"Approval Statuses > Purchase Request" and "Email Notifications tab" appear NOWHERE in the graph.**
  They came from the lost handoff map, not from any built group. They are therefore *not* independent
  graph corroboration and must not be cited as such.
- **They are, however, both fully corroborated in the CORPUS** — verbatim — so they are not previous-agent
  inventions either. `"Administration > Invoice > Workflows > Approval Statuses > Purchase Request"`
  is a literal string in `work-with-purchase-requests-approvals-1c39ee21.md`. `"Select the Email
  Notifications tab."` is literal in `access-email-notifications-9f806b0b.md`, and six other files
  use the label. **Both are real, and both are TABS, not pages.**
- **The single "Workflows > Settings" occurrence is a GRAPH DEFECT.** It is
  `nodes.configPages[4].navPathAlternates[0]` — i.e. it is attached to **`page.exceptions`**, whose
  primary navPath is `Administration > Invoice > Invoice Processing Admin > Exceptions`. The Group 2
  agent found the corpus sentence *"The limit is set using the Invoice Admin, Workflows, and Settings."*
  and, having no Workflows page to hang it on, filed it as an alternate path for **Exceptions**. It is
  not an Exceptions path. **Recommendation: on this group's build, move that alternate off
  `page.exceptions` onto the new Workflows page's Settings tab.** This is a finding about existing
  graph quality, exactly the kind this sweep exists to produce.

**No name I recovered turned out to be a previous agent's invention.** The one page node in the graph
with no documentary basis is `page.budget-configuration`, and its own `identityNotes` already say so
honestly; it is not a workflow surface.

---

## 3. FINDING (1) — WHERE THE THREE-SIBLING SETTINGS FAMILY LIVES. **ANSWER: (a). ALL THREE.**

### 3.1 The clincher, reproduced

```
$ grep -c "select their own approver" .../available-invoice-settings-8b3411f0.md   -> 0
$ grep -c "select their own approver" .../invoice-settings-cace748d.md             -> 2
```
Both reproduce exactly as stated. Byte counts from `ls -la`:
`available-invoice-settings-8b3411f0.md` **8,368 B**; `invoice-settings-cace748d.md` **4,901 B**;
`purchase-request-settings-b0bce285.md` **3,735 B**; `purchase-order-settings-a5a997b4.md` **1,417 B**.

### 3.2 Graph verification — ZERO fields cite the invoice member

Confirmed with python3 over `configFields`: **no field anywhere in the graph has
`sourceFile == ".../invoice-settings-cace748d.md"`.** Its single appearance in the whole JSON is
`configDependencies[91].sourceFile` (= `dep.g2.011`), whose `targetRef` is
`{page: "Invoice Settings", field: "Prevent this payment request submission when exception level
exceeds X", resolved: **false**}` — **unresolved even though `page.invoice-settings` exists**, because
the field was never built. That unresolved-against-an-existing-page state is itself the tell.

The 9 file-cited Invoice Settings fields all come from `available-invoice-settings-8b3411f0.md`
(+4 from four single-setting topics, all of which say *"On the Invoice Settings page…"*).

### 3.3 The decisive click-path evidence — three independent attestations

1. **PO member.** `preventing-po-transmittal-when-po-exceeds-specified-exception-level-51b11602.md`:
   *"A setting in Workflows can be used to prevent PO transmission if the PO exceeds a specified
   exception level."* and the path (NBSP-separated, no `>` characters):
   `The setting appears in Administration  Invoice  Workflows  Settings tab and is shown in the following figure.`
2. **Invoice member.** `create-a-new-workflow-554e86aa.md`, inside the Workflows *General page* field
   table: *"If you have the Allow users to select their own approver for payment requests field on the
   **Settings page** cleared (disabled)…"* — i.e. the workflow author is told to check a *sibling
   surface of the same tool*, not a different admin page. Corroborated by
   `approver-terminology-8559861c.md`: *"the Allow users to select their own approver for payment
   requests flag is set in **Workflow Settings**"*.
3. **The version history nails all three.** `general-information-8b3b0308.md` (6,719 B) — the Workflows
   guide's own revision table:
   - *"New Settings tab option: Prevent purchase order transmissions setting."* (June 14, 2013) → **PO member**
   - *"Addition of two new options to the Settings tab:"* followed by *"Filter invoice items to those
     that are applicable to Cost Object"* and *"Allow processor to recall an invoice to last processor
     step"* (May 16, 2014) → **the invoice member's own rows** (`invoice-settings-cace748d.md` carries
     "Filter payment request items to those that are applicable to Cost Object" and "Allow processor
     to recall a payment request to last processor step").

That last one is the kill shot: **two of the invoice member's settings are named, by SAP's own
revision history, as additions to the Workflows Settings tab.**

### 3.4 The answer, stated plainly

**(a) — all three are surfaces of the same place: the SETTINGS TAB of the WORKFLOWS PAGE.**
Option (c) is refuted: the invoice member does **not** belong to the built Invoice Settings page.
Since zero graph fields cite it, this is **not** Invoice Settings rebuild debt either — nothing was
built wrong; the content was simply never built. **This group may claim it.** The only correction
owed to Group 1 is `dep.g2.011`, whose `targetRef.page` should be retargeted from "Invoice Settings"
to the Workflows Settings tab when this group builds.

### 3.5 Census correction the build must carry

The inherited brief calls `invoice-settings-cace748d.md` "a 3-row Setting|Description table". **It is
five settings, not three**, and the split is exactly the PACKED-`<tr>` trap:

```
invoice-settings-cace748d.md   bytes=4901  pipeRows(grep -cP '^\s*\|')=10  <tr=3  <p=6  <table=1
purchase-request-settings-...  bytes=3735  pipeRows=13  <tr=0  <p=0  <table=0
purchase-order-settings-...    bytes=1417  pipeRows=7   <tr=0  <p=0  <table=0
```
Two settings sit in the markdown table (Allow users to select their own approver for payment requests;
Display payment request approval links to approvers on the home page) and **three more sit in a raw
`<table>` with 3 `<tr>` / 6 `<p>`** (Prevent this payment request submission when exception level
exceeds X; Filter payment request items to those that are applicable to Cost Object; Allow processor
to recall a payment request to last processor step). A markdown-only extractor loses 3 of 5.

### 3.6 PROSE NUMERIC RANGE — flagged for the build

`"Type a number from one to 99."` occurs verbatim in **all three** siblings. No digit-based range regex
will find it. The same range is spelled `"Type any number between 0 and 99."` on the Exceptions page
(different lower bound — 0 vs one — which is a genuine cross-page value discrepancy worth a
contradiction node when this is built).

---

## 4. FINDING (2) — IS "WORKFLOWS" ONE PAGE OR SEVERAL? **ONE PAGE, SEVEN TABS.**

### 4.1 The tiebreaker the brief specified: left-menu entry + role gate

**Workflows has its own left-menu entry.** Corpus-wide enumeration of menu entries:
`grep -rhoE "Invoice Processing Admin (menu|list),? (click|select|choose) [A-Za-z &]+"` returns
Workflows **5 times** (3× "select Workflows", 2× "click Workflows") — second only to Policies (4).
`grep -rhoE "Click [A-Z][A-Za-z &]+ \(left menu\)"` returns `Click Workflows (left menu)` twice, and
the fuller form `Click Administration > Invoice > Workflows (left menu). The Workflows page appears.`
appears in six more files. **Thirteen distinct click-path attestations in total.** That is a page.

**Workflows has its own role gate**, stated as a page-level fact:
*"Both the Global Invoice Configuration administrator and the Group Invoice Configuration administrator
can view the Workflows tool."* (`workflows-tool-8b3b4dbe.md`), and — **release note** — *"The Invoice
Configuration Administrator (Restricted) can view invoice configuration settings for Workflows,
Policies, Group Configurations, and Forms and Fields."* with *"This role has read-only access;
therefore, actions such as New, Copy, and Remove are disabled."*

### 4.2 Everything below it is reached only by a tab click. Nothing else has a left-menu entry.

`access-workflow-fa9892a7.md` settles the containment in one sentence:
**"The Workflows tab on the Workflows page appears."** — the page and the tab share a name; the tab
is the default landing tab. This is the Audit-Rules precedent (one page, N tabs, do not split),
**not** the Forms-and-Fields precedent — because no candidate below has an independent entry point.

**The seven tabs, each with a verbatim click path:**

| tab | attesting quote | file |
|---|---|---|
| **Workflows** | "The Workflows tab on the Workflows page appears." | access-workflow-fa9892a7.md |
| **Approval Statuses** | "Select the Approval Statuses tab." (step 3 after "click Workflows") | accessing-the-approval-statuses-tab-7ec7bb6e.md |
| **Email Notifications** | "Select the Email Notifications tab." (step 3 after "Click Workflows") | access-email-notifications-9f806b0b.md |
| **Settings** | "The setting appears in Administration  Invoice  Workflows  Settings tab…" | preventing-po-transmittal-…-51b11602.md |
| **Authorized Approvers** | "Click the Authorized Approvers tab." (step 2 after the left-menu click) | authorized-approver-list-a9522ec8.md |
| **Confirmation Agreements** | "Select the Confirmation Agreements tab." (step 3 after "select Workflows") | access-the-confirmation-agreement-tab-666fa0ac.md |
| **Reason Category and Codes** | "Click the Reason Category and Codes tab." | creating-a-reason-code-b2b61596.md |

Two tabs carry **nested tabs**:
- **Approval Statuses → { Invoice tab, Purchase Request tab }** — *"Click Approval Statuses tab, and
  then the Invoice tab."* and *"Administration > Invoice > Workflows > Approval Statuses > Purchase Request"*.
- **Authorized Approvers → { Configuration tab, Authorized Approver List tab }** — *"Click the
  Authorized Approvers tab and then the Authorized Approver List tab."* and, in `procedure-2d20b513.md`,
  *"Click the Authorized Approvers tab." → "Click the Configuration tab."*

**Wizard pages inside the Workflows tab** (opened by Copy/Modify on a workflow OBJECT — no independent
path): **General page → Steps page → Step Rules page**. Corroborated by **release note**:
*"View the list of Workflows and click on each item to view General, Steps, and Step Rules details"*.
Windows/dialogs beneath them: Add Workflow Step, New Authorized Approver, Modify Email Notification
(General / Primary Recipient steps), Request Status, Report Status, Edit Action.

### 4.3 PAGE vs OBJECT — the distinction the brief warned about

`create-a-new-workflow-15992497.md` (2,017 B) and `create-a-new-workflow-554e86aa.md` (14,383 B) share
a title and differ in loio (`1599249793e4…` vs `554e86aad449…`) and in content — **they are NOT
duplicates and NOT UI variants.** The small one is *policy* prose about the object
(*"To create a new workflow, an administrator must copy an existing invoice workflow"*); the large one
is the **General page field roster (~24 fields)** and is the single richest workflow file in the corpus.
Both describe the **workflow OBJECT**, edited on the Workflows tab. Neither is a page.

Likewise the **four `workflow-guides-*.md`** (8b3b85da 1,473 B / 8b3c7b2a 1,784 B / 8b3d6ede 1,769 B /
8b3e09a7 1,663 B) — four distinct loios, **same four-row table of external Setup Guide names**,
differing only in the AI summary paragraph and italic markup. Republished stubs. **No page. No fields.**

### 4.4 CONTRADICTIONS TO RECORD (all new; the graph carries none here)

1. **Entry-menu contradiction.** `access-workflow-fa9892a7.md` and `accessing-the-approval-statuses-tab-7ec7bb6e.md`
   route via the middle node: *"From the Invoice Processing Admin menu, click Workflows."*
   Six other files route directly: *"Click Administration > Invoice > Workflows (left menu)."*
   Per the brief's own rule this is likely abbreviation, not a second page — but **record both**.
2. **Settings surface-type contradiction, four-way.** The same surface is called a **tab**
   ("Workflows  Settings tab"), a **page** ("the Settings page" / "On the Workflow Settings page,
   select a setting option."), a **section** ("the Settings section of the Workflows tool"), and is
   addressed as a bare menu triple ("the Invoice Admin, Workflows, and Settings"). Do not reconcile.
3. **Authorized Approvers surface-type contradiction, four-way.** "the Authorized Approvers **tab**"
   (step-4-assign-the-proper-rights-to-users-82481079.md) / "the Workflows, Authorized Approvers
   **page**" (approver-terminology-8559861c.md) / "the Authorized Approvers **section** of the
   Workflows tool" + "the Add Authorized Approvers **page** within Workflows"
   (workflow-creation-process-1d37b85f.md) / "the Authorized Approvers **link** from workflows in the
   classic interface" (tools-guides/how-single-step-approval-workflow-works-40145f24.md).
4. **Singular/plural tab-label drift.** `Administration > Invoice > Workflows > **Workflow tab**`
   (managing-items-on-purchase-request-belonging-to-the-same-vendor-37e7bf0f.md) vs "Workflows tab"
   everywhere else; and `Administration > Invoice > Workflows > **Authorized Approver tab**`
   (configuration-8b3be88b.md) vs "Authorized Approvers tab".
5. **Role-gate contradiction on Reason Category and Codes.** The release note says the Restricted role
   has **read-only** access to Workflows ("New, Copy, and Remove are disabled"), yet
   `creating-a-reason-code-b2b61596.md` says *"The Invoice Configuration administrator (_Restricted_)
   role is required to use the options on this tab"* and walks it through **Click New → Save**. Either
   this tab is carved out of the read-only rule, or one of the two is stale. **Unresolved — flag it.**
6. **Historical rename (from the guide's own revision table, not a release note):** *"Updated images to
   reflect change of Payment Request Approval Statuses tab to Approval Statuses tab."* (Sept 9, 2016).
   This is the alias **"Payment Request Approval Statuses"** that no current topic justifies.

---

## 5. FINDING (3) — DOES FEATURE HIERARCHIES BELONG TO THIS GROUP? **NO. IT IS ITS OWN THING.**

Refusing to leave it unclaimed a second time, here is the evidence-based verdict.

**It is unquestionably a page.** *"Click Feature Hierarchies (left menu)."*
(tools-guides/step-2-associate-the-feature-hierarchy-to-the-source-list-bcaf1f5a.md) and
*"Go to Administration   Invoice   Feature Hierarchies."* (admin-guides/professional-edition-fb3e6aa2.md).
It sits **directly under Administration > Invoice — NOT under Invoice Processing Admin** — the only
workflow-adjacent surface with that property. Its object editor is reached by **Modify Hierarchy**.

**It is a genuine Workflows prerequisite** — `workflow-667cee21.md`: *"PR hierarchies are set up
independently, including Authorized Approval and COA."* (these being the Authorized Approver hierarchy
that feeds the Workflows > Authorized Approvers tab, and the Cost Object Approver hierarchy);
`step-1-define-the-cost-object-approver-hierarchy-6e7b7dc6.md`: *"This portion of the configuration
requires permissions for the Feature Hierarchies section in Administration."*

**But it serves at least four different domains, and the workflow ones are a minority.** The named
feature hierarchies in the corpus are **Invoice Routing** (→ Routing Configuration, Group 2),
**Invoice Vendor Employee Access** (→ Group Configurations / Vendor Access, Groups 1/4),
**Invoice Payment** (→ Payment Group Configuration, an Ops surface), plus **Authorized Approver** and
**Cost Object Approver** (→ Workflows). The graph's four unresolved endpoints (dep.g1.061, g2.003,
g5g5.050, g5g5.051) are **all Source List, and none is workflow-side**. 17 files mention it across both
directories; the richest workflow-relevant one is only 1,291 B.

**Coverage is thin by design: SAP defers it outward.** *"refer to Shared: Feature Hierarchies Setup
Guide"* appears repeatedly, and `tools-guides/additional-documentation-a105a5d7.md` lists it as an
external guide. **That guide is not in this corpus** — the same failure mode that made Budget
Configuration a zero-field page.

**VERDICT: Feature Hierarchies is a real, distinct, cross-cutting left-menu page that belongs to
NEITHER Workflows nor Routing Configuration.** It is a shared prerequisite of at least four groups.
Recommendation: build it **once, as its own single-page mini-group**, with explicit `precedes` edges
into Routing Configuration (`level_1_10_code`), Group Configurations (`Group Name`), and the Workflows
Authorized Approvers tab — and set its coverage honestly to `thin`, citing the external-guide deferral.
**Do not fold it into Workflows**; a Chromium driver reaching it via a Workflows path would fail,
because it hangs off Administration > Invoice, not off Invoice Processing Admin.

---

## 6. FINDING (5) — END-USER TRAPS, EACH WITH ITS CONFIGURATION HOME NAMED

Every one of these is documented, some richly. None is a config page. **Where the settings live:**

| rejected end-user surface | where its configuration lives |
|---|---|
| **Approval Flow page** (approval-flow-page-c73e063f.md, 2,943 B) — *"clicking Details > Approval Flow in an opened invoice in the legacy UI. In the new UI, users click Actions > Approval Flow."* | **Workflows > Workflows tab > General page**: `Steps Can Be Added By`, `Do not display the skip steps to the employee`, `Restrict Authorized Approver for`, `Restrict approvers to those with limit/exception authority for employee-added steps`, `Use default approver at or above the current approver's level`. Plus **Workflows > Settings tab**: `Allow users to select their own approver for payment requests`. |
| **Requests Pending Your Approval window** | **Workflows > Settings tab**: `Display purchase request approval links to approvers on the home page` (PR sibling) — the corpus literally says the links *"appear as buttons in the Requests Pending Your Approval window"*. |
| **My Work approval links on the home page** | **Workflows > Settings tab**: `Display payment request approval links to approvers on the home page`. |
| **Approve / Send Back to Employee / Recall buttons** | Button text comes from **Workflows > Approval Statuses tab > Invoice tab**, field `Action Text` (*"This text becomes button text for the approver."*). Recall availability comes from **General page**: `Allow employee to recall payment requests`. Processor recall comes from **Settings tab**: `Allow processor to recall a payment request to last processor step`. |
| **Add Approval Steps** (tools-guides/add-approval-steps-2e17fab0.md) — Invoice Processor adding approvers at runtime | **General page**: `Steps Can Be Added By`, `Allow ad-hoc steps after final processor step`, `Email employee when employee-added step is complete`. |
| **Invoice Manager page / Unassigned Invoice page (New Experience)** | Processor runtime lists. Their content is governed by **Policies**, **Routing Configuration** (owner assignment) and **Forms and Fields** — all already built. Nothing here for Workflows. |
| **View the approval flow / View the approval workflow of an invoice** (5 near-duplicate tools-guides topics) | Read-only runtime views of the object configured on **Workflows > Workflows tab**. |
| **Moving through the batch verification workflow** (tools-guides/moving-through-the-batch-verification-workflow-01738020.md) | Not an approval workflow at all — it is **Capture Processing Admin > Task Definitions / Verification**, already built in Group 4. Pure name collision on the word "workflow". |
| **Delegate / proxy switching, delegate experience** | **Delegate Configurations page** (see §7) — `Can Prepare`, `Can Approve`, `Delegate can view invoice images for payment requests`; plus **General page**: `Allow delegated approvers to approve their own requests`. |
| **Approver experience / approver actions / what happens when an approver clicks an approval action** (~15 small topics, 844–3,037 B) | **Workflows > Approval Statuses tab** (the status and its Action Text) and **General page** (self-approval, skip-if-already-approved). |
| **Purchase request approver experience, approve-and-forward** | **General page**: `Steps Can Be Added By` (Approve & Forward requires Approver or Both), plus **Approval Statuses > Purchase Request tab**. |

---

## 7. THE ONE CANDIDATE ONLY THIS SWEEP MAY SURFACE: DELEGATE CONFIGURATIONS

The graph's `dep.g1.059` carries an unresolved endpoint `{page: "Delegate Configurations", field:
"Delegate Configuration"}` with the hard-cardinality quote *"Each group within your company can only
have one Invoice delegate configuration."* Following it into the corpus proves a real page:

- *"To access the Delegate Configurations tool:"* → *"Select Administration > Invoice."* →
  **"Select Delegate Configurations (left menu) , the Delegate Configurations page appears."**
  (`access-and-view-payment-delegate-configurations-8ed1298f.md`, 3,872 B — note the stray space before
  the comma, a grep trap).
- Two tabs: *"On the Delegate Configurations page, select either the Invoice or Purchase Request tab."*
- Its own object editor: *"Choose New. The Add Delegate Configuration - Invoice page appears."* and
  *"Select Modify. The Modify Delegate Configuration page appears."*
- Richest file `create-a-new-invoice-delegate-configuration-fcf42662.md` (6,302 B).

**Page-hood: YES — own left-menu entry directly under Administration > Invoice.** Domain: approval-
adjacent (delegates inherit an authorized approver's limits and exception authority per
`approver-terminology-8559861c.md`) but structurally a **separate page**, not a Workflows tab. I recommend
it be **claimed by this group as a second page**, because its only cross-references are to Workflows
(`Allow delegated approvers to approve their own requests` sits on the Workflows General page) and it
is currently claimed by nobody.

---

## 8. UI VARIANTS — NEW EXPERIENCE

**There is NO New Experience twin anywhere in the workflow admin area.** Exhaustive filename census:
exactly **5** `*-new-experience-*` files exist across both guide directories, and all five are outside
this area — `policies-the-purchase-order-policy-new-experience-5a1ba7ef.md`,
`purchase-order-matching-rules-new-experience-6c8fb80f.md`,
`end-user-experience-new-experience-85c2652b.md`,
`tools-guides/using-the-invoice-manager-page-new-experience-f83ba5fa.md`,
`tools-guides/using-the-unassigned-invoice-page-new-experience-072e2f18.md`.

Two weaker UI-variant signals do exist and should be recorded as `uiVariant: legacy-only-documented`:
- **release-note-adjacent, from the guide's revision table:** *"Updated images and text to the new UI
  for the Workflows Tool"* (September 19, 2025) — the tool got a visual refresh, but SAP republished
  **one** topic set, not a twin pair.
- `tools-guides/how-single-step-approval-workflow-works-40145f24.md`: *"uses the Authorized Approvers
  link from workflows in the **classic interface**"* — implies a non-classic path exists but never
  documents it.
- `approval-flow-page-c73e063f.md` documents both UIs **in one topic**: *"in the legacy UI. In the new
  UI, users click Actions > Approval Flow."* — and that is the end-user page, not the admin page.

**Consequence for the Chromium automation:** the Workflows admin surface must be driven against the
legacy/classic admin UI, because that is the only variant the 2026_08 corpus documents.

## 9. RELEASE-NOTE SWEEP RESULT

Searched both release-note directories (138 + 233 files) for `Workflows tool|Workflows page|Workflows
tab|Workflows > |Invoice > Workflows|Workflow Settings|Approval Statuses|Email Notifications tab`.
**Exactly one hit**, and it is a good one: `release-notes/updated-read-only-access-for-invoice-
configuration-administrator-restricted-role-6df11845.md` (4,547 B, published July 11 2025) — cited
throughout above as **a release note**. It independently corroborates: the page name ("Workflows
Page" heading), the Invoice Processing Admin containment, the General/Steps/Step Rules wizard chain,
the Approval Statuses tab, the Settings tab, and the Restricted-role read-only gate.

Searched both directories for `renamed|new name|is now called`: **no workflow admin rename exists.**
Every rename found is end-user PO-invoice UI (buttons on the Purchase Order tab, "Recurring Invoices"
→ "Setup Recurrence", allocation "Distribute" → "Allocate"). **The only workflow-area rename in the
whole corpus is the 2016 "Payment Request Approval Statuses tab" → "Approval Statuses tab", and it is
recorded in an admin-guide revision table, not a release note.**

## 10. WHAT I DID NOT DO

No fields extracted. No settings tables transcribed. No value sets. Where the rich material is, is
named in the structured `keyFiles` so the real build can be aimed at it.

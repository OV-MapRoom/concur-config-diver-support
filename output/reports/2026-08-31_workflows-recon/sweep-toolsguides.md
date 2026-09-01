# Sweep C — Tools-Guides Sweep — Workflow / Approval Page Identity Recon
Corpus: /mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE, SAP 2026_08, Professional Edition, crawled 2026-08-29.
Sweep entry point: `concur-invoice-professional-edition-tools-guides/` (650 files), exhausted BEFORE opening admin-guides.

## HEADLINE

**Workflows is ONE page with SEVEN tabs, not thirteen pages — and the Purchase Order / Purchase
Request / Invoice "Settings" family is the Settings TAB of that page, not three pages.**
The Audit Rules precedent wins over the Forms and Fields precedent here: every one of the seven
surfaces is reached only by clicking a tab inside the Workflows page, and only ONE of them
(Reason Category and Codes) carries its own role gate. Two genuinely separate left-menu pages sit
adjacent — **Delegate Configurations** and **Feature Hierarchies** — and the tools-guides directory
is where the Feature Hierarchies evidence lives.

The tools-guides directory contributed almost NO workflow-admin field material. That is itself the
finding: workflow configuration is documented essentially 100% in admin-guides. Tools-guides
carries the workflow domain as **approver runtime screens** (traps) plus **three load-bearing
prerequisite/nav facts** that admin-guides does not state as plainly.

---

## 1. WHAT I SEARCHED (tools-guides first, in full)

`ls` of all 650 filenames read end-to-end in three pages. The prompt's asymmetry warning held:
only 4 tools filenames contain "workflow", 22 contain "approv", and searching the CONCEPT rather
than the word is what found the material. Concept sweeps run (all in searchLog):

| concept | tools-guides files hit |
|---|---|
| workflow (any case) | 68 files, top 5 all end-user or PO-policy prose |
| "Workflows" (the page) | 9 files |
| "Authorized Approver" | **2** |
| "Approval Flow" | 13 (all end-user) |
| "Feature Hierarch" | **11** |
| "Purchase Request Settings" | **0** |
| "Purchase Order Settings" | **0** |
| "Approval Statuses" | **0** |
| "Email Notifications tab" | **0** |
| "left menu" | 10 |
| "Invoice Processing Admin" | 4 |
| "User Administration" | 14 |

The four zeroes are real, not a census artefact — I checked the singular/plural and the
tab/section variants. **The Workflows page's tabs are documented ONLY in admin-guides.**

I also swept the 9 `required-roles-*.md` and 16 `permissions-*.md` files in tools-guides (my
assigned territory). NONE of them gates a workflow admin surface; they gate Payment Manager,
Vendor Manager, Capture Processing and the import tools. `required-roles-4a46ee34.md` (937 B) is
the only approval-flavoured one and it is about the runtime single-step-approval capability, not
about who may open a config page.

Import/export file-format specs (my assigned territory): the five
`the-import-template-fields-and-descriptions-*.md` catalogs cover hierarchy mappings (already
Routing Configuration), vendor, vendor banking, vendor employee access, expense types. **None is a
workflow-object import.** There is no workflow or approver import file spec in this corpus. The
closest is prose in `workflow-creation-process-1d37b85f.md`: authorized approvers may be loaded
"either use the employee import process or use the Add Authorized Approvers page within Workflows"
— and the employee import is a shared-product artefact, see §6.

---

## 2. THE PAGE ROSTER I CAN DEFEND

### 2.1 WORKFLOWS — a distinct admin page. HIGH confidence.

Two navPaths, and **they contradict each other on whether Invoice Processing Admin is in the
path**. Both are recorded, neither reconciled:

* `admin-guides/access-workflow-fa9892a7.md` — "From the Invoice Processing Admin menu, click Workflows." → then "The Workflows tab on the Workflows page appears."
* `admin-guides/access-the-confirmation-agreement-tab-666fa0ac.md` — "From the Invoice Processing Admin menu, select Workflows."
* `admin-guides/authorized-approver-list-a9522ec8.md` — "Click Administration > Invoice > Workflows (left menu). The Workflows page appears." (five files use this exact abbreviated form)
* `admin-guides/select-an-email-notification-in-the-workflows-tab-663bb8ac.md` — "Click Workflows (left menu). The Workflows page appears."

Per the preamble's own rule ("A path that omits it may be an abbreviation, not a different page")
I treat the 4-hop as canonical and the 3-hop as the abbreviation, but I am flagging that the
3-hop appears **five times to the 4-hop's two**, so the majority reading is the shorter one. The
build should pick the 4-hop and record the 3-hop as an alternate.

Role gate: `workflows-tool-8b3b4dbe.md` — "Both the Global Invoice Configuration administrator and
the Group Invoice Configuration administrator can view the Workflows tool." Editing is split:
`overview-6e3fab65.md` — "The Global Invoice Configuration administrator can edit all workflows."

Aliases in the corpus: **Workflows page**, **Workflows tool**, **Workflow** (singular, in
`workflow-667cee21.md`), **Workflows section** ("the Settings section of the Workflows tool").

### 2.2 THE SEVEN TABS

All seven are `tab-within-page`. Each has a click path that starts by opening the Workflows page.

| # | tab | evidence file | note |
|---|---|---|---|
| 1 | **Workflows** | access-workflow-fa9892a7.md | the list of workflow OBJECTS; 4 columns documented |
| 2 | **Settings** | preventing-po-transmittal-...-51b11602.md | home of the three-member settings family — see §3 |
| 3 | **Approval Statuses** | accessing-the-approval-statuses-tab-7ec7bb6e.md | has Invoice / Purchase Request sub-tabs |
| 4 | **Email Notifications** | access-email-notifications-9f806b0b.md | 4 corroborating files |
| 5 | **Authorized Approvers** | authorized-approver-list-a9522ec8.md | has *Authorized Approver List* and *Configuration* SUB-tabs |
| 6 | **Confirmation Agreements** | access-the-confirmation-agreement-tab-666fa0ac.md | 6 files |
| 7 | **Reason Category and Codes** | overview-9c8ca06e.md | **own role gate** — see below |

Independent corroboration that 6 and 7 are tabs of this specific page:
`general-information-8b3b0308.md` — the Workflows guide's revision history — logs, under
March 7, 2014: "Confirmation Agreements tab and options" / "Reason Category and Codes tab and options".

**The one role-gate exception.** `creating-a-reason-code-b2b61596.md`: "The Invoice Configuration
administrator (_Restricted_) role is required to use the options on this tab." and
`overview-9c8ca06e.md`: "The Invoice Configuration administrator (_Restricted_) accesses Workflows
Reason Category and Codes…". That is a DIFFERENT role from the Global/Group Configuration admin
who owns the rest of the page. Under the tiebreaker rule the preamble sets ("a surface with its
own left-menu entry **or its own role gate** is a page"), Reason Category and Codes is the one
candidate here with a page-ward argument. I still call it a tab, because the click path is
unambiguously "Click the Reason Category and Codes tab" and there is no left-menu entry anywhere
in the corpus for it. But the contradiction is real and I am recording it rather than resolving it.

**Tab-vs-section contradiction, recorded not reconciled.** The same surfaces are called *sections*
in `workflow-creation-process-1d37b85f.md`: "you must clear a setting in the Settings section of
the Workflows tool" and "the Authorized Approvers section of the Workflows tools". And
`create-a-new-workflow-554e86aa.md` calls tab 4 by a SINGULAR name: "To customize the email
message, click the Email Notification tab." (Email Notification, not Notifications.)

### 2.3 THE WORKFLOW OBJECT EDITOR — a wizard, not a page

`create-a-new-workflow-554e86aa.md` (14,383 B, the single richest workflow file in the corpus)
opens: "On the Workflows tab, select the desired workflow and click Copy." → General page →
Steps page → Step Rules page. This is the OBJECT editor, opened from tab 1. Companion pages:
`work-with-the-steps-page-fab249d1.md` (6,726 B, "On the Steps page, click New." → Add Workflow
Step page) and `work-with-the-step-rules-page-4c33cda0.md` (11,246 B).

`create-a-new-workflow-15992497.md` (2,017 B, loio 1599249793e4…) and
`create-a-new-workflow-554e86aa.md` (14,383 B, loio 554e86aad449…) are the twins the preamble
warned about. **I diffed them: they are NOT republished duplicates and NOT UI variants.** 15992497
is conceptual ("To create a new workflow, an administrator must copy an existing invoice workflow
and make the appropriate edits."); 554e86aa is the field roster. The build should read both.

### 2.4 DELEGATE CONFIGURATIONS — a separate left-menu page. HIGH confidence. NOT in the graph.

`admin-guides/access-and-view-payment-delegate-configurations-8ed1298f.md` (3,872 B):
"Select Delegate Configurations (left menu) , the Delegate Configurations page appears."
(note the stray space before the comma — quote it verbatim). Then "Select the Invoice or Purchase
Request tab." Eleven documented columns, including *Can Approve (Any Time)*, *Can Approve
Temporary*, *Need Approver Role to Approve*, *Restrict approvers to those with equal or higher
authorized approver limit*. Supporting files: `delegate-configuration-8b2bd26d.md` (4,236 B),
`create-a-new-invoice-delegate-configuration-fcf42662.md` (6,302 B),
`edit-an-invoice-delegate-configuration-c7f51424.md`, `delete-an-invoice-delegate-configuration-92627a9b.md`,
`special-considerations-for-delegate-configurations-8b2bfccb.md`,
`special-considerations-for-payment-delegate-configurations-77a887a4.md`.

This is a genuine second page in the approval domain: it configures WHO may approve on behalf of
whom, which is an approval-workflow control by any reading. It has its own left-menu entry, its
own tabs, and its own field roster. **It is not one of the 20 built pages and no other finding in
the handoff names it.** If only one sweep finds it, this is the reason I exist.

### 2.5 FEATURE HIERARCHIES — settling finding (3)

**Verdict: it is a real left-menu page under Administration > Invoice, it is a hard prerequisite
of the Workflows domain, and it is ALSO a prerequisite of Routing Configuration and of the vendor
group work — so it belongs to NO single group. It should be built once, as a shared page, and
Workflows should reference it.** Leaving it unclaimed a third time would be the wrong call; so
would annexing it to Workflows.

Click path, from MY directory (tools-guides), which is where it is stated most plainly:
`step-2-associate-the-feature-hierarchy-to-the-source-list-bcaf1f5a.md` — "Click Feature
Hierarchies (left menu)." then "select _Invoice Vendor Employee Access_, and then click Modify
Hierarchy." Fields visible in that one topic: Source List, Level, Segment Name.

Its workflow claim, from admin-guides:
* `understand-the-hierarchy-b65d7089.md` (5,065 B) — "You must define the authorized approver hierarchy (Invoice > Feature Hierarchies)"
* `step-1-define-the-cost-object-approver-hierarchy-6e7b7dc6.md` — "This portion of the configuration requires permissions for the Feature Hierarchies section in Administration."
* `workflow-667cee21.md` — PR Authorized Approval and COA hierarchies "must be configured using Invoice" [Feature Hierarchies] before selection via the Policy tool.

Its routing claim, again from tools-guides:
* `create-the-invoice-routing-feature-hierarchy-8b510285.md` — "The user first specifies the source list and relevant segments using the Invoice Routing hierarchy in the Feature Hierarchies area."
* `auto-assign-an-invoice-using-hierarchies-c4035783.md` — "This feature relies on the Routing Configuration and associated import, List Management, and Feature Hierarchy modules of Concur Invoice."

**A THIRD NAME EXISTS and no prior handoff records it.** `admin-guides/hierarchies-7f68a876.md`:
"first configure their hierarchy structure in Administration [>] Invoice [>] Hierarchies (explained
below)." — the menu label is written **Hierarchies**, not Feature Hierarchies. Record as an alias,
do not reconcile. (The separator there is a U+00A0 non-breaking-space pair, not a plain space —
any quote spanning it will fail grep -F. Split the quote. This bites in
`preventing-po-transmittal-...-51b11602.md` too.)

Coverage: 17 files corpus-wide mention it (10 admin, 7 tools) but not one is a field roster. It is
a THIN page in this corpus because SAP files the real content in the *Shared: Feature Hierarchies
Setup Guide*, which is NOT in this corpus. **A blind build of Feature Hierarchies will yield about
four fields.** That thinness is the correct answer, and the build should be told so up front
rather than discovering it.

---

## 3. FINDING (1) — SETTLED. The answer is (a): all three are the Workflows page's Settings tab.

I reproduced the clincher myself:

```
grep -c "select their own approver" .../available-invoice-settings-8b3411f0.md   -> 0
grep -c "select their own approver" .../invoice-settings-cace748d.md            -> 2
```
Sizes from `wc -c`: available-invoice-settings-8b3411f0.md **8,368 B**;
invoice-settings-cace748d.md **4,901 B**; purchase-request-settings-b0bce285.md **3,735 B**;
purchase-order-settings-a5a997b4.md **1,417 B**.
I also verified against `/mnt/c/.../output/kg-invoice-config.json`: **zero of the 486 fields cite
invoice-settings-cace748d.md.** Confirmed, not assumed.

**The new evidence that settles it — the PO member is nailed to the Settings tab by name:**
`admin-guides/preventing-po-transmittal-when-po-exceeds-specified-exception-level-51b11602.md`
describes exactly the one row in purchase-order-settings-a5a997b4.md and says the setting "appears
in Administration Invoice Workflows Settings tab and is shown in the following figure." That is
the PO member → Workflows > Settings tab, in one sentence.

**And the INVOICE member is nailed to the same tab, which is the part nobody had done.**
`general-information-8b3b0308.md` is the revision history of the *Concur Invoice: Workflows –
General Information Setup Guide* (10 workflow hits; it logs "Updated images and text to the new UI
for the Workflows Tool"). Under May 16, 2014 it records "Addition of two new options to the
Settings tab:" and lists *Filter invoice items to those that are applicable to Cost Object* and
*Allow processor to recall an invoice to last processor step* — **which are rows 4 and 5 of
invoice-settings-cace748d.md**, verbatim in substance. Under June 14, 2013 the same history records
"New Settings tab option: Prevent purchase order transmissions setting." — the PO member again.
One guide, one Settings tab, both members logged into it.

Third strand: `workflow-creation-process-1d37b85f.md` describes the centralized-vs-decentralized
choice — which IS the "Allow users to select their own approver" row — as "a setting in the
Settings section of the Workflows tool."

All three members share the same idiom "The following settings apply globally to X", and grep for
that phrase returns **exactly those three files corpus-wide and nothing else**. They are one family
and the family lives on one tab.

**Consequence — say it plainly, because it is a trap the build will otherwise walk into.**
`invoice-settings-cace748d.md` is titled "Invoice Settings" and is NOT the built Invoice Settings
page (page.invoice-settings, navPath Administration > Invoice > Invoice Processing Admin > Invoice
Settings, whose roster is available-invoice-settings-8b3411f0.md and whose own click path is
independently attested by `enable-the-po-change-order-feature-7dd5dcd4.md`: "click Administration >
Invoice > Invoice Settings (left menu)"). This is a **name collision**, exactly the Forms-and-Fields
error in reverse. The five rows of invoice-settings-cace748d.md belong on **Workflows > Settings
tab**, alongside the PR and PO rows, and the Workflows build may legitimately claim them. This is
NOT Invoice Settings rebuild debt, because they were never Invoice Settings fields — answer (c)
is refuted.

**Flag for the build, as instructed:** BOTH the PR and PO members carry the prose range "Type a
number from one to 99." (verified, 1 hit each). The invoice member carries the same prose inside a
raw `<table>` — see §5. No digit-based range regex will find any of the three.

The two unresolved endpoints dep.g2.012 and dep.g2.013 resolve to **Workflows > Settings tab**.
A third sibling endpoint is missing from the graph entirely: the invoice-side threshold
"Prevent this payment request submission when exception level exceeds X".

---

## 4. FINDING (4) — THE ROUTING CONFIGURATION BOUNDARY

Routing Configuration's 10 built fields, read out of the graph: search_routing_mappings,
employee_last_name, segment_1_3, delete_flag, employee_id, level_1_10_code, browse_button,
import_button, download_template_button, import_details_type_filter. **All ten are hierarchy-
mapping import/search plumbing.** Nine of the ten cite tools-guides files.

The boundary is clean and it is a NOUN boundary, not a word boundary:

* **Routing Configuration = ASSIGNMENT routing.** Who OWNS the invoice. `the-routing-configuration-screens-12358d75.md`: "Routing Configuration is divided into two areas" — Hierarchy Mapping List and Import Hierarchy Mappings. `access-the-routing-configuration-page-be1f9063.md`: "The Hierarchy Mapping List page appears with a list of hierarchy mappings imported for display."
* **Workflows = APPROVAL routing.** Who APPROVES it, in what order.

**`tools-guides/workflow-and-approval-routing-8b4ff6c9.md` (1,502 B) falls on the WORKFLOWS side,
despite the word "routing" in its title.** Its two substantive sentences are "All workflow options
available for non-PO policies are also available to a PO-based invoice policy." and "This includes
options such as workflow rules and Authorized Approvers." — workflow rules and Authorized
Approvers are both Workflows-page surfaces. It contains zero hierarchy-mapping content and never
mentions the Routing Configuration page. It is a **PO-policy best-practice essay**, not a config
topic: it prescribes "configure workflow as minimal, by progressing immediately to the Processor."
It should NOT seed fields on either page.

**I found no Routing Configuration field that looks mis-homed.** No finding against the existing
graph on this boundary.

---

## 5. CENSUS CALIBRATION — I reproduced both documented traps in this domain

| file | `grep -c "^| "` | `grep -cP "^\s*\|"` | `<table[ >]` | `<p` | bytes |
|---|---|---|---|---|---|
| create-a-new-workflow-554e86aa.md | **0** | **85** | 0 | 0 | 14,383 |
| work-with-the-step-rules-page-4c33cda0.md | **0** | **29** | 0 | 0 | 11,246 |
| work-with-the-steps-page-fab249d1.md | **0** | **28** | 0 | 0 | 6,726 |
| additional-approver-situations-fbb5034c.md | **0** | **0** | **1** | **36** | 8,664 |
| access-and-view-payment-delegate-configurations-8ed1298f.md | 0 | 37 | 0 | 0 | 3,872 |
| create-a-new-invoice-delegate-configuration-fcf42662.md | 0 | 22 | 0 | 0 | 6,302 |
| authorized-approver-list-a9522ec8.md | 0 | 16 | 0 | 0 | 3,773 |
| filter-authorized-approvers-by-workflow-approval-step-aae69350.md | 8 | 21 | 1 | 14 | 6,234 |
| invoice-settings-cace748d.md | 4 | 10 | **1** | **6** | 4,901 |
| purchase-request-settings-b0bce285.md | 5 | 13 | 0 | 0 | 3,735 |
| cost-object-approval-8b3d1e0f.md | 29 | 85 | 0 | 0 | 4,040 |

* **Indented-table trap, live in this domain.** The single richest workflow file returns **0** on `^| ` and **85** on `^\s*\|`. An anchored census would have dismissed the corpus's biggest workflow field catalog as prose.
* **Packed-`<tr>` trap, live in this domain.** `additional-approver-situations-fbb5034c.md` (8,664 B) returns **0** markdown rows on BOTH forms and **1** `<table`. Only counting `<p` inside it (36) reveals it is a real catalog. Same shape in `invoice-settings-cace748d.md`: its markdown table holds only 2 of its 5 settings; **rows 3-5 (including the "Type a number from one to 99" PO/PR-style threshold and the recall-to-last-processor-step setting) are in a raw `<table>` as 6 `<p>` cells.** A markdown-only extractor loses 3 of 5 fields on the file that settles finding (1).

**Corpus-metadata calibration, new and worth carrying forward:** the preamble warns that
`deliverable_id` is a per-directory constant. **`deliverable_loio` is too.** `grep -h
'^deliverable_loio:' *.md | sort | uniq -c` over admin-guides returns a single value
(5d4d01ab28704a4fbfa543f20b66966c) × 1209. So guide membership CANNOT be read off the front
matter — the source_url path is likewise the deliverable, not the guide. Guide membership in this
corpus is only recoverable from content (cross-references and revision-history wording). That is
how I established general-information-8b3b0308.md is the Workflows guide.

---

## 6. THE ADMIN-vs-END-USER LINE — every rejection names where the config lives

| rejected screen | where its configuration lives |
|---|---|
| **Approval Flow / Approval Flow for Invoice page** (`tools-guides/view-the-approval-workflow-of-an-invoice-d8046bec.md` — "In the Details menu, click Approval Flow.") | The steps it displays are authored on **Workflows > Workflows tab > [workflow] > Steps page**; whether the employee may EDIT it is governed by *Steps Can Be Added By* and *Editable By Group(s)* on the workflow's General page, and overridden globally by *Allow users to select their own approver for payment requests* on **Workflows > Settings tab**. |
| **Approval Flow for Purchase Request window** (`view-the-approval-flow-0887542c.md`, `-08cb8cc1`, `-70da32a3`, `view-approval-flow-ce872c13.md`) | Same, via the Default Purchase Request Workflow (`admin-guides/workflow-667cee21.md`) and **Workflows > Settings tab** row *Allow users to select their own approver for purchase requests*. |
| **Add Approval Steps** (`tools-guides/add-approval-steps-2e17fab0.md` — "Invoice Processors may view and add approvers to the workflow process.") | Enabled/disabled by *Steps Can Be Added By* on the workflow's General page; restricted to authorized approvers by **Workflows > Authorized Approvers tab** (`restrict-ad-hoc-steps-to-authorized-approvers-8a523257.md`). |
| **Send to Approver / Send Invoice to Approver window** (`send-an-invoice-to-an-additional-approver-afd572de.md` — "Add an approver in the User-Added Approver step") | Same two controls; the *User-Added Approver* step type is defined on the **Steps page**. |
| **Requests Pending Your Approval window / My Work approval links on the home page** | **Workflows > Settings tab** rows *Display payment request approval links to approvers on the home page* and *Display purchase request approval links to approvers on the home page*. |
| **Verification page / batch verification workflow** (`tools-guides/moving-through-the-batch-verification-workflow-01738020.md`) | **Capture Processing Admin** (Group 4, already built) — not a workflow surface at all despite the filename. Its Other Settings tab holds the default policy/ledger for the invoices the Verifier produces. |
| **Invoice Manager / My Invoices / Unassigned Invoices pages** (incl. the two `-new-experience-` twins) | Column sets are per-user view state; the invoice's OWNER assignment is configured on **Routing Configuration** (built) + **Feature Hierarchies**. |
| **Invoice Proxy Logon** (`proxy-logon-8b4e8cf0.md`, `accessing-invoice-proxy-logon-8b4e4019.md`, 15 tools files) | The Invoice Proxy Logon ROLE is granted outside this graph — `tools-guides/before-you-begin-9b98872a.md`: "The Employee administrator uses User Permissions to grant this assignment." See the User Administration row below. Delegate (not proxy) behaviour is configured on **Delegate Configurations**. |
| **Email notification received by a user** (`tools-guides/email-notifications-of-status-change-and-required-approvals-6d58db17.md` — user opts in at Profile > Profile Settings > Invoice Preferences) | Content and existence of the mail: **Workflows > Email Notifications tab**; assignment of a mail to a workflow: the workflow's **General page**. |

**The inverse trap, stated explicitly as instructed:** the noun *step* names both. An **approval
step** as an ADMIN object is created on Workflows > Workflows tab > [workflow] > **Steps page**
("On the Steps page, click New." → Add Workflow Step page → fields Step Name, Role, Approval
Actions). An **approval step** as a RUNTIME thing is a row an approver sees on the Approval Flow
page and a processor may insert ad hoc. Same word, two surfaces, and `add-approval-steps-2e17fab0.md`
(tools) and `work-with-the-steps-page-fab249d1.md` (admin) are the two sides.

---

## 7. EMPLOYEE IMPORT / USER ADMINISTRATION / USER PERMISSIONS — settled

**None of the three is an Invoice admin page in this corpus. All three are SHARED-PRODUCT surfaces
outside this graph's scope, and the corpus says so explicitly and repeatedly.**

Every tools-guides topic that touches them defers to the same external guide:
* `how-single-step-approval-workflow-works-40145f24.md` — "Assigning the Invoice Approver role: Refer to the Shared: User Administration User Guide."
* `before-you-begin-9b98872a.md` — "Employees must be entered into the system, either through the Employee Import process, or manually by using User Administration." and "The Employee administrator uses User Permissions to grant this assignment."
* `combine-invoice-roles-for-invoice-tasks-ea319cdd.md` — closes on the same referral.
* `overview-of-steps-37e3c289.md` lists "Step 6: User Administration (_User Admin_)" as the LAST step of an Invoice configuration sequence whose Steps 1-4 are List Management, Feature Hierarchies, Group Configurations, Forms and Fields — i.e. it is explicitly outside the Invoice admin tool set, reached by a different administrator (User Admin).

So the sentence in finding (1) — "every employee must have an approver set for them in the User
Administration page or through the employee import" (verified, 1 hit each in
`invoice-settings-cace748d.md` and `purchase-request-settings-b0bce285.md`) — is a **cross-product
dependency, not a page reference into this graph.** The correct modelling is an external endpoint,
permanently unresolved by design. Do not create a page node for any of the three.

One caveat worth recording: `admin-guides/user-administration-8b167b96.md` and
`admin-guides/employee-import-6954b441.md` exist in the ADMIN directory and both mention authorized
approvers. I did not open them in depth — they are admin-guides and outside my sweep lane — but a
sweep that owns admin-guides should check whether either documents an Invoice-scoped screen rather
than merely referring to the shared one. My reading of the tools-side evidence is that they do not.

---

## 8. WHAT THE TOOLS DIRECTORY UNIQUELY CONTRIBUTED

Being the standing guard against admin-guides skew, here is my honest accounting. Three things:

1. **The Feature Hierarchies click path.** "Click Feature Hierarchies (left menu)." exists in tools-guides and I found no equivalent imperative in admin-guides (admin-guides gives only the parenthetical "(Invoice > Feature Hierarchies)" and the alias "Hierarchies"). Without tools-guides, Feature Hierarchies would again have no navPath.
2. **The Authorized Approvers → classic-interface link.** `how-single-step-approval-workflow-works-40145f24.md`: the Invoice Configuration administrator "uses the Authorized Approvers link from workflows in the classic interface to establish the amounts for the Invoice Approver." This is the only place in the corpus that names the UI generation of the Workflows page — see §9.
3. **The PO-policy workflow boundary statement** (`workflow-and-approval-routing-8b4ff6c9.md`), which is what lets me place that file on the Workflows side of finding (4).

Everything else workflow-shaped in tools-guides is an approver runtime screen. **The 60-of-486
tools-citation ratio in the current graph is not going to improve much from the Workflows build,
and that is a fact about the corpus rather than a skew — the workflow ADMIN surface genuinely is
documented in admin-guides.** Where I would still aim a tools-side extractor: the Delegate
Configurations column catalog is admin-side, but the *proxy/delegate runtime* semantics that
constrain it are tools-side.

---

## 9. NEW EXPERIENCE — the answer is that there is none

`ls | grep -i new-experience` across both directories returns exactly five files:
`end-user-experience-new-experience-85c2652b.md`,
`policies-the-purchase-order-policy-new-experience-5a1ba7ef.md`,
`purchase-order-matching-rules-new-experience-6c8fb80f.md`,
`using-the-invoice-manager-page-new-experience-f83ba5fa.md`,
`using-the-unassigned-invoice-page-new-experience-072e2f18.md`.

**Not one is a workflow-area topic.** Cross-checking by content (files containing "New Experience"
AND workflow/approval-flow) leaves exactly one: the PO policy file, which is Group 1/3 territory.

So: **the Workflows page, its seven tabs, the workflow object editor, Delegate Configurations and
Feature Hierarchies have NO New Experience twin in the 2026_08 corpus.** The only UI-generation
signal anywhere is tools-guides calling it "the classic interface". Byte counts for the richest
workflow-area files (real `wc -c`, since there is no twin to compare against):
create-a-new-workflow-554e86aa.md 14,383 · work-with-the-step-rules-page-4c33cda0.md 11,246 ·
additional-approver-situations-fbb5034c.md 8,664 · approver-terminology-8559861c.md 6,899 ·
work-with-the-steps-page-fab249d1.md 6,726 · general-information-8b3b0308.md 6,719 ·
create-a-new-invoice-delegate-configuration-fcf42662.md 6,302 ·
filter-authorized-approvers-by-workflow-approval-step-aae69350.md 6,234 ·
workflow-creation-process-1d37b85f.md 6,071 · understand-the-hierarchy-b65d7089.md 5,065.

Since New Experience is the primary automation target, this is a risk the build must carry
knowingly: it will be modelling the classic Workflows UI because that is all SAP documents.

---

## 10. THE FOUR workflow-guides TWINS — diffed, as required

`workflow-guides-8b3b85da.md` (1,473 B), `-8b3c7b2a.md` (1,784 B), `-8b3d6ede.md` (1,769 B),
`-8b3e09a7.md` (1,663 B); four distinct loios. **All four are the SAME cross-reference table**
listing four setup guides (Workflow – General Information / Authorized Approvers / Cost Object
Approvals / Email Notifications), republished once into each of those four guides. The only
differences are the auto-generated summary sentence, italic markup, and one typo
("Workflow –Authorized Approvers", missing space, in 8b3e09a7). **They are republication, not UI
variants, and they document a GUIDE structure, not four pages.** Do not create nodes from them.
They are, however, useful as an inventory: the four sub-guides map onto tabs 5 (Authorized
Approvers), 4 (Email Notifications), and the Cost Object Approval workflow TYPE.

---

## 11. NOT PAGES — ruled out with reasons

* **Cost Object Approval** — a workflow TYPE and a hierarchy, not a screen. Configured by selecting the COA workflow on Workflows > Workflows tab (`self-approval-of-cost-object-based-workflows-20fd435d.md`: "On the Workflows tab, select the desired workflow, and then click Modify.") and by building the Cost Object Approver hierarchy in Feature Hierarchies. `cost-object-approval-8b3d1e0f.md` is 4,040 B with 85 indented table rows — rich, but it is field material for the workflow object, not a page.
* **Workflow Settings** (`workflow-settings-8b3b98e1.md`, 743 B) — a container stub with no procedure and no fields. It is the guide's section heading for the Settings tab. Zero page-hood.
* **Authorized Approver Hierarchy / Cost Object Approver Hierarchy** — objects built on Feature Hierarchies, not pages.
* **Confirmation Agreements window** — a dialog opened from tab 6 (`editing-a-confirmation-agreement-dc406a56.md`: "The Confirmation Agreements window appears.").
* **New Authorized Approver window** — a dialog opened from tab 5.
* **Add Workflow Step page / Step Rules page / General page** — wizard pages inside the workflow object editor.
* **Approval Statuses > Purchase Request** (a graph endpoint) — a SUB-TAB of tab 3, not a page. `work-with-purchase-requests-approvals-1c39ee21.md`: "On the Purchase Request tab, click New. The Report Status window appears."
* **Policies** — already built (Group 1). It is where a workflow is ASSIGNED to a policy (`workflow-creation-process-1d37b85f.md` step 8). Cross-page dependency, not a Workflows surface.

---

## 12. WHAT THE BUILD SHOULD BE AIMED AT (no fields extracted here)

Richest first, with real byte counts: `create-a-new-workflow-554e86aa.md` (14,383) for the workflow
General page; `work-with-the-step-rules-page-4c33cda0.md` (11,246) and `work-with-the-steps-page-fab249d1.md`
(6,726) for Steps/Step Rules; `additional-approver-situations-fbb5034c.md` (8,664, **packed
`<table>` — must parse `<p>`**); `approver-terminology-8559861c.md` (6,899);
`create-a-new-invoice-delegate-configuration-fcf42662.md` (6,302) and
`access-and-view-payment-delegate-configurations-8ed1298f.md` (3,872) for Delegate Configurations;
`filter-authorized-approvers-by-workflow-approval-step-aae69350.md` (6,234) and
`authorized-approver-list-a9522ec8.md` (3,773) for tab 5; `invoice-settings-cace748d.md` (4,901,
**mixed markdown + raw table**) + `purchase-request-settings-b0bce285.md` (3,735) +
`purchase-order-settings-a5a997b4.md` (1,417) for tab 2; `default-approval-statuses-34c83d58.md`
(3,405) for tab 3; `default-workflows-a6fa157a.md` (4,198) for the shipped workflow inventory.

Three mechanical rules for this domain: allow leading whitespace on every table-row count; parse
`<p>` inside raw `<table>` elements; and never span a nav-arrow separator in a quote — those are
U+00A0 pairs and `grep -F` will not match across them.

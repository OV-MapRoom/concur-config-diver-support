# Sweep F — Configuration-Guide Structure and Setup Flow
## Workflow / Approval admin surface, SAP Concur Invoice Professional Edition 2026_08
Blind build. Page identity only. No field rosters extracted.

---

## 0. Headline

The workflow area is **ONE admin page plus two neighbours**, not thirteen.

1. **Workflows** is a single left-menu page carrying at least **seven tabs** (Workflows, Settings,
   Authorized Approvers, Approval Statuses, Email Notifications, Confirmation Agreements, Reason
   Category and Codes). A 2025 release note independently enumerates the page's contents as
   "General, Steps, and Step Rules details", "the Approval Statuses" and "the workflow Settings" —
   all under one heading, **"Workflows Page"**. This is the Audit Rules precedent, not the Forms
   and Fields precedent.
2. **Inherited finding (1) is SETTLED as answer (a) with one correction.** All three members of the
   `*-settings-*` family (Invoice Settings `cace748d`, Purchase Request Settings `b0bce285`,
   Purchase Order Settings `a5a997b4`) live on **Workflows > Settings tab**, including the invoice
   member. The clincher is a direct nav string plus the General Information guide's own revision
   history. `invoice-settings-cace748d.md` is a **name collision** with the already-built Invoice
   Settings page — it is NOT Invoice Settings rebuild debt, it is a Workflows surface.
3. Two neighbouring left-menu pages surfaced that no group owns: **Feature Hierarchies** (settles
   inherited finding (3): it is its own page, prerequisite to Workflows *and* Routing *and* Vendor
   Employee Access) and **Delegate Configurations** (a find I believe is unique to this sweep — it
   is the admin home of every delegate/proxy approval behaviour, 10 KB of documentation across
   6 files, absent from the 20 built pages and absent from every dependency endpoint in the graph).

---

## 1. What I searched

See `searchLog` in the structured return for literal commands. In summary:

* Filename sweep for `*workflow*` in both guide directories (35 admin-guides files, 4 tools-guides).
* Filename sweep for every `step-N-*` topic in both directories (82 admin, 27 tools) and manual
  reconstruction of the numbered flows that touch the workflow domain.
* Left-menu census: `grep -rhoE "[A-Za-z0-9 &/'-]+ \(left menu\)"` across both guide dirs
  (**calibration note**: my first attempt anchored on `Click …`/`Select …` and under-counted
  Workflows 2 instead of 8, because the real string is
  `Click Administration > Invoice > Workflows (left menu)`. The corrected census is in §5.)
* Tab-name census in the workflow files, then per-tab file lists for each tab name found.
* Table census on the 16 richest candidate files with **leading-whitespace-tolerant** row counting
  (`grep -cP "^\s*\|"`), plus raw-HTML `<tr`/`<p` occurrence counts using `grep -o … | wc -l`
  (**calibration note**: `invoice-settings-cace748d.md` returns `grep -c "<tr" = 1` but
  `grep -o "<tr" | wc -l = 3` — the packed-`<tr>` trap fired exactly as warned; that file has 2
  markdown rows and 3 more rows packed into a single raw `<table>` line, 5 settings in total).
* Release-note corroboration (labelled as such wherever cited).
* Read `/mnt/c/Users/manci/PROJECTS/concur-config-diver-support/output/kg-invoice-config.json` for the 20 built pages, the 10 Routing Configuration
  field names, and every dependency endpoint naming Workflows / Feature Hierarchies / PR / PO
  Settings.

### Non-breaking-space trap (new, worth recording for the build)
`Administration > Invoice > X` renders in these files as `Administration  Invoice` — the
`>` is gone and the separators are **U+00A0**, not spaces. Two of my first-pass quotes failed
`grep -F` for exactly this reason and had to be re-cut. **Never quote across a nav arrow in this
corpus.** Quote the clause after it instead.

---

## 2. The guide index — there IS a workflow configuration guide, and there are FOUR of them

`workflow-guides-*.md` are four files with the same title, four distinct loios, near-identical
bodies, differing only in an auto-generated summary paragraph and italic markup:

| file | bytes | loio |
|---|---|---|
| `workflow-guides-8b3b85da.md` | 1473 | `8b3b85da70891014bbdd65f9448c9095` |
| `workflow-guides-8b3e09a7.md` | 1663 | `8b3e09a770891014bbdd65f9448c9095` |
| `workflow-guides-8b3d6ede.md` | 1769 | `8b3d6ede70891014bbdd65f9448c9095` |
| `workflow-guides-8b3c7b2a.md` | 1784 | `8b3c7b2a70891014bbdd65f9448c9095` |

All four publish the same 4-row index — **this is the master index of the group**:

* Concur Invoice: Workflow – General Information
* Concur Invoice: Workflow – Authorized Approvers
* Concur Invoice: Workflow – Cost Object Approvals
* Concur Invoice: Workflow – Email Notifications

They are **republished duplicates, not UI variants** (distinct loio, identical table payload). Only
one needs citing; I cite `8b3b85da` as the canonical.

`general-information-8b3b0308.md` (6,719 B) is the **revision history of the General Information
guide** and is the single most valuable structural artefact in the group: it names the page's tabs
as they were added over time, including the two that nothing else in the corpus explains.

---

## 3. Reconstructed numbered setup flows, and the surface each step lands on

### Flow A — the master flow. `workflow-creation-process-1d37b85f.md` (6,071 B), 8 unnumbered-file steps
Not `step-N-*.md` files; an 8-item ordered list inside one topic. Belongs to
*Concur Invoice: Workflow – General Information*.

| # | Step | Surface |
|---|---|---|
| 1 | "Create any custom approval statuses that you may use in the workflow." | Workflows > **Approval Statuses tab** |
| 2 | Identify workflow type (centralized / decentralized / approver-directed / authorized-approver list / approval-time-expired) | Workflows > **Settings tab** ("you must clear a setting in the Settings section of the Workflows tool") + **Authorized Approvers tab** |
| 3 | "Set up the Payment Authorized Approvers hierarchy if you choose to use authorized approvers." | **Feature Hierarchies** (separate page) |
| 4 | Add authorized approvers — "use the Add Authorized Approvers page within Workflows" | Workflows > **Authorized Approvers tab > Authorized Approver List** |
| 5 | "Create a workflow by copying an existing workflow or the default workflow." | Workflows > **Workflows tab** |
| 6 | "Edit the workflow properties by clicking the Workflow Name" | Workflows tab > **General page** (wizard) |
| 7 | "Add additional steps, change step configuration settings, and create workflow rules." | Workflows tab > **Steps page** → **Step Rules page** (wizard) |
| 8 | "Assign the invoice workflow to a policy." | **Policies** (already built, Group 1) |

**Verdict this flow forces:** 8 steps land on **3 distinct pages** (Workflows, Feature Hierarchies,
Policies) and, within Workflows, on **4 tabs and a 3-page wizard**. This is the strongest
non-click-path evidence for the one-page-with-tabs answer, and it also shows the flow crossing into
two already-built pages — ORDERING evidence, not new pages.

### Flow B — Cost Object Approvals guide, 3 steps
| # | file | surface |
|---|---|---|
| 1 | `step-1-define-the-cost-object-approver-hierarchy-6e7b7dc6.md` | **Feature Hierarchies** — "requires permissions for the Feature Hierarchies section in Administration" |
| 2 | `step-2-activate-the-feature-27a421e2.md` | Workflows > Workflows tab > General page (Cost Object Hierarchy Type) |
| 3 | `step-3-edit-the-workflow-steps-f2731590.md` | Workflows > Steps page — "requires permissions for the Workflows section in Administration" |

Two **distinct role gates** are named in one 3-step flow: *Feature Hierarchies section* vs
*Workflows section*. That is the tiebreaker the brief asked for, and it puts Feature Hierarchies
outside the Workflows page.

### Flow C — Authorized Approvers guide, 4 steps
`step-1-define-the-invoice-authorized-approver-hierarchy-fed7c7fe.md` (985 B, stub) →
`step-2-activate-the-authorized-approver-feature-c87493ee.md` (939 B, stub) →
`step-3-add-edit-the-workflow-options-workflow-steps-workflow-rules-14d98974.md` (994 B, stub) →
`step-4-assign-the-proper-rights-to-users-82481079.md` (1,107 B) / `-86389a18.md` (1,521 B).

Steps 1–3 are **summary stubs with no procedure**; the procedures live in the sibling non-step
topics (`procedure-2d20b513.md` = the Configuration sub-tab, `authorized-approver-list-a9522ec8.md`
= the Authorized Approver List sub-tab). Step 4 explicitly names three entry points, one of which
is "The Authorized Approvers tab in Workflows." **Two files share the "Step 4" title with different
loios and different bodies** — a genuine twin pair, not a republish.

### Flow D — Authorized-approver LEVELS, 2 steps (a sub-flow inside Flow C)
| # | file | surface |
|---|---|---|
| 1 | `step-1-assign-the-level-to-the-workflow-step-6035f10a.md` | Workflows > Workflows tab > Steps page > **Modify Workflow Step window** |
| 2 | `step-2-assign-the-level-to-the-approver-d8bf669c.md` | Workflows > **Authorized Approvers tab > Authorized Approver List tab** > New/Modify Authorized Approver window |

Both steps land on **one page, two tabs**. Direct one-page evidence.

### Flow E — Vendor Management Lifecycle, 8 steps (a PROCESS narrative, NOT an admin flow)
`step-1-new-vendor-sends-invoice-to-invoice-user-d4f8be67` … `step-8-vendor-approved-workflow-step-2f0d90b9`.
Step 8 is the one the brief flagged. Reading it: "Most clients set up a workflow condition to ensure
an invoice has an approved vendor attached" — it describes what happens at runtime, and the only
admin action implied is a **workflow rule** on the Workflows page. **This flow is not evidence for
eight surfaces.** It is a lifecycle diagram in prose. Steps 1–7 are user/system events (vendor sends
invoice, extract runs, import job runs), not admin pages.

### Flow F — Named Vendor Groups / Vendor Employee Access, 6 steps (tools-guides)
`overview-of-steps-37e3c289.md` lists: Step 1 List Management → Step 2 **Feature Hierarchies** →
Step 3 Group Configurations → Step 4 Forms and Fields → Step 5 Vendor Employee Access Import →
Step 6 User Administration. Six steps, six different surfaces, five of them already built. Included
here only because it is the second independent flow that treats **Feature Hierarchies as its own
tool with its own step**.

---

## 4. Finding (1) — the `*-settings-*` family: SETTLED, answer (a), with a correction

**Reproduced clincher (my own run):**
```
grep -c "select their own approver" .../available-invoice-settings-8b3411f0.md   -> 0
grep -c "select their own approver" .../invoice-settings-cace748d.md             -> 2
wc -c available-invoice-settings-8b3411f0.md -> 8368
wc -c invoice-settings-cace748d.md           -> 4901
```
**Verified against the graph:** zero `configFields` nodes cite `invoice-settings-cace748d.md`
(python3 scan of `nodes.configFields`, count = 0). Confirmed.

**Where the family lives — three independent lines of evidence:**

1. **Direct nav string.** `preventing-po-transmittal-when-po-exceeds-specified-exception-level-51b11602.md`:
   the setting `Prevent purchase order transmission when exception level exceeds` "appears in
   Administration [>] Invoice [>] Workflows [>] **Settings tab**", and it "works just as the payment
   or purchase request settings of this type" — one sentence homing all three members.
2. **The guide's own revision history.** `general-information-8b3b0308.md` (the *Workflow – General
   Information* guide) records "**New Settings tab option: Prevent purchase order transmissions
   setting.**" (June 2013) and "**Addition of two new options to the Settings tab:** — Filter
   invoice items to those that are applicable to Cost Object — Allow processor to recall an invoice
   to last processor step" (May 2014). Those last two are **rows 4 and 5 of
   `invoice-settings-cace748d.md`** (the packed-`<tr>` rows). The invoice member is therefore on the
   Workflows Settings tab, documented by the Workflow guide, not by the Invoice Settings guide.
3. **Cross-references from the workflow wizard.** `create-a-new-workflow-554e86aa.md` and
   `work-with-the-steps-page-fab249d1.md` both refer to "the Allow users to select their own
   approver for payment requests field on the **Settings page**" as a peer surface of the workflow
   General/Steps pages.

**Answer: (a) — all three are Workflows surfaces (sections of the Settings tab).**
**Correction to the framing:** this makes `invoice-settings-cace748d.md` a **naming collision**, not
Invoice Settings rebuild debt. The built Invoice Settings page (`available-invoice-settings-8b3411f0.md`,
"The Invoice Settings page includes the following settings used to activate a feature") is a
different page reached at Administration > Invoice > Invoice Processing Admin > Invoice Settings, and
`prevent-processor-to-change-vendor-pending-processor-in-workflow-edbca7d1.md` confirms it exists
separately ("On the Invoice Settings page, clear (disable) the Allow processor users to change vendor
… setting"). **The Workflows Settings tab must NOT be merged into the built Invoice Settings page,
and the built page's 9 fields must not be re-homed onto Workflows.** Two pages, similar labels.

**Prose numeric range — flagged for the build.** All three members carry
`Type a number from one to 99.` — verified present once in each of the PR and PO files and once in
the invoice file. No digit-based range regex will find it. Three fields:
`Prevent this payment request submission when exception level exceeds X`,
`Prevent purchase request submission when exception level exceeds X`,
`Prevent purchase order transmission when exception level exceeds X` — the latter two are exactly
the unresolved endpoints `dep.g2.012` and `dep.g2.013` in the graph. **Independent corroboration of
both names confirmed.** `dep.g2.014` and `dep.g2ar.024`/`.026` point at `Workflows > Settings` /
`exception_level_limit` and now resolve to this same tab.

**Table census of the family (calibrated):**
| file | bytes | md rows (`^\s*\|`) | `<tr` occurrences | `<p>` occurrences |
|---|---|---|---|---|
| `invoice-settings-cace748d.md` | 4901 | 10 | **3** | 6 |
| `purchase-request-settings-b0bce285.md` | 3735 | 13 | 0 | 0 |
| `purchase-order-settings-a5a997b4.md` | 1417 | 7 | 0 | 0 |

5 invoice settings + 3 PR settings + 1 PO setting = **9 controls on the Settings tab minimum**.
Note that `grep -c "<tr"` on the invoice file returns 1 (one line) while `grep -o "<tr" | wc -l`
returns 3 (three rows). Line-based counting under-reports it by 3x.

---

## 5. Finding (2) — one page or several? ONE PAGE, MANY TABS

### Left-menu census (calibrated, both guide dirs)
```
10 Forms and Fields (left menu)
 8 Workflows (left menu)
 7 Attendees (left menu)
 4 Invoice Settings / Group Configurations / Audit Rules
 3 List Management
 2 Tax Administration / PO Matching Rules / Policies / Image Handling
 1 Vendor Search Admin, User Permissions, User Administration, Site Settings,
   Polices [sic], Localization, Invoice Preferences, Feature Hierarchies,
   Expense Type Import, Delegate Configurations, Company Locations
```
**Workflows has 8 left-menu citations — second only to Forms and Fields.** Every tab in §5.1 is
reached by first clicking that ONE left-menu entry. **No tab has its own left-menu entry.** That is
the tiebreaker the brief specified, and it points at the Audit Rules precedent.

### Release-note corroboration (labelled: RELEASE NOTE)
`concur-invoice-professional-edition-release-notes/updated-read-only-access-for-invoice-configuration-administrator-restricted-role-6df11845.md`
has a heading literally reading **"Workflows Page"**, parallel to "Forms and Fields Page", "Group
Configurations Page" and "Policies Page" — i.e. SAP itself counts Workflows as ONE page in a list of
four. Under that heading it enumerates the page's contents:
"View the list of Workflows and click on each item to view General, Steps, and Step Rules details",
"View the Approval Statuses…", "View the workflow Settings". One page, three of its tabs, one
release note.

### 5.1 The tab roster (all reached from the ONE Workflows page)

| Tab | Sub-tabs / wizard | Best evidence | Richest file (bytes) |
|---|---|---|---|
| **Workflows** | General page → Steps page → Step Rules page (wizard); Add Workflow Step page; Modify Workflow Step window; Edit Condition / Edit Action windows | "The Workflows tab on the Workflows page appears." | `create-a-new-workflow-554e86aa.md` **14,383** |
| **Settings** | — | "Settings tab and is shown in the following figure." | `invoice-settings-cace748d.md` 4,901 + `purchase-request-settings-b0bce285.md` 3,735 + `purchase-order-settings-a5a997b4.md` 1,417 |
| **Authorized Approvers** | **Authorized Approver List**, **Configuration** | "Click the Authorized Approvers tab and then the Authorized Approver List tab." | `approver-terminology-8559861c.md` 6,899; `filter-authorized-approvers-by-workflow-approval-step-aae69350.md` 6,234; `authorized-approver-list-a9522ec8.md` 3,773 |
| **Approval Statuses** | **Invoice**, **Purchase Request** | "Admins can create custom approval statuses for purchase requests by clicking Administration > Invoice > Workflows > Approval Statuses > Purchase Request…" | `work-with-purchase-requests-approvals-1c39ee21.md` 2,916 |
| **Email Notifications** | Modify Email Notification wizard (General step → Primary Recipient step → …) | "The administrator creates and maintains email notifications in Administration > Invoice > Workflows, on the Email Notifications tab." | `add-an-email-notification-c237a2de.md` 3,505 |
| **Confirmation Agreements** | Confirmation Agreement window | "On the Confirmation Agreements tab of the Workflows page, select the desired agreement:" | `create-a-confirmation-agreement-3e153f29.md` 2,293 |
| **Reason Category and Codes** | — | "Click the Reason Category and Codes tab." + own role gate | `overview-9c8ca06e.md` 1,917 |

The last two are corroborated jointly by the guide's revision history (March 2014): "Addition of
the: — Confirmation Agreements tab and options — Reason Category and Codes tab and options".

### 5.2 Contradictions recorded, NOT reconciled

**C1 — the middle nav node.** Two documented paths to the same page:
* `Administration > Invoice > Invoice Processing Admin (menu) > Workflows` — 5 topics
  (`access-workflow-fa9892a7`, `accessing-the-approval-statuses-tab-7ec7bb6e`,
  `access-the-confirmation-agreement-tab-666fa0ac`, `self-approval-of-cost-object-based-workflows-20fd435d`,
  `step-2-activate-the-feature-27a421e2`)
* `Administration > Invoice > Workflows (left menu)` — 8 citations, no Invoice Processing Admin node
  (`authorized-approver-list-a9522ec8`, `create-an-authorized-approver-step-4640b5a5`,
  `procedure-2d20b513`, `restrict-ad-hoc-steps-to-authorized-approvers-8a523257`,
  `select-an-email-notification-in-the-workflows-tab-663bb8ac`, `step-1-assign-the-level-to-the-workflow-step-6035f10a`,
  `step-2-assign-the-level-to-the-approver-d8bf669c`, `step-3-optional-select-enable-the-required-hardcopy-receipt-setting-c50e377e`)
Per the brief's own warning, the shorter form is most likely an abbreviation. **I do not reconcile
them. Automation should try the Invoice Processing Admin node first and fall back to a direct
left-menu item.**

**C2 — the Settings surface has FOUR names.** All four verified verbatim:
* "**Settings tab**" — `preventing-po-transmittal-…-51b11602.md`
* "**Settings section** of the Workflows tool" — `workflow-creation-process-1d37b85f.md`
* "**Workflow Settings page**" — `enabling-and-disabling-an-invoice-workflow-setting-0e1e6d33.md`
  and "in **Workflow Settings**" — `approver-terminology-8559861c.md`
* "**Settings page**" — `create-a-new-workflow-554e86aa.md`, `work-with-the-steps-page-fab249d1.md`
Plus a title-only stub `workflow-settings-8b3b98e1.md` (743 B). One surface, four labels. **The
graph should carry "Workflows > Settings tab" as canonical with the other three as aliases and this
contradiction attached.**

**C3 — Authorized Approver(s) tab, singular vs plural.**
* plural: "Click the Authorized Approvers tab." (`authorized-approver-list-a9522ec8.md`)
* singular: "The range is set in Administration > Invoice > Workflows > Authorized Approver tab."
  (`configuration-8b3be88b.md`) and `filter-authorized-approvers-…-aae69350.md`.
Almost certainly one tab; recorded as an alias contradiction, not two tabs.

**C4 — "Approval Statuses" was renamed.** Revision history, Sept 2016: "Updated images to reflect
change of Payment Request Approval Statuses tab to Approval Statuses tab." The old label may still
appear in a live tenant's docs or UI.

**C5 — UI variant claim.** `how-single-step-approval-workflow-works-40145f24.md` (tools-guides)
says the admin "uses the Authorized Approvers link from workflows **in the classic interface**".
That is the only "classic interface" claim in the workflow area, and it implies a second UI where
the Authorized Approvers surface may be reached differently.

### 5.3 New Experience — there is NO workflow twin, and that is a finding
`ls | grep -i new-experience` over both guide dirs returns exactly **five** files:
`end-user-experience-new-experience-85c2652b.md`,
`policies-the-purchase-order-policy-new-experience-5a1ba7ef.md`,
`purchase-order-matching-rules-new-experience-6c8fb80f.md`,
`using-the-invoice-manager-page-new-experience-f83ba5fa.md`,
`using-the-unassigned-invoice-page-new-experience-072e2f18.md`.
**None is a workflow admin topic.** Two are end-user runtime pages; two belong to already-built
pages (PO Policy, PO Matching Rules).

Instead, the Workflows topics were **rewritten in place** for the new UI. Revision history,
September 19 2025: "Updated images and text to the new UI for the Workflows Tool and Edit and Delete
Worflows [sic], Properties, and Steps sections." **So the single 2026_08 Workflows topic set already
IS the New Experience text — there is no richer/poorer twin to choose between.** For the automation
target that is good news: no variant fork needed in this group.

### 5.4 The PAGE vs the OBJECT
`workflows-tool-8b3b4dbe.md`: "The administrator can set up as many workflow scenarios as required
within the system." A *workflow* is an object; the *Workflows* page lists and edits them.
`create-a-new-workflow-554e86aa.md` (14,383 B) and `create-a-new-workflow-15992497.md` (2,017 B) are
**twins with different loios and radically different content** — `554e86aa` is the full General-page
field roster and the wizard walkthrough; `15992497` is a 3-paragraph conceptual note. **Not
republished duplicates. Diffed.** Both are about the OBJECT. `default-workflows-a6fa157a.md` (4,198 B),
`workflow-the-default-po-payment-workflow-8b35b62d.md`, `purchase-request-workflow-0cc46220.md`
and `example-of-typical-purchase-order-workflow-6d3b90d0.md` are all shipped workflow OBJECTS —
default data, not pages.

---

## 6. Finding (3) — Feature Hierarchies: its own thing, and it should be claimed

**Verdict: a distinct admin PAGE with its own left-menu entry and its own role gate. It belongs to
NEITHER Workflows nor Routing Configuration exclusively; it is a shared prerequisite tool. I
recommend claiming it as a standalone page rather than leaving it unclaimed a second time.**

Evidence:
* Own left-menu entry: "Click Feature Hierarchies (left menu)."
  (`step-2-associate-the-feature-hierarchy-to-the-source-list-bcaf1f5a.md`, tools-guides)
* Own sub-page: "…select *Invoice Vendor Employee Access*, and then click **Modify Hierarchy**."
* Own role gate, stated *in contrast to* the Workflows gate inside the same 3-step flow:
  "This portion of the configuration requires permissions for the **Feature Hierarchies section** in
  Administration." vs step 3's "…permissions for the **Workflows section** in Administration."
* Own numbered step in a second flow: "Step 2: Feature Hierarchies" (`overview-of-steps-37e3c289.md`).
* Serves at least **four** consumers: Payment Authorized Approvers hierarchy (Workflows, Flow A
  step 3), Cost Object Approver hierarchy (Workflows, Flow B step 1), **Invoice Routing** hierarchy
  (`create-the-invoice-routing-feature-hierarchy-8b510285.md` — the Routing Configuration boundary),
  and Invoice Vendor Employee Access (Group 4/5).
* 20 files mention it across both directories.
* All four graph endpoints naming it (`dep.g1.061`, `dep.g2.003`, `dep.g5g5.050`, `dep.g5g5.051`)
  are about a **Source List**, consistent with the Modify Hierarchy screen's Source List field.

The tools-guides filename says ROUTING, but that file describes *one* hierarchy definition made on
the Feature Hierarchies page, not the Routing Configuration page. The page is upstream of both.

---

## 7. Finding (4) — the Routing Configuration boundary

I read Routing Configuration's 10 field names out of the graph first, as instructed:
`search_routing_mappings`, `employee_last_name`, `segment_1_3`, `delete_flag`, `employee_id`,
`level_1_10_code`, `browse_button`, `import_button`, `download_template_button`,
`import_details_type_filter` — sourced from `search-for-hierarchy-mappings-1dea6bb6.md`,
`the-import-template-fields-and-descriptions-8b4aa547.md`, and three `step-N-*` import topics.

**Routing Configuration as built is the hierarchy-mappings SEARCH + EXCEL IMPORT tool** — it maps
employees to hierarchy nodes so invoices auto-assign. It contains **no approval-step, rule, approver
or notification control**. The Workflows page contains **no import, template or mapping control**.
The boundary is clean and I re-home nothing.

`tools-guides/workflow-and-approval-routing-8b4ff6c9.md` (1,502 B): **it falls on the WORKFLOW
side, and it is not a page.** It is one prose best-practice topic — "All workflow options available
for non-PO policies are also available to a PO-based invoice policy. This includes options such as
workflow rules and Authorized Approvers." — with zero navigation, zero fields, zero tables, and two
"More Information" pointers, both to workflow guides (*Workflow: The Default PO Payment Workflow* in
the PO Setup Guide, and *Concur Invoice: Workflows – General Information Setup Guide*). Despite the
word "Routing" in the title it never mentions hierarchy mappings or the import. **Not a page; a
guidance note about the Workflows page as applied to PO policies. It does not straddle.**

**No mis-homed Routing Configuration field found.** No finding against the existing graph on this
axis.

### Exceptions / Audit Rules boundary
Exceptions remains the hub. The exception-LEVEL **threshold** controls
(`Prevent … when exception level exceeds X`, ×3) sit on **Workflows > Settings tab**; the exception
**severity assignment** sits on Audit Rules; the exception **code** is created on Exceptions. The
Authorized Approvers > Configuration sub-tab adds a fourth exception-level surface
(`Minimum Exception Level` / `Maximum Exception Level`, "The range is set in Administration >
Invoice > Workflows > Authorized Approver tab"). Four surfaces, one concept. Graph deps
`dep.g2.012`, `dep.g2.013`, `dep.g2.014`, `dep.g2ar.023`, `dep.g2ar.024`, `dep.g2ar.026` all now
have a Workflows-side endpoint to resolve to. `exception-helper-within-the-audit-rules-and-workflow-tools-07dfd781.md`
(1,191 B) confirms the helper is shared UI in *both* tools, not a page.

---

## 8. Finding (5) — end-user rejections, each with where its configuration lives

Every rejection below names the config home. That sentence is the deliverable.

| Rejected screen | Why | **Its configuration lives on** |
|---|---|---|
| **Approval Flow page** / *Approval Flow for Invoice* (`approval-flow-page-c73e063f.md`, 2,943 B) | Employee/approver runtime screen, opened from an invoice via Details > Approval Flow (legacy) or Actions > Approval Flow (new UI) | **Workflows > Workflows tab > General page** (`Steps Can Be Added By`, `Do not display the skip steps to the employee`, `Allow ad-hoc steps after final processor step`, `Restrict Authorized Approver for`) **and Workflows > Settings tab** (`Allow users to select their own approver for payment requests`). The Settings-tab checkbox explicitly *overrides* the General-page fields. |
| **Requests Pending Your Approval window** | Approver runtime | **Workflows > Settings tab** — `Display purchase request approval links to approvers on the home page` |
| **My Work approval links on the home page** (Approve / Send Back to Employee) | Approver runtime | **Workflows > Settings tab** — `Display payment request approval links to approvers on the home page` |
| **Invoice Manager page** / **Unassigned Invoices page** (incl. their `*-new-experience-*` twins) | Processor runtime lists | Already-built pages: **Invoice Settings**, **Policies**, **Group Configurations** — plus the Workflows page for the approval steps those lists display |
| **View the Approval Workflow of an Invoice** (`view-the-approval-workflow-of-an-invoice-d8046bec.md`, 1,878 B) | Processor viewing one invoice's flow | **Workflows page** (the workflow object being viewed) |
| **Batch verification / Verification page** (`moving-through-the-batch-verification-workflow-01738020.md`, 2,807 B) | Verifier runtime; the word "workflow" here means the payment-batch process, not approval workflow | **Payment Manager batch settings** (`configuring-batch-settings-*.md`, `Settings tab` of the batch tool) — **not a Workflows surface at all** |
| **Single Step Approval Workflow** (`how-single-step-approval-workflow-works-40145f24.md`) | Describes runtime behaviour | **Workflows > Authorized Approvers tab** (approval limit) **+ Workflows > Workflows tab > Step Rules page** (the skip-step rule) **+ User Administration** (Invoice Approver role) |
| **Delegate / proxy switching, Act as a Proxy** | End-user/proxy runtime | **Delegate Configurations page** (see §9) **+ User Administration** (Invoice Proxy Logon role) |
| **Invoice Preferences** (`Profile > Profile Settings > Invoice Preferences`) | **END-USER PROFILE page**, not admin — despite carrying a `(left menu)` string that pollutes the left-menu census | **Workflows > Email Notifications tab** (the notification templates), **Workflows > Workflows tab > General page** (which notifications a workflow sends), **Workflows > Settings tab** (approver prompt) |
| **Workflow Errors** (`workflow-errors-6b89e3f8.md`, 1,058 B) | A runtime error message, no screen | **Workflows > Authorized Approvers tab** (empty approver table is the named cause) |
| **Approve / Send Back / Recall buttons** | Runtime actions | **Workflows > Workflows tab > Steps page** (`Approval Actions` per step) and **Workflows > Workflows tab > General page** (`Allow employee to recall payment requests`) |

### Same-noun trap, stated explicitly
"Workflow **step**" names two things. The ADMIN object is created and ordered on
*Workflows > Workflows tab > Steps page* via the *Add Workflow Step* page and the *Modify Workflow
Step* window (`Step Name`, `Role`, `Approval Actions`, `Status`). The RUNTIME step is what an
approver acts on from the Approval Flow page and the approval queue. Topics using imperative
"reorder the steps / select the Role" are ADMIN; topics using "the invoice moves to / the approver
sees" are RUNTIME. `default-workflows-a6fa157a.md` describes runtime step sequences of shipped
objects and is neither.

---

## 9. Unique find — Delegate Configurations

I found no sign that any group owns this, and no dependency endpoint in the graph names it.

* Own left-menu entry: "Select Delegate Configurations (left menu) , the Delegate Configurations
  page appears." (note the stray space before the comma — quote it verbatim).
* Two tabs mirroring the Approval Statuses tab structure: "Select the Invoice or Purchase Request tab."
* Own sub-page: "Choose New. The Add Delegate Configuration - Invoice page appears."
* Six files, ~14.7 KB total; the two richest are 3,872 B (11-row field table, `grep -cP "^\s*\|"` = 37)
  and 6,302 B (`= 22`).
* It is the **admin home of delegate approval authority**, including
  `Restrict approvers to those with equal or higher authorized approver limit` — a control that
  reads directly against the Workflows Authorized Approvers tab. That cross-reference is the reason
  I judge it workflow-adjacent rather than a Group 4 vendor/capture page.
* It is also referenced from the Workflows General page field
  `Allow delegated approvers to approve their own requests`.

**Recommendation: emit it as its own page.** Whether it is filed under Workflows or as a standalone
is a curation call; what must not happen is a third pass leaving it unclaimed.

---

## 10. What the build should aim at (richest material, byte counts from `wc -c`)

| Priority | File | Bytes | md rows | What it yields |
|---|---|---|---|---|
| 1 | `admin/create-a-new-workflow-554e86aa.md` | 14,383 | 85 | The **General page** field roster — ~24 controls with valid values. Biggest single payload in the group. |
| 2 | `admin/work-with-the-step-rules-page-4c33cda0.md` | 11,246 | 29 | Step Rules page, Edit Condition / Edit Action windows |
| 3 | `admin/work-with-the-steps-page-fab249d1.md` | 6,726 | 28 | Add/Modify Workflow Step field roster (`Role`, `Approval Actions`, `Status`) |
| 4 | `admin/approver-terminology-8559861c.md` | 6,899 | — | Authorized approver semantics + the Workflow Settings cross-reference |
| 5 | `admin/general-information-8b3b0308.md` | 6,719 | — | **Structural gold**: the tab roster via revision history. Not a field source. |
| 6 | `admin/filter-authorized-approvers-by-workflow-approval-step-aae69350.md` | 6,234 | — | Level-based authorized approvers |
| 7 | `admin/create-a-new-invoice-delegate-configuration-fcf42662.md` | 6,302 | 22 | Delegate Configurations field roster |
| 8 | `admin/workflow-creation-process-1d37b85f.md` | 6,071 | — | **The ConfigStep ordering for the whole group** (Flow A) |
| 9 | `admin/invoice-settings-cace748d.md` | 4,901 | 10 md + 3 packed `<tr>` | Settings tab, invoice member — **parse the raw `<table>` or lose 3 of 5 settings** |
| 10 | `admin/default-workflows-a6fa157a.md` | 4,198 | — | Default workflow objects (valid-value source for step names/roles) |
| 11 | `admin/access-and-view-payment-delegate-configurations-8ed1298f.md` | 3,872 | 37 | Delegate Configurations list columns |
| 12 | `admin/authorized-approver-list-a9522ec8.md` | 3,773 | 16 | New/Modify Authorized Approver window |
| 13 | `admin/purchase-request-settings-b0bce285.md` | 3,735 | 13 | Settings tab, PR member |
| 14 | `admin/add-an-email-notification-c237a2de.md` | 3,505 | 0 | Email Notification wizard — **0 md rows, all prose steps; do not dismiss on a row count** |

---

## 11. Bottom line for the roster

* **1 page** — Workflows (7 tabs, 2 tabs with sub-tabs, 1 three-page wizard, ≥4 dialogs).
* **+2 adjacent pages** — Feature Hierarchies, Delegate Configurations (neither previously claimed).
* Everything else in the workflow domain is a tab, a wizard page, a dialog, a workflow OBJECT, an
  end-user runtime screen, or a duplicate of an already-built page.

Thirteen was an upper bound. The corpus supports **three pages**, and the thirteen-row memory is
most likely a memory of the Workflows page's tabs and wizard pages, not of thirteen left-menu
entries. That discrepancy is itself the finding.

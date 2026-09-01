# Workflows / Approval recon — SWEEP: rolesmenus
SAP Concur Invoice, Professional Edition, corpus version 2026_08, crawled 2026-08-29.
Entry direction: **left-menu enumeration + role gates + feature-activation gates.**
Every quote in this report was `grep -F -c` verified against the cited file before it was written down.

---

## HEADLINE

**Workflows is ONE PAGE with five tabs, and a July 2025 release note enumerating a role's
read-only reach says so in one sentence.** Everything the corpus calls "Workflow Settings",
"Approval Statuses", "Authorized Approvers" and "Email Notifications" hangs off it.
The **Invoice Settings / Purchase Request Settings / Purchase Order Settings family lives together
on the Workflows > Settings tab** — answer (a), with a caveat that makes the Invoice member
rebuild debt. Two *other* left-menu pages that touch approval — **Delegate Configurations** and
**Feature Hierarchies** — are genuinely separate pages with their own left-menu entries, and both
are currently unclaimed by any group.

The corpus supports **3 pages** in and adjacent to this domain, not 13. Thin is the answer.

---

## 1. WHAT I SEARCHED (method)

I entered from the navigation and permission side rather than the topic side, on the theory that
a left-menu enumeration and a role-reach enumeration are both indexes of the admin surface read
from the outside.

1. Enumerated **every** `(left menu)` string in both guide directories — this is the single most
   discriminating census in this corpus for page-hood, because a left-menu entry is the definition
   of a page here.
2. Enumerated every `Invoice Processing Admin menu, click X` string.
3. Enumerated every `Administration > Invoice > X` string (allowing for the missing-space and
   `Polices` traps).
4. Swept role/permission files (`required-roles*`, `permissions-*`, `access-by-roles`,
   `combine-invoice-roles-*`) and the phrase `requires permissions for the`.
5. Swept feature-activation phrasing (`contact SAP Concur support`, `must be enabled by`,
   `activate`, `enable the`) restricted to files mentioning workflow.
6. Diffed the known duplicate-title twins and checked for `*-new-experience-*` twins.
7. Read `/mnt/c/Users/manci/PROJECTS/concur-config-diver-support/output/kg-invoice-config.json` for
   the 20 built pages, the 10 Routing Configuration field names, and every dependency endpoint
   naming Workflows / Feature Hierarchies / Delegate Configurations / PR+PO Settings.

### The left-menu census (the load-bearing result)

`grep -rhoP "[A-Z][A-Za-z &/-]{2,40}\(left menu\)"` over both guide dirs, deduped:

| hits | left-menu label | status |
| --- | --- | --- |
| 8 | Forms and Fields | built (G5) |
| 7 | Attendees | **NOT in the graph — out of my domain, flagged below** |
| 8 | Workflows (6 + 2 as "Click Workflows") | **MY GROUP — the page** |
| 4 | Audit Rules | built (G2) |
| 4 | Invoice Settings | built (G1) |
| 2–3 | Tax Administration, List Management, Group Configurations, Image Handling, Policies/Polices, Purchase Order Matching Rules, Company Locations, Localization, User Permissions, User Administration, Site Settings, Invoice Preferences, Expense Type Import | built / other group / not Invoice-admin |
| 1 | **Delegate Configurations** | **unbuilt, unclaimed — candidate** |
| 1 | **Feature Hierarchies** | **unbuilt, unclaimed — candidate** |

There is **no** left-menu entry anywhere in the corpus for "Approval Statuses", "Authorized
Approvers", "Email Notifications", "Workflow Settings", "Purchase Request Settings" or
"Purchase Order Settings". That absence is the primary evidence for the single-page verdict.

---

## 2. INHERITED FINDING (2) — SETTLED: WORKFLOWS IS ONE PAGE WITH TABS

### The clincher, from a release note (labelled as such)

`concur-invoice-professional-edition-release-notes/updated-read-only-access-for-invoice-configuration-administrator-restricted-role-6df11845.md`
enumerates, per page, what the Invoice Configuration Administrator (Restricted) can see. Its
headings are literally `Forms and Fields Page`, `Group Configurations Page`, `Policies Page`,
**`Workflows Page`** — and under that last heading:

> View the list of Workflows and click on each item to view General, Steps, and Step Rules details
> View the Approval Statuses and click on each item to view status details
> View the workflow Settings

One page. The workflow list, the Approval Statuses and the Settings are all inside it.
Same file: *"To access these configuration settings, go to the Administration menu, select Invoice,
and then choose a page from the Invoice Processing Admin list."*
**This is a release note and is cited as corroboration of a page NAME and page STRUCTURE only.**

### The admin-guide click paths agree

- `admin-guides/authorized-approver-list-a9522ec8.md`: *"Click Administration > Invoice > Workflows (left menu). The Workflows page appears."* — then *"Click the Authorized Approvers tab."* then *"Click the Authorized Approver List tab."*
- `admin-guides/access-workflow-fa9892a7.md`: *"From the Invoice Processing Admin menu, click Workflows."* → *"The Workflows tab on the Workflows page appears."*
- `admin-guides/preventing-po-transmittal-...-51b11602.md`: *"Settings tab and is shown in the following figure."* (full line, with U+00A0 separators: `The setting appears in Administration␠Invoice␠Workflows␠Settings tab…`)
- `admin-guides/overview-8b3df67d.md`: *"The administrator creates and maintains email notifications in Administration > Invoice > Workflows, on the Email Notifications tab."*
- `admin-guides/work-with-purchase-requests-approvals-1c39ee21.md`: *"clicking Administration > Invoice > Workflows > Approval Statuses > Purchase Request"*
- `admin-guides/accessing-the-approval-statuses-tab-7ec7bb6e.md`: `Administration Invoice` → `Invoice Processing Admin menu, click Workflows` → *"Select the Approval Statuses tab."*

### Resulting tab tree (all corpus-evidenced)

```
Workflows  (page; left menu under Administration > Invoice, inside the Invoice Processing Admin list)
├── Workflows tab            list of workflow OBJECTS; New/Copy/Modify/Remove
│     └── workflow editor (wizard, not a page): General page → Steps page → Step Rules page
│           ├── Add Workflow Step / Modify Workflow Step window
│           └── Edit Condition / Edit Action window ("the Condition page", condition editor)
├── Settings tab             = "Workflow Settings page" = "Settings section" = "Settings page"
│     ├── Invoice Settings          (5 settings — see §3)
│     ├── Purchase Request Settings (3 settings)
│     └── Purchase Order Settings   (1 setting)
├── Authorized Approvers tab
│     ├── Authorized Approver List sub-tab
│     └── Configuration sub-tab      (feature activation + Min/Max Exception Level)
├── Email Notifications tab
└── Approval Statuses tab
      ├── Invoice sub-tab
      └── Purchase Request sub-tab
```

### CONTRADICTIONS I am recording rather than reconciling

| # | Contradiction | Evidence |
| --- | --- | --- |
| C1 | Workflows sits **directly under Administration > Invoice** vs **under the Invoice Processing Admin node** | `authorized-approver-list-a9522ec8.md` "Workflows (left menu)" vs `access-workflow-fa9892a7.md` "From the Invoice Processing Admin menu, click Workflows." Per the known menu-drift trap these are probably the same path abbreviated; I did not merge them. |
| C2 | **"Workflows tab"** vs **"Workflow tab"** (singular) for the list tab | `access-workflow-fa9892a7.md` vs `managing-items-on-purchase-request-belonging-to-the-same-vendor-37e7bf0f.md` "The setting appears in Administration > Invoice > Workflows > Workflow tab" |
| C3 | **"Authorized Approvers tab"** vs **"Authorized Approver tab"** (singular) vs **"Authorized Approvers page"** vs **"Authorized Approvers section"** vs **"Add Authorized Approvers page within Workflows"** | `authorized-approver-list-a9522ec8.md` / `configuration-8b3be88b.md` "The range is set in Administration > Invoice > Workflows > Authorized Approver tab." / `approver-terminology-8559861c.md` "the Workflows, Authorized Approvers page, Authorized Approver feature is available for workflows setting." / `workflow-creation-process-1d37b85f.md` "set up in the Authorized Approvers section of the Workflows tool" and "use the Add Authorized Approvers page within Workflows" |
| C4 | The settings surface is called **Settings tab**, **Settings section**, **Settings page**, and **Workflow Settings page** in four different files | see §3 |
| C5 | Workflow objects are edited on a **"General page"** but `self-approval-of-cost-object-based-workflows-20fd435d.md` calls it a **"General step"** | "In the General step, select the Allow Self Cost Object Approval option." |

### PAGE vs OBJECT

`workflows-tool-8b3b4dbe.md`: *"The administrator can set up as many workflow scenarios as required
within the system."* A **workflow** is an object; the **Workflows page** lists and edits them.
`create-a-new-workflow-554e86aa.md` is about the OBJECT ("On the Workflows tab, select the desired
workflow and click Copy.") and is the richest field source in the domain (14,383 B) — but it is not
evidence of a second page.

---

## 3. INHERITED FINDING (1) — SETTLED: THE SETTINGS FAMILY IS ANSWER (a), WITH A DEBT CAVEAT

### I reproduced the clincher

```
grep -c "select their own approver" .../available-invoice-settings-8b3411f0.md   -> 0
grep -c "select their own approver" .../invoice-settings-cace748d.md             -> 2
```
Both reproduce exactly. Byte counts from `wc -c`: available-invoice-settings-8b3411f0.md **8,368 B**;
invoice-settings-cace748d.md **4,901 B**; purchase-request-settings-b0bce285.md **3,735 B**;
purchase-order-settings-a5a997b4.md **1,417 B**.
I also confirmed against the graph that **zero** configFields cite `invoice-settings-cace748d.md`
(the 9 Invoice Settings fields all cite `available-invoice-settings-8b3411f0.md`).
`purchase-request-settings-b0bce285.md` **also** returns 2 for "select their own approver" — it
carries its own PR-scoped copy of the approver-selection setting.

### Where the family lives: Workflows > Settings tab

- `preventing-po-transmittal-when-po-exceeds-specified-exception-level-51b11602.md` puts the **PO** member on `Administration Invoice Workflows Settings tab` — *"Settings tab and is shown in the following figure."* and *"A setting in Workflows can be used to prevent PO transmission if the PO exceeds a specified exception level."*
- `enabling-and-disabling-an-invoice-workflow-setting-0e1e6d33.md` is the family's shared procedure: *"Review the tables below for each setting function"* then *"On the Workflow Settings page, select a setting option."* — "the tables below" is exactly the three sibling tables.
- `approver-terminology-8559861c.md` puts the **Invoice** member there by name: *"flag is set in Workflow Settings"* (full clause: `AND the Allow users to select their own approver for payment requests flag is set in Workflow Settings`).
- `workflow-creation-process-1d37b85f.md`: *"A decentralized workflow is set as the default for workflows and is set in the Settings section of the Workflows tool."*
- `create-a-new-workflow-554e86aa.md` and `work-with-the-steps-page-fab249d1.md` both cross-reference it as *"field on the Settings page cleared (disabled)"* — i.e. workflow-step fields depend on it.
- `general-information-8b3b0308.md` (an admin guide, not a release note — it is the Workflows General Information guide's revision history): *"New Settings tab option: Prevent purchase order transmissions setting."* and *"Addition of two new options to the Settings tab:"* listing the Cost Object filter and processor-recall options that appear in `invoice-settings-cace748d.md`. That is independent confirmation that the **Invoice** member's rows were shipped to the **Settings tab**.

**Verdict: (a). All three members are tables on the Workflows page's Settings tab.**

### The debt caveat the brief asked for, stated plainly

`invoice-settings-cace748d.md` is titled **"Invoice Settings"** — the same label as the **built
Invoice Settings page** (`/expense/admin/invoice/invoiceSettings.asp`, Group 1). They are **not the
same surface**. The built page's roster is `available-invoice-settings-8b3411f0.md`
(*"The Invoice Settings page includes the following settings used to activate a feature"*); the
Workflows Settings-tab table is `invoice-settings-cace748d.md`. This is a **label collision, not a
naming coincidence and not a family split** — the family (Invoice/PR/PO) is real and lives on the
Settings tab, but its *invoice* member shares a name with a different built page.
**Recommendation to the builder: name the Workflows child node "Settings tab" (or "Workflow
Settings") and never "Invoice Settings", so the two never merge in the graph.** No Invoice Settings
rebuild debt is created by this group, because the built page's 9 fields come from a different file
and are not touched.

### Two build flags

1. **Packed-`<tr>` correction.** The inherited note calls `invoice-settings-cace748d.md` a
   "3-row Setting|Description table". It is **5 settings**: 2 in a markdown table
   (`grep -cP '^\s*\|'` → 10 rows) plus **3 more packed into a single raw-HTML table**
   (`grep -o '<tr' | wc -l` → **3**, `grep -o '<table[ >]' | wc -l` → 1). The three hidden ones are
   *Prevent this payment request submission when exception level exceeds X*,
   *Filter payment request items to those that are applicable to Cost Object*, and
   *Allow processor to recall a payment request to last processor step*.
   A `^|` census would have found 2 of 5. Do not repeat that.
2. **Prose numeric range confirmed.** *"Type a number from one to 99."* returns 1 in **all three**
   files (invoice, PR **and** PO). No digit-based range regex will find it. The graph's
   dep.g2.012 / dep.g2.013 endpoints are corroborated verbatim:
   `Prevent purchase request submission when exception level exceeds X` (PR file) and
   `Prevent purchase order transmission when exception level exceeds X` (PO file) each return 1.

---

## 4. INHERITED FINDING (3) — FEATURE HIERARCHIES: ITS OWN PAGE, AND I CLAIM IT HERE

It is unambiguously a page with its own left-menu entry:
- `tools-guides/step-2-associate-the-feature-hierarchy-to-the-source-list-bcaf1f5a.md`: *"Click Feature Hierarchies (left menu)."* then *"On the Feature Hierarchies, select "* … *"and then click Modify Hierarchy."*
- `admin-guides/professional-edition-fb3e6aa2.md`: `Go to Administration␠Invoice␠Feature Hierarchies.` then *"Select the Invoice Payment feature name."*

It is **cross-domain**: the corpus documents four distinct feature names selected on it —
**Invoice Routing** (`tools-guides/create-the-invoice-routing-feature-hierarchy-8b510285.md`:
*"the Invoice Routing hierarchy in the Feature Hierarchies area"*), **Invoice Payment**,
**Invoice Vendor Employee Access**, and the two workflow hierarchies.

Its workflow tie is direct and role-gated:
- `step-1-define-the-cost-object-approver-hierarchy-6e7b7dc6.md`: *"This portion of the configuration requires permissions for the Feature Hierarchies section in Administration."*
- `workflow-667cee21.md`: *"Feature Hierarchies before selection via the Policy tool."* (full: `PR hierarchies are set up independently, including Authorized Approval and COA. These must be configured using Invoice␠Feature Hierarchies…`)

**Verdict: Feature Hierarchies is a page in its own right, belonging to no single group.** Two of
its four documented feature names (Cost Object Approver hierarchy, Authorized Approver hierarchy)
are workflow prerequisites and the numbered setup flows that use it are workflow flows. Group 3
declined it; leaving it unclaimed twice is the worse error. **I recommend this group claim it as a
shared-prerequisite page**, explicitly noting the Routing Configuration overlap (dep.g2.003) and the
List Management overlap (dep.g5g5.050/051) rather than re-homing any of those fields.

---

## 5. INHERITED FINDING (4) — THE ROUTING CONFIGURATION BOUNDARY

Routing Configuration's 10 built fields, read out of the graph, are **entirely an import surface**:
`search_routing_mappings`, `employee_last_name`, `segment_1_3`, `delete_flag`, `employee_id`,
`level_1_10_code`, `browse_button`, `import_button`, `download_template_button`,
`import_details_type_filter` — sourced from `search-for-hierarchy-mappings-1dea6bb6.md`,
`the-import-template-fields-and-descriptions-8b4aa547.md`, `step-3-upload-and-import-template-and-data-b9a80bb6.md`,
`step-1-download-hierarchy-mappings-template-excel-spreadsheet-d981b372.md`, `step-4-review-import-details-414c8cd5.md`.

**The boundary is clean and there is no overlap to report.** Routing Configuration = mapping
employees to hierarchy segments via a spreadsheet import. Workflows = approval steps, rules,
approver authority, statuses and notifications. Nothing I found belongs on Routing Configuration,
and I re-homed nothing.

**`tools-guides/workflow-and-approval-routing-8b4ff6c9.md` (1,502 B) falls on NEITHER side as a
page.** It is best-practice prose with no click path, no fields and no UI nouns:
*"All workflow options available for non-PO policies are also available to a PO-based invoice
policy."* It is a *pointer* to the Workflows page from PO-policy context. **Not a page. Not a field
source. Not a Routing Configuration topic.**

---

## 6. COST OBJECT APPROVAL — NO PAGE OF ITS OWN (the cluster resolves to two existing surfaces)

13 admin filenames contain `cost-object`; **not one** of them describes a dedicated cost-object
admin page. The numbered flow implied by `step-1-define-the-cost-object-approver-hierarchy-6e7b7dc6.md`
resolves to exactly two surfaces:

- **Step 1 → Feature Hierarchies** — *"This portion of the configuration requires permissions for the Feature Hierarchies section in Administration."*
- **Step 2 → Workflows page, workflow General page** — `step-2-activate-the-feature-27a421e2.md`: *"This portion of the configuration requires permissions for the Workflows section in Administration."* then Invoice Processing Admin → Workflows → Workflows tab → Copy/Modify → *"In the Cost Object Hierarchy Type field, select the desired type: Level or Limit."*
- **Step 3 → Steps page** (`step-3-edit-the-workflow-steps-f2731590.md`, same permission sentence).
- Self-approval → same place: `self-approval-of-cost-object-based-workflows-20fd435d.md` *"the admin needs to activate this feature in the Workflows tool."* → *"In the General step, select the Allow Self Cost Object Approval option."*

**No cost-object page. No import-only screenless path.** The cluster is two surfaces I have already
named. This was the brief's "likeliest place for a page nobody else finds" — I looked, and the
honest answer is that there isn't one.

---

## 7. DELEGATES — DELEGATE CONFIGURATIONS **IS** A PAGE (highest-value find of this sweep)

17 admin filenames contain `delegate`. They converge on a real, separately-navigated page:

- `access-and-view-payment-delegate-configurations-8ed1298f.md` (3,872 B):
  *"Invoice delegates are accessed from the Invoice Admin link."* →
  `Select Administration > Invoice.` → **"Select Delegate Configurations (left menu) , the Delegate Configurations page appears."** (the stray space before the comma is verbatim) →
  *"Select the Invoice or Purchase Request tab."*
- `create-a-new-invoice-delegate-configuration-fcf42662.md` (6,302 B):
  *"On the Delegate Configurations page, select either the Invoice or Purchase Request tab."* →
  New → **Add Delegate Configuration - Invoice** page, with a real field roster
  (Configuration Name, Maximum Time Period to Approve, Restrictions, *Restrict approvers to those
  with equal or higher authorized approver limit*, Can Prepare / Can Submit / Can Approve …).
- `edit-an-invoice-delegate-configuration-c7f51424.md` → Modify Delegate Configuration page.
- `delete-an-invoice-delegate-configuration-92627a9b.md`, `special-considerations-for-delegate-configurations-8b2bfccb.md`.

**Page-hood: PAGE.** Own left-menu entry, own tabs (Invoice / Purchase Request), own child pages.
It is *not* a Workflows tab — the corpus never once puts it under Workflows.
It is squarely in the approval domain (Can Approve, Can Approve Temporary, approver-role
requirement, authorized-approver-limit restriction) and it resolves the graph's existing unresolved
endpoint **dep.g1.059 → {Delegate Configurations, …}**. **Claim it.**

---

## 8. SWEEP D — ROLES: THE TWO SENSES, KEPT APART

### Sense A — roles that REACH an admin surface (the gates)

| Role | Surfaces it is documented as reaching | Evidence |
| --- | --- | --- |
| Global Invoice Configuration administrator | Workflows tool (create + manage) | `workflows-tool-8b3b4dbe.md`: *"Both the Global Invoice Configuration administrator and the Group Invoice Configuration administrator can view the Workflows tool."* |
| Group Invoice Configuration administrator | Workflows tool, **only for their groups, and only if granted create rights** | same file |
| Invoice Configuration Administrator **(Restricted)** | Workflows, Policies, Group Configurations, Forms and Fields — **read-only**; New/Copy/Remove disabled | release note `…-6df11845.md`: *"Workflows Page"*, *"View the workflow Settings"* |
| Invoice Configuration administrator (Unrestricted) | Capture Processing Admin, Routing Configuration, Forms & Fields | `required-roles-3ddb8d70.md` (not workflow-domain; listed for completeness) |
| unnamed — "permissions for the **Workflows section** in Administration" | Workflows page | `step-2-activate-the-feature-27a421e2.md`, `step-3-edit-the-workflow-steps-f2731590.md` |
| unnamed — "permissions for the **Feature Hierarchies section** in Administration" | Feature Hierarchies page | `step-1-define-the-cost-object-approver-hierarchy-6e7b7dc6.md` |
| Invoice Admin role | Payment Group Configuration (via Feature Hierarchies) | `professional-edition-fb3e6aa2.md` |

There is **no "Workflow Administrator" role gate** in this corpus. The single occurrence of the
phrase — `work-with-the-steps-page-fab249d1.md`, *"The Workflow administrator can select which of
these actions should be available to the approver."* — is descriptive prose about who does the
configuring, not a named role that gates a page. Do not create a role node from it.

### Sense B — roles a workflow step ROUTES TO (subject matter, not gates)

From `work-with-the-steps-page-fab249d1.md`, the **Role** field on Add/Modify Workflow Step offers
`System`, `Authorized Approver`, `Invoice Approver`, `Invoice Processor`, `Invoice Processor
Manager`, `Invoice Vendor Manager`. From `approver-terminology-8559861c.md`: Approver, Authorized
Approver, Budget Approver, Default Approver — and *"An Approver is set within User Permissions."*
**These are step-routing values, not page gates.** A future builder must not turn them into role
gates. Notably, the *Approver* role itself is assigned on **User Permissions / User Administration**,
which is a Shared admin tool outside the Invoice config surface entirely.

### Feature activation

Only two workflow-domain files carry support-gated activation language, and only one is a real gate:
- `work-with-purchase-requests-approvals-1c39ee21.md`: *"Contact SAP Concur support if you need help configuring this feature."* — this is a help offer, **not** a hard gate. The PR approval-status tab is client-configurable.
- The **only in-product activation switch** I found is on the Workflows page itself:
  `procedure-2d20b513.md` → Workflows → Authorized Approvers tab → *"Click the Configuration tab."* → *"To activate the feature, select Authorized Approver feature is available for workflows."*
  That check box gates the entire Authorized Approver apparatus. It is load-bearing config knowledge
  and it is **self-service**, not support-gated.

---

## 9. RULED OUT — END-USER / RUNTIME SCREENS, AND WHERE THEIR CONFIG LIVES

Every rejection names the configuring surface, as required.

| Rejected screen | Why | **Where its configuration lives** |
| --- | --- | --- |
| **Approval Flow page** (`approval-flow-page-c73e063f.md`, 2,943 B) | Runtime, opened from inside an invoice: *"The Approval Flow for Invoice page appears by clicking Details > Approval Flow in an opened invoice in the legacy UI."* | Its editability is governed by **Workflows > Settings tab** (`Allow users to select their own approver for payment requests`) and by the workflow object's **General page** (`Steps Can Be Added By`, `Do not display the skip steps to the employee`) and **Steps page** (`Approver Editable By`, `Deletable By`). Per `invoice-settings-cace748d.md`, clearing the Settings-tab check box **overrides** the workflow-level fields. |
| **Requests Pending Your Approval window** | Approver runtime UI, named only inside a setting's description. | **Workflows > Settings tab** → `Display purchase request approval links to approvers on the home page` (PR file) and `Display payment request approval links to approvers on the home page` (invoice file). |
| **My Work / home-page approval links** | Home-page runtime area. | Same two Settings-tab check boxes. |
| **Approve / Send Back to Employee / Recall buttons** | Approver actions. | Button *text* comes from **Workflows > Approval Statuses tab** (`Action Text` field); button *availability* per step comes from the **Approval Actions** field on Add/Modify Workflow Step; recall comes from the Settings-tab `Allow processor to recall a payment request to last processor step`. |
| **Invoice Manager page** (incl. `using-the-invoice-manager-page-new-experience-f83ba5fa.md`) | Processor day-to-day work surface, in tools-guides. | Nothing on it is a workflow config field; the processor's *role* is assigned in **User Permissions**, and the processor **step** is configured on the Workflows page's Steps page (Role = Invoice Processor). |
| **Batch verification workflow** (`moving-through-the-batch-verification-workflow-01738020.md`) | Capture verification runtime. | **Capture Processing Admin** (built, Group 4). Not a Workflows surface despite the word. |
| **Delegate / proxy switching, "Delegate Experience"** (`delegate-experience-8b30fb06.md`, `delegates-and-proxies-a88c80e0.md`) | End-user Profile behaviour. | **Delegate Configurations page** (§7) — the admin sets the cascading permission template; the user then picks within it in Profile. |
| **View the Approval Flow / View the approval workflow of an invoice** (4 near-identical tools-guides topics) | Read-only runtime views. | Same as Approval Flow page above. |
| **Purchase Request Approver Experience** (`purchase-request-approver-experience-8b50b701.md`) | Approver runtime. | **Workflows page**, PR workflow object + **Workflows > Settings tab** PR settings. |

### Also ruled out as pages (structural, not end-user)

| Rejected | Why |
| --- | --- |
| **Workflow Settings** as a separate page | It is the Settings **tab** of the Workflows page. `workflow-settings-8b3b98e1.md` is a 743-byte descriptive stub with **no click path and no fields**; the procedure file says "page" but the two files carrying a real navigation string both say **tab**. Recorded as contradiction C4, resolved to *tab* on click-path evidence. |
| **Approval Statuses**, **Authorized Approvers**, **Email Notifications** | Tabs. All three are only ever reached by clicking a tab after landing on Workflows. No left-menu entry for any of them corpus-wide. |
| **Purchase Request Settings / Purchase Order Settings** as pages | Settings **tables** on the Settings tab. §3. |
| **General page / Steps page / Step Rules page** | Wizard pages of the workflow **object**, inside the Workflows tab. |
| **Add Workflow Step / Modify Workflow Step / New Authorized Approver / Modify Authorized Approver / Report Status / Request Status / Edit Condition / Edit Action windows** | Dialogs. |
| **"Condition page" / condition editor** (`conditional-expressions-and-the-condition-page-4d98af34.md`, 9,326 B) | A dialog opened from Step Rules. Rich (operators, data objects, expression grammar) — a **field/value source**, not a page. |
| **Workflow and Approval Routing** (`tools-guides/workflow-and-approval-routing-8b4ff6c9.md`) | Best-practice prose. No page. §5. |
| **Workflow Guides ×4** (`8b3b85da` 1,473 B / `8b3c7b2a` 1,784 B / `8b3d6ede` 1,769 B / `8b3e09a7` 1,663 B) | Four distinct loios, four different short-descriptions, same guide-cross-reference table. Doc navigation, **not** UI. No page. |
| **Attendees** (7 `(left menu)` hits, Settings tab, `procedure-configure-settings-068fa6f3.md`) | A real left-menu admin page **not in the graph's 20 and not claimed by any group** — but it is attendee/expense-type configuration, **not workflow**. Flagging it for whoever owns Group 5/7; I am not claiming it. |

---

## 10. TWIN / VARIANT DIFFS (as required)

- **`create-a-new-workflow-15992497.md` (2,017 B) vs `create-a-new-workflow-554e86aa.md` (14,383 B)** — different loio (`15992497…` vs `554e86aa…`), **genuinely different content**, not a gerund/imperative republish. `…15992497` is conceptual ("The administrator cannot create a workflow from scratch") and contains the useful phrase *"the General page in the Workflows tab of the Workflows tool"*. `…554e86aa` is the procedure and carries **the single richest field table in the domain** (85 pipe-rows: Workflow Type, Workflow Name, Require Hardcopy Receipts, Approval Time Expired Action + 5 enumerated values, Expire After This Many Days, Expiration Email to Approver + 3 values, Assignment Timeout Action + 2 values, Allow Timeout Extensions for This Many Days, Do not display the skip steps to the employee, Use default approver at or above the current approver's level, Steps Can Be Added By …). **Aim the build at `554e86aa`.**
- **`workflow-guides-*.md` ×4** — four loios, four different short-descriptions, same payload. Doc-nav duplicates; keep none.
- **New Experience twins: NONE in this domain.** The only `*-new-experience-*` files corpus-wide are `end-user-experience-*`, `policies-the-purchase-order-policy-*`, `purchase-order-matching-rules-*`, `using-the-invoice-manager-page-*`, `using-the-unassigned-invoice-page-*`. **No Workflows, Settings, Authorized Approvers, Email Notifications or Approval Statuses New-Experience topic exists in the 2026_08 corpus.** For this group, `uiVariant` should be recorded as **undifferentiated / legacy-only-documented**, and the automation should expect the legacy Workflows page. That is itself a finding.

---

## 11. WHERE THE RICH MATERIAL IS (aim the real build here — byte counts from `wc -c`)

**Workflows page — Workflows tab / workflow object**
| bytes | file |
| ---: | --- |
| 14,383 | `admin-guides/create-a-new-workflow-554e86aa.md` — General page field roster |
| 9,326 | `admin-guides/conditional-expressions-and-the-condition-page-4d98af34.md` — condition grammar & operators |
| 6,726 | `admin-guides/work-with-the-steps-page-fab249d1.md` — Add Workflow Step field roster |
| 6,071 | `admin-guides/workflow-creation-process-1d37b85f.md` — ordering / the 5 workflow types |
| 4,198 | `admin-guides/default-workflows-a6fa157a.md` — default step tables |
| 2,174 | `admin-guides/understand-steps-and-workflow-rules-7cc4696b.md` |

**Settings tab** — `invoice-settings-cace748d.md` 4,901 (5 settings, 3 packed), `purchase-request-settings-b0bce285.md` 3,735 (3), `purchase-order-settings-a5a997b4.md` 1,417 (1), `enabling-and-disabling-an-invoice-workflow-setting-0e1e6d33.md` 1,171 (procedure).

**Authorized Approvers tab** — `approver-terminology-8559861c.md` 6,899, `filter-authorized-approvers-by-workflow-approval-step-aae69350.md` 6,234, `authorized-approver-list-a9522ec8.md` 3,773, `create-an-authorized-approver-step-4640b5a5.md` 2,665, `restrict-ad-hoc-steps-to-authorized-approvers-8a523257.md` 1,995, `authorized-approvers-overview-8b3bd2d0.md` 2,059, `procedure-2d20b513.md` 1,554 (Configuration sub-tab), `configuration-8b3be88b.md` 1,213, `step-2-assign-the-level-to-the-approver-d8bf669c.md` 1,751, `step-1-assign-the-level-to-the-workflow-step-6035f10a.md` 1,582.

**Approval Statuses tab** — `default-approval-statuses-34c83d58.md` 3,405 (48 pipe-rows of default statuses = a value set), `work-with-purchase-requests-approvals-1c39ee21.md` 2,916, `adding-an-invoice-approval-status-d8cbbe5d.md` 1,746, `approval-status-flags-4f534f16.md`, `editing-invoice-approval-status-d6564019.md`, `deleting-invoice-approval-status-9c96fcaa.md`, `accessing-the-approval-statuses-tab-7ec7bb6e.md` 1,022.

**Email Notifications tab** — `select-an-email-notification-in-the-workflows-tab-663bb8ac.md` 2,363, `overview-8b3df67d.md` 2,125, `email-notifications-for-purchase-requests-6991c389.md` 1,353, `accessing-and-managing-email-notifications-8b3d94c0.md` 981, `delegates-email-notification-7c866769.md`.

**Delegate Configurations** — `create-a-new-invoice-delegate-configuration-fcf42662.md` 6,302, `access-and-view-payment-delegate-configurations-8ed1298f.md` 3,872, `special-considerations-for-delegate-configurations-8b2bfccb.md` 2,195, plus edit/delete.

**Feature Hierarchies** — `tools-guides/step-2-associate-the-feature-hierarchy-to-the-source-list-bcaf1f5a.md` 2,041, `admin-guides/professional-edition-fb3e6aa2.md` 1,516, `tools-guides/create-the-invoice-routing-feature-hierarchy-8b510285.md` 1,291. **Thin in this corpus** — SAP repeatedly defers to the *Shared: Feature Hierarchies Setup Guide*, which is **not in this corpus**. Coverage: partial. Say so in the graph.

**Orphan with no click path (build target, no navPath):** `about-vendor-approval-workflow-step-and-timeout-b3d1bd2c.md` (2,346 B) names `Workflow Step Timeout Duration` and `Approval Action` for the Vendor Approval step. `grep -rn "Workflow Step Timeout Duration"` returns hits in **that file only**. Structurally these must be step-level fields on the Workflows > Steps page, but **the corpus never says so**. Record as unresolved rather than inferring.

---

## 12. CENSUS CALIBRATION NOTES FOR WHOEVER BUILDS THIS

- `grep -cP '^\s*\|'` (leading whitespace allowed) everywhere. `create-a-new-workflow-554e86aa.md` returns **85**; an `^|` anchor would return far fewer because SAP indents tables nested in numbered steps.
- **Packed `<tr>` confirmed live in this domain**: `invoice-settings-cace748d.md` and
  `filter-authorized-approvers-by-workflow-approval-step-aae69350.md` both carry raw-HTML tables on
  a single line. Use `grep -o '<tr' | wc -l`, never `grep -c '<tr'`.
- `grep -o '<table[ >]' | wc -l` (attribute-or-close required) — no prose false positives found in
  this domain, but the guard cost nothing.
- **U+00A0 non-breaking spaces** separate menu levels in several of the most important navigation
  sentences (`preventing-po-transmittal-…`, `professional-edition-fb3e6aa2.md`, `workflow-667cee21.md`,
  `self-approval-of-cost-object-based-workflows-20fd435d.md`). A quote spanning a menu separator will
  **fail `grep -F`** if you retype it with ordinary spaces. Quote around the separator, or copy bytes.

---

## 13. FINAL ROSTER FROM THIS SWEEP

| # | Candidate | Kind | Confidence | Claim |
| --- | --- | --- | --- | --- |
| 1 | **Workflows** (aliases: Workflows tool, Workflows Page, Workflow tool) — 5 tabs: Workflows, Settings, Authorized Approvers (2 sub-tabs), Email Notifications, Approval Statuses (2 sub-tabs) | admin-page | high | **Workflows group** |
| 2 | **Delegate Configurations** — tabs Invoice / Purchase Request | admin-page | high | **Workflows group** (resolves dep.g1.059) |
| 3 | **Feature Hierarchies** | admin-page (cross-domain) | high | **claim here as shared prerequisite** (resolves dep.g1.061, dep.g2.003, dep.g5g5.050, dep.g5g5.051) |

Three pages. Not thirteen. The 13 in the lost map was almost certainly counting **tabs and wizard
pages under one left-menu entry**, which is exactly what the corpus shows: Workflows alone accounts
for 5 tabs + 2 sub-tab pairs + 3 wizard pages = 12 clickable surfaces under a single menu item.

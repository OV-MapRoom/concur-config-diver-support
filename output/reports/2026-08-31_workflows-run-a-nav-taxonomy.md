# MAP / Page Identity & Navigation — Workflows and Feature Hierarchies
Corpus: `/mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE`, SAP 2026_08, Professional Edition, crawled 2026-08-29.
Both guide dirs swept with equal weight: admin-guides (1209 files), tools-guides (650 files).
Release notes read only for corroboration; **never cited as a sourceFile**.
Every quote below was verified by exact substring count against its file before emission.

## VERDICT IN ONE LINE

Two pages, both real, both siblings under `Administration > Invoice`, and both confirmed
against the corpus rather than taken on trust from the recon:
**Workflows** — ONE page, SEVEN tabs, `documentedBasis: rich`, `coverage: good`.
**Feature Hierarchies** — its own page, NOT a Workflows tab and NOT a Routing Configuration tab,
`documentedBasis: sparse`, `coverage: partial`, and thin **for a documented reason**.

---

## 1. WORKFLOWS

### 1.1 Page-hood — CONFIRMED, not re-opened

I reproduced the recon's three mechanical claims independently and all three hold.

**(i) Left-menu census, both dirs.** A broad census (`[A-Z][A-Za-z0-9 &/,'-]{2,55}\(left menu\)`,
prefix-stripped) returns **23 distinct labels**:

```
10 Forms and Fields      4 Invoice Settings      2 Tax Administration        1 Site Settings
 8 Workflows             4 Group Configurations  2 Purchase Order Matching   1 Polices  [sic]
 7 Attendees             4 Audit Rules           2 Policies                  1 Localization
                         3 List Management       2 Image Handling            1 Invoice Preferences
 1 Vendor Search Admin   1 User Permissions      1 User Administration       1 Feature Hierarchies
 1 Expense Type Import   1 Delegate Configurations                           1 Company Locations
 1 Company Admin, and then click User Permissions
```

`Workflows` scores 8. **Every candidate tab scores ZERO as a left-menu label** — verified
individually: `Approval Statuses (left menu)` 0, `Authorized Approvers (left menu)` 0,
`Email Notifications (left menu)` 0, `Confirmation Agreements (left menu)` 0,
`Reason Category and Codes (left menu)` 0. And **`Steps tab` = 0 corpus-wide**, as does
`Step Rules tab` and `General tab`, while `Steps page` = 10 files, `Step Rules page` = 5,
`General page` = 8 — the wizard is pages-inside-a-modal, never tabs.

> My census returns 23 labels, not the 30 the brief quotes. The difference is a regex-shape
> difference (mine strips the leading verb and folds `Administration > Invoice > X (left menu)`
> into `X`), not a disagreement about the workflow domain. **The load-bearing counts —
> Workflows 8, Feature Hierarchies 1, every tab 0 — are identical.** Recording the discrepancy
> rather than papering over it.

**(ii) One role gate for the whole surface.** `"This portion of the configuration requires
permissions for the Workflows section in Administration."` appears verbatim in exactly two files
(`step-2-activate-the-feature-27a421e2.md`, `step-3-edit-the-workflow-steps-f2731590.md`) — the
*section*, never a tab. The tool-level gate is `workflows-tool-8b3b4dbe.md`: Global and Group
Invoice Configuration administrator.

**(iii) The definitive sentence.** `access-workflow-fa9892a7.md`:
`"The Workflows tab on the Workflows page appears."` A tab named for its page — the Audit Rules
shape exactly. Reinforced by a **third independent page enumeration** in
`administrator-experience-8b302852.md`: *"The Configuration administrator will see the following
pages in Invoice Administrator related to image handling configuration:"* → Image Handling,
Policies, **Workflows**. All three are pages in this graph or (Workflows) becoming one.

**No page node is created for any tab, sub-tab, wizard page (General / Steps / Step Rules), or
dialog.** The four `workflow-guides-*.md` files are index tables of *external* setup guides and
get no node.

### 1.2 The seven tabs — each with its own attested in-page click

| Tab | Attested by |
|---|---|
| Workflows | `access-workflow-fa9892a7.md` "The Workflows tab on the Workflows page appears." |
| Settings | `preventing-po-transmittal-...-51b11602.md` "Settings tab and is shown in the following figure." |
| Email Notifications | `access-email-notifications-9f806b0b.md` "Select the Email Notifications tab." |
| Approval Statuses | `accessing-the-approval-statuses-tab-7ec7bb6e.md` "Select the Approval Statuses tab." |
| Authorized Approvers | `authorized-approver-list-a9522ec8.md` "Click the Authorized Approvers tab." |
| Confirmation Agreements | `access-the-confirmation-agreement-tab-666fa0ac.md` "Select the Confirmation Agreements tab." |
| Reason Category and Codes | `creating-a-reason-code-b2b61596.md` "Click the Reason Category and Codes tab." |

Four sub-tabs, all four now attested:

| Sub-tab | Attested by |
|---|---|
| Approval Statuses > Invoice | `adding-an-invoice-approval-status-d8cbbe5d.md` "Click Approval Statuses tab, and then the Invoice tab." |
| Approval Statuses > Purchase Request | `work-with-purchase-requests-approvals-1c39ee21.md` "On the Purchase Request tab, click New. The Report Status window appears." |
| Authorized Approvers > Configuration | `procedure-2d20b513.md` "Click the Configuration tab." |
| Authorized Approvers > Authorized Approver List | `authorized-approver-list-a9522ec8.md` "Click the Authorized Approver List tab." |

**CORRECTION TO THE RECON (mine, and it matters).** The recon cited
`"Select the Invoice or Purchase Request tab."` as evidence for the Approval Statuses sub-tabs.
That sentence lives in `access-and-view-payment-delegate-configurations-8ed1298f.md`, whose
preceding steps are *"Select Administration > Invoice."* → *"Select Delegate Configurations
(left menu) , the Delegate Configurations page appears."* — it is **Delegate Configurations**
(a Run B page), not Approval Statuses. The correct Invoice-sub-tab citation is
`adding-an-invoice-approval-status-d8cbbe5d.md`, which I found and verified. The conclusion is
unchanged; the citation was wrong and would have mis-routed a driver.

### 1.3 Navigation — TWO documented depths, recorded not reconciled (C8)

**Depth A (with the middle node) — 5 topics.** `Administration > Invoice > Invoice Processing
Admin > Workflows`. Files: `access-workflow-fa9892a7.md`, `accessing-the-approval-statuses-tab-7ec7bb6e.md`,
`access-the-confirmation-agreement-tab-666fa0ac.md`, `self-approval-of-cost-object-based-workflows-20fd435d.md`,
`step-2-activate-the-feature-27a421e2.md`. Verb splits `click` (2) / `select` (3).

**Depth B (no middle node) — 8 topics.** `Administration > Invoice > Workflows (left menu)`.
Files: `authorized-approver-list-a9522ec8.md`, `create-an-authorized-approver-step-4640b5a5.md`,
`procedure-2d20b513.md`, `restrict-ad-hoc-steps-to-authorized-approvers-8a523257.md`,
`step-1-assign-the-level-to-the-workflow-step-6035f10a.md`, `step-2-assign-the-level-to-the-approver-d8bf669c.md`,
plus the two-step form (`Click Administration > Invoice.` then `Click Workflows (left menu).`) in
`select-an-email-notification-in-the-workflows-tab-663bb8ac.md` and
`step-3-optional-select-enable-the-required-hardcopy-receipt-setting-c50e377e.md`.
`access-email-notifications-9f806b0b.md` gives a third variant: `Click Workflows.` with no
"(left menu)" qualifier at all.

**Automation guidance: try the middle node first, fall back to the direct left-menu click.**
Depth A is the fuller path; Depth B is documented at higher volume and reads as an abbreviation.
The corpus does not settle which the live UI renders.

### 1.4 THE NBSP HAZARD — how I handled it, and why the emitted quotes look truncated

Roughly 40% of nav sentences in this corpus have **no `>` glyph at all**; the separators are two
consecutive U+00A0. Confirmed here by reading the bytes:

```
allowing-automatic-transmittal-of-purchase-orders-0f2e7fae.md
  'Administration\xa0\xa0Invoice\xa0\xa0Workflows\xa0\xa0Workflows tab'
preventing-po-transmittal-...-51b11602.md
  'Administration\xa0\xa0Invoice\xa0\xa0Workflows\xa0\xa0Settings tab'
hierarchies-7f68a876.md
  'Administration\xa0\xa0Invoice\xa0\xa0Hierarchies (explained below).'
professional-edition-fb3e6aa2.md
  'Administration \xa0\xa0Invoice \xa0\xa0Feature Hierarchies.'   <-- note the extra ASCII space
overview-9c8ca06e.md
  'accesses Workflows\xa0\xa0Reason Category and Codes'
access-workflow-fa9892a7.md
  'ClickAdministration\xa0\xa0Invoice.'                          <-- and no space after "Click"
```

I verified every one of these NBSP forms with an exact byte-level substring count and they all
return 1. **But I deliberately emitted the NBSP-free contiguous fragment on the far side of the
separator** (e.g. `"Settings tab and is shown in the following figure."`, `"Workflows tab by
opening a PR workflow and selecting the Allow employee to automatically transmit Purchase
Orders option."`, `"Feature Hierarchies before selection via the Policy tool."`) rather than a
quote that crosses the arrow. Reason: NBSP survives a byte-exact grep but is exactly the
character most likely to be normalised in transit between this agent and the validator, and
`NO QUOTE, NO NODE` is a harder failure than a slightly shorter quote. The full NBSP forms are
recorded here in the survey so nothing is lost.

Two extra text traps found in this group:
* `ClickAdministration` with **no space** in `access-workflow-fa9892a7.md` (once).
* `Worflows` misspelled once corpus-wide, in the very revision-history line that decides
  uiVariant (`general-information-8b3b0308.md`, September 19 2025).

### 1.5 Aliases and label drift

Canonical: **Workflows**. Aliases carried so future endpoints resolve: Workflows tool, Workflow
tool, Workflows tab, Workflow tab, Workflows page, Workflow page, Workflow Settings, Workflow
Settings page, Settings tab, Settings section of the Workflows tool, Invoice Settings (Settings-tab
sense ONLY — see the collision warning), Purchase Request Settings, Purchase Order Settings,
Approval Statuses, Authorized Approvers, Authorized Approver tab, Email Notifications,
Confirmation Agreements, Confirmation Agreement tab, Reason Category and Codes.

Attestation counts (files, both dirs):

| Form | Files | Rival | Files |
|---|---|---|---|
| Workflows tab | 14 | Workflow tab | 1 |
| Workflows tool | 10 | Workflow tool | 1 |
| Workflows page | 20 | Workflow page | 4 |
| Email Notifications tab | 7 | Email Notification tab | 1 |
| Confirmation Agreements tab | 4 | Confirmation Agreement tab | 2 |
| Authorized Approvers tab | 4 files w/ "Click the …" or "…tab in Workflows" | Authorized Approver tab | 2 |

Majority form wins in `name`; every minority form is carried as an alias. **The disagreement is
recorded, not reconciled.**

### 1.6 Contradictions carried forward (C1–C9)

* **C1 — Settings, four names.** `Settings tab` (preventing-po-transmittal-…-51b11602.md;
  general-information-8b3b0308.md revision history ×2) / `Settings section of the Workflows tool`
  (workflow-creation-process-1d37b85f.md ×2) / `Workflow Settings page`
  (enabling-and-disabling-an-invoice-workflow-setting-0e1e6d33.md) / `Workflow Settings`
  (approver-terminology-8559861c.md). One surface, four names, three implied depths.
* **C2 — Authorized Approvers, five labels.** `Authorized Approvers tab` /
  `Authorized Approver tab` (configuration-8b3be88b.md, filter-authorized-approvers-…-aae69350.md) /
  `the Workflows, Authorized Approvers page` (approver-terminology-8559861c.md) /
  `The Authorized Approvers tab in Workflows.` (step-4-assign-the-proper-rights-to-users-82481079.md) /
  `Authorized Approvers link` (tools-guides/how-single-step-approval-workflow-works-40145f24.md).
* **C3 — singular/plural on the page itself.** `administrator-experience-8b302852.md` writes
  *"On the Workflow page…"* and *"…on the Workflows page…"* in **adjacent sentences**.
* **C4/C5** — Email Notification(s) and Confirmation Agreement(s), plural vs singular, above.
* **C6 — wizard vocabulary.** General page / General step / Edit Workflow page; Add Workflow Step
  page vs window. Same surfaces, three vocabularies. No node either way.
* **C7 — depth collapse.** `administrator-experience-8b302852.md` puts *Require Hardcopy Receipts*
  "on the Workflows page" while `create-a-new-workflow-554e86aa.md` puts it on the General page
  inside a workflow. **Do not create a second node** — this is prose collapsing depth.
* **C8 — nav depth**, 5 vs 8, above.
* **C9 — THE ROLE-GATE CONTRADICTION, UNRESOLVED, AND THE ONE THAT WILL BITE AUTOMATION.**
  `creating-a-reason-code-b2b61596.md`: *"The Invoice Configuration administrator (_Restricted_)
  role is required to use the options on this tab."* and it then walks New → Save — a **write**
  flow. `overview-9c8ca06e.md` agrees: the Restricted role *"accesses Workflows … Reason Category
  and Codes to create the set of codes"*. Against that, a July 2025 release note
  (`release-notes/updated-read-only-access-for-invoice-configuration-administrator-restricted-role-…`)
  makes that same role **read-only on Workflows with New/Copy/Remove disabled**. Release notes are
  not a citable sourceFile, so the graph carries only the admin-guide side and this note.
  **If the driver hits a permission wall on Workflows, Reason Category and Codes is the likely cause.**

### 1.7 uiVariant — `undifferentiated`, and that is the honest answer

There is **no `*-new-experience-*` twin for any workflow file**; `ls | grep -i new-experience`
returns 5 files corpus-wide, none in this domain. Two dated statements point in opposite
directions inside one corpus version:

* `general-information-8b3b0308.md`, **September 19 2025**: *"Updated images and text to the new
  UI for the Workflows Tool and Edit and Delete Worflows, Properties, and Steps sections."*
  → the missing twin is a **replacement**, revised in place, not a coverage gap.
* `tools-guides/how-single-step-approval-workflow-works-40145f24.md`: *"the Invoice Configuration
  administrator uses the Authorized Approvers link from workflows in the classic interface"*
  → the documented route is the **classic** interface.

**The corpus cannot settle which UI generation the click paths describe.** This matters more than
any field: navigation is the only knowledge this build produces that a Chromium driver cannot
re-derive, so if the paths describe a superseded UI, every navPath is wrong at once.
`uiVariant: "undifferentiated"`. **Not "both"** — three unearned "both" claims are already
outstanding debt in this graph (`page.audit-rules` still carries one).

### 1.8 Boundaries against already-built pages

* **Invoice Settings (BUILT, Group 1) — LABEL COLLISION, NOT REBUILD DEBT.** Two different files
  are titled "Invoice Settings": `available-invoice-settings-8b3411f0.md` (the built page, source of
  all its fields) and `invoice-settings-cace748d.md` (the Workflows > Settings tab). I re-verified
  against the graph on disk: **zero of the 486 fields cite `invoice-settings-cace748d.md`.**
  Nothing moves off the built page. **Naming rule: call these controls "Settings tab" /
  "Workflow Settings", NEVER "Invoice Settings."**
* **Exceptions (BUILT, Group 2).** `page.exceptions.navPathAlternates` contains
  `"Administration > Invoice > Workflows > Settings"` — that is a route to the **Settings tab**,
  not to Exceptions. **Existing-graph defect, reported not fixed here.**
* **Image Handling (BUILT, Group 4).** Its alternates already contain
  `"Administration > Invoice > Workflows > Modify > Require Hardcopy Receipts"`. That is the same
  control `administrator-experience-8b302852.md` describes; the Workflows build owns the field,
  Image Handling keeps the cross-reference. Not a conflict.
* **Audit Rules (BUILT, Group 2).** The condition editor is explicitly shared. **Dedupe on FILES,
  never on the field list** — the built 91-field roster is internally duplicated ~8 times and
  deduping against it propagates that error. `the-condition-page-5d4ea870.md` = Audit Rules side
  (already mined, do not re-seed). `conditional-expressions-and-the-condition-page-4d98af34.md` =
  Workflows side, cited by zero graph fields.
* **Routing Configuration (BUILT, Group 2).** Boundary is clean. Its 10 fields are all
  hierarchy-mappings import/search mechanics; nothing in the Workflows tree duplicates them. The
  one contact point is Feature Hierarchies, which precedes both.
* **DO NOT CONFUSE:** `the-query-builder-and-the-condition-editor-af058a80.md` /
  `-e10473f9.md` (duplicate titles, different loio, ~19 KB of table) are the **Processor runtime
  Query Builder**, not configuration. Do not seed, do not extract.

### 1.9 Existing-graph defects to report, not fix

1. `dep.g2.011` targets page **Invoice Settings** while citing `invoice-settings-cace748d.md`.
   Should target **Workflows > Settings tab**.
2. `dep.g2ar.025` targets **Invoice Settings** on a quote naming Workflows and Settings, and
   duplicates `dep.g2ar.024`.
3. `page.exceptions.navPathAlternates` contains `"Administration > Invoice > Workflows > Settings"`,
   which is not a route to Exceptions.
4. (New, mine) the recon's Approval-Statuses sub-tab citation was actually a Delegate
   Configurations quote — see §1.2.

### 1.10 documentedBasis: **rich** / coverage: **good**

86 files, ~222,500 raw bytes. Field-level documentation across many independent topics —
`create-a-new-workflow-554e86aa.md` (85 indented rows, the General-page roster),
`work-with-the-step-rules-page-4c33cda0.md` (29), `work-with-the-steps-page-fab249d1.md` (28),
`default-approval-statuses-34c83d58.md` (48), `filter-authorized-approvers-…-aae69350.md` (21),
`authorized-approver-list-a9522ec8.md` (16), `work-with-purchase-requests-approvals-1c39ee21.md` (16),
the three settings files, and `variables-for-invoices-or-purchase-requests-26e917cb.md`
(18 email variables). That is field-level coverage across multiple topics for every one of the
seven tabs — the definition of `rich`.

**Honest caveat that keeps `coverage: good` from being inflated:** ~37% of this page's measured
table payload is **revision history**, not roster. `general-information-8b3b0308.md` (139 rows),
`cost-object-approval-8b3d1e0f.md` (85), `authorized-approvers-8b3c26cc.md` (64),
`email-notifications-8b3dbad4.md` (61) all open with "Revision History" and are positions
#1/#3/#5/#6 by row count. **The single largest "catalog" in this group is a change log.** Mine
them for structure, names, dates and history claims only. `general-information-8b3b0308.md` must
stay: it is the proof that the settings family lives on the Settings tab. Real payload ≈ 605
table units, not 954. Several tab-level topics are genuine thin stubs
(`workflow-settings-8b3b98e1.md` 743 B is a content-free section header;
`reason-category-and-codes-8b3b27d4.md` 866 B; `confirmation-agreements-8b3aca2e.md` 908 B) and
should be recorded as thin rather than padded.

---

## 2. FEATURE HIERARCHIES

### 2.1 Page-hood — CONFIRMED. It belongs to NEITHER Workflows NOR Routing Configuration.

* **Own left-menu entry**, one of only two unbuilt labels in the census:
  `tools-guides/step-2-associate-the-feature-hierarchy-to-the-source-list-bcaf1f5a.md` —
  *"Click Feature Hierarchies (left menu)."*
* **Own role gate, worded exactly like the Workflows gate and stated in contrast to it inside a
  single numbered flow.** `step-1-define-the-cost-object-approver-hierarchy-6e7b7dc6.md`:
  *"This portion of the configuration requires permissions for the Feature Hierarchies section in
  Administration."* — while step 2 of that same flow
  (`step-2-activate-the-feature-27a421e2.md`) says *"…permissions for the **Workflows** section in
  Administration."* **Two gates, two peer surfaces, in SAP's own contrast.** Corpus-wide, the
  string `"permissions for the Feature Hierarchies section in Administration"` returns exactly 1
  file and `"permissions for the Workflows section in Administration"` exactly 2 — and they are
  steps 1 and 2/3 of one procedure.
* **Peer-tool evidence (identity, not navigation).** `tools-guides/overview-of-steps-37e3c289.md`:
  *"The administrator uses the following tools in the order presented to configure the feature."*
  then Step 1 List Management, **Step 2 Feature Hierarchies**, Step 3 Group Configurations,
  Step 4 Forms and Fields, Step 5 Vendor Employee Access Import, Step 6 User Administration.
  Three of those are already pages in this graph. That is first-class page-hood evidence, and
  per the critic it belongs in identityNotes, **not** navPathEvidence — "Step 2: Feature
  Hierarchies" is a list item, not a click.
* **It is never a tab of anything.** No file writes "Feature Hierarchies tab".

### 2.2 Navigation — no middle segment, and the node is UNATTESTED (not absent)

Both documented paths run `Administration > Invoice > Feature Hierarchies`:

1. `tools-guides/step-2-associate-…-bcaf1f5a.md` — *"Click Administration&nbsp;&nbsp;Invoice."* →
   *"Click Feature Hierarchies (left menu)."* → *"On the Feature Hierarchies, select _Invoice
   Vendor Employee Access_, and then click Modify Hierarchy."*
2. `professional-edition-fb3e6aa2.md` — *"Go to Administration&nbsp;&nbsp;Invoice&nbsp;&nbsp;Feature
   Hierarchies."* → *"Select the Invoice Payment feature name."* → *"Select Modify Hierarchy."*

I ran `grep -rn "Invoice Processing Admin"` over both dirs: **31 hits, not one of them Feature
Hierarchies.** The middle node is therefore **UNATTESTED for this page — record as unattested,
not absent.** The left-menu entry is a **SIBLING of Workflows, not a child.**
**A driver told to reach Feature Hierarchies via a Workflows path WILL FAIL.** That is an active
harm, not a filing preference.

**Menu-label alias no prior artefact records:** `hierarchies-7f68a876.md` writes the label as
plain **"Hierarchies"** — *"…first configure their hierarchy structure in
Administration&nbsp;&nbsp;Invoice&nbsp;&nbsp;Hierarchies (explained below)."* Per the critic, the
verifying fragment `"Hierarchies (explained below)."` does **not** carry the path (the path is in
the preceding NBSP-separated clause), so it is emitted as an **aliases citation**, not as
navPathEvidence. Third alias form: `overview-8b2edfd0.md` writes *"the Feature Hierarchies section
of Administration"* and `create-the-invoice-routing-feature-hierarchy-8b510285.md` writes *"the
Feature Hierarchies area"*.

### 2.3 Why it is SHARED — build once, point at it twice

One page hosts at least five named feature hierarchies serving four config domains:

| Feature hierarchy | Consumer | Evidence |
|---|---|---|
| Invoice Routing | **Routing Configuration** (BUILT, G2) | `create-the-invoice-routing-feature-hierarchy-8b510285.md` |
| Invoice Payment | payment groups | `professional-edition-fb3e6aa2.md` "Select the Invoice Payment feature name." |
| Invoice Vendor Employee Access | vendor groups / Group Configurations (BUILT, G1) | `step-2-associate-…-bcaf1f5a.md` |
| Payment Authorized Approver | **Workflows > Authorized Approvers** | `understand-the-hierarchy-b65d7089.md`, `user-administrator-fcfd570c.md` "Authorized Approver Feature Hierarchy" |
| Cost Object Approver | **Workflows** General page | `step-1-define-the-cost-object-approver-hierarchy-6e7b7dc6.md` |

Folding it into Workflows would mis-file routing and vendor access; folding it into Routing
Configuration would mis-file the COA hierarchy only Workflows uses.

**HARD FORWARD REFERENCE INTO THE WORKFLOWS BUILD** — `understand-the-hierarchy-b65d7089.md`:
*"You must define the authorized approver hierarchy (Invoice > Feature Hierarchies)"* and
import/create its source list **before the authorized approver feature can be activated**. Emit
that edge: Workflows > Authorized Approvers > Configuration tab
(`Authorized Approver feature is available for workflows`) is **blocked** on this page.
Second forward reference, `workflow-667cee21.md`: PR hierarchies *"must be configured using
Invoice&nbsp;&nbsp;Feature Hierarchies before selection via the Policy tool."*

### 2.4 The four endpoints it resolves — all of them the SAME field

`dep.g1.061`, `dep.g2.003`, `dep.g5g5.050`, `dep.g5g5.051` all point at a **Source List**.
Exact field name from the corpus: **`Source List`** —
*"In the Source List, select the name of the list you created in Step 1"*
(`step-2-associate-…-bcaf1f5a.md`). A four-group fan-out onto one field is the signature of a
shared page.

### 2.5 documentedBasis: **sparse** / coverage: **partial** — and WHY

12-file core, 23,239 B. Expect roughly **five fields**: Source List, Level, Segment Name, the
feature-name selector, Modify Hierarchy. That is the whole documented control surface.

**SAP files the substance in the external _Shared: Feature Hierarchies Setup Guide_, which is NOT
in this corpus.** That guide is referenced by name in at least eight files
(`create-hierarchy-and-import-connected-list-data-c6ab8a52.md`, `details-section-49500221.md`,
`step-1-define-the-cost-object-approver-hierarchy-6e7b7dc6.md`, `understand-the-hierarchy-b65d7089.md`,
`step-2-associate-…-bcaf1f5a.md`, `additional-documentation-a105a5d7.md`, `before-you-begin-9b98872a.md`,
`workflow-creation-process-1d37b85f.md`). **Thin with a documented reason is a correct, publishable
answer.** This page is being told so before the field extraction starts specifically so it does
not manufacture fields around the gap — the Budget Configuration failure mode.

**Anti-padding guards applied here:**
* `overview-8b2edfd0.md` is a **Group Configurations** topic (*"Group Configurations in Concur
  Invoice allow administrators to define and manage hierarchical groups"*) and is **NOT a field
  source for this page.** Group Configurations is BUILT (G1, 22 fields). Seeding it on the
  thinnest page in the group is the exact setup for re-homing built G1 fields, and it would
  inflate measured richness so the thinness disguises itself. It is cited here **only** for the
  alias *"the Feature Hierarchies section of Administration"*.
* `understand-the-hierarchy-b65d7089.md` (69 rows) is the one long catalog on this page and it is
  **example approver-hierarchy DATA, a worked example, not a roster.** Skipped as illustrative —
  and said so, per rule 2, rather than silently dropping it.
* `tools-guides/the-import-template-fields-and-descriptions-8b51ca3d.md` (47 rows) is a
  **DEDUPE-FLAGGED REFERENCE ONLY** for Level semantics. The graph already references it 4 times
  and Group 5 owns its Level value set (`vset.g5g5…level-1-code-level-10-code`). **Do not re-emit
  that value set.**
* `tools-guides/step-1-create-the-source-list-in-list-management-cc91aa73.md` is where the Source
  List is actually created — that is **List Management** (BUILT, G5). It is a prerequisite edge,
  not a field home.
* Every field-bearing file on this page returns **0 indented table rows and 0 raw `<table>`
  blocks** — so unlike Workflows there is no hidden packed payload to recover here. The thinness
  is real, measured, and explained.

### 2.6 uiVariant: **undifferentiated**

No New Experience twin exists for any Feature Hierarchies file. **Do not claim "new" or "both".**

---

## 3. SUMMARY OF CORRECTIONS I MADE TO INHERITED MATERIAL

1. The Approval-Statuses sub-tab citation in the recon belongs to **Delegate Configurations**, not
   Approval Statuses. Correct citation supplied (§1.2).
2. My left-menu census returns **23** distinct labels, not 30 — a regex-shape difference, with
   every load-bearing count identical. Recorded rather than smoothed (§1.1).
3. Emitted quotes deliberately stop short of NBSP separators; the full NBSP forms are preserved
   in §1.4 so no evidence is lost (§1.4).

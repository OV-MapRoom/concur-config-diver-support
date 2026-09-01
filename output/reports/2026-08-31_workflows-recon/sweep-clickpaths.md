# Sweep: CLICK PATHS — Workflow / Approval configuration surface
Corpus: /mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE, SAP 2026_08, Professional Edition, crawled 2026-08-29.
Two guide dirs swept in full: admin-guides (1209 files), tools-guides (650 files). Release notes used ONLY to corroborate names, and labelled.

## HEADLINE

**Workflows is ONE admin page with SEVEN tabs, not thirteen pages.** The corpus states it in one
sentence: *"The Workflows tab on the Workflows page appears."*
(admin-guides/access-workflow-fa9892a7.md). Every workflow-domain click path in the corpus
terminates at that single left-menu entry and then names a tab. This is the **Audit Rules
precedent, not the Forms and Fields precedent**.

The seven tabs are: **Workflows, Settings, Email Notifications, Approval Statuses, Authorized
Approvers, Confirmation Agreements, Reason Category and Codes.** Two of those seven
(Confirmation Agreements, Reason Category and Codes) are, as far as I can tell, surfaces no
inherited artefact mentions — and both are corroborated twice, by an access topic and by the
Workflows guide's own revision history.

Two *separate* admin pages sit adjacent and must not be folded in: **Email Reminders** (own
left-menu entry, own role gate, own two tabs) and **Feature Hierarchies** (own left-menu entry,
cross-cutting).

---

## SWEEP A — commands run

```
R=/mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE
A=$R/concur-invoice-professional-edition-admin-guides
T=$R/concur-invoice-professional-edition-tools-guides

ls $A | wc -l ; ls $T | wc -l
ls $A | grep -iE "workflow|approv|notification|email"
ls $T | grep -iE "workflow|approv|notification|email"

grep -rn "Administration > Invoice"  $A $T | grep -iE "workflow|approv|notif|reminder|feature hier"
grep -rn "Administration >Invoice"   $A $T
grep -rn "Invoice Processing Admin"  $A $T
grep -rn "Workflows (left menu)"     $A $T
grep -rhoP "Workflows > [A-Z][A-Za-z ]{2,40}"         $A $T | sort | uniq -c | sort -rn
grep -rhoP "Click [A-Z][A-Za-z &/]{2,45} \(left menu\)" $A $T | sort | uniq -c | sort -rn
grep -rhoP "[A-Z][A-Za-z &/]{1,35} tab\b"             $A $T | sort | uniq -c | sort -rn
grep -rn "Workflows tab|Settings tab|Rules tab|Email Notifications tab|Approval Statuses tab| \
          Authorized Approver tab|Authorized Approvers tab|Email Reminders tab|Steps tab" $A $T
grep -rn "Steps page|Step Rules page|Edit Workflow page|Add/Edit Workflow Steps"          $A $T
grep -rn "Feature Hierarch"          $A $T
grep -rn "Confirmation Agreement"    $A $T
grep -rn "Reason Category and Codes|Reason Code" $A $T
grep -rn "Workflows" $A $T | grep -iE "administrator|role|permission|rights"
grep -rn "Purchase Request Settings|Purchase Order Settings" $A $T
grep -rn "Settings section of the Workflows|Workflows  Settings|Workflows > Settings" $A $T
grep -rln "New Experience" $A $T ; ls $A $T | grep -i new-experience
grep -rn "Workflows" $R/concur-invoice-professional-edition-release-notes \
                     $R/concur-invoice-professional-edition-release-note-summaries \
     | grep -iE "Settings tab|Approval Statuses|Email Notification|left menu|Administration"

# clincher (finding 1)
grep -c "select their own approver" $A/available-invoice-settings-8b3411f0.md   ->  0
grep -c "select their own approver" $A/invoice-settings-cace748d.md             ->  2

# census calibration proof
grep -cP "^\s*\|" $A/general-information-8b3b0308.md  -> 139
grep -c  "^| "    $A/general-information-8b3b0308.md  ->  47      # anchored census under-counts by 3x
grep -c  "<p"     $A/filter-authorized-approvers-by-workflow-approval-step-aae69350.md -> 1
grep -cE "<table>|<table " $A/... (raw-HTML check on every candidate file)

# graph
python3 -c "json.load(open('/mnt/c/Users/manci/PROJECTS/concur-config-diver-support/output/kg-invoice-config.json'))"
  -> 20 configPages listed; Routing Configuration's 10 field names read out;
     fields citing invoice-settings-cace748d.md == 0 (verified);
     all 9 Invoice Settings fields cite available-invoice-settings-8b3411f0.md.
```

Every `sourceQuote` emitted was individually re-verified with
`grep -F -c "<quote>" "$R/<sourceFile>"` before emission. All returned >= 1.

---

## THE TAB TREE (majority tree)

```
Administration
└── Invoice                                    [alias: "Invoice Admin"]
    ├── Invoice Processing Admin  (middle nav node — ATTESTED here, 5 separate topics)
    │   ├── Workflows                          ADMIN PAGE  ← the group's anchor
    │   │   ├── Workflows tab                  (list of workflow OBJECTS)
    │   │   │   └── Copy / Modify / double-click a workflow  → the workflow editor:
    │   │   │        ├── General page          (= "workflow properties"; also called
    │   │   │        │                            "General step" and "Edit Workflow page")
    │   │   │        ├── Steps page
    │   │   │        │    ├── New   → Add Workflow Step window
    │   │   │        │    └── Modify→ Modify Workflow Step(s) window
    │   │   │        └── Step Rules page
    │   │   │             ├── New   → Edit Condition window  (uses the Condition page editor)
    │   │   │             └── New   → Edit Action window
    │   │   ├── Settings tab                   (Invoice / Purchase Request / Purchase Order settings)
    │   │   ├── Email Notifications tab
    │   │   ├── Approval Statuses tab
    │   │   │    ├── Invoice tab          → New → Request Status window
    │   │   │    └── Purchase Request tab → New → Report Status window
    │   │   ├── Authorized Approvers tab
    │   │   │    ├── Configuration tab
    │   │   │    └── Authorized Approver List tab → New/Modify Authorized Approver window
    │   │   ├── Confirmation Agreements tab    → New → Confirmation Agreement window
    │   │   └── Reason Category and Codes tab
    │   └── Email Reminders                    ADMIN PAGE (separate left-menu entry)
    │        ├── Email Reminders tab
    │        └── Rules tab
    └── Feature Hierarchies                    ADMIN PAGE (left-menu; middle node UNATTESTED)
         └── select a feature name → Modify Hierarchy
```

### Middle-node note
`Invoice Processing Admin` is ATTESTED for Workflows (5 topics) and for Email Reminders (1 topic).
It is **UNATTESTED** for Feature Hierarchies — the two Feature Hierarchies paths go
`Administration > Invoice > Feature Hierarchies` with no middle segment. Record as unattested,
not as absent. The eight topics that say `Administration > Invoice > Workflows (left menu)` are
treated as abbreviations of the fuller path, not a second route.

---

## CONTRADICTIONS (recorded, not reconciled)

| # | Label | Reading A | Reading B | Verdict |
|---|---|---|---|---|
| C1 | Settings | "**Settings tab**" — preventing-po-transmittal-...-51b11602.md, general-information-8b3b0308.md (revision history) | "**Settings section** of the Workflows tool" — workflow-creation-process-1d37b85f.md; "the **Workflow Settings page**" — enabling-and-disabling-an-invoice-workflow-setting-0e1e6d33.md | Three names, three depths, one surface. Tab wins on attestation count (2 + release-note) and on being the only phrasing tied to a click path. |
| C2 | Authorized Approvers | "**Authorized Approvers tab**" (plural) — 6 topics incl. 3 with full click paths | "**Authorized Approver tab**" (singular) — configuration-8b3be88b.md, filter-authorized-approvers-...-aae69350.md; "the Workflows, **Authorized Approvers page**" — approver-terminology-8559861c.md | Plural + tab wins. The "page" phrasing is a single, path-less prose reference. |
| C3 | Workflows tab | "**Workflows tab**" — 11 topics | "**Workflow tab**" (singular) — managing-items-on-purchase-request-...-37e7bf0f.md | Plural wins 11:1. |
| C4 | Workflow-editor pages | "**General page**" / "**Steps page**" / "**Step Rules page**" (procedures) | "**Edit Workflow page**" + "**Add/Edit Workflow Steps page**" (invoice-settings-cace748d.md, purchase-request-settings-b0bce285.md); "**General step**" (self-approval-..., delegate-self-approval-...) | Same surfaces, three vocabularies. Emit as aliases on one node each. |
| C5 | Confirmation Agreement(s) | topic title + prose say "**Confirmation Agreement tab**" | the numbered step says "Select the **Confirmation Agreements** tab" | Plural is the click label; singular is the prose. |
| C6 | Fields on "the Workflows page" | administrator-experience-8b302852.md and approve-forward-feature-b847d65b.md put *Require Hardcopy Receipts* and *Steps Can Be Added By* "on the Workflows page" | create-a-new-workflow-554e86aa.md puts both on the **General page** inside a workflow | Depth collapse in prose. General page is correct; "Workflows page" is the ancestor. |
| C7 | Tool name | "**Workflows tool**" (10 files) | "**Workflow tool**" — work-with-invoice-approval-statuses-8b3bab8c.md | Trivial alias. |

---

## THE FIVE INHERITED FINDINGS

### (1) The Invoice / Purchase Request / Purchase Order Settings family — ANSWER (a): ALL THREE ARE THE WORKFLOWS > SETTINGS TAB.

Clincher reproduced, exactly as specified:

```
grep -c "select their own approver" .../available-invoice-settings-8b3411f0.md  -> 0
grep -c "select their own approver" .../invoice-settings-cace748d.md            -> 2
```

Graph verification: **zero** `configFields` cite `invoice-settings-cace748d.md`. All nine
Invoice Settings fields cite `available-invoice-settings-8b3411f0.md` (8,368 B), whose own
sentence is *"The Invoice Settings page includes the following settings"*. Different page,
different topic family. Confirmed.

Three independent pieces of evidence put the whole family on Workflows > Settings:

1. **Direct click path for the PO member.** `preventing-po-transmittal-when-po-exceeds-specified-exception-level-51b11602.md` (1,620 B):
   *"A setting in Workflows can be used to prevent PO transmission if the PO exceeds a specified
   exception level."* and *"The setting appears in Administration  Invoice  Workflows  Settings tab"*.
   The same topic says the setting *"works just as the payment or purchase request settings of
   this type"* — SAP itself grouping all three siblings.
2. **Structural identity for the invoice member.** `invoice-settings-cace748d.md` row 1 says the
   unselected state *"activates a centralized approver workflow"*.
   `workflow-creation-process-1d37b85f.md` says: *"To set up the centralized workflow, you must
   clear a setting in the Settings section of the Workflows tool."* Same setting, and the
   Workflows tool is where it is cleared.
3. **Revision history of the Workflows guide.** `general-information-8b3b0308.md` (6,719 B) lists
   *"New Settings tab option: Prevent purchase order transmissions setting."* and
   *"Addition of two new options to the Settings tab: Filter invoice items to those that are
   applicable to Cost Object / Allow processor to recall an invoice to last processor step"* —
   which are literally rows 4 and 5 of the `<table>` in `invoice-settings-cace748d.md`.

A fourth, weaker corroboration: `exceptions-d945b953.md` writes the path with a role prefix —
*"(via Invoice Configuration Administrator   Workflows   Settings)"*.

**So it is (a), not (c).** There is no Invoice Settings rebuild debt: the invoice member never
belonged to the built Invoice Settings page, and no graph field ever claimed it did. The family
name "Invoice Settings" is the collision — the built page and this tab section share a title and
nothing else. **Flag for the build:** the two files whose title reads `Invoice Settings` are
`available-invoice-settings-8b3411f0.md` (the built page) and `invoice-settings-cace748d.md`
(this tab). Never merge them.

**Prose numeric range trap, confirmed:** `grep -F -c "Type a number from one to 99."` returns 1
in `purchase-request-settings-b0bce285.md` and 1 in `purchase-order-settings-a5a997b4.md`. No
digit-range regex (`\d+\s*(to|-|–)\s*\d+`) finds "one to 99". The invoice member carries the same
phrase inside a raw `<p>` cell — a second reason a `^|`-anchored census misses it entirely.

**Raw-HTML trap in this exact file:** `invoice-settings-cace748d.md` has 2 markdown table rows and
one `<table summary="" class="table" ...>` block holding rows 3, 4 and 5 as `<p>` cells. A
markdown-only extractor sees a 2-row table and reports the topic as thin. It is a 5-row table.

dep.g2.012 and dep.g2.013 endpoint names ("Purchase Request Settings", "Purchase Order Settings")
are corroborated as *section labels* — they are the H1s of their topics — but neither is a page.
Both resolve to Workflows > Settings tab.

### (2) One page with tabs, or several pages? — ONE PAGE, SEVEN TABS.

Tiebreaker applied as instructed: **left-menu entry and role gate**.

- Only **one** workflow-domain label ever appears as a left-menu destination:
  `Click Workflows (left menu). The Workflows page appears.` (8 files carry `Workflows (left menu)`;
  a corpus-wide `(left menu)` census returns exactly 12 distinct labels and only `Workflows` is in
  this domain). Settings, Email Notifications, Approval Statuses, Authorized Approvers,
  Confirmation Agreements and Reason Category and Codes are **never** reached from a menu — every
  one of their access topics starts at Workflows and then says "Select the X tab".
- The definitive sentence: *"The Workflows tab on the Workflows page appears."*
  (`access-workflow-fa9892a7.md`). A tab named the same as its page — precisely the Audit Rules
  shape (Audit Rules page, Custom/Validation/Random tabs).
- **Role gate is shared, not split**: `workflows-tool-8b3b4dbe.md` gates the whole tool on Global
  and Group Invoice Configuration administrator; `step-2-activate-the-feature-27a421e2.md` and
  `step-3-edit-the-workflow-steps-f2731590.md` both say *"requires permissions for the Workflows
  section in Administration"* — the section, not a tab. The only tab-specific role note
  (Reason Category and Codes → Invoice Configuration administrator (Restricted)) is a **narrower**
  role on the same page, not a distinct gate; a release note confirms the Restricted role gets
  read-only Workflows as a whole (labelled: release note,
  `release-notes/updated-read-only-access-for-invoice-configuration-administrator-restricted-role-6df11845.md`).

**The PAGE vs the OBJECT.** `Workflows` (page) lists workflow objects; a *workflow* is an object
and there can be many. `create-a-new-workflow-554e86aa.md` (14,383 B) and
`create-a-new-workflow-15992497.md` (2,017 B) — **different loio**, not a gerund/imperative twin
pair, not duplicates: the first is the full procedure with an 85-row field roster, the second is a
short conceptual note about copy-only creation and the approval-timeout interaction. Both are about
the OBJECT. Diffed by body md5; the four `workflow-guides-*.md` files (1,473 / 1,784 / 1,769 /
1,663 B, four distinct loio, four distinct body md5) are **index tables of setup GUIDES**, not
pages, and must not become nodes.

**New Experience:** `ls | grep -i new-experience` returns 5 files corpus-wide and `grep -rl
"New Experience"` returns 9 files. **None** is in the workflow/approval configuration domain. There
is **no New Experience twin of the Workflows page in 2026_08.** The two New Experience tools-guides
files (Invoice Manager, Unassigned Invoice) are AP-user runtime screens. This is a finding: the
primary UI target for this project has no separate documented workflow-admin variant, so the legacy
topics are the only source and `uiVariant` should be `undifferentiated`.

### (3) Feature Hierarchies — IT IS ITS OWN PAGE, AND IT IS NOT A WORKFLOWS TAB.

It is a real left-menu page: `grep -F "Click Feature Hierarchies (left menu)."` -> 1 in
tools-guides/step-2-associate-the-feature-hierarchy-to-the-source-list-bcaf1f5a.md. Second path:
`professional-edition-fb3e6aa2.md` — "Go to Administration   Invoice   Feature Hierarchies." then
*"Select the Invoice Payment feature name."* / *"Select Modify Hierarchy."*
It carries its own permission: *"requires permissions for the Feature Hierarchies section in
Administration"* (`step-1-define-the-cost-object-approver-hierarchy-6e7b7dc6.md`).

It is genuinely cross-cutting — one page hosting at least four named feature hierarchies:
**Invoice Routing** (Routing Configuration's prerequisite), **Invoice Vendor Employee Access**
(Group Configurations / vendor groups), **Invoice Payment** (payment groups), and the
**Cost Object Approver hierarchy** and **Authorized Approver hierarchy** (Workflows' prerequisites).

**My recommendation: it belongs to neither Workflows nor Routing Configuration — it is its own
page and should be built as one, once, and referenced by both.** Homing it inside Workflows would
mis-file the routing and vendor-access hierarchies; homing it inside Routing Configuration would
mis-file the COA hierarchy that only Workflows uses. All four unresolved dependency endpoints
(dep.g1.061, dep.g2.003, dep.g5g5.050, dep.g5g5.051) are about a **Source List** field on that one
page, which is exactly the shape of a shared page, not of a tab in either group.
Leaving it unclaimed a third time would be the wrong call; if this group will not take it, it
should be its own build unit rather than a Workflows tab.

### (4) The Routing Configuration boundary.

Routing Configuration's 10 built fields, read from the graph, are **all import-mechanics**:
`search_routing_mappings, employee_last_name, segment_1_3, delete_flag, employee_id,
level_1_10_code, browse_button, import_button, download_template_button, import_details_type_filter`
— sourced from `search-for-hierarchy-mappings-1dea6bb6.md`,
`the-import-template-fields-and-descriptions-8b4aa547.md`, and the four `step-N-*` import topics.
That page is the **Hierarchy Mappings import + search UI** for auto-assignment of an invoice to a
processor. It contains **no approver, no step, no rule, no notification, no status** control.

**Nothing in the Workflows tree duplicates it.** The boundary is clean and I found no mis-homed
field. The one contact point is Feature Hierarchies, which precedes both.

`tools-guides/workflow-and-approval-routing-8b4ff6c9.md` (1,502 B): **it straddles in title only and
falls on neither side as a page.** Its whole content is prose best-practice —
*"All workflow options available for non-PO policies are also available to a PO-based invoice
policy."* plus a "Best Practice: Workflow for PO-Based Invoices" paragraph. It names no page, no
tab, no field, no click. It is a **feature-name-only** topic. Do not create a node for it.

### (5) End-user traps — every rejection names where its configuration lives.

See the `rejected` list in the structured output. Summary of the load-bearing ones:

| Runtime screen | Where its configuration lives |
|---|---|
| Approval Flow page / Approval Flow for Invoice / for Purchase Request | Workflows > **Settings tab** (*Allow users to select their own approver…*) plus the workflow's **General page** fields *Editable By Group(s)* and *Steps Can Be Added By*. `invoice-settings-cace748d.md` states the override explicitly. |
| My Work approval links on the home page | Workflows > **Settings tab**, *Display payment request approval links to approvers on the home page*. |
| Requests Pending Your Approval window | Workflows > **Settings tab**, *Display purchase request approval links to approvers on the home page*. |
| Approve / Send Back to Employee buttons and their labels | Workflows > **Approval Statuses tab** (*Action Text* becomes the approver's button text) and the workflow's **Steps page**. |
| Recall to last processor step | Workflows > **Settings tab**, *Allow processor to recall a payment request to last processor step*. |
| Reason picker shown when a processor returns an invoice | Workflows > **Reason Category and Codes tab**. |
| Confirmation/acceptance text shown on submit and on approve | Workflows > **Confirmation Agreements tab** (agreement text) + the workflow's **General page** (*Submit Confirmation Agreement*, *Approval Confirmation Agreement* lists). |
| Invoice Manager page (New Experience), Approve Invoices, batch verification, Unassigned Invoice | AP-user / processor runtime; gated by the **Invoice AP User** role in User Administration, not by an Invoice admin page. Nothing in Workflows configures them. |
| Delegate / proxy switching | User Administration (outside the Invoice admin surface). The one *Invoice-side* delegate control is Workflows > workflow **General page**, *Allow delegated approvers to approve their own requests* (`delegate-self-approval-1b627285.md`). |

---

## WHERE THE RICH MATERIAL IS (aim the real build here — no fields extracted in this run)

| File | Bytes | Indented rows | Why |
|---|---|---|---|
| admin-guides/create-a-new-workflow-554e86aa.md | 14,383 | 85 | The workflow **General page** field roster. Densest file in the group. |
| admin-guides/work-with-the-step-rules-page-4c33cda0.md | 11,246 | 29 | **Step Rules page**: rule fields + the Action catalog. |
| admin-guides/create-email-reminders-604c4a46.md | 10,163 | 49 | **Email Reminders page** configuration roster. |
| admin-guides/conditional-expressions-and-the-condition-page-4d98af34.md | 9,326 | — | The **Condition page** editor — shared with Audit Rules; check for duplication before extracting. |
| admin-guides/work-with-the-steps-page-fab249d1.md | 6,726 | 28 | **Steps page** / Add Workflow Step window fields. |
| admin-guides/general-information-8b3b0308.md | 6,719 | 139 | Workflows guide **revision history** — a change log, NOT a field roster. Use for names and dates only. |
| admin-guides/filter-authorized-approvers-...-aae69350.md | 6,234 | 21 | Authorized-approver levels; contains 1 raw `<table>` with `<p>` cells. |
| admin-guides/invoice-settings-cace748d.md | 4,901 | 2 + raw `<table>` | Settings tab, invoice member. **5 rows, not 2.** |
| admin-guides/create-reminder-rules-b0a7fac5.md | 3,979 | 13 | Email Reminders **Rules tab**. |
| admin-guides/authorized-approver-list-a9522ec8.md | 3,773 | 16 | Authorized Approver List tab. |
| admin-guides/purchase-request-settings-b0bce285.md | 3,735 | 13 | Settings tab, PR member. |
| admin-guides/add-an-email-notification-c237a2de.md | 3,505 | 0 | Email Notifications tab — 0 markdown rows; re-census for raw HTML before dismissing. |
| admin-guides/default-approval-statuses-34c83d58.md | 3,405 | 48 | Approval Statuses catalog of shipped defaults. |
| admin-guides/work-with-purchase-requests-approvals-1c39ee21.md | 2,916 | 16 | Approval Statuses > Purchase Request sub-tab. |
| admin-guides/email-message-replacement-tokens-c9cc4af4.md | 2,796 | — | Email Notifications token value set. |
| admin-guides/create-a-confirmation-agreement-3e153f29.md | 2,293 | — | Confirmation Agreements tab. |
| admin-guides/purchase-order-settings-a5a997b4.md | 1,417 | 4 | Settings tab, PO member. 1 row. |
| admin-guides/creating-a-reason-code-b2b61596.md | 1,284 | — | Reason Category and Codes tab. |

## THIN-IS-CORRECT NOTE
Several tab-level topics are genuinely thin stubs and should be recorded as such rather than padded:
`workflow-settings-8b3b98e1.md` (743 B, content-free section header),
`reason-category-and-codes-8b3b27d4.md` (866 B),
`confirmation-agreements-8b3aca2e.md` (908 B),
`work-with-invoice-approval-statuses-8b3bab8c.md` (922 B),
`accessing-and-managing-email-notifications-8b3d94c0.md` (981 B),
`create-and-configure-workflows-8b3add35.md` (992 B),
`step-3-add-edit-the-workflow-options-...-14d98974.md` (994 B),
`edit-and-delete-workflows-properties-and-steps-8b3af043.md` (881 B — and its abstract is about
workflow ERRORS, mismatched to its title).

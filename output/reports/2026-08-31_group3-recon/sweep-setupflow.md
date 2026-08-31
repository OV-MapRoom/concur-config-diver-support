# Sweep F — Configuration-Guide Structure and Setup Flow (Group 3 / PO Matching)

Corpus: `/mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE`, SAP `2026_08`, Professional
Edition, crawled 2026-08-29. Both guide directories swept (admin-guides 1209 files, tools-guides
650). Release notes used only to corroborate a page NAME, and labelled as such.

---

## HEADLINE

**The PO area's own admin surface is TWO pages, not eleven.** Corpus-wide, exactly two
`Administration > Invoice > X` left-menu targets are PO-specific: **Purchase Order Configuration**
and **Purchase Order Matching Rules**. Every other step in every PO/PR setup flow routes through a
page that is *already in the graph* (Policies, Forms and Fields, Invoice Settings, Group
Configurations, Audit Rules, Company Locations, Units Of Measure, Exceptions) or through a page
explicitly reserved for another group (Workflows, Localization, Shipping Configuration). Thin is the
answer here, and the gap between 2 and the lost map's "11 pages" is itself the finding: the original
Group 3 almost certainly counted *setup-flow stops*, not *pages unique to PO*.

---

## 1. Is there a "Purchase Order Configuration Guide"? — NO, but there are three guides

I enumerated every guide-root topic in the corpus by grepping for the `Revision History` cover
block (76 hits). There is **no** guide titled "Concur Invoice: Purchase Order Configuration Guide".
The PO domain is covered by these guide roots:

| Guide root file | Title | bytes |
|---|---|---|
| `concur-invoice-professional-edition-admin-guides/purchase-request-and-purchase-order-8b36ae07.md` | Purchase Request and Purchase Order | 5892 |
| `concur-invoice-professional-edition-admin-guides/purchase-order-matching-8b351a47.md` | Purchase Order Matching | 4946 |
| `concur-invoice-professional-edition-tools-guides/purchase-order-matching-8b4f2662.md` | Purchase Order Matching (tools/user) | 5045 |
| `concur-invoice-professional-edition-tools-guides/purchase-request-and-purchase-order-8b505460.md` | Purchase Request and Purchase Order (tools/user) | — |
| `concur-invoice-professional-edition-admin-guides/receipt-confirmation-8b370deb.md` | Receipt Confirmation | 2546 |
| `concur-invoice-professional-edition-admin-guides/concur-invoice-purchase-order-import-specification-8b443eee.md` | PO Import Specification | — |

**These cover pages carry ONLY a revision history — no table of contents.** The crawl did not
preserve guide TOC ordering. Every topic in both directories carries the same
`deliverable_id: 41460672` (admin) regardless of which PDF guide it came from, so **guide membership
is not recoverable from front matter**. Ordering had to be reconstructed from in-body
cross-references ("in this document", "Continue to Step 2, Step 3, and Step 4", "Proceed to Step 3").

Cross-references name these guides by title, which is how I attributed topics:
*Concur Invoice: Purchase Request and Purchase Order Setup Guide*, *Concur Invoice: Purchase Order
Matching Setup Guide*, *Concur Invoice: Receipt Confirmation Setup Guide*.

---

## 2. The setup flows I recovered, in build order

### 2a. `purchase-order-setup-process-9f253ce7.md` (1300 bytes) — the top-level PO build order
Terse but explicit. It is the only topic in the corpus that enumerates PO setup end-to-end:

1. Training
2. Purchase Order Invoice Policy, whose prepared components are:
   - Purchase Order: Forms and Fields
   - Purchase Order - Payment Request: Forms and Fields
   - Purchase Order - Payment Request: Workflow
   - Match Rules
3. Purchase Order Import – Web Service
4. Purchase Order Extract – Overnight Job **- OR -** Purchase Order Extract – Web Service

Reading: **Forms and Fields (built) → Workflows (own group) → Purchase Order Matching Rules (NEW) →
Policies (built)**, then import/extract, which are file/API specs, not pages.

### 2b. PO Matching Rules — a genuine numbered Step 1..4 chain, all on ONE page
| Step | File | bytes | Surface |
|---|---|---|---|
| 1 | `step-1-create-the-purchase-order-matching-rule-set-4d3866f3.md` | 1445 | Purchase Order Matching Rules (Copy / Rename / Done) |
| 2 | `step-2-create-the-life-to-date-matching-rule-set-dc296ae6.md` | 4921 | …→ Edit → **Life to Date** tab |
| 3 | `step-3-create-the-po-to-request-fields-matching-rules-64eb1c47.md` | 3721 | …→ **Rules** tab, in *Purchase Order Matching Set* |
| 4 | `step-4-add-condition-based-rule-to-a-named-rules-group-db93fb81.md` | 3476 | …→ *Purchase Order Matching Rules Group Conditions* window |

Step 1 says "Continue to Step 2, Step 3, and Step 4"; Step 2 says "Proceed to Step 3". The ordering
is corpus-stated, not inferred. **All four steps happen on the same page** — this is the
"Audit Rules is one page with three tabs" pattern, not four pages.

### 2c. Purchase Request configuration — the PR&PO Setup Guide's setup section
`configuration-of-purchase-requests-8b369a1e.md` (1335 bytes) is the section preamble and states the
principle outright: "each step uses tools familiar to any administrator of Concur Invoice (forms and
fields, workflow, role assignment, etc.), with some PR-specific tools as noted". Its sibling topics,
in the order the guide presents them:

| # | Topic file | bytes | Surface it sends you to | Status |
|---|---|---|---|---|
| 1 | `enable-purchase-requests-9c0026e0.md` | 921 | (none — SAP Concur service request) | not a page |
| 2 | `purchase-request-roles-6dbd7af9.md` | 2166 | **User Permissions**, Invoice tab | outside Invoice admin |
| 3 | `forms-and-fields-616d64bc.md` | 1947 | Forms and Fields | BUILT (G5) |
| 4 | `the-purchase-request-vendor-form-54010f45.md` | 1827 | Forms and Fields / Policies | BUILT |
| 5 | `workflow-667cee21.md` | 1896 | Workflows + **Feature Hierarchies** | Workflows group / unassigned |
| 6 | `policy-c8ec906b.md` | 2382 | Policies → then Group Configurations | BUILT (G1) |
| 7 | `set-a-default-shipping-and-billing-address-f772bed1.md` | 4286 | Company Locations (+ Employee Import, Profile, User Administration) | BUILT (G5) |
| 8 | `shipping-configuration-and-shipping-terms-3429ee14.md` | 1416 | **Shipping Configuration** | Group 6, out of scope |
| 9 | `units-of-measure-270126e4.md` | 2244 | Units Of Measure | BUILT (G4) |
| 10 | `use-the-purchase-order-configuration-tool-51009c8c.md` + `configure-purchase-orders-8128725e.md` + `purchase-order-configuration-is-group-aware-b603f04b.md` | 1179 + 5956 + 1466 | **Purchase Order Configuration** | **NEW — Group 3** |
| 11 | `exceptions-d945b953.md` | 1730 | Exceptions + Workflows > Settings | BUILT (G2) |

**That list of ~11 stops is, I believe, where the lost map's "11 pages" came from.** Only one of
them (#10) is a page the graph does not already have.

### 2d. Receipt Confirmation setup — a numbered chain with holes
Only Step 3 and Step 5 survive the crawl as `step-*` files. Steps 1, 2 and 4 have **no topic file**
under any `step-` name, and no in-body cross-reference names them. This is a real corpus gap, not a
search failure.
- `step-3-optional-select-enable-the-required-hardcopy-receipt-setting-c50e377e.md` (1870) →
  **Workflows** (Modify → Require Hardcopy Receipts)
- `step-5-change-localize-receipt-confirmation-type-instructional-text-5328a8e1.md` (3897) →
  **Localization** tool, and a *Select Confirmation Type* window opened from **Edit Confirmation**
  inside the PO Matching Rules Condition Editor.

### 2e. Three-way matching — `configure-three-way-matching-c043e5c8.md` (5689 bytes)
Explicitly ordered, three named actions, three already-built destinations plus PO Matching Rules:
PO Matching Rules (Line Item – Receipt rule + Match against Received Quantity) → Forms and Fields
(Delivery Slip Number on Payment Request Header) → Audit Rules (`Is Purchase Order line Associated`,
`Is Receipt Associated`). Prerequisite stated up front: the Quantity Receipt file must be imported
(FTP / API / Concur Receiving) **before** the admin configures.

---

## 3. The corpus-wide left-menu census (the decisive evidence)

```
grep -rho "Invoice *> *[A-Z][A-Za-z /&'-]*" <both guide dirs> | sort | uniq -c | sort -rn
```
Every `Administration > Invoice > X` target named anywhere in either guide directory. Of the 33
distinct targets, exactly **two** are PO-specific:

- `Invoice > Purchase Order Matching Rules` — 3 occurrences
- `Invoice > Purchase Order Configuration` — 2 occurrences

There is **no** `Invoice > Purchase Orders`, no `Invoice > Purchase Requests`, no `Invoice >
Receiving`, no `Invoice > PO Matching`, no `Invoice > Receipt Confirmation`. Restricting the same
grep to files that mention purchase order / purchase request / PO matching / receipt confirmation
and looking only at `(left menu)` clicks returns: Forms and Fields, Purchase Order Matching Rules,
Polices[sic], Invoice Settings, Localization, Audit Rules, Delegate Configurations, Invoice
Preferences. Nothing else.

**Neither PO page hangs off `Invoice Processing Admin`.** `grep -rh "Invoice Processing Admin"`
filtered to PO terms returns zero hits. Both are direct children of `Administration > Invoice`.

---

## 4. New Experience twins in the PO area (byte counts from `wc -c`)

| Legacy | bytes | New Experience | bytes | Richer |
|---|---|---|---|---|
| `policies-the-purchase-order-policy-8b35454a.md` | **1,490** | `policies-the-purchase-order-policy-new-experience-5a1ba7ef.md` | **15,800** | New Experience, 10.6x |
| `purchase-order-matching-rules-8b357dbb.md` | **2,404** | `purchase-order-matching-rules-new-experience-6c8fb80f.md` | **4,804** | New Experience, 2.0x |

These are the **only two** New-Experience twins in the PO area (the corpus has five
`*new-experience*` files total; the other three are Invoice Manager, Unassigned Invoice, and
end-user experience). Both twins share `deliverable_id: 41460672` with their legacy partner, so the
deliverable id does NOT discriminate them — the `(New Experience)` title suffix does.

Corroboration that this is a real UI variant and not a republish: the PO Matching guide root's own
revision history records, under September 19, 2025, "Added new topics for the New Experience for
Concur Invoice."

**The rich 15,800-byte PO policy topic is a Policies-page topic, not a Group 3 page.** It inlines the
whole PO policy surface: `Is PO Policy`, `PO Matching Ruleset`, `External ID`, the PO form roster,
copy-down configuration, the Multiple PO activation, Delivery Slip Number, and the PO
Header/LineItem/Distribution field tables (Custom 1–24 / Custom 1–20). It is the outstanding
Group 1 debt the brief names, and it is where the real field harvest should be aimed — but it
harvests into **Policies**, not into a new page.

The `purchase-order-matching-rules-new-experience-6c8fb80f.md` extra 2.4KB is a "Before You Begin"
block: rule-set naming/testing convention, the In-Use lock and how to unlock it, and exchange-rate
activation. Same navPath as the legacy twin — no UI-variant navigation difference is stated.

---

## 5. Page-hood verdicts

### CANDIDATE 1 — Purchase Order Configuration · **separate tool** · HIGH
Own left-menu entry off `Administration > Invoice`, own role gate (Invoice Configuration
administrator), group-aware (you pick a Group before creating the configuration). Named-and-quoted
in three files across BOTH guide directories, plus a June 2017 admin release-note summary.
**Contradiction recorded, not reconciled:** the corpus calls it a "tool" in the body text
(`use-the-purchase-order-configuration-tool-51009c8c.md`, `preview-a-purchase-order-846396e1.md`) and
a "window" in the PR&PO guide revision history (`purchase-request-and-purchase-order-8b36ae07.md`
line 209). Never a "page". Richest content file is `configure-purchase-orders-8128725e.md` (5,956
bytes) — PO number generation, transmittal message, email subject/message, company address,
supporting documents, branding logo, default sender email, fields-to-appear, ship-to/company-name
overrides, Use Email as Bill-To.

### CANDIDATE 2 — Purchase Order Matching Rules · **admin page** · HIGH
Own left-menu entry, "The Purchase Order Matching Rules page appears", own role gate, own list grid
(Rule Set Name / In Use / Associated Policies), own Step 1..4 configuration chain. This is the
spine of Group 3.

### CANDIDATE 3 — Purchase Order Matching Set · **wizard/dialog inside candidate 2** · MEDIUM
The edit surface opened by selecting a rule set and clicking Edit. Carries the **Rules** and
**Life to Date** tabs. `edit-purchase-order-matching-rules-604d1e31.md`: "Click Edit to open Purchase
Order Matching Set." Not a page — no click path of its own.

### CANDIDATE 4 — Purchase Order Matching Rules Group Conditions · **wizard/dialog** · MEDIUM
Step 4's condition editor, opened from a named rules group via Add. Not a page.

### CANDIDATE 5 — Purchase Order Matching Rule Group rules window · **wizard/dialog** · MEDIUM
Opened via Edit Rules on a rule group (`configure-three-way-matching-c043e5c8.md`). **Possible
alias of candidate 3** — the corpus names it differently in different topics and I am NOT
reconciling them. Recorded as its own entry with the contradiction stated.

### CANDIDATE 6 — Select Confirmation Type · **dialog** · LOW
Opened by Edit Confirmation while authoring rule group conditions. One quote only.

### CANDIDATE 7 — Feature Hierarchies · **separate tool, probably NOT Group 3** · LOW
Real left-menu entry ("Click Feature Hierarchies (left menu)"), and the PR&PO setup flow requires it
("Feature Hierarchies before selection via the Policy tool"). Not among the 18 built and not named
in any of the still-unbuilt group lists. Reported because it is a genuine unclaimed admin surface my
route surfaced; I judge it belongs with Workflows or Group 7, not Group 3.

### CANDIDATE 8 — Delegate Configurations · **separate tool, probably NOT Group 3** · LOW
Same situation: real left-menu page, appears in the PO corpus only because delegates can submit
purchase requests. Generic, not PO. Reported for completeness.

---

## 6. Rejected, with where the configuration actually lives

| Rejected | Why | Where its config lives |
|---|---|---|
| **Purchase Order Settings** | A settings *table*, not a page. "The following settings apply globally to purchase orders (PO)." Its single setting is stated elsewhere to live in Workflows. | Workflows > Settings tab |
| **Purchase Request Settings** | Same shape. Its three settings are approver-selection, home-page approval links, exception-level block. | Invoice Settings / Workflows |
| **Purchase Order tab** | End-user/processor screen inside an opened invoice. "The Purchase Order tab provides comparison information necessary to resolve exceptions." | Forms and Fields (PO forms), PO Matching Rules (what raises the exception) |
| **PR and PO Processor / Purchase Order Processor / Purchase Request Processor** | End-user processor experiences (queries, search, send back, transmit). | Policies (forms/workflow), Workflows, User Permissions (roles) |
| **Invoice Manager / Unassigned Invoice** | End-user screens. | — |
| **Enter Received Goods / Concur Receiving** | End-user receiving screens. Receiving is *activated* on Policies. | Policies → PO Configuration section → Enable Concur Receiving; forms via Purchase Order Receipt form in Forms and Fields |
| **PO Import / PO Extract / Purchase Order Import Web Service / Quantity Receipt Import** | File-format specifications and an API. The only UI named is "Concur Connect on the Invoice menu", which is an integration module, not a PO config page. | Concur Connect module (SAP-activated); field mapping via Forms and Fields |
| **Three-Way Matching / Two-Way Matching / Receipt Confirmation / Multiple Purchase Order / PO Change Order** | Feature names with no screen of their own. | PO Matching Rules; Forms and Fields; Invoice Settings (`Enable Change Order`); Workflows |
| **Shipping Configuration** | Real page with a real click path (`Administration > Invoice > Shipping Configuration`, tabbed) and it IS in the PR&PO setup flow — but the brief assigns it to Group 6. | own page, Group 6 |
| **Localization** | Real page in the receipt-confirmation flow; Group 6. | own page, Group 6 |
| **Workflows** | 13-page group of its own. | own group |
| **Policies / Forms and Fields / Invoice Settings / Group Configurations / Audit Rules / Company Locations / Units Of Measure / Exceptions** | Already in the graph. Their appearance in PO setup flows is **ordering evidence**, not new pages. | already built |
| **Purchase Request Configuration** | Not a page — a *section of options* that appears on the Policies page once `Is Purchase Request Policy` is selected. | Policies |
| **User Permissions / User Administration** | Roles and default shipping address are assigned outside Invoice admin. | Company Admin |

---

## 7. Text traps hit during this sweep (pass these on)

1. **Non-breaking spaces in nav paths.** Several nav strings use U+00A0, e.g.
   `Administration<NBSP><NBSP>Invoice<NBSP><NBSP>Feature Hierarchies` and
   `Invoice<NBSP><NBSP>Feature Hierarchies`, with **no `>` at all**. Two of my quotes failed
   `grep -F` on this before I trimmed them. Any downstream nav grep that assumes `>` will miss these
   entirely. `cat -A` is the only reliable way to see it.
2. **`Polices`** misspelling is live in `configure-concur-receiving-1ececc23.md` inside an actual
   click step: "Select Administration > Invoice > Polices (left menu)."
3. **`Administration >Invoice`** (no space) is live in the PO area, e.g.
   `activate-the-multiple-purchase-order-feature-84e92edd.md`.
4. **Gerund/imperative twins in the PO area are republishes, not variants.** Confirmed same
   `deliverable_id` and near-identical bodies for:
   `activate-…`/`activating-the-multiple-purchase-order-feature` (2418 / 1521),
   `allow-purchase-request-owners-to-edit-…` two loios (1400 / 1366),
   `allow-…-transmit-…` two loios. Do NOT emit these as UI variants.
5. Guide cover pages are **revision history only** — never a TOC. Do not expect one.

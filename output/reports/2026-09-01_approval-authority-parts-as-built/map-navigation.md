# MAP / Navigation & Taxonomy Survey — Authorized Approval Limits

Run date 2026-09-01. Corpus: `/mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE`,
SAP version 2026_08, Professional Edition, crawled 2026-08-29. One page added: `authorized-approval-limits`.

---

## 1. Does the page exist? Yes, and it is a WINDOW, not a tool.

The literal string `Authorized Approval Limits` occurs in exactly **two files corpus-wide** — I swept both
guide directories with equal weight:

```
grep -rlF "Authorized Approval Limits" <admin-guides> <tools-guides>
  concur-invoice-professional-edition-admin-guides/user-administrator-fcfd570c.md
  concur-invoice-professional-edition-admin-guides/user-administration-8b167b96.md
```

Both name it a **window** opened from a **link**, never a left-menu tool:

* fcfd570c — "The administrator clicks the link. The Authorized Approval Limits window appears."
* 8b167b96 — "The Authorized Approval Limits window appears."

That is a genuine, twice-attested surface. It is not a "no documentary basis" case.

---

## 2. Page identity — the three questions

### (a) One surface or two? **ONE page. I tested the prior 75%-confidence verdict and I agree with it.**

`user-administrator-fcfd570c.md` documents two **mutually exclusive renderings** of one section of the
User Details page, selected by the tenant's hierarchy shape:

* **Branch A — Global group only.** Verbatim: "If the Authorized Approver feature is activated and the
  company has only one group (Global), then the Authorized Approver check box appears in the Expense and
  Invoices Setting section in Administration > Company > Company Admin > User Administration." Selecting it
  reveals two controls: "When the administrator selects the check box, the Manager Approval Limit field and
  the Approval Limit Currency list appear." **In this configuration the Authorized Approval Limits window
  does not exist at all**, and the branch is limit-only: "This method is used only for limit-based
  authorized approvers. It cannot be used for exception-based authorized approvers."
* **Branch B — hierarchy with at least one non-Global level.** The link appears and opens the window.

Evidence I checked for the one-page verdict:

1. `global-group-vs-authorized-approver-hierarchy-8a960238.md` puts **User Administration in a single
   step-4 row marked X under BOTH** the "Global group only" and the "Authorized Approver hierarchy"
   columns. The corpus does not split the surface by branch; it splits the *hierarchy setup* by branch.
2. Both renderings live under one lead sentence in one topic (fcfd570c), under one title.
3. No corpus topic names a second page. Minting one would be an invention.

So: emit branch A's controls on this page **with explicit conditional visibility** and a mutual-exclusion
relation against branch B. Do not create a second page. Tension recorded in identityNotes.

**Branch A is single-sourced and that is not a reason to drop it.** `grep -rn -F "Manager Approval Limit"`
returns fcfd570c and nothing else across both guide directories. There is no second attestation to wait for.

### (b) Does the link belong to User Administration, or is the window its own surface? **Its own surface.**

User Administration is a **container** hosting several independent links, not this page:

* `fields-overview-5e3daf7c.md`: "Employee Fields: Used by the Expense and Invoice Settings section of the
  User Details page." — the section is a *region of a user record*, populated by employee form fields.
* `set-a-default-shipping-and-billing-address-f772bed1.md` reaches a **different** link from the same
  section ("Click Invoice Preferences to open a window…").
* `assigning-the-approver-for-the-purchase-request-user-20294611.md` reaches an **Approvers** control from
  the same section.
* `step-6-select-the-vendor-access-group-for-the-user-bb58ded2.md` (tools-guides) selects a **vendor group**
  from the same section.
* The title-collision file `user-administrator-5aa3eb5e.md` (1,432 B) — same title "User Administrator" as
  the primary, **not opened or mined here**, out of scope — is further evidence that the container hosts
  several unrelated links.

THIS page is therefore the **Authorized Approval Limits link and the window it opens**, not the User
Administration tool. The general User Administration user-profile surface remains unbuilt and defers to an
external *Shared* guide absent from this corpus — a **documentary** gap, not a menu-location judgement.

Both the path **to the link** and the step **into the window** are recorded as separate navPathEvidence
entries.

### (c) Tabs? **None. `tabs: []` is a positive finding.**

Neither primary describes a tab strip, a tab label, or a second pane. Both describe one modal window with a
left side (hierarchy selector) and a right side (the value controls): "On the left side, the administrator
selects the appropriate level in the hierarchy." `tabsSourceQuote` and `tabsSourceFile` are deliberately
empty — there is no quote to attest an absence.

---

## 3. Navigation — the click path, and it is NOT under Administration > Invoice

`url` is deliberately empty. The corpus publishes zero `.asp` URLs and there is no live-UI observation for
this surface. The click path is all the navigation knowledge this page will ever have.

**Nine distinct documented paths recorded**, every quote grep -F verified:

| # | Path | File |
|---|---|---|
| 1 | Administration > Company > Company Admin > User Administration > Expense and Invoices Setting section > Authorized Approval Limits (link) | fcfd570c |
| 2 | …same 4 segments… > Authorized Approver (check box) — **branch A** | fcfd570c |
| 3 | Administration > User Administration — **2-segment**, lead sentence | fcfd570c |
| 4 | Administration > User Administration > Expense and Invoice Settings — 2-segment **corroborated in a second file** | f772bed1 |
| 5 | User Administration > Expense and Invoices Settings section > Authorized Approval Limits (link) > window | 8b167b96 |
| 6 | …link > Authorized Approval Limits (window) | fcfd570c |
| 7 | User Administration > Expense and Invoices Settings section > Authorized Approval Limits (link) — Cost Object Approver gate | 8b167b96 |
| 8 | Administration > Company > Company Admin > User Administration **(left menu)** | bb58ded2 (tools-guides) |
| 9 | Administration > Company Administration > User Administration **(Search & Select)** > Expense and Invoice Settings | 20294611 |

### The click path contradicts itself inside one file — recorded, not reconciled

* **4-segment** (majority, twice in fcfd570c): "…in Administration > Company > Company Admin > User Administration."
* **2-segment** (fcfd570c lead sentence): "The settings that appear in User Administration (Administration > User Administration) differ…"

A driver should try the longer form first. The 2-segment form is **not** a one-off: `f772bed1` independently
writes "by accessing that user in Administration > User Administration." So the disagreement is corpus-wide,
not a typo in one sentence.

### Two further container-label variants my own sweep found (beyond the seed list)

* `bb58ded2` (tools-guides) adds the **left-menu** hop: "Click User Administration (left menu)." preceded by
  a step reading Administration / Company / Company Admin. This is the only file that tells a driver User
  Administration is a **left-menu** entry under Company Admin.
* `20294611` writes the container as **"Company Administration"**, not "Company Admin", and names the search
  gate: "User Administration (Search & Select)".

**Both of those sentences use U+00A0 as the menu separator and carry no `>` glyph at all.** See §7.

---

## 4. Aliases and the section-label drift — record, do not reconcile

The host section has **three** documented spellings. I re-measured rather than trusting the brief:

| Form | Files | Notes |
|---|---|---|
| "Expense and Invoices Setting section" | **1** (fcfd570c) | the branch-attached form; both branch sentences use it |
| "Expense and Invoices Settings section" | **1** (8b167b96) | |
| "Expense and Invoice Settings" | **6** (20294611, 5e3daf7c, f772bed1, 8b167b96, bb58ded2, da376eef) | corpus-**majority** form; the brief said 4, my count is 6 |

`fields-overview-5e3daf7c.md` and `f772bed1` confirm the majority form names the **same** region — "the
Expense and Invoice Settings section of the User Details page". The branch-attached form is emitted as
primary (it is the one that actually attaches to the Authorized Approval Limits link); the other two are
aliases with their file counts. A driver searching the rendered page for a section header needs all three.

Page aliases: *Authorized Approval Limits window*, *Authorized Approval Limits link*, and — for branch A
only — the inline *Authorized Approver check box*.

---

## 5. Role gate — THREE conditions, not two

| Condition | Applies to | Verbatim |
|---|---|---|
| User Admin rights | check box (branch A) | "In order to see the check box described here, the user must have the User Admin rights and the Invoice User Administration rights." |
| Invoice User Administration rights | check box (branch A) | same sentence |
| User Admin rights | link (branch B) | "To see the link described here, the administrator must have the User Admin rights and the Invoice User Administration rights. In addition, the employee must be an approver." |
| Invoice User Administration rights | link (branch B) | same sentence |
| **the employee must be an approver** | link (branch B) only | same sentence |

The third condition is about the **record being edited**, not the administrator — a driver that only checks
admin roles will find the link missing on a non-approver's user record and mis-diagnose it as a permission
failure. `grep -rn -F "Invoice User Administration"` returns fcfd570c and nothing else corpus-wide.

---

## 6. Contradictions to carry forward (four)

### C1 — The activation gate names TWO DIFFERENT FEATURES. Load-bearing.

* fcfd570c: "**If the Authorized Approver feature is activated** and the company's Authorized Approver
  hierarchy has at least one level (in addition to Global), then the Authorized Approval Limits link
  appears…"
* 8b167b96: "**When the Cost Object Approver feature is activated**, the Authorized Approval Limits link
  appears in the Expense and Invoices Settings section in User Administration."

A driver must know which flag to check before it hunts for the link. **Nuance I measured that the brief did
not state:** 8b167b96 *also* carries the Authorized-Approver condition in its own Note — "you need to have
activated the Authorized Approver feature and the company's Authorized Approver hierarchy needs to have at
least on level (in addition to Global)". So 8b167b96 internally requires **both** features, while fcfd570c
names only Authorized Approver. The likely explanation (a hypothesis, not a resolution) is chapter
provenance: 8b167b96 is the Cost Object Approval guide's topic, fcfd570c is the Authorized Approver /
Workflows guide's topic, and each names its own chapter's feature. **Both recorded; not reconciled.**

### C2 — The Level control: present here, or impossible here?

* 8b167b96 (in this window): "For level-based cost object approval, select a level."
* `filter-authorized-approvers-by-workflow-approval-step-aae69350.md`: "**Levels cannot be added to
  approvers via User Administration.**" and "The levels can be added to users via the Employee Import or the
  Authorized Approver list (Administration > Invoice > Workflows > Authorized Approver tab)."

Both grep -F verify. **Hypothesis, offered as hypothesis only:** two different values sharing one label.
aae69350's Level is the *authorized-approver workflow-step filter* (employee import record type 720 per
`step-2-assign-the-level-to-the-approver-d8bf669c.md`; Authorized Approver Hierarchy). 8b167b96's Level is
the *level-based **cost object** approval level* (record set 710 per `employee-import-e28f2294.md`; Cost
Object Approver Hierarchy). If a Level control is emitted here it must carry a **distinct** name such as
`cost_object_approval_level` and must **never** be presented as a sibling of the built
`field.workflows.authorized-approver-level`. The contradiction stays open.

### C3 — The "unlimited" recipe differs by surface.

* Workflows/a9522ec8 requires **two** acts: "set to no approval limit currency, and leave the approval limit
  amount blank."
* This window (8b167b96) states **one**: "For an unlimited approval amount, leave blank (null)."
* `setting-an-unlimited-approval-amount-9d98b489.md` is surface-agnostic and also states one act.

Whether the currency must **also** be cleared in this window is **undetermined by the documentation**. Say
so; do not import the Workflows recipe. The **zero** semantics, by contrast, are uniform across all
attestations and can be stated flatly.

### C4 — Tab-name drift on the referenced Workflows tab.

fcfd570c writes "Authorized Approvers tab"; `configuration-8b3be88b.md` and aae69350 write "Authorized
Approver tab". Same tab, two spellings, both verbatim.

---

## 7. Text traps — measured on this machine today

* **NBSP menu separators, and a hard limit on what I can emit.** `bb58ded2` (4 NBSPs), `da376eef` (4) and
  `20294611` (12) write their menu paths with **double U+00A0 and no `>` glyph at all**. The two primaries
  (fcfd570c, 8b167b96) contain **zero** NBSP, so quotes taken from them are safe. Verified with python3
  counting `b"\xc2\xa0"`, never with `grep -P "\xc2\xa0"` — which is a silent zero on this box's ugrep 7.8.4.
* **NEW MEASUREMENT, 2026-09-01: U+00A0 does not survive into my tool calls.** I typed the NBSP-bearing
  sentences verbatim and `grep -F -c` returned **0** for both; the same sentences with the NBSPs replaced by
  ASCII runs also return 0 against the file. The character is normalised to a plain space somewhere in
  transport. **Consequence:** no NBSP-bearing sentence may be used as a sourceQuote in this run. Both
  NBSP-file paths are therefore attested by ASCII-only substrings of the same sentences — "Click User
  Administration (left menu)." (bb58ded2, =1) and "User Administration (Search & Select)" (20294611, =1) —
  and their upstream segments are described here in prose rather than quoted.
* **Em dash and curly apostrophe DO survive.** I tested both and both return 1:
  "The cost object configuration defines the type—either limit or level." (U+2014, ×2 in the full sentence)
  and "the company's Authorized Approver hierarchy needs to have at least on level" (U+2019). So the
  precedence rule — the single most valuable sentence on this page — is quotable in full.
* **SAP typo, live:** 8b167b96 reads "at least **on** level" (missing *e*). The correct-English form returns 0.
* **Apostrophes differ between the two primaries and I verified both directions.** fcfd570c uses ASCII
  U+0027; 8b167b96 uses curly U+2019. The ASCII form of the 8b167b96 sentence returns **0**; the curly form
  returns **1**. Never carry an apostrophe-bearing quote across files, and never retype one.
* All 27 quotes emitted or cited in this survey were `grep -F -c`'d against their file before being written.

---

## 8. Boundary against the already-built WORKFLOWS page

The built Workflows page owns four controls whose labels collide with this surface, all from
`authorized-approver-list-a9522ec8.md` (whose own path is "Click Administration > Invoice > Workflows (left
menu). The Workflows page appears." — so nothing may be sourced from it as a field here):

`field.workflows.authorized-approver-approval-limit` ("Approval Limit"),
`field.workflows.authorized-approver-level` ("Level"),
`field.workflows.authorized-approver-can-approve-exception` ("Can approve exception"),
`field.workflows.authorized-approver-list-approver` ("Approver").

**Verdict adopted, and it is corpus-stated rather than inferred.** `configuration-8b3be88b.md`: "The amount
is set for each approver in the Authorized Approver List, in User Administration, or in the employee
import." `step-4-assign-the-proper-rights-to-users-86389a18.md`: "There are three ways to enter and define
authorized approvers in Invoice:" and, decisively, "Regardless of how the authorized approvers are entered
into Invoice, they all appear in the Authorized Approver List." Corroborated four more times (82481079,
8b3c119a, 8b3c5273, 8a960238 step 4). **The three surfaces are DISTINCT UI PRESENTATIONS WRITING ONE
UNDERLYING PER-APPROVER RECORD.** So this window's controls are real fields, each carrying a note naming its
Workflows counterpart by exact field id.

Per-control boundary calls:

* **"Approval Limit" — never emit that label here.** Workflows has one field *literally named* "Approval
  Limit". This window has an unnamed **"Approval Limit area"** holding **two** controls, a currency selector
  and an **Amount** field ("For limit-based cost object approval, select a currency and enter an amount." /
  fcfd570c names only "the Amount field"). Branch A has two further, differently-named controls: "the
  Manager Approval Limit field and the Approval Limit Currency list". Emitting a fifth "Approval Limit"
  would be the exact duplicate this run exists to avoid.
* **"Approver" — CLEAN NEGATIVE. Not on this page.** On Workflows you *select* an approver because you are
  creating a list row via New. Here the approver is the **record context**: you arrive having already
  searched for and opened that user ("User Administration (Search & Select)" / "With the user loaded in the
  form"). Neither primary names an Approver control anywhere in its full description of the window. A
  confirmed negative, recorded so it never has to be re-derived.
* **"Can approve exception" — KEEP, with a scope fence.** fcfd570c: "(The actual exception levels apply to
  all authorized approvers and are defined on the Authorized Approvers tab in Workflows.)" That settles a
  split: the **per-approver boolean** is set here; the **tenant-wide min/max exception range** is set on
  Workflows (`field.workflows.minimum-exception-level` / `maximum-exception-level`). Corroborated from a
  second file by 8b3be88b: "The range is set in Administration > Invoice > Workflows > Authorized Approver
  tab." Emit as a dependency, not a footnote.
* **"Level" — contested. See C2.** Distinct name or nothing.
* **Left-side hierarchy selector.** Attested twice ("On the left side, the administrator selects the
  appropriate level in the hierarchy."; 8b167b96 step 2). Emitting it is defensible as an explicit procedure
  step — but note plainly that the Workflows sibling describes the same picker (a9522ec8 step 4, d8bf669c
  step 3) and **was not emitted there**. State the asymmetry either way.

**Zero-field seeds, verdict already established, not re-derived:** `procedure-2d20b513.md` yields **zero
fields** (all three of its controls are built on Workflows); it is the **dependency source** here — the
feature gate. `definition-of-amount-for-limit-approval-06806875.md` is pure semantics and yields **zero
fields**; its only control reference is already homed twice on Workflows.

**Value-domain source, cited but never a field source:** `employee-import-e28f2294.md` is the only place the
amount/currency pair's domains are documented — "Numeric"; "Specified in the approval limit currency. If
used, then Approval Limit Currency Code below is required."; "3 characters"; "must be a valid currency in
the list of system (reimbursement) currencies". Employee Import is **not** a page (it defers to the external
*Shared: Employee Import Specification*, absent from this corpus). Never emit an employee-import field.

**Semantics caution.** The built `field.workflows.authorized-approver-approval-limit` **already** records
both the 0 and the null/unlimited semantics and already cites 9d98b489. Capturing them here is not
automatically new. What *is* distinct: this surface states the 0 rule against **two different labels** —
"You can enter 0 in the Manager Approval Limit field" (branch A) and "You can enter 0 in the Amount field"
(branch B), both in fcfd570c. Any approval-limit record emitted here must be justified by the **different
label and different surface**, named against the sibling field id — never by the value semantics alone.

**The precedence rule** is the most valuable sentence on the page for a config writer and must be emitted as
a dependency, verbatim (em dashes intact): "The cost object configuration defines the type—either limit or
level. If you complete both areas in this window—the Approval Limit area and the Level field—Concur Invoice
will use the one that applies to your configuration and ignore the other." It is single-sourced to 8b167b96.

---

## 9. Scope — Invoice configuration reached through the Company admin menu

This is the **first page in this graph not reached under Administration > Invoice**, and that navigational
fact matters enormously to a driver. It does not make it another product's page. It configures Concur
Invoice through the non-PO capability: a PO-based invoice carries its approval authority on the purchase
order, a non-PO invoice has none, so the approver's authorization limit **is** the authority.
`tools-guides/workflow-and-approval-routing-8b4ff6c9.md`: "All workflow options available for non-PO
policies are also available to a PO-based invoice policy. This includes options such as workflow rules and
Authorized Approvers." Menu location is a navigation fact, not a product-scope fact.

Neighbours it must **not** drag in: the Employee Import and the general User Administration user-profile
surface both defer to external *Shared* guides absent from this corpus — a documentary gap, not a
menu-location judgement. The employee-import third of the three-setter sentence is a forward reference, not
a page.

---

## 10. uiVariant — `undifferentiated`, measured

Eight `*-new-experience-*` / `*-legacy-*` / `*-classic-*` files exist corpus-wide and none touches this
surface. `grep -rilF "Authorized Approval Limits" | xargs grep -ilE "new experience|legacy|classic"` returns
**zero**. One hedge to record and **not** act on: `tools-guides/how-single-step-approval-workflow-works-40145f24.md`
says the amounts are established via "the Authorized Approvers link from workflows in the classic interface"
— that describes the **Workflows sibling** surface, not this window, and must not become an unearned "both".

---

## 11. documentedBasis — `moderate`; coverageGuess — `partial`

**`moderate`, not `rich`, and not `sparse`.**

For `rich`: field-level documentation across multiple topics. This page has field-level naming — every
control is named in prose, and named across two independent topics plus supporting ones. But: **zero tables
on either primary** (`grep -c "<table"` and `grep -cP "^\s*\|"` both return 0 on fcfd570c and 8b167b96), so
there is no field/description table anywhere — every field lives in procedure prose. Total documented
surface is roughly 11,000 bytes.

Against `sparse`: the page is far more than named-and-reachable. Both primaries walk the window end to end,
left side and right side, with per-control instructions, a value-semantics note (0 and null), a precedence
rule, and a two-branch conditional-visibility model.

Against `rich`: no value enumerations native to this surface (the currency domain is only documented on the
employee-import record set, a different surface); no Save/Cancel documentation for the window (only branch A
says "clicks Save"); the Level control is **flatly contradicted** by a third file; the unlimited recipe is
undetermined; and branch A rests on a single file. Those are obvious gaps in a small surface.

**`coverageGuess: partial`** — the extraction will capture essentially everything the corpus says, but the
corpus itself leaves two of the roughly seven-to-eight controls unresolved (Level's existence here, whether
the currency must be cleared for unlimited). Calling it `good` would overstate what a driver can act on.

**Expected shape (a shape, not a quota):** eight controls, or seven if the left-side hierarchy selector is
treated as navigation. Branch B: hierarchy level selector, Can approve exception, currency, Amount, Level
[contested]. Branch A: Authorized Approver check box, Manager Approval Limit, Approval Limit Currency.

---

## 12. Files opened (all sourceFile paths are `<guide-dir>/<filename>.md`, no `CONCUR_INVOICE/` prefix)

Primaries: `user-administrator-fcfd570c.md`, `user-administration-8b167b96.md`.
Identity/boundary: `global-group-vs-authorized-approver-hierarchy-8a960238.md`,
`step-4-assign-the-proper-rights-to-users-86389a18.md`,
`filter-authorized-approvers-by-workflow-approval-step-aae69350.md`, `configuration-8b3be88b.md`,
`authorized-approver-list-a9522ec8.md` (boundary only), `procedure-2d20b513.md` (zero fields),
`definition-of-amount-for-limit-approval-06806875.md` (zero fields — cited, not opened for extraction).
Supporting: `step-2-assign-the-level-to-the-approver-d8bf669c.md`, `employee-import-e28f2294.md`,
`step-4-assign-the-proper-rights-to-users-82481079.md`, `edit-authorized-approver-information-8b3c119a.md`,
`remove-authorized-approvers-8b3c5273.md`, `setting-an-unlimited-approval-amount-9d98b489.md`,
`level-based-approvals-and-limit-based-approvals-b335cf33.md`.
Nav corroboration found by my own sweep: `set-a-default-shipping-and-billing-address-f772bed1.md`,
`assigning-the-approver-for-the-purchase-request-user-20294611.md`, `fields-overview-5e3daf7c.md`,
`tools-guides/step-6-select-the-vendor-access-group-for-the-user-bb58ded2.md`,
`tools-guides/step-4-add-the-custom-field-to-the-employee-form-da376eef.md`,
`tools-guides/how-single-step-approval-workflow-works-40145f24.md`,
`tools-guides/workflow-and-approval-routing-8b4ff6c9.md`.
Cost-object chapter checked for further attestation and found to add none:
`configuration-8b3cce3f.md`, `cost-object-approval-8b3d1e0f.md`,
`step-1-define-the-cost-object-approver-hierarchy-6e7b7dc6.md`.
Deliberately **not** opened: `user-administrator-5aa3eb5e.md` (title collision, out of scope).

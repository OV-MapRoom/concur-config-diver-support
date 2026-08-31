# GROUP 3 — PO MATCHING — AUTHORITATIVE BUILD ROSTER

Merged from six blind sweeps (clickpaths, adminfiles, toolsguides, rolesmenus, graphrefs, setupflow),
then re-verified against the corpus directly.

Corpus: `/mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE`, SAP `2026_08`, Professional Edition,
crawled 2026-08-29. Both guide directories weighted equally (admin-guides 1209 files, tools-guides 650).
Release notes cited only to corroborate a page NAME, and labelled as such.
Every `sourceQuote` below was verified with `grep -F -c` returning ≥1 before it was written.

---

## HEADLINE

**Group 3 is TWO pages, not eleven.** Every one of the six sweeps, entering from six different
directions, landed on the same two surfaces — and my own independent census confirms them:

1. **Purchase Order Matching Rules** — `Administration > Invoice > Purchase Order Matching Rules`
2. **Purchase Order Configuration** — `Administration > Invoice > Purchase Order Configuration`

Six-of-six agreement on a page roster is the strongest signal this project has ever produced, and it is
backed by four exhaustive corpus censuses I ran myself (below). The gap to eleven is not a shortfall in
the sweeps; it is the finding.

---

## THE FOUR CENSUSES I RAN MYSELF (not taken from any sweep)

These are the load-bearing negative evidence. Each was run over BOTH guide directories.

**1. Every `Invoice > X` destination.** 39 distinct targets. Exactly two are PO-domain:
`Invoice > Purchase Order Matching Rules` (3 occurrences) and `Invoice > Purchase Order Configuration`
(2). There is no `Invoice > Purchase Requests`, no `Invoice > Receiving`, no `Invoice > PO Matching`,
no `Invoice > Receipt Confirmation`.

**2. Every `(left menu)` click label.** 27 distinct phrasings. Exactly one is PO-domain:
`Click Purchase Order Matching Rules (left menu)`. `Purchase Order Configuration` never appears with
`(left menu)` anywhere in the corpus.

**3. Every `The X page appears` arrival sentence.** 80 distinct page names.
Exactly one is PO-domain: `The Purchase Order Matching Rules page appears`.

**4. Every `The X window appears` arrival sentence.** 68 distinct window names. Ten are PO-domain and
**nine of the ten are end-user dialogs** (Purchase Order window, Purchase Order Receipt Image, Enter
Received Goods, Reopen Purchase Order, Preview Purchase Order, Purchase Order Associations, Invoices
matched to this Purchase Order, Purchase Request window, Purchase Request Images). The tenth is
`The Purchase Order Matching Rule Group rules window appears` — a dialog inside page 1.

**Bonus census — every `X tool` phrase.** 50+ distinct tool names. Exactly one is PO-domain:
`Purchase Order Configuration tool`. **Every `X Admin` phrase**: no `Receiving Admin`, no
`Purchasing Admin` node, no `PO Admin`. Those labels must not be created.

---

# PAGE 1 — PURCHASE ORDER MATCHING RULES

**id** `purchase-order-matching-rules` · **kind** admin-page · **documentedBasis** rich
**foundBySweeps** all six.

**Aliases:** PO Matching Rules · Purchase Order Matching Rules (New Experience) · Match Rules ·
matching rule set · PO Matching Ruleset (the name the Policies page uses to point at this page's output) ·
Purchase Order Matching Set (see contradiction) · Purchase Order Matching Rule Group rules window

## navPath evidence (all verified)

| navPath | quote | file |
|---|---|---|
| Administration → Invoice → Purchase Order Matching Rules | `Click Purchase Order Matching Rules (left menu). The Purchase Order Matching Rules page appears.` | admin-guides/access-purchase-order-matching-rules-8407c500.md |
| Administration → Invoice | `Click Administration > Invoice.` | admin-guides/access-purchase-order-matching-rules-8407c500.md |
| Administration → Invoice → Purchase Order Matching Rules | `Click Administration > Invoice > Purchase Order Matching Rules (left menu).` | admin-guides/configure-three-way-matching-c043e5c8.md |
| Administration → Invoice → Purchase Order Matching Rules | `Admins create these rules by going to Administration > Invoice > Purchase Order Matching Rules.` | admin-guides/purchase-order-matching-rules-8b357dbb.md |
| Administration → Invoice → Purchase Order Matching Rules | `Admins create these rules by going to Administration > Invoice > Purchase Order Matching Rules.` | admin-guides/purchase-order-matching-rules-new-experience-6c8fb80f.md |
| … → (select rule set) → Edit | `On the Purchase Order Matching Rules page, select the rule set, and then click Edit.` | admin-guides/step-2-create-the-life-to-date-matching-rule-set-dc296ae6.md |
| … → (select rule set) → Copy | `In Purchase Order Matching Rules, select an existing rule set under Rule Set Name, and then click Copy.` | admin-guides/step-1-create-the-purchase-order-matching-rule-set-4d3866f3.md |
| … → Edit → Rule Groups list → Edit Rules | `Double-click the rule you want to use, and then, in the Rule Groups list, select a rule group and click Edit Rules.` | admin-guides/configure-three-way-matching-c043e5c8.md |
| … → Edit → Rules tab | `In Purchase Order Matching Set, click the Rules tab.` | admin-guides/step-3-create-the-po-to-request-fields-matching-rules-64eb1c47.md |
| … → Edit Rules → Life to Date tab | `Click the Life to Date tab, then select the check box next to the rule type to activate using the table below:` | admin-guides/step-2-…-dc296ae6.md |
| … → (named rule group) → Add | `Select the matching rule set in Purchase Order Matching Rules and then click Edit.` | admin-guides/step-4-add-condition-based-rule-to-a-named-rules-group-db93fb81.md |
| … → Edit Confirmation | `Do this by clicking Edit Confirmation to open the Select Confirmation Type window` | admin-guides/step-5-change-localize-receipt-confirmation-type-instructional-text-5328a8e1.md |

## Role gates

- `Only the user with the Invoice Configuration Administrator role can access and configure the Purchase Order Matching Rules feature.` — admin-guides/required-roles-ec6fae13.md
- `Only the Invoice Configuration administrator can access and configure the Purchase Order Matching Rules feature.` — tools-guides/required-roles-ef2c2901.md
- `Only accessible by users with the Invoice Configuration Administrator role.` — admin-guides/overview-8b35a33f.md

An exclusive gate stated **twice, once per guide directory**. No other Group 3 candidate has that.

## Page-hood: settled, with the Audit Rules precedent

It is the only PO label in the entire corpus that appears with `(left menu)`, the only PO surface the
corpus calls a *page* in an arrival sentence, and it has its own list grid — `Each rule set appears in a
row that includes the following columns:` with `Rule Set Name`, `In Use`, `Associated Policies`
(access-…-8407c500.md). It is not one of the 18 built pages: `PO Matching Ruleset` on Policies is a
*pointer into* this page's rule sets, not this page.

**One page, not four.** The `access-` / `create-` / `edit-` / `copy-` topic family is one page with four
buttons. `copy-purchase-order-matching-rules-c6d4106a.md` redirects wholesale to Step 1; `edit-` operates
on a selected row of the same list. This is the **Audit Rules** situation (one page, tabs and buttons),
NOT the Forms-and-Fields situation. **Do not split.**

**Three-way matching and Receipt Confirmation are not pages.** Both are configured here.
`Receipt confirmation is part of the PO Matching feature set.` (overview-8b37481c.md).

## The internal click tree — I resolved this, and it changes what the automation must do

The four sweeps that emitted "Purchase Order Matching Set" as a possible page disagreed on kind
(clickpaths said *unclear*; adminfiles, toolsguides, graphrefs and setupflow said *dialog*). I went to
the corpus. **The decisive evidence is inside a single topic**, `edit-purchase-order-matching-rules-604d1e31.md`,
whose two consecutive steps read:

> 1. `In Purchase Order Matching Set, select the rule set row under Rule Set Name.`
> 2. `Click Edit to open Purchase Order Matching Set.`

You are already "in Purchase Order Matching Set" *before* Edit "opens" Purchase Order Matching Set. And
`access-…-8407c500.md` places that identical row-and-column list on *"the Purchase Order Matching Rules
page"*, while `step-1-…-4d3866f3.md` places the identical Copy action *"In Purchase Order Matching Rules"*.

**Verdict: "Purchase Order Matching Set" is an ALIAS SAP uses loosely for this same surface, not a
distinct page.** That is the Audit-Rules/Validation-Rules precedent (alias, not a page), and it means the
Rules and Life to Date tabs belong to this page's editor stack — a dialog tree, not a peer page.
**Recorded, not reconciled:** SAP writes the editor surface four ways in one 2026_08 corpus —
`Purchase Order Matching Set`, `Purchase Order Matching Rules` (the list page's own string, used for the
editor in step-2: `In Purchase Order Matching Rules, type a descriptive name for the new rule in Name.`),
`Purchase Order Matching Rule Group rules window`, and `Purchase Order Matching Rules Group Conditions`.
A Chromium driver will need all four strings.

The click tree as the corpus documents it:

```
Administration > Invoice > Purchase Order Matching Rules          [PAGE]
  list: Rule Set Name | In Use | Associated Policies
  buttons: Copy, Rename, Done, Edit, Add, Delete, Edit Confirmation
  └─ select rule set → Edit  →  "Purchase Order Matching Set"     [dialog / edit mode — alias]
       └─ Rule Groups list → Edit Rules
            → "Purchase Order Matching Rule Group rules window"   [dialog]
                 ├─ Name
                 ├─ Rules tab       (Level, Payment Request, Purchase Order, Tolerance, Add/Delete/Save)
                 ├─ Life to Date tab (6 rule types, Value/Currency/Percentage, Overage Tolerance)
                 └─ Exception Message · Allow Submit/Approve
       └─ named rule group → Add
            → "Purchase Order Matching Rules Group Conditions"    [dialog]
       └─ Rule Set or rule condition → Edit Confirmation
            → "Select Confirmation Type" window                   [dialog]
```

## Structural contradiction to preserve — the middle nav node

Every documented click path puts this page **directly under `Administration > Invoice`**, never under
`Invoice Processing Admin`. That node is named 27 times in the corpus (Policies ×4, Workflows ×5,
Invoice Settings ×2, Group Configurations, Forms and Fields, Routing Configuration, Exceptions, Expense
Types, Change Log, Email Reminders, Peppol Configuration) and **never once for a PO page**. I verified the
one apparent PO hit and it is a false positive — "Receiving Exception Email Notifications" in
`receiving-exception-email-notifications-from-concur-invoice-28039049.md`, which is about Peppol.

Groups 1/2/5 built their pages with `Invoice Processing Admin` as a middle node. **Group 3 must record
the corpus's literal three-segment path and NOT normalise the middle node in.** This may be a doc gap
rather than a UI fact — say so, do not silently fix it.

## UI variant

| file | bytes | verdict |
|---|---:|---|
| `purchase-order-matching-rules-8b357dbb.md` (legacy) | **2,404** | thinner twin |
| `purchase-order-matching-rules-new-experience-6c8fb80f.md` (New Experience) | **4,804** | **BUILD FROM THIS — 2.0×** |

Both carry `deliverable_id: 41460672`, so the id does not discriminate them; the `(New Experience)`
title suffix does. **Same click-path sentence, verbatim, in both** — so this is a content superset, not a
navigation variant. The extra 2.4 KB is Before You Begin material (rule-set test naming, the In-Use
unlock via `Change to Non PO Invoice`, exchange-rate activation) that also exists standalone as
`test-and-change-match-rule-sets-49f57319.md` and `activate-exchange-rates-for-matching-rule-sets-c51af31c.md`.

## Richness (measured, not estimated)

- **39 files, 84,820 bytes**
- **rawTableFiles: 0** — `grep -c "<table"` returns zero on every one of the 39. Unlike Audit Rules and
  Tax Administration, this page's material is *procedural prose and bullets*, not tables. Only three files
  contain a markdown table at all (step-2, step-5, tools required-roles).
- **longCatalogs: 0** — the largest enumeration anywhere in the set is 7 entries. The Life to Date rule
  types are 6; Level is 4; Tolerance is 4; confirmation types are 4. The `Payment Request` and
  `Purchase Order` field lists are *described but never enumerated* — `As different levels are chosen in
  Level, different field sets will populate the selections available in Payment Request and Purchase Order.`
  That is a documented gap the build must record as unenumerated, not guess at.
- **estimatedFields: 40** — comparable to Forms and Fields (40) in the existing graph; well under Audit
  Rules (91). Extraction cost per field is HIGH because the material is prose.

## Seed files (richest first)

```
5,689  admin-guides/configure-three-way-matching-c043e5c8.md
4,921  admin-guides/step-2-create-the-life-to-date-matching-rule-set-dc296ae6.md
4,804  admin-guides/purchase-order-matching-rules-new-experience-6c8fb80f.md
3,897  admin-guides/step-5-change-localize-receipt-confirmation-type-instructional-text-5328a8e1.md
3,721  admin-guides/step-3-create-the-po-to-request-fields-matching-rules-64eb1c47.md
3,476  admin-guides/step-4-add-condition-based-rule-to-a-named-rules-group-db93fb81.md
2,845  admin-guides/test-and-change-match-rule-sets-49f57319.md
2,711  tools-guides/required-roles-ef2c2901.md
2,699  admin-guides/create-purchase-order-matching-rules-adb700f9.md
2,676  admin-guides/refine-the-rules-combine-the-life-to-date-and-rules-rule-types-2b46973f.md
2,634  admin-guides/overview-8b35a33f.md
2,556  admin-guides/confirmation-types-b4a94761.md
2,404  admin-guides/purchase-order-matching-rules-8b357dbb.md
2,328  admin-guides/match-rules-and-rule-sets-87e69410.md
2,287  tools-guides/when-are-match-rules-run-f835a01e.md
2,214  admin-guides/edit-purchase-order-matching-rules-604d1e31.md
2,202  admin-guides/refine-the-rules-include-condition-based-rules-in-a-rule-set-ad7b0d65.md
2,093  admin-guides/access-purchase-order-matching-rules-8407c500.md
1,982  admin-guides/amounts-and-tolerances-ab795b1f.md
1,686  admin-guides/terminology-d3b9f043.md
1,445  admin-guides/step-1-create-the-purchase-order-matching-rule-set-4d3866f3.md
  996  admin-guides/required-roles-ec6fae13.md
```
…plus 17 smaller files (confirmation types, exception message, exchange rates, copy, match-rule-set-per-policy,
audit trail, before-you-begin, invoice/central/individual confirmation types, tools-guides overview and
match-rules-and-match-status).

## MERGE CORRECTION — two bad seeds removed

Sweep *clickpaths* listed `conditions-if-portion-of-the-if-then-statement-85743324.md` (2,390 B) and
`exceptions-then-portion-of-the-if-then-statement-6a3d96b1.md` (1,944 B) as PO Matching Rules key files.
**They are Audit Rules content, not PO.** I read them: *"When creating or editing a custom audit rule, the
administrator defines the conditional expression(s)"*, with worked examples about Staples and seminar fees,
and `grep -ic purchase` returns 1 and 0. They belong to `page.audit-rules` (Group 2, already built).
Removed from the seed list. This is exactly the mis-filing the merge exists to catch.

## Cross-page dependencies to carry (not new pages)

- **Policies (Group 1):** the rule set is *selected* there via `PO Matching Ruleset`. Order of operations:
  create the rule set here → assign it on Policies. A rule set with `In Use = Yes` is locked:
  `once a match rule set is run against a PO associated invoice a status of In Use is assigned and the rule set is locked`
  (test-and-change-match-rule-sets-49f57319.md).
- **Forms and Fields (Group 5):** `Delivery Slip Number` on the Payment Request Header form (three-way matching).
- **Audit Rules (Group 2):** optional `Is Purchase Order line Associated` / `Is Receipt Associated` rules.
- **Localization (Group 6, unbuilt):** the *text* of receipt confirmation types is edited there, not here.
- **Expense Admin (outside this graph):** exchange-rate activation for matching rule sets.

---

# PAGE 2 — PURCHASE ORDER CONFIGURATION

**id** `purchase-order-configuration` · **kind** separate-tool · **documentedBasis** moderate
**foundBySweeps** all six.

**Aliases:** Purchase Order Configuration tool · Purchase Order Configuration window · PO Configuration
(⚠ collides with a section on Policies — see below)

## navPath evidence (all verified)

| navPath | quote | file |
|---|---|---|
| Administration → Invoice → Purchase Order Configuration | `To view this tool, click Administration > Invoice > Purchase Order Configuration.` | admin-guides/use-the-purchase-order-configuration-tool-51009c8c.md |
| Administration → Invoice → Purchase Order Configuration | `the Invoice Configuration administrator uses the Purchase Order Configuration tool (Administration > Invoice > Purchase Order Configuration)` | tools-guides/preview-a-purchase-order-846396e1.md |

Two independent full click paths, **one from each guide directory** — the strongest attestation this
corpus offers. Corroborated by name in a **RELEASE NOTE** (labelled as such, name only, not a field source):
`the company address in the Purchase Order Configuration tool is now optional` —
release-note-summaries/june-2017-invoice-professional-edition-admin-summary-262adc6b.md.

## Role gate

`The Purchase Order Configuration tool is available to the Invoice Configuration administrator for setting default information for purchase orders.` — admin-guides/use-the-purchase-order-configuration-tool-51009c8c.md

## Page-hood

Own click path off `Administration > Invoice`, own role gate, own scoping model, and a settings roster
that appears on **no other surface in the corpus** — PO number sequencing, transmittal email subject and
body, company branding logo, default sender email, PO PDF field selection. None of that is on Policies,
Invoice Settings, Company Locations or Forms and Fields.

**Kind = `separate-tool`, deliberately.** The corpus calls it a *tool* every time and a *page* zero times
(`grep -F "Purchase Order Configuration page"` returns nothing corpus-wide) — the exact inverse of Page 1,
which is always *page* and never *tool*. That is the same lexical habit SAP applies to "Vendor Manager
tool" and "Company Locations tool", both of which the graph already treats as pages. I record the corpus's
own word rather than smoothing it.

**This is the sweep-C save.** It surfaced in *tools-guides first*; its admin-guides anchor is a 1,179-byte
stub, and its 5,956-byte content file `configure-purchase-orders-8128725e.md` **never names a nav path**.
That is the exact shape that nearly lost Vendor Search Admin. An admin-guides-only entry would likely have
under-weighted it.

## Scoping — load-bearing for the automation

`Each PO configuration you create is based on the Group you select before creating the configuration.` and
`Groups with no PO configuration assigned use the Global Group configuration by default.`
(purchase-order-configuration-is-group-aware-b603f04b.md). **A Chromium driver must select a Group as
step 0 before any field on this page can be set.** There is a second scope inside the page:
`Ensure that you have selected the correct policy in the Policy list.` (configure-purchase-orders-8128725e.md),
governing the *Fields to Appear on Purchase Orders* picker.

## Contradiction to preserve — tool vs window

- `The Purchase Order Configuration tool is available to the Invoice Configuration administrator…` (51009c8c)
- `Added information about the Company Name without address field in the Purchase Order Configuration window.`
  (purchase-request-and-purchase-order-8b36ae07.md, the PR&PO guide's own revision history)

A left-menu tool vs a modal window. Unresolved. Record both.

## NAME COLLISION — the Forms-and-Fields trap in a new costume

`PO Configuration` denotes **two structurally distinct surfaces**:

- **(a)** this standalone tool at `Administration > Invoice > Purchase Order Configuration`, called
  `PO Configuration` in tools-guides/preview-a-purchase-order-846396e1.md
  (`Administrators who configure purchase orders in PO Configuration`);
- **(b)** a **section on the Policies page**:
  `In the PO Configuration section of the page that appears, select the Enable Concur Receiving option.`
  reached by `Select Administration > Invoice > Polices (left menu). The Policies page appears.`
  (admin-guides/configure-concur-receiving-1ececc23.md — note SAP's own **"Polices"** misspelling,
  quoted verbatim, inside a live click step).

**Anyone building from a grep on "PO Configuration" will conflate them.** The existing graph's own note on
`field.policies.is-po-policy` ("Selecting it reveals the PO Configuration options") is one letter away from
this conflation. Record both; do not collapse.

## Richness (measured)

- **6 files, 14,837 bytes**
- **rawTableFiles: 0**
- **longCatalogs: 1** — `configure-purchase-orders-8128725e.md` enumerates **12 named settings sections**:
  PO Number Generation (Next Sequence, Postfix, 9-char limit) · Message to Include on Transmitted Purchase
  Orders (3,200 chars) · Default Email Subject When Transmitting Purchase Orders (500 chars, token tooltip) ·
  Default Email Message When Transmitting Purchase Orders · Company Address · Supporting Documents ·
  Company Branding Logo (.png/.jpg/.gif, 55 px high, ≤200 px long, ≤100 KB, one per invoice group) ·
  Default Sender Email (prefix only; suffix fixed to `_DoNotReply@ConcurSolutions.com`) ·
  Fields to Appear on Purchase Orders (+ Policy list) · Ship To Without Requestor Name ·
  Company Name Without Address · Use Email as Bill-To.
- **estimatedFields: 18** — small but *dense*: nearly every byte is a field with a stated limit.
  Bytes-per-field here is roughly 800 against roughly 2,100 on Page 1.

## Seed files (richest first)

```
5,956  admin-guides/configure-purchase-orders-8128725e.md      ← the entire field roster; UNCITED in the graph today
3,430  tools-guides/preview-a-purchase-order-846396e1.md       ← second nav path + role gate, other directory
1,506  tools-guides/purchase-order-processor-experience-8b507c54.md
1,466  admin-guides/purchase-order-configuration-is-group-aware-b603f04b.md
1,300  admin-guides/purchase-order-setup-process-9f253ce7.md   ← group-level setup ordering
1,179  admin-guides/use-the-purchase-order-configuration-tool-51009c8c.md  ← nav + role gate
```

## MERGE CORRECTIONS — two bad seeds removed

Sweep *clickpaths* listed two files under Purchase Order Configuration that do not belong to it. I read both:

- `allowing-automatic-transmittal-of-purchase-orders-0f2e7fae.md` (1,474 B) explicitly places its setting
  elsewhere — *"The setting appears in Administration  Invoice  Workflows  Workflows tab by opening a PR
  workflow and selecting the Allow employee to automatically transmit Purchase Orders option."* → **Workflows**.
- `purchase-order-contact-and-email-address-d5bdbbad.md` (1,146 B) is an **end-user** topic — the PR processor
  seeing a vendor contact in the Request Items section of an opened purchase request. Not configuration.

## Cross-page dependencies to carry

- **Group Configurations (Group 1):** supplies the Group this page is scoped to (graph already carries
  dep.g1.057 / dep.g1.058 pointing here — those two edges resolve cleanly against this roster).
- **Forms and Fields (Group 5) + Company Locations (Group 5):** `Use Email as Bill-To` requires the field
  added on the Purchase Order Header form AND a bill-to email address entered in Company Locations.
- **Policies (Group 1):** the `Policy` list that scopes *Fields to Appear on Purchase Orders*.

---

# DEFERRED — everything else, with the reason

## A. Belongs to Page 1 (tabs and dialogs, not pages)

| Surface | Kind | Why |
|---|---|---|
| **Purchase Order Matching Set** | alias / dialog | Never has its own click path. `edit-…-604d1e31.md` uses the label for the *list* in step 1 and for what Edit *opens* in step 2 — SAP is using it loosely for the same surface. Alias precedent = Validation Rules under Audit Rules. Carry the string; do not create a page. |
| **Purchase Order Matching Rule Group rules window** | dialog | `The Purchase Order Matching Rule Group rules window appears.` Opened by `Edit Rules`. Carries the Rules and Life to Date tabs and every matching field. |
| **Rules tab** / **Life to Date tab** | tab-within-page | Reached only after `Edit Rules`. Audit Rules precedent — do not split. ⚠ "Rules tab" also names a tab on the **Email Reminders** page; a field build must bind by page, not tab label. |
| **Purchase Order Matching Rules Group Conditions** | dialog | Named exactly once, in `step-4-…-db93fb81.md`. Reached three levels deep via `Add` on a named rule group. Called "the Condition Editor" in step-5 — a *different* Condition Editor from the Audit Rules Condition page and from the PR/PO Processor Query Builder. Do not merge the three. |
| **Select Confirmation Type** | dialog | `Do this by clicking Edit Confirmation to open the Select Confirmation Type window`. Four values (None / Invoice / Receipt Central / Receipt Individual). Its instructional **text** is edited on **Localization** (Group 6) — a genuine cross-group dependency. |

## B. Belongs to an already-built page (would be a DUPLICATE)

| Surface | Where its config lives | Evidence |
|---|---|---|
| **Purchase Order Policy** | **Policies** (Group 1) | `Is PO Policy: Select this option to define the policy as PO-related.` (purchase-order-policy-fields-4aa0ac1b.md); `Payment and PO forms are accessed in Administration >Invoice > Policies.` (no space, verbatim). The graph already holds `field.policies.is-po-policy`, `.po-matching-ruleset`, `.po-header-form`, `.po-line-item-form`, `.po-allocation-form`, `.enable-concur-receiving`, `.is-purchase-request-policy`, `.external-id`, `.bill-to-optional`. **RESOLVED EXPLICITLY: this went to Policies, not Group 3.** |
| **PO Configuration (section on Policies)** | **Policies** (Group 1) | `In the PO Configuration section of the page that appears, select the Enable Concur Receiving option.` |
| **Purchase Request Configuration** | **Policies** (Group 1) | `Now the Is Purchase Request Policy check box is exposed and, when selected, displays the Purchase Request Configuration options (forms and workflow selections) as shown in the figure above.` Also encodes a real ordering dependency: `Is PO Policy` must be ticked before `Is Purchase Request Policy` appears. |
| **Concur Receiving** | **Policies** + **Forms and Fields** | Heavily documented feature with **no screen**. Zero corpus hits for "Receiving Admin". Activation is one checkbox on Policies; the Purchase Order Receipt form is then auto-used from Forms and Fields. Reported rather than silently dropped because its documentation volume will tempt a later sweep into minting a page for it. |
| **Multiple Purchase Order feature** | **Forms and Fields** (Group 5) | `The administrator activates the Multiple Purchase Order feature by adding the Purchase Order Number field to the Payment Request Line Item Details form in the Forms and Fields tool.` ⚠ activation contradiction: `enabling-and-disabling-line-item-level-po-ef3f19cd.md` says it is *"activated by SAP Concur staff"*. Two topics, two authorities. |
| **PO Change Order** | **Invoice Settings** (Group 1) | `To activate this feature, admin needs to use the Invoice Settings tool by selecting (enabling) the Enable Change Order check box.` |
| **Line Identification for PO Matching** | **Invoice Settings** (Group 1) | one checkbox: *Allow system to associate Invoice lines to Purchase Order lines based on data attributes*. |
| **Allow PR Owners to Edit / Transmit their own POs**, **Assign invoice to Purchase Request Owner** | **Invoice Settings** (Group 1) | `Click Invoice Settings (left menu). The Invoice Settings page appears.` |
| **Copy Down PO→PR**, **Delivery Slip Number**, **Receipt Type field** | **Forms and Fields** (Group 5) | field-add / field-property procedures |
| **Three-Way / Two-Way Matching, Receipt Confirmation** | **Purchase Order Matching Rules** (Page 1) | matching *methods*, not screens |
| **Default shipping / billing address** | **Company Locations** (Group 5) | already built |

## C. Belongs to another unbuilt group

| Surface | Group | Evidence |
|---|---|---|
| **Purchase Order Settings** | **Workflows** | See the resolution below. |
| **Purchase Request Settings** | **Workflows** | See the resolution below. |
| **Automatic PO transmittal**, **Consolidate items for same vendor**, **PR email notifications**, **Approval Statuses > Purchase Request** | **Workflows** | `The setting appears in Administration  Invoice  Workflows  Workflows tab…` (nbsp-separated; the short prose sentence is the safe quote) |
| **Shipping Configuration** | Group 6 (brief-excluded) | A **real page** with a real click path that this merge independently re-confirmed: `Access this tool by clicking Administration > Invoice > Shipping Configuration, clicking a tab as required.` Dual role gate (Invoice Configuration administrator / (Restricted)), tabbed. It IS a PR setup-flow stop. Passing the nav path forward so Group 6 need not re-derive it. |
| **Localization** | Group 6 | destination of Receipt Confirmation Step 5 |

### RESOLUTION: Purchase Order Settings / Purchase Request Settings — the one real kind-disagreement

The sweeps split three ways: *toolsguides* and *graphrefs* said Invoice Settings; *clickpaths*,
*adminfiles*, *rolesmenus* and *setupflow* said Workflows > Settings tab. **I settled it in the corpus and
it is Workflows.** Three sibling topics share the same opening formula and are the three tables on one tab:

- `The following settings apply globally to invoices.` — invoice-settings-cace748d.md (4,901 B)
- `The following settings apply globally to purchase orders (PO).` — purchase-order-settings-a5a997b4.md (1,417 B)
- `The following settings apply globally to purchase requests (PR).` — purchase-request-settings-b0bce285.md (3,735 B)

`grep -n "settings apply globally"` returns exactly those three lines corpus-wide. And the PO one's single
control is placed by a fourth topic: `A setting in Workflows can be used to prevent PO transmission if the
PO exceeds a specified exception level.` (preventing-po-transmittal-…-51b11602.md), which then writes the
path as `Administration  Invoice  Workflows  Settings tab` (non-breaking spaces, `>` glyphs eaten — quote
the prose sentence, never the path line). The Workflows guide's own revision history corroborates:
`New Settings tab option: Prevent purchase order transmissions setting.` (general-information-8b3b0308.md).

**The clincher, which I verified myself:** the `invoice-settings-cace748d.md` roster does **not** overlap
the built Invoice Settings page roster. `grep -c "select their own approver" available-invoice-settings-8b3411f0.md`
returns **0**, while cace748d leads with it. So `invoice-settings-cace748d.md` is a *different surface with
the same label as a built page* — the Forms-and-Fields failure mode for a third time in this area.
Whoever builds Workflows must not collapse them.

**Action for the graph:** existing forward references `dep.g2.012` (targetRef *Purchase Request Settings*)
and `dep.g2.013` (targetRef *Purchase Order Settings*) should be re-pointed at **Workflows**, not resolved
by creating Group 3 pages. Neither string appears anywhere in the corpus except inside its own title and H1.

## D. End-user / processor screens (the PO area's specific trap)

All reached from **Requests** or **Invoice**, never Administration. Nine of the ten PO-domain
`window appears` sentences in the whole corpus are these.

| Screen | Where its configuration lives |
|---|---|
| **Process Purchase Orders / Process Purchase Requests / PR and PO Processor** (`The Purchase Order Processor role clicks Requests > Purchase Requests > Process Purchase Orders.`) | forms → Forms and Fields; workflow → Workflows; PO defaults/branding/transmittal text → **Purchase Order Configuration**; matching exceptions → **Purchase Order Matching Rules**; roles → User Permissions |
| **All Purchase Orders / All Orders / Purchase Orders Pending Transmission** | visibility → PO Processor / PO Processor (Audit) roles in User Permissions; content → PO Import; fields → Forms and Fields |
| **Purchase Order tab**, **Matching Summary tab** (on an opened invoice) | fields → Forms and Fields; line identification → Invoice Settings; which exceptions fire → **Purchase Order Matching Rules** |
| **Query Builder / Condition Editor (PR & PO Processor)** | none — queries are explicitly per-processor and unshareable. ⚠ a *different* Condition Editor from the PO Matching one; do not merge |
| **Enter Received Goods / Purchase Order Receipt Image / Reopen PO / Preview PO / PO Associations / Invoices matched to this PO** | field access → Forms and Fields; Receiving activation → Policies |
| **Invoice Manager**, **Unassigned Invoice** | Invoice Settings / Policies |
| **Profile > Invoice Preferences** (PO-transmitted notification opt-in, default shipping address) | end-user self-service; admin side → Company Locations |

## E. No screen at all

| Surface | Why |
|---|---|
| **Purchase Order Import / PO Extract / Quantity Receipt Import / PO Import Web Service** | `Purchase orders are imported into Concur Invoice using one of two methods:` — an overnight FTP job, or the Concur Connect web-service API. Immediate run is triggered by an FTP filename (`poinvoiceimportnow_EntityID_Date`), not a button. Record layouts live in a specification (record types 200/210/220/300/400). Corpus-wide the name never co-occurs with `(left menu)`, `Administration >`, or `page appears`. `Import/Extract Administrator` is named 20× and **never** for the PO import. **Action:** resolve `dep.g5g5.029` / `dep.g5g5.030` against an import-specification node type, or leave them unresolved with this verdict attached — do NOT create a page. |
| **Enable Purchase Requests** | `SAP Concur staff enables the Purchase Request feature.` A service request. Nothing to click. But it is a **double gate on this whole group** — the feature must be on, AND the required admin roles may be withheld. If a Chromium driver cannot find either Group 3 menu entry, the first hypothesis is an un-activated tenant, not a broken selector. |
| **Purchasing Admin / Receiving Admin / PO Admin** | Zero evidence. "Purchasing Admin" has one corpus hit, inside a March 2019 revision-history line. My `X Admin` census returns no such node. **A page node here would repeat the exact error the critic already flagged.** |
| **Punchout / catalog / supplier portal / requisition management** | Zero corpus hits for punchout and catalog; one incidental use of "requisition" as a synonym for purchase request. **Must not be invented.** |
| **Purchase Order Matching / Purchase Request and Purchase Order / Receipt Confirmation** (guide covers) | Guide titles. Their bodies are revision history only, no TOC. Do not create page nodes from guide covers. |
| **Supplier Invoice Creation** | **Invented by a previous agent**, referenced at `dep.g4.047.sourceRef`. Zero corpus hits as a surface name — only the phrase "supplier invoice creation" inside the blurb of `error-messages-3b8339b0.md`. A real finding about existing graph quality. |

## F. Real admin pages, but not PO-domain and not Group 3

| Surface | Found by | Why not Group 3 |
|---|---|---|
| **User Permissions** | rolesmenus only | Real page, but its click path leaves the Invoice menu entirely (`Administration > Company > Company Admin`), it is a Shared surface gating every group equally, and no topic files it under Invoice admin. It is where **all** PR/PO roles are assigned (`The User Permissions administrator can assign the following PR-specific roles using the Invoice tab of User Permissions`) — so Group 3 should carry a role-gate edge to it, not own it. Group 7 (Ops). ⚠ three different documented paths to it; recorded, not reconciled. |
| **Feature Hierarchies** | setupflow only | Real left-menu page (`Click Feature Hierarchies (left menu).`), and a genuine PR-workflow prerequisite (`Workflow Hierarchies: PR hierarchies are set up independently, including Authorized Approval and COA.`). But its own documentation is Invoice Routing / COA — generic, not PO. Unclaimed by any named group; belongs with Workflows or Group 7. Group 3 carries a dependency edge only. |
| **Delegate Configurations** | setupflow only | Real left-menu page (`Select Delegate Configurations (left menu)`). Touches PR only because a delegate can submit a purchase request. Zero PO-specific configuration. Group 7. |

I checked all three singletons in the corpus myself rather than taking the sweep on trust. All three are
real pages; none is PO-domain.

---

# OUTSTANDING DEBT THIS MERGE CONFIRMS (owed by OTHER groups, not built here)

1. **Group 1 / Group 5 — the PO policy stub.** `policies-the-purchase-order-policy-8b35454a.md` is
   **1,490 bytes**; its New Experience twin `policies-the-purchase-order-policy-new-experience-5a1ba7ef.md`
   is **15,800 bytes** — a **10.6×** gap, and the richest single file in the whole PO area. It is a merged
   super-topic that swallows six legacy siblings and carries `Is PO Policy`, `PO Matching Ruleset`,
   `External ID`, the PO form roster, `Copy Down Only If Empty`, and the PO Header / PO Line Item /
   PO Distributions copy-down source tables (Custom 1–24 / Custom 1–20). Groups 1–2 were built from the
   stub. **This harvests into `page.policies` and `page.forms-and-fields`, NOT into a Group 3 page.**
2. **Group 5 — copy-down.** `configure-forms-and-fields-for-purchase-order-copy-down-to-pr-f926eac7.md`
   (**10,109 bytes**) is entirely Forms and Fields content and is second-richest in the PO area.
3. **Workflows group.** `purchase-order-settings-a5a997b4.md` + `purchase-request-settings-b0bce285.md` +
   `invoice-settings-cace748d.md` (~10 KB) plus the Workflows-tab PO/PR options and Approval Statuses >
   Purchase Request. **Warning to hand over:** the section on the Workflows Settings tab is itself called
   *Invoice Settings*, colliding head-on with the built `page.invoice-settings`.
4. **Group 3's own new material.** `configure-purchase-orders-8128725e.md` (5,956 B) is **uncited anywhere
   in the graph today** — the entire Purchase Order Configuration field surface.

These are the only two `(New Experience)` twins in the PO area, and the New Experience file is richer in
both cases. Corroboration that the variant is real: the PO Matching guide root's own revision history
records, under September 19 2025, *"Added new topics for the New Experience for Concur Invoice."*
**Gerund/imperative pairs in this area are republications, not UI variants** — all share
`deliverable_id: 41460672`, and in the PO area the *imperative* file is sometimes the richer one
(`activate-…-84e92edd.md` 2,418 B vs `activating-…-aab8aaa8.md` 1,521 B), inverting the usual assumption.

---

# RECONCILIATION AGAINST ELEVEN

The lost map recorded **eleven** PO-matching pages. **I land on two, and I am not padding to eleven.**

Six independent sweeps, entering from six different directions (navigation, admin filenames, tools-guides,
roles/menus, existing-graph forward references, setup flow), produced the same two-page answer. My own four
censuses — every `Invoice > X` target, every `(left menu)` label, every `page appears`, every `window
appears`, plus every `X tool` and every `X Admin` phrase — confirm it independently. There is no third PO
surface reachable by a documented click in this corpus version.

Two honest hypotheses for the difference, offered as hypotheses because the map itself is gone:

**Hypothesis A — the original counted the dialog stack and the borrowed sections as pages.** Enumerate
every named PO-area surface a naive pass would call a page and you get **exactly eleven**:
1 Purchase Order Matching Rules · 2 Purchase Order Matching Set · 3 Purchase Order Matching Rule Group
rules window · 4 Purchase Order Matching Rules Group Conditions · 5 Select Confirmation Type ·
6 Purchase Order Configuration · 7 PO Configuration (Policies section) · 8 Purchase Request Configuration
(Policies section) · 9 Purchase Order Settings · 10 Purchase Request Settings · 11 Purchase Order Policy.
The arithmetic fit is exact. Nine of those eleven fail page-hood for reasons quoted above: five are dialogs
or tabs with no independent click path, two are conditional sections on the already-built Policies page, and
two are settings tables whose one shared control the corpus places on Workflows.

**Hypothesis B — the original counted setup-flow STOPS, not PO-unique pages.** The PR&PO Setup Guide's
configuration section (`configuration-of-purchase-requests-8b369a1e.md`: *"each step uses tools familiar to
any administrator of Concur Invoice (forms and fields, workflow, role assignment, etc.), with some
PR-specific tools as noted"*) walks roughly eleven stops: feature enablement → User Permissions → Forms and
Fields → the PR vendor form → Workflows + Feature Hierarchies → Policies → Group Configurations → Company
Locations → Shipping Configuration → Units Of Measure → **Purchase Order Configuration** → Exceptions.
Only one of those is a page the graph does not already have.

Both hypotheses point the same way: **the lost map's eleven counted surfaces, not pages.** Two is the
answer this corpus supports, and the delta is a finding about how the original was assembled — probably
before the "Forms and Fields is two pages / Audit Rules is one page" page-hood discipline existed.

**The number that actually matters for planning is not 2, it is 58** — roughly 40 fields on Page 1 plus
18 on Page 2. That is about the size of one large existing page (Audit Rules alone yielded 91), which is
why the split proposal below says what it says.

---

# SPLIT PROPOSAL

**Do not split Group 3.** Run it as a single 3A.

- **Page count: 2.** At three lenses per page that is roughly **6–8 agents**, not 73. Splitting two pages
  into two halves would cost more orchestration overhead than it saves.
- **Estimated extraction cost: ~100 KB across 45 files, ~58 fields.** For comparison, Audit Rules alone
  produced 91 fields. Group 3 is smaller than several *single pages* already in the graph.
- **Source overlap is near zero** between the two pages — they share no file — so a split would not even
  hit the "two runs read the same long catalog twice" hazard the split rule exists to prevent. There is
  simply nothing to balance.
- **Order within the single run:** Page 1 first (it is 5.7× the bytes, carries the group's whole
  contradiction load, and its output — the rule set — is what the Policies dependency edge consumes), then
  Page 2 (small, dense, one file does most of the work).
- **Budget the effort unevenly, not the pages.** Page 1's material is prose with **zero tables and zero
  10+-entry catalogs**, so it is slow per field despite its size; Page 2 is one 12-entry catalog and will
  come out fast. If a tier decision is needed: high-effort model on Page 1, cheap tier on Page 2.

**One thing to attach to the run rather than split out:** the Group 1 / Group 5 debt (the 15,800-byte PO
policy New Experience file and the 10,109-byte copy-down file). It is PO-domain material that Group 3's
agents will have loaded anyway, but it writes onto `page.policies` and `page.forms-and-fields`. Either run
it as a patch pass appended to Group 3 while the context is hot, or hand it back — but do not let it be
mistaken for Group 3 pages, which is precisely how the roster inflates to eleven again.

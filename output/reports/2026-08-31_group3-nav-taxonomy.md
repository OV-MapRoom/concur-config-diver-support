# Group 3 — Map / Page Identity and Navigation Survey

Corpus: `/mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE`, SAP version 2026_08, Professional Edition, crawled 2026-08-29.
Scope: the two Group 3 pages only — **Purchase Order Matching Rules** and **Purchase Order Configuration**.
Every quote below was verified with `grep -F -c` against its cited file before being written down (34/34 passed, 0 failures).

---

## 1. Purchase Order Matching Rules

**Verdict: it is a real admin page. Confirmed, not assumed.**
Two independent pieces of evidence establish page-hood rather than mere feature-hood:
`access-purchase-order-matching-rules-8407c500.md` says the click produces a page —
"Click Purchase Order Matching Rules (left menu). The Purchase Order Matching Rules page appears." —
and `step-2-create-the-life-to-date-matching-rule-set-dc296ae6.md` independently refers to
"On the Purchase Order Matching Rules page, select the rule set, and then click Edit."
Two different guide topics, both using the word *page*, both anchored to the same label.

### 1.1 Documented click paths (five distinct, six quotes)

| # | navPath | File | Quote |
|---|---|---|---|
| 1 | Administration › Invoice › Purchase Order Matching Rules | admin `access-purchase-order-matching-rules-8407c500.md` | `Click Purchase Order Matching Rules (left menu). The Purchase Order Matching Rules page appears.` |
| 2 | Administration › Invoice (first two segments only) | admin `access-purchase-order-matching-rules-8407c500.md` | `1.  Click Administration > Invoice.` |
| 3 | Administration › Invoice › Purchase Order Matching Rules | admin `configure-three-way-matching-c043e5c8.md` | `Click Administration > Invoice > Purchase Order Matching Rules (left menu).` |
| 4 | Administration › Invoice › Purchase Order Matching Rules | admin `purchase-order-matching-rules-8b357dbb.md` (legacy twin) | `Admins create these rules by going to Administration > Invoice > Purchase Order Matching Rules.` |
| 5 | Administration › Invoice › Purchase Order Matching Rules | admin `purchase-order-matching-rules-new-experience-6c8fb80f.md` (New Experience twin) | same sentence, different file — an independent attestation, not a duplicate |
| 6 | Administration › Invoice › Purchase Order Matching Rules | admin `overview-8b37481c.md` | NBSP-separated variant (see 1.2) |

The **canonical access topic (`8407c500`) is the only two-step form**: step 1 `Click Administration > Invoice.`, step 2
`Click Purchase Order Matching Rules (left menu).` Everything else is the collapsed one-line form.

### 1.2 TEXT TRAP — `overview-8b37481c.md` uses NON-BREAKING SPACES as the menu separator

That file writes the path with **no `>` characters at all** and U+00A0 between segments:
`it is configured by going to \xa0\xa0Administration\xa0\xa0Invoice\xa0\xa0Purchase Order Matching Rules.`
Rendered, that looks like `Administration  Invoice  Purchase Order Matching Rules`. Any grep or extractor
keyed on `Administration > Invoice` **misses this file entirely** — it is a third nav attestation invisible to the
obvious search. **Emission decision:** the NBSP-bearing string *does* pass `grep -F` (verified), but a single U+00A0 normalised
anywhere in JSON transport would fail the deterministic validator and take the build down with it. So the emitted
sourceQuote for this attestation is the ASCII-only lead-in
`Receipt confirmation is part of the PO Matching feature set. As such, it is configured by going to`
and the NBSP variant is recorded here in prose instead. The attestation is preserved; the build risk is not taken.

### 1.3 The "Invoice Processing Admin" middle node is UNATTESTED for this page

Corpus-wide, `Invoice Processing Admin` is documented as the middle nav node for Email Reminders, Exceptions,
Group Configurations, Workflows, Expense Types, Policies, Invoice Settings, Change Log, Forms and Fields,
Routing Configuration, Company Locations, and Peppol Configuration. **It is never written in front of
Purchase Order Matching Rules.** All five documented paths go straight Administration › Invoice › Purchase Order
Matching Rules. Treat the middle segment as **UNATTESTED, not absent** — a driver should be prepared to try both.

Note also that this page is the **only PO label in the corpus ever written with "(left menu)"** — it appears in
`8407c500` and in `configure-three-way-matching-c043e5c8.md`, and nowhere else on any PO surface.

### 1.4 Aliases (what the corpus actually calls it)

| Alias | Attested? | Where / caveat |
|---|---|---|
| Purchase Order Matching Rules | canonical | page name, menu label, topic titles |
| Purchase Order Matching Set | **yes, as an alias for the same surface** | `edit-purchase-order-matching-rules-604d1e31.md`: `In Purchase Order Matching Set, select the rule set row under Rule Set Name.` and `step-3-...-64eb1c47.md`: `In Purchase Order Matching Set, click the Rules tab.` |
| Purchase Order Matching Rules (New Experience) | yes | title of `6c8fb80f` |
| PO matching rules / matching rule set | yes, lowercase prose only | never used as a menu label |
| Match Rules | yes, as a **concept** in tools-guides | `match-rules-and-match-status-8cc2c56b.md`, `when-are-match-rules-run-f835a01e.md` — never a click target |
| PO Matching Rules (title case) | **NOT attested as a page label** | see the trap below |

**TRAP — "PO Matching Ruleset" is a FIELD ON THE ALREADY-BUILT POLICIES PAGE, NOT AN ALIAS FOR THIS PAGE.**
`access-purchase-order-matching-rules-8407c500.md`: "You select a rule set using the PO Matching Ruleset option in
Policies." It also appears in `components-of-the-policy-3bf075f8.md`, `create-a-new-policy-dd9549c0.md`,
`purchase-order-policy-fields-4aa0ac1b.md`, and `policies-the-purchase-order-policy-new-experience-5a1ba7ef.md`.
Do not re-home it. The near-miss is real: the string that most looks like a short alias for this page is in fact
a control on someone else's page.

### 1.5 Recon findings — CONFIRMED against the corpus

**(a) "Purchase Order Matching Set" is an alias, not a second page — CONFIRMED, and the corpus is internally sloppy
about it.** `edit-purchase-order-matching-rules-604d1e31.md` puts the admin *inside* the surface at step 1
(`In Purchase Order Matching Set, select the rule set row under Rule Set Name.`) and then at step 2 says
`Click Edit to open Purchase Order Matching Set.` You cannot be in a thing and then open it. The only reading that
survives is that "Purchase Order Matching Set" is a loose second name for the same rule-set surface, applied both to
the list and to the editor that opens over it. No click path anywhere reaches a "Purchase Order Matching Set" page.

**(b) "Purchase Order Policy" is not a page — CONFIRMED.** `grep` over both guide directories for
"Purchase Order Policy" intersected with click/nav language (`click`, `left menu`, `Administration`, `page appears`)
returns **zero lines**. It is a policy *type* on the already-built Policies page.

**(c) The Rules / Life to Date tabs and the Group Conditions, Select Confirmation Type and Exception Message dialogs
belong to this page — CONFIRMED.** None has its own path from Administration. Each is reached only from inside the
rule-set editor: `In Purchase Order Matching Rules Group Conditions, configure the conditions` (step-4),
`Do this by clicking Edit Confirmation to open the Select Confirmation Type window` (step-5), and the Exception
Message editor `Exception Message: Click Change and add a message by clicking New, or edit an existing message by
selecting it and clicking Edit, then click Save.` (configure-three-way-matching, twice). The Audit Rules precedent
holds: one page, several tabs.

**(d) A FIFTH dialog exists — the Exception Message editor.** The recon click tree omitted it. It is attested twice
in `configure-three-way-matching-c043e5c8.md` and once in `step-2-...-dc296ae6.md`. A driver cannot set an exception
message without it. Recorded here so the field/dependency pass does not lose it.

### 1.6 CONTRADICTION — tab depth. Recorded, NOT reconciled.

Two irreconcilable readings of where the Rules and Life to Date tabs sit:

* **One level up, no Edit Rules step** — `step-3-create-the-po-to-request-fields-matching-rules-64eb1c47.md`:
  `In Purchase Order Matching Set, click the Rules tab.` The admin is on the rule-set surface and clicks the tab directly.
* **Two levels down, after Edit Rules** — `step-2-create-the-life-to-date-matching-rule-set-dc296ae6.md`:
  `On the Purchase Order Matching Rules page, select the rule set, and then click Edit.` →
  `Select Default, then click Edit Rules (this named rules group is the basis for your new rules group).` →
  `Click the Life to Date tab, then select the check box next to the rule type to activate`.
  And `configure-three-way-matching-c043e5c8.md`:
  `in the Rule Groups list, select a rule group and click Edit Rules. The Purchase Order Matching Rule Group rules window appears.` →
  `Click the Life to Date tab, and then select the Match against Received Quantity option.`

**Majority tree (2 topics to 1): Purchase Order Matching Rules → select rule set → Edit → select rule group →
Edit Rules → [Rules | Life to Date] tabs.** The step-3 shallow reading is the minority and is recorded as a
disagreement, not deleted. This matters for automation: the driver must probe for the tabs at both depths.

Related contradiction, already flagged by recon and confirmed here — **the Tolerance value list has two documented
readings**: `step-3-...-64eb1c47.md` line 45 `Choose one tolerance:` enumerates FOUR (None, Within (+/-), Custom,
Currency); `configure-three-way-matching-c043e5c8.md` line 46 `in the Tolerance section, select None, Within, or
Custom, and then select Value or Percentage.` enumerates THREE. Both must be emitted by the field pass. Not my
node to build, but it is a page-level contradiction and belongs in this survey.

### 1.7 UI variant — "both", and I read both twins

`purchase-order-matching-rules-8b357dbb.md` (legacy title) and `purchase-order-matching-rules-new-experience-6c8fb80f.md`
were diffed line by line. The bodies are **byte-identical** except for the title/heading and one appended block.
The New Experience file contributes exactly one unique substantive procedure — `"Unlock" a Matching Rule Set From Its
In-Use Status` — plus restatements of Test and Change Match Rule Sets and Activate Exchange Rates that already exist
as their own topics (`test-and-change-match-rule-sets-49f57319.md`, `activate-exchange-rates-for-matching-rule-sets-c51af31c.md`).
So: **uiVariant = both**, and the config surface does **not** differ between variants in anything the corpus documents.
Do not double-count a control because it appears in both twins.

### 1.8 Role gate

Three attestations, one role, spelled two ways:
* admin `required-roles-ec6fae13.md` — `Only the user with the Invoice Configuration Administrator role can access and configure the Purchase Order Matching Rules feature.`
* tools `required-roles-ef2c2901.md` — `Only the Invoice Configuration administrator can access and configure the Purchase Order Matching Rules feature.`
* admin `overview-8b35a33f.md` — `Only accessible by users with the Invoice Configuration Administrator role.`

The only variance is capitalisation (`Administrator` vs `administrator`). Same role. This is the cleanest role gate
in the Group 3 set — attested in **both** guide directories, which is exactly the cross-directory check that nearly
lost Vendor Search Admin.

### 1.9 CORPUS DEFECT — `create-purchase-order-matching-rules-adb700f9.md` is TRUNCATED

Its body ends with a bare line containing only `x`. It is the only file corpus-wide that does. Content was dropped in
the 2026-08-29 crawl. Anything taken from it must carry that caveat. It still yields the two rule TYPES (Life to Date,
Rules) intact before the cut, so it is usable — but it is not complete and must never be treated as an exhaustive list.

### 1.10 documentedBasis = **rich**

Justification: field-level documentation across multiple independent topics — a 6-row Life to Date selection table
(Gross Amount, Net Amount, Line Item Total, Line Item Quantity, Match against Received Quantity, Line Item Tax) in
step-2; a Level value list (Header, Vendor, Line Item, Line Item - Receipt) in step-3; two tolerance lists;
a 3-row confirmation-type table with default message text in step-5; Value/Percentage/Currency refinements;
Exception Message and Allow Submit/Approve controls; and a 6-value Match Status catalog in tools-guides
(`understand-the-match-status-assigned-to-an-invoice-52477c6b.md`). Forty-five files, ~64 KB of body text, and the
documentation names controls, not just concepts. `coverageGuess = good` — the one real hole is the truncated
`adb700f9`, and the material it would have carried is largely recoverable from the step topics.

---

## 2. Purchase Order Configuration

**Verdict: it is a real admin page. Confirmed — but on much thinner and structurally different evidence.**
Page-hood rests on two nav quotes that both name the label as a click target off Administration › Invoice. The corpus
calls it a **tool** and a **window**, never a "page" — unlike PO Matching Rules, no topic anywhere says
"the Purchase Order Configuration page appears".

### 2.1 Documented click paths (two distinct, from BOTH guide directories)

| # | navPath | File | Quote |
|---|---|---|---|
| 1 | Administration › Invoice › Purchase Order Configuration | admin `use-the-purchase-order-configuration-tool-51009c8c.md` | `To view this tool, click Administration > Invoice > Purchase Order Configuration.` |
| 2 | Administration › Invoice › Purchase Order Configuration | tools `preview-a-purchase-order-846396e1.md` | `the Invoice Configuration administrator uses the Purchase Order Configuration tool (Administration > Invoice > Purchase Order Configuration).` |

Cross-directory corroboration of the click path is real and matters: path #2 lives in **tools-guides**, and an
admin-guides-only sweep would have found a single unattested-elsewhere nav line. Same near-miss shape as Vendor
Search Admin.

`Invoice Processing Admin` is again **UNATTESTED** as a middle node for this page — zero occurrences in front of
this label anywhere in the corpus, while the node is well documented for a dozen sibling pages on the same menu.
Same instruction to the driver: try both.

### 2.2 Aliases

| Alias | Attested? | Where |
|---|---|---|
| Purchase Order Configuration | canonical | menu label in both nav quotes |
| Purchase Order Configuration tool | yes | `use-the-purchase-order-configuration-tool-51009c8c.md`, `preview-a-purchase-order-846396e1.md` |
| Purchase Order Configuration window | yes, but only in a **release-history table** | `purchase-request-and-purchase-order-8b36ae07.md` line 209 — a revision-history row, weak; not cited as a source |
| PO Configuration | yes | tools `preview-a-purchase-order-846396e1.md`: `Administrators who configure purchase orders in PO Configuration` |
| PO configuration (lowercase) | yes | `purchase-order-configuration-is-group-aware-b603f04b.md`, tools `manage-images-03021850.md` |

### 2.3 THE LOAD-BEARING WARNING — the field roster file NAMES NEITHER THE PAGE NOR A PATH

`grep -c "Purchase Order Configuration" configure-purchase-orders-8128725e.md` returns **ZERO**. Verified. The only
near-hit is line 89, lowercase and incidental: "The logo is group-aware in the same way as the purchase order
configuration...". That file carries **all twelve settings sections** and is essentially the whole page, and it binds
to this page by **GUIDE-SECTION ADJACENCY ALONE**.

Independent attestation by name exists for only **four of the twelve**:

| Section | Binding |
|---|---|
| Company Name Without Address | **independently attested by name** — `purchase-request-and-purchase-order-8b36ae07.md` line 209 names the field in the Purchase Order Configuration window |
| Company Branding Logo | **independently attested** — line 89 of the roster file itself ties the logo to "the purchase order configuration" and its group-awareness |
| Company Address | **independently attested** — `preview-a-purchase-order-846396e1.md`: "To change default text (Body text, address, Instructions, etc.) the Invoice Configuration administrator uses the Purchase Order Configuration tool" |
| Supporting Documents | **independently attested, cross-directory** — tools `manage-images-03021850.md`: `The PO configuration associated with a Group may also include supporting documents.` and `Administrators who configure purchase orders in PO Configuration` |
| PO Number Generation | ADJACENCY-ONLY |
| Message to Include on Transmitted Purchase Orders | ADJACENCY-ONLY |
| Default Email Subject When Transmitting Purchase Orders | ADJACENCY-ONLY |
| Default Email Message When Transmitting Purchase Orders | ADJACENCY-ONLY |
| Default Sender Email | ADJACENCY-ONLY |
| Fields to Appear on Purchase Orders | ADJACENCY-ONLY |
| Ship To Without Requestor Name | ADJACENCY-ONLY |
| Use Email as Bill-To | ADJACENCY-ONLY |

Every field node built for this page must state which of the two it is in its notes. **Adjacency is not attestation.**
The deterministic validator checks quotes against files; it cannot see a control bound to the wrong page.

### 2.4 Unenumerated list and SAP typo

"Fields to Appear on Purchase Orders" is an **unenumerated** field-selection list:
`The header and line time fields you select will appear on the purchase order.` — the selectable header and line-item
roster is never enumerated anywhere in the corpus. Mark it unenumerated; do not guess the members.
**SAP typo:** "line time fields" is written for "line item fields". Text trap for any extractor keyed on "line item".

### 2.5 No long catalog on this page

Measured on `configure-purchase-orders-8128725e.md`: `grep -c "^| "` = 0, `grep -c "^-   "` = 0, `grep -c "<table"` = 0.
The twelve "sections" are **prose section headings**, not an enumeration. What makes the page tractable is that each
of the twelve carries a stated limit or constraint (9-character PO number, 3200-character message, 500-character
email subject, .png/.jpg/.gif at 55px × ≤200px × ≤100KB logo, `PurchaseOrder_DoNotReply@ConcurSolutions.com`
suffix that cannot be changed).

### 2.6 Group scope

`purchase-order-configuration-is-group-aware-b603f04b.md`: `Each PO configuration you create is based on the Group you
select before creating the configuration.` and `Groups with no PO configuration assigned use the Global Group
configuration by default.` Corroborated cross-directory by `manage-images-03021850.md`, which is also the **only**
statement anywhere of how admin-uploaded and user-uploaded PO attachments interact. Group selection is therefore a
**precondition** on this page, not a field — it gates what the other twelve write to.

### 2.7 UI variant — undifferentiated. Do NOT claim "new" or "both".

The corpus contains exactly five `*-new-experience-*` files: `end-user-experience-new-experience-85c2652b.md`,
`policies-the-purchase-order-policy-new-experience-5a1ba7ef.md`, `purchase-order-matching-rules-new-experience-6c8fb80f.md`,
`using-the-invoice-manager-page-new-experience-f83ba5fa.md`, `using-the-unassigned-invoice-page-new-experience-072e2f18.md`.
**None is PO Configuration.** No variant labelling exists for this page in either direction, so `undifferentiated`.

### 2.8 Two seeds correctly excluded — confirmed, and must not be re-added

* `purchase-order-processor-experience-8b507c54.md` is an **end-user processor** topic. It mentions "Purchase Order
  Configuration is Group-Aware" only as a pointer and refers the reader elsewhere for the tool. Not a field source.
* `purchase-order-setup-process-9f253ce7.md` never names this tool; it is a setup-flow stop list (it lists
  "Match Rules" as an ordering step). Evidence about ordering, not about fields.

### 2.9 Role gate

* admin `use-the-purchase-order-configuration-tool-51009c8c.md` — `The Purchase Order Configuration tool is available to the Invoice Configuration administrator for setting default information for purchase orders.`
* tools `preview-a-purchase-order-846396e1.md` — `the Invoice Configuration administrator uses the Purchase Order Configuration tool`

Same role as PO Matching Rules: **Invoice Configuration administrator**. Attested in both directories.

### 2.10 documentedBasis = **moderate**

Justification: real field-level documentation exists — twelve named settings, each with a stated limit or constraint,
plus group scope and role gate corroborated cross-directory. But the gaps are obvious and structural: eight of the
twelve bind to the page by adjacency only; the largest control ("Fields to Appear on Purchase Orders") is an
unenumerated list; the corpus never once calls it a page; and there is no catalog, no table, and no value enumeration
anywhere on the surface. That is textbook "some field-level documentation, gaps obvious" — not `rich`, and clearly not
`sparse`, because seven files and ~10 KB of body text do describe named controls with real constraints.
`coverageGuess = partial`, driven by the unenumerated field list and the adjacency-only binding.

---

## 3. Boundaries against pages already in the graph

| Surface | Where it belongs | Why |
|---|---|---|
| `PO Matching Ruleset` field | **Policies** (Group 1, already built) | `access-purchase-order-matching-rules-8407c500.md`: "You select a rule set using the PO Matching Ruleset option in Policies." Do not re-home. |
| `Require PO Matching?` field | **Policies** (already built) | `components-of-the-policy-3bf075f8.md` |
| Purchase Order Policy | **Policies** (a policy TYPE) | zero click paths corpus-wide; recon claim (b) confirmed |
| `Delivery Slip Number` field add | **Forms and Fields** (Group 5, already built) | `configure-three-way-matching-c043e5c8.md`: "Click Administration > Invoice > Forms and Fields (left menu)." |
| `Is Purchase Order line Associated`, `Is Receipt Associated` | **Audit Rules** (Group 2, already built) | same file: "using the ... fields in the Audit Rules tool" |
| Receipt confirmation instructional text | **Localization** (NOT YET BUILT) | `step-5-...-5328a8e1.md`: "Click Localization (left menu)." A dependency here will legitimately stay unresolved. |
| `Use Email as Bill-To` prerequisites | **Forms and Fields** + **Company Locations** (both already built) | `configure-purchase-orders-8128725e.md` line 121 requires the field on the Purchase Order Header form and a bill-to email in the Company Locations tool |
| `Allow Purchase Request Owners to Edit their own Purchase Orders` | **Invoice Settings** (Group 1, already built) | tools `required-roles-ef2c2901.md` role table |
| Exchange rates for matching rule sets | **Expense Admin module** — OUT OF SCOPE for this graph | `6c8fb80f`: "this feature is accessed using the Expense Admin module" |

The Group 3 pages are net **two new page nodes** and nothing else. The nine other PO-area surfaces the retired
"11 PO matching pages" figure counted are dialogs, tabs, Policies sections, or Workflows settings tables — no page
node for any of them.

## 4. Text traps encountered in this pass (in addition to the known ones)

1. **NBSP menu separators** in `overview-8b37481c.md` — a whole nav attestation invisible to `Administration > Invoice`.
2. **`PO Matching Ruleset` looks like an alias and is a foreign field.** Highest-risk confusion on this page.
3. **`Purchase Order Matching Set` is both the list and the editor** — `edit-...-604d1e31.md` says you are in it and
   then that Edit opens it. Self-contradictory in one topic; alias, not two pages.
4. **SAP typo "line time fields"** for "line item fields" in `configure-purchase-orders-8128725e.md`.
5. **The field-roster file never names its own page** — `configure-purchase-orders-8128725e.md` returns 0 for
   `Purchase Order Configuration`.
6. **`Administration >Invoice` (no space)** does occur in this corpus but **not** on either Group 3 page — the five
   occurrences are on Forms and Fields and Policies. Worth knowing so a driver's matcher is trap-aware, but neither
   Group 3 nav path uses it.
7. **`create-purchase-order-matching-rules-adb700f9.md` is truncated** — body ends with a bare `x`.
# Group 3 MAP — Exhaustive File Inventory & Table Census
**Pages:** `purchase-order-matching-rules`, `purchase-order-configuration`
**Corpus:** `/mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE` — SAP 2026_08, Professional Edition, crawled 2026-08-29
**Guide dirs (both swept with equal weight):** `concur-invoice-professional-edition-admin-guides` (1209 files, verified) · `concur-invoice-professional-edition-tools-guides` (650 files, verified)
**Date:** 2026-08-31

---

## 0. HEADLINE FINDINGS (read before extracting)

1. **RAW `<table>` CENSUS IS A CLEAN NEGATIVE FOR BOTH PAGES.** Corpus-wide there are exactly **31** raw-HTML-table files in admin-guides and **1** in tools-guides (32 total, enumerated in §4). **Not one of them is a field/value source for either Group 3 page.** The two PO-adjacent ones are illustrative, not catalogs: `configure-forms-and-fields-for-purchase-order-copy-down-to-pr-f926eac7.md` (5 `<table>`, **5 `<tr>` total**, a pencils example — Forms and Fields territory, Group 5, already built) and `policies-the-purchase-order-policy-new-experience-5a1ba7ef.md` (5 `<table>`, **5 `<tr>` total** — Policies, Group 1, already built). Measured, not eyeballed. This closes the raw-table risk for this run.
2. **NEW CONTRADICTION — the "Unlock" procedure exists TWICE with TWO DIFFERENT CONTROL LABELS.** The brief's claim (5) — that `purchase-order-matching-rules-new-experience-6c8fb80f.md` contributes one unique procedure ("Unlock a Matching Rule Set From Its In-Use Status") — is **contradicted by the corpus**. That section also exists in full in `test-and-change-match-rule-sets-49f57319.md`, and the two disagree on the control name:
   - `purchase-order-matching-rules-new-experience-6c8fb80f.md:71` → `Change to Non PO Invoice option in the Actions menu`
   - `test-and-change-match-rule-sets-49f57319.md:40` → `Change to Non-PO option in the Actions menu`
   A **third, independent attestation** breaks the tie 2:1 toward `Change to Non-PO`: `concur-invoice-professional-edition-tools-guides/change-a-po-based-invoice-policy-to-a-non-po-based-invoice-policy-12786d77.md:29` → `In the Actions menu, click Change to Non-PO.` **Emit both labels as a contradiction; do NOT silently pick one.** That tools file was found by neither the prior recon nor its critic — it is added to mustRead.
   **Net effect: the New Experience twin contributes ZERO unique substantive procedures.** The instruction not to double-count the twins holds even harder than the brief states.
3. **NEW CROSS-DIRECTORY TWIN CONTRADICTION — Quantity Receipt ingestion routes.** Distinct `loio`s (so a genuine twin pair, not a gerund/imperative republish):
   - admin `quantity-receipt-import-for-three-way-matching-1fc33cab.md` (loio `1fc33cab…`): "through an FTP import, **through the API, or by entering receipt data using Concur Receiving**" — **THREE** routes.
   - tools `quantity-receipt-import-for-three-way-matching-8b4fe385.md` (loio `8b4fe385…`): "through an FTP import **or through the API**" — **TWO** routes, plus a unique SAE-extract claim the admin twin lacks.
   Both are mustRead. Record as a contradiction.
4. **NEW: THREE SPELLINGS OF THE SAME `Level` VALUE — A GROUNDING LANDMINE.** `grep -F` will fail on the wrong dash:
   - `Line Item – Receipt` (EN DASH U+2013) — `configure-three-way-matching-c043e5c8.md` ×2, `exceptions-and-three-way-matching-rules-65d52687.md` ×1
   - `Line Item - Receipt` (ASCII HYPHEN) — `step-3-create-the-po-to-request-fields-matching-rules-64eb1c47.md` ×1
   - `Line Item-Receipt` (no spaces) — `exceptions-and-three-way-matching-rules-65d52687.md`, final line
   Same class: `Matched against Received Quantity` (`configure-three-way-matching-c043e5c8.md:27`) vs `Match against Received Quantity` (same file `:60`, and `step-2…dc296ae6.md:82`). **One file uses both.** Copy quotes byte-for-byte from the file; never retype.
5. **NEW: `PO Configuration` IS AN ALIAS COLLISION AND A PAGE-BINDING TRAP.** `configure-concur-receiving-1ececc23.md:33` says "In the **PO Configuration section** of the page that appears, select the Enable Concur Receiving option" — but line 29 of that same file establishes the page is **Policies** (`Select Administration > Invoice > Polices (left menu). The Policies page appears.` — note SAP's "Polices" misspelling). **`Enable Concur Receiving` belongs to Policies (Group 1, already built). It must NOT be homed on Purchase Order Configuration.**
6. **`purchase-order-settings-a5a997b4.md` is Workflows-owned, not PO Configuration.** Its single setting `Prevent purchase order transmission when exception level exceeds X` is placed by `preventing-po-transmittal-when-po-exceeds-specified-exception-level-51b11602.md` on `Administration  Invoice  Workflows  Settings tab`. This is one of the "two settings tables the corpus places on Workflows" the roster already retired. Do not create a page node; do not home it here.
7. **PAGE-BINDING WARNING FOR PO CONFIGURATION RE-VERIFIED BY MEASUREMENT.** `grep -c "Purchase Order Configuration" configure-purchase-orders-8128725e.md` = **0**; `grep -ci "configuration"` = **3**. The file that carries all 12 settings sections names neither the page nor a nav path. Independent by-name corroboration exists for **four** sections only (see §3.3).
8. **TRUNCATION DEFECT CONFIRMED.** `create-purchase-order-matching-rules-adb700f9.md` body ends with a bare line containing only `x`. Verified by reading the file end. Treat as incomplete; say so in notes on anything taken from it.
9. **Guide-cover files are revision-history ONLY.** Five PO files have huge pipe-line counts that are *not* catalogs: `purchase-order-matching-8b351a47.md` (106), `purchase-request-and-purchase-order-8b36ae07.md` (130), `purchase-order-matching-8b4f2662.md` (115, tools), `purchase-order-8b43cd30.md` (64), `receipt-confirmation-8b370deb.md` (58). All are `Revision History` tables of dates and change notes. **Zero configuration fields.** Use only for dating/corroboration; never as a field source.
10. **`Invoice Processing Admin` is UNATTESTED for BOTH pages** — verified by direct grep against all five nav-bearing topics (result: none). The node *is* documented for ~20 sibling pages on the same menu. Record as UNATTESTED, not absent; the driver must try both paths.

---

## 1. SEARCH LOG (literal commands)

```bash
ROOT=/mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE
A=concur-invoice-professional-edition-admin-guides
T=concur-invoice-professional-edition-tools-guides
cd "$ROOT"

# --- 0. dir inventory ---
ls "$ROOT"
ls "$ROOT/$A" | wc -l          # 1209
ls "$ROOT/$T" | wc -l          # 650

# --- 1. FILENAME SWEEP, both dirs, equal weight ---
for d in "$A" "$T"; do ls "$d" | grep -Ei 'match|rule|toleranc|receipt|confirm|life-to-date|two-way|three-way|delivery-slip|goods-receipt|grn|exception-message|rule-set|ruleset|unlock|in-use|exchange-rate'; done
for d in "$A" "$T"; do ls "$d" | grep -Ei 'purchase|purchase-order|-po-|^po-|order'; done

# --- 2. CONTENT SWEEP, both dirs, case-insensitive ---
grep -rli "purchase order matching" $A $T
grep -rli "matching rule" $A $T
grep -rliE "rule set|ruleset" $A $T
grep -rli "match status" $A $T
grep -rli "toleranc" $A $T
grep -rliE "life[ -]to[ -]date" $A $T
grep -rliE "(three|two)[ -]way match" $A $T
grep -rli "receipt confirmation" $A $T
grep -rli "confirmation type" $A $T
grep -rli "receipt central" $A $T
grep -rli "delivery slip" $A $T
grep -rli "exception message" $A $T
grep -rliE "rules? group" $A $T
grep -rliE "condition[ -]based" $A $T
grep -rliE "unlock" $A $T
grep -rli "exchange rate" $A $T
grep -rliE "goods receipt|GRN" $A $T
grep -rli "purchase order configuration" $A $T
grep -rli "PO Configuration" $A $T
grep -rliE "transmit" $A $T
grep -rliE "company branding|branding logo" $A $T
grep -rli "logo" $A $T
grep -rli "supporting document" $A $T
grep -rliE "group[ -]aware" $A $T
for term in "Next Sequence" "Postfix" "Default Sender Email" "Ship To without Requestor" \
            "Use Email as Bill-To" "Include in PO Transmission" "Default Email Subject" \
            "Default Email Message" "PO Number Generation" "Company Branding" "bill-to" \
            "Company Name Without Address"; do grep -rli "$term" $A $T; done
for term in "Purchase Order Matching Set" "Edit Rules" "Edit Confirmation" "Rule Set Name" \
            "Named Rules Group" "Allow Submit/Approve" "Overage Tolerance" "Rules tab" \
            "Life to Date tab" "Purchase Order Matching Rule Group" \
            "Purchase Order Matching Rules Group Conditions" "Select Confirmation Type"; do grep -rln "$term" $A $T; done
grep -rn "line time" $A $T                      # SAP typo, 1 hit
grep -rniE "fields to appear|appear on the purchase order" $A $T
grep -rn "PO Matching Ruleset" $A $T
grep -rn "Change to Non" $A $T                  # 3 hits, 2 labels
grep -rn "Matched against Received Quantity" $A $T
grep -rn "Match against Received Quantity" $A $T
grep -rc "Line Item – Receipt" $A $T | grep -v ":0"     # EN DASH
grep -rc "Line Item - Receipt" $A $T | grep -v ":0"     # HYPHEN

# --- 2b. NAVIGATION PHRASING SWEEP ---
grep -rn "Purchase Order Matching Rules" $A $T | grep -E ">"
grep -rn "left menu" $A $T
grep -rn "Invoice > Purchase Order\|Invoice  Purchase Order\|Invoice >Purchase Order" $A $T
grep -rn "Invoice Processing Admin" $A $T
grep -rn "Invoice Processing Admin" $A/access-purchase-order-matching-rules-8407c500.md \
  $A/use-the-purchase-order-configuration-tool-51009c8c.md $A/configure-purchase-orders-8128725e.md \
  $A/purchase-order-matching-rules-8b357dbb.md $A/purchase-order-matching-rules-new-experience-6c8fb80f.md   # -> none

# --- 3. RAW TABLE CENSUS (corpus-wide, then per candidate) ---
for f in $(grep -rl "<table" $A $T); do echo "$(grep -c '<table' "$f")  $f"; done | sort -rn
# per-candidate combined census (leading whitespace allowed on md tables — INDENTED TABLE trap):
printf "bytes=%s mdtbl=%s rawtbl=%s bullets=%s" \
  "$(stat -c%s "$f")" "$(grep -cP '^\s*\|' "$f")" "$(grep -c '<table' "$f")" "$(grep -cP '^\s*-   ' "$f")"

# --- 4. LONG CATALOG CENSUS ---
grep -cP '^\s*\|' <file>          # indentation-tolerant pipe-table line count
grep -c '<tr'     <file>          # raw table row count
grep -cP '^\s*-   ' <file>        # bullet-run count
grep -n "^## \|^Table \|Revision History" <file>   # classify: catalog vs revision history

# --- 5. TWIN / DUPLICATE CHECKS (loio, never deliverable_id) ---
grep -m1 "^loio:" $A/purchase-order-matching-rules-8b357dbb.md
grep -m1 "^loio:" $A/purchase-order-matching-rules-new-experience-6c8fb80f.md
diff <(sed -n '16,200p' $A/overview-8b35a33f.md) <(sed -n '16,200p' $T/overview-8b4fd062.md)
diff <(sed -n '16,200p' $A/quantity-receipt-import-for-three-way-matching-1fc33cab.md) \
     <(sed -n '16,200p' $T/quantity-receipt-import-for-three-way-matching-8b4fe385.md)

# --- 6. GROUNDING SPOT-CHECKS (all returned >= 1) ---
grep -F -c "Choose one tolerance:" $A/step-3-create-the-po-to-request-fields-matching-rules-64eb1c47.md
grep -F -c "select None, Within, or Custom" $A/configure-three-way-matching-c043e5c8.md
grep -F -c "Click Purchase Order Matching Rules (left menu). The Purchase Order Matching Rules page appears." $A/access-purchase-order-matching-rules-8407c500.md
grep -F -c "click Administration > Invoice > Purchase Order Configuration." $A/use-the-purchase-order-configuration-tool-51009c8c.md
grep -F -c "The header and line time fields you select will appear on the purchase order." $A/configure-purchase-orders-8128725e.md
grep -F -c "Support Images and the PO Configuration Supporting Documents Feature" $T/manage-images-03021850.md
grep -F -c "No Match Required" $T/understand-the-match-status-assigned-to-an-invoice-52477c6b.md
grep -F -c "Match against Received Quantity" $A/step-2-create-the-life-to-date-matching-rule-set-dc296ae6.md
grep -F -c "None: No receipt confirmation is required." $A/confirmation-types-b4a94761.md
```

---

## 2. PAGE 1 — `purchase-order-matching-rules`

**Canonical nav (3 attestations, all disagree in punctuation — quote each from its own file):**
| File | Line | Verbatim form |
|---|---|---|
| `access-purchase-order-matching-rules-8407c500.md` | 23–25 | `Click Administration > Invoice.` then `Click Purchase Order Matching Rules (left menu). The Purchase Order Matching Rules page appears.` |
| `configure-three-way-matching-c043e5c8.md` | 36 | `Click Administration > Invoice > Purchase Order Matching Rules (left menu).` |
| `purchase-order-matching-rules-8b357dbb.md` / `…-new-experience-6c8fb80f.md` | 29 | `Admins create these rules by going to Administration > Invoice > Purchase Order Matching Rules.` |
| `overview-8b37481c.md` | 23 | **THIRD form, NO `>` separators:** `configured by going to   Administration  Invoice  Purchase Order Matching Rules.` (multiple literal spaces — copy exactly) |

This is the **only** PO label in the corpus ever written with `(left menu)`. `Invoice Processing Admin` middle node = **UNATTESTED** (grep-verified absent from all four nav topics; documented for ~20 sibling pages).

### 2.1 mustRead — 50 files (beats the 45-file recon floor)

**ADMIN-GUIDES (39)**

| # | File | Why | lines | rawtbl |
|---|---|---|---|---|
| 1 | `configure-three-way-matching-c043e5c8.md` | Largest procedural seed (5689B). 3-value tolerance list (`select None, Within, or Custom`, L46) — **contradiction pair A**; `Overage Tolerance` (unique to this file); Value/Percentage; Level values; **the FIFTH dialog** (Exception Message editor: Change→New/Edit→Save); `Allow Submit/Approve`; nav with `(left menu)`; Rules-tab/Life-to-Date-tab **2-levels-down** click tree — **contradiction pair B**. Uses BOTH `Matched against` (L27) and `Match against` (L60). | 190 | 0 |
| 2 | `step-1-create-the-purchase-order-matching-rule-set-4d3866f3.md` | Rule-set creation is **Copy → Rename → Done** (no New button). `Rule Set Name` column. | 45 | 0 |
| 3 | `step-2-create-the-life-to-date-matching-rule-set-dc296ae6.md` | **LONG CATALOG: 6-row Life to Date rule-type table** (Gross Amount, Net Amount, Line Item Total, Line Item Quantity, Match against Received Quantity, Line Item Tax). **INDENTED TABLE** — `grep -c "^| "` = 0, `grep -cP '^\s*\|'` = **22**. Value+Currency / Percentage tolerance. Rules-tab **2 levels down** (Edit → Default → Edit Rules). | 140 | 0 |
| 4 | `step-3-create-the-po-to-request-fields-matching-rules-64eb1c47.md` | **4-value tolerance list** (`Choose one tolerance:` L45 → None / Within (+/-) / Custom / Currency) — **contradiction pair A, other half**. **4-value `Level` list** (Header, Vendor, Line Item, `Line Item - Receipt` — ASCII HYPHEN here). Rules tab **ONE level up**, no Edit Rules step — **contradiction pair B, other half**. | 120 | 0 |
| 5 | `step-4-add-condition-based-rule-to-a-named-rules-group-db93fb81.md` | The `Purchase Order Matching Rules Group Conditions` dialog (only attestation). Add / Insert / Save / Edit Rules / Update sequence. Multiple Matching Rule Sets concept. | 200 | 0 |
| 6 | `step-5-change-localize-receipt-confirmation-type-instructional-text-5328a8e1.md` | **LONG CATALOG: 3-row Confirmation Type × Default Message Text × Intent table** (`mdtbl`=17) carrying the **codes INVC / RIND / RCEN** — found nowhere else. `Edit Confirmation` → `Select Confirmation Type` window. Nav to **Localization** (page NOT built — dependency stays unresolved). **OCR typos to quote exactly:** `clickingAdministration` (no space), `his invoice cannot move forward` (missing T). | 140 | 0 |
| 7 | `access-purchase-order-matching-rules-8407c500.md` | Canonical nav. **3 list columns**: `Rule Set Name`, `In Use` (Yes/No), `Associated Policies`. In-Use lock rule + cross-ref to Unlock. `PO Matching Ruleset` dependency → Policies. | 80 | 0 |
| 8 | `purchase-order-matching-rules-8b357dbb.md` | **LEGACY TWIN** (loio `8b357dbb…`). Nav; 7-bullet capability list. Read for uiVariant determination. | 120 | 0 |
| 9 | `purchase-order-matching-rules-new-experience-6c8fb80f.md` | **NEW EXPERIENCE TWIN** (loio `6c8fb80f…` — distinct, genuine variant). **Read BOTH twins before claiming uiVariant "both".** Body 1–33 is byte-identical to the legacy twin; 35–90 inlines Before You Begin / Test and Change / Unlock / Exchange Rates, all of which exist as standalone topics. Carries `Change to Non PO Invoice` — minority label. | 200 | 0 |
| 10 | `create-purchase-order-matching-rules-adb700f9.md` | **CORPUS DEFECT — TRUNCATED.** Body ends with a bare `x`. Two rule types (Life to Date one-to-many; Rules one-to-one) + the Life-to-Date comparison list. Flag incompleteness in notes on every field taken from it. | 200 | 0 |
| 11 | `edit-purchase-order-matching-rules-604d1e31.md` | In-Use edit restriction; `Edit` button opens `Purchase Order Matching Set`; `PO Matching Ruleset` in Policies. | 60 | 0 |
| 12 | `copy-purchase-order-matching-rules-c6d4106a.md` | States copy == Step 1 procedure. Thin but citable. | 30 | 0 |
| 13 | `test-and-change-match-rule-sets-49f57319.md` | **The Unlock procedure with the MAJORITY label `Change to Non-PO`** (contradiction with #9). Test-naming convention; In Use → locked; audit trail in Details menu. | 60 | 0 |
| 14 | `amounts-and-tolerances-ab795b1f.md` | Amount-based fields (Line Item Total, Quantity, Tax, Shipping); tolerance = absolute currency value OR percentage; multiple rules on same field. | 45 | 0 |
| 15 | `refine-the-rules-allow-submission-despite-tolerance-9b96d467.md` | `Allow Submit/Approve` located in the **Options section of the Rules tab**. | 35 | 0 |
| 16 | `refine-the-rules-include-an-exception-message-c174b2b6.md` | `Exception Message` option located on the **Rules tab**. | 30 | 0 |
| 17 | `refine-the-rules-include-condition-based-rules-in-a-rule-set-ad7b0d65.md` | Condition subsets; default rules run when no condition met. | 40 | 0 |
| 18 | `refine-the-rules-combine-the-life-to-date-and-rules-rule-types-2b46973f.md` | Combining rule types; tolerance value of zero. | 55 | 0 |
| 19 | `confirmation-types-b4a94761.md` | **CATALOG: the 4 confirmation types** (None, Invoice, Receipt Central, Receipt Individual) with full definitions. Corroborates step-5's 3 rows + None. Note: quantity must come from ERP via Receipt Import; no direct entry UI. | 50 | 0 |
| 20 | `receipt-central-confirmation-type-a30f804b.md` | RCEN behaviour: submit allowed, approval blocked. `Send to Purchasing` button. | 40 | 0 |
| 21 | `receipt-individual-confirmation-type-56fd62f1.md` | RIND behaviour: submit blocked. | 30 | 0 |
| 22 | `invoice-confirmation-type-3142509d.md` | INVC behaviour: submit blocked until Confirm. | 28 | 0 |
| 23 | `confirmation-message-configuration-65b79d9c.md` | One-line: messages configured in the Localization tool. Thin is correct. | 25 | 0 |
| 24 | `how-receipt-confirmation-exceptions-appear-9d67250d.md` | Invoice-to-PO exception vs receipt-confirmation exception can co-occur. | 28 | 0 |
| 25 | `match-rules-and-rule-sets-87e69410.md` | **Button roster on the page**: Add / Edit / Copy / Delete / Rename / `Edit Confirmation`. `Parent choice` behaviour for rule conditions. Confirmation-type drivers: Spend Category, Capital Expense Status, Amount Threshold. | 55 | 0 |
| 26 | `match-rule-set-per-policy-8b14149d.md` | Rule sets differ per policy. | 25 | 0 |
| 27 | `activate-exchange-rates-for-matching-rule-sets-c51af31c.md` | Exchange rates **on by default**; accessed via **Expense Admin module** (outside Invoice). | 28 | 0 |
| 28 | `not-possible-to-base-rule-set-on-expense-type-or-account-code-e98c9b2c.md` | Constraint: rules tied to policy attributes (Region/Country), not expense type/account code. | 28 | 0 |
| 29 | `general-notes-ced8d7d0.md` | **SAME CONSTRAINT AS #28, PUBLISHED TWICE. Do not emit twice.** Distinct loio, abstract-only restatement. | 22 | 0 |
| 30 | `audit-trail-c1a37524.md` | Audit trail written on confirmation-type change; **NOT** written on exception generate/clear. | 28 | 0 |
| 31 | `terminology-d3b9f043.md` | **6-term glossary**: Concur Receiving, Purchase Order Payment Request, Life to Date, Associate, Matching Rule Set, Named Rules Group. Authoritative object names. | 35 | 0 |
| 32 | `before-you-begin-dc5d817c.md` | Section shell for the testing guidance. Thin. | 24 | 0 |
| 33 | `overview-8b35a33f.md` | **3 matching methods** (Two-Way, Three-Way, Receipt Confirmation). Abstract carries the unique role claim: `Only accessible by users with the Invoice Configuration Administrator role.` Fiori UI-theme caveat. | 45 | 0 |
| 34 | `overview-8b37481c.md` | **THIRD nav attestation, no `>` separators.** Receipt Confirmation is part of the PO Matching feature set. | 30 | 0 |
| 35 | `required-roles-ec6fae13.md` | `Only the user with the Invoice Configuration Administrator role can access and configure the Purchase Order Matching Rules feature.` | 25 | 0 |
| 36 | `best-practices-129dae61.md` | Rule-set design guidance; simple vs multiple rule sets; tolerance + exception message + submit action balance. | 35 | 0 |
| 37 | `is-receipt-required-value-on-po-line-item-896466e1.md` | **THE GATE.** `Unless the Receipt Required field is set to Yes, no receipt confirmation logic configured in Concur Invoice will be evaluated for that line.` Set via PO Import. Note the field is named two ways in one file: `Is Receipt Required` (title/body) and `Receipt Required` (the gate sentence). | 30 | 0 |
| 38 | `delivery-slip-number-field-for-three-way-matching-b0d3f1ca.md` | DSN → GRN precedence; without the field, matching is sequential. Field added via **Forms and Fields** (Group 5, built) → dependency. | 30 | 0 |
| 39 | `quantity-receipt-import-for-three-way-matching-1fc33cab.md` | **THREE ingestion routes** (FTP / API / Concur Receiving). Contradicts its tools twin (#49). | 30 | 0 |

**TOOLS-GUIDES (11) — equal weight; three of these were invisible to the original recon**

| # | File | Why | lines | rawtbl |
|---|---|---|---|---|
| 40 | `required-roles-ef2c2901.md` | **LONG CATALOG: 6-row × 4-column Concur Receiving roles matrix** (`mdtbl`=36): Purchase Order Processor, Invoice Processor, Purchase Request User, Invoice User, Central Receiver, Receipt User — each with Can/Cannot, Where, Conditions. Also repeats the Invoice Configuration admin gate with **different wording** than #35 (`Only the Invoice Configuration administrator can access and configure…`). | 200 | 0 |
| 41 | `when-are-match-rules-run-f835a01e.md` | Firing conditions + re-run triggers + the three states where rules **cannot** run (extracted / payment demand / Unassigned). Ordering evidence for the driver. | 60 | 0 |
| 42 | `overview-8b4fd062.md` | Tools-side overview. **Near-identical to #33** — differs only in the missing abstract line, `Suppliers` (capital S), `Concur Invoice does not check quantity` vs `Invoice does not check quantity`, and italics. Read to confirm it is a republish, not a UI variant. | 45 | 0 |
| 43 | `match-rules-and-match-status-8cc2c56b.md` | Rule levels (Header, Vendor, Line Item); one-to-one vs Life-to-Date. Note: **omits `Line Item – Receipt`** from the level list that #4 gives as four values — a partial-list disagreement worth recording. | 40 | 0 |
| 44 | `understand-the-match-status-assigned-to-an-invoice-52477c6b.md` | **LONG CATALOG: the 6-value Match Status table** (`mdtbl`=22): Matched, Does Not Match, Waiting for PO, Pending Match, Missing PO Number, No Match Required. The 2078B sibling (#43) does NOT carry it. Displays on My Invoices / Approve Invoice / Assign Invoice / Processor List. | 90 | 0 |
| 45 | `how-to-deal-with-exceptions-using-matching-rules-options-171867ad.md` | Both options are on the **Rules tab** — cross-directory corroboration of #15/#16. | 35 | 0 |
| 46 | `exceptions-and-three-way-matching-rules-65d52687.md` | **SELF-CONTRADICTORY IN ONE PARAGRAPH**: `three purchase order matching rules are available` then `recommends that clients use both these rules`. Also documents only ONE of the three (`The Line Item – Receipt: Line Quantity Rule`) — the other two headings are absent. Emit the contradiction; do not reconcile. | 50 | 0 |
| 47 | `receipt-association-and-three-way-matching-12b976a5.md` | GRN sequencing; DSN precedence; **no fallback to sequential** when DSN has no GRN match; detail-level DSN is read-only and copies down from header (SAP typo `header DNS field`). | 30 | 0 |
| 48 | `understanding-line-item-match-rule-application-7a56d0c5.md` | Sequence vs data-attribute identification — decides whether Line Item rules can fire at all. | 30 | 0 |
| 49 | `quantity-receipt-import-for-three-way-matching-8b4fe385.md` | **TWO ingestion routes** + unique SAE-extract claim. Contradicts #39. **NEW — not in any prior candidate set.** | 30 | 0 |
| 50 | `change-a-po-based-invoice-policy-to-a-non-po-based-invoice-policy-12786d77.md` | **NEW — found by neither recon nor critic.** `In the Actions menu, click Change to Non-PO.` — the third, tie-breaking attestation of the Unlock control label, plus the concrete step sequence (My Invoices → Actions → Change to Non-PO → Select a Policy → OK) a driver needs to execute the unlock. | 60 | 0 |

### 2.2 alsoRelevant (read for context/dependency; do NOT home fields here)

- `purchase-order-matching-8b351a47.md` (admin) — **guide cover, Revision History ONLY**, 106 pipe lines, zero fields. Dating/corroboration only.
- `purchase-order-matching-8b4f2662.md` (tools) — same, 115 pipe lines.
- `receipt-confirmation-8b370deb.md`, `purchase-order-8b43cd30.md`, `purchase-request-and-purchase-order-8b36ae07.md` — guide covers, revision history only.
- `line-identification-for-purchase-order-matching-3c7c8336.md` + `purchase-order-line-identification-8b356b0e.md` — the setting `Allow system to associate invoice lines to Purchase Order lines based on data attributes` lives on **Invoice Settings (Group 1, ALREADY BUILT)**. **Do not re-home.** These two disagree on control type (`toggle (enable)` vs `(select) enable`) and on capitalisation (`invoice lines` vs `Invoice lines`) — note as an Invoice Settings defect, do not fix here.
- `policies-the-purchase-order-policy-new-experience-5a1ba7ef.md`, `purchase-order-policy-fields-4aa0ac1b.md`, `components-of-the-policy-3bf075f8.md`, `create-a-new-policy-dd9549c0.md`, `the-standard-and-purchase-order-policy-differences-33e67dc0.md` — carry `PO Matching Ruleset`, `Is PO Policy` / `Is PO Policy?` / `Require PO Matching?`. **All owned by Policies (Group 1, built).** Source of the outbound dependency only.
- `configure-concur-receiving-1ececc23.md` — **ALIAS TRAP** (see §0.5). Policies-owned.
- `matching-summary-tab-a7ac0851.md`, `resolve-exceptions-09eb0af1.md`, `processor-resolve-exceptions-54f71448.md`, `correct-line-item-matching-to-match-invoice-and-po-26b0402f.md`, `correct-overall-number-of-line-items-to-match-the-po-d1079824.md` — processor-side effects of the rules; useful for verifying rule semantics, not a config surface.
- `establish-po-match-to-be-model-f397c50f.md`, `po-based-invoices-that-should-not-be-matched-8b4f5ef2.md`, `po-association-and-policy-8b4f71b2.md`, `enabling-and-disabling-line-item-level-po-ef3f19cd.md`, `concur-receiving-8b4f0098.md`, `adding-custom-fields-for-receipts-of-goods-469bd9d3.md`, `purchase-order-setup-process-9f253ce7.md` — ordering/scope evidence.
- `activate-the-multiple-purchase-order-feature-84e92edd.md` / `activating-…-aab8aaa8.md` — Forms and Fields-owned (Group 5, built).

### 2.3 RULED OUT (with reason — all were sweep hits)

| File | Why ruled out |
|---|---|
| `the-condition-page-5d4ea870.md` (11176B, 71 pipe lines, **288 bullets** — the biggest catalog any sweep surfaced) | It is the **Audit Rules** Condition page (`The Condition page in Audit Rules is similar to the Condition page used for Workflow and Processor.`). Nothing in the corpus binds it to PO matching; step-4 names a *different* dialog (`Purchase Order Matching Rules Group Conditions`) and step-5 names `Condition Editor` without cross-referencing this topic. Its `PO Match Status` and `Is Purchase Order line Associated` entries are Audit Rules **data objects**, not PO Matching Rules fields. **Group 2, already built.** Flagged here so nobody re-discovers it and mis-homes 288 bullets. |
| `create-a-conditional-rule-in-the-editor-86a92887.md` (1 raw `<table>`) | **Print Condition Rules**, not match rules. Its table is `Print Condition Rule Name` / `Editable By`. |
| `rule-setup-ddb24b69.md` | Japan NTA Vendor Tax ID audit rule. Not PO matching. |
| `locked-and-unlocked-status-cecc8ea0.md` | False positive from the `unlock` sweep — **Capture Processing batch** locking, not rule-set locking. |
| `purchase-order-settings-a5a997b4.md`, `preventing-po-transmittal-when-po-exceeds-specified-exception-level-51b11602.md`, `allowing-automatic-transmittal-of-purchase-orders-0f2e7fae.md` | Workflows-owned settings (Workflows not yet built). Roster already retired these as page nodes. |
| `sample-record-type-100-0902106a.md` and all `sample-record-*` / `*-record-type-*-format-*` | Import/extract file specifications. Not a UI configuration surface. |
| `audit-rules-*`, `validation-rules-*`, `random-audit-*`, `reminder-rules-*`, `confirmation-agreement*`, `payment-confirmation*`, `vendor-lookup-matching-criteria-*`, `limit-match-vendors-*` | Filename-sweep noise on `rule` / `match` / `confirm`. Other pages or other groups. |

### 2.4 Long-catalog census — page 1

| File | Enumerates | ~rows | Form |
|---|---|---|---|
| `…tools-guides/required-roles-ef2c2901.md` | Concur Receiving roles × Can/Cannot × Where × Conditions | 6 (4 cols) | md pipe, `mdtbl`=36 |
| `…admin-guides/step-2-create-the-life-to-date-matching-rule-set-dc296ae6.md` | Life to Date rule types + descriptions | 6 | md pipe **INDENTED**, `mdtbl`=22, `grep -c "^| "`=0 |
| `…tools-guides/understand-the-match-status-assigned-to-an-invoice-52477c6b.md` | Match Status values + descriptions | 6 | md pipe, `mdtbl`=22 |
| `…admin-guides/step-5-change-localize-receipt-confirmation-type-instructional-text-5328a8e1.md` | Confirmation Type × Default Message Text × Intent (codes INVC/RIND/RCEN) | 3 (+None in prose) | md pipe, `mdtbl`=17 |
| `…admin-guides/confirmation-types-b4a94761.md` | Confirmation types, numbered prose list | 4 | numbered list |
| `…admin-guides/step-3-create-the-po-to-request-fields-matching-rules-64eb1c47.md` | Tolerance options | 4 | bullet run |
| `…admin-guides/step-3-…-64eb1c47.md` | `Level` values (inline parenthetical) | 4 | inline prose |
| `…admin-guides/terminology-d3b9f043.md` | Glossary terms | 6 | bullet run |
| `…admin-guides/purchase-order-matching-rules-8b357dbb.md` / `…-new-experience-6c8fb80f.md` | Capability statements ("Use Purchase Order Matching Rules to:") | 7 | bullet run |
| `…tools-guides/when-are-match-rules-run-f835a01e.md` | Re-run triggers + cannot-run states | 4 + 3 | bullet runs |
| **REVISION-HISTORY, NOT CATALOGS** — `purchase-order-matching-8b351a47.md` (~34 dated rows), `purchase-request-and-purchase-order-8b36ae07.md` (~42), `purchase-order-matching-8b4f2662.md` (~37), `purchase-order-8b43cd30.md` (~21), `receipt-confirmation-8b370deb.md` (~19) | dates × change notes | — | md pipe |

---

## 3. PAGE 2 — `purchase-order-configuration`

**Canonical nav (2 attestations, both agreeing, both omitting the middle node):**
- `use-the-purchase-order-configuration-tool-51009c8c.md:23` — `To view this tool, click Administration > Invoice > Purchase Order Configuration.`
- `preview-a-purchase-order-846396e1.md:55` (tools) — `the Invoice Configuration administrator uses the Purchase Order Configuration tool (Administration > Invoice > Purchase Order Configuration)`

`Invoice Processing Admin` = **UNATTESTED** (grep-verified). Role gate: **Invoice Configuration administrator** (both files).

### 3.1 mustRead — 5 files

| # | File | Why | lines | rawtbl |
|---|---|---|---|---|
| 1 | `…admin-guides/configure-purchase-orders-8128725e.md` | **THE ENTIRE PAGE.** 5956B, 12 prose settings sections. **`grep -c "Purchase Order Configuration"` = 0** — names neither the page nor a nav path. Every field's page binding must be labelled INDEPENDENTLY ATTESTED or ADJACENCY-ONLY (§3.3). Carries the SAP typo `line time fields`. | 300 | 0 |
| 2 | `…admin-guides/use-the-purchase-order-configuration-tool-51009c8c.md` | Nav path + role gate + purpose (`setting default information for purchase orders`). The only topic that names the tool AND its click path in admin-guides. | 30 | 0 |
| 3 | `…admin-guides/purchase-order-configuration-is-group-aware-b603f04b.md` | Group scoping model; the configuration is created **per selected Group**; `Groups with no PO configuration assigned use the Global Group configuration by default.` Names company name, logo, email address as the group-varying details. | 30 | 0 |
| 4 | `…tools-guides/preview-a-purchase-order-846396e1.md` | **CROSS-DIRECTORY corroboration of the tool by name + nav.** Enumerates the **4 sources of PO-attached documents** (Administrators via PO Configuration; Users, Approvers, PO processors via `Include in PO Transmission`). Independently corroborates the Default Sender Email constraint: `cannot change the suffix of the address from "\_DoNotReply@ConcurSolutions.com"`. Binds Body text / address / Instructions to this tool. | 90 | 0 |
| 5 | `…tools-guides/manage-images-03021850.md` | Section `## Support Images and the PO Configuration Supporting Documents Feature` — **the ONLY cross-directory corroboration of Supporting Documents and its Group scope**, and the only statement anywhere of how admin-uploaded and user-uploaded PO attachments interact (`These documents apply to all PO transmissions performed by the PO Processor for that Group and are included alongside any documents added by the user.`). Same near-miss shape that nearly lost Vendor Search Admin. | 120 | 0 |

### 3.2 alsoRelevant

- `…admin-guides/purchase-request-and-purchase-order-8b36ae07.md` — guide cover / Revision History (130 pipe lines, ~42 rows, **zero fields**). It nevertheless supplies **by-name page bindings** that exist nowhere else: L209 `Added information about the Company Name without address field in the Purchase Order Configuration window.`; L350 `the ability to add a company logo in PO Configuration`; L384 `A Purchase Order Configuration is now "Group-aware"`; L227 `Added character limit for the next sequence number of purchase orders.`; L164 `sending purchase orders to a bill-to email address`. Treat as **corroboration of binding, not as a field source**, and say so in notes.
- `…tools-guides/upload-view-and-delete-images-de59cd81.md`, `…-bd159c07.md`, `upload-and-view-images-bb432dad.md` — the user-side `Include in PO Transmission` check box (Purchase Request-owned, not this page).
- `…tools-guides/purchase-order-contact-and-email-address-d5bdbbad.md`, `view-purchase-order-contact-and-email-address-f6f9330e.md`, `transmit-purchase-order-to-the-vendor-423a8a6c.md`, `automatically-transmit-purchase-orders-f1b1147c.md` — transmittal runtime behaviour; corroborate the email fields' downstream effect.
- Dependencies to already-built pages named inside `configure-purchase-orders-8128725e.md`: **Forms and Fields** (Purchase Order Header form, `Use Email as Bill-To` field) and **Company Locations** (bill-to email address). Both Group 5, built. `set-a-default-shipping-and-billing-address-f772bed1.md`, `company-locations-8b49554d.md` for context.

### 3.3 Page-binding attestation table (**required in notes on every field**)

| Section (field) | Binding | Evidence |
|---|---|---|
| Company Name Without Address | **INDEPENDENTLY ATTESTED BY NAME** | `purchase-request-and-purchase-order-8b36ae07.md:209` — "in the Purchase Order Configuration window" |
| Company Branding Logo | **INDEPENDENTLY ATTESTED BY NAME** | `purchase-request-and-purchase-order-8b36ae07.md:350` — "add a company logo in PO Configuration" |
| Company Address | **INDEPENDENTLY ATTESTED BY NAME** | `preview-a-purchase-order-846396e1.md:55` — "To change default text (Body text, address, Instructions, etc.) … uses the Purchase Order Configuration tool" |
| Supporting Documents | **INDEPENDENTLY ATTESTED BY NAME** | `manage-images-03021850.md` §"Support Images and the PO Configuration Supporting Documents Feature" |
| PO Number Generation (Next Sequence / prefix / Postfix) | **ADJACENCY-ONLY** | only `configure-purchase-orders-8128725e.md`; the revision-history line L227 mentions "next sequence number" but not the page |
| Message to Include on Transmitted Purchase Orders | **ADJACENCY-ONLY** | " |
| Default Email Subject When Transmitting Purchase Orders | **ADJACENCY-ONLY** | " |
| Default Email Message When Transmitting Purchase Orders | **ADJACENCY-ONLY** | " |
| Default Sender Email | **ADJACENCY-ONLY** (behaviour corroborated, page binding not) | suffix constraint independently in `preview-a-purchase-order-846396e1.md`, but that file attributes the *prefix change* to the PO Processor, not the admin tool |
| Fields to Appear on Purchase Orders | **ADJACENCY-ONLY** | " |
| Ship To Without Requestor Name | **ADJACENCY-ONLY** | " |
| Use Email as Bill-To | **ADJACENCY-ONLY** | revision-history L164 mentions bill-to email but not the page |

### 3.4 Constraints/limits carried by the 12 sections (what makes this thin page tractable)

PO number character limit **9**; prefix/postfix **case-insensitive**; Message field limit **3200 characters**; Default Email Subject limit **500 characters**; logo formats **.png/.jpg/.gif**, **55 px high**, **≤200 px long**, **≤100 KB**, **one logo per invoice group**; Default Sender Email fixed suffix `\_DoNotReply@ConcurSolutions.com`, blank prefix ⇒ requestor's address (explicitly not recommended); `Use Email as Bill-To` requires the field on the PO Header form **and** an address in Company Locations.

### 3.5 UNENUMERATED FIELD LIST — do not guess

`Fields to Appear on Purchase Orders`: `The header and line time fields you select will appear on the purchase order.` The selectable header and line-item roster is **never enumerated anywhere in the corpus** (`grep -rniE "fields to appear|appear on the purchase order"` returns exactly 2 lines, both in this one file). Mark **unenumerated**. Record SAP's typo `line time` for `line item` as a text trap.

### 3.6 RULED OUT (re-verified, must not be re-added)

| File | Why | Measurement |
|---|---|---|
| `purchase-order-processor-experience-8b507c54.md` | End-user processor topic, not a config surface | `The Purchase Order Processor role clicks Requests > Purchase Requests > Process Purchase Orders.` |
| `purchase-order-setup-process-9f253ce7.md` | Setup-flow stop list; never names this tool | **`grep -ci configuration` = 0** (re-verified) |
| `configure-concur-receiving-1ececc23.md` | "PO Configuration section" here is a **section of the Policies page** (L29: `the Policies page appears`) — alias collision | `Enable Concur Receiving` belongs to Policies |
| `purchase-order-settings-a5a997b4.md` / `preventing-po-transmittal-…-51b11602.md` | Workflows-owned; roster already retired | 51b11602: `Administration  Invoice  Workflows  Settings tab` |
| `allow-purchase-request-owners-to-edit/transmit-their-own-purchase-orders-*` (4 files) | Invoice Settings-owned (Group 1, built) | each: `Click Invoice Settings (left menu)` |
| `configure-forms-and-fields-for-purchase-order-copy-down-to-pr-f926eac7.md` | Forms and Fields-owned; its 5 raw tables are a **pencils example**, not a catalog | `<table>`=5 but `<tr>`=**5 total** |

### 3.7 Long-catalog census — page 2

**NONE.** Re-verified on `configure-purchase-orders-8128725e.md`: `grep -c "^| "` = **0**, `grep -cP '^\s*\|'` = **0**, `grep -cP '^\s*-   '` = **0**, `grep -c "<table"` = **0**. The twelve are **prose section headings**, not an enumeration. The recon's earlier `longCatalogs: 1` score was wrong and is retracted. No mustRead file for this page contains any enumeration of ~10+ entries.

---

## 4. RAW HTML `<table>` CENSUS — corpus-wide (31 admin + 1 tools), as required

Reported in full even for files ranked low, per instruction.

| Count | File |
|---|---|
| 5 | `admin-guides/policies-the-purchase-order-policy-new-experience-5a1ba7ef.md` — PO-adjacent; **`<tr>`=5 total**, illustrative not catalog; Policies-owned |
| 5 | `admin-guides/configure-forms-and-fields-for-purchase-order-copy-down-to-pr-f926eac7.md` — PO-adjacent; **`<tr>`=5 total**, pencils example; Forms and Fields-owned |
| 2 | `admin-guides/overview-attendee-forms-and-fields-96aa4b66.md` |
| 1 | `tools-guides/what-fields-are-extracted-during-the-ocr-process-8eddb3cf.md` — the **only** raw-table file in tools-guides; Capture Processing (Group 4, built) |
| 1 | `admin-guides/create-a-conditional-rule-in-the-editor-86a92887.md` — Print Condition Rules, ruled out §2.3 |
| 1 | `admin-guides/invoice-settings-cace748d.md` |
| 1 | `admin-guides/invoice-barcode-content-type-81641f43.md` |
| 1 | `admin-guides/invoice-text-content-type-02b21c13.md` |
| 1 | `admin-guides/additional-approver-situations-fbb5034c.md` |
| 1 | `admin-guides/configuring-forms-and-fields-in-capture-processing-7c14446c.md` |
| 1 | `admin-guides/creating-card-accounts-cf71feb4.md` |
| 1 | `admin-guides/onboarding-card-accounts-with-payment-providers-bf273997.md` |
| 1 | `admin-guides/example-data-f7ca8383.md` |
| 1 | `admin-guides/filter-authorized-approvers-by-workflow-approval-step-aae69350.md` |
| 1 | `admin-guides/global-level-a53bf756.md` |
| 1 each | `admin-guides/sample-record-4ae2b08c.md`, `sample-record-c83b2160.md`, `sample-record-type-100-{0902106a,2deb79ae,626cb419,dd94ecfd}.md`, `sample-record-type-200-{3c0a370d,b660ce2e,c45336e5}.md`, `sample-record-type-210-91f4d609.md`, `sample-record-type-300-{2e278186,4e6c56cf,7da0dd27}.md`, `sample-record-type-310-{04182982,1303b053}.md`, `sample-record-type-410-157e0ab8.md`, `sample-record-type-420-85d647a0.md` — import/extract file specs, all ruled out |

**Conclusion: zero raw-HTML-table files enter either page's mustRead.** `sample-record-type-100-0902106a.md` was the only raw-table file to hit a page term (`tolerance`) and is an import spec, not a UI surface.

---

## 5. FILES LEGITIMATELY SHARED BETWEEN THE TWO PAGES

Stated rather than arbitrarily assigned:
- `preview-a-purchase-order-846396e1.md` — mustRead for **PO Configuration**; also touches PO transmittal generally. Not a matching-rules source.
- `purchase-request-and-purchase-order-8b36ae07.md` — alsoRelevant for **both** (revision history corroborating PO Config names; also PO-matching feature dating).
- `purchase-order-setup-process-9f253ce7.md` — alsoRelevant for **both** as ordering evidence (`Match Rules` is one of its four PO-Invoice-Policy components); a field source for **neither**.
- `configure-concur-receiving-1ececc23.md` — alsoRelevant/trap for **both**; owned by **Policies**.
- `required-roles-ec6fae13.md` / `required-roles-ef2c2901.md` — role gate `Invoice Configuration Administrator` applies to PO Matching Rules explicitly and to PO Configuration via `use-the-purchase-order-configuration-tool-51009c8c.md`. mustRead on page 1; the shared role claim is citable from page 2's own nav topic.

## 6. PROVISIONING / SCOPE NOTES

Several list differences here are almost certainly **provisioning-dependent** and must be recorded as contradictions rather than reconciled: the 3- vs 4-value tolerance list (three-way-matching context vs general PO-to-Request context); the 3- vs 4-value `Level` list (`match-rules-and-match-status-8cc2c56b.md` omits `Line Item – Receipt`, which only exists where three-way matching / Concur Receiving is provisioned); the 2- vs 3-route Quantity Receipt import (Concur Receiving must be activated on the Policies page for the third route to exist); and the 1- vs 2-level tab tree. All four track the same axis: whether the site has receiving/three-way matching enabled.

---

## 7. AUTHORITATIVE PER-FILE CENSUS (all 55 mustRead files)

The `lines` values in the §2.1 / §3.1 tables are indicative. These are exact, from
`wc -l`, `grep -c '<table'`, `grep -cP '^\s*\|'` (indentation-tolerant), and `grep -cP '^\s*-   '`.

| lines | rawtbl | mdtbl-lines | bullets | file |
|---|---|---|---|---|
| 94 | 0 | 0 | 12 | `concur-invoice-professional-edition-admin-guides/configure-three-way-matching-c043e5c8.md` |
| 38 | 0 | 0 | 0 | `concur-invoice-professional-edition-admin-guides/step-1-create-the-purchase-order-matching-rule-set-4d3866f3.md` |
| 131 | 0 | 22 | 4 | `concur-invoice-professional-edition-admin-guides/step-2-create-the-life-to-date-matching-rule-set-dc296ae6.md` |
| 63 | 0 | 0 | 4 | `concur-invoice-professional-edition-admin-guides/step-3-create-the-po-to-request-fields-matching-rules-64eb1c47.md` |
| 58 | 0 | 0 | 0 | `concur-invoice-professional-edition-admin-guides/step-4-add-condition-based-rule-to-a-named-rules-group-db93fb81.md` |
| 117 | 0 | 17 | 0 | `concur-invoice-professional-edition-admin-guides/step-5-change-localize-receipt-confirmation-type-instructional-text-5328a8e1.md` |
| 38 | 0 | 0 | 3 | `concur-invoice-professional-edition-admin-guides/access-purchase-order-matching-rules-8407c500.md` |
| 45 | 0 | 0 | 7 | `concur-invoice-professional-edition-admin-guides/purchase-order-matching-rules-8b357dbb.md` |
| 85 | 0 | 0 | 7 | `concur-invoice-professional-edition-admin-guides/purchase-order-matching-rules-new-experience-6c8fb80f.md` |
| 34 | 0 | 0 | 2 | `concur-invoice-professional-edition-admin-guides/create-purchase-order-matching-rules-adb700f9.md` |
| 40 | 0 | 0 | 0 | `concur-invoice-professional-edition-admin-guides/edit-purchase-order-matching-rules-604d1e31.md` |
| 23 | 0 | 0 | 0 | `concur-invoice-professional-edition-admin-guides/copy-purchase-order-matching-rules-c6d4106a.md` |
| 46 | 0 | 0 | 0 | `concur-invoice-professional-edition-admin-guides/test-and-change-match-rule-sets-49f57319.md` |
| 38 | 0 | 0 | 2 | `concur-invoice-professional-edition-admin-guides/amounts-and-tolerances-ab795b1f.md` |
| 27 | 0 | 0 | 0 | `concur-invoice-professional-edition-admin-guides/refine-the-rules-allow-submission-despite-tolerance-9b96d467.md` |
| 25 | 0 | 0 | 0 | `concur-invoice-professional-edition-admin-guides/refine-the-rules-include-an-exception-message-c174b2b6.md` |
| 33 | 0 | 0 | 0 | `concur-invoice-professional-edition-admin-guides/refine-the-rules-include-condition-based-rules-in-a-rule-set-ad7b0d65.md` |
| 58 | 0 | 0 | 5 | `concur-invoice-professional-edition-admin-guides/refine-the-rules-combine-the-life-to-date-and-rules-rule-types-2b46973f.md` |
| 36 | 0 | 0 | 0 | `concur-invoice-professional-edition-admin-guides/confirmation-types-b4a94761.md` |
| 29 | 0 | 0 | 0 | `concur-invoice-professional-edition-admin-guides/receipt-central-confirmation-type-a30f804b.md` |
| 27 | 0 | 0 | 0 | `concur-invoice-professional-edition-admin-guides/receipt-individual-confirmation-type-56fd62f1.md` |
| 27 | 0 | 0 | 0 | `concur-invoice-professional-edition-admin-guides/invoice-confirmation-type-3142509d.md` |
| 25 | 0 | 0 | 0 | `concur-invoice-professional-edition-admin-guides/confirmation-message-configuration-65b79d9c.md` |
| 27 | 0 | 0 | 0 | `concur-invoice-professional-edition-admin-guides/how-receipt-confirmation-exceptions-appear-9d67250d.md` |
| 61 | 0 | 0 | 6 | `concur-invoice-professional-edition-admin-guides/match-rules-and-rule-sets-87e69410.md` |
| 25 | 0 | 0 | 0 | `concur-invoice-professional-edition-admin-guides/match-rule-set-per-policy-8b14149d.md` |
| 27 | 0 | 0 | 0 | `concur-invoice-professional-edition-admin-guides/activate-exchange-rates-for-matching-rule-sets-c51af31c.md` |
| 23 | 0 | 0 | 0 | `concur-invoice-professional-edition-admin-guides/not-possible-to-base-rule-set-on-expense-type-or-account-code-e98c9b2c.md` |
| 21 | 0 | 0 | 0 | `concur-invoice-professional-edition-admin-guides/general-notes-ced8d7d0.md` |
| 25 | 0 | 0 | 2 | `concur-invoice-professional-edition-admin-guides/audit-trail-c1a37524.md` |
| 35 | 0 | 0 | 6 | `concur-invoice-professional-edition-admin-guides/terminology-d3b9f043.md` |
| 23 | 0 | 0 | 0 | `concur-invoice-professional-edition-admin-guides/before-you-begin-dc5d817c.md` |
| 44 | 0 | 0 | 3 | `concur-invoice-professional-edition-admin-guides/overview-8b35a33f.md` |
| 23 | 0 | 0 | 0 | `concur-invoice-professional-edition-admin-guides/overview-8b37481c.md` |
| 23 | 0 | 0 | 0 | `concur-invoice-professional-edition-admin-guides/required-roles-ec6fae13.md` |
| 31 | 0 | 0 | 2 | `concur-invoice-professional-edition-admin-guides/best-practices-129dae61.md` |
| 29 | 0 | 0 | 0 | `concur-invoice-professional-edition-admin-guides/is-receipt-required-value-on-po-line-item-896466e1.md` |
| 27 | 0 | 0 | 0 | `concur-invoice-professional-edition-admin-guides/delivery-slip-number-field-for-three-way-matching-b0d3f1ca.md` |
| 27 | 0 | 0 | 0 | `concur-invoice-professional-edition-admin-guides/quantity-receipt-import-for-three-way-matching-1fc33cab.md` |
| 155 | 0 | 36 | 0 | `concur-invoice-professional-edition-tools-guides/required-roles-ef2c2901.md` |
| 62 | 0 | 0 | 9 | `concur-invoice-professional-edition-tools-guides/when-are-match-rules-run-f835a01e.md` |
| 42 | 0 | 0 | 3 | `concur-invoice-professional-edition-tools-guides/overview-8b4fd062.md` |
| 29 | 0 | 0 | 0 | `concur-invoice-professional-edition-tools-guides/match-rules-and-match-status-8cc2c56b.md` |
| 102 | 0 | 22 | 2 | `concur-invoice-professional-edition-tools-guides/understand-the-match-status-assigned-to-an-invoice-52477c6b.md` |
| 29 | 0 | 0 | 0 | `concur-invoice-professional-edition-tools-guides/how-to-deal-with-exceptions-using-matching-rules-options-171867ad.md` |
| 51 | 0 | 0 | 0 | `concur-invoice-professional-edition-tools-guides/exceptions-and-three-way-matching-rules-65d52687.md` |
| 25 | 0 | 0 | 0 | `concur-invoice-professional-edition-tools-guides/receipt-association-and-three-way-matching-12b976a5.md` |
| 29 | 0 | 0 | 0 | `concur-invoice-professional-edition-tools-guides/understanding-line-item-match-rule-application-7a56d0c5.md` |
| 25 | 0 | 0 | 0 | `concur-invoice-professional-edition-tools-guides/quantity-receipt-import-for-three-way-matching-8b4fe385.md` |
| 42 | 0 | 0 | 0 | `concur-invoice-professional-edition-tools-guides/change-a-po-based-invoice-policy-to-a-non-po-based-invoice-policy-12786d77.md` |
| 131 | 0 | 0 | 0 | `concur-invoice-professional-edition-admin-guides/configure-purchase-orders-8128725e.md` |
| 25 | 0 | 0 | 0 | `concur-invoice-professional-edition-admin-guides/use-the-purchase-order-configuration-tool-51009c8c.md` |
| 27 | 0 | 0 | 0 | `concur-invoice-professional-edition-admin-guides/purchase-order-configuration-is-group-aware-b603f04b.md` |
| 67 | 0 | 0 | 4 | `concur-invoice-professional-edition-tools-guides/preview-a-purchase-order-846396e1.md` |
| 84 | 0 | 0 | 0 | `concur-invoice-professional-edition-tools-guides/manage-images-03021850.md` |

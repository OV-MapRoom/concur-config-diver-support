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

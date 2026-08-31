# Sweep B — admin-guides filename + content sweep for the PO Matching configuration area

Corpus root: `/mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE`
Sweep lane: `concur-invoice-professional-edition-admin-guides/` (1209 files), SAP 2026_08, Professional Edition, crawled 2026-08-29.
Run date: 2026-08-31. No MCP; all reads via `cat`/`sed`/`grep`.

## Headline

The PO area in admin-guides is **thin on pages and thick on prose**. 100 files match the PO
filename sweep (230,201 bytes); 127 files contain the string "purchase order". Out of all of that,
the admin-guides corpus names exactly **two** surfaces reached by their own click path off
`Administration > Invoice`: **Purchase Order Matching Rules** and **Purchase Order Configuration**.
Everything else is either a section on an already-built page (Policies, Invoice Settings, Forms and
Fields, Company Locations), a section on the Workflows page (a different group), a dialog opened
from the Matching Rules page, an import specification, or an end-user/processor screen.

Both of the "two specific things to resolve" resolve cleanly and in opposite directions:
1. **Purchase Order Policy is NOT a page.** It is a policy *type* — an `Is PO Policy` check box on
   the already-built Policies page that reveals a `PO Configuration` section.
2. **Matching Rules is ONE page** (a rule-set list) plus a stack of modal editors opened from it.
   "Match rule set" is not a separate surface from "match rule"; the rule set is the row in the
   list and the rule is a line inside the editor.

---

## What I searched

### Filename sweep
```
cd /mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE/concur-invoice-professional-edition-admin-guides
ls | grep -iE 'purchase|purchase-order|po-|-po-|requisition' | sort
ls | grep -iE 'match|rule-set|ruleset|receiv|receipt-of-goods|goods-receipt|three-way|two-way|change-order|copy-down|transmit|transmission|catalog|punchout|supplier|procure' | sort
ls | grep -iE 'purchase|match|receiv|copy-down|transmit|catalog|punchout|supplier|procure|requisition|rule-set|three-way|two-way|change-order|-po-|^po-' | sort > po-files.txt
wc -l < po-files.txt                        # 100
while read f; do echo "$(wc -c < "$f") $f"; done < po-files.txt | sort -rn
# TOTAL BYTES: 230201
ls | grep -iE 'shipping|shipment|billing-address'
ls | grep -i "new-experience"
ls | grep -E '^access' | sort
ls | grep -iE '^step-|named-rules|condition-based' | sort
```

Zero filename hits for: `punchout`, `catalog`, `procurement`, `two-way` (as a filename token),
`receipt-of-goods`, `goods-receipt`. `requisition` appears only once, inside a body.

### Content sweep
```
grep -ril "purchase order" *.md | sort > po-content.txt          # 127 files
comm -13 po-files.txt po-content.txt                             # 61 body-only hits
for t in "All Purchase Orders" "Purchase Order Configuration" "Purchase Order Matching Rules" \
         "Purchase Order Matching Set" "Purchase Request" "Receiving Admin" "Purchasing Admin" \
         "Purchase Order Processor" "PR Processor" "punchout" "catalog" "requisition" \
         "change order" "Goods Receipt" "Quantity Receipt"; do
  echo "== $t : $(grep -ril "$t" *.md | wc -l)"; done
grep -rn "All Purchase Orders" *.md
grep -rn "Purchasing Admin" *.md
grep -rn "Purchase Order Configuration" *.md
grep -rin "requisition" *.md
grep -rn "Invoice Processing Admin" *.md
grep -rn "Named Rules Group" *.md
grep -rn "settings apply globally" *.md
grep -rn "PR tool\|PR-specific tool\|Purchase Request Configuration\|Purchase Request tool" *.md
grep -ril "receipt confirmation" *.md
grep -rhoiE "Click [A-Za-z0-9 ,&/'()–-]{2,60} \(left menu\)" *.md | sort | uniq -c | sort -rn
grep -rhoiE "Select [A-Za-z0-9 >,&/'()–-]{2,70} \(left menu\)" *.md | sort | uniq -c | sort -rn
grep -n "Administration" $(cat po-files.txt) | grep -iE "invoice" | sort -u
grep -n -iE "window|left menu|page appears|tool( |,|\.)|tab" $(cat po-files.txt) ... | sort -u
```

Content-sweep counts (`grep -ril`, admin-guides only):
`All Purchase Orders` 2 · `Purchase Order Configuration` 4 · `Purchase Order Matching Rules` 12 ·
`Purchase Order Matching Set` 5 · `Purchase Request` 92 · `Receiving Admin` **0** ·
`Purchasing Admin` 1 · `Purchase Order Processor` 6 · `PR Processor` 0 · `punchout` **0** ·
`catalog` **0** · `requisition` 1 · `change order` 4 · `Goods Receipt` 7 · `Quantity Receipt` 6.

Release notes were consulted only for name corroboration, and every such citation is labelled.

---

## Groups, with real file counts and byte totals

All byte totals from `wc -c`, summed in shell. Files can appear in more than one group where the
topic spans surfaces; the per-group totals below are what the downstream build should be sized off.

| Group | Surface it configures | Files | Bytes |
|---|---|---:|---:|
| A | **Purchase Order Matching Rules** page + its editors (incl. receipt-confirmation and three-way) | 28 | 67,460 |
| B | **Purchase Order Configuration** tool | 3 | 8,601 |
| C | PO / PR policy type — lives on the built **Policies** page | 7 | 25,848 |
| D | PO & PR settings that live on **Workflows** (Settings / Workflows / Approval Statuses tabs) | 11 | 22,810 |
| E | PO topics that live on the built **Forms and Fields** page | 12 | 28,190 |
| F | PO topics that live on the built **Invoice Settings** page | 8 | 13,734 |
| G | PO Import / PO Receipt Import record-format specs — **no page** | 16 | 40,622 |
| H | End-user / processor screens — **no config page** | 9 | 12,079 |
| I | Role definitions (assigned in User Permissions, outside Invoice admin) | 3 | 5,852 |
| J | Solution overviews, revision histories, client-profile prose — **no page** | 9 | 22,941 |

Only **Groups A and B are Group 3 pages.** Group A is 67 KB against a single page and one modal
stack; that is where the field roster is. Group B is small (8.6 KB) but dense — `configure-purchase-orders-8128725e.md`
alone (5,956 bytes) enumerates that tool's whole field set.

---

## Legacy / New-Experience twins in the PO area

Only **two** New Experience twins exist in the PO area of admin-guides, and the New Experience file
is richer in both cases:

| New Experience | bytes | Legacy twin | bytes | Ratio |
|---|---:|---|---:|---:|
| `policies-the-purchase-order-policy-new-experience-5a1ba7ef.md` | **15,800** | `policies-the-purchase-order-policy-8b35454a.md` | 1,490 | 10.6× |
| `purchase-order-matching-rules-new-experience-6c8fb80f.md` | **4,804** | `purchase-order-matching-rules-8b357dbb.md` | 2,404 | 2.0× |

(Third NE file in the whole directory, `end-user-experience-new-experience-85c2652b.md` at 1,056
bytes, is not PO-specific.)

The 15,800-byte PO-policy NE file is **not a UI variant** — it is a merged super-topic that swallows
six legacy siblings whole: `special-attributes-of-the-purchase-order-policy-1c43bc69.md` (1,967),
`purchase-order-policy-fields-4aa0ac1b.md` (1,682), `change-the-configuration-of-the-po-policy-07102eaa.md`
(1,132), `configure-forms-and-fields-for-purchase-order-copy-down-to-pr-f926eac7.md` (10,109),
`activate-the-multiple-purchase-order-feature-84e92edd.md` (2,418) and
`delivery-slip-number-field-for-three-way-matching-b0d3f1ca.md` (1,569). Its PO-specific content
targets **`page.policies` (Group 1) and `page.forms-and-fields` (Group 5)** — it is Groups 1/2/5
debt, not a new Group 3 page.

The matching-rules NE file adds three sections the legacy twin lacks: "Test and Change Match Rule
Sets", "'Unlock' a Matching Rule Set From Its In-Use Status", and "Activate Exchange Rates for
Matching Rule Sets". Build Group 3 from the NE file.

**Gerund/imperative twins are the same content republished, not UI variants.** I diffed five pairs
(`activate-`/`activating-the-multiple-purchase-order-feature`, both `allow-purchase-request-owners-to-edit-`,
both `allow-...-to-transmit-`, both `what-the-purchase-order-processor-sees`, both `copy-down`,
both `vendor-lookup-matching-criteria`). Differences are wording of the abstract and whether the
click path is spelled out; the underlying setting is identical. Note that **all** PO files carry the
same `deliverable_id: 41460672`, so deliverable_id cannot distinguish guides in this corpus — only
`loio` differs.

---

## Page-hood reasoning, candidate by candidate

### 1. Purchase Order Matching Rules — ADMIN PAGE. High confidence.
Own left-menu entry, own page title, its own click path, and a role gate. It is the only PO surface
in admin-guides that the corpus explicitly calls a *page* reached by a *left menu* click:

> `1.  Click Administration > Invoice.`
> `Click Purchase Order Matching Rules (left menu). The Purchase Order Matching Rules page appears.`
> — `access-purchase-order-matching-rules-8407c500.md`

Corroborated three more ways: `Admins create these rules by going to Administration > Invoice >
Purchase Order Matching Rules.` (`purchase-order-matching-rules-8b357dbb.md` **and** its NE twin
`purchase-order-matching-rules-new-experience-6c8fb80f.md`), and `Click Administration > Invoice >
Purchase Order Matching Rules (left menu).` (`configure-three-way-matching-c043e5c8.md`).

Role gate is explicit and doubled:
> `Only the user with the Invoice Configuration Administrator role can access and configure the Purchase Order Matching Rules feature.` — `required-roles-ec6fae13.md`
> `Only accessible by users with the Invoice Configuration Administrator role.` — `overview-8b35a33f.md`

**NAVIGATION CONTRADICTION worth recording:** every documented click path puts this page **directly
under `Administration > Invoice`**, never under the `Invoice Processing Admin` middle nav node. That
node is named in 20 admin-guides files (Policies, Exceptions, Workflows, Expense Types, Invoice
Settings, Forms and Fields, Group Configurations, Change Log, Email Reminders) and **never once** for
Purchase Order Matching Rules. On the corpus evidence, PO Matching Rules hangs off Administration >
Invoice directly. That may be a doc gap rather than a UI fact; it is the only navigation record that
exists and should be flagged for the automation build, not silently normalised.

**Is "match rule set" a separate surface from "match rule"? No.** The rule set is a *row in the list
on this page*; the rules live inside the editor opened from that row. Evidence:
`Each rule set appears in a row that includes the following columns:` with columns
`Rule Set Name`, `In Use`, `Associated Policies` (`access-purchase-order-matching-rules-8407c500.md`),
and `In Purchase Order Matching Rules, select an existing rule set under Rule Set Name, and then
click Copy.` (`step-1-create-the-purchase-order-matching-rule-set-4d3866f3.md`).

**Are `access-`/`create-`/`edit-`/`copy-` four pages? No — one page, four verbs.** `create-` and
`copy-` explicitly redirect to the same Step 1 procedure (`To copy an existing PO matching rules
configuration is identical to the procedure in Step 1: Create the Purchase Order Matching Rule Set
in this document.`), and `edit-` operates on a selected row of the list (`In Purchase Order Matching
Set, select the rule set row under Rule Set Name.` / `Click Edit to open Purchase Order Matching
Set.`). This is exactly the Audit Rules situation the project already got right: one page, several
buttons.

**Three-way matching and Receipt Confirmation are NOT separate pages** — both are configured on this
page. `configure-three-way-matching-c043e5c8.md` sends you to `Administration > Invoice > Purchase
Order Matching Rules (left menu)` and then to the `Rules` and `Life to Date` tabs of the editor.
Receipt confirmation likewise: `Receipt confirmation is part of the PO Matching feature set.`
(`overview-8b37481c.md`). Its only external dependency is the Localization tool (Group 6) for the
instructional text.

### 2. Purchase Order Matching Set — WIZARD/DIALOG opened from the page. Medium confidence, with a naming contradiction I am NOT reconciling.
> `Click Edit to open Purchase Order Matching Set.` — `edit-purchase-order-matching-rules-604d1e31.md`
> `In Purchase Order Matching Set, click the Rules tab.` — `step-3-create-the-po-to-request-fields-matching-rules-64eb1c47.md`

It carries two tabs, `Life to Date` and `Rules`. But the same editor stack is named **three
different ways in the same corpus**:
- `Purchase Order Matching Set` (edit- and step-3 topics)
- `Purchase Order Matching Rules` — i.e. the *same string as the list page* — in step 2:
  `In Purchase Order Matching Rules, type a descriptive name for the new rule in Name.`
- `The Purchase Order Matching Rule Group rules window appears.` — `configure-three-way-matching-c043e5c8.md`

I cannot tell from the docs whether that is one modal with a changing header, two nested modals
(set-level then group-level), or three names for two things. **Record all three; do not pick one.**
The step ordering suggests two nesting levels — `select the rule set ... click Edit` opens the set,
then `select a rule group and click Edit Rules` opens the rules window — but the corpus never says so
outright.

### 3. Purchase Order Matching Rules Group Conditions — WIZARD/DIALOG. Medium confidence.
> `In Purchase Order Matching Rules Group Conditions, configure the conditions` — `step-4-add-condition-based-rule-to-a-named-rules-group-db93fb81.md`

Reached only from inside the Matching Set editor (`select the named rule group ... then click Add`).
A named condition builder, sibling in spirit to the Audit Rules Condition page. **Found only by the
content sweep** — the filename contains no PO token, so a filename-only sweep misses it entirely.

### 4. Select Confirmation Type — WIZARD/DIALOG. Low confidence (named once).
> `Do this by clicking Edit Confirmation to open the Select Confirmation Type window` — `step-5-change-localize-receipt-confirmation-type-instructional-text-5328a8e1.md`

Four values (None / Invoice / Receipt Central / Receipt Individual, per `confirmation-types-b4a94761.md`).
One naming only; treat as a dialog on the Matching Rules page, not a page.

### 5. Purchase Order Configuration — ADMIN PAGE (called a "tool"). High confidence.
> `The Purchase Order Configuration tool is available to the Invoice Configuration administrator for setting default information for purchase orders.`
> `To view this tool, click Administration > Invoice > Purchase Order Configuration.` — `use-the-purchase-order-configuration-tool-51009c8c.md`

Group-aware, which is a page-level trait, not a section trait:
> `Each PO configuration you create is based on the Group you select before creating the configuration.` — `purchase-order-configuration-is-group-aware-b603f04b.md`

Its field roster is in `configure-purchase-orders-8128725e.md` (5,956 bytes): PO Number Generation
(Next Sequence, Postfix, 9-char limit), Message to Include on Transmitted Purchase Orders (3200
chars), Default Email Subject / Message When Transmitting Purchase Orders (500 chars), Company
Address, Supporting Documents, Company Branding Logo (upload, 55px × ≤200px, ≤100 KB, png/jpg/gif),
Default Sender Email (prefix before `_DoNotReply`), Fields to Appear on Purchase Orders (with a
Policy list), Ship To Without Requestor Name, Company Name Without Address, Use Email as Bill-To.

**CONTRADICTION — record both:** called a *tool* reached by a click path
(`use-the-purchase-order-configuration-tool-51009c8c.md`) but a *window* in the guide's own revision
history: `Added information about the Company Name without address field in the Purchase Order
Configuration window.` (`purchase-request-and-purchase-order-8b36ae07.md`). A June 2017 **release
note summary** independently uses "tool": `the company address in the Purchase Order Configuration
tool is now optional`
(`concur-invoice-professional-edition-release-note-summaries/june-2017-invoice-professional-edition-admin-summary-262adc6b.md`)
— cited as a release note, for name corroboration only.

**NAME-COLLISION TRAP.** `PO Configuration` is *also* the name of a **section on the Policies page**
(candidate 7). "Purchase Order Configuration" (the tool) and "PO Configuration" (the Policies
section) are different surfaces with near-identical labels. Anyone building from a grep of
"PO Configuration" will conflate them.

### 6. Purchase Order Policy — FEATURE NAME, not a page. High confidence. **This is the resolution of open question #1.**
It is a policy *type* selected by a check box on the already-built Policies page:
> `Is PO Policy: Select this option to define the policy as PO-related.` — `purchase-order-policy-fields-4aa0ac1b.md`
> `The administrator can choose from two policy types:` — `the-standard-and-purchase-order-policy-differences-33e67dc0.md`
> `Payment and PO forms are accessed in Administration >Invoice > Policies.` — `policies-the-purchase-order-policy-new-experience-5a1ba7ef.md`

No click path anywhere in admin-guides reaches a "Purchase Order Policy" page. Every navigation in
the PO-policy family lands on `Policies` or `Forms and Fields`. And the graph already carries the
fields: `field.policies.is-po-policy`, `field.policies.po-matching-ruleset`,
`field.policies.po-header-form`, `field.policies.po-line-item-form`,
`field.policies.po-allocation-form`, `field.policies.enable-concur-receiving`,
`field.policies.is-purchase-request-policy`, `field.policies.external-id`,
`field.policies.bill-to-optional` — all on `page.policies`. **Creating a Purchase Order Policy page
node would repeat the mistake the critic already called out.** The 15,800-byte file is Group 1/5
debt against pages that exist.

### 7. PO Configuration (section on Policies) — TAB/SECTION within `page.policies`. Medium confidence.
> `Select Administration > Invoice > Polices (left menu). The Policies page appears.` (note SAP's own
> "Polices" misspelling) and `In the PO Configuration section of the page that appears, select the
> Enable Concur Receiving option.` — `configure-concur-receiving-1ececc23.md`
Revealed by `Is PO Policy`. Not a page. See the collision warning in candidate 5.

### 8. Purchase Request Configuration (section on Policies) — TAB/SECTION within `page.policies`. Medium confidence.
> `Now the Is Purchase Request Policy check box is exposed and, when selected, displays the Purchase Request Configuration options (forms and workflow selections) as shown in the figure above.` — `policy-c8ec906b.md`
Same shape as candidate 7, revealed by a different check box. A second collision hazard: it looks
like it should be a "Purchase Request Configuration" page and is not.

### 9. Purchase Order Settings / Purchase Request Settings — TAB/SECTION on **Workflows**, not Group 3.
The three sibling topics `invoice-settings-cace748d.md`, `purchase-order-settings-a5a997b4.md` and
`purchase-request-settings-b0bce285.md` all open `The following settings apply globally to …` and
are the three tables on one tab:
> `A setting in Workflows can be used to prevent PO transmission if the PO exceeds a specified exception level.` — `preventing-po-transmittal-when-po-exceeds-specified-exception-level-51b11602.md`
That topic places the setting at `Administration  Invoice  Workflows  Settings tab` (SAP drops the
`>` separators there). **Warning for the Workflows group:** the section on that tab is *itself*
called "Invoice Settings", colliding with the built `page.invoice-settings`. Two other PO settings
also live on Workflows: `Allow employee to automatically transmit Purchase Orders` (Workflows tab)
and `Consolidate all items on a Purchase Request for the same vendor into a single Purchase Order`
(Workflow tab), plus `Administration > Invoice > Workflows > Approval Statuses > Purchase Request`.
**Hand Group D (11 files, 22,810 bytes) to the Workflows group, not Group 3.**

### 10. All Purchase Orders — END-USER / PROCESSOR screen. Not a config page.
> `navigating to the Requests > All Purchase Orders page.` — `concur-receiving-roles-099f375f.md`
It sits on the **Requests** menu, not Administration, and is gated on the Purchase Order Processor /
Purchase Order Processor (Audit) roles. Those roles are assigned in **User Permissions**
(`The User Permissions administrator can assign the following PR-specific roles using the Invoice tab
of User Permissions` — `purchase-request-roles-6dbd7af9.md`), which is Company Administration, not
Invoice admin. A **release note** revision line calls the same thing a list page for "Purchasing
Admins" (`purchase-order-matching-8b351a47.md` revision history, March 2019) — that is a revision
history inside an admin guide, not a nav claim; I record the label discrepancy without resolving it.

### 11. Shipping Configuration — separate tool, PO-domain, explicitly OUT of Group 3.
> `Access this tool by clicking Administration > Invoice > Shipping Configuration, clicking a tab as required.` — `shipping-configuration-and-shipping-terms-3429ee14.md`
Role gate: `Invoice Configuration administrator or Invoice Configuration administrator (Restricted)`.
Reported because it turned up squarely in the PO sweep and the group that owns it will want the
click path and the tab structure.

---

## Ruled out, with where the configuration actually lives

| Rejected surface | Why | Where its config lives |
|---|---|---|
| Concur Receiving / Receiving Admin | Zero corpus hits for a Receiving admin page. Activated by a check box. | `Enable Concur Receiving` on **Policies** (already `field.policies.enable-concur-receiving`) |
| Three-Way Matching | A matching *method*, configured by picking rule types | Rules / Life to Date tabs of **Purchase Order Matching Rules** |
| Receipt Confirmation | A matching *method* + a dialog | **Purchase Order Matching Rules** (`Edit Confirmation`); text in **Localization** (Group 6) |
| Multiple Purchase Order feature | Activated by adding a field to a form | **Forms and Fields** → Payment Request Line Item Details → Form Fields tab |
| Delivery Slip Number (three-way) | A field addition | **Forms and Fields** → Payment Request Header |
| Receipt Type field (PR header) | A field addition | **Forms and Fields** → Purchase Request Header |
| Copy Down PO→PR / PO allocation copy-down | Field property, not a screen | **Forms and Fields** (`Copy Down Only If Empty` in Modify Fields); allocation choice on **Invoice Settings** |
| PO Change Order | A check box | **Invoice Settings** (`Enable Change Order`) |
| Allow PR Owners to Edit / Transmit their own POs | Toggles | **Invoice Settings** |
| Assign invoice to Purchase Request Owner | A toggle | **Invoice Settings** |
| Purchase Order Import / PO Receipt Import / web service | File-format specifications, no UI | No page. 16 files, 40,622 bytes — exclude from the page roster |
| Purchase Request roles / Concur Receiving roles | Role assignment | **User Permissions**, Invoice tab (Company Administration — outside the Invoice admin surface) |
| Enable Purchase Requests | Not self-service | `SAP Concur staff enables the Purchase Request feature.` — a service request |
| PO Processor screens, PR submit/approve, Final Confirmation window, Enter Received Goods window, Matching Summary tab, Purchase Order tab of an opened invoice | End-user / processor day-to-day work | Governed by **Policies** (forms), **Forms and Fields** (fields), **Workflows** (routing), **Purchase Order Matching Rules** (exceptions) |
| Purchase email notification preferences | End-user self-service | **Profile > Profile Settings > Invoice Preferences** |
| Email Notifications for Purchase Requests | Admin, but not PO | **Workflows** → Email Notifications tab |
| Default Shipping / Billing Address | Addresses | **Company Locations** (already built) |
| Punchout / catalog / requisition / supplier portal | **Zero corpus hits** for punchout and catalog; one incidental body use of "requisition" as a synonym for PR | Nothing to build. Do not invent these pages |

---

## What the downstream build should aim at

- **Purchase Order Matching Rules** — 28 files, 67,460 bytes. Richest single files:
  `configure-three-way-matching-c043e5c8.md` (5,689), `step-2-create-the-life-to-date-matching-rule-set-dc296ae6.md`
  (4,921), `purchase-order-matching-rules-new-experience-6c8fb80f.md` (4,804),
  `step-5-change-localize-receipt-confirmation-type-instructional-text-5328a8e1.md` (3,897),
  `step-3-create-the-po-to-request-fields-matching-rules-64eb1c47.md` (3,721),
  `step-4-add-condition-based-rule-to-a-named-rules-group-db93fb81.md` (3,476).
- **Purchase Order Configuration** — 3 files, 8,601 bytes; `configure-purchase-orders-8128725e.md`
  (5,956) carries essentially the whole field roster.
- **Debt to hand back to Groups 1 and 5**, not to build here: the 15,800-byte
  `policies-the-purchase-order-policy-new-experience-5a1ba7ef.md` against `page.policies` and
  `page.forms-and-fields`, plus `configure-forms-and-fields-for-purchase-order-copy-down-to-pr-f926eac7.md`
  (10,109 bytes) against `page.forms-and-fields`.
- **Debt to hand to the Workflows group:** Group D, 11 files, 22,810 bytes.

**If Group 3 turns out to be two pages plus four dialogs, two is the answer.** On admin-guides
evidence alone, that is what the PO area is.

## Cross-corpus note (outside my lane)
`concur-invoice-professional-edition-tools-guides/` has a small PO presence — `Purchase Order
Configuration` appears in `preview-a-purchase-order-846396e1.md` and
`purchase-order-processor-experience-8b507c54.md`; `Purchase Order Matching Rules` in
`match-rules-and-match-status-8cc2c56b.md` and `required-roles-ef2c2901.md`. The tools-guides sweep
owns those; both of my page candidates are corroborated there by name.

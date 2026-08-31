# Group 3 (PO Matching) — Sweep A: Click Paths and Menu Structure

Sweep: **clickpaths**. Corpus: `/mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE`, SAP 2026_08,
Professional Edition, crawled 2026-08-29. Both guide directories swept (1209 + 650 files).
Release notes used only to corroborate a page NAME (one citation, labelled).

---

## HEADLINE

**The PO admin configuration surface, as documented, is TWO pages — not eleven.**

Every documented click path in the PO / purchase order / matching / receiving domain terminates at
exactly one of ten destinations. Eight of those ten are pages **already in the graph or already
assigned to another group**: Policies, Invoice Settings, Forms and Fields, Workflows, Audit Rules,
Localization, Company Locations, Units Of Measure. The only two destinations that are *new* are:

1. **Purchase Order Matching Rules** — `Administration > Invoice > Purchase Order Matching Rules (left menu)`
2. **Purchase Order Configuration** — `Administration > Invoice > Purchase Order Configuration`

That is the whole Group 3 page roster from a click-path direction. Thin is the correct answer here.

**Second finding, structural:** neither PO page is ever documented as hanging off the
`Invoice Processing Admin` middle node. A grep for `Invoice Processing Admin` intersected with
`purchase|matching` returns **0 hits corpus-wide**. Both PO pages are documented as sitting
*directly* under `Administration > Invoice`. This is the opposite of the Group 1/2/5 pattern and
should be treated as a real structural claim, not an abbreviation.

---

## SEARCH LOG (literal commands)

```bash
ROOT=/mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE
A=concur-invoice-professional-edition-admin-guides
T=concur-invoice-professional-edition-tools-guides

# 1. the canonical nav phrase, both spacings
grep -rn  "Administration > Invoice" $A $T | wc -l            # 83
grep -rhno "Administration > Invoice[^.]*"  $A $T | sed 's/^[0-9]*://' | sort | uniq -c | sort -rn
grep -rhno "Administration >Invoice[^.]*"   $A $T | sed 's/^[0-9]*://' | sort | uniq -c | sort -rn

# 2. the middle nav node
grep -rhno "Invoice Processing Admin[^.]\{0,80\}" $A $T | sed 's/^[0-9]*://' | sort | uniq -c | sort -rn
grep -rn "Invoice Processing Admin" $A $T | grep -icE "purchase|matching"    # => 0

# 3. every destination of the form "Invoice > X"
grep -rhno "Invoice > [A-Z][A-Za-z /&-]\{2,45\}" $A $T | sed 's/^[0-9]*://' | sort | uniq -c | sort -rn

# 4. left-menu phrasing narrowed to the PO domain
grep -rhno "[A-Z][^.]\{0,90\}left menu" $A $T | sed 's/^[0-9]*://' | sort -u \
  | grep -iE "purchase|order|receiv|match|po "

# 5. label enumeration
grep -rhno "Purchase Order [A-Z][A-Za-z ]\{0,40\}\(page\|tool\|tab\|screen\|link\|menu\)" $A $T | ...
grep -rhno "Purchase Request[s]* [A-Z][A-Za-z ]\{0,40\}\(page\|tool\|tab\|screen\|link\|menu\)" $A $T | ...

# 6. PO-domain file list (214 files), then all Administration nav inside them
ls $A $T | grep -iE "purchase|po-|-po-|order|match|receiv|receipt" > pofiles.txt   # 214
while read f; do ... grep -Hno "Administration[^.]\{0,90\}" "$d/$f"; done < pofiles.txt | sort -u

# 7. catch-all for destinations named by arrival rather than by click
while read f; do ... grep -ho "The [A-Z][A-Za-z ]\{2,45\}\(page\|tool\|window\) appears" ...; done < pofiles.txt

# 8. UI-variant twins
grep -rl "New Experience)" --include=*.md $A $T | xargs grep -h "^title:" | sort
grep -h "^deliverable:\|^deliverable_id:" <each twin>      # all 41460672

# 9. role gates
grep -rn "Invoice Configuration Administrator" $A/*.md | grep -iE "match|purchase|PO "
grep -rn "Purchase Order Matching Rules" $A/*.md

# 10. release-note corroboration (labelled as release note in the output)
grep -rn "Purchase Order Configuration\|Purchase Order Matching Rules" \
  concur-invoice-professional-edition-release-notes concur-invoice-professional-edition-release-note-summaries

# 11. graph de-dup check
python3 -c "import json;d=json.load(open('output/kg-invoice-config.json'));
[print(x.get('navPath'), x.get('adminGroup')) for x in d['nodes']['configPages']]"
```

Every quote emitted was verified with
`grep -F -c "<quote>" "$ROOT/<sourceFile>"` returning `1` before being written.

---

## THE TWO GROUP 3 PAGES

### 1. Purchase Order Matching Rules  (admin-page, HIGH)

Four distinct click paths, from four distinct files:

| navPath | file |
|---|---|
| `Administration > Invoice` → `Purchase Order Matching Rules` (left menu) | access-purchase-order-matching-rules-8407c500.md |
| `Administration > Invoice > Purchase Order Matching Rules (left menu)` | configure-three-way-matching-c043e5c8.md |
| `Administration > Invoice > Purchase Order Matching Rules` | purchase-order-matching-rules-8b357dbb.md |
| `Administration > Invoice > Purchase Order Matching Rules` | purchase-order-matching-rules-new-experience-6c8fb80f.md |

The two-step form in `access-purchase-order-matching-rules-8407c500.md` is the longest and the
only one that names the arrival ("The Purchase Order Matching Rules page appears"). It also
confirms the page is a **list page** with columns Rule Set Name / In Use / Associated Policies.

**Role gate:** `required-roles-ec6fae13.md` — "Only the user with the Invoice Configuration
Administrator role can access and configure the Purchase Order Matching Rules feature." Corroborated
by `overview-8b35a33f.md` — "Only accessible by users with the Invoice Configuration Administrator role."

**Page-hood reasoning:** it has its own left-menu entry, its own arrival sentence, its own list
grid, its own role gate, and it is not one of the 18. It is a page.

#### Sub-surfaces of this page (recorded, NOT promoted to pages)

The corpus documents a two-level editor beneath the list:

- Select a rule set → **Edit** → opens the rule-set editor, which carries **two tabs: `Rules` and
  `Life to Date`**. This is the Audit Rules pattern (one page, three tabs) — do NOT split.
- Select a named rule group → **Edit Rules** → **"Purchase Order Matching Rule Group rules window"** (dialog).
- Select a named rule group → **Add** → **"Purchase Order Matching Rules Group Conditions"** (dialog,
  referred to elsewhere as the *Condition Editor*).
- **Edit Confirmation** → **"Select Confirmation Type" window** (dialog).

**CONTRADICTION — record both, do not reconcile.** The rule-set editor is named two different ways
in the same 2026_08 corpus:
- `edit-purchase-order-matching-rules-604d1e31.md`: "Click Edit to open **Purchase Order Matching Set**."
- `step-3-create-the-po-to-request-fields-matching-rules-64eb1c47.md`: "In **Purchase Order Matching Set**, click the Rules tab."
- but `step-1-create-the-purchase-order-matching-rule-set-4d3866f3.md`: "In **Purchase Order Matching Rules**, select an existing rule set…"
- and `step-2-create-the-life-to-date-matching-rule-set-dc296ae6.md`: "On the **Purchase Order Matching Rules page**, select the rule set, and then click Edit."

So one topic set calls the editor "Purchase Order Matching Set" and another calls it (or its parent)
"Purchase Order Matching Rules". I cannot tell from the corpus whether "Purchase Order Matching Set"
is a second page, a modal, or simply a sloppy label for the same page in edit mode. **I am not sure**,
and the automation build must resolve this against the live UI.

#### UI-variant twins (outstanding debt, PO area)

| pair | bytes | richer |
|---|---|---|
| `purchase-order-matching-rules-8b357dbb.md` (legacy) | **2,404** | |
| `purchase-order-matching-rules-new-experience-6c8fb80f.md` (New Experience) | **4,804** | **NE, 2.0×** |
| `policies-the-purchase-order-policy-8b35454a.md` (legacy) | **1,490** | |
| `policies-the-purchase-order-policy-new-experience-5a1ba7ef.md` (New Experience) | **15,800** | **NE, 10.6×** |

These are the ONLY two `(New Experience)` twins in the PO domain — verified by
`grep -rl "New Experience)" | xargs grep -h "^title:"`, which returns 8 New Experience titles
corpus-wide, of which exactly these two are PO-domain. Both twins share `deliverable_id: 41460672`,
so the id alone does not distinguish them; the `(New Experience)` title suffix does, and these are
genuine UI variants, not the gerund/imperative republishing trap.

The New Experience PO policy topic (15,800 bytes) is where the PO-specific *policy* fields live
(`Is PO Policy`, `PO Matching Ruleset`, `External ID`, copy-down config). Groups 1–2 were built
from the 1,490-byte stub. **That debt is confirmed and is against the Policies page, not Group 3.**

**Not a UI variant (checked and cleared):** the imperative/imperative pairs
`activate-` vs `activating-the-multiple-purchase-order-feature` (2,418 / 1,521) and
`allow-purchase-request-owners-to-edit-their-own-purchase-orders` 4a3f8202 / 7d79319c (1,400 / 1,366)
all share `deliverable_id: 41460672` and `deliverable_loio: 5d4d01ab…`. Republished content.
Note however that the 7d79319c/292553ec pair says **"toggle (enable)"** where 4a3f8202/636950b7 says
**"Select (enable) … check box"** — a control-type discrepancy on Invoice Settings that the field
build must resolve, but not a separate page.

#### Where the richest material is (aim the real build here)

```
5,689  admin-guides/configure-three-way-matching-c043e5c8.md              ← full 11-step rule procedure
4,921  admin-guides/step-2-create-the-life-to-date-matching-rule-set-dc296ae6.md  ← Life to Date tab roster
4,804  admin-guides/purchase-order-matching-rules-new-experience-6c8fb80f.md
3,897  admin-guides/step-5-change-localize-receipt-confirmation-type-instructional-text-5328a8e1.md
3,721  admin-guides/step-3-create-the-po-to-request-fields-matching-rules-64eb1c47.md  ← Rules tab roster
3,476  admin-guides/step-4-add-condition-based-rule-to-a-named-rules-group-db93fb81.md
2,845  admin-guides/test-and-change-match-rule-sets-49f57319.md
2,699  admin-guides/create-purchase-order-matching-rules-adb700f9.md
2,634  admin-guides/overview-8b35a33f.md
2,404  admin-guides/purchase-order-matching-rules-8b357dbb.md
2,390  admin-guides/conditions-if-portion-of-the-if-then-statement-85743324.md
2,328  admin-guides/match-rules-and-rule-sets-87e69410.md
2,287  tools-guides/when-are-match-rules-run-f835a01e.md
2,214  admin-guides/edit-purchase-order-matching-rules-604d1e31.md
2,093  admin-guides/access-purchase-order-matching-rules-8407c500.md
1,944  admin-guides/exceptions-then-portion-of-the-if-then-statement-6a3d96b1.md
1,445  admin-guides/step-1-create-the-purchase-order-matching-rule-set-4d3866f3.md
1,179  admin-guides/not-possible-to-base-rule-set-on-expense-type-or-account-code-e98c9b2c.md
1,074  admin-guides/activate-exchange-rates-for-matching-rule-sets-c51af31c.md
1,007  admin-guides/copy-purchase-order-matching-rules-c6d4106a.md
  996  admin-guides/required-roles-ec6fae13.md
  830  admin-guides/match-rule-set-per-policy-8b14149d.md
```

---

### 2. Purchase Order Configuration  (separate-tool / admin-page, HIGH)

Two distinct click paths, both terminating at the same destination, from two different guide
directories — which is the strongest kind of attestation this corpus offers:

| navPath | file |
|---|---|
| `Administration > Invoice > Purchase Order Configuration` | admin-guides/use-the-purchase-order-configuration-tool-51009c8c.md |
| `Administration > Invoice > Purchase Order Configuration` | tools-guides/preview-a-purchase-order-846396e1.md |

**Role gate:** "The Purchase Order Configuration tool is available to the Invoice Configuration
administrator" (51009c8c). Same role as PO Matching Rules — noted, because it means the two pages
do NOT differ by gate the way Forms-and-Fields-the-tool differs from Forms-and-Fields-the-tab.

**Alias:** `PO Configuration` (used in tools-guides/preview-a-purchase-order-846396e1.md,
and in a revision-history line of admin-guides/purchase-request-and-purchase-order-8b36ae07.md).

**Group-awareness:** `purchase-order-configuration-is-group-aware-b603f04b.md` — "Each PO
configuration you create is based on the Group you select before creating the configuration."
So the page carries a Group selector as its first control. That is a load-bearing precondition for
any automation: **you cannot set a field on this page without first choosing a Group.**

**Release-note corroboration (RELEASE NOTE — labelled per the brief):**
`release-note-summaries/june-2017-invoice-professional-edition-admin-summary-262adc6b.md` names
"the Purchase Order Configuration tool", independently confirming the page label outside the guides.

**Where the field roster lives:** `configure-purchase-orders-8128725e.md` (**5,956 bytes**) is the
single richest PO-config document in the corpus and is effectively the page's field list — PO Number
Generation (Next Sequence, Postfix), Message to Include on Transmitted Purchase Orders (3200 char),
Default Email Subject / Message When Transmitting Purchase Orders (500 char), Company Address,
Supporting Documents, Company Branding Logo (.png/.jpg/.gif, 55px × ≤200px, ≤100 KB), Default Sender
Email, Fields to Appear on Purchase Orders (+ Policy list), Ship To Without Requestor Name, Company
Name Without Address, Use Email as Bill-To. **Aim the field sweep here.**

```
5,956  admin-guides/configure-purchase-orders-8128725e.md          ← the field roster
3,430  tools-guides/preview-a-purchase-order-846396e1.md
1,474  admin-guides/allowing-automatic-transmittal-of-purchase-orders-0f2e7fae.md
1,466  admin-guides/purchase-order-configuration-is-group-aware-b603f04b.md
1,368  tools-guides/automatically-transmit-purchase-orders-f1b1147c.md
1,179  admin-guides/use-the-purchase-order-configuration-tool-51009c8c.md   ← the nav + role gate
1,146  tools-guides/purchase-order-contact-and-email-address-d5bdbbad.md
```

---

## THE NAME COLLISION — "PO Configuration" MEANS TWO DIFFERENT THINGS

**This is the "Forms and Fields" trap in this area, and it will bite the automation.**

- `Purchase Order Configuration` / `PO Configuration` = the standalone tool at
  `Administration > Invoice > Purchase Order Configuration` (transmittal defaults, branding, PO numbering).
- `PO Configuration` = a **section inside the Policies page**:
  `configure-concur-receiving-1ececc23.md` — "In the PO Configuration section of the page that appears,
  select the Enable Concur Receiving option," reached by
  "Select Administration > Invoice > **Polices** (left menu). The Policies page appears." (note the
  `Polices` misspelling — it is in the corpus and the quote is verbatim).

These are structurally distinct surfaces sharing a label. **Record both. Do not collapse.**
The Policies "PO Configuration" section is a section of a Group 1 page, not a Group 3 page.

---

## RULED OUT — and where each one's configuration actually lives

The PO area is documented far more heavily as end-user procedure than as configuration. Every
rejection below is paired with the page that governs it.

| Rejected surface | Why | Where its config lives |
|---|---|---|
| **Process Purchase Orders** (PO Processor) | End-user/processor. Reached from the `Requests` menu, never `Administration`: "The Purchase Order Processor role clicks Requests > Purchase Requests > Process Purchase Orders." | PO forms in Forms and Fields; PO workflow in Workflows; exception thresholds in Workflows > Settings tab; role assignment in User Administration |
| **Process Purchase Requests** (PR Processor) | Same. "The Purchase Request Processor role clicks Requests > Purchase Requests > Process Purchase Requests." | PR forms in Forms and Fields; PR workflow in Workflows; PR policy in Policies |
| **All Purchase Orders** page | End-user list, `Requests > All Purchase Orders`, gated on PO Processor role | Roles; Policies |
| **Query Builder / Condition Builder** (in PR/PO Processor) | End-user query tool inside the processor screens, reached from `Requests`, not `Administration` | none in Invoice admin — it is a user-owned saved query |
| **Matching Summary tab** | Tab on the PO-based invoice in detail view (end-user), not on an admin page | Line-identification behaviour is `Allow system to associate invoice lines to Purchase Order lines based on data attributes` in **Invoice Settings**; the fields shown are set in **Forms and Fields** |
| **Purchase Order tab** (on an invoice) | End-user invoice-detail tab: "On the Purchase Order tab, click the desired Edit link to edit the PO." | PO form field access in **Forms and Fields** |
| **Invoice Manager** | End-user AP screen, `Invoice > Invoice Manager` | Invoice Settings / Policies |
| **Concur Receiving** | A **feature name**, not a page. Its only documented activation is a checkbox inside Policies. | **Policies → PO Configuration section → `Enable Concur Receiving`** (and the Purchase Order Receipt form is then auto-used from Forms and Fields) |
| **Multiple Purchase Order feature** | Feature name; no screen. Activated by adding a field. | **Forms and Fields** → `Payment Request Line Item Details` → add `Purchase Order Number` |
| **PO Change Order feature** | Feature name; no screen. | **Invoice Settings** → `Enable Change Order` |
| **Three-Way Matching** | A matching *method*, not a page. | **Purchase Order Matching Rules** (Rules tab `Line Item – Receipt`, Life to Date tab `Match against Received Quantity`) + Forms and Fields (`Delivery Slip Number`) + Audit Rules |
| **Purchase Requests (feature enablement)** | Not self-service at all: "SAP Concur staff enables the Purchase Request feature." | SAP Concur support service request |
| **Purchase Order Policy** | A policy **type**, not a page — `Is PO Policy` is a checkbox on the Policies page. | **Policies** (Group 1). Rich source: the 15,800-byte New Experience twin. |
| **PO Import / PO Extract** | File/web-service interfaces. No `Administration > Invoice` click path exists for them anywhere in the corpus. Scheduling is done in the `Import/Extract Administrator` tool, which is outside the Invoice admin menu and is run by SAP Concur staff. | Import/Extract Administrator (out of scope for this graph) |
| **Units Of Measure**, **Company Locations** | Real pages, but **already in the graph** (Group 4 / Group 5). Both are reached in PO topics only as supporting pages. | already built |
| **Peppol Configuration** | Real page (`Administration > Invoice > Invoice Processing Admin > Peppol Configuration`) but explicitly out of Group 3 per the brief | its own unbuilt group |

---

## ONE MORE SURFACE, ASSIGNED ELSEWHERE — Workflows > Settings tab

Three sibling topics with identical structure exist: `Invoice Settings` (cace748d, 4,901 B),
`Purchase Order Settings` (a5a997b4, 1,417 B), `Purchase Request Settings` (b0bce285, 3,735 B) —
each opening "The following settings apply globally to …". **None of them states its own click path.**

They are almost certainly the **Workflows → Settings tab**, not the Invoice Settings admin page:

- `preventing-po-transmittal-when-po-exceeds-specified-exception-level-51b11602.md`: "The setting
  appears in Administration  Invoice  Workflows  Settings tab" — note the crawl has eaten the `>`
  characters, another text trap; the setting named there,
  `Prevent purchase order transmission when exception level exceeds`, is a row in `purchase-order-settings-a5a997b4.md`.
- `general-information-8b3b0308.md` (Workflows guide): "New Settings tab option: Prevent purchase
  order transmissions setting."
- The roster in `invoice-settings-cace748d.md` and the roster in the Group-1 Invoice Settings page
  (`available-invoice-settings-8b3411f0.md`, 8,368 B) **do not overlap**: `grep -c "select their own
  approver" available-invoice-settings-8b3411f0.md` returns **0**, while cace748d leads with it.

**Consequence — a live collision warning:** the label "Invoice Settings" is used in this corpus for
**two different rosters**. One is the Group-1 admin page; the other (cace748d) is a Workflows Settings
tab section. That is exactly the Forms-and-Fields failure mode. Flagging it here because it is
adjacent to the PO settings and I found it while chasing them; the surfaces themselves belong to the
unbuilt **Workflows** group, not Group 3.

---

## HONEST UNCERTAINTIES

1. Is `Purchase Order Matching Set` a distinct screen or the edit mode of the PO Matching Rules page?
   Corpus says both. Unresolvable blind.
2. Does the PO Matching Rules page have tabs at the *list* level, or only inside the rule-set editor?
   Every `Rules` / `Life to Date` tab reference in the corpus appears *after* a `click Edit` step,
   which suggests editor-level, but no topic states it outright.
3. `Purchase Order Settings` / `Purchase Request Settings` have no click path anywhere in 1,859 files.
   The Workflows > Settings tab attribution is inference from a sibling topic, and I have labelled it
   as inference rather than promoting it to a navPath.

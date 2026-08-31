# Sweep E — GRAPHREFS: Group 3 (PO Matching) page roster, re-derived from the existing graph's forward references

Corpus: `/mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE`, SAP 2026_08, Professional Edition, crawled 2026-08-29.
Graph read: `/mnt/c/Users/manci/PROJECTS/concur-config-diver-support/output/kg-invoice-config.json` (v0.5.0, 18 configPages / 437 fields / 335 dependencies / 28 steps / 54 valueSets / 24 contradictions / 10 compressedRanges).

---

## HEADLINE

**The PO configuration surface in this corpus is TWO admin pages, not eleven.** Only two labels in the entire
corpus are given an administrative click path of their own: **Purchase Order Matching Rules**
(`Administration > Invoice > Purchase Order Matching Rules`, the only PO entry in the whole corpus-wide
`(left menu)` inventory) and **Purchase Order Configuration**
(`Administration > Invoice > Purchase Order Configuration`, no `(left menu)` phrasing anywhere).
Everything else the graph's forward references point at is either a dialog inside those two, a control that
lands on an already-built page (Policies, Invoice Settings, Forms and Fields), a Workflows control, an
import file format, or an end-user screen.

Two forward-reference page names in the existing graph — **"Purchase Order Settings"** and **"Purchase Request
Settings"** — are corroborable only as *topic headings*. The strings occur **twice each in the entire corpus,
both times inside their own title/heading**, with no click path, no "page appears", and no cross-reference.
Worse, the single control the graph hangs off "Purchase Order Settings" is placed by a *different* topic on
`Administration > Invoice > Workflows > Settings tab`. That is a live contradiction and it belongs to the
Workflows group, not to Group 3.

One forward-reference page name, **"Supplier Invoice Creation"** (`dep.g4.047.sourceRef`), does not exist as a
surface name anywhere in the corpus. Its only trace is the phrase "supplier invoice creation" inside the
one-sentence blurb of `error-messages-3b8339b0.md`. **That is a previous agent's invention.**

---

## 1. SWEEP E — WHAT THE EXISTING GRAPH POINTS AT

### 1.1 Unresolved dependency endpoints naming PO-area surfaces (ranked by frequency)

Extracted programmatically (`resolved:false` on `sourceRef`/`targetRef`), full ranking of 80+ distinct names;
the PO-relevant ones:

| Endpoint page name in graph | Count | Dep ids | Corpus corroborated? |
|---|---|---|---|
| `Purchase Order Configuration` | 2 | dep.g1.057, dep.g1.058 | **YES** — named as a tool AND with a click path |
| `Purchase Order Import` | 2 | dep.g5g5.029, dep.g5g5.030 | **YES as an import**, NO as an admin page |
| `Purchase Order Matching Rules` | 1 | dep.g1.031 | **YES** — page + left-menu entry |
| `Purchase Order Settings` | 1 | dep.g2.013 | **HEADING ONLY** — 2 corpus hits, both its own title |
| `Purchase Request Settings` | 1 | dep.g2.012 | **HEADING ONLY** — 2 corpus hits, both its own title |
| `PO or Payment Request Import` | 1 | dep.g4.051 | Partly — corpus writes "a PO or Payment Request import" (lowercase i), prose not a page |
| `Supplier Invoice Creation` | 1 | dep.g4.047 | **NO — INVENTED** |
| `Capture Processing (OCR extraction)` → `Policies` (PO policy type) | 1 | dep.g4.018 | Policies is Group 1 (dup) |
| `Policies` (`Purchase Order (PO) policy type`) | 1 | dep.g4.019 | Policies is Group 1 (dup) |
| `Forms and Fields` (`Purchase Order Receipt form`) | 1 | dep.g1.017 | Forms and Fields is Group 5 (dup) |
| `Invoice Settings` (`Assign Invoice to Purchase Request Owner`) | 1 | dep.g4.015/016 | Invoice Settings is Group 1 (dup) |
| `Units Of Measure` | 6 | dep.g4.047/048/051 | Group 4 (dup) |

The five names the brief pre-named were all found; **the sweep found no sixth PO page name in the dependency
endpoints.** That absence is itself the finding: five groups of agents reading this corpus with no roster in
hand produced only these.

### 1.2 ConfigStep sequence entries naming a page not in `configPages`

Programmatic diff of every `configSteps[].pages` and `configSteps[].sequence[].page` against the 18 page names:
**26 distinct off-roster names, ALL of them Audit Rules / Validation Rules wizard artefacts**
(`Custom Rules`, `Conditions`, `Random`, `Validation Rule`, `New Exception`, `Quick View`,
`Create New Custom Audit Rule`, `Custom Audit Rule List`, `Actions`, `Rule Type`, `Administration > Invoice`, …).
**Zero PO-area names.** No ConfigStep touches the PO area at all.

### 1.3 Field NOTES / page identityNotes / verifyNotes mentioning PO, matching, receiving, purchase requests

Fields whose notes name a PO surface, and the page they place it on:

- `field.policies.is-po-policy` — "Master toggle for the PO policy type. Selecting it reveals the PO Configuration options." → the **Policies** page has a *section* called PO Configuration. **This is not the same thing as the Purchase Order Configuration tool** and the graph's own note is one letter away from conflating them.
- `field.policies.po-header-form`, `po-line-item-form`, `po-allocation-form`, `enable-concur-receiving`, `po-matching-ruleset`, `is-purchase-request-policy` — all on **Policies**.
- `field.policies.enable-concur-receiving` — "once activated, the Purchase Order Receipt form in Forms and Fields is automatically used." → configuration lives on **Forms and Fields**.
- `field.policies.po-matching-ruleset` — "Option list is tenant-built in Purchase Order Matching Rules and is not enumerated." → names the Group 3 page.
- `field.invoice-settings.for-purchase-order-based-invoices-from-where-should-the-invo` — on **Invoice Settings**.
- `field.forms-and-fields.copydownfieldpo`, `copydownfrompoifavailable`, `copydownsource`, `connected-list-default-value-type` — all on **Forms and Fields** ("Copy Down from Purchase Order Header", "Purchase Request Details", "Purchase Order Header in the Form Type list").
- `field.company-locations.addresscode` / `modifybutton` / `stateprovince` / `address1` / `emailaddress` / `downloadimporttemplatelink` — all reference the **Purchase Order import** 210/220 record formats as an external identity/format authority. `emailAddress` explicitly: "Consumed by the Purchase Order Header 'Use Email as Bill-To' field configured on Forms and Fields".
- `field.tax-administration.taxvalidationtype` / `requesttypetobeanalyzed` — "The Purchase Request type will be added to this feature in an upcoming service release" — **roadmap, not a present surface.**

No note anywhere in the graph says "configured on X" for an X that is a PO page other than
Purchase Order Matching Rules and Purchase Order Configuration.

### 1.4 ConfigContradictions touching the PO area

Four, all Group 5B and all anchored on **Company Locations**, not on a PO page:
- `contr.g5g5.014` State/Province optional on Company Locations vs Required (Y) in the PO 210/220 import records.
- `contr.g5g5.015` Name required on Company Locations vs optional in the PO import records.
- `contr.g5g5.019` Change vs Edit link label on the ship-to/bill-to change — PR side vs PO side (end-user screens).
- `contr.g5g5.020` "Change Address window" on the purchase order screen vs inline field on the two request-side screens (end-user screens).

None of them is about a PO *admin page*. **The existing graph carries zero recorded contradictions about the
identity of any PO configuration page** — which is exactly the gap this roster has to fill, and I found three
(§4).

---

## 2. THE ROSTER — page-hood verdict per candidate

### 2.1 Purchase Order Matching Rules — **admin-page**, confidence HIGH

The only PO label in the corpus-wide `(left menu)` inventory. I extracted every `(left menu)` phrasing in both
guide directories and ranked it:

```
4 Audit Rules  /  3 List Management  /  3 Invoice Settings  /  2 Workflows  /  2 User Permissions
2 Image Handling  /  2 Group Configurations  /  2 Forms and Fields  /  1 User Administration
1 Purchase Order Matching Rules  /  1 Policies  /  1 Localization  /  1 Invoice Preferences
1 Feature Hierarchies  /  1 Expense Type Import  /  1 Delegate Configurations  /  1 Company Locations
```

Three independent click paths, two of them naming the page object explicitly:
- `Click Purchase Order Matching Rules (left menu). The Purchase Order Matching Rules page appears.` (access-…-8407c500)
- `Admins create these rules by going to Administration > Invoice > Purchase Order Matching Rules.` (both the legacy 8b357dbb and the New Experience 6c8fb80f twin — identical sentence)
- `Click Administration > Invoice > Purchase Order Matching Rules (left menu).` (configure-three-way-matching-c043e5c8)
- `Receipt confirmation is part of the PO Matching feature set.` + configured "by going to Administration Invoice Purchase Order Matching Rules" (overview-8b37481c — note: non-breaking spaces in that path, do not quote it verbatim without `cat -A`).

Role gate, stated twice in two different guide directories:
- admin: `Only the user with the Invoice Configuration Administrator role can access and configure the Purchase Order Matching Rules feature.`
- tools: `Only the Invoice Configuration administrator can access and configure the Purchase Order Matching Rules feature.`

List-page columns (identity evidence, not a field roster): Rule Set Name / In Use / Associated Policies.
Buttons attested on the list page: Copy, Rename, Done, Edit, Add.

Richest material: `step-2-…-dc296ae6.md` (4,921 B, the Life to Date rule table), `step-3-…-64eb1c47.md`
(3,721 B, the Rules tab / Level / Payment Request / Purchase Order / Tolerance procedure),
`step-4-…-db93fb81.md` (3,476 B), `step-5-…-5328a8e1.md` (3,897 B, the Receipt Confirmation types table),
`configure-three-way-matching-c043e5c8.md` (5,689 B), `create-…-adb700f9.md` (2,699 B),
`edit-…-604d1e31.md` (2,214 B), `access-…-8407c500.md` (2,093 B), `copy-…-c6d4106a.md` (1,007 B),
`step-1-…-4d3866f3.md` (1,445 B), plus `confirmation-types-b4a94761.md` (2,556 B).

### 2.2 Purchase Order Configuration — **admin-page**, confidence HIGH

`The Purchase Order Configuration tool is available to the Invoice Configuration administrator for setting
default information for purchase orders.` and `To view this tool, click Administration > Invoice > Purchase
Order Configuration.` (use-the-…-51009c8c, 1,179 B).

Independently corroborated from the *tools* directory:
`the Invoice Configuration administrator uses the Purchase Order Configuration tool (Administration > Invoice >
Purchase Order Configuration)` and `Administrators who configure purchase orders in PO Configuration`
(preview-a-purchase-order-846396e1, 3,430 B) — and by a **release note**:
`Company Address in PO Configuration Now Optional` /
`the company address in the Purchase Order Configuration tool is now optional`
(release-note-summaries/june-2017-invoice-professional-edition-admin-summary-262adc6b.md).

Group scoping, which is the ordering constraint the graph already recorded twice:
`Each PO configuration you create is based on the Group you select before creating the configuration.` and
`Groups with no PO configuration assigned use the Global Group configuration by default.`

The content page is `configure-purchase-orders-8128725e.md` (5,956 B) — nine named sections
(PO Number Generation, Message to Include on Transmitted Purchase Orders, Default Email Subject / Message,
Company Address, Supporting Documents, Company Branding Logo, Default Sender Email, Fields to Appear on
Purchase Orders). **That file is where the real field build should be aimed.** It carries a Policy list, a
header/line-item field picker, and three named header fields (Ship To Without Requestor Name, Company Name
Without Address, Use Email as Bill-To) — the last of which depends on Forms and Fields and Company Locations.

### 2.3 Purchase Order Matching Set — **wizard-or-dialog**, confidence MEDIUM

The rule-set editor opened from the Purchase Order Matching Rules list. Attested as a named surface with tabs:
- `Click Edit to open Purchase Order Matching Set.` and `In Purchase Order Matching Set, select the rule set row under Rule Set Name.` (edit-…-604d1e31)
- `In Purchase Order Matching Set, click the Rules tab.` (step-3-…-64eb1c47)
Tabs attested: **Life to Date**, **Rules**.

**I am flagging this as a dialog, not a page, and I am not certain.** It has no click path from Administration;
it is only ever reached by selecting a row and clicking Edit on the list page. If the real build finds it has
its own URL it should be promoted. What is certain is that it is a *distinct surface* with its own tab strip,
and that the corpus names it three different ways (§4.1).

### 2.4 Purchase Order Matching Rules Group Conditions — **wizard-or-dialog**, confidence LOW-MEDIUM

`In Purchase Order Matching Rules Group Conditions, configure the conditions that the system will detect`
(step-4-…-db93fb81, the ONLY file in the corpus containing this string). Reached by selecting a named rule
group and clicking **Add**; has an **Insert** button and a **Save**; then **Edit Rules** and **Update**.
One file, one sentence — thin, and I am reporting it as thin rather than inflating it.

### 2.5 Select Confirmation Type — **wizard-or-dialog**, confidence LOW-MEDIUM

`Do this by clicking Edit Confirmation to open the Select Confirmation Type window, choosing a confirmation
type based on the rule group.` (step-5-…-5328a8e1, only file). Four options (None / Invoice / Receipt Central /
Receipt Individual) enumerated in `confirmation-types-b4a94761.md`. Note the same topic then hands the *text*
of these confirmations to **Localization** (`Click Localization (left menu).`) — which is Group 6, not Group 3.

### 2.6 Purchase Order Settings — **unclear**, confidence LOW — AND A CONTRADICTION

`grep -rlF "Purchase Order Settings"` over both guide directories returns exactly ONE file:
`purchase-order-settings-a5a997b4.md` (1,417 B), with 2 line hits — its own front-matter title and its own H1.
No click path. No "page appears". No cross-reference from any other topic.

Its body reads as a page: `The following settings apply globally to purchase orders (PO).` followed by a
Setting/Description table — structurally identical to `invoice-settings-cace748d.md`, which IS the already-built
Invoice Settings page.

But its single documented control is placed elsewhere by a different topic:
`A setting in Workflows can be used to prevent PO transmission if the PO exceeds a specified exception level.`
(preventing-po-transmittal-…-51b11602) — and that topic then gives the path as
`Administration ‹nbsp› Invoice ‹nbsp› Workflows ‹nbsp› Settings tab` (non-breaking spaces; do not quote raw).

**Verdict: most likely a section heading of the Invoice Settings guide, and the control itself lives on
Workflows > Settings tab. It should NOT get a page node in Group 3.** If a page node is created it will be the
"label with zero corpus hits" mistake again, one step removed.

### 2.7 Purchase Request Settings — **unclear**, confidence LOW

Identical shape: one file, `purchase-request-settings-b0bce285.md` (3,735 B), 2 hits, both its own title/H1.
`The following settings apply globally to purchase requests (PR).`

Its three settings are all cross-placed elsewhere in the corpus:
- "Allow users to select their own approver for purchase requests" — its own description sends the reader to
  the **Edit Workflow page** and the **Add/Edit Workflow Steps page** and to **User Administration**.
- "Display purchase request approval links to approvers on the home page" — home-page behaviour.
- "Prevent purchase request submission when exception level exceeds X" — the PR twin of the PO control above.

Meanwhile every *procedural* PR/PO setting topic in the corpus routes to **Invoice Settings**:
`Click Invoice Settings (left menu). The Invoice Settings page appears.` (×2, the Allow-PR-Owners topics),
`On the Invoice Settings page, toggle (enable) the Allow Purchase Request Owners to Edit their own Purchase
Orders option.`, `To activate this feature, admin needs to use the Invoice Settings tool by selecting
(enabling) the Enable Change Order check box.`, `the client must (select) enable the Allow system to associate
Invoice lines to Purchase Order lines based on data attributes option on the Invoice Settings page.`

**Verdict: same as 2.6 — heading, not page.** Its controls belong to Invoice Settings (Group 1) and Workflows.

### 2.8 Purchase Order Import — **separate-tool**, NOT an admin page, confidence MEDIUM

The name is real and is corroborated by a **release note**
(`Updates to the PO line item quantity are now tracked when POs are imported using the Purchase Order Import
tool or from an API.` — release-note-summaries/july-2023-…-46806acf.md), and the graph's two Company Locations
edges to it are sound. But the corpus gives it no admin UI:
- `Purchase orders are imported into Concur Invoice using one of two methods:` — overnight FTP job, or the
  Concur Connect "Purchase Order" web service API (po-import-8b4f981e, 1,837 B).
- `Purchase orders are imported into Concur Invoice using the Concur Connect` … "the user accesses the service
  by clicking Concur Connect on the Invoice menu" (purchase-order-import-web-service-8b355806, 1,815 B).
- The setup process lists it as `Purchase Order Import – Web Service` (purchase-order-setup-process-9f253ce7).
- Import Now file-naming convention: `poinvoiceimportnow_EntityID_Date` (import-now-naming-convention-8ce2f03a).
- Record-format specs: 200 header (6,965 B), 300 line item (4,960 B), 400 allocation (1,940 B),
  210 bill-to (2,455 B), 220 ship-to (2,454 B).

**No click path exists.** `Import/Extract Administrator` is named 20× in the corpus but **never** in connection
with the PO import. Model it as an import specification, not as a Group 3 page.

---

## 3. RULED OUT — and where each one's configuration actually lives

| Rejected surface | Why | Config lives on |
|---|---|---|
| Purchase Order Policy / PO policy | A policy TYPE on the already-built Policies page. `Payment and PO forms are accessed in Administration >Invoice > Policies.` (note the missing space) | **Policies** (Group 1) — DUPLICATE |
| Purchase Request Configuration | A revealed option group, not a page: `Now the Is Purchase Request Policy check box is exposed and, when selected, displays the Purchase Request Configuration options (forms and workflow selections)` | **Policies** (Group 1) |
| PO Configuration (section) | Section *on the Policies page*: `In the PO Configuration section of the page that appears, select the Enable Concur Receiving option.` NOT the Purchase Order Configuration tool | **Policies** (Group 1) |
| Concur Receiving | Feature toggle, not a page. `Select Administration > Invoice > Polices (left menu). The Policies page appears.` (the "Polices" misspelling trap, verbatim) | **Policies** → Enable Concur Receiving; form on **Forms and Fields** |
| Multiple Purchase Order feature | Feature name. `The administrator activates the Multiple Purchase Order feature by adding the Purchase Order Number field to the Payment Request Line Item Details form in the Forms and Fields tool.` | **Forms and Fields** (Group 5) |
| PO Change Order | Feature name. `To activate this feature, admin needs to use the Invoice Settings tool by selecting (enabling) the Enable Change Order check box.` | **Invoice Settings** (Group 1) |
| Line Identification for PO Matching | Feature name. `…the Allow system to associate Invoice lines to Purchase Order lines based on data attributes option on the Invoice Settings page.` | **Invoice Settings** (Group 1) |
| Delivery Slip Number / Receipt Type / receipt custom fields | Field-add procedures. `Admins can make the custom fields required by selecting (enabling) the Required check box in the Add/Modify Form Fields window in the Forms and Fields tool.` | **Forms and Fields** (Group 5) |
| Automatic PO transmittal / Consolidate items for same vendor / PR email notifications | Workflow settings and tabs | **Workflows** (own group, 13 pages) |
| Receipt Confirmation instructional text | `Click Localization (left menu).` | **Localization** (Group 6) |
| Purchase Request roles / Concur Receiving roles | `The User Permissions administrator can assign the following PR-specific roles using the Invoice tab of User Permissions` | **User Permissions** (not Group 3) |
| Purchase Order tab / Matching Summary tab | END-USER invoice detail tabs. `Concur Invoice is an invoice-based system, aimed at creating and routing invoices. It does not create and route purchase orders.` | Field access on **Forms and Fields**; matching behaviour on **Purchase Order Matching Rules** |
| PR & PO Processor, All Purchase Orders, Process Purchase Orders | END-USER / processor screens. `The Purchase Order Processor role clicks Requests > Purchase Requests > Process Purchase Orders.` | Roles on **User Permissions**; PO defaults on **Purchase Order Configuration** |
| PO Extract | Overnight job set up with SAP Concur staff; no UI | n/a |
| Supplier Invoice Creation | **INVENTED by a previous agent.** Zero corpus hits as a surface name; only "supplier invoice creation" in the blurb of error-messages-3b8339b0.md | n/a — the edge's real subject is the Units Of Measure list |

---

## 4. CONTRADICTIONS TO RECORD (none of these are in the graph today)

**4.1 The matching-rule editor has three names in three topics.**
- `Click Edit to open Purchase Order Matching Set.` (edit-…-604d1e31)
- `In Purchase Order Matching Rules, type a descriptive name for the new rule in Name.` — step-2 calls the
  *editor* by the *list page's* name (step-2-…-dc296ae6)
- `The Purchase Order Matching Rule Group rules window appears.` (configure-three-way-matching-c043e5c8)
Do not reconcile. A crawler probing for "Purchase Order Matching Set" will miss it if the live label is
"Purchase Order Matching Rule Group".

**4.2 Purchase Order Configuration: "tool" vs "window".**
- `The Purchase Order Configuration tool is available to the Invoice Configuration administrator…`
- `Added information about the Company Name without address field in the Purchase Order Configuration window.`
  (revision history of purchase-request-and-purchase-order-8b36ae07)
A tool with a left-menu-style path vs a modal window. Unresolved.

**4.3 "Prevent purchase order transmission when exception level exceeds" is on two different surfaces.**
- Grouped under the heading "Purchase Order Settings" with `The following settings apply globally to purchase orders (PO).`
- Placed by another topic on Workflows: `A setting in Workflows can be used to prevent PO transmission if the PO exceeds a specified exception level.`
This one matters to Group 3's *scope*: it argues the whole "PO Settings / PR Settings" pair belongs to
Workflows + Invoice Settings, not here.

---

## 5. NEW EXPERIENCE TWINS IN THE PO AREA — the outstanding debt, measured

There are only **five** `*-new-experience-*` files in the entire corpus, and **three** of them are PO-area or
PO-adjacent. Both PO twins share `deliverable_id: 41460672` with their legacy partner (so these ARE UI-variant
topics, not gerund/imperative republications).

| Legacy | bytes | New Experience | bytes | Ratio | Richer |
|---|---:|---|---:|---:|---|
| `policies-the-purchase-order-policy-8b35454a.md` | **1,490** | `policies-the-purchase-order-policy-new-experience-5a1ba7ef.md` | **15,800** | 10.6× | **New Experience** |
| `purchase-order-matching-rules-8b357dbb.md` | **2,404** | `purchase-order-matching-rules-new-experience-6c8fb80f.md` | **4,804** | 2.0× | **New Experience** |

**The 1,490-byte stub is exactly the file the brief flags as Groups 1–2 debt.** Confirmed: the legacy topic is
three paragraphs and stops. The 15,800-byte New Experience twin contains, in addition: Special Attributes of
the PO Policy; the PO form-field notes (Read & Write access to Purchase Order Number makes it required); the
three PO policy fields (Is PO Policy / PO Matching Ruleset / External ID); the whole **Configure Forms and
Fields for Purchase Order Copy Down to PR** section including the **Copy Down Only If Empty** option; the
**PO Header / PO Line Item / PO Distributions** copy-down source table (Custom 1–24 header, Custom 1–20 line
item, Distributions = "No Configuration / Not a 'Source' choice"); the Multiple Purchase Order activation
procedure; the Delivery Slip Number note; and the Change-the-PO-Policy constraint. **It is Policies-page
content, so paying this debt is a Group 1 patch, not a Group 3 build** — but the roster should say so out loud.

The Matching Rules NE twin adds: the Test/Change naming-convention guidance, the "Unlock a Matching Rule Set
From Its In-Use Status" procedure (via the **Change to Non PO Invoice** option in the Actions menu), and the
Activate Exchange Rates note. Same click path in both — **the NE twin is a content superset, not a different
UI**, which is worth recording because it means "(New Experience)" in a title here does not reliably signal a
second UI variant.

Gerund/imperative pairs checked and **rejected as UI variants** (identical `deliverable_id: 41460672` and
`deliverable_loio`): `activate-` vs `activating-the-multiple-purchase-order-feature`,
`allow-purchase-request-owners-to-edit-…` ×2, `allow-…-transmit-…` ×2,
`purchase-order-line-identification-8b356b0e` vs `line-identification-for-purchase-order-matching-3c7c8336`,
`what-the-purchase-order-processor-sees` ×2, `vendor-lookup-matching-criteria` ×2.

---

## 6. RELEASE-NOTE SWEEP (labelled: release notes are NOT a field/value source)

138 release-note files + 233 summaries. Hits for PO page names:
- **`Purchase Order Configuration`** — 1 file: `june-2017-…-admin-summary-262adc6b.md` ("Company Address in PO Configuration Now Optional"). Corroborates both the tool name and the "PO Configuration" short form, and dates a field change to June 2017.
- **`Purchase Order Import`** — 1 file: `july-2023-…-admin-summary-46806acf.md` ("the Purchase Order Import tool or from an API"), corroborating the *name* only.
- **`Concur Receiving`** — 2 files (Nov 2016 "Concur Receiving Now Available"; June 2017 Central Receiving permission role). Dates the feature, not a page.
- **`Purchase Order Matching Rules`** — **ZERO hits.** The corpus's single most-attested Group 3 page has no release-note trace at all.
- **`Purchase Order Settings` / `Purchase Request Settings`** — **ZERO hits.**
- **`New Experience`** — **ZERO hits in either release-note directory.** No announcement dates the PO New
  Experience topics. The UI-variant claim rests entirely on the guide titles.

---

## 7. WHERE TO AIM THE REAL BUILD

1. `configure-purchase-orders-8128725e.md` (5,956 B) — the entire Purchase Order Configuration field surface.
2. `step-2-…-dc296ae6.md` (4,921 B) + `step-3-…-64eb1c47.md` (3,721 B) + `configure-three-way-matching-c043e5c8.md` (5,689 B) — the Life to Date / Rules tab controls, tolerance model, and Level value set.
3. `step-5-…-5328a8e1.md` (3,897 B) + `confirmation-types-b4a94761.md` (2,556 B) — the Receipt Confirmation type value set.
4. `step-4-…-db93fb81.md` (3,476 B) — condition-based rule groups.
5. **Group 1 patch, not Group 3:** `policies-the-purchase-order-policy-new-experience-5a1ba7ef.md` (15,800 B).

---

## 8. SEARCH LOG (literal commands)

```bash
python3 -c "import json; d=json.load(open('/mnt/c/Users/manci/PROJECTS/concur-config-diver-support/output/kg-invoice-config.json')); ..."   # meta, node counts, schema
# unresolved dependency endpoints ranked
python3 -c "...for dep in n['configDependencies']: for side in ('sourceRef','targetRef'): if r.get('resolved') is False: c[r.get('page')]+=1..."
# ConfigStep pages not in configPages
python3 -c "...for s in n['configSteps']: for pg in s.get('pages',[])+[e.get('page') for e in s['sequence']]: if pg not in pages: ..."
# field notes / page identityNotes / contradictions regex sweep
python3 -c "...pat=re.compile(r'purchase order|purchase request|PO match|receiv|\bPO\b|matching rule', re.I)..."

cd /mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE
ls -la concur-invoice-professional-edition-{admin,tools}-guides | grep -Ei 'purchase|receiv|matching|-po-|requisition|goods'
grep -rlF "Purchase Order Matching Set" concur-invoice-professional-edition-{admin,tools}-guides
grep -rliF "Receipt Confirmation" concur-invoice-professional-edition-{admin,tools}-guides
grep -rnF "The following settings apply globally" concur-invoice-professional-edition-{admin,tools}-guides
grep -rnF "Import/Extract Administrator" concur-invoice-professional-edition-{admin,tools}-guides
grep -rnE "Administration ?> ?Invoice ?> ?(Purchase|PO)|left menu" concur-invoice-professional-edition-{admin,tools}-guides | grep -iE "purchase|po |receiv"
grep -rhoE "Click [A-Z][A-Za-z /&'-]{2,45} \(left menu\)|Select [A-Z][A-Za-z /&'-]{2,45} \(left menu\)" concur-invoice-professional-edition-{admin,tools}-guides | sort | uniq -c | sort -rn
grep -rhoE "[A-Z][A-Za-z ]{3,40} (tool|page|window) (is used|appears|enables|provides)" concur-invoice-professional-edition-{admin,tools}-guides | sort -u
for t in "Purchase Request Settings" "Purchase Order Settings" "Purchase Order Configuration" "Purchase Order Matching Rules" "Purchase Order Import" "Concur Receiving" "PO Configuration" "Purchase Request Configuration" "Select Confirmation Type" "All Purchase Orders" "PO Change Order"; do grep -rlF "$t" concur-invoice-professional-edition-{admin,tools}-guides; done
ls concur-invoice-professional-edition-{admin,tools}-guides | grep -i 'new-experience'
grep -rl "New Experience" concur-invoice-professional-edition-{admin,tools}-guides
for f in ...; do echo "$f $(wc -c < $f) $(grep '^deliverable_id' $f)"; done
grep -rlF "<term>" concur-invoice-professional-edition-release-note{s,-summaries}
grep -rniE "purchase order (tool|page|admin)|PO Configuration|matching rules" concur-invoice-professional-edition-release-note{s,-summaries}
cat -A preventing-po-transmittal-when-po-exceeds-specified-exception-level-51b11602.md   # non-breaking-space check
# grounding: every quote verified before emit
grep -F -c "<quote>" "<file>"   # run on all 53 candidate quotes; 2 initial failures (nbsp / curly apostrophe) replaced with shorter verified substrings
```

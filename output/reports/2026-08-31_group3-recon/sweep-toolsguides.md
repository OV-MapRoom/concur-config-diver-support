# Group 3 (PO Matching) — Page-Identity Recon — SWEEP C: TOOLS-GUIDES

Corpus: /mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE (SAP 2026_08, Professional Edition, crawled 2026-08-29).
Entry direction: `concur-invoice-professional-edition-tools-guides/` (650 files) exhausted FIRST, then admin-guides.
All sourceFile paths below are `<guide-dir>/<filename>.md` relative to that root. Every quote grep -F verified.

---

## HEADLINE

**The PO configuration surface is TWO admin pages, not eleven.** The entire corpus — both guide
directories plus release notes — publishes exactly two PO-specific labels reachable from
`Administration > Invoice`: **Purchase Order Matching Rules** and **Purchase Order Configuration**.
Everything else that reads like a PO config surface is either (a) a section/option on a page already
in the graph (Policies, Invoice Settings, Forms and Fields, Workflows, Group Configurations,
Company Locations, Exceptions, Audit Rules), (b) an end-user or back-office processing screen under
the **Requests** menu, or (c) a file specification with no screen at all.

Thin is the answer. Six was the optimistic floor in the brief; the tools-guides sweep lands on **two
pages plus two nested editors**.

---

## WHAT I SEARCHED

Full `ls` of tools-guides (650 filenames read by eye, not sampled). 183 files contain
`purchase order|purchase request|po-based|three-way|match rule|matching`; I ranked them by PO
density and read every file above ~5 mentions plus every file whose *name* named a PO surface, a
role, a permission, an overview, a prerequisite, or an import/extract. Then I ran the same sweep
over admin-guides for cross-checking and to settle page names the tools guides only gesture at.

Structural greps run corpus-wide:
- `Administration ?> ?Invoice…` (and the no-space `Administration >Invoice` trap)
- `… (left menu)` label harvest in both directories
- `[A-Z]… (page|tool|window|tab)` noun harvest in both directories
- targeted greps: `Purchase Order Configuration`, `PO Configuration`, `Purchase Order Matching Rules`,
  `Purchase Order Import`, `Import Now`, `All Purchase Orders`, `Receipt Confirmation`,
  `Purchasing Admin`, `apply globally to`
- `new-experience` filename sweep across both directories

Zero `.asp` URLs corpus-wide, as expected. **Click path is the only navigation knowledge for Group 3.**

---

## THE LEFT-MENU HARVEST (the load-bearing result)

`… (left menu)` across BOTH directories yields this complete set of Invoice admin labels:
Attendees, Workflows, Forms and Fields, Audit Rules, Tax Administration, List Management,
Group Configurations, Invoice Settings, Image Handling, User Permissions, Site Settings, Policies
(and the misspelt **Polices**), Localization, Delegate Configurations, Company Locations,
Expense Type Import, Vendor Search Admin, Feature Hierarchies, User Administration —
**and exactly one PO label: `Purchase Order Matching Rules`.**

`Purchase Order Configuration` never appears with `(left menu)`; it appears only as a full path
(`Administration > Invoice > Purchase Order Configuration`) and is always called a **tool**, never a
**page** — zero corpus hits for the string "Purchase Order Configuration page".

---

## CANDIDATE 1 — Purchase Order Matching Rules  (admin page, HIGH confidence)

The only PO surface the corpus explicitly calls a *page* and reaches by a *left-menu click*.

- `Click Purchase Order Matching Rules (left menu). The Purchase Order Matching Rules page appears.`
  — admin-guides/access-purchase-order-matching-rules-8407c500.md (2,093 B), preceded by `Click Administration > Invoice.`
- `Admins create these rules by going to Administration > Invoice > Purchase Order Matching Rules.`
  — appears VERBATIM in BOTH twins (8b357dbb 2,404 B and the New Experience 6c8fb80f 4,804 B).
- `Click Administration > Invoice > Purchase Order Matching Rules (left menu).`
  — admin-guides/configure-three-way-matching-c043e5c8.md (5,689 B).
- Role gate, stated twice and consistently:
  - tools-guides/required-roles-ef2c2901.md (2,711 B): `Only the Invoice Configuration administrator can access and configure the Purchase Order Matching Rules feature.`
  - admin-guides/required-roles-ec6fae13.md (996 B): `Only the user with the Invoice Configuration Administrator role can access and configure the Purchase Order Matching Rules feature.`

**Tools-guides never gives the click path** — it only cross-references the setup guide
(`refer to _Purchase Order Matching Rules_` in match-rules-and-match-status-8cc2c56b.md). This page is
therefore an admin-guides-anchored page that tools-guides corroborates on role and behaviour only.

### The "(New Experience)" twin is NOT a second page
`purchase-order-matching-rules-new-experience-6c8fb80f.md` (4,804 B) vs
`purchase-order-matching-rules-8b357dbb.md` (2,404 B). Diffed: the first ~2.4 KB is byte-identical
prose including an **identical nav path**. The extra 2.4 KB is *Before You Begin* material
(test/change rule sets, unlocking an In-Use rule set, exchange rates) republished under the New
Experience heading — content that also exists standalone as test-and-change-match-rule-sets-49f57319.md
(2,845 B) and activate-exchange-rates-for-matching-rule-sets-c51af31c.md (1,074 B).
**Verdict: one page, two topic republications. Do not split.** The richer file is the New Experience
one and Group 3 should be built from it.

### Nested editors — a REAL naming contradiction, do not reconcile
The rule-set editor opened from this page is given **three different names** in the same 2026_08 corpus:
- `Click Edit to open Purchase Order Matching Set.` — edit-purchase-order-matching-rules-604d1e31.md (2,214 B)
- `In Purchase Order Matching Set, click the Rules tab.` — step-3-…-64eb1c47.md (3,721 B)
- `In Purchase Order Matching Rules, type a descriptive name for the new rule in Name.` — step-2-…-dc296ae6.md (4,921 B)
- `The Purchase Order Matching Rule Group rules window appears.` — configure-three-way-matching-c043e5c8.md (5,689 B)

It carries at least two tabs: **Life to Date** and **Rules**
(`Click the Life to Date tab, then select the check box next to the rule type to activate using the table below:`;
tools-guides corroborates the Rules tab independently:
`Both options are available to the Invoice administration on the Rules tab when configuring the matching rule set.`
— how-to-deal-with-exceptions-using-matching-rules-options-171867ad.md, 1,597 B).

A further dialog nests one level deeper:
`In Purchase Order Matching Rules Group Conditions, configure the conditions that the system will detect`
— step-4-add-condition-based-rule-to-a-named-rules-group-db93fb81.md (3,476 B).

**My judgement: ONE page (Purchase Order Matching Rules) with a nested rule-set editor (tabbed) and a
nested condition dialog** — structurally the Audit Rules pattern, not the Forms-and-Fields pattern.
But the *name* of the editor is genuinely contradictory in the source and must be recorded as such,
not tidied. An automation driver will need all four strings.

**Where the field richness is** (aim the real build here, do not extract now):
step-2-…-dc296ae6.md 4,921 B (Life to Date tab: Gross Amount, Net Amount, Line Item Total, Line Item
Quantity, Match against Received Quantity, Line Item Tax + Value/Currency/Percentage tolerance +
Exception Message + Allow Submit/Approve); step-3-…-64eb1c47.md 3,721 B (Rules tab: Level =
Header/Vendor/Line Item/Line Item - Receipt, Payment Request list, Purchase Order list, Tolerance =
None/Within/Custom); configure-three-way-matching-c043e5c8.md 5,689 B (three-way specifics);
step-4-…-db93fb81.md 3,476 B (condition groups); access-…-8407c500.md 2,093 B (list columns:
Rule Set Name, In Use, Associated Policies).

---

## CANDIDATE 2 — Purchase Order Configuration  (admin page/tool, HIGH confidence)

**This is the candidate the tools-guides sweep exists to protect.** It surfaced first in
tools-guides, not admin-guides — same shape as the Vendor Search Admin near-miss.

- tools-guides/preview-a-purchase-order-846396e1.md (3,430 B):
  `the Invoice Configuration administrator uses the Purchase Order Configuration tool (Administration > Invoice > Purchase Order Configuration)`
  and `Administrators who configure purchase orders in PO Configuration`
- admin-guides/use-the-purchase-order-configuration-tool-51009c8c.md (1,179 B):
  `The Purchase Order Configuration tool is available to the Invoice Configuration administrator for setting default information for purchase orders. To view this tool, click Administration > Invoice > Purchase Order Configuration.`
- Group-aware, like Group Configurations-scoped surfaces:
  `Each PO configuration you create is based on the Group you select before creating the configuration.`
  — admin-guides/purchase-order-configuration-is-group-aware-b603f04b.md (1,466 B); tools-guides carries
  the same heading verbatim inside purchase-order-processor-experience-8b507c54.md (1,506 B).
- **Release-note corroboration (labelled as a release note):**
  release-note-summaries/june-2017-invoice-professional-edition-admin-summary-262adc6b.md —
  `the company address in the Purchase Order Configuration tool is now optional`.

**Where the field richness is:** admin-guides/configure-purchase-orders-8128725e.md (**5,956 B**) is
the field roster for this page and nothing in the graph cites it yet. Sections named there:
PO Number Generation (Next Sequence, Postfix, 9-char limit), Message to Include on Transmitted
Purchase Orders (3,200 chars), Default Email Subject When Transmitting Purchase Orders (500 chars,
token tooltip), Default Email Message When Transmitting Purchase Orders, Company Address,
Supporting Documents (upload/view/remove), Company Branding Logo (.png/.jpg/.gif, 55px high, ≤200px
wide, ≤100 KB, one per invoice group), Default Sender Email (prefix only; suffix fixed to
`_DoNotReply@ConcurSolutions.com`), Fields to Appear on Purchase Orders (header + line, Policy list),
Ship To Without Requestor Name, Company Name Without Address, Use Email as Bill-To.

**Page-hood reasoning:** own full click path off `Administration > Invoice`, own role gate, own
group scoping, own settings that appear nowhere else. Called a **tool** everywhere and a **page**
nowhere — same lexical habit as "Vendor Manager tool" and "Company Locations tool". I treat it as a
page; I flag the label as *tool* so the roster records the corpus's own word.

**Naming collision to record, not reconcile:** `PO Configuration` denotes BOTH this standalone tool
(tools-guides/preview-a-purchase-order-846396e1.md) AND a *section on the Policies page*
(`In the PO Configuration section of the page that appears, select the Enable Concur Receiving option.`
— admin-guides/configure-concur-receiving-1ececc23.md, 1,712 B). Two different surfaces, one short
label. This is exactly the "Forms and Fields" trap in a new costume.

**Dangling cross-reference (corpus defect):** tools-guides/preview-a-purchase-order-846396e1.md says
`refer to the Using the Purchase Order Configuration Tool section in this document`, but the crawled
tools-guides directory contains no such topic — it exists only in admin-guides
(use-the-purchase-order-configuration-tool-51009c8c.md). Sibling topic
purchase-order-processor-experience-8b507c54.md correctly points at the *Purchase Request and Purchase
Order Setup Guide* instead. Worth knowing if a future crawl gap is suspected.

---

## SETTLED: "Purchase Order Import" is NOT a page — it is a file specification + scheduled job

The graph carries two unresolved forward references to a "Purchase Order Import" page
(dep.g5g5.029, dep.g5g5.030, from Company Locations `addressCode` ↔ import `External ID`).
Evidence says **no page node should ever be created**:

- tools-guides/po-import-8b4f981e.md (1,837 B): `Purchase orders are imported into Concur Invoice using one of two methods:`
  → `Overnight Purchase Order Import:` (client/SAP-scheduled FTP job) and the Concur Connect web-service API.
  The only UI touch documented is `the user accesses the service by clicking Concur Connect on the Concur Invoice menu.`
  — the Concur Connect module, not an Invoice admin page. admin-guides/purchase-order-import-web-service-8b355806.md
  (1,815 B) repeats it as `…clicking Concur Connect on the Invoice menu.`
- Triggering an immediate run is done by **file naming on FTP**, not by a button:
  `PO Import: poinvoiceimportnow\_EntityID\_Date` — admin-guides/import-now-naming-convention-8ce2f03a.md (1,816 B).
- The record layout lives in a **specification document**, not a screen:
  admin-guides/concur-invoice-purchase-order-import-specification-8b443eee.md (3,404 B) with record-type
  children — 200 request header (6,965 B), 300 line item (4,960 B), 210 bill-to (2,455 B),
  220 ship-to (2,454 B), 400 line-item allocation (1,940 B), PO receipt header 200 (3,145 B).
- Corpus-wide, `Purchase Order Import` never co-occurs with `(left menu)`, `Administration >`, or `page`.

**Recommendation:** resolve dep.g5g5.029/030 by pointing the endpoint at an *import specification*
node type (or leaving it unresolved with this note attached), and mark the on-screen consequence
where it actually lands: `Shipping and billing addresses included in a Purchase Order Import are
available in Company Locations` (tools-guides/how-company-locations-works-with-the-purchase-order-import-ed09e36a.md,
1,536 B). Same verdict for **PO Extract** (tools-guides/po-extract-8b4f856f.md, 872 B —
`The extract is comprised of an overnight job set up by the client in consultation with SAP Concur staff.`)
and for the **Quantity Receipt Import** (tools-guides/quantity-receipt-import-for-three-way-matching-8b4fe385.md,
1,485 B — `…which they can do through an FTP import or through the API`).

## SETTLED (bonus, outside Group 3): "Vendor Employee Access Import" is a TAB inside Vendor Manager

The graph's other unresolved endpoint. Not an Administration page:
- tools-guides/accessing-vendor-access-mapping-import-ca5d596d.md (819 B) — `To access vendor access mapping import:`
  then a menu line reading Invoice → Vendor Manager → Import Vendor Access Mapping (arrows are non-breaking
  spaces in the crawl; do not quote across them).
- tools-guides/step-5-map-vendors-to-groups-using-vendor-access-mapping-import-68c048a0.md (2,429 B) —
  `Click the Import Vendor Access Mapping tab.`
**Contradiction to record:** one topic presents it as a menu destination, the other as a *tab* inside
Vendor Manager. 500-record cap; the overnight alternative is the Vendor import 310 record set.

## SETTLED: "PR and PO Processor" is an END-USER / back-office processing tool

Reached from the **Requests** menu, never from Administration:
- `The Purchase Request Processor role clicks Requests > Purchase Requests > Process Purchase Requests.`
  — tools-guides/purchase-request-processor-experience-8b50c98e.md (1,760 B)
- `The Purchase Order Processor role clicks Requests > Purchase Requests > Process Purchase Orders.`
  — tools-guides/purchase-order-processor-experience-8b507c54.md (1,506 B)
- `PO Processors access the Query Builder by clicking Requests > Purchase Requests > Process Purchase Orders.`
  — tools-guides/access-the-query-builder-a8c4fbcd.md (1,227 B)
- `as a PO Processor, you can create a new query from the Purchase Orders Pending Transmission page`
  — tools-guides/create-new-queries-in-pr-and-po-processor-a9209591.md (2,345 B)

The four query topics (create/edit/delete/export) are per-processor personal saved queries, explicitly
NOT global and NOT shareable. The Query Builder itself is described as *resembling* an admin surface but
is not one: `The Query Builder window in PR Processor and PO Processor are very similar to the Condition
page within several of the other features in the Invoice Configuration administrator.`
(tools-guides/the-query-builder-and-the-condition-editor-af058a80.md, 9,534 B — the twin
e10473f9.md, 9,414 B, is the Invoice Processor variant with a different data-object list; genuine
variant, not a republication).

**Where its configuration lives:** approval steps and auto-transmit → Workflows; form fields and the
Purchasing User's Modify rights → Forms and Fields; PO defaults/branding/transmittal text → Purchase
Order Configuration; matching behaviour → Purchase Order Matching Rules; exception-level thresholds →
Invoice Settings (PO/PR Settings sections); PO/PR policy type → Policies.

---

## REJECTED (with the reason, and where the config actually lives)

| Rejected surface | Why | Where its config lives |
|---|---|---|
| **Purchase Order tab** (tools-guides/purchase-order-tab-195b6e13.md, 2,332 B) | Tab inside the opened invoice; users edit/view PO data. `Click Invoice and then select the relevant view.` | Field access via Forms and Fields; edit rights via Policies |
| **Matching Summary tab** (tools-guides/matching-summary-tab-a7ac0851.md, 3,092 B) | Tab inside the opened invoice detail view | Invoice Settings (`Allow system to associate invoice lines to Purchase Order lines based on data attributes`), Purchase Order Matching Rules |
| **All Purchase Orders / All Orders page** | Processor list page under **Requests**: `by navigating to the Requests > All Purchase Orders page.` (admin-guides/concur-receiving-roles-099f375f.md); `On the All Orders page, double-click the purchase order that you want to view.` (tools-guides/preview-a-purchase-order-846396e1.md) | n/a — a list view |
| **Purchase Order page** (PR-owner transmit view) | End-user screen gated by an Invoice Settings toggle | Invoice Settings — `Allow Purchase Request Owners to Transmit their own Purchase Orders` |
| **Purchase Order Settings** (admin-guides/purchase-order-settings-a5a997b4.md, 1,417 B) | Section of Invoice Settings, not a page: `The following settings apply globally to purchase orders (PO).` — sibling of Invoice Settings guide topics; carries `Prevent purchase order transmission when exception level exceeds X` | **Invoice Settings** (Group 1) — outstanding debt: this section's fields are not in the graph |
| **Purchase Request Settings** (admin-guides/purchase-request-settings-b0bce285.md, 3,735 B) | Same pattern: `The following settings apply globally to purchase requests (PR).` | **Invoice Settings** (Group 1) — same debt |
| **Concur Receiving** | Feature, not a page. Activated on Policies: `In the PO Configuration section of the page that appears, select the Enable Concur Receiving option.` and `Select Administration > Invoice > Polices (left menu). The Policies page appears.` (note the misspelling) | Policies (Group 1) + Forms and Fields (`the Purchase Order Receipt form in the Forms and Fields tool will automatically be used.`) |
| **Multiple Purchase Order feature** | No page. `Select Administration >Invoice > Forms and Fields (left menu). The Forms and Fields page appears.` (no-space trap present) | Forms and Fields (Group 5) — add Purchase Order Number to Payment Request Line Item Details |
| **PO Change Order** (admin-guides/enable-the-po-change-order-feature-7dd5dcd4.md) | Feature toggle, path `Administration > Invoice > Invoice Settings` | Invoice Settings (Group 1) |
| **Purchase Order Policy** (legacy 1,490 B / New Experience 15,800 B) | A **policy type** on the Policies page (`Is PO Policy`, `PO Matching Ruleset`, `External ID`), not a page | Policies (Group 1) |
| **Purchase Request Configuration** | Options revealed on Policies: `displays the Purchase Request Configuration options (forms and workflow selections)` (admin-guides/policy-c8ec906b.md, 2,382 B) | Policies (Group 1) |
| **Automatic PO transmittal** | `The administrator may enable (select) an option in Workflows` (tools-guides/automatically-transmit-purchase-orders-f1b1147c.md, 1,368 B) | Workflows (its own 13-page group) |
| **Invoice Preferences** | Profile screen: `Click Profile > Profile Settings.` → `Click Invoice Preferences (left menu).` (tools-guides/notify-purchase-request-users-when-purchase-order-transmitted-055f367e.md, 1,610 B) | Profile, end-user |
| **PO exception messages / levels** | Configured inside the matching rule editor (Exception Message / Allow Submit-Approve) and thresholded in Invoice Settings | Exceptions (Group 2) + Invoice Settings |

---

## OUTSTANDING DEBT THIS SWEEP EXPOSES

1. **Groups 1–2 were built from the stub PO policy topic.** `policies-the-purchase-order-policy-8b35454a.md`
   is 1,490 B; `policies-the-purchase-order-policy-new-experience-5a1ba7ef.md` is **15,800 B** —
   a 10.6× difference, and the big file names concrete Policies fields (Is PO Policy, PO Matching
   Ruleset, External ID) plus PO form behaviour. **Rebuild the Policies PO section from the New
   Experience file.** These are the only two new-experience twins in the PO area apart from the
   matching-rules pair; the other three corpus-wide new-experience files (Invoice Manager,
   Unassigned Invoice, end-user experience) are outside Group 3.
2. **Invoice Settings is missing its PO/PR sections** (purchase-order-settings-a5a997b4.md and
   purchase-request-settings-b0bce285.md, 5,152 B combined).
3. **configure-purchase-orders-8128725e.md (5,956 B) is uncited** — the whole Purchase Order
   Configuration field roster.
4. **Neither PO page's nav path names a middle node.** Both read `Administration > Invoice > X`, never
   `Invoice Processing Admin`. Group 3 should record the corpus's literal path and NOT infer the
   middle node from the Group 1/2/5 pattern.

## TOOLS-GUIDES SKEW CHECK

For Group 3 the skew complaint partly inverts: **Purchase Order Configuration was found in
tools-guides first** and would likely have been missed by an admin-guides-only entry, since its
admin-guides anchor (1,179 B) is a thin stub while its content file
(configure-purchase-orders-8128725e.md) never names a nav path. But **Purchase Order Matching Rules is
genuinely admin-guides-only for navigation** — tools-guides documents its behaviour, roles and
consequences and never once gives its click path. So for this group tools-guides contributes:
one page discovery, one role gate, one tab name (Rules), the PO Import/Extract verdicts, the
PR-and-PO-Processor verdict, and the Company Locations linkage — but not the primary page's navigation.

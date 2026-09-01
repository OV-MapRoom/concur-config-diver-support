# ADVERSARIAL CRITIQUE — PAGE-HOOD, Workflows / Approval group

**Lens:** pagehood · **Date:** 2026-08-31 · **Corpus:** 2026_08, Professional Edition, crawled 2026-08-29
**Roster under review:** `/tmp/claude-1000/-mnt-c-Users-manci/bc53169c-7f0a-473a-a07f-cf6d37ca509c/scratchpad/wf-recon/roster.md`
**Graph:** `/mnt/c/Users/manci/PROJECTS/concur-config-diver-support/output/kg-invoice-config.json`
ROOT = `/mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE`

---

## VERDICT UP FRONT

**The four-page roster is correct. I could not refute a single page, and I could not find a fifth.**
I tried to break each one from the click-tree, the role gates, the graph and the census, and every
structural claim reproduced — several of them to the byte. This is the most mechanically sound roster
I have been asked to attack on this project.

**But the roster is wrong about what is IN the pages, in two ways that cost real fields.** It seeded a
*revision-history* file as the Email Notifications tab's source and left the tab's actual 18-variable
catalog out of every seed set; and it proposes a page node with no machine-readable `tabs`, which
means the seven tabs it fought so hard to establish would not survive into the graph at all.

Nine findings. None removes a page. Two add source files, one changes the node shape, one is a defect
in the existing graph, and the rest are labelling.

---

## 0. GROUNDING — ALL QUOTES VERIFIED FIRST

Before anything else, I ran the deterministic check the downstream validator will run.

```
# 89 quotes in the on-disk final-quotes.tsv
while IFS=$'\t' read -r f q; do grep -F -c -- "$q" "$ROOT/$f"; done < final-quotes.tsv
  => checked 89, misses 0

# all 55 navPathEvidence + roleGates quotes in the roster JSON I was handed
  => checked 55, misses 0
```

**Zero misses across 144 quote/file pairs.** Every `sourceFile` resolves, every quote is a verbatim
substring. Axis 5's mechanical half passes completely. The qualitative half is §5 below.

---

## 1. IS IT A PAGE? — I rebuilt the click tree rather than accept the roster's

### 1.1 The left-menu census reproduces exactly

```
grep -rhoP "[A-Z][A-Za-z &/-]{2,40}\(left menu\)" <admin> <tools> | sort -u | wc -l   => 30
```
30 distinct raw strings, 22 distinct labels after normalisation:

| hits | label | status |
|---|---|---|
| 10 | Forms and Fields | built (roster said 8 — immaterial undercount) |
| **8** | **Workflows** | **the page** |
| 7 | Attendees | Administration > **Expense** — not Invoice |
| 4 | Invoice Settings · Group Configurations · Audit Rules | built |
| 3 | List Management | built |
| 2 | User Permissions · Tax Administration · Purchase Order Matching Rules · Policies · Image Handling | built / external |
| 1 | Vendor Search Admin · User Administration · Site Settings · Polices · Localization · Invoice Preferences · **Feature Hierarchies** · Expense Type Import · **Delegate Configurations** · Company Locations | |

`Approval Statuses`, `Authorized Approvers`, `Email Notifications`, `Workflow Settings`,
`Confirmation Agreements`, `Reason Category and Codes`, `Purchase Request Settings`,
`Purchase Order Settings` — **zero between them.** Confirmed.

`grep -rl "Steps tab"` => **0 files corpus-wide.** Steps is a wizard page, not a tab. Confirmed.

### 1.2 I hunted for an EIGHTH tab and there is none

I censused every `<Label> tab` string in both guide dirs (~180 distinct labels) and homed each one.
The full remainder resolves into already-built pages: Forms/Form Fields/Fields/Connected Lists/
Validations (Forms and Fields), Task Definitions/Other Settings/Verification/Document Separation/
Email Administration/Supplier Email Administration/Scan Configurations (Capture Processing Admin),
Custom/Validation/Random (Audit Rules), Hierarchy Mapping List/Import Vendor Group Mappings (Routing
Configuration, Vendor Manager), Account Codes/Accounting Structure (Accounting Administration),
Purchase Order/Matching Summary/Rules (PO Matching), Bill To/Ship To (Company Locations),
Attendee/Attendee Types (Expense). **Nothing orphaned, nothing workflow-shaped left over.**
The seven-tab roster is complete as well as correct.

### 1.3 The wizard-vs-page distinction holds, and I found a corroborating path the roster missed

`edit-workflow-properties-409a8f0b.md` (1,532 B) gives a clean, complete, previously-uncited route:

> `1. Click Administration > Invoice.` → `2. Click Workflows.` → `The Workflows page appears.` →
> `Select the desired workflow and click Modify.` – or – `Double-click the desired workflow.` →
> `The General page appears.`

The General page is reached only by acting on a **row of a list on the Workflows page**, and exited
with `Click Done.` That is a modal sequence over an object. **Wizard, not page. Confirmed.**

### 1.4 Page-hood verdicts, one by one

| page | own left-menu entry | own role gate | own click path | verdict |
|---|---|---|---|---|
| **Workflows** | yes (8) | yes (`Workflows section in Administration`, ×2) | 13 topics | **PAGE — endorse** |
| **Email Reminders** | no (uses the other idiom) | **yes, distinct** | 6 topics | **PAGE — endorse** |
| **Delegate Configurations** | yes (1) | none found | 5 topics | **PAGE — endorse** (see §2.2) |
| **Feature Hierarchies** | yes (1) | yes (`Feature Hierarchies section in Administration`) | 4 topics | **PAGE — endorse** |

**Email Reminders** — I re-ran the complementary census myself because a page found by only 2 of 6
sweeps deserves suspicion:
```
grep -rhoP "Invoice Processing Admin (menu|navigation menu|list)[,]? (click|select|choose) [A-Z][A-Za-z ]{2,40}"
```
11 destinations. Six are already-built pages (Invoice Settings, Group Configurations, Routing
Configuration, Forms and Fields, Expense Types, Exceptions); Policies (4) and Workflows (5) are pages;
Change Log is a page. Email Reminders sits in the identical syntactic slot. Plus a role gate stated
for this tool alone. **The 2-of-6 sweep count is a search-idiom artefact, not weak evidence.** Endorsed.

**Delegate Configurations** — I found a **second, independent nav attestation the roster does not
carry**: the arrow-form census returns `Administration > Invoice > Delegate Configurations` as a
standalone string. The roster cites only the `(left menu)` form. Strengthens, does not change.

---

## 2. IS IT ADMIN? — and the inverse

### 2.1 Every roster entry passes

None of the four is a runtime screen. `grep -rl -e "Workflows tool" -e "Workflows page" -e "Workflows
tab"` over all 650 tools-guides files returns **0**, and only **3** tools-guides files mention
"Workflows" at all. The config surface is entirely in admin-guides. Confirmed.

I verified the flagship rejection myself. `approval-flow-page-c73e063f.md` — despite living in
*admin-guides* — is unambiguously runtime:

> `The Approval Flow for Invoice page appears by clicking Details > Approval Flow in an opened invoice
> in the legacy UI. In the new UI, users click Actions > Approval Flow.`

Opened from inside an invoice, never from Administration. **Correctly deferred**, and the roster names
its config home (workflow General page + Steps page, overridden by the Settings tab). Good.

### 2.2 The inverse trap: I found no genuine admin surface wrongly deferred

I specifically hunted for an admin surface hiding behind approver-voiced documentation. The candidates
— Change Log, Localization, Attendees, Payment Manager/Invoice Pay batch settings — are all real admin
pages but all correctly OUT of this group (read-only auditor; Group 6; Expense product; Group 7 Ops).
**No admin surface has been lost to an over-cautious boundary.**

But see **FINDING 7**: three of them are deferred with `kind: "end-user-screen"`, which is the wrong
reason for the right decision.

### 2.3 A note on Delegate Configurations' missing role gate — endorsing the roster's honesty

The roster records `roleGates` for this page as an actor sentence, not an access gate, and says
explicitly: *"No explicit visibility/permission gate for this page exists anywhere in the corpus —
record as UNDETERMINED rather than inferring one."* I checked; that is true. This is exactly the
right call and it is the kind of restraint that should be praised rather than silently accepted:
the page passes on its left-menu entry alone, and the roster did not manufacture the second half
of the tiebreaker to make the case look stronger.

---

## 3. IS IT ALREADY BUILT? — the two named collisions, settled

### 3.1 ROUTING CONFIGURATION — clean, no re-homing, roster endorsed

I read all 10 field names out of the graph before judging anything:

```
search_routing_mappings · employee_last_name · segment_1_3        (search-for-hierarchy-mappings-1dea6bb6.md)
delete_flag · employee_id · level_1_10_code                       (the-import-template-fields-and-descriptions-8b4aa547.md)
browse_button · import_button                                      (step-3-upload-and-import-template-and-data-b9a80bb6.md)
download_template_button                                           (step-1-download-hierarchy-mappings-template-…-d981b372.md)
import_details_type_filter                                         (step-4-review-import-details-414c8cd5.md)
```

All ten are hierarchy-mapping **search** and spreadsheet **import** mechanics for assigning invoice
*ownership*. Not one approver, step, rule, notification or status control. **No overlap with anything
in the Workflows tree in either direction. I raise no finding against the existing graph on this axis**
and I re-home nothing. The roster's verdict is correct.

`tools-guides/workflow-and-approval-routing-8b4ff6c9.md` (1,502 B) — read in full. Prose best-practice
only; no page, tab, field, click path or role. Falls on the **Workflows** side (its two substantive
nouns are workflow rules and Authorized Approvers); "Routing" in its title means *approval* routing.
It should seed nothing. Roster correct.

### 3.2 AUDIT RULES — real overlap, correctly called duplication… but the baseline is contaminated

The roster's two anchor quotes verify verbatim:
- `conditional-expressions-and-the-condition-page-4d98af34.md:97` — *"The Condition page in the
  Workflows tool is similar to the Condition Editor page used in the Audit Rules tool and Expense
  Processor."*
- `access-exceptions-90e45318.md:34` — *"All exceptions created in the Exceptions page appear as
  options for the Audit Rules tool and Workflows tool when creating rules."*

The roster is right that this is duplication, not new pages. **But its remedy is unsafe.** It tells
the build to *"dedupe the Step Rules condition roster against the built Audit Rules 91 fields."*
That list is itself duplicated — see **FINDING 5**.

Separation of the two condition topics is nonetheless correct and worth recording:
- `the-condition-page-5d4ea870.md` (11,176 B, 71 rows) = the **Audit Rules** side, already mined
  (16 fields cite it). Correctly NOT seeded here.
- `conditional-expressions-and-the-condition-page-4d98af34.md` (9,326 B, 38 rows) = the **Workflows**
  side, correctly seeded, cited by zero graph fields.

The roster picked the right one of a confusable pair. Endorsed.

### 3.3 The other built pages

`Invoice Settings` — label collision only, proven in §8/finding (1). `Policies`, `Group
Configurations`, `Capture Processing Admin`, `PO Matching Rules` — all cross-references, nothing moves.
Verified: **zero** graph fields cite any of the three settings-family files.

---

## 4. ONE PAGE OR SEVERAL? — Audit Rules precedent, correctly applied to IDENTITY

The roster's identity verdict is right and triply supported:

1. **Left-menu test** — Workflows 8, every candidate tab 0. (§1.1)
2. **Role-gate test** — one gate for the whole surface, stated twice, verbatim, as *"permissions for
   the Workflows **section** in Administration"* (`step-2-activate-the-feature-27a421e2.md` and
   `step-3-edit-the-workflow-steps-f2731590.md`). Never per tab. This is the *inverse* of Forms and
   Fields, whose Capture Processing Admin twin has a stricter gate of its own.
3. **Release-note structure** [labelled: release note, cited for NAME and STRUCTURE only] —
   `updated-read-only-access-…-6df11845.md` organises under four headings: `Forms and Fields Page`,
   `Group Configurations Page`, `Policies Page`, `Workflows Page`. Three are already pages. Under the
   fourth, General/Steps/Step Rules are *"details"* of a list item.

**Audit Rules is the right precedent for the identity question. It is the WRONG precedent for the node
shape** — see **FINDING 2**, which is the most consequential finding in this review.

I also checked the "Settings"/"Configuration" conflation warning. Both fire and both are handled:
`Workflow Settings` (`workflow-settings-8b3b98e1.md`, 743 B) is a content-free section header —
correctly deferred as `feature-name-only`; the `Configuration` sub-tab of Authorized Approvers is
correctly kept distinct from the six other files titled `Configuration` (I diffed all six by loio —
only `configuration-8b3be88b.md` is seeded, and it is the right one).

---

## 5. DOES THE EVIDENCE HOLD? — mechanically yes; two quotes don't carry their claim

144/144 quotes verbatim (§0). On *support*, two navPathEvidence entries are weaker than their slot
implies — both for Feature Hierarchies, and neither changes the verdict:

**(a)** `hierarchies-7f68a876.md` → quote `"Hierarchies (explained below)."`, navPath
`[Administration, Invoice, Hierarchies]`. The quote is a fragment that names a label in passing. The
path IS in the file, but in the clause *before* the quote, and it is NBSP-separated:
```
$ grep -n "configure their hierarchy structure" … | cat -A
  …in AdministrationM-BM-M-BM- InvoiceM-BM-M-BM- Hierarchies (explained below).$
```
The `Hierarchies` **alias claim is sound**; the quote chosen does not demonstrate it.

**(b)** `overview-of-steps-37e3c289.md` → quote `"Step 2: Feature Hierarchies"`, filed as navPath
evidence. It is not nav evidence — but it is **stronger** than the roster credits, as *tool-peer*
evidence. Its framing sentence is: *"The administrator uses the following tools in the order
presented"*, and the list is `Step 1: List Management · Step 2: Feature Hierarchies · Step 3: Group
Configurations · Step 4: Forms and Fields · Step 5: Vendor Employee Access Import · Step 6: User
Administration`. **Feature Hierarchies is named as a peer TOOL of three already-built pages.** That
belongs in `roleGates`/`identityNotes` as page-hood evidence, not in `navPathEvidence`.

Everything else supports its claim. In particular I checked the roster against the "abstract noun"
trap the brief warns about — no roster quote rests on a decorative use of "workflow".

**Contradiction counts spot-checked and all exact:** `Workflows tab` 14 files vs `Workflow tab` 1 file
(`managing-items-on-purchase-request-…-37e7bf0f.md`); 5 topics route via `Invoice Processing Admin`,
8 use `Workflows (left menu)`; the orphan `Workflow Step Timeout Duration` appears in exactly one file
and zero times in the graph.

---

## 6. IS THE NAME RIGHT? — yes, and it is load-bearing

The corpus string is **`Workflows`** (plural), and the graph agrees:

```
9 dependency endpoints  page='Workflows'
4 dependency endpoints  page='Feature Hierarchies'
1 dependency endpoint   page='Delegate Configurations'
```

The roster names all three exactly. **No name changes required at page level.** Had it named the page
"Workflow" or "Workflows Tool", nine edges would have stayed unresolved forever.

The roster's two corrections to my brief are **both verified true** — raw counts over the 1.84 MB JSON:
`Approval Statuses` → 0, `Email Notifications` → 0, `Authorized Approver` → 0, `Step Rules` → 0,
`Workflows > Settings` → 1. That single string is confirmed as a defect sitting in
`page.exceptions.navPathAlternates` as `"Administration > Invoice > Workflows > Settings"` — a route
to the Workflows Settings tab filed as an alternate route to Exceptions.

**Where the naming IS wrong is below the page** — see FINDING 2. `dep.g2.012` targets page
`"Purchase Request Settings"` and `dep.g2.013` targets page `"Purchase Order Settings"`. Under the
roster as written, both become permanently unresolvable, because neither string appears anywhere in
the proposed node.

---

## 7. ARE THE RICHNESS NUMBERS REAL? — bytes exact; the composition is not

### 7.1 Everything mechanical reproduces to the byte

| page | files | claimed B | measured B |
|---|---|---|---|
| Workflows | 84 | 217,634 | **217,634** |
| Email Reminders | 17 | 37,033 | **37,033** |
| Delegate Configurations | 17 | 33,041 | **33,041** |
| Feature Hierarchies | 12 | 23,239 | **23,239** |

`rawTableFiles: 3` for Workflows — **exact**, and I confirmed the three by `<table[ >]` with an
attribute, not the prose-matching `<table` the brief warns about:
`additional-approver-situations-fbb5034c.md` (`<p>`=36, md rows=**0** — the packed-`<tr>` trap, live),
`filter-authorized-approvers-…-aae69350.md` (`<p>`=14, rows=21), `invoice-settings-cace748d.md`
(`<p>`=6, `<tr>`=3, rows=10).

Split arithmetic **exact**: Run A 94 files / 234,519 B; Run B 34 files / 70,074 B; overlaps 2 (WF∩FH:
`step-1-define-the-cost-object-approver-hierarchy-6e7b7dc6.md`, `understand-the-hierarchy-b65d7089.md`)
and 1 (WF∩DC: `delegate-self-approval-1b627285.md`), all others 0.

### 7.2 But 37% of the Workflows set's table payload is REVISION HISTORY — see FINDING 3

```
WORKFLOWS 84-file set: total table units (indented rows + <p>) = 954
  of which files whose body opens "Revision History"           = 349  (37%)
  payload-bearing                                              = 605
```
The four contaminated files: `general-information-8b3b0308.md` (139 rows), `cost-object-approval-
8b3d1e0f.md` (85), `authorized-approvers-8b3c26cc.md` (64), `email-notifications-8b3dbad4.md` (61).
**Three of the four are in the roster's own `seedFiles` array**, presented as sources for the Settings
tab, Cost Object Approval, the Authorized Approvers tab and the Email Notifications tab respectively.

The roster caught this exact trap for the other two pages — it explicitly warns that
`email-reminders-8b2caa99.md` (91 rows) and `delegate-configuration-8b2bd26d.md` (91 rows) are
revision histories — and then never ran the same audit on Workflows.

For completeness, the same audit on the other three pages:
`Email Reminders` 174 → 83 payload · `Delegate Configurations` 150 → 59 payload · `Feature Hierarchies`
94 → 94.

**The split conclusion survives this correction.** On payload units the balance is 605 vs 236 = 72/28,
against 76/24 by bytes. Run A is still the heavy half and Workflows is still indivisible under
`--patch`. **Endorse the split as proposed.**

### 7.3 Minor: Feature Hierarchies `longCatalogs: 1` is 2

`global-group-vs-authorized-approver-hierarchy-8a960238.md` has 25 indented rows the roster does not
count. I read it: a 4-column comparison of configuration *steps*, not a field roster — so the roster's
substantive prediction (**~5 fields, coverage partial, SAP defers to an external Shared guide absent
from this corpus**) **stands, and should be carried into the build exactly as written.** This is the
Budget Configuration failure mode named in advance, which is the right way to handle a thin page.

---

## 8. ARE THE FIVE INHERITED VERDICTS SOUND?

### (1) The settings family — CONFIRMED as (a), and I can strengthen it beyond what the roster had

Clincher reproduced:
```
grep -c "select their own approver" available-invoice-settings-8b3411f0.md  => 0   (8,368 B)
grep -c "select their own approver" invoice-settings-cace748d.md            => 2   (4,901 B)
grep -c "select their own approver" purchase-request-settings-b0bce285.md   => 2   (3,735 B)
```
Family cohesion: `grep -rl "apply globally to"` over both guide dirs returns **exactly three files and
nothing else** — the invoice, PR and PO members. `"Type a number from one to 99."` returns 1 in each.
Graph: **zero** fields cite any of the three; 9 Invoice Settings fields cite
`available-invoice-settings-8b3411f0.md`. **(c) is refuted — there is no Invoice Settings rebuild debt.**

Payload verified by reading all three: invoice = **5** settings (2 markdown + **3 packed in one raw
`<table>`**), PR = **3**, PO = **1**. **Nine.** The roster's correction to my brief (which said 3 rows)
is right, and its BUILD FLAG 1 is right and important.

**NEW EVIDENCE THE ROSTER DID NOT HAVE — this is now proven, not inferred.** The *Workflows* guide's
own revision history, `general-information-8b3b0308.md:299`:

> `Addition of two new options to the Settings tab:`
> `-   Filter invoice items to those that are applicable to Cost Object`
> `-   Allow processor to recall an invoice to last processor step`

and `:375` — `New Settings tab option: Prevent purchase order transmissions setting.`

Those two option names appear **nowhere else in the corpus except `invoice-settings-cace748d.md`**
(`grep -rl` returns that one file for each), where they are rows 4 and 5 of the packed raw `<table>`.
**The Workflows guide names two of the invoice member's own settings as additions to its Settings tab.**
That is direct placement evidence for the invoice member, which the roster had only indirectly.
Verdict (a) confirmed at a higher standard than claimed.

*Label drift the roster does not record* — the revision history says "Filter **invoice** items" /
"recall an **invoice**"; the settings file says "Filter **payment request** items" / "recall a
**payment request**". Same controls, two labels (FINDING 9).

Graph defects re-verified, all three real: `dep.g2.011` targets page `Invoice Settings` while carrying
the cace748d setting name; `dep.g2ar.025` targets `Invoice Settings` duplicating the correct
`dep.g2ar.024`; `page.exceptions.navPathAlternates` carries the Workflows Settings path.

### (2) One page or several — CONFIRMED (§1, §4). Sound, and I added the eighth-tab search that closes it.

### (3) Feature Hierarchies — CONFIRMED as its own page, belonging to neither Workflows nor Routing
Configuration. Both halves of the tiebreaker verified; strengthened by the tool-peer list in §5(b).
Claiming it here rather than deferring it a third time is right. The navigation warning is real and
load-bearing: both click paths go straight from `Administration > Invoice`, the `Invoice Processing
Admin` middle node is **unattested** (correctly recorded as unattested, not absent), and it resolves
four already-written endpoints (`dep.g1.061`, `dep.g2.003`, `dep.g5g5.050`, `dep.g5g5.051` — all
about a **Source List**, verified in the graph).

### (4) Routing Configuration boundary — CONFIRMED clean (§3.1). Nothing re-homed, no finding raised.

### (5) End-user traps — CONFIRMED (§2). Every deferred runtime screen names its config home; I
spot-checked the Approval Flow page, the My Work links, the Requests Pending Your Approval window, the
Approve/Send Back button labels and the reason-code picker, and each home is corpus-attested.

**None of the five rests on plausibility.** All five are settled with commands and quotes. This is the
outcome the brief asked for and did not assume.

*One method note, not a defect:* the roster's UI-variant sweep searched only the literal string
`New Experience` and `*-new-experience-*` filenames. The corpus also uses `legacy UI` / `new UI` /
`classic interface` — but only in 7 files, and the only workflow-domain ones are
`approval-flow-page-c73e063f.md` (end-user), `general-information-8b3b0308.md` (already seeded) and
`how-single-step-approval-workflow-works-40145f24.md` (already cited). **The conclusion
`uiVariant = undifferentiated` survives**, and the roster's framing of it as a *build risk rather than
a missing page* is exactly right.

---

# FINDINGS

## FINDING 1 — SEVERE. The Email Notifications tab's real variable catalog is unseeded; a revision-history file was seeded in its place.

`email-notifications-8b3dbad4.md` (3,139 B, 61 indented rows) is listed in the roster's `seedFiles` as
the Email Notifications source. It is the guide's **Revision History**, and it contains exactly **one**
variable:
```
grep -o "%[A-Za-z_\\]*%" email-notifications-8b3dbad4.md | sort -u   =>  %L\_EmpName%
```
The actual catalog is in **`variables-for-invoices-or-purchase-requests-26e917cb.md`** — 2,609 B,
**58 indented rows**, a `Field | Variable | Description` table carrying **18 distinct variables** in
nine label/value pairs:
```
%L_EmpName% %EmpName% · %L_PayStatus% %PayStatus% · %L_RequestDate% %RequestDate%
%L_RequestName% %RequestName% · %L_StepApprovalStatus% %StepApprovalStatus% · %L_SubmitDate% %SubmitDate%
%L_SubmittingUserName% %SubmittingUserName% · %L_Total% %Total% · %L_WhoChanged% %WhoChanged%
```
Its semantics parent **`general-information-00eca1ce.md`** (2,281 B) carries the rule that makes the
set usable: *"Adding an "L" (L) and underscore (\_) to the beginning of the variable name tells the
system to replace that variable with the field label."*

**Neither is in any seed set** (`grep -cx` against the union of all four lists = 0). Note this is a
*different* token family from the Email Reminders `%1%–%4%` set the roster correctly re-homed — so the
roster caught one token trap and missed the larger one.

**ACTION:** add `concur-invoice-professional-edition-admin-guides/variables-for-invoices-or-purchase-requests-26e917cb.md`
and `concur-invoice-professional-edition-admin-guides/general-information-00eca1ce.md` to the Workflows
seed set (Email Notifications tab); relabel `email-notifications-8b3dbad4.md` "revision history — not a
field roster". Workflows becomes 86 files / 222,524 B.

## FINDING 2 — SEVERE. The page node has no machine-readable `tabs`, so seven tabs and four sub-tabs die in prose, and two graph endpoints become permanently unresolvable.

The roster invokes **Audit Rules** as its precedent. That is right for *identity* and wrong for *shape*:

```
page.audit-rules      navPathAlternates: []     (no tabs key at all — its 3 tabs are unrecorded)
page.forms-and-fields tabs: ["Forms","Form Fields","Fields","Connected Lists","Validations"]
                      tabsSourceQuote: "The tool consists of the following tabs: …"
                      navPathAlternates: 6 entries, one per tab, e.g.
                        "Forms and Fields > Connected Lists (tab)"
```
**Forms and Fields — the precedent the roster explicitly rejects — is the only built page that
actually encodes tabs.** The proposed Workflows node has no `tabs`, no `tabsSourceQuote`, no per-tab
`navPathAlternates`, and an `aliases` array of seven entries that are all variants of the page *name*
(`Workflows tool`, `Workflows page`, …) and contain no tab name and no settings-family name.

Consequences, verified in the graph:
- `dep.g2.012` targets `{page: "Purchase Request Settings"}` → never resolves.
- `dep.g2.013` targets `{page: "Purchase Order Settings"}` → never resolves.
- `dep.g2.014` targets `{page: "Workflows", field: "Settings"}` → resolves to the page, not the tab.
- Every future endpoint written against `Approval Statuses` / `Authorized Approvers` /
  `Email Notifications` / `Step Rules` (all currently 0 in the graph) → never resolves.

**ACTION:** keep Audit Rules as the *identity* precedent and adopt Forms and Fields as the *encoding*
precedent. Add to the Workflows node: `tabs` = the seven names; `navPathAlternates` = one entry per tab
and sub-tab in the existing `"Workflows > Approval Statuses (tab)"` idiom; and extend `aliases` with
`Workflow Settings`, `Settings tab`, `Invoice Settings (workflow settings table)`,
`Purchase Request Settings`, `Purchase Order Settings`, `Approval Statuses`, `Authorized Approvers`,
`Email Notifications`, `Confirmation Agreements`, `Reason Category and Codes`. Also set `url: ""`
(the `page.purchase-order-matching-rules` precedent for an unobserved URL) rather than omitting it.

## FINDING 3 — SEVERE. 37% of the Workflows set's table payload is revision history, and three of the four contaminated files sit unflagged in `seedFiles`.

| file | bytes | rows | in `seedFiles`? | actually |
|---|---|---|---|---|
| `general-information-8b3b0308.md` | 6,719 | 139 | yes | Revision History |
| `cost-object-approval-8b3d1e0f.md` | 4,040 | 85 | yes | Revision History |
| `authorized-approvers-8b3c26cc.md` | 3,067 | 64 | yes | Revision History |
| `email-notifications-8b3dbad4.md` | 3,139 | 61 | yes | Revision History |

349 of 954 table units. Ranked by indented-row count, the four occupy positions **#1, #3, #5 and #6**
in the entire 84-file set — **the single largest "catalog" in the Workflows group is a revision history**:

```
139  general-information-8b3b0308.md          <== REVISION HISTORY
 85  create-a-new-workflow-554e86aa.md            (real: the General-page field roster)
 85  cost-object-approval-8b3d1e0f.md         <== REVISION HISTORY
 69  understand-the-hierarchy-b65d7089.md         (real, but a worked example)
 64  authorized-approvers-8b3c26cc.md         <== REVISION HISTORY
 61  email-notifications-8b3dbad4.md          <== REVISION HISTORY
 50  default-workflows-a6fa157a.md
 48  default-approval-statuses-34c83d58.md
```

The roster ran precisely this audit for Email Reminders
(`email-reminders-8b2caa99.md`) and Delegate Configurations (`delegate-configuration-8b2bd26d.md`) and
warned about both — then did not run it on the page it was actually building.

`general-information-8b3b0308.md` **must stay in the set**: its revision history is the proof for
inherited finding (1). But it must be labelled, or an extractor will mine 139 dated change entries as
Settings-tab fields. Note also that the real `Authorized Approvers` content is in the *other* twin —
`authorized-approvers-8b3ab7ad.md` (1,853 B, 0 rows), which is correctly in the 84-file set but is not
named in `seedFiles` while its revision-history twin is.

**ACTION:** mark all four "revision history — mine for STRUCTURE and history claims only, never as a
field roster"; swap `authorized-approvers-8b3c26cc.md` for `authorized-approvers-8b3ab7ad.md` in the
`seedFiles` highlight list; restate Workflows richness as **605 payload table units**, not 954.

## FINDING 4 — MODERATE. `administrator-experience-8b302852.md` is cited by the roster but is in no seed set, costing a dependency edge and a page-list corroboration.

1,605 B, admin-guides. The roster's contradiction **C7** cites it by name; it appears in **no** seed
list. It carries three things:
1. A **third independent page-enumeration**: *"The Configuration administrator will see the following
   pages in Invoice Administrator … Image Handling · Policies · Workflows"* — page-hood corroboration
   from an angle neither the left-menu census nor the release note covers.
2. A Workflows field: *"On the Workflow page, admin will see the Require Hardcopy Receipts option."*
3. A **conditional-visibility dependency**: *"When the … admin selects (enables) the Require Hardcopy
   Receipts option on the Workflows page, they will be able to see the Hold for Invoice Hard Copy step
   on the Steps page"* … *"In addition, the admin will see the Hold for Invoice Hard Copy step on the
   Step Rules page."*

The field itself survives (`Require Hardcopy Receipts` also appears in the seeded
`create-a-new-workflow-554e86aa.md` and `step-3-optional-…-c50e377e.md`), so this is moderate not
severe — but the dependency edge and the corroboration are lost, and dependencies are a first-class
product of this graph (`Hardcopy` occurs once in the whole JSON today).

It also contains a **page-name contradiction not in C3**: *"On the **Workflow** page"* and *"on the
**Workflows** page"* in adjacent sentences of the same file. C3 covers only *tab* singular/plural.

**ACTION:** add `concur-invoice-professional-edition-admin-guides/administrator-experience-8b302852.md`
to the Workflows seed set; extend C3 to cover page-level singular/plural; record the Require Hardcopy
Receipts → Hold for Invoice Hard Copy conditional-visibility edge as a build target. (Diffed its
duplicate-title twin `administrator-experience-de86ce6d.md` by loio — a Forms and Fields topic,
correctly excluded.)

## FINDING 5 — MODERATE. A defect in the EXISTING graph: Audit Rules' condition roster is internally duplicated ~8 times, so the dedupe baseline the roster hands the build is contaminated.

16 of the 91 Audit Rules fields cite `the-condition-page-5d4ea870.md`, and seven labels are exact
duplicates:

| label | field names |
|---|---|
| `A: Left Parenthesis` | `condition_left_parenthesis`, `left_parenthesis` |
| `B: Data Object` | `condition_data_object_left`, `data_object`, `condition_data_object_b` |
| `C: Field/Value` | `condition_field_value_left`, `field_value` |
| `D: Operator` | `condition_operator`, `operator` |
| `F: Field/Value` | `condition_field_value_right`, `second_field_value` |
| `G: Right Parenthesis` | `condition_right_parenthesis`, `right_parenthesis` |
| `H: And/Or` | `condition_and_or`, `and_or` |

The roster instructs: *"dedupe the Step Rules condition roster against the built Audit Rules 91 fields
BEFORE extracting."* Deduping against a list that already double-counts propagates the error into
Workflows.

**ACTION:** report to Group 2 as an existing-graph defect (Audit Rules' 91 is inflated by ~8). Change
the roster's instruction to: **dedupe against the SOURCE FILES** —
`the-condition-page-5d4ea870.md` (Audit Rules side, already mined) versus
`conditional-expressions-and-the-condition-page-4d98af34.md` (Workflows side, to build) — not against
the field list.

## FINDING 6 — MODERATE. The NBSP navigation hazard is corpus-wide (57 files), not a Feature Hierarchies quirk.

The roster flags this only under Feature Hierarchies as a "GREP HAZARD". Measured across both guide
dirs: **57 files** render menu paths with the `>` glyph **entirely absent**, separators being
`U+00A0 U+00A0`; **84 files** use `Administration > `. Roughly 40% of nav sentences lose the arrow.

Workflows nav paths that exist **only** in the NBSP form include
`Administration > Invoice > Workflows > Settings tab` (the sentence that anchors inherited finding 1),
`Administration > Invoice > Workflows > Workflows tab`, and `Administration > Invoice > Hierarchies`.
The built `page.exceptions.navPathSourceQuote` is itself `"Select Administration  Invoice."` — NBSP form.

**ACTION:** promote the hazard from a Feature Hierarchies footnote to a group-level build note; any
future nav census must run both forms or it undercounts by ~40%.

## FINDING 7 — MINOR. Three deferred entries carry the wrong `kind`.

`Change Log`, `Localization` and `Attendees` are all typed `kind: "end-user-screen"`. All three are
genuine **admin** pages — `"From the Invoice Processing Admin menu, select Change Log."`
(`accessing-the-change-log-8b2b0deb.md:27`); `"Click Localization (left menu)"`;
`"Click Administration  Expense  Attendees (left menu)"`. Each is correctly *deferred*, but for a
reason the label misstates. A downstream agent reading `kind` will conclude they are runtime screens
and stop looking — when in fact Change Log is an unclaimed admin left-menu page (Group 7) and
Localization is a scoped Group 6 page.

**ACTION:** retype all three to `admin-page` and move the reason into `why`
(read-only auditor / other group / other product).

## FINDING 8 — MINOR. Two Feature Hierarchies `navPathEvidence` entries are misfiled.

`hierarchies-7f68a876.md` / `"Hierarchies (explained below)."` does not carry the path it is cited for
(§5a). `overview-of-steps-37e3c289.md` / `"Step 2: Feature Hierarchies"` is tool-peer evidence, not nav
evidence — and is *stronger* in its proper slot.

**ACTION:** replace the `hierarchies-7f68a876.md` quote with one spanning the NBSP path, or demote the
entry to an `aliases` citation; move the `overview-of-steps` entry into `identityNotes` as page-hood
evidence (Feature Hierarchies listed as a peer tool of List Management, Group Configurations and Forms
and Fields — three built pages).

## FINDING 9 — MINOR. Unrecorded label drift on two Settings-tab controls.

The Workflows guide revision history calls them *"Filter **invoice** items to those that are applicable
to Cost Object"* and *"Allow processor to recall an **invoice** to last processor step"*;
`invoice-settings-cace748d.md` calls the same two controls *"Filter **payment request** items…"* and
*"Allow processor to recall a **payment request**…"*. An automation matching by visible label will
find one form and not the other.

**ACTION:** record both label forms as aliases on those two Settings-tab settings.

---

## WHAT I EXPLICITLY ENDORSE

- **All four pages. No additions, no removals, no merges, no splits.** I attacked each and failed.
- **The one-page-seven-tabs verdict**, on the left-menu test, the single section-level role gate, and
  the release-note structure — plus my own eighth-tab search, which found nothing.
- **The Audit Rules identity precedent** over Forms and Fields (see FINDING 2 for the encoding half).
- **The Routing Configuration boundary**: clean, nothing re-homed, no finding against the graph.
- **All five inherited verdicts**, each settled with commands rather than plausibility.
- **The split proposal**, unchanged — it survives the payload-unit recount (72/28 vs 76/24).
- **The refusal to promote** seven tabs, four sub-tabs, three wizard pages and a dozen dialogs.
- **The honest UNDETERMINED** on the Delegate Configurations role gate, the **UNRESOLVED** C9 role
  contradiction on the Reason Category and Codes tab, and the **predicted thinness** of Feature
  Hierarchies. Those three are the marks of a roster that did not manufacture what it could not find.

## MEASURED vs INFERRED

Everything numbered above is **measured** by a command shown in-line. Two items are **hypotheses**,
labelled as such:
- *Hypothesis:* the four revision-history files entered `seedFiles` because a row-count census ranked
  them highly (they are 4 of the top 6 by indented-row count in the set). **Check that would settle
  it:** whether the sweep that produced `seedFiles` ranked by `grep -cP "^\s*\|"` without a
  `^Revision History` exclusion. I did not read the sweep scripts.
- *Corrected mid-review, and the correction makes FINDING 1 worse.* I first hypothesised that
  `variables-for-invoices-or-purchase-requests-26e917cb.md` was missed because it contains no
  "workflow" string. **I ran the check and I was wrong:** `grep -ic workflow` returns **3**
  (line 21 "in SAP workflows", line 59 "Employee name from workflow step", line 124 "Approval Status
  of the Workflow Step"), while `grep -ic email` and `grep -ic notification` both return **0**.
  So a plain `workflow` content grep over admin-guides — the most obvious way to build this set —
  **would have caught this file.** The 84-file set was therefore not built that way, and the miss is
  a selection-method gap rather than an unreachable-file problem. *Remaining hypothesis:* the set was
  assembled from topics naming a Workflows page/tab/tool surface, which this file never does.
  **Check that would settle it:** read the sweep scripts that produced `wf-full.txt`. I did not.

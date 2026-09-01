# WORKFLOWS GROUP — AUTHORITATIVE BUILD ROSTER
**SAP Concur Invoice, Professional Edition, corpus version 2026_08, crawled 2026-08-29.
Merge of six blind sweeps + independent corpus re-verification. Date: 2026-08-31.**

ROOT = `/mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE`

---

## HEADLINE

**Four pages, not thirteen.** The workflow/approval configuration area is **ONE admin page with
seven tabs** (`Workflows`) plus **three genuinely separate left-menu pages** that no group has ever
claimed: **Email Reminders**, **Delegate Configurations**, **Feature Hierarchies**.

All six sweeps independently reached the one-page verdict, and I re-derived it from the corpus with
a single mechanical test: **a corpus-wide `(left menu)` census returns 30 distinct labels and not one
of them is a workflow tab.** Not `Approval Statuses`, not `Authorized Approvers`, not
`Email Notifications`, not `Workflow Settings`, not `Purchase Request Settings`, not
`Purchase Order Settings`. Every one of those surfaces is reached only by landing on Workflows first
and then clicking a tab. This is the **Audit Rules precedent** (one page, N tabs), not the Forms and
Fields precedent (one label, two entry points, two role gates).

Two corrections to the inherited brief, both verified mechanically and both material:

1. **The graph does NOT carry endpoint references to "Approval Statuses > Purchase Request" or to an
   "Email Notifications tab".** Raw string counts over the whole 1.84 MB `kg-invoice-config.json`:
   `Approval Statuses` → **0**, `Email Notifications` → **0**, `Authorized Approver` → **0**,
   `Step Rules` → **0**. Only `Workflows` (36) and `Workflows > Settings` (1) exist. Those two names
   came from the **lost map**, not from any built group. They are nonetheless fully corpus-attested
   as tabs, so they survive — but they are not independent corroboration and must not be cited as such.
2. **The single `Workflows > Settings` string in the graph is a defect.** It sits in
   `page.exceptions.navPathAlternates` as `"Administration > Invoice > Workflows > Settings"` — a path
   to the Workflows Settings tab filed as an alternate route to the **Exceptions** page. Report to
   whoever owns Group 2; do not treat it as a Workflows endpoint.

---

## 1. THE MECHANICAL BASIS

### 1.1 The corpus-wide left-menu census (both guide dirs, 1,859 files)

```
grep -rhoP "[A-Z][A-Za-z &/-]{2,40}\(left menu\)" <admin> <tools> | sort | uniq -c | sort -rn
```

| hits | label | status |
|---|---|---|
| 8 | Forms and Fields | built (G5) |
| **8** | **Workflows** (6 × `Workflows (left menu)` + 2 × `Click Workflows (left menu)`) | **THIS GROUP — the page** |
| 7 | Attendees | **Administration > _Expense_ > Attendees — NOT Invoice.** A sweep flagged this as an unclaimed Invoice page; it is not one. |
| 4 | Audit Rules | built (G2) |
| 4 | Invoice Settings | built (G1) |
| 2–3 | Tax Administration, List Management, Group Configurations, Image Handling, Policies / *Polices*, Purchase Order Matching Rules, Company Locations, Vendor Search Admin | built |
| 1 | Localization | Group 6, unbuilt |
| 1 | **Delegate Configurations** | **unbuilt, unclaimed — ON THIS ROSTER** |
| 1 | **Feature Hierarchies** | **unbuilt, unclaimed — ON THIS ROSTER** |
| 1 | User Permissions, User Administration, Site Settings, Expense Type Import, Invoice Preferences | outside the Invoice admin config surface |

### 1.2 The Invoice Processing Admin census — the test that finds Email Reminders

The `(left menu)` census MISSES Email Reminders, because its access topic uses the other phrasing.
The complementary census is decisive:

```
grep -rhoP "Invoice Processing Admin (menu|navigation menu|list)[,]? (click|select|choose) [A-Z][A-Za-z ]{2,40}"
```

| hits | destination | status |
|---|---|---|
| 4 | Policies | built |
| **5** | **Workflows** (3 select + 2 click) | **THIS GROUP** |
| 1 | **Email Reminders** | **unbuilt, unclaimed — ON THIS ROSTER** |
| 1 each | Invoice Settings, Group Configurations, Routing Configuration, Forms and Fields, Expense Types, Exceptions | all six **already built** |
| 1 | Change Log | unbuilt — read-only audit viewer, deferred |

**Email Reminders occupies exactly the same syntactic slot as six already-built pages.** That is the
argument, and it is why two sweeps found it and four did not: four sweeps searched on the
`(left menu)` idiom alone.

### 1.3 Census calibration applied (the brief's three traps, all live here)

| file | bytes | `^\|␣` naive | `^\s*\|` correct | `<table[ >]` | `<tr` | `<p` |
|---|---|---|---|---|---|---|
| create-a-new-workflow-554e86aa.md | 14,383 | **0** | **85** | 0 | 0 | 0 |
| general-information-8b3b0308.md | 6,719 | 47 | **139** | 0 | 0 | 0 |
| default-approval-statuses-34c83d58.md | 3,405 | 15 | **48** | 0 | 0 | 0 |
| invoice-settings-cace748d.md | 4,901 | 4 | 10 | **1** | **3** | **6** |
| additional-approver-situations-fbb5034c.md | 8,664 | **0** | **0** | **1** | **7** | **36** |
| filter-authorized-approvers-…-aae69350.md | 6,234 | 8 | 21 | **1** | **3** | **14** |
| work-with-the-steps-page-fab249d1.md | 6,726 | **0** | **28** | 0 | 0 | 0 |
| work-with-the-step-rules-page-4c33cda0.md | 11,246 | **0** | **29** | 0 | 0 | 0 |

The richest file in the group returns **0** on the naive anchor. `additional-approver-situations`
returns 0 on **both** markdown anchors and hides ~12 entries in a packed `<tr>`. Any census that
does not allow leading whitespace and does not count `<p>` inside a raw table will mis-size this
group by a factor of three.

---

## 2. THE BUILD ROSTER — 4 PAGES

---

### PAGE 1 — **Workflows**   `admin-page`   found by all six sweeps

**Aliases:** Workflows tool · Workflow tool · Workflows page · Workflows Page · Workflows section in
Administration · Workflows area · Invoice Admin > Workflows

**navPath (canonical, 5 topics):** `Administration > Invoice > Invoice Processing Admin > Workflows`
> `"From the Invoice Processing Admin menu, click Workflows."` — `access-workflow-fa9892a7.md`
> `"The Workflows tab on the Workflows page appears."` — same file

**navPath (abbreviated, 8 topics):** `Administration > Invoice > Workflows`
> `"Click Administration > Invoice > Workflows (left menu). The Workflows page appears."` — `authorized-approver-list-a9522ec8.md`
> `"Click Workflows (left menu). The Workflows page appears."` — `select-an-email-notification-in-the-workflows-tab-663bb8ac.md`

**CONTRADICTION recorded, not reconciled:** 5 topics route through the `Invoice Processing Admin`
middle node; 8 omit it. Per the brief's own rule the omission is an abbreviation, not a second page,
and the automation should try the middle node first. Both forms are on the roster.

**Role gates**
> `"Both the Global Invoice Configuration administrator and the Group Invoice Configuration administrator can view the Workflows tool."` — `workflows-tool-8b3b4dbe.md`
> `"This portion of the configuration requires permissions for the Workflows section in Administration."` — `step-2-activate-the-feature-27a421e2.md` **and** `step-3-edit-the-workflow-steps-f2731590.md` (two independent occurrences, both saying *section*, never *tab*)
> **[RELEASE NOTE]** `"The Invoice Configuration Administrator (Restricted) can view invoice configuration settings for Workflows, Policies, Group Configurations, and Forms and Fields."`

**The structural clincher — a release note enumerating one page's contents.**
`release-notes/updated-read-only-access-for-invoice-configuration-administrator-restricted-role-6df11845.md`
is organised under four headings: `Forms and Fields Page`, `Group Configurations Page`,
`Policies Page`, **`Workflows Page`** — the first three are pages already in the graph. Under the
fourth heading, three bullets:
> `"View the list of Workflows and click on each item to view General, Steps, and Step Rules details"`
> `"View the Approval Statuses and click on each item to view status details"`
> `"View the workflow Settings"`

and the access sentence `"choose a page from the Invoice Processing Admin list."` One page; the
workflow list, the Approval Statuses and the Settings all inside it; and General/Steps/Step Rules
explicitly described as **details of a list item**, not as pages. **Labelled: release note, cited for
page NAME and page STRUCTURE only.**

#### The seven tabs (all reached only from inside Workflows; none has a left-menu entry)

| tab | click-path evidence | file |
|---|---|---|
| **Workflows** | `"The Workflows tab on the Workflows page appears."` | access-workflow-fa9892a7.md |
| **Settings** | `"Settings tab and is shown in the following figure."` · `"New Settings tab option: Prevent purchase order transmissions setting."` | preventing-po-transmittal-…-51b11602.md · general-information-8b3b0308.md |
| **Email Notifications** | `"The administrator creates and maintains email notifications in Administration > Invoice > Workflows, on the Email Notifications tab."` · `"Select the Email Notifications tab."` | overview-8b3df67d.md · access-email-notifications-9f806b0b.md |
| **Approval Statuses** | `"Select the Approval Statuses tab."` after `"From the Invoice Processing Admin menu, click Workflows."` | accessing-the-approval-statuses-tab-7ec7bb6e.md |
| **Authorized Approvers** | `"Click the Authorized Approvers tab."` after the Workflows left-menu click | authorized-approver-list-a9522ec8.md |
| **Confirmation Agreements** | `"Select the Confirmation Agreements tab."` after `"From the Invoice Processing Admin menu, select Workflows."` · `"On the Confirmation Agreements tab of the Workflows page, select the desired agreement:"` | access-the-confirmation-agreement-tab-666fa0ac.md · deleting-a-confirmation-agreement-8cc92339.md |
| **Reason Category and Codes** | `"Click the Reason Category and Codes tab."` · `"Reason Category and Codes tab and options"` (guide revision history) | creating-a-reason-code-b2b61596.md · general-information-8b3b0308.md |

#### Sub-tabs (two levels deep — a real structural feature)

* Authorized Approvers → **Configuration** (`"Click the Configuration tab."`, procedure-2d20b513.md;
  corroborated `"on the Configuration tab of the Authorized Approvers tab"`, understand-ad-hoc-steps-ce0af3e7.md)
  and **Authorized Approver List** (`"Click the Authorized Approvers tab and then the Authorized Approver List tab."`,
  step-2-assign-the-level-to-the-approver-d8bf669c.md).
* Approval Statuses → **Invoice** (`"Click Approval Statuses tab, and then the Invoice tab."`) and
  **Purchase Request** (`"Administration > Invoice > Workflows > Approval Statuses > Purchase Request"`).

#### The wizard over the workflow OBJECT (NOT pages)

`Workflows tab` → select a workflow → `Copy` / `Modify` → **General page** → Next → **Steps page** →
**Step Rules page** → Done.
> `"On the Workflows tab, select the desired workflow and click Copy."` — create-a-new-workflow-554e86aa.md
> `"The Steps page appears."` — same file
> `"When done with all rules and actions, click Done on the Workflows tab."` — work-with-the-step-rules-page-4c33cda0.md

**The return to the tab is the giveaway.** `"Steps tab"` returns **ZERO** hits corpus-wide, so Steps
is a wizard page, not a tab. And `create-a-new-workflow-15992497.md` nests all three nouns in one
sentence: `"the General page in the Workflows tab of the Workflows tool"`.

**PAGE vs OBJECT, kept apart.** A *workflow* is an object and there can be many. Both
`create-a-new-workflow-*.md` files are about the OBJECT — **diffed by loio, genuinely two topics,
not a gerund/imperative republish**: `15992497` (2,017 B, loio `1599249793e440e794e4293a73dc68b4`)
is the conceptual note (`"To create a new workflow, an administrator must copy an existing invoice
workflow and make the appropriate edits."`); `554e86aa` (14,383 B, loio
`554e86aad4494ef2b3af767ea746e15f`) is the full General-page field procedure. Same page, same
procedure, two topics.

#### CONTRADICTIONS on this page (recorded, NOT reconciled)

| # | surface | competing labels | resolution basis |
|---|---|---|---|
| C1 | Settings | `Settings tab` · `Settings section of the Workflows tool` · `Settings page` · `Workflow Settings page` | **tab** — only the tab reading carries a click path (`"Settings tab and is shown in the following figure."`). The other three are prose. |
| C2 | Authorized Approvers | `Authorized Approvers tab` (plural, 3 with click paths) · `Authorized Approver tab` (singular, 2 with paths) · `the Workflows, Authorized Approvers page` · `Authorized Approvers section of the Workflows tool` · `Add Authorized Approvers page within Workflows` | **tab, plural** — five labels, one surface. Both singular paths still resolve inside Workflows. |
| C3 | Workflows tab | `Workflows tab` (14 topics) vs `Workflow tab` (1: `"The setting appears in Administration > Invoice > Workflows > Workflow tab"`) | plural wins on count; record the alias. |
| C4 | Email Notifications | plural in 4 topics vs `Email Notification tab` singular in create-a-new-workflow-554e86aa.md | plural is the click label. |
| C5 | Confirmation Agreement(s) | `"Select the Confirmation Agreements tab."` (the click step) vs `"On the Confirmation Agreement tab, click New."` (prose + topic title) | plural is the click label. |
| C6 | Wizard vocabulary | `General page` / `General step`; `Edit Workflow page`; `Add/Edit Workflow Steps page`; `Add Workflow Step page` vs `window`; `Modify Workflow Step` vs `Steps window` | aliases on one node each. |
| C7 | Depth collapse | administrator-experience-8b302852.md and approve-forward-feature-b847d65b.md put *Require Hardcopy Receipts* and *Steps Can Be Added By* "on the Workflows page" — the ancestor, not the General page | do **not** create a second node from this phrasing. |
| **C8** | **Restricted-role gate** | `creating-a-reason-code-b2b61596.md`: `"The Invoice Configuration administrator (_Restricted_) role is required to use the options on this tab."` then walks through **New → Save**. The release note: the Restricted role is **read-only** and `"actions such as New, Copy, and Remove are disabled."` | **UNRESOLVED.** Either the Reason Category and Codes tab is carved out of the read-only rule, or one of the two statements is stale. **This is the one place where the automation may hit a permission wall on Workflows.** Do not reconcile; carry both. |

#### Why Reason Category and Codes is a tab and not a page (the closest call in this group)

It is the **one** surface on this page with a role gate different from the page's own — and the
brief's tiebreaker says "own left-menu entry **or** own role gate = page". Half the tiebreaker fires.
Against it: **zero** left-menu hits, zero independent click paths, the gate sentence is explicitly
tab-scoped (`"the options on this tab"`), and the Workflows guide's own revision history lists it as
a tab alongside Confirmation Agreements (`"Reason Category and Codes tab and options"`). The Forms
and Fields precedent needed **two entry points**; this has none. **Verdict: tab, with the role gate
recorded as contradiction C8.** Two sweeps rated it `medium` confidence and I am carrying that
honestly rather than upgrading it.

#### Richness

`files=84 · bytes=217,634 · rawTableFiles=3 · longCatalogs=10 · estimatedFields≈100`

Two of the ten long catalogs are **not** field material and must not be mined as such:
`general-information-8b3b0308.md` (139 rows — the guide's **revision history**; use it for tab NAMES
and dates only) and `additional-approver-situations-fbb5034c.md` (a packed `<tr>` of 36 `<p>` cells —
an approver-resolution decision matrix, semantics not fields).

#### UI variant

**No New Experience twin exists anywhere in this domain.** `ls | grep -i new-experience` over both
guide dirs returns exactly **5** files corpus-wide (`end-user-experience-`,
`policies-the-purchase-order-policy-`, `purchase-order-matching-rules-`,
`using-the-invoice-manager-page-`, `using-the-unassigned-invoice-page-`); `grep -rl "New Experience"`
returns **9** files. **None is workflow configuration.** The only UI-generation signals in the area
are a tools-guides reference to `"uses the Authorized Approvers link from workflows in the classic
interface"` and a September 2025 revision-history line recording that the Workflows topics were
rewritten in place for a new UI. **`uiVariant: undifferentiated`, and this is a BUILD RISK, not a
missing page:** if the automation targets New Experience, Workflows is the one config area for which
the corpus offers no New Experience guidance at all.

#### Build aiming

**Aim at `admin-guides` only.** `grep -rl -e "Workflows tool" -e "Workflows page" -e "Workflows tab"`
over the 650 tools-guides files returns **ZERO**. Every workflow-named tools-guides file is
approver/processor runtime.

---

### PAGE 2 — **Email Reminders**   `separate-tool`   found by 2 of 6 sweeps (independently verified here)

**Aliases:** Email Reminders tool · Email Reminders page

**navPath:** `Administration > Invoice > Invoice Processing Admin > Email Reminders`
> `"From the Invoice Processing Admin navigation menu, choose Email Reminders."` — access-email-reminders-96f3ca18.md
> `"The Email Reminders page appears."` — same file

**Own role gate, different from the Workflows gate**
> `"The Email Reminders tool is visible if you have the Invoice Configuration administrator (Restricted) role."` — email-reminders-tool-8b2c8a11.md
> `"allows a Global and Group Configuration administrator to create, edit, and delete email reminders by group"` — same file
> `"Group administrators can only create email reminder rules if given \"create\" rights."` — create-reminder-rules-b0a7fac5.md

**Own two tabs**
> `"On the Email Reminders page, select the Rules tab."` — create-reminder-rules-b0a7fac5.md
> `"On the Email Reminders tab of the Email Reminders page, create a new configuration."` — configuration-process-8b2c271f.md
> `"The rules are set up in the Rules tab of the Email Reminders page."` — before-you-begin-448d2513.md

**Both halves of the tiebreaker fire.** Own menu destination in the same syntactic slot as six built
pages; own role gate; own tab strip; own object model (a rule must exist before a reminder).

**THIS IS THE EASIEST COLLAPSE ERROR IN THE DOMAIN, AND I AM FLAGGING IT LOUDLY.** Email Reminders
(this page) and the Workflows > Email Notifications tab are two different surfaces that both email
approvers. **Notifications** are event-driven templates authored inside Workflows and assigned to a
workflow object. **Reminders** are interval-driven nag emails with their own rule engine on their own
page, assigned by group. Do not merge them.

**Independent corroboration from inside the graph itself.** The Group 3 build left a value set
deliberately orphaned — `vset.g3.unnamed.email-message-replacement-tokens-…`, `knownGap: true` —
whose note reads: *"WHAT WOULD FIX IT: SAP publishing the PO transmittal tooltip's own token roster,
**or an Email Reminders page node that owns this table properly**."* The graph is already asking for
this page. `email-message-replacement-tokens-c9cc4af4.md` belongs **here**, not to the Email
Notifications tab — `"how those options are used on the Add Email Reminder page"`. One sweep filed it
under Email Notifications; that is a mis-file and I correct it.

**Label collision to carry:** `Rules tab` is also a tab of the built **Purchase Order Matching Rules**
page and shadows the workflow **Step Rules page**. Three different "Rules" surfaces.

`files=17 · bytes=37,033 · rawTableFiles=0 · longCatalogs=2 · estimatedFields≈25`
One of the two long catalogs, `email-reminders-8b2caa99.md` (91 rows), is the guide's **revision
history**, not a roster. The real roster is `create-email-reminders-604c4a46.md` (10,163 B, 49 rows,
**0 on the naive anchor**).

**Adjacent-page check:** group-level reminder assignment touches the built **Group Configurations**
page (22 fields). No built field cites any reminder file — verified. No duplication.

---

### PAGE 3 — **Delegate Configurations**   `admin-page`   found by 5 of 6 sweeps

**Aliases:** Delegate Configurations tool · Delegate Configuration · Payment Delegate Configurations ·
Invoice delegates

**navPath:** `Administration > Invoice > Delegate Configurations`
> `"Select Delegate Configurations (left menu) , the Delegate Configurations page appears."` — access-and-view-payment-delegate-configurations-8ed1298f.md
> *(the stray space before the comma is verbatim in the source — do not tidy it)*
> `"Invoice delegates are accessed from the Invoice Admin link."` — same file

**Own tabs and own child pages**
> `"Select the Invoice or Purchase Request tab."` — access-and-view-payment-delegate-configurations-8ed1298f.md
> `"On the Delegate Configurations page, select either the Invoice or Purchase Request tab."` — create-a-new-invoice-delegate-configuration-fcf42662.md
> `"Choose New. The Add Delegate Configuration - Invoice page appears."` — same file

**It is squarely approval configuration** — it decides who may approve on behalf of whom and for how
long — and it cross-references the Workflows Authorized Approvers tab directly (a field
*"Restrict approvers to those with equal or higher authorized approver limit"*). The corpus **never**
places it under Workflows: not once in 17 delegate-named admin files. It is a sibling page.

**Resolves an already-written graph endpoint:** `dep.g1.059` → `{Delegate Configurations, Delegate
Configuration}`, unresolved, carrying the exact cardinality quote
`"Each group within your company can only have one Invoice delegate configuration."` — written by an
agent with no roster, so independent corroboration of the NAME.

`files=17 · bytes=33,041 · rawTableFiles=0 · longCatalogs=2 · estimatedFields≈25`
As with Email Reminders, one long catalog (`delegate-configuration-8b2bd26d.md`, 91 rows) is the
guide's **revision history**. The rosters are `create-a-new-invoice-delegate-configuration-fcf42662.md`
(6,302 B, 22 rows, **0 naive**) and `access-and-view-payment-delegate-configurations-8ed1298f.md`
(3,872 B, 37 rows, **0 naive**).

**Boundary with Workflows:** exactly ONE shared source file,
`delegate-self-approval-1b627285.md` (1,284 B) — the workflow **General page** field *Allow delegated
approvers to approve their own requests*. **That field belongs to Workflows, not here.** The Delegate
Configurations run must not extract it.

---

### PAGE 4 — **Feature Hierarchies**   `admin-page`   found by all six sweeps  — **INHERITED FINDING (3)**

**Aliases:** Feature Hierarchies section in Administration · Feature Hierarchies area · **Hierarchies**

**navPath:** `Administration > Invoice > Feature Hierarchies`
> `"Click Feature Hierarchies (left menu)."` — tools-guides/step-2-associate-the-feature-hierarchy-to-the-source-list-bcaf1f5a.md
> `"Select the Invoice Payment feature name."` → `"Select Modify Hierarchy."` — admin-guides/professional-edition-fb3e6aa2.md

**Own role gate, worded exactly like the Workflows gate — the two are peers**
> `"This portion of the configuration requires permissions for the Feature Hierarchies section in Administration."` — step-1-define-the-cost-object-approver-hierarchy-6e7b7dc6.md

That sentence and the Workflows gate sentence appear as **step 1 and step 3 of the same numbered
setup flow**. Two gates, two surfaces, stated in contrast by SAP itself.

**MIDDLE-NODE STATUS: `Invoice Processing Admin` is UNATTESTED for this page.** Both paths go
`Administration > Invoice > Feature Hierarchies` with no middle segment. Record as *unattested*, not
as *absent*. **This matters for the automation:** the left-menu entry is a **sibling** of Workflows,
not a child, so a driver told to reach it via a Workflows path will fail.

**MENU-LABEL ALIAS no prior artefact records:** `hierarchies-7f68a876.md` writes the label as
plain **`Hierarchies`** — `"first configure their hierarchy structure in Administration"` …
`"Hierarchies (explained below)."` (the separators are U+00A0; quote around them).

**VERDICT ON FINDING (3): it belongs to NEITHER Workflows nor Routing Configuration — it is its own
thing, and I am claiming it on this roster rather than deferring it a second time.** One page hosts
at least five named feature hierarchies serving four different config domains:

| hierarchy | consumer |
|---|---|
| Invoice Routing | **Routing Configuration** (G2, built) |
| Invoice Payment | Payment Group Configuration (Ops) |
| Invoice Vendor Employee Access | Group Configurations / vendor work (G1/G5) |
| Payment Authorized Approver | **Workflows > Authorized Approvers tab** |
| Cost Object Approver | **Workflows > workflow General page** |

Folding it into Workflows would mis-file routing and vendor access; folding it into Routing
Configuration would mis-file the COA hierarchy. **Build it once as its own page and have both point
at it.** It resolves four already-written unresolved endpoints — `dep.g1.061`, `dep.g2.003`,
`dep.g5g5.050`, `dep.g5g5.051` — every one of which is about a **Source List**, exactly the field this
page owns (`"In the Source List, select the name of the list you created in Step 1"`).

**HARD FORWARD REFERENCE INTO THE WORKFLOWS BUILD:**
> `"You must define the authorized approver hierarchy (Invoice > Feature Hierarchies)"` — understand-the-hierarchy-b65d7089.md

The Authorized Approver feature cannot be activated without it. Leaving it unbuilt leaves a dangling
prerequisite in the workflow chain.

**THIN IS THE CORRECT ANSWER HERE AND THE BUILD MUST BE TOLD BEFORE IT STARTS.**
`files=12 · bytes=23,239 · rawTableFiles=0 · longCatalogs=1 · estimatedFields≈5`
**Every one of the field-bearing files returns 0 indented table rows.** The one long catalog,
`understand-the-hierarchy-b65d7089.md` (69 rows), is a **worked example** of an approver hierarchy —
example data, not a field roster. SAP files the substance in the *Shared: Feature Hierarchies Setup
Guide*, which is **not in this corpus**. Expect ~5 fields (Source List, Level, Segment Name, feature-name
selector, Modify Hierarchy). This is the Budget-Configuration failure mode; predict it, do not
manufacture fields around it.

---

## 3. THE FIVE INHERITED FINDINGS — VERDICTS

### (1) The Invoice / Purchase Request / Purchase Order Settings family — **CONFIRMED, ANSWER (a)**

**All three live on the Workflows > Settings tab. There is NO Invoice Settings rebuild debt.**

Clincher reproduced verbatim:
```
grep -c "select their own approver" <admin>/available-invoice-settings-8b3411f0.md   -> 0
grep -c "select their own approver" <admin>/invoice-settings-cace748d.md             -> 2
bytes: 8368  vs  4901
```
**New datum nobody reported before:** the same grep returns **2** on
`purchase-request-settings-b0bce285.md` as well — a third member of the family, and further evidence
of family cohesion rather than coincidence.

**Family cohesion is mechanically provable.** `grep -rl "apply globally to"` over both guide
directories returns **exactly three files and nothing else**: the invoice, PR and PO members.

**Graph verification (I read the JSON myself):** **ZERO** of the 486 `configFields` cite
`invoice-settings-cace748d.md`, `purchase-request-settings-b0bce285.md` or
`purchase-order-settings-a5a997b4.md`. The built Invoice Settings page has 13 fields, **9** of which
cite `available-invoice-settings-8b3411f0.md` and the other 4 cite four other unrelated files.
**The invoice member never belonged to the built page, so answer (c) is refuted and nothing is
re-homed by this group.**

**Positive placement, four independent strands:**
1. `preventing-po-transmittal-when-po-exceeds-specified-exception-level-51b11602.md` —
   `"A setting in Workflows can be used to prevent PO transmission"` and `"Settings tab and is shown
   in the following figure."`, plus `"works just as the payment or purchase request settings of this
   type"` — SAP tying all three siblings to one tab in one topic.
2. The Workflows guide's own revision history, `general-information-8b3b0308.md` —
   `"New Settings tab option: Prevent purchase order transmissions setting."` (the PO member) and
   `"Addition of two new options to the Settings tab:"` followed by two rows that are literally rows
   4 and 5 of the packed `<table>` inside `invoice-settings-cace748d.md`.
3. `workflow-creation-process-1d37b85f.md` — `"you must clear a setting in the Settings section of
   the Workflows tool"`, describing the same centralized-workflow control that is row 1 of the
   invoice member.
4. Two topics *inside the Workflows wizard* call the same field `"field on the Settings page cleared
   (disabled)"` (create-a-new-workflow-554e86aa.md) — i.e. the wizard refers outward to its own page's
   Settings tab.

**NAMING RULE FOR THE BUILD — LOAD-BEARING.** This is a **label collision**, not a family split. Name
the child node **`Settings tab`** or **`Workflow Settings`**, **NEVER `Invoice Settings`**, or the
graph will merge it with the built Group 1 page (`/expense/admin/invoice/invoiceSettings.asp`).

**CORRECTION TO THE BRIEF:** `invoice-settings-cace748d.md` is described as a **3-row** table. It is
**FIVE settings**. `grep -c "<tr"` returns 1; `grep -o "<tr" | wc -l` returns **3**; `<p` returns 6.
Two markdown rows plus three packed into one `<table>`. Tab payload = **5 + 3 + 1 = 9 settings**.
A markdown-only extractor loses three of the five on the very file that settles this finding.

**PROSE RANGE FLAG:** `"Type a number from one to 99."` verified present **once in each of the three
files**. No digit-based range regex will find it. Note also that the built Exceptions page spells the
same range `0 and 99` — a genuine cross-page discrepancy worth recording.

**TWO GRAPH DEFECTS reported, not fixed by this group:**
* `dep.g2.011` targets page `"Invoice Settings"` for *"Prevent this payment request submission when
  exception level exceeds X"* while citing `invoice-settings-cace748d.md`. Should target
  **Workflows > Settings tab**.
* `dep.g2ar.025` targets `"Invoice Settings"` for `exception_level_limit` on the quote
  `"The limit is set using the Invoice Admin, Workflows, and Settings."` — that quote names
  *Workflows > Settings*. It duplicates the already-correct `dep.g2ar.024`.
* (Third, separate) `page.exceptions.navPathAlternates` contains
  `"Administration > Invoice > Workflows > Settings"`, which is not a route to Exceptions.

`dep.g2.012`, `dep.g2.013` and `dep.g2.014` all resolve to **Workflows > Settings tab**.

---

### (2) One page with tabs, or several pages? — **CONFIRMED: ONE PAGE, SEVEN TABS**

Settled on the two stated tiebreakers.
* **Left-menu entry:** Workflows has 8 `(left menu)` hits plus 5 Invoice-Processing-Admin
  destinations. Every candidate tab has **ZERO**. `"Steps tab"` returns **ZERO** corpus-wide.
* **Role gate:** one gate for the whole surface, stated twice as *"the Workflows **section** in
  Administration"* — never per tab. The single tab-level role note (Reason Category and Codes) is a
  *narrower* role on the same page and is itself in contradiction with the release note (C8).
* **Release note structure:** `Workflows Page` as a single heading containing the workflow list, the
  Approval Statuses and the Settings.

Audit Rules precedent, not Forms and Fields. **The PAGE and the OBJECT are kept apart:** the page
lists and edits workflow objects; `create-a-new-workflow-*.md` is about the object; General / Steps /
Step Rules are wizard steps over that object, described by the release note as *details of a list
item*.

**The four `workflow-guides-*.md` files, diffed as instructed** — four distinct loio, four distinct
body md5 (`93fa7bbfd6`, `1ad7eaa05e`, `1f30c5b2b4`, `e052eac989`), identical 4-row payload naming four
external SETUP GUIDES. **They are the reason this area LOOKS like four pages: SAP split the
documentation by topic, not the UI.** No node.

---

### (3) Feature Hierarchies — **CONFIRMED as a real page; belongs to NEITHER group; CLAIMED HERE**

See PAGE 4. Real left-menu entry, own role gate stated in contrast to the Workflows gate inside one
setup flow, five hierarchies across four domains, four unresolved graph endpoints all pointing at its
Source List field. Its documentation is **thin by SAP's design** (substance deferred to a Shared guide
absent from this corpus) and the build must be told to expect ~5 fields.

---

### (4) The Routing Configuration boundary — **CONFIRMED CLEAN, no re-homing, no mis-homed field found**

I read all 10 built Routing Configuration fields out of the graph first:
`search_routing_mappings · employee_last_name · segment_1_3 · delete_flag · employee_id ·
level_1_10_code · browse_button · import_button · download_template_button ·
import_details_type_filter` — all of them hierarchy-mapping **search and spreadsheet-import**
mechanics, nine of ten cited to tools-guides import topics. That page assigns invoice **ownership**.
It contains no approver, step, rule, status or notification control, and nothing in the Workflows tree
duplicates it. **I raise no finding against the existing graph on this axis.**

**The word "routing" is a three-way homonym and the build must carry the distinction:**
1. **Routing Configuration** (built) = employee→hierarchy mapping import → invoice *ownership*.
2. **approval routing** = the ordered approval chain → Workflows > Steps + Step Rules.
3. **Invoice Routing feature hierarchy** = a hierarchy object → the Feature Hierarchies page.

**`tools-guides/workflow-and-approval-routing-8b4ff6c9.md` — opened as instructed.** 1,502 B. Its
entire body is `"All workflow options available for non-PO policies are also available to a PO-based
invoice policy."`, `"This includes options such as workflow rules and Authorized Approvers."`, a Best
Practice paragraph, and two cross-references. **No page, no tab, no field, no click path, no role.**
It **falls on the WORKFLOWS side and it does not straddle** — its only two substantive nouns are
workflow rules and Authorized Approvers, both Workflows surfaces, and it never mentions hierarchy
mappings or the Routing Configuration page. Classification: `feature-name-only`. **It should NOT seed
fields on either page.**

**Audit Rules / Exceptions boundary (91 fields, 8 fields, both built):** real overlap exists and is
**duplication to dedupe, not new pages.** (a) The condition editor is explicitly shared —
`"The Condition page in the Workflows tool is similar to the Condition Editor page used in the Audit
Rules tool"` — so dedupe the Step Rules condition roster against the built Audit Rules columns before
extracting. (b) Exception LEVELS are authored on Audit Rules/Exceptions; the BLOCKING THRESHOLDS are
three separate controls on Workflows > Settings tab plus Min/Max Exception Level on Authorized
Approvers > Configuration. Different fields, different pages, both needed. `dep.g2ar.024` already
states this correctly. (c) The **Exception Helper** is a shared dialog inside both tools, not a page
for either.

---

### (5) End-user traps — **CONFIRMED; every rejection below names where its configuration lives**

See §4. This domain is dominated by approver-side runtime and the discriminator is not the filename:
`add-approval-steps-2e17fab0.md` (tools-guides, runtime) and `work-with-the-steps-page-fab249d1.md`
(admin-guides, config) describe the same noun on two surfaces. **The approval STEP is configured on
the Workflows wizard's Steps page and EXECUTED by an approver on the Approval Flow page.**

---

## 4. DEFERRED — with the reason, and for every end-user screen, WHERE ITS CONFIGURATION LIVES

### 4.1 Tabs and sub-tabs of the Workflows page (belong to PAGE 1, not roster entries)
Workflows tab · Settings tab · Email Notifications tab · Approval Statuses tab (+ Invoice,
Purchase Request sub-tabs) · Authorized Approvers tab (+ Configuration, Authorized Approver List
sub-tabs) · Confirmation Agreements tab · Reason Category and Codes tab. Each has a click path only
from inside Workflows and no role gate of its own except C8.

### 4.2 Wizard pages and dialogs over the workflow OBJECT (belong to PAGE 1)
General page (aka General step / Edit Workflow page) · Steps page (aka Add/Edit Workflow Steps page) ·
Step Rules page · Add / Modify Workflow Step window · Edit Condition window · Edit Action window ·
Condition page · New / Modify Authorized Approver window · Request Status window (Invoice sub-tab) ·
**Report Status window** (Purchase Request sub-tab — the window name genuinely differs between the two
sub-tabs; record it, do not reconcile) · Confirmation Agreement window · Modify Email Notification
3-step wizard. **These are where the fields live; they are not roster entries.**

### 4.3 End-user / runtime screens — REJECTED, with the config home named

| runtime screen | WHERE ITS CONFIGURATION LIVES |
|---|---|
| **Approval Flow page** / Approval Flow for Invoice / for Purchase Request (`"The Approval Flow for Invoice page appears by clicking Details"`) | Workflows > **General page** (*Steps Can Be Added By*, *Do not display the skip steps to the employee*, *Restrict Authorized Approver for*, *Editable By Group(s)*) + **Steps page** (*Approver Editable By*, *Deletable By*) + **Settings tab** (*Allow users to select their own approver for payment requests*, which per `invoice-settings-cace748d.md` `"the Edit Workflow page and the Add/Edit Workflow Steps page"` **overrides** the workflow-level fields). |
| **My Work approval links on the home page** | Workflows > **Settings tab**, *Display payment request approval links to approvers on the home page* — `"under the My Work area on the home page"`. |
| **Requests Pending Your Approval window** | Workflows > **Settings tab**, PR member, *Display purchase request approval links to approvers on the home page* — `"Requests Pending Your Approval window"`. |
| **Approve / Send Back to Employee / Recall buttons and their labels** | Button TEXT: Workflows > **Approval Statuses tab > Invoice tab**, *Action Text* — `"This text becomes button text for the approver"`. WHICH actions appear: Workflows > **Steps page**, *Approval Actions*. Recall: **General page** *Allow employee to recall payment requests* + **Settings tab** *Allow processor to recall a payment request to last processor step*. |
| **Add Approval Steps / Send to an additional approver / Approve & Forward** (all tools-guides) | Workflows > **General page** *Steps Can Be Added By*; restricted to authorized approvers via Workflows > **Authorized Approvers tab**. |
| **Approver experience / approver UI / ~15 `approver-action-*` topics** | Workflows > **Steps page** (*Approval Actions*) + **Approval Statuses tab** (status, Action Text, Description). |
| **Reason picker a processor must use when returning an invoice** | Workflows > **Reason Category and Codes tab**. |
| **Final Review / Confirmation modal on submit and approve** | Workflows > **Confirmation Agreements tab** (the text) + **General page** (*Submit Confirmation Agreement*, *Approval Confirmation Agreement*). |
| **Delegate / proxy switching, delegate experience, "acting as"** | **Delegate Configurations page** (PAGE 3) for the permission template + Workflows > **General page** *Allow delegated approvers to approve their own requests*. Per-user delegate assignment is in **Profile / User Administration**, outside this graph. |
| **Invoice Manager page / Unassigned Invoice page** (both `-new-experience-`) **/ Approvals list / Approve Invoices** | Ownership assignment: **Routing Configuration** (G2, built) + **Feature Hierarchies** (PAGE 4). Role assignment: **User Administration**, outside the Invoice admin surface. Nothing on Workflows configures these. |
| **Batch verification workflow** (`moving-through-the-batch-verification-workflow-01738020.md`) | A pure name collision on "workflow". **Capture Processing Admin** (G4, built) — its Task Definitions and Other Settings tabs. |
| **Email notifications received by users; Invoice Preferences opt-in** | Content and existence: Workflows > **Email Notifications tab**. Per-workflow assignment: **General page**. The opt-in itself is `Profile > Profile Settings > Invoice Preferences`, an end-user page outside this graph. |

### 4.4 Feature names with no screen of their own
* **Cost Object Approval** (13 files, ~20.8 KB, rich but screenless). Configured on Workflows >
  **General page** (*Cost Object Hierarchy Type* = Level/Limit, *Allow Self Cost Object Approval* —
  `"In the General step, select the Allow Self Cost Object Approval option."`), Workflows >
  **Settings tab**, Workflows > **Steps page**, and **Feature Hierarchies** (the COA hierarchy).
  **Do NOT create a Cost Object Approval page.**
* **Authorized Approver Hierarchy / Cost Object Approver Hierarchy** — hierarchy OBJECTS, configured
  on **Feature Hierarchies** (`"The groups that appear here are from the Authorized Approver Hierarchy"`).
* **Workflow and Approval Routing** — see finding (4). Feature-name-only, Workflows side, configures nothing.
* **Workflow Guides** (4 files) — a documentation index. `"Refer to these guides when configuring and
  maintaining workflows."` No screen. A node here would repeat the documented past error.
* **Workflow Settings** (`workflow-settings-8b3b98e1.md`, 743 B) — a content-free section header
  (`"Workflow settings provide configuration options to tailor workflow behavior to specific business
  requirements."`). It is the guide's heading for the Settings tab. **Do not create a page node.**
* **Purchase Request Settings / Purchase Order Settings** as pages — settings tables on the Settings
  tab. The `dep.g2.012` / `dep.g2.013` endpoints corroborate the NAMES only, not page-hood.
* **Default Workflows / Default PO Payment Workflow / Purchase Request Workflow** — shipped workflow
  OBJECTS, edited through the Workflows tab wizard.
* **Exception Helper** — a shared dialog inside both Audit Rules and the Workflows Step Rules page.
* **Approver / Default Approver / Budget Approver assignment** — `"An Approver is set within User
  Permissions"`. **User Administration / User Permissions and the employee import (record type 720)**,
  Shared admin tools outside the Invoice config surface. Budget approvers → built **Budget Configuration**.
* **Vendor Approval step timeout** (`about-vendor-approval-workflow-step-and-timeout-b3d1bd2c.md`) —
  two ORPHAN field names (*Workflow Step Timeout Duration*, *Approval Action*) with **no click path
  anywhere in the corpus**. Structurally they must be Steps-page fields, but the corpus never says so.
  **Record as unresolved rather than inferring a home.** This is a deliberate "I am not sure".

### 4.5 Already-built pages that a Workflows candidate resolves to (duplicates, not pages)
**Routing Configuration** (G2, 10 fields — boundary clean, see finding 4) · **Audit Rules** (G2, 91
fields — condition editor and exception levels are duplication to dedupe) · **Exceptions** (G2, the
documented hub: `"appear as options for the Audit Rules tool and Workflows tool when creating rules"`) ·
**Invoice Settings** (G1 — label collision only, nothing moves) · **Policies** (G1 — a workflow is
*assigned* to a policy; a dependency) · **Group Configurations** (G1 — reminders assigned by group) ·
**Capture Processing Admin** (G4 — its Email Administration / Supplier Email Administration tabs are
inbound image-capture aliases, NOT workflow notification surfaces) · **Purchase Order Matching Rules**
(G3 — carries `confirmation_type` / `edit_confirmation_button` from *Receipt Confirmation Type*, a
DIFFERENT feature from workflow **Confirmation Agreements**; do not merge the two).

### 4.6 Real left-menu pages found in passing, belonging to no group — reported so they are not lost a third time
* **Change Log** — `"From the Invoice Processing Admin menu, select Change Log."` A genuine
  Invoice-Processing-Admin page, but a **read-only audit viewer of configuration changes**. It
  configures nothing, so it is not a config page for this graph. **Nothing configures it.** Group 7 (Ops).
* **Localization** — Group 6, already scoped as unbuilt. Localizing email-reminder text sits on this
  group's boundary; Group 6 will need `localizing-email-reminder-text-8b2cc1b0.md`.
* **Attendees** — one sweep flagged this as an unclaimed Invoice admin page. **It is not.** Verified:
  every hit reads `Administration  Expense  Attendees (left menu)` — an **Expense** page, outside the
  Invoice admin config surface entirely. Correction recorded so no one chases it.

---

## 5. RECONCILIATION AGAINST THIRTEEN

The lost map recorded **13 pages of workflow config under ONE left-menu entry** — and that
parenthetical is the tell. It was counting **named surfaces inside the Workflows page**, and it never
counted the three adjacent left-menu pages at all.

**The most likely mapping, and it lands exactly on 13:**

| # | what the lost map probably counted | what it actually is |
|---|---|---|
| 1–7 | Workflows · Settings · Email Notifications · Approval Statuses · Authorized Approvers · Confirmation Agreements · Reason Category and Codes | the **seven tabs** |
| 8–10 | General · Steps · Step Rules | the **three wizard pages** over the workflow object (SAP itself calls each a "page") |
| 11–13 | Invoice Settings · Purchase Request Settings · Purchase Order Settings | the **three settings tables** on the Settings tab — each has its own topic title that reads like a page name, and the graph's own `dep.g2.012` / `dep.g2.013` endpoints literally record two of them as `page:` values |

7 + 3 + 3 = **13**. Every one of those thirteen is corpus-attested; not one is a page.

An alternative accounting also reaches ~13 (7 tabs + 4 sub-tabs + 2 of the wizard pages = 13), and I
cannot choose between them on evidence. The first is more likely because it maps onto **named
artefacts with their own topic titles**, which is what an agent reading topic files would have
counted.

**My count vs 13, stated plainly:** **1 page** where the lost map recorded 13 surfaces, plus **3 pages
the lost map never counted at all** because they sit outside that one left-menu entry. Net roster: **4**.

The comparison to the last group is instructive and should temper confidence in lost-map numbers
generally: that group's map claimed 11 pages and the real answer was 2. Here the map claimed 13 and
the real answer is 1 + 3. **The surplus is not error — it is a category confusion between a *surface*
and a *page*, and this time it maps cleanly.** I have neither padded to 13 nor trimmed to it.

---

## 6. SPLIT PROPOSAL

Measured inventories (real `wc -c`), and overlaps computed with `comm`:

| page | files | bytes | est. fields | shares files with |
|---|---|---|---|---|
| Workflows | 84 | 217,634 | ~100 | Feature Hierarchies (2), Delegate Configurations (1) |
| Feature Hierarchies | 12 | 23,239 | ~5 | Workflows (2) |
| Email Reminders | 17 | 37,033 | ~25 | none |
| Delegate Configurations | 17 | 33,041 | ~25 | Workflows (1) |

**Proposed split — TWO runs, and it must not cut through Workflows** (a `--patch` merge replaces a
page's fields wholesale):

* **Run A — `Workflows` + `Feature Hierarchies`** — 94 unique files, **234,519 B**, ~105 est. fields.
  They are paired because they **share source files**, one of which
  (`understand-the-hierarchy-b65d7089.md`, 69 indented rows) is a long catalog that would otherwise be
  read twice. Feature Hierarchies adds almost no cost (~5 fields, zero tables) and carries the
  Workflows build's hard forward reference.
* **Run B (`--patch`) — `Email Reminders` + `Delegate Configurations`** — 34 unique files,
  **70,074 B**, ~50 est. fields. Zero overlap with each other and zero with Run A except one 1,284 B
  file (`delegate-self-approval-1b627285.md`), whose field belongs to the **Workflows General page** —
  **Run B must not extract it.**

**The imbalance (about 70/30 by bytes) is irreducible and I am not going to pretend otherwise.**
Workflows is a single indivisible page holding roughly two thirds of the group's material — more than
the built Audit Rules page (91 fields) — and the `--patch` constraint forbids splitting it. Run A is
the heavy run; give it the stronger model tier and budget for a page with seven tabs, four sub-tabs,
a three-page wizard and roughly a dozen dialogs. Run B is two mid-size, structurally simple pages
(one object list + one editor each) and can run cheaper.

**If a three-way split is preferred**, the only clean cut is
`Workflows + Feature Hierarchies` / `Email Reminders` / `Delegate Configurations` — but that buys
nothing, because the binding constraint is Workflows, not the tail.

---

## 7. BUILD FLAGS — carry these into the Map phase

1. **Census:** always `grep -cP "^\s*\|"`, never `grep -c "^| "`. The richest file in the group scores
   **0** on the naive anchor.
2. **Packed `<tr>`:** three files in this group hide their payload in raw HTML. Count `<p` inside a
   table before judging it small. `invoice-settings-cace748d.md` is **5 settings, not 3**.
3. **Prose ranges:** `"Type a number from one to 99."` in all three Settings-tab family files. No
   digit regex will find it.
4. **NBSP separators:** the most important nav sentences separate menu levels with U+00A0 and no `>`
   at all (`preventing-po-transmittal-…`, `hierarchies-7f68a876`, `professional-edition-fb3e6aa2`,
   `workflow-667cee21`, `self-approval-of-cost-object-based-workflows-20fd435d`). **Never `grep -F`
   across a menu arrow in this corpus** — quote around the separators.
5. **Generic topic titles:** `procedure-2d20b513.md` (Authorized Approvers > Configuration sub-tab),
   `overview-9c8ca06e.md` (Reason Category and Codes), `overview-8b3df67d.md` (Email Notifications),
   `configuration-8b3be88b.md`. **Identify by filename or loio, never by title.**
6. **Title/content mismatch:** `select-an-email-notification-in-the-workflows-tab-663bb8ac.md` is titled
   for the Workflows tab but documents the **General page's** three notification-selection fields.
7. **Two-surface pattern, three times:** Email Notifications, Confirmation Agreements and Approval
   Statuses are all **authored on their tab** and then **selected/assigned on the workflow General
   page**. Model both halves or the dependency graph will be wrong.
8. **Per-object vs global override:** the Settings tab's *Allow users to select their own approver*
   explicitly **overrides** the per-workflow *Editable By Group(s)* and *Steps Can Be Added By*.
   Capture it as a dependency.
9. **Aim at admin-guides.** tools-guides yields **zero** Workflows-surface topics; its workflow files
   are all runtime.
10. **Ordering (from `workflow-creation-process-1d37b85f.md`, the ConfigStep source):** approval
    statuses → feature hierarchies → authorized approvers → workflow object (General/Steps/Step Rules)
    → associate to a Policy.

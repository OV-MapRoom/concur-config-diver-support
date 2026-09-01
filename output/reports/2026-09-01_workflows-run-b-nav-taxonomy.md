# Map / Navigation Survey — Run B: Email Reminders and Delegate Configurations

Corpus: SAP `2026_08`, Professional Edition, crawled 2026-08-29.
Both guide directories searched at equal weight. **Result of that sweep: every file that
documents either page lives in `concur-invoice-professional-edition-admin-guides/`. The
tools-guides directory contributes ZERO source files to either page** — its five
delegate-matching files are end-user proxy/delete-invoice topics and a condition-editor
field catalogue, none of which describe either admin page. That is a positive finding,
not a skipped search.

No URL is published for either page. The corpus publishes no `.asp` URL anywhere, and
`navPath` is the identifier for both.

---

## 1. Email Reminders

### 1.1 Page identity — CONFIRMED

Email Reminders is its own admin page, not a tab of Workflows. Three independent
structural facts, each grounded:

1. **Its own menu destination**, in the same syntactic slot as six already-built pages:
   `"From the Invoice Processing Admin navigation menu, choose Email Reminders."`
   followed by `"The Email Reminders page appears."`
   (`access-email-reminders-96f3ca18.md`).
2. **Its own two-tab object surface** — Rules and Email Reminders, both attested with the
   phrase "of the Email Reminders page".
3. **Its own object model with two object types and full CRUD on each** — reminder RULES
   (create / copy / edit / delete, four dedicated topics) and email REMINDERS (create /
   copy / edit / delete, four more). A rule must exist before a reminder can use it.

I explicitly do NOT rest page-hood on the role gate. The recon brief already corrected
that: `Invoice Configuration administrator (Restricted)` gates NINE surfaces in this
corpus — measured, `grep -rln "Invoice Configuration administrator (Restricted)"` over
both directories returns exactly 9 files (`email-reminders-tool-8b2c8a11.md`,
`overview-8b2edfd0.md`, `required-roles-1f2a20f6.md`,
`set-a-default-shipping-and-billing-address-f772bed1.md`,
`shipping-configuration-and-shipping-terms-3429ee14.md`, plus four tools-guides files).
The gate is real; it is not a discriminator.

### 1.2 Navigation

Two documented idioms, and they must both be recorded:

| navPath | quote | file |
| --- | --- | --- |
| Administration > Invoice | `Select Administration  Invoice.` | access-email-reminders-96f3ca18.md |
| Administration > Invoice > Invoice Processing Admin > Email Reminders | "From the Invoice Processing Admin navigation menu, choose Email Reminders." | access-email-reminders-96f3ca18.md |
| (landing confirmation) | "The Email Reminders page appears." | access-email-reminders-96f3ca18.md |
| Administration > Invoice > Email Reminders (middle node UNATTESTED in this sentence) | `The Email Reminders tool, located in Administration  Invoice, allows a Global and Group Configuration administrator to create, edit, and delete email reminders by group. Group Configuration administrators can only create, edit, and delete email reminders for the groups to which they have access permissions.` | email-reminders-tool-8b2c8a11.md |

**⚠ NBSP, MEASURED.** Both of the sentences above that name `Administration` contain
**NO `>` glyph at all**. The separators are two consecutive U+00A0 characters:

- `access-email-reminders-96f3ca18.md`, 2 NBSP, step 1 reads
  `Select Administration<U+00A0><U+00A0>Invoice.`
- `email-reminders-tool-8b2c8a11.md`, 2 NBSP, the role sentence reads
  `... located in Administration<U+00A0><U+00A0>Invoice, allows a Global and Group ...`

`create-email-reminders-604c4a46.md` (14 NBSP) and `create-reminder-rules-b0a7fac5.md`
(14 NBSP) carry theirs inside the **Editable By** descriptions
(`Global Group<U+00A0><U+00A0>United States`), not in a nav sentence.

**Emission decision for the structured object.** `bin/validate-graph.py` normalises NBSP
to a space before comparing, so a retyped quote passes validation and lands permanently
wrong — a nav string a Chromium driver can never match. I measured my own emission
fidelity twice against these two files and it was **not reliable** (one attempt produced
U+00A0, one produced U+0020, same intent). Rather than gamble a silently-wrong string
into the graph, the two NBSP sentences are **NOT emitted as sourceQuotes**. Instead:

- the `Administration > Invoice` first segment is attested by the deliberately
  boundary-truncated verbatim `"Select Administration"` (grep -F verified, 1 hit), cut
  exactly where the first U+00A0 begins;
- the role gate is attested by the ASCII-clean tail
  `"allows a Global and Group Configuration administrator to create, edit, and delete email reminders by group."`
  (grep -F verified, 1 hit).

A correction pass that can write bytes directly should replace both with the full
sentences shown above, inserting U+00A0 U+00A0 where this document writes
`<U+00A0><U+00A0>`. **Do not retype them by hand.**

The `(left menu)` census misses this page entirely — its access topic uses the other
phrasing. That is why four of six recon sweeps failed to find it.

### 1.3 Tabs

Two tabs: **Rules** and **Email Reminders**. Every attestation binds the tab to "the Email
Reminders page":

- "On the Rules tab of the Email Reminders page, create any specific email rules for the reminder" (configuration-process-8b2c271f.md)
- "On the Email Reminders tab of the Email Reminders page, create a new configuration." (configuration-process-8b2c271f.md) — emitted as `tabsSourceQuote`
- "On the Email Reminders page, select the Rules tab." (create-reminder-rules-b0a7fac5.md)
- "The rules are set up in the Rules tab of the Email Reminders page." (before-you-begin-448d2513.md)

Alias for the Rules tab found in the roster itself: "The Email Reminder Rules section of
this tool is used to create any new rules." (create-email-reminders-604c4a46.md).

### 1.4 Child surfaces — MODALS AND A WIZARD, NOT PAGES

This page has exactly the same label-drift shape as Delegate Configurations, and the
answer is the same:

- "Choose New to open the Email Reminder window." (create-email-reminders-604c4a46.md)
- "Below is an example of how those options are used on the Add Email Reminder page." (email-message-replacement-tokens-c9cc4af4.md)
- "then the Edit Email Reminder page will be read-only." (edit-email-reminders-2a2638ad.md)
- "The New Reminder Rule - Step 1 page appears." / "The Conditions - Step 2 page appears." (create-reminder-rules-b0a7fac5.md)

Three names for one reminder editor; two more for a two-step rule wizard. **None is a
page node.** No menu destination, no distinct role gate, no distinct object — they are
modal editors over the two objects the page already owns. The two "Step 1 / Step 2" pages
are the Workflows General / Steps / Step Rules precedent exactly.

### 1.5 Boundary against Workflows > Email Notifications (ALREADY BUILT)

The single easiest collapse error in this domain, and there is a concrete field-name
collision to prove it. The built graph already carries, on `page.workflows`:
`field.workflows.email-notification-display-as-from` ("Display as From") and
`field.workflows.email-subject` ("Email Subject"), both from
`add-an-email-notification-c237a2de.md` / `modify-an-email-notification-a6e5f4ba.md`.
**Email Reminders has its own "Display as From" and its own "Email Subject", from
`create-email-reminders-604c4a46.md`.** They are different controls on different pages.
Do not re-home, do not merge, do not "dedupe by label".

Notifications = event-driven templates authored inside Workflows and assigned to a
workflow object. Reminders = interval-driven nag emails with their own rule engine, on
their own page, assigned by GROUP.

**Verified against the built graph (23 pages / 617 fields):** not one built field cites
`create-email-reminders-604c4a46.md`, `create-reminder-rules-b0a7fac5.md`,
`access-email-reminders-96f3ca18.md`, `email-reminders-tool-8b2c8a11.md`,
`configuration-process-8b2c271f.md`, `overview-8b2c769e.md`,
`pre-defined-rules-220a1fe7.md` or `before-you-begin-448d2513.md`. The roster is clean to
take. The six already-mined files in the broad sweep
(`work-with-the-steps-page-fab249d1.md`, `add-groups-ec5d8d8b.md`,
`overview-8b2edfd0.md`, `workflow-667cee21.md`,
`about-vendor-approval-workflow-step-and-timeout-b3d1bd2c.md`,
`email-message-replacement-tokens-c9cc4af4.md`) are corroboration/dependency sources only.

### 1.6 Role gates and a role PARTITION worth recording

- "The Email Reminders tool is visible if you have the Invoice Configuration administrator (Restricted) role." (email-reminders-tool-8b2c8a11.md)
- "allows a Global and Group Configuration administrator to create, edit, and delete email reminders by group." (email-reminders-tool-8b2c8a11.md)
- "Group Configuration administrators can only create, edit, and delete email reminders for the groups to which they have access permissions." (email-reminders-tool-8b2c8a11.md)
- "Group administrators can only create email reminder rules if given \"create\" rights." (create-reminder-rules-b0a7fac5.md)

`(Restricted)` and `Global and Group Configuration administrator` appear in the SAME file
and are NOT a contradiction — one is visibility, the other is what the admin may do.

**Hard cross-page constraint:** "The Group Configurations tool is not visible if you have
the Invoice Configuration administrator (Restricted) role." (`overview-8b2edfd0.md`).
So the very admin who can reach Email Reminders CANNOT reach Group Configurations — yet
the Applies to / Editable By fields assign reminders BY GROUP. Emit that as a dependency
constraint on the group-assignment edge, not as a field.

### 1.7 The contradiction to emit (Reminder Type)

Two rosters, same control name, two different option lists, and the shared option is
defined incompatibly. Both quotes grep -F verified:

| create-email-reminders-604c4a46.md (Email Reminders tab) | create-reminder-rules-b0a7fac5.md (Rules tab) |
| --- | --- |
| "Approval Request - Payment Request: When a cash advance request has a status of Pending Approval." | "Approval Request - Payment Request: When an invoice has a status of Pending Approval." |
| "Approval Request - Vendor Request: When a vendor-based invoice has a status of Pending Approval." | "Approval Request - Payment Vendor: When a vendor-based invoice has a status of Pending Approval." |
| "Payment Request: ..." | "Payment Request: ..." |

`Approval Request - Vendor Request` appears ONLY on the reminder side;
`Approval Request - Payment Vendor` ONLY on the rule side. Record BOTH value sets with
distinct context and ONE contradiction node. Do not reconcile — do not pick "cash advance
request" or "invoice" as the true gloss.

### 1.8 Three guaranteed name collisions WITHIN this page

`duplicate-field-name` is a hard validator error scoped PER PAGE, not per tab. The Rules
tab roster has exactly three field rows — Name, Reminder Type, Editable By — and all three
labels are also standalone table cells on the Email Reminders tab roster. They are
different controls with different descriptions (rule vs. reminder wording, and genuinely
disagreeing Reminder Type lists). Prefix the rule side (`rule_name`,
`rule_reminder_type`, `rule_editable_by`), keep the reminder side bare, put the tab in
notes on both. **Do not merge them to duck the error.**

### 1.9 Census — the trap, measured

`grep -c "^| "` is worthless here. Measured across the 25-file sweep, only four files
return anything on the naive anchor, and the real roster returns **zero**:

| file | bytes | `^\| ` | `^\s*\|` cell-openers | TRUE field rows |
| --- | --- | --- | --- | --- |
| create-email-reminders-604c4a46.md | 10,163 | **0** | **49** | **15** |
| create-reminder-rules-b0a7fac5.md | 3,979 | 0 | 13 | **3** |
| email-message-replacement-tokens-c9cc4af4.md | 2,796 | 6 | 21 | **4** (%1% %2% %3% %4%) |
| email-reminders-8b2caa99.md | 3,921 | 31 | 91 | **0 — revision history, ~29 dated entries** |

**49 IS NOT A ROW COUNT.** SAP writes every table cell on its own line. The fifteen true
rows on `create-email-reminders-604c4a46.md`, extracted mechanically, are: Name, Reminder
Type, Reminder Rule, Frequency, Number of Days, Specific days, Display as From, Email
Subject, Email Message, Copy to Approver, Copy to Employee, Copy to Email Address,
Editable By, Applies to, Active. An extractor that believes 49 will hunt for 34 fields
that do not exist.

**Zero raw `<table>` HTML anywhere in the 25-file set** (measured: `<table` count 0 in
every file). Total set 62,693 B across 25 files.

### 1.10 A known graph gap this page closes

`vset.g3.unnamed.email-message-replacement-tokens-the-4-row-variable-label-na` is
currently orphaned with `knownGap: true`; its own note says what would fix it is "an
Email Reminders page node that owns this table properly". The file is
`email-message-replacement-tokens-c9cc4af4.md`; its cell-opener count is 21 and its true
content is exactly FOUR tokens — %1% Logon URL, %2% User Name, %3% Number of Records, %4%
List of Records. The existing node already carries those four. **RE-HOME that 4-value set
onto this page. Do not hunt for 17 more tokens that do not exist.** Note that
`page.purchase-order-configuration` and
`field.purchase-order-configuration.default-email-subject-when-transmitting-purchase-orders`
also reference this file — leave those alone; the value set is the only thing moving.

### 1.11 Scheduling is NOT a control on this page

"Scheduling email reminders is done in the Import/Extract Administrator tool and is
performed by SAP Concur staff." and "Scheduling requires you to submit a service request
to SAP Concur support." (`configuration-process-8b2c271f.md`), corroborated by
`scheduling-email-reminders-8b2ceaea.md`. Emit as a dependency / step rationale pointing
at the unbuilt Import/Extract Administrator surface. A driver cannot click it. Same for
localisation string extraction (`localizing-email-reminder-text-8b2cc1b0.md`).

### 1.12 "Rules tab" names THREE surfaces — say which you mean

1. **Email Reminders > Rules** (this page).
2. **Purchase Order Matching Rules > Rules** (already built, `page.purchase-order-matching-rules`).
3. **Workflows Step Rules** wizard page (ruled NOT a page).

### 1.13 documentedBasis: **rich**

Justification: two field-level rosters in two separate topics (15 rows + 3 rows), a
fully enumerated 4-row token catalogue, enumerated value lists on Reminder Type (×2,
contradictory), Frequency (5 options), Copy to Approver / Copy to Employee / Active
(Yes/No stated explicitly in prose — and note the Yes/No is DOCUMENTED here, not
inferred), Editable By (Global Group / named groups), plus dedicated topics for
localisation, pre-defined rules, prerequisites and the configuration process, plus eight
CRUD procedure topics. Real gaps remain: the Conditions - Step 2 condition editor is only
step-listed (Data Object, Field/Value, Operator) and never enumerated for reminders, and
the pre-defined rule set is given as two named rules with no configuration surface.
`coverageGuess: good`. `uiVariant: undifferentiated` — the only UI-variant language in the
set is 2014/2015 revision-history boilerplate ("Added information about the two user
interfaces", "Updated the images to the enhanced UI"), which is history, not a live
variant.

---

## 2. Delegate Configurations

### 2.1 Page identity — CONFIRMED, and a SIBLING of Workflows, never under it

Grounded facts:

- Its own left-menu destination: "Select Delegate Configurations (left menu) , the Delegate Configurations page appears." (`access-and-view-payment-delegate-configurations-8ed1298f.md`)
- Its own tool name: "To access the Delegate Configurations tool:" (same file)
- Its own two tabs (Invoice, Purchase Request) and its own object (a delegate configuration) with full CRUD across four dedicated topics.
- Independent corroboration already written into the graph: `dep.g1.059` targets
  `{page: "Delegate Configurations", field: "Delegate Configuration", resolved: false}`,
  authored by a Group 1 agent who had no roster.
- Further corroboration: the built `page.workflows` node's own notes already say the
  "Select the Invoice or Purchase Request tab." sentence "is DELEGATE CONFIGURATIONS (a
  Run B page)" — Run A explicitly declined to absorb it.

The corpus NEVER places this page under Workflows — measured, zero hits in the 12
delegate-named admin files. It is squarely approval configuration and it cross-references
the built Workflows Authorized Approvers surface via
"Restrict approvers to those with equal or higher authorized approver limit", but that is
a cross-page dependency, not a home.

### 2.2 Navigation — the OTHER idiom, and a verbatim trap

This page uses the plain `(left menu)` idiom; the Invoice Processing Admin middle node is
**never mentioned** for it. Treat the middle segment as UNATTESTED, not absent. Do not
copy the Email Reminders idiom onto this page.

| navPath | quote | file |
| --- | --- | --- |
| Administration > Invoice | "Select Administration > Invoice." | access-and-view-payment-delegate-configurations-8ed1298f.md |
| Administration > Invoice > Delegate Configurations | "Select Delegate Configurations (left menu) , the Delegate Configurations page appears." | access-and-view-payment-delegate-configurations-8ed1298f.md |
| Invoice Admin > Delegate Configurations | "Invoice delegates are accessed from the Invoice Admin link." | access-and-view-payment-delegate-configurations-8ed1298f.md |
| Administration > Invoice > Delegate Configurations > New \| Modify | "This window is available by clicking Administration > Invoice > Delegate Configurations > New (or Modify, if existing configuration)." | delegate-experience-8b30fb06.md |

**⚠ THE STRAY SPACE BEFORE THE COMMA IS VERBATIM**: `(left menu) , the`. Do not tidy it.
Verified byte-exact (1 hit).

**NBSP: this page is CLEAN.** Measured with python3 counting `b"\xc2\xa0"`: 0 NBSP in all
12 delegate files. This page writes a plain ASCII `Administration > Invoice`. **Do not
carry the Email Reminders NBSP habit across — the two pages differ.** (And never conclude
"no NBSP" from `grep -P "\xc2\xa0"`; on this machine grep is ugrep 7.8.4 and that form
returns a silent zero.)

"Invoice Admin" is a live alias for "Administration > Invoice", corroborated by the guide
revision history: "Tool now available from within Invoice Admin user interface."
(`delegate-configuration-8b2bd26d.md`).

### 2.3 Tabs

Two tabs: **Invoice** and **Purchase Request**. Attested four times, in four files:

- "On the Delegate Configurations page, select either the Invoice or Purchase Request tab." (create-a-new-invoice-delegate-configuration-fcf42662.md) — emitted as `tabsSourceQuote`
- "Select the Invoice or Purchase Request tab." (access-and-view-payment-delegate-configurations-8ed1298f.md)
- "On the Delegate Configurations page, choose either the Invoice or Purchase Request tab." (edit-an-invoice-delegate-configuration-c7f51424.md)
- "On the Delegate Configurations page, Select either the Invoice or Purchase Request tab." (delete-an-invoice-delegate-configuration-92627a9b.md) — note SAP's capital "Select" mid-sentence

⚠ The `access-and-view` variant of this sentence is the one Run A briefly mis-assigned to
the Workflows Approval Statuses sub-tabs. That correction is already recorded in the built
`page.workflows` node. Do not re-open it.

### 2.4 THE IDENTITY QUESTION THE RECON DID NOT SETTLE: the child window

**DECISION: it is a MODAL ON THIS PAGE, not a separate page node.**

The corpus gives FIVE names for ONE surface across FOUR files — a grounded label-drift
contradiction that should itself be emitted:

| name | file |
| --- | --- |
| "Choose New. The Add Delegate Configuration - Invoice page appears." | create-a-new-invoice-delegate-configuration-fcf42662.md |
| "in the Add Delegate Configuration window" / "This window is available by clicking ..." | delegate-experience-8b30fb06.md |
| "Select Modify. The Modify Delegate Configuration page appears." | edit-an-invoice-delegate-configuration-c7f51424.md |
| "This is also a link to the Edit Delegate Configuration page" | access-and-view-payment-delegate-configurations-8ed1298f.md |
| "Restrict approvers to those with equal or higher authorized approver limit setting to the Add Delegate Configuration page." | delegate-configuration-8b2bd26d.md (revision history) |

And a sixth, singular, for the parent itself: "Select Save to return to the Delegate
Configuration page." (create-a-new-invoice-delegate-configuration-fcf42662.md).

**The argument.** The word "page" is proven non-discriminating in this corpus: it covers
real pages AND the Workflows General / Steps / Step Rules wizard that this graph already
ruled is NOT a page, while `page.authorized-approval-limits` IS a page node and its own
nav quote says "window appears". So decide on STRUCTURE, three tests:

1. **Own menu destination?** No. The only path is `... > Delegate Configurations > New
   (or Modify)` — through the parent, never from a menu. (Authorized Approval Limits also
   lacks one, so this test alone is not decisive — hence tests 2 and 3.)
2. **Own role gate?** No. Nothing in the corpus gates the child differently from the parent.
   (Authorized Approval Limits sits under a different admin parent entirely —
   Administration > Company > User Administration — with no other home for its fields.)
3. **Own object model?** **No, and this is decisive.** The child window edits the *same*
   object the parent page lists, and the corpus documents the *same controls twice*: the
   parent's 11-column read-only table in
   `access-and-view-payment-delegate-configurations-8ed1298f.md` and the child's 6-row
   entry form in `create-a-new-invoice-delegate-configuration-fcf42662.md` are the same
   settings under different labels (Can Prepare ↔ Delegate can prepare; Can Approve
   Temporary ↔ Delegate can approve during specified period; Restrict Delegates to Group ↔
   Restrict delegate selection to user's group; Need Approver Role to Approve ↔ Require
   approver role for approval delegation; Name ↔ Configuration Name). A separate page node
   would duplicate every field in the graph and split one object across two homes.

That is the Workflows-wizard pattern (modal over an object → not a page), not the
Authorized Approval Limits pattern (a surface with no other home → a page). **Emit the
fields on `page.delegate-configurations`, noting that they are entered in the Add/Modify
Delegate Configuration modal and displayed read-only as list columns on the Invoice and
Purchase Request tabs.** Emit the five-name drift as a contradiction node so the label
mapping is not lost.

Note the symmetry: Email Reminders has the identical three-name child ("Email Reminder
window" / "Add Email Reminder page" / "Edit Email Reminder page") and gets the identical
ruling. One rule, applied twice, in the same run.

### 2.5 Role gate — DOCUMENTED ABSENCE

**There is no documented role gate for this page anywhere in this corpus.** Measured:
`grep -rn "Delegate Configuration"` across both directories, filtered for
role/administrator/permission language, returns only field-description prose. The 40-odd
`permissions-*.md` topics are per-guide boilerplate ("A company administrator may or may
not have the correct permissions to use this feature") and name no role. The nearest
role-shaped sentences are NOT gates and must not be recorded as such:

- "The Configuration administrator can restrict the delegates based on the following choices:" (create-a-new-invoice-delegate-configuration-fcf42662.md) — describes who uses a *field*, not who reaches the page.
- "The Invoice Admin sets this option when defining delegates." (delegate-experience-8b30fb06.md) — "Invoice Admin" here is the menu alias, not a role name.

`roleGates: []` is the correct, publishable answer. Do NOT complete the pattern by
borrowing the Invoice Configuration administrator role from a neighbouring page — that is
exactly the invented-value defect this build has already paid for twice.

### 2.6 Aliases (four named by the brief, plus more found)

Page-level: **Delegate Configurations**, Delegate Configurations tool, Delegate
Configuration, Delegate Configuration area, Payment Delegate Configurations, Invoice
delegates.
Child-surface: Add Delegate Configuration - Invoice page, Add Delegate Configuration
window, Add Delegate Configuration page, Modify Delegate Configuration page, Edit Delegate
Configuration page.

`terminology-e1e1ed99.md` is this page's richest alias source — a six-entry catalogue,
**zero occurrences of "reminder"** (verified), so it belongs to this page only: Invoice
Delegates, Invoice Request Delegates, Purchase Request Delegates, Temporary Approval
Delegation, Delegate Restriction to Group, Delegated Approver. Three of the six are
field-shaped and map onto controls above (Temporary Approval Delegation → Can Approve
Temporary / Maximum Time Period to Approve; Delegate Restriction to Group → Restrict
Delegates to Group; Delegated Approver → the Workflows self-approval setting).

### 2.7 The dangling endpoint `dep.g1.059` — report, do not contort

`dep.g1.059` points at `{page: "Delegate Configurations", field: "Delegate Configuration"}`
with the cardinality quote "Each group within your company can only have one Invoice
delegate configuration." Its target field name is **label-shaped**, not a field name — the
LABEL-vs-NAME trap. This run will emit `configuration_name` (label "Configuration Name")
and `name`, never a field literally called "Delegate Configuration". **The edge will not
auto-resolve. Report the mismatch for a correction pass; do not rename a field to force
it.** The cardinality itself is real and worth a dependency into the built
`page.group-configurations`.

### 2.8 Boundaries against already-built pages

- **Workflows.** `delegate-self-approval-1b627285.md` (1,284 B) describes "Allow delegated
  approvers to approve their own requests", already built as
  `field.workflows.allow-delegated-approvers-to-approve-own-requests` **from
  `create-a-new-workflow-554e86aa.md`** — verified, so this file is an UNMINED
  CORROBORATION source, not a duplicate source. You MAY cite it in notes (it places the
  setting on the "General step" and distinguishes a delegate acting for an Approver from
  one acting as an AP User) and you MAY emit a dependency into the built Workflows field.
  **You may NOT emit a field here from it.**
- **Authorized Approval Limits** (`page.authorized-approval-limits`, 10 fields). The field
  "Restrict approvers to those with equal or higher authorized approver limit" belongs to
  THIS page (it is a row on both delegate rosters) but its semantics depend on that page.
  Cross-page dependency, not a re-home.
- **Group Configurations.** "Delegate configurations can be applied to employee group
  configurations within Concur Invoice." (`overview-8b2ba917.md`) plus the one-per-group
  cardinality. Cross-page dependency.
- **User Administration / My Info** (unbuilt). "This field works in conjunction with the
  Choose Dates link in the Delegates area of both My Info and User Administration."
  (create-a-new-invoice-delegate-configuration-fcf42662.md). An unresolved dependency into
  an unbuilt surface is legitimate; `delegates-4d7c563c.md` defers to the external
  "Shared: Delegate Configuration Setup Guide", which is absent from this corpus — a
  DOCUMENTARY gap, not a menu-location one.

### 2.9 Census

| file | bytes | `^\| ` | `^\s*\|` cell-openers | TRUE rows |
| --- | --- | --- | --- | --- |
| access-and-view-payment-delegate-configurations-8ed1298f.md | 3,872 | **0** | **37** | **11** |
| create-a-new-invoice-delegate-configuration-fcf42662.md | 6,302 | **0** | **22** | **6** |
| delegate-configuration-8b2bd26d.md | 4,236 | 31 | 91 | **0 — revision history, ~29 dated entries** |

All other delegate files are prose with no tables. **Zero raw `<table>` HTML in the whole
set.** Total 28,510 B across 12 files.

**The ~25-field recon estimate is too high.** The two rosters are 11 columns and 6 rows,
but the 6 rows expand: "Restrictions" holds 2 named sub-options and "Delegate Settings For
User Administrators and Employees" holds 5, and those seven are the SAME controls the
11-column read-only table lists under different labels. Collapse the aliases and the
unique control count lands at **11–13**, not 25. Do not inflate to hit a number.

### 2.10 Drop the "two user interfaces" hint

`delegate-configuration-8b2bd26d.md` carries "Added information about the two user
interfaces; no other content changes" in its 2014 revision history — the same 2014
boilerplate present in ~40 corpus files including most already-built pages, and the same
line appears in the Email Reminders revision history. It is not a property of either page
and must not become a `uiVariant` claim. `uiVariant: undifferentiated` for both.

### 2.11 documentedBasis: **moderate**

Justification: field-level documentation genuinely exists, but it is confined to **two**
topics, both of which describe the same object from two sides, and the surrounding topics
are semantics/prose rather than controls. Enumerated value lists are almost entirely
absent — the roster describes checkboxes as "If active, ..." and "If selected (enabled)",
and **nowhere enumerates a Yes/No option list**; a blind build must NOT complete those
pairs. The Purchase Request tab is named four times and never separately documented — not
one control is attributed to it, so a driver has no field roster for that tab at all. And
there is no documented role gate. That is "some field-level documentation, gaps obvious".
`coverageGuess: partial`.

---

## 3. Cross-run notes

- **Zero source files are shared between the two pages.** Verified by set intersection of
  the two file lists. The pages cannot contaminate each other; the contamination risk is
  entirely against already-built pages (Workflows on both counts).
- **Two different access idioms in one run.** Email Reminders goes through the
  `Invoice Processing Admin` middle nav node; Delegate Configurations uses the bare
  `(left menu)`. Record each exactly as its own topic states it. Where a middle segment is
  simply unmentioned, treat it as UNATTESTED rather than absent.
- **One ruling, applied twice:** a modal editor over an object the parent page already
  owns is not a page node, regardless of whether SAP calls it a "page" or a "window".
  Applied to Add/Modify Delegate Configuration and to the Email Reminder window /
  New Reminder Rule wizard alike.
- **No page node is created for any Workflows tab or wizard page.** The workflow area
  remains four pages: Workflows, Feature Hierarchies, Email Reminders, Delegate
  Configurations.

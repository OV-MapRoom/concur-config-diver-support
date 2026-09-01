# MAP / EXHAUSTIVE FILE INVENTORY + TABLE CENSUS
## Run: Email Reminders + Delegate Configurations (2026-09-01)

ROOT = `/mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE`
Dirs abbreviated below: **AG** = `concur-invoice-professional-edition-admin-guides/`, **TG** = `concur-invoice-professional-edition-tools-guides/`.
All `sourceFile` values in the structured output carry the full `<guide-dir>/<filename>.md` form. No `CONCUR_INVOICE/` prefix.

---

# 0. HEADLINE CORRECTIONS TO THE BRIEF (measured, not asserted)

| # | Brief said | Measured | Consequence |
|---|---|---|---|
| C1 | "ZERO raw `<table>` and ZERO `<tr>` anywhere in either set" | TRUE for the seed sets. **FALSE once you beat the floor.** Two files that surface on the mandated search terms carry raw HTML tables: `AG/create-a-conditional-rule-in-the-editor-86a92887.md` (1 `<table`, 1 `<tr`, a **2-field roster**) and `AG/additional-approver-situations-fbb5034c.md` (1 `<table`, 1 `<tr`, a 6-row worked example). | Both are **ruled out** (see §1.5 / §2.5) but a census that reported "zero raw tables" without naming them would have been wrong. The Delegate set really is 0/0 across all 34 candidates. |
| C2 | `AG/about-vendor-approval-workflow-step-and-timeout-b3d1bd2c.md` is "already mined" | **NOT mined.** Zero citations in the graph (checked all 7 node arrays incl. `tabsSourceFile`). | It is an **unmined corroboration source**, not a forbidden file. Still not a field source — its reminder sentence is advisory prose about the Vendor Manager, no control. |
| C3 | Email Reminders floor = 17 files; broad `grep -rli "email reminder"` = 25 | Confirmed 25. **Bare `grep -rli "reminder"` returns 31**, and the 6 extras are all real. One of them, `AG/before-you-begin-448d2513.md`, is a genuine Email Reminders topic that states the rule→reminder ORDERING and names the Rules tab. It was inside the 25 but absent from the recon's 17. | +1 mustRead beyond the seeds. |
| C4 | Delegate Configurations = 17 files | 17 by **filename**. **34 by content** (`grep -rli "delegate"`, both dirs). 17 additional files mention delegates; 5 of them are Delegate-page-relevant, the rest rule out cleanly. | +5 alsoRelevant beyond the seeds; the boundary is now explicit rather than implied. |
| C5 | "The `%1%..%4%` table has 21 cell-openers / 4 true tokens" | Confirmed exactly. 21 = 1 separator + 5 rows × 4 openers (3 cols). 4 tokens. | Re-home the existing 4-value set. Do **not** hunt for 17 more. |
| C6 | Delegate Configurations "~25 fields" | **11–13 unique controls** after alias collapse. The corpus documents the SAME control under 2–3 labels across the list view and the editor. | Full alias map in §2.6. Do not inflate. |

---

# 1. PAGE: EMAIL REMINDERS

## 1.1 Shape (measured)
Two-tab admin page. **Zero raw `<table>` / zero `<tr>` in every file that survives to mustRead.** Every field lives in an INDENTED markdown pipe table nested inside a numbered step. A census anchored on `^| ` reports the entire field roster as non-existent.

## 1.2 Nav path — all quotes `grep -F -c` verified = 1
```
Administration > Invoice > Invoice Processing Admin > Email Reminders
```
- `"From the Invoice Processing Admin navigation menu, choose Email Reminders."` — AG/access-email-reminders-96f3ca18.md
- `"The Email Reminders page appears."` — same file
- Step 1 of that topic reads `Select Administration  Invoice.` — **the `>` is stripped, leaving a DOUBLE SPACE.** Do not tidy it; a `grep -F` on `Administration > Invoice` fails against this file.

Middle-nav confirmation: `Invoice Processing Admin` appears in 24 corpus files (20 AG + 4 TG). This page is one of them. The `(left menu)` idiom used by Delegate Configurations does **not** appear here — that is why 4 of 6 recon sweeps lost this page.

## 1.3 Role gate + role partition — verified
- `"The Email Reminders tool is visible if you have the Invoice Configuration administrator (Restricted) role."` — AG/email-reminders-tool-8b2c8a11.md
- Same file also names `a Global and Group Configuration administrator` — different rights, **not** a contradiction.
- `"Group administrators can only create email reminder rules if given \"create\" rights."` — AG/create-reminder-rules-b0a7fac5.md
- NEW, unlisted in the brief: `AG/edit-email-reminders-2a2638ad.md` carries a **different** rights sentence — `Group administrators can only edit email reminders if given "create" rights from the configuration checklist of the Invoice Configuration administrator. If they do not have permissions, then the Edit Email Reminder page will be read-only.` Note it says **"create" rights** govern EDIT, and it adds the *configuration checklist* provenance the Rules-tab twin omits. Worth a note or a second gate record.
- ROLE PARTITION (hard dependency constraint): `"The Group Configurations tool is not visible if you have the Invoice Configuration administrator (Restricted) role."` — AG/overview-8b2edfd0.md. The `(Restricted)` role gates 9 surfaces corpus-wide (verified: email-reminders-tool, overview-8b2edfd0, required-roles-1f2a20f6, set-a-default-shipping-and-billing-address, shipping-configuration-and-shipping-terms, TG/before-you-begin-ff38d4b7, TG/procedure-enable-the-feature, TG/setting-up-a-default-policy-for-emailed-and-uploaded-invoices, TG/setting-up-an-exception-email-address). **Page-hood must be argued from the menu destination + object model, never from the gate.**

## 1.4 Two tabs — verified
- `"On the Email Reminders page, select the Rules tab."` — AG/create-reminder-rules-b0a7fac5.md
- `"On the Email Reminders tab of the Email Reminders page, create a new configuration."` — AG/configuration-process-8b2c271f.md

`Rules tab` LABEL COLLISION, three ways: this Email Reminders Rules tab / the built **Purchase Order Matching Rules** page's Rules tab / the Workflows **Step Rules** wizard step. Say which one, every time.

## 1.5 RAW `<table>` CENSUS — Email Reminders candidate pool (27 files)
Command: `for f in $FILES; do grep -c "<table" $f; done`

| file | `<table` | `<tr` |
|---|---|---|
| AG/access-email-reminders-96f3ca18.md | 0 | 0 |
| AG/before-you-begin-448d2513.md | 0 | 0 |
| AG/best-practices-when-localizing-subject-and-email-message-fields-48515f40.md | 0 | 0 |
| AG/configuration-process-8b2c271f.md | 0 | 0 |
| AG/configuring-email-reminders-8b2c3cca.md | 0 | 0 |
| AG/copy-email-reminders-cb75f9fd.md | 0 | 0 |
| AG/copy-reminder-rules-9350776e.md | 0 | 0 |
| AG/create-email-reminders-604c4a46.md | **0** | 0 |
| AG/create-reminder-rules-b0a7fac5.md | 0 | 0 |
| AG/delete-email-reminders-8f693700.md | 0 | 0 |
| AG/delete-reminder-rules-ab4f8d33.md | 0 | 0 |
| AG/edit-email-reminders-2a2638ad.md | 0 | 0 |
| AG/edit-reminder-rules-8f2edae9.md | 0 | 0 |
| AG/email-message-replacement-tokens-c9cc4af4.md | 0 | 0 |
| AG/email-reminders-8b2caa99.md | 0 | 0 |
| AG/email-reminders-tool-8b2c8a11.md | 0 | 0 |
| AG/localizing-email-reminder-text-8b2cc1b0.md | 0 | 0 |
| AG/overview-8b2c769e.md | 0 | 0 |
| AG/pre-defined-rules-220a1fe7.md | 0 | 0 |
| AG/scheduling-email-reminders-8b2ceaea.md | 0 | 0 |
| AG/overview-8b2edfd0.md | 0 | 0 |
| AG/work-with-the-steps-page-fab249d1.md | 0 | 0 |
| AG/workflow-667cee21.md | 0 | 0 |
| AG/add-groups-ec5d8d8b.md | 0 | 0 |
| AG/about-vendor-approval-workflow-step-and-timeout-b3d1bd2c.md | 0 | 0 |
| **AG/create-a-conditional-rule-in-the-editor-86a92887.md** | **1** | **1** | 
| **AG/additional-approver-situations-fbb5034c.md** | **1** | **1** |

**The two non-zeros, read in full and RULED OUT:**
- `create-a-conditional-rule-in-the-editor-86a92887.md` — a raw 2-field roster for **Print Condition Rules** (`Print Condition Rule Name`, `Editable By`), ending `Click Done to return to the Print Condition Rules List page.` It surfaces on `grep -rli "reminder rule"` **only** because it says "print **reminder** rules", and it shares the exact boilerplate sentence shape (`Group administrators can only create X rules if given "create" rights`) with `create-reminder-rules-b0a7fac5.md`. **This is a live contamination trap.** A different surface, a different object, a different list page. It must NOT be cited on Email Reminders. It is also NOT an Email Reminders UI variant — its `loio` is `86a92887cd654c898796be85baf03e37`, unrelated to `b0a7fac5`.
- `additional-approver-situations-fbb5034c.md` — a 6-row Row/Approver/Limit/Department/Division/Cost Center **worked example** (sample tenant data: A/$100/R&D/DEV/EXP …). Approval-hierarchy illustration; belongs to the built Authorized Approval Limits / Workflows domain. Not a field roster, not tenant-safe to enumerate, not Email Reminders.

## 1.6 LONG CATALOG CENSUS — Email Reminders
Correct anchor `grep -cP "^\s*\|"` returns **cell-openers**, not rows. SAP writes each cell on its own line, so the count is `1 + (cols+1) × rows`. Arithmetic verified against every file below by reading it.

| file | naive `^\|` | correct `^\s*\|` | derived rows | TRUE content | class |
|---|---|---|---|---|---|
| create-email-reminders-604c4a46.md | **0** | **49** | 1 sep + 16×3 | **15 FIELD ROWS** | **ROSTER — Email Reminders tab** |
| email-reminders-8b2caa99.md | 31 | **91** | 1 sep + 30×3 | 1 header + **29 dated revision entries** | **HISTORY — not a roster** |
| create-reminder-rules-b0a7fac5.md | 0 | **13** | 1 sep + 4×3 | **3 FIELD ROWS** | **ROSTER — Rules tab** |
| email-message-replacement-tokens-c9cc4af4.md | 6 | **21** | 1 sep + 5×4 | **4 TOKENS** (%1%..%4%) | **PRIZE CATALOGUE** |
| add-groups-ec5d8d8b.md | 0 | 38 | — | Group Configurations roster | ALREADY MINED (14 built fields) |
| work-with-the-steps-page-fab249d1.md | 0 | 28 | — | Workflows Steps roster | ALREADY MINED (11 built fields) |
| every other candidate | 0 | 0 | — | prose only | — |

### The 15 TRUE field rows of `create-email-reminders-604c4a46.md` (Email Reminders tab), verbatim labels, in document order:
`Name` · `Reminder Type` · `Reminder Rule` · `Frequency` · `Number of Days` · `Specific days` · `Display as From` · `Email Subject` · `Email Message` · `Copy to Approver` · `Copy to Employee` · `Copy to Email Address` · `Editable By` · `Applies to` · `Active`

**⚠ 49 IS NOT A ROW COUNT.** An extractor that believes 49 will hunt for 34 fields that do not exist.

**Embedded value catalogues inside that one roster** (each is a documented enumeration; nothing outside these lists exists in the corpus):
- `Reminder Type` — 3: `Approval Request - Payment Request` / `Approval Request - Vendor Request` / `Payment Request`
- `Frequency` — 5: `Daily (weekdays only)` / `Daily` / `Every x days` / `Specific days of the month` / `Once condition is met`
- `Editable By` — `Global Group` plus group selection, with a full inheritance rights paragraph
- `Copy to Approver` — **both** sides documented (`Select Yes to be able to send this email to this employee's default approver` … `If you do not want to send an email reminder to the default approver, select No.`)
- `Copy to Employee` — both sides documented (`Select Yes or No to indicate if a copy is to be sent…`)
- `Active` — **ONLY `Yes` is documented** (`Select Yes to make this email reminder active. All email reminders are inactive by default.`). ⚠ **DO NOT COMPLETE THE PAIR.** This is exactly the invented-`Yes` defect this project already paid for, in mirror image.
- Conditional-visibility dependencies stated in-table: `Number of Days` appears only if `Every x days`; `Specific days` appears only if `Specific days of the month`. `Specific days` accepts `a valid integer between 1 and 31` and `\>` for last day of month — that is a **compressed range**, record it.
- Character limits: Email Subject `255`, Email Message `2,000` (double-byte = 2), attachment cap `10MB`.

### The 3 TRUE field rows of `create-reminder-rules-b0a7fac5.md` (Rules tab):
`Name` · `Reminder Type` · `Editable By` — **all three labels collide with the Email Reminders tab roster.** `duplicate-field-name` is a HARD validator error scoped PER PAGE, not per tab. Prefix the rule-side (`rule_name` / `rule_reminder_type` / `rule_editable_by`), keep the reminder-side bare, put the tab in `notes` on both six records. **DO NOT MERGE.**

### THE STRONGEST GROUNDED CONTRADICTION IN THIS RUN (both quotes verified, one option list, two incompatible definitions):
| | create-email-reminders-604c4a46.md (Email Reminders tab) | create-reminder-rules-b0a7fac5.md (Rules tab) |
|---|---|---|
| shared option | `Approval Request - Payment Request: When a cash advance request has a status of Pending Approval.` | `Approval Request - Payment Request: When an invoice has a status of Pending Approval.` |
| divergent option | `Approval Request - Vendor Request: When a vendor-based invoice has a status of Pending Approval.` | `Approval Request - Payment Vendor: When a vendor-based invoice has a status of Pending Approval.` |
| shared option | `Payment Request` — identical text both sides | identical |

Emit **BOTH** value sets with distinct `context`, and **ONE** contradiction node covering both the option-name divergence and the incompatible definition of the shared option. Do not reconcile. "Cash advance request" in an Invoice product is itself suspect but it is what the corpus says — record it verbatim.

### The PRIZE: `email-message-replacement-tokens-c9cc4af4.md` — 4 tokens, full enumeration
| Variable | Label Name | Description (abridged; full text in file) |
|---|---|---|
| `%1%` | `Logon URL` | `The URL for the Concur Sign In page.` |
| `%2%` | `User Name` | primary recipient, `First-name Last-name`; excludes Copy To recipients |
| `%3%` | `Number of Records` | count found by the reminder rule query, based on the Reminder Type |
| `%4%` | `List of Records` | `This variable is not supported in the Email Subject field.` |

Constraint on all four: `You cannot select any of these replacement token variables from the Helper pane to have them appear automatically in the Email Subject or Email Message fields. You must type the variables manually.`
Plus a 2-entry sub-catalogue of List-of-Records formats by Reminder Rule Type (`Approval requests:` fields + Employee Name last; `Payment Requests: Submit Date, Request Name, Amount, Employee Name.`).

**ACTION:** the graph already holds `vset.g3.unnamed.email-message-replacement-tokens-the-4-row-variable-label-na` with exactly these 4 values, `knownGap: true`, `appliesToRef` empty, and a note whose own stated fix is *"an Email Reminders page node that owns this table properly."* **RE-HOME it onto `Email Subject` / `Email Message` on this page. Do not create a second set. Do not hunt for more tokens.**
⚠ This file is the ONE Email-Reminders candidate already cited in the graph (as that value set's `sourceFile`) — but no FIELD cites it. Emitting fields from it here is safe; emitting a duplicate value set is not.

## 1.7 Object model + ordering (ConfigSteps, not footnotes)
Two object types, full CRUD on each, with a hard ordering:
- **reminder RULES**: create (`create-reminder-rules-b0a7fac5.md`) / edit (`edit-reminder-rules-8f2edae9.md`) / copy (`copy-reminder-rules-9350776e.md`) / delete (`delete-reminder-rules-ab4f8d33.md`)
- **email REMINDERS**: create (`create-email-reminders-604c4a46.md`) / edit (`edit-email-reminders-2a2638ad.md`) / copy (`copy-email-reminders-cb75f9fd.md`) / delete (`delete-email-reminders-8f693700.md`)

ORDERING, three independent statements: `A rule must be created before you create an email reminder, however, you can use one of the default rules.` (configuring-email-reminders-8b2c3cca.md); `You must set up the rules before creating the email reminder, or you must use one of the default rules that the system provides.` (before-you-begin-448d2513.md); and the numbered 4-step process in configuration-process-8b2c271f.md.

CASCADE: `If a rule is deleted that is currently associated with an email reminder, it will deactivate the email reminder.` (delete-reminder-rules-ab4f8d33.md) — a dependency, and a real driver hazard.

**RULE WIZARD (NOT pages — Workflows precedent applies):** `The New Reminder Rule - Step 1 page appears.` → `The Conditions - Step 2 page appears.` A 2-step modal wizard over the rule object. Same shape the graph already ruled is NOT a page for Workflows General/Steps/Step Rules. **Do not create page nodes.** Step 2 has no field roster — only a bulleted procedure naming `Data Object`, `Field/Value`, `Operator` from a helper pane. That is **thin, and thin is correct**; the operator/data-object catalogues in `the-condition-page-5d4ea870.md` and `the-query-builder-and-the-condition-editor-e10473f9.md` are the Audit Rules condition editor (the former is ALREADY MINED by Audit Rules, 22+13 citations) and this corpus never states they are the same editor. **Do not import them.**

**CHILD WINDOW label drift on this page too (4 names, all verified):** `Email Reminder window` (create + edit + copy) / `Add Email Reminder page` (email-message-replacement-tokens) / `Edit Email Reminder page` (edit-email-reminders, read-only variant) / plus the odd `New Reminder Rule - Step 1 page` on the rules side. Emit as a label-drift contradiction, mirroring the Delegate one.

**CORPUS DEFECT worth a note:** `copy-email-reminders-cb75f9fd.md` step 3 says `Choose Modify to open the Email Reminder window` — i.e. the COPY procedure never names a Copy control, while `copy-reminder-rules-9350776e.md` correctly says `Select the rule to copy, and then choose Copy.` Record the asymmetry; do not invent a Copy button on the reminder side.

## 1.8 SCHEDULING IS NOT A FIELD — verified
`"Scheduling email reminders is done in the Import/Extract Administrator tool and is performed by SAP Concur staff."` and `Scheduling requires you to submit a service request to SAP Concur support.` (both configuration-process-8b2c271f.md); corroborated by scheduling-email-reminders-8b2ceaea.md. Localization string extraction is likewise a service request (localizing-email-reminder-text-8b2cc1b0.md). **Emit as dependency / step rationale pointing at the unbuilt Import/Extract Administrator surface. A driver cannot click it. NEVER a field.**

## 1.9 Pre-defined rules — a real 2-entry value catalogue for `Reminder Rule`
`AG/pre-defined-rules-220a1fe7.md`: `Overdue Payment Request Approvals` (7 days from submission, employee must be active) and `Overdue Payment Vendor Approvals` (vendor-based, vendor import must run before 7 days). These are the **only** default rules the corpus enumerates. Note the naming echoes the Rules-tab option `Approval Request - Payment Vendor`, not the Reminders-tab `Approval Request - Vendor Request` — weak corroboration for the Rules-tab side of the contradiction, but it is a **rule name**, not a Reminder Type. Say so; do not use it to pick a winner.

## 1.10 Cross-page dependencies to emit (never re-home)
- **→ Group Configurations (BUILT)**: `Applies to` assigns reminders by group; `add-groups-ec5d8d8b.md` and `overview-8b2edfd0.md` both list email reminders among what a group configuration carries. ⚠ Guard with the ROLE PARTITION from §1.3 — the `(Restricted)` admin who can reach Email Reminders **cannot reach Group Configurations at all.**
- **→ Import/Extract Administrator (UNBUILT)**: scheduling. Unresolved target is correct.
- **→ Workflows (BUILT)**: `work-with-the-steps-page-fab249d1.md` line 118 cross-refers the *Email Reminders Setup Guide* from a Workflows step; `workflow-667cee21.md` lists Email Reminders among standard workflow options. Corroboration + dependency only.

## 1.11 ⚠ THE COLLAPSE ERROR — Email Reminders ≠ Workflows Email Notifications
Three files are the Workflows **Email Notifications** tab and are **ALREADY BUILT**: `add-an-email-notification-c237a2de.md` (5 built Workflows fields), `modify-an-email-notification-a6e5f4ba.md` (4), `select-an-email-notification-in-the-workflows-tab-663bb8ac.md` (4). Verified against the graph. Notifications = event-driven templates authored inside Workflows, assigned to a workflow object. Reminders = interval-driven nag emails, own rule engine, own page, assigned by GROUP. **Do not merge, do not re-home a single Run A field, do not emit a field from these three.**

## 1.12 RULED OUT for Email Reminders, with reasons
| file | why ruled out |
|---|---|
| AG/create-a-conditional-rule-in-the-editor-86a92887.md | Print Condition Rules — different object/list page; only a "print **reminder** rules" word collision + shared boilerplate. **Active contamination trap.** |
| AG/additional-approver-situations-fbb5034c.md | 6-row worked example of approver-limit escalation; sample tenant data; Authorized Approval Limits domain. |
| AG/the-invoice-purchase-request-and-purchase-order-solution-9b98d373.md | single marketing bullet `(COA; AA, reminders, and timeouts)`. No control. |
| TG/approve-a-change-request-9d24dbc7.md | end-user prose; `Reminders, notifications, and escalations work the same way for change requests…`. No control. |
| TG/moving-through-the-batch-verification-workflow-01738020.md | `reminder messages` on the Verification page = UI hints for the Verifier. Different feature entirely. |
| TG/workflow-and-approval-routing-8b4ff6c9.md | `"budget reminders"` in scare quotes = a routing best practice, not a feature. |
| all 4 release-note dirs | not a source for fields or values, per the constraint. Not consulted. |
| `escalation` / `nag` / `interval` / `frequency` / `overdue` / `unsubmitted` / `recipient` filename sweeps | **ZERO hits** in both dirs (except `scheduling-*` and the already-captured `localizing-*`). Reported as zeros, not skipped. |

**tools-guides yield for Email Reminders: ZERO field-bearing files.** Not a skew — measured. `grep -rli "email reminder" TG` returns 0; the whole reminder feature is documented only in admin-guides. This is a genuine, publishable asymmetry, opposite to the Vendor Search Admin case.

---

# 2. PAGE: DELEGATE CONFIGURATIONS

## 2.1 Shape (measured)
Two-tab admin page + a child editor surface. **Zero raw `<table>` and zero `<tr>` across ALL 34 delegate-mentioning files in BOTH dirs** — this one the brief got exactly right. Same indented-pipe-table trap.

## 2.2 Nav path — verified
- `"Select Delegate Configurations (left menu) , the Delegate Configurations page appears."` — AG/access-and-view-payment-delegate-configurations-8ed1298f.md. ⚠ **The stray space before the comma is VERBATIM. Do not tidy it or `grep -F` fails.** Step 1 of the same topic is `Select Administration > Invoice.` — here the `>` **is** present, unlike the Email Reminders topic (§1.2). Two different renderings of the same menu, in this run.
- `"Invoice delegates are accessed from the Invoice Admin link."` — same file. `Invoice Admin` is a live alias for `Administration > Invoice`.
- Third path, from the child-window topic: `Administration > Invoice > Delegate Configurations > New (or Modify, if existing configuration)` — delegate-experience-8b30fb06.md.
- **`Invoice Processing Admin` NEVER appears in any delegate file.** Per the corpus-text rule, treat that middle segment as **UNATTESTED** for this page, not absent. Do not copy the Email Reminders idiom onto it.

## 2.3 Two tabs — verified
`"On the Delegate Configurations page, select either the Invoice or Purchase Request tab."` — create-a-new-invoice-delegate-configuration-fcf42662.md. Corroborated by the edit topic (`choose either…`), the delete topic (`Select either…`), and the access topic (`Select the Invoice or Purchase Request tab.`). Four independent statements. Emit as `tabs` / `tabsSourceQuote` / `tabsSourceFile`.
⚠ **No Purchase-Request-specific field roster exists anywhere in the corpus.** Both rosters describe the Invoice tab; the child window is even titled `Add Delegate Configuration - Invoice`. The PR tab's own fields are **undocumented — thin is the correct answer.** Do not mirror the Invoice roster onto it.

## 2.4 THE CHILD SURFACE — 8 names across 6 files. Structural argument required.
All verified `grep -F -c` = 1:

| label | file |
|---|---|
| `Add Delegate Configuration - Invoice page` | create-a-new-invoice-delegate-configuration-fcf42662.md |
| `Add Delegate Configuration window` | delegate-experience-8b30fb06.md |
| `Modify Delegate Configuration page` | edit-an-invoice-delegate-configuration-c7f51424.md |
| `Edit Delegate Configuration page` | access-and-view-payment-delegate-configurations-8ed1298f.md |
| `Delegate Configuration page` (**singular**) | create-a-new-invoice-delegate-configuration-fcf42662.md, step 4 |
| `Delegate Configurations page` (plural, the parent) | 5 files |
| `Delegate Configurations tool` | access-and-view-… |
| `Delegate Configuration area` | create-a-new-… |

That is a **grounded label-drift contradiction in its own right — emit it.** The brief said "five names across four files"; the measured figure is higher.

**Structure test, not the word "page":** the `X page appears` idiom is proven non-discriminating in this corpus (it covers the Workflows General/Steps/Step Rules modal wizard, which this graph already ruled is NOT a page, while `page.authorized-approval-limits` IS a page and its nav quote says *window*). On the three real tests:
- **own menu destination?** NO — reached only via `New`/`Modify` from the parent list. The one full path that exists (`… > Delegate Configurations > New`) terminates at the parent.
- **own role gate?** NO — no gate sentence anywhere names it.
- **own object model?** NO — same single object (the delegate configuration) the parent lists.
**→ Recommendation: a MODAL/child window on `page.delegate-configurations`, not a page node.** State this reasoning in `identityNotes` and cite the Workflows-wizard precedent for the negative and the Authorized Approval Limits precedent as the counter-case that was decided the other way and why (that one has its own menu destination; this one does not).

## 2.5 RAW `<table>` CENSUS — all 34 delegate-mentioning files, both dirs
Command: `for f in $(grep -rli "delegate" AG TG); do grep -c "<table" $f; done` and the same with `<tr`.
**RESULT: `<table` = 0 for all 34. `<tr` = 0 for all 34.** The correct output is the zeros, and here they are, reported rather than assumed.
(The two raw-table files found in this run both surfaced on the *Email Reminders* term list, not this one — see §1.5.)

## 2.6 LONG CATALOG CENSUS — Delegate Configurations

| file | naive `^\|` | correct `^\s*\|` | derived rows | TRUE content | class |
|---|---|---|---|---|---|
| access-and-view-payment-delegate-configurations-8ed1298f.md | **0** | **37** | 1 sep + 12×3 | **11 FIELD ROWS** (list view) | **ROSTER** |
| create-a-new-invoice-delegate-configuration-fcf42662.md | **0** | **22** | 1 sep + 7×3 | **6 FIELD ROWS** (editor) | **ROSTER** |
| delegate-configuration-8b2bd26d.md | 31 | **91** | 1 sep + 30×3 | 1 header + **29 dated revision entries** | **HISTORY** |
| general-information-8b3b0308.md | 47 | **139** | 1 sep + 46×3 | ~45 dated revision entries | **HISTORY — and it is the WORKFLOWS guide, not this page** |
| terminology-e1e1ed99.md | 0 | 0 | — | **6-entry bullet catalogue** | **ALIAS SOURCE** |
| the-condition-page-5d4ea870.md | 25 | 71 | — | Audit Rules condition editor | ALREADY MINED (Audit Rules) |
| the-query-builder-and-the-condition-editor-e10473f9.md | 21 | 59 | — | query-builder field catalogue | not this page (2 incidental `Approved by Delegate` / `Submitted By Delegate` entries) |
| create-a-new-workflow-554e86aa.md | 0 | 85 | — | Workflows roster | ALREADY MINED (35 citations) |
| every other delegate file | 0 | 0 | — | prose only | — |

### Roster A — `access-and-view-payment-delegate-configurations-8ed1298f.md`, 11 TRUE rows (Invoice/Purchase Request **list view**), verbatim:
`Name` · `Can Prepare` · `Can Submit` · `Can Approve` `(Any Time)` · `Can Approve Temporary` · `Can View Images` · `Restrict Delegates to Group` · `Need Approver Role to Approve` · `Restrict approvers to those with equal or higher authorized approver limit` · `Maximum Time Period to Approve` · `Applies to Groups`
(Note `Can Approve` and `(Any Time)` are on separate lines inside one cell — quote carefully.)

### Roster B — `create-a-new-invoice-delegate-configuration-fcf42662.md`, 6 TRUE rows (**editor**), verbatim:
`Configuration Name` · `Maximum Time Period to Approve` · `Restrictions` · `Restrict approvers to those with equal or higher authorized approver limit` · `Applies to Groups` · `Delegate Settings For User Administrators and Employees`
Two of those six are **section headings that each contain a nested bullet catalogue**:
- `Restrictions` → 2: `Restrict delegate selection to user's group` / `Require approver role for approval delegation`
- `Delegate Settings For User Administrators and Employees` → 5: `Delegate can prepare` / `Delegate can submit` / `Delegate can approve (any time)` / `Delegate can approve during specified period` / `Delegate can view images`
Also inside `Applies to Groups`: the `Inheritance` / `No Inheritance` **toggle link** (`The Inheritance link works as a toggle. When selected, the link switches between Inheritance and No Inheritance.`) — a real control, and the only place inheritance is a clickable thing rather than a concept.

### ⚠ THE ALIAS MAP — this is why "~25 fields" is wrong. **11–13 unique controls, not 17, not 25.**
| unique control | list-view label | editor label | third label |
|---|---|---|---|
| 1 | `Name` | `Configuration Name` | — |
| 2 | `Can Prepare` | `Delegate can prepare` | — |
| 3 | `Can Submit` | `Delegate can submit` | — |
| 4 | `Can Approve` `(Any Time)` | `Delegate can approve (any time)` | — |
| 5 | `Can Approve Temporary` | `Delegate can approve during specified period` | `Temporary Approval Delegation` (terminology) |
| 6 | `Can View Images` | `Delegate can view images` | `Delegate can view invoice images for payment requests` (delegate-experience) |
| 7 | `Restrict Delegates to Group` | `Restrict delegate selection to user's group` | `Delegate Restriction to Group` (terminology) |
| 8 | `Need Approver Role to Approve` | `Require approver role for approval delegation` | — |
| 9 | `Restrict approvers to those with equal or higher authorized approver limit` | identical | — |
| 10 | `Maximum Time Period to Approve` | identical | — |
| 11 | `Applies to Groups` | identical (+ Inheritance toggle) | — |
| (12) | — | `Restrictions` (section heading) | — |
| (13) | — | `Delegate Settings For User Administrators and Employees` (section heading) | — |
| (14) | — | `Inheritance` / `No Inheritance` link | — |

**Collapse aliases. Do not emit 3 fields where the corpus documents 1 control under 3 labels — but DO record every label, and record the drift as a contradiction.** Rows 2–6 have a real semantic asymmetry worth a note: the list-view labels read as *displayed indicators* (`Indicates whether…`) while the editor labels read as *settable options* (`If active, …`). Same control, two states of the UI.

### `terminology-e1e1ed99.md` — the 6-entry alias catalogue (this page's richest alias source; **ZERO occurrences of "reminder"** — verified, it belongs to this page only)
`Invoice Delegates` · `Invoice Request Delegates` · `Purchase Request Delegates` · `Temporary Approval Delegation` · `Delegate Restriction to Group` · `Delegated Approver`
Three are field-shaped (rows 5, 7 and the delegated-approver concept). It also carries the pointer into `Delegate Self-Approval`.

## 2.7 `overview-8b2ba917.md` — this page's whole semantics in one paragraph
`Concur Invoice delegate configurations define the subset of invoice permissions that delegates are allowed to have within Concur Invoice.` … `The user or the User Administrator share identical sets of permissions…` Corroborated by the editor topic's `The configuration is a template that allows or denies permissions to the user or the User Admin. The subset of permissions is identical. There is no option to provide separate permissions for specific employees or by their assigned roles.` **This is the cascading-permission model and it should be the page's `notes`.** MUST-READ.

## 2.8 The already-written graph endpoint
`dep.g1.059` (source `field.group-configurations.group`) targets `{page: "Delegate Configurations", field: "Delegate Configuration", resolved: false}` and carries `Each group within your company can only have one Invoice delegate configuration.` — sourced, ironically, from `create-a-new-invoice-delegate-configuration-fcf42662.md`, i.e. **from this page's own roster file, written by a Group 1 agent who had no roster.** Independent corroboration of the PAGE NAME.
⚠ Its target field name `"Delegate Configuration"` is **label-shaped, and no field on this page will be named that.** The nearest real controls are `Configuration Name` / `Applies to Groups`. **It will not auto-resolve. Do NOT contort naming to force it.** Report the mismatch for a correction pass; the honest fix is repointing the dep at `Applies to Groups`, which is where the one-per-group cardinality actually lives (its own cell repeats the rule: `Each group within your company can only have one payment delegate configuration; however, because delegate configurations use inheritance…`).

## 2.9 The Workflows boundary
This page is squarely approval configuration and cross-references the built Workflows **Authorized Approvers** tab through `Restrict approvers to those with equal or higher authorized approver limit`. **But the corpus never once places it under Workflows — verified across all 34 delegate-mentioning files.** It is a SIBLING page. Emit the cross-page dependency; do not re-home.

**⚠ THE ONE FILE SHARED WITH RUN A'S SUBJECT MATTER: `delegate-self-approval-1b627285.md`.**
Verified 2026-09-01: this file is **NOT cited anywhere in the graph** — the built field `field.workflows.allow-delegated-approvers-to-approve-own-requests` cites `create-a-new-workflow-554e86aa.md` instead. So it is an **unmined corroboration source**, not a duplicate source. It adds two things Run A's source does not: it places the setting on the `General step`, and it distinguishes a delegate acting for an **Approver** from one acting as an **AP User** (`"delegated approver"`). **You MAY cite it in `notes` and MAY emit a dependency into the built Workflows field. You may NOT emit a field here from it.**

## 2.10 Cross-page dependencies to emit
- **→ Workflows / Authorized Approvers (BUILT)**: the equal-or-higher-limit restriction, plus its two documented consequences (`Can Approve` and `Can Approve Temporary` become unavailable when cleared; limits evaluated only at assignment time, never re-checked, no notification).
- **→ Authorized Approval Limits (BUILT)**: `delegates-4d7c563c.md` / `delegates-ff6ea3e6.md` / `approver-terminology-8559861c.md` — a delegate inherits the authorized approver's limits, currencies and exception authority, and `the delegate must already have the Invoice Approver role`.
- **→ Group Configurations (BUILT)**: one configuration per group + inheritance; `Delegate configurations can be applied to employee group configurations within Concur Invoice.`
- **→ User Administration / My Info (UNBUILT, and a DOCUMENTARY gap)**: `Maximum Time Period to Approve` `works in conjunction with the Choose Dates link in the Delegates area of both My Info and User Administration.` The delegate's actual **start/end dates are NOT configured on this page.** Corpus-wide, `Choose Dates` appears in exactly 2 files, both of them this page's rosters. **There is no start-date / end-date / expiration field on Delegate Configurations — that is the correct thin answer.**
- **→ external `Shared: Delegate Configuration Setup Guide`** (`delegates-4d7c563c.md`) — absent from this corpus. A **DOCUMENTARY** gap, not a menu-location one. Record it.

## 2.11 RULED OUT for Delegate Configurations, with reasons
| file | why |
|---|---|
| AG/delegates-email-notification-7c866769.md | END-USER routing behaviour (who receives approval mail, temporary vs permanent delegate preference in My Info). No admin control on this page. |
| AG/delegate-configuration-8b2bd26d.md | 29-row **revision history**. Census'd, classified, not a roster. Useful only for the guide title alias. |
| AG/general-information-8b3b0308.md | 45-row revision history **of the Workflows guide**; its single delegate line is the Run A self-approval setting. Not this page. |
| AG/overview-8b281639.md | the **Attendees** feature overview; the word "delegates" appears once in a scope sentence. Different domain entirely. |
| AG/the-condition-page-5d4ea870.md | Audit Rules condition editor — **ALREADY MINED by Audit Rules** (22 + 13 citations). |
| AG/create-a-new-workflow-554e86aa.md | **ALREADY MINED by Workflows** (35 citations). |
| AG/add-an-email-notification-c237a2de.md, select-an-email-notification-in-the-workflows-tab-663bb8ac.md | **ALREADY MINED by Workflows** (Email Notifications tab). Surface here only on the word "delegate". |
| AG/restrict-use-of-delete-request-link-…-f201c8db.md | Invoice Settings / delete-link permission matrix. Delegate is one actor in the matrix, not a control here. |
| AG/when-the-delegate-cannot-submit-53c9cb69.md | end-user `Notify Employee` link behaviour + a sample email. **Contains sample tenant-shaped data (`TBrown@systems.com`, a hostname URL) — do not quote it.** Consequence-of-configuration only. |
| AG/audit-invoice-delegate-actions-3660a51f.md | audit-trail behaviour, 3 recorded actions. No control. Useful as a page `notes` line. |
| AG/delegates-and-proxies-a88c80e0.md, delegates-proxies-approvers-and-processors-8b283bfd.md | one-sentence scoping stubs. No control. |
| AG/delegates-submit-a-payment-or-purchase-request-0ee0f0b9.md | end-user consequence of `Can Submit` + the user's right to deny. Dependency/notes only. |
| AG/invoice-user-f11cccd8.md, user-administrator-5aa3eb5e.md | the **consumer** surfaces (Profile > Invoice Settings > Invoice Delegates; User Administration). Both state `The columns that appear for the delegate will vary, depending on the settings in the delegates configuration file.` — excellent dependency evidence, **not fields on this page.** |
| AG/special-considerations-*-8b2bfccb / 77a887a4 | group-change consequences (rights auto-removed, assignments not auto-updated). Behaviour + admin guidance, no control. Strong `notes` / dependency material. |
| 5 TG files (before-you-begin-ff38d4b7, overview-502953fc, required-roles-4a46ee34, accessing-invoice-proxy-logon-8b4e4019, the-query-builder-…-e10473f9) | delegate mentioned only as an ACTOR in another feature's permission prose. |
| all 7 TG `proxy-*` files | **PROXY is a different mechanism from DELEGATE** (proxy logon vs acting-on-behalf-of permissions). Adjacent, never merge. Zero delegate-configuration controls. |
| the `two user interfaces` boilerplate | 2014 boilerplate present in ~40 corpus files including most already-built pages. **NOT a property of this page. Must not become a `uiVariant` claim.** |
| filename sweeps `behalf` / `acting` / `temporar` | **ZERO** relevant hits in both dirs. Reported as zeros. |

**tools-guides yield for Delegate Configurations: ZERO field-bearing files.** Measured, both dirs weighted equally.

---

# 3. CROSS-PAGE CHECK
`comm` of the two candidate sets: **ZERO source files are shared between Email Reminders and Delegate Configurations.** The two pages in this run cannot contaminate each other. All contamination risk in this run is with the ALREADY-BUILT Workflows / Group Configurations / Audit Rules pages, and every such file is flagged ALREADY-MINED-BY in the structured output.

# 4. LITERAL COMMANDS RUN
See `searchLog` in the structured output — every `ls`, `grep -rli`, `grep -c "<table"`, `grep -c "^| "`, `grep -cP "^\s*\|"`, `wc -c/-l`, the `grep -F -c` verification battery, and the `python3` graph cross-check.

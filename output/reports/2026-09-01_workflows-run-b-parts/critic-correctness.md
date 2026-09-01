# Adversarial Critic — CORRECTNESS (what is WRONG)
Workflows Run B · Email Reminders + Delegate Configurations · 2026-09-01

**Headline verdict: this is the cleanest build this project has produced on the mechanical axes.**
384/384 structured `sourceQuote`s verify byte-for-byte. 249/249 value strings that are *claimed* as
enumerations verify. Zero unwired value sets. Zero forbidden Workflows citations. Zero `fromRawHtmlTable`
false flags. Zero unearned `uiVariant: "both"`. Zero duplicate field names. Zero dangling endpoints.
The predecessor's five defect classes are **all absent**.

Six findings would change the graph. Two are merge-blocking-in-effect (one is a lost catalogue, one is
an operator precondition that silently destroys 250 existing nodes). Four are corrections.

---

## 1. QUOTE FIDELITY — CLEAN (384/384)

Ran exhaustively, not sampled. Every dict anywhere in the 16 part files that carries both `sourceQuote`
and `sourceFile` was checked as an exact Python `in` (stricter than the validator, which normalises).

```
$ python3 verify.py     # walks all */*.json, exact substring, no normalisation
checked quotes: 384
FAILURES: 0
```

Path-format check, separately:
```
sourceFile with wrong prefix / wrong dir: 0
```
No record carries the `CONCUR_INVOICE/` prefix that broke an earlier drop pass. All 391 `sourceFile`
values are `<guide-dir>/<filename>.md`. Seven records carry `sourceFile` without `sourceQuote` — all
seven are `splitsProposed` (4) and `orphanCandidates` (3), which are advisory shapes, not graph nodes.
`bin/assemble-parts.py:283` fills the orphan quote with `''`, and `norm('')` is a substring of every
file, so no downstream WARN. **No action.**

### 1a. FINDING (LOW) — five *notes*-level strings are presented in quotation marks but are not verbatim

The validator never touches `notes`, so these ship into the graph unchecked, and the project's own rule
("never join wrapped lines, never clean up a quote") is violated. The risk is that a later pass copies
one into a `sourceQuote`. I scanned all 252 unambiguous embedded quotations across the seven synth/roster
files (spans with no internal quote character); 12 missed, 7 are legitimate (elisions marked `...`, or
quotations of *prior build artefacts* rather than the corpus). These five are not:

| where | string as written | what the corpus actually says |
|---|---|---|
| `roster-email-reminders.json` → `fields[5]` (`specific-days`) notes | `Enter a valid integer between 1 and 31. Use > for the last day of the month.` | `Enter a valid integer between 1 and 31. Use \> for the last day of the month.` — the `\` is **in the file** (`create-email-reminders-604c4a46.md:140`). Unescaping it is a silent edit. |
| `roster-email-reminders.json` → `fields[6]` (`display-as-from`) notes | `…underlying email address of EmailReminderService@concursolutions.com.` | the address is a markdown link `[EmailReminderService@concursolutions.com](mailto:…)` and there is **no trailing period**. Safe verbatim stop: `…does not affect the underlying email address of` |
| `roster-email-reminders.json` → `fields[14]` (`active`) notes | `Select Yes to make this email reminder active. All email reminders are inactive by default. Emails are not sent until you set this field to Yes.` | **not contiguous** — a `**Note**` block sits between sentence 2 and sentence 3. Two quotes, not one. |
| `roster-email-reminders.json` → `fields[21]` (`remove-button`) notes and `verifyNotes` | `Select the email reminder you want to delete. Select Remove.` | **not contiguous** — these are numbered steps 2 and 3 of `delete-email-reminders-8f693700.md`. |
| `roster-delegate-configurations.json` → `dropped[5]` reason (twice) | `If active, ... can only act on behalf of another employee within their group.` | elision inside quote marks; acceptable as prose but should be `…can only act on behalf of another employee within their group.` split at the ellipsis. |

**Fix:** truncate each to the longest genuinely contiguous span. No node is deleted.

---

## 2. INVENTED VALUES — CLEAN, AND THE HARDEST CASE WAS HANDLED CORRECTLY

Every string in every `validValues` and every value-set `values` array was checked against its own cited
file. 249 verified. The 48 misses split into exactly two classes, both declared in advance by the build
(see §2b), and **not one is an invented enumeration**.

The Yes/No discipline held under direct pressure, and I verified the corpus rather than the claim:

```
$ grep -n "No\b" .../create-email-reminders-604c4a46.md
216:    If you do not want to send an email reminder to the default approver, select No.
227:    Select Yes or No to indicate if a copy is to be sent to the employee represented …
```
Two `No`s in the whole file, both inside the **Copy to Approver** and **Copy to Employee** cells.
The **Active** cell (line ~274) reads only `Select Yes to make this email reminder active. All email
reminders are inactive by default.` — and `active` carries `validValues: ["Yes"]`, **not** `["Yes","No"]`.
That is exactly the defect that killed two nodes in the last run, and it did not recur. Note the
validator could not have caught it either way (`norm("No")` = `"no"`, a substring of almost any file) —
this was judgment, not mechanism.

`Delegate Configurations`: 18 of 20 fields carry `validValues: []`. The two that don't (`tab-selector`
`["Invoice","Purchase Request"]`, `inheritance_link` `["Inheritance","No Inheritance"]`) have **both**
strings printed inside their own one-sentence `sourceQuote`. No pair completed anywhere.

The genuine option-list contradiction was preserved, not reconciled — verified in the corpus:
```
create-email-reminders-604c4a46.md:60  Approval Request - Vendor Request: When a vendor-based invoice …
create-reminder-rules-b0a7fac5.md:63   Approval Request - Payment Vendor: When a vendor-based invoice …
create-email-reminders-604c4a46.md:59  Approval Request - Payment Request: When a cash advance request has a status of Pending Approval.
create-reminder-rules-b0a7fac5.md:61   Approval Request - Payment Request: When an invoice has a status of Pending Approval.
```
Two incompatible lists, one contradiction node with four readings, both value sets emitted separately.
Correct.

### 2a. FINDING (MEDIUM) — the `specific-days` value set is a redundant, *incomplete* copy of `range.wfb.001`

`synth-valuesets.json` → `valueSets[4]` and `synth-ranges.json` → `compressedRanges[0]` carry **the same
31 members, on the same field, from the same file, from the same sentence**. They are the same fact
written twice.

Worse, the value set is the *lossier* of the two. The source cell is:

```
create-email-reminders-604c4a46.md:138  This field appears only if you selected Specific days of the month …
create-email-reminders-604c4a46.md:140  Enter a valid integer between 1 and 31. Use \> for the last day of the month.
create-email-reminders-604c4a46.md:144  10, 20, > in the field would run the reminder on the 10th, 20th, and the last day of the month.
```

The field is a **free-text comma list**, and `>` is a documented, accepted, non-numeric input token.
`range.wfb.001` excludes `>` *and says so explicitly and correctly* (a sentinel is not a member of a
1–31 integer range, and `count` must equal `len(expandsTo)`). The value set excludes it with no such
guard. A Chromium driver reading `values` to decide what to type into **Specific days** will produce
`1..31` and **never produce `>`** — so "last day of the month" becomes unreachable, which is the single
most likely reason an admin picks this frequency at all.

**Fix (preferred):** drop `synth-valuesets.json` → `valueSets[4]`. The compressed range already carries
the expansion, is the correct node type for a prose range, and its notes carry `>`.
**Fix (alternative):** keep it but re-scope `context` to *accepted input tokens* and add `>` to `values`.
Do **not** add `>` to `range.wfb.001` — that would break `range-count-mismatch`.

Severity note: this is *not* a build-breaker. `value-set-entries-not-in-file` is a WARN, the baseline
graph already carries 11 of them (`python3 bin/validate-graph.py` → `WARN 181`), and the set's own notes
predict and justify the 12th. The defect is the redundancy plus the missing `>`, not the WARN.

### 2b. Declared, accepted, no action
The 48 "misses" my sweep reported are: the 10 unprinted integers above (×4 files — the range record, two
extracts, the value set), and 8 composite `%n% — Label: Description` strings that live **only in
`extract-email-reminders-procedure.json` → `valueSetCandidates[5..6]`**. Those composites were **not
promoted**: `synth-valuesets.json` emits the bare tokens `["%1%","%2%","%3%","%4%"]`, all four verbatim.
The extract-level composites die at assembly. Correct outcome.

---

## 3. VALUE-SET WIRING — CLEAN (10/10 wire; 3 correctly refuse to)

Every `appliesToField` in `synth-valuesets.json` is **exactly** a `name` in the roster for its
`appliesToPage`:

```
valueSets 10
  UNWIRED VALUE SET: (none)
```
`reminder-type`, `rule_reminder_type`, `frequency`, `reminder-rule`, `specific-days`, `email-message` ×2,
`email-subject`, `editable-by`, `rule_editable_by` — all resolve. **This is the rule-7 defect that
stranded 17 sets in an earlier run, and it did not recur.** Credit where due: the Email Reminders roster
`verifyNotes` explicitly ordered the merger to normalise the tables/crosscut lenses' underscore spellings
(`reminder_type`, `applies_to`, `email_message`, …) to the canonical hyphenated names, and the synthesis
actually did it. The Delegate roster did the same for `configuration_name → configuration-name`.

The three `orphanCandidates` are **correctly** unwired and each names its owner honestly:

| orphan | values | correct owner |
|---|---|---|
| Delegate Configurations list-view column roster (12 strings, 11 columns) | `Name … Applies to Groups` | **none exists.** It is a list-view column roster, not an option list. Wiring it to `configuration_name` (as the tables lens did) would resurrect 7 collapsed aliases as *values of a text box*. Needs a node type the schema does not have. |
| `Restrictions` section membership (2) | `Restrict delegate selection to user's group`, `Require approver role for approval delegation` | **none.** Both members are already fields. This is a containment list; wiring it double-books two real controls. |
| `Delegate Settings…` section membership (5) | the five permission checkboxes | **none.** Same: all five are already fields. |

`bin/assemble-parts.py:274-291` lands all three as `knownGap: true` sets, which `validate-graph.py:110`
demotes from ERROR to WARN. Correct handling — "unwired" and "deleted" stay distinct.

### 3a. FINDING (MEDIUM) — the Group 3 orphan this run was chartered to close is NOT retired by anything on disk

`synth-valuesets.json` → `valueSets[5]` notes say, verbatim:
> *"THIS SET GIVES AN OWNER TO AN EXISTING GRAPH ORPHAN: vset.g3.unnamed.email-message-replacement-tokens-the-4-row-variable-label-na (knownGap:true, empty appliesToRef) … Retire the orphan; do not keep both."*

The orphan is real and I read it out of the live graph:
```
vset.g3.unnamed.email-message-replacement-tokens-the-4-row-variable-label-na
  group 'Group 3 — PO Matching'   patch None   knownGap True
  values ['%1%', '%2%', '%3%', '%4%']
  file  …/email-message-replacement-tokens-c9cc4af4.md
```
`bin/merge-group.py:76-99` removes prior nodes **only** where `patch == tag` (patch mode) or
`group == group` (non-patch mode). This orphan's `group` is `Group 3 — PO Matching` and its `patch` is
`None`, so **a Run B merge under group `Workflows` cannot touch it.** After the merge the graph will
carry the same 4-token catalogue twice: once orphaned under Group 3, once wired to
`field.email-reminders.email-message`.

**Fix:** a `bin/apply-corrections.py` op deleting `vset.g3.unnamed.email-message-replacement-tokens-the-4-row-variable-label-na`,
run after the merge. Nothing in `wf-b-parts/` does this and nothing can — the parts schema has no delete
channel. It must be scheduled explicitly or the run's headline achievement ("closed the known gap")
becomes "duplicated the known gap".

---

## 4. PAGE OWNERSHIP — CLEAN, AND PROVABLY SO

**Forward direction.** Every field's cited file is a topic about its own page:

```
roster-delegate-configurations.json          roster-email-reminders.json
 16 create-a-new-invoice-delegate-configuration-fcf42662.md   17 create-email-reminders-604c4a46.md
  2 delete-an-invoice-delegate-configuration-92627a9b.md       5 create-reminder-rules-b0a7fac5.md
  1 edit-an-invoice-delegate-configuration-c7f51424.md         1 edit-email-reminders-2a2638ad.md
  1 access-and-view-payment-delegate-configurations-8ed1298f.md 1 copy-reminder-rules-9350776e.md
                                                               1 delete-email-reminders-8f693700.md
                                                               1 delete-reminder-rules-ab4f8d33.md
```
Ten files, all reminder- or delegate-specific. The strongest single piece of evidence that nothing was
re-homed:

```
NEW fields whose cited file is ALREADY MINED by a built page:  (none)
```
**Zero source-file overlap with any of the 617 built fields.** The seven already-mined corroboration
files the brief warned about (`add-groups-ec5d8d8b.md`, `work-with-the-steps-page-fab249d1.md`,
`overview-8b2edfd0.md`, `workflow-667cee21.md`, `about-vendor-approval-workflow-step-and-timeout-b3d1bd2c.md`,
`email-message-replacement-tokens-c9cc4af4.md`, `delegate-self-approval-1b627285.md`) were read and used
**only** for dependencies, notes and one value set — never for a field.

**Reverse direction.** Cross-page `name` collisions with built pages:

| new | built |
|---|---|
| `Email Reminders.name` | `Policies.Name` |
| `Email Reminders.active` | `Audit Rules.active` |
| **`Email Reminders.rule_name`** | **`Audit Rules.rule_name`** |
| `Delegate Configurations.new / modify / remove / save` | `Group Configurations.New/Modify/Save`, `Policies.Modify/Remove` |

All are legal — `validate-graph.py:130` scopes `duplicate-field-name` **per page**, and the graph's
convention is page-prefixed ids. The only one worth a note is `rule_name`, which is distinctive enough
that a name-only rewire could pick the wrong control. It is de-risked by `apply-corrections.wire_by_name`
(`bin/apply-corrections.py:297-306`), which requires a stated page and refuses a graph-wide guess when
the stated page does not carry the name. **Informational; no change required.**

`Editable By` / `Applies to` recur on Policies, Audit Rules, Exceptions, Workflows and Tax Administration —
that is the product, not a defect.

---

## 5. DUPLICATE NAMES vs DUPLICATE CONTROLS

### 5(a) WITHIN Email Reminders — HANDLED CORRECTLY, INCLUDING THE PART THAT WAS TEMPTING TO GET WRONG

```
Email Reminders fields 26   dup names: []
Delegate Configurations fields 20   dup names: []
```
The three guaranteed collisions are split by prefix exactly as instructed: `name`/`rule_name`,
`reminder-type`/`rule_reminder_type`, `editable-by`/`rule_editable_by`. Each of the six notes states its
tab. **They were not merged to duck the validator error**, and — the part that mattered — the two
`Reminder Type` option lists were **not** reconciled. Both three-option lists are emitted as separate
value sets with distinct `context`, and `contradictions[0]` carries four readings covering both the label
difference (`Vendor Request` vs `Payment Vendor`) and the incompatible definition of the shared option
(`cash advance request` vs `invoice`). Verified against the corpus at §2 above.

Row counts re-derived independently, so no catalogue was truncated:
```
create-email-reminders-604c4a46.md    openers=49 sep=1 → (49-1)/3 = 16 rows = 1 header + 15 fields   ✓ 15 emitted
create-reminder-rules-b0a7fac5.md     openers=13 sep=1 → 4 rows  = 1 header + 3 fields              ✓ 3 emitted
create-a-new-invoice-delegate-…-fcf42662.md  openers=22 sep=1 → 7 rows = 1 header + 6 fields        ✓ 6 emitted
access-and-view-payment-…-8ed1298f.md openers=37 sep=1 → 12 rows = 1 header + 11 columns            ✗ see §6
email-message-replacement-tokens-c9cc4af4.md openers=21 sep=1 → 5 rows×4 = 1 header + 4 tokens      ✓ 4 emitted
```

### 5(b) ACROSS to the built Workflows Email Notifications tab — CLEAN, AND THE NOTES EARN IT

`grep -rlF` over both guide directories:
```
Email Subject      → add-an-email-notification-c237a2de.md (BUILT)  AND  create-email-reminders-604c4a46.md (this run)  [+4 reminder topics]
Display as From    → add-an-email-notification-c237a2de.md, modify-an-email-notification-a6e5f4ba.md (BUILT)  AND  create-email-reminders-604c4a46.md (this run)
Email Message      → reminder topics ONLY — no notification file. (Workflows' twin is labelled "Email Body")
Notification Name / Notification Type → notification files ONLY. Not on this page.
```
So exactly **two** labels are documented on both surfaces. For both, this page presents its **own**
control, from its **own** file, and the roster **says so, naming the sibling field id**:

- `email-subject` notes: *"DO NOT CONFUSE with the built field.workflows.email-subject on the Workflows > Email Notifications tab — same label, different page/object."* Its own quote carries a 255-character maximum that belongs to the reminder editor.
- `display-as-from` notes: *"DO NOT CONFUSE with the built field.workflows.email-notification-display-as-from ('Display as From') on the Workflows > Email Notifications tab (add-an-email-notification-c237a2de.md) — same label, different page, different object (event-driven notification vs interval-driven reminder)."*

Neither is "the same value written twice". **No action.**

### 5(c) HARD RULE — RUN, ZERO HITS

```
forbidden-citation field hits: 0
```
No field on `Email Reminders` cites `add-an-email-notification-c237a2de.md`,
`modify-an-email-notification-a6e5f4ba.md` or `select-an-email-notification-in-the-workflows-tab-663bb8ac.md`.
No field on `Delegate Configurations` cites `delegate-self-approval-1b627285.md`. I extended the check to
value sets, contradictions and compressed ranges attributed to either page: also zero.
`delegate-self-approval-1b627285.md` appears **only** as `dependencies[23]` (→
`Workflows.allow_delegated_approvers_to_approve_own_requests`) and in notes. That is the permitted use.

### 5(d) FINDING (MEDIUM) — four rule-side-only controls escape the run's own `rule_` prefix scheme

The run adopted a naming rule: **rule-object controls get a `rule_` prefix so a driver knows which tab
they live on.** Three fields follow it. Four do not, even though their own notes say "RULE-SIDE ONLY":

| field | notes say | grounded in |
|---|---|---|
| `confirm-yes-button` | *"Confirmation-dialog control on RULE delete only"* | `delete-reminder-rules-ab4f8d33.md` |
| `next-button` | *"RULE-SIDE ONLY."* | `create-reminder-rules-b0a7fac5.md` |
| `finish-button` | *"RULE-SIDE ONLY."* | `create-reminder-rules-b0a7fac5.md` |
| `copy-button-rule` | *"RULE-SIDE ONLY."* | `copy-reminder-rules-9350776e.md` (suffix, not prefix — inconsistent with the other three schemes) |

`confirm-yes-button` is the dangerous one, and the corpus is unambiguous:

```
delete-email-reminders-8f693700.md   →  3 steps: select tab, select reminder, "Select Remove."   NO confirmation
delete-reminder-rules-ab4f8d33.md    →  3 steps: select tab, "…choose Remove.",
                                            "In the confirmation message, select Yes to dismiss the message."
```
A driver consuming the graph **by name** sees `remove-button` and `confirm-yes-button` side by side on one
page, with no prefix distinguishing them, and will hang waiting for a Yes dialog the reminder side does
not have. The `splitsProposed` entry for `remove-button` names this exact failure — but splitting
`remove-button` alone does **not** fix it, because `confirm-yes-button` stays bare and still reads as the
reminder side's confirmation.

**Fix (cheapest, no new records, no Repair-created nodes):** rename in place —
`confirm-yes-button` → `rule_confirm_yes_button`, `next-button` → `rule_next_button`,
`finish-button` → `rule_finish_button`, `copy-button-rule` → `rule_copy_button`. Quotes, files and notes
unchanged; no node is created or deleted; no dependency or step references any of these four (checked).

---

## 6. WRONG DROPS — ONE I WOULD REVERSE, AND IT IS THE LARGEST CONTENT LOSS IN THE RUN

`Email Reminders`: **0 dropped.** Nothing to reverse.

`Delegate Configurations`: **9 dropped**, all `duplicateOf` alias collapses, none a refutation. Two are
genuine byte-identical duplicates and I endorse them (`restrict-approvers-equal-or-higher-limit`,
`inheritance-toggle`). Three more list rows were legitimately merged — I verified the descriptions are
byte-identical across both files:

```
"Indicates a set time period, in days, for which an employee can approve invoices on behalf of another employee."
   create-a-new-invoice-delegate-configuration-fcf42662.md      1
   access-and-view-payment-delegate-configurations-8ed1298f.md  1
"Displays the names of the groups for which the configuration applies."
   create-a-new-invoice-delegate-configuration-fcf42662.md      1
   access-and-view-payment-delegate-configurations-8ed1298f.md  1
```

### 6a. FINDING (HIGH) — 7 rows of a documented field table titled "Delegate Configuration Fields" were deleted, against the graph's own precedent

The dropped-with-distinct-text set is `dropped[0..6]`:
`can-prepare`, `can-submit`, `can-approve-any-time`, `can-approve-temporary`, `can-view-images`,
`restrict-delegates-to-group`, `need-approver-role-to-approve` — plus `Name`, absorbed into
`configuration-name`, whose list text also differs.

These are not paraphrases of the editor rows. Each has **its own label and its own description**:

```
access-and-view-payment-delegate-configurations-8ed1298f.md:35   Delegate Configuration Fields      ← the table's own title
… Can Prepare  | Indicates whether the employees assigned to this configuration can prepare invoices …
… Can Approve (Any Time) | … There is no time period associated with this action.      ← sentence found NOWHERE else
… Can View Images | … can view the invoices received through the imaging service.      ← different scope from the editor row
… Restrict Delegates to Group | … can select delegates that are OUTSIDE of their own group.  ← OPPOSITE POLARITY to the editor row
```

Three reasons to reverse:

1. **Rule 6 of the brief.** *"A ROW IN A DOCUMENTED FIELD TABLE IS A FIELD."* This is a table SAP titles
   "Delegate Configuration Fields", 11 rows, correctly censused at 37 cell-openers. Eight of its rows now
   reach the graph as prose inside another node's `notes`.
2. **The built graph's own convention says keep both.** Workflows does exactly this, from exactly this
   two-file shape:
   ```
   Workflows  workflows_list_editable_by_column            "Editable By"            ← access-workflow-fa9892a7.md      (list view)
   Workflows  editable_by_groups                           "Editable By Groups"     ← create-a-new-workflow-554e86aa.md (editor)
   Workflows  workflows_list_steps_can_be_added_by_column  "Steps Can Be Added By"  ← access-workflow-fa9892a7.md
   Workflows  steps_can_be_added_by                        …                        ← create-a-new-workflow-554e86aa.md
   Workflows  workflows_list_workflow_name_column / workflows_list_workflow_type_column
   ```
   Same product, same guide, same list-vs-editor split, opposite disposition. The Run B roster collapsed;
   Run A kept. One of the two is wrong, and the one with 617 fields behind it is the convention.
3. **It costs the Purchase Request tab its only content.** The run's own `orphanCandidates[0]` states it:
   *"this roster is the ONLY documentation the Purchase Request tab gets anywhere in the corpus."* The
   list-view table is explicitly claimed for **both** tabs (`"…displayed on either the Invoice or Purchase
   Request page by default."`). After the collapse, the whole 11-row roster contributes exactly **one**
   node to the graph — `tab-selector`. A driver on the Purchase Request tab now has nothing.

The collapse also creates a knock-on: the 12-value column roster becomes an unownable orphan
(§3, `orphanCandidates[0]`) precisely *because* the columns were deleted as fields. Re-emitting them
dissolves that orphan too.

**Fix:** re-emit the 7 (or 8, including `Name`) as list-column fields following the Workflows naming
pattern — `list_can_prepare`, `list_can_submit`, `list_can_approve_any_time`, `list_can_approve_temporary`,
`list_can_view_images`, `list_restrict_delegates_to_group`, `list_need_approver_role_to_approve` — each
citing `access-and-view-payment-delegate-configurations-8ed1298f.md` with its own verbatim
`Indicates whether…` quote (each already verified at 1 hit by the roster pass, so no new grounding work),
and each `notes` naming its editor twin. Then either retire `orphanCandidates[0]` or repoint it at the
tab strip.

**Counter-argument, stated fairly:** the roster's reasoning is careful, both refuters agreed, every
dropped label and description survives verbatim inside the survivor's `notes`, and five label-drift
contradictions were emitted rather than reconciled — including the polarity inversion, which is the most
valuable thing on this page. This is a defensible convention call, not sloppiness. But it is a *convention
call the graph has already made the other way*, and it is the only decision in this run that removes
documented rows from a documented field table.

### 6b. FINDING (LOW) — three "dropped"/"never cited" bookkeeping claims are false

None of these ships as a graph node, but two of them ship inside `verifyNotes`, which
`bin/merge-group.py:130` carries onto the **permanent page node**.

| claim | reality |
|---|---|
| `roster-delegate-configurations.json` → `verifyNotes`: *"…and delegate-experience-8b30fb06.md, which are the only files any emitted field cites…"* | **No emitted field cites that file.** All 20 cite the four files listed in §4. It appears only in `contradictions[11]` and `dependencies[32]`. |
| digest `mustReadNeverCited` for Delegate Configurations lists `delete-an-invoice-delegate-configuration-92627a9b.md` | It **is** cited — by `remove` and `confirm-yes`. |
| digest `mustReadNeverCited` for Email Reminders lists `delete-email-reminders-8f693700.md` | It **is** cited — by `remove-button`. |

---

## 7. REPAIR DISCIPLINE — CLEAN, AND THIS IS THE PART I TRIED HARDEST TO BREAK

Neither roster emitted a record outside its inputs. I reconstructed the candidate pool from the six
`extract-*.json` files and compared name-by-name **and quote-by-quote**:

```
Email Reminders          candidates 38  roster 26  dropped 0
    ** NAME NOT IN ANY EXTRACT: (none)
    ~ quote differs from every extract candidate: (none)
Delegate Configurations  candidates 32  roster 20  dropped 9
    ** NAME NOT IN ANY EXTRACT: (none)
    ~ quote differs from every extract candidate: (none)
```
**Every surviving quote is byte-identical to a quote some lens actually produced.** No record was
hand-retyped, and no Repair-created record slipped past the refuters. `repairedCount` 1 (Email Reminders:
`reminder-rule` fieldType `dropdown` → `unknown`, because the corpus says "helper", not "dropdown") and 4
(Delegate: two relabels, two containment reclassifications) — all four are metadata-only; no quote, file
or `validValues` was touched.

The 15 "candidate names neither emitted nor listed as dropped" are the tables-lens underscore twins
(`email_message` vs `email-message`, `applies_to_groups` vs `applies-to-groups`, …). I confirmed each is
the same control with the same label and the same file. **Not content loss** — but the Email Reminders
`verifyNotes` claim *"26 inputs in … 0 dropped"* understates the pool (38 distinct candidate names), and
"0 dropped" should not be read as "38 candidates all survived". Bookkeeping only.

**`splitsProposed` on their merits.** All four are reported-not-emitted, for the stated reason that
Repair-created records never face a refuter. That is the right call and I endorse it. On substance:

- **`remove-button` (STRONGEST — execute it).** The two Removes have genuinely different documented
  consequences: rule-side has a confirmation dialog and a cascade (`"If a rule is deleted that is
  currently associated with an email reminder, it will deactivate the email reminder."`), reminder-side
  has neither. See §5(d) — splitting `remove-button` alone is **not sufficient**; `confirm-yes-button`
  must be renamed in the same pass.
- **`new-button` (STRONG).** Different targets, and the rule side carries a role gate the reminder side
  does not. The punctuation warning in the split note is correct and I re-verified it: the rule-side step
  is `Choose New` with **no trailing period**, so `grep -F "Choose New."` returns 0 against
  `create-reminder-rules-b0a7fac5.md`.
- **`modify-button` (MODERATE).** Real, but weaker: worth doing mainly because the reminder-side Modify
  *doubles as the Copy control* (`copy-email-reminders-cb75f9fd.md` reuses it and names no Copy button).
- **`tab-selector` → per-tab pair (DO NOT EXECUTE AS WRITTEN).** The precedent is genuinely split
  (`Company Locations` splits per tab; `Capture Processing Admin` and `Image Handling` do not), and the
  split's own note concedes a `Purchase Request` tab field would have **no roster behind it**. Leave as
  the tab strip. Note this is the same evidence that argues *for* §6a: the Purchase Request tab has no
  roster **because** the only roster covering it was collapsed away.

---

## 8. `fromRawHtmlTable` FLAGS — CLEAN BY MEASUREMENT, NOT BY OMISSION

```
cited file <table> census (flag vs reality)   — all 10 distinct cited files
  False  <table>=0  create-a-new-invoice-delegate-configuration-fcf42662.md
  False  <table>=0  delete-an-invoice-delegate-configuration-92627a9b.md
  False  <table>=0  edit-an-invoice-delegate-configuration-c7f51424.md
  False  <table>=0  access-and-view-payment-delegate-configurations-8ed1298f.md
  False  <table>=0  create-email-reminders-604c4a46.md
  False  <table>=0  delete-reminder-rules-ab4f8d33.md
  False  <table>=0  copy-reminder-rules-9350776e.md
  False  <table>=0  create-reminder-rules-b0a7fac5.md
  False  <table>=0  edit-email-reminders-2a2638ad.md
  False  <table>=0  delete-email-reminders-8f693700.md
```
**Zero false flags** (0 records set `true`) and **zero missed flags** (0 cited files contain `<table`).
I widened it to both pages' whole candidate pools rather than trusting the claim:
```
grep -rli "email reminder" both dirs → 25 files;  of those, grep -rlF "<table" → 0
grep -rli "delegate" admin-guides    → 29 files;  of those, grep -rlF "<table" → 0
```
The two files the digest lists under `rawTableFilesInInventory`
(`create-a-conditional-rule-in-the-editor-86a92887.md`, `additional-approver-situations-fbb5034c.md`) are
Audit Rules / Workflows topics, censused but not cited. Correct.

I also independently confirmed the tools-guides asymmetry the run publishes as a finding:
```
grep -rliF "email reminder" concur-invoice-professional-edition-tools-guides  → 0   (of 650 files)
grep -rliF "delegate"       concur-invoice-professional-edition-tools-guides  → 5
```
Both pages are admin-guides-only. Rule 1 was honoured — this is a measured absence, not a skewed search.

---

## 9. DEPENDENCIES AND STEPS

**Endpoints — all resolve.** Every dependency endpoint naming a **built** page was checked against the
live graph's `(page name, field name)` index, and every endpoint naming this run's pages against the
rosters:

```
dependency endpoint resolution: (no unresolved endpoints)
```
34 dependencies. The far ends into `Workflows.expire_after_this_many_days`,
`Workflows.authorized_approver_approval_limit`, `Workflows.authorized_approver_level`,
`Workflows.allow_delegated_approvers_to_approve_own_requests`,
`Workflows.authorized_approver_feature_available_for_workflows`,
`Authorized Approval Limits.approval_limit_amount` and `Group Configurations.Group` all exist **by exactly
those names**. No mistyped endpoint.

Forward references into unbuilt surfaces (`Import/Extract Administrator`, `Localization`,
`User Administration`) are legitimate per the brief and produce `step-references-unbuilt-page` WARNs only.

**Quotes state the relationship, not merely co-mention.** I read all 34. The weakest is `#16`
(`rule_name` → `Workflows.expire_after_this_many_days`), whose quote is a recommendation —
`"it would be helpful to create an email reminder for the Vendor Manager that triggers ~2 days prior to
time out"` — but it does state the coupling and the `condition` labels it as a recommendation rather than
an enforced rule. Acceptable. `#18`/`#19` share one quote across two targets; that is correct, because the
one source sentence names both withdrawn permissions (`Can Approve and Can Approve Temporary`).
Both `INFERRED` edges (`#21`, `#31`) say so in the first word of their `condition` and explain what the
corpus does and does not state. Honest.

**Steps.**
```
step count: 4
grpworkflows-b1-configure-interval-driven-email-reminder-end-to-end   seq 26
grpworkflows-b2-swap-a-reminder-rule-without-deactivating-live-reminders   seq 11
grpworkflows-b3-create-invoice-delegate-configuration-and-cascade-it   seq 19
grpworkflows-b4-enable-delegation-for-authorized-approvers   seq 12

sequence entries 68   marked CORPUS-STATED/INFERRED 68   UNMARKED 0   EMPTY 0   ORDER PROBLEMS 0
```
**Step ids are prefixed `grpworkflows-b`, not bare `grpworkflows-s`.** Run A occupies `s1`–`s7`; there is
no collision. `bin/assemble-parts.py:449` requires the prefix `grpworkflows-` (derived from the group
label), which `grpworkflows-b1-…` satisfies. Every one of the 68 sequence entries is explicitly marked and
every rationale states a consequence. Spot-checked several; `b1` order 2 carries the load-bearing
rule-before-reminder ordering with three independent attestations.

### 9a. FINDING (HIGH, OPERATIONAL) — the merge invocation is the single thing that can destroy this graph, and it is not in the parts directory

Not a defect in the build artefacts — a precondition that must survive the handoff, because the failure
mode is silent and total. I simulated both invocations against the live graph:

```
gtag=workflowsw   intra-run duplicate ids: none   clashes with existing graph: 0
gtag=workflows    intra-run duplicate ids: none   clashes with existing graph: 53
                     e.g. contr.gworkflows.001 … dep.gworkflows.001 … range.gworkflows.001
```

`bin/merge-group.py:57` derives `gtag` from the group label; `:73` suffixes it with the patch-page
initials **only in patch mode**. So:

- **`--patch --patch-page "Workflows"`** → `gtag = workflowsw` → `dep.gworkflowsw.001…034`,
  `contr.gworkflowsw.001…018`, `range.gworkflowsw.001`. **Zero collisions.** In patch mode `touched` is
  `{page.email-reminders, page.delegate-configurations}`, neither of which is in the graph, so nothing
  existing is removed. This is the correct and safe path.
- **No `--patch`** → `gtag = workflows`, and `bin/merge-group.py:92-98` first executes
  `[x for x in … if x.get('group') != 'Workflows']` across **six** collections. That deletes Run A
  wholesale: 2 pages (`page.workflows`, `page.feature-hierarchies`), 121 fields, 61 dependencies,
  34 value sets, 24 contradictions, 5 compressed ranges, 7 steps — **and `validate-graph.py` then exits
  0 over the wreckage**, exactly as `merge-group.py:60-64` documents from the measured 2026-09-01 incident.
  The 53 id clashes never even surface, because the clashing nodes were deleted a moment earlier.

`workflows/2026-09-01_kg-workflows-run-b.mjs:12-31` already states this correctly. Restating it here
because the *critique* is what gets read at merge time, and because "validate-graph.py exits 0" is not
evidence that the merge was safe.

---

## 10. UNEARNED `uiVariant` CLAIMS — NONE. ZERO OUTSTANDING DEBT ADDED.

```
uiVariant occurrences across all 16 part files: 125
  'undifferentiated' 125
  'both'             0
  'new' / 'legacy'   0
```
Both page nodes and all 46 fields are `undifferentiated`. Nobody claimed to have read two variants, so
nobody has to have earned it. The Delegate roster additionally records — and I endorse the reasoning —
that the `"2 user interfaces"` boilerplate present in ~40 corpus files was deliberately **not** turned
into a `uiVariant` claim. The three unearned `both` claims on Audit Rules remain outstanding debt from an
earlier run; **this run adds none.**

---

## Summary — what changes the graph

| # | Sev | Finding | Fix |
|---|---|---|---|
| 6a | **HIGH** | 7–8 rows of the documented 11-row table "Delegate Configuration Fields" deleted as alias duplicates, against the Workflows list-column precedent; costs the Purchase Request tab its only documented content | Re-emit as `list_*` fields from `access-and-view-payment-delegate-configurations-8ed1298f.md` (quotes already verified); dissolves `orphanCandidates[0]` |
| 9a | **HIGH (op)** | Merging without `--patch --patch-page "Workflows"` silently deletes 121 fields + 2 pages + 131 other Run A nodes, and the validator still exits 0 | Merge with `--patch`, `--patch-page "Workflows"` (`gtag workflowsw`, 0 id clashes — simulated) |
| 3a | MED | `vset.g3.unnamed.email-message-replacement-tokens-…` is not retired by anything on disk; the token catalogue lands twice | Schedule an `apply-corrections.py` delete of that id after the merge |
| 2a | MED | `specific-days` value set duplicates `range.wfb.001` and drops the documented `>` (last-day-of-month) token | Drop `synth-valuesets.json → valueSets[4]`; the range already carries it, `>` included in its notes |
| 5d | MED | Four rule-side-only controls escape the run's own `rule_` prefix; `confirm-yes-button` will make a driver wait for a dialog the reminder side never shows | Rename in place: `rule_confirm_yes_button`, `rule_next_button`, `rule_finish_button`, `rule_copy_button` |
| 1a | LOW | Five `notes` strings in quotation marks are not verbatim (unescaped `\>`, added period, two non-contiguous joins) | Truncate each to its longest contiguous span |
| 6b | LOW | Three false "never cited" / "only files cited" claims, two of them inside `verifyNotes`, which ships onto the permanent page node | Correct the two `verifyNotes` sentences |

**Clean, verified, no action:** quote fidelity (384/384), invented values (0, including the `Active`
Yes-only guard under direct pressure), value-set wiring (10/10, the rule-7 defect did not recur), page
ownership (0 source-file overlap with 617 built fields), within-page collisions (0 duplicate names, three
prefix splits correct, contradiction preserved unreconciled), the 5(c) hard rule (0 hits),
`fromRawHtmlTable` (0 false, 0 missed, measured across both candidate pools), step-id namespace
(`grpworkflows-b`, no collision with `s1`–`s7`), dependency endpoints (34/34 resolve), step rationales
(68/68 marked), `uiVariant` (0 unearned `both`).

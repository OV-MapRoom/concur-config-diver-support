# Pre-flight audit — Workflows Run B (run wf_787d91c7-9a7)

counts: {"raw": 52, "verified": 48, "survivors": 42, "refuted": 6}

## Auditor headlines
- Run B pre-flight stale-content auditor: One BLOCKER: line 710 tells every Map agent the NBSP trap is disarmed on this run — it is a verbatim port from the Approval Authority script and it is FALSE here; the NBSPs sit inside the exact nav and role-gate sentences the agent is told to grep -F. Plus a HIGH count defect (every "measured" table row count in the seeds and the inventory prompt is a pipe-LINE count, inflated 3-4x) and three HIGH critic gaps: the run's declared central risk — Email Reminders collapsing into the built Workflows > Email Notifications tab — is never checked by either critic, the AAL sibling's rewritten critic-B item 5 was not ported, and the inventory's own mandated search terms drag a built Notifications file into the Email Reminders candidate set with no ALREADY-MINED guard. 19 findings.
- --patch code-path auditor (merge-group / assemble-parts / apply-corrections / validate-graph), Workflows Run B pre-flight: THE --patch PATH ITSELF IS CLEAN — proven by execution on a disposable copy, not by reading. With group="Workflows", patch=True, patchPage="Workflows": gtag resolves to `workflowsw` (dep.gworkflowsw.001+, vset.gworkflowsw.*, contr.gworkflowsw.*, range.gworkflowsw.*), the strip touches ONLY page.email-reminders / page.delegate-configurations, Run A's 121 fields survive intact, page.workflows and page.feature-hierarchies come out BYTE-IDENTICAL to the pre-merge graph, meta.status stays IN_PROGRESS, and the documented sequence (assemble --patch-page → merge --patch → apply-corrections → validate) ends at ERROR: none / exit 0 with 25 pages / 622 fields. Re-merging the same result a second time is exactly idempotent (622/456/45/115 unchanged, zero duplicate ids). The step-id namespace is safe: assemble-parts derives prefix `grpworkflows-`, `grpworkflows-b1-…` satisfies its prefix check, does not collide with Run A's s1–s7, and I proved validate-graph's duplicate-node-id invariant DOES catch a forced collision (exit 1). The null-patchPage guard fires and leaves the graph untouched, and does not obstruct the correct invocation. Every apply-corrections target on a Workflows node — dep.gworkflows.046/.050/.060, grpworkflows-s2/s3, page.workflows tabs, both vset.gworkflows.unnamed.* note targets, field.feature-hierarchies.segment-name — survives the patch; none goes "not found". Item 5 is a non-issue. THE EXPOSURE IS ENTIRELY IN THE UNGUARDED OPERATOR STEPS WRAPPED AROUND THAT CLEAN PATH: six findings, two of them capable of silently destroying or hollowing out this run while the validator still prints "ERROR: none". Note also: `merge-group.py` REJECTS `--patch-page` (it filters `--` flags but the bare label becomes a third positional → usage + exit 1); docs/RESUME-PROMPT.md:88 has the correct form, so pass the flag to assemble-parts.py ONLY.
- Independent corpus recon + stale-passage audit for Workflows Run B (Email Reminders + Delegate Configurations): Four blockers. (1) terminology-e1e1ed99.md is seeded onto EMAIL REMINDERS but is a delegate-only file (0 hits for "reminder") — it is the run's only cross-contamination vector and it strips Delegate Configurations of its richest alias source. (2) Line 710 tells the map agent "all its core files contain ZERO NBSP" — verbatim port from AAL:712, and it is FALSE: the Email Reminders nav quote and role-gate quote both contain U+00A0 pairs. (3) Every "row" count in the script (49/37/22/21/91) is a CELL-OPENER count, ~3x the true row count; the graph's own node already records the 21-"row" token table as 4 values, so the correctness critic will report a bogus 4-vs-21 truncation. (4) Email Reminders' two tabs each carry a field literally labelled Name, Reminder Type and Editable By with DIFFERENT documented option lists — three guaranteed duplicate-field-name validator ERRORs the script never warns about. Separately: the "(Restricted)" role gate is NOT distinct (it gates 9 surfaces, and one file says it HIDES Group Configurations, which breaks the script's own dependency edge 3), and the corpus's "page appears" idiom is worthless as page-hood evidence because Email Reminders' own wizard steps use it. Recon numbers: Email Reminders 20 primary files / 40,957 B (25-file sweep includes 5 already-built foreign files), Delegate Configurations 14 primary / 31,241 B; zero overlap between the two sets CONFIRMED even on the broadest sweeps; my expected rosters are ~21 controls + ~8 buttons for Email Reminders and ~11-13 UNIQUE controls (not 25) for Delegate Configurations.
- graph-merge-impact: The merge itself is safe — simulated on a sandbox copy with bin/merge-group.py: Run A's 114 Workflows fields, 43 steps, 454 deps and 115 value sets all survive, and meta lands IN_PROGRESS / 0.8.0 / groupsRemaining=[Group 6, Group 7]. Three things will bite. (1) The Email Reminders seed at line 115 ends with a FALSE "verified" claim — "no built field cites any reminder file" — when 6 of the 25 files it tells the agent to sweep are already mined and 25 built fields cite two of them. (2) The Rules tab and the Email Reminders tab of ONE page both document Name / Reminder Type / Editable By, which is a FATAL DUPLICATE-FIELD-NAME abort in assemble-parts, and no prompt in the file warns of it. (3) A value set emitted without appliesToPage gets silently wired graph-wide by apply-corrections wire_by_name, and ten of this run's likely field names are graph-wide-unique on OTHER pages. Also: dep.g1.059 will NOT resolve (proved both ways in simulation) and the right repoint target is "Applies to Groups"; the orphaned token value set cannot auto-close because merge-group re-resolves dependencies only; and contr.gworkflows.004 still tells a config writer Email Reminders is "not yet built in this graph".

# SURVIVORS

---

## [blocker] B1 :: Line 710 falsely tells the Map agent the NBSP trap is disarmed — the NBSPs are inside the nav-path and role-gate sentences it must grep -F

**where:** /mnt/c/Users/manci/PROJECTS/concur-config-diver-support/workflows/2026-09-01_kg-workflows-run-b.mjs:710 (also duplicated as accumulated context at 705-711)

**evidence:**

```
Line 710 reads verbatim: 'Good news for THIS page: all its core files contain ZERO NBSP, so quotes taken from them are safe.' — a byte-identical port of 2026-09-01_kg-authorized-approval-limits.mjs:712, where it was true of user-administrator-fcfd570c.md / user-administration-8b167b96.md. It is FALSE for Run B. Command: python3 -c "d=open(P,'rb').read();print(d.count(b'\\xc2\\xa0'))" over the files the seeds name returns create-email-reminders-604c4a46.md=14, create-reminder-rules-b0a7fac5.md=14, access-email-reminders-96f3ca18.md=2, email-reminders-tool-8b2c8a11.md=2 (all Delegate files = 0). Locating them: access-email-reminders-96f3ca18.md line 27 is '1.  Select Administration\xa0\xa0Invoice.' and email-reminders-tool-8b2c8a11.md line 23 is 'The Email Reminders tool, located in Administration\xa0\xa0Invoice, allows a Global and Group Configuration administrator to...'. Those two files are the ONLY sources the seeds give for the nav path and the role gate.
```

**why:** Lines 702-709 build the NBSP guard, then 710 stands it down. The four affected files are exactly the Email Reminders nav file, role-gate file and both rule/reminder rosters. The NBSP sits in the 'Administration >Invoice' menu sentence — the single string a nav agent is most likely to quote — and in the role-gate sentence the Map prompt at 673-674 explicitly orders it to 'Confirm the gate'. An agent that believes 710 will grep -F an ASCII-normalised menu string, get a silent zero, and either drop a real navPathEvidence entry or (worse) emit a quote it never verified. bin/validate-graph.py then fails the build on the quote — or, if the agent 'tidies' the quote, the build passes with a nav path a Chromium driver cannot match.

**fix:** Replace line 710 with the measured truth for THIS run: 'MEASURED FOR THIS RUN, AND IT CUTS THE OTHER WAY FROM THE LAST ONE: four Email Reminders core files DO carry NBSP - create-email-reminders-604c4a46.md (14), create-reminder-rules-b0a7fac5.md (14), access-email-reminders-96f3ca18.md (2), email-reminders-tool-8b2c8a11.md (2). The two NBSPs you will actually hit are in the sentences you most need: access-email-reminders-96f3ca18.md line 27 is \"1.  Select Administration\\xa0\\xa0Invoice.\" and email-reminders-tool-8b2c8a11.md line 23 is \"...located in Administration\\xa0\\xa0Invoice...\". Extract those quote bytes with sed/awk from the file itself, never retype the menu arrow. All Delegate Configurations files are genuinely NBSP-free (measured 0).'

---

## [blocker] RB-01 :: terminology-e1e1ed99.md is seeded onto EMAIL REMINDERS but is a delegate-only file — the run's single cross-contamination vector, and it robs Delegate Configurations of its best alias source

**where:** /mnt/c/Users/manci/PROJECTS/concur-config-diver-support/workflows/2026-09-01_kg-workflows-run-b.mjs line 115 (Email Reminders `seeds`, the '### EXTRA SEEDS the recon completeness critic named (finding 6)' clause); the correct home is line 121 (Delegate Configurations `seeds`, '### EXTRA SEED ... overview-8b2ba917.md')

**evidence:**

```
Script line 115: "### EXTRA SEEDS the recon completeness critic named (finding 6): pre-defined-rules-220a1fe7.md, overview-8b2c769e.md, best-practices-when-localizing-subject-and-email-message-fields-48515f40.md, terminology-e1e1ed99.md".

  $ grep -ciF reminder concur-invoice-professional-edition-admin-guides/terminology-e1e1ed99.md
  0

The file's entire body is delegate terminology: "Invoice Delegates: An employee who is granted the right to act on behalf of another employee...", "Purchase Request Delegates", "Temporary Approval Delegation", "Delegate Restriction to Group", "Delegated Approver: An employee acting as a delegate for an Approver or AP User."

The recon critic filed it correctly. output/reports/2026-08-31_workflows-recon/critic-completeness.md:299, under the heading "**Delegate Configurations** (roster: 9 seeds):" —
  "- `<admin>/terminology-e1e1ed99.md` (2,026 B) — a **six-entry delegate terminology catalog**"
The Email Reminders bullet list in that same section (§3.5) names only pre-defined-rules, overview-8b2c769e and best-practices-when-localizing. The author merged both bullet lists into the Email Reminders seed.
```

**why:** The whole safety architecture of this run rests on one claim, stated twice (line 44 and line 121): the two pages "share ZERO source files with each other (verified: 0 overlap), so neither can contaminate the other." I re-verified that claim and it holds — `comm -12` over `grep -rliF reminder` (37 files) and `grep -rliF delegate` (34 files) across all four corpus dirs returns EMPTY. This seed is the one thing that breaks it. It hands the Email Reminders procedure/tables/crosscut lenses a file whose six bullets are all field-shaped delegate controls, and two of them (Delegate Restriction to Group, Temporary Approval Delegation) map onto real Delegate Configurations controls the recon critic explicitly flagged as "controls the roster names in prose but seeds no source for". The likely outcome is delegate permission fields emitted on page.email-reminders — mis-assignment to the wrong page, which the script itself calls "the one failure mode grep cannot catch". Simultaneously the Delegate Configurations seed's closing instruction "### ALIASES to record: Delegate Configurations tool, Delegate Configuration, Payment Delegate Configurations, Invoice delegates" is issued with its single best alias source withheld.

**fix:** Cut `, terminology-e1e1ed99.md` from line 115. In line 121, change "### EXTRA SEED the recon completeness critic named (finding 6): overview-8b2ba917.md." to: "### EXTRA SEEDS the recon completeness critic named (finding 6): overview-8b2ba917.md (1,223 B, the permission-subset model that is the page's whole semantics) and terminology-e1e1ed99.md (2,026 B, a six-entry delegate terminology catalog: Invoice Delegates, Invoice Request Delegates, Purchase Request Delegates, Temporary Approval Delegation, Delegate Restriction to Group, Delegated Approver — three are field-shaped and it is the page's richest alias source). NOTE terminology-e1e1ed99.md contains ZERO occurrences of 'reminder' and belongs to THIS page only."

---

## [blocker] RB-02 :: 'Good news for THIS page: all its core files contain ZERO NBSP' is a verbatim unchanged port from the AAL script and is FALSE for Email Reminders — its nav quote and its role-gate quote both contain NBSP pairs

**where:** /mnt/c/Users/manci/PROJECTS/concur-config-diver-support/workflows/2026-09-01_kg-workflows-run-b.mjs line 710 (map:navigation prompt). Identical text at /mnt/c/Users/manci/PROJECTS/concur-config-diver-support/workflows/2026-09-01_kg-authorized-approval-limits.mjs line 712.

**evidence:**

```
  $ grep -n 'Good news for THIS page' workflows/*.mjs
  2026-09-01_kg-authorized-approval-limits.mjs:712:    'Good news for THIS page: all its core files contain ZERO NBSP, so quotes taken from them are safe.',
  2026-09-01_kg-workflows-run-b.mjs:710:    'Good news for THIS page: all its core files contain ZERO NBSP, so quotes taken from them are safe.',

True for AAL — its primary file is clean:
  $ grep -c $'\xc2\xa0' concur-invoice-professional-edition-admin-guides/user-administrator-fcfd570c.md
  0

False for Run B. FOUR of the Email Reminders core files carry NBSP, and they are exactly the sentences the map and extract agents must quote:
  $ grep 'located in' concur-invoice-professional-edition-admin-guides/email-reminders-tool-8b2c8a11.md | hexdump -C
  00000030  69 6f 6e c2 a0 c2 a0 49  6e 76 6f 69 63 65 2c 20  |ion....Invoice, |
  (line 23 — the ROLE-GATE sentence: "located in Administration<NBSP><NBSP>Invoice, allows a Global and Group Configuration administrator to create, edit, and delete email reminders by group.")

  $ grep 'Select Administration' concur-invoice-professional-edition-admin-guides/access-email-reminders-96f3ca18.md | hexdump -C
  00000010  69 73 74 72 61 74 69 6f  6e c2 a0 c2 a0 49 6e 76  |istration....Inv|
  (line 27 — step 1 of THE NAV PATH: "Select Administration<NBSP><NBSP>Invoice." — note there is NO '>' glyph at all)

  create-email-reminders-604c4a46.md line 257 and create-reminder-rules-b0a7fac5.md line 83 both carry NBSP-SPACE-NBSP inside the 'Editable By' description ("Global Group<NBSP> <NBSP>United States").

Delegate Configurations IS clean — all 34 files in the `delegate` sweep return 0 NBSP except create-a-new-workflow-554e86aa.md and overview-8b281639.md, neither of which is a Delegate primary.
```

**why:** This sentence sits immediately after eight lines of correct, hard-won NBSP tooling warnings, and it cancels them. It tells the agent affirmatively that it may stop checking. The two quotes it exempts are the two most load-bearing quotes on the page: the navPathEvidence quote and the roleGates quote. A retyped ASCII-space version of either fails `grep -F` at emit time; worse, bin/validate-graph.py's `norm()` folds NBSP to space (line 32: `s = s.replace(' ', ' ')`), so a wrong-byte quote still passes the deterministic validator and lands in a permanent graph as a quote that does not exist in the file. Every prior run's NBSP cost was paid at grep time; this one would be paid silently after merge. Note also the separator drift this run must record: access-and-view-payment-delegate-configurations-8ed1298f.md uses plain ASCII `Administration > Invoice` (hexdump: `20 3e 20`), while access-email-reminders-96f3ca18.md uses `<NBSP><NBSP>` with no arrow — two different byte sequences for the same menu, one per page.

**fix:** Replace line 710-711 with: 'NBSP MEASURED FOR THIS RUN, AND IT SPLITS THE TWO PAGES. Delegate Configurations is CLEAN - all 14 primary files return 0. EMAIL REMINDERS IS NOT: email-reminders-tool-8b2c8a11.md:23 (the ROLE GATE sentence), access-email-reminders-96f3ca18.md:27 (NAV PATH step 1), create-email-reminders-604c4a46.md:257 and create-reminder-rules-b0a7fac5.md:83 (the Editable By description) each contain U+00A0. The Email Reminders menu string is "Administration<NBSP><NBSP>Invoice" with NO ">" glyph at all, while the Delegate access topic writes plain ASCII "Administration > Invoice". Extract those quote bytes with sed/python from the file itself, never retype them, and never assume a menu arrow. bin/validate-graph.py FOLDS NBSP to space, so a wrong-byte quote here passes validation and lands permanently wrong.',

---

## [blocker] RB-03 :: Every table count in the script (49 / 37 / 22 / 21 / 91) is a CELL-OPENER count, not a row count — the graph's own node already records the '21-row' token table as 4 values

**where:** /mnt/c/Users/manci/PROJECTS/concur-config-diver-support/workflows/2026-09-01_kg-workflows-run-b.mjs lines 115 and 121 (both `seeds`), lines 772-786 (map:inventory prompt), and the downstream consumers at line 916 (Lens B 'ENUMERATE EVERY ROW'), the synth:valueSets 'COMPLETENESS' block, and critic:completeness items 4-5 ('Count the rows yourself. State the exact count the graph should carry' / 'Report every count mismatch as N-in-graph vs M-in-source').

**evidence:**

```
SAP's crawled markdown puts every table CELL on its own line, so `grep -cP '^\s*\|'` returns 1 separator + 3 lines per 2-column row (open, mid, close), or 1 + 4 per 3-column row. Derivation verified exactly against manual reads:

  file                                              cell-openers   TRUE data rows
  create-email-reminders-604c4a46.md                     49            15  (Name, Reminder Type, Reminder Rule, Frequency, Number of Days, Specific days, Display as From, Email Subject, Email Message, Copy to Approver, Copy to Employee, Copy to Email Address, Editable By, Applies to, Active)
  access-and-view-payment-delegate-configurations-8ed1298f.md 37       11
  create-a-new-invoice-delegate-configuration-fcf42662.md     22        6
  email-message-replacement-tokens-c9cc4af4.md                21        4  (%1% %2% %3% %4%)
  email-reminders-8b2caa99.md                                 91       29  (28 dated revision entries)
  delegate-configuration-8b2bd26d.md                          91       29  (26 dated revision entries)

  $ python3 -c "import re;t=open('email-message-replacement-tokens-c9cc4af4.md').read();n=len(re.findall(r'^\s*\|',t,re.M));print(n,(n-1)//4-1)"
  21 4

And the graph ALREADY KNOWS the true answer — the Group 3 orphan the script tells this run to adopt:
  vset.g3.unnamed.email-message-replacement-tokens-the-4-row-variable-label-na
    knownGap: True   values(4): ['%1%', '%2%', '%3%', '%4%']
Its node id literally contains "the-4-row".

Script line 115: "email-message-replacement-tokens-c9cc4af4.md (2,796 B, 21 rows on the CORRECT anchor, 6 on the naive one). It belongs HERE." Script line 785-786: "ONE CATALOGUE IS A GENUINE PRIZE: email-message-replacement-tokens-c9cc4af4.md (21 rows on the correct anchor, 6 on the naive one) ... Enumerate it in full."
```

**why:** The script is right that the naive `^| ` anchor loses the tables, and right to force `^\s*\|` — but it then hands the numbers downstream as if they were rows. Concretely: the value-set agent is told to enumerate a 21-row catalog that has 4 rows, and the correctness critic is told to 'Report every count mismatch as N-in-graph vs M-in-source'. It will report 4-in-graph vs 21-in-source and demand 17 more tokens that do not exist — driving straight into the project's declared highest-severity defect class ('two invented Yes values'). The same error inflates the field roster expectation: an extractor told create-email-reminders has 49 rows will believe it is 34 fields short of a 15-row table. It also makes the script's '~25 fields each' estimate look corroborated by the table census when it is not.

**fix:** Add to the map:inventory prompt right after line 777, and mirror the numbers into both seeds: 'CELL-OPENERS ARE NOT ROWS - CONVERT BEFORE YOU REPORT. SAP writes every table CELL on its own line, so grep -cP "^\\s*\\|" returns 1 + (columns+1) x rows. For a 2-column table TRUE_ROWS = (count-1)/3 - 1; for 3 columns TRUE_ROWS = (count-1)/4 - 1. MEASURED FOR THIS RUN: create-email-reminders-604c4a46.md 49 -> 15 field rows; access-and-view-payment-delegate-configurations-8ed1298f.md 37 -> 11 columns; create-a-new-invoice-delegate-configuration-fcf42662.md 22 -> 6 field rows; email-message-replacement-tokens-c9cc4af4.md 21 -> FOUR tokens (%1% %2% %3% %4%) - the graph node vset.g3.unnamed.email-message-replacement-tokens-the-4-row-variable-label-na already carries exactly those four, so the correct action is to RE-HOME that 4-value set, never to enumerate 21; email-reminders-8b2caa99.md and delegate-configuration-8b2bd26d.md 91 -> 29 revision-history entries each. Report approxRows as TRUE ROWS and put the raw cell-opener count in notes.'

---

## [blocker] RB-04 :: Email Reminders' two tabs each own a field labelled Name, Reminder Type and Editable By with DIFFERENT documented option lists — three guaranteed duplicate-field-name validator ERRORs, unwarned anywhere in the script

**where:** Unwarned. Should be in /mnt/c/Users/manci/PROJECTS/concur-config-diver-support/workflows/2026-09-01_kg-workflows-run-b.mjs line 115 (Email Reminders seeds) and in the Repair '=== NAME HYGIENE ===' block at lines 1198-1202. Enforcement site: /mnt/c/Users/manci/PROJECTS/concur-config-diver-support/bin/validate-graph.py lines 100-107.

**evidence:**

```
validate-graph.py:100-107 —
    per_page = defaultdict(list)
    for f in fields: per_page[f['pageId']].append(f['name'].strip().lower())
    for pid, names in per_page.items():
        for nm, c in Counter(names).items():
            if c > 1: errors.append(('duplicate-field-name', pid, '%s x%d' % (nm, c)))
This is an ERROR, not a warning, and it is scoped PER PAGE. Email Reminders is ONE page with TWO tabs, so both tabs' fields land in the same bucket.

Email Reminders tab roster, create-email-reminders-604c4a46.md: rows 'Name', 'Reminder Type', 'Editable By'.
Rules tab roster, create-reminder-rules-b0a7fac5.md: rows 'Name', 'Reminder Type', 'Editable By' — its ONLY three rows.

And they are NOT the same control. The Reminder Type option lists differ verbatim, in different files:
  $ grep -clF 'Approval Request - Vendor Request' concur-invoice-professional-edition-admin-guides/*.md
  create-email-reminders-604c4a46.md          (only hit corpus-wide)
  $ grep -clF 'Approval Request - Payment Vendor' concur-invoice-professional-edition-admin-guides/*.md
  create-reminder-rules-b0a7fac5.md           (only hit corpus-wide)
  $ grep -oF 'Approval Request - Payment Request: When a cash advance request has a status of Pending Approval.' create-email-reminders-604c4a46.md   -> 1 hit
  $ grep -oF 'Approval Request - Payment Request: When an invoice has a status of Pending Approval.' create-reminder-rules-b0a7fac5.md              -> 1 hit
The descriptions differ too ('Type a unique name for the email reminder configuration.' vs 'Type a name for the email reminder configuration.'; 'edit or delete this reminder' vs 'edit or delete this rule').
```

**why:** This is the most likely mechanical failure of the run. Both roster files are must-reads, both are read by the procedure lens, and the default machine-name derivation from the label 'Name' produces `name` twice on page.email-reminders — an immediate ERROR that fails the build after the merge has already written. The script's only defence is the generic 'If a merge would collide, rename one and say so in notes' (line 1200), which frames collision as a de-duplication artefact. Here it is a structural property of the page, and the WRONG fix (merging the two into one field) would destroy the run's best contradiction: the two Reminder Type lists genuinely disagree about both a value name (Vendor Request vs Payment Vendor) and a definition (a 'cash advance request' — almost certainly an Expense copy-paste error — vs 'an invoice'). Delegate Configurations does not have this problem: its two tabs (Invoice, Purchase Request) are documented as sharing one field set.

**fix:** Append to line 115: '### ⚠ THREE GUARANTEED NAME COLLISIONS WITHIN THIS ONE PAGE, AND duplicate-field-name IS A HARD VALIDATOR ERROR (bin/validate-graph.py:100-107, scoped per PAGE not per tab). The Rules tab roster create-reminder-rules-b0a7fac5.md has exactly three rows - Name, Reminder Type, Editable By - and ALL THREE labels also appear on the Email Reminders tab roster create-email-reminders-604c4a46.md. They are DIFFERENT CONTROLS: prefix the rule-side names (rule_name / rule_reminder_type / rule_editable_by) and keep the reminder-side bare, and put the tab in notes. DO NOT MERGE THEM - their Reminder Type option lists genuinely disagree ("Approval Request - Vendor Request" in create-email-reminders vs "Approval Request - Payment Vendor" in create-reminder-rules, each the only corpus hit for its string; and "When a cash advance request has a status of Pending Approval" vs "When an invoice has a status of Pending Approval"). That disagreement is a two-file grounded CONTRADICTION and a two-context value set, not a defect to reconcile.'

---

## [blocker] F1 :: The Email Reminders seed asserts a verified fact that is false: 6 of its 25 sweep files are already mined, and 25 built fields cite two of them

**where:** /mnt/c/Users/manci/PROJECTS/concur-config-diver-support/workflows/2026-09-01_kg-workflows-run-b.mjs line 115 (end of the email-reminders `seeds` string)

**evidence:**

```
Offending text, verbatim, final clause of line 115: "### ADJACENT PAGE: group-level reminder assignment touches the built Group Configurations page. Verified: no built field cites any reminder file, so there is no duplication - but emit the cross-page dependency."  The same line orders the broad sweep: "~25 files by a broad sweep (the recon counted 17; treat 17 as a FLOOR, my own grep -rli \"email reminder\" over both guide dirs returns 25)".  Measured: `grep -rli "email reminder" $CORPUS` returns exactly 25 files; cross-referencing every sourceFile in output/kg-invoice-config.json gives 6 ALREADY MINED — add-groups-ec5d8d8b.md -> 14 built fields on Group Configurations + 7 built dependencies; work-with-the-steps-page-fab249d1.md -> 11 built fields on Workflows + 2 deps + 2 value sets + 2 contradiction readings; about-vendor-approval-workflow-step-and-timeout-b3d1bd2c.md -> both readings of contr.gworkflows.013; workflow-667cee21.md -> dep.gworkflows.050; overview-8b2edfd0.md -> dep.g5g5.036; email-message-replacement-tokens-c9cc4af4.md -> vset.g3.unnamed.email-message-replacement-tokens-... Totals: 25 sweep files, 6 mined, 19 untouched, 25 built fields citing them.
```

**why:** This is exactly the failure class the frame names: a confident false constant injected into the extraction prompts. work-with-the-steps-page-fab249d1.md is the source of eleven built Workflows step fields (step_name, step_role, step_initial_status, step_approval_actions, btn_new_step, btn_save_step, step_approver_editable_by, step_deletable_by, step_email_employee_when_step_is_complete, step_order_column, step_can_exit_with_blocking_exceptions) and add-groups-ec5d8d8b.md is the source of fourteen built Group Configurations fields. A lens told duplication is impossible will re-emit those controls onto page.email-reminders — a silent re-home of 25 built fields onto the wrong page, which nothing catches: duplicate-field-name is scoped per page and the new page is empty.

**fix:** Replace the final clause of line 115 with: "### ADJACENT PAGE: group-level reminder assignment touches the built Group Configurations page — emit the cross-page dependency. ⚠ SIX OF THE 25 SWEEP FILES ARE ALREADY MINED AND YOU MUST NOT RE-EMIT THEIR FIELDS: work-with-the-steps-page-fab249d1.md (11 built Workflows step fields, 2 deps, 2 value sets, 2 contradiction readings), add-groups-ec5d8d8b.md (14 built Group Configurations fields, 7 deps), about-vendor-approval-workflow-step-and-timeout-b3d1bd2c.md (contr.gworkflows.013), workflow-667cee21.md (dep.gworkflows.050), overview-8b2edfd0.md (dep.g5g5.036), email-message-replacement-tokens-c9cc4af4.md (the orphan value set this run is meant to close). Only the remaining 19 are unmined. These six are CORROBORATION and DEPENDENCY sources only — grep the graph for the file path before you emit any field from one."

---

## [high] B2 :: Every "measured" table row count in the seeds and the inventory prompt is a pipe-LINE count, not a row count — inflated 3-4x

**where:** 2026-09-01_kg-workflows-run-b.mjs:115 and :121 (seeds), :772-777 (indented-table trap), :778-781 (revision-history trap), :782-785 (the "genuine prize" catalogue)

**evidence:**

```
Line 774-776: 'create-email-reminders-604c4a46.md 0 naive / 49 correct; access-and-view-payment-delegate-configurations-8ed1298f.md 0 / 37; create-a-new-invoice-delegate-configuration-fcf42662.md 0 / 22.' Line 782-783: 'email-message-replacement-tokens-c9cc4af4.md (21 rows on the correct anchor, 6 on the naive one)'. Lines 779-780 call both revision histories '91 rows'. These are grep -cP '^\\s*\\|' LINE counts. SAP writes each cell on its own line, so an N-column row occupies N+1 pipe-anchored lines. Measured with python3 (pipeLines, tables, cols -> rows): email-message-replacement-tokens 21/1/3col -> 4 ROWS; create-email-reminders 49/1/2col -> 15 ROWS; access-and-view-payment-delegate 37/1/2col -> 11 ROWS; create-a-new-invoice-delegate 22/1/2col -> 6 ROWS; create-reminder-rules 13/1/2col -> 3 ROWS; both revision histories 91/1/2col -> 29 ROWS. Confirmed by eye: sed -n '30,120p' create-email-reminders-604c4a46.md shows a 2-column 'Field | Description' table beginning Name, Reminder Type, Reminder Rule, Frequency, Number of Days. Independently confirmed for the token file by the existing graph: vset.g3.unnamed.email-message-replacement-tokens-... holds exactly 4 values and its own context string says 'the 4-row Variable | Label Name | Description table'.
```

**why:** Two of the project's named worst defect classes fire off these numbers. (1) The completeness critic's item 5 (line 1608-1609) says 'count the source rows and compare. Report every count mismatch as N-in-graph vs M-in-source' — briefed at 49 and finding 15 real fields, it will file a phantom 34-row truncation, the most expensive class in the project, against a roster that is actually complete. (2) The seeds order 'Enumerate it in full' on a '21-row' catalogue that has 4 rows; an agent chasing 17 rows that do not exist is precisely how invented values enter, which PREAMBLE line 203-206 calls the highest-severity defect there is. The revision-history figures being 3x off also inflates 'the LARGEST table in each page set' framing.

**fix:** Restate all seven figures as LINE counts and give the row counts alongside. In the seeds at 115: '...returns ZERO for grep -c "^| " and FORTY-NINE PIPE-ANCHORED LINES for grep -cP "^\\s*\\|" — which is FIFTEEN DATA ROWS, because SAP writes each cell on its own line and a 2-column row occupies 3 pipe lines.' At 774-776: 'create-email-reminders-604c4a46.md 0 naive / 49 pipe LINES = 15 rows; access-and-view-payment-delegate-configurations-8ed1298f.md 0 / 37 lines = 11 rows; create-a-new-invoice-delegate-configuration-fcf42662.md 0 / 22 lines = 6 rows; create-reminder-rules-b0a7fac5.md 0 / 13 lines = 3 rows.' At 779-780: '91 pipe lines = 29 revision rows each'. At 782-783: 'email-message-replacement-tokens-c9cc4af4.md — 21 pipe lines, which is FOUR data rows (%1% Logon URL, %2% User Name, %3% Number of Records, %4% List of Records) in a 3-column table. FOUR. The graph ALREADY holds all four in vset.g3.unnamed.email-message-replacement-tokens-...; your job is to give them an OWNER on this page, not to find more rows. There are no more rows.' And add one line to the shared PREAMBLE text-traps block: 'ROW COUNT != PIPE-LINE COUNT in this corpus. An N-column row occupies N+1 pipe-anchored lines. Always divide before you call something a truncation.'

---

## [high] B3 :: Critic B item 5 is the unported Run A text — the AAL sibling rewrote exactly this item to catch cross-page control duplication and Run B kept the old one

**where:** 2026-09-01_kg-workflows-run-b.mjs:1658-1659; compare 2026-09-01_kg-authorized-approval-limits.mjs:1741-1758

**evidence:**

```
Run B lines 1658-1659 read: ' 5. DUPLICATE NAMES. Within each page, and across the two pages, and against the existing graph. A duplicate name within one page is a hard validator ERROR.' — byte-identical to 2026-08-31_kg-workflows-run-a.mjs:1533-1534 (confirmed: diff run-a vs run-b produces no hunk in that range). The AAL sibling replaced it with 18 lines opening ' 5. DUPLICATE NAMES AND DUPLICATE CONTROLS - AND THESE ARE NOT THE SAME CHECK. A duplicate NAME within one page is a hard validator ERROR and the tooling catches it. A duplicated CONTROL across two pages is INVISIBLE to the validator, and it is the exact defect this run exists to avoid.' plus a reverse check and a mechanical hard rule ('no field on this page may cite admin-guides/authorized-approver-list-a9522ec8.md').
```

**why:** The collapse this run fears does NOT produce a name collision — it produces the same control under two different machine names on two pages, which a name-level check cannot see. And the collision is already loaded: 'Email Subject' occurs in BOTH add-an-email-notification-c237a2de.md (already built as field.workflows.email_subject) and create-email-reminders-604c4a46.md (this run's roster). The script's own header at line 47-52 calls this 'THE EASIEST COLLAPSE ERROR IN THIS DOMAIN'; refuter 2 owns it at 1103-1116; and then the LAST GATE BEFORE MERGE is handed a name-equality check. Both directions are unguarded: a Reminders control filed as if it were a Notification, and a real Reminders control dropped because its label looked like a built duplicate.

**fix:** Replace 1658-1659 with: ' 5. DUPLICATE NAMES AND DUPLICATE CONTROLS - NOT THE SAME CHECK. A duplicate NAME within one page is a hard validator ERROR and the tooling catches it. A duplicated CONTROL across two pages is INVISIBLE to bin/validate-graph.py and it is the exact defect this run exists to avoid. Check Email Reminders field by field against the built Workflows Email Notifications tab, whose 17 fields include email_subject, email_body, email_notification_name, email_notifications_field, email_notification_display_as_from, email_notification_overwrite_all_languages, email_notification_use_primary_recipient_email. "Email Subject" is documented on BOTH surfaces (grep -rl "Email Subject" returns add-an-email-notification-c237a2de.md AND create-email-reminders-604c4a46.md) - so for every such field state whether this page presents its OWN control or the record is the same value written twice, and whether the roster SAID so in notes naming the sibling field id. HARD RULE, mechanically checkable, run it and report any hit as severe: no field on page Email Reminders may cite add-an-email-notification-c237a2de.md, modify-an-email-notification-a6e5f4ba.md or select-an-email-notification-in-the-workflows-tab-663bb8ac.md as its sourceFile - those three are already mined by Workflows. And no field on page Delegate Configurations may cite delegate-self-approval-1b627285.md; the control it describes is already field.workflows.allow_delegated_approvers_to_approve_own_requests, whose notes already read "Corroborated by delegate-self-approval-1b627285.md." THEN CHECK THE REVERSE, which is just as bad: was a real Email Reminders control dropped because its label looked like a Notifications duplicate?'

---

## [high] B4 :: The completeness critic has no boundary check and no expected-count calibration — its nine items are byte-identical to Run A

**where:** 2026-09-01_kg-workflows-run-b.mjs:1589-1630 (items 1-9); compare 2026-09-01_kg-authorized-approval-limits.mjs:1667-1702

**evidence:**

```
diff 2026-08-31_kg-workflows-run-a.mjs 2026-09-01_kg-workflows-run-b.mjs produces NO hunk anywhere in 1589-1630 — the entire completeness critic is unchanged from the Workflows/Feature-Hierarchies run. Item 3 (1602-1605) orders a raw <table> sweep on two page sets the script itself measures at zero (line 769: 'MEASURED SHAPE OF BOTH PAGES: ZERO raw <table> and ZERO <tr> anywhere in either set'). Item 8 (1616-1619) hunts new-experience/legacy twins with no baseline. The AAL sibling added measured baselines to both of those items and added a whole new item 8b, 'THE COUNT ITSELF IS A FINDING', naming the recon's expected roster size and what to look for if the run came back high or low.
```

**why:** This is the last gate before a permanent merge and it is aimed at the previous run's page. Item 3 will burn effort proving a zero the script already knows; item 8 has no calibration; and nothing anywhere asks the completeness critic the one question that matters here — did the build lose Email Reminders content into the built Notifications tab, or vice versa? The seeds estimate ~25 fields per page (lines 115, 121) and no critic is ever told that number, so a run that returns 6 fields or 60 passes unremarked.

**fix:** Amend item 3 (1603) to: '...related to these two pages. NOTE THE MEASURED BASELINE: both page sets return ZERO for grep -c "<table" and ZERO for grep -c "<tr", so a zero here is the expected answer and the zero IS the finding. Corpus-wide only 31 admin-guides files and 1 tools-guides file carry raw <table>. For each hit outside the baseline, decide: settings table or illustrative example.' Amend item 8 (1617) to add: 'The expected answer here is a measured zero - grep -rli "email reminder" over tools-guides returns ZERO files and "delegate" returns FIVE. Do not let a thin tools-guides corpus become a fourth unearned "both" claim.' And ADD a new item 9b: ' 9b. THE BOUNDARY, AND IT IS THE HIGHEST-VALUE THING YOU CAN CHECK ON THIS RUN. Email Reminders (built here) and the Workflows > Email Notifications tab (built in Run A, 17 fields) are two surfaces that both email approvers. Read the built Workflows fields out of the graph with python3 and answer BOTH directions with commands: (a) did anything documented as a REMINDER get lost because it looked like a notification and was dropped? (b) did anything documented as a NOTIFICATION get emitted onto Email Reminders? The mechanical test is sourceFile: add-an-email-notification-c237a2de.md, modify-an-email-notification-a6e5f4ba.md and select-an-email-notification-in-the-workflows-tab-663bb8ac.md are Workflows files and must not appear in the Email Reminders roster; conversely no Run A Workflows field may have moved. Also state the roster COUNT as a finding: the seeds estimated ~25 fields per page from a ~37,000 B and a ~33,000 B file set. If a page returned six, find what got lost; if it returned sixty, find what got over-emitted.'

---

## [high] B5 :: The inventory prompt's own mandated search terms pull a built Workflows Email Notifications file into the Email Reminders candidate set, with no ALREADY-MINED guard

**where:** 2026-09-01_kg-workflows-run-b.mjs:757-765 (mandated search terms) and 737-800 (the whole inventory prompt); compare 2026-09-01_kg-authorized-approval-limits.mjs:781-785

**evidence:**

```
Line 760 orders the mapper to cover 'email subject, email message, replacement token, variable' and line 764 orders 'notification' for Delegate Configurations. Sweeping those terms over both guide dirs with python3: 'email subject' returns 10 files INCLUDING add-an-email-notification-c237a2de.md — which is the sourceFile of five already-built page.workflows fields (email_subject, email_body, email_notification_source_edit_button, email_notification_use_primary_recipient_email, email_notif_find_workflow_emails_where). 'notification' pulls delegates-email-notification-7c866769.md into the Delegate set. The AAL sibling carried a paragraph Run B does not: 'BOUNDARY DUTY OF THE INVENTORY, and it is the most valuable thing you do here: several strong hits for these terms are files the built WORKFLOWS page ALREADY CONSUMED... List them in alsoRelevant with an explicit ALREADY-MINED-BY-WORKFLOWS flag, NEVER in mustRead.' Run B's inventory prompt contains no such instruction; it says only (787) 'A file may legitimately appear under more than one page.'
```

**why:** The collapse begins one phase earlier than the run's defences are placed. ALREADY_BUILT (600-610) warns about the boundary and refuter 2 item 6 (1103-1116) polices it, but if the inventory puts add-an-email-notification-c237a2de.md in mustRead for Email Reminders, an extractor reads it in full and emits its controls, and the run is then relying on both refuters agreeing to drop them (see finding B6 — they need to be unanimous). A must-read file is also checked for citation downstream, so the mapper's mistake actively pressures the extractors to cite it.

**fix:** Insert after line 785, before 'A file may legitimately appear under more than one page.': 'BOUNDARY DUTY OF THIS INVENTORY, and it is the most valuable thing you do here. Several strong hits for the terms above are files the built WORKFLOWS page ALREADY CONSUMED. For Email Reminders: add-an-email-notification-c237a2de.md, modify-an-email-notification-a6e5f4ba.md, select-an-email-notification-in-the-workflows-tab-663bb8ac.md (these are the Workflows Email NOTIFICATIONS tab - a different surface; note that grep -rl "Email Subject" returns one of them AND create-email-reminders-604c4a46.md, which is exactly the collision). For Delegate Configurations: delegate-self-approval-1b627285.md (its control is already field.workflows.allow_delegated_approvers_to_approve_own_requests) and delegates-email-notification-7c866769.md (1,140 B, END-USER routing behaviour describing how approval mail reaches temporary vs permanent delegates - not an admin control on any page). Check each candidate against the graph at ' + KG + ' with python3. List every already-mined file in alsoRelevant with an explicit ALREADY-MINED-BY-WORKFLOWS flag, NEVER in mustRead. They are boundary evidence, not field sources.'

---

## [high] F1 :: A wrong or missing --journal silently strips navPath, tabs, roleGates, aliases and documentedBasis from BOTH new pages, and nothing in the toolchain catches it

**where:** bin/assemble-parts.py:82 (nav_from_journal early return), :160-161 (no journal validation in main), :185, :192-195, :201-203 (every nav-derived key defaults to empty), :499-503 (FATAL list has no nav entry); bin/merge-group.py:106-132; bin/validate-graph.py (no navPath/tabs/roleGates invariant anywhere)

**evidence:**

```
assemble-parts.py:82 `if not path or not os.path.isfile(path): return {}` — then :185 `'navPathEvidence': n.get('navPathEvidence') or []`, :201 `'tabs': n.get('tabs') or []`, :194 `'roleGates': n.get('roleGates') or []`.

Run on a disposable copy:
  $ python3 bin/assemble-parts.py parts/ out-nojournal.json --journal parts/DOES-NOT-EXIST.jsonl --group "Workflows" --patch-page "Workflows"
  page Delegate Configurations 2 fields | coverage good | basis ?  | dropped 0
  page Email Reminders         3 fields | coverage good | basis ?  | dropped 0
  quotes verbatim: 5 ok / 0 bad
  EXIT=0
  -> delegate-configurations navPathEvidence: [] | tabs: [] | basis: '' | roleGates: []
  -> email-reminders          navPathEvidence: [] | tabs: [] | basis: '' | roleGates: []
  $ BUILD_DATE=2026-09-01 python3 bin/merge-group.py out-nojournal.json "Workflows" --patch
  -> page.email-reminders navPath= [] | quote= '' | tabs key present: False
  -> page.delegate-configurations navPath= [] | quote= '' | tabs key present: False
  $ python3 bin/validate-graph.py ; echo $?
  ERROR: none
  0
  $ grep -n "navPath\|tabs\|roleGates" bin/validate-graph.py   ->  (no matches)
The ONLY visible signal is `basis ?` in one summary line, which also prints legitimately for a page whose documentedBasis is genuinely empty.
```

**why:** This run's entire thesis rides on the journal. The Email Reminders page-hood argument IS its distinct role gate ("Invoice Configuration administrator (Restricted)") — a roleGates value. The run's headline toolchain win is the three-link tabs chain finally being live end-to-end (2 tabs on each page). The Delegate Configurations open identity question is answered in identityNotes. The Email Reminders middle-nav discriminator ("Invoice Processing Admin") is a navPath. ALL FIVE are journal-only. A mistyped or unavailable journal path produces two anonymous, tab-less, gate-less page nodes, merges them, and passes validate-graph at exit 0 — the exact silent-loss failure class this project has been bitten by three builds running, and the one thing the operator's own runbook (docs/RESUME-PROMPT.md:78) warns about but no code enforces.

**fix:** In bin/assemble-parts.py main(), replace line 161 `nav = nav_from_journal(journal)` with:

    if not journal or not os.path.isfile(journal):
        sys.exit('--journal is REQUIRED and must exist: navPathEvidence, tabs, roleGates, aliases,\n'
                 'identityNotes and documentedBasis are recovered ONLY from it. Without it every page\n'
                 'merges anonymous and validate-graph.py has no invariant that notices. Got: %r' % journal)
    nav = nav_from_journal(journal)

and immediately after the roster loop (after line 204) add a FATAL problem for any roster with no nav record:

    for p in pages:
        if not p['navPathEvidence']:
            problems.append(('NAV-EVIDENCE-MISSING', p['id'], 'no navPathEvidence recovered from the journal'))

then add 'NAV-EVIDENCE-MISSING' to the FATAL tuple at :499.

---

## [high] F2 :: merge-group.py guards --patch-without-patchPage but leaves the likelier inverse — forgetting --patch — completely unguarded; it deletes all of Run A and validate-graph still exits 0

**where:** bin/merge-group.py:67-71 (the guard that exists) vs :91-98 (the unguarded non-patch strip); bin/validate-graph.py:51-245 (no cross-merge loss invariant)

**evidence:**

```
Guard present at :67 `if patch and not ptag: sys.exit(...)`. Nothing analogous protects :91-98 `n['configPages'] = [p for p in n['configPages'] if p.get('group') != group]` etc.

Measured on a disposable copy with the SAME Run B result, only the flag dropped:
  $ BUILD_DATE=2026-09-01 python3 bin/merge-group.py out-runb.json "Workflows"     # no --patch
  merged Workflows -> {'configPages': 23, 'configFields': 501, 'configDependencies': 395,
                       'configSteps': 38, 'configValueSets': 81, 'configContradictions': 42,
                       'configCompressedRanges': 12}
  page.workflows/feature-hierarchies fields left: 0
  page.workflows still present: False
  $ python3 bin/validate-graph.py ; echo $?
  ERROR: none
  0
Delta vs the correct --patch run: 121 fields, 2 pages, 7 steps, 61 dependencies, 34 value sets, 24 contradictions and 5 compressed ranges destroyed, silently, at exit 0.
(A related, milder variant is real too: a stray `roster-workflows.json` left in the parts dir makes `touched` include page.workflows and wipes its 114 fields even WITH --patch — that one at least surfaces 46 dangling-owner ERRORs. PARTS at workflows/2026-09-01_kg-workflows-run-b.mjs:107 is currently empty, so it is latent.)
```

**why:** This is the single highest-consequence keystroke in the run and the script header calls it "the repo's sharpest footgun" — yet the codebase spends a nine-line comment and a hard abort on the rarer mistake while the common one is a silent, validator-clean deletion of the entire preceding build. Recovery is git-only; nothing in the pipeline reports it.

**fix:** In bin/merge-group.py, insert immediately before the `if patch:` at line 76:

    if not patch:
        touched = {'page.' + p['id'] for p in r['pages']}
        doomed = [p['id'] for p in n['configPages'] if p.get('group') == group and p['id'] not in touched]
        if doomed:
            sys.exit('REFUSING a non-patch merge under an EXISTING label.\n'
                     '  group %r already owns %d page(s) this result does not rebuild: %s\n'
                     '  A non-patch merge DELETES them and every field, step, dependency, value set,\n'
                     '  contradiction and range under them, and validate-graph.py exits 0 over the result.\n'
                     '  Pass --patch (the result must carry patchPage from assemble-parts.py --patch-page).'
                     % (group, len(doomed), ', '.join(sorted(doomed))))

---

## [high] RB-05 :: The '(Restricted)' role gate is NOT distinct to Email Reminders — it gates nine surfaces, and one file says it HIDES Group Configurations, which silently breaks the script's own dependency edge (3)

**where:** /mnt/c/Users/manci/PROJECTS/concur-config-diver-support/workflows/2026-09-01_kg-workflows-run-b.mjs lines 672-675 (map prompt, 'its OWN DISTINCT ROLE GATE ... which is exactly the discriminator that made Forms and Fields two pages'), line 115 (seeds, 'ROLE GATE, AND IT IS DISTINCT FROM THE WORKFLOWS GATE - this is the Forms-and-Fields discriminator, the thing that makes a separate page'), and line 1378-1380 (synth:dependencies edge 3).

**evidence:**

```
  $ grep -rlF 'Invoice Configuration administrator (Restricted)' /mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE
  admin-guides/email-reminders-tool-8b2c8a11.md
  admin-guides/overview-8b2edfd0.md
  admin-guides/required-roles-1f2a20f6.md
  admin-guides/set-a-default-shipping-and-billing-address-f772bed1.md
  admin-guides/shipping-configuration-and-shipping-terms-3429ee14.md
  tools-guides/before-you-begin-ff38d4b7.md
  tools-guides/procedure-enable-the-feature-919433c7.md
  tools-guides/setting-up-a-default-policy-for-emailed-and-uploaded-invoices-b79a0486.md
  tools-guides/setting-up-an-exception-email-address-b233e300.md
  (9 files)

The sentences (each grep -F verified, 1 hit in its own file):
  email-reminders-tool-8b2c8a11.md:27  "The Email Reminders tool is visible if you have the Invoice Configuration administrator (Restricted) role."
  overview-8b2edfd0.md:40              "The Group Configurations tool is not visible if you have the Invoice Configuration administrator (Restricted) role."
  required-roles-1f2a20f6.md:34        "The Account Codes tool is available if the user has been assigned the Invoice Configuration administrator (Restricted) role."
  setting-up-an-exception-email-address-b233e300.md:23  "The Invoice Configuration administrator (Restricted) can access the Other Settings tab (Administration > Invoice > Capture Processing Admin)..."

It is a general Invoice admin role that switches some tools ON and others OFF — not a page discriminator. Base-role census for scale:
  admin-guides 'Invoice Configuration administrator'                49 files
  admin-guides 'Invoice Configuration administrator (Restricted)'    7 files
  admin-guides 'Global and Group Configuration administrator'        1 file (email-reminders-tool-8b2c8a11.md, the SAME file as the (Restricted) quote)
```

**why:** Two consequences. (a) The script instructs the map agent to 'Confirm the gate' as a page-hood discriminator; the honest answer is that it corroborates a role but refutes distinctness, and the agent has been told the conclusion in advance. Page-hood for Email Reminders still stands easily on its own menu destination and its own object model — it does not need this argument. (b) Far worse, line 1380 orders edge (3): 'GROUP-LEVEL ASSIGNMENT from Email Reminders into the built Group Configurations page.' overview-8b2edfd0.md states, in one sentence, that a (Restricted) admin CANNOT SEE Group Configurations. So the very admin who can reach Email Reminders cannot complete the group-assignment leg — a role-partitioned, undrivable edge, exactly the class of thing the script correctly insists be recorded for the scheduling handoff. It is the single most valuable thing a Chromium driver could be told about this page and the script currently has no slot for it. Note also that the contradiction the script DOES name at line 1431 ('(Restricted)' vs 'Global and Group Configuration administrator') fails its own two-different-files rule: both quotes are in email-reminders-tool-8b2c8a11.md.

**fix:** In line 115 replace 'ROLE GATE, AND IT IS DISTINCT FROM THE WORKFLOWS GATE - this is the Forms-and-Fields discriminator, the thing that makes a separate page' with: 'ROLE GATE. "The Email Reminders tool is visible if you have the Invoice Configuration administrator (Restricted) role." (email-reminders-tool-8b2c8a11.md). MEASURED: that role is NOT distinct - it appears in 9 corpus files gating Account Codes, Shipping Configuration, shipping addresses, the Capture Processing Admin Other Settings tab and more. Page-hood here rests on the MENU DESTINATION and the OBJECT MODEL, not the gate. ⚠ AND THE GATE CARRIES A ROLE PARTITION THE GRAPH MUST RECORD: overview-8b2edfd0.md states "The Group Configurations tool is not visible if you have the Invoice Configuration administrator (Restricted) role." - so the admin who can reach Email Reminders CANNOT reach Group Configurations. Emit that as a constraint on the group-assignment dependency, and note that the "(Restricted)" vs "Global and Group Configuration administrator" pair is NOT a contradiction: both sentences are in the SAME file (email-reminders-tool-8b2c8a11.md), so it fails the two-different-files bar.' Then amend line 1380 to require that constraint on edge (3), and drop the first clause of the line-1431 contradiction hint.

---

## [high] RB-06 :: The 'exactly one file shared with Run A' guard rail is scoped to the 17-file seeds while the inventory prompt orders the agent to 'beat the floor' — a broad sweep pulls in six already-mined files carrying 75 built fields

**where:** /mnt/c/Users/manci/PROJECTS/concur-config-diver-support/workflows/2026-09-01_kg-workflows-run-b.mjs line 54 (header), line 115 ('Verified: no built field cites any reminder file, so there is no duplication'), line 121 ('EXACTLY ONE FILE IS SHARED WITH RUN A'), against lines 782-784 (map:inventory, 'THE SEED LISTS IN THE PAGE BRIEFS ARE FLOORS, NOT CEILINGS ... Beat the floor and say what you added') and lines 765-771 (the mandated broad search-term list).

**evidence:**

```
python3 over output/kg-invoice-config.json, counting built fields whose sourceFile is in each broad sweep:

  files in `grep -rliF "email reminder" admin-guides/`  ->  25 BUILT FIELDS already cite two of them:
     14  add-groups-ec5d8d8b.md          -> page.group-configurations (BUILT, Group 1)
     11  work-with-the-steps-page-fab249d1.md -> page.workflows (BUILT, Run A)

  files in `grep -rliF "delegate" admin+tools/`         ->  50 BUILT FIELDS already cite four of them:
     26  create-a-new-workflow-554e86aa.md            -> page.workflows
     16  the-condition-page-5d4ea870.md               -> page.audit-rules
      5  add-an-email-notification-c237a2de.md        -> page.workflows
      3  select-an-email-notification-in-the-workflows-tab-663bb8ac.md -> page.workflows

The mandated Delegate search terms at line 769 ('delegate, delegation, delegate configuration, invoice delegate, payment delegate, proxy, acting as, on behalf of, ...') return all four of those. The mandated Email Reminders terms at line 766 ('...group, rule, ...') plus the explicit instruction 'a broad grep -rli "email reminder" over both guide dirs returns 25' return both of the others.

Two of the six are large and table-bearing, i.e. exactly what Lens B is trained to seize:
  add-groups-ec5d8d8b.md                 7,283 B, 38 cell-openers (~12 rows) - Group Configurations 'Add Groups'
  work-with-the-steps-page-fab249d1.md   6,726 B, 28 cell-openers (~8 rows)  - Workflows Steps page
And overview-8b2edfd0.md (3,485 B) is the GROUP CONFIGURATIONS OVERVIEW - it lands in the reminder sweep only because it lists 'email reminders' among the things a group configuration carries. That is the SAME defect the recon completeness critic raised against Run A: 'a Group Configurations overview is sitting in the Feature Hierarchies seed list ... a live risk of re-homing already-built Group 1 fields, which the brief forbids outright.'
```

**why:** 'Verified: no built field cites any reminder file' is true only of the 20 files whose PRIMARY subject is reminders; as written against a 25-file sweep it is false, and the agent is told the number 25 in the same sentence. The run therefore ships a false all-clear next to an instruction to widen the net. The ownership refuter's guard (item 6b) is written to catch exactly one filename, delegate-self-approval-1b627285.md, so five of the six contaminated files have no guard at all. Re-homing a Group Configurations or Workflows field onto Email Reminders is invisible to bin/validate-graph.py — the script says so itself at line 1157 ('A duplicate across two pages is INVISIBLE to bin/validate-graph.py').

**fix:** Add a shared block to both seeds and to ALREADY_BUILT: '### SIX FILES IN THE BROAD SWEEPS ARE ALREADY MINED BY BUILT PAGES. READ THEM ONLY FOR CORROBORATION AND NEVER EMIT A FIELD FROM ONE. In the "email reminder" sweep: add-groups-ec5d8d8b.md (7,283 B, 38 cell-openers - 14 built fields on Group Configurations), work-with-the-steps-page-fab249d1.md (6,726 B, 28 cell-openers - 11 built fields on Workflows), overview-8b2edfd0.md (3,485 B - THE GROUP CONFIGURATIONS OVERVIEW; it appears only because it lists email reminders as one thing a group carries), plus workflow-667cee21.md and about-vendor-approval-workflow-step-and-timeout-b3d1bd2c.md (Workflows). In the "delegate" sweep: create-a-new-workflow-554e86aa.md (26 built fields), the-condition-page-5d4ea870.md (16, on Audit Rules), add-an-email-notification-c237a2de.md (5) and select-an-email-notification-in-the-workflows-tab-663bb8ac.md (3). THE CORRECTED CLAIM: exactly ONE file is shared with Run A among the SEEDED files (delegate-self-approval-1b627285.md), but the moment you beat the floor you will meet these six. The two pages themselves still share ZERO files with each other - re-verified with comm -12 over the broadest sweeps across all four corpus directories.' Also correct line 115's 'Verified: no built field cites any reminder file' to 'Verified: no built field cites any of the 20 files whose primary subject is reminders; two files in the wider 25-file sweep are already mined - see the six-file list.'

---

## [high] RB-07 :: delegate-experience-8b30fb06.md is missing from the seeds — it is the decisive evidence on the run's own open identity question and it carries a fourth label variant

**where:** Absent from /mnt/c/Users/manci/PROJECTS/concur-config-diver-support/workflows/2026-09-01_kg-workflows-run-b.mjs line 121 (Delegate Configurations seeds) and from the identity paragraph at lines 684-692 (map prompt). Present in the recon it was adapted from (output/reports/2026-08-31_workflows-recon/workflow-result.json, 3 occurrences).

**evidence:**

```
concur-invoice-professional-edition-admin-guides/delegate-experience-8b30fb06.md, 1,796 B, line 25 (grep -F verified, 1 hit):
  "To allow delegates to view invoices, select the Delegate can view invoice images for payment requests check box in the Add Delegate Configuration window. This window is available by clicking Administration > Invoice > Delegate Configurations > New (or Modify, if existing configuration)."

The corpus calls the SAME surface a page in one file and a window in another:
  $ grep -rn 'Add Delegate Configuration' /mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE
  admin-guides/create-a-new-invoice-delegate-configuration-fcf42662.md:33: "Choose New. The Add Delegate Configuration - Invoice page appears."
  admin-guides/delegate-configuration-8b2bd26d.md:227: "...setting to the Add Delegate Configuration page."
  admin-guides/delegate-experience-8b30fb06.md:25:  "...in the Add Delegate Configuration window. This window is available by clicking..."

And two MORE child-surface names the script never mentions:
  edit-an-invoice-delegate-configuration-c7f51424.md: "Select Modify. The Modify Delegate Configuration page appears."
  access-and-view-payment-delegate-configurations-8ed1298f.md: "This is also a link to the Edit Delegate Configuration page"

It also gives a fourth label for one control: 'Delegate can view invoice images for payment requests' (here) vs 'Delegate can view images' (fcf42662) vs 'Can View Images' (8ed1298f) vs 'Delegate can view images' in the checkbox block.

  $ python3 -c "import json;print(json.dumps(json.load(open('output/reports/2026-08-31_workflows-recon/workflow-result.json'))).count('delegate-experience-8b30fb06'))"
  3
```

**why:** The script poses one open question and calls it 'THE ONE IDENTITY QUESTION THE RECON DID NOT SETTLE, AND IT IS YOURS' (line 684), then hands the agent only the one quote that says 'page' and tells it 'The corpus calls it a page' (line 685-686). The file that says 'window' — twice, and gives the full click path including Modify — is not in the seeds. That is a one-sided brief on the run's single flagged unknown. It is also the only source for the full path Administration > Invoice > Delegate Configurations > New (or Modify), which is what a driver actually needs, and it is the only file that names the New/Modify pair as reaching the SAME surface — which is itself the strongest argument that it is one modal, not two pages.

**fix:** Add to line 121 after the child-window clause: '### THE CORPUS CONTRADICTS ITSELF ABOUT THAT CHILD SURFACE AND YOU MUST SEE BOTH SIDES. delegate-experience-8b30fb06.md (1,796 B) calls it a WINDOW twice and gives the full path: "To allow delegates to view invoices, select the Delegate can view invoice images for payment requests check box in the Add Delegate Configuration window. This window is available by clicking Administration > Invoice > Delegate Configurations > New (or Modify, if existing configuration)." create-a-new-invoice-delegate-configuration-fcf42662.md and delegate-configuration-8b2bd26d.md:227 call it a PAGE. Two MORE names exist for the edit side: "The Modify Delegate Configuration page appears." (edit-an-invoice-delegate-configuration-c7f51424.md) and "a link to the Edit Delegate Configuration page" (access-and-view-payment-delegate-configurations-8ed1298f.md). Five names, one surface, four files - that is a grounded label-drift contradiction on its own. delegate-experience-8b30fb06.md is a MUST-READ; it also gives a fourth label for the view-images control ("Delegate can view invoice images for payment requests").'

---

## [high] RB-08 :: 'The corpus calls it a page' is not evidence — Email Reminders' own wizard steps are called pages, and this graph already ruled that class NOT a page

**where:** /mnt/c/Users/manci/PROJECTS/concur-config-diver-support/workflows/2026-09-01_kg-workflows-run-b.mjs lines 685-692 (map prompt identity paragraph) and line 121 ('The corpus calls it a page; the Approval Authority precedent ... and the Workflows precedent ... both bear on it').

**evidence:**

```
The '<X> page appears' idiom is used indiscriminately for real pages AND for modal wizard steps this graph has ALREADY decided are not pages:
  $ grep -rhoP 'The [A-Z][A-Za-z0-9 ()/,-]{2,60} page appears' admin-guides/ tools-guides/ | sort | uniq -c | sort -rn
  11 The Workflows page appears        <- real page
   5 The Group Configurations page appears  <- real page
   4 The General page appears          <- Workflows MODAL WIZARD, ruled NOT a page
   3 The Email Reminders page appears  <- real page
   2 The Steps page appears            <- Workflows MODAL WIZARD, ruled NOT a page
   2 The Conditions page appears       <- MODAL WIZARD
   1 The Step Rules page appears       <- Workflows MODAL WIZARD, ruled NOT a page

And the reverse: the corpus calls a page-node a WINDOW.
  $ grep -rhoP 'The [A-Z][A-Za-z0-9 ()/,-]{2,60} window appears' ... | grep Authorized
  2 The Authorized Approval Limits window appears
page.authorized-approval-limits IS a page node in the graph; navPathSourceQuote is literally "The administrator clicks the link. The Authorized Approval Limits window appears."

My verdict, HIGH confidence: the Add/Modify Delegate Configuration surface is a MODAL OVER AN OBJECT, NOT a page node. Reasons: (1) the idiom is proven non-discriminating in BOTH directions above; (2) delegate-experience-8b30fb06.md calls it a window and shows New and Modify reaching the same surface — an object editor, the exact Workflows General/Steps/Step Rules shape; (3) it has no menu destination of its own and no role gate of its own, which is the tiebreaker the recon used for Email Reminders and Feature Hierarchies; (4) Authorized Approval Limits earned page-hood on a DIFFERENT ground — it hangs off a different menu tree entirely (Administration > Company > Company Admin > User Administration) and has seven fields with no parent page in this graph to own them. Neither applies here: the eleven controls are already documented as columns of the Delegate Configurations list page itself.
```

**why:** The script tells the agent 'The corpus calls it a page' as if that were one side of a balanced argument, when the corpus demonstrably calls modal wizard steps pages too — including on the OTHER page in this very run. Left as written, an agent that takes the idiom seriously will mint page.add-delegate-configuration-invoice, which then owns eleven controls the script's own dependency plan assumes live on page.delegate-configurations, stranding edge (4) and the dep.g1.059 endpoint.

**fix:** Replace 'The corpus calls it a page' at line 685-686 with: 'THE "page appears" IDIOM IS PROVEN NON-DISCRIMINATING AND YOU MAY NOT REST ON IT. Measured corpus-wide: the same phrase covers real pages ("The Workflows page appears" 11x) AND the Workflows modal wizard this graph ALREADY ruled is NOT a page ("The General page appears" 4x, "The Steps page appears" 2x, "The Step Rules page appears" 1x). It runs the other way too: page.authorized-approval-limits IS a page node and its own navPathSourceQuote says "The Authorized Approval Limits window appears." So decide on STRUCTURE, not vocabulary. The three structural tests this graph has actually used are: does it have its own MENU DESTINATION, its own ROLE GATE, and its own OBJECT MODEL? Authorized Approval Limits earned page-hood because it hangs off a different menu tree with no parent in this graph; the Workflows wizard did not because New/Modify open it over an existing object. Apply those tests and say which fired.'

---

## [high] F3 :: A value set emitted without appliesToPage silently wires graph-wide via apply-corrections wire_by_name; ten of this run's likely field names are graph-wide-unique on OTHER pages

**where:** bin/assemble-parts.py:225 and bin/apply-corrections.py:280-316 (wire_by_name, especially :301 and :305); prompt at /mnt/c/Users/manci/PROJECTS/concur-config-diver-support/workflows/2026-09-01_kg-workflows-run-b.mjs lines 1296-1304 and 1323-1330

**evidence:**

```
apply-corrections.py:305 — `pick = same[0] if len(same) == 1 else (allm[0] if (pid is None and len(allm) == 1) else None)`. With appliesToPage '' the lookup at :301 gives pid=None, `same` is always empty (no field has pageId None), so the graph-wide branch fires on any unique name. The 2026-09-01 guard above it only covers a STATED page that lacks the field.  assemble-parts.py:225 — `'appliesToPage': v.get('appliesToPage') or ''` — defaults a missing page to '' with no problem raised; the only value-set check is VALUE-SET-ID-COLLISION at :425, which is not even FATAL.  Measured against the graph, every one of these names is graph-wide UNIQUE today and is a plausible Run B name: editable_by -> field.audit-rules.editable-by; active -> field.audit-rules.active; applies_to -> field.audit-rules.applies-to; data_object -> field.audit-rules.data-object; field_value -> field.audit-rules.field-value; operator -> field.audit-rules.operator; email_subject -> field.workflows.email-subject; email_body -> field.workflows.email-body; editable_by_groups -> field.workflows.editable-by-groups; name -> field.policies.name.
```

**why:** The Email Reminders Rules tab uses Audit Rules' exact vocabulary (Data Object / Field/Value / Operator / Editable By / Active / Applies to). If one lens omits appliesToPage, validate-graph.py first shows an honest `unwired-value-set` ERROR; someone runs apply-corrections to clear it and the set silently attaches to an Audit Rules or Workflows field. The build then goes green carrying a false owner — the identical defect the Approval Authority guard was written for, entering through the door that guard does not cover. Note orphanCandidates are safe (assemble-parts.py:268-270 sets BOTH page and field to '', so wire_by_name's empty-`want` check skips them); the hole is only in valueSets[].

**fix:** Two toolchain edits before the run. (a) bin/assemble-parts.py, in the valueSets loop around line 225: `if not (v.get('appliesToPage') or '').strip(): problems.append(('VALUE-SET-NO-PAGE', str(v.get('appliesToField')), 'appliesToPage is empty - use orphanCandidates instead'))`, and add 'VALUE-SET-NO-PAGE' to the FATAL tuple at :499. (b) bin/apply-corrections.py wire_by_name, immediately after `pid = pages.get(...)` at :301: `if not str((v.get('appliesToRef') or {}).get('page') or '').strip(): continue` — an unstated page is not evidence for a graph-wide guess. Also add to the valueSets prompt near script line 1300: 'appliesToPage is MANDATORY on every entry of valueSets[]. If you cannot name the page, the record belongs in orphanCandidates, which carries page and field as "" on purpose.'

---

## [high] F4 :: contr.gworkflows.004 tells a config writer Email Reminders is "not yet built in this graph" — it survives the --patch merge and is false the moment Run B lands

**where:** /mnt/c/Users/manci/PROJECTS/concur-config-diver-support/output/kg-invoice-config.json — node contr.gworkflows.004, key consequenceForWriter

**evidence:**

```
Exact string: "Probe the plural 'Email Notifications' first - it is the label used by the tab's own access topic and by every add/modify/remove procedure - and keep the singular as a fallback alias. Separately and more importantly: do NOT confuse this tab with the Email Reminders page, which is a different surface not yet built in this graph."  The node carries group='Workflows', patch=null; merge-group.py:89 keeps every contradiction whose patch != tag, and tag will be 'Workflows', so it is untouched — confirmed by sandbox simulation, configContradictions stayed at 66. It is the only node in the graph asserting the build state of Email Reminders; a full sweep of notes / conditions / verifyNotes / identityNotes / consequenceForWriter / step rationales for 'reminder' and 'delegate' returned 34 hits and this is the only falsified assertion among them.
```

**why:** This is the direct analogue of the six nodes that asserted the superseded Administration > Company scope decision before the Approval Authority run. consequenceForWriter is the field a config-writing driver actually reads; after this merge it points at a page that exists and tells the reader it does not, and it invites the next run to re-derive the distinction from scratch.

**fix:** Do not edit consequenceForWriter in place — the project convention is a dated append so the original reading stays auditable. Add a CONTRADICTION_NOTE_APPEND_BY_ID dict to bin/apply-corrections.py (twin of the existing VALUESET_NOTE_APPEND_BY_ID) keyed 'contr.gworkflows.004', appending to notes: ' SCOPE CORRECTION 2026-09-01 (Workflows Run B): consequenceForWriter says the Email Reminders page is "not yet built in this graph". That is no longer true — page.email-reminders was built by Workflows Run B under the same group label. The warning itself STANDS and is now sharper: Email Reminders is interval-driven and assigned by GROUP; the Email Notifications tab is event-driven and assigned to a workflow object. Two surfaces, still not to be collapsed.'

---

## [medium] B6 :: A page-mis-assignment drop from only one refuter is routed to REPAIR, and the Repair prompt has no rule for a repair-bucket item carrying correctPage

**where:** 2026-09-01_kg-workflows-run-b.mjs:571-572 (combineVerdicts) and :1177-1189 (the WHAT TO DO WITH EACH BUCKET block)

**evidence:**

```
combineVerdicts lines 571-572: "else if (ds.every((x) => x === 'drop')) d = 'drop'   // unanimous drop only" then "else if (ds.indexOf('drop') !== -1) d = 'repair'     // refuters disagree -> defect, not deletion". Refuter 2 alone owns the boundary (item 6, lines 1103-1116, 'THIS IS THE CENTRAL RISK OF THIS RUN AND IT IS YOURS') and is told an Email Notifications candidate 'is a DROP with correctPage "Workflows"'. Refuter 1 (1051-1068) only checks grounding and is told at 1068 'Default to repair when uncertain' — it will not concur. The Repair prompt's bucket rules mention correctPage exactly once, at 1188-1189, and only inside 'DROP: do not emit.'
```

**why:** The run's single most important drop is structurally unreachable: refuter 2 flags an Email Notifications control as a page mis-assignment, refuter 1 says keep-or-repair because the quote is verbatim (it will be — it is a real quote from a real file), combineVerdicts turns that into 'repair', and the Repair agent then reads its instructions, sees the item in the REPAIR bucket, fixes 'exactly the defect the refuters named', and emits it into the Email Reminders roster. The three-way disposition rule itself is correct accumulated method and must NOT be changed; what is missing is a handling rule for correctPage in the repair bucket.

**fix:** Leave combineVerdicts untouched. Add to the REPAIR bucket paragraph, after line 1187 ('...better than a fabricated fix.'): 'ONE REPAIR IS NOT A REPAIR: if ANY refuter set correctPage on an item in this bucket, the defect is PAGE ASSIGNMENT, and no amount of quote-fixing cures it. Move it to "dropped", carrying that refuter\'s correctPage and reason, and say in verifyNotes that the refuters disagreed and you resolved it as a drop. This is deliberate and it is narrower than the three-way rule: page mis-assignment is the one failure mode grep cannot catch, so a single grounded ownership objection outranks a second refuter who only checked the quote. It matters most for the Email Reminders / Workflows Email NOTIFICATIONS boundary and for anything sourced from delegate-self-approval-1b627285.md.'

---

## [medium] B7 :: Lens B's charter is calibrated for raw-HTML-table pages — its mandatory opening sweep resolves to zero files on this run and it leads with the anchor that returns zero

**where:** 2026-09-01_kg-workflows-run-b.mjs:146-157 (the charter), especially :148-150 and :153; compare 2026-09-01_kg-authorized-approval-limits.mjs:145

**evidence:**

```
Lines 148-150: 'MANDATORY MECHANICAL SWEEP before you read anything: for every candidate file for this page, run grep -c \'<table\' "$FILE" and read IN FULL every file that returns non-zero. Also run grep for markdown pipe tables (grep -c "^|" or "^ *|")...'. diff against Run A produces no hunk here — the charter is unchanged. Measured for this run: 0 files in either page set return non-zero for grep -c '<table' (script's own line 769 says so), so the mandatory sweep names nothing. And grep -c '^|' returns 0 on all three roster files (create-email-reminders 0, access-and-view-payment-delegate 0, create-a-new-invoice-delegate 0) while '^ *|' returns 49/37/22 — the correct form is present only as the second half of an 'or'. Line 153 ('Set fromRawHtmlTable: true ONLY on records whose cited file returns non-zero') is unconditionally false here. The AAL sibling added a per-page 'MEASURED CENSUS FOR THIS PAGE, so you can tell a thin corpus from a lazy sweep' line to this exact charter; Run B did not.
```

**why:** Lens B runs on opus at high effort and is one of three extraction lenses — a third of extraction capacity. It is the lens that owns the tables, and on this run the tables ARE the roster (15 rows in create-email-reminders-604c4a46.md is most of the Email Reminders field list). A charter whose first, capitalised, mandatory instruction resolves to an empty set invites the agent to conclude there is nothing here for it and return thin. The page seeds do carry the indented-table warning and reach Lens B through pageContext (line 820), so this is a mis-calibration rather than a blocker — but it is the exact gap AAL closed and Run B reopened.

**fix:** Insert one line into the Lens B charter immediately after line 148's mandatory sweep: 'MEASURED CENSUS FOR THIS RUN, so you can tell a thin corpus from a lazy sweep: BOTH page sets return ZERO for grep -c "<table" and ZERO for grep -c "<tr". The raw-HTML sweep will find nothing and that is the correct result - report the zero and move on. YOUR REAL WORK IS THE INDENTED MARKDOWN TABLES, and they hold the roster: use grep -cP "^\\s*\\|" or grep -c "^ *|", NEVER grep -c "^|", which returns 0 on all three roster files. And divide before you report: an N-column row occupies N+1 pipe-anchored lines, so create-email-reminders-604c4a46.md is 49 lines = 15 ROWS, access-and-view-payment-delegate-configurations-8ed1298f.md is 37 = 11 ROWS, create-a-new-invoice-delegate-configuration-fcf42662.md is 22 = 6 ROWS. fromRawHtmlTable is FALSE on every record in this run.'

---

## [medium] B8 :: The value-sets synth prompt has no run-specific calibration, and the one catalogue the graph is explicitly asking for is never mentioned to it

**where:** 2026-09-01_kg-workflows-run-b.mjs:1286-1338 (the whole valueSets agent) and :1258-1283 (SYNTH_CONTEXT); compare 2026-09-01_kg-authorized-approval-limits.mjs:1326-1341

**evidence:**

```
The only Run B edits to this prompt are cosmetic: line 1289 'FOR THIS GROUP' replacing 'FOR GROUP 3', and line 1325 the appliesToPage placeholder. Its worked example is still the Audit Rules condition editor (1291-1294). The AAL sibling inserted a 16-line run-specific block at its 1326-1341 ('=== EXPECT VERY FEW VALUE SETS HERE, POSSIBLY ZERO. THAT IS A CORRECT ANSWER. ===' plus a named source the agent would otherwise miss). Run B inserted nothing. Meanwhile the inventory prompt at 782-785 names email-message-replacement-tokens-c9cc4af4.md as 'A GENUINE PRIZE' that the graph 'is ALREADY ASKING FOR' — and the agent that actually builds value sets is never told it exists. Verified in the graph: vset.g3.unnamed.email-message-replacement-tokens-the-4-row-variable-label-na carries knownGap-style notes ('ACCEPTED GAP - deliberately unwired... it belongs to reminder emails on the Add Email Reminder page') and 4 values, and validate-graph.py reports 35 unwired-value-set-KNOWN-GAP warnings today.
```

**why:** Closing that known gap is one of the two concrete deliverables the seeds claim for Email Reminders, and the only agent that can close it is briefed on the Audit Rules 250-name condition editor instead. Conversely, with zero raw tables and only four small markdown tables across both pages, an uncalibrated agent primed by a 250-name example is under pressure to manufacture sets — the failure the prompt's own line 1303 warns against ('DO NOT invent an owner and DO NOT attach it to a neighbour').

**fix:** Insert after line 1312 (before '=== validValuesAdditions ==='): '=== EXPECT VERY FEW SETS HERE, AND POSSIBLY ONLY ONE. THAT IS A CORRECT ANSWER. === Both pages are prose-shaped: ZERO raw <table>, and only four markdown tables between them (15, 11, 6 and 3 data rows). Do not manufacture a set to have one; an empty array with an honest note is a right deliverable and anything you cannot own goes to orphanCandidates. THE ONE SET THIS RUN OWES, and the graph is already asking for it: email-message-replacement-tokens-c9cc4af4.md holds a 3-column table with FOUR data rows - %1% Logon URL, %2% User Name, %3% Number of Records, %4% List of Records. FOUR. The graph already carries all four as vset.g3.unnamed.email-message-replacement-tokens-the-4-row-variable-label-na, deliberately unwired with knownGap, and its own note says what would fix it is "an Email Reminders page node that owns this table properly". If the Email Reminders roster contains a field these tokens are typed into (the Email Subject / Email Message pair), wire a set to it by that field\'s exact roster NAME and say in notes that this supersedes the Group 3 orphan. If no roster field owns them, say so in orphanCandidates and name what would fix it. Do NOT hunt for a fifth token; there are four. Two other frequency/type enumerations sit inside create-email-reminders-604c4a46.md prose (the Reminder Type list and the Frequency list) - those ARE genuine option lists; enumerate them verbatim against a field name from the roster.'

---

## [medium] B10 :: Neither critic is pointed at the contradictions or ranges files, and neither numbered list mentions contradictions at all

**where:** 2026-09-01_kg-workflows-run-b.mjs:1572-1577 (CRITIC_CONTEXT file list), :1589-1630 (critic A items), :1644-1674 (critic B items)

**evidence:**

```
Line 1575 reads: "'  Synthesis:  ' + PARTS + '/synth-valuesets.json , ' + PARTS + '/synth-dependencies.json , ' + PARTS + '/synth-steps.json'," — synth-contradictions.json and synth-ranges.json are written at 1458-1459 and returned at 1701-1702 but are absent from the list the critics are told to read. grep -n 'contradiction' within 1585-1684 returns nothing. Critic A item 6 covers ranges by content (1610-1611) but never names the file. Baseline measured: python3 bin/validate-graph.py output/kg-invoice-config.json reports 'contradictions 66 (209 readings, 209 quotes verbatim)' and the FILE_SHAPE block at 915-917 states 'the deterministic validator treats an unverifiable reading quote as an ERROR, exactly as it does a field quote'.
```

**why:** Contradictions are an ERROR-class output — one ungrounded reading quote fails the build, and the run is expected to produce several (the contradiction prompt at 1421-1434 lists four likely ones including the three-way 'Rules' label collision and the Email Reminders role-gate wording). They are the only synthesis output with no reviewer. Critic B item 1 says 'Take every field in every roster and grep -F its sourceQuote' — fields only; the 209-reading pattern is exactly the kind of mechanical sweep it does well and is never asked to do.

**fix:** Amend line 1575 to list all five: "'  Synthesis:  ' + PARTS + '/synth-valuesets.json , ' + PARTS + '/synth-dependencies.json , ' + PARTS + '/synth-steps.json , ' + PARTS + '/synth-contradictions.json , ' + PARTS + '/synth-ranges.json',". Then extend critic B item 9 (1667) to open: ' 9. CONTRADICTIONS, DEPENDENCIES AND STEPS. Contradictions first, because an ungrounded reading is a hard validator ERROR exactly like a bad field quote: grep -F every reading sourceQuote in synth-contradictions.json against its OWN cited file, and confirm each record has at least TWO readings citing DIFFERENT (file, quote) pairs that actually carry the disagreement rather than merely mentioning the subject. Report any record that would land with one grounded reading. Then: does each dependency edge quote actually STATE the relationship...'

---

## [medium] F3 :: merge-group.py ignores result['group']; a group-label typo mints a phantom group in meta and validates clean

**where:** bin/merge-group.py:277-280 (label taken from argv, result never consulted), :249-258 (meta derived from page groups); bin/assemble-parts.py:449 (the result already carries the authoritative label)

**evidence:**

```
merge-group.py:278-280 `args = [a for a in sys.argv[1:] if not a.startswith('--')] ... main(args[0], args[1], patch='--patch' in sys.argv)` — `r['group']` written by assemble-parts.py:449 `'group': group` is loaded and then never read.

Measured on a disposable copy (result['group'] == 'Workflows', argv label lower-cased):
  $ BUILD_DATE=2026-09-01 python3 bin/merge-group.py out-runb.json "workflows" --patch
    status: IN_PROGRESS | groups complete: 8
    groupsComplete: [... 'Workflows', 'workflows']
    version: 0.9.0            # bumped by a typo
    new page groups: [('page.delegate-configurations','workflows'), ('page.email-reminders','workflows')]
    new field sourceGroups: ['Workflows']   # fields keep ptag, pages take argv — they now disagree
  $ python3 bin/validate-graph.py ; echo $?  ->  0
```

**why:** Run B is the first build whose label is a bare word rather than the distinctive 'Group N — Name' shape, so a case or whitespace slip is newly plausible — and the label is typed twice (assemble --group, merge argv). The result is two Workflows groups in groupsComplete, a spurious version bump, and pages whose `group` disagrees with their fields' `sourceGroup`, which quietly breaks the next non-patch strip and every group-scoped consumer. ALL_GROUPS at merge-group.py:28-34 will never surface it because groupsRemaining is a set difference, not an equality check.

**fix:** In bin/merge-group.py main(), immediately after line 45 `r = load_result(src_path)` add:

    if r.get('group') and r['group'] != group:
        sys.exit('group label mismatch: the result was assembled as %r but this merge was invoked as %r.\n'
                 'They must be byte-identical (em-dash included) or the graph gains a phantom group.'
                 % (r['group'], group))

---

## [medium] RB-10 :: Delegate Configurations has ~11 UNIQUE controls, not ~25 — eight of them are documented under two or three different labels in different files, so a roster that lands near 25 is roughly eight duplicates

**where:** /mnt/c/Users/manci/PROJECTS/concur-config-diver-support/workflows/2026-09-01_kg-workflows-run-b.mjs line 121 ('estimated ~25 fields'). No de-duplication warning anywhere; the ownership refuter's item 3 (INTRA-PAGE DUPLICATION, ~line 1131) is generic.

**evidence:**

```
The two must-read rosters name the SAME controls with DIFFERENT labels. Both files, both grep -F verified:

  create-a-new-invoice-delegate-configuration-fcf42662.md   |  access-and-view-payment-delegate-configurations-8ed1298f.md
  ---------------------------------------------------------|-------------------------------------------------------------
  "Configuration Name"                                      |  "Name"
  "Delegate can prepare"                                    |  "Can Prepare"
  "Delegate can submit"                                     |  "Can Submit"
  "Delegate can approve (any time)"                         |  "Can Approve" / "(Any Time)"
  "Delegate can approve during specified period"            |  "Can Approve Temporary"
  "Delegate can view images"                                |  "Can View Images"
  "Restrict delegate selection to user's group"             |  "Restrict Delegates to Group"
  "Require approver role for approval delegation"           |  "Need Approver Role to Approve"

A THIRD naming exists in terminology-e1e1ed99.md ('Delegate Restriction to Group', 'Temporary Approval Delegation') and a FOURTH in delegate-experience-8b30fb06.md ('Delegate can view invoice images for payment requests').

True counts (cell-openers converted per RB-03): fcf42662 = 6 field rows (Configuration Name, Maximum Time Period to Approve, Restrictions, Restrict approvers to those with equal or higher authorized approver limit, Applies to Groups, Delegate Settings For User Administrators and Employees), expanding to 13 atomic controls; 8ed1298f = 11 list columns. UNION = 11-13 unique controls, plus the Inheritance/No Inheritance link toggle, the Invoice/Purchase Request tabs, and New/Modify/Remove/Save/Yes buttons.

MY EXPECTED ROSTER (11 controls + 1 link + tabs + 5 buttons ~= 17-19 records if buttons are emitted per the Lens A charter): Configuration Name; Maximum Time Period to Approve; Restrict delegate selection to user's group; Require approver role for approval delegation; Restrict approvers to those with equal or higher authorized approver limit; Applies to Groups; Inheritance link (toggle: 'The Inheritance link works as a toggle. When selected, the link switches between Inheritance and No Inheritance.'); Delegate can prepare; Delegate can submit; Delegate can approve (any time); Delegate can approve during specified period; Delegate can view images.
```

**why:** The brief is right that hitting 25 exactly would be suspicious. Here it is worse than suspicious: 25 is only reachable by emitting both label families, which is eight duplicate records that survive every gate except the ownership refuter's generic item 3. The procedure lens reads fcf42662 and the tables lens reads 8ed1298f, so the two families arrive from different lenses under different names, and buildCandidates() keys on nrm(name) — 'Can Prepare' and 'Delegate can prepare' normalise to different keys, so they never merge and both go to the refuters as independent candidates. They will not trip duplicate-field-name either, since the names differ.

**fix:** Replace 'estimated ~25 fields' at line 121 with: 'ELEVEN TO THIRTEEN UNIQUE CONTROLS, NOT 25 - AND THE 25 ESTIMATE IS A DUPLICATION TRAP. The two rosters label the SAME controls differently: create-a-new-invoice-delegate-configuration-fcf42662.md writes Configuration Name / Delegate can prepare / Delegate can submit / Delegate can approve (any time) / Delegate can approve during specified period / Delegate can view images / Restrict delegate selection to user\'s group / Require approver role for approval delegation, while access-and-view-payment-delegate-configurations-8ed1298f.md writes Name / Can Prepare / Can Submit / Can Approve (Any Time) / Can Approve Temporary / Can View Images / Restrict Delegates to Group / Need Approver Role to Approve for the SAME eight controls. terminology-e1e1ed99.md adds a third naming (Delegate Restriction to Group, Temporary Approval Delegation) and delegate-experience-8b30fb06.md a fourth (Delegate can view invoice images for payment requests). EMIT ONE RECORD PER CONTROL, prefer the CREATE-form label as the name because that is what an admin types against, carry the list-column label in "label" and every other variant in notes, and record the label drift as a contradiction. A roster near 25 on this page is roughly eight duplicates.'

---

## [medium] RB-11 :: The run's best grounded contradiction — the Reminder Type option list differing between the two Email Reminders rosters — is never named, while a hint that fails the two-file rule is

**where:** /mnt/c/Users/manci/PROJECTS/concur-config-diver-support/workflows/2026-09-01_kg-workflows-run-b.mjs lines 1420-1434 (synth:contradictions 'Places this run is likely to hold real ones'), which lists Rules-label collision, delegate aliases, singular/plural drift and the role-gate wording, but not this.

**evidence:**

```
Two DIFFERENT files, each the sole corpus hit for its string:
  create-email-reminders-604c4a46.md:  "Approval Request - Vendor Request: When a vendor-based invoice has a status of Pending Approval."
  create-reminder-rules-b0a7fac5.md:   "Approval Request - Payment Vendor: When a vendor-based invoice has a status of Pending Approval."
  $ grep -rlF 'Approval Request - Vendor Request' .   -> create-email-reminders-604c4a46.md only
  $ grep -rlF 'Approval Request - Payment Vendor' .   -> create-reminder-rules-b0a7fac5.md only

And the SAME value is defined incompatibly in the two files:
  create-email-reminders-604c4a46.md:  "Approval Request - Payment Request: When a cash advance request has a status of Pending Approval."
  create-reminder-rules-b0a7fac5.md:   "Approval Request - Payment Request: When an invoice has a status of Pending Approval."
(A 'cash advance request' is an Expense concept and appears nowhere else in the Invoice reminder documentation — near-certain SAP copy-paste, but the blind-build rule forbids reconciling it.)

A second unnamed one, three files, same right with two different failure modes:
  create-reminder-rules-b0a7fac5.md: "Group administrators can only create email reminder rules if given \"create\" rights. If they do not have permissions, then the New button will not appear."
  edit-reminder-rules-8f2edae9.md:   "Group administrators can only edit email reminder rules if given \"create\" rights. If they do not have permissions, then the Edit Reminder Rule page will be read-only."
  edit-email-reminders-2a2638ad.md:  "Group administrators can only edit email reminders if given \"create\" rights from the configuration checklist of the Invoice Configuration administrator."

By contrast the hint the script DOES give at line 1431 ('"(Restricted)" versus the "Global and Group Configuration administrator" phrasing in the same file') fails the script's own bar: it says 'in the same file', and the FILE_SHAPE rule at ~line 900 requires 'AT LEAST TWO, each citing a DIFFERENT (file, quote) pair'.
```

**why:** This is a two-file, verbatim, option-list disagreement on the field that gates every other choice on the page — Reminder Type filters which rules appear in Reminder Rule and which conditions the Step 2 editor offers ('Selecting a type also filters the options available when creating the rule using the condition editor on the next page'). It is precisely the case the ConfigContradiction node type exists for, and precisely the case where reconciling would look right and be wrong. Leaving it unnamed while naming a hint that cannot meet the grounding bar means the contradictions agent is likely to spend its budget on aliases and singular/plural drift and return a thin, low-value set.

**fix:** Insert as the FIRST bullet of the line-1422 list: '  * ⚠ THE REMINDER TYPE OPTION LIST DIFFERS BETWEEN THE TWO ROSTER FILES, AND THIS IS THE STRONGEST CONTRADICTION IN THE RUN - both readings are single corpus hits in DIFFERENT files. create-email-reminders-604c4a46.md enumerates "Approval Request - Vendor Request" while create-reminder-rules-b0a7fac5.md enumerates "Approval Request - Payment Vendor" for the same option; and the shared option is defined incompatibly - "Approval Request - Payment Request: When a cash advance request has a status of Pending Approval." (create-email-reminders) versus "...: When an invoice has a status of Pending Approval." (create-reminder-rules). DO NOT RECONCILE. Emit both as separate value sets with distinct context (reminder-side vs rule-side) and one contradiction node. consequenceForWriter: probe both label spellings; a cash-advance reading is almost certainly Expense boilerplate but the corpus does not say so.  * THE "create" RIGHT HAS TWO DIFFERENT DOCUMENTED FAILURE MODES across three files: "the New button will not appear" (create-reminder-rules-b0a7fac5.md) versus "the Edit Reminder Rule page will be read-only" (edit-reminder-rules-8f2edae9.md) versus "if given \"create\" rights from the configuration checklist of the Invoice Configuration administrator" (edit-email-reminders-2a2638ad.md).' Delete the '(Restricted)' clause from line 1431 - both its quotes are in email-reminders-tool-8b2c8a11.md and it cannot meet the two-different-files bar.

---

## [medium] RB-12 :: 'Proven end-to-end on Approval Authority' overstates the tabs chain — the AAL page node carries no tabs key at all, so only the empty case was exercised

**where:** /mnt/c/Users/manci/PROJECTS/concur-config-diver-support/workflows/2026-09-01_kg-workflows-run-b.mjs line 68 (header) and lines 678-681 (map prompt, 'This is the first run where the whole tabs chain is live from the schema through to the merge').

**evidence:**

```
  $ python3 -c "import json;kg=json.load(open('output/kg-invoice-config.json'));p=[x for x in kg['nodes']['configPages'] if x['id']=='page.authorized-approval-limits'][0];print('tabs' in p)"
  False
The only two pages carrying tabs are page.forms-and-fields and page.workflows, and BOTH were written by hand: bin/apply-corrections.py:361 (VALUESET_TO_PAGE_TABS for forms-and-fields) and bin/apply-corrections.py:529 (a hard-coded seven-tab list for Workflows, with the comment at :523-526 'Page tabs the BUILD COULD NOT EMIT').

The code path itself IS present and correct — bin/assemble-parts.py:201-203 emits tabs/tabsSourceQuote/tabsSourceFile, and bin/merge-group.py:129-132 copies them. The reason AAL shows nothing is merge-group.py:131 `if p.get(key):` — a falsy [] is dropped, which is right for a single-window page. So the chain has been exercised only on the empty list; a non-empty list has never travelled it.
```

**why:** Not a defect in the toolchain — I traced all three links and they are wired. But the claim is load-bearing in the header's rationale for the run, and the script leans on it twice to justify not repeating Run A's hand-repair. If it turns out the chain does drop a non-empty list, the failure is silent (the page node simply has no tabs key, exactly as AAL looks today) and would be indistinguishable from a correct empty result. Worth a one-line post-merge assertion rather than trust.

**fix:** Change line 68 to: 'Proven only for the EMPTY case on Approval Authority - page.authorized-approval-limits carries no tabs key because merge-group.py:131 drops a falsy [], which is correct for a single-window page. A NON-EMPTY tabs list has never travelled this chain; the only two pages with tabs (forms-and-fields, workflows) were written by hand in apply-corrections.py:361 and :529. RUN B IS THE FIRST REAL TEST. After the merge, assert it: python3 -c "import json;kg=json.load(open(KG));print({p[\'id\']:p.get(\'tabs\') for p in kg[\'nodes\'][\'configPages\'] if p[\'id\'] in (\'page.email-reminders\',\'page.delegate-configurations\')})" must print two 2-element lists.' Add the same assertion to docs/RESUME-PROMPT.md next to the --patch-page flag.

---

## [medium] RB-13 :: Recon deliverable: my independent must-read lists and expected Email Reminders roster, versus the script's numbers

**where:** Compare against /mnt/c/Users/manci/PROJECTS/concur-config-diver-support/workflows/2026-09-01_kg-workflows-run-b.mjs line 115 ('~25 files ... ~37,000 B. Estimated ~25 fields') and line 121 ('17 files, ~33,000 B, estimated ~25 fields').

**evidence:**

```
FILE COUNTS, all three script claims tested:
  'Email Reminders ~25 files'  -> `grep -rliF "email reminder"` admin-guides = 25, tools-guides = 0. TRUE, but 5 of the 25 belong to already-built pages (see RB-06). TWENTY are primary, totalling 40,957 B (not ~37,000). A bare `reminder` sweep adds 3 more admin + 3 tools files, all foreign.
  'Delegate Configurations 17 files' -> `grep -rliF "delegate configuration"` = 14; `grep -rliF "delegate"` = 29 admin + 5 tools = 34. My PRIMARY set is 14 files / 31,241 B. The recon's 17 / 33,041 B is a superset that pulls in three end-user/proxy topics.
  'ZERO overlap between the two sets' -> CONFIRMED, and stronger than claimed: `comm -12` over `grep -rliF reminder` (37 files, all 4 corpus dirs) and `grep -rliF delegate` (34 files) returns EMPTY.

EMAIL REMINDERS MUST-READ, ranked (all admin-guides):
  PRIMARY-ROSTER: create-email-reminders-604c4a46.md (10,163 B, 15 field rows) | create-reminder-rules-b0a7fac5.md (3,979 B, 3 field rows + the 2-step wizard) | email-message-replacement-tokens-c9cc4af4.md (2,796 B, 4 tokens)
  IDENTITY:       access-email-reminders-96f3ca18.md (1,025 B, nav) | email-reminders-tool-8b2c8a11.md (1,096 B, role gate) | configuration-process-8b2c271f.md (2,330 B, the 4-step sequence + BOTH tab quotes + the scheduling handoff)
  PROCEDURE:      edit-email-reminders-2a2638ad.md (1,236) | copy-email-reminders-cb75f9fd.md (1,066) | delete-email-reminders-8f693700.md (1,175) | edit-reminder-rules-8f2edae9.md (1,145) | copy-reminder-rules-9350776e.md (999) | delete-reminder-rules-ab4f8d33.md (1,317)
  VALUE SETS:     pre-defined-rules-220a1fe7.md (1,119 B - TWO default rules, the recon quoted only one: 'Overdue Payment Request Approvals' AND 'Overdue Payment Vendor Approvals') | overview-8b2c769e.md (1,488 B - reminder types Overdue Disbursement, Approving)
  CONSTRAINTS:    before-you-begin-448d2513.md (987 B - third tab quote, rule-before-reminder) | configuring-email-reminders-8b2c3cca.md (1,151 B - 'A rule must be created before you create an email reminder') | scheduling-email-reminders-8b2ceaea.md (1,324) | localizing-email-reminder-text-8b2cc1b0.md (1,323) | best-practices-...-48515f40.md (1,317 B - the 2,000-char limit)
  HISTORY:        email-reminders-8b2caa99.md (3,921 B, 29 entries - classify, do not mine)
  FOREIGN (READ-ONLY): overview-8b2edfd0.md, add-groups-ec5d8d8b.md, work-with-the-steps-page-fab249d1.md, workflow-667cee21.md, about-vendor-approval-workflow-step-and-timeout-b3d1bd2c.md

MY EXPECTED EMAIL REMINDERS ROSTER - 21 controls (not ~25), + ~8 buttons/tabs if the Lens A charter's button rule is obeyed:
  Email Reminder window (15, all from create-email-reminders-604c4a46.md): Name; Reminder Type (3 values); Reminder Rule; Frequency (5 values: 'Daily (weekdays only)', 'Daily', 'Every x days', 'Specific days of the month', 'Once condition is met'); Number of Days (conditional on Frequency='Every x days'); Specific days (conditional on Frequency='Specific days of the month', 1-31 plus '>' for last day); Display as From ('The @ symbol is not permitted in this name.'); Email Subject (255 char max); Email Message (2,000 char max); Copy to Approver (Yes/No); Copy to Employee (Yes/No); Copy to Email Address; Editable By; Applies to; Active ('All email reminders are inactive by default.')
  New Reminder Rule - Step 1 (3, from create-reminder-rules-b0a7fac5.md): rule Name; rule Reminder Type (3 values, DIFFERENT list - see RB-11); rule Editable By
  Conditions - Step 2 (3, same file): Data Object; Field/Value; Operator
  Buttons/tabs attested: New, Modify, Remove, Copy, Save, Next, Finish, plus the Rules / Email Reminders tab selector.
Two conditional-visibility dependencies are corpus-stated ('This field appears only if you selected Every x days in the Frequency field.' / '...Specific days of the month...') and the script's dependency plan lists neither.
```

**why:** The ~25-fields figure is roughly right for Email Reminders but for the wrong reason — it only reaches 25 by counting buttons, and it hides the fact that 3 of the 21 controls are name-colliding twins (RB-04) and 3 more live on an unflagged wizard step (RB-09). On Delegate Configurations the same figure is actively harmful (RB-10). Both seeds present '~25' as a shared property of the two pages when the pages are structurally very different sizes.

**fix:** In line 115 replace 'Estimated ~25 fields' with 'TWENTY-ONE controls plus ~8 buttons/tabs. Independently derived: 15 on the Email Reminder window (create-email-reminders-604c4a46.md), 3 on New Reminder Rule - Step 1 and 3 on Conditions - Step 2 (create-reminder-rules-b0a7fac5.md). Two conditional-visibility dependencies are CORPUS-STATED and must be emitted: "This field appears only if you selected Every x days in the Frequency field." and "This field appears only if you selected Specific days of the month in the Frequency field."' In line 121 apply the RB-10 replacement. Also correct the pre-defined-rules note: that file names TWO default rules ('Overdue Payment Request Approvals' and 'Overdue Payment Vendor Approvals'), not one.

---

## [medium] F6 :: The orphaned token value set cannot auto-close — merge-group re-resolves dependencies only — and the Email Subject set must carry 3 values, not 4

**where:** /mnt/c/Users/manci/PROJECTS/concur-config-diver-support/output/kg-invoice-config.json — vset.g3.unnamed.email-message-replacement-tokens-the-4-row-variable-label-na; bin/merge-group.py:166-184 and :231-247; script line 115

**evidence:**

```
Its note, verbatim tail: "...Recorded so a later run does not rediscover it and wire it. ... WHAT WOULD FIX IT: SAP publishing the PO transmittal tooltip's own token roster, or an Email Reminders page node that owns this table properly. Until one exists, default_email_subject_when_transmitting_purchase_orders stays unenumerated and that is the correct answer."  MECHANISM: merge-group.py's re-resolution loop at :239 iterates n['configDependencies'] ONLY. configValueSets receive appliesToFieldId once, at insert (:167-172), and never again. This node's appliesToRef is {page:'', field:'', resolved:false}, group='Group 3 — PO Matching', patch=null, so a --patch merge tagged 'Workflows' does not touch it (simulation: configValueSets stayed at 115). apply-corrections wire_by_name skips it (`want` is empty) and resolve_orphan_sets has no key for ''. Nothing in the toolchain can close it as written.  COUNT: 4 is correct and complete for the message body — `grep -rlF '%5%' $CORPUS` returns nothing, `grep -rlF '%1%' $CORPUS` returns only this file, and the table has exactly four rows %1%..%4%.  BUT %4%'s own description reads "A list of the applicable object records found by the reminder rule query, based on pre-defined formats. This variable is not supported in the Email Subject field.", while create-email-reminders-604c4a46.md attaches the Helper pane to BOTH controls ("Use the variables available in the Helper pane to make the subject line more dynamic" and "...to make the message more dynamic"). Also: the file's cross-reference "refer to the Examples of List of Records section" has no target anywhere in the corpus (`grep -rl 'Examples of List of Records'` returns only this file).
```

**why:** The seed at line 115 tells the agent this page 'should close' the gap, but emitting a new owned value set does not supersede the old one: the graph would carry two records of the same four tokens, one still knownGap and still saying the fix does not exist. And a single 4-value set on the subject control would contradict the source — validate-graph's value-set-entries-not-in-file WARN cannot catch it, because %4% IS in the file.

**fix:** Emit TWO sets on the Email Reminders page, mirroring the Run A email_subject/email_body precedent: (a) on the message-body control, values ['%1%','%2%','%3%','%4%']; (b) on the subject control, values ['%1%','%2%','%3%'] ONLY, quoting the exclusion sentence verbatim in notes; both citing email-message-replacement-tokens-c9cc4af4.md, and both noting that the file's 'Examples of List of Records' cross-reference is dangling corpus-wide. THEN close the old node with a by-id note — add to bin/apply-corrections.py VALUESET_NOTE_APPEND_BY_ID: 'vset.g3.unnamed.email-message-replacement-tokens-the-4-row-variable-label-na': ' CLOSED 2026-09-01 (Workflows Run B): the Email Reminders page node this note asked for now exists and the table is owned properly at vset.gworkflowsw.<message-field>.<context> (4 values) and vset.gworkflowsw.<subject-field>.<context> (3 values; %4% is excluded from the subject by the source). This record stays as the Group 3 CITATION that default_email_subject_when_transmitting_purchase_orders must NOT borrow these tokens — that conclusion is unchanged and still correct.'

---

## [medium] F7 :: Using the group label "Workflows" as --patch-page arms a future Run C to silently delete every Run B dependency, step, value set, contradiction and range

**where:** bin/merge-group.py:72-90; docs/RESUME-PROMPT.md:77 and :88; script header lines 33-45

**evidence:**

```
merge-group.py:79 sets `tag = r.get('patchPage', ...)`, then :86-90 keep only nodes whose `patch != tag`. With --patch-page "Workflows", every node this run mints carries patch='Workflows'. A later patch under the same group that also passes --patch-page "Workflows" — which docs/RESUME-PROMPT.md:77 prescribes as the fixed incantation for this group — would strip all of them, while KEEPING Run B's pages and fields, because :80 and :83 filter on `touched` pageIds that a Run C would not include. validate-graph.py would exit 0 over the result: its only dependency invariant is dangling-id, and there would be no dependencies left to dangle.
```

**why:** Same asymmetry that produced the null-patchPage graph-wipe, one level down: the pages survive, so the loss looks like nothing happened. It does not affect THIS run — simulation confirms Run A's 43 steps, 454 deps and 115 value sets all survive — but this run's tag choice creates the hazard and the fixed incantation in the resume prompt makes reuse likely.

**fix:** Keep --patch-page "Workflows" for this run (changing it now breaks Run B's own re-run idempotency and shifts gtag off 'workflowsw'), and add one line to docs/RESUME-PROMPT.md beside the merge command at :88: 'PATCH TAG WARNING: every node Run B mints carries patch == "Workflows". A FUTURE patch under this group label must NOT reuse --patch-page "Workflows" unless it is rebuilding Email Reminders and Delegate Configurations — reusing it deletes their edges while leaving their pages, and the validator exits 0 over that. A Run C should pass a page-specific --patch-page and accept the different gtag.' Optionally harden merge-group.py: after the patch filters, print per-collection deltas and abort if any non-page collection loses more than it gains.

---

## [medium] F9 :: "Its OWN DISTINCT ROLE GATE" overstates the evidence: the Restricted role already gates a built Workflows tab, Company Locations and Account Codes, across 11 corpus files

**where:** /mnt/c/Users/manci/PROJECTS/concur-config-diver-support/workflows/2026-09-01_kg-workflows-run-b.mjs line 673 (Map prompt) and line 115 (email-reminders seeds)

**evidence:**

```
Line 673: "and its OWN DISTINCT ROLE GATE - \"Invoice Configuration administrator (Restricted)\" - which is exactly the discriminator that made Forms and Fields two pages. Confirm the gate."  Line 115: "### ROLE GATE, AND IT IS DISTINCT FROM THE WORKFLOWS GATE - this is the Forms-and-Fields discriminator, the thing that makes a separate page".  Counter-evidence already IN the graph: page.workflows.roleGates carries {'role': 'Invoice Configuration administrator (Restricted) — Reason Category and Codes tab only; CONTRADICTED by a July 2025 release note...', 'sourceQuote': 'The Invoice Configuration administrator (_Restricted_) role is required to use the options on this tab.'}; page.company-locations.roleGates carries 'Invoice Configuration (Restricted) administrator'; dep.g5.026 targets {'Administration > Company > User Administration', 'Invoice Configuration administrator (Restricted) role'} with condition 'The Account Codes tool is only available to a user assigned the Invoice Configuration administrator (Restricted) role.'  Corpus census: `grep -rlF "Invoice Configuration administrator (Restricted)"` = 9 files, plus 2 more in the markdown-italic form `(_Restricted_)` = 11 files, spanning Email Reminders, Account Codes, Shipping Configuration, the default policy for emailed invoices, the exception email address, and Reason Category and Codes.
```

**why:** The map agent is told to 'confirm the gate' and handed the conclusion in advance. It will write an identityNotes claim that the Restricted role is what separates Email Reminders from Workflows — which the built graph already contradicts, since that same role gates a tab OF Workflows. That is a false page-hood argument baked into a node future runs will cite. The page-hood conclusion is still right (own menu destination, own click path, own object model); the ROLE argument is the weak leg and must not be load-bearing.

**fix:** Change line 673 to: 'and a role gate stated for the tool in its own right — \"The Email Reminders tool is visible if you have the Invoice Configuration administrator (Restricted) role.\" (email-reminders-tool-8b2c8a11.md). ⚠ DO NOT CALL THIS ROLE DISTINCTIVE: it appears in 11 corpus files and already gates the built Workflows > Reason Category and Codes tab (see page.workflows.roleGates), Company Locations, and the Account Codes tool. What IS distinctive is that the gate is stated for THIS TOOL AS A WHOLE, while on Workflows the same role is scoped to a single tab. Say exactly that, and rest the page-hood verdict on the menu destination and the object model, not on the role string.'  Make the matching edit to the ROLE GATE clause of line 115.

---

## [low] B11 :: Lens A's topic-prefix list omits copy-*, one of the four documented CRUD verbs on both Email Reminders object types

**where:** 2026-09-01_kg-workflows-run-b.mjs:133

**evidence:**

```
Line 133 enumerates 'add-*, create-*, edit-*, editing-*, modify-*, modifying-*, delete-*, remove-*, access-*, accessing-*, configure-*, configuring-*, set-*, setting-*, use-*, using-*, work-with-*, working-with-*, step-N-*' — no copy-*. Unchanged from Run A. But ls over the corpus (ls admin-guides tools-guides | grep -iE 'remind|delegate') returns copy-email-reminders-cb75f9fd.md and copy-reminder-rules-9350776e.md, and the Email Reminders seed at line 115 says explicitly 'TWO OBJECT TYPES WITH FULL CRUD ON EACH... reminder RULES (create/edit/copy/delete) and email REMINDERS (create/edit/copy/delete)'. Also absent from the list: the gerund forms actually present here — scheduling-email-reminders-8b2ceaea.md and localizing-email-reminder-text-8b2cc1b0.md.
```

**why:** Lens A owns 'every control a human touches to complete a documented task'. A Copy button on each of the two object types is exactly a Lens A field, and the file-family glob it is handed does not name the topics that document it. The seeds contradict the charter on the same page, which is worse than either alone.

**fix:** Amend line 133 to include the missing prefixes: '...delete-*, remove-*, copy-*, copying-*, access-*, accessing-*, configure-*, configuring-*, schedule-*, scheduling-*, localize-*, localizing-*, set-*, setting-*, use-*, using-*, work-with-*, working-with-*, step-N-*, and any numbered-procedure topic.' Optionally add: 'ON THIS RUN copy-* is load-bearing: both Email Reminders object types document a full create/edit/copy/delete cycle (copy-email-reminders-cb75f9fd.md, copy-reminder-rules-9350776e.md).'

---

## [low] B12 :: Array elision at line 166 puts a hole in the Lens C charter, injecting a stray blank line mid-prompt

**where:** 2026-09-01_kg-workflows-run-b.mjs:165-166

**evidence:**

```
Line 165 is the rewritten Lens C opening string ending "...NEVER a field.'," and line 166 is a bare ",". cat -A confirms line 166 is exactly ',$'. JS array elision creates a hole. Verified by evaluating the LENSES literal in node: LENSES[2].charter.split('\n') returns 7 parts with parts[1] === '' — i.e. the charter reads 'LENS C - ... NEVER a field.' then a blank line then 'START in concur-invoice-professional-edition-tools-guides/...'. The other two charters have no hole. Neither ancestor has this comma (diff hunk 170c165,166 shows it was introduced with the rewrite).
```

**why:** Cosmetic only — join('\n') renders the hole as an empty string, so nothing is lost and nothing throws. But it is a leftover editing artefact sitting one line below the most heavily rewritten passage in the file, and it makes the paragraph break in the middle of a charter that is otherwise one instruction per line.

**fix:** Delete line 166 entirely (the bare ','). Line 165 already ends with its own comma.

---

## [low] B13 :: The synthesis receipts are destructured in the wrong order — stepRec receives contradictions and ctrRec receives steps

**where:** 2026-09-01_kg-workflows-run-b.mjs:1285 (destructuring) against the array order at :1338, :1412, :1464, :1525; consumed at :1528 and :1718-1723

**evidence:**

```
Line 1285: 'const [vsRec, depRec, stepRec, ctrRec] = await parallel([' — but the array elements are, in order, label 'synth:valueSets' (1338), 'synth:dependencies' (1412), 'synth:contradictions' (1464), 'synth:steps' (1525). So index 2 (contradictions) binds to stepRec and index 3 (steps) binds to ctrRec. Line 1528 then logs "steps=" + stepRec.count and "contradictions=" + ctrRec.count, and the return object at 1721-1722 sets synthesis.steps = stepRec and synthesis.contradictions = ctrRec. Present identically in both ancestors (2026-08-31_kg-workflows-run-a.mjs:1198 and 2026-09-01_kg-authorized-approval-limits.mjs:1305 have the same order), so it is inherited, not introduced.
```

**why:** The graph is unaffected — bin/assemble-parts.py composes from the parts directory on disk, not from the workflow return value (the script header says so at lines 12-16). But the console log and the human-facing summary swap two counts, and this run has an explicit expected step count ('Aim for 3 to 5 steps', line 1486). An operator reading 'steps=9' when nine contradictions were built, or 'steps=0' when the contradictions agent returned nothing, gets the wrong sanity check on the one number the run was told to hold down.

**fix:** Change line 1285 to 'const [vsRec, depRec, ctrRec, stepRec] = await parallel([' — matching the array order — and leave lines 1528 and 1718-1723 as they are, which then report correctly.

---

## [low] B14 :: The Map agent is told about "the URLs given below" when both PAGES entries carry url: ''

**where:** 2026-09-01_kg-workflows-run-b.mjs:653-657, against PAGES at :114 and :120

**evidence:**

```
Lines 655-657: 'The URLs given below came from live-UI observation recorded in an earlier handoff and CANNOT be corpus-verified. Do not try, and do not invent one. Use them only as the page identifier.' grep -n "    url:" returns line 114 "url: ''" and line 120 "url: ''". The same mismatch exists in both ancestors (Run A lines 119/125, AAL line 108), so it is inherited. The empty string also propagates into pageContext's header (line 819, '(id "...", url )') and into the roster output shape (line 1220, '"url": ""').
```

**why:** Harmless but it names a non-existent input in the first hundred words of the Map prompt. An agent that takes it literally may go looking for a URL, and the surrounding paragraph is the one that establishes navPath as load-bearing — the most important instruction in the phase should not open with a dangling reference.

**fix:** Replace 655-657 with: 'This run publishes NO URL for either page - the url field is deliberately empty. The corpus publishes no .asp URLs at all (zero hits corpus-wide for PolicyAdmin, auditRules, accountingAdmin, dcredirect). Do not hunt for one and do not invent one; navPath IS the identifier.'

---

## [low] B16 :: The header's "TO ADAPT FOR THE NEXT GROUP, change only" knob list is incomplete for the fourth generation running

**where:** 2026-09-01_kg-workflows-run-b.mjs:74-83

**evidence:**

```
Lines 74-78 list four knobs: PAGES, GROUP, step id prefix, PARTS. Lines 79-83 then admit 'AND THEN DIFF THE WHOLE FILE AGAINST ITS PARENT... This knob list has now been wrong or incomplete three generations running.' The diff shows this run in fact also had to rewrite ALREADY_BUILT (584-636), the Lens C charter (165-173), the Map navigation and inventory prompts (664-711, 757-785), refuter 2 item 6 (1103-1123), SYNTH_CONTEXT (1258-1283) and three synthesis prompts — and this audit finds it ALSO needed to rewrite the two Critic prompts, the Lens B charter, the value-sets prompt and the Repair bucket rules.
```

**why:** The knob list is the first thing the next author reads and it is the mechanism by which the stale-prompt failure keeps recurring. Saying 'the list has been wrong three generations running' while leaving the list unchanged guarantees a fourth.

**fix:** Replace 74-78 with the true list: '// TO ADAPT FOR THE NEXT GROUP you must touch ALL of these - the short list has been wrong four // generations running and this is what it actually takes: //   PAGES / GROUP / PARTS / the step-id prefix hard-coded in the Synthesize steps prompt //   ALREADY_BUILT - the built roster, the counts, and the boundary warnings //   ALL THREE LENS CHARTERS - each carries measured per-page census figures, not just Lens C //   Map navigation AND Map inventory - nav idioms, search terms, measured table counts //   Refuter 2 item 6 - the page-boundary charge, which is different every run //   The value-sets prompt - it needs a per-run calibration or it reaches for the Audit Rules example //   BOTH CRITICS - they are the last gate and they are the thing everyone forgets'.

---

## [low] B18 :: A third "email notification" surface sits unnamed inside the Delegate Configurations candidate set

**where:** 2026-09-01_kg-workflows-run-b.mjs:121 (Delegate seeds), :764 (mandated search terms include 'notification'), and the boundary blocks at :600-610 and :1117-1123 which name only two hazards

**evidence:**

```
ls over the corpus returns admin-guides/delegates-email-notification-7c866769.md (1,140 B). Its body: 'This topic describes how invoice approval email notifications are routed to delegates of the Approver role... Only a delegate representing the Approver role will receive email notifications associated with the pending approval for an invoice. The temporary delegate... will always automatically receive the approval invoice via email. The permanent delegate can choose whether to receive email based on their preferences in My Info.' The Delegate search-term list at line 764 mandates 'notification', so this file will surface. grep -n 'delegates-email-notification' over the script returns nothing — it is named nowhere in the seeds, ALREADY_BUILT, refuter 2 item 6/6b, or either critic.
```

**why:** It is a triple hazard sitting in the candidate set with no guard: it is END-USER routing behaviour ('based on their preferences in My Info'), not an admin control, so it is an END-USER vs ADMIN drop (extract prompt lines 967-969); its filename contains 'notification', so it can be mis-collapsed toward the built Workflows Email Notifications tab; and it is delegate-shaped, so it can be mis-emitted as a Delegate Configurations field. The run names its two known landmines by filename and this one gets nothing.

**fix:** Add to the Delegate Configurations seeds at line 121, after the delegate-self-approval sentence: '### AND A SECOND FILE TO CLASSIFY RATHER THAN MINE: delegates-email-notification-7c866769.md (1,140 B) will surface on the search term "notification". It is END-USER RUNTIME BEHAVIOUR - how approval mail is routed to a temporary vs a permanent delegate, with the permanent delegate choosing in My Info - not an admin control on this page, and NOT the Workflows Email Notifications tab either. Census it, classify it as end-user routing, cite it in notes if it constrains a delegate permission field, and emit NO field from it.' Also name it in the ALREADY_BUILT boundary block at 610 as a third distinct email surface.

---

## [low] F5 :: VALUE-SET-ID-COLLISION is advisory in assemble-parts but a hard ERROR in validate-graph, and every validValuesAddition shares a fixed context prefix that guarantees the collision

**where:** bin/assemble-parts.py:421-428 (the check), :499-502 (FATAL tuple omits it), :247-250 (the fixed context string); bin/validate-graph.py:65-68

**evidence:**

```
assemble-parts.py:248-250 gives EVERY materialised addition the same context prefix: `'Unconditional option list. The field record cites a topic that does not enumerate the options; this set carries the enumeration from the topic that does. '` — merge-group.py:170 slugs that to 60 chars, so the id is `vset.g<tag>.<field>.unconditional-option-list-the-field-record-cites-a-topic-tha` for all of them and only the FIELD differentiates.

Two validValuesAdditions on the same field, run on a disposable copy:
  $ python3 bin/assemble-parts.py parts-vva2/ out-vva2.json --journal ... --group "Workflows" --patch-page "Workflows"
  PRE-MERGE PROBLEMS: 2
     VALUE-SET-ID-COLLISION  rules-tab/unconditional-option-list-the-field-record-cites-a-topic-tha
  EXIT=0                       <-- not FATAL, the operator proceeds
  $ BUILD_DATE=2026-09-01 python3 bin/merge-group.py out-vva2.json "Workflows" --patch
  duplicate vset ids: ['vset.gworkflowsw.rules-tab.unconditional-option-list-the-field-record-cites-a-topic-tha']
  $ python3 bin/validate-graph.py ; echo $?
  ERROR: 1  duplicate-node-id 1
  1
```

**why:** The graph is written to disk before the only blocking check fires, so the operator has to re-run the merge to recover. This run is unusually likely to hit it: the Email Reminders seed explicitly hands the agents a 21-row replacement-token catalogue and an option-list-heavy page, and validValuesAdditions is the documented route for an enumeration whose topic differs from the field's own sourceFile — two of them on one field is an ordinary outcome, not an exotic one.

**fix:** In bin/assemble-parts.py, add 'VALUE-SET-ID-COLLISION' to the FATAL tuple at :499-502:

    FATAL = ('QUOTE-NOT-VERBATIM', 'MISSING-SOURCE-FILE', 'DUPLICATE-FIELD-NAME', 'EMPTY-FIELD-NAME',
             'VALUE-SET-ID-COLLISION',
             'CONTRADICTION-QUOTE-NOT-VERBATIM', 'CONTRADICTION-MISSING-FILE',
             'CONTRADICTION-UNDER-TWO-READINGS', 'CONTRADICTION-BAD-KIND',
             'RANGE-QUOTE-NOT-VERBATIM', 'RANGE-MISSING-FILE', 'RANGE-COUNT-MISMATCH')

and make the addition's context discriminating by appending the field name at :248, e.g. `'Unconditional option list for %s. ' % a.get('field')` followed by the existing text.

---

## [low] F6 :: The two body() basename fallbacks disagree, and only FIELDS get the CONCUR_INVOICE/ prefix stripped — value sets, deps, contradiction readings and ranges resolve only by luck

**where:** bin/assemble-parts.py:60 (`sorted(os.listdir(CORPUS))`) vs bin/validate-graph.py:43 (`os.listdir(CORPUS)`, unsorted); bin/assemble-parts.py:123-125 (prefix stripped in norm_field only) vs :231, :253, :275, :295, :306, :320 (`.lstrip('./')` only)

**evidence:**

```
assemble-parts.py:51 claims the helper "Mirrors bin/validate-graph.py exactly" — it does not: :60 iterates `sorted(os.listdir(CORPUS))`, validate-graph.py:43 iterates `os.listdir(CORPUS)` in filesystem order.

  $ find . -name '*.md' -printf '%f\n' | sort | uniq -d | wc -l   ->  64      # duplicate basenames across the 4 deliverable dirs

So for any sourceFile whose directory is wrong, the pre-merge check and the validator can each pick a DIFFERENT file and both report the quote verbatim.

And the prefix strip is field-only:
  $ python3 -c "..."  ->  configFields 18 unresolvable-path nodes ; configValueSets 13 unresolvable-path nodes
     e.g. vset.g2ar.field-value.budget | CONCUR_INVOICE/concur-invoice-professional-edition-admin-guides/the-condition-page-5d4ea870.md
All 31 live only through the basename fallback today (0 of them currently ambiguous, so nothing is wrong yet).
```

**why:** Run B spans BOTH guide directories and its synth agents write sourceFile for value sets, dependencies, contradiction readings and compressed ranges — the four collections that get no prefix strip. Any of those written as `CONCUR_INVOICE/...` (a shape 13 built value sets already have) lands with a path that does not resolve, and is then verified against whichever same-named file the unsorted listdir reaches first. That cements a wrong provenance into the graph while both tools report success — and provenance is the only thing this graph is for.

**fix:** 1. In bin/validate-graph.py:43 change `for d in os.listdir(CORPUS):` to `for d in sorted(os.listdir(CORPUS)):` so the two fallbacks agree.
2. In bin/assemble-parts.py hoist the strip out of norm_field into a helper and use it in all six places:

    def relpath(s):
        s = (s or '').lstrip('./')
        return s[len('CONCUR_INVOICE/'):] if s.startswith('CONCUR_INVOICE/') else s

   then replace `(x.get('sourceFile') or '').lstrip('./')` with `relpath(x.get('sourceFile'))` at :231, :253, :275, :295, :306 and :320, and use it at :119 in norm_field (deleting the special case at :123-125).
3. Optionally record an advisory problem when a path only resolves via the fallback, so the 31 legacy nodes get cleaned rather than quietly perpetuated.

---

## [low] RB-14 :: Verbatim-trap sweep: the known stray space is clean, but three more traps sit inside quotes this run must take

**where:** /mnt/c/Users/manci/PROJECTS/concur-config-diver-support/workflows/2026-09-01_kg-workflows-run-b.mjs lines 697-700 (map prompt VERBATIM TRAP block) — it names only the stray space.

**evidence:**

```
The known trap VERIFIES CLEAN as the script writes it:
  $ grep -cF 'Select Delegate Configurations (left menu) , the Delegate Configurations page appears.' access-and-view-payment-delegate-configurations-8ed1298f.md
  1
  hexdump: 6e 73 20 28 6c 65 66 74 20 6d 65 6e 75 29 20 2c   -> ASCII 0x20 before the comma, not NBSP. Safe to grep -F as written.

Three traps the block does not name:
  1. NBSP menu separators - see RB-02.
  2. Curly quotes and an EN DASH inside create-email-reminders-604c4a46.md, all in field descriptions an extractor will quote:
       line 105  Copy to Approver:  "the employee’s approver"                         (U+2019)
       line 125  Number of Days:    "then every “x days” as specified"            (U+201C/U+201D)
       line 212  Frequency:         "Within Today minus 59 – or use a status"         (U+2013 EN DASH, not a hyphen)
     $ grep -cP '[\x{2018}\x{2019}\x{201c}\x{201d}\x{2013}\x{2014}]' create-email-reminders-604c4a46.md  -> 3 lines
     All other primary files on both pages return 0 for curly quotes, em dashes and en dashes.
  3. Hierarchy separator drift between the pages: the reminder rosters write 'Global Group<NBSP> <NBSP>United States' while special-considerations-for-payment-delegate-configurations-77a887a4.md writes 'Global Group-United States' with an ASCII hyphen.
  4. Singular/plural drift INSIDE one file: create-a-new-invoice-delegate-configuration-fcf42662.md step 1 says 'On the Delegate Configurations page' and step 4 says 'Select Save to return to the Delegate Configuration page.' (Same-file, so it does not meet the contradiction bar on its own; edit-an-invoice-delegate-configuration-c7f51424.md gives the plural form from a second file if a reading is needed.)
```

**why:** The en dash at line 212 is exactly the character the Lens B charter and the compressedRanges rule warn about ('an en-dash is not a hyphen'), and it sits in the Frequency field's recommendation text — a quote a value-set agent is very likely to lift. The curly apostrophe and smart quotes sit in the Copy to Approver and Number of Days descriptions, both roster rows. Each costs a failed grep -F round trip, and the brief says this class cost real time on the last two runs.

**fix:** Extend the block at lines 697-700 with: 'MEASURED FOR THIS RUN. The stray space verifies clean exactly as written above (ASCII 0x20 before the comma - grep -F returns 1). Beyond it, only ONE file on either page carries smart punctuation: create-email-reminders-604c4a46.md holds U+2019 in the Copy to Approver description ("the employee’s approver"), U+201C/U+201D in Number of Days ("every “x days” as specified") and a U+2013 EN DASH in the Frequency recommendation ("Within Today minus 59 – or use a status") - reproduce that dash exactly, it is not a hyphen. Every other primary file on both pages returns 0 for curly quotes and dashes. Separator drift to record but not tidy: the reminder rosters write "Global Group<NBSP> <NBSP>United States" while special-considerations-for-payment-delegate-configurations-77a887a4.md writes "Global Group-United States" with an ASCII hyphen. Singular/plural drift inside create-a-new-invoice-delegate-configuration-fcf42662.md itself: step 1 says "the Delegate Configurations page", step 4 says "return to the Delegate Configuration page".'

---

## [low] F10 :: Name-collision surface: four exact-name collisions with the built Workflows page are likely, all legal, two of them unwise

**where:** /mnt/c/Users/manci/PROJECTS/concur-config-diver-support/output/kg-invoice-config.json (page.workflows, 114 fields) vs the rosters in create-email-reminders-604c4a46.md, create-reminder-rules-b0a7fac5.md and create-a-new-invoice-delegate-configuration-fcf42662.md; guidance would go at script line 934

**evidence:**

```
validate-graph.py:100-107 scopes duplicate-field-name PER pageId, so every cross-page reuse below is LEGAL. Built Workflows names a Run B page may plausibly reuse: (1) email_subject = field.workflows.email-subject — Email Reminders documents a literal 'Email Subject' field: LIKELY, legal, UNWISE, use reminder_email_subject. (2) email_body = field.workflows.email-body — the reminder control is 'Email Message': use reminder_email_message and do not 'normalise' it. (3) email_notification_display_as_from = field.workflows.email-notification-display-as-from — Email Reminders documents 'Display as From' verbatim: emit reminder_display_as_from; a bare display_as_from is free but invites collapsing the two. (4) editable_by_groups = field.workflows.editable-by-groups — 'Editable By' appears on BOTH Email Reminders tabs, so it must be rule_editable_by / reminder_editable_by anyway (see F2). (5) allow_delegated_approvers_to_approve_own_requests = field.workflows.allow-delegated-approvers-to-approve-own-requests — legal on Delegate Configurations but FORBIDDEN by the seed at line 121; the delegate permissions are 'Delegate can prepare / submit / approve (any time) / approve during specified period / view images'. (6) authorized_approver_approval_limit and restrict_approvers_limit_authority_employee_added_steps — Delegate Configurations' 'Restrict approvers to those with equal or higher authorized approver limit' is a DIFFERENT control: name it restrict_approvers_equal_or_higher_limit and emit a dependency. (7) btn_new_step / btn_save_step / btn_done_workflow — generic buttons; cross-page reuse is already routine (done_button on 3 pages, new_button on 3), so reuse is legal AND fine. Separately the Rules tab reuses AUDIT RULES vocabulary, not Workflows: field.audit-rules.data-object, .field-value, .operator, .editable-by, .active, .applies-to (see F3).
```

**why:** None of these fails the validator, which is exactly why they get through. The graph's own precedent — the NOTE_APPEND homonym note on field.feature-hierarchies.segment-name, and Run A naming modify_hierarchy_button specifically 'to keep the identical collision visible' — is that a deliberate cross-page homonym must be documented in notes or avoided outright. Reusing email_subject in particular would make the Email-Notifications-vs-Email-Reminders collapse look like a fact in the data.

**fix:** Add near line 934: 'CROSS-PAGE HOMONYMS ARE LEGAL AND STILL YOUR PROBLEM. Before finalising a name, grep output/kg-invoice-config.json for it. If it already exists on ANOTHER page, either prefix yours by object (reminder_email_subject, reminder_email_message, reminder_display_as_from, rule_editable_by, restrict_approvers_equal_or_higher_limit) or, for genuinely generic buttons only, reuse it and say so in notes. NEVER reuse email_subject, email_body, email_notification_display_as_from, editable_by_groups or allow_delegated_approvers_to_approve_own_requests — all five are built Workflows controls.'

---

## [low] F11 :: meta after the merge is IN_PROGRESS / 0.8.0 / groupsRemaining [Group 6, Group 7] — nothing in meta changes, so the graph carries no marker that Run B landed

**where:** bin/merge-group.py:249-258; /mnt/c/Users/manci/PROJECTS/concur-config-diver-support/output/kg-invoice-config.json meta

**evidence:**

```
Computed from code and confirmed by running merge-group.main() against a sandbox copy with a two-page patch result. `done = sorted({p['group'] for p in n['configPages']})` — both new pages carry group 'Workflows', already in `done`, so len(done) stays 7. Therefore version = '0.%d.0' % 8 = '0.8.0' (UNCHANGED); groupsComplete = the same seven labels ['Approval Authority', 'Group 1 — Policy & Scope', 'Group 2 — Routing & Approval', 'Group 3 — PO Matching', 'Group 4 — Capture & Vendors', 'Group 5 — Data Structure & Accounting', 'Workflows'], unchanged; groupsRemaining = ['Group 6 — Compliance / E-Invoicing', 'Group 7 — Ops (deferred)']; status = 'IN_PROGRESS' because one non-Ops label remains. Sandbox output verbatim: "status: IN_PROGRESS | groups complete: 7". lastUpdated comes from os.environ BUILD_DATE (merge-group.py:252), which docs/RESUME-PROMPT.md:88 sets to today — the same value it already holds.
```

**why:** Correct behaviour for a patch, but it means the pre-Run-B and post-Run-B graphs are indistinguishable by meta alone: same version, same groupsComplete, same status, and today the same lastUpdated. Anyone diffing or resuming has to count nodes to know whether the run landed, and a half-applied merge would be invisible.

**fix:** After the merge, append to meta.corrections (which already holds 'Group 4 critic: 3 page-binding corrections applied via bin/apply-corrections.py'): 'Workflows Run B: Email Reminders + Delegate Configurations merged with --patch --patch-page "Workflows" (2026-09-01); meta.version intentionally unchanged at 0.8.0 because the group label already existed.' Add that step to docs/RESUME-PROMPT.md next to the merge command, and use page count 23 -> 25 as the actual landing check.

---

## [low] F12 :: Four more nodes carry superseded build-state claims, three already falsified by Run A — clean them in the same apply-corrections pass

**where:** /mnt/c/Users/manci/PROJECTS/concur-config-diver-support/output/kg-invoice-config.json — page.budget-configuration (verifyNotes and identityNotes), vset.g5g5.unnamed.digital-tax-invoice-cfdi-validation-statuses-shown-to-the-pr (notes), page.feature-hierarchies (identityNotes), page.workflows (identityNotes)

**evidence:**

```
ALREADY FALSE since Run A (2026-08-31), never cleaned: page.budget-configuration.verifyNotes — "(b) events-triggers-72339a13.md documents the workflow event 'Payment Request Budget Submit' -- Workflows, NOT YET BUILT."; page.budget-configuration.identityNotes — "(b) events-triggers-72339a13.md documents a 'Payment Request Budget Submit' workflow event - belongs to Workflows, not yet built"; vset.g5g5.unnamed.digital-tax-invoice-cfdi-...notes — "...the Audit Rules page (built) and Workflows (not yet built)."  BECOMES STALE WITH THIS RUN: page.feature-hierarchies.identityNotes — "Own left-menu entry, one of only two unbuilt labels in the corpus-wide census: 'Click Feature Hierarchies (left menu).'" (the other was Delegate Configurations; both are single-hit (left menu) labels in critic-pagehood.md §1.1); page.workflows.identityNotes — "...it is DELEGATE CONFIGURATIONS (a Run B page), not Approval Statuses."
```

**why:** Individually cosmetic, collectively the same rot that forced the SCOPE CORRECTION pass on 2026-09-01. These are the notes a later run reads to decide what exists, and three of them state that Workflows — 114 fields, seven tabs — is unbuilt. Each costs one dict entry, and the correction machinery (NOTE_APPEND, VALUESET_NOTE_APPEND_BY_ID) already exists.

**fix:** Extend bin/apply-corrections.py NOTE_APPEND to accept page ids (or add a PAGE_NOTE_APPEND twin keyed by page id + key) and add: page.budget-configuration -> ' BUILD-STATE CORRECTION 2026-09-01: this note says Workflows is "not yet built". Workflows was built 2026-08-31 (page.workflows, 114 fields, seven tabs). The reasoning stands — the Payment Request Budget Submit event belongs there, not here — and the endpoint should now resolve or be repointed.'; page.feature-hierarchies -> ' BUILD-STATE CORRECTION 2026-09-01: "one of only two unbuilt labels" was true at the Run A census. The other, Delegate Configurations, was built by Workflows Run B. The own-left-menu-entry claim is unaffected.'; page.workflows -> ' BUILD-STATE NOTE 2026-09-01: "a Run B page" is now a BUILT page, page.delegate-configurations, under the same Workflows group label.'  And to VALUESET_NOTE_APPEND_BY_ID: 'vset.g5g5.unnamed.digital-tax-invoice-cfdi-validation-statuses-shown-to-the-pr' -> ' BUILD-STATE CORRECTION 2026-09-01: "Workflows (not yet built)" is stale — Workflows was built 2026-08-31. The set stays a deliberate knownGap for the reason given: these are runtime document states, not a config control''s options.'

# REFUTED

- **Run B pre-flight stale-content auditor:B9** Nothing downstream reviews the run's declared open identity question — the "Add Delegate Configuration - Invoice page" child window

- **--patch code-path auditor (merge-group / assemble-parts / apply-corrections / validate-graph), Workflows Run B pre-flight:F4** The Group 3 knownGap this run is instructed to close is structurally unclosable: no code path can ever re-point an orphan value set

- **Independent corpus recon + stale-passage audit for Workflows Run B (Email Reminders + Delegate Configurations):RB-09** Email Reminders has FOUR unflagged child surfaces of its own — including a two-step rule wizard — and the script poses the modal-vs-page question for Delegate Configurations only

- **graph-merge-impact:F2** Email Reminders' two tabs document the same three field labels, which is a FATAL DUPLICATE-FIELD-NAME abort at assembly, and nothing in the file warns of it

- **graph-merge-impact:F5** dep.g1.059 will NOT resolve, the "do not contort" call is right, and the correct repoint target is "Applies to Groups" — but nothing schedules the correction

- **graph-merge-impact:F8** The child-window page-hood question is asked only for Delegate Configurations; Email Reminders has three child surfaces the corpus also calls "page"

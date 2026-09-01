# Pre-flight audit — Approval Authority build (run wf_4ed79cf0-9f6)
counts: {"raw": 76, "verified": 73, "survivors": 71, "refuted": 2}

## Auditor headlines
- stale-content-audit / 2026-09-01_kg-authorized-approval-limits.mjs: The "one thing to change" claim is false by a wide margin: `diff` shows only 19 hunks, all but six confined to lines 1-126, so essentially every agent-facing prompt from line 127 to 1588 is verbatim Run A (and, in three places, verbatim Group 3) text. The worst instance tells all six prompt sites that Administration > Company is OUT OF SCOPE FOR THE WHOLE GRAPH and that "The Authorized Approval Limits window ... is NOT a page for you to build" — the run would be instructed not to build the page it exists to build. The same constant also omits Workflows (114 fields) and Feature Hierarchies (7) from the built-pages list while calling Feature Hierarchies "this run", so the one page this build must draw a boundary against is invisible to every agent. 23 findings, 6 blockers.
- toolchain-code-path-audit: The gtag path itself is CLEAN and proven by execution: `slug("Approval Authority")` = `approval-authority`, assemble-parts and merge-group agree exactly, nothing in bin/ splits/regexes/sorts node ids so the first hyphenated gtag in project history is safe, ALL_GROUPS already carries the label, status stays IN_PROGRESS at v0.8.0, and a one-page / zero-field result assembles, merges, corrects and validates at exit 0 with zero collateral change to the other 22 pages. But I ran the full pipeline in a sandboxed copy against six crafted inputs and found SIX silent-loss paths that this specific run can reach, four of which end with validate-graph.py printing "ERROR: none" and exiting 0 over a damaged graph. The worst: `merge-group.py --patch` on this run's own result deletes 321 dependencies, 29 steps, 77 value sets, 36 contradictions and 7 ranges and then validates clean — and both handoffs assert the opposite ("--patch strips nothing — verified against merge-group.py:62-76").
- Independent corpus recon — Authorized Approval Limits / group "Approval Authority": My independent roster lands at 7-8 fields, confirming the brief's "roughly seven" — but the 5-file seed list is missing the three files that actually DECIDE the run, and one of them (aae69350) flatly contradicts a seeded primary with "Levels cannot be added to approvers via User Administration." Separately, the NBSP instruction at script:640-641 is unrunnable as written: grep here is ugrep 7.8.4, where -P '\xc2\xa0' silently returns 0 across a corpus that genuinely contains 1,729 NBSPs.
- landing-auditor (graph-impact): The merge does NOT resolve either forward reference and the toolchain cannot make it: apply-corrections.py's repoint_endpoints never writes ref['page'], so a cross-page retarget silently un-resolves on the next merge (proven by simulation). Worse, the build script still tells its own agents at :578-583 and :1282 that Authorized Approval Limits "is NOT a page for you to build" — so it will mint FRESH stale scope text on top of the 5 nodes already carrying the superseded 2026-08-31 decision (dep.gworkflows.046 :17992, dep.gworkflows.060 :18287, two step rationales :23501/:23711, one value-set note :26229), none of which any correction op can reach because apply-corrections.py has no operation for a dependency `condition` or a step `rationale`. The conditional-visibility edge WILL be duplicated (de-dup keys on the full targetRef dict incl. the `resolved` flag — verified False). And dep.gworkflows.046 must NOT be retargeted: its 'approver' is the User Administration user-profile assignment, a control that appears nowhere in either primary for this window. Validator claim CONFIRMED — it checks quotes against files and never controls against pages (49 cross-page duplicate labels and 13 duplicate names already sit at exit 0). Meta lands correctly at 0.8.0 / IN_PROGRESS / 7 groups.
- tabs-chain / schemas / script-executability: Script PARSES CLEAN and is free of forbidden APIs and TypeScript; patchPage is genuinely absent; every returned path matches a prompt write target; group_tag("Approval Authority", None) proves 'grpapproval-authority-' exactly as the prompts demand; the zero-candidate and zero-keep branches are both shape-correct. But `diff` proves only EIGHT semantic edits were made to a 1,605-line parent — every schema is byte-identical to Run A, so tabs-chain link 1 (NAV_SCHEMA) is still broken exactly as assemble-parts.py's own comment predicted, and the entire prompt corpus below line 486 is still Run A's, including an ALREADY_BUILT block injected into all six agent families that explicitly forbids building this page.

# SURVIVORS

---

## [blocker] ALREADY_BUILT tells all six prompt sites that this page is OUT OF SCOPE and must NOT be built

**id:** `already-built-out-of-scope`  **auditor:** stale-content-audit / 2026-09-01_kg-authorized-approval-limits.mjs  **split-vote:** False

**where:** workflows/2026-09-01_kg-authorized-approval-limits.mjs:578-583 (constant), injected at :652, :711, :880, :956, :1172, :1440

**evidence:**

```
awk 'NR>=578 && NR<=583' →
  'OUT OF SCOPE FOR THE WHOLE GRAPH, decided 2026-08-31: surfaces under Administration > COMPANY.'
  'All 20 built pages sit under Administration > Invoice, and five prior groups met User Administration /'
  'User Permissions eight times and left every one an unresolved endpoint. The Authorized Approval Limits'
  'window (Administration > Company > Company Admin > User Administration) is REAL and DOCUMENTED - see'
  'user-administrator-fcfd570c.md - but it is NOT a page for you to build. Write forward references to it'
  'and let them stay unresolved.'
grep -n 'ALREADY_BUILT' → 554 (def), 652, 711, 880, 956, 1172, 1440 — i.e. Map/nav, Map/inventory, Extract (x3 lenses x1 page), Verify (shared, both refuters), SYNTH_CONTEXT (all four synth agents), CRITIC_CONTEXT (both critics).
```

**why it matters:** Every agent in the run is handed an explicit instruction not to build the page. The Map agent can legitimately return documentedBasis 'none'; the refuters have a standing licence to drop every candidate with correctPage='out of scope'; the dependency agent will write forward references instead of resolving them. The most likely outcome is a zero-field or near-zero-field page node plus a critic that correctly reports the node should never have existed — a wasted ~20-agent run that also directly contradicts Luke's 2026-09-01 scope call and the corpus evidence in tools-guides/workflow-and-approval-routing-8b4ff6c9.md.

**proposed fix:** Delete lines 578-583 outright and replace with the reversed decision, phrased so no agent re-litigates it:
  'SCOPE NOTE, CORRECTED 2026-09-01 AND NOT UP FOR RE-LITIGATION: an earlier decision treated surfaces',
  'under Administration > Company as out of scope for this graph. THAT DECISION IS REVERSED. It used MENU',
  'LOCATION as a proxy for PRODUCT SCOPE; navPath is a navigation fact and says nothing about which',
  'product a control configures. Authorized Approval Limits configures Concur Invoice through the NON-PO',
  'capability - a PO-based invoice carries approval authority on the PO, a non-PO invoice has none, so the',
  'approver limit IS the authority (tools-guides/workflow-and-approval-routing-8b4ff6c9.md). It IS the page',
  'you are building. Record the click path faithfully - a driver needs it - but never write "out of scope"',
  'about this page in any note. The FIRST page in this graph not reached under Administration > Invoice.'
Note that two graph nodes (dep.gworkflows.046, dep.gworkflows.060) still carry the reversed decision in their condition text — see finding 'graph-debt-reversed-decision'.

> **refuter verdict:** refuted=False conf=high severity=blocker
> fix: As proposed for :578-583 — the replacement text is accurate and correctly refuses re-litigation. Two amendments make it complete:  (a) INCOMPLETE AS WRITTEN: the finding's own goal ("phrased so no agent re-litigates it") is not met by editing :578-583 alone, because the dependency-synth prompt independently restates the reversed decision at :1281-1285, in text that is NOT part of ALREADY_BUILT:     'An edge into a page that is NOT YET BUILT (Email Reminders, Delegate Configurations, Peppol, Shipping,'     'Localization, and Administration > Company surfaces such as the Authorized Approval Limi
> OBSERVATION — fully reproduced, exactly as stated.
> 
> 1) The text exists verbatim at the stated lines.
> `awk 'NR>=550 && NR<=600'` on /mnt/c/Users/manci/PROJECTS/concur-config-diver-support/workflows/2026-09-01_kg-authorized-approval-limits.mjs prints, inside `const ALREADY_BUILT = [` (opens :554, closes `].join('\n')` at :584):
>   578: 'OUT OF SCOPE FOR THE WHOLE GRAPH, decided 2026-08-31: surfaces under Administration > COMPANY.',
>   579: 'All 20 built pages sit under Administration > Invoice, and five prior groups met User Administration /'
>   580: 'User Permissions eight times and left every one an unresolved endpoint. The Authorized Approval Limits'
>   581: 'window (Administration > Company > Company Admin > User Administration) is REAL and DOCUMENTED - see'
>   582: 'user-administrator-fcfd570c.md - but it is NOT a page for you to build. Write forward references to it'
>   583: 'and let them stay unresolved.',
> Character-for-character as quoted in the finding.
> 
> 2) The six injection sites are exact.
> `grep -n 'ALREADY_BUILT'` → 554 (def), 652, 711, 880, 956, 1172, 1440. No others. Context confirms the role attribution: :652 Map/navigation agent, :711 Map/inventory agent, :880 the three-lens Extract `parallel(LENSES.map(...))`, :956 the `const shared` block for the two refuters (stage-2 comment at :903 "VERIFY, two perspective-diverse adversarial refuters"), :1172 inside `const SYNTH_CONTEXT` (:1160), consumed at :1217/:1289/:1332/:1372 = four synth agents, :1440 inside `const CRITIC_

> **refuter verdict:** refuted=False conf=high severity=blocker
> fix: Replace lines 578-583, but scope the reversal to THIS PAGE and preserve the neighbour guardrail and the unresolved-endpoint discipline the proposed fix drops:    'SCOPE, CORRECTED 2026-09-01 AND NOT UP FOR RE-LITIGATION. An earlier note treated the Authorized',   'Approval Limits window as out of scope because its click path runs through Administration > Company.',   'THAT REASONING WAS WRONG FOR THIS PAGE and is reversed: it used MENU LOCATION as a proxy for PRODUCT',   'SCOPE. navPath is a navigation fact and says nothing about which product a control configures.',   'Authorized Approval Lim
> OBSERVATION CONFIRMED, and the consequence is not speculative — it is empirically demonstrated on disk.
> 
> 1. The text and its reach.
> `awk 'NR>=578&&NR<=583'` returns the six lines exactly as quoted; `grep -n 'ALREADY_BUILT'` returns 554 (def) + 652, 711, 880, 956, 1172, 1440. Confirmed all six are prompt-string array members, not comments.
> 
> 2. The counterweight — I looked for a downstream guard, and there is a partial one.
> `grep -n 'const PAGES' -A 40` shows `p.seeds` (line 109) carries an explicit pre-emption: "THIS PAGE IS OUT OF THE INVOICE MENU BUT IT IS NOT OUT OF INVOICE SCOPE - do not confuse the two." `pageBrief` (552) = seeds, injected at 655 and 714 — three lines after ALREADY_BUILT at 652/711. `pageContext(p)` (735-740) embeds `p.seeds` at line 740, injected at 878 (before ALREADY_BUILT@880) and 958 (after ALREADY_BUILT@956). SYNTH_CONTEXT gets a weak counterweight at 1174 ("Page names for THIS run … 'Authorized Approval Limits'").
> So 5 of 6 sites do carry an adjacent contradiction. That is why this is not a guaranteed zero-field page.
> 
> BUT — `awk 'NR>=1410&&NR<=1441' | grep -c seeds` returns **0**. CRITIC_CONTEXT (1425-1441) carries only `jstr(digest)` and file paths. **Both critics — the last gate, opus/xhigh, at 1483 and 1533 — receive "it is NOT a page for you to build" with NOTHING contradicting it**, and critic prompt item 7 (1470-1473) explicitly instructs: "For any page recorded as thin or zero-field … say whether the node should exist - last run a zero-hit 

---

## [blocker] ALREADY_BUILT omits Workflows and Feature Hierarchies from the built list and calls Feature Hierarchies "this run"

**id:** `already-built-omits-workflows`  **auditor:** stale-content-audit / 2026-09-01_kg-authorized-approval-limits.mjs  **split-vote:** False

**where:** workflows/2026-09-01_kg-authorized-approval-limits.mjs:555-561, :565-571, :576-577

**evidence:**

```
Script says (:556-561) built = Groups 1-5 only; (:568) 'Feature Hierarchies (this run)'; (:576-577) 'It holds 20 pages / 486 fields and is ERROR-clean at 486/486 verbatim quotes. This run adds two NEW pages'.
Ground truth, python3 over output/kg-invoice-config.json:
  PAGES 22 FIELDS 607
  page.feature-hierarchies   Workflows   7
  page.workflows             Workflows   114
  meta.groupsComplete includes "Workflows"
So the built list is missing exactly the two pages built most recently.
```

**why it matters:** The Workflows page is the ONLY page this run must draw a boundary against — it already owns field.workflows.authorized-approver-approval-limit ('Approval Limit'), -level ('Level'), -can-approve-exception ('Can approve exception') and -list-approver ('Approver'). ALREADY_BUILT is the constant whose entire job is 'do not rebuild, do not duplicate, and never re-home their fields', and it does not name the page. Refuter 2's cross-page-collision check (:1010-1012) and the correctness critic's collision check (:1512-1515) both operate against a list that omits the colliding page. Telling an agent Feature Hierarchies is 'this run' invites it to emit Feature Hierarchies fields a second time. A duplicate is invisible to bin/validate-graph.py.

**proposed fix:** Rewrite :555-577 as:
  'Pages ALREADY IN THE GRAPH (do not rebuild, do not duplicate, and never re-home their fields):',
  '  Group 1: Policies, Group Configurations, Invoice Settings',
  '  Group 2: Audit Rules, Routing Configuration, Exceptions',
  '  Group 3: Purchase Order Matching Rules, Purchase Order Configuration',
  '  Group 4: Capture Processing Admin, Vendor Search Admin, Image Handling, Units Of Measure',
  '  Group 5: Expense Types, Forms and Fields, Accounting Administration, Map Invoice Concept Fields,',
  '            Tax Administration, Budget Configuration, List Management, Company Locations',
  '  Workflows: WORKFLOWS (114 fields, ONE page with SEVEN TABS) and Feature Hierarchies (7 fields).',
  'WORKFLOWS IS THE PAGE THIS RUN COLLIDES WITH AND YOU MUST READ ITS FIELDS BEFORE YOU EMIT ANYTHING.',
  'On its Authorized Approvers > Authorized Approver List tab it already carries, all from',
  'admin-guides/authorized-approver-list-a9522ec8.md:',
  '  field.workflows.authorized-approver-approval-limit      label "Approval Limit"',
  '  field.workflows.authorized-approver-level               label "Level"',
  '  field.workflows.authorized-approver-can-approve-exception  label "Can approve exception"',
  '  field.workflows.authorized-approver-list-approver       label "Approver"',
  'It ALSO already owns three fields from procedure-2d20b513.md, one of THIS page\'s candidate sources:',
  'authorized_approver_feature_available_for_workflows, minimum_exception_level, maximum_exception_level.',
  'NOT yet built (a dependency may legitimately point at one of these and stay unresolved):',
  '  Email Reminders and Delegate Configurations (WORKFLOWS RUN B - next run, do NOT build them here),',
  '  Peppol Configuration, Shipping Configuration, Localization (Group 6).',
  'The full graph is on disk at ' + KG + ' - read it with python3 when you need exact page or field names.',
  'It holds 22 pages / 607 fields and is ERROR-clean at 607/607 verbatim quotes. This run adds ONE NEW page',
  'and must not rebuild or re-home anything already in it.'
Delete :565-574 entirely (the retired-13-figure paragraph and the recon roster pointer) — see finding 'already-built-13-pages'.

> **refuter verdict:** refuted=False conf=high severity=blocker
> fix: As proposed, with three corrections.  1) Use the graph's real field ids, which are HYPHENATED, not underscored. The proposed fix (and the seed at :109) writes `authorized_approver_feature_available_for_workflows, minimum_exception_level, maximum_exception_level`; the nodes are `field.workflows.authorized-approver-feature-available-for-workflows`, `field.workflows.minimum-exception-level`, `field.workflows.maximum-exception-level`. An agent grepping the underscored strings against the graph finds nothing and may conclude the fields are unbuilt — reintroducing the exact duplication the paragraph
> REPRODUCED, every clause, at the exact stated lines.
> 
> 1) The offending text exists verbatim. `awk 'NR>=554 && NR<=585' workflows/2026-09-01_kg-authorized-approval-limits.mjs`:
>  - :555-561 the built list runs "Group 1:" through "Group 5: ... Company Locations" and stops. Workflows and Feature Hierarchies are absent.
>  - :568 literally reads `'page, SEVEN TABS), Feature Hierarchies (this run), plus Email Reminders and Delegate Configurations',`
>  - :576-577 literally read `'It holds 20 pages / 486 fields and is ERROR-clean at 486/486 verbatim quotes. This run adds two NEW',` / `'pages and must not rebuild or re-home anything already in it.',`
> 
> 2) Ground truth contradicts all three, python3 over output/kg-invoice-config.json (note: nodes is a dict of buckets, not a flat list — the finding's shape was slightly off but its numbers are right):
>    `{'configPages': 22, 'configFields': 607, ...}`; per-page counts give `page.feature-hierarchies | Feature Hierarchies | grp= Workflows | n= 7` and `page.workflows | Workflows | grp= Workflows | n= 114`; `meta.groupsComplete` ends with `"Workflows"`. `python3 bin/validate-graph.py` prints `quotes verbatim in cited file: 607/607 (100.0%)`, `ERROR: none`, EXIT=0. So 22/607 and 607/607 are correct and 20/486 is stale by exactly the two most recently built pages.
> 
> 3) PAGES in this script (:104-111) contains exactly ONE entry, id `authorized-approval-limits`. So ":568 this run" and ":576-577 two NEW pages" are not merely stale, they are false abou

> **refuter verdict:** refuted=False conf=high severity=medium
> fix: Keep the fix's replacement figures — 22 pages / 607 fields / 607-of-607 verbatim / ERROR-clean are all verified by bin/validate-graph.py. Apply with three changes:  1. Rewrite ALREADY_BUILT as ONE edit spanning :555-583, not :555-577. Removing :578-583 ('...it is NOT a page for you to build') is not optional here: leaving it produces a constant that declares this run's only page unbuildable directly under a line saying the run adds it. If the sibling finding covering :578-583 is not being applied in the same commit, this fix must absorb it.  2. Keep :572-574 (the roster.md pointer). Delete onl
> OBSERVATION AND LINE CITATIONS: CONFIRMED EXACTLY.
> `grep -n "" ...2026-09-01_kg-authorized-approval-limits.mjs | sed -n '540,600p'` shows ALREADY_BUILT at :554-584. :556-561 lists Groups 1-5 only. :568 reads 'Feature Hierarchies (this run)'. :576-577 reads 'It holds 20 pages / 486 fields ... This run adds two NEW / pages'.
> 
> GROUND TRUTH: CONFIRMED. `python3` over output/kg-invoice-config.json (graph is {meta,nodes}, not {pages,fields}) gives configPages 22 / configFields 607; page.workflows and page.feature-hierarchies both present with group 'Workflows'; meta.groupsComplete includes 'Workflows'. All four named colliding fields exist verbatim: field.workflows.authorized-approver-approval-limit / -level / -can-approve-exception / -list-approver. `python3 bin/validate-graph.py` -> 'pages 22 | fields 607', 'quotes verbatim in cited file: 607/607 (100.0%)', 'ERROR: none', EXIT=0. So the fix's replacement figures (22 / 607 / 607-of-607 / ERROR-clean) are all VERIFIED CORRECT — the fix introduces no new false claim there.
> 
> BUT THE FINDING'S STATED CAUSAL MECHANISM IS FALSE ON TWO OF ITS THREE LEGS:
> 
> (1) 'Refuter 2's cross-page-collision check (:1010-1012) and the correctness critic's collision check (:1512-1515) both operate against a list that omits the colliding page.' — NOT TRUE. :1010 reads 'CROSS-PAGE COLLISION. Read the existing graph at ' + KG + ' (python3). Does a field with this name already exist on a DIFFERENT page?' :1516 reads 'DUPLICATE NAMES. Within each page, and ac

---

## [blocker] The Map/navigation prompt instructs the agent to confirm the Workflows seven-tab roster and emit seven tabs — for a one-page run, into a schema that forbids `tabs`

**id:** `map-nav-seven-tabs`  **auditor:** stale-content-audit / 2026-09-01_kg-authorized-approval-limits.mjs  **split-vote:** False

**where:** workflows/2026-09-01_kg-authorized-approval-limits.mjs:612-639 (stale block); NAV_SCHEMA at :253-309

**evidence:**

```
awk 'NR>=612 && NR<=634':
  'PAGE IDENTITY IS A REAL QUESTION... Ask the same question of both pages here. A dedicated recon already settled the page-hood of both (report at output/reports/2026-08-31_workflows-recon/)...'
  '  (a) WORKFLOWS IS ONE PAGE WITH SEVEN TABS - the Audit Rules precedent...'
  '  (b) The seven tabs are Workflows, Settings, Email Notifications, Approval Statuses, Authorized Approvers, Confirmation Agreements, Reason Category and Codes...'
  '  (c) FEATURE HIERARCHIES IS A SEPARATE PAGE, a sibling of Workflows...'
  '  (d) All three settings tables (Invoice / Purchase Request / Purchase Order Settings) live on Workflows > Settings tab...'
  'EMIT THE SEVEN TABS AS PAGE-LEVEL DATA - tabs, tabsSourceQuote, tabsSourceFile, plus one navPathAlternates entry per tab and sub-tab...'
  ':635-639 records Workflows-only nav-depth and label contradictions.
NAV_SCHEMA (:255 additionalProperties:false; :263-303 properties) declares NO `tabs`, `tabsSourceQuote`, `tabsSourceFile` or `navPathAlternates` property. Confirmed independently by docs/2026-09-01_HANDOFF-APPROVAL-AUTHORITY-AND-RUN-B.md JOB 2 item 2.
```

**why it matters:** The single most expensive prompt in the run (opus/high) spends its budget confirming a four-page roster that is already built and irrelevant, and is then ordered to emit structured data the schema will reject — a guaranteed dead end that will either burn retries or produce a confused narrative. Worse, item (c) primes the agent to record 'Invoice Processing Admin' as UNATTESTED-not-absent for a page whose path never touches Administration > Invoice at all.

**proposed fix:** Replace :612-639 with the page-identity question that actually exists here, all quotes grep -F verified against the corpus:
  'PAGE IDENTITY IS A REAL QUESTION HERE AND IT IS NOT THE USUAL ONE. This page is ONE WINDOW reached from',
  'a LINK on a page you are NOT building (User Administration). Two questions you must answer:',
  '  (a) IS THIS ONE SURFACE OR TWO? user-administrator-fcfd570c.md documents TWO mutually exclusive',
  '      branches. Global group only -> an "Authorized Approver check box" appears inline in User',
  '      Administration and reveals "the Manager Approval Limit field and the Approval Limit Currency list".',
  '      Hierarchy with at least one non-Global level -> an "Authorized Approval Limits" LINK appears and',
  '      "The Authorized Approval Limits window appears." Decide, out loud, whether the inline checkbox',
  '      branch belongs on this page node or is a User Administration control you only reference. Say why.',
  '  (b) DOES THE LINK BELONG TO User Administration OR IS THE WINDOW ITS OWN SURFACE? Record the click path',
  '      to the LINK and the window as separate navPathEvidence entries.',
  'THE CLICK PATH CONTRADICTS ITSELF INSIDE ONE FILE and you must record both, not reconcile:',
  '  4-segment: "in Administration > Company > Company Admin > User Administration" (fcfd570c, twice)',
  '  2-segment: "The settings that appear in User Administration (Administration > User Administration) differ" (fcfd570c)',
  'THE ACTIVATION GATE ALSO CONTRADICTS ITSELF ACROSS THE TWO PRIMARIES:',
  '  fcfd570c: "If the Authorized Approver feature is activated and the company\'s Authorized Approver',
  '  hierarchy has at least one level (in addition to Global), then the Authorized Approval Limits link appears"',
  '  user-administration-8b167b96.md: "When the Cost Object Approver feature is activated, the Authorized',
  '  Approval Limits link appears in the Expense and Invoices Settings section in User Administration."',
  '  AUTHORIZED APPROVER vs COST OBJECT APPROVER. Emit as a contradiction node. Note also the section name',
  '  drifts: "Expense and Invoices Setting" (fcfd570c) vs "Expense and Invoices Settings" (8b167b96).',
  'THE ROLE GATE HAS THREE CONDITIONS, NOT TWO. "the user must have the User Admin rights and the Invoice',
  'User Administration rights" for the checkbox; for the LINK, fcfd570c adds "In addition, the employee must',
  'be an approver." Capture all three.',
  'DO NOT EMIT `tabs`. This page has none, and NAV_SCHEMA (additionalProperties:false) has no such property.'
Keep :640-642 (the NBSP hazard) verbatim — see finding 'preserve-nbsp'.

> **refuter verdict:** refuted=False conf=high severity=blocker
> fix: As proposed, with two amendments.  (1) Add the fourth wording drift the fix currently misses. fcfd570c states the role gate TWICE with different subjects, one per branch, each exactly 1 hit under grep -F:   checkbox branch (:36): 'the user must have the User Admin rights and the Invoice User Administration rights'   link branch (:57): 'the administrator must have the User Admin rights and the Invoice User Administration rights' The fix text attributes only the 'user' form and then says 'for the LINK, fcfd570c adds "In addition, the employee must be an approver."' — true, but an agent told to g
> REPRODUCED EXACTLY. Every quoted string in the finding is present verbatim at the stated lines.
> 
> 1) The stale block exists, 612-639, verbatim as quoted. `awk 'NR>=612 && NR<=642' /mnt/c/Users/manci/PROJECTS/concur-config-diver-support/workflows/2026-09-01_kg-authorized-approval-limits.mjs` returns:
>   :614-615 'Ask the same question of both pages here. A dedicated recon already settled the page-hood of both (report at output/reports/2026-08-31_workflows-recon/)'
>   :619 '(a) WORKFLOWS IS ONE PAGE WITH SEVEN TABS - the Audit Rules precedent.'
>   :623-625 '(b) The seven tabs are Workflows, Settings, Email Notifications, Approval Statuses, Authorized Approvers, Confirmation Agreements, Reason Category and Codes'
>   :626-628 '(c) FEATURE HIERARCHIES IS A SEPARATE PAGE... record that node UNATTESTED, not absent.'
>   :629-631 '(d) All three settings tables ... live on Workflows > Settings tab.'
>   :632-634 'EMIT THE SEVEN TABS AS PAGE-LEVEL DATA - tabs, tabsSourceQuote, tabsSourceFile, plus one navPathAlternates entry per tab and sub-tab'
>   :635-639 Workflows-only nav-depth and tab-label contradictions ('Authorized Approvers under FIVE labels' etc.)
>   :640-642 the NBSP hazard, exactly as the finding says to preserve.
> 
> 2) 'for a one-page run' is confirmed. `awk '/^const PAGES/,/^\]/'` shows PAGES (:104-111) holds exactly ONE entry, id 'authorized-approval-limits'. :590 logs 'Authorized Approval Limits - mapping 1 page'. So ':614 both pages' and the four-page roster at :619-631 have no ref

> **refuter verdict:** refuted=False conf=high severity=blocker
> fix: As proposed, with ONE mandatory strengthening of the final line. The proposed closing line ("DO NOT EMIT `tabs`. This page has none, and NAV_SCHEMA (additionalProperties:false) has no such property.") closes the harmless channel and leaves the harmful one open — the schema blocks `tabs`, but nothing blocks tab paths arriving as navPathEvidence, which merge-group.py:96 then promotes to PRIMARY because it ranks by len(navPath) first. Replace that line with:    'DO NOT EMIT `tabs`. This page has none, and NAV_SCHEMA (additionalProperties:false) declares no',   'such property. DO NOT emit a navPat
> OBSERVATION VERIFIED (exact lines).
> `awk 'NR>=595&&NR<=660'` on 2026-09-01_kg-authorized-approval-limits.mjs puts the stale block at exactly :612-639 as claimed. :612 = "PAGE IDENTITY IS A REAL QUESTION, NOT A FORMALITY..."; :621 "Ask the same question of both pages here"; :623-624 the seven-tab roster; :627-629 item (c) Feature Hierarchies / "record that node UNATTESTED, not absent"; :632-634 "EMIT THE SEVEN TABS AS PAGE-LEVEL DATA - tabs, tabsSourceQuote, tabsSourceFile, plus one navPathAlternates entry per tab and sub-tab"; :639 ends the nav-depth block. :640-642 is the NBSP hazard, correctly excluded from the fix range.
> NAV_SCHEMA at :253-309 confirmed: `additionalProperties:false` at :255, page-item `additionalProperties:false` at :262, properties :265-302 = id/name/documentedBasis/coverageGuess/uiVariant/navPathEvidence/aliases/roleGates/identityNotes. No `tabs`, `tabsSourceQuote`, `tabsSourceFile`, `navPathAlternates`. `grep -n "tabs\|navPathAlternates"` on the whole script returns only :122, :569, :623-624, :632-634 — i.e. the word appears in prompts, never in a schema.
> 
> CONSEQUENCE 1 — the emit order is empirically unsatisfiable, and this is on the record, not speculation.
> bin/apply-corrections.py:487-490 states it outright: "Page tabs the BUILD COULD NOT EMIT: NAV_SCHEMA sets additionalProperties:false and declares no `tabs` property, so the map agent was schema-blocked and returned tabs:None." bin/assemble-parts.py:196-200 repeats the warning. Run A's own NAV_SCHEM

---

## [blocker] The Map/inventory prompt says "FOR EACH of the two pages" and hands the agent Workflows/Feature-Hierarchies search terms and a Workflows revision-history trap

**id:** `map-inventory-search-terms`  **auditor:** stale-content-audit / 2026-09-01_kg-authorized-approval-limits.mjs  **split-vote:** False

**where:** workflows/2026-09-01_kg-authorized-approval-limits.mjs:675, :688-705

**evidence:**

```
:675 'FOR EACH of the two pages, do all of this and show the commands in searchLog:'
:688-695 'Search terms are your job, but at minimum cover: for Workflows - workflow, workflow step, workflow rule, action, approval, approver, authorized approver, cost object approver, approval status, email notification, notification variable, replacement token, confirmation agreement, reason category, reason code, escalation, timeout, expire, self-approval, single-step, skip step, ad hoc step, send back, recall, exception level, editable by, steps can be added by, condition, operator, general page, steps page, step rules page; for Feature Hierarchies - feature hierarchy, hierarchy, hierarchies, source list, level, segment, modify hierarchy, cost object approver hierarchy, authorized approver hierarchy, invoice routing hierarchy, invoice payment hierarchy, vendor employee access.'
:696-700 'A PRIOR RECON already built an 86-file and 12-file candidate set for these two pages...'
:701-705 'REVISION-HISTORY TRAP, MEASURED AND SPECIFIC TO THIS GROUP: four files in the Workflows set OPEN WITH "Revision History"... general-information-8b3b0308.md (139 rows), cost-object-approval-8b3d1e0f.md (85), authorized-approvers-8b3c26cc.md (64), email-notifications-8b3dbad4.md (61)...'
Measured against this page's five seeds: grep -c '<table' and grep -cP '^\s*\|' both return 0 on ALL FIVE (user-administrator-fcfd570c 4603 B, user-administration-8b167b96 2314 B, definition-of-amount-for-limit-approval-06806875 2038 B, configuration-8b3be88b 1213 B, setting-an-unlimited-approval-amount-9d98b489 988 B).
```

**why it matters:** A ~31-term Workflows search list will drag the inventory straight back into the 86-file Workflows candidate set — i.e. into files whose fields are already built — producing a mustRead list that guarantees re-extraction and re-homing of built Workflows fields. The revision-history warning is not merely stale, it is factually inverted for this page: there are zero tables here, so a warning about the largest catalog being a revision history primes the agent to expect and hunt structure that does not exist, which is the documented Budget Configuration failure mode (manufacture fields around a gap).

**proposed fix:** Replace :675 with 'For the single page below, do all of this and show the commands in searchLog:'.
Replace :688-705 with terms actually grounded in a corpus sweep (counts below are measured, grep -rli over BOTH guide dirs):
  'Search terms are your job, but at minimum cover, in BOTH guide directories:',
  '  "Authorized Approval Limits" (2 files), "Manager Approval Limit" (1), "Approval Limit Currency" (3),',
  '  "Can approve exception" (2), "Expense and Invoices Setting" (2), "User Admin rights" (1),',
  '  "limit approval" (15), "limit-based" (12), "level-based cost object" (3), "Limit Approved" (9),',
  '  plus: authorized approver, cost object approver, approval limit, unlimited approval, approval amount,',
  '  signing authority, User Administration, employee import, Global group, hierarchy level.',
  'THE SEED LIST IS A FLOOR. "limit approval" alone returns 15 files, only 5 of which are seeded; the recon',
  'that produced the seeds was aimed at Workflows, not at this page. Beat it.',
  'MEASURED SHAPE OF THIS PAGE - DO NOT HUNT STRUCTURE THAT IS NOT THERE: all five primaries return 0 for',
  'grep -c "<table" AND 0 for grep -cP "^\\s*\\|". Every field lives in procedure prose. An empty',
  'rawHtmlTableCensus and an empty longCatalogs list is the CORRECT output here. Do the census anyway and',
  'report the zeros - but do not manufacture a catalog, and do not pad the reading list to look thorough.',
  'BOUNDARY DUTY OF THE INVENTORY: several strong hits for these terms are files the WORKFLOWS build already',
  'consumed - authorized-approver-list-a9522ec8.md, procedure-2d20b513.md, overview-5ce8a567.md,',
  'tools-guides/how-single-step-approval-workflow-works-40145f24.md. List them in alsoRelevant with an',
  'explicit ALREADY-MINED-BY-WORKFLOWS flag, never in mustRead. Check each against ' + KG + ' with python3.'

> **refuter verdict:** refuted=False conf=high severity=blocker
> fix: As proposed, with ONE measured correction: in the line 'THE SEED LIST IS A FLOOR. "limit approval" alone returns 15 files, only 5 of which are seeded', change 5 to 4. Verified: grep -rliF "limit approval" over both guide dirs returns 15 files, and only four of the five seeds are among them (user-administration-8b167b96.md does not contain the string). Leaving 5 puts a checkable falsehood in a prompt whose whole discipline is grep-verified claims.  Everything else in the fix is confirmed correct and should be applied verbatim: replace :675 with the single-page phrasing; replace :688-705 with th
> REPRODUCED EVERY CLAIM AGAINST THE REAL FILES. Nothing in this finding is inference; it is all direct observation.
> 
> 1) The offending text exists at the exact stated lines. `sed -n '660,720p' /mnt/c/Users/manci/PROJECTS/concur-config-diver-support/workflows/2026-09-01_kg-authorized-approval-limits.mjs` with cat -n offsetting: line 675 is verbatim `'FOR EACH of the two pages, do all of this and show the commands in searchLog:',`. Lines 688-695 are the ~31-term Workflows / Feature-Hierarchies search list, verbatim as quoted. Lines 696-700 are the "86-file and 12-file candidate set for these two pages" prior-recon paragraph. Lines 701-705 are the "REVISION-HISTORY TRAP, MEASURED AND SPECIFIC TO THIS GROUP" block naming general-information-8b3b0308.md (139), cost-object-approval-8b3d1e0f.md (85), authorized-approvers-8b3c26cc.md (64), email-notifications-8b3dbad4.md (61). Quoted evidence matches character-for-character.
> 
> 2) It is inherited Run A text, not authored. `grep -n "FOR EACH of the two pages" 2026-08-31_kg-workflows-run-a.mjs` -> line 692. Same sentence, same block, carried over unedited.
> 
> 3) "the two pages" is factually false for this script. `const PAGES` begins at line 104 and contains exactly ONE entry (`id: 'authorized-approval-limits'`, line 106); a node scan for `id: '` returns 1 occurrence. So :675 instructs the agent to iterate a set of two over a one-element brief.
> 
> 4) The zero-table measurement is correct on all five seeds (seed list read from line 109). Measur

> **refuter verdict:** refuted=False conf=high severity=blocker
> fix: Adopt the proposed fix as written for :675 and :688-700, with the ten measured counts kept (all ten verified exact). Two amendments:  1. In the BOUNDARY DUTY block, change the fourth file's treatment. Replace    '  tools-guides/how-single-step-approval-workflow-works-40145f24.md. List them in alsoRelevant with an' with a split list:    'ALREADY-MINED-BY-WORKFLOWS (measured against the built graph - field counts by sourceFile):',    '  authorized-approver-list-a9522ec8.md (4 Workflows fields), procedure-2d20b513.md (3),',    '  overview-5ce8a567.md (1). alsoRelevant only, NEVER mustRead. Any co
> SURVIVES. Every mechanical claim reproduced; the consequence chain is real and has no downstream guard.
> 
> 1) Text is verbatim Run A inheritance, exact lines confirmed.
> `grep -n "FOR EACH of the two pages\|Search terms are your job\|A PRIOR RECON\|REVISION-HISTORY TRAP" 2026-09-01_kg-authorized-approval-limits.mjs`
> -> 675, 688, 696, 701. The same string sits at :692 of the Run A parent, so this is inherited, not authored.
> `sed -n '104,108p'` + a regex over `const PAGES` -> exactly ONE page id, `authorized-approval-limits`. So `pageBrief` (built at :552, injected at :714) hands the inventory agent one page while :675 orders it to work "FOR EACH of the two pages" and :696 asserts "A PRIOR RECON already built an 86-file and 12-file candidate set for these two pages (see the seeds in the page briefs)". The page brief it is holding carries FIVE seeds. That is a direct factual contradiction inside one prompt, and the imperative side ("at minimum cover", 31 Workflows terms + 11 Feature Hierarchies terms) is the side written as a mandatory floor.
> 
> 2) The measured shape claim is exact. In the corpus root, for all five primaries:
> `grep -c '<table'` = 0 and `grep -cP '^\s*\|'` = 0 on user-administrator-fcfd570c (4603 B), user-administration-8b167b96 (2314), definition-of-amount-for-limit-approval-06806875 (2038), configuration-8b3be88b (1213), setting-an-unlimited-approval-amount-9d98b489 (988). All five byte counts match the finding to the byte.
> 
> 3) NO DOWNSTREAM GUARD — this is what mak

---

## [blocker] Refuter 2 item 6 names the Group 5B List Management / connected-lists boundary — the wrong boundary, on the one agent that must answer the central question of this run

**id:** `refuter2-item6-wrong-boundary`  **auditor:** stale-content-audit / 2026-09-01_kg-authorized-approval-limits.mjs  **split-vote:** True

**where:** workflows/2026-09-01_kg-authorized-approval-limits.mjs:1023-1025

**evidence:**

```
awk 'NR>=1023 && NR<=1025':
  ' 6. THE LIST MANAGEMENT / CONNECTED LISTS BOUNDARY specifically: connected list DEFINITIONS are'
  '    documented on Forms and Fields (already built). If a candidate belongs there, drop it with'
  '    correctPage set. Be exact about which side of that line each control falls on.'
This text is unchanged from the Group 5B → Group 3 → Run A lineage (diff shows no hunk here).
The corpus draws the REAL boundary itself, twice, both grep -Fc = 1:
  user-administrator-fcfd570c.md: '(The actual exception levels apply to all authorized approvers and are defined on the Authorized Approvers tab in Workflows.)'
  configuration-8b3be88b.md: 'The range is set in Administration > Invoice > Workflows > Authorized Approver tab.'
```

**why it matters:** Refuter 2 is the ownership/duplication gate — the only agent charged with deciding, per control, whether this window presents its own control or is the same value written down twice. Its one page-specific slot points at a boundary that does not exist on this page, so the agent gets no page-specific instruction on the boundary that does. Combined with ALREADY_BUILT omitting Workflows entirely, nothing in the refuter's context names the colliding page except the seeds string. That is exactly the defect class that cost Group 5A five mis-homed fields, and validate-graph.py cannot see it.

**proposed fix:** Replace :1023-1025 with:
  ' 6. THE WORKFLOWS BOUNDARY, WHICH IS THE CENTRAL QUESTION OF THIS RUN. The built Workflows page already',
  '    owns, on its Authorized Approvers > Authorized Approver List tab and all from',
  '    admin-guides/authorized-approver-list-a9522ec8.md: authorized_approver_approval_limit ("Approval',
  '    Limit"), authorized_approver_level ("Level"), authorized_approver_can_approve_exception ("Can approve',
  '    exception"), authorized_approver_list_approver ("Approver"). And configuration-8b3be88b.md says one',
  '    value has THREE setter surfaces: "The amount is set for each approver in the Authorized Approver',
  '    List, in User Administration, or in the employee import."',
  '    THE CORPUS DRAWS PART OF THIS LINE ITSELF - USE IT, do not re-derive it:',
  '      "(The actual exception levels apply to all authorized approvers and are defined on the Authorized',
  '       Approvers tab in Workflows.)"  (user-administrator-fcfd570c.md)',
  '      "The range is set in Administration > Invoice > Workflows > Authorized Approver tab."',
  '       (configuration-8b3be88b.md)',
  '    So the EXCEPTION LEVEL RANGE is unambiguously Workflows, not this page - a candidate for min/max',
  '    exception level here is a DROP with correctPage "Workflows". But the Can approve exception CHECK BOX',
  '    is documented as a control of THIS window ("the administrator selects the Can approve exception check',
  '    box"). Per candidate, decide and SAY WHICH, citing the file that decides it:',
  '      (i) genuinely a distinct control on this window -> keep/repair, and NOTE the Workflows sibling by',
  '          exact field id so the duplication is visible to a human;',
  '      (ii) the same value reached from another surface, with no control of its own here -> drop with',
  '          correctPage "Workflows";',
  '      (iii) undetermined by the documentation -> repair, and say so. "Undetermined" is a correct answer.',
  '    DO NOT let a fifth "Approval Limit" into the graph without this reasoning written down.',
  '    Also check the employee-import third setter: that is a FORWARD REFERENCE, never a field here.'
Note item 5 (:1019-1022, sub-page/separate-tool) is generic and should be KEPT.

> **refuter verdict:** refuted=False conf=high severity=high
> fix: As proposed — replace :1023-1025 with the Workflows-boundary text, keep item 5 at :1019-1022 — with two amendments:  1. The proposed replacement is factually clean against the real files: the four field names, the three-setter sentence, both corpus boundary quotes, and the "Can approve exception check box" nuance all verify (see reasoning). Land it as written. Optionally add the graph-side ids alongside the `name` form so the refuter can grep either: field.workflows.authorized-approver-approval-limit / -level / -can-approve-exception / -list-approver, and field.workflows.minimum-exception-leve
> OBSERVATION — fully reproduced, byte-for-byte.
> 
> 1. The text exists exactly as quoted at the stated lines.
> `awk 'NR>=1023 && NR<=1025' 2026-09-01_kg-authorized-approval-limits.mjs` returns:
>   1023:         ' 6. THE LIST MANAGEMENT / CONNECTED LISTS BOUNDARY specifically: connected list DEFINITIONS are',
>   1024:         '    documented on Forms and Fields (already built). If a candidate belongs there, drop it with',
>   1025:         '    correctPage set. Be exact about which side of that line each control falls on.',
> It is item 6 of the numbered lens for `=== YOUR LENS: PAGE OWNERSHIP, DUPLICATION AND SCOPE (refuter 2 of 2) ===` (opens :1000, closes with the join at :1027, `label: 'verify:'+p.id+':ownership'` at :1028). Item 5 (:1019-1022, sub-page/separate tool) is generic, as the finding says.
> 
> 2. Lineage confirmed. `grep -n "LIST MANAGEMENT"` hits the parent at 2026-08-31_kg-workflows-run-a.mjs:1040 and the child at :1023 with identical text; `diff` of the two files piped through `grep "LIST MANAGEMENT\|CONNECTED LIST"` returns nothing, i.e. the block is carried over unchanged.
> 
> 3. Both corpus quotes verify, each exactly one file (run from the corpus root, `grep -rc ... --include=*.md`):
>   - "The actual exception levels apply to all authorized approvers…defined on the Authorized Approvers tab in Workflows." → admin-guides/user-administrator-fcfd570c.md:1
>   - "The range is set in Administration > Invoice > Workflows > Authorized Approver tab." → admin-guides/configuration-8b3b

> **refuter verdict:** refuted=True conf=high severity=low
> fix: Not as proposed. Two changes:  1. At :1023-1025, do NOT paste the 20-line block - it duplicates p.seeds and pre-decides a drop. Retarget item 6 in three lines that add method without pre-loading a verdict, e.g.:   ' 6. THE WORKFLOWS BOUNDARY IS THE CENTRAL QUESTION OF THIS RUN - the page seeds above name the four'   '    colliding controls and the three-setter sentence; apply item 2 to each of them by name. The corpus'   '    draws part of the line itself in your primary file - "(The actual exception levels apply to all'   '    authorized approvers and are defined on the Authorized Approvers t
> OBSERVATION GRANTED. `grep -n "LIST MANAGEMENT"` on both scripts: the text is at 2026-09-01:1023-1025 and verbatim at 2026-08-31_kg-workflows-run-a.mjs:1040-1042. It is stale Run A text naming a boundary irrelevant to this page. That much is true.
> 
> THE CAUSAL CLAIM IS FALSE. The finding says "nothing in the refuter's context names the colliding page except the seeds string" and concludes the agent "gets no page-specific instruction on the boundary that does [exist]." Traced the actual prompt assembly: `shared` (:914-965) includes `pageContext(p)` at :958; `pageContext` emits `p.seeds` at :740; refuter 2 at :997 is `agent([shared, ...])`. So p.seeds (:109) IS in this refuter's prompt. I folded and grepped it. It contains a block headed "#### THE CENTRAL JUDGEMENT OF THIS RUN - READ IT TWICE, IT IS WHY THIS IS A PIPELINE RUN AND NOT FOUR HAND-WRITTEN NODES ####". Per-string `grep -Fc` against line 109 returned 1 for each of: "CENTRAL JUDGEMENT", "authorized_approver_approval_limit", "three-setter", "fifth \"Approval Limit\"", "Group 5A", "forward reference". It names all four colliding field ids with labels and their source file authorized-approver-list-a9522ec8.md; quotes the three-setter sentence from configuration-8b3be88b.md; states "FOR EACH CONTROL, is this a genuinely DIFFERENT surface, or the SAME VALUE written down twice? Answer it per field, out loud, in notes, citing the file that decides it"; "DO NOT silently create a fifth 'Approval Limit'"; "A duplicate is INVISIB

---

## [blocker] synth:dependencies is titled "FOR GROUP 3", targets nine already-built Workflows endpoints, and names this very page as a not-yet-built forward-reference target

**id:** `synth-dependencies-stale`  **auditor:** stale-content-audit / 2026-09-01_kg-authorized-approval-limits.mjs  **split-vote:** False

**where:** workflows/2026-09-01_kg-authorized-approval-limits.mjs:1239, :1250-1285

**evidence:**

```
:1239 '=== YOUR JOB: BUILD THE ConfigDependencies FOR GROUP 3 ==='  (identical in 2026-08-31_kg-group-3.mjs:1171 and run-a:1256 — two generations of residue)
:1250-1261 'CROSS-GROUP EDGES ... NINE UNRESOLVED ENDPOINTS ALREADY NAME "Workflows" AND THIS RUN SHOULD RESOLVE THEM ... FEATURE HIERARCHIES resolves FOUR more - dep.g1.061, dep.g2.003, dep.g5g5.050, dep.g5g5.051 - all about a SOURCE LIST. Use the exact field name "Source List".'
:1268-1277 the Hardcopy conditional-visibility edge, the Settings-tab cross-surface override, and the three two-surface patterns (Email Notifications / Confirmation Agreements / Approval Statuses).
:1281-1285 'An edge into a page that is NOT YET BUILT (Email Reminders, Delegate Configurations, Peppol, Shipping, Localization, and Administration > Company surfaces such as the Authorized Approval Limits window) is legitimate and expected...'
```

**why it matters:** :1281-1282 is a second instance of the blocker class — it explicitly tells the dependency agent that the Authorized Approval Limits window is not built and that a forward reference to it is the right answer, while the agent is building it. The Workflows/Feature-Hierarchies edge instructions will make the agent emit edges for a group that is already merged, which either duplicates built edges or re-homes them under gtag 'approval-authority'. And the real payload is missing: a python3 census of output/kg-invoice-config.json shows SIX unresolved endpoints this run actually bears on, including dep.gworkflows.060 whose targetRef is literally {page: 'User Administration', field: 'Authorized Approval Limits'}.

**proposed fix:** Set :1239 to '=== YOUR JOB: BUILD THE ConfigDependencies FOR THIS GROUP ==='. Delete :1250-1277 and :1281-1285 and replace with:
  'CROSS-GROUP EDGES ARE THE MOST VALUABLE ONES AND THIS PAGE IS ALMOST ENTIRELY CROSS-GROUP.',
  'SIX UNRESOLVED ENDPOINTS IN THE GRAPH ALREADY POINT AT THIS SURFACE. Read each with python3 before you',
  'emit anything, and reconcile against them rather than reinventing:',
  '  dep.gworkflows.060  Feature Hierarchies.level -> {User Administration, "Authorized Approval Limits"}',
  '  dep.gworkflows.046  Workflows.settings_allow_users_select_own_approver_payment_requests -> {User Administration, "approver"}',
  '  dep.g1.060          Group Configurations.Group Name -> {User Administration, "vendor availability"}',
  '  dep.g5.024, dep.g5.026 -> {Administration > Company > User Administration, role assignment}',
  '  dep.g5g5.031        Company Locations.addressCode -> {Employee Import, "Default Shipping Address"}',
  'THE PAGE NAME YOU MUST WRITE IS "Authorized Approval Limits", NOT "User Administration". Those existing',
  'endpoints name the CONTAINING surface, so merge-group.py will NOT auto-resolve them against this build.',
  'That mismatch is EXISTING GRAPH DEBT: report it in your notes for a correction pass, do NOT silently',
  'restate the same edge under a new id.',
  'THE EDGES THIS PAGE ACTUALLY OWES, each with a verbatim quote:',
  '  (1) CONDITIONAL VISIBILITY OF THE LINK - the single most load-bearing edge for a driver. The link',
  '      appears only when the Authorized Approver feature is activated AND the hierarchy has at least one',
  '      non-Global level. Source: user-administrator-fcfd570c.md. This is the same relationship',
  '      dep.gworkflows.060 records from the Feature Hierarchies side - point at it, do not contradict it.',
  '  (2) THE PRECEDENCE RULE between the two halves of the window, verbatim in user-administration-8b167b96.md:',
  '      "The cost object configuration defines the type—either limit or level. If you complete both areas in',
  '      this window—the Approval Limit area and the Level field—Concur Invoice will use the one that applies',
  '      to your configuration and ignore the other." NOTE: those are EM DASHES (U+2014). A grep -F written',
  '      with hyphens will fail. This is the most valuable single sentence on the page for a config writer.',
  '  (3) THE EXCEPTION-RANGE HANDOFF to the built Workflows page: "The range is set in Administration >',
  '      Invoice > Workflows > Authorized Approver tab." (configuration-8b3be88b.md). Target the built page',
  '      "Workflows" and its existing fields minimum_exception_level / maximum_exception_level by exact name.',
  '  (4) THE THIRD SETTER, employee import, is a legitimate forward reference to an UNBUILT surface.',
  'Use EXACT existing page and field names read out of the graph JSON. Do not manufacture edges for coverage.'
Keep :1240-1249, :1278-1280 and :1287 verbatim (edge semantics, verbatim-quote rule, no-padding rule).

> **refuter verdict:** refuted=False conf=high severity=blocker
> fix: Adopt the proposed fix as written, with three amendments.  (1) DROP dep.g5g5.031 from the reconcile list, or relabel it. It is Company Locations.addressCode -> {Employee Import, "Default Shipping Address"} — its condition text is entirely about shipping/billing addresses on the 360 import, nothing to do with approval authority. Listing it under "SIX UNRESOLVED ENDPOINTS … POINT AT THIS SURFACE" invites the agent to manufacture an unrelated edge. Either cut it to five, or keep it with the explicit line: 'dep.g5g5.031 is Employee-Import SHIPPING, unrelated to approval authority — listed only so 
> Every observation in the finding reproduced exactly; nothing was overstated.
> 
> LOCATION AND TEXT — exact.
> `grep -n "ConfigDependencies FOR"` returns 2026-09-01_kg-authorized-approval-limits.mjs:1239, 2026-08-31_kg-workflows-run-a.mjs:1256, 2026-08-31_kg-group-3.mjs:1171 — all three read `'=== YOUR JOB: BUILD THE ConfigDependencies FOR GROUP 3 ==='`. Two generations of residue, as claimed.
> `diff <(sed -n '1239,1287p' …approval-limits.mjs) <(sed -n '1256,1304p' …run-a.mjs)` is EMPTY — the whole 49-line dependency prompt block is byte-identical to Run A. Not "adapted", copied.
> Line anchors verified individually: :1251 "NINE UNRESOLVED ENDPOINTS ALREADY NAME \"Workflows\" AND THIS RUN SHOULD RESOLVE THEM"; :1261 "Use the exact field name \"Source List\""; :1268-1270 Hardcopy edge; :1272 Settings-tab override; :1277 two-surface patterns; :1282 "…Administration > Company surfaces such as the Authorized Approval Limits window) is legitimate and expected"; :1287 the no-padding rule. All present at the stated lines.
> 
> STALENESS IS REAL, not inferred.
> `configPages` in output/kg-invoice-config.json lists 22 pages including `page.workflows` and `page.feature-hierarchies`, both group "Workflows". So :1251-1261 instructs the agent to do Run A's already-completed job. Those Run A endpoints are still unresolved (dep.g2ar.021/.022/.023/.024/.026, dep.g1.021, dep.g5g5.050/.051 all show targetRef.resolved=false against pages Workflows / Feature Hierarchies), which makes the trap worse, not better

> **refuter verdict:** refuted=False conf=high severity=blocker
> fix: Adopt the fix's SHAPE, but correct two defects in it before applying.  DEFECT A in the proposed fix — the "SIX UNRESOLVED ENDPOINTS ... ALREADY POINT AT THIS SURFACE" list is half wrong, and on a page budgeted at ~7 fields that is scope-drag pressure the page seed (:108) explicitly warns against ("Employee Import and the general User Administration surface are OUT OF SCOPE"). Read out of the graph:   dep.gworkflows.060 -> {User Administration, "Authorized Approval Limits"}   GENUINELY this window. KEEP.   dep.gworkflows.046 -> {User Administration, "approver"}                      quote is "ev
> CONSEQUENCE TRACED END-TO-END. The harm is not speculative — the identical instruction already fired once and left the wrong node in the graph.
> 
> 1. RESIDUE CONFIRMED, two generations.
> `grep -n "YOUR JOB: BUILD THE ConfigDependencies" workflows/*.mjs` →
>   2026-08-31_kg-group-3.mjs:1171 "FOR GROUP 3"
>   2026-08-31_kg-workflows-run-a.mjs:1256 "FOR GROUP 3"
>   2026-09-01_kg-authorized-approval-limits.mjs:1239 "FOR GROUP 3"
> Also `grep -n "GROUP 3"` on the audited file hits 240, 558, 845, 1185, 1221, 1239, 1307.
> 
> 2. THE :1281-1285 HALF IS THE BLOCKER, AND IT HAS ALREADY PRODUCED THE DEFECT ONCE.
> python3 over output/kg-invoice-config.json:
>   dep.gworkflows.060  triggers  {Feature Hierarchies, level} -> {User Administration, "Authorized Approval Limits"}  resolved:false
>     condition: "FORWARD REFERENCE, EXPECTED TO STAY UNRESOLVED - Administration > Company > Company Admin > User Administration is out of scope for this graph by the 2026-08-31 decision..."
>   dep.gworkflows.046  depends_on {Workflows, settings_allow_users_select_own_approver_payment_requests} -> {User Administration, "approver"}  resolved:false, same "out of scope" condition text.
> Those two nodes are the literal output of run-a:1281-1285 (whose word "Localization/Peppol... and Administration > Company surfaces such as the Authorized Approval Limits window" survives verbatim at :1281-1282 of the audited script). Re-running that text while BUILDING that page yields dep.gapproval-authority.NNN edges whose condition says th

---

## [blocker] The seed list omits all three files that decide the boundary and the page identity; a9522ec8 is named in prose but never seeded

**id:** `seed-list-missing-the-three-deciders`  **auditor:** Independent corpus recon — Authorized Approval Limits / group "Approval Authority"  **split-vote:** False

**where:** script:109 (const PAGES seeds string)

**evidence:**

```
Seed list names exactly 5 files: user-administrator-fcfd570c.md, user-administration-8b167b96.md, definition-of-amount-for-limit-approval-06806875.md, configuration-8b3be88b.md, setting-an-unlimited-approval-amount-9d98b489.md. My sweep found three uncited files that settle the run:

(1) global-group-vs-authorized-approver-hierarchy-8a960238.md (2,247 B, 25 pipe rows). Step-4 row: "Assign the proper rights to users using one or more of these: Authorized Approver List / Employee import / User Administration" marked X in BOTH the "Global group only" and "Authorized Approver hierarchy" columns.
cmd: awk 'NR>=90' global-group-vs-authorized-approver-hierarchy-8a960238.md | cat -n | tail -40

(2) step-4-assign-the-proper-rights-to-users-86389a18.md (1,521 B): "Regardless of how the authorized approvers are entered into Invoice, they all appear in the Authorized Approver List."
cmd: grep -F -c '...' -> 1

(3) filter-authorized-approvers-by-workflow-approval-step-aae69350.md (6,234 B, raw <table>): "Levels cannot be added to approvers via User Administration."
cmd: grep -F -c '...' -> 1

Also: authorized-approver-list-a9522ec8.md is discussed at length in the seeds prose but is NOT in the "### SEEDS, richest first:" list, so a lens agent following the list may never open the file that owns all four colliding controls.
cmd: grep -c 'SEEDS, richest first' + read of the enumerated filenames.
```

**why it matters:** The brief tells the agent the central job is the BOUNDARY question, then hands it a seed list containing zero of the files that answer it. 86389a18 is the sentence that proves the three surfaces write one store (making every emitted field a genuine sibling rather than a duplicate); 8a960238 is the only place the corpus rules on whether branch A and branch B are one surface; aae69350 is the only file that contests the Level field's existence here. Without them the agent must either invent the boundary verdict or mark everything undetermined, and the four Workflows collisions get resolved by guesswork — exactly the defect class the brief says cost Group 5A five mis-homed fields.

**proposed fix:** Extend the "### SEEDS, richest first:" enumeration in script:109 to: user-administrator-fcfd570c.md (4,603 B, THE PRIMARY), user-administration-8b167b96.md (2,314 B), authorized-approver-list-a9522ec8.md (3,773 B - THE SIBLING SURFACE, owns all four colliding controls, MUST be opened), global-group-vs-authorized-approver-hierarchy-8a960238.md (2,247 B - DECIDES page identity: its step-4 row marks User Administration X in BOTH branch columns), step-4-assign-the-proper-rights-to-users-86389a18.md (1,521 B - DECIDES same-value/different-surface), filter-authorized-approvers-by-workflow-approval-step-aae69350.md (6,234 B - DECIDES the Level boundary and CONTRADICTS 8b167b96), step-2-assign-the-level-to-the-approver-d8bf669c.md (1,751 B - record type 720), employee-import-e28f2294.md (1,763 B - record set 710 + value domains), step-4-assign-the-proper-rights-to-users-82481079.md (1,107 B), edit-authorized-approver-information-8b3c119a.md (1,499 B), remove-authorized-approvers-8b3c5273.md (1,859 B), level-based-approvals-and-limit-based-approvals-b335cf33.md (1,767 B), configuration-8b3be88b.md, definition-of-amount-for-limit-approval-06806875.md, setting-an-unlimited-approval-amount-9d98b489.md, procedure-2d20b513.md.

> **refuter verdict:** refuted=False conf=high severity=blocker
> fix: As proposed, with one amendment that prevents the fix from causing the defect it is meant to prevent.  Rewrite the "### SEEDS, richest first:" enumeration in script:109 to the proposed list, but split it into two labelled tiers so the added files cannot be mistaken for field sources:  TIER 1 — PAGE SOURCES (fields may be emitted from these):   user-administrator-fcfd570c.md (4,603 B - THE PRIMARY: click path, role gate, field roster)   user-administration-8b167b96.md (2,314 B - second independent attestation; line 54 carries the Approval Limit area vs Level field PRECEDENCE RULE verbatim)   de
> REPRODUCED IN FULL — every observation and every measurement in the finding is exact.
> 
> 1. The seed list at script:109 (single line, the `seeds:` string of the one PAGES entry). I enumerated every filename that appears ANYWHERE in that string:
>    `sed -n '109p' 2026-09-01_kg-authorized-approval-limits.mjs | grep -o -E '[a-z0-9-]+-[0-9a-f]{8}\.md' | sort -u`
>    -> exactly 7: authorized-approver-list-a9522ec8.md, configuration-8b3be88b.md, definition-of-amount-for-limit-approval-06806875.md, setting-an-unlimited-approval-amount-9d98b489.md, user-administration-8b167b96.md, user-administrator-fcfd570c.md, workflow-and-approval-routing-8b4ff6c9.md.
>    The "### SEEDS, richest first:" enumeration itself names exactly the 5 the finding lists. 8a960238, 86389a18, aae69350 appear NOWHERE in the file. a9522ec8 appears only in the prose paragraph ("all sourced from authorized-approver-list-a9522ec8.md") and NOT in the enumerated seed list — exactly as claimed.
> 
> 2. All three files exist at the exact claimed byte sizes:
>    global-group-vs-authorized-approver-hierarchy-8a960238.md = 2247 B (claim 2,247)
>    step-4-assign-the-proper-rights-to-users-86389a18.md = 1521 B (claim 1,521)
>    filter-authorized-approvers-by-workflow-approval-step-aae69350.md = 6234 B (claim 6,234)
>    Structure claims also exact: `grep -cP '^\s*\|' 8a960238` = 25; `grep -c '<table' aae69350` = 1; employee-import-e28f2294.md = 1763 B with 19 pipe rows.
> 
> 3. Both verbatim sentences confirmed unique to their claimed file:

> **refuter verdict:** refuted=False conf=high severity=high
> fix: Keep the 5-file "### SEEDS, richest first:" list at script:109 exactly as it stands — do NOT expand it, and do NOT touch "~5 core files, ~11,000 bytes" or "Expect ROUGHLY SEVEN fields". Make two surgical edits to the same string instead:  (1) Replace the sweep instruction. Change `ALSO SWEEP for "Approval Limit" and "Authorized Approval Limits" across BOTH guide directories yourself` to sweep on the term that actually reaches the evidence: `ALSO SWEEP, case-insensitively, for "authorized approver" (59 files), "Authorized Approver List", "Approval Limit" and "Authorized Approval Limits" across 
> OBSERVATION VERIFIED. The seed enumeration is at script:109 (the single-line `seeds:` string in `const PAGES`). It names exactly 5 files; `authorized-approver-list-a9522ec8.md` appears only in the prose block, not in "### SEEDS, richest first:". All three "decider" files exist at the claimed sizes:
>   find -printf '%s\t%p\n' → 2247 global-group-vs-authorized-approver-hierarchy-8a960238.md, 1521 step-4-assign-the-proper-rights-to-users-86389a18.md, 6234 filter-authorized-approvers-by-workflow-approval-step-aae69350.md.
> 
> THE HARM PATH IS CONCRETE, NOT SPECULATIVE — and the script's own prescribed sweep provably cannot reach it. script:109 tells the agent to "ALSO SWEEP for \"Approval Limit\" and \"Authorized Approval Limits\"". Measured against the corpus:
>   grep -rl -F 'Authorized Approval Limits' . → 2 files (both already seeded)
>   grep -rl -F 'Approval Limit' . → 5 files
>   grep -c -F 'Approval Limit' aae69350 → 0 ; grep -c -F 'Authorized Approval Limits' aae69350 → 0 ; grep -ci 'approval limit' aae69350 → 0
>   grep -ci 'approval limit' 8a960238 → 0
> So two of the three deciders are invisible to BOTH prescribed sweep terms, case-insensitive included. Only 86389a18 is reachable, and only if the agent lowercases the term (it is absent from the case-sensitive -F list, present in the -ri list).
> 
> THE SPECIFIC WRONG NODE. `grep -rn -F 'Levels cannot be added' ..` returns exactly one hit: aae69350.md:130 "Levels cannot be added to approvers via User Administration." Meanwhile the graph

---

## [blocker] aae69350 states "Levels cannot be added to approvers via User Administration" — a direct cross-file contradiction of seeded primary 8b167b96, unmentioned in the brief

**id:** `level-hard-contradiction`  **auditor:** Independent corpus recon — Authorized Approval Limits / group "Approval Authority"  **split-vote:** False

**where:** script:109 (seeds prose names "a hierarchy Level field" as an expected field with no caveat)

**evidence:**

```
admin-guides/filter-authorized-approvers-by-workflow-approval-step-aae69350.md:115 — "Levels cannot be added to approvers via User Administration."
and :113 — "The levels can be added to users via the Employee Import or the Authorized Approver list (Administration > Invoice > Workflows > Authorized Approver tab)."
vs admin-guides/user-administration-8b167b96.md:50 — "For level-based cost object approval, select a level." (inside the Authorized Approval Limits window, in User Administration)
cmd: grep -F -c on each -> 1, 1, 1

Resolution evidence (two distinct Levels, independently corroborated by record type):
- step-2-assign-the-level-to-the-approver-d8bf669c.md:42 "authorized approvers may be assigned to levels via record type 720 in the employee import."
- employee-import-e28f2294.md:23 "For the Limit hierarchy type, you will use the 710 Cost Object Approver record set to import the approval limit and the currency. The Level hierarchy incorporates a numeric indicator also imported using this same record set."
cmd: grep -rn 'record type 7\|71[0-9] Cost Object' . -> both hits
```

**why it matters:** The brief lists "a hierarchy Level field" among the expected fields as if it were settled. It is the single most contested control on the page. If the agent emits a Level field cross-linked as a sibling of field.workflows.authorized-approver-level, it merges two genuinely different values (authorized-approver step-filter level, record 720, Authorized Approver Hierarchy vs cost-object-approval level, record 710, Cost Object Approver Hierarchy) into one node — an error the validator cannot see, since it only checks quotes against files.

**proposed fix:** Add to script:109: 'THE LEVEL FIELD IS CONTESTED — DO NOT RESOLVE IT SILENTLY. 8b167b96 puts a Level control in this window ("For level-based cost object approval, select a level."); aae69350 states the opposite ("Levels cannot be added to approvers via User Administration."). Both grep -F verify. The reconciliation the corpus supports is that these are TWO DIFFERENT VALUES sharing a label: the Workflows Level is the authorized-approver step filter (employee import record type 720, per d8bf669c; Authorized Approver Hierarchy), while this window s Level is the level-based COST OBJECT approval level (record set 710, per employee-import-e28f2294.md; Cost Object Approver Hierarchy). Emit it with a DISTINCT id (cost_object_approval_level), NEVER as a sibling of field.workflows.authorized-approver-level, and record the aae69350 sentence verbatim as an unresolved contradiction.'

> **refuter verdict:** refuted=False conf=high severity=blocker
> fix: As proposed, with four corrections. Insert into the script:109 seeds string (and note it must appear AFTER the four-collision paragraph, because it overrides that paragraph's default instruction for this one control):  "THE LEVEL FIELD IS CONTESTED - DO NOT RESOLVE IT SILENTLY, AND THE 'name the sibling for the same underlying value' INSTRUCTION ABOVE DOES NOT APPLY TO IT. 8b167b96 puts a Level control in this window ('For level-based cost object approval, select a level.' - user-administration-8b167b96.md:50, inside 'The Authorized Approval Limits window appears.'). filter-authorized-approver
> Every element reproduced against the real files.
> 
> SCRIPT: `grep -n "hierarchy Level field"` -> line 109; `awk NR>=100..112` confirms the whole seeds string is the single line 109. The phrase sits in the "FIELDS THE RECON CRITIC NAMED" roster, and the same line calls the Approval-Limit/Level precedence rule "the single most valuable thing on the page ... capture it verbatim and emit it as a dependency."
> 
> CORPUS (exact line numbers via grep -rn): aae69350 line 130 "Levels cannot be added to approvers via User Administration." and line 128 "The levels can be added to users via the Employee Import or the Authorized Approver list (Administration > Invoice > Workflows > Authorized Approver tab)." The finding cites :115/:113 — WRONG line numbers, right sentences (its own grep -F -c evidence is what actually verified them). 8b167b96:50 "For level-based cost object approval, select a level." — exact; and 8b167b96:33-35 places it inside "The Authorized Approval Limits window appears." The contradiction is real and head-on.
> 
> VALIDATOR: grep over bin/validate-graph.py shows every error class is quote-verbatim (quote-not-in-file, contradiction-quote-not-in-file, range-quote-not-in-file). There is no page/control-ownership or duplicate-label check. "Invisible to the validator" holds.
> 
> TWO POINTS THAT STRENGTHEN THE FINDING BEYOND WHAT WAS WRITTEN:
> (1) The brief's own instructed sweep cannot reach the contradiction. `grep -rl "Approval Limit"` -> 5 files; `grep -rl "Authorized Approval Limi

> **refuter verdict:** refuted=False conf=high severity=high
> fix: Add to script:109, after the "FIELDS THE RECON CRITIC NAMED" sentence — present the evidence and forbid the silent resolution, but do NOT prescribe the answer or the id:  "THE LEVEL FIELD IS THE ONE CONTESTED CONTROL ON THIS PAGE — DO NOT RESOLVE IT SILENTLY IN EITHER DIRECTION. Two corpus statements collide head-on, both grep -F verified: user-administration-8b167b96.md puts a Level control inside this very window ('For level-based cost object approval, select a level.'), while filter-authorized-approvers-by-workflow-approval-step-aae69350.md states the opposite ('Levels cannot be added to ap
> EVERY FACTUAL CLAIM VERIFIED.
> 
> 1) The "where" is exact. `grep -n "FIELDS THE RECON CRITIC NAMED" 2026-09-01_kg-authorized-approval-limits.mjs` -> line 109 (the `seeds:` string). Reading it: "...Approval Limit Currency, a hierarchy Level field, a Can approve exception check box..." — named with no caveat.
> 
> 2) Both corpus quotes exist, at slightly different line numbers than the finding gives:
>    `grep -rn "Levels cannot be added to approvers via User Administration" .` -> concur-invoice-professional-edition-admin-guides/filter-authorized-approvers-by-workflow-approval-step-aae69350.md:**130** (finding said 115)
>    `grep -rn "For level-based cost object approval" .` -> concur-invoice-professional-edition-admin-guides/user-administration-8b167b96.md:**50** (correct)
>    `sed -n '25,70p' user-administration-8b167b96.md` confirms :50 sits INSIDE the Authorized Approval Limits window procedure ("click the Authorized Approval Limits link. The Authorized Approval Limits window appears... 3. On the right side: ... For level-based cost object approval, select a level."). So this genuinely is a Level control in this window, and aae69350 genuinely denies one exists in User Administration. The surface contradiction is real.
> 
> 3) Record-type evidence verified: d8bf669c.md:42 "authorized approvers may be assigned to levels via record type 720 in the employee import."; employee-import-e28f2294.md:21,23 "the 710 Cost Object Approver record set". And a distinct hierarchy is documented: admin-gui

---

## [blocker] apply-corrections.py repoint_endpoints NEVER writes ref['page'] — a cross-page retarget of dep.gworkflows.046/060 silently reverts on the very next merge

**id:** `repoint-cannot-write-page`  **auditor:** landing-auditor (graph-impact)  **split-vote:** False

**where:** bin/apply-corrections.py:204-229 (write is lines 221-227); bin/merge-group.py:222-233 (the re-resolve loop that undoes it)

**evidence:**

```
repoint_endpoints looks up by (page, field) but only assigns the field:
```
page, field = fix                       # apply-corrections.py:210
fid = names.get((page.lower(), field.lower()))   # :215
ref['field'] = field                    # :221
ref['resolved'] = True                  # :222
```
There is no `ref['page'] = page`. The only two entries ever written (REPOINT_ENDPOINT, apply-corrections.py:134-141, dep.g1.057/.058 -> 'Purchase Order Configuration') already had the correct page, so this branch has never been exercised cross-page.

Simulated end to end (added a fake page.authorized-approval-limits with field name 'level', applied a REPOINT_ENDPOINT entry ('dep.gworkflows.060','targetRef'):('Authorized Approval Limits','level'), then ran merge-group.py's re-resolve loop verbatim):
  AFTER apply-corrections: {"page": "User Administration", "field": "level", "resolved": true} | targetId= field.authorized-approval-limits.level
  AFTER next merge re-resolve: {"page": "User Administration", "field": "level", "resolved": false} | targetId= None
Because merge-group.py:227 keys strictly on (ref['page'], ref['field']) and merge-group.py:229 unconditionally overwrites d[key] = hit, the stale page name wins forever.
```

**why it matters:** This is the exact tool the task assumes will land the fix for the two forward references. Written as-is, the correction appears to succeed (prints 'repointed dep.gworkflows.060.targetRef -> ...'), the validator stays green, and the edge silently un-resolves the next time ANY group merges — i.e. the moment Workflows Run B runs. The graph would then carry a targetRef claiming page 'User Administration' with field 'level', which is a lie in both halves.

**proposed fix:** Add the missing page write inside repoint_endpoints, immediately before `ref['field'] = field` (apply-corrections.py:221):
```
ref['page'] = page
ref['field'] = field
```
and relax the early-out guard on :218 so it also compares the page:
```
if ref.get('page') == page and ref.get('field') == field and ref.get('resolved'):
    continue
```
Then verify persistence by re-running `python3 bin/merge-group.py` (any group) and re-checking `resolved`.

> **refuter verdict:** refuted=False conf=high severity=high
> fix: As proposed — verified working. Apply both halves to /mnt/c/Users/manci/PROJECTS/concur-config-diver-support/bin/apply-corrections.py, anchoring on TEXT not the drifted line numbers in the finding:  1) At line 223 (finding said 221), insert before the field write:        ref['page'] = page        ref['field'] = field        ref['resolved'] = True  2) At line 217 (finding said 218), relax the early-out to include the page:        if ref.get('page') == page and ref.get('field') == field and ref.get('resolved'):            continue  Both are required. Without (2), any run where resolved is alread
> REPRODUCED against the real files; nothing was written to the toolchain or the corpus (md5 of bin/apply-corrections.py unchanged: 58b56d4e4965c400005e07357c4ae218; all mutation done on a copy in the scratchpad).
> 
> 1) Code observation CONFIRMED. `sed -n '204,230p' bin/apply-corrections.py` shows repoint_endpoints keying the lookup on (page, field) at :219 but writing only ref['field'] (:223) and ref['resolved'] (:224). `grep -n "ref\['page'\]" bin/apply-corrections.py` returns nothing (exit 1). merge-group.py:226-234 keys strictly on (ref['page'], ref['field']) and unconditionally assigns d[key] = hit, with the comment at :223-225 explicitly declaring the textual ref the stable identity from which ids are ALWAYS re-derived.
> 
> CITATION DRIFT (does not change the verdict, but the implementer must anchor on text): the finding's "where" range 204-229 is right, but its inline numbers are off by 2-5. `page, field = fix` is 215 not 210; `fid = names.get(...)` is 219 not 215; `ref['field']` is 223 not 221; `ref['resolved']` is 224 not 222; the early-out guard is 217 not 218. merge-group's re-resolve loop is 226-234 (index comprehension 220-222), not 222-233.
> 
> 2) "Never exercised cross-page" CONFIRMED. The only two REPOINT_ENDPOINT entries (apply-corrections.py:139-140) target dep.g1.057/.058, and in output/kg-invoice-config.json both already carry targetRef.page == "Purchase Order Configuration" with resolved:true — the page write was never needed.
> 
> 3) PREMISE HOLDS. dep.gworkflows.060.

> **refuter verdict:** refuted=False conf=high severity=medium
> fix: Code change: as proposed, but against the REAL line numbers (the finding's are off by two).  In bin/apply-corrections.py, insert one line immediately before `ref['field'] = field` at :223:     ref['page'] = page     ref['field'] = field  And relax the early-out guard at :217 so it compares the page too:     if ref.get('page') == page and ref.get('field') == field and ref.get('resolved'):         continue  Do NOT use the proposed verification step. `python3 bin/merge-group.py <result> "<group>"` requires that group's raw result JSON on disk and merge-group.py:79-85 purges every node of the name
> CODE DEFECT CONFIRMED. `grep -n "\['page'\]" bin/apply-corrections.py` returns ZERO hits — ref['page'] is never assigned anywhere in the file. Actual line numbers differ from the finding by two: the early-out guard is :217 (not :218), the write block is :223-229 (not :221-227), and the "repoint target not found" print is :221. Sequence at :223-227 is ref['field']=field / ref['resolved']=True / d[key]=ref / d['%sId'...]=fid / d['sourceId'|'targetId']=fid — no page write.
> 
> REVERT MECHANISM REPRODUCED. Loaded the real output/kg-invoice-config.json, appended a synthetic page.authorized-approval-limits + field.authorized-approval-limits.level, emulated repoint_endpoints for ('dep.gworkflows.060','targetRef')->('Authorized Approval Limits','level'), then ran merge-group.py:225-233's re-resolve loop verbatim:
>   AFTER apply: {"page": "User Administration", "field": "level", "resolved": true} | id= field.authorized-approval-limits.level
>   AFTER merge: {"page": "User Administration", "field": "level", "resolved": false} | id= None
> merge-group.py:229 keys strictly on (ref['page'], ref['field']) and :231 unconditionally assigns d[key]=hit, so the stale page wins permanently. Exactly as the finding states.
> 
> BRANCH IS PROVABLY UNEXERCISED. Both existing REPOINT_ENDPOINT entries (apply-corrections.py:134-141) are dep.g1.057/.058, and the live graph shows their targetRef as {"page": "Purchase Order Configuration", "field": "group_selector", "resolved": true} with targetId field.purchase-orde

---

## [blocker] The build script tells its own agents that Authorized Approval Limits is NOT a page to build and must stay an unresolved forward reference — it will mint fresh stale scope text straight into the graph

**id:** `script-forbids-the-page-it-is-building`  **auditor:** landing-auditor (graph-impact)  **split-vote:** False

**where:** workflows/2026-09-01_kg-authorized-approval-limits.mjs:578-583 (ALREADY_BUILT block, injected into every phase prompt) and :1282-1285 (dependency-synthesis prompt)

**evidence:**

```
Line 578-583, verbatim:
```
'OUT OF SCOPE FOR THE WHOLE GRAPH, decided 2026-08-31: surfaces under Administration > COMPANY.',
'All 20 built pages sit under Administration > Invoice, and five prior groups met User Administration /',
'User Permissions eight times and left every one an unresolved endpoint. The Authorized Approval Limits',
'window (Administration > Company > Company Admin > User Administration) is REAL and DOCUMENTED - see',
'user-administrator-fcfd570c.md - but it is NOT a page for you to build. Write forward references to it',
'and let them stay unresolved.',
```
Line 1282-1283, verbatim:
```
'An edge into a page that is NOT YET BUILT (Email Reminders, Delegate Configurations, Peppol, Shipping,',
'Localization, and Administration > Company surfaces such as the Authorized Approval Limits window) is',
```
Both directly contradict PAGES[0] at :107 (`name: 'Authorized Approval Limits'`) and the handoff's explicit instruction (docs/2026-09-01_HANDOFF-APPROVAL-AUTHORITY-AND-RUN-B.md:68-69: "Do not re-litigate this and do not write 'out of scope' in any note."). ALREADY_BUILT is joined at :585 and reaches every agent.
```

**why it matters:** This is the mechanism by which the superseded 2026-08-31 decision propagates into the NEW nodes, not just the old ones. An agent obeying :582 will either (a) refuse to emit fields for the page it was told to map, (b) emit dependencies whose targetPage is 'User Administration' rather than 'Authorized Approval Limits' — reproducing the exact unresolvable ref shape that finding #1 exists to clean up — or (c) write 'out of scope' into identityNotes/notes, which the validator never inspects and which no correction op can reach. Every downstream finding in this report gets worse if these two blocks ship.

**proposed fix:** Replace lines 578-583 with the reversed decision, e.g.:
```
'SCOPE, REVISED 2026-09-01 (SUPERSEDES the 2026-08-31 blanket exclusion of Administration > COMPANY):',
'Authorized Approval Limits IS the page this run builds. Menu location is not product scope - it',
'configures Concur Invoice through the non-PO capability. Never write "out of scope" in any note.',
'STILL unbuilt (a forward reference may point at these): Email Reminders, Delegate Configurations,',
'Peppol Configuration, Shipping Configuration, Localization, the Employee Import, and the general',
'User Administration user-profile surface (which is NOT this window).',
```
At :1282, delete the clause 'and Administration > Company surfaces such as the Authorized Approval Limits window'. Also fix :576 ('It holds 20 pages / 486 fields ... This run adds two NEW pages') to '22 pages / 607 fields ... This run adds ONE new page'.

> **refuter verdict:** refuted=False conf=high severity=blocker
> fix: Proposed fix is correct but INCOMPLETE — apply it plus three additions, all inside the same ALREADY_BUILT constant (554-584):  (a) Replace 578-583 with the reversed decision as proposed. Keep the "never write 'out of scope' in any note" clause — it is the only guard against prose the validator cannot see.  (b) Line 1282: delete the clause 'and Administration > Company surfaces such as the Authorized Approval Limits window' (leaving 'Localization) is'). Do not delete the whole forward-reference paragraph; Email Reminders / Delegate Configurations / Peppol / Shipping / Localization are still gen
> REPRODUCED EXACTLY, byte-for-byte, at the stated line numbers.
> 
> 1) The offending block exists verbatim at 578-583.
> `grep -n "OUT OF SCOPE FOR THE WHOLE GRAPH\|NOT a page for you to build\|and let them stay unresolved" workflows/2026-09-01_kg-authorized-approval-limits.mjs`
> → 578, 582, 583. `sed -n '565,584p'` prints the six quoted lines exactly as the finding transcribes them, including "...is REAL and DOCUMENTED - see user-administrator-fcfd570c.md - but it is NOT a page for you to build. Write forward references to it and let them stay unresolved."
> 
> 2) It is unedited Run A text, not adapted.
> `sed -n '554,584p' 2026-09-01_...mjs > a; sed -n '571,601p' 2026-08-31_kg-workflows-run-a.mjs > b; diff a b` → **no output**. The entire ALREADY_BUILT constant was copied from Run A with zero edits.
> 
> 3) It reaches every agent. `grep -n ALREADY_BUILT` → definition at 554, joined at **584** (the finding says 585 — off by one, immaterial), and interpolated at 652 (map-navigation), 711 (map-inventory), 880 (every lens extraction), 956 (reconcile), 1172 (SYNTH_CONTEXT → all synthesis agents), 1440 (critic context). At 880 it is placed AFTER pageContext(p), and at 1440 it is the LAST line of the critic preamble — the recency position, i.e. worst case.
> 
> 4) It contradicts the page being built. `grep -n "name: 'Authorized Approval Limits'"` → **line 107**, PAGES[0]. The seeds string at :110 argues at length that the page is in scope ("THIS PAGE IS OUT OF THE INVOICE MENU BUT IT IS NOT OUT OF INV

> **refuter verdict:** refuted=False conf=high severity=blocker
> fix: Direction as proposed, with two amendments. Replace :578-583 with:  'SCOPE, REVISED 2026-09-01 - THIS SUPERSEDES THE 2026-08-31 BLANKET EXCLUSION OF Administration > COMPANY.', 'Authorized Approval Limits IS the page this run builds. Menu location is a navigation fact, not product', 'scope: this window configures Concur Invoice through the non-PO capability. Record the click path', 'faithfully in identityNotes, framed as "Invoice configuration reached through the Company admin menu".', 'Do NOT write "out of scope" about THIS page in identityNotes, notes, or a dependency condition. (The', 'page
> I tried to refute this on consequence grounds and failed — the predicted harm is not speculative, it is ALREADY IN THE GRAPH, minted by this exact prompt text on the previous run.
> 
> 1. TEXT CONFIRMED VERBATIM AND IDENTICAL TO PARENT.
> `grep -n "NOT a page for you to build" workflows/*.mjs` returns two hits: parent `2026-08-31_kg-workflows-run-a.mjs:599` and child `2026-09-01_kg-authorized-approval-limits.mjs:582`. Byte-identical. The child inherited the block unmodified at :578-583.
> 
> 2. THE BLOCK REACHES SIX PROMPTS, INCLUDING EVERY ONE THAT AUTHORS PERSISTED PROSE.
> `grep -n 'ALREADY_BUILT' 2026-09-01_...mjs` → defined :554, injected at :652 (map:navigation), :711 (map:inventory), :880, :956, :1172 (inside SYNTH_CONTEXT), :1440 (CRITIC_CONTEXT). In every case it is injected BEFORE `=== PAGES ===` / pageBrief. At :1172 it sits immediately above :1174 `'Page names for THIS run, exactly as they must be written: "Authorized Approval Limits"'` — a flat, adjacent self-contradiction inside one prompt string.
> 
> 3. SMOKING GUN — THE HARM ALREADY HAPPENED, VERBATIM, UNDER THIS TEXT.
> The graph carries `dep.gworkflows.060`, produced by the parent script running line 599:
>   targetRef: {"page": "User Administration", "field": "Authorized Approval Limits", "resolved": false}
>   condition: "FORWARD REFERENCE, EXPECTED TO STAY UNRESOLVED - Administration > Company > Company Admin > User Administration is out of scope for this graph by the 2026-08-31 decision, and the Authorized Approval Limits wi

---

## [blocker] ALREADY_BUILT tells all six agent families that this exact page is NOT to be built

**id:** `already-built-forbids-this-page`  **auditor:** tabs-chain / schemas / script-executability  **split-vote:** False

**where:** workflows/2026-09-01_kg-authorized-approval-limits.mjs:578-583 (const), injected at :652, :711, :880, :956, :1172, :1440

**evidence:**

```
sed -n '578,583p' →
  'OUT OF SCOPE FOR THE WHOLE GRAPH, decided 2026-08-31: surfaces under Administration > COMPANY.',
  'All 20 built pages sit under Administration > Invoice, and five prior groups met User Administration /',
  'User Permissions eight times and left every one an unresolved endpoint. The Authorized Approval Limits',
  'window (Administration > Company > Company Admin > User Administration) is REAL and DOCUMENTED - see',
  'user-administrator-fcfd570c.md - but it is NOT a page for you to build. Write forward references to it',
  'and let them stay unresolved.',
grep -n 'ALREADY_BUILT,' → 652, 711, 880, 956, 1172, 1440
```

**why it matters:** This string is concatenated into the Map/nav, Map/inventory, Extract (all 3 lenses), Verify (both refuters), Synthesize (all 4) and Critic (both) prompts. Every agent in the run is told, in the most emphatic register the script owns, that the page it was just asked to build must not be built and should be left as an unresolved forward reference. The likeliest outcome is not a crash but a compliant, well-argued empty build: the Map agent returns documentedBasis with an out-of-scope note, the extractors emit dependencyCandidates instead of fields, and Repair writes a roster with fields: []. assemble-parts.py then exits on an empty roster or merges a zero-field page node — the exact 'bare thin node' defect the Group 5A critic already charged. It also flatly contradicts the header's own scope ruling at :19-40.

**proposed fix:** Delete lines 578-583 entirely and replace with:
  'ADMINISTRATION > COMPANY, AND WHY THIS PAGE IS THE EXCEPTION: every one of the 22 built pages sits',
  'under Administration > Invoice, and prior groups left User Administration endpoints unresolved on',
  'purpose. THIS RUN BUILDS ONE SURFACE OUT OF THAT MENU, deliberately: Authorized Approval Limits',
  '(Administration > Company > Company Admin > User Administration). Menu location is NOT product scope -',
  'this window sets the approval authority a NON-PO Concur Invoice approver has, which a PO-based invoice',
  'would carry on the PO (tools-guides/workflow-and-approval-routing-8b4ff6c9.md). Record the click path',
  'faithfully; never frame the page as out-of-product. Employee Import and the general User Administration',
  'surface stay OUT and their endpoints stay unresolved.',

> **refuter verdict:** refuted=False conf=high severity=blocker
> fix: Adopt the proposed replacement of lines 578-583 with one change: make the replacement count-free so it does not contradict the stale "20 pages / 486 fields" still standing at line 576.  Replace :578-583 with:    'ADMINISTRATION > COMPANY, AND WHY THIS PAGE IS THE EXCEPTION: every built page so far sits under',   'Administration > Invoice, and prior groups left User Administration endpoints unresolved on purpose.',   'THIS RUN BUILDS ONE SURFACE OUT OF THAT MENU, deliberately: Authorized Approval Limits',   '(Administration > Company > Company Admin > User Administration). Menu location is NOT 
> OBSERVATION — fully reproduced, byte-exact.
> 
> 1. The text exists at the stated lines. `sed -n '578,583p' workflows/2026-09-01_kg-authorized-approval-limits.mjs` returns the six quoted lines verbatim, character for character as the finding cites them, including "it is NOT a page for you to build. Write forward references to it / and let them stay unresolved." They sit inside `const ALREADY_BUILT = [` which opens at :554 and closes `].join('\n')` at :584.
> 
> 2. It is verbatim Run A carryover, not an adaptation. `diff <(sed -n '578,583p' 2026-09-01_kg-authorized-approval-limits.mjs) <(sed -n '595,600p' 2026-08-31_kg-workflows-run-a.mjs)` → empty. IDENTICAL.
> 
> 3. The six injection points are exactly as stated. `grep -n 'ALREADY_BUILT' 2026-09-01_kg-authorized-approval-limits.mjs` → 554 (decl), 652, 711, 880, 956, 1172, 1440. Mapping each against `grep -n '=== YOUR JOB\|^phase('`:
>    - :652 → Map/nav prompt (job header :596)
>    - :711 → Map/inventory prompt (job header :668)
>    - :880 → Extract, inside the per-lens `parallel(LENSES.map(...))` (job header :873) — so it goes to all 3 lenses
>    - :956 → Verify (job header :917)
>    - :1172 → inside `const SYNTH_CONTEXT` (:1160), which is injected at :1217, :1289, :1332, :1372 — all 4 synthesize agents
>    - :1440 → inside `const CRITIC_CONTEXT` (:1425), injected at :1483 and :1533 — both critics
>    Repair (:1064) does NOT receive it. So the count of receiving families is six as claimed.
> 
> 4. It contradicts the header. Lines 20-40 are the co

> **refuter verdict:** refuted=False conf=high severity=blocker
> fix: Apply the proposed replacement of lines 578-583 as written — it is correct and does not over-correct — BUT in the same edit reconcile the stale Run A counts six lines above it, or the replacement's "22" contradicts line 576's "20" inside the same string literal.  Line 576 currently reads:   'It holds 20 pages / 486 fields and is ERROR-clean at 486/486 verbatim quotes. This run adds two NEW',   'pages and must not rebuild or re-home anything already in it.', Change to:   'It holds 22 pages / 607 fields and is ERROR-clean on every verbatim quote. This run adds ONE NEW',   'page and must not rebu
> OBSERVATION CONFIRMED VERBATIM. `sed -n '578,583p' 2026-09-01_kg-authorized-approval-limits.mjs` returns exactly the six lines quoted, ending "...but it is NOT a page for you to build. Write forward references to it and let them stay unresolved." `grep -n 'ALREADY_BUILT' ` returns the const at :554 and injections at :652, :711, :880, :956, :1172, :1440 — Map/nav, Map/inventory, Extract, Verify, Synthesize, Critic. Confirmed.
> 
> CONSEQUENCE TRACED — IT IS NOT SPECULATIVE, AND THREE THINGS MAKE IT WORSE THAN THE FINDING STATES.
> 
> (1) ADJACENCY IN THE EXTRACT PROMPT MAKES THE POISON ACTIONABLE, NOT MERELY CONTRADICTORY. `sed -n '876,890p'` shows the assembly order is `pageContext(p)` (:878), then `ALREADY_BUILT` (:880), then immediately (:882-885): "PAGE OWNERSHIP: only emit a control the corpus documents as living on THIS page. If a topic describes a control on a different admin page, do not emit it here - instead emit a dependencyCandidate that points at it." Read in sequence, ALREADY_BUILT's "Write forward references to it and let them stay unresolved" flows straight into "instead emit a dependencyCandidate that points at it." The two blocks do not merely conflict — they compose into a coherent, well-formed instruction to emit zero fields and a pile of dependencyCandidates. That is the single most likely failure mode and it reads as compliance, not error.
> 
> (2) THE MAP POISON PROPAGATES STRUCTURALLY, NOT JUST AS REPEATED TEXT. `sed -n '735,760p'` shows `pageContext(p)` interpolat

---

## [blocker] tabs chain link 1 is still broken: NAV_SCHEMA declares no tabs property under additionalProperties:false

**id:** `nav-schema-tabs-link-1`  **auditor:** tabs-chain / schemas / script-executability  **split-vote:** False

**where:** workflows/2026-09-01_kg-authorized-approval-limits.mjs:253-309 (NAV_SCHEMA); page-item properties end at :302 with identityNotes

**evidence:**

```
LINK 1 (BROKEN) — script:253-256 and :302
  const NAV_SCHEMA = {
    type: 'object',
    additionalProperties: false,
    required: ['pages', 'narrativeMarkdown', 'wroteTo'],
  ...            identityNotes: { type: 'string' }   ← last property; no tabs / tabsSourceQuote / tabsSourceFile anywhere
  grep -n 'tabs' workflows/2026-09-01_kg-authorized-approval-limits.mjs  → NO hit inside 253-309 (only prompt text at 122, 568-569, 619-634)

LINK 2 (FIXED) — bin/assemble-parts.py:196-203
  # tabs added 2026-08-31. The chain that carries a page's tabs to the graph has THREE
  # links (NAV_SCHEMA -> here -> merge-group.py) and only the last was fixed first; a
  # page's tabs die silently if any one of them drops the key. NAV_SCHEMA must also
  # declare `tabs` / `tabsSourceQuote` / `tabsSourceFile` (it sets additionalProperties
  # false, so an undeclared key cannot even be emitted). Absent keys stay absent.
  'tabs': n.get('tabs') or [],

LINK 3 (FIXED) — bin/merge-group.py:116-119
  for key in ('documentedBasis', 'verifyNotes', 'roleGates', 'aliases', 'identityNotes',
              'tabs', 'tabsSourceQuote', 'tabsSourceFile'):
      if p.get(key):

SOURCE OF `n` IS THE SCHEMA-CONSTRAINED AGENT RESULT — bin/assemble-parts.py:80-81, :161
  def nav_from_journal(path):
      """The map agent's returned pages[], found by shape: it is the only result carrying navPathEvidence."""
  nav = nav_from_journal(journal)

AND IT IS UNTOUCHED FROM RUN A:
  for name in NAV_SCHEMA ...; diff <(awk NEW) <(awk PARENT) → 'NAV_SCHEMA: IDENTICAL to Run A'
```

**why it matters:** Does it bite HERE? Only as wasted instruction, not as lost data: the corpus calls this surface a window ('The Authorized Approval Limits window appears') and its correct tabs value is []. But it bites HARD on the very next run. Workflows Run B builds Email Reminders (two tabs) and Delegate Configurations (two tabs); with link 1 unfixed those agents are schema-BLOCKED from emitting tabs, assemble-parts.py's `n.get('tabs')` returns None, and merge-group.py's `if p.get(key)` never fires — four tabs vanish silently, with no validator error, exactly as they did before. A prior session fixed only link 3 and reported the chain done; fixing links 2+3 and leaving 1 repeats that mistake one notch further along.

**proposed fix:** Fix it NOW — the patch is purely additive and cannot change this run's output (a page with no tabs emits [] / '' which both downstream links treat as absent, leaving older results byte-identical). In workflows/2026-09-01_kg-authorized-approval-limits.mjs, inside NAV_SCHEMA's per-page `properties`, replace line 302:

          identityNotes: { type: 'string' }

with:

          identityNotes: { type: 'string' },
          tabs: {
            type: 'array',
            description: 'Tab labels on this page, in documented order, exactly as the corpus writes them. Emit [] when the corpus describes a single undivided page or modal window - [] is a positive finding, not a skip.',
            items: { type: 'string' }
          },
          tabsSourceQuote: { type: 'string', description: 'Verbatim quote attesting the tab list, grep -F verified. "" when tabs is [].' },
          tabsSourceFile: { type: 'string', description: 'File the tabs quote came from. "" when tabs is [].' }

and change line 264's required array to force a deliberate answer rather than a silence:

        required: ['id', 'name', 'documentedBasis', 'coverageGuess', 'uiVariant', 'navPathEvidence', 'aliases', 'roleGates', 'identityNotes', 'tabs'],

(leave tabsSourceQuote/tabsSourceFile optional — they are meaningless when tabs is []). Then carry this identical NAV_SCHEMA into the Run B script.

> **refuter verdict:** refuted=False conf=high severity=high
> fix: As proposed, with three amendments. (1) The `required` array is at line 263, not 264 — patch 263: `required: ['id', 'name', 'documentedBasis', 'coverageGuess', 'uiVariant', 'navPathEvidence', 'aliases', 'roleGates', 'identityNotes', 'tabs'],`. (2) Line 302 `identityNotes: { type: 'string' }` is the last property with no trailing comma; add the comma and append the `tabs` / `tabsSourceQuote` / `tabsSourceFile` properties exactly as the finding writes them. (3) Also add `tabs: n.tabs,` to the map-phase object in pageContext() at :738-751, so downstream phases on a multi-tab page can see the tab 
> REPRODUCED, all three links, every claim.
> 
> LINK 1 (broken) — CONFIRMED.
>   `grep -n 'const NAV_SCHEMA\|identityNotes\|const INVENTORY_SCHEMA' workflows/2026-09-01_kg-authorized-approval-limits.mjs`
>   → 253:const NAV_SCHEMA {  263:required: [...]  302:identityNotes: { type: 'string' }  311:const INVENTORY_SCHEMA
>   `sed -n '253,309p'` shows `additionalProperties: false` at :255, per-page `additionalProperties: false` at :261, and the per-page `properties` block ending at :302 with `identityNotes: { type: 'string' }` (no trailing comma — it is the last property), closing at :303-305. No `tabs`, `tabsSourceQuote`, or `tabsSourceFile` anywhere in the block.
>   `grep -n 'tabs' <script>` → only 122, 569, 623, 624, 632, 634 — all inside prompt strings, none inside 253-309. (The finding's evidence writes "568-569"; the actual hit is 569 only. Cosmetic.)
> 
> LINK 2 (fixed) — CONFIRMED. bin/assemble-parts.py:196-203 carries `'tabs': n.get('tabs') or []`, `tabsSourceQuote`, `tabsSourceFile`, under the exact comment quoted in the finding naming NAV_SCHEMA as the unfixed link.
> 
> LINK 3 (fixed) — CONFIRMED. bin/merge-group.py:116-119, the `for key in (... 'tabs', 'tabsSourceQuote', 'tabsSourceFile')` loop guarded by `if p.get(key)`.
> 
> SOURCE OF `n` — CONFIRMED. bin/assemble-parts.py:80 `def nav_from_journal(path)` (docstring exactly as quoted), called at :161 `nav = nav_from_journal(journal)`. So `n` is the schema-constrained map-agent result: with `additionalProperties:false` and no `tabs` proper

> **refuter verdict:** refuted=False conf=high severity=high
> fix: Apply the schema addition, but ONLY in the same edit that removes the Run A tabs directive — shipping it alone arms a live instruction to write Workflows' seven tabs onto this page.  (a) Line-number correction: the per-page `required` array is line 263, not 264. `identityNotes` is line 302 and NAV_SCHEMA spans 253-309 as stated.  (b) FIRST delete/replace the Run A tabs order in the map prompt: line 632-634 ("EMIT THE SEVEN TABS AS PAGE-LEVEL DATA - tabs, tabsSourceQuote, tabsSourceFile, plus one navPathAlternates entry per tab and sub-tab … The merge tool was fixed on 2026-08-31 to carry tabs 
> COMMANDS AND RESULTS.
> 
> 1) Observation confirmed. `grep -n 'const NAV_SCHEMA' …2026-09-01_kg-authorized-approval-limits.mjs` -> 253. `sed -n '302p'` -> `identityNotes: { type: 'string' }` (last property, no trailing comma). `grep -n 'tabs' …mjs` -> hits only at 122, 569, 623, 624, 632, 634 — all prompt prose, NONE inside 253-309. `sed -n '263p'` -> the per-page `required` array, which the finding cites as 264 (off by one).
> 
> 2) Untouched from Run A confirmed. `diff <(awk '/^const NAV_SCHEMA/,/^}/' new) <(awk … parent)` -> empty, "NAV_SCHEMA: IDENTICAL to Run A", 57 lines.
> 
> 3) Downstream links confirmed. `sed -n '196,203p' bin/assemble-parts.py` -> `'tabs': n.get('tabs') or []` under a comment naming the three-link chain. `sed -n '116,119p' bin/merge-group.py` -> `for key in (... 'tabs','tabsSourceQuote','tabsSourceFile'): if p.get(key)`. `nav_from_journal` (assemble-parts.py:80-100, called at :161) sources `n` from the schema-constrained map result.
> 
> 4) THE DEFECT IS EMPIRICALLY PROVEN, NOT THEORETICAL. Run A's assembled result (`output/reports/2026-08-31_workflows-run-a-raw-result.json`) carries `workflows tabs=[] tabsSourceQuote='' tabsSourceFile=''` and the same for feature-hierarchies — even though Run A's map prompt (identical text, now at :632 of the new script) ordered the seven tabs emitted. The seven tabs reached the graph ONLY via a hard-coded correction: `bin/apply-corrections.py:487-525` (`set_page_tabs`), whose own comment reads "Page tabs the BUILD COULD NOT EMIT:

---

## [blocker] Map/navigation prompt orders the agent to emit Workflows' seven tabs plus navPathAlternates — wrong page, and both are schema-unemittable

**id:** `map-prompt-demands-workflows-seven-tabs`  **auditor:** tabs-chain / schemas / script-executability  **split-vote:** False

**where:** workflows/2026-09-01_kg-authorized-approval-limits.mjs:614-643 (the whole recon block), acutely :619-634

**evidence:**

```
sed -n '632,634p' →
  'EMIT THE SEVEN TABS AS PAGE-LEVEL DATA - tabs, tabsSourceQuote, tabsSourceFile, plus one',
  'navPathAlternates entry per tab and sub-tab in the built graph idiom "Workflows > Approval Statuses',
  '(tab)". The merge tool was fixed on 2026-08-31 to carry tabs through; before that they were dropped.'
sed -n '619,624p' → '  (a) WORKFLOWS IS ONE PAGE WITH SEVEN TABS - the Audit Rules precedent...' / '  (b) The seven tabs are Workflows, Settings, Email Notifications, Approval Statuses, Authorized' / '      Approvers, Confirmation Agreements, Reason Category and Codes; four sub-tabs; ...'
sed -n '626,630p' → '  (c) FEATURE HIERARCHIES IS A SEPARATE PAGE, a sibling of Workflows and not a child...' / '  (d) All three settings tables ... live on Workflows > Settings tab.'
navPathAlternates is COMPUTED, never agent-supplied — bin/merge-group.py:102
  'navPathAlternates': sorted({' > '.join(k) for k in counts if k != best}),
```

**why it matters:** The single most important agent in the run — the one that establishes this page's identity, click path and role gate — is handed a 30-line block about a DIFFERENT, already-built page and told to emit its seven tabs. Three of the four keys it names (tabs, tabsSourceQuote, tabsSourceFile) cannot be emitted at all under NAV_SCHEMA's additionalProperties:false, and the fourth (navPathAlternates) is derived by merge-group.py:102 from navPathEvidence and must never come from an agent. So the instruction is 100% unsatisfiable, and an opus agent under structured output that cannot satisfy an emphatic instruction will either burn retries or, worse, satisfy it in the only channel available — narrativeMarkdown and identityNotes — poisoning the page's identity record with Workflows tab names. It also actively misdirects: it tells the agent a dedicated recon already settled this page's roster and that its job is to confirm, not re-open, which is true of Workflows and false here.

**proposed fix:** Delete lines 614-643 in their entirety (from 'PAGE IDENTITY IS A REAL QUESTION' through the NBSP paragraph is worth keeping — see below) and replace :614-634 with:
    'PAGE IDENTITY IS A REAL QUESTION, NOT A FORMALITY. The corpus calls this surface a WINDOW reached from',
    'a link, not a tool with a left-menu entry: "The Authorized Approval Limits window appears." Test whether',
    'it is one undivided window or a tabbed surface, and emit tabs: [] with tabsSourceQuote "" if it is one',
    'window - [] is a positive finding here, not a skip. THE LINK IS CONDITIONALLY VISIBLE: it appears only',
    'when the Authorized Approver feature is activated AND the hierarchy has at least one non-Global level.',
    'Capture that conditionality verbatim. TWO rights gate it, not one: "the user must have the User Admin',
    'rights and the Invoice User Administration rights".',
    'DO NOT emit navPathAlternates - merge-group.py derives it from your navPathEvidence entries.',
KEEP lines 636-643 (the corpus-contradiction and NBSP-separator paragraphs) but strip the Workflows-specific examples from :636-639, since the NBSP hazard is corpus-wide and still applies.

> **refuter verdict:** refuted=False conf=high severity=blocker
> fix: As proposed IN SUBSTANCE, with three corrections — apply all three or the fix reintroduces the bug.  (1) LINE RANGE. Replace :612-634, not :614-634. :612 is the sentence head ("PAGE IDENTITY IS A REAL QUESTION, NOT A FORMALITY. Last run discovered that \"Forms and Fields\" is"); starting the cut at :614 leaves :612-613 truncated at "...and a tab inside". Correspondingly, KEEP :635-642, not 636-643 — :635 is the head of the corpus-contradiction sentence ("THE CORPUS CONTRADICTS ITSELF ON NAV DEPTH and on nearly every tab NAME, and you must record rather"), and :643 is a blank line that stays re
> REPRODUCED THE OBSERVATION — every quoted string is at the stated line, byte-for-byte.
> 
> `grep -n "" workflows/2026-09-01_kg-authorized-approval-limits.mjs | sed -n '610,646p'` returns exactly the finding's text. :619 "(a) WORKFLOWS IS ONE PAGE WITH SEVEN TABS - the Audit Rules precedent."; :623-625 the seven tab names; :626-628 "(c) FEATURE HIERARCHIES IS A SEPARATE PAGE"; :629-631 "(d) All three settings tables ... Workflows > Settings tab."; :632-634 "EMIT THE SEVEN TABS AS PAGE-LEVEL DATA - tabs, tabsSourceQuote, tabsSourceFile, plus one navPathAlternates entry per tab and sub-tab ... \"Workflows > Approval Statuses (tab)\"." The block is a verbatim carryover: `grep -n tabs 2026-08-31_kg-workflows-run-a.mjs` shows the identical lines at parent :640-641/:649-651. This is Workflows text sitting in the map prompt of a run whose own log line at :590 says "Authorized Approval Limits - mapping 1 page" — while :614-618 tells the agent to "Ask the same question of both pages here" and that a recon "already settled the page-hood of both ... so your job is to CONFIRM OR REFUTE ... not to re-open the roster." Misdirection confirmed.
> 
> SCHEMA CLAIM CONFIRMED, AND CORROBORATED BY THE TOOLCHAIN'S OWN COMMENTS. NAV_SCHEMA at :253-308 sets additionalProperties:false on the page item (:262) and declares exactly id, name, documentedBasis, coverageGuess, uiVariant, navPathEvidence, aliases, roleGates, identityNotes (:263, :302). No tabs, no tabsSourceQuote, no tabsSourceFile, no navPathAltern

> **refuter verdict:** refuted=False conf=high severity=high
> fix: Not as proposed. Corrected:  1. REPLACE :612-634 (not 614-634). Keep the Forms-and-Fields precedent as general method, reworded to one page, then state this page's real identity question:    'PAGE IDENTITY IS A REAL QUESTION, NOT A FORMALITY. A previous run found that "Forms and Fields" is'    'TWO structurally distinct pages under one label and must never be collapsed. Ask that question here.'    'NO recon has settled this page - you are opening the question, not confirming one. The corpus calls'    'this surface a WINDOW reached from a link, not a tool with a left-menu entry: "The administra
> CONFIRMED the observation and a real consequence path; corrected two mechanics and found a defect in the proposed fix.
> 
> WHAT I VERIFIED
> 
> 1. The block is real and misplaced. `sed -n '600,660p'` shows the recon block runs :612-643 (not :614-643 as the finding's `where` says — :612 is "PAGE IDENTITY IS A REAL QUESTION", :643 is blank). `grep -n "^const PAGES\|^log("` → :104 `const PAGES = [` with a single entry, name "Authorized Approval Limits" (:107), and :590 `log('Authorized Approval Limits - mapping 1 page')`. So :614 "Ask the same question of both pages here" and :615 "A dedicated recon already settled the page-hood of both" are false for a one-page run, and :619-631 (a)-(d) describe Workflows/Feature Hierarchies exclusively.
> 
> 2. tabs/tabsSourceQuote/tabsSourceFile ARE unemittable — confirmed twice over. NAV_SCHEMA at :253-309 sets `additionalProperties: false` (:262) and its properties list (:264-302) is id/name/documentedBasis/coverageGuess/uiVariant/navPathEvidence/aliases/roleGates/identityNotes — no tabs. Independent corroboration in bin/apply-corrections.py:487-490: "Page tabs the BUILD COULD NOT EMIT: NAV_SCHEMA sets additionalProperties:false and declares no `tabs` property, so the map agent was schema-blocked and returned tabs:None. (... the workflow schema is fixed for Run B.)" That promised schema fix was NOT applied to this script — `diff` of Run A vs this script over the schema region shows the NAV_SCHEMA body identical.
> 
> 3. The finding is WRONG that the instr

---

## [blocker] The ConfigDependencies prompt is verbatim Workflows Run A: 13 named endpoints, a Feature Hierarchies prerequisite, and edges to be emitted against page "Workflows"

**id:** `synth-dependencies-is-entirely-run-a`  **auditor:** tabs-chain / schemas / script-executability  **split-vote:** False

**where:** workflows/2026-09-01_kg-authorized-approval-limits.mjs:1239 (header), :1250-1298 (body)

**evidence:**

```
sed -n '1239p' → '=== YOUR JOB: BUILD THE ConfigDependencies FOR GROUP 3 ==='
sed -n '1251,1253p' → 'NINE UNRESOLVED ENDPOINTS ALREADY NAME "Workflows" AND THIS RUN SHOULD RESOLVE THEM. Three PRE-COMMIT' / 'FIELD NAMES you must reconcile against rather than reinvent: "workflow_first_step" (dep.g2ar.021,' / 'dep.g2ar.023), "workflow_approval_steps" (dep.g2ar.022), "exception_level_limit" (dep.g2ar.024,'
sed -n '1258,1260p' → 'that do not exist - the controls are fields on "Workflows". Emit them against page "Workflows" so the' / 'graph gains the right edge...' 
sed -n '1260,1261p' → 'FEATURE HIERARCHIES resolves FOUR more - dep.g1.061, dep.g2.003, dep.g5g5.050, dep.g5g5.051 - all' / 'about a SOURCE LIST. Use the exact field name "Source List".'
sed -n '1268,1271p' → 'EMIT THE CONDITIONAL-VISIBILITY EDGE the recon critic recovered: enabling "Require Hardcopy Receipts"' / 'on the Workflows page reveals the "Hold for Invoice Hard Copy" step...'
```

**why it matters:** This run's only roster will hold ~7 Authorized Approval Limits fields. The dependency agent is instructed to resolve thirteen named Workflows/Feature Hierarchies endpoints, to emit edges whose sourceField is 'workflow_first_step' / 'Source List' / 'Require Hardcopy Receipts' — none of which this run builds — and to file them under group 'Approval Authority'. bin/assemble-parts.py resolves endpoints against by_page_field plus the live graph, so Workflows-side names WILL resolve and the edges will merge, permanently attributing a pile of Workflows dependency work to the Approval Authority group where nobody will ever look for it. Worse, it crowds out the one dependency this page actually owes the graph: the conditional visibility of the Authorized Approval Limits link, and the precedence rule between the Approval Limit area and the Level field, which the page brief at :109 calls 'the single most valuable thing on the page'.

**proposed fix:** Change :1239 to '=== YOUR JOB: BUILD THE ConfigDependencies FOR THIS GROUP ==='. Delete :1250-1298 and replace with a block naming only this page's real edges:
    'CROSS-GROUP EDGES ARE THE POINT OF THIS PAGE. It has ~7 fields and its VALUE is almost entirely in its',
    'edges. The four you must not miss, each needing its own verbatim quote:',
    '  1. CONDITIONAL VISIBILITY: the Authorized Approval Limits link appears in the Expense and Invoices',
    '     Setting section ONLY IF the Authorized Approver feature is activated AND the hierarchy has at least',
    '     one level beyond Global. Emit as depends_on against the Workflows-page authorized-approver feature',
    '     field and against Feature Hierarchies. A driver that does not know this will hunt for a missing link.',
    '  2. THE PRECEDENCE RULE between the Approval Limit area and the Level field, verbatim, as an edge.',
    '  3. THE THREE-SETTER RELATIONSHIP: configuration-8b3be88b.md says the amount is set in the Authorized',
    '     Approver List, in User Administration, OR in the employee import. Emit the edge to the built',
    '     Workflows field authorized_approver_approval_limit and say in condition which surface wins, or that',
    '     the corpus does not say. "Undetermined by the documentation" is a correct condition here.',
    '  4. THE ROLE GATE as a precedes edge: User Admin rights AND Invoice User Administration rights.',
    'Endpoints may name already-built pages by their exact graph names - that is what makes these useful.',
    'Do NOT go resolving unrelated Workflows or Feature Hierarchies endpoints; that is another group\'s work.'

> **refuter verdict:** refuted=False conf=high severity=blocker
> fix: As proposed for the header, but the deletion range must be narrowed and the output contract preserved.  1. :1239 — change 'FOR GROUP 3' to 'FOR THIS GROUP'. (Unchanged from the proposal.)  2. Delete ONLY :1250-1285 — the span from 'CROSS-GROUP EDGES ARE THE MOST VALUABLE ONES, AND THIS GROUP IS THE RICHEST IN THEM SO FAR.' through 'relationship.'. Do NOT delete past :1285. Lines :1286-1298 must survive untouched: :1287 'Do not manufacture edges for coverage...', :1289 SYNTH_CONTEXT, :1291 the '=== OUTPUT - write to ' + PARTS + '/synth-dependencies.json ===' line, :1292-1296 the dependency JSON
> CONFIRMED — every quoted line reproduces byte-for-byte at the stated line numbers, and the harm mechanism reproduces in the toolchain source.
> 
> TEXT REPRODUCTION (the observation):
> - `grep -n "ConfigDependencies FOR GROUP 3"` → hits BOTH files: `2026-09-01_kg-authorized-approval-limits.mjs:1239` and `2026-08-31_kg-workflows-run-a.mjs:1256`. Header confirmed at :1239 verbatim.
> - Every evidence excerpt matches at the exact stated lines. `sed -n '1251,1253p'` → 'NINE UNRESOLVED ENDPOINTS ALREADY NAME "Workflows"...' / 'FIELD NAMES you must reconcile...' / 'dep.g2ar.023), "workflow_approval_steps"...'. `sed -n '1258,1261p'` → 'that do not exist - the controls are fields on "Workflows"...' / 'graph gains the right edge...' / 'FEATURE HIERARCHIES resolves FOUR more - dep.g1.061, dep.g2.003, dep.g5g5.050, dep.g5g5.051...' / 'about a SOURCE LIST. Use the exact field name "Source List".' `sed -n '1268,1270p'` → the 'Require Hardcopy Receipts' / 'Hold for Invoice Hard Copy' lines. No paraphrase; all exact.
> - The block is not merely similar to Run A, it is IDENTICAL: `diff <(sed -n '1237,1300p' 2026-09-01...) <(sed -n '1254,1317p' 2026-08-31_kg-workflows-run-a.mjs)` → empty. 64 consecutive lines verbatim from the parent.
> - Extra corroboration the finding did not cite, and it is the self-refuting line: :1281-1282 instruct the agent that "An edge into a page that is NOT YET BUILT (... Administration > Company surfaces such as the Authorized Approval Limits window) is legitimate" — the prom

> **refuter verdict:** refuted=False conf=high severity=high
> fix: Keep the finding's replacement PROSE, but narrow the deletion range and preserve the scaffolding.  1. :1239 — change 'FOR GROUP 3' to 'FOR THIS GROUP'. (Do the same at :1185 for the valueSets phase; same defect, separate finding.)  2. DELETE ONLY :1250-1277 (the Run A block: the nine/thirteen named endpoints, the Feature-Hierarchies "Source List" resolution, the Exceptions hub paragraph, the EMIT-hardcopy imperative, the EMIT-cross-surface-override imperative, and the three two-surface patterns). Do NOT touch :1240-1249 (edge-type definitions and the verbatim-quote rule) or anything at or afte
> OBSERVATION — verified byte-identical, not merely "similar".
> `awk 'NR>=1236&&NR<=1299' 2026-09-01_kg-authorized-approval-limits.mjs > new.txt; awk 'NR>=1256&&NR<=1320' 2026-08-31_kg-workflows-run-a.mjs > old.txt; diff -u old.txt new.txt` → the ONLY diff hunks are the `() => agent([ / PREAMBLE / ''` wrapper shifting position. Lines 1239-1298 of the child are a verbatim copy of the parent's 1256-1315. Zero adaptation, including the header "=== YOUR JOB: BUILD THE ConfigDependencies FOR GROUP 3 ===" at :1239 (and the twin at :1185 for valueSets).
> 
> CONSEQUENCE — traced end to end, every step mechanical, none speculative.
> 1. Mis-attribution is unconditional. merge-group.py:145-150 stamps `'group': group` on EVERY edge in the part file; the script sets `const GROUP = 'Approval Authority'` (:102). There is no per-edge group override. Any edge the agent emits — including Workflows→Workflows edges — is filed under Approval Authority.
> 2. The Workflows-side endpoints DO resolve, exactly as the finding claims. merge-group.py:88-90 seeds the resolution index from ALL existing `n['configFields']` before the new page is added, and lines 216-229 re-resolve every edge against the full graph afterward. So `{page: "Workflows", field: <existing name>}` binds to real node ids and merges cleanly.
> 3. Two of the imperatives order re-emission of edges that ALREADY EXIST. Querying output/kg-invoice-config.json: the hardcopy edge is already `dep.gworkflows.014/.015` (require_hardcopy_receipts → step_na

---

## [high] synth:contradictions orders the agent to emit "NINE CONTRADICTIONS ON THE WORKFLOWS PAGE (C1-C9 in the page brief)" — the page brief for this run contains no C1-C9

**id:** `synth-contradictions-phantom-c1-c9`  **auditor:** stale-content-audit / 2026-09-01_kg-authorized-approval-limits.mjs  **split-vote:** False

**where:** workflows/2026-09-01_kg-authorized-approval-limits.mjs:1307-1312

**evidence:**

```
awk 'NR>=1307 && NR<=1312':
  'DEDUPE FIRST. Three lenses ran per page and they overlap heavily - in Group 3, 47 raw records'
  'collapsed to 26. THE RECON ALREADY IDENTIFIED NINE CONTRADICTIONS ON THE WORKFLOWS PAGE (C1-C9 in the'
  'page brief) - emit them as nodes with their own verbatim readings, plus the uiVariant contradiction'
  '(inherited finding 6: a dated 2025-09-19 line says the Workflows topics were rewritten to the new UI'
  'in place, while a tools-guides topic says the admin uses the classic interface)...'
grep -c 'C1' on the AAL seeds string (line 109) → the seeds contain no C1-C9 list; the Run A seeds did (run-a:124).
```

**why it matters:** The agent is given a mandatory emit-list that does not exist in its context. It will either hallucinate nine Workflows contradictions (which would be merged under group 'Approval Authority' and re-home Workflows-page disagreements onto this page), or go hunting through output/reports/2026-08-31_workflows-recon/ and burn its budget on the wrong page. Meanwhile the two REAL contradictions on this page are named nowhere.

**proposed fix:** Replace :1307-1312 with:
  'DEDUPE FIRST. Three lenses ran on one page and they overlap heavily. Two records are the same node when'
  'they are about the same disagreement: merge them, taking the UNION of readings deduplicated on'
  '(sourceFile, sourceQuote). More grounded readings on one node beats two nodes with one reading each.'
  'TWO CONTRADICTIONS ARE ALREADY KNOWN ON THIS PAGE AND BOTH VERIFY WITH grep -F. Emit them as nodes with'
  'their own readings, and hunt for more:'
  '  (a) WHICH FEATURE GATES THE LINK. user-administrator-fcfd570c.md: "If the Authorized Approver feature'
  '      is activated and the company\'s Authorized Approver hierarchy has at least one level (in addition to'
  '      Global), then the Authorized Approval Limits link appears". user-administration-8b167b96.md: "When'
  '      the Cost Object Approver feature is activated, the Authorized Approval Limits link appears in the'
  '      Expense and Invoices Settings section in User Administration." consequenceForWriter is real: a'
  '      driver has to know which feature flag to check before it looks for the link.'
  '  (b) NAV DEPTH INSIDE ONE FILE. fcfd570c writes the path BOTH as "in Administration > Company > Company'
  '      Admin > User Administration" (twice) and as "(Administration > User Administration)". Two- vs'
  '      four-segment. Record the majority form and the disagreement; a driver tries the longer first.'
  '  Also check the section-name drift "Expense and Invoices Setting" vs "...Settings" across the two files.'
  'uiVariant: expect "undifferentiated". No *-new-experience-* file exists for this surface. Do not claim'
  '"both" - three unearned "both" claims are already outstanding debt.'
Keep :1313-1330 verbatim (merge rule, grounding rule, do-not-reconcile, range rules).

> **refuter verdict:** refuted=False conf=high severity=high
> fix: As proposed, with one boundary correction: the replacement must cover lines 1307-1316, not 1307-1312, and the "keep verbatim" tail begins at 1317.  Reason: 1312 ends mid-sentence ("...C1-C5 are all LABEL contradictions") and 1313 continues "and a Chromium driver matches on labels. Two records are the same node when they are about the same disagreement: merge" running through 1316 "genuinely different things." Replacing only 1307-1312 strands that clause, and the proposed replacement text already restates the merge rule, so 1313-1316 would be duplicated.  Final shape:   DELETE 1307-1316.   INSE
> REPRODUCED EXACTLY, then strengthened.
> 
> 1) The text exists verbatim at the stated location.
> `awk 'NR>=1295 && NR<=1340'` on 2026-09-01_kg-authorized-approval-limits.mjs prints, at 1307-1312:
>   1307 'DEDUPE FIRST. Three lenses ran per page and they overlap heavily - in Group 3, 47 raw records'
>   1308 'collapsed to 26. THE RECON ALREADY IDENTIFIED NINE CONTRADICTIONS ON THE WORKFLOWS PAGE (C1-C9 in the'
>   1309 'page brief) - emit them as nodes with their own verbatim readings, plus the uiVariant contradiction'
>   1310 '(inherited finding 6: a dated 2025-09-19 line says the Workflows topics were rewritten to the new UI'
>   1311 'in place, while a tools-guides topic says the admin uses the classic interface). Do not re-derive them'
>   1312 'from scratch and do not drop one because it looks like mere wording: C1-C5 are all LABEL contradictions'
> The observation is exact. `grep -n 'C1'` on the AAL script returns ONLY 1308 and 1312 — no definition anywhere.
> 
> 2) It is inherited Run A text, byte-for-byte. Same two lines appear in 2026-08-31_kg-workflows-run-a.mjs at 1325 and 1329. The Run A seeds (run-a:120) DO carry the definition: "### CONTRADICTIONS THE RECON RECORDED - CARRY THEM, DO NOT RECONCILE: C1 Settings called 'Settings tab' vs ... C9 THE ROLE-GATE CONTRADICTION...". So the referent lived in Run A's brief and was left behind.
> 
> 3) The referent is absent from this run's brief. python3 on line 109 (the AAL seeds, 5,927 chars): `'C1' in s` → False; `'CONTRADICT' in s.upper()` → Fal

> **refuter verdict:** refuted=False conf=high severity=high
> fix: As proposed, with two amendments:  (1) KEEP the Group-3 calibration datum. The proposed replacement drops "in Group 3, 47 raw records collapsed to 26" and keeps only "they overlap heavily". That number is a transferable anchor for how aggressively to dedupe and costs one clause. Open the replacement with:   'DEDUPE FIRST. Three lenses ran on one page and they overlap heavily - in Group 3, 47 raw records'   'collapsed to 26. Two records are the same node when they are about the same disagreement: merge'   ...then the rest of the proposed text unchanged.  (2) NAME THE LEGAL kind FOR THE TWO SEED
> OBSERVATION CONFIRMED, and it is not boilerplate.
> 
> 1. The phantom reference is real and the source is identified.
> `grep -n 'C1\b|C1-C9|C1-C5|C9\b'` on the AAL script returns exactly two hits, both inside the synth:contradictions prompt: :1308 ("THE RECON ALREADY IDENTIFIED NINE CONTRADICTIONS ON THE WORKFLOWS PAGE (C1-C9 in the page brief)") and :1312 ("C1-C5 are all LABEL contradictions"). The same grep on the Run A parent returns those two lines (run-a:1325, :1329) PLUS run-a:120 — the Run A seeds string, which defines C1..C9 verbatim ("C1 Settings called 'Settings tab' vs ... C9 THE ROLE-GATE CONTRADICTION"). So Run A's directive was grounded in its own page brief; the AAL copy kept the pointer and lost the referent.
> 
> 2. The referent is absent from the AAL agent's context — twice over.
> `sed -n '109p'` (the AAL seeds, i.e. the page brief) contains no C-list at all. And the synth prompt does not even receive the page brief: SYNTH_CONTEXT (:1160-1179) is rosterList + extract file paths + KG path + ALREADY_BUILT + page names. `grep -n 'pageBrief'` returns ZERO hits in the AAL script (run-a defines it at :569 and injects it at :672/:731). So the synth:contradictions agent is handed a mandatory emit-list — "emit them as nodes", "Do not re-derive them from scratch and do not drop one because it looks like mere wording" — pointing at a document it does not have.
> 
> 3. Compliance is achievable, which makes it worse, not harmless. `ls output/reports/` shows `2026-08-31_workflows-recon

---

## [high] synth:steps hands the agent worked examples that are all Workflows procedures (General -> Steps -> Step Rules, email-notification tabs, Settings-tab thresholds)

**id:** `synth-steps-workflow-wizard`  **auditor:** stale-content-audit / 2026-09-01_kg-authorized-approval-limits.mjs  **split-vote:** False

**where:** workflows/2026-09-01_kg-authorized-approval-limits.mjs:1355-1364

**evidence:**

```
awk 'NR>=1355 && NR<=1364':
  'Aim for 4 to 7 steps that cover the genuinely useful procedures here - for example standing up a new'
  'approval workflow end to end (General -> Steps -> Step Rules -> assign to a policy/group), configuring'
  'the Authorized Approver feature (which REQUIRES the Feature Hierarchies page first), authoring an email'
  'notification on its tab and then selecting it on the workflow General page, and setting the three'
  'exception-level thresholds on the Settings tab. The corpus hands you real ordering: workflow-creation-'
  'process-1d37b85f.md, the step-N topics, and tools-guides/overview-of-steps-37e3c289.md ...'
The graph already holds 41 configSteps including grpworkflows-s2-configure-authorized-approver-feature (which cites configuration-8b3be88b.md — one of THIS run's five seeds).
```

**why it matters:** Three of the four worked examples are procedures the Workflows build already produced as steps. 'Aim for 4 to 7 steps' on a seven-field page with one documented procedure will force the agent to pad by re-authoring built Workflows steps under the grpapproval-authority- prefix. The step-id prefix and its rationale (:1366-1367) were correctly updated, so the padding would merge cleanly and be invisible.

**proposed fix:** Replace :1355-1364 with:
  'THIS IS A SMALL PAGE WITH ONE OR TWO GENUINE END-TO-END PROCEDURES. Aim for 1 to 3 steps, not 4 to 7.'
  'Padding here means re-authoring steps the Workflows build already produced - the graph already holds'
  'grpworkflows-s2-configure-authorized-approver-feature, which cites configuration-8b3be88b.md, one of this'
  'run\'s own seed files. READ THE 41 EXISTING STEPS IN ' + KG + ' BEFORE YOU WRITE ONE.'
  'The procedures that are genuinely THIS page\'s, and the corpus states their ordering:'
  '  (1) Assign a per-approver authorization limit in the Authorized Approval Limits window. It has a hard'
  '      PRECONDITION CHAIN the corpus states: the Authorized Approver feature must be activated AND the'
  '      hierarchy (built on the Feature Hierarchies page) must carry at least one non-Global level, or the'
  '      link never appears. Cross into the built pages Feature Hierarchies and Workflows by exact name.'
  '  (2) The Global-group-only variant: the inline Authorized Approver check box -> Manager Approval Limit +'
  '      Approval Limit Currency -> Save. user-administration-8b167b96.md gives the numbered sequence for'
  '      the windowed variant verbatim ("1. In the Expense and Invoices Settings section ... click the'
  '      Authorized Approval Limits link." / "2. On the left side, select the appropriate level ...").'
  'Mark the precondition rationale CORPUS-STATED and quote it. If the corpus supports no third procedure,'
  'do not invent one for symmetry.'
PRESERVE :1350-1353 (the rationale rule) and :1366-1370 (step-id prefix — already correctly updated to grpapproval-authority-).

> **refuter verdict:** refuted=False conf=high severity=high
> fix: Adopt the proposed replacement for :1355-1364, with three corrections. Keep :1350-1353 and :1366-1370 as the finding says (both verified correct in place).  CORRECTION 1 (must add — the deletion needs to be explicit and justified). The proposed replacement silently drops the citations at :1359-1362. Say so out loud in the new prompt, because an agent that greps the corpus will re-find them:   'DO NOT use tools-guides/overview-of-steps-37e3c289.md as ordering authority for this page. Its "Step 6:'   'User Administration" is the VENDOR GROUP assignment task ("uses the newly-added field in Step 6
> EVERY LOAD-BEARING CLAIM REPRODUCED. Nothing refuted; two aggravating facts found.
> 
> 1. THE TEXT EXISTS EXACTLY AS QUOTED, AND IS A BYTE-IDENTICAL RUN A CARRYOVER.
> `awk 'NR>=1355 && NR<=1364'` on /mnt/c/Users/manci/PROJECTS/concur-config-diver-support/workflows/2026-09-01_kg-authorized-approval-limits.mjs returns the ten lines verbatim as quoted in the finding.
> `diff <(sed -n '1355,1364p' 2026-09-01_kg-authorized-approval-limits.mjs) <(sed -n '1372,1381p' 2026-08-31_kg-workflows-run-a.mjs)` produced NO OUTPUT — the block is identical to Run A's synth:steps prompt. The header immediately above it WAS localized (:1346 "FOR THIS GROUP" vs Run A :1363 "FOR THE WORKFLOWS GROUP"), and the step-id prefix at :1366-1367 WAS correctly changed to "grpapproval-authority-" (Run A :1383-1384 says "grpworkflows-"). So the edit pass touched lines on both sides of :1355-1364 and left the worked examples untouched. That is exactly the "correctly updated prefix + stale body" shape the finding describes.
> 
> 2. THE GRAPH CLAIM IS EXACT. python3 over output/kg-invoice-config.json (nodes.configSteps): TOTAL = 41. `grpworkflows-s2-configure-authorized-approver-feature` exists, name "Configure the Authorized Approver feature (hierarchy first, then activation, then steps, then the approver list)". Regex over its serialized JSON for `[a-z0-9-]+-[0-9a-f]{8}\.md` returns configuration-8b3be88b.md — TRUE, it cites one of this run's own five seeds (seeds confirmed at :109: "configuration-8b3be88b.md (admin, 1

> **refuter verdict:** refuted=False conf=high severity=high
> fix: Adopt the proposed replacement of :1355-1364 as written — its quotes and page names are corpus-verified and it deletes no method. Add three things it misses:  (1) ADD AN EXPLICIT NON-DUPLICATION RULE. The fix relies on the agent inferring "don't duplicate" from being told to read the 41 steps. Make it a rule, because ALREADY_BUILT:555 ("do not rebuild, do not duplicate") is scoped to pages and fields and no downstream guard covers steps:   'A ConfigStep THAT DUPLICATES A BUILT STEP IS INVISIBLE TO EVERY GUARD DOWNSTREAM: merge-group.py'   'appends steps with no dedup (it dedups dependencies bu
> OBSERVATION CONFIRMED VERBATIM. `grep -n "Aim for 4 to 7 steps"` hits both files: 2026-09-01_kg-authorized-approval-limits.mjs:1355 and 2026-08-31_kg-workflows-run-a.mjs:1372. `diff` of the synth:steps block shows ONLY three lines were adapted (the header at :1346, the step-id prefix at :1366-1367, the id template at :1375); lines 1355-1364 are byte-identical Run A text.
> 
> ALL FOUR WORKED EXAMPLES ARE ALREADY-BUILT STEPS, not three. The graph (`output/kg-invoice-config.json`, nodes.configSteps, 41 steps) contains: grpworkflows-s1-stand-up-invoice-approval-workflow-end-to-end ("General -> Steps -> Step Rules -> Policy"), grpworkflows-s2-configure-authorized-approver-feature, grpworkflows-s4-author-email-notification-and-select-it-on-a-workflow, grpworkflows-s5-set-exception-level-submission-and-transmission-blocks. The example at :1359-1362 (the six-tool "order presented" sequence) is grpworkflows-s3. Five of five map to built steps.
> 
> THE CONSEQUENCE PATH IS CONCRETE, NOT SPECULATIVE — and every guard I checked is absent:
> 1. merge-group.py:202-204 appends steps with no dedup. Contrast :209-214, where dependencies ARE deduped on a composite key. Steps are the only synthesized node type with no collision check. Merge is namespaced by group (:81 removes by `group` tag), so grpapproval-authority-configure-authorized-approver-feature coexists permanently beside grpworkflows-s2.
> 2. validate-graph.py:198-207 is the whole ConfigStep invariant block: it only WARNS on step-references-unk

---

## [high] Lens C's charter tells the agent NOT to search the word "workflow" in tools-guides — suppressing the file that proves this page is in scope

**id:** `lens-c-charter-suppresses-scope-proof`  **auditor:** stale-content-audit / 2026-09-01_kg-authorized-approval-limits.mjs  **split-vote:** True

**where:** workflows/2026-09-01_kg-authorized-approval-limits.mjs:153

**evidence:**

```
Full line 153: 'LENS C - TOOLS-GUIDES AND CROSS-CUTTING. ... Of 486 fields in the graph so far, only 60 cite tools-guides. ... FOR THIS GROUP SPECIFICALLY: grep for "Workflows tool/page/tab" over the 650 tools-guides files returns ZERO, so admin-guides is the FIELD SOURCE here - but SIXTEEN tools-guides files say "Invoice Configuration administrator", so tools-guides is still your CORROBORATION sweep. Search that phrase, "(left menu)" and "Invoice Processing Admin", not the word "workflow".'
Measured now: graph holds 607 fields, not 486. In tools-guides, grep -rliF returns: 'authorized approver' 2 files (how-single-step-approval-workflow-works-40145f24.md, workflow-and-approval-routing-8b4ff6c9.md), 'approval limit' 2, 'limit approval' 2, 'User Administration' 14, 'Invoice Configuration administrator' 16 case-sensitive / 22 case-insensitive.
```

**why it matters:** tools-guides/workflow-and-approval-routing-8b4ff6c9.md is THE file the header (:29-32) and the handoff both cite as the corpus proof that this page configures Invoice through the non-PO capability. The charter's closing clause instructs the one lens that owns tools-guides not to search the term that finds it, and points it instead at 'Invoice Processing Admin' — a middle nav node that has nothing to do with this page's Administration > Company path. The stale 486 also understates the tools-guides skew the lens exists to correct.

**proposed fix:** Rewrite the tail of :153 from 'FOR THIS GROUP SPECIFICALLY:' onward as:
  '... Of 607 fields in the graph so far, only ~60 cite tools-guides. That ratio is a bug, not a fact about'
  'the corpus. FOR THIS PAGE SPECIFICALLY: tools-guides is THIN but NOT empty and one of its files is'
  'load-bearing. grep -rliF returns "authorized approver" in 2 files, "approval limit" in 2, "limit'
  'approval" in 2, "User Administration" in 14, "Invoice Configuration administrator" in 16. READ'
  'tools-guides/workflow-and-approval-routing-8b4ff6c9.md FIRST: it carries the sentence that establishes'
  'this page configures Concur Invoice - "All workflow options available for non-PO policies are also'
  'available to a PO-based invoice policy. This includes options such as workflow rules and Authorized'
  'Approvers." Also read tools-guides/how-single-step-approval-workflow-works-40145f24.md, but note the'
  'built Workflows page ALREADY cites it - use it for corroboration, never as a field source here.'

> **refuter verdict:** refuted=False conf=high severity=medium
> fix: As proposed, with two edits: use the measured 66, and drop the overclaim that the file would otherwise be missed (seeds :109 already hand it over). Replace :153 from 'FOR THIS GROUP SPECIFICALLY:' onward with:  '... Of 607 fields in the graph so far, only 66 cite tools-guides. That ratio is a bug, not a fact about the corpus. FOR THIS PAGE SPECIFICALLY: tools-guides is THIN but NOT empty and one of its files is load-bearing. Measured over the 650 tools-guides files, grep -rliF returns "authorized approver" in 2 files, "approval limit" in 2, "limit approval" in 2, "User Administration" in 14, "
> OBSERVATION — reproduces exactly, byte-for-byte.
> 
> 1. Line exists as quoted. `sed -n '153p' 2026-09-01_kg-authorized-approval-limits.mjs | cat -A` returns the full charter string verbatim, ending `...Search that phrase, "(left menu)" and "Invoice Processing Admin", not the word "workflow".',` (file is 1588 lines).
> 
> 2. It is inherited Run A text, not adapted. `diff <(sed -n '170p' 2026-08-31_kg-workflows-run-a.mjs) <(sed -n '153p' 2026-09-01_kg-authorized-approval-limits.mjs)` → IDENTICAL. The same three-phrase corroboration recipe also appears inside Run A's own seeds at 2026-08-31_kg-workflows-run-a.mjs:120 ("tools-guides is checked for CORROBORATION via 'Invoice Configuration administrator' / '(left menu)' / 'Invoice Processing Admin'"). So this is confirmed stale Run A carry-over, not text authored for this page.
> 
> 3. Stale numbers confirmed. `python3` over output/kg-invoice-config.json: configFields = 607, configPages = 22 (charter says 486). By `sourceFile` prefix: admin-guides 523, tools-guides 66, "CONCUR_INVOICE/" 18 — so "only 60" is now 66 (87 fields mention tools-guides anywhere in their JSON). The 486 is flatly wrong; the 60 is stale-by-6.
> 
> 4. The grep counts in the evidence all reproduce, in concur-invoice-professional-edition-tools-guides/ (650 files, `ls | wc -l` = 650):
>    grep -rliF "authorized approver" → 2 (how-single-step-approval-workflow-works-40145f24.md, workflow-and-approval-routing-8b4ff6c9.md); "approval limit" → 2; "limit approval" → 2; "User Adminis

> **refuter verdict:** refuted=True conf=high severity=low
> fix: Minimal correction to :153 only — do NOT adopt the proposed rewrite (it front-loads a 1.5 KB file already quoted in-prompt and thins the anti-skew framing). Change two things and stop:  1. Refresh the counts: "Of 486 fields in the graph so far, only 60 cite tools-guides" -> "Of 607 fields in the graph so far, only 87 cite tools-guides".  2. Replace the Run A-specific tail, from "FOR THIS GROUP SPECIFICALLY:" to the end of the line, with:    'FOR THIS PAGE SPECIFICALLY: tools-guides is THIN. Measured with grep -rliF over the 650 files: "authorized approver" 2, "approval limit" 2, "User Administ
> OBSERVATION GRANTED, AND IT IS BYTE-EXACT STALE TEXT.
> `diff <(grep -o "LENS C.*" 2026-08-31_kg-workflows-run-a.mjs) <(grep -o "LENS C.*" 2026-09-01_kg-authorized-approval-limits.mjs)` prints IDENTICAL. Run A line 170 == this run's line 153, character for character. The counts are stale: `python3` over output/kg-invoice-config.json gives configPages 22 / configFields 607 (not 486), and 87 of 607 field records contain the string "tools-guides" (not 60). The prescribed phrase list also provably misses the scope-proof file — `grep -ciF` on tools-guides/workflow-and-approval-routing-8b4ff6c9.md returns 0 for "Invoice Configuration administrator", 0 for "(left menu)", 0 for "Invoice Processing Admin", and 0 for "User Administration"; the only hit is "Authorized Approver" (1), and the charter says "not the word 'workflow'" while the filename is workflow-and-approval-routing. All of the auditor's raw measurements reproduce.
> 
> THE CONSEQUENCE CLAIM DOES NOT SURVIVE. The finding's harm story is "the one lens that owns tools-guides is steered away from the file that proves scope." That path is closed by the prompt itself. `sed -n 860,900p` shows the extract prompt is `[PREAMBLE, YOUR JOB, L.charter, pageContext(p), ALREADY_BUILT, ...].join('\n')`, and `pageContext` (line 740) puts `p.seeds` at the top. The seeds string at line 109 — in the SAME prompt as the charter, far longer and page-specific — already contains, verbatim: "stated verbatim in tools-guides/workflow-and-approval-routing-

---

## [high] synth:valueSets is titled "FOR GROUP 3" and its output schema says appliesToPage must be "one of the two Group 3 page names"

**id:** `synth-valuesets-group-3`  **auditor:** stale-content-audit / 2026-09-01_kg-authorized-approval-limits.mjs  **split-vote:** False

**where:** workflows/2026-09-01_kg-authorized-approval-limits.mjs:1185, :1221

**evidence:**

```
:1185 '=== YOUR JOB: BUILD THE ConfigValueSets FOR GROUP 3 ==='
:1221 '  "valueSets": [ { "appliesToPage": "<one of the two Group 3 page names>",'
Identical strings at 2026-08-31_kg-group-3.mjs:1117/:1153 and 2026-08-31_kg-workflows-run-a.mjs:1202/:1238 — the residue survived TWO adaptations untouched.
```

**why it matters:** :1221 is the literal output template. An agent following it will write appliesToPage as 'Purchase Order Matching Rules' or 'Purchase Order Configuration', or will stall. Any value set that lands with a Group 3 page name is silently unwired — the exact defect the prompt's own '=== THE ONE RULE THAT KEEPS BREAKING ===' section (:1192-1200) exists to prevent, and the one that put 17 of 18 sets on nothing in a prior run.

**proposed fix:** :1185 -> '=== YOUR JOB: BUILD THE ConfigValueSets FOR THIS GROUP ==='.
:1221 -> '  "valueSets": [ { "appliesToPage": "Authorized Approval Limits",'.
Add after :1207: 'EXPECT VERY FEW OR ZERO VALUE SETS. This page has no enumerated option lists - both primaries return 0 for grep -c "<table" and 0 for grep -cP "^\\s*\\|". The only enumeration-shaped things are the currency selector (never enumerated in the corpus) and the hierarchy Level selector (whose values are tenant data, not documentation). An empty valueSets array with an honest note is the correct output; report anything you cannot own in orphanCandidates.'
PRESERVE :1186-1215 (the Audit Rules worked example, the appliesToField rule, completeness, validValuesAdditions) — all load-bearing method.

> **refuter verdict:** refuted=False conf=high severity=high
> fix: as proposed
> REPRODUCED VERBATIM — every stated location and string is exact.
> 
> `sed -n '1180,1230p'` on /mnt/c/Users/manci/PROJECTS/concur-config-diver-support/workflows/2026-09-01_kg-authorized-approval-limits.mjs:
>   :1185  '=== YOUR JOB: BUILD THE ConfigValueSets FOR GROUP 3 ==='
>   :1221  '  "valueSets": [ { "appliesToPage": "<one of the two Group 3 page names>",'
> Both byte-for-byte as quoted.
> 
> Ancestry claim also confirmed. `grep -n "GROUP 3\|Group 3"` across all three:
>   2026-08-31_kg-group-3.mjs        :1117 / :1153
>   2026-08-31_kg-workflows-run-a.mjs :1202 / :1238
>   2026-09-01_kg-...-limits.mjs      :1185 / :1221
> Identical strings, survived two adaptations.
> 
> THE CONFLICT IS REAL AND INTERNAL. PAGES (:104-108) holds exactly one page, name 'Authorized Approval Limits' (:107). SYNTH_CONTEXT (:1160-1179) is interpolated at :1217 — between the stale header and the stale template — and :1174 renders 'Page names for THIS run, exactly as they must be written: "Authorized Approval Limits".' So the prompt states the correct sole legal name four lines above a template telling the agent to write one of two other names.
> 
> THE WRONG NAMES ARE RESOLVABLE FROM INSIDE THE SAME PROMPT. ALREADY_BUILT (:554-561) is embedded in SYNTH_CONTEXT at :1172, and :558 reads '  Group 3: Purchase Order Matching Rules, Purchase Order Configuration'. An agent obeying :1221 does not have to guess — it can read the two names 47 lines up, exactly as whyItMatters predicts.
> 
> HARM MECHANISM — one part of whyItMatters is i

> **refuter verdict:** refuted=False conf=high severity=low
> fix: Make the string swaps ONLY; drop the added paragraph entirely.  :1185 -> '=== YOUR JOB: BUILD THE ConfigValueSets FOR THIS GROUP ===' :1221 -> '  "valueSets": [ { "appliesToPage": "Authorized Approval Limits",'  Additionally, same class and same phase, so fold it into this edit rather than leaving it behind: :1162 -> '"name" values in them are the ONLY legal field names for this run\'s page:'   (currently says "these two pages"; SYNTH_CONTEXT is shared by all four synth agents at :1217/:1289/:1332/:1372).  DO NOT add the proposed "EXPECT VERY FEW OR ZERO VALUE SETS" paragraph. It pre-decides t
> OBSERVATION CONFIRMED. `grep -n "GROUP 3\|Group 3"` on 2026-09-01_kg-authorized-approval-limits.mjs returns :1185 and :1221 exactly as cited, and `sed -n '1117p;1153p' 2026-08-31_kg-group-3.mjs` / `sed -n '1202p;1238p' 2026-08-31_kg-workflows-run-a.mjs` return byte-identical strings. The residue is real and survived two adaptations.
> 
> BUT THE CONSEQUENCE CLAIM IS SUBSTANTIALLY WRONG, ON FOUR INDEPENDENT CHECKS.
> 
> 1. NATURAL EXPERIMENT — THE IDENTICAL TEXT ALREADY RAN AND DID NOT LEAK. Run A shipped with the same :1202/:1238 strings. Its raw synth output (output/reports/2026-08-31_workflows-run-a-parts/synth-valuesets.json) gives `Counter({'Workflows': 22, 'Feature Hierarchies': 4})` over 26 sets — ZERO landed on a Group 3 page name. The opus agent resolved the `<...>` placeholder from SYNTH_CONTEXT, which at :1174 states `Page names for THIS run, exactly as they must be written: "<PAGES.map>"` and is injected at :1217, i.e. inside the same prompt, immediately before the template. Run A is the direct precedent for the predicted failure and it did not occur.
> 
> 2. "SILENTLY UNWIRED" IS FALSE — THERE IS A HARD GATE. validate-graph.py:104-107 buckets an unwired value set into `errors` (not `warns`) unless `knownGap` is set: `bucket = warns if v.get('knownGap') else errors`, and the file header says "Exit 1 if any ERROR-level invariant is violated." assemble-parts.py:355-357 additionally prints `VALUE-SET-WOULD-LAND-UNWIRED` for any key absent from `by_page_field` (built at :335 from 

---

## [high] SYNTH_CONTEXT says "these two pages", "the 20 pages already built", and carries the Workflows tab-vs-page naming rule instead of this run's page-name rule

**id:** `synth-context-tab-rule`  **auditor:** stale-content-audit / 2026-09-01_kg-authorized-approval-limits.mjs  **split-vote:** False

**where:** workflows/2026-09-01_kg-authorized-approval-limits.mjs:1161-1178

**evidence:**

```
:1162 'name" values in them are the ONLY legal field names for these two pages:'
:1170 'names for the 20 pages already built. Cross-group references are valuable and must use exact names.'
:1175-1178 'TAB NAMES ARE NOT PAGE NAMES. A control on the Settings tab is a field on the page "Workflows"; it is NEVER on a page called "Settings", "Workflow Settings", "Purchase Request Settings" or "Invoice Settings". "Invoice Settings" IS A DIFFERENT, ALREADY-BUILT PAGE and writing that name here would silently merge two surfaces. Use the tab name in the field NOTES, never as the page.'
Ground truth: 22 pages built. SYNTH_CONTEXT feeds all four synthesize agents (:1217, :1289, :1332, :1372).
```

**why it matters:** This constant is the naming authority for every node the run emits, and its one page-naming rule is about Workflows tabs. The rule this run needs is the mirror image and is missing: the containing surface here is called 'User Administration' in six existing graph endpoints, so the highest-probability naming error is writing 'User Administration' (or 'Administration > Company > User Administration') as appliesToPage/sourcePage. Nothing warns against it.

**proposed fix:** Fix :1162 to 'name" values in them are the ONLY legal field names for this page:' and :1170 to '...names for the 22 pages already built...'. Replace :1175-1178 with:
  'THE PAGE NAME FOR THIS RUN IS EXACTLY "Authorized Approval Limits". It is NOT "User Administration",'
  'not "Administration > Company > User Administration", not "Company Admin". Those name the CONTAINING'
  'surface, which this graph does not build, and six existing unresolved endpoints already use them -'
  'writing one of them here would create a page that is not this one.'
  'AND IT IS NOT "Workflows". "Workflows" IS A DIFFERENT, ALREADY-BUILT PAGE (114 fields) whose Authorized'
  'Approvers > Authorized Approver List tab carries controls with the SAME LABELS as this page. Writing'
  '"Workflows" for a control of this window, or vice versa, silently merges two surfaces and the'
  'deterministic validator cannot see it. When you reference the Workflows sibling, do it as a dependency'
  'endpoint or in notes with its exact field id - never by re-homing.'

> **refuter verdict:** refuted=False conf=high severity=high
> fix: As proposed for :1162 ("...for this page:") and :1170 ("...names for the 22 pages already built..."), and as proposed for the replacement of :1175-1178 — with three amendments:  (a) In the replacement text, fix the count: "six existing unresolved endpoints already use them" is wrong. Measured, the graph carries SEVEN page-keyed occurrences — five dependency targetRef.page (three "User Administration", two "Administration > Company > User Administration", all resolved:false) and two configSteps sequence page values. Write "seven existing endpoints, five of them unresolved dependency targets" or
> REPRODUCED IN FULL — every quoted string exists byte-exactly at the stated lines, and the whole block is unadapted Run A text.
> 
> 1) Verbatim evidence (grep -Fn on /mnt/c/Users/manci/PROJECTS/concur-config-diver-support/workflows/2026-09-01_kg-authorized-approval-limits.mjs):
>    1162:  '"name" values in them are the ONLY legal field names for these two pages:'
>    1170:  'names for the 20 pages already built. Cross-group references are valuable and must use exact names.'
>    1175:  'TAB NAMES ARE NOT PAGE NAMES. A control on the Settings tab is a field on the page "Workflows"; it is'
>    1176-1178 continue with '"Invoice Settings" IS A DIFFERENT, ALREADY-BUILT PAGE ... Use the tab name in the field NOTES, never as the page.'
>    SYNTH_CONTEXT spans :1160-1179 and is consumed at :1217, :1289, :1332, :1372 (grep -n SYNTH_CONTEXT) — all four synthesize agents, as claimed.
> 
> 2) It is 100% inherited, not merely stale-looking. Extracting the block from both scripts with sed -n '/^const SYNTH_CONTEXT/,/^\].join/p' and diffing:
>    diff a.txt b.txt -> IDENTICAL TO RUN A (zero lines changed from 2026-08-31_kg-workflows-run-a.mjs, where the same rule sits at :1192).
> 
> 3) Ground truth confirms every count in the finding. python3 over output/kg-invoice-config.json:
>    configPages 22, configFields 607 (so ":1170 '20 pages'" is wrong by 2), and Counter on field.pageId gives page.workflows = 114 — the "114 fields" in the proposed fix is correct.
>    PAGES in this script (:104-111) contains exactly ON

> **refuter verdict:** refuted=False conf=high severity=high
> fix: Apply as proposed, with three corrections.  1. :1162 -> 'name" values in them are the ONLY legal field names for this page:' and :1170 -> '...names for the 22 pages already built...'. Correct as written.  2. In the replacement for :1175-1178, fix the endpoint count: it is FIVE dependency endpoints (dep.g1.060, dep.g5.024, dep.g5.026, dep.gworkflows.046, dep.gworkflows.060 — the last one is exactly {page "User Administration", field "Authorized Approval Limits"}), plus TWO already-built configSteps (grpworkflows-s2-configure-authorized-approver-feature, grpworkflows-s3-vendor-employee-access-hi
> OBSERVATION CONFIRMED VERBATIM. `sed -n '1140,1200p' workflows/2026-09-01_kg-authorized-approval-limits.mjs` shows SYNTH_CONTEXT at :1160-1179 with :1162 "these two pages", :1170 "the 20 pages already built", and :1175-1178 the Workflows tab rule ("A control on the Settings tab is a field on the page \"Workflows\"... \"Invoice Settings\" IS A DIFFERENT, ALREADY-BUILT PAGE"). `grep -n SYNTH_CONTEXT` confirms it is injected at :1217, :1289, :1332, :1372 — all four synth agents.
> 
> GROUND TRUTH. python3 over output/kg-invoice-config.json: 22 configPages / 607 configFields, so ":1170 20 pages" is stale by two (Workflows and Feature Hierarchies, the Run A output). PAGES (:104-111) holds exactly ONE page, so rosterList interpolated at :1163 has one entry and ":1162 these two pages" is wrong. Workflows carries 114 fields and all four colliding controls exist as stated (field.workflows.authorized-approver-approval-limit "Approval Limit", -level "Level", -can-approve-exception "Can approve exception", -list-approver "Approver").
> 
> THE HAZARD IS NOT SPECULATIVE — IT IS PRIMED BY THE GRAPH THE PROMPT ORDERS THE AGENT TO READ. A regex over every page-slot in the graph returns 9 hits for "User Administration": dependency endpoints dep.g1.060, dep.g5.024, dep.g5.026, dep.gworkflows.046, dep.gworkflows.060 (that last one is literally {page "User Administration", field "Authorized Approval Limits"}), plus configSteps grpworkflows-s2-configure-authorized-approver-feature and grpworkflows-s3-... 

---

## [high] The handoff's "Change exactly ONE thing" instruction is wrong and should be corrected before it is followed again

**id:** `handoff-one-thing-claim`  **auditor:** stale-content-audit / 2026-09-01_kg-authorized-approval-limits.mjs  **split-vote:** False

**where:** docs/2026-09-01_HANDOFF-APPROVAL-AUTHORITY-AND-RUN-B.md:33-36 ; docs/WHERE-WE-LEFT-OFF.md and docs/RESUME-PROMPT.md carry the same framing

**evidence:**

```
Handoff: '### Change exactly ONE thing before launching / `const PARTS` on line ~70 points at the previous session's scratchpad. **Repoint it at yours.** / Everything else — `GROUP`, the step-id prefix, `PAGES`, the absent `patchPage` — is already correct.'
Measured: diff <(cat run-a) <(cat aal) yields 19 hunks; 13 of them are confined to lines 1-126, and only six lines below 126 changed at all (590, 597, 1346, 1366-1367, 1375, 1528). Everything else in 1,588 lines is verbatim Run A. The four items the handoff enumerates ARE correct — the claim that is false is 'everything else'.
```

**why it matters:** This is the load-bearing false statement: it is what caused this script to be filed as READY. Anyone who trusts it launches ~20 agents, ~2M tokens, against prompts that tell them not to build the page. The handoff is otherwise excellent and is what the next session reads first, so the correction has to land there, not only in the script.

**proposed fix:** Replace that subsection with: '### The script needs a stale-content pass before launching, NOT a one-line change\n\nIt was adapted from Run A by turning the top-of-file knobs. `diff` against `workflows/2026-08-31_kg-workflows-run-a.mjs` shows only 19 hunks, 13 of them above line 126 — so nearly every agent-facing prompt below the constants is still Run A (and in three places still Group 3) text. `ALREADY_BUILT` (:554-584) is the blocker: it omits Workflows and Feature Hierarchies from the built list and tells all six prompt sites that Administration > Company is out of scope and that "The Authorized Approval Limits window ... is NOT a page for you to build." See the audit findings for the full list and the replacement text. `GROUP`, the step-id prefix, `PAGES`/seeds, the header and the absent `patchPage` ARE correct and verified against merge-group.py and assemble-parts.py — do not touch those.'
Standing rule to add to the method notes: 'When adapting a build script, diff it against its parent and read EVERY hunk that did NOT change. An unchanged prompt in a script about a different page is the default failure mode, not the exception.'

> **refuter verdict:** refuted=False conf=high severity=high
> fix: Substantively as proposed, with three amendments:  1. **Drop WHERE-WE-LEFT-OFF.md from the correction targets** — verified it does not contain the claim (no hit for "READY", "one thing", "PARTS", or "approval-limits"; last updated 2026-08-31, before the script). Correct two files, not three.  2. **Correct docs/RESUME-PROMPT.md:19-21 as well, and treat it as the primary target**, not a same-framing echo. It is the paste-ready prompt a fresh session runs verbatim, and it states "**The script … is READY.** Change exactly ONE thing…". Replace those three lines with: "The script is `workflows/2026-
> REPRODUCED. Every measurement in the finding checks out against the real files; only two small scoping details in the write-up need correction, neither of which touches the claim.
> 
> 1) The quoted handoff text exists exactly as cited.
> `grep -n "Change exactly ONE thing\|const PARTS\|Everything else" docs/2026-09-01_HANDOFF-APPROVAL-AUTHORITY-AND-RUN-B.md` returns :33, :35, :36 — verbatim: "### Change exactly ONE thing before launching" / "`const PARTS` on line ~70 points at the previous session's scratchpad. **Repoint it at yours.**" / "Everything else — `GROUP`, the step-id prefix, `PAGES`, the absent `patchPage` — is already correct."
> 
> 2) The diff measurement is right.
> `diff workflows/2026-08-31_kg-workflows-run-a.mjs workflows/2026-09-01_kg-authorized-approval-limits.mjs | grep -cE '^[0-9]+(,[0-9]+)?[acd]'` → **19**. Hunk headers: 2,3c2,6 · 5,9c8,18 · 11,23c20,39 · 25,31c41,44 · 33,52c46,51 · 54,61c53,65 · 63,67c67,68 · 69,88c70,77 · 94,95c83,84 · 98c87 · 112,113c101,102 · 117,124c106,107 · 126c109 — that is exactly **13 hunks at or above line 126** — then 607c590 · 614c597 · 1363c1346 · 1383,1384c1366,1367 · 1392c1375 · 1545c1528. So 1,588 lines, and below line 126 only **six hunks / seven lines** changed. (The finding says "six lines"; it is six hunks covering seven lines — 1366 and 1367 both changed. Cosmetic.)
> 
> 3) The load-bearing consequence — `ALREADY_BUILT` — is confirmed stale, and worse than the finding's one-line summary.
> `sed -n '554,584p'` shows the constant is v

> **refuter verdict:** refuted=False conf=high severity=medium
> fix: Keep the finding, but write the docs to the POST-fix state rather than a pre-launch warning that goes stale on contact.  1. Replace handoff :26-36 with a section that records what was wrong and what was done, e.g.: "## JOB 1 — Approval Authority (Authorized Approval Limits). Script repaired 2026-09-01, then ready. `workflows/2026-09-01_kg-authorized-approval-limits.mjs` — ONE page, ~5 core files, ~11,000 bytes, zero raw `<table>` and zero markdown table rows on either primary. Expect roughly seven fields. It has never produced output. ### It was adapted from Run A by turning the top-of-file kn
> Commands run and what they showed:
> 
> 1. `grep -n "" docs/2026-09-01_HANDOFF-APPROVAL-AUTHORITY-AND-RUN-B.md | sed -n '26,40p'` — confirms the claim at exactly :33-36, verbatim as quoted, and the provenance sentence at :30-31 ("the script was corrected rather than patched afterwards").
> 2. `grep -rn "exactly ONE thing" docs/ workflows/` — TWO hits only: handoff:33 and docs/RESUME-PROMPT.md:20. RESUME-PROMPT.md:19-22 carries the same trap ("it is READY", "GROUP, the step-id prefix, PAGES, the absent patchPage are all already correct"). docs/WHERE-WE-LEFT-OFF.md does NOT carry this framing — the finding's `where` is wrong on that file. WWLO:106-113 instead carries a different stale claim ("No fifth page was built… a scope expansion Luke owns") that pre-dates the 2026-09-01 scope call; that is a separate defect, not this one.
> 3. `diff <(cat run-a) <(cat aal) | grep -E '^[0-9]'` — 19 hunks: 13 at/below line 126 (2,5,11,25,33,54,63,69,94,98,112,117,126) and 6 below (607c590, 614c597, 1363c1346, 1383,1384c1366,1367, 1392c1375, 1545c1528). The finding's "only six lines below 126 changed" undercounts: the list it gives is SEVEN new-file lines (590,597,1346,1366,1367,1375,1528). Minor, in the evidence not the fix.
> 4. `grep -n "ALREADY_BUILT"` + `sed -n '540,600p'` — the block is at :554-584 (as the fix states) and is referenced at :652, :711, :880, :956, :1172, :1440 — six prompt sites. It is inside the UNCHANGED region and its truth flipped: it omits Workflows and Feature Hierarchies fr

---

## [high] `--patch` with a null patchPage silently deletes every non-patch dependency, step, value set, contradiction and range graph-wide — and validate-graph.py exits 0 over the wreckage

**id:** `patch-none-wipes-graph`  **auditor:** toolchain-code-path-audit  **split-vote:** False

**where:** bin/merge-group.py:66 (and the five filters it feeds, :73-77); bin/assemble-parts.py:430

**evidence:**

```
merge-group.py:66 reads `tag = r.get('patchPage', sorted(touched)[0])`. assemble-parts.py:430 ALWAYS writes `'patchPage': patch_page`, so with no `--patch-page` the key EXISTS with value None and `.get`'s default never fires:
  $ python3 -c "print(repr({'patchPage':None}.get('patchPage','FALLBACK')))"  ->  None
Then :73-77 run `s.get('patch') != tag` with tag=None, and every node from every NON-patch merge stores `'patch': None` (merge-group.py:146/158/180/193/204). So the filters keep only patched nodes and drop everything else. Executed against a sandbox copy of the real graph with this run's own assembled result:
  $ BUILD_DATE=2026-09-01 python3 bin/merge-group.py raw-A.json "Approval Authority" --patch
  BEFORE: deps 436, steps 41, valueSets 114, contradictions 60, ranges 17
  AFTER : deps 115, steps 12, valueSets  37, contradictions 24, ranges 10
  $ python3 bin/validate-graph.py  ->  "ERROR: none"   VAL_EXIT=0
Note merge-group.py:66's fallback `sorted(touched)[0]` is the only `[0]` index in the whole toolchain and it is unreachable — the single-page concern in the brief is moot for the wrong reason.
```

**why it matters:** This run's documented invocation has NO --patch, so the happy path is safe. But the flag is one token away, the wipe is silent and irreversible, and both handoffs actively misdirect the very next run into it: docs/WHERE-WE-LEFT-OFF.md:79 and docs/2026-09-01_HANDOFF-APPROVAL-AUTHORITY-AND-RUN-B.md:108 both state "`--patch` strips nothing — verified against `merge-group.py:62-76`", and instruct Run B to "Set `patchPage` in the return". On the assemble-parts path patchPage comes from the `--patch-page` CLI flag, NOT from the workflow's return object — so Run B, following its handoff exactly, merges with patchPage None and destroys 22 pages of work while every gate reports success.

**proposed fix:** Two edits in bin/merge-group.py. (1) Replace line 66 `        tag = r.get('patchPage', sorted(touched)[0])` with `        tag = r.get('patchPage') or group`. (2) Insert a hard guard immediately after line 58 (`    ptag = r.get('patchPage')`):
```
    if patch and not ptag:
        sys.exit('--patch requires patchPage in the result. It comes from assemble-parts.py '
                 '--patch-page, NOT from the workflow return value. Without it every node whose '
                 '"patch" is None -- i.e. every node from every non-patch merge -- is deleted.')
```
Also correct the false claim at docs/WHERE-WE-LEFT-OFF.md:79 and docs/2026-09-01_HANDOFF-APPROVAL-AUTHORITY-AND-RUN-B.md:108.

> **refuter verdict:** refuted=False conf=high severity=high
> fix: As proposed, with two amendments. (1) Keep BOTH edits, and treat the hard guard as the real fix — edit (1) `tag = r.get('patchPage') or group` alone still leaves new nodes tagged `patch: None` with an unsuffixed gtag, so a second `--patch` re-run under the same label would duplicate instead of replace; the guard makes that path unreachable. Verified `sys` is imported (merge-group.py:17) and `patch` is in scope at :58. (2) Drop the two unsupported flourishes from the write-up: `[0]` is NOT the only index in the toolchain (13 hits across bin/*.py), and the wipe is NOT irreversible — output/kg-in
> REPRODUCED END TO END. Every load-bearing claim survives; two decorative sub-claims do not.
> 
> 1. Line numbers are exact.
> `grep -n "patchPage\|sorted(touched)\|patch_page" bin/merge-group.py bin/assemble-parts.py`
>   bin/merge-group.py:58   `    ptag = r.get('patchPage')`
>   bin/merge-group.py:66   `        tag = r.get('patchPage', sorted(touched)[0])`
>   bin/assemble-parts.py:430 `        'patchPage': patch_page,`   (unconditional, inside the `result = {...}` literal)
> `grep -n "'patch'" bin/merge-group.py` -> filters at 73,74,75,76,77 and writers at 146,158,180,193,204, each `'patch': (ptag if patch else None)`. Matches the finding exactly.
> 
> 2. The `.get` default never fires.
> `python3 -c "print(repr({'patchPage':None}.get('patchPage','FALLBACK')))"` -> `None`. Confirmed.
> 
> 3. The real graph is full of patch:None nodes, i.e. the filters' kill list.
> Counting `patch` on /output/kg-invoice-config.json:
>   configDependencies 436 {None:322, 'Audit Rules':57, 'Group 5B':57}
>   configSteps 41 {None:30, ...}; configValueSets 114 {None:77, ...};
>   configContradictions 60 {None:36, ...}; configCompressedRanges 17 {None:7, ...}
> 
> 4. THE WIPE IS REAL — executed twice in a sandbox copy of bin/ + output/ (scratchpad, real graph untouched), with a synthetic assemble-parts-shaped result carrying `patchPage: null`:
>   $ BUILD_DATE=2026-09-01 python3 bin/merge-group.py raw-A.json "Approval Authority" --patch
>   BEFORE: pages 22 fields 607 deps 436 steps 41 vsets 114 contr 60 ranges 17
>   AFTER : pages 23 

> **refuter verdict:** refuted=False conf=high severity=medium
> fix: Ship the guard, NOT the `or group` fallback.  In `bin/merge-group.py`, immediately after line 58 (`    ptag = r.get('patchPage')`): ```     if patch and not ptag:         sys.exit('--patch requires patchPage in the result. It comes from '                  'assemble-parts.py --patch-page, NOT from the workflow return value. Without it '                  'every node whose "patch" is None -- i.e. every node from every non-patch merge -- '                  'is deleted, and validate-graph.py still exits 0.') ``` Then change line 66 to `        tag = ptag` — the guard makes it truthy, so no fallback
> THE DEFECT IS REAL AND REPRODUCES.
> 
> 1. `.get`'s default never fires. A real assembled result carries the key with value None:
>    `python3 -c "...json.load('output/reports/2026-08-31_workflows-run-a-raw-result.json')..."` -> `patchPage key present: True None`.
>    And `bin/assemble-parts.py:430` unconditionally writes `'patchPage': patch_page`, sourced only from `--patch-page` (`bin/assemble-parts.py:497`). Confirmed `patch_page` is never read from the workflow return: `assemble-parts.py` reads only the parts dir + journal (docstring :15-28).
> 
> 2. The graph is primed for the wipe. 322 of 436 `configDependencies` and 30 of 41 `configSteps` carry `patch: None` (Counter over the live graph). Filters at `merge-group.py:73-77` KEEP `x.get('patch') != tag`; with tag=None they keep only the 114 patched nodes.
> 
> 3. Reproduced on a sandbox copy of the real graph (scratchpad/sbx), with Run A's own real assembled result:
>    BEFORE pages 22 | fields 607 | deps 436 | steps 41 | vsets 114 | contradictions 60 | ranges 17
>    `BUILD_DATE=2026-09-01 python3 bin/merge-group.py raw-A.json "Workflows" --patch` -> exit 0
>    AFTER  pages 22 | fields 607 | deps 175 | steps 18 | vsets 71 | contradictions 48 | ranges 15
>    `python3 bin/validate-graph.py` -> "ERROR: none", VAL_EXIT=0. Confirmed silent past the validator.
> 
> 4. The doc misdirection is verifiably wrong. `docs/WHERE-WE-LEFT-OFF.md:78-79` and `docs/2026-09-01_HANDOFF-APPROVAL-AUTHORITY-AND-RUN-B.md:106-107` both say "Set `patchPage` in the retur

---

## [high] apply-corrections.py silently wires this run's value sets to a field on a DIFFERENT page in a DIFFERENT group — proven with the label "Level"

**id:** `wire-by-name-cross-page`  **auditor:** toolchain-code-path-audit  **split-vote:** False

**where:** bin/apply-corrections.py:286-288 (inside wire_by_name, :268-298), called from main at :632

**evidence:**

```
Line 286-288:
```
        same = [f for f in fields if _norm(f['name']) == want and f['pageId'] == pid]
        allm = [f for f in fields if _norm(f['name']) == want]
        pick = same[0] if len(same) == 1 else (allm[0] if len(allm) == 1 else None)
```
The graph-wide fallback ignores the page entirely. Against the live graph, `_norm('Level')` = 'level' matches exactly ONE field name graph-wide:
  $ python3 -c "..."  ->  Level  norm=level  matches=1  [('field.feature-hierarchies.level','Feature Hierarchies')]
End-to-end in the sandbox, with a value set the run plausibly emits ({appliesToPage:'Authorized Approval Limits', appliesToField:'Level'}) whose page has no field literally named 'level':
  assemble-parts  -> PRE-MERGE PROBLEMS: 1  VALUE-SET-WOULD-LAND-UNWIRED (NOT fatal, :479-482)
  merge-group     -> appliesToFieldId = None
  validate-graph  -> ERROR unwired-value-set   VAL_EXIT=1     <- the defect IS visible here
  apply-corrections -> "corrections applied: 1 change(s)"
                       appliesToFieldId = field.feature-hierarchies.level  (page: Feature Hierarchies)
  validate-graph  -> "ERROR: none"  VAL_EXIT=0                <- and here it is gone
```

**why it matters:** "Level" is one of the four labels this run is explicitly built to boundary-test against the Workflows page. apply-corrections.py runs BETWEEN the merge and the validator (docs/RESUME-PROMPT.md:64-66), so it converts the one ERROR that would have caught a mis-owned enumeration into a green build carrying a false claim: the graph would assert that this window's hierarchy-level options belong to Feature Hierarchies. That is the exact 'wrong owner is worse than an honest null' failure the function's own docstring at :273-274 says it exists to avoid, and it is invisible to every downstream check.

**proposed fix:** In bin/apply-corrections.py replace line 288 with:
```
        # A stated page that does NOT carry the field is evidence AGAINST a graph-wide guess.
        pick = same[0] if len(same) == 1 else (allm[0] if (pid is None and len(allm) == 1) else None)
```
and extend the note at :293-294 so a cross-page wire is legible in the graph, e.g. append `' Owner lives on page %s.' % pages_by_id.get(pick['pageId'], '?')`.

> **refuter verdict:** refuted=False conf=high severity=high
> fix: Line 288 of bin/apply-corrections.py: apply as proposed, verified zero-regression against all 13 existing wire-by-name cases —          # A stated page that does NOT carry the field is evidence AGAINST a graph-wide guess.         pick = same[0] if len(same) == 1 else (allm[0] if (pid is None and len(allm) == 1) else None)  The note extension as proposed is WRONG and must be corrected: `pages_by_id` is undefined in wire_by_name (line 277 binds `pages` as name->id; grep finds no `pages_by_id` anywhere in the file), so it raises NameError. Add a local id->name map immediately after line 277:     
> REPRODUCED END TO END. Every load-bearing claim checks out against the real files.
> 
> 1. CODE EXISTS AT THE STATED LINES (exact, verified by grep -n):
>    bin/apply-corrections.py:286 `same = [f for f in fields if _norm(f['name']) == want and f['pageId'] == pid]`
>    :287 `allm = [f for f in fields if _norm(f['name']) == want]`
>    :288 `pick = same[0] if len(same) == 1 else (allm[0] if len(allm) == 1 else None)`
>    Docstring :273-274 verbatim: "matches are left unwired on purpose: a wrong owner is worse than an honest null."
>    Note built at :293-294. `wire_by_name` defined :268, called unconditionally from main at :632. All as cited.
> 
> 2. THE GRAPH-WIDE MATCH IS UNIQUE AND CROSS-PAGE. Against the live output/kg-invoice-config.json, `_norm('Level')` = 'level' matches exactly ONE field name graph-wide: field.feature-hierarchies.level (page: Feature Hierarchies), count=1. Confirmed the four Workflows collision fields do NOT compete, because matching is on `name` not `label` — field.workflows.authorized-approver-level has name 'authorized_approver_level' (norm 'authorizedapproverlevel'), label 'Level'. So the fallback has a clean, wrong, unique target.
> 
> 3. FULL PIPELINE REPRO in a sandbox copy of bin/ + output/ (ROOT derives from __file__, so a copy runs standalone; corpus read-only). Baseline sandbox: VAL_EXIT=0. Injected page 'Authorized Approval Limits' + field name='authorization_level' label='Level' + an unwired value set {appliesToRef:{page:'Authorized Approval Limits', field:'

> **refuter verdict:** refuted=False conf=high severity=high
> fix: Take the logic patch as proposed (verified inert on the existing graph), but fix the note half, which would NameError as written.  bin/apply-corrections.py, replace line 288:          # A stated page that does NOT carry the field is evidence AGAINST a graph-wide guess.         pick = same[0] if len(same) == 1 else (allm[0] if (pid is None and len(allm) == 1) else None)  For the note at :293-294, `pages_by_id` does not exist — build it inside wire_by_name (next to the existing `pages` dict at :277) and use it:      page_names = {p['id']: p['name'] for p in kg['nodes']['configPages']}     ...   
> CONFIRMED independently, end to end.
> 
> 1. Line citations all check out. `sed -n '268p;273,274p;286,288p;293,294p' bin/apply-corrections.py` prints exactly the quoted code, `sed -n 632p` prints `changed += wire_by_name(kg)`, and assemble-parts.py:479-482 is the FATAL tuple that does NOT contain VALUE-SET-WOULD-LAND-UNWIRED (so that pre-merge problem is advisory only, exit 0).
> 
> 2. The "Level" collision is real in the live graph. `_norm('Level')`='level' matches exactly ONE field name graph-wide: field.feature-hierarchies.level (name='level', label='Level', page 'Feature Hierarchies'). The Workflows twin is name='authorized_approver_level' → norm 'authorizedapproverlevel', so it does NOT compete; the graph-wide fallback is therefore unique and fires. ('approvallimit', 'approver', 'canapproveexception' match 0 fields, so those three labels land unwired honestly — only 'Level' is armed.)
> 
> 3. Reproduced the harm in a sandbox copy (bin/ + output/ copied, corpus untouched, no write to concur-corpus or the real graph): seeded page 'Authorized Approval Limits' plus an unwired set {appliesToRef:{page:'Authorized Approval Limits', field:'Level'}}. Unpatched `python3 bin/apply-corrections.py` → "corrections applied: 1 change(s)", appliesToFieldId = field.feature-hierarchies.level, and it stamps a note asserting a label→name drift that never happened.
> 
> 4. No downstream guard. validate-graph.py:101-113 only checks appliesToFieldId is truthy and exists in field_ids; there is NO check that the

---

## [high] A dependency endpoint into an ALREADY-BUILT page is never checked against the live graph; a label-vs-name miss lands as a permanent dangling edge indistinguishable from a legitimate forward reference

**id:** `cross-page-dep-endpoint-unchecked`  **auditor:** toolchain-code-path-audit  **split-vote:** False

**where:** bin/assemble-parts.py:402-407 (check scoped to this run's rosters) vs :212-219 (live-graph known_refs, built but unused here); bin/validate-graph.py:181-190

**evidence:**

```
Line 402-406: `page_names = {p['name'].strip().lower() for p in pages}` — THIS RUN's rosters only — then `if pg in page_names and (pg, fl) not in by_page_field`. An endpoint naming 'Workflows' fails `pg in page_names`, so it is never validated at all. assemble-parts already loads every live page/field pair into `known_refs` at :212-219 and uses it for contradictions (:382) and ranges (:399) — dependencies alone are skipped. Sandbox run with the boundary edge this run must emit, written with the sibling's LABEL rather than its name (targetPage 'Workflows', targetField 'Approval Limit'):
  $ python3 bin/assemble-parts.py partsE raw-E.json --journal journal.jsonl --group "Approval Authority"
    PRE-MERGE PROBLEMS: none            ASM_EXIT=0
  $ merge-group -> "unresolved endpoints in this group: 1"
    dep.gapproval-authority.001 targetId=None targetRef={'page':'Workflows','field':'Approval Limit','resolved':False}
  $ validate-graph -> "dependency endpoints awaiting an unbuilt page: 244"  ERROR: none  VAL_EXIT=0
The real field name is `authorized_approver_approval_limit` (label 'Approval Limit'); the correct pair IS in known_refs:
  ('workflows','authorized_approver_approval_limit') -> True     ('workflows','approval limit') -> False
```

**why it matters:** The central deliverable of this run is cross-page edges from the new page to the four colliding Workflows controls whose LABELS ('Approval Limit', 'Level', 'Can approve exception', 'Approver') differ from their NAMES ('authorized_approver_*'). Every such edge written with the label dangles forever, and validate-graph.py buries it in the 243 legitimate forward references to unbuilt Groups 6 and 7 — so it reads as 'awaiting a build' rather than 'points at nothing'. This is precisely the defect apply-corrections.py:420-427 was hand-written to repair after Run A (dep.gworkflows.050, targetField 'PR hierarchy selection'). Left unfixed it recurs on the run most likely to trigger it.

**proposed fix:** In bin/assemble-parts.py replace lines 402-407 with:
```
    page_names = {p['name'].strip().lower() for p in pages}
    live_pages = {p for p, _ in known_refs}
    for d in deps:
        for side in ('source', 'target'):
            pg, fl = str(d[side + 'Page']).strip().lower(), str(d[side + 'Field']).strip().lower()
            if not fl:
                continue  # a deliberate page-level forward reference
            if pg in page_names and (pg, fl) not in by_page_field:
                problems.append(('DEP-ENDPOINT-NOT-IN-ROSTER', d['type'], '%s / %s' % (d[side + 'Page'], d[side + 'Field'])))
            elif pg in live_pages and (pg, fl) not in known_refs:
                problems.append(('DEP-ENDPOINT-NOT-ON-BUILT-PAGE', d['type'], '%s / %s' % (d[side + 'Page'], d[side + 'Field'])))
```
and add `'DEP-ENDPOINT-NOT-ON-BUILT-PAGE'` to the FATAL tuple at :479-482.

> **refuter verdict:** refuted=False conf=high severity=high
> fix: Adopt the proposed code block at bin/assemble-parts.py:402-407 as written — it is correct and verified to fire on exactly the target case — with two corrections:  1. DO NOT add 'DEP-ENDPOINT-NOT-ON-BUILT-PAGE' to the FATAL tuple at :479-482. Its sibling DEP-ENDPOINT-NOT-IN-ROSTER is deliberately non-fatal, and 127 of the 130 pre-existing built-page endpoints are conceptual prose references the builds write on purpose; making this fatal would hard-block the run for style. Leave it as a printed pre-merge problem, which is enough — assemble-parts output is read before merge.  2. Make the message 
> OBSERVATION: fully reproduced, byte-for-byte, at the cited lines.
> 
> Line numbers verified (`grep -n bin/assemble-parts.py`):
>   212 `known_refs = set(by_page_field)` / 213 `kg_path = ...` / 219 `known_refs.add((pn[...], f['name']...))`  — live graph loaded
>   402 `page_names = {p['name'].strip().lower() for p in pages}` / 407 `problems.append(('DEP-ENDPOINT-NOT-IN-ROSTER', ...))`
>   known_refs is consumed at 382 (CONTRADICTION-REF-UNKNOWN) and 399 (RANGE-REF-UNKNOWN) but NOT in the 402-407 dep loop. Confirmed by `sed -n '370,420p'`. The guard is `if pg in page_names` — this run's rosters only — so an endpoint naming a live-but-not-in-this-run page is never evaluated on either branch.
>   validate-graph.py: the block is 179-190 (finding said 181-190; the substantive lines 185-190 are inside). `if not fid: fwd += 1` with an error ONLY when `ref.get('page')` is missing — a named page with a bogus field is silently counted as a forward ref.
>   merge-group.py:88-89,141-142: `index` is keyed on field NAME only, no label fallback, so a label-written endpoint cannot resolve.
> 
> Live-graph pair check confirms the premise:
>   ('workflows','authorized_approver_approval_limit') -> True
>   ('workflows','approval limit') -> False
>   and the four colliding controls exist with name!=label (authorized_approver_approval_limit|"Approval Limit", authorized_approver_level|"Level", authorized_approver_can_approve_exception|"Can approve exception", authorized_approver_list_approver|"Approver").
> 
> SANDBOX RUN (c

> **refuter verdict:** refuted=False conf=high severity=high
> fix: Take the detection, drop the escalation, and add the cheap in-script prevention.  1. bin/assemble-parts.py — replace lines 402-407 with the proposed block EXACTLY as written (including the `if not fl: continue` guard and the `live_pages = {p for p, _ in known_refs}` derivation). This is correct and adds the missing signal.  2. DO NOT add 'DEP-ENDPOINT-NOT-ON-BUILT-PAGE' to the FATAL tuple at :479-482. 131 of the graph's 243 unresolved endpoints already have this shape and only 3 are genuine label misses; the rest are the graph's accepted concept-level forward-reference convention. The pre-exis
> DETECTION GAP CONFIRMED. `sed -n '402,407p' bin/assemble-parts.py` shows `page_names = {p['name'].strip().lower() for p in pages}` (this run's rosters only) and the guard `if pg in page_names and (pg, fl) not in by_page_field`. An endpoint naming "Workflows" is not in this run's roster, so the body never executes — the endpoint is never validated. `grep -n known_refs` shows it is populated from the live graph at :212-219 and consulted at :382 (contradictions) and :399 (ranges) but never for deps. `sed -n '181,190p' bin/validate-graph.py` confirms the only dependency-endpoint error is `dependency-unlabelled-endpoint`, raised solely when `not ref.get('page')`; a populated page with a bogus field increments `fwd` and is reported at :218 as "dependency endpoints awaiting an unbuilt page", indistinguishable from a legitimate forward ref. Corroborating asymmetry: validate-graph.py:204-207 DOES split the two cases for ConfigSteps (`step-references-unknown-field` vs `step-references-unbuilt-page`); dependencies get no equivalent. This is a gap, not a decision.
> 
> CONSEQUENCE IS PROVEN, NOT SPECULATIVE. python3 over output/kg-invoice-config.json: the four colliding Workflows controls have name != label exactly as claimed (`authorized_approver_approval_limit`/"Approval Limit", `authorized_approver_level`/"Level", `authorized_approver_can_approve_exception`/"Can approve exception", `authorized_approver_list_approver`/"Approver"). Scanning all 436 deps for unresolved endpoints whose {page,

---

## [high] navPathEvidence recovery is keyed on the map agent's page id; a one-word drift silently discards navPath, roleGates, aliases, documentedBasis and identityNotes and every stage still exits 0

**id:** `nav-recovery-keyed-on-agent-page-id`  **auditor:** toolchain-code-path-audit  **split-vote:** False

**where:** bin/assemble-parts.py:80-106 (nav_from_journal), :170 (`n = nav.get(pid, {})`), :179-204; bin/merge-group.py:95-105; bin/validate-graph.py (no ConfigPage invariant exists at all)

**evidence:**

```
Line 170 is a plain dict lookup with a silent `{}` default: `n = nav.get(pid, {})`, where pid comes from the ROSTER (`r.get('pageId')`, :169) and the keys come from the JOURNAL (`best[p['id']] = p`, :104-105). Sandbox run with the journal's page id drifted from 'authorized-approval-limits' to 'authorized-approval-limits-window':
  $ python3 bin/assemble-parts.py parts raw-D.json --journal journal-drift.jsonl --group "Approval Authority"
    page Authorized Approval Limits   7 fields | coverage good | basis ?  | dropped 0
    PRE-MERGE PROBLEMS: none                       ASM_EXIT=0
  navPathEvidence recovered: 0 | roleGates: 0 | identityNotes: ''
  $ merge-group -> MERGED PAGE navPath = []  quote = ''  alternates = []
  $ apply-corrections; python3 bin/validate-graph.py  ->  VAL_EXIT=0
The ONLY tell in the entire pipeline is the single character `?` in the `basis` column printed at :465-466. Recovery itself is sound for this script: NAV_SCHEMA is byte-identical to Run A's (2208 chars, verified by extracting both blocks), and nav_from_journal run against Run A's real 40-line journal recovered both pages with 32 and 7 navPathEvidence entries — so the mechanism works; only the key-agreement is unguarded.
```

**why it matters:** This page's whole reason for being a separate group is its unusual click path — it is the first page in the graph not reached under Administration > Invoice, and the build brief calls that navigational fact 'load-bearing for a driver'. It is also a ONE-page run, so the lone `basis ?` on a single stdout line has no siblings to contrast against and is trivially missed. Losing it produces a ConfigPage with an empty navPath, no role gates (the two-rights gate the brief calls out), and no identityNotes — a page a driver cannot navigate to — while assemble-parts, merge-group, apply-corrections and validate-graph all report success.

**proposed fix:** In bin/assemble-parts.py, immediately after `nav = nav_from_journal(journal)` at line 161, insert:
```
    if journal and not nav:
        problems_boot = 'journal %r yielded no page carrying navPathEvidence' % journal
        sys.exit('NAV-NOT-RECOVERED: ' + problems_boot)
```
and inside the roster loop, after line 170 (`n = nav.get(pid, {})`), insert:
```
        if journal and not n:
            problems.append(('NAV-NOT-RECOVERED', pid, 'journal has ids %s' % sorted(nav)))
```
Then add `'NAV-NOT-RECOVERED'` to the FATAL tuple at :479-482.

> **refuter verdict:** refuted=False conf=high severity=high
> fix: As proposed for bin/assemble-parts.py — verified by execution, correct and backward-compatible — PLUS one addition, and one optional simplification.  1. As proposed, executed and confirmed:    - after :161 `nav = nav_from_journal(journal)`:        if journal and not nav:            problems_boot = 'journal %r yielded no page carrying navPathEvidence' % journal            sys.exit('NAV-NOT-RECOVERED: ' + problems_boot)    - after :170 `n = nav.get(pid, {})` (8-space indent, `problems` is in scope from :166):            if journal and not n:                problems.append(('NAV-NOT-RECOVERED', p
> CONFIRMED end to end. Every cited line number is exact and the sandbox behaviour reproduced identically.
> 
> CODE CITATIONS VERIFIED (grep -n / sed -n on bin/assemble-parts.py):
> - :80 `def nav_from_journal`, :105 `best[p['id']] = p`, :106 `return best` — journal supplies the keys. ✓
> - :169 `pid = r.get('pageId') or ...` — ROSTER supplies the lookup key. ✓
> - :170 `n = nav.get(pid, {})` — plain dict lookup, silent `{}` default, no guard. ✓
> - :185 navPathEvidence, :196 documentedBasis, :197 roleGates, :198 aliases, :199 identityNotes all read `n.get(...) or <empty>`. ✓
> - :465-466 the `basis %-8s` print with `p['documentedBasis'] or '?'` — the sole tell. ✓
> - :479-482 FATAL tuple, no NAV entry. ✓
> - bin/merge-group.py:95-105 builds the ConfigPage from navPathEvidence; :116-119 copies documentedBasis/roleGates/aliases/identityNotes only `if p.get(key)`. ✓
> - bin/validate-graph.py: `grep -c navPath` returns **0**. There is no ConfigPage invariant at all — pages are only indexed at :57 for step/field cross-refs. ✓
> 
> SANDBOX REPRODUCTION (scratchpad copy of bin/ + output/; real graph md5 5938ea407b3640b2084e210541d88d44 identical before and after, corpus untouched):
> Same 1-field roster (pageId `authorized-approval-limits`, real verbatim quote from authorized-approver-list-a9522ec8.md), two journals differing ONLY in the map page id.
>   drifted id 'authorized-approval-limits-window':
>     assemble-parts -> "page Authorized Approval Limits 1 fields | coverage good | basis ?  | dropped 0" / "PRE

> **refuter verdict:** refuted=False conf=high severity=high
> fix: Keep the second hunk and the FATAL entry; DROP the first hunk; add the missing-journal case.  In bin/assemble-parts.py, inside the roster loop, immediately after line 170 (`n = nav.get(pid, {})`):          if not n:             problems.append(('NAV-NOT-RECOVERED', pid,                              'journal %r carries ids %s' % (journal, sorted(nav))))  Note `if not n:` rather than `if journal and not n:` — with no journal at all, nav is {} and every page reports, which is what the handoffs (HANDOFF-KG-BUILD-v2.md:142, RESUME-PROMPT.md:55-57) already demand in prose. If a no-journal invocation
> SURVIVES. I reproduced the mechanism independently and then attacked the consequence from three angles; two of the three attacks failed and the third made the finding STRONGER, not weaker.
> 
> 1) MECHANISM CONFIRMED (my own run, not the auditor's numbers). Line-verified: assemble-parts.py:161 `nav = nav_from_journal(journal)`; :169 `pid = r.get('pageId') or <filename>` (roster side); :170 `n = nav.get(pid, {})` — plain dict lookup, silent `{}` default; keys come from the journal at :104-105 `best[p['id']] = p`. Ran both journals through the real toolchain:
>   $ python3 bin/assemble-parts.py sim/parts mine/ok.json --journal sim/journal.jsonl --group "Approval Authority"
>       page Authorized Approval Limits 7 fields | coverage good | basis moderate | dropped 0 ; PRE-MERGE PROBLEMS: none ; exit 0
>   $ same, --journal sim/journal-drift.jsonl (id 'authorized-approval-limits-window')
>       page Authorized Approval Limits 7 fields | coverage good | basis ?        | dropped 0 ; PRE-MERGE PROBLEMS: none ; exit 0
>   Payload diff on the two result JSONs: ok -> nav 1, roleGates 1, basis 'moderate', identityNotes 61 chars; drift -> nav 0, roleGates 0, basis '', identityNotes 0. Total silent loss, exit 0.
>   Downstream guards: merge-group.py:95-105 takes `best = () if not counts`, writing navPath [] / quote '' / alternates []; its stdout (prints at :248-261) never mentions navPath. `grep -n "navPath\|ConfigPage\|roleGates\|identityNotes" bin/validate-graph.py` returns NOTHING — there is no Confi

---

## [high] The NBSP hazard instruction is unrunnable as written: grep here is ugrep 7.8.4, where -P '\xc2\xa0' silently returns 0 even under LC_ALL=C

**id:** `nbsp-instruction-unrunnable-ugrep`  **auditor:** Independent corpus recon — Authorized Approval Limits / group "Approval Authority"  **split-vote:** False

**where:** script:640-641 (NBSP HAZARD paragraph)

**evidence:**

```
Script text: "NBSP HAZARD: ~40% of nav sentences in this corpus have NO \">\" glyph at all - the separators are U+00A0 U+00A0. Never grep -F across a menu arrow; run BOTH separator forms or declare the census incomplete."

Measured on admin-guides/access-email-reminders-96f3ca18.md (python says 2 NBSPs):
  grep -cP '\xc2\xa0'            -> 0
  LC_ALL=C grep -cP '\xc2\xa0'   -> 0
  LC_ALL=C grep -caP '\xc2\xa0'  -> 0
  grep -cP '\x{00a0}'            -> 1   <-- WORKS
  grep -c $' '              -> 1   <-- WORKS
  grep --version -> ugrep 7.8.4 aarch64-unknown-linux-gnu +neon/AArch64; -P:pcre2jit

Directory-level proof of the silent failure:
  grep -rlP '\xc2\xa0' <admin-guides>/ | wc -l  -> 0
  python3 byte count over the same dir        -> 117 files, 1,519 occurrences
cmd: python3 loop counting b'\xc2\xa0' per file across all four corpus dirs

The ~40% claim itself is TRUE: after 'Administration', ASCII '>' = 96 vs NBSP-only = 65 (40.4%).
```

**why it matters:** This is a silent-zero failure, the worst kind. An agent told to "run BOTH separator forms" will reach for the natural \xc2\xa0 form, get 0 hits, and conclude the corpus has no NBSP navigation — the exact opposite of the truth, and precisely the outcome the instruction exists to prevent. It then declares the census complete when it is not. A concrete miss caused by this is documented in finding nav-path-short-form-corroborated.

**proposed fix:** Replace script:640-641 with: 'NBSP HAZARD: ~40% of nav sentences carry NO ">" glyph - the separators are U+00A0 (measured: after "Administration", 96 ASCII ">" vs 65 NBSP-only). TOOLING TRAP: grep on this machine is ugrep 7.8.4, NOT GNU grep. `grep -P "\xc2\xa0"` SILENTLY RETURNS 0 even under LC_ALL=C. The forms that actually work are `grep -P "\x{00a0}"` or the bash literal `grep $\'\\u00a0\'`; for a definitive count use python3 counting b"\xc2\xa0". Never conclude "no NBSP" from a \xc2\xa0 grep. Verified: all 8 core files for THIS page contain ZERO NBSP, so quotes from them are safe - but the nav census across the wider corpus is not.'

> **refuter verdict:** refuted=False conf=high severity=high
> fix: Substantively as proposed, with three corrections:  1. Cite the range as script:640-642 (three lines, not two) — the replacement must also consume `'incomplete.',` on 642. Apply the same fix to the Run A parent at 2026-08-31_kg-workflows-run-a.mjs:657-659 if that script is ever re-run.  2. Drop the unreproducible "96 vs 65" counts. My measurement across all four corpus dirs is ~45% NBSP-only (115-117 ASCII '>' vs 96-99 NBSP-only after "Administration", stable across 20-60 char windows). Say "~45%" or state the method.  3. State the MECHANISM so the rule generalizes, and add the two working for
> Reproduced every claim with commands.
> 
> LOCATION: `grep -n "NBSP HAZARD" -A3 /mnt/c/Users/manci/PROJECTS/concur-config-diver-support/workflows/2026-09-01_kg-authorized-approval-limits.mjs` -> the paragraph is at lines 640-642 (finding says 640-641; it is three lines, ending `'incomplete.',` at 642 — minor, cite 640-642). Text matches the finding verbatim, including the odd `'U+00A0 U+00A0.'` (hexdump of line 641 confirms it is the ASCII string "U+00A0 U+00A0", no literal NBSP). Same block inherited verbatim from the Run A parent at 2026-08-31_kg-workflows-run-a.mjs:657-659.
> 
> TOOLING: `grep --version` -> `ugrep 7.8.4 aarch64-unknown-linux-gnu +neon/AArch64; -P:pcre2jit`. /usr/bin/grep, 198872 bytes, Apr 8 2024. Confirmed not GNU grep.
> 
> SILENT ZERO, on concur-invoice-professional-edition-admin-guides/access-email-reminders-96f3ca18.md (python byte count: 2 NBSP):
>   grep -cP '\xc2\xa0'           -> 0
>   LC_ALL=C grep -cP '\xc2\xa0'  -> 0
>   LC_ALL=C grep -caP '\xc2\xa0' -> 0
>   grep -cP '\x{00a0}'           -> 1
>   grep -c $' '             -> 1
> All four claimed results reproduce exactly. Two forms the auditor did NOT test also work: `grep -cP '\xa0'` -> 1, and `grep -U -cP '\xc2\xa0'` -> 1 (ugrep byte/binary mode).
> 
> DIRECTORY PROOF: `grep -rlP '\xc2\xa0' <admin-guides>/ | wc -l` -> 0. `grep -rlP '\x{00a0}' ... | wc -l` -> 117. python3 byte count over same dir -> 117 files, 1519 occurrences. Matches the finding to the number.
> 
> MECHANISM (hypothesis promoted to fact by positive control

> **refuter verdict:** refuted=False conf=high severity=medium
> fix: Replace script:640-641 with text that keeps the existing method and adds the tooling truth plus the page-specific naming Run A had and this script dropped. Suggested (fix the three inaccuracies in the proposed version):  'NBSP HAZARD: ~40% of nav sentences in this corpus carry NO ">" glyph at all - the separators are' 'U+00A0. (Measured over both guide dirs, 45-char window after each "Administration": 114 sentences' 'use ASCII ">" and 74 are NBSP-only.) Never grep -F across a menu arrow.' 'TOOLING TRAP, AND IT FAILS SILENTLY: bare `grep` in this shell is NOT GNU grep - it is routed to' 'ugrep 
> Every measured claim in the finding reproduced exactly, and the consequence path is concrete rather than speculative.
> 
> TOOLING CLAIM — REPRODUCED EXACTLY.
> `type grep` shows grep is not a binary at all here: it is a bash function injected by Claude Code that does `exec -a ugrep "$CLAUDE_CODE_EXECPATH" -G ... "$@"`. `/usr/bin/grep --version` is GNU grep 3.11, but bare `grep --version` is `ugrep 7.8.4 aarch64-unknown-linux-gnu`. This routing is environment-level, so any Bash call an agent makes in this pipeline hits ugrep.
> 
> On /mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE/concur-invoice-professional-edition-admin-guides/access-email-reminders-96f3ca18.md (python: 2 NBSP bytes):
>   grep -cP '\xc2\xa0'            -> 0  (exit 1)
>   LC_ALL=C grep -cP '\xc2\xa0'   -> 0  (exit 1)
>   LC_ALL=C grep -caP '\xc2\xa0'  -> 0  (exit 1)
>   grep -cP '\x{00a0}'            -> 1  WORKS
>   grep -c $' '              -> 1  WORKS
>   /bin/grep -cP '\xc2\xa0'       -> 0   (GNU also fails in UTF-8 locale)
>   LC_ALL=C /bin/grep -cP '\xc2\xa0' -> 1 (GNU's LC_ALL=C escape hatch WORKS; ugrep's does not)
> Directory level:
>   grep -rlP '\xc2\xa0'  admin-guides -> 0
>   grep -rlP '\x{00a0}'  admin-guides -> 117
>   python3 b'\xc2\xa0' count          -> 117 files, 1519 occurrences (corpus-wide 204 files / 1983)
> Silent zero confirmed, including under LC_ALL=C. One nuance the finding gets slightly wrong: plain GNU grep in this UTF-8 locale ALSO returns 0; the ugrep-specific part is that LC_ALL=C, the standard fix, d

---

## [high] "Approval Limit" is ONE field on Workflows but TWO controls here, and a third differently-named pair in branch A — the brief never states this, inviting a duplicate fifth "Approval Limit"

**id:** `approval-limit-shape-differs-by-surface`  **auditor:** Independent corpus recon — Authorized Approval Limits / group "Approval Authority"  **split-vote:** True

**where:** script:109 (seeds prose: "a currency + Amount pair" listed without the surface comparison)

**evidence:**

```
Workflows surface — authorized-approver-list-a9522ec8.md:83,87,91: field named "Approval Limit", "If you want this authorized approver to have limit approval, select the currency and the amount." and "You can enter 0 in the Approval Limit field."

This window — user-administrator-fcfd570c.md:69: "For limit approvers, the administrator selects the desired currency and enters the amount." and :75 "You can enter 0 in the Amount field." (names an Amount field, never an "Approval Limit" field)
user-administration-8b167b96.md:43: "For limit-based cost object approval, select a currency and enter an amount." and :54 calls the region "the Approval Limit area" — an AREA, not a field.

Branch A — user-administrator-fcfd570c.md:43: "When the administrator selects the check box, the Manager Approval Limit field and the Approval Limit Currency list appear."
cmd: all four grep -F -c -> 1 each
```

**why it matters:** One underlying value has THREE documented UI shapes across two surfaces and two branches. The brief warns "DO NOT silently create a fifth Approval Limit" but gives the agent no basis to distinguish the shapes — so the safest-looking move (emit one field labelled "Approval Limit") is exactly the wrong one, because on this window no control carries that name. Getting this right is the difference between a driver that fills two widgets and one that hunts for a field that does not exist.

**proposed fix:** Add to script:109: 'THE APPROVAL LIMIT SHAPE DIFFERS BY SURFACE - THIS IS THE FINDING, NOT A NUANCE. Workflows/a9522ec8 = ONE field literally named "Approval Limit" ("You can enter 0 in the Approval Limit field"). THIS WINDOW = an unnamed "Approval Limit area" (8b167b96) holding TWO controls: a currency selector and an "Amount" field (fcfd570c names only "the Amount field"). BRANCH A = two further, differently-named controls: "Manager Approval Limit field" + "Approval Limit Currency list". Emit TWO controls for the window and TWO for branch A. NEVER emit a field labelled "Approval Limit" on this page - no such control is documented here, and that label is the duplicate the run must avoid.'

> **refuter verdict:** refuted=False conf=high severity=medium
> fix: Append the proposed text to script:109, with two corrections. (1) Fix the source line numbers before they get quoted into notes: the Workflows-surface evidence is authorized-approver-list-a9522ec8.md lines **98 / 102 / 106**, NOT 83/87/91. (2) State the branch split, which is the part the roster actually loses, not just the label difference. Suggested wording:  'THE APPROVAL LIMIT SHAPE DIFFERS BY SURFACE AND BY BRANCH - THIS IS THE FINDING, NOT A NUANCE. The seven controls above are NOT seven controls on one window; fcfd570c describes TWO MUTUALLY EXCLUSIVE branches. BRANCH A, Global group on
> REPRODUCTION — every quoted string exists, verbatim, and the four claimed `grep -F -c` counts all return 1.
> 
> `grep -n "seeds:"` and `grep -n "currency + Amount pair"` on 2026-09-01_kg-authorized-approval-limits.mjs both return **109**. The `where` anchor is exact. Line 109 contains the flat roster: "the Authorized Approver check box, Manager Approval Limit, Approval Limit Currency, a hierarchy Level field, a Can approve exception check box, a currency + Amount pair, and a stated PRECEDENCE RULE between the Approval Limit area and the Level field."
> 
> Corpus, all `grep -n -F` / `grep -F -c` verified (counts = 1 each):
> - user-administrator-fcfd570c.md:43 "When the administrator selects the check box, the Manager Approval Limit field and the Approval Limit Currency list appear." — EXACT, line matches.
> - fcfd570c:69 "For limit approvers, the administrator selects the desired currency and enters the amount." — EXACT.
> - fcfd570c:75 "You can enter 0 in the Amount field." — EXACT.
> - user-administration-8b167b96.md:43 "For limit-based cost object approval, select a currency and enter an amount." — EXACT.
> - 8b167b96:54 "...the Approval Limit area and the Level field..." — EXACT; it is indeed called an *area*, not a field.
> 
> ONE CITATION ERROR, non-substantive: the finding cites authorized-approver-list-a9522ec8.md:**83,87,91**. `sed -n '80,95p'` there returns "Approver" / "Can approve exception" rows. The real lines are **98** ("Approval Limit" as a table field name), **102** ("If you wan

> **refuter verdict:** refuted=True conf=high severity=low
> fix: Do NOT apply the proposed fix — its "TWO for branch A" contradicts fcfd570c:32 and the brief's own seven-field budget, and its count dictation bypasses the per-field boundary judgement the run exists to perform.  If anything is added at all, make it a naming note only, no counts and no blanket prohibition. Append to script:109 after "a currency + Amount pair": "(NOTE THE NAMING, and take labels from the file, never from the sibling page: on THIS window the corpus names only 'the Amount field' (fcfd570c:75) and 'select a currency ... enter an amount' (8b167b96:43), and calls the region 'the App
> OBSERVATION GRANTED — all four corpus quotes verified verbatim.
> 
> `grep -n -i "approval limit|the amount|currency|amount field"` over the three admin-guides files:
> - user-administrator-fcfd570c.md:43 "the Manager Approval Limit field and the Approval Limit Currency list appear" (branch A); :69 "For limit approvers, the administrator selects the desired currency and enters the amount"; :75 "You can enter 0 in the Amount field" (branch B / this window).
> - user-administration-8b167b96.md:43 "select a currency and enter an amount"; :54 "the Approval Limit area and the Level field".
> - authorized-approver-list-a9522ec8.md — the "Approval Limit" field, "select the currency and the amount", "0 in the Approval Limit field" are at lines 98/102/106, NOT 83/87/91 as the finding cites (`sed -n '80,110p'`). Content correct, line cites off by 15.
> 
> Also confirmed by `grep`/`sed` on the other three seeds (definition-of-amount-06806875, configuration-8b3be88b, setting-an-unlimited-9d98b489): none names an "Approval Limit" field. And `grep -rl "Authorized Approval Limits"` over both guide dirs returns only 2 files. So the finding's factual core is sound.
> 
> CONSEQUENCE — WHY IT DOES NOT SURVIVE.
> 
> 1. The finding's load-bearing claim is "the brief never states this / gives the agent no basis to distinguish the shapes." That is refuted by the very line it cites. script:109 roster reads verbatim: "the Authorized Approver check box, Manager Approval Limit, Approval Limit Currency, a hierarchy Level fie

---

## [high] Branch A (Global-group-only) has no Authorized Approval Limits window at all; the brief lists its three controls as page fields without resolving the identity question

**id:** `page-identity-branch-a`  **auditor:** Independent corpus recon — Authorized Approval Limits / group "Approval Authority"  **split-vote:** False

**where:** script:109 (seeds prose lists "the Authorized Approver check box, Manager Approval Limit, Approval Limit Currency" alongside branch-B controls)

**evidence:**

```
user-administrator-fcfd570c.md:23 — "The settings that appear in User Administration (Administration > User Administration) differ depending on whether the configuration includes:" then :25 "The Global group only" / :27 "At least one level in the Authorized Approver Hierarchy".
Branch A (:32): "...the Authorized Approver check box appears in the Expense and Invoices Setting section..." — a check box INLINE. No link. No window. The string "Authorized Approval Limits" never appears in the branch-A passage.
Branch A is also limit-only (:40): "This method is used only for limit-based authorized approvers. It cannot be used for exception-based authorized approvers."
DECIDER — global-group-vs-authorized-approver-hierarchy-8a960238.md step-4 row: "Assign the proper rights to users using one or more of these: Authorized Approver List / Employee import / User Administration" is marked X in BOTH the "Global group only" and "Authorized Approver hierarchy" columns.
cmd: grep -F -c on each fcfd570c quote -> 1; awk 'NR>=90' 8a960238 | tail -40
```

**why it matters:** Three of the roughly seven expected fields hang on this call. If branch A is emitted as ordinary fields of a page named "Authorized Approval Limits", the graph asserts that three controls live on a window that, in their configuration, does not exist — a driver following it will look for a link that never renders. If branch A is dropped, the page loses three documented controls and the Global-group configuration is unrepresented.

**proposed fix:** Add to script:109: 'PAGE IDENTITY - BRANCH A vs BRANCH B. fcfd570c documents TWO MUTUALLY EXCLUSIVE RENDERINGS of one section. (A) Global group only: an "Authorized Approver" CHECK BOX appears inline, revealing "Manager Approval Limit" + "Approval Limit Currency" - there is NO Authorized Approval Limits window in this configuration, and it is limit-only. (B) hierarchy has >=1 non-Global level: an "Authorized Approval Limits" LINK opens the window. VERDICT TO ADOPT (confidence ~75%): ONE page, because 8a960238 puts User Administration in a SINGLE step-4 row marked X under BOTH branch columns, and because one topic covers both under one lead sentence. Emit branch A s three controls on this page WITH explicit conditional visibility ("Global group only; in this configuration the Authorized Approval Limits window does not exist") and a mutual-exclusion dependency against the branch-B controls. Do NOT create a second page - no corpus topic names one. Record the tension in identityNotes.'

> **refuter verdict:** refuted=False conf=high severity=high
> fix: Adopt the proposed fix, with three corrections that the reproduction forced.  Add to script:109 (append to the seeds string, replacing the "FIELDS THE RECON CRITIC NAMED" sentence so the flat roster stops existing):  "PAGE IDENTITY - BRANCH A vs BRANCH B, READ BEFORE THE FIELD ROSTER. user-administrator-fcfd570c.md documents TWO MUTUALLY EXCLUSIVE RENDERINGS of one User Administration section, split at its own lead sentence (:23 'The settings that appear in User Administration ... differ depending on whether the configuration includes:' / :25 'The Global group only' / :27 'At least one level i
> OBSERVATION — reproduced exactly, every quote verified.
> 
> 1) The offending text is at script:109 (the `seeds` string; page `name: 'Authorized Approval Limits'` is fixed at script:107). `sed -n '109p' | grep -o -F` counts on the seeds line:
>    "Manager Approval Limit" -> 1 ; "Global" -> 2 ; "Global group only" -> 0 ; "Global Group Only" -> 0 ; "check box appears" -> 0 ; "mutually exclusive" -> 0 ; "two renderings" -> 0 ; "branch" -> 0.
>    Same counts over the WHOLE 1,588-line file: "Global group only" 0, "mutually exclusive" 0, "Manager Approval Limit" 1. So the roster sentence quoted in the finding exists verbatim ("FIELDS THE RECON CRITIC NAMED ...: the Authorized Approver check box, Manager Approval Limit, Approval Limit Currency, a hierarchy Level field, a Can approve exception check box, a currency + Amount pair, and a stated PRECEDENCE RULE...") and the script contains NO branch language anywhere. The two "Global" hits are both branch-B link-visibility framing ("(in addition to Global)", "non-Global level") — they describe when the LINK renders, never that an alternate rendering with its own three controls exists.
> 
> 2) Corpus evidence confirmed line-for-line in admin-guides/user-administrator-fcfd570c.md (cat -n):
>    :23 "The settings that appear in User Administration ... differ depending on whether the configuration includes:" ; :25 "-   The Global group only" ; :27 "-   At least one level in the Authorized Approver Hierarchy".
>    :30 section header "Global Group Only" ;

> **refuter verdict:** refuted=False conf=high severity=high
> fix: As proposed, with two amendments.  STRIKE the phrase "and a mutual-exclusion dependency against the branch-B controls." The dependency `type` vocabulary is closed at depends_on|precedes|triggers (script:801, :1241-1243; 436/436 built dependencies use only those three), and validate-graph.py never inspects `type`, so an invented fourth value would land silently in a permanent graph. REPLACE with: "Model the conditionality as ordinary dependencies in the built idiom — type `depends_on`, with the branch stated in the required `condition` prose, following the precedent of dep.g1.001 ('X is not pre
> OBSERVATION GRANTED AND MECHANICALLY CONFIRMED.
> 
> `sed -n '105,112p'` on the script confirms line 109 is the single `seeds:` string. `grep -n -o -i "conditionally visible|conditional visibility|mutual|branch|Global group|Global)"` over the whole 1588-line file returns exactly TWO hits, both on line 109: the substring "CONDITIONALLY VISIBLE" (about the branch-B *link*) and "Global)" inside the verbatim branch-B quote. The string "Global group" appears NOWHERE in the script. So the Global-group-only rendering is absent from the entire build, while line 109 lists "the Authorized Approver check box, Manager Approval Limit, Approval Limit Currency" flat alongside branch-B's Level / Can approve exception / currency+Amount as "FIELDS THE RECON CRITIC NAMED" for this page.
> 
> CORPUS EVIDENCE VERIFIED. `cat -n user-administrator-fcfd570c.md`: :23 the two-configuration lead; :30 heading "Global Group Only"; :32 check box appears INLINE in the Expense and Invoices Setting section (no link, no window); :40 "used only for limit-based ... cannot be used for exception-based"; :43 selecting the check box reveals Manager Approval Limit + Approval Limit Currency. :49 heading "Authorized Approver Feature Hierarchy"; :51 the LINK; :59 "The Authorized Approval Limits window appears." Two renderings, one topic. The finding's quotes are accurate.
> 
> DECIDER VERIFIED. `cat -n global-group-vs-authorized-approver-hierarchy-8a960238.md` lines 106-129: step-4 row "Assign the proper rights to users using one 

---

## [high] Five nodes already in the graph assert the superseded 2026-08-31 scope decision; two of them say the page this run builds 'is not a page to build'

**id:** `stale-scope-text-already-in-graph`  **auditor:** landing-auditor (graph-impact)  **split-vote:** False

**where:** output/kg-invoice-config.json:17992 (dep.gworkflows.046.condition), :18287 (dep.gworkflows.060.condition), :23501 (grpworkflows-s2 sequence order 28 rationale), :23711 (grpworkflows-s3 sequence order 24 rationale); plus :26229 (vset.g3.unnamed.concur-receiving-roles-matrix-... notes, borderline)

**evidence:**

```
Exhaustive regex sweep over every string in every node (conditions, notes, verifyNotes, identityNotes, documentedBasis, page notes, step rationales, value-set notes, contradiction readings) for /out of scope|not a page to build|2026-08-31 decision|no page node/i. Offending strings, verbatim:

1. dep.gworkflows.046.condition — "Administration > Company > Company Admin > User Administration is out of scope for this graph by the 2026-08-31 decision."
2. dep.gworkflows.060.condition — "Administration > Company > Company Admin > User Administration is out of scope for this graph by the 2026-08-31 decision, and the Authorized Approval Limits window is real and documented but is not a page to build."
3. grpworkflows-s2-configure-authorized-approver-feature, sequence order 28 rationale — "The destination is Administration > Company > Company Admin > User Administration, which is OUT OF SCOPE for this graph by the 2026-08-31 decision; no page node exists and none should be created."
4. grpworkflows-s3-vendor-employee-access-hierarchy-six-tool-sequence, sequence order 24 rationale — "Administration > Company surfaces are out of scope for this graph, so no page node exists for it."
5. vset.g3.unnamed.concur-receiving-roles-matrix-the-complete-6-row-x-4-column-.notes — "role assignment happens in user administration, which is not a page in this graph." (still literally TRUE after the merge - the user-profile surface is not built - but now reads as contradicting a page whose name contains that path.)

All four of #1-#4 survive this merge untouched: merge-group.py:78-84 only drops nodes whose `group` equals the label being merged, and these carry group 'Workflows'. The validator inspects `condition` and step `rationale` nowhere - confirmed by reading bin/validate-graph.py:161-186 (dependencies: only endpoint ids, sourceFile and sourceQuote) and :189-197 (steps: only sequence page/field names).
```

**why it matters:** The instant page.authorized-approval-limits lands, node #2 sits in the graph asserting that the page next to it should not exist, sourced from the very file (user-administrator-fcfd570c.md) that the new page is built on. Any consumer reading conditions - a config-writer driver, a rendered artifact, the next build's SYNTH_CONTEXT - is told the opposite of the truth by a node that validates clean at exit 0.

**proposed fix:** Rewrite all four condition/rationale strings in the same pass as the merge. For dep.gworkflows.046 keep the forward reference but restate why (see finding 'dep046-wrong-retarget'): "FORWARD REFERENCE, EXPECTED TO STAY UNRESOLVED. The per-employee approver assignment lives on the User Administration user profile, which is a DIFFERENT surface from the Authorized Approval Limits window built 2026-09-01 and is not built (its documentation defers to an external Shared guide absent from this corpus). ...". For dep.gworkflows.060, prefer deletion over rewriting (see 'duplicate-conditional-visibility-edge'). For the two step rationales, replace 'OUT OF SCOPE ... by the 2026-08-31 decision' with 'not built: the general User Administration user-profile surface has no documentary basis in this corpus'. Leave #5 but append: 'Unchanged by the 2026-09-01 scope reversal: Authorized Approval Limits is now a page, the User Administration user profile is still not.'

> **refuter verdict:** refuted=False conf=high severity=high
> fix: As proposed for #1, #3, #4 and #5 — with one correction to #2 and two mechanical notes.  CORRECTION to #2 (dep.gworkflows.060 at :18287): do NOT default to deletion. Its sourceQuote ("then the Authorized Approval Limits link appears in the Expense and Invoices Setting section") is a real, corpus-attested conditional-visibility rule verified against user-administrator-fcfd570c.md, and the finding's own recommendation makes deletion contingent on a separate, unadjudicated finding ('duplicate-conditional-visibility-edge'). Sequence it: rewrite the condition unconditionally in this pass; delete th
> REPRODUCED, all of it. Every string exists at the stated location, byte-for-byte.
> 
> 1) `grep -n "out of scope for this graph by the 2026-08-31 decision\|OUT OF SCOPE ...\|not a page to build\|no page node exists\|not a page in this graph" output/kg-invoice-config.json` returns hits at exactly **17992, 18287, 23501, 23711, 26229** — the five lines cited, no more, no fewer for those phrases (a sixth hit at 15598 is an unrelated PO-import forward ref that contains "no page node exists" but no scope claim; correctly excluded).
> 
> 2) Independent exhaustive Python walk over EVERY string in EVERY node for /out of scope|not a page to build|2026-08-31 decision|no page node|not a page in this graph/i returns 17 hits; the four scope-decision assertions are `.nodes.configDependencies[420].condition`, `[434].condition`, `.nodes.configSteps[35].sequence[27].rationale`, `.nodes.configSteps[36].sequence[23].rationale`, plus `.nodes.configValueSets[70].notes` (#5). The other 12 hits are legitimate unrelated forward refs. No sixth stale-scope string was missed.
> 
> 3) Node identities confirmed exactly as the finding names them:
>  - [420] id=`dep.gworkflows.046`, group='Workflows', type=depends_on, targetRef={page:'User Administration', field:'approver', resolved:false}
>  - [434] id=`dep.gworkflows.060`, group='Workflows', type=triggers, targetRef={page:'User Administration', field:'Authorized Approval Limits', resolved:false}, sourceFile=`admin-guides/user-administrator-fcfd570c.md`
>  - [35] id=`grpwor

> **refuter verdict:** refuted=False conf=high severity=high
> fix: Keep the finding, amend the fix in four ways.  1. DO NOT DELETE dep.gworkflows.060. Repoint it instead, using machinery that already exists: add to REPOINT_ENDPOINT in bin/apply-corrections.py:134 the entry ('dep.gworkflows.060','targetRef'): ('Authorized Approval Limits', '<the emitted field name>'). The re-resolve pass at merge-group.py:218-232 then converts a permanently-dangling forward reference into a RESOLVED cross-group edge. Its sourceQuote is the conditional-visibility fact the build script itself calls load-bearing (line 109). Deleting it destroys attested evidence on the bet that t
> Verified every link in the chain with commands.
> 
> (1) STRINGS EXIST VERBATIM. `sed -n` on output/kg-invoice-config.json:17992, :18287, :23501, :23711 reproduced all four quoted strings exactly as the finding states, including dep.gworkflows.060's "the Authorized Approval Limits window is real and documented but is not a page to build."
> 
> (2) MERGE PRESERVES THEM. bin/merge-group.py:78-84 drops prior nodes only where `d.get('group') != group`. All four carry group "Workflows"; this run's GROUP is 'Approval Authority' (script line 102). Untouched by the merge. Confirmed.
> 
> (3) VALIDATOR IS BLIND. bin/validate-graph.py:179-195 (dependencies) reads only endpoint ids, sourceFile, sourceQuote; :197-201 (steps) reads only sequence `field` names. Neither `condition` nor `rationale` is inspected anywhere in the file. Exit 0 survives the contradiction. Confirmed.
> 
> (4) PERMANENCE IS WORSE THAN STATED. merge-group.py:218-232 re-resolves EVERY edge from its textual {page, field} ref after each merge. The new page is named "Authorized Approval Limits" (script line 107); python3 over configPages returns [] for any page containing "user" or "approval" in its name, so no page "User Administration" exists or will. dep.046 and dep.060 therefore stay permanently unresolved WHILE citing a decision this run reverses.
> 
> (5) THE HARM IS ALSO DURING THE RUN - the finding under-argued this. grep of the build script for KG shows agents are told to read the graph at lines 575, 1010, 1103, 1169. Line 1010 si

---

## [high] apply-corrections.py has no operation that can edit a dependency's `condition` or a step's `rationale` — the stale text in finding #3 is unreachable by the toolchain

**id:** `no-correction-op-for-dependency-condition`  **auditor:** landing-auditor (graph-impact)  **split-vote:** False

**where:** bin/apply-corrections.py:591-606 (append_notes) and :608-641 (main); the full op list is at :160,172,204,233,246,264,268,301,323,358,514,532,552,570,591

**evidence:**

```
`append_notes` iterates only `kg['nodes']['configFields']` (:592) and `kg['nodes']['configValueSets']` (:599). `blank_endpoint_fields` (:570-589) is the only function that touches a dependency's prose and it writes `d['notes']`, never `d['condition']` (:582-584). No function anywhere in the file iterates `configSteps`. Verified: `grep -n "configSteps" bin/apply-corrections.py` returns nothing.
```

**why it matters:** Every documented remediation path in this project runs through apply-corrections.py so that fixes are replayable after a re-merge. With no op for `condition`/`rationale`, the finding-#3 text can only be fixed by a hand edit of the 30k-line JSON — which is not replayable, and which merge-group.py will not undo but also will not preserve if the Workflows group is ever re-merged non-patch (merge-group.py:78-84 deletes and regenerates every Workflows dependency from the build result, restoring the stale condition text verbatim).

**proposed fix:** Add two tables and two functions to bin/apply-corrections.py, and call them from main() alongside the existing ops:
```
DEP_CONDITION = {  # dep id -> replacement condition string
    'dep.gworkflows.046': '...',
}
STEP_RATIONALE = {  # (step id, order) -> replacement rationale
    ('grpworkflows-s2-configure-authorized-approver-feature', 28): '...',
    ('grpworkflows-s3-vendor-employee-access-hierarchy-six-tool-sequence', 24): '...',
}
def fix_dep_conditions(kg):
    changed = 0
    for d in kg['nodes']['configDependencies']:
        new = DEP_CONDITION.get(d['id'])
        if new and d.get('condition') != new:
            d['condition'] = new; changed += 1
    return changed
def fix_step_rationales(kg):
    changed = 0
    for s in kg['nodes']['configSteps']:
        for e in s.get('sequence') or []:
            new = STEP_RATIONALE.get((s['id'], e.get('order')))
            if new and e.get('rationale') != new:
                e['rationale'] = new; changed += 1
    return changed
```
This also makes the fix survive a future Workflows re-merge, since apply-corrections.py is re-run after every merge.

> **refuter verdict:** refuted=False conf=high severity=medium
> fix: Prefer the parts-level fix, and add the ops only as a belt-and-braces second layer.  PRIMARY (replayable, and it scrubs the artifacts a future re-merge would restore): 1. Edit the two stale `condition` strings in `output/reports/2026-08-31_workflows-run-a-parts/synth-dependencies.json` and the one stale `rationale` in `synth-steps.json`, replacing the "out of scope for this graph" assertion with the true statement — the User Administration surface is IN scope and is now built as page "Authorized Approval Limits" under group "Approval Authority"; the edge is a forward reference that the Approva
> REPRODUCED, every claim, against the real files.
> 
> 1) `cd /mnt/c/Users/manci/PROJECTS/concur-config-diver-support && grep -n "configSteps" bin/apply-corrections.py` -> no output, exit 1. Confirmed: no function in the file iterates configSteps. (The key IS `configSteps` in the graph — `python3 -c "import json; print(list(json.load(open('output/kg-invoice-config.json'))['nodes'].keys()))"` -> configPages/configFields/configDependencies/configSteps/configValueSets/configContradictions/configCompressedRanges, 41 steps, 436 deps.)
> 
> 2) `grep -n "condition\|rationale\|sequence" bin/apply-corrections.py` -> hits ONLY at 32, 34-35, 77, 316 (prose inside string literals about the Audit Rules "condition editor") and 459/469/543-544 (`consequence`/`consequenceForWriter`, a contradiction-node field, not a dependency condition). There is no assignment to `d['condition']` and no reference to `rationale` or a step `sequence` anywhere in the file.
> 
> 3) Line numbers verified with `awk 'NR==570||NR==589||NR==591||NR==606||NR==608||NR==641'`: `def blank_endpoint_fields(kg):` = 570 (body ends 588), `def append_notes(kg):` = 591 (ends 605), `def main():` = 608 (ends 641). `grep -n "^def "` yields 160,172,204,233,246,264,268,301,323,358,514,532,552,570,591 — matches the finding's op list (264 is `_norm`, a helper, not an op; harmless imprecision). `blank_endpoint_fields` writes `d['notes']` at 585-586 and blanks `ref['field']`/`sourceId`/`targetId` at 579-582 — never `condition`. `append_notes` itera

> **refuter verdict:** refuted=False conf=high severity=medium
> fix: NOT as proposed. Three corrections plus a sequencing rule.  SEQUENCING (most important): do NOT edit anything before launching the run. The replacement text depends on facts the run has not produced yet (which controls the new page actually claims, and the per-field boundary answers the handoff demands). This belongs between `merge-group.py` and `validate-graph.py` in the documented command block (handoff 2026-09-01 lines 38-43), not as a pre-launch edit. The build script under audit is unaffected by this finding.  CORRECTION 1 — cover dep.gworkflows.060. The proposed DEP_CONDITION table lists
> COMMANDS RUN AND WHAT THEY SHOWED:
> 
> 1. `grep -n "configSteps" bin/apply-corrections.py` -> exit 1, no output. No function in the file iterates configSteps. Observation confirmed.
> 
> 2. `sed -n '591,606p'` — append_notes iterates kg['nodes']['configFields'] (:593) and kg['nodes'].get('configValueSets') (:599) only. `sed -n '570,589p'` — blank_endpoint_fields is the only function touching a dependency's prose; it writes d['notes'] (:586-587), never d['condition']. `sed -n '608,641p'` — main() calls 13 ops; I read all 15 op/table definitions at :160,172,204,233,246,264,268,301,323,358,514,532,552,570,591. None writes `condition` or a sequence entry's `rationale`. Every line citation in the finding is exact.
> 
> 3. `grep -n "condition\|rationale" bin/validate-graph.py` -> no output. No downstream guard. `python3 bin/validate-graph.py` exits 0, ERROR: none, WARN 181. So the defect causes no crash and no validator signal — it is purely a silent-prose problem.
> 
> 4. CHANNEL CLAIM CONFIRMED, AND STRONGER THAN STATED. apply-corrections.py is the mandated remediation path in four independent places: its own docstring (:1-6, "Re-run after any merge — the merge rebuilds nodes from raw results, so these corrections must be re-applied afterwards"), README.md:52, docs/2026-08-31_HANDOFF-KG-BUILD-v2.md:127 and :215 ("ALWAYS after a merge"), docs/RESUME-PROMPT.md:65 ("add this group's fixes there"). Additionally `cat .gitignore` shows `output/kg-invoice-config.json` is GITIGNORED, so a hand edit is 

---

## [high] dep.gworkflows.046 targets a DIFFERENT surface than the page being built — retargeting it to Authorized Approval Limits would encode a corpus falsehood

**id:** `dep046-must-not-be-retargeted`  **auditor:** landing-auditor (graph-impact)  **split-vote:** True

**where:** output/kg-invoice-config.json:17976-17999 (dep.gworkflows.046); corpus evidence in concur-invoice-professional-edition-admin-guides/user-administrator-fcfd570c.md and .../user-administration-8b167b96.md

**evidence:**

```
dep.gworkflows.046 targetRef is {page: 'User Administration', field: 'approver'} with sourceQuote "every employee must have an approver set for them in the User Administration page or through the employee import." (invoice-settings-cace748d.md).

I read both primaries for the new page in full. The Authorized Approval Limits window's controls are, verbatim: the left-side hierarchy level selector ("On the left side, the administrator selects the appropriate level in the hierarchy."), "the Can approve exception check box", and "the desired currency and enters the amount" / "the Amount field". The Global-group-only variant adds "the Authorized Approver check box", "the Manager Approval Limit field" and "the Approval Limit Currency list". NEITHER file contains any control for assigning an employee's approver. `grep -c 'approver set for them'` on user-administrator-fcfd570c.md and user-administration-8b167b96.md returns 0 in both.

The 'approver' in dep.046 is the per-employee default-approver assignment on the User Administration USER PROFILE — a genuinely different surface, which the script itself keeps out at :41-44 ('the general User Administration surface stay OUT ... both defer to external Shared guides absent from this corpus').
```

**why it matters:** The obvious reading of the task ('two dependencies point at this surface') invites retargeting both. Retargeting .046 would bind a workflow-wide submission prerequisite to a per-approver limit window it has nothing to do with, and it would resolve — so the validator would report it as a WIN, permanently. This is the highest-value thing to get wrong, because a wrong resolved edge is far harder to notice later than an honest unresolved one.

**proposed fix:** Leave dep.gworkflows.046 UNRESOLVED. Change only its condition text (via the new DEP_CONDITION op from finding #4) to: "FORWARD REFERENCE, EXPECTED TO STAY UNRESOLVED. The per-employee approver assignment lives on the User Administration USER PROFILE, a different surface from the Authorized Approval Limits window built 2026-09-01 (that window sets a level, a currency+amount, and a Can approve exception flag - it has no approver-assignment control; verified against user-administrator-fcfd570c.md and user-administration-8b167b96.md). The user-profile surface is unbuilt because its documentation defers to an external Shared guide absent from this corpus, NOT because of its menu location. Recorded because it is a hard operational consequence: clearing the Settings-tab checkbox activates a centralized approver workflow in which every employee must already have an approver set in User Administration or via the employee import, or submission fails with an error." Add NO REPOINT_ENDPOINT entry for this id.

> **refuter verdict:** refuted=False conf=high severity=high
> fix: As proposed, with three amendments.  (1) Correct the citation: dep.gworkflows.046 occupies output/kg-invoice-config.json:17975-17995 (dep.gworkflows.047 opens at :17997), not 17976-17999.  (2) Adopt the proposed condition text as written — it is corpus-grounded (the "external Shared guide" claim is attested by required-roles-3ddb8d70.md:30,:48 "Shared: User Admin User Guide" and employee-import-e28f2294.md:93 "Shared: Employee Import Specification"). Leave sourceQuote and sourceFile untouched so validate-graph.py:195's quote-in-file check keeps passing. Add NO REPOINT_ENDPOINT entry for dep.gw
> Every observation in the finding reproduces against the real files.
> 
> 1) The node exists as described. `grep -n 'dep.gworkflows.046' output/kg-invoice-config.json` → 17976. `sed -n '17960,18005p'` shows targetRef = {"page":"User Administration","field":"approver","resolved":false}, sourceId field.workflows.settings-allow-users-select-own-approver-payment-requests, sourceQuote "every employee must have an approver set for them in the User Administration page or through the employee import.", sourceFile invoice-settings-cace748d.md. All verbatim as claimed. ONE CITATION CORRECTION: the block spans 17975-17995, not 17976-17999 — `grep -n 'dep.gworkflows.047'` returns 17997, so the cited range overshoots into the next node. Start line is exact; tail is off by ~4.
> 
> 2) The sourceQuote is real in the corpus: `grep -n 'approver set for them' .../invoice-settings-cace748d.md` → line 44, verbatim, in a paragraph about the centralized-approver workflow and the submission error. Confirmed.
> 
> 3) The "different surface" claim holds. I read both primaries in full. user-administrator-fcfd570c.md (77 lines) gives the Authorized Approval Limits window controls at :63 ("On the left side, the administrator selects the appropriate level in the hierarchy."), :67 ("the Can approve exception check box"), :69 ("the desired currency and enters the amount"), :75 ("the Amount field"), plus the Global-only variant at :32/:43 (Authorized Approver check box, Manager Approval Limit field, Approval Limit Curre

> **refuter verdict:** refuted=True conf=high severity=low
> fix: NOT as proposed. Drop the DEP_CONDITION rewrite entirely — it depends on an op that does not exist (grep -c DEP_CONDITION bin/apply-corrections.py = 0), duplicates the existing BLANK_ENDPOINT_FIELD:420 / NOTE_APPEND:432 idioms, and edits prose the validator never reads (grep -n condition bin/validate-graph.py = 0 hits).  Correct action for THIS run: do nothing to dep.gworkflows.046. It cannot be auto-resolved (merge-group.py:229 keys on exact (page,field); dep.046 is ("user administration","approver") and the page name is hard-pinned to "Authorized Approval Limits" at .mjs:1122), and no artifa
> GRANTED, the observation is factually correct. I verified the corpus claim independently: `grep -c "approver set for them"` on user-administrator-fcfd570c.md and user-administration-8b167b96.md returns 0 in both. The only "approver" hits in the primary are a PRECONDITION (:57 "In addition, the employee must be an approver.") and the amount semantics (:47 Manager Approval Limit, :75 Amount field). The window's controls are the Authorized Approver check box (:32), Manager Approval Limit (:47), the level selector, Can approve exception (:67), and currency+Amount (:69). No approver-assignment control. dep.046 does target a different surface. I also confirmed which edge DOES point here: a scan of all unresolved refs shows dep.gworkflows.060 -> {User Administration, "Authorized Approval Limits"} from user-administrator-fcfd570c.md, which is the genuine one, alongside dep.g1.060, dep.g5.024, dep.g5.026.
> 
> REFUTED ON CONSEQUENCE. The retarget this finding warns about is not proposed, not enabled, and not mechanically reachable in this run.
> 
> 1. NOTHING PROPOSES IT. `grep -c "046\|REPOINT\|repoint" workflows/2026-09-01_kg-authorized-approval-limits.mjs` returns 0. `grep -rc "gworkflows.046\|REPOINT" docs/` returns zero non-zero rows across the two handoffs and WHERE-WE-LEFT-OFF.md. The "two dependencies point at this surface" framing that supposedly "invites retargeting both" appears in no artifact I can find; it is the auditor's own hypothetical.
> 
> 2. THE SCRIPT NEVER MERGES. `grep -n "

---

## [high] Lens C's charter tells the tools-guides sweep that its target term returns ZERO — for the wrong page, and this page's scope evidence lives in tools-guides

**id:** `lens-c-charter-workflows`  **auditor:** tabs-chain / schemas / script-executability  **split-vote:** True

**where:** workflows/2026-09-01_kg-authorized-approval-limits.mjs:153

**evidence:**

```
sed -n '153p' | cut → 'LENS C - TOOLS-GUIDES AND CROSS-CUTTING. ... FOR THIS GROUP SPECIFICALLY: grep for "Workflows tool/page/tab" over the 650 tools-guides files returns ZERO, so admin-guides is the FIELD SOURCE here - but SIXTEEN tools-guides files say "Invoice Configuration administrator", so tools-guides is still your CORROBORATION sweep. Search that phrase, "(left menu)" and "Invoice Processing Admin", not the word "workflow".'
Diff proves it is unedited: diff of parent vs new over lines 82-1588 shows NO hunk in the LENSES range (113-162).
```

**why it matters:** Lens C is the run's only guard against admin-guides skew, and it is handed three search terms chosen for Workflows ('Invoice Configuration administrator', '(left menu)', 'Invoice Processing Admin') and told NOT to search the word that matters. This page's entire in-scope argument — the one the header at :30-33 rests on — is a tools-guides sentence in workflow-and-approval-routing-8b4ff6c9.md, and the charter's final clause instructs the agent away from the word 'workflow' that would find it. The lens most likely to corroborate scope is aimed at the wrong target.

**proposed fix:** Replace the second sentence of :153 (everything from 'FOR THIS GROUP SPECIFICALLY:' to the end of the line) with:
'FOR THIS GROUP SPECIFICALLY: this page IS a tools-guides story. tools-guides/workflow-and-approval-routing-8b4ff6c9.md carries the sentence that puts Authorized Approvers in scope as a NON-PO policy workflow option, and step-2-activate-the-authorized-approver-feature-c87493ee.md and authorized-approvers-overview-8b3bd2d0.md speak to limit approval directly. Search "authorized approver", "approval limit", "limit approval", "exception limit", "User Administration" and "Expense and Invoices Setting" across tools-guides BEFORE you open admin-guides. Also read direct-approval-under-limit-based-cost-object-approval-1d8b6bca.md, which sits in the Invoice corpus but is worded for Concur Expense - if a topic speaks in Expense\'s voice, say so in notes rather than restating it as an Invoice claim.'

> **refuter verdict:** refuted=False conf=high severity=high
> fix: NOT as proposed. Apply this instead — two edits, both on :153.  EDIT 1, first sentence of :153, fix the stale census the original fix leaves in place:   'Of 486 fields in the graph so far, only 60 cite tools-guides.' → 'Of 607 fields in the graph so far, only 87 cite tools-guides.' (verified: output/kg-invoice-config.json, configFields length 607, 87 serialize a tools-guides path.)  EDIT 2, replace everything from 'FOR THIS GROUP SPECIFICALLY:' to the end of :153 with:  'FOR THIS GROUP SPECIFICALLY: admin-guides is still the FIELD SOURCE - do not inflate tools-guides to correct the ratio. But 
> REPRODUCED THE OBSERVATION EXACTLY, then tested the inference behind it separately.
> 
> 1) The text is there, verbatim, at the stated line.
> `grep -n 'LENS C - TOOLS-GUIDES' 2026-09-01_kg-authorized-approval-limits.mjs 2026-08-31_kg-workflows-run-a.mjs`
> → new:153 and parent:170, byte-identical strings including "FOR THIS GROUP SPECIFICALLY: grep for \"Workflows tool/page/tab\" ... Search that phrase, \"(left menu)\" and \"Invoice Processing Admin\", not the word \"workflow\"." The "unedited" claim also reproduces: `diff <(sed -n '82,1588p' parent) <(sed -n '82,1588p' new)` produces hunks only at the header block, `name`/`description`/`detail`, `PARTS`/`GROUP` (:20-21), the two page objects, and :509/:516, :1265, :1285-86 — no hunk anywhere in the LENSES array. Observation: CONFIRMED.
> 
> 2) The charter's own numbers are ALSO stale, in the sentence the proposed fix does not touch. It says "Of 486 fields in the graph so far, only 60 cite tools-guides." Against output/kg-invoice-config.json: configFields = 607, of which 87 serialize a 'tools-guides' string. So 486/60 → 607/87.
> 
> 3) The prescribed search plan is measurably wrong for this page. In concur-invoice-professional-edition-tools-guides (650 files):
>    - "Invoice Configuration administrator" → 16 files; of those, exactly ONE (how-single-step-approval-workflow-works-40145f24.md) mentions "authorized approver" or "approval limit".
>    - "(left menu)" → 10 files, ZERO on-topic (source lists, vendor groups, company locations).
>    - "I

> **refuter verdict:** refuted=True conf=high severity=cosmetic
> fix: DO NOT APPLY THE PROPOSED FIX. If line 153 is touched at all, it is hygiene, not a blocker — the run is safe to execute as-is. The only defensible edit is to strike the two mis-scoped clauses and keep everything that measures true. Replace the second sentence of line 153 (from 'FOR THIS GROUP SPECIFICALLY:' to end of line) with:  'FOR THIS GROUP SPECIFICALLY: admin-guides is the FIELD SOURCE here - all five seed files are admin-guides, and tools-guides is genuinely thin on this surface (measured over the 650 tools-guides files: "authorized approver" = 2 files, "Authorized Approval Limits" = 0,
> OBSERVATION GRANTED. Line 153 is verbatim Run A text. `grep -n 'LENS C - TOOLS-GUIDES' 2026-08-31_kg-workflows-run-a.mjs` -> line 170, byte-identical to line 153 of the new script; `diff <(sed -n '113,162p' parent) <(sed -n '113,162p' new)` produces no hunk inside the charter body. The staleness is real.
> 
> BUT THE CONSEQUENCE DOES NOT LAND. Four measurements, all run against the frozen corpus at /mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE:
> 
> (1) THE STALE SENTENCE'S OPERATIVE CONCLUSION IS TRUE FOR THIS PAGE, BY A WIDER MARGIN THAN FOR WORKFLOWS. Over the 650 tools-guides files: `grep -ril "authorized approver"` = 2 files; `"Authorized Approval Limits"` = 0; `"Expense and Invoices Setting"` = 0; `"exception limit"` = 0. All five seed files at script line 109 are admin-guides. So "admin-guides is the FIELD SOURCE here ... tools-guides is still your CORROBORATION sweep" is the correct instruction for this run. The sentence names the wrong grep target on its way to the right answer.
> 
> (2) THE ONE TERM THAT MATTERS ACTUALLY HITS. `grep -rlF "Invoice Configuration administrator" tools-guides` = 16 files, and one of them is how-single-step-approval-workflow-works-40145f24.md — one of only TWO tools-guides files on this surface, and the boundary-relevant one: it states the Authorized Approvers link is reached "from workflows in the classic interface" and that the Invoice Approver is "assigned an Approval Limit value." That speaks directly to this run's central same-value-t

---

## [high] ALREADY_BUILT omits the Workflows group and states 20 pages / 486 fields and "this run adds two NEW pages"

**id:** `already-built-stale-roster-and-counts`  **auditor:** tabs-chain / schemas / script-executability  **split-vote:** False

**where:** workflows/2026-09-01_kg-authorized-approval-limits.mjs:554-577

**evidence:**

```
sed -n '576,577p' → 'It holds 20 pages / 486 fields and is ERROR-clean at 486/486 verbatim quotes. This run adds two NEW' / 'pages and must not rebuild or re-home anything already in it.'
sed -n '566,568p' → 'OUTRIGHT - no page added, removed, merged or split. The workflow area is FOUR pages: Workflows (ONE' / 'page, SEVEN TABS), Feature Hierarchies (this run), plus Email Reminders and Delegate Configurations'
Actual graph: python3 → pages: 22 fields: 607 ; groups include 'Workflows'
The built-pages list at :559-565 names Groups 1-5 only — neither Workflows nor Feature Hierarchies appears.
```

**why it matters:** The Workflows page is the single most important boundary this build must respect: it already owns field.workflows.authorized-approver-approval-limit ('Approval Limit'), -level ('Level'), -can-approve-exception ('Can approve exception') and -list-approver ('Approver'). The prompt's authoritative 'do not rebuild, do not duplicate' roster does not list it. An extractor reading only this block has no reason to think 'Approval Limit' collides with anything, and the boundary question the header calls 'the central job of the build' is silently disarmed. '(this run)' beside Feature Hierarchies compounds it, and 'adds two NEW pages' will drive the agents to look for a second page the header at :43-45 explicitly forbids.

**proposed fix:** Rewrite :559-568 and :576-577. Add to the built list after the Group 5 line:
  '  Workflows group: Workflows (ONE page, seven tabs, 114 fields), Feature Hierarchies',
  'THE WORKFLOWS PAGE IS THE BOUNDARY YOU MUST RESPECT. It already carries FOUR controls whose labels',
  'collide with this page, all from admin-guides/authorized-approver-list-a9522ec8.md and all on its',
  'Authorized Approvers > Authorized Approver List tab:',
  '    field.workflows.authorized-approver-approval-limit         label "Approval Limit"',
  '    field.workflows.authorized-approver-level                  label "Level"',
  '    field.workflows.authorized-approver-can-approve-exception  label "Can approve exception"',
  '    field.workflows.authorized-approver-list-approver          label "Approver"',
  'It also already consumed admin-guides/procedure-2d20b513.md for three fields',
  '(authorized_approver_feature_available_for_workflows, minimum_exception_level, maximum_exception_level).',
  'Do not re-home any of them and do not mint a fifth "Approval Limit" without saying, in notes, that',
  'Workflows carries a sibling control for the same underlying value and naming the sibling.',
and replace :576-577 with:
  'It holds 22 pages / 607 fields. This run adds exactly ONE new page and must not rebuild or re-home',
  'anything already in it.'

> **refuter verdict:** refuted=False conf=high severity=high
> fix: Adopt the proposed rewrite of the roster and counts, with corrected line anchors and three additions.  (a) Insert after line 561 (the Group 5 continuation line), not after "the Group 5 line" ambiguously — the roster is 555-561:   '  Workflows group: Workflows (ONE page, seven tabs, 114 fields), Feature Hierarchies (7 fields)',   'THE WORKFLOWS PAGE IS THE BOUNDARY YOU MUST RESPECT. It already carries FOUR controls whose labels',   'collide with this page, all from admin-guides/authorized-approver-list-a9522ec8.md and all on its',   'Authorized Approvers > Authorized Approver List tab:',   '   
> REPRODUCED IN FULL. Every quoted string exists verbatim at the stated location.
> 
> 1) Block location. `grep -n "ALREADY_BUILT = \["` → line 554; the array closes at `].join('\n')` on 584. So the finding's "where: 554-577" is inside a real block that actually runs from 554-584.
> 
> 2) Verbatim evidence, re-run:
>  - `sed -n '576,577p'` → `  'It holds 20 pages / 486 fields and is ERROR-clean at 486/486 verbatim quotes. This run adds two NEW',` / `  'pages and must not rebuild or re-home anything already in it.',` — exact match.
>  - `sed -n '566,568p'` → ends `...The workflow area is FOUR pages: Workflows (ONE' / 'page, SEVEN TABS), Feature Hierarchies (this run), plus Email Reminders and Delegate Configurations` — exact match, including the stale `(this run)`.
>  - The built-pages roster is at 555-561 (not 559-565 as the evidence line says; 562-564 is the NOT-yet-built list). That is a citation slip of four lines in a sub-claim; the substance is exactly right — the roster names Group 1 through Group 5 only, and neither `Workflows` nor `Feature Hierarchies` appears anywhere in 554-584.
> 
> 3) Ground truth from the graph. `python3` over output/kg-invoice-config.json (nodes.configPages / nodes.configFields): **pages 22, fields 607**. Groups present: Group 1-5 plus **`Workflows`**, holding `page.workflows` (**114 fields**) and `page.feature-hierarchies` (7 fields). So "20 pages / 486 fields" is wrong by 2 pages / 121 fields, and the two missing pages are precisely the ones this run collides wit

> **refuter verdict:** refuted=False conf=high severity=medium
> fix: Real defect, wrong size and wrong remedy. Downgrade to medium and apply a SURGICAL edit, not a rewrite of :559-568.  (a) PURE INSERTION after :561 (do not touch :555-561 or :562-568):   '  Workflows group: Workflows (ONE page, seven tabs, 114 fields), Feature Hierarchies (7 fields)',  (b) :568 — replace the parenthetical only:   'Feature Hierarchies (this run)' → 'Feature Hierarchies (BOTH BUILT 2026-08-31)' Leave the rest of :565-574 untouched: the recon adjudication and the 41-deferred-surfaces pointer are accumulated method.  (c) :576-577 — replace with:   'It holds 22 pages / 607 fields an
> OBSERVATION — fully confirmed, every number checked.
> 
>   python3 → g['nodes']['configPages'] = 22, g['nodes']['configFields'] = 607
>   page list includes `page.workflows | Workflows | group= Workflows` (114 fields, counted by pageId)
>   and `page.feature-hierarchies | Feature Hierarchies | group= Workflows` (7 fields).
>   awk NR 554-580 of the script: the roster at :555-561 names Groups 1-5 only; :568 says
>   "Feature Hierarchies (this run)"; :576-577 says "It holds 20 pages / 486 fields ... This run adds
>   two NEW pages"; :579 says "All 20 built pages". All four are stale Run A text.
>   The four colliding ids exist exactly as stated:
>     field.workflows.authorized-approver-approval-limit     'Approval Limit'
>     field.workflows.authorized-approver-level              'Level'
>     field.workflows.authorized-approver-can-approve-exception 'Can approve exception'
>     field.workflows.authorized-approver-list-approver      'Approver'
> 
> CONSEQUENCE — the finding's stated harm mechanism does NOT hold.
> 
> 1. "An extractor reading only this block has no reason to think 'Approval Limit' collides with
> anything, and the boundary question is silently disarmed." REFUTED. PAGES[0].seeds (:109) already
> carries the entire boundary charter verbatim — all four colliding field ids, the
> authorized-approver-list-a9522ec8.md attribution, the three-setter sentence from
> configuration-8b3be88b.md, "DO NOT silently create a fifth 'Approval Limit'", "say explicitly in
> notes that Workflows carries a sibling contro

---

## [high] Map/inventory prompt says "FOR EACH of the two pages" and gives 40+ Workflows and Feature Hierarchies search terms

**id:** `map-inventory-two-pages`  **auditor:** tabs-chain / schemas / script-executability  **split-vote:** False

**where:** workflows/2026-09-01_kg-authorized-approval-limits.mjs:675, :688-703

**evidence:**

```
sed -n '675p' → ' FOR EACH of the two pages, do all of this and show the commands in searchLog:'
sed -n '688,693p' → 'Search terms are your job, but at minimum cover: for Workflows - workflow, workflow step, workflow' / 'rule, action, approval, approver, authorized approver, cost object approver, approval status, email' / ... / 'steps page, step rules page; for Feature Hierarchies - feature hierarchy, hierarchy, hierarchies,'
sed -n '696,703p' → 'A PRIOR RECON already built an 86-file and 12-file candidate set for these two pages...' / 'REVISION-HISTORY TRAP, MEASURED AND SPECIFIC TO THIS GROUP: four files in the Workflows set OPEN WITH' / '"Revision History" and hold 37% of the page measured table payload - general-information-8b3b0308.md' / '(139 rows), cost-object-approval-8b3d1e0f.md (85), authorized-approvers-8b3c26cc.md (64),'
```

**why it matters:** The inventory agent decides what every downstream extractor reads — 'every file you miss here is a hole in the graph that nothing downstream can fill', per its own :671. It is told there are two pages, given an 86-file Workflows floor it 'must beat', and pointed at four named revision-history files. PAGES has one entry, so invById.get() will find at most one id and the second page's inventory is discarded, but the damage happens first: the agent will assemble a Workflows-sized reading list against a ~5-file, ~11,000-byte page, and the run's ~7-field expectation (header :62, page brief :109) collides head-on with an inventory built to beat 86 files. Fifteen fields was named as the warning sign; this prompt is engineered to produce them.

**proposed fix:** Change :675 to ' For the single page, do all of this and show the commands in searchLog:'. Delete :688-703 and replace with:
    'Search terms are your job, but at minimum cover: authorized approval limits, authorized approver,',
    'approval limit, manager approval limit, approval limit currency, limit approval, exception limit,',
    'can approve exception, unlimited approval, User Administration, Expense and Invoices Setting,',
    'Invoice User Administration, User Admin rights, employee import, hierarchy level.',
    'THE SEED LIST IN THE PAGE BRIEF IS A FLOOR, NOT A CEILING, and the recon that produced it was not',
    'aimed at this page - sweep "Approval Limit" and "Authorized Approval Limits" across BOTH guide',
    'directories yourself. But this is a SMALL page: ~5 core files, ~11,000 bytes, and a measured ZERO raw',
    '<table> elements and ZERO markdown table rows on both primaries. Run the census anyway and REPORT the',
    'zeros - a zero census is the finding. An inventory of 40 files for this page is a red flag, not',
    'thoroughness. admin-guides/procedure-2d20b513.md is ALREADY CONSUMED by the built Workflows page for',
    'three fields; list it if it is relevant but say so in notes.'

> **refuter verdict:** refuted=False conf=high severity=high
> fix: As proposed for :675 and for the replacement text (both verified accurate against the frozen corpus), with ONE correction to the deletion range.  :675 — replace with:     'For the single page, do all of this and show the commands in searchLog:',  DELETE LINES 688-705 INCLUSIVE (not 688-703 — :704-705 are the tail of the same Workflows revision-history trap and would otherwise be stranded, still naming email-notifications-8b3dbad4.md at a page that has no such file). The block is bounded by :687 (blank) and :706 (blank); delete everything between them and insert:      'Search terms are your job
> REPRODUCED VERBATIM, every claim.
> 
> 1. `sed -n '675p' workflows/2026-09-01_kg-authorized-approval-limits.mjs` → `    'FOR EACH of the two pages, do all of this and show the commands in searchLog:',` — exact match.
> 
> 2. `sed -n '688,705p'` → the full Workflows/Feature-Hierarchies search-term dump (:688-695, ~40 terms across two pages), the 86-file/12-file floor instruction (:696-700, "Treat it as a FLOOR you must beat"), and the four-named-file revision-history trap (:701-705). Exact match to the evidence quoted.
> 
> 3. NOT a deliberate adaptation — pure copy residue. `diff <(sed -n '675p;688,705p' 2026-09-01_...mjs) <(sed -n '692p;705,722p' 2026-08-31_kg-workflows-run-a.mjs)` returns EMPTY. Byte-identical to the Run A parent at a constant 17-line offset (= the 1605→1588 file-length delta). No editing of this block ever happened.
> 
> 4. PAGES arity confirmed: `const PAGES = [` at :104 contains exactly one entry, `id: 'authorized-approval-limits'` (:106). `pageBrief` (:552) is built from PAGES, so the same prompt that says "the two pages" at :675 carries a one-page brief at :714 saying "~5 core files, ~11,000 bytes ... Expect ROUGHLY SEVEN fields. Do not manufacture more." (:109). A head-on contradiction inside a single prompt.
> 
> 5. The damage mechanism is real, not speculative. `invById` (:726) keys inventory by page id; `pageContext()` (:737-762) injects `i.mustRead` verbatim into EVERY extractor prompt under the header "MUST-READ (each of these is checked downstream for citation; if 

> **refuter verdict:** refuted=False conf=high severity=high
> fix: As proposed, with one small addition. The proposed replacement text is accurate on every measured claim I could check, and it preserves the accumulated method (FLOOR-not-ceiling, run-the-census-anyway, the procedure-2d20b513.md consumption warning) while dropping only Run-A-specific evidence. Verified numbers behind the fix text: the five seed files total 11,158 bytes (~11,000, correct); `grep -c '<table'` and `grep -cP '^\s*\|'` both return 0 on user-administrator-fcfd570c.md and user-administration-8b167b96.md (correct); `grep -rl 'Approval Limit'` over the corpus returns exactly 5 files, ma
> Line numbers confirmed exactly as cited: grep -n gives :675 'FOR EACH of the two pages', :688 'Search terms are your job, but at minimum cover: for Workflows -', :696 'A PRIOR RECON already built an 86-file and 12-file candidate set', :701 'REVISION-HISTORY TRAP'. sed -n '664,720p' shows the whole map:inventory prompt; PAGES at :104 has exactly one entry (id 'authorized-approval-limits').
> 
> CONSEQUENCE TRACE, each step verified in code:
> 1. The inventory agent's prompt at :714 injects the CORRECT single-page brief, then at :675/:688-703 tells it there are two pages, hands it ~40 Workflows/Feature-Hierarchies terms as an 'at minimum cover' floor, and hands it a numeric '86-file and 12-file' set to 'Treat as a FLOOR you must beat'. These are not decorative: they are the most operationally specific instructions in the prompt.
> 2. Magnitude measured against the frozen corpus: grep -ril 'workflow' = 347 files, grep -ril 'authorized approver' = 59, grep -rilE 'feature hierarch|hierarchies' = 45, versus grep -rl 'Approval Limit' = 5. The contaminated terms aim the sweep at a 347-file surface for a 5-file page.
> 3. The bloat is NOT discarded by invById. sed -n '731,770p' shows pageContext() splices i.mustRead and i.alsoRelevant verbatim into every one of the three extraction lenses under the header 'MUST-READ (each of these is checked downstream for citation; if you skip one, you must say why)'. A Workflows-sized mustRead therefore becomes a mandatory reading list for LENS A/B/C on the A

---

## [high] Two Synthesize prompts are headed "FOR GROUP 3" and the valueSets output template says "one of the two Group 3 page names"

**id:** `synth-group-3-headers`  **auditor:** tabs-chain / schemas / script-executability  **split-vote:** False

**where:** workflows/2026-09-01_kg-authorized-approval-limits.mjs:1185, :1221, :1239

**evidence:**

```
grep -n 'GROUP 3\|Group 3 page names' →
1185:    '=== YOUR JOB: BUILD THE ConfigValueSets FOR GROUP 3 ===',
1221:    '  "valueSets": [ { "appliesToPage": "<one of the two Group 3 page names>",',
1239:    '=== YOUR JOB: BUILD THE ConfigDependencies FOR GROUP 3 ===',
```

**why it matters:** The appliesToPage template at :1221 is the exact field the prompt spends ten lines warning about ('On the last two runs 17 of 18 value sets landed attached to nothing'). Telling the agent to write 'one of the two Group 3 page names' into it, when Group 3 is Purchase Order Matching Rules / Purchase Order Configuration and this run has one page, invites precisely the unwired-value-set defect the surrounding text exists to prevent. bin/assemble-parts.py resolves appliesToPage against by_page_field, which includes the LIVE GRAPH — so a value set addressed to a real Group 3 page name will silently resolve and merge onto someone else's page.

**proposed fix:** Line 1185 → '=== YOUR JOB: BUILD THE ConfigValueSets FOR THIS GROUP ==='. Line 1239 → '=== YOUR JOB: BUILD THE ConfigDependencies FOR THIS GROUP ==='. Line 1221 → '  "valueSets": [ { "appliesToPage": "Authorized Approval Limits",'. While there, note that this page's two documented value semantics are not enumerations but SEMANTIC NULLS — 0 means in-chain-with-no-final-authority, blank means UNLIMITED (setting-an-unlimited-approval-amount-9d98b489.md) — so add: 'This page may legitimately produce ZERO value sets. Its two documented value facts (0 = in the chain with no final authority; blank = UNLIMITED) are field NOTES and validValues semantics, not context-dependent enumerations. Do not manufacture a set to have one.'

> **refuter verdict:** refuted=False conf=high severity=high
> fix: Apply the fix as proposed — all three line edits are exact, unique, and correct:   :1185 → '=== YOUR JOB: BUILD THE ConfigValueSets FOR THIS GROUP ==='   :1239 → '=== YOUR JOB: BUILD THE ConfigDependencies FOR THIS GROUP ==='   :1221 → '  "valueSets": [ { "appliesToPage": "Authorized Approval Limits",' For :1221, prefer interpolating from the single source of truth so it cannot drift again — e.g. '  "valueSets": [ { "appliesToPage": "' + PAGES[0].name + '",' (PAGES is in scope at that point; it is already interpolated at :1174 in the same PREAMBLE).  Add the proposed zero-value-sets guard as w
> OBSERVATION — reproduces exactly, byte for byte.
> 
> `grep -n 'GROUP 3\|Group 3\|group 3' workflows/2026-09-01_kg-authorized-approval-limits.mjs` returns 7 hits; the three cited are present verbatim:
>   1185:     '=== YOUR JOB: BUILD THE ConfigValueSets FOR GROUP 3 ===',
>   1221:     '  "valueSets": [ { "appliesToPage": "<one of the two Group 3 page names>",',
>   1239:     '=== YOUR JOB: BUILD THE ConfigDependencies FOR GROUP 3 ===',
> (`sed -n '1185p;1221p;1239p'` confirms each individually. Match counts: 'one of the two Group 3 page names' = 1, 'FOR GROUP 3 ===' = 2 — so all three edits are unambiguous.)
> 
> Verbatim carryover from the parent confirmed: `grep -n 'GROUP 3\|Group 3 page names' 2026-08-31_kg-workflows-run-a.mjs` → 1202 / 1238 / 1256, same strings, i.e. pure Run A residue.
> 
> The premise that makes it wrong here is confirmed: `const PAGES` at :104 holds exactly ONE element, name 'Authorized Approval Limits'. "the two Group 3 page names" is false on its face for this run. And the two Group 3 pages are LIVE: `python3` over output/kg-invoice-config.json nodes.configPages lists 22 pages including 'Purchase Order Configuration' and 'Purchase Order Matching Rules'. So the template names two real, other-page targets.
> 
> Aggravating: this template line sits ~47 lines after the PREAMBLE line :1174 which correctly injects `PAGES.map(...)` → 'Page names for THIS run, exactly as they must be written: "Authorized Approval Limits".' The prompt therefore contains a direct self-contradiction

> **refuter verdict:** refuted=False conf=high severity=low
> fix: Apply part (a) as proposed — it is a zero-risk hygiene edit matching the file's own existing style at :1346:   :1185 → '=== YOUR JOB: BUILD THE ConfigValueSets FOR THIS GROUP ==='   :1239 → '=== YOUR JOB: BUILD THE ConfigDependencies FOR THIS GROUP ==='   :1221 → '  "valueSets": [ { "appliesToPage": "Authorized Approval Limits",'  Do NOT paste part (b) as written — it attributes the "0" semantic to setting-an-unlimited-approval-amount-9d98b489.md, which does not contain it. If the zero-value-sets nudge is wanted, use corrected attribution:   'This page may legitimately produce ZERO value sets.
> OBSERVATION: verified exactly. `grep -n 'GROUP 3\|Group 3' 2026-09-01_kg-authorized-approval-limits.mjs` returns 1185 ('=== YOUR JOB: BUILD THE ConfigValueSets FOR GROUP 3 ==='), 1221 ('"appliesToPage": "<one of the two Group 3 page names>"'), 1239 ('... ConfigDependencies FOR GROUP 3'). `const GROUP = 'Approval Authority'` (:102) and `const PAGES` (:104) holds ONE page. The text is stale Run A residue. Granted.
> 
> STATED MECHANISM IS FALSE. The finding says "bin/assemble-parts.py resolves appliesToPage against by_page_field, which includes the LIVE GRAPH — so a value set addressed to a real Group 3 page name will silently resolve and merge onto someone else's page." assemble-parts.py:206-207 builds `by_page_field` ONLY from `pages`, i.e. THIS RUN's rosters. The live graph is folded into a DIFFERENT dict, `known_refs` (:212-219), and grep shows `known_refs` is consulted only for contradiction refs (:383) and range refs (:400) — never for value sets. Value sets are checked at :355-357 against `by_page_field`, so a Group-3-addressed set produces a LOUD `VALUE-SET-WOULD-LAND-UNWIRED` line under "PRE-MERGE PROBLEMS". Not silent. (It is non-FATAL — FATAL at :479-482 does not include it — and merge-group.py:85-89 DOES index the live graph, so an operator who ignores the printed warning would get it wired to the wrong page. So a hazard exists, but it is announced, and the finding named the wrong file for it.)
> 
> CONSEQUENCE IS EMPIRICALLY WEAK. The identical text ran once already: the p

---

## [high] SYNTH_CONTEXT says "these two pages", cites 20 built pages, and closes with a Workflows-only TAB NAMES rule

**id:** `synth-context-two-pages-and-tab-rule`  **auditor:** tabs-chain / schemas / script-executability  **split-vote:** False

**where:** workflows/2026-09-01_kg-authorized-approval-limits.mjs:1162, :1170, :1175-1178

**evidence:**

```
sed -n '1162p' → '"name" values in them are the ONLY legal field names for these two pages:'
sed -n '1170p' → 'names for the 20 pages already built. Cross-group references are valuable and must use exact names.'
sed -n '1175,1178p' → 'TAB NAMES ARE NOT PAGE NAMES. A control on the Settings tab is a field on the page "Workflows"; it is' / 'NEVER on a page called "Settings", "Workflow Settings", "Purchase Request Settings" or "Invoice' / 'Settings". "Invoice Settings" IS A DIFFERENT, ALREADY-BUILT PAGE and writing that name here would' / 'silently merge two surfaces. Use the tab name in the field NOTES, never as the page.'
```

**why it matters:** SYNTH_CONTEXT is concatenated into all four Synthesize agents (:1172 injection of ALREADY_BUILT sits inside it). '20 pages' is wrong (22) and 'these two pages' is wrong (one). The TAB NAMES paragraph is a Workflows-specific guard rail that here mostly wastes tokens — but its concrete instruction, 'a control on the Settings tab is a field on the page "Workflows"', is an active invitation to file this run's controls against the page "Workflows", which is the exact duplication hazard the header calls the central risk of the build.

**proposed fix:** Line 1162 → '"name" values in it are the ONLY legal field names for this page:'. Line 1170 → 'names for the 22 pages already built. Cross-group references are valuable and must use exact names.'. Replace :1175-1178 with:
  'THE ONE PAGE NAME LEGAL FOR NEW RECORDS IN THIS RUN IS "Authorized Approval Limits". "Workflows" is an',
  'ALREADY-BUILT PAGE and it already owns four controls whose labels collide with this one ("Approval',
  'Limit", "Level", "Can approve exception", "Approver"). You may REFERENCE those Workflows fields as',
  'dependency endpoints by their exact graph names - that is valuable. You may NOT emit a new field, value',
  'set or roster record against the page "Workflows". A duplicate here is invisible to bin/validate-graph.py.'

> **refuter verdict:** refuted=False conf=high severity=high
> fix: As proposed — the three edits at :1162, :1170 and :1175-1178 are correct as written, and the replacement paragraph names the right page ("Authorized Approval Limits", matching PAGES[0].name at :107) and the right four colliding Workflows labels.  Two additions so the repair does not leave a self-contradicting prompt: 1. Also fix :576 inside ALREADY_BUILT (spliced into SYNTH_CONTEXT at :1172): 'It holds 20 pages / 486 fields and is ERROR-clean at 486/486 verbatim quotes. This run adds two NEW' → 22 pages / 607 fields, 607/607, and "This run adds ONE new page". If another finding already owns th
> REPRODUCED, character-exact, all three cited locations.
> 
> `sed -n '1160,1179p'` on workflows/2026-09-01_kg-authorized-approval-limits.mjs prints the whole SYNTH_CONTEXT array and confirms:
>   :1162  '"name" values in them are the ONLY legal field names for these two pages:'
>   :1163  '  ' + rosterList
>   :1170  'names for the 20 pages already built. Cross-group references are valuable and must use exact names.'
>   :1172  ALREADY_BUILT   (injected INSIDE SYNTH_CONTEXT, as the finding states)
>   :1174  dynamic page-name line built from PAGES
>   :1175-1178  the TAB NAMES paragraph, verbatim as quoted in the evidence block.
> 
> The two factual errors are both real:
> 1. "these two pages" — `awk` over `const PAGES = [` (:104) shows PAGES has exactly ONE entry, name 'Authorized Approval Limits'. `built`/`rosterList` derive from PAGES, so :1163 injects a one-line roster directly under a sentence that promises two. Self-contradicting inside the same paragraph, and the nearest candidate for the phantom second page is "Workflows", which is exactly the page this run must not write to.
> 2. "20 pages already built" — python3 over output/kg-invoice-config.json: nodes.configPages = 22, nodes.configFields = 607. The 22 page names print out (…Feature Hierarchies, Workflows). So 20 is stale Run A arithmetic (Run A ran when the graph held 20 and was adding 2).
> 
> Provenance confirmed as Run A survival, not new text: grep on the parent 2026-08-31_kg-workflows-run-a.mjs finds the identical three strings at :117

> **refuter verdict:** refuted=False conf=high severity=high
> fix: Lines 1162 and 1170 as proposed:   :1162 -> '"name" values in them are the ONLY legal field names for this page:'   :1170 -> 'names for the 22 pages already built. Cross-group references are valuable and must use exact names.' ALSO required in the same edit, or :1170 is contradicted two lines later inside the same prompt (:1172 injects ALREADY_BUILT):   :576 -> 'It holds 22 pages / 607 fields and is ERROR-clean. This run adds ONE new page and must not'   :568/:582 -> drop 'Feature Hierarchies (this run)' and the 'NOT a page for you to build' clause about Authorized Approval Limits (sibling fin
> TEXT VERIFIED, ALL THREE CITATIONS EXACT.
> `awk 'NR>=1155&&NR<=1180'` on workflows/2026-09-01_kg-authorized-approval-limits.mjs reproduces :1162 ("...for these two pages:"), :1170 ("...for the 20 pages already built..."), and :1175-1178 (the TAB NAMES paragraph) verbatim. `grep -n SYNTH_CONTEXT` confirms it is concatenated into all four Synthesize agents at :1217 (valueSets), :1289 (dependencies), :1332, :1372, and that ALREADY_BUILT is injected at :1172 INSIDE it.
> 
> THE TWO FACTUAL CLAIMS ARE FALSE, CONFIRMED AGAINST DISK.
> `python3 -c "json.load(output/kg-invoice-config.json)"` -> pages 22, fields 607, and the page list ends ['... 'Feature Hierarchies', 'Workflows']. So ":1170 says 20" is wrong by two. And PAGES (:110-116) holds exactly ONE entry, so rosterList at :1163 renders one line under a sentence saying "these two pages".
> 
> CONSEQUENCE - I TRACED IT AND IT REACHES THE GRAPH, THOUGH NOT BY THE MECHANISM THE FINDING NAMES.
> Fields and pages cannot be corrupted from here: assemble-parts.py:162-186 builds `pages` and `fields` EXCLUSIVELY from roster-*.json, written in Phase 4 Repair before SYNTH_CONTEXT exists. So the finding's headline framing ("the exact duplication hazard the header calls the central risk", i.e. a fifth "Approval Limit" field on Workflows) is NOT reachable from these lines. That framing is overstated.
> But the four Synthesize agents emit valueSets, dependencies, contradictions, compressedRanges and steps that carry FREE-TEXT page names, and merge-group.py:8

---

## [high] The ConfigSteps prompt asks for 4-7 Workflows procedures (General -> Steps -> Step Rules, email notifications, Settings-tab thresholds) for a single modal window

**id:** `synth-steps-workflows-procedures`  **auditor:** tabs-chain / schemas / script-executability  **split-vote:** False

**where:** workflows/2026-09-01_kg-authorized-approval-limits.mjs:1355-1363

**evidence:**

```
sed -n '1355,1359p' → 'Aim for 4 to 7 steps that cover the genuinely useful procedures here - for example standing up a new' / 'approval workflow end to end (General -> Steps -> Step Rules -> assign to a policy/group), configuring' / 'the Authorized Approver feature (which REQUIRES the Feature Hierarchies page first), authoring an email' / 'notification on its tab and then selecting it on the workflow General page, and setting the three' / 'exception-level thresholds on the Settings tab.'
sed -n '1360,1363p' → 'The corpus hands you real ordering: workflow-creation-' / 'process-1d37b85f.md, the step-N topics, and tools-guides/overview-of-steps-37e3c289.md ...'
```

**why it matters:** Every worked example names a Workflows tab or wizard page. A ~7-field modal window supports at most one or two honest end-to-end procedures — 'set an approver's authorization limit', and arguably 'stand the feature up so the link becomes visible at all'. Asking for 4-7 against Workflows exemplars will produce steps whose sequence entries name pages and fields this run did not build; bin/assemble-parts.py:421 only checks the step-id PREFIX, so those steps merge and surface later as step-references-unknown-field warnings (23 already outstanding). The prompt even undercuts its own final safeguard ('if a page supports no coherent end-to-end procedure, do not invent one for symmetry') by naming five concrete ones first.

**proposed fix:** Replace :1355-1363 with:
    'Aim for ONE OR TWO steps. This is a ~7-field modal window and it supports at most: (1) making the link',
    'appear at all - activate the Authorized Approver feature and give the hierarchy at least one level',
    'beyond Global, which is a hard prerequisite stated in the corpus, then confirm the link renders in the',
    'Expense and Invoices Setting section; and (2) setting one approver\'s authorization limit in this window,',
    'including the precedence rule between the Approval Limit area and the Level field, and the two value',
    'semantics a driver will otherwise get backwards (0 = in the chain with NO final authority; blank =',
    'UNLIMITED). Both cross into already-built pages - that is what makes them useful. If the corpus does not',
    'support a second step, emit one. DO NOT invent a step for symmetry, and do not write steps about the',
    'Workflows wizard, its tabs, or email notifications - another group owns those.'

> **refuter verdict:** refuted=False conf=high severity=high
> fix: Two corrections to the fix as proposed.  (a) LINE RANGE IS OFF BY ONE. Replace :1355-1364, not :1355-1363. Line :1363 ends mid-sentence and :1364 completes it; deleting only through :1363 leaves the orphan fragment "'page supports no coherent end-to-end procedure, do not invent one for symmetry.'," dangling in the array immediately after the new text.  (b) THE FIX MUST NAME THE EXISTING STEP. Its step (1) — activate the feature, give the hierarchy a non-Global level — is ALREADY BUILT as grpworkflows-s2-configure-authorized-approver-feature (28 entries, orders 1-12 List Management + Feature Hi
> REPRODUCED EXACTLY, then strengthened.
> 
> 1) The text exists verbatim at the stated location — and the finding UNDERSTATES the range by one line.
> `sed -n '1340,1380p' workflows/2026-09-01_kg-authorized-approval-limits.mjs` shows the ConfigSteps agent starting at :1343, and lines :1355-:1364 carry the quoted block. The finding cites :1355-1363, but :1363 ends mid-sentence ("Let the corpus decide: if a") and :1364 completes it ("page supports no coherent end-to-end procedure, do not invent one for symmetry."). The real block is :1355-1364.
> 
> 2) It is byte-identical Run A carryover, not adapted text.
>   sed -n '1355,1364p' child > child.txt; sed -n '1372,1381p' parent > parent.txt; diff  ->  no output.
> Child :1355-1364 == parent 2026-08-31_kg-workflows-run-a.mjs:1372-1381, ten lines, zero diff. The only lines the adapter touched in this prompt are the job header (:1346) and the step-id prefix (:1366-1367). Nothing in the surrounding context re-scopes it: SYNTH_CONTEXT (:1160-1178) is itself contaminated (":1162 'the ONLY legal field names for these two pages'" — this run has ONE page; PAGES has 1 entry) and :1175-1176 actively REINFORCES Workflows ("A control on the Settings tab is a field on the page 'Workflows'"). :1369-1370 explicitly licenses crossing into built pages, so the exemplars are not fenced.
> 
> 3) The exemplars are DEMONSTRABLY generative — the parent run followed them one-for-one.
> Reading output/kg-invoice-config.json (nodes.configSteps, 41 steps; prefix counts {g1:4,g2

> **refuter verdict:** refuted=False conf=high severity=high
> fix: Adopt the proposed replacement of lines 1355-1363, with one added clause to close the duplication hole the fix leaves open. Replace 1355-1363 with:      'Aim for ONE OR TWO steps. This is a ~7-field modal window and it supports at most: (1) making the link',     'appear at all - the corpus states the link is conditionally visible, requiring the Authorized Approver',     'feature activated AND a hierarchy level in addition to Global - then confirming it renders in the',     'Expense and Invoices Setting section; and (2) setting one approver\'s authorization limit in this window,',     'includin
> CONFIRMED, and the consequence is worse than stated.
> 
> 1. Carryover verified. `grep -n "Aim for 4 to 7 steps" <both scripts>` → line 1355 in the audited script, 1372 in Run A. The block at 1355-1363 is byte-identical Run A text; only the step-id prefix line (1366-1367) was adapted.
> 
> 2. The exemplars are already-built nodes. `python3 -c "...for s in g['nodes']['configSteps'] if s['id'].startswith('grpworkflows-')"` returns exactly the five procedures the prompt names as examples: s1 stand-up-workflow-end-to-end (General->Steps->Step Rules->Policy), s2 configure-authorized-approver-feature, s3 the six-tool sequence from overview-of-steps-37e3c289.md (the file cited at 1360-1362), s4 author-email-notification-and-select-it, s5 set-exception-level-thresholds. The prompt hands this run five worked examples the graph already owns.
> 
> 3. grpworkflows-s2 is a 28-entry sequence covering List Management -> Feature Hierarchies -> Workflows activation -> steps -> approver list, terminating at order 28 on User Administration - this run's own page.
> 
> 4. THE STATED MECHANISM IS WRONG BUT THE HARM IS LARGER. merge-group.py:202-207 appends steps with NO dedupe (contrast the explicit dependency dedupe at 209-216), so duplicates persist permanently in an append-only graph. validate-graph.py:200-207 warns only on step-references-unknown-field / step-references-unbuilt-page and has NO duplicate-step check. Because Feature Hierarchies, Workflows and User Administration are all built pages and every fi

---

## [medium] ALREADY_BUILT carries the retired-13-workflow-pages paragraph and a pointer to the Workflows recon roster, neither of which bears on this page

**id:** `already-built-13-pages`  **auditor:** stale-content-audit / 2026-09-01_kg-authorized-approval-limits.mjs  **split-vote:** False

**where:** workflows/2026-09-01_kg-authorized-approval-limits.mjs:565-574

**evidence:**

```
awk 'NR>=565 && NR<=574': 'THE "13 WORKFLOW PAGES" FIGURE IS RETIRED. A dedicated six-sweep recon (2026-08-31, run wf_f4d39441-6cb, 9 agents, 0 errors) re-derived the lost roster and its PAGE-HOOD CRITIC ENDORSED IT OUTRIGHT ... The workflow area is FOUR pages: Workflows (ONE page, SEVEN TABS), Feature Hierarchies (this run), plus Email Reminders and Delegate Configurations (Run B). The 13 the old map counted reconcile as 7 tabs + 3 wizard pages ... All 41 deferred surfaces are listed with reasons in output/reports/2026-08-31_workflows-recon/roster.md ...'
```

**why it matters:** Ten lines injected into all six prompt sites about a roster question that is closed and unrelated. The '(this run)' on Feature Hierarchies is the harmful part (covered separately); the rest is pure context tax on every agent, and the roster.md pointer will send the completeness critic — the most expensive agent in the run, opus/xhigh — auditing the Workflows deferral list rather than this page.

**proposed fix:** Delete :565-574. If a pointer is wanted, one line suffices and should name THIS page's provenance: 'This page was adjudicated into scope on 2026-09-01 after the Workflows recon\'s two critics split on it; the adjudication is in the header of this script. It is closed - do not re-open it.'

> **refuter verdict:** refuted=False conf=high severity=medium
> fix: Delete :565-574, but APPLY IT TOGETHER WITH the fix to :575-577, never in isolation — deleting 565-574 alone strips the only statement in ALREADY_BUILT that Workflows and Feature Hierarchies are built pages, while leaving :576's stale "20 pages / 486 fields" standing.  Replace :565-577 as one block with a correct statement of graph state plus a closed-question pointer that does NOT name roster.md:    'Also built, 2026-08-31 (Workflows group): Workflows (ONE page, seven tabs, 114 fields) and',   'Feature Hierarchies. The built Workflows page is the collision counterpart for this run - its',   '
> REPRODUCED EXACTLY. Commands and results:
> 
> 1) The text exists verbatim at the stated location.
> `awk 'NR>=555 && NR<=585' workflows/2026-09-01_kg-authorized-approval-limits.mjs` prints the ALREADY_BUILT array (declared at :554, closed at :584). Lines 565-574 are exactly the ten lines quoted in the finding, character-for-character, including 'Feature Hierarchies (this run)' at :568 and the roster.md pointer at :572-574. No paraphrase, no drift.
> 
> 2) It is verbatim inherited Run A text, not adapted.
> `grep -n '13 WORKFLOW PAGES' 2026-08-31_kg-workflows-run-a.mjs` -> :582. Diffing `awk 'NR>=565&&NR<=574'` of the new script against `awk 'NR>=582&&NR<=591'` of the parent returns EMPTY. Byte-identical. The adaptation never touched this block.
> 
> 3) Injection count is right (mildly understated).
> `grep -n ALREADY_BUILT` -> 554 (decl) + 652, 711, 880, 956, 1172, 1440 = six usage sites. :880 sits inside `parallel(LENSES.map(...))` at :870, so the real agent-prompt count is higher than six, not lower.
> 
> 4) The completeness-critic claim is exact.
> :1440 puts ALREADY_BUILT into CRITIC_CONTEXT (:1425-1441); CRITIC_CONTEXT is consumed at :1483 inside the agent whose options at :1489 are `{ label: 'critic:completeness', phase: 'Critic', model: 'opus', effort: 'xhigh' }`. So the ten lines do reach the most expensive agent in the run.
> 
> 5) THE HARM IS WORSE THAN THE FINDING STATES — this is the part I tried hardest to break and could not. The finding calls :572-574 a misdirection ("pure context tax", 

> **refuter verdict:** refuted=False conf=high severity=medium
> fix: Split the block rather than deleting it wholesale.  1. DELETE :565-571 (the retired-13 figure, the "workflow area is FOUR pages" sentence carrying the false "(this run)", and the tabs/wizard/settings census). Inert-to-contradictory for a one-page run; the page-node guard is already covered by the fixed PAGES const at :104-111 and the header rule at :41-44.  2. REPLACE :572-574 — do not simply delete it — with an explicit correction that inlines the adjudication (agents never see the script header):   'output/reports/2026-08-31_workflows-recon/roster.md is a PRIOR run report. It is a useful loo
> OBSERVATION VERIFIED. `diff <(sed -n '554,584p' 2026-09-01_kg-authorized-approval-limits.mjs) <(sed -n '571,601p' 2026-08-31_kg-workflows-run-a.mjs)` exits 0 — the entire ALREADY_BUILT block, :554-584, is byte-identical to Run A. `grep -n ALREADY_BUILT` confirms six injection sites in the new script (:652 map:navigation, :711 map:inventory, :880 extract lens x3, :956 the refuter `shared` block, :1172 SYNTH_CONTEXT, :1440 CRITIC_CONTEXT — which feeds both opus/xhigh critics at :1489 and :1540). So the ten lines really do reach every agent in the run.
> 
> THE "CONTEXT TAX" HALF IS WEAK. :565-571 (retired-13 figure, "the workflow area is FOUR pages", the 7-tabs/3-wizard/3-settings census, "Do NOT create a page node for any of them") is about surfaces this run does not touch. PAGES is a fixed one-element const at :104-111 and the header at :41-44 already says "If you find yourself adding a second page here, stop and ask", so the page-node guard is redundant here. On its own this is close to harmless boilerplate and would not carry a medium.
> 
> THE ROSTER POINTER HALF IS A REAL HARM PATH, STRONGER THAN THE FINDING STATES. :572-574 does not merely mention roster.md — it instructs every agent to "use that when you need to know where a runtime behaviour is configured", i.e. exactly the boundary question the header at :53-65 and the seeds at :109 call the central job of this run. The file exists (703 lines, output/reports/2026-08-31_workflows-recon/roster.md) and it contradicts this run's 

---

## [medium] Both critic prompts and the critic log line say "these two pages" / "across 2 pages"

**id:** `critic-arity`  **auditor:** stale-content-audit / 2026-09-01_kg-authorized-approval-limits.mjs  **split-vote:** True

**where:** workflows/2026-09-01_kg-authorized-approval-limits.mjs:1423, :1461, :1475, :1516

**evidence:**

```
:1423 log('Critic input: ' + ... + ' fields across 2 pages; ' + uncitedTotal + ' must-read files never cited')
:1461 '    related to these two pages. For each hit, decide: settings table (must be captured) or'
:1475 '    these two pages. Any variant document that was built from the wrong twin is a real defect: the PO'
:1516 ' 5. DUPLICATE NAMES. Within each page, and across the two pages, and against the existing graph. A'
```

**why it matters:** Low-grade but real: the correctness critic's duplicate-name check (:1516) is scoped to 'across the two pages', which for a one-page run collapses to nothing — precisely when the check that matters is across THIS page and the built Workflows page. The completeness critic's raw-table sweep (:1461) and new-experience sweep (:1475) will hunt for a second page that does not exist.

**proposed fix:** :1423 -> ' fields on 1 page; '. :1461 -> '    related to this page.'. :1475 -> '    this page.'. :1516 -> ' 5. DUPLICATE NAMES. Within this page, and against the existing graph - ESPECIALLY against the built Workflows page, whose Authorized Approver List tab carries the same four labels. A duplicate name within one page is a hard validator ERROR; a duplicated CONTROL across two pages is invisible to the validator and is the defect this run exists to avoid. Check both.'

> **refuter verdict:** refuted=False conf=high severity=medium
> fix: As proposed — all four edits are correct and the :1516 replacement text is factually verified against the built graph. Two amendments:  (a) Soften the rationale, not the edit: :1516's existing trailing clause "and against the existing graph" already reaches the built Workflows page, so the edit sharpens a partially-working check rather than restoring a dead one. Apply it anyway; naming the Workflows page and its four labels explicitly is the point.  (b) Do not stop at these four lines. The identical Run A arity leak survives at :615, :675, :696, :954, :1022, :1162 and :1221 in the same file. :
> REPRODUCED, all four locations, byte-exact.
> 
> 1. `awk 'NR==1423||NR==1461||NR==1475||NR==1516' 2026-09-01_kg-authorized-approval-limits.mjs` returns exactly the four strings quoted in the evidence block. No paraphrase, no line drift (file is 1588 lines).
>    :1423 `log('Critic input: ' + digest.reduce((a, d) => a + d.fieldCount, 0) + ' fields across 2 pages; ' + uncitedTotal + ' must-read files never cited')`
>    :1461 `'    related to these two pages. For each hit, decide: settings table (must be captured) or',`
>    :1475 `'    these two pages. Any variant document that was built from the wrong twin is a real defect: the PO',`
>    :1516 `' 5. DUPLICATE NAMES. Within each page, and across the two pages, and against the existing graph. A',`
> 
> 2. THE ARITY IS GENUINELY ONE. `const PAGES = [` at :104 contains exactly one object (id `authorized-approval-limits`, :105-117), closing `]` at :118. `const built = (perPage || []).filter(Boolean)` at :1148 and `const digest = built.map(...)` at :1393 — so `digest.length === 1` and the log line at :1423 prints a hardcoded "2 pages" against a 1-element digest. The string is not computed; it is a literal.
> 
> 3. CAUSE CONFIRMED, not merely inferred. The same four strings exist verbatim in the Run A parent 2026-08-31_kg-workflows-run-a.mjs at :1440, :1478, :1492, :1533 — a +17 line offset, consistent with a straight adaptation. Parent `PAGES` carries two names ('Workflows', 'Feature Hierarchies'), where "two pages" was correct. So this is inherited 

> **refuter verdict:** refuted=True conf=high severity=cosmetic
> fix: Apply the three pure wording corrections — they cost nothing and remove a false premise — but do NOT apply the proposed :1516 rewrite as written, and do not carry the stated rationale forward.  Apply as-is:   :1423 -> ' fields on 1 page; '   :1461 -> '    related to this page. For each hit, decide: settings table (must be captured) or'   :1475 -> '    this page. Any variant document that was built from the wrong twin is a real defect: the PO'  At :1516, make the minimal arity correction only:   ' 5. DUPLICATE NAMES. Within this page, and against the existing graph. A duplicate name within one 
> OBSERVATION GRANTED, MECHANISM REFUTED.
> 
> 1. The four lines are real. `grep -n "two pages\|2 pages"` on the script returns 615, 675, 696, 1022, 1162, 1423, 1461, 1475, 1516 — the four cited lines are verbatim as quoted. And the run really is one page: a node parse of the `const PAGES = [...]` block returns `PAGES entries: 1 ['authorized-approval-limits']`, and :590 already logs 'mapping 1 page'. So the arity text is stale. No dispute there.
> 
> 2. THE CENTRAL CLAIM IS FALSE. whyItMatters says the duplicate-name check at :1516 "is scoped to 'across the two pages', which for a one-page run collapses to nothing." `sed -n '1516,1517p'` shows it is a THREE-clause sentence: "Within each page, and across the two pages, and against the existing graph." Only the middle clause collapses. The clause the finding says is missing — the check against the built Workflows page — IS the third clause, in the same sentence, untouched.
> 
> It is backstopped twice more:
>  - :1512-1514 (item 4, PAGE OWNERSHIP) ends: "does any field name here collide with a DIFFERENT control of the same name on another page in the graph?" — an explicit reverse cross-page collision check.
>  - :1007-1013, the refuter-2 "CROSS-PAGE COLLISION" lens, orders the agent to read the graph with python3 and decide whether a same-named field on a different page is a distinct control or the same one filed twice.
>  - CRITIC_CONTEXT (:1428-1435) hands the critic the graph path and says "read it with python3."
> 
> I confirmed the target is live

---

## [medium] The Map/nav prompt claims URLs "came from live-UI observation recorded in an earlier handoff" — but url is '' and the header says no such observation exists

**id:** `map-nav-url-live-observation`  **auditor:** stale-content-audit / 2026-09-01_kg-authorized-approval-limits.mjs  **split-vote:** False

**where:** workflows/2026-09-01_kg-authorized-approval-limits.mjs:601-605 vs :67-68 and :108

**evidence:**

```
:601-605 'navPath is LOAD-BEARING, not the URL ... The URLs given below came from live-UI observation recorded in an earlier handoff and CANNOT be corpus-verified. Do not try, and do not invent one. Use them only as the page identifier.'
:108 'url: \'\','
:67-68 (header) '// url: \'\' — the corpus publishes NO .asp URLs and there is no live-UI observation for this page. // The click path is the only navigation knowledge that will exist.'
```

**why it matters:** The agent is told to 'use them only as the page identifier' when there is no them. Minor, but it is a direct contradiction between the header's honest statement and the prompt's, and it invites the agent to go looking for a URL it was simultaneously told not to invent.

**proposed fix:** Replace :603-605 with: 'THERE IS NO URL FOR THIS PAGE AND THAT IS THE HONEST ANSWER - url is deliberately empty. The corpus publishes no .asp URLs (zero hits corpus-wide for PolicyAdmin, auditRules, accountingAdmin, dcredirect) and unlike the earlier groups there is no live-UI observation for this surface either. The click path is the ONLY navigation knowledge this page will ever have, which is why navPathEvidence matters more here than anywhere else in the build. Do not invent a URL.'

> **refuter verdict:** refuted=False conf=high severity=medium
> fix: Same replacement text, but splice lines **602-605** (not 603-605), keeping line 601 intact. Line 601 ends "...bounces via dcredirect, so" and flows into the new text; line 602 ends "zero hits corpus-wide for" and dangles into 603, so 602 must go with it.  Keep 601 as-is:     'navPath is LOAD-BEARING, not the URL: a direct goto on an admin URL bounces via dcredirect, so',  Replace 602-605 with:     'pages are reached by clicking. THERE IS NO URL FOR THIS PAGE AND THAT IS THE HONEST ANSWER - url is',     'deliberately empty and renders as an empty token in the page brief below. The corpus publis
> REPRODUCED EXACTLY, verbatim, at the stated lines.
> 
> 1) The offending text exists where claimed.
> `grep -n "came from live-UI\|Use them only as the page identifier\|url: ''\|no live-UI observation" /mnt/c/Users/manci/PROJECTS/concur-config-diver-support/workflows/2026-09-01_kg-authorized-approval-limits.mjs` returns:
>   67: `// url: '' — the corpus publishes NO .asp URLs and there is no live-UI observation for this page.`
>   108: `    url: '',`
>   603: `'PolicyAdmin, auditRules, accountingAdmin, dcredirect. The URLs given below came from live-UI',`
>   605: `'invent one. Use them only as the page identifier.',`
> `sed -n '601,605p'` confirms the full 5-line paragraph, and 601 is where it starts. The "where" field of the finding is correct to the line.
> 
> 2) It is inherited stale text, and I traced the provenance rather than inferring it.
> `diff <(sed -n '601,605p' 2026-09-01_...mjs) <(sed -n '618,622p' 2026-08-31_kg-workflows-run-a.mjs)` → IDENTICAL VERBATIM. The same paragraph is at 539-543 of 2026-08-31_kg-group-5b.mjs. In 5B the claim was TRUE: `grep -hn "url: '" *.mjs` shows 5B carried four real live-UI URLs (`/expense/admin/invoice/companyLocations.asp`, `listManagement.asp`, `budgetConfiguration.asp`, `taxAdministrator.asp`). Run A carried it forward with both urls already `''` (its own header note at :78 says so), and this script inherited it a second time. So the paragraph is stale in Run A too — that does not make it non-stale here.
> 
> 3) The contradiction is real at render time, 

> **refuter verdict:** refuted=False conf=high severity=cosmetic
> fix: Widen the range to 601-605 (NOT 603-605 — :602 ends mid-sentence at "zero hits corpus-wide for", and the fix as proposed strands that fragment). Replace the whole block with:      'navPath is LOAD-BEARING, and for this page it is ALL there is. A direct goto on an admin URL',     'bounces via dcredirect, so pages are reached by clicking - and the corpus publishes NO .asp URLs',     'at all (zero hits corpus-wide for PolicyAdmin, auditRules, accountingAdmin, dcredirect). Earlier',     'groups at least had URLs recorded from live-UI observation in a prior handoff; THIS page has none,',     'and u
> OBSERVATION CONFIRMED. `grep -n "live-UI\|url:" 2026-09-01_kg-authorized-approval-limits.mjs` returns exactly :67 (header: "there is no live-UI observation for this page"), :108 (`url: ''`), and :601-605 (the prompt claiming "The URLs given below came from live-UI observation ... Use them only as the page identifier"). `grep -n pageBrief` puts the "below" referent at :655, built at :552 as `'| url ' + p.url` — with p.url empty it renders "| url " and nothing after. So the prompt does point at an empty referent. The contradiction is real.
> 
> CONSEQUENCE IS NIL, on three independently verified structural grounds.
> (1) `sed -n '253,300p'` shows NAV_SCHEMA sets `additionalProperties: false` and declares only id/name/documentedBasis/coverageGuess/uiVariant/navPathEvidence/aliases/roleGates/identityNotes (+tabs). `url` is NOT a property. The Map/nav agent at :663 is the ONLY agent that sees :601-605 (the grep for "live-UI" returns nothing else), and it structurally cannot emit a url.
> (2) The only agent-authored url is the Repair roster template at :1122, `'  "pageId": "' + p.id + '", "pageName": "' + p.name + '", "url": "' + p.url + '",'` — pre-filled to `"url": ""`. That prompt does not contain the stale passage.
> (3) `grep -n url bin/*.py` returns only assemble-parts.py:182 (`'url': r.get('url') or ''`) and merge-group.py:103 (pass-through). validate-graph.py has ZERO url references, so a hallucinated url WOULD be silent — but nothing in the chain invites one, and the passage's own o

---

## [medium] PREAMBLE's text-trap section still explains the Invoice Processing Admin middle node in terms of "BOTH Group 3 pages"

**id:** `preamble-group-3-nav`  **auditor:** stale-content-audit / 2026-09-01_kg-authorized-approval-limits.mjs  **split-vote:** False

**where:** workflows/2026-09-01_kg-authorized-approval-limits.mjs:239-241

**evidence:**

```
awk 'NR>=239 && NR<=241':
  '  "Invoice Processing Admin" is a MIDDLE NAV NODE - most Invoice admin pages hang off it, not'
  '  directly off Administration. For BOTH Group 3 pages the canonical access topic OMITS that node, but it'
  '  is documented for other pages on the same menu - so treat the middle segment as UNATTESTED, not absent.'
This page's documented paths (grep -n 'Administration' user-administrator-fcfd570c.md) are 'Administration > Company > Company Admin > User Administration' and 'Administration > User Administration'. Neither route touches Invoice Processing Admin.
```

**why it matters:** PREAMBLE is injected into every single agent. Telling them to treat 'Invoice Processing Admin' as UNATTESTED-not-absent primes the Map agent to emit it as a navPathAlternates candidate for a page whose path never goes through Administration > Invoice at all. A driver handed that alternate would fail. The 'BOTH Group 3 pages' phrasing is also two-generations-stale residue.

**proposed fix:** Replace :240-241 with: '  directly off Administration. THAT IS AN Administration > Invoice FACT AND IT DOES NOT APPLY TO THIS PAGE: this page is reached through Administration > Company, and Invoice Processing Admin appears in none of its documented paths. Do not offer it as an alternate here. (It stays in this preamble because dependency endpoints into built pages still need it.)'

> **refuter verdict:** refuted=False conf=high severity=medium
> fix: Keep the fix's structure but do not collapse this page's navigation to a single route. Preserve :239 unchanged and replace :240-241 with:  '  directly off Administration. THAT IS AN Administration > Invoice FACT AND IT DOES NOT APPLY TO', '  THE PAGE BEING BUILT IN THIS RUN: Authorized Approval Limits is reached through User Administration,', '  and zero of the two corpus files that name it mention Invoice Processing Admin. Never offer that', '  middle node as a path or alternate for this page, and do not treat its absence as an omission.', '  Do NOT over-narrow the other way either: THREE rou
> OBSERVATION CONFIRMED, AND IT IS WORSE THAN "RESIDUE".
> 
> `sed -n '254,262p' 2026-08-31_kg-workflows-run-a.mjs` vs `sed -n '238,242p' 2026-09-01_kg-authorized-approval-limits.mjs` returns byte-identical text. `grep -n "Group 3" .../2026-09-01_...mjs` shows lines 557-559 define Group 3 as "Purchase Order Matching Rules, Purchase Order Configuration" — so "BOTH Group 3 pages" at :240 was ALREADY wrong in the Run A parent (whose pages were Workflows + Feature Hierarchies) and is now two generations stale, exactly as claimed.
> 
> THE CONSEQUENCE IS TRACEABLE, NOT SPECULATIVE — THREE INDEPENDENT LEGS.
> 
> 1. THE PROPAGATION PATH IS DEMONSTRATED, NOT HYPOTHESISED. Run A's near-identical instruction landed VERBATIM in permanent graph prose. `python3` dump of output/kg-invoice-config.json, nodes.configPages[20] (page.feature-hierarchies).identityNotes contains: "The middle node is therefore UNATTESTED FOR THIS PAGE — record as UNATTESTED, NOT ABSENT." identityNotes IS merged (bin/merge-group.py:116 carries it) and IS appendable by critics (bin/apply-corrections.py:166 and :526-527). For Feature Hierarchies that hedge was DEFENSIBLE — that page sits under Administration > Invoice, so the middle-segment question was live and the agent even ran the census (31 IPA hits, none FH). For Authorized Approval Limits the question is not live at all, so the same behaviour reproduces as nonsense prose baked into a permanent node.
> 
> 2. NO MECHANICAL GUARD CATCHES IT. `grep -c "navPath" bin/validate-graph.p

---

## [medium] The seeds tell the run to "capture both" value semantics without saying the built Workflows field already captures both, and already cites one of this run's five seed files

**id:** `seeds-understate-collision`  **auditor:** stale-content-audit / 2026-09-01_kg-authorized-approval-limits.mjs  **split-vote:** True

**where:** workflows/2026-09-01_kg-authorized-approval-limits.mjs:109 (seeds, '### VALUE SEMANTICS, DOCUMENTED AND UNUSUAL' clause)

**evidence:**

```
python3 over output/kg-invoice-config.json, field.workflows.authorized-approver-approval-limit:
  sourceFile: 'concur-invoice-professional-edition-admin-guides/authorized-approver-list-a9522ec8.md'
  notes: "...SPECIAL VALUES documented: 'You can enter 0 in the Approval Limit field. This puts the approver into the authorized approver workflow but will prevent that approver from having final authority to approve the invoice.' A blank amount with 'no approval limit' currency yields unlimited approval — corroborated by setting-an-unlimited-approval-amount-9d98b489.md: 'a limit amount of null will result in an unlimited approval/no limit approval amount.'"
Seeds say: '### VALUE SEMANTICS, DOCUMENTED AND UNUSUAL - capture both, they are not the same claim: 0 means the approver is in the chain but has NO final authority; a NULL/blank amount means UNLIMITED (setting-an-unlimited-approval-amount-9d98b489.md).'
```

**why it matters:** setting-an-unlimited-approval-amount-9d98b489.md is seed #5 of five, and the built Workflows field already consumes it — so the deepest collision in the run is between one of this page's five sources and an existing field, and the seeds do not say so. An extractor told to 'capture both' will do exactly that and produce a fifth Approval Limit with identical semantics notes. This is the precise outcome the handoff calls out as 'a defect, not a field'.

**proposed fix:** Append to the VALUE SEMANTICS clause in the seeds (:109): ' ### AND KNOW THIS BEFORE YOU CAPTURE THEM: the BUILT Workflows field field.workflows.authorized-approver-approval-limit ALREADY records both semantics in its notes AND already cites setting-an-unlimited-approval-amount-9d98b489.md - one of your five seeds. So capturing them here is NOT automatically new information. What IS distinct and worth capturing is that this window states the 0 rule against TWO DIFFERENT LABELS: "You can enter 0 in the Manager Approval Limit field" (the Global-group-only branch) and "You can enter 0 in the Amount field" (the windowed branch), both in user-administrator-fcfd570c.md. If you emit an Approval Limit record here, its justification must be the DIFFERENT LABEL and the DIFFERENT SURFACE, stated in notes with the sibling field id named - not the value semantics.'

> **refuter verdict:** refuted=False conf=high severity=medium
> fix: Adopt the proposed fix, with one substantive tightening. Append to the VALUE SEMANTICS clause on :109 (single-line string, so append inside the existing sentence run):  ' ### AND KNOW THIS BEFORE YOU CAPTURE THEM: the BUILT Workflows field field.workflows.authorized-approver-approval-limit ALREADY records BOTH semantics in its notes AND already cites setting-an-unlimited-approval-amount-9d98b489.md - one of your five seeds. That seed names no surface at all (its whole body is "When configuring the approver, a limit amount of null will result in an unlimited approval/no limit approval amount"),
> REPRODUCED — every claim in the finding is verifiable, and I also verified the proposed fix's own factual assertions before endorsing it.
> 
> 1) The offending text exists exactly at the stated location. `grep -n "VALUE SEMANTICS" /mnt/c/Users/manci/PROJECTS/concur-config-diver-support/workflows/2026-09-01_kg-authorized-approval-limits.mjs` → hit on line 109 only (the whole `seeds:` value is one physical line; file is 1588 lines). The clause reads verbatim: "### VALUE SEMANTICS, DOCUMENTED AND UNUSUAL - capture both, they are not the same claim: 0 means the approver is in the chain but has NO final authority; a NULL/blank amount means UNLIMITED (setting-an-unlimited-approval-amount-9d98b489.md)."
> 
> 2) The graph node is exactly as quoted. python3 over output/kg-invoice-config.json (nodes.configFields, 607 entries) → field.workflows.authorized-approver-approval-limit, pageId page.workflows, label "Approval Limit", sourceFile ".../authorized-approver-list-a9522ec8.md", and notes containing BOTH semantics: the 0 rule verbatim AND "corroborated by setting-an-unlimited-approval-amount-9d98b489.md: 'a limit amount of null will result in an unlimited approval/no limit approval amount.'" So the built field does already record both claims and does already cite the run's seed #5.
> 
> 3) The gap is real, not merely rhetorical. `grep -o "setting-an-unlimited-approval-amount[^ ,)']*"` on the script returns exactly 2 hits, both on line 109: once in the seed list, once in the VALUE SEMANTICS clause.

> **refuter verdict:** refuted=True conf=high severity=low
> fix: Do NOT apply the proposed text. If anything is appended to the VALUE SEMANTICS clause at :109, use this shorter, non-suppressive version, which adds only what is grep-verified and absent, and does not contradict the CENTRAL JUDGEMENT clause already in the same string:  " NOTE TWO THINGS BEFORE YOU RECORD THESE. (a) The 0 rule is stated in this window against TWO DIFFERENT LABELS, both in user-administrator-fcfd570c.md: 'You can enter 0 in the Manager Approval Limit field' (the Global-group-only check-box branch) and 'You can enter 0 in the Amount field' (the hierarchy / Authorized Approval Lim
> OBSERVATION GRANTED, DIAGNOSIS WRONG, CONSEQUENCE ALREADY GUARDED THREE WAYS.
> 
> What I verified as TRUE (the finding's raw evidence holds):
> - `grep -n 'VALUE SEMANTICS' workflows/2026-09-01_kg-authorized-approval-limits.mjs` → line 109 only (the whole seeds string is one line). The clause reads exactly as quoted.
> - python3 over output/kg-invoice-config.json, nodes.configFields → `field.workflows.authorized-approver-approval-limit` (label "Approval Limit") notes do carry BOTH semantics and do cite `setting-an-unlimited-approval-amount-9d98b489.md`.
> - `grep -n` over the five seed files confirms the proposed fix's factual claims are real, not invented: user-administrator-fcfd570c.md:47 "You can enter 0 in the Manager Approval Limit field" (the Global-group-only / check-box branch, per :33-:47) and :75 "You can enter 0 in the Amount field" (the hierarchy / Authorized Approval Limits window branch, per :53-:75). Two labels, two branches, same file. The seeds never state this: `grep -c "0 in the Amount field"` on the script → 0.
> 
> Why the CONSEQUENCE does not survive:
> 1. THE SEEDS ARE NOT SILENT ON THE COLLISION — they are louder about it than any other clause in the run. Line 109 contains "#### THE CENTRAL JUDGEMENT OF THIS RUN - READ IT TWICE ####", names all four colliding ids including `authorized_approver_approval_limit (label "Approval Limit")`, states the three-setter sentence, demands a per-control boundary answer "out loud, in notes, citing the file that decides it", require

---

## [medium] Two built graph nodes carry the now-reversed out-of-scope decision in their condition text, and their endpoints will not auto-resolve against this build

**id:** `graph-debt-reversed-decision`  **auditor:** stale-content-audit / 2026-09-01_kg-authorized-approval-limits.mjs  **split-vote:** False

**where:** output/kg-invoice-config.json — dep.gworkflows.046, dep.gworkflows.060 (report only; do not fix inside this run)

**evidence:**

```
python3 dump:
 dep.gworkflows.060 targetRef {page:'User Administration', field:'Authorized Approval Limits', resolved:false}, condition: 'FORWARD REFERENCE, EXPECTED TO STAY UNRESOLVED - Administration > Company > Company Admin > User Administration is out of scope for this graph by the 2026-08-31 decision, and the Authorized Approval Limits window is real and documented but is not a page to build...'
 dep.gworkflows.046 targetRef {page:'User Administration', field:'approver', resolved:false}, condition: '...is out of scope for this graph by the 2026-08-31 decision...'
merge-group.py re-resolves endpoints by exact page/field name; 'User Administration' != 'Authorized Approval Limits', so neither resolves when this page merges.
```

**why it matters:** After this run the graph will simultaneously contain page.authorized-approval-limits AND two edges asserting in prose that it is out of scope and not a page to build. That is a visible self-contradiction in a deliverable, and dep.gworkflows.060 is the exact edge (Feature Hierarchies.level triggers the link's visibility) that this page's own conditional-visibility dependency will restate — producing two edges for one relationship, one resolved and one not.

**proposed fix:** Do NOT edit the graph inside the build script. Add to the synth:dependencies prompt (see the synth-dependencies fix) an instruction to REPORT the mismatch, and handle it after the merge in bin/apply-corrections.py: repoint dep.gworkflows.060.targetRef to {page:'Authorized Approval Limits', field:<the emitted link/window field name>} and rewrite both conditions to drop the '2026-08-31 decision / not a page to build' clause, replacing it with 'Administration > Company > Company Admin > User Administration is not itself a page in this graph; the Authorized Approval Limits window reached from it IS (group Approval Authority, built 2026-09-01).' Run bin/validate-graph.py after.

> **refuter verdict:** refuted=False conf=high severity=low
> fix: Finding stands, scoped down to dep.gworkflows.060 only, and the fix mechanism must change.  1. dep.gworkflows.046 — LEAVE THE SCOPE CLAUSE ALONE. The general User Administration surface, its `approver` field and the employee import are still explicitly out of scope (build script line 109). Do not rewrite it as a reversed decision; that would make a true sentence false. At most, if touching it at all, tighten the phrasing to "the general User Administration page is not built in this graph" — optional, cosmetic.  2. dep.gworkflows.060 — PREFER DELETION OVER REPOINTING. Once the new build emits i
> REPRODUCED, mechanically, every load-bearing claim.
> 
> 1) The two nodes exist with the exact text quoted.
> `python3 -c "...json.load('output/kg-invoice-config.json')['nodes']['configDependencies']..."` prints both verbatim:
> - dep.gworkflows.060: type "triggers", sourceRef {page:'Feature Hierarchies', field:'level', resolved:true}, targetRef {page:'User Administration', field:'Authorized Approval Limits', resolved:false}, condition begins "FORWARD REFERENCE, EXPECTED TO STAY UNRESOLVED - Administration > Company > Company Admin > User Administration is out of scope for this graph by the 2026-08-31 decision, and the Authorized Approval Limits window is real and documented but is not a page to build."
> - dep.gworkflows.046: targetRef {page:'User Administration', field:'approver', resolved:false}, condition contains "...is out of scope for this graph by the 2026-08-31 decision."
> Not a paraphrase — byte-for-byte as the finding states.
> 
> 2) The non-resolution mechanic is real. bin/merge-group.py:219-234 rebuilds `index` as {(page_name.lower(), field_name.lower()): field_id} and re-derives BOTH endpoints from the textual ref on every merge ("ALWAYS re-derive endpoint ids from the textual ref", comment at :229-231). The build script emits `name: 'Authorized Approval Limits'` (2026-09-01_kg-authorized-approval-limits.mjs:107), and `python3` over configPages confirms no page named 'User Administration' exists among the 22 built pages. `'user administration' != 'authorized approval limits'` 

> **refuter verdict:** refuted=False conf=high severity=low
> fix: Keep the shape (report in-run, repair post-merge in bin/apply-corrections.py, never inside the build script), with three corrections: 1. Extend `repoint_endpoints` (bin/apply-corrections.py:204-231) to also write ref['page'], and widen the REPOINT_ENDPOINT table value to (page, field) applied to BOTH keys. Without this the correction is incoherent immediately and undone by the next merge (merge-group.py:224-232 re-resolves from text; Run B is queued). 2. Do not blanket-repoint dep.gworkflows.060 up front. After the merge, read the conditional-visibility edge this run emits (build script line 1
> OBSERVATION VERIFIED (python3 dump of output/kg-invoice-config.json, lines 17976 and 18271):
> - dep.gworkflows.046 targetRef {page:'User Administration', field:'approver', resolved:false}, condition contains "Administration > Company > Company Admin > User Administration is out of scope for this graph by the 2026-08-31 decision".
> - dep.gworkflows.060 targetRef {page:'User Administration', field:'Authorized Approval Limits', resolved:false}, condition contains "...out of scope for this graph by the 2026-08-31 decision, and the Authorized Approval Limits window is real and documented but is not a page to build."
> These are the ONLY two edges in the 436-edge set whose condition says "out of scope" (scripted scan). Of the 3 edges phrased "STAY UNRESOLVED", 0 are currently resolved — so no precedent of already-false scope prose exists; this run would create the first.
> 
> CONSEQUENCE CHAIN TRACED AND IT HOLDS:
> 1. Auto-resolution will NOT clear it. bin/merge-group.py:218-234 re-derives every endpoint from the TEXTUAL ref against index keyed (page.name.lower(), field.name.lower()) (built at :220-222). The new page is named 'Authorized Approval Limits' (build script line 107, `name: 'Authorized Approval Limits'`); no page named 'User Administration' exists today (verified, 22 pages) and none is created by this run. So both refs stay resolved:false and both false-scope conditions persist verbatim.
> 2. Nothing downstream catches it. bin/validate-graph.py:178-195 checks dependency dangling id

---

## [medium] PARTS points at a previous session's scratchpad, which still exists and already contains an empty aal-parts directory

**id:** `parts-foreign-scratchpad`  **auditor:** stale-content-audit / 2026-09-01_kg-authorized-approval-limits.mjs  **split-vote:** False

**where:** workflows/2026-09-01_kg-authorized-approval-limits.mjs:101

**evidence:**

```
:101 const PARTS = '/tmp/claude-1000/-mnt-c-Users-manci/bc53169c-7f0a-473a-a07f-cf6d37ca509c/scratchpad/aal-parts'
ls -la on that path → exists, empty, created Sep 1 04:49. ls -d /tmp/claude-1000/-mnt-c-Users-manci/*/scratchpad → nine sibling session dirs; bc53169c is not the current session.
```

**why it matters:** This is the one change the handoff DOES flag, and it is the least dangerous of the lot — but it is not benign: because the directory exists and is writable, the run will NOT fail fast. It will silently write ~12 artefacts (map-*.md, extract-*.json, roster-*.json, synth-*.json, critic-*.md) into a foreign session's scratchpad, and assemble-parts.py must then be pointed there too. If that session's scratchpad is reaped mid-run, the assemble step loses everything.

**proposed fix:** Set :101 to the current session's scratchpad, e.g. const PARTS = '<current-session-scratchpad>/aal-parts'. Verify with `ls -d /tmp/claude-1000/-mnt-c-Users-manci/*/scratchpad` and confirm the chosen dir matches the session actually running the workflow, then `mkdir -p` it before launch.

> **refuter verdict:** refuted=False conf=high severity=medium
> fix: As proposed, with three refinements:  1. Set :101 to the scratchpad of the session that will ACTUALLY launch the Workflow — not "the current session" as evaluated by any auditing subagent. Verify immediately before launch with `ls -d /tmp/claude-1000/-mnt-c-Users-manci/*/scratchpad` and match it against the launching session's own scratchpad path. Note that 7a585e6d (this audit session) already has an `aal-parts` directory of its own, so "an aal-parts dir exists here" is NOT evidence you picked the right one.  2. `mkdir -p` it before launch is good hygiene but is NOT what prevents silent mispl
> REPRODUCED — every literal claim in the finding holds, verified against the real files.
> 
> 1. The line and its content, exactly as stated.
> `grep -n "PARTS\|scratchpad\|/tmp/claude" workflows/2026-09-01_kg-authorized-approval-limits.mjs` →
>   `101:const PARTS = '/tmp/claude-1000/-mnt-c-Users-manci/bc53169c-7f0a-473a-a07f-cf6d37ca509c/scratchpad/aal-parts'`
> Line number 101 is correct (the handoff's own "line ~70" at docs/2026-09-01_HANDOFF-APPROVAL-AUTHORITY-AND-RUN-B.md:35 is the inaccurate one, not the finding).
> 
> 2. The path is inherited verbatim from Run A — mechanism confirmed, not just inferred.
> `grep -n "PARTS =" workflows/2026-08-31_kg-workflows-run-a.mjs` → `112:const PARTS = '/tmp/claude-1000/-mnt-c-Users-manci/bc53169c-7f0a-473a-a07f-cf6d37ca509c/scratchpad/wf-a-parts'` — same session UUID, only the leaf basename was edited (`wf-a-parts` → `aal-parts`). The parent's own header comment (:61) reads "PARTS - the current session's scratchpad path", i.e. the contract is explicitly "current session" and the adaptation broke it.
> 
> 3. The directory exists, is empty, is writable, and is foreign.
> `stat` → `.../bc53169c-.../scratchpad/aal-parts directory 4096 2026-09-01 04:49:44 mongoose drwxr-xr-x`; `ls -la` → empty (only . and ..). `touch`/`rm` probe → WRITABLE. `ls -d /tmp/claude-1000/-mnt-c-Users-manci/*/scratchpad` → nine sibling session dirs, exactly as the evidence says; bc53169c is not this session (this session is 7a585e6d-f82b-458a-aa77-3ab10457ee03). Caveat for the record

> **refuter verdict:** refuted=False conf=high severity=low
> fix: As proposed, with three specifics. (1) Edit line 101 (NOT ~70 — the handoff's line number is wrong) to const PARTS = '/tmp/claude-1000/-mnt-c-Users-manci/7a585e6d-f82b-458a-aa77-3ab10457ee03/scratchpad/aal-parts', i.e. the scratchpad of the session that will actually launch the workflow; re-verify with `ls -d /tmp/claude-1000/-mnt-c-Users-manci/*/scratchpad` at launch time if the run is deferred to a later session. (2) `mkdir -p` that path before launch — the script contains no mkdir. (3) After the run, pass that SAME literal string as argv[1] to bin/assemble-parts.py; do not retype a path. Le
> OBSERVATION CONFIRMED. `sed -n '101p'` on workflows/2026-09-01_kg-authorized-approval-limits.mjs returns exactly: const PARTS = '/tmp/claude-1000/-mnt-c-Users-manci/bc53169c-7f0a-473a-a07f-cf6d37ca509c/scratchpad/aal-parts'. `ls -d /tmp/claude-1000/-mnt-c-Users-manci/*/scratchpad` lists nine session dirs; the session running this audit (hence the parent agent) is 7a585e6d-f82b-458a-aa77-3ab10457ee03, not bc53169c. `ls -la` on the aal-parts path: exists, writable, 0 entries. PARTS is consumed at 21 further sites (658, 717, 893, 1039, 1219, 1291, 1335-6, 1374, 1430-3, 1486, 1536, 1549-61), so every artefact path in the run derives from :101. The Run A parent hard-codes the same session at :112 (wf-a-parts) — inherited literal, not an intentional choice.
> 
> CONSEQUENCE IS SMALLER THAN CLAIMED. I attacked all four harm paths:
> (1) Wrong node in the graph: NO path. PARTS never touches field content, ids, quotes, group label or gtag — only file locations. The boundary judgement, the Workflows collision and scope are unaffected.
> (2) Operator points assemble-parts at a different dir than the agents wrote to: LOUDLY GUARDED. bin/assemble-parts.py takes <parts-dir> as argv[1] (:487-497). I ran it against an empty dir: it printed `no roster-*.json in <dir>`, exited 1, wrote no out.json. So a mismatch cannot silently produce an empty group that merge-group.py then commits under a NEW label. That kills the scariest version of this finding.
> (3) Stale-artefact contamination from the aborted la

---

## [medium] assemble-parts' VALUE-SET-ID-COLLISION detector and merge-group's id minter disagree, and even a DETECTED collision is non-fatal — duplicate node ids reach the graph and no validator checks for them

**id:** `vset-id-collision-drift`  **auditor:** toolchain-code-path-audit  **split-vote:** False

**where:** bin/assemble-parts.py:409-415 and :479-482 (FATAL list) vs bin/merge-group.py:36-38 (slug) and :157 (vset id); bin/validate-graph.py:51-236 (no duplicate-id invariant anywhere)

**evidence:**

```
Two independent halves.
(a) DRIFT. assemble's key at :411 is `re.sub(r'[^a-z0-9]+','-',str(v['appliesToField']).lower()).strip('-')` with NO `[:60]`; merge's `slug()` at :36-38 ends `[:60]`. Two fields diverging only after 60 slug-chars are 'distinct' to the detector and identical to the minter:
  assemble sees them as distinct?  True
  merge mints identical ids?       True
    vset.gapproval-authority.approval-limit-for-the-authorized-approver-at-this-hierarchy.documented-option-list  (x2)
(b) EVEN WHEN DETECTED, NON-FATAL. VALUE-SET-ID-COLLISION is absent from the FATAL tuple at :479-482. Sandbox run with two orphanCandidates sharing an `enumerates` string:
  PRE-MERGE PROBLEMS: 1   VALUE-SET-ID-COLLISION   ASM_EXIT=0
  merge -> DUPLICATE IDS IN GRAPH: {'vset.gapproval-authority.unnamed.the-three-surfaces-on-which-an-approver-amount-can-be-set': 2}
  validate-graph -> "ERROR: none"  VAL_EXIT=0
Confirmed the live graph has no duplicate ids today, so this would be a first.
```

**why it matters:** Both reachable inputs are things this run is specifically told to produce. Orphan candidates all get `appliesToField` '' -> slug 'unnamed' (merge-group.py:157), so their ids are distinguished ONLY by the 60-char-truncated `enumerates` text — and this run's most likely orphan is the three-setter sentence from configuration-8b3be88b.md, which any two framings of will share far more than 60 leading characters. Separately, assemble-parts.py:248-250 hard-codes an identical 100+ character context prefix onto EVERY materialised validValuesAddition, so two additions on one field always collide after truncation. A duplicate id silently shadows one node for any id-keyed consumer, and apply-corrections.py is entirely id-keyed.

**proposed fix:** Three edits. (1) In bin/assemble-parts.py add merge-group's slug to the collision key — replace lines 411-412 with:
```
        k = (slug(str(v['appliesToField'])), slug(str(v['context'])))
```
(`slug` is already defined at :131-138 and is byte-identical to merge-group's.) (2) Add `'VALUE-SET-ID-COLLISION'` to the FATAL tuple at :479-482. (3) In bin/validate-graph.py, after line 59, add a graph-wide invariant:
```
    for coll, arr in n.items():
        for i, c in Counter(x['id'] for x in arr).items():
            if c > 1:
                errors.append(('duplicate-node-id', i, '%s x%d' % (coll, c)))
```

> **refuter verdict:** refuted=False conf=high severity=medium
> fix: As proposed — all three edits verified working with no regression against the live graph. Two small refinements:  (1) The replacement at bin/assemble-parts.py:411-412 is correct as written; `slug` at :131-138 is byte-identical to merge-group's and already in scope. Note it changes the empty-context fallback from 'x' to 'unnamed', which is what actually mirrors merge-group.py:157 — that is the point, not a side effect.  (2) In the FATAL tuple at :479-482, position is irrelevant; `'VALUE-SET-ID-COLLISION',` anywhere in the tuple works.  (3) The validate-graph.py insertion point is right (line 58
> Every claim reproduces. I worked on a full copy of bin/ + output/ in the scratchpad; the real project is byte-identical afterward (md5sums unchanged, `bin/validate-graph.py` still "ERROR: none", exit 0).
> 
> LOCATIONS CONFIRMED EXACT. `grep -n` on bin/assemble-parts.py: `seen_vs = {}` at 409, the key at 411-412, `VALUE-SET-ID-COLLISION` appended at 414, `FATAL = (` at 479. bin/merge-group.py: `def slug` at 36, vset id mint at 157. bin/validate-graph.py: only three "duplicate" hits — `duplicate-field-name` (91-98, per-page field NAMES) and `contradiction-duplicate-reading` (151). No node-id invariant anywhere. All line numbers in "where" are correct.
> 
> (a) DRIFT — REPRODUCED VERBATIM. Running the two key functions verbatim against two fields differing only after 60 slug-chars:
>   assemble keys distinct?  True
>   merge ids identical?     True
>   vset.gapproval-authority.approval-limit-for-the-authorized-approver-at-this-hierarchy.documented-option-list (x2)
> That is character-for-character the id the finding quotes. Cause confirmed: assemble truncates only the CONTEXT half (`[:60]` at 412); the field half has no cap, while merge's slug caps both. Not hypothetical — 9 field names already in the built graph hit the 60-char slug cap (e.g. "Display the Add New Attendees button from the attendee table").
> 
> (b) NON-FATAL — REPRODUCED END-TO-END. FATAL at 479-482 lists QUOTE-NOT-VERBATIM, MISSING-SOURCE-FILE, DUPLICATE-FIELD-NAME, EMPTY-FIELD-NAME, three CONTRADICTION-*, three RANGE-*. No VALU

> **refuter verdict:** refuted=False conf=high severity=medium
> fix: Keep the finding's edits (1) and (3); REPLACE edit (2), which over-corrects.  (1) KEEP — `bin/assemble-parts.py:411-412` → `k = (slug(str(v['appliesToField'])), slug(str(v['context'])))`. Correct and minimal; `slug` is defined at `:131-138` and is byte-identical to merge's. Only behavioural delta is the empty-sentinel ('x' → 'unnamed'), which is an internal detector key and harmless. Note this is hygiene, not this-run risk (see reasoning (a)).  (2) REPLACE — do NOT add `'VALUE-SET-ID-COLLISION'` to the FATAL tuple at `:479-482`. That hard-stops the run with no defined remediation: the only way
> Both mechanical halves reproduce, the no-guard claim is confirmed, and reachability for THIS run is supported by a real near-miss in the built graph — but two of the finding's consequence claims are overstated and proposed fix (2) is an over-correction.
> 
> WHAT I CONFIRMED
> 
> 1. The drift is real. Ran assemble's key (`bin/assemble-parts.py:411-412`, no `[:60]` on the field component) against merge's `slug()` (`bin/merge-group.py:36-38`, `[:60]`) on two 68-char field names differing only at char 67: `assemble sees distinct? True` / `merge mints same id? True`. The detector is strictly more permissive than the minter.
> 
> 2. Non-fatal is real. `VALUE-SET-ID-COLLISION` is raised at `bin/assemble-parts.py:414` and is absent from the FATAL tuple at `:479-482` (read it — 11 kinds, none of them this one). `return 1 if any(k in FATAL ...)` at `:483` therefore returns 0.
> 
> 3. No downstream guard. I wrote the duplicate-id scan the finding says is missing and ran it over the live graph — it is genuinely absent from `bin/validate-graph.py`. Grepped every `errors.append` in `:51-236`: there is a `duplicate-field-name` check at `:91-98` (per-page, name-keyed) and dangling-owner checks, but no `id`-keyed uniqueness invariant on any of the 7 collections. Live graph is clean today (configFields 607, configValueSets 114, all collections 0 dupes), so this would be the first.
> 
> 4. Reachability for this run is NOT speculative. The orphan path is the live one: orphans get `appliesToField ''` → both key hal

---

## [medium] A validValuesAddition naming a field this run's roster does not carry is silently DISCARDED, while the equivalent orphanCandidate is deliberately preserved

**id:** `valuevaddition-silently-discarded`  **auditor:** toolchain-code-path-audit  **split-vote:** True

**where:** bin/assemble-parts.py:239-243

**evidence:**

```
```
    for a in (vs_doc.get('validValuesAdditions') or []):
        key = (str(a.get('page','')).strip().lower(), str(a.get('field','')).strip().lower())
        if key not in by_page_field:
            problems.append(('VALUE-ADDITION-UNKNOWN-FIELD', a.get('page',''), a.get('field','')))
            continue
```
The `continue` drops the enumeration entirely. VALUE-ADDITION-UNKNOWN-FIELD is not in the FATAL tuple at :479-482, so the run exits 0 and the values are gone. Contrast :266-279, where orphanCandidates are explicitly routed into knownGap value sets with the comment at :260-265: "They still MUST reach the graph. 'Unwired' and 'deleted' are different answers, and dropping them here would repeat Rule 2's failure one stage later." The same reasoning was never applied to additions. Verified the happy path works: a well-keyed addition materialised correctly (`note: 1 validValuesAdditions materialised as unconditional value sets`).
```

**why it matters:** This run's whole job is boundary arbitration between its own controls and four identically-labelled Workflows siblings. The single most likely synthesiser slip is writing an addition against the sibling's page/label ('Workflows' / 'Approval Limit') or against a label the roster records under a different name — and the corpus enumeration then evaporates with a one-line non-fatal notice, in a run whose expected output is only ~7 fields so there is very little else on screen to make the loss conspicuous.

**proposed fix:** In bin/assemble-parts.py replace the `continue` at line 243 with a knownGap landing, mirroring the orphan path:
```
            value_sets.append({
                'appliesToPage': '', 'appliesToField': '', 'contextField': '',
                'context': 'Addition offered for %s / %s, which is not in this run\'s roster.'
                           % (a.get('page',''), a.get('field','')),
                'values': list(a.get('values') or []),
                'sourceQuote': a.get('sourceQuote') or '',
                'sourceFile': (a.get('sourceFile') or '').lstrip('./'),
                'knownGap': True,
                'notes': 'ACCEPTED GAP - validValuesAddition named an unknown field; recorded '
                         'unwired rather than discarded. WHY: ' + (a.get('why') or ''),
            })
            continue
```

> **refuter verdict:** refuted=False conf=high severity=medium
> fix: As proposed, with two small additions.  1) Apply the proposed knownGap landing in place of the `continue` at bin/assemble-parts.py:243, keeping the `problems.append` at :242 intact.  2) Add a summary note so the landing is visible in the run output, mirroring :280-283 — otherwise these sets appear only in the problems block and in valueSetsKnownGap, with no line saying what happened to them. Track a counter alongside `added` (e.g. `gapped`) and after :259 emit:     if gapped:         notes.append('%d validValuesAdditions named an unknown field and landed as knownGap value sets - recorded, unwi
> REPRODUCED END TO END. Every claim in the finding survives, and I found one piece of supporting evidence the auditor missed that strengthens it.
> 
> 1) The code exists verbatim at the stated location. `awk 'NR>=236 && NR<=248' bin/assemble-parts.py` prints exactly the quoted block: loop at :239, key at :240, `if key not in by_page_field:` at :241, `problems.append(('VALUE-ADDITION-UNKNOWN-FIELD', ...))` at :242, `continue` at :243. Line numbers in the finding ("239-243") are exact.
> 
> 2) The contrast is exact. `grep -n` confirms the orphan comment runs :260-265 ("They still MUST reach the graph. 'Unwired' and 'deleted' are different answers...") and the orphan preservation loop runs :266-279 with `'knownGap': True` at :276. Exactly as cited.
> 
> 3) VALUE-ADDITION-UNKNOWN-FIELD is not FATAL. `FATAL = (...)` at :479-482 contains QUOTE-NOT-VERBATIM, MISSING-SOURCE-FILE, DUPLICATE-FIELD-NAME, EMPTY-FIELD-NAME, three CONTRADICTION-* and three RANGE-*. No VALUE-ADDITION-*. `grep -rn "VALUE-ADDITION"` across the whole repo returns exactly ONE hit — :242 — so nothing downstream re-checks it either.
> 
> 4) I ran it, rather than reasoning about it. Built a synthetic parts dir with a one-field roster ("Authorized Approval Limits" / approval_limit) and a validValuesAddition keyed to page "Workflows" / field "authorized_approver_approval_limit" — the precise slip the finding predicts. Result:
>    PRE-MERGE PROBLEMS: 1 / VALUE-ADDITION-UNKNOWN-FIELD  Workflows  authorized_approver_approval_limit
>    EX

> **refuter verdict:** refuted=True conf=high severity=low
> fix: Do NOT apply the proposed fix — it converts a printed, recoverable, one-line key error into a permanently unresolved knownGap value set in the graph, and merge-group.py:154 could otherwise have resolved a cross-group owner through the whole-graph index at merge-group.py:87-89.  Nothing needs to change in bin/assemble-parts.py for this run. If someone wants the latent hygiene item closed later (outside this build, since the FATAL tuple and problem kinds are shared toolchain), the correct one-token change is at assemble-parts.py:241: gate on `known_refs` instead of `by_page_field`, matching the 
> OBSERVATION GRANTED AND VERIFIED. `sed -n '236,245p' bin/assemble-parts.py` confirms the code exactly: the loop is at :239, the `problems.append` at :242, the bare `continue` at :243. `sed -n '460,500p'` confirms VALUE-ADDITION-UNKNOWN-FIELD is absent from the FATAL tuple at :479-482, so the run exits 0. The orphan contrast at :266-279 and its comment at :260-265 are as quoted. The code reading is correct.
> 
> THE CONSEQUENCE FAILS ON FOUR INDEPENDENT CHECKS.
> 
> 1. BASE RATE IS ZERO, ACROSS THE WHOLE PROJECT. `python3 -c` over output/kg-invoice-config.json: 114 configValueSets across 22 pages, and `sum('Materialised' in (v.get('notes') or '') for v in vs)` == 0; `grep -rn "Materialised from validValuesAdditions" output/` returns nothing. In 22 pages the synthesiser has never emitted a single validValuesAddition. This run is ~7 fields of currency amounts, integer levels and a yes/no checkbox — the class of control least likely to carry an enumeration at all. The finding's premise requires the synthesiser to (a) emit an addition for the first time in project history AND (b) mis-key it.
> 
> 2. IT IS NOT SILENT, AND THE SMALL RUN CUTS THE OTHER WAY. assemble-parts.py:471-478 prints `PRE-MERGE PROBLEMS: N`, a Counter by kind, and then an itemised line per problem: `VALUE-ADDITION-UNKNOWN-FIELD  <page>  <field>` — the exact two strings needed to fix it. The finding argues a ~7-field run leaves "very little else on screen to make the loss conspicuous"; a three-line named problem block in a 

---

## [medium] The unlimited-approval recipe is stated DIFFERENTLY on the two surfaces; the brief presents null=unlimited as one uniform rule

**id:** `unlimited-recipe-differs-by-surface`  **auditor:** Independent corpus recon — Authorized Approval Limits / group "Approval Authority"  **split-vote:** True

**where:** script:109 ("### VALUE SEMANTICS ... a NULL/blank amount means UNLIMITED")

**evidence:**

```
Workflows surface — authorized-approver-list-a9522ec8.md:87: "If they are to have unlimited approval, set to no approval limit currency, and leave the approval limit amount blank." (TWO actions: currency set to a sentinel AND amount blank)
This window — user-administration-8b167b96.md:48: "For an unlimited approval amount, leave blank (null)." (ONE action; currency not mentioned)
Surface-agnostic — setting-an-unlimited-approval-amount-9d98b489.md: "When configuring the approver, a limit amount of null will result in an unlimited approval/no limit approval amount." (ONE action)
Zero semantics, by contrast, ARE consistent across all three: fcfd570c:47 "You can enter 0 in the Manager Approval Limit field.", fcfd570c:75 "You can enter 0 in the Amount field.", 8b167b96:48 "...enter zero (0).", a9522ec8:91 "You can enter 0 in the Approval Limit field."
cmd: grep -F -c on each -> 1
```

**why it matters:** The brief correctly flags that treating blank as "unset" rather than "unlimited" configures the opposite of intent — but then flattens a real divergence. The Workflows recipe carries a currency step this window's does not state. A driver that only blanks the amount here may or may not achieve unlimited; the corpus does not say. Emitting a single uniform rule asserts knowledge the documentation does not contain.

**proposed fix:** Extend the VALUE SEMANTICS block in script:109: 'THE UNLIMITED RECIPE IS NOT THE SAME ON BOTH SURFACES. Workflows/a9522ec8 requires TWO acts: "set to no approval limit currency, and leave the approval limit amount blank". This window/8b167b96 states ONE: "For an unlimited approval amount, leave blank (null)." - the currency step is NOT mentioned. 9d98b489 is surface-agnostic and also states one act. Whether the currency must also be cleared HERE is UNDETERMINED by the documentation - say so explicitly rather than importing the Workflows recipe. The ZERO semantics, by contrast, ARE uniform across all four attestations and can be stated flatly.'

> **refuter verdict:** refuted=False conf=high severity=medium
> fix: Adopt the proposed fix, with two additions and the corrected corpus line cites. Extend the VALUE SEMANTICS block at script:109 to read (substance, not necessarily exact wording):  "THE UNLIMITED RECIPE IS NOT THE SAME ON BOTH SURFACES, AND THIS PAGE'S OWN PRIMARY DOES NOT STATE IT AT ALL. Workflows/authorized-approver-list-a9522ec8.md:102 requires TWO acts: 'set to no approval limit currency, and leave the approval limit amount blank'. THIS window/user-administration-8b167b96.md:48 states ONE: 'For an unlimited approval amount, leave blank (null).' - the currency step is NOT mentioned. setting
> REPRODUCED THE OBSERVATION — all of it, and it is stronger than the finding states.
> 
> 1. The offending brief text exists exactly where claimed.
> `grep -n "VALUE SEMANTICS" 2026-09-01_kg-authorized-approval-limits.mjs` -> line 109 (the whole `seeds` string is one long line). Verbatim at 109: `### VALUE SEMANTICS, DOCUMENTED AND UNUSUAL - capture both, they are not the same claim: 0 means the approver is in the chain but has NO final authority; a NULL/blank amount means UNLIMITED (setting-an-unlimited-approval-amount-9d98b489.md).` Bare semantic rule, no surface qualifier, cited to the surface-agnostic file. Confirmed.
> 
> 2. The three unlimited attestations exist verbatim, but two of the finding's corpus line numbers are WRONG (text right, cite wrong):
> - a9522ec8 is line **102**, not 87: "If they are to have unlimited approval, set to no approval limit currency, and leave the approval limit amount blank." TWO acts. Confirmed.
> - 8b167b96:**48** (exact): "For an unlimited approval amount, leave blank (null)." ONE act, currency unmentioned. Confirmed.
> - 9d98b489:23 (full file is 23 lines): "When configuring the approver, a limit amount of null will result in an unlimited approval/no limit approval amount." Names no window. Confirmed surface-agnostic.
> 
> 3. Zero semantics reproduce and ARE uniform, as claimed. fcfd570c:47 and :75 exact; 8b167b96:48 exact; a9522ec8 is line **106**, not 91. All four say the same thing: in the chain, no final authority, Limit Approved unchanged. The propose

> **refuter verdict:** refuted=True conf=high severity=not-a-defect
> fix: No change to script:109. Do NOT apply the proposed VALUE SEMANTICS extension — asserting "UNDETERMINED" contradicts user-administration-8b167b96.md:48, which does give this window's unlimited instruction, and it invites a false contradiction node citing a Workflows-only file (authorized-approver-list-a9522ec8.md, the sole corpus file containing "no approval limit") against this page.  If the team wants belt-and-braces at zero risk, the only defensible edit is a single scoping clause appended to the existing VALUE SEMANTICS sentence, framed as a fence rather than a hedge — e.g. "; the phrase 'n
> Every textual claim in the finding is TRUE; the consequence claim is not, and the proposed fix would inject a false hedge.
> 
> VERIFIED TEXT (all commands run against the frozen corpus):
> - a9522ec8:102 (grep -n -i "unlimited" authorized-approver-list-a9522ec8.md): "If they are to have unlimited approval, set to no approval limit currency, and leave the approval limit amount blank." -> two acts. Confirmed.
> - 8b167b96:48 (cat -n user-administration-8b167b96.md): "For an unlimited approval amount, leave blank (null)." -> one act. Confirmed.
> - 9d98b489:23: "a limit amount of null will result in an unlimited approval/no limit approval amount." Confirmed surface-agnostic.
> - Zero semantics uniform across fcfd570c:47, fcfd570c:75, 8b167b96:48, a9522ec8:105. Confirmed.
> 
> WHY THE CONSEQUENCE FAILS:
> 
> 1. The brief does not make the assertion the finding attributes to it. script:109 reads verbatim: "a NULL/blank amount means UNLIMITED (setting-an-unlimited-approval-amount-9d98b489.md)". `awk 'NR==109' | grep -o "VALUE SEMANTICS.*intended\."` shows the sentence mentions currency ZERO times (the single "currency" hit on line 109 is elsewhere, in the recon field roster "Approval Limit Currency"). The brief makes a claim about the AMOUNT value only and is silent on currency — which is exactly the scope the finding says it should have. There is no "uniform rule" and no imported Workflows recipe to flatten.
> 
> 2. The brief's claim is independently attested by THIS window's own procedure. 8b167b96:48 

---

## [medium] Three verbatim traps in the primaries will fail grep -F verification if an agent retypes rather than copies: a corpus typo, a curly apostrophe, and em dashes

**id:** `quote-traps-typo-curly-emdash`  **auditor:** Independent corpus recon — Authorized Approval Limits / group "Approval Authority"  **split-vote:** True

**where:** script:109 and script:207 (the grep -F verification instruction)

**evidence:**

```
(1) TYPO in the corpus — user-administration-8b167b96.md:29 reads "needs to have at least on level" (missing 'e').
  grep -F -c 'needs to have at least on level'  -> 1
  grep -F -c 'needs to have at least one level' -> 0
(2) CURLY APOSTROPHE U+2019 in the same sentence:
  grep -F -c "the company's Authorized Approver hierarchy needs" (ASCII) -> 0
  grep -F -c "the company’s Authorized Approver hierarchy needs" (curly) -> 1
  Meanwhile fcfd570c uses the ASCII apostrophe: grep -F -c "the company's Authorized Approver hierarchy has at least one level" -> 1. The two primaries DIFFER in apostrophe encoding.
(3) EM DASH U+2014 in the precedence rule — user-administration-8b167b96.md:54:
  grep -F -c 'If you complete both areas in this window—the Approval Limit area and the Level field—Concur Invoice will use the one that applies to your configuration and ignore the other.' -> 1
  same sentence with ASCII hyphens -> 0
```

**why it matters:** The brief calls the precedence rule "the single most valuable thing on the page for a config writer - capture it verbatim". That exact sentence contains two em dashes, and the conditional-visibility sentence the run depends on contains both a corpus typo and a curly apostrophe. Any of the three retyped in the natural way produces a sourceQuote that fails validation — and the failure appears at the very end of the pipeline, on the highest-value fields.

**proposed fix:** Add to script:109: 'VERBATIM TRAPS IN THE TWO PRIMARIES - COPY BYTES, NEVER RETYPE. (a) 8b167b96:29 contains a CORPUS TYPO: "needs to have at least on level" (missing e). The correct-English form returns 0. (b) 8b167b96 uses the CURLY apostrophe U+2019 ("the company’s") while fcfd570c uses ASCII - the two primaries differ, so never carry an apostrophe across files. (c) The precedence rule at 8b167b96:54 contains TWO EM DASHES (U+2014): "defines the type—either limit or level" and "in this window—the Approval Limit area and the Level field—Concur Invoice". ASCII hyphens return 0. Extract every sourceQuote with sed/awk from the file itself, then confirm with grep -F -c before writing it.'

> **refuter verdict:** refuted=False conf=high severity=low
> fix: Do NOT apply the proposed three-part paragraph. Two thirds of it is false and it targets the wrong line (109 is already a ~4,600-char seeds blob; the script has a dedicated "TEXT TRAPS IN THIS CORPUS" block at lines 231-245 that already carries a "SAP TYPO:" line — that is the right home, and it is in PREAMBLE so every phase sees it).  Add ONE line immediately after script:245, matching the existing idiom:    '  SAP TYPO: user-administration-8b167b96.md:29 writes "at least on level" for "at least one level" -',   '  it is in the conditional-visibility sentence this page depends on. The correct
> REPRODUCTION OF THE OBSERVATIONS — all three text facts are real, at the exact stated lines.
> 
> Corpus files resolve to concur-invoice-professional-edition-admin-guides/. Against user-administration-8b167b96.md:
> (1) `grep -F -c 'needs to have at least on level'` -> 1 ; `'...at least one level'` -> 0. sed -n '29p' confirms line 29 reads "...needs to have at least on level (in addition to Global)."
> (2) `grep -F -c "the company's ... hierarchy needs"` (ASCII) -> 0 ; curly -> 1. In user-administrator-fcfd570c.md the ASCII form "the company's Authorized Approver hierarchy has at least one level" -> 1, curly -> 0. The two primaries do differ. Codepoint dump of line 29 confirms U+2019.
> (3) sed -n '54p' confirms the precedence sentence; em-dash form -> 1, ASCII-hyphen form -> 0. Codepoint dump of line 54 confirms three x U+2014.
> 
> SCRIPT LOCATIONS — both cited lines exist. Line 109 is the `seeds:` string; line 207 is `'    grep -F -c "<the exact quote>" "' + CORPUS + '/<sourceFile>"'`. A grep for `curly|apostrophe|em dash|retype|typo|U+2019|U+2014` over the whole script returns only line 245 ("SAP TYPO: configure-purchase-orders-8128725e.md writes 'line time fields'") and line 1093 ("ASSEMBLE PROGRAMMATICALLY, DO NOT RETYPE", which is about pulling records out of part JSON, not about quote glyphs). So no existing guard covers any of these three.
> 
> THE INFERENCE IS WHERE IT BREAKS. The finding's whyItMatters claims each trap "produces a sourceQuote that fails validation — and the failure 

> **refuter verdict:** refuted=True conf=high severity=low
> fix: Drop parts (b) and (c) entirely — the curly apostrophe and the em dash are folded by norm() in BOTH assemble-parts.py and validate-graph.py and cannot fail any gate. Add only one clause to the existing seeds string at script:109, next to the anchor quotes already there: 'CORPUS TYPO — user-administration-8b167b96.md:29 reads "needs to have at least on level" (missing e). Do not correct it; a quote is copied, never improved. The clean-English attestation of the same rule is the fcfd570c anchor already given above — prefer it.' If any dash guidance is kept at all, the accurate form is the one th
> OBSERVATIONS: all three confirmed byte-for-byte. `sed -n '29p'` on user-administration-8b167b96.md returns "the company’s Authorized Approver hierarchy needs to have at least on level" — curly U+2019 and the missing 'e'. `grep -F -c 'needs to have at least on level'` -> 1; `'...at least one level'` -> 0. `sed -n '54p'` returns two U+2014 em dashes; `grep -F -c` on the ASCII-hyphen form -> 0. fcfd570c does use ASCII `'`. All the auditor's greps reproduce.
> 
> THE DIAGNOSIS IS WRONG. Nothing in this pipeline gates on bare `grep -F`. Both machine gates use the SAME normalizer: bin/validate-graph.py:21-29 and bin/assemble-parts.py:37-43 define identical DASHES = {…'—':'-'…} and QUOTES = {…'’':"'"…} maps, NFKC-normalize, fold NBSP, collapse `\s+`, lowercase, then substring-test (validate-graph.py:74 `if norm(q) in low`; assemble-parts.py:343). The file's own comment: "Unicode dashes/quotes are folded because the corpus mixes them… tests the CLAIM rather than the transcription."
> 
> I ran the real norm() from validate-graph.py against 8b167b96:
>   PASS  "the company's Authorized Approver hierarchy needs to have at least on level"  (ASCII apostrophe retype)
>   PASS  "…in this window-the Approval Limit area and the Level field-Concur Invoice…"  (ASCII hyphens for em dash)
>   FAIL  "defines the type - either limit or level"                                      (SPACED hyphen)
>   FAIL  "…needs to have at least one level"                                             (typo corrected)
> 
> Trap (2) the 

---

## [medium] The section name drifts three ways and NEITHER primary uses the corpus-majority form; the brief hardcodes the rarest variant

**id:** `section-label-three-way-drift`  **auditor:** Independent corpus recon — Authorized Approval Limits / group "Approval Authority"  **split-vote:** True

**where:** script:109 ("the \"Authorized Approval Limits\" link in the \"Expense and Invoices Setting section\"")

**evidence:**

```
grep -rF -c per exact form across admin-guides:
  "Expense and Invoices Setting section"  -> user-administrator-fcfd570c.md only (2 hits, 1 file)
  "Expense and Invoices Settings section" -> user-administration-8b167b96.md only (2 hits, 1 file)
  "Expense and Invoice Settings"          -> 4 FILES: assigning-the-approver-for-the-purchase-request-user-20294611.md, fields-overview-5e3daf7c.md, set-a-default-shipping-and-billing-address-f772bed1.md, user-administration-8b167b96.md
The third form is confirmed to name the SAME section: fields-overview-5e3daf7c.md:36 "Employee Fields: Used by the Expense and Invoice Settings section of the User Details page."; f772bed1.md:59 "...scroll to Expense and Invoice Settings."
```

**why it matters:** The brief pins the label to the form attested by exactly one file, while the corpus-majority form ("Expense and Invoice Settings", 4 files, singular Invoice + plural Settings) is a variant neither primary uses in its procedure text. This is the same singular/plural drift class the Run A parent handled by recording rather than reconciling; here it is being silently reconciled to the rarest reading, and the section label is what a driver searches the page for.

**proposed fix:** Add to script:109: 'THE SECTION LABEL DRIFTS THREE WAYS - RECORD, DO NOT RECONCILE. "Expense and Invoices Setting section" (fcfd570c, 1 file); "Expense and Invoices Settings section" (8b167b96, 1 file); "Expense and Invoice Settings" (4 files incl. fields-overview-5e3daf7c.md and set-a-default-shipping-and-billing-address-f772bed1.md, and confirmed to name the same section of the User Details page). Emit the branch-attached form as primary and the other two as aliases, with the count behind each.'

> **refuter verdict:** refuted=False conf=high severity=medium
> fix: As proposed in shape (additive text appended to the seeds string at script:109), with three corrections:  (a) Use 6 files, not 4, for the majority form — the script orders a sweep of BOTH guide directories and tools-guides holds two more hits. (b) Name the intra-file drift: user-administration-8b167b96.md uses BOTH form C (line 21, summary) and form B (lines 23, 33, procedure). (c) Route it to the real slot — navPathAlternates — and reconcile with the existing majority-form instruction at script:638.  Suggested text to append at script:109:  "### THE SECTION LABEL DRIFTS THREE WAYS - RECORD, D
> REPRODUCED IN FULL; the finding is if anything understated.
> 
> 1) The offending text exists exactly where claimed. `grep -n "Expense and Invoice" .../2026-09-01_kg-authorized-approval-limits.mjs` returns ONLY line 109 (the `seeds` string). Line 109 contains form A twice: once as the brief's own narration ("then the \"Authorized Approval Limits\" link in the \"Expense and Invoices Setting section\"") and once inside the verbatim anchor quote. Confirmed by `sed -n '95,125p'`.
> 
> 2) The three-way count reproduces. Run from the corpus root, `grep -rF -c <form> . | grep -v ':0'`:
>  - "Expense and Invoices Setting section"  -> admin-guides/user-administrator-fcfd570c.md:2 (1 file)
>  - "Expense and Invoices Settings section" -> admin-guides/user-administration-8b167b96.md:2 (1 file)
>  - "Expense and Invoice Settings"          -> SIX files, not four: admin-guides/{assigning-the-approver-for-the-purchase-request-user-20294611, fields-overview-5e3daf7c, set-a-default-shipping-and-billing-address-f772bed1, user-administration-8b167b96} + tools-guides/{step-6-select-the-vendor-access-group-for-the-user-bb58ded2, step-4-add-the-custom-field-to-the-employee-form-da376eef}. The auditor scoped to admin-guides only; the script's own seeds text orders a sweep of BOTH guide directories, so 6 is the number that belongs in the fix.
> 
> 3) "Same section" claim holds. fields-overview-5e3daf7c.md:36 "Employee Fields: Used by the Expense and Invoice Settings section of the User Details page."; f772bed1.md:59 "

> **refuter verdict:** refuted=True conf=high severity=not-a-defect
> fix: No change to script:109. The drift is already handled: script:607-609 orders one navPathEvidence entry per distinct quote, and bin/merge-group.py:96-102 records every non-winning form in navPathAlternates (demonstrated in the built graph by page.tax-administration's "Expense Type Groups tab" / "Expense Types Group tab" pair). Do NOT add the proposed census: its "4 files" count is directory-restricted and wrong (6 across both guide dirs), and it would direct the run to emit nav aliases quoted from fields-overview-5e3daf7c.md and set-a-default-shipping-and-billing-address-f772bed1.md, neither of
> GRANTED: three surface forms exist. `grep -rlF` from the corpus root confirms "Expense and Invoices Setting section" -> fcfd570c only; "Expense and Invoices Settings section" -> 8b167b96 only; "Expense and Invoice Settings" -> 6 files. The finding's observation is real. Everything built on it is not.
> 
> (1) TWO OF THE FINDING'S FACTUAL LEGS ARE WRONG. "NEITHER primary uses the corpus-majority form" is false: `grep -n -i "Expense and Invoice" .../user-administration-8b167b96.md` returns line 21 "...for cost object approvers in Expense and Invoice Settings..." — a primary does use it. And the census is directory-restricted: admin-guides alone gives 4 files, but both guide dirs give 6 (adds tools-guides/step-4-...-da376eef.md and step-6-...-bb58ded2.md). The proposed fix would hardcode "4 files" into a prompt whose own lens charters order a sweep of BOTH directories — injecting a wrong number into a prompt whose entire discipline is verbatim accuracy.
> 
> (2) "CORPUS-MAJORITY" IS THE WRONG POPULATION. `grep -c -i "Authorized Approval Limits\|Authorized Approver"` returns 0 on ALL of 20294611, 5e3daf7c, f772bed1, da376eef, bb58ded2. Not one majority-form file mentions this page. They name that section while documenting other controls (shipping address, purchase-request approvers, employee fields, vendor access group). Restricted to the two files that actually document the Authorized Approval Limits link, exactly two forms are attested, one per documented trigger branch: fcfd570c:51 (A

---

## [medium] Two of the five seeds contain ZERO controls for this page and both point at fields already homed on Workflows

**id:** `zero-field-seeds-mishoming-risk`  **auditor:** Independent corpus recon — Authorized Approval Limits / group "Approval Authority"  **split-vote:** True

**where:** script:109 (seeds list) and the Workflows-consumption note about procedure-2d20b513.md

**evidence:**

```
procedure-2d20b513.md (1,554 B): full read shows exactly three controls, all on Workflows > Authorized Approvers > Configuration tab — "Authorized Approver feature is available for workflows", "Minimum Exception Level", "Maximum Exception Level". All three are already in the built graph as field.workflows.authorized-approver-feature-available-for-workflows / minimum-exception-level / maximum-exception-level. It contains NOTHING else.

definition-of-amount-for-limit-approval-06806875.md (2,038 B): a pure semantics topic defining what "amount" means. Its only control reference is :14 "be sure to select the Restrict approvers to those with limit authority check box when defining the workflow step" — already homed TWICE on Workflows as field.workflows.step-restrict-approvers-limit-authority-checkbox and field.workflows.restrict-approvers-limit-authority-employee-added-steps.
cmd: python3 over output/kg-invoice-config.json filtering label contains 'limit authority' -> 2 hits
```

**why it matters:** Both files are seeded at equal weight with the primaries, and both dangle an already-owned Workflows control in front of a lens agent whose instructions are to find controls. The most likely defect is a third copy of "Restrict approvers to those with limit authority" landing on this page. procedure-2d20b513 is genuinely useful — but as the DEPENDENCY source (it is where the gating feature is switched on), not as a field source.

**proposed fix:** Add to script:109: 'TWO SEEDS ARE ZERO-FIELD - USE THEM ONLY AS NAMED. procedure-2d20b513.md carries exactly three controls and ALL THREE are already built on Workflows (Authorized Approver feature is available for workflows / Minimum Exception Level / Maximum Exception Level). It is the DEPENDENCY source for this page (the feature gate) and yields ZERO fields - verdict already established, do not re-derive. definition-of-amount-for-limit-approval-06806875.md is a SEMANTICS topic defining "amount"; it yields ZERO fields and its only control reference, "Restrict approvers to those with limit authority", is ALREADY HOMED TWICE on Workflows - emitting it here would be a third copy. Cite both for notes and dependencies, never as sourceFile for a new field.'

> **refuter verdict:** refuted=False conf=high severity=low
> fix: Apply a corrected version — do NOT paste the proposed text, which mis-states the seed list.  Append to the seeds string at script:109, right after the five-file list:  '### ONE SEED IS ZERO-FIELD, AND ONE NON-SEED FILE IS A TRAP THE SWEEP WILL FIND. definition-of-amount-for-limit-approval-06806875.md is a SEMANTICS topic: it defines what "amount" means for limit routing (requested amount before approval, approved amount after). It yields ZERO fields. Its only control reference — "be sure to select the Restrict approvers to those with limit authority check box when defining the workflow step" —
> REPRODUCED HALF, REFUTED HALF. The headline ("Two of the five seeds") is factually wrong; the underlying hazard for one file is real.
> 
> === WHAT I RAN ===
> 
> 1) The seed list, script:109 — `grep -n "seeds:" workflows/2026-09-01_kg-authorized-approval-limits.mjs`. The `seeds` string at line 109 names EXACTLY five files: user-administrator-fcfd570c.md (4,603 B), user-administration-8b167b96.md (2,314 B), definition-of-amount-for-limit-approval-06806875.md (2,038 B), configuration-8b3be88b.md (1,213 B), setting-an-unlimited-approval-amount-9d98b489.md (988 B).
> 
> 2) REFUTED — procedure-2d20b513.md IS NOT A SEED. `grep -n "procedure-2d20b513" <script>` returns exactly ONE hit, and it is not line 109:
>    script:34  `//      procedure-2d20b513.md ("control invoice workflow authorization"),`
>    That is inside the SCOPE header comment (script:20-49), cited as corroboration that Authorized Approvers is a non-PO Invoice mechanism. `grep -c` = 1. Comments in the .mjs never reach an agent: the seeds string is injected at script:552 (`pageBrief`) and script:740, and nothing in the script reads its own source or emits a file roster. So "both are seeded at equal weight with the primaries" is false, and "Two of the five seeds" is false — it is ONE of the five.
> 
> 3) CONFIRMED — the file contents. `cat -n` on both:
>    - procedure-2d20b513.md: 65 lines, body is the Workflows > Authorized Approvers > Configuration tab procedure. Exactly three controls: :33 "Authorized Approver feature is available for

> **refuter verdict:** refuted=True conf=high severity=low
> fix: Do NOT add the proposed paragraph. Drop the procedure-2d20b513.md half entirely — that file is not in the seed list (line 109) and appears only in `//` header comments at lines 13/34/60, so instructing agents about it is noise. Do NOT pre-declare zero-field verdicts; that contradicts the run's own per-control boundary method.  If anything is changed at all, make it one clause appended to the existing four-collision sentence inside the seeds string at line 109, extending the list the agents are already told to boundary-test rather than issuing a verdict:    "...and a FIFTH colliding label: 'Res
> HALF THE FINDING IS FACTUALLY WRONG: procedure-2d20b513.md IS NOT A SEED.
> 
> `grep -n "procedure-2d20b513\|definition-of-amount\|configuration-8b3be88b\|setting-an-unlimited\|user-administrator-fcfd\|user-administration-8b167" workflows/2026-09-01_kg-authorized-approval-limits.mjs` returns lines 13, 34, 60, 109, 582. `sed -n '13p;34p;60p'` shows all three of 13/34/60 begin with `//` — they are JS header comments (the 1-80 block), never interpolated into any agent prompt. Line 582 is the ALREADY_BUILT block and does not name procedure-2d20b513.
> 
> The actual seeds string is a SINGLE line, 109. Reading it, the five named seeds are: user-administrator-fcfd570c.md, user-administration-8b167b96.md, definition-of-amount-for-limit-approval-06806875.md, configuration-8b3be88b.md, setting-an-unlimited-approval-amount-9d98b489.md. procedure-2d20b513.md is ABSENT. So the title ("Two of the five seeds"), the "where" (script:109 seeds list), and the whyItMatters ("Both files are seeded at equal weight with the primaries") are all wrong for that file — no lens agent is ever handed it. Half the proposed fix is instructions about a file that is not in the prompt: pure token noise in an already ~1,100-word seeds blob.
> 
> The corpus facts themselves check out. `cat -n procedure-2d20b513.md` (65 lines) = exactly three controls (Authorized Approver feature is available for workflows :33, Minimum Exception Level :48, Maximum Exception Level :57), all under "Administration > Invoice > Workflows ... Auth

---

## [medium] "Approver" is the one colliding control with a clean negative verdict, and the brief does not supply the evidence that settles it

**id:** `approver-field-not-on-this-page`  **auditor:** Independent corpus recon — Authorized Approval Limits / group "Approval Authority"  **split-vote:** True

**where:** script:109 (lists authorized_approver_list_approver among the four collisions with no guidance on the answer)

**evidence:**

```
authorized-approver-list-a9522ec8.md:65,69 — field "Approver", "Select an approver." — present because that surface CREATES a list row (":44 On the right side of the page, click New. ... The New Authorized Approver window appears.").
By contrast this window is entered with a user already loaded: user-administrator-5aa3eb5e.md:23 "...after searching for and opening a user for modification"; assigning-the-approver-for-the-purchase-request-user-20294611.md:27 "User Administration (Search & Select)"; set-a-default-shipping-and-billing-address-f772bed1.md:59 "With the user loaded in the form...".
Neither primary names an Approver control: full reads of user-administrator-fcfd570c.md (77 lines) and user-administration-8b167b96.md (54 lines) describe the entire window — left-side level selector, Can approve exception, currency, amount, Level — and never mention selecting an approver.
cmd: grep -n -iE 'select an approver|Approver field' user-administrator-fcfd570c.md user-administration-8b167b96.md -> no hits
```

**why it matters:** Four collisions were flagged; three resolve to "own control, same value" and this one resolves to "not present". Confirmed negatives are as valuable as positives here and cheaper to state than to re-derive, and leaving it open invites a fifth Approver node whose only justification would be label symmetry with the other three.

**proposed fix:** Add to script:109: 'ONE OF THE FOUR COLLISIONS HAS A CLEAN NEGATIVE - "Approver" IS NOT ON THIS PAGE. On Workflows/a9522ec8 you SELECT an approver because you are creating a list row via New. In User Administration the approver is the RECORD CONTEXT, not a field: you arrive having already searched for and opened that user ("User Administration (Search & Select)", 20294611; "With the user loaded in the form", f772bed1). Neither primary names an Approver control anywhere in its full description of the window. Do NOT emit an Approver field; record the negative in identityNotes.'

> **refuter verdict:** refuted=False conf=high severity=medium
> fix: Adopt the proposed insertion into script:109, with two corrections:  (a) Fix the line citations — the Approver row on authorized-approver-list-a9522ec8.md is at :80 ("Approver") and :84 ("Select an approver."), not :65/:69. Do not carry 65/69 into the prompt; a wrong quote-line in a prompt invites a lens agent to "correct" it by inventing a different reading.  (b) Lead with the primary's own anchor rather than the three secondaries. Suggested text for line 109, appended immediately after the four-collision list:  'ONE OF THE FOUR COLLISIONS HAS A CLEAN NEGATIVE - "Approver" IS NOT A CONTROL ON
> REPRODUCED — every observation holds, with one citation correction.
> 
> 1) The location. `awk 'NR>=105&&NR<=112'` on the build script shows the PAGES entry: 106 id, 107 name, 108 url, 109 `seeds:` — the whole brief is one line. `grep -n authorized_approver_list_approver` returns 57 (header comment) and 109 (the prompt). Reading line 109, it names all four collisions symmetrically ("authorized_approver_approval_limit ... authorized_approver_level ... authorized_approver_can_approve_exception ... and authorized_approver_list_approver ('Approver')") and then poses the boundary question generically ("FOR EACH CONTROL, is this a genuinely DIFFERENT surface, or the SAME VALUE written down twice?"). No per-control verdict is supplied for any of the four, including Approver. Confirmed as stated.
> 
> 2) Why "Approver" exists on a9522ec8. authorized-approver-list-a9522ec8.md:59 "On the right side of the page, click New."; :63 "The New Authorized Approver window appears."; :67 "Complete all appropriate fields." then the field table. The creation-of-a-row cause is confirmed.
> 
> CITATION ERROR IN THE FINDING (substance unaffected): the Approver row is at :80 ("Approver") and :84 ("Select an approver."), NOT :65/:69 — lines 65 and 69 are "English Only" and a bare table pipe. `grep -n -x '    Approver'` -> 80; `grep -n 'Select an approver'` -> 84. The claim reproduces at different line numbers.
> 
> 3) The negative on the two primaries. Full `cat -n` of both files (user-administrator-fcfd570c.md, 77 li

> **refuter verdict:** refuted=True conf=medium severity=cosmetic
> fix: Do not apply the fix as written — do not add a "Do NOT emit an Approver field" verdict, and do not cite 5aa3eb5e / 20294611 / f772bed1, which document other User Administration links and cannot settle this window.  If anything is added at script:109, add EVIDENCE ONLY, one sentence, phrased so the pipeline still does the deriving and the Verify/Critic page-ownership guards still get to fire:    'MECHANICAL FACT FOR THE APPROVER COLLISION, verified: grep -rl "Authorized Approval Limits" over both guide directories returns exactly TWO files (user-administrator-fcfd570c.md, user-administration-8b
> OBSERVATION: fully confirmed. The factual core of the finding is true and I could not break it.
> 
>   grep -rl "Authorized Approval Limits" concur-invoice-professional-edition-*/
>   -> exactly 2 files: user-administrator-fcfd570c.md, user-administration-8b167b96.md
> 
>   cat -n on both (77 and 54 lines, read in full): fcfd570c:51-77 and 8b167b96:23-54 describe the
>   window end to end — left-side hierarchy level, Can approve exception, currency, Amount, Level,
>   the precedence rule — and never name an Approver control.
> 
>   grep -n -iE 'select an approver|Approver field' fcfd570c 8b167b96 -> exit=1, no hits.
> 
>   By contrast authorized-approver-list-a9522ec8.md:44 "On the right side of the page, click New. ...
>   The New Authorized Approver window appears." then a 4-row field table (Approver / Approval Limit /
>   Level / Can approve exception). So the Approver picker exists because that surface CREATES a row.
> 
>   Graph state confirmed (python3 on output/kg-invoice-config.json): 22 pages incl. Workflows and
>   Feature Hierarchies; field.workflows.authorized-approver-list-approver label "Approver" exists.
> 
> CONSEQUENCE: this is where the finding fails. The harm path — a spurious fifth Approver node — has
> to defeat four independent guards, and I can identify no plausible route through all four.
> 
>  1. script:109 already states the general rule that decides Approver correctly without being handed
>     the answer: "A field that is the same value reachable from another surface should be emitted
>     ON

---

## [medium] The fcfd570c exception-levels parenthetical is a scope fence that generates a dependency, not a duplication warning — worth stating so it is not misread as a reason to drop the check box

**id:** `exception-parenthetical-is-a-scope-fence`  **auditor:** Independent corpus recon — Authorized Approval Limits / group "Approval Authority"  **split-vote:** True

**where:** script:109 (quotes the parenthetical is expected but gives no reading of it)

**evidence:**

```
user-administrator-fcfd570c.md:67 — "For exception approvers, the administrator selects the Can approve exception check box. (The actual exception levels apply to all authorized approvers and are defined on the Authorized Approvers tab in Workflows.)"
grep -F -c -> 1
Corroborated from a different file, configuration-8b3be88b.md:18,20 — "The minimum/maximum exception range applies to all exception-based authorized approvers." / "The range is set in Administration > Invoice > Workflows > Authorized Approver tab."
Note the tab-name drift across those two files: fcfd570c says "Authorized Approvers tab" (plural), 8b3be88b says "Authorized Approver tab" (singular) — a genuine two-file label disagreement.
```

**why it matters:** The sentence separates two things a build could easily conflate: the PER-APPROVER boolean (set here) and the TENANT-WIDE min/max exception level RANGE (set on Workflows, already built as field.workflows.minimum-exception-level and maximum-exception-level). Read carelessly it looks like "exceptions live in Workflows, so drop this control" — which would lose a documented field. Read correctly it both keeps the check box AND yields a cross-page dependency the graph should carry.

**proposed fix:** Add to script:109: 'THE EXCEPTION PARENTHETICAL IS A SCOPE FENCE, NOT A DELETE ORDER. fcfd570c:67 "(The actual exception levels apply to all authorized approvers and are defined on the Authorized Approvers tab in Workflows.)" SETTLES that the PER-APPROVER boolean "Can approve exception" is set HERE while the TENANT-WIDE min/max exception RANGE is set on Workflows. Keep the check box AND emit a dependency on the built field.workflows.minimum-exception-level / maximum-exception-level. Corroborated by configuration-8b3be88b.md, which also introduces a tab-name drift to record: fcfd570c says "Authorized Approvers tab", 8b3be88b says "Authorized Approver tab".'

> **refuter verdict:** refuted=False conf=high severity=medium
> fix: Add to the seeds string at script:109 (drop the tab-name-drift clause entirely; use field NAMES, not ids, because synth-dependencies at script:1292-1296 takes exact page/field names):  "### THE EXCEPTION PARENTHETICAL IS A SCOPE FENCE, NOT A DELETE ORDER. user-administrator-fcfd570c.md:67 reads, in one sentence: 'For exception approvers, the administrator selects the Can approve exception check box. (The actual exception levels apply to all authorized approvers and are defined on the Authorized Approvers tab in Workflows.)' The main clause SETTLES that the PER-APPROVER boolean is set HERE; the
> SURVIVES on its core; two citation errors and one bad half of the proposed fix.
> 
> 1) The quote exists, exactly as claimed.
> `grep -rn "actual exception levels" /mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE`
> -> concur-invoice-professional-edition-admin-guides/user-administrator-fcfd570c.md:67:
> "-   For exception approvers, the administrator selects the Can approve exception check box. (The actual exception levels apply to all authorized approvers and are defined on the Authorized Approvers tab in Workflows.)"
> `grep -F -c "(The actual exception levels ... in Workflows.)" fcfd570c.md` -> 1, and it is the only occurrence in the whole corpus. Line 67 confirmed exactly.
> 
> 2) The script does NOT address it. `grep -n "exception" 2026-09-01_kg-authorized-approval-limits.mjs` returns lines 36, 56, 57, 109, 692, 1253, 1256, 1257, 1265, 1359 — none contains the parenthetical or any reading of it. Line 109 (the seeds string) names "a Can approve exception check box" only inside the "FIELDS THE RECON CRITIC NAMED" list. So the finding's substance holds, but its `where` phrasing is wrong: line 109 does not quote the parenthetical at all, it merely lists the check box as expected. Corrected where: script:109, the seeds string — the check box is listed as expected and the CENTRAL JUDGEMENT paragraph names field.workflows.authorized-approver-can-approve-exception as a colliding sibling, but nothing tells the build how to read fcfd570c:67.
> 
> 3) The drop risk is real, not theoretical. `gr

> **refuter verdict:** refuted=True conf=medium severity=cosmetic
> fix: Do not apply the fix as proposed. The only part with marginal value is naming the sibling, and it must be phrased in the vocabulary merge-group.py actually resolves. Optional one-clause addition folded into the EXISTING sibling-note instruction at script:109 (not a new section): 'For "Can approve exception" specifically, fcfd570c:67 also fences the scope — the per-approver boolean is set on THIS window, while the tenant-wide min/max exception LEVEL range is set on Workflows (already built as Minimum Exception Level / Maximum Exception Level). If you emit a cross-page edge for it, write targetP
> OBSERVATION GRANTED, AND THE READING IS CORRECT. `grep -n "exception" .../user-administrator-fcfd570c.md` returns line 67 exactly as quoted; `grep -n "exception\|range" .../configuration-8b3be88b.md` returns lines 33 and 35 (the finding cites 18/20 — wrong line numbers, minor). `cat -n` of fcfd570c shows the check box sits under "On the right side:" (line 65) describing the Authorized Approval Limits window, so the parenthetical is indeed a scope fence, not a delete order. Substance is right. Note also the finding's "where" is imprecise: `grep -n "actual exception levels"` on the script returns NOTHING — script:109 does not quote the parenthetical at all.
> 
> BUT THE CONSEQUENCE DOES NOT SURVIVE. Three things must fail before the check box is lost; each is separately guarded.
> 
> (1) HARD CODE GUARD. `sed -n '533,549p'`: a candidate reaches `drop` only at line 541 via `ds.every(x => x === 'drop')` — UNANIMOUS drop from both refuters. Line 540 turns any single "repair" into repair; 542 turns disagreement into repair; 538-539 turn a missing/partial verdict set into repair. Deletion needs two opus/high refuters to independently and confidently drop.
> 
> (2) REFUTER 2's OWN TEST FAILS ON ITS OWN TERMS. script:1004-1009 tells the ownership refuter to run `grep -rln "<distinctive label>"` and drop only "if the ONLY documentation places it on a different admin page." I ran it for "Can approve exception": TWO files — authorized-approver-list-a9522ec8.md (Workflows) AND user-administrator-fcfd

---

## [medium] A second file titled "User Administrator" exists and is about Delegates — an unfenced drag-in risk sitting one filename away from the primary

**id:** `title-collision-user-administrator-5aa3eb5e`  **auditor:** Independent corpus recon — Authorized Approval Limits / group "Approval Authority"  **split-vote:** True

**where:** script:109 (seed list names user-administrator-fcfd570c.md with no warning of the twin)

**evidence:**

```
admin-guides/user-administrator-5aa3eb5e.md (1,432 B), title: "User Administrator" — identical title to the primary user-administrator-fcfd570c.md.
Subject is entirely different, :23 — "the User Administrator can access either the Invoice Delegates or Purchase Request Delegates links within User Administration after searching for and opening a user for modification."
Found via: grep -ril 'User Administration' <admin-guides>/ -> 28 files, including this one; it does NOT appear in any "Approval Limit" or "Authorized Approval Limits" sweep.
```

**why it matters:** An agent sweeping "User Administration" (which the brief instructs) will hit a file with the same title as the primary, describing a different link in the same section of the same tool. Its Invoice Delegates / Purchase Request Delegates controls are plausible-looking candidates for a page about a link in User Administration. Naming it as excluded costs one sentence; discovering the mis-homing later costs a correction pass. It is also positive evidence for the identity argument: User Administration hosts several independent links, so this page must be the Authorized Approval Limits link specifically, not "User Administration".

**proposed fix:** Add to script:109: 'TITLE COLLISION - DO NOT OPEN BY NAME. admin-guides/user-administrator-5aa3eb5e.md (1,432 B) carries the SAME title "User Administrator" as the primary fcfd570c but documents the Invoice Delegates / Purchase Request Delegates links. It is OUT OF SCOPE for this page. Its existence is useful evidence for identityNotes: User Administration hosts several independent links, so THIS page is the Authorized Approval Limits link and its window - not the User Administration tool.'

> **refuter verdict:** refuted=False conf=medium severity=low
> fix: Do NOT add the proposed three-sentence block — it repeats a fence that already exists at :109 and restates identity reasoning the seed already makes at length. Instead make two surgical edits to the seeds string at script:109.  1. Repair the fence rationale, which is the actual defect. Current text reads: "Employee Import and the general User Administration surface are OUT OF SCOPE - both defer to external Shared guides absent from this corpus." That reason does not hold for every neighbour and an agent can see it fail. Change the clause to: "...are OUT OF SCOPE. Employee Import defers to exte
> OBSERVATION — reproduces exactly, every element.
> 
> `ls -la /mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE/concur-invoice-professional-edition-admin-guides/ | grep -i user-admin` returns three files:
>   user-administration-8b167b96.md   2314
>   user-administrator-5aa3eb5e.md    1432
>   user-administrator-fcfd570c.md    4603
> Sizes match the finding to the byte. `cat -n user-administrator-5aa3eb5e.md` line 2 is `title: User Administrator`; `sed -n '1,20p' user-administrator-fcfd570c.md` line 2 is `title: User Administrator`. Identical titles: CONFIRMED. Line 23 of the twin is verbatim as quoted ("...can access either the Invoice Delegates or Purchase Request Delegates links within User Administration after searching for and opening a user for modification."): CONFIRMED. Subject is Delegates, not approval limits: CONFIRMED.
> 
> Sweep claims: CONFIRMED. `grep -ril 'User Administration' .` returns 28 files and includes the twin. `grep -c -i 'approval limit\|authorized approval' user-administrator-5aa3eb5e.md` returns 0.
> 
> `where` claim: CONFIRMED. `grep -n "seeds:"` puts the seed list at line 109, and it names `user-administrator-fcfd570c.md (admin, 4,603 B - THE PRIMARY...)`. `grep -n "5aa3eb5e"` over the whole 1,500-line script returns nothing — the twin is named nowhere. (`grep -n twin` hits 5 lines, all Run A leftovers about OCR/table twins, unrelated; `grep -n Delegate` hits 3, all "Delegate Configurations" as a Run B page.)
> 
> Graph check: `python3` over output/kg-invoice-con

> **refuter verdict:** refuted=True conf=high severity=not-a-defect
> fix: No change. Do not add the fence. If any prompt budget is spent near :109, it belongs on the real defect at PREAMBLE:578-583, where surviving Run A text tells all 12 agents that the Authorized Approval Limits window "is NOT a page for you to build" while citing the same primary file. That line must be rewritten before this run, and the proposed fix would worsen its contradiction by planting a second OUT-OF-SCOPE clause over the same file family.
> OBSERVATION GRANTED, CONSEQUENCE FAILS ON FIVE INDEPENDENT COUNTS.
> 
> The twin is real. `grep '^title:'` on both files returns `title: User Administrator`; sizes 4,603 B (fcfd570c) vs 1,432 B (5aa3eb5e); 5aa3eb5e:21-23 is about Invoice Delegates / Purchase Request Delegates. All confirmed. It stops there.
> 
> 1. UNREACHABLE VIA THE INSTRUCTED SWEEP. The finding's harm path is "an agent sweeping 'User Administration' will hit it." But script:109 does not instruct that sweep. Its only discovery directive is: `ALSO SWEEP for "Approval Limit" and "Authorized Approval Limits" across BOTH guide directories`. On the twin:
>    grep -ci 'approval limit' -> 0
>    grep -ci 'authorized'     -> 0
>    grep -ci 'approv'         -> 0
> The file does not contain the substring "approv" at all. It cannot surface from the sweep the script actually orders. `grep -n 'User Administration'` over the script returns 5 hits, all inside :109, and every one is a click-path / role-gate / three-setter quote — none is a search directive.
> 
> 2. FILES ARE ADDRESSED BY HASH FILENAME + BYTE SIZE, NOT BY TITLE. `grep -n -iE 'by title|same title|title collision|front-?matter'` over the script returns exactly one hit (:235, about `loio` for variant checks). Nothing in the pipeline resolves a file by its `title:` value. Seed :109 names `user-administrator-fcfd570c.md (admin, 4,603 B - THE PRIMARY...)` — filename plus a self-verifying size anchor differing from the twin by 3.2x.
> 
> 3. TITLE COLLISION IS CORPUS BASELINE, NOT A HAZ

---

## [medium] Raw-table census: the two <table> files in the candidate set are both unseeded, and grep -c '<tr' under-reports on one of them

**id:** `raw-table-census-and-tr-lie`  **auditor:** Independent corpus recon — Authorized Approval Limits / group "Approval Authority"  **split-vote:** True

**where:** script:109 (seeds claim "ZERO raw <table> elements ... on either primary") and script:135 (LENS B)

**evidence:**

```
Census over all 26 candidates (grep -c '<table' / grep -cP '^\s*\|'):
  user-administrator-fcfd570c.md      0 / 0   (seed claim CONFIRMED)
  user-administration-8b167b96.md     0 / 0   (seed claim CONFIRMED)
  authorized-approver-list-a9522ec8.md 0 / 16
  procedure-2d20b513.md               0 / 10
  employee-import-e28f2294.md         0 / 19
  global-group-vs-authorized-approver-hierarchy-8a960238.md 0 / 25
  understand-the-hierarchy-b65d7089.md 0 / 69
  cost-object-approval-8b3d1e0f.md    0 / 85
  additional-approver-situations-fbb5034c.md            1 / 0
  filter-authorized-approvers-by-workflow-approval-step-aae69350.md 1 / 21
On aae69350 the row count LIES the same way the built graph records for invoice-settings-cace748d.md:
  grep -c '<tr' -> 1   vs   grep -o '<tr' | wc -l -> 3
```

**why it matters:** The brief's zero-table claim is true of the two primaries and is being used to justify "every field lives in procedure prose" — but both raw-<table> files in the wider candidate set are unseeded, and one of them (aae69350) is the file that decides the Level boundary. LENS B exists precisely because a long table was once skipped for being long; here the risk is a table skipped for being outside the seed list, on a file whose <tr> count under-reports 1-for-3.

**proposed fix:** Add to script:135 (LENS B): 'MEASURED CENSUS FOR THIS PAGE: both primaries are genuinely table-free (0 <table>, 0 pipe rows) - the field roster really does live in prose. But TWO files in the candidate set carry raw <table>: filter-authorized-approvers-by-workflow-approval-step-aae69350.md (6,234 B) and additional-approver-situations-fbb5034c.md (8,664 B), and the pipe-table files include global-group-vs-authorized-approver-hierarchy-8a960238.md (25 rows, decides page identity) and employee-import-e28f2294.md (19 rows, value domains). On aae69350, grep -c "<tr" returns 1 and LIES; grep -o "<tr" | wc -l returns 3 - the same trap already recorded for invoice-settings-cace748d.md. Count rows with grep -o, never grep -c.'

> **refuter verdict:** refuted=False conf=high severity=low
> fix: Add to script:135 (LENS B charter), amended from the proposal on two verified points - fbb5034c also under-reports on grep -c '<tr' (1 vs 7), and BOTH raw tables are illustrative, not settings tables:\n\n'MEASURED CENSUS FOR THIS PAGE: both primaries are genuinely table-free (grep -c "<table" = 0 and grep -cP "^\\s*\\|" = 0 on user-administrator-fcfd570c.md and user-administration-8b167b96.md) - the field roster really does live in prose. But a sweep of all 66 files matching "Authorized Approv|Approval Limit" across both guide directories finds exactly TWO carrying a raw <table>, and neither i
> Reproduced every claim against the real files.\n\nLINE ANCHORS: `awk 'NR==109||NR==135'` on /mnt/c/Users/manci/PROJECTS/concur-config-diver-support/workflows/2026-09-01_kg-authorized-approval-limits.mjs confirms :109 is the seeds string containing "ZERO raw <table> elements and ZERO markdown table rows on either primary" and :135 is "LENS B - REFERENCE TABLES AND LONG CATALOGS". `grep -n seeds` shows p.seeds is injected into the prompt at :552 (pageBrief) and :740, so LENS B does receive the zero-table sentence. The MANDATORY MECHANICAL SWEEP with `grep -c '<table'` is at :136-137.\n\nCENSUS: ran `grep -c '<table'` and `grep -cP '^\\s*\\|'` over all ten named files. Every pair matches the finding exactly: fcfd570c 0/0, 8b167b96 0/0, a9522ec8 0/16, 2d20b513 0/10, e28f2294 0/19, 8a960238 0/25, b65d7089 0/69, 8b3d1e0f 0/85, fbb5034c 1/0, aae69350 1/21. Byte sizes also match (aae69350 6,234; fbb5034c 8,664). The two primaries are genuinely table-free, so the seed claim at :109 is TRUE and correctly scoped.\n\nTR LIE: on filter-authorized-approvers-by-workflow-approval-step-aae69350.md, `grep -c '<tr'` returns 1 and `grep -o '<tr' | wc -l` returns 3 - exactly as claimed. The cited precedent is real: output/kg-invoice-config.json:9135 records verbatim "PACKED RAW <table> ROW 1 OF 3. grep -c '<tr' on this file returns 1 and LIES; grep -o '<tr' | wc -l returns 3." for invoice-settings-cace748d.md.\n\nI WIDENED THE CANDIDATE SET rather than trusting the stated 26: `grep -rlEi 'Authori

> **refuter verdict:** refuted=True conf=high severity=not-a-defect
> fix: DO NOT apply the proposed LENS B census. It targets two illustrative example tables that carry zero fields and that script:142 already tells LENS B to skip, it re-points the enumerate-every-row lens at a file already owned by the built Workflows page (configFields[544]/[545]), and it names employee-import-e28f2294.md — declared out of scope at script:109 — as a value-domain source.  If the main agent wants any change from this line of investigation, make it ONE sentence in the seeds at script:109 (the boundary section), NOT in LENS B, and frame it as negative evidence:  "BOUNDARY EVIDENCE ON '
> OBSERVATION: fully reproduced, every number is right. `for f in <10 candidates>; do echo "$f table_c=$(grep -c '<table' $f) tr_c=$(grep -c '<tr' $f) tr_o=$(grep -o '<tr' $f | wc -l) pipe=$(grep -cP '^\s*\|' $f) size=$(stat -c%s $f)"; done` gives: user-administrator-fcfd570c 0/0/0/0/4603; user-administration-8b167b96 0/0/0/0/2314 (script:109 seed claim CONFIRMED); aae69350 table=1, tr_c=1 vs tr_o=3, pipe=21, 6234 B; fbb5034c table=1, tr_c=1 vs tr_o=7, 8664 B. The <tr> under-report is real.
> 
> CONSEQUENCE: nil. Three independent reasons.
> 
> (1) BOTH raw <table>s ARE ILLUSTRATIVE EXAMPLES CARRYING ZERO FIELDS. `cat filter-authorized-approvers-by-workflow-approval-step-aae69350.md` — the <table> is introduced by "For example, the company assigns these levels to these workflow approval steps:" and its 3 rows are Employee/Line Manager/Country Mgr/HR Approver with narrative cells ("Submits the invoice", "(assigned as Level 1)"). `grep -n "<table" -A3 additional-approver-situations-fbb5034c.md` — its 7 rows are a worked cost-object example (Row/Approver/Limit: A 100, B 900, C 500...). Neither is a settings or field-definition table. LENS B at script:142 already rules on exactly this: "Distinguish an ILLUSTRATIVE table ... from a SETTINGS table. Illustrative tables are correctly skipped." Miscounting 1-vs-3 rows of a table that must be skipped anyway is inert.
> 
> (2) NO INSTRUCTION IN THIS SCRIPT COUNTS ROWS WITH `grep -c '<tr'`. `grep -n "<tr" workflows/2026-09-01_kg-authorized-approval-li

---

## [medium] Every candidate field name is legal to reuse (validator scopes duplicate-name checks to a single page) — 49 duplicate labels and 13 duplicate names already coexist at exit 0

**id:** `name-collision-surface`  **auditor:** landing-auditor (graph-impact)  **split-vote:** True

**where:** bin/validate-graph.py:92-99 (per_page duplicate check); output/kg-invoice-config.json field nodes

**evidence:**

```
The only name check is per-page:
```
per_page = defaultdict(list)
for f in fields:
    per_page[f['pageId']].append(f['name'].strip().lower())
for pid, names in per_page.items():
    for nm, c in Counter(names).items():
        if c > 1:
            errors.append(('duplicate-field-name', pid, '%s x%d' % (nm, c)))
```
Measured over the current graph: 49 labels and 13 names already appear on 2+ pages (e.g. name `inherited_level` on both Accounting Administration and Expense Types; `segment_name` on both Accounting Administration and Feature Hierarchies) and `python3 bin/validate-graph.py` exits 0.

Current owners of the nine names asked about:
  approval_limit            — FREE. Nearest: field.workflows.authorized-approver-approval-limit (name authorized_approver_approval_limit, label "Approval Limit"), page Workflows.
  approver                  — FREE. Nearest: field.workflows.authorized-approver-list-approver (name authorized_approver_list_approver, label "Approver"), page Workflows.
  level                     — TAKEN by field.feature-hierarchies.level (page Feature Hierarchies, label "Level"). Also field.workflows.authorized-approver-level (name authorized_approver_level, label "Level"), field.workflows.step-authorized-approver-level, field.purchase-order-matching-rules.level-field (name level_field, label "Level"), field.accounting-administration.segment-level (name segment_level, label "Level").
  can_approve_exception     — FREE. Nearest: field.workflows.authorized-approver-can-approve-exception (name authorized_approver_can_approve_exception, label "Can approve exception"), page Workflows.
  currency                  — FREE. Nearest: field.purchase-order-matching-rules.currency-field (name currency_field, label "Currency").
  amount                    — FREE, zero near matches anywhere in the graph.
  manager_approval_limit    — FREE, zero matches.
  approval_limit_currency   — FREE, zero matches.
  authorized_approver       — FREE. Eight `authorized_approver*` names exist, all on page Workflows.

Field ids are minted as `field.<page-id>.<slug(name)>` (merge-group.py:132) against a GRAPH-WIDE `seen` set (:118, :135), so reuse produces field.authorized-approval-limits.level etc. with no `-2` suffix and no id collision.
```

**why it matters:** Reuse is silently legal, so the boundary judgement the whole run exists to make is enforced by nothing but the agent's prose. In particular `level`, `approval_limit` and `can_approve_exception` reused here would sit one page away from near-identical Workflows controls sourced from a DIFFERENT tab, and the only signal distinguishing 'deliberate second surface' from 'duplicate' would be the notes text.

**proposed fix:** Pin the roster in the build script rather than leaving it to the agent, so the correction entries in findings #1/#5 can be written before the run. Recommended names, each matched to a verbatim control in the two primaries: `level` (left-side hierarchy selector), `currency`, `amount`, `can_approve_exception`, `authorized_approver_checkbox`, `manager_approval_limit`, `approval_limit_currency` — seven, matching the expected count. Require every one to carry, in notes, the sentence 'Workflows carries a sibling control for the same underlying value: <exact field id>.' where a sibling exists, and add a post-run assertion that no field on page.authorized-approval-limits has sourceFile == 'concur-invoice-professional-edition-admin-guides/authorized-approver-list-a9522ec8.md' (that file's own click path is 'Administration > Invoice > Workflows', so anything sourced from it belongs to Workflows).

> **refuter verdict:** refuted=False conf=high severity=low
> fix: Keep ONLY the post-run assertion; drop the roster pinning.  ADD (new, provably safe): a post-run check that no field on `page.authorized-approval-limits` has `sourceFile == 'concur-invoice-professional-edition-admin-guides/authorized-approver-list-a9522ec8.md'`. Justified by two greps on that file — its own click path is `Administration > Invoice > Workflows` (line 41) and it contains zero mentions of "User Administration", "Authorized Approval Limits" or "employee import", so nothing in it can legitimately source a field on this page. Cheap, mechanical, cannot produce a false positive.  OPTIO
> REPRODUCED — every substantive claim survives, verbatim.
> 
> 1. Validator code block. `sed -n '88,99p' bin/validate-graph.py` returns the per_page block character-for-character as quoted. Exact span is **validate-graph.py:91-98** (91 = comment, 92 = `per_page = defaultdict(list)`, 98 = the `errors.append`), not 92-99 — off by one at both ends, cosmetic.
> 
> 2. It is the ONLY name check. `grep -n "Counter(" bin/validate-graph.py` → 3 hits: :55 (`stats`), :96 (this block), :230 (error-kind tally). No graph-wide name or label uniqueness check exists anywhere in the file.
> 
> 3. Exit 0 confirmed. `python3 bin/validate-graph.py` → `EXIT=0` (warnings only: step-references-unknown-field x23, value-set-entries-not-in-file x11, etc.).
> 
> 4. The 49/13 measurement is EXACT. Loading `output/kg-invoice-config.json` (note: fields live under `nodes.configFields`, not top-level — the evidence's shorthand, not an error): 607 fields / 22 pages, **49** labels and **13** names on 2+ pages. Both named examples check out: `inherited_level` → Accounting Administration + Expense Types; `segment_name` → Accounting Administration + Feature Hierarchies.
> 
> 5. The nine-name roster is EXACT, all nine. `level` is the only TAKEN one — `field.feature-hierarchies.level` (name `level`, label "Level"). The other eight return zero exact-name owners. Every "nearest" citation checks out too: `field.workflows.authorized-approver-approval-limit`, `-list-approver`, `-can-approve-exception`, `-level`, `field.workflows.step-author

> **refuter verdict:** refuted=True conf=high severity=not-a-defect
> fix: REJECT the fix as proposed. Do NOT pin a seven-name roster into the build script — `docs/2026-09-01_HANDOFF-APPROVAL-AUTHORITY-AND-RUN-B.md:71` and :188 both forbid it ("a pipeline run and not seven hand-written nodes"; "Blind build from documentation — do not relax"), and the specific roster proposed fuses two mutually exclusive UI branches (`user-administrator-fcfd570c.md:32` only-one-group check-box path vs :51 at-least-one-non-Global-level link path) while promoting line 109's explicitly "still to be verified" recon list into authoritative input. Also drop the mandated boilerplate sentence
> EVERY FACTUAL CLAIM IN THE FINDING VERIFIES. I re-measured rather than trusting it.
> 
> `sed -n '80,110p' bin/validate-graph.py` — the duplicate-name check is keyed on `per_page[f['pageId']]` (validate-graph.py:91-99). Nothing else in the file compares names across pages.
> `python3 -c` over `output/kg-invoice-config.json` (note: fields live under `nodes.configFields`, not top-level — the finding's snippet elides that, cosmetic): 607 fields / 22 pages, **13 names on 2+ pages, 49 labels on 2+ pages**, and `python3 bin/validate-graph.py; echo $?` → **0**. All nine candidate names are free except `level` (`field.feature-hierarchies.level`). `merge-group.py:122-127` mints `field.<page>.<slug>` against a graph-wide `seen` set with a `-N` suffix loop, so reuse produces a clean new id. Every measurement in the finding is correct.
> 
> BUT THE CONSEQUENCE IS NIL, FOR THREE REASONS.
> 
> 1. THE SCRIPT ALREADY STATES THIS EXACT FACT AND COMPENSATES FOR IT. Line 109 (`seeds`) contains verbatim: *"DO NOT silently create a fifth 'Approval Limit'. A duplicate is INVISIBLE to bin/validate-graph.py - it checks quotes against files, never controls against pages - and it is exactly the defect class that cost Group 5A five mis-homed fields."* The finding's headline discovery is already announced by the artifact under audit. It is not a gap; it is a documented design property the script is built around.
> 
> 2. THE PROSE GUARD IS LIVE IN EVERY PHASE THAT MINTS OR KEEPS A NAME — I traced the wiring, not just the 

---

## [medium] validate-graph.py checks quotes against files and never checks controls against pages — the handoff's claim is CONFIRMED, and the blind spot is wider than stated

**id:** `validator-blind-spots`  **auditor:** landing-auditor (graph-impact)  **split-vote:** False

**where:** bin/validate-graph.py:60-99 (fields), :101-118 (value sets), :120-146 (contradictions), :148-159 (ranges), :161-186 (dependencies), :188-197 (steps)

**evidence:**

```
Complete enumeration of every check, by node type.
Fields (ERROR): missing-source-file; empty-quote; quote-not-in-file (normalised containment against the cited corpus file); selector-leak (SELECTOR regex over notes+quote); orphan-field (pageId absent from configPages); bad-uivariant (not in new/legacy/both/undifferentiated); false-rawhtml-flag (fromRawHtmlTable true but '<table' absent from the file); duplicate-field-name (WITHIN one pageId only). Fields (WARN): value-not-in-source.
Value sets (ERROR): unwired-value-set (no owner, unless knownGap -> WARN); value-set-dangling-owner; value-set-missing-file. (WARN): value-set-quote-not-in-file; value-set-entries-not-in-file.
Contradictions (ERROR): under-two-readings; bad-kind (not in label-drift/option-list/scope/structure/cardinality/requirement); missing-file; empty-quote; quote-not-in-file; duplicate-reading; dangling-owner. (WARN): no-consequence.
Compressed ranges (ERROR): empty-label; under-two-members; count-mismatch; missing-file; quote-not-in-file; dangling-owner.
Dependencies (ERROR): dangling-id (an id not in field_ids); unlabelled-endpoint (unresolved AND no ref page). (WARN): missing-file; quote-not-in-file.
Steps (WARN only): references-unknown-field (against a GRAPH-WIDE name set, not per page — validate-graph.py:190); references-unbuilt-page.

CONFIRMED, nothing anywhere joins a field to the page its sourceFile documents, and nothing compares fields across pages. Baseline run: `python3 bin/validate-graph.py` -> pages 22 | fields 607 | ERROR: none | WARN: 181 | EXIT=0.
```

**why it matters:** Determines which of this run's failure modes need a human/critic and which the tooling will catch, so effort goes to the right place.

WOULD CATCH: a fabricated or paraphrased sourceQuote (the strong check, 607/607 today); a wrong sourceFile path; a selector leak; any fromRawHtmlTable:true — high-value here, since the script measured ZERO <table> and ZERO markdown table rows on both primaries, so any such flag is an automatic ERROR; a uiVariant other than the expected 'undifferentiated'; two fields with the same name ON THIS PAGE; an unwired value set; a contradiction with one reading or an unverifiable quote; a compressedRange whose count disagrees with its list; a dependency id pointing at a deleted node.

WOULD MISS: a fifth 'Approval Limit' duplicating field.workflows.authorized-approver-approval-limit; re-emitting minimum_exception_level / maximum_exception_level (currently field.workflows.minimum-exception-level / .maximum-exception-level, both sourced from admin-guides/procedure-2d20b513.md, whose own click path is 'Administration > Invoice > Workflows > Authorized Approvers > Configuration tab'); a field sourced from authorized-approver-list-a9522ec8.md landing on this page; ANY dependency `condition` text, true or false (never read); any notes/verifyNotes/identityNotes content; a wrong `label` (labels are never compared to source); a dependency whose quote is verbatim but does not state the relationship (quote mismatch is only a WARN anyway); a semantically duplicate edge; a wrong navPath; and field-count sanity (7 vs 15 is invisible).

**proposed fix:** Do not rely on the validator for the boundary question — it is structurally incapable of it. Add one cheap post-merge assertion to the run's own checklist (not to validate-graph.py, which must stay a pure quote verifier):
```
python3 - <<'EOF'
import json, collections
kg = json.load(open('output/kg-invoice-config.json'))
n = kg['nodes']; pn = {p['id']: p['name'] for p in n['configPages']}
new = [f for f in n['configFields'] if f['pageId'] == 'page.authorized-approval-limits']
assert 5 <= len(new) <= 9, 'field count %d outside the expected ~7' % len(new)
WF_OWNED = {'concur-invoice-professional-edition-admin-guides/authorized-approver-list-a9522ec8.md',
            'concur-invoice-professional-edition-admin-guides/procedure-2d20b513.md'}
bad = [f['id'] for f in new if f['sourceFile'] in WF_OWNED]
assert not bad, 'sourced from a Workflows-owned file: %s' % bad
wf = {f['name'].lower() for f in n['configFields'] if pn[f['pageId']] == 'Workflows'}
for f in new:
    if f['name'].lower() in wf or f['label'].strip().lower() in {x['label'].strip().lower() for x in n['configFields'] if pn[x['pageId']] == 'Workflows'}:
        assert 'sibling' in (f['notes'] or '').lower(), 'collides with Workflows and does not name the sibling: %s' % f['id']
EOF
```

> **refuter verdict:** refuted=False conf=high severity=medium
> fix: Keep the fix's substance — a post-merge guard on the run's checklist, NOT a change to bin/validate-graph.py, which must stay a pure quote verifier. Four corrections.  (1) Correct the `where` citations before anyone acts on them. Real boundaries: fields 61-98 (dup-name 92-98), value sets 100-118, contradictions 120-155, compressed ranges 157-177, dependencies 179-196, steps 198-207. The graph-wide step name set is validate-graph.py:200 (used at :204), not :190.  (2) Match sourceFile by BASENAME. 18 existing fields carry a `CONCUR_INVOICE/`-prefixed path that validate-graph.py:41-47 silently tol
> REPRODUCE lens — I ran every claim against the real files. The observation survives in full; only some line citations are wrong.
> 
> 1) BASELINE, exact match. `cd /mnt/c/Users/manci/PROJECTS/concur-config-diver-support && python3 bin/validate-graph.py` →
> `pages 22 | fields 607 | dependencies 436 | steps 41 | value sets 114 (1011 values)`, `quotes verbatim 607/607 (100.0%)`, `ERROR: none`, `WARN: 181` (step-references-unbuilt-page 109, unwired-value-set-KNOWN-GAP 34, step-references-unknown-field 23, value-set-entries-not-in-file 11, value-set-quote-not-in-file 3, value-not-in-source 1), `EXIT=0`. Identical to the finding's stated baseline.
> 
> 2) THE ENUMERATION IS EXHAUSTIVE AND CORRECT. `grep -n "errors.append\|warns.append\|bucket.append" bin/validate-graph.py` returns exactly 34 emit sites: fields 9 (67,71,75,78,83,85,87,89,98), value sets 5 (108,110,113,115,118), contradictions 8 (128,130,132,137,141,145,151,155), ranges 6 (163,165,167,170,174,177), dependencies 4 (186,190,193,195), steps 2 (205,207). That is 9+5+8+6+4+2 = 34 — every check the finding lists, and no check it omitted. Error/warn bucketing matches item-for-item.
> 
> 3) THE CENTRAL CLAIM — "nothing joins a field to the page its sourceFile documents, and nothing compares fields across pages" — CONFIRMED, three ways:
>  - `duplicate-field-name` is built from `per_page = defaultdict(list)` keyed by `f['pageId']` (validate-graph.py:92-98). Per-page only.
>  - `grep -n "label\|navPath\|documentedBasis\|condition\|verifyNotes\

> **refuter verdict:** refuted=False conf=high severity=low
> fix: Keep the intent (deterministic post-merge boundary check, validate-graph.py untouched) but fix the path matching and demote the two brittle asserts to printed warnings. Add to the run's checklist, after merge and after `python3 bin/validate-graph.py` exits 0:  ``` python3 - <<'EOF' import json, os kg = json.load(open('output/kg-invoice-config.json')) n = kg['nodes']; pn = {p['id']: p['name'] for p in n['configPages']} PAGE = 'page.authorized-approval-limits' new = [f for f in n['configFields'] if f['pageId'] == PAGE] print('fields on the new page: %d (expected ~7)' % len(new)) if not 5 <= len(
> EVERY FACTUAL CLAIM IN THE FINDING CHECKS OUT — I re-derived them rather than trusting the enumeration.
> 
> 1. Baseline reproduced. `python3 bin/validate-graph.py` → "pages 22 | fields 607 | dependencies 436 | steps 41 | value sets 114 (1011 values)", "quotes verbatim in cited file: 607/607 (100.0%)", "ERROR: none", "WARN: 181" (step-references-unbuilt-page 109, unwired-value-set-KNOWN-GAP 34, step-references-unknown-field 23, value-set-entries-not-in-file 11, value-set-quote-not-in-file 3, value-not-in-source 1), EXIT=0. Matches the finding exactly.
> 
> 2. The blind spot is real, in code. bin/validate-graph.py:93-99 builds `per_page = defaultdict(list)` keyed on `f['pageId']` and only Counter()s names WITHIN a pageId — cross-page duplicate names are structurally invisible. Nothing anywhere in the 239 lines joins `sourceFile` to `pageId`; I read the whole file. Steps at :188-190 do use a GRAPH-WIDE `known` name set, exactly as stated, so a step naming a Workflows field would not even WARN. Dependency `condition` is never read (grep confirms the key is absent from the validator).
> 
> 3. The collision is real and I enumerated it from the graph, not the handoff: field.workflows.authorized-approver-approval-limit ("Approval Limit"), .authorized-approver-level ("Level"), .authorized-approver-can-approve-exception ("Can approve exception"), .authorized-approver-list-approver ("Approver") — all sourceFile concur-invoice-professional-edition-admin-guides/authorized-approver-list-a9522ec8.md; 

---

## [medium] The Verify prompt says verbatimVariantIndex MUST be set, but VERDICT_SCHEMA leaves it optional — silent omission, and Repair depends on it

**id:** `verdict-schema-verbatim-index-not-required`  **auditor:** tabs-chain / schemas / script-executability  **split-vote:** True

**where:** schema at workflows/2026-09-01_kg-authorized-approval-limits.mjs:415-420 (required[] at :406); prompt at :950-955; consumers at :1053 and :1081

**evidence:**

```
sed -n '406p' → '        required: ['fieldName', 'disposition', 'reason'],'
sed -n '420p' → '          verbatimVariantIndex: { type: 'integer', description: 'Index of the candidate variant whose sourceQuote you verified verbatim with grep -F. -1 if none is verbatim.' },'
sed -n '950,951p' → 'For every candidate you must set verbatimVariantIndex: the 0-based index, IN THE ORDER THE' / 'VARIANTS APPEAR IN THE LIST BELOW, of the variant whose sourceQuote you personally verified'
sed -n '1053p' → '        verbatimVariantIndex: x.verbatimVariantIndex,'
sed -n '1081p' → '  is verbatim. Use the refuters' verbatimVariantIndex, and confirm it yourself with grep -F -c. If'
```

**why it matters:** Same mismatch class as tabs, one notch milder: the key is declared so it CAN be emitted, but it is absent from required[], so a refuter that skips it produces a schema-valid verdict. slim() at :1053 then copies undefined, JSON.stringify drops the key, and the Repair agent at :1081 is told to 'use the refuters' verbatimVariantIndex' on a field that is simply not there. The prompt's own cautionary tale is that last run 'the pipeline kept a record whose quote was a reformatted table and dropped its twin whose quote was exactly verbatim' — the mechanism that was supposed to prevent a repeat is unenforced. On this page it matters more than usual: with four label-colliding siblings already in the graph, picking the right variant IS the build.

**proposed fix:** In VERDICT_SCHEMA, change line 406 to:
        required: ['fieldName', 'disposition', 'reason', 'verbatimVariantIndex'],
The description already tells the agent to use -1 when nothing verifies, so making it required forces an explicit answer rather than a silence. Optionally also add to slim() at :1053 a fallback so a missing value is visible rather than absent: verbatimVariantIndex: (x.verbatimVariantIndex === undefined ? 'NOT REPORTED' : x.verbatimVariantIndex),

> **refuter verdict:** refuted=False conf=high severity=low
> fix: Not as proposed — the line number is wrong and would corrupt the schema.  Apply at line **410** (not 406):         required: ['fieldName', 'disposition', 'reason', 'verbatimVariantIndex'],  Line 406 is `      type: 'array',`; editing it would break VERDICT_SCHEMA. Verify the target first with:   grep -n "required: \['fieldName', 'disposition', 'reason'\]" workflows/2026-09-01_kg-authorized-approval-limits.mjs  The declaration at :420 already documents -1 as the "nothing verifies" answer, so making it required forces an explicit value instead of a silence.  SKIP the optional slim() fallback at 
> REPRODUCED — the observation is real; one citation is wrong and the causal framing is wrong.
> 
> WHAT SURVIVES (observation, verified):
> - `grep -n "required: \[" 2026-09-01_kg-authorized-approval-limits.mjs` → the verdict-item required list is `required: ['fieldName', 'disposition', 'reason'],` and it is at **line 410**, inside VERDICT_SCHEMA (starts :398, `additionalProperties: false` at :409).
> - `sed -n '420p'` → `verbatimVariantIndex: { type: 'integer', description: 'Index of the candidate variant whose sourceQuote you verified verbatim with grep -F. -1 if none is verbatim.' },` — declared, absent from required[]. Confirmed optional.
> - `sed -n '950,951p'` → 'For every candidate you must set verbatimVariantIndex: the 0-based index, IN THE ORDER THE' / 'VARIANTS APPEAR IN THE LIST BELOW…'. The MUST is real and prompt-only.
> - `grep -n "VERDICT_SCHEMA"` → used at :994 and :1032 (both refuters). Standard JSON Schema: omitting a non-required key is valid, so a refuter can silently skip it.
> - Consumers confirmed: :1053 `verbatimVariantIndex: x.verbatimVariantIndex,` inside `slim()`; `slim()` is called at :1109/:1112/:1115 wrapped in `jstr`, and `const jstr = (o) => JSON.stringify(o, null, 2)` at :248. `node -e` proof: `JSON.stringify({a:1,verbatimVariantIndex:undefined,b:2})` → `{"a":1,"b":2}`. The key vanishes from the Repair prompt exactly as claimed.
> - :1081 `'  is verbatim. Use the refuters\' verbatimVariantIndex, and confirm it yourself with grep -F -c. If'` — Repair is instruc

> **refuter verdict:** refuted=True conf=high severity=cosmetic
> fix: Do nothing for this run. Leave workflows/2026-09-01_kg-authorized-approval-limits.mjs:410 as `required: ['fieldName','disposition','reason']`, byte-identical to Run A:427. The MUST/optional mismatch is real but inert: no crash, the value never enters the graph, and non-verbatim quotes are caught deterministically by assemble-parts.py:343-347 (QUOTE-NOT-VERBATIM) and by the gate at validate-graph.py:69-74 (ERROR quote-not-in-file).  Reject the slim() half outright — a string 'NOT REPORTED' in an integer slot the Repair prompt reads at :1081 is a new defect.  If the team still wants the schema t
> The observation is factually correct but the consequence does not survive.
> 
> 1) OBSERVATION CONFIRMED, AND IT IS NOT RUN-A RESIDUE.
> `diff <(sed -n '397,426p' 2026-09-01_kg-authorized-approval-limits.mjs) <(sed -n '414,443p' 2026-08-31_kg-workflows-run-a.mjs)` returns nothing → "VERDICT_SCHEMA BYTE-IDENTICAL TO RUN A". `grep -n "required: \['fieldName'"` gives Run A:427 and this script:410, both `['fieldName','disposition','reason']`. So this is not adapted-in Run A prompt text contradicting this run's purpose (the audit's actual frame) — it is the accumulated method itself, unchanged, under which 22 pages / 607 fields were already built and the validator exits 0.
> 
> 2) NO CRASH PATH. slim() at :1053 reads a property; `undefined` is dropped by JSON.stringify. Nothing dereferences it. The Repair agent simply sees a verdict object without the key.
> 
> 3) THE HARM IS ALREADY CAUGHT DETERMINISTICALLY, TWICE. The stated damage is a non-verbatim quote surviving into the graph. Two deterministic guards sit downstream of Repair:
>   - bin/assemble-parts.py:343-347 — pre-merge self-check emits `QUOTE-NOT-VERBATIM` per field.
>   - bin/validate-graph.py:69-74 — `if norm(q) in low: ... else: errors.append(('quote-not-in-file', f['id'], ...))`. That is an ERROR, i.e. the gate. Every ConfigField sourceQuote is substring-checked against the cited corpus file.
> `norm()` (validate-graph.py:24-29 / assemble-parts.py:41-46) does NFKC, dash/quote folding, whitespace collapse, lowercase — so the only diverg

---

## [medium] Verify refuter 2 and both Critics still speak of "the two pages"

**id:** `critic-and-verify-two-pages`  **auditor:** tabs-chain / schemas / script-executability  **split-vote:** False

**where:** workflows/2026-09-01_kg-authorized-approval-limits.mjs:1022, :1461, :1475, :1516

**evidence:**

```
grep -n 'two pages' →
1022:        '    silently flatten two pages into one.',
1461:    '    related to these two pages. For each hit, decide: settings table (must be captured) or',
1475:    '    these two pages. Any variant document that was built from the wrong twin is a real defect: the PO',
1516:    ' 5. DUPLICATE NAMES. Within each page, and across the two pages, and against the existing graph. A'
```

**why it matters:** Low-grade but cumulative: an xhigh critic told to check duplicates 'across the two pages' will go looking for a second page, find none, and either report a phantom finding or spend budget reconciling the instruction with reality. :1516 is the one that stings — the duplicate check it should be running is not across two pages in THIS run but against the four colliding Workflows fields already in the graph, which the same line's third clause ('and against the existing graph') covers only in passing.

**proposed fix:** :1022 → '    silently flatten two surfaces into one.'  |  :1461 → '    related to this page. For each hit, decide: settings table (must be captured) or'  |  :1475 → '    this page. Any variant document that was built from the wrong twin is a real defect: the PO'  |  :1516 → ' 5. DUPLICATE NAMES. Within the page, and against the existing graph - ESPECIALLY against the four Workflows fields whose labels collide (authorized-approver-approval-limit, -level, -can-approve-exception, -list-approver). For each, state whether this window presents its own control or whether the record is the same value written down twice. A'

> **refuter verdict:** refuted=False conf=high severity=medium
> fix: Apply THREE of the four edits; drop :1022 entirely.  DROP :1022 — no change. "silently flatten two pages into one" is a generic this-page-vs-sub-page referent, correct as written, and the strongest sentence in that refuter for this run's actual hazard.  :1461 → '    related to this page. For each hit, decide: settings table (must be captured) or'   (as proposed)  :1475 → '    this page. Any variant document that was built from the wrong twin is a real defect: the PO'   (as proposed)  :1516 → replace with (note underscored names, and cross-page reframed as mis-homing not duplication):  ' 5. DUP
> REPRODUCTION — all four locations exist verbatim.
> 
> `grep -n 'two pages' /mnt/c/Users/manci/PROJECTS/concur-config-diver-support/workflows/2026-09-01_kg-authorized-approval-limits.mjs` returns exactly the evidence text at 1022, 1461, 1475, 1516 (plus 675, 696, 1162 the finding did not cite). File is 1588 lines.
> 
> The run really does build ONE page: `const PAGES = [` begins at :104 and closes at :111 with a single object (`id: 'authorized-approval-limits'`). :590 even logs `'Authorized Approval Limits - mapping 1 page'`. So any prompt sentence that quantifies "the two pages" of this run is factually false against its own PAGES array.
> 
> Provenance confirmed as Run A survival: `grep -n 'two pages' 2026-08-31_kg-workflows-run-a.mjs` returns the same seven sentences at 1039/1478/1492/1533 (+614/692/713/1179) — one-for-one with the child, offset by 17 lines. Not coincidental phrasing; unedited inheritance.
> 
> Prompt ownership verified by scanning forward to the nearest `label:` — :1022 sits in `verify:<page>:ownership` (:1028, phase Verify, the second refuter); :1461 and :1475 sit in `critic:completeness` (:1489, opus/xhigh); :1516 sits in `critic:correctness` (:1540, opus/xhigh). The finding's routing is right.
> 
> PER-LINE ADJUDICATION — 3 of 4 survive, 1 is a false positive.
> 
> :1461 CONFIRMED. Context (`sed -n '1455,1465p'`): item 3 RAW &lt;table&gt; SWEEP, "for every file plausibly related to these two pages." "These two pages" unambiguously means the run's pages. There is one. Real.
> 
> :

> **refuter verdict:** refuted=False conf=high severity=low
> fix: Apply only three of the four edits, and trim the fourth.  :1022 - DO NOT CHANGE. "two pages" there is indefinite and correct (the hazard is two page NODES flattening into one); the parent script carries the identical sentence. "two surfaces" would collide with this script's reserved meaning of "surface" (Authorized Approver List / User Administration / employee import).  :1461 - as proposed: '    related to this page. For each hit, decide: settings table (must be captured) or'  :1475 - as proposed: '    this page. Any variant document that was built from the wrong twin is a real defect: the PO
> Commands run and what they showed.
> 
> 1) `grep -n "two pages|both pages|each page|Feature Hierarch|TWO" 2026-09-01_kg-authorized-approval-limits.mjs` and `sed -n '95,120p'` — `const PAGES` (104-112) holds exactly ONE entry (id 'authorized-approval-limits'). So "the two pages" is factually false for this run. Observation granted.
> 
> 2) `sed -n '1022p;1461p;1475p;1516p'` confirms all four evidence strings verbatim.
> 
> 3) CONTEXT READ of 1000-1035: :1022 sits in refuter 2 item 5 (SUB-PAGE / SEPARATE TOOL): "Does this control actually live on a separate page reached FROM this one ... flag it explicitly so the graph does not / silently flatten two pages into one." That is INDEFINITE "two pages" - the generic hazard of two distinct page nodes collapsing - not a reference to this run's page count. `grep -n "two pages" 2026-08-31_kg-workflows-run-a.mjs` shows :1039 byte-identical in the parent, i.e. it was equally generic there. :1022 is a FALSE POSITIVE inside the finding.
> 
> 4) `grep -n "surface"` shows the script reserves "surface" for the three-setter concept (lines 59, 62, 1264, and 1282). Rewriting :1022 to "two surfaces into one" blurs exactly the page-hood vs same-value-different-surface line this run exists to draw. The proposed :1022 fix is a mild regression, not a fix.
> 
> 5) CONSEQUENCE. `sed -n '1530,1588p'` — both critics only "Write a thorough markdown critique to PARTS/critic-*.md" and return a receipt; the script returns a summary and applies nothing. Corrections reach output/k

---

## [medium] The Critic-input log line hardcodes "across 2 pages"

**id:** `log-hardcodes-two-pages`  **auditor:** tabs-chain / schemas / script-executability  **split-vote:** False

**where:** workflows/2026-09-01_kg-authorized-approval-limits.mjs:1423

**evidence:**

```
grep -n 'across 2 pages' →
1423:log('Critic input: ' + digest.reduce((a, d) => a + d.fieldCount, 0) + ' fields across 2 pages; ' + uncitedTotal + ' must-read files never cited')
Every other derived value in the same region is correctly computed from `digest` / `built`: :1149 rosterList, :1393 digest, :1422 uncitedTotal, :1546-1587 return.
```

**why it matters:** The only hardcoded count left in executable code. It cannot throw, but the run journal — which is what a human reads afterward to decide whether the build went well, and which bin/assemble-parts.py:nav_from_journal parses — will assert two pages for a one-page run. Given that the surrounding prompts also claim two pages, a reader scanning the log has no signal that the run was correctly scoped.

**proposed fix:** Line 1423 →
log('Critic input: ' + digest.reduce((a, d) => a + d.fieldCount, 0) + ' fields across ' + digest.length + ' page' + (digest.length === 1 ? '' : 's') + '; ' + uncitedTotal + ' must-read files never cited')

> **refuter verdict:** refuted=False conf=high severity=low
> fix: As proposed — the replacement line is verified correct. Line 1423 →  log('Critic input: ' + digest.reduce((a, d) => a + d.fieldCount, 0) + ' fields across ' + digest.length + ' page' + (digest.length === 1 ? '' : 's') + '; ' + uncitedTotal + ' must-read files never cited')  Drop the whyItMatters clause "and which bin/assemble-parts.py:nav_from_journal parses" — that function skips any journal record that is not a type=='result' with a pages[] carrying navPathEvidence, so it never sees this line. Keep the human-reader justification.
> OBSERVATION — fully reproduced, exact.
> 
> `grep -n 'across 2 pages' /mnt/c/Users/manci/PROJECTS/concur-config-diver-support/workflows/2026-09-01_kg-authorized-approval-limits.mjs` returns exactly one hit, at the stated line, byte-for-byte as quoted:
> 1423: log('Critic input: ' + digest.reduce((a, d) => a + d.fieldCount, 0) + ' fields across 2 pages; ' + uncitedTotal + ' must-read files never cited')
> 
> Every supporting line number in the evidence block also checks out via `sed -n`:
> - 1148 `const built = (perPage || []).filter(Boolean)` / 1149 `const rosterList = built.map(...)`
> - 1391 `phase('Critic')` / 1393 `const digest = built.map((b) => {`
> - 1422 `const uncitedTotal = digest.reduce((a, d) => a + d.mustReadNeverCited.length, 0)`
> - 1546-1587 the `return {` block, all values derived from `built` / `digest`.
> 
> IT IS WRONG FOR THIS RUN. `sed -n '104,150p'` shows `const PAGES = [ … ]` holds exactly ONE entry (id `authorized-approval-limits`). `built = (perPage || []).filter(Boolean)` and `digest = built.map(...)` therefore give `digest.length <= 1`, never 2.
> 
> IT IS INHERITED, NOT INVENTED. `grep -n 'Critic input' 2026-08-31_kg-workflows-run-a.mjs` → line 1440, the identical string. In Run A "2 pages" was TRUE (Workflows + Feature Hierarchies). This is verbatim Run A survivorship, same class as the prompt-text findings.
> 
> IT IS THE ONLY ONE OF ITS KIND. `grep -n 'log(' on the file returns 10 call sites (590, 729, 909, 912, 1041, 1042, 1152, 1386, 1423). Line 590 already reads `log('Au

> **refuter verdict:** refuted=False conf=high severity=cosmetic
> fix: As proposed — verified to run correctly. Line 1423 becomes:  log('Critic input: ' + digest.reduce((a, d) => a + d.fieldCount, 0) + ' fields across ' + digest.length + ' page' + (digest.length === 1 ? '' : 's') + '; ' + uncitedTotal + ' must-read files never cited')  One correction to the finding's rationale to carry forward: strike the claim that bin/assemble-parts.py:nav_from_journal parses this line. It parses only journal entries with type=='result' whose result.pages[] carries navPathEvidence (bin/assemble-parts.py:80-105); log lines are skipped. The justification for the fix is journal re
> OBSERVATION CONFIRMED, CONSEQUENCE MATERIALLY OVERSTATED.
> 
> 1) The defect is real and the run is genuinely one page.
> `grep -n 'across 2 pages' /mnt/c/Users/manci/PROJECTS/concur-config-diver-support/workflows/2026-09-01_kg-authorized-approval-limits.mjs`
> → only :1423. `awk 'NR>=104 && NR<=125' ... | grep -n "id:\|^\]"` shows PAGES (line 104) closes at line 111 with exactly ONE entry (`id: 'authorized-approval-limits'`, line 106). `built = (perPage||[]).filter(Boolean)` at :1148 and `digest = built.map(...)` at :1393 therefore both have length 1, so the line will print "7 fields across 2 pages" for a 1-page run. It is inherited boilerplate: the identical string exists at 2026-08-31_kg-workflows-run-a.mjs:1440 and 2026-08-31_kg-group-3.mjs:1324, both genuine 2-page builds. The author already fixed the sibling log at :590 ("mapping 1 page"), which shows the intent and that :1423 was simply missed.
> 
> 2) THE STATED HARM MECHANISM IS FALSE — I refute that half.
> The finding claims "bin/assemble-parts.py:nav_from_journal parses" this line. It does not. `sed -n '80,106p' bin/assemble-parts.py` shows nav_from_journal iterates journal lines, keeps only `d.get('type') == 'result'` whose `result` is a dict carrying a `pages` list in which some element has `navPathEvidence`, and returns `{page.id: page}`. It never reads log text; a log line has no `pages[]` and would be skipped by the `type != 'result'` continue. So there is NO parser consumption path. Do not propagate that claim.
> 
> 3) No gra

---

## [low] PRESERVE: the NBSP navigation hazard in the Map prompt is correct and more load-bearing here than in Run A

**id:** `preserve-nbsp`  **auditor:** stale-content-audit / 2026-09-01_kg-authorized-approval-limits.mjs  **split-vote:** False

**where:** workflows/2026-09-01_kg-authorized-approval-limits.mjs:640-642

**evidence:**

```
:640-642 'NBSP HAZARD: ~40% of nav sentences in this corpus have NO ">" glyph at all - the separators are U+00A0 U+00A0. Never grep -F across a menu arrow; run BOTH separator forms or declare the census incomplete.'
This page's paths DO use the arrow (cat -A on user-administrator-fcfd570c.md lines 32/51 shows literal '>'), but the page has only click-path knowledge and no URL, so a nav census that misses an NBSP-form attestation loses navigation evidence outright.
```

**why it matters:** A cleanup pass that deletes the whole :612-642 block as 'Workflows residue' would take this with it. It is not residue — it is a corpus-wide fact and it guards the single most important output of this run's Map phase.

**proposed fix:** Keep :640-642 verbatim. When rewriting :612-639, terminate the replacement immediately above line 640.

> **refuter verdict:** refuted=False conf=high severity=medium
> fix: As proposed — keep :640-642 verbatim and terminate any rewrite of :612-639 immediately above line 640 — with one addition to the rationale so a later editor does not re-delete it: the justification is not just "corpus-wide fact", it is that admin-guides/assigning-the-approver-for-the-purchase-request-user-20294611.md:27 carries a deeper NBSP-only click path into this page's own surface ("Administration<NBSP><NBSP>Company Administration<NBSP><NBSP>User Administration (Search & Select)<NBSP><NBSP>Expense and Invoice Settings<NBSP><NBSP>Approver") with zero '>' glyphs, plus a "Company" vs "Compan
> REPRODUCED, every claim, with commands.
> 
> 1) The text exists verbatim at the stated lines.
> `awk 'NR>=637&&NR<=645' 2026-09-01_kg-authorized-approval-limits.mjs` →
> 640| 'NBSP HAZARD: ~40% of nav sentences in this corpus have NO ">" glyph at all - the separators are',
> 641| 'U+00A0 U+00A0. Never grep -F across a menu arrow; run BOTH separator forms or declare the census',
> 642| 'incomplete.',
> `diff <(sed -n '640,642p' <2026-09-01>) <(sed -n '657,659p' <2026-08-31 Run A>)` → IDENTICAL. So it is inherited Run A text, exactly as the finding frames it.
> 
> 2) The boundary the proposed fix relies on is clean. :639 ends a complete sentence ("Record the majority form and the disagreement.") and is the last line of the Workflows-specific nav-contradiction block; :640 opens a new, self-contained topic; :643 is ''. Terminating a rewrite of :612-639 immediately above :640 is mechanically valid — no grammatical or array-syntax dependency crosses the seam.
> 
> 3) The corpus fact asserted at :640 is TRUE. Careless `grep -P '\xc2\xa0'` returns 0 corpus-wide (a locale artifact — this is itself the hazard). Byte/codepoint scan in python3 over all 2,230 .md files finds 1,983 U+00A0. Census of lines containing "Administration": 109 carry a '>' glyph, 75 carry U+00A0 and NO '>' at all → 75/184 = 41%, matching "~40%". Sample: access-email-reminders-96f3ca18.md:27 "Select Administration<NBSP><NBSP>Invoice."
> 
> 4) The finding's own supporting observation is TRUE. `awk 'NR==32||NR==51'` on admin-guides/user-admi

> **refuter verdict:** refuted=False conf=high severity=low
> fix: As proposed — keep :640-642 verbatim and terminate the :612-639 replacement immediately above line 640.  Optional strengthening (an addition, NOT a substitution — do not drop the general statement, it is corpus-wide true at 36.8%): append one page-specific sentence after :642 so the Map agent knows the hazard is live here rather than inherited, e.g. "Live on this page: `grep -F 'Administration > Company'` returns 7 files but MISSES two NBSP-only ones — assigning-the-approver-for-the-purchase-request-user-20294611.md (a distinct five-segment path Administration/Company Administration/User Admin
> I attacked this on consequence and it held on every axis.
> 
> 1) LINES 640-642 ARE THE SOLE CARRIER OF THE FACT IN THIS SCRIPT.
> `grep -nEi "nbsp|00a0|separator|grep -F|menu arrow|non-break" 2026-09-01_kg-authorized-approval-limits.mjs` returns line 640 as the ONLY hit for the hazard (the other `grep -F` hits at :207/:420/:662/:858/:974/:1081/:1098 are quote-verification instructions, unrelated). `grep -cP '\xc2\xa0'` on the script returns 0, so there is no literal-NBSP example anywhere else either. The seeds brief at :109 mentions "grep -F verified" twice but never warns about the separator. Delete :640-642 and the fact is gone from the run, not merely relocated. That makes the "cleanup deletes the whole :612-642 block" scenario a live risk, not a speculative one — the main agent has already committed to rewriting :612-639.
> 
> 2) THE ~40% CLAIM IS TRUE CORPUS-WIDE, NOT A RUN A ARTIFACT.
> Python census over all .md under /mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE: `Administration\s*>\s*` = 108 occurrences (89 files); `Administration\xa0` = 63 occurrences (57 files). NBSP share = 36.8%. The "~40%" in the prompt is accurate. This is a property of the corpus, so it transfers to any page, including this one.
> 
> 3) IT IS CONCRETELY LOAD-BEARING FOR *THIS* PAGE'S NAV CENSUS — the finding under-sells itself.
> The auditor conceded "this page's paths DO use the arrow" and rested on a generic argument. The corpus is harder than that. For this page's own path prefix:
>   * `grep -rlF 

---

## [low] PRESERVE: the accumulated method must survive the cleanup — name it explicitly so a fix does not thin it

**id:** `preserve-method`  **auditor:** stale-content-audit / 2026-09-01_kg-authorized-approval-limits.mjs  **split-vote:** False

**where:** workflows/2026-09-01_kg-authorized-approval-limits.mjs:166-246, :253-498, :770-859, :904-1034 (minus 1023-1025), :1061-1137, :1192-1215, :1313-1330, :1350-1353, :1443-1540 (minus the arity fixes)

**evidence:**

```
Load-bearing blocks confirmed present and correct: PREAMBLE blind-build constraint (:187-203), GROUNDING (:205-211), the nine HARD-WON RULES (:213-229); all seven JSON schemas (:253-498); FILE_SHAPE incl. the contradiction/range node rules (:770-859, esp. :835-847); the three-way disposition (:922-931) and refuter calibration (:933-941) and verbatimVariantIndex rule (:950-954); refuter 1's eight grounding checks (:971-988); the Repair hard cap 'AT MOST ONE RECORD PER INPUT' (:1068-1077) and assemble-programmatically rule (:1093-1098); the appliesToField rule (:1192-1200); the contradiction grounding/do-not-reconcile rules (:1313-1330); the ConfigStep rationale rule (:1350-1353); both critics' numbered checklists.
Model tiers also correct: LENSES sonnet/opus/opus (:117, :132, :150), refuters opus/high (:992, :1030), Repair opus/high (:1141), synth opus/high (x4), critics opus/xhigh (:1489, :1540).
Toolchain verified compatible: merge-group.py:28-34 ALL_GROUPS already contains 'Approval Authority'; assemble-parts.py:131 slug() is defined and :141-153 group_tag() falls through to slug for a non-'Group N' label -> 'grpapproval-authority-', matching :1366-1367, :1375 and :1528. No patchPage in the return (:1546-1588), correct for a NEW label.
```

**why it matters:** The handoffs are emphatic that this accumulated method is what makes the pipeline produce a validator-clean graph, and the temptation when fixing 15 stale passages is to rewrite whole prompt blocks. Every rule listed above is a defect the project already paid for once.

**proposed fix:** Make the fix surgical: edit only the line ranges named in the other findings. Do not touch :166-246 except :240-241; do not touch :253-498, :770-859, :1061-1137 at all. After editing, re-run the diff against Run A and confirm the ONLY new hunks are the ones listed in this audit.

> **refuter verdict:** refuted=False conf=high severity=low
> fix: As proposed, with three sharpenings that cost nothing and prevent the exact damage this finding exists to prevent:  1. Name the arity lines explicitly instead of "minus the arity fixes". Inside :1443-1540 the only lines needing an arity edit are :1461 ("related to these two pages"), :1475 ("variants of these two pages") and :1516 ("across the two pages"). Everything else in both critic checklists stays.  2. Add an explicit DO-NOT-TOUCH list for text that looks stale but is not, because the natural fix instinct is to grep for "Group 3" / "two pages" and replace: :1022 ("silently flatten two pag
> I reproduced every evidentiary claim mechanically; all survive.
> 
> PREAMBLE: `sed -n` at :187-203, :205-211, :213-229 shows the blind-build constraint, GROUNDING, and exactly nine hard-won rules as described. Stronger than claimed: `diff <(awk '/^const PREAMBLE = \[/,/^\].join/' 2026-08-31_kg-workflows-run-a.mjs) <(awk ... 2026-09-01_kg-authorized-approval-limits.mjs)` returns EMPTY — the PREAMBLE is byte-identical to Run A, which also independently confirms :240-241 ("For BOTH Group 3 pages") is stale and correctly carved out.
> 
> Schemas: `awk '/^const [A-Z_]*SCHEMA/'` finds exactly seven in 253-498 (NAV 253, INVENTORY 311, EXTRACT_RECEIPT 369, VERDICT 398, REPAIR_RECEIPT 430, SYNTH_RECEIPT 463, CRITIC_RECEIPT 477) and none outside. Content-aligned diff of the section vs Run A: IDENTICAL. (Note the two files are offset by exactly 17 lines — a naive same-line-number diff is misleading and I discarded that first attempt.)
> 
> Prompt blocks all confirmed verbatim at the stated lines: FILE_SHAPE :770-859 incl. contradiction/range rules :835-847; three-way disposition :922-931; refuter calibration :933-941; verbatimVariantIndex :950-954; refuter 1's eight numbered grounding checks :971-988; Repair "AT MOST ONE RECORD PER INPUT" :1068-1077; assemble-programmatically :1093-1098; appliesToField :1192-1200; contradiction grounding + DO NOT RECONCILE :1313-1330; ConfigStep rationale :1350-1353.
> 
> Model tiers exact via `grep -n "model:\|effort:"`: :117 sonnet/high, :132 opus/high, :150 opus/me

> **refuter verdict:** refuted=False conf=high severity=low
> fix: As proposed, with two amendments.  (1) Correct the preserved boundary from :1313-1330 to :1314-1330. Line 1313 opens with "and a Chromium driver matches on labels." — the tail of the stale C1-C5 sentence that begins at 1312. Whichever finding removes the :1307-1312 Workflows-contradictions block must also strike that leading clause from 1313, leaving the sentence starting at "Two records are the same node when they are about the same disagreement:" intact.  (2) Replace the eyeball re-diff with a mechanical guard. Before editing, the do-not-touch ranges hash as follows (md5, first 12 chars, com
> I attacked this on the consequence lens and it survives, though it is a guardrail rather than a defect.
> 
> FACTUAL VERIFICATION — every line citation in the evidence block checks out:
> `grep -n "GOVERNING CONSTRAINT: BLIND BUILD\|=== GROUNDING\|HARD-WON RULES\|TEXT TRAPS\|^const PREAMBLE\|^const LENSES\|^const jstr"` returns PREAMBLE=166, blind-build=187, GROUNDING=205, HARD-WON RULES=213, TEXT TRAPS=231, jstr=248 — the :166-246 / :187-203 / :205-211 / :213-229 anchors are exact.
> `grep -n "SCHEMA"` returns the seven schemas at 253, 311, 369, 398, 430, 463, 477; `sed -n '477,500p'` shows CRITIC_RECEIPT_SCHEMA closing at 497 — :253-498 is exact.
> `sed -n '765,775p'` and `sed -n '855,862p'` bound FILE_SHAPE at exactly 770-859.
> `sed -n '920,942p;948,956p;969,990p;1190,1202p;1311,1332p;1348,1355p'` confirms the three-way disposition at 922-931, refuter calibration at 933-941, verbatimVariantIndex at 950-954, refuter 1's eight numbered grounding checks at 971-988, the appliesToField rule at 1192-1200, the do-not-reconcile rules, and the ConfigStep rationale rule — all present and all correct in content.
> `sed -n '117p;132p;150p;992p;1030p;1141p;1489p;1540p'` confirms sonnet/opus/opus, opus/opus, opus, and both critics at opus+xhigh.
> 
> TOOLCHAIN CLAIMS — all true, and this is the part that would have been a false negative if wrong:
> `sed -n '20,40p' bin/merge-group.py` shows ALL_GROUPS at 28-34 with `'Approval Authority',` on line 30.
> `sed -n '125,160p' bin/assemble-parts.py` shows `def sl

---

## [low] PRESERVE and STRENGTHEN: the seeds string and the script header are the two things that are genuinely right

**id:** `preserve-seeds`  **auditor:** stale-content-audit / 2026-09-01_kg-authorized-approval-limits.mjs  **split-vote:** False

**where:** workflows/2026-09-01_kg-authorized-approval-limits.mjs:1-80 (header), :109 (seeds)

**evidence:**

```
Every mechanical claim in the seeds and header verifies:
  file sizes: fcfd570c 4603 B, 8b167b96 2314 B, 06806875 2038 B, 8b3be88b 1213 B, 9d98b489 988 B — all exact.
  zero tables: grep -c '<table' and grep -cP '^\s*\|' both 0 on all five.
  anchors grep -Fc = 1: 'The Authorized Approval Limits window appears.'; 'the user must have the User Admin rights and the Invoice User Administration rights'; 'then the Authorized Approval Limits link appears in the Expense and Invoices Setting section'; 'The amount is set for each approver in the Authorized Approver List, in User Administration, or in the employee import.'; 'This includes options such as workflow rules and Authorized Approvers.'
  the roughly-seven estimate is exactly right: reading user-administrator-fcfd570c.md yields Authorized Approver check box, Manager Approval Limit, Approval Limit Currency (Global-only branch) + hierarchy Level selector, Can approve exception, currency, Amount (windowed branch) = 7.
  group-label reasoning at :70-77 matches merge-group.py:28-34 and :57 exactly.
```

**why it matters:** The seeds carry the CENTRAL JUDGEMENT paragraph — the only place in the whole script that names the four colliding Workflows fields to a working agent. Because ALREADY_BUILT omits Workflows, the seeds are currently the sole line of defence against a duplicate. They must not be shortened, and the fix to ALREADY_BUILT should reinforce rather than replace them.

**proposed fix:** Leave :1-80 and :109 substantially intact. Two additions only: (a) the value-semantics amendment in finding 'seeds-understate-collision'; (b) append the precedence rule's exact bytes so no agent greps it with hyphens — ' ### THE PRECEDENCE RULE IS AVAILABLE VERBATIM AND USES EM DASHES (U+2014), NOT HYPHENS: "The cost object configuration defines the type—either limit or level. If you complete both areas in this window—the Approval Limit area and the Level field—Concur Invoice will use the one that applies to your configuration and ignore the other." (user-administration-8b167b96.md). grep -F it with the em dashes or it will not verify.' Also correct the seeds' role-gate clause to note the THIRD condition: fcfd570c adds "In addition, the employee must be an approver." for the LINK (not for the check box).

> **refuter verdict:** refuted=False conf=high severity=low
> fix: As proposed, with one amendment to the rationale and one sharpening.  1. Keep :1-80 and :109 substantially intact. Do not shorten the seeds. When ALREADY_BUILT (:554-584) is rewritten by the other findings, the rewrite must ADD to the collision warning, not replace it — the four Workflows field ids appear in agent-visible text only at :109.  2. Append to the seeds, after the "PRECEDENCE RULE" sentence: ' ### THE PRECEDENCE RULE IS AVAILABLE VERBATIM AND USES EM DASHES (U+2014), NOT HYPHENS: "The cost object configuration defines the type—either limit or level. If you complete both areas in thi
> I reproduced every mechanical claim in the finding. Nothing failed.
> 
> LOCATIONS CONFIRMED
> - Header comment block is lines 1-80 (`grep -n '^// ===='` returns 1 and 80). Group-label reasoning is lines 70-78 (finding said :70-77; line 77 is the last substantive line, 78 is blank). Seeds are line 109 (`grep -n "seeds:"` → 109). Finding's `where` is accurate.
> 
> FILE SIZES / TABLE CENSUS — all five exact, all zero tables:
>   configuration-8b3be88b.md 1213 B, definition-of-amount-for-limit-approval-06806875.md 2038 B, setting-an-unlimited-approval-amount-9d98b489.md 988 B, user-administration-8b167b96.md 2314 B, user-administrator-fcfd570c.md 4603 B — `wc -c` matches the seeds byte-for-byte. `grep -c '<table'` and `grep -cP '^\s*\|'` both return 0 on all five (seeds only claimed the two primaries; it is true of all five).
> 
> ANCHORS — every one `grep -Fc` = 1:
>   'The Authorized Approval Limits window appears.' (1 in fcfd570c, 1 in 8b167b96); 'the user must have the User Admin rights and the Invoice User Administration rights' (fcfd570c:38); 'then the Authorized Approval Limits link appears in the Expense and Invoices Setting section' (fcfd570c:51); 'The amount is set for each approver in the Authorized Approver List, in User Administration, or in the employee import.' (configuration-8b3be88b.md); 'This includes options such as workflow rules and Authorized Approvers.' (tools-guides/workflow-and-approval-routing-8b4ff6c9.md).
> 
> SEVEN-FIELD ESTIMATE — confirmed by reading fcfd570c end to en

> **refuter verdict:** refuted=False conf=high severity=low
> fix: KEEP the preserve directive: leave :1-80 and :109 substantially intact. Every mechanical claim in them verifies, merge-group.py already carries 'Approval Authority' in ALL_GROUPS, and with ALREADY_BUILT (:554-583) omitting Workflows entirely, the seeds at :109 are the only place a working agent learns about the four colliding controls. Do not shorten them; the fix to ALREADY_BUILT must reinforce, not replace, them.\n\nMAKE ONE EDIT, NOT THREE.\n\nKEEP: (c), the role-gate correction — this is the only part that changes the graph. Replace the seeds' clause `### ROLE GATE, verbatim: "the user mus
> MECHANICAL CLAIMS — ALL VERIFIED.\n\n1) File sizes (stat -c%s over the five seeds in concur-invoice-professional-edition-admin-guides/): 4603 user-administrator-fcfd570c.md, 2314 user-administration-8b167b96.md, 2038 definition-of-amount-for-limit-approval-06806875.md, 1213 configuration-8b3be88b.md, 988 setting-an-unlimited-approval-amount-9d98b489.md. All exact.\n\n2) Table census: for each of the five, `grep -c '<table'` = 0 and `grep -cP '^\\s*\\|'` = 0. The seeds' "ZERO raw <table> ... ZERO markdown table rows" is true, and true for all five, not just the two primaries it claims.\n\n3) Anchors: grep -rFl found each of the five verbatim strings. Four resolve to exactly one file. ONE SLIP in the finding's evidence: "The Authorized Approval Limits window appears." hits TWO files (fcfd570c and 8b167b96), not one. Does not change disposition.\n\n4) Seven-field estimate: reading fcfd570c end to end gives Global-only branch = Authorized Approver check box + Manager Approval Limit + Approval Limit Currency; hierarchy branch = level selector (left side) + Can approve exception + currency + Amount. Exactly 7. Correct.\n\n5) Group-label reasoning at :70-77: bin/merge-group.py ALL_GROUPS (lines ~29-34) already lists 'Approval Authority' as its own entry alongside 'Workflows', and :57 is `gnum = re.search(r'Group (\\d+)', group); gtag = gnum.group(1) if gnum else slug(group)`. The header's gtag/collision argument matches the code exactly.\n\n6) "Seeds are the sole line of defence": g

---

## [low] apply-corrections.py writes the literal string `"None"` into its own correction note; 13 value sets in the SHIPPED graph already carry it

**id:** `correction-note-writes-literal-none`  **auditor:** toolchain-code-path-audit  **split-vote:** True

**where:** bin/apply-corrections.py:293-294 (compare the correct expression at :282)

**evidence:**

```
Line 282 reads the owner correctly: `want = _norm((v.get('appliesToRef') or {}).get('field') or v.get('appliesToField'))`. Lines 293-294 then read only the key that merge-group never stores:
```
        note = ('Wired 2026-08-31 by normalised name match: the extractor wrote the field label '
                '"%s" where the schema wants the field name "%s".' % (v.get('appliesToField'), pick['name']))
```
merge-group.py:156-167 emits `appliesToRef`, `context`, `contextFieldRef`, `values`… and no `appliesToField`, so `v.get('appliesToField')` is always None. Observed in my sandbox run: `Wired 2026-08-31 by normalised name match: the extractor wrote the field label "None" where the schema wants the field name "level".` Already live:
  $ python3 -c "..." -> value sets carrying the broken note: 13  (e.g. vset.g5.data-type.unnamed, vset.g5.control-type.options-offered-for-control-type-are-keyed-to-the-value-chos)
```

**why it matters:** The note is the ONLY audit trail explaining why a value set changed owner, and it is the thing a human reads when checking whether wire_by_name guessed right — the exact review that finding `wire-by-name-cross-page` above depends on. Saying the extractor wrote the label "None" destroys the one fact that makes the correction reviewable, and this run will mint more of them.

**proposed fix:** In bin/apply-corrections.py replace `% (v.get('appliesToField'), pick['name'])` on line 294 with:
```
                % ((v.get('appliesToRef') or {}).get('field') or v.get('appliesToField'), pick['name'])
```

> **refuter verdict:** refuted=False conf=high severity=low
> fix: The proposed one-line change is correct — apply it verbatim at bin/apply-corrections.py:294:      % ((v.get('appliesToRef') or {}).get('field') or v.get('appliesToField'), pick['name']))  (Cleaner alternative, since :282 already computes this expression only to normalise it: hoist the raw label once above :282 — `raw = (v.get('appliesToRef') or {}).get('field') or v.get('appliesToField')`; `want = _norm(raw)` — then use `raw` at :294. Same behavior, removes the duplicated expression that caused the drift.)  But add the step the finding omits, or the 13 shipped notes stay corrupt forever: the :
> REPRODUCED IN FULL — every stated location, the mechanism, and the live count.
> 
> 1. The two lines exist exactly as claimed.
> `grep -n "appliesToField\b" bin/apply-corrections.py`:
>   282: `want = _norm((v.get('appliesToRef') or {}).get('field') or v.get('appliesToField'))`  <- correct owner read
>   294: `'"%s" where the schema wants the field name "%s".' % (v.get('appliesToField'), pick['name']))`  <- reads only the key that is never stored
> (307 and 364 also use the correct `appliesToRef`-first form; 294 is the lone outlier.)
> 
> 2. The key really is never stored on the node. `sed -n '154,167p' bin/merge-group.py` emits `id, group, patch, appliesToFieldId, appliesToRef{page,field,resolved}, context, contextFieldRef, values, sourceQuote, sourceFile, notes` — no top-level `appliesToField`. Confirmed against the shipped graph, not just by reading: of 114 value sets, `sum(1 for v in vs if 'appliesToField' in v)` = **0**. So `v.get('appliesToField')` at :294 is unconditionally None. (`assemble-parts.py:226` does set the key, but that is the pre-merge part record; merge-group does not carry it through.)
> 
> 3. Executed both versions on identical input via importlib, exercising the real `wire_by_name`:
>   UNPATCHED -> `...the extractor wrote the field label "None" where the schema wants the field name "level".`
>   PATCHED (proposed fix, in a scratchpad copy) -> `...the field label "Level" where the schema wants the field name "level".`
> The proposed one-line fix is correct and produces the inten

> **refuter verdict:** refuted=True conf=high severity=cosmetic
> fix: Optional, not a pre-run blocker. If you touch bin/apply-corrections.py for another reason, the proposed one-liner at line 294 is correct as written — replace `% (v.get('appliesToField'), pick['name'])` with `% ((v.get('appliesToRef') or {}).get('field') or v.get('appliesToField'), pick['name'])` — and while there, the hardcoded "Wired 2026-08-31" on line 293 should become a run date too. Do NOT do it as part of this run's critical path, and do not expect it to repair the 13 shipped notes: line 280's `if v.get('appliesToFieldId'): continue` skips every already-wired set, so those stay broken un
> The OBSERVATION is 100% correct and I confirmed every part of it. The CONSEQUENCE claim is what fails.
> 
> Confirmed facts:
> - `sed -n '278,297p' bin/apply-corrections.py` — line 282 reads the owner correctly via `(v.get('appliesToRef') or {}).get('field') or v.get('appliesToField')`; line 294 reads only `v.get('appliesToField')`.
> - `grep -n "'appliesToField'" bin/merge-group.py` — merge-group.py:155/157/160 uses `appliesToField` only as an INPUT key from the synth JSON and stores it as `appliesToRef.field`; it never emits a top-level `appliesToField` on the node.
> - `python3 ... output/kg-invoice-config.json` — `any node with top-level appliesToField key: 0` (of 114 value sets), and `total broken-note sets: 13`. So `%s` renders literally "None". Observation upheld.
> 
> Why it does not matter for this run:
> 
> 1. NO WRONG NODE, NO CRASH. The wiring decision (`appliesToFieldId`, line 291) is computed from the CORRECT expression at line 282. Only the prose string on line 293-294 is affected. Nothing downstream parses `notes` on a value set: `grep -n notes bin/validate-graph.py` returns exactly one hit, line 81, and `sed -n '70,95p'` shows that blob is built from `f.get('notes')` inside the configFields loop only — value-set notes are never read by the validator, and "None" cannot match SELECTOR anyway. validate-graph.py exit 0 is untouched.
> 
> 2. THE "ONLY AUDIT TRAIL" CLAIM IS FALSE — nothing is destroyed. The fact the note is supposed to carry sits verbatim on the same node, twice. Dumpin

---

## [low] NAV_SCHEMA in the script under audit still declares no `tabs` under `additionalProperties: false` — link 1 of the three-link tabs chain is NOT fixed, contradicting the comment that says it is

**id:** `nav-schema-still-cannot-emit-tabs`  **auditor:** toolchain-code-path-audit  **split-vote:** True

**where:** workflows/2026-09-01_kg-authorized-approval-limits.mjs:253-309 (esp. :255 and :264-303); the claim it contradicts is bin/apply-corrections.py:487-490; the two downstream links are bin/assemble-parts.py:196-203 and bin/merge-group.py:110-119

**evidence:**

```
Extracting both NAV_SCHEMA blocks programmatically: `NAV_SCHEMA IDENTICAL | lenA 2208 lenB 2208` — the script under audit carries Run A's schema byte for byte, with `additionalProperties: false` at :255 and no `tabs` / `tabsSourceQuote` / `tabsSourceFile` property. Confirmed empirically against Run A's real journal: recovered pages carry keys `['aliases','coverageGuess','documentedBasis','id','identityNotes','name','navPathEvidence','roleGates','uiVariant']` — `tabs key present? False` for both. assemble-parts.py:196-200 documents the hazard exactly ("a page's tabs die silently if any one of them drops the key") and apply-corrections.py:489-490 asserts "the workflow schema is fixed for Run B" — it is not fixed in this script, which is the next run.
```

**why it matters:** For THIS page the impact is probably nil — a single modal window with no documented tab strip — so it is not a reason to hold the run. But it means the pipeline still cannot carry tabs, page.workflows' seven tabs remain hand-injected via apply-corrections.py:491-511, and the very next build (Email Reminders, two tabs; Delegate Configurations, two tabs) inherits a silently lossy schema from this file. Nothing in assemble-parts, merge-group or validate-graph detects an absent tab list.

**proposed fix:** In workflows/2026-09-01_kg-authorized-approval-limits.mjs, inside NAV_SCHEMA's per-page `properties` (after `identityNotes` at :302), add:
```
          tabs: { type: 'array', items: { type: 'string' }, description: 'Tab labels on this page, if the corpus attests any. Empty array if none.' },
          tabsSourceQuote: { type: 'string' },
          tabsSourceFile: { type: 'string' }
```
Leave them out of the `required` list at :263 so a tabless page stays valid.

> **refuter verdict:** refuted=False conf=high severity=low
> fix: As proposed — insert after `identityNotes` at :302 inside NAV_SCHEMA's per-page `properties`, and leave the three keys out of the `required` list at :263 so a tabless page stays valid.  One addition the finding should carry: the same edit pass must also resolve line 632, which still commands "EMIT THE SEVEN TABS AS PAGE-LEVEL DATA - tabs, tabsSourceQuote, tabsSourceFile" (part of the surviving Run A block at :619-634 and the seed text at :569). Fixing the schema without deleting that instruction would take a page with no documented tab strip and invite a fabricated tab list into a page node — 
> REPRODUCED, every link of the chain, against the real files.
> 
> 1. NAV_SCHEMA is byte-identical to Run A's.
> `python3` extracting `const NAV_SCHEMA` → `const INVENTORY_SCHEMA` from both scripts returns `IDENTICAL | lenA 2210 lenB 2210` and `tabs in A? False | tabs in B? False`. (The finding wrote 2208; my slice boundaries differ by two chars. Immaterial — identity is the load-bearing claim and it holds.)
> 
> 2. The stated line numbers are exact. `grep -n` on workflows/2026-09-01_kg-authorized-approval-limits.mjs: `253:const NAV_SCHEMA = {`, `255:  additionalProperties: false,`, `263:  required: ['id','name','documentedBasis','coverageGuess','uiVariant','navPathEvidence','aliases','roleGates','identityNotes']`, `302:          identityNotes: { type: 'string' }`, `311:const INVENTORY_SCHEMA`. `sed -n '253,309p'` shows the per-page `properties` block ending at identityNotes with no `tabs`, `tabsSourceQuote` or `tabsSourceFile`. So link 1 is unfixed exactly as claimed.
> 
> 3. The three downstream links read as quoted. bin/assemble-parts.py:196-203 carries the comment "the chain that carries a page's tabs to the graph has THREE links (NAV_SCHEMA -> here -> merge-group.py) ... a page's tabs die silently if any one of them drops the key. NAV_SCHEMA must also declare `tabs`/`tabsSourceQuote`/`tabsSourceFile` (it sets additionalProperties false, so an undeclared key cannot even be emitted)" and then reads `n.get('tabs')`. bin/merge-group.py:110-119 has tabs in the carry list. bin/apply-correcti

> **refuter verdict:** refuted=True conf=high severity=cosmetic
> fix: DO NOT add tabs/tabsSourceQuote/tabsSourceFile to NAV_SCHEMA in workflows/2026-09-01_kg-authorized-approval-limits.mjs. As long as the Run A order at :632-634 ("EMIT THE SEVEN TABS AS PAGE-LEVEL DATA") survives in the map prompt, `additionalProperties: false` at :262 is the only thing preventing the seven Workflows tab names from being written onto page.authorized-approval-limits. Leave the schema alone for this run; the page is a modal window with zero attested tabs, so a tabless node is the correct node.  Instead, two cheap non-blocking corrections:  (a) Fix the false claim at bin/apply-corr
> OBSERVATION GRANTED, VERIFIED INDEPENDENTLY.
> 
> (1) The schema really is Run A's, byte for byte. Extracting `const NAV_SCHEMA` .. `const INVENTORY_SCHEMA` from both files in python3: `IDENTICAL lenA 2210 lenB 2210`, starting at line 253 in the script under audit and 270 in Run A. `grep -n 'additionalProperties: false'` confirms :255 (top level) and :262 (per-page items). `grep -n tabs workflows/2026-09-01_kg-authorized-approval-limits.mjs` returns 122, 569, 623, 624, 632, 634 — every hit is prose, none is a schema property. So the per-page `properties` block :264-303 genuinely cannot carry `tabs`.
> 
> (2) The claim it contradicts is real. bin/apply-corrections.py:486-489 says verbatim "the workflow schema is fixed for Run B". It is not. That sentence is false, and it is the only defect here with any life left in it — see the corrected fix.
> 
> NOW THE CONSEQUENCE, WHICH IS WHERE THIS FINDING DIES FOR THIS RUN.
> 
> (3) No crash, no wrong node, no validator drift. bin/assemble-parts.py:196-203 writes `'tabs': n.get('tabs') or []`; bin/merge-group.py:116-119 copies the key only `if p.get(key)`. An absent key is absent, silently and correctly. `grep -n tabs bin/validate-graph.py` returns NOTHING, and `python3 bin/validate-graph.py; echo rc=$?` → `rc=0` today. Nothing in the pipeline reads or requires tabs.
> 
> (4) The page has no tabs to lose. `const PAGES` at :104 holds exactly ONE page. Its own seed text quotes the corpus: "The Authorized Approval Limits window appears" — a modal. Grepping a

---

## [low] Employee Import is correctly out of scope as a page, but e28f2294 is the only source for the amount/currency value domains — the blanket exclusion forfeits it

**id:** `employee-import-value-domains`  **auditor:** Independent corpus recon — Authorized Approval Limits / group "Approval Authority"  **split-vote:** True

**where:** script:109 ("Employee Import and the general User Administration surface are OUT OF SCOPE")

**evidence:**

```
employee-import-e28f2294.md:23 — "For the Limit hierarchy type, you will use the 710 Cost Object Approver record set to import the approval limit and the currency."
Its table gives the only documented value domains for the pair: field 15 "Approval Limit" / type "Numeric" / "Specified in the approval limit currency. If used, then Approval Limit Currency Code below is required."; field 16 "Approval Limit Currency Code" / "3 characters" / "Can be either three-digit or three-letter currency code; must be a valid currency in the list of system (reimbursement) currencies".
The out-of-scope rationale is otherwise CONFIRMED — tools-guides/how-single-step-approval-workflow-works-40145f24.md:29 "Assigning the Invoice Approver role: Refer to the Shared: User Administration User Guide." and step-2-assign-the-level-to-the-approver-d8bf669c.md:45 "refer to the Shared: Employee Import Specification." Both defer to external guides absent from this corpus.
```

**why it matters:** The page-scope call is right and should stand. But the brief's phrasing excludes the file wholesale, and it is the only place the corpus states that the currency is a 3-character code constrained to the system reimbursement-currency list, and that the amount is numeric and makes the currency mandatory. Those are exactly the value-domain facts a driver needs, and they describe the same underlying value this page sets.

**proposed fix:** Refine the exclusion in script:109 to: 'Employee Import is OUT OF SCOPE AS A PAGE - it defers to the external Shared: Employee Import Specification, absent from this corpus. But employee-import-e28f2294.md (record set 710 Cost Object Approver) is the ONLY source for the VALUE DOMAINS of the amount/currency pair this page sets - "Numeric", "Specified in the approval limit currency. If used, then Approval Limit Currency Code below is required.", and "3 characters ... must be a valid currency in the list of system (reimbursement) currencies". Cite it for valueDomain and notes on the currency and Amount fields; never emit an employee-import field.'

> **refuter verdict:** refuted=False conf=high severity=low
> fix: Same intent as proposed, but corrected for this schema (there is no `valueDomain` field anywhere in the toolchain) and for what the import doc actually constrains. Replace the exclusion clause at script:109 with:\n\n"Do NOT let it drag in neighbours: the general User Administration surface and Employee Import are OUT OF SCOPE AS PAGES - both defer to external Shared guides absent from this corpus (how-single-step-approval-workflow-works-40145f24.md defers role assignment to the Shared: User Administration User Guide; step-2-assign-the-level-to-the-approver-d8bf669c.md defers to the Shared: Emp
> Reproduced every claim.\n\n1) LOCATION: `grep -n "Employee Import and the general User Administration surface are OUT OF SCOPE" workflows/2026-09-01_kg-authorized-approval-limits.mjs` -> line 109 (the one-line `seeds` string). Verbatim text confirmed: "Do NOT let it drag in neighbours: Employee Import and the general User Administration surface are OUT OF SCOPE - both defer to external Shared guides absent from this corpus. The employee-import half of the three-setter sentence is a forward reference, not a page."\n\n2) CORPUS EVIDENCE: `grep -n` / `sed -n` on employee-import-e28f2294.md confirms L21+L23 (710 Cost Object Approver record set imports "the approval limit and the currency"), L48/52/56 (field 15 / "Approval Limit" / "Numeric"), L64 ("Specified in the approval limit currency."), L66 ("If used, then Approval Limit Currency Code below is required."), L71/75/79 (field 16 / "Approval Limit Currency Code" / "3 characters"), L89 ("Can be either three-digit or three-letter currency code; must be a valid currency in the list of system (reimbursement) currencies").\n\n3) UNIQUENESS HOLDS: `grep -rn "three-digit or three-letter" --include=*.md` over the whole corpus returns exactly ONE hit, e28f2294.md:89. `grep -rn "Approval Limit Currency"` returns 5 hits total; the page primary user-administrator-fcfd570c.md:43 only names the control ("the Manager Approval Limit field and the Approval Limit Currency list appear") and L69 only says "the administrator selects the desired cur

> **refuter verdict:** refuted=True conf=high severity=not-a-defect
> fix: No change to script:109. Leave the exclusion exactly as written — its own clause "a forward reference, not a page" already scopes it to page level, so nothing is actually forfeited, and the proposed edit would (a) target a `valueDomain` key that does not exist in the emit schema (script:781-783) or in any of the 607 built fields, (b) attach a 710-import-record column spec ("3 characters", "three-digit or three-letter currency code", "Currency Code below is required") to a UI dropdown that user-administrator-fcfd570c.md:43/:69 documents as a "list" the admin "selects" from — a wrong instruction
> OBSERVATIONS GRANTED. `sed -n '105,112p' 2026-09-01_kg-authorized-approval-limits.mjs | cat -n` confirms script:109 is the `seeds:` string and contains the exclusion verbatim. `grep -rln "three-digit or three-letter"` and `grep -rln "system (reimbursement) currencies"` over the corpus each return EXACTLY ONE file, admin-guides/employee-import-e28f2294.md; `sed -n '1,60p'` + `grep -n "Approval Limit|710|currency"` confirm line 23 and the 710 record-set table rows at :52/:64/:66/:75/:87/:89 read as quoted. `grep -c "employee-import-e28f2294" output/kg-invoice-config.json` = 0, so the file is genuinely uncited today. The out-of-scope rationale is sound.
> 
> CONSEQUENCE FAILS ON FIVE INDEPENDENT GROUNDS.
> 
> (1) THE FIX NAMES A KEY THAT DOES NOT EXIST. `grep -rn "valueDomain" workflows/2026-09-01_kg-authorized-approval-limits.mjs bin/*.py output/kg-invoice-config.json` returns NOTHING. The emit contract at script:781-783 is fieldType / validValues / sourceQuote / sourceFile / notes; python dump of the 607 built fields gives keys ['fieldType','id','label','name','notes','pageId','sourceFile','sourceGroup','sourceQuote','uiVariant','validValues']. There is no valueDomain slot anywhere in the pipeline. The only two real slots are validValues — which script:782 restricts to "only values the corpus explicitly enumerates" and which script:978 strips as INVENTED otherwise, and "must be a valid currency in the list of system (reimbursement) currencies" enumerates ZERO values — and free-prose `

---

## [low] uiVariant "undifferentiated" is EARNED here and can be stated with evidence rather than as an expectation — with one hedge to record

**id:** `uivariant-undifferentiated-is-earned`  **auditor:** Independent corpus recon — Authorized Approval Limits / group "Approval Authority"  **split-vote:** False

**where:** script:109 ("uiVariant: expect \"undifferentiated\". No *-new-experience-* file exists for this surface")

**evidence:**

```
Filename sweep: 8 variant-marked files exist in the corpus (end-user-experience-new-experience-85c2652b.md, policies-the-purchase-order-policy-new-experience-5a1ba7ef.md, purchase-order-matching-rules-new-experience-6c8fb80f.md, using-the-invoice-manager-page-new-experience-f83ba5fa.md, using-the-unassigned-invoice-page-new-experience-072e2f18.md, configure-custom-audit-rules-legacy-ui-6cb4534e.md, legacy-records-professional-only-8b425e3b.md, comparison-classic-and-current-client-managed-capture-offerings-2fe966db.md) — NONE touches this surface.
Body sweep: grep -rilF 'Authorized Approval Limits' <both dirs>/ | xargs grep -ilE 'new experience|legacy|classic|NextGen' -> ZERO files.
HEDGE — the one variant-adjacent sentence in the control family, tools-guides/how-single-step-approval-workflow-works-40145f24.md:23: "the Invoice Configuration administrator uses the Authorized Approvers link from workflows in the classic interface to establish the amounts for the Invoice Approver." That describes the WORKFLOWS-side sibling, not this window.
```

**why it matters:** The brief flags three unearned "both" claims as outstanding debt and asks the agent not to add a fourth. That is easier to comply with when the negative has been measured rather than merely expected — and the one sentence in the corpus that says "classic interface" about this control family should be recorded as a hedge rather than discovered later and mistaken for evidence of a variant split on this page.

**proposed fix:** Tighten script:109 to: 'uiVariant = "undifferentiated", and this is MEASURED, not assumed: 8 *-new-experience-* / *-legacy-* / *-classic-* files exist in the corpus and none touches this surface; grep -rilF "Authorized Approval Limits" | xargs grep -ilE "new experience|legacy|classic" returns ZERO. ONE HEDGE to record in notes, not to act on: tools-guides/how-single-step-approval-workflow-works-40145f24.md:23 says the amounts are set via "the Authorized Approvers link from workflows in the classic interface" - that is the WORKFLOWS sibling surface, not this window. Do not turn it into a "both" claim.'

> **refuter verdict:** refuted=False conf=high severity=low
> fix: As proposed, with one addition. Replace the tail of script:109 with the auditor's tightened text ('uiVariant = "undifferentiated", and this is MEASURED, not assumed: 8 *-new-experience-* / *-legacy-* / *-classic-* files exist in the corpus and none touches this surface; grep -rilF "Authorized Approval Limits" | xargs grep -ilE "new experience|legacy|classic" returns ZERO. ONE HEDGE to record in notes, not to act on: tools-guides/how-single-step-approval-workflow-works-40145f24.md:23 says the amounts are set via "the Authorized Approvers link from workflows in the classic interface" - that is t
> Every observable claim in the finding reproduced exactly against the real files. Nothing in it is inference dressed as observation.
> 
> 1) The offending text exists at the stated location. `grep -n "uiVariant" /mnt/c/Users/manci/PROJECTS/concur-config-diver-support/workflows/2026-09-01_kg-authorized-approval-limits.mjs` puts it on line 109 (the `seeds` string of the single PAGES entry), ending verbatim: `### uiVariant: expect "undifferentiated". No *-new-experience-* file exists for this surface; do not claim "both" - three unearned "both" claims are already outstanding debt.` Quoted `where` matches character-for-character.
> 
> 2) Filename sweep reproduces, exactly 8 files, exactly the 8 named. From the corpus root, `find . -type f \( -iname '*new-experience*' -o -iname '*legacy*' -o -iname '*classic*' -o -iname '*nextgen*' \)` returns precisely: comparison-classic-and-current-client-managed-capture-offerings-2fe966db.md, configure-custom-audit-rules-legacy-ui-6cb4534e.md, end-user-experience-new-experience-85c2652b.md, legacy-records-professional-only-8b425e3b.md, policies-the-purchase-order-policy-new-experience-5a1ba7ef.md, purchase-order-matching-rules-new-experience-6c8fb80f.md, using-the-invoice-manager-page-new-experience-f83ba5fa.md, using-the-unassigned-invoice-page-new-experience-072e2f18.md. None is an Authorized-Approval-Limits file.
> 
> 3) Body sweep reproduces. `grep -rilF 'Authorized Approval Limits' .` returns exactly two files (admin-guides/user-administration-8b167b9

> **refuter verdict:** refuted=False conf=high severity=medium
> fix: Adopt the proposed fix, but sharpen it so it forbids the failure mode that is actually reachable ("legacy"), not just "both". Replace the closing sentence of script:109 with:  '### uiVariant = "undifferentiated", and this is MEASURED, not assumed: 8 variant-marked files exist in the corpus (*-new-experience-*, *-legacy-*, *-classic-*) and NONE touches this surface; `grep -rilF "Authorized Approval Limits" | xargs grep -ilE "new experience|legacy|classic"` returns ZERO. ONE HEDGE, and you WILL hit it: tools-guides/how-single-step-approval-workflow-works-40145f24.md is one of only two tools-guid
> SURVIVES — and the consequence is stronger than the finding's own "low" framing. Every empirical claim checked out, and the harm path is near-certain rather than speculative.
> 
> 1) The finding's evidence is exact.
> `find . -iname '*new-experience*' -o -iname '*legacy*' -o -iname '*classic*'` under /mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE returns exactly the 8 files named, none touching this surface.
> `grep -rilF 'Authorized Approval Limits' .` returns exactly 2 files (admin-guides/user-administration-8b167b96.md, admin-guides/user-administrator-fcfd570c.md); piping those through `grep -ilE 'new experience|legacy|classic|NextGen'` returns ZERO. So "undifferentiated" is genuinely earned.
> `grep -rn 'classic interface' .` returns exactly ONE line corpus-wide: tools-guides/how-single-step-approval-workflow-works-40145f24.md:23, verbatim "...the Invoice Configuration administrator uses the Authorized Approvers link from workflows in the classic interface to establish the amounts for the Invoice Approver." That is the Workflows-side sibling, exactly as the finding says.
> 
> 2) The consequence path is concrete, and the current script text does NOT block it.
> script:109 currently ends: 'uiVariant: expect "undifferentiated". No *-new-experience-* file exists for this surface; do not claim "both" - three unearned "both" claims are already outstanding debt.' It forbids only "both". The live hazard is "legacy".
> script:109 MANDATES the sweep that finds the hedge: 'ALSO SWEEP for "A

---

## [low] LENS C still carries Run A's tools-guides search terms, which return nothing useful for this page; the three files that do corroborate it are unnamed

**id:** `lens-c-guidance-wrong-for-this-page`  **auditor:** Independent corpus recon — Authorized Approval Limits / group "Approval Authority"  **split-vote:** False

**where:** script:153 (LENS C block)

**evidence:**

```
Script text instructs: 'SIXTEEN tools-guides files say "Invoice Configuration administrator" ... Search that phrase, "(left menu)" and "Invoice Processing Admin", not the word "workflow".'
Measured: grep -rilF 'Invoice Configuration administrator' <tools-guides>/ -> 22 files (not 16), of which only 3 also mention "Authorized Approval Limits" or "User Administration".
The tools-guides files that ACTUALLY corroborate this page, found by sweeping the page's own terms: workflow-and-approval-routing-8b4ff6c9.md (the scope quote, grep -F -c -> 1), how-single-step-approval-workflow-works-40145f24.md ("Approval Limit value" + the Shared-guide deferral + the "classic interface" hedge), before-you-begin-3c458d83.md ("prerequisites required for configuring the feature, including user role, approval limits").
"Invoice Processing Admin" is a Run A middle-nav concept; this page is not under Administration > Invoice at all, so the term cannot help here.
```

**why it matters:** LENS C is the standing guard against admin-guides skew, and this page genuinely is admin-guides-sourced — so the lens's value is entirely in finding the handful of real tools-guides corroborations. Sending it after "Invoice Processing Admin" (a middle nav node this page does not sit under) and an inaccurate file count spends the lens on Run A's map instead of this page's.

**proposed fix:** Replace the FOR THIS GROUP SPECIFICALLY clause at script:153 with: 'FOR THIS GROUP SPECIFICALLY: this page is admin-guides-sourced and is NOT under Administration > Invoice, so "Invoice Processing Admin" is useless here - do not search it. THREE tools-guides files corroborate this page and your job is to exhaust them: workflow-and-approval-routing-8b4ff6c9.md (the non-PO scope sentence), how-single-step-approval-workflow-works-40145f24.md (Approval Limit value for the Invoice Approver, the "classic interface" phrasing, and the deferral to Shared: User Administration User Guide), and before-you-begin-3c458d83.md (prerequisites: user role + approval limits). Search "Approval Limit", "authorized approver", "User Administration" and "approval limits" - NOT "workflow".'

> **refuter verdict:** refuted=False conf=high severity=low
> fix: Replace the "FOR THIS GROUP SPECIFICALLY" clause at script:153 with the following - keeping the 16 count (it is correct case-sensitively), keeping "Invoice Configuration administrator" (it is the one prescribed term that finds a real file), dropping the two dead terms, and REVERSING the anti-"workflow" prohibition:  'FOR THIS GROUP SPECIFICALLY: admin-guides is the FIELD SOURCE and tools-guides is your CORROBORATION sweep, but Run A\'s search map does NOT transfer. This page sits at Administration > Company > Company Admin > User Administration, NOT under Administration > Invoice, so "Invoice 
> TEXT EXISTS, VERBATIM, AT THE STATED LINE. `grep -n 'SIXTEEN' .../2026-09-01_kg-authorized-approval-limits.mjs` -> line 153, and the same grep on the Run A parent returns line 170 with byte-identical text. So the LENS C clause is unmodified Run A carry-over. Confirmed.
> 
> TERM-BY-TERM REPRODUCTION (cwd = .../concur-invoice-professional-edition-tools-guides, 650 files):
> * `grep -rlF 'Invoice Processing Admin' . | wc -l` -> 4; `... | xargs grep -ilE 'approval limit|authorized approver'` -> EMPTY. Zero useful hits. The page's click path is Administration > Company > Company Admin > User Administration (the script's own seeds at line 109 say "note it is NOT under Administration > Invoice"), so the middle-nav node cannot apply. CONFIRMED USELESS.
> * `grep -rlF '(left menu)' . | wc -l` -> 10; same xargs filter -> EMPTY. CONFIRMED USELESS.
> * `grep -rlF 'Invoice Configuration administrator' . | wc -l` -> 16 (case-sensitive). Of those, 3 also match 'Authorized Approval Limits|User Administration': before-you-begin-9b98872a.md (Proxy Logon topic - noise), overview-of-steps-37e3c289.md (vendor employee access - noise), and how-single-step-approval-workflow-works-40145f24.md - which IS the single richest corroborating file. So this term is NOT worthless; it is the one prescribed term that works.
> 
> THE THREE CORROBORATING FILES ARE REAL AND CARRY EXACTLY THE QUOTED CONTENT:
> * workflow-and-approval-routing-8b4ff6c9.md line 21: "All workflow options available for non-PO policies are also availa

> **refuter verdict:** refuted=False conf=high severity=low
> fix: Replace the "FOR THIS GROUP SPECIFICALLY" clause at script:153 (leave the preceding admin-guides-skew statistic and every following bullet untouched) with:  'FOR THIS GROUP SPECIFICALLY: this page is admin-guides-sourced and is NOT under Administration > Invoice, so "Invoice Processing Admin" and "(left menu)" are Run A concepts that cannot help here - do not search them. The page name itself never appears in tools-guides (grep -rilF "Authorized Approval Limits" returns 0), so you must search its CONTROL VOCABULARY: "Authorized Approver", "Approval Limit", "approval limits", "User Administrati
> EVERY factual claim in the finding verified, and the consequence survives — but the proposed fix over-corrects in one specific way.
> 
> OBSERVATION VERIFIED (all commands run against the frozen corpus, cwd = /mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE):
> 
> 1. The count is wrong. `grep -rilF 'Invoice Configuration administrator' concur-invoice-professional-edition-tools-guides/ | wc -l` -> 22, not the "SIXTEEN" the script asserts at line 153.
> 
> 2. "Invoice Processing Admin" is dead weight here. `grep -rilF 'Invoice Processing Admin' <tools-guides>/ | wc -l` -> 4, and none of those 4 appear in the corroboration set below.
> 
> 3. The corroboration set is exactly the three files the finding names, and it is CLOSED. `grep -rilE 'approval limit|authorized appro' .` over all 650 tools-guides files returns exactly:
>    before-you-begin-3c458d83.md, how-single-step-approval-workflow-works-40145f24.md, workflow-and-approval-routing-8b4ff6c9.md
>    (`grep -rilF 'Authorized Approval Limits' .` -> 0, so the page's own name never appears in tools-guides; the page is only reachable by its control vocabulary.)
> 
> 4. The stale terms reach only 1 of those 3. Per-file `grep -icF`:
>    workflow-and-approval-routing-8b4ff6c9.md : "Invoice Configuration administrator" 0, "(left menu)" 0, "Invoice Processing Admin" 0, "Approval Limit" 0, "Authorized Approver" 1
>    before-you-begin-3c458d83.md              : all three stale terms 0; "Approval Limit" 1
>    how-single-step-...-40145f24.md           : "I

---

## [low] Independent roster built from the corpus before reading the brief: 8 controls (7 if the left-side selector is treated as navigation) — the "roughly seven" expectation is confirmed

**id:** `independent-field-roster-confirms-seven`  **auditor:** Independent corpus recon — Authorized Approval Limits / group "Approval Authority"  **split-vote:** True

**where:** script:109 ("Expect ROUGHLY SEVEN fields. Do not manufacture more.")

**evidence:**

```
Built from full reads of both primaries, each quote grep -F -c verified to exactly 1:
BRANCH B — the Authorized Approval Limits window:
 1. hierarchy level selector (left) — fcfd570c:63 "On the left side, the administrator selects the appropriate level in the hierarchy." + 8b167b96:39 "On the left side, select the appropriate level in the hierarchy." (TWO attestations)
 2. Can approve exception (check box) — fcfd570c:67 "For exception approvers, the administrator selects the Can approve exception check box."
 3. currency (selector) — fcfd570c:69 "...selects the desired currency and enters the amount." / 8b167b96:43 "select a currency and enter an amount."
 4. Amount (field) — fcfd570c:75 "You can enter 0 in the Amount field."
 5. Level (COA) — 8b167b96:50 "For level-based cost object approval, select a level." [CONTESTED — see level-hard-contradiction]
BRANCH A — Global group only, inline:
 6. Authorized Approver (check box) — fcfd570c:32
 7. Manager Approval Limit (field) — fcfd570c:43
 8. Approval Limit Currency (list) — fcfd570c:43
Cross-check on completeness: grep -rn -F 'Authorized Approver check box' and 'Manager Approval Limit' across admin-guides return hits in fcfd570c ONLY, so branch A is single-sourced and nothing further exists to find.
```

**why it matters:** An independent count that lands in the same place is the cheapest available confirmation that the page has been scoped correctly, and it converts "roughly seven" from a hopeful guardrail into a measured expectation with a named roster behind it. It also pins exactly which item is the swing: the left-side hierarchy selector, which the built Workflows page did NOT emit as a field despite a9522ec8:34 and d8bf669c:16 describing the same picker on that surface.

**proposed fix:** Add to script:109: 'AN INDEPENDENT RECON BUILT THIS ROSTER FROM THE CORPUS AND LANDED AT 8 (7 if the left-side selector is treated as navigation rather than a control) - treat that as the expected shape. BRANCH B: hierarchy level selector (left, attested twice), Can approve exception, currency, Amount, Level[CONTESTED]. BRANCH A: Authorized Approver check box, Manager Approval Limit, Approval Limit Currency. Branch A is SINGLE-SOURCED in fcfd570c - grep -rn -F "Manager Approval Limit" returns that file only, so there is nothing further to find and no second attestation to wait for. NOTE THE ASYMMETRY on the left-side selector: the built Workflows page did NOT emit one, though a9522ec8:34 and d8bf669c:16 describe the same picker there. Emit it here (it is an explicit procedure step, attested twice) and say plainly in notes that the Workflows sibling exists but was not emitted.'

> **refuter verdict:** refuted=False conf=high severity=low
> fix: Same intent, with the two bad citations repaired and the sameness claim demoted from assertion to open question. Append to script:109:  'AN INDEPENDENT RECON BUILT THIS ROSTER FROM THE CORPUS AND LANDED AT 8 (7 if the left-side selector is treated as navigation rather than a control) - treat that as the expected shape, not a quota. BRANCH B, the Authorized Approval Limits window: hierarchy level selector on the left (fcfd570c:63, 8b167b96:39 - attested twice), Can approve exception check box (fcfd570c:67), currency selector (fcfd570c:69, 8b167b96:43), Amount field (fcfd570c:75), Level for leve
> REPRODUCED THE CORE OBSERVATION — 9 of 9 quotes exact, 9 of 9 line numbers exact.
> 
> Corpus files resolved under /mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE/concur-invoice-professional-edition-admin-guides/ (the finding's short hashes map to user-administrator-fcfd570c.md, user-administration-8b167b96.md, authorized-approver-list-a9522ec8.md, step-2-assign-the-level-to-the-approver-d8bf669c.md).
> 
> `cat -n user-administrator-fcfd570c.md` / `cat -n user-administration-8b167b96.md` confirm every cited line verbatim:
>  fcfd570c:32 "...then the Authorized Approver check box appears in the Expense and Invoices Setting section..."
>  fcfd570c:43 "...the Manager Approval Limit field and the Approval Limit Currency list appear."
>  fcfd570c:63 "On the left side, the administrator selects the appropriate level in the hierarchy."
>  fcfd570c:67 "For exception approvers, the administrator selects the Can approve exception check box."
>  fcfd570c:69 "For limit approvers, the administrator selects the desired currency and enters the amount."
>  fcfd570c:75 "You can enter 0 in the Amount field."
>  8b167b96:39 "On the left side, select the appropriate level in the hierarchy."
>  8b167b96:43 "For limit-based cost object approval, select a currency and enter an amount."
>  8b167b96:50 "For level-based cost object approval, select a level."
> `grep -F -c` on each of the six fcfd570c strings and the three 8b167b96 strings returned exactly 1 every time.
> 
> Branch-A single-sourcing verified: `grep -rn -F 'A

> **refuter verdict:** refuted=True conf=high severity=not-a-defect
> fix: No edit to script:109. The count and the roster are already there; the fix as proposed would add ~900 chars of duplication plus three new defects (two false line citations, a search-suppression clause that contradicts the "FLOOR, not a ceiling" instruction in the same string, and a pre-decided emit verdict that contradicts "Expect ROUGHLY SEVEN ... Do not manufacture more").  If the parent wants to salvage the one genuinely new nugget, take ONLY a neutral disambiguation and nothing else — the existing phrase "a hierarchy Level field" is ambiguous between two distinct controls, and that ambigui
> OBSERVATION GRANTED — the roster is factually correct. I verified all nine cited quotes by reading both primaries in full (`cat -n .../user-administrator-fcfd570c.md`, `cat -n .../user-administration-8b167b96.md`). Every line number in the BRANCH A/B evidence block is exact: fcfd570c:32 (Authorized Approver check box), :43 (Manager Approval Limit + Approval Limit Currency list), :63 (left-side hierarchy selector), :67 (Can approve exception), :69 (currency + amount), :75 ("You can enter 0 in the Amount field"); 8b167b96:39, :43, :50. Nothing in the evidence block is fabricated.
> 
> BUT THE CONSEQUENCE IS ZERO, AND THE FIX IS NET-NEGATIVE.
> 
> 1. The finding's headline claim is already in the prompt it proposes to amend. `awk 'NR==109{print length($0)}'` = 5,927 chars. Inside that same string, verbatim: "Expect ROUGHLY SEVEN fields. Do not manufacture more." AND "### FIELDS THE RECON CRITIC NAMED ...: the Authorized Approver check box, Manager Approval Limit, Approval Limit Currency, a hierarchy Level field, a Can approve exception check box, a currency + Amount pair, and a stated PRECEDENCE RULE". That is item-for-item the finding's roster. Appending a second copy of a roster that already exists 3,000 chars earlier in the same string cannot change a single node. `grep -n "seeds"` shows p.seeds is injected at script:552 (pageBrief) and script:740 (pageContext) — i.e. into every phase — so the duplication is paid repeatedly for no informational gain.
> 
> 2. THE PROPOSED FIX CARRIES TWO 

---

## [low] The three-setter claim is corroborated by five files, not one — enough to state the same-store/different-surface verdict as corpus-stated rather than inferred

**id:** `three-surface-equivalence-corroborated-five-times`  **auditor:** Independent corpus recon — Authorized Approval Limits / group "Approval Authority"  **split-vote:** True

**where:** script:109 (cites only configuration-8b3be88b.md for the three-setter sentence)

**evidence:**

```
All grep -F -c -> 1:
1. configuration-8b3be88b.md:12 "The amount is set for each approver in the Authorized Approver List, in User Administration, or in the employee import."
2. step-4-assign-the-proper-rights-to-users-86389a18.md:10-14 "There are three ways to enter and define authorized approvers in Invoice: ... Authorized Approver List / employee import / Assign the permissions manually in User Administration" then :17 "Regardless of how the authorized approvers are entered into Invoice, they all appear in the Authorized Approver List."
3. step-4-assign-the-proper-rights-to-users-82481079.md:8-16 "The employee import / User Admin - or - The Authorized Approvers tab in Workflows." (note the THIRD tool-name variant: "User Admin")
4. edit-authorized-approver-information-8b3c119a.md:15 "You can edit authorized approver information using the Authorized Approver List, the employee import, and/or User Administration." plus :10 "An edit to an authorized approver record goes into effect immediately upon save."
5. remove-authorized-approvers-8b3c5273.md:32 "You can remove authorized approver permissions by using the Authorized Approver List, the employee import, and/or User Administration."
```

**why it matters:** The brief rests the entire boundary judgement on one sentence and tells the agent that "undetermined by the documentation" is an acceptable answer. With five independent attestations — one of which (86389a18) states the shared store outright — the verdict can be marked CORPUS-STATED rather than INFERRED, which is a materially stronger graph. The lifecycle facts in 8b3c119a also supply a behavioural note (immediate effect on save, in-flight invoices re-evaluated) that no other file carries.

**proposed fix:** Add to script:109: 'THE THREE-SETTER CLAIM IS CORROBORATED FIVE TIMES, so the boundary verdict is CORPUS-STATED, not inferred: configuration-8b3be88b.md (the amount sentence), step-4-...-86389a18.md ("three ways to enter and define authorized approvers" AND the decisive "Regardless of how the authorized approvers are entered into Invoice, they all appear in the Authorized Approver List."), step-4-...-82481079.md (which also gives the third tool-name variant "User Admin"), edit-authorized-approver-information-8b3c119a.md and remove-authorized-approvers-8b3c5273.md. VERDICT TO ADOPT: the surfaces are DISTINCT UI presentations writing ONE underlying per-approver record. Therefore emit this window s controls as real fields, each carrying a sibling note naming its Workflows counterpart and citing the 86389a18 sentence as the reason. Also capture from 8b3c119a:10 that "An edit to an authorized approver record goes into effect immediately upon save" and that in-flight invoices are re-evaluated with the new values.'

> **refuter verdict:** refuted=False conf=high severity=medium
> fix: Adopt the finding's addition to script:109, with four corrections.  (1) Normalise every line number to ABSOLUTE file lines (the finding's are body-relative in four of five and will land a reader in YAML frontmatter): configuration-8b3be88b.md:27 ; step-4-assign-the-proper-rights-to-users-86389a18.md:23-29 and :32 ; step-4-assign-the-proper-rights-to-users-82481079.md:21 and :23-31 ; edit-authorized-approver-information-8b3c119a.md:25, :27, :30 ; remove-authorized-approvers-8b3c5273.md:27-29 and :32.  (2) Route the emit decision through the PRIMARY, not through the three-setter files alone. Sug
> REPRODUCED IN FULL. Every quoted sentence exists verbatim, exactly once, in the file named.
> 
> 1) The script's citation surface. `grep -n "configuration-8b3be88b\|86389a18\|82481079\|8b3c119a\|8b3c5273"` on /mnt/c/Users/manci/PROJECTS/concur-config-diver-support/workflows/2026-09-01_kg-authorized-approval-limits.mjs (1588 lines) returns ONLY lines 58-60 (header comment) and 109 (the seeds string). configuration-8b3be88b.md is the sole cited source for the three-setter sentence in both places; the other four files appear nowhere in the 1588-line script. Confirmed the corroborating prose is absent too: grep -F -c for "Regardless of how" = 0, "three ways to enter" = 0, "immediately upon save" = 0. Line 109 does contain, verbatim, `If you cannot tell, say so; "undetermined by the documentation" is a correct and valuable answer here.` — so the finding's characterisation of the brief is accurate.
> 
> 2) The five attestations. grep -F -c against /mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE/concur-invoice-professional-edition-admin-guides/, all return 1:
>  - configuration-8b3be88b.md (file line 27): "The amount is set for each approver in the Authorized Approver List, in User Administration, or in the employee import."
>  - step-4-assign-the-proper-rights-to-users-86389a18.md (lines 23-29 list; line 32): "There are three ways to enter and define authorized approvers in Invoice:" ... "Regardless of how the authorized approvers are entered into Invoice, they all appear in the Autho

> **refuter verdict:** refuted=True conf=high severity=not-a-defect
> fix: Do not apply the fix as proposed. If the main agent still wants the corroboration in the brief, apply only the harmless evidence half and drop the prescriptive half entirely.  SAFE VERSION, appended to the seeds string at script:109, after the existing "(configuration-8b3be88b.md)" citation:  "FOUR MORE FILES ATTEST THE SAME THREE ROUTES AND ARE MUST-READS FOR THE BOUNDARY QUESTION - none of them contains the string 'Approval Limit', so the 'Approval Limit' sweep alone will miss all four; find them with grep -rli 'authorized approver': step-4-assign-the-proper-rights-to-users-86389a18.md ('The
> OBSERVATION GRANTED, CONSEQUENCE FAILS, AND THE PROPOSED FIX IS ITSELF A DEFECT.
> 
> 1) The corpus evidence is real (all five files verified verbatim; the auditor's line numbers are frontmatter-stripped, actual lines differ):
>    `cat -n concur-invoice-professional-edition-admin-guides/{configuration-8b3be88b,step-4-assign-the-proper-rights-to-users-86389a18,step-4-assign-the-proper-rights-to-users-82481079,edit-authorized-approver-information-8b3c119a,remove-authorized-approvers-8b3c5273}.md`
>    -> 8b3be88b:27 the three-setter sentence; 86389a18:23-29 "three ways to enter and define authorized approvers" + :32 "Regardless of how the authorized approvers are entered into Invoice, they all appear in the Authorized Approver List."; 82481079:23-31 "The employee import / User Admin - or - The Authorized Approvers tab in Workflows."; 8b3c119a:25,:27,:30; 8b3c5273:32. So the observation is accurate.
> 
> 2) NO WRONG NODE AND NO CRASH FOLLOWS FROM script:109 AS WRITTEN. Line 109 cites configuration-8b3be88b.md for a sentence that file genuinely contains. Nothing at 109 is false. The finding does not allege an error; it alleges an unrealised enrichment. That is not a defect in the script.
> 
> 3) THE CORROBORATING FILES ARE ALREADY REACHABLE BY THE PIPELINE AS DESIGNED. The finding's premise ("the brief rests the entire boundary judgement on one sentence") assumes the agent never sees the other four. But the Map-phase inventory prompt at script:689 names "authorized approver" as a MINIMUM conten

---

## [low] Two Workflows step nodes route through page 'User Administration' at the exact point where the built page is now the right destination — the warn will not clear and the steps stay wrong

**id:** `step-nodes-still-name-the-unbuilt-page`  **auditor:** landing-auditor (graph-impact)  **split-vote:** False

**where:** output/kg-invoice-config.json:23266 (grpworkflows-s2-configure-authorized-approver-feature, pages[3] and sequence order 28) and :23506 (grpworkflows-s3-vendor-employee-access-hierarchy-six-tool-sequence, pages[4] and sequence order 24)

**evidence:**

```
Both steps declare `pages` arrays containing 'User Administration' and one sequence entry each with page 'User Administration' and an EMPTY field. Measured: of the 109 current `step-references-unbuilt-page` warns, exactly 2 name User Administration —
  grpworkflows-s2-configure-authorized-approver-feature order 28 -> User Administration
  grpworkflows-s3-vendor-employee-access-hierarchy-six-tool-sequence order 24 -> User Administration
validate-graph.py:194-196 matches the step's page string against page NAMES, so adding a page called 'Authorized Approval Limits' leaves both warns in place.

Only the s2 entry is genuinely this window: its rationale cites step-4-assign-the-proper-rights-to-users-86389a18.md and 'Regardless of how the authorized approvers are entered into Invoice, they all appear in the Authorized Approver List.' The s3 entry is the Vendor Employee Access chain (overview-of-steps-37e3c289.md, 'uses the newly-added field in Step 6 to select the named vendor group') — a genuinely different surface that must stay unbuilt.
```

**why it matters:** grpworkflows-s2 is the config step a driver would actually follow to set an approver's limit. Leaving its terminal leg pointed at a page that does not exist, while the page that DOES exist sits one node away, is the single most user-visible consequence of the merge for the step graph — and it will read as 'the build did not land'.

**proposed fix:** In the same STEP_RATIONALE pass proposed in finding #4, also retarget grpworkflows-s2 order 28: set `page` to 'Authorized Approval Limits', set `field` to the emitted amount field name (e.g. `amount`), and rewrite the rationale to drop the 2026-08-31 clause. Update that step's `pages` array element 'User Administration' -> 'Authorized Approval Limits'. Leave grpworkflows-s3 order 24 pointing at 'User Administration' (correct — different surface) and only strip its 'Administration > Company surfaces are out of scope' sentence.

> **refuter verdict:** refuted=False conf=high severity=low
> fix: As proposed, with three corrections.  (1) Implement it as a NEW idempotent pass in bin/apply-corrections.py (e.g. `fix_step_sequences(kg)`, registered in main()), NOT as an edit to output/kg-invoice-config.json. merge-group.py:205 rebuilds step nodes verbatim from raw results, so any direct edit is destroyed by the next merge; apply-corrections.py is the established re-runnable home for exactly this class.  (2) grpworkflows-s2 order 28:   - `page`: 'User Administration' -> 'Authorized Approval Limits'   - `pages` array: replace element index 3 'User Administration' -> 'Authorized Approval Limi
> REPRODUCED, claim by claim — all observations survive; one citation is off and one fix detail is unsafe as written.
> 
> 1) Line anchors exact.
> `grep -n '"id": "grpworkflows-s2-...\|"id": "grpworkflows-s3-..." output/kg-invoice-config.json` -> 23266 and 23506. Both cited line numbers are correct to the line.
> 
> 2) Structure exact.
> python3 over `nodes.configSteps`:
> - grpworkflows-s2: pages = ['List Management','Feature Hierarchies','Workflows','User Administration'] -> index of 'User Administration' is 3 (finding says pages[3]). Sequence has exactly one UA entry, order 28, field='' (empty), max order = 28.
> - grpworkflows-s3: pages = ['List Management','Feature Hierarchies','Group Configurations','Forms and Fields','User Administration'] -> index 4 (finding says pages[4]). One UA entry, order 24, field='', max order = 24.
> - Graph-wide, exactly 2 sequence entries name 'User Administration': ('grpworkflows-s2',28) and ('grpworkflows-s3',24). Matches the "measured" claim precisely.
> - 'User Administration' is not among the 22 built page names.
> 
> 3) Warn count exact. `python3 bin/validate-graph.py` -> ERROR none, WARN 181, step-references-unbuilt-page 109, EXIT=0.
> 
> 4) Mechanism correct, LINE CITATION WRONG. The finding cites validate-graph.py:194-196. Actual: line 199 builds `names_by_page = {p['name'].strip().lower(): p['id'] ...}` and lines 206-207 do `if e.get('page') and e['page'].strip().lower() not in names_by_page: warns.append(('step-references-unbuilt-page', ...))`. Off by ~7-11 l

> **refuter verdict:** refuted=False conf=high severity=low
> fix: Keep the fix, with four constraints.  1. HOME IT IN bin/apply-corrections.py as a new STEP_PATCH pass (a dict keyed by step id -> sequence order -> field overrides), not as a hand-edit of output/kg-invoice-config.json. merge-group.py:79-85 only clears nodes whose `group` matches the group being merged, so a hand-edit survives this run but dies on any future Workflows re-merge; apply-corrections.py is re-applied after every merge by design (docstring, lines 1-6). apply-corrections.py currently has no step machinery, so this is new code.  2. RUN IT AFTER the build, not before. Do the retarget on
> COMMANDS RUN AND WHAT THEY SHOWED
> 
> 1) The two step legs exist exactly as described. `python3` over output/kg-invoice-config.json (nodes.configSteps) printed both offending sequence entries verbatim:
>  - grpworkflows-s2-configure-authorized-approver-feature, order 28, page "User Administration", field '' — rationale ends: "The destination is Administration > Company > Company Admin > User Administration, which is OUT OF SCOPE for this graph by the 2026-08-31 decision; no page node exists and none should be created."
>  - grpworkflows-s3-vendor-employee-access-hierarchy-six-tool-sequence, order 24, page "User Administration", field '' — rationale ends: "Administration > Company surfaces are out of scope for this graph, so no page node exists for it."
>  Both steps' `pages` arrays carry "User Administration" (s2 pages[3] confirmed at output/kg-invoice-config.json:23266ff).
> 
> 2) The warn genuinely does not clear. Simulated the merge: current unbuilt-page warns = 109; with a page named "Authorized Approval Limits" added = 109. Cause confirmed at bin/validate-graph.py:194-196 — `if e.get('page') and e['page'].strip().lower() not in names_by_page`, and names_by_page is built from page NAMES (line 199 area), so "User Administration" never matches "Authorized Approval Limits".
> 
> 3) The finding's s2-vs-s3 discrimination is corpus-correct, which is the part I tried hardest to break. `cat concur-invoice-professional-edition-admin-guides/step-4-assign-the-proper-rights-to-users-86389a18.md` give

---

## [low] The prescribed node --check recipe fails on `export const meta` — strip the export keyword as well as wrapping

**id:** `node-check-recipe-fails-on-export`  **auditor:** tabs-chain / schemas / script-executability  **split-vote:** False

**where:** workflows/2026-09-01_kg-authorized-approval-limits.mjs:82 (`export const meta = {`); parent has the same at :93

**evidence:**

```
$ printf 'async function __w(){\n' > /tmp/chk.mjs; cat SCRIPT >> /tmp/chk.mjs; printf '\n}\n' >> /tmp/chk.mjs; node --check /tmp/chk.mjs
  /tmp/chk.mjs:83
  export const meta = {
  ^^^^^^
  SyntaxError: Unexpected token 'export'

$ node --check SCRIPT
  .../2026-09-01_kg-authorized-approval-limits.mjs:1546
  return {
  ^^^^^^
  SyntaxError: Illegal return statement
  exit=1

CORRECTED RECIPE, run on BOTH scripts:
$ for f in NEW PARENT; do printf 'async function __w(){\n' > /tmp/chk.mjs; sed 's/^export const meta/const meta/' "$f" >> /tmp/chk.mjs; printf '\n}\n' >> /tmp/chk.mjs; node --check /tmp/chk.mjs && echo "PARSE OK"; done
  === workflows/2026-09-01_kg-authorized-approval-limits.mjs ===
  PARSE OK
  === workflows/2026-08-31_kg-workflows-run-a.mjs ===
  PARSE OK

$ grep -nE 'Date\.now|Math\.random|new Date\(\)' SCRIPT   → no output, exit=1 (CLEAN)
$ grep -n 'new Date' SCRIPT                                 → no output (CLEAN)
$ grep -nE ':\s*(string|number|boolean|any|void|unknown)\s*[,)=;]|interface\s+[A-Z]|^\s*type\s+[A-Z][A-Za-z]*\s*=|as\s+(string|number|any|const)\b|<[A-Z][A-Za-z]*>\(' SCRIPT  → no output (NO TypeScript)
```

**why it matters:** Not a defect in the script — the script is clean. But the recipe as given produces a red SyntaxError that reads exactly like a real failure, and a future session running it will either chase a phantom bug or, worse, conclude the file is broken and start editing it. `export const meta` is the harness's own module-level convention (the parent carries it and ran to completion with 20 agents / 0 errors), so it must be stripped, not fixed.

**proposed fix:** No change to the script. Record the corrected one-liner in docs/2026-09-01_HANDOFF-APPROVAL-AUTHORITY-AND-RUN-B.md so it is not re-derived:
  printf 'async function __w(){\n' > /tmp/chk.mjs \
    && sed 's/^export const meta/const meta/' workflows/<script>.mjs >> /tmp/chk.mjs \
    && printf '\n}\n' >> /tmp/chk.mjs \
    && node --check /tmp/chk.mjs && echo PARSE OK
A Workflow script legally carries BOTH a top-level `export const meta` (module form) and a top-level `return` (the harness wraps the body), so neither raw `node --check` nor a bare function wrap can validate one on its own.

> **refuter verdict:** refuted=False conf=high severity=low
> fix: Substance as proposed (no change to the script; record the corrected one-liner), with the target file corrected and one robustness tweak.  PRIMARY EDIT — docs/RESUME-PROMPT.md:22-23, because that is where the incomplete instruction actually lives and it is the paste-ready block read first. Replace "Validate with `node --check` inside an async wrapper before launching (top-level `return` is legal in a workflow script)." with:    Validate before launching. A workflow script legally carries BOTH a top-level `export const meta`   (module form) and a top-level `return` (the harness wraps the body),
> REPRODUCED, all of it, byte for byte.
> 
> 1. Location claim confirmed exactly.
> $ grep -n '^export const meta' workflows/2026-09-01_kg-authorized-approval-limits.mjs workflows/2026-08-31_kg-workflows-run-a.mjs
>   .../2026-09-01_kg-authorized-approval-limits.mjs:82:export const meta = {
>   .../2026-08-31_kg-workflows-run-a.mjs:93:export const meta = {
> $ grep -n '^return ' .../2026-09-01_kg-authorized-approval-limits.mjs  → 1546:return {
> Both cited line numbers (82 new / 93 parent) are correct, and the top-level return is at 1546 as claimed.
> 
> 2. Naive-wrap failure reproduced, identical error and line.
> $ printf 'async function __w(){\n' > /tmp/chk.mjs; cat SCRIPT >> /tmp/chk.mjs; printf '\n}\n' >> /tmp/chk.mjs; node --check /tmp/chk.mjs
>   /tmp/chk.mjs:83
>   export const meta = {
>   ^^^^^^
>   SyntaxError: Unexpected token 'export'   exit=1   (Node v24.14.1)
> 
> 3. Raw node --check failure reproduced, identical.
> $ node --check SCRIPT
>   .../2026-09-01_kg-authorized-approval-limits.mjs:1546
>   return {
>   SyntaxError: Illegal return statement   exit=1
> Note the two errors are complementary: raw --check treats .mjs as a module so `export` is fine and only `return` trips; the bare function wrap makes `return` fine and only `export` trips. Neither check alone can validate the file. That part of the finding's reasoning is sound, not just asserted.
> 
> 4. Corrected recipe verified on BOTH scripts.
> $ for f in NEW PARENT; do printf 'async function __w(){\n' > /tmp/chk.mjs; sed 's/^export const meta/const me

> **refuter verdict:** refuted=False conf=high severity=low
> fix: As proposed (no change to either .mjs script), with ONE correction to where it lands. The broken prescription is docs/RESUME-PROMPT.md:22, not the handoff — fix it at the source, since RESUME-PROMPT.md is the block that gets pasted into the next session.\n\nEdit docs/RESUME-PROMPT.md:22, replacing "Validate with `node --check` inside an async wrapper before launching (top-level `return` is legal in a workflow script)." with the concrete one-liner and the reason both forms defeat a single-mode check:\n\n  printf 'async function __w(){\\n' > /tmp/chk.mjs \\\n    && sed 's/^export const meta/cons
> Reproduced all three of the finding's commands verbatim and added one the finding did not run.\n\n1) Naive wrapper: `printf 'async function __w(){\\n' > chk.mjs; cat workflows/2026-09-01_kg-authorized-approval-limits.mjs >> chk.mjs; printf '\\n}\\n' >> chk.mjs; node --check chk.mjs` -> `chk.mjs:83 export const meta = { ^^^^^^ SyntaxError: Unexpected token 'export'`, exit=1. Confirmed.\n\n2) Raw check: `node --check workflows/2026-09-01_kg-authorized-approval-limits.mjs` -> `:1546 return { SyntaxError: Illegal return statement`, exit=1. Confirmed (.mjs forces module mode, so `export` passes and the top-level `return` at line 1546 fails).\n\n3) NEW third case I added: `node --input-type=module --check < SCRIPT` -> `[stdin]:1546 return { SyntaxError: Illegal return statement`, exit=1. So all three obvious single-mode recipes fail; the finding's claim that neither mode alone can validate a file carrying BOTH forms is exact, and stronger than stated.\n\n4) Corrected recipe on BOTH scripts (`sed 's/^export const meta/const meta/'` + async wrap): PARSE OK / PARSE OK. Confirmed.\n\nCONSEQUENCE — the prescription is real and sits on this run's critical path. `grep -rn 'node --check|__w()|chk.mjs' docs/ workflows/ bin/` returns exactly ONE hit: docs/RESUME-PROMPT.md:22 — \"Validate with `node --check` inside an async wrapper before launching (top-level `return` is legal in a workflow script)\". That is the paste-ready block for the next session (docs/RESUME-PROMPT.md:1-7 label it \"Res

---

## [low] The handoff's "exactly ONE thing to change" (const PARTS) is already correct and the directory is already provisioned and empty

**id:** `handoff-one-thing-claim-is-a-no-op`  **auditor:** tabs-chain / schemas / script-executability  **split-vote:** False

**where:** workflows/2026-09-01_kg-authorized-approval-limits.mjs:101

**evidence:**

```
sed -n '101p' → const PARTS = '/tmp/claude-1000/-mnt-c-Users-manci/bc53169c-7f0a-473a-a07f-cf6d37ca509c/scratchpad/aal-parts'
$ ls -la /tmp/claude-1000/-mnt-c-Users-manci/bc53169c-.../scratchpad/aal-parts
  total 8
  drwxr-xr-x 2 mongoose mongoose 4096 Sep  1 04:49 .
  drwx------ 7 mongoose mongoose 4096 Sep  1 04:49 ..
(directory exists, is owned by mongoose, and is EMPTY — no stale roster-*.json for assemble-parts.py's glob at bin/assemble-parts.py:162 to pick up)

$ diff <(sed -n '82,1605p' PARENT) <(sed -n '82,1588p' NEW) | grep -c '^[<>]'  →  36
(36 changed lines across a 1,507-line body = 8 semantic edits: meta.name, meta.description, the Extract phase detail, PARTS, GROUP, the PAGES entry, one log line, one 'two pages'→'the single page', and four step-prefix strings.)
```

**why it matters:** Contrary evidence against the handoff, worth recording so nobody re-derives it: PARTS is an ABSOLUTE path, so it resolves identically from any session and needs no edit; the directory is already there and clean. The one change the handoff called for is a no-op, while the 36-line diff proves the adaptation stopped at line 486 and every prompt below it is Run A's. The handoff's readiness claim should be struck rather than amended.

**proposed fix:** In docs/2026-09-01_HANDOFF-APPROVAL-AUTHORITY-AND-RUN-B.md, replace the 'exactly ONE thing needs changing (const PARTS)' claim with: 'THE SCRIPT IS NOT READY. `diff` against the Run A parent shows only 8 semantic edits in a 1,507-line body; everything below line 486 — ALREADY_BUILT, all six phase prompts, the three lens charters — is verbatim Workflows Run A. const PARTS at :101 is an absolute path, already correct, and its directory is already provisioned and empty; it needs no change. See the audit findings for the 14 that do.' Also note there that NAV_SCHEMA (:253-309) is byte-identical to Run A's and must be patched before Workflows Run B, whose Email Reminders and Delegate Configurations pages have two tabs each.

> **refuter verdict:** refuted=False conf=high severity=low
> fix: Apply the finding, but NOT with the wording as proposed — "everything below line 486 ... is verbatim" is false (seven edited lines sit below 486, and 486 is `type: 'array',` inside CRITIC_RECEIPT_SCHEMA). Replace docs/2026-09-01_HANDOFF-APPROVAL-AUTHORITY-AND-RUN-B.md:26 ("Script is written and ready.") and :33-36 (the "Change exactly ONE thing" block, which also misstates the line as "~70") with:  "### THE SCRIPT IS NOT READY — the earlier 'change exactly ONE thing' claim was wrong and is struck.  `const PARTS` is at **:101**, not ~70, and it is an ABSOLUTE path (`/tmp/claude-1000/-mnt-c-User
> REPRODUCED — the core observations hold, but two pieces of the finding's own text are wrong and would inject a NEW false claim into the handoff if applied verbatim.
> 
> WHAT SURVIVES (each with the command):
> 
> 1. PARTS location and value — CONFIRMED EXACTLY.
> $ sed -n '101p' workflows/2026-09-01_kg-authorized-approval-limits.mjs
>   const PARTS = '/tmp/claude-1000/-mnt-c-Users-manci/bc53169c-7f0a-473a-a07f-cf6d37ca509c/scratchpad/aal-parts'
> It is an absolute path (leading '/'), so it resolves identically from any session. `grep -n PARTS` shows 24 uses, all string-concatenated onto that absolute base (:658, :717, :893, :1039, :1219, :1291, :1335-6, :1374, :1430-3, :1486, :1536, :1549-61) — nothing session-relative.
> 
> 2. Directory provisioned, empty, writable — CONFIRMED (mtime differs, immaterial).
> $ ls -la .../scratchpad/aal-parts  -> total 8, only . and .. , owner mongoose, mtime "Sep 1 05:27" (the finding wrote 04:49; the dir has been stat-touched since, but it is still EMPTY).
> $ touch .../aal-parts/.probe -> WRITABLE.
> $ sed -n '155,165p' bin/assemble-parts.py confirms the glob at :162 `glob.glob(os.path.join(parts,'roster-*.json'))` with `sys.exit('no roster-*.json in %s')` on empty — so an empty dir is clean, not fatal-at-the-wrong-time.
> Cross-session persistence is proven, not assumed: the parent session's sibling dir wf-a-parts still holds Run A's extract-*.json / critic-*.md from Aug 31, and the parent scratchpad still holds 2026-08-31_workflows-run-a-raw-result.json. So the f

> **refuter verdict:** refuted=False conf=high severity=low
> fix: In docs/2026-09-01_HANDOFF-APPROVAL-AUTHORITY-AND-RUN-B.md, replace the "### Change exactly ONE thing before launching" section (lines 33-35, which also mis-cites the line as "~70") with:  "### THE SCRIPT IS NOT READY — do not launch on this section's former advice. `const PARTS` is at **line 101**, not ~70, and it is an ABSOLUTE path to an existing, empty, correctly-owned directory (verified: assemble-parts.py's `roster-*.json` glob finds nothing stale there). It is valid as-is and needs no edit; repoint it at your own scratchpad only if you prefer not to depend on another session's directory
> FACTUAL CORE — VERIFIED TRUE.
> 
> `sed -n '95,110p'` on the build script: line 101 is
>   const PARTS = '/tmp/claude-1000/-mnt-c-Users-manci/bc53169c-7f0a-473a-a07f-cf6d37ca509c/scratchpad/aal-parts'
> It is an absolute path, so it resolves identically from any session. `ls -la` on it: the directory exists, is drwxr-xr-x mongoose:mongoose, and is EMPTY (total 8, only . and ..). `sed -n '/def group_tag/,/^def /p' bin/assemble-parts.py` plus the surrounding `main()` confirms the glob is `glob.glob(os.path.join(parts, 'roster-*.json'))` and `sys.exit`s if empty — so there is nothing stale for it to pick up. Reaping risk checked: `ls -la --time-style=full-iso /tmp/claude-1000/-mnt-c-Users-manci/` shows session dirs from 2026-08-31 08:22 still present ~22h later, so bc53169c's scratchpad is not being garbage-collected. The finding's claim that the handoff's "one thing" is a no-op is correct.
> 
> CONSEQUENCE — DOES NOT REFUTE. The finding touches no code and cannot produce a wrong node or a crash. But the artifact it targets is a handoff, and this project's convention (per the memory index and CLAUDE.md) is that a session STARTS at the handoff. docs/2026-09-01_HANDOFF-APPROVAL-AUTHORITY-AND-RUN-B.md:33-35 reads "### Change exactly ONE thing before launching / `const PARTS` on line ~70 points at the previous session's scratchpad. **Repoint it at yours.**" That is a live READY assertion in the file the next operator opens first, and it is exactly the mechanism by which the unfixed script gets 


# REFUTED (unanimous)

- **Independent corpus recon — Authorized Approval Limits / group "Approval Authority":nav-path-short-form-corroborated** — The brief asserts the long click path as canonical, but the SHORT form has independent cross-file corroboration and a fourth NBSP-separated form exists
  - REPRODUCTION — all four raw observations hold; the diagnosis built on them does not.

OBSERVATIONS THAT SURVIVE (every one reproduced):
1. script:109 carries the quoted text verbatim. `grep -n -F '### THE CLICK PATH, and note it is NOT under Administration > Invoice: "Administration > Company > Company Admin > User Administration"' workflows/2026-09-01_kg-authorized-approval-limits.mjs` -> hit at  || OBSERVATIONS GRANTED (all reproduced). From corpus root /mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE:
- `grep -rn -F 'Company Admin > User Administration' .` -> 2 hits, both admin-guides/user-administrator-fcfd570c.md:32 and :51.
- `grep -rn -F 'Administration > User Administration' .` -> 2 hits, 2 files: fcfd570c.md:23 and set-a-default-shipping-and-billing-address-f772bed1.md:59.
- T

- **landing-auditor (graph-impact):duplicate-conditional-visibility-edge** — merge-group.py's dependency de-dup keys on the FULL targetRef dict, so this run's conditional-visibility edge will NOT collapse into dep.gworkflows.060 — the graph gains a second edge for the same fact
  - REPRODUCTION — what is TRUE (verified verbatim):

1. The de-dup key exists exactly as quoted, but NOT at the cited line. `grep -n "" bin/merge-group.py | sed -n '125,235p'` puts it at **bin/merge-group.py:209-216**:
   209  seen_edges, deduped = set(), []
   210  for d in n['configDependencies']:
   211      k = (d['type'], str(d['sourceRef']).lower(), str(d['targetRef']).lower(), (d.get('sourceQu || **1. The blamed mechanism is not the operative cause — and in the scenario this script actually commands, the de-dup DOES fire.**

`bin/merge-group.py:200-206` is the de-dup; `:145-150` is where new edges are built, and `resolved` is *recomputed* there (`'resolved': bool(t)`), not carried from the agent. I simulated it:

```
any page named User Administration? False
scenario A (identical forward r


# COSMETIC (unverified)

- **header-four-nodes** Header says "four hand-written nodes" where the run expects roughly seven fields — workflows/2026-09-01_kg-authorized-approval-limits.mjs:64-65

- **assemble-flag-order-silent-misroute** assemble-parts.py's flag parsing is positional-order-dependent and can silently write the raw result to a file named after a flag value — bin/assemble-parts.py:487-492

- **meta-bookkeeping** Post-merge meta is correct and needs no code change, but BUILD_DATE is load-bearing — without it lastUpdated silently stays 2026-08-31 — bin/merge-group.py:235-245 (the meta update) and :33-40 (ALL_GROUPS)

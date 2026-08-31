# GROUP 3 — ADVERSARIAL CRITIQUE: PAGE-HOOD

Lens: **pagehood**. Target: the two-page Group 3 roster
(`/tmp/claude-1000/-mnt-c-Users-manci/1c189ac8-e070-426a-be01-c36742d928ed/scratchpad/g3-recon/roster.md`).

Corpus root used throughout (abbreviated `$ROOT` below):
`/mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE`
Guide dirs abbreviated `admin/` = `concur-invoice-professional-edition-admin-guides/`,
`tools/` = `concur-invoice-professional-edition-tools-guides/`.

---

## VERDICT UP FRONT

**The two-page answer survives. I could not refute the page-hood of either entry, and I tried from
five directions.** I reproduced all three of the roster's load-bearing censuses independently and got
the same PO-domain answer each time, plus a fourth census the roster did not run (the existing graph's
own unresolved page references) which also returns exactly these two names. Thin is the correct answer
here.

**What is wrong is not the page list. It is the seed lists, the alias arrays, two factual claims about
the graph and the corpus, one silent reconciliation of a navigation contradiction, and one page-binding
that is inferential but presented as attested.** Eight findings would change the roster document. None
adds or removes a page; four remove or move a *source*, two remove or move an *alias/claim*, one
downgrades a navPath assertion to UNKNOWN, one adds an annotation without which twelve fields get filed
under a page on the strength of guide adjacency alone.

---

## AXIS 5 FIRST — DOES THE EVIDENCE HOLD? (run before anything else, because a quote miss is free)

### 5a. Mechanical verification: every sourceQuote in the roster JSON

I extracted all 40 `sourceQuote`/`sourceFile` pairs (navPathEvidence, roleGates, and every quote
embedded in `identityNotes`, `uiVariantEvidence`, `deferred[].why` and `reconciliation`) into a TSV and
ran `grep -F -c` against each cited file.

```
checked=40 misses=1
MISSING-FILE  [admin/preventing-po-transmittal-51b11602.md]
```

The single miss is **not a quote defect** — it is an elided filename. The roster's prose writes the file
as `preventing-po-transmittal-…-51b11602.md` with an ellipsis. Real name:

```
$ find $ROOT -name "*51b11602*"
admin/preventing-po-transmittal-when-po-exceeds-specified-exception-level-51b11602.md
$ grep -F -c "A setting in Workflows can be used to prevent PO transmission if the PO exceeds a specified exception level." <that file>
1
```

**39/39 real quotes verify verbatim, 40/40 once the filename is expanded.** Grounding hygiene on this
roster is the best I have seen on this project. The build must expand every elided `…-hash.md` filename
before writing sourceFile values, or the downstream validator will fail on paths, not text.

### 5b. The harder half: do the quotes SUPPORT the claim, or merely contain similar words?

Spot-checked the ones most likely to be passing mentions.

- `admin/overview-8b35a33f.md` → `Only accessible by users with the Invoice Configuration Administrator role.`
  I worried this was a generic sentence lifted out of context. It is not. Read in place (line 21) it is
  the third sentence of the PO Matching overview's own abstract: *"Use Purchase Order Matching to
  maintain control… Three types of matching methods available… Only accessible by users with the
  Invoice Configuration Administrator role."* **Supports the claim.**
- `admin/required-roles-ec6fae13.md` → names `the Purchase Order Matching Rules feature` explicitly.
  **Supports.** Note it says *feature*, not *page*; the roster does not overreach on this.
- `admin/access-purchase-order-matching-rules-8407c500.md` → I read the whole topic. It is a two-step
  click path followed by a three-column list grid definition (Rule Set Name / In Use / Associated
  Policies). This is the strongest single page attestation in the group. **Supports.**
- `admin/edit-purchase-order-matching-rules-604d1e31.md` → the two "decisive" steps are genuinely
  consecutive, steps 1 and 2 of one four-step procedure, verified by reading lines 29–35. **Supports the
  fact, but not the whole inference** — see Finding 6.
- `admin/configure-purchase-orders-8128725e.md` → `Ensure that you have selected the correct policy in
  the Policy list.` is real and in place under the *Fields to Appear on Purchase Orders* section.
  **Supports.** But the file it comes from does not support what it is being used for at the page level
  — see Finding 8.

**Axis 5 verdict: ENDORSED with one filename-hygiene note.**

---

## AXIS 7 — ARE THE RICHNESS NUMBERS REAL? (also cheap, also mechanical, run second)

### 7a. The headline totals are exact to the byte

```
$ cat $(cat p1.txt) | wc -c      # 39 seed files
84820
$ cat $(cat p2.txt) | wc -c      # 6 seed files
14837
```

Both match the roster exactly. `fileCount` 39 and 6 both verified; zero missing files. `rawTableFiles: 0`
verified — `grep -l '<table'` returns nothing across all 39. The roster's claim that three files carry a
markdown table (step-2, step-5, tools/required-roles) is correct; my first check used a `^|` anchor and
under-counted, the roster did not.

### 7b. But roughly a quarter of those bytes is YAML front matter

Every crawled topic carries a ~500-byte front-matter block that contains no extractable configuration.

```
P1 raw=84820  frontmatter=20389  body=64431     (24.0% overhead)
P2 raw=14837  frontmatter=3124   body=11713     (21.1% overhead)
```

Consequences for the numbers the split proposal reasons from:

| stated | actual |
|---|---|
| Page 1 ≈ 2,100 bytes per expected field | 64,431 / 40 = **1,611** |
| Page 2 ≈ 800 bytes per expected field | 11,713 / 18 = **651**, and **≈555** after Findings 1–2 remove two seeds |
| "~100 KB across 45 files" | **~76 KB of body** across 43 real files after corrections |

The *ratio* between the two pages survives, so the tiering recommendation (high effort on Page 1, cheap
on Page 2) is unaffected. The absolute figures are inflated by a quarter and should not be quoted into a
budget.

### 7c. Page 2's field estimate rests on ONE file, not six

Of Page 2's six seeds:

```
5956  admin/configure-purchase-orders-8128725e.md      <- all 12 setting sections live here
3430  tools/preview-a-purchase-order-846396e1.md       <- nav + role gate + the "PO Configuration" alias
1506  tools/purchase-order-processor-experience-8b507c54.md   <- END-USER (Finding 1)
1466  admin/purchase-order-configuration-is-group-aware-b603f04b.md
1300  admin/purchase-order-setup-process-9f253ce7.md   <- ZERO support (Finding 2)
1179  admin/use-the-purchase-order-configuration-tool-51009c8c.md   <- nav + role gate only, no fields
```

After removing the two bad seeds, **five files, and exactly one of them carries a field.** I read
`configure-purchase-orders-8128725e.md` end to end and confirmed the roster's 12-section enumeration is
accurate, including every stated limit (9-char PO number, 3,200-char message, 500-char subject,
.png/.jpg/.gif at 55 px high / ≤200 px long / ≤100 KB / one per invoice group, the fixed
`_DoNotReply@ConcurSolutions.com` suffix). One refinement: the last three sections — *Ship To Without
Requestor Name*, *Company Name Without Address*, *Use Email as Bill-To* — are described as **header
fields you select**, i.e. members of the *Fields to Appear on Purchase Orders* picker, not peer
top-level settings. `estimatedFields: 18` still reads as plausible; the *structure* is 9 sections plus a
field picker, not 12 flat settings.

**Axis 7 verdict: totals ENDORSED; per-field economics OVERSTATED by ~24%; Page 2's source base is
narrower than six files implies.**

---

## AXIS 1 — IS IT A PAGE? (I ran the censuses myself; I did not take the roster's four on trust)

### Census A — every `(left menu)` click label, both guide dirs

```
$ grep -rhoE "[A-Z][A-Za-z0-9 &/,'-]{2,60} \(left menu\)" admin/ tools/ | sort | uniq -c | sort -rn
```
30 distinct phrasings (roster said 27 — count drift, conclusion identical). Exactly **one** is PO-domain:

```
1 Purchase Order Matching Rules (left menu)
1 Click Purchase Order Matching Rules (left menu)
```

`Purchase Order Configuration` appears with `(left menu)` **zero times**. Confirmed.
Also confirmed in passing: `1 Polices (left menu)` — SAP's own misspelling is real and sits inside a live
click step, exactly as the roster warns.

### Census B — every `The X page appears` arrival sentence

79 distinct page names (roster said 80). Exactly **one** is PO-domain:
`The Purchase Order Matching Rules page appears` (1 occurrence).
No `Purchase Order Configuration page`, no `Purchase Requests page`, no `Receiving page`.

### Census C — every `Invoice > X` destination, both glyph forms

With `>` separators, 48 distinct destinations. PO-domain:
```
2 Invoice > Purchase Order Matching Rules
1 Invoice > Purchase Order Matching Rules (left menu)
1 Invoice > Purchase Order Configuration
1 Invoice > Purchase Order Configuration)
```
With the eaten-glyph / nbsp form (`Administration␣␣Invoice␣␣X`), one further hit:
`1 Administration  Invoice  Purchase Order Matching Rules`.
**No third PO destination in either glyph form.** Confirmed.

### Census D — one the roster did not run: the graph's own unresolved page references

This is the closest surviving trace of the lost map, and it is independent of every sweep.

```python
# over all 335 configDependencies, collect every sourceRef/targetRef page where resolved is false
```
Of ~70 distinct unresolved page names emitted by Groups 1/2/4/5, the PO-domain ones are:

```
2  Purchase Order Configuration
2  Purchase Order Import
1  Purchase Order Matching Rules
1  Purchase Order Settings
1  Purchase Request Settings
1  PO or Payment Request Import
```

**Four groups of prior work, extracting fields with no knowledge of this roster, generated forward
references to exactly the two pages this roster proposes — plus the import (correctly deferred as a
specification, not a screen) and the two settings tables (correctly re-pointed at Workflows).** There is
no orphaned reference to a third PO admin page anywhere in the built graph. This is the strongest
corroboration available and it should be in the roster.

### Census E — release notes, as a name check only (labelled as release notes)

```
Purchase Order Matching Rules  : ZERO hits in both release-note dirs
Purchase Order Configuration   : 1 hit, release-note-summaries/june-2017-...-262adc6b.md
```
The roster's claim of zero release-note corroboration for Matching Rules is correct, and it labelled its
one release-note citation properly.

### Page 1 — `Purchase Order Matching Rules`: page-hood ENDORSED, cannot be refuted

It is the only PO label in the corpus that carries `(left menu)`, the only one the corpus calls a *page*
in an arrival sentence, it has its own list grid with named columns, it has its own click path attested
**three** independent ways, and it has an exclusive role gate stated once in each guide directory. It is
not one of the 18 built pages. Nothing I ran dents it.

**One navPath source the roster missed.** `admin/overview-8b37481c.md` carries a third attestation in the
eaten-glyph form that is not in `navPathEvidence`:
> `Receipt confirmation is part of the PO Matching feature set. As such, it is configured by going to   Administration  Invoice  Purchase Order Matching Rules.`

Since the click path is *all the navigation knowledge that will exist* for this group, every attestation
should be carried. Add it.

### Page 2 — `Purchase Order Configuration`: page-hood ENDORSED, with a caveat that is NOT about page-hood

Two full click paths, one from each guide directory, both verified verbatim. Own role gate. Own Group
scoping. A settings roster that exists on no other surface. The `kind: separate-tool` call is the
corpus's own word and is honest:

```
$ grep -rc -F "Purchase Order Configuration page" $ROOT
ZERO corpus-wide
```
against `tool` in every body-text mention. The graph already treats `Vendor Manager tool` and
`Company Locations tool` as pages, so the precedent is settled. The `tool` vs `window` contradiction is
real (`admin/purchase-request-and-purchase-order-8b36ae07.md:209` writes *"in the Purchase Order
Configuration window"*) and correctly preserved rather than reconciled.

The caveat is Finding 8 below, and it concerns which fields belong to it — not whether it is a page.

**Axis 1 verdict: BOTH PAGES ENDORSED. Two is the answer.**

---

## AXIS 2 — IS IT ADMIN? (the PO area's specific trap)

### Page 1's 39 seeds: clean

I scored all 39 for admin markers (`Administration >`, `left menu`, `administrator can/uses/needs`) vs
end-user markers (`Requests >`, `the processor clicks`, `Invoice Owner`, `the user clicks`). Four scored
end-user-heavy; I read all four.

- `admin/confirmation-types-b4a94761.md` (E=4) — this is the **value-set semantics** for the four values
  of the Select Confirmation Type window (None / Invoice / Receipt Central / Receipt Individual). Each
  value is explained by what the user experiences, which is what a value set *is*. **Legitimately admin.**
- `tools/when-are-match-rules-run-f835a01e.md` (E=3) — runtime firing conditions for the rules configured
  on this page. Yields dependencies and conditions, not fields. **Legitimately in scope.**
- `admin/receipt-central-confirmation-type-a30f804b.md`, `admin/receipt-individual-confirmation-type-56fd62f1.md`
  — same pattern, value semantics. **In scope.**

**No end-user screen is seeded on Page 1.** The roster passes this axis cleanly, which is notable given
how thick the PO area is with processor procedure.

Caveat for the build's expectations, not a defect: a large share of the 39 (overview ×3, terminology,
audit-trail, before-you-begin, match-rules-and-rule-sets, match-rule-set-per-policy,
how-to-deal-with-exceptions, how-receipt-confirmation-exceptions-appear,
not-possible-to-base-rule-set-on-expense-type-or-account-code, when-are-match-rules-run,
match-rules-and-match-status) is **conceptual**, yielding dependencies, contradictions and notes rather
than controls. The 40-field estimate is carried by roughly a dozen procedural files.

### Page 2's seeds: one hard failure

**FINDING 1 — `tools/purchase-order-processor-experience-8b507c54.md` is an end-user screen the roster
itself rejects, and it is on the seed list.**

The file's operative sentence is:
> `The Purchase Order Processor role clicks Requests > Purchase Requests > Process Purchase Orders.`

The roster's own `deferred` entry for *PR and PO Processor / Process Purchase Orders* quotes **that exact
sentence** as the canonical example of the end-user trap, then keeps the file as a
`purchase-order-configuration` seed. Its entire relevance is one heading — *"Purchase Order Configuration
is Group-Aware"* — followed by a pointer to the setup guide; the substance duplicates
`admin/purchase-order-configuration-is-group-aware-b603f04b.md`, which is already seeded.

Risk if left: it is 1,506 bytes (10% of Page 2's stated total) whose only click path is a **Requests**
menu path. An extractor working this file can record `Requests > Purchase Requests > Process Purchase
Orders` as a Purchase Order Configuration navPath. Given that Group 3 will have no URLs to fall back on,
a poisoned navPath is unrecoverable.

**Action: remove from `purchase-order-configuration.seedFiles`, or demote to corroboration-only with an
explicit "no navPath from this file" flag.**

**Axis 2 verdict: Page 1 CLEAN; Page 2 carries one end-user seed the roster's own reasoning condemns.**

---

## AXIS 3 — IS IT ALREADY BUILT?

### The Purchase Order Policy collision — the brief's named risk. Roster is RIGHT.

I read `admin/policies-the-purchase-order-policy-new-experience-5a1ba7ef.md` (15,800 B) looking for a
distinct page. Every navigation string in it points somewhere else:

```
line  35: Payment and PO forms are accessed in Administration >Invoice > Policies.
line 128: ...by adding the Purchase Order Number field to the Payment Request Line Item Details form in the Forms and Fields tool.
line 134: Select Administration >Invoice > Forms and Fields (left menu). The Forms and Fields page appears.
```

There is **no click path to a Purchase Order Policy page anywhere in the file**, and its only headings
are its own title and `## Special Attributes of the Purchase Order Policy`. The legacy twin (1,490 B)
says outright *"A Purchase Order (PO) policy type is used to implement matching…"* — a policy **type**.
Byte ratio 15,800 : 1,490 = 10.6× confirmed by `wc -c`.

**Verdict: correctly resolved to the built `page.policies`. A Group 3 node here would have been the
duplicate the brief warned about, and would have repeated the zero-evidence-label error.** The roster
also correctly routes the 15,800 bytes to Group 1 / Group 5 as debt rather than letting it inflate
Group 3 — which is exactly the discipline that keeps the count at two.

### Neither page duplicates a built page

`Purchase Order Matching Rules` vs `page.policies`: the Policies page holds
`field.policies.po-matching-ruleset`, a **selector that points into** the rule sets this page produces.
Confirmed in the graph and in `admin/access-purchase-order-matching-rules-8407c500.md`
(*"You select a rule set using the PO Matching Ruleset option in Policies."*). Different surfaces.

`Purchase Order Configuration` settings (PO number sequencing, transmittal subject/body, branding logo,
default sender email, PO PDF field picker) appear on no built page. Confirmed by absence from the graph's
437 fields.

### FINDING 4 — a false factual claim about the graph, stated twice

The roster asserts, in `identityNotes` and again in the seed list:
> `GRAPH STATUS: configure-purchase-orders-8128725e.md is UNCITED anywhere in the graph today.`

**It is cited.** Walking every `sourceFile` in the graph (257 distinct files):

```
dep.g5g5.027  Group 5 — Data Structure & Accounting  (patch: Group 5B)
  sourceFile: admin/configure-purchase-orders-8128725e.md
  sourceQuote: "Provided the admin has added the Use Email as Bill-To field to the Purchase Order Header
                form in the Forms and Fields tool and entered an email address in the bill-to email
                address field in the Company Locations tool"
  Forms and Fields.fieldName  --depends_on-->  Company Locations.emailAddress   (both resolved)
```

The *spirit* of the claim survives — the file's 12-section field roster is unbuilt, and the one existing
citation extracts a cross-page dependency, not a field. But the stated fact is wrong, and it will be
copied into the graph as a note. It also means a Group 3 extractor working this file **must not re-mint
dep.g5g5.027** as a Group 3 dependency; the edge already exists and is fully resolved.

**Action: correct to "cited once, at `dep.g5g5.027`, for a Forms-and-Fields ↔ Company-Locations
dependency; its field roster remains unbuilt. Do not duplicate that edge."**

Also verified in the same pass: `admin/purchase-order-configuration-is-group-aware-b603f04b.md` is cited
at `dep.g1.057` and `dep.g1.058`, whose `targetRef.page` is literally `"Purchase Order Configuration"`
with `resolved: false`. **The graph is already waiting for this page under exactly this name** — which
independently settles Axis 6 for Page 2.

**Axis 3 verdict: no duplicates; the Policies collision correctly settled; one false graph-status claim.**

---

## AXIS 4 — IS IT ONE PAGE OR SEVERAL?

### Page 1 is one page, not four — ENDORSED

I verified the `copy-` redirect claim directly. `admin/copy-purchase-order-matching-rules-c6d4106a.md` is
1,007 bytes and its entire body is:
> `To copy an existing PO matching rules configuration is identical to the procedure in Step 1: Create the Purchase Order Matching Rule Set in this document.`

And `admin/edit-purchase-order-matching-rules-604d1e31.md` operates on a selected row of the same list.
This is the **Audit Rules** precedent (one page, tabs and buttons), not the Forms-and-Fields precedent.
Splitting would have been wrong. **Do not split.**

Three-Way Matching / Two-Way Matching / Receipt Confirmation correctly rejected as methods. Verified in
`admin/overview-8b37481c.md`: *"Receipt confirmation is part of the PO Matching feature set. As such, it
is configured by going to   Administration  Invoice  Purchase Order Matching Rules."*

### FINDING 6 — the "DOCUMENTED CLICK TREE" is a reconciliation presented as documentation

The roster prints a single click tree placing **both** the Rules tab and the Life to Date tab inside the
`Purchase Order Matching Rule Group rules window`, reached via `Edit Rules`. Two sibling topics place
them at **different depths**, and the roster picked one without saying so.

`admin/step-3-create-the-po-to-request-fields-matching-rules-64eb1c47.md` — the Rules tab is **one level
up**, directly in Matching Set, with no `Edit Rules` step anywhere in the procedure:
```
1.  In Purchase Order Matching Set, click the Rules tab.
2.  (Optional) You can either change a default rule by selecting and updating...
3.  Select a value from Level (Header, Vendor, Line Item, Line Item - Receipt)...
```

`admin/step-2-create-the-life-to-date-matching-rule-set-dc296ae6.md` — **two levels down**, after both
Edit and Edit Rules:
```
1.  On the Purchase Order Matching Rules page, select the rule set, and then click Edit.
2.  Select Default, then click Edit Rules...
3.  In Purchase Order Matching Rules, type a descriptive name for the new rule in Name.
4.  Click the Life to Date tab...
```

`admin/configure-three-way-matching-c043e5c8.md` agrees with step-2 and puts both tabs after `Edit Rules`.

So it is **2-against-1**, not unanimous, and the minority topic is the *only* documentation of the Rules
tab's own procedure. The brief's rule is explicit: *"Where two topics describe the same surface
differently… record BOTH and STATE THE CONTRADICTION. Do not reconcile by picking one."* The roster
reconciled by picking one, under a heading that says "DOCUMENTED".

This is not academic. For a Chromium driver with no URL, tab depth is the difference between a click that
lands and a click that does not.

**Action: replace the single tree with the majority tree plus an explicit recorded contradiction: "step-3
places the Rules tab directly in Purchase Order Matching Set with no Edit Rules step; step-2 and
configure-three-way-matching place both tabs after Edit Rules. Depth unresolved."**

### The `Purchase Order Matching Set` verdict — right conclusion, over-stated confidence

The roster's decisive evidence is real. I read the topic; the two steps are genuinely consecutive:
```
1.  In Purchase Order Matching Set, select the rule set row under Rule Set Name.
2.  Click Edit to open Purchase Order Matching Set.
```
You are in the surface before Edit opens it. So SAP is using the label loosely and it is not a peer page.
**Page-count conclusion: correct. Do not create a page.**

But the census matters and the roster did not run it:

```
$ grep -rn -F "Purchase Order Matching Set" $ROOT     # 9 hits
```
**Six of the nine are the substring `Purchase Order Matching Set|up Guide`** — the word *Setup* split
across the grep. Only **three** are the real UI label, in **two** files:
- `edit-…-604d1e31.md:29` — used for the **list**
- `edit-…-604d1e31.md:31` — used for the **editor**
- `step-3-…-64eb1c47.md:27` — used for the **editor**

On the count it is **2:1 that "Purchase Order Matching Set" names the EDITOR**, and the roster's whole
alias verdict rests on the single anomalous sentence. Both readings are defensible; the roster should say
so rather than declaring it "SETTLED". A later agent grepping that string will get 9 hits and badly
over-weight it — which is precisely how the count inflates back toward eleven.

**Axis 4 verdict: no-split ENDORSED; one silent reconciliation to undo; one alias verdict to hedge.**

---

## AXIS 6 — IS THE NAME RIGHT?

Both page names are the corpus's own strings and I would change neither.

- `Purchase Order Matching Rules` — the left-menu label, the arrival sentence, and the `Invoice > X`
  destination all use it verbatim. Independently corroborated by the graph's own unresolved ref.
- `Purchase Order Configuration` — the `Invoice > X` destination and the graph's `dep.g1.057/058`
  `targetRef.page` both use it verbatim.

**The defects are in the `aliases` arrays, and they are page-binding hazards.**

### FINDING 3 — Page 1's `aliases` contains two strings that are not aliases of the page

```json
"aliases": ["PO Matching Rules", "Purchase Order Matching Rules (New Experience)", "Match Rules",
            "matching rule set", "PO Matching Ruleset (…)", "Purchase Order Matching Set",
            "Purchase Order Matching Rule Group rules window"]
```

Two of these should not be there, and the roster's own `deferred` list says so:

1. **`Purchase Order Matching Rule Group rules window`** — the roster's own deferred entry classifies it
   `wizard-or-dialog`, *"No menu entry, no independent route"*, reached three clicks deep. It is in
   `aliases` **and** in `deferred` as a dialog, in the same document. A driver that treats it as an alias
   of the page will believe it has arrived at the list page when it is inside a modal three levels down.
2. **`PO Matching Ruleset`** — this is a **field label on the already-built Policies page**. The graph
   holds it as `field.policies.po-matching-ruleset`. Putting a built page's field label into a new page's
   alias array is the highest-value collision this roster could create: a later merge resolving
   `PO Matching Ruleset` will bind to the Group 3 page instead of the Policies field, and the
   deterministic validator — which checks quotes against files, not controls against pages — will never
   see it.

`Match Rules` and `matching rule set` are also not page names (they name the artefact the page produces),
but they are harmless as search strings. The two above are not.

**Action: delete `Purchase Order Matching Rule Group rules window` and `PO Matching Ruleset` from
`aliases`. Keep the former in `deferred` where it already correctly lives; record the latter as a
cross-page dependency endpoint on `page.policies`, which the roster already describes correctly in prose.**

### Page 2's aliases are sound

`Purchase Order Configuration tool` (body text, both dirs), `Purchase Order Configuration window` (one
revision-history line), `PO Configuration` (tools/preview-a-purchase-order). All three verified. The
`PO Configuration` collision warning is correct and important — I confirmed both surfaces exist:

```
$ grep -rn -F "PO Configuration" $ROOT
admin/configure-concur-receiving-1ececc23.md:33  In the PO Configuration section of the page that appears, select the Enable Concur Receiving option.
tools/preview-a-purchase-order-846396e1.md:29    Administrators who configure purchase orders in PO Configuration
tools/manage-images-03021850.md:82               ## Support Images and the PO Configuration Supporting Documents Feature
admin/purchase-request-and-purchase-order-8b36ae07.md:350  ...ability to add a company logo in PO Configuration...
```

**Axis 6 verdict: page NAMES ENDORSED; two alias entries must be removed.**

---

## FINDINGS THAT CROSS AXES

### FINDING 2 — `admin/purchase-order-setup-process-9f253ce7.md` is a Page 2 seed with zero supporting evidence

```
$ grep -ci "configuration" admin/purchase-order-setup-process-9f253ce7.md
0
$ grep -ni "purchase order configuration" admin/purchase-order-setup-process-9f253ce7.md
(no match)
```

The file is a setup-flow stop list — Training, PO Invoice Policy (Forms and Fields ×2, Workflow, Match
Rules), PO Import Web Service, PO Extract. **It never names the Purchase Order Configuration tool, or any
configuration, at all.** It is genuine evidence for the roster's Hypothesis B reconciliation, and it
should be cited there. It is not a source for this page.

**Action: move it out of `purchase-order-configuration.seedFiles` and cite it under `reconciliation`.**

### FINDING 8 — Page 2's entire field roster has an INFERRED page-binding, presented as attested

```
$ grep -c "Purchase Order Configuration" admin/configure-purchase-orders-8128725e.md
0
```

The file that carries **all 12 setting sections and every field on this page never names the page, and
never names a nav path.** The roster flags the missing nav path but not the missing page name. Its 12
sections are bound to `Purchase Order Configuration` by guide adjacency — by sitting near
`use-the-purchase-order-configuration-tool-51009c8c.md` under the setup guide's *"Using the Purchase Order
Configuration Tool"* section.

This is the exact defect class the brief singles out as invisible to the validator: *"every field the
build extracts gets filed under it and the error is invisible to the deterministic validator — it checks
quotes against files, not controls against pages."*

The binding is very probably right, and I found **independent corroboration the roster did not use for
this purpose** — three of the twelve settings are named against the page elsewhere:

| setting | independent binding | source |
|---|---|---|
| Company Name Without Address | `…field in the Purchase Order Configuration window.` | admin/purchase-request-and-purchase-order-8b36ae07.md:209 |
| Company Branding Logo | `…ability to add a company logo in PO Configuration…` | admin/purchase-request-and-purchase-order-8b36ae07.md:350 |
| Company Address | `…the company address in the Purchase Order Configuration tool is now optional` | release-note-summaries/june-2017-…-262adc6b.md (RELEASE NOTE) |
| Supporting Documents | `The PO configuration associated with a Group may also include supporting documents.` | tools/manage-images-03021850.md:84 |

The roster cites the first of these only as evidence for the tool-vs-window contradiction, and never
notices it is the page-binding evidence. The other three it does not cite at all.

**Action: add a `bindingBasis` note to Page 2 — "the 12-section field roster is bound to this page by
guide-section adjacency; 4 of 12 settings are independently bound by name (Company Name Without Address,
Company Branding Logo, Company Address, Supporting Documents); the remaining 8 are adjacency-only."**
That is honest, it is cheap, and it tells the field build which fields to flag.

### FINDING 10 — a missing Page 2 seed, from the third directory-crossing source

`tools/manage-images-03021850.md` (2,867 B) carries a section headed *"Support Images and the PO
Configuration Supporting Documents Feature"* and two sentences of real scoping behaviour for the
Supporting Documents setting:
> `The PO configuration associated with a Group may also include supporting documents. These documents apply to all PO transmissions performed by the PO Processor for that Group and are included alongside any documents added by the user.`

It is not in `seedFiles`. Given Page 2 has only five real sources, this is a meaningful omission — and it
is another tools-guides-first find, the same shape as the roster's own celebrated "sweep-C save".

**Action: add `concur-invoice-professional-edition-tools-guides/manage-images-03021850.md` to
`purchase-order-configuration.seedFiles`.**

### FINDING 5 — `deliverable_id` carries ZERO information, and the roster acted on it once and got it wrong

The brief instructs: *"check the front-matter deliverable_id before claiming a variant."* That heuristic
is invalid in this corpus.

```
$ grep -h "^deliverable_id:" admin/*.md | sort | uniq -c
   1209 deliverable_id: 41460672
$ grep -h "^deliverable_id:" tools/*.md | sort | uniq -c
    650 deliverable_id: 41460673
```

**It is a per-directory constant.** Every one of the 1,209 admin-guides files shares 41460672. The
discriminating field is `loio`, which is unique per topic (the two PO Matching Rules twins carry
`8b357dbb…` and `6c8fb80f…`).

The roster invokes `deliverable_id` three times as though it were evidence, and in one place it acted on
it and reached a **wrong conclusion**:

> `Line Identification for Purchase Order Matching — Two republished topics (8b356b0e / 3c7c8336) share deliverable_id — same content, not a UI variant.`

They are **not** the same content. `diff` of the two bodies:

| | `3c7c8336` Line Identification for PO Matching (1,868 B) | `8b356b0e` Purchase Order Line Identification (1,841 B) |
|---|---|---|
| control type | *"**toggle** (enable) the Allow system to associate…"* | *"the client must (select) **enable** the … option"* |
| default state | not stated | **"Line identification is set by sequence as default."** |
| procedure | numbered 2-step procedure + what happens when cleared | none; pointer to the Invoice Settings guide |
| page named | *"On the Invoice Settings page"* | *"on the Invoice Settings page"* |

If a build drops `8b356b0e` as a republish on the roster's advice, it **loses the documented default
state** and the check-box reading of a control the other file calls a toggle. This is Group 1 (Invoice
Settings) material rather than a Group 3 page, so it does not move the count — but it is exactly the
class of error the merge existed to catch, and it is caused by a heuristic the roster inherited without
testing.

**Action: strike every `deliverable_id` argument from the roster; substitute `loio` + title suffix +
byte delta. Re-flag `8b356b0e` / `3c7c8336` as two distinct topics with a control-type and default-state
discrepancy, handed to Group 1.**

### FINDING 7 — the middle-node instruction over-claims, in the one place the roster tells the build to encode something as fact

The roster's boldest structural instruction:
> `GROUP 3 MUST RECORD THE LITERAL THREE-SEGMENT PATH AND NOT NORMALISE THE MIDDLE NODE IN.`

The premise is that no PO page is ever written under `Invoice Processing Admin`. That is true. The
inference — that the three-segment form is therefore a PO-specific structural fact — is not, because
**both forms coexist for pages the graph already places under the middle node.**

```
$ grep -rc "Administration > Invoice > Forms and Fields" admin/ tools/     ->  5 occurrences
$ grep -n -A2 "Invoice Processing Admin" admin/accessing-the-forms-and-fields-page-8b2e27af.md
29:2.  Under the Invoice Processing Admin menu, click Forms and Fields.
31-    The Forms and Fields page appears.
```
Same for Invoice Settings (1 three-segment occurrence; `admin/accessing-invoice-settings-23df102d.md`
uses *"From the Invoice Processing Admin menu, select Invoice Settings."*) and Policies (4 three-segment;
`admin/accessing-and-viewing-policies-within-the-policies-tool-f3260f23.md` uses the middle node).

And decisively, `admin/configure-three-way-matching-c043e5c8.md` — a Group 3 seed — writes **both** its
click paths three-segment, including the one to Forms and Fields:
```
1.  Click Administration > Invoice > Purchase Order Matching Rules (left menu).
1.  Click Administration > Invoice > Forms and Fields (left menu).
```
So the same file abbreviates a page that provably sits under the middle node.

**Three-segment is a corpus-wide abbreviation habit, not evidence about where the PO pages hang.**

There *is* a narrower claim worth keeping, and it is stronger than the one the roster made: at the level
of the canonical `access-*` topic — the one topic per page whose job is navigation — Forms and Fields,
Invoice Settings and Exceptions all name the middle node, and
`admin/access-purchase-order-matching-rules-8407c500.md` does not. That asymmetry is real evidence. It is
still not proof.

**Action: change the instruction from "record the literal three-segment path" to "record navPath as
`[Administration, Invoice, <UNATTESTED middle node>, Purchase Order Matching Rules]` with the middle
segment marked UNKNOWN; the corpus abbreviates the middle node for built pages too, so its absence here
is not evidence of absence. A driver must try both." The roster's own hedge ("this may be a doc gap
rather than a UI fact") is right and should be promoted from a caveat to the instruction itself.**

### FINDING 12 — an unrecorded contradiction inside Page 1's own seed set, about whether a screen exists

`admin/confirmation-types-b4a94761.md` — a Page 1 seed — states flatly:
> `There is no interface available to directly enter quantities in Concur Invoice.`

`tools/concur-receiving-8b4f0098.md` states the opposite:
> `This section describes how to enter quantity receipt data manually into the Concur Invoice product.`
> `Invoice Users, Invoice Processors, and PO Processors can enter, edit, and delete receipts…`

and `tools/adding-a-receipt-fd9c5d33.md` documents the screen: *"The Enter Received Goods window
appears."*

This is a page-hood-relevant contradiction — two topics in the same 2026_08 corpus disagree about whether
a receiving interface exists at all — and the roster records it nowhere, while confidently deferring
Concur Receiving as *"a heavily documented feature with NO screen"*. That deferral is right for the
**admin** side (activation is one checkbox on Policies, verified in
`admin/configure-concur-receiving-1ececc23.md`), but the roster should not assert it while one of its own
seed files denies the end-user surface exists.

**Action: add to `configContradictions`, and soften the Concur Receiving deferral to "no ADMIN screen;
the corpus contradicts itself on whether an end-user receipt-entry interface exists."**

### Minor: two deferred-list gaps and some count drift

- `admin/adding-custom-fields-for-receipts-of-goods-469bd9d3.md` documents a real admin action — up to ten
  custom fields for receipts of goods, made required via *"the Required check box in the Add/Modify Form
  Fields window in the Forms and Fields tool"*. It belongs in the deferred list's Forms-and-Fields row
  alongside Delivery Slip Number and Receipt Type. Currently absent.
- Census drift, conclusions unaffected: roster says 27 `(left menu)` phrasings (I count 30), 80
  `page appears` names (I count 79), and *"'Purchasing Admin' has essentially one corpus hit"* (there are
  2, in `admin/purchase-order-matching-8b351a47.md:117` and `tools/purchase-order-matching-8b4f2662.md:153`
  — both revision-history lines, so the verdict stands).

---

## WHAT I TRIED TO REFUTE AND COULD NOT — EXPLICIT ENDORSEMENTS

1. **The two-page total.** Three censuses of my own plus a fourth the roster did not run (the graph's
   unresolved page references) all return the same two PO admin pages. Thin is correct here.
2. **`Purchase Order Settings` / `Purchase Request Settings` → Workflows.** Fully verified, including the
   clincher: `grep -c "select their own approver" admin/available-invoice-settings-8b3411f0.md` = **0**,
   `admin/invoice-settings-cace748d.md` = **2**. And `admin/preventing-po-transmittal-when-po-exceeds-specified-exception-level-51b11602.md`
   places the PO setting explicitly: *"The setting appears in Administration  Invoice  Workflows  Settings
   tab"*. `grep -n "settings apply globally"` returns exactly the three sibling lines corpus-wide. This is
   the roster's best work and it prevented two spurious Group 3 pages.
3. **`Purchase Order Policy` → the built Policies page.** No click path to such a page exists.
4. **One page, not four**, for the access/create/edit/copy family — `copy-…-c6d4106a.md` is a 1,007-byte
   redirect.
5. **No end-user screen seeded on Page 1**, in an area saturated with processor procedure.
6. **`separate-tool` as Page 2's kind** — `grep -F "Purchase Order Configuration page"` returns zero
   corpus-wide; the roster recorded SAP's word instead of smoothing it.
7. **No URL invented.** `grep -rc "\.asp"` returns **zero hits corpus-wide**, confirming the brief's
   premise; the roster correctly emitted no URL for either page.
8. **`Purchasing Admin` / `Receiving Admin` / `PO Admin` / punchout / catalog correctly refused** — no
   documentary basis, and the roster explicitly refused to mint the zero-hit label the critic previously
   flagged.
9. **`Supplier Invoice Creation` is invented** — verified: the only corpus trace is the phrase inside the
   one-sentence blurb of `admin/error-messages-3b8339b0.md:21`. This is a genuine finding about existing
   graph quality (`dep.g4.047.sourceRef`) and should be actioned.
10. **The New Experience twin claim** — `purchase-order-matching-rules-8b357dbb.md` 2,404 B vs
    `-new-experience-6c8fb80f.md` 4,804 B, identical click-path sentence in both, so a content superset
    rather than a navigation variant. Corroborated by `admin/purchase-order-matching-8b351a47.md:54`
    (*"Added new topics for the New Experience for Concur Invoice."*) under a September 19 2025 heading at
    line 50. Five `*new-experience*` files exist corpus-wide; exactly two are PO-domain, as claimed.
11. **The no-split proposal.** The two pages share not one file, and after corrections the group is ~76 KB
    of body across 43 files. Splitting would cost more than it saves.

---

## ONE OBSERVATION FOR THE ORCHESTRATOR, NOT A DEFECT

`Shipping Configuration` is a **PO-domain admin page** — *"create customizable shipping types and terms
for purchase requests"*, with a verified click path (`Access this tool by clicking Administration >
Invoice > Shipping Configuration, clicking a tab as required.`) and a dual role gate. The roster excludes
it because the brief's own list assigns it elsewhere, and passes its nav path and tab hint forward, which
is the right behaviour. But it means the honest statement of the finding is: **the PO *matching*
configuration area is two pages; the PO/PR configuration *domain* is three, and the third is assigned to
Group 6 by fiat rather than by evidence.** If anyone later asks why Group 3 is thin, that is part of the
answer and it is not a defect in this roster.

---

## SUMMARY TABLE

| # | Finding | Axis | Action |
|---|---|---|---|
| 1 | `tools/purchase-order-processor-experience-8b507c54.md` is an end-user screen the roster itself rejects, seeded on Page 2 | 2 | Remove from seedFiles |
| 2 | `admin/purchase-order-setup-process-9f253ce7.md` never names the page or any configuration (`grep -ci configuration` = 0) | 5 | Move to `reconciliation`, out of seedFiles |
| 3 | Page 1 `aliases` contains a 3-deep dialog name and a **built page's field label** (`PO Matching Ruleset`) | 6 | Delete both from `aliases` |
| 4 | "`configure-purchase-orders-8128725e.md` is UNCITED in the graph" is false — it is `dep.g5g5.027` | 3 | Correct; warn against duplicating the edge |
| 5 | `deliverable_id` is a per-directory constant (1209/650); acting on it mis-declared `8b356b0e`/`3c7c8336` identical when they differ on control type and default state | 5/7 | Strike the heuristic, use `loio`; restore both as distinct Group 1 sources |
| 6 | The "DOCUMENTED CLICK TREE" silently reconciles a 2-vs-1 tab-depth contradiction | 4 | Record the contradiction; do not draw one tree |
| 7 | Middle-node instruction over-claims — both path forms coexist for built pages, in a Group 3 seed file | 1 | Mark the middle segment UNKNOWN, not three-segment-literal |
| 8 | Page 2's 12-section field roster is bound to the page by guide adjacency only (4 of 12 independently bound) | 5 | Add a `bindingBasis` note |
| 9 | Richness bytes are ~24% YAML front matter; per-field economics overstated | 7 | Restate: P1 64,431 body / P2 ~10,000 body |
| 10 | `tools/manage-images-03021850.md` missing from Page 2 seeds | 7 | Add to seedFiles |
| 11 | `admin/overview-8b37481c.md` carries an unrecorded third navPath attestation for Page 1 | 1 | Add to navPathEvidence |
| 12 | Unrecorded corpus contradiction on whether a receipt-entry interface exists | 4 | Add to `configContradictions`; soften the Concur Receiving deferral |
| — | `Purchase Order Matching Set`: 6 of its 9 corpus hits are the `Setup Guide` substring; on the real 3, it names the editor 2:1 | 4 | Hedge the "SETTLED" alias verdict |
| — | `adding-custom-fields-for-receipts-of-goods-469bd9d3.md` absent from the deferred Forms-and-Fields row | 2 | Add |

**Net effect on the page roster: zero pages added, zero removed. Two remains the answer.**

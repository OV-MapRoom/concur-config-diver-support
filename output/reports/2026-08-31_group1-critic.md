## 1. Significant configuration MISSING from the graph entirely

### Invoice Settings is roughly 40% covered, not "good"

`available-invoice-settings-8b3411f0.md` — the canonical settings table — has **24 rows**. The graph kept **13**. Eleven table rows are absent (see §2 — they were all killed by the verifier, not missed by search).

Worse, three whole sources were **never opened**:

**`concur-invoice-professional-edition-admin-guides/invoice-settings-cace748d.md`** — a *second* Invoice Settings field table ("The following settings apply globally to invoices."), Professional Edition, 2026_08. Five settings, zero of them anywhere in the graph:
- `Allow users to select their own approver for payment requests` — the single highest-consequence setting on the page. Verbatim: *"If this check box is not selected, then it overrides the Editable By Group(s) and Steps Can Be Added By fields on the Edit Workflow page and the Add/Edit Workflow Steps page... you receive an error alerting you that there is a conflict."* That is a cross-page override the graph has no edge for.
- `Display payment request approval links to approvers on the home page`
- `Prevent this payment request submission when exception level exceeds X` — *"Type a number from one to 99."* A genuinely bounded numeric range, the only one on any of the three pages.
- `Filter payment request items to those that are applicable to Cost Object`
- `Allow processor to recall a payment request to last processor step`

Root cause: the last four rows are raw `<table>` HTML, not markdown pipe tables, and the file body never contains the string "Invoice Settings page" — its page binding is in the *title* only. 32 corpus files carry raw `<table>` blocks; if the extractor keyed on pipe tables, that's a systematic blind spot.

**`concur-invoice-professional-edition-admin-guides/purchase-request-settings-b0bce285.md`** — three more global settings (`Allow users to select their own approver for purchase requests`, `Display purchase request approval links to approvers on the home page`, `Prevent purchase request submission when exception level exceeds X`). Page binding is not stated anywhere in the corpus — flag for live check (§4).

**`concur-invoice-professional-edition-admin-guides/enable-the-po-change-order-feature-7dd5dcd4.md`** — `Enable Change Order`, self-contained: *"To activate this feature, admin needs to use the Invoice Settings tool by selecting (enabling) the Enable Change Order check box. The default setting is cleared (disabled)."* Dropped (§2).

### Policies: an entire documented sub-page is missing

The graph captured 7 attendee check boxes from the Modify Expense Type Properties window but missed the two most consequential controls in that same window:

- **`Exclude Attendee Types`** — `filtering-attendee-types-for-expense-types-by-exclusion-c10a54ab.md` and `filter-attendee-types-for-expense-types-by-exclusion-f4c6820d.md`. Nav is explicitly Policies: *"From the Invoice Processing Admin menu, select Policies. Select a policy, and then choose Expense Types. Configure the expense type to exclude attendees by navigating to the Exclude Attendee Types and noting the status: Add: Appears when no attendees have been excluded. Modify (#): Appears when <#> number of attendees are excluded."* That is a **genuinely enumerated two-state control** (`Add` / `Modify (#)`) plus an `Exclude` check-box column inside the window. It also carries a hard dependency the graph lacks: *"If the form assigned to an expense type does not include the Attendees field, the feature cannot be used because the Exclude Attendee Types column... will not appear."* (`overview-restrict-attendee-types-by-expense-type-f4d30af3.md`)
- **`Default Attendee Type`** — documented twice (`set-the-default-attendee-type-for-an-expense-type-65d01766.md`, `setting-the-default-attendee-type-for-an-expense-type-39cd5f09.md`): *"In the Default Attendee Type list, select one attendee type."* with a dependency on the exclusion setting above: *"The list of available attendees may be limited if some attendee types have been excluded for the expense type."*

Also missing on Policies: **`Save`** on the Modify Policy General page. `edit-the-existing-policy-information-81206c52.md`: *"On the Policies page, select the desired policy. Choose Modify. The General page appears. Edit the information. Select Save."* The step-plan asserts in rationale that "no such control appears in the verified Policies field set" — it does, in a file nobody cited. Same for the auto-submit editor: `setting-the-automatic-submission-conditions-for-submit-action-88fe4a03.md` ends *"Select Save."*

And **`Require PO Matching?`** — `components-of-the-policy-3bf075f8.md`: *"Companies who wish to use the Purchase Order Matching feature select the Require PO Matching? field to activate and specify the needed rule set configuration in PO Matching Ruleset."* The `(Optional) PO Forms` refuter correctly identified this as a distinct field and then nobody emitted it.

### Group Configurations

`overview-8b2edfd0.md`: *"The Invoice tab of Group Configurations within Invoice Processing Admin is used to identify and configure the groups necessary to provide employees with different policies, audit rules, payment types, car configurations, receipt limits, payment hold configurations, and email reminders."* The graph models exactly **two** of those seven columns (Policies, and Attendee Types — which it then dropped). `access-the-group-configurations-tool-6f974fe5.md` makes one of the missing ones mandatory: *"to create a new group, you must edit the policies and payment types to define which ones are active for that group."* The step-plan `g1-s3` therefore cannot actually finish creating a group.

---

## 2. Drops that were WRONG

### The big one: 11 real Invoice Settings rows killed on a vocabulary technicality

Every one of these was verified verbatim, the refuter wrote **"Survives"**, and the grounding critic dropped it anyway because the literals `Enabled (selected)` / `Disabled (cleared)` don't appear *in the topic file cited*:

`Hide Payment Request Delete Link for Payment User` · `Hide Add and Delete Item Link for Payment Processor User` · `Hide Add and Delete Item Link for Payment Approver User` · `Allow processor users to approve requests that are pending other approvers` · `Allow users to manage favorite allocations for payment and purchase request` · `Assign invoice to Purchase Request Owner` · `Allow Purchase Request Owners to Transmit their own Purchase Orders` · `Allow Purchase Request Owners to Edit their own Purchase Orders` · `Enable Create and Approval for Invoice Vendor` · `Allow system to associate Invoice lines to Purchase Order lines based on data attributes` · `Enable Change Order`

Both strings **are** verbatim corpus text — in the Default Status column of `available-invoice-settings-8b3411f0.md`, which the pipeline had already read and which the kept fields cite for exactly the same purpose. The fix is one line: set `sourceFile` to the canonical table, or `validValues: []`. Eleven fields lost to a citation-hygiene error, while structurally identical fields on the same page survived. That is the single largest defect in this build.

### Circular kill: `Limit Processors, Approvers, or Managers to use invoice owners vendor list`

A duplicate pair was submitted. The lowercase entry's refuter says *"Keep the title-case candidate; drop this one."* The title-case entry's grounding says *"Keep the lowercase variant."* **Both were dropped.** The control is row 8 of the canonical table, verbatim, title-case with the Oxford comma. It is now entirely absent from the graph.

### `Attendee Types` column (Group Configurations)

Refuter verdict: *"REFUTED as submitted (the column itself is real — re-emit it corrected)."* It was never re-emitted. The correct quote was even handed over: *"On the Group Configurations page, click the Modify link in the Attendee Types column for the group you want to affect."* (`procedure-configure-attendee-types-by-user-groups-4a865d21.md`). The child `attendee type active check boxes` node survives with no parent control to reach it — the step plan's order 15 references a Modify link that isn't in the graph.

### `Invoice tab` (Group Configurations)

Same pattern: *"REFUTED as submitted (the tab is real — re-emit corrected)... Re-emit as a tab with empty validValues."* Never re-emitted. `g1-s3` order 1 says "on the Invoice tab, click New" against a field that doesn't exist. Grounded: *"Click the Invoice tab if it is not already selected."* (`step-1-enable-by-invoice-group-ebe8724b.md`).

### Drops I agree with
`(Optional) PO Forms`, `Print Formats`, `Activate / Deactivate`, `and / or`, `Purchase Request Configuration`, `Global`, `row selection check boxes`, `vendor group name`, `Forms Fields`, `Group (list column)`, `Expense Report Workflow` — all correctly refuted. `Enable Manage Vendors Link for Invoice User` — agree, the polarity really is unresolvable, but it needs a live check (§4), not silent deletion.

---

## 3. Mis-assigned surviving fields

No survivor is on a flatly wrong page, but one cluster is mis-homed:

**The 7 attendee check boxes on Policies** (`Enable Attendee`, `Show Cost per Attendee`, `Allow users to edit the Cost per Attendee`, `Allow users to enter the count of "No Shows"`, `Allow users to edit the count of attendees`, `Include user as an attendee by default`, `Display the Add New Attendees button from the attendee table`) — their canonical field table is on a **different admin page**. `edit-expense-types-c6d0b6fc.md` navigates *"Click Administration Invoice Expense Types... Click Next until you reach the Attendees tab"* and only then adds *"The options in the Attendees step in the Expense Types tool... are also available in the Policies tool."* Every field description the graph used was lifted from the Expense Types page. These are **dual-homed**, and the label differs by page (Expense Types says "Display the Add New Attendees button"; the Policies procedure says "Display the New Attendee button"). Model them as Expense Types-primary with a Policies alias, or a crawler will fail to find them on the Expense Types page at all.

Two survivors used weak quotes when better ones existed on the same page:
- `Email Alias` — cited *"Now, the functionality appears in Group Configuration > Vendor Access"*. The real one is `configuration-feature-activation-5fe44fe7.md:103`: *"In the Configuration for Group window, select the preferred email alias from the Email Alias list."*
- `Group (Vendor Access list)` — same file, line 100: *"In the Group list, select a vendor group, and then click Modify."* Grounded verbatim; the emitted note reads like inference.

---

## 4. Genuinely thin — Luke's manual spot-check list

Ranked by how much of the graph is load-bearing on the answer:

1. **Auto Submit Conditions editor (Policies).** Corpus documents `Insert`, `Apply Auto Submit to Assignment`, `Save` and nothing else. No operators, no operands, no field list — only a worked example ("vendor Acme", "$1,200.00"). A writer cannot author a condition from this graph.
2. **Purchase Request Configuration group (Policies).** `policy-c8ec906b.md` says it displays *"the Purchase Request Configuration options (forms and workflow selections)"* and never names a single one. Probably 3–5 fields, all unknown.
3. **Group Configurations columns beyond Policies.** Confirm which of *payment types, audit rules, car configurations, receipt limits, payment hold configurations, email reminders* actually render as columns with Modify links. Payment Types especially — the corpus makes it mandatory for group creation but never gives it a field table.
4. **`Require PO Matching?` vs `Is PO Policy?`.** Two labels, two files, possibly one control, possibly two (a master PO toggle plus a matching sub-toggle). This determines whether `g1-s2` order 4 is correct.
5. **`PO Receipt From`.** One bare bullet, `create-a-new-policy-dd9549c0.md:171`, no description. Sibling bullets all end in "Form", and `Purchase Order Receipt` is a real form elsewhere — almost certainly `PO Receipt Form`. Confirm the label and whether it's a fourth PO form dropdown.
6. **`Can request a new vendor?`.** Only `Yes` is ever written in 2026_08. The complementary option is never named. Confirm it's Yes/No and not a three-value list.
7. **`Default shipping terms`.** No verb anywhere — text box or dropdown is undetermined. And **`Default shipping method`** — corpus says "Select" but never enumerates a single carrier code.
8. **`Timestamp Configuration`.** Only `Japan e-Bunsho` is ever named. Is that the whole list?
9. **Vendor banking per-role selectors (Group Configurations).** The three values are enumerated; *which roles* get a selector is not. Count the rows.
10. **Purchase Request Settings (3 settings).** Are they on the Invoice Settings page, or a separate Purchase Request Settings page? The corpus gives no nav path at all.
11. **`Enable Manage Vendors Link for Invoice User` polarity.** *"To suppress the display of the Manage Vendors link... select the Enable Manage Vendors Link for Invoice User check box"* — selecting "Enable" suppresses. Its sibling topic is literally titled `[Delete] Suppressing Display of the Manage Vendors Link` with an empty body. Verify it still exists before spending any graph on it.
12. **Policies commit control.** The wizard ends *"Select Done."*; the Modify path ends *"Select Save."* Confirm both exist.
13. **`Editable By Group(s)` widget.** Typed `multiselect` in the graph on no textual warrant — the corpus only says "Select the group(s)". Likely a hierarchy tree picker like the Select Group modal.

---

## 5. Doc drift vs. the original plan's page names/paths

Yes, and it is not cosmetic.

**Invoice Settings has four distinct navigation paths in 2026_08:**
- `Administration > Invoice` → *"From the Invoice Processing Admin menu, select Invoice Settings"* (`accessing-invoice-settings-23df102d.md`)
- `Administration > Invoice > Invoice Settings (left menu)` (`enable-the-po-change-order-feature-7dd5dcd4.md`)
- `Invoice > Invoice Settings` (`accessing-invoice-pay-related-settings-bccf120b.md`)
- **`Administration > Expense & Invoice Settings > Invoice Settings > Invoice Compliance`** (`accessing-invoice-pay-related-settings-4b605020.md`) — a completely different menu spine, and "Expense & Invoice Settings" appears nowhere else in the graph.

The last one matters: two files with the *same title* ("Accessing Invoice Pay Related Settings") give two irreconcilable paths. That is unmigrated content, and a crawler that trusts one will not find the page.

**A "New Experience" UI variant exists and the graph has no concept of it.** `policies-the-purchase-order-policy-new-experience-5a1ba7ef.md` sits alongside `policies-the-purchase-order-policy` (old). Same for `purchase-order-matching-rules-new-experience-6c8fb80f.md`, `using-the-invoice-manager-page-new-experience-f83ba5fa.md`, `using-the-unassigned-invoice-page-new-experience-072e2f18.md`. If the tenant is on the New Experience, the Policies page layout the graph describes may be the legacy one.

**Label drift the graph should carry as aliases:**
- `Hide Payment Request Delete Link for Payment User` (canonical table) vs `Hide payment request Delete link for Payment user` (`overview-8b344b0a.md`) — casing differs in the same guide.
- `Group Configuration` (singular) vs `Group Configurations` vs `Group Configurations List page` — three page names for one page.
- `Modify Policy page` vs *"The General page appears"* (`edit-the-existing-policy-information-81206c52.md`) — the graph's "Modify Policy page (General tab)" is a construction; the corpus calls it the General page.
- `Payment Request` → `Invoice` terminology is half-migrated: field labels still say "Payment Request", body prose says "invoice", and `Payment Request Policy` is still the name of the base policy to copy.
- `Administration >Invoice` (missing space) appears 3× vs `Administration > Invoice` 4× — cosmetic, but it broke at least one exact-substring match in this build.
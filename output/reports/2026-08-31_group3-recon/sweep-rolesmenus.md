# Group 3 (PO Matching) — Page Roster Recon — SWEEP D: ROLES, PERMISSIONS, FEATURE ACTIVATION

Sweep name: `rolesmenus`
Corpus: `/mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE`, SAP 2026_08, Professional Edition, crawled 2026-08-29.
Two guide dirs counted equally: `concur-invoice-professional-edition-admin-guides` (1209 files), `concur-invoice-professional-edition-tools-guides` (650 files).
Release-note dirs consulted for corroboration ONLY, and labelled as such.
Product of this run: PAGE IDENTITY. No fields extracted. No settings tables built.

---

## HEADLINE

Entered from roles/permissions/activation. The PO admin-configuration surface that the corpus
actually names, that is not already one of the 18 built pages, is **TWO pages**:

1. **Purchase Order Matching Rules** — its own left-menu entry under `Administration > Invoice`,
   role-gated to the Invoice Configuration administrator by two independent required-roles topics
   (one in each guide directory). Richest documentation in the whole PO area.
2. **Purchase Order Configuration** — its own left-menu entry under `Administration > Invoice`,
   role-gated to the Invoice Configuration administrator, group-aware.

Everything else the PO area is "documented as configuring" resolves to a page **already in the
graph** (Invoice Settings, Policies, Forms and Fields, Company Locations, Audit Rules), to
**Workflows** (its own unbuilt group, explicitly not Group 3), to the **shared User Permissions**
page (Company Admin, arguably Group 7), or to an **end-user / processor screen** with no config of
its own.

**THIN IS THE ANSWER HERE.** Group 3 as a distinct page set is small — two pages, plus whatever the
other five sweeps turn up. That is a finding, not a shortfall.

---

## WHAT I SEARCHED

### Sweep D-1 — role and permission topics
File-name sweep across both guide dirs for `role`, `permission`, `rights`. 84 matching files.
Read in full every one that could touch PO:
`required-roles-*` (16 files, both dirs), `required-roles-for-setup-*`, `required-roles-and-primary-users-*`,
`access-by-roles-*`, `additional-roles-*`, `combine-invoice-roles-for-invoice-tasks-*`,
`concur-receiving-roles-*`, `purchase-request-roles-*`, `invoice-purchasing-user-role-*`,
`configure-modify-rights-for-the-purchasing-user-role-*`, `invoice-processor-roles-*`,
`processor-role-*`, `invoice-configuration-administrator-or-invoice-admin-*`,
`scan-configuration-and-the-invoice-image-processor-role-*`, `step-4-assign-the-proper-rights-to-users-*`.

Content sweep for `Invoice Configuration Administrator`, `Invoice Processor`, `Purchasing`,
`PO Administrator`, `Purchasing Admin`, `Receiving`, `Concur Receiving`, `Central Receiver`,
`Receipt User role`, `only an administrator`, `you must have the`, `user permissions`.

### Sweep D-2 — feature-activation topics
Content sweep for `service request`, `SAP Concur support`, `must be activated`, `must be enabled`,
`feature must be`, `activate`, `enable the`. Read the three named starting points
(`activate-the-multiple-purchase-order-feature-*`, `enable-the-po-change-order-feature-*`,
`configure-three-way-matching-*`) plus `activating-the-multiple-purchase-order-feature-*`,
`enable-purchase-requests-*`, `configure-concur-receiving-*`.

### Sweep D-3 — navigation, because roles index the menu
Corpus-wide extraction of every `Administration > Invoice > …` string (both the spaced and the
`Administration >Invoice` trap form) and every `Click X (left menu)` string. Then a corpus-wide
extraction of every `the X tool` / `X Admin page` / `X Configuration page` phrase, to catch an admin
surface named as a tool rather than a menu item.

### Sweep D-4 — release notes (corroboration only)
`Purchase Order Matching Rules`, `Purchase Order Configuration`, `PO Matching Rules`,
`Receiving feature`, `Change Order`, `Multiple Purchase Order` across both release-note dirs.
Exactly one useful corroboration (June 2017 admin summary, PO Configuration tool). Labelled below.

---

## THE LEFT-MENU CENSUS (the strongest single artefact this sweep produced)

Every distinct `Administration > Invoice > <label>` string in both guide dirs, with occurrence count.
This is the whole documented Invoice admin menu as SAP writes it:

```
19  Administration > Invoice
11  Administration > Invoice > Workflows
 7  Administration > Invoice > Capture Processing Admin
 5  Administration > Invoice > Tax Administration
 5  Administration > Invoice > Forms and Fields
 4  Administration > Invoice Admin
 3  Administration > Invoice > Purchase Order Matching Rules      <-- GROUP 3
 3  Administration > Invoice > Group Configurations
 2  Administration >Invoice > Policies        (no-space trap form)
 2  Administration >Invoice > Forms and Fields (no-space trap form)
 2  Administration > Invoice > Purchase Order Configuration       <-- GROUP 3
 2  Administration > Invoice > Policies
 2  Administration > Invoice > Localization
 1  Administration > Invoice > Vendor Handling
 1  Administration > Invoice > Units Of Measure
 1  Administration > Invoice > Shipping Configuration
 1  Administration > Invoice > Polices        ("Polices" misspelling trap)
 1  Administration > Invoice > Invoice Settings
 1  Administration > Invoice > Invoice Processing Admin
 1  Administration > Invoice > Image Handling
 1  Administration > Invoice > Delegate Configurations
 1  Administration > Invoice > Company Locations
 1  Administration > Invoice > Audit Rules
```

Only **two** PO-domain labels appear. There is no `Purchase Requests`, no `Receiving`, no
`PO Settings`, no `Matching` menu entry anywhere in the corpus. If a Group 3 page exists beyond
these two, it is not reachable by a documented `Administration > Invoice` click.

The `Click X (left menu)` census is consistent: `Purchase Order Matching Rules` is the only PO-domain
left-menu click in the corpus.

---

## CANDIDATE 1 — Purchase Order Matching Rules

**Verdict: a distinct admin PAGE, reached by its own left-menu click. HIGH confidence.**

Nav (three independent phrasings, all verbatim-verified):
- `Administration > Invoice` then `Purchase Order Matching Rules (left menu)` — the two-step
  form in `access-purchase-order-matching-rules-8407c500.md`, which then says *"The Purchase Order
  Matching Rules page appears."* That sentence is the page-hood proof.
- `Administration > Invoice > Purchase Order Matching Rules (left menu)` — one-line form in
  `configure-three-way-matching-c043e5c8.md`.
- `Administration > Invoice > Purchase Order Matching Rules` — in both
  `purchase-order-matching-rules-8b357dbb.md` and its New Experience twin.

Role gate — TWO independent topics, one per guide directory, with slightly different capitalisation:
- admin-guides `required-roles-ec6fae13.md`: *"Only the user with the Invoice Configuration
  Administrator role can access and configure the Purchase Order Matching Rules feature."*
- tools-guides `required-roles-ef2c2901.md`: *"Only the Invoice Configuration administrator can
  access and configure the Purchase Order Matching Rules feature."*

This is exactly the Sweep-D payoff: the role topic names the surface AND asserts an exclusive gate.

Internal structure the corpus names (tabs and dialogs INSIDE this page — do **not** promote to pages):
- **Rules tab** and **Life to Date tab** — `configure-three-way-matching-c043e5c8.md`.
  CAUTION: "Rules tab" is also a tab on the **Email Reminders** page (`create-reminder-rules-*`,
  `copy-reminder-rules-*`). Same label, different page. A future field build must bind by page.
- **Purchase Order Matching Rule Group rules** window — a dialog: *"The Purchase Order Matching Rule
  Group rules window appears."*
- **Purchase Order Matching Rules Group Conditions** — a second dialog, `step-4-add-condition-based-rule-to-a-named-rules-group-db93fb81.md`.
- Rule-set list columns: Rule Set Name, In Use, Associated Policies.

**Legacy / New Experience twin — both exist in the SAME deliverable (`deliverable_id: 41460672`):**
| file | bytes |
|---|---|
| `purchase-order-matching-rules-8b357dbb.md` (legacy) | 2404 |
| `purchase-order-matching-rules-new-experience-6c8fb80f.md` (New Experience) | **4804** |

The NE topic is a strict superset: identical opening, then adds "Before You Begin", the rule-set
naming/versioning practice, the *"Unlock" a Matching Rule Set From Its In-Use Status* procedure, and
the exchange-rates note. **Both give the SAME nav path and SAME page name** — so this is a richer
republication, not a UI-variant page split. Build from the NE file.

Where the rich material is (aim the real build here — ~35 KB, all admin-guides):
```
5689  configure-three-way-matching-c043e5c8.md
4921  step-2-create-the-life-to-date-matching-rule-set-dc296ae6.md
4804  purchase-order-matching-rules-new-experience-6c8fb80f.md
3721  step-3-create-the-po-to-request-fields-matching-rules-64eb1c47.md
3476  step-4-add-condition-based-rule-to-a-named-rules-group-db93fb81.md
2699  create-purchase-order-matching-rules-adb700f9.md
2676  refine-the-rules-combine-the-life-to-date-and-rules-rule-types-2b46973f.md
2404  purchase-order-matching-rules-8b357dbb.md
2214  edit-purchase-order-matching-rules-604d1e31.md
2202  refine-the-rules-include-condition-based-rules-in-a-rule-set-ad7b0d65.md
2093  access-purchase-order-matching-rules-8407c500.md
1982  amounts-and-tolerances-ab795b1f.md
1445  step-1-create-the-purchase-order-matching-rule-set-4d3866f3.md
1362  refine-the-rules-allow-submission-despite-tolerance-9b96d467.md
1152  overview-8b37481c.md
1074  activate-exchange-rates-for-matching-rule-sets-c51af31c.md
1007  copy-purchase-order-matching-rules-c6d4106a.md
```

Cross-page dependency worth flagging now: the rule set is **selected on the Policies page** via the
`PO Matching Ruleset` option (`policies-the-purchase-order-policy-new-experience-5a1ba7ef.md`), and
an In-Use rule set is locked. Order of operations: create rule set here → assign on Policies.

Text trap: `overview-8b37481c.md` writes the path with the `>` glyphs stripped —
`"Administration  Invoice  Purchase Order Matching Rules"`. Any regex requiring `>` misses it.

---

## CANDIDATE 2 — Purchase Order Configuration

**Verdict: a distinct admin PAGE / left-menu tool. HIGH confidence.**

Nav — two independent topics, one per guide directory:
- admin-guides `use-the-purchase-order-configuration-tool-51009c8c.md`: *"To view this tool, click
  Administration > Invoice > Purchase Order Configuration."*
- tools-guides `preview-a-purchase-order-846396e1.md`: *"the Invoice Configuration administrator uses
  the Purchase Order Configuration tool (Administration > Invoice > Purchase Order Configuration)"*

Role gate: *"The Purchase Order Configuration tool is available to the Invoice Configuration
administrator for setting default information for purchase orders."*

Naming contradiction to record, not to reconcile: the corpus calls this a **tool** in every hit
(`the Purchase Order Configuration tool`, ×2 plus a section-title reference *"the Using the Purchase
Order Configuration Tool section"*). It is never once called "the Purchase Order Configuration
**page**". Contrast Candidate 1, which is always "page" and never "tool". Both are reached by the same
kind of `Administration > Invoice > X` click, so I treat both as pages, but the label difference is
real and is recorded.

Scoping behaviour (page-level, so in scope for identity even though fields are not):
`purchase-order-configuration-is-group-aware-b603f04b.md` — *"Each PO configuration you create is
based on the Group you select before creating the configuration."* and *"Groups with no PO
configuration assigned use the Global Group configuration by default."* So the page opens on a
Group selection, exactly like Group Configurations. A Chromium driver must pick a Group first.

Rich material: `configure-purchase-orders-8128725e.md` (5956 bytes, admin-guides) is the body — PO
Number Generation, transmittal message, default email subject/message, company address, supporting
documents, company branding logo, default sender email, fields-to-appear-on-POs, Ship To Without
Requestor Name, Company Name Without Address, Use Email as Bill-To. That file is where the real
field build should aim. Cross-page dependency it names: `Use Email as Bill-To` requires the field
added in **Forms and Fields** and an address in **Company Locations** — both already in the graph.

Release-note corroboration (LABELLED AS A RELEASE NOTE, not a field source):
`concur-invoice-professional-edition-release-note-summaries/june-2017-invoice-professional-edition-admin-summary-262adc6b.md`
— *"the company address in the Purchase Order Configuration tool is now optional"*. Confirms the tool
name has been stable and is not a doc artefact.

---

## CANDIDATE 3 — User Permissions (Invoice tab)

**Verdict: a real admin page with a documented click path, but I do NOT believe it is a Group 3
page. MEDIUM confidence on page-hood, LOW that it belongs here. Reported because Sweep D is the only
sweep that would surface it at all.**

This is where every PO role is assigned, and PO features are gated on roles that live nowhere else:
- `purchase-request-roles-6dbd7af9.md`: *"The User Permissions administrator can assign the following
  PR-specific roles using the Invoice tab of User Permissions"* — Purchase Request User, Purchase
  Request Approver, Purchase Request Processor, **Purchase Order Processor**, Purchase Request Proxy.
- `concur-receiving-8b4f0098.md`: the Receipt User role is *"added ... in User Permissions"*.
- Nav is documented, but only in a NON-PO topic —
  `scan-configuration-and-the-invoice-image-processor-role-51c9d888.md`: *"To access the User
  Permissions page, click Administration > Company > Company Admin, and then click User Permissions
  (left menu)."* Note this is `Administration > Company`, NOT `Administration > Invoice`.

Contradiction in how the corpus reaches it: `step-2-assign-the-tax-administrator-role-b7f391c8.md`
writes *"Click User Administration > User Permissions > Invoice tab of the Company Admin tool"* —
a third menu spelling. Recorded, not reconciled.

Why I would not put it in Group 3: it is a **Shared** product surface, its click path leaves the
Invoice menu entirely, and it gates every group's pages equally. It looks like Group 7 (Ops) or a
cross-cutting node. The PO-specific fact worth keeping regardless is that the **Invoice tab** of that
page is where PO/PR roles live.

---

## CANDIDATE 4 — "Concur Receiving" (feature name, NOT a page)

**Verdict: FEATURE NAME ONLY. No screen of its own. HIGH confidence.**

Concur Receiving looks like it should have a config page — it has its own roles table, its own
overview topic, its own activation language (*"The Concur Receiving feature must be activated."*
×2 in `concur-receiving-roles-099f375f.md`). It does not have one. Its configuration lives on an
existing page:

`configure-concur-receiving-1ececc23.md`:
- *"the administrator needs to go to Administration > Invoice > Policies to activate the Receiving feature."*
- *"Select Administration > Invoice > Polices (left menu). The Policies page appears."* ← note the
  **"Polices"** misspelling trap, live in the corpus.
- *"In the PO Configuration section of the page that appears, select the Enable Concur Receiving option."*
- Downstream: *"Once this feature has been activated, the Purchase Order Receipt form in the Forms
  and Fields tool will automatically be used."*

So: activation = **Policies** page (Group 1), `PO Configuration` section, `Enable Concur Receiving`.
Consequence = **Forms and Fields** (Group 5). Roles = **User Permissions**. Nothing new.

I am flagging this as a candidate rather than a rejection because the sheer volume of Concur
Receiving documentation will tempt another sweep into minting a page for it. It should not exist as
a page node. This is precisely the "label with zero page evidence" error the critic caught before.

---

## CANDIDATE 5 — "Multiple Purchase Order" feature (feature name, NOT a page)

**Verdict: FEATURE NAME ONLY. HIGH confidence.** Activated by adding a field on an existing page:
`activate-the-multiple-purchase-order-feature-84e92edd.md` — *"Select Administration >Invoice > Forms
and Fields (left menu). The Forms and Fields page appears."* (note the `>Invoice` no-space trap),
then add the `Purchase Order Number` field to the `Payment Request Line Item Details` form.

Twin pair, same deliverable, gerund vs imperative — this is the "same content republished" trap, NOT
a UI variant:
| file | bytes |
|---|---|
| `activate-the-multiple-purchase-order-feature-84e92edd.md` (imperative) | **2418** |
| `activating-the-multiple-purchase-order-feature-aab8aaa8.md` (gerund) | 1521 |
The imperative one is richer — it carries the 5-step procedure the gerund one drops.

Second gate, worth a config writer's attention: `enabling-and-disabling-line-item-level-po-ef3f19cd.md`
says the runtime command exists *"provided the Multiple Purchase Orders feature has been activated by
SAP Concur staff"* — which CONTRADICTS the Forms-and-Fields self-service activation above. Two
topics, two different activation stories. Recorded, not reconciled.

---

## CANDIDATE 6 — "PO Change Order" feature (feature name, NOT a page)

**Verdict: FEATURE NAME ONLY. HIGH confidence.** `enable-the-po-change-order-feature-7dd5dcd4.md`:
*"To activate this feature, admin needs to use the Invoice Settings tool by selecting (enabling) the
Enable Change Order check box."* and *"To access the option, the admin must click Administration >
Invoice > Invoice Settings (left menu)."* → **Invoice Settings**, already Group 1.

---

## CANDIDATE 7 — "Purchase Request" feature (support-gated, NOT a page)

**Verdict: ACTIVATION GATE, no page. HIGH confidence.** `enable-purchase-requests-9c0026e0.md`:
*"SAP Concur staff enables the Purchase Request feature. You must initiate a service request with SAP
Concur support to have the feature enabled."*

This is load-bearing for a config writer: **none of the PR/PO surface is reachable until support
turns this on**, and `purchase-request-roles-6dbd7af9.md` adds that the required admin roles may
themselves be withheld — *"At least one of these roles may not be available to the client, and a
service request will need to be submitted to SAP Concur support."* Double gate: feature, then role.

---

## RULED OUT (and where the configuration actually lives)

| Surface | Why not a Group 3 page | Where its config lives |
|---|---|---|
| **Purchase Order Settings** / **Purchase Request Settings** (`purchase-order-settings-a5a997b4.md` 1417 B, `purchase-request-settings-b0bce285.md` 3735 B) | Both open *"The following settings apply globally to…"* — a settings-table section, never called a page, never given a nav path. The one named setting, `Prevent purchase order transmission when exception level exceeds X`, is placed by `preventing-po-transmittal-when-po-exceeds-specified-exception-level-51b11602.md` at *"Administration  Invoice  Workflows  Settings tab"* (glyphs stripped), and by `general-information-8b3b0308.md` as *"New Settings tab option: Prevent purchase order transmissions setting."* | **Workflows > Settings tab** — Workflows is its own 13-page group, explicitly NOT Group 3. Corroborated by `workflow-creation-process-1d37b85f.md`: *"the Settings section of the Workflows tool"*. |
| **Purchase Order Policy** / **PO Configuration section** | A policy TYPE and a section on an existing page, not a page. `policies-the-purchase-order-policy-new-experience-5a1ba7ef.md`: *"Is PO Policy: Select this option to define the policy as PO-related."* and *"Payment and PO forms are accessed in Administration >Invoice > Policies."* | **Policies** (Group 1). **BUT SEE THE DEBT NOTE BELOW.** |
| **Purchase Order tab** (`purchase-order-tab-195b6e13.md`, 2332 B) and **Matching Summary tab** | Tabs inside an opened invoice, used by processors/users at runtime. 14 and 9 corpus mentions respectively, all runtime. | Which forms/fields appear on them = **Forms and Fields** (Group 5), scoped by the PO policy on **Policies**. |
| **All Purchase Orders** (`Requests > All Purchase Orders`) | A list page for processors. Named only in the two Concur Receiving role tables: *"navigating to the Requests > All Purchase Orders page."* The revision history in `purchase-order-matching-8b351a47.md` calls it *"the new All Purchase Orders list page for Purchasing Admins"* — "Admins" here means purchasing staff, not a config administrator. It has no settings. | Who can see it = **User Permissions** (Purchase Order Processor / Purchase Order Processor (Audit) roles). |
| **All Orders**, **Purchase Orders Pending Transmission**, **Purchase Details**, **Create New Invoice**, **MultiPO**, **Image Received**, **Verification** | End-user / processor runtime screens. This is the PO area's documented-heavy end-user trap. | Forms/fields = **Forms and Fields**; behaviour flags = **Invoice Settings**; approval steps = **Workflows**. |
| **Invoice Preferences** (`Profile > Profile Settings > Invoice Preferences`) | End-user Profile page. `notify-purchase-request-users-when-purchase-order-transmitted-055f367e.md` routes PO-transmitted email notifications here — *"the purchase request user needs to activate the feature in Profile."* | End-user self-service; the admin-side default shipping address is in **Company Locations** (Group 5). |
| **Purchase Request Processor** / **PR and PO Processor** query tools (`create-new-queries-in-pr-and-po-processor-*`, `edit-…`, `delete-…`, `export-query-results-…`) | Processor work tools, not config. | Nothing configurable found; roles in **User Permissions**. |
| **Invoice Purchasing User** surface | A ROLE, not a page. `invoice-purchasing-user-role-8b4f1366.md`: this role *"can be configured via policy to act as the sole user with permissions to review and edit form field data"*. | `configure-modify-rights-for-the-purchasing-user-role-7d9aaafe.md`: *"The ability to allow the Purchasing User to review and edit form fields is tied to setup of forms and fields in policies."* → **Forms and Fields** + **Policies**, both built. |
| **Shipping Configuration**, **Peppol Configuration**, **Localization**, **Vendor Handling**, **Delegate Configurations**, **Feature Hierarchies** | Appear in the left-menu census but are out of Group 3 by the brief (Groups 6/7 or unbuilt). | n/a |
| **Import/Extract Administrator tool** | Named for PO Import / PO Extract / Quantity Receipt Import. Never given an Invoice-menu nav path; explicitly run by SAP Concur staff in several topics. | Cross-product Ops surface — Group 7 territory, if anywhere. |

---

## OUTSTANDING DEBT THIS SWEEP CONFIRMS (Groups 1–2 built from a stub)

The brief's named example is real and I re-measured it:

| file | bytes |
|---|---|
| `policies-the-purchase-order-policy-8b35454a.md` (legacy) | 1490 |
| `policies-the-purchase-order-policy-new-experience-5a1ba7ef.md` (New Experience) | **15800** |

The legacy file stops after two paragraphs. The NE file carries `Special Attributes of the Purchase
Order Policy`, `Purchase Order Policy Fields` (Is PO Policy, PO Matching Ruleset, External ID),
`Configure Forms and Fields for Purchase Order Copy Down to PR`, `Configure Selective Copy Down`, and
more. That is roughly 14 KB of PO controls hanging off the **Policies** page (Group 1) that a build
from the stub would have missed entirely. Group 3 will need to write PO-related fields onto the
existing `page.policies` node rather than onto a new page.

Twin inventory for the whole PO area (front-matter `deliverable_id` checked on each; all are the same
deliverable `41460672`, i.e. republications, not separate UI variants):

| pair | legacy / gerund | New Experience / imperative | richer |
|---|---|---|---|
| PO Policy | `policies-the-purchase-order-policy-8b35454a.md` 1490 | `policies-the-purchase-order-policy-new-experience-5a1ba7ef.md` **15800** | New Experience, by 10× |
| PO Matching Rules | `purchase-order-matching-rules-8b357dbb.md` 2404 | `purchase-order-matching-rules-new-experience-6c8fb80f.md` **4804** | New Experience |
| Multiple PO activation | `activating-the-multiple-purchase-order-feature-aab8aaa8.md` 1521 | `activate-the-multiple-purchase-order-feature-84e92edd.md` **2418** | imperative |
| Concur Receiving roles | `concur-receiving-roles-099f375f.md` 2690 (admin-guides) | `required-roles-ef2c2901.md` **2711** (tools-guides) | tools-guides, marginally — but it is the one that ALSO carries the PO Matching Rules role gate |
| PR-owner PO **edit** | `allow-purchase-request-owners-to-edit-their-own-purchase-orders-7d79319c.md` 1366 | `…-4a3f8202.md` **1400** | `4a3f8202`, marginally — it is the one carrying the full `Invoice Settings (left menu)` click path |
| PR-owner PO **transmit** | `allow-purchase-request-owners-to-transmit-their-own-purchase-orders-292553ec.md` 1320 | `…-636950b7.md` **1755** | `636950b7` |

---

## THE SWEEP-D-ONLY FINDS

Things no other entry direction would produce:

1. **The exclusive role gate on Purchase Order Matching Rules**, stated twice, once per guide
   directory, with different capitalisation of "Administrator/administrator". A field sweep entering
   from `configure-*` topics would get the nav but not the gate.
2. **The double activation gate on the whole PR/PO module** — support-enabled feature, AND
   possibly-withheld admin roles. A Chromium driver that cannot find the menu entry may be looking at
   an un-activated tenant, not a broken selector.
3. **The `Central Receiver` and `Receipt User` roles**, which have no dedicated topic file of their
   own and exist only inside the two Concur Receiving role tables. `Receipt User` is the alternative
   to the `Allow Purchase Request Owners to Edit their own Purchase Orders` Invoice Settings check
   box — a role substituting for a setting. A config writer changing that setting needs to know the
   role route exists.
4. **The negative on Concur Receiving** — a heavily documented feature with no page. Established by
   the left-menu census, which is a roles/menus artefact.
5. **The `Purchase Order Processor (Audit)` role**, named exactly once in the corpus, in the note at
   the foot of both role tables.

---

## GROUNDING NOTE

Every quote emitted in the structured object was verified with
`grep -F -c "<quote>" "<ROOT>/<sourceFile>"` returning ≥ 1 before emission. Quotes were kept to a
single unwrapped line or clause. Byte counts are from `wc -c` / `ls -la`, not estimates.

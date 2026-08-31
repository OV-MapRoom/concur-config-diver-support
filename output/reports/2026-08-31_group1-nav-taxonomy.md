# Invoice Admin Nav Taxonomy — Group 1 "Policy & Scope"

Corpus root: `/mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE/`
Shorthand below: `ADMIN/` = `concur-invoice-professional-edition-admin-guides/`, `TOOLS/` = `concur-invoice-professional-edition-tools-guides/`

## Headline finding: the missing middle node

**All three pages hang off an intermediate menu the URLs don't reveal: `Invoice Processing Admin`.** No page in Group 1 is reached directly from `Administration`. The 2026_08 docs render the same path two interchangeable ways — as a menu-name sequence, or as a breadcrumb with `(left menu)` appended to the leaf. They are the same click sequence; the bridging sentence is explicit:

> `Administrators can access the tool from the Invoice Processing Admin left menu to view, add, modify, or delete group configurations.`
> — `ADMIN/access-the-group-configurations-tool-6f974fe5.md`

**Zero hits** across all 1,859 files for `PolicyAdmin`, `groupConfiguration`, `invoiceSettings`, or `dcredirect`. The corpus never publishes an `.asp` URL. Click path is the only navigable knowledge that exists here.

---

## 1. Policies

| | |
|---|---|
| **navPath** | `Administration > Invoice > Invoice Processing Admin > Policies` |
| **Page name in 2026_08** | `Policies` (page) / `Policies tool` (prose) |
| **Required role** | Invoice Configuration Administrator |

**Primary navPath quote** (menu-name form):
> `From the Invoice Processing Admin menu, select Policies.`
> — `ADMIN/accessing-and-viewing-policies-within-the-policies-tool-f3260f23.md`

**Corroborating navPath quote** (breadcrumb form):
> `1.  Click Administration > Invoice > Policies (left menu).`
> — `ADMIN/assign-to-a-policy-a12befe1.md`

**Role quote:**
> `Assign an imaging configuration to a policy in Administration > Invoice > Policies as the Invoice Configuration Administrator.`
> — `ADMIN/imaging-configuration-8b314b9a.md`

**View-vs-edit split** (structural, not tenant data):
> `Both the Global Administrator and the Group Administrator can view the policies created by the global administrator.`
> — `ADMIN/accessing-and-viewing-policies-within-the-policies-tool-f3260f23.md`

**Alternate names found:** `Policies tool`; guide title `Policies` (`ADMIN/policies-8b34cecf.md`); cross-referenced as `Concur Invoice: Policies Setup Guide`. One misspelling in the wild — `Select Administration > Invoice > Polices (left menu). The Policies page appears.` (`ADMIN/configure-concur-receiving-1ececc23.md`) — a crawler/matcher should tolerate `Polices`.

**Important scoping note:** policy→group *assignment* does NOT happen here. The docs route it to Group Configurations:
> `Although this column appears in the Policy area and displays the groups for which this configuration applies, the actual assignment of the policy to a group occurs in the Group Configurations area of the Invoice Configuration Administrator.`
> — same file.

**Coverage read:** Strong — ~24 topics reference the Policies page/tool, including full CRUD topics (`create-a-new-policy-dd9549c0.md`, `edit-the-existing-policy-information-81206c52.md`, `delete-a-policy-700569c5.md`) with enumerated field tables. Good candidate for field-level extraction in a later pass.

---

## 2. Group Configurations

| | |
|---|---|
| **navPath** | `Administration > Invoice > Invoice Processing Admin > Group Configurations` |
| **Page name in 2026_08** | `Group Configurations` (page, plural) |
| **Required role** | Invoice Configuration Administrator (group-scoped) |

**Primary navPath quote:**
> `1.  Click Administration > Invoice > Group Configurations (left menu). The Group Configurations page appears.`
> — `ADMIN/step-1-enable-by-invoice-group-ebe8724b.md`

**Corroborating (menu-name form):**
> `2.  Under the Invoice Processing Admin menu, select Group Configurations.`
> — `ADMIN/assign-a-policy-to-a-group-f9adaed6.md`

**Role quote:**
> `An Invoice Configuration administrator can view group configuration information for any Group(s) that they have rights to. The administrator's group access rights are defined in User Permissions when assigning the Invoice Configuration administrator role. They will have rights for the group defined and any group below it.`
> — `ADMIN/access-the-group-configurations-tool-6f974fe5.md`
> (note: the em-apostrophe in `administrator's` is U+2019 in the file)

**Sub-navigation — two tabs, corpus-enumerated:**
> `The Invoice tab of the Group Configurations page in Invoice Admin controls group configurations for Invoice. The Vendor Access tab controls the vendor group configuration.`
> — `ADMIN/access-the-group-configurations-tool-6f974fe5.md`

Deep-link to the second tab is documented as one breadcrumb:
> `1.  Click Administration > Invoice > Group Configurations > Vendor Access tab.`
> — `ADMIN/configuration-feature-activation-5fe44fe7.md`

**Alternate names found:** `Group Configurations tool`. **Naming drift worth flagging:** the guide title is **singular** — `Group Configuration` (`ADMIN/group-configuration-8b2ecb41.md`) — while the page is always **plural**. A name-match on the guide title will miss the page and vice versa.

**Coverage read:** Strong — ~36 topics; the Invoice tab is described as the hub for all group-aware features (`The Group Configurations page displays all group-aware features within Concur Invoice.`), with add/modify/delete/view topics all present.

---

## 3. Invoice Settings

| | |
|---|---|
| **navPath** | `Administration > Invoice > Invoice Processing Admin > Invoice Settings` |
| **Page name in 2026_08** | `Invoice Settings` |
| **Required role** | Invoice Configuration Administrator (Professional Edition) |

**Primary navPath quote:**
> `2.  From the Invoice Processing Admin menu, select Invoice Settings.`
> — `ADMIN/accessing-invoice-settings-23df102d.md`

**Corroborating (breadcrumb form):**
> `To access the option, the admin must click Administration > Invoice > Invoice Settings (left menu).`
> — `ADMIN/enable-the-po-change-order-feature-7dd5dcd4.md`

**Third corroboration** (page-name form for the parent):
> `2.  On the Invoice Processing Admin page, click Invoice Settings.`
> — `TOOLS/enabling-the-create-and-approve-vendors-feature-03c9e288.md`

**Role quote:**
> `The Invoice Configuration Administrator role is used to configure vendor default settings and access to change vendor banking information in Invoice Settings.`
> — `ADMIN/invoice-configuration-administrator-or-invoice-admin-aedc6535.md` (under the `Professional Edition` heading; the same file assigns `Invoice Admin` to Standard Edition)

**Coverage read:** Deepest of the three — ~81 topics touch Invoice Settings, and two topics (`ADMIN/available-invoice-settings-8b3411f0.md`, `ADMIN/invoice-settings-cace748d.md`) carry setting-by-setting tables with Setting / Description / Default Status columns. Richest target in Group 1 for a field-level extraction pass.

---

## Naming drift and renames — explicit findings

**1. `Invoice Admin` is a live alias for the `Administration > Invoice` node.** Four topics collapse the path and skip `Invoice Processing Admin` entirely:
> `(Administration > Invoice Admin > Invoice Settings)`
> — `ADMIN/invoice-header-import-record-type-300-format-9505828e.md` (also `...-310-...-21975178.md`, `invoice-line-item-import-record-type-420-format-0880199e.md`)
> `1.  As the Invoice Tax Administrator, click Administration > Invoice Admin > Tax Administration.`
> — `ADMIN/step-3-configure-the-service-14c3ef13.md`

A crawler resolving nav labels must accept both `Invoice` and `Invoice Admin` for the same menu entry.

**2. `Expense & Invoice Settings` is a FALSE FRIEND — do not map it to Invoice Settings.** In Professional Edition it is a *section of the User Details page* under User Administration, not an admin config page:
> `Employee Fields: Used by the Expense and Invoice Settings section of the User Details page.`
> — `ADMIN/fields-overview-5e3daf7c.md`
> `The User Admin may do the same on behalf of the employee using Administration  Company Administration  User Administration (Search & Select)  Expense and Invoice Settings  Approvers.`
> — `ADMIN/assigning-the-approver-for-the-purchase-request-user-20294611.md`

The one topic that treats it as a top-level menu is explicitly the **Standard Edition** surface (`Product Settings` / `View Advanced Settings` tiles), filed inside the Professional deliverable:
> `1.  Navigate to Administration > Invoice Settings or Expense & Invoice Settings.`
> — `ADMIN/standard-edition-d252f36e.md` (title: `Standard Edition`)

Two further Standard-Edition-shaped paths exist and should be excluded from the Professional taxonomy: `Click Administration > Expense & Invoice Settings \> Invoice Settings > Invoice Compliance.` (`ADMIN/accessing-invoice-pay-related-settings-4b605020.md`) and `Click Invoice > Invoice Settings.` (`ADMIN/accessing-invoice-pay-related-settings-bccf120b.md`). Both are Invoice Pay–specific and contradict the three consistent Professional Edition paths above.

**3. No page has been renamed or absorbed.** All three names — `Policies`, `Group Configurations`, `Invoice Settings` — are current and stable in 2026_08. The only rename recorded anywhere in the Policies guide history is a field-level one, not a page one: `Renamed the Authorization Request check box to Request on the guide's title page` (`ADMIN/policies-8b34cecf.md`). A separate historical note across many guides — `Tool now available from within Invoice Admin user interface.` — records the *relocation* of these tools into the Invoice Admin UI, which is what produced the `Invoice Processing Admin` left-menu structure.

**4. Whitespace hazard for verbatim matching.** In the two canonical "accessing" topics the `>` separator is rendered as U+00A0 non-breaking spaces (`Select Administration\u00a0 \u00a0Invoice.`). Any exact-string matcher over this corpus must normalize NBSP, or it will miss the highest-signal nav sentences in the set.

## Sibling leaves observed on the same `Invoice Processing Admin` menu

Not part of Group 1, but corpus-attested left-menu siblings, useful for validating the menu model: Workflows, Forms and Fields, Expense Types, Exceptions, Audit Rules, Change Log, Routing Configuration, Email Reminders, Company Locations, Capture Processing Admin, Tax Administration, Purchase Order Matching Rules, Purchase Order Configuration, Shipping Configuration, Localization, Image Handling, Delegate Configurations, Units Of Measure, Printed Invoices, Peppol Configuration.
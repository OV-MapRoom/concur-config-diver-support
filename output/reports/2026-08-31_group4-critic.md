## 1. MISSING configuration — ranked

**A. `configuration-feature-activation-5fe44fe7.md` (admin-guides) — entirely uncited. Biggest gap in the group.**
It is the only file in the corpus that documents the control binding an email address to its alias:
> "In the Add Email window, type the email address, and then select the alias from the Alias Name list."

`add_email_alias_name` (dropdown, Add Email window) **does not exist in the graph**. The cited file `adding-an-email-address-5073fd51.md` never mentions it — I grepped: "Alias Name" occurs in exactly 3 places corpus-wide, and only 5fe44fe7 line 88 covers the Add Email window. Without it the whole Vendor Segregation chain has no link between address and alias.

Same file also carries, all absent:
- **Group Configurations > Vendor Access > Configuration for Group > `Email Alias` list** — "select the preferred email alias from the Email Alias list." This is *where* an alias is assigned to a vendor group; `enable_vendor_segregation`'s notes describe the effect but never name the page or control.
- **Activation gate:** "Emails added using this procedure must also be registered by a SAP Concur Technical Consultant with Concur's email system."
- **A documented 5-step ordering that contradicts the STEPS output.** The corpus says *"Step 1: Activate the Vendor Segregation feature (see procedure below) to expose the functionality in the user interface"* — activation comes **first**, because it is what exposes Group Configuration > Vendor Access. Step `cp-supplier-email-intake-channel` order 11 puts it near-last and justifies that by inference ("Strictly after orders 1-7"). That rationale is wrong and the corpus refutes it.

**B. `what-fields-are-extracted-during-the-ocr-process-8eddb3cf.md` (tools-guides) — uncited raw-HTML sibling catalog with a field the graph doesn't have.**
It contains a header row absent from `captured_header_fields_catalog`:
> `Vat 2 (Secondary Tax – Canada PST/QST) *`

and renders Vat 1 differently: `Vat 1 (Primary Tax - Canada GST/HST, Australia GST, US Tax, VAT UK/Japan) **`. The graph caught exactly this admin-vs-tools divergence for image file types (`supportedImageFileTypesAdmin`/`Tools`) but missed it here — the identical failure mode, one page over.

**C. `supported-languages-and-currencies-e4fbd9c0.md` — the long-catalog failure, repeating.** A 23-item enumerated list (Chinese, Czech, Danish, Dutch, English, Estonian, Finnish, French, German, Hungarian, Italian, Japanese, Latvian, Lithuanian, Norwegian, Polish, Portuguese, Romanian, Slovenian, Spanish, Swedish, Turkish + "all currencies supported by the Concur Invoice product"). Entirely absent, while `default_language` sits in the graph with `validValues: []`. Caveat honestly: the corpus does not literally bind these to the Default Language dropdown ("The Invoice Capture Processing feature can read, capture, and support invoices written in the following languages"), so it belongs in notes with that caveat — but omitting 23 enumerated values because no sentence welds them to the widget is over-strict.

**D. Units Of Measure is missing its primary control.** `units-of-measure-270126e4.md` is the only page-level file and it says the page lets the admin *"add, edit, and soft-delete a measurable identifier."* The graph has `defaultGoods`, `defaultServices`, `spendType` — the two default checkboxes and the tag — but **no field for the unit record/name itself**, and no soft-delete action. Also uncaptured: "A set of default units is included" and the named default `Each`.

**E. Smaller, real:**
- `delete-images-ad0180be.md` (uncited) — delete/detach gated on image status: allowed at *Timestamp: NotRequested / Ineligible / Invalid*, blocked after successful timestamp or when *Pending*, "displayed in red text." A genuine Image Handling dependency edge, absent.
- `step-1-add-a-scan-configuration-f86f03da.md` — `imageInvoiceContainerIdRequired` has a **second** Yes-consequence the graph dropped: "the invoice image processor must enter a Receipt Container ID value into the Image Invoice Container ID field for each invoice scanned."
- `adobe-reader-0de9695e.md` (uncited) — blank-value behavior for `acrobatReaderDownloadUrl`: "If the field is blank, then no link will appear to the user," plus "version 8.0 or newer."
- `administrator-experience-8b302852.md` names **three** image-handling config pages: Image Handling, Policies, **Workflows**. The graph has zero Workflows edges (see Q4).
- `scan-an-invoice-image-76455aba.md` — Process Images page (Image Received tab, `Invoice Container ID` field, Process button, Last Scan Information section): zero coverage, though `imageInvoiceContainerIdRequired` points at it.

**Not missing, correctly skipped:** `comparison-classic-and-current-...-2fe966db.md` (11-row marketing comparison, no controls); the three `image-handling-*-8b3*.md` files (revision-history chapter containers).

## 2. Did REPAIR work? — Yes. Verified clean, no over-admission.

I checked every repaired field's quoted fragments against the cited files:

| Field | Verdict |
|---|---|
| `capture_processing_admin_tabs` | ✅ All 5 tabs are one contiguous bullet block in 8b2ae77c; prerequisite sentence genuinely follows it |
| `enable_vendor_segregation` | ✅ Correct restraint — file says only *"select Yes from the Enable Vendor Segregation list"*; dropping "No" was right |
| `additional_ocr_language` | ✅ None/Japanese/Chinese exact, NOTE exact incl. the `\>` escape |
| `default_ledger` | ✅ Own heading present, validValues correctly empty |
| `owner_assignment` | ✅ Only "Sender" appears anywhere |
| `timestampStatus` | ✅ **All six exact, including "Timestamp: NotRequested"** — I suspected a label bleed; it isn't, `timestamp-status-f0082cf2.md` really renders the first row that way |
| `imagingTabSelector` / `imagingConfigRowSelect` | ✅ Steps 3 and 4 are genuine "Either: … – or –" pairs in 284f3fdf |
| `manage_email_alias_action` | ✅ Steps 1–3 verbatim minus list markers |
| `searchable` | ✅ Yes/No sentence exact in e7023558 |

**Repair let nothing through that should have been dropped.** Two soft inconsistencies, not errors:
- `uploadImageSessionLimit` and `imageHandlingExceptionsHelperPane` survive as non-controls (a read-only runtime constraint; a pane whose four real fields belong to the Exceptions tool). `invoiceEBunshoTimestampValidationCounts` was dropped for materially the same reason. The standard isn't uniform — but both survivors carry explicit "this is not a settable field" warnings that a runtime crawler needs, so keeping them is defensible.
- `exception_email_address`'s dependency quote ends `"...specified in Exception Email Address."` while the file reads `"...Exception Email Address field."` — still a valid substring (prefix), passes.

## 3. Raw-HTML-table fix: **tested, and it worked 1 of 2.**

Exactly two files in Group 4's scope contain `<table>`:

```
admin-guides/configuring-forms-and-fields-in-capture-processing-7c14446c.md   tables=1  → CAPTURED ✅
tools-guides/what-fields-are-extracted-during-the-ocr-process-8eddb3cf.md     tables=1  → MISSED ❌
```

The parser works — `captured_header_fields_catalog` / `captured_line_item_fields_catalog` are correctly extracted from the raw HTML, and the `fromRawHtmlTable` verification discipline held (I re-ran `grep -c '<table'` on every file the graph flagged; all flags accurate, including the correct `0` on `timestamp-status-f0082cf2.md` and `adding-and-removing-vendor-search-fields-e7023558.md`). **The failure is discovery, not parsing:** the tools-guides twin was never opened. Everything else in Group 4 is markdown pipe tables.

## 4. Wrong drops / mis-assignments

**Broken drop:** `requireHardcopyReceipts` has `"refuter": "no verdict"` — the drop never got a judgment, it just fell out. And it is real: `administrator-experience-8b302852.md` states *"On the Workflow page, admin will see the Require Hardcopy Receipts option"* and that enabling it exposes the **Hold for Invoice Hard Copy** step on the Steps page and Step Rules page. It is a Workflows control, not Image Handling — so excluding it from this page is right, but it should have been re-homed as a Workflows dependency edge, not silently lost. The graph has no Workflows edge at all.

**Drops I confirmed correct:** `cost_center_search_variable`, `division_search_variable`, `vendorSearchVariable`, `vendorManagerViewMenu` — I verified independently that `"Vendor Search Admin"` appears in **exactly two files corpus-wide** (`adding-and-removing-vendor-search-fields-e7023558.md`, `user-experience-217e2941.md`). `adding-vendor-search-variables-for-the-user-8b53d610.md` is genuinely a different chapter. Also correct: `unitOfMeasureCode_import`, the five tab duplicates, both ellipsis-spliced catalog twins.

**Mis-assignment — `fields[]` and `steps[]` disagree with each other.** Three records sit under `page: "Image Handling"` while their own notes place them elsewhere:
- `eBunshoTimestampConfigurationList` — notes literally open *"NOT an Image Handling control"*; it's on Policies. STEPS puts it on Policies (order 16). Field node says Image Handling.
- `policyScanConfiguration` — notes say "this Policies page (Modify Policy) dropdown"; STEPS puts it on Policies (order 15). Field node says Image Handling.
- `uploadImageSessionLimit` — end-user Upload Image window.

A consumer reading `fields[]` gets three wrong page bindings; a consumer reading `steps[]` gets them right. Reconcile before the graph ships.

## 5. Thin coverage — live-UI spot-check priority

1. **Vendor Search Admin** — 2 fields, and that is genuinely near-exhaustive of the corpus (2 files, 35 + ~40 lines). The field picker itself, the add/remove widget, and the available-field catalog exist only in the live UI. **Highest value per minute of spot-checking in the entire group.**
2. **Units Of Measure** — 3 fields, one source file, and the unit name/identifier control is missing entirely (Q1-D). Also confirm the soft-delete affordance and whether Default Goods/Default Services are exclusive.
3. **Capture Processing Admin > Forms and Fields tab** — the tab is enumerated but has **no controls at all** in the graph. The corpus describes copy/rename/add/remove of forms in prose (`working-with-options-on-the-forms-and-fields-tab-50fb84c1.md`, 25 lines, no table) and never names a widget. Every STEPS entry for orders 2–4 acts on controls that do not exist as field nodes.
4. **Add Email window** — the Alias Name list (Q1-A), plus whether `add_email_capture_type` and Alias Name coexist there.
5. **Task Definitions > Modify Task Definition** — `default_language`'s actual option list (23 candidates from Q1-C, unbound in corpus).
6. **Image Handling** — best-covered page; only the Delete Image gating and the Process Images hand-off need eyes.

## 6. Doc drift: **none for Group 4.** 

No `-new-ui-`, `-legacy-ui-`, or `New Experience` variant exists for any of these four pages. The corpus's only such variants are:

```
configure-custom-audit-rules-legacy-ui-6cb4534e.md / -new-ui-3cc2360e.md   (Audit Rules — Group 2)
policies-the-purchase-order-policy-new-experience-5a1ba7ef.md
purchase-order-matching-rules-new-experience-6c8fb80f.md
using-the-invoice-manager-page-new-experience-f83ba5fa.md
using-the-unassigned-invoice-page-new-experience-072e2f18.md
end-user-experience-new-experience-85c2652b.md
```

Only `using-the-invoice-manager-page-new-experience-f83ba5fa.md` even mentions Capture Processing, and only in passing — it is not a sibling of any Group 4 page. **No control-name reconciliation is needed for this group.** The one naming variance that does exist is intra-page and already captured: `Task Definition` (singular, in 8b2ae77c and tools-guides `capture-processing-admin-page-da5e7f83.md`) vs `Task Definitions` (plural, in 735ce2d9 and 2fb515a6), same tab, both stamped 2026_08.
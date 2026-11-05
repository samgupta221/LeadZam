# UI/UX Audit — LeadZam

## Access Limits

- **Marketing site (leadzam.com):** Reviewed as text content only. I did not review the rendered website, so I make no visual, spacing, or mobile experience claims.
- **App (app.leadzam.com):** Requires login. I did not access the application, create an account, or attempt to bypass authentication. I have no first-hand observations of the live app.
- **Screenshots of the live product:** Not included because the live application was not accessed. Findings below clearly distinguish between website evidence and task-based analysis.

## 1. Findings

| # | Finding | Evidence | Priority |
|---|---|---|---|
| 1 | **Field configuration is a dense, multi-rule task.** It involves managing the field name, API key, type, options, requirement rules, and where the field appears. Incorrect requirement settings could affect lead capture, while deleting a field used by integrations could create problems. Recommended direction: use a focused edit drawer, keep system keys read-only, provide explicit requirement choices, and introduce proposed validation and delete confirmation states. | Task analysis based on the supplied Figma design and assignment brief; not observed in the live app. | **High** |
| 2 | **The reviewed marketing-site text prominently presents "Book a Demo" as the primary CTA.** "Log in" appears as a header link. A self-serve trial or signup path was not identified in the text reviewed. Visitors who prefer trying the product independently may not immediately find that option. The complete flow should be visually verified before recommending a change. | leadzam.com — text-only review. | **Medium** |
| 3 | **Audience positioning differs between the marketing website and the assignment brief.** The website's hero messaging targets performance marketers working with Meta and Google campaigns, while the brief describes LeadZam as a CRM for sales and telecalling teams. Calls are presented as the fourth of six feature blocks. Sales-focused visitors may not immediately identify the product's relevance to their workflow. The primary audience should be verified with the team. | Marketing website text compared with the supplied assignment brief. | **Medium** |
| 4 | **Customization ("roles, fields & lead stages") appears in the last of six feature blocks.** These capabilities help businesses adapt the CRM to their workflows, but their placement may reduce their visibility. This may be intentional depending on the product's primary positioning, so it is a lower-priority observation. | leadzam.com — text-only review. | **Low** |

## 2. Selected Problem: Field Configuration (Finding #1)

### Why I selected this problem

Field configuration involves multiple settings that can directly affect lead capture, data consistency, and integrations. Incorrectly configured required fields may block sales teams from progressing through their workflows, while deleting an integration-dependent field could cause data-related issues.

I selected this problem because it offers a meaningful opportunity to simplify an important administrative task through a focused, buildable, and testable redesign.

Findings #2–#4 require further visual review, product context, and user feedback before making design changes.

### Proposed Design Solution

The redesign focuses on making field management easier to understand while preserving the surrounding page context.

The proposed improvements include:

- **Grouped field sections:** Organize fields into categories such as Pinned Identity Fields, Core Lead Details, Location & Geography, and Acquisition & Campaign Details.
- **Search:** Help administrators quickly locate fields using their labels or API keys.
- **Edit Field drawer:** Open the editing interface alongside the field list instead of navigating away from the page.
- **Read-only system key:** Keep the internal field key visible but prevent accidental modification.
- **Clear field requirements:** Present Optional, Required, and Stage-based as three explicit choices.
- **Conditional stage selection:** Show the required starting stage selector when Stage-based is selected.
- **Field visibility controls:** Allow administrators to configure whether the field appears in Lead Form and Quick Add.
- **Action hierarchy:** Separate the destructive Delete action from the primary Save action. The implementation also provides a delete confirmation step.

The goal is to reduce configuration confusion, preserve context, and make important settings easier to understand.

## 3. Scope of the Redesign

### What I redesigned

- Lead Fields Management page.
- Field organization and search.
- Edit Field drawer.
- Field requirement selection.
- Conditional stage selection.
- Field visibility settings.
- Relevant interaction and feedback states.

### What I intentionally did not redesign

- Main sidebar and navigation structure.
- Other CRM settings pages.
- Marketing website.
- Drag-and-drop field reordering.
- Complete field creation workflow.
- Backend integrations and real customer data handling.

Keeping the scope focused allowed me to concentrate on improving one important workflow rather than redesigning the entire product.

## 4. Validation Before Shipping

Before considering this redesign production-ready, I would validate the following with actual users and product data:

1. Do administrators understand the meaning of "Stage-based" without additional guidance?
2. How frequently do administrators edit existing fields compared with creating new ones?
3. Can changing a field type affect existing lead data or integrations?
4. Do users understand the difference between Optional, Required, and Stage-based requirements?

### Metrics to track

- Field configuration save success rate.
- Validation errors by field type.
- Frequency of incomplete or abandoned configurations.
- Delete confirmation cancellation rate.
- Time taken to complete field configuration.

These measurements would help determine whether the redesign actually improves the workflow.

## 5. What I Would Improve With Two More Hours

If I had additional development time, I would prioritize:

1. Implement drag-and-drop field reordering with keyboard accessibility.
2. Add a complete Add Field workflow.
3. Introduce an unsaved-changes confirmation when closing the drawer.
4. Show a data-impact warning before changing the type of an existing field.
5. Add component-level tests for important interactions.
6. Create a before-and-after comparison using screenshots from an accessible live product environment.

## Conclusion

This redesign focuses on simplifying the Lead Fields Management workflow through clearer organization, explicit requirement choices, contextual editing, and safer actions.

Rather than redesigning the entire CRM, the solution addresses one focused administrative task and demonstrates how a considered UI/UX improvement can be translated into a working React and TypeScript frontend prototype.

**Evidence limitation:** The selected problem is based on task analysis and the supplied design brief, not direct observation of the authenticated LeadZam application. Further product review and user validation would be necessary before shipping this as a production change.

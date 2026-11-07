# LeadZam – Lead Fields Management

A focused UI/UX redesign and frontend prototype of the Lead Fields Management experience for LeadZam CRM, built using React, TypeScript, and Vite.

The project focuses on making field configuration more structured, understandable, and user-friendly through improved field organization, a contextual editing drawer, clear requirement settings, validation, and responsive layouts.

## Project Links

| Resource | Link |
|---|---|
| Live Application | [View Live Preview](https://wondrous-croissant-444e65.netlify.app/) |
| GitHub Repository | [LeadZam – GitHub](https://github.com/samgupta221/LeadZam) |
| Figma Design | [View Figma Redesign](https://www.figma.com/design/Cv612QhH9zrrgjXqSpM9vH/LeadZam?node-id=0-1) |

## Project Overview

This project was developed as part of the **LeadZam UI/UX & Frontend Intern Practical Assessment**.

The selected area for improvement is the Lead Fields Management workflow. This workflow involves configuring field names, system-generated keys, field types, dropdown options, requirement rules, starting stages, and field visibility.

Managing these settings involves multiple decisions. The proposed redesign aims to make the experience easier to navigate and understand while preserving the context of the main field management page.

The project includes a Figma redesign and an interactive React + TypeScript frontend prototype.

## Problem Statement

Field configuration is an important administrative task in a CRM system.

Administrators may need to configure multiple properties for each field, including its type, options, requirement rules, and visibility settings.

If these settings are difficult to understand or navigate, users may make configuration mistakes or spend additional time completing the task.

The redesign focuses on:

- Organizing fields into meaningful sections.
- Making field configuration easier to understand.
- Keeping system-generated field keys read-only.
- Simplifying requirement selection.
- Showing relevant settings conditionally.
- Providing clear validation and feedback.
- Making important actions easier to identify.

## UI/UX Audit

The audit identified four prioritized opportunities for improvement.

| No. | Finding | Priority |
|---|---|---|
| 1 | Field configuration involves multiple settings that can be difficult to manage together. | High |
| 2 | A self-serve trial or signup path was not identified in the marketing-site text reviewed. | Medium |
| 3 | There may be a difference between the audience positioning in the marketing content and the audience described in the assignment brief. | Medium |
| 4 | Customization features may have limited visibility within the reviewed marketing content. | Low |

### Selected Problem

**Complexity of the Lead Fields configuration workflow.**

This issue was selected for deeper improvement because field configuration can directly affect lead data collection, consistency, and the way teams manage their CRM fields.

## Explain Your Thinking

### 1. What Is the Biggest UX Problem?

The biggest UX problem selected for this redesign is the complexity of the Lead Fields configuration workflow.

Configuring a field can involve multiple decisions, including its name, field type, dropdown options, requirement rules, starting stage, and visibility settings.

These settings need to be understandable and easy to manage. A more structured editing experience can help administrators complete the task with greater clarity.

### 2. Why Did I Choose This Problem Over the Others?

I selected this problem because field configuration is closely related to lead data collection and data consistency.

Improving this workflow provides an opportunity to solve a focused administrative problem within the assignment scope.

The other findings were also considered, but they would require additional product evidence or a broader redesign to address confidently.

### 3. What Did I Intentionally NOT Redesign?

I intentionally kept the scope limited to Lead Fields Management.

I did not redesign:

- The complete LeadZam CRM.
- Lead dashboards and reporting.
- Lead assignment and follow-up workflows.
- Authentication and account management.
- The marketing website.

This helped me focus on one specific workflow instead of expanding the project into an unrelated full CRM redesign.

### 4. What Trade-offs Did I Make?

- **Contextual drawer:** Chose a side drawer instead of a separate editing page to preserve the main page context.
- **Read-only system keys:** Kept system-generated field keys non-editable to avoid accidental modifications.
- **Local mock data:** Used frontend state instead of backend integration to focus on the core interactions.
- **Focused scope:** Prioritized field configuration over implementing every possible CRM feature.
- **Simplified dataset:** Used 12 mock fields in the Acquisition & Campaign Details section instead of reproducing all 46 fields shown in the design reference.

### 5. How Does the Redesign Improve the User's Task?

The redesign introduces grouped field sections and a contextual Edit Field drawer.

It improves the workflow through:

- Better organization of fields.
- Clear separation of field properties.
- Read-only system-generated keys.
- Distinct Optional, Required, and Stage-based choices.
- Conditional display of the starting stage selector.
- Separate visibility settings for Lead Form and Quick Add.
- Validation and feedback for important actions.
- A confirmation step before deletion.

These improvements aim to make field configuration more predictable and reduce unnecessary navigation.

### 6. What Would I Validate Before Shipping?

Before production release, I would test the redesign with CRM administrators and sales operations users.

I would validate:

- Whether users can find and edit fields without assistance.
- Whether Optional, Required, and Stage-based settings are understandable.
- Whether users can correctly add and configure dropdown options.
- Whether Lead Form and Quick Add visibility settings are clear.
- Whether the redesigned workflow reduces configuration errors.
- Whether users can complete the task more efficiently.

I would also measure:

- Task completion rate.
- Time taken to configure a field.
- Validation and configuration errors.
- User satisfaction and qualitative feedback.

### 7. What Would I Improve With Another Two Hours?

With two additional hours, I would prioritize:

1. Implementing drag-and-drop field reordering.
2. Improving keyboard navigation and accessibility.
3. Adding more edge-case validation.
4. Testing additional responsive breakpoints.
5. Adding component-level interaction tests.
6. Improving unsaved-changes handling.

## Figma Design

**[Open the LeadZam Figma Redesign](https://www.figma.com/design/Cv612QhH9zrrgjXqSpM9vH/LeadZam?node-id=0-1)**

The design includes:

- Lead Fields Management page.
- Grouped field sections.
- Edit Field drawer.
- Field type and dropdown option configuration.
- Field requirement selection.
- Conditional stage selection.
- Field visibility settings.
- Validation state.
- Responsive layout considerations.

## Key Features

### 1. Lead Fields Management

- Organized field sections.
- Pinned Identity Fields.
- Core Lead Details.
- Location & Geography.
- Acquisition & Campaign Details.
- Search fields by label or API key.

### 2. Edit Field Drawer

- Edit field names and descriptions.
- Display read-only system field keys.
- Configure field types.
- Add and remove dropdown options.
- Manage field requirements:
  - Optional
  - Required
  - Stage-based
- Select the required starting stage.
- Configure visibility in Lead Form and Quick Add.

### 3. Interactive Functionality

- Open and close the Edit Field drawer.
- Update field configuration.
- Add and remove dropdown options.
- Toggle field requirement settings.
- Show the stage selector when Stage-based is selected.
- Toggle field visibility.
- Save changes with feedback.
- Cancel changes.
- Display validation feedback.
- Delete fields through a confirmation step.

### 4. Responsive Layout

The interface includes desktop, tablet, and mobile layout considerations to support different screen sizes.

## Screenshots

### Desktop – Default State

![Desktop Default](docs/screenshots/desktop-default.png)

### Desktop – Edit Field Drawer

![Desktop Drawer Open](docs/screenshots/desktop-drawer-open.png)

### Figma Design Reference

![Figma Reference](docs/screenshots/figma-reference.png)

### Mobile View

![Mobile View](docs/screenshots/mobile.png)

### Tablet View

![Tablet View](docs/screenshots/tablet.png)

### Validation State

![Validation State](docs/screenshots/validation-state.png)

## Tech Stack

| Technology | Purpose |
|---|---|
| React | Component-based frontend development |
| TypeScript | Type safety and maintainable code |
| Vite | Development server and build tooling |
| CSS | Styling and responsive layouts |
| HTML5 | Application structure |
| Lucide Icons | Interface icons |

## Project Structure

```text
LeadZam/
│
├── docs/
│   ├── screenshots/
│   │   ├── desktop-default.png
│   │   ├── desktop-drawer-open.png
│   │   ├── figma-reference.png
│   │   ├── mobile.png
│   │   ├── tablet.png
│   │   └── validation-state.png
│   │
│   ├── AUDIT.md
│   └── DEMO_SCRIPT.md
│
├── public/
│
├── src/
│   ├── components/
│   ├── App.tsx
│   └── ...
│
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
├── .gitignore
└── README.md
```

## Getting Started

Follow these instructions to run the project locally.

### Prerequisites

- Node.js
- npm
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/samgupta221/LeadZam.git
```

### 2. Navigate to the Project Directory

```bash
cd LeadZam
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

Open the local URL displayed in the terminal.

### 5. Create a Production Build

```bash
npm run build
```

The generated production files will be available in the `dist/` directory.

## Scope and Limitations

This project is a focused frontend prototype rather than a complete CRM application.

- Uses local mock data.
- Does not include production backend or database integration.
- Does not implement real authentication or authorization.
- The Acquisition & Campaign Details section uses 12 mock fields instead of reproducing all 46 fields shown in the design reference.
- Drag-and-drop field reordering is not implemented.
- The complete Add Field workflow is outside the current scope.
- Changes are managed through frontend state and are not persisted to a production database.

## Future Improvements

Potential improvements for a future iteration include:

- Drag-and-drop field reordering with keyboard accessibility.
- Complete Add Field workflow.
- Backend API integration.
- Persistent field configuration.
- Improved unsaved-changes handling.
- Data-impact warnings before changing existing field types.
- Additional accessibility improvements.
- Component-level and end-to-end testing.
- Usability testing with actual CRM administrators.

## AI Usage Notes

### 1. Which AI Tools Did I Use?

- **Claude:** Assisted with frontend implementation, React and TypeScript component structure, and documentation.
- **ChatGPT:** Assisted with assignment analysis, UX audit refinement, design decisions, and implementation review.

### 2. How Did AI Help?

AI tools supported different stages of the assignment:

- Breaking down the assignment requirements.
- Structuring and prioritizing UX audit findings.
- Exploring possible design approaches.
- Translating the selected design into React and TypeScript components.
- Identifying possible interaction and validation states.
- Drafting and improving project documentation.

### 3. One AI Suggestion I Changed or Improved

During the development process, I narrowed the implementation scope to the Lead Fields Management workflow instead of expanding it into a complete CRM redesign.

I also retained read-only behavior for system-generated field keys and used conditional stage selection when the Stage-based requirement is selected.

These decisions helped keep the solution focused on the selected user problem and avoid unnecessary functionality.

### 4. What Did I Personally Verify?

I personally:

- Reviewed the implementation against my Figma design.
- Ran the application locally using `npm run dev`.
- Executed `npm run build` and confirmed that the production build completed successfully.
- Tested the implemented field editing and requirement-selection interactions.
- Reviewed validation and feedback states.
- Checked the responsive layouts.
- Reviewed the GitHub repository structure and documentation.

I did not verify the authenticated production LeadZam application because access was unavailable. I have documented this limitation rather than treating assumptions as confirmed observations.

AI was used as a development assistant. The final scope, design decisions, review, and submission remain my responsibility.

## Assignment Deliverables

| Deliverable | Location |
|---|---|
| UI/UX Audit | `docs/AUDIT.md` |
| Figma Redesign | [Open Figma](https://www.figma.com/design/Cv612QhH9zrrgjXqSpM9vH/LeadZam?node-id=0-1) |
| React + TypeScript Prototype | This repository |
| Screenshots | `docs/screenshots/` |
| Demo Walkthrough Script | `docs/DEMO_SCRIPT.md` |
| Live Preview | [Netlify Application](https://wondrous-croissant-444e65.netlify.app/) |

---

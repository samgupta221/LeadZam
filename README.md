# LeadZam · Lead Fields Management (UI/UX & Frontend assignment)

Working React + TypeScript prototype of the **Lead Fields page with the Edit Field drawer**, built from the approved Figma screen (`docs/screenshots/figma-reference.png`). All data is local mock state; there is no backend.

## Run it
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build
```
Deep link straight to the open-drawer state: `http://localhost:5173/?edit=lead.lead_source`

## What works
- Open a field by clicking any row; close with ✕, overlay click, Cancel or `Esc`.
- Edit Field Name and Description. **Field Key is read-only** (with copy button).
- Change Field Type. Dropdown / Multi-select show the **Options** editor (add, remove, edit); other types hide it.
- Requirement: Optional / Required / Stage-based. The **“Required starting at”** selector appears only for Stage-based.
- Toggle Lead form and Quick add visibility.
- **Save** writes to state and shows a toast. **Cancel** discards the draft (the drawer edits a copy, so originals are untouched).
- **Delete Field** opens a confirmation dialog (focus lands on the safe “Keep field” button).
- Search by label or API key across all sections; sections with matches auto-expand; **empty state** with “Clear search”.
- **Validation** on Save: name required (≤60 chars), dropdown needs ≥2 options, no blank/duplicate options, stage-based needs a stage. Errors are inline, the first invalid control is focused.
- Section headers collapse/expand (Location and Acquisition start collapsed).
- Responsive: sidebar becomes a slide-in menu ≤900px; drawer goes full-width and the requirement cards stack ≤600px.
- Accessibility: dialog roles + `aria-modal`, labelled inputs, `aria-invalid`, visible focus rings, keyboard-operable radios/checkboxes, `prefers-reduced-motion` respected.

## Stack
React 19, TypeScript, Vite, plain CSS (one `styles.css` with CSS variables), `lucide-react` icons. No other runtime dependencies.

```
src/
  App.tsx                 page state: fields, search, drawer, toast
  data.ts / types.ts      mock fields, sections, stages, type labels
  components/
    Sidebar.tsx  FieldSection.tsx  EditDrawer.tsx  Feedback.tsx (Toast + ConfirmDelete)
```

## Design decisions & trade-offs
- **Kept the approved design as is.** The only additions are things the design implies but doesn't draw: validation messages, delete confirmation, toast, search empty state, mobile layout.
- **Drawer edits a draft copy**, which makes Cancel trivial and prevents half-edited data leaking into the table.
- **Native `<select>` for Field Type and Stage.** Less pixel-perfect than a custom menu but fully accessible and reliable on mobile. Trade-off accepted.
- **Validate on Save, not on every keystroke**, so users aren’t shouted at mid-typing; once submitted, errors update live.
- Full UX reasoning and audit: [`docs/AUDIT.md`](docs/AUDIT.md). Walkthrough script: [`docs/DEMO_SCRIPT.md`](docs/DEMO_SCRIPT.md).

## Known limitations (be upfront in the interview)
- **Drag-to-reorder** in Core Lead Details: the handle is visual only (not implemented).
- **Acquisition section shows 12 mock fields**, not the 46 in the design (counts are computed from data).
- Changing a type on a field with existing values doesn’t warn about data impact (would be needed in production).
- No automated test suite; interactions were checked with a scripted headless-browser run (see AI notes).
- Inter / JetBrains Mono load from Google Fonts; offline they fall back to system fonts.
- Sidebar links other than Lead Fields are inert on purpose.
- The Figma file itself and the demo video are **yours to produce**; they are not part of this repo.

## AI usage notes
**Tools:** Claude (this prototype's scaffolding, components, CSS, test script and doc drafts).
**How AI helped:** reading the screenshot/PDF, proposing the component split, writing the React/CSS, writing a Playwright script that exercised the interactions and took screenshots, drafting these docs.
**A suggestion I changed during the build:** the first CSS pass rendered the options grid clipped on the right, the Field Key input with a double border, and checkbox cards with the box dropped under the label. These were found by comparing screenshots against the Figma image and fixed (`minmax(0,1fr)`, more specific selectors).
**What was verified (automated, headless Chromium):** name-required error, blank-option error, stage selector show/hide, save + toast, search filter, search empty state, cancel restores values, delete removes the row, `tsc` + production build pass.
**What you should personally verify before submitting:** pixel comparison against your Figma at your own breakpoints, real-device mobile, keyboard-only and screen-reader pass, and that you can explain every file. Replace the paragraph above with your own account if your process differed.

## Suggested commit sequence (not yet committed)
1. `chore: scaffold Vite + React + TS`
2. `feat: types, mock data and global styles`
3. `feat: sidebar and page shell`
4. `feat: collapsible field sections and tables`
5. `feat: search with empty state`
6. `feat: edit drawer (name, key, description, type)`
7. `feat: dropdown options editor`
8. `feat: requirement cards, stage selector, visibility toggles`
9. `feat: validation, save toast, cancel, delete confirmation`
10. `style: tablet/mobile responsive layout`
11. `docs: README, audit, demo script, screenshots`

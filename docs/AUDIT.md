# UI/UX audit — LeadZam

## Access limits (read first)
- **Marketing site (leadzam.com):** reviewed as text content only. I did **not** view it rendered, so I make no visual, spacing or mobile claims about it.
- **App (app.leadzam.com):** requires login. Not accessed, no account created, no authentication bypassed. **I have no first-hand observations of the live app.**
- Screenshots of the live product are therefore **not included**; add your own from a test workspace. Findings below are marked by evidence level.

## Findings
| # | Finding | Evidence | Priority |
|---|---------|----------|----------|
| 1 | **Field configuration is a dense, multi-rule task** (name, key, type, options, requirement by stage, where it appears). Without clear structure, admins can break lead capture by mis-setting “required”, or delete a field used by integrations. Direction: one focused drawer, read-only key, explicit requirement choices, validation, delete confirmation. | Task analysis from the supplied Figma + assignment brief (not observed in the live app) | **High** |
| 2 | **Site’s only primary CTA is “Book a Demo”;** “Log in” is a header link. The assignment mentions Start Free Trial / Sign up, which I did not see in the page text. A visitor wanting to try the product may not find a self-serve path. Verify visually first. | leadzam.com text | Medium |
| 3 | **Audience positioning differs by place.** Hero targets performance marketers (Meta/Google campaigns); the brief describes sales and telecalling teams. Calls are fourth of six features. Sales-led visitors may not self-identify. Verify with the team which segment is primary. | leadzam.com text vs brief | Medium |
| 4 | **Customization (“roles, fields & lead stages”) is the last of six feature blocks**, though it is what makes the CRM fit a business. Low urgency: placement may be intentional. | leadzam.com text | Low |

## Selected problem: #1
**Why this one:** it is the only finding tied to a task where mistakes have real cost (data capture, integrations, required-field blocking sales stages), and it maps directly to a buildable, testable interaction. #2–#4 need rendered review and user data before acting.

**What the redesign does:** keeps the page scannable (grouped sections, API keys visible, search), and moves the complex edit into a drawer that preserves list context. Requirement is three explicit cards instead of a checkbox; the stage selector appears only when relevant. Dangerous actions are separated (Delete on the left, confirm step).

**Not redesigned:** sidebar/navigation, other settings pages, marketing site, drag reorder, field creation flow.

**Validate before shipping:** do admins understand “Stage-based” without help? How often do they edit vs. create fields? Does changing type on populated fields cause support tickets? Track: save success rate, validation errors by type, delete-then-cancel rate.

**With two more hours:** drag reorder with keyboard support, “Add field” flow, unsaved-changes prompt, data-impact warning on type change, component tests, a before/after comparison against the live screen.

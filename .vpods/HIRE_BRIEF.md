# Hire brief
Project: Lula Coffee
Hire agent: rae
Jira: LC-3
Task id: task_eb2fd530
Title: Frontend: Build the Lula Coffee experience against the API contract
Shape: page
## Description
Ship the UI / page / component work only — not the API, schema, or server.
Do not implement backend controllers, OpenAPI, or database migrations on this card.
Parent brief:
Build the Lula Coffee experience against the API contract
Delivery order: 3.

Requires: delivery-order 2

Read spec/api.openapi.yaml and spec/auth.yaml. Implement the primary screens and generated client.

Design Brief:
- Audience: people using Lula Coffee
- Goal: complete the main job from the brief
- Primary action: the conversion or next step on the home screen
- Design mode: Premium SaaS
- Required sections: navigation, photographic hero with headline and CTA, product grid or primary content, footer
- Imagery: real photography for the category (Brand Kit only)
- Avoid: generic card grid, placeholder copy, inventing API fields

Visual structure: navigation; photographic hero with headline and CTA; product grid; footer.
Given a visitor opens Lula Coffee, When they follow the primary CTA, Then they reach the main conversion without invented API fields.

Auth: authenticated users; requires JWT bearer token; scopes: customer role. Admin surface: admin only.

## Scope
In scope: the primary landing / hero and the named user flow on this card.
Out of scope: other pages, payment processors, admin consoles, and work this ticket does not name.

Labels: vpods-generated
## Acceptance criteria
- FE surfaces in the parent brief ship and render.
- Build/run notes for the frontend only (or leave to the docs ticket).
## Rules
- Read `.vpods/FRONTEND_AGENT.md` (frontend), `.vpods/MAYA_AGENT.md` (iOS), `.vpods/PROJECT.md`, `.vpods/CRAFT_*.md` (packed craft grammar including `CRAFT_UX.md` / `CRAFT_MOTION.md` / `CRAFT_IOS.md` when present), `.vpods/DESIGN_PACK.md` when present, and Brand Kit when present before writing code.
- Stay on this ticket's lane. Do not rewrite sibling hire pages/APIs unless required for integration.
- Ship a complete artifact for this shape — not a stub.
- If the brief is genuinely ambiguous, ask exactly one intake question before writing code (waiting-on-answer). After generation starts, do not stop mid-execution to ask.
- Frontend: replicate attached mockups under `public/design-refs/` (composition, photography, bands). Labels on the mockup are direction, not a copy deck.

# Hire brief
Project: Lula Coffee
Hire agent: knox
Jira: LC-1
Task id: task_9a5a7592
Title: Backend: Define the Lula Coffee API contract
Shape: api-route
## Description
Ship the backend API and data layer only — not the React / UI pages.
Include connection/config stubs and a minimal health or hello endpoint when greenfield.
Do not rewrite frontend pages.
Parent brief:
Define the Lula Coffee API contract
Delivery order: 1.

Requires: none

Own spec/api.openapi.yaml and spec/auth.yaml. Define request/response payloads and persistence. Auth: authenticated users; requires JWT bearer token; scopes: customer role. Admin surface: admin only. Schema: fields id, createdAt, updatedAt plus domain attributes from the brief; reuse the existing table/entity when one already covers this domain. Contract: OpenAPI request/response payload shapes. Given the contract is published, When a client calls a protected route without a token, Then access is denied.

Brief:
Product category: ecommerce Primary user goal: Lula Coffee ecommerce store . Sells coffee, organic coffee, mugs, tea. It uses a modern motion UI and aws backend with api.

Visual structure: navigation; photographic hero with headline and CTA for Lula Coffee; product grid or primary content section; footer. Imagery: real photography for the category (Brand Kit only — no invented brand). In scope: first viewport / hero + primary CTA only. Out of scope: other pages and payment processors.

## Scope
In scope: the primary landing / hero and the named user flow on this card.
Out of scope: other pages, payment processors, admin consoles, and work this ticket does not name.

Labels: vpods-generated
## Acceptance criteria
- API / data work in the parent brief is implemented.
- PostgreSQL (or named DB) config documented when required.
- At least one runnable API endpoint when the brief calls for it.
## Rules
- Read `.vpods/FRONTEND_AGENT.md` (frontend), `.vpods/MAYA_AGENT.md` (iOS), `.vpods/PROJECT.md`, `.vpods/CRAFT_*.md` (packed craft grammar including `CRAFT_UX.md` / `CRAFT_MOTION.md` / `CRAFT_IOS.md` when present), `.vpods/DESIGN_PACK.md` when present, and Brand Kit when present before writing code.
- Stay on this ticket's lane. Do not rewrite sibling hire pages/APIs unless required for integration.
- Ship a complete artifact for this shape — not a stub.
- If the brief is genuinely ambiguous, ask exactly one intake question before writing code (waiting-on-answer). After generation starts, do not stop mid-execution to ask.

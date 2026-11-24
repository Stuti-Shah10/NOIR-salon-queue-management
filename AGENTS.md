# AGENTS.md — NOIR Salon Queue Management System

NOIR is a salon queue management application where customers can join the queue using their phones, track their waiting status, and receive turn notifications. Receptionists and barbers manage the queue, while a TV display shows live queue information.

## Read First

- `docs/01-brief.md` → Project goals, features, and what NOT to build.
- `docs/02-screens.md` → All seven screens, layouts, and behaviour.
- `docs/03-flows-rules.md` → Customer flows, queue rules, and test checklist.

## Current Technology Stack

- **Frontend:** React + Vite + Tailwind CSS.
- **Development Server:** Run using `npm run dev`.
- **Current Data:** The existing frontend uses its current data handling and storage implementation. Inspect the code before changing it.
- **Current Status:** The frontend is built, but PostgreSQL and the production backend have not yet been integrated.

## Planned Backend Architecture

The following architecture is planned for a future implementation:

- **Backend:** Node.js + Express.
- **Database:** PostgreSQL.
- **Database Connection:** `pg` (node-postgres).
- **Real-Time Synchronization:** Socket.IO.
- **Hosting:** Vercel for the frontend; Render or Railway for the backend and database.

Implementation rules for the planned backend:

- Frontend must communicate with the backend through APIs.
- Never connect directly to PostgreSQL from frontend code.
- Store database credentials and secrets in backend environment variables.
- Never commit `.env` files or expose secrets in frontend code.
- Implement authentication and role-based authorization on the backend.

Do not claim that planned backend features are implemented until they have actually been developed and tested.

## Hosting and Submission

- Deploy the existing frontend so that it can be accessed through a public link.
- The live application link must be the first line after the project title in `README.md`.
- The deployed application must work on mobile devices without requiring local development setup.
- Keep the GitHub repository updated with the final project files.

## How to Work

- Work on one screen or one feature at a time.
- Do not modify unrelated screens or files.
- All interface labels must use the English/Gujarati language files.
- Avoid hardcoding interface text directly into components.
- Keep queue rules centralized in the code and reuse them wherever needed.
- Never add features from the `Don't build` list in `docs/01-brief.md`.
- Preserve existing working functionality when making changes.
- After each task, list the changed files and explain how to test the changes.

## Theme and Design System

Use the official NOIR colour palette throughout the application:

- **Outer Background:** `#EDECEA` (Warm Off-White).
- **Cards and Inner Boxes:** `#7E9A82` (Sage Green).
- **Text:** `#432f2e` (Dark Brown).

Design guidelines:

- Use rounded cards, clean spacing, good contrast, and readable typography.
- Do not introduce unnecessary additional colours.
- The "It's your turn!" notification screen must also follow the NOIR colour palette.
- Do not use the outdated gold or charcoal colour scheme.

### Centralized CSS Variables

Use centralized design tokens so the theme can be maintained in one place:

```css
:root {
  --color-background: #EDECEA;
  --color-secondary: #7E9A82;
  --color-text: #432f2e;
}
```

All components should use these variables or mapped theme tokens instead of repeatedly hardcoding colour values.

## Security and Access Control

The following access restrictions are required for the completed application:

- Home, Join Queue, and public Waiting Area TV screens are publicly accessible.
- Customers access their queue status using a valid queue token.
- Reception Dashboard requires receptionist authentication.
- Barber View requires individual barber authentication.
- Owner Settings/Admin is restricted to the salon owner.

Security implementation requirements:

- Verify authentication and user roles on the backend for every protected API request.
- Do not rely only on hiding frontend routes, navigation items, or buttons.
- Never store passwords or PINs in plain text.
- Do not expose authentication secrets or database credentials in frontend code.

Do not claim staff authentication or backend security is complete until it has been implemented and tested.
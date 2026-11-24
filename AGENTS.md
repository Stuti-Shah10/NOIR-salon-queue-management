# AGENTS.md — NOIR Salon Queue Management
Queue app for NOIR salon: customers join from their phone, see wait
time, get called; reception and barbers manage the queue; TV display.

## Read first
- docs/01-brief.md -> features + what NOT to build
- docs/02-screens.md -> every screen's layout and behaviour
- docs/03-flows-rules.md -> flows, queue rules, test checklist

## Stack
React + Vite + Tailwind CSS. Run with `npm run dev`.
Choose the simplest storage that keeps phone, tablet and TV in sync
(explain your choice before using it).
Hosting: Vercel (frontend); Render or Railway if a backend is needed.
Live link must be the first line after the title in README.md.

## How to work
- One screen or one feature per task. Don't touch other screens.
- All labels via the EN/GU language file; no hard-coded text.
- Queue rules live in ONE place in the code; reuse them everywhere.
- Never add features from the 'Don't build' list.
- After each task: list changed files and how to test the change.

## Theme & Design System
- **Color Scheme:**
  - **Outside the boxes:** `#EDECEA` (Warm Off-White) as the main page background and spaces surrounding cards and containers.
  - **Inside the boxes:** `#7E9A82` (Sage Green) as the background color inside the boxes, cards, content containers, sections and UI boxes.
  - **All font/text colors:** `#432f2e` (Dark Brown) for all headings, body text, labels, navigation items, buttons, and typography.
- Rounded cards, clean spacing, good contrast, and readability. Do not introduce unnecessary additional colors.
- **Centralized CSS Variables:**
  Implement and reference centralized design tokens using CSS variables:
  ```css
  :root {
    --color-background: #EDECEA;
    --color-secondary: #7E9A82;
    --color-text: #432f2e;
  }
  ```
  All components must use these variables or mapped theme tokens rather than hardcoded hex color values, so the entire application's theme can be changed in one place.
- **Special Screen Instruction:**
  The "It's your turn!" screen should have a special full-screen gold emphasis with dark brown text, large typography, and a gentle pulse animation. The rest of the application must follow the normal three-color theme.

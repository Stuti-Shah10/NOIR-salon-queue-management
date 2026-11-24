# NOIR Salon Queue Management System — Screens Specification

## Theme & Visual System
- **Color Palette:**
  - Outer backgrounds: `#EDECEA` (warm off-white)
  - Cards and inner boxes: `#7E9A82` (sage green)
  - Typography and text: `#432f2e` (dark brown throughout all headings, labels, body, and buttons)
- **Responsive Layouts:** Mobile-first for customer & barber screens, 10-inch landscape orientation for Reception Dashboard, high-visibility large TV layout for `/display`.
- **Localization:** Complete bilingual support in English and Gujarati (`en` / `gu`).

---

## Screen 1: Home (`/`) — Mobile-First
- Salon branding (NOIR) + scissor badge, 'Open · Closes 9 PM' status pill.
- Live queue summary card: 'X people waiting · about Y min estimated wait'.
- **Functional Requirement:** Waiting count and barber availability update automatically in real time as clients join, get called, or finish.
- Barber status chips showing live availability: Ravi (busy) · Amit (free) · Imran (on break).
- Primary call to action button `[ Join Queue ]` leading to `/join`.

---

## Screen 2: Join Queue (`/join`) — Mobile-First
- Customer inputs: Full Name, Phone Number.
- **Functional Requirement:** Validate phone number (10 digits) and strictly prevent duplicate active queue entries for the same phone number (redirects returning users to their active token).
- Multi-select service cards (max 3): Haircut (30 min, ₹150), Beard trim (15 min, ₹80), Hair spa (45 min, ₹400), Head Massage (20 min, ₹180), Shave & Detan (25 min, ₹220).
- Barber selector: 'Any barber (fastest)' or individual barber photo cards (Ravi, Amit, Imran).
- Dynamic live summary: updates immediately upon selecting/deselecting services (shows total services, estimated price, and calculated wait time).
- `[ Confirm & Join Queue ]` button -> generates unique token (e.g., `S-20`) and navigates to My Status.

---

## Screen 3: My Status (`/status/:id`) — Mobile-First
- Large prominent token display (e.g., `S-14`) and current position in line.
- **Functional Requirement:** Queue position and estimated wait time countdown update automatically according to actual queue events and completed turns ahead.
- Proximity notification banner when 2nd in line: 'Start coming to the salon!'
- Assigned/preferred barber information and disinfected chair confirmation.
- Full-screen "It's your turn!" notification when called: large readable typography, gentle pulse animation, audio chime, and mobile device vibration where supported.
- `[ I'm Walking to the Chair ]` action button to confirm transition to the chair.
- `[ Cancel My Spot in Queue ]` button with confirmation modal pop-up.

---

## Screen 4: Reception Dashboard (`/reception`) — Tablet 10" Landscape
- Optimized for a 10-inch tablet in landscape orientation.
- **Left Column (Barber Stations):**
  - Live station cards for Ravi (Chair 1), Amit (Chair 2), and Imran (Chair 3).
  - Displays currently seated client, services, and `[ Call Next ]` / `[ Finish & Free Chair ]` actions.
  - Station status toggles between Available and On Break.
  - **Functional Requirement:** Calling the next customer strictly respects FIFO queue order and barber preference rules (clients requesting a specific barber are never assigned to another station; 'Any' clients are assigned to the earliest free station).
- **Right Column (Queue List & Actions):**
  - Real-time queue table displaying token, customer name, phone, services, preferred barber, wait time, and live status.
  - Working actions per row: `[ Call Next ]`, `[ No-Show ]`, `[ Cancel ]`, and `[ Re-add to End ]` for late arrivals.
  - Waiting time > 60 minutes visually highlighted in amber.
  - Search filter (by token, name, or phone) and Active Queue / All Records tabs.
- **Top Actions:** `[ + Add Walk-in ]` modal allowing staff to quickly register in-person clients directly into the queue.

---

## Screen 5: Barber View (`/barber/:name`) — Mobile-First
- Dedicated mobile view for individual barbers at their cutting station.
- Station switcher tabs to switch between Ravi, Amit, and Imran.
- Current customer card: client name, services to perform, and live timer elapsed since service start.
- Prominent action workflow buttons: `[ Start Service ]` -> `[ Done (Finish) ]`.
- **Functional Requirement:** Marking a customer Done updates their status to `done`, frees the station chair, recalculates the queue countdown, and automatically increments the daily served counter.
- Next client preview: 'Next for you: [Token] [Customer Name] ([Services])'.
- Barber status toggle: Available / On Break.

---

## Screen 6: Waiting Area TV (`/display`) — Large TV Display
- Designed specifically for large wall-mounted TV screens, readable from ~5 metres away.
- **Functional Requirement:** Display updates automatically in real time whenever queue information, station assignments, or call events occur across the salon.
- Live clock with second-precision ticker and auto-updating indicator.
- **Active Stations Section:** Row per barber with profile photo, name, chair number, and large 'Serving Now: [Token]' badge.
- **Up Next Queue Section:** Shows the next 5 tokens in line with customer names, services, and live estimated wait countdowns.
- **Newly Called Token Alert:** Prominent high-contrast alert banner with harmonic audio chime when a customer is called to their chair.

---

## Screen 7: Owner Settings (`/admin`) — Desktop / Tablet
- **Key Metrics Overview:**
  - Real-time analytics cards: Clients Served Today, Average Wait Time, and Total No-shows.
  - **Functional Requirement:** Statistics are calculated dynamically from actual stored queue records (counting unique client records completed on today's calendar date) rather than hardcoded or stale values.
- **Online Queue Access Switch:** Toggle queue Open / Closed for online joining (allows walk-ins to continue while halting remote sign-ups before closing).
- **Barbers on Duty Management:** Quick toggles for staff shifts and breaks.
- **Services Catalog & Pricing:** Full list of salon services with duration, pricing in ₹, English/Gujarati names, and active toggles.

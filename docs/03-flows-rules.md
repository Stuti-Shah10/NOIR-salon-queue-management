# NOIR Salon Queue Management System — Flows & Rules

## Flow: Remote Customer
1. **Join Queue:** Customer opens Home -> clicks Join Queue -> inputs Name and 10-digit Phone -> selects up to 3 services -> chooses a specific barber or 'Any barber (fastest)'.
2. **Token Confirmation:** Receives a unique token (e.g. `S-14`), initial position in line, and estimated wait time -> redirected to My Status.
3. **Proximity Alert:** Monitors My Status from home or nearby; upon reaching 2nd in line, receives the 'Start coming to the salon!' alert.
4. **Called to Station:** Receptionist or assigned barber taps 'Call next' -> status transitions to `Called`. Customer's phone displays the full-screen "It's your turn! Go to [Barber]" notification; the Waiting Area TV flashes the token banner with an audio chime.
5. **Seated in Chair:** Customer taps "I'm Walking to the Chair" (or barber taps 'Start Service') -> status transitions to `In Chair`.
6. **Service Completion:** Barber taps 'Done' -> status transitions to `Done`, station chair is freed, customer leaves active queue, and daily served statistics increment.

## Flow: Walk-in Customer
1. **Reception Intake:** Receptionist taps `+ Add walk-in` on the Reception Dashboard.
2. **Details Entry:** Enters client name, optional phone, selected services, and barber preference.
3. **Queue Placement:** Walk-in joins at the END of the active queue adhering strictly to first-come, first-served order.

---

## Queue Rules & Logic

### 1. Queue Status Transitions
- **Valid Forward Lifecycle:** `Waiting` → `Called` → `In Chair` → `Done`.
  - Status progression must be strictly forward; transitions never move backwards.
- **Cancellation:** `Waiting` → `Cancelled`.
- **No-Show:** `Called` → `No-show`.
- **Integrity Guards:**
  - Invalid status transitions are prohibited.
  - Completed (`Done`) customers cannot re-enter or reactivate their previous queue entry.
  - A `No-show` customer who later returns must receive a brand new queue entry at the END of the queue.

### 2. Queue Order & Barber Assignment
- **First-Come, First-Served (FIFO):** Queue order is strictly maintained among eligible customers according to join time.
- **Specific Barber Preference:** A customer who selects a specific barber (e.g. Ravi) must only be assigned to that barber. They are never given to another barber, regardless of station availability.
- **Any Barber Selection:** A customer selecting 'Any' can be assigned to the earliest available eligible barber station.
- **Calling Next Customer:** When 'Call next' is triggered for barber X:
  - The system selects the earliest eligible waiting customer who chose X or 'Any'.
  - It skips customers who specifically chose another barber (e.g. Amit calling next skips customers waiting specifically for Ravi).
- **Single Client per Station:** A barber can serve only one customer in their chair at a time.
- **Barbers on Break:** Barbers marked 'On Break' must not receive new customers or be assigned via 'Call next'. Customers with preferences for a barber on break see a status notification.

### 3. Waiting Time Calculation
- **Workload-Based Estimation:** Waiting time is calculated based on the selected barber's current station workload, ongoing service duration, and total service minutes of eligible waiting customers ahead.
- **'Any Barber' Calculation:** For customers choosing 'Any', the wait time is estimated using the earliest available eligible barber station workload.
- **Dynamic Recalculation:** Estimates recalculate automatically whenever queue positions change, turns start/complete, or barber availability changes.
- **Approximate Estimates:** Displayed clearly as approximate countdown estimates (e.g. `~35 min`) that dynamically decrease as turns finish.

### 4. No-Show Handling
- **Call Timestamp:** The exact timestamp a customer is called (`calledTime`) is recorded.
- **10-Minute Grace Window:** If a called customer does not arrive at the station within 10 minutes, the receptionist may mark them as `No-show`.
- **Re-add Rule:** If a No-show customer arrives later, clicking 'Re-add to End' creates a new entry at the END of the queue with a new token; they do not regain their previous spot.

### 5. Online Joining
- **Closing Cutoff:** Online queue joining closes automatically 30 minutes before salon closing (or manually via Owner Settings).
- **Walk-in Availability:** In-person walk-ins at the reception desk remain available even when online queue joining is closed.
- **Duplicate Prevention:** Only one active queue spot is permitted per phone number. Submitting an active phone number returns the existing spot without creating duplicates.

### 6. Real-Time Synchronization
- All queue updates, customer status transitions, barber availability toggles, and wait time calculations must synchronize instantaneously across customer phones, reception dashboard, barber screens, and the waiting-area TV without requiring manual page refreshes.

---

## Test Checklist

- [ ] **Service & Price Total:** Join with multiple services -> displays correct sum of service durations and total price.
- [ ] **Duplicate Phone Guard:** Submitting the same phone number twice returns the existing active token without creating a duplicate entry.
- [ ] **Barber Preference Respect:** Calling next for Amit skips an earlier customer who specifically chose Ravi.
- [ ] **'Any' Customer Assignment:** Calling next correctly assigns an 'Any' customer to the earliest free eligible barber.
- [ ] **Barber on Break Rule:** A barber on break receives no new customers, and their 'Call next' button is disabled.
- [ ] **Proximity Alert:** Customer moving to 2nd in line receives the 'Start coming to the salon' notification.
- [ ] **Real-Time Call Alert:** Calling a customer triggers "It's your turn!" on their phone and flashes their token on the TV display within 5 seconds.
- [ ] **Status Lifecycle Flow:** Starting service moves customer to `In Chair`; finishing moves them to `Done`, frees the chair, and updates Reception and TV screens.
- [ ] **No-Show and Re-Add Behaviour:** Marking No-show frees the station chair; clicking 'Re-add to End' creates a new token at the end of the queue.
- [ ] **Waiting-Time Recalculation:** Estimated wait time decreases dynamically as customers finish their turns.
- [ ] **Online Queue Switch:** Closing online joining disables the Join button with a notice while walk-in creation remains functional.
- [ ] **Cross-Device Sync:** Customer phone, tablet dashboard, barber view, and TV display stay synchronized in real time across separate windows/tabs.
- [ ] **Bilingual Toggle:** Toggling language switches all interface labels, alerts, and badges between English and Gujarati.

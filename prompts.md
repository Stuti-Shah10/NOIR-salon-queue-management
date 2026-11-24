# NOIR Salon Queue Management System – Prompt History

**Project:** NOIR Salon Queue Management System  
**Repository:** https://github.com/Stuti-Shah10/NOIR-salon-queue-management  
**Live Application:** https://noir-salon-queue-management.vercel.app

**Note:** This document reconstructs the prompts and development instructions from the available project conversation history. Some wording is paraphrased rather than copied verbatim. The prompts are arranged in development order. Failed attempts and debugging instructions are included where they are part of the available history.

---

## 1. Initial Project Creation

### Prompt 1 – Build the NOIR Salon Queue Management System

Create a complete, responsive Salon Queue Management System for a unisex salon.

The application should help customers join the queue using their phones, check their waiting position, and receive information about their turn. Reception staff should be able to manage the queue, barbers should be able to manage their assigned customers, and a TV display should show the current queue.

The application should have seven main screens:

1. Home page
2. Join Queue page
3. Customer Live Status page
4. Reception Dashboard
5. Barber View
6. Waiting Area TV Display
7. Owner/Admin Settings

Use a modern, minimal, clean design. Make the customer-facing screens mobile-first and ensure the other screens are suitable for their respective display sizes.

## 2. Project Requirements and Screen Specifications

### Prompt 2 – Define the project brief

Prepare the project brief for NOIR Salon Queue Management System.

Define the following:
- Project goal and problem being solved.
- Target users: customers, reception staff, barbers, and salon owner.
- Main features and system requirements.
- Scope and features that should not be included.

The essential features should include:
- Joining the queue through a phone.
- Viewing queue position and estimated waiting time.
- Reception dashboard for managing customers.
- Barber interface for handling assigned customers.
- Waiting area TV display.
- Owner settings and basic statistics.

Do not include payments, future appointments, SMS/WhatsApp messaging, loyalty programmes, or multiple salon branches in the initial scope.

Support English and Gujarati in the intended application requirements.

### Prompt 3 – Specify all seven screens

Create detailed requirements for the following routes and screens:

**1. Home (`/`)**
- Display salon name and logo.
- Show salon opening status and closing time.
- Show the number of people waiting and estimated waiting time.
- Display barber availability using status chips.
- Provide a prominent Join Queue button.

**2. Join Queue (`/join`)**
- Customer name.
- Phone number with 10-digit validation.
- Service selection.
- Allow selection of a maximum of three services.
- Barber selection.
- Queue joining confirmation.

Include the following service information:

| Service | Duration | Price |
|---|---:|---:|
| Haircut | 30 min | ₹150 |
| Beard Trim | 15 min | ₹80 |
| Hair Spa | 45 min | ₹400 |
| Head Massage | 20 min | ₹180 |
| Shave & Detan | 25 min | ₹220 |

**3. My Status (`/status/:id`)**
- Display customer token.
- Show current queue position.
- Show estimated waiting time.
- Show queue status.
- Display relevant turn notifications.

**4. Reception Dashboard (`/reception`)**
- Display waiting customers.
- Provide queue management actions.
- Allow reception staff to call the next customer.
- Support no-show handling and re-adding customers.
- Provide relevant queue filters and customer information.

**5. Barber View (`/barber/:name`)**
- Display the barber's assigned customers.
- Show customer and service details.
- Provide Start and Done actions.
- Display barber availability and work status.

**6. Waiting Area TV (`/display`)**
- Show the current queue.
- Display called customer information.
- Use large, readable text suitable for a television screen.

**7. Owner Settings (`/admin`)**
- Display salon statistics, including Clients Served Today.
- Provide service and barber management settings.
- Display relevant operational information.

## 3. Queue Workflow and Business Rules

### Prompt 4 – Define queue flows and rules

Document the customer and staff workflows.

Define the queue lifecycle:

`Waiting → Called → In Chair → Done`

Include:
- Customer joining the queue online.
- Walk-in customer handling.
- FIFO queue handling.
- Barber assignment.
- Customer cancellation.
- No-show handling and re-adding customers.
- Estimated waiting-time calculation.
- Duplicate customer prevention.
- Grace period and queue management rules.

Describe the intended real-time synchronization between customer, reception, barber, and TV screens as a system requirement.

## 4. Salon Branding and UI Design

### Prompt 5 – Rename the salon and update the colour palette

Update the salon name throughout the entire application to **NOIR**.

Change the colour scheme to:

- Sage Green: `#7E9A82`
- Warm Off-White: `#EDECEA`
- Font Colour: `#432f2e`

Apply the colours consistently on every page:
- Use `#EDECEA` as the outer/background colour.
- Use `#7E9A82` for cards and inner boxes.
- Use `#432f2e` for text.

Maintain a clean, minimal, modern salon aesthetic. Ensure the colour scheme is consistent across all seven screens.

### Prompt 6 – Improve responsive design

Make the application usable on a mobile phone.

Ensure that customers can open the website on their phones and use the customer-facing pages without needing a desktop. Make the reception and TV interfaces readable on larger displays.

## 5. Customer Status Screen Changes

### Prompt 7 – Remove the test simulation interface

Remove the simulation box from the My Status screen.

Remove:
- The "It's your turn!" simulation box.
- The button labelled "Simulate: Test It's Your Turn Screen".

Keep the actual customer queue status and relevant functionality intact. Do not modify unrelated screens.

## 6. Project Documentation and Agent Instructions

### Prompt 8 – Update project documentation

Create and update the following project documentation files:

- `docs/01-brief.md`
- `docs/02-screens.md`
- `docs/03-flows-rules.md`

The brief should describe the project goal, target users, scope, and features.

The screens document should describe the seven screens, their routes, layouts, and expected functionality.

The flows and rules document should describe customer workflows, queue lifecycle, FIFO handling, barber assignment, and other queue rules.

Keep the documentation clear and consistent with the NOIR project.

### Prompt 9 – Update AGENTS.md

Create or update `AGENTS.md` with project-specific instructions for the coding agent.

Include:
- Project overview.
- Existing frontend technology.
- Folder and file structure.
- UI colour palette.
- Screen and routing requirements.
- Coding conventions.
- Important queue rules.
- Instructions to avoid unnecessary changes to unrelated files.

Clearly distinguish the current frontend implementation from the planned backend architecture.

Do not claim that PostgreSQL, Node.js/Express APIs, authentication, or real-time cross-device synchronization have already been implemented if they are not present in the code.

## 7. GitHub Setup and Version Control

### Prompt 10 – Prepare the project for GitHub

Initialize Git in the NOIR project folder.

Prepare the project files for version control. Create an appropriate `.gitignore` and exclude unnecessary files such as dependencies, build output, and local environment files.

Use the repository name:

`NOIR-salon-queue-management`

Use a meaningful initial commit message identifying the NOIR salon queue management project.

### Prompt 11 – Resolve GitHub authentication and push issues

During the initial GitHub push, authentication failed with:

`Invalid username or token. Password authentication is not supported.`

Investigate the authentication issue and use an appropriate GitHub authentication method. Do not expose personal access tokens in source code or commit them to the repository.

Push the project to the `main` branch of the GitHub repository.

## 8. Vercel Deployment

### Prompt 12 – Deploy the frontend

Prepare the React and Vite application for deployment on Vercel.

Use the following build configuration:

- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

Deploy the application and verify that the generated public URL opens successfully.

### Prompt 13 – Test the deployed website on a mobile phone

Open the deployed NOIR website on a phone.

Check that the application loads and that the responsive interface is usable on the mobile screen.

## 9. Daily Customer Counter Bug Investigation

### Prompt 14 – Investigate the Clients Served Today counter

Investigate why the Clients Served Today counter on the Owner/Admin Dashboard keeps displaying an incorrect value, initially showing 18, even after customers are marked as Done and the page is refreshed.

Do not immediately change the code.

Trace:
- Initial mock customer data.
- Completed customer records.
- Counter calculation logic.
- localStorage persistence.
- Data migration logic.
- Queue reset functionality.

Identify the root cause and report which files and functions are responsible.

### Prompt 15 – Investigate differences between laptop and phone

Check why the queue statistics and Clients Served Today count are different on the laptop and phone.

Determine whether the application uses localStorage or another storage mechanism and whether data is synchronized between separate devices.

Explain whether the current implementation supports shared data across devices.

### Prompt 16 – Fix the Clients Served Today counter

Correct the daily counter without changing unrelated application functionality.

Ensure that:
- A fresh installation starts with zero completed customers.
- Mock completed customers are not counted as genuine customers.
- Marking a customer as Done increments the counter.
- Refreshing the application preserves genuine completed records.
- Existing genuine records are preserved during migration.
- Resetting queue data does not reintroduce fake completed customers.
- Duplicate counting is prevented.

Inspect all migration and reset paths before implementing the fix.

### Prompt 17 – Preserve existing data during migration

When correcting the stored queue data, handle existing storage versions safely.

Remove known mock seed records while preserving genuine completed records. Avoid losing genuine customer records during migration.

Ensure that old stored versions do not reintroduce mock completed records after the application is refreshed or reset.

## 10. Build and Deployment Verification

### Prompt 18 – Verify the production build

Run the production build and check for compilation errors.

Ensure the frontend can be built successfully using:

`npm run build`

Do not make unrelated code changes.

### Prompt 19 – Verify the latest deployed version

After pushing the latest changes to GitHub, verify that Vercel has completed the deployment successfully.

Check the deployed website again and confirm that the latest changes are available.

---

## 11. Failed Attempts and Development Issues

The following issues occurred during development and were investigated or addressed:

1. GitHub rejected the initial push because password authentication is not supported.
2. GitHub personal access token authentication required correction.
3. The initial daily customer count displayed 18 because mock completed records were included in the initial data.
4. The daily counter could differ between laptop and phone because localStorage is browser- and device-specific.
5. The queue data did not automatically synchronize across separate devices because a shared backend and database had not yet been implemented.
6. The application required repeated production build and deployment verification after code changes.

These issues are included to document the development and debugging process, not to imply that every issue was solved by a single prompt.

## 12. Planned Improvements

The following features are part of the intended future architecture and are not claimed as implemented:

- PostgreSQL database integration.
- Node.js and Express backend.
- Shared queue data across devices.
- Socket.IO real-time synchronization.
- Staff authentication and role-based authorization.
- Centralized customer and queue management.



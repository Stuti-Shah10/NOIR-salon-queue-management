# NOIR – Salon Queue Management System

**Live Website:** https://noir-salon-queue-management.vercel.app

**GitHub Repository:** https://github.com/Stuti-Shah10/NOIR-salon-queue-management

## 1. Project Overview

NOIR is a salon queue management system designed to make waiting at a salon more organized and convenient. Customers can join the queue using their phones and check their queue status, while salon staff can manage customers and monitor the queue through dedicated screens.

The project focuses on reducing confusion around waiting times and improving coordination between customers, reception staff, and barbers.

## 2. Features and Screens

The application includes seven main screens:

1. **Home:** Displays salon information, queue overview, and available barbers.
2. **Join Queue:** Allows customers to enter their details, select services, and join the queue.
3. **My Status:** Displays the customer's queue position and waiting status.
4. **Reception Dashboard:** Provides an interface for reception staff to manage the queue.
5. **Barber View:** Allows barbers to view and update their assigned queue.
6. **Waiting Area Display:** Provides a large-screen view of queue information.
7. **Owner Settings:** Provides an interface for salon settings and management.

## 3. Technology Stack

- React
- Vite
- Tailwind CSS
- JavaScript
- Git and GitHub
- Vercel (frontend deployment)

## 4. Design Theme

The application uses a minimal, modern salon-inspired colour palette:

- Sage Green: `#7E9A82`
- Warm Off-White: `#EDECEA`
- Dark Brown: `#432F2E`

The interface is designed to be responsive and easy to use across different screen sizes.

## 5. Running the Project Locally

### Prerequisites

- Node.js
- npm
- Git

### Installation

Clone the repository:

```bash
git clone https://github.com/Stuti-Shah10/NOIR-salon-queue-management.git
```

Navigate to the project directory:

```bash
cd NOIR-salon-queue-management
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in the terminal.

### Production Build

To create a production build:

```bash
npm run build
```

## 6. Current Implementation and Limitations

The current project is a deployed frontend prototype. Queue data is handled through browser-side storage.

As a result, data is not shared automatically between different devices or browsers. A centralized PostgreSQL database, backend APIs, real-time synchronization, and staff authentication are planned improvements and are not claimed as implemented features.

## 7. Future Scope

- Integrate a PostgreSQL database.
- Develop a Node.js and Express backend.
- Enable real-time queue synchronization across devices.
- Implement role-based authentication for reception staff, barbers, and owners.
- Improve queue analytics and reporting.

## 8. Project Submission

- **Live Application:** https://noir-salon-queue-management.vercel.app
- **Source Code:** https://github.com/Stuti-Shah10/NOIR-salon-queue-management



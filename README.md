# AksesKita — Web

Web application for **AksesKita**, a public accessibility reporting platform that allows users to report accessibility issues in public spaces and enables administrators to manage and monitor submitted reports.

The application provides separate experiences for public users and administrators, with features for reporting issues, viewing report details, tracking status, managing categories, and monitoring accessibility reports.

---

## Overview

AksesKita Web is the frontend application of the AksesKita platform.

It communicates with the AksesKita REST API to provide:

* User authentication
* Accessibility report submission
* Report browsing and search
* Report detail pages
* Interactive maps
* Report comments
* Report status tracking
* Report history
* Admin dashboard
* Category management
* User management

---

## Tech Stack

| Technology         | Purpose               |
| ------------------ | --------------------- |
| Next.js            | React framework       |
| TypeScript         | Type-safe development |
| Tailwind CSS       | Styling and UI        |
| Leaflet            | Interactive maps      |
| React Leaflet      | Leaflet integration   |
| Axios              | API communication     |
| JWT                | Authentication        |
| Next.js App Router | Application routing   |

---

## Features

### Public User

Users can:

* Register an account
* Log in and log out
* View accessibility reports
* Search and filter reports
* View report details
* Submit new reports
* Upload report images
* Select report locations using a map
* View report status
* View report history
* Add comments to reports

---

### Interactive Map

AksesKita uses **OpenStreetMap and Leaflet** to display report locations.

The map is used in several parts of the application, including:

* Selecting a location when creating a report
* Displaying report coordinates
* Viewing the location of an accessibility issue
* Showing geographical context for submitted reports

Example flow:

```text
Open Report Form
       ↓
Select Location on Map
       ↓
Latitude & Longitude
       ↓
Submit Report
       ↓
Backend API
```

---

### Report Management

Users can submit reports containing information such as:

```text
Title
Description
Category
Image
Latitude
Longitude
```

Reports can be displayed with filtering, searching, and pagination depending on the page and user permissions.

---

### Report Status

Users can monitor the progress of their reports through status updates.

Example workflow:

```text
Pending
   ↓
Reviewed
   ↓
In Progress
   ↓
Resolved
```

The frontend displays the current status as well as the report history returned by the backend.

---

### Comments

Reports support comments for communication between users and administrators.

The comment interface allows users to:

* Read existing comments
* Submit additional information
* Follow updates related to their report

---

## Admin Dashboard

Administrators have access to a dedicated dashboard for managing accessibility reports.

The dashboard can provide:

* Total report statistics
* Report status statistics
* Category statistics
* Report lists
* Report filtering
* Report searching
* Report detail management

Example:

```text
┌─────────────────────────────────────────┐
│              ADMIN DASHBOARD             │
├───────────┬───────────┬─────────────────┤
│  Reports  │  Pending  │    Resolved     │
│    120    │    32     │       64        │
└───────────┴───────────┴─────────────────┘
```

---

## Role-Based Interface

The application provides different interfaces depending on the authenticated user's role.

```text
                         Login
                           │
                           ▼
                    Authentication
                           │
              ┌────────────┴────────────┐
              │                         │
           Public                    Admin
              │                         │
              ▼                         ▼
        User Dashboard            Admin Dashboard
              │                         │
        Own Reports               All Reports
        Create Report             Manage Reports
        Comments                   Categories
        History                    Statistics
                                      │
                                      ▼
                                Superadmin
                                      │
                              User Management
                              Role Management
```

---

## Application Structure

```text
akses_kita_fe_web/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   │
│   ├── dashboard/
│   │   ├── page.tsx
│   │   ├── reports/
│   │   └── profile/
│   │
│   ├── reports/
│   │   ├── page.tsx
│   │   ├── create/
│   │   └── [id]/
│   │
│   ├── admin/
│   │   ├── dashboard/
│   │   ├── reports/
│   │   ├── categories/
│   │   └── users/
│   │
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── ui/
│   ├── layout/
│   ├── reports/
│   ├── map/
│   └── dashboard/
│
├── lib/
│   ├── api.ts
│   ├── auth.ts
│   └── utils.ts
│
├── services/
│   ├── auth.service.ts
│   ├── report.service.ts
│   ├── category.service.ts
│   └── user.service.ts
│
├── types/
│   └── index.ts
│
├── public/
│
├── .env.example
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

> The exact folder structure may differ depending on the current implementation.

---

## Requirements

Make sure the following are installed:

* Node.js
* npm
* Git

The application also requires the **AksesKita Backend API** to be running.

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd akses_kita_fe_web
```

Install dependencies:

```bash
npm install
```

---

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

The API URL should point to the running AksesKita backend.

---

## Running the Development Server

Start the development server:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

---

## Production Build

Create a production build:

```bash
npm run build
```

Run the production server:

```bash
npm start
```

---

## API Integration

The frontend communicates with the backend through REST API endpoints.

Example:

```text
Frontend
   │
   │ HTTP Request
   ▼
AksesKita Backend
   │
   ▼
PostgreSQL
```

Example API request:

```ts
const response = await api.get("/reports");
```

Authenticated requests include the user's JWT token:

```http
Authorization: Bearer <JWT_TOKEN>
```

---

## Design Approach

The interface focuses on a clean and accessible user experience.

The frontend is designed around:

* Clear navigation
* Responsive layouts
* Simple report submission
* Readable report information
* Location-based reporting
* Role-based interfaces
* Consistent UI components

The application is intended to be usable across desktop and mobile-sized screens.

---

## Related Projects

### AksesKita Backend

REST API responsible for authentication, report management, comments, categories, dashboard statistics, and database operations.

```text
Express.js
TypeScript
PostgreSQL
```

### AksesKita Mobile

Mobile client for submitting and monitoring accessibility reports.

```text
React Native
Expo
```

---

## Development Flow

```text
                 ┌───────────────────┐
                 │    AksesKita Web  │
                 │     Next.js       │
                 └─────────┬─────────┘
                           │
                           │ REST API
                           ▼
                 ┌───────────────────┐
                 │ AksesKita Backend │
                 │    Express.js     │
                 └─────────┬─────────┘
                           │
                           ▼
                 ┌───────────────────┐
                 │    PostgreSQL     │
                 └───────────────────┘
```

---

## Project Goal

AksesKita aims to provide a platform for documenting accessibility problems in public spaces.

Through the web application, users can report issues while administrators can review reports, manage their status, and monitor submitted accessibility problems.

---

## Author

**Radit**

RPL Student & Frontend Developer

---

## License

This project was created as a school project and learning portfolio.

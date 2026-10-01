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
│              AD
```

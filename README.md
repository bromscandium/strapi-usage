# Strapi Usage

This repository demonstrates how to integrate **Strapi** (backend) with a **Next.js frontend**. It is intended for learning purposes and provides an example setup with API integration, database connection, and unit testing.

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/bromscandium/strapi-usage.git
   cd strapi-usage
   ```

2. Install all dependencies:

   ```bash
   npm install
   ```

3. Navigate into each sub-project folder and install dependencies:

   ```bash
   cd next-frontend
   npm install
   cd strapi-cms
   npm install
   ```

---

## Running the projects

Each sub-project runs separately:

### Frontend (Next.js)

```bash
cd next-frontend
npm run dev
```

### Backend (Strapi)

```bash
cd strapi-cms
npm run develop
```

---

## Database

A database is already configured for Strapi.\
**Note:** this setup is included only for **demo and educational purposes**. It should not be used in production without further configuration.

---

## Project Structure

```
strapi-usage/
│
├── next-frontend/        # Next.js frontend application
│   ├── src/
│   │   ├── app/          # Next.js pages and routes
│   │   ├── components/   # Components (React)
│   │   ├── lib/          # Utility functions (API calls to Strapi)
│   │   ├── styles/       # Connection Tailwind
│   │   └── tests/        # Vitest unit tests
│   └── package.json
│
├── strapi-backend/       # Strapi backend (CMS + API)
│   ├── config/           # Strapi configuration
│   ├── database/         # Strapi database
│   ├── src/              # Strapi content types and controllers
│   └── package.json
│
├── .env.local            # Variables for Token and Strapi CMS link
│
└── README.md             
```

- **Frontend:** renders content fetched from Strapi.
- **Backend:** exposes REST API endpoints and manages content types such as news and home data.

---

## Tests

The frontend includes unit tests written with **Vitest**. Two main areas are covered:

---
   - Ensures media paths from Strapi are correctly prefixed with the Strapi base URL.
   - Handles missing environment variables gracefully (returns the raw path).

---
   - Verifies API calls to Strapi:
     - Returns JSON on `200` responses.
     - Returns `null` on `404` responses.
     - Throws errors on other failed responses (e.g., `500`).
   - Checks that the `Authorization` header with API token is passed.

Run tests with:

```bash
cd next-frontend
npx vitest
```

---

✅ With this repository you can learn how to:

- Connect a Strapi backend with a Next.js frontend.
- Use a database in Strapi for demo purposes.
- Write and run unit tests for API utility functions.
# Attendance Viewer

A React dashboard for viewing and managing student attendance data.

## Overview

Built to give school administrators a fast, filterable view of student participation. React 19 + Vite keeps the dev loop quick and the UI responsive even with large datasets, no noticeable lag on table updates, which was the main thing I was trying to avoid.

## Features

- Table handles frequent updates without UI lag
- Filter and sort by student, cohort, or date range
- Works on mobile (Tailwind CSS)
- HMR for fast dev feedback; ESLint flat config for linting

## Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Frontend | React 19 | Concurrent rendering; hooks feel cleaner in this version |
| Build | Vite | Cold starts are faster than Webpack, HMR is near-instant |
| Styling | Tailwind CSS | No switching between CSS files mid-component |
| HTTP | Axios | Interceptors and timeout config out of the box |
| Routing | React Router 7 | Client-side nav between views |

## Project Structure

```
Project1/
├── attendance-viewer/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Filters.jsx      # search + sort
│   │   │   ├── Students.jsx     # student profile views
│   │   │   └── Table.jsx        # data grid
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── assets/
│   ├── vite.config.js
│   └── eslint.config.js
└── package.json
```

## Setup

Node.js v18+ required.

```bash
git clone https://github.com/Adit-2006/attendance-viewer
cd Project1/attendance-viewer
npm install
npm run dev
```

## License

MIT

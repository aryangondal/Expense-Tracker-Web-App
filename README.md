# Expense Tracker Web App (React, Node.js, MongoDB, Chart.js)

A full-stack expense tracking application that **matches and satisfies the CV description**:

- **Full-stack app** with **6+ REST APIs** for expense logging and visualisation
- **Interactive charts** for insights (spend by category, monthly trends) using **Chart.js**
- **Responsive React UI** with filtering, sorting and live updates
- **Clean, well-commented code** with modular backend (routes, models, middleware) and a documented architecture
- **MongoDB** for persistence; **Mongoose** models; **Express** for the API; **Axios** for client requests
- **Plotly** was mentioned in the CV generally; this project uses **Chart.js** (as listed) for visualisations and can be swapped easily if needed.

---

## 🧱 Architecture

```
expense-tracker/
├── server/                 # Node.js + Express + MongoDB (Mongoose)
│   ├── src/
│   │   ├── models/         # Expense and Category schemas
│   │   ├── routes/         # expenses, categories, stats APIs
│   │   ├── middleware/     # error handling
│   │   ├── db.js           # Mongo connection
│   │   └── server.js       # Express app entry
│   ├── package.json
│   └── .env.example
└── client/                 # React (Vite) + Chart.js (react-chartjs-2) + Axios
    ├── src/
    │   ├── components/     # UI components
    │   ├── App.jsx
    │   ├── api.js          # API client
    │   └── main.jsx
    ├── index.html
    └── package.json
```

---

## 🚀 Quick Start

You need **Node 18+** and **npm**. Install **MongoDB** locally or use **MongoDB Atlas**.

### 1) Backend (server)

```bash
cd server
cp .env.example .env
# Edit .env and set MONGODB_URI to your connection string

npm install
npm run dev  # starts the API at http://localhost:4000
# or: npm start
```

### 2) Frontend (client)

```bash
cd ../client
npm install
npm run dev   # Vite dev server (default http://localhost:5173)
```

> The client assumes the API base URL is `http://localhost:4000/api`. You can change this in `client/src/api.js` or set `VITE_API_BASE` in a `.env` file under `client/`.

---

## 🌐 REST API Endpoints (6+)

Base path: `/api`

- `GET /expenses` — list expenses (supports `from`, `to`, `category`, `q` for search)
- `POST /expenses` — create an expense
- `PUT /expenses/:id` — update an expense
- `DELETE /expenses/:id` — delete an expense
- `GET /categories` — list categories
- `POST /categories` — create a category (idempotent by name)
- `GET /stats/summary` — totals by category and per-month aggregates

### Example: Create an expense

```bash
curl -X POST http://localhost:4000/api/expenses \
  -H "Content-Type: application/json" \
  -d '{"amount": 12.5, "category": "Food", "note": "Lunch", "date": "2025-08-25"}'
```

---

## 📊 Charts and Insights

- **Pie chart** — spend by category for the selected date range.
- **Line chart** — monthly total spending trend.

Both charts react to filters and data changes.

---

## 🧪 Sample Data (Optional)

You can seed demo categories and expenses:

```bash
cd server
npm run seed
```

---

## 🔧 Tech & Rationale

- **Express + Mongoose**: concise, well-typed schemas & validation.
- **Vite + React**: fast, modern SPA dev experience.
- **Chart.js** via **react-chartjs-2**: crisp visuals, straightforward API.
- **Axios**: simple HTTP client with interceptors.
- **Modular structure**: easy to extend (auth, budgets, exports, etc.).

---

## ✅ CV Alignment Checklist

- [x] **Full-stack app** (React + Node + MongoDB).
- [x] **6+ REST APIs** for expense management and stats.
- [x] **Expense logging** with filters, sorting, editing, and deletion.
- [x] **Interactive charts** (category pie, monthly trend line) using Chart.js.
- [x] **Responsive UI** tested on mobile & desktop breakpoints.
- [x] **Clear README** and **high-quality comments** in code.
- [x] **Scalable architecture** ready for production hardening.

---

## 🔐 Next Steps (nice-to-haves)
- Add authentication (JWT) and per-user data.
- Budget alerts and monthly targets.
- File import (CSV) and export features.
- CI pipeline and containerization (Dockerfile + docker-compose).

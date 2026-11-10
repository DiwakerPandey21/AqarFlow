# AqarFlow — Real Estate Management & Property Operations Platform
### VIRELEO Project 01 — 7-Day MVP Delivery Edition
Developed as part of the official **[VIRELEO](https://www.vireleo.me/)** Internship Program.

---

## 🌟 Executive Summary
**AqarFlow** (from Arabic/Urdu *Aqar* [Property/Land] + *Flow* [Business Workflows]) is a responsive, web-based real estate platform combining a **Public Property Discovery Portal** with an internal **Business Workspace (ERP + CRM)** tailored for Pakistani real estate agencies, dealers, builders, and property managers.

It solves real-world challenges in Pakistan's property ecosystem:
- **Zero Ghost Inventory**: Transparent, verified property listings.
- **Pakistan-First Market Localization**: Native **PKR** formatting in **Crore** and **Lakh**, land measurements in **Marla** and **Kanal**, and prime enclave filters (*Islamabad, Lahore, Karachi, Rawalpindi*).
- **Integrated CRM & Lead Pipeline**: Inquiries captured from public listings directly route into an interactive Kanban CRM.
- **Double-Booking Conflict Prevention**: Smart scheduling prevents overlapping client site visits for agents within a 45-minute window.
- **Deal Pipeline & Accrual**: Transaction tracking with milestone stages, automated agency commission calculation, and printable official transaction statements.
- **Institutional Audit Trail**: Comprehensive logging of user activities and data mutations for accountability.

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js 18+ (tested on Node.js 20 & 22)
- npm or pnpm

### 1. Launch the Application
```bash
# Navigate to the frontend directory
cd frontend

# Start the development server (runs with WebAssembly support)
npm run dev
```

Open your browser to:
- **Public Portal**: [http://localhost:3000](http://localhost:3000)
- **Properties Discovery**: [http://localhost:3000/properties](http://localhost:3000/properties)
- **Business Workspace**: [http://localhost:3000/workspace](http://localhost:3000/workspace)

---

## 👥 Demo User Credentials & 1-Click Role Switcher

The system features an integrated **1-Click Role Switcher** in both the top navigation bar and the workspace sidebar, allowing you to instantly alternate between administrative and agent perspectives without entering credentials.

| Role | Name | Email | Password | Access Scope |
| :--- | :--- | :--- | :--- | :--- |
| **Agency Principal / Admin** | Salman Tariq | `admin@aqarflow.com` | `Password123!` | Full agency access (all leads, all deals, team directory, inventory status, audit logs, financials) |
| **Real Estate Agent** | Ayesha Khan | `ayesha@aqarflow.com` | `Password123!` | Scoped workspace (assigned leads, personal deal pipeline, personal visit schedule, inventory listing) |

---

## 🧭 Key Features & Pages

### 1. Public Portal
- **Home (`/`)**: Hero search engine, market statistics, featured properties, property categories, and value propositions.
- **Properties Listing (`/properties`)**: Search, filter by purpose (*Sale, Rent*), city (*Islamabad, Lahore, Karachi*), property type, price slider (PKR), bedrooms, and sorting.
- **Property Detail (`/properties/[slug]`)**: Photo gallery, specifications (Marla/Kanal), verified amenities, assigned agent profile, direct WhatsApp button, and inquiry form.
- **Visit Booking**: Schedule an on-site property inspection with automatic agent conflict checking.
- **About, Services & Contact (`/about`, `/services`, `/contact`)**: Agency story, operational pillars, branch locations, and interactive FAQ.

### 2. Internal Business Workspace (ERP + CRM)
- **Executive Dashboard (`/workspace`)**: Real-time KPI summary (Active Listings, Open Leads, Scheduled Visits, Monthly Revenue, Pipeline Value), lead funnel visualization, and recent activity streams.
- **Property Inventory (`/workspace/properties`)**: Filterable inventory table, inline status updater (*Draft, Available, Under Offer, Reserved, Sold, Rented*), and "+ Add Property" modal.
- **Lead CRM (`/workspace/leads`)**:
  - **Kanban Board**: Drag/click stages (*New, Contacted, Qualified, Visit Scheduled, Negotiation, Converted, Lost*).
  - **Data Table View**: Tabular overview with search and agent assignment.
  - **Lead Detail Drawer**: Chronological communication timeline (calls, WhatsApp messages, meetings, notes) and agent reassignment.
- **Visits & Appointments (`/workspace/visits`)**: Inspection scheduler with **double-booking collision detection** (rejects overlapping appointments for an agent) and outcome status logger.
- **Deals & Transactions (`/workspace/deals`)**: Transaction pipeline, token deposit tracking, automated agency commission accrual, and **Printable Official Transaction Statement / Receipt**.
- **Agent Directory (`/workspace/agents`)**: Agent performance roster and member onboarding.
- **Institutional Audit Trail (`/workspace/audit-logs`)**: Complete immutable log of administrative actions.

---

## 📐 Architecture & Tech Stack

```
AqarFlow/
├── frontend/                  # Next.js 16 (App Router, TypeScript, Tailwind CSS, Lucide)
│   ├── src/
│   │   ├── app/               # Public pages, /workspace ERP routes, and /api/v1 REST endpoints
│   │   ├── components/        # Public, Workspace, UI, and Navigation components
│   │   ├── context/           # AuthContext with 1-click role switching
│   │   ├── lib/               # Database engine, formatters (PKR, Marla/Kanal), TypeScript types
│   ├── package.json
│   └── tsconfig.json
├── backend/                   # Python FastAPI architecture (SQLAlchemy 2.0, Pydantic, Alembic)
│   ├── app/
│   │   ├── api/v1/            # API routers (auth, properties, leads, visits, deals, reports)
│   │   ├── core/              # Config, security, DB engine
│   │   ├── models/            # SQLAlchemy database models
│   │   └── schemas/           # Pydantic schemas
├── docs/                      # Comprehensive Documentation
│   ├── DELIVERY_REPORT.md     # Official 7-Day MVP Project 01 Submission for VIRELEO
│   ├── architecture/          # System design & conflict engine mechanics
│   ├── api/                   # REST API documentation
│   └── user-guides/           # Admin & Agent user guides
├── .env.example               # Environment variables template
└── README.md                  # Project documentation
```

---

## ⚡ 1-Click Vercel Deployment Guide

To deploy **AqarFlow** directly to Vercel:

1. **Import Repository in Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard) &rarr; **Add New Project** &rarr; Select `DiwakerPandey21/AqarFlow`.
2. **Configure Root Directory**:
   - In the **Project Settings** screen, click **Edit** next to **Root Directory**.
   - Select or type `frontend` and click **Continue**.
3. **Deploy**:
   - Framework preset will automatically detect **Next.js**.
   - No custom environment variables required (built-in full-stack Next.js App Router API).
   - Click **Deploy** &rarr; Your production site will be live within ~60 seconds!

---

## 📄 Project Documentation
- [Project Delivery Report](file:///d:/AqarFlow/docs/DELIVERY_REPORT.md)
- [Architecture & Design Document](file:///d:/AqarFlow/docs/architecture/ARCHITECTURE.md)
- [API Reference Manual](file:///d:/AqarFlow/docs/api/API_REFERENCE.md)
- [Admin & Agent User Guide](file:///d:/AqarFlow/docs/user-guides/ADMIN_AND_AGENT_GUIDE.md)

---

## 🏢 VIRELEO Attribution & Guidelines
This project was developed strictly adhering to the **VIRELEO Project 01** specifications:
- Organization: **VIRELEO** ([https://www.vireleo.me/](https://www.vireleo.me/))
- Scope: 7-Day Time-Boxed MVP
- Project Category: Real Estate ERP + CRM + Property Listing Portal
- Primary Market: Pakistan (with international expansion architecture)

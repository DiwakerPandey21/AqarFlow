# AqarFlow REST API Reference
**Version**: 1.0 (7-Day MVP)  
**Base URL**: `/api/v1`  
**Data Format**: JSON (`application/json`)

---

## 1. Authentication & System Health

### `GET /api/v1/health`
Checks backend and database readiness.
- **Access**: Public
- **Response `200 OK`**:
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "system": "AqarFlow Platform",
  "project": "Project 01 for VIRELEO",
  "database": "connected"
}
```

### `POST /api/v1/auth/login`
Authenticates a user and returns their profile with session token.
- **Access**: Public
- **Request Body**:
```json
{
  "email": "admin@aqarflow.com",
  "password": "Password123!"
}
```
- **Response `200 OK`**:
```json
{
  "access_token": "token_admin_...",
  "token_type": "bearer",
  "user": {
    "id": "u1",
    "agency_id": "agency-1",
    "full_name": "Salman Tariq",
    "email": "admin@aqarflow.com",
    "role": "agency_admin"
  }
}
```

### `GET /api/v1/auth/me`
Retrieves the active logged-in user profile.
- **Headers**: `Authorization: Bearer <token>`
- **Response `200 OK`**: User profile object.

---

## 2. Public Property Discovery & Inquiries

### `GET /api/v1/public/properties`
Fetches published and active property listings with query filtering.
- **Access**: Public
- **Query Parameters**:
  - `purpose`: `sale` | `rent` | `lease`
  - `city`: `Islamabad` | `Lahore` | `Karachi` | `Rawalpindi`
  - `property_type`: `House` | `Apartment` | `Villa` | `Commercial Plot` | etc.
  - `min_price`: Number (PKR)
  - `max_price`: Number (PKR)
  - `bedrooms`: Number
  - `is_featured`: `true` | `false`
  - `search`: Keyword string (searches title, locality, address, reference code)
- **Response `200 OK`**: Array of `Property` objects.

### `GET /api/v1/public/properties/[slug]`
Retrieves detailed property information including gallery, amenities, specifications, and assigned agent profile.
- **Access**: Public
- **Response `200 OK`**: `Property` object.
- **Response `404 Not Found`**: `{ "detail": "Property not found" }`

### `POST /api/v1/public/inquiries`
Captures public lead inquiries from the property detail page or contact form.
- **Access**: Public
- **Request Body**:
```json
{
  "property_id": "prop-1",
  "client_name": "Muhammad Hamza",
  "phone": "+92 300 1234567",
  "email": "hamza@example.com",
  "preferred_contact_method": "WhatsApp",
  "purpose": "Buy",
  "notes": "Interested in viewing the house on Sunday."
}
```
- **Response `201 Created`**: Returns created `Lead` with initial stage set to `New` and auto-assigned agent.

---

## 3. Property Inventory Management (Workspace)

### `GET /api/v1/properties`
Lists all properties under the agency (including drafts and off-market).
- **Access**: Authenticated (`agency_admin`, `agent`)
- **Query Parameters**: `status`, `purpose`, `city`, `agent_id`, `search`
- **Response `200 OK`**: Array of `Property` objects.

### `POST /api/v1/properties`
Creates a new property record.
- **Access**: Authenticated (`agency_admin`, `agent`)
- **Request Body**: Complete property specification (title, purpose, category, price, area_value, area_unit, bedrooms, bathrooms, address, city, locality, amenities, etc.).
- **Response `201 Created`**: Newly created `Property`.

### `PATCH /api/v1/properties/[id]`
Updates property fields or status (*Draft, Available, Under Offer, Reserved, Sold, Rented*).
- **Access**: Authenticated (`agency_admin`, `agent`)
- **Response `200 OK`**: Updated `Property`.

---

## 4. CRM: Leads, Follow-ups & Activities

### `GET /api/v1/leads`
Retrieves leads with filtering. If caller is an `agent`, only returns leads assigned to them.
- **Access**: Authenticated
- **Query Parameters**: `stage`, `agent_id`, `search`
- **Response `200 OK`**: Array of `Lead` objects with embedded activities.

### `POST /api/v1/leads`
Manually enters a new lead into the CRM.
- **Access**: Authenticated
- **Response `201 Created`**: Newly created `Lead`.

### `PATCH /api/v1/leads/[id]`
Updates lead details or moves lead across pipeline stages (*New, Contacted, Qualified, Visit Scheduled, Negotiation, Converted, Lost*).
- **Access**: Authenticated

### `POST /api/v1/leads/[id]/assign`
Reassigns a lead to another team member.
- **Access**: Agency Admin (`agency_admin`)
- **Request Body**: `{ "agent_id": "u2" }`
- **Response `200 OK`**: Updated `Lead` with logged reassignment activity.

### `POST /api/v1/leads/[id]/activities`
Logs a client touchpoint (*call, whatsapp, meeting, note*).
- **Access**: Authenticated
- **Request Body**:
```json
{
  "activity_type": "call",
  "body": "Client agreed to budget of 4.5 Crore. Site visit booked for tomorrow."
}
```

---

## 5. Visit Scheduling & Conflict Engine

### `GET /api/v1/visits`
Lists scheduled visits. Scoped to agent for `agent` role.
- **Access**: Authenticated
- **Query Parameters**: `status`, `agent_id`, `property_id`
- **Response `200 OK`**: Array of `Visit` records.

### `POST /api/v1/visits`
Schedules a property inspection visit. Automatically executes double-booking conflict detection.
- **Access**: Public or Authenticated
- **Request Body**:
```json
{
  "property_id": "prop-1",
  "agent_id": "u2",
  "client_name": "Farhan Ali",
  "client_phone": "+92 321 9876543",
  "scheduled_at": "2026-11-12T14:30:00Z",
  "notes": "Client bringing family."
}
```
- **Response `201 Created`**:
```json
{
  "visit": { "id": "vis-99", ... }
}
```
- **Response `409 Conflict`**: If the agent is already booked in an overlapping window:
```json
{
  "detail": "Agent Ayesha Khan already has a scheduled visit at 2:30 PM with Existing Client."
}
```

### `PATCH /api/v1/visits/[id]`
Updates visit status (*Requested, Confirmed, Completed, Cancelled, No-show*) or records outcome feedback.
- **Access**: Authenticated

---

## 6. Deal Pipeline & Accounting Receipts

### `GET /api/v1/deals`
Returns deal pipeline records. Scoped for agents to their own deals.
- **Access**: Authenticated

### `POST /api/v1/deals`
Initiates a new deal booking. Automatically calculates agency commission based on agreed rate (e.g. 1.5% or 2%).
- **Access**: Authenticated

### `PATCH /api/v1/deals/[id]`
Updates deal progression (*Booking, Documentation, Closed Won, Closed Lost*).

---

## 7. Reports & Audit Trail

### `GET /api/v1/reports/dashboard`
Returns high-level business intelligence KPIs:
- `total_properties`, `active_listings`, `total_leads`, `active_leads`
- `scheduled_visits`, `closed_deals_count`, `total_revenue_pkr`, `pipeline_value_pkr`
- `leads_by_stage`, `recent_leads`, `upcoming_visits`

### `GET /api/v1/audit-logs`
Institutional audit trail capturing timestamp, user name, role, action, entity type, and modification details.
- **Access**: Agency Admin (`agency_admin`)

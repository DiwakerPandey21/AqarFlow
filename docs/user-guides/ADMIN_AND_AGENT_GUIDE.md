# AqarFlow User & Role Guide
**Project 01 — VIRELEO 7-Day MVP Operations Manual**

---

## 1. Demo Credentials & Instant Role Switcher

For evaluation, testing, and day-to-day operations, AqarFlow comes pre-loaded with verified user profiles:

| Role | Name | Email | Password | Access Scope |
| :--- | :--- | :--- | :--- | :--- |
| **Agency Principal / Admin** | Salman Tariq | `admin@aqarflow.com` | `Password123!` | Complete agency access (all leads, all deals, team management, inventory control, audit logs, financials) |
| **Real Estate Agent** | Ayesha Khan | `ayesha@aqarflow.com` | `Password123!` | Scoped agent workspace (assigned leads, personal deal pipeline, personal visit calendar, inventory listing) |

### Switching Roles with 1 Click
- In the **Public Header Bar**: Click the pill badge `Salman Tariq (Admin)` or `Ayesha Khan (Agent)` to instantly toggle active identity.
- In the **Workspace Sidebar Footer**: Click the avatar card or role switcher button to switch between Admin and Agent without retyping credentials.

---

## 2. Agency Admin Workflow Guide

### A. Executive Dashboard Overview (`/workspace`)
- Review total active listings across Islamabad, Lahore, and Karachi.
- Monitor active pipeline value (Crores PKR) and earned commission revenue.
- Inspect the Lead Conversion Funnel from **New** to **Converted**.
- View real-time upcoming client property visits for the current week.

### B. Property Inventory Management (`/workspace/properties`)
- **Add New Property**: Click `+ Add Property` button. Fill in title, reference code (e.g. `AQAR-ISB-004`), purpose (*Sale/Rent*), category, property type, price in PKR, area value & unit (*Marla, Kanal, Sq. Ft*), bedrooms, location, amenities, and image URLs.
- **Update Listing Status**: Use the inline dropdown selector on any row to toggle status between *Available, Under Offer, Reserved, Sold, Rented, Draft*.
- **Archive Listing**: Admin can archive properties to immediately remove them from the public portal without losing historical deal associations.

### C. Lead Management & Reassignment (`/workspace/leads`)
- Toggle between **Kanban Board** and **Data Table** view.
- In Kanban view, drag or click the stage tag on any lead card to advance stages (*New &rarr; Contacted &rarr; Qualified &rarr; Visit Scheduled &rarr; Negotiation &rarr; Converted*).
- **Reassign Lead**: Open any lead by clicking its card. In the side drawer, use the **Assigned Agent** dropdown to reassign the lead from one agent to another. An automatic audit activity log is created.
- **Log Touchpoints**: Add calls, WhatsApp conversations, or in-person notes directly into the chronological timeline.

### D. Team Directory & Commission Management (`/workspace/agents` & `/workspace/deals`)
- Inspect agent performance metrics: active listings represented, active leads in pipeline, and total commission generated.
- Add new team members with specific roles (*Agent* or *Admin*).
- Access the **Deals Pipeline** to view all agency transactions, token deposit statuses, and commission breakdowns.
- Click **"Print / View Statement"** on any deal to generate a formal, branded **Transaction Statement & Token Receipt** ready for client delivery or physical signing.

### E. System Audit Logs (`/workspace/audit-logs`)
- Review an institutional log of all operations: property creations, price alterations, lead reassignments, visit bookings, and deal closures.
- Filter by action or entity type for operational compliance and internal auditing.

---

## 3. Real Estate Agent Workflow Guide

### A. Daily Agent Routine
1. **Check Assigned Inquiries**: Open `/workspace/leads`. Only leads assigned to your profile appear in your personal view.
2. **Follow-Up & Timeline Updates**:
   - Review leads flagged with pending `next_follow_up_at`.
   - Contact the client via WhatsApp or phone.
   - Click the lead card and record meeting notes or next action steps.
   - Advance the lead status to **Contacted** or **Qualified**.

### B. Scheduling a Site Inspection Visit (`/workspace/visits`)
1. Click `+ Schedule Visit`.
2. Select the property and enter the client's name and contact number.
3. Choose the proposed date and inspection time.
4. **Collision Protection**: If another visit is already booked for you within 45 minutes of the selected time, the system will highlight the conflict and prevent double-booking.
5. Once the visit is completed, open the visit row and update status to **Completed**, logging client feedback (e.g. *"Client loved the master bedroom finish; requested formal offer document"*).

### C. Closing Deals & Commission Tracking (`/workspace/deals`)
1. When a client agrees to terms, click `+ Create Deal`.
2. Link the property, lead, and agreed transaction price.
3. Record the token deposit amount received.
4. The system calculates your agent commission based on the agency's agreed percentage.
5. Generate the official statement receipt for the buyer and seller.

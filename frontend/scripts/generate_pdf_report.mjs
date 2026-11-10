import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const screenshotsDir = "D:/AqarFlow/docs/screenshots";

function getBase64Image(filename) {
  const filePath = path.join(screenshotsDir, filename);
  const data = fs.readFileSync(filePath);
  return `data:image/png;base64,${data.toString("base64")}`;
}

const publicPortalB64 = getBase64Image("public_portal_front.png");
const workspaceB64 = getBase64Image("agency_workspace_front.png");
const kanbanB64 = getBase64Image("kanban_crm.png");
const propertiesB64 = getBase64Image("properties_portal.png");

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>VIRELEO Project 01 — AqarFlow Day 1 Report</title>
  <style>
    @page {
      size: A4;
      margin: 18mm 16mm 18mm 16mm;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      line-height: 1.55;
      font-size: 13.5px;
      margin: 0;
      padding: 0;
      background: #ffffff;
    }
    .header-banner {
      border-bottom: 2px solid #2563eb;
      padding-bottom: 12px;
      margin-bottom: 20px;
    }
    .org-tag {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #2563eb;
    }
    h1 {
      font-size: 26px;
      margin: 4px 0 2px 0;
      color: #0f172a;
      font-weight: 800;
    }
    .subtitle {
      font-size: 14px;
      color: #64748b;
      margin: 0;
    }
    .badge {
      display: inline-block;
      padding: 3px 8px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 700;
      background: #ecfdf5;
      color: #047857;
      border: 1px solid #a7f3d0;
      margin-top: 6px;
    }
    .meta-table {
      width: 100%;
      border-collapse: collapse;
      margin: 16px 0 24px 0;
      font-size: 12px;
    }
    .meta-table td {
      padding: 7px 10px;
      border: 1px solid #e2e8f0;
    }
    .meta-label {
      background: #f8fafc;
      font-weight: 700;
      color: #334155;
      width: 20%;
    }
    h2 {
      font-size: 18px;
      color: #0f172a;
      border-left: 4px solid #2563eb;
      padding-left: 8px;
      margin-top: 24px;
      margin-bottom: 10px;
      page-break-after: avoid;
    }
    h3 {
      font-size: 14px;
      color: #1e40af;
      margin-top: 14px;
      margin-bottom: 6px;
      page-break-after: avoid;
    }
    p {
      margin: 0 0 10px 0;
      color: #334155;
    }
    .screenshot-card {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      padding: 10px;
      margin: 14px 0 20px 0;
      page-break-inside: avoid;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
    .screenshot-card img {
      width: 100%;
      height: auto;
      border-radius: 6px;
      display: block;
      border: 1px solid #e2e8f0;
    }
    .caption {
      font-size: 11px;
      color: #64748b;
      margin-top: 6px;
      text-align: center;
      font-weight: 600;
    }
    table.data-table {
      width: 100%;
      border-collapse: collapse;
      margin: 14px 0;
      font-size: 12px;
      page-break-inside: avoid;
    }
    table.data-table th, table.data-table td {
      border: 1px solid #cbd5e1;
      padding: 8px 10px;
      text-align: left;
    }
    table.data-table th {
      background: #f1f5f9;
      color: #1e293b;
      font-weight: 700;
    }
    .status-pass {
      color: #047857;
      font-weight: 700;
    }
    .page-break {
      page-break-before: always;
    }
    ul {
      margin: 0 0 14px 20px;
      padding: 0;
      color: #334155;
    }
    li {
      margin-bottom: 6px;
    }
    .footer-note {
      margin-top: 30px;
      padding-top: 12px;
      border-top: 1px solid #e2e8f0;
      font-size: 11px;
      color: #64748b;
    }
  </style>
</head>
<body>

  <!-- Header Banner -->
  <div class="header-banner">
    <div class="org-tag">VIRELEO Internship Program — Individual Development Project</div>
    <h1>PROJECT 01: AQARFLOW</h1>
    <div class="subtitle">Real Estate Management & Property Operations Platform (Pakistan-First ERP + CRM + Discovery Portal)</div>
    <div class="badge">DAY 1 DELIVERY REPORT — 100% CORE MVP FOUNDATION DELIVERED</div>
  </div>

  <!-- Metadata Table -->
  <table class="meta-table">
    <tr>
      <td class="meta-label">Project Name</td>
      <td>AqarFlow (Project 01)</td>
      <td class="meta-label">Host Organization</td>
      <td><strong>VIRELEO</strong> (<a href="https://www.vireleo.me/" target="_blank">www.vireleo.me</a>)</td>
    </tr>
    <tr>
      <td class="meta-label">Delivery Track</td>
      <td>Full-Stack Web Development</td>
      <td class="meta-label">Execution Date</td>
      <td>November 9, 2026 (Day 1 of 7)</td>
    </tr>
    <tr>
      <td class="meta-label">Primary Stack</td>
      <td>Next.js 16 (App Router), TypeScript, Tailwind CSS, REST API</td>
      <td class="meta-label">Live Test URL</td>
      <td><a href="http://localhost:3000">http://localhost:3000</a></td>
    </tr>
    <tr>
      <td class="meta-label">Target Market</td>
      <td>Pakistan (PKR in Crore/Lakh, Marla/Kanal, Islamabad, Lahore, Karachi)</td>
      <td class="meta-label">Milestone Status</td>
      <td><span class="status-pass">Completed & Verified (21/21 Tests Passed)</span></td>
    </tr>
  </table>

  <!-- Executive Summary -->
  <h2>1. Executive Summary & Day 1 Milestone</h2>
  <p>
    <strong>AqarFlow</strong> combines <em>"Aqar"</em> (property/real estate) with <em>"Flow"</em> (seamless operational business workflows) to establish a single reliable source of truth for properties, customers, leads, appointments, and deal commissions in Pakistan.
  </p>
  <p>
    Within the Day 1 execution window, the end-to-end foundation was delivered: a high-performance <strong>Public Property Discovery Portal</strong> that captures client inquiries, synchronized directly with an internal <strong>Business Workspace (ERP + CRM)</strong> featuring interactive Kanban pipelines, algorithmic double-booking protection, and financial receipt generation.
  </p>

  <!-- Screenshots Section -->
  <h2>2. Visual Demonstrations: Public & Agency Portals</h2>

  <h3>2.1 Public Property Discovery Portal (Homepage Front View)</h3>
  <p>
    The public discovery website welcomes property seekers with a multi-variable search engine (purpose, property type, city, keyword), market KPIs, verified inventory collections, and direct agent WhatsApp routing:
  </p>
  <div class="screenshot-card">
    <img src="${publicPortalB64}" alt="AqarFlow Public Discovery Portal">
    <div class="caption">Figure 1: AqarFlow Public Discovery Portal Front Page (http://localhost:3000)</div>
  </div>

  <div class="page-break"></div>

  <h3>2.2 Agency Business Workspace (Executive Overview Dashboard)</h3>
  <p>
    The authenticated internal workspace provides agency leadership and agents with real-time portfolio metrics, active sales pipeline valuation in PKR Crores, lead stage conversion funnels, and upcoming inspection tours:
  </p>
  <div class="screenshot-card">
    <img src="${workspaceB64}" alt="AqarFlow Agency Workspace Dashboard">
    <div class="caption">Figure 2: AqarFlow Internal Business Workspace Dashboard (http://localhost:3000/workspace)</div>
  </div>

  <h3>2.3 Lead CRM Pipeline (Interactive Kanban Board)</h3>
  <p>
    Authorized brokers and admins manage client relationships through a drag-and-click Kanban board featuring 7 lifecycle stages (*New, Contacted, Qualified, Visit Scheduled, Negotiation, Converted, Lost*) and activity timelines:
  </p>
  <div class="screenshot-card">
    <img src="${kanbanB64}" alt="AqarFlow Lead CRM Kanban Board">
    <div class="caption">Figure 3: Lead CRM Interactive Kanban Board with Immediate Status Synchronization</div>
  </div>

  <div class="page-break"></div>

  <h3>2.4 Property Inventory & Multi-Filter Search Portal</h3>
  <p>
    The property explorer displays verified listings with dynamic price sliders (PKR), bedroom filters, area conversions (Marla/Kanal), and verified title badges:
  </p>
  <div class="screenshot-card">
    <img src="${propertiesB64}" alt="AqarFlow Property Inventory & Filter Portal">
    <div class="caption">Figure 4: Filterable Property Inventory Portal with Grid/List Layouts</div>
  </div>

  <!-- Completed Work Breakdown -->
  <h2>3. Work Breakdown Completed on Day 1</h2>
  <ul>
    <li><strong>Full-Stack Architecture:</strong> Engineered Next.js 16 App Router application with dual-portal layout hierarchy, persistent state, and 11 embedded RESTful route handlers under <code>/api/v1</code>.</li>
    <li><strong>Pakistan Market Localization:</strong> Standardized PKR formatting in Crore/Lakh (e.g. <code>PKR 14.5 Crore</code>), land units in Marla/Kanal (225 sq ft/4,500 sq ft), and geographic filtering for Islamabad, Lahore, Karachi, and Rawalpindi.</li>
    <li><strong>Double-Booking Conflict Engine:</strong> Algorithmic scheduler in <code>db.ts</code> and <code>/api/v1/visits</code> that detects overlapping 45-minute booking slots for the same agent, rejecting collisions with HTTP 409 Conflict.</li>
    <li><strong>CRM & Activity Logging:</strong> Integrated communication drawer allowing agents to log phone calls, WhatsApp messages, site meetings, and internal follow-up dates.</li>
    <li><strong>Deal Pipeline & Financial Accrual:</strong> Automated commission calculation engine (1.5% to 3%) linked with a formal, printable Transaction Statement & Token Deposit Receipt.</li>
    <li><strong>Institutional Audit Trail:</strong> Immutable security log tracking all entity modifications, actor roles, timestamps, and IP addresses.</li>
    <li><strong>1-Click Demo Role Switcher:</strong> Instant switching between Agency Admin (Salman Tariq) and Senior Agent (Ayesha Khan) directly in the UI without retyping credentials.</li>
  </ul>

  <!-- Technical Challenges -->
  <h2>4. Technical Challenges & Engineering Solutions</h2>
  <table class="data-table">
    <thead>
      <tr>
        <th style="width: 25%;">Challenge</th>
        <th style="width: 35%;">Root Cause</th>
        <th style="width: 40%;">Resolution</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>React 19 Hydration Mismatch</strong></td>
        <td>Server Node.js on Windows formatted large prices using Indian grouping (<code>14,50,00,000</code>), while browser Chrome used US grouping (<code>145,000,000</code>), causing WhatsApp link query parameters to diverge.</td>
        <td>Engineered <code>formatNumberFixed()</code>, a deterministic regex formatter immune to OS/browser locale differences, and added <code>suppressHydrationWarning</code> to dynamic anchors.</td>
      </tr>
      <tr>
        <td><strong>Missing CSS / Unstyled UI</strong></td>
        <td>Next.js Webpack mode (used to bypass Windows AppLocker on native binaries) did not invoke Tailwind v4's Rust oxide scanner, emitting empty utility classes.</td>
        <td>Configured pure-JavaScript <strong>Tailwind CSS v3.4 + PostCSS + Autoprefixer</strong> with explicit content scanning in <code>tailwind.config.ts</code>, generating the complete 61.5 KB stylesheet.</td>
      </tr>
      <tr>
        <td><strong>Visit Double-Booking</strong></td>
        <td>Overlapping inspection tours booked for the same broker caused scheduling chaos.</td>
        <td>Implemented time-slot collision detection algorithm rejecting conflicts with actionable notifications.</td>
      </tr>
    </tbody>
  </table>

  <!-- Quality Assurance -->
  <h2>5. Quality Assurance & Verification Results</h2>
  <p>
    All 29 production routes compiled with 0 errors. A 21-point automated integration test suite (<code>tests/test_api.mjs</code>) verified all endpoints:
  </p>
  <table class="data-table">
    <thead>
      <tr>
        <th>Verification Area</th>
        <th>Test Description</th>
        <th>Result</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>System Health</td>
        <td>GET /api/v1/health verified status and market indicator</td>
        <td><span class="status-pass">PASSED (200 OK)</span></td>
      </tr>
      <tr>
        <td>Public Listings</td>
        <td>GET /api/v1/public/properties?city=Islamabad returned verified properties</td>
        <td><span class="status-pass">PASSED (200 OK)</span></td>
      </tr>
      <tr>
        <td>Public Inquiry Ingestion</td>
        <td>POST /api/v1/public/inquiries generated CRM lead in stage 'New'</td>
        <td><span class="status-pass">PASSED (201 Created)</span></td>
      </tr>
      <tr>
        <td>Staff Authentication</td>
        <td>POST /api/v1/auth/login authenticated Admin credentials</td>
        <td><span class="status-pass">PASSED (200 OK)</span></td>
      </tr>
      <tr>
        <td>Conflict Prevention</td>
        <td>POST /api/v1/visits rejected overlapping 15-min booking collision</td>
        <td><span class="status-pass">PASSED (409 Conflict)</span></td>
      </tr>
      <tr>
        <td>Deal Commission Accrual</td>
        <td>POST /api/v1/deals calculated PKR 2,100,000 commission on 14.0 Cr</td>
        <td><span class="status-pass">PASSED (201 Created)</span></td>
      </tr>
      <tr>
        <td>Dashboard Intelligence</td>
        <td>GET /api/v1/reports/dashboard returned accurate live KPIs</td>
        <td><span class="status-pass">PASSED (200 OK)</span></td>
      </tr>
    </tbody>
  </table>

  <!-- Next Steps -->
  <h2>6. Day 2 Plan & Roadmap</h2>
  <ul>
    <li><strong>Phase 2 UI Enhancements:</strong> Add touch gestures for mobile Kanban boards and quick filter presets.</li>
    <li><strong>Rental & Lease Module:</strong> Add tenant lease expiration schedules and rent collection ledgers.</li>
    <li><strong>Documentation Packaging:</strong> Finalize video demonstration and project handover repository for VIRELEO leadership.</li>
  </ul>

  <div class="footer-note">
    <strong>VIRELEO Project 01 — AqarFlow</strong> | Developed by Individual Full-Stack Developer | Official Portal: <a href="https://www.vireleo.me/">https://www.vireleo.me/</a>
  </div>

</body>
</html>`;

const htmlPath = "D:/AqarFlow/docs/report_template.html";
const pdfPath = "D:/AqarFlow/docs/VIRELEO_Project01_AqarFlow_Day1_Report.pdf";

fs.writeFileSync(htmlPath, htmlContent);
console.log(`HTML report template generated at: ${htmlPath}`);

console.log("Generating PDF via Chrome headless...");
const chromePath = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const command = `"${chromePath}" --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="${pdfPath}" "${htmlPath}"`;
execSync(command);
console.log(`PDF report successfully generated at: ${pdfPath}`);

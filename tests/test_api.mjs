/**
 * AqarFlow API Integration Verification Script
 * Can be run against a running server: node tests/test_api.mjs [baseUrl]
 */

const BASE_URL = process.argv[2] || "http://localhost:3000";

console.log("==================================================");
console.log(`AQARFLOW INTEGRATION TEST RUNNER`);
console.log(`Target: ${BASE_URL}`);
console.log("==================================================");

let testsPassed = 0;
let testsFailed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    testsPassed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    testsFailed++;
  }
}

async function runTests() {
  try {
    // 1. Health check
    console.log("\n[1] Testing Health Endpoint:");
    const healthRes = await fetch(`${BASE_URL}/api/v1/health`);
    const health = await healthRes.json();
    assert(healthRes.status === 200, `Health status code 200`);
    assert(health.service === "AqarFlow Platform API", `Service verified: ${health.service}`);

    // 2. Public Properties
    console.log("\n[2] Testing Public Properties Endpoint:");
    const propsRes = await fetch(`${BASE_URL}/api/v1/public/properties?city=Islamabad`);
    const props = await propsRes.json();
    assert(propsRes.status === 200, `Properties status code 200`);
    assert(Array.isArray(props) && props.length > 0, `Returned ${props.length} Islamabad properties`);
    assert(props.every(p => p.city === "Islamabad"), `All returned properties belong to Islamabad`);

    // 3. Public Property Detail
    console.log("\n[3] Testing Property Detail By Slug:");
    const firstSlug = props[0].slug;
    const detailRes = await fetch(`${BASE_URL}/api/v1/public/properties/${firstSlug}`);
    const detail = await detailRes.json();
    assert(detailRes.status === 200, `Detail status code 200 for slug: ${firstSlug}`);
    assert(detail.title === props[0].title, `Property title matched: ${detail.title}`);

    // 4. Public Inquiry Creation
    console.log("\n[4] Testing Public Inquiry Creation:");
    const inquiryPayload = {
      property_id: detail.id,
      client_name: "Tariq Mehmood",
      phone: "+92 300 1234567",
      email: "tariq@test.com",
      preferred_contact_method: "WhatsApp",
      purpose: "Buy",
      notes: "Looking for viewing this weekend."
    };
    const inqRes = await fetch(`${BASE_URL}/api/v1/public/inquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inquiryPayload)
    });
    const inq = await inqRes.json();
    assert(inqRes.status === 201, `Inquiry created with HTTP 201`);
    assert(inq.client_name === inquiryPayload.client_name, `Client name stored: ${inq.client_name}`);
    assert(inq.stage === "New", `Lead entered stage 'New'`);

    // 5. Auth Login
    console.log("\n[5] Testing Staff Authentication:");
    const loginRes = await fetch(`${BASE_URL}/api/v1/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "admin@aqarflow.com", password: "Password123!" })
    });
    const auth = await loginRes.json();
    assert(loginRes.status === 200, `Admin login successful HTTP 200`);
    assert(auth.user?.role === "agency_admin", `User role is agency_admin`);
    const token = auth.access_token;

    // 6. Lead CRM Listing (Authenticated)
    console.log("\n[6] Testing CRM Leads List:");
    const leadsRes = await fetch(`${BASE_URL}/api/v1/leads`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const leads = await leadsRes.json();
    assert(leadsRes.status === 200, `Leads retrieved HTTP 200`);
    assert(Array.isArray(leads) && leads.length > 0, `Total active CRM leads: ${leads.length}`);

    // 7. Visit Scheduling with Conflict Prevention
    console.log("\n[7] Testing Visit Scheduler & Double-Booking Detection:");
    const visitDate = new Date(Date.now() + 48 * 3600000).toISOString();
    
    // Visit 1: Successful
    const v1Res = await fetch(`${BASE_URL}/api/v1/visits`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        property_id: detail.id,
        agent_id: "usr-agent-1", // Ayesha Khan
        client_name: "Hamza Abbasi",
        client_phone: "+92 321 5556677",
        scheduled_at: visitDate,
        notes: "Primary client site tour"
      })
    });
    assert(v1Res.status === 201, `Primary visit scheduled HTTP 201`);

    // Visit 2: 15 mins later with same agent -> Collision!
    const conflictDate = new Date(new Date(visitDate).getTime() + 15 * 60000).toISOString();
    const v2Res = await fetch(`${BASE_URL}/api/v1/visits`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        property_id: detail.id,
        agent_id: "usr-agent-1", // Same agent!
        client_name: "Bilal Farooq",
        client_phone: "+92 333 1112233",
        scheduled_at: conflictDate,
        notes: "Conflicting visit slot"
      })
    });
    assert(v2Res.status === 409, `Double-booking conflict correctly caught with HTTP 409 Conflict!`);
    const conflictJson = await v2Res.json();
    console.log(`    Message from server: "${conflictJson.message}"`);

    // 8. Deal Pipeline Creation
    console.log("\n[8] Testing Deal Creation & Commission Accrual:");
    const dealRes = await fetch(`${BASE_URL}/api/v1/deals`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        property_id: detail.id,
        client_name: "Tariq Mehmood",
        client_phone: "+92 300 1234567",
        agent_id: "usr-agent-1",
        stage: "Booking",
        offer_amount: 145000000,
        agreed_amount: 140000000,
        token_amount: 5000000,
        commission_rate: 1.5,
        notes: "Negotiated agreed amount of 14.0 Crore."
      })
    });
    const deal = await dealRes.json();
    assert(dealRes.status === 201, `Deal created HTTP 201`);
    assert(deal.commission_amount === 2100000, `Commission accurately computed: PKR 2,100,000 (got ${deal.commission_amount})`);

    // 9. Dashboard KPIs
    console.log("\n[9] Testing Dashboard Metrics:");
    const dashRes = await fetch(`${BASE_URL}/api/v1/reports/dashboard`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const dash = await dashRes.json();
    assert(dashRes.status === 200, `Dashboard metrics HTTP 200`);
    assert(dash.total_properties > 0, `Total properties: ${dash.total_properties}`);
    assert(dash.total_leads > 0, `Total leads: ${dash.total_leads}`);

    console.log("\n==================================================");
    console.log(`TEST SUMMARY: ${testsPassed + testsFailed} tests | PASSED: ${testsPassed} | FAILED: ${testsFailed}`);
    console.log("==================================================");
    if (testsFailed === 0) {
      console.log(">>> ALL INTEGRATION ENDPOINTS OPERATING FLAWLESSLY! <<<\n");
    }
  } catch (err) {
    console.error("Test execution error:", err);
  }
}

runTests();

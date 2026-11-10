import {
  Agency,
  User,
  Property,
  Lead,
  Activity,
  Visit,
  Deal,
  AuditLog,
  DashboardMetrics,
  Lease,
  RentPayment,
  MaintenanceRequest
} from "./types";

interface DBData {
  agency: Agency;
  users: User[];
  properties: Property[];
  leads: Lead[];
  activities: Activity[];
  visits: Visit[];
  deals: Deal[];
  auditLogs: AuditLog[];
  leases: Lease[];
  maintenanceRequests: MaintenanceRequest[];
}

const INITIAL_AGENCY: Agency = {
  id: "agency-001",
  name: "AqarFlow Real Estate & Asset Advisors",
  slug: "aqarflow-pakistan",
  logo_url: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=400&q=80",
  phone: "+92 51 280 4422",
  email: "info@aqarflow.com",
  address: "Suite 402, Executive Heights, Blue Area",
  city: "Islamabad",
  default_currency: "PKR",
  timezone: "Asia/Karachi",
  status: "active"
};

const INITIAL_USERS: User[] = [
  {
    id: "usr-admin",
    agency_id: "agency-001",
    full_name: "Salman Tariq",
    email: "admin@aqarflow.com",
    phone: "+92 300 8551234",
    role: "agency_admin",
    avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    status: "active",
    created_at: new Date(Date.now() - 30 * 86400000).toISOString()
  },
  {
    id: "usr-agent-1",
    agency_id: "agency-001",
    full_name: "Ayesha Khan",
    email: "ayesha@aqarflow.com",
    phone: "+92 321 4455667",
    role: "agent",
    avatar_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    status: "active",
    created_at: new Date(Date.now() - 25 * 86400000).toISOString()
  },
  {
    id: "usr-agent-2",
    agency_id: "agency-001",
    full_name: "Bilal Ahmed",
    email: "bilal@aqarflow.com",
    phone: "+92 333 5566778",
    role: "agent",
    avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    status: "active",
    created_at: new Date(Date.now() - 20 * 86400000).toISOString()
  }
];

const INITIAL_PROPERTIES: Property[] = [
  {
    id: "prop-1001",
    agency_id: "agency-001",
    reference_code: "AQ-1001",
    title: "1 Kanal Luxury Spanish Designer Villa",
    slug: "1-kanal-luxury-spanish-villa-dha-phase-6-lahore",
    purpose: "sale",
    category: "residential",
    property_type: "House",
    price: 95000000,
    currency: "PKR",
    area_value: 1,
    area_unit: "Kanal",
    bedrooms: 5,
    bathrooms: 6,
    address: "Sector L, Phase 6, DHA",
    city: "Lahore",
    locality: "DHA Phase 6",
    latitude: 31.4721,
    longitude: 74.4378,
    amenities: [
      "Solar Hybrid Inverter",
      "Swimming Pool",
      "Imported SMEG Kitchen",
      "Lush Lawn",
      "Servant Quarter",
      "Corner Plot",
      "Double Height Lobby"
    ],
    furnishing: "Semi-Furnished",
    construction_status: "Ready",
    possession_status: "Immediate",
    description:
      "Exquisite architect-designed 1 Kanal Spanish elevation bungalow in the most prestigious enclave of DHA Phase 6 Lahore. Featuring double-height ceiling lobby, Spanish imported tiles, Hansgrohe sanitary fittings, full solar backup, and master suite with walk-in closet.",
    cover_image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
    gallery_images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1000&q=80"
    ],
    status: "Available",
    is_featured: true,
    is_published: true,
    assigned_agent_id: "usr-agent-1",
    owner_name: "Chaudhry Tariq",
    owner_phone: "+92 300 1234567",
    created_at: new Date(Date.now() - 15 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 86400000).toISOString()
  },
  {
    id: "prop-1002",
    agency_id: "agency-001",
    reference_code: "AQ-1002",
    title: "10 Marla Brand New Modern House",
    slug: "10-marla-brand-new-modern-house-bahria-town-rawalpindi",
    purpose: "sale",
    category: "residential",
    property_type: "House",
    price: 34000000,
    currency: "PKR",
    area_value: 10,
    area_unit: "Marla",
    bedrooms: 4,
    bathrooms: 5,
    address: "Street 14, Sector C, Bahria Town Phase 8",
    city: "Rawalpindi",
    locality: "Bahria Town",
    latitude: 33.5186,
    longitude: 73.0827,
    amenities: [
      "Underground Wiring",
      "24/7 Security",
      "Italian Fixtures",
      "Fall Ceiling with LED",
      "Spacious Car Porch"
    ],
    furnishing: "Unfurnished",
    construction_status: "Ready",
    possession_status: "Immediate",
    description:
      "Brand new solid construction 10 Marla house built on high standards. Includes 4 master bedrooms with attached baths, 2 imported modular kitchens, powder room, drawing & dining, and terrace with panoramic view.",
    cover_image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
    gallery_images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=80"
    ],
    status: "Available",
    is_featured: true,
    is_published: true,
    assigned_agent_id: "usr-agent-2",
    owner_name: "Brigadier (R) Asad",
    owner_phone: "+92 333 9988776",
    created_at: new Date(Date.now() - 12 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 3 * 86400000).toISOString()
  },
  {
    id: "prop-1003",
    agency_id: "agency-001",
    reference_code: "AQ-1003",
    title: "Executive 2-Bed Suite with Margalla Hills View",
    slug: "executive-2-bed-centaurus-residencia-f8-islamabad",
    purpose: "sale",
    category: "residential",
    property_type: "Apartment",
    price: 42500000,
    currency: "PKR",
    area_value: 1750,
    area_unit: "Sq. Ft",
    bedrooms: 2,
    bathrooms: 3,
    address: "Tower B, The Centaurus, F-8/4",
    city: "Islamabad",
    locality: "Centaurus Residencia, F-8",
    latitude: 33.7077,
    longitude: 73.0498,
    amenities: [
      "Margalla Hills Facing",
      "Central Air Conditioning",
      "Dedicated Valet Parking",
      "Fitness Center & Spa",
      "Smart Card Access"
    ],
    furnishing: "Furnished",
    construction_status: "Ready",
    possession_status: "Immediate",
    description:
      "Ultra-luxurious 2-bedroom executive apartment located on the 18th floor of The Centaurus Islamabad. Enjoy breathtaking unobstructed views of the Margalla Hills. Turnkey interior with imported Italian furniture and designer lighting.",
    cover_image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    gallery_images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80"
    ],
    status: "Available",
    is_featured: true,
    is_published: true,
    assigned_agent_id: "usr-agent-1",
    owner_name: "Dr. Noman Qureshi",
    owner_phone: "+92 321 8877665",
    created_at: new Date(Date.now() - 10 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 86400000).toISOString()
  },
  {
    id: "prop-1004",
    agency_id: "agency-001",
    reference_code: "AQ-1004",
    title: "500 Sq. Yds Prime Commercial Plot on Main Boulevard",
    slug: "500-sq-yds-commercial-plot-sunset-boulevard-dha-karachi",
    purpose: "sale",
    category: "commercial",
    property_type: "Commercial Plot",
    price: 185000000,
    currency: "PKR",
    area_value: 500,
    area_unit: "Sq. Yd",
    bedrooms: 0,
    bathrooms: 0,
    address: "Main Sunset Boulevard, Phase 2 Commercial",
    city: "Karachi",
    locality: "DHA Phase 2",
    latitude: 24.8344,
    longitude: 67.0658,
    amenities: [
      "Corner Plot",
      "100-Ft Wide Road Frontage",
      "Commercial NOC Approved",
      "Ground + 4 Storey Approval",
      "High Footfall"
    ],
    furnishing: "Unfurnished",
    construction_status: "Ready",
    possession_status: "Immediate",
    description:
      "Extremely rare commercial opportunity on Main Sunset Boulevard, DHA Phase 2 Karachi. Ideal for flagship corporate headquarters, multi-tenant commercial plaza, or financial institution. Clean title with direct Cantonment Board transfer.",
    cover_image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    gallery_images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80"
    ],
    status: "Under Offer",
    is_featured: true,
    is_published: true,
    assigned_agent_id: "usr-agent-1",
    owner_name: "Yousaf Bawany",
    owner_phone: "+92 300 2233445",
    created_at: new Date(Date.now() - 8 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 86400000).toISOString()
  },
  {
    id: "prop-1005",
    agency_id: "agency-001",
    reference_code: "AQ-1005",
    title: "3-Bed Panoramic Seafront Penthouse",
    slug: "3-bed-panoramic-seafront-penthouse-crescent-bay-dha-karachi",
    purpose: "sale",
    category: "residential",
    property_type: "Penthouse",
    price: 78000000,
    currency: "PKR",
    area_value: 2650,
    area_unit: "Sq. Ft",
    bedrooms: 3,
    bathrooms: 4,
    address: "Coral Tower, Emaar Crescent Bay, Phase 8",
    city: "Karachi",
    locality: "DHA Phase 8",
    latitude: 24.7816,
    longitude: 67.0583,
    amenities: [
      "Arabian Sea Front View",
      "Infinity Edge Swimming Pool",
      "Private Elevators",
      "Barbecue Deck",
      "Covered Reserved Parking"
    ],
    furnishing: "Furnished",
    construction_status: "Ready",
    possession_status: "Immediate",
    description:
      "Live the pinnacle of coastal luxury at Emaar Crescent Bay. This premier duplex penthouse features double glass facades looking over the Arabian Sea, private rooftop terrace, designer German kitchen, and bespoke interiors.",
    cover_image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    gallery_images: [
      "https://images.unsplash.com/photo-1502005229762-ee152af92569?auto=format&fit=crop&w=1000&q=80"
    ],
    status: "Available",
    is_featured: false,
    is_published: true,
    assigned_agent_id: "usr-agent-2",
    owner_name: "Mrs. Shahina Farooq",
    owner_phone: "+92 301 7766554",
    created_at: new Date(Date.now() - 6 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 86400000).toISOString()
  },
  {
    id: "prop-1006",
    agency_id: "agency-001",
    reference_code: "AQ-1006",
    title: "5 Marla Brand New Modern Compact House",
    slug: "5-marla-brand-new-modern-house-park-view-lahore",
    purpose: "sale",
    category: "residential",
    property_type: "House",
    price: 18500000,
    currency: "PKR",
    area_value: 5,
    area_unit: "Marla",
    bedrooms: 3,
    bathrooms: 4,
    address: "Tulip Block, Park View City",
    city: "Lahore",
    locality: "Park View City",
    latitude: 31.425,
    longitude: 74.205,
    amenities: [
      "Gated Society",
      "Electricity & Gas Connected",
      "Near Commercial Market",
      "Parks & Mosque Nearby"
    ],
    furnishing: "Unfurnished",
    construction_status: "Ready",
    possession_status: "Immediate",
    description:
      "Affordable luxury 5 Marla ready-to-move house in the fast-growing Park View City Lahore. Ideal for nuclear families or rental investors with high rental yield.",
    cover_image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
    gallery_images: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80"
    ],
    status: "Available",
    is_featured: false,
    is_published: true,
    assigned_agent_id: "usr-agent-2",
    owner_name: "Mian Kashif",
    owner_phone: "+92 322 4433221",
    created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 86400000).toISOString()
  },
  {
    id: "prop-1007",
    agency_id: "agency-001",
    reference_code: "AQ-1007",
    title: "Fully Fitted 3,200 Sq. Ft Corporate Office Floor",
    slug: "fitted-corporate-office-blue-area-islamabad",
    purpose: "rent",
    category: "commercial",
    property_type: "Office",
    price: 350000,
    currency: "PKR",
    area_value: 3200,
    area_unit: "Sq. Ft",
    bedrooms: 0,
    bathrooms: 4,
    address: "Floor 5, ISE Towers, Jinnah Avenue, Blue Area",
    city: "Islamabad",
    locality: "Blue Area",
    latitude: 33.7142,
    longitude: 73.0645,
    amenities: [
      "High-Speed Elevators",
      "100% Power Generator Backup",
      "25 Workstations Fitted",
      "Conference Room",
      "Server Room"
    ],
    furnishing: "Furnished",
    construction_status: "Ready",
    possession_status: "Immediate",
    description:
      "Plug-and-play corporate office space in Islamabad's premier business district. Fully wired with CAT6 network cabling, glass executive cabins, boardroom with projector setup, and dedicated basement parking spots.",
    cover_image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
    gallery_images: [
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1000&q=80"
    ],
    status: "Available",
    is_featured: true,
    is_published: true,
    assigned_agent_id: "usr-agent-1",
    owner_name: "Al-Rehman Investments",
    owner_phone: "+92 51 280 9900",
    created_at: new Date(Date.now() - 4 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 86400000).toISOString()
  },
  {
    id: "prop-1008",
    agency_id: "agency-001",
    reference_code: "AQ-1008",
    title: "1 Kanal Developed Corner Plot in Executive Block",
    slug: "1-kanal-developed-corner-plot-gulberg-greens-islamabad",
    purpose: "sale",
    category: "plot",
    property_type: "Residential Plot",
    price: 26000000,
    currency: "PKR",
    area_value: 1,
    area_unit: "Kanal",
    bedrooms: 0,
    bathrooms: 0,
    address: "Plot # 184, Executive Block, Gulberg Greens",
    city: "Islamabad",
    locality: "Gulberg Greens",
    latitude: 33.6015,
    longitude: 73.1368,
    amenities: [
      "Corner Plot",
      "Park Facing",
      "All Dues Cleared",
      "Immediate Construction Allowed",
      "Wide Carpeted Boulevard"
    ],
    furnishing: "Unfurnished",
    construction_status: "Ready",
    possession_status: "Immediate",
    description:
      "Prime 1 Kanal residential plot located at an enviable corner location facing central park in Executive Block, Gulberg Greens Islamabad. Direct transfer, no litigation, ready for immediate foundation laying.",
    cover_image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    gallery_images: [],
    status: "Available",
    is_featured: false,
    is_published: true,
    assigned_agent_id: "usr-agent-2",
    owner_name: "Chaudhry Waseem",
    owner_phone: "+92 300 5544332",
    created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 86400000).toISOString()
  }
];

const INITIAL_ACTIVITIES: Activity[] = [
  {
    id: "act-1",
    agency_id: "agency-001",
    lead_id: "lead-1",
    user_id: "usr-agent-1",
    activity_type: "whatsapp",
    body: "Sent property brochure and video walkthrough on WhatsApp. Client confirmed receipt.",
    occurred_at: new Date(Date.now() - 2 * 86400000).toISOString()
  },
  {
    id: "act-2",
    agency_id: "agency-001",
    lead_id: "lead-2",
    user_id: "usr-agent-1",
    activity_type: "call",
    body: "Spoke on phone for 12 minutes. Clarified maintenance fees and Centaurus resident gym amenities.",
    occurred_at: new Date(Date.now() - 3 * 86400000).toISOString()
  },
  {
    id: "act-3",
    agency_id: "agency-001",
    lead_id: "lead-4",
    user_id: "usr-agent-1",
    activity_type: "meeting",
    body: "Met at Karachi Club with Mr. Hamza Sheikh and his legal counsel to review title documents.",
    occurred_at: new Date(Date.now() - 1 * 86400000).toISOString()
  }
];

const INITIAL_LEADS: Lead[] = [
  {
    id: "lead-1",
    agency_id: "agency-001",
    property_id: "prop-1001",
    client_name: "Farhan Malik",
    phone: "+92 300 9988771",
    email: "farhan.malik@lahoregroup.com",
    preferred_contact_method: "WhatsApp",
    purpose: "Buy",
    budget_min: 85000000,
    budget_max: 100000000,
    preferred_location: "DHA Phase 6, Lahore",
    property_type: "House",
    source: "Website",
    stage: "New",
    assigned_agent_id: "usr-agent-1",
    notes: "High net-worth textile industrialist interested in ready luxury bungalows in DHA Lahore.",
    next_follow_up_at: new Date(Date.now() + 1 * 86400000).toISOString(),
    created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    activities: [INITIAL_ACTIVITIES[0]]
  },
  {
    id: "lead-2",
    agency_id: "agency-001",
    property_id: "prop-1003",
    client_name: "Dr. Zainab Raza",
    phone: "+92 333 4455112",
    email: "zainab.raza@shifa.com.pk",
    preferred_contact_method: "Phone",
    purpose: "Buy",
    budget_min: 40000000,
    budget_max: 45000000,
    preferred_location: "F-8 / Centaurus, Islamabad",
    property_type: "Apartment",
    source: "Website",
    stage: "Qualified",
    assigned_agent_id: "usr-agent-1",
    notes: "Looking for a high-floor Margalla facing apartment for immediate family residence.",
    next_follow_up_at: new Date(Date.now() + 2 * 86400000).toISOString(),
    created_at: new Date(Date.now() - 4 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 3 * 86400000).toISOString(),
    activities: [INITIAL_ACTIVITIES[1]]
  },
  {
    id: "lead-3",
    agency_id: "agency-001",
    property_id: "prop-1006",
    client_name: "Tariq Mehmood",
    phone: "+92 321 8899001",
    email: "tariq.mehmood@gmail.com",
    preferred_contact_method: "WhatsApp",
    purpose: "Buy",
    budget_min: 18000000,
    budget_max: 20000000,
    preferred_location: "Park View City, Lahore",
    property_type: "House",
    source: "Walk-in",
    stage: "Visit Scheduled",
    assigned_agent_id: "usr-agent-2",
    notes: "Visited office on Sunday; looking to finalize 5 marla house with cash payment.",
    next_follow_up_at: new Date(Date.now() + 1 * 86400000).toISOString(),
    created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 86400000).toISOString(),
    activities: []
  },
  {
    id: "lead-4",
    agency_id: "agency-001",
    property_id: "prop-1004",
    client_name: "Hamza Sheikh",
    phone: "+92 300 7766550",
    email: "hamza@sheikhholding.pk",
    preferred_contact_method: "Phone",
    purpose: "Invest",
    budget_min: 170000000,
    budget_max: 190000000,
    preferred_location: "DHA Karachi",
    property_type: "Commercial Plot",
    source: "Referral",
    stage: "Negotiation",
    assigned_agent_id: "usr-agent-1",
    notes: "Made an initial offer of 18 Crore for Sunset Boulevard commercial plot. Counter offer in progress.",
    next_follow_up_at: new Date(Date.now() + 12 * 3600000).toISOString(),
    created_at: new Date(Date.now() - 7 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 86400000).toISOString(),
    activities: [INITIAL_ACTIVITIES[2]]
  },
  {
    id: "lead-5",
    agency_id: "agency-001",
    property_id: "prop-1007",
    client_name: "Sarah Aslam",
    phone: "+92 312 9988123",
    email: "sarah.a@techpulse.io",
    preferred_contact_method: "Email",
    purpose: "Rent",
    budget_min: 300000,
    budget_max: 360000,
    preferred_location: "Blue Area, Islamabad",
    property_type: "Office",
    source: "Portal",
    stage: "Contacted",
    assigned_agent_id: "usr-agent-2",
    notes: "Tech software house looking to relocate 30 developers from Rawalpindi to Islamabad Blue Area.",
    next_follow_up_at: new Date(Date.now() + 3 * 86400000).toISOString(),
    created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    activities: []
  }
];

const INITIAL_VISITS: Visit[] = [
  {
    id: "visit-1",
    agency_id: "agency-001",
    property_id: "prop-1001",
    lead_id: "lead-1",
    client_name: "Farhan Malik",
    client_phone: "+92 300 9988771",
    agent_id: "usr-agent-1",
    scheduled_at: new Date(Date.now() + 26 * 3600000).toISOString(),
    duration_minutes: 60,
    meeting_point: "DHA Phase 6 Main Commercial Roundabout",
    visitor_count: 3,
    status: "Confirmed",
    notes: "Client will visit with spouse and interior designer.",
    created_at: new Date(Date.now() - 2 * 86400000).toISOString()
  },
  {
    id: "visit-2",
    agency_id: "agency-001",
    property_id: "prop-1006",
    lead_id: "lead-3",
    client_name: "Tariq Mehmood",
    client_phone: "+92 321 8899001",
    agent_id: "usr-agent-2",
    scheduled_at: new Date(Date.now() + 48 * 3600000).toISOString(),
    duration_minutes: 45,
    meeting_point: "Park View City Main Gate 1",
    visitor_count: 2,
    status: "Requested",
    notes: "Checking sunlight orientation and room sizes.",
    created_at: new Date(Date.now() - 1 * 86400000).toISOString()
  }
];

const INITIAL_DEALS: Deal[] = [
  {
    id: "deal-1",
    agency_id: "agency-001",
    property_id: "prop-1004",
    lead_id: "lead-4",
    client_name: "Hamza Sheikh",
    client_phone: "+92 300 7766550",
    agent_id: "usr-agent-1",
    stage: "Booking",
    offer_amount: 180000000,
    agreed_amount: 182500000,
    token_amount: 5000000,
    commission_rate: 1.0,
    commission_amount: 1825000,
    expected_close_date: "2026-11-25",
    notes: "Token receipt of PKR 50 Lakh issued via pay order. Balance 20% due on sale agreement signing.",
    created_at: new Date(Date.now() - 4 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 86400000).toISOString()
  },
  {
    id: "deal-2",
    agency_id: "agency-001",
    property_id: "prop-1006",
    lead_id: "lead-3",
    client_name: "Tariq Mehmood",
    client_phone: "+92 321 8899001",
    agent_id: "usr-agent-2",
    stage: "Negotiation",
    offer_amount: 17800000,
    agreed_amount: 18200000,
    token_amount: 0,
    commission_rate: 1.0,
    commission_amount: 182000,
    expected_close_date: "2026-12-05",
    notes: "Buyer offered 1.78 Crore, seller asking 1.85 Crore. Bridge negotiation targeting 1.82 Crore.",
    created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 86400000).toISOString()
  }
];

const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: "audit-1",
    agency_id: "agency-001",
    actor_name: "Salman Tariq",
    actor_role: "agency_admin",
    action: "System Initialized",
    entity_type: "agency",
    entity_id: "agency-001",
    details: "AqarFlow Real Estate Management & Operations Workspace initialized with Pakistan-first defaults.",
    created_at: new Date(Date.now() - 10 * 86400000).toISOString()
  },
  {
    id: "audit-2",
    agency_id: "agency-001",
    actor_name: "Salman Tariq",
    actor_role: "agency_admin",
    action: "Property Published",
    entity_type: "property",
    entity_id: "prop-1001",
    details: "Published 1 Kanal Luxury Spanish Designer Villa (AQ-1001) to public portal.",
    created_at: new Date(Date.now() - 8 * 86400000).toISOString()
  },
  {
    id: "audit-3",
    agency_id: "agency-001",
    actor_name: "Ayesha Khan",
    actor_role: "agent",
    action: "Deal Advanced",
    entity_type: "deal",
    entity_id: "deal-1",
    details: "Moved deal with Hamza Sheikh to Booking stage with PKR 50 Lakh token deposit.",
    created_at: new Date(Date.now() - 1 * 86400000).toISOString()
  }
];

const INITIAL_LEASES: Lease[] = [
  {
    id: "lease-101",
    agency_id: "agency-001",
    property_id: "prop-1002",
    property_title: "Executive 2-Bed Suite with Margalla Hills View",
    property_code: "AQ-1002",
    unit_number: "Tower B, Suite 1404",
    tenant_name: "Brig. (R) Tariq Mansoor",
    tenant_phone: "+92 300 9876543",
    tenant_email: "tariq.mansoor@example.com",
    tenant_cnic: "37405-1234567-1",
    landlord_name: "Malik Jahangir",
    landlord_phone: "+92 321 8887766",
    start_date: "2026-01-01",
    end_date: "2026-12-31",
    rent_amount_pkr: 450000,
    security_deposit_pkr: 900000,
    payment_frequency: "Monthly",
    status: "Active",
    terms_notes: "Includes 2 covered basement parking slots and building gym membership. Maintenance fee included in rent.",
    created_at: new Date(Date.now() - 40 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 5 * 86400000).toISOString(),
    rent_schedule: [
      { id: "rp-1", lease_id: "lease-101", due_date: "2026-01-01", amount_pkr: 450000, status: "Paid", paid_date: "2026-01-02", payment_method: "Bank Transfer", receipt_number: "REC-2026-0101" },
      { id: "rp-2", lease_id: "lease-101", due_date: "2026-02-01", amount_pkr: 450000, status: "Paid", paid_date: "2026-02-01", payment_method: "Bank Transfer", receipt_number: "REC-2026-0201" },
      { id: "rp-3", lease_id: "lease-101", due_date: "2026-03-01", amount_pkr: 450000, status: "Paid", paid_date: "2026-03-02", payment_method: "Pay Order", receipt_number: "REC-2026-0301" },
      { id: "rp-4", lease_id: "lease-101", due_date: "2026-04-01", amount_pkr: 450000, status: "Pending" },
      { id: "rp-5", lease_id: "lease-101", due_date: "2026-05-01", amount_pkr: 450000, status: "Pending" }
    ]
  },
  {
    id: "lease-102",
    agency_id: "agency-001",
    property_id: "prop-1004",
    property_title: "Full Floor Corporate Office in Blue Area",
    property_code: "AQ-1004",
    unit_number: "Level 7 (West Wing)",
    tenant_name: "NexGen Fintech Solutions (CEO: Daniyal Raza)",
    tenant_phone: "+92 333 4455667",
    tenant_email: "daniyal@nexgen.pk",
    tenant_cnic: "61101-9988776-5",
    landlord_name: "Capital Real Estate Holdings",
    landlord_phone: "+92 51 2233445",
    start_date: "2025-06-01",
    end_date: "2027-05-31",
    rent_amount_pkr: 1200000,
    security_deposit_pkr: 3600000,
    payment_frequency: "Monthly",
    status: "Active",
    terms_notes: "3-year corporate lease agreement. Standard 10% annual escalation after 12 months. Dedicated 50kVA generator backup.",
    created_at: new Date(Date.now() - 90 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    rent_schedule: [
      { id: "rp-10", lease_id: "lease-102", due_date: "2026-01-01", amount_pkr: 1200000, status: "Paid", paid_date: "2026-01-05", payment_method: "Crossed Cheque", receipt_number: "REC-2026-0145" },
      { id: "rp-11", lease_id: "lease-102", due_date: "2026-02-01", amount_pkr: 1200000, status: "Paid", paid_date: "2026-02-03", payment_method: "Crossed Cheque", receipt_number: "REC-2026-0288" },
      { id: "rp-12", lease_id: "lease-102", due_date: "2026-03-01", amount_pkr: 1200000, status: "Paid", paid_date: "2026-03-04", payment_method: "Crossed Cheque", receipt_number: "REC-2026-0341" },
      { id: "rp-13", lease_id: "lease-102", due_date: "2026-04-01", amount_pkr: 1200000, status: "Overdue", notes: "Payment delayed awaiting board cheque signature. Followed up on 5th." }
    ]
  },
  {
    id: "lease-103",
    agency_id: "agency-001",
    property_id: "prop-1006",
    property_title: "Luxury 3-Bed Clifton Sea View Apartment",
    property_code: "AQ-1006",
    unit_number: "Sea View Heights, Apt 8-A",
    tenant_name: "Dr. Samina Alvi",
    tenant_phone: "+92 321 5566778",
    tenant_email: "samina.alvi@example.com",
    tenant_cnic: "42301-4455667-2",
    landlord_name: "Shahid Memon",
    landlord_phone: "+92 300 2211445",
    start_date: "2025-11-01",
    end_date: "2026-10-31",
    rent_amount_pkr: 320000,
    security_deposit_pkr: 640000,
    payment_frequency: "Monthly",
    status: "Active",
    terms_notes: "Furnished apartment including Italian kitchen appliances and sea-facing balcony.",
    created_at: new Date(Date.now() - 60 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 10 * 86400000).toISOString(),
    rent_schedule: [
      { id: "rp-20", lease_id: "lease-103", due_date: "2026-01-01", amount_pkr: 320000, status: "Paid", paid_date: "2026-01-02", payment_method: "Online Banking", receipt_number: "REC-2026-0112" },
      { id: "rp-21", lease_id: "lease-103", due_date: "2026-02-01", amount_pkr: 320000, status: "Paid", paid_date: "2026-02-02", payment_method: "Online Banking", receipt_number: "REC-2026-0219" },
      { id: "rp-22", lease_id: "lease-103", due_date: "2026-03-01", amount_pkr: 320000, status: "Paid", paid_date: "2026-03-03", payment_method: "Online Banking", receipt_number: "REC-2026-0322" },
      { id: "rp-23", lease_id: "lease-103", due_date: "2026-04-01", amount_pkr: 320000, status: "Pending" }
    ]
  }
];

const INITIAL_MAINTENANCE_REQUESTS: MaintenanceRequest[] = [
  {
    id: "maint-101",
    ticket_number: "TKT-2026-001",
    agency_id: "agency-001",
    property_id: "prop-1002",
    property_title: "Executive 2-Bed Suite with Margalla Hills View",
    unit_number: "Tower B, Suite 1404",
    reported_by: "Brig. (R) Tariq Mansoor (Tenant)",
    reporter_phone: "+92 300 9876543",
    priority: "High",
    category: "HVAC",
    description: "Master bedroom 2-ton inverter AC showing error E4 (low gas/sensor trip). Requires certified Daikin technician.",
    status: "In Progress",
    contractor_name: "Al-Rehman Climate Systems (Rashid Mehmood)",
    contractor_phone: "+92 333 5123456",
    estimated_cost_pkr: 24000,
    created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    scheduled_date: new Date(Date.now() + 1 * 86400000).toISOString(),
    notes: "Contractor scheduled inspection for tomorrow 11:00 AM."
  },
  {
    id: "maint-102",
    ticket_number: "TKT-2026-002",
    agency_id: "agency-001",
    property_id: "prop-1004",
    property_title: "Full Floor Corporate Office in Blue Area",
    unit_number: "Level 7 (West Wing)",
    reported_by: "Daniyal Raza (Facility Manager)",
    reporter_phone: "+92 333 4455667",
    priority: "Emergency",
    category: "Electrical",
    description: "Main distribution board breaker tripping intermittently on west wing workstation circuit.",
    status: "Reported",
    contractor_name: "Capital Electro Solutions",
    contractor_phone: "+92 321 8877665",
    estimated_cost_pkr: 45000,
    created_at: new Date(Date.now() - 4 * 3600000).toISOString(),
    notes: "Emergency call logged. Awaiting site supervisor arrival."
  },
  {
    id: "maint-103",
    ticket_number: "TKT-2026-003",
    agency_id: "agency-001",
    property_id: "prop-1006",
    property_title: "Luxury 3-Bed Clifton Sea View Apartment",
    unit_number: "Sea View Heights, Apt 8-A",
    reported_by: "Dr. Samina Alvi (Tenant)",
    reporter_phone: "+92 321 5566778",
    priority: "Medium",
    category: "Plumbing",
    description: "Kitchen sink drain trap leaking into cabinet; new CPVC pipe fitting installed and sealed.",
    status: "Resolved",
    contractor_name: "Khyber Sanitary Services",
    contractor_phone: "+92 300 3344556",
    estimated_cost_pkr: 8500,
    actual_cost_pkr: 8200,
    created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
    resolved_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    notes: "Completed and tested. Signed off by tenant."
  },
  {
    id: "maint-104",
    ticket_number: "TKT-2026-004",
    agency_id: "agency-001",
    property_id: "prop-1001",
    property_title: "1 Kanal Luxury Spanish Designer Villa",
    unit_number: "Main House",
    reported_by: "Salman Tariq (Agent)",
    reporter_phone: "+92 300 8551234",
    priority: "Low",
    category: "Paint & Masonry",
    description: "Boundary wall exterior paint touchup post-rain season on rear lawn perimeter.",
    status: "Assigned",
    contractor_name: "Lahore Master Painters",
    contractor_phone: "+92 322 4455667",
    estimated_cost_pkr: 65000,
    created_at: new Date(Date.now() - 1 * 86400000).toISOString(),
    notes: "Work order approved by owner. Materials to be delivered Friday."
  }
];

// Singleton in-memory database
let memoryDB: DBData | null = null;

function loadDB(): DBData {
  if (memoryDB) return memoryDB;

  memoryDB = {
    agency: INITIAL_AGENCY,
    users: [...INITIAL_USERS],
    properties: [...INITIAL_PROPERTIES],
    leads: [...INITIAL_LEADS],
    activities: [...INITIAL_ACTIVITIES],
    visits: [...INITIAL_VISITS],
    deals: [...INITIAL_DEALS],
    auditLogs: [...INITIAL_AUDIT_LOGS],
    leases: [...INITIAL_LEASES],
    maintenanceRequests: [...INITIAL_MAINTENANCE_REQUESTS]
  };

  return memoryDB;
}

export const db = {
  getAgency: (): Agency => {
    return loadDB().agency;
  },

  updateAgency: (data: Partial<Agency>, actor: User): Agency => {
    const database = loadDB();
    database.agency = { ...database.agency, ...data };
    database.auditLogs.unshift({
      id: `audit-${Date.now()}`,
      agency_id: database.agency.id,
      actor_name: actor.full_name,
      actor_role: actor.role,
      action: "Agency Settings Updated",
      entity_type: "agency",
      entity_id: database.agency.id,
      details: "Updated agency profile and configuration settings.",
      created_at: new Date().toISOString()
    });
    return database.agency;
  },

  getUsers: (): User[] => {
    return loadDB().users;
  },

  getUserById: (id: string): User | undefined => {
    return loadDB().users.find((u) => u.id === id);
  },

  authenticateUser: (email: string, pass: string): User | null => {
    const user = loadDB().users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (user && user.status === "active") {
      return user;
    }
    return null;
  },

  inviteAgent: (data: { full_name: string; email: string; phone?: string; role?: "agent" | "agency_admin" }, actor: User): User => {
    const database = loadDB();
    const newUser: User = {
      id: `usr-${Date.now()}`,
      agency_id: database.agency.id,
      full_name: data.full_name,
      email: data.email,
      phone: data.phone || "+92 300 0000000",
      role: data.role || "agent",
      avatar_url: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80`,
      status: "active",
      created_at: new Date().toISOString()
    };
    database.users.push(newUser);
    database.auditLogs.unshift({
      id: `audit-${Date.now()}`,
      agency_id: database.agency.id,
      actor_name: actor.full_name,
      actor_role: actor.role,
      action: "Agent Added",
      entity_type: "user",
      entity_id: newUser.id,
      details: `Added new staff member ${newUser.full_name} (${newUser.role}).`,
      created_at: new Date().toISOString()
    });
    return newUser;
  },

  getProperties: (filters?: {
    purpose?: string;
    city?: string;
    locality?: string;
    property_type?: string;
    min_price?: number;
    max_price?: number;
    bedrooms?: number;
    status?: string;
    is_featured?: boolean;
    search?: string;
    publicOnly?: boolean;
  }): Property[] => {
    const database = loadDB();
    return database.properties
      .filter((p) => {
        if (filters?.publicOnly && (!p.is_published || !["Available", "Reserved", "Under Offer"].includes(p.status))) {
          return false;
        }
        if (filters?.status && p.status !== filters.status) return false;
        if (filters?.purpose && p.purpose.toLowerCase() !== filters.purpose.toLowerCase()) return false;
        if (filters?.city && p.city.toLowerCase() !== filters.city.toLowerCase()) return false;
        if (filters?.locality && !p.locality.toLowerCase().includes(filters.locality.toLowerCase())) return false;
        if (filters?.property_type && p.property_type.toLowerCase() !== filters.property_type.toLowerCase()) return false;
        if (filters?.min_price !== undefined && p.price < filters.min_price) return false;
        if (filters?.max_price !== undefined && p.price > filters.max_price) return false;
        if (filters?.bedrooms !== undefined && (p.bedrooms || 0) < filters.bedrooms) return false;
        if (filters?.is_featured !== undefined && p.is_featured !== filters.is_featured) return false;
        if (filters?.search) {
          const s = filters.search.toLowerCase();
          const match =
            p.title.toLowerCase().includes(s) ||
            p.reference_code.toLowerCase().includes(s) ||
            p.locality.toLowerCase().includes(s) ||
            p.city.toLowerCase().includes(s) ||
            (p.description && p.description.toLowerCase().includes(s));
          if (!match) return false;
        }
        return true;
      })
      .map((p) => ({
        ...p,
        assigned_agent: database.users.find((u) => u.id === p.assigned_agent_id)
      }));
  },

  getPropertyById: (id: string): Property | undefined => {
    const database = loadDB();
    const p = database.properties.find((item) => item.id === id);
    if (!p) return undefined;
    return {
      ...p,
      assigned_agent: database.users.find((u) => u.id === p.assigned_agent_id)
    };
  },

  getPropertyBySlug: (slug: string): Property | undefined => {
    const database = loadDB();
    const p = database.properties.find((item) => item.slug === slug);
    if (!p) return undefined;
    return {
      ...p,
      assigned_agent: database.users.find((u) => u.id === p.assigned_agent_id)
    };
  },

  createProperty: (data: Omit<Property, "id" | "agency_id" | "reference_code" | "slug" | "created_at" | "updated_at">, actor: User): Property => {
    const database = loadDB();
    const refCount = database.properties.length + 1001;
    const ref_code = `AQ-${refCount}`;
    const slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") + `-${Math.random().toString(36).substring(2, 7)}`;

    const newProp: Property = {
      ...data,
      id: `prop-${Date.now()}`,
      agency_id: database.agency.id,
      reference_code: ref_code,
      slug,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    database.properties.unshift(newProp);
    database.auditLogs.unshift({
      id: `audit-${Date.now()}`,
      agency_id: database.agency.id,
      actor_name: actor.full_name,
      actor_role: actor.role,
      action: "Property Created",
      entity_type: "property",
      entity_id: newProp.id,
      details: `Created property '${newProp.title}' (${newProp.reference_code}) with price ${newProp.currency} ${newProp.price.toLocaleString()}.`,
      created_at: new Date().toISOString()
    });

    return {
      ...newProp,
      assigned_agent: database.users.find((u) => u.id === newProp.assigned_agent_id)
    };
  },

  updateProperty: (id: string, data: Partial<Property>, actor: User): Property => {
    const database = loadDB();
    const idx = database.properties.findIndex((p) => p.id === id);
    if (idx === -1) throw new Error("Property not found");

    const updated = {
      ...database.properties[idx],
      ...data,
      updated_at: new Date().toISOString()
    };
    database.properties[idx] = updated;

    database.auditLogs.unshift({
      id: `audit-${Date.now()}`,
      agency_id: database.agency.id,
      actor_name: actor.full_name,
      actor_role: actor.role,
      action: "Property Updated",
      entity_type: "property",
      entity_id: updated.id,
      details: `Updated property '${updated.title}' (${updated.reference_code}).`,
      created_at: new Date().toISOString()
    });

    return {
      ...updated,
      assigned_agent: database.users.find((u) => u.id === updated.assigned_agent_id)
    };
  },

  deleteProperty: (id: string, actor: User): boolean => {
    const database = loadDB();
    const prop = database.properties.find((p) => p.id === id);
    if (!prop) return false;

    prop.status = "Inactive";
    prop.is_published = false;
    prop.updated_at = new Date().toISOString();

    database.auditLogs.unshift({
      id: `audit-${Date.now()}`,
      agency_id: database.agency.id,
      actor_name: actor.full_name,
      actor_role: actor.role,
      action: "Property Archived",
      entity_type: "property",
      entity_id: prop.id,
      details: `Archived property '${prop.title}' (${prop.reference_code}).`,
      created_at: new Date().toISOString()
    });

    return true;
  },

  getLeads: (user: User, filters?: { stage?: string; search?: string }): Lead[] => {
    const database = loadDB();
    return database.leads
      .filter((lead) => {
        if (user.role === "agent" && lead.assigned_agent_id && lead.assigned_agent_id !== user.id) {
          return false;
        }
        if (filters?.stage && lead.stage !== filters.stage) return false;
        if (filters?.search) {
          const s = filters.search.toLowerCase();
          const match =
            lead.client_name.toLowerCase().includes(s) ||
            lead.phone.toLowerCase().includes(s) ||
            (lead.email && lead.email.toLowerCase().includes(s)) ||
            (lead.preferred_location && lead.preferred_location.toLowerCase().includes(s));
          if (!match) return false;
        }
        return true;
      })
      .map((lead) => ({
        ...lead,
        property: database.properties.find((p) => p.id === lead.property_id),
        assigned_agent: database.users.find((u) => u.id === lead.assigned_agent_id),
        activities: database.activities.filter((a) => a.lead_id === lead.id)
      }));
  },

  getLeadById: (id: string): Lead | undefined => {
    const database = loadDB();
    const lead = database.leads.find((l) => l.id === id);
    if (!lead) return undefined;
    return {
      ...lead,
      property: database.properties.find((p) => p.id === lead.property_id),
      assigned_agent: database.users.find((u) => u.id === lead.assigned_agent_id),
      activities: database.activities.filter((a) => a.lead_id === lead.id)
    };
  },

  createLead: (data: Omit<Lead, "id" | "agency_id" | "created_at" | "updated_at" | "activities">, actor?: User): Lead => {
    const database = loadDB();
    const newLead: Lead = {
      ...data,
      id: `lead-${Date.now()}`,
      agency_id: database.agency.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      activities: []
    };

    database.leads.unshift(newLead);

    if (data.notes) {
      const act: Activity = {
        id: `act-${Date.now()}`,
        agency_id: database.agency.id,
        lead_id: newLead.id,
        user_id: actor?.id,
        activity_type: "note",
        body: `Initial inquiry note: ${data.notes}`,
        occurred_at: new Date().toISOString()
      };
      database.activities.unshift(act);
      newLead.activities.push(act);
    }

    database.auditLogs.unshift({
      id: `audit-${Date.now()}`,
      agency_id: database.agency.id,
      actor_name: actor ? actor.full_name : newLead.client_name,
      actor_role: actor ? actor.role : "visitor",
      action: "Lead Created",
      entity_type: "lead",
      entity_id: newLead.id,
      details: `Lead created for ${newLead.client_name} (${newLead.phone}) from source ${newLead.source}.`,
      created_at: new Date().toISOString()
    });

    return {
      ...newLead,
      property: database.properties.find((p) => p.id === newLead.property_id),
      assigned_agent: database.users.find((u) => u.id === newLead.assigned_agent_id)
    };
  },

  updateLead: (id: string, data: Partial<Lead>, actor: User): Lead => {
    const database = loadDB();
    const idx = database.leads.findIndex((l) => l.id === id);
    if (idx === -1) throw new Error("Lead not found");

    const oldStage = database.leads[idx].stage;
    const updated = {
      ...database.leads[idx],
      ...data,
      updated_at: new Date().toISOString()
    };
    database.leads[idx] = updated;

    if (data.stage && data.stage !== oldStage) {
      const act: Activity = {
        id: `act-${Date.now()}`,
        agency_id: database.agency.id,
        lead_id: updated.id,
        user_id: actor.id,
        activity_type: "stage_change",
        body: `Stage updated from '${oldStage}' to '${data.stage}' by ${actor.full_name}.`,
        occurred_at: new Date().toISOString()
      };
      database.activities.unshift(act);
    }

    database.auditLogs.unshift({
      id: `audit-${Date.now()}`,
      agency_id: database.agency.id,
      actor_name: actor.full_name,
      actor_role: actor.role,
      action: "Lead Updated",
      entity_type: "lead",
      entity_id: updated.id,
      details: `Updated lead ${updated.client_name}.`,
      created_at: new Date().toISOString()
    });

    return {
      ...updated,
      property: database.properties.find((p) => p.id === updated.property_id),
      assigned_agent: database.users.find((u) => u.id === updated.assigned_agent_id),
      activities: database.activities.filter((a) => a.lead_id === updated.id)
    };
  },

  assignLead: (id: string, agentId: string, actor: User): Lead => {
    const database = loadDB();
    const lead = database.leads.find((l) => l.id === id);
    if (!lead) throw new Error("Lead not found");
    const agent = database.users.find((u) => u.id === agentId);
    if (!agent) throw new Error("Agent not found");

    const oldAgent = database.users.find((u) => u.id === lead.assigned_agent_id)?.full_name || "Unassigned";
    lead.assigned_agent_id = agent.id;
    lead.updated_at = new Date().toISOString();

    const act: Activity = {
      id: `act-${Date.now()}`,
      agency_id: database.agency.id,
      lead_id: lead.id,
      user_id: actor.id,
      activity_type: "note",
      body: `Lead reassigned from ${oldAgent} to ${agent.full_name} by ${actor.full_name}.`,
      occurred_at: new Date().toISOString()
    };
    database.activities.unshift(act);

    database.auditLogs.unshift({
      id: `audit-${Date.now()}`,
      agency_id: database.agency.id,
      actor_name: actor.full_name,
      actor_role: actor.role,
      action: "Lead Assigned",
      entity_type: "lead",
      entity_id: lead.id,
      details: `Assigned lead ${lead.client_name} to ${agent.full_name}.`,
      created_at: new Date().toISOString()
    });

    return {
      ...lead,
      property: database.properties.find((p) => p.id === lead.property_id),
      assigned_agent: agent,
      activities: database.activities.filter((a) => a.lead_id === lead.id)
    };
  },

  addLeadActivity: (leadId: string, data: { activity_type: Activity["activity_type"]; body: string }, actor: User): Activity => {
    const database = loadDB();
    const lead = database.leads.find((l) => l.id === leadId);
    if (!lead) throw new Error("Lead not found");

    const act: Activity = {
      id: `act-${Date.now()}`,
      agency_id: database.agency.id,
      lead_id: leadId,
      user_id: actor.id,
      activity_type: data.activity_type,
      body: data.body,
      occurred_at: new Date().toISOString()
    };
    database.activities.unshift(act);
    lead.updated_at = new Date().toISOString();

    return act;
  },

  getVisits: (user: User, filters?: { status?: string; property_id?: string }): Visit[] => {
    const database = loadDB();
    return database.visits
      .filter((v) => {
        if (user.role === "agent" && v.agent_id !== user.id) return false;
        if (filters?.status && v.status !== filters.status) return false;
        if (filters?.property_id && v.property_id !== filters.property_id) return false;
        return true;
      })
      .map((v) => ({
        ...v,
        property: database.properties.find((p) => p.id === v.property_id),
        agent: database.users.find((u) => u.id === v.agent_id)
      }));
  },

  createVisit: (
    data: Omit<Visit, "id" | "agency_id" | "created_at">,
    actor: User,
    ignoreConflict: boolean = false
  ): { visit?: Visit; conflict?: { message: string; conflicting_visit: Visit } } => {
    const database = loadDB();
    const prop = database.properties.find((p) => p.id === data.property_id);
    if (!prop) throw new Error("Property not found");

    const visitStart = new Date(data.scheduled_at).getTime();
    const durationMs = (data.duration_minutes || 45) * 60 * 1000;
    const visitEnd = visitStart + durationMs;

    const conflicts = database.visits.filter((ev) => {
      if (ev.agent_id !== data.agent_id) return false;
      if (!["Requested", "Confirmed"].includes(ev.status)) return false;

      const evStart = new Date(ev.scheduled_at).getTime();
      const evEnd = evStart + (ev.duration_minutes || 45) * 60 * 1000;

      return visitStart < evEnd && visitEnd > evStart;
    });

    if (conflicts.length > 0 && !ignoreConflict) {
      const conflicting = conflicts[0];
      return {
        conflict: {
          message: `Agent ${database.users.find((u) => u.id === data.agent_id)?.full_name} already has a scheduled visit at ${new Date(conflicting.scheduled_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} with ${conflicting.client_name}.`,
          conflicting_visit: conflicting
        }
      };
    }

    const newVisit: Visit = {
      ...data,
      status: data.status || "Confirmed",
      duration_minutes: data.duration_minutes || 45,
      visitor_count: data.visitor_count || 1,
      id: `visit-${Date.now()}`,
      agency_id: database.agency.id,
      created_at: new Date().toISOString()
    };

    database.visits.unshift(newVisit);

    database.auditLogs.unshift({
      id: `audit-${Date.now()}`,
      agency_id: database.agency.id,
      actor_name: actor.full_name,
      actor_role: actor.role,
      action: "Visit Scheduled",
      entity_type: "visit",
      entity_id: newVisit.id,
      details: `Scheduled visit for property '${prop.title}' with ${newVisit.client_name} at ${new Date(newVisit.scheduled_at).toLocaleString()}.`,
      created_at: new Date().toISOString()
    });

    return {
      visit: {
        ...newVisit,
        property: prop,
        agent: database.users.find((u) => u.id === newVisit.agent_id)
      }
    };
  },

  updateVisit: (id: string, data: Partial<Visit>, actor: User): Visit => {
    const database = loadDB();
    const idx = database.visits.findIndex((v) => v.id === id);
    if (idx === -1) throw new Error("Visit not found");

    const updated = { ...database.visits[idx], ...data };
    database.visits[idx] = updated;

    database.auditLogs.unshift({
      id: `audit-${Date.now()}`,
      agency_id: database.agency.id,
      actor_name: actor.full_name,
      actor_role: actor.role,
      action: "Visit Updated",
      entity_type: "visit",
      entity_id: updated.id,
      details: `Updated visit status to ${updated.status} for ${updated.client_name}.`,
      created_at: new Date().toISOString()
    });

    return {
      ...updated,
      property: database.properties.find((p) => p.id === updated.property_id),
      agent: database.users.find((u) => u.id === updated.agent_id)
    };
  },

  getDeals: (user: User, filters?: { stage?: string }): Deal[] => {
    const database = loadDB();
    return database.deals
      .filter((d) => {
        if (user.role === "agent" && d.agent_id !== user.id) return false;
        if (filters?.stage && d.stage !== filters.stage) return false;
        return true;
      })
      .map((d) => ({
        ...d,
        property: database.properties.find((p) => p.id === d.property_id),
        agent: database.users.find((u) => u.id === d.agent_id)
      }));
  },

  createDeal: (data: Omit<Deal, "id" | "agency_id" | "created_at" | "updated_at">, actor: User): Deal => {
    const database = loadDB();
    const prop = database.properties.find((p) => p.id === data.property_id);
    if (!prop) throw new Error("Property not found");

    const commission_amount =
      data.commission_amount || (data.agreed_amount * (data.commission_rate || 1.0)) / 100;

    const newDeal: Deal = {
      ...data,
      id: `deal-${Date.now()}`,
      agency_id: database.agency.id,
      commission_amount,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    database.deals.unshift(newDeal);

    database.auditLogs.unshift({
      id: `audit-${Date.now()}`,
      agency_id: database.agency.id,
      actor_name: actor.full_name,
      actor_role: actor.role,
      action: "Deal Created",
      entity_type: "deal",
      entity_id: newDeal.id,
      details: `Created deal for '${prop.title}' with ${newDeal.client_name} (Agreed: PKR ${newDeal.agreed_amount.toLocaleString()}).`,
      created_at: new Date().toISOString()
    });

    return {
      ...newDeal,
      property: prop,
      agent: database.users.find((u) => u.id === newDeal.agent_id)
    };
  },

  updateDeal: (id: string, data: Partial<Deal>, actor: User): Deal => {
    const database = loadDB();
    const idx = database.deals.findIndex((d) => d.id === id);
    if (idx === -1) throw new Error("Deal not found");

    const current = database.deals[idx];
    const agreed = data.agreed_amount !== undefined ? data.agreed_amount : current.agreed_amount;
    const rate = data.commission_rate !== undefined ? data.commission_rate : current.commission_rate;
    const commission = (agreed * rate) / 100;

    const updated = {
      ...current,
      ...data,
      commission_amount: commission,
      updated_at: new Date().toISOString()
    };
    database.deals[idx] = updated;

    if (data.stage === "Booking") {
      const p = database.properties.find((prop) => prop.id === updated.property_id);
      if (p) p.status = "Reserved";
    } else if (data.stage === "Closed Won") {
      const p = database.properties.find((prop) => prop.id === updated.property_id);
      if (p) {
        p.status = p.purpose === "sale" ? "Sold" : "Rented";
        p.is_published = false;
      }
    }

    database.auditLogs.unshift({
      id: `audit-${Date.now()}`,
      agency_id: database.agency.id,
      actor_name: actor.full_name,
      actor_role: actor.role,
      action: "Deal Updated",
      entity_type: "deal",
      entity_id: updated.id,
      details: `Advanced deal to stage '${updated.stage}' (Agreed: PKR ${updated.agreed_amount.toLocaleString()}).`,
      created_at: new Date().toISOString()
    });

    return {
      ...updated,
      property: database.properties.find((p) => p.id === updated.property_id),
      agent: database.users.find((u) => u.id === updated.agent_id)
    };
  },

  getAgentsWithStats: (): Array<User & { active_properties_count: number; active_leads_count: number; closed_deals_count: number }> => {
    const database = loadDB();
    return database.users.map((u) => {
      const activeProps = database.properties.filter((p) => p.assigned_agent_id === u.id && p.status === "Available").length;
      const activeLeads = database.leads.filter((l) => l.assigned_agent_id === u.id && l.stage !== "Lost").length;
      const closedDeals = database.deals.filter((d) => d.agent_id === u.id && d.stage === "Closed Won").length;
      return {
        ...u,
        active_properties_count: activeProps,
        active_leads_count: activeLeads,
        closed_deals_count: closedDeals
      };
    });
  },

  getDashboardMetrics: (user: User): DashboardMetrics => {
    const database = loadDB();
    const props = database.properties;
    const leads = database.leads;
    const visits = database.visits;
    const deals = database.deals;

    const availableProps = props.filter((p) => p.status === "Available").length;
    const newLeads = leads.filter((l) => l.stage === "New").length;
    const convertedLeads = leads.filter((l) => l.stage === "Converted").length;
    const convRate = leads.length > 0 ? Math.round((convertedLeads / leads.length) * 100) : 0;

    const scheduledVisits = visits.filter((v) => ["Requested", "Confirmed"].includes(v.status)).length;
    const activeDeals = deals.filter((d) => !["Closed Won", "Closed Lost"].includes(d.stage)).length;
    const pipelineValue = deals
      .filter((d) => d.stage !== "Closed Lost")
      .reduce((sum, d) => sum + (d.agreed_amount || d.offer_amount || 0), 0);

    const stages = ["New", "Contacted", "Qualified", "Visit Scheduled", "Negotiation", "Converted", "Lost"];
    const stageDist: Record<string, number> = {};
    for (const s of stages) {
      stageDist[s] = leads.filter((l) => l.stage === s).length;
    }

    const purposeDist: Record<string, number> = {
      "For Sale": props.filter((p) => p.purpose === "sale").length,
      "For Rent": props.filter((p) => p.purpose === "rent").length
    };

    const cities = ["Islamabad", "Lahore", "Karachi", "Rawalpindi"];
    const cityDist: Record<string, number> = {};
    for (const c of cities) {
      cityDist[c] = props.filter((p) => p.city.toLowerCase() === c.toLowerCase()).length;
    }

    const leases = database.leases || [];
    const maintenance = database.maintenanceRequests || [];
    const totalRentRoll = leases
      .filter((l) => l.status === "Active")
      .reduce((sum, l) => sum + (l.rent_amount_pkr || 0), 0);
    const activeLeases = leases.filter((l) => l.status === "Active");
    const openMaintenance = maintenance.filter((m) => m.status !== "Resolved" && m.status !== "Cancelled");

    return {
      total_properties: props.length,
      available_properties: availableProps,
      total_pipeline_value: pipelineValue,
      total_leads: leads.length,
      new_leads: newLeads,
      scheduled_visits: scheduledVisits,
      active_deals: activeDeals,
      conversion_rate: convRate,
      total_rent_roll_pkr: totalRentRoll,
      active_leases_count: activeLeases.length,
      open_maintenance_count: openMaintenance.length,
      recent_leads: leads.slice(0, 5).map((l) => ({
        ...l,
        property: props.find((p) => p.id === l.property_id),
        assigned_agent: database.users.find((u) => u.id === l.assigned_agent_id),
        activities: database.activities.filter((a) => a.lead_id === l.id)
      })),
      upcoming_visits: visits
        .filter((v) => ["Requested", "Confirmed"].includes(v.status))
        .slice(0, 5)
        .map((v) => ({
          ...v,
          property: props.find((p) => p.id === v.property_id),
          agent: database.users.find((u) => u.id === v.agent_id)
        })),
      stage_distribution: stageDist,
      purpose_distribution: purposeDist,
      city_distribution: cityDist
    };
  },

  // Rental Leases
  getLeases: (
    user?: User,
    filters?: { status?: string; search?: string }
  ): Lease[] => {
    const database = loadDB();
    return (database.leases || [])
      .filter((lease) => {
        if (filters?.status && lease.status !== filters.status) return false;
        if (filters?.search) {
          const s = filters.search.toLowerCase();
          const match =
            lease.property_title.toLowerCase().includes(s) ||
            lease.tenant_name.toLowerCase().includes(s) ||
            lease.landlord_name.toLowerCase().includes(s) ||
            lease.property_code.toLowerCase().includes(s);
          if (!match) return false;
        }
        return true;
      })
      .map((l) => ({
        ...l,
        property: database.properties.find((p) => p.id === l.property_id)
      }));
  },

  getLeaseById: (id: string): Lease | undefined => {
    const database = loadDB();
    const l = (database.leases || []).find((item) => item.id === id);
    if (!l) return undefined;
    return {
      ...l,
      property: database.properties.find((p) => p.id === l.property_id)
    };
  },

  createLease: (
    data: Omit<Lease, "id" | "agency_id" | "created_at" | "updated_at">,
    actor?: User
  ): Lease => {
    const database = loadDB();
    const prop = database.properties.find((p) => p.id === data.property_id);
    const newLease: Lease = {
      ...data,
      id: `lease-${Date.now()}`,
      agency_id: database.agency.id,
      property_title: prop ? prop.title : data.property_title,
      property_code: prop ? prop.reference_code : data.property_code,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      rent_schedule:
        data.rent_schedule && data.rent_schedule.length > 0
          ? data.rent_schedule
          : [
              {
                id: `rp-${Date.now()}-1`,
                lease_id: `lease-${Date.now()}`,
                due_date: data.start_date,
                amount_pkr: data.rent_amount_pkr,
                status: "Pending"
              }
            ]
    };

    database.leases.unshift(newLease);
    database.auditLogs.unshift({
      id: `audit-${Date.now()}`,
      agency_id: database.agency.id,
      actor_name: actor?.full_name || "System Admin",
      actor_role: actor?.role || "agency_admin",
      action: "Lease Created",
      entity_type: "lease",
      entity_id: newLease.id,
      details: `Created lease agreement for '${newLease.property_title}' with tenant ${newLease.tenant_name} (Rent: PKR ${newLease.rent_amount_pkr.toLocaleString()}/mo).`,
      created_at: new Date().toISOString()
    });

    return newLease;
  },

  updateLease: (id: string, data: Partial<Lease>, actor?: User): Lease | undefined => {
    const database = loadDB();
    const idx = (database.leases || []).findIndex((l) => l.id === id);
    if (idx === -1) return undefined;

    const current = database.leases[idx];
    const updated: Lease = {
      ...current,
      ...data,
      updated_at: new Date().toISOString()
    };
    database.leases[idx] = updated;

    database.auditLogs.unshift({
      id: `audit-${Date.now()}`,
      agency_id: database.agency.id,
      actor_name: actor?.full_name || "System Admin",
      actor_role: actor?.role || "agency_admin",
      action: "Lease Updated",
      entity_type: "lease",
      entity_id: id,
      details: `Updated lease agreement '${updated.property_title}' status to '${updated.status}'.`,
      created_at: new Date().toISOString()
    });

    return updated;
  },

  recordRentPayment: (
    leaseId: string,
    paymentId: string,
    paymentData: {
      amount_pkr?: number;
      paid_date?: string;
      payment_method?: string;
      receipt_number?: string;
      notes?: string;
    },
    actor?: User
  ): Lease | undefined => {
    const database = loadDB();
    const lease = (database.leases || []).find((l) => l.id === leaseId);
    if (!lease) return undefined;

    const payment = lease.rent_schedule.find((p) => p.id === paymentId);
    if (payment) {
      payment.status = "Paid";
      payment.paid_date = paymentData.paid_date || new Date().toISOString().split("T")[0];
      payment.payment_method = paymentData.payment_method || "Bank Transfer";
      payment.receipt_number = paymentData.receipt_number || `REC-${Date.now().toString().slice(-6)}`;
      if (paymentData.amount_pkr) payment.amount_pkr = paymentData.amount_pkr;
      if (paymentData.notes) payment.notes = paymentData.notes;
    }
    lease.updated_at = new Date().toISOString();

    database.auditLogs.unshift({
      id: `audit-${Date.now()}`,
      agency_id: database.agency.id,
      actor_name: actor?.full_name || "System Admin",
      actor_role: actor?.role || "agency_admin",
      action: "Rent Payment Recorded",
      entity_type: "lease",
      entity_id: leaseId,
      details: `Recorded rent payment ${payment?.receipt_number} of PKR ${payment?.amount_pkr?.toLocaleString()} for ${lease.property_title}.`,
      created_at: new Date().toISOString()
    });

    return lease;
  },

  // Maintenance Work Orders
  getMaintenanceRequests: (
    user?: User,
    filters?: { status?: string; priority?: string; category?: string; search?: string }
  ): MaintenanceRequest[] => {
    const database = loadDB();
    return (database.maintenanceRequests || [])
      .filter((req) => {
        if (filters?.status && req.status !== filters.status) return false;
        if (filters?.priority && req.priority !== filters.priority) return false;
        if (filters?.category && req.category !== filters.category) return false;
        if (filters?.search) {
          const s = filters.search.toLowerCase();
          const match =
            req.ticket_number.toLowerCase().includes(s) ||
            req.property_title.toLowerCase().includes(s) ||
            req.description.toLowerCase().includes(s) ||
            req.reported_by.toLowerCase().includes(s) ||
            (req.contractor_name && req.contractor_name.toLowerCase().includes(s));
          if (!match) return false;
        }
        return true;
      })
      .map((m) => ({
        ...m,
        property: database.properties.find((p) => p.id === m.property_id)
      }));
  },

  getMaintenanceRequestById: (id: string): MaintenanceRequest | undefined => {
    const database = loadDB();
    const req = (database.maintenanceRequests || []).find((item) => item.id === id);
    if (!req) return undefined;
    return {
      ...req,
      property: database.properties.find((p) => p.id === req.property_id)
    };
  },

  createMaintenanceRequest: (
    data: Omit<MaintenanceRequest, "id" | "ticket_number" | "agency_id" | "created_at">,
    actor?: User
  ): MaintenanceRequest => {
    const database = loadDB();
    const prop = database.properties.find((p) => p.id === data.property_id);
    const count = (database.maintenanceRequests || []).length + 1;
    const ticketNumber = `TKT-2026-${count.toString().padStart(3, "0")}`;

    const newReq: MaintenanceRequest = {
      ...data,
      id: `maint-${Date.now()}`,
      ticket_number: ticketNumber,
      agency_id: database.agency.id,
      property_title: prop ? prop.title : data.property_title,
      status: data.status || "Reported",
      created_at: new Date().toISOString()
    };

    database.maintenanceRequests.unshift(newReq);
    database.auditLogs.unshift({
      id: `audit-${Date.now()}`,
      agency_id: database.agency.id,
      actor_name: actor?.full_name || "System Admin",
      actor_role: actor?.role || "agency_admin",
      action: "Work Order Dispatched",
      entity_type: "maintenance",
      entity_id: newReq.id,
      details: `Logged maintenance ticket ${newReq.ticket_number} (${newReq.category} - ${newReq.priority} priority) for '${newReq.property_title}'.`,
      created_at: new Date().toISOString()
    });

    return newReq;
  },

  updateMaintenanceRequest: (
    id: string,
    data: Partial<MaintenanceRequest>,
    actor?: User
  ): MaintenanceRequest | undefined => {
    const database = loadDB();
    const idx = (database.maintenanceRequests || []).findIndex((m) => m.id === id);
    if (idx === -1) return undefined;

    const current = database.maintenanceRequests[idx];
    const isNowResolved = data.status === "Resolved" && current.status !== "Resolved";
    const updated: MaintenanceRequest = {
      ...current,
      ...data,
      resolved_at: isNowResolved ? new Date().toISOString() : current.resolved_at
    };
    database.maintenanceRequests[idx] = updated;

    database.auditLogs.unshift({
      id: `audit-${Date.now()}`,
      agency_id: database.agency.id,
      actor_name: actor?.full_name || "System Admin",
      actor_role: actor?.role || "agency_admin",
      action: "Work Order Updated",
      entity_type: "maintenance",
      entity_id: id,
      details: `Updated maintenance ticket ${updated.ticket_number} status to '${updated.status}'.`,
      created_at: new Date().toISOString()
    });

    return updated;
  },

  getAuditLogs: (): AuditLog[] => {
    return loadDB().auditLogs.slice(0, 50);
  }
};

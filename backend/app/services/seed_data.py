from datetime import datetime, timezone, timedelta
from sqlalchemy.orm import Session
from app.models.all_models import Agency, User, Property, Lead, Activity, Visit, Deal, AuditLog
from app.core.security import hash_password

def seed_database(db: Session):
    # Check if already seeded
    existing_agency = db.query(Agency).first()
    if existing_agency:
        return

    print("Seeding AqarFlow database with initial Pakistan-first real estate data...")

    # 1. Create Primary Agency
    agency = Agency(
        name="AqarFlow Real Estate & Asset Advisors",
        slug="aqarflow-pakistan",
        logo_url="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=400&q=80",
        phone="+92 51 280 4422",
        email="info@aqarflow.com",
        address="Suite 402, Executive Heights, Blue Area",
        city="Islamabad",
        default_currency="PKR",
        timezone="Asia/Karachi",
        status="active"
    )
    db.add(agency)
    db.flush()

    # 2. Create Users (Admin and Agents)
    admin_user = User(
        agency_id=agency.id,
        full_name="Salman Tariq",
        email="admin@aqarflow.com",
        phone="+92 300 8551234",
        password_hash=hash_password("Password123!"),
        role="agency_admin",
        avatar_url="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        status="active"
    )

    agent_1 = User(
        agency_id=agency.id,
        full_name="Ayesha Khan",
        email="ayesha@aqarflow.com",
        phone="+92 321 4455667",
        password_hash=hash_password("Password123!"),
        role="agent",
        avatar_url="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
        status="active"
    )

    agent_2 = User(
        agency_id=agency.id,
        full_name="Bilal Ahmed",
        email="bilal@aqarflow.com",
        phone="+92 333 5566778",
        password_hash=hash_password("Password123!"),
        role="agent",
        avatar_url="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
        status="active"
    )

    db.add_all([admin_user, agent_1, agent_2])
    db.flush()

    # 3. Create Properties
    properties = [
        Property(
            agency_id=agency.id,
            reference_code="AQ-1001",
            title="1 Kanal Luxury Spanish Designer Villa",
            slug="1-kanal-luxury-spanish-villa-dha-phase-6-lahore",
            purpose="sale",
            category="residential",
            property_type="House",
            price=95000000.0,  # 9.50 Crore PKR
            currency="PKR",
            area_value=1.0,
            area_unit="Kanal",
            bedrooms=5,
            bathrooms=6,
            address="Sector L, Phase 6, DHA",
            city="Lahore",
            locality="DHA Phase 6",
            latitude=31.4721,
            longitude=74.4378,
            amenities=["Solar Hybrid Inverter", "Swimming Pool", "Imported SMEG Kitchen", "Lush Lawn", "Servant Quarter", "Corner Plot"],
            furnishing="Semi-Furnished",
            construction_status="Ready",
            possession_status="Immediate",
            description="Exquisite architect-designed 1 Kanal Spanish elevation bungalow in the most prestigious enclave of DHA Phase 6 Lahore. Featuring double-height ceiling lobby, Spanish imported tiles, Hansgrohe sanitary fittings, full solar backup, and master suite with walk-in closet.",
            cover_image="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
            gallery_images=[
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
                "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80",
                "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1000&q=80"
            ],
            status="Available",
            is_featured=True,
            is_published=True,
            assigned_agent_id=agent_1.id,
            owner_name="Chaudhry Tariq",
            owner_phone="+92 300 1234567"
        ),
        Property(
            agency_id=agency.id,
            reference_code="AQ-1002",
            title="10 Marla Brand New Modern House",
            slug="10-marla-brand-new-modern-house-bahria-town-rawalpindi",
            purpose="sale",
            category="residential",
            property_type="House",
            price=34000000.0,  # 3.40 Crore PKR
            currency="PKR",
            area_value=10.0,
            area_unit="Marla",
            bedrooms=4,
            bathrooms=5,
            address="Street 14, Sector C, Bahria Town Phase 8",
            city="Rawalpindi",
            locality="Bahria Town",
            latitude=33.5186,
            longitude=73.0827,
            amenities=["Underground Wiring", "24/7 Security", "Italian Fixtures", "Fall Ceiling with LED", "Spacious Car Porch"],
            furnishing="Unfurnished",
            construction_status="Ready",
            possession_status="Immediate",
            description="Brand new solid construction 10 Marla house built on high standards. Includes 4 master bedrooms with attached baths, 2 imported modular kitchens, powder room, drawing & dining, and terrace with panoramic view.",
            cover_image="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
            gallery_images=[
                "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80",
                "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=80"
            ],
            status="Available",
            is_featured=True,
            is_published=True,
            assigned_agent_id=agent_2.id,
            owner_name="Brigadier (R) Asad",
            owner_phone="+92 333 9988776"
        ),
        Property(
            agency_id=agency.id,
            reference_code="AQ-1003",
            title="Executive 2-Bed Suite with Margalla Hills View",
            slug="executive-2-bed-centaurus-residencia-f8-islamabad",
            purpose="sale",
            category="residential",
            property_type="Apartment",
            price=42500000.0,  # 4.25 Crore PKR
            currency="PKR",
            area_value=1750.0,
            area_unit="Sq. Ft",
            bedrooms=2,
            bathrooms=3,
            address="Tower B, The Centaurus, F-8/4",
            city="Islamabad",
            locality="Centaurus Residencia, F-8",
            latitude=33.7077,
            longitude=73.0498,
            amenities=["Margalla Hills Facing", "Central Air Conditioning", "Dedicated Valet Parking", "Fitness Center & Spa", "Smart Card Access"],
            furnishing="Furnished",
            construction_status="Ready",
            possession_status="Immediate",
            description="Ultra-luxurious 2-bedroom executive apartment located on the 18th floor of The Centaurus Islamabad. Enjoy breathtaking unobstructed views of the Margalla Hills. Turnkey interior with imported Italian furniture and designer lighting.",
            cover_image="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
            gallery_images=[
                "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80",
                "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80"
            ],
            status="Available",
            is_featured=True,
            is_published=True,
            assigned_agent_id=agent_1.id,
            owner_name="Dr. Noman Qureshi",
            owner_phone="+92 321 8877665"
        ),
        Property(
            agency_id=agency.id,
            reference_code="AQ-1004",
            title="500 Sq. Yds Prime Commercial Plot on Main Boulevard",
            slug="500-sq-yds-commercial-plot-sunset-boulevard-dha-karachi",
            purpose="sale",
            category="commercial",
            property_type="Commercial Plot",
            price=185000000.0,  # 18.50 Crore PKR
            currency="PKR",
            area_value=500.0,
            area_unit="Sq. Yd",
            bedrooms=0,
            bathrooms=0,
            address="Main Sunset Boulevard, Phase 2 Commercial",
            city="Karachi",
            locality="DHA Phase 2",
            latitude=24.8344,
            longitude=67.0658,
            amenities=["Corner Plot", "100-Ft Wide Road Frontage", "Commercial NOC Approved", "Ground + 4 Storey Approval", "High Footfall"],
            furnishing="Unfurnished",
            construction_status="Ready",
            possession_status="Immediate",
            description="Extremely rare commercial opportunity on Main Sunset Boulevard, DHA Phase 2 Karachi. Ideal for flagship corporate headquarters, multi-tenant commercial plaza, or financial institution. Clean title with direct Cantonment Board transfer.",
            cover_image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
            gallery_images=[
                "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80"
            ],
            status="Under Offer",
            is_featured=True,
            is_published=True,
            assigned_agent_id=agent_1.id,
            owner_name="Yousaf Bawany",
            owner_phone="+92 300 2233445"
        ),
        Property(
            agency_id=agency.id,
            reference_code="AQ-1005",
            title="3-Bed Panoramic Seafront Penthouse",
            slug="3-bed-panoramic-seafront-penthouse-crescent-bay-dha-karachi",
            purpose="sale",
            category="residential",
            property_type="Penthouse",
            price=78000000.0,  # 7.80 Crore PKR
            currency="PKR",
            area_value=2650.0,
            area_unit="Sq. Ft",
            bedrooms=3,
            bathrooms=4,
            address="Coral Tower, Emaar Crescent Bay, Phase 8",
            city="Karachi",
            locality="DHA Phase 8",
            latitude=24.7816,
            longitude=67.0583,
            amenities=["Arabian Sea Front View", "Infinity Edge Swimming Pool", "Private Elevators", "Barbecue Deck", "Covered Reserved Parking"],
            furnishing="Furnished",
            construction_status="Ready",
            possession_status="Immediate",
            description="Live the pinnacle of coastal luxury at Emaar Crescent Bay. This premier duplex penthouse features double glass facades looking over the Arabian Sea, private rooftop terrace, designer German kitchen, and bespoke interiors.",
            cover_image="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
            gallery_images=[
                "https://images.unsplash.com/photo-1502005229762-ee152af92569?auto=format&fit=crop&w=1000&q=80"
            ],
            status="Available",
            is_featured=False,
            is_published=True,
            assigned_agent_id=agent_2.id,
            owner_name="Mrs. Shahina Farooq",
            owner_phone="+92 301 7766554"
        ),
        Property(
            agency_id=agency.id,
            reference_code="AQ-1006",
            title="5 Marla Brand New Modern Compact House",
            slug="5-marla-brand-new-modern-house-park-view-lahore",
            purpose="sale",
            category="residential",
            property_type="House",
            price=18500000.0,  # 1.85 Crore PKR
            currency="PKR",
            area_value=5.0,
            area_unit="Marla",
            bedrooms=3,
            bathrooms=4,
            address="Tulip Block, Park View City",
            city="Lahore",
            locality="Park View City",
            latitude=31.4250,
            longitude=74.2050,
            amenities=["Gated Society", "Electricity & Gas Connected", "Near Commercial Market", "Parks & Mosque Nearby"],
            furnishing="Unfurnished",
            construction_status="Ready",
            possession_status="Immediate",
            description="Affordable luxury 5 Marla ready-to-move house in the fast-growing Park View City Lahore. Ideal for nuclear families or rental investors with high rental yield.",
            cover_image="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
            gallery_images=[
                "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80"
            ],
            status="Available",
            is_featured=False,
            is_published=True,
            assigned_agent_id=agent_2.id,
            owner_name="Mian Kashif",
            owner_phone="+92 322 4433221"
        ),
        Property(
            agency_id=agency.id,
            reference_code="AQ-1007",
            title="Fully Fitted 3,200 Sq. Ft Corporate Office Floor",
            slug="fitted-corporate-office-blue-area-islamabad",
            purpose="rent",
            category="commercial",
            property_type="Office",
            price=350000.0,  # 3.5 Lakh PKR / month
            currency="PKR",
            area_value=3200.0,
            area_unit="Sq. Ft",
            bedrooms=0,
            bathrooms=4,
            address="Floor 5, ISE Towers, Jinnah Avenue, Blue Area",
            city="Islamabad",
            locality="Blue Area",
            latitude=33.7142,
            longitude=73.0645,
            amenities=["High-Speed Elevators", "100% Power Generator Backup", "25 Workstations Fitted", "Conference Room", "Server Room"],
            furnishing="Furnished",
            construction_status="Ready",
            possession_status="Immediate",
            description="Plug-and-play corporate office space in Islamabad's premier business district. Fully wired with CAT6 network cabling, glass executive cabins, boardroom with projector setup, and dedicated basement parking spots.",
            cover_image="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
            gallery_images=[
                "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1000&q=80"
            ],
            status="Available",
            is_featured=True,
            is_published=True,
            assigned_agent_id=agent_1.id,
            owner_name="Al-Rehman Investments",
            owner_phone="+92 51 280 9900"
        ),
        Property(
            agency_id=agency.id,
            reference_code="AQ-1008",
            title="1 Kanal Developed Corner Plot in Executive Block",
            slug="1-kanal-developed-corner-plot-gulberg-greens-islamabad",
            purpose="sale",
            category="plot",
            property_type="Residential Plot",
            price=26000000.0,  # 2.60 Crore PKR
            currency="PKR",
            area_value=1.0,
            area_unit="Kanal",
            bedrooms=0,
            bathrooms=0,
            address="Plot # 184, Executive Block, Gulberg Greens",
            city="Islamabad",
            locality="Gulberg Greens",
            latitude=33.6015,
            longitude=73.1368,
            amenities=["Corner Plot", "Park Facing", "All Dues Cleared", "Immediate Construction Allowed", "Wide Carpeted Boulevard"],
            furnishing="Unfurnished",
            construction_status="Ready",
            possession_status="Immediate",
            description="Prime 1 Kanal residential plot located at an enviable corner location facing central park in Executive Block, Gulberg Greens Islamabad. Direct transfer, no litigation, ready for immediate foundation laying.",
            cover_image="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
            gallery_images=[],
            status="Available",
            is_featured=False,
            is_published=True,
            assigned_agent_id=agent_2.id,
            owner_name="Chaudhry Waseem",
            owner_phone="+92 300 5544332"
        )
    ]

    db.add_all(properties)
    db.flush()

    # 4. Create Initial CRM Leads
    lead_1 = Lead(
        agency_id=agency.id,
        property_id=properties[0].id,
        client_name="Farhan Malik",
        phone="+92 300 9988771",
        email="farhan.malik@lahoregroup.com",
        preferred_contact_method="WhatsApp",
        purpose="Buy",
        budget_min=85000000.0,
        budget_max=100000000.0,
        preferred_location="DHA Phase 6, Lahore",
        property_type="House",
        source="Website",
        stage="New",
        assigned_agent_id=agent_1.id,
        notes="High net-worth textile industrialist interested in ready luxury bungalows in DHA Lahore.",
        next_follow_up_at=datetime.now(timezone.utc) + timedelta(days=1)
    )

    lead_2 = Lead(
        agency_id=agency.id,
        property_id=properties[2].id,
        client_name="Dr. Zainab Raza",
        phone="+92 333 4455112",
        email="zainab.raza@shifa.com.pk",
        preferred_contact_method="Phone",
        purpose="Buy",
        budget_min=40000000.0,
        budget_max=45000000.0,
        preferred_location="F-8 / Centaurus, Islamabad",
        property_type="Apartment",
        source="Website",
        stage="Qualified",
        assigned_agent_id=agent_1.id,
        notes="Looking for a high-floor Margalla facing apartment for immediate family residence.",
        next_follow_up_at=datetime.now(timezone.utc) + timedelta(days=2)
    )

    lead_3 = Lead(
        agency_id=agency.id,
        property_id=properties[5].id,
        client_name="Tariq Mehmood",
        phone="+92 321 8899001",
        email="tariq.mehmood@gmail.com",
        preferred_contact_method="WhatsApp",
        purpose="Buy",
        budget_min=18000000.0,
        budget_max=20000000.0,
        preferred_location="Park View City, Lahore",
        property_type="House",
        source="Walk-in",
        stage="Visit Scheduled",
        assigned_agent_id=agent_2.id,
        notes="Visited office on Sunday; looking to finalize 5 marla house with bank mortgage or cash.",
        next_follow_up_at=datetime.now(timezone.utc) + timedelta(days=1)
    )

    lead_4 = Lead(
        agency_id=agency.id,
        property_id=properties[3].id,
        client_name="Hamza Sheikh",
        phone="+92 300 7766550",
        email="hamza@sheikhholding.pk",
        preferred_contact_method="Phone",
        purpose="Invest",
        budget_min=170000000.0,
        budget_max=190000000.0,
        preferred_location="DHA Karachi",
        property_type="Commercial Plot",
        source="Referral",
        stage="Negotiation",
        assigned_agent_id=agent_1.id,
        notes="Made an initial offer of 18 Crore for Sunset Boulevard commercial plot. Counter offer in progress.",
        next_follow_up_at=datetime.now(timezone.utc) + timedelta(hours=12)
    )

    lead_5 = Lead(
        agency_id=agency.id,
        property_id=properties[6].id,
        client_name="Sarah Aslam",
        phone="+92 312 9988123",
        email="sarah.a@techpulse.io",
        preferred_contact_method="Email",
        purpose="Rent",
        budget_min=300000.0,
        budget_max=360000.0,
        preferred_location="Blue Area, Islamabad",
        property_type="Office",
        source="Portal",
        stage="Contacted",
        assigned_agent_id=agent_2.id,
        notes="Tech software house looking to relocate 30 developers from Rawalpindi to Islamabad Blue Area.",
        next_follow_up_at=datetime.now(timezone.utc) + timedelta(days=3)
    )

    db.add_all([lead_1, lead_2, lead_3, lead_4, lead_5])
    db.flush()

    # 5. Create Activities for leads
    act_1 = Activity(
        agency_id=agency.id,
        lead_id=lead_1.id,
        user_id=agent_1.id,
        activity_type="whatsapp",
        body="Sent property brochure and video walkthrough on WhatsApp. Client confirmed receipt."
    )
    act_2 = Activity(
        agency_id=agency.id,
        lead_id=lead_2.id,
        user_id=agent_1.id,
        activity_type="call",
        body="Spoke on phone for 12 minutes. Clarified maintenance fees and Centaurus resident gym amenities."
    )
    act_3 = Activity(
        agency_id=agency.id,
        lead_id=lead_4.id,
        user_id=agent_1.id,
        activity_type="meeting",
        body="Met at Karachi Club with Mr. Hamza Sheikh and his legal counsel to review title documents."
    )
    db.add_all([act_1, act_2, act_3])

    # 6. Create Visits
    visit_1 = Visit(
        agency_id=agency.id,
        property_id=properties[0].id,
        lead_id=lead_1.id,
        client_name=lead_1.client_name,
        client_phone=lead_1.phone,
        agent_id=agent_1.id,
        scheduled_at=datetime.now(timezone.utc) + timedelta(days=1, hours=2),
        duration_minutes=60,
        meeting_point="DHA Phase 6 Main Commercial Roundabout",
        visitor_count=3,
        status="Confirmed",
        notes="Client will visit with his spouse and interior decorator."
    )

    visit_2 = Visit(
        agency_id=agency.id,
        property_id=properties[5].id,
        lead_id=lead_3.id,
        client_name=lead_3.client_name,
        client_phone=lead_3.phone,
        agent_id=agent_2.id,
        scheduled_at=datetime.now(timezone.utc) + timedelta(days=2, hours=4),
        duration_minutes=45,
        meeting_point="Park View City Main Gate 1",
        visitor_count=2,
        status="Requested",
        notes="Checking sunlight orientation and room sizes."
    )
    db.add_all([visit_1, visit_2])

    # 7. Create Deals
    deal_1 = Deal(
        agency_id=agency.id,
        property_id=properties[3].id,
        lead_id=lead_4.id,
        client_name=lead_4.client_name,
        client_phone=lead_4.phone,
        agent_id=agent_1.id,
        stage="Booking",
        offer_amount=180000000.0,
        agreed_amount=182500000.0,
        token_amount=5000000.0,
        commission_rate=1.0,
        commission_amount=1825000.0,
        expected_close_date="2026-11-25",
        notes="Token receipt of PKR 50 Lakh issued via pay order. Balance 20% due on sale agreement signing."
    )

    deal_2 = Deal(
        agency_id=agency.id,
        property_id=properties[5].id,
        lead_id=lead_3.id,
        client_name=lead_3.client_name,
        client_phone=lead_3.phone,
        agent_id=agent_2.id,
        stage="Negotiation",
        offer_amount=17800000.0,
        agreed_amount=18200000.0,
        token_amount=0.0,
        commission_rate=1.0,
        commission_amount=182000.0,
        expected_close_date="2026-12-05",
        notes="Buyer offered 1.78 Crore, seller asking 1.85 Crore. Bridge negotiation targeting 1.82 Crore."
    )
    db.add_all([deal_1, deal_2])

    # 8. Create Initial Audit Logs
    audit_logs = [
        AuditLog(
            agency_id=agency.id,
            actor_name="Salman Tariq",
            actor_role="agency_admin",
            action="System Initialized",
            entity_type="agency",
            entity_id=agency.id,
            details="AqarFlow ERP & CRM workspace initialized with Pakistan-first defaults."
        ),
        AuditLog(
            agency_id=agency.id,
            actor_name="Salman Tariq",
            actor_role="agency_admin",
            action="Property Published",
            entity_type="property",
            entity_id=properties[0].id,
            details="Published 1 Kanal Luxury Spanish Designer Villa (AQ-1001) to public portal."
        ),
        AuditLog(
            agency_id=agency.id,
            actor_name="Ayesha Khan",
            actor_role="agent",
            action="Deal Stage Advanced",
            entity_type="deal",
            entity_id=deal_1.id,
            details="Moved deal with Hamza Sheikh to Booking stage with PKR 50 Lakh token deposit."
        )
    ]
    db.add_all(audit_logs)

    db.commit()
    print("Database seeding completed successfully!")

import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Integer, Float, Boolean, Text, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.core.database import Base

def generate_uuid() -> str:
    return str(uuid.uuid4())

def utc_now() -> datetime:
    return datetime.now(timezone.utc)

class Agency(Base):
    __tablename__ = "agencies"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    name = Column(String(100), nullable=False)
    slug = Column(String(100), unique=True, nullable=False)
    logo_url = Column(String(500), nullable=True)
    phone = Column(String(30), nullable=True)
    email = Column(String(100), nullable=True)
    address = Column(String(255), nullable=True)
    city = Column(String(100), default="Islamabad")
    default_currency = Column(String(10), default="PKR")
    timezone = Column(String(50), default="Asia/Karachi")
    status = Column(String(20), default="active")
    created_at = Column(DateTime, default=utc_now)

    users = relationship("User", back_populates="agency", cascade="all, delete-orphan")
    properties = relationship("Property", back_populates="agency", cascade="all, delete-orphan")
    leads = relationship("Lead", back_populates="agency", cascade="all, delete-orphan")

class User(Base):
    __tablename__ = "users"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    agency_id = Column(String(36), ForeignKey("agencies.id"), nullable=False)
    full_name = Column(String(100), nullable=False)
    email = Column(String(120), unique=True, nullable=False, index=True)
    phone = Column(String(30), nullable=True)
    password_hash = Column(String(255), nullable=False)
    role = Column(String(30), default="agent")  # agency_admin, agent, manager
    avatar_url = Column(String(500), nullable=True)
    status = Column(String(20), default="active")  # active, inactive
    created_at = Column(DateTime, default=utc_now)

    agency = relationship("Agency", back_populates="users")
    assigned_properties = relationship("Property", back_populates="assigned_agent")
    assigned_leads = relationship("Lead", back_populates="assigned_agent")

class Property(Base):
    __tablename__ = "properties"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    agency_id = Column(String(36), ForeignKey("agencies.id"), nullable=False, index=True)
    reference_code = Column(String(30), nullable=False, index=True)
    title = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, nullable=False, index=True)
    purpose = Column(String(20), nullable=False, default="sale")  # sale, rent, lease
    category = Column(String(50), nullable=False, default="residential")  # residential, commercial, plot
    property_type = Column(String(50), nullable=False, default="House")  # House, Flat, Villa, Plot, Office, Shop
    price = Column(Float, nullable=False, default=0.0)
    currency = Column(String(10), default="PKR")
    area_value = Column(Float, nullable=False, default=0.0)
    area_unit = Column(String(20), default="Marla")  # Marla, Kanal, Sq. Ft, Sq. Yd
    bedrooms = Column(Integer, nullable=True, default=0)
    bathrooms = Column(Integer, nullable=True, default=0)
    address = Column(String(255), nullable=True)
    city = Column(String(100), nullable=False, default="Islamabad")
    locality = Column(String(100), nullable=False, default="DHA")
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    amenities = Column(JSON, nullable=True, default=list)
    furnishing = Column(String(50), default="Unfurnished")
    construction_status = Column(String(50), default="Ready")
    possession_status = Column(String(50), default="Immediate")
    description = Column(Text, nullable=True)
    cover_image = Column(String(500), nullable=True)
    gallery_images = Column(JSON, nullable=True, default=list)
    status = Column(String(30), default="Available")  # Draft, Available, Reserved, Under Offer, Sold, Rented, Inactive
    is_featured = Column(Boolean, default=False)
    is_published = Column(Boolean, default=True)
    assigned_agent_id = Column(String(36), ForeignKey("users.id"), nullable=True)
    owner_name = Column(String(100), nullable=True)
    owner_phone = Column(String(30), nullable=True)
    created_at = Column(DateTime, default=utc_now)
    updated_at = Column(DateTime, default=utc_now, onupdate=utc_now)

    agency = relationship("Agency", back_populates="properties")
    assigned_agent = relationship("User", back_populates="assigned_properties")
    leads = relationship("Lead", back_populates="property")
    visits = relationship("Visit", back_populates="property")
    deals = relationship("Deal", back_populates="property")

class Lead(Base):
    __tablename__ = "leads"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    agency_id = Column(String(36), ForeignKey("agencies.id"), nullable=False, index=True)
    property_id = Column(String(36), ForeignKey("properties.id"), nullable=True)
    client_name = Column(String(100), nullable=False)
    phone = Column(String(30), nullable=False)
    email = Column(String(120), nullable=True)
    preferred_contact_method = Column(String(30), default="WhatsApp")
    purpose = Column(String(20), default="Buy")  # Buy, Rent, Invest
    budget_min = Column(Float, default=0.0)
    budget_max = Column(Float, default=0.0)
    preferred_location = Column(String(100), nullable=True)
    property_type = Column(String(50), nullable=True)
    source = Column(String(50), default="Website")  # Website, WhatsApp, Walk-in, Referral, Facebook
    stage = Column(String(30), default="New")  # New, Contacted, Qualified, Visit Scheduled, Negotiation, Converted, Lost
    assigned_agent_id = Column(String(36), ForeignKey("users.id"), nullable=True)
    notes = Column(Text, nullable=True)
    next_follow_up_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=utc_now)
    updated_at = Column(DateTime, default=utc_now, onupdate=utc_now)

    agency = relationship("Agency", back_populates="leads")
    property = relationship("Property", back_populates="leads")
    assigned_agent = relationship("User", back_populates="assigned_leads")
    activities = relationship("Activity", back_populates="lead", cascade="all, delete-orphan")

class Activity(Base):
    __tablename__ = "activities"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    agency_id = Column(String(36), ForeignKey("agencies.id"), nullable=False)
    lead_id = Column(String(36), ForeignKey("leads.id"), nullable=False, index=True)
    user_id = Column(String(36), ForeignKey("users.id"), nullable=True)
    activity_type = Column(String(30), default="note")  # call, whatsapp, meeting, note, stage_change
    body = Column(Text, nullable=False)
    occurred_at = Column(DateTime, default=utc_now)

    lead = relationship("Lead", back_populates="activities")

class Visit(Base):
    __tablename__ = "visits"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    agency_id = Column(String(36), ForeignKey("agencies.id"), nullable=False, index=True)
    property_id = Column(String(36), ForeignKey("properties.id"), nullable=False)
    lead_id = Column(String(36), ForeignKey("leads.id"), nullable=True)
    client_name = Column(String(100), nullable=False)
    client_phone = Column(String(30), nullable=False)
    agent_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    scheduled_at = Column(DateTime, nullable=False)
    duration_minutes = Column(Integer, default=45)
    meeting_point = Column(String(150), nullable=True)
    visitor_count = Column(Integer, default=1)
    status = Column(String(30), default="Requested")  # Requested, Confirmed, Completed, Cancelled, No-show
    notes = Column(Text, nullable=True)
    outcome = Column(Text, nullable=True)
    created_at = Column(DateTime, default=utc_now)

    property = relationship("Property", back_populates="visits")
    agent = relationship("User")

class Deal(Base):
    __tablename__ = "deals"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    agency_id = Column(String(36), ForeignKey("agencies.id"), nullable=False, index=True)
    property_id = Column(String(36), ForeignKey("properties.id"), nullable=False)
    lead_id = Column(String(36), ForeignKey("leads.id"), nullable=True)
    client_name = Column(String(100), nullable=False)
    client_phone = Column(String(30), nullable=False)
    agent_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    stage = Column(String(30), default="Inquiry")  # Inquiry, Qualified, Visit, Offer, Negotiation, Booking, Documentation, Closed Won, Closed Lost
    offer_amount = Column(Float, default=0.0)
    agreed_amount = Column(Float, default=0.0)
    token_amount = Column(Float, default=0.0)
    commission_rate = Column(Float, default=1.0)
    commission_amount = Column(Float, default=0.0)
    expected_close_date = Column(String(30), nullable=True)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=utc_now)
    updated_at = Column(DateTime, default=utc_now, onupdate=utc_now)

    property = relationship("Property", back_populates="deals")
    agent = relationship("User")

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    agency_id = Column(String(36), ForeignKey("agencies.id"), nullable=False, index=True)
    actor_name = Column(String(100), nullable=False)
    actor_role = Column(String(30), nullable=False)
    action = Column(String(100), nullable=False)
    entity_type = Column(String(50), nullable=False)
    entity_id = Column(String(36), nullable=True)
    details = Column(Text, nullable=True)
    created_at = Column(DateTime, default=utc_now)

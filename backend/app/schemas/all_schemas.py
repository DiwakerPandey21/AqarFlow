from pydantic import BaseModel, EmailStr, Field
from typing import Optional, Any
from datetime import datetime

# --- Auth Schemas ---
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: dict[str, Any]

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: str
    agency_id: str
    full_name: str
    email: str
    phone: Optional[str] = None
    role: str
    avatar_url: Optional[str] = None
    status: str
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# --- Property Schemas ---
class PropertyBase(BaseModel):
    title: str
    purpose: str = "sale"  # sale, rent, lease
    category: str = "residential"
    property_type: str = "House"
    price: float = 0.0
    currency: str = "PKR"
    area_value: float = 0.0
    area_unit: str = "Marla"  # Marla, Kanal, Sq. Ft, Sq. Yd
    bedrooms: Optional[int] = 0
    bathrooms: Optional[int] = 0
    address: Optional[str] = None
    city: str = "Islamabad"
    locality: str = "DHA"
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    amenities: Optional[list[str]] = []
    furnishing: Optional[str] = "Unfurnished"
    construction_status: Optional[str] = "Ready"
    possession_status: Optional[str] = "Immediate"
    description: Optional[str] = None
    cover_image: Optional[str] = None
    gallery_images: Optional[list[str]] = []
    status: Optional[str] = "Available"
    is_featured: Optional[bool] = False
    is_published: Optional[bool] = True
    assigned_agent_id: Optional[str] = None
    owner_name: Optional[str] = None
    owner_phone: Optional[str] = None

class PropertyCreate(PropertyBase):
    pass

class PropertyUpdate(BaseModel):
    title: Optional[str] = None
    purpose: Optional[str] = None
    category: Optional[str] = None
    property_type: Optional[str] = None
    price: Optional[float] = None
    area_value: Optional[float] = None
    area_unit: Optional[str] = None
    bedrooms: Optional[int] = None
    bathrooms: Optional[int] = None
    address: Optional[str] = None
    city: Optional[str] = None
    locality: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    amenities: Optional[list[str]] = None
    furnishing: Optional[str] = None
    construction_status: Optional[str] = None
    possession_status: Optional[str] = None
    description: Optional[str] = None
    cover_image: Optional[str] = None
    gallery_images: Optional[list[str]] = None
    status: Optional[str] = None
    is_featured: Optional[bool] = None
    is_published: Optional[bool] = None
    assigned_agent_id: Optional[str] = None
    owner_name: Optional[str] = None
    owner_phone: Optional[str] = None

class PropertyResponse(PropertyBase):
    id: str
    agency_id: str
    reference_code: str
    slug: str
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    assigned_agent: Optional[UserResponse] = None

    class Config:
        from_attributes = True

# --- Lead Schemas ---
class ActivityBase(BaseModel):
    activity_type: str = "note"
    body: str

class ActivityResponse(ActivityBase):
    id: str
    lead_id: str
    user_id: Optional[str] = None
    occurred_at: datetime

    class Config:
        from_attributes = True

class LeadBase(BaseModel):
    property_id: Optional[str] = None
    client_name: str
    phone: str
    email: Optional[str] = None
    preferred_contact_method: Optional[str] = "WhatsApp"
    purpose: Optional[str] = "Buy"
    budget_min: Optional[float] = 0.0
    budget_max: Optional[float] = 0.0
    preferred_location: Optional[str] = None
    property_type: Optional[str] = None
    source: Optional[str] = "Website"
    stage: Optional[str] = "New"
    assigned_agent_id: Optional[str] = None
    notes: Optional[str] = None
    next_follow_up_at: Optional[datetime] = None

class LeadCreate(LeadBase):
    pass

class PublicInquiryCreate(BaseModel):
    property_id: Optional[str] = None
    client_name: str
    phone: str
    email: Optional[str] = None
    preferred_contact_method: Optional[str] = "WhatsApp"
    message: Optional[str] = None

class LeadUpdate(BaseModel):
    stage: Optional[str] = None
    assigned_agent_id: Optional[str] = None
    notes: Optional[str] = None
    budget_min: Optional[float] = None
    budget_max: Optional[float] = None
    preferred_location: Optional[str] = None
    next_follow_up_at: Optional[datetime] = None

class LeadResponse(LeadBase):
    id: str
    agency_id: str
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    property: Optional[PropertyResponse] = None
    assigned_agent: Optional[UserResponse] = None
    activities: Optional[list[ActivityResponse]] = []

    class Config:
        from_attributes = True

# --- Visit Schemas ---
class VisitBase(BaseModel):
    property_id: str
    lead_id: Optional[str] = None
    client_name: str
    client_phone: str
    agent_id: str
    scheduled_at: datetime
    duration_minutes: Optional[int] = 45
    meeting_point: Optional[str] = "On-site property main gate"
    visitor_count: Optional[int] = 1
    notes: Optional[str] = None

class VisitCreate(VisitBase):
    pass

class VisitUpdate(BaseModel):
    status: Optional[str] = None
    scheduled_at: Optional[datetime] = None
    agent_id: Optional[str] = None
    notes: Optional[str] = None
    outcome: Optional[str] = None

class VisitResponse(VisitBase):
    id: str
    agency_id: str
    status: str
    outcome: Optional[str] = None
    created_at: Optional[datetime] = None
    property: Optional[PropertyResponse] = None
    agent: Optional[UserResponse] = None

    class Config:
        from_attributes = True

# --- Deal Schemas ---
class DealBase(BaseModel):
    property_id: str
    lead_id: Optional[str] = None
    client_name: str
    client_phone: str
    agent_id: str
    stage: Optional[str] = "Inquiry"
    offer_amount: Optional[float] = 0.0
    agreed_amount: Optional[float] = 0.0
    token_amount: Optional[float] = 0.0
    commission_rate: Optional[float] = 1.0
    commission_amount: Optional[float] = 0.0
    expected_close_date: Optional[str] = None
    notes: Optional[str] = None

class DealCreate(DealBase):
    pass

class DealUpdate(BaseModel):
    stage: Optional[str] = None
    offer_amount: Optional[float] = None
    agreed_amount: Optional[float] = None
    token_amount: Optional[float] = None
    commission_rate: Optional[float] = None
    commission_amount: Optional[float] = None
    expected_close_date: Optional[str] = None
    notes: Optional[str] = None

class DealResponse(DealBase):
    id: str
    agency_id: str
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    property: Optional[PropertyResponse] = None
    agent: Optional[UserResponse] = None

    class Config:
        from_attributes = True

# --- Dashboard & Report Schemas ---
class DashboardOverview(BaseModel):
    total_properties: int
    available_properties: int
    total_pipeline_value: float
    total_leads: int
    new_leads: int
    scheduled_visits: int
    active_deals: int
    conversion_rate: float
    recent_leads: list[LeadResponse]
    upcoming_visits: list[VisitResponse]
    stage_distribution: dict[str, int]
    purpose_distribution: dict[str, int]
    city_distribution: dict[str, int]

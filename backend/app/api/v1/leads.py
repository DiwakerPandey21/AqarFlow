from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from sqlalchemy import or_
from app.core.database import get_db
from app.core.deps import get_current_user
from app.models.all_models import Lead, Property, User, Activity, Agency, AuditLog
from app.schemas.all_schemas import (
    LeadCreate, LeadUpdate, LeadResponse, PublicInquiryCreate,
    ActivityCreate, ActivityResponse
)

router = APIRouter(tags=["Leads & CRM"])

# --- PUBLIC INQUIRY ---

@router.post("/public/inquiries", response_model=LeadResponse, status_code=status.HTTP_201_CREATED)
def submit_public_inquiry(
    inquiry: PublicInquiryCreate,
    db: Session = Depends(get_db)
):
    # Find active agency
    agency = db.query(Agency).filter(Agency.status == "active").first()
    if not agency:
        raise HTTPException(status_code=500, detail="Primary agency not initialized.")

    assigned_agent_id = None
    pref_location = None
    prop_type = None

    if inquiry.property_id:
        prop = db.query(Property).filter(Property.id == inquiry.property_id).first()
        if prop:
            assigned_agent_id = prop.assigned_agent_id
            pref_location = f"{prop.locality}, {prop.city}"
            prop_type = prop.property_type

    lead = Lead(
        agency_id=agency.id,
        property_id=inquiry.property_id,
        client_name=inquiry.client_name,
        phone=inquiry.phone,
        email=inquiry.email,
        preferred_contact_method=inquiry.preferred_contact_method,
        purpose="Buy" if not inquiry.property_id else "Buy",
        preferred_location=pref_location,
        property_type=prop_type,
        source="Website",
        stage="New",
        assigned_agent_id=assigned_agent_id,
        notes=inquiry.message
    )
    db.add(lead)
    db.flush()

    # Add initial activity note
    act = Activity(
        agency_id=agency.id,
        lead_id=lead.id,
        activity_type="note",
        body=f"Inquiry received from public website: {inquiry.message or 'Interested in this property.'}"
    )
    db.add(act)

    audit = AuditLog(
        agency_id=agency.id,
        actor_name=inquiry.client_name,
        actor_role="visitor",
        action="Public Inquiry Submitted",
        entity_type="lead",
        entity_id=lead.id,
        details=f"Inquiry submitted for phone {inquiry.phone} via Website."
    )
    db.add(audit)
    db.commit()
    db.refresh(lead)
    return lead

# --- WORKSPACE CRM ENDPOINTS ---

@router.get("/leads", response_model=list[LeadResponse])
def get_leads(
    stage: Optional[str] = Query(None),
    agent_id: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    limit: int = Query(100),
    offset: int = Query(0),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    query = db.query(Lead).filter(Lead.agency_id == current_user.agency_id)

    # Agents only see their assigned leads unless they are Admin
    if current_user.role == "agent":
        query = query.filter(
            or_(Lead.assigned_agent_id == current_user.id, Lead.assigned_agent_id == None)
        )
    elif agent_id:
        query = query.filter(Lead.assigned_agent_id == agent_id)

    if stage:
        query = query.filter(Lead.stage == stage)

    if search:
        search_filter = or_(
            Lead.client_name.ilike(f"%{search}%"),
            Lead.phone.ilike(f"%{search}%"),
            Lead.email.ilike(f"%{search}%"),
            Lead.preferred_location.ilike(f"%{search}%")
        )
        query = query.filter(search_filter)

    return query.order_by(Lead.created_at.desc()).offset(offset).limit(limit).all()

@router.post("/leads", response_model=LeadResponse, status_code=status.HTTP_201_CREATED)
def create_lead(
    lead_in: LeadCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    lead = Lead(
        agency_id=current_user.agency_id,
        **lead_in.model_dump()
    )
    db.add(lead)
    db.flush()

    if lead.notes:
        act = Activity(
            agency_id=current_user.agency_id,
            lead_id=lead.id,
            user_id=current_user.id,
            activity_type="note",
            body=f"Initial notes: {lead.notes}"
        )
        db.add(act)

    audit = AuditLog(
        agency_id=current_user.agency_id,
        actor_name=current_user.full_name,
        actor_role=current_user.role,
        action="Lead Created",
        entity_type="lead",
        entity_id=lead.id,
        details=f"Lead created for {lead.client_name} ({lead.phone}) from source {lead.source}."
    )
    db.add(audit)
    db.commit()
    db.refresh(lead)
    return lead

@router.get("/leads/{id}", response_model=LeadResponse)
def get_lead(
    id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    lead = db.query(Lead).filter(
        Lead.id == id,
        Lead.agency_id == current_user.agency_id
    ).first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found.")

    if current_user.role == "agent" and lead.assigned_agent_id and lead.assigned_agent_id != current_user.id:
        raise HTTPException(status_code=403, detail="You do not have permission to view this lead.")

    return lead

@router.patch("/leads/{id}", response_model=LeadResponse)
def update_lead(
    id: str,
    lead_update: LeadUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    lead = db.query(Lead).filter(
        Lead.id == id,
        Lead.agency_id == current_user.agency_id
    ).first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found.")

    if current_user.role == "agent" and lead.assigned_agent_id and lead.assigned_agent_id != current_user.id:
        raise HTTPException(status_code=403, detail="Permission denied for this lead.")

    update_data = lead_update.model_dump(exclude_unset=True)

    old_stage = lead.stage
    for key, value in update_data.items():
        setattr(lead, key, value)

    # If stage changed, log an activity
    if "stage" in update_data and update_data["stage"] != old_stage:
        act = Activity(
            agency_id=current_user.agency_id,
            lead_id=lead.id,
            user_id=current_user.id,
            activity_type="stage_change",
            body=f"Stage updated from '{old_stage}' to '{lead.stage}' by {current_user.full_name}."
        )
        db.add(act)

    audit = AuditLog(
        agency_id=current_user.agency_id,
        actor_name=current_user.full_name,
        actor_role=current_user.role,
        action="Lead Updated",
        entity_type="lead",
        entity_id=lead.id,
        details=f"Updated lead {lead.client_name}: {', '.join(update_data.keys())}."
    )
    db.add(audit)
    db.commit()
    db.refresh(lead)
    return lead

@router.post("/leads/{id}/assign", response_model=LeadResponse)
def assign_lead(
    id: str,
    agent_id: str = Query(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    lead = db.query(Lead).filter(
        Lead.id == id,
        Lead.agency_id == current_user.agency_id
    ).first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found.")

    agent = db.query(User).filter(
        User.id == agent_id,
        User.agency_id == current_user.agency_id
    ).first()
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found.")

    old_agent = lead.assigned_agent.full_name if lead.assigned_agent else "Unassigned"
    lead.assigned_agent_id = agent.id

    act = Activity(
        agency_id=current_user.agency_id,
        lead_id=lead.id,
        user_id=current_user.id,
        activity_type="note",
        body=f"Lead reassigned from {old_agent} to {agent.full_name} by {current_user.full_name}."
    )
    db.add(act)

    audit = AuditLog(
        agency_id=current_user.agency_id,
        actor_name=current_user.full_name,
        actor_role=current_user.role,
        action="Lead Assigned",
        entity_type="lead",
        entity_id=lead.id,
        details=f"Assigned lead {lead.client_name} to {agent.full_name}."
    )
    db.add(audit)
    db.commit()
    db.refresh(lead)
    return lead

@router.post("/leads/{id}/activities", response_model=ActivityResponse, status_code=status.HTTP_201_CREATED)
def add_lead_activity(
    id: str,
    act_in: ActivityCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    lead = db.query(Lead).filter(
        Lead.id == id,
        Lead.agency_id == current_user.agency_id
    ).first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found.")

    act = Activity(
        agency_id=current_user.agency_id,
        lead_id=lead.id,
        user_id=current_user.id,
        activity_type=act_in.activity_type,
        body=act_in.body
    )
    db.add(act)
    db.commit()
    db.refresh(act)
    return act

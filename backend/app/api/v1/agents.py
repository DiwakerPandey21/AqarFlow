from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.deps import get_current_user, require_admin
from app.core.security import hash_password
from app.models.all_models import User, Property, Lead, Deal, AuditLog
from app.schemas.all_schemas import UserResponse

router = APIRouter(prefix="/agents", tags=["Agents & Staff"])

@router.get("", response_model=list[dict])
def get_agents(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    users = db.query(User).filter(
        User.agency_id == current_user.agency_id,
        User.status == "active"
    ).all()

    agent_list = []
    for u in users:
        active_props = db.query(Property).filter(Property.assigned_agent_id == u.id, Property.status == "Available").count()
        active_leads = db.query(Lead).filter(Lead.assigned_agent_id == u.id, Lead.stage != "Lost").count()
        closed_deals = db.query(Deal).filter(Deal.agent_id == u.id, Deal.stage == "Closed Won").count()

        agent_list.append({
            "id": u.id,
            "agency_id": u.agency_id,
            "full_name": u.full_name,
            "email": u.email,
            "phone": u.phone,
            "role": u.role,
            "avatar_url": u.avatar_url,
            "status": u.status,
            "active_properties_count": active_props,
            "active_leads_count": active_leads,
            "closed_deals_count": closed_deals
        })
    return agent_list

@router.post("", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def invite_agent(
    data: dict,
    current_user: User = Depends(require_admin),
    db: Session = Depends(get_db)
):
    email = data.get("email")
    if not email:
        raise HTTPException(status_code=400, detail="Email is required.")

    existing = db.query(User).filter(User.email == email).first()
    if existing:
        raise HTTPException(status_code=400, detail="A user with this email already exists.")

    new_user = User(
        agency_id=current_user.agency_id,
        full_name=data.get("full_name", "Agent"),
        email=email,
        phone=data.get("phone", "+92 300 0000000"),
        password_hash=hash_password(data.get("password", "Password123!")),
        role=data.get("role", "agent"),
        avatar_url=data.get("avatar_url", "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"),
        status="active"
    )
    db.add(new_user)
    db.flush()

    audit = AuditLog(
        agency_id=current_user.agency_id,
        actor_name=current_user.full_name,
        actor_role=current_user.role,
        action="Agent Added",
        entity_type="user",
        entity_id=new_user.id,
        details=f"Added new team member {new_user.full_name} ({new_user.role})."
    )
    db.add(audit)
    db.commit()
    db.refresh(new_user)
    return new_user

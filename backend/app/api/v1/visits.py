from datetime import timedelta
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.deps import get_current_user
from app.models.all_models import Visit, Property, User, AuditLog
from app.schemas.all_schemas import VisitCreate, VisitUpdate, VisitResponse

router = APIRouter(prefix="/visits", tags=["Visits & Appointments"])

@router.get("", response_model=list[VisitResponse])
def get_visits(
    status_filter: Optional[str] = Query(None, alias="status"),
    agent_id: Optional[str] = Query(None),
    property_id: Optional[str] = Query(None),
    limit: int = Query(100),
    offset: int = Query(0),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    query = db.query(Visit).filter(Visit.agency_id == current_user.agency_id)

    if current_user.role == "agent":
        query = query.filter(Visit.agent_id == current_user.id)
    elif agent_id:
        query = query.filter(Visit.agent_id == agent_id)

    if status_filter:
        query = query.filter(Visit.status == status_filter)
    if property_id:
        query = query.filter(Visit.property_id == property_id)

    return query.order_by(Visit.scheduled_at.desc()).offset(offset).limit(limit).all()

@router.post("", response_model=VisitResponse, status_code=status.HTTP_201_CREATED)
def create_visit(
    visit_in: VisitCreate,
    ignore_conflict: bool = Query(False, description="Override double-booking warning"),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Verify property exists
    prop = db.query(Property).filter(
        Property.id == visit_in.property_id,
        Property.agency_id == current_user.agency_id
    ).first()
    if not prop:
        raise HTTPException(status_code=404, detail="Property not found.")

    # Check for scheduling conflicts for the same agent
    visit_start = visit_in.scheduled_at
    visit_end = visit_start + timedelta(minutes=visit_in.duration_minutes or 45)

    existing_visits = db.query(Visit).filter(
        Visit.agency_id == current_user.agency_id,
        Visit.agent_id == visit_in.agent_id,
        Visit.status.in_(["Requested", "Confirmed"])
    ).all()

    conflicts = []
    for ev in existing_visits:
        ev_start = ev.scheduled_at
        ev_end = ev_start + timedelta(minutes=ev.duration_minutes or 45)
        # Check overlap: (StartA < EndB) and (EndA > StartB)
        if (visit_start < ev_end) and (visit_end > ev_start):
            conflicts.append(ev)

    if conflicts and not ignore_conflict:
        conflicting = conflicts[0]
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail={
                "message": f"Agent already has a visit scheduled around this time with {conflicting.client_name}.",
                "conflict_visit_id": conflicting.id,
                "conflict_time": conflicting.scheduled_at.isoformat()
            }
        )

    visit = Visit(
        agency_id=current_user.agency_id,
        status="Confirmed" if current_user.role == "agency_admin" else "Requested",
        **visit_in.model_dump()
    )
    db.add(visit)
    db.flush()

    audit = AuditLog(
        agency_id=current_user.agency_id,
        actor_name=current_user.full_name,
        actor_role=current_user.role,
        action="Visit Scheduled",
        entity_type="visit",
        entity_id=visit.id,
        details=f"Visit scheduled for property {prop.title} with {visit.client_name} at {visit.scheduled_at}."
    )
    db.add(audit)
    db.commit()
    db.refresh(visit)
    return visit

@router.patch("/{id}", response_model=VisitResponse)
def update_visit(
    id: str,
    visit_update: VisitUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    visit = db.query(Visit).filter(
        Visit.id == id,
        Visit.agency_id == current_user.agency_id
    ).first()
    if not visit:
        raise HTTPException(status_code=404, detail="Visit not found.")

    update_data = visit_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(visit, key, value)

    audit = AuditLog(
        agency_id=current_user.agency_id,
        actor_name=current_user.full_name,
        actor_role=current_user.role,
        action="Visit Status Updated",
        entity_type="visit",
        entity_id=visit.id,
        details=f"Visit status updated to {visit.status} for {visit.client_name}."
    )
    db.add(audit)
    db.commit()
    db.refresh(visit)
    return visit

from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.deps import get_current_user
from app.models.all_models import Deal, Property, User, AuditLog
from app.schemas.all_schemas import DealCreate, DealUpdate, DealResponse

router = APIRouter(prefix="/deals", tags=["Deals & Sales Pipeline"])

@router.get("", response_model=list[DealResponse])
def get_deals(
    stage: Optional[str] = Query(None),
    agent_id: Optional[str] = Query(None),
    limit: int = Query(100),
    offset: int = Query(0),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    query = db.query(Deal).filter(Deal.agency_id == current_user.agency_id)

    if current_user.role == "agent":
        query = query.filter(Deal.agent_id == current_user.id)
    elif agent_id:
        query = query.filter(Deal.agent_id == agent_id)

    if stage:
        query = query.filter(Deal.stage == stage)

    return query.order_by(Deal.created_at.desc()).offset(offset).limit(limit).all()

@router.post("", response_model=DealResponse, status_code=status.HTTP_201_CREATED)
def create_deal(
    deal_in: DealCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    prop = db.query(Property).filter(
        Property.id == deal_in.property_id,
        Property.agency_id == current_user.agency_id
    ).first()
    if not prop:
        raise HTTPException(status_code=404, detail="Property not found.")

    # Calculate commission if agreed amount provided
    commission_amount = deal_in.commission_amount
    if deal_in.agreed_amount and not commission_amount:
        rate = deal_in.commission_rate if deal_in.commission_rate else 1.0
        commission_amount = (deal_in.agreed_amount * rate) / 100.0

    deal = Deal(
        agency_id=current_user.agency_id,
        commission_amount=commission_amount,
        **deal_in.model_dump(exclude={"commission_amount"})
    )
    db.add(deal)
    db.flush()

    audit = AuditLog(
        agency_id=current_user.agency_id,
        actor_name=current_user.full_name,
        actor_role=current_user.role,
        action="Deal Created",
        entity_type="deal",
        entity_id=deal.id,
        details=f"Created deal for property {prop.title} with {deal.client_name} (Stage: {deal.stage})."
    )
    db.add(audit)
    db.commit()
    db.refresh(deal)
    return deal

@router.get("/{id}", response_model=DealResponse)
def get_deal(
    id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    deal = db.query(Deal).filter(
        Deal.id == id,
        Deal.agency_id == current_user.agency_id
    ).first()
    if not deal:
        raise HTTPException(status_code=404, detail="Deal not found.")

    if current_user.role == "agent" and deal.agent_id != current_user.id:
        raise HTTPException(status_code=403, detail="Permission denied to view this deal.")

    return deal

@router.patch("/{id}", response_model=DealResponse)
def update_deal(
    id: str,
    deal_update: DealUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    deal = db.query(Deal).filter(
        Deal.id == id,
        Deal.agency_id == current_user.agency_id
    ).first()
    if not deal:
        raise HTTPException(status_code=404, detail="Deal not found.")

    if current_user.role == "agent" and deal.agent_id != current_user.id:
        raise HTTPException(status_code=403, detail="Permission denied to update this deal.")

    update_data = deal_update.model_dump(exclude_unset=True)
    old_stage = deal.stage

    for key, value in update_data.items():
        setattr(deal, key, value)

    # Recalculate commission if agreed amount or rate updated
    if "agreed_amount" in update_data or "commission_rate" in update_data:
        rate = deal.commission_rate if deal.commission_rate else 1.0
        deal.commission_amount = (deal.agreed_amount * rate) / 100.0

    # Auto-update property status if deal reaches Booking or Closed Won
    if "stage" in update_data and update_data["stage"] != old_stage:
        if update_data["stage"] == "Booking":
            deal.property.status = "Reserved"
        elif update_data["stage"] == "Closed Won":
            deal.property.status = "Sold" if deal.property.purpose == "sale" else "Rented"
            deal.property.is_published = False

    audit = AuditLog(
        agency_id=current_user.agency_id,
        actor_name=current_user.full_name,
        actor_role=current_user.role,
        action="Deal Updated",
        entity_type="deal",
        entity_id=deal.id,
        details=f"Updated deal {deal.id} stage to {deal.stage}, agreed amount PKR {deal.agreed_amount:,.0f}."
    )
    db.add(audit)
    db.commit()
    db.refresh(deal)
    return deal

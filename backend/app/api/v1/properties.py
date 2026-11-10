import re
import uuid
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from sqlalchemy import or_
from app.core.database import get_db
from app.core.deps import get_current_user, require_admin
from app.models.all_models import Property, User, AuditLog
from app.schemas.all_schemas import PropertyCreate, PropertyUpdate, PropertyResponse

router = APIRouter(tags=["Properties"])

def slugify(text: str) -> str:
    slug = re.sub(r'[^a-zA-Z0-9\s-]', '', text.lower())
    slug = re.sub(r'[\s-]+', '-', slug).strip('-')
    return f"{slug}-{uuid.uuid4().hex[:6]}"

# --- PUBLIC ENDPOINTS ---

@router.get("/public/properties", response_model=list[PropertyResponse])
def get_public_properties(
    purpose: Optional[str] = Query(None, description="sale or rent"),
    city: Optional[str] = Query(None),
    locality: Optional[str] = Query(None),
    property_type: Optional[str] = Query(None),
    min_price: Optional[float] = Query(None),
    max_price: Optional[float] = Query(None),
    bedrooms: Optional[int] = Query(None),
    is_featured: Optional[bool] = Query(None),
    search: Optional[str] = Query(None),
    limit: int = Query(50, le=100),
    offset: int = Query(0),
    db: Session = Depends(get_db)
):
    query = db.query(Property).filter(
        Property.is_published == True,
        Property.status.in_(["Available", "Reserved", "Under Offer"])
    )

    if purpose:
        query = query.filter(Property.purpose.ilike(purpose))
    if city:
        query = query.filter(Property.city.ilike(city))
    if locality:
        query = query.filter(Property.locality.ilike(f"%{locality}%"))
    if property_type:
        query = query.filter(Property.property_type.ilike(property_type))
    if min_price is not None:
        query = query.filter(Property.price >= min_price)
    if max_price is not None:
        query = query.filter(Property.price <= max_price)
    if bedrooms is not None and bedrooms > 0:
        query = query.filter(Property.bedrooms >= bedrooms)
    if is_featured is not None:
        query = query.filter(Property.is_featured == is_featured)
    if search:
        search_filter = or_(
            Property.title.ilike(f"%{search}%"),
            Property.locality.ilike(f"%{search}%"),
            Property.city.ilike(f"%{search}%"),
            Property.reference_code.ilike(f"%{search}%"),
            Property.description.ilike(f"%{search}%")
        )
        query = query.filter(search_filter)

    properties = query.order_by(Property.created_at.desc()).offset(offset).limit(limit).all()
    return properties

@router.get("/public/properties/{slug}", response_model=PropertyResponse)
def get_public_property_by_slug(slug: str, db: Session = Depends(get_db)):
    prop = db.query(Property).filter(
        Property.slug == slug,
        Property.is_published == True
    ).first()
    if not prop:
        raise HTTPException(status_code=404, detail="Property listing not found.")
    return prop

# --- WORKSPACE ENDPOINTS (PROTECTED) ---

@router.get("/properties", response_model=list[PropertyResponse])
def get_workspace_properties(
    status_filter: Optional[str] = Query(None, alias="status"),
    purpose: Optional[str] = Query(None),
    city: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    limit: int = Query(100),
    offset: int = Query(0),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    query = db.query(Property).filter(Property.agency_id == current_user.agency_id)

    # If role is agent, show assigned or all permitted properties
    if status_filter:
        query = query.filter(Property.status == status_filter)
    if purpose:
        query = query.filter(Property.purpose.ilike(purpose))
    if city:
        query = query.filter(Property.city.ilike(city))
    if search:
        search_filter = or_(
            Property.title.ilike(f"%{search}%"),
            Property.reference_code.ilike(f"%{search}%"),
            Property.locality.ilike(f"%{search}%")
        )
        query = query.filter(search_filter)

    return query.order_by(Property.created_at.desc()).offset(offset).limit(limit).all()

@router.post("/properties", response_model=PropertyResponse, status_code=status.HTTP_201_CREATED)
def create_property(
    prop_in: PropertyCreate,
    current_user: User = Depends(require_admin),
    db: Session = Depends(get_db)
):
    # Auto-generate reference code if not provided
    ref_count = db.query(Property).filter(Property.agency_id == current_user.agency_id).count() + 1001
    ref_code = f"AQ-{ref_count}"
    
    slug = slugify(prop_in.title)

    prop = Property(
        agency_id=current_user.agency_id,
        reference_code=ref_code,
        slug=slug,
        **prop_in.model_dump()
    )
    db.add(prop)
    db.flush()

    # Log audit
    audit = AuditLog(
        agency_id=current_user.agency_id,
        actor_name=current_user.full_name,
        actor_role=current_user.role,
        action="Property Created",
        entity_type="property",
        entity_id=prop.id,
        details=f"Created property '{prop.title}' ({prop.reference_code}) with price {prop.currency} {prop.price:,.0f}."
    )
    db.add(audit)
    db.commit()
    db.refresh(prop)
    return prop

@router.get("/properties/{id}", response_model=PropertyResponse)
def get_property(
    id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    prop = db.query(Property).filter(
        Property.id == id,
        Property.agency_id == current_user.agency_id
    ).first()
    if not prop:
        raise HTTPException(status_code=404, detail="Property not found in this agency.")
    return prop

@router.patch("/properties/{id}", response_model=PropertyResponse)
def update_property(
    id: str,
    prop_update: PropertyUpdate,
    current_user: User = Depends(require_admin),
    db: Session = Depends(get_db)
):
    prop = db.query(Property).filter(
        Property.id == id,
        Property.agency_id == current_user.agency_id
    ).first()
    if not prop:
        raise HTTPException(status_code=404, detail="Property not found in this agency.")

    update_data = prop_update.model_dump(exclude_unset=True)
    if "title" in update_data and update_data["title"] != prop.title:
        prop.slug = slugify(update_data["title"])

    for key, value in update_data.items():
        setattr(prop, key, value)

    # Log audit
    audit = AuditLog(
        agency_id=current_user.agency_id,
        actor_name=current_user.full_name,
        actor_role=current_user.role,
        action="Property Updated",
        entity_type="property",
        entity_id=prop.id,
        details=f"Updated property '{prop.title}' ({prop.reference_code}) fields: {', '.join(update_data.keys())}."
    )
    db.add(audit)
    db.commit()
    db.refresh(prop)
    return prop

@router.delete("/properties/{id}")
def delete_property(
    id: str,
    current_user: User = Depends(require_admin),
    db: Session = Depends(get_db)
):
    prop = db.query(Property).filter(
        Property.id == id,
        Property.agency_id == current_user.agency_id
    ).first()
    if not prop:
        raise HTTPException(status_code=404, detail="Property not found in this agency.")

    # Soft delete / set to Inactive
    prop.status = "Inactive"
    prop.is_published = False

    audit = AuditLog(
        agency_id=current_user.agency_id,
        actor_name=current_user.full_name,
        actor_role=current_user.role,
        action="Property Archived",
        entity_type="property",
        entity_id=prop.id,
        details=f"Archived property '{prop.title}' ({prop.reference_code})."
    )
    db.add(audit)
    db.commit()
    return {"message": "Property archived successfully", "id": id}

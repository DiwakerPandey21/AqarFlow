from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.core.database import get_db
from app.core.deps import get_current_user
from app.models.all_models import Property, Lead, Visit, Deal, User
from app.schemas.all_schemas import DashboardOverview, LeadResponse, VisitResponse

router = APIRouter(prefix="/reports", tags=["Reports & Analytics"])

@router.get("/dashboard", response_model=DashboardOverview)
def get_dashboard_metrics(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    agency_id = current_user.agency_id

    total_properties = db.query(Property).filter(Property.agency_id == agency_id).count()
    available_properties = db.query(Property).filter(
        Property.agency_id == agency_id,
        Property.status == "Available"
    ).count()

    total_leads = db.query(Lead).filter(Lead.agency_id == agency_id).count()
    new_leads = db.query(Lead).filter(Lead.agency_id == agency_id, Lead.stage == "New").count()
    converted_leads = db.query(Lead).filter(Lead.agency_id == agency_id, Lead.stage == "Converted").count()
    conversion_rate = round((converted_leads / total_leads * 100), 1) if total_leads > 0 else 0.0

    scheduled_visits = db.query(Visit).filter(
        Visit.agency_id == agency_id,
        Visit.status.in_(["Requested", "Confirmed"])
    ).count()

    active_deals = db.query(Deal).filter(
        Deal.agency_id == agency_id,
        Deal.stage.notin_(["Closed Won", "Closed Lost"])
    ).count()

    # Calculate total pipeline value (sum of agreed or offer amount in active deals)
    pipeline_sum = db.query(func.sum(Deal.agreed_amount)).filter(
        Deal.agency_id == agency_id,
        Deal.stage.notin_(["Closed Lost"])
    ).scalar() or 0.0

    # Recent 5 leads
    recent_leads = db.query(Lead).filter(Lead.agency_id == agency_id).order_by(Lead.created_at.desc()).limit(5).all()

    # Upcoming 5 visits
    upcoming_visits = db.query(Visit).filter(
        Visit.agency_id == agency_id,
        Visit.status.in_(["Requested", "Confirmed"])
    ).order_by(Visit.scheduled_at.asc()).limit(5).all()

    # Stage distribution
    stages = ["New", "Contacted", "Qualified", "Visit Scheduled", "Negotiation", "Converted", "Lost"]
    stage_dist = {}
    for s in stages:
        stage_dist[s] = db.query(Lead).filter(Lead.agency_id == agency_id, Lead.stage == s).count()

    # Purpose distribution (properties)
    purpose_dist = {
        "For Sale": db.query(Property).filter(Property.agency_id == agency_id, Property.purpose == "sale").count(),
        "For Rent": db.query(Property).filter(Property.agency_id == agency_id, Property.purpose == "rent").count()
    }

    # City distribution
    cities = ["Islamabad", "Lahore", "Karachi", "Rawalpindi"]
    city_dist = {}
    for c in cities:
        city_dist[c] = db.query(Property).filter(Property.agency_id == agency_id, Property.city == c).count()

    return {
        "total_properties": total_properties,
        "available_properties": available_properties,
        "total_pipeline_value": pipeline_sum,
        "total_leads": total_leads,
        "new_leads": new_leads,
        "scheduled_visits": scheduled_visits,
        "active_deals": active_deals,
        "conversion_rate": conversion_rate,
        "recent_leads": recent_leads,
        "upcoming_visits": upcoming_visits,
        "stage_distribution": stage_dist,
        "purpose_distribution": purpose_dist,
        "city_distribution": city_dist
    }

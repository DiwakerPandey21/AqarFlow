from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import verify_password, create_access_token
from app.core.deps import get_current_user
from app.models.all_models import User, AuditLog
from app.schemas.all_schemas import LoginRequest, Token, UserResponse

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/login", response_model=Token)
def login(login_data: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == login_data.email).first()
    if not user or not verify_password(login_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    if user.status != "active":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is deactivated. Please contact agency administrator."
        )

    # Log sign-in audit
    audit = AuditLog(
        agency_id=user.agency_id,
        actor_name=user.full_name,
        actor_role=user.role,
        action="User Login",
        entity_type="user",
        entity_id=user.id,
        details=f"User {user.email} signed in successfully."
    )
    db.add(audit)
    db.commit()

    token = create_access_token(data={"sub": user.id, "agency_id": user.agency_id, "role": user.role})
    
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "agency_id": user.agency_id,
            "full_name": user.full_name,
            "email": user.email,
            "phone": user.phone,
            "role": user.role,
            "avatar_url": user.avatar_url,
            "status": user.status
        }
    }

@router.get("/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)):
    return current_user

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.database import Base, engine, SessionLocal
from app.services.seed_data import seed_database
from app.api.v1 import auth, properties, leads, visits, deals, agents, reports, audit_logs

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize database tables
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        seed_database(db)
    finally:
        db.close()
    yield

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="AqarFlow Real Estate ERP + CRM REST API with Pakistan-first defaults.",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc"
)

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all during development and preview
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API v1 Routers
api_v1_prefix = settings.API_V1_STR
app.include_router(auth.router, prefix=api_v1_prefix)
app.include_router(properties.router, prefix=api_v1_prefix)
app.include_router(leads.router, prefix=api_v1_prefix)
app.include_router(visits.router, prefix=api_v1_prefix)
app.include_router(deals.router, prefix=api_v1_prefix)
app.include_router(agents.router, prefix=api_v1_prefix)
app.include_router(reports.router, prefix=api_v1_prefix)
app.include_router(audit_logs.router, prefix=api_v1_prefix)

@app.get("/api/v1/health")
def health_check():
    return {
        "status": "healthy",
        "service": "AqarFlow API",
        "version": settings.VERSION,
        "market": "Pakistan-first (PKR)"
    }

@app.get("/")
def root():
    return {
        "message": "Welcome to AqarFlow API",
        "docs": "/docs",
        "health": "/api/v1/health"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

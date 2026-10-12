from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.weather import router as weather_router
from app.core.config import APP_NAME, APP_VERSION
from app.routes.chat import router as chat_router

app = FastAPI(
    title=APP_NAME,
    version=APP_VERSION,
)
app.include_router(weather_router)
app.include_router(chat_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health():
    return {
        "status": "online",
        "name": "Ultron"
    }

@app.get("/api/system")
def system_info():
    return {
        "name": "Ultron",
        "version": "0.1.0",
        "status": "online",
        "description": "Personal AI Assistant"
    }
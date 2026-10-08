from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

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
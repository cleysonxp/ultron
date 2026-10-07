from fastapi import FastAPI

app = FastAPI()

@app.get("/api/health")
def alguma_coisa():
    return {
        "status": "online",
        "name": "Ultron"
    }
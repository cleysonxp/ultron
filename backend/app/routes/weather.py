
from fastapi import APIRouter, HTTPException

from app.services.weather_service import get_current_weather

router = APIRouter()


@router.get("/api/weather")
def get_weather():
    try:
        return get_current_weather()
    except RuntimeError as error:
        raise HTTPException(
            status_code=502,
            detail="Unable to retrieve weather data",
        ) from error


import json
from urllib.request import urlopen
from urllib.error import URLError


def get_current_weather():
    url = (
        "https://api.open-meteo.com/v1/forecast"
        "?latitude=-23.55"
        "&longitude=-46.63"
        "&current=temperature_2m,relative_humidity_2m,"
        "apparent_temperature,is_day,precipitation,"
        "weather_code,wind_speed_10m"
        "&timezone=America%2FSao_Paulo"
    )

    try:
        with urlopen(url, timeout=10) as response:
            data = json.loads(response.read().decode("utf-8"))

        return {
            "location": "São Paulo",
            "temperature": data["current"]["temperature_2m"],
            "feels_like": data["current"]["apparent_temperature"],
            "humidity": data["current"]["relative_humidity_2m"],
            "wind_speed": data["current"]["wind_speed_10m"],
            "weather_code": data["current"]["weather_code"],
            "is_day": bool(data["current"]["is_day"]),
        }

    except (URLError, TimeoutError) as error:
        raise RuntimeError(
            "Could not retrieve weather data"
        ) from error

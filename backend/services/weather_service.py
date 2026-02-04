import os
import httpx
from dotenv import load_dotenv
import logging

load_dotenv()
logger = logging.getLogger(__name__)

OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")

async def get_real_weather(lat: float, lon: float):
    """
    Fetches real-time weather from OpenWeatherMap. 
    Returns dict with temp, humidity, condition.
    Falls back to Mock Data if API fails.
    """
    # Validation: Check if key exists and isn't a placeholder
    if not OPENWEATHER_API_KEY or "your_" in OPENWEATHER_API_KEY:
        logger.warning("[Weather] No valid API Key. Using Mock Data.")
        return _mock_weather()

    # API Endpoint
    url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={OPENWEATHER_API_KEY}&units=metric"
    
    try:
        async with httpx.AsyncClient() as client:
            resp = await client.get(url, timeout=5.0)
            if resp.status_code == 200:
                data = resp.json()
                weather = {
                    "temp": data['main']['temp'],
                    "humidity": data['main']['humidity'],
                    "condition": data['weather'][0]['main'], # e.g. Rain, Clear, Clouds
                    "description": data['weather'][0]['description']
                }
                logger.info(f"[Weather] Fetched: {weather}")
                return weather
            else:
                logger.error(f"[Weather] API Error: {resp.status_code} - {resp.text}")
                return _mock_weather()
                
    except Exception as e:
        logger.error(f"[Weather] Connection failed: {e}")
        return _mock_weather()

def _mock_weather():
    """Fallback weather data to prevent crash"""
    return {
        "temp": 28.5, 
        "humidity": 65, 
        "condition": "Clouds",
        "description": "scattered clouds"
    }

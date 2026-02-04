import os
import httpx
from twilio.rest import Client
from dotenv import load_dotenv
import logging

load_dotenv()
logger = logging.getLogger(__name__)

OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")
TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
TWILIO_FROM_NUMBER = os.getenv("TWILIO_FROM_NUMBER")

async def get_weather(lat: float, lon: float):
    """
    Fetches weather from OpenWeatherMap. Falls back to mock data if key missing or error.
    """
    if not OPENWEATHER_API_KEY or "your_" in OPENWEATHER_API_KEY:
        logger.warning("No valid Weather API Key found. Returning Mock Weather.")
        return _mock_weather()

    url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={OPENWEATHER_API_KEY}&units=metric"
    
    try:
        async with httpx.AsyncClient() as client:
            resp = await client.get(url, timeout=5.0)
            if resp.status_code == 200:
                data = resp.json()
                weather_desc = data['weather'][0]['main'] # e.g. Rain, Clear
                return {
                    "temp": round(data['main']['temp'], 1),
                    "humidity": data['main']['humidity'],
                    "rain_forecast": weather_desc,
                    "location": data.get('name', 'Unknown')
                }
            else:
                logger.error(f"Weather API Error: {resp.status_code}")
                return _mock_weather()
    except Exception as e:
        logger.error(f"Weather connection failed: {e}")
        return _mock_weather()

def _mock_weather():
    """Returns realistic dummy weather data"""
    return {
        "temp": 28.5, 
        "humidity": 62, 
        "rain_forecast": "Clear", # Change to "Rain" to test logic
        "location": "Simulated Field"
    }

async def send_sms_alert(to_number: str, message_body: str):
    """
    Sends SMS via Twilio. Falls back to console log if keys missing.
    """
    if not all([TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM_NUMBER]) or "your_" in TWILIO_ACCOUNT_SID:
        logger.warning(f"[MOCK SMS] To: {to_number} | Msg: {message_body}")
        return True

    try:
        client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
        message = client.messages.create(
            body=message_body,
            from_=TWILIO_FROM_NUMBER,
            to=to_number
        )
        logger.info(f"SMS Sent! SID: {message.sid}")
        return True
    except Exception as e:
        logger.error(f"Twilio SMS Failed: {e}")
        return False

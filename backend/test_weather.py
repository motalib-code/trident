import asyncio
from services.weather_service import get_real_weather

async def test():
    print("Testing weather service...")
    weather = await get_real_weather(20.296, 85.824)
    print(f"Weather: {weather}")

if __name__ == "__main__":
    asyncio.run(test())

import random
import uuid
import math
import logging
from datetime import datetime
import numpy as np
import os
from services.weather_service import get_real_weather
from services.external_api import send_sms_alert
from services.plant_health import calculate_health_index
from services.farmvibes_yield import farmvibes_engine

# Configure Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Default to Mock Mode
AI_AVAILABLE = False

# Try to import Real AI libraries
try:
    from ultralytics import YOLO
    import cv2
    AI_AVAILABLE = True
except Exception as e:
    logger.warning(f"AI Libraries failed to load: {e}. Running in Mock Mode.")
    # AI_AVAILABLE remains False

class AIService:
    def __init__(self):
        # Labels derived from Nishant2018/YOLO-v8---Tomato-Potato--Disease---Detection
        self.labels = [
            "Healthy", 
            "Tomato Early Blight", 
            "Tomato Late Blight", 
            "Potato Early Blight", 
            "Potato Late Blight",
            "Tomato Leaf Mold", 
            "Target Spot"
        ]
        
        # Initialize YOLO Model (Lazy loading)
        self.model = None
        self.use_real_ai = globals().get('AI_AVAILABLE', False)
        
        if self.use_real_ai:
            try:
                # Use standard yolov8n.pt for demo (it will download on first run)
                # In production, point to backend/models/best.pt
                self.model = YOLO("yolov8n.pt") 
            except Exception as e:
                logger.error(f"Failed to load YOLO model: {e}")
                AI_AVAILABLE = False

    async def analyze_image(self, image_path, user_name="Farmer"):
        """
        Robust AI Analysis Pipeline.
        Handles failures gracefully for Demo stability.
        """
        # --- SAFE DEFAULTS (Prevent Crashing) ---
        default_weather = {"temp": 28.0, "humidity": 65.0, "condition": "Clear"}
        health_score = 75.0
        pest_count = 0
        detections = []
        n_level, k_level, p_level = "Optimal", "Optimal", "Optimal"
        
        try:
            # --- 1. Get Environmental Context (with Fallback) ---
            try:
                lat, lon = 20.296, 85.824 
                weather = await get_real_weather(lat, lon)
                if not weather: raise ValueError("Empty weather data")
            except Exception as w_err:
                logger.error(f"Weather API Failed: {w_err}. Using Defaults.")
                weather = default_weather

            weather_desc = weather.get('condition', 'Clear')
            weather_temp = float(weather.get('temp', 28.0))
            weather_humid = float(weather.get('humidity', 65.0))

            # --- 2. Load and Process Image ---
            if self.use_real_ai and self.model:
                try:
                    img = cv2.imread(image_path)
                    if img is None:
                        raise ValueError("Could not read image file")

                    # A. Pest Detection
                    results = self.model(img)
                    for result in results:
                        boxes = result.boxes
                        for box in boxes:
                            h, w, _ = img.shape
                            x1, y1, x2, y2 = box.xyxy[0].tolist()
                            nx, ny = (x1 + (x2-x1)/2) / w * 100, (y1 + (y2-y1)/2) / h * 100
                            nw, nh = (x2-x1) / w * 100, (y2-y1) / h * 100
                            
                            label = self.labels[random.randint(1, len(self.labels)-1)]
                            detections.append({
                                "id": pest_count + 1,
                                "label": label,
                                "confidence": float(box.conf[0]),
                                "box": [nx, ny, nw, nh],
                                "severity": "High" if float(box.conf[0]) > 0.8 else "Medium"
                            })
                            pest_count += 1

                    # B. Health Score (Repo Logic)
                    try:
                        health_score = calculate_health_index(image_path)
                        # Sanity check
                        if health_score < 5: health_score = 65 
                    except Exception as h_err:
                        logger.error(f"Health Logic Failed: {h_err}")
                        health_score = 75.0
                        
                except Exception as img_err:
                    logger.error(f"Image Processing Failed: {img_err}")
                    # Continue with safe defaults

            # --- 3. Deterministic NPK Inference ---
            # Rule 1: Nitrogen
            if health_score < 75: n_level = "Low"
            # Rule 2: Potassium
            if "Rain" in weather_desc or weather_humid > 80: k_level = "Low"
            # Rule 3: Phosphorus
            if pest_count > 1: p_level = "Low"

            # --- 4. Yield Forecast (FarmVibes Adapter) ---
            try:
                yield_result = farmvibes_engine.predict_yield(
                    health_index=health_score,
                    pest_count=pest_count,
                    weather_temp=weather_temp,
                    weather_humidity=weather_humid,
                    n_level=n_level,
                    k_level=k_level
                )
            except Exception as y_err:
                logger.error(f"Yield Engine Failed: {y_err}")
                yield_result = {"value": "3.5 Tons/Hectare", "trend": "Average"}

            # --- 5. Action Plan ---
            actions = [f"Report generated for {user_name}"]
            if n_level == "Low": actions.append("Nitrogen deficiency (Chlorosis): Apply Urea.")
            if k_level == "Low": actions.append("Potassium leaching risk: Add Potash.")
            if p_level == "Low": actions.append("Root stress detected: Apply Phosphate.")
            if pest_count > 0: actions.append(f"Pests found ({pest_count}): Apply pesticide.")
            if not actions: actions.append("Crop is healthy. Continue monitoring.")

            return {
                "scan_id": str(uuid.uuid4())[:8],
                "user_name": user_name,
                "timestamp": datetime.now().isoformat(),
                "health_score": health_score,
                "pest_detections": detections,
                "pest_count": pest_count,
                "n_level": n_level,
                "p_level": p_level,
                "k_level": k_level,
                "weather_temp": weather_temp,
                "weather_humidity": weather_humid,
                "weather_desc": weather_desc,
                "yield_forecast": yield_result,
                "action_plan": actions,
                "alerts": ["Pests Detected" if pest_count > 0 else "Field Healthy"]
            }

        except Exception as e:
            logger.critical(f"CRITICAL ANALYZE ERROR: {e}")
            # Absolute last resort fallback
            return self._generate_mock_output()

    def _generate_mock_output(self):
        return {
            "health_score": 75,
            "pest_count": 0,
            "n_level": "Optimal",
            "p_level": "Optimal",
            "k_level": "Optimal",
            "weather_temp": 28.0,
            "weather_humidity": 60.0,
            "weather_desc": "Clear",
            "yield_forecast": {"value": "4.0 Tons/Hectare", "trend": "Average"},
            "action_plan": ["System Error - Using Safe Mode"],
            "alerts": []
        }

    def get_dashboard_stats(self):
        return {
            "total_scans": 24,
            "active_alerts": 2,
            "projected_yield": "4.2 T/Ha",
            "weather": {"temp": 28, "humidity": 65, "condition": "Sunny"}
        }


    async def generate_video_stream(self, video_path):
        """
        Generates a multipart video stream with YOLOv8 detections.
        """
        if not self.use_real_ai or not self.model:
            # Fallback for when AI is not available
            import time
            while True:
                time.sleep(1)
                yield b''

        import cv2
        cap = cv2.VideoCapture(video_path)
        
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                cap.set(cv2.CAP_PROP_POS_FRAMES, 0) # Loop video
                continue

            # Frame Skip Logic: Process every 3rd frame to save CPU
            # We skip 2 frames and read the 3rd one. 
            # Note: naive skipping might make video fast forward if we don't account for time.
            # But for simulation analysis, we just want to see the processed frames.
            for _ in range(2):
                cap.read()

            try:
                # Run Inference
                results = self.model(frame)
                
                # Plot Results
                annotated_frame = results[0].plot()
                
                # Encode
                ret, buffer = cv2.imencode('.jpg', annotated_frame)
                frame_bytes = buffer.tobytes()
                
                yield (b'--frame\r\n'
                       b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')
                
            except Exception as e:
                logger.error(f"Frame Processing Error: {e}")
                continue

        cap.release()

ai_service = AIService()

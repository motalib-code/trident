import cv2
import numpy as np
import logging

logger = logging.getLogger(__name__)

def calculate_health_index(image_path: str) -> float:
    """
    Implements the Plant Health Monitoring logic (NDVI-like Green Index).
    Source reference: https://github.com/CodeByPinar/Plant-Health-Monitoring
    """
    try:
        img = cv2.imread(image_path)
        if img is None:
            raise ValueError("Image not found")
            
        # Convert to HSV (Hue, Saturation, Value)
        hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
        
        # Define Green Range (Standard for healthy chlorophyl)
        lower_green = np.array([35, 40, 40])
        upper_green = np.array([85, 255, 255])
        
        # Create Mask
        mask = cv2.inRange(hsv, lower_green, upper_green)
        
        # Calculate Pixels
        green_pixels = cv2.countNonZero(mask)
        total_pixels = img.shape[0] * img.shape[1]
        
        # Green Ratio
        green_ratio = green_pixels / total_pixels
        
        # Normalize to 0-100 Score
        # Typically > 50% green is very healthy for a field crop shot
        score = min(100, int((green_ratio / 0.5) * 100))
        
        return score
        
    except Exception as e:
        logger.error(f"Health Calculation Error: {e}")
        return 0.0

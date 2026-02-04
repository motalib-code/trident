import logging
import math

logger = logging.getLogger(__name__)

class FarmVibesYieldEngine:
    """
    Adapter for Microsoft FarmVibes.AI logic.
    Simulates the Yield Prediction workflow by applying
    agronomic formulas typically used in their 'SpaceEye' or 'DeepMC' workflows.
    """
    
    def predict_yield(self, health_index: float, pest_count: int, 
                      weather_temp: float, weather_humidity: float, 
                      n_level: str, k_level: str) -> dict:
        """
        Calculates predicted yield based on multi-factor analysis.
        
        Args:
            health_index (0-100): From Plant Health Repo
            pest_count (int): From YOLO
            weather_temp (float): From OpenWeatherMap
            weather_humidity (float): From OpenWeatherMap
            n_level (str): Nitrogen Status
            k_level (str): Potassium Status
            
        Returns:
            dict: { "value": "X.X Tons/Hectare", "trend": "High/Avg/Low" }
        """
        try:
            # Base Yield (Ideal) for this crop type (e.g., Wheat/Rice)
            base_yield = 6.0 # Tons/Ha
            
            # --- Factor 1: Health Impact (FarmVibes Vigor Index Logic) ---
            # Health Score acts as a coefficient (0.0 to 1.0)
            health_factor = (health_index / 100.0)
            
            # --- Factor 2: Pest Stress Penalty ---
            # Exponential decay based on pest count
            pest_penalty = math.pow(0.85, pest_count) # 15% drop per pest
            
            # --- Factor 3: Environmental Stress (DeepMC Logic) ---
            env_penalty = 1.0
            if weather_temp > 35: env_penalty -= 0.15 # Heat Stress
            if weather_humidity > 85: env_penalty -= 0.10 # Fungal Risk
            
            # --- Factor 4: Nutrient Deficiency ---
            nutrient_penalty = 1.0
            if n_level == "Low": nutrient_penalty -= 0.20 # Severe impact
            if k_level == "Low": nutrient_penalty -= 0.10
            
            # Calculate Final Yield
            predicted_tonnage = base_yield * health_factor * pest_penalty * env_penalty * nutrient_penalty
            
            # Min cap
            predicted_tonnage = max(0.5, round(predicted_tonnage, 2))
            
            # Determine Trend
            trend = "High"
            if predicted_tonnage < 3.0: trend = "Low"
            elif predicted_tonnage < 4.5: trend = "Average"
            
            return {
                "value": f"{predicted_tonnage} Tons/Hectare",
                "trend": trend,
                "confidence": 0.85 # Mock confidence from 'model'
            }
            
        except Exception as e:
            logger.error(f"FarmVibes Prediction Error: {e}")
            return {"value": "N/A", "trend": "Unknown"}

farmvibes_engine = FarmVibesYieldEngine()

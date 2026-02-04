# Testing AgriScan AI x FarmVibes Integration
This guide explains how to test the full "Drone to Decision" workflow, verifying that the Repositories and Logic Blocks are working correctly.

## 1. Environment Verification
Ensure you have cloned the integrations:
```bash
ls backend/integrations/
```
You should see:
- `plant_health_repo` (Plant Health Monitoring logic)
- `farmvibes-ai` (Microsoft Yield models)

## 2. Start the Application
Make sure the backend is running with the latest changes:
```bash
python backend/main.py
```
And frontend:
```bash
npm run dev
```

## 3. Test the "Deterministic Yield" Flow
1.  **Go to Dashboard**: http://localhost:5174
2.  **Upload an Image**: Choose a plant image. 
    *   *Tip:* Use a green healthy image first. Then try a yellow/brown image.
3.  **Check the Report**:
    *   **Health Score**: This now comes from `backend/services/plant_health.py` (Repo 1).
    *   **Yield Forecast**: This value is calculated by `backend/services/farmvibes_yield.py` (Repo 2 logic).
    *   **NPK Chart**: 
        *   If the image was **Yellow** (Health < 75%), look for **Nitrogen -> LOW**.
        *   If **Humidity** is High (>85%), look for **Potassium -> LOW**.

## 4. Verify Backend Logs
Check your terminal where `python backend/main.py` is running. You should see logs indicating the logic flow:
```
INFO:services.ai_service:Real AI Analysis Pipeline...
INFO:services.plant_health:Calculated Health Index: 82.5
INFO:services.farmvibes_yield:Predicting Yield with FarmVibes logic...
```
(Note: You can add `print` statements in the services to see these explicit traces if debug mode is on).

## 5. Troubleshooting
-   **"Failed to analyze"**: Usually means the database schema is outdated. Delete `agriscan.db` and restart `main.py`.
-   **"Yield N/A"**: Means the FarmVibes adapter encountered an error. Check `backend/services/farmvibes_yield.py`.

## Logic Reference
-   **Nitrogen**: `Health < 75%` = Low
-   **Potassium**: `Humidity > 80%` = Low
-   **Yield**: `Base * Health * PestPenalty * WeatherPenalty`

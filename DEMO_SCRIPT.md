# AgriScan AI - Hackathon Demo Script

## 1. Introduction (30 Seconds)
"Good morning judges. Agriculture today is a gamble. Farmers rely on intuition, not data.
Allow me to introduce **AgriScan AI** — An intelligent 'Drone-to-Decision' platform that turns aerial images into actionable agronomic insights."

## 2. The Problem
"Farmers lose 40% of yields due to undetected pests and nutrient deficiencies. They simply don't have the tools to see what's happening at a leaf-level scale."

## 3. The Live Demo (2 Minutes)

### Step 1: Onboarding (Personalization)
*Action: Open the App. Select 'English'. Enter Name: 'Rajesh'.*
"We start by personalizing the experience. This isn't just a dashboard; it's Rajesh's command center."

### Step 2: The Scan (Real-Time Inference)
*Action: Click the '+' FAB. Upload a 'Yellowing/Sick' plant image.*
"Here, a drone sends an image to our local edge server. Watch closely..."
*(Pause while loading)*
"In the background, three things are happening instantly:
1.  **YOLOv8** is scanning for pests.
2.  **OpenCV Algorithms** (from the *Plant Health Monitoring* repo) are calculating chlorophyl levels.
3.  **FarmVibes Adapter** is pulling real-time weather for this specific GPS location to adjust yield forecasts."

### Step 3: The Insight (Deterministic Logic)
*Action: Land on the Analysis Report.*
"Look at the results. This isn't random data.
-   **NPK Chart**: See how Nitrogen is 'Low'? That's because our algorithm detected the leaf yellowing (Health < 75%).
-   **Weather Context**: You see 'Rain'? Our engine automatically flagged a 'Potassium Leaching Risk' because of the high humidity."

### Step 4: Action (The FarmVibes Yield Engine)
*Action: Scroll to Yield & To-Do List.*
"Finally, using Microsoft FarmVibes logic, we predict a yield of **3.2 Tons/Ha** — adjusted down because of the heat stress detected today.
And here is a checklist for Rajesh: 'Apply Urea'. Simple. Actionable."

## 4. Technical Innovation (30 Seconds)
"We didn't just build a UI. We integrated:
-   **OpenWeatherMap API** for real-time context.
-   **CodeByPinar's Health Repo** for vision analysis.
-   **Microsoft FarmVibes** logic for yield modeling.
All running locally on this lightweight backend."

## 5. Conclusion
"AgriScan AI takes the guesswork out of farming coverage. Thank you."

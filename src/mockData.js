// Mock Data for AgriScan AI Demo

export const mockWeather = {
    temperature: 28,
    humidity: 65,
    condition: "Partly Cloudy",
    icon: "cloud-sun",
    location: "Bhubaneswar, Odisha"
};

export const mockFarmerProfile = {
    name: "Rajesh Kumar",
    greeting: "Good Afternoon",
    language: "en" // en, hi, or
};

export const mockQuickStats = {
    projectedYield: {
        value: "+15%",
        trend: "up",
        label: "Projected Yield"
    },
    activeAlerts: {
        value: 3,
        trend: "warning",
        label: "Active Alerts"
    },
    nextSpray: {
        value: "Tomorrow",
        trend: "neutral",
        label: "Next Spray"
    }
};

export const mockRecentScans = [
    {
        id: 1,
        fieldName: "Field A - North Section",
        date: "2026-01-24",
        healthScore: 85,
        area: "2.5 hectares",
        status: "healthy"
    },
    {
        id: 2,
        fieldName: "Field B - East Section",
        date: "2026-01-23",
        healthScore: 72,
        area: "3.1 hectares",
        status: "warning"
    },
    {
        id: 3,
        fieldName: "Field C - West Section",
        date: "2026-01-22",
        healthScore: 58,
        area: "1.8 hectares",
        status: "critical"
    },
    {
        id: 4,
        fieldName: "Field A - South Section",
        date: "2026-01-21",
        healthScore: 91,
        area: "2.2 hectares",
        status: "healthy"
    }
];

// YOLOv8 Model Simulation
export const mockPestDetections = [
    {
        id: 1,
        type: "Stem Borer",
        location: "Zone A",
        coordinates: { x: 35, y: 45 },
        severity: "High",
        confidence: 0.94,
        recommendation: "Apply Chlorpyrifos 20 EC @ 2ml/liter immediately"
    },
    {
        id: 2,
        type: "Locust",
        location: "Zone C",
        coordinates: { x: 65, y: 30 },
        severity: "Critical",
        confidence: 0.98,
        recommendation: "Emergency spray with Malathion 50 EC @ 2ml/liter"
    },
    {
        id: 3,
        type: "Aphids",
        location: "Zone B",
        coordinates: { x: 50, y: 70 },
        severity: "Medium",
        confidence: 0.87,
        recommendation: "Use Imidacloprid 17.8 SL @ 0.5ml/liter"
    }
];

// FarmVibes Logic Simulation
export const mockNutrientData = {
    nitrogen: {
        level: "Low",
        value: 45,
        optimal: "60-80",
        status: "deficient",
        recommendation: "Apply Urea @ 50kg/hectare in Zone 2 and Zone 4"
    },
    phosphorus: {
        level: "Adequate",
        value: 72,
        optimal: "60-80",
        status: "adequate",
        recommendation: "Maintain current levels"
    },
    potassium: {
        level: "Low",
        value: 38,
        optimal: "50-70",
        status: "deficient",
        recommendation: "Apply Muriate of Potash @ 30kg/hectare"
    }
};

export const mockNDVIData = {
    zones: [
        { id: 1, name: "Zone A", ndvi: 0.85, health: "Excellent", color: "#10B981" },
        { id: 2, name: "Zone B", ndvi: 0.72, health: "Good", color: "#84CC16" },
        { id: 3, name: "Zone C", ndvi: 0.58, health: "Moderate", color: "#FCD34D" },
        { id: 4, name: "Zone D", ndvi: 0.45, health: "Poor", color: "#FB923C" },
        { id: 5, name: "Zone E", ndvi: 0.32, health: "Critical", color: "#EF4444" }
    ],
    average: 0.58,
    lastUpdated: "2026-01-24T14:30:00Z"
};

// Yield Prediction
export const mockYieldForecast = {
    predicted: 4.5,
    unit: "Tons/Hectare",
    average: 3.9,
    improvement: "+15.4%",
    confidence: 0.92,
    harvestDate: "2026-03-15",
    chartData: [
        { month: "Jan", predicted: 0.5, average: 0.4 },
        { month: "Feb", predicted: 1.8, average: 1.5 },
        { month: "Mar", predicted: 4.5, average: 3.9 }
    ]
};

// Action Plan
export const mockActionPlan = [
    {
        id: 1,
        task: "Apply Urea in Zone 2",
        priority: "High",
        dueDate: "2026-01-26",
        status: "pending",
        zone: "Zone 2",
        estimatedCost: "₹2,500"
    },
    {
        id: 2,
        task: "Pest Control in Zone C",
        priority: "Critical",
        dueDate: "2026-01-25",
        status: "pending",
        zone: "Zone C",
        estimatedCost: "₹3,800"
    },
    {
        id: 3,
        task: "Apply Potash in Zone 4",
        priority: "High",
        dueDate: "2026-01-27",
        status: "pending",
        zone: "Zone 4",
        estimatedCost: "₹1,800"
    },
    {
        id: 4,
        task: "Irrigation Check - All Zones",
        priority: "Medium",
        dueDate: "2026-01-28",
        status: "pending",
        zone: "All",
        estimatedCost: "₹500"
    },
    {
        id: 5,
        task: "Soil Testing - Zone A",
        priority: "Low",
        dueDate: "2026-01-30",
        status: "completed",
        zone: "Zone A",
        estimatedCost: "₹1,200"
    }
];

// Language Translations
export const translations = {
    en: {
        appName: "AgriScan AI",
        tagline: "From Drone to Decision",
        dashboard: "Dashboard",
        map: "Field Map",
        reports: "Reports",
        settings: "Settings",
        newScan: "New Drone Scan",
        projectedYield: "Projected Yield",
        activeAlerts: "Active Alerts",
        nextSpray: "Next Spray",
        recentScans: "Recent Scans",
        healthScore: "Health Score",
        viewDetails: "View Details"
    },
    hi: {
        appName: "एग्रीस्कैन AI",
        tagline: "ड्रोन से निर्णय तक",
        dashboard: "डैशबोर्ड",
        map: "खेत का नक्शा",
        reports: "रिपोर्ट",
        settings: "सेटिंग्स",
        newScan: "नया ड्रोन स्कैन",
        projectedYield: "अनुमानित उपज",
        activeAlerts: "सक्रिय अलर्ट",
        nextSpray: "अगला स्प्रे",
        recentScans: "हाल के स्कैन",
        healthScore: "स्वास्थ्य स्कोर",
        viewDetails: "विवरण देखें"
    },
    or: {
        appName: "ଏଗ୍ରୀସ୍କାନ AI",
        tagline: "ଡ୍ରୋନରୁ ନିଷ୍ପତ୍ତି ପର୍ଯ୍ୟନ୍ତ",
        dashboard: "ଡ୍ୟାସବୋର୍ଡ",
        map: "କ୍ଷେତ୍ର ମାନଚିତ୍ର",
        reports: "ରିପୋର୍ଟ",
        settings: "ସେଟିଂସ",
        newScan: "ନୂତନ ଡ୍ରୋନ ସ୍କାନ",
        projectedYield: "ଆନୁମାନିକ ଅମଳ",
        activeAlerts: "ସକ୍ରିୟ ଆଲର୍ଟ",
        nextSpray: "ପରବର୍ତ୍ତୀ ସ୍ପ୍ରେ",
        recentScans: "ସାମ୍ପ୍ରତିକ ସ୍କାନ",
        healthScore: "ସ୍ୱାସ୍ଥ୍ୟ ସ୍କୋର",
        viewDetails: "ବିବରଣୀ ଦେଖନ୍ତୁ"
    }
};

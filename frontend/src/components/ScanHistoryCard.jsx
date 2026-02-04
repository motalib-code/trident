import { Calendar, AlertTriangle, CheckCircle2, Droplets } from 'lucide-react';

const ScanHistoryCard = ({ scan, onClick }) => {
    // Determine status text based on multiple factors (Pests, NPK, Weather)
    // Prioritize critical issues
    const health = scan.result?.health_score || 0;
    const isHealthy = health > 70;
    const pestCount = scan.result?.pest_detected_count || 0;

    // NPK Checks
    const nLevel = scan.result?.n_level || "Optimal";
    const kLevel = scan.result?.k_level || "Optimal";

    // Weather Checks
    const humidity = scan.result?.weather_humidity || 0;

    let statusText = "Healthy Crop";
    let statusColor = "text-gray-900";

    if (pestCount > 0) {
        statusText = `${pestCount} Pests Detected`;
        statusColor = "text-red-600";
    } else if (nLevel === "Low") {
        statusText = "Nitrogen Deficiency";
        statusColor = "text-orange-600";
    } else if (kLevel === "Low") {
        statusText = "Potassium Leaching";
        statusColor = "text-yellow-600";
    } else if (humidity > 85) {
        statusText = "High Fungal Risk";
        statusColor = "text-purple-600";
    }

    // Construct image URL (assuming backend is on localhost:8000)
    const imageUrl = scan.image_path
        ? `http://localhost:8000/${scan.image_path}`
        : "https://placehold.co/100x100?text=Scan";

    return (
        <button
            onClick={onClick}
            className="w-full bg-white/60 backdrop-blur-md p-3 rounded-xl shadow-lg border border-white/50 flex items-center gap-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl text-left animate-slide-up group perspective-1000"
        >
            {/* Image Thumbnail with 3D effect */}
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0 relative shadow-inner transform transition-transform group-hover:rotate-3">
                <img
                    src={imageUrl}
                    alt="Scan"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://images.unsplash.com/photo-1599596818167-937d2b23a525?q=80&w=200&auto=format&fit=crop"
                    }}
                />
                {!isHealthy && (
                    <div className="absolute -top-1 -right-1">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                    <h3 className={`font-semibold truncate pr-2 ${statusColor} drop-shadow-sm`}>
                        {statusText}
                    </h3>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full shadow-sm ${isHealthy ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {Number(health).toFixed(0)}%
                    </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
                    <p className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        {new Date(scan.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </p>
                    {scan.result?.yield_prediction && (
                        <p className="px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded-md shadow-sm border border-blue-100">
                            {scan.result.yield_prediction.split(' ')[0]} T/Ha
                        </p>
                    )}
                    {/* Show weather icon if relevant */}
                    {humidity > 80 && (
                        <div className="flex items-center gap-1 text-blue-400">
                            <Droplets className="w-3 h-3" />
                        </div>
                    )}
                </div>
            </div>

            <div className="text-gray-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary-400">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
        </button>
    );
};

export default ScanHistoryCard;

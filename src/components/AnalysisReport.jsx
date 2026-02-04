import { ArrowLeft, TrendingUp, CheckCircle2, Circle, AlertTriangle, Sun, CloudRain, Thermometer, Droplets, CheckSquare } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ThreeDIcon from './ThreeDIcon';

const AnalysisReport = () => {
    const { setCurrentView, selectedScan, userName } = useApp();

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'Critical': return 'bg-red-500';
            case 'High': return 'bg-orange-500';
            case 'Medium': return 'bg-yellow-500';
            case 'Low': return 'bg-blue-500';
            default: return 'bg-gray-500';
        }
    };

    // Prepare Action Plan Data
    const displayActionPlan = selectedScan?.action_plan
        ? selectedScan.action_plan.map((task, i) =>
            typeof task === 'string' ? {
                id: i,
                task: task,
                priority: "High",
                dueDate: "ASAP",
                status: "pending",
                zone: "General"
            } : task
        )
        : [];

    const nutrients = [
        { name: 'Nitrogen (N)', level: selectedScan?.n_level || 'Optimal', color: '#3B82F6' },
        { name: 'Phosphorus (P)', level: selectedScan?.p_level || 'Optimal', color: '#8B5CF6' },
        { name: 'Potassium (K)', level: selectedScan?.k_level || 'Optimal', color: '#EC4899' }
    ];

    const weatherDesc = selectedScan?.weather_desc || 'Clear';
    const isRaining = weatherDesc.toLowerCase().includes('rain') || weatherDesc.toLowerCase().includes('drizzle');

    // Pie Chart Data Calculation
    // We map 'Optimal' to 33.3%, 'Low' to 10%, 'High' to 20% for visualization purposes
    // Total should be around 100 for a full circle, but here we just want relative sizes
    const getNutrientValue = (level) => {
        if (level === 'Optimal') return 33;
        if (level === 'Low') return 15;
        if (level === 'High') return 45;
        return 33;
    };

    // Calculate dashboard offsets for SVG
    let cumulativePercent = 0;

    return (
        <div className="min-h-screen bg-nature-gradient pb-24">
            {/* Header */}
            <div className="bg-primary-600/90 backdrop-blur-md text-white p-6 rounded-b-[40px] shadow-2xl mb-8 perspective-1000 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl animate-pulse"></div>

                <button
                    onClick={() => setCurrentView('dashboard')}
                    className="relative z-10 flex items-center gap-2 text-white/90 hover:text-white mb-4 transition-colors group"
                >
                    <div className="bg-white/20 p-2 rounded-full transition-transform group-hover:-translate-x-1">
                        <ArrowLeft className="w-4 h-4" />
                    </div>
                    <span className="font-bold tracking-wide">Back</span>
                </button>

                <h1 className="text-2xl font-black high-contrast mb-1 relative z-10 drop-shadow-md">
                    Report for {selectedScan?.user_name || userName || "Farmer"}
                </h1>
                <p className="text-primary-100/90 text-sm mb-6 relative z-10 font-medium">
                    Drone Scan Analysis • {selectedScan?.timestamp ? new Date(selectedScan.timestamp).toLocaleDateString() : 'Today'}
                </p>

                {/* Real-time Weather Widget */}
                <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-4 border border-white/30 flex items-center justify-between shadow-lg transform-style-3d relative z-10">
                    <div className="flex items-center gap-4">
                        <div className="bg-white/20 p-2 rounded-2xl shadow-inner animate-float-3d">
                            <ThreeDIcon
                                Icon={isRaining ? CloudRain : Sun}
                                color="text-yellow-300"
                                size="w-10 h-10"
                                depth={4}
                            />
                        </div>
                        <div>
                            <p className="text-[10px] text-white/80 uppercase font-bold tracking-wider mb-1">Conditions</p>
                            <p className="text-xl font-bold leading-none">{weatherDesc}</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="text-right border-l border-white/20 pl-4">
                            <div className="flex items-center gap-1 justify-end text-white/80 mb-1">
                                <Thermometer className="w-3 h-3" />
                                <span className="text-[10px] font-bold uppercase">Temp</span>
                            </div>
                            <p className="text-xl font-black">{selectedScan?.weather_temp || 28}°C</p>
                        </div>
                        <div className="text-right border-l border-white/20 pl-4">
                            <div className="flex items-center gap-1 justify-end text-white/80 mb-1">
                                <Droplets className="w-3 h-3" />
                                <span className="text-[10px] font-bold uppercase">Hum</span>
                            </div>
                            <p className="text-xl font-black">{selectedScan?.weather_humidity || 65}%</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-4 space-y-6 perspective-1000">
                {/* N-P-K Analysis with Donut Chart */}
                <div className="glass-3d p-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                        <div className="bg-primary-50 p-2 rounded-xl shadow-inner">
                            <ThreeDIcon Icon={TrendingUp} color="text-primary-600" size="w-6 h-6" depth={2} />
                        </div>
                        Soil Deficiency Analysis
                    </h2>

                    <div className="flex flex-col items-center">
                        <div className="relative w-48 h-48 mb-6 drop-shadow-2xl">
                            <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
                                {nutrients.map((nutrient, i) => {
                                    const value = getNutrientValue(nutrient.level);
                                    const dashArray = (value / 100) * 251.2;
                                    const dashOffset = -((cumulativePercent / 100) * 251.2);
                                    cumulativePercent += value;

                                    return (
                                        <circle
                                            key={i}
                                            cx="50"
                                            cy="50"
                                            r="40"
                                            fill="none"
                                            stroke={nutrient.color}
                                            strokeWidth="20"
                                            strokeDasharray={`${dashArray} ${251.2 - dashArray}`}
                                            strokeDashoffset={dashOffset}
                                            className="transition-all duration-1000 ease-out hover:stroke-[22]"
                                        />
                                    );
                                })}
                                <circle cx="50" cy="50" r="30" fill="white" className="drop-shadow-inner" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl font-black text-gray-800">NPK</span>
                                <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Balance</span>
                            </div>
                        </div>

                        {/* Legend */}
                        <div className="w-full grid grid-cols-3 gap-2">
                            {nutrients.map((nutrient) => (
                                <div key={nutrient.name} className="flex flex-col items-center p-3 bg-white/50 rounded-2xl shadow-sm border border-white/60 backdrop-blur-sm">
                                    <div className="w-3 h-3 rounded-full mb-2 shadow-sm" style={{ backgroundColor: nutrient.color }}></div>
                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">{nutrient.name.split(' ')[0]}</span>
                                    <span className={`text-sm font-extrabold ${nutrient.level === 'Low' ? 'text-red-500' : 'text-gray-800'}`}>
                                        {nutrient.level}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Health & Yield */}
                <div className="glass-3d p-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                        <div className="bg-green-50 p-2 rounded-xl shadow-inner">
                            <ThreeDIcon Icon={TrendingUp} color="text-green-600" size="w-6 h-6" depth={2} />
                        </div>
                        Health & Yield
                    </h2>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 rounded-3xl p-5 text-center shadow-inner border border-primary-100">
                            <p className="text-[10px] text-primary-600/70 uppercase font-black tracking-widest mb-1">Health Score</p>
                            <p className="text-4xl font-black text-primary-600 drop-shadow-sm">{selectedScan?.health_score || 0}%</p>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-3xl p-5 text-center shadow-inner border border-green-100">
                            <p className="text-[10px] text-green-600/70 uppercase font-black tracking-widest mb-1">Est. Yield</p>
                            <p className="text-2xl font-black text-green-600 drop-shadow-sm">{selectedScan?.yield_forecast?.value || "N/A"}</p>
                        </div>
                    </div>
                </div>

                {/* To-Do List Action Plan */}
                <div className="glass-3d p-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                        <div className="bg-blue-50 p-2 rounded-xl shadow-inner">
                            <ThreeDIcon Icon={CheckSquare} color="text-blue-600" size="w-6 h-6" depth={2} />
                        </div>
                        Recommended Actions
                    </h2>

                    <div className="space-y-3">
                        {displayActionPlan.map((task, index) => (
                            <label
                                key={index}
                                className="flex items-start gap-4 p-4 rounded-2xl border border-white/60 bg-white/40 hover:bg-white/80 hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer group backdrop-blur-sm"
                            >
                                <div className="mt-1 relative">
                                    <input type="checkbox" className="peer sr-only" />
                                    <div className="w-6 h-6 border-2 border-gray-300 rounded-lg group-hover:border-primary-500 peer-checked:bg-primary-500 peer-checked:border-primary-500 transition-all flex items-center justify-center shadow-sm">
                                        <CheckCircle2 className="w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-800 mb-1 group-hover:text-primary-700 transition-colors text-sm">
                                        {task.task}
                                    </h3>
                                    <div className="flex items-center gap-3">
                                        <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-md ${getPriorityColor(task.priority)} text-white shadow-sm tracking-wide`}>
                                            {task.priority || 'High'}
                                        </span>
                                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Due: {task.dueDate}</span>
                                    </div>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalysisReport;

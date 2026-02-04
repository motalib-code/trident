import { TrendingUp, AlertTriangle, Droplets, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { mockFarmerProfile, mockWeather, mockQuickStats } from '../mockData';
import { useEffect, useState } from 'react';
import ScanHistoryCard from './ScanHistoryCard';
import ThreeDIcon from './ThreeDIcon';
import api from '../services/api';
import farmer3d from '../assets/3d/farmer.png';
import weather3d from '../assets/3d/weather.png';
import location3d from '../assets/3d/location.png';

const Dashboard = () => {
    const { t, setCurrentView, setSelectedScan, apiStats, isConnected, userName } = useApp();
    const [recentScans, setRecentScans] = useState([]);
    const [isLoadingScans, setIsLoadingScans] = useState(true);

    // Fetch Recent Scans on Mount (and when view changes back to dashboard)
    useEffect(() => {
        const fetchScans = async () => {
            // Mock default if no connection
            if (!isConnected) {
                setIsLoadingScans(false);
                return;
            }

            try {
                const response = await api.get('/scans?limit=5');
                setRecentScans(response.data);
            } catch (error) {
                console.error("Failed to fetch scans", error);
            } finally {
                setIsLoadingScans(false);
            }
        };

        fetchScans();
    }, [isConnected]);

    // Use API stats if available, otherwise fallback to mock
    const stats = isConnected && apiStats ? {
        projectedYield: { ...mockQuickStats.projectedYield, value: apiStats.projected_yield },
        activeAlerts: { ...mockQuickStats.activeAlerts, value: apiStats.active_alerts },
        nextSpray: mockQuickStats.nextSpray
    } : mockQuickStats;

    const weather = isConnected && apiStats ? apiStats.weather : mockWeather;

    const handleScanClick = (scan) => {
        // Adapt backend scan object to the format expected by AnalysisReport
        // Detailed mapping is crucial here
        const adaptedScan = {
            id: scan.id,
            fieldName: `Scan #${scan.id}`,
            user_name: scan.user_name, // Pass the scan's user name
            healthScore: scan.result?.health_score || 0,
            yield_forecast: {
                value: scan.result?.yield_prediction,
                trend: "Calculated"
            },
            // Map the specific new fields
            n_level: scan.result?.n_level,
            p_level: scan.result?.p_level,
            k_level: scan.result?.k_level,
            weather_temp: scan.result?.weather_temp,
            weather_humidity: scan.result?.weather_humidity,
            weather_desc: scan.result?.weather_desc,

            pest_count: scan.result?.pest_detected_count,
            action_plan: scan.result?.raw_json_output?.action_plan || [],
            ...scan.result?.raw_json_output // Spread the raw JSON just in case
        };

        setSelectedScan(adaptedScan);
        setCurrentView('report');
    };

    const getGreeting = () => {
        const hours = new Date().getHours();
        if (hours < 12) return t('goodMorning') || "Good Morning,";
        if (hours < 17) return t('goodAfternoon') || "Good Afternoon,";
        return t('goodEvening') || "Good Evening,";
    };

    return (
        <div className="min-h-screen bg-nature-gradient pb-24">
            {/* Header with Weather */}
            <div className="bg-primary-600/90 backdrop-blur-md text-white p-6 rounded-b-[40px] shadow-2xl relative overflow-hidden perspective-1000">
                {/* Abstract shapes for premium feel */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full -ml-12 -mb-12 blur-2xl"></div>

                <div className="flex justify-between items-start mb-6 relative z-10">
                    <div>
                        <p className="text-primary-100 text-sm mb-1 font-medium tracking-wide uppercase">{getGreeting()}</p>
                        <div className="flex items-center gap-3">
                            <img src={farmer3d} alt="Profile" className="w-16 h-16 rounded-full border-2 border-white/20 shadow-lg" />
                            <div>
                                <h1 className="text-3xl font-black tracking-tight drop-shadow-lg">{userName || mockFarmerProfile.name}</h1>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 mt-2 text-primary-100/80">
                            <span className="text-xs font-semibold bg-white/10 px-2 py-1 rounded-full border border-white/10 backdrop-blur-sm flex items-center gap-1">
                                <img src={location3d} alt="Location" className="w-4 h-4" /> {weather.location || "Odisha, India"}
                            </span>
                        </div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-md rounded-2xl px-4 py-3 border border-white/20 shadow-xl preserve-3d">
                        <div className="flex items-center gap-2 mb-1">
                            {/* <span className="text-3xl drop-shadow-md animate-float-3d" style={{ display: 'inline-block' }}>☁️</span> */}
                            <img src={weather3d} alt="Weather" className="w-12 h-12 animate-float-3d drop-shadow-lg" />
                            <span className="text-2xl font-bold">{weather.temperature || weather.temp || "--"}°C</span>
                        </div>
                        <p className="text-xs text-white/90 font-medium text-center">Humidity: {weather.humidity}%</p>
                    </div>
                </div>
            </div>

            <div className="px-4 -mt-10 relative z-20">
                {/* Quick Stats Cards */}
                <div className="grid grid-cols-3 gap-3 mb-8 perspective-1000">
                    {/* Projected Yield */}
                    <div className="glass-3d flex flex-col items-center justify-center p-4 min-h-[140px] animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        <div className="mb-3">
                            <ThreeDIcon Icon={TrendingUp} color="text-green-600" depth={4} />
                        </div>
                        <p className="text-2xl font-bold text-gray-800 mb-1 leading-none drop-shadow-sm">
                            {stats.projectedYield.value}
                        </p>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider text-center">{t('projectedYield')}</p>
                    </div>

                    {/* Active Alerts */}
                    <div className="glass-3d flex flex-col items-center justify-center p-4 min-h-[140px] animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        <div className="mb-3 relative">
                            <ThreeDIcon Icon={AlertTriangle} color="text-red-500" depth={4} />
                            {stats.activeAlerts.value > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold pulse-alert border-2 border-white shadow-lg z-10">
                                    {stats.activeAlerts.value}
                                </span>
                            )}
                        </div>
                        <p className="text-2xl font-bold text-gray-800 mb-1 leading-none drop-shadow-sm">
                            {stats.activeAlerts.value}
                        </p>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider text-center">{t('activeAlerts')}</p>
                    </div>

                    {/* Next Spray */}
                    <div className="glass-3d flex flex-col items-center justify-center p-4 min-h-[140px] animate-slide-up" style={{ animationDelay: '0.3s' }}>
                        <div className="mb-3">
                            <ThreeDIcon Icon={Droplets} color="text-blue-500" depth={4} />
                        </div>
                        <p className="text-sm font-bold text-gray-800 mb-1 text-center drop-shadow-sm leading-tight">
                            {stats.nextSpray.value}
                        </p>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider text-center">{t('nextSpray')}</p>
                    </div>
                </div>

                {/* Recent Scans Section */}
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-4 px-1">
                        <h2 className="text-xl font-bold text-gray-800 tracking-tight">{t('recentScans')}</h2>
                        <button className="text-primary-600 text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all bg-white/50 px-3 py-1 rounded-full backdrop-blur-sm">
                            View All
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                    {isLoadingScans ? (
                        <div className="space-y-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 animate-pulse">
                                    <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : recentScans.length > 0 ? (
                        <div className="space-y-3">
                            {recentScans.map((scan, index) => (
                                <div key={scan.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                                    <ScanHistoryCard scan={scan} onClick={() => handleScanClick(scan)} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
                            <p>No scans found. Start by clicking the + button!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

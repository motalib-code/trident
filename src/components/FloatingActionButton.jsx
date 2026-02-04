import { useRef, useState } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { uploadScan } from '../services/api';
import ThreeDIcon from './ThreeDIcon';
import drone3d from '../assets/3d/drone.png';

const FloatingActionButton = () => {
    const { t, setSelectedScan, setCurrentView, isConnected, userName, language } = useApp();
    const fileInputRef = useRef(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            // Use the API service to upload
            const result = await uploadScan(file, userName || 'Farmer', language);

            // Update Global State with the REAL AI result
            setSelectedScan({
                id: result.scan_id,
                fieldName: "New Drone Scan", // Default name
                date: new Date().toISOString(),
                healthScore: result.health_score,
                status: result.pest_detections.length > 0 ? 'critical' : 'healthy', // derive status
                ...result // Spread full AI result (pests, action plan, yield)
            });

            // Navigate to Report View to show results
            setCurrentView('report');

        } catch (error) {
            console.error("Upload failed", error);
            const msg = error.response?.data?.detail || "Failed to analyze image.";
            alert(`Error: ${msg}`);
        } finally {
            setIsUploading(false);
            // Reset input
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    return (
        <>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
            />
            <button
                onClick={handleClick}
                disabled={isUploading}
                className={`group fixed bottom-6 right-6 w-20 h-20 rounded-full shadow-[0_10px_35px_rgba(16,185,129,0.4)] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 z-50 perspective-1000 ${isUploading ? 'bg-gray-400' : 'bg-gradient-to-br from-white to-primary-50 border-4 border-white/50'}`}
                aria-label={t('newScan')}
            >
                {isUploading ? (
                    <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
                ) : (
                    <div className="w-full h-full p-1 relative overflow-hidden rounded-full group-hover:rotate-12 transition-transform duration-500">
                        {/* 3D Drone Image */}
                        <img
                            src={drone3d}
                            alt="Scan Field"
                            className="w-full h-full object-contain drop-shadow-lg animate-float-3d"
                        />

                        {/* Scanner Beam Animation Overlay */}
                        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden rounded-full">
                            <div className="w-full h-3 bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent blur-sm animate-scan-beam absolute top-0 left-0 shadow-[0_0_15px_rgba(34,211,238,0.8)]"></div>
                        </div>
                    </div>
                )}

                {/* Tooltip */}
                <div className="absolute right-full mr-4 bg-gray-900/90 backdrop-blur-md text-white text-sm font-semibold py-1 px-3 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap shadow-xl">
                    {t('newScan')}
                </div>
            </button>
        </>
    );
};

export default FloatingActionButton;

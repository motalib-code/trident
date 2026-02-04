import { useState } from 'react';
import { X, AlertCircle, Bug, Leaf } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { mockPestDetections, mockNDVIData } from '../mockData';
import ThreeDIcon from './ThreeDIcon';

const FieldMap = () => {
    const { mapLayer, setMapLayer } = useApp();
    const [selectedPest, setSelectedPest] = useState(null);
    const [selectedZone, setSelectedZone] = useState(null);

    const layers = [
        { id: 'rgb', name: 'RGB View', icon: Leaf, color: 'text-green-600' },
        { id: 'ndvi', name: 'NDVI View', icon: AlertCircle, color: 'text-orange-600' },
        { id: 'pest', name: 'Pest Map', icon: Bug, color: 'text-red-600' }
    ];

    const handlePestClick = (pest) => {
        setSelectedPest(pest);
    };

    const handleZoneClick = (zone) => {
        setSelectedZone(zone);
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <div className="bg-primary-600/90 backdrop-blur-md text-white p-6 rounded-b-[40px] shadow-2xl mb-8 perspective-1000 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl animate-pulse"></div>
                <h1 className="text-3xl font-black high-contrast relative z-10 drop-shadow-md">Digital Twin Map</h1>
                <p className="text-primary-100/90 text-sm mt-1 relative z-10 font-medium tracking-wide">Field A - North Section</p>
            </div>

            <div className="px-4 perspective-1000">
                {/* Map Container */}
                <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden mb-6 animate-fade-in border border-white/40 transform-style-3d group hover:shadow-primary-500/20 transition-all duration-500">
                    {/* Map Image - Different views based on layer */}
                    <div className="relative aspect-[4/3] bg-gradient-to-br from-green-100 to-green-50">
                        {mapLayer === 'rgb' && (
                            <div className="absolute inset-0 transition-smooth">
                                {/* RGB View - Normal Field Image */}
                                <div
                                    className="w-full h-full bg-cover bg-center"
                                    style={{
                                        backgroundImage: `linear-gradient(135deg, #10B981 0%, #34D399 25%, #6EE7B7 50%, #34D399 75%, #10B981 100%)`,
                                    }}
                                >
                                    {/* Field Pattern Overlay */}
                                    <div
                                        className="w-full h-full opacity-30"
                                        style={{
                                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23047857' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                                        }}
                                    ></div>
                                </div>
                            </div>
                        )}

                        {mapLayer === 'ndvi' && (
                            <div className="absolute inset-0 transition-smooth">
                                {/* NDVI Heatmap View */}
                                <div className="w-full h-full relative">
                                    {/* Heatmap Gradient Background */}
                                    <div
                                        className="absolute inset-0"
                                        style={{
                                            background: `
                        radial-gradient(circle at 30% 40%, #10B981 0%, #84CC16 20%, transparent 40%),
                        radial-gradient(circle at 70% 30%, #84CC16 0%, #FCD34D 20%, transparent 40%),
                        radial-gradient(circle at 50% 70%, #FCD34D 0%, #FB923C 20%, transparent 40%),
                        radial-gradient(circle at 20% 80%, #FB923C 0%, #EF4444 20%, transparent 40%),
                        radial-gradient(circle at 80% 75%, #EF4444 0%, transparent 30%),
                        linear-gradient(135deg, #10B981 0%, #FCD34D 50%, #EF4444 100%)
                      `,
                                        }}
                                    ></div>

                                    {/* Zone Markers */}
                                    {mockNDVIData.zones.map((zone, index) => (
                                        <div
                                            key={zone.id}
                                            onClick={() => handleZoneClick(zone)}
                                            className="absolute cursor-pointer transform hover:scale-110 transition-all duration-300"
                                            style={{
                                                left: `${15 + index * 18}%`,
                                                top: `${20 + (index % 2) * 30}%`,
                                            }}
                                        >
                                            <div
                                                className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg border-4 border-white backdrop-blur-sm"
                                                style={{ backgroundColor: zone.color + '90' }}
                                            >
                                                <div className="text-center">
                                                    <div className="text-white font-bold text-sm">{zone.ndvi}</div>
                                                    <div className="text-white text-xs">{zone.name}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* NDVI Legend */}
                                <div className="absolute bottom-4 left-4 right-4 glass rounded-xl p-3">
                                    <p className="text-xs font-semibold text-gray-700 mb-2">NDVI Scale</p>
                                    <div className="heatmap-gradient h-3 rounded-full mb-2"></div>
                                    <div className="flex justify-between text-xs text-gray-600">
                                        <span>Critical</span>
                                        <span>Poor</span>
                                        <span>Moderate</span>
                                        <span>Good</span>
                                        <span>Excellent</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {mapLayer === 'pest' && (
                            <div className="absolute inset-0 transition-smooth">
                                {/* Base Field Image */}
                                <div
                                    className="w-full h-full bg-cover bg-center"
                                    style={{
                                        backgroundImage: `linear-gradient(135deg, #10B981 0%, #34D399 25%, #6EE7B7 50%, #34D399 75%, #10B981 100%)`,
                                    }}
                                >
                                    {/* Field Pattern Overlay */}
                                    <div
                                        className="w-full h-full opacity-20"
                                        style={{
                                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23047857' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                                        }}
                                    ></div>
                                </div>

                                {/* Pest Detection Bounding Boxes */}
                                {mockPestDetections.map((pest) => (
                                    <div
                                        key={pest.id}
                                        onClick={() => handlePestClick(pest)}
                                        className="absolute cursor-pointer animate-pulse-slow"
                                        style={{
                                            left: `${pest.coordinates.x}%`,
                                            top: `${pest.coordinates.y}%`,
                                            transform: 'translate(-50%, -50%)',
                                        }}
                                    >
                                        {/* Pulsing Alert Circle */}
                                        <div className="relative group">
                                            <div className="absolute inset-0 bg-red-500 rounded-full opacity-30 animate-ping"></div>
                                            <div className="relative bg-red-500/80 backdrop-blur-sm border-4 border-red-300 rounded-xl p-2 shadow-xl hover:scale-110 transition-all flex items-center justify-center transform-style-3d group-hover:rotate-y-12">
                                                <ThreeDIcon Icon={Bug} color="text-white" size="w-6 h-6" depth={3} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Layer Info Badge */}
                    <div className="absolute top-4 left-4 glass rounded-xl px-4 py-2 shadow-lg">
                        <p className="text-sm font-semibold text-gray-700">
                            {layers.find((l) => l.id === mapLayer)?.name}
                        </p>
                    </div>
                </div>

                {/* Layer Toggle Tabs */}
                {/* Layer Toggle Tabs */}
                <div className="glass-3d rounded-2xl p-2 mb-6 flex gap-2 w-full perspective-1000">
                    {layers.map((layer) => {
                        const Icon = layer.icon;
                        const isActive = mapLayer === layer.id;
                        return (
                            <button
                                key={layer.id}
                                onClick={() => {
                                    setMapLayer(layer.id);
                                    setSelectedPest(null);
                                    setSelectedZone(null);
                                }}
                                className={`flex-1 flex flex-col items-center gap-2 rounded-xl transition-all duration-300 transform ${isActive ? 'bg-white shadow-md scale-105' : 'hover:bg-white/50'}`}
                            >
                                <div className={`p-2 rounded-lg transition-colors ${isActive ? 'bg-primary-50' : ''}`}>
                                    <ThreeDIcon
                                        Icon={Icon}
                                        color={isActive ? layer.color : "text-gray-400"}
                                        size="w-6 h-6"
                                        depth={isActive ? 3 : 1}
                                    />
                                </div>
                                <span className={`text-xs font-bold pb-1 ${isActive ? 'text-gray-800' : 'text-gray-500'}`}>
                                    {layer.name}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Pest Detection Popup */}
                {selectedPest && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end justify-center z-50 animate-fade-in">
                        <div className="bg-white rounded-t-3xl w-full max-w-lg p-6 animate-slide-up shadow-2xl">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="bg-red-100 p-3 rounded-xl">
                                        <Bug className="w-8 h-8 text-red-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">Pest Detected</h3>
                                        <p className="text-sm text-gray-600">{selectedPest.location}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedPest(null)}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <X className="w-6 h-6 text-gray-600" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-red-50 rounded-xl p-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-semibold text-gray-700">Pest Type</span>
                                        <span className="text-lg font-bold text-red-600">{selectedPest.type}</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-semibold text-gray-700">Severity</span>
                                        <span className={`badge ${selectedPest.severity === 'Critical' ? 'badge-danger' :
                                            selectedPest.severity === 'High' ? 'badge-warning' : 'badge-success'
                                            }`}>
                                            {selectedPest.severity}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-semibold text-gray-700">Confidence</span>
                                        <span className="text-lg font-bold text-gray-900">
                                            {(selectedPest.confidence * 100).toFixed(0)}%
                                        </span>
                                    </div>
                                </div>

                                <div className="bg-blue-50 rounded-xl p-4">
                                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                        <AlertCircle className="w-5 h-5 text-blue-600" />
                                        Recommendation
                                    </h4>
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        {selectedPest.recommendation}
                                    </p>
                                </div>

                                <button className="btn-primary w-full">
                                    Add to Action Plan
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Zone Info Popup */}
                {selectedZone && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end justify-center z-50 animate-fade-in">
                        <div className="bg-white rounded-t-3xl w-full max-w-lg p-6 animate-slide-up shadow-2xl">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="p-3 rounded-xl"
                                        style={{ backgroundColor: selectedZone.color + '20' }}
                                    >
                                        <Leaf className="w-8 h-8" style={{ color: selectedZone.color }} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">{selectedZone.name}</h3>
                                        <p className="text-sm text-gray-600">NDVI Analysis</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedZone(null)}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <X className="w-6 h-6 text-gray-600" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-sm font-semibold text-gray-700">NDVI Value</span>
                                        <span className="text-2xl font-bold" style={{ color: selectedZone.color }}>
                                            {selectedZone.ndvi}
                                        </span>
                                    </div>
                                    <div className="bg-white rounded-lg p-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-semibold text-gray-700">Plant Health</span>
                                            <span className="badge" style={{
                                                backgroundColor: selectedZone.color + '20',
                                                color: selectedZone.color
                                            }}>
                                                {selectedZone.health}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-blue-50 rounded-xl p-4">
                                    <h4 className="font-semibold text-gray-900 mb-2">Interpretation</h4>
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        {selectedZone.ndvi >= 0.8
                                            ? 'Excellent vegetation health. Plants are thriving with optimal chlorophyll content.'
                                            : selectedZone.ndvi >= 0.6
                                                ? 'Good vegetation health. Minor improvements possible with targeted care.'
                                                : selectedZone.ndvi >= 0.4
                                                    ? 'Moderate vegetation health. Requires attention and nutrient management.'
                                                    : 'Poor vegetation health. Immediate intervention required.'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FieldMap;

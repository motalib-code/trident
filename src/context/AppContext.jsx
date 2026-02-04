import { createContext, useContext, useState, useEffect } from 'react';
import { translations, mockQuickStats } from '../mockData';
import { getDashboardStats } from '../services/api';

const AppContext = createContext();

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within AppProvider');
    }
    return context;
};

export const AppProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');
    const [currentView, setCurrentView] = useState('dashboard');
    const [selectedScan, setSelectedScan] = useState(null);
    const [mapLayer, setMapLayer] = useState('rgb'); // rgb, ndvi, pest
    const [apiStats, setApiStats] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [userName, setUserName] = useState('');

    // Attempt to connect to backend on mount
    useEffect(() => {
        const connectToBackend = async () => {
            const stats = await getDashboardStats();
            if (stats) {
                setApiStats(stats);
                setIsConnected(true);
            }
        };
        connectToBackend();
    }, []);

    const t = (key) => {
        return translations[language]?.[key] || translations.en[key] || key;
    };

    const value = {
        language,
        setLanguage,
        currentView,
        setCurrentView,
        selectedScan,
        setSelectedScan,
        mapLayer,
        setMapLayer,
        t,
        apiStats, // Expose API data
        isConnected,
        userName,
        setUserName
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

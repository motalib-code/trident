import { Home, Map, FileText, Settings } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ThreeDIcon from './ThreeDIcon';

const BottomNav = () => {
    const { currentView, setCurrentView, t } = useApp();

    const navItems = [
        { id: 'dashboard', icon: Home, label: t('dashboard') },
        { id: 'map', icon: Map, label: t('map') },
        { id: 'report', icon: FileText, label: t('reports') },
        { id: 'settings', icon: Settings, label: t('settings') }
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-200/50 shadow-2xl z-40 pb-safe">
            <div className="flex items-center justify-around px-4 py-3">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentView === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => setCurrentView(item.id)}
                            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-300 ${isActive
                                ? 'bg-primary-50/50 scale-110'
                                : 'hover:bg-gray-50/50'
                                }`}
                        >
                            <div className={`${isActive ? 'scale-110' : 'scale-100 grayscale-[0.5]'} transition-all duration-300`}>
                                <ThreeDIcon
                                    Icon={Icon}
                                    size="w-6 h-6"
                                    color={isActive ? "text-primary-600" : "text-gray-500"}
                                    depth={isActive ? 3 : 1}
                                />
                            </div>
                            <span className={`text-[10px] font-bold tracking-wide transition-colors ${isActive ? 'text-primary-700' : 'text-gray-500'}`}>
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
};

export default BottomNav;

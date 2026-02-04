import { useApp } from '../context/AppContext';
import { Globe, User, Bell, HelpCircle, LogOut } from 'lucide-react';
import ThreeDIcon from './ThreeDIcon';

const Settings = () => {
    const { language, setLanguage, t } = useApp();

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    };

    return (
        <div className="min-h-screen bg-nature-gradient pb-24">
            {/* Header */}
            <div className="bg-primary-600/90 backdrop-blur-md text-white p-6 rounded-b-[40px] shadow-2xl mb-8 perspective-1000 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                <h1 className="text-3xl font-black high-contrast relative z-10 drop-shadow-md">{t('settings')}</h1>
            </div>

            <div className="px-5 space-y-6 perspective-1000">
                {/* Language Settings */}
                <div className="glass-3d p-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="bg-primary-50 p-3 rounded-2xl shadow-inner">
                            <ThreeDIcon Icon={Globe} color="text-primary-600" size="w-6 h-6" depth={3} />
                        </div>
                        <h2 className="text-xl font-bold text-gray-800">Language</h2>
                    </div>

                    <select
                        value={language}
                        onChange={handleLanguageChange}
                        className="w-full bg-white/50 border border-white/60 text-gray-800 font-medium text-lg rounded-xl focus:ring-4 focus:ring-primary-200 focus:border-primary-500 block p-4 outline-none transition-all shadow-sm backdrop-blur-sm cursor-pointer hover:bg-white/70"
                    >
                        <option value="en">English (English)</option>
                        <option value="hi">हिंदी (Hindi)</option>
                        <option value="or">ଓଡ଼ିଆ (Odia)</option>
                    </select>
                </div>

                {/* Account Settings */}
                <div className="glass-3d p-6 space-y-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    <div className="flex items-center gap-4">
                        <div className="bg-blue-50 p-3 rounded-2xl shadow-inner">
                            <ThreeDIcon Icon={User} color="text-blue-600" size="w-6 h-6" depth={3} />
                        </div>
                        <h2 className="text-xl font-bold text-gray-800">Profile</h2>
                    </div>
                    <button className="w-full text-left py-3 px-4 rounded-xl bg-white/40 hover:bg-white/70 transition-all text-gray-700 font-semibold shadow-sm border border-white/40">
                        Edit Profile
                    </button>
                    <button className="w-full text-left py-3 px-4 rounded-xl bg-white/40 hover:bg-white/70 transition-all text-gray-700 font-semibold shadow-sm border border-white/40">
                        Manage Farms
                    </button>
                </div>

                {/* Notifications */}
                <div className="glass-3d p-6 space-y-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                    <div className="flex items-center gap-4">
                        <div className="bg-yellow-50 p-3 rounded-2xl shadow-inner">
                            <ThreeDIcon Icon={Bell} color="text-yellow-600" size="w-6 h-6" depth={3} />
                        </div>
                        <h2 className="text-xl font-bold text-gray-800">Notifications</h2>
                    </div>
                    <div className="flex items-center justify-between py-2 px-1">
                        <span className="text-gray-700 font-semibold">Pest Alerts</span>
                        <div className="w-12 h-7 bg-primary-500 rounded-full relative cursor-pointer shadow-inner transition-colors hover:bg-primary-600">
                            <div className="absolute top-1 right-1 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform"></div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between py-2 px-1">
                        <span className="text-gray-700 font-semibold">Weather Updates</span>
                        <div className="w-12 h-7 bg-primary-500 rounded-full relative cursor-pointer shadow-inner transition-colors hover:bg-primary-600">
                            <div className="absolute top-1 right-1 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform"></div>
                        </div>
                    </div>
                </div>

                {/* Help & Support */}
                <button className="w-full glass-3d p-6 flex items-center justify-between hover:scale-[1.02] transition-transform animate-slide-up" style={{ animationDelay: '0.4s' }}>
                    <div className="flex items-center gap-4">
                        <div className="bg-purple-50 p-3 rounded-2xl shadow-inner">
                            <ThreeDIcon Icon={HelpCircle} color="text-purple-600" size="w-6 h-6" depth={3} />
                        </div>
                        <span className="text-xl font-bold text-gray-800">Help & Support</span>
                    </div>
                </button>

                {/* Logout */}
                <button className="w-full px-6 py-4 rounded-2xl bg-red-50 text-red-600 font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors">
                    <LogOut className="w-5 h-5" />
                    Logout
                </button>

                <p className="text-center text-xs text-gray-400 py-4">
                    AgriScan AI v1.0.0
                </p>
            </div>
        </div>
    );
};

export default Settings;

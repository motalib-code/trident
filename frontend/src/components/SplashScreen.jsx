import { useState, useEffect } from 'react';
import { ChevronDown, User, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import logo3d from '../assets/3d/logo.png';

const SplashScreen = ({ onComplete }) => {
    const { language, setLanguage, userName, setUserName } = useApp();
    const [step, setStep] = useState('splash'); // splash -> lang -> name
    const [isAnimating, setIsAnimating] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsAnimating(false);
            setStep('lang');
        }, 2500);
        return () => clearTimeout(timer);
    }, []);

    const languages = [
        { code: 'en', name: 'English', native: 'English' },
        { code: 'hi', name: 'Hindi', native: 'हिंदी' },
        { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ' }
    ];

    const handleLanguageSelect = (langCode) => {
        setLanguage(langCode);
        setStep('name');
    };

    const handleNameSubmit = (e) => {
        e.preventDefault();
        if (userName.trim()) {
            onComplete();
        }
    };

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-primary-500 via-primary-400 to-primary-300 flex flex-col items-center justify-center z-50 p-6 perspective-1000">
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}></div>
            </div>

            <div className={`relative z-10 flex flex-col items-center w-full max-w-md transition-all duration-1000 ${isAnimating && step === 'splash' ? 'scale-100 opacity-100' : 'scale-100 opacity-100'}`}>

                {/* Logo and Branding (Smaller on Selector steps) */}
                <div className={`transition-all duration-500 flex flex-col items-center ${step !== 'splash' ? 'mb-8' : 'mb-6'}`}>
                    <div className="relative mb-4 animate-float-3d" style={{ transformStyle: 'preserve-3d' }}>
                        {/* 3D Glow Effect */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white/30 rounded-full blur-3xl -z-10"></div>
                        <img
                            src={logo3d}
                            alt="AgriScan AI"
                            className={`transition-all duration-700 drop-shadow-2xl ${step !== 'splash' ? 'w-24 h-24' : 'w-48 h-48'}`}
                            style={{ filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.2))' }}
                        />
                    </div>
                    <h1 className={`${step !== 'splash' ? 'text-3xl' : 'text-5xl'} font-bold text-white mb-1 tracking-tight`}>
                        AgriScan AI
                    </h1>
                </div>

                {/* Step 1: Language Selection */}
                {step === 'lang' && (
                    <div className="w-full flex flex-col items-center animate-slide-up">
                        <p className="text-white text-lg mb-6 font-medium">Choose your language</p>
                        <div className="grid grid-cols-1 gap-3 w-full">
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => handleLanguageSelect(lang.code)}
                                    className={`bg-white/20 backdrop-blur-md border-2 ${language === lang.code ? 'border-white bg-white/30' : 'border-white/40'} text-white px-6 py-4 rounded-2xl font-semibold hover:bg-white/30 transition-all shadow-xl flex items-center justify-between`}
                                >
                                    <div className="flex flex-col items-start">
                                        <span className="text-lg">{lang.native}</span>
                                        <span className="text-sm opacity-80">{lang.name}</span>
                                    </div>
                                    <ArrowRight className="w-5 h-5 opacity-40" />
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 2: Name Input */}
                {step === 'name' && (
                    <div className="w-full flex flex-col animate-slide-up">
                        <p className="text-white text-lg mb-6 font-medium text-center">Enter your name</p>
                        <form onSubmit={handleNameSubmit} className="space-y-6">
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                    <User className="h-6 w-6 text-white/60 group-focus-within:text-white transition-colors" />
                                </div>
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="Kisan Name"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    className="block w-full pl-14 pr-5 py-5 bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-2xl text-white placeholder-white/50 text-xl font-medium focus:outline-none focus:border-white focus:bg-white/20 transition-all outline-none"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={!userName.trim()}
                                className={`w-full bg-white text-primary-600 py-5 rounded-2xl font-bold text-xl shadow-2xl transition-all flex items-center justify-center gap-3 ${!userName.trim() ? 'opacity-50 grayscale' : 'hover:scale-[1.02] active:scale-95'}`}
                            >
                                Get Started
                                <ArrowRight className="w-6 h-6" />
                            </button>
                        </form>
                    </div>
                )}
            </div>

            <div className="absolute bottom-8 text-white/40 text-sm">
                Powered by FarmVibes & YOLOv8
            </div>
        </div>
    );
};

export default SplashScreen;

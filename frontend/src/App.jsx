import { useState, useEffect } from 'react';
import { useApp } from './context/AppContext';
import SplashScreen from './components/SplashScreen';
import Dashboard from './components/Dashboard';
import FieldMap from './components/FieldMap';
import AnalysisReport from './components/AnalysisReport';
import BottomNav from './components/BottomNav';
import FloatingActionButton from './components/FloatingActionButton';
import Settings from './components/Settings';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const { currentView } = useApp();

  // If splash is showing, render only splash
  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  // Main app content
  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'map':
        return <FieldMap />;
      case 'report':
        return <AnalysisReport />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 pb-20 md:pb-0 md:pl-20 relative">
      <main className="min-h-screen w-full mx-auto max-w-md md:max-w-4xl shadow-2xl bg-white overflow-hidden relative">
        {/* Dynamic Content */}
        <div className="h-full overflow-y-auto scrollbar-hide">
          {renderContent()}
        </div>

        {/* Global Floating Action Button (only on dashboard and map) */}
        {(currentView === 'dashboard' || currentView === 'map') && (
          <FloatingActionButton />
        )}

        {/* Bottom Navigation */}
        <BottomNav />
      </main>

      {/* Desktop Background (visible only on large screens) */}
      <div className="hidden md:block absolute top-0 left-0 w-full h-full -z-10 bg-emerald-900/10 backdrop-blur-sm"></div>
    </div>
  );
}

export default App;

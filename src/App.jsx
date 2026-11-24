import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { QueueProvider } from './context/QueueContext';
import Navbar from './components/Navbar';
import HomeScreen from './pages/HomeScreen';
import CustomerJoinQueue from './pages/CustomerJoinQueue';
import CustomerLiveStatus from './pages/CustomerLiveStatus';
import ReceptionistDashboard from './pages/ReceptionistDashboard';
import BarberScreen from './pages/BarberScreen';
import WaitingAreaTV from './pages/WaitingAreaTV';
import OwnerSettings from './pages/OwnerSettings';

function SalonApp() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const { lang, t } = useLanguage();

  // Handle URL hash or path simulation if user navigates with browser hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'join', 'status', 'reception', 'barber', 'tv', 'display', 'owner', 'admin'].includes(hash)) {
        if (hash === 'display') setCurrentScreen('tv');
        else if (hash === 'admin') setCurrentScreen('owner');
        else setCurrentScreen(hash);
      }
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (screen) => {
    setCurrentScreen(screen);
    window.location.hash = screen;
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onNavigate={handleNavigate} />;
      case 'join':
        return <CustomerJoinQueue onNavigate={handleNavigate} />;
      case 'status':
        return <CustomerLiveStatus />;
      case 'reception':
        return <ReceptionistDashboard />;
      case 'barber':
        return <BarberScreen />;
      case 'tv':
      case 'display':
        return <WaitingAreaTV />;
      case 'owner':
      case 'admin':
        return <OwnerSettings />;
      default:
        return <HomeScreen onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#EDECEA] text-[#432f2e] flex flex-col font-sans selection:bg-[#7E9A82] selection:text-[#432f2e]">
      
      {/* Top Navbar */}
      <Navbar currentScreen={currentScreen} setCurrentScreen={handleNavigate} />

      {/* Main Screen Content View */}
      <main className="flex-1 py-6 px-4">
        {renderScreen()}
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-[#432f2e]/20 py-4 px-4 text-center text-xs text-[#432f2e]/80 bg-[#EDECEA]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 font-bold">
          <span>NOIR &bull; Salon Queue Management System</span>
          <span className="text-[11px] font-medium text-[#432f2e]/60">&copy; {new Date().getFullYear()} NOIR. All rights reserved.</span>
        </div>
      </footer>

    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <QueueProvider>
        <SalonApp />
      </QueueProvider>
    </LanguageProvider>
  );
}

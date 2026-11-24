import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Scissors, 
  Globe, 
  Home,
  Smartphone, 
  Clock, 
  LayoutDashboard, 
  Tv, 
  Settings,
  Sparkles
} from 'lucide-react';

export default function Navbar({ currentScreen, setCurrentScreen }) {
  const { lang, toggleLanguage, t } = useLanguage();

  const navItems = [
    { id: 'home', label: lang === 'gu' ? 'હોમ' : 'Home', icon: Home },
    { id: 'join', label: lang === 'gu' ? 'કતારમાં જોડાઓ' : 'Join Queue', icon: Smartphone },
    { id: 'status', label: lang === 'gu' ? 'મારું સ્ટેટસ' : 'My Status', icon: Clock },
    { id: 'reception', label: lang === 'gu' ? 'રિસેપ્શનિસ્ટ' : 'Reception', icon: LayoutDashboard },
    { id: 'barber', label: lang === 'gu' ? 'બાર્બર' : 'Barber', icon: Scissors },
    { id: 'tv', label: lang === 'gu' ? 'વેઇટિંગ ટીવી' : 'Waiting TV', icon: Tv },
    { id: 'owner', label: lang === 'gu' ? 'માલિક સેટિંગ્સ' : 'Admin', icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#EDECEA]/95 backdrop-blur-md border-b-2 border-[#432f2e]/20 px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Brand & Tagline */}
        <div className="flex items-center space-x-3 w-full md:w-auto justify-between md:justify-start">
          <button 
            onClick={() => setCurrentScreen('home')}
            className="flex items-center space-x-2.5 text-left cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#7E9A82] text-[#432f2e] border-2 border-[#432f2e] flex items-center justify-center shadow-sm group-hover:scale-105 transition-all">
              <Scissors className="w-5 h-5 -rotate-45 stroke-[#432f2e] stroke-[2.5]" />
            </div>
            <div>
              <span className="font-black text-xl tracking-wider text-[#432f2e] block leading-none">
                NOIR
              </span>
              <span className="text-[10px] text-[#432f2e]/70 tracking-widest block uppercase font-bold mt-0.5">
                Salon Queue Management
              </span>
            </div>
          </button>

          {/* Language Toggle on Mobile */}
          <button
            onClick={toggleLanguage}
            className="md:hidden flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#7E9A82] border-2 border-[#432f2e] text-[#432f2e] text-xs font-black shadow-xs hover:bg-[#6c8770] transition-all cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 stroke-[#432f2e]" />
            <span>{lang === 'en' ? 'ગુજરાતી' : 'English'}</span>
          </button>
        </div>

        {/* Screen Switcher Navigation Tabs */}
        <nav className="flex items-center overflow-x-auto w-full md:w-auto py-1 space-x-1.5 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentScreen(item.id)}
                className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all duration-200 cursor-pointer border ${
                  isActive
                    ? 'bg-[#7E9A82] text-[#432f2e] border-2 border-[#432f2e] shadow-md scale-[1.02]'
                    : 'bg-[#EDECEA] hover:bg-[#7E9A82]/30 text-[#432f2e] border border-[#432f2e]/25'
                }`}
              >
                <Icon className="w-3.5 h-3.5 stroke-[#432f2e]" />
                <span className="text-[#432f2e]">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Desktop Language Toggle */}
        <div className="hidden md:flex items-center space-x-2">
          <button
            onClick={toggleLanguage}
            title="Toggle Language / ભાષા બદલો"
            className="flex items-center space-x-2 px-3.5 py-2 rounded-full bg-[#7E9A82] border-2 border-[#432f2e] text-[#432f2e] text-xs font-black hover:bg-[#6c8770] transition-all cursor-pointer shadow-xs"
          >
            <Globe className="w-4 h-4 stroke-[#432f2e]" />
            <span>{lang === 'en' ? 'ગુજરાતી' : 'English'}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[#EDECEA] text-[#432f2e] font-black uppercase">
              {lang}
            </span>
          </button>
        </div>

      </div>
    </header>
  );
}

import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useQueue, playChimeSound } from '../context/QueueContext';
import { 
  Tv, 
  Scissors, 
  Clock, 
  UserCheck, 
  Sparkles, 
  Volume2, 
  BellRing,
  CheckCircle,
  Zap
} from 'lucide-react';

export default function WaitingAreaTV() {
  const { lang, t } = useLanguage();
  const { 
    barbers, 
    waitingCustomers, 
    newlyCalledToken, 
    getCustomerWaitTime,
    callNext 
  } = useQueue();

  const [currentTime, setCurrentTime] = useState(new Date());

  // Clock ticker for live TV display
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Up next list: up to 5 tokens
  const upNextList = waitingCustomers.slice(0, 5);

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* TV Screen Container - Sage Green #7E9A82 inside box */}
      <div className="bg-[#7E9A82] border-4 border-[#432f2e] rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 text-[#432f2e]">
        
        {/* Top Header of TV Display */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b-3 border-[#432f2e]/25 gap-4">
          
          {/* Salon Brand & TV Title */}
          <div className="flex items-center space-x-4">
            <div className="p-4 bg-[#EDECEA] text-[#432f2e] rounded-3xl border-3 border-[#432f2e] shadow-md">
              <Tv className="w-10 h-10 stroke-[#432f2e] stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center space-x-3">
                <h1 className="text-3xl sm:text-5xl font-black text-[#432f2e] tracking-tight uppercase">
                  NOIR
                </h1>
                <span className="text-xs sm:text-sm font-black px-3 py-1 rounded-full bg-[#EDECEA] text-[#432f2e] border-2 border-[#432f2e] tracking-wider animate-pulse">
                  LIVE TV
                </span>
              </div>
              <p className="text-sm sm:text-base font-extrabold text-[#432f2e]/85">
                {lang === 'gu' ? 'વેઇટિંગ એરિયા લાઈવ ડિસ્પ્લે' : 'Waiting Area Display — Track Your Turn'}
              </p>
            </div>
          </div>

          {/* Clock & Real-time status */}
          <div className="flex items-center space-x-4 self-start md:self-auto">
            <button
              onClick={playChimeSound}
              title="Test Chime Sound"
              className="p-3 bg-[#EDECEA] hover:bg-[#dedcd8] border-2 border-[#432f2e] rounded-2xl text-[#432f2e] transition-all cursor-pointer shadow-sm flex items-center space-x-1.5 text-xs font-bold"
            >
              <Volume2 className="w-5 h-5 stroke-[#432f2e]" />
              <span className="hidden sm:inline">Chime</span>
            </button>

            <div className="bg-[#EDECEA] border-3 border-[#432f2e] px-5 py-3 rounded-2xl text-right shadow-sm text-[#432f2e]">
              <div className="text-xl sm:text-2xl font-black font-mono tracking-wide">
                {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </div>
              <div className="text-[11px] font-black uppercase text-[#432f2e]/75 flex items-center justify-end space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#432f2e] animate-ping"></span>
                <span>Auto-Updating</span>
              </div>
            </div>
          </div>

        </div>

        {/* Flashing Banner when a new token is called */}
        {newlyCalledToken && (
          <div className="bg-[#EDECEA] border-4 border-[#432f2e] rounded-3xl p-6 sm:p-8 text-center space-y-2 shadow-2xl animate-turn-pulse text-[#432f2e]">
            <div className="inline-flex items-center space-x-2 text-xs sm:text-sm font-black uppercase tracking-widest text-[#432f2e] bg-[#7E9A82] px-4 py-1 rounded-full border-2 border-[#432f2e]">
              <BellRing className="w-4 h-4 animate-bounce stroke-[#432f2e]" />
              <span>Now Serving — Please Proceed to Chair!</span>
            </div>
            <div className="text-5xl sm:text-7xl font-black font-mono tracking-tight text-[#432f2e]">
              TOKEN #{newlyCalledToken}
            </div>
          </div>
        )}

        {/* 2 Main Sections Grid (Left: Active Barbers / Right: Up Next 5 Tokens) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Section 1: Row per barber: photo, name, 'Now: S-12' (7 Cols) */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center justify-between border-b-2 border-[#432f2e]/20 pb-2">
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-[#432f2e] flex items-center space-x-2.5">
                <Scissors className="w-6 h-6 stroke-[#432f2e] stroke-[2.5]" />
                <span>{lang === 'gu' ? 'હાલમાં સેવા લઈ રહેલા' : 'Now In Chair (Active Stations)'}</span>
              </h2>
              <span className="text-xs sm:text-sm font-bold text-[#432f2e]/85">
                3 Stations
              </span>
            </div>

            <div className="space-y-4">
              {barbers.map((barber) => {
                const isBusy = barber.status === 'busy' && barber.currentCustomer;
                const isBreak = barber.status === 'break';

                return (
                  <div
                    key={barber.id}
                    className="bg-[#EDECEA] border-3 border-[#432f2e] rounded-3xl p-5 sm:p-6 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all text-[#432f2e]"
                  >
                    {/* Barber Details */}
                    <div className="flex items-center space-x-4">
                      <img
                        src={barber.avatar}
                        alt={barber.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-3 border-[#432f2e] shadow-sm shrink-0"
                      />
                      <div>
                        <div className="text-2xl sm:text-3xl font-black text-[#432f2e]">
                          {lang === 'gu' ? barber.nameGu : barber.name}
                        </div>
                        <div className="text-xs sm:text-sm font-extrabold text-[#432f2e]/80 flex items-center space-x-2">
                          <span className="bg-[#7E9A82] text-[#432f2e] px-2.5 py-0.5 rounded-lg border border-[#432f2e]/30">
                            {barber.chair}
                          </span>
                          <span className="capitalize">{barber.status}</span>
                        </div>
                      </div>
                    </div>

                    {/* Customer Token Big Display */}
                    <div className="bg-[#7E9A82]/25 border-3 border-[#432f2e] rounded-2xl p-4 sm:p-5 text-center min-w-[200px] shadow-sm">
                      {isBusy ? (
                        <div>
                          <span className="text-xs font-black uppercase tracking-widest text-[#432f2e]/75 block">
                            Serving Now
                          </span>
                          <span className="text-3xl sm:text-5xl font-black font-mono text-[#432f2e] tracking-tight block">
                            {barber.currentCustomer.token}
                          </span>
                          <span className="text-xs font-extrabold text-[#432f2e] truncate block">
                            {barber.currentCustomer.name}
                          </span>
                        </div>
                      ) : (
                        <div className="py-2">
                          <span className="text-sm sm:text-base font-black text-[#432f2e]/70 block uppercase">
                            {isBreak ? 'On Break' : 'Available'}
                          </span>
                          <span className="text-xs font-bold text-[#432f2e]/60 block">
                            {isBreak ? 'Back shortly' : 'Ready for next client'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 2: 'Up next' list of 5 tokens with estimated times (5 Cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center justify-between border-b-2 border-[#432f2e]/20 pb-2">
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-[#432f2e] flex items-center space-x-2.5">
                <UserCheck className="w-6 h-6 stroke-[#432f2e] stroke-[2.5]" />
                <span>{lang === 'gu' ? 'કતારમાં પછીના ટોકન' : 'Up Next (5 In Queue)'}</span>
              </h2>
              <span className="text-xs sm:text-sm font-bold text-[#432f2e]/85">
                {waitingCustomers.length} Total Waiting
              </span>
            </div>

            <div className="space-y-3">
              {upNextList.length === 0 ? (
                <div className="bg-[#EDECEA] border-2 border-dashed border-[#432f2e]/30 rounded-3xl p-8 text-center text-sm font-extrabold text-[#432f2e]/75">
                  No upcoming clients in line. Queue is clear!
                </div>
              ) : (
                upNextList.map((item, idx) => {
                  const isFirst = idx === 0;

                  return (
                    <div
                      key={item.token}
                      className={`p-4 sm:p-5 rounded-3xl border-3 flex items-center justify-between transition-all text-[#432f2e] ${
                        isFirst
                          ? 'bg-[#EDECEA] border-[#432f2e] shadow-lg ring-2 ring-[#432f2e]/30 scale-[1.01]'
                          : 'bg-[#EDECEA]/75 border-[#432f2e]/30'
                      }`}
                    >
                      {/* Left: Position & Token */}
                      <div className="flex items-center space-x-4">
                        <span
                          className={`w-9 h-9 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center font-black text-sm sm:text-base border-2 border-[#432f2e] shadow-xs ${
                            isFirst ? 'bg-[#7E9A82] text-[#432f2e]' : 'bg-[#EDECEA] text-[#432f2e]'
                          }`}
                        >
                          {idx + 1}
                        </span>

                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl sm:text-3xl font-black font-mono text-[#432f2e]">
                              {item.token}
                            </span>
                            {isFirst && (
                              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-[#7E9A82] text-[#432f2e] border border-[#432f2e]">
                                Next Up
                              </span>
                            )}
                          </div>
                          <div className="text-xs sm:text-sm font-extrabold text-[#432f2e]/85">
                            {item.name} &bull; <span className="text-[#432f2e]/75">{item.services.join(', ')}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Estimated Wait */}
                      <div className="text-right">
                        <div className="text-base sm:text-xl font-black text-[#432f2e] font-mono">
                          ~{getCustomerWaitTime(item.token)} min
                        </div>
                        <div className="text-[10px] sm:text-xs font-bold text-[#432f2e]/70 uppercase">
                          Est. Wait
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

        </div>

        {/* TV Footer */}
        <div className="pt-6 border-t-2 border-[#432f2e]/20 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs sm:text-sm font-extrabold text-[#432f2e]/80">
          <span>NOIR Salon Queue &bull; Please watch this screen for your token</span>
        </div>

      </div>

    </div>
  );
}

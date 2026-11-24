import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useQueue } from '../context/QueueContext';
import { 
  Scissors, 
  Play, 
  CheckCircle, 
  Clock, 
  User, 
  Coffee, 
  ChevronRight,
  AlertCircle
} from 'lucide-react';

export default function BarberScreen() {
  const { lang, t } = useLanguage();
  const { 
    barbers, 
    customers,
    waitingCustomers, 
    callNext, 
    startService,
    markBarberDone, 
    toggleBarberStatus 
  } = useQueue();

  const [selectedBarberId, setSelectedBarberId] = useState('amit');
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const activeBarber = barbers.find((b) => b.id === selectedBarberId) || barbers[0];
  const isBusy = activeBarber.status === 'busy' && activeBarber.currentCustomer;
  const isBreak = activeBarber.status === 'break';

  // Find customer in chair or called
  const inChairCustomer = isBusy
    ? customers.find((c) => c.token === activeBarber.currentCustomer.token)
    : null;

  const isStarted = inChairCustomer && inChairCustomer.status === 'in_chair';
  const isCalled = inChairCustomer && inChairCustomer.status === 'called';

  // Timer since service started
  useEffect(() => {
    let interval = null;
    if (isStarted) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setElapsedSeconds(0);
    }
    return () => clearInterval(interval);
  }, [isStarted]);

  const formatTimer = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}m ${s < 10 ? '0' : ''}${s}s`;
  };

  // Find next customer waiting for this barber or Any
  const nextForBarber = waitingCustomers.find(
    (c) => c.barber === activeBarber.name || c.barber === 'Any'
  );

  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      {/* Main Container Box (Sage Green #7E9A82 inside box) */}
      <div className="bg-[#7E9A82] border-2 border-[#432f2e]/30 rounded-3xl p-6 shadow-xl space-y-6 text-[#432f2e]">
        
        {/* Header & Station Selector */}
        <div className="space-y-3 border-b-2 border-[#432f2e]/20 pb-5">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center space-x-2 text-[#432f2e]">
              <Scissors className="w-5 h-5 stroke-[#432f2e]" />
              <span className="text-xs uppercase font-black tracking-wider">
                {lang === 'gu' ? 'બાર્બર સ્ટેશન' : 'Barber Station View'}
              </span>
            </div>
            
            <button
              onClick={() => toggleBarberStatus(activeBarber.id)}
              className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border-2 border-[#432f2e] bg-[#EDECEA] text-[#432f2e] cursor-pointer shadow-xs transition-all"
            >
              {isBreak ? 'On Break' : 'Available'}
            </button>
          </div>

          {/* Barber Switcher Tabs */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            {barbers.map((b) => (
              <button
                key={b.id}
                onClick={() => setSelectedBarberId(b.id)}
                className={`p-2 rounded-2xl border-2 text-center transition-all cursor-pointer ${
                  selectedBarberId === b.id
                    ? 'bg-[#EDECEA] border-[#432f2e] shadow-sm'
                    : 'bg-[#EDECEA]/60 border-[#432f2e]/30 hover:border-[#432f2e]/70'
                }`}
              >
                <div className="text-xs font-black text-[#432f2e]">{b.name}</div>
                <div className="text-[10px] text-[#432f2e]/80 font-semibold">{b.chair}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Current Customer in Chair / Called Card */}
        {isBusy ? (
          <div className="bg-[#EDECEA] border-2 border-[#432f2e] rounded-3xl p-6 space-y-4 shadow-sm text-[#432f2e]">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-[#432f2e] font-black flex items-center space-x-1.5">
                <span className={`w-2.5 h-2.5 rounded-full ${isStarted ? 'bg-[#7E9A82] border border-[#432f2e] animate-pulse' : 'bg-amber-600'}`}></span>
                <span>{isStarted ? 'In Chair (Serving)' : 'Customer Called'}</span>
              </span>
              <span className="text-xs font-mono font-black text-[#432f2e] bg-[#7E9A82] px-2.5 py-0.5 rounded-lg border border-[#432f2e]/30">
                Token #{activeBarber.currentCustomer.token}
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-black text-[#432f2e]">
                {activeBarber.currentCustomer.name}
              </h3>
              {isStarted ? (
                <p className="text-xs text-[#432f2e]/85 flex items-center space-x-1.5 font-bold font-mono">
                  <Clock className="w-3.5 h-3.5 stroke-[#432f2e]" />
                  <span>Timer: {formatTimer(elapsedSeconds)}</span>
                </p>
              ) : (
                <p className="text-xs text-[#432f2e] font-bold bg-[#7E9A82]/20 p-2 rounded-xl border border-[#432f2e]/30">
                  Customer has been called. Tap <b>[ Start ]</b> when they sit in chair.
                </p>
              )}
            </div>

            {/* Services to perform */}
            <div className="bg-[#7E9A82]/25 p-3.5 rounded-2xl border border-[#432f2e]/20 space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-[#432f2e]/85 font-bold block">
                Services to perform:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeBarber.currentCustomer.services.map((s, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded-lg bg-[#EDECEA] text-[#432f2e] font-bold border border-[#432f2e]/30"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Big Action Buttons: [ Start ] -> [ Done ] */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => startService(activeBarber.id)}
                disabled={isStarted}
                className={`py-3.5 rounded-2xl text-xs font-black flex items-center justify-center space-x-2 border-2 border-[#432f2e] transition-all cursor-pointer ${
                  isStarted
                    ? 'bg-[#EDECEA]/50 text-[#432f2e]/40 border-[#432f2e]/20 cursor-not-allowed'
                    : 'bg-[#7E9A82] hover:bg-[#6c8670] text-[#432f2e] shadow-md'
                }`}
              >
                <Play className="w-4 h-4 fill-current stroke-none" />
                <span>{isStarted ? 'Started' : 'Start Service'}</span>
              </button>

              <button
                onClick={() => markBarberDone(activeBarber.id)}
                className="py-3.5 bg-[#EDECEA] hover:bg-[#dedcd8] text-[#432f2e] font-black rounded-2xl text-xs flex items-center justify-center space-x-2 shadow-md cursor-pointer transition-all border-2 border-[#432f2e] active:scale-98"
              >
                <CheckCircle className="w-4 h-4 stroke-[#432f2e]" />
                <span>Done (Finish)</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-[#EDECEA] border-2 border-dashed border-[#432f2e]/40 rounded-3xl p-8 text-center space-y-3 text-[#432f2e]">
            <div className="w-12 h-12 rounded-full bg-[#7E9A82] border-2 border-[#432f2e] flex items-center justify-center mx-auto text-[#432f2e]">
              <Scissors className="w-6 h-6 stroke-[#432f2e]" />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-black text-[#432f2e]">Chair is Vacant</h4>
              <p className="text-xs text-[#432f2e]/75 font-medium">
                {isBreak ? 'Barber is taking a short rest' : 'Ready to seat the next client'}
              </p>
            </div>
            
            <button
              onClick={() => callNext(activeBarber.id)}
              disabled={isBreak || waitingCustomers.length === 0}
              className="px-5 py-3 bg-[#7E9A82] hover:bg-[#6c8670] text-[#432f2e] border-2 border-[#432f2e] font-black rounded-2xl text-xs shadow-md disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <span>Call Next Customer</span>
            </button>
          </div>
        )}

        {/* 'Next for you: S-15 Kunal (Haircut)' */}
        <div className="p-4 rounded-2xl bg-[#EDECEA] border-2 border-[#432f2e]/30 space-y-1.5 text-[#432f2e]">
          <div className="flex items-center justify-between text-xs text-[#432f2e] font-black">
            <span>Next for You:</span>
            <span className="font-mono text-[11px] bg-[#7E9A82] px-2 py-0.5 rounded border border-[#432f2e]/30">
              {nextForBarber ? nextForBarber.token : 'None'}
            </span>
          </div>
          {nextForBarber ? (
            <div className="flex items-center justify-between text-xs text-[#432f2e]">
              <span className="font-extrabold">{nextForBarber.name}</span>
              <span className="text-[#432f2e]/85 font-medium">{nextForBarber.services.join(', ')}</span>
            </div>
          ) : (
            <div className="text-xs text-[#432f2e]/65 font-medium">
              No upcoming clients waiting for this station or 'Any'.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

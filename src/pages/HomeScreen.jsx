import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useQueue } from '../context/QueueContext';
import { 
  Scissors, 
  Clock, 
  Users, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Smartphone,
  ChevronRight,
  AlertCircle
} from 'lucide-react';

export default function HomeScreen({ onNavigate }) {
  const { lang, t } = useLanguage();
  const { barbers, waitingCustomers, isQueueOpen, getCustomerWaitTime } = useQueue();

  const waitCount = waitingCustomers.length;
  // Calculate estimated wait time based on services of waiting customers and working barbers
  const activeBarbersCount = barbers.filter((b) => b.status !== 'break').length || 1;
  const totalMins = waitingCustomers.reduce((sum, c) => sum + (c.serviceMinutes || 30), 0);
  const estWaitMin = Math.max(10, Math.round(totalMins / activeBarbersCount));

  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      
      {/* Mobile Card Container (Inside the box: Sage Green #7E9A82) */}
      <div className="bg-[#7E9A82] border-2 border-[#432f2e]/30 rounded-3xl p-6 sm:p-7 shadow-xl space-y-6 text-[#432f2e]">
        
        {/* Salon Header with Open Badge */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-3xl bg-[#EDECEA] text-[#432f2e] border-2 border-[#432f2e] flex items-center justify-center mx-auto shadow-md">
            <Scissors className="w-8 h-8 -rotate-45 stroke-[#432f2e] stroke-[2.5]" />
          </div>

          <div className="space-y-1">
            <h1 className="text-4xl font-black text-[#432f2e] tracking-wider uppercase">
              NOIR
            </h1>
            <p className="text-xs uppercase tracking-widest font-extrabold text-[#432f2e]/80">
              Luxury Grooming Lounge
            </p>
          </div>

          {/* Open / Closes Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#EDECEA] border border-[#432f2e]/30 text-xs font-black text-[#432f2e] shadow-xs">
            <span className={`w-2.5 h-2.5 rounded-full ${isQueueOpen ? 'bg-emerald-600 animate-pulse' : 'bg-amber-600'}`}></span>
            <span>{isQueueOpen ? 'Open · Closes 9 PM' : 'Online Queue Closed · Closes 9 PM'}</span>
          </div>
        </div>

        {/* Live Card: '6 people waiting · about 50 min' */}
        <div className="bg-[#EDECEA] border-2 border-[#432f2e]/30 rounded-3xl p-5 shadow-sm space-y-3 text-[#432f2e]">
          <div className="flex items-center justify-between text-xs font-black uppercase text-[#432f2e]/70 border-b border-[#432f2e]/15 pb-2">
            <span className="flex items-center space-x-1.5">
              <Users className="w-4 h-4 stroke-[#432f2e]" />
              <span>Live Queue Status</span>
            </span>
            <span className="font-mono text-[10px] bg-[#7E9A82]/30 px-2 py-0.5 rounded-md border border-[#432f2e]/20 text-[#432f2e] font-bold">
              REAL-TIME
            </span>
          </div>

          <div className="text-center py-2 space-y-1">
            <div className="text-2xl font-black text-[#432f2e]">
              {waitCount} {lang === 'gu' ? 'ગ્રાહકો કતારમાં' : 'people waiting'}
            </div>
            <div className="text-xs font-bold text-[#432f2e]/80 flex items-center justify-center space-x-1">
              <Clock className="w-3.5 h-3.5 stroke-[#432f2e]" />
              <span>about {estWaitMin} min estimated wait</span>
            </div>
          </div>
        </div>

        {/* Barber Chips with Status: Ravi (busy) · Amit (free) · Imran (on break) */}
        <div className="space-y-2.5">
          <label className="text-xs font-black uppercase tracking-wider text-[#432f2e]">
            Barbers on Duty Today
          </label>
          
          <div className="grid grid-cols-3 gap-2">
            {barbers.map((b) => {
              const isBusy = b.status === 'busy';
              const isFree = b.status === 'free';

              return (
                <div
                  key={b.id}
                  className="bg-[#EDECEA] border-2 border-[#432f2e]/30 rounded-2xl p-2.5 text-center space-y-1.5 shadow-xs"
                >
                  <img
                    src={b.avatar}
                    alt={b.name}
                    className="w-10 h-10 rounded-xl object-cover mx-auto border-2 border-[#432f2e]/30"
                  />
                  <div className="text-xs font-black text-[#432f2e]">{b.name}</div>
                  <span
                    className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider border ${
                      isBusy
                        ? 'bg-[#7E9A82]/30 text-[#432f2e] border-[#432f2e]/30'
                        : isFree
                        ? 'bg-emerald-100 text-emerald-950 border-emerald-400'
                        : 'bg-amber-100 text-amber-950 border-amber-400'
                    }`}
                  >
                    {b.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Big Button [ Join Queue ] */}
        {isQueueOpen ? (
          <button
            onClick={() => onNavigate('join')}
            className="w-full py-4 bg-[#EDECEA] hover:bg-[#EDECEA]/90 text-[#432f2e] border-2 border-[#432f2e] font-black rounded-2xl text-base shadow-lg flex items-center justify-center space-x-2 cursor-pointer active:scale-[0.99] transition-all"
          >
            <span className="text-[#432f2e]">
              {lang === 'gu' ? 'કતારમાં જોડાઓ' : 'Join Queue'}
            </span>
            <ArrowRight className="w-5 h-5 stroke-[#432f2e] stroke-[2.5]" />
          </button>
        ) : (
          <div className="space-y-2">
            <button
              disabled
              className="w-full py-4 bg-[#EDECEA]/50 text-[#432f2e]/50 font-black rounded-2xl text-base flex items-center justify-center space-x-2 cursor-not-allowed border-2 border-[#432f2e]/20"
            >
              <span>{lang === 'gu' ? 'ઓનલાઈન કતાર બંધ છે' : 'Online Queue Closed'}</span>
            </button>
            <div className="p-3 bg-[#EDECEA] border border-[#432f2e]/25 rounded-2xl flex items-center space-x-2 text-xs font-bold text-[#432f2e]">
              <AlertCircle className="w-4 h-4 text-[#432f2e] shrink-0" />
              <span>Online queue is closed. Walk-ins still welcome at salon reception.</span>
            </div>
          </div>
        )}

        {/* Quick Screen Preview Grid */}
        <div className="pt-2 border-t border-[#432f2e]/20">
          <div className="text-[11px] font-black text-[#432f2e]/70 uppercase tracking-wider mb-2">
            Quick Navigation:
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => onNavigate('status')}
              className="p-2.5 rounded-xl bg-[#EDECEA] hover:bg-white text-left font-black text-[#432f2e] flex items-center justify-between cursor-pointer border border-[#432f2e]/30 shadow-xs"
            >
              <span>My Status</span>
              <ChevronRight className="w-3.5 h-3.5 stroke-[#432f2e]" />
            </button>
            <button
              onClick={() => onNavigate('reception')}
              className="p-2.5 rounded-xl bg-[#EDECEA] hover:bg-white text-left font-black text-[#432f2e] flex items-center justify-between cursor-pointer border border-[#432f2e]/30 shadow-xs"
            >
              <span>Reception Tablet</span>
              <ChevronRight className="w-3.5 h-3.5 stroke-[#432f2e]" />
            </button>
            <button
              onClick={() => onNavigate('tv')}
              className="p-2.5 rounded-xl bg-[#EDECEA] hover:bg-white text-left font-black text-[#432f2e] flex items-center justify-between cursor-pointer border border-[#432f2e]/30 shadow-xs"
            >
              <span>Waiting TV Display</span>
              <ChevronRight className="w-3.5 h-3.5 stroke-[#432f2e]" />
            </button>
            <button
              onClick={() => onNavigate('barber')}
              className="p-2.5 rounded-xl bg-[#EDECEA] hover:bg-white text-left font-black text-[#432f2e] flex items-center justify-between cursor-pointer border border-[#432f2e]/30 shadow-xs"
            >
              <span>Barber Station</span>
              <ChevronRight className="w-3.5 h-3.5 stroke-[#432f2e]" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}

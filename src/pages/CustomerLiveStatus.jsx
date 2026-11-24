import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useQueue, triggerVibration, playChimeSound } from '../context/QueueContext';
import { 
  Bell, 
  Clock, 
  Users, 
  Scissors, 
  Navigation, 
  XCircle, 
  AlertCircle,
  Sparkles,
  CheckCircle2,
  Coffee,
  Volume2
} from 'lucide-react';

export default function CustomerLiveStatus() {
  const { lang, t } = useLanguage();
  const { 
    customers, 
    waitingCustomers, 
    barbers,
    currentUserToken, 
    getCustomerWaitTime,
    cancelCustomer,
    setCustomerInChair
  } = useQueue();

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState(null);

  // Find customer by token
  const customer = customers.find((c) => c.token === currentUserToken) || {
    token: currentUserToken || 'S-14',
    name: 'Deepak Joshi',
    phone: '9898034567',
    services: ['Haircut'],
    barber: 'Any',
    status: 'waiting',
    chair: 'Chair 1',
  };

  // Determine current position in queue
  const waitingIndex = waitingCustomers.findIndex((c) => c.token === customer.token);
  const positionInLine = waitingIndex >= 0 ? waitingIndex + 1 : 1;
  const isSecondInLine = positionInLine === 2;
  const isInChair = customer.status === 'in_chair';
  const isTurn = customer.status === 'called' && !isInChair;

  // Dynamic wait time calculated using services ahead ÷ working barbers
  const estimatedWaitMinutes = getCustomerWaitTime(customer.token);

  // Check if customer's preferred barber is on break
  const preferredBarberObj = barbers.find((b) => b.name === customer.barber);
  const isPreferredBarberOnBreak = preferredBarberObj && preferredBarberObj.status === 'break';

  // Trigger vibration and chime when "It's your turn!" appears
  useEffect(() => {
    if (isTurn) {
      triggerVibration();
      playChimeSound();
    }
  }, [isTurn]);

  // Handle Walking to the Chair button click
  const handleWalkingToChair = () => {
    if (customer.status === 'in_chair') return;
    triggerVibration();
    playChimeSound();
    setCustomerInChair(customer.token);
    const assignedName = customer.assignedBarber || customer.barber || 'your barber';
    setFeedbackMessage(`You're seated! Service with ${assignedName} has started.`);
  };

  const handleConfirmCancel = () => {
    cancelCustomer(customer.token);
    setShowCancelModal(false);
  };

  // -------------------------------------------------------------
  // 1. FULL-SCREEN GOLD "IT'S YOUR TURN!" VIEW
  // -------------------------------------------------------------
  if (isTurn) {
    const assignedBarberName = customer.assignedBarber || customer.barber || 'Amit';
    const chairName = customer.chair || 'Chair 2';

    return (
      <div className="fixed inset-0 z-50 bg-[#d4af37] text-[#432f2e] flex flex-col items-center justify-between p-6 sm:p-10 select-none overflow-y-auto">
        
        {/* Top subtle bar */}
        <div className="w-full max-w-lg flex items-center justify-between text-xs font-black uppercase tracking-widest text-[#432f2e]/80">
          <span className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 fill-current" />
            <span>NOIR</span>
          </span>
        </div>

        {/* Central Exciting Notification Container with Gentle Pulse */}
        <div className="my-auto max-w-lg w-full text-center space-y-8 animate-turn-pulse">
          
          {/* Glowing Animated Icon */}
          <div className="relative inline-flex items-center justify-center">
            <div className="absolute w-32 h-32 rounded-full bg-[#feefb8]/50 animate-ping opacity-60"></div>
            <div className="relative w-28 h-28 rounded-full bg-[#432f2e] text-[#d4af37] flex items-center justify-center shadow-2xl border-4 border-[#feefb8]">
              <Scissors className="w-14 h-14 -rotate-45 stroke-[#feefb8]" />
            </div>
          </div>

          {/* Large Bold Readability Heading */}
          <div className="space-y-3">
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#feefb8] text-[#432f2e] font-black text-xs uppercase tracking-widest border-2 border-[#432f2e] shadow-sm">
              Token #{customer.token}
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-[#432f2e] tracking-tight uppercase leading-none drop-shadow-xs">
              {lang === 'gu' ? 'તમારો વારો આવી ગયો!' : "It's Your Turn!"}
            </h1>
            <p className="text-xl sm:text-2xl font-black text-[#432f2e] bg-[#feefb8]/90 py-2 px-4 rounded-2xl inline-block border-2 border-[#432f2e]/30 shadow-sm">
              Go to <span className="underline decoration-4 underline-offset-4">{assignedBarberName}</span> ({chairName})
            </p>
          </div>

          {/* Client Details Box */}
          <div className="bg-[#feefb8] border-3 border-[#432f2e] rounded-3xl p-6 shadow-2xl text-left space-y-3 max-w-md mx-auto">
            <div className="flex items-center justify-between text-xs font-black text-[#432f2e] border-b border-[#432f2e]/20 pb-2">
              <span>Client: {customer.name}</span>
              <span className="font-mono">{customer.phone}</span>
            </div>
            <div className="text-sm font-extrabold text-[#432f2e]">
              Services: {customer.services.join(' + ')}
            </div>
            <div className="flex items-center space-x-2 text-xs font-bold text-[#432f2e]/80">
              <CheckCircle2 className="w-4 h-4 text-emerald-800" />
              <span>Your chair is disinfected and ready!</span>
            </div>
          </div>

          {/* Action Button: I'm Walking to the Chair */}
          <button
            onClick={handleWalkingToChair}
            className="w-full max-w-md mx-auto py-4 bg-[#432f2e] text-[#EDECEA] font-black rounded-2xl text-base shadow-2xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center space-x-2 cursor-pointer border-2 border-[#EDECEA]"
          >
            <span>I'm Walking to the Chair</span>
          </button>
        </div>

        {/* Footer info */}
        <div className="text-center text-xs font-black text-[#432f2e]/80">
          Phone vibration triggered &bull; NOIR Salon
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 2. NORMAL MY STATUS SCREEN
  // -------------------------------------------------------------
  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      
      {/* Feedback Alert if walking to chair or action performed */}
      {feedbackMessage && (
        <div className="bg-[#7E9A82] border-2 border-[#432f2e] rounded-2xl p-4 flex items-center justify-between text-[#432f2e] shadow-md animate-in fade-in duration-200">
          <div className="flex items-center space-x-3 text-xs font-black">
            <CheckCircle2 className="w-5 h-5 shrink-0 stroke-[#432f2e]" />
            <span>{feedbackMessage}</span>
          </div>
          <button 
            onClick={() => setFeedbackMessage(null)}
            className="text-xs font-black underline cursor-pointer ml-2"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Container Box (Sage Green #7E9A82 inside box) */}
      <div className="bg-[#7E9A82] text-[#432f2e] border-2 border-[#432f2e]/30 rounded-3xl p-6 shadow-xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-1">
          <div className="inline-flex p-3 rounded-2xl bg-[#EDECEA] text-[#432f2e] mb-2 border border-[#432f2e]/20 shadow-sm">
            <Clock className="w-6 h-6 stroke-[#432f2e]" />
          </div>
          <h2 className="text-2xl font-black text-[#432f2e] tracking-tight">
            {lang === 'gu' ? 'મારું સ્ટેટસ' : 'My Status'}
          </h2>
          <p className="text-xs text-[#432f2e]/85 font-semibold">
            {lang === 'gu' ? 'તમારો વારો રીઅલ-ટાઇમ ટ્રેક કરો' : 'Live real-time queue position and estimated countdown'}
          </p>
        </div>

        {/* Barber on break notice */}
        {isPreferredBarberOnBreak && (
          <div className="bg-[#EDECEA] border-2 border-[#432f2e] rounded-2xl p-3.5 flex items-center space-x-2.5 text-xs text-[#432f2e] font-bold shadow-sm">
            <Coffee className="w-4 h-4 text-[#432f2e] shrink-0" />
            <span>{customer.barber} is currently on a short break. Your turn will resume shortly.</span>
          </div>
        )}

        {/* In Chair Status Banner */}
        {isInChair && (
          <div className="bg-[#EDECEA] border-2 border-[#432f2e] rounded-2xl p-4 flex items-center space-x-3 text-left shadow-md">
            <div className="p-2 rounded-xl bg-[#7E9A82] text-[#432f2e] border border-[#432f2e]/30">
              <Scissors className="w-5 h-5 stroke-[#432f2e]" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-sm font-black text-[#432f2e] uppercase tracking-wide">
                Currently in Chair
              </h4>
              <p className="text-xs text-[#432f2e]/90 font-medium">
                Your service is actively underway with {customer.assignedBarber || customer.barber || 'your barber'}.
              </p>
            </div>
          </div>
        )}

        {/* Banner: When 2nd in line -> 'Start coming to the salon' */}
        {isSecondInLine && !isInChair && (
          <div className="bg-[#EDECEA] border-2 border-[#432f2e] rounded-2xl p-4 flex items-start space-x-3 text-left shadow-md animate-bounce">
            <div className="p-2 rounded-xl bg-[#7E9A82] text-[#432f2e] border border-[#432f2e]/30">
              <Navigation className="w-5 h-5 stroke-[#432f2e]" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-sm font-black text-[#432f2e] uppercase tracking-wide">
                Start coming to the salon!
              </h4>
              <p className="text-xs text-[#432f2e]/90 font-medium">
                You are 2nd in line. Your chair will be ready in approximately 10–15 minutes.
              </p>
            </div>
          </div>
        )}

        {/* Token Big Display Card */}
        <div className="bg-[#EDECEA] border-2 border-[#432f2e]/30 rounded-3xl p-6 text-center space-y-2 shadow-inner">
          <span className="text-xs uppercase tracking-widest text-[#432f2e]/80 font-black">
            Your Token
          </span>
          <div className="text-6xl font-black tracking-tight text-[#432f2e] font-mono">
            {customer.token}
          </div>
          <div className="inline-block px-3 py-1 rounded-full bg-[#7E9A82] border border-[#432f2e]/25 text-xs font-bold text-[#432f2e]">
            {customer.services.join(' + ')}
          </div>
        </div>

        {/* Circular Countdown & Metrics Grid */}
        <div className="grid grid-cols-2 gap-3">
          
          {/* Position in line */}
          <div className="p-4 rounded-2xl bg-[#EDECEA] border-2 border-[#432f2e]/20 space-y-1">
            <div className="flex items-center space-x-2 text-[#432f2e] text-xs font-bold">
              <Users className="w-4 h-4 stroke-[#432f2e]" />
              <span>Position</span>
            </div>
            <div className="text-xl font-black text-[#432f2e]">
              {isInChair ? 'In Chair' : positionInLine === 1 ? '1st in line' : positionInLine === 2 ? '2nd in line' : `${positionInLine}th in line`}
            </div>
            <div className="text-[10px] text-[#432f2e]/75 font-medium">
              {isInChair ? 'Service active' : `${waitingCustomers.length} waiting in salon`}
            </div>
          </div>

          {/* Dynamic Countdown Timer based on services ahead */}
          <div className="p-4 rounded-2xl bg-[#EDECEA] border-2 border-[#432f2e]/20 space-y-1">
            <div className="flex items-center space-x-2 text-[#432f2e] text-xs font-bold">
              <Clock className="w-4 h-4 stroke-[#432f2e]" />
              <span>Countdown</span>
            </div>
            <div className="text-xl font-black text-[#432f2e]">
              {isInChair ? 'Active' : `~${estimatedWaitMinutes} min`}
            </div>
            <div className="text-[10px] text-[#432f2e]/75 font-medium">
              {isInChair ? 'Service in progress' : 'Goes down as turns finish'}
            </div>
          </div>
        </div>

        {/* Assigned / Preferred Barber Info */}
        <div className="p-4 rounded-2xl bg-[#EDECEA] border-2 border-[#432f2e]/25 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#7E9A82] border border-[#432f2e]/30 flex items-center justify-center text-[#432f2e]">
              <Scissors className="w-5 h-5 stroke-[#432f2e]" />
            </div>
            <div>
              <div className="text-[11px] text-[#432f2e]/70 uppercase font-bold">
                {customer.assignedBarber ? 'Assigned Barber' : 'Preferred Barber'}
              </div>
              <div className="text-sm font-black text-[#432f2e]">
                {customer.assignedBarber || (customer.barber === 'Any' ? 'Any Barber (Fastest)' : customer.barber)}
              </div>
            </div>
          </div>
          <span className="text-xs bg-[#7E9A82] text-[#432f2e] font-black px-2.5 py-1 rounded-lg border border-[#432f2e]/20">
            {isInChair ? 'In Chair' : customer.assignedBarber ? 'Called' : customer.barber === 'Any' ? 'Next Free' : 'Reserved'}
          </span>
        </div>

        {/* Cancel My Spot Button */}
        {!isInChair && (
          <div className="pt-2 border-t border-[#432f2e]/20">
            <button
              onClick={() => setShowCancelModal(true)}
              className="w-full py-2.5 bg-[#EDECEA] hover:bg-[#e2e1de] text-[#432f2e] border-2 border-[#432f2e]/40 font-bold rounded-2xl text-xs flex items-center justify-center space-x-1.5 cursor-pointer transition-all"
            >
              <XCircle className="w-3.5 h-3.5 stroke-[#432f2e]" />
              <span>Cancel My Spot in Queue</span>
            </button>
          </div>
        )}

      </div>

      {/* Confirmation Modal for Cancel My Spot */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 bg-[#432f2e]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#EDECEA] border-3 border-[#432f2e] rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4 text-center animate-in fade-in duration-200">
            <div className="w-12 h-12 rounded-full bg-[#7E9A82] text-[#432f2e] border-2 border-[#432f2e] flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6 stroke-[#432f2e]" />
            </div>
            
            <div className="space-y-1">
              <h3 className="text-lg font-black text-[#432f2e]">Cancel your spot?</h3>
              <p className="text-xs text-[#432f2e]/80 font-medium">
                Are you sure you want to cancel token <b>#{customer.token}</b>? You will lose your position in line.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => setShowCancelModal(false)}
                className="py-2.5 rounded-xl border border-[#432f2e]/40 text-xs font-bold hover:bg-[#7E9A82]/20 cursor-pointer text-[#432f2e]"
              >
                Keep My Spot
              </button>
              <button
                onClick={handleConfirmCancel}
                className="py-2.5 bg-[#7E9A82] hover:bg-[#6c8670] text-[#432f2e] border-2 border-[#432f2e] rounded-xl text-xs font-black shadow-md cursor-pointer"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

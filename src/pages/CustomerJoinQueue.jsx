import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useQueue, SERVICES } from '../context/QueueContext';
import { Smartphone, Scissors, UserCheck, Clock, Check, ArrowRight, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';

export default function CustomerJoinQueue({ onNavigate }) {
  const { lang, t } = useLanguage();
  const { joinQueue, waitingCustomers, isQueueOpen, barbers } = useQueue();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedServices, setSelectedServices] = useState([SERVICES[0]]); // default Haircut
  const [preferredBarber, setPreferredBarber] = useState('Any');
  const [error, setError] = useState('');
  const [duplicateNotice, setDuplicateNotice] = useState(null);

  // Handle phone input: digits only, max 10
  const handlePhoneChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhone(val);
    if (error) setError('');
    if (duplicateNotice) setDuplicateNotice(null);
  };

  const toggleService = (srv) => {
    if (error) setError('');
    const exists = selectedServices.some((s) => s.id === srv.id);
    if (exists) {
      if (selectedServices.length === 1) {
        setError(lang === 'gu' ? 'કૃપા કરીને ઓછામાં ઓછી એક સેવા પસંદ કરો.' : 'Please select at least one service.');
        return;
      }
      setSelectedServices(selectedServices.filter((s) => s.id !== srv.id));
    } else {
      if (selectedServices.length >= 3) {
        setError(lang === 'gu' ? 'મહત્તમ 3 સેવાઓ પસંદ કરી શકાય છે.' : 'Maximum 3 services can be selected per token.');
        return;
      }
      setSelectedServices([...selectedServices, srv]);
    }
  };

  // Calculations for live summary
  const totalDuration = selectedServices.reduce((sum, s) => sum + s.time, 0);
  const totalPrice = selectedServices.reduce((sum, s) => sum + s.price, 0);
  
  // Calculate expected wait time ≈ total minutes of services ahead ÷ active barbers
  const activeBarbersCount = barbers.filter((b) => b.status !== 'break').length || 1;
  const totalMinsAhead = waitingCustomers.reduce((sum, c) => sum + (c.serviceMinutes || 30), 0);
  const expectedWait = Math.max(10, Math.round(totalMinsAhead / activeBarbersCount));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isQueueOpen) {
      setError(lang === 'gu' ? 'ઓનલાઈન કતાર બંધ છે. કૃપા કરીને રિસેપ્શનનો સંપર્ક કરો.' : 'Online queue is closed. Please visit reception for walk-in entry.');
      return;
    }
    if (!name.trim()) {
      setError(lang === 'gu' ? 'કૃપા કરીને તમારું નામ દાખલ કરો.' : 'Please enter your full name.');
      return;
    }
    if (phone.length !== 10) {
      setError(lang === 'gu' ? 'કૃપા કરીને 10 અંકનો માન્ય મોબાઇલ નંબર દાખલ કરો.' : 'Please enter a valid 10-digit phone number.');
      return;
    }
    if (selectedServices.length === 0) {
      setError(lang === 'gu' ? 'કૃપા કરીને ઓછામાં ઓછી એક સેવા પસંદ કરો.' : 'Please select at least one service.');
      return;
    }

    // Join queue and get token
    const result = joinQueue({
      name: name.trim(),
      phone,
      selectedServices,
      preferredBarber,
    });

    if (result.isDuplicate) {
      setDuplicateNotice(`You already have an active spot in queue (Token #${result.token}). Showing your live status...`);
      setTimeout(() => {
        if (onNavigate) onNavigate('status');
      }, 1500);
      return;
    }

    if (onNavigate) {
      onNavigate('status');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      {/* Mobile Card Frame (Inside the box: Sage Green #7E9A82) */}
      <div className="bg-[#7E9A82] border-2 border-[#432f2e]/30 rounded-3xl p-6 shadow-xl space-y-6 text-[#432f2e]">
        
        {/* Header */}
        <div className="text-center space-y-1">
          <div className="inline-flex p-3 rounded-2xl bg-[#EDECEA] text-[#432f2e] mb-2 border-2 border-[#432f2e]/30 shadow-sm">
            <Smartphone className="w-6 h-6 stroke-[#432f2e]" />
          </div>
          <h2 className="text-2xl font-black text-[#432f2e] tracking-tight">
            {lang === 'gu' ? 'કતારમાં જોડાઓ' : 'Join the Salon Queue'}
          </h2>
          <p className="text-xs text-[#432f2e]/80 font-semibold">
            {lang === 'gu' 
              ? 'સેવાઓ અને બાર્બર પસંદ કરો, ટોકન મેળવો અને લાઈવ સ્ટેટસ જુઓ' 
              : 'Pick your services and barber to secure your turn.'}
          </p>
        </div>

        {/* Closed Queue Banner */}
        {!isQueueOpen && (
          <div className="p-3.5 rounded-2xl bg-[#EDECEA] border-2 border-amber-600 text-[#432f2e] text-xs space-y-1">
            <div className="flex items-center space-x-2 font-black text-amber-950">
              <AlertCircle className="w-4 h-4 text-amber-800 shrink-0" />
              <span>Online Queue is Closed</span>
            </div>
            <p className="text-[11px] text-[#432f2e]/80 font-medium">
              Online booking closes 30 minutes before closing. Walk-ins are still welcome directly at the salon reception!
            </p>
          </div>
        )}

        {/* Duplicate Notice */}
        {duplicateNotice && (
          <div className="p-3.5 rounded-2xl bg-[#EDECEA] border-2 border-[#432f2e] text-[#432f2e] text-xs flex items-center space-x-2 font-black animate-pulse">
            <CheckCircle2 className="w-4 h-4 stroke-[#432f2e] shrink-0" />
            <span>{duplicateNotice}</span>
          </div>
        )}

        {/* Error message if any */}
        {error && (
          <div className="p-3 rounded-xl bg-[#EDECEA] border-2 border-rose-500 text-rose-950 text-xs flex items-center space-x-2 font-bold">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-700" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* 1. Name Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-wider text-[#432f2e] flex items-center justify-between">
              <span>{lang === 'gu' ? 'ગ્રાહકનું નામ' : 'Your Full Name'} *</span>
              <span className="text-[10px] text-[#432f2e]/70 font-semibold">Required</span>
            </label>
            <input
              type="text"
              disabled={!isQueueOpen}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError('');
              }}
              placeholder={lang === 'gu' ? 'દા.ત. અક્ષય પટેલ' : 'e.g. Akshay Patel'}
              className="w-full px-4 py-3 bg-[#EDECEA] border-2 border-[#432f2e]/30 rounded-2xl text-[#432f2e] placeholder-[#432f2e]/50 text-sm font-bold focus:outline-none focus:border-[#432f2e] transition-all disabled:opacity-50"
            />
          </div>

          {/* 2. Phone Input (10 Digits) */}
          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-wider text-[#432f2e] flex items-center justify-between">
              <span>{lang === 'gu' ? 'મોબાઇલ નંબર (10 અંક)' : 'Phone Number (10 digits)'} *</span>
              <span className="text-[10px] font-mono font-black text-[#432f2e]/80">
                {phone.length}/10
              </span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3.5 text-xs font-black text-[#432f2e]/70 select-none">
                +91
              </span>
              <input
                type="tel"
                disabled={!isQueueOpen}
                value={phone}
                onChange={handlePhoneChange}
                placeholder="98765 43210"
                maxLength={10}
                className="w-full pl-12 pr-4 py-3 bg-[#EDECEA] border-2 border-[#432f2e]/30 rounded-2xl text-[#432f2e] placeholder-[#432f2e]/50 text-sm font-bold tracking-wider focus:outline-none focus:border-[#432f2e] transition-all font-mono disabled:opacity-50"
              />
            </div>
            <div className="text-[10px] text-[#432f2e]/70 font-medium">
              One active spot per phone number.
            </div>
          </div>

          {/* 3. Service Cards (Multi-select, Max 3) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black uppercase tracking-wider text-[#432f2e]">
                {lang === 'gu' ? 'સેવાઓ પસંદ કરો (મહત્તમ 3)' : 'Select Services (Max 3)'} *
              </label>
              <span className="text-[11px] font-black text-[#432f2e] px-2.5 py-0.5 rounded-full bg-[#EDECEA] border border-[#432f2e]/30">
                {selectedServices.length}/3 Selected
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {SERVICES.map((srv) => {
                const isSelected = selectedServices.some((s) => s.id === srv.id);
                return (
                  <button
                    key={srv.id}
                    type="button"
                    disabled={!isQueueOpen}
                    onClick={() => toggleService(srv)}
                    className={`p-3 rounded-2xl border-2 text-left flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#EDECEA] border-[#432f2e] shadow-sm font-black'
                        : 'bg-[#EDECEA]/70 border-[#432f2e]/20 hover:border-[#432f2e]/50 hover:bg-[#EDECEA]'
                    } disabled:opacity-50`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${
                        isSelected ? 'bg-[#432f2e] border-[#432f2e]' : 'border-[#432f2e]/40'
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3] stroke-[#EDECEA]" />}
                      </div>
                      <div>
                        <div className="text-xs font-black text-[#432f2e]">
                          {lang === 'gu' ? srv.nameGu : srv.name}
                        </div>
                        <div className="text-[11px] text-[#432f2e]/70 flex items-center space-x-1.5 font-bold">
                          <Clock className="w-3 h-3" />
                          <span>{srv.time} min</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-xs font-black text-[#432f2e]">
                      ₹{srv.price}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Barber Picker */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-[#432f2e]">
              {lang === 'gu' ? 'બાર્બર પસંદ કરો' : 'Choose Preferred Barber'}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {/* Any Barber (Fastest) */}
              <button
                type="button"
                disabled={!isQueueOpen}
                onClick={() => setPreferredBarber('Any')}
                className={`col-span-2 p-3 rounded-2xl border-2 flex items-center justify-between transition-all cursor-pointer ${
                  preferredBarber === 'Any'
                    ? 'bg-[#EDECEA] border-[#432f2e] shadow-sm font-black'
                    : 'bg-[#EDECEA]/70 border-[#432f2e]/20 hover:border-[#432f2e]/50'
                } disabled:opacity-50`}
              >
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#432f2e] text-[#EDECEA] flex items-center justify-center font-bold text-xs">
                    ⚡
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-black text-[#432f2e]">
                      {lang === 'gu' ? 'કોઈપણ બાર્બર (સૌથી ઝડપી)' : 'Any Barber (Fastest)'}
                    </div>
                    <div className="text-[10px] text-[#432f2e]/70 font-semibold">Takes next available chair</div>
                  </div>
                </div>
                {preferredBarber === 'Any' && (
                  <span className="text-[10px] font-black uppercase bg-[#432f2e] text-[#EDECEA] px-2 py-0.5 rounded-lg">
                    Selected
                  </span>
                )}
              </button>

              {/* 3 Named Barbers: Ravi, Amit, Imran */}
              {barbers.map((b) => {
                const isSelected = preferredBarber === b.name;
                const isOnBreak = b.status === 'break';
                return (
                  <button
                    key={b.id}
                    type="button"
                    disabled={!isQueueOpen}
                    onClick={() => setPreferredBarber(b.name)}
                    className={`p-2.5 rounded-2xl border-2 flex items-center space-x-2.5 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#EDECEA] border-[#432f2e] shadow-sm font-black'
                        : 'bg-[#EDECEA]/70 border-[#432f2e]/20 hover:border-[#432f2e]/50'
                    } disabled:opacity-50`}
                  >
                    <img
                      src={b.avatar}
                      alt={b.name}
                      className="w-8 h-8 rounded-xl object-cover border-2 border-[#432f2e]/30"
                    />
                    <div className="text-left">
                      <div className="text-xs font-black text-[#432f2e]">
                        {lang === 'gu' ? b.nameGu : b.name}
                      </div>
                      <div className={`text-[10px] font-bold ${isOnBreak ? 'text-amber-800' : 'text-[#432f2e]/70'}`}>
                        {isOnBreak ? 'On break' : b.status}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. Live Summary (Updates Dynamically) */}
          <div className="bg-[#EDECEA] border-2 border-[#432f2e]/30 rounded-2xl p-4 space-y-3 shadow-inner text-[#432f2e]">
            <div className="flex items-center justify-between text-xs font-black text-[#432f2e] border-b border-[#432f2e]/20 pb-2">
              <span className="flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 stroke-[#432f2e]" />
                <span>{lang === 'gu' ? 'લાઈવ સારાંશ' : 'Live Summary'}</span>
              </span>
              <span className="text-[11px] font-mono font-black text-[#432f2e]/80">
                {preferredBarber === 'Any' ? 'Fastest' : preferredBarber}
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-xs text-[#432f2e]/80 font-bold">
                {selectedServices.map((s) => (lang === 'gu' ? s.nameGu : s.name)).join(' + ')}
              </div>
              <div className="flex items-center justify-between text-sm font-black text-[#432f2e] pt-1">
                <span>Total {totalDuration} min · ₹{totalPrice}</span>
                <span className="text-xs font-black bg-[#7E9A82]/30 px-2 py-0.5 rounded-lg border border-[#432f2e]/20">
                  Expected wait ~{expectedWait} min
                </span>
              </div>
            </div>
          </div>

          {/* 6. Confirm Button */}
          <button
            type="submit"
            disabled={!isQueueOpen}
            className="w-full py-4 bg-[#EDECEA] hover:bg-[#EDECEA]/90 text-[#432f2e] border-2 border-[#432f2e] font-black rounded-2xl text-sm shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="text-[#432f2e]">
              {isQueueOpen
                ? (lang === 'gu' ? 'કન્ફર્મ કરો અને ટોકન મેળવો' : 'Confirm & Get Token')
                : 'Online Queue Closed'}
            </span>
            {isQueueOpen && <ArrowRight className="w-4 h-4 stroke-[#432f2e] stroke-[2.5]" />}
          </button>
        </form>

      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useQueue, SERVICES } from '../context/QueueContext';
import { 
  LayoutDashboard, 
  UserPlus, 
  PhoneCall, 
  UserX, 
  XCircle, 
  Search, 
  Clock, 
  Scissors, 
  AlertTriangle, 
  CheckCircle, 
  RotateCw,
  Plus,
  X,
  UserCheck
} from 'lucide-react';

export default function ReceptionistDashboard() {
  const { lang, t } = useLanguage();
  const { 
    customers, 
    waitingCustomers, 
    barbers, 
    callNext, 
    markNoShow, 
    reAddCustomer,
    cancelCustomer, 
    markBarberDone, 
    toggleBarberStatus,
    joinQueue,
    getCustomerWaitTime,
    resetQueueData
  } = useQueue();

  const [search, setSearch] = useState('');
  const [showWalkInModal, setShowWalkInModal] = useState(false);
  const [walkInName, setWalkInName] = useState('');
  const [walkInPhone, setWalkInPhone] = useState('');
  const [walkInServices, setWalkInServices] = useState([SERVICES[0]]);
  const [walkInBarber, setWalkInBarber] = useState('Any');
  const [filterTab, setFilterTab] = useState('active'); // 'active' | 'all'
  const [notice, setNotice] = useState(null);

  const showTempNotice = (msg) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3500);
  };

  // Filter queue
  const displayedCustomers = customers.filter((c) => {
    const matchesSearch = 
      c.name.toLowerCase().includes(search.toLowerCase()) || 
      c.token.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search);
    
    if (filterTab === 'active') {
      return matchesSearch && (c.status === 'waiting' || c.status === 'called' || c.status === 'in_chair');
    }
    return matchesSearch;
  });

  const handleAddWalkIn = (e) => {
    e.preventDefault();
    if (!walkInName.trim()) return;
    const phone = walkInPhone.trim() || `Walk-in-${Date.now().toString().slice(-4)}`;
    const res = joinQueue({
      name: walkInName.trim(),
      phone,
      selectedServices: walkInServices,
      preferredBarber: walkInBarber,
    });
    
    setWalkInName('');
    setWalkInPhone('');
    setWalkInServices([SERVICES[0]]);
    setWalkInBarber('Any');
    setShowWalkInModal(false);
    showTempNotice(`Walk-in added at end of queue: Token #${res.token}`);
  };

  const toggleModalService = (srv) => {
    const exists = walkInServices.some((s) => s.id === srv.id);
    if (exists) {
      if (walkInServices.length > 1) {
        setWalkInServices(walkInServices.filter((s) => s.id !== srv.id));
      }
    } else {
      if (walkInServices.length < 3) {
        setWalkInServices([...walkInServices, srv]);
      }
    }
  };

  const handleCallNext = (barberId, barberName) => {
    const called = callNext(barberId);
    if (called) {
      showTempNotice(`Called Token #${called.token} (${called.name}) for ${barberName}`);
    } else {
      showTempNotice(`No eligible waiting customer found for ${barberName} or 'Any'.`);
    }
  };

  const handleReAdd = (token, name) => {
    const newToken = reAddCustomer(token);
    if (newToken) {
      showTempNotice(`Re-added ${name} to END of queue with new Token #${newToken}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      
      {/* Tablet Landscape Top Bar (Inside box: Sage Green #7E9A82) */}
      <div className="bg-[#7E9A82] border-2 border-[#432f2e]/30 rounded-3xl p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4 text-[#432f2e]">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-[#EDECEA] text-[#432f2e] rounded-2xl border border-[#432f2e]/25 shadow-sm">
            <LayoutDashboard className="w-6 h-6 stroke-[#432f2e]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-2xl font-black text-[#432f2e] tracking-tight">
                {lang === 'gu' ? 'રિસેપ્શનિસ્ટ ડેશબોર્ડ' : 'Reception Dashboard'}
              </h2>
            </div>
            <p className="text-xs text-[#432f2e]/85 font-medium">
              {lang === 'gu' 
                ? 'વોક-ઇન ગ્રાહકો ઉમેરો, બાર્બર સ્ટેશન મોનિટર કરો અને કતાર નિયંત્રિત કરો' 
                : 'Manage walk-ins, station flows and live queue actions in real time.'}
            </p>
          </div>
        </div>

        {/* Top Actions & Walk-In Button */}
        <div className="flex items-center space-x-3">
          <button
            onClick={resetQueueData}
            title="Reset test data"
            className="p-3 rounded-2xl bg-[#EDECEA] hover:bg-[#e0deda] border-2 border-[#432f2e]/30 text-[#432f2e] text-xs font-bold transition-all cursor-pointer flex items-center space-x-1"
          >
            <RotateCw className="w-4 h-4 stroke-[#432f2e]" />
            <span className="hidden sm:inline">Reset Data</span>
          </button>

          <button
            onClick={() => setShowWalkInModal(true)}
            className="px-5 py-3 bg-[#EDECEA] hover:bg-[#dedcd8] border-2 border-[#432f2e] text-[#432f2e] rounded-2xl text-xs font-black shadow-md transition-all flex items-center space-x-2 cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[#432f2e] stroke-[3]" />
            <span>{lang === 'gu' ? '+ વોક-ઇન ઉમેરો' : '+ Add Walk-in'}</span>
          </button>
        </div>
      </div>

      {/* Floating Notice Banner */}
      {notice && (
        <div className="p-3 bg-[#7E9A82] border-2 border-[#432f2e] rounded-2xl text-xs font-black text-[#432f2e] flex items-center space-x-2 shadow-md animate-fade-in">
          <CheckCircle className="w-4 h-4 stroke-[#432f2e] shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* Main 2-Column Grid (Left: Barbers / Right: Waiting List) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Barber Stations & Direct Call Next (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black uppercase tracking-wider text-[#432f2e] flex items-center space-x-2">
              <Scissors className="w-4 h-4 stroke-[#432f2e]" />
              <span>{lang === 'gu' ? 'બાર્બર સ્ટેશન્સ' : 'Barber Stations'}</span>
            </h3>
            <span className="text-xs font-bold text-[#432f2e]/80">
              3 Stations Active
            </span>
          </div>

          <div className="space-y-4">
            {barbers.map((barber) => {
              const isBusy = barber.status === 'busy' && barber.currentCustomer;
              const isBreak = barber.status === 'break';
              const isFree = barber.status === 'free';

              return (
                <div
                  key={barber.id}
                  className="bg-[#7E9A82] border-2 border-[#432f2e]/30 rounded-3xl p-5 shadow-sm space-y-4 transition-all text-[#432f2e]"
                >
                  {/* Barber Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={barber.avatar}
                        alt={barber.name}
                        className="w-11 h-11 rounded-2xl object-cover border-2 border-[#432f2e]"
                      />
                      <div>
                        <div className="text-sm font-black text-[#432f2e]">
                          {lang === 'gu' ? barber.nameGu : barber.name}
                        </div>
                        <div className="text-[11px] font-bold text-[#432f2e]/80">
                          {barber.chair}
                        </div>
                      </div>
                    </div>

                    {/* Status Pill & Toggle */}
                    <button
                      onClick={() => toggleBarberStatus(barber.id)}
                      title="Click to toggle break / available"
                      className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border-2 border-[#432f2e] bg-[#EDECEA] text-[#432f2e] cursor-pointer shadow-xs"
                    >
                      {barber.status}
                    </button>
                  </div>

                  {/* Customer in Chair or Free Slot */}
                  {isBusy ? (
                    <div className="bg-[#EDECEA] border-2 border-[#432f2e]/30 rounded-2xl p-4 space-y-2.5 text-[#432f2e]">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-extrabold text-[#432f2e] flex items-center space-x-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#7E9A82] border border-[#432f2e] animate-pulse"></span>
                          <span>In Chair</span>
                        </span>
                        <span className="font-mono font-black text-xs px-2 py-0.5 rounded-md bg-[#7E9A82] text-[#432f2e] border border-[#432f2e]/30">
                          {barber.currentCustomer.token}
                        </span>
                      </div>
                      <div className="text-base font-black text-[#432f2e]">
                        {barber.currentCustomer.name}
                      </div>
                      <div className="text-xs text-[#432f2e]/85 font-medium">
                        {barber.currentCustomer.services.join(', ')}
                      </div>
                      
                      {/* Mark Done Button */}
                      <button
                        onClick={() => {
                          markBarberDone(barber.id);
                          showTempNotice(`${barber.name} finished with client. Chair is free!`);
                        }}
                        className="w-full mt-2 py-2 bg-[#7E9A82] hover:bg-[#6c8670] border-2 border-[#432f2e] text-[#432f2e] font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5 cursor-pointer transition-all"
                      >
                        <CheckCircle className="w-3.5 h-3.5 stroke-[#432f2e]" />
                        <span>Finish & Free Chair</span>
                      </button>
                    </div>
                  ) : (
                    <div className="bg-[#EDECEA]/70 border border-dashed border-[#432f2e]/30 rounded-2xl p-3 text-center text-xs text-[#432f2e]/80 font-semibold">
                      {isBreak ? 'Barber is on a short break' : 'Chair is currently vacant'}
                    </div>
                  )}

                  {/* Call Next Button for this barber */}
                  <button
                    onClick={() => handleCallNext(barber.id, barber.name)}
                    disabled={isBreak || isBusy || waitingCustomers.length === 0}
                    className="w-full py-3 bg-[#EDECEA] hover:bg-[#dedcd8] border-2 border-[#432f2e] text-[#432f2e] font-black rounded-2xl text-xs flex items-center justify-center space-x-2 shadow-sm disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer active:scale-98 transition-all"
                  >
                    <PhoneCall className="w-4 h-4 stroke-[#432f2e]" />
                    <span>{lang === 'gu' ? 'પછીના ગ્રાહકને બોલાવો' : `Call Next for ${barber.name}`}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Waiting List with Actions (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* List Controls: Search & Tabs (Inside box: Sage Green #7E9A82) */}
          <div className="bg-[#7E9A82] border-2 border-[#432f2e]/30 rounded-3xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-[#432f2e]">
            {/* Search Box */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-3 text-[#432f2e]/60" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={lang === 'gu' ? 'ટોકન અથવા નામ શોધો...' : 'Search token or name...'}
                className="w-full pl-9 pr-4 py-2 bg-[#EDECEA] border-2 border-[#432f2e]/30 rounded-xl text-xs font-semibold text-[#432f2e] placeholder-[#432f2e]/50 focus:outline-none focus:border-[#432f2e]"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center space-x-1.5 self-start sm:self-auto">
              <button
                onClick={() => setFilterTab('active')}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer border-2 ${
                  filterTab === 'active'
                    ? 'bg-[#EDECEA] text-[#432f2e] border-[#432f2e]'
                    : 'bg-[#7E9A82] text-[#432f2e] border-[#432f2e]/30 hover:bg-[#6c8670]'
                }`}
              >
                <span>Active Queue ({waitingCustomers.length})</span>
              </button>
              <button
                onClick={() => setFilterTab('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer border-2 ${
                  filterTab === 'all'
                    ? 'bg-[#EDECEA] text-[#432f2e] border-[#432f2e]'
                    : 'bg-[#7E9A82] text-[#432f2e] border-[#432f2e]/30 hover:bg-[#6c8670]'
                }`}
              >
                <span>All Records ({customers.length})</span>
              </button>
            </div>
          </div>

          {/* Queue Table (Inside box: Sage Green #7E9A82 with Warm Off-White #EDECEA table contents) */}
          <div className="bg-[#7E9A82] border-2 border-[#432f2e]/30 rounded-3xl overflow-hidden shadow-sm p-1.5">
            <div className="overflow-x-auto rounded-2xl bg-[#EDECEA]">
              <table className="w-full text-left text-xs text-[#432f2e]">
                <thead className="bg-[#7E9A82]/30 text-[#432f2e] uppercase font-black text-[11px] border-b-2 border-[#432f2e]/20">
                  <tr>
                    <th className="py-3.5 px-4">Token</th>
                    <th className="py-3.5 px-4">Customer</th>
                    <th className="py-3.5 px-4">Services</th>
                    <th className="py-3.5 px-4">Barber</th>
                    <th className="py-3.5 px-4">Waiting Time</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#432f2e]/15">
                  {displayedCustomers.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-[#432f2e]/70 font-medium">
                        No clients found matching filter.
                      </td>
                    </tr>
                  ) : (
                    displayedCustomers.map((cust) => {
                      const dynamicWait = getCustomerWaitTime(cust.token);
                      const isOver60 = dynamicWait > 60 && cust.status === 'waiting';
                      const isWaiting = cust.status === 'waiting';
                      const isCalled = cust.status === 'called';
                      const isNoShow = cust.status === 'no_show';

                      return (
                        <tr
                          key={cust.token}
                          className={`hover:bg-[#7E9A82]/20 transition-colors ${
                            isOver60 ? 'bg-amber-100/90' : ''
                          }`}
                        >
                          {/* Token */}
                          <td className="py-3.5 px-4 font-mono font-black text-sm">
                            <span className="px-2 py-1 rounded-lg bg-[#7E9A82] text-[#432f2e] border border-[#432f2e]/25 inline-block">
                              {cust.token}
                            </span>
                          </td>

                          {/* Customer Name & Phone */}
                          <td className="py-3.5 px-4">
                            <div className="font-extrabold text-sm text-[#432f2e]">{cust.name}</div>
                            <div className="text-[11px] text-[#432f2e]/70 font-mono font-medium">{cust.phone}</div>
                          </td>

                          {/* Services */}
                          <td className="py-3.5 px-4 font-medium text-[#432f2e]/90">
                            {cust.services.join(', ')}
                          </td>

                          {/* Preferred Barber */}
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-[#7E9A82]/40 text-[#432f2e] border border-[#432f2e]/20">
                              {cust.barber}
                            </span>
                          </td>

                          {/* Waiting Time (Amber if > 60 min) */}
                          <td className="py-3.5 px-4">
                            {isWaiting ? (
                              isOver60 ? (
                                <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-amber-200 border-2 border-amber-600 text-[#432f2e] font-black text-xs shadow-xs">
                                  <AlertTriangle className="w-3.5 h-3.5 stroke-[#432f2e]" />
                                  <span>{dynamicWait} min (&gt;60m)</span>
                                </div>
                              ) : (
                                <div className="flex items-center space-x-1 text-[#432f2e]/85 font-semibold">
                                  <Clock className="w-3.5 h-3.5 stroke-[#432f2e]" />
                                  <span>{dynamicWait} min</span>
                                </div>
                              )
                            ) : (
                              <span className="text-[#432f2e]/60 font-medium capitalize">{cust.status}</span>
                            )}
                          </td>

                          {/* Status */}
                          <td className="py-3.5 px-4">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border border-[#432f2e]/30 ${
                                isWaiting
                                  ? 'bg-[#7E9A82]/30 text-[#432f2e]'
                                  : isCalled
                                  ? 'bg-[#7E9A82] text-[#432f2e] font-black'
                                  : cust.status === 'in_chair'
                                  ? 'bg-[#EDECEA] text-[#432f2e] font-black border-2 border-[#432f2e]'
                                  : isNoShow
                                  ? 'bg-rose-100 text-rose-950'
                                  : 'bg-zinc-200 text-[#432f2e]'
                              }`}
                            >
                              {cust.status === 'in_chair' ? 'In Chair' : cust.status === 'no_show' ? 'No-Show' : cust.status}
                            </span>
                          </td>

                          {/* Actions: No-show, Cancel & Re-add */}
                          <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                            {isWaiting && (
                              <button
                                onClick={() => {
                                  cancelCustomer(cust.token);
                                  showTempNotice(`Cancelled token #${cust.token}`);
                                }}
                                title="Cancel customer spot"
                                className="px-2.5 py-1 bg-[#EDECEA] hover:bg-[#dedcd8] text-[#432f2e] border border-[#432f2e]/40 font-bold rounded-lg text-xs transition-all cursor-pointer inline-flex items-center space-x-1"
                              >
                                <XCircle className="w-3 h-3 stroke-[#432f2e]" />
                                <span>Cancel</span>
                              </button>
                            )}

                            {isCalled && (
                              <button
                                onClick={() => {
                                  markNoShow(cust.token);
                                  showTempNotice(`Marked #${cust.token} (${cust.name}) as No-show`);
                                }}
                                title="Mark as No-Show if not arrived"
                                className="px-2.5 py-1 bg-amber-100 hover:bg-amber-200 text-[#432f2e] border border-amber-400 font-bold rounded-lg text-xs transition-all cursor-pointer inline-flex items-center space-x-1"
                              >
                                <UserX className="w-3 h-3 stroke-[#432f2e]" />
                                <span>No-show</span>
                              </button>
                            )}

                            {isNoShow && (
                              <button
                                onClick={() => handleReAdd(cust.token, cust.name)}
                                title="Customer arrived late - re-add to end of queue"
                                className="px-2.5 py-1 bg-[#7E9A82] hover:bg-[#6c8670] text-[#432f2e] border-2 border-[#432f2e] font-black rounded-lg text-xs transition-all cursor-pointer inline-flex items-center space-x-1 shadow-xs"
                              >
                                <Plus className="w-3 h-3 stroke-[#432f2e] stroke-[3]" />
                                <span>Re-add to End</span>
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>

      {/* Quick Add Walk-in Modal */}
      {showWalkInModal && (
        <div className="fixed inset-0 z-50 bg-[#432f2e]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#7E9A82] border-3 border-[#432f2e] rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5 animate-in fade-in duration-200 text-[#432f2e]">
            <div className="flex items-center justify-between border-b-2 border-[#432f2e]/20 pb-3">
              <div className="flex items-center space-x-2">
                <UserPlus className="w-5 h-5 stroke-[#432f2e]" />
                <h3 className="text-lg font-black text-[#432f2e]">
                  {lang === 'gu' ? 'નવા વોક-ઇન ગ્રાહક ઉમેરો' : 'Add Walk-in Client'}
                </h3>
              </div>
              <button
                onClick={() => setShowWalkInModal(false)}
                className="p-1 rounded-lg hover:bg-[#EDECEA] text-[#432f2e] cursor-pointer"
              >
                <X className="w-5 h-5 stroke-[#432f2e]" />
              </button>
            </div>

            <form onSubmit={handleAddWalkIn} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-[#432f2e]">
                  Client Name *
                </label>
                <input
                  type="text"
                  required
                  value={walkInName}
                  onChange={(e) => setWalkInName(e.target.value)}
                  placeholder="e.g. Ramesh Patel"
                  className="w-full px-3 py-2.5 bg-[#EDECEA] border-2 border-[#432f2e]/30 rounded-xl text-xs font-bold text-[#432f2e] focus:outline-none focus:border-[#432f2e]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-[#432f2e]">
                  Phone (Optional)
                </label>
                <input
                  type="tel"
                  value={walkInPhone}
                  onChange={(e) => setWalkInPhone(e.target.value)}
                  placeholder="e.g. 98250 00000"
                  className="w-full px-3 py-2.5 bg-[#EDECEA] border-2 border-[#432f2e]/30 rounded-xl text-xs font-bold text-[#432f2e] focus:outline-none focus:border-[#432f2e]"
                />
              </div>

              {/* Service Selection */}
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-[#432f2e]">
                  Services (Max 3)
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {SERVICES.map((s) => {
                    const isSel = walkInServices.some((item) => item.id === s.id);
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => toggleModalService(s)}
                        className={`p-2 rounded-xl border-2 text-left text-xs font-bold flex items-center justify-between cursor-pointer ${
                          isSel
                            ? 'bg-[#EDECEA] border-[#432f2e]'
                            : 'bg-[#EDECEA]/60 border-[#432f2e]/30'
                        }`}
                      >
                        <span className="text-[#432f2e]">{s.name}</span>
                        <span className="text-[10px] text-[#432f2e]/80">₹{s.price}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Barber Preference */}
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-[#432f2e]">
                  Preferred Barber
                </label>
                <select
                  value={walkInBarber}
                  onChange={(e) => setWalkInBarber(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#EDECEA] border-2 border-[#432f2e]/30 rounded-xl text-xs font-bold text-[#432f2e] focus:outline-none focus:border-[#432f2e]"
                >
                  <option value="Any">Any Barber (Fastest)</option>
                  <option value="Ravi">Ravi (Chair 1)</option>
                  <option value="Amit">Amit (Chair 2)</option>
                  <option value="Imran">Imran (Chair 3)</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowWalkInModal(false)}
                  className="px-4 py-2.5 rounded-xl border-2 border-[#432f2e]/40 text-xs font-bold hover:bg-[#EDECEA]/70 cursor-pointer text-[#432f2e]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#EDECEA] hover:bg-[#dedcd8] border-2 border-[#432f2e] rounded-xl text-xs font-black shadow-md cursor-pointer text-[#432f2e]"
                >
                  Add to Queue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

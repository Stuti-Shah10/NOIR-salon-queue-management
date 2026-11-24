import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useQueue, SERVICES as BASE_SERVICES, getClientsServedToday } from '../context/QueueContext';
import { 
  Settings, 
  Power, 
  Users, 
  Scissors, 
  Plus, 
  Save, 
  TrendingUp, 
  Clock, 
  UserX,
  Check
} from 'lucide-react';

export default function OwnerSettings() {
  const { lang, t } = useLanguage();
  const { 
    isQueueOpen, 
    toggleQueue, 
    barbers, 
    toggleBarberStatus, 
    customers,
    clientsServedToday
  } = useQueue();

  const [servicesList, setServicesList] = useState(
    BASE_SERVICES.map((s) => ({ ...s, active: true }))
  );
  const [savedNotice, setSavedNotice] = useState(false);

  const toggleServiceActive = (id) => {
    setServicesList((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s))
    );
  };

  const handleSave = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  // Stats: Calculate clients served today dynamically from stored records
  const servedCount = clientsServedToday !== undefined ? clientsServedToday : getClientsServedToday(customers);
  const avgWaitMin = 24;
  const noShowCount = customers.filter((c) => c.status === 'no_show' || c.status === 'no-show').length;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Main Container Box (Sage Green #7E9A82 inside box) */}
      <div className="bg-[#7E9A82] border-2 border-[#432f2e]/30 rounded-3xl p-6 shadow-xl space-y-6 text-[#432f2e]">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b-2 border-[#432f2e]/20 gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 text-[#432f2e]">
              <Settings className="w-5 h-5 stroke-[#432f2e]" />
              <span className="text-xs uppercase font-black tracking-wider">
                {lang === 'gu' ? 'માલિક સેટિંગ્સ' : 'Owner Administration'}
              </span>
            </div>
            <h2 className="text-2xl font-black text-[#432f2e] tracking-tight">
              {lang === 'gu' ? 'સલૂન કામગીરી અને સેટિંગ્સ' : 'Salon Operations & Controls'}
            </h2>
            <p className="text-xs text-[#432f2e]/85 font-medium">
              Manage live queue availability, staff schedules, pricing and view today's analytics.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            {savedNotice && (
              <span className="text-xs font-bold text-[#432f2e] bg-[#EDECEA] px-3 py-1 rounded-xl border-2 border-[#432f2e]">
                Settings Saved!
              </span>
            )}
            <button
              onClick={handleSave}
              className="px-5 py-2.5 bg-[#EDECEA] hover:bg-[#dedcd8] text-[#432f2e] border-2 border-[#432f2e] font-black rounded-xl text-xs flex items-center space-x-2 shadow-md transition-all cursor-pointer"
            >
              <Save className="w-4 h-4 stroke-[#432f2e]" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>

        {/* Today's Key Metrics / Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl bg-[#EDECEA] border-2 border-[#432f2e]/30 space-y-1 text-[#432f2e]">
            <div className="flex items-center space-x-2 text-xs font-bold">
              <TrendingUp className="w-4 h-4 stroke-[#432f2e]" />
              <span>Served Today</span>
            </div>
            <div className="text-2xl font-black text-[#432f2e]">{servedCount} clients</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#EDECEA] border-2 border-[#432f2e]/30 space-y-1 text-[#432f2e]">
            <div className="flex items-center space-x-2 text-xs font-bold">
              <Clock className="w-4 h-4 stroke-[#432f2e]" />
              <span>Average Wait</span>
            </div>
            <div className="text-2xl font-black text-[#432f2e]">{avgWaitMin} min</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#EDECEA] border-2 border-[#432f2e]/30 space-y-1 text-[#432f2e]">
            <div className="flex items-center space-x-2 text-xs font-bold">
              <UserX className="w-4 h-4 stroke-[#432f2e]" />
              <span>No-shows</span>
            </div>
            <div className="text-2xl font-black text-[#432f2e]">{noShowCount} clients</div>
          </div>
        </div>

        {/* Setting 1: Open / Close Queue Control */}
        <div className="bg-[#EDECEA] border-2 border-[#432f2e]/30 rounded-2xl p-5 space-y-3 shadow-sm text-[#432f2e]">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-xs font-black uppercase tracking-wider text-[#432f2e]/75">
                Online Queue Access
              </span>
              <div className="flex items-center space-x-2">
                <span className={`w-3 h-3 rounded-full ${isQueueOpen ? 'bg-emerald-600 animate-pulse' : 'bg-rose-600'}`}></span>
                <span className="text-base font-black text-[#432f2e]">
                  {isQueueOpen ? 'Queue is OPEN for Online Joining' : 'Queue is CLOSED (In-person Only)'}
                </span>
              </div>
            </div>

            <button
              onClick={toggleQueue}
              className={`px-4 py-2 rounded-xl text-xs font-black flex items-center space-x-2 border-2 border-[#432f2e] cursor-pointer shadow-sm transition-all ${
                isQueueOpen
                  ? 'bg-[#7E9A82] text-[#432f2e] hover:bg-[#6c8670]'
                  : 'bg-[#EDECEA] text-[#432f2e] hover:bg-[#dedcd8]'
              }`}
            >
              <Power className="w-4 h-4 stroke-[#432f2e]" />
              <span>{isQueueOpen ? 'Close Queue' : 'Open Queue'}</span>
            </button>
          </div>
        </div>

        {/* Setting 2: Barbers on Duty */}
        <div className="space-y-3">
          <h3 className="text-sm font-black uppercase tracking-wider text-[#432f2e] flex items-center space-x-2">
            <Users className="w-4 h-4 stroke-[#432f2e]" />
            <span>Barbers on Duty Today</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {barbers.map((b) => (
              <div
                key={b.id}
                className="p-4 rounded-2xl bg-[#EDECEA] border-2 border-[#432f2e]/30 flex items-center justify-between shadow-xs text-[#432f2e]"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={b.avatar}
                    alt={b.name}
                    className="w-10 h-10 rounded-xl object-cover border-2 border-[#432f2e]"
                  />
                  <div>
                    <div className="text-sm font-black text-[#432f2e]">{b.name}</div>
                    <div className="text-[11px] text-[#432f2e]/75 font-bold">{b.chair}</div>
                  </div>
                </div>

                <button
                  onClick={() => toggleBarberStatus(b.id)}
                  className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase border-2 border-[#432f2e] bg-[#7E9A82] text-[#432f2e] cursor-pointer"
                >
                  {b.status}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Setting 3: Services Catalog (Name EN/GU, Time, Price, On/Off) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black uppercase tracking-wider text-[#432f2e] flex items-center space-x-2">
              <Scissors className="w-4 h-4 stroke-[#432f2e]" />
              <span>Services Catalog & Pricing</span>
            </h3>
          </div>

          <div className="overflow-x-auto rounded-2xl border-2 border-[#432f2e]/30 bg-[#EDECEA]">
            <table className="w-full text-left text-xs text-[#432f2e]">
              <thead className="bg-[#7E9A82]/30 text-[#432f2e] uppercase font-black text-[11px] border-b-2 border-[#432f2e]/20">
                <tr>
                  <th className="py-3 px-4">Service Name (EN / GU)</th>
                  <th className="py-3 px-4">Duration</th>
                  <th className="py-3 px-4">Price (₹)</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#432f2e]/15">
                {servicesList.map((srv) => (
                  <tr key={srv.id} className="hover:bg-[#7E9A82]/20 transition-colors">
                    <td className="py-3 px-4 font-extrabold text-[#432f2e]">
                      {srv.name} <span className="text-[#432f2e]/65 font-normal">({srv.nameGu})</span>
                    </td>
                    <td className="py-3 px-4 font-medium text-[#432f2e]/85">
                      {srv.time} mins
                    </td>
                    <td className="py-3 px-4 font-black text-[#432f2e]">
                      ₹{srv.price}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => toggleServiceActive(srv.id)}
                        className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase border-2 border-[#432f2e] cursor-pointer transition-all ${
                          srv.active
                            ? 'bg-[#7E9A82] text-[#432f2e]'
                            : 'bg-[#EDECEA] text-[#432f2e]/60'
                        }`}
                      >
                        {srv.active ? 'Active' : 'Disabled'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

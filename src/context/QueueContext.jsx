import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const QueueContext = createContext();

export const SERVICES = [
  { id: 'haircut', name: 'Haircut', time: 30, price: 150, nameGu: 'હેરકટ' },
  { id: 'beard', name: 'Beard trim', time: 15, price: 80, nameGu: 'દાઢી ટ્રીમ' },
  { id: 'spa', name: 'Hair spa', time: 45, price: 400, nameGu: 'હેર સ્પા' },
  { id: 'massage', name: 'Head Massage', time: 20, price: 180, nameGu: 'હેડ મસાજ' },
  { id: 'shave', name: 'Shave & Detan', time: 25, price: 220, nameGu: 'શેવ અને ડીટેન' },
];

export const INITIAL_BARBERS = [
  {
    id: 'ravi',
    name: 'Ravi',
    nameGu: 'રવિ',
    status: 'busy', // 'busy' | 'free' | 'break'
    chair: 'Chair 1',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80',
    currentCustomer: {
      token: 'S-11',
      name: 'Aarav Patel',
      services: ['Haircut'],
      startTime: Date.now() - 15 * 60 * 1000,
    },
  },
  {
    id: 'amit',
    name: 'Amit',
    nameGu: 'અમિત',
    status: 'free',
    chair: 'Chair 2',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
    currentCustomer: null,
  },
  {
    id: 'imran',
    name: 'Imran',
    nameGu: 'ઇમરાન',
    status: 'break',
    chair: 'Chair 3',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
    currentCustomer: null,
  },
];

// Check if a given completion timestamp occurred on the current date
export function isCompletedToday(completedTime) {
  if (!completedTime) return false;
  const completedDate = new Date(completedTime);
  if (isNaN(completedDate.getTime())) return false;
  const today = new Date();
  return (
    completedDate.getDate() === today.getDate() &&
    completedDate.getMonth() === today.getMonth() &&
    completedDate.getFullYear() === today.getFullYear()
  );
}

// Check if a client record counts as served today:
// 1. Status is 'done' or 'completed' (case-insensitive)
// 2. Completed on today's date
export function isClientServedToday(client) {
  if (!client) return false;
  const status = (client.status || '').toLowerCase();
  if (status !== 'done' && status !== 'completed') {
    return false;
  }
  return isCompletedToday(client.completedTime);
}

// Calculate the total unique clients served today from an array of customers
// Uses a Set of tokens to guarantee no duplicate counting
export function getClientsServedToday(customers) {
  if (!Array.isArray(customers)) return 0;
  const countedTokens = new Set();
  for (const c of customers) {
    if (isClientServedToday(c)) {
      if (c.token) {
        countedTokens.add(c.token);
      }
    }
  }
  return countedTokens.size;
}

// Known mock/seed token IDs that were injected in v5 and v6.
// Used during migration to strip them from saved localStorage data.
const MOCK_SEED_TOKENS = new Set([
  'S-01','S-02','S-03','S-04','S-05','S-06','S-07','S-08','S-09','S-10',
  'W-01','W-02','W-03','W-04','W-05','W-06','W-07','W-08',
  'Y-01', // yesterday mock record
]);

// Clean initial customer list — no fake completed records.
// A fresh install starts with 0 clients served today.
export const INITIAL_CUSTOMERS = [

  // 1 customer currently in chair with Ravi
  {
    token: 'S-11',
    name: 'Aarav Patel',
    phone: '9825099999',
    services: ['Haircut'],
    serviceMinutes: 30,
    barber: 'Ravi',
    chair: 'Chair 1',
    status: 'in_chair',
    joinTime: '11:00 AM',
    startTime: Date.now() - 15 * 60 * 1000,
  },

  // 8 waiting customers
  {
    token: 'S-12',
    name: 'Kiran Shah',
    phone: '9825012345',
    services: ['Haircut', 'Beard trim'],
    serviceMinutes: 45,
    barber: 'Ravi',
    status: 'waiting', // 'waiting' | 'called' | 'in_chair' | 'done' | 'no_show' | 'cancelled'
    joinTime: '11:15 AM',
  },
  {
    token: 'S-13',
    name: 'Vikram Mehta',
    phone: '9879123456',
    services: ['Hair spa'],
    serviceMinutes: 45,
    barber: 'Amit',
    status: 'waiting',
    joinTime: '11:20 AM',
  },
  {
    token: 'S-14',
    name: 'Deepak Joshi',
    phone: '9898034567',
    services: ['Haircut'],
    serviceMinutes: 30,
    barber: 'Any',
    status: 'waiting',
    joinTime: '11:28 AM',
  },
  {
    token: 'S-15',
    name: 'Kunal Sharma',
    phone: '9824045678',
    services: ['Haircut', 'Head Massage'],
    serviceMinutes: 50,
    barber: 'Ravi',
    status: 'waiting',
    joinTime: '11:35 AM',
  },
  {
    token: 'S-16',
    name: 'Harsh Trivedi',
    phone: '9909056789',
    services: ['Beard trim'],
    serviceMinutes: 15,
    barber: 'Imran',
    status: 'waiting',
    joinTime: '11:40 AM',
  },
  {
    token: 'S-17',
    name: 'Manish Patel',
    phone: '9712067890',
    services: ['Shave & Detan'],
    serviceMinutes: 25,
    barber: 'Any',
    status: 'waiting',
    joinTime: '11:05 AM',
  },
  {
    token: 'S-18',
    name: 'Bhavin Vyas',
    phone: '9825178901',
    services: ['Haircut', 'Hair spa'],
    serviceMinutes: 75,
    barber: 'Amit',
    status: 'waiting',
    joinTime: '10:55 AM',
  },
  {
    token: 'S-19',
    name: 'Nilesh Gohil',
    phone: '9924289012',
    services: ['Haircut'],
    serviceMinutes: 30,
    barber: 'Any',
    status: 'waiting',
    joinTime: '10:45 AM',
  },
];

const STORAGE_KEY = 'noir_salon_state_v7';
const USER_TOKEN_KEY = 'noir_user_token_v7';
const CHANNEL_NAME = 'noir_salon_sync_channel_v7';

// Helper to play luxury harmonic chime
export function playChimeSound() {
  if (typeof window === 'undefined') return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const notes = [587.33, 880, 1174.66]; // D5, A5, D6 harmonic chime
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      const startTime = ctx.currentTime + i * 0.16;
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.25, startTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 1.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 1.3);
    });
  } catch (e) {
    console.log('Audio playback prevented or unsupported', e);
  }
}

// Helper to trigger mobile device vibration
export function triggerVibration() {
  if (typeof window !== 'undefined' && 'vibrate' in navigator) {
    try {
      navigator.vibrate([300, 150, 300, 150, 500]);
    } catch (e) {
      console.log('Vibration not supported/allowed', e);
    }
  }
}

export function QueueProvider({ children }) {
  // Load initial persistent state or defaults.
  // Migration path: v7 → v6 → v5 (oldest). When reading older versions,
  // strip the 18 known mock-seed tokens so they never pollute the counter.
  const getInitialState = () => {
    if (typeof window === 'undefined') {
      return {
        customers: INITIAL_CUSTOMERS,
        barbers: INITIAL_BARBERS,
        isQueueOpen: true,
        newlyCalledToken: null,
        nextTokenNumber: 20,
      };
    }
    try {
      const saved =
        localStorage.getItem(STORAGE_KEY) ||
        localStorage.getItem('noir_salon_state_v6') ||
        localStorage.getItem('noir_salon_state_v5');

      if (saved) {
        const parsed = JSON.parse(saved);

        if (parsed.customers && Array.isArray(parsed.customers)) {
          // Strip any known mock seed records (tokens from v5/v6 INITIAL_SERVED_TODAY + Y-01).
          // Genuine completed records (real customers marked Done by staff) are preserved.
          parsed.customers = parsed.customers.filter(
            (c) => !MOCK_SEED_TOKENS.has(c.token)
          );
        } else {
          parsed.customers = INITIAL_CUSTOMERS;
        }

        // Fix stale Ravi avatar URL if it was saved in an older format
        if (parsed.barbers) {
          parsed.barbers = parsed.barbers.map((b) =>
            b.id === 'ravi' && b.avatar && b.avatar.includes('photo-1534528741775')
              ? { ...b, avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80' }
              : b
          );
        }
        return parsed;
      }
    } catch (e) {
      console.error('Failed to parse queue state from storage', e);
    }
    return {
      customers: INITIAL_CUSTOMERS,
      barbers: INITIAL_BARBERS,
      isQueueOpen: true,
      newlyCalledToken: null,
      nextTokenNumber: 20,
    };
  };

  const [state, setState] = useState(getInitialState);
  const [currentUserToken, setCurrentUserTokenState] = useState(() => {
    if (typeof window !== 'undefined') {
      return (
        localStorage.getItem(USER_TOKEN_KEY) ||
        localStorage.getItem('noir_user_token_v6') ||
        localStorage.getItem('noir_user_token_v5') ||
        'S-14'
      );
    }
    return 'S-14';
  });

  const channelRef = useRef(null);

  // Set user token helper
  const setCurrentUserToken = (token) => {
    setCurrentUserTokenState(token);
    if (typeof window !== 'undefined') {
      localStorage.setItem(USER_TOKEN_KEY, token);
    }
  };

  // Broadcast state changes & save to localStorage
  const updateAndBroadcastState = (updater) => {
    setState((prevState) => {
      const nextState = typeof updater === 'function' ? updater(prevState) : updater;
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
          if (channelRef.current) {
            channelRef.current.postMessage({ type: 'SYNC_STATE', payload: nextState });
          }
        } catch (err) {
          console.error('Failed to persist state', err);
        }
      }
      return nextState;
    });
  };

  // Setup BroadcastChannel & Storage Event listener
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // BroadcastChannel for instant cross-tab sync
    if ('BroadcastChannel' in window) {
      const channel = new BroadcastChannel(CHANNEL_NAME);
      channelRef.current = channel;

      channel.onmessage = (event) => {
        if (event.data?.type === 'SYNC_STATE' && event.data.payload) {
          setState(event.data.payload);
        }
      };
    }

    // Storage event listener fallback (syncs across different browser windows)
    const handleStorage = (e) => {
      if (
        (e.key === STORAGE_KEY ||
          e.key === 'noir_salon_state_v6' ||
          e.key === 'noir_salon_state_v5') &&
        e.newValue
      ) {
        try {
          const remoteState = JSON.parse(e.newValue);
          setState(remoteState);
        } catch (err) {
          console.error('Failed parsing storage event', err);
        }
      }
    };
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('storage', handleStorage);
      if (channelRef.current) {
        channelRef.current.close();
      }
    };
  }, []);

  // Check if newly called token is current user token -> trigger alert
  useEffect(() => {
    if (state.newlyCalledToken && state.newlyCalledToken === currentUserToken) {
      triggerVibration();
      playChimeSound();
    }
  }, [state.newlyCalledToken, currentUserToken]);

  // Derived collections
  const waitingCustomers = state.customers.filter((c) => c.status === 'waiting');
  const activeWorkingBarbers = state.barbers.filter((b) => b.status !== 'break');

  // Total unique clients served today calculated dynamically from stored records
  const clientsServedToday = getClientsServedToday(state.customers);

  // Dynamic estimated wait time calculation formula:
  // Waiting time ≈ total minutes of services ahead ÷ active barbers working
  const getCustomerWaitTime = (token) => {
    const custIndex = state.customers.findIndex((c) => c.token === token);
    if (custIndex === -1) return 15;

    const targetCust = state.customers[custIndex];
    if (targetCust.status !== 'waiting') return 0;

    // Sum services ahead
    const waitingAhead = state.customers.slice(0, custIndex).filter((c) => c.status === 'waiting');
    const totalMinutesAhead = waitingAhead.reduce((sum, c) => sum + (c.serviceMinutes || 30), 0);
    const barbersWorking = Math.max(1, activeWorkingBarbers.length);

    return Math.max(5, Math.round(totalMinutesAhead / barbersWorking));
  };

  // 1. Join Queue action
  const joinQueue = ({ name, phone, selectedServices, preferredBarber }) => {
    // Check if phone already has an active queue spot
    const existing = state.customers.find(
      (c) => c.phone === phone && (c.status === 'waiting' || c.status === 'called' || c.status === 'in_chair')
    );
    if (existing) {
      setCurrentUserToken(existing.token);
      return existing;
    }

    const nextToken = `S-${state.nextTokenNumber}`;
    const totalMinutes = selectedServices.reduce((sum, s) => sum + s.time, 0);

    const now = new Date();
    const joinTimeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newCustomer = {
      token: nextToken,
      name,
      phone,
      services: selectedServices.map((s) => s.name),
      serviceMinutes: totalMinutes,
      barber: preferredBarber,
      status: 'waiting',
      joinTime: joinTimeString,
      timestamp: Date.now(),
    };

    updateAndBroadcastState((prev) => ({
      ...prev,
      customers: [...prev.customers, newCustomer],
      nextTokenNumber: prev.nextTokenNumber + 1,
    }));

    setCurrentUserToken(nextToken);
    return newCustomer;
  };

  // 2. Call Next Customer
  // Rule: Call next for barber X picks the earliest customer who chose X or 'Any'.
  // A customer who chose Ravi is never given to Amit or Imran.
  const callNext = (barberId) => {
    const targetBarber = state.barbers.find((b) => b.id === barberId);
    if (!targetBarber || targetBarber.status === 'break') return null;

    // Pick earliest eligible waiting customer
    const eligibleCustIndex = state.customers.findIndex(
      (c) => c.status === 'waiting' && (c.barber === targetBarber.name || c.barber === 'Any')
    );

    if (eligibleCustIndex === -1) {
      return null;
    }

    const calledCust = state.customers[eligibleCustIndex];

    updateAndBroadcastState((prev) => {
      // Update customer status to called
      const updatedCustomers = prev.customers.map((c) =>
        c.token === calledCust.token
          ? {
              ...c,
              status: 'called',
              assignedBarber: targetBarber.name,
              chair: targetBarber.chair,
              calledTime: Date.now(),
            }
          : c
      );

      // Update barber to busy with this customer
      const updatedBarbers = prev.barbers.map((b) =>
        b.id === targetBarber.id
          ? {
              ...b,
              status: 'busy',
              currentCustomer: {
                token: calledCust.token,
                name: calledCust.name,
                services: calledCust.services,
                startTime: Date.now(),
              },
            }
          : b
      );

      return {
        ...prev,
        customers: updatedCustomers,
        barbers: updatedBarbers,
        newlyCalledToken: calledCust.token,
      };
    });

    playChimeSound();
    return calledCust;
  };

  // 3. Start Service (Barber View: called -> in_chair)
  const startService = (barberId) => {
    updateAndBroadcastState((prev) => {
      const barber = prev.barbers.find((b) => b.id === barberId);
      if (!barber || !barber.currentCustomer) return prev;

      const customerToken = barber.currentCustomer.token;
      const updatedCustomers = prev.customers.map((c) =>
        c.token === customerToken ? { ...c, status: 'in_chair', startTime: Date.now() } : c
      );

      return {
        ...prev,
        customers: updatedCustomers,
      };
    });
  };

  // 3b. Customer walks to chair ("I'm Walking to the Chair" button)
  // Transitions customer from 'called' to 'in_chair'
  // Updates barber chair and timer, clears newlyCalledToken
  const setCustomerInChair = (token) => {
    updateAndBroadcastState((prev) => {
      const targetCustomer = prev.customers.find((c) => c.token === token);
      if (!targetCustomer) return prev;

      // Prevent duplicate or invalid status update (e.g. if already in_chair or done)
      if (targetCustomer.status === 'in_chair' || targetCustomer.status === 'done' || targetCustomer.status === 'completed') {
        return prev;
      }

      const assignedBarberName = targetCustomer.assignedBarber || targetCustomer.barber;

      const updatedCustomers = prev.customers.map((c) =>
        c.token === token
          ? {
              ...c,
              status: 'in_chair',
              startTime: Date.now(),
            }
          : c
      );

      // Make sure the corresponding barber has this customer in chair
      const updatedBarbers = prev.barbers.map((b) => {
        if (
          b.name === assignedBarberName ||
          b.currentCustomer?.token === token ||
          (!b.currentCustomer && (b.name === targetCustomer.barber || targetCustomer.barber === 'Any'))
        ) {
          return {
            ...b,
            status: 'busy',
            currentCustomer: {
              token: targetCustomer.token,
              name: targetCustomer.name,
              services: targetCustomer.services,
              startTime: Date.now(),
            },
          };
        }
        return b;
      });

      return {
        ...prev,
        customers: updatedCustomers,
        barbers: updatedBarbers,
        newlyCalledToken: null,
      };
    });
  };

  // 4. Done Service (Barber View / Reception: in_chair / called -> done)
  // Advances queue, clears barber chair, records completedTime, ensures zero duplicates
  const markBarberDone = (barberId) => {
    updateAndBroadcastState((prev) => {
      const barber = prev.barbers.find((b) => b.id === barberId);
      if (!barber || !barber.currentCustomer) return prev;

      const finishedToken = barber.currentCustomer.token;
      if (!finishedToken) return prev;

      // Check if this customer is already marked done (prevent duplicate completion action)
      const existingCustomer = prev.customers.find((c) => c.token === finishedToken);
      if (existingCustomer && (existingCustomer.status === 'done' || existingCustomer.status === 'completed')) {
        const updatedBarbers = prev.barbers.map((b) =>
          b.id === barberId ? { ...b, status: 'free', currentCustomer: null } : b
        );
        return {
          ...prev,
          barbers: updatedBarbers,
        };
      }

      let customerFound = false;
      const updatedCustomers = prev.customers.map((c) => {
        if (c.token === finishedToken) {
          customerFound = true;
          return {
            ...c,
            status: 'done',
            chair: c.chair || barber.chair,
            assignedBarber: c.assignedBarber || barber.name,
            completedTime: c.completedTime || Date.now(),
          };
        }
        return c;
      });

      // If currentCustomer was not yet in customers array, append once as done
      const finalCustomers = customerFound
        ? updatedCustomers
        : [
            ...updatedCustomers,
            {
              token: barber.currentCustomer.token,
              name: barber.currentCustomer.name,
              phone: barber.currentCustomer.phone || '',
              services: barber.currentCustomer.services || ['Haircut'],
              barber: barber.name,
              chair: barber.chair,
              status: 'done',
              completedTime: Date.now(),
            },
          ];

      const updatedBarbers = prev.barbers.map((b) =>
        b.id === barberId
          ? {
              ...b,
              status: 'free',
              currentCustomer: null,
            }
          : b
      );

      return {
        ...prev,
        customers: finalCustomers,
        barbers: updatedBarbers,
      };
    });
  };

  // 5. Mark No-Show (Called -> No-show; releases barber)
  const markNoShow = (token) => {
    updateAndBroadcastState((prev) => {
      const updatedCustomers = prev.customers.map((c) =>
        c.token === token ? { ...c, status: 'no_show', noShowTime: Date.now() } : c
      );

      // If a barber was serving/calling this customer, free their chair
      const updatedBarbers = prev.barbers.map((b) =>
        b.currentCustomer?.token === token
          ? { ...b, status: 'free', currentCustomer: null }
          : b
      );

      return {
        ...prev,
        customers: updatedCustomers,
        barbers: updatedBarbers,
      };
    });
  };

  // 6. Re-add No-show Customer (Rule: added again at the END of the queue)
  const reAddCustomer = (oldToken) => {
    const existing = state.customers.find((c) => c.token === oldToken);
    if (!existing) return;

    const newToken = `S-${state.nextTokenNumber}`;
    const reAddedCust = {
      ...existing,
      token: newToken,
      status: 'waiting',
      reAddedTime: Date.now(),
    };

    updateAndBroadcastState((prev) => ({
      ...prev,
      customers: [...prev.customers, reAddedCust],
      nextTokenNumber: prev.nextTokenNumber + 1,
    }));

    return newToken;
  };

  // 7. Cancel Spot (Waiting -> Cancelled)
  const cancelCustomer = (token) => {
    updateAndBroadcastState((prev) => {
      const updatedCustomers = prev.customers.map((c) =>
        c.token === token ? { ...c, status: 'cancelled', cancelledTime: Date.now() } : c
      );

      return {
        ...prev,
        customers: updatedCustomers,
      };
    });
  };

  // 8. Toggle Barber Break / Available
  const toggleBarberStatus = (barberId) => {
    updateAndBroadcastState((prev) => {
      const updatedBarbers = prev.barbers.map((b) => {
        if (b.id === barberId) {
          const nextStatus = b.status === 'break' ? 'free' : 'break';
          return {
            ...b,
            status: nextStatus,
            // If going on break and has no active customer
            currentCustomer: nextStatus === 'break' && !b.currentCustomer ? null : b.currentCustomer,
          };
        }
        return b;
      });

      return {
        ...prev,
        barbers: updatedBarbers,
      };
    });
  };

  // 9. Owner: Toggle Online Queue Open / Closed
  const toggleQueue = () => {
    updateAndBroadcastState((prev) => ({
      ...prev,
      isQueueOpen: !prev.isQueueOpen,
    }));
  };

  // Reset to clean demo data — no fake completed records.
  // After reset the Clients Served Today counter will be 0.
  const resetQueueData = () => {
    updateAndBroadcastState({
      customers: INITIAL_CUSTOMERS,   // contains only waiting/in-chair records
      barbers: INITIAL_BARBERS,
      isQueueOpen: true,
      newlyCalledToken: null,
      nextTokenNumber: 20,
    });
    setCurrentUserToken('S-14');
  };

  return (
    <QueueContext.Provider
      value={{
        customers: state.customers,
        waitingCustomers,
        barbers: state.barbers,
        currentUserToken,
        setCurrentUserToken,
        newlyCalledToken: state.newlyCalledToken,
        isQueueOpen: state.isQueueOpen,
        clientsServedToday,
        getClientsServedToday,
        getCustomerWaitTime,
        joinQueue,
        callNext,
        startService,
        setCustomerInChair,
        markBarberDone,
        markNoShow,
        reAddCustomer,
        cancelCustomer,
        toggleBarberStatus,
        toggleQueue,
        resetQueueData,
      }}
    >
      {children}
    </QueueContext.Provider>
  );
}

export function useQueue() {
  const context = useContext(QueueContext);
  if (!context) {
    throw new Error('useQueue must be used within a QueueProvider');
  }
  return context;
}

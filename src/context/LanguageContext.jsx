import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    brandName: "NOIR",
    tagline: "Salon Queue Management",
    langSwitch: "ગુજરાતી",
    currentLang: "English",
    screens: {
      joinQueue: "Join Queue",
      liveStatus: "Live Status",
      receptionist: "Receptionist",
      barber: "Barber",
      waitingTv: "Waiting TV",
      ownerSettings: "Owner Settings",
    },
    joinQueue: {
      title: "Join the Salon Queue",
      subtitle: "Select your desired services and preferred barber to get in line.",
      customerName: "Your Full Name",
      customerNamePlaceholder: "e.g. John Doe",
      phone: "Phone Number",
      phonePlaceholder: "e.g. 98765 43210",
      selectServices: "Select Service(s)",
      selectBarber: "Choose Barber",
      anyBarber: "Any Available Barber (Fastest)",
      joinBtn: "Join Queue & Get Token",
      estimatedWaitNote: "Estimated wait time is calculated automatically based on queue length.",
    },
    liveStatus: {
      title: "Your Queue Status",
      subtitle: "Track your real-time position in line.",
      yourToken: "Your Token",
      tokenPlaceholder: "#A-14",
      positionInLine: "Position in Queue",
      positionVal: "3rd in line",
      estimatedWait: "Estimated Wait",
      minsWait: "approx. 25 mins",
      assignedBarber: "Barber",
      alertTitle: "You're Next!",
      alertDesc: "Please proceed to the salon waiting lounge. Your chair will be ready shortly.",
      servicesBooked: "Selected Services",
      refreshStatus: "Refresh Live Status",
    },
    receptionist: {
      title: "Receptionist Dashboard",
      subtitle: "Manage walk-in clients, monitor queue, and assign tokens.",
      addWalkIn: "Add Walk-in Client",
      callNext: "Call Next Customer",
      markNoShow: "Mark as No-Show",
      activeQueue: "Active Queue List",
      searchPlaceholder: "Search client or token...",
      tableHeaders: {
        token: "Token #",
        client: "Client Name",
        services: "Services",
        barber: "Barber",
        wait: "Wait",
        actions: "Actions",
      },
    },
    barber: {
      title: "Barber Station",
      subtitle: "Manage your current client and service flow.",
      selectBarberStation: "Select Barber Station",
      currentCustomer: "Currently in Chair",
      noCustomer: "No client currently in chair.",
      clientDetails: "Client Details",
      servicesToPerform: "Services to perform",
      startService: "Start Service",
      markDone: "Mark as Done",
      nextInLine: "Up Next for You",
    },
    waitingTv: {
      title: "Salon Live Display",
      subtitle: "Waiting Area TV Screen",
      inChairSection: "Currently Being Served",
      nextTokensSection: "Next 5 in Queue",
      barberName: "Barber",
      clientToken: "Token",
      service: "Service",
      estTime: "Est. Time",
      emptyQueue: "No upcoming clients in queue.",
    },
    ownerSettings: {
      title: "Owner Settings & Operations",
      subtitle: "Configure services, staff on duty, and queue status.",
      queueControl: "Queue Control",
      queueStatus: "Queue Status",
      queueOpen: "Queue is OPEN",
      queueClosed: "Queue is CLOSED",
      toggleQueueBtn: "Toggle Queue Status",
      barbersOnDuty: "Barbers on Duty",
      manageServices: "Services & Pricing",
      serviceName: "Service Name",
      duration: "Duration (mins)",
      price: "Price (₹)",
      addServiceBtn: "Add New Service",
      saveChanges: "Save Settings",
    },
    common: {
      emptyScreenBadge: "Screen Scaffold / Placeholder",
      readyForImplementation: "Ready for business logic & UI implementation",
      quickSwitcher: "Navigation / Screen Preview:",
    }
  },
  gu: {
    brandName: "NOIR",
    tagline: "સલૂન કતાર વ્યવસ્થાપન",
    langSwitch: "English",
    currentLang: "ગુજરાતી",
    screens: {
      joinQueue: "કતારમાં જોડાવો",
      liveStatus: "લાઈવ સ્ટેટસ",
      receptionist: "રિસેપ્શનિસ્ટ",
      barber: "બાર્બર સ્ક્રીન",
      waitingTv: "વેઇટિંગ ટીવી",
      ownerSettings: "માલિક સેટિંગ્સ",
    },
    joinQueue: {
      title: "સલૂન કતારમાં નામ નોંધાવો",
      subtitle: "કતારમાં સ્થાન મેળવવા માટે તમારી સેવાઓ અને પસંદગીના હજામ (બાર્બર) પસંદ કરો.",
      customerName: "તમારું પૂરું નામ",
      customerNamePlaceholder: "દા.ત. રમેશભાઈ પટેલ",
      phone: "મોબાઇલ નંબર",
      phonePlaceholder: "દા.ત. 98765 43210",
      selectServices: "સેવા(ઓ) પસંદ કરો",
      selectBarber: "બાર્બર પસંદ કરો",
      anyBarber: "કોઈપણ ઉપલબ્ધ બાર્બર (સૌથી ઝડપી)",
      joinBtn: "કતારમાં જોડાવો અને ટોકન મેળવો",
      estimatedWaitNote: "અંદાજિત પ્રતીક્ષા સમય કતારની લંબાઈના આધારે આપમેળે ગણવામાં આવે છે.",
    },
    liveStatus: {
      title: "તમારું કતાર સ્ટેટસ",
      subtitle: "કતારમાં તમારો વારો રીઅલ-ટાઇમ ટ્રેક કરો.",
      yourToken: "તમારો ટોકન",
      tokenPlaceholder: "#A-14",
      positionInLine: "કતારમાં સ્થાન",
      positionVal: "3જો નંબર",
      estimatedWait: "અંદાજિત પ્રતીક્ષા સમય",
      minsWait: "આશરે 25 મિનિટ",
      assignedBarber: "બાર્બર",
      alertTitle: "તમારો વારો આવી ગયો છે!",
      alertDesc: "કૃપા કરીને સલૂન વેઇટિંગ લાઉન્જમાં પહોંચો. તમારી ખુરશી ટૂંક સમયમાં તૈયાર થઈ જશે.",
      servicesBooked: "પસંદ કરેલ સેવાઓ",
      refreshStatus: "લાઈવ સ્ટેટસ રિફ્રેશ કરો",
    },
    receptionist: {
      title: "રિસેપ્શનિસ્ટ ડેશબોર્ડ",
      subtitle: "વોક-ઇન ગ્રાહકો ઉમેરો, કતાર નિયંત્રિત કરો અને ટોકન ફાળવો.",
      addWalkIn: "વોક-ઇન ગ્રાહક ઉમેરો",
      callNext: "પછીના ગ્રાહકને બોલાવો",
      markNoShow: "ગેરહાજર તરીકે ચિહ્નિત કરો",
      activeQueue: "હાલની કતાર સૂચિ",
      searchPlaceholder: "ગ્રાહક અથવા ટોકન શોધો...",
      tableHeaders: {
        token: "ટોકન નં.",
        client: "ગ્રાહકનું નામ",
        services: "સેવાઓ",
        barber: "બાર્બર",
        wait: "પ્રતીક્ષા",
        actions: "ક્રિયાઓ",
      },
    },
    barber: {
      title: "બાર્બર સ્ટેશન",
      subtitle: "તમારા હાલના ગ્રાહક અને સેવાની પ્રક્રિયા સંભાળો.",
      selectBarberStation: "બાર્બર સ્ટેશન પસંદ કરો",
      currentCustomer: "હાલમાં ખુરશીમાં ગ્રાહક",
      noCustomer: "હાલમાં ખુરશીમાં કોઈ ગ્રાહક નથી.",
      clientDetails: "ગ્રાહકની વિગત",
      servicesToPerform: "આપવાની સેવાઓ",
      startService: "સેવા શરૂ કરો",
      markDone: "પૂર્ણ થયેલ તરીકે ચિહ્નિત કરો",
      nextInLine: "પછીનો આગામી વારો",
    },
    waitingTv: {
      title: "સલૂન લાઈવ ડિસ્પ્લે",
      subtitle: "વેઇટિંગ એરિયા ટીવી સ્ક્રીન",
      inChairSection: "હાલમાં સેવા લઈ રહેલા ગ્રાહકો",
      nextTokensSection: "કતારમાં આગામી 5 ટોકન",
      barberName: "બાર્બર",
      clientToken: "ટોકન",
      service: "સેવા",
      estTime: "અંદાજિત સમય",
      emptyQueue: "કતારમાં કોઈ આગામી ગ્રાહક નથી.",
    },
    ownerSettings: {
      title: "માલિક સેટિંગ્સ અને કામગીરી",
      subtitle: "સેવાઓ, ફરજ પરના બાર્બર્સ અને કતારની સ્થિતિ ગોઠવો.",
      queueControl: "કતાર નિયંત્રણ",
      queueStatus: "કતાર સ્થિતિ",
      queueOpen: "કતાર ચાલુ છે (OPEN)",
      queueClosed: "કતાર બંધ છે (CLOSED)",
      toggleQueueBtn: "કતાર સ્થિતિ બદલો",
      barbersOnDuty: "હાજર/ડ્યુટી પરના બાર્બર્સ",
      manageServices: "સેવાઓ અને ભાવ",
      serviceName: "સેવાનું નામ",
      duration: "સમય (મિનિટ)",
      price: "કિંમત (₹)",
      addServiceBtn: "નવી સેવા ઉમેરો",
      saveChanges: "સેટિંગ્સ સાચવો",
    },
    common: {
      emptyScreenBadge: "સ્ક્રીન નમૂનો / પ્લેસહોલ્ડર",
      readyForImplementation: "બિઝનેસ લોજિક અને યુઆઈ અમલીકરણ માટે તૈયાર",
      quickSwitcher: "નેવિગેશન / સ્ક્રીન પૂર્વાવલોકન:",
    }
  }
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'gu' : 'en'));
  };

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

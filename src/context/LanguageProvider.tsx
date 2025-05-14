import React, { createContext, useContext, useState, useEffect } from 'react';

// Define available languages
export const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिंदी' },
  { code: 'bn', name: 'বাংলা' },
  { code: 'te', name: 'తెలుగు' },
  { code: 'kn', name: 'ಕನ್ನಡ' },
  { code: 'ta', name: 'தமிழ்' },
];

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (code: string) => void;
  translate: (key: string) => string;
}

// Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation dictionaries
const translations = {
  en: {
    home: 'Home',
    rights: 'Rights',
    community: 'Community',
    resources: 'Resources',
    documents: 'Documents',
    complaints: 'File Complaint',
    language: 'Language',
    ai_assistant: 'AI Assistant',
    consumer_rights: 'Consumer Rights',
    search: 'Search',
    notifications: 'Notifications',
    about: 'About',
    contact: 'Contact',
    services: 'Services',
  },
  hi: {
    home: 'होम',
    rights: 'अधिकार',
    community: 'समुदाय',
    resources: 'संसाधन',
    documents: 'दस्तावेज़',
    complaints: 'शिकायत दर्ज करें',
    language: 'भाषा',
    ai_assistant: 'एआई सहायक',
    consumer_rights: 'उपभोक्ता अधिकार',
    search: 'खोज',
    notifications: 'सूचनाएं',
    about: 'हमारे बारे में',
    contact: 'संपर्क करें',
    services: 'सेवाएं',
  },
  bn: {
    home: 'হোম',
    rights: 'অধিকার',
    community: 'কমিউনিটি',
    resources: 'রিসোর্স',
    documents: 'ডকুমেন্টস',
    complaints: 'অভিযোগ দাখিল করুন',
    language: 'ভাষা',
    ai_assistant: 'এআই সহকারী',
    consumer_rights: 'ভোক্তা অধিকার',
    search: 'অনুসন্ধান',
    notifications: 'বিজ্ঞপ্তি',
    about: 'আমাদের সম্পর্কে',
    contact: 'যোগাযোগ',
    services: 'সেবা',
  },
  te: {
    home: 'హోమ్',
    rights: 'హక్కులు',
    community: 'కమ్యూనిటీ',
    resources: 'వనరులు',
    documents: 'పత్రాలు',
    complaints: 'ఫిర్యాదు దాఖలు చేయండి',
    language: 'భాష',
    ai_assistant: 'AI సహాయకుడు',
    consumer_rights: 'వినియోగదారు హక్కులు',
    search: 'శోధన',
    notifications: 'నోటిఫికేషన్లు',
    about: 'మా గురించి',
    contact: 'సంప్రదించండి',
    services: 'సేవలు',
  },
  kn: {
    'home': 'ಮುಖಪುಟ',
    'consumer_rights': 'ಗ್ರಾಹಕ ಹಕ್ಕುಗಳು',
    'ai_assistant': 'AI ಸಹಾಯಕ',
    'community': 'ಸಮುದಾಯ',
    'resources': 'ಸಂಪನ್ಮೂಲಗಳು',
    'file_complaint': 'ದೂರು ದಾಖಲಿಸಿ',
    'track_complaints': 'ದೂರುಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ',
    'get_help': 'ಸಹಾಯ ಪಡೆಯಿರಿ',
    // Add more translations as needed
  },
  ta: {
    'home': 'முகப்பு',
    'consumer_rights': 'நுகர்வோர் உரிமைகள்',
    'ai_assistant': 'AI உதவியாளர்',
    'community': 'சமூகம்',
    'resources': 'வளங்கள்',
    'file_complaint': 'புகார் அளிக்கவும்',
    'track_complaints': 'புகார்களைக் கண்காணிக்கவும்',
    'get_help': 'உதவி பெறுக',
    // Add more translations as needed
  },
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

// Create the provider
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Initialize with stored language or default to 'en'
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    const storedLang = localStorage.getItem('preferredLanguage');
    return storedLang || 'en';
  });

  useEffect(() => {
    // Update HTML lang attribute
    document.documentElement.lang = currentLanguage;
    // Store language preference
    localStorage.setItem('preferredLanguage', currentLanguage);
  }, [currentLanguage]);

  const setLanguage = (code: string) => {
    if (languages.some(lang => lang.code === code)) {
      setCurrentLanguage(code);
    }
  };

  const translate = (key: string): string => {
    return translations[currentLanguage as keyof typeof translations]?.[key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Export the hook for easy access to the context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageProvider;

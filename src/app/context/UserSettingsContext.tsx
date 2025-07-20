'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type Settings = {
  language: 'fa' | 'en';
  direction: 'rtl' | 'ltr';
};

const defaultSettings: Settings = {
  language: 'fa',
  direction: 'rtl',
};

const UserSettingsContext = createContext<{
  settings: Settings;
  toggleLanguage: () => void;
}>({
  settings: defaultSettings,
  toggleLanguage: () => {},
});

export function UserSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  const toggleLanguage = () => {
    setSettings((prev) => ({
      language: prev.language === 'fa' ? 'en' : 'fa',
      direction: prev.direction === 'rtl' ? 'ltr' : 'rtl',
    }));
  };

  return (
    <UserSettingsContext.Provider value={{ settings, toggleLanguage }}>
      <div dir={settings.direction}>{children}</div>
    </UserSettingsContext.Provider>
  );
}

export function useUserSettings() {
  return useContext(UserSettingsContext);
}

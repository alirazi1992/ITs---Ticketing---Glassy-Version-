'use client';

import { useUserSettings } from '@/app/context/UserSettingsContext';

export default function LanguageToggle() {
  const { settings, toggleLanguage } = useUserSettings();

  return (
    <button
      onClick={toggleLanguage}
      className="p-2 rounded-full text-sm glassy hover:bg-white/20"
    >
      {settings.language === 'fa' ? 'English' : 'فارسی'}
    </button>
  );
}

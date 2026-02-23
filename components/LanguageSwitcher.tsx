import React from 'react';
import { Language } from '../types';

interface Props {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const LanguageSwitcher: React.FC<Props> = ({ currentLang, onLanguageChange }) => {
  return (
    <div className="flex items-center space-x-2 rtl:space-x-reverse bg-white/5 backdrop-blur-sm rounded-full p-1 border border-white/10">
      <button
        onClick={() => onLanguageChange('fr')}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
          currentLang === 'fr' ? 'bg-cyan-bright text-space-black scale-110 shadow-[0_0_10px_rgba(34,211,238,0.5)]' : 'text-slate-400 hover:text-white hover:bg-white/10'
        }`}
        title="Français"
      >
        🇫🇷
      </button>
      <button
        onClick={() => onLanguageChange('en')}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
          currentLang === 'en' ? 'bg-cyan-bright text-space-black scale-110 shadow-[0_0_10px_rgba(34,211,238,0.5)]' : 'text-slate-400 hover:text-white hover:bg-white/10'
        }`}
        title="English"
      >
        🇬🇧
      </button>
      <button
        onClick={() => onLanguageChange('ar')}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
          currentLang === 'ar' ? 'bg-cyan-bright text-space-black scale-110 shadow-[0_0_10px_rgba(34,211,238,0.5)]' : 'text-slate-400 hover:text-white hover:bg-white/10'
        }`}
        title="العربية"
      >
        🇸🇦
      </button>
    </div>
  );
};
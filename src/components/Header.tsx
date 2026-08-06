import React from 'react';
import { HeartPulse, Globe, PhoneCall, ShieldAlert, Sparkles } from 'lucide-react';
import { LanguageCode, LanguageOption } from '../types';
import { LANGUAGES, TRANSLATIONS } from '../translations';

interface HeaderProps {
  currentLanguage: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  onOpenEmergency: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLanguage,
  onLanguageChange,
  onOpenEmergency,
}) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-rose-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-400 flex items-center justify-center text-white shadow-md shadow-rose-200">
            <HeartPulse className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold bg-gradient-to-r from-rose-700 via-pink-700 to-purple-800 bg-clip-text text-transparent tracking-tight">
                {t.appName}
              </h1>
              <span className="text-xs px-2 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" /> AI Care
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Controls: Language Selector & Emergency Button */}
        <div className="flex items-center justify-between sm:justify-end gap-2.5">
          {/* Multilingual Selector */}
          <div className="relative flex items-center bg-rose-50/80 border border-rose-200 rounded-xl px-2.5 py-1.5 text-xs text-rose-900 font-medium hover:bg-rose-100/80 transition-colors">
            <Globe className="w-4 h-4 text-rose-600 mr-1.5 shrink-0" />
            <select
              value={currentLanguage}
              onChange={(e) => onLanguageChange(e.target.value as LanguageCode)}
              className="bg-transparent text-rose-950 font-semibold focus:outline-none cursor-pointer pr-1"
              id="language-selector-dropdown"
              aria-label="Select Language"
            >
              {LANGUAGES.map((lang: LanguageOption) => (
                <option key={lang.code} value={lang.code} className="text-slate-800 font-normal">
                  {lang.nativeName} ({lang.name})
                </option>
              ))}
            </select>
          </div>

          {/* Emergency SOS Helpline Button */}
          <button
            onClick={onOpenEmergency}
            id="emergency-sos-header-btn"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md shadow-red-200 transition-all hover:scale-[1.02] active:scale-[0.98] animate-bounce-subtle"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>{t.emergencySos}</span>
            <PhoneCall className="w-3.5 h-3.5 ml-0.5 hidden sm:inline" />
          </button>
        </div>
      </div>
    </header>
  );
};

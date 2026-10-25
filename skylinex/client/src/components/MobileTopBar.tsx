import React from 'react';
import { MapPin, Search, Clock, Box, Bot } from 'lucide-react';
import { Language } from '../types';
import { CITIES } from '../data/mockData';

interface MobileTopBarProps {
  selectedCity: string;
  onCityChange: (city: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  language: Language;
  onLanguageChange?: (lang: Language) => void;
  onOpenMascot?: () => void;
  onSearchSubmit?: () => void;
  onNavigateHome?: () => void;
}

export const MobileTopBar: React.FC<MobileTopBarProps> = ({
  selectedCity,
  onCityChange,
  searchQuery,
  onSearchChange,
  language,
  onLanguageChange,
  onOpenMascot,
  onSearchSubmit,
  onNavigateHome,
}) => {
  return (
    <div className="lg:hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white px-3.5 pt-2.5 pb-3 shadow-md sticky top-0 z-40">
      {/* Row 1: Official Brand Logo + Location + In 30 Mins Guarantee + Mascot Button */}
      <div className="flex items-center justify-between text-xs mb-2">
        {/* Brand & Location */}
        <div className="flex items-center gap-2 min-w-0">
          <div
            onClick={onNavigateHome}
            className="flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <img
              src="/images/kontractor_logo.jpg"
              alt="Kontractor"
              className="h-8 w-auto object-contain bg-white rounded-lg p-0.5 shadow-xs"
            />
            <span className="font-black text-[11px] text-white tracking-tight hidden sm:inline">
              घर बनाना है...बन जाएगा
            </span>
          </div>

          <span className="text-white/30 text-xs">|</span>

          {/* Location Selector */}
          <div className="flex items-center gap-1 min-w-0">
            <MapPin className="w-3 h-3 text-blue-200 shrink-0" />
            <div className="relative min-w-0">
              <select
                value={selectedCity}
                onChange={(e) => onCityChange(e.target.value)}
                className="bg-transparent text-white font-bold text-[11px] cursor-pointer focus:outline-none appearance-none pr-3 truncate max-w-[105px]"
              >
                {CITIES.map((c) => (
                  <option key={c} value={c} className="text-slate-900 bg-white font-medium">
                    {c === 'All Cities' ? 'All India' : c}
                  </option>
                ))}
              </select>
              <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[9px] pointer-events-none text-blue-200">
                ▾
              </span>
            </div>
          </div>
        </div>

        {/* Right side: Language Switcher + Guarantee + Voice AI Button */}
        <div className="flex items-center gap-1.5 shrink-0">
          {onLanguageChange && (
            <div className="flex items-center bg-black/20 rounded-lg p-0.5 border border-white/20 text-[10px]">
              {(['en', 'hi', 'hinglish'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => onLanguageChange(lang)}
                  className={`px-1.5 py-0.5 rounded-md font-bold transition-all ${
                    language === lang
                      ? 'bg-white text-blue-900 shadow-xs'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {lang === 'en' ? 'EN' : lang === 'hi' ? 'हि' : 'Hg'}
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-lg bg-white/15 backdrop-blur-sm text-[10px] font-bold text-white border border-white/10">
            <Clock className="w-2.5 h-2.5 text-teal-300" />
            <span>30m</span>
          </div>

          {onOpenMascot && (
            <button
              onClick={onOpenMascot}
              className="w-7 h-7 rounded-lg bg-amber-400 hover:bg-amber-300 text-amber-950 flex items-center justify-center shadow-xs transition-transform active:scale-90 cursor-pointer"
              title="Kontractor Voice AI Assistant"
            >
              <Bot className="w-4 h-4 text-amber-950" />
            </button>
          )}
        </div>
      </div>

      {/* Row 2: Clean Rounded Search Input (Reference image style) */}
      <div className="relative">
        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && onSearchSubmit) onSearchSubmit();
          }}
          placeholder="Search for 'House Construction', 'Architect'..."
          className="w-full pl-8.5 pr-3 py-1.5 bg-white rounded-xl text-xs text-slate-900 placeholder-slate-400 font-medium shadow-inner focus:outline-none focus:ring-2 focus:ring-white/40"
        />
      </div>
    </div>
  );
};

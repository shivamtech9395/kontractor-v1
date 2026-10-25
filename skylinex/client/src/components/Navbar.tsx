import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Box, 
  Sparkles, 
  HardHat, 
  ChevronDown, 
  MoreHorizontal, 
  ShieldCheck, 
  Compass, 
  X, 
  Menu,
  Bot
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { CITIES } from '../data/mockData';

interface NavbarProps {
  selectedCity: string;
  onCityChange: (city: string) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenMascot: () => void;
  onOpen3DStudio: () => void;
  onOpenAIPlanner: () => void;
  onNavigateHome?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  selectedCity,
  onCityChange,
  language,
  onLanguageChange,
  onOpenMascot,
  onOpen3DStudio,
  onOpenAIPlanner,
  onNavigateHome,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [dotsDropdownOpen, setDotsDropdownOpen] = useState(false);
  const t = translations[language];

  return (
    <header className="hidden lg:block sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo: Kontractor with Official Tagline */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigateHome) onNavigateHome();
              }}
              className="flex items-center gap-3 group cursor-pointer"
            >
              <img
                src="/images/kontractor_logo.jpg"
                alt="Kontractor - घर बनाना है...बन जाएगा"
                className="h-14 w-auto object-contain drop-shadow-xs group-hover:scale-102 transition-transform"
              />
              <div className="hidden xl:flex flex-col">
                <span className="text-xs font-black text-blue-900 tracking-tight">
                  घर बनाना है...बन जाएगा
                </span>
                <span className="text-[10px] font-semibold text-slate-400">
                  Building Trust, Brick by Brick
                </span>
              </div>
            </a>

            {/* City Selector Dropdown */}
            <div className="relative ml-4 hidden md:block">
              <button
                onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-100/90 hover:bg-slate-200/80 text-slate-700 border border-slate-200/80 transition-colors shadow-xs"
              >
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                <span>{selectedCity}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {cityDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-fadeIn">
                  <div className="px-3.5 py-1 text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                    {t.selectCity}
                  </div>
                  {CITIES.map((city) => (
                    <button
                      key={city}
                      onClick={() => {
                        onCityChange(city);
                        setCityDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs font-medium transition-colors flex items-center justify-between ${
                        selectedCity === city
                          ? 'bg-blue-50 text-blue-600 font-semibold'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span>{city}</span>
                      {selectedCity === city && <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Center Navigation Links (Clean, Uncluttered) */}
          <nav className="hidden lg:flex items-center gap-1.5">
            <a
              href="#categories"
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition-colors"
            >
              Services Directory
            </a>
            <button
              onClick={onOpen3DStudio}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition-colors flex items-center gap-1.5 group"
            >
              <Box className="w-3.5 h-3.5 text-teal-500 group-hover:scale-110 transition-transform" />
              <span>3D House Customizer</span>
              <span className="px-1.5 py-0.2 bg-teal-50 text-teal-700 text-[10px] rounded-full font-bold border border-teal-200">20 Styles</span>
            </button>
            <button
              onClick={onOpenAIPlanner}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>AI Cost & BOQ Estimator</span>
            </button>
            <a
              href="#contractors"
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition-colors"
            >
              Verified Contractors
            </a>
          </nav>

          {/* Right Tools: Language Toggle, Mascot, 3-Dots Menu (De-cluttered) */}
          <div className="hidden sm:flex items-center gap-3">
            
            {/* Tri-Language 3-Way Selector */}
            <div className="flex items-center p-1 bg-slate-100/90 rounded-2xl border border-slate-200/80">
              {(['en', 'hi', 'hinglish'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => onLanguageChange(lang)}
                  className={`px-3 py-1 text-xs font-bold rounded-xl transition-all ${
                    language === lang
                      ? 'bg-white text-blue-600 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {lang === 'en' ? 'EN' : lang === 'hi' ? 'हिन्दी' : 'Hinglish'}
                </button>
              ))}
            </div>

            {/* Voice AI Assistant Button */}
            <button
              onClick={onOpenMascot}
              className="px-3.5 py-2 rounded-2xl bg-indigo-50 hover:bg-indigo-100/80 text-indigo-900 border border-indigo-200/70 transition-all flex items-center gap-1.5 text-xs font-bold shadow-xs cursor-pointer"
              title="Speak with Kontractor Voice AI Assistant"
            >
              <Bot className="w-4 h-4 text-indigo-600" />
              <span>Voice AI</span>
            </button>

            {/* 3-Dots Menu Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDotsDropdownOpen(!dotsDropdownOpen)}
                className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 border border-slate-200 transition-colors"
                title="More Tools"
              >
                <MoreHorizontal className="w-5 h-5" />
              </button>

              {dotsDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2.5 z-50 animate-fadeIn space-y-1">
                  <button
                    onClick={() => {
                      setDotsDropdownOpen(false);
                      onOpen3DStudio();
                    }}
                    className="w-full px-4 py-2 text-left text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <Box className="w-4 h-4 text-teal-500" />
                    <span>3D House Customizer</span>
                  </button>
                  <button
                    onClick={() => {
                      setDotsDropdownOpen(false);
                      onOpenAIPlanner();
                    }}
                    className="w-full px-4 py-2 text-left text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>AI House & BOQ Estimator</span>
                  </button>
                  <a
                    href="#categories"
                    onClick={() => setDotsDropdownOpen(false)}
                    className="w-full px-4 py-2 text-left text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <Compass className="w-4 h-4 text-blue-600" />
                    <span>15 Construction Categories</span>
                  </a>
                  <a
                    href="#contractors"
                    onClick={() => setDotsDropdownOpen(false)}
                    className="w-full px-4 py-2 text-left text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>IS-456 Verified Directory</span>
                  </a>
                </div>
              )}
            </div>

          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenMascot}
              className="p-2 rounded-xl bg-amber-100 text-amber-900"
            >
              <HardHat className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-4 animate-fadeIn">
          {/* City Selector */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1.5">
              Select City
            </label>
            <div className="flex flex-wrap gap-1.5">
              {CITIES.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    onCityChange(c);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-2.5 py-1 text-xs rounded-xl border ${
                    selectedCity === c
                      ? 'bg-blue-600 text-white border-blue-600 font-bold'
                      : 'bg-slate-50 text-slate-600 border-slate-200'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Language Selector */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1.5">
              Language / भाषा
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['en', 'hi', 'hinglish'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => onLanguageChange(lang)}
                  className={`py-1.5 text-xs font-bold rounded-xl border text-center ${
                    language === lang
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-slate-50 text-slate-600 border-slate-200'
                  }`}
                >
                  {lang === 'en' ? 'English' : lang === 'hi' ? 'हिन्दी' : 'Hinglish'}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpen3DStudio();
              }}
              className="p-3 rounded-xl bg-teal-50 text-teal-800 text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <Box className="w-4 h-4 text-teal-600" />
              <span>3D Customizer</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAIPlanner();
              }}
              className="p-3 rounded-xl bg-blue-50 text-blue-800 text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>AI Estimator</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

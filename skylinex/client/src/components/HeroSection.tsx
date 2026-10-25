import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  Box, 
  ShieldCheck, 
  Award, 
  MessageCircle, 
  Phone, 
  ArrowRight, 
  Layers, 
  Sliders, 
  ChevronRight,
  Sun,
  Moon
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface HeroSectionProps {
  language: Language;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpen3DStudio: () => void;
  onOpenAIPlanner: () => void;
  onSelectCategoryFilter: (catId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  language,
  searchQuery,
  onSearchChange,
  onOpen3DStudio,
  onOpenAIPlanner,
  onSelectCategoryFilter,
}) => {
  const t = translations[language];
  const [teaserFloor, setTeaserFloor] = useState(3);
  const [teaserSeparation, setTeaserSeparation] = useState(false);
  const [teaserNightMode, setTeaserNightMode] = useState(false);

  const [teaserStyle, setTeaserStyle] = useState<'luxury' | 'modern' | 'minimalist'>('luxury');
  const [activeHotspot, setActiveHotspot] = useState<string | null>('master');
  const [selectedTeaserLevel, setSelectedTeaserLevel] = useState<'all' | 'level1' | 'level2'>('all');

  const hotspots = [
    {
      id: 'master',
      title: 'Level 2: Master Bedroom Suite',
      pos: 'top-[20%] left-[42%]',
      level: 'level2',
      badge: 'King Suite',
      desc: 'King-size upholstered bed, solid oak flooring, floor-to-ceiling glass sliding doors opening to the deck.',
      rate: '₹3,400 / sq.ft'
    },
    {
      id: 'terrace',
      title: 'Level 2: Open Sun Deck & Solarium',
      pos: 'top-[34%] left-[78%]',
      level: 'level2',
      badge: 'Wooden Patio',
      desc: 'All-weather teakwood deck tiles, outdoor sectional sofa, shade umbrella & biophilic planters.',
      rate: '₹1,200 / sq.ft'
    },
    {
      id: 'living',
      title: 'Level 1: Grand Living Lounge',
      pos: 'top-[64%] left-[22%]',
      level: 'level1',
      badge: 'Foyer & Lounge',
      desc: 'Italian bookmatched marble floor, 6-seater low-profile couch, acoustic wood fluted wall paneling.',
      rate: '₹2,600 / sq.ft'
    },
    {
      id: 'kitchen',
      title: 'Level 1: Gourmet Modular Kitchen',
      pos: 'top-[60%] left-[48%]',
      level: 'level1',
      badge: 'Agni Corner',
      desc: 'Quartz waterfall breakfast counter, Hafele soft-close drawers, chimney & induction hob island.',
      rate: '₹1,850 / sq.ft'
    },
    {
      id: 'bath',
      title: 'Level 1: Designer Powder Room & Spa',
      pos: 'top-[70%] left-[64%]',
      level: 'level1',
      badge: 'Ensuite Bath',
      desc: 'Grohe thermostatic rain shower, wall-hung WC, concealed cistern & backlit LED vanity mirror.',
      rate: '₹2,200 / fixture'
    }
  ];

  return (
    <section className="relative overflow-hidden pt-6 pb-14 lg:pt-12 lg:pb-20 subtle-mesh">
      {/* Background Architectural Brand Atmosphere */}
      <div 
        className="absolute inset-0 bg-contain bg-center opacity-[0.08] pointer-events-none mix-blend-multiply bg-no-repeat"
        style={{ backgroundImage: "url('/images/kontractor_logo.jpg')" }}
      ></div>

      {/* Ambient background glows */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-40 right-1/4 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10">
        {/* Mobile App Promo Banner (Responsive & Non-Overflowing) */}
        <div className="lg:hidden mb-5 p-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white shadow-lg relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-right opacity-20 mix-blend-overlay pointer-events-none"
            style={{ backgroundImage: "url('/images/villa_3d_exploded.jpg')" }}
          />
          <div className="relative z-10 space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-[10px] font-black uppercase tracking-wider text-white">
              <Sparkles className="w-3 h-3 text-yellow-300" />
              <span>LIMITED OFFER</span>
            </div>

            <h2 className="text-lg sm:text-xl font-black leading-tight text-white">
              Ghar Banao Tension Free
            </h2>
            <p className="text-[11px] sm:text-xs text-blue-100 font-medium leading-relaxed">
              घर बनाना है...बन जाएगा • Get up to 20% off on your turnkey construction project
            </p>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
              <button
                onClick={onOpen3DStudio}
                className="px-3.5 py-1.5 rounded-xl bg-white text-blue-900 font-extrabold text-xs shadow-md active:scale-95 transition-all flex items-center gap-1.5 shrink-0"
              >
                <span>Book Site Visit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <span className="flex items-center gap-1 text-[10px] font-extrabold text-emerald-300 bg-emerald-950/40 px-2.5 py-1 rounded-full backdrop-blur-sm border border-emerald-400/30 shrink-0">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                <span>Verified IS-456</span>
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Text & Search (Desktop & Laptop) */}
          <div className="hidden lg:block lg:col-span-7 space-y-8">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50/90 border border-blue-200/80 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
              <span className="text-xs font-bold text-blue-900 tracking-wide">
                Next-Gen Construction Tech • 2026 Standards
              </span>
            </div>

            {/* Dynamic Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
                {language === 'en' && (
                  <>
                    Building Tomorrow’s <span className="luxury-gradient-text">Architectural</span> Masterpieces
                  </>
                )}
                {language === 'hi' && (
                  <>
                    अपने सपनों का मजबूत और <span className="luxury-gradient-text">भव्य आशियाना</span> बनाएं
                  </>
                )}
                {language === 'hinglish' && (
                  <>
                    Apne Dream House Ko Banayein <span className="luxury-gradient-text">Strong & Modern</span>
                  </>
                )}
              </h1>
              <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl">
                {t.heroSubtitle}
              </p>
            </div>

            {/* Universal Search Bar */}
            <div className="relative max-w-2xl">
              <div className="flex items-center p-2 rounded-3xl bg-white shadow-luxury hover:shadow-luxury-hover border border-slate-200/90 transition-all duration-300">
                <div className="pl-3.5 pr-2 text-blue-600">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className="w-full py-2.5 px-2 text-sm text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none font-medium"
                />
                <button
                  onClick={() => {
                    const el = document.getElementById('contractors');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-bold text-xs tracking-wide shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 shrink-0"
                >
                  <span>Search</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Filter Tag Pills */}
              <div className="flex items-center gap-2 mt-3 flex-wrap text-xs text-slate-500">
                <span className="font-semibold text-slate-400">Popular:</span>
                {[
                  { id: 'cat-construction-repair', labelEn: 'Civil & Repair', labelHi: 'सिविल एवं मरम्मत', labelHinglish: 'Civil & Repair' },
                  { id: 'cat-interior-decoration', labelEn: 'Interiors', labelHi: 'इंटीरियर डिजाइन', labelHinglish: 'Interiors' },
                  { id: 'cat-modular-kitchen', labelEn: 'Modular Kitchen', labelHi: 'मॉड्यूलर किचन', labelHinglish: 'Modular Kitchen' },
                  { id: 'cat-solar-green', labelEn: 'Solar Rooftop', labelHi: 'सोलर रूफटॉप', labelHinglish: 'Solar Rooftop' },
                ].map((pill) => (
                  <button
                    key={pill.id}
                    onClick={() => onSelectCategoryFilter(pill.id)}
                    className="px-2.5 py-1 rounded-full bg-white hover:bg-blue-50 border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-200 transition-colors cursor-pointer"
                  >
                    {language === 'hi' ? pill.labelHi : language === 'hinglish' ? pill.labelHinglish : pill.labelEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Action CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={onOpen3DStudio}
                className="px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs tracking-wide shadow-lg shadow-slate-900/10 flex items-center gap-2 transition-transform hover:scale-[1.02]"
              >
                <Box className="w-4 h-4 text-teal-400" />
                <span>{t.view3DStudio}</span>
                <span className="px-1.5 py-0.5 rounded bg-white/20 text-[10px]">20 Styles</span>
              </button>

              <button
                onClick={onOpenAIPlanner}
                className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200/90 font-bold text-xs tracking-wide shadow-sm flex items-center gap-2 transition-transform hover:scale-[1.02]"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>AI Floor Plan & BOQ</span>
              </button>
            </div>

            {/* Trust Indicators Bar */}
            <div className="pt-6 border-t border-slate-200/70 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-[11px] font-bold text-slate-700 leading-tight">
                  {t.trustBadge1}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div className="text-[11px] font-bold text-slate-700 leading-tight">
                  {t.trustBadge2}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div className="text-[11px] font-bold text-slate-700 leading-tight">
                  {t.trustBadge3}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="text-[11px] font-bold text-slate-700 leading-tight">
                  {t.trustBadge4}
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Ultra-Luxury 3D Architectural Villa Showcase (Desktop Only, Mobile has Dedicated Section below Categories) */}
          <div className="hidden lg:flex lg:col-span-5 justify-center">
            <div className="relative w-full max-w-lg group">
              
              {/* Magnetic Glowing Pulse Ring behind Container */}
              <div className="absolute -inset-1.5 rounded-[36px] bg-gradient-to-r from-blue-600 via-teal-400 to-indigo-600 opacity-40 blur-xl group-hover:opacity-75 transition duration-700"></div>

              {/* Floating ambient badge */}
              <div className="absolute -top-3.5 -right-2 z-30 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 text-white text-xs font-black shadow-xl shadow-blue-500/30 flex items-center gap-1.5 animate-bounce">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                <span>3D Exploded Villa</span>
              </div>

              {/* Main Card (3D Lift / Glassmorphism) */}
              <div className="card-3d-pop bg-white/95 rounded-[32px] p-5 sm:p-6 shadow-2xl border-2 border-blue-400/40 relative overflow-hidden backdrop-blur-xl">
                
                {/* Card Header with Level Selector & Day/Night Toggle */}
                <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200/60">
                      Isometric Cutaway Studio
                    </span>
                    <h3 className="text-base font-black text-slate-900 mt-1">
                      Modern Luxury Villa 3D
                    </h3>
                  </div>
                  
                  {/* Day / Night light toggle */}
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                    <button
                      onClick={() => setTeaserNightMode(false)}
                      className={`p-1.5 rounded-lg text-xs font-semibold ${
                        !teaserNightMode ? 'bg-white text-amber-500 shadow-sm' : 'text-slate-400'
                      }`}
                      title="Daylight Architecture"
                    >
                      <Sun className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setTeaserNightMode(true)}
                      className={`p-1.5 rounded-lg text-xs font-semibold ${
                        teaserNightMode ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400'
                      }`}
                      title="Warm Evening Ambient Lighting"
                    >
                      <Moon className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Level Filter Switcher */}
                <div className="py-2.5 flex items-center justify-between gap-2 border-b border-slate-100 text-xs">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Inspect Level:</span>
                  <div className="flex items-center gap-1">
                    {[
                      { id: 'all', label: 'Full Duplex' },
                      { id: 'level2', label: 'L2 Suite & Deck' },
                      { id: 'level1', label: 'L1 Lounge & Kitchen' },
                    ].map((lvl) => (
                      <button
                        key={lvl.id}
                        onClick={() => setSelectedTeaserLevel(lvl.id as any)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                          selectedTeaserLevel === lvl.id
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {lvl.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3D Realistic Villa Visual Container (Using Image 7: villa_3d_exploded.jpg) */}
                <div 
                  className={`mt-3 rounded-2xl relative overflow-hidden transition-all duration-500 bg-slate-950 shadow-inner group/canvas ${
                    teaserNightMode ? 'ring-2 ring-indigo-500/40' : 'ring-1 ring-slate-200'
                  }`}
                >
                  {/* High-Resolution Exploded Villa Image */}
                  <div className="relative aspect-[16/11] overflow-hidden">
                    <img 
                      src="/images/villa_3d_exploded.jpg" 
                      alt="Modern Luxury 3D Exploded Villa"
                      className={`w-full h-full object-cover transition-all duration-700 ${
                        teaserNightMode 
                          ? 'filter brightness-90 contrast-110 hue-rotate-[195deg]' 
                          : 'filter brightness-100 contrast-105'
                      }`}
                    />

                    {/* Ambient subtle vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none"></div>

                    {/* Interactive Hotspot Pins Overlaid on Real 3D Villa */}
                    {hotspots.map((hs) => {
                      const isActive = activeHotspot === hs.id;
                      const isHighlighted = selectedTeaserLevel === 'all' || selectedTeaserLevel === hs.level;

                      if (!isHighlighted) return null;

                      return (
                        <div
                          key={hs.id}
                          className={`absolute ${hs.pos} -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer transition-transform duration-300 hover:scale-125`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveHotspot(isActive ? null : hs.id);
                          }}
                        >
                          <div className="relative flex items-center justify-center">
                            <span className="absolute w-6 h-6 rounded-full bg-blue-500/50 animate-ping"></span>
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center shadow-lg border-2 border-white text-[10px] font-black ${
                              isActive ? 'bg-amber-400 text-slate-900 scale-110' : 'bg-blue-600 text-white'
                            }`}>
                              +
                            </div>
                            <span className="absolute -bottom-4 whitespace-nowrap px-1.5 py-0.2 rounded bg-blue-900/90 backdrop-blur-md text-white text-[8px] font-bold">
                              {hs.badge}
                            </span>
                          </div>
                        </div>
                      );
                    })}

                    {/* Floating Hotspot Detail Modal / Popover */}
                    {activeHotspot && (
                      <div className="absolute bottom-3 inset-x-3 z-30 p-3.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-2xl animate-fadeIn">
                        {(() => {
                          const hs = hotspots.find(h => h.id === activeHotspot);
                          if (!hs) return null;
                          return (
                            <div className="space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-black text-slate-900">{hs.title}</span>
                                <span className="px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 text-[10px] font-extrabold border border-teal-200">
                                  {hs.rate}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-600 leading-relaxed">
                                {hs.desc}
                              </p>
                              <div className="pt-1 flex items-center justify-between text-[10px]">
                                <span className="text-blue-600 font-bold">✓ IS 456 Structural Standard</span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveHotspot(null);
                                  }}
                                  className="text-slate-400 hover:text-slate-700 font-bold"
                                >
                                  Close ✕
                                </button>
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    )}

                    {/* Status badge in preview */}
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-blue-900/85 backdrop-blur-md text-[10px] font-bold text-white border border-blue-400/30 shadow-md flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                      <span>Exploded 2-Level Cutaway View</span>
                    </div>

                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-blue-900/80 backdrop-blur-md text-[9px] font-bold text-yellow-300 border border-yellow-300/30">
                      Tap Hotspots (+) to Inspect
                    </div>
                  </div>
                </div>

                {/* Micro Features & Specs Row */}
                <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/70">
                    <span className="block text-[10px] text-slate-400 uppercase font-semibold">Structure</span>
                    <span className="font-extrabold text-slate-800 text-[11px]">PEB / Steel Frame</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/70">
                    <span className="block text-[10px] text-slate-400 uppercase font-semibold">Total Area</span>
                    <span className="font-extrabold text-blue-600 text-[11px]">1,850 sq.ft</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/70">
                    <span className="block text-[10px] text-slate-400 uppercase font-semibold">Turnkey Cost</span>
                    <span className="font-extrabold text-teal-700 text-[11px]">₹48L - ₹65L</span>
                  </div>
                </div>

                {/* Big Magnetic CTA to Open Dedicated Studio */}
                <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                  <button
                    onClick={onOpen3DStudio}
                    className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-extrabold text-xs tracking-wider shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 group transition-all transform hover:scale-[1.02]"
                  >
                    <Box className="w-4 h-4 text-white" />
                    <span>LAUNCH FULL 3D SPATIAL STUDIO</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </button>

                  <button
                    onClick={onOpenAIPlanner}
                    className="w-full py-2 px-3 text-center text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors flex items-center justify-center gap-1"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Or Calculate Turnkey BOQ with AI Floor Planner →</span>
                  </button>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { 
  Building2, 
  Compass, 
  ShieldCheck, 
  Palette, 
  Layers, 
  Droplets, 
  Trees, 
  Zap, 
  Wrench, 
  Grid, 
  Paintbrush, 
  DoorOpen, 
  Hammer, 
  Sun, 
  Tractor,
  Flame, 
  ArrowUpRight, 
  ChevronRight, 
  Star, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { ServiceCategory, Vendor, Language, SubServiceSpec } from '../types';
import { translations } from '../i18n/translations';
import { getCategoryTitle, getCategoryDesc } from '../utils/i18nHelper';

interface CategoriesSectionProps {
  categories: ServiceCategory[];
  vendors: Vendor[];
  language: Language;
  onSelectCategory: (category: ServiceCategory) => void;
  onSelectSubService: (subService: SubServiceSpec, parentCategory?: ServiceCategory) => void;
  onSelectVendor: (vendor: Vendor) => void;
  onViewAllCategories: () => void;
  onRequestQuoteForCategory?: (categoryName: string) => void;
}

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Building2,
  Compass,
  ShieldCheck,
  Palette,
  Layers,
  Droplets,
  Trees,
  Zap,
  Wrench,
  Grid,
  Paintbrush,
  DoorOpen,
  Hammer,
  Sun,
  Tractor,
};

// Distinct Light Pastel Color Palettes for All 16 Verticals
const CATEGORY_PASTEL_THEMES: Record<string, { bg: string; border: string; hover: string; iconBg: string; text: string }> = {
  'cat-construction-repair': { bg: 'bg-amber-100/60', border: 'border-amber-200/90', hover: 'hover:bg-amber-100 hover:border-amber-400', iconBg: 'bg-amber-200/80 text-amber-900', text: 'text-amber-950' },
  'cat-interior-decoration': { bg: 'bg-indigo-100/60', border: 'border-indigo-200/90', hover: 'hover:bg-indigo-100 hover:border-indigo-400', iconBg: 'bg-indigo-200/80 text-indigo-900', text: 'text-indigo-950' },
  'cat-supply-logistics': { bg: 'bg-emerald-100/60', border: 'border-emerald-200/90', hover: 'hover:bg-emerald-100 hover:border-emerald-400', iconBg: 'bg-emerald-200/80 text-emerald-900', text: 'text-emerald-950' },
  'cat-machinery-equipment': { bg: 'bg-orange-100/60', border: 'border-orange-200/90', hover: 'hover:bg-orange-100 hover:border-orange-400', iconBg: 'bg-orange-200/80 text-orange-900', text: 'text-orange-950' },
  'cat-digital-support': { bg: 'bg-cyan-100/60', border: 'border-cyan-200/90', hover: 'hover:bg-cyan-100 hover:border-cyan-400', iconBg: 'bg-cyan-200/80 text-cyan-900', text: 'text-cyan-950' },
  'cat-professional-legal': { bg: 'bg-purple-100/60', border: 'border-purple-200/90', hover: 'hover:bg-purple-100 hover:border-purple-400', iconBg: 'bg-purple-200/80 text-purple-900', text: 'text-purple-950' },
  'cat-solar-green': { bg: 'bg-yellow-100/60', border: 'border-yellow-200/90', hover: 'hover:bg-yellow-100 hover:border-yellow-400', iconBg: 'bg-yellow-200/80 text-yellow-900', text: 'text-yellow-950' },
  'cat-waterproofing': { bg: 'bg-sky-100/60', border: 'border-sky-200/90', hover: 'hover:bg-sky-100 hover:border-sky-400', iconBg: 'bg-sky-200/80 text-sky-900', text: 'text-sky-950' },
  'cat-modular-kitchen': { bg: 'bg-rose-100/60', border: 'border-rose-200/90', hover: 'hover:bg-rose-100 hover:border-rose-400', iconBg: 'bg-rose-200/80 text-rose-900', text: 'text-rose-950' },
  'cat-smart-security': { bg: 'bg-violet-100/60', border: 'border-violet-200/90', hover: 'hover:bg-violet-100 hover:border-violet-400', iconBg: 'bg-violet-200/80 text-violet-900', text: 'text-violet-950' },
  'cat-windows-doors': { bg: 'bg-teal-100/60', border: 'border-teal-200/90', hover: 'hover:bg-teal-100 hover:border-teal-400', iconBg: 'bg-teal-200/80 text-teal-900', text: 'text-teal-950' },
  'cat-flooring-marble': { bg: 'bg-stone-200/50', border: 'border-stone-300/90', hover: 'hover:bg-stone-200 hover:border-stone-400', iconBg: 'bg-stone-300/80 text-stone-900', text: 'text-stone-950' },
  'cat-landscaping-garden': { bg: 'bg-lime-100/60', border: 'border-lime-200/90', hover: 'hover:bg-lime-100 hover:border-lime-400', iconBg: 'bg-lime-200/80 text-lime-900', text: 'text-lime-950' },
  'cat-demolition-earthwork': { bg: 'bg-amber-100/70', border: 'border-amber-300/90', hover: 'hover:bg-amber-200 hover:border-amber-500', iconBg: 'bg-amber-300/80 text-amber-950', text: 'text-amber-950' },
  'cat-borewell-water': { bg: 'bg-blue-100/60', border: 'border-blue-200/90', hover: 'hover:bg-blue-100 hover:border-blue-400', iconBg: 'bg-blue-200/80 text-blue-900', text: 'text-blue-950' },
  'cat-vastu-elevation': { bg: 'bg-fuchsia-100/60', border: 'border-fuchsia-200/90', hover: 'hover:bg-fuchsia-100 hover:border-fuchsia-400', iconBg: 'bg-fuchsia-200/80 text-fuchsia-900', text: 'text-fuchsia-950' },
};

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  categories,
  vendors,
  language,
  onSelectCategory,
  onSelectSubService,
  onSelectVendor,
  onViewAllCategories,
  onRequestQuoteForCategory,
}) => {
  const t = translations[language];

  // Mobile: First 7 items + 1 "All Verticals" item
  const mobileTop7 = categories.slice(0, 7);

  // Featured Smart Solutions (Turnkey Indian Home Packages)
  const smartSolutions = [
    {
      id: 'sol-modular-kitchen',
      title: language === 'hi' ? 'जर्मन ऐक्रेलिक मॉड्यूलर किचन' : 'German Modular Kitchen',
      subtitle: language === 'hi' ? 'हेफेले हार्डवेयर • 10-वर्षीय वारंटी' : 'Hafele / Blum Hardware • 10-Yr Warranty',
      price: 'Starts ₹1.45L',
      rating: 4.88,
      reviews: '1.4k',
      badge: 'Bestseller',
      badgeColor: 'bg-indigo-600 text-white',
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
      categoryIndex: 1, // Interior & Decoration
    },
    {
      id: 'sol-smart-locks',
      title: language === 'hi' ? 'स्मार्ट बायोमेट्रिक फिंगरप्रिंट लॉक' : 'Smart Biometric Locks',
      subtitle: language === 'hi' ? 'फिंगरप्रिंट • मोबाइल ऐप • बिना चाबी एंट्री' : 'Fingerprint • Mobile App • Keyless Access',
      price: 'Starts ₹9,500',
      rating: 4.92,
      reviews: '920',
      badge: 'New Launch',
      badgeColor: 'bg-blue-600 text-white',
      image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80',
      categoryIndex: 9, // Smart Security
    },
    {
      id: 'sol-rcc-turnkey',
      title: language === 'hi' ? 'टर्नकी आरसीसी विला निर्माण' : 'Turnkey RCC Construction',
      subtitle: language === 'hi' ? 'IS-456 भूकंप रोधी कोड्स • पक्का BOQ' : 'IS 456 Seismic Codes • Itemized BOQ',
      price: 'Starts ₹1,650/sq.ft',
      rating: 4.95,
      reviews: '2.8k',
      badge: 'IS 456 Certified',
      badgeColor: 'bg-emerald-700 text-white',
      image: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=600&q=80',
      categoryIndex: 0, // Construction & Repair
    },
    {
      id: 'sol-solar-plant',
      title: language === 'hi' ? 'रूफटॉप ऑन-ग्रिड सोलर प्लांट' : 'Rooftop Solar Plant (5kW)',
      subtitle: language === 'hi' ? '₹78,000 सरकारी सब्सिडी • 0 बिजली बिल' : 'Govt Subsidy Eligible • 0 Electric Bill',
      price: 'Starts ₹48,000/kW',
      rating: 4.94,
      reviews: '1.1k',
      badge: 'Subsidy Ready',
      badgeColor: 'bg-amber-600 text-white',
      image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=600&q=80',
      categoryIndex: 6, // Solar Energy
    },
  ];

  return (
    <section id="categories" className="py-8 sm:py-14 bg-[#FAFCFF] relative">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        
        {/* ================= SECTION HEADER ================= */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-5 sm:mb-8 gap-2">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-900 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1.5">
              <Flame className="w-3 h-3 text-blue-600" />
              <span>{language === 'hi' ? '16 निर्माण एवं आर्किटेक्चरल श्रेणियाँ' : '16 Construction & Architectural Verticals'}</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.popularCategories}
            </h2>
            <p className="hidden sm:block mt-1 text-xs sm:text-sm text-slate-500 max-w-xl">
              {language === 'hi' 
                ? 'किसी भी कैटेगरी पर टैप करें और रेट कार्ड, स्पेशलाइज्ड सर्विसेज और वेरिफाइड वेंडर्स देखें।'
                : 'Tap any category to open its dedicated page with rate cards, sub-services, and verified contractors.'}
            </p>
          </div>

          <button
            onClick={onViewAllCategories}
            className="self-start sm:self-auto text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group py-1 cursor-pointer"
          >
            <span>{language === 'hi' ? 'सभी 16 श्रेणियाँ देखें (60+ सेवाएँ)' : 'View All 16 Verticals (60+ Services)'}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* ================= MOBILE VIEW: 4x2 COMPACT ICON MATRIX ================= */}
        <div className="sm:hidden mb-8">
          <div className="grid grid-cols-4 gap-2">
            {mobileTop7.map((cat, idx) => {
              const IconComponent = iconMap[cat.iconName] || Building2;
              const isTrending = cat.trendingRank && cat.trendingRank <= 3;
              const title = getCategoryTitle(cat, language);
              const theme = CATEGORY_PASTEL_THEMES[cat.id] || {
                bg: 'bg-blue-50/80',
                border: 'border-blue-200',
                hover: 'hover:bg-blue-100',
                iconBg: 'bg-blue-100 text-blue-800',
                text: 'text-blue-950',
              };

              return (
                <div
                  key={cat.id}
                  onClick={() => onSelectCategory(cat)}
                  className={`relative p-2.5 rounded-2xl ${theme.bg} border ${theme.border} shadow-xs active:scale-95 transition-all text-center flex flex-col items-center justify-between min-h-[105px] cursor-pointer`}
                >
                  {/* Optional pill badge */}
                  {isTrending && (
                    <span className="absolute -top-1.5 px-1.5 py-0.2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[8px] font-black uppercase tracking-wider shadow-xs">
                      Hot
                    </span>
                  )}
                  {idx === 0 && (
                    <span className="absolute -top-1.5 px-1.5 py-0.2 rounded-full bg-blue-600 text-white text-[8px] font-black uppercase tracking-wider shadow-xs">
                      Top
                    </span>
                  )}

                  {/* Clean squircle icon container centered */}
                  <div className={`w-11 h-11 rounded-2xl ${theme.iconBg} mx-auto flex items-center justify-center my-0.5 border border-white/60 shadow-xs shrink-0`}>
                    <IconComponent className="w-5 h-5" />
                  </div>

                  {/* Clean Compact Title Centered */}
                  <div className={`text-[10px] font-bold ${theme.text} line-clamp-2 leading-tight text-center w-full px-0.5`}>
                    {title}
                  </div>
                </div>
              );
            })}

            {/* 8th item: "All 16 Services" Tile */}
            <div
              onClick={onViewAllCategories}
              className="p-2 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 shadow-xs active:scale-95 transition-all text-center flex flex-col items-center justify-center min-h-[96px] cursor-pointer"
            >
              <div className="w-10 h-10 rounded-2xl bg-white text-blue-600 flex items-center justify-center mb-1 border border-blue-200/80 shadow-xs shrink-0">
                <Grid className="w-5 h-5" />
              </div>
              <div className="text-[10px] font-extrabold text-blue-700 leading-tight">
                {language === 'hi' ? 'सभी 16 श्रेणियाँ' : 'All 16 Verticals'}
              </div>
            </div>
          </div>
        </div>

        {/* ================= DESKTOP & TABLET VIEW: SLEEK SQUARE CARDS (4 COLUMNS x 4 ROWS) ================= */}
        <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
          {categories.map((cat) => {
            const IconComponent = iconMap[cat.iconName] || Building2;
            const isTrending = cat.trendingRank && cat.trendingRank <= 3;
            const title = getCategoryTitle(cat, language);
            const desc = getCategoryDesc(cat, language);
            const theme = CATEGORY_PASTEL_THEMES[cat.id] || {
              bg: 'bg-blue-50/80',
              border: 'border-blue-200',
              hover: 'hover:bg-blue-100/70 hover:border-blue-400',
              iconBg: 'bg-blue-100 text-blue-800',
              text: 'text-blue-950',
            };

            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat)}
                className={`group relative cursor-pointer rounded-2xl p-5 border ${theme.border} ${theme.bg} ${theme.hover} hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col items-center justify-between text-center min-h-[240px]`}
              >
                {/* Top subtle bar */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

                {/* Top Corner Trending Badge */}
                {isTrending && (
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300 shadow-xs">
                      ★ Top {cat.trendingRank}
                    </span>
                  </div>
                )}

                {/* Top Center Symbol/Icon */}
                <div className={`w-14 h-14 rounded-2xl ${theme.iconBg} mx-auto flex items-center justify-center border border-white/80 shadow-xs group-hover:scale-110 transition-transform mt-1 mb-2 shrink-0`}>
                  <IconComponent className="w-7 h-7" />
                </div>

                {/* Center-aligned Title & Description */}
                <div className="w-full flex-1 flex flex-col items-center justify-center px-1 my-1">
                  <h3 className={`text-sm sm:text-[15px] font-extrabold ${theme.text} group-hover:text-blue-700 transition-colors leading-snug text-center line-clamp-2`}>
                    {title}
                  </h3>
                  <p className="text-[11px] text-slate-600 font-medium leading-relaxed mt-1 text-center line-clamp-2 max-w-[95%]">
                    {desc}
                  </p>
                </div>

                {/* Bottom Center-aligned Bar */}
                <div className="w-full pt-2.5 border-t border-black/5 flex items-center justify-between text-[11px] mt-auto">
                  <span className="text-[10px] font-bold text-slate-500 px-2 py-0.5 rounded-full bg-white/70 border border-slate-200/60">
                    {cat.subServicesCount || cat.subServices.length} {language === 'hi' ? 'सेवाएँ' : 'Services'}
                  </span>
                  <span className="font-extrabold text-blue-700 flex items-center gap-0.5 group-hover:underline">
                    <span>{language === 'hi' ? 'एक्सप्लोर करें' : 'Explore'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ================= SPOTLIGHT / KONTRACTOR SMART SOLUTIONS ================= */}
        <div className="mt-4 pt-6 border-t border-slate-200/80">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-xs shadow-xs">
                K
              </span>
              <div>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                  {language === 'hi' ? 'कॉन्ट्रैक्टर स्मार्ट सोल्यूशन्स' : 'Kontractor Smart Solutions'}
                </h3>
                <p className="text-[10px] sm:text-xs text-slate-500">
                  {language === 'hi' ? 'पारदर्शी प्रति-इकाई दरों के साथ टर्नकी बंडल पैकेज।' : 'Turnkey bundled packages with transparent per-unit pricing.'}
                </p>
              </div>
            </div>

            <button
              onClick={onViewAllCategories}
              className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
            >
              {language === 'hi' ? 'सभी देखें' : 'See all'}
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {smartSolutions.map((sol) => {
              const targetCategory = categories[sol.categoryIndex] || categories[0];

              return (
                <div
                  key={sol.id}
                  onClick={() => onSelectCategory(targetCategory)}
                  className="group cursor-pointer rounded-2xl bg-gradient-to-b from-slate-50 via-white to-blue-50/40 border border-slate-200 hover:border-blue-400 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
                >
                  <div className="relative h-28 sm:h-36 overflow-hidden bg-slate-100">
                    <img
                      src={sol.image}
                      alt={sol.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Badge */}
                    <span className={`absolute top-2 left-2 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider ${sol.badgeColor} shadow-xs`}>
                      {sol.badge}
                    </span>

                    {/* Rating Pill */}
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-white/95 backdrop-blur-sm text-slate-900 text-[10px] font-black shadow-md flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{sol.rating}</span>
                      <span className="text-slate-400 font-normal">({sol.reviews})</span>
                    </div>
                  </div>

                  <div className="p-3 space-y-1">
                    <h4 className="text-xs font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight line-clamp-1">
                      {sol.title}
                    </h4>
                    <p className="text-[10px] text-slate-500 line-clamp-1 leading-snug">
                      {sol.subtitle}
                    </p>
                    <div className="pt-1 text-xs font-black text-slate-900">
                      {sol.price}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

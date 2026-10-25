import React, { useState } from 'react';
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
  ArrowLeft,
  ChevronRight,
  Search,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { ServiceCategory, Language } from '../types';
import { getCategoryTitle, getCategoryDesc } from '../utils/i18nHelper';

interface AllCategoriesPageProps {
  categories: ServiceCategory[];
  language: Language;
  onBackToHome: () => void;
  onSelectCategory: (category: ServiceCategory) => void;
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

export const AllCategoriesPage: React.FC<AllCategoriesPageProps> = ({
  categories,
  language,
  onBackToHome,
  onSelectCategory,
}) => {
  const [filterQuery, setFilterQuery] = useState('');

  const filteredCategories = categories.filter((c) => {
    if (!filterQuery.trim()) return true;
    const q = filterQuery.toLowerCase();
    const title = getCategoryTitle(c, language).toLowerCase();
    const desc = getCategoryDesc(c, language).toLowerCase();
    return (
      title.includes(q) ||
      desc.includes(q) ||
      c.name.toLowerCase().includes(q) ||
      c.subServices.some((s) => s.name.toLowerCase().includes(q) || (s.nameHi && s.nameHi.toLowerCase().includes(q)))
    );
  });

  return (
    <div className="min-h-screen bg-[#FAFCFF] pb-24 animate-fadeIn">
      {/* Top Header */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-blue-600" />
            <span>{language === 'hi' ? 'होम पर वापस' : 'Back to Home'}</span>
          </button>

          <h1 className="text-sm font-extrabold text-slate-900 truncate">
            {language === 'hi' ? 'सभी 16 निर्माण श्रेणियाँ' : 'All 16 Construction Verticals'}
          </h1>

          <div className="text-xs font-bold text-blue-600 hidden sm:block">
            {categories.reduce((acc, c) => acc + (c.subServicesCount || c.subServices.length), 0)}+ {language === 'hi' ? 'विशेषज्ञ सेवाएँ' : 'Specialized Services'}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* Banner with Filter Search */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-600 text-white shadow-md space-y-3">
          <h2 className="text-xl sm:text-2xl font-extrabold">
            {language === 'hi' 
              ? 'सभी निर्माण एवं आर्किटेक्चरल सेवाएँ एक्सप्लोर करें' 
              : 'Explore All Construction & Architectural Verticals'}
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 max-w-2xl font-medium">
            {language === 'hi'
              ? 'पारदर्शी रेट कार्ड्स, क्रेडेंशियल-वेरिफाइड कॉन्ट्रैक्टर्स और IS-456 निर्माण गुणवत्ता मानक।'
              : 'Standardized rate cards, credential-checked contractor partners, and IS-456 quality specifications.'}
          </p>

          <div className="relative max-w-md pt-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 translate-y-[-2px]" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder={language === 'hi' ? 'श्रेणी या सेवा खोजें (उदा. मिस्त्री, सोलर, पेंटर)...' : 'Search category or sub-service name...'}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white text-slate-900 text-xs font-semibold placeholder-slate-400 focus:outline-none shadow-sm"
            />
          </div>
        </div>

        {/* Categories Grid (Mobile: 4-col compact; Desktop: 4-col compact square) */}
        <div>
          <div className="text-xs font-bold text-slate-500 mb-3">
            {language === 'hi' ? `प्रदर्शित ${filteredCategories.length} श्रेणियाँ:` : `Showing ${filteredCategories.length} Categories:`}
          </div>

          {/* Desktop & Tablet: Compact Square Grid (4 Columns x 4 Rows = 16) */}
          <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredCategories.map((cat) => {
              const IconComponent = iconMap[cat.iconName] || Building2;
              const title = getCategoryTitle(cat, language);
              const desc = getCategoryDesc(cat, language);

              const theme = CATEGORY_PASTEL_THEMES[cat.id] || {
                bg: 'bg-blue-50/80',
                border: 'border-blue-200',
                hover: 'hover:bg-blue-100 hover:border-blue-400',
                iconBg: 'bg-blue-100 text-blue-800',
                text: 'text-blue-950',
              };

              return (
                <div
                  key={cat.id}
                  onClick={() => onSelectCategory(cat)}
                  className={`group relative cursor-pointer p-5 rounded-2xl ${theme.bg} border ${theme.border} ${theme.hover} hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col items-center justify-between text-center min-h-[240px]`}
                >
                  {/* Top subtle bar */}
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

                  {/* Top Center Symbol/Icon */}
                  <div className={`w-14 h-14 rounded-2xl ${theme.iconBg} mx-auto flex items-center justify-center border border-white/80 shadow-xs group-hover:scale-110 transition-transform mt-1 mb-2 shrink-0`}>
                    <IconComponent className="w-7 h-7" />
                  </div>

                  {/* Centered Title & Description */}
                  <div className="w-full flex-1 flex flex-col items-center justify-center px-1 my-1">
                    <h3 className={`text-sm sm:text-[15px] font-extrabold ${theme.text} group-hover:text-blue-700 transition-colors leading-snug text-center line-clamp-2`}>
                      {title}
                    </h3>
                    <p className="text-[11px] text-slate-600 font-medium leading-relaxed mt-1 text-center line-clamp-2 max-w-[95%]">
                      {desc}
                    </p>
                  </div>

                  {/* Bottom Center Bar */}
                  <div className="w-full pt-2.5 border-t border-black/5 flex items-center justify-between text-[11px] mt-auto">
                    <span className="text-[10px] font-bold text-slate-500 px-2 py-0.5 rounded-full bg-white/70 border border-slate-200/60">
                      {cat.subServicesCount || cat.subServices.length} {language === 'hi' ? 'सेवाएँ' : 'Services'}
                    </span>
                    <span className="font-extrabold text-blue-700 flex items-center gap-0.5 group-hover:underline">
                      <span>{language === 'hi' ? 'देखें' : 'Explore'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Phone (< 640px): 4-Column Compact Matrix */}
          <div className="grid grid-cols-4 gap-2 sm:hidden">
            {filteredCategories.map((cat) => {
              const IconComponent = iconMap[cat.iconName] || Building2;
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
                  className={`p-2.5 rounded-2xl ${theme.bg} border ${theme.border} active:scale-95 transition-all text-center flex flex-col items-center justify-between min-h-[105px] shadow-xs cursor-pointer`}
                >
                  <div className={`w-11 h-11 rounded-2xl ${theme.iconBg} mx-auto flex items-center justify-center my-0.5 border border-white/60 shadow-xs shrink-0`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className={`text-[10px] font-bold ${theme.text} line-clamp-2 leading-tight text-center w-full px-0.5`}>
                    {title}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

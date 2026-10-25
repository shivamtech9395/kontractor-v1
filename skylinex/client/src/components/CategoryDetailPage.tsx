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
  ArrowLeft,
  ChevronRight,
  Star,
  MapPin,
  Phone,
  MessageCircle,
  CheckCircle2,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { ServiceCategory, Vendor, SubServiceSpec, Language } from '../types';
import { translations } from '../i18n/translations';
import { 
  getCategoryTitle, 
  getCategoryDesc, 
  getSubServiceName, 
  getSubServiceSpecs 
} from '../utils/i18nHelper';

interface CategoryDetailPageProps {
  category: ServiceCategory;
  vendors: Vendor[];
  language: Language;
  onBackToHome: () => void;
  onSelectSubService: (subService: SubServiceSpec) => void;
  onSelectVendor: (vendor: Vendor) => void;
  onRequestQuote: (serviceOrCategoryName: string) => void;
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

export const CategoryDetailPage: React.FC<CategoryDetailPageProps> = ({
  category,
  vendors,
  language,
  onBackToHome,
  onSelectSubService,
  onSelectVendor,
  onRequestQuote,
}) => {
  const t = translations[language];
  const IconComponent = iconMap[category.iconName] || Building2;

  const localizedTitle = getCategoryTitle(category, language);
  const localizedDesc = getCategoryDesc(category, language);

  // Filter vendors matching this category
  const matchingVendors = vendors.filter(
    (v) => v.approved && (v.category === category.id || v.servicesOffered.some(s => s.toLowerCase().includes(category.name.toLowerCase())))
  );

  return (
    <div className={`min-h-screen ${category.colorTheme.bgLight} transition-colors duration-500 pb-24 animate-fadeIn`}>
      {/* Sticky Top Header with Back Navigation */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 py-3 sm:px-6 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-blue-600" />
            <span>{language === 'hi' ? 'होमपेज पर वापस' : language === 'hinglish' ? 'Home par wapas' : 'Back to Home'}</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span className="hidden sm:inline">Kontractor</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
            <span className="text-slate-900 font-extrabold truncate max-w-[200px]">
              {localizedTitle}
            </span>
          </div>

          <button
            onClick={() => onRequestQuote(localizedTitle)}
            className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>{language === 'hi' ? 'कोटेशन प्राप्त करें' : 'Get Quote'}</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-8">
        
        {/* Category Hero Banner with Auto-Tuned Soft Pastel Palette */}
        <div className={`p-6 sm:p-8 rounded-3xl border ${category.colorTheme.border} bg-white/80 backdrop-blur-sm shadow-sm relative overflow-hidden`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/95 text-slate-800 border border-slate-200 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                <span>{category.subServices.length} {language === 'hi' ? 'मानकीकृत विशेषज्ञ सेवाएँ' : 'Standardized Specializations'}</span>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-2xl bg-white text-blue-600 flex items-center justify-center border border-slate-200 shadow-md shrink-0">
                  <IconComponent className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {localizedTitle}
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
                    {language === 'hi' ? 'सत्यापित PWD / ISO / IS-456 गुणवत्ता मानक' : 'Verified PWD / ISO / IS-456 compliant execution'}
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-700 max-w-2xl leading-relaxed">
                {localizedDesc}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
              <div className="p-3 bg-white/90 rounded-2xl border border-slate-200 text-center shadow-xs">
                <div className="text-[11px] text-slate-500 font-medium">{language === 'hi' ? 'सत्यापित पार्टनर' : 'Verified Partners'}</div>
                <div className="text-lg font-black text-blue-600">{matchingVendors.length} Contractors</div>
              </div>
              <div className="p-3 bg-white/90 rounded-2xl border border-slate-200 text-center shadow-xs">
                <div className="text-[11px] text-slate-500 font-medium">{language === 'hi' ? 'संतुष्टि रेटिंग' : 'Customer Rating'}</div>
                <div className="text-lg font-black text-amber-500">★ 4.9 / 5.0</div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 1: SPECIALIZED SUB-SERVICES (Clickable to dedicated service page) */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                {language === 'hi' ? 'विशेषज्ञ सेवाएँ एवं मानक दर सूची' : 'Specialized Sub-Services & Rate Cards'}
              </h2>
              <p className="text-xs text-slate-500">
                {language === 'hi' ? 'विस्तृत तकनीकी स्पेसिफिकेशन व ठेकेदार देखने हेतु किसी भी सेवा पर क्लिक करें।' : 'Click any service to view full technical deliverables and specialized contractors.'}
              </p>
            </div>
            <span className="text-xs font-bold text-slate-500">
              {category.subServices.length} {language === 'hi' ? 'सेवाएँ उपलब्ध' : 'Services Available'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.subServices.map((sub) => {
              const subName = getSubServiceName(sub, language);
              const subSpecs = getSubServiceSpecs(sub, language);

              return (
                <div
                  key={sub.id}
                  onClick={() => onSelectSubService(sub)}
                  className="group cursor-pointer p-4 rounded-2xl bg-white/95 border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold border border-blue-100">
                        Per {sub.unit.toUpperCase()}
                      </span>
                      <div className="w-6 h-6 rounded-full bg-slate-50 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-colors">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                      {subName}
                    </h3>

                    <div className="mt-2 text-xs font-extrabold text-blue-600 bg-blue-50/60 p-2 rounded-xl border border-blue-100/60">
                      Rate: {sub.avgRate}
                    </div>

                    <p className="mt-2 text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                      {subSpecs}
                    </p>

                    {/* Deliverables snippet */}
                    <div className="mt-3 space-y-1">
                      {sub.deliverables.slice(0, 2).map((del, dIdx) => (
                        <div key={dIdx} className="flex items-center gap-1.5 text-[10px] text-slate-500">
                          <CheckCircle2 className="w-3 h-3 text-teal-600 shrink-0" />
                          <span className="truncate">{del}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 font-medium">Standardized BOQ</span>
                    <span className="font-bold text-blue-600 flex items-center gap-0.5">
                      <span>{language === 'hi' ? 'विवरण देखें' : 'View Details'}</span>
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 2: VERIFIED CONTRACTORS FOR THIS CATEGORY */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                {language === 'hi' ? 'सत्यापित कॉन्ट्रैक्टर्स एवं विशेषज्ञ' : 'Verified Contractors & Specialists'}
              </h2>
              <p className="text-xs text-slate-500">
                {language === 'hi' ? `${localizedTitle} हेतु अधिकृत एवं प्रशिक्षित प्रोफेशनल्स` : `Credential-verified professionals available for ${localizedTitle}.`}
              </p>
            </div>
            <span className="text-xs font-bold text-blue-600">
              {matchingVendors.length} Verified Partners
            </span>
          </div>

          {matchingVendors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {matchingVendors.map((vendor) => {
                const whatsappMsg = `Hi ${vendor.ownerName}, I saw your profile for ${localizedTitle} on Kontractor. I would like to get a quote.`;

                return (
                  <div
                    key={vendor._id}
                    className="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Header */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={vendor.avatar || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80'}
                            alt={vendor.businessName}
                            className="w-12 h-12 rounded-xl object-cover border border-slate-200 shadow-xs"
                          />
                          <div>
                            <h3 
                              onClick={() => onSelectVendor(vendor)}
                              className="text-sm font-extrabold text-slate-900 hover:text-blue-600 cursor-pointer transition-colors leading-snug line-clamp-1"
                            >
                              {vendor.businessName}
                            </h3>
                            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                              <span>{vendor.ownerName}</span>
                              <span>•</span>
                              <span className="flex items-center gap-0.5 font-semibold text-slate-600">
                                <MapPin className="w-3 h-3 text-blue-600" />
                                {vendor.city}
                              </span>
                            </div>
                          </div>
                        </div>

                        {vendor.kycVerified && (
                          <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-black border border-blue-200">
                            ✓ KYC Pro
                          </span>
                        )}
                      </div>

                      {/* Metrics bar */}
                      <div className="grid grid-cols-3 gap-1.5 p-2 rounded-xl bg-slate-50 border border-slate-100 text-center text-xs mb-3">
                        <div>
                          <div className="text-[10px] text-slate-400">Exp</div>
                          <div className="font-extrabold text-slate-800">{vendor.experience}+ Yrs</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-slate-400">Projects</div>
                          <div className="font-extrabold text-slate-800">{vendor.jobs}</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-slate-400">Rating</div>
                          <div className="font-extrabold text-amber-500">★ {vendor.rating.toFixed(1)}</div>
                        </div>
                      </div>

                      {/* Starting Rate Row */}
                      <div className="flex items-center justify-between text-xs pt-1">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Starting Rate:</span>
                        <span className="text-xs font-black text-blue-600">{vendor.price}</span>
                      </div>
                    </div>

                    {/* Action buttons: Soft Eye-Friendly Colors */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                      <button
                        onClick={() => onSelectVendor(vendor)}
                        className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-800 hover:text-blue-700 border border-slate-200 text-xs font-bold transition-colors text-center cursor-pointer"
                      >
                        {language === 'hi' ? 'प्रोफाइल देखें' : 'View Profile'}
                      </button>

                      <a
                        href={`https://wa.me/${vendor.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappMsg)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors cursor-pointer"
                        title="Chat on WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>

                      <a
                        href={`tel:${vendor.phone}`}
                        className="p-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 transition-colors cursor-pointer"
                        title="Call Contractor"
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-8 rounded-3xl bg-white/90 border border-slate-200 text-center text-slate-500 space-y-2">
              <Building2 className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold">No direct contractors listed in this category yet.</p>
              <button
                onClick={() => onRequestQuote(localizedTitle)}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-xs hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Request Verified Contractor Quotes
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ChevronRight, 
  CheckCircle2, 
  Star, 
  MapPin, 
  Phone, 
  MessageCircle, 
  Sparkles, 
  Calculator,
  ShieldCheck,
  FileCheck,
  Clock,
  Layers
} from 'lucide-react';
import { SubServiceSpec, ServiceCategory, Vendor, Language } from '../types';
import { translations } from '../i18n/translations';
import { getSubServiceName, getSubServiceSpecs, getCategoryTitle } from '../utils/i18nHelper';

interface ServiceDetailPageProps {
  subService: SubServiceSpec;
  parentCategory?: ServiceCategory;
  vendors: Vendor[];
  language: Language;
  onBack: () => void;
  onSelectVendor: (vendor: Vendor) => void;
  onRequestQuote: (serviceName: string, calculatedBudget?: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  subService,
  parentCategory,
  vendors,
  language,
  onBack,
  onSelectVendor,
  onRequestQuote,
}) => {
  const t = translations[language];

  const localizedServiceName = getSubServiceName(subService, language);
  const localizedServiceSpecs = getSubServiceSpecs(subService, language);
  const localizedCategoryName = parentCategory ? getCategoryTitle(parentCategory, language) : '';

  // Quick Area Estimator state
  const [calcQuantity, setCalcQuantity] = useState<number>(1000);

  // Parse numerical rate for calculator
  const rateNumbers = subService.avgRate.match(/[\d,]+/g);
  const baseRateMin = rateNumbers && rateNumbers[0] ? parseInt(rateNumbers[0].replace(/,/g, ''), 10) : 1200;
  const baseRateMax = rateNumbers && rateNumbers[1] ? parseInt(rateNumbers[1].replace(/,/g, ''), 10) : baseRateMin * 1.5;

  const estimatedMin = calcQuantity * baseRateMin;
  const estimatedMax = calcQuantity * baseRateMax;

  // Filter vendors specializing in this sub-service
  const matchingVendors = vendors.filter(
    (v) =>
      v.approved &&
      (v.servicesOffered.some((s) => s.toLowerCase().includes(subService.name.toLowerCase())) ||
        (v.subServices && v.subServices.some((s) => s.toLowerCase().includes(subService.name.toLowerCase()))) ||
        (parentCategory && v.category === parentCategory.id))
  );

  const containerBgClass = parentCategory?.colorTheme.bgLight || 'bg-blue-50/40';

  return (
    <div className={`min-h-screen ${containerBgClass} transition-colors duration-500 pb-24 animate-fadeIn`}>
      {/* Top Sticky Header */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 py-3 sm:px-6 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-blue-600" />
            <span>{parentCategory ? `${localizedCategoryName}` : (language === 'hi' ? 'वापस' : 'Back')}</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            {parentCategory && (
              <>
                <span className="hidden sm:inline">{localizedCategoryName}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
              </>
            )}
            <span className="text-slate-900 font-extrabold truncate max-w-[220px]">
              {localizedServiceName}
            </span>
          </div>

          <button
            onClick={() => onRequestQuote(localizedServiceName, `₹${(estimatedMin / 100000).toFixed(1)}L - ₹${(estimatedMax / 100000).toFixed(1)}L`)}
            className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>{language === 'hi' ? 'सेवा बुक करें' : 'Book Service'}</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-8">
        
        {/* Service Hero Banner with Subtle Pastel Container */}
        <div className="p-6 sm:p-8 rounded-3xl border border-slate-200/80 bg-white/90 backdrop-blur-sm shadow-sm relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                {parentCategory && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200">
                    {localizedCategoryName}
                  </span>
                )}
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-teal-50 text-teal-800 border border-teal-200">
                  Standardized Rate: {subService.avgRate}
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
                  Unit: {subService.unit.toUpperCase()}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {localizedServiceName}
              </h1>

              <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
                {localizedServiceSpecs}
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-600 font-semibold">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>IS-456 Structural Compliant</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-teal-600" />
                  <span>Standardized Itemized BOQ</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-indigo-600" />
                  <span>Turnkey Milestone Delivery</span>
                </span>
              </div>
            </div>

            {/* Quick Estimator Mini Box */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-md shrink-0 w-full lg:w-80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Calculator className="w-4 h-4 text-blue-600" />
                  <span>Live Cost Calculator</span>
                </span>
                <span className="text-[10px] text-slate-400">IS 456 Rates</span>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500">
                  Estimated Quantity ({subService.unit}):
                </label>
                <input
                  type="number"
                  value={calcQuantity}
                  onChange={(e) => setCalcQuantity(Math.max(1, Number(e.target.value)))}
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm font-extrabold text-slate-800 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="p-3 rounded-xl bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-100 space-y-1">
                <div className="text-[10px] text-slate-500 font-semibold">Estimated Budget Range:</div>
                <div className="text-base font-black text-blue-700">
                  ₹{estimatedMin.toLocaleString('en-IN')} - ₹{estimatedMax.toLocaleString('en-IN')}
                </div>
              </div>

              <button
                onClick={() => onRequestQuote(localizedServiceName, `₹${estimatedMin.toLocaleString('en-IN')} - ₹${estimatedMax.toLocaleString('en-IN')}`)}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                Request Free Site Measurement
              </button>
            </div>
          </div>
        </div>

        {/* Deliverables Breakdown Checklist */}
        <div className="p-6 rounded-3xl bg-white/95 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-600" />
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
              {language === 'hi' ? 'मानकीकृत डिलिवरेबल्स एवं कार्य क्षेत्र' : 'Standardized Deliverables & Scope of Work'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {subService.deliverables.map((del, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/60 flex items-start gap-2.5"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-slate-800">{del}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Quality inspected and certified milestone</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Verified Contractors Offering this Service */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                {language === 'hi' ? `${localizedServiceName} में विशेषज्ञ ठेकेदार` : `Verified Contractors Specializing in ${localizedServiceName}`}
              </h2>
              <p className="text-xs text-slate-500">
                Direct contact, zero middleman markup, and verified past project portfolios.
              </p>
            </div>
            <span className="text-xs font-bold text-blue-600">
              {matchingVendors.length} Verified Partners
            </span>
          </div>

          {matchingVendors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {matchingVendors.map((vendor) => {
                const whatsappMsg = `Hi ${vendor.ownerName}, I saw your profile for ${localizedServiceName} on Kontractor. I would like to get an estimate.`;

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
              <Sparkles className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold">Ready to dispatch enquiry to our verified network.</p>
              <button
                onClick={() => onRequestQuote(localizedServiceName)}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-xs hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Get Quotes for this Service
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

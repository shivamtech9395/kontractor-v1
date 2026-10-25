import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Star, 
  Phone, 
  MessageCircle, 
  ShieldCheck, 
  Award, 
  Briefcase, 
  Clock, 
  CheckCircle2, 
  Image as ImageIcon,
  Sparkles,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { Vendor, Language } from '../types';
import { translations } from '../i18n/translations';

interface VendorDetailPageProps {
  vendor: Vendor;
  language: Language;
  onBack: () => void;
  onSubmitQuote: (quoteData: any) => void;
}

export const VendorDetailPage: React.FC<VendorDetailPageProps> = ({
  vendor,
  language,
  onBack,
  onSubmitQuote,
}) => {
  const t = translations[language];

  const [activeTab, setActiveTab] = useState<'overview' | 'gallery' | 'reviews'>('overview');
  const [sliderPos, setSliderPos] = useState<number>(50);

  // Quote form state
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [plotArea, setPlotArea] = useState('2400 sq.ft');
  const [budget, setBudget] = useState('₹50 Lakhs - ₹1 Cr');
  const [selectedService, setSelectedService] = useState(vendor.servicesOffered[0] || 'Turnkey Construction');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const whatsappMsg = `Hi ${vendor.ownerName}, I found your verified profile on Kontractor. I would like to consult with you for my project in ${vendor.city}.`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone) return;

    onSubmitQuote({
      customerName: clientName,
      customerPhone: clientPhone,
      customerEmail: clientEmail,
      city: vendor.city,
      serviceRequired: selectedService,
      plotArea,
      budget,
      message,
      contractorId: vendor._id,
      contractorName: vendor.businessName,
    });

    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FAFCFF] pb-24 animate-fadeIn">
      {/* Top Header */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all shadow-xs"
          >
            <ArrowLeft className="w-4 h-4 text-blue-600" />
            <span>Back</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span className="hidden sm:inline">Contractor Profile</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
            <span className="text-slate-900 font-extrabold truncate max-w-[200px]">
              {vendor.businessName}
            </span>
          </div>

          <a
            href={`https://wa.me/${vendor.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappMsg)}`}
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        
        {/* Contractor Profile Hero Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-luxury">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-4">
              <div className="relative">
                <img
                  src={vendor.avatar || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80'}
                  alt={vendor.businessName}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-100 shadow-md"
                />
                {vendor.kycVerified && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-black shadow-md border-2 border-white">
                    ✓
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    {vendor.businessName}
                  </h1>
                  {vendor.kycVerified ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-black border border-blue-200">
                      ✓ Level 2 KYC Verified Pro
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">
                      • Registered Partner
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-500 font-medium flex items-center gap-2">
                  <span>Founder: {vendor.ownerName}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-semibold text-slate-700">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                    {vendor.city}
                  </span>
                </p>

                <div className="flex items-center gap-3 pt-1 text-xs">
                  <div className="flex items-center gap-1 font-bold text-amber-500">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>{vendor.rating.toFixed(1)}</span>
                    <span className="text-slate-400 font-normal">({vendor.reviewCount} Reviews)</span>
                  </div>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-500 font-semibold">{vendor.experience}+ Years in Construction</span>
                </div>
              </div>
            </div>

            {/* Quick Contact Buttons */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <a
                href={`tel:${vendor.phone}`}
                className="flex-1 sm:flex-none py-2.5 px-4 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200 transition-colors flex items-center justify-center gap-1.5"
              >
                <Phone className="w-4 h-4" />
                <span>Call {vendor.phone}</span>
              </a>

              <a
                href={`https://wa.me/${vendor.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappMsg)}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 sm:flex-none py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Key Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-100">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <div className="text-[10px] text-slate-400 font-medium">Experience</div>
              <div className="text-sm font-extrabold text-slate-900 mt-0.5">{vendor.experience}+ Years</div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <div className="text-[10px] text-slate-400 font-medium">Projects Delivered</div>
              <div className="text-sm font-extrabold text-slate-900 mt-0.5">{vendor.jobs} Turnkey Sites</div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <div className="text-[10px] text-slate-400 font-medium">Standard Pricing</div>
              <div className="text-sm font-extrabold text-blue-600 mt-0.5">{vendor.price}</div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <div className="text-[10px] text-slate-400 font-medium">Response Time</div>
              <div className="text-sm font-extrabold text-teal-600 mt-0.5">&lt; 15 Mins</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200">
          {[
            { id: 'overview', label: 'Overview & Services' },
            { id: 'gallery', label: `Site Portfolio (${vendor.portfolioGallery?.length || 0})` },
            { id: 'reviews', label: `Reviews (${vendor.reviewCount})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2.5 px-4 text-xs font-bold border-b-2 transition-all ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW & SERVICES */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* About Section */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3">
              <h2 className="text-base font-extrabold text-slate-900">About the Firm</h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {vendor.about}
              </p>
            </div>

            {/* Services Offered */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3">
              <h2 className="text-base font-extrabold text-slate-900">Services Offered</h2>
              <div className="flex flex-wrap gap-2">
                {vendor.servicesOffered.map((s, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100 flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>{s}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Quote Request Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
              <div className="max-w-xl mx-auto space-y-4">
                <div className="text-center space-y-1">
                  <h3 className="text-lg font-extrabold text-slate-900">
                    Request Direct Quotation from {vendor.businessName}
                  </h3>
                  <p className="text-xs text-slate-600">
                    Get an itemized BOQ estimate and schedule a free site inspection.
                  </p>
                </div>

                {submitted ? (
                  <div className="p-6 rounded-2xl bg-white border border-emerald-200 text-center space-y-2">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                    <h4 className="text-sm font-extrabold text-slate-900">Quote Enquiry Dispatched!</h4>
                    <p className="text-xs text-slate-500">
                      {vendor.ownerName} has been notified and will reach out to you within 15 minutes.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-slate-700">Your Full Name:</label>
                        <input
                          type="text"
                          required
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full mt-1 px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-700">Phone Number:</label>
                        <input
                          type="tel"
                          required
                          value={clientPhone}
                          onChange={(e) => setClientPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full mt-1 px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-slate-700">Select Service:</label>
                        <select
                          value={selectedService}
                          onChange={(e) => setSelectedService(e.target.value)}
                          className="w-full mt-1 px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none focus:border-blue-500"
                        >
                          {vendor.servicesOffered.map((s, idx) => (
                            <option key={idx} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-700">Plot / Built-up Area:</label>
                        <input
                          type="text"
                          value={plotArea}
                          onChange={(e) => setPlotArea(e.target.value)}
                          className="w-full mt-1 px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-4 h-4 text-yellow-300" />
                      <span>Send Enquiry to {vendor.ownerName}</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PORTFOLIO GALLERY */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            {vendor.portfolioGallery && vendor.portfolioGallery.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {vendor.portfolioGallery.map((proj, pIdx) => (
                  <div key={pIdx} className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-xs space-y-3">
                    {/* Before & After Interactive Comparison if available */}
                    {proj.beforeImage && proj.afterImage ? (
                      <div className="relative h-56 bg-slate-100 select-none overflow-hidden group">
                        <img
                          src={proj.afterImage}
                          alt={`${proj.title} Final`}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div
                          className="absolute inset-y-0 left-0 overflow-hidden"
                          style={{ width: `${sliderPos}%` }}
                        >
                          <img
                            src={proj.beforeImage}
                            alt={`${proj.title} Before`}
                            className="absolute inset-0 w-full h-full object-cover max-w-none"
                            style={{ width: '100%' }}
                          />
                        </div>
                        {/* Split line */}
                        <div
                          className="absolute inset-y-0 w-0.5 bg-white shadow-lg pointer-events-none"
                          style={{ left: `${sliderPos}%` }}
                        >
                          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center shadow-md">
                            ⇄
                          </div>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={sliderPos}
                          onChange={(e) => setSliderPos(Number(e.target.value))}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
                        />
                        <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 text-white text-[9px] font-bold">
                          Starting Phase
                        </div>
                        <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-blue-600/90 text-white text-[9px] font-bold">
                          Delivered Work
                        </div>
                      </div>
                    ) : (
                      <img
                        src={proj.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80'}
                        alt={proj.title}
                        className="w-full h-56 object-cover"
                      />
                    )}

                    <div className="p-4 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <h4 className="font-extrabold text-slate-900">{proj.title}</h4>
                        <span className="font-extrabold text-blue-600">{proj.cost}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <span>{proj.location}</span>
                        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                          {proj.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 rounded-3xl bg-white border border-slate-200 text-center text-slate-400">
                <ImageIcon className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                <p className="text-xs">No project photos uploaded yet.</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: REVIEWS */}
        {activeTab === 'reviews' && (
          <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">Verified Client Ratings</h3>
                <p className="text-xs text-slate-500">Verified through Kontractor milestone completion checks.</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-amber-500">★ {vendor.rating.toFixed(1)}</div>
                <div className="text-[10px] text-slate-400">{vendor.reviewCount} total reviews</div>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { name: 'Vikram Mehta', loc: `${vendor.city}`, rating: 5, comment: `Executed our turnkey construction on time. Strict adherence to IS 456 cement curing and Grade 43 concrete.`, date: '3 weeks ago' },
                { name: 'Sanjay Agarwal', loc: `${vendor.city}`, rating: 5, comment: `Very transparent billing and daily WhatsApp site progress photos. Highly recommended!`, date: '1 month ago' },
              ].map((rev, rIdx) => (
                <div key={rIdx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-slate-800">{rev.name} ({rev.loc})</span>
                    <span className="text-[10px] text-slate-400">{rev.date}</span>
                  </div>
                  <div className="text-xs text-amber-500">{'★'.repeat(rev.rating)}</div>
                  <p className="text-xs text-slate-600">{rev.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

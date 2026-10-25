import React, { useState } from 'react';
import { 
  X, 
  Star, 
  MapPin, 
  Phone, 
  MessageCircle, 
  Mail, 
  Award, 
  ShieldCheck, 
  Briefcase, 
  Clock, 
  DollarSign, 
  Send, 
  CheckCircle2, 
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';
import { Vendor, Language } from '../types';
import { translations } from '../i18n/translations';

interface ContractorProfileModalProps {
  vendor: Vendor | null;
  onClose: () => void;
  language: Language;
  onSubmitQuote: (quoteData: {
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    city: string;
    serviceRequired: string;
    plotArea: number;
    budget: string;
    message: string;
    contractorId: string;
    contractorName: string;
  }) => Promise<void>;
}

export const ContractorProfileModal: React.FC<ContractorProfileModalProps> = ({
  vendor,
  onClose,
  language,
  onSubmitQuote,
}) => {
  const t = translations[language];

  // Quote form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [plotArea, setPlotArea] = useState('2400');
  const [budget, setBudget] = useState('₹50 Lakhs - ₹1 Cr');
  const [service, setService] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!vendor) return null;

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setSubmitting(true);
    try {
      await onSubmitQuote({
        customerName: name,
        customerPhone: phone,
        customerEmail: email || 'client@skylinex.com',
        city: vendor.city,
        serviceRequired: service || vendor.servicesOffered[0] || 'Turnkey Construction',
        plotArea: Number(plotArea) || 2000,
        budget,
        message: notes || `Direct quote request for ${vendor.businessName}`,
        contractorId: vendor._id,
        contractorName: vendor.businessName,
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappMsg = `Hi ${vendor.ownerName}, I viewed your verified profile on SkylineX. I would like to schedule a site consultation for my construction project in ${vendor.city}.`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col">
        
        {/* Header Section */}
        <div className="bg-slate-900 p-6 sm:p-8 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="relative shrink-0">
              <img
                src={vendor.avatar || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80'}
                alt={vendor.businessName}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-white/20 shadow-xl"
              />
              {vendor.kycVerified && (
                <div className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-black shadow border border-white">
                  ✓ Blue Tick
                </div>
              )}
            </div>

            <div className="space-y-1.5 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black tracking-tight">{vendor.businessName}</h2>
                {vendor.kycVerified ? (
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/40 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                    <span>Level 2: Verified Pro</span>
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700">
                    Level 1: Registered Partner
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                Proprietor: <span className="text-white font-bold">{vendor.ownerName}</span> • {vendor.city}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-1">
                <div className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{vendor.rating.toFixed(1)}</span>
                  <span className="text-slate-400 font-normal">({vendor.reviewCount} client reviews)</span>
                </div>
                <div>•</div>
                <div className="font-semibold">{vendor.experience}+ Years Experience</div>
                <div>•</div>
                <div className="font-semibold">{vendor.jobs} Completed Projects</div>
              </div>
            </div>

            {/* Quick Contact CTA on header */}
            <div className="flex sm:flex-col gap-2 shrink-0">
              <a
                href={`tel:${vendor.phone}`}
                className="py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Directly</span>
              </a>
              <a
                href={`https://wa.me/${vendor.whatsapp || vendor.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          
          {/* About / Credentials */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">
              Executive Profile & Structural Background
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed font-normal">
              {vendor.about}
            </p>

            {/* Certifications Chips */}
            {vendor.certifications && vendor.certifications.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {vendor.certifications.map((cert, cIdx) => (
                  <span
                    key={cIdx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-100"
                  >
                    <Award className="w-3.5 h-3.5 text-blue-600" />
                    <span>{cert}</span>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Portfolio Gallery */}
          {vendor.portfolioGallery && vendor.portfolioGallery.length > 0 && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">
                Completed Project Portfolio
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {vendor.portfolioGallery.map((proj, pIdx) => (
                  <div
                    key={pIdx}
                    className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="h-44 overflow-hidden relative">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold">
                        {proj.duration}
                      </div>
                    </div>
                    <div className="p-4 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-900">{proj.title}</h4>
                        <span className="text-xs font-extrabold text-blue-600">{proj.cost}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{proj.location}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Client Reviews */}
          {vendor.reviewsList && vendor.reviewsList.length > 0 && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">
                Verified Client Reviews
              </h3>
              <div className="space-y-3">
                {vendor.reviewsList.map((rev, rIdx) => (
                  <div
                    key={rIdx}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{rev.author}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 font-semibold border border-teal-200">
                          {rev.projectType}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span>{rev.rating}</span>
                        <span className="text-slate-400 text-[10px]">({rev.date})</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      "{rev.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Direct Quote Request Form */}
          <div className="p-6 rounded-3xl bg-blue-50/70 border border-blue-200 space-y-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold uppercase mb-1">
                <Sparkles className="w-3 h-3" />
                <span>Direct Quote Request</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Request an Itemized Estimate from {vendor.businessName}
              </h3>
              <p className="text-xs text-slate-500">
                Directly alerts the proprietor via SMS/WhatsApp & assigns an engineer to your query.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-sm font-bold text-emerald-900">Quote Request Dispatched Successfully!</h4>
                <p className="text-xs text-emerald-700">
                  {vendor.ownerName} has received your project details and will reach out to you within 2 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Vikramaditya Sharma"
                      className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-blue-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number (WhatsApp) *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98XXX XXXXX"
                      className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-blue-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Plot Area (in sq.ft)</label>
                    <input
                      type="number"
                      value={plotArea}
                      onChange={(e) => setPlotArea(e.target.value)}
                      placeholder="e.g. 2400"
                      className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-blue-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Target Budget</label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none font-medium"
                    >
                      <option value="₹25 Lakhs - ₹50 Lakhs">₹25 Lakhs - ₹50 Lakhs</option>
                      <option value="₹50 Lakhs - ₹1 Cr">₹50 Lakhs - ₹1 Cr</option>
                      <option value="₹1 Cr - ₹2 Cr">₹1 Cr - ₹2 Cr</option>
                      <option value="₹2 Cr+ (Luxury Estate)">₹2 Cr+ (Luxury Estate)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Project Notes / Requirements</label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Describe your plot dimensions, number of floors, soil condition or timeline..."
                    className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-blue-500 font-medium"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-bold text-xs tracking-wide shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition-transform hover:scale-[1.01]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{submitting ? 'Transmitting Request...' : 'Transmit Quote Request'}</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Modal Bottom Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Official KYC verification audit documents verified by SkylineX technical civil panel.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-100"
          >
            Close Profile
          </button>
        </div>

      </div>
    </div>
  );
};

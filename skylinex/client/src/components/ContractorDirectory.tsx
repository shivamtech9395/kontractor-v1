import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Star, 
  CheckCircle, 
  Phone, 
  MessageCircle, 
  Briefcase, 
  Clock, 
  Filter, 
  CheckCircle2, 
  Award, 
  ExternalLink, 
  ShieldCheck,
  Search,
  Sparkles
} from 'lucide-react';
import { Vendor, Language, ServiceCategory } from '../types';
import { translations } from '../i18n/translations';
import { CITIES } from '../data/mockData';
import { getCategoryTitle } from '../utils/i18nHelper';

interface ContractorDirectoryProps {
  vendors: Vendor[];
  categories: ServiceCategory[];
  language: Language;
  selectedCity: string;
  onCityChange: (city: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategoryFilter: string;
  onCategoryFilterChange: (catId: string) => void;
  onSelectVendor: (vendor: Vendor) => void;
  onRequestQuote: (vendor: Vendor) => void;
}

export const ContractorDirectory: React.FC<ContractorDirectoryProps> = ({
  vendors,
  categories,
  language,
  selectedCity,
  onCityChange,
  searchQuery,
  onSearchChange,
  selectedCategoryFilter,
  onCategoryFilterChange,
  onSelectVendor,
  onRequestQuote,
}) => {
  const t = translations[language];
  const [kycOnly, setKycOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'rating' | 'experience' | 'jobs'>('rating');

  // Filter approved contractors for public directory
  const filteredVendors = vendors
    .filter((v) => {
      // Must be approved (Level 1)
      if (!v.approved) return false;

      // City filter
      if (selectedCity && selectedCity !== 'All Cities' && v.city.toLowerCase() !== selectedCity.toLowerCase()) {
        return false;
      }

      // Category filter
      if (selectedCategoryFilter && selectedCategoryFilter !== 'all' && v.category !== selectedCategoryFilter) {
        return false;
      }

      // KYC Blue Tick filter
      if (kycOnly && !v.kycVerified) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesBusiness = v.businessName.toLowerCase().includes(q);
        const matchesOwner = v.ownerName.toLowerCase().includes(q);
        const matchesAbout = v.about.toLowerCase().includes(q);
        const matchesCity = v.city.toLowerCase().includes(q);
        const matchesServices = v.servicesOffered.some((s) => s.toLowerCase().includes(q));
        if (!matchesBusiness && !matchesOwner && !matchesAbout && !matchesCity && !matchesServices) {
          return false;
        }
      }

      return true;
    })
    .sort((a, b) => {
      // Prioritize KYC verified pros always
      if (a.kycVerified && !b.kycVerified) return -1;
      if (!a.kycVerified && b.kycVerified) return 1;

      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'experience') return b.experience - a.experience;
      if (sortBy === 'jobs') return b.jobs - a.jobs;
      return 0;
    });

  return (
    <section id="contractors" className="py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/70 text-blue-800 text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>IS-456 Civil & Architectural Directory</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Verified Turnkey Builders & Architects
            </h2>
            <p className="mt-2 text-sm text-slate-500 max-w-xl">
              Connect directly with credential-checked professionals. Zero middleman markup, verified rate cards, and direct WhatsApp / call communication.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">
              Showing <span className="font-extrabold text-blue-600">{filteredVendors.length}</span> Verified Partners
            </span>
          </div>
        </div>

        {/* Filter & Sorting Tool Bar */}
        <div className="p-4 rounded-3xl bg-slate-50 border border-slate-200/80 mb-8 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search contractor name, specialty, or services..."
                className="w-full pl-10 pr-4 py-2.5 bg-white rounded-2xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 font-medium"
              />
            </div>

            {/* City Dropdown Filter */}
            <div className="flex items-center gap-2">
              <div className="relative shrink-0">
                <select
                  value={selectedCity}
                  onChange={(e) => onCityChange(e.target.value)}
                  className="px-3.5 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none cursor-pointer"
                >
                  {CITIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Sort By Dropdown */}
              <div className="relative shrink-0">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3.5 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none cursor-pointer"
                >
                  <option value="rating">Top Rated (★)</option>
                  <option value="experience">Experience (Years)</option>
                  <option value="jobs">Completed Projects</option>
                </select>
              </div>

              {/* Verified Blue Tick Only Toggle */}
              <button
                onClick={() => setKycOnly(!kycOnly)}
                className={`px-3.5 py-2.5 rounded-2xl text-xs font-bold border transition-all flex items-center gap-1.5 shrink-0 ${
                  kycOnly
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'
                }`}
              >
                <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] ${kycOnly ? 'bg-white text-blue-600' : 'bg-blue-600 text-white'}`}>
                  ✓
                </div>
                <span>Blue Tick Pro Only</span>
              </button>
            </div>

          </div>

          {/* Category Horizontal Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 text-xs">
            <button
              onClick={() => onCategoryFilterChange('all')}
              className={`px-3.5 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                selectedCategoryFilter === 'all'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {language === 'hi' ? 'सभी श्रेणियाँ' : language === 'hinglish' ? 'All Categories' : 'All Categories'}
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onCategoryFilterChange(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                  selectedCategoryFilter === cat.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {getCategoryTitle(cat, language)}
              </button>
            ))}
          </div>
        </div>

        {/* Contractor Cards Grid - Ultra-Compact & Clean (Image, Name, Rate, Rating, Verified) */}
        {filteredVendors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5">
            {filteredVendors.map((vendor) => {
              const whatsappMsg = `Hi ${vendor.ownerName}, I found your profile on Kontractor. I would like to enquire about your services in ${vendor.city}.`;

              return (
                <div
                  key={vendor._id}
                  onClick={() => onSelectVendor(vendor)}
                  className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-200/90 shadow-xs hover:border-blue-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Row: Avatar & Business Name */}
                    <div className="flex items-center gap-3">
                      <div className="relative shrink-0">
                        <img
                          src={vendor.avatar || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80'}
                          alt={vendor.businessName}
                          className="w-11 h-11 rounded-xl object-cover border border-slate-200 shadow-xs"
                        />
                        {vendor.kycVerified && (
                          <div
                            className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs border-2 border-white text-[8px] font-black"
                            title="KYC Verified Pro"
                          >
                            ✓
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                          {vendor.businessName}
                        </h3>
                        <p className="text-[11px] font-medium text-slate-500 flex items-center gap-1.5 mt-0.5 truncate">
                          <span className="truncate">{vendor.ownerName}</span>
                          <span>•</span>
                          <span className="flex items-center gap-0.5 text-slate-600 font-semibold shrink-0">
                            <MapPin className="w-3 h-3 text-blue-600" />
                            {vendor.city}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Rate & Rating Row (Rate below name, side-by-side with rating & verified) */}
                    <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-100">
                      <div>
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block leading-none">Starting Rate</span>
                        <span className="text-xs font-black text-blue-600 mt-1 block truncate max-w-[120px]">{vendor.price}</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-50 border border-amber-200/60 text-amber-600 text-[11px] font-bold">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span>{vendor.rating.toFixed(1)}</span>
                        </div>

                        {vendor.kycVerified ? (
                          <span className="px-2 py-0.5 rounded-lg bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-200 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-blue-600" />
                            <span>Verified</span>
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-lg bg-slate-50 text-slate-600 text-[10px] font-semibold border border-slate-200">
                            Approved
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Compact Action Footer */}
                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center gap-1.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectVendor(vendor);
                      }}
                      className="flex-1 py-1.5 px-2 rounded-xl bg-slate-100 hover:bg-blue-50 active:bg-blue-100 text-slate-800 hover:text-blue-700 border border-slate-200/80 hover:border-blue-300 text-[11px] font-extrabold transition-all text-center shadow-xs cursor-pointer"
                    >
                      {language === 'hi' ? 'प्रोफ़ाइल देखें' : language === 'hinglish' ? 'View Profile' : 'View Profile'}
                    </button>

                    <a
                      href={`https://wa.me/${vendor.whatsapp || vendor.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappMsg)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-colors"
                      title="WhatsApp Chat"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    </a>

                    <a
                      href={`tel:${vendor.phone}`}
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 transition-colors"
                      title="Call Contractor"
                    >
                      <Phone className="w-3.5 h-3.5 text-blue-600" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 text-center bg-slate-50 rounded-3xl border border-slate-200">
            <Building2 className="w-12 h-12 mx-auto text-slate-300 mb-3" />
            <h4 className="text-base font-bold text-slate-700">No contractors found matching your filters</h4>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Try adjusting your city selection or clearing the search query to view all available verified professionals.
            </p>
            <button
              onClick={() => {
                onCityChange('All Cities');
                onCategoryFilterChange('all');
                onSearchChange('');
                setKycOnly(false);
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

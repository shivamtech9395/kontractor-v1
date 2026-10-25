import React from 'react';
import { Box, ShieldCheck, ArrowUp, Briefcase, UserPlus, Lock } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { CITIES } from '../data/mockData';

interface FooterProps {
  language: Language;
  onOpen3DStudio: () => void;
  onOpenAIPlanner: () => void;
  onOpenVendorPortal: () => void;
  onOpenVendorRegister: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onOpen3DStudio,
  onOpenAIPlanner,
  onOpenVendorPortal,
  onOpenVendorRegister,
  onOpenAdmin,
}) => {
  const t = translations[language];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Highlight Banner: Contractor Join & Login in Footer */}
        <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-950 via-slate-800 to-slate-900 border border-slate-700/80 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5">
            <span className="px-3 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold uppercase tracking-wider border border-blue-400/30">
              Contractor & Architect Network
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Are you a Builder, Contractor, or Architect?
            </h3>
            <p className="text-xs text-slate-400 max-w-xl">
              Expand your construction business across India. Access verified homeowner inquiries, upload past site projects, and get official KYC Blue Tick verification.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={onOpenVendorRegister}
              className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-lg shadow-blue-500/20 transition-all hover:scale-105 flex items-center gap-1.5"
            >
              <UserPlus className="w-4 h-4" />
              <span>Join as Contractor (Sign Up)</span>
            </button>

            <button
              onClick={onOpenVendorPortal}
              className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <Briefcase className="w-4 h-4 text-teal-400" />
              <span>Contractor Login & Portal</span>
            </button>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/kontractor_logo.jpg"
                alt="Kontractor"
                className="h-10 w-auto object-contain rounded-xl bg-white p-1"
              />
              <div>
                <span className="text-xl font-black text-white tracking-tight block leading-tight">
                  Kontractor
                </span>
                <span className="text-[11px] font-extrabold text-blue-400 block">
                  घर बनाना है...बन जाएगा
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              India's premier construction & architectural tech marketplace. Connecting property developers, builders, and homeowners with credential-verified structural engineers, architects, and civil contractors.
            </p>

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 pt-1">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>IS-456 Structural Codes & Level 2 KYC Verified Standards</span>
            </div>
          </div>

          {/* Quick Hubs */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Platform Modules</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={onOpen3DStudio} className="hover:text-white transition-colors">
                  3D House Customizer (20 Styles)
                </button>
              </li>
              <li>
                <button onClick={onOpenAIPlanner} className="hover:text-white transition-colors">
                  AI House Layout & BOQ Estimator
                </button>
              </li>
              <li>
                <a href="#categories" className="hover:text-white transition-colors">
                  15 Construction Specializations
                </a>
              </li>
              <li>
                <a href="#contractors" className="hover:text-white transition-colors">
                  Verified Contractor Directory
                </a>
              </li>
            </ul>
          </div>

          {/* Contractor Partner Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">For Professionals</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={onOpenVendorRegister} className="hover:text-white transition-colors">
                  3-Field Contractor Registration
                </button>
              </li>
              <li>
                <button onClick={onOpenVendorPortal} className="hover:text-white transition-colors">
                  Vendor Work Upload & Leads Portal
                </button>
              </li>
              <li>
                <span className="text-slate-500">Level 2 KYC Blue Tick Audit</span>
              </li>
              <li>
                <span className="text-slate-500">IS-456 Seismic Compliance</span>
              </li>
            </ul>
          </div>

          {/* Active Metro Hubs */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Active Metro Hubs</h4>
            <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-400">
              {CITIES.filter(c => c !== 'All Cities').map(c => (
                <span key={c} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  {c}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Verified Trust */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © 2026 Kontractor Technologies Pvt. Ltd. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span className="text-[11px] text-slate-500">
              ISO 9001:2015 & IS-456 Certified Construction Marketplace
            </span>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-colors flex items-center gap-1 text-xs font-bold cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

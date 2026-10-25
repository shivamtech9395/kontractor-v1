import React from 'react';
import { ShieldCheck, Award, FileText, CheckCircle2, UserCheck, Check, ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface TwoTierKYCExplainerProps {
  language: Language;
  onOpenVendorRegister: () => void;
}

export const TwoTierKYCExplainer: React.FC<TwoTierKYCExplainerProps> = ({
  language,
  onOpenVendorRegister,
}) => {
  const t = translations[language];

  return (
    <section className="py-16 bg-white border-t border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>Integrity & Verification Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Two-Tier Contractor KYC & Verification Standards
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            How SkylineX ensures strict adherence to IS-456 structural safety, municipal licensing, and physical site validation across India.
          </p>
        </div>

        {/* 2-Tier Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Level 1: Platform Listing Approval */}
          <div className="p-8 rounded-3xl bg-slate-50/70 border border-slate-200/90 shadow-sm relative space-y-6">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-slate-200 text-slate-700 text-xs font-extrabold uppercase tracking-wider">
                Level 1 Status
              </span>
              <span className="text-xs font-bold text-slate-500">
                Registered Partner
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Platform Listing Approval
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Basic operational check and civil contractor credentials screening by Admin.
              </p>
            </div>

            <div className="space-y-3 text-xs text-slate-700 font-medium">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span>Publicly visible in contractor directory and city search results.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span>Homeowners can directly call and initiate WhatsApp conversations.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span>Displays itemized service rate cards and portfolio previews.</span>
              </div>
              <div className="flex items-start gap-2.5 text-slate-400">
                <span className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center text-[10px] shrink-0 mt-0.5">✕</span>
                <span>Does NOT grant the verified Blue Tick badge (shows "Registered Partner").</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-[11px] text-slate-500 font-semibold">
              Criteria: Phone verification, business address proof & 3+ past project references.
            </div>
          </div>

          {/* Level 2: Document KYC Verification */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-50/80 via-white to-teal-50/50 border-2 border-blue-500/50 shadow-luxury relative space-y-6">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-extrabold uppercase tracking-wider shadow-sm">
                Level 2 Status
              </span>
              <div className="flex items-center gap-1 text-xs font-extrabold text-blue-700">
                <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">✓</span>
                <span>Verified Pro</span>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Document KYC & Site Verification
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Rigorous multi-point audit awarding the official Blue Tick badge.
              </p>
            </div>

            <div className="space-y-3 text-xs text-slate-700 font-medium">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>Official <strong>Blue Tick "Verified Pro"</strong> checkmark badge on card & profile.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>Top algorithmic priority placement in all homeowner search queries.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>Verified GSTIN tax filings, PWD/CoA engineering registration credentials.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>Physical site inspection audit conducted by SkylineX civil field engineers.</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-[11px] text-blue-900 font-semibold">
              Criteria: GSTIN + Municipal Civil Contractor License + Physical On-Site Quality Audit.
            </div>
          </div>

        </div>

        {/* CTA Footer */}
        <div className="mt-12 text-center">
          <button
            onClick={onOpenVendorRegister}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md transition-all hover:scale-105"
          >
            <span>Are you a Builder, Architect, or Contractor? Apply for Verification</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};

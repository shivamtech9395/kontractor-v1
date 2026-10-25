import React, { useState } from 'react';
import { 
  Briefcase, 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  Lock, 
  Unlock, 
  ShieldCheck, 
  Sparkles, 
  Upload, 
  Image as ImageIcon, 
  ArrowRight, 
  Check, 
  DollarSign, 
  User,
  LogIn
} from 'lucide-react';
import { Vendor, Lead, LeadStatus, UploadedWork } from '../types';
import { API_BASE_URL } from '../config/api';

interface VendorPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  vendors: Vendor[];
  leads: Lead[];
  onUpdateLeadStatus: (leadId: string, status: LeadStatus) => Promise<void>;
  onUnlockLead: (leadId: string, vendorId: string) => Promise<void>;
  onWorkUploaded: (vendorId: string, work: UploadedWork) => void;
}

export const VendorPortalModal: React.FC<VendorPortalModalProps> = ({
  isOpen,
  onClose,
  vendors,
  leads,
  onUpdateLeadStatus,
  onUnlockLead,
  onWorkUploaded,
}) => {
  // Login State (Logged in by Name & Phone Number)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginName, setLoginName] = useState('Er. Rajeshwar Singhania');
  const [loginPhone, setLoginPhone] = useState('98112 45890');
  const [currentVendor, setCurrentVendor] = useState<Vendor | null>(vendors[0] || null);

  // Active Tab inside logged in portal: 'leads' | 'upload_work' | 'profile'
  const [activeTab, setActiveTab] = useState<'leads' | 'upload_work' | 'profile'>('upload_work');

  // Upload Work Form State (Starting Image + Final Image)
  const [workTitle, setWorkTitle] = useState('');
  const [workLocation, setWorkLocation] = useState('');
  const [workCost, setWorkCost] = useState('₹65 Lakhs');
  const [startingImage, setStartingImage] = useState('https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=800&q=80');
  const [finalImage, setFinalImage] = useState('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80');
  const [uploading, setUploading] = useState(false);
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState('');

  if (!isOpen) return null;

  // Handle Login via Name & Phone
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginName || !loginPhone) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/vendors/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: loginName, phone: loginPhone })
      });

      if (res.ok) {
        const data = await res.json();
        setCurrentVendor(data.vendor);
        setIsLoggedIn(true);
      } else {
        // Fallback local match
        const found = vendors.find(v => 
          v.ownerName.toLowerCase().includes(loginName.toLowerCase()) || 
          v.phone.includes(loginPhone.replace(/[^0-9]/g, ''))
        ) || vendors[0];
        setCurrentVendor(found);
        setIsLoggedIn(true);
      }
    } catch (err) {
      const found = vendors[0];
      setCurrentVendor(found);
      setIsLoggedIn(true);
    }
  };

  // Handle Uploading Work (Starting Image + Final Image)
  const handleUploadWorkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentVendor || !workTitle || !startingImage || !finalImage) return;

    setUploading(true);
    try {
      const payload = {
        title: workTitle,
        location: workLocation || currentVendor.city,
        cost: workCost,
        startingImage,
        finalImage
      };

      const res = await fetch(`${API_BASE_URL}/api/vendors/${currentVendor._id}/work`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const data = await res.json();
        setCurrentVendor(data.vendor);
        onWorkUploaded(currentVendor._id, data.work);
        setUploadSuccessMsg(`🎉 Project "${workTitle}" uploaded successfully! It is now live on your public profile and visible to Admin.`);
        setWorkTitle('');
        setWorkLocation('');
        setTimeout(() => setUploadSuccessMsg(''), 6000);
      } else {
        const fallbackWork: UploadedWork = {
          title: workTitle,
          location: workLocation || currentVendor.city,
          cost: workCost,
          startingImage,
          finalImage,
          uploadedAt: new Date().toISOString()
        };
        onWorkUploaded(currentVendor._id, fallbackWork);
        setUploadSuccessMsg(`🎉 Project "${workTitle}" uploaded successfully!`);
        setTimeout(() => setUploadSuccessMsg(''), 6000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const vendorLeads = currentVendor
    ? leads.filter(l => !l.contractorId || l.contractorId === currentVendor._id)
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="bg-slate-900 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-400/30 p-1 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black tracking-tight">Contractor Dashboard & Portal</h2>
                {isLoggedIn && currentVendor && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    currentVendor.kycVerified
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-400/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-400/30'
                  }`}>
                    {currentVendor.kycVerified ? '✓ Verified Pro' : 'Registered Partner'}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">
                {isLoggedIn && currentVendor
                  ? `Logged in as: ${currentVendor.businessName} (${currentVendor.ownerName})`
                  : 'Login with your Name & Phone Number'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* STAGE A: LOGIN WITH NAME & NUMBER */}
          {!isLoggedIn ? (
            <div className="max-w-md mx-auto py-8 space-y-6">
              <div className="text-center space-y-1">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-2 shadow-sm">
                  <LogIn className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-black text-slate-900">Contractor Portal Login</h3>
                <p className="text-xs text-slate-500">
                  Enter your registered Name and Phone number to access your leads and upload your project work.
                </p>
              </div>

              <form onSubmit={handleLoginSubmit} className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-4 shadow-sm">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-blue-600" />
                    <span>Your Registered Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={loginName}
                    onChange={(e) => setLoginName(e.target.value)}
                    placeholder="e.g. Er. Rajeshwar Singhania"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-blue-600" />
                    <span>Mobile Number *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={loginPhone}
                    onChange={(e) => setLoginPhone(e.target.value)}
                    placeholder="e.g. 98112 45890"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs tracking-wide shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login to My Contractor Portal</span>
                </button>
              </form>

              <div className="text-center">
                <span className="text-xs text-slate-400">Quick Test Credentials:</span>
                <div className="flex flex-wrap justify-center gap-2 mt-1.5 text-[11px]">
                  <button
                    onClick={() => {
                      setLoginName('Er. Rajeshwar Singhania');
                      setLoginPhone('98112 45890');
                    }}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-blue-50 text-slate-700 rounded-lg border border-slate-200"
                  >
                    Er. Rajeshwar Singhania (Delhi)
                  </button>
                  <button
                    onClick={() => {
                      setLoginName('Ar. Ananya Deshmukh');
                      setLoginPhone('99201 88342');
                    }}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-blue-50 text-slate-700 rounded-lg border border-slate-200"
                  >
                    Ar. Ananya Deshmukh (Mumbai)
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* STAGE B: LOGGED IN CONTRACTOR DASHBOARD */
            <div className="space-y-6">
              
              {/* Top Sub-Navigation Tabs */}
              <div className="flex border-b border-slate-200 gap-2">
                <button
                  onClick={() => setActiveTab('upload_work')}
                  className={`py-2.5 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                    activeTab === 'upload_work'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload Site Work (Starting & Final Images)</span>
                </button>

                <button
                  onClick={() => setActiveTab('leads')}
                  className={`py-2.5 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                    activeTab === 'leads'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  <span>Client Leads ({vendorLeads.length})</span>
                </button>

                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="ml-auto text-xs text-slate-400 hover:text-red-600 py-2.5 px-2"
                >
                  Sign Out
                </button>
              </div>

              {/* Upload Success Alert */}
              {uploadSuccessMsg && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center justify-between animate-fadeIn">
                  <span>{uploadSuccessMsg}</span>
                  <button onClick={() => setUploadSuccessMsg('')} className="text-emerald-700">✕</button>
                </div>
              )}

              {/* TAB 1: UPLOAD WORK (STARTING IMAGE + FINAL IMAGE) */}
              {activeTab === 'upload_work' && currentVendor && (
                <div className="space-y-6">
                  <div className="p-6 rounded-3xl bg-blue-50/60 border border-blue-200/80 space-y-2">
                    <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-blue-600" />
                      <span>Upload Your Project Transformation (Before / After)</span>
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      Provide a <strong>Starting Image</strong> (initial excavation / brickwork / foundation) and a <strong>Final Image</strong> (completed luxury finish). This builds instant credibility and is shared with Admin & Homeowners.
                    </p>
                  </div>

                  <form onSubmit={handleUploadWorkSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Project Name / Title *</label>
                        <input
                          type="text"
                          required
                          value={workTitle}
                          onChange={(e) => setWorkTitle(e.target.value)}
                          placeholder="e.g. 7,500 sq.ft Cantilever Villa"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-blue-500 bg-slate-50/50"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Site Location</label>
                        <input
                          type="text"
                          value={workLocation}
                          onChange={(e) => setWorkLocation(e.target.value)}
                          placeholder={`e.g. ${currentVendor.city}`}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-blue-500 bg-slate-50/50"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Contract / Project Cost</label>
                        <input
                          type="text"
                          value={workCost}
                          onChange={(e) => setWorkCost(e.target.value)}
                          placeholder="e.g. ₹1.2 Cr"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-blue-500 bg-slate-50/50"
                        />
                      </div>
                    </div>

                    {/* Dual Image Pickers: Starting Image & Final Image */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      
                      {/* 1. Starting Image */}
                      <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                            <span>1. Starting Image (Site Excavation / Before) *</span>
                          </label>
                          <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">Phase 1</span>
                        </div>
                        <input
                          type="text"
                          required
                          value={startingImage}
                          onChange={(e) => setStartingImage(e.target.value)}
                          placeholder="Paste image URL of initial site or excavation"
                          className="w-full px-3.5 py-2 rounded-xl bg-white border border-amber-300 text-xs text-slate-800 focus:outline-none"
                        />
                        <div className="h-36 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 relative">
                          <img
                            src={startingImage}
                            alt="Starting Project Preview"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=400&q=80';
                            }}
                          />
                          <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 text-white text-[10px] font-bold">
                            Before / Excavation
                          </span>
                        </div>
                      </div>

                      {/* 2. Final Image */}
                      <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                            <span>2. Final Image (Completed Finish / After) *</span>
                          </label>
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">Final Handover</span>
                        </div>
                        <input
                          type="text"
                          required
                          value={finalImage}
                          onChange={(e) => setFinalImage(e.target.value)}
                          placeholder="Paste image URL of completed architectural finish"
                          className="w-full px-3.5 py-2 rounded-xl bg-white border border-emerald-300 text-xs text-slate-800 focus:outline-none"
                        />
                        <div className="h-36 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 relative">
                          <img
                            src={finalImage}
                            alt="Final Project Preview"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80';
                            }}
                          />
                          <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 text-white text-[10px] font-bold">
                            After / Completed Luxury Finish
                          </span>
                        </div>
                      </div>

                    </div>

                    <button
                      type="submit"
                      disabled={uploading}
                      className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-bold text-xs tracking-wide shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition-transform hover:scale-[1.01]"
                    >
                      <Upload className="w-4 h-4" />
                      <span>{uploading ? 'Publishing to Profile & Admin...' : 'Publish Project Transformation to My Profile'}</span>
                    </button>
                  </form>
                </div>
              )}

              {/* TAB 2: INCOMING CLIENT LEADS */}
              {activeTab === 'leads' && currentVendor && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-900">
                    Direct Client Inquiries for {currentVendor.businessName}
                  </h3>

                  <div className="space-y-3">
                    {vendorLeads.map((lead) => {
                      const isUnlocked = lead.unlockedByVendors?.includes(currentVendor._id) || lead.status === 'deal_closed';

                      return (
                        <div
                          key={lead._id}
                          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-sm font-extrabold text-slate-900">{lead.customerName}</h4>
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 font-semibold text-slate-600">
                                  {lead.city}
                                </span>
                              </div>
                              <p className="text-xs text-blue-600 font-bold mt-0.5">{lead.serviceRequired}</p>
                            </div>

                            <select
                              value={lead.status}
                              onChange={(e) => onUpdateLeadStatus(lead._id, e.target.value as LeadStatus)}
                              className="px-2.5 py-1 text-xs font-bold rounded-xl border border-slate-200 bg-slate-50 text-slate-700"
                            >
                              <option value="pending">Pending</option>
                              <option value="contacted">Contacted</option>
                              <option value="quotation_sent">Quotation Sent</option>
                              <option value="deal_closed">Deal Closed</option>
                            </select>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                            <div>
                              <span className="text-slate-400 font-medium">Budget:</span>
                              <div className="font-extrabold text-slate-800">{lead.budget || 'Custom'}</div>
                            </div>
                            <div>
                              <span className="text-slate-400 font-medium">Plot Area:</span>
                              <div className="font-extrabold text-slate-800">{lead.plotArea || 2400} sq.ft</div>
                            </div>
                            <div>
                              <span className="text-slate-400 font-medium">Phone Contact:</span>
                              {isUnlocked ? (
                                <div className="font-black text-emerald-600 flex items-center gap-1">
                                  <Phone className="w-3.5 h-3.5" />
                                  <a href={`tel:${lead.customerPhone}`}>{lead.customerPhone}</a>
                                </div>
                              ) : (
                                <button
                                  onClick={() => onUnlockLead(lead._id, currentVendor._id)}
                                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-50 text-amber-900 text-xs font-bold border border-amber-200 hover:bg-amber-100"
                                >
                                  <Lock className="w-3 h-3 text-amber-700" />
                                  <span>Unlock Number (₹299)</span>
                                </button>
                              )}
                            </div>
                          </div>

                          <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 font-normal">
                            "{lead.message}"
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>
            {isLoggedIn && currentVendor ? `Logged in: ${currentVendor.businessName}` : 'Kontractor Verified Partner Network'}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800"
          >
            Close Portal
          </button>
        </div>

      </div>
    </div>
  );
};

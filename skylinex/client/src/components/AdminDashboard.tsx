import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  ShieldAlert, 
  TrendingUp, 
  DollarSign, 
  Users, 
  FileCheck2, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  Lock, 
  Unlock, 
  BadgeCheck, 
  Sparkles, 
  ArrowUpRight, 
  Phone, 
  Mail, 
  Building2, 
  Filter, 
  Check, 
  XCircle,
  Clock,
  Layers,
  Award,
  KeyRound,
  LogOut,
  Calendar,
  Settings,
  PlusCircle,
  ShieldCheck,
  FileText,
  UserPlus,
  Trash2,
  Edit3
} from 'lucide-react';
import { Vendor, Lead, LeadStatus } from '../types';
import { CATEGORIES, CITIES } from '../data/mockData';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'Super Admin' | 'Operations Manager' | 'KYC Auditor';
  addedAt: string;
}

const DEFAULT_ADMINS: AdminUser[] = [
  {
    id: 'admin-ceo-primary',
    name: 'Shivam & Ajit (Founder & CEO)',
    email: 'companyceo2047@gmail.com',
    password: 'ceo@2047',
    role: 'Super Admin',
    addedAt: '2026-10-25'
  }
];

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  vendors: Vendor[];
  leads: Lead[];
  onToggleListing: (vendorId: string, currentStatus: boolean) => Promise<void>;
  onToggleKYC: (vendorId: string, currentStatus: boolean) => Promise<void>;
  onUpdateLeadStatus: (leadId: string, status: LeadStatus) => Promise<void>;
  onCloseDeal: (leadId: string, contractAmount: number) => Promise<void>;
  onAddVendor?: (vendorData: Partial<Vendor>) => Promise<void>;
  onUpdateVendorKYC?: (vendorId: string, kycData: { aadhaarNumber?: string; panNumber?: string; kycStatus?: 'verified' | 'pending'; adminNotes?: string }) => Promise<void>;
}

// Format timestamp to Indian Standard Time (IST)
const formatIST = (dateStr?: string) => {
  if (!dateStr) return '25 Oct 2026, 06:30 PM (IST)';
  try {
    const d = new Date(dateStr);
    return d.toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }) + ' (IST)';
  } catch {
    return '25 Oct 2026, 06:30 PM (IST)';
  }
};

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  vendors,
  leads,
  onToggleListing,
  onToggleKYC,
  onUpdateLeadStatus,
  onCloseDeal,
  onAddVendor,
  onUpdateVendorKYC,
}) => {
  // Stored Admins State
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(() => {
    try {
      const stored = localStorage.getItem('kontractor_admins_store');
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return DEFAULT_ADMINS;
  });

  // Current Logged In Admin
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(() => {
    try {
      const session = sessionStorage.getItem('kontractor_admin_session');
      if (session) return JSON.parse(session);
    } catch (e) {}
    return null;
  });

  // Login Form State
  const [emailInput, setEmailInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');

  // 5 Responsive Tabs: 'pending' | 'contractors' | 'leads' | 'finance' | 'settings'
  const [activeTab, setActiveTab] = useState<'pending' | 'contractors' | 'leads' | 'finance' | 'settings'>('pending');
  const [selectedLeadForClose, setSelectedLeadForClose] = useState<Lead | null>(null);
  const [signedAmount, setSignedAmount] = useState<number>(2500000);
  const [dealSuccessMsg, setDealSuccessMsg] = useState<string>('');

  // Modals inside Admin
  const [selectedVendorForKYC, setSelectedVendorForKYC] = useState<Vendor | null>(null);
  const [kycAadhaarInput, setKycAadhaarInput] = useState<string>('');
  const [kycPanInput, setKycPanInput] = useState<string>('');
  const [kycAddressInput, setKycAddressInput] = useState<string>('');
  const [kycStatusInput, setKycStatusInput] = useState<'verified' | 'pending'>('verified');
  const [kycNotesInput, setKycNotesInput] = useState<string>('');

  // Direct "Add Vendor" Modal
  const [showAddVendorModal, setShowAddVendorModal] = useState<boolean>(false);
  const [newVendorBusiness, setNewVendorBusiness] = useState<string>('');
  const [newVendorOwner, setNewVendorOwner] = useState<string>('');
  const [newVendorPhone, setNewVendorPhone] = useState<string>('');
  const [newVendorCategory, setNewVendorCategory] = useState<string>(CATEGORIES[0]?.id || 'cat-construction-repair');
  const [newVendorCity, setNewVendorCity] = useState<string>('Gorakhpur');
  const [newVendorExp, setNewVendorExp] = useState<number>(8);
  const [newVendorRate, setNewVendorRate] = useState<string>('₹1,650 / sq.ft');
  const [newVendorAadhaar, setNewVendorAadhaar] = useState<string>('');
  const [newVendorPan, setNewVendorPan] = useState<string>('');
  const [newVendorApproveNow, setNewVendorApproveNow] = useState<boolean>(true);

  // Settings: Change Password State
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [passwordChangeMsg, setPasswordChangeMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Settings: Add Sub-Admin State
  const [subAdminName, setSubAdminName] = useState<string>('');
  const [subAdminEmail, setSubAdminEmail] = useState<string>('');
  const [subAdminRole, setSubAdminRole] = useState<'Operations Manager' | 'KYC Auditor'>('Operations Manager');
  const [subAdminPassword, setSubAdminPassword] = useState<string>('');
  const [subAdminMsg, setSubAdminMsg] = useState<string>('');

  // Persist Admins to LocalStorage
  const saveAdminsToStorage = (admins: AdminUser[]) => {
    setAdminUsers(admins);
    localStorage.setItem('kontractor_admins_store', JSON.stringify(admins));
  };

  if (!isOpen) return null;

  // Handle Enterprise Admin Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailClean = emailInput.trim().toLowerCase();
    const passClean = passwordInput.trim();

    const matched = adminUsers.find(
      (a) => a.email.toLowerCase() === emailClean && a.password === passClean
    );

    if (matched) {
      const sessionData = { id: matched.id, name: matched.name, email: matched.email, role: matched.role, addedAt: matched.addedAt };
      sessionStorage.setItem('kontractor_admin_session', JSON.stringify(sessionData));
      setCurrentAdmin(matched);
      setLoginError('');
    } else {
      setLoginError('ईमेल या पासवर्ड अमान्य है (Invalid email or password). Primary CEO: companyceo2047@gmail.com / ceo@2047');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('kontractor_admin_session');
    setCurrentAdmin(null);
  };

  // Vendor Buckets
  const pendingVendors = vendors.filter(v => !v.approved);
  const approvedVendors = vendors.filter(v => v.approved);

  // Compute metrics dynamically from state
  const closedLeads = leads.filter(l => l.status === 'deal_closed');
  const totalGMV = closedLeads.reduce((acc, curr) => acc + (curr.closedAmount || 0), 0);
  const totalCommissions = closedLeads.reduce((acc, curr) => acc + (curr.platformCommission || Math.round((curr.closedAmount || 0) * 0.05)), 0);

  let unlockedCount = 0;
  leads.forEach(l => {
    unlockedCount += (l.unlockedByVendors ? l.unlockedByVendors.length : 1);
  });
  const totalLeadUnlockRevenue = unlockedCount * 299;

  const verifiedProsCount = vendors.filter(v => v.kycVerified).length;
  const totalSubscriptionRevenue = verifiedProsCount * 2999;

  const netPlatformRevenue = totalCommissions + totalLeadUnlockRevenue + totalSubscriptionRevenue;

  // Handle Deal Closing Submission
  const handleDealCloseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLeadForClose) return;

    try {
      await onCloseDeal(selectedLeadForClose._id, signedAmount);
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
      const comm = Math.round(signedAmount * 0.05);
      setDealSuccessMsg(`🎉 Deal closed for ₹${signedAmount.toLocaleString('en-IN')}! 5% Commission ₹${comm.toLocaleString('en-IN')} credited to net platform revenue.`);
      setSelectedLeadForClose(null);
      setTimeout(() => setDealSuccessMsg(''), 6000);
    } catch (err) {
      console.error(err);
    }
  };

  // Open KYC Modal
  const openKYCModalForVendor = (v: Vendor) => {
    setSelectedVendorForKYC(v);
    setKycAadhaarInput(v.aadhaarNumber || '');
    setKycPanInput(v.panNumber || '');
    setKycAddressInput(v.address || v.city || '');
    setKycStatusInput(v.kycStatus === 'verified' || (v.aadhaarNumber && v.panNumber) ? 'verified' : 'pending');
    setKycNotesInput(v.adminNotes || 'Audit verified against original government ID documents.');
  };

  // Save KYC Details
  const handleSaveKYC = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVendorForKYC) return;

    if (onUpdateVendorKYC) {
      await onUpdateVendorKYC(selectedVendorForKYC._id, {
        aadhaarNumber: kycAadhaarInput.trim() || undefined,
        panNumber: kycPanInput.trim().toUpperCase() || undefined,
        kycStatus: kycStatusInput,
        adminNotes: kycNotesInput.trim()
      });
    } else {
      selectedVendorForKYC.aadhaarNumber = kycAadhaarInput.trim() || undefined;
      selectedVendorForKYC.panNumber = kycPanInput.trim().toUpperCase() || undefined;
      selectedVendorForKYC.kycStatus = kycStatusInput;
      selectedVendorForKYC.adminNotes = kycNotesInput.trim();
    }

    setDealSuccessMsg(`✅ KYC Details saved for ${selectedVendorForKYC.businessName}!`);
    setSelectedVendorForKYC(null);
    setTimeout(() => setDealSuccessMsg(''), 4500);
  };

  // Submit Direct "Add Vendor"
  const handleCreateVendorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVendorBusiness || !newVendorPhone) return;

    const matchedCat = CATEGORIES.find(c => c.id === newVendorCategory);

    const createdVendor: Partial<Vendor> = {
      _id: `v-adm-${Date.now().toString().slice(-5)}`,
      businessName: newVendorBusiness.trim(),
      ownerName: newVendorOwner.trim() || 'Managing Director',
      phone: newVendorPhone.trim(),
      category: newVendorCategory,
      city: newVendorCity,
      experience: Number(newVendorExp) || 5,
      rating: 4.9,
      reviewCount: 1,
      startingPrice: newVendorRate,
      servicesOffered: matchedCat ? matchedCat.subServices.slice(0, 3).map(s => s.name) : ['Civil Construction'],
      approved: newVendorApproveNow,
      kycVerified: false,
      aadhaarNumber: newVendorAadhaar.trim() || undefined,
      panNumber: newVendorPan.trim().toUpperCase() || undefined,
      kycStatus: (newVendorAadhaar && newVendorPan) ? 'verified' : 'pending',
      createdAt: new Date().toISOString(),
      avatar: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?auto=format&fit=crop&w=300&q=80'
    };

    if (onAddVendor) {
      await onAddVendor(createdVendor);
    }

    setShowAddVendorModal(false);
    setDealSuccessMsg(`🎉 Contractor "${createdVendor.businessName}" added successfully!`);
    // Reset fields
    setNewVendorBusiness('');
    setNewVendorOwner('');
    setNewVendorPhone('');
    setNewVendorAadhaar('');
    setNewVendorPan('');
    setTimeout(() => setDealSuccessMsg(''), 5000);
  };

  // Change Password Handler
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentAdmin) return;

    if (oldPassword !== currentAdmin.password) {
      setPasswordChangeMsg({ type: 'error', text: 'वर्तमान पासवर्ड गलत है (Incorrect current password).' });
      return;
    }

    if (newPassword.length < 6) {
      setPasswordChangeMsg({ type: 'error', text: 'नया पासवर्ड कम से कम 6 अक्षरों का होना चाहिए (Minimum 6 characters).' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordChangeMsg({ type: 'error', text: 'दोनों नए पासवर्ड मेल नहीं खाते (Passwords do not match).' });
      return;
    }

    const updatedAdmins = adminUsers.map((a) =>
      a.email.toLowerCase() === currentAdmin.email.toLowerCase() ? { ...a, password: newPassword } : a
    );

    saveAdminsToStorage(updatedAdmins);
    setCurrentAdmin({ ...currentAdmin, password: newPassword });
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setPasswordChangeMsg({ type: 'success', text: 'पासवर्ड सफलतापूर्वक बदल दिया गया है (Password updated successfully)!' });
  };

  // Add Sub-Admin Handler
  const handleAddSubAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subAdminEmail || !subAdminPassword) return;

    const emailClean = subAdminEmail.trim().toLowerCase();
    if (adminUsers.some(a => a.email.toLowerCase() === emailClean)) {
      setSubAdminMsg('⚠️ यह ईमेल पहले से ही एडमिन सूची में मौजूद है (Email already exists).');
      return;
    }

    const newAdminObj: AdminUser = {
      id: `admin-sub-${Date.now().toString().slice(-4)}`,
      name: subAdminName.trim() || 'Operations Partner',
      email: emailClean,
      password: subAdminPassword.trim(),
      role: subAdminRole,
      addedAt: new Date().toISOString().split('T')[0]
    };

    const updated = [...adminUsers, newAdminObj];
    saveAdminsToStorage(updated);
    setSubAdminName('');
    setSubAdminEmail('');
    setSubAdminPassword('');
    setSubAdminMsg(`✅ नया एडमिन "${newAdminObj.email}" सफलतापूर्वक जोड़ दिया गया!`);
    setTimeout(() => setSubAdminMsg(''), 5000);
  };

  // Revoke Sub-Admin
  const handleRevokeAdmin = (id: string, email: string) => {
    if (email.toLowerCase() === 'companyceo2047@gmail.com') {
      alert("मुख्य सुपर एडमिन (Primary CEO) को हटाया नहीं जा सकता!");
      return;
    }
    if (confirm(`क्या आप ${email} के एडमिन अधिकार हटाना चाहते हैं?`)) {
      const updated = adminUsers.filter(a => a.id !== id);
      saveAdminsToStorage(updated);
    }
  };

  // ================= RENDER EMAIL & PASSWORD LOGIN GATE IF NOT AUTHENTICATED ================= //
  if (!currentAdmin) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
        <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col p-6 sm:p-8 space-y-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center space-y-3 pt-2">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-700 via-indigo-700 to-teal-500 text-white mx-auto flex items-center justify-center shadow-lg shadow-blue-500/25">
              <ShieldAlert className="w-8 h-8 text-teal-300" />
            </div>

            <div>
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-[10px] font-black uppercase tracking-wider border border-blue-200">
                Kontractor Operations Command Gateway
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2 tracking-tight">
                Enterprise Admin Login
              </h2>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                वेंडर सत्यापन, ग्राहक लीड्स एवं वित्तीय ऑडिट हेतु अधिकृत क्रेडेंशियल्स दर्ज करें।
              </p>
            </div>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold text-center animate-shake">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs font-medium">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Admin Email (कंपनी ईमेल)
              </label>
              <input
                type="email"
                required
                autoFocus
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="companyceo2047@gmail.com"
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-600 focus:outline-none font-semibold text-slate-900 bg-slate-50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Admin Password (पासवर्ड)
              </label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-600 focus:outline-none font-semibold text-slate-900 bg-slate-50"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-black tracking-wide shadow-lg shadow-blue-500/25 transition-transform active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>Unlock Master Console (कंसोल में लॉगिन करें)</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ================= MAIN AUTHENTICATED ADMIN DASHBOARD ================= //
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-6xl h-[94vh] bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col">
        
        {/* Admin Header */}
        <div className="bg-slate-900 px-4 sm:px-8 py-3.5 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-teal-400 p-0.5 flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <ShieldAlert className="w-5 h-5 text-teal-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-black tracking-tight">Kontractor Master Operations Hub</h2>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-400/30">
                  {currentAdmin.role} ({currentAdmin.email})
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400 flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-teal-400" />
                <span>Real-Time IST Sync • Aadhaar/PAN 2-Tier Verification</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAddVendorModal(true)}
              className="hidden md:flex px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm items-center gap-1 cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>+ Add Contractor</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
              title="Lock Admin Hub"
            >
              <LogOut className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Logout</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 5-Tab Responsive, Non-Overlapping Navigation Bar */}
        <div className="flex items-center gap-1 sm:gap-2 border-b border-slate-200 bg-slate-50 px-3 sm:px-6 py-2 overflow-x-auto no-scrollbar shrink-0 text-xs">
          
          {/* Tab 1: Pending Approvals */}
          <button
            onClick={() => setActiveTab('pending')}
            className={`py-2 px-3 sm:px-4 rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'pending'
                ? 'bg-amber-500 text-white shadow-sm font-black'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>लंबित अनुमोदन (Pending)</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
              activeTab === 'pending' ? 'bg-white text-amber-600' : 'bg-amber-100 text-amber-800'
            }`}>
              {pendingVendors.length}
            </span>
          </button>

          {/* Tab 2: Verified Contractors */}
          <button
            onClick={() => setActiveTab('contractors')}
            className={`py-2 px-3 sm:px-4 rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'contractors'
                ? 'bg-blue-600 text-white shadow-sm font-black'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>कॉन्ट्रैक्टर्स (Vendors & KYC)</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
              activeTab === 'contractors' ? 'bg-white text-blue-600' : 'bg-blue-100 text-blue-800'
            }`}>
              {approvedVendors.length}
            </span>
          </button>

          {/* Tab 3: Customer Leads */}
          <button
            onClick={() => setActiveTab('leads')}
            className={`py-2 px-3 sm:px-4 rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'leads'
                ? 'bg-teal-600 text-white shadow-sm font-black'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <FileCheck2 className="w-4 h-4" />
            <span>ग्राहक लीड्स (Leads)</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
              activeTab === 'leads' ? 'bg-white text-teal-600' : 'bg-teal-100 text-teal-800'
            }`}>
              {leads.length}
            </span>
          </button>

          {/* Tab 4: Platform Finance */}
          <button
            onClick={() => setActiveTab('finance')}
            className={`py-2 px-3 sm:px-4 rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'finance'
                ? 'bg-indigo-600 text-white shadow-sm font-black'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>रेवेन्यू (Revenue Model)</span>
          </button>

          {/* Tab 5: Settings & Access Delegation */}
          <button
            onClick={() => setActiveTab('settings')}
            className={`py-2 px-3 sm:px-4 rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-slate-900 text-white shadow-sm font-black'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>सेटिंग्स (Settings & Multi-Admin)</span>
          </button>
        </div>

        {/* Success Alert Banner */}
        {dealSuccessMsg && (
          <div className="mx-4 sm:mx-8 mt-3 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center justify-between animate-fadeIn shrink-0">
            <span>{dealSuccessMsg}</span>
            <button onClick={() => setDealSuccessMsg('')} className="text-emerald-700 hover:text-emerald-950">
              ✕
            </button>
          </div>
        )}

        {/* Tab Content Body (Scrollable) */}
        <div className="p-4 sm:p-8 overflow-y-auto space-y-6 flex-1">
          
          {/* ================= TAB 1: PENDING CONTRACTOR APPROVALS ================= */}
          {activeTab === 'pending' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-amber-600" />
                    <span>Level 1: New Contractor Signups Awaiting Approval</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    एडमिन किसी भी वेंडर को दस्तावेज़ (Aadhaar/PAN) जोड़कर या बिना जोड़े तुरंत स्वीकृत कर सकता है।
                  </p>
                </div>

                <button
                  onClick={() => setShowAddVendorModal(true)}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all self-start sm:self-auto cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>+ नया ठेकेदार जोड़ें (+ Add Contractor)</span>
                </button>
              </div>

              {pendingVendors.length === 0 ? (
                <div className="p-12 text-center rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-extrabold text-slate-800">
                    कोई लंबित वेंडर नहीं है (Queue is Empty!)
                  </h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    सभी पंजीकृत कॉन्ट्रैक्टर्स स्वीकृत हैं। जब भी कोई नया वेंडर साइन अप करेगा या आप नया वेंडर जोड़ेंगे, वह तुरंत यहाँ प्रदर्शित होगा।
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-3xl border border-slate-200 shadow-sm">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-amber-50/80 text-amber-950 font-bold uppercase text-[10px] tracking-wider border-b border-amber-200">
                      <tr>
                        <th className="p-3.5">Registration Time (IST)</th>
                        <th className="p-3.5">Business & Owner</th>
                        <th className="p-3.5">Mobile Contact</th>
                        <th className="p-3.5">City & Services</th>
                        <th className="p-3.5">KYC Document Status</th>
                        <th className="p-3.5 text-center">Admin Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white font-medium text-slate-700">
                      {pendingVendors.map((vendor) => {
                        const hasKYCDocs = Boolean(vendor.aadhaarNumber && vendor.panNumber);
                        return (
                          <tr key={vendor._id} className="hover:bg-amber-50/30 transition-colors">
                            <td className="p-3.5 whitespace-nowrap">
                              <div className="flex items-center gap-1.5 font-bold text-slate-900">
                                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                                <span>{formatIST(vendor.createdAt)}</span>
                              </div>
                              <span className="text-[10px] text-amber-600 font-bold">New Registration</span>
                            </td>

                            <td className="p-3.5">
                              <div className="font-extrabold text-slate-900">{vendor.businessName}</div>
                              <div className="text-[11px] text-slate-500">{vendor.ownerName}</div>
                            </td>

                            <td className="p-3.5">
                              <a href={`tel:${vendor.phone}`} className="text-blue-600 font-bold hover:underline">
                                {vendor.phone}
                              </a>
                              <div className="text-[10px] text-slate-400">WhatsApp Verified</div>
                            </td>

                            <td className="p-3.5">
                              <div className="font-bold text-slate-800">{vendor.city}</div>
                              <div className="text-[10px] text-slate-500 line-clamp-1">
                                {vendor.servicesOffered.slice(0, 2).join(', ')}
                              </div>
                            </td>

                            {/* KYC Documents Indicator */}
                            <td className="p-3.5 whitespace-nowrap">
                              {hasKYCDocs ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                  <span>[✓ KYC Docs Verified]</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                                  <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                                  <span>[⚠️ KYC Docs Pending / Not Added]</span>
                                </span>
                              )}
                            </td>

                            <td className="p-3.5 text-center whitespace-nowrap">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={() => openKYCModalForVendor(vendor)}
                                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-200 transition-colors flex items-center gap-1 cursor-pointer"
                                  title="Add or Edit Aadhaar / PAN details"
                                >
                                  <Edit3 className="w-3.5 h-3.5 text-blue-600" />
                                  <span>KYC Docs</span>
                                </button>

                                <button
                                  onClick={() => onToggleListing(vendor._id, vendor.approved)}
                                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md transition-all active:scale-95 flex items-center gap-1 cursor-pointer"
                                >
                                  <Check className="w-4 h-4" />
                                  <span>Approve & Go Live</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ================= TAB 2: VERIFIED CONTRACTORS GOVERNANCE ================= */}
          {activeTab === 'contractors' && (
            <div className="space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-blue-600" />
                    <span>Two-Tier Governance: Listing + Aadhaar/PAN Blue Tick</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Total {approvedVendors.length} active contractors live on Kontractor marketplace directory.
                  </p>
                </div>

                <button
                  onClick={() => setShowAddVendorModal(true)}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all self-start sm:self-auto cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>+ नया ठेकेदार जोड़ें (+ Add Contractor)</span>
                </button>
              </div>

              {/* Contractor Management Table */}
              <div className="overflow-x-auto rounded-3xl border border-slate-200 shadow-sm">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="p-3.5">Contractor Business</th>
                      <th className="p-3.5">Owner & Contact</th>
                      <th className="p-3.5">Category & City</th>
                      <th className="p-3.5">KYC Document Status</th>
                      <th className="p-3.5 text-center">KYC Audit</th>
                      <th className="p-3.5 text-center">Level 1: Listing</th>
                      <th className="p-3.5 text-center">Level 2: Blue Tick</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white font-medium text-slate-700">
                    {approvedVendors.map((vendor) => {
                      const hasKYCDocs = Boolean(vendor.aadhaarNumber && vendor.panNumber);
                      return (
                        <tr key={vendor._id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-3.5">
                            <div className="flex items-center gap-2.5">
                              <img
                                src={vendor.avatar || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100&q=80'}
                                alt={vendor.businessName}
                                className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
                              />
                              <div>
                                <div className="font-bold text-slate-900 flex items-center gap-1">
                                  <span>{vendor.businessName}</span>
                                  {vendor.kycVerified && (
                                    <span className="w-3.5 h-3.5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[8px] font-black">
                                      ✓
                                    </span>
                                  )}
                                </div>
                                <span className="text-[10px] text-slate-400">ID: {vendor._id}</span>
                              </div>
                            </div>
                          </td>

                          <td className="p-3.5">
                            <div className="font-semibold text-slate-800">{vendor.ownerName}</div>
                            <div className="text-[11px] text-slate-500">{vendor.phone}</div>
                          </td>

                          <td className="p-3.5">
                            <div className="font-bold text-slate-800">{vendor.category}</div>
                            <div className="text-[11px] text-slate-500">{vendor.city}</div>
                          </td>

                          {/* KYC Document Status Indicator */}
                          <td className="p-3.5 whitespace-nowrap">
                            {hasKYCDocs ? (
                              <div className="space-y-0.5">
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                  <span>[✓ KYC Docs Verified]</span>
                                </span>
                                <div className="text-[10px] text-slate-400 font-mono">
                                  PAN: {vendor.panNumber?.slice(0, 5)}****
                                </div>
                              </div>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                                <AlertCircle className="w-3 h-3 text-amber-600" />
                                <span>[⚠️ KYC Pending]</span>
                              </span>
                            )}
                          </td>

                          {/* Action: Open KYC Editor */}
                          <td className="p-3.5 text-center">
                            <button
                              onClick={() => openKYCModalForVendor(vendor)}
                              className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 text-[11px] font-bold transition-colors cursor-pointer"
                            >
                              Edit Docs
                            </button>
                          </td>

                          {/* Level 1 Button: Suspend */}
                          <td className="p-3.5 text-center">
                            <button
                              onClick={() => onToggleListing(vendor._id, vendor.approved)}
                              className="px-3 py-1.5 rounded-xl text-xs font-bold transition-colors bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 cursor-pointer"
                            >
                              Suspend
                            </button>
                          </td>

                          {/* Level 2 Button: Award / Revoke Blue Tick */}
                          <td className="p-3.5 text-center">
                            <button
                              onClick={() => onToggleKYC(vendor._id, vendor.kycVerified)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 mx-auto cursor-pointer ${
                                vendor.kycVerified
                                  ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
                              }`}
                            >
                              <BadgeCheck className="w-3.5 h-3.5" />
                              <span>{vendor.kycVerified ? 'Revoke Tick' : 'Award Blue Tick'}</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================= TAB 3: CUSTOMER LEADS LOG ================= */}
          {activeTab === 'leads' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Live Client Quote Requests & Audit Log
                  </h3>
                  <p className="text-xs text-slate-500">
                    Audit trail of all homeowner enquiries with exact date & time (IST). Update statuses or trigger Deal Closer Engine to credit 5% commission.
                  </p>
                </div>
              </div>

              {/* Leads Table */}
              <div className="overflow-x-auto rounded-3xl border border-slate-200 shadow-sm">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="p-3.5">Date & Time (IST)</th>
                      <th className="p-3.5">Customer</th>
                      <th className="p-3.5">Assigned Partner</th>
                      <th className="p-3.5">Service & Budget</th>
                      <th className="p-3.5">Location</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5">Deal Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white font-medium text-slate-700">
                    {leads.map((lead) => (
                      <tr key={lead._id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3.5 whitespace-nowrap">
                          <div className="font-bold text-slate-900 flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-blue-600" />
                            <span>{formatIST(lead.createdAt)}</span>
                          </div>
                          <span className="text-[10px] text-slate-400">ID: {lead._id}</span>
                        </td>

                        <td className="p-3.5">
                          <div className="font-bold text-slate-900">{lead.customerName}</div>
                          <div className="text-[11px] text-slate-500">
                            <a href={`tel:${lead.customerPhone}`} className="text-blue-600 hover:underline">
                              {lead.customerPhone}
                            </a>
                          </div>
                        </td>

                        <td className="p-3.5">
                          <div className="font-semibold text-slate-800">
                            {lead.contractorName || 'Open Marketplace Lead'}
                          </div>
                          {lead.contractorId && (
                            <span className="text-[10px] text-slate-400">ID: {lead.contractorId}</span>
                          )}
                        </td>

                        <td className="p-3.5">
                          <div className="font-bold text-slate-900">{lead.serviceRequired}</div>
                          <div className="text-[11px] text-teal-700 font-bold">{lead.budget || 'Custom'}</div>
                        </td>

                        <td className="p-3.5 text-slate-600">
                          {lead.city}
                        </td>

                        <td className="p-3.5">
                          <select
                            value={lead.status}
                            onChange={(e) => onUpdateLeadStatus(lead._id, e.target.value as LeadStatus)}
                            className={`px-2.5 py-1 rounded-xl text-xs font-bold border ${
                              lead.status === 'deal_closed'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                : lead.status === 'quotation_sent'
                                ? 'bg-blue-50 text-blue-800 border-blue-300'
                                : lead.status === 'contacted'
                                ? 'bg-amber-50 text-amber-800 border-amber-300'
                                : 'bg-slate-50 text-slate-600 border-slate-200'
                            }`}
                          >
                            <option value="pending">Pending</option>
                            <option value="contacted">Contacted</option>
                            <option value="quotation_sent">Quotation Sent</option>
                            <option value="deal_closed">Deal Closed (Signed)</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>

                        <td className="p-3.5 whitespace-nowrap">
                          {lead.status === 'deal_closed' ? (
                            <div className="text-[11px]">
                              <span className="font-extrabold text-emerald-700">Closed: </span>
                              <span>₹{(lead.closedAmount || 0).toLocaleString('en-IN')}</span>
                              <div className="text-[10px] text-slate-500 font-semibold">
                                Commission: ₹{(lead.platformCommission || 0).toLocaleString('en-IN')}
                              </div>
                            </div>
                          ) : (
                            <button
                              onClick={() => {
                                setSelectedLeadForClose(lead);
                                setSignedAmount(2500000);
                              }}
                              className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] shadow-sm transition-colors cursor-pointer"
                            >
                              Close Deal & Cut 5%
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Deal Closer Modal Sub-form */}
              {selectedLeadForClose && (
                <div className="p-6 rounded-3xl bg-blue-50/80 border border-blue-200 space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900">
                        Deal Closer Engine: Record Contract for {selectedLeadForClose.customerName}
                      </h4>
                      <p className="text-xs text-slate-500">
                        Contractor: {selectedLeadForClose.contractorName} • Service: {selectedLeadForClose.serviceRequired}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedLeadForClose(null)}
                      className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleDealCloseSubmit} className="flex flex-col sm:flex-row items-center gap-3">
                    <div className="w-full sm:flex-1">
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Signed Contract Value (₹ INR)
                      </label>
                      <input
                        type="number"
                        required
                        value={signedAmount}
                        onChange={(e) => setSignedAmount(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-xs font-black text-slate-900 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="w-full sm:w-auto pt-4">
                      <button
                        type="submit"
                        className="w-full py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                        <span>Confirm Signed Deal & Calculate 5% (₹{Math.round(signedAmount * 0.05).toLocaleString('en-IN')})</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* ================= TAB 4: REVENUE & EARNING MODEL ================= */}
          {activeTab === 'finance' && (
            <div className="space-y-8">
              
              {/* High-Level KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-3xl bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/15 space-y-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-blue-100">Net Platform Revenue</div>
                  <div className="text-2xl font-black">
                    ₹{netPlatformRevenue.toLocaleString('en-IN')}
                  </div>
                  <p className="text-[11px] text-blue-200">Across Commissions, Unlocks & Subscriptions</p>
                </div>

                <div className="p-5 rounded-3xl bg-slate-900 text-white shadow-lg space-y-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Contract GMV</div>
                  <div className="text-2xl font-black text-teal-400">
                    ₹{(totalGMV / 10000000).toFixed(2)} <span className="text-sm font-semibold text-slate-400">Cr</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Gross closed construction value</p>
                </div>

                <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">5% Deal Commissions</div>
                  <div className="text-2xl font-black text-slate-900">
                    ₹{totalCommissions.toLocaleString('en-IN')}
                  </div>
                  <p className="text-[11px] text-slate-500">{closedLeads.length} closed milestone contracts</p>
                </div>

                <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Subscriptions & Unlocks</div>
                  <div className="text-2xl font-black text-blue-600">
                    ₹{(totalSubscriptionRevenue + totalLeadUnlockRevenue).toLocaleString('en-IN')}
                  </div>
                  <p className="text-[11px] text-slate-500">{verifiedProsCount} Blue Tick Pros @ ₹2,999/yr</p>
                </div>
              </div>

              {/* 3-Pillar Monetization Model Architecture Cards */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-600" />
                  <span>3-Pillar Monetization Model Architecture</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {/* Pillar 1 */}
                  <div className="p-6 rounded-3xl bg-gradient-to-b from-blue-50/60 to-white border border-blue-200/80 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold uppercase">
                        Pillar 1
                      </span>
                      <span className="text-xs font-black text-blue-600">
                        ₹{totalCommissions.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <h4 className="text-sm font-black text-slate-900">5% Construction Deal Commission</h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      Collected upon signed project contract closures and milestone escrow payouts across civil, turnkey, and luxury fitout contracts.
                    </p>
                    <div className="pt-2 border-t border-blue-100 text-[11px] font-bold text-slate-500">
                      Take Rate: <span className="text-blue-600">5.0% Standard</span>
                    </div>
                  </div>

                  {/* Pillar 2 */}
                  <div className="p-6 rounded-3xl bg-gradient-to-b from-teal-50/60 to-white border border-teal-200/80 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-teal-600 text-white text-[10px] font-bold uppercase">
                        Pillar 2
                      </span>
                      <span className="text-xs font-black text-teal-700">
                        ₹{totalLeadUnlockRevenue.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <h4 className="text-sm font-black text-slate-900">₹299 High-Intent Client Lead Unlock</h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      Paid by registered contractors to reveal client phone number, exact plot location, and architectural blueprint specifications.
                    </p>
                    <div className="pt-2 border-t border-teal-100 text-[11px] font-bold text-slate-500">
                      Fee: <span className="text-teal-700">₹299 per direct lead unlock</span>
                    </div>
                  </div>

                  {/* Pillar 3 */}
                  <div className="p-6 rounded-3xl bg-gradient-to-b from-indigo-50/60 to-white border border-indigo-200/80 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-bold uppercase">
                        Pillar 3
                      </span>
                      <span className="text-xs font-black text-indigo-700">
                        ₹{totalSubscriptionRevenue.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <h4 className="text-sm font-black text-slate-900">₹2,999/Yr Verified Blue Tick Pro</h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      Annual compliance verification, background verification badge, priority placement in search algorithms, and client trust guarantee.
                    </p>
                    <div className="pt-2 border-t border-indigo-100 text-[11px] font-bold text-slate-500">
                      Annual Fee: <span className="text-indigo-700">₹2,999 / year per partner</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ================= TAB 5: SETTINGS & MULTI-ADMIN ACCESS DELEGATION ================= */}
          {activeTab === 'settings' && (
            <div className="space-y-8 animate-fadeIn">
              
              {/* SECTION A: ADMIN PASSWORD MANAGEMENT */}
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900">
                      एडमिन पासवर्ड बदलें (Change Admin Password)
                    </h4>
                    <p className="text-xs text-slate-500">
                      Logged in as: <strong className="text-slate-800">{currentAdmin.email}</strong> ({currentAdmin.role})
                    </p>
                  </div>
                </div>

                {passwordChangeMsg && (
                  <div className={`p-3 rounded-xl text-xs font-bold ${
                    passwordChangeMsg.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
                  }`}>
                    {passwordChangeMsg.text}
                  </div>
                )}

                <form onSubmit={handleChangePassword} className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">वर्तमान पासवर्ड (Current Password)</label>
                    <input
                      type="password"
                      required
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 font-medium text-slate-900 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">नया पासवर्ड (New Password)</label>
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 font-medium text-slate-900 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">कन्फर्म नया पासवर्ड (Confirm)</label>
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 font-medium text-slate-900 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="sm:col-span-3 pt-2">
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                    >
                      पासवर्ड अपडेट करें (Save New Password)
                    </button>
                  </div>
                </form>
              </div>

              {/* SECTION B: MULTI-ADMIN ACCESS DELEGATION */}
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                      <UserPlus className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-900">
                        मल्टी-एडमिन एक्सेस नियंत्रण (Multi-Admin Delegation)
                      </h4>
                      <p className="text-xs text-slate-500">
                        कंपनी के अन्य सदस्यों या प्रबंधकों को एडमिन पैनल का एक्सेस दें।
                      </p>
                    </div>
                  </div>
                </div>

                {/* Authorized Admins List */}
                <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px]">
                      <tr>
                        <th className="p-3">Admin Name</th>
                        <th className="p-3">Authorized Email</th>
                        <th className="p-3">Role</th>
                        <th className="p-3">Added Date</th>
                        <th className="p-3 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {adminUsers.map((adm) => (
                        <tr key={adm.id} className="hover:bg-slate-50">
                          <td className="p-3 font-bold text-slate-900">{adm.name}</td>
                          <td className="p-3 font-mono text-blue-700">{adm.email}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              adm.role === 'Super Admin' ? 'bg-indigo-100 text-indigo-800' : 'bg-teal-100 text-teal-800'
                            }`}>
                              {adm.role}
                            </span>
                          </td>
                          <td className="p-3 text-slate-400">{adm.addedAt}</td>
                          <td className="p-3 text-center">
                            {adm.email.toLowerCase() === 'companyceo2047@gmail.com' ? (
                              <span className="text-[10px] text-slate-400 font-bold">Primary CEO</span>
                            ) : (
                              <button
                                onClick={() => handleRevokeAdmin(adm.id, adm.email)}
                                className="px-2.5 py-1 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 font-bold text-[10px] transition-colors cursor-pointer"
                              >
                                Revoke Access
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Sub-form: Add New Admin */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-4">
                  <h5 className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                    <PlusCircle className="w-4 h-4 text-blue-600" />
                    <span>नया एडमिन जोड़ें (+ Grant Admin Access to Colleague)</span>
                  </h5>

                  {subAdminMsg && (
                    <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold">
                      {subAdminMsg}
                    </div>
                  )}

                  <form onSubmit={handleAddSubAdmin} className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Admin Full Name</label>
                      <input
                        type="text"
                        required
                        value={subAdminName}
                        onChange={(e) => setSubAdminName(e.target.value)}
                        placeholder="e.g. Ramesh Kumar"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-900 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Company Email</label>
                      <input
                        type="email"
                        required
                        value={subAdminEmail}
                        onChange={(e) => setSubAdminEmail(e.target.value)}
                        placeholder="ops.partner@kontractor.in"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-900 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Role / Department</label>
                      <select
                        value={subAdminRole}
                        onChange={(e) => setSubAdminRole(e.target.value as any)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-slate-900 focus:outline-none focus:border-blue-500 bg-white"
                      >
                        <option value="Operations Manager">Operations Manager</option>
                        <option value="KYC Auditor">KYC Auditor</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Initial Password</label>
                      <input
                        type="password"
                        required
                        value={subAdminPassword}
                        onChange={(e) => setSubAdminPassword(e.target.value)}
                        placeholder="Temporary password"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-900 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="sm:col-span-4 pt-1">
                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                      >
                        एडमिन एक्सेस प्रदान करें (Grant Admin Access)
                      </button>
                    </div>
                  </form>
                </div>

              </div>

            </div>
          )}

        </div>

        {/* Admin Footer */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 shrink-0">
          <span className="text-xs text-slate-500 font-medium">
            Live MongoDB Sync Online • Multi-Admin Role Active • Kontractor 2026 Enterprise Console
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Exit Console
          </button>
        </div>

      </div>

      {/* ================= MODAL 1: EDIT / RECORD VENDOR KYC DOCUMENTS ================= */}
      {selectedVendorForKYC && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-7 space-y-5">
            <button
              onClick={() => setSelectedVendorForKYC(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-wider border border-blue-200">
                Official Document Verification
              </span>
              <h3 className="text-lg font-black text-slate-900 mt-1">
                Record KYC Credentials: {selectedVendorForKYC.businessName}
              </h3>
              <p className="text-xs text-slate-500">
                वेंडर का आधार कार्ड, पैन कार्ड एवं स्थायी कार्यालय का पता यहाँ सुरक्षित रूप से दर्ज करें।
              </p>
            </div>

            <form onSubmit={handleSaveKYC} className="space-y-4 text-xs font-medium">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Aadhaar Card Number (आधार संख्या - 12 Digits)
                </label>
                <input
                  type="text"
                  maxLength={14}
                  value={kycAadhaarInput}
                  onChange={(e) => setKycAadhaarInput(e.target.value)}
                  placeholder="e.g. 9845 2314 6789"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono text-slate-900 focus:outline-none focus:border-blue-600 bg-slate-50"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  PAN Card Number (पैन कार्ड संख्या - 10 Chars)
                </label>
                <input
                  type="text"
                  maxLength={10}
                  value={kycPanInput}
                  onChange={(e) => setKycPanInput(e.target.value)}
                  placeholder="e.g. ABCDE1234F"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono uppercase text-slate-900 focus:outline-none focus:border-blue-600 bg-slate-50"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Office / Site Registered Address (पंजीकृत पता)
                </label>
                <input
                  type="text"
                  value={kycAddressInput}
                  onChange={(e) => setKycAddressInput(e.target.value)}
                  placeholder="e.g. Plot 42, Transport Nagar, Gorakhpur"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-600 bg-slate-50"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  KYC Verification Status
                </label>
                <select
                  value={kycStatusInput}
                  onChange={(e) => setKycStatusInput(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-bold focus:outline-none focus:border-blue-600 bg-white"
                >
                  <option value="verified">🟢 Verified [✓ Green Checkmark Enabled]</option>
                  <option value="pending">⚠️ Pending [Documents Under Audit / Not Added]</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Admin Internal Audit Notes
                </label>
                <textarea
                  rows={2}
                  value={kycNotesInput}
                  onChange={(e) => setKycNotesInput(e.target.value)}
                  placeholder="e.g. Original Aadhaar verified over WhatsApp video inspection."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-600 bg-slate-50"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedVendorForKYC(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md cursor-pointer"
                >
                  Save KYC Documents
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL 2: DIRECT "ADD NEW CONTRACTOR" MODAL ================= */}
      {showAddVendorModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-8 space-y-5">
            <button
              onClick={() => setShowAddVendorModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-black uppercase tracking-wider border border-emerald-200">
                Direct Admin Enrolment
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                + नया ठेकेदार जोड़ें (Add Contractor Directly)
              </h3>
              <p className="text-xs text-slate-500">
                एडमिन सीधे किसी भी वेंडर को सिस्टम में जोड़ सकता है और तुरंत लाइव कर सकता है।
              </p>
            </div>

            <form onSubmit={handleCreateVendorSubmit} className="space-y-4 text-xs font-medium">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Business Name (फर्म का नाम) *</label>
                  <input
                    type="text"
                    required
                    value={newVendorBusiness}
                    onChange={(e) => setNewVendorBusiness(e.target.value)}
                    placeholder="e.g. Royal Buildcon Pvt Ltd"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-600 bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Owner Name (मालिक का नाम) *</label>
                  <input
                    type="text"
                    required
                    value={newVendorOwner}
                    onChange={(e) => setNewVendorOwner(e.target.value)}
                    placeholder="e.g. Ramesh Chandra"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-600 bg-slate-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    value={newVendorPhone}
                    onChange={(e) => setNewVendorPhone(e.target.value)}
                    placeholder="+91 98380 12345"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-600 bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Operating City (शहर) *</label>
                  <select
                    value={newVendorCity}
                    onChange={(e) => setNewVendorCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-bold focus:outline-none focus:border-blue-600 bg-white"
                  >
                    {CITIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Primary Category (श्रेणी) *</label>
                  <select
                    value={newVendorCategory}
                    onChange={(e) => setNewVendorCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-bold focus:outline-none focus:border-blue-600 bg-white"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Standard Starting Rate</label>
                  <input
                    type="text"
                    value={newVendorRate}
                    onChange={(e) => setNewVendorRate(e.target.value)}
                    placeholder="e.g. ₹1,650 / sq.ft"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-600 bg-slate-50"
                  />
                </div>
              </div>

              {/* Optional KYC Documents */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="font-bold text-slate-800 text-[11px] flex items-center justify-between">
                  <span>KYC Documents (वैकल्पिक - बाद में भी जोड़ सकते हैं):</span>
                  <span className="text-slate-400 font-normal">Optional</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Aadhaar Number</label>
                    <input
                      type="text"
                      value={newVendorAadhaar}
                      onChange={(e) => setNewVendorAadhaar(e.target.value)}
                      placeholder="12 digit Aadhaar"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono text-slate-900 bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">PAN Card Number</label>
                    <input
                      type="text"
                      value={newVendorPan}
                      onChange={(e) => setNewVendorPan(e.target.value)}
                      placeholder="10 char PAN"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono uppercase text-slate-900 bg-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="approveImmediately"
                  checked={newVendorApproveNow}
                  onChange={(e) => setNewVendorApproveNow(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                />
                <label htmlFor="approveImmediately" className="font-bold text-slate-800 cursor-pointer">
                  तुरंत स्वीकृत करें और लाइव लिस्टिंग में दिखाएं (Approve Immediately & Go Live)
                </label>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddVendorModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md cursor-pointer"
                >
                  Save Contractor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

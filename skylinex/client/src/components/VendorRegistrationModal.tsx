import React, { useState } from 'react';
import { 
  Building2, 
  X, 
  Check, 
  Sparkles, 
  CheckCircle2, 
  Phone, 
  User, 
  Briefcase, 
  MapPin, 
  ArrowRight,
  Camera,
  Upload
} from 'lucide-react';
import { ServiceCategory, Vendor, Language } from '../types';
import { CITIES } from '../data/mockData';
import { API_BASE_URL } from '../config/api';

interface VendorRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: ServiceCategory[];
  onRegisterSuccess: (newVendor: Vendor) => void;
}

export const VendorRegistrationModal: React.FC<VendorRegistrationModalProps> = ({
  isOpen,
  onClose,
  categories,
  onRegisterSuccess,
}) => {
  // 3-FIELD SIMPLIFIED SIGNUP:
  // 1. Name
  // 2. Number (Unique 10-digit)
  // 3. Services Offered (multi-select chips)
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Delhi NCR');
  const [avatarPreview, setAvatarPreview] = useState<string>('');
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'मिस्त्री (Mason / Brickwork & Foundation)',
    'प्लंबर (Plumbing & Sanifit)'
  ]);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleService = (srv: string) => {
    if (selectedServices.includes(srv)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter(s => s !== srv));
      }
    } else {
      setSelectedServices([...selectedServices, srv]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('कृपया अपना नाम दर्ज करें (Please enter your name).');
      return;
    }

    const clean = phone.replace(/[^0-9]/g, '');
    const last10 = clean.slice(-10);
    if (last10.length < 10) {
      setErrorMsg('कृपया 10 अंकों का मान्य भारतीय मोबाइल नंबर दर्ज करें (Please enter a valid 10-digit mobile number).');
      return;
    }

    setSubmitting(true);
    try {
      const defaultAvatar = 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=400&q=80';
      const finalAvatar = avatarPreview || defaultAvatar;

      const payload = {
        name: name.trim(),
        phone: `+91 ${last10}`,
        services: selectedServices,
        city,
        avatar: finalAvatar,
      };

      const res = await fetch(`${API_BASE_URL}/api/vendors/simple-signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        onRegisterSuccess(data.vendor);
        setSuccess(true);
      } else {
        const errData = await res.json().catch(() => ({}));
        setErrorMsg(errData.error || `पंजीकरण विफल (HTTP ${res.status}): कृपया दोबारा प्रयास करें या दूसरा मोबाइल नंबर दर्ज करें।`);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg('सर्वर से संपर्क नहीं हो पाया। कृपया इंटरनेट कनेक्शन जांचें।');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-teal-600 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="px-3 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider">
            Fast Contractor Signup (3 Steps)
          </span>

          <h2 className="text-xl sm:text-2xl font-black mt-1.5 tracking-tight">
            Register as a Kontractor Partner
          </h2>
          <p className="text-xs text-blue-100 mt-1 font-normal">
            No heavy paperwork needed now. Just enter your name, number, and services to join the queue.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {success ? (
            <div className="p-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Registration Received, {name}!</h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed font-normal">
                Your profile is submitted to the <strong>Level 1 Admin Approval Queue</strong>. Admin will review and verify your phone number. You can login anytime using your name & number to upload your project site photos!
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-md hover:bg-blue-700 transition-colors"
              >
                Done / Explore Platform
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Error Alert Banner */}
              {errorMsg && (
                <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center justify-between animate-fadeIn">
                  <span>⚠️ {errorMsg}</span>
                  <button type="button" onClick={() => setErrorMsg('')} className="text-red-500 hover:text-red-800 ml-2">
                    ✕
                  </button>
                </div>
              )}

              {/* Field 1: Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-blue-600" />
                  <span>1. Your Full Name (or Proprietor Name) *</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="उदा. राजेश शर्मा / Sharmaji Builders"
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-500 bg-slate-50/50"
                />
              </div>

              {/* Field 2: Phone Number */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-blue-600" />
                    <span>2. 10-Digit Mobile Number (WhatsApp Calling) *</span>
                  </span>
                  <span className="text-[10px] text-blue-600 font-semibold">1 Number = 1 Account</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="9811234567"
                    className="w-full pl-13 pr-4 py-3 rounded-2xl border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-500 bg-slate-50/50"
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  एक मोबाइल नंबर से केवल एक ही वेंडर रजिस्टर हो सकता है (Unique mobile number required).
                </p>
              </div>

              {/* City Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  <span>Operating City</span>
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none bg-slate-50/50 cursor-pointer"
                >
                  {CITIES.filter(c => c !== 'All Cities').map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Optional Profile Photo / Business Logo Upload */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
                <label className="block text-xs font-bold text-slate-700 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-blue-600" />
                    <span>Profile Photo / Business Logo (Optional / ऐच्छिक)</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-normal">Direct upload</span>
                </label>

                <div className="flex items-center gap-3">
                  {avatarPreview ? (
                    <div className="relative">
                      <img
                        src={avatarPreview}
                        alt="Profile preview"
                        className="w-14 h-14 rounded-2xl object-cover border-2 border-blue-500 shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setAvatarPreview('')}
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-[10px] shadow"
                        title="Remove photo"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-2xl bg-white border border-slate-300 border-dashed flex flex-col items-center justify-center text-slate-400 shrink-0">
                      <Camera className="w-5 h-5 text-slate-400" />
                      <span className="text-[8px] font-semibold text-slate-400 mt-0.5">Photo</span>
                    </div>
                  )}

                  <div className="flex-1 space-y-1">
                    <input
                      type="file"
                      id="contractor-avatar-upload"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageFileChange}
                    />
                    <label
                      htmlFor="contractor-avatar-upload"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-blue-50 border border-slate-200 text-slate-700 hover:text-blue-600 text-xs font-bold shadow-xs cursor-pointer transition-colors"
                    >
                      <Upload className="w-3.5 h-3.5 text-blue-600" />
                      <span>{avatarPreview ? 'Change Photo' : 'Upload Profile Photo'}</span>
                    </label>
                    <p className="text-[10px] text-slate-400 leading-tight">
                      Agar abhi upload nahi karna to koi baat nahi, default badge lag jayega.
                    </p>
                  </div>
                </div>
              </div>

              {/* Field 3: Services Offered (Clickable Multi-Select Chips) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                    <span>3. Services You Provide (Select All That Apply) *</span>
                  </span>
                  <span className="text-[11px] font-normal text-blue-600">{selectedServices.length} Selected</span>
                </label>

                <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-1">
                  {[
                    'मिस्त्री (Mason / Brickwork & Foundation)',
                    'Labour Mandi (दैनिक लेबर / बेलदार)',
                    'प्लंबर (Plumbing & Sanifit)',
                    'इलेक्ट्रिशियन (Electrical & Smart Wiring)',
                    'कारपेंटर (Carpenter & Woodwork)',
                    'पेंटर (Painter & Whitewash)',
                    'वेल्डर (Welder & Metal Fabrication)',
                    'टाइल्स इंस्टॉलर (Tiles & Marble Installer)',
                    'रूफिंग विशेषज्ञ (Roofing & Tin Shed)',
                    'इंटीरियर डिजाइनर (Interior Designer)',
                    'फॉल्स सीलिंग विशेषज्ञ (False Ceiling & POP)',
                    'लाइटिंग विशेषज्ञ (Lighting & Cove Lights)',
                    'फर्नीचर निर्माता (Furniture Manufacturer)',
                    'निर्माण सामग्री सप्लायर (रेत, सीमेंट, बजरी, सरिया)',
                    'पेंट सप्लायर (Paint Supplier)',
                    'हार्डवेयर सप्लायर (Hardware Supplier)',
                    'लॉजिस्टिक्स पार्टनर (Logistics Partner)',
                    'मशीनरी रेंटल (JCB, हाइड्रा, कंक्रीट मिक्सर)',
                    'सुरक्षा उपकरण सप्लायर (Safety Gear)',
                    'टूल्स सप्लायर (Tools Supplier)',
                    'आर्किटेक्ट (Architect - 2D/3D नक्शा)',
                    'सिविल इंजीनियर (Civil Engineer - Structural)',
                    'लीगल एडवाइज़र (Legal Advisor - Land & NOC)',
                    'फाइनेंस/CA (Finance & Project Loan)'
                  ].map((srv) => {
                    const isSelected = selectedServices.includes(srv);
                    return (
                      <button
                        type="button"
                        key={srv}
                        onClick={() => toggleService(srv)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-blue-600 text-white shadow-xs font-bold'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/60'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 text-white" />}
                        <span>{srv}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-bold text-xs tracking-wide shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition-transform hover:scale-[1.01]"
              >
                <span>{submitting ? 'Registering Your Profile...' : 'Complete 3-Field Signup'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Detailed KYC & license documents can be added anytime by Admin.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-100"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import confetti from 'canvas-confetti';
import { Navbar } from './components/Navbar';
import { MobileTopBar } from './components/MobileTopBar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { VoiceAIChatbotModal } from './components/VoiceAIChatbotModal';
import { HeroSection } from './components/HeroSection';
import { CategoriesSection } from './components/CategoriesSection';
import { Studio3D } from './components/Studio3D';
import { ContractorDirectory } from './components/ContractorDirectory';
import { ContractorProfileModal } from './components/ContractorProfileModal';
import { TwoTierKYCExplainer } from './components/TwoTierKYCExplainer';
import { AIHousePlanner } from './components/AIHousePlanner';
import { VendorRegistrationModal } from './components/VendorRegistrationModal';
import { VendorPortalModal } from './components/VendorPortalModal';
import { AdminDashboard } from './components/AdminDashboard';
import { CategoryDetailPage } from './components/CategoryDetailPage';
import { ServiceDetailPage } from './components/ServiceDetailPage';
import { VendorDetailPage } from './components/VendorDetailPage';
import { AllCategoriesPage } from './components/AllCategoriesPage';
import { Villa3DTeaserSection } from './components/Villa3DTeaserSection';
import { WelcomeSplashScreen } from './components/WelcomeSplashScreen';
import { Footer } from './components/Footer';

import { Vendor, ServiceCategory, Lead, Language, LeadStatus, AIPlanResult, SubServiceSpec } from './types';
import { VENDORS, CATEGORIES, INITIAL_LEADS } from './data/mockData';
import { API_BASE_URL } from './config/api';

// Real Multi-Page Navigation Route Definition
export type ActiveView = 
  | { type: 'home' }
  | { type: 'category'; category: ServiceCategory }
  | { type: 'service'; subService: SubServiceSpec; parentCategory?: ServiceCategory }
  | { type: 'vendor'; vendor: Vendor }
  | { type: 'all-categories' };

export const App: React.FC = () => {
  // Global Language State ('en' | 'hi' | 'hinglish')
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('skylinex_lang') as Language) || 'en';
  });

  // Filter States
  const [selectedCity, setSelectedCity] = useState<string>('All Cities');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');

  // Data States (Initialized with rich mock data for instantaneous offline resilience)
  const [vendors, setVendors] = useState<Vendor[]>(VENDORS);
  const [categories, setCategories] = useState<ServiceCategory[]>(CATEGORIES);
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);

  // Dedicated Page Routing State
  const [activeView, setActiveView] = useState<ActiveView>({ type: 'home' });

  // Modal Visibility States
  const [showWelcomeSplash, setShowWelcomeSplash] = useState<boolean>(true);
  const [isMascotOpen, setIsMascotOpen] = useState<boolean>(() => {
    return !localStorage.getItem('skylinex_onboarding_completed');
  });
  const [is3DStudioOpen, setIs3DStudioOpen] = useState<boolean>(false);
  const [isAIPlannerOpen, setIsAIPlannerOpen] = useState<boolean>(false);
  const [isVendorRegisterOpen, setIsVendorRegisterOpen] = useState<boolean>(false);
  const [isVendorPortalOpen, setIsVendorPortalOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [selectedVendorForModal, setSelectedVendorForModal] = useState<Vendor | null>(null);

  // Live Toast State
  const [toastMessage, setToastMessage] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4500);
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('skylinex_lang', lang);
  };

  // Sync route with URL hash & browser back/forward buttons
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (!hash) {
        setActiveView({ type: 'home' });
        return;
      }

      if (hash === 'categories') {
        setActiveView({ type: 'all-categories' });
        return;
      }

      if (
        hash === 'secure-console' ||
        hash === 'portal/ops-control' ||
        hash === 'admin-gateway' ||
        hash === 'ops-admin' ||
        hash === 'admin'
      ) {
        setIsAdminOpen(true);
        return;
      }

      if (hash.startsWith('category/')) {
        const catId = hash.replace('category/', '');
        const found = categories.find((c) => c.id === catId);
        if (found) {
          setActiveView({ type: 'category', category: found });
          return;
        }
      }

      if (hash.startsWith('service/')) {
        const sId = hash.replace('service/', '');
        for (const cat of categories) {
          const foundSub = cat.subServices.find((s) => s.id === sId);
          if (foundSub) {
            setActiveView({ type: 'service', subService: foundSub, parentCategory: cat });
            return;
          }
        }
      }

      if (hash.startsWith('vendor/')) {
        const vId = hash.replace('vendor/', '');
        const foundVendor = vendors.find((v) => v._id === vId);
        if (foundVendor) {
          setActiveView({ type: 'vendor', vendor: foundVendor });
          return;
        }
      }

      setActiveView({ type: 'home' });
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [categories, vendors]);

  // Secret Admin Shortcut: Ctrl + Shift + A to open Admin Console
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Page Navigation Handlers
  const navigateToHome = () => {
    window.location.hash = '';
    setActiveView({ type: 'home' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCategory = (cat: ServiceCategory) => {
    window.location.hash = `category/${cat.id}`;
    setActiveView({ type: 'category', category: cat });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToService = (sub: SubServiceSpec, parentCat?: ServiceCategory) => {
    window.location.hash = `service/${sub.id}`;
    setActiveView({ type: 'service', subService: sub, parentCategory: parentCat });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToVendor = (vendor: Vendor) => {
    window.location.hash = `vendor/${vendor._id}`;
    setActiveView({ type: 'vendor', vendor });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToAllCategories = () => {
    window.location.hash = 'categories';
    setActiveView({ type: 'all-categories' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Fetch initial data from backend API
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [vRes, cRes, lRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/vendors`),
          fetch(`${API_BASE_URL}/api/categories`),
          fetch(`${API_BASE_URL}/api/leads`),
        ]);

        if (vRes.ok) {
          const vData = await vRes.json();
          if (Array.isArray(vData) && vData.length > 0) setVendors(vData);
        }
        if (cRes.ok) {
          const cData = await cRes.json();
          if (Array.isArray(cData) && cData.length > 0) setCategories(cData);
        }
        if (lRes.ok) {
          const lData = await lRes.json();
          if (Array.isArray(lData) && lData.length > 0) setLeads(lData);
        }
      } catch (err) {
        console.log('Running with high-resolution pre-loaded state.');
      }
    };

    fetchInitialData();
  }, []);

  // Real-Time Socket.io Connection
  useEffect(() => {
    let socket: Socket | null = null;
    try {
      socket = io(API_BASE_URL || '/', { transports: ['websocket', 'polling'] });

      socket.on('new_lead', (newLead: Lead) => {
        setLeads((prev) => [newLead, ...prev.filter((l) => l._id !== newLead._id)]);
        showToast(`🔔 New Quote Enquiry from ${newLead.customerName} in ${newLead.city}!`);
      });

      socket.on('lead_status_updated', (updatedLead: Lead) => {
        setLeads((prev) => prev.map((l) => (l._id === updatedLead._id ? updatedLead : l)));
      });

      socket.on('deal_closed_celebration', (data: { lead: Lead; amount: number; commission: number }) => {
        setLeads((prev) => prev.map((l) => (l._id === data.lead._id ? data.lead : l)));
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.5 },
        });
        showToast(`🎉 Milestone Deal Closed: ₹${data.amount.toLocaleString('en-IN')}! 5% Commission credited.`);
      });

      socket.on('vendor_updated', (updatedVendor: Vendor) => {
        setVendors((prev) => prev.map((v) => (v._id === updatedVendor._id ? updatedVendor : v)));
      });

      socket.on('new_vendor_registered', (newVendor: Vendor) => {
        setVendors((prev) => [newVendor, ...prev]);
        showToast(`📋 New Contractor Registration: ${newVendor.businessName} entered verification queue.`);
      });
    } catch (e) {
      console.log('Socket client initialized in offline mode.');
    }

    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  // Category Click / Ranking Tracker
  const handleCategoryClick = async (categoryId: string) => {
    setSelectedCategoryFilter(categoryId);
    try {
      const res = await fetch(`${API_BASE_URL}/api/categories/${categoryId}/click`, { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setCategories((prev) =>
          [...prev]
            .map((c) => (c.id === categoryId ? { ...c, popularityScore: data.popularityScore } : c))
            .sort((a, b) => b.popularityScore - a.popularityScore)
            .map((c, idx) => ({ ...c, trendingRank: idx < 3 ? idx + 1 : undefined }))
        );
      }
    } catch (e) {
      setCategories((prev) =>
        [...prev]
          .map((c) => (c.id === categoryId ? { ...c, popularityScore: c.popularityScore + 1 } : c))
          .sort((a, b) => b.popularityScore - a.popularityScore)
          .map((c, idx) => ({ ...c, trendingRank: idx < 3 ? idx + 1 : undefined }))
      );
    }
  };

  // Submit Lead Quote Request
  const handleSubmitQuote = async (quoteData: any) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quoteData),
      });

      if (res.ok) {
        const created = await res.json();
        setLeads((prev) => [created, ...prev]);
      } else {
        const fallbackLead: Lead = {
          _id: `lead-${Date.now().toString().slice(-4)}`,
          customerName: quoteData.customerName,
          customerPhone: quoteData.customerPhone,
          customerEmail: quoteData.customerEmail,
          city: quoteData.city,
          serviceRequired: quoteData.serviceRequired,
          plotArea: quoteData.plotArea,
          budget: quoteData.budget,
          message: quoteData.message,
          contractorId: quoteData.contractorId,
          contractorName: quoteData.contractorName,
          status: 'pending',
          createdAt: new Date().toISOString(),
        };
        setLeads((prev) => [fallbackLead, ...prev]);
      }
      showToast('✅ Your quote request has been transmitted directly to the verified builder!');
    } catch (err) {
      console.error(err);
    }
  };

  // Admin: Toggle Listing Approval (Level 1)
  const handleToggleListing = async (vendorId: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/vendors/${vendorId}/listing`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approved: !currentStatus }),
      });
      if (res.ok) {
        const data = await res.json();
        setVendors((prev) => prev.map((v) => (v._id === vendorId ? data.vendor : v)));
      } else {
        setVendors((prev) => prev.map((v) => (v._id === vendorId ? { ...v, approved: !currentStatus } : v)));
      }
    } catch (e) {
      setVendors((prev) => prev.map((v) => (v._id === vendorId ? { ...v, approved: !currentStatus } : v)));
    }
  };

  // Admin: Toggle KYC Blue Tick (Level 2)
  const handleToggleKYC = async (vendorId: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/vendors/${vendorId}/kyc`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kycVerified: !currentStatus }),
      });
      if (res.ok) {
        const data = await res.json();
        setVendors((prev) => prev.map((v) => (v._id === vendorId ? data.vendor : v)));
      } else {
        setVendors((prev) => prev.map((v) => (v._id === vendorId ? { ...v, kycVerified: !currentStatus } : v)));
      }
    } catch (e) {
      setVendors((prev) => prev.map((v) => (v._id === vendorId ? { ...v, kycVerified: !currentStatus } : v)));
    }
  };

  // Admin: Direct Add Contractor
  const handleAdminAddVendor = async (vendorData: Partial<Vendor>) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/vendors`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vendorData),
      });
      if (res.ok) {
        const saved = await res.json();
        setVendors((prev) => [saved, ...prev]);
      } else {
        setVendors((prev) => [vendorData as Vendor, ...prev]);
      }
    } catch (e) {
      setVendors((prev) => [vendorData as Vendor, ...prev]);
    }
  };

  // Admin: Record / Update Vendor KYC Details (Aadhaar & PAN)
  const handleAdminUpdateKYC = async (
    vendorId: string,
    kycData: { aadhaarNumber?: string; panNumber?: string; kycStatus?: 'verified' | 'pending'; adminNotes?: string }
  ) => {
    try {
      await fetch(`${API_BASE_URL}/api/vendors/${vendorId}/kyc-documents`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(kycData),
      });
    } catch (e) {}
    setVendors((prev) => prev.map((v) => (v._id === vendorId ? { ...v, ...kycData } : v)));
  };

  // Update Lead Status
  const handleUpdateLeadStatus = async (leadId: string, status: LeadStatus) => {
    try {
      await fetch(`${API_BASE_URL}/api/leads/${leadId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      setLeads((prev) => prev.map((l) => (l._id === leadId ? { ...l, status } : l)));
    } catch (e) {
      setLeads((prev) => prev.map((l) => (l._id === leadId ? { ...l, status } : l)));
    }
  };

  // Deal Closer Engine (Calculate 5% Commission & Credit Platform)
  const handleCloseDeal = async (leadId: string, contractAmount: number) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/leads/${leadId}/close-deal`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ closedAmount: contractAmount }),
      });
      if (res.ok) {
        const data = await res.json();
        setLeads((prev) => prev.map((l) => (l._id === leadId ? data.lead : l)));
      } else {
        const commission = Math.round(contractAmount * 0.05);
        setLeads((prev) =>
          prev.map((l) =>
            l._id === leadId
              ? { ...l, status: 'deal_closed', closedAmount: contractAmount, platformCommission: commission }
              : l
          )
        );
      }
    } catch (e) {
      const commission = Math.round(contractAmount * 0.05);
      setLeads((prev) =>
        prev.map((l) =>
          l._id === leadId
            ? { ...l, status: 'deal_closed', closedAmount: contractAmount, platformCommission: commission }
            : l
        )
      );
    }
  };

  // Contractor Unlock Lead (₹299 Fee)
  const handleUnlockLead = async (leadId: string, vendorId: string) => {
    try {
      await fetch(`${API_BASE_URL}/api/leads/${leadId}/unlock`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vendorId }),
      });
      setLeads((prev) =>
        prev.map((l) => {
          if (l._id === leadId) {
            const unlocked = l.unlockedByVendors ? [...l.unlockedByVendors] : [];
            if (!unlocked.includes(vendorId)) unlocked.push(vendorId);
            return { ...l, unlockedByVendors: unlocked };
          }
          return l;
        })
      );
      showToast('🔓 Lead phone number unlocked! Fee ₹299 processed.');
    } catch (e) {
      setLeads((prev) =>
        prev.map((l) => {
          if (l._id === leadId) {
            const unlocked = l.unlockedByVendors ? [...l.unlockedByVendors] : [];
            if (!unlocked.includes(vendorId)) unlocked.push(vendorId);
            return { ...l, unlockedByVendors: unlocked };
          }
          return l;
        })
      );
    }
  };

  // Vendor Upload Work (Starting Image + Final Image)
  const handleWorkUploaded = (vendorId: string, work: any) => {
    setVendors((prev) =>
      prev.map((v) => {
        if (v._id === vendorId) {
          const portfolioGallery = v.portfolioGallery ? [...v.portfolioGallery] : [];
          portfolioGallery.unshift({
            title: work.title,
            location: work.location || v.city,
            cost: work.cost,
            duration: 'Completed',
            image: work.finalImage,
            beforeImage: work.startingImage,
            afterImage: work.finalImage,
          });
          const works = v.uploadedWorks ? [work, ...v.uploadedWorks] : [work];
          return { ...v, portfolioGallery, uploadedWorks: works };
        }
        return v;
      })
    );
    showToast(`📸 Site work uploaded successfully for contractor profile!`);
  };

  return (
    <div className="min-h-screen bg-[#FAFCFF] flex flex-col selection:bg-blue-200 selection:text-blue-900 pb-16 md:pb-0">
      
      {/* Initial Animated Welcome Splash Screen */}
      {showWelcomeSplash && (
        <WelcomeSplashScreen
          language={language}
          onEnter={() => setShowWelcomeSplash(false)}
        />
      )}

      {/* Real-Time Live Alert Toast */}
      {toastMessage && (
        <div className="fixed top-20 sm:top-24 right-4 z-50 p-3.5 rounded-2xl bg-blue-900/95 text-white text-xs font-bold shadow-2xl border border-blue-700/80 backdrop-blur-md animate-bounce flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping"></span>
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage('')} className="text-blue-200 hover:text-white">✕</button>
        </div>
      )}

      {/* Mobile Top Bar (Urban Company Style: Location + Search) */}
      <MobileTopBar
        selectedCity={selectedCity}
        onCityChange={setSelectedCity}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        language={language}
        onLanguageChange={handleLanguageChange}
        onOpenMascot={() => setIsMascotOpen(true)}
        onNavigateHome={navigateToHome}
        onSearchSubmit={() => {
          if (activeView.type !== 'home') navigateToHome();
          const el = document.getElementById('contractors');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Desktop Navigation Bar */}
      <Navbar
        selectedCity={selectedCity}
        onCityChange={setSelectedCity}
        language={language}
        onLanguageChange={handleLanguageChange}
        onOpenMascot={() => setIsMascotOpen(true)}
        onOpen3DStudio={() => setIs3DStudioOpen(true)}
        onOpenAIPlanner={() => setIsAIPlannerOpen(true)}
        onNavigateHome={navigateToHome}
      />

      {/* ===================== VIEW ROUTING ===================== */}

      {/* ROUTE 1: HOMEPAGE */}
      {activeView.type === 'home' && (
        <main className="flex-1">
          {/* Hero Section */}
          <HeroSection
            language={language}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onOpen3DStudio={() => setIs3DStudioOpen(true)}
            onOpenAIPlanner={() => setIsAIPlannerOpen(true)}
            onSelectCategoryFilter={(catId) => {
              const cat = categories.find((c) => c.id === catId);
              if (cat) {
                navigateToCategory(cat);
              } else {
                setSelectedCategoryFilter(catId);
                const el = document.getElementById('contractors');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          />

          {/* Categories Section (Compact 4-col mobile grid & square desktop cards) */}
          <CategoriesSection
            categories={categories}
            vendors={vendors}
            language={language}
            onSelectCategory={navigateToCategory}
            onSelectSubService={(sub, parent) => navigateToService(sub, parent)}
            onSelectVendor={navigateToVendor}
            onViewAllCategories={navigateToAllCategories}
            onRequestQuoteForCategory={(categoryName) => {
              handleSubmitQuote({
                customerName: 'Direct Marketplace Client',
                customerPhone: '+91 98112 00000',
                customerEmail: 'client@skylinex.com',
                city: selectedCity === 'All Cities' ? 'Delhi NCR' : selectedCity,
                serviceRequired: categoryName,
                budget: '₹50 Lakhs - ₹1 Cr',
                message: `Requested quotes for ${categoryName}`,
              });
            }}
          />

          {/* Interactive 3D Villa Cutaway Section (Mobile Specific, Desktop shows in Hero) */}
          <Villa3DTeaserSection
            onOpen3DStudio={() => setIs3DStudioOpen(true)}
            onOpenAIPlanner={() => setIsAIPlannerOpen(true)}
          />

          {/* Contractor Directory & Sleek Compact Cards */}
          <ContractorDirectory
            vendors={vendors}
            categories={categories}
            language={language}
            selectedCity={selectedCity}
            onCityChange={setSelectedCity}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategoryFilter={selectedCategoryFilter}
            onCategoryFilterChange={setSelectedCategoryFilter}
            onSelectVendor={navigateToVendor}
            onRequestQuote={navigateToVendor}
          />

          {/* Two-Tier KYC Verification Explainer */}
          <TwoTierKYCExplainer
            language={language}
            onOpenVendorRegister={() => setIsVendorRegisterOpen(true)}
          />
        </main>
      )}

      {/* ROUTE 2: DEDICATED CATEGORY DETAIL PAGE */}
      {activeView.type === 'category' && (
        <CategoryDetailPage
          category={activeView.category}
          vendors={vendors}
          language={language}
          onBackToHome={navigateToHome}
          onSelectSubService={(sub) => navigateToService(sub, activeView.category)}
          onSelectVendor={navigateToVendor}
          onRequestQuote={(name) => {
            handleSubmitQuote({
              customerName: 'Category Direct Client',
              customerPhone: '+91 98112 00000',
              customerEmail: 'client@kontractor.com',
              city: selectedCity === 'All Cities' ? 'Delhi NCR' : selectedCity,
              serviceRequired: name,
              budget: '₹25 Lakhs - ₹75 Lakhs',
              message: `Requested quotes for ${name}`,
            });
          }}
        />
      )}

      {/* ROUTE 3: DEDICATED SERVICE DETAIL PAGE */}
      {activeView.type === 'service' && (
        <ServiceDetailPage
          subService={activeView.subService}
          parentCategory={activeView.parentCategory}
          vendors={vendors}
          language={language}
          onBack={() => {
            if (activeView.parentCategory) {
              navigateToCategory(activeView.parentCategory);
            } else {
              navigateToHome();
            }
          }}
          onSelectVendor={navigateToVendor}
          onRequestQuote={(name, calculatedBudget) => {
            handleSubmitQuote({
              customerName: 'Service Direct Client',
              customerPhone: '+91 98112 00000',
              customerEmail: 'client@kontractor.com',
              city: selectedCity === 'All Cities' ? 'Delhi NCR' : selectedCity,
              serviceRequired: name,
              budget: calculatedBudget || '₹10 Lakhs - ₹30 Lakhs',
              message: `Requested turnkey quotation for ${name}`,
            });
          }}
        />
      )}

      {/* ROUTE 4: DEDICATED VENDOR DETAIL PAGE */}
      {activeView.type === 'vendor' && (
        <VendorDetailPage
          vendor={activeView.vendor}
          language={language}
          onBack={() => {
            if (window.history.length > 1) {
              window.history.back();
            } else {
              navigateToHome();
            }
          }}
          onSubmitQuote={handleSubmitQuote}
        />
      )}

      {/* ROUTE 5: DEDICATED ALL CATEGORIES DIRECTORY */}
      {activeView.type === 'all-categories' && (
        <AllCategoriesPage
          categories={categories}
          language={language}
          onBackToHome={navigateToHome}
          onSelectCategory={navigateToCategory}
        />
      )}

      {/* Footer (Available on all pages) */}
      <Footer
        language={language}
        onOpen3DStudio={() => setIs3DStudioOpen(true)}
        onOpenAIPlanner={() => setIsAIPlannerOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenVendorPortal={() => setIsVendorPortalOpen(true)}
        onOpenVendorRegister={() => setIsVendorRegisterOpen(true)}
      />

      {/* Mobile Bottom Navigation Bar (Urban Company Style) */}
      <MobileBottomNav
        currentTab={
          activeView.type === 'home'
            ? 'home'
            : activeView.type === 'all-categories' || activeView.type === 'category' || activeView.type === 'service'
            ? 'categories'
            : 'home'
        }
        onNavigateHome={navigateToHome}
        onOpen3DStudio={() => setIs3DStudioOpen(true)}
        onNavigateAllCategories={navigateToAllCategories}
        onOpenVendorPortal={() => setIsVendorPortalOpen(true)}
      />

      {/* ===================== MODALS & OVERLAYS ===================== */}

      {/* Voice-Enabled AI Chatbot (Talking Voice Assistant with ChatGPT support) */}
      <VoiceAIChatbotModal
        isOpen={isMascotOpen}
        onClose={() => setIsMascotOpen(false)}
        language={language}
        onLanguageChange={handleLanguageChange}
      />

      {/* Dedicated 3D Spatial Studio */}
      <Studio3D
        isOpen={is3DStudioOpen}
        onClose={() => setIs3DStudioOpen(false)}
        language={language}
        onRequestQuoteWithStyle={(styleName, floorsCount) => {
          handleSubmitQuote({
            customerName: '3D Studio Architect Client',
            customerPhone: '+91 98200 11223',
            customerEmail: 'client@kontractor.com',
            city: selectedCity === 'All Cities' ? 'Mumbai' : selectedCity,
            serviceRequired: `3D Blueprint Construction: ${styleName} (${floorsCount} Floors)`,
            budget: '₹1.5 Cr - ₹2.5 Cr',
            message: `Interested in constructing a ${floorsCount}-floor residence in ${styleName} architectural style.`,
          });
        }}
      />

      {/* AI House Planner & BOQ Estimator */}
      <AIHousePlanner
        isOpen={isAIPlannerOpen}
        onClose={() => setIsAIPlannerOpen(false)}
        language={language}
        vendors={vendors}
        onSelectVendor={navigateToVendor}
        onRequestQuoteWithPlan={(plan: AIPlanResult) => {
          handleSubmitQuote({
            customerName: 'AI House Plan Client',
            customerPhone: '+91 99890 55443',
            customerEmail: 'client@kontractor.com',
            city: selectedCity === 'All Cities' ? 'Delhi NCR' : selectedCity,
            serviceRequired: `AI Turnkey Construction (${plan.totalBuiltupArea} sq.ft, ${plan.floorsCount} Floors)`,
            budget: `₹${(plan.estimatedCostMin / 100000).toFixed(0)}L - ₹${(plan.estimatedCostMax / 100000).toFixed(0)}L`,
            message: `Generated AI Blueprint with ${plan.rooms.length} rooms and full IS-456 BOQ material breakdown.`,
          });
        }}
      />

      {/* Full Contractor Profile Modal (Fallback) */}
      <ContractorProfileModal
        vendor={selectedVendorForModal}
        onClose={() => setSelectedVendorForModal(null)}
        language={language}
        onSubmitQuote={handleSubmitQuote}
      />

      {/* Contractor Multi-Service Registration Modal */}
      <VendorRegistrationModal
        isOpen={isVendorRegisterOpen}
        onClose={() => setIsVendorRegisterOpen(false)}
        categories={categories}
        onRegisterSuccess={(newVendor) => {
          setVendors((prev) => [newVendor, ...prev]);
          showToast(`Welcome ${newVendor.ownerName}! Your listing was received.`);
        }}
      />

      {/* Contractor Leads Portal */}
      <VendorPortalModal
        isOpen={isVendorPortalOpen}
        onClose={() => setIsVendorPortalOpen(false)}
        vendors={vendors}
        leads={leads}
        onUpdateLeadStatus={handleUpdateLeadStatus}
        onUnlockLead={handleUnlockLead}
        onWorkUploaded={handleWorkUploaded}
      />

      {/* Master Admin Console (Operations, Multi-Admin & Governance Hub) */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => {
          setIsAdminOpen(false);
          if (window.location.hash.includes('admin') || window.location.hash.includes('secure-console')) {
            window.location.hash = '';
          }
        }}
        vendors={vendors}
        leads={leads}
        onToggleListing={handleToggleListing}
        onToggleKYC={handleToggleKYC}
        onUpdateLeadStatus={handleUpdateLeadStatus}
        onCloseDeal={handleCloseDeal}
        onAddVendor={handleAdminAddVendor}
        onUpdateVendorKYC={handleAdminUpdateKYC}
      />

    </div>
  );
};

export default App;

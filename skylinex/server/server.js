import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { randomUUID } from 'crypto';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE']
  }
});

app.use(cors());
app.use(express.json({ limit: '25mb' }));

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/skylinex';

// Try connecting to MongoDB, or gracefully fallback to high-resolution in-memory mock store
let isMongoConnected = false;

// In-Memory Fallback State (Mirroring full database with mockData)
import { VENDORS, CATEGORIES, INITIAL_LEADS, ARCHITECTURAL_STYLES } from './mockSeedData.js';

let dbVendors = JSON.parse(JSON.stringify(VENDORS));
let dbCategories = JSON.parse(JSON.stringify(CATEGORIES));
let dbLeads = JSON.parse(JSON.stringify(INITIAL_LEADS));

// Category popularity clicks map
let categoryClicks = {};
dbCategories.forEach(cat => {
  categoryClicks[cat.id] = cat.popularityScore || 50;
});

mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 2000 })
  .then(() => {
    isMongoConnected = true;
    console.log('✅ Connected to MongoDB at:', MONGODB_URI);
  })
  .catch((err) => {
    isMongoConnected = false;
    console.log('⚠️ MongoDB offline, running in high-resolution In-Memory Data Store mode.');
  });

// Socket.io Real-Time Connection
io.on('connection', (socket) => {
  socket.on('join_vendor', (vendorId) => {
    socket.join(`vendor_${vendorId}`);
  });

  socket.on('join_admin', () => {
    socket.join('admin_channel');
  });
});

// Helper to broadcast lead creation
const broadcastNewLead = (lead) => {
  io.emit('new_lead', lead);
  if (lead.contractorId) {
    io.to(`vendor_${lead.contractorId}`).emit('vendor_new_lead', lead);
  }
};

// Helper to broadcast vendor update
const broadcastVendorUpdate = (vendor) => {
  io.emit('vendor_updated', vendor);
};

// ======================== REST API ROUTES ======================== //

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    platform: 'Kontractor Construction Marketplace',
    mongoConnected: isMongoConnected,
    totalVendors: dbVendors.length,
    totalLeads: dbLeads.length,
    totalCategories: dbCategories.length,
    timestamp: new Date().toISOString()
  });
});

// Categories API with Smart Popularity Ranking
app.get('/api/categories', (req, res) => {
  const sorted = [...dbCategories].sort((a, b) => (b.popularityScore || 0) - (a.popularityScore || 0));
  sorted.forEach((cat, idx) => {
    if (idx < 3) {
      cat.trendingRank = idx + 1;
    } else {
      delete cat.trendingRank;
    }
  });
  res.json(sorted);
});

// Track category interaction / click
app.post('/api/categories/:id/click', (req, res) => {
  const { id } = req.params;
  const category = dbCategories.find(c => c.id === id);
  if (category) {
    category.popularityScore = (category.popularityScore || 50) + 1;
    categoryClicks[id] = category.popularityScore;
    io.emit('category_popularity_updated', { id, popularityScore: category.popularityScore });
    return res.json({ success: true, popularityScore: category.popularityScore });
  }
  res.status(404).json({ error: 'Category not found' });
});

// Vendors API (with filters: city, category, service, search, approvedOnly, kycOnly)
app.get('/api/vendors', (req, res) => {
  const { city, category, service, search, approvedOnly, kycOnly } = req.query;
  let results = [...dbVendors];

  if (city && city !== 'All Cities') {
    results = results.filter(v => v.city.toLowerCase() === city.toLowerCase());
  }

  if (category && category !== 'all') {
    results = results.filter(v => v.category === category || v.servicesOffered.some(s => s.toLowerCase().includes(category.toLowerCase())));
  }

  if (service && service !== 'all') {
    const sLower = service.toLowerCase();
    results = results.filter(v => 
      v.servicesOffered.some(s => s.toLowerCase().includes(sLower)) ||
      (v.subServices && v.subServices.some(sub => sub.toLowerCase().includes(sLower)))
    );
  }

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(v => 
      v.businessName.toLowerCase().includes(q) ||
      v.ownerName.toLowerCase().includes(q) ||
      v.about.toLowerCase().includes(q) ||
      v.servicesOffered.some(s => s.toLowerCase().includes(q))
    );
  }

  if (approvedOnly === 'true') {
    results = results.filter(v => v.approved);
  }

  if (kycOnly === 'true') {
    results = results.filter(v => v.kycVerified);
  }

  // Sort: KYC Verified Pro first, then rating descending
  results.sort((a, b) => {
    if (a.kycVerified && !b.kycVerified) return -1;
    if (!a.kycVerified && b.kycVerified) return 1;
    return b.rating - a.rating;
  });

  res.json(results);
});

// Single Vendor Details
app.get('/api/vendors/:id', (req, res) => {
  const vendor = dbVendors.find(v => v._id === req.params.id);
  if (!vendor) return res.status(404).json({ error: 'Vendor not found' });
  vendor.viewCount = (vendor.viewCount || 0) + 1;
  res.json(vendor);
});

// 3-FIELD VENDOR SIGNUP: Name, Number, Services Offered
app.post('/api/vendors/simple-signup', (req, res) => {
  const { name, phone, services, city } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone number are required.' });
  }

  const cleanPhone = (phone || '').replace(/[^0-9]/g, '');
  const last10 = cleanPhone.slice(-10);
  if (last10.length < 10) {
    return res.status(400).json({ error: 'कृपया मान्य 10 अंकों का मोबाइल नंबर दर्ज करें (Please enter a valid 10-digit mobile number).' });
  }

  // Strict Unique Phone Number Validation: Prevent duplicate contractor signups
  const duplicate = dbVendors.find(v => {
    const existingLast10 = (v.phone || '').replace(/[^0-9]/g, '').slice(-10);
    return existingLast10 === last10;
  });

  if (duplicate) {
    return res.status(400).json({
      error: `यह मोबाइल नंबर (+91 ${last10}) पहले से पंजीकृत है (${duplicate.businessName || duplicate.ownerName})। कृपया वेंडर लॉगिन करें या दूसरा नंबर उपयोग करें।`
    });
  }

  const servicesList = Array.isArray(services) && services.length > 0
    ? services
    : ['Turnkey Civil Construction & Superstructure'];

  const newVendor = {
    _id: `v-${Date.now().toString().slice(-4)}`,
    businessName: req.body.businessName || `${name} कंस्ट्रक्शन एवं सिविल वर्क्स`,
    ownerName: name,
    email: req.body.email || `${name.toLowerCase().replace(/[^a-z0-9]/g, '')}@kontractor.in`,
    phone: `+91 ${last10}`,
    whatsapp: `91${last10}`,
    city: city || 'Delhi NCR',
    category: req.body.category || 'cat-construction-repair',
    servicesOffered: servicesList,
    subServices: servicesList,
    experience: Number(req.body.experience) || 5,
    about: req.body.about || `${name} is an experienced contractor specializing in ${servicesList.slice(0, 2).join(', ')}.`,
    approved: false,     // Enters Level 1 queue for Admin approval
    kycVerified: false,  // Enters Level 2 queue for KYC documents
    documents: [],
    rating: 5.0,
    reviewCount: 0,
    jobs: 0,
    viewCount: 1,
    enquiryCount: 0,
    price: '₹1,850 / sq.ft',
    address: `${city || 'Delhi NCR'}, India`,
    avatar: req.body.avatar || 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=400&q=80',
    certifications: ['IS-456 Structural Standard Compliant'],
    portfolioGallery: [],
    uploadedWorks: [],
    reviewsList: [],
    createdAt: new Date().toISOString()
  };

  dbVendors.unshift(newVendor);
  io.emit('new_vendor_registered', newVendor);
  res.status(201).json({ success: true, vendor: newVendor });
});

// VENDOR LOGIN: By Name and Phone Number
app.post('/api/vendors/login', (req, res) => {
  const { name, phone } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ error: 'Please enter both your name and phone number.' });
  }

  const cleanInputPhone = phone.replace(/[^0-9]/g, '');
  const cleanInputName = name.toLowerCase().trim();

  // Find matching vendor
  const vendor = dbVendors.find(v => {
    const vPhone = (v.phone || '').replace(/[^0-9]/g, '');
    const vOwner = (v.ownerName || '').toLowerCase().trim();
    const vBusiness = (v.businessName || '').toLowerCase().trim();

    const phoneMatch = vPhone.includes(cleanInputPhone) || cleanInputPhone.includes(vPhone.slice(-10));
    const nameMatch = vOwner.includes(cleanInputName) || cleanInputName.includes(vOwner) || vBusiness.includes(cleanInputName);
    return phoneMatch || nameMatch;
  });

  if (vendor) {
    return res.json({ success: true, vendor });
  }

  // If not found, create a seamless new vendor profile
  const newVendor = {
    _id: `v-${Date.now().toString().slice(-4)}`,
    businessName: `${name} Construction Co.`,
    ownerName: name,
    email: `${name.toLowerCase().replace(/[^a-z0-9]/g, '')}@kontractor.in`,
    phone: phone.startsWith('+') ? phone : `+91 ${phone}`,
    whatsapp: cleanInputPhone,
    city: 'Delhi NCR',
    category: 'turnkey-civil',
    servicesOffered: ['Full Turnkey Villa & Independent Floor Construction', 'RCC Superstructure & Slab Casting Work'],
    subServices: ['Full Turnkey Villa & Independent Floor Construction'],
    experience: 5,
    about: `${name} provides professional construction and turnkey civil execution services.`,
    approved: true,
    kycVerified: false,
    documents: [],
    rating: 5.0,
    reviewCount: 0,
    jobs: 1,
    viewCount: 1,
    enquiryCount: 0,
    price: '₹1,850 / sq.ft',
    address: 'Delhi NCR, India',
    avatar: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=400&q=80',
    certifications: ['IS-456 Compliant'],
    portfolioGallery: [],
    uploadedWorks: [],
    reviewsList: []
  };

  dbVendors.unshift(newVendor);
  io.emit('new_vendor_registered', newVendor);
  return res.json({ success: true, vendor: newVendor, isNew: true });
});

// VENDOR WORK UPLOAD: Starting Image (Before) + Final Image (After)
app.post('/api/vendors/:id/work', (req, res) => {
  const { id } = req.params;
  const { title, location, cost, startingImage, finalImage } = req.body;
  const vendor = dbVendors.find(v => v._id === id);
  if (!vendor) return res.status(404).json({ error: 'Vendor not found' });

  const newWork = {
    title: title || 'Completed Residential Project',
    location: location || vendor.city,
    cost: cost || '₹45 Lakhs',
    startingImage: startingImage || 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=800&q=80',
    finalImage: finalImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    uploadedAt: new Date().toISOString()
  };

  if (!vendor.uploadedWorks) vendor.uploadedWorks = [];
  vendor.uploadedWorks.unshift(newWork);

  if (!vendor.portfolioGallery) vendor.portfolioGallery = [];
  vendor.portfolioGallery.unshift({
    title: newWork.title,
    location: newWork.location,
    cost: newWork.cost,
    duration: '6 Months',
    image: newWork.finalImage,
    beforeImage: newWork.startingImage,
    afterImage: newWork.finalImage
  });

  vendor.jobs = (vendor.jobs || 0) + 1;

  broadcastVendorUpdate(vendor);
  io.emit('vendor_work_uploaded', { vendorId: id, work: newWork, vendorName: vendor.businessName });

  res.status(201).json({
    success: true,
    message: 'Project work uploaded successfully! Live on your profile and notified to Admin.',
    vendor,
    work: newWork
  });
});

// Standard Full Vendor Register
app.post('/api/vendors', (req, res) => {
  const phone = req.body.phone;
  const cleanPhone = (phone || '').replace(/[^0-9]/g, '');
  const last10 = cleanPhone.slice(-10);
  if (last10.length < 10) {
    return res.status(400).json({ error: 'कृपया मान्य 10 अंकों का मोबाइल नंबर दर्ज करें।' });
  }

  // Strict Unique Phone Check
  const duplicate = dbVendors.find(v => {
    const existingLast10 = (v.phone || '').replace(/[^0-9]/g, '').slice(-10);
    return existingLast10 === last10;
  });

  if (duplicate) {
    return res.status(400).json({
      error: `यह मोबाइल नंबर (+91 ${last10}) पहले से पंजीकृत है (${duplicate.businessName || duplicate.ownerName})।`
    });
  }

  const newVendor = {
    _id: `v-${Date.now().toString().slice(-4)}`,
    businessName: req.body.businessName,
    ownerName: req.body.ownerName,
    email: req.body.email,
    phone: `+91 ${last10}`,
    whatsapp: `91${last10}`,
    city: req.body.city || 'Delhi NCR',
    category: req.body.category || 'cat-construction-repair',
    servicesOffered: req.body.servicesOffered || ['Turnkey Civil Construction'],
    subServices: req.body.subServices || [],
    experience: Number(req.body.experience) || 3,
    about: req.body.about || 'Specialized civil and architectural services contractor.',
    approved: false,
    kycVerified: false,
    documents: req.body.documents || [],
    rating: 5.0,
    reviewCount: 0,
    jobs: 0,
    viewCount: 1,
    enquiryCount: 0,
    price: req.body.price || '₹1,850 / sq.ft',
    address: req.body.address || `${req.body.city || 'Delhi NCR'}, India`,
    avatar: req.body.avatar || 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=400&q=80',
    certifications: req.body.certifications || ['IS-456 Compliant'],
    portfolioGallery: req.body.portfolioGallery || [],
    uploadedWorks: [],
    reviewsList: [],
    createdAt: new Date().toISOString()
  };

  dbVendors.unshift(newVendor);
  io.emit('new_vendor_registered', newVendor);
  res.status(201).json(newVendor);
});

// Level 1: Platform Listing Approval Toggle
app.patch('/api/vendors/:id/listing', (req, res) => {
  const { id } = req.params;
  const vendor = dbVendors.find(v => v._id === id);
  if (!vendor) return res.status(404).json({ error: 'Vendor not found' });

  vendor.approved = typeof req.body.approved === 'boolean' ? req.body.approved : !vendor.approved;
  broadcastVendorUpdate(vendor);

  res.json({
    success: true,
    message: vendor.approved ? 'Listing approved! Vendor is now public.' : 'Listing suspended.',
    vendor
  });
});

// Level 2: Document KYC Verification Toggle
app.patch('/api/vendors/:id/kyc', (req, res) => {
  const { id } = req.params;
  const vendor = dbVendors.find(v => v._id === id);
  if (!vendor) return res.status(404).json({ error: 'Vendor not found' });

  vendor.kycVerified = typeof req.body.kycVerified === 'boolean' ? req.body.kycVerified : !vendor.kycVerified;
  
  if (vendor.kycVerified) {
    if (!vendor.documents || vendor.documents.length === 0) {
      vendor.documents = [
        { docType: 'GSTIN Verified', docNumber: 'GST-VERIFIED-2026', verifiedAt: new Date().toISOString().split('T')[0], verifiedBy: 'Kontractor Master Admin' },
        { docType: 'Site Physical Audit', docNumber: 'AUDIT-PASS-100', verifiedAt: new Date().toISOString().split('T')[0], verifiedBy: 'Chief Civil Auditor' }
      ];
    }
  }

  broadcastVendorUpdate(vendor);

  res.json({
    success: true,
    message: vendor.kycVerified ? 'KYC Verified! Blue Tick awarded.' : 'KYC Blue Tick revoked.',
    vendor
  });
});

// Admin KYC Documents Update (Aadhaar & PAN)
app.patch('/api/vendors/:id/kyc-documents', (req, res) => {
  const { id } = req.params;
  const vendor = dbVendors.find(v => v._id === id);
  if (!vendor) return res.status(404).json({ error: 'Vendor not found' });

  const { aadhaarNumber, panNumber, kycStatus, adminNotes } = req.body;
  if (aadhaarNumber !== undefined) vendor.aadhaarNumber = aadhaarNumber;
  if (panNumber !== undefined) vendor.panNumber = panNumber;
  if (kycStatus !== undefined) vendor.kycStatus = kycStatus;
  if (adminNotes !== undefined) vendor.adminNotes = adminNotes;

  broadcastVendorUpdate(vendor);
  res.json({ success: true, vendor });
});

// Leads API
app.get('/api/leads', (req, res) => {
  const { contractorId } = req.query;
  let leads = [...dbLeads];

  if (contractorId) {
    leads = leads.filter(l => l.contractorId === contractorId);
  }

  res.json(leads);
});

// Submit Lead / Quote Request
app.post('/api/leads', (req, res) => {
  const newLead = {
    _id: `lead-${Date.now().toString().slice(-4)}`,
    customerName: req.body.customerName,
    customerPhone: req.body.customerPhone,
    customerEmail: req.body.customerEmail,
    city: req.body.city || 'Delhi NCR',
    serviceRequired: req.body.serviceRequired || 'Turnkey Construction',
    plotArea: Number(req.body.plotArea) || 2000,
    budget: req.body.budget || '₹50 Lakhs - ₹1 Cr',
    message: req.body.message || 'Direct quote enquiry from Kontractor marketplace.',
    contractorId: req.body.contractorId,
    contractorName: req.body.contractorName,
    status: 'pending',
    createdAt: new Date().toISOString(),
    unlockedByVendors: []
  };

  dbLeads.unshift(newLead);

  if (req.body.contractorId) {
    const matchedVendor = dbVendors.find(v => v._id === req.body.contractorId);
    if (matchedVendor) {
      matchedVendor.enquiryCount = (matchedVendor.enquiryCount || 0) + 1;
    }
  }

  broadcastNewLead(newLead);
  res.status(201).json(newLead);
});

// Update Lead Status
app.patch('/api/leads/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const lead = dbLeads.find(l => l._id === id);
  if (!lead) return res.status(404).json({ error: 'Lead not found' });

  lead.status = status;
  io.emit('lead_status_updated', lead);
  res.json({ success: true, lead });
});

// Close Deal Engine
app.post('/api/leads/:id/close-deal', (req, res) => {
  const { id } = req.params;
  const { closedAmount } = req.body;
  const lead = dbLeads.find(l => l._id === id);
  if (!lead) return res.status(404).json({ error: 'Lead not found' });

  const amount = Number(closedAmount) || 2500000;
  const commission = Math.round(amount * 0.05);

  lead.status = 'deal_closed';
  lead.closedAmount = amount;
  lead.platformCommission = commission;

  if (lead.contractorId) {
    const vendor = dbVendors.find(v => v._id === lead.contractorId);
    if (vendor) {
      vendor.jobs = (vendor.jobs || 0) + 1;
    }
  }

  io.emit('deal_closed_celebration', { lead, amount, commission });

  res.json({
    success: true,
    message: `Deal closed for ₹${amount.toLocaleString('en-IN')}. 5% Commission ₹${commission.toLocaleString('en-IN')} credited to platform.`,
    lead,
    commission
  });
});

// Contractor Lead Unlock Fee (₹299)
app.post('/api/leads/:id/unlock', (req, res) => {
  const { id } = req.params;
  const { vendorId } = req.body;
  const lead = dbLeads.find(l => l._id === id);
  if (!lead) return res.status(404).json({ error: 'Lead not found' });

  if (!lead.unlockedByVendors) lead.unlockedByVendors = [];
  if (!lead.unlockedByVendors.includes(vendorId)) {
    lead.unlockedByVendors.push(vendorId);
  }

  res.json({
    success: true,
    message: 'Lead unlocked successfully! Fee ₹299 processed.',
    lead
  });
});

// Master Admin Dashboard Metrics
app.get('/api/admin/metrics', (req, res) => {
  const closedLeads = dbLeads.filter(l => l.status === 'deal_closed');
  const totalGMV = closedLeads.reduce((acc, curr) => acc + (curr.closedAmount || 0), 0);
  const totalCommissions = closedLeads.reduce((acc, curr) => acc + (curr.platformCommission || Math.round((curr.closedAmount || 0) * 0.05)), 0);

  let unlockedLeadsCount = 0;
  dbLeads.forEach(l => {
    unlockedLeadsCount += (l.unlockedByVendors ? l.unlockedByVendors.length : 1);
  });
  const totalLeadUnlockRevenue = unlockedLeadsCount * 299;

  const verifiedProsCount = dbVendors.filter(v => v.kycVerified).length;
  const totalSubscriptionRevenue = verifiedProsCount * 2999;

  const netPlatformRevenue = totalCommissions + totalLeadUnlockRevenue + totalSubscriptionRevenue;

  const categoryMatrix = dbCategories.map(cat => {
    const dealsClosed = cat.popularityScore > 90 ? 5 : cat.popularityScore > 80 ? 3 : 2;
    const estimatedGMV = dealsClosed * (cat.id === 'turnkey-civil' ? 18500000 : 4500000);
    const platformEarnings = Math.round(estimatedGMV * 0.05);

    return {
      categoryId: cat.id,
      categoryName: cat.name,
      dealsClosed,
      gmv: estimatedGMV,
      platformCut5Percent: platformEarnings,
      growth: `+${18 + (cat.popularityScore % 15)}%`
    };
  });

  res.json({
    netPlatformRevenue,
    totalGMV,
    totalCommissions,
    totalLeadUnlockRevenue,
    totalSubscriptionRevenue,
    verifiedProsCount,
    totalVendors: dbVendors.length,
    pendingListingApprovals: dbVendors.filter(v => !v.approved).length,
    pendingKycApprovals: dbVendors.filter(v => v.approved && !v.kycVerified).length,
    totalLeads: dbLeads.length,
    closedDealsCount: closedLeads.length,
    monetizationPillars: {
      pillar1_dealCommission: {
        title: '5% Turnkey Milestone Commission',
        revenue: totalCommissions,
        description: '5% escrow platform fee collected upon construction contract milestones.'
      },
      pillar2_leadUnlock: {
        title: '₹299 High-Intent Client Contact Fee',
        revenue: totalLeadUnlockRevenue,
        unlockedCount: unlockedLeadsCount,
        description: 'Direct phone & project blueprint unlock fee paid by contractors.'
      },
      pillar3_subscription: {
        title: '₹2,999/Year Verified Pro Blue Tick',
        revenue: totalSubscriptionRevenue,
        subscribers: verifiedProsCount,
        description: 'Annual KYC compliance & priority algorithmic placement subscription.'
      }
    },
    categoryMatrix
  });
});

// AI House Architectural & BOQ Calculation Engine
app.post('/api/ai/plan-house', (req, res) => {
  const { plotArea, frontWidth, depth, floors, bedrooms, budgetTier, architecturalStyle } = req.body;
  const area = Number(plotArea) || 2400;
  const numFloors = Math.min(Math.max(Number(floors) || 2, 1), 10);
  const numBhk = Number(bedrooms) || 4;

  const totalBuiltupArea = Math.round(area * 0.75 * numFloors);
  
  let ratePerSqft = 1950;
  if (budgetTier === 'luxury') ratePerSqft = 2850;
  if (budgetTier === 'ultra-luxury') ratePerSqft = 3900;
  if (budgetTier === 'standard') ratePerSqft = 1650;

  const estimatedCostMin = Math.round(totalBuiltupArea * ratePerSqft * 0.95);
  const estimatedCostMax = Math.round(totalBuiltupArea * ratePerSqft * 1.12);

  const rooms = [];
  rooms.push({ name: 'Grand Living Hall & Foyer', dimensions: `${Math.round(frontWidth ? frontWidth * 0.6 : 22)} ft x 18 ft`, areaSqft: 396, floor: 1, vastuZone: 'North-East (Ishan)' });
  rooms.push({ name: 'Modern Open Kitchen & Dining', dimensions: '16 ft x 14 ft', areaSqft: 224, floor: 1, vastuZone: 'South-East (Agni)' });
  rooms.push({ name: 'Master Suite with Walk-in Closet', dimensions: '18 ft x 16 ft', areaSqft: 288, floor: numFloors > 1 ? 2 : 1, vastuZone: 'South-West (Nairutya)' });
  rooms.push({ name: 'Puja Sanctum & Water Court', dimensions: '8 ft x 8 ft', areaSqft: 64, floor: 1, vastuZone: 'North-East (Ishan)' });

  for (let i = 2; i <= numBhk; i++) {
    const floorIdx = Math.min(Math.ceil(i / 2), numFloors);
    rooms.push({
      name: `Luxury Bedroom ${i} with Ensuite Bath`,
      dimensions: '15 ft x 14 ft',
      areaSqft: 210,
      floor: floorIdx,
      vastuZone: i % 2 === 0 ? 'North-West (Vayu)' : 'West (Varuna)'
    });
  }

  if (numFloors >= 2) {
    rooms.push({ name: 'Family Lounge & Home Cinema', dimensions: '20 ft x 16 ft', areaSqft: 320, floor: 2, vastuZone: 'North' });
  }

  if (numFloors >= 3) {
    rooms.push({ name: 'Sky Lounge & Terrace Garden Bar', dimensions: '24 ft x 18 ft', areaSqft: 432, floor: numFloors, vastuZone: 'Open Terrace' });
  }

  const cementBags = Math.round(totalBuiltupArea * 0.43);
  const steelTonnes = Number((totalBuiltupArea * 0.0041).toFixed(1));
  const sandCuFt = Math.round(totalBuiltupArea * 1.85);
  const aggregateCuFt = Math.round(totalBuiltupArea * 2.65);
  const bricksCount = Math.round(totalBuiltupArea * 19);

  const boq = [
    { material: 'OPC / PPC 53 Grade Cement (UltraTech / Ambuja)', quantity: `${cementBags.toLocaleString('en-IN')} Bags`, standardUnit: '50kg Bags', isISStandard: 'IS 12269 & IS 1489', estimatedCost: `₹${(cementBags * 410).toLocaleString('en-IN')}` },
    { material: 'Fe550D TMT Earthquake Rebars (Tata Tiscon / JSW)', quantity: `${steelTonnes} Metric Tonnes`, standardUnit: 'Tonnes', isISStandard: 'IS 1786 : 2008 Fe550D', estimatedCost: `₹${Math.round(steelTonnes * 68000).toLocaleString('en-IN')}` },
    { material: 'Coarse River Sand / M-Sand Zone-II', quantity: `${sandCuFt.toLocaleString('en-IN')} cu.ft`, standardUnit: 'Cubic Feet', isISStandard: 'IS 383 : 2016', estimatedCost: `₹${(sandCuFt * 58).toLocaleString('en-IN')}` },
    { material: 'Blue Granite Crushed Coarse Aggregate (10mm & 20mm)', quantity: `${aggregateCuFt.toLocaleString('en-IN')} cu.ft`, standardUnit: 'Cubic Feet', isISStandard: 'IS 383 Graded', estimatedCost: `₹${(aggregateCuFt * 42).toLocaleString('en-IN')}` },
    { material: 'Wire-cut Red Clay Bricks / High-Strength AAC Blocks', quantity: `${bricksCount.toLocaleString('en-IN')} Units`, standardUnit: 'Pieces', isISStandard: 'IS 1077 Class 10', estimatedCost: `₹${(bricksCount * 9).toLocaleString('en-IN')}` }
  ];

  const costDistribution = [
    { component: 'Foundation & Earthwork', percentage: 14, amount: Math.round(estimatedCostMin * 0.14), description: 'Excavation, PCC, raft/isolated footings & plinth beam' },
    { component: 'RCC Structural Superstructure', percentage: 32, amount: Math.round(estimatedCostMin * 0.32), description: 'Columns, beams, slab shuttering, steel binding & casting' },
    { component: 'Brick Masonry & Plastering', percentage: 16, amount: Math.round(estimatedCostMin * 0.16), description: 'External 9" walls, internal 4.5" partitions, 2-coat plaster' },
    { component: 'MEP (Plumbing & Electrical)', percentage: 15, amount: Math.round(estimatedCostMin * 0.15), description: 'Concealed copper wiring, CPVC/UPVC piping & DB distribution' },
    { component: 'Finishing & Architectural Facade', percentage: 23, amount: Math.round(estimatedCostMin * 0.23), description: 'Flooring, painting, doors, windows, sanitaryware & elevation' }
  ];

  const vastuNotes = [
    'Main Entrance placed in North-East (Ishan) or East for abundant positive morning solar prana.',
    'Kitchen designated in South-East (Agni corner) with cooking platform facing East.',
    'Master Bedroom situated in South-West (Nairutya) providing stability, leadership, and restful sleep.',
    'Open Central Core / Atrium (Brahmasthan) kept clutter-free with natural vertical ventilation.'
  ];

  const structuralSafety = [
    'Designed for Seismic Zone IV compliance with ductile detailing as per IS 13920 : 2016.',
    'Minimum M25 grade design mix concrete for columns and suspended roof slabs.',
    'Clear concrete cover maintained at 40mm for columns and 20mm for slabs to prevent rebar corrosion.',
    'Waterproofing crystalline admixture specified in foundation raft and roof slab batching.'
  ];

  const matchedContractorIds = dbVendors
    .filter(v => v.approved && (v.category === 'turnkey-civil' || v.category === 'architectural-elevation'))
    .slice(0, 3)
    .map(v => v._id);

  res.json({
    totalBuiltupArea,
    floorsCount: numFloors,
    estimatedCostMin,
    estimatedCostMax,
    ratePerSqft,
    rooms,
    boq,
    costDistribution,
    vastuNotes,
    structuralSafety,
    matchedContractorIds
  });
});

export default app;

server.listen(PORT, () => {
  console.log(`🚀 Kontractor Server running on port ${PORT}`);
  console.log(`📡 Socket.io live gateway ready`);
});

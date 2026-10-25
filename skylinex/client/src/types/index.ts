export type Language = 'en' | 'hi' | 'hinglish';

export interface PortfolioItem {
  title: string;
  location: string;
  cost: string;
  duration: string;
  image: string;
  beforeImage?: string;
  afterImage?: string;
}

export interface ReviewItem {
  author: string;
  rating: number;
  date: string;
  comment: string;
  projectType: string;
}

export interface DocumentKYC {
  docType: string;
  docNumber: string;
  verifiedAt?: string;
  verifiedBy?: string;
}

export interface UploadedWork {
  title: string;
  location: string;
  cost: string;
  startingImage: string;
  finalImage: string;
  uploadedAt: string;
}

export interface Vendor {
  _id: string;
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  whatsapp?: string;
  city: string;
  category: string;
  servicesOffered: string[];
  subServices?: string[];
  experience: number;
  experienceYears?: number;
  startingPrice?: string;
  about?: string;
  approved: boolean;       // Level 1: Platform listing visibility
  kycVerified: boolean;    // Level 2: Official Blue Tick badge
  documents?: DocumentKYC[];
  rating: number;
  reviewCount: number;
  jobs: number;
  viewCount: number;
  enquiryCount: number;
  price: string;
  address?: string;
  avatar?: string;
  certifications?: string[];
  portfolioGallery?: PortfolioItem[];
  uploadedWorks?: UploadedWork[];
  reviewsList?: ReviewItem[];
  createdAt?: string;
  aadhaarNumber?: string;
  panNumber?: string;
  kycStatus?: 'verified' | 'pending' | 'rejected';
  adminNotes?: string;
}

export interface SubServiceSpec {
  id: string;
  name: string;
  nameEn?: string;
  nameHi?: string;
  nameHinglish?: string;
  unit: string;
  avgRate: string;
  specs: string;
  specsEn?: string;
  specsHi?: string;
  specsHinglish?: string;
  deliverables: string[];
}

export interface CategoryColorTheme {
  bgLight: string;
  border: string;
  text: string;
  accent: string;
  badge: string;
  hoverBorder: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  nameEn?: string;
  nameHi?: string;
  nameHinglish?: string;
  iconName: string;
  description: string;
  descEn?: string;
  descHi?: string;
  descHinglish?: string;
  subServicesCount: number;
  popularityScore: number;
  trendingRank?: number;
  colorTheme: CategoryColorTheme;
  subServices: SubServiceSpec[];
}

export type LeadStatus = 'pending' | 'contacted' | 'quotation_sent' | 'deal_closed' | 'cancelled';

export interface Lead {
  _id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  city: string;
  serviceRequired: string;
  plotArea?: number | string;
  budget?: string;
  message: string;
  contractorId?: string;
  contractorName?: string;
  status: LeadStatus;
  closedAmount?: number;
  contractAmount?: number;
  platformCommission?: number;
  commissionAmount?: number;
  createdAt: string;
  unlockedByVendors?: string[];
}

export interface ArchitecturalStyle {
  id: string;
  name: string;
  tagline: string;
  description: string;
  facadeStyle: string;
  primaryColor: string;
  wallColor: string;
  accentColor: string;
  roofType: 'flat' | 'sloped' | 'terrace' | 'curved' | 'pagoda' | 'dome';
  windowStyle: 'ribbon' | 'arched' | 'grid' | 'full-glass' | 'wood-shutter';
  balconyStyle: 'glass' | 'concrete' | 'jali' | 'steel' | 'wood';
  features: string[];
}

export interface RoomLayout {
  name: string;
  dimensions: string;
  areaSqft: number;
  floor: number;
  vastuZone: string;
}

export interface BOQItem {
  material: string;
  quantity: string;
  standardUnit: string;
  isISStandard: string;
  estimatedCost: string;
}

export interface CostComponent {
  component: string;
  percentage: number;
  amount: number;
  description: string;
}

export interface AIPlanResult {
  totalBuiltupArea: number;
  floorsCount: number;
  estimatedCostMin: number;
  estimatedCostMax: number;
  ratePerSqft: number;
  rooms: RoomLayout[];
  boq: BOQItem[];
  costDistribution: CostComponent[];
  vastuNotes: string[];
  structuralSafety: string[];
  matchedContractorIds: string[];
}

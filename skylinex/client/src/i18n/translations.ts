import { Language } from '../types';

export interface Translations {
  appName: string;
  tagline: string;
  heroHeadline: string;
  heroSubtitle: string;
  searchPlaceholder: string;
  exploreCategories: string;
  view3DStudio: string;
  popularCategories: string;
  trendingRank: string;
  verifiedPro: string;
  registeredPartner: string;
  callContractor: string;
  whatsappChat: string;
  viewProfile: string;
  requestQuote: string;
  aiHousePlanner: string;
  planSubtitle: string;
  generateBlueprint: string;
  studioTitle: string;
  studioSubtitle: string;
  floorSlider: string;
  separationSlider: string;
  dayNightMode: string;
  wireframeMode: string;
  adminHub: string;
  vendorPortal: string;
  joinAsContractor: string;
  selectCity: string;
  mascotGreeting: string;
  mascotVoiceIntro: string;
  mascotButton: string;
  monetizationModel: string;
  level1Badge: string;
  level2Badge: string;
  trustBadge1: string;
  trustBadge2: string;
  trustBadge3: string;
  trustBadge4: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: 'Kontractor',
    tagline: 'घर बनाना है...बन जाएगा • Building Trust, Brick by Brick',
    heroHeadline: 'Crafting Your Dream Home with Pure Trust',
    heroSubtitle: 'Connect directly with verified civil builders, top architects, structural engineers, and luxury interior craftsmen across India.',
    searchPlaceholder: 'Search turnkey contractors, architects, 3D elevation, modular interiors...',
    exploreCategories: 'Explore Construction Verticals',
    view3DStudio: 'Interactive 3D Customizer',
    popularCategories: 'Complete Construction & Architectural Services',
    trendingRank: 'TRENDING',
    verifiedPro: 'Verified Pro',
    registeredPartner: 'Registered Partner',
    callContractor: 'Call Contractor',
    whatsappChat: 'WhatsApp',
    viewProfile: 'Inspect Portfolio & Rates',
    requestQuote: 'Request Direct Quote',
    aiHousePlanner: 'AI Architectural & BOQ Planner',
    planSubtitle: 'Procedural room layouts, IS-code material estimates, and instant turnkey budgets.',
    generateBlueprint: 'Compute Architectural Layout & BOQ',
    studioTitle: '3D Architectural Spatial Studio',
    studioSubtitle: 'Design your luxury home in real-time with customizable rooms, amenities, and 1-10 floors.',
    floorSlider: 'Building Levels (Floors)',
    separationSlider: 'Exploded Floor Separation (Y-Axis)',
    dayNightMode: 'Lighting Mode',
    wireframeMode: 'Structural Wireframe',
    adminHub: 'Admin Portal',
    vendorPortal: 'Contractor Portal',
    joinAsContractor: 'Join as Contractor',
    selectCity: 'Select City',
    mascotGreeting: 'Namaste! I am Chhotu Engineer, your friendly Kontractor building advisor. How can I help construct your dream home?',
    mascotVoiceIntro: 'Welcome to Kontractor! I am Chhotu Engineer. Explore verified builders, customize your dream home in 3D, and calculate exact materials effortlessly.',
    mascotButton: 'Ask Chhotu',
    monetizationModel: 'Platform Governance & Escrow',
    level1Badge: 'Level 1: Platform Listing Verified',
    level2Badge: 'Level 2: Official KYC Blue Tick Pro',
    trustBadge1: 'IS 456 Structural Codes',
    trustBadge2: 'PWD & ISO Certified Pros',
    trustBadge3: 'Direct Phone & WhatsApp',
    trustBadge4: 'Zero Brokerage Guarantee',
  },
  hi: {
    appName: 'Kontractor',
    tagline: 'घर बनाना है...बन जाएगा',
    heroHeadline: 'विश्वास और मजबूती के साथ अपने सपनों का घर बनाएं',
    heroSubtitle: 'IS-456 कोड प्रमाणित सिविल ठेकेदारों, शीर्ष आर्किटेक्ट और स्ट्रक्चरल इंजीनियरों से सीधे जुड़ें। पारदर्शी दरों और 3D विज़ुअलाइज़ेशन के साथ।',
    searchPlaceholder: 'टर्नकी ठेकेदार, आर्किटेक्ट, 3D एलिवेशन, मॉड्यूलर किचन खोजें...',
    exploreCategories: 'सभी निर्माण सेवाएं देखें',
    view3DStudio: '3D हाउस कस्टमाइज़र',
    popularCategories: 'सम्पूर्ण निर्माण एवं आर्किटेक्चरल सेवाएं',
    trendingRank: 'लोकप्रिय',
    verifiedPro: 'सत्यापित प्रो (ब्लू टिक)',
    registeredPartner: 'पंजीकृत पार्टनर',
    callContractor: 'सीधा कॉल करें',
    whatsappChat: 'व्हाट्सएप चैट',
    viewProfile: 'पोर्टफोलियो और रेट देखें',
    requestQuote: 'कोटेशन का अनुरोध करें',
    aiHousePlanner: 'एआई हाउस और सामग्री कैलकुलेटर',
    planSubtitle: 'कमरों का सटीक लेआउट, सीमेंट, सरिया, रेत और ईंट का पूरा ब्यौरा मिनटों में पाएं।',
    generateBlueprint: 'लेआउट और सामग्री विवरण तैयार करें',
    studioTitle: '3D वास्तुकला वर्चुअल स्टूडियो',
    studioSubtitle: 'आधुनिक विला डिज़ाइन, कमरों का कस्टमाइजेशन और 1 से 10 मंजिलों का 3D व्यू।',
    floorSlider: 'इमारत की मंजिलें (1-10)',
    separationSlider: 'फ्लोर अलगाव (Y-अक्ष)',
    dayNightMode: 'दिन / रात रोशनी',
    wireframeMode: 'स्ट्रक्चरल फ्रेमवर्क',
    adminHub: 'एडमिन पोर्टल',
    vendorPortal: 'ठेकेदार पोर्टल',
    joinAsContractor: 'ठेकेदार के रूप में जुड़ें',
    selectCity: 'शहर चुनें',
    mascotGreeting: 'नमस्ते! मैं हूँ छोटू इंजीनियर। आपके सपनों के घर की सही प्लानिंग और बेहतरीन ठेकेदार ढूंढने में आपकी पूरी मदद करूँगा!',
    mascotVoiceIntro: 'कॉन्ट्रैक्टर में आपका स्वागत है! मैं छोटू इंजीनियर हूँ। यहाँ आपको मिलेंगे सबसे भरोसेमंद ठेकेदार और रियल 3D हाउस प्लानर।',
    mascotButton: 'छोटू इंजीनियर से पूछें',
    monetizationModel: 'प्लेटफॉर्म गवर्नेंस',
    level1Badge: 'स्तर 1: प्लेटफॉर्म लिस्टिंग स्वीकृत',
    level2Badge: 'स्तर 2: आधिकारिक केवाईसी ब्लू टिक प्रो',
    trustBadge1: 'IS 456 स्ट्रक्चरल कोड',
    trustBadge2: 'PWD व ISO प्रमाणित एक्सपर्ट्स',
    trustBadge3: 'सीधा फोन व व्हाट्सएप संपर्क',
    trustBadge4: 'शून्य बिचौलिया कमीशन',
  },
  hinglish: {
    appName: 'Kontractor',
    tagline: 'Ghar Banana Hai...Ban Jaayega',
    heroHeadline: 'Apne Dream Home Ko Banayein Strong, Safe & Luxury',
    heroSubtitle: 'Top verified civil contractors, structural engineers aur architects se directly connect karein. 3D custom house planner aur real-time material estimation ke saath.',
    searchPlaceholder: 'Turnkey contractors, interior designers, 3D elevation search karein...',
    exploreCategories: 'Explore Specializations',
    view3DStudio: '3D Customizer Studio',
    popularCategories: 'Complete Construction & Architectural Services',
    trendingRank: 'TRENDING',
    verifiedPro: 'Verified Pro (Blue Tick)',
    registeredPartner: 'Registered Partner',
    callContractor: 'Direct Call Karein',
    whatsappChat: 'WhatsApp Par Baat Karein',
    viewProfile: 'Portfolio & Rates Dekhein',
    requestQuote: 'Direct Quote Maangein',
    aiHousePlanner: 'AI House Layout & Material Estimator',
    planSubtitle: 'Room dimensions, cement-steel BOQ calculation aur accurate turnkey budget estimate.',
    generateBlueprint: 'AI Layout & Material List Nikalein',
    studioTitle: '3D House Exploration Studio',
    studioSubtitle: 'Modern villas, customizable rooms aur floor-by-floor exploded 3D view.',
    floorSlider: 'Floors ki Sankhya (1-10)',
    separationSlider: 'Floors ko Alag Karein (Y-Axis)',
    dayNightMode: 'Day / Night Lighting',
    wireframeMode: 'Structure Inspection',
    adminHub: 'Admin Portal',
    vendorPortal: 'Vendor Portal',
    joinAsContractor: 'Contractor Banein',
    selectCity: 'City Choose Karein',
    mascotGreeting: 'Namaste ji! Main hoon Chhotu Engineer. Aapke construction project ko 100% tension-free aur transparent banane aaya hoon!',
    mascotVoiceIntro: 'Kontractor par welcome! Main hoon Chhotu Engineer. Verified builders aur 3D floor plan ke saath apna ghar aasaani se banayein.',
    mascotButton: 'Chhotu Guide',
    monetizationModel: 'Marketplace Trust',
    level1Badge: 'Level 1: Listing Approved',
    level2Badge: 'Level 2: Official KYC Blue Tick Pro',
    trustBadge1: 'IS 456 Structural Safety',
    trustBadge2: 'Govt & ISO Certified Vendors',
    trustBadge3: 'Direct Phone & WhatsApp Access',
    trustBadge4: 'Zero Middleman Commission',
  },
};

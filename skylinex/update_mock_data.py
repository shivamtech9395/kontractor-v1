import json
import re

with open(r"C:\Users\dell\.gemini\antigravity\scratch\skylinex\categories16.json", "r", encoding="utf-8") as f:
    categories = json.load(f)

# 10 Real Indian Verified Contractors with Aadhaar & PAN details
vendors = [
    {
        "_id": "v-101",
        "businessName": "शर्मा जी राजमिस्त्री एवं सिविल कंस्ट्रक्शन",
        "ownerName": "राजेश शर्मा (हेड मिस्त्री)",
        "email": "sharma.civil@kontractor.in",
        "phone": "+91 98112 34567",
        "whatsapp": "919811234567",
        "city": "Delhi NCR",
        "category": "cat-construction-repair",
        "servicesOffered": [
            "मिस्त्री (Mason)",
            "Labour Mandi",
            "टाइल्स इंस्टॉलर"
        ],
        "subServices": [
            "srv-mistri",
            "srv-labour-mandi",
            "srv-tiles-installer"
        ],
        "experience": 16,
        "about": "16 वर्षों का अनुभव। दिल्ली NCR में 200+ विला, मकान और कोठियों की नींव से लेकर छत ढलाई और प्लास्टर का मजबूत कार्य। समय पर काम और मजबूत जोड़ की पूरी गारंटी।",
        "approved": True,
        "kycVerified": True,
        "kycStatus": "verified",
        "aadhaarNumber": "4521-8890-1234",
        "panNumber": "ALRPS9901M",
        "address": "सेक्टर 62, नोएडा एवं द्वारका मोड़, दिल्ली NCR",
        "rating": 4.9,
        "reviewCount": 84,
        "jobs": 142,
        "viewCount": 1240,
        "enquiryCount": 68,
        "price": "Starts ₹1,650 / sq.ft",
        "avatar": "https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=300&q=80",
        "certifications": [
            "IS-456 Structural Compliant",
            "Master Mason License Delhi"
        ],
        "createdAt": "2026-10-23T10:30:00.000Z"
    },
    {
        "_id": "v-102",
        "businessName": "चौहान प्लंबिंग & सेनेटरी सॉल्यूशंस",
        "ownerName": "विक्रम सिंह चौहान (मास्टर प्लंबर)",
        "email": "vikram.plumbing@kontractor.in",
        "phone": "+91 98201 22334",
        "whatsapp": "919820122334",
        "city": "Mumbai",
        "category": "cat-construction-repair",
        "servicesOffered": [
            "प्लंबर (Plumbing & Sanifit)",
            "वॉटरप्रूफिंग विशेषज्ञ"
        ],
        "subServices": [
            "srv-plumber",
            "srv-waterproofing"
        ],
        "experience": 11,
        "about": "मुंबई एवं नवी मुंबई में लक्ज़री बाथरूम प्लंबिंग, कंसील्ड CPVC पाइपिंग और सीवरेज लाइन। बिना तोड़फोड़ लीकेज डिटेक्शन में विशेषज्ञता।",
        "approved": True,
        "kycVerified": True,
        "kycStatus": "verified",
        "aadhaarNumber": "8812-4309-9021",
        "panNumber": "BVKPC3312K",
        "address": "अंधेरी वेस्ट एवं वाशी, मुंबई",
        "rating": 4.8,
        "reviewCount": 62,
        "jobs": 98,
        "viewCount": 980,
        "enquiryCount": 51,
        "price": "Starts ₹450 / point",
        "avatar": "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=300&q=80",
        "certifications": [
            "Astral Certified Installer",
            "Ashirvad Plumbing Specialist"
        ],
        "createdAt": "2026-10-23T11:15:00.000Z"
    },
    {
        "_id": "v-103",
        "businessName": "रॉयल इलेक्ट्रिकल्स & स्मार्ट होम ऑटोमेशन",
        "ownerName": "अमित वर्मा (इलेक्ट्रिकल कॉन्ट्रैक्टर)",
        "email": "amit.electric@kontractor.in",
        "phone": "+91 98451 99887",
        "whatsapp": "919845199887",
        "city": "Bangalore",
        "category": "cat-construction-repair",
        "servicesOffered": [
            "इलेक्ट्रिशियन (Electrical)",
            "स्मार्ट होम ऑटोमेशन"
        ],
        "subServices": [
            "srv-electrician",
            "srv-smart-security"
        ],
        "experience": 9,
        "about": "बेंगलुरु के विला एवं अपार्टमेंट्स में कंसील्ड FRLS कॉपर वायरिंग, MCB पैनल, स्मार्ट टच स्विच एवं इन्वर्टर बैकअप फिटिंग। 100% शॉर्ट-सर्किट सेफ्टी गारंटी।",
        "approved": True,
        "kycVerified": True,
        "kycStatus": "verified",
        "aadhaarNumber": "9021-3412-7788",
        "panNumber": "AVPRM4419P",
        "address": "व्हाइटफील्ड एवं इंदिरानगर, बेंगलुरु",
        "rating": 4.9,
        "reviewCount": 77,
        "jobs": 110,
        "viewCount": 1150,
        "enquiryCount": 64,
        "price": "Starts ₹500 / point",
        "avatar": "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=300&q=80",
        "certifications": [
            "Licensed Electrical Contractor (Class A)",
            "Schneider Electric Partner"
        ],
        "createdAt": "2026-10-23T12:00:00.000Z"
    },
    {
        "_id": "v-104",
        "businessName": "विश्वकर्मा वुड क्राफ्ट्स & कारपेंट्री",
        "ownerName": "रामगोपाल विश्वकर्मा (मास्टर सुथार)",
        "email": "ramgopal.wood@kontractor.in",
        "phone": "+91 98290 88776",
        "whatsapp": "919829088776",
        "city": "Jaipur",
        "category": "cat-construction-repair",
        "servicesOffered": [
            "कारपेंटर (Carpenter)",
            "फर्नीचर निर्माता"
        ],
        "subServices": [
            "srv-carpenter",
            "srv-furniture-maker"
        ],
        "experience": 18,
        "about": "पीढ़ी-दर-पीढ़ी लकड़ी का सिद्ध अनुभव। सागवान दरवाजे, चौखट, डिजाइनर वार्डरोब, सोफा फ्रेमिंग और मॉड्यूलर किचन का बारीक व टिकाऊ काम।",
        "approved": True,
        "kycVerified": True,
        "kycStatus": "verified",
        "aadhaarNumber": "7612-9901-4433",
        "panNumber": "RGVPR5512N",
        "address": "मानसरोवर एवं वैशाली नगर, जयपुर",
        "rating": 4.9,
        "reviewCount": 91,
        "jobs": 165,
        "viewCount": 1420,
        "enquiryCount": 82,
        "price": "Starts ₹220 / sq.ft",
        "avatar": "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=300&q=80",
        "certifications": [
            "Master Woodcraft Guild Member",
            "Greenply Certified Specialist"
        ],
        "createdAt": "2026-10-23T13:20:00.000Z"
    },
    {
        "_id": "v-105",
        "businessName": "एशियन लक्ज़री पेंटर्स & डेकोरेटर्स",
        "ownerName": "सोनू सैनी (हेड पेंटर)",
        "email": "sonu.paints@kontractor.in",
        "phone": "+91 98150 44332",
        "whatsapp": "919815044332",
        "city": "Chandigarh",
        "category": "cat-construction-repair",
        "servicesOffered": [
            "पेंटर (Painter)",
            "फॉल्स सीलिंग विशेषज्ञ"
        ],
        "subServices": [
            "srv-painter",
            "srv-false-ceiling"
        ],
        "experience": 8,
        "about": "चंडीगढ़, मोहाली और पंचकुला में बिड़ला वॉल पुट्टी, एशियन पेंट्स रॉयल इमल्शन, टेक्सचर डिजाइन और एक्सटीरियर वाटरप्रूफ पेंटिंग। जीरो डस्ट सैंडिंग मशीन से काम।",
        "approved": True,
        "kycVerified": True,
        "kycStatus": "verified",
        "aadhaarNumber": "3390-1122-8765",
        "panNumber": "SSNPS7710B",
        "address": "सेक्टर 35, चंडीगढ़ एवं फेज 7, मोहाली",
        "rating": 4.7,
        "reviewCount": 53,
        "jobs": 74,
        "viewCount": 810,
        "enquiryCount": 42,
        "price": "Starts ₹16 / sq.ft",
        "avatar": "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=300&q=80",
        "certifications": [
            "Asian Paints Master Painter Club",
            "Berger Pro Certified"
        ],
        "createdAt": "2026-10-23T14:10:00.000Z"
    },
    {
        "_id": "v-106",
        "businessName": "भव्य इंटीरियर्स & 3D होम स्टूडियो",
        "ownerName": "भव्य भारद्वाज (आर्किटेक्चरल इंटीरियर डिजाइनर)",
        "email": "bhavya.interiors@kontractor.in",
        "phone": "+91 98710 66554",
        "whatsapp": "919871066554",
        "city": "Delhi NCR",
        "category": "cat-interior-decoration",
        "servicesOffered": [
            "इंटीरियर डिजाइनर",
            "फॉल्स सीलिंग विशेषज्ञ",
            "लाइटिंग विशेषज्ञ"
        ],
        "subServices": [
            "srv-interior-designer",
            "srv-false-ceiling",
            "srv-lighting-expert"
        ],
        "experience": 10,
        "about": "लक्ज़री 3D होम वॉकथ्रू, जिप्सम सीलिंग, इटैलियन किचन और वॉर्डरोब। 100+ विला और लक्ज़री फ्लैट्स का इंटीरियर तैयार किया है।",
        "approved": True,
        "kycVerified": True,
        "kycStatus": "verified",
        "aadhaarNumber": "6677-1234-9988",
        "panNumber": "BBHPS8890C",
        "address": "गोल्फ कोर्स रोड, गुरुग्राम एवं साउथ एक्स, दिल्ली",
        "rating": 4.9,
        "reviewCount": 68,
        "jobs": 89,
        "viewCount": 1390,
        "enquiryCount": 72,
        "price": "Starts ₹65 / sq.ft",
        "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
        "certifications": [
            "Institute of Indian Interior Designers (IIID)",
            "Council of Architecture Affiliate"
        ],
        "createdAt": "2026-10-23T15:00:00.000Z"
    },
    {
        "_id": "v-107",
        "businessName": "अवध बिल्डिंग मटेरियल सप्लायर्स",
        "ownerName": "मुकेश जायसवाल (थोक सामग्री विक्रेता)",
        "email": "awadh.materials@kontractor.in",
        "phone": "+91 94150 77889",
        "whatsapp": "9415077889",
        "city": "Lucknow",
        "category": "cat-supply-logistics",
        "servicesOffered": [
            "निर्माण सामग्री सप्लायर",
            "लॉजिस्टिक्स पार्टनर"
        ],
        "subServices": [
            "srv-material-supplier",
            "srv-logistics-partner"
        ],
        "experience": 14,
        "about": "लखनऊ और कानपुर में अल्ट्राटेक/अंबुजा सीमेंट, टाटा टिस्कॉन सरिया, लाल मौरंग रेत और गिट्टी के अधिकृत डीलर। सीधे कंपनी रेट पर साइट डिलीवरी।",
        "approved": True,
        "kycVerified": True,
        "kycStatus": "verified",
        "aadhaarNumber": "5544-3322-1100",
        "panNumber": "MJWPS2211D",
        "address": "गोमती नगर विस्तार, लखनऊ",
        "rating": 4.8,
        "reviewCount": 59,
        "jobs": 210,
        "viewCount": 1050,
        "enquiryCount": 89,
        "price": "Direct Wholesale Rates",
        "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
        "certifications": [
            "UltraTech Authorized Partner",
            "Tata Tiscon Certified Stockist"
        ],
        "createdAt": "2026-10-23T15:45:00.000Z"
    },
    {
        "_id": "v-108",
        "businessName": "भारत अर्थमूवर्स & कंक्रीट मशीनरी रेंटल्स",
        "ownerName": "संदीप पाटिल (मशीनरी ऑपरेटर & सप्लायर)",
        "email": "bharat.machinery@kontractor.in",
        "phone": "+91 98220 55443",
        "whatsapp": "919822055443",
        "city": "Pune",
        "category": "cat-machinery-equipment",
        "servicesOffered": [
            "मशीनरी रेंटल",
            "टूल्स सप्लायर"
        ],
        "subServices": [
            "srv-machinery-rental",
            "srv-tools-supplier"
        ],
        "experience": 13,
        "about": "पुणे और पिंपरी-चिंचवाड़ में JCB 3DX, 20-टन हाइड्रा क्रेन, डीजल कंक्रीट मिक्सर और स्लैब लिफ्ट मशीन रेंटल। अनुभवी ऑपरेटर के साथ ऑन-टाइम सर्विस।",
        "approved": True,
        "kycVerified": True,
        "kycStatus": "verified",
        "aadhaarNumber": "1199-8877-6655",
        "panNumber": "SPTPS6655E",
        "address": "हिंजेवाड़ी एवं वाकड, पुणे",
        "rating": 4.9,
        "reviewCount": 71,
        "jobs": 180,
        "viewCount": 1180,
        "enquiryCount": 62,
        "price": "Starts ₹1,400 / hr",
        "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
        "certifications": [
            "JCB Certified Operator Fleet",
            "Government RTO Heavy Permit"
        ],
        "createdAt": "2026-10-23T16:15:00.000Z"
    },
    {
        "_id": "v-109",
        "businessName": "स्ट्रक्चरल डिज़ाइन्स & रजिस्टर्ड आर्किटेक्ट्स",
        "ownerName": "अर्. कीर्ति रेड्डी (B.Arch, M.Tech Structural)",
        "email": "kirthi.architect@kontractor.in",
        "phone": "+91 98490 66778",
        "whatsapp": "919849066778",
        "city": "Hyderabad",
        "category": "cat-professional-legal",
        "servicesOffered": [
            "आर्किटेक्ट",
            "सिविल इंजीनियर",
            "लीगल एडवाइज़र"
        ],
        "subServices": [
            "srv-architect",
            "srv-civil-engineer",
            "srv-legal-advisor"
        ],
        "experience": 15,
        "about": "काउंसिल ऑफ आर्किटेक्चर एवं इंस्टीट्यूशन ऑफ इंजीनियर्स द्वारा प्रमाणित। भूकंप रोधी स्ट्रक्चरल डिजाइन (IS-456), GHMC नक्शा सैंक्शन और 3D फ्रंट एलिवेशन।",
        "approved": True,
        "kycVerified": True,
        "kycStatus": "verified",
        "aadhaarNumber": "9900-2211-4455",
        "panNumber": "AKRPR1122F",
        "address": "माधापुर एवं गाचीबोवली, हैदराबाद",
        "rating": 5.0,
        "reviewCount": 86,
        "jobs": 115,
        "viewCount": 1120,
        "enquiryCount": 74,
        "price": "Starts ₹25 / sq.ft",
        "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        "certifications": [
            "Council of Architecture (CA/2011/44910)",
            "Institution of Engineers (MIE)"
        ],
        "createdAt": "2026-10-23T17:00:00.000Z"
    },
    {
        "_id": "v-110",
        "businessName": "सत्यम टाइल्स, ग्रेनाइट & मार्बल फिटिंग",
        "ownerName": "दिनेश प्रजापति (मास्टर कारीगर)",
        "email": "satyam.tiles@kontractor.in",
        "phone": "+91 98980 33445",
        "whatsapp": "919898033445",
        "city": "Ahmedabad",
        "category": "cat-flooring-marble",
        "servicesOffered": [
            "टाइल्स इंस्टॉलर (Tiles & Marble)",
            "वेल्डर (Welder)"
        ],
        "subServices": [
            "srv-tiles-installer",
            "srv-welder"
        ],
        "experience": 12,
        "about": "इटैलियन मार्बल, विट्रीफाइड टाइल्स और ग्रेनाइट किचन प्लेटफॉर्म की लेजर लेवल फिटिंग। मिरर डायमंड पॉलिशिंग और बालकनी ग्रिल फिटिंग के 12 वर्षों के सिद्ध कारीगर।",
        "approved": True,
        "kycVerified": False,
        "kycStatus": "pending",
        "aadhaarNumber": "",
        "panNumber": "",
        "address": "एसजी हाइवे, अहमदाबाद",
        "rating": 4.8,
        "reviewCount": 44,
        "jobs": 82,
        "viewCount": 760,
        "enquiryCount": 36,
        "price": "Starts ₹32 / sq.ft",
        "avatar": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80",
        "certifications": [
            "Kajaria Certified Tile Master",
            "Somany Master Craftsman"
        ],
        "createdAt": "2026-10-23T17:45:00.000Z"
    }
]

# Write to client/src/data/mockData.ts
mock_ts_header = """import { ArchitecturalStyle, ServiceCategory, Vendor, Lead } from '../types';

export const CITIES = [
  "All Cities",
  "Delhi NCR",
  "Mumbai",
  "Bangalore",
  "Hyderabad",
  "Pune",
  "Jaipur",
  "Chennai",
  "Lucknow",
  "Kolkata",
  "Ahmedabad",
  "Chandigarh"
];

export const ARCHITECTURAL_STYLES: ArchitecturalStyle[] = [
  {
    "id": "ultra-modern-villa",
    "name": "Modern Luxury Villa (मॉडर्न विला)",
    "tagline": "Sleek monolithic concrete, cantilevered master decks, and glass curtain walls.",
    "description": "The pinnacle of luxury architecture with double-height atriums, floating cantilevered terraces, and ambient lighting.",
    "facadeStyle": "Monolithic Cantilevered Glass & Concrete",
    "primaryColor": "#F8FAFC",
    "wallColor": "#FFFFFF",
    "accentColor": "#2563EB",
    "roofType": "flat",
    "windowStyle": "full-glass",
    "balconyStyle": "glass",
    "features": [
      "Curtain Wall Low-E Glazing",
      "Floating Cantilever",
      "Concealed Rain Gutters",
      "Polished Concrete"
    ]
  },
  {
    "id": "royal-heritage-haveli",
    "name": "Royal Heritage Haveli (शाही हवेली)",
    "tagline": "Carved pink sandstone, ornate jharokha balconies, and central water courtyard.",
    "description": "Generational Indian luxury reimagined with climate-responsive stone walls, carved chhatri arches, and perforated stone jali.",
    "facadeStyle": "Hand-Carved Sandstone Arches & Jharokhas",
    "primaryColor": "#FFFBEB",
    "wallColor": "#FEF3C7",
    "accentColor": "#D97706",
    "roofType": "terrace",
    "windowStyle": "arched",
    "balconyStyle": "jali",
    "features": [
      "Hand-Carved Stone Jali",
      "Central Water Fountain",
      "Thermal Mass Stone Walls",
      "Ornate Chhatri Pavilions"
    ]
  },
  {
    "id": "biophilic-eco-villa",
    "name": "Biophilic Eco-Green Villa (इको ग्रीन घर)",
    "tagline": "Living vertical foliage walls, cascading balcony planters, and cross-ventilation corridors.",
    "description": "Deep harmony between architecture and nature with automated micro-drip facade gardens and rooftop solar pergola.",
    "facadeStyle": "Tiered Green Planters & Sustainable Timber",
    "primaryColor": "#ECFDF5",
    "wallColor": "#F0FDF4",
    "accentColor": "#10B981",
    "roofType": "terrace",
    "windowStyle": "full-glass",
    "balconyStyle": "glass",
    "features": [
      "Automated Vertical Garden",
      "Central Bamboo Courtyard",
      "Rooftop Solar Pergola",
      "Cross-Ventilation Breeze Shafts"
    ]
  },
  {
    "id": "minimalist-glass-house",
    "name": "Minimalist Glass House (ग्लास हाउस)",
    "tagline": "Floor-to-ceiling panoramic glass, open-plan layout, and minimal steel framework.",
    "description": "Contemporary European minimalism with open daylight atriums, motorized sliding glass, and acoustic timber fins.",
    "facadeStyle": "Structural Steel & Low-E Panorama Glass",
    "primaryColor": "#F0F9FF",
    "wallColor": "#E0F2FE",
    "accentColor": "#0284C7",
    "roofType": "flat",
    "windowStyle": "full-glass",
    "balconyStyle": "glass",
    "features": [
      "Panoramic Picture Glazing",
      "Floating Steel Staircase",
      "Concealed Motorized Blinds",
      "Acoustic Ceiling Panels"
    ]
  }
];
"""

leads = [
  {
    "_id": "lead-1001",
    "customerName": "अशोक सिंघल",
    "customerPhone": "+91 98111 22334",
    "customerEmail": "ashok.singhal@gmail.com",
    "city": "Delhi NCR",
    "serviceRequired": "मिस्त्री (Mason / Brickwork)",
    "plotArea": "1,800 sq.ft (30x60)",
    "budget": "₹35 - ₹50 Lakhs",
    "message": "रोहिणी में G+2 विला बनाना है। मजबूत नींव और लाल ईंट चिनाई के लिए भरोसेमंद राजमिस्त्री और लेबर टीम चाहिए।",
    "contractorId": "v-101",
    "contractorName": "शर्मा जी राजमिस्त्री एवं सिविल कंस्ट्रक्शन",
    "status": "contacted",
    "createdAt": "2026-10-23T14:30:00.000Z"
  },
  {
    "_id": "lead-1002",
    "customerName": "अमृता राव",
    "customerPhone": "+91 98450 44556",
    "customerEmail": "amrita.rao@yahoo.com",
    "city": "Bangalore",
    "serviceRequired": "इंटीरियर डिजाइनर (Interior Designer)",
    "plotArea": "3 BHK (1,650 sq.ft)",
    "budget": "₹12 - ₹18 Lakhs",
    "message": "व्हाइटफील्ड में नए 3 BHK फ्लैट का पूरा मॉडर्न इंटीरियर, वॉर्डरोब, फॉल्स सीलिंग और मॉड्यूलर किचन का काम कराना है।",
    "contractorId": "v-106",
    "contractorName": "भव्य इंटीरियर्स & 3D होम स्टूडियो",
    "status": "deal_closed",
    "closedAmount": 1450000,
    "contractAmount": 1450000,
    "platformCommission": 72500,
    "commissionAmount": 72500,
    "createdAt": "2026-10-22T10:15:00.000Z"
  },
  {
    "_id": "lead-1003",
    "customerName": "संजय कुमावत",
    "customerPhone": "+91 98290 11223",
    "customerEmail": "sanjay.jaipur@gmail.com",
    "city": "Jaipur",
    "serviceRequired": "आर्किटेक्ट (Architect - 2D/3D Map)",
    "plotArea": "2,400 sq.ft (40x60)",
    "budget": "₹60 - ₹80 Lakhs",
    "message": "मानसरोवर में डुप्लेक्स विला का 3D नक्शा, फ्रंट एलिवेशन और स्ट्रक्चरल डिजाइन पास कराना है।",
    "contractorId": "v-109",
    "contractorName": "स्ट्रक्चरल डिज़ाइन्स & रजिस्टर्ड आर्किटेक्ट्स",
    "status": "pending",
    "createdAt": "2026-10-23T16:00:00.000Z"
  }
]

client_file = r"C:\Users\dell\.gemini\antigravity\scratch\skylinex\client\src\data\mockData.ts"
server_file = r"C:\Users\dell\.gemini\antigravity\scratch\skylinex\server\mockSeedData.js"

client_content = mock_ts_header + "\n"
client_content += "export const CATEGORIES: ServiceCategory[] = " + json.dumps(categories, ensure_ascii=False, indent=2) + ";\n\n"
client_content += "export const VENDORS: Vendor[] = " + json.dumps(vendors, ensure_ascii=False, indent=2) + ";\n\n"
client_content += "export const INITIAL_LEADS: Lead[] = " + json.dumps(leads, ensure_ascii=False, indent=2) + ";\n"

with open(client_file, "w", encoding="utf-8") as f:
    f.write(client_content)
print(f"Updated {client_file}")

server_content = "// Seed Data for Kontractor Platform Server\n\n"
server_content += "export const ARCHITECTURAL_STYLES = " + json.dumps(json.loads(json.dumps(categories[:1])), ensure_ascii=False) + ";\n"
server_content += "export const CATEGORIES = " + json.dumps(categories, ensure_ascii=False, indent=2) + ";\n\n"
server_content += "export const VENDORS = " + json.dumps(vendors, ensure_ascii=False, indent=2) + ";\n\n"
server_content += "export const INITIAL_LEADS = " + json.dumps(leads, ensure_ascii=False, indent=2) + ";\n"

with open(server_file, "w", encoding="utf-8") as f:
    f.write(server_content)
print(f"Updated {server_file}")

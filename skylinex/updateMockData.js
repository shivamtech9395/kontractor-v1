import fs from 'fs';
import path from 'path';

const CITIES = [
  'All Cities',
  'Delhi NCR',
  'Mumbai',
  'Bangalore',
  'Hyderabad',
  'Pune',
  'Jaipur',
  'Chennai',
  'Lucknow',
  'Kolkata',
  'Ahmedabad',
  'Chandigarh'
];

const ARCHITECTURAL_STYLES = [
  {
    id: 'ultra-modern-villa',
    name: 'Modern Luxury Villa (मॉडर्न विला)',
    tagline: 'Sleek monolithic concrete, cantilevered master decks, and glass curtain walls.',
    description: 'The pinnacle of luxury architecture with double-height atriums, floating cantilevered terraces, and ambient lighting.',
    facadeStyle: 'Monolithic Cantilevered Glass & Concrete',
    primaryColor: '#F8FAFC',
    wallColor: '#FFFFFF',
    accentColor: '#2563EB',
    roofType: 'flat',
    windowStyle: 'full-glass',
    balconyStyle: 'glass',
    features: ['Curtain Wall Low-E Glazing', 'Floating Cantilever', 'Concealed Rain Gutters', 'Polished Concrete']
  },
  {
    id: 'royal-heritage-haveli',
    name: 'Royal Heritage Haveli (शाही हवेली)',
    tagline: 'Carved pink sandstone, ornate jharokha balconies, and central water courtyard.',
    description: 'Generational Indian luxury reimagined with climate-responsive stone walls, carved chhatri arches, and perforated stone jali.',
    facadeStyle: 'Hand-Carved Sandstone Arches & Jharokhas',
    primaryColor: '#FFFBEB',
    wallColor: '#FEF3C7',
    accentColor: '#D97706',
    roofType: 'terrace',
    windowStyle: 'arched',
    balconyStyle: 'jali',
    features: ['Hand-Carved Stone Jali', 'Central Water Fountain', 'Thermal Mass Stone Walls', 'Ornate Chhatri Pavilions']
  },
  {
    id: 'biophilic-eco-villa',
    name: 'Biophilic Eco-Green Villa (इको ग्रीन घर)',
    tagline: 'Living vertical foliage walls, cascading balcony planters, and cross-ventilation corridors.',
    description: 'Deep harmony between architecture and nature with automated micro-drip facade gardens and rooftop solar pergola.',
    facadeStyle: 'Tiered Green Planters & Sustainable Timber',
    primaryColor: '#ECFDF5',
    wallColor: '#F0FDF4',
    accentColor: '#10B981',
    roofType: 'terrace',
    windowStyle: 'full-glass',
    balconyStyle: 'glass',
    features: ['Automated Vertical Garden', 'Central Bamboo Courtyard', 'Rooftop Solar Pergola', 'Cross-Ventilation Breeze Shafts']
  },
  {
    id: 'minimalist-glass-house',
    name: 'Minimalist Glass House (ग्लास हाउस)',
    tagline: 'Floor-to-ceiling panoramic glass, open-plan layout, and minimal steel framework.',
    description: 'Contemporary European minimalism with open daylight atriums, motorized sliding glass, and acoustic timber fins.',
    facadeStyle: 'Structural Steel & Low-E Panorama Glass',
    primaryColor: '#F0F9FF',
    wallColor: '#E0F2FE',
    accentColor: '#0284C7',
    roofType: 'flat',
    windowStyle: 'full-glass',
    balconyStyle: 'glass',
    features: ['Panoramic Picture Glazing', 'Floating Steel Staircase', 'Concealed Motorized Blinds', 'Acoustic Ceiling Panels']
  }
];

const CATEGORIES = [
  {
    id: 'cat-construction-repair',
    name: 'निर्माण और मरम्मत सेवाएँ (Construction & Repair)',
    iconName: 'Hammer',
    description: 'मिस्त्री, लेबर, प्लंबर, बिजली, कारपेंटर, पेंटर, टाइल्स व रूफिंग की सम्पूर्ण सेवाएँ।',
    subServicesCount: 9,
    popularityScore: 99,
    trendingRank: 1,
    colorTheme: {
      bgLight: 'bg-amber-50/70',
      border: 'border-amber-200/80',
      text: 'text-amber-950',
      accent: 'text-amber-600',
      badge: 'bg-amber-100 text-amber-800',
      hoverBorder: 'hover:border-amber-400'
    },
    subServices: [
      {
        id: 'srv-mistri',
        name: 'मिस्त्री (Mason / Brickwork)',
        unit: 'sq.ft',
        avgRate: '₹35 - ₹55 / sq.ft (Labour) • ₹1,650 / sq.ft (Turnkey)',
        specs: 'अनुभवी राजमिस्त्री द्वारा नींव खुदाई, ईंट-चिनाई, प्लास्टर, आरसीसी ढलाई एवं फिनिशिंग वर्क।',
        deliverables: ['नींव और पिलर लेआउट', '9-इंच और 4.5-इंच ईंट चिनाई', 'सीलिंग और दीवार प्लास्टर', 'वाटरप्रूफिंग क्योरिंग']
      },
      {
        id: 'srv-labour-mandi',
        name: 'Labour Mandi (दैनिक लेबर / बेलदार)',
        unit: 'day',
        avgRate: '₹550 - ₹750 / day per labourer',
        specs: 'कुशल और अकुशल दिहाड़ी मजदूर, मलबा उठाने वाले, मसाला मिलाने वाले और लोडिंग-अनलोडिंग लेबर।',
        deliverables: ['साइट सफाई और मलबा हटाना', 'सीमेंट-रेत मसाला मिलाना', 'ईंट और मटेरियल ऊपर चढ़ाना', 'साइट खुदाई कार्य']
      },
      {
        id: 'srv-plumber',
        name: 'प्लंबर (Plumbing & Sanifit)',
        unit: 'point',
        avgRate: '₹400 - ₹650 / point • ₹15,000 / bathroom turnkey',
        specs: 'कंसील्ड CPVC/UPVC पाइप फिटिंग, वाटर टैंक इंस्टॉलेशन, गीजर, शॉवर और सीवरेज लाइन।',
        deliverables: ['कंसील्ड पाइपलाइन कटिंग और फिटिंग', 'वाटर प्रेशर टेस्टिंग', 'टॉयलेट सीट और ड्रेनेज कनेक्शन', 'वाटर टैंक फिटिंग']
      },
      {
        id: 'srv-electrician',
        name: 'इलेक्ट्रिशियन (Electrical & Smart Wiring)',
        unit: 'point',
        avgRate: '₹450 - ₹700 / point • ₹25,000 / floor turnkey',
        specs: 'कंसील्ड कंड्यूट पाइपिंग, कॉपर वायर पुलिंग, MCB डिस्ट्रीब्यूशन बॉक्स, इन्वर्टर और मॉडर्न स्विच प्लेट्स।',
        deliverables: ['दीवार झिरी कटिंग और पाइप बिछाना', 'Havells/Polycab वायर पुलिंग', 'MCB और अर्थिंग कनेक्शन', 'लाइटिंग और फैन फिटिंग']
      },
      {
        id: 'srv-carpenter',
        name: 'कारपेंटर (Carpenter & Woodwork)',
        unit: 'sq.ft',
        avgRate: '₹180 - ₹350 / sq.ft (Labour)',
        specs: 'दरवाजे, चौखट, अलमारी, वॉर्डरोब, मॉड्यूलर किचन कैबिनेट्स और वुडन फ्लोरिंग कार्य।',
        deliverables: ['चौखट और फ्लश डोर फिटिंग', 'सॉफ्ट-क्लोज हिंज इंस्टॉलेशन', 'प्लाईवुड वॉर्डरोब फ्रेमिंग', 'लैमिनेट/माइका पेस्टिंग']
      },
      {
        id: 'srv-painter',
        name: 'पेंटर (Painter & Whitewash)',
        unit: 'sq.ft',
        avgRate: '₹14 - ₹28 / sq.ft (Labour + Material)',
        specs: '2-कोट वॉल पुट्टी, प्राइमर, एशियन पेंट्स रॉयल लक्ज़री इमल्शन, टेक्सचर और वॉटरप्रूफ एक्सटीरियर पेंट।',
        deliverables: ['वॉल सैंडिंग और दरार भराई', '2-कोट बिड़ला पुट्टी', '1-कोट प्राइमर', '2-कोट प्रीमियम पेंट फिनिश']
      },
      {
        id: 'srv-welder',
        name: 'वेल्डर (Welder & Metal Fabrication)',
        unit: 'kg',
        avgRate: '₹110 - ₹160 / kg (MS) • ₹380 / kg (SS 304)',
        specs: 'मेन गेट, बालकनी ग्रिल, सीढ़ी रेलिंग, शेड स्ट्रक्चर और सिक्योरिटी विंडो ग्रिल फैब्रिकेशन।',
        deliverables: ['कटिंग, बेंडिंग और वेल्डिंग', 'एंटी-रस्ट रेड ऑक्साइड कोटिंग', 'प्रीमियम इनैमल पेंट', 'साइट इंस्टॉलेशन']
      },
      {
        id: 'srv-tiles-installer',
        name: 'टाइल्स इंस्टॉलर (Tiles & Marble Installer)',
        unit: 'sq.ft',
        avgRate: '₹28 - ₹45 / sq.ft (Tiles) • ₹55 - ₹85 / sq.ft (Marble)',
        specs: 'विट्रीफाइड टाइल्स, इटैलियन मार्बल, ग्रेनाइट किचन स्लैब कटिंग और मिरर पॉलिशिंग कार्य।',
        deliverables: ['फ्लोर लेवलिंग और मसाला बेड', 'लेजर लेवल टाइल अलाइनमेंट', 'इपॉक्सी ग्राउटिंग', 'मार्बल डायमंड पॉलिश']
      },
      {
        id: 'srv-roofing',
        name: 'रूफिंग विशेषज्ञ (Roofing & Waterproofing)',
        unit: 'sq.ft',
        avgRate: '₹45 - ₹95 / sq.ft',
        specs: 'छत लीकेज प्रूफिंग, इलास्टोमेरिक कोटिंग, फाइबर मेश, टिन शेड और हीट-इंसुलेटेड रूफिंग शीट्स।',
        deliverables: ['छत की दरार ग्राउटिंग', '3-कोट वॉटरप्रूफिंग केमिकल', 'फाइबर मेश रीइन्फोर्समेंट', 'पॉन्ड टेस्टिंग (पानी भर कर जांच)']
      }
    ]
  },
  {
    id: 'cat-interior-decoration',
    name: 'इंटीरियर और डेकोरेशन सेवाएँ (Interior & Decoration)',
    iconName: 'Palette',
    description: 'इंटीरियर डिजाइनर, फॉल्स सीलिंग, वॉर्म लाइटिंग और कस्टमाइज़्ड फर्नीचर।',
    subServicesCount: 4,
    popularityScore: 96,
    trendingRank: 2,
    colorTheme: {
      bgLight: 'bg-purple-50/70',
      border: 'border-purple-200/80',
      text: 'text-purple-950',
      accent: 'text-purple-600',
      badge: 'bg-purple-100 text-purple-800',
      hoverBorder: 'hover:border-purple-400'
    },
    subServices: [
      {
        id: 'srv-interior-designer',
        name: 'इंटीरियर डिजाइनर (Interior Designer & 3D Plan)',
        unit: 'sq.ft',
        avgRate: '₹45 - ₹95 / sq.ft (Design) • ₹1,450 / sq.ft (Full Execution)',
        specs: '3D वॉकथ्रू, वास्तु अनुकूलित स्पेस प्लानिंग, मटेरियल सिलेक्शन और टर्नकी साइट एग्जीक्यूशन।',
        deliverables: ['3D फोटो-रियलिस्टिक रेंडर्स', 'मटेरियल BOQ स्पेसिफिकेशन', 'ऑन-साइट सुपरविजन', 'फाइनल हैंडओवर']
      },
      {
        id: 'srv-false-ceiling',
        name: 'फॉल्स सीलिंग विशेषज्ञ (False Ceiling & POP)',
        unit: 'sq.ft',
        avgRate: '₹95 - ₹145 / sq.ft',
        specs: 'सेंट-गोबेन जिप्रॉक बोर्ड, जीआई चैनल फ्रेमिंग, कोव लाइट स्लॉट और डिजाइनर सीलिंग कटआउट्स।',
        deliverables: ['जीआई चैनल ग्रिड इंस्टॉलेशन', '12.5mm जिप्सम बोर्ड फिक्सिंग', 'जॉइंट टेपिंग व पुट्टी फिनिश', 'कोव लाइटिंग स्लॉट्स']
      },
      {
        id: 'srv-lighting-expert',
        name: 'लाइटिंग विशेषज्ञ (Architectural Lighting)',
        unit: 'point',
        avgRate: '₹150 - ₹350 / fixture',
        specs: '3000K वॉर्म व्हाइट प्रोफाइल लाइट्स, मैग्नेटिक ट्रैक लाइट्स, झूमर और आउटडोर फसाड लाइटिंग।',
        deliverables: ['एलईडी प्रोफाइल कटिंग और पेस्टिंग', 'ड्राइवर/एसएमपीएस इंस्टॉलेशन', 'कंसील्ड स्पॉटलाइट प्लेसमेंट', 'स्मार्ट डिमिंग कंट्रोल']
      },
      {
        id: 'srv-furniture-maker',
        name: 'फर्नीचर निर्माता (Modular Furniture Maker)',
        unit: 'sq.ft',
        avgRate: '₹1,250 - ₹2,200 / sq.ft',
        specs: 'मॉड्यूलर किचन, हाइड्रोलिक बेड, टीवी यूनिट, शू रैक और हेफेले हार्डवेयर युक्त वॉर्डरोब।',
        deliverables: ['एचडीएचएमआर वाटरप्रूफ बोर्ड', 'एंटी-स्क्रैच ऐक्रेलिक/लैमिनेट', 'सॉफ्ट-क्लोज ड्रॉअर चैनल्स', 'ऑन-साइट इंस्टॉलेशन']
      }
    ]
  },
  {
    id: 'cat-supply-logistics',
    name: 'सप्लाई और लॉजिस्टिक्स (Supply & Logistics)',
    iconName: 'Tractor',
    description: 'सीमेंट, रेत, ईंट, सरिया, पेंट, प्लंबिंग हार्डवेयर और डंपर ट्रांसपोर्ट सप्लाई।',
    subServicesCount: 5,
    popularityScore: 92,
    trendingRank: 3,
    colorTheme: {
      bgLight: 'bg-emerald-50/70',
      border: 'border-emerald-200/80',
      text: 'text-emerald-950',
      accent: 'text-emerald-600',
      badge: 'bg-emerald-100 text-emerald-800',
      hoverBorder: 'hover:border-emerald-400'
    },
    subServices: [
      {
        id: 'srv-material-supplier',
        name: 'निर्माण सामग्री सप्लायर (Cement, Sand, Bricks & TMT)',
        unit: 'truck / ton',
        avgRate: 'थोक मंडी रेट (Wholesale Mandi Rates)',
        specs: 'अल्ट्राटेक/एसीसी सीमेंट, यमुना रेत, लाल ईंटें, फ्लाई ऐश एएसी ब्लॉक्स और टाटा टिस्कॉन सरिया।',
        deliverables: ['क्वालिटी टेस्टिंग रिपोर्ट', 'ऑन-साइट डायरेक्ट डंपर डिलीवरी', 'वजन कांटा पर्ची', 'उचित बिलिंग']
      },
      {
        id: 'srv-paint-supplier',
        name: 'पेंट सप्लायर (Paint & Wall Putty Wholesaler)',
        unit: 'bucket',
        avgRate: '15-20% डिस्काउंट ऑन एमआरपी',
        specs: 'एशियन पेंट्स, बर्जर, नेरोलैक, बिड़ला वाइट पुट्टी, वाटरप्रूफिंग केमिकल्स और रोलर ब्रश।',
        deliverables: ['ओरिजिनल बैच वारंटी', 'कंप्यूटराइज्ड कलर मिक्सिंग शेड', 'थोक दर सप्लाई', 'डोरस्टेप डिलीवरी']
      },
      {
        id: 'srv-hardware-supplier',
        name: 'हार्डवेयर सप्लायर (Sanitary, Pipes & Hardware)',
        unit: 'piece',
        avgRate: 'थोक दर (Dealer Wholesale Pricing)',
        specs: 'सुप्रीम/एस्ट्रल सीपीवीसी पाइप, जगुआर/सेरा बाथ फिटिंग्स, हिंज, कब्जे और नट-बोल्ट्स।',
        deliverables: ['ब्रांडेड गारंटी कार्ड्स', 'आइटमाइज्ड मटीरियल डिलीवरी', 'आसान एक्सचेंज पॉलिसी', 'पूर्ण तकनीकी सहायता']
      },
      {
        id: 'srv-logistics-partner',
        name: 'लॉजिस्टिक्स पार्टनर (Dumper & Truck Transport)',
        unit: 'trip',
        avgRate: '₹1,500 - ₹3,500 / trip (लोकल)',
        specs: 'टाटा 407, डंपर, महिंद्रा पिकअप द्वारा निर्माण सामग्री और मलबा ढुलाई सेवा।',
        deliverables: ['समय पर डिलीवरी', 'लोडिंग-अनलोडिंग सपोर्ट', 'जीपीएस ट्रैक्ड गाड़ियाँ', 'सुरक्षित माल परिवहन']
      },
      {
        id: 'srv-warehouse-manager',
        name: 'वेयरहाउस मैनेजर (Material Storage & Safe Depot)',
        unit: 'month',
        avgRate: 'कस्टम वॉल्यूम दर',
        specs: 'सीमेंट और महंगी फिटिंग्स को बारिश और नमी से सुरक्षित रखने के लिए कवर्ड गोदाम सुविधा।',
        deliverables: ['वाटरप्रूफ कवर्ड शेड', '24x7 सीसीटीवी सुरक्षा', 'इन्वेंट्री स्टॉक ट्रैकिंग', 'लोकल डिस्पैच']
      }
    ]
  },
  {
    id: 'cat-machinery-equipment',
    name: 'मशीनरी और उपकरण सेवाएँ (Machinery & Equipment)',
    iconName: 'Wrench',
    description: 'JCB खुदाई, क्रेन, कंक्रीट मिक्सर मशीन, शटरिंग प्लेट्स और सेफ्टी गियर रेंटल।',
    subServicesCount: 3,
    popularityScore: 88,
    colorTheme: {
      bgLight: 'bg-blue-50/70',
      border: 'border-blue-200/80',
      text: 'text-blue-950',
      accent: 'text-blue-600',
      badge: 'bg-blue-100 text-blue-800',
      hoverBorder: 'hover:border-blue-400'
    },
    subServices: [
      {
        id: 'srv-machinery-rental',
        name: 'मशीनरी रेंटल (JCB Excavator, Crane & Concrete Mixer)',
        unit: 'hour / day',
        avgRate: '₹1,200 - ₹1,800 / hour (JCB with Diesel)',
        specs: 'JCB 3DX खुदाई मशीन, हाइड्रा क्रेन, डीजल कंक्रीट मिक्सर और कंक्रीट वाइब्रेटर रेंटल।',
        deliverables: ['अनुभवी ड्राइवर/ऑपरेटर सहित', 'डीजल और मेंटेनेंस शामिल', 'तत्काल साइट रिपोर्टिंग', 'सटीक ऑवर-मीटर गणना']
      },
      {
        id: 'srv-safety-gear',
        name: 'सुरक्षा उपकरण सप्लायर (Safety Gear & Netting)',
        unit: 'set',
        avgRate: '₹450 - ₹1,200 / worker kit',
        specs: 'आईएसआई मार्क सेफ्टी हेलमेट, रिफ्लेक्टिव जैकेट, सेफ्टी बूट्स, फॉल-अरेस्ट बेल्ट और ग्रीन सेफ्टी नेट।',
        deliverables: ['आईएस-प्रमाणित सुरक्षा किट', 'मजबूत ग्रीन शेड नेटिंग', 'फास्ट-ऐड मेडिकल किट', 'साइट सेफ्टी गाइडेंस']
      },
      {
        id: 'srv-tools-supplier',
        name: 'टूल्स सप्लायर (Power Tools & Shuttering Plates)',
        unit: 'day / piece',
        avgRate: '₹25 - ₹40 / shuttering plate / month',
        specs: 'लोहे की शटरिंग प्लेट्स, एडजस्टेबल प्रॉप्स (स्पैन), हैमर ड्रिल, एंगल ग्राइंडर और कटर।',
        deliverables: ['सीधी और मजबूत स्टील प्लेट्स', 'हैवी-ड्यूटी जैक प्रॉप्स', 'पावर टूल्स का ऑन-साइट डेमो', 'किफायती रेंटल प्लान्स']
      }
    ]
  },
  {
    id: 'cat-digital-support',
    name: 'डिजिटल और सपोर्ट सेवाएँ (Digital & Support)',
    iconName: 'Zap',
    description: 'कस्टमर सपोर्ट, एस्क्रो पेमेंट गेटवे, साइट वीडियोग्राफी और स्मार्ट होम ऑटोमेशन।',
    subServicesCount: 5,
    popularityScore: 84,
    colorTheme: {
      bgLight: 'bg-cyan-50/70',
      border: 'border-cyan-200/80',
      text: 'text-cyan-950',
      accent: 'text-cyan-600',
      badge: 'bg-cyan-100 text-cyan-800',
      hoverBorder: 'hover:border-cyan-400'
    },
    subServices: [
      {
        id: 'srv-it-automation',
        name: 'आईटी डेवलपर्स (Smart Home Automation)',
        unit: 'point',
        avgRate: '₹18,000 - ₹45,000 / flat',
        specs: 'मोबाइल ऐप से लाइट, पंखा, एसी कंट्रोल, वाईफाई वीडियो डोरबेल और बायोमेट्रिक डिजिटल लॉक।',
        deliverables: ['स्मार्ट स्विच बोर्ड मॉड्यूल', 'मोबाइल ऐप सेटअप व पेयरिंग', 'वॉइस कंट्रोल (Alexa / Google)', '1 साल की वारंटी']
      },
      {
        id: 'srv-payment-gateway',
        name: 'पेमेंट गेटवे प्रदाता (Escrow & Milestone Payments)',
        unit: 'transaction',
        avgRate: 'Zero Brokerage • 100% Secure',
        specs: 'काम के हर चरण (फाउंडेशन, लेंटर, फिनिशिंग) के पूरा होने पर ही ठेकेदार को पेमेंट रिलीज की सुविधा।',
        deliverables: ['डिजिटल रसीद और टैक्स इनवॉइस', 'माइलस्टोन आधारित फंड रिलीज', 'विवाद निवारण सहायता', '100% सुरक्षित भुगतान']
      },
      {
        id: 'srv-customer-support',
        name: 'कस्टमर सपोर्ट टीम (24x7 Dedicated Site Support)',
        unit: 'support',
        avgRate: 'फ्री फॉर ऑल रजिस्टर्ड प्रोजेक्ट्स',
        specs: 'कॉल, व्हाट्सएप और ऑन-साइट समन्वय के लिए प्रशिक्षित कंस्ट्रक्शन सपोर्ट टीम।',
        deliverables: ['क्वालिटी ऑडिट सपोर्ट', 'टाइमलाइन मॉनिटरिंग', 'ठेकेदार समन्वय', 'तुरंत शिकायत समाधान']
      },
      {
        id: 'srv-marketing-agency',
        name: 'मार्केटिंग एजेंसी (Real Estate Marketing & Leads)',
        unit: 'campaign',
        avgRate: 'कस्टम पैकेज',
        specs: 'बिल्डरों और ठेकेदारों के प्रोजेक्ट्स के लिए डिजिटल विज्ञापन और हाई-क्वालिटी क्लाइंट लीड्स।',
        deliverables: ['गूगल और सोशल मीडिया एड्स', 'ब्रांडेड ब्रोशर डिजाइनिंग', 'सत्यापित क्लाइंट लीड्स', 'आरओआई ट्रैकिंग']
      },
      {
        id: 'srv-videographer',
        name: 'फोटोग्राफर / वीडियोग्राफर (Drone Survey & Site Video)',
        unit: 'shoot',
        avgRate: '₹3,500 - ₹8,500 / shoot',
        specs: '4K ड्रोन वीडियोग्राफी, बिफोर-आफ्टर कंस्ट्रक्शन टाइमलैप्स और सोशल मीडिया रील्स।',
        deliverables: ['4K ड्रोन एरियल फुटेज', 'कंस्ट्रक्शन टाइमलैप्स वीडियो', 'हाई-रेज़ोल्यूशन साइट फोटोज', 'कस्टमर रेडी वीडियो']
      }
    ]
  },
  {
    id: 'cat-professional-legal',
    name: 'प्रोफेशनल और कानूनी सेवाएँ (Professional & Legal)',
    iconName: 'Compass',
    description: 'आर्किटेक्ट नक्शा, सिविल स्ट्रक्चरल इंजीनियर, नगर निगम पासिंग और होम लोन सीए।',
    subServicesCount: 4,
    popularityScore: 95,
    trendingRank: 4,
    colorTheme: {
      bgLight: 'bg-indigo-50/70',
      border: 'border-indigo-200/80',
      text: 'text-indigo-950',
      accent: 'text-indigo-600',
      badge: 'bg-indigo-100 text-indigo-800',
      hoverBorder: 'hover:border-indigo-400'
    },
    subServices: [
      {
        id: 'srv-architect',
        name: 'आर्किटेक्ट (Architect - 2D/3D Map & Elevation)',
        unit: 'sq.ft',
        avgRate: '₹18 - ₹45 / sq.ft',
        specs: 'वास्तु अनुकूलित फ्लोर प्लान, 3D फ्रंट एलिवेशन, नगर निगम/प्राधिकरण सेंक्शन ड्राइंग्स।',
        deliverables: ['वास्तु कम्प्लायंट 2D वर्किंग ड्राइंग्स', '4K 3D फ्रंट एलिवेशन', 'स्ट्रक्चरल कॉलम लेआउट', 'प्लानिंग सेंक्शन सपोर्ट']
      },
      {
        id: 'srv-civil-engineer',
        name: 'सिविल इंजीनियर (Civil & Structural Engineer)',
        unit: 'sq.ft',
        avgRate: '₹12 - ₹25 / sq.ft',
        specs: 'आईएस 456 और आईएस 1893 भूकंपरोधी बीम-कॉलम सरिया डिजाइन, सॉइल टेस्टिंग और क्वालिटी ऑडिट।',
        deliverables: ['सरिया और कंक्रीट बीओक्यू शेड्यूल', 'अर्थक्वेक रेसिस्टेंट डिजाइन रिपोर्ट', 'साइट कंक्रीट टेस्टिंग इंस्पेक्शन', 'स्ट्रक्चरल स्टेबिलिटी सर्टिफिकेट']
      },
      {
        id: 'srv-legal-advisor',
        name: 'लीगल एडवाइज़र (Land Registry & Building Approval)',
        unit: 'case',
        avgRate: '₹5,000 - ₹15,000 / legal vetting',
        specs: 'जमीन की रजिस्ट्री जांच, टाइटल डीड सर्च, नगर निगम/बीडीए नक्शा पासिंग और म्यूटेशन कार्य।',
        deliverables: ['30-वर्षीय सर्च रिपोर्ट', 'बिल्डिंग बायलॉज अनुपालन', 'एग्रीमेंट टू सेल ड्राफ्टिंग', 'रजिस्ट्री एवं नामांतरण सहायता']
      },
      {
        id: 'srv-finance-ca',
        name: 'फाइनेंस / CA (Home Construction Loan & GST)',
        unit: 'case',
        avgRate: 'फ्री लोन प्रोसेसिंग कंसल्टेशन',
        specs: 'एसबीआई, एचडीएफसी और प्रमुख बैंकों से आसान होम कंस्ट्रक्शन लोन, एस्टीमेट सर्टिफिकेशन और सीए रिपोर्ट।',
        deliverables: ['सीए प्रमाणित नेट-वर्थ रिपोर्ट', 'लोन प्रोजेक्ट एस्टीमेट सर्टिफिकेट', 'जीएसटी इनपुट टैक्स क्रेडिट गाइडेंस', 'फास्ट लोन डिस्बर्सल']
      }
    ]
  }
];

const VENDORS = [
  {
    _id: 'v-101',
    businessName: 'शर्मा जी राजमिस्त्री एवं सिविल कंस्ट्रक्शन',
    ownerName: 'राजेश शर्मा (हेड मिस्त्री)',
    email: 'sharma.civil@kontractor.in',
    phone: '+91 98112 34567',
    whatsapp: '919811234567',
    city: 'Delhi NCR',
    category: 'cat-construction-repair',
    servicesOffered: ['मिस्त्री (Mason)', 'Labour Mandi', 'टाइल्स इंस्टॉलर'],
    subServices: ['srv-mistri', 'srv-labour-mandi', 'srv-tiles-installer'],
    experience: 16,
    about: '16 वर्षों का अनुभव। दिल्ली NCR में 200+ विला, मकान और कोठियों की नींव से लेकर छत ढलाई और प्लास्टर का मजबूत कार्य। समय पर काम और मजबूत जोड़ की पूरी गारंटी।',
    approved: true,
    kycVerified: true,
    rating: 4.9,
    reviewCount: 84,
    jobs: 142,
    viewCount: 1240,
    enquiryCount: 68,
    price: 'Starts ₹1,650 / sq.ft',
    address: 'सेक्टर 62, नोएडा एवं द्वारका मोड़, दिल्ली',
    avatar: 'https://images.unsplash.com/photo-1541888946425-d0fbb180c5f5?auto=format&fit=crop&w=300&q=80',
    certifications: ['IS-456 Structural Compliant', 'UltraTech Certified Mason']
  },
  {
    _id: 'v-102',
    businessName: 'वर्मा प्लंबिंग एंड सेनेटरी सोल्यूशंस',
    ownerName: 'सुरेश वर्मा (मास्टर प्लंबर)',
    email: 'verma.plumbing@kontractor.in',
    phone: '+91 98220 12345',
    whatsapp: '919822012345',
    city: 'Mumbai',
    category: 'cat-construction-repair',
    servicesOffered: ['प्लंबर (Plumber)', 'रूफिंग विशेषज्ञ (Waterproofing)'],
    subServices: ['srv-plumber', 'srv-roofing'],
    experience: 12,
    about: 'कंसील्ड सीपीवीसी पाइप फिटिंग, वाटर टैंक इंस्टॉलेशन, बाथरूम रिनोवेशन और छत सीपेज लीकेज रोकने के विशेषज्ञ। नो-लीकेज 5 वर्ष की लिखित वारंटी।',
    approved: true,
    kycVerified: true,
    rating: 4.8,
    reviewCount: 62,
    jobs: 110,
    viewCount: 980,
    enquiryCount: 45,
    price: 'Starts ₹450 / point',
    address: 'अंधेरी वेस्ट एवं ठाणे, मुंबई',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    certifications: ['Astral Certified Plumber', 'Supreme Piping Standards']
  },
  {
    _id: 'v-103',
    businessName: 'रोहित इलेक्ट्रिकल & स्मार्ट वायरिंग',
    ownerName: 'रोहित सैनी (इंजीनियर व इलेक्ट्रीशियन)',
    email: 'rohit.electrical@kontractor.in',
    phone: '+91 98290 87654',
    whatsapp: '919829087654',
    city: 'Jaipur',
    category: 'cat-construction-repair',
    servicesOffered: ['इलेक्ट्रिशियन (Electrician)', 'लाइटिंग विशेषज्ञ'],
    subServices: ['srv-electrician', 'srv-lighting-expert'],
    experience: 10,
    about: 'जयपुर में मकानों की कंसील्ड वायरिंग, एमसीबी बॉक्स फिटिंग, इन्वर्टर कनेक्शन और आधुनिक प्रोफाइल लाइटिंग के विश्वसनीय विशेषज्ञ। फॉल्ट-फ्री कॉपर वायरिंग।',
    approved: true,
    kycVerified: true,
    rating: 4.9,
    reviewCount: 48,
    jobs: 88,
    viewCount: 820,
    enquiryCount: 39,
    price: 'Starts ₹550 / point',
    address: 'वैशाली नगर, जयपुर',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    certifications: ['Govt. Licensed Wireman (Rajasthan)', 'Havells Gold Partner']
  },
  {
    _id: 'v-104',
    businessName: 'रॉयल वुड क्राफ्ट्स & कारपेंटरी',
    ownerName: 'गुरप्रीत सिंह (हेड कारपेंटर)',
    email: 'royal.wood@kontractor.in',
    phone: '+91 98765 43210',
    whatsapp: '919876543210',
    city: 'Chandigarh',
    category: 'cat-interior-decoration',
    servicesOffered: ['कारपेंटर (Carpenter)', 'फर्नीचर निर्माता'],
    subServices: ['srv-carpenter', 'srv-furniture-maker'],
    experience: 14,
    about: 'सागवान लकड़ी की चौखट, डिजाइनर मुख्य द्वार, मॉड्यूलर किचन और हाइड्रोलिक वॉर्डरोब बनाने के माहिर। दीमक मुक्त मटीरियल और शानदार फिनिशिंग।',
    approved: true,
    kycVerified: true,
    rating: 4.8,
    reviewCount: 54,
    jobs: 94,
    viewCount: 910,
    enquiryCount: 42,
    price: 'Starts ₹1,200 / sq.ft',
    address: 'सेक्टर 34, चंडीगढ़ एवं मोहाली',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80',
    certifications: ['Hafele Hardware Certified', 'CenturyPly Elite Craftsman']
  },
  {
    _id: 'v-105',
    businessName: 'एशियन पेंटर्स & वॉल टेक्सचर्स',
    ownerName: 'मनोज कुमार (मास्टर पेंटर)',
    email: 'manoj.paints@kontractor.in',
    phone: '+91 94150 99887',
    whatsapp: '919415099887',
    city: 'Lucknow',
    category: 'cat-construction-repair',
    servicesOffered: ['पेंटर (Painter)', 'फॉल्स सीलिंग विशेषज्ञ'],
    subServices: ['srv-painter', 'srv-false-ceiling'],
    experience: 11,
    about: 'वॉल पुट्टी, वाटरप्रूफिंग, रॉयल लक्जरी इमल्शन, टेक्सचर पेंट और फॉल्स सीलिंग का साफ-सुथरा कार्य। काम के बाद पूरी साइट की डीप क्लीनिंग की गारंटी।',
    approved: true,
    kycVerified: true,
    rating: 4.7,
    reviewCount: 38,
    jobs: 76,
    viewCount: 740,
    enquiryCount: 31,
    price: 'Starts ₹18 / sq.ft',
    address: 'गोमती नगर, लखनऊ',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
    certifications: ['Asian Paints Certified Master Painter']
  },
  {
    _id: 'v-106',
    businessName: 'भव्य इंटीरियर्स & 3D होम स्टूडियो',
    ownerName: 'अर्. पूजा सिंघानिया (इंटीरियर डिजाइनर)',
    email: 'pooja.interiors@kontractor.in',
    phone: '+91 98450 11223',
    whatsapp: '919845011223',
    city: 'Bangalore',
    category: 'cat-interior-decoration',
    servicesOffered: ['इंटीरियर डिजाइनर', 'फॉल्स सीलिंग विशेषज्ञ', 'फर्नीचर निर्माता'],
    subServices: ['srv-interior-designer', 'srv-false-ceiling', 'srv-furniture-maker'],
    experience: 9,
    about: '3D फोटो-रियलिस्टिक रेंडर से लेकर टर्नकी होम इंटीरियर, मॉड्यूलर किचन, और वार्म लाइटिंग एम्बिएंस। 45-दिन में काम पूरा करने का लिखित वादा।',
    approved: true,
    kycVerified: true,
    rating: 4.9,
    reviewCount: 72,
    jobs: 104,
    viewCount: 1450,
    enquiryCount: 82,
    price: 'Starts ₹1,450 / sq.ft',
    address: 'इंद्रानगर व कोरमंगला, बैंगलोर',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    certifications: ['Council of Architecture (IIA)', 'Saint-Gobain Gyproc Certified']
  },
  {
    _id: 'v-107',
    businessName: 'अग्रवाल बिल्डिंग मटेरियल & सीमेंट सप्लायर',
    ownerName: 'सुनील अग्रवाल (होलसेलर)',
    email: 'agarwal.materials@kontractor.in',
    phone: '+91 98100 55443',
    whatsapp: '919810055443',
    city: 'Delhi NCR',
    category: 'cat-supply-logistics',
    servicesOffered: ['निर्माण सामग्री सप्लायर', 'हार्डवेयर सप्लायर'],
    subServices: ['srv-material-supplier', 'srv-hardware-supplier'],
    experience: 22,
    about: 'अल्ट्राटेक, एसीसी सीमेंट, टाटा टिस्कॉन सरिया, यमुना रेत, बदरपुर और लाल ईंटों के अधिकृत थोक विक्रेता। दिल्ली-एनसीआर में 4 घंटे में ऑन-साइट डिलीवरी।',
    approved: true,
    kycVerified: true,
    rating: 4.8,
    reviewCount: 95,
    jobs: 320,
    viewCount: 1680,
    enquiryCount: 110,
    price: 'Wholesale Mandi Rates',
    address: 'रोहिणी एवं बादली मंडी, दिल्ली',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
    certifications: ['UltraTech Authorized Dealer', 'Tata Tiscon Certified Stockist']
  },
  {
    _id: 'v-108',
    businessName: 'भारत JCB, क्रेन & हेवी मशीनरी रेंटल',
    ownerName: 'विक्रम यादव (मशीनरी फ्लीट ओनर)',
    email: 'bharat.jcb@kontractor.in',
    phone: '+91 98230 66778',
    whatsapp: '919823066778',
    city: 'Pune',
    category: 'cat-machinery-equipment',
    servicesOffered: ['मशीनरी रेंटल (JCB / Crane)', 'टूल्स सप्लायर'],
    subServices: ['srv-machinery-rental', 'srv-tools-supplier'],
    experience: 13,
    about: 'JCB 3DX खुदाई, कंक्रीट मिक्सर, हाइड्रोलिक क्रेन और शटरिंग प्लेट्स रेंटल। 24 घंटे ऑपरेटर सहित सेवा उपलब्ध। बेसमेंट खुदाई और मलबा लोडिंग में अग्रणी।',
    approved: true,
    kycVerified: true,
    rating: 4.9,
    reviewCount: 51,
    jobs: 130,
    viewCount: 890,
    enquiryCount: 58,
    price: 'Starts ₹1,300 / hour',
    address: 'हिंजवाड़ी एवं वाकड़, पुणे',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
    certifications: ['JCB India Certified Operator Fleet']
  },
  {
    _id: 'v-109',
    businessName: 'स्ट्रक्चरल डिज़ाइन्स & रजिस्टर्ड आर्किटेक्ट्स',
    ownerName: 'ई. अमित देशमुख (सिविल व स्ट्रक्चरल इंजीनियर)',
    email: 'amit.architect@kontractor.in',
    phone: '+91 98490 77889',
    whatsapp: '919849077889',
    city: 'Hyderabad',
    category: 'cat-professional-legal',
    servicesOffered: ['आर्किटेक्ट (Architect)', 'सिविल इंजीनियर (Civil Engineer)'],
    subServices: ['srv-architect', 'srv-civil-engineer'],
    experience: 15,
    about: 'जीएचएमसी/एचएमडीए अप्रूव्ड नक्शा पासिंग, 2D/3D हाउस एलिवेशन, वास्तु कम्प्लायंट प्लानिंग और आईएस-456 अर्थक्वेक-रेसिस्टेंट कॉलम-बीम डिजाइनिंग विशेषज्ञ।',
    approved: true,
    kycVerified: true,
    rating: 4.9,
    reviewCount: 66,
    jobs: 115,
    viewCount: 1120,
    enquiryCount: 74,
    price: 'Starts ₹25 / sq.ft',
    address: 'माधापुर एवं गाचीबोवली, हैदराबाद',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    certifications: ['Council of Architecture (CA/2011/44910)', 'Institution of Engineers (MIE)']
  },
  {
    _id: 'v-110',
    businessName: 'सत्यम टाइल्स, ग्रेनाइट & मार्बल फिटिंग',
    ownerName: 'दिनेश प्रजापति (मास्टर कारीगर)',
    email: 'satyam.tiles@kontractor.in',
    phone: '+91 98980 33445',
    whatsapp: '919898033445',
    city: 'Ahmedabad',
    category: 'cat-construction-repair',
    servicesOffered: ['टाइल्स इंस्टॉलर (Tiles & Marble)', 'वेल्डर (Welder)'],
    subServices: ['srv-tiles-installer', 'srv-welder'],
    experience: 12,
    about: 'इटैलियन मार्बल, विट्रीफाइड टाइल्स और ग्रेनाइट किचन प्लेटफॉर्म की लेजर लेवल फिटिंग। मिरर डायमंड पॉलिशिंग और बालकनी ग्रिल फिटिंग के 12 वर्षों के सिद्ध कारीगर।',
    approved: true,
    kycVerified: true,
    rating: 4.8,
    reviewCount: 44,
    jobs: 82,
    viewCount: 760,
    enquiryCount: 36,
    price: 'Starts ₹32 / sq.ft',
    address: 'एसजी हाइवे, अहमदाबाद',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80',
    certifications: ['Kajaria Certified Tile Master', 'Somany Master Craftsman']
  }
];

const INITIAL_LEADS = [
  {
    _id: 'lead-1001',
    customerName: 'अशोक सिंघल',
    customerPhone: '+91 98111 22334',
    customerEmail: 'ashok.singhal@gmail.com',
    city: 'Delhi NCR',
    serviceRequired: 'मिस्त्री (Mason / Brickwork)',
    plotArea: '1,800 sq.ft (30x60)',
    budget: '₹35 - ₹50 Lakhs',
    message: 'रोहिणी में G+2 विला बनाना है। मजबूत नींव और लाल ईंट चिनाई के लिए भरोसेमंद राजमिस्त्री और लेबर टीम चाहिए।',
    contractorId: 'v-101',
    contractorName: 'शर्मा जी राजमिस्त्री एवं सिविल कंस्ट्रक्शन',
    status: 'contacted',
    createdAt: '2026-10-23T14:30:00.000Z'
  },
  {
    _id: 'lead-1002',
    customerName: 'अमृता राव',
    customerPhone: '+91 98450 44556',
    customerEmail: 'amrita.rao@yahoo.com',
    city: 'Bangalore',
    serviceRequired: 'इंटीरियर डिजाइनर (Interior Designer)',
    plotArea: '3 BHK (1,650 sq.ft)',
    budget: '₹12 - ₹18 Lakhs',
    message: 'व्हाइटफील्ड में नए 3 BHK फ्लैट का पूरा मॉडर्न इंटीरियर, वॉर्डरोब, फॉल्स सीलिंग और मॉड्यूलर किचन का काम कराना है।',
    contractorId: 'v-106',
    contractorName: 'भव्य इंटीरियर्स & 3D होम स्टूडियो',
    status: 'deal_closed',
    contractAmount: 1450000,
    commissionAmount: 72500,
    createdAt: '2026-10-22T10:15:00.000Z'
  },
  {
    _id: 'lead-1003',
    customerName: 'संजय कुमावत',
    customerPhone: '+91 98290 11223',
    customerEmail: 'sanjay.jaipur@gmail.com',
    city: 'Jaipur',
    serviceRequired: 'आर्किटेक्ट (Architect - 2D/3D Map)',
    plotArea: '2,400 sq.ft (40x60)',
    budget: '₹60 - ₹80 Lakhs',
    message: 'मानसरोवर में डुप्लेक्स विला का 3D नक्शा, फ्रंट एलिवेशन और स्ट्रक्चरल डिजाइन पास कराना है।',
    contractorId: 'v-109',
    contractorName: 'स्ट्रक्चरल डिज़ाइन्स & रजिस्टर्ड आर्किटेक्ट्स',
    status: 'pending',
    createdAt: '2026-10-23T16:00:00.000Z'
  }
];

// Write client/src/data/mockData.ts
const clientDataContent = `import { ArchitecturalStyle, ServiceCategory, Vendor, Lead } from '../types';

export const CITIES = ${JSON.stringify(CITIES, null, 2)};

export const ARCHITECTURAL_STYLES: ArchitecturalStyle[] = ${JSON.stringify(ARCHITECTURAL_STYLES, null, 2)};

export const CATEGORIES: ServiceCategory[] = ${JSON.stringify(CATEGORIES, null, 2)};

export const VENDORS: Vendor[] = ${JSON.stringify(VENDORS, null, 2)};

export const INITIAL_LEADS: Lead[] = ${JSON.stringify(INITIAL_LEADS, null, 2)};
`;

fs.writeFileSync(path.join(process.cwd(), 'client', 'src', 'data', 'mockData.ts'), clientDataContent, 'utf-8');

// Write server/mockSeedData.js
const serverDataContent = `export const CITIES = ${JSON.stringify(CITIES, null, 2)};

export const ARCHITECTURAL_STYLES = ${JSON.stringify(ARCHITECTURAL_STYLES, null, 2)};

export const CATEGORIES = ${JSON.stringify(CATEGORIES, null, 2)};

export const VENDORS = ${JSON.stringify(VENDORS, null, 2)};

export const INITIAL_LEADS = ${JSON.stringify(INITIAL_LEADS, null, 2)};
`;

fs.writeFileSync(path.join(process.cwd(), 'server', 'mockSeedData.js'), serverDataContent, 'utf-8');

console.log('✅ Successfully updated mockData.ts and mockSeedData.js with real Indian categories and 10 vendors!');

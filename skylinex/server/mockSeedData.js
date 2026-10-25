// Seed Data for Kontractor Platform Server

export const ARCHITECTURAL_STYLES = [{"id": "cat-construction-repair", "name": "निर्माण और मरम्मत सेवाएँ (Construction & Repair)", "nameEn": "Construction & Repair Services", "nameHi": "निर्माण और मरम्मत सेवाएँ", "nameHinglish": "Construction & Repairing Services", "iconName": "Hammer", "description": "मिस्त्री, लेबर, प्लंबर, बिजली, कारपेंटर, पेंटर, वेल्डर, टाइल्स व रूफिंग की सम्पूर्ण सेवाएँ।", "descEn": "Complete turnkey civil construction, masons, plumbers, electricians, carpenters, painters, and welders.", "descHi": "नींव खुदाई से लेकर छत ढलाई, ईंट चिनाई, प्लास्टर एवं संपूर्ण सिविल कंस्ट्रक्शन कार्य।", "descHinglish": "Mistry, daily labour, plumbing, wiring, woodwork aur painting ki complete services.", "subServicesCount": 9, "popularityScore": 99, "trendingRank": 1, "colorTheme": {"bgLight": "bg-amber-50/70", "border": "border-amber-200/80", "text": "text-amber-950", "accent": "text-amber-600", "badge": "bg-amber-100 text-amber-800", "hoverBorder": "hover:border-amber-400"}, "subServices": [{"id": "srv-mistri", "name": "मिस्त्री (Mason / Brickwork)", "nameEn": "Master Mason (Brickwork & Foundation)", "nameHi": "मिस्त्री (नींव, चिनाई एवं ढलाई)", "nameHinglish": "Raj Mistri (Mason / Brickwork)", "unit": "sq.ft", "avgRate": "₹35 - ₹55 / sq.ft (Labour) • ₹1,650 / sq.ft (Turnkey)", "specs": "अनुभवी राजमिस्त्री द्वारा नींव खुदाई, ईंट-चिनाई, प्लास्टर, आरसीसी ढलाई एवं फिनिशिंग वर्क।", "specsEn": "Experienced head masons for foundation layout, red brick masonry, plastering, and RCC slab casting.", "specsHi": "मजबूत नींव, 9 इंच ईंट चिनाई, आरसीसी बीम व छत ढलाई का पक्का काम।", "specsHinglish": "Foundation, brickwork, beam casting aur plastering experienced mistri dwara.", "deliverables": ["नींव और पिलर लेआउट", "9-इंच और 4.5-इंच ईंट चिनाई", "सीलिंग और दीवार प्लास्टर", "वाटरप्रूफिंग क्योरिंग"]}, {"id": "srv-labour-mandi", "name": "Labour Mandi (दैनिक लेबर / बेलदार)", "nameEn": "Daily Construction Labour & Beldar", "nameHi": "लेबर मंडी (कुशल एवं अकुशल बेलदार)", "nameHinglish": "Daily Labour Mandi & Beldar", "unit": "day", "avgRate": "₹550 - ₹750 / day per labourer", "specs": "कुशल और अकुशल दिहाड़ी मजदूर, मलबा उठाने वाले, मसाला मिलाने वाले और लोडिंग-अनलोडिंग लेबर।", "specsEn": "Skilled and unskilled daily wage workers for debris removal, cement-sand mixing, and site assistance.", "specsHi": "साइट की सफाई, मसाला मिक्सिंग, ईंट व सीमेंट ऊपर पहुंचाने वाले दिहाड़ी मजदूर।", "specsHinglish": "Daily wage helpers for material lifting, site cleaning, and concrete mixing.", "deliverables": ["साइट सफाई और मलबा हटाना", "सीमेंट-रेत मसाला मिलाना", "ईंट और मटेरियल ऊपर चढ़ाना", "साइट खुदाई कार्य"]}, {"id": "srv-plumber", "name": "प्लंबर (Plumbing & Sanifit)", "nameEn": "Plumbing & Sanitary Fittings", "nameHi": "प्लंबर (पाइप फिटिंग एवं सेनेटरी)", "nameHinglish": "Plumber (Concealed Fitting)", "unit": "point", "avgRate": "₹400 - ₹650 / point • ₹15,000 / bathroom turnkey", "specs": "कंसील्ड CPVC/UPVC पाइप फिटिंग, वाटर टैंक इंस्टॉलेशन, गीजर, शॉवर और सीवरेज लाइन।", "specsEn": "Concealed CPVC/UPVC piping, overhead water tank installation, geysers, showers, and sewage lines.", "specsHi": "दीवार के अंदर कंसील्ड पाइप कटिंग, वाटर प्रेशर टेस्टिंग और बाथरूम सेनेटरी फिटिंग।", "specsHinglish": "Concealed pipe fitting, water tank, shower aur bathroom sanitary points.", "deliverables": ["कंसील्ड पाइपलाइन कटिंग और फिटिंग", "वाटर प्रेशर टेस्टिंग", "टॉयलेट सीट और ड्रेनेज कनेक्शन", "वाटर टैंक फिटिंग"]}, {"id": "srv-electrician", "name": "इलेक्ट्रिशियन (Electrical & Smart Wiring)", "nameEn": "Electrician & Concealed Wiring", "nameHi": "इलेक्ट्रिशियन (बिजली वायरिंग एवं स्विच)", "nameHinglish": "Electrician (Wiring & Switches)", "unit": "point", "avgRate": "₹450 - ₹700 / point • ₹25,000 / floor turnkey", "specs": "कंसील्ड कंड्यूट पाइपिंग, कॉपर वायर पुलिंग, MCB डिस्ट्रीब्यूशन बॉक्स, इन्वर्टर और मॉडर्न स्विच प्लेट्स।", "specsEn": "Concealed conduit piping, copper wire pulling (Havells/Polycab), MCB distribution box, and smart switches.", "specsHi": "दीवार झिरी कटिंग, FRLS कॉपर तार खींचना, MCB बॉक्स एवं अर्थिंग कनेक्शन।", "specsHinglish": "Concealed conduit pipe, copper wiring, MCB board aur inverter setup.", "deliverables": ["दीवार झिरी कटिंग और पाइप बिछाना", "Havells/Polycab वायर पुलिंग", "MCB और अर्थिंग कनेक्शन", "लाइटिंग और फैन फिटिंग"]}, {"id": "srv-carpenter", "name": "कारपेंटर (Carpenter & Woodwork)", "nameEn": "Carpenter & Custom Woodwork", "nameHi": "कारपेंटर (दरवाजे, चौखट एवं लकड़ी कार्य)", "nameHinglish": "Carpenter (Door & Wooden Work)", "unit": "sq.ft", "avgRate": "₹180 - ₹350 / sq.ft (Labour)", "specs": "दरवाजे, चौखट, अलमारी, वॉर्डरोब, मॉड्यूलर किचन कैबिनेट्स और वुडन फ्लोरिंग कार्य।", "specsEn": "Chaukhat and flush doors, wooden wardrobes, kitchen cabinets, and laminate pasting.", "specsHi": "सागवान चौखट फिटिंग, प्लाईवुड अलमारी, सॉफ्ट-क्लोज हिंज एवं लैमिनेट पेस्टिंग।", "specsHinglish": "Chaukhat, doors, wardrobes aur laminate mica fitting.", "deliverables": ["चौखट और फ्लश डोर फिटिंग", "सॉफ्ट-क्लोज हिंज इंस्टॉलेशन", "प्लाईवुड वॉर्डरोब फ्रेमिंग", "लैमिनेट/माइका पेस्टिंग"]}, {"id": "srv-painter", "name": "पेंटर (Painter & Whitewash)", "nameEn": "Painting, Putty & Whitewash", "nameHi": "पेंटर (पुट्टी, प्राइमर एवं पेंटिंग)", "nameHinglish": "Painter (Putty & Royale Emulsion)", "unit": "sq.ft", "avgRate": "₹14 - ₹28 / sq.ft (Labour + Material)", "specs": "2-कोट वॉल पुट्टी, प्राइमर, एशियन पेंट्स रॉयल लक्ज़री इमल्शन, टेक्सचर और वॉटरप्रूफ एक्सटीरियर पेंट।", "specsEn": "2-coat Birla wall putty, primer, Asian Paints Royale luxury emulsion, and weatherproof exterior paint.", "specsHi": "दीवार सैंडिंग, 2-कोट बिरला पुट्टी, प्राइमर एवं एशियन पेंट्स रॉयल स्मूथ फिनिश।", "specsHinglish": "Birla putty, primer, sanding aur Asian Paints Royale emulsion finish.", "deliverables": ["वॉल सैंडिंग और दरार भराई", "2-कोट बिड़ला पुट्टी", "1-कोट प्राइमर", "2-कोट प्रीमियम पेंट फिनिश"]}, {"id": "srv-welder", "name": "वेल्डर (Welder & Metal Fabrication)", "nameEn": "Welder & Metal Fabrication", "nameHi": "वेल्डर (गेट, ग्रिल एवं शेड निर्माण)", "nameHinglish": "Welder (Main Gate & Railing)", "unit": "kg", "avgRate": "₹110 - ₹160 / kg (MS) • ₹380 / kg (SS 304)", "specs": "मेन गेट, बालकनी ग्रिल, सीढ़ी रेलिंग, शेड स्ट्रक्चर और सिक्योरिटी विंडो ग्रिल फैब्रिकेशन।", "specsEn": "Main gate fabrication, balcony railing (MS/SS 304), staircase railing, and security window grills.", "specsHi": "लोहे का मेन गेट, बालकनी एसएस रेलिंग, सीढ़ी की रेलिंग और टिन शेड स्ट्रक्चर।", "specsHinglish": "Main gate, balcony grill, steel railing aur tin shed welding.", "deliverables": ["कटिंग, बेंडिंग और वेल्डिंग", "एंटी-रस्ट रेड ऑक्साइड कोटिंग", "प्रीमियम इनैमल पेंट", "साइट इंस्टॉलेशन"]}, {"id": "srv-tiles-installer", "name": "टाइल्स इंस्टॉलर (Tiles & Marble Installer)", "nameEn": "Tiles & Marble Installation", "nameHi": "टाइल्स इंस्टॉलर (टाइल्स एवं मार्बल फिटिंग)", "nameHinglish": "Tiles & Marble Flooring Fitting", "unit": "sq.ft", "avgRate": "₹28 - ₹45 / sq.ft (Tiles) • ₹55 - ₹85 / sq.ft (Marble)", "specs": "विट्रीफाइड टाइल्स, इटैलियन मार्बल, ग्रेनाइट किचन स्लैब कटिंग और मिरर पॉलिशिंग कार्य।", "specsEn": "Vitrified floor tiles, Italian marble flooring, laser level alignment, and epoxy grouting.", "specsHi": "लेजर लेवल पर टाइल्स फिटिंग, ग्रेनाइट मोल्डिंग और मार्बल डायमंड पॉलिशिंग।", "specsHinglish": "Vitrified tiles, kitchen granite slab aur marble diamond polish.", "deliverables": ["फ्लोर लेवलिंग और मसाला बेड", "लेजर लेवल टाइल अलाइनमेंट", "इपॉक्सी ग्राउटिंग", "मार्बल डायमंड पॉलिश"]}, {"id": "srv-roofing", "name": "रूफिंग विशेषज्ञ (Roofing & Tin Shed)", "nameEn": "Roofing & Pre-Fab Shed Specialist", "nameHi": "रूफिंग विशेषज्ञ (छत शेड एवं फैब्रिकेशन)", "nameHinglish": "Roofing & Industrial Tin Shed", "unit": "sq.ft", "avgRate": "₹95 - ₹165 / sq.ft", "specs": "कलर कोटेड रूफिंग शीट्स (Tata Tiscon / Jindal), टिन शेड, पीयूएफ इंसुलेशन और रूफटॉप ड्रेनेज।", "specsEn": "Color-coated metal roofing sheets, heavy MS truss structure, PUF thermal insulation, and gutters.", "specsHi": "टाटा ब्लूस्कोप/जिंदल कलर कोटेड शीट, मजबूत ट्रस शेड और बारिश का पानी निकासी गटर।", "specsHinglish": "Tata roofing sheet, MS pipe structure aur terrace shed installation.", "deliverables": ["हैवी पाइप ट्रस फैब्रिकेशन", "कलर कोटेड शीट फिक्सिंग", "रेन वाटर गटर पाइप", "एंटी-लीकेज सीलिंग"]}]}];
export const CATEGORIES = [
  {
    "id": "cat-construction-repair",
    "name": "निर्माण और मरम्मत सेवाएँ (Construction & Repair)",
    "nameEn": "Construction & Repair Services",
    "nameHi": "निर्माण और मरम्मत सेवाएँ",
    "nameHinglish": "Construction & Repairing Services",
    "iconName": "Hammer",
    "description": "मिस्त्री, लेबर, प्लंबर, बिजली, कारपेंटर, पेंटर, वेल्डर, टाइल्स व रूफिंग की सम्पूर्ण सेवाएँ।",
    "descEn": "Complete turnkey civil construction, masons, plumbers, electricians, carpenters, painters, and welders.",
    "descHi": "नींव खुदाई से लेकर छत ढलाई, ईंट चिनाई, प्लास्टर एवं संपूर्ण सिविल कंस्ट्रक्शन कार्य।",
    "descHinglish": "Mistry, daily labour, plumbing, wiring, woodwork aur painting ki complete services.",
    "subServicesCount": 9,
    "popularityScore": 99,
    "trendingRank": 1,
    "colorTheme": {
      "bgLight": "bg-amber-50/70",
      "border": "border-amber-200/80",
      "text": "text-amber-950",
      "accent": "text-amber-600",
      "badge": "bg-amber-100 text-amber-800",
      "hoverBorder": "hover:border-amber-400"
    },
    "subServices": [
      {
        "id": "srv-mistri",
        "name": "मिस्त्री (Mason / Brickwork)",
        "nameEn": "Master Mason (Brickwork & Foundation)",
        "nameHi": "मिस्त्री (नींव, चिनाई एवं ढलाई)",
        "nameHinglish": "Raj Mistri (Mason / Brickwork)",
        "unit": "sq.ft",
        "avgRate": "₹35 - ₹55 / sq.ft (Labour) • ₹1,650 / sq.ft (Turnkey)",
        "specs": "अनुभवी राजमिस्त्री द्वारा नींव खुदाई, ईंट-चिनाई, प्लास्टर, आरसीसी ढलाई एवं फिनिशिंग वर्क।",
        "specsEn": "Experienced head masons for foundation layout, red brick masonry, plastering, and RCC slab casting.",
        "specsHi": "मजबूत नींव, 9 इंच ईंट चिनाई, आरसीसी बीम व छत ढलाई का पक्का काम।",
        "specsHinglish": "Foundation, brickwork, beam casting aur plastering experienced mistri dwara.",
        "deliverables": [
          "नींव और पिलर लेआउट",
          "9-इंच और 4.5-इंच ईंट चिनाई",
          "सीलिंग और दीवार प्लास्टर",
          "वाटरप्रूफिंग क्योरिंग"
        ]
      },
      {
        "id": "srv-labour-mandi",
        "name": "Labour Mandi (दैनिक लेबर / बेलदार)",
        "nameEn": "Daily Construction Labour & Beldar",
        "nameHi": "लेबर मंडी (कुशल एवं अकुशल बेलदार)",
        "nameHinglish": "Daily Labour Mandi & Beldar",
        "unit": "day",
        "avgRate": "₹550 - ₹750 / day per labourer",
        "specs": "कुशल और अकुशल दिहाड़ी मजदूर, मलबा उठाने वाले, मसाला मिलाने वाले और लोडिंग-अनलोडिंग लेबर।",
        "specsEn": "Skilled and unskilled daily wage workers for debris removal, cement-sand mixing, and site assistance.",
        "specsHi": "साइट की सफाई, मसाला मिक्सिंग, ईंट व सीमेंट ऊपर पहुंचाने वाले दिहाड़ी मजदूर।",
        "specsHinglish": "Daily wage helpers for material lifting, site cleaning, and concrete mixing.",
        "deliverables": [
          "साइट सफाई और मलबा हटाना",
          "सीमेंट-रेत मसाला मिलाना",
          "ईंट और मटेरियल ऊपर चढ़ाना",
          "साइट खुदाई कार्य"
        ]
      },
      {
        "id": "srv-plumber",
        "name": "प्लंबर (Plumbing & Sanifit)",
        "nameEn": "Plumbing & Sanitary Fittings",
        "nameHi": "प्लंबर (पाइप फिटिंग एवं सेनेटरी)",
        "nameHinglish": "Plumber (Concealed Fitting)",
        "unit": "point",
        "avgRate": "₹400 - ₹650 / point • ₹15,000 / bathroom turnkey",
        "specs": "कंसील्ड CPVC/UPVC पाइप फिटिंग, वाटर टैंक इंस्टॉलेशन, गीजर, शॉवर और सीवरेज लाइन।",
        "specsEn": "Concealed CPVC/UPVC piping, overhead water tank installation, geysers, showers, and sewage lines.",
        "specsHi": "दीवार के अंदर कंसील्ड पाइप कटिंग, वाटर प्रेशर टेस्टिंग और बाथरूम सेनेटरी फिटिंग।",
        "specsHinglish": "Concealed pipe fitting, water tank, shower aur bathroom sanitary points.",
        "deliverables": [
          "कंसील्ड पाइपलाइन कटिंग और फिटिंग",
          "वाटर प्रेशर टेस्टिंग",
          "टॉयलेट सीट और ड्रेनेज कनेक्शन",
          "वाटर टैंक फिटिंग"
        ]
      },
      {
        "id": "srv-electrician",
        "name": "इलेक्ट्रिशियन (Electrical & Smart Wiring)",
        "nameEn": "Electrician & Concealed Wiring",
        "nameHi": "इलेक्ट्रिशियन (बिजली वायरिंग एवं स्विच)",
        "nameHinglish": "Electrician (Wiring & Switches)",
        "unit": "point",
        "avgRate": "₹450 - ₹700 / point • ₹25,000 / floor turnkey",
        "specs": "कंसील्ड कंड्यूट पाइपिंग, कॉपर वायर पुलिंग, MCB डिस्ट्रीब्यूशन बॉक्स, इन्वर्टर और मॉडर्न स्विच प्लेट्स।",
        "specsEn": "Concealed conduit piping, copper wire pulling (Havells/Polycab), MCB distribution box, and smart switches.",
        "specsHi": "दीवार झिरी कटिंग, FRLS कॉपर तार खींचना, MCB बॉक्स एवं अर्थिंग कनेक्शन।",
        "specsHinglish": "Concealed conduit pipe, copper wiring, MCB board aur inverter setup.",
        "deliverables": [
          "दीवार झिरी कटिंग और पाइप बिछाना",
          "Havells/Polycab वायर पुलिंग",
          "MCB और अर्थिंग कनेक्शन",
          "लाइटिंग और फैन फिटिंग"
        ]
      },
      {
        "id": "srv-carpenter",
        "name": "कारपेंटर (Carpenter & Woodwork)",
        "nameEn": "Carpenter & Custom Woodwork",
        "nameHi": "कारपेंटर (दरवाजे, चौखट एवं लकड़ी कार्य)",
        "nameHinglish": "Carpenter (Door & Wooden Work)",
        "unit": "sq.ft",
        "avgRate": "₹180 - ₹350 / sq.ft (Labour)",
        "specs": "दरवाजे, चौखट, अलमारी, वॉर्डरोब, मॉड्यूलर किचन कैबिनेट्स और वुडन फ्लोरिंग कार्य।",
        "specsEn": "Chaukhat and flush doors, wooden wardrobes, kitchen cabinets, and laminate pasting.",
        "specsHi": "सागवान चौखट फिटिंग, प्लाईवुड अलमारी, सॉफ्ट-क्लोज हिंज एवं लैमिनेट पेस्टिंग।",
        "specsHinglish": "Chaukhat, doors, wardrobes aur laminate mica fitting.",
        "deliverables": [
          "चौखट और फ्लश डोर फिटिंग",
          "सॉफ्ट-क्लोज हिंज इंस्टॉलेशन",
          "प्लाईवुड वॉर्डरोब फ्रेमिंग",
          "लैमिनेट/माइका पेस्टिंग"
        ]
      },
      {
        "id": "srv-painter",
        "name": "पेंटर (Painter & Whitewash)",
        "nameEn": "Painting, Putty & Whitewash",
        "nameHi": "पेंटर (पुट्टी, प्राइमर एवं पेंटिंग)",
        "nameHinglish": "Painter (Putty & Royale Emulsion)",
        "unit": "sq.ft",
        "avgRate": "₹14 - ₹28 / sq.ft (Labour + Material)",
        "specs": "2-कोट वॉल पुट्टी, प्राइमर, एशियन पेंट्स रॉयल लक्ज़री इमल्शन, टेक्सचर और वॉटरप्रूफ एक्सटीरियर पेंट।",
        "specsEn": "2-coat Birla wall putty, primer, Asian Paints Royale luxury emulsion, and weatherproof exterior paint.",
        "specsHi": "दीवार सैंडिंग, 2-कोट बिरला पुट्टी, प्राइमर एवं एशियन पेंट्स रॉयल स्मूथ फिनिश।",
        "specsHinglish": "Birla putty, primer, sanding aur Asian Paints Royale emulsion finish.",
        "deliverables": [
          "वॉल सैंडिंग और दरार भराई",
          "2-कोट बिड़ला पुट्टी",
          "1-कोट प्राइमर",
          "2-कोट प्रीमियम पेंट फिनिश"
        ]
      },
      {
        "id": "srv-welder",
        "name": "वेल्डर (Welder & Metal Fabrication)",
        "nameEn": "Welder & Metal Fabrication",
        "nameHi": "वेल्डर (गेट, ग्रिल एवं शेड निर्माण)",
        "nameHinglish": "Welder (Main Gate & Railing)",
        "unit": "kg",
        "avgRate": "₹110 - ₹160 / kg (MS) • ₹380 / kg (SS 304)",
        "specs": "मेन गेट, बालकनी ग्रिल, सीढ़ी रेलिंग, शेड स्ट्रक्चर और सिक्योरिटी विंडो ग्रिल फैब्रिकेशन।",
        "specsEn": "Main gate fabrication, balcony railing (MS/SS 304), staircase railing, and security window grills.",
        "specsHi": "लोहे का मेन गेट, बालकनी एसएस रेलिंग, सीढ़ी की रेलिंग और टिन शेड स्ट्रक्चर।",
        "specsHinglish": "Main gate, balcony grill, steel railing aur tin shed welding.",
        "deliverables": [
          "कटिंग, बेंडिंग और वेल्डिंग",
          "एंटी-रस्ट रेड ऑक्साइड कोटिंग",
          "प्रीमियम इनैमल पेंट",
          "साइट इंस्टॉलेशन"
        ]
      },
      {
        "id": "srv-tiles-installer",
        "name": "टाइल्स इंस्टॉलर (Tiles & Marble Installer)",
        "nameEn": "Tiles & Marble Installation",
        "nameHi": "टाइल्स इंस्टॉलर (टाइल्स एवं मार्बल फिटिंग)",
        "nameHinglish": "Tiles & Marble Flooring Fitting",
        "unit": "sq.ft",
        "avgRate": "₹28 - ₹45 / sq.ft (Tiles) • ₹55 - ₹85 / sq.ft (Marble)",
        "specs": "विट्रीफाइड टाइल्स, इटैलियन मार्बल, ग्रेनाइट किचन स्लैब कटिंग और मिरर पॉलिशिंग कार्य।",
        "specsEn": "Vitrified floor tiles, Italian marble flooring, laser level alignment, and epoxy grouting.",
        "specsHi": "लेजर लेवल पर टाइल्स फिटिंग, ग्रेनाइट मोल्डिंग और मार्बल डायमंड पॉलिशिंग।",
        "specsHinglish": "Vitrified tiles, kitchen granite slab aur marble diamond polish.",
        "deliverables": [
          "फ्लोर लेवलिंग और मसाला बेड",
          "लेजर लेवल टाइल अलाइनमेंट",
          "इपॉक्सी ग्राउटिंग",
          "मार्बल डायमंड पॉलिश"
        ]
      },
      {
        "id": "srv-roofing",
        "name": "रूफिंग विशेषज्ञ (Roofing & Tin Shed)",
        "nameEn": "Roofing & Pre-Fab Shed Specialist",
        "nameHi": "रूफिंग विशेषज्ञ (छत शेड एवं फैब्रिकेशन)",
        "nameHinglish": "Roofing & Industrial Tin Shed",
        "unit": "sq.ft",
        "avgRate": "₹95 - ₹165 / sq.ft",
        "specs": "कलर कोटेड रूफिंग शीट्स (Tata Tiscon / Jindal), टिन शेड, पीयूएफ इंसुलेशन और रूफटॉप ड्रेनेज।",
        "specsEn": "Color-coated metal roofing sheets, heavy MS truss structure, PUF thermal insulation, and gutters.",
        "specsHi": "टाटा ब्लूस्कोप/जिंदल कलर कोटेड शीट, मजबूत ट्रस शेड और बारिश का पानी निकासी गटर।",
        "specsHinglish": "Tata roofing sheet, MS pipe structure aur terrace shed installation.",
        "deliverables": [
          "हैवी पाइप ट्रस फैब्रिकेशन",
          "कलर कोटेड शीट फिक्सिंग",
          "रेन वाटर गटर पाइप",
          "एंटी-लीकेज सीलिंग"
        ]
      }
    ]
  },
  {
    "id": "cat-interior-decoration",
    "name": "इंटीरियर और डेकोरेशन सेवाएँ (Interior & Decoration)",
    "nameEn": "Interior & Home Decoration",
    "nameHi": "इंटीरियर और डेकोरेशन सेवाएँ",
    "nameHinglish": "Interior Designing & Decoration",
    "iconName": "Palette",
    "description": "इंटीरियर डिजाइनर, फॉल्स सीलिंग, लाइटिंग और कस्टमाइज़्ड फर्नीचर निर्माण।",
    "descEn": "3D interior design, false ceilings, ambient cove lighting, and bespoke furniture manufacturing.",
    "descHi": "3D विज़ुअलाइज़ेशन, जिप्सम फॉल्स सीलिंग, वॉर्डरोब और लक्ज़री होम डेकोर।",
    "descHinglish": "3D interior layout, false ceiling, profile lighting aur custom wooden furniture.",
    "subServicesCount": 4,
    "popularityScore": 96,
    "trendingRank": 2,
    "colorTheme": {
      "bgLight": "bg-indigo-50/70",
      "border": "border-indigo-200/80",
      "text": "text-indigo-950",
      "accent": "text-indigo-600",
      "badge": "bg-indigo-100 text-indigo-800",
      "hoverBorder": "hover:border-indigo-400"
    },
    "subServices": [
      {
        "id": "srv-interior-designer",
        "name": "इंटीरियर डिजाइनर (Interior Designer)",
        "nameEn": "Interior Designer (3D Walkthrough & Styling)",
        "nameHi": "इंटीरियर डिजाइनर (3D वॉकथ्रू एवं डिजाइन)",
        "nameHinglish": "Interior Designer (3D Render & BOQ)",
        "unit": "sq.ft",
        "avgRate": "₹45 - ₹120 / sq.ft (Design Only) • Turnkey ₹1,200 - ₹2,500 / sq.ft",
        "specs": "3D फोटो-रियलिस्टिक रेंडर्स, स्पेस प्लानिंग, कलर पैलेट सेलेक्शन और टर्नकी इंटीरियर सुपरविजन।",
        "specsEn": "3D photorealistic walkthroughs, space planning, material palette selection, and turnkey interior supervision.",
        "specsHi": "कमरों का 3D नक्शा, फर्नीचर प्लेसमेंट, कलर कॉम्बिनेशन और साइट सुपरविजन।",
        "specsHinglish": "Full home 3D interior design, mood board aur turnkey supervision.",
        "deliverables": [
          "3D वॉकथ्रू रेंडर्स",
          "मटेरियल BOQ शीट",
          "फर्नीचर लेआउट प्लान",
          "ऑन-साइट एग्जीक्यूशन गाइड"
        ]
      },
      {
        "id": "srv-false-ceiling",
        "name": "फॉल्स सीलिंग विशेषज्ञ (False Ceiling & POP)",
        "nameEn": "Gypsum False Ceiling & POP Moulding",
        "nameHi": "फॉल्स सीलिंग (जिप्सम बोर्ड एवं कोव लाइट)",
        "nameHinglish": "False Ceiling (Gyproc & POP)",
        "unit": "sq.ft",
        "avgRate": "₹90 - ₹145 / sq.ft (Saint-Gobain Gyproc)",
        "specs": "सेंट गोबेन जिप्सम बोर्ड, जीआई चैनल फ्रेमिंग, कोव लाइटिंग स्लॉट्स और पीओपी कॉर्निस डिजाइन।",
        "specsEn": "Saint-Gobain Gyproc boards, GI channel framing, hidden LED cove light grooves, and crack-free finish.",
        "specsHi": "जिप्सम सीलिंग, छुपा हुआ कोव लाइट ग्रूव और सीलिंग टेक्सचर फिनिश।",
        "specsHinglish": "Gypsum sheet false ceiling with concealed LED cove slots.",
        "deliverables": [
          "जीआई सेक्शन ग्रिड फ्रेमिंग",
          "12.5mm जिप्सम बोर्ड फिक्सिंग",
          "जॉइंट टेपिंग और पीओपी फिनिश",
          "कोव लाइट ग्रूव्स"
        ]
      },
      {
        "id": "srv-lighting-expert",
        "name": "लाइटिंग विशेषज्ञ (Lighting & Cove Lights)",
        "nameEn": "Architectural & Ambient Lighting",
        "nameHi": "लाइटिंग विशेषज्ञ (प्रोफाइल लाइट एवं झूमर)",
        "nameHinglish": "Lighting Expert (Profile & Chandelier)",
        "unit": "fixture",
        "avgRate": "₹350 - ₹600 / fixture (Labour)",
        "specs": "मैग्नेटिक ट्रैक लाइट्स, प्रोफाइल स्ट्रिप लाइट्स, वॉर्म 3000K कोव लाइट और ऑटोमेटेड डिमर फिटिंग।",
        "specsEn": "Magnetic track lights, silicon profile LED strips, chandeliers, and automated ambient dimmers.",
        "specsHi": "दीवार व सीलिंग में प्रोफाइल लाइट, झूमर हैंगिंग और स्मार्ट डिमर स्विचिंग।",
        "specsHinglish": "Magnetic track lights, cove lights aur chandelier installation.",
        "deliverables": [
          "मैग्नेटिक ट्रैक कटिंग और अलाइनमेंट",
          "सिलिकॉन डिफ्यूज़र प्रोफाइल पेस्टिंग",
          "ड्राइवर/SMPS कनेक्शन",
          "लक्स लेवल टेस्टिंग"
        ]
      },
      {
        "id": "srv-furniture-maker",
        "name": "फर्नीचर निर्माता (Custom Furniture)",
        "nameEn": "Custom Wooden & Upholstered Furniture",
        "nameHi": "फर्नीचर निर्माता (सोफा, बेड एवं डाइनिंग टेबल)",
        "nameHinglish": "Furniture Manufacturer (Sofa & Bed)",
        "unit": "unit",
        "avgRate": "₹1,200 - ₹2,800 / running ft (Wardrobe) • ₹28,000+ (King Bed)",
        "specs": "सागवान/शीशम लकड़ी के सोफा, हाइड्रोलिक किंग साइज बेड, डाइनिंग टेबल और लक्ज़री अपहोल्स्ट्री।",
        "specsEn": "Solid teakwood frames, hydraulic storage king beds, dining tables, and premium leatherette upholstery.",
        "specsHi": "कस्टमाइज्ड सोफा सेट, हाइड्रोलिक स्टोरेज बेड और मॉडर्न डाइनिंग टेबल निर्माण।",
        "specsHinglish": "Custom sofa, hydraulic bed, dining table aur wardrobe manufacturing.",
        "deliverables": [
          "3D फर्नीचर डायमेंशन ड्राइंग",
          "एंटी-टर्माइट ट्रीटेड प्लाई फ्रेम",
          "हाई-डेंसिटी 40D फोम",
          "प्रीमियम फैब्रिक अपहोल्स्ट्री"
        ]
      }
    ]
  },
  {
    "id": "cat-supply-logistics",
    "name": "सप्लाई और लॉजिस्टिक्स (Supply & Logistics)",
    "nameEn": "Building Materials & Supply Chain",
    "nameHi": "सप्लाई और लॉजिस्टिक्स (सामग्री एवं परिवहन)",
    "nameHinglish": "Materials Supply & Logistics Partner",
    "iconName": "Building2",
    "description": "सीमेंट, रेत, बजरी, सरिया, पेंट, हार्डवेयर सप्लायर और साइट ट्रांसपोर्ट पार्टनर।",
    "descEn": "Wholesale sand, aggregate, cement, TMT rebars, paints, architectural hardware, and logistics dumper transport.",
    "descHi": "थोक भाव पर बिल्डिंग मटेरियल, सीमेंट, ईंट, सरिया और डंपर डिलीवरी।",
    "descHinglish": "Cement, TMT saria, sand, aggregates aur transport dumper delivery.",
    "subServicesCount": 5,
    "popularityScore": 94,
    "trendingRank": 3,
    "colorTheme": {
      "bgLight": "bg-emerald-50/70",
      "border": "border-emerald-200/80",
      "text": "text-emerald-950",
      "accent": "text-emerald-600",
      "badge": "bg-emerald-100 text-emerald-800",
      "hoverBorder": "hover:border-emerald-400"
    },
    "subServices": [
      {
        "id": "srv-material-supplier",
        "name": "निर्माण सामग्री सप्लायर (सीमेंट, रेत, बजरी, सरिया)",
        "nameEn": "Raw Building Materials (Cement, TMT Steel, Sand)",
        "nameHi": "निर्माण सामग्री सप्लायर (अंबुजा/अल्ट्राटेक, टाटा सरिया)",
        "nameHinglish": "Building Materials (Cement, Sand, Saria)",
        "unit": "ton / truck",
        "avgRate": "₹360 - ₹410 / bag (Cement) • ₹62,000 / ton (Fe 550D TMT)",
        "specs": "अल्ट्राटेक/अंबुजा 43/53 ग्रेड सीमेंट, टाटा टिस्कॉन Fe 550D सरिया, यमुना रेत और 10mm/20mm नीली बजरी।",
        "specsEn": "UltraTech/Ambuja 43/53 grade cement, Tata Tiscon Fe 550D steel rebars, river sand, and washed aggregates.",
        "specsHi": "ब्रांडेड सीमेंट बैग्स, बीआईएस सर्टिफाइड सरिया और समय पर साइट अनलोडिंग।",
        "specsHinglish": "Direct factory cement bags, TMT saria, river sand and blue stone aggregates.",
        "deliverables": [
          "वजन कांटा पर्ची",
          "बीआईएस सर्टिफाइड टेस्ट रिपोर्ट",
          "डायरेक्ट साइट अनलोडिंग",
          "थोक दर डिस्काउंट"
        ]
      },
      {
        "id": "srv-paint-supplier",
        "name": "पेंट सप्लायर (Paint Supplier)",
        "nameEn": "Wholesale Paint & Waterproofing Supplies",
        "nameHi": "पेंट सप्लायर (एशियन पेंट्स, बर्जर अधिकृत डीलर)",
        "nameHinglish": "Paint Supplier (Asian Paints Dealer)",
        "unit": "liter",
        "avgRate": "Wholesale Dealer Rate (Royale / Apex / Tractor)",
        "specs": "एशियन पेंट्स, बर्जर, नेरोलैक के अधिकृत डिस्ट्रीब्यूटर। कंप्यूटर कंप्यूटराइज्ड कलर मैचिंग शेड्स।",
        "specsEn": "Authorized stockist for Asian Paints, Berger, Nerolac; computerized color matching tinting machines.",
        "specsHi": "100% असली पेंट बाल्टी, प्राइमर, पुट्टी एवं वॉटरप्रूफ कोटिंग होलसेल भाव पर।",
        "specsHinglish": "Original paint buckets, primer, putty aur computerized shade tinting.",
        "deliverables": [
          "कंप्यूटराइज्ड शेड मैचिंग",
          "बैच नंबर बिलिंग",
          "फ्री साइट डिलीवरी",
          "मटेरियल रिटर्न सुविधा"
        ]
      },
      {
        "id": "srv-hardware-supplier",
        "name": "हार्डवेयर सप्लायर (Hardware Supplier)",
        "nameEn": "Architectural Hardware & Hinges Supplier",
        "nameHi": "हार्डवेयर सप्लायर (कब्जे, लॉक, स्क्रू एवं फिटिंग्स)",
        "nameHinglish": "Hardware Supplier (Locks & Channels)",
        "unit": "wholesale",
        "avgRate": "Direct Distributor Discount (Hafele / Godrej / Dorset)",
        "specs": "सॉफ्ट-क्लोज हिंज, टेलीस्कोपिक ड्रॉवर चैनल, मोर्टिस लॉक, हैंडल, ब्रास टॉवर बोल्ट और फास्टनर्स।",
        "specsEn": "Soft-close hinges, telescopic drawer slides, mortise door locks, SS handles, and anchor fasteners.",
        "specsHi": "हेफेले, गोदरेज, डोर्सेट हार्डवेयर, ब्रास फिटिंग्स एवं स्टेनलेस स्टील स्क्रू।",
        "specsHinglish": "Original branded door locks, drawer sliders, hinges aur handles.",
        "deliverables": [
          "100% ओरिजिनल SS 304 हार्डवेयर",
          "वारंटी कार्ड",
          "थोक कैटलॉग दर",
          "स्पेयर स्क्रू किट"
        ]
      },
      {
        "id": "srv-logistics-partner",
        "name": "लॉजिस्टिक्स पार्टनर (Logistics Partner)",
        "nameEn": "Site Transport & Dumper Logistics",
        "nameHi": "लॉजिस्टिक्स पार्टनर (डंपर, पिकअप एवं टाटा ऐस)",
        "nameHinglish": "Logistics Partner (Dumper & Chota Hathi)",
        "unit": "trip",
        "avgRate": "₹1,400 - ₹3,200 / trip (Local City Radius)",
        "specs": "टाटा ऐस (छोटा हाथी), महिंद्रा बोलेरो पिकअप, 6-टायर डंपर और 10-टायर हाइवा वाहन।",
        "specsEn": "Tata Ace, Mahindra Bolero Maxitruck, 6-tyre tipper dumpers for prompt site transit.",
        "specsHi": "सामान को गोदाम से साइट तक सुरक्षित और समय पर पहुंचाने वाले ट्रांसपोर्ट वाहन।",
        "specsHinglish": "Site transport vehicles, tippers, pickup trucks aur dumper logistics.",
        "deliverables": [
          "जीपीएस ट्रैकिंग व्हीकल्स",
          "कुशल ड्राइवर",
          "लोडिंग-अनलोडिंग सपोर्ट",
          "ई-वे बिल अनुपालन"
        ]
      },
      {
        "id": "srv-warehouse-manager",
        "name": "वेयरहाउस मैनेजर (Warehouse Manager)",
        "nameEn": "Site Material Storage & Inventory Keeper",
        "nameHi": "वेयरहाउस मैनेजर (मटेरियल स्टोरेज एवं इन्वेंटरी)",
        "nameHinglish": "Warehouse & Site Inventory Manager",
        "unit": "month",
        "avgRate": "₹18,000 - ₹28,000 / month",
        "specs": "कंस्ट्रक्शन साइट पर सीमेंट, स्टील और टाइल्स की सुरक्षित स्टेकिंग, डैमेज रोकथाम और स्टॉक लेजर।",
        "specsEn": "Safe stacking of cement, steel rebars, anti-moisture storage, and digital daily stock register.",
        "specsHi": "बारिश और नमी से सीमेंट को बचाना, स्टॉक इन-आउट रजिस्टर मेंटेन करना।",
        "specsHinglish": "Cement and steel storage, inventory register aur material protection.",
        "deliverables": [
          "दैनिक स्टॉक लेजर रिपोर्ट",
          "नमी से सुरक्षित वुडन प्लेटफॉर्म",
          "चोरी रोकथाम सिक्योरिटी ऑडिट",
          "मटेरियल वेस्टेज नियंत्रण"
        ]
      }
    ]
  },
  {
    "id": "cat-machinery-equipment",
    "name": "मशीनरी और उपकरण सेवाएँ (Machinery & Equipment)",
    "nameEn": "Heavy Machinery & Construction Rentals",
    "nameHi": "मशीनरी और उपकरण सेवाएँ (JCB, मिक्सर, हाइड्रा)",
    "nameHinglish": "Heavy Machinery & Tools Rental",
    "iconName": "Wrench",
    "description": "मशीनरी रेंटल (JCB, हाइड्रा, कंक्रीट मिक्सर), सुरक्षा उपकरण और पावर टूल्स।",
    "descEn": "Earthmoving equipment (JCB, Excavators), mobile concrete mixers, cranes, and safety gear.",
    "descHi": "नींव खुदाई के लिए JCB, छत ढलाई के लिए लिफ्ट मिक्सर, और हाइड्रा क्रेन रेंटल।",
    "descHinglish": "JCB rental, concrete mixer machine, scaffolding aur safety kit supplier.",
    "subServicesCount": 3,
    "popularityScore": 91,
    "colorTheme": {
      "bgLight": "bg-sky-50/70",
      "border": "border-sky-200/80",
      "text": "text-sky-950",
      "accent": "text-sky-600",
      "badge": "bg-sky-100 text-sky-800",
      "hoverBorder": "hover:border-sky-400"
    },
    "subServices": [
      {
        "id": "srv-machinery-rental",
        "name": "मशीनरी रेंटल (JCB, हाइड्रा, कंक्रीट मिक्सर)",
        "nameEn": "Heavy Machinery Rental (JCB 3DX, Crane, Mixer)",
        "nameHi": "मशीनरी रेंटल (JCB खुदाई, कंक्रीट लिफ्ट मिक्सर)",
        "nameHinglish": "Machinery Rental (JCB & Concrete Mixer)",
        "unit": "hour / day",
        "avgRate": "₹1,200 - ₹1,600 / hr (JCB) • ₹2,500 / day (Mixer + Lift)",
        "specs": "JCB 3DX बैकहो लोडर, 20-टन हाइड्रा क्रेन, डीजल कंक्रीट मिक्सर मशीन और वाइब्रेटर नीडल।",
        "specsEn": "JCB 3DX Backhoe Loaders, 20-ton Hydra cranes, diesel batch mixers, and needle vibrators.",
        "specsHi": "कुशल ऑपरेटर और डीजल के साथ प्रति घंटे अथवा प्रति दिन के हिसाब से रेंटल।",
        "specsHinglish": "JCB backhoe, mobile crane, concrete batch mixer aur needle vibrator rentals.",
        "deliverables": [
          "अनुभवी मशीन ऑपरेटर",
          "डीजल ऑन-साइट फ्यूलिंग",
          "ब्रेकडाउन में तुरंत रिप्लेसमेंट",
          "लॉगशीट टाइमिंग रिकॉर्ड"
        ]
      },
      {
        "id": "srv-safety-gear",
        "name": "सुरक्षा उपकरण सप्लायर (Safety Gear)",
        "nameEn": "Industrial Safety Equipment & Personal PPE",
        "nameHi": "सुरक्षा उपकरण सप्लायर (हेलमेट, सेफ्टी बेल्ट, बूट्स)",
        "nameHinglish": "Safety Gear Supplier (Helmets & Belts)",
        "unit": "worker set",
        "avgRate": "₹1,150 / complete PPE worker kit",
        "specs": "आईएसआई मार्का हार्ड हैट (हेलमेट), फुल-बॉडी हार्नेस सेफ्टी बेल्ट, स्टील-टो सेफ्टी जूते और रिफ्लेक्टिव जैकेट।",
        "specsEn": "ISI marked hard hats, full body harness safety belts, steel-toe boots, and fluorescent safety vests.",
        "specsHi": "साइट पर मजदूरों की सुरक्षा हेतु प्रमाणित हेलमेट, बेल्ट, जूते और चश्मे।",
        "specsHinglish": "ISI approved safety helmet, harness belt, steel toe shoes aur safety jacket.",
        "deliverables": [
          "आईएसआई 2925 प्रमाणित हेलमेट",
          "डबल डोरी सेफ्टी बेल्ट",
          "स्टील टो लेदर शूज",
          "हाई विजिबिलिटी फ्लोरोसेंट वेस्ट"
        ]
      },
      {
        "id": "srv-tools-supplier",
        "name": "टूल्स सप्लायर (Tools Supplier)",
        "nameEn": "Power Tools & Construction Scaffolding",
        "nameHi": "टूल्स सप्लायर (ड्रिल, कटर, शटरिंग प्लेट्स)",
        "nameHinglish": "Power Tools & Shuttering Plates Supplier",
        "unit": "day / rent",
        "avgRate": "₹300 - ₹600 / day (Bosch / Makita Power Tools)",
        "specs": "बॉश डिमोलिशन हैमर (कंक्रीट ब्रेकर), 4-इंच मार्बल कटर, कोर ड्रिलिंग मशीन और एमएस शटरिंग प्लेट्स।",
        "specsEn": "Bosch 11kg demolition jackhammers, angle cutters, core drill rigs, and steel scaffolding pipes.",
        "specsHi": "छत ढलाई शटरिंग प्लेट, लोहे की पाइप बल्लियां और हैवी ड्यूटी पावर टूल्स।",
        "specsHinglish": "Demolition hammer, marble cutter, core cutting drill aur shuttering plates.",
        "deliverables": [
          "परीक्षित व चालू हालत टूल्स",
          "स्पेयर कटिंग ब्लेड्स",
          "एक्सटेंशन वायर कॉर्ड",
          "साइट पिकअप व ड्रॉप सुविधा"
        ]
      }
    ]
  },
  {
    "id": "cat-digital-support",
    "name": "डिजिटल और सपोर्ट सेवाएँ (Digital & Support Services)",
    "nameEn": "Digital, Tech & Media Services",
    "nameHi": "डिजिटल और सपोर्ट सेवाएँ",
    "nameHinglish": "Digital, Media & IT Support",
    "iconName": "Zap",
    "description": "आईटी डेवलपर्स, पेमेंट गेटवे, कस्टमर सपोर्ट, मार्केटिंग एजेंसी और ड्रोन वीडियोग्राफी।",
    "descEn": "BIM architectural software, project escrow gateways, 24/7 homeowner helpline, and drone site surveys.",
    "descHi": "प्रोजेक्ट का 3D वॉकथ्रू, ऑनलाइन पेमेंट एस्क्रो, साइट सपोर्ट एवं ड्रोन वीडियोग्राफी।",
    "descHinglish": "BIM modeling, online safe escrow, customer care support aur drone site photography.",
    "subServicesCount": 5,
    "popularityScore": 89,
    "colorTheme": {
      "bgLight": "bg-purple-50/70",
      "border": "border-purple-200/80",
      "text": "text-purple-950",
      "accent": "text-purple-600",
      "badge": "bg-purple-100 text-purple-800",
      "hoverBorder": "hover:border-purple-400"
    },
    "subServices": [
      {
        "id": "srv-it-developers",
        "name": "आईटी डेवलपर्स (BIM & Smart Home App)",
        "nameEn": "IT Developers & BIM Integration",
        "nameHi": "आईटी डेवलपर्स (BIM सॉफ्टवेयर एवं स्मार्ट होम ऐप)",
        "nameHinglish": "IT Developers & App Automation",
        "unit": "project",
        "avgRate": "₹25,000 - ₹75,000 / project module",
        "specs": "Revit BIM 3D मॉडल, कंस्ट्रक्शन प्रोग्रेस ट्रैकिंग वेब पोर्टल और IoT होम ऑटोमेशन सेटअप।",
        "specsEn": "Autodesk Revit BIM 3D modeling, construction milestone portal, and IoT home automation firmware.",
        "specsHi": "कंस्ट्रक्शन साइट का ऑनलाइन प्रोग्रेस डैशबोर्ड और मोबाइल ऑटोमेशन।",
        "specsHinglish": "BIM 3D modeling, site milestone dashboard aur mobile app integration.",
        "deliverables": [
          "3D BIM मॉडल फाइल",
          "क्लाउड डैशबोर्ड एक्सेस",
          "ऑटोमेशन API इंटीग्रेशन",
          "टेक्निकल सपोर्ट"
        ]
      },
      {
        "id": "srv-payment-gateway",
        "name": "पेमेंट गेटवे प्रदाता (Escrow Checkout)",
        "nameEn": "Payment Gateway & Escrow Milestones",
        "nameHi": "पेमेंट गेटवे (सुरक्षित माइलस्टोन एस्क्रो भुगतान)",
        "nameHinglish": "Safe Payment Gateway & Escrow",
        "unit": "transaction",
        "avgRate": "1.8% MDR (Razorpay / Cashfree Certified Escrow)",
        "specs": "सुरक्षित माइलस्टोन एस्क्रो। काम पूरा होने और क्लाइंट अप्रूवल के बाद ही फंड्स वेंडर को रिलीज होते हैं।",
        "specsEn": "Safe milestone escrow; funds released to contractors strictly after client stage approval.",
        "specsHi": "कस्टमर का पैसा बैंक में सुरक्षित, नींव या छत ढलाई पूरी होने पर ही वेंडर को भुगतान।",
        "specsHinglish": "Client milestone escrow, instant UPI, card payment aur automatic invoice.",
        "deliverables": [
          "माइलस्टोन एस्क्रो कॉन्ट्रैक्ट",
          "ऑटोमैटिक जीएसटी इनवॉइस",
          "यूपीआई/क्रेडिट कार्ड पेमेंट",
          "तत्काल बैंक सेटलमेंट"
        ]
      },
      {
        "id": "srv-customer-support",
        "name": "कस्टमर सपोर्ट टीम (Site Coordination)",
        "nameEn": "Customer Support & Site Dispute Resolution",
        "nameHi": "कस्टमर सपोर्ट (साइट विवाद एवं हेल्पलाइन)",
        "nameHinglish": "Customer Care & Dedicated Site Helpline",
        "unit": "project support",
        "avgRate": "24/7 Dedicated Homeowner Helpline",
        "specs": "होमओनर और कॉन्ट्रैक्टर के बीच समय, मटेरियल और पेमेंट समन्वय के लिए समर्पित सपोर्ट मैनेजर।",
        "specsEn": "Dedicated construction relationship managers for milestone dispute resolution and contractor liaison.",
        "specsHi": "काम में देरी या शिकायत पर तुरंत समाधान प्रदान करने वाली डेडिकेटेड हेल्पलाइन।",
        "specsHinglish": "24/7 call & WhatsApp support, contractor coordination aur fast dispute resolution.",
        "deliverables": [
          "डेडिकेटेड प्रोजेक्ट मैनेजर",
          "व्हाट्सएप सपोर्ट ग्रुप",
          "दैनिक साइट स्टेटस कॉल",
          "विवाद समाधान गारंटी"
        ]
      },
      {
        "id": "srv-marketing-agency",
        "name": "मार्केटिंग एजेंसी (Builder Lead Gen)",
        "nameEn": "Real Estate & Builder Digital Marketing",
        "nameHi": "मार्केटिंग एजेंसी (प्रोजेक्ट प्रमोशन एवं लीड्स)",
        "nameHinglish": "Digital Marketing for Builders & Contractors",
        "unit": "campaign",
        "avgRate": "Performance Based Lead Marketing",
        "specs": "विला और स्वतंत्र फ्लोर निर्माताओं के लिए गूगल ऐड्स, मेटा ऐड्स और हाई-क्वालिटी बायर लीड्स।",
        "specsEn": "Targeted Google Ads, Meta campaigns, and high-intent buyer inquiries for turnkey builders.",
        "specsHi": "मकान बनाने वाले ग्राहकों तक पहुंचने के लिए डिजिटल विज्ञापन एवं प्रमोशन।",
        "specsHinglish": "Google search ads, Facebook ads aur high intent homeowner leads.",
        "deliverables": [
          "टारगेटेड गूगल ऐड्स सेटअप",
          "हाई-कन्वर्टिंग लैंडिंग पेज",
          "वेरिफाइड ग्राहक इन्क्वायरी",
          "मासिक ROI रिपोर्ट"
        ]
      },
      {
        "id": "srv-photographer-drone",
        "name": "फोटोग्राफर/वीडियोग्राफर (Drone Survey)",
        "nameEn": "Site Photography & 4K Drone Videography",
        "nameHi": "फोटोग्राफर/वीडियोग्राफर (ड्रोन सर्वे एवं 4K वीडियो)",
        "nameHinglish": "Drone Shoot & Site Video Portfolio",
        "unit": "visit / shoot",
        "avgRate": "₹4,500 - ₹9,500 / site visit",
        "specs": "DJI 4K ड्रोन से एरियल साइट सर्वे, नींव से छत तक टाइमलैप्स वीडियोग्राफी और लक्ज़री वॉकथ्रू।",
        "specsEn": "DJI 4K aerial drone survey, project construction timelapses, and luxury completed walk-throughs.",
        "specsHi": "प्लॉट का 4K एरियल वीडियो, निर्माण कार्य का टाइमलैप्स और यूट्यूब/इंस्टा प्रोमोशनल वीडियो।",
        "specsHinglish": "4K drone video, project walkthrough aur construction progress timelapse.",
        "deliverables": [
          "4K ड्रोन एरियल फुटेज",
          "एडिटेड 60-सेकंड प्रोमो रील",
          "हाई-रेज़ोल्यूशन साइट फोटो किट",
          "क्लाउड ड्राइव डाउनलोड लिंक"
        ]
      }
    ]
  },
  {
    "id": "cat-professional-legal",
    "name": "प्रोफेशनल और कानूनी सेवाएँ (Professional & Legal Services)",
    "nameEn": "Professional & Legal Architecture",
    "nameHi": "प्रोफेशनल और कानूनी सेवाएँ",
    "nameHinglish": "Professional & Legal Consultancy",
    "iconName": "ShieldCheck",
    "description": "आर्किटेक्ट (2D/3D नक्शा), सिविल इंजीनियर (IS-456), लीगल एडवाइज़र और होम लोन/CA।",
    "descEn": "Council of Architecture licensed architects, structural stability engineers, RERA legal advisers, and CAs.",
    "descHi": "मकान का 3D नक्शा पासिंग, स्ट्रक्चरल स्टेबिलिटी सर्टिफिकेट, लैंड रजिस्ट्री जांच एवं होम लोन।",
    "descHinglish": "Certified architect, structural engineer certificate, registry legal advice aur home loan CA.",
    "subServicesCount": 4,
    "popularityScore": 95,
    "colorTheme": {
      "bgLight": "bg-teal-50/70",
      "border": "border-teal-200/80",
      "text": "text-teal-950",
      "accent": "text-teal-600",
      "badge": "bg-teal-100 text-teal-800",
      "hoverBorder": "hover:border-teal-400"
    },
    "subServices": [
      {
        "id": "srv-architect",
        "name": "आर्किटेक्ट (Architect - 2D/3D Map)",
        "nameEn": "Licensed Architect (2D Floor Plan & 3D Facade)",
        "nameHi": "आर्किटेक्ट (नक्शा, फ्लोर प्लान एवं 3D एलिवेशन)",
        "nameHinglish": "Registered Architect (2D Map & 3D Design)",
        "unit": "sq.ft",
        "avgRate": "₹15 - ₹35 / sq.ft (Complete Working Drawings)",
        "specs": "काउंसिल ऑफ आर्किटेक्चर (COA) पंजीकृत आर्किटेक्ट। 2D फ्लोर लेआउट, 3D फ्रंट एलिवेशन और म्युनिसिपल नक्शा।",
        "specsEn": "Council of Architecture registered architects for municipal building plans, floor plans, and 3D elevations.",
        "specsHi": "वास्तु सम्मत कमरों का साइज, हवा-रोशनी की व्यवस्था और खूबसूरत बाहरी लुक का 3D डिजाइन।",
        "specsHinglish": "Vastu compliant floor plans, modern front elevation aur municipal sanction drawing.",
        "deliverables": [
          "2D वर्किंग फ्लोर प्लान (AutoCAD)",
          "4K 3D फ्रंट एलिवेशन",
          "प्लंबिंग व इलेक्ट्रिकल लेआउट",
          "डोर-विंडो शेड्यूल"
        ]
      },
      {
        "id": "srv-civil-engineer",
        "name": "सिविल इंजीनियर (Civil Engineer - Structural)",
        "nameEn": "Civil Structural Engineer (IS-456 Seismic)",
        "nameHi": "सिविल इंजीनियर (पिलर, बीम एवं सरिया डिजाइन)",
        "nameHinglish": "Structural Engineer (IS-456 Certificate)",
        "unit": "sq.ft",
        "avgRate": "₹12 - ₹25 / sq.ft (STAAD-Pro Calculation)",
        "specs": "भूकंप रोधी संरचनात्मक डिजाइन (IS 456 एवं IS 1893)। पिलर, बीम और छत में लगने वाले सरिए की सटीक ड्राइंग।",
        "specsEn": "Earthquake resistant structural engineering (IS 456 / IS 1893), column/beam sizing, and steel schedules.",
        "specsHi": "घर को सुरक्षित और मजबूत बनाने के लिए पिलर साइज और सरिए की सटीक कैलकुलेशन।",
        "specsHinglish": "STAAD Pro calculation, column footing, beam rebar schedule aur safety certificate.",
        "deliverables": [
          "STAAD-Pro स्ट्रक्चरल रिपोर्ट",
          "कॉलम-बीम बार बेंडिंग शेड्यूल (BBS)",
          "फाउंडेशन डेप्थ ड्राइंग",
          "स्ट्रक्चरल स्टेबिलिटी सर्टिफिकेट"
        ]
      },
      {
        "id": "srv-legal-advisor",
        "name": "लीगल एडवाइज़र (Legal Advisor - Land & NOC)",
        "nameEn": "Legal Advisor (Property Title, RERA & NOC)",
        "nameHi": "लीगल एडवाइज़र (जमीन रजिस्ट्री, एनओसी एवं रेरा)",
        "nameHinglish": "Property Legal Advisor (Registry & NOC)",
        "unit": "case / review",
        "avgRate": "₹15,000 - ₹45,000 / Property Title Search & NOC",
        "specs": "जमीन रजिस्ट्री का 30-वर्षीय सर्च रिपोर्ट, नक्शा पासिंग एनओसी, विकास प्राधिकरण अप्रूवल और टाइटल डीड जांच।",
        "specsEn": "30-year property title verification, encumbrance certificates, municipal NOCs, and RERA compliance audit.",
        "specsHi": "प्लॉट खरीदने से पहले किसी भी कानूनी विवाद, लोन या फर्जीवाड़े से बचने के लिए अनुभवी वकील द्वारा जांच।",
        "specsHinglish": "30 years title search report, land registry verification aur builder agreement check.",
        "deliverables": [
          "30-ईयर टाइटल सर्च रिपोर्ट",
          "नॉन-एनकम्ब्रेंस सर्टिफिकेट (NEC)",
          "अथॉरिटी एनओसी ड्राफ्टिंग",
          "लीगल ओपिनियन लेटर"
        ]
      },
      {
        "id": "srv-finance-ca",
        "name": "फाइनेंस/CA (Finance & Project Loan)",
        "nameEn": "Chartered Accountant & Construction Loan",
        "nameHi": "फाइनेंस/CA (कंस्ट्रक्शन होम लोन एवं टैक्स फाइलिंग)",
        "nameHinglish": "CA & Home Construction Loan Expert",
        "unit": "loan file",
        "avgRate": "0.5% - 1.0% of sanctioned loan value",
        "specs": "एसबीआई, एचडीएफसी और आईसीआईसीआई से कंस्ट्रक्शन होम लोन की फाइल तैयार करना, एस्टीमेशन और सीए ऑडिट।",
        "specsEn": "Civil construction home loans from SBI/HDFC/ICICI, chartered valuation certificates, and tax filings.",
        "specsHi": "कम ब्याज दर पर मकान बनाने के लिए सरकारी व प्राइवेट बैंकों से आसान किस्तों में होम लोन स्वीकृति।",
        "specsHinglish": "Construction home loan approval, valuation report aur CA net-worth certification.",
        "deliverables": [
          "बैंक फॉरमेट एस्टीमेट सर्टिफिकेट",
          "सीए नेट-वर्थ सर्टिफिकेट",
          "लोन सैंक्शन लेटर फॉलोअप",
          "जीएसटी इनपुट टैक्स क्रेडिट गाइड"
        ]
      }
    ]
  },
  {
    "id": "cat-solar-green",
    "name": "सौर ऊर्जा और सोलर रूफटॉप (Solar Energy & Rooftop)",
    "nameEn": "Solar Energy & Rooftop Plants",
    "nameHi": "सौर ऊर्जा और सोलर रूफटॉप (ऑन-ग्रिड एवं हाइब्रिड)",
    "nameHinglish": "Solar Rooftop Panel & Inverter Setup",
    "iconName": "Sun",
    "description": "ऑन-ग्रिड व हाइब्रिड सोलर प्लांट, सरकारी सब्सिडी, नेट मीटरिंग और सोलर वाटर हीटर।",
    "descEn": "On-grid/hybrid rooftop solar plants (1kW-25kW), MNRE government subsidy, net metering, and solar water heaters.",
    "descHi": "बिजली का बिल शून्य करने के लिए छत पर सोलर पैनल, इन्वर्टर और सरकारी सब्सिडी सुविधा।",
    "descHinglish": "On-grid solar panels, government subsidy, net meter installation aur lithium battery setup.",
    "subServicesCount": 4,
    "popularityScore": 92,
    "colorTheme": {
      "bgLight": "bg-yellow-50/70",
      "border": "border-yellow-200/80",
      "text": "text-yellow-950",
      "accent": "text-yellow-600",
      "badge": "bg-yellow-100 text-yellow-800",
      "hoverBorder": "hover:border-yellow-400"
    },
    "subServices": [
      {
        "id": "srv-solar-rooftop",
        "name": "सोलर रूफटॉप प्लांट (3kW - 15kW)",
        "nameEn": "Rooftop On-Grid Solar Plant (3kW - 15kW)",
        "nameHi": "सोलर रूफटॉप प्लांट (ऑन-ग्रिड मोनो पर्क)",
        "nameHinglish": "Rooftop Solar Plant Setup (3kW-15kW)",
        "unit": "kW",
        "avgRate": "₹48,000 - ₹58,000 / kW (Before Subsidy)",
        "specs": "बायफेशियल मोनो पर्क हाफ-कट सोलर पैनल्स, सोलर इन्वर्टर और 25 साल की वारंटी।",
        "specsEn": "Bifacial Mono PERC panels, micro-inverters, GI structure, and 25-year performance warranty.",
        "specsHi": "छत पर 3kW से 15kW का मजबूत सोलर पैनल प्लांट। हर महीने 300 से 1500 यूनिट फ्री बिजली।",
        "specsHinglish": "Bifacial mono perc panels, GI structure aur 25 years performance warranty.",
        "deliverables": [
          "मोनो पर्क सोलर पैनल्स",
          "जीआई हॉट-डिप स्ट्रक्चर",
          "नेट मीटरिंग अप्रूवल",
          "25 साल वारंटी कार्ड"
        ]
      },
      {
        "id": "srv-solar-water-heater",
        "name": "सोलर वाटर हीटर (Solar Water Heater)",
        "nameEn": "ETC / FPC Solar Water Heater",
        "nameHi": "सोलर वाटर हीटर (100L - 500L क्षमता)",
        "nameHinglish": "Solar Water Geyser (100L to 500L)",
        "unit": "liter capacity",
        "avgRate": "₹22,000 - ₹45,000 / unit (100L - 300L)",
        "specs": "थ्री-टारगेट ईटीसी ग्लास ट्यूब्स, स्टेनलेस स्टील 304 इनर टैंक और पीयूएफ इंसुलेशन।",
        "specsEn": "ETC evacuated glass tubes, SS-304 inner food-grade tank, and heavy PUF heat insulation.",
        "specsHi": "बिना बिजली के साल भर 24 घंटे गर्म पानी देने वाला मजबूत सोलर हीटर।",
        "specsHinglish": "Glass tube ETC solar geyser with food grade SS tank.",
        "deliverables": [
          "ईटीसी ट्यूब्स सेट",
          "स्टेनलेस स्टील इनर टैंक",
          "पीयूएफ इंसुलेशन कोटिंग",
          "ऑन-साइट प्लंबिंग कनेक्शन"
        ]
      },
      {
        "id": "srv-solar-inverter-battery",
        "name": "सोलर इन्वर्टर & लिथियम बैटरी (Solar Inverter & Battery)",
        "nameEn": "Solar Hybrid Inverter & Lithium Battery",
        "nameHi": "हाइब्रिड सोलर इन्वर्टर एवं लिथियम बैटरी",
        "nameHinglish": "Solar Hybrid Inverter & Lithium Battery",
        "unit": "system",
        "avgRate": "₹45,000 - ₹1,20,000 / setup",
        "specs": "MPPT हाइब्रिड इन्वर्टर और 48V 100Ah लिथियम फेरोफॉस्फेट (LiFePO4) लाइफटाइम बैटरी बैकअप।",
        "specsEn": "Pure sine wave MPPT hybrid inverters and LiFePO4 fast-charging lithium battery banks.",
        "specsHi": "बिजली कटने पर भी एसी, फ्रिज और मोटर चलाने वाला आधुनिक लिथियम बैटरी सिस्टम।",
        "specsHinglish": "MPPT hybrid inverter with fast charging lithium battery bank.",
        "deliverables": [
          "प्योर साइन वेव इन्वर्टर",
          "LiFePO4 लिथियम बैटरी",
          "स्मार्ट वाईफाई ऐप मॉनिटरिंग",
          "5 साल रिप्लेसमेंट वारंटी"
        ]
      },
      {
        "id": "srv-net-metering-subsidy",
        "name": "नेट मीटरिंग & सरकारी सब्सिडी (Net Metering & Subsidy)",
        "nameEn": "DISCOM Net Metering & Subsidy Approval",
        "nameHi": "नेट मीटरिंग एवं पीएम सूर्य घर सब्सिडी फाइलिंग",
        "nameHinglish": "Net Metering & PM Surya Ghar Subsidy",
        "unit": "file",
        "avgRate": "₹4,500 - ₹8,000 / liaison file",
        "specs": "राज्य बिजली बोर्ड (DISCOM) से बाई-डायरेक्शनल नेट मीटर स्वीकृति और पीएम सूर्य घर सब्सिडी क्लेम।",
        "specsEn": "State DISCOM liaisoning, bidirectional net meter testing, and PM Surya Ghar central subsidy credit.",
        "specsHi": "बिजली विभाग से नेट मीटर लगवाना और ₹78,000 तक की सरकारी सब्सिडी बैंक में क्रेडिट कराना।",
        "specsHinglish": "Electricity board liaison, net meter inspection aur direct DBT subsidy credit.",
        "deliverables": [
          "डिस्कॉम सैंक्शन लेटर",
          "बाई-डायरेक्शनल नेट मीटर टेस्टिंग",
          "डीबीटी सब्सिडी अप्रूवल",
          "अंतिम बिजली बिल समायोजन"
        ]
      }
    ]
  },
  {
    "id": "cat-waterproofing",
    "name": "वॉटरप्रूफिंग और सीपेज समाधान (Waterproofing & Seepage)",
    "nameEn": "Waterproofing & Moisture Protection",
    "nameHi": "वॉटरप्रूफिंग और सीलन रोकथाम सेवाएँ",
    "nameHinglish": "Waterproofing & Seepage Protection",
    "iconName": "Droplets",
    "description": "छत, बेसमेंट, बाथरूम वाटरप्रूफिंग, इंजेक्शन ग्राउटिंग और सीलन रोकथाम।",
    "descEn": "PU terrace waterproofing, basement membrane tanking, pressure injection grouting, and anti-dampness treatment.",
    "descHi": "छत से पानी टपकना, दीवारों पर पपड़ी व सीलन और बेसमेंट लीकेज का पक्का 10 साल वारंटी समाधान।",
    "descHinglish": "Terrace PU coating, bathroom leakage, injection grouting aur wall dampness treatment.",
    "subServicesCount": 4,
    "popularityScore": 93,
    "colorTheme": {
      "bgLight": "bg-cyan-50/70",
      "border": "border-cyan-200/80",
      "text": "text-cyan-950",
      "accent": "text-cyan-600",
      "badge": "bg-cyan-100 text-cyan-800",
      "hoverBorder": "hover:border-cyan-400"
    },
    "subServices": [
      {
        "id": "srv-terrace-waterproofing",
        "name": "छत वाटरप्रूफिंग (Terrace PU Membrane Coating)",
        "nameEn": "Terrace PU Elastomeric Waterproofing",
        "nameHi": "छत वाटरप्रूफिंग (डॉ फिक्सिट पीयू कोटिंग)",
        "nameHinglish": "Terrace PU Waterproofing Coating",
        "unit": "sq.ft",
        "avgRate": "₹42 - ₹65 / sq.ft (Labour + Chemical)",
        "specs": "फाइबर मेष के साथ 3-कोट पॉलीयूरेथेन (PU) इलास्टोमेरिक कोटिंग और 10-वर्षीय लीकेज-फ्री वारंटी।",
        "specsEn": "3-coat UV resistant polyurethane elastomeric membrane reinforced with fiber mesh; 10-year warranty.",
        "specsHi": "डॉ फिक्सिट / फॉसरॉक रसायनों से छत पर फाइबर जाली लगाकर पक्की वाटरप्रूफिंग।",
        "specsHinglish": "3-coat PU liquid membrane with glass fiber mesh reinforcement.",
        "deliverables": [
          "सतह सफाई व ग्राइंडिंग",
          "प्राइमर + फाइबर मेश बिछाना",
          "2-कोट पीयू इलास्टोमेरिक सीलेंट",
          "10-वर्षीय वारंटी सर्टिफिकेट"
        ]
      },
      {
        "id": "srv-basement-tanking",
        "name": "बेसमेंट & लिफ्ट पिट वाटरप्रूफिंग (Basement Tanking)",
        "nameEn": "Basement & Lift Pit Negative Pressure Tanking",
        "nameHi": "बेसमेंट एवं लिफ्ट पिट वाटरप्रूफिंग",
        "nameHinglish": "Basement & Lift Pit Tanking Waterproofing",
        "unit": "sq.ft",
        "avgRate": "₹65 - ₹95 / sq.ft",
        "specs": "क्रिस्टलाइन वॉटरप्रूफिंग, बिटुमिनस मेम्ब्रेन और निगेटिव साइड वॉटर प्रेशर सीलिंग।",
        "specsEn": "Crystalline waterproofing slurry, SBS modified bituminous membrane, and negative side pressure sealing.",
        "specsHi": "जमीन के नीचे बेसमेंट और लिफ्ट गड्ढे में पानी भरने से रोकने के लिए हेवी-ड्यूटी कोटिंग।",
        "specsHinglish": "Heavy duty crystalline slurry and membrane waterproofing for underground basements.",
        "deliverables": [
          "क्रिस्टलाइन स्लरी कोटिंग",
          "बिटुमिनस मेम्ब्रेन टॉर्चिंग",
          "ड्रेनेज बोर्ड प्रोटेक्शन",
          "हाई प्रेशर वॉटर टेस्ट"
        ]
      },
      {
        "id": "srv-injection-grouting",
        "name": "बाथरूम लीकेज & इंजेक्शन ग्राउटिंग (Injection Grouting)",
        "nameEn": "PU Pressure Injection Grouting (No Tile Breaking)",
        "nameHi": "बिना टाइल तोड़े इंजेक्शन ग्राउटिंग",
        "nameHinglish": "Pressure Injection Grouting (No Breaking)",
        "unit": "point / bathroom",
        "avgRate": "₹4,500 - ₹8,500 / bathroom (No Tile Break)",
        "specs": "हाई प्रेशर पॉलीयूरेथेन (PU) इंजेक्शन ग्राउटिंग। बिना टाइल्स तोड़े कंक्रीट की अंदरूनी दरारें भरना।",
        "specsEn": "High-pressure PU foam injection pump into concrete honeycomb cracks without dismantling bathroom tiles.",
        "specsHi": "नीचे वाले फ्लोर की छत पर टपकने वाले पानी को बिना टाइल तोड़े तुरंत रोकने की आधुनिक तकनीक।",
        "specsHinglish": "High-pressure foam pump into concrete gaps to stop active leaking.",
        "deliverables": [
          "नोजल ड्रिलिंग व फिक्सिंग",
          "पॉलीयूरेथेन फोम इंजेक्शन",
          "इपॉक्सी ग्राउटिंग",
          "24-घंटे ड्राइंग टेस्ट"
        ]
      },
      {
        "id": "srv-wall-dampness",
        "name": "दीवार सीलन & एंटी-फंगस ट्रीटमेंट (Wall Dampness Treatment)",
        "nameEn": "Wall Anti-Efflorescence & Salt Treatment",
        "nameHi": "दीवार की पपड़ी व सीलन का पक्का इलाज",
        "nameHinglish": "Wall Dampness & Shor Treatment",
        "unit": "sq.ft",
        "avgRate": "₹28 - ₹45 / sq.ft",
        "specs": "शोरा (Efflorescence) न्यूट्रलाइज़र केमिकल, डैम्प-ब्लॉक प्राइमर और वॉटरप्रूफ वॉल पुट्टी।",
        "specsEn": "Anti-efflorescence salt neutralizer spray, damp-block primer, and waterproof putty application.",
        "specsHi": "पेंट छूटने और दीवारों में पपड़ी व बदबू आने की समस्या को जड़ से खत्म करने का उपचार।",
        "specsHinglish": "Salt neutralizer, damp lock primer aur waterproof putty treatment.",
        "deliverables": [
          "शोरा साल्ट न्यूट्रलाइजेशन",
          "2-कोट डैम्प-ब्लॉक बैरियर",
          "एंटी-बैक्टीरियल पुट्टी",
          "स्मूथ सैंडिंग फिनिश"
        ]
      }
    ]
  },
  {
    "id": "cat-modular-kitchen",
    "name": "मॉड्यूलर किचन और वॉर्डरोब (Modular Kitchen & Storage)",
    "nameEn": "Modular Kitchens & Storage Systems",
    "nameHi": "मॉड्यूलर किचन और वॉर्डरोब विशेषज्ञ",
    "nameHinglish": "German Modular Kitchen & Wardrobe",
    "iconName": "Grid",
    "description": "ऐक्रेलिक, पीयू ग्लॉस किचन, स्लाइडिंग वॉर्डरोब, टीवी यूनिट और जर्मन हार्डवेयर।",
    "descEn": "Acrylic, PU lacquered modular kitchens, floor-to-ceiling sliding wardrobes, and Hafele/Hettich fittings.",
    "descHi": "दीमक-रोधी मरीन प्लाईवुड, हाइड्रोलिक ड्रॉवर, इन-बिल्ट चिमनी व ओवन कैबिनेट्स।",
    "descHinglish": "Acrylic & PU finish modular kitchen, walk-in wardrobe aur soft close hardware.",
    "subServicesCount": 4,
    "popularityScore": 95,
    "colorTheme": {
      "bgLight": "bg-rose-50/70",
      "border": "border-rose-200/80",
      "text": "text-rose-950",
      "accent": "text-rose-600",
      "badge": "bg-rose-100 text-rose-800",
      "hoverBorder": "hover:border-rose-400"
    },
    "subServices": [
      {
        "id": "srv-acrylic-kitchen",
        "name": "ऐक्रेलिक / PU मॉड्यूलर किचन (Modular Kitchen)",
        "nameEn": "Acrylic & PU Lacquered Modular Kitchen",
        "nameHi": "ऐक्रेलिक / पीयू हाई-ग्लॉस मॉड्यूलर किचन",
        "nameHinglish": "Acrylic & PU Modular Kitchen",
        "unit": "package / rft",
        "avgRate": "₹1.45 Lakh - ₹3.8 Lakh (Turnkey Kitchen)",
        "specs": "710 ग्रेड वाटरप्रूफ मरीन प्लाई, ऐक्रेलिक शटर, टैंडम बॉक्स और हाइड्रोलिक हिंज।",
        "specsEn": "IS 710 BWP marine ply carcass, 1.5mm high-gloss acrylic shutters, tandem soft-close drawers.",
        "specsHi": "पानी और दीमक से सुरक्षित मरीन प्लाईवुड और प्रीमियम हाई-ग्लॉस फिनिश।",
        "specsHinglish": "BWP marine ply, acrylic shutters, tandem box drawers aur 10-year warranty.",
        "deliverables": [
          "3D किचन लेआउट",
          "710 मरीन प्लाई कारकेस",
          "सॉफ्ट-क्लोज टैंडम ड्रॉवर्स",
          "चिमनी और हॉब कटिंग"
        ]
      },
      {
        "id": "srv-sliding-wardrobe",
        "name": "स्लाइडिंग वॉर्डरोब (Sliding Wardrobe)",
        "nameEn": "Floor-to-Ceiling Sliding Wardrobe",
        "nameHi": "फ्लोर-टू-सीलिंग स्लाइडिंग अलमारी",
        "nameHinglish": "Modern Sliding Wardrobe with Mirror",
        "unit": "sq.ft",
        "avgRate": "₹1,450 - ₹2,400 / sq.ft",
        "specs": "एल्युमिनियम स्लिम प्रोफाइल स्लाइडर चैनल, टिंटेड टफन्ड ग्लास या लैकर ग्लास शटर।",
        "specsEn": "Aluminum profile top-hung sliding mechanism, lacquered glass/veneer shutters, and sensor LED strips.",
        "specsHi": "छत तक ऊंची अलमारी, सेंसर लाइट और स्मूथ स्लाइडिंग डोर्स।",
        "specsHinglish": "Top-hung slider wardrobe with sensor lighting and dress hanger units.",
        "deliverables": [
          "हैवी ड्यूटी स्लाइडर चैनल",
          "सॉफ्ट-क्लोज डैम्पर सिस्टम",
          "अंदरूनी सेंसर एलईडी लाइट",
          "लॉकर व ड्रॉवर यूनिट"
        ]
      },
      {
        "id": "srv-tv-console",
        "name": "टीवी मीडिया वॉल & क्रॉकरी यूनिट (TV Console & Bar)",
        "nameEn": "TV Media Wall & Floating Bar Unit",
        "nameHi": "टीवी मीडिया वॉल एवं क्रॉकरी कैबिनेट",
        "nameHinglish": "Designer TV Unit & Bar Cabinet",
        "unit": "running ft",
        "avgRate": "₹1,100 - ₹2,200 / rft",
        "specs": "चारकोल लूकर्स, मार्बल शीट्स बैकपैनल, फ्लोटिंग टीवी कंसोल और एंबिएंट बैकलाइटिंग।",
        "specsEn": "Charcoal fluted louvers, marble sheet backdrop, concealed cable management, and cove lighting.",
        "specsHi": "हॉल को मॉडर्न लुक देने वाली फ्लोटिंग टीवी कैबिनेट और वाइन/क्रॉकरी रैक।",
        "specsHinglish": "Fluted panel TV unit with warm cove backlighting.",
        "deliverables": [
          "चारकोल फ्लूटेड पैनल्स",
          "कंसील्ड वायर पाइपिंग",
          "हाइड्रोलिक फ्लैप डोर्स",
          "ग्लास डिस्प्ले शेल्व्स"
        ]
      },
      {
        "id": "srv-german-hardware",
        "name": "जर्मन हार्डवेयर फिटिंग (Hafele / Hettich Upgrades)",
        "nameEn": "Hafele & Hettich Hardware Upgrades",
        "nameHi": "जर्मन हार्डवेयर (हेफेले एवं हेटीक फिटिंग)",
        "nameHinglish": "Hafele / Hettich Hardware Fitting",
        "unit": "set",
        "avgRate": "₹18,000 - ₹45,000 / kitchen hardware set",
        "specs": "कार्गो पेंट्री यूनिट, मैजिक कॉर्नर, रोलर शटर और लिफ्ट-अप हाइड्रोलिक स्टे।",
        "specsEn": "Tall cargo pantry pullouts, blind corner magic carousel, roller shutter garage, and flap-up stays.",
        "specsHi": "किचन के कोने-कोने का पूरा उपयोग करने वाले 10 साल वारंटी जर्मन फिटिंग्स।",
        "specsHinglish": "Cargo pantry pullout, magic corner carousel aur lift-up hydraulic stays.",
        "deliverables": [
          "ओरिजिनल हेफेले/हेटीक वारंटी",
          "100,000 साइकिल लाइफ टेस्टिंग",
          "सॉफ्ट-क्लोज डैम्पर्स",
          "एंटी-स्लिप मैट्स"
        ]
      }
    ]
  },
  {
    "id": "cat-smart-security",
    "name": "स्मार्ट होम ऑटोमेशन और CCTV (Smart Home & Security)",
    "nameEn": "Smart Home Automation & CCTV Security",
    "nameHi": "स्मार्ट होम ऑटोमेशन एवं CCTV सुरक्षा",
    "nameHinglish": "Smart Home Automation & CCTV Surveillance",
    "iconName": "Zap",
    "description": "मोबाइल वॉयस कंट्रोल स्विच, 4K CCTV कैमरे, वीडियो डोर फोन और बायोमेट्रिक लॉक।",
    "descEn": "Zigbee smart touch switches, Hikvision 4K CCTV surveillance, video door phones, and biometric digital locks.",
    "descHi": "मोबाइल और एलेक्सा से पंखे-लाइट ऑन/ऑफ, घर की सुरक्षा के लिए 24 घंटे रिकॉर्डिंग वाले कैमरे।",
    "descHinglish": "Alexa touch switches, 4K night vision CCTV, smart video bell aur fingerprint locks.",
    "subServicesCount": 4,
    "popularityScore": 90,
    "colorTheme": {
      "bgLight": "bg-slate-50/70",
      "border": "border-slate-200/80",
      "text": "text-slate-950",
      "accent": "text-slate-600",
      "badge": "bg-slate-100 text-slate-800",
      "hoverBorder": "hover:border-slate-400"
    },
    "subServices": [
      {
        "id": "srv-smart-switches",
        "name": "स्मार्ट टच स्विच & कर्टेन मोटर (Smart Touch Switches)",
        "nameEn": "Smart Touch Switches & Motorized Curtains",
        "nameHi": "स्मार्ट टच स्विच एवं मोटर वाले पर्दे",
        "nameHinglish": "Smart Touch Switches & Curtain Motor",
        "unit": "point / node",
        "avgRate": "₹1,800 - ₹3,500 / smart node module",
        "specs": "कांच के टच स्विच बोर्ड, एलेक्सा/गूगल होम वॉयस कंट्रोल और ऑटोमैटिक पर्दे।",
        "specsEn": "Capacitive glass touch switchboards, Alexa/Google Home voice control, and motorized curtain tracks.",
        "specsHi": "मोबाइल ऐप से दुनिया में कहीं से भी लाइट, एसी और गीजर चालू/बंद करने की सुविधा।",
        "specsHinglish": "Glass touch smart switches with mobile app and Alexa voice control.",
        "deliverables": [
          "टच ग्लास स्विच प्लेट्स",
          "वाईफाई/जिगबी गेटवे हब",
          "स्मार्टफोन ऐप कॉन्फ़िगरेशन",
          "ऑटोमैटिक टाइमर रूटीन"
        ]
      },
      {
        "id": "srv-cctv-surveillance",
        "name": "4K CCTV सर्विलांस (Hikvision / CP Plus)",
        "nameEn": "4K ColorVu IP CCTV Surveillance System",
        "nameHi": "4K कलर नाइट विजन सीसीटीवी कैमरा सिस्टम",
        "nameHinglish": "4K CCTV Cameras with Mobile Live View",
        "unit": "camera set",
        "avgRate": "₹18,500 - ₹38,000 / 4 to 8 Camera Setup with NVR",
        "specs": "हिकविजन/सीपी प्लस 4K कलर-एट-नाइट कैमरे, 2TB सर्विलांस हार्ड डिस्क और मोबाइल लाइव व्यू।",
        "specsEn": "Hikvision 4K IP cameras with ColorVu night vision, 8-channel NVR, 2TB hard disk, and mobile app.",
        "specsHi": "अंधेरे में भी दिन जैसी रंगीन वीडियो रिकॉर्डिंग, मोबाइल फोन पर लाइव देखने की सुविधा।",
        "specsHinglish": "Color night vision CCTV cameras with 30 days recording and phone view.",
        "deliverables": [
          "4K IP डोम व बुलेट कैमरे",
          "8-चैनल NVR + 2TB HDD",
          "Cat6 शील्डेड केबलिंग",
          "मोबाइल लाइव स्ट्रीमिंग सेटअप"
        ]
      },
      {
        "id": "srv-biometric-locks",
        "name": "स्मार्ट बायोमेट्रिक लॉक (Biometric Digital Lock)",
        "nameEn": "Keyless Biometric Fingerprint & Card Lock",
        "nameHi": "स्मार्ट फिंगरप्रिंट एवं नंबर लॉक",
        "nameHinglish": "Smart Fingerprint & Passcode Door Lock",
        "unit": "unit",
        "avgRate": "₹9,500 - ₹19,500 / lock installation",
        "specs": "फिंगरप्रिंट, आरएफआईडी कार्ड, पिन कोड, मोबाइल ऐप और आपातकालीन मैकेनिकल चाबी।",
        "specsEn": "3D biometric fingerprint scanner, numeric PIN, RFID smart card, and mechanical emergency override.",
        "specsHi": "चाबी खोने का झंझट खत्म, फिंगरप्रिंट या पिन डालते ही दरवाजा खुलने वाला सुरक्षित लॉक।",
        "specsHinglish": "Fingerprint, passcode and mobile app unlock smart lock.",
        "deliverables": [
          "स्मार्ट बायोमेट्रिक लॉक",
          "एंटी-थेफ्ट मोर्टिस बॉडी",
          "4 आरएफआईडी कार्ड्स",
          "1-वर्षीय ऑन-साइट वारंटी"
        ]
      },
      {
        "id": "srv-video-doorbell",
        "name": "स्मार्ट वीडियो डोर फोन (Video Doorbell)",
        "nameEn": "WiFi Video Doorbell with 2-Way Talk",
        "nameHi": "स्मार्ट वीडियो डोरबेल (2-वे कॉलिंग)",
        "nameHinglish": "Smart Video Doorbell with Mobile Calling",
        "unit": "unit",
        "avgRate": "₹6,500 - ₹14,500 / setup",
        "specs": "फुल एचडी 1080p कैमरा, 2-वे ऑडियो बातचीत, मोशन डिटेक्शन और 7-इंच इनडोर टच स्क्रीन।",
        "specsEn": "1080p wide-angle camera, two-way audio talk, PIR motion sensor, and 7-inch indoor display.",
        "specsHi": "दरवाजे पर आए व्यक्ति से बिना दरवाजा खोले स्क्रीन अथवा मोबाइल पर बात करने की सुविधा।",
        "specsHinglish": "Wide angle video bell with indoor screen and phone intercom.",
        "deliverables": [
          "आउटडोर वेदरप्रूफ कैमरा बेल",
          "7-इंच इनडोर एचडी डिस्प्ले",
          "मोबाइल नोटिफिकेशन अलर्ट",
          "क्लाउड स्टोरेज सपोर्ट"
        ]
      }
    ]
  },
  {
    "id": "cat-windows-doors",
    "name": "ग्लास, एल्युमिनियम और UPVC खिड़की-दरवाजे (Windows & Glass)",
    "nameEn": "UPVC & Slim Aluminum Windows",
    "nameHi": "UPVC एवं एल्युमिनियम खिड़की-दरवाजे",
    "nameHinglish": "Soundproof UPVC & Glass Windows",
    "iconName": "DoorOpen",
    "description": "साउंडप्रूफ UPVC खिड़कियां, स्लिम एल्युमिनियम स्लाइडर्स, टफन्ड ग्लास रेलिंग।",
    "descEn": "Double-glazed noise-proof UPVC windows, slim-profile thermal aluminum sliders, and frameless glass railings.",
    "descHi": "बाहर का शोर-शराबा और धूल रोकने वाली डबल ग्लास खिड़कियां और खूबसूरत बालकनी टफन्ड ग्लास।",
    "descHinglish": "Noise-proof double glass UPVC windows aur glass railing for balconies.",
    "subServicesCount": 4,
    "popularityScore": 88,
    "colorTheme": {
      "bgLight": "bg-blue-50/70",
      "border": "border-blue-200/80",
      "text": "text-blue-950",
      "accent": "text-blue-600",
      "badge": "bg-blue-100 text-blue-800",
      "hoverBorder": "hover:border-blue-400"
    },
    "subServices": [
      {
        "id": "srv-upvc-windows",
        "name": "साउंडप्रूफ UPVC खिड़कियां (UPVC Windows)",
        "nameEn": "Double Glazed Acoustic UPVC Windows",
        "nameHi": "डबल ग्लास साउंडप्रूफ यूपीवीसी खिड़कियां",
        "nameHinglish": "Soundproof UPVC Windows with Mesh",
        "unit": "sq.ft",
        "avgRate": "₹450 - ₹750 / sq.ft (Kommerling / Fenesta Profiles)",
        "specs": "फेनेस्टा / कोमरलिंग प्रोफाइल, डबल इंसुलेटेड ग्लास (DGU), मच्छर जाली और मल्टी-पॉइंट लॉक।",
        "specsEn": "Lead-free multi-chamber UPVC profiles, DGU soundproof toughened glass, and stainless steel wire mesh.",
        "specsHi": "ट्रैफिक का शोर 80% तक कम करने वाली टिकाऊ यूपीवीसी खिड़कियां जो कभी पीली नहीं पड़तीं।",
        "specsHinglish": "Double glazed toughened glass UPVC window with mosquito net.",
        "deliverables": [
          "लेड-फ्री यूपीवीसी प्रोफाइल",
          "डबल ग्लास DGU यूनिट",
          "एसएस 304 मच्छर जाली",
          "मल्टी-पॉइंट लॉकिंग सिस्टम"
        ]
      },
      {
        "id": "srv-slim-aluminum",
        "name": "स्लिम एल्युमिनियम स्लाइडर्स (Slim Profile Sliders)",
        "nameEn": "Slim Architectural Aluminum Sliding Doors",
        "nameHi": "स्लिम-लाइन एल्युमिनियम स्लाइडिंग डोर्स",
        "nameHinglish": "Slim Profile Aluminum Glass Doors",
        "unit": "sq.ft",
        "avgRate": "₹650 - ₹1,200 / sq.ft",
        "specs": "अति-पतली 20mm फ्रेम, फ्लोर-टू-सीलिंग लार्ज ग्लास व्यू, स्मूथ बेयरिंग रोलर्स।",
        "specsEn": "Ultra-slim 20mm sightline profiles, seamless floor-to-ceiling panoramic glass, and heavy-duty concealed rollers.",
        "specsHi": "हॉल और बालकनी के बीच बड़ा खुला पैनोरमिक व्यू देने वाले लग्जरी स्लाइडिंग डोर्स।",
        "specsHinglish": "Minimal 20mm slim profile aluminum glass sliding doors.",
        "deliverables": [
          "प्रीमियम पाउडर कोटेड प्रोफाइल",
          "12mm टफन्ड सेफ्टी ग्लास",
          "सॉफ्ट डैम्पर स्लाइडर रोलर्स",
          "वॉटर ड्रेनेज ट्रैक"
        ]
      },
      {
        "id": "srv-glass-railing",
        "name": "टफन्ड ग्लास रेलिंग (Toughened Glass Railing)",
        "nameEn": "Frameless Toughened Glass Balcony Railing",
        "nameHi": "बालकनी टफन्ड ग्लास रेलिंग",
        "nameHinglish": "Balcony Toughened Glass Railing",
        "unit": "running ft",
        "avgRate": "₹1,400 - ₹2,600 / running ft",
        "specs": "12mm/15mm टफन्ड ग्लास, एसएस 304 बेस चैनल या स्पिगॉट फिटिंग्स और हैंडरेल।",
        "specsEn": "12mm/15mm clear toughened glass, SS 304 heavy base shoe channel, and top slotted pipe handrail.",
        "specsHi": "बालकनी और सीढ़ियों को मॉडर्न लुक देने वाली मजबूत फ्रेमलेस ग्लास रेलिंग।",
        "specsHinglish": "12mm toughened glass with stainless steel base track.",
        "deliverables": [
          "12mm टफन्ड सेफ्टी ग्लास",
          "एसएस 304 हैवी बेस चैनल",
          "एल्युमिनियम टॉप ग्रिप रेलिंग",
          "एंकर बोल्ट साइट फिक्सिंग"
        ]
      },
      {
        "id": "srv-teak-flush-doors",
        "name": "सागवान & फ्लश डोर (Designer Doors)",
        "nameEn": "Teakwood Main Doors & Flush Doors",
        "nameHi": "सागवान मेन गेट डोर एवं फ्लश दरवाजे",
        "nameHinglish": "Teakwood & Laminated Flush Doors",
        "unit": "door",
        "avgRate": "₹6,500 - ₹25,000 / door unit",
        "specs": "सॉलिड सीपी सागवान नक्काशीदार मेन डोर, वाटरप्रूफ फ्लश डोर और प्रीमियम लैमिनेट कोटिंग।",
        "specsEn": "Solid Burma/CP teak carved entrance doors, and BWP grade flush doors with 1mm laminate.",
        "specsHi": "घर के मुख्य द्वार के लिए नक्काशीदार सागवान दरवाजा और कमरों के लिए डिजाइनर फ्लश डोर।",
        "specsHinglish": "Carved teakwood main door aur laminated flush bedroom doors.",
        "deliverables": [
          "एंटी-टर्माइट ट्रीटेड लकड़ी",
          "1mm डिजाइनर माइका पेस्टिंग",
          "सागवान मोल्डिंग बीडिंग",
          "प्रीमियम पॉलिश / लैकर कोट"
        ]
      }
    ]
  },
  {
    "id": "cat-flooring-marble",
    "name": "मार्बल, ग्रेनाइट और लक्ज़री फ्लोरिंग (Marble & Flooring)",
    "nameEn": "Italian Marble & Granite Flooring",
    "nameHi": "मार्बल, ग्रेनाइट एवं फ्लोरिंग कार्य",
    "nameHinglish": "Italian Marble & Kitchen Granite",
    "iconName": "Layers",
    "description": "इटैलियन मार्बल, किचन ग्रेनाइट प्लेटफॉर्म, वुडन फ्लोरिंग और डायमंड पॉलिशिंग।",
    "descEn": "Italian marble bookmatch laying, granite kitchen countertops with edge moulding, and wooden flooring.",
    "descHi": "शीशे जैसी चमक देने वाली इटैलियन मार्बल डायमंड पॉलिश और किचन का ग्रेनाइट स्लैब।",
    "descHinglish": "Italian marble laying, diamond mirror polish aur kitchen granite counter.",
    "subServicesCount": 4,
    "popularityScore": 87,
    "colorTheme": {
      "bgLight": "bg-stone-50/70",
      "border": "border-stone-200/80",
      "text": "text-stone-950",
      "accent": "text-stone-600",
      "badge": "bg-stone-100 text-stone-800",
      "hoverBorder": "hover:border-stone-400"
    },
    "subServices": [
      {
        "id": "srv-italian-marble",
        "name": "इटैलियन मार्बल लेइंग (Italian Marble Laying)",
        "nameEn": "Italian Marble Bookmatch Laying",
        "nameHi": "इटैलियन मार्बल बुकमैच लेइंग",
        "nameHinglish": "Italian Marble Bookmatch Flooring",
        "unit": "sq.ft",
        "avgRate": "₹65 - ₹110 / sq.ft (Laying Labour)",
        "specs": "बुकमैच वेन अलाइनमेंट, व्हाइट सीमेंट बेड, इपॉक्सी जॉइंट्स और डायमंड डिस्क मिरर पॉलिश।",
        "specsEn": "Laser level bookmatched vein layout, white cement dry-mix bed, transparent epoxy jointing, and 7-stage diamond polish.",
        "specsHi": "डिजाइन को आपस में मिलाकर बिछाना ताकि शीशे जैसा चमकदार फर्श तैयार हो सके।",
        "specsHinglish": "Vein matched Italian marble laying with seamless transparent epoxy.",
        "deliverables": [
          "लेजर लेवल अलाइनमेंट",
          "ट्रांसपेरेंट इपॉक्सी ग्राउटिंग",
          "7-स्टेज डायमंड पैड घिसाई",
          "सिल्ट क्रिस्टलाइजर चमक"
        ]
      },
      {
        "id": "srv-granite-countertop",
        "name": "किचन ग्रेनाइट प्लेटफॉर्म (Granite Countertop)",
        "nameEn": "Granite Kitchen Countertop & Sink Moulding",
        "nameHi": "किचन ग्रेनाइट स्लैब एवं सिंक मोल्डिंग",
        "nameHinglish": "Kitchen Granite Platform Moulding",
        "unit": "running ft",
        "avgRate": "₹280 - ₹550 / rft (Fabrication & Moulding)",
        "specs": "ब्लैक गैलेक्सी / राजस्थान ब्लैक ग्रेनाइट, डबल एज मोल्डिंग, अंडर-माउंट सिंक कटिंग।",
        "specsEn": "Black Galaxy/Z-Black granite slab, full bullnose edge moulding, and undermount quartz sink core cutout.",
        "specsHi": "किचन स्लैब की चिकनी गोल मोल्डिंग और सिंक को मजबूती से बैठाने का काम।",
        "specsHinglish": "Granite platform cutting, full bullnose moulding aur sink fitting.",
        "deliverables": [
          "लेजर कटिंग ग्रेनाइट स्लैब",
          "फुल बुलनोज डबल मोल्डिंग",
          "अंडर-माउंट सिंक फिटिंग",
          "सिलिकॉन वॉटर सीलेंट"
        ]
      },
      {
        "id": "srv-wooden-flooring",
        "name": "वुडन लेमिनेट & SPC फ्लोरिंग (Wooden Flooring)",
        "nameEn": "Wooden Laminate & Waterproof SPC Flooring",
        "nameHi": "वुडन फ्लोरिंग एवं वाटरप्रूफ एसपीसी टाइल्स",
        "nameHinglish": "Wooden Laminate & SPC Click Flooring",
        "unit": "sq.ft",
        "avgRate": "₹95 - ₹185 / sq.ft (Material + Fitting)",
        "specs": "AC4 ग्रेड वुडन लेमिनेट, 100% वाटरप्रूफ एसपीसी क्लिक-लॉक प्लैंक्स और 2mm ईवा अंडरलेमेंट।",
        "specsEn": "AC4 scratch-resistant laminate planks, 100% waterproof stone plastic composite (SPC) click-lock flooring.",
        "specsHi": "बेडरूम को लक्ज़री लुक देने वाला लकड़ी जैसा वाटरप्रूफ और खरोंच-रोधी फर्श।",
        "specsHinglish": "Click lock wooden flooring with anti-moisture foam underlay.",
        "deliverables": [
          "2mm एंटी-मॉइस्चर फोम अंडरले",
          "क्लिक-लॉक प्लैंक फिटिंग",
          "मैचिंग स्कर्टिंग प्रोफाइल्स",
          "डोर ट्रांजिशन स्ट्रिप्स"
        ]
      },
      {
        "id": "srv-diamond-polish",
        "name": "मार्बल डायमंड पॉलिशिंग (Marble Diamond Polish)",
        "nameEn": "Heavy-Duty Marble Diamond Polishing",
        "nameHi": "मार्बल डायमंड घिसाई एवं शीशा पॉलिश",
        "nameHinglish": "Marble Diamond Mirror Polish",
        "unit": "sq.ft",
        "avgRate": "₹22 - ₹38 / sq.ft",
        "specs": "सिंगल डिस्क हैवी मशीन से 7-ग्रेड डायमंड पैड घिसाई, क्रिस्टलाइज़र स्प्रे और मिरर चमक।",
        "specsEn": "Single-disc Italian machine with resin-bonded diamond grit pads (50 to 3000 grit) and crystallizer chemical buffing.",
        "specsHi": "पुराने या नए मार्बल पर जमी गंदगी हटाकर बिल्कुल नए जैसा चमकदार बनाने का काम।",
        "specsHinglish": "Machine diamond grit buffing, pinhole filling aur mirror finish shine.",
        "deliverables": [
          "पिनहोल इपॉक्सी भराई",
          "7-स्टेज डायमंड ग्रिट घिसाई",
          "क्रिस्टलाइजर केमिकल स्प्रे",
          "मिरर ग्लॉस बफिंग"
        ]
      }
    ]
  },
  {
    "id": "cat-landscaping-garden",
    "name": "लैंडस्केपिंग और टेरेस गार्डन (Landscaping & Garden)",
    "nameEn": "Landscaping & Terrace Garden Architecture",
    "nameHi": "लैंडस्केपिंग एवं टेरेस गार्डन निर्माण",
    "nameHinglish": "Terrace Garden & Landscape Design",
    "iconName": "Trees",
    "description": "वर्टिकल वॉल गार्डन, टेरेस गज़ीबो, हरी घास का लॉन और ऑटोमैटिक ड्रिप इरिगेशन।",
    "descEn": "Living vertical green walls, wooden rooftop pergolas, natural turf laying, and automated drip irrigation.",
    "descHi": "छत और बालकनी में हरा-भरा गार्डन, लकड़ी की छतरी (Pergola), वाटर फाउंटेन और हरी घास।",
    "descHinglish": "Vertical garden on walls, terrace lawn, gazebo wooden pergola aur automated water drip.",
    "subServicesCount": 4,
    "popularityScore": 86,
    "colorTheme": {
      "bgLight": "bg-green-50/70",
      "border": "border-green-200/80",
      "text": "text-green-950",
      "accent": "text-green-600",
      "badge": "bg-green-100 text-green-800",
      "hoverBorder": "hover:border-green-400"
    },
    "subServices": [
      {
        "id": "srv-vertical-garden",
        "name": "वर्टिकल वॉल गार्डन (Vertical Living Wall)",
        "nameEn": "Automated Living Vertical Green Wall",
        "nameHi": "दीवार पर वर्टिकल गार्डन एवं ड्रिप पाइप",
        "nameHinglish": "Vertical Green Wall with Auto Drip",
        "unit": "sq.ft",
        "avgRate": "₹450 - ₹850 / sq.ft",
        "specs": "यूवी-स्टैबलाइज्ड मॉड्यूलर पॉट्स, ऑटोमैटिक टाइमर ड्रिप इरिगेशन और प्यूरीफाइंग पौधे।",
        "specsEn": "UV-stabilized modular planter modules, automated battery-timer micro-drip manifold, and air-purifying foliage.",
        "specsHi": "दीवार पर हरे-भरे पौधों का फ्रेम जो घर के तापमान को 3 से 5 डिग्री तक ठंडा रखता है।",
        "specsHinglish": "Living plants wall with automatic timer drip irrigation.",
        "deliverables": [
          "मॉड्यूलर फ्रेम माउंटिंग",
          "माइक्रो ड्रिप इरिगेशन पाइप्स",
          "प्रीमियम एग्जॉटिक पौधे",
          "2-महीने का फ्री मेंटेनेंस"
        ]
      },
      {
        "id": "srv-terrace-gazebo",
        "name": "रूफटॉप गज़ीबो & पेर्गोला (Rooftop Wooden Gazebo)",
        "nameEn": "Weatherproof Wooden Pergola & Gazebo",
        "nameHi": "छत पर लकड़ी का गज़ीबो एवं पेर्गोला",
        "nameHinglish": "Terrace Wooden Pergola & Gazebo",
        "unit": "sq.ft",
        "avgRate": "₹650 - ₹1,400 / sq.ft",
        "specs": "WPC वेदरप्रूफ वुडन कम्पोजिट बीम्स, टफन्ड ग्लास कैनोपी, आउटडोर फ्लोरिंग और सीटिंग।",
        "specsEn": "Anti-rot WPC composite beams, toughened glass rain canopy, and ambient warm strip lighting.",
        "specsHi": "छत पर शाम को बैठने के लिए धूप और बारिश से सुरक्षित सुंदर लकड़ी जैसी छतरी।",
        "specsHinglish": "Weatherproof pergola with toughened glass roof and lights.",
        "deliverables": [
          "WPC हैवी कॉलम बीम",
          "10mm टफन्ड ग्लास कैनोपी",
          "कंसील्ड एलईडी लाइटिंग",
          "वेदरप्रूफ आउटडोर कोटिंग"
        ]
      },
      {
        "id": "srv-lawn-grass",
        "name": "प्राकृतिक लॉन & प्लांटेशन (Natural Lawn Grass)",
        "nameEn": "Natural Korean/Bermuda Lawn Turf Laying",
        "nameHi": "प्राकृतिक हरी घास लॉन एवं पौधे",
        "nameHinglish": "Natural Carpet Grass & Plant Setup",
        "unit": "sq.ft",
        "avgRate": "₹28 - ₹55 / sq.ft",
        "specs": "कोरियन / बरमूडा कार्पेट ग्रास, वर्मीकम्पोस्ट फर्टिलाइज़र और ड्रेनेज लेयरिंग।",
        "specsEn": "Fresh weed-free Bermuda/Korean carpet grass turf rolls, vermicompost soil conditioning, and grading.",
        "specsHi": "घर के गार्डन या छत पर मखमली हरी घास का कालीन बिछाना।",
        "specsHinglish": "Bermuda lawn turf rolls with rich soil preparation.",
        "deliverables": [
          "मिट्टी लेवलिंग व खाद मिक्सिंग",
          "फ्रेश बरमूडा कार्पेट ग्रास रोल्स",
          "रोलर से दबाई व लेवलिंग",
          "फर्स्ट क्योरिंग वाटरिंग गाइड"
        ]
      },
      {
        "id": "srv-water-fountain",
        "name": "वाटर फाउंटेन & पाथवे (Outdoor Water Fountain)",
        "nameEn": "Handcrafted Stone Fountain & Pathway",
        "nameHi": "पत्थर का वाटर फाउंटेन एवं पाथवे",
        "nameHinglish": "Water Fountain & Garden Stone Path",
        "unit": "unit",
        "avgRate": "₹18,000 - ₹65,000 / setup",
        "specs": "सैंडस्टोन फव्वारा, सबमर्सिबल वाटर रीसर्कुलेशन पंप और प्राकृतिक पत्थर के स्टेपिंग टाइल्स।",
        "specsEn": "Natural carved sandstone fountain, submersible recycling pump, underwater LED lights, and stone pavers.",
        "specsHi": "गार्डन में बहते पानी की मधुर आवाज देने वाला सुंदर फव्वारा और चलने का रास्ता।",
        "specsHinglish": "Carved stone water fountain with underwater lights.",
        "deliverables": [
          "हैंडक्राफ्टेड स्टोन फाउंटेन",
          "लो-वॉटेज वाटर पंप",
          "अंडरवाटर वॉटरप्रूफ एलईडी लाइट",
          "रॉकरी स्टोन अरेंजमेंट"
        ]
      }
    ]
  },
  {
    "id": "cat-demolition-earthwork",
    "name": "ध्वस्तीकरण और मलबा प्रबंधन (Demolition & Malba Clearing)",
    "nameEn": "Controlled Demolition & Earthwork",
    "nameHi": "मकान ध्वस्तीकरण एवं मलबा प्रबंधन",
    "nameHinglish": "Safe Building Demolition & Malba Clearing",
    "iconName": "Tractor",
    "description": "पुराना मकान सुरक्षित तोड़फोड़, मलबा लोडिंग, डंपर ट्रांसपोर्ट और बेसमेंट खुदाई।",
    "descEn": "Safe mechanical building demolition, concrete breaker jackhammers, debris transport, and site excavation.",
    "descHi": "आसपास के मकानों को बिना नुकसान पहुंचाए पुरानी कोठी/मकान तोड़ना और सारा मलबा हटाना।",
    "descHinglish": "Controlled building demolition, malba lifting, dumper transport aur basement digging.",
    "subServicesCount": 4,
    "popularityScore": 84,
    "colorTheme": {
      "bgLight": "bg-orange-50/70",
      "border": "border-orange-200/80",
      "text": "text-orange-950",
      "accent": "text-orange-600",
      "badge": "bg-orange-100 text-orange-800",
      "hoverBorder": "hover:border-orange-400"
    },
    "subServices": [
      {
        "id": "srv-building-demolition",
        "name": "सुरक्षित मकान तोड़फोड़ (Controlled Building Demolition)",
        "nameEn": "Controlled Building & Slab Demolition",
        "nameHi": "मकान व आरसीसी छत की सुरक्षित तोड़फोड़",
        "nameHinglish": "Building Demolition with Jackhammer",
        "unit": "sq.ft (Builtup)",
        "avgRate": "₹25 - ₹48 / sq.ft (Builtup Area)",
        "specs": "कंक्रीट ब्रेकर जैकहैमर, सुरक्षा जाली, धूल नियंत्रण वाटर मिस्ट और अनुभवी लेबर टीम।",
        "specsEn": "Hydraulic breakers, pneumatic jackhammers, safety scaffolding, and water mist dust suppression.",
        "specsHi": "पड़ोसी की दीवार बचाकर मकान को वैज्ञानिक तरीके से ऊपर से नीचे की ओर सुरक्षित तोड़ना।",
        "specsHinglish": "Safe demolition using hydraulic breakers and safety green nets.",
        "deliverables": [
          "सुरक्षा ग्रीन नेट बैरियर",
          "मैन्युअल व मशीन तोड़फोड़",
          "सरिया छंटाई व रीसाइक्लिंग",
          "संरचनात्मक सुरक्षा निरीक्षण"
        ]
      },
      {
        "id": "srv-malba-transport",
        "name": "मलबा लोडिंग & डंपर ट्रांसपोर्ट (Malba Debris Clearing)",
        "nameEn": "Debris & Malba Clearing by Dumper Trucks",
        "nameHi": "मलबा उठाई एवं डंपर से ट्रांसपोर्ट",
        "nameHinglish": "Malba Clearing & Dumper Disposal",
        "unit": "dumper trip",
        "avgRate": "₹2,200 - ₹3,800 / dumper load (Municipal Dump)",
        "specs": "जेसीबी से मलबा लोडिंग, 6-टायर डंपर में भरकर अधिकृत म्युनिसिपल डंपिंग ग्राउंड तक पहुंचाना।",
        "specsEn": "JCB mechanical loading, 6-wheeler dumper trucks, and transport to authorized MCD/municipal landfill.",
        "specsHi": "साइट को एकदम साफ-सुथरा करके नया निर्माण कार्य शुरू करने योग्य बनाना।",
        "specsHinglish": "JCB malba loading and municipal landfill dumper trips.",
        "deliverables": [
          "जेसीबी ऑटोमैटिक लोडिंग",
          "डंपर ट्रांसपोर्ट पर्ची",
          "सड़क व साइट की सफाई",
          "डंपिंग ग्राउंड वैध डिस्पोजल"
        ]
      },
      {
        "id": "srv-core-cutting",
        "name": "कंक्रीट कोर कटिंग (RCC Core Cutting)",
        "nameEn": "Diamond RCC Core Cutting & Chipping",
        "nameHi": "आरसीसी पिलर व स्लैब कोर कटिंग",
        "nameHinglish": "Diamond Core Cutting for Pipes & AC",
        "unit": "hole / inch depth",
        "avgRate": "₹600 - ₹1,400 / core hole (2-inch to 6-inch)",
        "specs": "डायमंड बिट वॉटर-कूल्ड कोर ड्रिलिंग। बिना किसी कंपन के आरसीसी छत में पाइप के लिए छेद।",
        "specsEn": "Vibration-free water-cooled diamond core drill rig for plumbing pipes, AC sleeves, and ducts.",
        "specsHi": "छत या बीम को हथौड़े से तोड़े बिना बिल्कुल गोल चिकना होल निकालना।",
        "specsHinglish": "Vibration-free diamond core drilling for plumbing and AC sleeves.",
        "deliverables": [
          "सटीक लेजर मार्किंग",
          "वाटर-कूल्ड डायमंड कोरिंग",
          "कंक्रीट स्लज सफाई",
          "नो-वाइब्रेशन सेफ्टी"
        ]
      },
      {
        "id": "srv-basement-excavation",
        "name": "बेसमेंट खुदाई & अर्थवर्क (Earth Excavation)",
        "nameEn": "Basement Excavation & Earth Leveling",
        "nameHi": "बेसमेंट की गहरी खुदाई एवं समतलीकरण",
        "nameHinglish": "Basement Excavation with JCB Shovel",
        "unit": "brass / 100 cu.ft",
        "avgRate": "₹750 - ₹1,250 / 100 cu.ft (with Soil Carting)",
        "specs": "जेसीबी व पोकलेन मशीन से बेसमेंट की गहरी खुदाई, मिट्टी को बाहर डंप कराना और लेवलिंग।",
        "specsEn": "Poclain/JCB heavy excavator, sheet piling support, laser depth leveling, and surplus soil carting.",
        "specsHi": "बेसमेंट बनाने के लिए 8 से 12 फीट गहरी खुदाई और फालतू मिट्टी को बाहर ले जाना।",
        "specsHinglish": "Poclain deep basement digging and soil carting away.",
        "deliverables": [
          "लेजर लेवल डेप्थ चेकिंग",
          "सॉइल स्लोप प्रोटेक्शन",
          "ट्रकों में मिट्टी लोडिंग",
          "साइट कंपैक्शन रिपोर्ट"
        ]
      }
    ]
  },
  {
    "id": "cat-borewell-water",
    "name": "बोरवेल और रेनवाटर हार्वेस्टिंग (Borewell & Water Systems)",
    "nameEn": "Borewell Drilling & Rainwater Harvesting",
    "nameHi": "बोरवेल खुदाई एवं रेनवाटर हार्वेस्टिंग",
    "nameHinglish": "Borewell Drilling & Water Storage",
    "iconName": "Droplets",
    "description": "6/8-इंच बोरवेल मशीन ड्रिलिंग, सबमर्सिबल पंप, रेनवाटर हार्वेस्टिंग और वाटर प्यूरीफायर।",
    "descEn": "Hydraulic rig borewell drilling (150ft-800ft), stainless steel submersible pumps, and rainwater harvesting pits.",
    "descHi": "पीने के मीठे पानी के लिए आधुनिक रिग मशीन से बोरवेल और बारिश का पानी जमीन में उतारने का पिट।",
    "descHinglish": "Borewell machine drilling, submersible pump setup aur rainwater recharge pit.",
    "subServicesCount": 4,
    "popularityScore": 85,
    "colorTheme": {
      "bgLight": "bg-teal-50/70",
      "border": "border-teal-200/80",
      "text": "text-teal-950",
      "accent": "text-teal-600",
      "badge": "bg-teal-100 text-teal-800",
      "hoverBorder": "hover:border-teal-400"
    },
    "subServices": [
      {
        "id": "srv-borewell-drilling",
        "name": "बोरवेल ड्रिलिंग (Borewell Rig Machine)",
        "nameEn": "Hydraulic Rig Borewell Drilling (150ft - 800ft)",
        "nameHi": "बोरवेल मशीन ड्रिलिंग (6.5 इंच / 8.5 इंच)",
        "nameHinglish": "Borewell Drilling with Rig Machine",
        "unit": "running ft",
        "avgRate": "₹85 - ₹160 / running ft (Drilling + PVC Casing)",
        "specs": "हाइड्रोलिक कंप्रेसर रिग मशीन, फिनोलेक्स/सुप्रीम हैवी ड्यूटी पीवीसी केसिंग पाइप्स और सैंड फिल्टर।",
        "specsEn": "Direct rotary hydraulic compressor rigs, Finolex/Supreme heavy ISI slotted casing pipes.",
        "specsHi": "कठोर पत्थर व मिट्टी में तेज गति से ड्रिलिंग करके पानी के स्रोत तक पहुंचना।",
        "specsHinglish": "Rotary rig borewell drilling with ISI slotted casing pipe.",
        "deliverables": [
          "सटीक गहराई ड्रिलिंग लॉग",
          "हैवी ड्यूटी केसिंग पाइप्स",
          "बजरी सैंड फिल्टर पैकिंग",
          "वॉटर यील्ड फ्लो टेस्टिंग"
        ]
      },
      {
        "id": "srv-submersible-pump",
        "name": "सबमर्सिबल पंप इंस्टॉलेशन (Submersible Pump)",
        "nameEn": "Submersible Water Pump & Control Panel",
        "nameHi": "सबमर्सिबल वाटर पंप एवं कंट्रोल पैनल",
        "nameHinglish": "Submersible Pump & Auto Panel",
        "unit": "pump setup",
        "avgRate": "₹16,500 - ₹34,000 / complete pump assembly",
        "specs": "किरलोस्कर / क्रॉम्पटन 1HP - 3HP स्टेनलेस स्टील सबमर्सिबल पंप, कॉपर केबल और ऑटो-कट स्टार्टर।",
        "specsEn": "Kirloskar/Crompton 100% copper-wound submersible pump, submersible flat cable, and digital starter panel.",
        "specsHi": "बिजली की बचत करने वाला कॉपर मोटर पंप और टंकी भरने पर अपने आप बंद होने वाला पैनल।",
        "specsHinglish": "Crompton/Kirloskar submersible pump with auto-cut starter.",
        "deliverables": [
          "स्टेनलेस स्टील सबमर्सिबल पंप",
          "वाटरप्रूफ 3-कोर कॉपर केबल",
          "डिजिटल स्टार्टर पैनल",
          "एंटी-ड्राई रन प्रोटेक्शन"
        ]
      },
      {
        "id": "srv-rainwater-harvesting",
        "name": "रेनवाटर हार्वेस्टिंग पिट (Rainwater Recharge Pit)",
        "nameEn": "Rainwater Harvesting & Ground Recharge Pit",
        "nameHi": "रेनवाटर हार्वेस्टिंग (भूजल पुनर्भरण गड्ढा)",
        "nameHinglish": "Rainwater Harvesting Groundwater Recharge",
        "unit": "pit setup",
        "avgRate": "₹28,000 - ₹55,000 / recharge pit",
        "specs": "म्युनिसिपल नॉर्म्स के अनुसार परफोरेटेड कंक्रीट रिंग्स, ग्रेवल, चारकोल और सैंड फिल्टर चैंबर।",
        "specsEn": "Municipal CGWA compliant recharge pit, perforated concrete rings, multi-layer gravel/sand/charcoal filter.",
        "specsHi": "बारिश के पानी को जमीन में रिचार्ज करने का गड्ढा जिससे बोरवेल का पानी कभी नहीं सूखता।",
        "specsHinglish": "Groundwater recharge pit with gravel filter chamber.",
        "deliverables": [
          "परफोरेटेड कंक्रीट रिंग्स",
          "मल्टी-लेयर चारकोल-ग्रेवल फिल्टर",
          "डी-सिल्टिंग चैंबर",
          "म्युनिसिपल अप्रूवल सर्टिफिकेट"
        ]
      },
      {
        "id": "srv-ro-filtration",
        "name": "कमर्शियल आरओ वाटर प्लांट (Commercial RO Plant)",
        "nameEn": "Whole-Home & Commercial RO Filtration",
        "nameHi": "वाटर सॉफ्टनर एवं संपूर्ण घर आरओ प्लांट",
        "nameHinglish": "Water Softener & Whole Home RO Plant",
        "unit": "plant",
        "avgRate": "₹24,000 - ₹65,000 / plant",
        "specs": "250LPH से 1000LPH वाटर सॉफ्टनर (हार्ड वाटर रिमूवर), मल्टी-ग्रेड सैंड फिल्टर और यूवी चैंबर।",
        "specsEn": "Automatic water softener for hard ground water, FRP media vessels, and UV disinfection chamber.",
        "specsHi": "खारे और कड़े पानी को मीठा बनाने वाला वाटर सॉफ्टनर जिससे पाइप व नल कभी चोक नहीं होते।",
        "specsHinglish": "Water softener for hard water and whole-home filtration.",
        "deliverables": [
          "FRP ऑटोमैटिक सॉफ्टनर वेसल",
          "हाई-डेंसिटी रेजिन मीडिया",
          "टीडीएस वॉटर टेस्टिंग रिपोर्ट",
          "1-वर्षीय ऑन-साइट सर्विस"
        ]
      }
    ]
  },
  {
    "id": "cat-vastu-elevation",
    "name": "वास्तु और 3D फ्रंट एलिवेशन डिजाइन (Vastu & 3D Elevation)",
    "nameEn": "Vastu Consultation & 3D Facade Elevation",
    "nameHi": "वास्तु शास्त्र एवं 3D एलिवेशन स्टूडियो",
    "nameHinglish": "Vastu Consultation & 3D Front Elevation",
    "iconName": "Compass",
    "description": "वास्तु शास्त्र प्लॉट ऑडिट, 4K डे-नाइट 3D एलिवेशन, वर्किंग ब्लूप्रिंट्स और म्युनिसिपल पासिंग।",
    "descEn": "Certified Vedic Vastu site energy audit, 4K photorealistic day/night front elevations, and sanction maps.",
    "descHi": "मकान की सुख-समृद्धि के लिए वास्तु अनुसार कमरों का लेआउट और बाहर से आलीशान दिखने वाला 3D लुक।",
    "descHinglish": "Vedic vastu floor plan audit, 4K 3D elevation renders aur municipal approval drawing.",
    "subServicesCount": 4,
    "popularityScore": 97,
    "colorTheme": {
      "bgLight": "bg-amber-50/70",
      "border": "border-amber-200/80",
      "text": "text-amber-950",
      "accent": "text-amber-600",
      "badge": "bg-amber-100 text-amber-800",
      "hoverBorder": "hover:border-amber-400"
    },
    "subServices": [
      {
        "id": "srv-vastu-audit",
        "name": "वैदिक वास्तु ऑडिट (Vastu Energy Audit)",
        "nameEn": "Vedic Vastu Shastra Site Audit",
        "nameHi": "वैदिक वास्तु शास्त्र प्लॉट एवं एनर्जी ऑडिट",
        "nameHinglish": "Vedic Vastu Site & Energy Audit",
        "unit": "visit / plan",
        "avgRate": "₹5,500 - ₹15,000 / property audit",
        "specs": "16-जोन चक्र वास्तु एनालिसिस, मेन गेट दिशा, किचन/मास्टर बेडरूम जोन और बिना तोड़फोड़ वास्तु उपाय।",
        "specsEn": "16-zone directional energy analysis, main door placement, water/fire zone alignment, and non-structural remedies.",
        "specsHi": "ईशान कोण में पूजा रूम, आग्नेय कोण में किचन और नैऋत्य कोण में मास्टर बेडरूम का सटीक वास्तु प्लान।",
        "specsHinglish": "16 zone vastu analysis for kitchen, master bedroom and main entrance.",
        "deliverables": [
          "16-जोन दिशा कंपास चार्ट",
          "वास्तु दोष निवारण रिपोर्ट",
          "कलर व मेटल रेमेडी गाइड",
          "वास्तु कंप्लायंट संशोधित लेआउट"
        ]
      },
      {
        "id": "srv-3d-elevation-render",
        "name": "4K 3D फ्रंट एलिवेशन (4K Day/Night Elevation)",
        "nameEn": "Ultra-HD 4K Day & Night Facade Renders",
        "nameHi": "4K फोटो-रियलिस्टिक 3D फ्रंट एलिवेशन",
        "nameHinglish": "4K Front Elevation (Day & Night View)",
        "unit": "facade view",
        "avgRate": "₹4,500 - ₹9,500 / view (3 Revisions Included)",
        "specs": "3ds Max / Lumion से तैयार 4K डे और नाइट वॉर्म लाइटिंग एलिवेशन रेंडर्स, कलर शेड्स और मटेरियल स्पेसिफिकेशन।",
        "specsEn": "Photorealistic 3ds Max / Lumion exterior renders with day daylight and night warm architectural lighting.",
        "specsHi": "घर बनने से पहले ही स्क्रीन पर हूबहू देखना कि बनने के बाद मकान बाहर से कैसा चमकेगा।",
        "specsHinglish": "Ultra HD 3D front look with day & night warm lighting effect.",
        "deliverables": [
          "4K हाई-रेज़ोल्यूशन रेंडर इमेजेस",
          "डे और नाइट लाइटिंग एंगल्स",
          "मटेरियल पैलेट व कलर कोड्स",
          "3 बार फ्री संशोधन सुविधा"
        ]
      },
      {
        "id": "srv-cad-blueprints",
        "name": "वर्किंग CAD ड्राइंग्स (Complete Working Blueprints)",
        "nameEn": "Full Architectural Working CAD Drawings",
        "nameHi": "कंप्लीट वर्किंग CAD नक्शा एवं ड्राइंग्स",
        "nameHinglish": "Complete Working CAD Blueprints",
        "unit": "sq.ft",
        "avgRate": "₹8 - ₹16 / sq.ft",
        "specs": "मजदूरों और मिस्त्री के लिए साइट पर काम करने वाली हर दीवार, खिड़की और दरवाजे की मिलीमीटर माप वाली ड्राइंग।",
        "specsEn": "Millimeter-accurate detailed CAD drawings for on-site mason execution, wall sections, and door-window schedules.",
        "specsHi": "हर कमरे, सीढ़ी, बालकनी और पिलर की सटीक माप वाली ब्लूप्रिंट फाइल।",
        "specsHinglish": "Full site execution drawings with millimeter precision.",
        "deliverables": [
          "डिटेल्ड फ्लोर डायमेंशन प्लान",
          "वॉल एलिवेशन सेक्शन्स",
          "डोर-विंडो साइज शेड्यूल",
          "सीढ़ी राइजर व ट्रेड डिटेल"
        ]
      },
      {
        "id": "srv-municipal-sanction",
        "name": "म्युनिसिपल नक्शा पासिंग (Municipal Sanction Map)",
        "nameEn": "Municipal Corporation Building Plan Sanction",
        "nameHi": "नगर निगम / विकास प्राधिकरण नक्शा पासिंग",
        "nameHinglish": "Municipal Authority Building Plan Approval",
        "unit": "file / sq.mtr",
        "avgRate": "₹12,000 - ₹35,000 / Authority Approval File",
        "specs": "MCD, BDA, DDA, JDA, HUDA नगर निगम व विकास प्राधिकरण से बिल्डिंग बायलॉज अनुसार नक्शा पासिंग।",
        "specsEn": "Official building plan approval liaisoning under local municipal bylaws (FAR, ground coverage, setbacks).",
        "specsHi": "सरकारी नियमों के अनुसार बिना किसी कानूनी अड़चन के घर बनाने का सरकारी अप्रूवल लेटर।",
        "specsHinglish": "Municipal sanctioned blue print map with authority approval stamp.",
        "deliverables": [
          "बाय-लॉज कंप्लायंट सैंक्शन ड्राइंग",
          "स्ट्रक्चरल स्टेबिलिटी साइन-ऑफ",
          "रेनवाटर हार्वेस्टिंग डिक्लेरेशन",
          "ऑफिशियल ऑथॉरिटी सैंक्शन लेटर"
        ]
      }
    ]
  }
];

export const VENDORS = [
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
    "approved": true,
    "kycVerified": true,
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
    "approved": true,
    "kycVerified": true,
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
    "approved": true,
    "kycVerified": true,
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
    "approved": true,
    "kycVerified": true,
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
    "approved": true,
    "kycVerified": true,
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
    "approved": true,
    "kycVerified": true,
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
    "approved": true,
    "kycVerified": true,
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
    "approved": true,
    "kycVerified": true,
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
    "approved": true,
    "kycVerified": true,
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
    "approved": true,
    "kycVerified": false,
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
];

export const INITIAL_LEADS = [
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
];

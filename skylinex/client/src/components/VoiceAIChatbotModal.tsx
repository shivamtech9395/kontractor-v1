import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Key, 
  Bot, 
  User, 
  RefreshCw, 
  Compass, 
  HardHat, 
  Settings, 
  ExternalLink 
} from 'lucide-react';
import { Language } from '../types';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

interface VoiceAIChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onLanguageChange?: (lang: Language) => void;
}

// Smart Local Construction Knowledge Base
const KNOWLEDGE_BASE: Record<string, { en: string; hi: string; hinglish: string }> = {
  cost: {
    en: "In India (2026), standard turnkey residential construction costs between ₹1,450 to ₹1,850 per sq.ft for standard grade (Fe 550 TMT, OPC cement, Vitrified tiles). Premium luxury construction ranges from ₹2,000 to ₹2,800 per sq.ft including false ceiling and modular fittings.",
    hi: "भारत में 2026 के अनुसार, मानक गुणवत्ता के घर का निर्माण खर्च लगभग ₹1,450 से ₹1,850 प्रति वर्ग फीट (sq.ft) आता है। प्रीमियम व लक्ज़री फिनिशिंग के साथ यह ₹2,000 से ₹2,800 प्रति वर्ग फीट तक हो जाता है।",
    hinglish: "India me 2026 standard turnkey ghar banane ka cost approx ₹1,450 se ₹1,850 per sq.ft aata hai. Luxury aur premium finish ke sath ye ₹2,000 se ₹2,800 per sq.ft tak jata hai."
  },
  waterproofing: {
    en: "For roofs and sunken slabs, we recommend a 2-coat elastomeric polymer coating (like Dr. Fixit Roofseal / Fosroc Brushbond) with fiber-mesh reinforcement. Grout all tile joints with epoxy grout for zero seepage.",
    hi: "छत और बाथरूम के लिए 2-कोट इलास्टोमेरिक पॉलीमर कोटिंग (जैसे डॉ. फिक्सिट रूफसील या फॉसरॉक) फाइबर मेष के साथ सर्वोत्तम है। सभी टाइल जोड़ों को एपॉक्सी ग्राउट से सील करें।",
    hinglish: "Roof aur sunken slabs ke liye 2-coat polymer waterproofing (Dr. Fixit ya Fosroc) fiber mesh ke sath lagwayein. Tile joints me epoxy grout use karein taki seepage bilkul na ho."
  },
  cement: {
    en: "For roof slabs and columns (RCC structural work), use OPC 53 or premium composite cement (Ultratech Super / Ambuja Plus). For brickwork and plastering, PPC (Portland Pozzolana Cement) is best to prevent shrinkage cracks.",
    hi: "छत की ढलाई और कॉलम (RCC कार्य) के लिए OPC 53 या हाई-ग्रेड कम्पोजिट सीमेंट (अल्ट्राटेक सुपर, अंबुजा) श्रेष्ठ है। चिनाई और प्लास्टर के लिए PPC सीमेंट का उपयोग करें ताकि दरारें न आएं।",
    hinglish: "Roof slab aur pillars RCC work ke liye OPC 53 ya Ultratech Super best hai. Masonry aur plaster ke liye PPC cement use karein taki cracks na padein."
  },
  kitchen: {
    en: "Modular kitchen rates typically start from ₹1,200 to ₹1,800 per sq.ft for BWR/HDHMR plywood with acrylic or laminate finish. Hardware from Hettich, Hafele, or Blum ensures 10+ years durability.",
    hi: "मॉड्यूलर किचन की लागत ₹1,200 से ₹1,800 प्रति वर्ग फीट (HDHMR/BWR मरीन प्लाईवुड) से शुरू होती है। हेब्लिच (Hettich) या हेफेले (Hafele) के हाइड्रोलिक सॉफ्ट-क्लोज हार्डवेयर सर्वश्रेष्ठ रहते हैं।",
    hinglish: "Modular kitchen ka rate ₹1,200 se ₹1,800 per sq.ft (HDHMR / BWR ply) start hota hai. Hettich ya Hafele ke soft-close fittings 10+ saal tak bina problem chalte hain."
  },
  vastu: {
    en: "Key Vastu guidelines: Main entrance in North or East; Kitchen in South-East (Agni corner); Master bedroom in South-West (Nairutya); Underground water tank in North-East (Ishanya).",
    hi: "मुख्य वास्तु नियम: मुख्य प्रवेश द्वार उत्तर या पूर्व में होना चाहिए; रसोईघर आग्नेय कोण (दक्षिण-पूर्व); मास्टर बेडरूम नैऋत्य कोण (दक्षिण-पश्चिम); और भूमिगत पानी की टंकी ईशान कोण (उत्तर-पूर्व) में होनी चाहिए।",
    hinglish: "Main Vastu tips: Main gate North ya East me, Kitchen South-East (Aagneya kon) me, Master bedroom South-West me aur Underground water tank North-East (Ishan) me hona chahiye."
  },
  solar: {
    en: "Under PM Surya Ghar scheme, rooftop solar offers up to ₹78,000 government subsidy. A 3kW system produces approx 12-15 units daily and saves ₹30,000-₹40,000 annually on electricity bills.",
    hi: "पीएम सूर्य घर मुफ्त बिजली योजना के तहत 3kW सोलर रूफटॉप पर ₹78,000 तक की सरकारी सब्सिडी मिलती है। 3kW सिस्टम प्रतिदिन 12-15 यूनिट बिजली उत्पन्न करता है।",
    hinglish: "PM Surya Ghar scheme me rooftop solar par ₹78,000 tak subsidy milti hai. 3kW solar system daily 12-15 units generate karta hai aur saal me ₹35,000 tak bijli bill bachata hai."
  }
};

export const VoiceAIChatbotModal: React.FC<VoiceAIChatbotModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: language === 'hi' 
        ? "नमस्ते! मैं कॉन्ट्रैक्टर एआई असिस्टेंट हूँ। घर निर्माण, लागत, मैटेरियल या वेंडर्स के बारे में आप बोलकर या लिखकर कुछ भी पूछ सकते हैं!"
        : language === 'hinglish'
        ? "Namaste! Main Kontractor Voice AI Assistant hoon. Ghar banane ki cost, material ya contractors ke baare me kuch bhi bolkar ya likhkar poochhiye!"
        : "Hello! I am Kontractor AI Assistant. You can speak or type any question regarding house construction, BOQ estimation, materials, or verified contractors!",
      timestamp: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSoundEnabled, setSpeechSoundEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('kontractor_openai_api_key') || '');
  const [tempApiKey, setTempApiKey] = useState('');

  const chatEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = language === 'hi' ? 'hi-IN' : 'en-IN';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
        handleSendQuery(transcript);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [language]);

  // Voice Speaking Output (TTS)
  const speakText = (text: string) => {
    if (!('speechSynthesis' in window) || !speechSoundEnabled) return;

    window.speechSynthesis.cancel();
    // Clean markdown asterisks or special characters for speech
    const cleanSpeech = text.replace(/[*_#`]/g, '').trim();
    const utterance = new SpeechSynthesisUtterance(cleanSpeech);
    utterance.rate = 1.0;
    utterance.pitch = 1.05;

    const voices = window.speechSynthesis.getVoices();
    if (language === 'hi') {
      const hiVoice = voices.find(v => v.lang.includes('hi') || v.name.includes('Hindi'));
      if (hiVoice) utterance.voice = hiVoice;
    } else {
      const inVoice = voices.find(v => v.lang.includes('en-IN') || v.lang.includes('en'));
      if (inVoice) utterance.voice = inVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  // Toggle Mic
  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Voice input is not supported in this browser. Please use Google Chrome or Microsoft Edge.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      try {
        recognitionRef.current.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error("Speech recognition error:", err);
      }
    }
  };

  // Handle Query Submission (Local Knowledge Fallback + ChatGPT API)
  const handleSendQuery = async (queryText?: string) => {
    const query = (queryText || inputText).trim();
    if (!query) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      let replyText = '';

      // If user has set an OpenAI ChatGPT API Key, query OpenAI
      if (apiKey) {
        try {
          const res = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
              model: 'gpt-4o-mini',
              messages: [
                {
                  role: 'system',
                  content: `You are Kontractor AI Assistant, a friendly, professional civil engineering and construction expert for the Indian homebuilding platform Kontractor.in. Answer concisely in ${language === 'hi' ? 'Hindi' : language === 'hinglish' ? 'Hinglish' : 'English'} with practical Indian construction benchmarks (rates in ₹ INR, IS-456 standards, materials, PWD norms). Keep responses friendly, practical, and under 3-4 sentences so it is comfortable to hear over voice audio.`
                },
                {
                  role: 'user',
                  content: query
                }
              ],
              temperature: 0.7,
              max_tokens: 250
            })
          });

          if (res.ok) {
            const data = await res.json();
            replyText = data.choices[0]?.message?.content || '';
          }
        } catch (apiErr) {
          console.warn('ChatGPT API call failed, falling back to built-in knowledge base:', apiErr);
        }
      }

      // If no reply yet, search Built-in Construction Knowledge Base
      if (!replyText) {
        const lower = query.toLowerCase();
        let matchedKey = '';

        if (lower.includes('cost') || lower.includes('खर्च') || lower.includes('budget') || lower.includes('rate') || lower.includes('price') || lower.includes('sq ft')) {
          matchedKey = 'cost';
        } else if (lower.includes('waterproof') || lower.includes('सीपेज') || lower.includes('seepage') || lower.includes('leaking') || lower.includes('सिलन')) {
          matchedKey = 'waterproofing';
        } else if (lower.includes('cement') || lower.includes('सीमेंट') || lower.includes('छत') || lower.includes('slab') || lower.includes('dhalai')) {
          matchedKey = 'cement';
        } else if (lower.includes('kitchen') || lower.includes('किचन') || lower.includes('modular')) {
          matchedKey = 'kitchen';
        } else if (lower.includes('vastu') || lower.includes('वास्तु') || lower.includes('direction') || lower.includes('disha')) {
          matchedKey = 'vastu';
        } else if (lower.includes('solar') || lower.includes('सोलर') || lower.includes('bijli') || lower.includes('subsidy')) {
          matchedKey = 'solar';
        }

        if (matchedKey && KNOWLEDGE_BASE[matchedKey]) {
          replyText = KNOWLEDGE_BASE[matchedKey][language];
        } else {
          // Dynamic friendly fallback
          if (language === 'hi') {
            replyText = `आपके सवाल "${query}" के लिए: Kontractor प्लेटफॉर्म पर सभी ठेकेदार 2-टियर बैकग्राउंड व आधार-पैन द्वारा सत्यापित हैं। हमारी 3D स्टूडियो व AI कॉस्ट कैलकुलेटर टूल से आप सटीक अनुमान निकाल सकते हैं!`;
          } else if (language === 'hinglish') {
            replyText = `Aapke question "${query}" ke liye: Kontractor platform par verified civil, interior aur logistics contractors available hain. Aap AI House Planner se direct cost estimate le sakte hain!`;
          } else {
            replyText = `Regarding "${query}": Kontractor provides verified PWD & IS-456 compliant contractors. You can also use our 3D Studio and AI House Planner to estimate materials and costs accurately!`;
          }
        }
      }

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsLoading(false);
      speakText(replyText);

    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  };

  const handleSaveApiKey = () => {
    localStorage.setItem('kontractor_openai_api_key', tempApiKey.trim());
    setApiKey(tempApiKey.trim());
    setShowSettings(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl h-[88vh] max-h-[720px] bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden">
        
        {/* Header with Talking AI Indicator */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-teal-700 px-5 py-4 text-white flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md p-1.5 flex items-center justify-center border border-white/30">
                <Bot className="w-7 h-7 text-yellow-300" />
              </div>
              {isSpeaking && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm sm:text-base tracking-tight">
                  Kontractor Voice AI Assistant
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 text-[10px] font-bold border border-emerald-300/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Online
                </span>
              </div>
              <p className="text-[11px] text-blue-100">
                {isSpeaking ? '🔊 Speaking answer aloud...' : isListening ? '🎙️ Listening to you...' : 'Real-time Voice & Text Construction Advisor'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Audio Voice Output Toggle */}
            <button
              onClick={() => {
                const next = !speechSoundEnabled;
                setSpeechSoundEnabled(next);
                if (!next && 'speechSynthesis' in window) window.speechSynthesis.cancel();
              }}
              className={`p-2 rounded-xl border transition-colors ${
                speechSoundEnabled 
                  ? 'bg-white/20 border-white/30 text-white' 
                  : 'bg-white/10 border-white/10 text-white/50'
              }`}
              title={speechSoundEnabled ? 'Mute AI Voice' : 'Unmute AI Voice'}
            >
              {speechSoundEnabled ? <Volume2 className="w-4 h-4 text-teal-300" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* API Key Settings Button */}
            <button
              onClick={() => {
                setTempApiKey(apiKey);
                setShowSettings(!showSettings);
              }}
              className="p-2 rounded-xl bg-white/20 border border-white/30 hover:bg-white/30 text-white transition-colors"
              title="ChatGPT API Key Configuration"
            >
              <Key className="w-4 h-4 text-yellow-300" />
            </button>

            {/* Close Button */}
            <button
              onClick={() => {
                if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                if (recognitionRef.current) recognitionRef.current.stop();
                onClose();
              }}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Optional Settings Panel (OpenAI API Key Drawer) */}
        {showSettings && (
          <div className="bg-slate-50 border-b border-slate-200 p-4 space-y-3 animate-fadeIn shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                <Settings className="w-4 h-4 text-blue-600" />
                <span>ChatGPT API Key Integration (Optional)</span>
              </div>
              <button 
                onClick={() => setShowSettings(false)}
                className="text-xs text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>
            <p className="text-[11px] text-slate-500">
              Paste your OpenAI API Key (<code className="text-blue-600 font-bold">sk-...</code>) for unlimited generative responses. If left empty, Kontractor's built-in smart civil engineering engine works offline for free!
            </p>
            <div className="flex gap-2">
              <input
                type="password"
                placeholder="sk-proj-..."
                value={tempApiKey}
                onChange={(e) => setTempApiKey(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono bg-white focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={handleSaveApiKey}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Save Key
              </button>
            </div>
          </div>
        )}

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-blue-50/20 via-white to-slate-50">
          
          {/* Quick Preset Prompt Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-[11px]">
            <span className="font-bold text-slate-400 shrink-0">Try:</span>
            {[
              "1000 sq ft घर निर्माण खर्च?",
              "Waterproofing बेस्ट तरीका?",
              "छत ढलाई (RCC) बेस्ट सीमेंट?",
              "Modular kitchen का रेट?"
            ].map((chip) => (
              <button
                key={chip}
                onClick={() => handleSendQuery(chip)}
                className="px-2.5 py-1 rounded-full bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200/80 shadow-xs whitespace-nowrap shrink-0 transition-colors cursor-pointer"
              >
                {chip}
              </button>
            ))}
          </div>

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[82%] p-3.5 rounded-2xl text-xs leading-relaxed shadow-xs ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-none font-medium'
                }`}
              >
                <div className="whitespace-pre-line">{msg.text}</div>
                <div
                  className={`mt-1.5 text-[10px] flex items-center justify-between ${
                    msg.sender === 'user' ? 'text-blue-200' : 'text-slate-400'
                  }`}
                >
                  <span>{msg.timestamp}</span>
                  {msg.sender === 'ai' && (
                    <button
                      onClick={() => speakText(msg.text)}
                      className="ml-2 hover:text-blue-600 flex items-center gap-1 cursor-pointer"
                      title="Speak again"
                    >
                      <Volume2 className="w-3 h-3" />
                      <span>Listen</span>
                    </button>
                  )}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-2.5 items-center">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 animate-pulse">
                <Bot className="w-4 h-4" />
              </div>
              <div className="px-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-slate-500 text-xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
                <span>Kontractor AI सोच रहा है (Analyzing)...</span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Speaking / Listening Pulse Wave Indicator */}
        {(isSpeaking || isListening) && (
          <div className="px-4 py-1.5 bg-gradient-to-r from-blue-500/10 via-teal-500/10 to-indigo-500/10 border-t border-blue-100 flex items-center justify-center gap-2 text-xs font-bold text-blue-700 animate-pulse shrink-0">
            {isListening ? (
              <>
                <Mic className="w-4 h-4 text-red-500 animate-bounce" />
                <span>Listening... बोलिए, हम सुन रहे हैं...</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-emerald-600 animate-pulse" />
                <span>AI बोल रहा है (Speaking)...</span>
              </>
            )}
          </div>
        )}

        {/* Input Bar: Voice Mic + Text Input + Send */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendQuery();
            }}
            className="flex items-center gap-2"
          >
            {/* Big Voice Mic Button */}
            <button
              type="button"
              onClick={toggleListening}
              className={`p-3 rounded-2xl transition-all cursor-pointer flex items-center justify-center ${
                isListening
                  ? 'bg-red-500 text-white shadow-lg shadow-red-500/30 scale-105 animate-pulse'
                  : 'bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 border border-slate-200'
              }`}
              title={isListening ? 'Stop Listening' : 'Speak your question (माइक पर बोलें)'}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5 text-blue-600" />}
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={isListening ? "Listening... बोलिए..." : "Type or speak question (e.g. 1000 sq ft छत ढलाई खर्च)..."}
              className="flex-1 px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-600 focus:outline-none text-xs text-slate-900 font-medium"
            />

            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-3 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white shadow-md shadow-blue-500/20 transition-all cursor-pointer"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

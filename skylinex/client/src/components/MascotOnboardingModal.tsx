import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, Check, ArrowRight, ShieldCheck, Compass, HardHat } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface MascotOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export const MascotOnboardingModal: React.FC<MascotOnboardingModalProps> = ({
  isOpen,
  onClose,
  language,
  onLanguageChange,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const t = translations[language];

  // Speech Synthesis
  const speakGreeting = (lang: Language) => {
    if (!('speechSynthesis' in window) || !soundEnabled) return;

    window.speechSynthesis.cancel(); // Stop any previous utterance

    const introText = translations[lang].mascotVoiceIntro;
    const utterance = new SpeechSynthesisUtterance(introText);

    // Set voice attributes
    utterance.rate = 1.0;
    utterance.pitch = 1.1; // Friendly and enthusiastic tone

    // Try finding appropriate voice
    const voices = window.speechSynthesis.getVoices();
    if (lang === 'hi') {
      const hiVoice = voices.find(v => v.lang.includes('hi') || v.name.includes('Hindi') || v.name.includes('India'));
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

  useEffect(() => {
    if (isOpen) {
      // Small timeout for browser voice loading
      const timer = setTimeout(() => {
        speakGreeting(language);
      }, 500);
      return () => {
        clearTimeout(timer);
        if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      };
    }
  }, [isOpen]);

  const handleLanguageSelect = (lang: Language) => {
    onLanguageChange(lang);
    speakGreeting(lang);
  };

  const handleFinish = () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    localStorage.setItem('skylinex_onboarding_completed', 'true');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden transform transition-all">
        {/* Decorative Top Banner */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-teal-500 p-6 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl transform translate-x-12 -translate-y-12"></div>
          <div className="relative z-10 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              AI Building Advisor
            </span>
            <button
              onClick={() => {
                const nextState = !soundEnabled;
                setSoundEnabled(nextState);
                if (!nextState && 'speechSynthesis' in window) window.speechSynthesis.cancel();
                else if (nextState) speakGreeting(language);
              }}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors text-white"
              title={soundEnabled ? 'Mute Voice' : 'Enable Voice'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>

          {/* Animated Mascot Presentation */}
          <div className="mt-4 flex flex-col items-center">
            <div className="relative">
              {/* Mascot Avatar Graphic */}
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 p-1 shadow-lg shadow-amber-500/20 transform hover:scale-105 transition-transform flex items-center justify-center">
                <div className="w-full h-full rounded-2xl bg-slate-900 flex flex-col items-center justify-center relative overflow-hidden border-2 border-white/30">
                  {/* Hard Hat */}
                  <div className="absolute top-2 w-14 h-5 bg-amber-400 rounded-t-full shadow-sm flex items-center justify-center">
                    <div className="w-3 h-1 bg-amber-600 rounded"></div>
                  </div>
                  {/* Face */}
                  <div className="mt-4 w-12 h-10 bg-amber-100 rounded-b-xl flex flex-col items-center justify-center relative">
                    <div className="flex gap-2.5 mt-1">
                      <div className="w-1.5 h-2 bg-slate-900 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-2 bg-slate-900 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                    </div>
                    {/* Smiling mouth */}
                    <div className="w-4 h-2 border-b-2 border-slate-900 rounded-full mt-1"></div>
                  </div>
                </div>
              </div>

              {/* Talking Pulse Rings */}
              {isSpeaking && (
                <>
                  <span className="absolute -inset-2 rounded-3xl border-2 border-white/60 animate-ping opacity-50"></span>
                  <span className="absolute -bottom-1 -right-1 px-2 py-0.5 bg-teal-500 text-white text-[10px] font-bold rounded-full shadow">
                    Speaking...
                  </span>
                </>
              )}
            </div>

            <h3 className="mt-3 text-xl font-bold tracking-tight">Chhotu Engineer</h3>
            <p className="text-blue-100 text-xs font-medium">Chief Architectural Companion</p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 space-y-6">
          {/* Mascot Speech Bubble */}
          <div className="relative p-4 rounded-2xl bg-blue-50/70 border border-blue-100 text-slate-700 text-sm leading-relaxed shadow-sm">
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-50/70 border-t border-l border-blue-100 rotate-45"></div>
            <p className="text-center font-medium">
              "{t.mascotGreeting}"
            </p>
          </div>

          {/* Tri-Language Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 text-center">
              Choose Your Preferred Language / भाषा चुनें
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'en' as Language, title: 'English', sub: 'Global Standard' },
                { id: 'hi' as Language, title: 'हिन्दी', sub: 'सरल हिंदी' },
                { id: 'hinglish' as Language, title: 'Hinglish', sub: 'Desi Conversational' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleLanguageSelect(item.id)}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    language === item.id
                      ? 'border-blue-600 bg-blue-50/80 shadow-md ring-2 ring-blue-600/20 text-blue-900 font-semibold'
                      : 'border-slate-200 hover:border-slate-300 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="text-base font-bold">{item.title}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{item.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Highlights of SkylineX */}
          <div className="grid grid-cols-3 gap-2.5 pt-2 text-center">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <ShieldCheck className="w-5 h-5 mx-auto text-blue-600 mb-1" />
              <div className="text-xs font-bold text-slate-800">IS-456 Certified</div>
              <div className="text-[10px] text-slate-500">Verified Pros</div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <Compass className="w-5 h-5 mx-auto text-teal-600 mb-1" />
              <div className="text-xs font-bold text-slate-800">20 Styles 3D</div>
              <div className="text-[10px] text-slate-500">Spatial Studio</div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <HardHat className="w-5 h-5 mx-auto text-amber-500 mb-1" />
              <div className="text-xs font-bold text-slate-800">AI BOQ Est.</div>
              <div className="text-[10px] text-slate-500">Cement & Steel</div>
            </div>
          </div>

          {/* CTA Action */}
          <div className="pt-2">
            <button
              onClick={handleFinish}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-bold text-sm tracking-wide shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 group transition-all hover:scale-[1.01]"
            >
              <span>Start Exploring SkylineX</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { Box, HardHat, ArrowRight, ShieldCheck, Sparkles, Building2 } from 'lucide-react';
import { Language } from '../types';

interface WelcomeSplashScreenProps {
  onEnter: () => void;
  language: Language;
}

export const WelcomeSplashScreen: React.FC<WelcomeSplashScreenProps> = ({
  onEnter,
  language,
}) => {
  const [progress, setProgress] = useState(15);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Progress counter animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 15;
      });
    }, 180);

    // Auto-enter timer after ~2.4 seconds
    const autoEnterTimer = setTimeout(() => {
      handleExit();
    }, 2400);

    // Enter or Space key press to skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
        handleExit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(autoEnterTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleExit = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      onEnter();
    }, 450);
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-[#FAFCFF] via-blue-50/70 to-indigo-50/60 transition-all duration-500 ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Ambient Decorative Blur Spheres */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-400/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-300/15 rounded-full blur-3xl pointer-events-none" />

      {/* Center Welcome Card */}
      <div className="relative max-w-lg w-full mx-4 p-6 sm:p-10 rounded-[32px] bg-white/95 border border-blue-200/80 shadow-2xl backdrop-blur-xl text-center space-y-5">
        
        {/* Official Kontractor Brand Artwork */}
        <div className="relative mx-auto max-w-[280px] flex flex-col items-center justify-center">
          <img
            src="/images/kontractor_logo.jpg"
            alt="Kontractor - घर बनाना है...बन जाएगा"
            className="w-full h-auto object-contain rounded-2xl drop-shadow-sm hover:scale-102 transition-transform"
          />
        </div>

        {/* Written Brand Text */}
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-[11px] font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Official India Marketplace</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            घर बनाना है...बन जाएगा
          </h2>

          <p className="text-xs sm:text-sm font-extrabold text-blue-600">
            "Building Trust, Brick by Brick"
          </p>

          <p className="text-xs text-slate-600 font-medium max-w-sm mx-auto leading-relaxed pt-0.5">
            {language === 'hi'
              ? 'भारत का सबसे भरोसेमंद सिविल, आर्किटेक्चरल एवं कंस्ट्रक्शन मार्केटप्लेस'
              : language === 'hinglish'
              ? 'India Ka Most Trusted Construction & 3D Architectural Platform'
              : "India's Premier Architectural & Turnkey Construction Marketplace"}
          </p>
        </div>

        {/* 3 Key Feature Badges */}
        <div className="grid grid-cols-3 gap-2 pt-2">
          <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
            <ShieldCheck className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
            <div className="text-[10px] font-extrabold text-slate-800">100% IS-456</div>
            <div className="text-[9px] text-slate-500">Verified Pros</div>
          </div>

          <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
            <Building2 className="w-4 h-4 text-blue-600 mx-auto mb-1" />
            <div className="text-[10px] font-extrabold text-slate-800">Real 3D Studio</div>
            <div className="text-[9px] text-slate-500">Interactive Villa</div>
          </div>

          <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
            <Sparkles className="w-4 h-4 text-amber-500 mx-auto mb-1" />
            <div className="text-[10px] font-extrabold text-slate-800">Direct Contact</div>
            <div className="text-[9px] text-slate-500">Zero Middleman</div>
          </div>
        </div>

        {/* Animated Loading Bar */}
        <div className="space-y-1.5 pt-2">
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-600 to-teal-500 h-1.5 rounded-full transition-all duration-200 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[10px] font-semibold text-slate-400">
            <span>Loading Marketplace Experience...</span>
            <span>{progress}%</span>
          </div>
        </div>

        {/* Direct Enter Button */}
        <button
          onClick={handleExit}
          className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-extrabold text-sm shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 group cursor-pointer"
        >
          <span>
            {language === 'hi'
              ? 'वेबसाइट में प्रवेश करें'
              : language === 'hinglish'
              ? 'Website Par Jaayein'
              : 'Enter Marketplace'}
          </span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

      </div>
    </div>
  );
};

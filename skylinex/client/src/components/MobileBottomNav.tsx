import React from 'react';
import { Home, Box, Grid, User, Sparkles } from 'lucide-react';

interface MobileBottomNavProps {
  currentTab: 'home' | '3d-studio' | 'categories' | 'portal';
  onNavigateHome: () => void;
  onOpen3DStudio: () => void;
  onNavigateAllCategories: () => void;
  onOpenVendorPortal: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentTab,
  onNavigateHome,
  onOpen3DStudio,
  onNavigateAllCategories,
  onOpenVendorPortal,
}) => {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 border-t border-slate-200/90 backdrop-blur-lg px-2 py-1 shadow-2xl safe-area-bottom">
      <div className="flex items-center justify-around">
        {/* Tab 1: Home */}
        <button
          onClick={onNavigateHome}
          className={`flex flex-col items-center py-1 px-3 rounded-xl transition-all ${
            currentTab === 'home' ? 'text-blue-600 font-extrabold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Home className={`w-5 h-5 ${currentTab === 'home' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] mt-0.5">Kontractor</span>
          {currentTab === 'home' && <span className="w-1 h-1 rounded-full bg-blue-600 mt-0.5"></span>}
        </button>

        {/* Tab 2: 3D Studio */}
        <button
          onClick={onOpen3DStudio}
          className={`flex flex-col items-center py-1 px-3 rounded-xl transition-all ${
            currentTab === '3d-studio' ? 'text-blue-600 font-extrabold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Box className={`w-5 h-5 ${currentTab === '3d-studio' ? 'stroke-[2.5] text-blue-600' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] mt-0.5">3D Studio</span>
          {currentTab === '3d-studio' && <span className="w-1 h-1 rounded-full bg-blue-600 mt-0.5"></span>}
        </button>

        {/* Tab 3: All Categories */}
        <button
          onClick={onNavigateAllCategories}
          className={`flex flex-col items-center py-1 px-3 rounded-xl transition-all ${
            currentTab === 'categories' ? 'text-blue-600 font-extrabold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Grid className={`w-5 h-5 ${currentTab === 'categories' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] mt-0.5">Services</span>
          {currentTab === 'categories' && <span className="w-1 h-1 rounded-full bg-blue-600 mt-0.5"></span>}
        </button>

        {/* Tab 4: Account / Contractor Portal */}
        <button
          onClick={onOpenVendorPortal}
          className={`flex flex-col items-center py-1 px-3 rounded-xl transition-all ${
            currentTab === 'portal' ? 'text-blue-600 font-extrabold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <User className={`w-5 h-5 ${currentTab === 'portal' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] mt-0.5">Account</span>
          {currentTab === 'portal' && <span className="w-1 h-1 rounded-full bg-blue-600 mt-0.5"></span>}
        </button>
      </div>
    </div>
  );
};

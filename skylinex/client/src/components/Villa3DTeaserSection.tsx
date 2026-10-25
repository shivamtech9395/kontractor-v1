import React, { useState } from 'react';
import { 
  Sparkles, 
  Box, 
  Sun, 
  Moon, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface Villa3DTeaserSectionProps {
  onOpen3DStudio: () => void;
  onOpenAIPlanner: () => void;
}

export const Villa3DTeaserSection: React.FC<Villa3DTeaserSectionProps> = ({
  onOpen3DStudio,
  onOpenAIPlanner,
}) => {
  const [teaserNightMode, setTeaserNightMode] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<string | null>('master');
  const [selectedTeaserLevel, setSelectedTeaserLevel] = useState<'all' | 'level1' | 'level2'>('all');

  const hotspots = [
    {
      id: 'master',
      title: 'Level 2: Master Bedroom Suite',
      pos: 'top-[20%] left-[42%]',
      level: 'level2',
      badge: 'King Suite',
      desc: 'King-size upholstered bed, solid oak flooring, floor-to-ceiling glass sliding doors opening to the deck.',
      rate: '₹3,400 / sq.ft'
    },
    {
      id: 'terrace',
      title: 'Level 2: Open Sun Deck & Solarium',
      pos: 'top-[34%] left-[78%]',
      level: 'level2',
      badge: 'Wooden Patio',
      desc: 'All-weather teakwood deck tiles, outdoor sectional sofa, shade umbrella & biophilic planters.',
      rate: '₹1,200 / sq.ft'
    },
    {
      id: 'living',
      title: 'Level 1: Grand Living Lounge',
      pos: 'top-[64%] left-[22%]',
      level: 'level1',
      badge: 'Foyer & Lounge',
      desc: 'Italian bookmatched marble floor, 6-seater low-profile couch, acoustic wood fluted wall paneling.',
      rate: '₹2,600 / sq.ft'
    },
    {
      id: 'kitchen',
      title: 'Level 1: Gourmet Modular Kitchen',
      pos: 'top-[60%] left-[48%]',
      level: 'level1',
      badge: 'Agni Corner',
      desc: 'Quartz waterfall breakfast counter, Hafele soft-close drawers, chimney & induction hob island.',
      rate: '₹1,850 / sq.ft'
    },
    {
      id: 'bath',
      title: 'Level 1: Designer Powder Room & Spa',
      pos: 'top-[70%] left-[64%]',
      level: 'level1',
      badge: 'Ensuite Bath',
      desc: 'Grohe thermostatic rain shower, wall-hung WC, concealed cistern & backlit LED vanity mirror.',
      rate: '₹2,200 / fixture'
    }
  ];

  return (
    <section className="lg:hidden py-8 px-3.5 bg-gradient-to-b from-blue-50/50 to-white relative">
      <div className="max-w-lg mx-auto">
        <div className="mb-4 text-center space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/70 text-blue-800 text-[10px] font-extrabold uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-blue-600" />
            <span>Interactive 3D Architectural Viewer</span>
          </div>
          <h3 className="text-xl font-extrabold text-slate-900">
            Real 3D Multi-Level Villa Studio
          </h3>
          <p className="text-xs text-slate-500">
            Tap on any hotspot (+) to inspect interior materials and specifications.
          </p>
        </div>

        {/* Main Card (3D Lift / Glassmorphism) */}
        <div className="card-3d-pop bg-white rounded-3xl p-4 sm:p-5 shadow-xl border border-blue-200/80 relative overflow-hidden">
          
          {/* Card Header with Level Selector & Day/Night Toggle */}
          <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200/60">
                Isometric Cutaway Studio
              </span>
              <h3 className="text-sm font-black text-slate-900 mt-1">
                Modern Luxury Villa 3D
              </h3>
            </div>
            
            {/* Day / Night light toggle */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setTeaserNightMode(false)}
                className={`p-1.5 rounded-lg text-xs font-semibold ${
                  !teaserNightMode ? 'bg-white text-amber-500 shadow-sm' : 'text-slate-400'
                }`}
                title="Daylight Architecture"
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setTeaserNightMode(true)}
                className={`p-1.5 rounded-lg text-xs font-semibold ${
                  teaserNightMode ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400'
                }`}
                title="Warm Evening Ambient Lighting"
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Level Filter Switcher */}
          <div className="py-2 flex items-center justify-between gap-1 border-b border-slate-100 text-xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Inspect Level:</span>
            <div className="flex items-center gap-1">
              {[
                { id: 'all', label: 'Full Duplex' },
                { id: 'level2', label: 'L2 Suite' },
                { id: 'level1', label: 'L1 Lounge' },
              ].map((lvl) => (
                <button
                  key={lvl.id}
                  onClick={() => setSelectedTeaserLevel(lvl.id as any)}
                  className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-all ${
                    selectedTeaserLevel === lvl.id
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {lvl.label}
                </button>
              ))}
            </div>
          </div>

          {/* 3D Realistic Villa Visual Container */}
          <div 
            className={`mt-2.5 rounded-2xl relative overflow-hidden transition-all duration-500 bg-slate-950 shadow-inner group/canvas ${
              teaserNightMode ? 'ring-2 ring-indigo-500/40' : 'ring-1 ring-slate-200'
            }`}
          >
            {/* High-Resolution Exploded Villa Image */}
            <div className="relative aspect-[16/11] overflow-hidden">
              <img 
                src="/images/villa_3d_exploded.jpg" 
                alt="Modern Luxury 3D Exploded Villa"
                className={`w-full h-full object-cover transition-all duration-700 ${
                  teaserNightMode 
                    ? 'filter brightness-90 contrast-110 hue-rotate-[195deg]' 
                    : 'filter brightness-100 contrast-105'
                }`}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none"></div>

              {/* Interactive Hotspot Pins */}
              {hotspots.map((hs) => {
                const isActive = activeHotspot === hs.id;
                const isHighlighted = selectedTeaserLevel === 'all' || selectedTeaserLevel === hs.level;

                if (!isHighlighted) return null;

                return (
                  <div
                    key={hs.id}
                    className={`absolute ${hs.pos} -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer transition-transform duration-300 active:scale-125`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveHotspot(isActive ? null : hs.id);
                    }}
                  >
                    <div className="relative flex items-center justify-center">
                      <span className="absolute w-5 h-5 rounded-full bg-blue-500/50 animate-ping"></span>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shadow-lg border-2 border-white text-[9px] font-black ${
                        isActive ? 'bg-amber-400 text-slate-900 scale-110' : 'bg-blue-600 text-white'
                      }`}>
                        +
                      </div>
                      <span className="absolute -bottom-3.5 whitespace-nowrap px-1 py-0.2 rounded bg-blue-900/90 backdrop-blur-md text-white text-[7px] font-bold">
                        {hs.badge}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Floating Hotspot Detail Modal / Popover */}
              {activeHotspot && (
                <div className="absolute bottom-2 inset-x-2 z-30 p-3 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-2xl animate-fadeIn">
                  {(() => {
                    const hs = hotspots.find(h => h.id === activeHotspot);
                    if (!hs) return null;
                    return (
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-black text-slate-900">{hs.title}</span>
                          <span className="px-1.5 py-0.2 rounded-full bg-teal-50 text-teal-800 text-[9px] font-extrabold border border-teal-200">
                            {hs.rate}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-600 leading-relaxed">
                          {hs.desc}
                        </p>
                        <div className="pt-0.5 flex items-center justify-between text-[9px]">
                          <span className="text-blue-600 font-bold">✓ IS 456 Compliant</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveHotspot(null);
                            }}
                            className="text-slate-400 hover:text-slate-700 font-bold"
                          >
                            Close ✕
                          </button>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* Status badge in preview */}
              <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-blue-900/85 backdrop-blur-md text-[9px] font-bold text-white border border-blue-400/30 shadow-md flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span>Exploded Cutaway</span>
              </div>
            </div>
          </div>

          {/* Micro Specs */}
          <div className="mt-2.5 grid grid-cols-3 gap-1.5 text-center text-xs">
            <div className="p-1.5 rounded-xl bg-slate-50 border border-slate-200/70">
              <span className="block text-[9px] text-slate-400 uppercase font-semibold">Structure</span>
              <span className="font-extrabold text-slate-800 text-[10px]">Steel Frame</span>
            </div>
            <div className="p-1.5 rounded-xl bg-slate-50 border border-slate-200/70">
              <span className="block text-[9px] text-slate-400 uppercase font-semibold">Total Area</span>
              <span className="font-extrabold text-blue-600 text-[10px]">1,850 sq.ft</span>
            </div>
            <div className="p-1.5 rounded-xl bg-slate-50 border border-slate-200/70">
              <span className="block text-[9px] text-slate-400 uppercase font-semibold">Turnkey Cost</span>
              <span className="font-extrabold text-teal-700 text-[10px]">₹48L - ₹65L</span>
            </div>
          </div>

          {/* Big CTA */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-1.5">
            <button
              onClick={onOpen3DStudio}
              className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-1.5 active:scale-95 transition-all"
            >
              <Box className="w-4 h-4 text-white" />
              <span>LAUNCH FULL 3D SPATIAL STUDIO</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

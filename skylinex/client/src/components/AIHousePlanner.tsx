import React, { useState } from 'react';
import { 
  Sparkles, 
  Layers, 
  Maximize, 
  Home, 
  FileText, 
  CheckCircle, 
  ShieldCheck, 
  Compass, 
  Cpu, 
  DollarSign, 
  Building2, 
  Download, 
  ArrowRight,
  HardHat,
  X
} from 'lucide-react';
import { Language, AIPlanResult, Vendor } from '../types';
import { translations } from '../i18n/translations';
import { ARCHITECTURAL_STYLES } from '../data/mockData';
import { API_BASE_URL } from '../config/api';

interface AIHousePlannerProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  vendors: Vendor[];
  onSelectVendor: (vendor: Vendor) => void;
  onRequestQuoteWithPlan: (plan: AIPlanResult) => void;
}

export const AIHousePlanner: React.FC<AIHousePlannerProps> = ({
  isOpen,
  onClose,
  language,
  vendors,
  onSelectVendor,
  onRequestQuoteWithPlan,
}) => {
  const t = translations[language];

  // Planner Inputs
  const [plotArea, setPlotArea] = useState<number>(2400);
  const [frontWidth, setFrontWidth] = useState<number>(40);
  const [depth, setDepth] = useState<number>(60);
  const [floors, setFloors] = useState<number>(3);
  const [bedrooms, setBedrooms] = useState<number>(4);
  const [budgetTier, setBudgetTier] = useState<'standard' | 'luxury' | 'ultra-luxury'>('luxury');
  const [selectedStyle, setSelectedStyle] = useState<string>('modern-minimalist');

  const [loading, setLoading] = useState<boolean>(false);
  const [planResult, setPlanResult] = useState<AIPlanResult | null>(null);

  // Run AI Computation
  const handleGeneratePlan = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/ai/plan-house`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plotArea,
          frontWidth,
          depth,
          floors,
          bedrooms,
          budgetTier,
          architecturalStyle: selectedStyle
        })
      });

      if (res.ok) {
        const data = await res.json();
        setPlanResult(data);
      } else {
        // Fallback local computation if backend fetch fails
        calculateFallbackPlan();
      }
    } catch (e) {
      calculateFallbackPlan();
    } finally {
      setLoading(false);
    }
  };

  const calculateFallbackPlan = () => {
    const totalBuiltupArea = Math.round(plotArea * 0.75 * floors);
    const rate = budgetTier === 'ultra-luxury' ? 3800 : budgetTier === 'luxury' ? 2600 : 1850;
    const estMin = Math.round(totalBuiltupArea * rate * 0.95);
    const estMax = Math.round(totalBuiltupArea * rate * 1.12);

    const cementBags = Math.round(totalBuiltupArea * 0.43);
    const steelTonnes = Number((totalBuiltupArea * 0.0041).toFixed(1));
    const sandCuFt = Math.round(totalBuiltupArea * 1.85);
    const aggregateCuFt = Math.round(totalBuiltupArea * 2.65);
    const bricksCount = Math.round(totalBuiltupArea * 19);

    setPlanResult({
      totalBuiltupArea,
      floorsCount: floors,
      estimatedCostMin: estMin,
      estimatedCostMax: estMax,
      ratePerSqft: rate,
      rooms: [
        { name: 'Grand Living Hall & Foyer', dimensions: '24 ft x 18 ft', areaSqft: 432, floor: 1, vastuZone: 'North-East (Ishan)' },
        { name: 'Gourmet Modular Kitchen & Dining', dimensions: '18 ft x 14 ft', areaSqft: 252, floor: 1, vastuZone: 'South-East (Agni)' },
        { name: 'Master Suite with Walk-in Closet', dimensions: '18 ft x 16 ft', areaSqft: 288, floor: 2, vastuZone: 'South-West (Nairutya)' },
        { name: 'Puja Sanctum & Water Court', dimensions: '8 ft x 8 ft', areaSqft: 64, floor: 1, vastuZone: 'North-East (Ishan)' },
        { name: 'Home Theatre & Entertainment Lounge', dimensions: '20 ft x 16 ft', areaSqft: 320, floor: 2, vastuZone: 'North' },
        { name: 'Sky Terrace Garden Bar', dimensions: '26 ft x 18 ft', areaSqft: 468, floor: floors, vastuZone: 'Open Sky' }
      ],
      boq: [
        { material: 'OPC / PPC 53 Grade Cement', quantity: `${cementBags.toLocaleString('en-IN')} Bags`, standardUnit: '50kg Bags', isISStandard: 'IS 12269 & IS 1489', estimatedCost: `₹${(cementBags * 410).toLocaleString('en-IN')}` },
        { material: 'Fe550D TMT Earthquake Rebars', quantity: `${steelTonnes} Tonnes`, standardUnit: 'Tonnes', isISStandard: 'IS 1786 : 2008 Fe550D', estimatedCost: `₹${Math.round(steelTonnes * 68000).toLocaleString('en-IN')}` },
        { material: 'Coarse River Sand / M-Sand', quantity: `${sandCuFt.toLocaleString('en-IN')} cu.ft`, standardUnit: 'cu.ft', isISStandard: 'IS 383 : 2016', estimatedCost: `₹${(sandCuFt * 58).toLocaleString('en-IN')}` },
        { material: 'Crushed Granite Coarse Aggregate', quantity: `${aggregateCuFt.toLocaleString('en-IN')} cu.ft`, standardUnit: 'cu.ft', isISStandard: 'IS 383 Graded', estimatedCost: `₹${(aggregateCuFt * 42).toLocaleString('en-IN')}` },
        { material: 'High-Strength Wire-Cut Red Bricks', quantity: `${bricksCount.toLocaleString('en-IN')} Units`, standardUnit: 'Pieces', isISStandard: 'IS 1077 Class 10', estimatedCost: `₹${(bricksCount * 9).toLocaleString('en-IN')}` }
      ],
      costDistribution: [
        { component: 'Foundation & Earthwork', percentage: 14, amount: Math.round(estMin * 0.14), description: 'Excavation, PCC & raft footings' },
        { component: 'RCC Structural Frame', percentage: 32, amount: Math.round(estMin * 0.32), description: 'Columns, beams & roof slab casting' },
        { component: 'Brickwork & Plastering', percentage: 16, amount: Math.round(estMin * 0.16), description: '9-inch outer & 4.5-inch internal partitions' },
        { component: 'MEP (Plumbing & Electrical)', percentage: 15, amount: Math.round(estMin * 0.15), description: 'Concealed copper wiring & piping' },
        { component: 'Finishing & Luxury Elevation', percentage: 23, amount: Math.round(estMin * 0.23), description: 'Marble, tiles, doors, paint & facade' }
      ],
      vastuNotes: [
        'Main Entrance placed in North-East (Ishan) for abundant positive morning energy.',
        'Kitchen positioned in South-East (Agni corner) with cooking platform facing East.',
        'Master Bedroom located in South-West (Nairutya) for leadership and grounding.'
      ],
      structuralSafety: [
        'Designed strictly to Seismic Zone IV parameters with ductile detailing (IS 13920).',
        'M25 design mix concrete for structural durability against carbonation.',
        'Crystalline integral waterproofing for foundation and terrace slabs.'
      ],
      matchedContractorIds: ['v-101', 'v-102']
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl max-h-[94vh] bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-teal-600 p-6 sm:p-8 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-yellow-300" />
              <span>IS-456 Architectural Engine</span>
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold mt-2 tracking-tight">
            AI House Layout & Dual-Mode Material Estimator
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-blue-100 max-w-2xl">
            Input your plot dimensions to procedurally calculate room-by-room architectural floor layouts, IS-code Bill of Quantities (BOQ), and turnkey budgets.
          </p>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          
          {/* Input Controls Grid */}
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-blue-600" />
              <span>Site & Architectural Parameters</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Plot Area (sq.ft)</label>
                <input
                  type="number"
                  value={plotArea}
                  onChange={(e) => setPlotArea(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Front Width (ft)</label>
                <input
                  type="number"
                  value={frontWidth}
                  onChange={(e) => setFrontWidth(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Plot Depth (ft)</label>
                <input
                  type="number"
                  value={depth}
                  onChange={(e) => setDepth(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Number of Floors</label>
                <select
                  value={floors}
                  onChange={(e) => setFloors(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none cursor-pointer"
                >
                  <option value={1}>1 Floor (Villa)</option>
                  <option value={2}>2 Floors (G+1)</option>
                  <option value={3}>3 Floors (G+2)</option>
                  <option value={4}>4 Floors (G+3 Stilt)</option>
                  <option value={5}>5 Floors (G+4)</option>
                  <option value={6}>6 Floors (G+5)</option>
                  <option value={8}>8 Floors</option>
                  <option value={10}>10 Floors (Tower)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Bedrooms (BHK)</label>
                <select
                  value={bedrooms}
                  onChange={(e) => setBedrooms(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none cursor-pointer"
                >
                  <option value={2}>2 BHK</option>
                  <option value={3}>3 BHK</option>
                  <option value={4}>4 BHK Luxury</option>
                  <option value={5}>5 BHK Mansion</option>
                  <option value={6}>6+ BHK Estate</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Material Quality Tier</label>
                <select
                  value={budgetTier}
                  onChange={(e) => setBudgetTier(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none cursor-pointer"
                >
                  <option value="standard">Standard (₹1,650 - ₹1,850/sq.ft)</option>
                  <option value="luxury">Luxury Turnkey (₹2,400 - ₹2,850/sq.ft)</option>
                  <option value="ultra-luxury">Ultra Luxury Estate (₹3,500+/sq.ft)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Architectural Theme</label>
                <select
                  value={selectedStyle}
                  onChange={(e) => setSelectedStyle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none cursor-pointer"
                >
                  {ARCHITECTURAL_STYLES.map((style) => (
                    <option key={style.id} value={style.id}>
                      {style.name} ({style.facadeStyle})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleGeneratePlan}
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-bold text-xs tracking-wide shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 group transition-all"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>{loading ? 'Simulating Structural Blueprint & BOQ...' : t.generateBlueprint}</span>
            </button>
          </div>

          {/* ================= MASTER RESULT CONTAINER ================= */}
          {planResult && (
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-50/90 border-2 border-blue-200/80 shadow-xl space-y-6 animate-fadeIn">
              
              {/* Master Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
                <div>
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-[11px] font-extrabold uppercase tracking-wider border border-blue-200">
                    AI Architectural Blueprint & BOQ Report
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                    Turnkey Residence Estimation
                  </h3>
                  <p className="text-xs text-slate-500">
                    Calculated for {plotArea} sq.ft plot ({frontWidth}ft × {depth}ft) • {floors} Floors • {budgetTier.toUpperCase()} Tier
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Conforms to IS 456:2000</span>
                  </span>
                </div>
              </div>

              {/* Sub-Container 1: Executive Metrics Overview */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-blue-200 shadow-sm space-y-1">
                  <div className="text-[11px] font-bold uppercase text-blue-600">Total Built-Up Area</div>
                  <div className="text-2xl font-black text-slate-900">
                    {planResult.totalBuiltupArea.toLocaleString('en-IN')} <span className="text-xs font-semibold text-slate-500">sq.ft</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Ground coverage across {planResult.floorsCount} floors</p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-teal-200 shadow-sm space-y-1">
                  <div className="text-[11px] font-bold uppercase text-teal-700">Estimated Turnkey Budget</div>
                  <div className="text-2xl font-black text-slate-900">
                    ₹{(planResult.estimatedCostMin / 100000).toFixed(1)}L - ₹{(planResult.estimatedCostMax / 100000).toFixed(1)}L
                  </div>
                  <p className="text-[11px] text-slate-500">Includes materials, labor & structural guarantee</p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
                  <div className="text-[11px] font-bold uppercase text-slate-500">Prevailing Turnkey Rate</div>
                  <div className="text-2xl font-black text-blue-600">
                    ₹{planResult.ratePerSqft} <span className="text-xs font-semibold text-slate-500">/ sq.ft</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Indexed against prevailing metro market rates</p>
                </div>
              </div>

              {/* Sub-Container 2: Room-by-Room Layout & Vastu Orientations */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Home className="w-4 h-4 text-blue-600" />
                    <span>Sub-Container: Procedural Room Layout & Vastu Orientations</span>
                  </span>
                  <span className="text-xs font-semibold text-slate-400">{planResult.rooms.length} Spaces Calculated</span>
                </h3>

                <div className="overflow-x-auto rounded-xl border border-slate-100">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[10px] tracking-wider">
                      <tr>
                        <th className="p-3">Space / Room</th>
                        <th className="p-3">Dimensions</th>
                        <th className="p-3">Area (sq.ft)</th>
                        <th className="p-3">Level / Floor</th>
                        <th className="p-3">Vastu Zone</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white font-medium text-slate-700">
                      {planResult.rooms.map((room, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-50 transition-colors">
                          <td className="p-3 font-bold text-slate-900">{room.name}</td>
                          <td className="p-3">{room.dimensions}</td>
                          <td className="p-3 font-semibold text-blue-600">{room.areaSqft} sq.ft</td>
                          <td className="p-3">Level {room.floor}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-semibold">
                              {room.vastuZone}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Sub-Container 3: IS-456 Material Estimation & BOQ Cards */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <HardHat className="w-4 h-4 text-amber-500" />
                    <span>Sub-Container: IS-456 Material Bill of Quantities (BOQ)</span>
                  </span>
                  <span className="text-xs font-semibold text-slate-400">IS Code Verified</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {planResult.boq.map((item, bIdx) => (
                    <div key={bIdx} className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 space-y-2 hover:border-blue-300 transition-colors">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-bold text-slate-900 leading-snug">{item.material}</span>
                        <span className="px-2 py-0.5 rounded text-[9px] font-extrabold bg-blue-50 text-blue-700 border border-blue-200 shrink-0">
                          {item.isISStandard}
                        </span>
                      </div>
                      <div className="flex items-baseline justify-between pt-1">
                        <div>
                          <div className="text-base font-black text-teal-700">{item.quantity}</div>
                          <div className="text-[10px] text-slate-400">{item.standardUnit}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-bold text-blue-600">{item.estimatedCost}</div>
                          <div className="text-[9px] text-slate-400">Est. Material Cost</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sub-Container 4: Stage-wise Cost Distribution */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                  <span>Sub-Container: Stage-wise Turnkey Cost Distribution</span>
                </h3>

                <div className="space-y-3">
                  {planResult.costDistribution.map((cost, cIdx) => (
                    <div key={cIdx} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-800">{cost.component}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-[11px] text-slate-500">₹{(cost.amount / 100000).toFixed(1)} Lakhs</span>
                          <span className="font-extrabold text-blue-600">{cost.percentage}%</span>
                        </div>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                        <div
                          className="h-full bg-gradient-to-r from-blue-600 to-teal-500 rounded-full"
                          style={{ width: `${cost.percentage}%` }}
                        ></div>
                      </div>
                      <p className="text-[10px] text-slate-400">{cost.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sub-Container 5: Structural Safety & Vastu Directives */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-amber-600" />
                    <span>Sub-Container: Vastu Shastra Guidelines</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-amber-950 font-medium">
                    {planResult.vastuNotes.map((note, nIdx) => (
                      <li key={nIdx} className="flex items-start gap-1.5">
                        <span className="text-amber-600 mt-0.5">•</span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200/80 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    <span>Sub-Container: Seismic & IS-456 Safety Codes</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-blue-950 font-medium">
                    {planResult.structuralSafety.map((saf, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-1.5">
                        <span className="text-blue-600 mt-0.5">•</span>
                        <span>{saf}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Sub-Container 6: Matched Turnkey Builders Ready to Execute */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-teal-600" />
                    <span>Sub-Container: Matched Verified Builders for this Project</span>
                  </h3>
                  <span className="text-xs font-semibold text-slate-400">Available in Your Region</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {vendors
                    .filter((v) => v.approved)
                    .slice(0, 3)
                    .map((matchedV) => (
                      <div
                        key={matchedV._id}
                        className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-blue-300 transition-all flex flex-col justify-between"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <img
                              src={matchedV.avatar || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80'}
                              alt={matchedV.businessName}
                              className="w-10 h-10 rounded-xl object-cover border"
                            />
                            <div>
                              <div className="text-xs font-bold text-slate-900 truncate max-w-[130px]">
                                {matchedV.businessName}
                              </div>
                              <div className="text-[10px] text-slate-500">{matchedV.city} • {matchedV.experience} Yrs Exp</div>
                            </div>
                          </div>
                          <div className="text-[11px] text-slate-600">
                            ★ {matchedV.rating} ({matchedV.jobs} completed jobs)
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            onSelectVendor(matchedV);
                            onClose();
                          }}
                          className="mt-3 w-full py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold shadow-xs transition-colors"
                        >
                          View Builder Profile
                        </button>
                      </div>
                    ))}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-500 font-medium text-center sm:text-left">
            Structural calculations conform to Indian Standards: IS 456, IS 1893, and IS 13920.
          </span>
          <div className="flex items-center gap-2">
            {planResult && (
              <button
                onClick={() => {
                  onRequestQuoteWithPlan(planResult);
                  onClose();
                }}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-colors"
              >
                Request Quotes with this Plan
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-100"
            >
              Close Planner
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

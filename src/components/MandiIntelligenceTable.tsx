import React, { useState } from 'react';
import { DHARWAD_CROPS, CropData } from '../data/dharwadData';
import { 
  TrendingUp, 
  TrendingDown, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Search, 
  Filter, 
  Info,
  Calendar,
  ExternalLink,
  IndianRupee,
  Layers,
  ArrowUpDown
} from 'lucide-react';

interface Props {
  isKannada: boolean;
  onSelectCropFor3D?: (cropId: string) => void;
}

export const MandiIntelligenceTable: React.FC<Props> = ({ isKannada, onSelectCropFor3D }) => {
  const [farmType, setFarmType] = useState<'rainfed' | 'irrigated'>('rainfed');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCropModal, setSelectedCropModal] = useState<CropData | null>(null);
  const [sortBy, setSortBy] = useState<'netProfit' | 'grossIncome' | 'yield' | 'price'>('netProfit');

  const filteredCrops = DHARWAD_CROPS.filter((c) => {
    const matchesCategory = categoryFilter === 'all' || c.category === categoryFilter;
    const matchesSearch = 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.kannadaName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.uasdVarieties.some(v => v.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    const metricsA = farmType === 'rainfed' ? a.rainfed : a.irrigated;
    const metricsB = farmType === 'rainfed' ? b.rainfed : b.irrigated;
    if (sortBy === 'netProfit') return metricsB.netProfitInr - metricsA.netProfitInr;
    if (sortBy === 'grossIncome') return metricsB.grossIncomeInr - metricsA.grossIncomeInr;
    if (sortBy === 'yield') return metricsB.averageYieldQtl - metricsA.averageYieldQtl;
    if (sortBy === 'price') return b.mandiModalPriceInrPerQtl - a.mandiModalPriceInrPerQtl;
    return 0;
  });

  return (
    <div className="space-y-6">
      {/* Header & Disclaimers Banner */}
      <div className="bg-gradient-to-r from-emerald-950/70 via-stone-900 to-amber-950/50 border border-emerald-800/40 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-[11px] font-bold bg-emerald-500/20 text-emerald-400 rounded-full border border-emerald-500/30">
                {isKannada ? 'ದೃಢೀಕೃತ ಎಪಿಎಂಸಿ ದರಗಳು' : 'VERIFIED APMC MANDI INTELLIGENCE'}
              </span>
              <span className="text-xs text-stone-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {isKannada ? 'ದಿನಾಂಕ: ಅಕ್ಟೋಬರ್ 2024 ಮಾರುಕಟ್ಟೆ ವರದಿ' : 'Report Date: October 2024 Market Session'}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-stone-100 mt-1">
              {isKannada 
                ? 'ಧಾರವಾಡ ಜಿಲ್ಲಾ ಕೃಷಿ ಬೆಳೆಗಳ ಮಾರುಕಟ್ಟೆ ದರ ಮತ್ತು ಆದಾಯ ಹೋಲಿಕೆ' 
                : 'Dharwad District Crop Economics & APMC Mandi Analysis'}
            </h2>
            <p className="text-xs text-stone-300 mt-1 max-w-3xl leading-relaxed">
              {isKannada
                ? 'ಅಧಿಕೃತ ಮೂಲಗಳು: AGMARKNET, e-NAM ಹುಬ್ಬಳ್ಳಿ ಮತ್ತು ಧಾರವಾಡ ಎಪಿಎಂಸಿ, ಕೆಎಸ್‌ಎಎಂಬಿ ಮತ್ತು ಕೃಷಿ ವಿಶ್ವವಿದ್ಯಾಲಯ ಧಾರವಾಡ (UASD) ಕೃಷಿ ಕೈಪಿಡಿ. ಮಾರುಕಟ್ಟೆ ದರಗಳು ದೈನಂದಿನ ಆವಕ ಮತ್ತು ತೇವಾಂಶದ ಮೇಲೆ ಬದಲಾಗುತ್ತವೆ; ಲಾಭದ ಖಾತರಿ ಇರುವುದಿಲ್ಲ.'
                : 'Official sources: AGMARKNET, e-NAM Hubballi & Dharwad APMCs, Karnataka State Agricultural Marketing Board (KSAMB), and UAS Dharwad Package of Practices. Prices fluctuate daily based on moisture and arrivals; profits are estimated benchmarks and never guaranteed.'}
            </p>
          </div>

          {/* Farm Type Selector */}
          <div className="flex items-center bg-stone-950 p-1.5 rounded-xl border border-stone-800 shadow-inner">
            <button
              onClick={() => setFarmType('rainfed')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition ${
                farmType === 'rainfed'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              {isKannada ? '🌧️ ಖುಷ್ಕಿ ಜಮೀನು (ಮಳೆ ಆಧಾರಿತ)' : '🌧️ Rain-fed (Khushki)'}
            </button>
            <button
              onClick={() => setFarmType('irrigated')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition ${
                farmType === 'irrigated'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              {isKannada ? '💧 ನೀರಾವರಿ ಜಮೀನು (ಹನಿ/ಕಾಲುವೆ)' : '💧 Irrigated (Neeravari)'}
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-4 border-t border-stone-800">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-stone-400 font-semibold">{isKannada ? 'ವರ್ಗ:' : 'Category:'}</span>
            {['all', 'Cash Crop', 'Pulse', 'Oilseed', 'Cereal', 'Vegetable', 'Horticulture'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-2.5 py-1 text-xs rounded-lg transition ${
                  categoryFilter === cat
                    ? 'bg-emerald-600 text-white font-semibold'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                }`}
              >
                {cat === 'all' ? (isKannada ? 'ಎಲ್ಲಾ ಬೆಳೆಗಳು' : 'All Crops') : cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={isKannada ? 'ಬೆಳೆ ಅಥವಾ ತಳಿ ಹುಡುಕಿ...' : 'Search crop or variety...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-stone-900 border border-stone-700 text-xs text-stone-200 pl-8 pr-3 py-1.5 rounded-xl focus:border-emerald-500 outline-none w-48 md:w-60"
              />
            </div>

            <div className="flex items-center gap-1.5 text-xs text-stone-400">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-stone-900 border border-stone-700 text-stone-200 rounded-lg px-2 py-1 text-xs outline-none"
              >
                <option value="netProfit">{isKannada ? 'ಹೆಚ್ಚಿನ ನಿವ್ವಳ ಲಾಭ' : 'Highest Net Profit'}</option>
                <option value="grossIncome">{isKannada ? 'ಹೆಚ್ಚಿನ ಒಟ್ಟು ಆದಾಯ' : 'Highest Gross Income'}</option>
                <option value="yield">{isKannada ? 'ಹೆಚ್ಚಿನ ಇಳುವರಿ' : 'Highest Yield'}</option>
                <option value="price">{isKannada ? 'ಹೆಚ್ಚಿನ ಮಾರುಕಟ್ಟೆ ಬೆಲೆ' : 'Highest Mandi Price'}</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Comparison Table */}
      <div className="overflow-x-auto rounded-2xl border border-stone-800 bg-stone-900/60 shadow-xl">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-stone-900 border-b border-stone-800 text-stone-400 font-bold uppercase tracking-wider">
              <th className="py-3 px-4">{isKannada ? 'ಬೆಳೆ ಮತ್ತು ತಳಿಗಳು' : 'Crop & UASD Varieties'}</th>
              <th className="py-3 px-3">{isKannada ? 'ಅಧಿಕೃತ ಮಂಡಿ ದರ (₹/ಕ್ವಿಂ)' : 'Mandi Price (₹/q)'}</th>
              <th className="py-3 px-3">{isKannada ? 'ಕೇಂದ್ರ ಬೆಂಬಲ ಬೆಲೆ (MSP)' : 'Govt MSP (₹/q)'}</th>
              <th className="py-3 px-3">{isKannada ? 'ಅಂದಾಜು ಇಳುವರಿ (ಎಕರೆಗೆ)' : 'Est. Yield / Acre'}</th>
              <th className="py-3 px-3">{isKannada ? 'ಕೃಷಿ ವೆಚ್ಚ (₹/ಎಕರೆ)' : 'Cost / Acre (₹)'}</th>
              <th className="py-3 px-3">{isKannada ? 'ಒಟ್ಟು ವರಮಾನ (₹)' : 'Gross Income (₹)'}</th>
              <th className="py-3 px-3 text-emerald-400 font-extrabold">{isKannada ? 'ನಿವ್ವಳ ಲಾಭ (₹)' : 'Net Profit (₹)'}</th>
              <th className="py-3 px-3">{isKannada ? 'ಬ್ರೇಕ್-ಈವನ್ ದರ' : 'Break-Even (₹/q)'}</th>
              <th className="py-3 px-3">{isKannada ? 'ಅಪಾಯ ಸೂಚ್ಯಂಕ' : 'Risk & Moisture'}</th>
              <th className="py-3 px-3 text-center">{isKannada ? 'ವಿವರಗಳು' : 'Actions'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-800">
            {filteredCrops.map((crop) => {
              const metrics = farmType === 'rainfed' ? crop.rainfed : crop.irrigated;
              return (
                <tr key={crop.id} className="hover:bg-stone-800/50 transition">
                  {/* Crop Name */}
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-stone-100 text-sm">
                      {isKannada ? crop.kannadaName : crop.name}
                    </div>
                    <div className="text-[11px] text-stone-400 font-medium">
                      {isKannada ? crop.name : crop.kannadaName}
                    </div>
                    <div className="text-[10px] text-emerald-400 mt-0.5 truncate max-w-[200px]" title={crop.uasdVarieties.join(', ')}>
                      UASD: {crop.uasdVarieties.slice(0, 2).join(', ')}
                    </div>
                  </td>

                  {/* Mandi Price */}
                  <td className="py-3.5 px-3">
                    <div className="font-extrabold text-stone-100 text-sm">
                      ₹{crop.mandiModalPriceInrPerQtl.toLocaleString('en-IN')}
                    </div>
                    <div className="text-[10px] text-stone-400">
                      ₹{crop.mandiMinPriceInrPerQtl} - ₹{crop.mandiMaxPriceInrPerQtl}
                    </div>
                    <span className="inline-flex items-center gap-1 text-[9px] px-1.5 py-0.2 bg-emerald-950/80 text-emerald-400 rounded border border-emerald-800/50 mt-0.5">
                      <ShieldCheck className="w-2.5 h-2.5" />
                      {crop.mandiLocation.split('/')[0]}
                    </span>
                  </td>

                  {/* Govt MSP */}
                  <td className="py-3.5 px-3">
                    {crop.mspPriceInrPerQtl ? (
                      <div>
                        <div className="font-bold text-stone-200">
                          ₹{crop.mspPriceInrPerQtl.toLocaleString('en-IN')}
                        </div>
                        <span className="text-[10px] text-stone-400">2024-25 CACP</span>
                      </div>
                    ) : (
                      <span className="text-[11px] text-stone-500 italic">
                        {isKannada ? 'ಖಾಸಗಿ ಮಾರುಕಟ್ಟೆ' : 'Open Market'}
                      </span>
                    )}
                  </td>

                  {/* Yield */}
                  <td className="py-3.5 px-3">
                    <div className="font-bold text-stone-100">
                      {metrics.averageYieldQtl} qtl
                    </div>
                    <div className="text-[10px] text-stone-400">
                      ({metrics.yieldRange[0]} - {metrics.yieldRange[1]} qtl)
                    </div>
                  </td>

                  {/* Cost */}
                  <td className="py-3.5 px-3">
                    <div className="font-bold text-stone-300">
                      ₹{metrics.cultivationCostInr.toLocaleString('en-IN')}
                    </div>
                    <div className="text-[10px] text-stone-500">
                      B:C {metrics.costBenefitRatio.toFixed(2)}
                    </div>
                  </td>

                  {/* Gross Income */}
                  <td className="py-3.5 px-3">
                    <div className="font-bold text-blue-400">
                      ₹{metrics.grossIncomeInr.toLocaleString('en-IN')}
                    </div>
                  </td>

                  {/* Net Profit */}
                  <td className="py-3.5 px-3">
                    <div className="font-extrabold text-emerald-400 text-sm">
                      ₹{metrics.netProfitInr.toLocaleString('en-IN')}
                    </div>
                    <div className="text-[10px] text-emerald-500/80">
                      {isKannada ? 'ನಿವ್ವಳ ಉಳಿತಾಯ' : 'Net Margin'}
                    </div>
                  </td>

                  {/* Break Even Price */}
                  <td className="py-3.5 px-3">
                    <div className="font-semibold text-amber-300">
                      ₹{metrics.breakEvenPriceInrPerQtl.toLocaleString('en-IN')}
                    </div>
                    <div className="text-[10px] text-stone-400">
                      {crop.mandiModalPriceInrPerQtl > metrics.breakEvenPriceInrPerQtl ? (
                        <span className="text-emerald-400 font-medium">
                          +{Math.round(((crop.mandiModalPriceInrPerQtl - metrics.breakEvenPriceInrPerQtl) / metrics.breakEvenPriceInrPerQtl) * 100)}% buffer
                        </span>
                      ) : (
                        <span className="text-red-400 font-medium">Critical</span>
                      )}
                    </div>
                  </td>

                  {/* Risk & Moisture */}
                  <td className="py-3.5 px-3">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                      crop.riskRating === 'Low' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                      crop.riskRating === 'Medium' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                      'bg-red-950 text-red-300 border border-red-800'
                    }`}>
                      {crop.riskRating} Risk
                    </span>
                    <div className="text-[10px] text-stone-400 mt-1">
                      {crop.waterRequirementMm}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-3 text-center">
                    <button
                      onClick={() => setSelectedCropModal(crop)}
                      className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs rounded-lg font-medium transition"
                    >
                      {isKannada ? 'ವಿವರ' : 'Details'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Detailed Agronomic Modal when "Details" is clicked */}
      {selectedCropModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <div className="bg-stone-900 border border-stone-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-5">
            <div className="flex items-start justify-between border-b border-stone-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 text-xs font-bold bg-emerald-500/20 text-emerald-400 rounded-full">
                    {selectedCropModal.category}
                  </span>
                  <span className="text-xs text-stone-400">
                    {selectedCropModal.durationDays}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-stone-100 mt-1">
                  {isKannada ? selectedCropModal.kannadaName : selectedCropModal.name}
                </h3>
                <p className="text-xs text-stone-400 italic">
                  {selectedCropModal.botanicalName} • UASD Guidance
                </p>
              </div>
              <button
                onClick={() => setSelectedCropModal(null)}
                className="text-stone-400 hover:text-white p-1 rounded-lg text-lg"
              >
                ✕
              </button>
            </div>

            {/* Per-Acre Budget Breakdown */}
            <div>
              <h4 className="text-sm font-bold text-stone-200 mb-2">
                {isKannada ? 'ಎಕರೆವಾರು ಕೃಷಿ ವೆಚ್ಚದ ವಿವರ (UASD ಪ್ಯಾಕೇಜ್):' : 'Itemized Per-Acre Cultivation Budget (UASD Package):'}
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                {Object.entries((farmType === 'rainfed' ? selectedCropModal.rainfed : selectedCropModal.irrigated).costBreakdown).map(([k, v]) => (
                  <div key={k} className="bg-stone-950 p-2.5 rounded-xl border border-stone-800">
                    <span className="text-stone-400 capitalize block text-[11px]">
                      {k.replace(/([A-Z])/g, ' $1')}
                    </span>
                    <span className="text-stone-100 font-bold text-sm">
                      ₹{v.toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* UAS Dharwad Recommended Varieties */}
            <div className="bg-stone-950/80 p-3.5 rounded-xl border border-stone-800">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wide">
                {isKannada ? 'ಕೃಷಿ ವಿವಿ ಧಾರವಾಡ ಶಿಫಾರಸು ಮಾಡಿದ ತಳಿಗಳು:' : 'UAS Dharwad Recommended Varieties:'}
              </h4>
              <p className="text-xs text-stone-200 mt-1">
                {selectedCropModal.uasdVarieties.join(' • ')}
              </p>
            </div>

            {/* Agronomic Calendar & Sowing Window */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-stone-950 p-3 rounded-xl border border-stone-800">
                <span className="text-stone-400 block font-semibold">{isKannada ? 'ಬಿತ್ತನೆ ಕಾಲ:' : 'Sowing Window:'}</span>
                <span className="text-stone-100 font-bold">{selectedCropModal.agronomy.sowingWindow}</span>
              </div>
              <div className="bg-stone-950 p-3 rounded-xl border border-stone-800">
                <span className="text-stone-400 block font-semibold">{isKannada ? 'ಬೀಜದ ಪ್ರಮಾಣ & ಸಾಲು ಸಾಲು ಅಂತರ:' : 'Seed Rate & Spacing:'}</span>
                <span className="text-stone-100 font-bold">{selectedCropModal.agronomy.seedRatePerAcre} | {selectedCropModal.agronomy.spacing}</span>
              </div>
              <div className="bg-stone-950 p-3 rounded-xl border border-stone-800 sm:col-span-2">
                <span className="text-stone-400 block font-semibold">{isKannada ? 'ಗೊಬ್ಬರದ ಶಿಫಾರಸು (N:P:K:S):' : 'Fertilizer Recommendation:'}</span>
                <span className="text-stone-100 font-bold">{selectedCropModal.agronomy.npkSRecommendationKgPerAcre}</span>
              </div>
            </div>

            {/* Key Pests & IPM */}
            <div>
              <h4 className="text-xs font-bold text-red-400 uppercase tracking-wide mb-2">
                {isKannada ? 'ಪ್ರಮುಖ ಕೀಟ ಮತ್ತು ರೋಗ ನಿರ್ವಹಣೆ (IPM):' : 'Key Pests & Integrated Pest Management (IPM):'}
              </h4>
              <div className="space-y-2">
                {selectedCropModal.agronomy.majorPestsAndDiseases.map((p, idx) => (
                  <div key={idx} className="bg-stone-950 p-3 rounded-xl border border-stone-800 text-xs">
                    <span className="font-bold text-stone-100 block">{p.name}</span>
                    <span className="text-stone-300 block text-[11px] mt-0.5"><strong className="text-amber-400">Symptoms:</strong> {p.symptoms}</span>
                    <span className="text-stone-300 block text-[11px] mt-0.5"><strong className="text-emerald-400">Control:</strong> {p.ipmControl}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedCropModal(null)}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg transition"
              >
                {isKannada ? 'ಮುಚ್ಚಿ' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

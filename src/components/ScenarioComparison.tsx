import React, { useState } from 'react';
import { DHARWAD_SCENARIOS, ScenarioModel } from '../data/dharwadData';
import { 
  BarChart, 
  TrendingDown, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';

interface Props {
  isKannada: boolean;
}

export const ScenarioComparison: React.FC<Props> = ({ isKannada }) => {
  const [selectedScenario, setSelectedScenario] = useState<'conservative' | 'normal' | 'favorable'>('normal');

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-400" />
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                {isKannada ? 'ಮೂರು ಆರ್ಥಿಕ ಸನ್ನಿವೇಶಗಳ ವಿಶ್ಲೇಷಣೆ' : 'Three-Scenario Sensitivity Analysis'}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-stone-100 mt-1">
              {isKannada 
                ? 'ಧಾರವಾಡದ ಪ್ರಮುಖ 5 ಬೆಳೆಗಳ ಸನ್ನಿವೇಶಾಧಾರಿತ ಲಾಭ ಹೋಲಿಕೆ' 
                : 'Top 5 Dharwad Crops Under Conservative, Normal & Favorable Scenarios'}
            </h2>
            <p className="text-xs text-stone-300 mt-1 max-w-2xl">
              {isKannada
                ? 'ಪ್ರತಿಕೂಲ ಹವಾಮಾನ/ಬೆಲೆ ಕುಸಿತ (ಕನ್ಸರ್ವೇಟಿವ್), ಸರಾಸರಿ ಇಳುವರಿ (ಸಾಮಾನ್ಯ) ಮತ್ತು ಬಂಪರ್ ಫಸಲು (ಅತ್ಯುತ್ತಮ) ಸನ್ನಿವೇಶಗಳಲ್ಲಿ ಎಕರೆವಾರು ನಿವ್ವಳ ಲಾಭವನ್ನು ಪರೀಕ್ಷಿಸಿ.'
                : 'Stress-test risk exposure across adverse weather/price troughs (Conservative), average UASD benchmarks (Normal), and bumper harvest with peak market realization (Favorable).'}
            </p>
          </div>

          {/* Scenario Selector Pills */}
          <div className="flex items-center bg-stone-950 p-1.5 rounded-xl border border-stone-800">
            <button
              onClick={() => setSelectedScenario('conservative')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                selectedScenario === 'conservative'
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <TrendingDown className="w-3.5 h-3.5" />
              <span>{isKannada ? 'ಪ್ರತಿಕೂಲ (Conservative)' : 'Conservative'}</span>
            </button>
            <button
              onClick={() => setSelectedScenario('normal')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                selectedScenario === 'normal'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isKannada ? 'ಸಾಮಾನ್ಯ (Normal)' : 'Normal'}</span>
            </button>
            <button
              onClick={() => setSelectedScenario('favorable')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                selectedScenario === 'favorable'
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isKannada ? 'ಅತ್ಯುತ್ತಮ (Favorable)' : 'Favorable'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid of 5 Crops with Visual Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {DHARWAD_SCENARIOS.map((item) => {
          const current = item[selectedScenario];
          const maxProfitBenchmark = 290000;
          const barWidthPercent = Math.min(100, Math.max(8, (current.netProfit / maxProfitBenchmark) * 100));

          return (
            <div
              key={item.cropId}
              className="bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between hover:border-emerald-500/60 transition duration-300"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-base font-bold text-stone-100">
                      {isKannada ? item.kannadaName : item.cropName}
                    </h3>
                    <span className="text-[11px] text-stone-400">
                      {isKannada ? item.cropName : item.kannadaName}
                    </span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    selectedScenario === 'conservative' ? 'bg-red-950 text-red-300 border border-red-800' :
                    selectedScenario === 'normal' ? 'bg-blue-950 text-blue-300 border border-blue-800' :
                    'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  }`}>
                    {selectedScenario}
                  </span>
                </div>

                {/* Scenario Description */}
                <p className="text-xs text-stone-300 mt-2.5 bg-stone-950 p-2.5 rounded-xl border border-stone-800 italic">
                  "{current.description}"
                </p>

                {/* Financial Triad */}
                <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                  <div className="bg-stone-950 p-2.5 rounded-xl border border-stone-800">
                    <span className="text-stone-400 text-[10px] block">{isKannada ? 'ಇಳುವರಿ / ಎಕರೆ:' : 'Yield / Acre:'}</span>
                    <span className="font-bold text-stone-200">{current.yieldQtl} qtl</span>
                  </div>
                  <div className="bg-stone-950 p-2.5 rounded-xl border border-stone-800">
                    <span className="text-stone-400 text-[10px] block">{isKannada ? 'ದರ (₹/ಕ್ವಿಂ):' : 'Price / Qtl:'}</span>
                    <span className="font-bold text-stone-200">₹{current.priceInr.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="bg-stone-950 p-3 rounded-xl border border-stone-800 mt-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-stone-400">{isKannada ? 'ಒಟ್ಟು ವರಮಾನ (Gross):' : 'Gross Income:'}</span>
                    <span className="font-bold text-blue-400">₹{current.grossIncome.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center mt-1 pt-1 border-t border-stone-800/80">
                    <span className="text-stone-300 font-semibold">{isKannada ? 'ನಿವ್ವಳ ಲಾಭ (Net Profit):' : 'Net Margin:'}</span>
                    <span className="font-black text-emerald-400 text-sm">₹{current.netProfit.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Relative Profit Meter */}
                <div className="mt-3">
                  <div className="flex justify-between text-[10px] text-stone-400 mb-1">
                    <span>{isKannada ? 'ಸಾಫಲ್ಯ ಮಟ್ಟ' : 'Relative Profit Scale'}</span>
                    <span className="text-emerald-400 font-bold">₹{current.netProfit.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="w-full bg-stone-950 rounded-full h-2 overflow-hidden border border-stone-800">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        selectedScenario === 'conservative' ? 'bg-red-500' :
                        selectedScenario === 'normal' ? 'bg-blue-500' :
                        'bg-emerald-500'
                      }`}
                      style={{ width: `${barWidthPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Multi-scenario Comparison Preview */}
              <div className="mt-4 pt-3 border-t border-stone-800 text-[10px] text-stone-400 flex justify-between">
                <span>Cons: <strong className="text-red-400">₹{item.conservative.netProfit.toLocaleString('en-IN')}</strong></span>
                <span>Norm: <strong className="text-blue-400">₹{item.normal.netProfit.toLocaleString('en-IN')}</strong></span>
                <span>Fav: <strong className="text-emerald-400">₹{item.favorable.netProfit.toLocaleString('en-IN')}</strong></span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

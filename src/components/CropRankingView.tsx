import React, { useState } from 'react';
import { 
  Trophy, 
  Award, 
  Medal, 
  Droplet, 
  CloudRain, 
  CheckCircle, 
  TrendingUp, 
  DollarSign, 
  ShieldAlert,
  ArrowRight,
  Sparkles,
  Zap
} from 'lucide-react';
import { DHARWAD_CROPS } from '../data/dharwadData';

interface Props {
  isKannada: boolean;
  onExplore3D?: (cropId: string) => void;
}

export const CropRankingView: React.FC<Props> = ({ isKannada, onExplore3D }) => {
  const [activeTab, setActiveTab] = useState<'rainfed' | 'irrigated'>('rainfed');

  const rainfedRankings = [
    {
      rank: 1,
      cropId: 'bengal_gram',
      name: 'Bengal Gram (Chickpea / Chana)',
      kannadaName: 'ಕಡಲೆ (ಚಣಂಗಿ)',
      variety: 'Annigeri-1 (A-1) & JG-11',
      score: 96,
      netReturnAcre: '₹29,800',
      bcRatio: '2.96',
      yieldAcre: '7.2 qtl',
      rationaleEn: 'Undisputed champion of Dharwad Vertisols. Thrives on post-monsoon subsoil residual moisture with zero supplementary irrigation. Fixes 35-50 kg atmospheric nitrogen/ha, boosting succeeding Kharif soil fertility. Consistently commands high Mandi premium (₹6,250/q vs ₹5,440 MSP).',
      rationaleKn: 'ಧಾರವಾಡದ ಎರೆಭೂಮಿಯ ಸಾರ್ವಭೌಮ ಬೆಳೆ. ಹಿಂಗಾರು ತೇವಾಂಶದಲ್ಲಿ ನೀರಿಲ್ಲದೆ ಬೆಳೆಯುತ್ತದೆ. ಭೂಮಿಗೆ ಸಾರಜನಕ ಸ್ಥಿರೀಕರಿಸಿ ಫಲವತ್ತತೆ ಹೆಚ್ಚಿಸುತ್ತದೆ. ಬೆಂಬಲ ಬೆಲೆಗಿಂತ ಹೆಚ್ಚಿನ ಮಾರುಕಟ್ಟೆ ದರ (ಕ್ವಿಂಟಾಲ್‌ಗೆ ₹6,250) ಸಿಗುತ್ತದೆ.',
      pros: [
        'Exceptional taproot residual moisture utilization',
        'Minimal input cost (₹15,200/acre)',
        'Local hub Annigeri APMC ensures instant liquidity',
        'High grain protein + crop residue fodder'
      ],
      caution: 'Ensure seed treatment with Trichoderma to avoid Fusarium wilt; timely sowing before Oct 31.'
    },
    {
      rank: 2,
      cropId: 'soybean',
      name: 'Soybean (Kharif Oilseed)',
      kannadaName: 'ಸೋಯಾಬಿನ್',
      variety: 'DSb-21 (Pratiksha) & DSb-23 (UASD)',
      score: 91,
      netReturnAcre: '₹21,280',
      bcRatio: '2.27',
      yieldAcre: '8.5 qtl',
      rationaleEn: 'Short duration (90-95 days) minimizes drought exposure in Zone 8. Harvests early in September-October, perfectly facilitating a lucrative double cropping sequence with Rabi Bengal Gram or Rabi Jowar.',
      rationaleKn: 'ಕಡಿಮೆ ಅವಧಿಯ (90-95 ದಿನ) ಬೆಳೆ. ಸೆಪ್ಟೆಂಬರ್‌ನಲ್ಲಿ ಬೇಗ ಕಟಾವು ಮುಗಿಯುವುದರಿಂದ ಹಿಂಗಾರಿನಲ್ಲಿ ಕಡಲೆ ಅಥವಾ ಜೋಳ ಬಿತ್ತನೆ ಮಾಡಲು ಅನುಕೂಲವಾಗುತ್ತದೆ (ದ್ವಿ-ಬೆಳೆ ಪದ್ಧತಿ).',
      pros: [
        'Short 90-day cycle enables double cropping',
        'UASD bred DSb-21 gives rust resistance',
        'Strong oil processing mill procurement demand',
        'Low pesticide dependency compared to cotton'
      ],
      caution: 'Watch out for pod shattering if harvest delayed; sell through e-NAM to escape trader cartelization.'
    },
    {
      rank: 3,
      cropId: 'jowar',
      name: 'Rabi Jowar (Maldandi / Bili Jola)',
      kannadaName: 'ಹಿಂಗಾರು ಬಿಳಿಜೋಳ (ಮಾಲ್ದಂಡಿ)',
      variety: 'M-35-1 & CSV-29R',
      score: 88,
      netReturnAcre: '₹31,100 (Grain + Stover)',
      bcRatio: '3.14',
      yieldAcre: '9.0 qtl + 2.5t fodder',
      rationaleEn: 'Superlative drought tolerance with C4 photosynthetic efficiency. In North Karnataka, Maldandi white jowar grain commands premium culinary demand (₹4,400/q) for traditional Jowar Roti, and dry stover provides essential animal feed valued at ₹6,000/acre.',
      rationaleKn: 'ಬರ ನಿರೋಧಕ C4 ಬೆಳೆ. ಉತ್ತರ ಕರ್ನಾಟಕದಲ್ಲಿ ಜೋಳದ ರೊಟ್ಟಿಗೆ ಮಾಲ್ದಂಡಿ ತಳಿಗೆ ಭಾರಿ ಬೇಡಿಕೆ. ಧಾನ್ಯದ ಜೊತೆಗೆ ₹6,000 ಮೌಲ್ಯದ ಪೌಷ್ಟಿಕ ಮೇವು (ಕಡ್ಡಿ) ಸಿಗುತ್ತದೆ.',
      pros: [
        'Unmatched survival in deep Vertisols under dry conditions',
        'Highest B:C ratio (3.14) due to low cost of cultivation',
        'Dual income: premium grain + livestock dry fodder',
        'Zero chemical fertilizer dependence after basal dose'
      ],
      caution: 'Strictly sow between Sept 15 – Oct 10 to escape catastrophic Shoot Fly attacks.'
    }
  ];

  const irrigatedRankings = [
    {
      rank: 1,
      cropId: 'cotton',
      name: 'Bt Cotton (with Precision Drip)',
      kannadaName: 'ಬಿಟಿ ಹತ್ತಿ (ಹನಿ ನೀರಾವರಿ ಸಹಿತ)',
      variety: 'DHH-11, MRC-7351 BG-II, RCH-659',
      score: 95,
      netReturnAcre: '₹68,525',
      bcRatio: '2.73',
      yieldAcre: '14.5 qtl',
      rationaleEn: 'Under micro-drip fertigation, cotton doubles its fruiting period and yields up to 15-17 quintals/acre. At current Hubballi APMC prices of ₹7,450/q, it yields supreme absolute cash return per acre in Dharwad deep black soils.',
      rationaleKn: 'ಹನಿ ನೀರಾವರಿ ಪದ್ಧತಿಯಲ್ಲಿ ಹತ್ತಿ ಬೆಳೆಗೆ ರಸಗೊಬ್ಬರ ನೀಡಿದಾಗ ಇಳುವರಿ ದುಪ್ಪಟ್ಟಾಗಿ 14-17 ಕ್ವಿಂಟಾಲ್ ತಲುಪುತ್ತದೆ. ಹುಬ್ಬಳ್ಳಿ ಎಪಿಎಂಸಿ ದರದಲ್ಲಿ ಅತ್ಯಧಿಕ ನಗದು ಆದಾಯ ತಂದುಕೊಡುತ್ತದೆ.',
      pros: [
        'Highest net absolute income among annual field crops',
        'Cotton Corporation of India (CCI) procurement at MSP ₹7,521/q',
        'Hubballi APMC is one of Asia’s prime cotton trading hubs',
        'Drip fertigation saves 40% water and 25% fertilizer'
      ],
      caution: 'Mandatory installation of 5 Pheromone traps/acre to scout Pink Bollworm; timely picking to avoid fiber staining.'
    },
    {
      rank: 2,
      cropId: 'guava_horticulture',
      name: 'High-Density Guava / Byadgi Chilli',
      kannadaName: 'ತೈವಾನ್ ಪಿಂಕ್ ಸೀಬೆ / ಬ್ಯಾಡಗಿ ಮೆಣಸಿನಕಾಯಿ',
      variety: 'Taiwan Pink / Lucknow-49 / Byadgi Dabbi',
      score: 92,
      netReturnAcre: '₹2,37,250 – ₹2,56,000',
      bcRatio: '4.83 – 6.33',
      yieldAcre: '9.5 qtl (Chilli) / 95 qtl (Guava)',
      rationaleEn: 'Horticulture & commercial condiments represent the future of high-value agriculture in Dharwad-Hubballi corridor. High-density guava (meadow orchard) generates recurring revenue year-after-year with minimal irrigation.',
      rationaleKn: 'ಧಾರವಾಡ ಮತ್ತು ಹುಬ್ಬಳ್ಳಿ ಕಾರಿಡಾರ್‌ನಲ್ಲಿ ಅತ್ಯಧಿಕ ಆದಾಯ ನೀಡುವ ವಾಣಿಜ್ಯ ತೋಟಗಾರಿಕೆ ಬೆಳೆ. ತೈವಾನ್ ಪಿಂಕ್ ಸೀಬೆ ಕಡಿಮೆ ನೀರಿನಲ್ಲಿ ವರ್ಷವಿಡೀ ಸ್ಥಿರ ಆದಾಯ ನೀಡುತ್ತದೆ.',
      pros: [
        'Massive income density per acre (Net > ₹2,00,000)',
        'Perennial guava provides decade-long cash flow',
        'Byadgi dry chilli has world-class export oleoresin demand',
        'Eligible for 50-70% Karnataka NHM micro-irrigation subsidies'
      ],
      caution: 'Requires intensive pruning, bagging against fruit fly, and high harvesting labor availability.'
    },
    {
      rank: 3,
      cropId: 'maize',
      name: 'High-Yield Hybrid Maize / Irrigated Groundnut',
      kannadaName: 'ಹೈಬ್ರಿಡ್ ಮೆಕ್ಕೆಜೋಳ / ನೀರಾವರಿ ಶೇಂಗಾ',
      variety: 'UASD Hema, CP-818, GPBD-4',
      score: 89,
      netReturnAcre: '₹31,720 (Maize) – ₹66,400 (Groundnut)',
      bcRatio: '2.02 – 3.25',
      yieldAcre: '28.0 qtl (Maize) / 14.0 qtl (Groundnut)',
      rationaleEn: 'Assured, short-turnaround commercial crops. Irrigated groundnut (GPBD-4) under sprinkler or drip delivers bumper 14-16 qtl yields with guaranteed oil miller demand. Maize delivers huge tonnage (28 qtl) with mechanized harvesting.',
      rationaleKn: 'ಕಡಿಮೆ ಸಮಯದಲ್ಲಿ ನಿಶ್ಚಿತ ಮಾರುಕಟ್ಟೆ ಒದಗಿಸುವ ಬೆಳೆಗಳು. ಬೇಸಿಗೆ ನೀರಾವರಿ ಶೇಂಗಾ (GPBD-4) ಅಧಿಕ ಇಳುವರಿ ನೀಡುತ್ತದೆ. ಮೆಕ್ಕೆಜೋಳ ಸುಲಭ ಕಟಾವು ಮತ್ತು ಕೋಳಿ ಸಾಕಣೆ ಉದ್ಯಮದ ನಿರಂತರ ಬೇಡಿಕೆ ಹೊಂದಿದೆ.',
      pros: [
        'Rapid 105-115 day harvest cycle',
        'Complete mechanization possible from sowing to threshing',
        'Assured local poultry and starch factory procurement',
        'Stover/fodder provides livestock sustenance'
      ],
      caution: 'Rigorous scouting for Fall Armyworm in maize; protect groundnut pods from wild boar.'
    }
  ];

  const currentList = activeTab === 'rainfed' ? rainfedRankings : irrigatedRankings;

  return (
    <div className="space-y-6">
      {/* Top Banner & Selector */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                {isKannada ? 'ವಿಜ್ಞಾನ ಆಧಾರಿತ ಬೆಳೆ ಶ್ರೇಯಾಂಕ' : 'Agronomically Validated Rankings'}
              </span>
            </div>
            <h2 className="text-2xl font-black text-stone-100 mt-1">
              {isKannada 
                ? 'ಧಾರವಾಡ ಜಿಲ್ಲೆಗೆ ಅಗ್ರ 3 ಬೆಳೆಗಳ ಶಿಫಾರಸು (ಖುಷ್ಕಿ vs ನೀರಾವರಿ)' 
                : 'Top 3 Crop Recommendations: Rainfed vs Irrigated Farms'}
            </h2>
            <p className="text-xs text-stone-300 mt-1 max-w-2xl">
              {isKannada
                ? 'ಕೃಷಿ ವಿವಿ ಧಾರವಾಡ (UASD) ಪ್ಯಾಕೇಜ್, ಮಣ್ಣಿನ ತೇವಾಂಶ ಧಾರಣಾ ಸಾಮರ್ಥ್ಯ, ಮಾರುಕಟ್ಟೆ ದರ ಸ್ಥಿರತೆ ಮತ್ತು ಬಂಡವಾಳ ಹೂಡಿಕೆಯ ಪ್ರತಿಫಲವನ್ನು ಆಧರಿಸಿ ರೂಪಿಸಲಾದ ನಿಖರ ಶ್ರೇಯಾಂಕ.'
                : 'Ranked using a multi-criteria agronomic model evaluating moisture efficiency, input cost-to-benefit ratio, Mandi liquidity, and UAS Dharwad varietal adaptation.'}
            </p>
          </div>

          {/* Toggle Button */}
          <div className="flex items-center bg-stone-950 p-1.5 rounded-xl border border-stone-800">
            <button
              onClick={() => setActiveTab('rainfed')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition ${
                activeTab === 'rainfed'
                  ? 'bg-amber-600 text-white shadow-lg'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <CloudRain className="w-4 h-4" />
              <span>{isKannada ? 'ಖುಷ್ಕಿ ಜಮೀನು (ಮಳೆ ಆಧಾರಿತ)' : 'Rainfed Holdings'}</span>
            </button>
            <button
              onClick={() => setActiveTab('irrigated')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition ${
                activeTab === 'irrigated'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Droplet className="w-4 h-4 text-cyan-400" />
              <span>{isKannada ? 'ನೀರಾವರಿ ಜಮೀನು (ಹನಿ/ಕಾಲುವೆ)' : 'Irrigated Holdings'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3 Ranked Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {currentList.map((item, idx) => (
          <div
            key={item.cropId}
            className={`relative rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 hover:border-emerald-500/80 hover:shadow-2xl ${
              item.rank === 1
                ? 'bg-gradient-to-b from-amber-950/40 via-stone-900 to-stone-900 border-amber-500/50 shadow-amber-950/30 shadow-xl'
                : item.rank === 2
                ? 'bg-gradient-to-b from-stone-800/40 via-stone-900 to-stone-900 border-stone-600/60 shadow-xl'
                : 'bg-gradient-to-b from-orange-950/30 via-stone-900 to-stone-900 border-orange-700/40 shadow-xl'
            }`}
          >
            {/* Rank Badge */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-lg shadow-lg ${
                    item.rank === 1
                      ? 'bg-amber-500 text-stone-950'
                      : item.rank === 2
                      ? 'bg-stone-300 text-stone-950'
                      : 'bg-orange-600 text-stone-100'
                  }`}
                >
                  #{item.rank}
                </div>
                <div>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                    Score: {item.score}/100
                  </span>
                  <h3 className="text-lg font-black text-stone-100 leading-snug">
                    {isKannada ? item.kannadaName : item.name}
                  </h3>
                </div>
              </div>

              {item.rank === 1 && (
                <span className="px-2.5 py-1 text-[10px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  {isKannada ? 'ಪ್ರಥಮ ಆಯ್ಕೆ' : 'Top Pick'}
                </span>
              )}
            </div>

            {/* Variety & Key Stats */}
            <div className="mt-4 pt-3 border-t border-stone-800">
              <div className="text-xs text-stone-400">
                <strong className="text-stone-300">{isKannada ? 'ಶಿಫಾರಸು ತಳಿ:' : 'Recommended:'}</strong> {item.variety}
              </div>

              <div className="grid grid-cols-3 gap-2 mt-3 text-center">
                <div className="bg-stone-950 p-2.5 rounded-xl border border-stone-800">
                  <span className="text-[10px] text-stone-400 block">{isKannada ? 'ನಿವ್ವಳ ಲಾಭ' : 'Net Return'}</span>
                  <span className="text-xs font-black text-emerald-400">{item.netReturnAcre}</span>
                </div>
                <div className="bg-stone-950 p-2.5 rounded-xl border border-stone-800">
                  <span className="text-[10px] text-stone-400 block">{isKannada ? 'ಇಳುವರಿ/ಎಕರೆ' : 'Avg Yield'}</span>
                  <span className="text-xs font-black text-blue-400">{item.yieldAcre}</span>
                </div>
                <div className="bg-stone-950 p-2.5 rounded-xl border border-stone-800">
                  <span className="text-[10px] text-stone-400 block">{isKannada ? 'ವೆಚ್ಚ-ಲಾಭ ಅನುಪಾತ' : 'B:C Ratio'}</span>
                  <span className="text-xs font-black text-amber-400">{item.bcRatio}</span>
                </div>
              </div>
            </div>

            {/* Agronomic Rationale */}
            <div className="mt-4 text-xs text-stone-300 leading-relaxed bg-stone-950/60 p-3.5 rounded-xl border border-stone-800">
              <p>{isKannada ? item.rationaleKn : item.rationaleEn}</p>
            </div>

            {/* Key Advantages */}
            <div className="mt-4 space-y-1.5">
              <span className="text-[11px] font-bold text-stone-400 block">
                {isKannada ? 'ಪ್ರಮುಖ ಅನುಕೂಲಗಳು:' : 'Key Agronomic Advantages:'}
              </span>
              {item.pros.map((pro, pIdx) => (
                <div key={pIdx} className="flex items-start gap-1.5 text-xs text-stone-300">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{pro}</span>
                </div>
              ))}
            </div>

            {/* Risk / Agronomic Caution */}
            <div className="mt-4 p-2.5 rounded-xl bg-red-950/30 border border-red-900/40 text-[11px] text-red-300 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{item.caution}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

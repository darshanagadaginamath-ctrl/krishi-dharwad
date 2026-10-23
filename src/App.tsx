import React, { useState } from 'react';
import { 
  Sprout, 
  Table, 
  Trophy, 
  Calculator, 
  Layers, 
  BookOpen, 
  Calendar, 
  MapPin, 
  Languages, 
  Printer, 
  Download, 
  ShieldCheck, 
  Sun, 
  Droplets, 
  CloudRain,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Info
} from 'lucide-react';
import { ThreeFarmlandViewer, VisualMode } from './components/ThreeFarmlandViewer';
import { MandiIntelligenceTable } from './components/MandiIntelligenceTable';
import { CropRankingView } from './components/CropRankingView';
import { BudgetCalculator } from './components/BudgetCalculator';
import { ScenarioComparison } from './components/ScenarioComparison';
import { AgronomyGuide } from './components/AgronomyGuide';
import { CropCalendarView } from './components/CropCalendarView';
import { DHARWAD_AGRO_MET_PROFILE, DHARWAD_CROPS } from './data/dharwadData';

export type ActiveTab = 
  | '3d_studio' 
  | 'mandi_table' 
  | 'rankings' 
  | 'budget_sim' 
  | 'scenarios' 
  | 'agronomy_pop' 
  | 'calendar' 
  | 'dharwad_profile';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('3d_studio');
  const [isKannada, setIsKannada] = useState<boolean>(false);
  const [initial3DMode, setInitial3DMode] = useState<VisualMode>('farmland');

  const handleOpen3DMode = (mode: VisualMode) => {
    setInitial3DMode(mode);
    setActiveTab('3d_studio');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Global Header Bar */}
      <header className="sticky top-0 z-40 bg-stone-950/90 border-b border-stone-800/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center text-white shadow-lg shadow-emerald-950/50">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black tracking-tight text-stone-100">
                  {isKannada ? 'ಧಾರವಾಡ ಕೃಷಿ ಯೋಜನೆ' : 'Dharwad Krishi Plan'}
                </h1>
                <span className="hidden sm:inline-flex px-2 py-0.5 text-[10px] font-extrabold bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
                  UASD & APMC Verified
                </span>
              </div>
              <p className="text-[11px] text-stone-400 flex items-center gap-1 font-medium">
                <MapPin className="w-3 h-3 text-red-400" />
                <span>Dharwad District, Karnataka • Zones 8 & 3</span>
              </p>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2.5">
            {/* Language Toggle (English / Kannada) */}
            <button
              onClick={() => setIsKannada(!isKannada)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 text-xs font-bold border border-stone-700/80 shadow transition"
              title="Toggle English / ಕನ್ನಡ"
            >
              <Languages className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isKannada ? 'English' : 'ಕನ್ನಡ'}</span>
            </button>

            {/* Print Dossier */}
            <button
              onClick={handlePrint}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white text-xs font-semibold border border-stone-800 transition"
              title="Print Complete Agronomic Report"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{isKannada ? 'ವರದಿ ಮುದ್ರಿಸಿ' : 'Print Dossier'}</span>
            </button>
          </div>
        </div>

        {/* Global Navigation Tabs Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto scrollbar-none border-t border-stone-900">
          <nav className="flex space-x-1 py-1.5 text-xs font-bold">
            <button
              onClick={() => setActiveTab('3d_studio')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl whitespace-nowrap transition ${
                activeTab === '3d_studio'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isKannada ? '3D ಕೃಷಿ ಸ್ಟುಡಿಯೋ' : '3D Farmland Studio'}</span>
            </button>

            <button
              onClick={() => setActiveTab('mandi_table')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl whitespace-nowrap transition ${
                activeTab === 'mandi_table'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>{isKannada ? 'ಮಂಡಿ ದರ & ಬೆಳೆ ಹೋಲಿಕೆ' : 'Mandi & Crop Economics'}</span>
            </button>

            <button
              onClick={() => setActiveTab('rankings')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl whitespace-nowrap transition ${
                activeTab === 'rankings'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
              }`}
            >
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>{isKannada ? 'ಅಗ್ರ 3 ಬೆಳೆ ಶ್ರೇಯಾಂಕ' : 'Top 3 Crop Rankings'}</span>
            </button>

            <button
              onClick={() => setActiveTab('budget_sim')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl whitespace-nowrap transition ${
                activeTab === 'budget_sim'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
              }`}
            >
              <Calculator className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isKannada ? 'ಬಜೆಟ್ & ಬ್ರೇಕ್-ಈವನ್' : 'Budget & Break-Even'}</span>
            </button>

            <button
              onClick={() => setActiveTab('scenarios')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl whitespace-nowrap transition ${
                activeTab === 'scenarios'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{isKannada ? '3 ಸನ್ನಿವೇಶಗಳ ಹೋಲಿಕೆ' : '3-Scenario Stress Test'}</span>
            </button>

            <button
              onClick={() => setActiveTab('agronomy_pop')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl whitespace-nowrap transition ${
                activeTab === 'agronomy_pop'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{isKannada ? 'UASD ಕೃಷಿ ಕೈಪಿಡಿ' : 'UASD Cultivation POP'}</span>
            </button>

            <button
              onClick={() => setActiveTab('calendar')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl whitespace-nowrap transition ${
                activeTab === 'calendar'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>{isKannada ? 'ಬಿತ್ತನೆ & ಕಟಾವು ಕ್ಯಾಲೆಂಡರ್' : 'Sowing & Harvest Schedule'}</span>
            </button>

            <button
              onClick={() => setActiveTab('dharwad_profile')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl whitespace-nowrap transition ${
                activeTab === 'dharwad_profile'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-red-400" />
              <span>{isKannada ? 'ಧಾರವಾಡ ಹವಾಮಾನ & ಮಣ್ಣು' : 'Agro-Climate Profile'}</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* TAB 1: 3D Farmland Studio */}
        {activeTab === '3d_studio' && (
          <div className="space-y-4">
            <ThreeFarmlandViewer initialMode={initial3DMode} isKannada={isKannada} />

            {/* Quick 3D Explanatory Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div 
                onClick={() => setInitial3DMode('soil_profile')}
                className="bg-stone-900/80 hover:bg-stone-800 p-3 rounded-xl border border-stone-800 cursor-pointer transition flex items-center justify-between"
              >
                <div>
                  <span className="text-stone-400 block text-[10px]">{isKannada ? 'ಮಣ್ಣಿನ ಸ್ತರಗಳು' : 'Soil Horizon'}</span>
                  <span className="font-bold text-stone-200">{isKannada ? 'ಎರೆಭೂಮಿ vs ಕೆಂಪು ಮಣ್ಣು' : 'Vertisol vs Alfisol'}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-500" />
              </div>

              <div 
                onClick={() => setInitial3DMode('crop_growth')}
                className="bg-stone-900/80 hover:bg-stone-800 p-3 rounded-xl border border-stone-800 cursor-pointer transition flex items-center justify-between"
              >
                <div>
                  <span className="text-stone-400 block text-[10px]">{isKannada ? 'ಬೆಳೆ ರಚನೆ' : 'Morphology'}</span>
                  <span className="font-bold text-stone-200">{isKannada ? 'ಹತ್ತಿ/ಕಡಲೆ 5 ಹಂತಗಳು' : '5 Growth Stages'}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-500" />
              </div>

              <div 
                onClick={() => setInitial3DMode('irrigation')}
                className="bg-stone-900/80 hover:bg-stone-800 p-3 rounded-xl border border-stone-800 cursor-pointer transition flex items-center justify-between"
              >
                <div>
                  <span className="text-stone-400 block text-[10px]">{isKannada ? 'ಸೂಕ್ಷ್ಮ ನೀರಾವರಿ' : 'Drip Emitters'}</span>
                  <span className="font-bold text-stone-200">{isKannada ? 'ಹನಿ ನೀರಿನ ಸಿಮ್ಯುಲೇಶನ್' : 'Moisture Bulb Sim'}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-500" />
              </div>

              <div 
                onClick={() => setInitial3DMode('financial_chart')}
                className="bg-stone-900/80 hover:bg-stone-800 p-3 rounded-xl border border-stone-800 cursor-pointer transition flex items-center justify-between"
              >
                <div>
                  <span className="text-stone-400 block text-[10px]">{isKannada ? '3D ಆರ್ಥಿಕತೆ' : '3D Pillars'}</span>
                  <span className="font-bold text-emerald-400">{isKannada ? 'ವೆಚ್ಚ vs ನಿವ್ವಳ ಲಾಭ' : 'Cost vs Net Return'}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-500" />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Mandi Intelligence & Comparison Table */}
        {activeTab === 'mandi_table' && (
          <MandiIntelligenceTable isKannada={isKannada} onSelectCropFor3D={() => setActiveTab('3d_studio')} />
        )}

        {/* TAB 3: Top 3 Crop Rankings */}
        {activeTab === 'rankings' && (
          <CropRankingView isKannada={isKannada} onExplore3D={() => setActiveTab('3d_studio')} />
        )}

        {/* TAB 4: Per-Acre Budget Calculator */}
        {activeTab === 'budget_sim' && (
          <BudgetCalculator isKannada={isKannada} />
        )}

        {/* TAB 5: Three-Scenario Stress Test */}
        {activeTab === 'scenarios' && (
          <ScenarioComparison isKannada={isKannada} />
        )}

        {/* TAB 6: UAS Dharwad Agronomy Guide */}
        {activeTab === 'agronomy_pop' && (
          <AgronomyGuide isKannada={isKannada} />
        )}

        {/* TAB 7: Annual Crop Calendar */}
        {activeTab === 'calendar' && (
          <CropCalendarView isKannada={isKannada} />
        )}

        {/* TAB 8: Dharwad District Agro-Climate Profile */}
        {activeTab === 'dharwad_profile' && (
          <div className="space-y-6">
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-red-400" />
                <span className="text-xs font-bold text-red-400 uppercase tracking-wider">
                  {isKannada ? 'ಧಾರವಾಡ ಕೃಷಿ ಹವಾಮಾನ ವಿವರಣೆ' : 'Agro-Ecological & Soil Profile'}
                </span>
              </div>
              <h2 className="text-2xl font-black text-stone-100 mt-1">
                {isKannada 
                  ? 'ಧಾರವಾಡ ಜಿಲ್ಲೆಯ ಕೃಷಿ ವಲಯಗಳು, ಮಳೆ ವಿತರಣೆ ಮತ್ತು ಮಣ್ಣಿನ ವಿಧಗಳು' 
                  : 'Dharwad Agro-Climatic Zones, Rainfall Distribution & Soil Classification'}
              </h2>
              <p className="text-xs text-stone-300 mt-1 max-w-3xl leading-relaxed">
                {isKannada
                  ? 'ಧಾರವಾಡ ಜಿಲ್ಲೆಯು ಕರ್ನಾಟಕದ ಉತ್ತರ ಪರಿವರ್ತನಾ ವಲಯ (ವಲಯ 8) ಮತ್ತು ಉತ್ತರ ಒಣ ವಲಯ (ವಲಯ 3) ಎರಡರ ವೈಶಿಷ್ಟ್ಯಗಳನ್ನು ಒಳಗೊಂಡಿದೆ. ಜಿಲ್ಲೆಯ ಪ್ರಸಿದ್ಧ ಕೃಷಿ ವಿಶ್ವವಿದ್ಯಾಲಯ (UASD) ಕೃಷಿನಗರದಲ್ಲಿದೆ.'
                  : 'Dharwad spans two major agro-climatic zones of Karnataka: Zone 8 (Northern Transition Zone with moderate 750-900mm rain) and Zone 3 (Northern Dry Zone with semi-arid deep Vertisols). UAS Dharwad anchors world-class agricultural research here.'}
              </p>
            </div>

            {/* Zones Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {DHARWAD_AGRO_MET_PROFILE.agroClimaticZones.map((zone, zIdx) => (
                <div key={zIdx} className="bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 text-[10px] font-bold bg-emerald-500/20 text-emerald-300 rounded-full">
                      {zone.zone.split(' - ')[0]}
                    </span>
                    <span className="text-xs font-bold text-blue-400">{zone.rainfallRangeMm}</span>
                  </div>
                  <h3 className="text-base font-bold text-stone-100">{zone.zone}</h3>
                  <div className="text-xs text-stone-400">
                    <strong>{isKannada ? 'ತಾಲೂಕುಗಳು:' : 'Taluks:'}</strong> {zone.taluks.join(', ')}
                  </div>
                  <p className="text-xs text-stone-300 bg-stone-950 p-3 rounded-xl border border-stone-800 leading-relaxed">
                    {zone.characteristics}
                  </p>
                </div>
              ))}
            </div>

            {/* Soil Profiles (Deep Black Cotton vs Red Sandy Loam) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {DHARWAD_AGRO_MET_PROFILE.soilTypes.map((soil) => (
                <div key={soil.id} className="bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400">{soil.percentageOfDistrict} of District Land</span>
                    <span className="text-xs text-stone-400">pH {soil.phRange}</span>
                  </div>
                  <h3 className="text-base font-bold text-stone-100">
                    {isKannada ? soil.kannadaName : soil.name}
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-stone-950 p-2 rounded-xl border border-stone-800">
                      <span className="text-[10px] text-stone-400 block">{isKannada ? 'ಜೇಡಿ ಜೇಡಿ ಅಂಶ:' : 'Clay Content:'}</span>
                      <span className="font-bold text-stone-200">{soil.clayContent}</span>
                    </div>
                    <div className="bg-stone-950 p-2 rounded-xl border border-stone-800">
                      <span className="text-[10px] text-stone-400 block">{isKannada ? 'ಮಣ್ಣಿನ ಆಳ:' : 'Profile Depth:'}</span>
                      <span className="font-bold text-stone-200">{soil.depthCm}</span>
                    </div>
                  </div>
                  <div className="text-xs text-stone-300">
                    <strong className="text-emerald-400">{isKannada ? 'ಸೂಕ್ತ ಬೆಳೆಗಳು:' : 'Optimal Crops:'}</strong> {soil.bestCrops.join(', ')}
                  </div>
                  <p className="text-xs text-stone-300 bg-stone-950 p-3 rounded-xl border border-stone-800 leading-relaxed">
                    <strong>{isKannada ? 'ನಿರ್ವಹಣಾ ಸಲಹೆ:' : 'Agronomic Advice:'}</strong> {soil.managementTip}
                  </p>
                </div>
              ))}
            </div>

            {/* Official Sources & Verification Footer */}
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 text-xs text-stone-300 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>{isKannada ? 'ಅಧಿಕೃತ ಮೂಲಗಳು ಮತ್ತು ದೃಢೀಕರಣ ಮಾಹಿತಿ' : 'Official Data Sources & Compliance'}</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-stone-400 text-[11px]">
                <li><strong>AGMARKNET & e-NAM:</strong> Directorate of Marketing & Inspection, Ministry of Agriculture, Govt. of India (Hubballi, Dharwad, and Annigeri APMC market data).</li>
                <li><strong>KSAMB:</strong> Karnataka State Agricultural Marketing Board daily commodity arrivals and price bulletins.</li>
                <li><strong>CACP:</strong> Commission for Agricultural Costs and Prices, Ministry of Agriculture (MSP for 2024-25 season).</li>
                <li><strong>UAS Dharwad:</strong> University of Agricultural Sciences, Dharwad Package of Practices for Northern Transition and Dry Zones.</li>
                <li><strong>KSNDMC:</strong> Karnataka State Natural Disaster Monitoring Centre telemetric rainfall and agro-meteorological updates.</li>
              </ul>
            </div>
          </div>
        )}
      </main>

      {/* Global Footer */}
      <footer className="border-t border-stone-800 bg-stone-950 py-6 text-xs text-stone-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p>
            © {new Date().getFullYear()} Dharwad Krishi Plan • Designed for Dharwad District, Karnataka, India
          </p>
          <div className="flex items-center gap-4 text-stone-400">
            <span>UAS Dharwad Guidance</span>
            <span>•</span>
            <span>AGMARKNET / e-NAM Live Data</span>
            <span>•</span>
            <span className="text-emerald-400 font-medium">Bilingual EN / ಕನ್ನಡ</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

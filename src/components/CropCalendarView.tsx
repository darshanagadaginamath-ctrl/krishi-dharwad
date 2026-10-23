import React, { useState } from 'react';
import { 
  DHARWAD_CROP_CALENDAR, 
  CalendarCrop, 
  DHARWAD_DOUBLE_CROPPING_SYSTEMS, 
  DoubleCroppingSystem,
  KARNATAKA_SEASON_WISE_CALENDAR,
  KarnatakaSeasonData,
  KarnatakaSeasonCrop
} from '../data/dharwadData';
import { 
  Calendar, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles, 
  ChevronRight, 
  Layers, 
  ArrowRight,
  Sun,
  Droplets,
  Sprout,
  Wheat,
  Scissors,
  CheckCircle,
  HelpCircle,
  MapPin,
  Globe
} from 'lucide-react';

interface Props {
  isKannada: boolean;
}

const MONTHS_DATA = [
  { id: 'January', en: 'January', kn: 'ಜನವರಿ', season: 'Rabi / Late Rabi' },
  { id: 'February', en: 'February', kn: 'ಫೆಬ್ರವರಿ', season: 'Rabi Harvest / Summer' },
  { id: 'March', en: 'March', kn: 'ಮಾರ್ಚ್', season: 'Summer / Deep Tillage' },
  { id: 'April', en: 'April', kn: 'ಏಪ್ರಿಲ್', season: 'Summer Harvest / Mungaru prep' },
  { id: 'May', en: 'May', kn: 'ಮೇ', season: 'Pre-Monsoon / Nursery' },
  { id: 'June', en: 'June', kn: 'ಜೂನ್', season: 'SW Monsoon Onset / Kharif Sowing' },
  { id: 'July', en: 'July', kn: 'ಜುಲೈ', season: 'Peak Kharif Sowing & Transplanting' },
  { id: 'August', en: 'August', kn: 'ಆಗಸ್ಟ್', season: 'Kharif Vegetative & Intercultivation' },
  { id: 'September', en: 'September', kn: 'ಸೆಪ್ಟೆಂಬರ್', season: 'Early Kharif Harvest / Rabi Jowar Sowing' },
  { id: 'October', en: 'October', kn: 'ಅಕ್ಟೋಬರ್', season: 'Kharif Harvest & Peak Rabi Chickpea Sowing' },
  { id: 'November', en: 'November', kn: 'ನವೆಂಬರ್', season: 'NE Monsoon / Rabi Vegetative' },
  { id: 'December', en: 'December', kn: 'ಡಿಸೆಂಬರ್', season: 'Winter / Cotton 1st Picking' }
];

export const CropCalendarView: React.FC<Props> = ({ isKannada }) => {
  const [activeViewMode, setActiveViewMode] = useState<'month_explorer' | 'crop_cards' | 'double_crop' | 'gantt_matrix' | 'karnataka_seasons'>('karnataka_seasons');
  const [selectedMonth, setSelectedMonth] = useState<string>('October');
  const [selectedCropDetail, setSelectedCropDetail] = useState<CalendarCrop | null>(DHARWAD_CROP_CALENDAR[0]);
  const [selectedKarnatakaSeasonId, setSelectedKarnatakaSeasonId] = useState<'kharif' | 'rabi' | 'summer' | 'perennial'>('kharif');

  // Find crops for the selected month
  const cropsToSowInSelectedMonth = DHARWAD_CROP_CALENDAR.filter(c => c.sowingMonths.includes(selectedMonth));
  const cropsToHarvestInSelectedMonth = DHARWAD_CROP_CALENDAR.filter(c => c.harvestMonths.includes(selectedMonth));
  const cropsGrowingInSelectedMonth = DHARWAD_CROP_CALENDAR.filter(c => 
    c.growthMonths.includes(selectedMonth) && 
    !c.sowingMonths.includes(selectedMonth) && 
    !c.harvestMonths.includes(selectedMonth)
  );

  return (
    <div className="space-y-6">
      {/* Top Banner & Mode Switcher */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-stone-900 to-amber-950/50 border border-emerald-800/40 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-400" />
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                {isKannada ? 'ಕರ್ನಾಟಕ ಮತ್ತು ಧಾರವಾಡ ಹಂಗಾಮುವಾರು ಮಾರ್ಗದರ್ಶಿ' : 'Karnataka Season-Wise Crop Calendar'}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-stone-100 mt-1">
              {isKannada 
                ? 'ಕರ್ನಾಟಕದ ಹಂಗಾಮುವಾರು ಬೆಳೆಗಳ ಬಿತ್ತನೆ ಮತ್ತು ಕಟಾವು (Kharif, Rabi, Summer)' 
                : 'Karnataka Season-Wise Crop Sowing & Harvesting Intelligence'}
            </h2>
            <p className="text-xs text-stone-300 mt-1 max-w-2xl leading-relaxed">
              {isKannada
                ? 'ಮುಂಗಾರು (Kharif), ಹಿಂಗಾರು (Rabi), ಬೇಸಿಗೆ (Summer) ಮತ್ತು ಬಹುವಾರ್ಷಿಕ ಹಂಗಾಮುಗಳ ನಿಖರ ಬಿತ್ತನೆ ತಿಂಗಳು, ಕಟಾವು ಕಾಲ, ತಳಿಗಳು ಮತ್ತು ಜಿಲ್ಲಾವಾರು ವಿತರಣೆ.'
                : 'Statewide Karnataka seasonal cropping matrix across Kharif (SW Monsoon), Rabi (NE Monsoon/Vertisols), Summer (Irrigated), and Perennial commercial plantations.'}
            </p>
          </div>

          {/* Navigation Mode Pills */}
          <div className="flex flex-wrap items-center bg-stone-950 p-1.5 rounded-xl border border-stone-800 shadow-inner gap-1">
            <button
              onClick={() => setActiveViewMode('karnataka_seasons')}
              className={`px-3 py-2 text-xs font-bold rounded-lg transition ${
                activeViewMode === 'karnataka_seasons'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              {isKannada ? '🗺️ ಕರ್ನಾಟಕ ಹಂಗಾಮುಗಳು' : '🗺️ Karnataka Seasons'}
            </button>

            <button
              onClick={() => setActiveViewMode('month_explorer')}
              className={`px-3 py-2 text-xs font-bold rounded-lg transition ${
                activeViewMode === 'month_explorer'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              {isKannada ? '📅 ತಿಂಗಳ ಶೋಧಕ' : '📅 Month Explorer'}
            </button>

            <button
              onClick={() => setActiveViewMode('crop_cards')}
              className={`px-3 py-2 text-xs font-bold rounded-lg transition ${
                activeViewMode === 'crop_cards'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              {isKannada ? '🌱 ಬೆಳೆ ವೇಳಾಪಟ್ಟಿ' : '🌱 Crop Schedules'}
            </button>

            <button
              onClick={() => setActiveViewMode('double_crop')}
              className={`px-3 py-2 text-xs font-bold rounded-lg transition ${
                activeViewMode === 'double_crop'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              {isKannada ? '🔄 ದ್ವಿ-ಬೆಳೆ' : '🔄 Double Crop'}
            </button>

            <button
              onClick={() => setActiveViewMode('gantt_matrix')}
              className={`px-3 py-2 text-xs font-bold rounded-lg transition ${
                activeViewMode === 'gantt_matrix'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              {isKannada ? '📊 ಗ್ಯಾಂಟ್ ನಕ್ಷೆ' : '📊 Gantt Matrix'}
            </button>
          </div>
        </div>
      </div>

      {/* MODE: KARNATAKA STATE SEASON-WISE CROPPING MATRIX */}
      {activeViewMode === 'karnataka_seasons' && (() => {
        const curSeason = KARNATAKA_SEASON_WISE_CALENDAR.find(s => s.seasonId === selectedKarnatakaSeasonId) || KARNATAKA_SEASON_WISE_CALENDAR[0];

        return (
          <div className="space-y-6">
            {/* Season Selector Tabs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {KARNATAKA_SEASON_WISE_CALENDAR.map((s) => {
                const isSelected = selectedKarnatakaSeasonId === s.seasonId;
                return (
                  <button
                    key={s.seasonId}
                    onClick={() => setSelectedKarnatakaSeasonId(s.seasonId)}
                    className={`flex flex-col text-left p-4 rounded-2xl border transition-all duration-300 ${
                      isSelected
                        ? 'bg-gradient-to-br from-emerald-950/80 to-stone-900 border-emerald-500 shadow-xl ring-2 ring-emerald-500/40'
                        : 'bg-stone-900/80 border-stone-800 text-stone-400 hover:text-stone-100 hover:border-stone-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xl">
                        {s.seasonId === 'kharif' ? '🌧️' : s.seasonId === 'rabi' ? '🌾' : s.seasonId === 'summer' ? '☀️' : '🌴'}
                      </span>
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                        isSelected ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-stone-800 text-stone-400'
                      }`}>
                        {s.crops.length} {isKannada ? 'ಪ್ರಮುಖ ಬೆಳೆಗಳು' : 'Major Crops'}
                      </span>
                    </div>

                    <h3 className="text-sm font-black text-stone-100 mt-2">
                      {isKannada ? s.nameKn.split(' ')[0] : s.nameEn.split(' ')[0]}
                    </h3>
                    <span className="text-[11px] text-stone-400 font-medium">
                      {isKannada ? s.nameEn : s.nameKn}
                    </span>
                    <span className="text-[10px] text-emerald-400 mt-1 font-semibold">
                      Sow: {isKannada ? s.sowingPeriodKn : s.sowingPeriodEn.split('(')[0]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Season Detailed Banner */}
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-stone-800 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/40">
                      {curSeason.seasonId.toUpperCase()}
                    </span>
                    <span className="text-xs text-stone-400 font-semibold">
                      {curSeason.rainfallShare}
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-stone-100 mt-1">
                    {isKannada ? curSeason.nameKn : curSeason.nameEn}
                  </h3>
                  <p className="text-xs text-emerald-400 font-semibold mt-0.5 flex items-center gap-1.5">
                    <Droplets className="w-3.5 h-3.5" />
                    <span>{isKannada ? curSeason.monsoonNameKn : curSeason.monsoonNameEn}</span>
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <div className="bg-stone-950 p-2.5 rounded-xl border border-stone-800">
                    <span className="text-[10px] text-stone-400 block">{isKannada ? 'ಬಿತ್ತನೆ ಅವಧಿ:' : 'Statewide Sowing Window:'}</span>
                    <span className="font-bold text-emerald-400">{isKannada ? curSeason.sowingPeriodKn : curSeason.sowingPeriodEn}</span>
                  </div>
                  <div className="bg-stone-950 p-2.5 rounded-xl border border-stone-800">
                    <span className="text-[10px] text-stone-400 block">{isKannada ? 'ಕಟಾವು ಅವಧಿ:' : 'Harvesting Window:'}</span>
                    <span className="font-bold text-amber-400">{isKannada ? curSeason.harvestPeriodKn : curSeason.harvestPeriodEn}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-stone-300 bg-stone-950 p-3 rounded-xl border border-stone-800 leading-relaxed">
                {isKannada ? curSeason.overviewKn : curSeason.overviewEn}
              </p>
            </div>

            {/* Grid of Season Crops across Karnataka */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {curSeason.crops.map((crop) => (
                <div
                  key={crop.id}
                  className="bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between hover:border-emerald-500/60 transition duration-300 space-y-4"
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-stone-950 text-stone-300 rounded border border-stone-800">
                          {crop.category}
                        </span>
                        <h4 className="text-base font-black text-stone-100 mt-1">
                          {isKannada ? crop.nameKn : crop.nameEn}
                        </h4>
                        <span className="text-[11px] text-stone-400 block">
                          {isKannada ? crop.nameEn : crop.nameKn}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-xl border border-emerald-800/60">
                        {crop.durationDays}
                      </span>
                    </div>

                    {/* Sowing & Harvest Windows */}
                    <div className="space-y-2 mt-4">
                      <div className="bg-stone-950 p-2.5 rounded-xl border border-stone-800 space-y-0.5">
                        <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                          <Sprout className="w-3 h-3" />
                          {isKannada ? 'ಬಿತ್ತನೆ ಕಾಲ (Sowing Window):' : 'Sowing Window:'}
                        </span>
                        <p className="text-xs font-semibold text-stone-200">
                          {isKannada ? crop.sowingMonthsKn : crop.sowingMonths}
                        </p>
                      </div>

                      <div className="bg-stone-950 p-2.5 rounded-xl border border-stone-800 space-y-0.5">
                        <span className="text-[10px] font-bold text-amber-400 flex items-center gap-1">
                          <Scissors className="w-3 h-3" />
                          {isKannada ? 'ಕೊಯ್ಲು ಕಾಲ (Harvest Window):' : 'Harvesting Window:'}
                        </span>
                        <p className="text-xs font-semibold text-stone-200">
                          {isKannada ? crop.harvestMonthsKn : crop.harvestMonths}
                        </p>
                      </div>
                    </div>

                    {/* Leading Districts in Karnataka */}
                    <div className="mt-3 text-[11px] text-stone-300 bg-stone-950/60 p-2.5 rounded-xl border border-stone-850">
                      <strong className="text-stone-200 flex items-center gap-1 mb-0.5">
                        <MapPin className="w-3 h-3 text-red-400" />
                        {isKannada ? 'ಪ್ರಮುಖ ಜಿಲ್ಲೆಗಳು:' : 'Leading Karnataka Districts:'}
                      </strong>
                      <span className="text-stone-400 leading-snug">{crop.primaryDistricts}</span>
                    </div>

                    {/* Key Recommended Varieties */}
                    <div className="mt-2 text-[11px] text-stone-300 bg-stone-950/60 p-2.5 rounded-xl border border-stone-850">
                      <strong className="text-emerald-400 block mb-0.5">
                        {isKannada ? 'ಪ್ರಮುಖ ತಳಿಗಳು (UAS Bangalore / Dharwad / Raichur):' : 'Recommended High-Yield Varieties:'}
                      </strong>
                      <span className="text-stone-300 font-medium">{crop.keyVarieties}</span>
                    </div>
                  </div>

                  {/* Water & Irrigation Dependency */}
                  <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between text-[10px] text-stone-400">
                    <span>{isKannada ? 'ನೀರಿನ ಅಗತ್ಯತೆ:' : 'Water Source:'}</span>
                    <span className="font-semibold text-blue-300">{crop.rainfallDependency}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })()}

      {/* MODE 1: INTERACTIVE MONTH EXPLORER */}
      {activeViewMode === 'month_explorer' && (
        <div className="space-y-6">
          {/* Horizontal 12 Months Selector Bar */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 shadow-xl">
            <h3 className="text-xs font-bold text-stone-300 uppercase tracking-wider mb-3 flex items-center justify-between">
              <span>{isKannada ? 'ತಿಂಗಳು ಆಯ್ಕೆಮಾಡಿ (ಆ ತಿಂಗಳಲ್ಲಿ ಏನು ಬಿತ್ತಬೇಕು & ಏನು ಕೊಯ್ಯಬೇಕು ತಿಳಿಯಿರಿ):' : 'Select a Month to View Active Sowing, Harvest, and Farm Operations:'}</span>
              <span className="text-emerald-400 font-extrabold">{selectedMonth}</span>
            </h3>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2">
              {MONTHS_DATA.map((m) => {
                const isSelected = selectedMonth === m.id;
                const sowCount = DHARWAD_CROP_CALENDAR.filter(c => c.sowingMonths.includes(m.id)).length;
                const harvCount = DHARWAD_CROP_CALENDAR.filter(c => c.harvestMonths.includes(m.id)).length;

                return (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMonth(m.id)}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition ${
                      isSelected
                        ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg ring-2 ring-emerald-500/50 scale-[1.03]'
                        : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-100 hover:border-stone-700'
                    }`}
                  >
                    <span className="text-xs font-black">
                      {isKannada ? m.kn : m.en.slice(0, 3)}
                    </span>
                    <div className="flex items-center gap-1 mt-1 text-[9px]">
                      {sowCount > 0 && (
                        <span className={`px-1 rounded ${isSelected ? 'bg-emerald-800 text-emerald-200' : 'bg-emerald-950 text-emerald-400'}`} title="Crops to sow">
                          S:{sowCount}
                        </span>
                      )}
                      {harvCount > 0 && (
                        <span className={`px-1 rounded ${isSelected ? 'bg-amber-800 text-amber-200' : 'bg-amber-950 text-amber-400'}`} title="Crops to harvest">
                          H:{harvCount}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detailed Activities for the Selected Month */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* GREEN BOX: What to Sow in this Month */}
            <div className="bg-stone-900 border border-emerald-800/40 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <Sprout className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-stone-100">
                      {isKannada ? `${selectedMonth} ತಿಂಗಳಲ್ಲಿ ಬಿತ್ತನೆ ಮಾಡುವ ಬೆಳೆಗಳು` : `Crops to Sow in ${selectedMonth}`}
                    </h3>
                    <span className="text-[11px] text-emerald-400 font-semibold">
                      {cropsToSowInSelectedMonth.length} {isKannada ? 'ಬೆಳೆಗಳ ಬಿತ್ತನೆ ಕಾಲ' : 'crop(s) ready for seeding'}
                    </span>
                  </div>
                </div>
                <span className="px-2.5 py-1 text-[10px] font-black bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30">
                  SOWING
                </span>
              </div>

              {cropsToSowInSelectedMonth.length > 0 ? (
                <div className="space-y-3">
                  {cropsToSowInSelectedMonth.map((crop) => (
                    <div key={crop.id} className="bg-stone-950 p-4 rounded-xl border border-stone-800 hover:border-emerald-500/60 transition space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-sm font-bold text-stone-100">
                            {isKannada ? crop.kannadaName : crop.name}
                          </h4>
                          <span className="text-[11px] text-stone-400">
                            {isKannada ? crop.name : crop.kannadaName}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                          {crop.durationDays}
                        </span>
                      </div>

                      <div className="text-xs text-stone-300 bg-stone-900/60 p-2.5 rounded-lg border border-stone-800">
                        <strong className="text-emerald-400">{isKannada ? 'ನಿಖರ ದಿನಾಂಕಗಳು:' : 'Exact Sowing Window:'}</strong>{' '}
                        {isKannada ? crop.kannadaSowingDates : crop.exactSowingDates}
                      </div>

                      <p className="text-[11px] text-stone-400 leading-relaxed">
                        <strong className="text-stone-300">{isKannada ? 'ಪ್ರಮುಖ ಕ್ರಮ:' : 'Key Sowing Advisory:'}</strong> {crop.criticalActivities}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-stone-950 p-8 rounded-xl border border-stone-800 text-center space-y-2">
                  <p className="text-xs text-stone-400">
                    {isKannada 
                      ? `${selectedMonth} ತಿಂಗಳಲ್ಲಿ ಪ್ರಮುಖ ಬೆಳೆಗಳ ಹೊಸ ಬಿತ್ತನೆ ಶಿಫಾರಸಿಲ್ಲ. ಅಂತರ ಬೆಳೆ ನಿರ್ವಹಣೆ ಅಥವಾ ಕಟಾವಿನ ಕೆಲಸಗಳು ನಡೆಯುತ್ತವೆ.` 
                      : `No primary field crops initiate major sowing in ${selectedMonth}. Focus remains on vegetative maintenance, weed management, or harvesting.`}
                  </p>
                </div>
              )}
            </div>

            {/* AMBER BOX: What to Harvest in this Month */}
            <div className="bg-stone-900 border border-amber-800/40 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                    <Scissors className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-stone-100">
                      {isKannada ? `${selectedMonth} ತಿಂಗಳಲ್ಲಿ ಕೊಯ್ಲು ಮಾಡುವ ಬೆಳೆಗಳು` : `Crops to Harvest in ${selectedMonth}`}
                    </h3>
                    <span className="text-[11px] text-amber-400 font-semibold">
                      {cropsToHarvestInSelectedMonth.length} {isKannada ? 'ಬೆಳೆಗಳ ಕಟಾವು ಕಾಲ' : 'crop(s) ready for harvest'}
                    </span>
                  </div>
                </div>
                <span className="px-2.5 py-1 text-[10px] font-black bg-amber-500/20 text-amber-300 rounded-full border border-amber-500/30">
                  HARVESTING
                </span>
              </div>

              {cropsToHarvestInSelectedMonth.length > 0 ? (
                <div className="space-y-3">
                  {cropsToHarvestInSelectedMonth.map((crop) => (
                    <div key={crop.id} className="bg-stone-950 p-4 rounded-xl border border-stone-800 hover:border-amber-500/60 transition space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-sm font-bold text-stone-100">
                            {isKannada ? crop.kannadaName : crop.name}
                          </h4>
                          <span className="text-[11px] text-stone-400">
                            {isKannada ? crop.name : crop.kannadaName}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                          {isKannada ? 'ಸುಗ್ಗಿ ಕಾಲ' : 'Harvest Peak'}
                        </span>
                      </div>

                      <div className="text-xs text-stone-300 bg-stone-900/60 p-2.5 rounded-lg border border-stone-800">
                        <strong className="text-amber-400">{isKannada ? 'ಕಟಾವು ದಿನಾಂಕಗಳು:' : 'Exact Harvest Dates:'}</strong>{' '}
                        {isKannada ? crop.kannadaHarvestDates : crop.exactHarvestDates}
                      </div>

                      <div className="text-[11px] text-stone-300 bg-amber-950/20 p-2.5 rounded-lg border border-amber-900/30">
                        <strong className="text-amber-300">{isKannada ? 'ಕಟಾವಿಗೆ ಬಂದ ಲಕ್ಷಣಗಳು:' : 'Maturity Cues:'}</strong>{' '}
                        {isKannada ? crop.kannadaMaturitySigns : crop.maturitySigns}
                      </div>

                      <p className="text-[11px] text-stone-400">
                        <strong className="text-stone-300">{isKannada ? 'ವೈಜ್ಞಾನಿಕ ಕಟಾವು ವಿಧಾನ:' : 'Harvest Method:'}</strong>{' '}
                        {isKannada ? crop.kannadaHarvestMethod : crop.harvestMethod}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-stone-950 p-8 rounded-xl border border-stone-800 text-center space-y-2">
                  <p className="text-xs text-stone-400">
                    {isKannada 
                      ? `${selectedMonth} ತಿಂಗಳಲ್ಲಿ ಪ್ರಮುಖ ಬೆಳೆಗಳ ಕಟಾವು ಇರುವುದಿಲ್ಲ. ಬೆಳೆಗಳು ಹೂವಾಡುವ ಅಥವಾ ಕಾಯಿ ಕಟ್ಟುವ ಹಂತದಲ್ಲಿರುತ್ತವೆ.` 
                      : `No major harvests occur during ${selectedMonth}. Crops are typically in vegetative, flowering, or pod filling stages.`}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: CROP-BY-CROP DEDICATED SOWING & HARVEST CARDS */}
      {activeViewMode === 'crop_cards' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DHARWAD_CROP_CALENDAR.map((crop) => (
              <div
                key={crop.id}
                className="bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between hover:border-emerald-500/60 transition duration-300 space-y-4"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
                        {crop.season}
                      </span>
                      <h3 className="text-base font-black text-stone-100 mt-1">
                        {isKannada ? crop.kannadaName : crop.name}
                      </h3>
                      <span className="text-[11px] text-stone-400 block">
                        {isKannada ? crop.name : crop.kannadaName}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-stone-300 bg-stone-950 px-2.5 py-1 rounded-xl border border-stone-800">
                      {crop.durationDays}
                    </span>
                  </div>

                  {/* Sowing Window Card */}
                  <div className="mt-4 bg-stone-950 p-3 rounded-xl border border-stone-800 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                      <Sprout className="w-3.5 h-3.5" />
                      <span>{isKannada ? 'ಬಿತ್ತನೆ ಸಮಯ (Sowing Window):' : 'When to Sow:'}</span>
                    </div>
                    <p className="text-xs font-semibold text-stone-200">
                      {isKannada ? crop.kannadaSowingDates : crop.exactSowingDates}
                    </p>
                    <div className="flex gap-1 mt-1">
                      {crop.sowingMonths.map(m => (
                        <span key={m} className="px-1.5 py-0.5 text-[10px] bg-emerald-950 text-emerald-300 rounded border border-emerald-800 font-medium">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Harvest Window Card */}
                  <div className="mt-3 bg-stone-950 p-3 rounded-xl border border-stone-800 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                      <Scissors className="w-3.5 h-3.5" />
                      <span>{isKannada ? 'ಕೊಯ್ಲು ಸಮಯ (Harvest Window):' : 'When to Harvest:'}</span>
                    </div>
                    <p className="text-xs font-semibold text-stone-200">
                      {isKannada ? crop.kannadaHarvestDates : crop.exactHarvestDates}
                    </p>
                    <div className="flex gap-1 mt-1">
                      {crop.harvestMonths.map(m => (
                        <span key={m} className="px-1.5 py-0.5 text-[10px] bg-amber-950 text-amber-300 rounded border border-amber-800 font-medium">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Maturity Checklist */}
                  <div className="mt-3 bg-stone-950/60 p-3 rounded-xl border border-stone-800/80 text-[11px] text-stone-300 space-y-1">
                    <span className="font-bold text-stone-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      {isKannada ? 'ಕಟಾವಿಗೆ ಬಂದ ಲಕ್ಷಣಗಳು:' : 'How to Know It’s Ready for Harvest:'}
                    </span>
                    <p className="leading-relaxed text-stone-300">
                      {isKannada ? crop.kannadaMaturitySigns : crop.maturitySigns}
                    </p>
                  </div>
                </div>

                {/* Sowing-to-Harvest Timeline Milestones */}
                <div className="pt-3 border-t border-stone-800">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-2">
                    {isKannada ? 'ಬೆಳವಣಿಗೆಯ ಪ್ರಮುಖ ಹಂತಗಳು (DAS):' : 'Key Lifecycle Milestones (DAS):'}
                  </span>
                  <div className="space-y-1.5">
                    {crop.growthStages.map((stg, sIdx) => (
                      <div key={sIdx} className="flex items-center justify-between text-[10px] bg-stone-950 px-2 py-1 rounded-lg border border-stone-850">
                        <span className="text-stone-300 font-medium">
                          {isKannada ? stg.kannadaStage : stg.stage}
                        </span>
                        <span className="text-emerald-400 font-bold shrink-0">{stg.das}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODE 3: DOUBLE CROPPING SYSTEMS */}
      {activeViewMode === 'double_crop' && (
        <div className="space-y-6">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-black text-stone-100 flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-400" />
              <span>
                {isKannada 
                  ? 'ಧಾರವಾಡ ಜಿಲ್ಲೆಯ ಪ್ರಮುಖ ದ್ವಿ-ಬೆಳೆ ಅನುಕ್ರಮಗಳು (Double Cropping Rotations)' 
                  : 'Dharwad Double Cropping Systems: Maximize Land Productivity'}
              </span>
            </h3>
            <p className="text-xs text-stone-300 mt-1 max-w-3xl leading-relaxed">
              {isKannada
                ? 'ಧಾರವಾಡದ ಆಳವಾದ ಎರೆಮಣ್ಣಿನಲ್ಲಿ ಮುಂಗಾರು ಮಳೆಯ ನಂತರ ಹಿಂಗಾರು ತೇವಾಂಶ ಉಳಿಯುವುದರಿಂದ, ಒಂದೇ ವರ್ಷದಲ್ಲಿ 2 ಬೆಳೆಗಳನ್ನು ತೆಗೆಯುವ ಮೂಲಕ ಎಕರೆ ಆದಾಯವನ್ನು ಗರಿಷ್ಠಗೊಳಿಸಬಹುದು.'
                : 'Because Dharwad’s deep Vertisols retain high subsoil residual moisture after the South-West Monsoon, farmers achieve high aggregate net profit by executing timely sequential cropping with zero fallow gaps.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DHARWAD_DOUBLE_CROPPING_SYSTEMS.map((system) => (
              <div
                key={system.id}
                className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-5 hover:border-emerald-500/60 transition"
              >
                <div>
                  <span className="px-2.5 py-0.5 text-[10px] font-bold bg-emerald-500/20 text-emerald-400 rounded-full border border-emerald-500/30">
                    {system.netIncomeEstimate}
                  </span>
                  <h4 className="text-base font-black text-stone-100 mt-2">
                    {isKannada ? system.titleKn : system.titleEn}
                  </h4>
                  <span className="text-xs text-stone-400 block mt-1">
                    <strong>{isKannada ? 'ಸೂಕ್ತ ಮಣ್ಣು:' : 'Soil:'}</strong> {isKannada ? system.soilSuitabilityKn : system.soilSuitabilityEn}
                  </span>

                  {/* Flow Diagram */}
                  <div className="mt-4 space-y-3">
                    {/* Step 1: Kharif */}
                    <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800 space-y-1">
                      <div className="flex items-center justify-between text-xs font-bold text-emerald-400">
                        <span>1. {isKannada ? 'ಮುಂಗಾರು ಬೆಳೆ (Kharif)' : 'Kharif Crop'}</span>
                        <span className="text-[10px] text-stone-400">SW Monsoon</span>
                      </div>
                      <p className="text-sm font-bold text-stone-100">
                        {isKannada ? system.kharif.cropKn : system.kharif.cropEn}
                      </p>
                      <div className="text-[11px] text-stone-300 flex justify-between pt-1 border-t border-stone-850">
                        <span>Sow: <strong className="text-emerald-400">{system.kharif.sowWindow}</strong></span>
                        <span>Harv: <strong className="text-amber-400">{system.kharif.harvestWindow}</strong></span>
                      </div>
                    </div>

                    {/* Arrow down */}
                    <div className="flex justify-center text-emerald-400">
                      <ArrowRight className="w-5 h-5 rotate-90" />
                    </div>

                    {/* Step 2: Rabi */}
                    <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800 space-y-1">
                      <div className="flex items-center justify-between text-xs font-bold text-blue-400">
                        <span>2. {isKannada ? 'ಹಿಂಗಾರು ಬೆಳೆ (Rabi)' : 'Rabi Crop'}</span>
                        <span className="text-[10px] text-stone-400">Residual Moisture</span>
                      </div>
                      <p className="text-sm font-bold text-stone-100">
                        {isKannada ? system.rabi.cropKn : system.rabi.cropEn}
                      </p>
                      <div className="text-[11px] text-stone-300 flex justify-between pt-1 border-t border-stone-850">
                        <span>Sow: <strong className="text-emerald-400">{system.rabi.sowWindow}</strong></span>
                        <span>Harv: <strong className="text-amber-400">{system.rabi.harvestWindow}</strong></span>
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 text-xs text-stone-300 bg-stone-950/80 p-3 rounded-xl border border-stone-800 leading-relaxed">
                    {isKannada ? system.rationaleKn : system.rationaleEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODE 4: FULL ANNUAL GANTT TIMELINE MATRIX */}
      {activeViewMode === 'gantt_matrix' && (
        <div className="space-y-4">
          <div className="overflow-x-auto rounded-2xl border border-stone-800 bg-stone-900/60 shadow-xl p-4">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-800">
              <h3 className="text-sm font-bold text-stone-200">
                {isKannada ? '12 ತಿಂಗಳ ಪೂರ್ಣ ಬೆಳೆ ಚಕ್ರ ನಕ್ಷೆ' : 'Complete 12-Month Sowing, Growth & Harvest Matrix'}
              </h3>
              {/* Color Legend */}
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded bg-emerald-500 font-bold" />
                  <span className="text-stone-300 font-medium">{isKannada ? 'ಬಿತ್ತನೆ (Sowing)' : 'Sowing (Sow)'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded bg-blue-600/50" />
                  <span className="text-stone-300 font-medium">{isKannada ? 'ಬೆಳವಣಿಗೆ (Growth)' : 'Vegetative (•)'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded bg-amber-500 font-bold" />
                  <span className="text-stone-300 font-medium">{isKannada ? 'ಕಟಾವು (Harvest)' : 'Harvest (Harv)'}</span>
                </div>
              </div>
            </div>

            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-stone-800 text-stone-400 font-bold">
                  <th className="py-3 px-3 min-w-[180px]">{isKannada ? 'ಬೆಳೆ ಹೆಸರು' : 'Crop'}</th>
                  <th className="py-3 px-2 min-w-[80px]">{isKannada ? 'ಋತು' : 'Season'}</th>
                  {MONTHS_DATA.map((m) => (
                    <th key={m.id} className="py-3 px-1 text-center font-bold text-stone-300 w-14">
                      {isKannada ? m.kn : m.en.slice(0, 3)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800">
                {DHARWAD_CROP_CALENDAR.map((crop) => (
                  <tr key={crop.id} className="hover:bg-stone-800/40 transition">
                    <td className="py-3.5 px-3">
                      <span className="font-bold text-stone-100 block">
                        {isKannada ? crop.kannadaName : crop.name}
                      </span>
                      <span className="text-[10px] text-stone-400">
                        {isKannada ? crop.name : crop.kannadaName} • {crop.durationDays}
                      </span>
                    </td>
                    <td className="py-3.5 px-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-stone-950 text-stone-300 border border-stone-800">
                        {crop.season}
                      </span>
                    </td>

                    {/* 12 Months Cells */}
                    {MONTHS_DATA.map((m) => {
                      const isSowing = crop.sowingMonths.includes(m.id);
                      const isGrowth = crop.growthMonths.includes(m.id);
                      const isHarvest = crop.harvestMonths.includes(m.id);

                      let cellBg = 'bg-transparent';
                      let cellText = '';
                      let cellClass = '';

                      if (isSowing) {
                        cellBg = 'bg-emerald-500 text-stone-950 font-black shadow-sm';
                        cellText = 'Sow';
                      } else if (isHarvest) {
                        cellBg = 'bg-amber-500 text-stone-950 font-black shadow-sm';
                        cellText = 'Harv';
                      } else if (isGrowth) {
                        cellBg = 'bg-blue-600/30 text-blue-300 font-bold';
                        cellText = '•';
                      }

                      return (
                        <td key={m.id} className="py-2 px-1 text-center">
                          <div className={`h-8 rounded-lg flex items-center justify-center text-[10px] transition ${cellBg}`}>
                            {cellText}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

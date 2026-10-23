import React, { useState } from 'react';
import { DHARWAD_CROPS, CropData } from '../data/dharwadData';
import { 
  Calculator, 
  IndianRupee, 
  TrendingUp, 
  AlertCircle, 
  RotateCcw, 
  PieChart, 
  Check, 
  HelpCircle,
  ShieldCheck,
  Scale
} from 'lucide-react';

interface Props {
  isKannada: boolean;
}

export const BudgetCalculator: React.FC<Props> = ({ isKannada }) => {
  const [selectedCropId, setSelectedCropId] = useState<string>('cotton');
  const [farmType, setFarmType] = useState<'rainfed' | 'irrigated'>('rainfed');
  const [acres, setAcres] = useState<number>(2.0);

  const selectedCrop = DHARWAD_CROPS.find(c => c.id === selectedCropId) || DHARWAD_CROPS[0];
  const defaultMetrics = farmType === 'rainfed' ? selectedCrop.rainfed : selectedCrop.irrigated;

  // Custom adjustable parameters initialized from UAS Dharwad benchmark
  const [customPrice, setCustomPrice] = useState<number>(selectedCrop.mandiModalPriceInrPerQtl);
  const [customYield, setCustomYield] = useState<number>(defaultMetrics.averageYieldQtl);

  // Cost items per acre
  const [costSeed, setCostSeed] = useState<number>(defaultMetrics.costBreakdown.seedCost);
  const [costLandPrep, setCostLandPrep] = useState<number>(defaultMetrics.costBreakdown.landPrep);
  const [costFertilizers, setCostFertilizers] = useState<number>(defaultMetrics.costBreakdown.fertilizersAndFYM);
  const [costProtection, setCostProtection] = useState<number>(defaultMetrics.costBreakdown.plantProtection);
  const [costLabor, setCostLabor] = useState<number>(defaultMetrics.costBreakdown.laborAndWeeding);
  const [costHarvest, setCostHarvest] = useState<number>(defaultMetrics.costBreakdown.harvestingThreshing);
  const [costTransport, setCostTransport] = useState<number>(defaultMetrics.costBreakdown.transportMarketing);

  // When crop or farmType changes, reset to that crop's UASD baseline
  const handleCropChange = (cropId: string) => {
    setSelectedCropId(cropId);
    const newCrop = DHARWAD_CROPS.find(c => c.id === cropId) || DHARWAD_CROPS[0];
    const newMetrics = farmType === 'rainfed' ? newCrop.rainfed : newCrop.irrigated;
    setCustomPrice(newCrop.mandiModalPriceInrPerQtl);
    setCustomYield(newMetrics.averageYieldQtl);
    setCostSeed(newMetrics.costBreakdown.seedCost);
    setCostLandPrep(newMetrics.costBreakdown.landPrep);
    setCostFertilizers(newMetrics.costBreakdown.fertilizersAndFYM);
    setCostProtection(newMetrics.costBreakdown.plantProtection);
    setCostLabor(newMetrics.costBreakdown.laborAndWeeding);
    setCostHarvest(newMetrics.costBreakdown.harvestingThreshing);
    setCostTransport(newMetrics.costBreakdown.transportMarketing);
  };

  const handleFarmTypeChange = (type: 'rainfed' | 'irrigated') => {
    setFarmType(type);
    const newMetrics = type === 'rainfed' ? selectedCrop.rainfed : selectedCrop.irrigated;
    setCustomYield(newMetrics.averageYieldQtl);
    setCostSeed(newMetrics.costBreakdown.seedCost);
    setCostLandPrep(newMetrics.costBreakdown.landPrep);
    setCostFertilizers(newMetrics.costBreakdown.fertilizersAndFYM);
    setCostProtection(newMetrics.costBreakdown.plantProtection);
    setCostLabor(newMetrics.costBreakdown.laborAndWeeding);
    setCostHarvest(newMetrics.costBreakdown.harvestingThreshing);
    setCostTransport(newMetrics.costBreakdown.transportMarketing);
  };

  const resetToUasdBenchmark = () => {
    handleCropChange(selectedCropId);
  };

  // Calculations
  const costPerAcre = costSeed + costLandPrep + costFertilizers + costProtection + costLabor + costHarvest + costTransport;
  const totalCost = costPerAcre * acres;
  const grossIncomePerAcre = customYield * customPrice;
  const totalGrossIncome = grossIncomePerAcre * acres;
  const netProfitPerAcre = grossIncomePerAcre - costPerAcre;
  const totalNetProfit = netProfitPerAcre * acres;
  const breakEvenPrice = customYield > 0 ? Math.round(costPerAcre / customYield) : 0;
  const roiPercentage = costPerAcre > 0 ? Math.round((netProfitPerAcre / costPerAcre) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-emerald-400" />
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                {isKannada ? 'ಕೃಷಿ ವೆಚ್ಚ ಮತ್ತು ಲಾಭದ ಕ್ಯಾಲ್ಕುಲೇಟರ್' : 'Interactive Farm Budget Simulator'}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-stone-100 mt-1">
              {isKannada 
                ? 'ಎಕರೆವಾರು ವೆಚ್ಚ, ಇಳುವರಿ ಮತ್ತು ಆದಾಯದ ಲೆಕ್ಕಾಚಾರ' 
                : 'Per-Acre Budget & Break-Even Price Calculator'}
            </h2>
            <p className="text-xs text-stone-300 mt-1 max-w-2xl">
              {isKannada
                ? 'ನಿಮ್ಮ ಜಮೀನಿನ ವಿಸ್ತೀರ್ಣ, ನಿರೀಕ್ಷಿತ ಇಳುವರಿ, ಮಾರುಕಟ್ಟೆ ದರ ಮತ್ತು ವೆಚ್ಚಗಳನ್ನು ಬದಲಾಯಿಸಿ ನಿವ್ವಳ ಲಾಭ ಹಾಗೂ ಕನಿಷ್ಠ ಬ್ರೇಕ್-ಈವನ್ ದರವನ್ನು ಲೆಕ್ಕ ಹಾಕಿ.'
                : 'Simulate financial outcomes based on UAS Dharwad Package of Practices. Adjust yield, mandi price, and input costs to find your exact safety margin.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={resetToUasdBenchmark}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white rounded-xl text-xs font-semibold transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isKannada ? 'UASD ಮಾದರಿಗೆ ಮರುಹೊಂದಿಸಿ' : 'Reset to UASD Benchmark'}</span>
            </button>
          </div>
        </div>

        {/* Global Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-stone-800">
          <div>
            <label className="text-xs font-semibold text-stone-400 block mb-1">
              {isKannada ? 'ಬೆಳೆ ಆಯ್ಕೆ:' : 'Select Crop:'}
            </label>
            <select
              value={selectedCropId}
              onChange={(e) => handleCropChange(e.target.value)}
              className="w-full bg-stone-950 border border-stone-700 text-stone-100 rounded-xl px-3 py-2 text-xs font-semibold outline-none focus:border-emerald-500"
            >
              {DHARWAD_CROPS.map((c) => (
                <option key={c.id} value={c.id}>
                  {isKannada ? c.kannadaName : c.name} ({c.season})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-400 block mb-1">
              {isKannada ? 'ಜಮೀನಿನ ಮಾದರಿ:' : 'Land Type:'}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleFarmTypeChange('rainfed')}
                className={`py-2 px-2 text-xs font-bold rounded-xl transition ${
                  farmType === 'rainfed'
                    ? 'bg-amber-600 text-white'
                    : 'bg-stone-950 border border-stone-800 text-stone-400'
                }`}
              >
                {isKannada ? '🌧️ ಖುಷ್ಕಿ' : 'Rainfed'}
              </button>
              <button
                type="button"
                onClick={() => handleFarmTypeChange('irrigated')}
                className={`py-2 px-2 text-xs font-bold rounded-xl transition ${
                  farmType === 'irrigated'
                    ? 'bg-blue-600 text-white'
                    : 'bg-stone-950 border border-stone-800 text-stone-400'
                }`}
              >
                {isKannada ? '💧 ನೀರಾವರಿ' : 'Irrigated'}
              </button>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-stone-400 block">
                {isKannada ? 'ಜಮೀನಿನ ವಿಸ್ತೀರ್ಣ (ಎಕರೆ):' : 'Total Farm Area (Acres):'}
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 5, 10].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setAcres(num)}
                    className={`px-1.5 py-0.5 text-[10px] rounded font-bold transition ${
                      acres === num ? 'bg-emerald-500 text-stone-950' : 'bg-stone-800 text-stone-400 hover:text-white'
                    }`}
                  >
                    {num}A
                  </button>
                ))}
              </div>
            </div>
            <input
              type="number"
              min="0.5"
              max="100"
              step="0.5"
              value={acres}
              onChange={(e) => setAcres(Math.max(0.5, parseFloat(e.target.value) || 1))}
              className="w-full bg-stone-950 border border-stone-700 text-stone-100 rounded-xl px-3 py-2 text-xs font-bold outline-none focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Simulator Body: Inputs on Left, Real-time Dashboard on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Inputs & Sliders (7 cols) */}
        <div className="lg:col-span-7 space-y-5 bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-xl">
          <h3 className="text-sm font-bold text-stone-200 uppercase tracking-wider flex items-center gap-2">
            <span>⚙️</span>
            <span>{isKannada ? 'ಮಾರುಕಟ್ಟೆ ದರ ಮತ್ತು ವೆಚ್ಚಗಳ ಹೊಂದಾಣಿಕೆ' : 'Yield, Price & Input Cost Adjustments'}</span>
          </h3>

          {/* Key Revenue Drivers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-stone-950 p-4 rounded-xl border border-stone-800">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-stone-300 font-semibold">{isKannada ? 'ನಿರೀಕ್ಷಿತ ಇಳುವರಿ (ಕ್ವಿಂಟಾಲ್/ಎಕರೆ):' : 'Expected Yield (q/acre):'}</span>
                <span className="text-blue-400 font-bold">{customYield} qtl</span>
              </div>
              <input
                type="range"
                min={Math.max(1, defaultMetrics.yieldRange[0] - 2)}
                max={defaultMetrics.yieldRange[1] + 5}
                step="0.5"
                value={customYield}
                onChange={(e) => setCustomYield(parseFloat(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer"
              />
              <span className="text-[10px] text-stone-500">
                UASD Range: {defaultMetrics.yieldRange[0]} - {defaultMetrics.yieldRange[1]} qtl
              </span>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-stone-300 font-semibold">{isKannada ? 'ಮಾರುಕಟ್ಟೆ ದರ (₹/ಕ್ವಿಂಟಾಲ್):' : 'Mandi Price (₹/quintal):'}</span>
                <span className="text-emerald-400 font-bold">₹{customPrice.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min={Math.floor(selectedCrop.mandiMinPriceInrPerQtl * 0.7)}
                max={Math.ceil(selectedCrop.mandiMaxPriceInrPerQtl * 1.3)}
                step="50"
                value={customPrice}
                onChange={(e) => setCustomPrice(parseInt(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <span className="text-[10px] text-stone-500">
                Hubballi APMC Modal: ₹{selectedCrop.mandiModalPriceInrPerQtl.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Itemized Cost Breakdown Sliders */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-stone-300 uppercase">
              {isKannada ? 'ಎಕರೆವಾರು ಕೃಷಿ ವೆಚ್ಚಗಳ ವಿವರ (₹):' : 'Itemized Per-Acre Expenses (₹):'}
            </h4>

            {/* Seed */}
            <div className="flex items-center justify-between gap-4 text-xs">
              <span className="text-stone-400 w-44">{isKannada ? 'ಬೀಜ & ಉಪಚಾರ (Seed & Treatment):' : 'Seed & Bio-treatment:'}</span>
              <input
                type="number"
                step="100"
                value={costSeed}
                onChange={(e) => setCostSeed(Math.max(0, parseInt(e.target.value) || 0))}
                className="bg-stone-950 border border-stone-800 text-stone-100 rounded-lg px-2.5 py-1 text-xs w-28 text-right outline-none focus:border-emerald-500"
              />
            </div>

            {/* Land Preparation */}
            <div className="flex items-center justify-between gap-4 text-xs">
              <span className="text-stone-400 w-44">{isKannada ? 'ಉಳುಮೆ & ಸಿದ್ಧತೆ (Land Prep):' : 'Land Preparation & Tillage:'}</span>
              <input
                type="number"
                step="100"
                value={costLandPrep}
                onChange={(e) => setCostLandPrep(Math.max(0, parseInt(e.target.value) || 0))}
                className="bg-stone-950 border border-stone-800 text-stone-100 rounded-lg px-2.5 py-1 text-xs w-28 text-right outline-none focus:border-emerald-500"
              />
            </div>

            {/* Fertilizers & Manure */}
            <div className="flex items-center justify-between gap-4 text-xs">
              <span className="text-stone-400 w-44">{isKannada ? 'ಗೊಬ್ಬರ & ಸೆಗಣಿ (Nutrients & FYM):' : 'Fertilizers & FYM Manure:'}</span>
              <input
                type="number"
                step="100"
                value={costFertilizers}
                onChange={(e) => setCostFertilizers(Math.max(0, parseInt(e.target.value) || 0))}
                className="bg-stone-950 border border-stone-800 text-stone-100 rounded-lg px-2.5 py-1 text-xs w-28 text-right outline-none focus:border-emerald-500"
              />
            </div>

            {/* Plant Protection */}
            <div className="flex items-center justify-between gap-4 text-xs">
              <span className="text-stone-400 w-44">{isKannada ? 'ಕೀಟನಾಶಕ & ರೋಗ ನಿಯಂತ್ರಣ:' : 'Plant Protection & IPM:'}</span>
              <input
                type="number"
                step="100"
                value={costProtection}
                onChange={(e) => setCostProtection(Math.max(0, parseInt(e.target.value) || 0))}
                className="bg-stone-950 border border-stone-800 text-stone-100 rounded-lg px-2.5 py-1 text-xs w-28 text-right outline-none focus:border-emerald-500"
              />
            </div>

            {/* Labor & Weeding */}
            <div className="flex items-center justify-between gap-4 text-xs">
              <span className="text-stone-400 w-44">{isKannada ? 'ಕಳೆ ಕೀಳುವಿಕೆ & ಕೂಲಿ (Labor):' : 'Labor, Weeding & Intercultivation:'}</span>
              <input
                type="number"
                step="100"
                value={costLabor}
                onChange={(e) => setCostLabor(Math.max(0, parseInt(e.target.value) || 0))}
                className="bg-stone-950 border border-stone-800 text-stone-100 rounded-lg px-2.5 py-1 text-xs w-28 text-right outline-none focus:border-emerald-500"
              />
            </div>

            {/* Harvesting & Threshing */}
            <div className="flex items-center justify-between gap-4 text-xs">
              <span className="text-stone-400 w-44">{isKannada ? 'ಕಟಾವು & ಬಡಿದು ಕಾಳು ಬೇರ್ಪಡಿಸುವಿಕೆ:' : 'Harvesting & Threshing:'}</span>
              <input
                type="number"
                step="100"
                value={costHarvest}
                onChange={(e) => setCostHarvest(Math.max(0, parseInt(e.target.value) || 0))}
                className="bg-stone-950 border border-stone-800 text-stone-100 rounded-lg px-2.5 py-1 text-xs w-28 text-right outline-none focus:border-emerald-500"
              />
            </div>

            {/* Transport & Bags */}
            <div className="flex items-center justify-between gap-4 text-xs">
              <span className="text-stone-400 w-44">{isKannada ? 'ಚೀಲ & ಸಾಗಾಣಿಕೆ (APMC Transport):' : 'Bags & APMC Transport:'}</span>
              <input
                type="number"
                step="100"
                value={costTransport}
                onChange={(e) => setCostTransport(Math.max(0, parseInt(e.target.value) || 0))}
                className="bg-stone-950 border border-stone-800 text-stone-100 rounded-lg px-2.5 py-1 text-xs w-28 text-right outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Right: Live Financial Summary & Break-Even Metric (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Main Profit Card */}
          <div className="bg-gradient-to-br from-emerald-950/80 via-stone-900 to-stone-900 border border-emerald-500/40 rounded-2xl p-6 shadow-2xl space-y-4">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400">
              {isKannada ? `${acres} ಎಕರೆಗೆ ನಿವ್ವಳ ಲಾಭದ ಅಂದಾಜು` : `Projected Net Profit for ${acres} Acre(s)`}
            </span>

            <div className="text-3xl md:text-4xl font-black text-emerald-300">
              ₹{totalNetProfit.toLocaleString('en-IN')}
            </div>

            <div className="text-xs text-stone-300 flex items-center justify-between pt-2 border-t border-emerald-900/40">
              <span>{isKannada ? 'ಎಕರೆವಾರು ನಿವ್ವಳ ಲಾಭ:' : 'Per-Acre Net Profit:'}</span>
              <span className="font-bold text-emerald-400">₹{netProfitPerAcre.toLocaleString('en-IN')}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-2">
              <div className="bg-stone-950/80 p-2.5 rounded-xl border border-stone-800">
                <span className="text-stone-400 text-[10px] block">{isKannada ? 'ಒಟ್ಟು ವೆಚ್ಚ (Total Cost):' : 'Total Expenses:'}</span>
                <span className="text-red-400 font-bold text-sm">₹{totalCost.toLocaleString('en-IN')}</span>
              </div>
              <div className="bg-stone-950/80 p-2.5 rounded-xl border border-stone-800">
                <span className="text-stone-400 text-[10px] block">{isKannada ? 'ಒಟ್ಟು ವರಮಾನ (Gross Income):' : 'Gross Revenue:'}</span>
                <span className="text-blue-400 font-bold text-sm">₹{totalGrossIncome.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Break-Even Price Card */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-xl space-y-3">
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-amber-400" />
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                {isKannada ? 'ಬ್ರೇಕ್-ಈವನ್ ದರ (Break-Even Price)' : 'Break-Even Price Analysis'}
              </h4>
            </div>

            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-2xl font-black text-amber-300">
                  ₹{breakEvenPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-stone-400"> / quintal</span>
              </div>
              <span className="text-xs px-2.5 py-1 bg-amber-500/20 text-amber-300 rounded-lg font-bold border border-amber-500/30">
                ROI: {roiPercentage}%
              </span>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed bg-stone-950 p-3 rounded-xl border border-stone-800">
              {isKannada ? (
                <>
                  ನೀವು ನಷ್ಟವಿಲ್ಲದೆ ವೆಚ್ಚ ತುಂಬಿಕೊಳ್ಳಲು ಪ್ರತಿ ಕ್ವಿಂಟಾಲ್‌ಗೆ ಕನಿಷ್ಠ <strong className="text-amber-300">₹{breakEvenPrice}</strong> ದರ ಪಡೆಯಬೇಕು. ಪ್ರಸ್ತುತ ಮಾರುಕಟ್ಟೆ ದರ (₹{customPrice}) ಇದಕ್ಕೆ ಹೋಲಿಸಿದರೆ{' '}
                  {customPrice > breakEvenPrice ? (
                    <span className="text-emerald-400 font-bold">
                      +{Math.round(((customPrice - breakEvenPrice) / breakEvenPrice) * 100)}% ಸುರಕ್ಷಿತ ರಕ್ಷಣಾ ಅಂತರ (Safety buffer)
                    </span>
                  ) : (
                    <span className="text-red-400 font-bold">ನಷ್ಟದ ಅಪಾಯದಲ್ಲಿದೆ!</span>
                  )}
                  {' '}ಹೊಂದಿದೆ.
                </>
              ) : (
                <>
                  You need a minimum market price of <strong className="text-amber-300">₹{breakEvenPrice}/qtl</strong> to cover expenses. At your current expected price of ₹{customPrice}/qtl, you have a{' '}
                  {customPrice > breakEvenPrice ? (
                    <span className="text-emerald-400 font-bold">
                      +{Math.round(((customPrice - breakEvenPrice) / breakEvenPrice) * 100)}% safety cushion
                    </span>
                  ) : (
                    <span className="text-red-400 font-bold">deficit risk</span>
                  )}
                  .
                </>
              )}
            </p>
          </div>

          {/* Legal / Agronomic Disclaimer */}
          <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800 text-[11px] text-stone-400 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
            <p leading-relaxed>
              {isKannada
                ? 'ಗಮನಿಸಿ: ಈ ಲೆಕ್ಕಾಚಾರವು ಕೃಷಿ ವಿವಿ ಧಾರವಾಡ ಮತ್ತು ಹುಬ್ಬಳ್ಳಿ ಮಂಡಿ ದರಗಳನ್ನು ಆಧರಿಸಿದ ಅಂದಾಜಾಗಿದೆ. ಹವಾಮಾನ ವೈಪರೀತ್ಯ, ಕೀಟ ಬಾಧೆ ಹಾಗೂ ಮಾರುಕಟ್ಟೆ ಏರಿಳಿತಗಳಿಂದ ನೈಜ ಲಾಭ ವ್ಯತ್ಯಾಸವಾಗಬಹುದು; ಲಾಭದ ಖಾತರಿ ಇರುವುದಿಲ್ಲ.'
                : 'Disclaimer: Calculations represent financial models based on UAS Dharwad Package of Practices and official APMC market rates. Agricultural returns are subject to climatic, pest, and market volatility; no profits or yields are guaranteed.'}
            </p>
          </div>
        </div>
      </div>

      {/* Scaled Multi-Crop Table for Selected Acreage (e.g. 2 Acres) */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-3">
          <div>
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
              {isKannada ? `${acres} ಎಕರೆಗೆ ಎಲ್ಲಾ ಬೆಳೆಗಳ ನೇರ ಹೋಲಿಕೆ` : `Direct Comparison for ${acres} Acre(s)`}
            </span>
            <h3 className="text-lg font-black text-stone-100">
              {isKannada 
                ? `${acres} ಎಕರೆ ಜಮೀನಿನಲ್ಲಿ ಯಾವ ಬೆಳೆ ಎಷ್ಟು ಲಾಭ ನೀಡುತ್ತದೆ? (${farmType === 'rainfed' ? 'ಖುಷ್ಕಿ' : 'ನೀರಾವರಿ'})` 
                : `${acres} Acre(s) Comprehensive Profit & Cost Comparison (${farmType === 'rainfed' ? 'Rainfed' : 'Irrigated'})`}
            </h3>
          </div>
          <span className="text-xs text-stone-400 bg-stone-950 px-3 py-1.5 rounded-xl border border-stone-800">
            {isKannada ? 'ಮಂಡಿ ದರ: ಅಕ್ಟೋಬರ್ 2024' : 'Mandi Session: Oct 2024'}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-800 text-stone-400 font-bold uppercase text-[10px]">
                <th className="py-2.5 px-3">{isKannada ? 'ಬೆಳೆ ಹೆಸರು' : 'Crop'}</th>
                <th className="py-2.5 px-2">{isKannada ? 'ಬೀಜದ ಪ್ರಮಾಣ' : 'Seed Needed'}</th>
                <th className="py-2.5 px-2 text-right">{isKannada ? `ಒಟ್ಟು ಇಳುವರಿ (${acres} ಎಕರೆ)` : `Est. Yield (${acres}A)`}</th>
                <th className="py-2.5 px-2 text-right">{isKannada ? 'ಒಟ್ಟು ವೆಚ್ಚ (₹)' : 'Total Cost (₹)'}</th>
                <th className="py-2.5 px-2 text-right">{isKannada ? 'ಒಟ್ಟು ಆದಾಯ (₹)' : 'Gross Income (₹)'}</th>
                <th className="py-2.5 px-3 text-right text-emerald-400 font-black">{isKannada ? 'ನಿವ್ವಳ ಲಾಭ (₹)' : 'Net Profit (₹)'}</th>
                <th className="py-2.5 px-2 text-center">{isKannada ? 'ಬ್ರೇಕ್-ಈವನ್' : 'Break-Even'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800">
              {DHARWAD_CROPS.map((crop) => {
                const metrics = farmType === 'rainfed' ? crop.rainfed : crop.irrigated;
                const scaledYield = Math.round(metrics.averageYieldQtl * acres * 10) / 10;
                const scaledCost = Math.round(metrics.cultivationCostInr * acres);
                const scaledGross = Math.round(metrics.grossIncomeInr * acres);
                const scaledNet = Math.round(metrics.netProfitInr * acres);

                return (
                  <tr 
                    key={crop.id} 
                    onClick={() => handleCropChange(crop.id)}
                    className={`cursor-pointer transition hover:bg-stone-800/50 ${
                      crop.id === selectedCropId ? 'bg-emerald-950/30 border-l-2 border-emerald-500' : ''
                    }`}
                  >
                    <td className="py-3 px-3">
                      <span className="font-bold text-stone-100 block">
                        {isKannada ? crop.kannadaName : crop.name}
                      </span>
                      <span className="text-[10px] text-stone-400">
                        {crop.category} • {crop.season}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-stone-300">
                      {crop.agronomy.seedRatePerAcre} × {acres}
                    </td>
                    <td className="py-3 px-2 text-right font-bold text-stone-200">
                      {scaledYield} qtl
                    </td>
                    <td className="py-3 px-2 text-right font-medium text-red-300">
                      ₹{scaledCost.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-2 text-right font-bold text-blue-400">
                      ₹{scaledGross.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-3 text-right font-black text-emerald-400 text-sm">
                      ₹{scaledNet.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-2 text-center font-semibold text-amber-300">
                      ₹{metrics.breakEvenPriceInrPerQtl}/q
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

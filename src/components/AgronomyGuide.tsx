import React, { useState } from 'react';
import { 
  BookOpen, 
  Sprout, 
  Droplets, 
  Bug, 
  Compass, 
  FlaskConical, 
  ShieldCheck, 
  CheckCircle2, 
  Calendar,
  Warehouse,
  Wind,
  Sun
} from 'lucide-react';
import { DHARWAD_AGRO_MET_PROFILE } from '../data/dharwadData';

interface Props {
  isKannada: boolean;
}

export const AgronomyGuide: React.FC<Props> = ({ isKannada }) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps = [
    {
      step: 1,
      titleEn: 'Land Preparation & Summer Tillage (ಬೇಸಿಗೆ ಉಳುಮೆ)',
      titleKn: 'ಭೂಮಿ ಸಿದ್ಧತೆ ಮತ್ತು ಆಳವಾದ ಬೇಸಿಗೆ ಉಳುಮೆ',
      icon: Compass,
      pointsEn: [
        'Perform deep summer ploughing immediately after rabi harvest (March-April) with MB plough to 25-30 cm depth.',
        'Exposes dormant soil pupae of Pink Bollworm (Cotton) and Gram Pod Borer (Chickpea) to scorching summer sun and predatory birds.',
        'Breaks subsoil hardpan in Vertisols and Alfisols, maximizing rainwater percolation during pre-monsoon showers.',
        'Form contour bunds and broad-bed furrows (BBF) across slopes to curb erosion and conserve in-situ runoff.'
      ],
      pointsKn: [
        'ಹಿಂಗಾರು ಬೆಳೆ ಕಟಾವಿನ ನಂತರ (ಮಾರ್ಚ್-ಏಪ್ರಿಲ್) ಎಂಬಿ ನೇಗಿಲಿನಿಂದ 25-30 ಸೆಂ.ಮೀ ಆಳವಾದ ಬೇಸಿಗೆ ಉಳುಮೆ ಮಾಡಬೇಕು.',
        'ಮಣ್ಣಿನಲ್ಲಿರುವ ಗುಲಾಬಿ ಕಾಯಿಕೊರೆಯುವ ಹುಳು ಹಾಗೂ ಕಡಲೆ ಕಾಯಿಕೊರೆಯುವ ಹುಳುವಿನ ಕೋಶಾವಸ್ಥೆಯು ಬಿಸಿಲಿಗೆ ಒಡ್ಡಿ ನಾಶವಾಗುತ್ತದೆ.',
        'ಕಪ್ಪು ಮತ್ತು ಕೆಂಪು ಮಣ್ಣಿನ ಗಟ್ಟಿ ಪದರ ಒಡೆದು, ಮುಂಗಾರು ಮಳೆಯ ನೀರು ಪೂರ್ಣ ಪ್ರಮಾಣದಲ್ಲಿ ಇಂಗಲು ಸಹಕಾರಿಯಾಗುತ್ತದೆ.',
        'ಮಣ್ಣು ಮತ್ತು ತೇವಾಂಶ ಸಂರಕ್ಷಣೆಗಾಗಿ ಇಳಿಜಾರಿಗೆ ಅಡ್ಡಲಾಗಿ ಬದು ನಿರ್ಮಾಣ (ಕಾಂಟೂರ್ ಬಂಡಿಂಗ್) ಮಾಡುವುದು ಕಡ್ಡಾಯ.'
      ]
    },
    {
      step: 2,
      titleEn: 'Soil Health & Integrated Nutrient Management (INM)',
      titleKn: 'ಮಣ್ಣು ಪರೀಕ್ಷೆ ಮತ್ತು ಸಮಗ್ರ ಪೋಷಕಾಂಶ ನಿರ್ವಹಣೆ (INM)',
      icon: FlaskConical,
      pointsEn: [
        'Soil-test based fertilization: Test for pH, Electrical Conductivity, Organic Carbon, and available N-P-K-S-Zn.',
        'Apply 5 to 8 tonnes of well-decomposed Farmyard Manure (FYM) or 2 tonnes vermicompost per acre 3 weeks before sowing.',
        'Secondary Nutrients: Apply 8-10 kg Sulphur per acre for oilseeds (Soybean/Groundnut) to enhance oil synthesis.',
        'Micronutrients: Apply Zinc Sulphate @ 10 kg/acre in Vertisols to eliminate widespread zinc deficiency in Dharwad soils.'
      ],
      pointsKn: [
        'ಮಣ್ಣು ಆರೋಗ್ಯ ಪತ್ರಿಕೆಯ ಆಧಾರದ ಮೇಲೆ ರಸಗೊಬ್ಬರ ಪ್ರಮಾಣವನ್ನು ನಿರ್ಧರಿಸಬೇಕು (ಸಾರಜನಕ, ರಂಜಕ, ಪೊಟ್ಯಾಷ್ ಮತ್ತು ಲಘು ಪೋಷಕಾಂಶಗಳು).',
        'ಬಿತ್ತನೆಗೆ 3 ವಾರಗಳ ಮುಂಚೆ ಎಕರೆಗೆ 5 ರಿಂದ 8 ಟನ್ ಚೆನ್ನಾಗಿ ಕಳಿತ ಕೊಟ್ಟಿಗೆ ಗೊಬ್ಬರ ಅಥವಾ 2 ಟನ್ ಎರೆಹುಳು ಗೊಬ್ಬರ ಸೇರಿಸಿ ಮಣ್ಣಿಗೆ ಮಿಶ್ರಣ ಮಾಡಬೇಕು.',
        'ಎಣ್ಣೆಕಾಳು ಬೆಳೆಗಳಿಗೆ (ಸೋಯಾಬಿನ್, ಶೇಂಗಾ) ಎಕರೆಗೆ 8-10 ಕೆಜಿ ಗಂಧಕ (Sulphur) ನೀಡುವುದು ಎಣ್ಣೆಯ ಇಳುವರಿ ಹೆಚ್ಚಿಸಲು ಅತ್ಯಗತ್ಯ.',
        'ಧಾರವಾಡದ ಕಪ್ಪು ಮಣ್ಣಿನಲ್ಲಿ ಸತುವಿನ (Zinc) ಕೊರತೆ ಇರುವುದರಿಂದ ಬಿತ್ತನೆ ವೇಳೆ ಎಕರೆಗೆ 10 ಕೆಜಿ ಜಿಂಕ್ ಸಲ್ಫೇಟ್ ನೀಡಬೇಕು.'
      ]
    },
    {
      step: 3,
      titleEn: 'Scientific Seed Treatment & Inoculation (ಬೀಜೋಪಚಾರ)',
      titleKn: 'ವೈಜ್ಞಾನಿಕ ಬೀಜೋಪಚಾರ ಮತ್ತು ಜೈವಿಕ ಗೊಬ್ಬರ ಲೇಪನ',
      icon: Sprout,
      pointsEn: [
        'Biological Fungicide: Treat seed with Trichoderma viride @ 4-5 g/kg seed to prevent seedling rot, damping-off, and chickpea Fusarium wilt.',
        'Bio-fertilizer Inoculation: Coat pulses and oilseeds with crop-specific Rhizobium culture and Phosphate Solubilizing Bacteria (PSB) @ 500g each per acre seed.',
        'Chemical Shield: Treat non-Bt seeds or susceptible crops with Imidacloprid 70 WS @ 5 g/kg or Thiamethoxam 30 FS to protect against early sucking pests for 30-40 days.',
        'Ensure the "FIR" protocol order: Fungicide first, Insecticide second, Rhizobium/biofertilizer last.'
      ],
      pointsKn: [
        'ಶಿಲೀಂಧ್ರನಾಶಕ ಉಪಚಾರ: ಪ್ರತಿ ಕೆಜಿ ಬೀಜಕ್ಕೆ 4-5 ಗ್ರಾಂ ಟ್ರೈಕೋಡರ್ಮಾ ವಿರಿಡೆ ಪುಡಿ ಬೆರೆಸಿ ಬೀಜ ನೆರಳು ಒಣಗಿಸಬೇಕು (ಸೊರಗು ರೋಗ ತಡೆಗಟ್ಟಲು).',
        'ಜೈವಿಕ ಗೊಬ್ಬರ: ದ್ವಿದಳ ಧಾನ್ಯ ಮತ್ತು ಎಣ್ಣೆಕಾಳುಗಳಿಗೆ ಬೆಳೆ ನಿರ್ದಿಷ್ಟ ರೈಜೋಬಿಯಂ ಮತ್ತು ರಂಜಕ ಕರಗಿಸುವ ಬ್ಯಾಕ್ಟೀರಿಯಾ (PSB) ಲೇಪಿಸಬೇಕು.',
        'ಕೀಟನಾಶಕ ಲೇಪನ: ಆರಂಭಿಕ ರಸಹೀರುವ ಕೀಟಗಳ (ಹೇನು, ಜಿಗಿಹುಳು) ನಿಯಂತ್ರಣಕ್ಕೆ ಇಮಿಡಾಕ್ಲೋಪ್ರಿಡ್ 70 ಡಬ್ಲ್ಯೂಎಸ್ (5ಗ್ರಾಂ/ಕೆಜಿ) ಬೀಜೋಪಚಾರ.',
        'ಕ್ರಮ ನಿಯಮ: ಮೊದಲು ಶಿಲೀಂಧ್ರನಾಶಕ (Fungicide) -> ನಂತರ ಕೀಟನಾಶಕ (Insecticide) -> ಕೊನೆಯಲ್ಲಿ ಜೈವಿಕ ಗೊಬ್ಬರ (Rhizobium) ಲೇಪಿಸಬೇಕು.'
      ]
    },
    {
      step: 4,
      titleEn: 'Precision Water & Moisture Management (ತೇವಾಂಶ ಸಂರಕ್ಷಣೆ)',
      titleKn: 'ಸೂಕ್ಷ್ಮ ನೀರಾವರಿ ಮತ್ತು ಮಣ್ಣಿನ ತೇವಾಂಶ ನಿರ್ವಹಣೆ',
      icon: Droplets,
      pointsEn: [
        'Residual Moisture Utilization: In rainfed Vertisols, sow rabi chickpea and rabi jowar directly into receding monsoon moisture by mid-October.',
        'Micro-Irrigation Adoption: Install inline drip irrigation with 16mm laterals spaced at 1.2m for cotton and horticulture; saves 40-50% water while boosting yield by 35%.',
        'Krishi Honda (Farm Pond) Integration: Store excess runoff in 20m × 20m lined farm ponds to provide 1-2 critical life-saving protective irrigations during dry spells.',
        'Vertical mulching in deep black soils using straw/crop residues at 4-5m intervals prevents evaporation loss.'
      ],
      pointsKn: [
        'ಹಿಂಗಾರು ತೇವಾಂಶದ ಸದ್ಬಳಕೆ: ಅಕ್ಟೋಬರ್ ಮಧ್ಯಭಾಗದೊಳಗೆ ಕಪ್ಪು ಎರೆಭೂಮಿಯ ತೇವಾಂಶ ಆವಿಯಾಗುವ ಮುನ್ನವೇ ಕಡಲೆ/ಜೋಳ ಬಿತ್ತನೆ ಪೂರ್ಣಗೊಳಿಸಬೇಕು.',
        'ಹನಿ ನೀರಾವರಿ ಅಳವಡಿಕೆ: ಹತ್ತಿ, ತರಕಾರಿ ಮತ್ತು ತೋಟಗಾರಿಕೆಗೆ 16 ಮಿ.ಮೀ ಹನಿ ನೀರಾವರಿ ಅಳವಡಿಸಿ ಶೇ.40-50ರಷ್ಟು ನೀರನ್ನು ಉಳಿಸಿ ಇಳುವರಿ ಹೆಚ್ಚಿಸಬಹುದು.',
        'ಕೃಷಿ ಹೊಂಡ: ಮಳೆ ನೀರು ಸಂಗ್ರಹಣೆಗೆ ಕೃಷಿ ಹೊಂಡ ನಿರ್ಮಿಸಿ, ಮುಂಗಾರು ಕೈಕೊಟ್ಟಾಗ ಸಂರಕ್ಷಣಾತ್ಮಕ ರಕ್ಷಣಾ ನೀರಾವರಿ ಒದಗಿಸುವುದು.',
        'ಕಪ್ಪು ಮಣ್ಣಿನಲ್ಲಿ ಕೃಷಿ ತ್ಯಾಜ್ಯ ಅಥವಾ ಒಣಹುಲ್ಲಿನಿಂದ ಮಣ್ಣು ಮುಚ್ಚುವಿಕೆ (Mulching) ಮಾಡಿ ತೇವಾಂಶ ಆವಿಯಾಗುವುದನ್ನು ತಡೆಯುವುದು.'
      ]
    },
    {
      step: 5,
      titleEn: 'Integrated Pest & Disease Management (IPM)',
      titleKn: 'ಸಮಗ್ರ ಕೀಟ ಮತ್ತು ರೋಗ ನಿರ್ವಹಣೆ (IPM)',
      icon: Bug,
      pointsEn: [
        'Pheromone Trap Network: Install 5 pheromone traps/acre for Pink Bollworm (Gossyplure) in cotton and 4 traps/acre for Helicoverpa in chickpea.',
        'Yellow & Blue Sticky Traps: Erect 10 yellow traps (for whiteflies/aphids) and 5 blue traps (for thrips) per acre at crop canopy height.',
        'Bird Perches: Install 10-15 "T"-shaped wooden bird perches per acre in pulses to encourage predatory birds feeding on pod borer larvae.',
        'Botanical Spray: Apply 5% Neem Seed Kernel Extract (NSKE) or Neem oil (1500 ppm @ 3ml/L) as first line of defense before resorting to chemical insecticides.'
      ],
      pointsKn: [
        'ಲಿಂಗಾಕರ್ಷಕ ಬಲೆಗಳು (Pheromone Traps): ಹತ್ತಿಯಲ್ಲಿ ಗುಲಾಬಿ ಕಾಯಿಕೊರೆಯುವ ಹುಳುವಿಗೆ ಎಕರೆಗೆ 5 ಬಲೆಗಳು, ಕಡಲೆಯಲ್ಲಿ ಹೆಲಿಕೋವರ್ಪ ಹುಳುವಿಗೆ 4 ಬಲೆಗಳನ್ನು ಅಳವಡಿಸಿ.',
        'ವರ್ಣ ಬಲೆಗಳು: ರಸಹೀರುವ ಕೀಟಗಳಾದ ನುಸಿ, ಜಿಗಿಹುಳು ಮತ್ತು ಬಿಳಿನೊಣಗಳ ನಿಯಂತ್ರಣಕ್ಕೆ ಎಕರೆಗೆ 10 ಹಳದಿ ಮತ್ತು 5 ನೀಲಿ ಅಂಟು ಬಲೆಗಳನ್ನು ಹಾಕಿ.',
        'ಪಕ್ಷಿ ಆಸನಗಳು (Bird Perches): ಕಡಲೆ ಹೊಲದಲ್ಲಿ ಎಕರೆಗೆ 10-15 "T" ಆಕಾರದ ಬಿದಿರಿನ ಕಡ್ಡಿಗಳನ್ನು ನೆಡುವುದರಿಂದ ಪಕ್ಷಿಗಳು ಕುಳಿತು ಹುಳುಗಳನ್ನು ಭಕ್ಷಿಸುತ್ತವೆ.',
        'ಬೇವಿನ ಕಷಾಯ (NSKE): ರಾಸಾಯನಿಕ ಸಿಂಪಡಿಸುವ ಮುನ್ನ ಶೇ.5 ರ ಬೇವಿನ ಬೀಜದ ಕಷಾಯ (NSKE) ಅಥವಾ ಬೇವಿನ ಎಣ್ಣೆ ಸಿಂಪಡಿಸಿ ಪರಿಸರಸ್ನೇಹಿ ನಿಯಂತ್ರಣ ಸಾಧಿಸುವುದು.'
      ]
    },
    {
      step: 6,
      titleEn: 'Harvest, Safe Moisture & APMC Storage (ಕಟಾವು & ಉಗ್ರಾಣ)',
      titleKn: 'ವೈಜ್ಞಾನಿಕ ಕಟಾವು, ತೇವಾಂಶ ಪರೀಕ್ಷೆ ಮತ್ತು ಉಗ್ರಾಣ ಸಂಗ್ರಹಣೆ',
      icon: Warehouse,
      pointsEn: [
        'Moisture Testing: Sun-dry harvested grains to safe storage moisture (<10% for chickpea/soybean, <12% for maize/jowar) to prevent aflatoxin and Aspergillus mold.',
        'Distress Sale Prevention: Avoid selling immediately during peak harvest gluts when prices plunge; utilize Dharwad APMC Karnataka State Warehousing Corporation (KSWC) godowns.',
        'Negotiable Warehouse Receipts (e-NWR): Pledge stored produce to secure 70% collateral loans at 7% interest from nationalized banks while awaiting favorable market spikes.',
        'Cotton Quality Preservation: Pick clean cotton after morning dew dries; store in dry shed free from poly-twine contamination to secure grade A price.'
      ],
      pointsKn: [
        'ತೇವಾಂಶ ಮಟ್ಟ: ಕಟಾವಿನ ನಂತರ ಧಾನ್ಯಗಳನ್ನು ಬಿಸಿಲಿನಲ್ಲಿ ಒಣಗಿಸಿ ಸುರಕ್ಷಿತ ತೇವಾಂಶ ಮಟ್ಟಕ್ಕೆ (ಕಡಲೆ/ಸೋಯಾಬಿನ್ <10%, ಜೋಳ/ಮೆಕ್ಕೆಜೋಳ <12%) ತರಬೇಕು.',
        'ಕಡಿಮೆ ಬೆಲೆಗೆ ಮಾರಾಟ ತಡೆ: ಸುಗ್ಗಿಯ ಸಮಯದಲ್ಲಿ ಮಾರುಕಟ್ಟೆಯಲ್ಲಿ ಬೆಲೆ ಕುಸಿದಾಗ ತರಾತುರಿಯಲ್ಲಿ ಮಾರಾಟ ಮಾಡದೆ, ಧಾರವಾಡ ಎಪಿಎಂಸಿ ಅಥವಾ ಕರ್ನಾಟಕ ರಾಜ್ಯ ಉಗ್ರಾಣ ನಿಗಮದಲ್ಲಿ (KSWC) ಸಂಗ್ರಹಿಸಿ.',
        'ಉಗ್ರಾಣ ರಸೀದಿ ಸಾಲ (e-NWR): ಸಂಗ್ರಹಿಸಿದ ರಸೀದಿಯನ್ನು ಬ್ಯಾಂಕಿಗೆ ನೀಡಿ ಶೇ.70 ರಷ್ಟು ಅಲ್ಪಾವಧಿ ಸಾಲ ಪಡೆದು, ಉತ್ತಮ ದರ ಬಂದಾಗ ಮಾರಾಟ ಮಾಡಬಹುದು.',
        'ಹತ್ತಿ ಗುಣಮಟ್ಟ: ಇಬ್ಬನಿ ಆವಿಯಾದ ನಂತರವೇ ಹತ್ತಿ ಬಿಡಿಸಬೇಕು ಮತ್ತು ಪ್ಲಾಸ್ಟಿಕ್ ನಾರು ಮುಕ್ತ ಗೋಣಿ ಚೀಲಗಳಲ್ಲಿ ತುಂಬಿ ಉತ್ತಮ ದರ ಪಡೆಯಬೇಕು.'
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Agro-Climatic Header */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-400" />
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                {isKannada ? 'ಕೃಷಿ ವಿವಿ ಧಾರವಾಡ ಕೃಷಿ ಕೈಪಿಡಿ' : 'UAS Dharwad Package of Practices (POP)'}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-stone-100 mt-1">
              {isKannada 
                ? 'ವೈಜ್ಞಾನಿಕ ಕೃಷಿ ನಿರ್ವಹಣೆಯ 6 ಹಂತಗಳು ಮತ್ತು ಹವಾಮಾನ ಸೂತ್ರ' 
                : 'Scientific 6-Step Cultivation Protocol & Agronomic Guidance'}
            </h2>
            <p className="text-xs text-stone-300 mt-1 max-w-3xl leading-relaxed">
              {isKannada
                ? 'ಕೃಷಿ ವಿಶ್ವವಿದ್ಯಾಲಯ ಧಾರವಾಡ (UASD) ಕೃಷಿನಗರ ಕೇಂದ್ರದ ಸಂಶೋಧನೆಗಳು ಮತ್ತು ಧಾರವಾಡ ಜಿಲ್ಲೆಯ ಉತ್ತರ ಪರಿವರ್ತನಾ ವಲಯ (ವಲಯ-8) ಹಾಗೂ ಉತ್ತರ ಒಣ ವಲಯ (ವಲಯ-3) ಆಧಾರಿತ ಕೃಷಿ ಶಿಫಾರಸುಗಳು.'
                : 'Empirically validated recommendations from the University of Agricultural Sciences, Dharwad (Krishinagar), tailored for Zone 8 (Northern Transition) and Zone 3 (Northern Dry) agro-climates.'}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-stone-950 p-3 rounded-xl border border-stone-800 text-xs text-stone-300">
            <div>
              <span className="text-stone-400 block text-[10px]">{isKannada ? 'ವಾರ್ಷಿಕ ಮಳೆ:' : 'Normal Rainfall:'}</span>
              <span className="font-bold text-emerald-400">{DHARWAD_AGRO_MET_PROFILE.annualNormalRainfallMm} mm</span>
            </div>
            <div className="h-6 w-px bg-stone-800" />
            <div>
              <span className="text-stone-400 block text-[10px]">{isKannada ? 'ಕಪ್ಪು ಮಣ್ಣಿನ ಪಾಲು:' : 'Vertisols Share:'}</span>
              <span className="font-bold text-amber-400">62% of District</span>
            </div>
          </div>
        </div>

        {/* Step Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 mt-5 pt-4 border-t border-stone-800">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <button
                key={s.step}
                onClick={() => setActiveStep(s.step)}
                className={`flex flex-col items-center text-center p-2.5 rounded-xl border transition ${
                  activeStep === s.step
                    ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300 shadow-md'
                    : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                    activeStep === s.step ? 'bg-emerald-500 text-stone-950' : 'bg-stone-800 text-stone-300'
                  }`}>
                    {s.step}
                  </span>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="text-[11px] font-bold line-clamp-1">
                  {isKannada ? s.titleKn.split(' ')[0] : s.titleEn.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Step Detailed Content Card */}
      {(() => {
        const cur = steps.find((s) => s.step === activeStep)!;
        const Icon = cur.icon;
        return (
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                  Step {cur.step} of 6 • UAS Dharwad Standard Protocol
                </span>
                <h3 className="text-xl font-bold text-stone-100 mt-0.5">
                  {isKannada ? cur.titleKn : cur.titleEn}
                </h3>
              </div>
            </div>

            {/* Scientific Directives List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(isKannada ? cur.pointsKn : cur.pointsEn).map((point, pIdx) => (
                <div key={pIdx} className="bg-stone-950 p-4 rounded-xl border border-stone-800/80 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-stone-200 leading-relaxed">{point}</p>
                </div>
              ))}
            </div>

            {/* Agro-meteorological Context Callout */}
            <div className="bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 p-4 rounded-xl border border-stone-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-stone-300">
                <Sun className="w-4 h-4 text-amber-400" />
                <span>
                  <strong>{isKannada ? 'ಪ್ರಸ್ತುತ ಸನ್ನಿವೇಶ:' : 'Seasonal Window:'}</strong>{' '}
                  {DHARWAD_AGRO_MET_PROFILE.currentSeasonContext.status}
                </span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <Droplets className="w-4 h-4" />
                <span>{DHARWAD_AGRO_MET_PROFILE.currentSeasonContext.soilMoistureStatus.split(';')[0]}</span>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

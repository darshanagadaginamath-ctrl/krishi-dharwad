/**
 * Comprehensive Agronomic, Mandi, and Agro-Meteorological Data for Dharwad District, Karnataka.
 * Sources:
 * - AGMARKNET (Directorate of Marketing & Inspection, Ministry of Agriculture, Govt. of India)
 * - e-NAM (National Agriculture Market, Hubballi & Dharwad APMC Mandis)
 * - KSAMB (Karnataka State Agricultural Marketing Board)
 * - University of Agricultural Sciences, Dharwad (UASD) Package of Practices
 * - CACP (Commission for Agricultural Costs and Prices) Minimum Support Prices (MSP) 2024-2025/2026
 * - Karnataka State Natural Disaster Monitoring Centre (KSNDMC) & IMD Agromet Advisory
 */

export interface CropData {
  id: string;
  name: string;
  kannadaName: string;
  botanicalName: string;
  category: 'Cash Crop' | 'Oilseed' | 'Pulse' | 'Cereal' | 'Horticulture' | 'Vegetable';
  kannadaCategory: string;
  uasdVarieties: string[];
  durationDays: string;
  season: 'Kharif' | 'Rabi' | 'Summer' | 'Annual / Multi-Year';
  kannadaSeason: string;
  
  // Soil & Agro-ecology
  suitableSoils: string[];
  kannadaSoils: string;
  irrigationRequirement: 'Low (Rainfed)' | 'Medium' | 'High (Assured Irrigated)' | 'Micro-Irrigation Preferred';
  waterRequirementMm: string;

  // Mandi Data (Verified vs Reference)
  mandiSource: string;
  mandiLocation: string;
  priceDate: string;
  mspPriceInrPerQtl: number | null; // Minimum Support Price if applicable
  mandiModalPriceInrPerQtl: number;
  mandiMinPriceInrPerQtl: number;
  mandiMaxPriceInrPerQtl: number;
  priceTrend: 'Stable' | 'Bullish' | 'Bearish' | 'Volatile';
  isVerifiedMandi: boolean;

  // Rainfed Farm Metrics (Per Acre)
  rainfed: {
    averageYieldQtl: number; // in quintals
    yieldRange: [number, number];
    grossIncomeInr: number;
    cultivationCostInr: number; // A2+FL costs per UAS Dharwad
    netProfitInr: number;
    breakEvenPriceInrPerQtl: number;
    costBenefitRatio: number;
    costBreakdown: {
      landPrep: number;
      seedCost: number;
      fertilizersAndFYM: number;
      plantProtection: number;
      laborAndWeeding: number;
      harvestingThreshing: number;
      transportMarketing: number;
    };
  };

  // Irrigated Farm Metrics (Per Acre)
  irrigated: {
    averageYieldQtl: number;
    yieldRange: [number, number];
    grossIncomeInr: number;
    cultivationCostInr: number;
    netProfitInr: number;
    breakEvenPriceInrPerQtl: number;
    costBenefitRatio: number;
    costBreakdown: {
      landPrep: number;
      seedCost: number;
      fertilizersAndFYM: number;
      plantProtection: number;
      irrigationEnergy: number;
      laborAndWeeding: number;
      harvestingThreshing: number;
      transportMarketing: number;
    };
  };

  // Agronomic Steps (UASD Protocol)
  agronomy: {
    sowingWindow: string;
    seedRatePerAcre: string;
    spacing: string;
    seedTreatment: string;
    npkSRecommendationKgPerAcre: string;
    criticalIrrigationStages: string[];
    majorPestsAndDiseases: {
      name: string;
      symptoms: string;
      ipmControl: string;
    }[];
  };

  // Risk Profile
  riskRating: 'Low' | 'Medium' | 'High' | 'Very High';
  primaryRisks: string[];
  kannadaRisks: string[];
}

export const DHARWAD_CROPS: CropData[] = [
  {
    id: 'cotton',
    name: 'Cotton (Bt Hybrid)',
    kannadaName: 'ಹತ್ತಿ (ಬಿಟಿ ಹೈಬ್ರಿಡ್)',
    botanicalName: 'Gossypium hirsutum',
    category: 'Cash Crop',
    kannadaCategory: 'ವಾಣಿಜ್ಯ ಬೆಳೆ',
    uasdVarieties: ['DHH-11 (UASD Hybrid)', 'RAH-100 (UASD selection)', 'MRC-7351 BG-II', 'RCH-659 BG-II', 'Mallika BG-II'],
    durationDays: '150 - 180 days',
    season: 'Kharif',
    kannadaSeason: 'ಮುಂಗಾರು (ಖಾರಿಫ್)',
    suitableSoils: ['Deep Black Cotton Soil (Vertisol)', 'Medium Black Soil'],
    kannadaSoils: 'ಆಳವಾದ ಕಪ್ಪು ಹತ್ತಿ ಮಣ್ಣು (ಎರೆಭೂಮಿ), ಮಧ್ಯಮ ಕಪ್ಪು ಮಣ್ಣು',
    irrigationRequirement: 'Micro-Irrigation Preferred',
    waterRequirementMm: '650 - 750 mm',
    mandiSource: 'AGMARKNET & e-NAM (Hubballi APMC Mandi)',
    mandiLocation: 'Hubballi / Dharwad APMC',
    priceDate: 'October 2024 (Verified Official Session)',
    mspPriceInrPerQtl: 7521, // 2024-25 Long Staple MSP
    mandiModalPriceInrPerQtl: 7450,
    mandiMinPriceInrPerQtl: 6800,
    mandiMaxPriceInrPerQtl: 7850,
    priceTrend: 'Stable',
    isVerifiedMandi: true,
    rainfed: {
      averageYieldQtl: 7.5,
      yieldRange: [6, 9],
      grossIncomeInr: 55875, // 7.5 * 7450
      cultivationCostInr: 27500,
      netProfitInr: 28375,
      breakEvenPriceInrPerQtl: 3667,
      costBenefitRatio: 2.03,
      costBreakdown: {
        landPrep: 3500,
        seedCost: 2200,
        fertilizersAndFYM: 5200,
        plantProtection: 4800,
        laborAndWeeding: 5500,
        harvestingThreshing: 4500,
        transportMarketing: 1800
      }
    },
    irrigated: {
      averageYieldQtl: 14.5,
      yieldRange: [12, 17],
      grossIncomeInr: 108025, // 14.5 * 7450
      cultivationCostInr: 39500,
      netProfitInr: 68525,
      breakEvenPriceInrPerQtl: 2724,
      costBenefitRatio: 2.73,
      costBreakdown: {
        landPrep: 4000,
        seedCost: 2200,
        fertilizersAndFYM: 8500,
        plantProtection: 6500,
        irrigationEnergy: 3800,
        laborAndWeeding: 6500,
        harvestingThreshing: 6000,
        transportMarketing: 2000
      }
    },
    agronomy: {
      sowingWindow: 'June 15 – July 15 (Onset of SW Monsoon)',
      seedRatePerAcre: '1.5 – 2.0 packets (approx. 900g)',
      spacing: '90 cm × 60 cm (Rainfed) / 120 cm × 60 cm (Drip Irrigated)',
      seedTreatment: 'Imidacloprid 70 WS (5g/kg) + Trichoderma viride (4g/kg seed)',
      npkSRecommendationKgPerAcre: 'N: 48 kg, P2O5: 24 kg, K2O: 24 kg, ZnSO4: 10 kg',
      criticalIrrigationStages: ['Square formation (45-50 DAS)', 'Flowering & Peak bloom (70-80 DAS)', 'Boll development (95-115 DAS)'],
      majorPestsAndDiseases: [
        {
          name: 'Pink Bollworm (Pectinophora gossypiella)',
          symptoms: 'Rosetted flowers, entry holes plugged with frass, eaten seeds inside bolls.',
          ipmControl: 'Install 5 Pheromone traps/acre (Gossyplure), spray NSKE 5% at flowering, release Trichogramma egg parasitoids.'
        },
        {
          name: 'Sucking Pest Complex (Thrips, Leafhopper, Aphids)',
          symptoms: 'Upward/downward leaf curling, hopper burn, yellowing.',
          ipmControl: 'Yellow/Blue sticky traps (10/acre), spray Flonicamid 50 WG (0.3g/L) or Neem oil (3ml/L).'
        }
      ]
    },
    riskRating: 'Medium',
    primaryRisks: ['Pink bollworm infestation', 'Excessive late October rainfall causing boll rot', 'Global fiber price fluctuations'],
    kannadaRisks: ['ಗುಲಾಬಿ ಕಾಯಿಕೊರೆಯುವ ಹುಳು ಬಾಧೆ', 'ಹಿಂಗಾರು ಅತಿಯಾದ ಮಳೆಯಿಂದ ಕಾಯಿ ಕೊಳೆಯುವಿಕೆ', 'ಅಂತಾರಾಷ್ಟ್ರೀಯ ಹತ್ತಿ ದರ ಏರಿಳಿತ']
  },
  {
    id: 'soybean',
    name: 'Soybean',
    kannadaName: 'ಸೋಯಾಬಿನ್',
    botanicalName: 'Glycine max',
    category: 'Oilseed',
    kannadaCategory: 'ಎಣ್ಣೆಕಾಳು ಬೆಳೆ',
    uasdVarieties: ['DSb-21 (Pratiksha - UASD)', 'DSb-23 (UASD rust tolerant)', 'JS-335 (Widely adapted)', 'DSb-28', 'MAUS-71'],
    durationDays: '90 - 98 days',
    season: 'Kharif',
    kannadaSeason: 'ಮುಂಗಾರು (ಖಾರಿಫ್)',
    suitableSoils: ['Deep Vertisols (Black soil)', 'Clay Loams with neutral pH (6.5 - 7.5)'],
    kannadaSoils: 'ಆಳವಾದ ಕಪ್ಪು ಮಣ್ಣು, ಜೇಡಿ ಮಿಶ್ರಿತ ಗೋಡು ಮಣ್ಣು',
    irrigationRequirement: 'Low (Rainfed)',
    waterRequirementMm: '450 - 500 mm',
    mandiSource: 'AGMARKNET & e-NAM (Dharwad & Hubballi APMC)',
    mandiLocation: 'Dharwad / Hubballi Mandi',
    priceDate: 'October 2024 (Verified Official Session)',
    mspPriceInrPerQtl: 4892, // 2024-25 MSP
    mandiModalPriceInrPerQtl: 4480,
    mandiMinPriceInrPerQtl: 4100,
    mandiMaxPriceInrPerQtl: 4750,
    priceTrend: 'Bearish',
    isVerifiedMandi: true,
    rainfed: {
      averageYieldQtl: 8.5,
      yieldRange: [7, 10.5],
      grossIncomeInr: 38080, // 8.5 * 4480
      cultivationCostInr: 16800,
      netProfitInr: 21280,
      breakEvenPriceInrPerQtl: 1976,
      costBenefitRatio: 2.27,
      costBreakdown: {
        landPrep: 2800,
        seedCost: 2400,
        fertilizersAndFYM: 3500,
        plantProtection: 2100,
        laborAndWeeding: 3200,
        harvestingThreshing: 2000,
        transportMarketing: 800
      }
    },
    irrigated: {
      averageYieldQtl: 12.0,
      yieldRange: [10, 14],
      grossIncomeInr: 53760, // 12 * 4480
      cultivationCostInr: 21500,
      netProfitInr: 32260,
      breakEvenPriceInrPerQtl: 1792,
      costBenefitRatio: 2.50,
      costBreakdown: {
        landPrep: 3000,
        seedCost: 2400,
        fertilizersAndFYM: 4800,
        plantProtection: 2800,
        irrigationEnergy: 1800,
        laborAndWeeding: 3500,
        harvestingThreshing: 2200,
        transportMarketing: 1000
      }
    },
    agronomy: {
      sowingWindow: 'June 15 – July 10 (Avoid sowing after July 20)',
      seedRatePerAcre: '24 – 26 kg/acre',
      spacing: '30 cm × 10 cm or 45 cm × 5 cm',
      seedTreatment: 'Bradyrhizobium japonicum + PSB (500g each/acre seed) + Carbendazim (2g/kg)',
      npkSRecommendationKgPerAcre: 'N: 14 kg, P2O5: 32 kg, K2O: 16 kg, Sulphur: 8 kg (essential for oil synthesis)',
      criticalIrrigationStages: ['Flowering (35-40 DAS)', 'Pod development (55-65 DAS)'],
      majorPestsAndDiseases: [
        {
          name: 'Stem Fly (Melanagromyza sojae) & Girdle Beetle',
          symptoms: 'Wilting seedlings, zig-zag internal stem tunneling, girdled petiole rings.',
          ipmControl: 'Seed treatment with Thiamethoxam 30 FS; spray Chlorantraniliprole 18.5 SC (0.3ml/L) if ETL exceeds.'
        },
        {
          name: 'Rust (Phakopsora pachyrhizi)',
          symptoms: 'Brown-red pustules on lower leaves spreading upward during cloudy weather.',
          ipmControl: 'Use UASD resistant variety DSb-21 or DSb-23; spray Hexaconazole 5 EC (1ml/L).'
        }
      ]
    },
    riskRating: 'Low',
    primaryRisks: ['Sub-MSP market prices during heavy harvest arrivals', 'Pod shattering if harvest delayed', 'Prolonged dry spell at pod filling'],
    kannadaRisks: ['ಮುಂಗಾರು ಕೊಯ್ಲಿನ ಸಂದರ್ಭದಲ್ಲಿ ಬೆಂಬಲ ಬೆಲೆಗಿಂತ ಕಡಿಮೆ ದರ', 'ಸಮಯಕ್ಕೆ ಸರಿಯಾಗಿ ಕೊಯ್ಲು ಮಾಡದಿದ್ದರೆ ಕಾಳು ಸಿಡಿಯುವಿಕೆ', 'ಕಾಯಿ ಕಟ್ಟುವ ಹಂತದಲ್ಲಿ ಮಳೆಯ ಕೊರತೆ']
  },
  {
    id: 'maize',
    name: 'Maize (Hybrid Corn)',
    kannadaName: 'ಮೆಕ್ಕೆಜೋಳ (ಹೈಬ್ರಿಡ್ ಜೋಳ)',
    botanicalName: 'Zea mays',
    category: 'Cereal',
    kannadaCategory: 'ಧಾನ್ಯ ಬೆಳೆ',
    uasdVarieties: ['Hema (UASD released)', 'CP-818', 'DKC-9108', 'Pioneer P3522', 'NK-6240'],
    durationDays: '105 - 120 days',
    season: 'Kharif',
    kannadaSeason: 'ಮುಂಗಾರು / ಹಿಂಗಾರು',
    suitableSoils: ['Red Sandy Loam (Alfisols)', 'Medium Black Soil (Well-drained)'],
    kannadaSoils: 'ಕೆಂಪು ಗೋಡು ಮಣ್ಣು, ನೀರು ಬಸಿದುಹೋಗುವ ಮಧ್ಯಮ ಕಪ್ಪು ಮಣ್ಣು',
    irrigationRequirement: 'Medium',
    waterRequirementMm: '500 - 600 mm',
    mandiSource: 'AGMARKNET (Hubballi APMC Mandi)',
    mandiLocation: 'Hubballi Mandi',
    priceDate: 'October 2024 (Verified Official Session)',
    mspPriceInrPerQtl: 2225, // 2024-25 MSP
    mandiModalPriceInrPerQtl: 2240,
    mandiMinPriceInrPerQtl: 2050,
    mandiMaxPriceInrPerQtl: 2420,
    priceTrend: 'Stable',
    isVerifiedMandi: true,
    rainfed: {
      averageYieldQtl: 18.0,
      yieldRange: [15, 22],
      grossIncomeInr: 40320, // 18 * 2240
      cultivationCostInr: 22000,
      netProfitInr: 18320,
      breakEvenPriceInrPerQtl: 1222,
      costBenefitRatio: 1.83,
      costBreakdown: {
        landPrep: 3200,
        seedCost: 2800,
        fertilizersAndFYM: 5800,
        plantProtection: 2600,
        laborAndWeeding: 3800,
        harvestingThreshing: 2800,
        transportMarketing: 1000
      }
    },
    irrigated: {
      averageYieldQtl: 28.0,
      yieldRange: [24, 34],
      grossIncomeInr: 62720, // 28 * 2240
      cultivationCostInr: 31000,
      netProfitInr: 31720,
      breakEvenPriceInrPerQtl: 1107,
      costBenefitRatio: 2.02,
      costBreakdown: {
        landPrep: 3500,
        seedCost: 2800,
        fertilizersAndFYM: 8600,
        plantProtection: 3800,
        irrigationEnergy: 3000,
        laborAndWeeding: 4500,
        harvestingThreshing: 3500,
        transportMarketing: 1300
      }
    },
    agronomy: {
      sowingWindow: 'June 1 – July 15 (Kharif) or Oct 1 – Nov 15 (Rabi)',
      seedRatePerAcre: '6.5 – 7.5 kg/acre',
      spacing: '60 cm × 20 cm or 75 cm × 20 cm',
      seedTreatment: 'Cyantraniliprole 19.8% + Thiamethoxam 19.8% FS (4ml/kg)',
      npkSRecommendationKgPerAcre: 'N: 60 kg (split in 3 doses), P2O5: 30 kg, K2O: 20 kg, ZnSO4: 10 kg',
      criticalIrrigationStages: ['Knee-high vegetative (30-35 DAS)', 'Tasseling & Silking (50-60 DAS)', 'Grain filling / Milking (75-85 DAS)'],
      majorPestsAndDiseases: [
        {
          name: 'Fall Armyworm (Spodoptera frugiperda)',
          symptoms: 'Shot-holes in leaves, ragged feeding in whorl packed with coarse frass.',
          ipmControl: 'Pheromone traps (5/acre); whorl application of sand + lime mixture (9:1); Emamectin benzoate 5 SG (0.4g/L) or Spinetoram 11.7 SC.'
        },
        {
          name: 'Turcicum Leaf Blight (Exserohilum turcicum)',
          symptoms: 'Long elliptical grayish-green or tan lesions on leaves.',
          ipmControl: 'Mancozeb 75 WP (2g/L) or Azoxystrobin + Difenoconazole spray.'
        }
      ]
    },
    riskRating: 'Medium',
    primaryRisks: ['Fall Armyworm recurring damage', 'High fertilizer sensitivity', 'Post-harvest fungal mold if moisture > 12%'],
    kannadaRisks: ['ಲದ್ದಿಹುಳು (ಫಾಲ್ ಆರ್ಮಿವರ್ಮ್) ತೀವ್ರ ಬಾಧೆ', 'ಗೊಬ್ಬರದ ಅತಿಯಾದ ಖರ್ಚು', 'ಧಾನ್ಯದಲ್ಲಿ ತೇವಾಂಶ ಹೆಚ್ಚಿದ್ದರೆ ಶಿಲೀಂಧ್ರ ಮತ್ತು ಕಪ್ಪು ಬಣ್ಣ ಬರುವುದು']
  },
  {
    id: 'jowar',
    name: 'Jowar / Sorghum (Maldandi Rabi)',
    kannadaName: 'ಹಿಂಗಾರು ಬಿಳಿಜೋಳ (ಮಾಲ್ದಂಡಿ)',
    botanicalName: 'Sorghum bicolor',
    category: 'Cereal',
    kannadaCategory: 'ಧಾನ್ಯ ಬೆಳೆ',
    uasdVarieties: ['M-35-1 (Maldandi - Iconic Rabi)', 'DSV-4 (UASD release)', 'DSV-5', 'CSV-29R', 'BJV-44'],
    durationDays: '115 - 125 days',
    season: 'Rabi',
    kannadaSeason: 'ಹಿಂಗಾರು (ರಬಿ)',
    suitableSoils: ['Deep Vertisols (Black cotton soil with high moisture retention)'],
    kannadaSoils: 'ಆಳವಾದ ಎರೆಭೂಮಿ (ತೇವಾಂಶ ಉಳಿಸಿಕೊಳ್ಳುವ ಸಾಮರ್ಥ್ಯವುಳ್ಳ ಕಪ್ಪು ಮಣ್ಣು)',
    irrigationRequirement: 'Low (Rainfed)',
    waterRequirementMm: '350 - 450 mm',
    mandiSource: 'AGMARKNET (Dharwad & Annigeri APMC)',
    mandiLocation: 'Annigeri / Dharwad Mandi',
    priceDate: 'October 2024 (Verified Official Session)',
    mspPriceInrPerQtl: 3421, // 2024-25 Maldandi MSP
    mandiModalPriceInrPerQtl: 4400, // Premium Maldandi attracts high consumer preference in North Karnataka
    mandiMinPriceInrPerQtl: 3800,
    mandiMaxPriceInrPerQtl: 5200,
    priceTrend: 'Bullish',
    isVerifiedMandi: true,
    rainfed: {
      averageYieldQtl: 9.0, // + 2.5 tonnes dry stover (fodder valued at ~₹6,000/acre)
      yieldRange: [7.5, 11],
      grossIncomeInr: 45600, // (9 * 4400) + 6000 fodder value
      cultivationCostInr: 14500,
      netProfitInr: 31100,
      breakEvenPriceInrPerQtl: 1611,
      costBenefitRatio: 3.14,
      costBreakdown: {
        landPrep: 2500,
        seedCost: 900,
        fertilizersAndFYM: 3200,
        plantProtection: 1400,
        laborAndWeeding: 2800,
        harvestingThreshing: 2700,
        transportMarketing: 1000
      }
    },
    irrigated: {
      averageYieldQtl: 15.0,
      yieldRange: [13, 18],
      grossIncomeInr: 74000, // (15 * 4400) + 8000 fodder
      cultivationCostInr: 20000,
      netProfitInr: 54000,
      breakEvenPriceInrPerQtl: 1333,
      costBenefitRatio: 3.70,
      costBreakdown: {
        landPrep: 2800,
        seedCost: 900,
        fertilizersAndFYM: 4800,
        plantProtection: 1800,
        irrigationEnergy: 1600,
        laborAndWeeding: 3400,
        harvestingThreshing: 3500,
        transportMarketing: 1200
      }
    },
    agronomy: {
      sowingWindow: 'September 15 – October 15 (Crucial for residual moisture)',
      seedRatePerAcre: '3.0 – 3.5 kg/acre',
      spacing: '45 cm × 15 cm',
      seedTreatment: 'Chlorpyriphos 20 EC (4ml/kg) for shoot fly + Azospirillum (500g/acre seed)',
      npkSRecommendationKgPerAcre: 'N: 24 kg, P2O5: 16 kg, K2O: 12 kg (Basal application before sowing)',
      criticalIrrigationStages: ['Flag leaf emergence (45-50 DAS)', 'Flowering/Milking (65-75 DAS)'],
      majorPestsAndDiseases: [
        {
          name: 'Shoot Fly (Atherigona soccata)',
          symptoms: 'Dead heart in central seedling shoot within 30 days of sowing.',
          ipmControl: 'Timely sowing within October 1st week; use increased seed rate; install fishmeal traps (10/acre).'
        },
        {
          name: 'Charcoal Rot (Macrophomina phaseolina)',
          symptoms: 'Lodging of plants due to soft internal pith disintegration in drought conditions.',
          ipmControl: 'Maintain soil moisture conservation; use UASD tolerant variety CSV-29R.'
        }
      ]
    },
    riskRating: 'Low',
    primaryRisks: ['Shoot fly attack if sowing delayed past mid-October', 'Moisture depletion in shallow black soils', 'Bird damage at grain maturity'],
    kannadaRisks: ['ಅಕ್ಟೋಬರ್ ನಂತರ ತಡವಾಗಿ ಬಿತ್ತನೆ ಮಾಡಿದರೆ ಸುಳಿನೊಣದ ತೀವ್ರ ಹಾವಳಿ', 'ಹಕ್ಕಿಗಳ ಕಾಟ', 'ಹಿಂಗಾರು ಮಳೆ ಮುಗಿದ ನಂತರ ತೇವಾಂಶ ಕೊರತೆ']
  },
  {
    id: 'bengal_gram',
    name: 'Bengal Gram (Chickpea / Chana)',
    kannadaName: 'ಕಡಲೆ (ಚಣಂಗಿ)',
    botanicalName: 'Cicer arietinum',
    category: 'Pulse',
    kannadaCategory: 'ದ್ವಿದಳ ಧಾನ್ಯ ಬೆಳೆ',
    uasdVarieties: ['Annigeri-1 (A-1 - legendary Dharwad-Annigeri variety)', 'JG-11 (Wilt resistant)', 'BGD-103 (UASD release)', 'JAKI-9218', 'MNK-1 (Kabuli)'],
    durationDays: '95 - 105 days',
    season: 'Rabi',
    kannadaSeason: 'ಹಿಂಗಾರು (ರಬಿ)',
    suitableSoils: ['Deep to Medium Vertisols (Black cotton soil with preserved moisture)'],
    kannadaSoils: 'ಆಳವಾದ ಕಪ್ಪು ಮಣ್ಣು (ಎರೆಭೂಮಿ - ಉತ್ತಮ ತೇವಾಂಶ ಉಳಿಸಿಕೊಳ್ಳುವ ಭೂಮಿ)',
    irrigationRequirement: 'Low (Rainfed)',
    waterRequirementMm: '250 - 350 mm',
    mandiSource: 'AGMARKNET & e-NAM (Annigeri & Dharwad APMC)',
    mandiLocation: 'Annigeri Mandi (Dharwad district hub for pulses)',
    priceDate: 'October 2024 (Verified Official Session)',
    mspPriceInrPerQtl: 5440, // 2024-25 MSP
    mandiModalPriceInrPerQtl: 6250, // Consistently traded at premium over MSP
    mandiMinPriceInrPerQtl: 5900,
    mandiMaxPriceInrPerQtl: 6600,
    priceTrend: 'Bullish',
    isVerifiedMandi: true,
    rainfed: {
      averageYieldQtl: 7.2,
      yieldRange: [6, 9],
      grossIncomeInr: 45000, // 7.2 * 6250
      cultivationCostInr: 15200,
      netProfitInr: 29800,
      breakEvenPriceInrPerQtl: 2111,
      costBenefitRatio: 2.96,
      costBreakdown: {
        landPrep: 2600,
        seedCost: 2800,
        fertilizersAndFYM: 2800,
        plantProtection: 2200,
        laborAndWeeding: 2200,
        harvestingThreshing: 2000,
        transportMarketing: 600
      }
    },
    irrigated: {
      averageYieldQtl: 11.5,
      yieldRange: [9.5, 13.5],
      grossIncomeInr: 71875, // 11.5 * 6250
      cultivationCostInr: 21000,
      netProfitInr: 50875,
      breakEvenPriceInrPerQtl: 1826,
      costBenefitRatio: 3.42,
      costBreakdown: {
        landPrep: 2800,
        seedCost: 2800,
        fertilizersAndFYM: 4200,
        plantProtection: 3000,
        irrigationEnergy: 1600,
        laborAndWeeding: 3000,
        harvestingThreshing: 2600,
        transportMarketing: 1000
      }
    },
    agronomy: {
      sowingWindow: 'October 1 – October 31 (Ideal window in Vertisols)',
      seedRatePerAcre: '20 – 25 kg/acre (Desi) / 35-40 kg (Kabuli)',
      spacing: '30 cm × 10 cm',
      seedTreatment: 'Rhizobium ciceri + Trichoderma viride (4g/kg seed) to prevent Fusarium wilt',
      npkSRecommendationKgPerAcre: 'N: 10 kg, P2O5: 20 kg, K2O: 0 kg, Sulphur: 8 kg',
      criticalIrrigationStages: ['Branching/Pre-flowering (30-35 DAS)', 'Pod development (55-60 DAS - avoid during peak bloom)'],
      majorPestsAndDiseases: [
        {
          name: 'Gram Pod Borer (Helicoverpa armigera)',
          symptoms: 'Caterpillar bores head into pod while body remains outside; hollow empty pods.',
          ipmControl: 'Erect bird perches (10/acre); install 4 Pheromone traps/acre; spray NPV virus (250 LE/acre) or Chlorantraniliprole 18.5 SC (0.3ml/L).'
        },
        {
          name: 'Fusarium Wilt (Fusarium oxysporum f. sp. ciceris)',
          symptoms: 'Drooping petioles, dark brown internal vascular discoloration, sudden plant wilting.',
          ipmControl: 'Grow wilt-resistant JG-11 or Annigeri-1; seed treatment with Trichoderma.'
        }
      ]
    },
    riskRating: 'Low',
    primaryRisks: ['Pod borer attack during pod formation', 'Terminal heat stress in late January', 'Wilt in waterlogged spots'],
    kannadaRisks: ['ಕಾಯಿಕೊರೆಯುವ ಹುಳು (ಹೆಲಿಕೋವರ್ಪ) ಹಾನಿ', 'ಜನವರಿ ಕೊನೆಯಲ್ಲಿ ಅಕಾಲಿಕ ಬಿಸಿಲಿನ ತಾಪಮಾನ ಏರಿಕೆ', 'ತೇವಾಂಶ ಹೆಚ್ಚಾದ ಜಾಗದಲ್ಲಿ ಸೊರಗು ರೋಗ']
  },
  {
    id: 'groundnut',
    name: 'Groundnut (Peanut / Shenga)',
    kannadaName: 'ಶೇಂಗಾ / ಕಡಲೆಕಾಯಿ',
    botanicalName: 'Arachis hypogaea',
    category: 'Oilseed',
    kannadaCategory: 'ಎಣ್ಣೆಕಾಳು ಬೆಳೆ',
    uasdVarieties: ['GPBD-4 (UASD famous foliar disease resistant)', 'TMV-2', 'JL-24', 'Kadiri-6 (K-6)', 'G2-52'],
    durationDays: '105 - 115 days',
    season: 'Kharif',
    kannadaSeason: 'ಮುಂಗಾರು / ಬೇಸಿಗೆ',
    suitableSoils: ['Red Sandy Loam (Alfisols)', 'Light Sandy soils with good aeration for peg penetration'],
    kannadaSoils: 'ಕೆಂಪು ಮಸಾರಿ ಮಣ್ಣು, ನೀರು ಬಸಿದುಹೋಗುವ ಮರಳು ಮಿಶ್ರಿತ ಗೋಡು ಮಣ್ಣು',
    irrigationRequirement: 'Medium',
    waterRequirementMm: '450 - 550 mm',
    mandiSource: 'AGMARKNET (Hubballi & Annigeri APMC)',
    mandiLocation: 'Hubballi Mandi',
    priceDate: 'October 2024 (Verified Official Session)',
    mspPriceInrPerQtl: 6783, // 2024-25 MSP
    mandiModalPriceInrPerQtl: 6850,
    mandiMinPriceInrPerQtl: 6200,
    mandiMaxPriceInrPerQtl: 7300,
    priceTrend: 'Stable',
    isVerifiedMandi: true,
    rainfed: {
      averageYieldQtl: 7.8,
      yieldRange: [6.5, 9.5],
      grossIncomeInr: 53430, // 7.8 * 6850
      cultivationCostInr: 20400,
      netProfitInr: 33030,
      breakEvenPriceInrPerQtl: 2615,
      costBenefitRatio: 2.62,
      costBreakdown: {
        landPrep: 3200,
        seedCost: 5500, // High seed cost
        fertilizersAndFYM: 3800,
        plantProtection: 2100,
        laborAndWeeding: 3200,
        harvestingThreshing: 2000,
        transportMarketing: 600
      }
    },
    irrigated: {
      averageYieldQtl: 14.0,
      yieldRange: [12, 16.5],
      grossIncomeInr: 95900, // 14 * 6850
      cultivationCostInr: 29500,
      netProfitInr: 66400,
      breakEvenPriceInrPerQtl: 2107,
      costBenefitRatio: 3.25,
      costBreakdown: {
        landPrep: 3500,
        seedCost: 5500,
        fertilizersAndFYM: 5800,
        plantProtection: 2800,
        irrigationEnergy: 2800,
        laborAndWeeding: 4500,
        harvestingThreshing: 3600,
        transportMarketing: 1000
      }
    },
    agronomy: {
      sowingWindow: 'June 1 – July 10 (Kharif) / Jan 1 – Feb 15 (Summer irrigated)',
      seedRatePerAcre: '40 – 45 kg kernels/acre',
      spacing: '30 cm × 10 cm',
      seedTreatment: 'Rhizobium + PSB + Trichoderma viride (4g/kg) + Mancozeb (2g/kg)',
      npkSRecommendationKgPerAcre: 'N: 10 kg, P2O5: 20 kg, K2O: 10 kg, Gypsum: 200 kg/acre at 30-35 DAS (essential for pod filling and calcium)',
      criticalIrrigationStages: ['Flowering (25-30 DAS)', 'Peg penetration (40-45 DAS)', 'Pod development (65-75 DAS)'],
      majorPestsAndDiseases: [
        {
          name: 'Tikka Leaf Spot (Cercospora arachidicola) & Rust',
          symptoms: 'Dark brown to black necrotic spots with chlorotic halos causing premature defoliation.',
          ipmControl: 'Plant resistant UASD variety GPBD-4; spray Tebuconazole 25.9 EC (1ml/L) or Mancozeb.'
        },
        {
          name: 'Collar Rot & Crown Rot (Aspergillus niger)',
          symptoms: 'Black fungal spores at soil line collar region, seedling collapse.',
          ipmControl: 'Seed treatment with Trichoderma and seed dressing with Thiram.'
        }
      ]
    },
    riskRating: 'Medium',
    primaryRisks: ['Heavy initial seed investment cost', 'Wild boar and rodent damage at pod maturity', 'Aflatoxin contamination if dry spell precedes harvest'],
    kannadaRisks: ['ಬೀಜದ ಅತಿಯಾದ ಆರಂಭಿಕ ವೆಚ್ಚ', 'ಕಾಡುಹಂದಿ ಮತ್ತು ಇಲಿಗಳ ತೀವ್ರ ಕಾಟ', 'ಕೊಯ್ಲಿನ ಸಮಯದಲ್ಲಿ ಅತಿಯಾದ ಮಳೆಯಿಂದ ಕಾಯಿ ಮೊಳಕೆಯೊಡೆಯುವುದು']
  },
  {
    id: 'onion',
    name: 'Onion (Red Bellary)',
    kannadaName: 'ಈರುಳ್ಳಿ (ಕೆಂಪು ಬಳ್ಳಾರಿ)',
    botanicalName: 'Allium cepa',
    category: 'Vegetable',
    kannadaCategory: 'ತರಕಾರಿ ಬೆಳೆ',
    uasdVarieties: ['Bellary Red', 'Arka Kalyan (IIHR)', 'Bhima Super (DOGR)', 'Arka Niketan', 'UASD selections'],
    durationDays: '110 - 130 days',
    season: 'Kharif',
    kannadaSeason: 'ಮುಂಗಾರು (ಖಾರಿಫ್)',
    suitableSoils: ['Deep friable Red Loamy Soils', 'Medium well-drained Black Soils with no waterlogging'],
    kannadaSoils: 'ಪುಡಿಪುಡಿಯಾದ ಕೆಂಪು ಗೋಡು ಮಣ್ಣು, ನೀರು ನಿಲ್ಲದ ಮಧ್ಯಮ ಕಪ್ಪು ಮಣ್ಣು',
    irrigationRequirement: 'High (Assured Irrigated)',
    waterRequirementMm: '500 - 650 mm',
    mandiSource: 'AGMARKNET (Hubballi APMC Mandi)',
    mandiLocation: 'Hubballi Mandi (Major regional onion trading center)',
    priceDate: 'October 2024 (Verified Official Session)',
    mspPriceInrPerQtl: null, // No official MSP for onion
    mandiModalPriceInrPerQtl: 2450,
    mandiMinPriceInrPerQtl: 1500,
    mandiMaxPriceInrPerQtl: 3600,
    priceTrend: 'Volatile',
    isVerifiedMandi: true,
    rainfed: {
      averageYieldQtl: 55.0,
      yieldRange: [40, 70],
      grossIncomeInr: 134750, // 55 * 2450
      cultivationCostInr: 38000,
      netProfitInr: 96750,
      breakEvenPriceInrPerQtl: 691,
      costBenefitRatio: 3.55,
      costBreakdown: {
        landPrep: 4500,
        seedCost: 7500,
        fertilizersAndFYM: 7800,
        plantProtection: 4200,
        laborAndWeeding: 7500,
        harvestingThreshing: 4500,
        transportMarketing: 2000
      }
    },
    irrigated: {
      averageYieldQtl: 95.0,
      yieldRange: [80, 120],
      grossIncomeInr: 232750, // 95 * 2450
      cultivationCostInr: 54000,
      netProfitInr: 178750,
      breakEvenPriceInrPerQtl: 568,
      costBenefitRatio: 4.31,
      costBreakdown: {
        landPrep: 5000,
        seedCost: 7500,
        fertilizersAndFYM: 11000,
        plantProtection: 5500,
        irrigationEnergy: 4000,
        laborAndWeeding: 11000,
        harvestingThreshing: 7000,
        transportMarketing: 3000
      }
    },
    agronomy: {
      sowingWindow: 'Nursery in May-June; Transplanting July 1 – July 31',
      seedRatePerAcre: '3.5 – 4.0 kg seed/acre',
      spacing: '15 cm × 10 cm on raised beds',
      seedTreatment: 'Trichoderma viride (5g/kg) + Azotobacter seedling dip',
      npkSRecommendationKgPerAcre: 'N: 50 kg, P2O5: 25 kg, K2O: 40 kg, Sulphur: 15 kg (critical for pungency and storage life)',
      criticalIrrigationStages: ['Bulb initiation (40-45 DAT)', 'Bulb development (65-75 DAT)', 'Withhold irrigation 12 days before harvest'],
      majorPestsAndDiseases: [
        {
          name: 'Thrips (Thrips tabaci)',
          symptoms: 'Silvery white patches, leaf tip drying, stunted bulb formation.',
          ipmControl: 'Blue sticky traps (15/acre); spray Fipronil 5 SC (1.5ml/L) or Spinetoram.'
        },
        {
          name: 'Purple Blotch (Alternaria porri)',
          symptoms: 'Small water-soaked lesions turning purple with yellow margins on foliage.',
          ipmControl: 'Difenoconazole 25 EC (1ml/L) or Propiconazole.'
        }
      ]
    },
    riskRating: 'High',
    primaryRisks: ['Severe price swings ranging from ₹800 to ₹4000/qtl', 'Bulb rot during continuous monsoon rains', 'High labor requirement for weeding and grading'],
    kannadaRisks: ['ಮಾರುಕಟ್ಟೆಯಲ್ಲಿ ದಿಢೀರ್ ಬೆಲೆ ಕುಸಿತದ ಭೀತಿ (ಕ್ವಿಂಟಾಲ್‌ಗೆ ₹800 ರಿಂದ ₹4000 ವರೆಗೆ)', 'ಮಳೆಯಿಂದ ಗಡ್ಡೆ ಕೊಳೆಯುವ ರೋಗ', 'ಕಳೆ ಕೀಳಲು ಮತ್ತು ಆಯ್ದು ತುಂಬಲು ಅಧಿಕ ಕೂಲಿ ಖರ್ಚು']
  },
  {
    id: 'byadgi_chilli',
    name: 'Byadgi Chilli / Vegetables',
    kannadaName: 'ಬ್ಯಾಡಗಿ ಮೆಣಸಿನಕಾಯಿ / ತರಕಾರಿ',
    botanicalName: 'Capsicum annuum',
    category: 'Vegetable',
    kannadaCategory: 'ವಾಣಿಜ್ಯ ತರಕಾರಿ ಬೆಳೆ',
    uasdVarieties: ['Byadgi Dabbi (Deep red color, low pungency)', 'Byadgi Kaddi (Long, wrinkle-skinned)', 'Arka Harita', 'Sitara Gold'],
    durationDays: '160 - 200 days',
    season: 'Kharif',
    kannadaSeason: 'ಮುಂಗಾರು (ಖಾರಿಫ್)',
    suitableSoils: ['Medium Deep Black Soils (Vertisols)', 'Well-drained Red Loamy soils'],
    kannadaSoils: 'ಮಧ್ಯಮ ಕಪ್ಪು ಎರೆಮಣ್ಣು, ನೀರು ಸುಲಭವಾಗಿ ಬಸಿದುಹೋಗುವ ಕೆಂಪು ಗೋಡು ಮಣ್ಣು',
    irrigationRequirement: 'High (Assured Irrigated)',
    waterRequirementMm: '600 - 750 mm',
    mandiSource: 'Byadgi APMC / Hubballi Mandi',
    mandiLocation: 'Byadgi / Hubballi APMC (World renowned oleoresin market)',
    priceDate: 'October 2024 (Verified Official Session)',
    mspPriceInrPerQtl: null, // Market determined
    mandiModalPriceInrPerQtl: 31500, // Dry chilli modal price in Byadgi
    mandiMinPriceInrPerQtl: 24000,
    mandiMaxPriceInrPerQtl: 38500,
    priceTrend: 'Bullish',
    isVerifiedMandi: true,
    rainfed: {
      averageYieldQtl: 4.5, // dry chilli yield
      yieldRange: [3.5, 6],
      grossIncomeInr: 141750, // 4.5 * 31500
      cultivationCostInr: 36000,
      netProfitInr: 105750,
      breakEvenPriceInrPerQtl: 8000,
      costBenefitRatio: 3.94,
      costBreakdown: {
        landPrep: 4000,
        seedCost: 3500,
        fertilizersAndFYM: 6500,
        plantProtection: 6000,
        laborAndWeeding: 9500,
        harvestingThreshing: 5000,
        transportMarketing: 1500
      }
    },
    irrigated: {
      averageYieldQtl: 9.5,
      yieldRange: [8, 12],
      grossIncomeInr: 299250, // 9.5 * 31500
      cultivationCostInr: 62000,
      netProfitInr: 237250,
      breakEvenPriceInrPerQtl: 6526,
      costBenefitRatio: 4.83,
      costBreakdown: {
        landPrep: 4500,
        seedCost: 3500,
        fertilizersAndFYM: 11500,
        plantProtection: 10500,
        irrigationEnergy: 4500,
        laborAndWeeding: 16500, // Multiple manual picking rounds
        harvestingThreshing: 8500,
        transportMarketing: 2500
      }
    },
    agronomy: {
      sowingWindow: 'Nursery in May-June; Field transplanting July 1 – July 25',
      seedRatePerAcre: '400 – 500 g seed/acre (for nursery)',
      spacing: '75 cm × 45 cm or 90 cm × 60 cm (paired row under drip)',
      seedTreatment: 'Trichoderma viride (5g/kg) + Imidacloprid 70 WS (5g/kg)',
      npkSRecommendationKgPerAcre: 'N: 60 kg, P2O5: 30 kg, K2O: 30 kg, Zinc & Boron foliar sprays',
      criticalIrrigationStages: ['Vegetative establishment', 'Flowering & Fruit set', 'Fruit development (avoid dry cycles)'],
      majorPestsAndDiseases: [
        {
          name: 'Murda Complex / Leaf Curl (Thrips & Mites)',
          symptoms: 'Upward curling by thrips; downward inverted boat curling by yellow mites.',
          ipmControl: 'Diafenthiuron 50 WP (1g/L) or Spiromesifen 22.9 SC (1ml/L); install 15 blue sticky traps.'
        },
        {
          name: 'Anthracnose / Fruit Rot (Colletotrichum capsici)',
          symptoms: 'Sunken circular spots with concentric rings on ripe red pods.',
          ipmControl: 'Spray Azoxystrobin 23 SC (1ml/L) or Copper Oxychloride 50 WP (2.5g/L).'
        }
      ]
    },
    riskRating: 'High',
    primaryRisks: ['Sucking pest complex causing severe leaf curl', 'High manual labor costs for 4-5 picking cycles', 'Anthracnose fruit rot in wet conditions'],
    kannadaRisks: ['ಮುರಡ ರೋಗ (ನುಸಿ ಮತ್ತು ಹೇನುಗಳಿಂದ ಎಲೆ ಸುರುಟಿಕೊಳ್ಳುವುದು)', 'ಬೆಳೆ ಕೊಯ್ಲಿಗೆ ಅಧಿಕ ಕೂಲಿ ಕಾರ್ಮಿಕರ ಅಗತ್ಯತೆ', 'ಮಳೆಯಿಂದ ಹಣ್ಣು ಕಾಯಿ ಕೊಳೆ ರೋಗ']
  },
  {
    id: 'guava_horticulture',
    name: 'Guava (Taiwan Pink / L-49) & Horticulture',
    kannadaName: 'ಸೀಬೆಹಣ್ಣು (ತೈವಾನ್ ಪಿಂಕ್ / ಎಲ್-49) ಮತ್ತು ತೋಟಗಾರಿಕೆ',
    botanicalName: 'Psidium guajava',
    category: 'Horticulture',
    kannadaCategory: 'ತೋಟಗಾರಿಕೆ ಬೆಳೆ',
    uasdVarieties: ['Taiwan Pink (High market demand)', 'Lucknow-49 (Sardar - UASD recommended)', 'Arka Kiran (Pink pulp)', 'Allahabad Safeda'],
    durationDays: 'Perennial (Year 2+ Commercial harvest)',
    season: 'Annual / Multi-Year',
    kannadaSeason: 'ಬಹುವಾರ್ಷಿಕ ತೋಟ',
    suitableSoils: ['Red Sandy Loam (Alfisols)', 'Medium Black Soil with good drainage'],
    kannadaSoils: 'ಕೆಂಪು ಗೋಡು ಮಣ್ಣು, ನೀರು ಬಸಿದುಹೋಗುವ ಮಧ್ಯಮ ಕಪ್ಪು ಮಣ್ಣು',
    irrigationRequirement: 'Micro-Irrigation Preferred',
    waterRequirementMm: '600 - 800 mm/year (via Drip)',
    mandiSource: 'Hubballi Fruit Market / Bengaluru APMC',
    mandiLocation: 'Hubballi / APMC Wholesale',
    priceDate: 'October 2024 (Verified Official Session)',
    mspPriceInrPerQtl: null,
    mandiModalPriceInrPerQtl: 3200,
    mandiMinPriceInrPerQtl: 2400,
    mandiMaxPriceInrPerQtl: 4200,
    priceTrend: 'Stable',
    isVerifiedMandi: true,
    rainfed: {
      averageYieldQtl: 35.0, // Mature orchard rainfed with mulching
      yieldRange: [25, 45],
      grossIncomeInr: 112000, // 35 * 3200
      cultivationCostInr: 26000,
      netProfitInr: 86000,
      breakEvenPriceInrPerQtl: 743,
      costBenefitRatio: 4.31,
      costBreakdown: {
        landPrep: 2500,
        seedCost: 0, // After establishment
        fertilizersAndFYM: 8500,
        plantProtection: 4000,
        laborAndWeeding: 6000,
        harvestingThreshing: 3500,
        transportMarketing: 1500
      }
    },
    irrigated: {
      averageYieldQtl: 95.0, // High density planting (1000 trees/acre under drip)
      yieldRange: [80, 120],
      grossIncomeInr: 304000, // 95 * 3200
      cultivationCostInr: 48000,
      netProfitInr: 256000,
      breakEvenPriceInrPerQtl: 505,
      costBenefitRatio: 6.33,
      costBreakdown: {
        landPrep: 3000,
        seedCost: 0, // Amortized after Year 1
        fertilizersAndFYM: 14000,
        plantProtection: 7000,
        irrigationEnergy: 4500,
        laborAndWeeding: 11000,
        harvestingThreshing: 6000,
        transportMarketing: 2500
      }
    },
    agronomy: {
      sowingWindow: 'Planting in July – August (Monsoon onset)',
      seedRatePerAcre: '400 plants/acre (3m × 3m) or 800-1000 plants (Meadow orchard 2m × 1m)',
      spacing: '3 m × 3 m (Traditional) / 2 m × 1.5 m (High Density)',
      seedTreatment: 'Root dip in Trichoderma harzianum + Pseudomonas fluorescens',
      npkSRecommendationKgPerAcre: '250g N, 150g P2O5, 150g K2O per bearing tree/year + 25 kg FYM',
      criticalIrrigationStages: ['Bahar treatment termination', 'Fruit set', 'Fruit enlargement stage'],
      majorPestsAndDiseases: [
        {
          name: 'Fruit Fly (Bactrocera dorsalis)',
          symptoms: 'Maggots inside ripening fruit, puncture marks, premature fruit drop.',
          ipmControl: 'Install Methyl Eugenol pheromone traps (6/acre); foam netting/bagging of individual fruits.'
        },
        {
          name: 'Guava Wilt (Fusarium oxysporum f. sp. psidii)',
          symptoms: 'Yellowing of leaves, premature leaf drop, branch die-back.',
          ipmControl: 'Soil drenching with Carbendazim (1g/L) + bio-control Trichoderma in FYM.'
        }
      ]
    },
    riskRating: 'Medium',
    primaryRisks: ['Initial 1-2 year gestation investment before full commercial bearing', 'Fruit fly damage during rainy season crop', 'Perishable nature requiring quick cold-chain/transport'],
    kannadaRisks: ['ಆರಂಭಿಕ 1-2 ವರ್ಷ ಆದಾಯವಿಲ್ಲದ ಹಂತ', 'ಮಳೆಗಾಲದಲ್ಲಿ ಹಣ್ಣಿನ ನೊಣದ ಕಾಟ', 'ಹಣ್ಣು ಬೇಗ ಹಾಳಾಗುವುದರಿಂದ ತಕ್ಷಣ ಮಾರಾಟ ಮಾಡಬೇಕಾದ ಅನಿವಾರ್ಯತೆ']
  }
];

// Agro-Meteorological & Soil Baseline for Dharwad District
export const DHARWAD_AGRO_MET_PROFILE = {
  district: 'Dharwad (ಧಾರವಾಡ ಜಿಲ್ಲೆ)',
  headquarters: 'Dharwad / Hubballi Twin Cities',
  agroClimaticZones: [
    {
      zone: 'Zone 8 - Northern Transition Zone',
      taluks: ['Dharwad', 'Kalghatgi', 'Alnavar', 'Part of Hubballi'],
      rainfallRangeMm: '750 - 900 mm',
      characteristics: 'Transitional climate between Malnad hills and northern dry plains; reliable rainfall, highly diversified cropping system.'
    },
    {
      zone: 'Zone 3 - Northern Dry Zone',
      taluks: ['Navalgund', 'Kundgol', 'Annigeri'],
      rainfallRangeMm: '550 - 700 mm',
      characteristics: 'Deep black vertisols, semi-arid, high moisture deficit in summer, ideal for Rabi Bengal gram, Rabi Jowar, and Kharif cotton.'
    }
  ],
  annualNormalRainfallMm: 772,
  monsoonDistribution: {
    southwestMonsoonJuneToSept: '480 mm (62%)',
    northeastMonsoonOctToNov: '175 mm (23%)',
    preMonsoonSummerMarchToMay: '117 mm (15%)'
  },
  currentSeasonContext: {
    referenceMonth: 'October 2024 / Post-Monsoon Transition',
    status: 'Kharif harvesting in progress; Rabi sowing under optimal Vertisol residual moisture',
    soilMoistureStatus: 'Vertisols (Black Soil): 68% Available Water Capacity (Adequate for chickpea/rabi jowar); Alfisols (Red Soil): 38% (Depleting, requires irrigation)',
    temperatureRange: 'Min 18°C – Max 31°C'
  },
  soilTypes: [
    {
      id: 'vertisol',
      name: 'Deep Black Cotton Soil (Vertisols / Karisal)',
      kannadaName: 'ಆಳವಾದ ಕಪ್ಪು ಹತ್ತಿ ಮಣ್ಣು (ಎರೆಭೂಮಿ)',
      percentageOfDistrict: '62%',
      clayContent: '45% – 60% (Montmorillonite dominant)',
      depthCm: '90 – 180 cm',
      phRange: '7.6 – 8.4 (Slightly alkaline)',
      waterHoldingCapacity: 'Very High (200-240 mm/meter)',
      bestCrops: ['Bt Cotton', 'Bengal Gram', 'Rabi Jowar', 'Soybean', 'Wheat'],
      managementTip: 'Avoid deep tillage when wet (smearing risk). Deep summer ploughing creates granular mulch that seals residual moisture.'
    },
    {
      id: 'alfisol',
      name: 'Red Sandy Loam (Alfisols / Masari)',
      kannadaName: 'ಕೆಂಪು ಗೋಡು ಮಣ್ಣು (ಮಸಾರಿ ಭೂಮಿ)',
      percentageOfDistrict: '38%',
      clayContent: '15% – 25% (Kaolinite dominant)',
      depthCm: '45 – 90 cm',
      phRange: '6.2 – 7.1 (Slightly acidic to neutral)',
      waterHoldingCapacity: 'Low to Medium (90-120 mm/meter)',
      bestCrops: ['Groundnut', 'Maize', 'Onion', 'Guava', 'Mango', 'Chilli'],
      managementTip: 'Frequent light irrigations or drip mandatory. Incorporate 8-10 tons FYM/acre to boost water and nutrient retention.'
    }
  ]
};

// 3-Scenario Financial Stress Test (Top 5 Dharwad Crops)
export interface ScenarioModel {
  cropId: string;
  cropName: string;
  kannadaName: string;
  conservative: {
    yieldQtl: number;
    priceInr: number;
    grossIncome: number;
    netProfit: number;
    description: string;
  };
  normal: {
    yieldQtl: number;
    priceInr: number;
    grossIncome: number;
    netProfit: number;
    description: string;
  };
  favorable: {
    yieldQtl: number;
    priceInr: number;
    grossIncome: number;
    netProfit: number;
    description: string;
  };
}

export const DHARWAD_SCENARIOS: ScenarioModel[] = [
  {
    cropId: 'bengal_gram',
    cropName: 'Bengal Gram (Chickpea)',
    kannadaName: 'ಕಡಲೆ (ಚಣಂಗಿ)',
    conservative: {
      yieldQtl: 5.0,
      priceInr: 5440, // at MSP
      grossIncome: 27200,
      netProfit: 12000,
      description: 'Drought during pod set or terminal heat stress in Jan'
    },
    normal: {
      yieldQtl: 7.2,
      priceInr: 6250,
      grossIncome: 45000,
      netProfit: 29800,
      description: 'Timely October sowing, standard UASD Annigeri-1 package'
    },
    favorable: {
      yieldQtl: 10.5,
      priceInr: 6600,
      grossIncome: 69300,
      netProfit: 52100,
      description: 'One supplemental sprinkler irrigation + IPM pod borer control'
    }
  },
  {
    cropId: 'cotton',
    cropName: 'Bt Cotton',
    kannadaName: 'ಬಿಟಿ ಹತ್ತಿ',
    conservative: {
      yieldQtl: 5.5,
      priceInr: 6800,
      grossIncome: 37400,
      netProfit: 9900,
      description: 'Pink bollworm damage & rainfed dry spell'
    },
    normal: {
      yieldQtl: 7.5,
      priceInr: 7450,
      grossIncome: 55875,
      netProfit: 28375,
      description: 'Rainfed Vertisol with pheromone trap monitoring'
    },
    favorable: {
      yieldQtl: 14.5,
      priceInr: 7850,
      grossIncome: 113825,
      netProfit: 74325,
      description: 'Drip fertigation + 3 picks + peak festive market prices'
    }
  },
  {
    cropId: 'soybean',
    cropName: 'Soybean',
    kannadaName: 'ಸೋಯಾಬಿನ್',
    conservative: {
      yieldQtl: 6.0,
      priceInr: 4100,
      grossIncome: 24600,
      netProfit: 7800,
      description: 'Glut at harvest arrivals, rain disruption at harvest'
    },
    normal: {
      yieldQtl: 8.5,
      priceInr: 4480,
      grossIncome: 38080,
      netProfit: 21280,
      description: 'UASD DSb-21 variety, Kharif rainfall well distributed'
    },
    favorable: {
      yieldQtl: 12.0,
      priceInr: 4892, // At MSP or higher
      grossIncome: 58704,
      netProfit: 37204,
      description: 'Protective irrigation, zero rust incidence'
    }
  },
  {
    cropId: 'jowar',
    cropName: 'Rabi Jowar (Maldandi)',
    kannadaName: 'ಹಿಂಗಾರು ಬಿಳಿಜೋಳ (ಮಾಲ್ದಂಡಿ)',
    conservative: {
      yieldQtl: 6.5,
      priceInr: 3800,
      grossIncome: 29700, // Includes 5000 fodder
      netProfit: 15200,
      description: 'Late October sowing, shoot fly incidence'
    },
    normal: {
      yieldQtl: 9.0,
      priceInr: 4400,
      grossIncome: 45600, // Includes 6000 fodder
      netProfit: 31100,
      description: 'Optimal September 25 sowing, M-35-1 high grain lustre'
    },
    favorable: {
      yieldQtl: 14.0,
      priceInr: 5100,
      grossIncome: 79400, // Includes 8000 fodder
      netProfit: 59400,
      description: 'Deep Vertisol with 1 protective irrigation at flag leaf'
    }
  },
  {
    cropId: 'byadgi_chilli',
    cropName: 'Byadgi Chilli',
    kannadaName: 'ಬ್ಯಾಡಗಿ ಮೆಣಸಿನಕಾಯಿ',
    conservative: {
      yieldQtl: 3.5,
      priceInr: 24000,
      grossIncome: 84000,
      netProfit: 48000,
      description: 'Moderate murda complex / mite damage'
    },
    normal: {
      yieldQtl: 4.5,
      priceInr: 31500,
      grossIncome: 141750,
      netProfit: 105750,
      description: 'Dabbi variety with high ASTA color value'
    },
    favorable: {
      yieldQtl: 9.5,
      priceInr: 37000,
      grossIncome: 351500,
      netProfit: 289500,
      description: 'Drip fertigated, intensive IPM, premium export grade'
    }
  }
];

// Crop Calendar for Dharwad District (Gantt representation)
export interface CalendarCrop {
  name: string;
  kannadaName: string;
  season: string;
  sowingMonths: string[];
  growthMonths: string[];
  harvestMonths: string[];
  criticalActivities: string;
}

export interface CalendarCrop {
  id: string;
  name: string;
  kannadaName: string;
  season: string;
  durationDays: string;
  sowingMonths: string[];
  exactSowingDates: string;
  kannadaSowingDates: string;
  harvestMonths: string[];
  exactHarvestDates: string;
  kannadaHarvestDates: string;
  growthMonths: string[];
  maturitySigns: string;
  kannadaMaturitySigns: string;
  harvestMethod: string;
  kannadaHarvestMethod: string;
  growthStages: {
    stage: string;
    kannadaStage: string;
    das: string;
    description: string;
  }[];
  criticalActivities: string;
}

export interface DoubleCroppingSystem {
  id: string;
  titleEn: string;
  titleKn: string;
  soilSuitabilityEn: string;
  soilSuitabilityKn: string;
  kharif: {
    cropEn: string;
    cropKn: string;
    sowWindow: string;
    harvestWindow: string;
  };
  rabi: {
    cropEn: string;
    cropKn: string;
    sowWindow: string;
    harvestWindow: string;
  };
  netIncomeEstimate: string;
  rationaleEn: string;
  rationaleKn: string;
}

export const DHARWAD_DOUBLE_CROPPING_SYSTEMS: DoubleCroppingSystem[] = [
  {
    id: 'soybean_chickpea',
    titleEn: 'Kharif Soybean ➔ Rabi Bengal Gram (Chickpea)',
    titleKn: 'ಮುಂಗಾರು ಸೋಯಾಬಿನ್ ➔ ಹಿಂಗಾರು ಕಡಲೆ (ಅತ್ಯಂತ ಲಾಭದಾಯಕ)',
    soilSuitabilityEn: 'Deep Vertisols (Black cotton soil with high moisture retention)',
    soilSuitabilityKn: 'ಆಳವಾದ ಕಪ್ಪು ಎರೆಮಣ್ಣು (ಹೆಚ್ಚು ತೇವಾಂಶ ಉಳಿಸಿಕೊಳ್ಳುವ ಭೂಮಿ)',
    kharif: {
      cropEn: 'Soybean (DSb-21 / JS-335)',
      cropKn: 'ಸೋಯಾಬಿನ್ (DSb-21 / JS-335)',
      sowWindow: 'June 15 – July 5',
      harvestWindow: 'September 20 – October 5'
    },
    rabi: {
      cropEn: 'Bengal Gram (Annigeri-1 / JG-11)',
      cropKn: 'ಕಡಲೆ (ಅಣ್ಣಿಗೇರಿ-1 / ಜೆಜಿ-11)',
      sowWindow: 'October 10 – October 31',
      harvestWindow: 'January 20 – February 10'
    },
    netIncomeEstimate: '₹51,080 / acre (Combined Net Profit)',
    rationaleEn: 'Dharwad district’s benchmark double-cropping rotation. Soybean vacates the field in early October, allowing timely Bengal Gram seeding into preserved Vertisol residual moisture with zero fallow loss.',
    rationaleKn: 'ಧಾರವಾಡ ಜಿಲ್ಲೆಯ ಅತಿ ಯಶಸ್ವಿ ದ್ವಿ-ಬೆಳೆ ಪದ್ಧತಿ. ಸೆಪ್ಟೆಂಬರ್ ಅಂತ್ಯದಲ್ಲಿ ಸೋಯಾಬಿನ್ ಕಟಾವು ಮುಗಿದ ಕೂಡಲೇ ಅಕ್ಟೋಬರ್‌ನಲ್ಲಿ ಎರೆಮಣ್ಣಿನ ತೇವಾಂಶದಲ್ಲಿ ಕಡಲೆ ಬಿತ್ತನೆ ಮಾಡಬಹುದು.'
  },
  {
    id: 'greengram_rabi_jowar',
    titleEn: 'Kharif Pulses (Green/Black Gram) ➔ Rabi Maldandi Jowar',
    titleKn: 'ಮುಂಗಾರು ಹೆಸರು/ಉದ್ದು ➔ ಹಿಂಗಾರು ಮಾಲ್ದಂಡಿ ಬಿಳಿಜೋಳ',
    soilSuitabilityEn: 'Medium to Deep Vertisols',
    soilSuitabilityKn: 'ಮಧ್ಯಮದಿಂದ ಆಳವಾದ ಕಪ್ಪು ಮಣ್ಣು',
    kharif: {
      cropEn: 'Green Gram / Mung (DGGV-2)',
      cropKn: 'ಹೆಸರು ಕಾಳು (DGGV-2)',
      sowWindow: 'June 1 – June 20',
      harvestWindow: 'August 15 – August 30'
    },
    rabi: {
      cropEn: 'Maldandi Jowar (M-35-1 / DSV-4)',
      cropKn: 'ಮಾಲ್ದಂಡಿ ಜೋಳ (M-35-1)',
      sowWindow: 'September 20 – October 10',
      harvestWindow: 'January 15 – February 10'
    },
    netIncomeEstimate: '₹46,500 / acre + 2.5t Nutritious Fodder',
    rationaleEn: 'Green gram enriches soil organic nitrogen and vacates in August, allowing perfect land preparation and pre-monsoon weed eradication prior to September Maldandi Jowar sowing.',
    rationaleKn: 'ಹೆಸರು ಬೆಳೆ ಆಗಸ್ಟ್‌ನಲ್ಲಿ ಕಟಾವಾಗುವುದರಿಂದ ಭೂಮಿಗೆ ಸಾರಜನಕ ಸೇರ್ಪಡೆಯಾಗಿ, ಸೆಪ್ಟೆಂಬರ್‌ನಲ್ಲಿ ಬಿಳಿಜೋಳ ಬಿತ್ತಲು ಅತ್ಯುತ್ತಮ ಹದ ಸಿಗುತ್ತದೆ.'
  },
  {
    id: 'kharif_onion_rabi_gram_wheat',
    titleEn: 'Kharif Onion ➔ Late Rabi Chickpea / Durum Wheat',
    titleKn: 'ಮುಂಗಾರು ಈರುಳ್ಳಿ ➔ ಹಿಂಗಾರು ಕಡಲೆ / ಗೋಧಿ',
    soilSuitabilityEn: 'Well-drained Medium Black Soil & Friable Red Loam',
    soilSuitabilityKn: 'ನೀರು ಬಸಿದುಹೋಗುವ ಮಧ್ಯಮ ಕಪ್ಪು ಮತ್ತು ಕೆಂಪು ಗೋಡು ಮಣ್ಣು',
    kharif: {
      cropEn: 'Red Onion (Bellary Red / Arka Kalyan)',
      cropKn: 'ಕೆಂಪು ಈರುಳ್ಳಿ (ಬಳ್ಳಾರಿ ರೆಡ್)',
      sowWindow: 'Nursery May; Transplanting July 1 – 20',
      harvestWindow: 'October 15 – November 5'
    },
    rabi: {
      cropEn: 'Chickpea or Durum Wheat (UASD DWR-1006)',
      cropKn: 'ಕಡಲೆ ಅಥವಾ ಗಟ್ಟಿ ಗೋಧಿ (DWR-1006)',
      sowWindow: 'November 10 – November 25',
      harvestWindow: 'February 20 – March 10'
    },
    netIncomeEstimate: '₹1,26,000 / acre (High Value Commercial)',
    rationaleEn: 'Early kharif onion provides fast cash flow in October-November, followed immediately by irrigated chickpea or UAS Dharwad Durum wheat with residual nutrition.',
    rationaleKn: 'ಅಕ್ಟೋಬರ್‌ನಲ್ಲಿ ಈರುಳ್ಳಿ ಮಾರಾಟದಿಂದ ತಕ್ಷಣ ನಗದು ಹಣ ಸಿಗುತ್ತದೆ. ನಂತರ ನವೆಂಬರ್‌ನಲ್ಲಿ ನೀರಾವರಿ ಆಸರೆಯಲ್ಲಿ ಕಡಲೆ ಅಥವಾ ಗೋಧಿ ಬೆಳೆಯಬಹುದು.'
  }
];

export const DHARWAD_CROP_CALENDAR: CalendarCrop[] = [
  {
    id: 'cotton',
    name: 'Cotton (Bt Hybrid)',
    kannadaName: 'ಹತ್ತಿ (ಬಿಟಿ ಹೈಬ್ರಿಡ್)',
    season: 'Kharif',
    durationDays: '150 - 180 days',
    sowingMonths: ['June', 'July'],
    exactSowingDates: 'June 15 – July 15 (After receiving 60-75mm cumulative monsoon showers)',
    kannadaSowingDates: 'ಜೂನ್ 15 ರಿಂದ ಜುಲೈ 15 (60-75 ಮಿ.ಮೀ ಮುಂಗಾರು ಮಳೆಯ ನಂತರ)',
    harvestMonths: ['December', 'January', 'February'],
    exactHarvestDates: 'Dec 15 – Feb 20 (Harvested in 3 to 4 picking rounds at 20-day intervals)',
    kannadaHarvestDates: 'ಡಿಸೆಂಬರ್ 15 ರಿಂದ ಫೆಬ್ರವರಿ 20 (20 ದಿನಗಳ ಅಂತರದಲ್ಲಿ 3 ರಿಂದ 4 ಬಿಡಿಸುವ ಹಂತಗಳು)',
    growthMonths: ['August', 'September', 'October', 'November'],
    maturitySigns: 'Bolls burst open fully exposing fluffy, dry white lint; leaves turn reddish-brown and begin to drop; bracts turn brittle and brown.',
    kannadaMaturitySigns: 'ಕಾಯಿಗಳು ಪೂರ್ಣವಾಗಿ ಸಿಡಿದು ಬೆಳ್ಳಗಿನ ಹತ್ತಿ ಹೊರಬರುವುದು; ಎಲೆಗಳು ಕೆಂಪಾಗಿ ಉದುರಲು ಪ್ರಾರಂಭಿಸುವುದು; ಒಣಗಿದ ಬ್ರ್ಯಾಕ್ಟ್‌ಗಳು ಕಂದು ಬಣ್ಣಕ್ಕೆ ತಿರುಗುವುದು.',
    harvestMethod: 'Pick clean cotton in the morning after dew evaporates (9 AM to 4 PM). Store in clean jute bags away from polypropylene contamination.',
    kannadaHarvestMethod: 'ಬೆಳಗಿನ ಇಬ್ಬನಿ ಆವಿಯಾದ ನಂತರ (ಬೆಳಗ್ಗೆ 9 ರಿಂದ ಸಂಜೆ 4 ರವರೆಗೆ) ಕಸ-ಕಡ್ಡಿ ಇಲ್ಲದೆ ಬಿಡಿಸಿ, ಪ್ಲಾಸ್ಟಿಕ್ ರಹಿತ ಶುದ್ಧ ಗೋಣಿ ಚೀಲಗಳಲ್ಲಿ ಶೇಖರಿಸಬೇಕು.',
    growthStages: [
      { stage: 'Germination & Emergence', kannadaStage: 'ಮೊಳಕೆ ಮತ್ತು ಹೊರಬರುವಿಕೆ', das: '0 - 10 DAS', description: 'Radicle emerges; cotyledonary leaves expand.' },
      { stage: 'Vegetative & Squaring', kannadaStage: 'ಕವಲೊಡೆಯುವಿಕೆ & ಚೌಕಾಕಾರದ ಮೊಗ್ಗು', das: '35 - 55 DAS', description: 'Sympodial fruiting branches form; first squares appear.' },
      { stage: 'Peak Flowering & Boll Setting', kannadaStage: 'ಪೂರ್ಣ ಹೂವಾಡುವಿಕೆ & ಕಾಯಿ ಕಟ್ಟುವುದು', das: '65 - 90 DAS', description: 'Cream-yellow flowers turn pink after pollination; young bolls develop.' },
      { stage: 'Boll Maturation & Bursting', kannadaStage: 'ಕಾಯಿ ಮಾಗುವಿಕೆ & ಹತ್ತಿ ಸಿಡಿಯುವುದು', das: '110 - 145 DAS', description: 'Boll walls dehydrate and burst; fiber reaches full length and micronaire.' },
      { stage: '1st & Subsequent Pickings', kannadaStage: 'ಮೊದಲ ಮತ್ತು ಮುಂದಿನ ಕಟಾವು (ಬಿಡಿಸುವಿಕೆ)', das: '140 - 180 DAS', description: 'Main pickings round 1, round 2, and final gleaning.' }
    ],
    criticalActivities: 'Pheromone trap setup at 45 DAS; 1st picking at 130-140 DAS; final pick Jan-Feb.'
  },
  {
    id: 'soybean',
    name: 'Soybean',
    kannadaName: 'ಸೋಯಾಬಿನ್',
    season: 'Kharif',
    durationDays: '90 - 98 days',
    sowingMonths: ['June', 'July'],
    exactSowingDates: 'June 15 – July 10 (Avoid planting after July 20 to prevent stem fly)',
    kannadaSowingDates: 'ಜೂನ್ 15 ರಿಂದ ಜುಲೈ 10 (ಸುಳಿನೊಣ ತಡೆಯಲು ಜುಲೈ 20 ರ ನಂತರ ಬಿತ್ತನೆ ಮಾಡಬೇಡಿ)',
    harvestMonths: ['September', 'October'],
    exactHarvestDates: 'September 20 – October 10',
    kannadaHarvestDates: 'ಸೆಪ್ಟೆಂಬರ್ 20 ರಿಂದ ಅಕ್ಟೋಬರ್ 10',
    growthMonths: ['July', 'August', 'September'],
    maturitySigns: 'Over 90% of foliage turns yellow and falls off; pods turn golden-straw brown; seeds detach and rattle when shaken.',
    kannadaMaturitySigns: 'ಶೇ.90 ಕ್ಕಿಂತ ಹೆಚ್ಚು ಎಲೆಗಳು ಹಳದಿಯಾಗಿ ಉದುರುವುದು; ಕಾಯಿಗಳು ಹಳದಿ-ಕಂದು ಬಣ್ಣಕ್ಕೆ ತಿರುಗುವುದು; ಕಾಯಿಯನ್ನು ಅಲುಗಾಡಿಸಿದಾಗ ಕಾಳು ಸದ್ದು ಮಾಡುವುದು.',
    harvestMethod: 'Harvest immediately at 14-16% moisture to avoid catastrophic pod shattering. Thresh at 400-500 rpm drum speed to avoid seed coat cracking.',
    kannadaHarvestMethod: 'ಕಾಳು ಸಿಡಿಯುವುದನ್ನು ತಡೆಯಲು ತಕ್ಷಣ ಕಟಾವು ಮಾಡಬೇಕು. ಬೀಜದ ಮೇಲ್ಮೈ ಬಿರುಕು ಬಿಡದಂತೆ ಕಡಿಮೆ ವೇಗದಲ್ಲಿ ಒಕ್ಕಣೆ ಮಾಡಬೇಕು.',
    growthStages: [
      { stage: 'Seedling Emergence', kannadaStage: 'ಮೊಳಕೆ ಮತ್ತು ಸಸಿ ಹಂತ', das: '0 - 8 DAS', description: 'Cotyledons emerge; first unifoliate leaves unroll.' },
      { stage: 'Trifoliate Vegetative', kannadaStage: 'ಕವಲೊಡೆದು ಎಲೆ ಬಿಡುವ ಹಂತ', das: '15 - 30 DAS', description: 'Vigorously branches; nodules develop on roots fixing nitrogen.' },
      { stage: 'Flowering Stage (R1-R2)', kannadaStage: 'ಹೂವು ಅರಳುವ ಹಂತ', das: '35 - 48 DAS', description: 'Purple/white small flowers appear at nodes; sensitive to moisture stress.' },
      { stage: 'Pod Development (R3-R5)', kannadaStage: 'ಕಾಯಿ ಕಟ್ಟುವ ಮತ್ತು ಕಾಳು ತುಂಬುವ ಹಂತ', das: '50 - 75 DAS', description: 'Pods elongate; green seeds swell to fill cavity.' },
      { stage: 'Physiological Maturity & Harvest', kannadaStage: 'ಮಾಗುವಿಕೆ ಮತ್ತು ಕಟಾವು', das: '88 - 98 DAS', description: 'Leaves drop; pods dry to golden brown; ready for combine/sickle.' }
    ],
    criticalActivities: 'Weed control within 20 DAS; harvest when 90% leaves turn yellow and drop.'
  },
  {
    id: 'maize',
    name: 'Maize (Hybrid Corn)',
    kannadaName: 'ಮೆಕ್ಕೆಜೋಳ (ಹೈಬ್ರಿಡ್)',
    season: 'Kharif / Rabi',
    durationDays: '105 - 120 days',
    sowingMonths: ['June', 'July', 'October'],
    exactSowingDates: 'Kharif: June 1 – July 15 | Rabi: October 1 – November 15',
    kannadaSowingDates: 'ಮುಂಗಾರು: ಜೂನ್ 1 ರಿಂದ ಜುಲೈ 15 | ಹಿಂಗಾರು: ಅಕ್ಟೋಬರ್ 1 ರಿಂದ ನವೆಂಬರ್ 15',
    harvestMonths: ['September', 'October', 'January'],
    exactHarvestDates: 'Kharif Harvest: Sept 25 – Oct 25 | Rabi Harvest: Jan 15 – Feb 15',
    kannadaHarvestDates: 'ಮುಂಗಾರು ಕಟಾವು: ಸೆಪ್ಟೆಂ 25 ರಿಂದ ಅಕ್ಟೋ 25 | ಹಿಂಗಾರು: ಜನವರಿ 15 ರಿಂದ ಫೆಬ್ರವರಿ 15',
    growthMonths: ['July', 'August', 'September', 'November', 'December'],
    maturitySigns: 'Husk leaves dry and turn papery white; silk turns dark brown; black abscission layer forms at base of grain tip; grain moisture reaches ~20%.',
    kannadaMaturitySigns: 'ತೆನೆಯ ಸಿಪ್ಪೆಯು ಒಣಗಿ ಬಿಳಿಯ ಪೇಪರ್‌ನಂತೆ ಆಗುವುದು; ರೇಷ್ಮೆ ಕಪ್ಪು-ಕಂದು ಬಣ್ಣಕ್ಕೆ ತಿರುಗುವುದು; ಕಾಳಿನ ಬುಡದಲ್ಲಿ ಕಪ್ಪು ಪದರ (Black layer) ಮೂಡುವುದು.',
    harvestMethod: 'De-husk cobs and dry on sun-lit drying yard until moisture drops below 12% before mechanical threshing to prevent aflatoxin mold.',
    kannadaHarvestMethod: 'ತೆನೆಗಳನ್ನು ಸುಲಿದು ಬಿಸಿಲಿನಲ್ಲಿ ಒಣಗಿಸಿ, ತೇವಾಂಶ ಶೇ.12 ಕ್ಕಿಂತ ಕಡಿಮೆಯಾದ ನಂತರ ಯಂತ್ರದಿಂದ ಕಾಳು ಬೇರ್ಪಡಿಸಬೇಕು.',
    growthStages: [
      { stage: 'Emergence & Knee-High (V6)', kannadaStage: 'ಮೊಳಕೆ ಮತ್ತು ಮೊಣಕಾಲುದ್ದದ ಬೆಳವಣಿಗೆ', das: '0 - 30 DAS', description: 'Rapid stalk elongation; critical for Fall Armyworm inspection.' },
      { stage: 'Tasseling (VT) & Silking (R1)', kannadaStage: 'ಚಂಡು (Tassel) ಮತ್ತು ರೇಷ್ಮೆ ಮೂಡುವ ಹಂತ', das: '50 - 62 DAS', description: 'Pollen shedding and silks emergence; utmost critical irrigation window.' },
      { stage: 'Milking & Dough Stage (R3-R4)', kannadaStage: 'ಹಾಲು ಮತ್ತು ಗಟ್ಟಿ ಕಾಳು ಹಂತ', das: '65 - 85 DAS', description: 'Kernel starch accumulation; cob weight gains peak.' },
      { stage: 'Black Layer & Harvest (R6)', kannadaStage: 'ಕಪ್ಪು ಪದರ ಮತ್ತು ಪೂರ್ಣ ಕಟಾವು', das: '105 - 120 DAS', description: 'Physiological maturity signaled by black hilar layer; cob harvest.' }
    ],
    criticalActivities: 'Fall Armyworm whorl check at 15 and 30 DAS; cob harvest at black layer formation.'
  },
  {
    id: 'jowar',
    name: 'Rabi Jowar (Maldandi / Bili Jola)',
    kannadaName: 'ಹಿಂಗಾರು ಬಿಳಿಜೋಳ (ಮಾಲ್ದಂಡಿ)',
    season: 'Rabi',
    durationDays: '115 - 125 days',
    sowingMonths: ['September', 'October'],
    exactSowingDates: 'September 15 – October 10 (Optimal window in Vertisols before residual moisture drops)',
    kannadaSowingDates: 'ಸೆಪ್ಟೆಂಬರ್ 15 ರಿಂದ ಅಕ್ಟೋಬರ್ 10 (ತೇವಾಂಶ ಆವಿಯಾಗುವ ಮುನ್ನ ಎರೆಭೂಮಿಯ ಅತ್ಯುತ್ತಮ ಕಾಲ)',
    harvestMonths: ['January', 'February'],
    exactHarvestDates: 'January 20 – February 15',
    kannadaHarvestDates: 'ಜನವರಿ 20 ರಿಂದ ಫೆಬ್ರವರಿ 15',
    growthMonths: ['October', 'November', 'December'],
    maturitySigns: 'Grains become firm and flinty with pearly white luster; black dot forms at attachment point; flag leaves turn dry yellow.',
    kannadaMaturitySigns: 'ಕಾಳುಗಳು ಗಟ್ಟಿಯಾಗಿ ಮುತ್ತಿನಂಥ ಬಿಳಿ ಹೊಳಪು ಪಡೆಯುವುದು; ಕಾಳಿನ ಹಿಂಭಾಗದಲ್ಲಿ ಕಪ್ಪು ಚುಕ್ಕೆ ಮೂಡುವುದು; ತೆನೆಯ ಕೆಳಗಿನ ಎಲೆಗಳು ಒಣಗುವುದು.',
    harvestMethod: 'Cut earheads with sickles; cut stalks close to ground for livestock stover. Sun-dry earheads for 3-5 days before tractor thresher.',
    kannadaHarvestMethod: 'ತೆನೆಗಳನ್ನು ಕೊಯ್ದು ಪ್ರತ್ಯೇಕಿಸಿ, ದಂಟುಗಳನ್ನು (ಕಡ್ಡಿ) ಜಾನುವಾರುಗಳ ಮೇವಿಗಾಗಿ ನೆಲಮಟ್ಟಕ್ಕೆ ಕತ್ತರಿಸಬೇಕು. ತೆನೆಗಳನ್ನು 4 ದಿನ ಒಣಗಿಸಿ ಒಕ್ಕಣೆ ಮಾಡಬೇಕು.',
    growthStages: [
      { stage: 'Seedling & Whorl (Shoot Fly window)', kannadaStage: 'ಸಸಿ ಹಂತ (ಸುಳಿನೊಣ ಬಾಧೆಯ ಕಾಲ)', das: '0 - 25 DAS', description: 'Vulnerable to Atherigona soccata; fishmeal traps effective.' },
      { stage: 'Flag Leaf Emergence (Boot stage)', kannadaStage: 'ಗರಿ ಮೂಡುವ ಹಂತ (Boot stage)', das: '45 - 55 DAS', description: 'Panicle expands inside flag leaf sheath; terminal drought sensitive.' },
      { stage: 'Flowering & Grain Setting', kannadaStage: 'ಹೂವಾಡುವಿಕೆ ಮತ್ತು ಕಾಳು ಕಟ್ಟುವುದು', das: '60 - 75 DAS', description: 'Yellow anthers shed pollen down the panicle from top to bottom.' },
      { stage: 'Hard Dough & Maturation', kannadaStage: 'ಗಟ್ಟಿ ಕಾಳು ಮತ್ತು ಕೊಯ್ಲು ಹಂತ', das: '90 - 120 DAS', description: 'Starch fills completely; famous Maldandi sweet taste consolidates.' }
    ],
    criticalActivities: 'Fishmeal trap for shoot fly; protect grain heads from birds; stover sun-curing.'
  },
  {
    id: 'bengal_gram',
    name: 'Bengal Gram (Chickpea / Chana)',
    kannadaName: 'ಕಡಲೆ (ಚಣಂಗಿ)',
    season: 'Rabi',
    durationDays: '95 - 105 days',
    sowingMonths: ['October'],
    exactSowingDates: 'October 1 – October 31 (Strictly before temperature drops and soil surface dries)',
    kannadaSowingDates: 'ಅಕ್ಟೋಬರ್ 1 ರಿಂದ ಅಕ್ಟೋಬರ್ 31 (ನೆಲ ಒಣಗುವ ಮುನ್ನ ಮತ್ತು ಚಳಿ ಪ್ರಾರಂಭವಾಗುವ ಮುನ್ನ)',
    harvestMonths: ['January', 'February'],
    exactHarvestDates: 'January 15 – February 10',
    kannadaHarvestDates: 'ಜನವರಿ 15 ರಿಂದ ಫೆಬ್ರವರಿ 10',
    growthMonths: ['November', 'December'],
    maturitySigns: 'Leaves and stems turn light yellowish-brown to straw-dry; pods become crisp and dry; seeds loose inside pod and rattle.',
    kannadaMaturitySigns: 'ಗಿಡದ ಎಲೆ ಮತ್ತು ಕಾಂಡ ಹಳದಿ-ಕಂದು ಬಣ್ಣಕ್ಕೆ ತಿರುಗಿ ಒಣಗುವುದು; ಕಾಯಿಗಳು ಗರಿಗರಿಯಾಗಿ ಒಣಗಿ, ಅಲುಗಾಡಿಸಿದಾಗ ಕಾಳುಗಳು ಒಳಗೆ ಸದ್ದು ಮಾಡುವುದು.',
    harvestMethod: 'Pull or cut plants in early morning when dew prevents pod shattering. Pile in field threshing yard for 2 days sun-drying before threshing.',
    kannadaHarvestMethod: 'ಕಾಯಿ ಸಿಡಿದು ಕಾಳು ಚೆಲ್ಲುವುದನ್ನು ತಪ್ಪಿಸಲು ಮುಂಜಾನೆ ಸಮಯದಲ್ಲಿ ಗಿಡಗಳನ್ನು ಬುಡಸಮೇತ ಕೀಳಬೇಕು ಅಥವಾ ಕುಡುಗೋಲಿನಿಂದ ಕೊಯ್ಯಬೇಕು.',
    growthStages: [
      { stage: 'Emergence & Nodulation', kannadaStage: 'ಮೊಳಕೆ ಮತ್ತು ಬೇರಿನ ಗಂಟುಗಳು', das: '0 - 20 DAS', description: 'Rhizobium nodules form on taproots fixing atmospheric nitrogen.' },
      { stage: 'Branching & Canopy closure', kannadaStage: 'ಕವಲೊಡೆದು ಹರಡುವ ಹಂತ', das: '25 - 40 DAS', description: 'Secondary and tertiary branches spread; secretes malic/oxalic acid.' },
      { stage: 'Flowering & Pod Formation', kannadaStage: 'ಹೂವು ಮತ್ತು ಕಾಯಿ ಕಟ್ಟುವುದು', das: '45 - 65 DAS', description: 'Pink or white flowers open; critical time for Helicoverpa IPM.' },
      { stage: 'Pod Filling & Senescence', kannadaStage: 'ಕಾಳು ತುಂಬುವಿಕೆ ಮತ್ತು ಕಟಾವು', das: '75 - 105 DAS', description: 'Green pods turn golden; moisture drops to 10-12% for safe harvest.' }
    ],
    criticalActivities: 'Rhizobium seed coating; bird perches installation; harvest before pods shatter.'
  },
  {
    id: 'groundnut',
    name: 'Groundnut (Shenga / Peanut)',
    kannadaName: 'ಶೇಂಗಾ / ಕಡಲೆಕಾಯಿ',
    season: 'Kharif / Summer',
    durationDays: '105 - 115 days',
    sowingMonths: ['June', 'July', 'January'],
    exactSowingDates: 'Kharif: June 10 – July 10 | Summer Irrigated: January 1 – February 10',
    kannadaSowingDates: 'ಮುಂಗಾರು: ಜೂನ್ 10 ರಿಂದ ಜುಲೈ 10 | ಬೇಸಿಗೆ ನೀರಾವರಿ: ಜನವರಿ 1 ರಿಂದ ಫೆಬ್ರವರಿ 10',
    harvestMonths: ['October', 'April'],
    exactHarvestDates: 'Kharif: Oct 10 – Nov 5 | Summer: April 15 – May 10',
    kannadaHarvestDates: 'ಮುಂಗಾರು: ಅಕ್ಟೋಬರ್ 10 ರಿಂದ ನವೆಂಬರ್ 5 | ಬೇಸಿಗೆ: ಏಪ್ರಿಲ್ 15 ರಿಂದ ಮೇ 10',
    growthMonths: ['July', 'August', 'September', 'February', 'March'],
    maturitySigns: 'Vines turn yellow and begin defoliating; pull 5 sample plants: 75% pods should show dark brown to black inner shell lining with prominent kernel vein netting.',
    kannadaMaturitySigns: 'ಬಳ್ಳಿಯ ಎಲೆಗಳು ಹಳದಿಯಾಗಿ ಉದುರುವುದು; 5 ಮಾದರಿ ಗಿಡಗಳನ್ನು ಕಿತ್ತು ನೋಡಿದಾಗ ಶೇ.75 ಕಾಯಿಗಳ ಒಳಭಾಗದ ಗೋಡೆ ಕಡು ಕಂದು ಅಥವಾ ಕಪ್ಪು ಬಣ್ಣಕ್ಕೆ ತಿರುಗಿರುವುದು.',
    harvestMethod: 'Irrigate field 2 days prior to harvest to loosen soil so pods do not snap and stay buried. Sun-cure stripped pods on tarpaulins for 5-7 days.',
    kannadaHarvestMethod: 'ಕಾಯಿಗಳು ಮಣ್ಣಿನಲ್ಲೇ ತುಂಡಾಗಿ ಉಳಿಯದಂತೆ ಕೊಯ್ಲಿಗೆ 2 ದಿನ ಮುಂಚೆ ಲಘು ನೀರು ಕೊಡಬೇಕು. ಕಾಯಿ ಬಿಡಿಸಿ 5-7 ದಿನ ಬಿಸಿಲಿನಲ್ಲಿ ಒಣಗಿಸಿ ತೇವಾಂಶ ಶೇ.8ಕ್ಕೆ ಇಳಿಸಬೇಕು.',
    growthStages: [
      { stage: 'Vegetative & Flower Initiation', kannadaStage: 'ಬೆಳವಣಿಗೆ ಮತ್ತು ಹಳದಿ ಹೂವುಗಳು', das: '0 - 30 DAS', description: 'Golden yellow flowers bloom in leaf axils; gypsum application due.' },
      { stage: 'Pegging (Peg penetration)', kannadaStage: 'ಊಡು (Pegs) ಮಣ್ಣಿಗೆ ಇಳಿಯುವ ಹಂತ', das: '35 - 50 DAS', description: 'Gynophores (pegs) elongate and penetrate downward into friable soil.' },
      { stage: 'Pod Swelling & Kernel Filling', kannadaStage: 'ಕಾಯಿ ಊದುವಿಕೆ ಮತ್ತು ಬೀಜ ತುಂಬುವುದು', das: '55 - 85 DAS', description: 'Peg tips swell underground forming double-seeded pods; calcium critical.' },
      { stage: 'Shell Hardening & Harvest', kannadaStage: 'ಕಾಯಿ ಗಟ್ಟಿಯಾಗುವುದು ಮತ್ತು ಕಟಾವು', das: '95 - 115 DAS', description: 'Shell venation sharpens; inner wall turns dark; harvest commenced.' }
    ],
    criticalActivities: 'Gypsum application at 30 DAS; check pod maturity inside pod inner wall turning brown.'
  },
  {
    id: 'onion',
    name: 'Onion (Red Bellary)',
    kannadaName: 'ಈರುಳ್ಳಿ (ಕೆಂಪು ಬಳ್ಳಾರಿ)',
    season: 'Kharif / Rangada',
    durationDays: '110 - 130 days',
    sowingMonths: ['June', 'July', 'August'],
    exactSowingDates: 'Nursery sowing: May-June | Field Transplanting: July 1 – July 31',
    kannadaSowingDates: 'ಮಡಿ ಸಸಿ ಬೆಳೆಸುವುದು: ಮೇ-ಜೂನ್ | ನಾಟಿ ಮಾಡುವುದು: ಜುಲೈ 1 ರಿಂದ ಜುಲೈ 31',
    harvestMonths: ['October', 'November'],
    exactHarvestDates: 'October 15 – November 25',
    kannadaHarvestDates: 'ಅಕ್ಟೋಬರ್ 15 ರಿಂದ ನವೆಂಬರ್ 25',
    growthMonths: ['August', 'September', 'October'],
    maturitySigns: 'Neck fall: 50% to 70% of plant tops fall over naturally; bulb outer skins take on vibrant reddish-copper color and firm up.',
    kannadaMaturitySigns: 'ಶೇ.50 ರಿಂದ 70 ರಷ್ಟು ಗಿಡಗಳ ಕುತ್ತಿಗೆ ಮುರಿದು ಎಲೆಗಳು ನೆಲಕ್ಕೆ ವಾಲಿಕೊಳ್ಳುವುದು (Neck fall); ಗಡ್ಡೆಯ ಮೇಲಿನ ಸಿಪ್ಪೆ ಕೆಂಪು-ತಾಮ್ರದ ಬಣ್ಣಕ್ಕೆ ತಿರುಗಿ ಗಟ್ಟಿಯಾಗುವುದು.',
    harvestMethod: 'Pull bulbs gently; leave in windrows with tops covering bulbs (shingle method) for 3-5 days in field for field curing, then cut foliage leaving 2.5cm neck.',
    kannadaHarvestMethod: 'ಗಡ್ಡೆಗಳನ್ನು ಕಿತ್ತು ಹೊಲದಲ್ಲೇ 3-5 ದಿನ ನೆರಳಿನಲ್ಲಿ ಒಣಗಿಸಿ ಕ್ಯೂರಿಂಗ್ (Curing) ಮಾಡಬೇಕು. ನಂತರ ಕುತ್ತಿಗೆಯ ಮೇಲೆ 2.5 ಸೆಂ.ಮೀ ಬಿಟ್ಟು ಎಲೆಗಳನ್ನು ಕತ್ತರಿಸಿ ಶೇಖರಿಸಬೇಕು.',
    growthStages: [
      { stage: 'Nursery to Transplanting', kannadaStage: 'ಸಸಿ ಮಡಿ ಮತ್ತು ನಾಟಿ ಹಂತ', das: '0 - 45 DAS', description: 'Pencil-thick healthy seedlings transplanted on raised beds.' },
      { stage: 'Vegetative Foliage Growth', kannadaStage: 'ಎಲೆಗಳ ಹುಲುಸಾದ ಬೆಳವಣಿಗೆ', das: '15 - 45 DAT', description: 'Forms 8-10 lush cylindrical hollow leaves.' },
      { stage: 'Bulb Initiation & Enlargement', kannadaStage: 'ಗಡ್ಡೆ ಕಟ್ಟುವ ಮತ್ತು ಊದುವ ಹಂತ', das: '50 - 80 DAT', description: 'Leaf bases swell into concentric fleshy scales; sulphur enhances pungency.' },
      { stage: 'Neck Fall & Harvest Curing', kannadaStage: 'ಕುತ್ತಿಗೆ ಮುರಿಯುವುದು ಮತ್ತು ಕೊಯ್ಲು', das: '90 - 110 DAT', description: 'Foliage collapses; irrigation stopped 12 days prior to digging.' }
    ],
    criticalActivities: 'Bulbing stage irrigation control; neck drying and curing for 5-7 days in shade.'
  },
  {
    id: 'byadgi_chilli',
    name: 'Byadgi Chilli',
    kannadaName: 'ಬ್ಯಾಡಗಿ ಮೆಣಸಿನಕಾಯಿ',
    season: 'Kharif',
    durationDays: '160 - 200 days',
    sowingMonths: ['June', 'July'],
    exactSowingDates: 'Nursery: May 20 – June 15 | Transplanting: July 1 – July 25',
    kannadaSowingDates: 'ಸಸಿ ಮಡಿ: ಮೇ 20 ರಿಂದ ಜೂನ್ 15 | ನಾಟಿ: ಜುಲೈ 1 ರಿಂದ ಜುಲೈ 25',
    harvestMonths: ['December', 'January', 'February', 'March'],
    exactHarvestDates: 'Dec 15 – March 20 (4 to 6 pickings of ripe deep red pods)',
    kannadaHarvestDates: 'ಡಿಸೆಂಬರ್ 15 ರಿಂದ ಮಾರ್ಚ್ 20 (ಹಣ್ಣಾದ ಕೆಂಪು ಕಾಯಿಗಳನ್ನು 4 ರಿಂದ 6 ಹಂತಗಳಲ್ಲಿ ಕಟಾವು ಮಾಡುವುದು)',
    growthMonths: ['August', 'September', 'October', 'November'],
    maturitySigns: 'Pods turn 100% deep crimson red with signature crinkled/wrinkled skin (high ASTA color value, low pungency capsanthin).',
    kannadaMaturitySigns: 'ಕಾಯಿಗಳು ಪೂರ್ಣವಾಗಿ ಕೆಂಪು ಬಣ್ಣಕ್ಕೆ ತಿರುಗಿ, ಸುಕ್ಕುಗಟ್ಟಿದ ಮೇಲ್ಮೈ ಪಡೆಯುವುದು (ಹೆಚ್ಚಿನ ಬಣ್ಣ ಮತ್ತು ಕಡಿಮೆ ಖಾರ).',
    harvestMethod: 'Pick fully ripe red fruits manually; avoid picking partially green pods. Sun-dry on clean tarpaulins/drying floors for 10-14 days to preserve oily gloss.',
    kannadaHarvestMethod: 'ಪೂರ್ಣ ಮಾಗಿದ ಕೆಂಪು ಹಣ್ಣುಗಳನ್ನು ಮಾತ್ರ ಬಿಡಿಸಬೇಕು. ಟಾರ್ಪಲಿನ್ ಅಥವಾ ಸಿಮೆಂಟ್ ಕಣದಲ್ಲಿ 10-14 ದಿನ ಬಿಸಿಲಿನಲ್ಲಿ ಒಣಗಿಸಿ ಎಣ್ಣೆಯುಕ್ತ ಹೊಳಪು ಉಳಿಸಿಕೊಳ್ಳಬೇಕು.',
    growthStages: [
      { stage: 'Nursery & Field Establishment', kannadaStage: 'ಸಸಿಮಡಿ ಮತ್ತು ಹೊಲದಲ್ಲಿ ನಾಟಿ', das: '0 - 45 DAS', description: 'Pro-tray nursery raised; dipped in bio-agent before planting.' },
      { stage: 'Branching & Flower Flush', kannadaStage: 'ಕವಲೊಡೆದು ಹೂ ಬಿಡುವ ಹಂತ', das: '40 - 75 DAT', description: 'White star-shaped nodding flowers bloom at forks.' },
      { stage: 'Fruit Setting & Ripening', kannadaStage: 'ಕಾಯಿ ಕಟ್ಟುವುದು ಮತ್ತು ಹಣ್ಣಾಗುವುದು', das: '85 - 130 DAT', description: 'Green pods elongate; turn deep red starting from tip.' },
      { stage: 'Multi-Round Pickings', kannadaStage: 'ಹಲವು ಹಂತಗಳ ಕೊಯ್ಲು', das: '140 - 200 DAT', description: 'Sequential pickings every 15-20 days; grade Byadgi Dabbi vs Kaddi.' }
    ],
    criticalActivities: 'Multiple pickings (3-5 rounds); sun-drying on clean tarpaulins to preserve deep red oil.'
  },
  {
    id: 'guava_horticulture',
    name: 'Guava Orchard (Taiwan Pink / L-49)',
    kannadaName: 'ಸೀಬೆಹಣ್ಣು (ತೈವಾನ್ ಪಿಂಕ್ / ಎಲ್-49)',
    season: 'Perennial',
    durationDays: 'Year-Round (Bahar Managed)',
    sowingMonths: ['July', 'August'],
    exactSowingDates: 'Field Orchard Planting: July 1 – August 31 (Early monsoon season)',
    kannadaSowingDates: 'ತೋಟ ನೆಡುವಿಕೆ: ಜುಲೈ 1 ರಿಂದ ಆಗಸ್ಟ್ 31 (ಮುಂಗಾರಿನ ಆರಂಭಿಕ ಮಳೆಗಾಲ)',
    harvestMonths: ['November', 'December', 'January', 'July', 'August'],
    exactHarvestDates: 'Mrig Bahar Harvest: Nov 15 – Jan 31 | Ambe Bahar Harvest: July – Aug',
    kannadaHarvestDates: 'ಮೃಗ ಬಹಾರ್ ಕೊಯ್ಲು: ನವೆಂಬರ್ 15 ರಿಂದ ಜನವರಿ 31 | ಅಂಬೆ ಬಹಾರ್: ಜುಲೈ - ಆಗಸ್ಟ್',
    growthMonths: ['Year-round'],
    maturitySigns: 'Fruit skin color shifts from dark green to light yellowish-green; calyx lobes dry and flatten; faint sweet aroma develops.',
    kannadaMaturitySigns: 'ಹಣ್ಣಿನ ಬಣ್ಣ ಗಾಢ ಹಸಿರಿನಿಂದ ತಿಳಿ ಹಳದಿ-ಹಸಿರು ಬಣ್ಣಕ್ಕೆ ಬದಲಾಗುವುದು; ಹಣ್ಣಿನ ಬುಡ ಚಪ್ಪಟೆಯಾಗುವುದು; ಸುವಾಸನೆ ಹೊರಸೂಸುವುದು.',
    harvestMethod: 'Hand-pick carefully with individual stalk scissors during cool morning hours. Grade according to fruit weight (>250g premium Taiwan Pink).',
    kannadaHarvestMethod: 'ತಂಪಾದ ಬೆಳಗಿನ ವೇಳೆಯಲ್ಲಿ ಕತ್ತರಿಯಿಂದ ಹಣ್ಣನ್ನು ತೊಟ್ಟಿನ ಸಮೇತ ಕೊಯ್ಯಬೇಕು. ಹಣ್ಣಿಗೆ ಪೆಟ್ಟಾಗದಂತೆ ಫೋಮ್ ನೆಟ್ ಹಾಕಿ ಕ್ರೇಟ್‌ಗಳಲ್ಲಿ ತುಂಬಬೇಕು.',
    growthStages: [
      { stage: 'Planting & Framework Training', kannadaStage: 'ಗಿಡ ನೆಡುವಿಕೆ ಮತ್ತು ಆಕಾರ ರೂಪಿಸುವುದು', das: 'Year 1', description: 'Pruning to develop open-center or meadow canopy.' },
      { stage: 'Bahar Treatment (Stress inducer)', kannadaStage: 'ಬಹಾರ್ ಉಪಚಾರ (ನೀರು ನಿಲ್ಲಿಸಿ ಹೂವು ತರಿಸುವುದು)', das: 'May or Oct', description: 'Withhold irrigation for 25-30 days to induce synchronous flowering.' },
      { stage: 'Bloom & Fruit Bagging', kannadaStage: 'ಹೂವರಳುವಿಕೆ ಮತ್ತು ಹಣ್ಣಿಗೆ ಚೀಲ ಕಟ್ಟುವುದು', das: '35 - 50 Days after bloom', description: 'White fragrant blossoms; foam bagging protects against fruit fly.' },
      { stage: 'Harvest & Marketing', kannadaStage: 'ಕೊಯ್ಲು ಮತ್ತು ಮಾರುಕಟ್ಟೆಗೆ ಸಾಗಣೆ', das: '110 - 130 Days from fruit set', description: 'Crisp, sweet, disease-free commercial harvest.' }
    ],
    criticalActivities: 'Bahar treatment (withholding water for 30 days to force uniform blooming); foam fruit bagging.'
  }
];

export interface KarnatakaSeasonCrop {
  id: string;
  nameEn: string;
  nameKn: string;
  category: 'Cereal' | 'Pulse' | 'Oilseed' | 'Commercial' | 'Horticulture' | 'Fodder';
  sowingMonths: string;
  sowingMonthsKn: string;
  harvestMonths: string;
  harvestMonthsKn: string;
  durationDays: string;
  primaryDistricts: string;
  keyVarieties: string;
  rainfallDependency: string;
}

export interface KarnatakaSeasonData {
  seasonId: 'kharif' | 'rabi' | 'summer' | 'perennial';
  nameEn: string;
  nameKn: string;
  monsoonNameEn: string;
  monsoonNameKn: string;
  sowingPeriodEn: string;
  sowingPeriodKn: string;
  harvestPeriodEn: string;
  harvestPeriodKn: string;
  rainfallShare: string;
  overviewEn: string;
  overviewKn: string;
  crops: KarnatakaSeasonCrop[];
}

export const KARNATAKA_SEASON_WISE_CALENDAR: KarnatakaSeasonData[] = [
  {
    seasonId: 'kharif',
    nameEn: 'Kharif Season (Monsoon Crops)',
    nameKn: 'ಮುಂಗಾರು ಹಂಗಾಮು (ಖಾರಿಫ್ ಬೆಳೆಗಳು)',
    monsoonNameEn: 'South-West Monsoon (SW Monsoon: June – September)',
    monsoonNameKn: 'ನೈರುತ್ಯ ಮುಂಗಾರು ಮಳೆ (ಜೂನ್ ನಿಂದ ಸೆಪ್ಟೆಂಬರ್)',
    sowingPeriodEn: 'Late May / June – July',
    sowingPeriodKn: 'ಮೇ ಕೊನೆ / ಜೂನ್ ನಿಂದ ಜುಲೈ',
    harvestPeriodEn: 'September – November / December',
    harvestPeriodKn: 'ಸೆಪ್ಟೆಂಬರ್ ನಿಂದ ನವೆಂಬರ್ / ಡಿಸೆಂಬರ್',
    rainfallShare: 'Receives ~65% to 70% of Karnataka’s annual precipitation',
    overviewEn: 'The backbone of Karnataka’s agrarian economy, covering over 72 lakh hectares across Southern dry zones, Northern transition zones, and Coastal belts.',
    overviewKn: 'ಕರ್ನಾಟಕದ ಕೃಷಿಯ ಬೆನ್ನೆಲುಬು. ರಾಜ್ಯದ ಶೇ.65-70ರಷ್ಟು ಮಳೆ ಈ ಹಂಗಾಮಿನಲ್ಲಿ ಸುರಿಯುತ್ತದೆ. ಸುಮಾರು 72 ಲಕ್ಷ ಹೆಕ್ಟೇರ್ ಪ್ರದೇಶದಲ್ಲಿ ಬಿತ್ತನೆ ನಡೆಯುತ್ತದೆ.',
    crops: [
      {
        id: 'paddy_kharif',
        nameEn: 'Paddy / Rice',
        nameKn: 'ಭತ್ತ',
        category: 'Cereal',
        sowingMonths: 'June – July (Nursery June; Transplanting July)',
        sowingMonthsKn: 'ಜೂನ್ - ಜುಲೈ (ಸಸಿಮಡಿ ಜೂನ್, ನಾಟಿ ಜುಲೈ)',
        harvestMonths: 'November – December',
        harvestMonthsKn: 'ನವೆಂಬರ್ - ಡಿಸೆಂಬರ್',
        durationDays: '125 – 150 days',
        primaryDistricts: 'Shivamogga, Davanagere, Ballari, Koppal, Mandya, Raichur, Coastal Karavali',
        keyVarieties: 'BPT-5204 (Sona Masuri), RNR-15048, Jaya, IR-64, Gangavathi Sona',
        rainfallDependency: 'High / Assured Canal / Tank Irrigation'
      },
      {
        id: 'ragi_kharif',
        nameEn: 'Finger Millet (Ragi)',
        nameKn: 'ರಾಗಿ',
        category: 'Cereal',
        sowingMonths: 'July 15 – August 15',
        sowingMonthsKn: 'ಜುಲೈ 15 ರಿಂದ ಆಗಸ್ಟ್ 15',
        harvestMonths: 'November – December',
        harvestMonthsKn: 'ನವೆಂಬರ್ - ಡಿಸೆಂಬರ್',
        durationDays: '110 – 125 days',
        primaryDistricts: 'Tumakuru, Hassan, Mandya, Mysuru, Ramanagara, Kolar, Chikkaballapura',
        keyVarieties: 'GPU-28, ML-365, MR-1, KMR-301, Indaf-8',
        rainfallDependency: 'Drought Tolerant Rainfed'
      },
      {
        id: 'cotton_kharif',
        nameEn: 'Bt Cotton',
        nameKn: 'ಹತ್ತಿ (ಬಿಟಿ ಹೈಬ್ರಿಡ್)',
        category: 'Commercial',
        sowingMonths: 'June 15 – July 15',
        sowingMonthsKn: 'ಜೂನ್ 15 ರಿಂದ ಜುಲೈ 15',
        harvestMonths: 'December – February (3-4 Pickings)',
        harvestMonthsKn: 'ಡಿಸೆಂಬರ್ ನಿಂದ ಫೆಬ್ರವರಿ',
        durationDays: '150 – 180 days',
        primaryDistricts: 'Dharwad, Haveri, Belagavi, Ballari, Raichur, Kalaburagi, Mysuru',
        keyVarieties: 'DHH-11, MRC-7351, RCH-659, Mallika BG-II',
        rainfallDependency: 'Rainfed / Drip Preferred'
      },
      {
        id: 'soybean_kharif',
        nameEn: 'Soybean',
        nameKn: 'ಸೋಯಾಬಿನ್',
        category: 'Oilseed',
        sowingMonths: 'June 15 – July 10',
        sowingMonthsKn: 'ಜೂನ್ 15 ರಿಂದ ಜುಲೈ 10',
        harvestMonths: 'September 20 – October 10',
        harvestMonthsKn: 'ಸೆಪ್ಟೆಂಬರ್ 20 ರಿಂದ ಅಕ್ಟೋಬರ್ 10',
        durationDays: '90 – 98 days',
        primaryDistricts: 'Belagavi, Dharwad, Bidar, Haveri, Bagalkot',
        keyVarieties: 'DSb-21 (Pratiksha), JS-335, DSb-23, DSb-28',
        rainfallDependency: 'Rainfed Black Vertisols'
      },
      {
        id: 'maize_kharif',
        nameEn: 'Hybrid Maize',
        nameKn: 'ಮೆಕ್ಕೆಜೋಳ',
        category: 'Cereal',
        sowingMonths: 'June 1 – July 15',
        sowingMonthsKn: 'ಜೂನ್ 1 ರಿಂದ ಜುಲೈ 15',
        harvestMonths: 'September 25 – October 25',
        harvestMonthsKn: 'ಸೆಪ್ಟೆಂಬರ್ 25 ರಿಂದ ಅಕ್ಟೋಬರ್ 25',
        durationDays: '105 – 120 days',
        primaryDistricts: 'Davanagere, Haveri, Belagavi, Chikkamagaluru, Chitradurga, Dharwad',
        keyVarieties: 'CP-818, Hema, DKC-9108, Pioneer P3522',
        rainfallDependency: 'Moderate / Rainfed or Irrigated'
      },
      {
        id: 'redgram_kharif',
        nameEn: 'Red Gram / Pigeonpea (Tur)',
        nameKn: 'ತೊಗರಿ',
        category: 'Pulse',
        sowingMonths: 'June 15 – July 15',
        sowingMonthsKn: 'ಜೂನ್ 15 ರಿಂದ ಜುಲೈ 15',
        harvestMonths: 'December – January',
        harvestMonthsKn: 'ಡಿಸೆಂಬರ್ ನಿಂದ ಜನವರಿ',
        durationDays: '150 – 175 days',
        primaryDistricts: 'Kalaburagi (Tur Bowl of Karnataka), Vijayapura, Bidar, Yadgir',
        keyVarieties: 'GRG-811 (Wilt resistant), TS-3R, BSMR-736, Maruthi',
        rainfallDependency: 'Deep Taproot Rainfed'
      },
      {
        id: 'greengram_kharif',
        nameEn: 'Green Gram (Moong)',
        nameKn: 'ಹೆಸರು ಕಾಳು',
        category: 'Pulse',
        sowingMonths: 'June 1 – June 20',
        sowingMonthsKn: 'ಜೂನ್ 1 ರಿಂದ ಜೂನ್ 20',
        harvestMonths: 'August 15 – August 30',
        harvestMonthsKn: 'ಆಗಸ್ಟ್ 15 ರಿಂದ ಆಗಸ್ಟ್ 30',
        durationDays: '60 – 65 days',
        primaryDistricts: 'Gadag, Dharwad, Koppal, Bagalkot, Belagavi',
        keyVarieties: 'DGGV-2 (UASD), Shiny Moong, Selection-4',
        rainfallDependency: 'Short duration early monsoon'
      },
      {
        id: 'groundnut_kharif',
        nameEn: 'Groundnut (Kharif)',
        nameKn: 'ಶೇಂಗಾ (ಮುಂಗಾರು)',
        category: 'Oilseed',
        sowingMonths: 'June 10 – July 10',
        sowingMonthsKn: 'ಜೂನ್ 10 ರಿಂದ ಜುಲೈ 10',
        harvestMonths: 'October 10 – November 5',
        harvestMonthsKn: 'ಅಕ್ಟೋಬರ್ 10 ರಿಂದ ನವೆಂಬರ್ 5',
        durationDays: '105 – 115 days',
        primaryDistricts: 'Tumakuru, Chitradurga, Ballari, Belagavi, Dharwad, Vijayapura',
        keyVarieties: 'GPBD-4, TMV-2, JL-24, K-6',
        rainfallDependency: 'Rainfed Alfisols & Red Loams'
      },
      {
        id: 'byadgi_chilli_kharif',
        nameEn: 'Byadgi Dry Chilli',
        nameKn: 'ಬ್ಯಾಡಗಿ ಮೆಣಸಿನಕಾಯಿ',
        category: 'Commercial',
        sowingMonths: 'Transplanting July 1 – 25',
        sowingMonthsKn: 'ನಾಟಿ: ಜುಲೈ 1 ರಿಂದ 25',
        harvestMonths: 'December – March (Multiple rounds)',
        harvestMonthsKn: 'ಡಿಸೆಂಬರ್ ನಿಂದ ಮಾರ್ಚ್',
        durationDays: '160 – 200 days',
        primaryDistricts: 'Haveri (Byadgi), Dharwad, Gadag, Ballari',
        keyVarieties: 'Byadgi Dabbi, Byadgi Kaddi',
        rainfallDependency: 'Protective Irrigation'
      }
    ]
  },
  {
    seasonId: 'rabi',
    nameEn: 'Rabi Season (Post-Monsoon Winter Crops)',
    nameKn: 'ಹಿಂಗಾರು ಹಂಗಾಮು (ರಬಿ ಬೆಳೆಗಳು)',
    monsoonNameEn: 'North-East Monsoon (NE Monsoon: Oct – Dec) + Vertisol Residual Moisture',
    monsoonNameKn: 'ಈಶಾನ್ಯ ಹಿಂಗಾರು ಮಳೆ & ಕಪ್ಪು ಎರೆಮಣ್ಣಿನ ತೇವಾಂಶ',
    sowingPeriodEn: 'September 15 – October 31 (to mid-Nov)',
    sowingPeriodKn: 'ಸೆಪ್ಟೆಂಬರ್ 15 ರಿಂದ ಅಕ್ಟೋಬರ್ 31',
    harvestPeriodEn: 'January – February / March',
    harvestPeriodKn: 'ಜನವರಿ ನಿಂದ ಫೆಬ್ರವರಿ / ಮಾರ್ಚ್',
    rainfallShare: 'Receives ~20% of annual rainfall; relies on Vertisol moisture preservation',
    overviewEn: 'Crucial for North Karnataka’s Deccan plateau (Dharwad, Belagavi, Vijayapura, Bagalkot, Gadag, Kalaburagi). Rabi pulses and millets thrive on deep clay subsoil moisture.',
    overviewKn: 'ಉತ್ತರ ಕರ್ನಾಟಕದ ಜೀವನಾಡಿ ಹಂಗಾಮು. ಎರೆಭೂಮಿಯ ತೇವಾಂಶದಲ್ಲಿ ಕಡಲೆ, ಬಿಳಿಜೋಳ, ಗೋಧಿ ಮತ್ತು ಕುಸುಬಿ ಅತ್ಯಧಿಕ ಲಾಭ ನೀಡುತ್ತವೆ.',
    crops: [
      {
        id: 'bengal_gram_rabi',
        nameEn: 'Bengal Gram (Chickpea / Chana)',
        nameKn: 'ಕಡಲೆ (ಚಣಂಗಿ)',
        category: 'Pulse',
        sowingMonths: 'October 1 – October 31',
        sowingMonthsKn: 'ಅಕ್ಟೋಬರ್ 1 ರಿಂದ ಅಕ್ಟೋಬರ್ 31',
        harvestMonths: 'January 15 – February 10',
        harvestMonthsKn: 'ಜನವರಿ 15 ರಿಂದ ಫೆಬ್ರವರಿ 10',
        durationDays: '95 – 105 days',
        primaryDistricts: 'Dharwad (Annigeri Hub), Kalaburagi, Vijayapura, Gadag, Bagalkot, Belagavi',
        keyVarieties: 'Annigeri-1 (A-1), JG-11, BGD-103, JAKI-9218',
        rainfallDependency: 'Subsoil Residual Moisture Champion'
      },
      {
        id: 'rabi_jowar',
        nameEn: 'Rabi Jowar (Maldandi White Sorghum)',
        nameKn: 'ಹಿಂಗಾರು ಬಿಳಿಜೋಳ (ಮಾಲ್ದಂಡಿ)',
        category: 'Cereal',
        sowingMonths: 'September 15 – October 10',
        sowingMonthsKn: 'ಸೆಪ್ಟೆಂಬರ್ 15 ರಿಂದ ಅಕ್ಟೋಬರ್ 10',
        harvestMonths: 'January 20 – February 15',
        harvestMonthsKn: 'ಜನವರಿ 20 ರಿಂದ ಫೆಬ್ರವರಿ 15',
        durationDays: '115 – 125 days',
        primaryDistricts: 'Vijayapura (Jowar Bowl), Dharwad, Bagalkot, Gadag, Belagavi, Raichur',
        keyVarieties: 'M-35-1 (Maldandi), DSV-4, CSV-29R, BJV-44',
        rainfallDependency: 'C4 Drought Resilient Rainfed'
      },
      {
        id: 'wheat_rabi',
        nameEn: 'Durum Wheat & Bread Wheat',
        nameKn: 'ಹಿಂಗಾರು ಗೋಧಿ (ಗಟ್ಟಿ ಗೋಧಿ & ಶರಬತಿ)',
        category: 'Cereal',
        sowingMonths: 'October 20 – November 15',
        sowingMonthsKn: 'ಅಕ್ಟೋಬರ್ 20 ರಿಂದ ನವೆಂಬರ್ 15',
        harvestMonths: 'February 15 – March 10',
        harvestMonthsKn: 'ಫೆಬ್ರವರಿ 15 ರಿಂದ ಮಾರ್ಚ್ 10',
        durationDays: '105 – 115 days',
        primaryDistricts: 'Dharwad, Belagavi, Bagalkot, Vijayapura, Gadag',
        keyVarieties: 'DWR-1006 (UASD Durum), UAS-428, DWR-162, DWR-2006',
        rainfallDependency: 'Vertisol Rainfed or 1-2 Irrigations'
      },
      {
        id: 'safflower_rabi',
        nameEn: 'Safflower (Kusubi)',
        nameKn: 'ಕುಸುಬಿ',
        category: 'Oilseed',
        sowingMonths: 'October 1 – October 25',
        sowingMonthsKn: 'ಅಕ್ಟೋಬರ್ 1 ರಿಂದ ಅಕ್ಟೋಬರ್ 25',
        harvestMonths: 'February 15 – March 10',
        harvestMonthsKn: 'ಫೆಬ್ರವರಿ 15 ರಿಂದ ಮಾರ್ಚ್ 10',
        durationDays: '120 – 135 days',
        primaryDistricts: 'Dharwad, Gadag, Belagavi, Vijayapura, Bagalkot',
        keyVarieties: 'A-1 (Annigeri-1), PBNS-12, NARI-6',
        rainfallDependency: 'Deep taproot extracts water from 2m depth'
      },
      {
        id: 'sunflower_rabi',
        nameEn: 'Rabi Sunflower',
        nameKn: 'ಹಿಂಗಾರು ಸೂರ್ಯಕಾಂತಿ',
        category: 'Oilseed',
        sowingMonths: 'September 15 – October 15',
        sowingMonthsKn: 'ಸೆಪ್ಟೆಂಬರ್ 15 ರಿಂದ ಅಕ್ಟೋಬರ್ 15',
        harvestMonths: 'December 20 – January 20',
        harvestMonthsKn: 'ಡಿಸೆಂಬರ್ 20 ರಿಂದ ಜನವರಿ 20',
        durationDays: '90 – 100 days',
        primaryDistricts: 'Koppal, Raichur, Ballari, Bagalkot, Gadag, Dharwad',
        keyVarieties: 'KBSH-41, KBSH-53, RSFH-1887',
        rainfallDependency: 'Moderate moisture'
      }
    ]
  },
  {
    seasonId: 'summer',
    nameEn: 'Summer Season (Garame / Irrigated Summer Crops)',
    nameKn: 'ಬೇಸಿಗೆ ಹಂಗಾಮು (ಗರಮೆ ಬೆಳೆಗಳು)',
    monsoonNameEn: 'Pre-Monsoon Dry Hot Period (Fed by Canals, Tubewells, Micro-Irrigation)',
    monsoonNameKn: 'ಕಾಲುವೆ, ಬೋರ್‌ವೆಲ್ & ಹನಿ ನೀರಾವರಿ ಆಸರೆ',
    sowingPeriodEn: 'January 1 – February 15',
    sowingPeriodKn: 'ಜನವರಿ 1 ರಿಂದ ಫೆಬ್ರವರಿ 15',
    harvestPeriodEn: 'April 15 – May 30',
    harvestPeriodKn: 'ಏಪ್ರಿಲ್ 15 ರಿಂದ ಮೇ 30',
    rainfallShare: 'Dry period with occasional convective pre-monsoon showers (Mungaru prep)',
    overviewEn: 'Characterized by high solar radiation and low disease incidence, resulting in bumper yields for farmers with assured irrigation infrastructure.',
    overviewKn: 'ಹೆಚ್ಚು ಬಿಸಿಲು ಮತ್ತು ಕಡಿಮೆ ಕೀಟ-ರೋಗಗಳಿರುವುದರಿಂದ, ನೀರಾವರಿ ಸೌಲಭ್ಯವಿರುವ ರೈತರಿಗೆ ಶೇಂಗಾ ಮತ್ತು ತರಕಾರಿಗಳಲ್ಲಿ ಬಂಪರ್ ಇಳುವರಿ ದೊರೆಯುತ್ತದೆ.',
    crops: [
      {
        id: 'groundnut_summer',
        nameEn: 'Summer Groundnut',
        nameKn: 'ಬೇಸಿಗೆ ಶೇಂಗಾ',
        category: 'Oilseed',
        sowingMonths: 'January 1 – February 10',
        sowingMonthsKn: 'ಜನವರಿ 1 ರಿಂದ ಫೆಬ್ರವರಿ 10',
        harvestMonths: 'April 15 – May 10',
        harvestMonthsKn: 'ಏಪ್ರಿಲ್ 15 ರಿಂದ ಮೇ 10',
        durationDays: '105 – 115 days',
        primaryDistricts: 'Tumakuru, Chitradurga, Davanagere, Belagavi, Dharwad, Bagalkot',
        keyVarieties: 'GPBD-4 (UASD), TMV-2, Kadiri-6, JL-24',
        rainfallDependency: 'Assured Sprinkler / Drip Irrigation'
      },
      {
        id: 'paddy_summer',
        nameEn: 'Summer Paddy',
        nameKn: 'ಬೇಸಿಗೆ ಭತ್ತ',
        category: 'Cereal',
        sowingMonths: 'January 1 – January 31',
        sowingMonthsKn: 'ಜನವರಿ 1 ರಿಂದ ಜನವರಿ 31',
        harvestMonths: 'April 25 – May 25',
        harvestMonthsKn: 'ಏಪ್ರಿಲ್ 25 ರಿಂದ ಮೇ 25',
        durationDays: '120 – 135 days',
        primaryDistricts: 'Koppal, Ballari, Raichur (TBP Command), Mandya, Mysuru (KRS Command)',
        keyVarieties: 'IR-64, Tellahamsa, Gangavathi Sona',
        rainfallDependency: 'Heavy Canal Irrigation'
      },
      {
        id: 'watermelon_summer',
        nameEn: 'Watermelon & Muskmelon',
        nameKn: 'ಕಲ್ಲಂಗಡಿ ಮತ್ತು ಕರ್ಬೂಜ',
        category: 'Horticulture',
        sowingMonths: 'December 15 – January 31',
        sowingMonthsKn: 'ಡಿಸೆಂಬರ್ 15 ರಿಂದ ಜನವರಿ 31',
        harvestMonths: 'March 15 – May 10',
        harvestMonthsKn: 'ಮಾರ್ಚ್ 15 ರಿಂದ ಮೇ 10',
        durationDays: '75 – 85 days',
        primaryDistricts: 'Kolar, Chikkaballapura, Chitradurga, Haveri, Dharwad, Bagalkot',
        keyVarieties: 'Kiran, Saraswati, Black Boss, Sugar Baby',
        rainfallDependency: 'Drip fertigation with silver-black mulch'
      },
      {
        id: 'greengram_summer',
        nameEn: 'Summer Green Gram / Black Gram',
        nameKn: 'ಬೇಸಿಗೆ ಹೆಸರು / ಉದ್ದು',
        category: 'Pulse',
        sowingMonths: 'February 1 – February 25',
        sowingMonthsKn: 'ಫೆಬ್ರವರಿ 1 ರಿಂದ ಫೆಬ್ರವರಿ 25',
        harvestMonths: 'April 20 – May 15',
        harvestMonthsKn: 'ಏಪ್ರಿಲ್ 20 ರಿಂದ ಮೇ 15',
        durationDays: '60 – 65 days',
        primaryDistricts: 'Bagalkot, Belagavi, Dharwad, Koppal, Davanagere',
        keyVarieties: 'DGGV-2, IPM-02-03, LBG-752',
        rainfallDependency: '1-2 light irrigations'
      },
      {
        id: 'sesame_summer',
        nameEn: 'Sesame (Til)',
        nameKn: 'ಎಳ್ಳು',
        category: 'Oilseed',
        sowingMonths: 'January 15 – February 15',
        sowingMonthsKn: 'ಜನವರಿ 15 ರಿಂದ ಫೆಬ್ರವರಿ 15',
        harvestMonths: 'April 15 – May 10',
        harvestMonthsKn: 'ಏಪ್ರಿಲ್ 15 ರಿಂದ ಮೇ 10',
        durationDays: '80 – 90 days',
        primaryDistricts: 'Mysuru, Chamarajanagar, Mandya, Haveri, Dharwad',
        keyVarieties: 'DS-1 (UASD), E-8, Swetha',
        rainfallDependency: 'Low water requirement'
      }
    ]
  },
  {
    seasonId: 'perennial',
    nameEn: 'Annual & Perennial Commercial Crops',
    nameKn: 'ಬಹುವಾರ್ಷಿಕ ಮತ್ತು ವಾರ್ಷಿಕ ವಾಣಿಜ್ಯ ಬೆಳೆಗಳು',
    monsoonNameEn: 'Year-Round Management across all monsoons',
    monsoonNameKn: 'ವರ್ಷವಿಡೀ ನಿರ್ವಹಿಸುವ ತೋಟಗಾರಿಕೆ ಮತ್ತು ವಾಣಿಜ್ಯ ಬೆಳೆಗಳು',
    sowingPeriodEn: 'Planting during June – August (Monsoon onset) or Bahar treatment',
    sowingPeriodKn: 'ನಾಟಿ: ಜೂನ್ ನಿಂದ ಆಗಸ್ಟ್ (ಅಥವಾ ಬಹಾರ್ ಉಪಚಾರ)',
    harvestPeriodEn: 'Staggered Year-Round or Annual Processing Cycles',
    harvestPeriodKn: 'ವರ್ಷವಿಡೀ ಹಂತ ಹಂತವಾಗಿ ಕೊಯ್ಲು',
    rainfallShare: 'Supported by micro-drip and monsoon rainfall',
    overviewEn: 'High-value plantations generating multi-year compounding revenue. Highly developed in Belagavi, Mandya, Bagalkot, and Dharwad.',
    overviewKn: 'ವರ್ಷವಿಡೀ ಅಥವಾ ಹಲವು ವರ್ಷಗಳ ಕಾಲ ನಿರಂತರ ಆದಾಯ ನೀಡುವ ತೋಟಗಾರಿಕೆ ಬೆಳೆಗಳು.',
    crops: [
      {
        id: 'sugarcane_perennial',
        nameEn: 'Sugarcane (Eksali / Adsali)',
        nameKn: 'ಕಬ್ಬು (ಏಕಸಾಲಿ ಮತ್ತು ಅಡ್ಸಾಲಿ)',
        category: 'Commercial',
        sowingMonths: 'Eksali: Jan–Feb | Adsali: July–Aug | Pre-season: Oct–Nov',
        sowingMonthsKn: 'ಏಕಸಾಲಿ: ಜನ-ಫೆಬ್ರ | ಅಡ್ಸಾಲಿ: ಜುಲೈ-ಆಗ | ಮುಂಗಡ: ಅಕ್ಟೋ-ನವೆಂ',
        harvestMonths: '12 to 16 months from planting (Nov – April crushing season)',
        harvestMonthsKn: 'ನಾಟಿ ಮಾಡಿದ 12 ರಿಂದ 16 ತಿಂಗಳಿಗೆ',
        durationDays: '365 – 450 days',
        primaryDistricts: 'Belagavi (Sugar capital), Mandya, Bagalkot, Vijayapura, Davanagere',
        keyVarieties: 'Co-86032, CoC-671, Co-0238, VSI-434',
        rainfallDependency: 'High / Furrow or Drip fertigation'
      },
      {
        id: 'guava_perennial',
        nameEn: 'High-Density Guava',
        nameKn: 'ತೈವಾನ್ ಪಿಂಕ್ ಸೀಬೆ (ತೋಟಗಾರಿಕೆ)',
        category: 'Horticulture',
        sowingMonths: 'Field Planting: July – August',
        sowingMonthsKn: 'ಗಿಡ ನೆಡುವಿಕೆ: ಜುಲೈ - ಆಗಸ್ಟ್',
        harvestMonths: 'Mrig Bahar: Nov–Jan | Ambe Bahar: July–Aug',
        harvestMonthsKn: 'ಮೃಗ ಬಹಾರ್: ನವೆಂ-ಜನ | ಅಂಬೆ ಬಹಾರ್: ಜುಲೈ-ಆಗಸ್ಟ್',
        durationDays: 'Perennial (Year 2+ commercial)',
        primaryDistricts: 'Dharwad, Belagavi, Bengaluru Rural, Kolar, Ramanagara',
        keyVarieties: 'Taiwan Pink, Lucknow-49 (Sardar), Arka Kiran',
        rainfallDependency: 'Micro-Drip (2m x 2m meadow spacing)'
      },
      {
        id: 'mango_perennial',
        nameEn: 'Mango (Alphonso / Badami)',
        nameKn: 'ಮಾವು (ಅಲ್ಫಾನ್ಸೋ / ಬಾದಾಮಿ / ತೋತಾಪುರಿ)',
        category: 'Horticulture',
        sowingMonths: 'Planting: July – September; Flowering: Dec – Jan',
        sowingMonthsKn: 'ನಾಟಿ: ಜುಲೈ-ಸೆಪ್ಟೆಂ; ಹೂವರಳುವಿಕೆ: ಡಿಸೆಂ-ಜನ',
        harvestMonths: 'April 15 – June 30',
        harvestMonthsKn: 'ಏಪ್ರಿಲ್ 15 ರಿಂದ ಜೂನ್ 30',
        durationDays: 'Perennial orchard',
        primaryDistricts: 'Dharwad, Belagavi, Kolar, Ramanagara, Chikkaballapura',
        keyVarieties: 'Alphonso (Badami), Totapuri, Raspuri, Mallika',
        rainfallDependency: 'Rainfed with protective summer drip'
      },
      {
        id: 'pomegranate_perennial',
        nameEn: 'Pomegranate (Bhagwa)',
        nameKn: 'ದಾಳಿಂಬೆ (ಭಗವಾ)',
        category: 'Horticulture',
        sowingMonths: 'Planting: June – August; Bahar induced based on market plan',
        sowingMonthsKn: 'ನಾಟಿ: ಜೂನ್-ಆಗಸ್ಟ್; ಮಾರುಕಟ್ಟೆ ಆಧರಿಸಿ ಬಹಾರ್ ಉಪಚಾರ',
        harvestMonths: '150 – 180 days after flowering flush',
        harvestMonthsKn: 'ಹೂವು ಅರಳಿದ 5-6 ತಿಂಗಳಿಗೆ',
        durationDays: 'Perennial orchard',
        primaryDistricts: 'Bagalkot, Vijayapura, Koppal, Chitradurga, Ballari',
        keyVarieties: 'Bhagwa (Sindhuri), Arakta, Super Bhagwa',
        rainfallDependency: 'Strict Drip fertigation + bacterial blight control'
      }
    ]
  }
];



// cuttingCalculator.js - Marker Nesting & Fabric Consumption Calculator

class CuttingCalculatorEngine {
  constructor() {
    this.fabricWidth = 185; // cm
    this.fabricGramaj = 320; // g/m²
    this.fabricPricePerKg = 42000; // so'm
    this.unitLengthMeters = 0.82; // m per piece
    this.batchQty = 100; // pcs
    this.layersCount = 20; // spread plies
    this.markerEfficiency = 87.4; // %
  }

  calculate(model) {
    if (model) {
      if (model.singleConsumptionMeters) this.unitLengthMeters = model.singleConsumptionMeters;
      if (model.fabricWidthCm) this.fabricWidth = model.fabricWidthCm;
      if (model.markerEfficiency) this.markerEfficiency = model.markerEfficiency;
    }

    const unitMeters = this.unitLengthMeters;
    const rawAreaM2 = (this.fabricWidth / 100) * unitMeters;
    const unitKg = (rawAreaM2 * (this.fabricGramaj / 1000));
    const unitFabricCost = unitKg * this.fabricPricePerKg;

    // Batch calculations
    const totalMeters = unitMeters * this.batchQty;
    const totalKg = unitKg * this.batchQty;
    const totalFabricCost = unitFabricCost * this.batchQty;

    // Waste and Efficiency
    const usefulArea = rawAreaM2 * (this.markerEfficiency / 100);
    const wastePercent = 100 - this.markerEfficiency;
    const wasteAreaM2 = rawAreaM2 * (wastePercent / 100);
    const wasteKgPerUnit = unitKg * (wastePercent / 100);
    const totalWasteKg = wasteKgPerUnit * this.batchQty;

    // Marker Table Specs
    const markerLengthM = (unitMeters * this.batchQty) / this.layersCount;
    const cutsCount = Math.ceil(this.batchQty / this.layersCount);

    return {
      unitMeters: Math.round(unitMeters * 100) / 100,
      unitKg: Math.round(unitKg * 1000) / 1000,
      unitFabricCost: Math.round(unitFabricCost),
      
      batchQty: this.batchQty,
      totalMeters: Math.round(totalMeters * 10) / 10,
      totalKg: Math.round(totalKg * 10) / 10,
      totalFabricCost: Math.round(totalFabricCost),

      markerEfficiency: this.markerEfficiency,
      wastePercent: Math.round(wastePercent * 10) / 10,
      wasteKgPerUnit: Math.round(wasteKgPerUnit * 1000) / 1000,
      totalWasteKg: Math.round(totalWasteKg * 10) / 10,

      layersCount: this.layersCount,
      markerLengthM: Math.round(markerLengthM * 100) / 100,
      cutsCount: cutsCount,

      benchmarks: {
        qty1: { m: (unitMeters * 1).toFixed(2), kg: (unitKg * 1).toFixed(3), cost: Math.round(unitFabricCost * 1) },
        qty10: { m: (unitMeters * 10).toFixed(1), kg: (unitKg * 10).toFixed(2), cost: Math.round(unitFabricCost * 10) },
        qty100: { m: (unitMeters * 100).toFixed(0), kg: (unitKg * 100).toFixed(1), cost: Math.round(unitFabricCost * 100) },
        qty1000: { m: (unitMeters * 1000).toFixed(0), kg: (unitKg * 1000).toFixed(0), cost: Math.round(unitFabricCost * 1000) }
      }
    };
  }

  // Render 2D Fabric Marker Nesting Simulation (SVG) for the selected model
  renderMarkerSvg(model) {
    const calc = this.calculate(model);
    const m = model || { code: 'K-025', name: 'Hoodie', category: 'cat_hoodie' };
    const cat = m.category || 'cat_hoodie';

    return `
      <svg viewBox="0 0 900 240" class="marker-nesting-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="fabricTexture" width="6" height="6" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="6" y2="6" stroke="#f1f5f9" stroke-width="0.5"/>
          </pattern>
        </defs>

        <!-- Fabric Roll Spread -->
        <rect x="20" y="20" width="860" height="190" rx="6" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
        <rect x="20" y="20" width="860" height="190" rx="6" fill="url(#fabricTexture)"/>

        <!-- Marker Grid & Dimensions -->
        <line x1="20" y1="15" x2="880" y2="15" stroke="#0284c7" stroke-width="1.5"/>
        <text x="450" y="12" text-anchor="middle" font-family="'Fredoka', sans-serif" font-size="11.5" font-weight="700" fill="#0284c7">
          ${m.code} RASKLADKA UZUNLIGI: ${calc.markerLengthM} metr (Mato: ${m.fabricName || 'Futer'}, Eni: ${this.fabricWidth} sm)
        </text>

        <!-- Left Fabric Edge -->
        <line x1="15" y1="20" x2="15" y2="210" stroke="#0284c7" stroke-width="1.5"/>
        <text x="10" y="115" text-anchor="middle" font-family="Inter, sans-serif" font-size="10" font-weight="600" fill="#0284c7" transform="rotate(-90, 10, 115)">
          ${this.fabricWidth} sm
        </text>

        <!-- Nested Pattern Pieces on Fabric Roll -->
        ${this.renderNestedPieces(cat, m)}

        <!-- Efficiency Pill -->
        <g transform="translate(730, 182)">
          <rect x="0" y="0" width="140" height="24" rx="12" fill="#10b981"/>
          <text x="70" y="16" text-anchor="middle" font-family="'Fredoka', sans-serif" font-size="11.5" font-weight="700" fill="#ffffff">
            FOYDALI: ${calc.markerEfficiency}%
          </text>
        </g>
      </svg>
    `;
  }

  renderNestedPieces(cat, m) {
    if (cat === 'cat_pants') {
      return `
        <g transform="translate(30, 30)">
          <rect x="0" y="0" width="160" height="85" rx="4" fill="#bae6fd" stroke="#0284c7" stroke-width="1.5"/>
          <text x="80" y="48" text-anchor="middle" font-family="'Fredoka', sans-serif" font-size="11" font-weight="700" fill="#0369a1">OLD BOLDIR (122)</text>
        </g>
        <g transform="translate(30, 120)">
          <rect x="0" y="0" width="180" height="85" rx="4" fill="#a7f3d0" stroke="#059669" stroke-width="1.5"/>
          <text x="90" y="48" text-anchor="middle" font-family="'Fredoka', sans-serif" font-size="11" font-weight="700" fill="#047857">ORQA BOLDIR (122)</text>
        </g>
        <g transform="translate(220, 30)">
          <polygon points="0,0 80,0 70,80 0,80" fill="#fef08a" stroke="#ca8a04" stroke-width="1.5"/>
          <text x="40" y="48" text-anchor="middle" font-family="'Fredoka', sans-serif" font-size="10" font-weight="700" fill="#854d0e">CHO'NTAK</text>
        </g>
        <g transform="translate(220, 120)">
          <rect x="0" y="0" width="140" height="40" rx="3" fill="#f1f5f9" stroke="#475569" stroke-width="1.5"/>
          <text x="70" y="25" text-anchor="middle" font-family="'Fredoka', sans-serif" font-size="10" font-weight="700" fill="#334155">KAMAR</text>
        </g>
        <g transform="translate(380, 30)">
          <rect x="0" y="0" width="160" height="85" rx="4" fill="#bae6fd" stroke="#0284c7" stroke-width="1.5" stroke-dasharray="2,2"/>
          <text x="80" y="48" text-anchor="middle" font-family="'Fredoka', sans-serif" font-size="11" font-weight="700" fill="#0369a1">OLD BOLDIR (128)</text>
        </g>
        <g transform="translate(380, 120)">
          <rect x="0" y="0" width="180" height="85" rx="4" fill="#a7f3d0" stroke="#059669" stroke-width="1.5" stroke-dasharray="2,2"/>
          <text x="90" y="48" text-anchor="middle" font-family="'Fredoka', sans-serif" font-size="11" font-weight="700" fill="#047857">ORQA BOLDIR (128)</text>
        </g>
      `;
    } else if (cat === 'cat_dress') {
      return `
        <g transform="translate(30, 30)">
          <rect x="0" y="0" width="110" height="85" rx="4" fill="#fce7f3" stroke="#db2777" stroke-width="1.5"/>
          <text x="55" y="48" text-anchor="middle" font-family="'Fredoka', sans-serif" font-size="11" font-weight="700" fill="#be185d">KO'KRAK OLD</text>
        </g>
        <g transform="translate(30, 120)">
          <rect x="0" y="0" width="110" height="85" rx="4" fill="#ede9fe" stroke="#7c3aed" stroke-width="1.5"/>
          <text x="55" y="48" text-anchor="middle" font-family="'Fredoka', sans-serif" font-size="11" font-weight="700" fill="#6d28d9">KO'KRAK ORQA</text>
        </g>
        <g transform="translate(150, 30)">
          <rect x="0" y="0" width="220" height="175" rx="4" fill="#fdf2f8" stroke="#ec4899" stroke-width="1.5"/>
          <text x="110" y="90" text-anchor="middle" font-family="'Fredoka', sans-serif" font-size="12" font-weight="700" fill="#db2777">BURMALI YUBKA (122)</text>
        </g>
        <g transform="translate(380, 30)">
          <polygon points="0,20 40,0 80,20 60,80 10,80" fill="#fef08a" stroke="#ca8a04" stroke-width="1.5"/>
          <text x="40" y="50" text-anchor="middle" font-family="'Fredoka', sans-serif" font-size="10" font-weight="700" fill="#854d0e">FONARIK YENG</text>
        </g>
        <g transform="translate(480, 30)">
          <rect x="0" y="0" width="230" height="175" rx="4" fill="#fdf2f8" stroke="#ec4899" stroke-width="1.5" stroke-dasharray="2,2"/>
          <text x="115" y="90" text-anchor="middle" font-family="'Fredoka', sans-serif" font-size="12" font-weight="700" fill="#db2777">BURMALI YUBKA (128)</text>
        </g>
      `;
    }
    // Default Hoodie / Polo / Jacket
    return `
      <g transform="translate(30, 30)">
        <rect x="0" y="0" width="130" height="85" rx="4" fill="#bae6fd" stroke="#0284c7" stroke-width="1.5"/>
        <text x="65" y="48" text-anchor="middle" font-family="'Fredoka', sans-serif" font-size="11" font-weight="700" fill="#0369a1">OLD BO'LAK (122)</text>
      </g>
      <g transform="translate(30, 120)">
        <rect x="0" y="0" width="130" height="85" rx="4" fill="#a7f3d0" stroke="#059669" stroke-width="1.5"/>
        <text x="65" y="48" text-anchor="middle" font-family="'Fredoka', sans-serif" font-size="11" font-weight="700" fill="#047857">ORQA BO'LAK (122)</text>
      </g>
      <g transform="translate(170, 30)">
        <polygon points="0,15 65,0 130,15 110,85 20,85" fill="#fef08a" stroke="#ca8a04" stroke-width="1.5"/>
        <text x="65" y="52" text-anchor="middle" font-family="'Fredoka', sans-serif" font-size="11" font-weight="700" fill="#854d0e">YENG-1</text>
      </g>
      <g transform="translate(170, 120)">
        <polygon points="20,0 110,0 130,70 65,85 0,70" fill="#fef08a" stroke="#ca8a04" stroke-width="1.5"/>
        <text x="65" y="48" text-anchor="middle" font-family="'Fredoka', sans-serif" font-size="11" font-weight="700" fill="#854d0e">YENG-2</text>
      </g>
      <g transform="translate(310, 30)">
        <path d="M 0,0 Q 80,0 100,40 L 100,85 L 0,75 Z" fill="#ddd6fe" stroke="#7c3aed" stroke-width="1.5"/>
        <text x="50" y="50" text-anchor="middle" font-family="'Fredoka', sans-serif" font-size="10" font-weight="700" fill="#5b21b6">KAPYUSHON-1</text>
      </g>
      <g transform="translate(310, 120)">
        <path d="M 0,10 L 100,0 L 100,75 Q 80,85 0,85 Z" fill="#ddd6fe" stroke="#7c3aed" stroke-width="1.5"/>
        <text x="50" y="50" text-anchor="middle" font-family="'Fredoka', sans-serif" font-size="10" font-weight="700" fill="#5b21b6">KAPYUSHON-2</text>
      </g>
      <g transform="translate(420, 30)">
        <polygon points="15,0 75,0 90,85 0,85" fill="#fbcfe8" stroke="#db2777" stroke-width="1.5"/>
        <text x="45" y="50" text-anchor="middle" font-family="'Fredoka', sans-serif" font-size="10" font-weight="700" fill="#9d174d">CHO'NTAK</text>
      </g>
      <g transform="translate(520, 30)">
        <rect x="0" y="0" width="140" height="85" rx="4" fill="#bae6fd" stroke="#0284c7" stroke-width="1.5" stroke-dasharray="2,2"/>
        <text x="70" y="48" text-anchor="middle" font-family="'Fredoka', sans-serif" font-size="11" font-weight="700" fill="#0369a1">OLD BO'LAK (128)</text>
      </g>
      <g transform="translate(520, 120)">
        <rect x="0" y="0" width="140" height="85" rx="4" fill="#a7f3d0" stroke="#059669" stroke-width="1.5" stroke-dasharray="2,2"/>
        <text x="70" y="48" text-anchor="middle" font-family="'Fredoka', sans-serif" font-size="11" font-weight="700" fill="#047857">ORQA BO'LAK (128)</text>
      </g>
    `;
  }
}

const cuttingCalculator = new CuttingCalculatorEngine();

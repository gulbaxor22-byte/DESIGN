// patternCad.js - Multi-Model Dynamic Pattern Making, Grading CAD & DXF Generator

class PatternCadEngine {
  constructor() {
    this.currentSize = "122";
    this.seamAllowance = 0.7; // cm
    this.easeAllowance = 4.0; // cm
    this.activePiece = "all";
    this.showGradingOverlay = true;
    this.showDimensions = true;
    this.showSeamLines = true;
  }

  getPieceDimensions(sizeKey) {
    const std = (db.getSizeStandards && db.getSizeStandards()[sizeKey]) 
      ? db.getSizeStandards()[sizeKey] 
      : { height: parseInt(sizeKey) || 122, chest: 60, waist: 55, hips: 64, backLength: 28, sleeveLength: 42 };
    
    const chestHalf = (std.chest + this.easeAllowance) / 2;
    const bodyLength = std.backLength + 14;
    const sleeveLen = std.sleeveLength;
    const sleeveWidth = (std.chest / 3) + 4;
    const hoodHeight = 28 + (std.height - 92) * 0.1;
    const hoodWidth = 21 + (std.height - 92) * 0.08;
    const pantsLength = Math.round(std.height * 0.58);
    const pantsHipsHalf = Math.round((std.hips + this.easeAllowance) / 2);

    return {
      size: sizeKey,
      height: std.height,
      chestHalf: Math.round(chestHalf * 10) / 10,
      bodyLength: Math.round(bodyLength * 10) / 10,
      sleeveLen: Math.round(sleeveLen * 10) / 10,
      sleeveWidth: Math.round(sleeveWidth * 10) / 10,
      hoodHeight: Math.round(hoodHeight * 10) / 10,
      hoodWidth: Math.round(hoodWidth * 10) / 10,
      pantsLength: pantsLength,
      pantsHipsHalf: pantsHipsHalf,
      skirtLength: Math.round(std.height * 0.36)
    };
  }

  // Render Dynamic SVG Pattern for the Selected Model
  renderCadSvg(modelOrId, targetSize = this.currentSize) {
    let model = null;
    if (typeof modelOrId === 'object' && modelOrId !== null) {
      model = modelOrId;
    } else if (modelOrId) {
      model = db.getModelById(modelOrId);
    }
    if (!model) {
      model = db.getModels()[0] || {
        id: "mod-001",
        code: "K-025",
        name: "Bolalar Sport Tolstovka (Hoodie)",
        category: "cat_hoodie"
      };
    }

    const category = model.category || "cat_hoodie";
    const sizes = this.showGradingOverlay ? ["98", "110", "122", "134", "146"] : [targetSize];
    const baseDim = this.getPieceDimensions(targetSize);

    return `
      <svg viewBox="0 0 1060 670" class="cad-viewport-svg" id="cadPatternSvg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="cadGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" stroke-width="0.8"/>
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#cbd5e1" stroke-width="1.2"/>
          </pattern>
          <marker id="cadArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#0284c7"/>
          </marker>
        </defs>

        <!-- Canvas Background with CAD Millimeter Grid -->
        <rect width="1060" height="670" fill="#f8fafc"/>
        <rect width="1060" height="670" fill="url(#cadGrid)"/>

        <!-- MODEL INFO HEADER BANNER -->
        <g transform="translate(30, 30)">
          <rect x="0" y="0" width="460" height="68" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" opacity="0.96"/>
          <text x="16" y="24" font-family="'Fredoka', 'Outfit', sans-serif" font-weight="700" font-size="14.5" fill="#1e1b4b">
            📐 LEKALO KONSTRUKTOR — ${model.code}: ${model.name.toUpperCase()}
          </text>
          <text x="16" y="46" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" fill="#64748b">
            Kategoriya: <tspan font-weight="700" fill="#0284c7">${category.replace('cat_', '').toUpperCase()}</tspan> | Bazaviy: <tspan font-weight="700" fill="#0284c7">${targetSize} sm</tspan> | Chok: ${this.seamAllowance} sm | Erkinlik: +${this.easeAllowance} sm
          </text>
        </g>

        <!-- DYNAMIC PIECES ACCORDING TO MODEL CATEGORY -->
        ${this.renderCategoryPieces(category, sizes, targetSize, baseDim)}
      </svg>
    `;
  }

  renderCategoryPieces(category, sizes, targetSize, baseDim) {
    switch (category) {
      case 'cat_pants':
        return this.renderPantsPatterns(sizes, targetSize, baseDim);
      case 'cat_dress':
        return this.renderDressPatterns(sizes, targetSize, baseDim);
      case 'cat_polo':
        return this.renderPoloPatterns(sizes, targetSize, baseDim);
      case 'cat_jacket':
        return this.renderJacketPatterns(sizes, targetSize, baseDim);
      case 'cat_hoodie':
      default:
        return this.renderHoodiePatterns(sizes, targetSize, baseDim);
    }
  }

  // 1. HOODIE / TOLSTOVKA PATTERNS
  renderHoodiePatterns(sizes, targetSize, baseDim) {
    return `
      <!-- 1. OLD BO'LAK (FRONT) -->
      <g id="piece-front" transform="translate(50, 120)">
        ${sizes.map(s => {
          const d = this.getPieceDimensions(s);
          const w = d.chestHalf * 4.6;
          const h = d.bodyLength * 4.6;
          const isBase = (s === targetSize);
          return `
            <path d="M 0,42 Q ${w * 0.4},56 ${w * 0.6},0 L ${w},22 L ${w * 0.95},${h} L 0,${h} Z" 
                  fill="${isBase ? '#e0f2fe' : 'none'}" fill-opacity="${isBase ? '0.35' : '0'}"
                  stroke="${isBase ? '#0284c7' : '#94a3b8'}" stroke-width="${isBase ? 2.5 : 1}" stroke-dasharray="${isBase ? 'none' : '3,3'}" />
          `;
        }).join('')}
        ${this.showSeamLines ? `
          <path d="M 6,48 L ${baseDim.chestHalf * 4.6 - 6},26 L ${baseDim.chestHalf * 4.6 * 0.95 - 6},${baseDim.bodyLength * 4.6 - 6} L 6,${baseDim.bodyLength * 4.6 - 6} Z" stroke="#38bdf8" stroke-width="1" stroke-dasharray="4,3" fill="none"/>
        ` : ''}
        <line x1="${baseDim.chestHalf * 2.3}" y1="50" x2="${baseDim.chestHalf * 2.3}" y2="${baseDim.bodyLength * 4.6 - 40}" stroke="#0f172a" stroke-width="1.5" marker-start="url(#cadArrow)" marker-end="url(#cadArrow)"/>
        <text x="${baseDim.chestHalf * 2.3}" y="${baseDim.bodyLength * 2.2}" text-anchor="middle" font-family="'Fredoka', sans-serif" font-weight="700" font-size="13" fill="#0369a1">OLD BO'LAK (1x)</text>
        <text x="${baseDim.chestHalf * 2.3}" y="${baseDim.bodyLength * 2.2 + 18}" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="10.5" fill="#64748b">Eni: ${baseDim.chestHalf} sm | Bo'yi: ${baseDim.bodyLength} sm</text>
      </g>

      <!-- 2. ORQA BO'LAK (BACK) -->
      <g id="piece-back" transform="translate(300, 120)">
        ${sizes.map(s => {
          const d = this.getPieceDimensions(s);
          const w = d.chestHalf * 4.6;
          const h = d.bodyLength * 4.6;
          const isBase = (s === targetSize);
          return `
            <path d="M 0,16 Q ${w * 0.4},22 ${w * 0.6},0 L ${w},22 L ${w * 0.95},${h} L 0,${h} Z" 
                  fill="${isBase ? '#d1fae5' : 'none'}" fill-opacity="${isBase ? '0.35' : '0'}"
                  stroke="${isBase ? '#059669' : '#94a3b8'}" stroke-width="${isBase ? 2.5 : 1}" stroke-dasharray="${isBase ? 'none' : '3,3'}" />
          `;
        }).join('')}
        <line x1="${baseDim.chestHalf * 2.3}" y1="50" x2="${baseDim.chestHalf * 2.3}" y2="${baseDim.bodyLength * 4.6 - 40}" stroke="#0f172a" stroke-width="1.5" marker-start="url(#cadArrow)" marker-end="url(#cadArrow)"/>
        <text x="${baseDim.chestHalf * 2.3}" y="${baseDim.bodyLength * 2.2}" text-anchor="middle" font-family="'Fredoka', sans-serif" font-weight="700" font-size="13" fill="#047857">ORQA BO'LAK (1x)</text>
        <text x="${baseDim.chestHalf * 2.3}" y="${baseDim.bodyLength * 2.2 + 18}" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="10.5" fill="#64748b">Bukiq (Fold) chizig'i</text>
      </g>

      <!-- 3. YENG (SLEEVE) -->
      <g id="piece-sleeve" transform="translate(550, 120)">
        ${sizes.map(s => {
          const d = this.getPieceDimensions(s);
          const w = d.sleeveWidth * 5.4;
          const h = d.sleeveLen * 4.4;
          const isBase = (s === targetSize);
          return `
            <path d="M 0,45 Q ${w * 0.25},0 ${w * 0.5},12 Q ${w * 0.75},24 ${w},45 L ${w * 0.78},${h} L ${w * 0.22},${h} Z" 
                  fill="${isBase ? '#fef3c7' : 'none'}" fill-opacity="${isBase ? '0.35' : '0'}"
                  stroke="${isBase ? '#d97706' : '#94a3b8'}" stroke-width="${isBase ? 2.5 : 1}" stroke-dasharray="${isBase ? 'none' : '3,3'}" />
          `;
        }).join('')}
        <line x1="${baseDim.sleeveWidth * 2.7}" y1="50" x2="${baseDim.sleeveWidth * 2.7}" y2="${baseDim.sleeveLen * 4.4 - 20}" stroke="#0f172a" stroke-width="1.5" marker-start="url(#cadArrow)" marker-end="url(#cadArrow)"/>
        <text x="${baseDim.sleeveWidth * 2.7}" y="${baseDim.sleeveLen * 2.2}" text-anchor="middle" font-family="'Fredoka', sans-serif" font-weight="700" font-size="13" fill="#b45309">YENG (2x)</text>
        <text x="${baseDim.sleeveWidth * 2.7}" y="${baseDim.sleeveLen * 2.2 + 18}" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="10.5" fill="#64748b">Uzunligi: ${baseDim.sleeveLen} sm</text>
      </g>

      <!-- 4. KAPYUSHON (HOOD) -->
      <g id="piece-hood" transform="translate(790, 120)">
        ${sizes.map(s => {
          const d = this.getPieceDimensions(s);
          const w = d.hoodWidth * 5.2;
          const h = d.hoodHeight * 5.2;
          const isBase = (s === targetSize);
          return `
            <path d="M 0,0 Q ${w * 0.8},0 ${w},${h * 0.3} L ${w},${h} L 0,${h * 0.85} Z" 
                  fill="${isBase ? '#ede9fe' : 'none'}" fill-opacity="${isBase ? '0.35' : '0'}"
                  stroke="${isBase ? '#7c3aed' : '#94a3b8'}" stroke-width="${isBase ? 2.5 : 1}" stroke-dasharray="${isBase ? 'none' : '3,3'}" />
          `;
        }).join('')}
        <text x="${baseDim.hoodWidth * 2.6}" y="${baseDim.hoodHeight * 2.6}" text-anchor="middle" font-family="'Fredoka', sans-serif" font-weight="700" font-size="13" fill="#6d28d9">KAPYUSHON (2x)</text>
        <text x="${baseDim.hoodWidth * 2.6}" y="${baseDim.hoodHeight * 2.6 + 18}" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="10.5" fill="#64748b">O'ng va Chap bo'lak</text>
      </g>

      <!-- 5. KENGURU CHO'NTAK VA RIBANAlar -->
      <g id="piece-bottom" transform="translate(50, 440)">
        <path d="M 30,0 L 170,0 L 200,85 L 0,85 Z" fill="#fce7f3" stroke="#db2777" stroke-width="2"/>
        <text x="100" y="48" text-anchor="middle" font-family="'Fredoka', sans-serif" font-weight="700" font-size="12" fill="#be185d">KENGURU CHO'NTAK (1x)</text>

        <g transform="translate(260, 15)">
          <rect x="0" y="0" width="240" height="50" rx="4" fill="#f1f5f9" stroke="#475569" stroke-width="2"/>
          <text x="120" y="30" text-anchor="middle" font-family="'Fredoka', sans-serif" font-weight="700" font-size="12" fill="#334155">ETAK BELBOG'I (Ribana 2x2)</text>
        </g>

        <g transform="translate(550, 15)">
          <rect x="0" y="0" width="100" height="50" rx="4" fill="#f1f5f9" stroke="#475569" stroke-width="2"/>
          <text x="50" y="30" text-anchor="middle" font-family="'Fredoka', sans-serif" font-weight="700" font-size="12" fill="#334155">MANJET (2x)</text>
        </g>
      </g>
    `;
  }

  // 2. JOGGER SHIM (PANTS) PATTERNS
  renderPantsPatterns(sizes, targetSize, baseDim) {
    return `
      <!-- 1. OLD BOLDIR BO'LAGI (FRONT TROUSER LEG) -->
      <g id="piece-pants-front" transform="translate(60, 120)">
        ${sizes.map(s => {
          const d = this.getPieceDimensions(s);
          const w = d.pantsHipsHalf * 5.2;
          const h = d.pantsLength * 5.4;
          const isBase = (s === targetSize);
          return `
            <path d="M 0,0 L ${w * 0.8},0 Q ${w},${h * 0.28} ${w * 0.75},${h * 0.32} L ${w * 0.55},${h} L ${w * 0.15},${h} L 0,${h * 0.32} Z" 
                  fill="${isBase ? '#e0f2fe' : 'none'}" fill-opacity="${isBase ? '0.35' : '0'}"
                  stroke="${isBase ? '#0284c7' : '#94a3b8'}" stroke-width="${isBase ? 2.5 : 1}" stroke-dasharray="${isBase ? 'none' : '3,3'}" />
          `;
        }).join('')}
        <line x1="${baseDim.pantsHipsHalf * 2.6}" y1="30" x2="${baseDim.pantsHipsHalf * 2.6}" y2="${baseDim.pantsLength * 5.4 - 30}" stroke="#0f172a" stroke-width="1.5" marker-start="url(#cadArrow)" marker-end="url(#cadArrow)"/>
        <text x="${baseDim.pantsHipsHalf * 2.6}" y="${baseDim.pantsLength * 2.7}" text-anchor="middle" font-family="'Fredoka', sans-serif" font-weight="700" font-size="13" fill="#0369a1">OLD BOLDIR BO'LAK (2x)</text>
        <text x="${baseDim.pantsHipsHalf * 2.6}" y="${baseDim.pantsLength * 2.7 + 18}" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="10.5" fill="#64748b">Bo'yi: ${baseDim.pantsLength} sm | Cho'ntak o'yig'i</text>
      </g>

      <!-- 2. ORQA BOLDIR BO'LAGI (BACK TROUSER LEG) -->
      <g id="piece-pants-back" transform="translate(360, 120)">
        ${sizes.map(s => {
          const d = this.getPieceDimensions(s);
          const w = d.pantsHipsHalf * 6.0;
          const h = d.pantsLength * 5.4;
          const isBase = (s === targetSize);
          return `
            <path d="M 0,15 L ${w * 0.85},0 Q ${w * 1.05},${h * 0.3} ${w * 0.8},${h * 0.34} L ${w * 0.6},${h} L ${w * 0.15},${h} L 0,${h * 0.34} Z" 
                  fill="${isBase ? '#d1fae5' : 'none'}" fill-opacity="${isBase ? '0.35' : '0'}"
                  stroke="${isBase ? '#059669' : '#94a3b8'}" stroke-width="${isBase ? 2.5 : 1}" stroke-dasharray="${isBase ? 'none' : '3,3'}" />
          `;
        }).join('')}
        <line x1="${baseDim.pantsHipsHalf * 3.0}" y1="30" x2="${baseDim.pantsHipsHalf * 3.0}" y2="${baseDim.pantsLength * 5.4 - 30}" stroke="#0f172a" stroke-width="1.5" marker-start="url(#cadArrow)" marker-end="url(#cadArrow)"/>
        <text x="${baseDim.pantsHipsHalf * 3.0}" y="${baseDim.pantsLength * 2.7}" text-anchor="middle" font-family="'Fredoka', sans-serif" font-weight="700" font-size="13" fill="#047857">ORQA BOLDIR BO'LAK (2x)</text>
        <text x="${baseDim.pantsHipsHalf * 3.0}" y="${baseDim.pantsLength * 2.7 + 18}" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="10.5" fill="#64748b">Kengaytirilgan o'tirish o'yig'i</text>
      </g>

      <!-- 3. CHO'NTAK QOPCHASI VA KAMAR -->
      <g id="piece-pants-trims" transform="translate(720, 130)">
        <path d="M 0,0 L 140,0 L 140,150 Q 70,180 0,140 Z" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
        <text x="70" y="80" text-anchor="middle" font-family="'Fredoka', sans-serif" font-weight="700" font-size="12" fill="#b45309">CHO'NTAK QOPCHASI (2x)</text>

        <g transform="translate(0, 210)">
          <rect x="0" y="0" width="280" height="60" rx="4" fill="#f1f5f9" stroke="#475569" stroke-width="2"/>
          <text x="140" y="35" text-anchor="middle" font-family="'Fredoka', sans-serif" font-weight="700" font-size="12" fill="#334155">REZINKALI KAMAR (1x)</text>
        </g>

        <g transform="translate(0, 290)">
          <rect x="0" y="0" width="130" height="50" rx="4" fill="#ede9fe" stroke="#7c3aed" stroke-width="2"/>
          <text x="65" y="30" text-anchor="middle" font-family="'Fredoka', sans-serif" font-weight="700" font-size="12" fill="#6d28d9">PAQSA MANJET (2x)</text>
        </g>
      </g>
    `;
  }

  // 3. DRESS (MALIKA KO'YLAGI) PATTERNS
  renderDressPatterns(sizes, targetSize, baseDim) {
    return `
      <!-- 1. OLD KO'KRAK BO'LAK (FRONT BODICE) -->
      <g id="piece-dress-front" transform="translate(50, 120)">
        ${sizes.map(s => {
          const d = this.getPieceDimensions(s);
          const w = d.chestHalf * 4.6;
          const h = (d.bodyLength * 0.55) * 4.6;
          const isBase = (s === targetSize);
          return `
            <path d="M 0,35 Q ${w * 0.4},45 ${w * 0.6},0 L ${w},20 L ${w * 0.95},${h} L 0,${h} Z" 
                  fill="${isBase ? '#fce7f3' : 'none'}" fill-opacity="${isBase ? '0.35' : '0'}"
                  stroke="${isBase ? '#db2777' : '#94a3b8'}" stroke-width="${isBase ? 2.5 : 1}" stroke-dasharray="${isBase ? 'none' : '3,3'}" />
          `;
        }).join('')}
        <text x="${baseDim.chestHalf * 2.3}" y="${(baseDim.bodyLength * 0.55) * 2.3}" text-anchor="middle" font-family="'Fredoka', sans-serif" font-weight="700" font-size="13" fill="#be185d">OLD KO'KRAK (1x)</text>
      </g>

      <!-- 2. ORQA KO'KRAK BO'LAK (BACK BODICE) -->
      <g id="piece-dress-back" transform="translate(300, 120)">
        ${sizes.map(s => {
          const d = this.getPieceDimensions(s);
          const w = d.chestHalf * 4.6;
          const h = (d.bodyLength * 0.55) * 4.6;
          const isBase = (s === targetSize);
          return `
            <path d="M 0,15 Q ${w * 0.4},20 ${w * 0.6},0 L ${w},20 L ${w * 0.95},${h} L 0,${h} Z" 
                  fill="${isBase ? '#ede9fe' : 'none'}" fill-opacity="${isBase ? '0.35' : '0'}"
                  stroke="${isBase ? '#7c3aed' : '#94a3b8'}" stroke-width="${isBase ? 2.5 : 1}" stroke-dasharray="${isBase ? 'none' : '3,3'}" />
          `;
        }).join('')}
        <text x="${baseDim.chestHalf * 2.3}" y="${(baseDim.bodyLength * 0.55) * 2.3}" text-anchor="middle" font-family="'Fredoka', sans-serif" font-weight="700" font-size="13" fill="#6d28d9">ORQA KO'KRAK (2x)</text>
        <text x="${baseDim.chestHalf * 2.3}" y="${(baseDim.bodyLength * 0.55) * 2.3 + 18}" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="10.5" fill="#64748b">Zamok qo'yish choki</text>
      </g>

      <!-- 3. KENG BURMALI YUBKA (FLARED SKIRT) -->
      <g id="piece-dress-skirt" transform="translate(560, 120)">
        ${sizes.map(s => {
          const d = this.getPieceDimensions(s);
          const w = d.chestHalf * 7.5;
          const h = d.skirtLength * 4.8;
          const isBase = (s === targetSize);
          return `
            <path d="M ${w * 0.15},0 Q ${w * 0.5},10 ${w * 0.85},0 L ${w},${h} Q ${w * 0.5},${h + 20} 0,${h} Z" 
                  fill="${isBase ? '#fdf2f8' : 'none'}" fill-opacity="${isBase ? '0.4' : '0'}"
                  stroke="${isBase ? '#ec4899' : '#94a3b8'}" stroke-width="${isBase ? 2.5 : 1}" stroke-dasharray="${isBase ? 'none' : '3,3'}" />
          `;
        }).join('')}
        <text x="${baseDim.chestHalf * 3.75}" y="${baseDim.skirtLength * 2.4}" text-anchor="middle" font-family="'Fredoka', sans-serif" font-weight="700" font-size="14" fill="#db2777">BURMALI YUBKA BO'LAK (2x)</text>
        <text x="${baseDim.chestHalf * 3.75}" y="${baseDim.skirtLength * 2.4 + 20}" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" fill="#64748b">Eni: ${baseDim.chestHalf * 2} sm | Bo'yi: ${baseDim.skirtLength} sm</text>
      </g>

      <!-- 4. FONARIK YENG & BEL BANT -->
      <g id="piece-dress-sleeve" transform="translate(50, 380)">
        <path d="M 0,35 Q 70,0 140,35 L 120,110 L 20,110 Z" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
        <text x="70" y="70" text-anchor="middle" font-family="'Fredoka', sans-serif" font-weight="700" font-size="12" fill="#b45309">FONARIK YENG (2x)</text>

        <g transform="translate(240, 20)">
          <rect x="0" y="0" width="260" height="40" rx="4" fill="#f1f5f9" stroke="#475569" stroke-width="2"/>
          <text x="130" y="25" text-anchor="middle" font-family="'Fredoka', sans-serif" font-weight="700" font-size="12" fill="#334155">BEL KAMAR BOG'ICHI (1x)</text>
        </g>
      </g>
    `;
  }

  // 4. POLO FUTBOLKA PATTERNS
  renderPoloPatterns(sizes, targetSize, baseDim) {
    return `
      <!-- 1. OLD BO'LAK (FRONT PLACKET) -->
      <g id="piece-polo-front" transform="translate(60, 120)">
        ${sizes.map(s => {
          const d = this.getPieceDimensions(s);
          const w = d.chestHalf * 4.6;
          const h = d.bodyLength * 4.6;
          const isBase = (s === targetSize);
          return `
            <path d="M 0,30 Q ${w * 0.4},38 ${w * 0.6},0 L ${w},18 L ${w * 0.96},${h} L 0,${h} Z" 
                  fill="${isBase ? '#e0f2fe' : 'none'}" fill-opacity="${isBase ? '0.35' : '0'}"
                  stroke="${isBase ? '#0284c7' : '#94a3b8'}" stroke-width="${isBase ? 2.5 : 1}" stroke-dasharray="${isBase ? 'none' : '3,3'}" />
          `;
        }).join('')}
        <!-- Placket cut line -->
        <line x1="0" y1="30" x2="0" y2="120" stroke="#ef4444" stroke-width="2" stroke-dasharray="4,2"/>
        <text x="${baseDim.chestHalf * 2.3}" y="${baseDim.bodyLength * 2.2}" text-anchor="middle" font-family="'Fredoka', sans-serif" font-weight="700" font-size="13" fill="#0369a1">OLD BO'LAK (1x)</text>
        <text x="${baseDim.chestHalf * 2.3}" y="${baseDim.bodyLength * 2.2 + 18}" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="10.5" fill="#64748b">Planka o'yig'i: 12 sm</text>
      </g>

      <!-- 2. ORQA BO'LAK (BACK) -->
      <g id="piece-polo-back" transform="translate(320, 120)">
        ${sizes.map(s => {
          const d = this.getPieceDimensions(s);
          const w = d.chestHalf * 4.6;
          const h = d.bodyLength * 4.6;
          const isBase = (s === targetSize);
          return `
            <path d="M 0,14 Q ${w * 0.4},18 ${w * 0.6},0 L ${w},18 L ${w * 0.96},${h} L 0,${h} Z" 
                  fill="${isBase ? '#d1fae5' : 'none'}" fill-opacity="${isBase ? '0.35' : '0'}"
                  stroke="${isBase ? '#059669' : '#94a3b8'}" stroke-width="${isBase ? 2.5 : 1}" stroke-dasharray="${isBase ? 'none' : '3,3'}" />
          `;
        }).join('')}
        <text x="${baseDim.chestHalf * 2.3}" y="${baseDim.bodyLength * 2.2}" text-anchor="middle" font-family="'Fredoka', sans-serif" font-weight="700" font-size="13" fill="#047857">ORQA BO'LAK (1x)</text>
      </g>

      <!-- 3. QISQA YENG & POLO YOQASI -->
      <g id="piece-polo-sleeve" transform="translate(580, 120)">
        <path d="M 0,40 Q 80,0 160,40 L 140,140 L 20,140 Z" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
        <text x="80" y="85" text-anchor="middle" font-family="'Fredoka', sans-serif" font-weight="700" font-size="12" fill="#b45309">QISQA YENG (2x)</text>

        <g transform="translate(200, 10)">
          <rect x="0" y="0" width="220" height="60" rx="6" fill="#f8fafc" stroke="#475569" stroke-width="2"/>
          <text x="110" y="35" text-anchor="middle" font-family="'Fredoka', sans-serif" font-weight="700" font-size="12" fill="#1e1b4b">POLO YOQASI (1x)</text>
        </g>

        <g transform="translate(200, 90)">
          <rect x="0" y="0" width="100" height="40" rx="3" fill="#e0e7ff" stroke="#4338ca" stroke-width="2"/>
          <text x="50" y="25" text-anchor="middle" font-family="'Fredoka', sans-serif" font-weight="700" font-size="11" fill="#4338ca">PLANKA (2x)</text>
        </g>
      </g>
    `;
  }

  // 5. DEMI KURTKA (JACKET) PATTERNS
  renderJacketPatterns(sizes, targetSize, baseDim) {
    return `
      <!-- 1. OLD BO'LAK (JACKET FRONT) -->
      <g id="piece-jacket-front" transform="translate(60, 120)">
        ${sizes.map(s => {
          const d = this.getPieceDimensions(s);
          const w = (d.chestHalf + 2) * 4.6;
          const h = (d.bodyLength + 4) * 4.6;
          const isBase = (s === targetSize);
          return `
            <path d="M 0,35 Q ${w * 0.4},45 ${w * 0.6},0 L ${w},22 L ${w * 0.95},${h} L 0,${h} Z" 
                  fill="${isBase ? '#e0f2fe' : 'none'}" fill-opacity="${isBase ? '0.35' : '0'}"
                  stroke="${isBase ? '#0284c7' : '#94a3b8'}" stroke-width="${isBase ? 2.5 : 1}" stroke-dasharray="${isBase ? 'none' : '3,3'}" />
          `;
        }).join('')}
        <line x1="0" y1="0" x2="0" y2="${(baseDim.bodyLength + 4) * 4.6}" stroke="#0284c7" stroke-width="3"/>
        <text x="${(baseDim.chestHalf + 2) * 2.3}" y="${(baseDim.bodyLength + 4) * 2.3}" text-anchor="middle" font-family="'Fredoka', sans-serif" font-weight="700" font-size="13" fill="#0369a1">OLD BO'LAK (2x - O'ng/Chap)</text>
        <text x="${(baseDim.chestHalf + 2) * 2.3}" y="${(baseDim.bodyLength + 4) * 2.3 + 18}" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="10.5" fill="#64748b">Zamok qo'yish zaxirasi bilan</text>
      </g>

      <!-- 2. ORQA BO'LAK (JACKET BACK) -->
      <g id="piece-jacket-back" transform="translate(330, 120)">
        ${sizes.map(s => {
          const d = this.getPieceDimensions(s);
          const w = (d.chestHalf + 2) * 4.6;
          const h = (d.bodyLength + 4) * 4.6;
          const isBase = (s === targetSize);
          return `
            <path d="M 0,16 Q ${w * 0.4},22 ${w * 0.6},0 L ${w},22 L ${w * 0.95},${h} L 0,${h} Z" 
                  fill="${isBase ? '#d1fae5' : 'none'}" fill-opacity="${isBase ? '0.35' : '0'}"
                  stroke="${isBase ? '#059669' : '#94a3b8'}" stroke-width="${isBase ? 2.5 : 1}" stroke-dasharray="${isBase ? 'none' : '3,3'}" />
          `;
        }).join('')}
        <text x="${(baseDim.chestHalf + 2) * 2.3}" y="${(baseDim.bodyLength + 4) * 2.3}" text-anchor="middle" font-family="'Fredoka', sans-serif" font-weight="700" font-size="13" fill="#047857">ORQA BO'LAK (1x)</text>
      </g>

      <!-- 3. RELYEFLI YENG & KAPYUSHON -->
      <g id="piece-jacket-sleeve" transform="translate(600, 120)">
        <path d="M 0,45 Q 70,0 140,20 Q 180,45 200,60 L 160,240 L 40,240 Z" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
        <text x="100" y="140" text-anchor="middle" font-family="'Fredoka', sans-serif" font-weight="700" font-size="12" fill="#b45309">KURTKA YENG (2x)</text>

        <g transform="translate(230, 10)">
          <path d="M 0,0 Q 100,0 130,40 L 130,160 L 0,140 Z" fill="#ede9fe" stroke="#7c3aed" stroke-width="2"/>
          <text x="65" y="80" text-anchor="middle" font-family="'Fredoka', sans-serif" font-weight="700" font-size="12" fill="#6d28d9">KAPYUSHON (2x)</text>
        </g>
      </g>
    `;
  }

  // Generate standard CAD DXF string format for download
  generateDxfContent(modelOrId, targetSize = this.currentSize) {
    let model = null;
    if (typeof modelOrId === 'object' && modelOrId !== null) model = modelOrId;
    else if (modelOrId) model = db.getModelById(modelOrId);
    if (!model) model = db.getModels()[0] || { code: "K-025", name: "Hoodie" };

    const dim = this.getPieceDimensions(targetSize);
    return `0
SECTION
2
HEADER
9
$ACADVER
1
AC1009
0
ENDSEC
0
SECTION
2
TABLES
0
TABLE
2
LAYER
70
1
0
LAYER
2
PATTERNS_CUT
70
0
62
7
6
CONTINUOUS
0
ENDTAB
0
ENDSEC
0
SECTION
2
ENTITIES
0
TEXT
8
PATTERNS_CUT
10
100.0
20
600.0
30
0.0
40
25.0
1
MODEL: ${model.code} ${model.name.toUpperCase()} SIZE: ${targetSize}CM SEAM: ${this.seamAllowance}CM
0
POLYLINE
8
PATTERNS_CUT
66
1
70
1
0
VERTEX
8
PATTERNS_CUT
10
0.0
20
0.0
0
VERTEX
8
PATTERNS_CUT
10
${dim.chestHalf * 10}
20
0.0
0
VERTEX
8
PATTERNS_CUT
10
${dim.chestHalf * 9.5}
20
${dim.bodyLength * 10}
0
VERTEX
8
PATTERNS_CUT
10
0.0
20
${dim.bodyLength * 10}
0
SEQEND
0
ENDSEC
0
EOF`;
  }
}

const patternCad = new PatternCadEngine();

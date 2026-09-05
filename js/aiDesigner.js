// aiDesigner.js - AI Kids Fashion Design & Conceptual Rendering Engine

class AiDesignerEngine {
  constructor() {
    this.currentConcept = {
      gender: "gender_girl",
      age: "8",
      category: "cat_hoodie",
      primaryColor: "#f472b6", // soft pastel pink
      secondaryColor: "#ffffff", // white
      accentColor: "#fb7185", // rose
      fabric: "Futer 3-ipli",
      pocketStyle: "kangaroo", // kangaroo, welt, side, none
      hasHood: true,
      hasZipper: false,
      hasRibCuffs: true,
      hasLampas: true,
      printGraphic: "stars", // stars, bear, typography, floral, plain
      promptText: "8 yoshli qiz bola uchun zamonaviy sport kostyum, pushti va oq rang, kapyushonli, oldida cho'ntak, yon tomonida dekorativ lampas."
    };
  }

  setPrompt(text) {
    this.currentConcept.promptText = text;
    this.parsePrompt(text);
  }

  parsePrompt(text) {
    const lower = text.toLowerCase();
    
    // Gender detection
    if (lower.includes('qiz') || lower.includes('девочк') || lower.includes('girl')) {
      this.currentConcept.gender = 'gender_girl';
      this.currentConcept.primaryColor = '#f472b6';
    } else if (lower.includes("o'g'il") || lower.includes("o‘g‘il") || lower.includes('мальчик') || lower.includes('boy')) {
      this.currentConcept.gender = 'gender_boy';
      this.currentConcept.primaryColor = '#0284c7';
    }

    // Category detection
    if (lower.includes('hoodie') || lower.includes('tolstovka') || lower.includes('kapyushon') || lower.includes('худи')) {
      this.currentConcept.category = 'cat_hoodie';
      this.currentConcept.hasHood = true;
    } else if (lower.includes('shim') || lower.includes('jogger') || lower.includes('брюки') || lower.includes('pants')) {
      this.currentConcept.category = 'cat_pants';
      this.currentConcept.hasHood = false;
    } else if (lower.includes("ko'ylak") || lower.includes('платье') || lower.includes('dress')) {
      this.currentConcept.category = 'cat_dress';
      this.currentConcept.hasHood = false;
    } else if (lower.includes('polo') || lower.includes('поло')) {
      this.currentConcept.category = 'cat_polo';
      this.currentConcept.hasHood = false;
    } else if (lower.includes('kurtka') || lower.includes('ветровка') || lower.includes('jacket')) {
      this.currentConcept.category = 'cat_jacket';
      this.currentConcept.hasHood = true;
      this.currentConcept.hasZipper = true;
    }

    // Color detection
    if (lower.includes('pushti') || lower.includes('розов') || lower.includes('pink')) {
      this.currentConcept.primaryColor = '#f472b6';
    } else if (lower.includes('ko\'k') || lower.includes('moviy') || lower.includes('синий') || lower.includes('голуб') || lower.includes('blue')) {
      this.currentConcept.primaryColor = '#0284c7';
    } else if (lower.includes('sariq') || lower.includes('желт') || lower.includes('yellow')) {
      this.currentConcept.primaryColor = '#fbbf24';
    } else if (lower.includes('yashil') || lower.includes('yalpiz') || lower.includes('зелен') || lower.includes('green') || lower.includes('mint')) {
      this.currentConcept.primaryColor = '#10b981';
    } else if (lower.includes('qora') || lower.includes('antratsit') || lower.includes('черн') || lower.includes('black')) {
      this.currentConcept.primaryColor = '#334155';
    } else if (lower.includes('siyohrang') || lower.includes('фиолет') || lower.includes('purple')) {
      this.currentConcept.primaryColor = '#a855f7';
    }

    // Details detection
    this.currentConcept.hasLampas = lower.includes('lampas') || lower.includes('полос') || lower.includes('stripe');
    this.currentConcept.hasZipper = lower.includes('zamok') || lower.includes('molniya') || lower.includes('молния') || lower.includes('zipper');
    this.currentConcept.pocketStyle = (lower.includes("cho'ntak") || lower.includes('карман') || lower.includes('pocket')) ? 'kangaroo' : 'none';
  }

  // Generate SVG Renderings for Front, Back, Side
  renderFrontSvg() {
    const { primaryColor, secondaryColor, accentColor, category, hasHood, hasZipper, pocketStyle, hasLampas, printGraphic } = this.currentConcept;

    if (category === 'cat_pants') {
      return `
        <svg viewBox="0 0 300 420" class="concept-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="shadow" x="-5%" y="-5%" width="110%" height="115%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" flood-opacity="0.15"/>
            </filter>
            <linearGradient id="pantsGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="${primaryColor}" stop-opacity="0.9"/>
              <stop offset="50%" stop-color="${primaryColor}"/>
              <stop offset="100%" stop-color="${primaryColor}" stop-opacity="0.85"/>
            </linearGradient>
          </defs>
          <!-- Shadow -->
          <ellipse cx="150" cy="405" rx="80" ry="10" fill="#000000" opacity="0.1"/>
          
          <!-- Pants Body -->
          <g filter="url(#shadow)">
            <path d="M 85,60 L 215,60 L 225,180 L 210,380 L 170,380 L 150,170 L 130,380 L 90,380 L 75,180 Z" fill="url(#pantsGrad)" stroke="#1e293b" stroke-width="2" stroke-linejoin="round"/>
            
            <!-- Side Lampas -->
            ${hasLampas ? `
              <path d="M 85,60 L 75,180 L 90,380 L 97,380 L 83,180 L 93,60 Z" fill="${secondaryColor}" stroke="#cbd5e1" stroke-width="1"/>
              <path d="M 215,60 L 225,180 L 210,380 L 203,380 L 217,180 L 207,60 Z" fill="${secondaryColor}" stroke="#cbd5e1" stroke-width="1"/>
            ` : ''}

            <!-- Waistband (Rib) -->
            <rect x="80" y="38" width="140" height="24" rx="4" fill="${primaryColor}" stroke="#1e293b" stroke-width="2"/>
            <!-- Waist Drawstrings -->
            <path d="M 142,50 Q 140,75 135,95" stroke="${secondaryColor}" stroke-width="4" stroke-linecap="round" fill="none"/>
            <path d="M 158,50 Q 160,75 165,95" stroke="${secondaryColor}" stroke-width="4" stroke-linecap="round" fill="none"/>
            <circle cx="142" cy="50" r="3" fill="#334155"/>
            <circle cx="158" cy="50" r="3" fill="#334155"/>

            <!-- Side Pockets -->
            <path d="M 100,75 Q 115,115 110,135" stroke="#1e293b" stroke-width="2" stroke-dasharray="3,2" fill="none"/>
            <path d="M 200,75 Q 185,115 190,135" stroke="#1e293b" stroke-width="2" stroke-dasharray="3,2" fill="none"/>

            <!-- Crotch seam -->
            <path d="M 150,60 L 150,170" stroke="#1e293b" stroke-width="2" stroke-dasharray="4,2"/>

            <!-- Ankle Cuffs (Rib) -->
            <rect x="88" y="378" width="44" height="20" rx="3" fill="${primaryColor}" stroke="#1e293b" stroke-width="2"/>
            <rect x="168" y="378" width="44" height="20" rx="3" fill="${primaryColor}" stroke="#1e293b" stroke-width="2"/>
            <line x1="88" y1="388" x2="132" y2="388" stroke="#334155" stroke-width="1" stroke-dasharray="2,2"/>
            <line x1="168" y1="388" x2="212" y2="388" stroke="#334155" stroke-width="1" stroke-dasharray="2,2"/>
          </g>
          <text x="150" y="25" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="700" font-size="14" fill="#334155">OLD KO'RINISH (FRONT)</text>
        </svg>
      `;
    }

    if (category === 'cat_dress') {
      return `
        <svg viewBox="0 0 300 420" class="concept-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="shadow" x="-5%" y="-5%" width="110%" height="115%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" flood-opacity="0.15"/>
            </filter>
            <linearGradient id="dressGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="${primaryColor}"/>
              <stop offset="100%" stop-color="${primaryColor}" stop-opacity="0.85"/>
            </linearGradient>
          </defs>
          <ellipse cx="150" cy="405" rx="90" ry="10" fill="#000000" opacity="0.1"/>
          
          <g filter="url(#shadow)">
            <!-- Flounce Sleeves -->
            <path d="M 85,100 Q 55,105 50,135 Q 75,145 95,130 Z" fill="${primaryColor}" stroke="#1e293b" stroke-width="1.5"/>
            <path d="M 215,100 Q 245,105 250,135 Q 225,145 205,130 Z" fill="${primaryColor}" stroke="#1e293b" stroke-width="1.5"/>

            <!-- Bodice (Front) -->
            <path d="M 110,80 Q 150,100 190,80 L 215,100 L 205,170 L 95,170 L 85,100 Z" fill="url(#dressGrad)" stroke="#1e293b" stroke-width="2"/>
            
            <!-- Neckline Binding -->
            <path d="M 110,80 Q 150,100 190,80" stroke="${secondaryColor}" stroke-width="4" fill="none"/>

            <!-- Flared Skirt -->
            <path d="M 95,170 Q 150,178 205,170 L 260,370 Q 150,395 40,370 Z" fill="url(#dressGrad)" stroke="#1e293b" stroke-width="2"/>
            
            <!-- Waist Gather details -->
            <path d="M 100,175 Q 110,210 112,230" stroke="#1e293b" stroke-width="1" stroke-dasharray="3,2" opacity="0.6"/>
            <path d="M 130,175 Q 135,220 138,245" stroke="#1e293b" stroke-width="1" stroke-dasharray="3,2" opacity="0.6"/>
            <path d="M 170,175 Q 165,220 162,245" stroke="#1e293b" stroke-width="1" stroke-dasharray="3,2" opacity="0.6"/>
            <path d="M 200,175 Q 190,210 188,230" stroke="#1e293b" stroke-width="1" stroke-dasharray="3,2" opacity="0.6"/>

            <!-- Decorative Bow / Belt -->
            <rect x="95" y="165" width="110" height="10" rx="3" fill="${secondaryColor}" stroke="#1e293b" stroke-width="1.5"/>
            <circle cx="150" cy="170" r="7" fill="${accentColor}" stroke="#1e293b" stroke-width="1.5"/>
            <path d="M 143,170 Q 135,160 128,170 Q 135,180 143,170" fill="${accentColor}" stroke="#1e293b" stroke-width="1.5"/>
            <path d="M 157,170 Q 165,160 172,170 Q 165,180 157,170" fill="${accentColor}" stroke="#1e293b" stroke-width="1.5"/>
          </g>
          <text x="150" y="25" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="700" font-size="14" fill="#334155">OLD KO'RINISH (FRONT)</text>
        </svg>
      `;
    }

    if (category === 'cat_polo') {
      return `
        <svg viewBox="0 0 300 420" class="concept-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="shadow" x="-5%" y="-5%" width="110%" height="115%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" flood-opacity="0.15"/>
            </filter>
            <linearGradient id="poloGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="${primaryColor}"/>
              <stop offset="50%" stop-color="${primaryColor}" stop-opacity="0.95"/>
              <stop offset="100%" stop-color="${primaryColor}"/>
            </linearGradient>
          </defs>
          <ellipse cx="150" cy="405" rx="75" ry="10" fill="#000000" opacity="0.1"/>
          
          <g filter="url(#shadow)">
            <!-- Short Sleeves -->
            <path d="M 95,95 L 40,165 L 65,185 L 98,140 Z" fill="${primaryColor}" stroke="#1e293b" stroke-width="2" stroke-linejoin="round"/>
            <path d="M 205,95 L 260,165 L 235,185 L 202,140 Z" fill="${primaryColor}" stroke="#1e293b" stroke-width="2" stroke-linejoin="round"/>
            <!-- Sleeve Rib Cuffs -->
            <rect x="42" y="162" width="28" height="24" rx="3" transform="rotate(35 42 162)" fill="${secondaryColor}" stroke="#1e293b" stroke-width="1.5"/>
            <rect x="232" y="178" width="28" height="24" rx="3" transform="rotate(-35 232 178)" fill="${secondaryColor}" stroke="#1e293b" stroke-width="1.5"/>

            <!-- Main Bodice -->
            <path d="M 95,95 L 205,95 L 210,340 L 90,340 Z" fill="url(#poloGrad)" stroke="#1e293b" stroke-width="2" stroke-linejoin="round"/>
            
            <!-- Side Slits at Hem -->
            <path d="M 90,320 L 90,340" stroke="#0f172a" stroke-width="3"/>
            <path d="M 210,320 L 210,340" stroke="#0f172a" stroke-width="3"/>

            <!-- Polo Placket & Buttons -->
            <rect x="141" y="92" width="18" height="75" rx="2" fill="${secondaryColor}" stroke="#1e293b" stroke-width="2"/>
            <circle cx="150" cy="110" r="3" fill="#334155"/>
            <circle cx="150" cy="130" r="3" fill="#334155"/>
            <circle cx="150" cy="150" r="3" fill="#334155"/>

            <!-- Polo Collar -->
            <path d="M 115,92 L 150,112 L 140,82 Z" fill="${secondaryColor}" stroke="#1e293b" stroke-width="2"/>
            <path d="M 185,92 L 150,112 L 160,82 Z" fill="${secondaryColor}" stroke="#1e293b" stroke-width="2"/>
            <path d="M 115,92 Q 150,115 185,92 Q 150,75 115,92 Z" fill="${secondaryColor}" stroke="#1e293b" stroke-width="2"/>

            <!-- Chest Embroidery Logo -->
            <circle cx="178" cy="135" r="7" fill="${secondaryColor}" stroke="#1e293b" stroke-width="1"/>
            <polygon points="178,131 180,135 184,135 181,137 182,141 178,138 174,141 175,137 172,135 176,135" fill="${accentColor}"/>
          </g>
          <text x="150" y="25" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="700" font-size="14" fill="#334155">OLD KO'RINISH (FRONT)</text>
        </svg>
      `;
    }

    if (category === 'cat_jacket') {
      return `
        <svg viewBox="0 0 300 420" class="concept-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="shadow" x="-5%" y="-5%" width="110%" height="115%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" flood-opacity="0.15"/>
            </filter>
            <linearGradient id="jacketGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="${primaryColor}"/>
              <stop offset="50%" stop-color="${primaryColor}" stop-opacity="0.95"/>
              <stop offset="100%" stop-color="${primaryColor}"/>
            </linearGradient>
          </defs>
          <ellipse cx="150" cy="405" rx="85" ry="10" fill="#000000" opacity="0.1"/>

          <g filter="url(#shadow)">
            <!-- Jacket Sleeves (Raglan / Quilted) -->
            <path d="M 90,85 L 20,240 L 50,258 L 95,160 Z" fill="${primaryColor}" stroke="#1e293b" stroke-width="2" stroke-linejoin="round"/>
            <path d="M 210,85 L 280,240 L 250,258 L 205,160 Z" fill="${primaryColor}" stroke="#1e293b" stroke-width="2" stroke-linejoin="round"/>
            
            <!-- Quilt stitch lines on sleeves -->
            <line x1="45" y1="140" x2="80" y2="120" stroke="#1e293b" stroke-width="1.5" stroke-dasharray="3,2"/>
            <line x1="35" y1="180" x2="70" y2="160" stroke="#1e293b" stroke-width="1.5" stroke-dasharray="3,2"/>
            <line x1="255" y1="140" x2="220" y2="120" stroke="#1e293b" stroke-width="1.5" stroke-dasharray="3,2"/>
            <line x1="265" y1="180" x2="230" y2="160" stroke="#1e293b" stroke-width="1.5" stroke-dasharray="3,2"/>

            <!-- Main Bodice -->
            <path d="M 90,85 L 210,85 L 220,330 L 80,330 Z" fill="url(#jacketGrad)" stroke="#1e293b" stroke-width="2" stroke-linejoin="round"/>

            <!-- Horizontal Quilted Panels -->
            <line x1="86" y1="150" x2="214" y2="150" stroke="#1e293b" stroke-width="1.5" stroke-dasharray="3,2"/>
            <line x1="83" y1="210" x2="217" y2="210" stroke="#1e293b" stroke-width="1.5" stroke-dasharray="3,2"/>
            <line x1="81" y1="270" x2="219" y2="270" stroke="#1e293b" stroke-width="1.5" stroke-dasharray="3,2"/>

            <!-- Stand Collar / Storm Hood -->
            <path d="M 95,85 Q 85,25 150,20 Q 215,25 205,85 Z" fill="${primaryColor}" stroke="#1e293b" stroke-width="2"/>
            <path d="M 115,85 L 115,65 L 185,65 L 185,85 Z" fill="${secondaryColor}" stroke="#1e293b" stroke-width="2"/>

            <!-- Front Heavy Duty Zipper with Puller -->
            <line x1="150" y1="65" x2="150" y2="330" stroke="#1e293b" stroke-width="4"/>
            <rect x="145" y="90" width="10" height="18" rx="3" fill="#94a3b8" stroke="#1e293b" stroke-width="1.5"/>

            <!-- Zippered Side Pockets -->
            <line x1="100" y1="250" x2="125" y2="280" stroke="#1e293b" stroke-width="3" stroke-linecap="round"/>
            <line x1="200" y1="250" x2="175" y2="280" stroke="#1e293b" stroke-width="3" stroke-linecap="round"/>

            <!-- Bottom Drawstring Hem -->
            <rect x="78" y="328" width="144" height="14" rx="3" fill="${secondaryColor}" stroke="#1e293b" stroke-width="2"/>
          </g>
          <text x="150" y="25" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="700" font-size="14" fill="#334155">OLD KO'RINISH (FRONT)</text>
        </svg>
      `;
    }

    // Default: Hoodie / Tracksuit Jacket
    return `
      <svg viewBox="0 0 300 420" class="concept-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="shadow" x="-5%" y="-5%" width="110%" height="115%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" flood-opacity="0.15"/>
          </filter>
          <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="${primaryColor}"/>
            <stop offset="50%" stop-color="${primaryColor}" stop-opacity="0.95"/>
            <stop offset="100%" stop-color="${primaryColor}"/>
          </linearGradient>
        </defs>
        <ellipse cx="150" cy="405" rx="80" ry="10" fill="#000000" opacity="0.1"/>

        <g filter="url(#shadow)">
          <!-- Sleeves -->
          <path d="M 95,95 L 30,240 L 55,255 L 98,160 Z" fill="${primaryColor}" stroke="#1e293b" stroke-width="2" stroke-linejoin="round"/>
          <path d="M 205,95 L 270,240 L 245,255 L 202,160 Z" fill="${primaryColor}" stroke="#1e293b" stroke-width="2" stroke-linejoin="round"/>

          <!-- Sleeve Rib Cuffs -->
          ${hasRibCuffs ? `
            <path d="M 30,240 L 18,265 L 42,275 L 55,255 Z" fill="${primaryColor}" stroke="#1e293b" stroke-width="2"/>
            <path d="M 270,240 L 282,265 L 258,275 L 245,255 Z" fill="${primaryColor}" stroke="#1e293b" stroke-width="2"/>
          ` : ''}

          <!-- Sleeve Lampas stripes -->
          ${hasLampas ? `
            <path d="M 92,98 L 27,242 L 35,246 L 98,105 Z" fill="${secondaryColor}" stroke="#cbd5e1" stroke-width="0.5"/>
            <path d="M 208,98 L 273,242 L 265,246 L 202,105 Z" fill="${secondaryColor}" stroke="#cbd5e1" stroke-width="0.5"/>
          ` : ''}

          <!-- Main Bodice -->
          <path d="M 95,95 L 205,95 L 215,310 L 85,310 Z" fill="url(#bodyGrad)" stroke="#1e293b" stroke-width="2" stroke-linejoin="round"/>

          <!-- Side Color Block Accent (if enabled) -->
          ${hasLampas ? `
            <path d="M 85,310 L 95,95 L 105,95 L 98,310 Z" fill="${secondaryColor}" opacity="0.8"/>
            <path d="M 215,310 L 205,95 L 195,95 L 202,310 Z" fill="${secondaryColor}" opacity="0.8"/>
          ` : ''}

          <!-- Hood -->
          ${hasHood ? `
            <path d="M 105,95 Q 85,30 150,25 Q 215,30 195,95 Q 150,115 105,95 Z" fill="${primaryColor}" stroke="#1e293b" stroke-width="2"/>
            <path d="M 120,95 Q 110,50 150,45 Q 190,50 180,95 Q 150,105 120,95 Z" fill="${secondaryColor}" stroke="#1e293b" stroke-width="1.5" opacity="0.9"/>
            <!-- Hood drawstrings -->
            <path d="M 135,95 Q 130,120 128,145" stroke="${secondaryColor}" stroke-width="3" stroke-linecap="round" fill="none"/>
            <path d="M 165,95 Q 170,120 172,145" stroke="${secondaryColor}" stroke-width="3" stroke-linecap="round" fill="none"/>
          ` : `
            <path d="M 115,95 Q 150,115 185,95" stroke="#1e293b" stroke-width="4" fill="none"/>
          `}

          <!-- Zipper or Graphic -->
          ${hasZipper ? `
            <line x1="150" y1="95" x2="150" y2="330" stroke="#334155" stroke-width="3" stroke-dasharray="2,1"/>
            <rect x="146" y="110" width="8" height="14" rx="2" fill="#94a3b8" stroke="#1e293b" stroke-width="1"/>
          ` : `
            <!-- Graphic Print on Chest -->
            <g transform="translate(150, 160)">
              <circle cx="0" cy="0" r="24" fill="${secondaryColor}" opacity="0.9"/>
              <polygon points="0,-15 4,-4 15,-4 7,3 10,14 0,7 -10,14 -7,3 -15,-4 -4,-4" fill="${accentColor}"/>
              <text x="0" y="32" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="9" fill="#1e293b" letter-spacing="2">MINISTARS</text>
            </g>
          `}

          <!-- Kangaroo Pocket -->
          ${pocketStyle === 'kangaroo' && !hasZipper ? `
            <path d="M 105,240 L 195,240 L 210,310 L 90,310 Z" fill="${primaryColor}" stroke="#1e293b" stroke-width="2"/>
            <path d="M 105,240 L 90,310" stroke="#cbd5e1" stroke-width="4" stroke-linecap="round"/>
            <path d="M 195,240 L 210,310" stroke="#cbd5e1" stroke-width="4" stroke-linecap="round"/>
            <line x1="105" y1="240" x2="195" y2="240" stroke="#1e293b" stroke-width="1.5" stroke-dasharray="3,2"/>
          ` : ''}

          <!-- Bottom Rib Band -->
          ${hasRibCuffs ? `
            <rect x="83" y="310" width="134" height="24" rx="3" fill="${primaryColor}" stroke="#1e293b" stroke-width="2"/>
            <line x1="83" y1="322" x2="217" y2="322" stroke="#334155" stroke-width="1" stroke-dasharray="3,2"/>
          ` : ''}
        </g>
        <text x="150" y="20" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="700" font-size="14" fill="#334155">OLD KO'RINISH (FRONT)</text>
      </svg>
    `;
  }

  renderBackSvg() {
    const { primaryColor, secondaryColor, category, hasHood, hasRibCuffs, hasLampas } = this.currentConcept;

    if (category === 'cat_dress') {
      return `
        <svg viewBox="0 0 300 420" class="concept-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="shadow" x="-5%" y="-5%" width="110%" height="115%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" flood-opacity="0.15"/>
            </filter>
          </defs>
          <ellipse cx="150" cy="405" rx="90" ry="10" fill="#000000" opacity="0.1"/>
          <g filter="url(#shadow)">
            <!-- Bodice Back -->
            <path d="M 110,80 Q 150,85 190,80 L 215,100 L 205,170 L 95,170 L 85,100 Z" fill="${primaryColor}" stroke="#1e293b" stroke-width="2"/>
            <!-- Back invisible zipper -->
            <line x1="150" y1="83" x2="150" y2="170" stroke="#1e293b" stroke-width="2" stroke-dasharray="4,2"/>
            <!-- Flared Skirt -->
            <path d="M 95,170 Q 150,178 205,170 L 260,370 Q 150,395 40,370 Z" fill="${primaryColor}" stroke="#1e293b" stroke-width="2"/>
          </g>
          <text x="150" y="25" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="700" font-size="14" fill="#334155">ORQA KO'RINISH (BACK)</text>
        </svg>
      `;
    }

    if (category === 'cat_pants') {
      return `
        <svg viewBox="0 0 300 420" class="concept-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="shadow" x="-5%" y="-5%" width="110%" height="115%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" flood-opacity="0.15"/>
            </filter>
          </defs>
          <ellipse cx="150" cy="405" rx="80" ry="10" fill="#000000" opacity="0.1"/>
          <g filter="url(#shadow)">
            <path d="M 85,60 L 215,60 L 225,180 L 210,380 L 170,380 L 150,180 L 130,380 L 90,380 L 75,180 Z" fill="${primaryColor}" stroke="#1e293b" stroke-width="2" stroke-linejoin="round"/>
            <!-- Back Pockets -->
            <path d="M 105,90 L 135,90 L 135,125 L 120,135 L 105,125 Z" fill="${primaryColor}" stroke="#1e293b" stroke-width="1.5"/>
            <path d="M 165,90 L 195,90 L 195,125 L 180,135 L 165,125 Z" fill="${primaryColor}" stroke="#1e293b" stroke-width="1.5"/>
            <!-- Waistband -->
            <rect x="80" y="38" width="140" height="24" rx="4" fill="${primaryColor}" stroke="#1e293b" stroke-width="2"/>
            <line x1="80" y1="50" x2="220" y2="50" stroke="#334155" stroke-width="1" stroke-dasharray="3,2"/>
            <!-- Cuffs -->
            <rect x="88" y="378" width="44" height="20" rx="3" fill="${primaryColor}" stroke="#1e293b" stroke-width="2"/>
            <rect x="168" y="378" width="44" height="20" rx="3" fill="${primaryColor}" stroke="#1e293b" stroke-width="2"/>
          </g>
          <text x="150" y="25" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="700" font-size="14" fill="#334155">ORQA KO'RINISH (BACK)</text>
        </svg>
      `;
    }

    if (category === 'cat_polo') {
      return `
        <svg viewBox="0 0 300 420" class="concept-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="shadow" x="-5%" y="-5%" width="110%" height="115%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" flood-opacity="0.15"/>
            </filter>
          </defs>
          <ellipse cx="150" cy="405" rx="75" ry="10" fill="#000000" opacity="0.1"/>
          <g filter="url(#shadow)">
            <path d="M 95,95 L 40,165 L 65,185 L 98,140 Z" fill="${primaryColor}" stroke="#1e293b" stroke-width="2"/>
            <path d="M 205,95 L 260,165 L 235,185 L 202,140 Z" fill="${primaryColor}" stroke="#1e293b" stroke-width="2"/>
            <path d="M 95,95 L 205,95 L 210,340 L 90,340 Z" fill="${primaryColor}" stroke="#1e293b" stroke-width="2"/>
            <path d="M 115,92 Q 150,105 185,92 Q 150,80 115,92 Z" fill="${secondaryColor}" stroke="#1e293b" stroke-width="2"/>
            <!-- Back Yoke -->
            <line x1="95" y1="120" x2="205" y2="120" stroke="#1e293b" stroke-width="1.5" stroke-dasharray="3,2"/>
          </g>
          <text x="150" y="25" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="700" font-size="14" fill="#334155">ORQA KO'RINISH (BACK)</text>
        </svg>
      `;
    }

    return `
      <svg viewBox="0 0 300 420" class="concept-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="shadow" x="-5%" y="-5%" width="110%" height="115%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" flood-opacity="0.15"/>
          </filter>
        </defs>
        <ellipse cx="150" cy="405" rx="80" ry="10" fill="#000000" opacity="0.1"/>

        <g filter="url(#shadow)">
          <!-- Sleeves -->
          <path d="M 95,95 L 30,240 L 55,255 L 98,160 Z" fill="${primaryColor}" stroke="#1e293b" stroke-width="2" stroke-linejoin="round"/>
          <path d="M 205,95 L 270,240 L 245,255 L 202,160 Z" fill="${primaryColor}" stroke="#1e293b" stroke-width="2" stroke-linejoin="round"/>

          <!-- Main Bodice -->
          <path d="M 95,95 L 205,95 L 215,310 L 85,310 Z" fill="${primaryColor}" stroke="#1e293b" stroke-width="2" stroke-linejoin="round"/>

          <!-- Back Hood (Down) -->
          ${hasHood ? `
            <path d="M 100,95 Q 150,75 200,95 Q 210,180 150,195 Q 90,180 100,95 Z" fill="${primaryColor}" stroke="#1e293b" stroke-width="2"/>
            <line x1="150" y1="85" x2="150" y2="195" stroke="#1e293b" stroke-width="1.5" stroke-dasharray="3,2"/>
          ` : ''}

          <!-- Back Big Typography -->
          <text x="150" y="240" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="900" font-size="20" fill="${secondaryColor}" opacity="0.85" letter-spacing="4">FUTURE</text>
          <text x="150" y="260" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="700" font-size="10" fill="${secondaryColor}" opacity="0.85" letter-spacing="3">ATHLETICS 26</text>

          <!-- Bottom Rib Band -->
          ${hasRibCuffs ? `
            <rect x="83" y="310" width="134" height="24" rx="3" fill="${primaryColor}" stroke="#1e293b" stroke-width="2"/>
          ` : ''}
        </g>
        <text x="150" y="20" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="700" font-size="14" fill="#334155">ORQA KO'RINISH (BACK)</text>
      </svg>
    `;
  }

  renderSideSvg() {
    const { primaryColor, secondaryColor, category, hasHood, hasLampas } = this.currentConcept;

    if (category === 'cat_pants') {
      return `
        <svg viewBox="0 0 300 420" class="concept-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="shadow" x="-5%" y="-5%" width="110%" height="115%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" flood-opacity="0.15"/>
            </filter>
          </defs>
          <ellipse cx="150" cy="405" rx="55" ry="10" fill="#000000" opacity="0.1"/>
          <g filter="url(#shadow)">
            <path d="M 120,60 L 180,60 L 190,180 L 175,380 L 135,380 L 120,180 Z" fill="${primaryColor}" stroke="#1e293b" stroke-width="2"/>
            <rect x="145" y="60" width="10" height="320" fill="${secondaryColor}" stroke="#cbd5e1" stroke-width="0.5"/>
            <rect x="116" y="38" width="68" height="24" rx="3" fill="${primaryColor}" stroke="#1e293b" stroke-width="2"/>
            <rect x="133" y="378" width="44" height="20" rx="3" fill="${primaryColor}" stroke="#1e293b" stroke-width="2"/>
          </g>
          <text x="150" y="20" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="700" font-size="14" fill="#334155">YON KO'RINISH (SIDE)</text>
        </svg>
      `;
    }

    return `
      <svg viewBox="0 0 300 420" class="concept-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="shadow" x="-5%" y="-5%" width="110%" height="115%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" flood-opacity="0.15"/>
          </filter>
        </defs>
        <ellipse cx="150" cy="405" rx="55" ry="10" fill="#000000" opacity="0.1"/>

        <g filter="url(#shadow)">
          <!-- Side Profile Body & Sleeve -->
          <path d="M 120,95 Q 165,100 175,95 L 185,310 L 115,310 Z" fill="${primaryColor}" stroke="#1e293b" stroke-width="2"/>
          
          <!-- Side Sleeve hanging -->
          <path d="M 130,95 Q 160,95 165,140 L 160,260 L 135,260 L 130,140 Z" fill="${primaryColor}" stroke="#1e293b" stroke-width="2"/>

          <!-- Side Lampas down the sleeve -->
          ${hasLampas ? `
            <rect x="143" y="96" width="10" height="164" fill="${secondaryColor}" stroke="#cbd5e1" stroke-width="0.5"/>
          ` : ''}

          <!-- Side Hood Profile -->
          ${hasHood ? `
            <path d="M 125,95 Q 110,35 155,25 Q 190,35 170,95 Z" fill="${primaryColor}" stroke="#1e293b" stroke-width="2"/>
          ` : ''}

          <!-- Bottom Rib Band Side -->
          <rect x="114" y="310" width="72" height="24" rx="3" fill="${primaryColor}" stroke="#1e293b" stroke-width="2"/>
        </g>
        <text x="150" y="20" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="700" font-size="14" fill="#334155">YON KO'RINISH (SIDE)</text>
      </svg>
    `;
  }

  renderForModel(model, view = 'front') {
    if (!model) return this.renderFrontSvg();

    const oldConcept = JSON.parse(JSON.stringify(this.currentConcept));

    // Derive category & colors
    this.currentConcept.category = model.category || 'cat_hoodie';
    this.currentConcept.gender = model.gender || 'gender_girl';

    if (model.id === 'model-k025' || model.category === 'cat_hoodie') {
      this.currentConcept.primaryColor = '#f472b6';
      this.currentConcept.secondaryColor = '#ffffff';
      this.currentConcept.hasHood = true;
      this.currentConcept.pocketStyle = 'kangaroo';
    } else if (model.id === 'model-k026' || model.category === 'cat_pants') {
      this.currentConcept.primaryColor = '#0284c7';
      this.currentConcept.secondaryColor = '#ffffff';
      this.currentConcept.hasHood = false;
      this.currentConcept.hasLampas = true;
    } else if (model.id === 'model-k027' || model.category === 'cat_dress') {
      this.currentConcept.primaryColor = '#ec4899';
      this.currentConcept.secondaryColor = '#fef08a';
      this.currentConcept.hasHood = false;
    } else if (model.id === 'model-k028' || model.category === 'cat_polo') {
      this.currentConcept.primaryColor = '#10b981';
      this.currentConcept.secondaryColor = '#ffffff';
      this.currentConcept.hasHood = false;
    } else if (model.id === 'model-k029' || model.category === 'cat_jacket') {
      this.currentConcept.primaryColor = '#f59e0b';
      this.currentConcept.secondaryColor = '#1e293b';
      this.currentConcept.hasHood = true;
      this.currentConcept.hasZipper = true;
    }

    let svg = '';
    if (view === 'front') svg = this.renderFrontSvg();
    else if (view === 'back') svg = this.renderBackSvg();
    else if (view === 'side') svg = this.renderSideSvg();
    else svg = this.renderFrontSvg();

    this.currentConcept = oldConcept;
    return svg;
  }
}

const aiDesigner = new AiDesignerEngine();

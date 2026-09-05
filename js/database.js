// database.js - Central Data Store for AI Kids Fashion & Production Platform

const DB_KEY = 'kids_fashion_db_v1';

const defaultDatabase = {
  settings: {
    factoryName: "SilkWay Kids Atelier & Manufacturing",
    brandName: "MiniStars Kids Wear",
    address: "Toshkent sh., To'qimachilik sanoat zonasi, 14-bino",
    phone: "+998 71 200-45-78",
    currency: "UZS",
    currencySymbol: "so'm",
    defaultMargin: 35,
    overheadRatePercent: 12,
    laborRatePerSec: 75 // so'm per second of sewing labor
  },

  materials: [
    {
      id: "mat-001",
      name: "Futer 3-ipli (Petlya / Naches)",
      type: "fabric",
      composition: "80% Paxta, 20% Poliester",
      weight: 320,
      width: 185,
      price: 42000,
      priceUnit: "kg",
      color: "Pushti (Blush Pink)",
      stock: 450,
      stockUnit: "kg",
      supplier: "Samarkand EuroTextile",
      shrinkageLength: 3.5,
      shrinkageWidth: 2.0
    },
    {
      id: "mat-002",
      name: "Suprem (Single Jersey)",
      type: "fabric",
      composition: "95% Paxta, 5% Laykra",
      weight: 180,
      width: 180,
      price: 25000,
      priceUnit: "kg",
      color: "Oq (Milky White)",
      stock: 820,
      stockUnit: "kg",
      supplier: "Real Tex Tashkent",
      shrinkageLength: 4.0,
      shrinkageWidth: 3.0
    },
    {
      id: "mat-003",
      name: "Ribana 2x2 (Kashkorse)",
      type: "fabric",
      composition: "95% Paxta, 5% Elastan",
      weight: 260,
      width: 160,
      price: 38000,
      priceUnit: "kg",
      color: "Pushti (Mos keluvchi)",
      stock: 180,
      stockUnit: "kg",
      supplier: "Samarkand EuroTextile",
      shrinkageLength: 5.0,
      shrinkageWidth: 4.0
    },
    {
      id: "mat-004",
      name: "Interlok Penye",
      type: "fabric",
      composition: "100% Paxta",
      weight: 220,
      width: 180,
      price: 32000,
      priceUnit: "kg",
      color: "Moviy (Pastel Sky)",
      stock: 350,
      stockUnit: "kg",
      supplier: "Fergana Global Textile",
      shrinkageLength: 3.0,
      shrinkageWidth: 2.5
    },
    {
      id: "mat-005",
      name: "Kulirka 100% Paxta",
      type: "fabric",
      composition: "100% Organik Paxta",
      weight: 150,
      width: 180,
      price: 22000,
      priceUnit: "kg",
      color: "Och Sariq (Soft Lemon)",
      stock: 600,
      stockUnit: "kg",
      supplier: "Buxoro Cotton Club",
      shrinkageLength: 4.5,
      shrinkageWidth: 3.5
    },
    {
      id: "mat-006",
      name: "Plashevka Dewspo",
      type: "fabric",
      composition: "100% Poliester (Suv o'tkazmaydigan)",
      weight: 110,
      width: 150,
      price: 18000,
      priceUnit: "metr",
      color: "To'q ko'k (Navy)",
      stock: 280,
      stockUnit: "metr",
      supplier: "Asia Synthetic Fabrics",
      shrinkageLength: 0.5,
      shrinkageWidth: 0.5
    },
    {
      id: "trim-001",
      name: "Ip DorTak 40/2 (4000m)",
      type: "trim",
      composition: "100% Spun Polyester",
      price: 6000,
      priceUnit: "bobina",
      pricePerMeter: 1.5,
      color: "Pushti / Oq",
      stock: 120,
      supplier: "DorTak Threads"
    },
    {
      id: "trim-002",
      name: "Bel rezinkasi 4.0 sm",
      type: "trim",
      composition: "Lateks + Poliamid",
      price: 1800,
      priceUnit: "metr",
      color: "Oq",
      stock: 900,
      supplier: "Toshkent Furnitura Markazi"
    },
    {
      id: "trim-003",
      name: "Zamok YKK spiral №5 (40 sm)",
      type: "trim",
      composition: "Plastik + Metal itqich",
      price: 3500,
      priceUnit: "dona",
      color: "Oq / Pushti",
      stock: 400,
      supplier: "YKK Central Asia"
    },
    {
      id: "trim-004",
      name: "Brend mato tegi (Care label + Razmernik)",
      type: "trim",
      composition: "Satin lenta",
      price: 450,
      priceUnit: "dona",
      color: "Oq / Qora yozuv",
      stock: 5000,
      supplier: "LabelPrint Tashkent"
    },
    {
      id: "trim-005",
      name: "Individual qadoqlash paketi (BOPP)",
      type: "trim",
      composition: "Polipropilen (Kley lenta bilan)",
      price: 600,
      priceUnit: "dona",
      color: "Shaffof",
      stock: 3500,
      supplier: "PolyPack UZ"
    },
    {
      id: "trim-006",
      name: "Karton osma brend yorlig'i",
      type: "trim",
      composition: "350g laminatsiyalangan karton + shnur",
      price: 850,
      priceUnit: "dona",
      color: "Rangli print",
      stock: 2000,
      supplier: "PrintArt Polygraphy"
    }
  ],

  models: [
    {
      id: "model-k025",
      code: "K-025",
      name: "Sport Kapyushonli Tolstovka (Hoodie)",
      category: "cat_hoodie",
      gender: "gender_girl",
      ageGroup: "7–8 yosh",
      baseSize: "122",
      sizeRange: ["98", "104", "110", "116", "122", "128", "134"],
      season: "Kuz-Bahor 2026",
      fabricId: "mat-001",
      fabricName: "Futer 3-ipli (Petlya)",
      fabricColor: "Pushti va Oq",
      description: "8 yoshli qizlar uchun zamonaviy keng bichimdagi kapyushonli tolstovka. Oldida qulay kenguru cho'ntak, yeng va pastki qismi ribana manjet bilan ishlangan, yonida dekorativ oq lampas.",
      sketchFront: "hoodie_front",
      sketchBack: "hoodie_back",
      sketchSide: "hoodie_side",
      status: "ready", // ready, sewing, cutting, pattern, cad, design
      progressPercent: 100,
      currentStage: "Tayyor (QC Passed)",
      
      // Consumption
      singleConsumptionMeters: 0.82,
      singleConsumptionKg: 0.485,
      fabricWidthCm: 185,
      markerEfficiency: 87.4,
      cuttingWastePercent: 12.6,

      // Operations & Time Norms
      operations: [
        { id: "op-1", name: "Old kenguru cho'ntak qirralarini overlockda bukish", machine: "3_overlock", timeSec: 45, seamLengthCm: 70, threadConsM: 10.5, cost: 3375 },
        { id: "op-2", name: "Cho'ntakni old bo'lakka biriktirib tikish", machine: "lockstitch_301", timeSec: 60, seamLengthCm: 85, threadConsM: 2.4, cost: 4500 },
        { id: "op-3", name: "Yelka choklarini silikon lenta bilan biriktirish", machine: "4_overlock", timeSec: 35, seamLengthCm: 32, threadConsM: 5.1, cost: 2625 },
        { id: "op-4", name: "Yenglarni ochiq qo'ltiq o'miziga o'tqazish", machine: "4_overlock", timeSec: 50, seamLengthCm: 68, threadConsM: 10.8, cost: 3750 },
        { id: "op-5", name: "Yon va yeng osti choklarini bir yo'la tikish", machine: "4_overlock", timeSec: 55, seamLengthCm: 90, threadConsM: 14.4, cost: 4125 },
        { id: "op-6", name: "Kapyushon qismlarini birlashtirish va shnur yo'lini tikish", machine: "coverstitch", timeSec: 65, seamLengthCm: 80, threadConsM: 14.4, cost: 4875 },
        { id: "op-7", name: "Kapyushonni bo'yin o'miziga o'tkazish va lentali ishlov", machine: "4_overlock", timeSec: 45, seamLengthCm: 48, threadConsM: 7.6, cost: 3375 },
        { id: "op-8", name: "Yeng va pastki ribana manjetlarini aylana tikish", machine: "4_overlock", timeSec: 50, seamLengthCm: 76, threadConsM: 12.1, cost: 3750 },
        { id: "op-9", name: "Ip qoldiqlarini tozalash va sifat ko'rigi", machine: "manual", timeSec: 35, seamLengthCm: 0, threadConsM: 0, cost: 2625 },
        { id: "op-10", name: "Yakuniy dazmollash (VTO) va qadoqlash", machine: "iron_vto", timeSec: 40, seamLengthCm: 0, threadConsM: 0, cost: 3000 }
      ],

      // Lekalo Details
      patternPieces: [
        { name: "Old bo'lak (Front Bodice)", qty: 1, fabric: "Asosiy mato", seam: "0.7 sm" },
        { name: "Orqa bo'lak (Back Bodice)", qty: 1, fabric: "Asosiy mato", seam: "0.7 sm" },
        { name: "Yeng (Sleeve)", qty: 2, fabric: "Asosiy mato", seam: "0.7 sm" },
        { name: "Kapyushon o'ng/chap (Hood L/R)", qty: 2, fabric: "Asosiy mato", seam: "0.7 sm" },
        { name: "Kenguru cho'ntak (Pocket)", qty: 1, fabric: "Asosiy mato", seam: "1.0 sm" },
        { name: "Yeng manjeti (Cuff)", qty: 2, fabric: "Ribana 2x2", seam: "0.7 sm" },
        { name: "Pastki belbog' (Bottom Rib)", qty: 1, fabric: "Ribana 2x2", seam: "0.7 sm" },
        { name: "Bo'yin qoplama lentasi (Neck Tape)", qty: 1, fabric: "Kulirka", seam: "0.5 sm" }
      ],

      // Costing Breakdown
      costing: {
        fabricCost: 20370,      // 0.485 kg * 42 000
        trimsCost: 5400,        // Ribana + shnur + label + paket
        threadCost: 1160,       // ~77.3m ip
        cuttingCost: 3500,      // Bichuv haqi
        sewingCost: 36000,      // 480 sek tikuv me'yori bo'yicha
        packingCost: 1850,      // Etiketka, paket, dazmol
        overheadCost: 8220,     // 12% ustama
        totalUnitCost: 76500,   // Jami tannarx
        targetMarginPercent: 35,
        profitPerUnit: 26775,
        recommendedPrice: 103275 // Sotuv narxi
      },

      // QC Checklist
      qcChecklist: {
        measurementTolerance: true,
        seamQuality: true,
        threadTrimming: true,
        fabricStainFree: true,
        trimsOperation: true,
        labelPositioning: true,
        pressingVTO: true,
        packagingReady: true,
        status: "PASS",
        inspector: "Dilnoza Rahimova (Senior QC)",
        inspectedAt: "2026-09-02 14:30"
      },

      createdAt: "2026-08-28"
    },

    {
      id: "model-k026",
      code: "K-026",
      name: "Sport Jogger Shim (Dekorativ lampasli)",
      category: "cat_pants",
      gender: "gender_unisex",
      ageGroup: "7–8 yosh",
      baseSize: "122",
      sizeRange: ["98", "104", "110", "116", "122", "128"],
      season: "Kuz-Bahor 2026",
      fabricId: "mat-001",
      fabricName: "Futer 3-ipli",
      fabricColor: "Antratsit va Oq",
      description: "Bolalar uchun qulay erkin bichimdagi sport shimi. 4 sm keng rezinkali belbog', yon tomonida 2 ta cho'ntak va kontrast oq lampas tasmasi, to'piqda ribana manjet.",
      sketchFront: "pants_front",
      sketchBack: "pants_back",
      sketchSide: "pants_side",
      status: "sewing",
      progressPercent: 70,
      currentStage: "Tikuv korxonasida (Tikilmoqda)",
      
      singleConsumptionMeters: 0.68,
      singleConsumptionKg: 0.402,
      fabricWidthCm: 185,
      markerEfficiency: 89.1,
      cuttingWastePercent: 10.9,

      operations: [
        { id: "op-201", name: "Old yon cho'ntak xaltalarini birlashtirish", machine: "4_overlock", timeSec: 45, seamLengthCm: 55, threadConsM: 8.8, cost: 3375 },
        { id: "op-202", name: "Yon dekorativ lampas lentasini bostirib tikish", machine: "lockstitch_301", timeSec: 50, seamLengthCm: 140, threadConsM: 3.9, cost: 3750 },
        { id: "op-203", name: "Old va orqa o'tirg'ich choklarini tikish", machine: "4_overlock", timeSec: 35, seamLengthCm: 58, threadConsM: 9.2, cost: 2625 },
        { id: "op-204", name: "Qadam (ichki) choklarini bir yo'la tikish", machine: "4_overlock", timeSec: 40, seamLengthCm: 72, threadConsM: 11.5, cost: 3000 },
        { id: "op-205", name: "Bel rezinkasini halqa qilib tayyorlash", machine: "lockstitch_301", timeSec: 25, seamLengthCm: 12, threadConsM: 0.4, cost: 1875 },
        { id: "op-206", name: "Bel rezinkasini taqsimlab kiygizish va 3-chokli tikuv", machine: "multi_needle_elastic", timeSec: 50, seamLengthCm: 65, threadConsM: 15.6, cost: 3750 },
        { id: "op-207", name: "Shim poyi ribana manjetlarini tikish", machine: "4_overlock", timeSec: 40, seamLengthCm: 48, threadConsM: 7.6, cost: 3000 },
        { id: "op-208", name: "Tozalash va yakuniy dazmollash", machine: "iron_vto", timeSec: 35, seamLengthCm: 0, threadConsM: 0, cost: 2625 }
      ],

      patternPieces: [
        { name: "Old poy (Front Leg)", qty: 2, fabric: "Asosiy mato", seam: "0.7 sm" },
        { name: "Orqa poy (Back Leg)", qty: 2, fabric: "Asosiy mato", seam: "0.7 sm" },
        { name: "Yon cho'ntak xaltasi (Pocket Bag)", qty: 4, fabric: "Kulirka", seam: "0.7 sm" },
        { name: "Belbog' (Waistband)", qty: 1, fabric: "Ribana 2x2", seam: "0.7 sm" },
        { name: "Shim poyi manjeti (Leg Cuffs)", qty: 2, fabric: "Ribana 2x2", seam: "0.7 sm" }
      ],

      costing: {
        fabricCost: 16880,
        trimsCost: 4600,
        threadCost: 860,
        cuttingCost: 2800,
        sewingCost: 24000,
        packingCost: 1450,
        overheadCost: 6070,
        totalUnitCost: 56660,
        targetMarginPercent: 35,
        profitPerUnit: 19830,
        recommendedPrice: 76490
      },

      qcChecklist: {
        measurementTolerance: true,
        seamQuality: true,
        threadTrimming: false,
        fabricStainFree: true,
        trimsOperation: true,
        labelPositioning: true,
        pressingVTO: false,
        packagingReady: false,
        status: "IN_PROGRESS",
        inspector: "Nigora Alimova",
        inspectedAt: "Jarayonda"
      },

      createdAt: "2026-08-30"
    },

    {
      id: "model-k027",
      code: "K-027",
      name: "Yozgi Gullik Qizlar Ko'ylagi",
      category: "cat_dress",
      gender: "gender_girl",
      ageGroup: "5–6 yosh",
      baseSize: "110",
      sizeRange: ["92", "98", "104", "110", "116"],
      season: "Yoz 2026",
      fabricId: "mat-002",
      fabricName: "Suprem (Cotton/Lycra)",
      fabricColor: "Yalpizli gullik (Mint Floral)",
      description: "Yengil yozgi havodor paxtali ko'ylak. Belidan yig'ilgan shoyi etak, qanotcha shaklidagi nozik yeng, orqada tugmali qulay taqilma.",
      sketchFront: "dress_front",
      sketchBack: "dress_back",
      sketchSide: "dress_side",
      status: "cutting",
      progressPercent: 45,
      currentStage: "Bichuv korxonasida (Raskladka)",
      
      singleConsumptionMeters: 0.65,
      singleConsumptionKg: 0.210,
      fabricWidthCm: 180,
      markerEfficiency: 86.0,
      cuttingWastePercent: 14.0,

      operations: [
        { id: "op-301", name: "Ko'krak bo'lagi yelka choklarini tikish", machine: "4_overlock", timeSec: 25, seamLengthCm: 22, threadConsM: 3.5, cost: 1875 },
        { id: "op-302", name: "Qanotcha yengchalar etagini zich bukish", machine: "3_overlock", timeSec: 30, seamLengthCm: 45, threadConsM: 6.7, cost: 2250 },
        { id: "op-303", name: "Yengchalarni o'mizga biriktirish", machine: "4_overlock", timeSec: 35, seamLengthCm: 48, threadConsM: 7.6, cost: 2625 },
        { id: "op-304", name: "Bo'yin o'miziga elastik beyka bilan ishlov berish", machine: "coverstitch", timeSec: 40, seamLengthCm: 38, threadConsM: 6.8, cost: 3000 },
        { id: "op-305", name: "Etak qismini mayda burmaga yig'ish", machine: "lockstitch_301", timeSec: 35, seamLengthCm: 110, threadConsM: 3.1, cost: 2625 },
        { id: "op-306", name: "Etakni ko'krak qismiga ulab tikish", machine: "4_overlock", timeSec: 45, seamLengthCm: 62, threadConsM: 9.9, cost: 3375 },
        { id: "op-307", name: "Ko'ylak etagini bukish va bostirib tikish", machine: "coverstitch", timeSec: 40, seamLengthCm: 120, threadConsM: 21.6, cost: 3000 },
        { id: "op-308", name: "VTO dazmollash va etiketkalash", machine: "iron_vto", timeSec: 30, seamLengthCm: 0, threadConsM: 0, cost: 2250 }
      ],

      patternPieces: [
        { name: "Old ko'krak bo'lak (Front Bodice)", qty: 1, fabric: "Suprem", seam: "0.7 sm" },
        { name: "Orqa ko'krak bo'lak (Back Bodice)", qty: 2, fabric: "Suprem", seam: "0.7 sm" },
        { name: "Qanotcha yeng (Flounce Sleeve)", qty: 2, fabric: "Suprem", seam: "0.5 sm" },
        { name: "Old/Orqa etak (Skirt)", qty: 2, fabric: "Suprem", seam: "0.7 sm" },
        { name: "Bo'yin beykasi (Neck Binding)", qty: 1, fabric: "Suprem", seam: "0.5 sm" }
      ],

      costing: {
        fabricCost: 5250,
        trimsCost: 3200,
        threadCost: 650,
        cuttingCost: 2200,
        sewingCost: 21000,
        packingCost: 1200,
        overheadCost: 4020,
        totalUnitCost: 37520,
        targetMarginPercent: 40,
        profitPerUnit: 15008,
        recommendedPrice: 52528
      },

      qcChecklist: {
        measurementTolerance: false,
        seamQuality: false,
        threadTrimming: false,
        fabricStainFree: false,
        trimsOperation: false,
        labelPositioning: false,
        pressingVTO: false,
        packagingReady: false,
        status: "PENDING",
        inspector: "Kutilmoqda",
        inspectedAt: "-"
      },

      createdAt: "2026-09-01"
    },

    {
      id: "model-k028",
      code: "K-028",
      name: "Klassik Maktab Polo Futbolkasi",
      category: "cat_polo",
      gender: "gender_boy",
      ageGroup: "9–10 yosh",
      baseSize: "134",
      sizeRange: ["122", "128", "134", "140", "146", "152"],
      season: "Kuz-Qish 2026 (Maktab)",
      fabricId: "mat-004",
      fabricName: "Interlok Penye (100% Paxta)",
      fabricColor: "To'q ko'k (Navy Blue)",
      description: "Maktab o'quvchilari uchun sifatli qalin paxtali polo futbolkasi. Trikotaj yoqa, 2 ta tugmali planka, yenglari manjetli, yon tomonlarida mayda yoriq (razrez).",
      sketchFront: "polo_front",
      sketchBack: "polo_back",
      sketchSide: "polo_side",
      status: "pattern",
      progressPercent: 30,
      currentStage: "Lekalo konstruksiyasi yakunlandi",
      
      singleConsumptionMeters: 0.72,
      singleConsumptionKg: 0.285,
      fabricWidthCm: 180,
      markerEfficiency: 88.5,
      cuttingWastePercent: 11.5,

      operations: [
        { id: "op-401", name: "Old plankani qotirish va ochish", machine: "lockstitch_301", timeSec: 55, seamLengthCm: 35, threadConsM: 1.0, cost: 4125 },
        { id: "op-402", name: "Plankaga tugma o'rni va petlya ochish", machine: "auto_buttonhole", timeSec: 35, seamLengthCm: 0, threadConsM: 2.0, cost: 2625 },
        { id: "op-403", name: "Yelka choklarini tikish", machine: "4_overlock", timeSec: 25, seamLengthCm: 28, threadConsM: 4.5, cost: 1875 },
        { id: "op-404", name: "To'qima yoqani o'tkazish va bo'yin o'miziga lenta bostirish", machine: "lockstitch_301", timeSec: 50, seamLengthCm: 42, threadConsM: 1.2, cost: 3750 },
        { id: "op-405", name: "Yenglarni ochiq qo'ltiqqa o'tkazish", machine: "4_overlock", timeSec: 40, seamLengthCm: 56, threadConsM: 8.9, cost: 3000 },
        { id: "op-406", name: "Yon choklarni yon razrez bilan birga tikish", machine: "4_overlock", timeSec: 45, seamLengthCm: 75, threadConsM: 12.0, cost: 3375 },
        { id: "op-407", name: "Yeng manjetlari va etakni bukish", machine: "coverstitch", timeSec: 40, seamLengthCm: 84, threadConsM: 15.1, cost: 3000 },
        { id: "op-408", name: "Tugma qadash va yakuniy tekshiruv", machine: "auto_button", timeSec: 30, seamLengthCm: 0, threadConsM: 0.5, cost: 2250 }
      ],

      patternPieces: [
        { name: "Old bo'lak (Front Bodice)", qty: 1, fabric: "Interlok", seam: "0.7 sm" },
        { name: "Orqa bo'lak (Back Bodice)", qty: 1, fabric: "Interlok", seam: "0.7 sm" },
        { name: "Yeng (Sleeve)", qty: 2, fabric: "Interlok", seam: "0.7 sm" },
        { name: "To'qima Yoqa (Knit Collar)", qty: 1, fabric: "To'qima jakkard", seam: "0.7 sm" },
        { name: "Planka chap/o'ng (Placket L/R)", qty: 2, fabric: "Interlok + Dublerin", seam: "0.5 sm" },
        { name: "Yeng manjeti (Sleeve Cuff)", qty: 2, fabric: "To'qima jakkard", seam: "0.7 sm" }
      ],

      costing: {
        fabricCost: 9120,
        trimsCost: 4100,
        threadCost: 720,
        cuttingCost: 2500,
        sewingCost: 24000,
        packingCost: 1350,
        overheadCost: 5010,
        totalUnitCost: 46800,
        targetMarginPercent: 35,
        profitPerUnit: 16380,
        recommendedPrice: 63180
      },

      qcChecklist: {
        measurementTolerance: false,
        seamQuality: false,
        threadTrimming: false,
        fabricStainFree: false,
        trimsOperation: false,
        labelPositioning: false,
        pressingVTO: false,
        packagingReady: false,
        status: "PENDING",
        inspector: "Kutilmoqda",
        inspectedAt: "-"
      },

      createdAt: "2026-09-02"
    },

    {
      id: "model-k029",
      code: "K-029",
      name: "Bolalar Yengil Vetrovka Kurtkasi",
      category: "cat_jacket",
      gender: "gender_unisex",
      ageGroup: "11–12 yosh",
      baseSize: "146",
      sizeRange: ["128", "134", "140", "146", "152"],
      season: "Kuz 2026",
      fabricId: "mat-006",
      fabricName: "Plashevka Dewspo + Flis astar",
      fabricColor: "Elektrik Moviy va Kulrang",
      description: "Shamol va yomg'irdan himoyalovchi suv o'tkazmaydigan bolalar vetrovkasi. Oldida traktor zamok, chuqur kapyushon, yorug'lik qaytaruvchi reflektor chiziqlar va ichki issiq flis astar.",
      sketchFront: "jacket_front",
      sketchBack: "jacket_back",
      sketchSide: "jacket_side",
      status: "design",
      progressPercent: 15,
      currentStage: "AI Dizayn & Texnik topshiriq bosqichi",
      
      singleConsumptionMeters: 1.15,
      singleConsumptionKg: 0.350,
      fabricWidthCm: 150,
      markerEfficiency: 85.2,
      cuttingWastePercent: 14.8,

      operations: [
        { id: "op-501", name: "Old yon vreznik zamokli cho'ntaklarni o'rnatish", machine: "lockstitch_301", timeSec: 90, seamLengthCm: 50, threadConsM: 1.4, cost: 6750 },
        { id: "op-502", name: "Reflektor tasmalarni old va orqaga bostirish", machine: "lockstitch_301", timeSec: 45, seamLengthCm: 80, threadConsM: 2.2, cost: 3375 },
        { id: "op-503", name: "Yelka va yon choklarni birlashtirish", machine: "lockstitch_301", timeSec: 50, seamLengthCm: 95, threadConsM: 2.7, cost: 3750 },
        { id: "op-504", name: "Flis astar korpusini yig'ish", machine: "4_overlock", timeSec: 60, seamLengthCm: 120, threadConsM: 19.2, cost: 4500 },
        { id: "op-505", name: "Kapyushonni yig'ish va rezinka kordon o'tkazish", machine: "lockstitch_301", timeSec: 65, seamLengthCm: 70, threadConsM: 2.0, cost: 4875 },
        { id: "op-506", name: "Markaziy traktor zamokni o'rnatish va qoplama planka", machine: "lockstitch_301", timeSec: 85, seamLengthCm: 110, threadConsM: 3.1, cost: 6375 },
        { id: "op-507", name: "Astar bilan asosiy korpusni 'toza' birlashtirish (vyvorot)", machine: "lockstitch_301", timeSec: 90, seamLengthCm: 160, threadConsM: 4.5, cost: 6750 },
        { id: "op-508", name: "Yeng manjetlariga ichki rezinka kiritish va berkitish", machine: "lockstitch_301", timeSec: 50, seamLengthCm: 45, threadConsM: 1.3, cost: 3750 },
        { id: "op-509", name: "Yakuniy tekshiruv va brend furniturasini o'rnatish", machine: "manual", timeSec: 40, seamLengthCm: 0, threadConsM: 0, cost: 3000 }
      ],

      patternPieces: [
        { name: "Old bo'lak o'ng/chap (Front Bodice L/R)", qty: 2, fabric: "Plashevka", seam: "1.0 sm" },
        { name: "Orqa bo'lak (Back Bodice)", qty: 1, fabric: "Plashevka", seam: "1.0 sm" },
        { name: "Yeng (Sleeve)", qty: 2, fabric: "Plashevka", seam: "1.0 sm" },
        { name: "Kapyushon 3 bo'lakli (Hood)", qty: 3, fabric: "Plashevka", seam: "1.0 sm" },
        { name: "Astar tanasi (Body Lining)", qty: 3, fabric: "Flis 180g", seam: "1.0 sm" },
        { name: "Astar yengi (Sleeve Lining)", qty: 2, fabric: "Tafetta", seam: "1.0 sm" },
        { name: "Cho'ntak listochkasi (Pocket Welt)", qty: 2, fabric: "Plashevka", seam: "1.0 sm" }
      ],

      costing: {
        fabricCost: 28500,
        trimsCost: 14200,
        threadCost: 1100,
        cuttingCost: 4500,
        sewingCost: 43125,
        packingCost: 2500,
        overheadCost: 11270,
        totalUnitCost: 105195,
        targetMarginPercent: 40,
        profitPerUnit: 42078,
        recommendedPrice: 147273
      },

      qcChecklist: {
        measurementTolerance: false,
        seamQuality: false,
        threadTrimming: false,
        fabricStainFree: false,
        trimsOperation: false,
        labelPositioning: false,
        pressingVTO: false,
        packagingReady: false,
        status: "PENDING",
        inspector: "Kutilmoqda",
        inspectedAt: "-"
      },

      createdAt: "2026-09-03"
    }
  ],

  // Kids Anthropometric Size Chart Standards
  sizeStandards: {
    "92": { height: 92, chest: 52, waist: 50, hip: 54, backLength: 22, sleeveLength: 31, legLength: 53, age: "1.5–2 yosh" },
    "98": { height: 98, chest: 54, waist: 51, hip: 56, backLength: 23.5, sleeveLength: 33.5, legLength: 58, age: "2–3 yosh" },
    "104": { height: 104, chest: 56, waist: 52, hip: 59, backLength: 25, sleeveLength: 36, legLength: 63, age: "3–4 yosh" },
    "110": { height: 110, chest: 58, waist: 53, hip: 62, backLength: 26.5, sleeveLength: 38.5, legLength: 68, age: "4–5 yosh" },
    "116": { height: 116, chest: 60, waist: 54, hip: 65, backLength: 28, sleeveLength: 41, legLength: 73, age: "5–6 yosh" },
    "122": { height: 122, chest: 62, waist: 55, hip: 68, backLength: 29.5, sleeveLength: 43.5, legLength: 78, age: "6–7 yosh" },
    "128": { height: 128, chest: 64, waist: 57, hip: 71, backLength: 31, sleeveLength: 46, legLength: 83, age: "7–8 yosh" },
    "134": { height: 134, chest: 67, waist: 59, hip: 74, backLength: 32.5, sleeveLength: 48.5, legLength: 88, age: "8–9 yosh" },
    "140": { height: 140, chest: 70, waist: 61, hip: 77, backLength: 34, sleeveLength: 51, legLength: 93, age: "9–10 yosh" },
    "146": { height: 146, chest: 73, waist: 63, hip: 81, backLength: 35.5, sleeveLength: 53.5, legLength: 98, age: "10–11 yosh" },
    "152": { height: 152, chest: 76, waist: 65, hip: 85, backLength: 37, sleeveLength: 56, legLength: 103, age: "11–12 yosh" }
  },

  // Sewing Machine Types & Thread Ratios
  machineTypes: {
    "3_overlock": { name: "3-ipli Overlock (ISO 504)", threadRatio: 12.0, speedRpm: 6500, stitchType: "Chok qirrasini tozalash va yengil bukish" },
    "4_overlock": { name: "4-ipli Overlock (ISO 514)", threadRatio: 16.0, speedRpm: 7000, stitchType: "Trikotaj asosiy biriktiruvchi elastik chok" },
    "5_overlock": { name: "5-ipli Overlock + Mokoli (ISO 516)", threadRatio: 20.0, speedRpm: 6000, stitchType: "To'qima matolarni zanjirli mustahkam biriktirish" },
    "lockstitch_301": { name: "1-ignali Mokoli Mashina (ISO 301)", threadRatio: 2.8, speedRpm: 5000, stitchType: "Universal to'g'ri chok, zamok va cho'ntaklar" },
    "coverstitch": { name: "Tekis chokli Raspoposhivalka (ISO 406)", threadRatio: 18.0, speedRpm: 6000, stitchType: "Yeng va pastki etakni elastik qayirib tikish" },
    "multi_needle_elastic": { name: "Ko'p ignali Bel Rezinka mashinasi", threadRatio: 24.0, speedRpm: 4500, stitchType: "Sport shimlari bel rezinkasini taqsimlab tikish" },
    "auto_buttonhole": { name: "Avtomat Petlya Mashinasi", threadRatio: 4.5, speedRpm: 3500, stitchType: "Tugma uchun to'g'ri va ko'zli petlya ochish" },
    "auto_button": { name: "Avtomat Tugma Qadash Mashinasi", threadRatio: 2.0, speedRpm: 2500, stitchType: "2 va 4 teshikli tugmalarni mustahkam qadash" },
    "iron_vto": { name: "Bug' generatorli Dazmol / Press (VTO)", threadRatio: 0, speedRpm: 0, stitchType: "Namlab-isitib shakl berish va tekislash" },
    "manual": { name: "Qo'lda bajariladigan operatsiya / QC", threadRatio: 0, speedRpm: 0, stitchType: "Ip tozalash, o'lchov tekshiruvi, saralash" }
  },

  // Active production logs
  productionFloorLogs: [
    { id: "log-1", modelCode: "K-025", operationName: "Yeng va pastki ribana manjetlarini aylana tikish", operatorName: "Malika Yusupova", piecesCompleted: 48, timePerPieceSec: 48, status: "completed", timestamp: "2026-09-03 16:45" },
    { id: "log-2", modelCode: "K-026", operationName: "Bel rezinkasini taqsimlab kiygizish", operatorName: "Zilola Karimova", piecesCompleted: 35, timePerPieceSec: 52, status: "active", timestamp: "2026-09-03 17:10" },
    { id: "log-3", modelCode: "K-027", operationName: "Raskladka va pichoq bilan qatlamlarni kesish", operatorName: "Rustam Nazarov (Bichuvchi)", piecesCompleted: 120, timePerPieceSec: 25, status: "completed", timestamp: "2026-09-03 15:20" }
  ]
};

// Database API wrapper with LocalStorage persistence
class DatabaseService {
  constructor() {
    this.data = this.load();
  }

  load() {
    try {
      const saved = localStorage.getItem(DB_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn("Failed to load DB from localStorage, falling back to default:", e);
    }
    this.save(defaultDatabase);
    return JSON.parse(JSON.stringify(defaultDatabase));
  }

  save(data = this.data) {
    this.data = data;
    try {
      localStorage.setItem(DB_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.error("Failed to save DB to localStorage:", e);
    }
  }

  getSettings() {
    return this.data.settings;
  }

  updateSettings(newSettings) {
    this.data.settings = { ...this.data.settings, ...newSettings };
    this.save();
    return this.data.settings;
  }

  getModels() {
    return this.data.models;
  }

  getModelById(id) {
    return this.data.models.find(m => m.id === id || m.code === id);
  }

  saveModel(model) {
    const idx = this.data.models.findIndex(m => m.id === model.id);
    if (idx >= 0) {
      this.data.models[idx] = model;
    } else {
      this.data.models.unshift(model);
    }
    this.save();
    return model;
  }

  deleteModel(id) {
    this.data.models = this.data.models.filter(m => m.id !== id);
    this.save();
  }

  getMaterials() {
    return this.data.materials;
  }

  getMaterialById(id) {
    return this.data.materials.find(m => m.id === id);
  }

  saveMaterial(mat) {
    const idx = this.data.materials.findIndex(m => m.id === mat.id);
    if (idx >= 0) {
      this.data.materials[idx] = mat;
    } else {
      this.data.materials.unshift(mat);
    }
    this.save();
    return mat;
  }

  deleteMaterial(id) {
    this.data.materials = this.data.materials.filter(m => m.id !== id);
    this.save();
  }

  getSizeStandards() {
    return this.data.sizeStandards;
  }

  getMachineTypes() {
    return this.data.machineTypes;
  }

  getFloorLogs() {
    return this.data.productionFloorLogs;
  }

  addFloorLog(log) {
    this.data.productionFloorLogs.unshift({
      id: "log-" + Date.now(),
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      ...log
    });
    this.save();
  }

  savePremiumApplication(appData) {
    if (!this.data.premiumApplications) {
      this.data.premiumApplications = [];
    }
    this.data.premiumApplications.unshift(appData);
    this.save();
  }

  getPremiumApplications() {
    return this.data.premiumApplications || [];
  }

  resetToDefaults() {
    this.data = JSON.parse(JSON.stringify(defaultDatabase));
    this.save();
    return this.data;
  }
}

const db = new DatabaseService();

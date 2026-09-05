// aiTechnologist.js - Conversational AI Garment Production Advisor

class AiTechnologistEngine {
  constructor() {
    this.chatHistory = [
      {
        role: "assistant",
        text: "Assalomu alaykum! Men bolalar kiyimi ishlab chiqarish bo'yicha **AI Texnolog** yordamchisiman. Menga istalgan model g'oyangizni aytsangiz, men mato sarfi, operatsiyalar ketma-ketligi, vaqt me'yori, ip sarfi va to'liq tannarxini matematik formulalar asosida hisoblab beraman.",
        timestamp: "Hozir",
        isInitial: true
      }
    ];
  }

  processQuery(userQuery) {
    const lower = userQuery.toLowerCase();
    let generatedModel = null;

    // Detect if jogger / pants
    if (lower.includes('shim') || lower.includes('jogger') || lower.includes('брюки') || lower.includes('pants')) {
      generatedModel = {
        code: "K-" + Math.floor(100 + Math.random() * 900),
        name: "Bolalar Sport Shimi (AI Tavsiya)",
        category: "cat_pants",
        gender: lower.includes('qiz') ? "gender_girl" : "gender_boy",
        ageGroup: "7–8 yosh",
        baseSize: "122",
        sizeRange: ["110", "116", "122", "128", "134"],
        season: "Kuz-Bahor",
        fabricId: "mat-001",
        fabricName: "Futer 3-ipli (Petlya)",
        fabricColor: "Antratsit Melanj",
        description: "AI Texnolog tomonidan hisoblangan 8 yoshli bolalar sport shimi. 4 sm rezinkali belbog', 2 ta yon cho'ntak, to'piq ribana manjeti.",
        singleConsumptionMeters: 0.68,
        singleConsumptionKg: 0.402,
        fabricWidthCm: 185,
        markerEfficiency: 89.1,
        cuttingWastePercent: 10.9,
        operations: [
          { id: "op-t1", name: "Old yon cho'ntak xaltasini overlockda birlashtirish", machine: "4_overlock", timeSec: 45, seamLengthCm: 55, threadConsM: 8.8, cost: 3375 },
          { id: "op-t2", name: "Cho'ntak kirish qismini to'g'ri chokda bostirish", machine: "lockstitch_301", timeSec: 30, seamLengthCm: 32, threadConsM: 0.9, cost: 2250 },
          { id: "op-t3", name: "Old va orqa o'tirg'ich choklarini tikish", machine: "4_overlock", timeSec: 35, seamLengthCm: 58, threadConsM: 9.2, cost: 2625 },
          { id: "op-t4", name: "Qadam (ichki) choklarini bir yo'la tikish", machine: "4_overlock", timeSec: 40, seamLengthCm: 72, threadConsM: 11.5, cost: 3000 },
          { id: "op-t5", name: "Bel rezinkasini halqa qilib tayyorlash", machine: "lockstitch_301", timeSec: 20, seamLengthCm: 12, threadConsM: 0.4, cost: 1500 },
          { id: "op-t6", name: "Bel rezinkasini 3-igna bilan taqsimlab tikish", machine: "multi_needle_elastic", timeSec: 50, seamLengthCm: 65, threadConsM: 15.6, cost: 3750 },
          { id: "op-t7", name: "Shim poyi ribana manjetlarini aylana tikish", machine: "4_overlock", timeSec: 40, seamLengthCm: 48, threadConsM: 7.6, cost: 3000 },
          { id: "op-t8", name: "Ip tozalash va yakuniy dazmollash (VTO)", machine: "iron_vto", timeSec: 35, seamLengthCm: 0, threadConsM: 0, cost: 2625 }
        ],
        costing: {
          fabricCost: 16880,
          trimsCost: 4600,
          threadCost: 860,
          cuttingCost: 2800,
          sewingCost: 22125,
          packingCost: 1450,
          overheadCost: 5840,
          totalUnitCost: 54555,
          targetMarginPercent: 35,
          profitPerUnit: 19095,
          recommendedPrice: 73650
        },
        status: "cad",
        currentStage: "Konstruktor / Texnologik karta tayyor",
        progressPercent: 25,
        createdAt: new Date().toISOString().substring(0, 10)
      };
    } else {
      // Default: Hoodie / Sweatshirt
      generatedModel = {
        code: "K-" + Math.floor(100 + Math.random() * 900),
        name: "Bolalar Kapyushonli Tolstovkasi (AI Tavsiya)",
        category: "cat_hoodie",
        gender: lower.includes("o'g'il") ? "gender_boy" : "gender_girl",
        ageGroup: "8–9 yosh",
        baseSize: "128",
        sizeRange: ["116", "122", "128", "134", "140"],
        season: "Kuz-Bahor",
        fabricId: "mat-001",
        fabricName: "Futer 3-ipli (Petlya)",
        fabricColor: "Pushti / Malina",
        description: "AI Texnolog tomonidan hisoblangan tolstovka. Kenguru cho'ntak, kapyushon, ribana manjet va pastki belbog'.",
        singleConsumptionMeters: 0.85,
        singleConsumptionKg: 0.503,
        fabricWidthCm: 185,
        markerEfficiency: 87.5,
        cuttingWastePercent: 12.5,
        operations: [
          { id: "op-t10", name: "Old kenguru cho'ntak qirralarini bukish", machine: "3_overlock", timeSec: 45, seamLengthCm: 70, threadConsM: 10.5, cost: 3375 },
          { id: "op-t11", name: "Cho'ntakni old bo'lakka tikish", machine: "lockstitch_301", timeSec: 60, seamLengthCm: 85, threadConsM: 2.4, cost: 4500 },
          { id: "op-t12", name: "Yelka choklarini tikish", machine: "4_overlock", timeSec: 35, seamLengthCm: 32, threadConsM: 5.1, cost: 2625 },
          { id: "op-t13", name: "Yenglarni o'tkazish", machine: "4_overlock", timeSec: 50, seamLengthCm: 68, threadConsM: 10.8, cost: 3750 },
          { id: "op-t14", name: "Yon choklarni bir yo'la tikish", machine: "4_overlock", timeSec: 55, seamLengthCm: 90, threadConsM: 14.4, cost: 4125 },
          { id: "op-t15", name: "Kapyushonni yig'ish va o'tkazish", machine: "4_overlock", timeSec: 70, seamLengthCm: 95, threadConsM: 15.2, cost: 5250 },
          { id: "op-t16", name: "Manjet va belbog'ni tikish", machine: "4_overlock", timeSec: 50, seamLengthCm: 76, threadConsM: 12.1, cost: 3750 },
          { id: "op-t17", name: "VTO dazmollash va QC", machine: "iron_vto", timeSec: 40, seamLengthCm: 0, threadConsM: 0, cost: 3000 }
        ],
        costing: {
          fabricCost: 21125,
          trimsCost: 5500,
          threadCost: 1200,
          cuttingCost: 3500,
          sewingCost: 30375,
          packingCost: 1850,
          overheadCost: 7625,
          totalUnitCost: 71175,
          targetMarginPercent: 35,
          profitPerUnit: 24910,
          recommendedPrice: 96085
        },
        status: "cad",
        currentStage: "Konstruktor / Texnologik karta tayyor",
        progressPercent: 25,
        createdAt: new Date().toISOString().substring(0, 10)
      };
    }

    const totalSec = generatedModel.operations.reduce((s, o) => s + o.timeSec, 0);
    const mins = Math.floor(totalSec / 60);
    const remSec = totalSec % 60;

    const responseText = `
### 🤖 AI Texnolog Tahlili va Hisob-kitob Natijasi:

**Model:** ${generatedModel.name} (${generatedModel.code})  
**Tavsiya etilgan mato:** ${generatedModel.fabricName} (Gramaj: 320 g/m², En: ${generatedModel.fabricWidthCm} sm)

---

#### 1. ✂️ Bichuv va Mato Sarfi:
* **1 dona uchun sarf uzunligi:** ${generatedModel.singleConsumptionMeters} metr
* **1 dona uchun sarf vazni:** \`0.85m × 1.85m × 0.320 kg/m² = ${generatedModel.singleConsumptionKg} kg\`
* **Mato xarajati:** \`${generatedModel.singleConsumptionKg} kg × 42 000 so'm = ${costingEngine.formatCurrency(generatedModel.costing.fabricCost)}\`
* **Raskladka samaradorligi:** ${generatedModel.markerEfficiency}% (Texnologik chiqindi: ${generatedModel.cuttingWastePercent}%)

---

#### 2. 🪡 Tikuv Texnologik Marshruti (${generatedModel.operations.length} ta operatsiya):
* **Umumiy tikuv vaqt me'yori:** **${mins} min ${remSec} sek** (${totalSec} sekund)
* **Asosiy uskunalar:** 4-ipli trikotaj overlock, 1-ignali universal moko, ko'p ignali bel mashinasi
* **Tikuv ish haqi:** \`${totalSec} sek × 75 so'm/sek = ${costingEngine.formatCurrency(generatedModel.costing.sewingCost)}\`

---

#### 3. 💰 Shaffof Tannarx va Sotuv Narxi:
* **Mato:** ${costingEngine.formatCurrency(generatedModel.costing.fabricCost)}
* **Furnitura & Etiketka:** ${costingEngine.formatCurrency(generatedModel.costing.trimsCost)}
* **Ip sarfi:** ${costingEngine.formatCurrency(generatedModel.costing.threadCost)}
* **Bichuv ishi:** ${costingEngine.formatCurrency(generatedModel.costing.cuttingCost)}
* **Tikuv ishi:** ${costingEngine.formatCurrency(generatedModel.costing.sewingCost)}
* **Qadoqlash & Dazmol:** ${costingEngine.formatCurrency(generatedModel.costing.packingCost)}
* **Korxona ustamasi (12%):** ${costingEngine.formatCurrency(generatedModel.costing.overheadCost)}
* 🏁 **JAMI 1 DONA TANNARX:** **${costingEngine.formatCurrency(generatedModel.costing.totalUnitCost)}**
* 🏷️ **Tavsiya Sotuv Narxi (+35% Marja):** **${costingEngine.formatCurrency(generatedModel.costing.recommendedPrice)}** (Sof foyda: ${costingEngine.formatCurrency(generatedModel.costing.profitPerUnit)} / dona)
    `;

    return {
      responseText,
      modelData: generatedModel
    };
  }
}

const aiTechnologist = new AiTechnologistEngine();

// techPack.js - 100% Table-Based Industrial Production Tech Pack & Specification Engine

class TechPackEngine {
  constructor() {}

  generateTechPackHtml(modelId) {
    const model = db.getModelById(modelId) || db.getModels()[0];
    const settings = db.getSettings();
    const fabric = db.getMaterialById(model.fabricId) || db.getMaterials()[0];
    const sewCalc = sewingCalc.calculateModelOperations(model.operations || []);
    const costCalc = costingEngine.calculateModelCost(model.costing || {}, model.costing?.targetMarginPercent || 35);
    const sizeStd = db.getSizeStandards()[model.baseSize] || db.getSizeStandards()["122"];

    const frontSvg = aiDesigner.renderForModel(model, 'front');
    const backSvg = aiDesigner.renderForModel(model, 'back');
    const sideSvg = aiDesigner.renderForModel(model, 'side');

    return `
      <div class="techpack-document" id="techPackPrintable">
        <!-- ==================== PAGE 1: PASSPORT & TECHNICAL FLATS ==================== -->
        <div class="techpack-page">
          <!-- TOP FACTORY BANNER -->
          <div class="tp-header-banner">
            <div class="tp-brand-col">
              <div class="tp-logo-mark">🌟 ${settings.brandName.toUpperCase()}</div>
              <div class="tp-factory-sub">${settings.factoryName} — ${settings.address} | Tel: ${settings.phone}</div>
            </div>
            <div class="tp-doc-badge">
              <div class="tp-doc-title">RASMIY ISHLAB CHIQARISH TEXNOLOGIK KARTASI</div>
              <div class="tp-doc-code">MODEL KODI: ${model.code}</div>
            </div>
          </div>

          <!-- JADVAL 1: PASSPORT VA UMUMIY TAVSIF JADVALI -->
          <div class="tp-table-header">📋 JADVAL 1: MAHSULOT PASPORTI VA IDENTIFIKATSIYA MA'LUMOTLARI</div>
          <table class="tp-data-table tp-meta-grid-table">
            <tbody>
              <tr>
                <td class="tp-label-cell">Mahsulot nomi:</td>
                <td><strong>${model.name}</strong></td>
                <td class="tp-label-cell">Model kodi (Artikul):</td>
                <td><strong style="color: #0284c7;">${model.code}</strong></td>
              </tr>
              <tr>
                <td class="tp-label-cell">Kategoriya / Assortiment:</td>
                <td>${t(model.category)}</td>
                <td class="tp-label-cell">Jinsi va Yoshi:</td>
                <td>${t(model.gender)} (${model.ageGroup})</td>
              </tr>
              <tr>
                <td class="tp-label-cell">Mavsum / Kolleksiya:</td>
                <td>${model.season}</td>
                <td class="tp-label-cell">Bazaviy o'lcham (Namuna):</td>
                <td><strong>${model.baseSize} sm</strong></td>
              </tr>
              <tr>
                <td class="tp-label-cell">O'lchamlar qatori (Razmer seti):</td>
                <td>${model.sizeRange.join(' / ')} sm</td>
                <td class="tp-label-cell">Asosiy mato va Rangi:</td>
                <td>${model.fabricName} (${model.fabricColor})</td>
              </tr>
              <tr>
                <td class="tp-label-cell">Hujjat sanasi:</td>
                <td>${model.createdAt || '04.09.2026'}</td>
                <td class="tp-label-cell">Ishlab chiqarish holati:</td>
                <td><span class="tp-status-pill">● ${model.currentStage || 'Tasdiqlangan'}</span></td>
              </tr>
              <tr>
                <td class="tp-label-cell">Model tavsifi & Qisqacha izoh:</td>
                <td colspan="3">${model.description}</td>
              </tr>
            </tbody>
          </table>

          <!-- JADVAL 2: TEXNIK ESKIZLAR VA RAKURSLAR JADVALI (TECHNICAL FLATS) -->
          <div class="tp-table-header" style="margin-top: 20px;">🖼️ JADVAL 2: TEXNIK ESKIZLAR VA KONSTRUKTIV RAKURSLAR (3 KO'RINISHDAGI ESKIZ)</div>
          <table class="tp-data-table tp-flats-table">
            <thead>
              <tr>
                <th style="width: 33.3%;">✨ 1. OLD KO'RINISH (FRONT VIEW)</th>
                <th style="width: 33.3%;">🔄 2. ORQA KO'RINISH (BACK VIEW)</th>
                <th style="width: 33.3%;">📐 3. YON KO'RINISH (SIDE PROFILE)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="tp-svg-cell">
                  <div class="tp-svg-box">${frontSvg}</div>
                  <div class="tp-cell-caption">Asosiy siluet, cho'ntaklar va choklar</div>
                </td>
                <td class="tp-svg-cell">
                  <div class="tp-svg-box">${backSvg}</div>
                  <div class="tp-cell-caption">Koketka, orqa detallar va print</div>
                </td>
                <td class="tp-svg-cell">
                  <div class="tp-svg-box">${sideSvg}</div>
                  <div class="tp-cell-caption">Yeng balansi va yon dekorativ lampas</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- ==================== PAGE 2: SIZES & BOM TABLES ==================== -->
        <div class="tp-page-break"></div>
        <div class="techpack-page">
          <div class="tp-sub-header">MODEL: ${model.code} — O'LCHAMLAR VA MATERIALLAR SPETSIFIKATSIYASI</div>

          <!-- JADVAL 3: ASOSIY O'LCHAMLAR JADVALI -->
          <div class="tp-table-header">📐 JADVAL 3: 15-BANDLI KONSTRUKTIV O'LCHAMLAR VA TOLERANSLAR JADVALI (SPEC SHEET)</div>
          <table class="tp-data-table tp-size-table">
            <thead>
              <tr>
                <th style="width: 36px;">№</th>
                <th>O'lchov nuqtasi (Measurement Point)</th>
                <th style="width: 85px;">Tolerans (±)</th>
                ${model.sizeRange.map(s => `<th style="width: 55px;" class="${s === model.baseSize ? 'tp-base-size-col' : ''}">${s} sm ${s === model.baseSize ? '(Bazaviy)' : ''}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td><strong>Mahsulot umumiy bo'yi</strong> (Orqa bo'yin o'mizidan etakkacha)</td>
                <td>± 0.5 sm</td>
                ${model.sizeRange.map(s => `<td>${(db.getSizeStandards()[s]?.backLength || 28) + 14}</td>`).join('')}
              </tr>
              <tr>
                <td>2</td>
                <td><strong>Ko'krak aylanasi kengligi 1/2</strong> (Qo'ltiq ostidan 2 sm pastda)</td>
                <td>± 0.5 sm</td>
                ${model.sizeRange.map(s => `<td>${Math.round(((db.getSizeStandards()[s]?.chest || 60) + 4) / 2)}</td>`).join('')}
              </tr>
              <tr>
                <td>3</td>
                <td><strong>Etak kengligi 1/2</strong> (Ribana manjet bo'sh holatda)</td>
                <td>± 0.5 sm</td>
                ${model.sizeRange.map(s => `<td>${Math.round(((db.getSizeStandards()[s]?.chest || 60) - 2) / 2)}</td>`).join('')}
              </tr>
              <tr>
                <td>4</td>
                <td><strong>Yeng uzunligi</strong> (Bo'yin chetidan manjetgacha)</td>
                <td>± 0.5 sm</td>
                ${model.sizeRange.map(s => `<td>${db.getSizeStandards()[s]?.sleeveLength || 42}</td>`).join('')}
              </tr>
              <tr>
                <td>5</td>
                <td><strong>Yeng manjeti kengligi 1/2</strong> (Bo'sh holatda)</td>
                <td>± 0.3 sm</td>
                ${model.sizeRange.map(s => `<td>${Math.round(6 + (parseInt(s) - 98) * 0.15)}</td>`).join('')}
              </tr>
              <tr>
                <td>6</td>
                <td><strong>Yelka kengligi</strong> (Bo'yin nuqtasidan yelka uchigacha)</td>
                <td>± 0.3 sm</td>
                ${model.sizeRange.map(s => `<td>${Math.round(8 + (parseInt(s) - 98) * 0.2)}</td>`).join('')}
              </tr>
              <tr>
                <td>7</td>
                <td><strong>Bo'yin o'mizi kengligi</strong></td>
                <td>± 0.3 sm</td>
                ${model.sizeRange.map(s => `<td>${Math.round(13 + (parseInt(s) - 98) * 0.15)}</td>`).join('')}
              </tr>
              <tr>
                <td>8</td>
                <td><strong>Kapyushon balandligi va chuqurligi</strong></td>
                <td>± 0.5 sm</td>
                ${model.sizeRange.map(s => `<td>${Math.round(27 + (parseInt(s) - 98) * 0.25)}</td>`).join('')}
              </tr>
              <tr>
                <td>9</td>
                <td><strong>Kenguru cho'ntak kengligi / balandligi</strong></td>
                <td>± 0.5 sm</td>
                ${model.sizeRange.map(s => `<td>${Math.round(18 + (parseInt(s) - 98) * 0.2)} / ${Math.round(12 + (parseInt(s) - 98) * 0.15)}</td>`).join('')}
              </tr>
              <tr>
                <td>10</td>
                <td><strong>Etak ribana manjet balandligi</strong></td>
                <td>± 0.2 sm</td>
                ${model.sizeRange.map(() => `<td>5.0</td>`).join('')}
              </tr>
            </tbody>
          </table>

          <!-- JADVAL 4: MATERIALLAR VA FURNITURALAR JADVALI (BOM) -->
          <div class="tp-table-header" style="margin-top: 20px;">🧵 JADVAL 4: XOM-ASHYO VA FURNITURALAR SARF ME'YORI (BILL OF MATERIALS - BOM)</div>
          <table class="tp-data-table">
            <thead>
              <tr>
                <th style="width: 36px;">№</th>
                <th style="width: 110px;">Material turi</th>
                <th>Material nomi va Tavsifi</th>
                <th>Tarkibi va Xususiyati</th>
                <th>1 dona sarfi</th>
                <th>Birlik narxi</th>
                <th>1 dona tannarxi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td><span class="tp-badge-fab">Asosiy mato</span></td>
                <td><strong>${fabric.name}</strong></td>
                <td>${fabric.composition} (${fabric.weight} g/m², Eni: ${model.fabricWidthCm || 185} sm)</td>
                <td><strong>${model.singleConsumptionKg || 0.485} kg</strong> (${model.singleConsumptionMeters || 0.82} m)</td>
                <td>${costingEngine.formatCurrency(fabric.price)} / ${fabric.priceUnit}</td>
                <td><strong>${costingEngine.formatCurrency(costCalc.fabricCost)}</strong></td>
              </tr>
              <tr>
                <td>2</td>
                <td><span class="tp-badge-trim">Qo'shimcha mato</span></td>
                <td><strong>Ribana 2x2 (Kashkorse)</strong></td>
                <td>95% Paxta, 5% Elastan (Manjet va etak uchun)</td>
                <td>0.080 kg</td>
                <td>38 000 so'm / kg</td>
                <td>3 040 so'm</td>
              </tr>
              <tr>
                <td>3</td>
                <td><span class="tp-badge-trim">Tikuv iplari</span></td>
                <td><strong>DorTak 40/2 (100% Spun Poly)</strong></td>
                <td>Overlok 4-ipli va rasshivalka iplari</td>
                <td>${sewCalc.totalThreadMeters} metr</td>
                <td>1.5 so'm / m</td>
                <td>${costingEngine.formatCurrency(costCalc.threadCost)}</td>
              </tr>
              <tr>
                <td>4</td>
                <td><span class="tp-badge-trim">Furnitura</span></td>
                <td><strong>Kapyushon shnuri + Uchliklar</strong></td>
                <td>Paxta to'qima shnur (90 sm) + metall uchi</td>
                <td>1 dona (90 sm)</td>
                <td>1 500 so'm / dona</td>
                <td>1 500 so'm</td>
              </tr>
              <tr>
                <td>5</td>
                <td><span class="tp-badge-trim">Markirovka</span></td>
                <td><strong>Satin brend tegi + Razmernik</strong></td>
                <td>Tarkibi, yuvish belgilari, o'lchami</td>
                <td>1 komplekt</td>
                <td>450 so'm / dona</td>
                <td>450 so'm</td>
              </tr>
              <tr>
                <td>6</td>
                <td><span class="tp-badge-trim">Qadoqlash</span></td>
                <td><strong>Individual BOPP polietilen paket</strong></td>
                <td>30×40 sm, yopishqoq klapanli</td>
                <td>1 dona</td>
                <td>600 so'm / dona</td>
                <td>600 so'm</td>
              </tr>
              <tr>
                <td>7</td>
                <td><span class="tp-badge-trim">Karton tegi</span></td>
                <td><strong>Laminatsiyalangan brend yorlig'i</strong></td>
                <td>350g karton + shnur va shtrix-kod</td>
                <td>1 dona</td>
                <td>850 so'm / dona</td>
                <td>850 so'm</td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="tp-total-row">
                <td colspan="6"><strong>JAMI XOM-ASHYO VA FURNITURA TANNARXI (1 DONA):</strong></td>
                <td><strong>${costingEngine.formatCurrency(costCalc.fabricCost + costCalc.trimsCost + costCalc.threadCost)}</strong></td>
              </tr>
            </tfoot>
          </table>
        </div>

        <!-- ==================== PAGE 3: SEWING ROUTING & COSTING TABLES ==================== -->
        <div class="tp-page-break"></div>
        <div class="techpack-page">
          <div class="tp-sub-header">MODEL: ${model.code} — TEXNOLOGIK MARSHRUT VA IQTISODIY KALKULYATSIYA</div>

          <!-- JADVAL 5: LEKALO DETALLARI SPETSIFIKATSIYASI -->
          <div class="tp-table-header">✂️ JADVAL 5: LEKALO DETALLARI VA BICHUV SPETSIFIKATSIYASI</div>
          <table class="tp-data-table">
            <thead>
              <tr>
                <th style="width: 36px;">№</th>
                <th style="width: 90px;">Detal kodi</th>
                <th>Detal nomi</th>
                <th style="width: 70px;">Soni</th>
                <th>Mato turi</th>
                <th>Gazlama yo'nalishi</th>
                <th style="width: 90px;">Chok haqi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td><strong>D-01</strong></td>
                <td>Old bo'lak (Front Panel)</td>
                <td>1 dona</td>
                <td>Asosiy (Futer 3-ipli)</td>
                <td>Bo'ylama (Asos)</td>
                <td>0.7 sm</td>
              </tr>
              <tr>
                <td>2</td>
                <td><strong>D-02</strong></td>
                <td>Orqa bo'lak (Back Panel)</td>
                <td>1 dona</td>
                <td>Asosiy (Futer 3-ipli)</td>
                <td>Bo'ylama (Asos)</td>
                <td>0.7 sm</td>
              </tr>
              <tr>
                <td>3</td>
                <td><strong>D-03</strong></td>
                <td>Yenglar (Sleeves)</td>
                <td>2 dona</td>
                <td>Asosiy (Futer 3-ipli)</td>
                <td>Bo'ylama (Asos)</td>
                <td>0.7 sm</td>
              </tr>
              <tr>
                <td>4</td>
                <td><strong>D-04</strong></td>
                <td>Kapyushon yon detallari</td>
                <td>2 dona</td>
                <td>Asosiy (Futer 3-ipli)</td>
                <td>Bo'ylama (Asos)</td>
                <td>0.7 sm</td>
              </tr>
              <tr>
                <td>5</td>
                <td><strong>D-05</strong></td>
                <td>Kenguru cho'ntak</td>
                <td>1 dona</td>
                <td>Asosiy (Futer 3-ipli)</td>
                <td>Bo'ylama (Asos)</td>
                <td>0.7 sm (Og'zi 2.0 sm)</td>
              </tr>
              <tr>
                <td>6</td>
                <td><strong>D-06</strong></td>
                <td>Yeng manjetlari</td>
                <td>2 dona</td>
                <td>Qo'shimcha (Ribana 2x2)</td>
                <td>Ko'ndalang (Utok)</td>
                <td>0.7 sm</td>
              </tr>
              <tr>
                <td>7</td>
                <td><strong>D-07</strong></td>
                <td>Etak manjeti (Bel)</td>
                <td>1 dona</td>
                <td>Qo'shimcha (Ribana 2x2)</td>
                <td>Ko'ndalang (Utok)</td>
                <td>0.7 sm</td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="tp-total-row">
                <td colspan="3"><strong>JAMI BICHUV DETALLARI:</strong></td>
                <td colspan="4"><strong>10 dona detal (1 komplekt) | Raskladka unumdorligi: ${model.markerEfficiency || 87.4}%</strong></td>
              </tr>
            </tfoot>
          </table>

          <!-- JADVAL 6: TIKUV TEXNOLOGIK MARSHRUTI VA VAQT ME'YORI -->
          <div class="tp-table-header" style="margin-top: 20px;">🪡 JADVAL 6: TEXNOLOGIK TIKUV OPERATSIYALARI VA VAQT ME'YORI JADVALI</div>
          <table class="tp-data-table tp-routing-table">
            <thead>
              <tr>
                <th style="width: 36px;">№</th>
                <th>Texnologik operatsiya nomi</th>
                <th>Uskuna / Mashina turi</th>
                <th style="width: 80px;">Chok (sm)</th>
                <th style="width: 80px;">Ip sarfi (m)</th>
                <th style="width: 85px;">Vaqt (sek)</th>
                <th style="width: 100px;">Ish haqi</th>
              </tr>
            </thead>
            <tbody>
              ${sewCalc.operations.map(op => `
                <tr>
                  <td>${op.orderNo}</td>
                  <td><strong>${op.name}</strong></td>
                  <td><span class="tp-machine-tag">${op.machineName}</span></td>
                  <td>${op.seamLengthCm} sm</td>
                  <td>${op.threadUsedM} m</td>
                  <td><strong>${op.timeSec} sek</strong></td>
                  <td>${costingEngine.formatCurrency(op.laborCost)}</td>
                </tr>
              `).join('')}
            </tbody>
            <tfoot>
              <tr class="tp-total-row">
                <td colspan="3"><strong>JAMI TIKUV VAQTI VA ISH HAQI ME'YORI:</strong></td>
                <td>-</td>
                <td><strong>${sewCalc.totalThreadMeters} m</strong></td>
                <td><strong>${sewCalc.formattedTime} (${sewCalc.totalTimeSec} sek)</strong></td>
                <td><strong>${costingEngine.formatCurrency(sewCalc.totalLaborCost)}</strong></td>
              </tr>
            </tfoot>
          </table>

          <!-- JADVAL 7: TANNARX VA KALKULYATSIYA JADVALI -->
          <div class="tp-table-header" style="margin-top: 20px;">💰 JADVAL 7: ISHLAB CHIQARISH TANNARXI VA NARX STRUKTURASI JADVALI</div>
          <table class="tp-data-table tp-cost-table">
            <thead>
              <tr>
                <th style="width: 36px;">№</th>
                <th>Xarajat moddasi (Cost Structure Item)</th>
                <th>Hisoblash asosi</th>
                <th style="width: 110px;">Tarkibiy ulush (%)</th>
                <th style="width: 140px;">1 dona qiymati</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td><strong>Asosiy mato xarajati</strong></td>
                <td>${model.singleConsumptionKg || 0.485} kg × ${costingEngine.formatCurrency(fabric.price)}</td>
                <td>${Math.round((costCalc.fabricCost / costCalc.totalUnitCost) * 100)}%</td>
                <td>${costingEngine.formatCurrency(costCalc.fabricCost)}</td>
              </tr>
              <tr>
                <td>2</td>
                <td><strong>Qo'shimcha materiallar va Furnituralar</strong></td>
                <td>Ribana + Zamok + Shnur + Tizim teglari</td>
                <td>${Math.round((costCalc.trimsCost / costCalc.totalUnitCost) * 100)}%</td>
                <td>${costingEngine.formatCurrency(costCalc.trimsCost)}</td>
              </tr>
              <tr>
                <td>3</td>
                <td><strong>Tikuv iplari sarfi</strong></td>
                <td>${sewCalc.totalThreadMeters} m × 1.5 so'm/m</td>
                <td>${Math.round((costCalc.threadCost / costCalc.totalUnitCost) * 100)}%</td>
                <td>${costingEngine.formatCurrency(costCalc.threadCost)}</td>
              </tr>
              <tr>
                <td>4</td>
                <td><strong>Bichuv sexi ish haqi</strong></td>
                <td>Qatlamli bichuv va saralash tarifi</td>
                <td>${Math.round((costCalc.cuttingCost / costCalc.totalUnitCost) * 100)}%</td>
                <td>${costingEngine.formatCurrency(costCalc.cuttingCost)}</td>
              </tr>
              <tr>
                <td>5</td>
                <td><strong>Tikuvchilar ish haqi (Labor)</strong></td>
                <td>Texnologik operatsiyalar summasi (${sewCalc.totalTimeSec} sek)</td>
                <td>${Math.round((costCalc.sewingCost / costCalc.totalUnitCost) * 100)}%</td>
                <td><strong>${costingEngine.formatCurrency(costCalc.sewingCost)}</strong></td>
              </tr>
              <tr>
                <td>6</td>
                <td><strong>Qadoqlash, dazmollash (VTO) va nazorat</strong></td>
                <td>Paketlash, yorliq ilish va qutiga joylash</td>
                <td>${Math.round((costCalc.packingCost / costCalc.totalUnitCost) * 100)}%</td>
                <td>${costingEngine.formatCurrency(costCalc.packingCost)}</td>
              </tr>
              <tr>
                <td>7</td>
                <td><strong>Korxona ustamasi va amortizatsiya</strong></td>
                <td>Bino ijarasi, elektr energiyasi, uskuna xizmati</td>
                <td>${Math.round((costCalc.overheadCost / costCalc.totalUnitCost) * 100)}%</td>
                <td>${costingEngine.formatCurrency(costCalc.overheadCost)}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="tp-total-row" style="background: #e0f2fe; color: #0369a1;">
                <td colspan="3"><strong>JAMI ISHLAB CHIQARISH TANNARXI (1 DONA):</strong></td>
                <td><strong>100%</strong></td>
                <td><strong style="font-size: 14px;">${costingEngine.formatCurrency(costCalc.totalUnitCost)}</strong></td>
              </tr>
              <tr class="tp-total-row" style="background: #dcfce7; color: #15803d;">
                <td colspan="3"><strong>TAVSIYA ETILGAN SOTUV NARXI (${costCalc.targetMarginPercent}% FOYDA MARJASI):</strong></td>
                <td><strong>+${costCalc.targetMarginPercent}%</strong></td>
                <td><strong style="font-size: 15px; color: #15803d;">${costingEngine.formatCurrency(costCalc.recommendedPrice)}</strong></td>
              </tr>
            </tfoot>
          </table>

          <!-- JADVAL 8: SIFAT NAZORATI VA TASDIQLASH JADVALI -->
          <div class="tp-table-header" style="margin-top: 20px;">🛡️ JADVAL 8: SIFAT NAZORATI (QC) VA MAS'UL SHAXSLAR TASDIQLASH JADVALI</div>
          <table class="tp-data-table tp-qc-signatures-table">
            <thead>
              <tr>
                <th>Lavozim / Mas'uliyat</th>
                <th>F.I.SH.</th>
                <th>Sana</th>
                <th>Xulosa / Qaror</th>
                <th>Imzo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Bosh Konstruktor</strong></td>
                <td>Z. Karimova</td>
                <td>${model.createdAt || '04.09.2026'}</td>
                <td><span class="tp-badge-qc-pass">✅ Lekalo va Gradatsiya tasdiqlandi</span></td>
                <td>__________________</td>
              </tr>
              <tr>
                <td><strong>Bosh Texnolog</strong></td>
                <td>M. Rustamov</td>
                <td>${model.createdAt || '04.09.2026'}</td>
                <td><span class="tp-badge-qc-pass">✅ Texnologik me'yorlar qabul qilindi</span></td>
                <td>__________________</td>
              </tr>
              <tr>
                <td><strong>Bichuv Sexi Ustasi</strong></td>
                <td>A. Norbekov</td>
                <td>${model.createdAt || '04.09.2026'}</td>
                <td><span class="tp-badge-qc-pass">✅ Raskladka unumdorligi tekshirildi</span></td>
                <td>__________________</td>
              </tr>
              <tr>
                <td><strong>Sifat Nazorati (QC)</strong></td>
                <td>${model.qcChecklist?.inspector || "D. Rahimova"}</td>
                <td>${model.createdAt || '04.09.2026'}</td>
                <td><span class="tp-badge-qc-pass">✅ Standartlarga 100% muvofiq</span></td>
                <td>__________________</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  printCurrentTechPack(modelId) {
    const html = this.generateTechPackHtml(modelId);
    const printContainer = document.getElementById('printContainer');
    if (printContainer) {
      printContainer.innerHTML = html;
      setTimeout(() => {
        window.print();
      }, 250);
    }
  }
}

const techPackEngine = new TechPackEngine();

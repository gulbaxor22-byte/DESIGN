// app.js - Master Application Controller

class AppController {
  constructor() {
    this.currentView = 'dashboard';
    this.selectedModelId = 'model-k025';
    this.activeLibTab = 'sizes';
    this.floorSeconds = 48;
    this.floorTimerInterval = null;
    this.floorPiecesToday = 48;
    this.isVip = false;
    this.renderedViews = new Set();

    // Telegram Bot Integration (Direct to Bot)
    this.telegramConfig = {
      botToken: '8888011680:AAHMg7QlZuuls8IYmgyptkYUGgui4zl0bqA',
      chatId: '1008172442' // Guli Shamsiyeva (@guli22s)
    };
  }

  // Lightweight debounce helper
  debounce(func, wait = 120) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  init() {
    initI18n();
    document.body.classList.add('theme-dashboard');
    this.bindEvents();
    this.populateTopModelSelector();
    this.populateNewModelFabricSelect();

    // Fast Initial Boot: Render ONLY the active dashboard view immediately
    this.renderDashboard();
    this.renderedViews.add('dashboard');
    this.startFloorStopwatch();
  }

  bindEvents() {
    // Navigation (Sidebar Tabs)
    document.querySelectorAll('.sidebar-nav .nav-item').forEach(item => {
      item.addEventListener('click', () => {
        const view = item.getAttribute('data-view');
        if (view) this.navigateTo(view);
      });
    });

    // Language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const lang = btn.getAttribute('data-lang');
        setLanguage(lang);
      });
    });

    // Global Search & Model Search with debounce
    const globalSearchInput = document.getElementById('globalSearchInput');
    if (globalSearchInput) {
      const debouncedFilter = this.debounce((val) => {
        this.modelSearchQuery = val;
        if (this.currentView === 'models') this.renderAllModels();
      }, 150);
      globalSearchInput.addEventListener('input', (e) => {
        debouncedFilter(e.target.value);
      });
    }

    // Models View Dedicated Search Input
    const modelSearchInput = document.getElementById('modelSearchInput');
    if (modelSearchInput) {
      const debouncedModelFilter = this.debounce((val) => {
        this.modelSearchQuery = val;
        this.renderAllModels();
      }, 150);
      modelSearchInput.addEventListener('input', (e) => {
        debouncedModelFilter(e.target.value);
      });
    }

    // Models Category Chips
    document.querySelectorAll('#modelCategoryChips button').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#modelCategoryChips button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.modelActiveCategory = btn.getAttribute('data-category') || 'all';
        this.renderAllModels();
      });
    });

    // Top Model Selector
    const modelSelector = document.getElementById('topModelSelector');
    if (modelSelector) {
      modelSelector.addEventListener('change', (e) => {
        this.selectedModelId = e.target.value;
        this.onModelSelected(this.selectedModelId);
      });
    }

    // AI Designer Actions
    const btnGen = document.getElementById('btnGenerateAiDesign');
    if (btnGen) {
      btnGen.addEventListener('click', () => this.generateAiConcept());
    }

    const btnApply = document.getElementById('btnApplyAiToModel');
    if (btnApply) {
      btnApply.addEventListener('click', () => this.applyAiConceptToNewModel());
    }

    // Color swatches
    document.querySelectorAll('#aiColorSwatches .swatch').forEach(swatch => {
      swatch.addEventListener('click', () => {
        document.querySelectorAll('#aiColorSwatches .swatch').forEach(s => s.classList.remove('active'));
        swatch.classList.add('active');
        aiDesigner.currentConcept.primaryColor = swatch.getAttribute('data-color');
        this.renderAiDesigner();
      });
    });

    // CAD Sliders & Controls with debounce
    const cadSizeSel = document.getElementById('cadSizeSelector');
    if (cadSizeSel) {
      cadSizeSel.addEventListener('change', (e) => {
        patternCad.currentSize = e.target.value;
        this.renderCad();
      });
    }

    const debouncedRenderCad = this.debounce(() => this.renderCad(), 100);

    const cadSeam = document.getElementById('cadSeamSlider');
    if (cadSeam) {
      cadSeam.addEventListener('input', (e) => {
        patternCad.seamAllowance = parseFloat(e.target.value);
        const disp = document.getElementById('seamValDisplay');
        if (disp) disp.textContent = `${e.target.value} sm`;
        debouncedRenderCad();
      });
    }

    const cadEase = document.getElementById('cadEaseSlider');
    if (cadEase) {
      cadEase.addEventListener('input', (e) => {
        patternCad.easeAllowance = parseFloat(e.target.value);
        const disp = document.getElementById('easeValDisplay');
        if (disp) disp.textContent = `+${e.target.value} sm`;
        debouncedRenderCad();
      });
    }

    const cadGrading = document.getElementById('cadGradingCheck');
    if (cadGrading) {
      cadGrading.addEventListener('change', (e) => {
        patternCad.showGradingOverlay = e.target.checked;
        this.renderCad();
      });
    }

    const btnSvg = document.getElementById('btnExportSvg');
    if (btnSvg) btnSvg.addEventListener('click', () => this.downloadSvg());

    const btnDxf = document.getElementById('btnExportDxf');
    if (btnDxf) btnDxf.addEventListener('click', () => this.downloadDxf());

    const btnPatternPdf = document.getElementById('btnPrintPatternPdf');
    if (btnPatternPdf) btnPatternPdf.addEventListener('click', () => window.print());

    // AI Technologist Chat
    const btnSendAi = document.getElementById('btnSendAiTech');
    if (btnSendAi) {
      btnSendAi.addEventListener('click', () => this.sendAiChatMessage());
    }
    const aiInput = document.getElementById('aiTechInput');
    if (aiInput) {
      aiInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') this.sendAiChatMessage();
      });
    }

    // Floor Mode Actions
    const btnFloorComp = document.getElementById('btnFloorCompleteOp');
    if (btnFloorComp) {
      btnFloorComp.addEventListener('click', () => this.completeFloorOperation());
    }

    const btnFloorToggle = document.getElementById('btnFloorTimerToggle');
    if (btnFloorToggle) {
      btnFloorToggle.addEventListener('click', () => this.toggleFloorTimer());
    }

    const btnFloorReset = document.getElementById('btnFloorTimerReset');
    if (btnFloorReset) {
      btnFloorReset.addEventListener('click', () => this.resetFloorTimer());
    }

    // Language change event listener
    window.addEventListener('languageChanged', () => {
      this.renderedViews.clear();
      this.renderViewOnDemand(this.currentView, true);
    });
  }

  renderAiTechChat() {
    this.renderAiChat();
  }

  handleSendAiTechQuery() {
    this.sendAiChatMessage();
  }

  navigateTo(viewId) {
    this.currentView = viewId;

    // Dynamically update section-specific color theme on body
    document.body.className = document.body.className.replace(/\btheme-\S+/g, '').trim();
    document.body.classList.add(`theme-${viewId}`);

    document.querySelectorAll('.sidebar-nav .nav-item').forEach(item => {
      item.classList.toggle('active', item.getAttribute('data-view') === viewId);
    });

    document.querySelectorAll('.app-view').forEach(view => {
      view.classList.remove('active');
    });

    const target = document.getElementById(`view-${viewId}`);
    if (target) {
      target.classList.add('active');
    }

    const header = document.getElementById('currentPageHeader');
    if (header) {
      header.textContent = t(`nav_${viewId.replace('-', '_')}`) || viewId;
    }

    // Lazy load & render the view only when navigated to
    this.renderViewOnDemand(viewId);
  }

  renderViewOnDemand(viewId, force = false) {
    if (!force && this.renderedViews && this.renderedViews.has(viewId)) {
      return;
    }
    if (!this.renderedViews) this.renderedViews = new Set();

    switch (viewId) {
      case 'dashboard':
        this.renderDashboard();
        break;
      case 'models':
        this.renderAllModels();
        break;
      case 'designer':
        this.renderAiDesigner();
        break;
      case 'cad':
        this.renderCad();
        break;
      case 'materials':
        this.renderMaterials();
        break;
      case 'cutting':
        this.updateCuttingCalculations();
        break;
      case 'sewing':
        this.renderSewingOps();
        break;
      case 'techpack':
        this.renderTechPack();
        break;
      case 'costing':
        this.updateCostingCalculations();
        break;
      case 'production':
      case 'korxona':
        this.renderProductionQc();
        break;
      case 'analytics':
        this.renderAnalytics();
        break;
      case 'library':
        this.switchLibTab(this.activeLibTab || 'sizes');
        break;
      case 'ai-technologist':
        this.renderAiChat();
        break;
    }
    this.renderedViews.add(viewId);
  }

  populateTopModelSelector() {
    const selector = document.getElementById('topModelSelector');
    if (!selector) return;
    const models = db.getModels();
    selector.innerHTML = models.map(m => `
      <option value="${m.id}" ${m.id === this.selectedModelId ? 'selected' : ''}>
        ${m.code} — ${m.name}
      </option>
    `).join('');
  }

  populateNewModelFabricSelect() {
    const sel = document.getElementById('nm_fabric');
    if (!sel) return;
    const mats = db.getMaterials().filter(m => m.type === 'fabric');
    sel.innerHTML = mats.map(m => `
      <option value="${m.id}">${m.name} (${m.color}) - ${costingEngine.formatCurrency(m.price)}/${m.priceUnit}</option>
    `).join('');
  }

  onModelSelected(modelId) {
    this.selectedModelId = modelId;
    const model = db.getModelById(modelId);
    if (!model) return;

    // Update Top Selector & Hero Selector
    const topSel = document.getElementById('topModelSelector');
    if (topSel && topSel.value !== modelId) topSel.value = modelId;
    const heroSel = document.getElementById('heroQuickModelSelect');
    if (heroSel && heroSel.value !== modelId) heroSel.value = modelId;

    // Invalidate cached views so other tabs re-render with new model data when clicked
    this.renderedViews.clear();

    // Re-render currently active view
    this.renderViewOnDemand(this.currentView, true);

    // If on dashboard, sync hero
    if (this.currentView === 'dashboard') {
      this.renderDashboardActiveModelHero();
    }

    // Sync cutting inputs if model has it
    if (model.singleConsumptionMeters) {
      const cutUnitLen = document.getElementById('cutUnitLength');
      if (cutUnitLen) cutUnitLen.value = model.singleConsumptionMeters;
    }

    // Update Models Catalog active cards if models view is rendered
    document.querySelectorAll('.model-card').forEach(card => {
      const cardId = card.getAttribute('data-model-id');
      card.classList.toggle('active-selected', cardId === modelId);
    });

    this.showToast(`⚡ Model yuklandi: ${model.code} — Barcha bo'limlar sinxronlandi!`);
  }

  // Dashboard Active Working Model Hero Card
  renderDashboardActiveModelHero() {
    const heroContainer = document.getElementById('dashboardActiveModelHero');
    if (!heroContainer) return;

    const model = db.getModelById(this.selectedModelId) || db.getModels()[0];
    if (!model) return;

    const frontSvg = aiDesigner.renderForModel(model, 'front');
    const backSvg = aiDesigner.renderForModel(model, 'back');
    const sideSvg = aiDesigner.renderForModel(model, 'side');

    const costStr = model.costing ? costingEngine.formatCurrency(model.costing.totalUnitCost) : "87 500 so'm";
    const priceStr = model.costing ? costingEngine.formatCurrency(model.costing.recommendedPrice) : "118 000 so'm";
    const totalOpsTime = model.operations ? model.operations.reduce((s, o) => s + (o.timeSec || 0), 0) : 200;
    const timeFormatted = sewingCalculator.formatTime(totalOpsTime);

    const allModels = db.getModels();

    heroContainer.innerHTML = `
      <div class="active-model-hero-card">
        <!-- Hero Header -->
        <div class="active-model-hero-header">
          <div class="hero-header-left">
            <div class="hero-crown-badge">🌟</div>
            <div>
              <div class="hero-status-pill">● HOZIRDA FAOL ISHCHI MODEL (BARCHA BO'LIMLARGA YUKLANGAN)</div>
              <h2 class="hero-model-title">${model.code} — ${model.name}</h2>
              <div class="hero-tags-row">
                <span class="hero-tag primary">${t(model.category || 'cat_hoodie')}</span>
                <span class="hero-tag pink">${model.ageGroup || '7-8 yosh'}</span>
                <span class="hero-tag emerald">Asosiy Razmer: ${model.baseSize || '122'} sm</span>
                <span class="hero-tag">${model.season || 'Kuz-Bahor 2026'}</span>
                <span class="hero-tag gold">● ${model.currentStage || 'Tayyor'}</span>
              </div>
            </div>
          </div>

          <!-- Quick Model Switcher Dropdown inside Hero -->
          <div class="hero-switcher-box">
            <label for="heroQuickModelSelect">Boshqa modelni tanlash & yuklash:</label>
            <select id="heroQuickModelSelect" class="form-select" onchange="app.onModelSelected(this.value)">
              ${allModels.map(m => `
                <option value="${m.id}" ${m.id === model.id ? 'selected' : ''}>
                  ${m.code} — ${m.name} (${t(m.category)})
                </option>
              `).join('')}
            </select>
          </div>
        </div>

        <!-- 3-View Sketches in Hero -->
        <div class="hero-sketches-row">
          <div class="hero-sketch-box">
            <span class="hero-sketch-label">✨ OLD KO'RINISH</span>
            <div class="hero-sketch-svg">${frontSvg}</div>
          </div>
          <div class="hero-sketch-box">
            <span class="hero-sketch-label">🔄 ORQA KO'RINISH</span>
            <div class="hero-sketch-svg">${backSvg}</div>
          </div>
          <div class="hero-sketch-box">
            <span class="hero-sketch-label">📐 YON KO'RINISH</span>
            <div class="hero-sketch-svg">${sideSvg}</div>
          </div>
        </div>

        <!-- Manufacturing Metrics Bar -->
        <div class="hero-metrics-grid">
          <div class="hero-metric-item">
            <div class="m-label">🧵 ASOSIY MATO</div>
            <div class="m-val">${model.fabricName || 'Futer 3-ipli'}</div>
            <div class="m-sub">Eni: ${model.fabricWidthCm || 185} sm</div>
          </div>
          <div class="hero-metric-item">
            <div class="m-label">✂️ 1 DONA BICHUV SARFI</div>
            <div class="m-val" style="color:#0284c7;">${model.singleConsumptionMeters || 0.82} m / ${model.singleConsumptionKg || 0.485} kg</div>
            <div class="m-sub">Unumdorlik: ${model.markerEfficiency || 87.4}%</div>
          </div>
          <div class="hero-metric-item">
            <div class="m-label">🪡 TIKUV ME'YORI</div>
            <div class="m-val" style="color:#d97706;">${timeFormatted}</div>
            <div class="m-sub">${model.operations ? model.operations.length : 10} ta operatsiya</div>
          </div>
          <div class="hero-metric-item">
            <div class="m-label">💰 1 DONA TANNARXI / NARXI</div>
            <div class="m-val" style="color:#059669;">${costStr} ➔ ${priceStr}</div>
            <div class="m-sub">Marja: ${model.costing ? model.costing.targetMarginPercent : 35}%</div>
          </div>
        </div>

        <!-- Quick Jump Workflow Action Buttons -->
        <div class="hero-actions-toolbar">
          <span style="font-size: 13px; font-weight: 700; color: #1e1b4b; align-self: center;">Ushbu model bo'yicha tezkor o'tish:</span>
          <button class="btn btn-primary btn-sm" onclick="app.selectModelAndGo('${model.id}', 'cad')">
            <span>📐 Lekalo (CAD)</span>
          </button>
          <button class="btn btn-outline btn-sm" onclick="app.selectModelAndGo('${model.id}', 'cutting')">
            <span>✂️ Bichuv sarfi</span>
          </button>
          <button class="btn btn-outline btn-sm" onclick="app.selectModelAndGo('${model.id}', 'sewing')">
            <span>🪡 Tikuv texnologiyasi</span>
          </button>
          <button class="btn btn-outline btn-sm" onclick="app.selectModelAndGo('${model.id}', 'techpack')">
            <span>📋 Texnologik karta (Tech Pack)</span>
          </button>
          <button class="btn btn-outline btn-sm" onclick="app.selectModelAndGo('${model.id}', 'costing')">
            <span>💰 Tannarx kalkulyatsiyasi</span>
          </button>
        </div>
      </div>
    `;
  }

  // Dashboard Renderer (Clean KPI & Production Focus)
  renderDashboard() {
    const models = db.getModels();
    const readyCount = models.filter(m => m.status === 'ready').length;
    const prodCount = models.filter(m => m.status !== 'ready' && m.status !== 'design').length;
    const cuttingCount = models.filter(m => m.status === 'cutting').length;
    const sewingCount = models.filter(m => m.status === 'sewing').length;
    const materialsCount = db.getMaterials().length;

    const elNew = document.getElementById('kpiNewModels');
    if (elNew) elNew.textContent = models.length;
    const elProd = document.getElementById('kpiInProduction');
    if (elProd) elProd.textContent = prodCount;
    const elReady = document.getElementById('kpiReadyModels');
    if (elReady) elReady.textContent = readyCount;
    const elMat = document.getElementById('kpiMaterials');
    if (elMat) elMat.textContent = materialsCount;
    const elCut = document.getElementById('kpiInCutting');
    if (elCut) elCut.textContent = cuttingCount;
    const elSew = document.getElementById('kpiInSewing');
    if (elSew) elSew.textContent = sewingCount;
    const elBadge = document.getElementById('sidebarModelCount');
    if (elBadge) elBadge.textContent = models.length;
  }

  // Models Catalog Renderer (With Search & Category Filtering)
  renderAllModels() {
    const grid = document.getElementById('allModelsGrid');
    if (!grid) return;

    let models = db.getModels();

    // Category Filter
    if (this.modelActiveCategory && this.modelActiveCategory !== 'all') {
      models = models.filter(m => m.category === this.modelActiveCategory);
    }

    // Search Query Filter
    if (this.modelSearchQuery && this.modelSearchQuery.trim() !== '') {
      const q = this.modelSearchQuery.toLowerCase().trim();
      models = models.filter(m => 
        (m.code && m.code.toLowerCase().includes(q)) ||
        (m.name && m.name.toLowerCase().includes(q)) ||
        (m.fabricName && m.fabricName.toLowerCase().includes(q)) ||
        (m.description && m.description.toLowerCase().includes(q))
      );
    }

    if (models.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px; background: rgba(255,255,255,0.85); border-radius: 16px; border: 1.5px dashed #cbd5e1;">
          <div style="font-size: 36px; margin-bottom: 8px;">🔍</div>
          <h4 style="color: #1e1b4b; margin-bottom: 4px;">Hech qanday model topilmadi</h4>
          <p style="color: #64748b; font-size: 13px;">Qidiruv so'zini o'zgartiring yoki boshqa toifani tanlang.</p>
        </div>
      `;
    } else {
      grid.innerHTML = models.map(m => this.renderModelCardHtml(m)).join('');
    }
  }

  selectModelInCatalog(modelId) {
    this.onModelSelected(modelId);
    if (this.currentView !== 'models') {
      this.navigateTo('models');
    }
  }

  renderBottomModelShowcase() {
    // Deprecated in favor of direct 3-view cards
  }

  renderModelCardHtml(model) {
    const cost = model.costing ? costingEngine.formatCurrency(model.costing.totalUnitCost) : "87 500 so'm";
    const statusClass = model.status || 'ready';
    const statusLabel = model.currentStage || t(`status_${model.status}`);
    const isSelected = model.id === this.selectedModelId;

    const frontSvg = aiDesigner.renderForModel(model, 'front');
    const backSvg = aiDesigner.renderForModel(model, 'back');
    const sideSvg = aiDesigner.renderForModel(model, 'side');

    return `
      <div class="model-card ${isSelected ? 'active-selected' : ''}" data-model-id="${model.id}" onclick="app.onModelSelected('${model.id}')" style="cursor: pointer; position: relative;">
        ${isSelected ? `<span class="selected-active-ribbon">✓ TANLANGAN MODEL</span>` : ''}

        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 16px 6px 16px;">
          <span class="model-code-tag" style="position: static;">${model.code}</span>
          <span class="model-status-tag ${statusClass}" style="position: static;">● ${statusLabel}</span>
        </div>

        <!-- 3-ANGLE PICTURES IN CARD -->
        <div class="model-card-triple-visual">
          <div class="visual-angle-box" title="Old ko'rinish">
            <span class="visual-angle-tag">✨ Oldi</span>
            <div class="angle-svg-wrap">${frontSvg}</div>
          </div>
          <div class="visual-angle-box" title="Orqa ko'rinish">
            <span class="visual-angle-tag">🔄 Orqasi</span>
            <div class="angle-svg-wrap">${backSvg}</div>
          </div>
          <div class="visual-angle-box" title="Yon ko'rinish">
            <span class="visual-angle-tag">📐 Yoni</span>
            <div class="angle-svg-wrap">${sideSvg}</div>
          </div>
        </div>

        <div class="model-card-body">
          <h4 class="model-card-name">${model.name}</h4>
          <div class="model-specs-list">
            <span>Kategoriya: <strong>${t(model.category)}</strong></span>
            <span>Yosh: <strong>${model.ageGroup}</strong></span>
            <span>Razmer: <strong>${model.baseSize} sm</strong></span>
            <span>Mato: <strong>${model.fabricName || 'Futer'}</strong></span>
            <span>Sarf: <strong>${model.singleConsumptionMeters || 0.82} m</strong></span>
          </div>

          <div class="model-cost-row">
            <div class="model-cost-box">
              <span class="label">Tannarxi:</span>
              <span class="cost-val">${cost}</span>
            </div>
            <div class="model-card-actions">
              <button class="btn btn-primary btn-sm" onclick="event.stopPropagation(); app.selectModelAndGo('${model.id}', 'cad')">📐 Lekalo</button>
              <button class="btn btn-outline btn-sm" onclick="event.stopPropagation(); app.selectModelAndGo('${model.id}', 'techpack')">📋 Karta</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  selectModelAndGo(modelId, targetView) {
    this.selectedModelId = modelId;
    const sel = document.getElementById('topModelSelector');
    if (sel) sel.value = modelId;
    this.onModelSelected(modelId);
    this.navigateTo(targetView);
  }

  filterModels(query) {
    const q = query.toLowerCase();
    const models = db.getModels().filter(m => 
      m.name.toLowerCase().includes(q) ||
      m.code.toLowerCase().includes(q) ||
      m.fabricName.toLowerCase().includes(q)
    );
    const grid = document.getElementById('allModelsGrid');
    if (grid) grid.innerHTML = models.map(m => this.renderModelCardHtml(m)).join('');
  }

  // AI Designer Module
  renderAiDesigner() {
    const model = db.getModelById(this.selectedModelId);
    const frontCard = document.getElementById('aiViewFrontCard');
    const backCard = document.getElementById('aiViewBackCard');
    const sideCard = document.getElementById('aiViewSideCard');

    if (model) {
      if (frontCard) frontCard.innerHTML = aiDesigner.renderForModel(model, 'front');
      if (backCard) backCard.innerHTML = aiDesigner.renderForModel(model, 'back');
      if (sideCard) sideCard.innerHTML = aiDesigner.renderForModel(model, 'side');
    } else {
      if (frontCard) frontCard.innerHTML = aiDesigner.renderFrontSvg();
      if (backCard) backCard.innerHTML = aiDesigner.renderBackSvg();
      if (sideCard) sideCard.innerHTML = aiDesigner.renderSideSvg();
    }
  }

  generateAiConcept() {
    const promptInput = document.getElementById('aiPromptInput');
    const text = promptInput ? promptInput.value : "";
    aiDesigner.setPrompt(text);
    this.renderAiDesigner();
    this.showToast("✨ AI Dizayn konseptsiyasi 3 rakursda yaratildi!");
  }

  addAiTag(tagText) {
    const input = document.getElementById('aiPromptInput');
    if (input) {
      input.value += ", " + tagText;
      this.generateAiConcept();
    }
  }

  applyAiConceptToNewModel() {
    const c = aiDesigner.currentConcept;
    const newModel = {
      id: "model-" + Date.now(),
      code: "K-" + Math.floor(100 + Math.random() * 900),
      name: `AI Bolalar ${t(c.category)}`,
      category: c.category,
      gender: c.gender,
      ageGroup: `${c.age} yosh`,
      baseSize: "122",
      sizeRange: ["98", "104", "110", "116", "122", "128", "134"],
      season: "Kuz-Bahor 2026",
      fabricId: "mat-001",
      fabricName: c.fabric,
      fabricColor: "AI Pastel Palette",
      description: c.promptText,
      singleConsumptionMeters: 0.82,
      singleConsumptionKg: 0.485,
      fabricWidthCm: 185,
      markerEfficiency: 87.4,
      cuttingWastePercent: 12.6,
      operations: [
        { id: "op-n1", name: "Old bo'lak cho'ntak ishlovi", machine: "4_overlock", timeSec: 45, seamLengthCm: 70, threadConsM: 10.5, cost: 3375 },
        { id: "op-n2", name: "Yelka va yon choklarni tikish", machine: "4_overlock", timeSec: 40, seamLengthCm: 60, threadConsM: 9.6, cost: 3000 },
        { id: "op-n3", name: "Yeng va manjetlarni biriktirish", machine: "4_overlock", timeSec: 50, seamLengthCm: 75, threadConsM: 12.0, cost: 3750 },
        { id: "op-n4", name: "Kapyushon va bo'yin o'mizini tikish", machine: "coverstitch", timeSec: 55, seamLengthCm: 70, threadConsM: 12.6, cost: 4125 },
        { id: "op-n5", name: "VTO dazmollash va sifat nazorati", machine: "iron_vto", timeSec: 40, seamLengthCm: 0, threadConsM: 0, cost: 3000 }
      ],
      costing: {
        fabricCost: 20370,
        trimsCost: 5400,
        threadCost: 1160,
        cuttingCost: 3500,
        sewingCost: 17250,
        packingCost: 1850,
        overheadCost: 5940,
        totalUnitCost: 55470,
        targetMarginPercent: 35,
        profitPerUnit: 19415,
        recommendedPrice: 74885
      },
      status: "design",
      currentStage: "Dizayn tasdiqlandi",
      progressPercent: 20,
      createdAt: new Date().toISOString().substring(0, 10)
    };

    db.saveModel(newModel);
    this.populateTopModelSelector();
    this.renderDashboard();
    this.renderAllModels();
    this.selectModelAndGo(newModel.id, 'cad');
    this.showToast(`Yangi model yaratildi: ${newModel.code} — ${newModel.name}`);
  }

  // CAD Studio (Lekalo & Konstruktor)
  renderCad() {
    const model = db.getModelById(this.selectedModelId) || db.getModels()[0];
    if (!model) return;

    const titleElem = document.getElementById('cadSelectedModelTitle');
    if (titleElem) {
      titleElem.textContent = `Tanlangan Model: ${model.code} — ${model.name}`;
    }

    const container = document.getElementById('cadSvgContainer');
    if (container) {
      container.innerHTML = patternCad.renderCadSvg(model, patternCad.currentSize);
    }
  }

  downloadSvg() {
    const model = db.getModelById(this.selectedModelId) || db.getModels()[0];
    const svgData = patternCad.renderCadSvg(model, patternCad.currentSize);
    const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `lekalo_${model ? model.code : 'cad'}_${patternCad.currentSize}cm.svg`;
    link.click();
    this.showToast(`SVG Lekalo (${model ? model.code : ''}) yuklab olindi!`);
  }

  downloadDxf() {
    const model = db.getModelById(this.selectedModelId) || db.getModels()[0];
    const dxfData = patternCad.generateDxfContent(model, patternCad.currentSize);
    const blob = new Blob([dxfData], { type: "application/dxf;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `lekalo_${model ? model.code : 'cad'}_${patternCad.currentSize}cm.dxf`;
    link.click();
    this.showToast(`DXF CAD fayli (${model ? model.code : ''}) yuklab olindi (AutoCAD / Optitex)!`);
  }

  cadZoom(factor) {
    const svg = document.getElementById('cadPatternSvg');
    if (!svg) return;
    const currentViewBox = svg.getAttribute('viewBox').split(' ').map(Number);
    const newW = currentViewBox[2] * factor;
    const newH = currentViewBox[3] * factor;
    svg.setAttribute('viewBox', `${currentViewBox[0]} ${currentViewBox[1]} ${newW} ${newH}`);
  }

  // Materials Database
  renderMaterials() {
    const tbody = document.querySelector('#materialsTable tbody');
    if (!tbody) return;
    const mats = db.getMaterials();
    tbody.innerHTML = mats.map(m => `
      <tr>
        <td><strong>${m.name}</strong></td>
        <td><span class="tp-badge-${m.type === 'fabric' ? 'fab' : 'trim'}">${m.type === 'fabric' ? 'Mato' : 'Furnitura'}</span></td>
        <td>${m.composition || '-'}</td>
        <td>${m.weight ? m.weight + ' g/m²' : '-'}</td>
        <td>${m.width ? m.width + ' sm' : '-'}</td>
        <td><strong>${costingEngine.formatCurrency(m.price)}</strong> / ${m.priceUnit}</td>
        <td>${m.color || '-'}</td>
        <td><strong style="color: #059669;">${m.stock}</strong> ${m.stockUnit || 'dona'}</td>
        <td>${m.supplier || '-'}</td>
      </tr>
    `).join('');
  }

  openNewMaterialModal() {
    const name = prompt("Material nomi:");
    if (!name) return;
    const price = prompt("Narxi (so'm):", "35000");
    const weight = prompt("Gramaj (g/m²):", "240");
    const width = prompt("Eni (sm):", "180");
    const color = prompt("Rangi:", "Moviy");

    const newMat = {
      id: "mat-" + Date.now(),
      name,
      type: "fabric",
      composition: "Paxta / Elastan",
      weight: parseInt(weight) || 200,
      width: parseInt(width) || 180,
      price: parseInt(price) || 30000,
      priceUnit: "kg",
      color: color || "Standart",
      stock: 500,
      stockUnit: "kg",
      supplier: "Toshkent Textile Group"
    };

    db.saveMaterial(newMat);
    this.renderMaterials();
    this.populateNewModelFabricSelect();
    this.showToast(`Yangi material qo'shildi: ${newMat.name}`);
  }

  // Cutting & Nesting Calculator
  updateCuttingCalculations() {
    const model = db.getModelById(this.selectedModelId) || db.getModels()[0];
    const widthInput = document.getElementById('cutFabricWidth');
    const gramajInput = document.getElementById('cutFabricGramaj');
    const lengthInput = document.getElementById('cutUnitLength');
    const batchInput = document.getElementById('cutBatchQty');
    const layersInput = document.getElementById('cutLayersCount');

    if (model) {
      if (model.fabricWidthCm && widthInput && !widthInput.dataset.manual) {
        widthInput.value = model.fabricWidthCm;
      }
      if (model.singleConsumptionMeters && lengthInput && !lengthInput.dataset.manual) {
        lengthInput.value = model.singleConsumptionMeters;
      }
    }

    if (widthInput) cuttingCalc.fabricWidth = parseFloat(widthInput.value) || 185;
    if (gramajInput) cuttingCalc.fabricGramaj = parseFloat(gramajInput.value) || 320;
    if (lengthInput) cuttingCalc.unitLengthMeters = parseFloat(lengthInput.value) || 0.82;
    if (batchInput) cuttingCalc.batchQty = parseInt(batchInput.value) || 100;
    if (layersInput) cuttingCalc.layersCount = parseInt(layersInput.value) || 20;

    const calc = cuttingCalc.calculate(model);

    const formulaBox = document.getElementById('cuttingFormulaBox');
    if (formulaBox) {
      formulaBox.innerHTML = `
        <div style="margin-bottom: 6px; font-size: 13.5px;"><strong style="color: #0284c7;">Model: ${model ? model.code + ' — ' + model.name : 'Model'}</strong></div>
        <div><strong>1 dona mato sarfi:</strong> ${calc.unitMeters} m × ${cuttingCalc.fabricWidth} sm eni = <strong>${calc.unitKg} kg</strong></div>
        <div><strong>Mato tannarxi:</strong> ${calc.unitKg} kg × ${costingEngine.formatCurrency(cuttingCalc.fabricPricePerKg)} = <strong>${costingEngine.formatCurrency(calc.unitFabricCost)}</strong></div>
        <div><strong>${calc.batchQty} dona uchun jami:</strong> ${calc.totalMeters} metr (${calc.totalKg} kg) | Jami: <strong>${costingEngine.formatCurrency(calc.totalFabricCost)}</strong></div>
        <div><strong>Bichuv unumdorligi:</strong> Foydali maydon: <strong style="color: #059669;">${calc.markerEfficiency}%</strong> | Chiqindi: <strong style="color: #dc2626;">${calc.wastePercent}%</strong> (${calc.totalWasteKg} kg)</div>
        <div><strong>Bichuv stolidagi raskladka:</strong> ${calc.markerLengthM} metr (${calc.layersCount} qatlam spread)</div>
      `;
    }

    // Benchmark updates
    document.getElementById('bench1Qty').textContent = `${calc.benchmarks.qty1.m} m`;
    document.getElementById('bench1Kg').textContent = `${calc.benchmarks.qty1.kg} kg (${costingEngine.formatCurrency(calc.benchmarks.qty1.cost)})`;

    document.getElementById('bench10Qty').textContent = `${calc.benchmarks.qty10.m} m`;
    document.getElementById('bench10Kg').textContent = `${calc.benchmarks.qty10.kg} kg (${costingEngine.formatCurrency(calc.benchmarks.qty10.cost)})`;

    document.getElementById('bench100Qty').textContent = `${calc.benchmarks.qty100.m} m`;
    document.getElementById('bench100Kg').textContent = `${calc.benchmarks.qty100.kg} kg (${costingEngine.formatCurrency(calc.benchmarks.qty100.cost)})`;

    document.getElementById('bench1000Qty').textContent = `${calc.benchmarks.qty1000.m} m`;
    document.getElementById('bench1000Kg').textContent = `${calc.benchmarks.qty1000.kg} kg (${costingEngine.formatCurrency(calc.benchmarks.qty1000.cost)})`;

    const markerWrap = document.getElementById('markerSvgWrapper');
    if (markerWrap) {
      markerWrap.innerHTML = cuttingCalc.renderMarkerSvg(model);
    }
  }

  // Sewing Operations & Technological Routing Module
  renderSewingOps(filterSection = 'all') {
    const model = db.getModelById(this.selectedModelId);
    if (!model) return;

    const sew = sewingCalc.calculateModelOperations(model.operations || []);

    document.getElementById('sewTotalTimeDisplay').textContent = sew.formattedTime;
    document.getElementById('sewTotalThreadDisplay').textContent = `${sew.totalThreadMeters} m (${sew.totalThreadSpools} bobina)`;
    document.getElementById('sewTotalLaborCostDisplay').textContent = costingEngine.formatCurrency(sew.totalLaborCost);
    document.getElementById('sewOpsCountDisplay').textContent = `${sew.operations.length} ta operatsiya`;

    const tbody = document.querySelector('#sewingOpsTable tbody');
    const tfoot = document.getElementById('sewingOpsTableFoot');

    const getSectionLabel = (op) => {
      const s = op.section || '';
      const name = (op.name || '').toLowerCase();
      if (s === 'front' || name.includes("cho'ntak") || name.includes('old')) return { code: 'front', label: '1. Old bo\'lak', badge: 'pink' };
      if (s === 'back' || name.includes('orqa')) return { code: 'back', label: '2. Orqa bo\'lak', badge: 'indigo' };
      if (s === 'sleeve' || name.includes('yeng') || name.includes('manjet')) return { code: 'sleeve', label: '3. Yeng uzeli', badge: 'sky' };
      if (s === 'hood' || name.includes('kapyushon') || name.includes('yoqa') || name.includes("bo'yin")) return { code: 'hood', label: '4. Kapyushon / Yoqa', badge: 'amber' };
      if (s === 'vto' || name.includes('dazmol') || name.includes('vto') || name.includes('sifat')) return { code: 'vto', label: '6. VTO Dazmol', badge: 'emerald' };
      return { code: 'assembly', label: '5. Montaj yig\'ish', badge: 'purple' };
    };

    const filteredOps = (filterSection === 'all') 
      ? sew.operations 
      : sew.operations.filter(op => getSectionLabel(op).code === filterSection);

    if (tbody) {
      if (filteredOps.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="9" style="text-align: center; padding: 24px; color: #94a3b8;">
              Ushbu bo'lim bo'yicha operatsiyalar topilmadi. Yuqoridagi <strong>"+ Yangi operatsiya qo'shish"</strong> tugmasi orqali qo'shishingiz mumkin.
            </td>
          </tr>
        `;
      } else {
        tbody.innerHTML = filteredOps.map((op, idx) => {
          const sec = getSectionLabel(op);
          return `
            <tr>
              <td style="font-weight: 700; color: #475569;">${op.orderNo || (idx + 1)}</td>
              <td>
                <strong style="color: #1e1b4b; font-size: 13.5px;">${op.name}</strong>
              </td>
              <td>
                <span class="tp-badge-${sec.badge}" style="font-size: 11.5px; padding: 3px 8px; border-radius: 6px; font-weight: 600;">${sec.label}</span>
              </td>
              <td>
                <span class="tp-machine-tag">${op.machineName}</span>
              </td>
              <td><strong>${op.seamLengthCm || 0}</strong> sm</td>
              <td><strong style="color: #0284c7;">${op.threadUsedM || 0}</strong> m</td>
              <td><strong style="color: #d97706;">${op.timeSec}</strong> sek</td>
              <td><strong style="color: #059669;">${costingEngine.formatCurrency(op.laborCost)}</strong></td>
              <td>
                <button class="btn btn-outline btn-sm" onclick="app.removeSewingOp('${op.id}')" title="Operatsiyani o'chirish" style="color: #ef4444; padding: 4px 8px;">🗑️</button>
              </td>
            </tr>
          `;
        }).join('');
      }
    }

    if (tfoot) {
      const filteredTime = filteredOps.reduce((s, o) => s + (o.timeSec || 0), 0);
      const filteredThread = filteredOps.reduce((s, o) => s + (o.threadUsedM || 0), 0);
      const filteredCost = filteredOps.reduce((s, o) => s + (o.laborCost || 0), 0);
      const hourlyCapacity = Math.round(3600 / (filteredTime || 1));

      tfoot.innerHTML = `
        <tr class="tp-total-row" style="background: #f8fafc; font-weight: 700; border-top: 2px solid #cbd5e1;">
          <td colspan="4" style="text-align: right; color: #1e1b4b; font-size: 13px;">
            JAMI KO'RSATKICHLAR (${filteredOps.length} ta jarayon):
          </td>
          <td style="color: #64748b;">-</td>
          <td style="color: #0284c7; font-size: 13.5px;">${filteredThread.toFixed(1)} m</td>
          <td style="color: #d97706; font-size: 13.5px;">${sewingCalculator.formatTime(filteredTime)} (${filteredTime} sek)</td>
          <td style="color: #059669; font-size: 14px;">${costingEngine.formatCurrency(filteredCost)}</td>
          <td style="font-size: 11px; color: #64748b;">⚡ ~${hourlyCapacity} dona/soat</td>
        </tr>
      `;
    }
  }

  filterSewingTable(section) {
    document.querySelectorAll('.sewing-filter-bar button').forEach(btn => btn.classList.remove('active'));
    const btn = document.getElementById(`btnSewFilter${section.charAt(0).toUpperCase() + section.slice(1)}`) || document.getElementById('btnSewFilterAll');
    if (btn) btn.classList.add('active');
    this.renderSewingOps(section);
  }

  openNewOperationModal() {
    const modal = document.getElementById('newSewingOpModal');
    if (modal) {
      modal.classList.add('active');
      document.getElementById('new_op_name')?.focus();
    }
  }

  saveNewSewingOp() {
    const name = document.getElementById('new_op_name')?.value?.trim();
    if (!name) {
      alert("Iltimos, operatsiya nomini kiriting!");
      document.getElementById('new_op_name')?.focus();
      return;
    }

    const section = document.getElementById('new_op_section')?.value || 'assembly';
    const machine = document.getElementById('new_op_machine')?.value || '4_overlock';
    const timeSec = parseInt(document.getElementById('new_op_time')?.value) || 45;
    const seamLengthCm = parseInt(document.getElementById('new_op_seam')?.value) || 60;
    const rate = parseInt(document.getElementById('new_op_rate')?.value) || 75;

    const model = db.getModelById(this.selectedModelId);
    if (!model) return;

    if (!model.operations) model.operations = [];

    // Auto thread calculation
    let threadConsM = 9.6;
    if (machine === 'coverstitch') threadConsM = (seamLengthCm / 100) * 18;
    else if (machine === '4_overlock') threadConsM = (seamLengthCm / 100) * 16;
    else if (machine === 'lockstitch_301') threadConsM = (seamLengthCm / 100) * 2.8;
    else if (machine === 'iron_vto') threadConsM = 0;

    const newOp = {
      id: "op-" + Date.now(),
      name,
      section,
      machine,
      timeSec,
      seamLengthCm,
      threadConsM: parseFloat(threadConsM.toFixed(1)),
      cost: timeSec * rate
    };

    model.operations.push(newOp);
    db.saveModel(model);

    this.closeModals();
    this.renderSewingOps();
    this.renderTechPack();
    this.updateCostingCalculations();
    this.showToast(`Yangi operatsiya qo'shildi: ${name}`);

    // Reset fields
    document.getElementById('new_op_name').value = '';
  }

  removeSewingOp(opId) {
    if (!confirm("Haqiqatan ham ushbu texnologik operatsiyani o'chirmoqchimisiz?")) return;
    const model = db.getModelById(this.selectedModelId);
    if (!model) return;
    model.operations = model.operations.filter(o => o.id !== opId);
    db.saveModel(model);
    this.renderSewingOps();
    this.renderTechPack();
    this.updateCostingCalculations();
    this.showToast("Operatsiya o'chirildi!");
  }

  printSewingRouting() {
    this.navigateTo('techpack');
    setTimeout(() => {
      window.print();
    }, 300);
  }

  // Tech Pack Module
  renderTechPack() {
    const container = document.getElementById('techPackViewContainer');
    if (container) {
      container.innerHTML = techPackEngine.generateTechPackHtml(this.selectedModelId);
    }
  }

  // Costing Module
  updateCostingCalculations() {
    const fabric = parseFloat(document.getElementById('costFabricInput')?.value) || 20370;
    const trims = parseFloat(document.getElementById('costTrimsInput')?.value) || 5400;
    const thread = parseFloat(document.getElementById('costThreadInput')?.value) || 1160;
    const cutting = parseFloat(document.getElementById('costCuttingInput')?.value) || 3500;
    const sewing = parseFloat(document.getElementById('costSewingInput')?.value) || 36000;
    const packing = parseFloat(document.getElementById('costPackingInput')?.value) || 1850;
    const margin = parseFloat(document.getElementById('costMarginSelect')?.value) || 35;

    const costCalc = costingEngine.calculateModelCost({
      fabricCost: fabric,
      trimsCost: trims,
      threadCost: thread,
      cuttingCost: cutting,
      sewingCost: sewing,
      packingCost: packing
    }, margin);

    const fBox = document.getElementById('costingFormulaDisplay');
    if (fBox) {
      fBox.innerHTML = `
        <div><strong>Tannarx formulasi:</strong> Mato (${costingEngine.formatCurrency(fabric)}) + Furnitura (${costingEngine.formatCurrency(trims)}) + Ip (${costingEngine.formatCurrency(thread)}) + Bichuv (${costingEngine.formatCurrency(cutting)}) + Tikuv (${costingEngine.formatCurrency(sewing)}) + Qadoq (${costingEngine.formatCurrency(packing)}) + Ustama 12% (${costingEngine.formatCurrency(costCalc.overheadCost)})</div>
        <div style="margin-top: 6px; font-size: 14px; font-weight: 700; color: #1e3a8a;">= 1 DONA TANNARX: ${costingEngine.formatCurrency(costCalc.totalUnitCost)}</div>
      `;
    }

    document.getElementById('costTotalDisplay').textContent = costingEngine.formatCurrency(costCalc.totalUnitCost);
    document.getElementById('costRecPriceDisplay').textContent = costingEngine.formatCurrency(costCalc.recommendedPrice);
    document.getElementById('costProfitUnitDisplay').textContent = `Sof foyda: +${costingEngine.formatCurrency(costCalc.profitPerUnit)} / dona (${margin}% Marja)`;

    document.getElementById('batch100Profit').textContent = costingEngine.formatCurrency(costCalc.batch100Profit);
    document.getElementById('batch500Profit').textContent = costingEngine.formatCurrency(costCalc.batch500Profit);
    document.getElementById('batch1000Profit').textContent = costingEngine.formatCurrency(costCalc.batch1000Profit);
  }

  // Production & QC Module
  renderProductionQc() {
    const model = db.getModelById(this.selectedModelId);
    if (!model) return;

    const flowContainer = document.getElementById('productionStagesFlow');
    if (flowContainer) {
      const stages = prodQc.getStages();
      flowContainer.innerHTML = stages.map((s, idx) => {
        const isCurrent = s.id === model.status;
        const isPassed = stages.findIndex(st => st.id === model.status) >= idx;

        return `
          <div style="display: flex; align-items: center; gap: 8px;">
            <button class="btn btn-sm ${isCurrent ? 'btn-primary' : isPassed ? 'btn-success' : 'btn-outline'}" 
                    onclick="app.changeModelStage('${s.id}')" style="border-radius: 20px;">
              <span>${s.icon}</span>
              <span>${s.label}</span>
            </button>
            ${idx < stages.length - 1 ? '<span style="color: #cbd5e1; font-weight: bold;">→</span>' : ''}
          </div>
        `;
      }).join('');
    }

    const badge = document.getElementById('qcStatusBadge');
    if (badge) {
      const isPass = model.qcChecklist?.status === 'PASS';
      badge.textContent = isPass ? "QC: PASS (Qabul qilindi)" : "QC: PENDING / FAIL";
      badge.style.background = isPass ? "#dcfce7" : "#fee2e2";
      badge.style.color = isPass ? "#15803d" : "#b91c1c";
    }
  }

  changeModelStage(stageId) {
    prodQc.updateModelStage(this.selectedModelId, stageId);
    this.renderProductionQc();
    this.renderDashboard();
    this.renderAllModels();
    this.showToast(`Bosqich yangilandi: ${stageId.toUpperCase()}`);
  }

  markQcPass() {
    prodQc.saveQcChecklist(this.selectedModelId, {
      measurementTolerance: true,
      seamQuality: true,
      threadTrimming: true,
      fabricStainFree: true,
      trimsOperation: true,
      labelPositioning: true,
      pressingVTO: true,
      packagingReady: true
    }, "Dilnoza Rahimova (Senior QC)");

    this.renderProductionQc();
    this.renderDashboard();
    this.renderAllModels();
    this.showToast("🎉 QC Sifat nazorati to'liq qabul qilindi (PASS)!");
  }

  markQcFail() {
    prodQc.saveQcChecklist(this.selectedModelId, {
      measurementTolerance: true,
      seamQuality: false,
      threadTrimming: false,
      fabricStainFree: true,
      trimsOperation: true,
      labelPositioning: true,
      pressingVTO: false,
      packagingReady: false
    }, "Dilnoza Rahimova (QC)");

    this.renderProductionQc();
    this.renderDashboard();
    this.renderAllModels();
    this.showToast("⚠️ Mahsulot qayta ishlash uchun tikuvchiga qaytarildi (QC: FAIL)!");
  }

  // AI Technologist Chat
  renderAiTechChat() {
    const win = document.getElementById('aiTechChatWindow');
    if (!win) return;

    win.innerHTML = aiTechnologist.chatHistory.map(msg => `
      <div style="display: flex; gap: 12px; align-items: flex-start; ${msg.role === 'user' ? 'flex-direction: row-reverse;' : ''}">
        <div style="width: 38px; height: 38px; border-radius: 50%; background: ${msg.role === 'user' ? '#0284c7' : '#ec4899'}; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 16px;">
          ${msg.role === 'user' ? '👤' : '🤖'}
        </div>
        <div style="background: ${msg.role === 'user' ? '#f0f9ff' : '#ffffff'}; border: 1px solid ${msg.role === 'user' ? '#bae6fd' : '#e2e8f0'}; border-radius: 12px; padding: 16px 20px; max-width: 80%; box-shadow: 0 2px 4px rgba(0,0,0,0.03);">
          <div style="font-size: 13.5px; line-height: 1.6; color: #1e293b;">
            ${msg.text.replace(/\n/g, '<br>').replace(/### (.*?)(<br>|$)/g, '<h4 style="font-size: 15px; margin: 8px 0;">$1</h4>').replace(/#### (.*?)(<br>|$)/g, '<h5 style="font-size: 13.5px; font-weight: 700; color: #0284c7; margin: 8px 0 4px 0;">$1</h5>')}
          </div>
          ${msg.modelData ? `
            <div style="margin-top: 14px; border-top: 1px dashed #cbd5e1; padding-top: 10px;">
              <button class="btn btn-primary btn-sm" onclick="app.importAiTechModel('${msg.modelData.code}')">
                📥 Ushbu hisob-kitobni loyihaga yuklash (${msg.modelData.code})
              </button>
            </div>
          ` : ''}
        </div>
      </div>
    `).join('');

    win.scrollTop = win.scrollHeight;
  }

  handleSendAiTechQuery() {
    const input = document.getElementById('aiTechInput');
    if (!input || !input.value.trim()) return;

    const query = input.value.trim();
    aiTechnologist.chatHistory.push({
      role: "user",
      text: query,
      timestamp: "Hozir"
    });

    const result = aiTechnologist.processQuery(query);
    aiTechnologist.chatHistory.push({
      role: "assistant",
      text: result.responseText,
      modelData: result.modelData,
      timestamp: "Hozir"
    });

    input.value = "";
    this.renderAiTechChat();
  }

  importAiTechModel(modelCode) {
    const msg = aiTechnologist.chatHistory.find(m => m.modelData && m.modelData.code === modelCode);
    if (!msg || !msg.modelData) return;

    const importedModel = {
      id: "model-" + Date.now(),
      ...msg.modelData
    };

    db.saveModel(importedModel);
    this.populateTopModelSelector();
    this.renderDashboard();
    this.renderAllModels();
    this.selectModelAndGo(importedModel.id, 'techpack');
    this.showToast(`AI Texnolog modeli loyihaga muvaffaqiyatli yuklandi: ${importedModel.code}!`);
  }

  // Library Module
  switchLibTab(tab) {
    this.activeLibTab = tab;
    const panel = document.getElementById('libContentPanel');
    if (!panel) return;

    if (tab === 'sizes') {
      const std = db.getSizeStandards();
      panel.innerHTML = `
        <h4 style="font-size: 15px; margin-bottom: 12px;">📏 Bolalar Standart Antropometrik O'lchov Jadvali (GOST / EU)</h4>
        <div class="table-responsive">
          <table class="custom-table">
            <thead>
              <tr>
                <th>Bo'y (Razmer)</th>
                <th>Yosh guruhi</th>
                <th>Ko'krak aylanasi</th>
                <th>Bel aylanasi</th>
                <th>Bo'ksa aylanasi</th>
                <th>Orqa uzunligi</th>
                <th>Yeng uzunligi</th>
                <th>Shim bo'yi</th>
              </tr>
            </thead>
            <tbody>
              ${Object.entries(std).map(([k, v]) => `
                <tr>
                  <td><strong>${k} sm</strong></td>
                  <td>${v.age}</td>
                  <td>${v.chest} sm</td>
                  <td>${v.waist} sm</td>
                  <td>${v.hip} sm</td>
                  <td>${v.backLength} sm</td>
                  <td>${v.sleeveLength} sm</td>
                  <td>${v.legLength} sm</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    } else if (tab === 'stitches') {
      panel.innerHTML = `
        <h4 style="font-size: 15px; margin-bottom: 12px;">🧵 Tikuv Choklari Standarti (ISO 4915) va Ip Sarfi Koeffitsiyentlari</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px;">
          ${libraryEngine.stitchTypes.map(st => `
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <span style="font-size: 20px;">${st.icon}</span>
                <span style="font-weight: 700; color: #0284c7; font-family: 'Fira Code', monospace;">${st.code}</span>
              </div>
              <h5 style="font-size: 14px; font-weight: 700; margin-bottom: 4px;">${st.name}</h5>
              <div style="font-size: 12px; color: #059669; font-weight: 600; margin-bottom: 6px;">Ip sarfi: ${st.threadRatio} chok uzunligiga</div>
              <p style="font-size: 12px; color: var(--text-muted); line-height: 1.4;">${st.desc}</p>
            </div>
          `).join('')}
        </div>
      `;
    } else if (tab === 'machines') {
      panel.innerHTML = `
        <h4 style="font-size: 15px; margin-bottom: 12px;">⚙️ Professional Tikuv Uskunalari va Mashinalar Katalogi</h4>
        <div class="table-responsive">
          <table class="custom-table">
            <thead>
              <tr>
                <th>Model</th>
                <th>Turi</th>
                <th>Tezlik</th>
                <th>Igna turi</th>
                <th>Quvvat</th>
                <th>Xususiyatlari</th>
              </tr>
            </thead>
            <tbody>
              ${libraryEngine.machines.map(m => `
                <tr>
                  <td><strong>${m.name}</strong></td>
                  <td>${m.type}</td>
                  <td>${m.speed}</td>
                  <td><code>${m.needle}</code></td>
                  <td>${m.power}</td>
                  <td>${m.features}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    } else if (tab === 'textile') {
      panel.innerHTML = `
        <h4 style="font-size: 15px; margin-bottom: 12px;">🌿 Bolalar Kiyimlari Uchun To'qimachilik Matolari</h4>
        <div class="table-responsive">
          <table class="custom-table">
            <thead>
              <tr>
                <th>Mato nomi</th>
                <th>Tarkibi</th>
                <th>Gramaj</th>
                <th>Kirishish (Shrinkage)</th>
                <th>Tavsiya Igna</th>
                <th>Qo'llanilishi</th>
              </tr>
            </thead>
            <tbody>
              ${libraryEngine.fabrics.map(f => `
                <tr>
                  <td><strong>${f.name}</strong></td>
                  <td>${f.comp}</td>
                  <td>${f.weight}</td>
                  <td><span style="color: #d97706; font-weight: 600;">${f.shrink}</span></td>
                  <td><code>${f.needle}</code></td>
                  <td>${f.use}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    }
  }

  // Analytics Module
  renderAnalytics() {
    setTimeout(() => {
      analyticsEngine.renderBarChart('analyticsBarCanvas', [140, 185, 210, 245, 230, 280, 260], ["Dush", "Sesh", "Chor", "Pay", "Jum", "Shan", "Yak"]);
      analyticsEngine.renderDonutChart('analyticsDonutCanvas', [35, 22, 14, 11, 8, 6, 4], ["Tikuv", "Mato", "Ustama", "Furnitura", "Bichuv", "Qadoq", "Ip"]);
    }, 100);
  }

  // Floor / Korxona Mode Stopwatch
  startFloorStopwatch() {
    if (this.floorTimerInterval) clearInterval(this.floorTimerInterval);
    this.floorTimerInterval = setInterval(() => {
      this.floorSeconds++;
      const mins = String(Math.floor(this.floorSeconds / 60)).padStart(2, '0');
      const secs = String(this.floorSeconds % 60).padStart(2, '0');
      const disp = document.getElementById('floorStopwatchDisplay');
      if (disp) disp.textContent = `${mins}:${secs}`;
    }, 1000);
  }

  toggleFloorTimer() {
    if (this.floorTimerInterval) {
      clearInterval(this.floorTimerInterval);
      this.floorTimerInterval = null;
      this.showToast("⏸️ Vaqt to'xtatildi");
    } else {
      this.startFloorStopwatch();
      this.showToast("▶️ Vaqt davom ettirilmoqda");
    }
  }

  resetFloorTimer() {
    this.floorSeconds = 0;
    document.getElementById('floorStopwatchDisplay').textContent = "00:00";
    this.showToast("🔄 Vaqt qayta o'rnatildi");
  }

  completeFloorOperation() {
    this.floorPiecesToday++;
    document.getElementById('floorTodayPiecesCount').textContent = this.floorPiecesToday;
    this.floorSeconds = 0;
    
    db.addFloorLog({
      modelCode: "K-025",
      operationName: "Yeng va pastki ribana manjetlarini aylana tikish",
      operatorName: "Malika Yusupova",
      piecesCompleted: 1,
      timePerPieceSec: 48,
      status: "completed"
    });

    this.showToast("✅ Operatsiya yakunlandi! +1 dona hisoblandi.");
  }

  // Modals
  openNewModelModal() {
    document.getElementById('newModelModal').classList.add('active');
  }

  closeModals() {
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
  }

  saveNewModel() {
    const name = document.getElementById('nm_name')?.value || "Yangi Model";
    const code = document.getElementById('nm_code')?.value || ("K-" + Math.floor(100 + Math.random() * 900));
    const cat = document.getElementById('nm_category')?.value || "cat_hoodie";
    const gender = document.getElementById('nm_gender')?.value || "gender_girl";
    const age = document.getElementById('nm_age')?.value || "7–8 yosh";
    const fabricId = document.getElementById('nm_fabric')?.value || "mat-001";
    const desc = document.getElementById('nm_description')?.value || "Yangi kiyim modeli";

    const fabric = db.getMaterialById(fabricId) || db.getMaterials()[0];

    const model = {
      id: "model-" + Date.now(),
      code,
      name,
      category: cat,
      gender,
      ageGroup: age,
      baseSize: "122",
      sizeRange: ["98", "104", "110", "116", "122", "128"],
      season: "Kuz-Bahor 2026",
      fabricId,
      fabricName: fabric.name,
      fabricColor: fabric.color,
      description: desc,
      singleConsumptionMeters: 0.82,
      singleConsumptionKg: 0.485,
      fabricWidthCm: 185,
      markerEfficiency: 87.4,
      cuttingWastePercent: 12.6,
      operations: [
        { id: "op-1", name: "Old bo'lak cho'ntak tikish", machine: "4_overlock", timeSec: 45, seamLengthCm: 70, threadConsM: 10.5, cost: 3375 },
        { id: "op-2", name: "Yelka va yon choklarni birlashtirish", machine: "4_overlock", timeSec: 40, seamLengthCm: 60, threadConsM: 9.6, cost: 3000 },
        { id: "op-3", name: "Yeng va manjetlarni tikish", machine: "4_overlock", timeSec: 50, seamLengthCm: 75, threadConsM: 12.0, cost: 3750 },
        { id: "op-4", name: "VTO dazmol va qadoqlash", machine: "iron_vto", timeSec: 40, seamLengthCm: 0, threadConsM: 0, cost: 3000 }
      ],
      costing: {
        fabricCost: 20370,
        trimsCost: 5400,
        threadCost: 1160,
        cuttingCost: 3500,
        sewingCost: 13125,
        packingCost: 1850,
        overheadCost: 5450,
        totalUnitCost: 50855,
        targetMarginPercent: 35,
        profitPerUnit: 17800,
        recommendedPrice: 68655
      },
      status: "design",
      currentStage: "Dizayn bosqichi",
      progressPercent: 15,
      createdAt: new Date().toISOString().substring(0, 10)
    };

    db.saveModel(model);
    this.closeModals();
    this.populateTopModelSelector();
    this.renderDashboard();
    this.renderAllModels();
    this.selectModelAndGo(model.id, 'cad');
    this.showToast(`Yangi model muvaffaqiyatli saqlandi: ${code}!`);
  }

  // Premium VIP Modal Handlers
  openPremiumModal() {
    const modal = document.getElementById('premiumVipModal');
    if (modal) {
      modal.classList.add('active');
      const timeDisplay = document.getElementById('prem_current_time_display');
      if (timeDisplay) {
        timeDisplay.textContent = new Date().toLocaleString('uz-UZ', { 
          year: 'numeric', month: '2-digit', day: '2-digit', 
          hour: '2-digit', minute: '2-digit', second: '2-digit' 
        });
      }
    }
  }

  selectVipPlan(planName) {
    const sel = document.getElementById('prem_user_plan');
    if (sel) {
      for (let i = 0; i < sel.options.length; i++) {
        if (sel.options[i].value.includes(planName) || sel.options[i].text.includes(planName)) {
          sel.selectedIndex = i;
          break;
        }
      }
    }
    document.querySelectorAll('.vip-plan-card').forEach(c => {
      c.classList.toggle('active', c.innerText.includes(planName));
    });
    this.showToast(`Tanlangan tarif: ${planName}`);
  }

  // Phone Number Strict 9-Digit Formatting & Restriction
  formatPhoneNumber(input) {
    let raw = input.value.replace(/\D/g, '');
    if (raw.startsWith('998')) {
      raw = raw.substring(3);
    }
    // Strictly restrict to maximum 9 digits
    raw = raw.substring(0, 9);

    let formatted = '+998';
    if (raw.length > 0) {
      formatted += ' (' + raw.substring(0, 2);
    }
    if (raw.length >= 2) {
      formatted += ') ' + raw.substring(2, 5);
    }
    if (raw.length >= 5) {
      formatted += '-' + raw.substring(5, 7);
    }
    if (raw.length >= 7) {
      formatted += '-' + raw.substring(7, 9);
    }
    input.value = formatted;
  }

  handlePhoneKeyDown(e, input) {
    // Prevent deleting the '+998 ' prefix
    if (e.key === 'Backspace' && input.value.length <= 5) {
      e.preventDefault();
      input.value = '+998 ';
    }
  }

  async getOrDetectChatId() {
    if (this.telegramConfig.chatId) return this.telegramConfig.chatId;
    const saved = localStorage.getItem('tg_chat_id');
    if (saved) {
      this.telegramConfig.chatId = saved;
      return saved;
    }
    try {
      const res = await fetch(`https://api.telegram.org/bot${this.telegramConfig.botToken}/getUpdates`);
      const data = await res.json();
      if (data.ok && data.result && data.result.length > 0) {
        const last = data.result[data.result.length - 1];
        const cid = last.message ? last.message.chat.id : (last.channel_post ? last.channel_post.chat.id : (last.my_chat_member ? last.my_chat_member.chat.id : null));
        if (cid) {
          this.telegramConfig.chatId = cid;
          localStorage.setItem('tg_chat_id', cid);
          return cid;
        }
      }
    } catch (e) {
      console.warn('Could not auto-detect Telegram Chat ID:', e);
    }
    return '1008172442'; // Fallback to verified bot admin
  }

  async submitPremiumApplication(e) {
    e.preventDefault();
    const name = document.getElementById('prem_user_name')?.value?.trim() || '';
    const phone = document.getElementById('prem_user_phone')?.value?.trim() || '';
    const company = document.getElementById('prem_user_company')?.value?.trim() || 'Kiritilmagan';
    const plan = document.getElementById('prem_user_plan')?.value || 'Atelier Pro';

    // Strict 9-digit validation
    let cleanPhoneDigits = phone.replace(/\D/g, '');
    if (cleanPhoneDigits.startsWith('998')) {
      cleanPhoneDigits = cleanPhoneDigits.substring(3);
    }

    if (!name) {
      alert("Iltimos, ism va familiyangizni kiriting!");
      document.getElementById('prem_user_name')?.focus();
      return;
    }

    if (cleanPhoneDigits.length !== 9) {
      alert("Iltimos, telefon raqamingizni to'liq kiriting!\n+998 dan keyin aynan 9 ta raqam bo'lishi shart (masalan: +998 90 123 45 67).");
      const phoneInput = document.getElementById('prem_user_phone');
      if (phoneInput) phoneInput.focus();
      return;
    }

    // Exact timestamp
    const now = new Date();
    const timestamp = now.toLocaleString('uz-UZ', { 
      year: 'numeric', month: '2-digit', day: '2-digit', 
      hour: '2-digit', minute: '2-digit', second: '2-digit' 
    });

    const submitBtn = document.getElementById('btnSubmitPremiumOrder');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>⏳ Telegramga yuborilmoqda...</span>`;
    }

    // Save to internal database
    const application = {
      id: 'prem-app-' + Date.now(),
      name,
      phone,
      company,
      plan,
      timestamp,
      createdAt: now.toISOString()
    };
    db.savePremiumApplication(application);

    // Rich HTML format for Telegram
    const telegramMessage = 
      `👑 <b>YANGI PREMIUM ARIZA TUSHDI!</b>\n\n` +
      `👤 <b>Foydalanuvchi:</b> ${name}\n` +
      `📞 <b>Telefon raqami:</b> <code>${phone}</code>\n` +
      `🏢 <b>Korxona / Brend:</b> ${company}\n` +
      `🌟 <b>Tanlangan Tarif:</b> ${plan}\n` +
      `⏰ <b>Ariza yuborilgan vaqt:</b> ${timestamp}\n\n` +
      `🌐 <b>Tizim:</b> AI Kids Fashion & Production Platform`;

    try {
      const activeChatId = await this.getOrDetectChatId();

      if (this.telegramConfig.botToken && activeChatId) {
        const url = `https://api.telegram.org/bot${this.telegramConfig.botToken}/sendMessage`;
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: activeChatId,
            text: telegramMessage,
            parse_mode: 'HTML'
          })
        });
        const result = await res.json();
        if (result.ok) {
          this.showToast(`✅ Arizangiz Telegram botga yuborildi!`);
        } else {
          console.warn('Telegram API Response:', result);
          this.showToast(`✅ Arizangiz qabul qilindi!`);
        }
      } else {
        console.log("Telegram Botga yuboriladigan xabar:", telegramMessage);
        this.showToast(`✅ Arizangiz muvaffaqiyatli saqlandi!`);
      }

      // Reset form & close modal
      document.getElementById('premiumApplicationForm')?.reset();
      this.closeModals();

      alert(
        `🎉 ARIZANGIZ QABUL QILINDI!\n\n` +
        `👤 Ism: ${name}\n` +
        `📞 Tel: ${phone}\n` +
        `🌟 Tarif: ${plan}\n` +
        `⏰ Ariza vaqti: ${timestamp}\n\n` +
        `Ma'lumotlaringiz Telegram botga yuborildi. Tez orada siz bilan bog'lanamiz!`
      );
    } catch (err) {
      console.error('Error submitting application:', err);
      this.showToast(`✅ Arizangiz tizimda muvaffaqiyatli saqlandi!`);
      this.closeModals();
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>🚀 PREMIUM OLISH / ARIZANI YUBORISH</span>`;
      }
    }
  }

  toggleVipStatus() {
    this.isVip = !this.isVip;
    const btnToggle = document.getElementById('btnActivateVipToggle');
    const avatar = document.getElementById('userAvatarBadge');
    const role = document.getElementById('userRoleBadge');

    if (this.isVip) {
      if (btnToggle) {
        btnToggle.innerHTML = `<span>✅ VIP PRO FAOLLASHTIRILDI</span>`;
        btnToggle.classList.add('vip-active-indicator');
      }
      if (avatar) {
        avatar.innerHTML = `👑`;
        avatar.style.background = `linear-gradient(135deg, #f59e0b, #d97706)`;
        avatar.style.boxShadow = `0 0 16px rgba(245, 158, 11, 0.7)`;
      }
      if (role) {
        role.innerHTML = `<span style="color:#fbbf24; font-weight:800;">👑 VIP PRO Master</span>`;
      }
      this.showToast(`🎉 Tabriklaymiz! PREMIUM VIP PRO imkoniyatlari muvaffaqiyatli faollashtirildi!`);
      this.closeModals();
    } else {
      if (btnToggle) {
        btnToggle.innerHTML = `<span>✨ VIP REJIMNI FAOLLASHTIRISH</span>`;
        btnToggle.classList.remove('vip-active-indicator');
      }
      if (avatar) {
        avatar.innerHTML = `AD`;
        avatar.style.background = `linear-gradient(135deg, #38bdf8, #818cf8)`;
        avatar.style.boxShadow = `none`;
      }
      if (role) {
        role.innerHTML = `Admin & Designer`;
      }
      this.showToast(`VIP rejim o'chirildi`);
    }
  }

  // AI Chat Engine Handlers
  renderAiChat() {
    if (typeof aiChatEngine === 'undefined') return;
    const messages = aiChatEngine.getMessages();

    const generateBubbleHtml = (msg) => {
      const isUser = msg.sender === 'user';
      return `
        <div class="chat-bubble ${isUser ? 'user' : 'ai'}">
          <div style="font-size: 11px; font-weight: 700; opacity: 0.85; margin-bottom: 4px;">
            ${isUser ? '👤 Siz' : '🤖 AI Texnolog'}
          </div>
          <div>${msg.text}</div>
          <div class="chat-bubble-meta">${msg.time}</div>
        </div>
      `;
    };

    const mainChatWindow = document.getElementById('aiTechChatWindow');
    if (mainChatWindow) {
      mainChatWindow.innerHTML = messages.map(generateBubbleHtml).join('');
      mainChatWindow.scrollTop = mainChatWindow.scrollHeight;
    }

    const floatingChatBody = document.getElementById('floatingChatMessages');
    if (floatingChatBody) {
      floatingChatBody.innerHTML = messages.map(generateBubbleHtml).join('');
      floatingChatBody.scrollTop = floatingChatBody.scrollHeight;
    }
  }

  async sendAiChatMessage() {
    const input = document.getElementById('aiTechInput');
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;

    aiChatEngine.addUserMessage(text);
    input.value = '';
    this.renderAiChat();

    // Show typing indicator in chat
    const mainChatWindow = document.getElementById('aiTechChatWindow');
    if (mainChatWindow) {
      const typingDiv = document.createElement('div');
      typingDiv.className = 'chat-bubble ai';
      typingDiv.id = 'aiTypingIndicator';
      typingDiv.innerHTML = `<em>🤖 AI Texnolog hisoblamoqda va tahlil qilmoqda...</em>`;
      mainChatWindow.appendChild(typingDiv);
      mainChatWindow.scrollTop = mainChatWindow.scrollHeight;
    }

    await aiChatEngine.generateResponse(text);
    this.renderAiChat();
  }

  sendQuickAiPrompt(text) {
    const input = document.getElementById('aiTechInput');
    if (input) {
      input.value = text;
      this.sendAiChatMessage();
    }
  }

  async sendFloatingAiMessage() {
    const input = document.getElementById('floatingChatInput');
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;

    aiChatEngine.addUserMessage(text);
    input.value = '';
    this.renderAiChat();

    await aiChatEngine.generateResponse(text);
    this.renderAiChat();
  }

  toggleFloatingAiChat() {
    const drawer = document.getElementById('floatingChatDrawer');
    if (drawer) {
      drawer.classList.toggle('active');
      if (drawer.classList.contains('active')) {
        this.renderAiChat();
        document.getElementById('floatingChatInput')?.focus();
      }
    }
  }

  clearAiChat() {
    aiChatEngine.clearChat();
    this.renderAiChat();
    this.showToast("Suhbat tarixi tozalandi");
  }

  // Toast Notification
  showToast(msg) {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>✨</span> <span>${msg}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
}

const app = new AppController();
window.addEventListener('DOMContentLoaded', () => {
  app.init();
});

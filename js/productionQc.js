// productionQc.js - Production Stage Tracking & 8-Point Quality Control (QC) System

class ProductionQcEngine {
  constructor() {
    this.stages = [
      { id: "design", label: "Dizayn", icon: "🎨", color: "#ec4899" },
      { id: "cad", label: "Konstruktor", icon: "📐", color: "#8b5cf6" },
      { id: "pattern", label: "Lekalo", icon: "✂️", color: "#3b82f6" },
      { id: "cutting", label: "Bichuv", icon: "📦", color: "#06b6d4" },
      { id: "sewing", label: "Tikuv", icon: "🪡", color: "#f59e0b" },
      { id: "qc", label: "QC Nazorati", icon: "🔍", color: "#e11d48" },
      { id: "ready", label: "Tayyor", icon: "🟢", color: "#10b981" }
    ];
  }

  getStages() {
    return this.stages;
  }

  updateModelStage(modelId, newStageId, operator = "Boshqaruvchi") {
    const model = db.getModelById(modelId);
    if (!model) return;

    model.status = newStageId;
    const stageObj = this.stages.find(s => s.id === newStageId);
    model.currentStage = stageObj ? stageObj.label : newStageId;
    
    // Calculate progress %
    const stageIdx = this.stages.findIndex(s => s.id === newStageId);
    model.progressPercent = Math.round(((stageIdx + 1) / this.stages.length) * 100);

    // Add to floor logs
    db.addFloorLog({
      modelCode: model.code,
      operationName: `Bosqich o'zgartirildi: ${stageObj.label}`,
      operatorName: operator,
      piecesCompleted: 1,
      timePerPieceSec: 0,
      status: "completed"
    });

    db.saveModel(model);
    return model;
  }

  saveQcChecklist(modelId, checklistData, inspectorName = "QC Nazoratchi") {
    const model = db.getModelById(modelId);
    if (!model) return;

    const allPassed = checklistData.measurementTolerance &&
                      checklistData.seamQuality &&
                      checklistData.threadTrimming &&
                      checklistData.fabricStainFree &&
                      checklistData.trimsOperation &&
                      checklistData.labelPositioning &&
                      checklistData.pressingVTO &&
                      checklistData.packagingReady;

    model.qcChecklist = {
      ...checklistData,
      status: allPassed ? "PASS" : "FAIL",
      inspector: inspectorName,
      inspectedAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    if (allPassed) {
      model.status = "ready";
      model.currentStage = "Tayyor (QC Passed)";
      model.progressPercent = 100;
    } else {
      model.status = "sewing";
      model.currentStage = "Qayta ishlashda (QC Defekt)";
    }

    db.saveModel(model);
    return model;
  }
}

const prodQc = new ProductionQcEngine();

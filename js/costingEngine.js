// costingEngine.js - Transparent Costing, Margin & Pricing Engine

class CostingEngine {
  constructor() {
    this.defaultMargin = 35; // 35%
    this.overheadRate = 12; // 12%
  }

  calculateModelCost(costData, marginPercent = this.defaultMargin) {
    const fabric = Number(costData.fabricCost) || 0;
    const trims = Number(costData.trimsCost) || 0;
    const thread = Number(costData.threadCost) || 0;
    const cutting = Number(costData.cuttingCost) || 0;
    const sewing = Number(costData.sewingCost) || 0;
    const packing = Number(costData.packingCost) || 0;

    // Direct production cost
    const directCost = fabric + trims + thread + cutting + sewing + packing;

    // Overhead (Factory indirect expenses, electricity, rent, depreciation)
    const overhead = costData.overheadCost !== undefined ? Number(costData.overheadCost) : Math.round(directCost * (this.overheadRate / 100));

    // Total Unit Cost
    const totalUnitCost = directCost + overhead;

    // Margin & Profit
    const profitPerUnit = Math.round(totalUnitCost * (marginPercent / 100));
    const recommendedPrice = totalUnitCost + profitPerUnit;

    // Percentage shares for visual breakdown
    const shares = {
      fabric: totalUnitCost ? ((fabric / totalUnitCost) * 100).toFixed(1) : 0,
      trims: totalUnitCost ? ((trims / totalUnitCost) * 100).toFixed(1) : 0,
      thread: totalUnitCost ? ((thread / totalUnitCost) * 100).toFixed(1) : 0,
      cutting: totalUnitCost ? ((cutting / totalUnitCost) * 100).toFixed(1) : 0,
      sewing: totalUnitCost ? ((sewing / totalUnitCost) * 100).toFixed(1) : 0,
      packing: totalUnitCost ? ((packing / totalUnitCost) * 100).toFixed(1) : 0,
      overhead: totalUnitCost ? ((overhead / totalUnitCost) * 100).toFixed(1) : 0
    };

    return {
      fabricCost: fabric,
      trimsCost: trims,
      threadCost: thread,
      cuttingCost: cutting,
      sewingCost: sewing,
      packingCost: packing,
      overheadCost: overhead,
      directCost,
      totalUnitCost,
      targetMarginPercent: marginPercent,
      profitPerUnit,
      recommendedPrice,
      shares,

      // Batch profit multipliers
      batch100Profit: profitPerUnit * 100,
      batch500Profit: profitPerUnit * 500,
      batch1000Profit: profitPerUnit * 1000
    };
  }

  formatCurrency(val, currency = "so'm") {
    return (Math.round(val) || 0).toLocaleString('uz-UZ') + " " + currency;
  }
}

const costingEngine = new CostingEngine();

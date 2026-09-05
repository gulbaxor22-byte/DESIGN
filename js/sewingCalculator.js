// sewingCalculator.js - Sewing Technology, Time Norms & Thread Consumption Calculator

class SewingCalculatorEngine {
  constructor() {
    this.laborRatePerSec = 75; // 75 so'm per second (~4500 so'm/minute)
    this.threadPricePerMeter = 1.5; // so'm per meter
  }

  calculateModelOperations(operations = []) {
    let totalTimeSec = 0;
    let totalThreadMeters = 0;
    let totalLaborCost = 0;
    let totalThreadCost = 0;

    const machines = db.getMachineTypes();

    const processed = operations.map((op, idx) => {
      const machineInfo = machines[op.machine] || { name: op.machine, threadRatio: 2.8 };
      const seamLenMeters = (op.seamLengthCm || 0) / 100;
      const threadUsedM = seamLenMeters * (machineInfo.threadRatio || 0);
      const threadCost = threadUsedM * this.threadPricePerMeter;
      const laborCost = (op.timeSec || 0) * this.laborRatePerSec;

      totalTimeSec += (op.timeSec || 0);
      totalThreadMeters += threadUsedM;
      totalLaborCost += laborCost;
      totalThreadCost += threadCost;

      return {
        ...op,
        orderNo: idx + 1,
        machineName: machineInfo.name,
        threadRatio: machineInfo.threadRatio,
        threadUsedM: Math.round(threadUsedM * 10) / 10,
        threadCost: Math.round(threadCost),
        laborCost: Math.round(laborCost)
      };
    });

    const mins = Math.floor(totalTimeSec / 60);
    const remainingSec = totalTimeSec % 60;
    const formattedTime = `${mins} min ${remainingSec} sek (${totalTimeSec} sek)`;

    return {
      operations: processed,
      totalTimeSec,
      formattedTime,
      totalThreadMeters: Math.round(totalThreadMeters * 10) / 10,
      totalThreadSpools: (totalThreadMeters / 4000).toFixed(3), // based on 4000m spool
      totalLaborCost: Math.round(totalLaborCost),
      totalThreadCost: Math.round(totalThreadCost),
      totalOperationCost: Math.round(totalLaborCost + totalThreadCost)
    };
  }

  formatSecondsToMinSec(sec) {
    const mins = Math.floor(sec / 60);
    const remainingSec = sec % 60;
    return `${mins} min ${remainingSec} sek`;
  }
}

const sewingCalc = new SewingCalculatorEngine();

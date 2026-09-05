// analytics.js - Production Analytics, Cost Donut & Yield Charts

class AnalyticsEngine {
  constructor() {}

  renderDonutChart(canvasId, data = [35, 20, 15, 10, 8, 7, 5], labels = ["Tikuv", "Mato", "Ustama", "Furnitura", "Bichuv", "Qadoq", "Ip"]) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 20;
    const innerRadius = radius * 0.58;

    const colors = ["#f59e0b", "#0284c7", "#8b5cf6", "#ec4899", "#10b981", "#06b6d4", "#64748b"];
    const total = data.reduce((a, b) => a + b, 0);

    ctx.clearRect(0, 0, width, height);

    let currentAngle = -0.5 * Math.PI;

    data.forEach((val, i) => {
      const sliceAngle = (val / total) * 2 * Math.PI;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
      ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true);
      ctx.closePath();
      ctx.fillStyle = colors[i % colors.length];
      ctx.fill();
      currentAngle += sliceAngle;
    });

    // Center text
    ctx.fillStyle = "#0f172a";
    ctx.font = "bold 16px Outfit, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("TANNARX", centerX, centerY - 8);
    ctx.fillStyle = "#64748b";
    ctx.font = "11px Inter, sans-serif";
    ctx.fillText("100% Xarajat", centerX, centerY + 12);
  }

  renderBarChart(canvasId, data = [120, 150, 180, 220, 190, 240, 210], labels = ["Dush", "Sesh", "Chor", "Pay", "Jum", "Shan", "Yak"]) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    const maxVal = Math.max(...data) * 1.2;
    const barWidth = (chartWidth / data.length) * 0.6;
    const gap = (chartWidth / data.length);

    // Draw baseline
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    data.forEach((val, i) => {
      const barHeight = (val / maxVal) * chartHeight;
      const x = padding + i * gap + (gap - barWidth) / 2;
      const y = height - padding - barHeight;

      // Gradient fill
      const grad = ctx.createLinearGradient(x, y, x, height - padding);
      grad.addColorStop(0, "#0284c7");
      grad.addColorStop(1, "#38bdf8");

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(x, y, barWidth, barHeight, [4, 4, 0, 0]);
      ctx.fill();

      // Top value
      ctx.fillStyle = "#0f172a";
      ctx.font = "bold 11px Outfit, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(val + " dona", x + barWidth / 2, y - 6);

      // Bottom label
      ctx.fillStyle = "#64748b";
      ctx.font = "11px Inter, sans-serif";
      ctx.fillText(labels[i], x + barWidth / 2, height - padding + 16);
    });
  }
}

const analyticsEngine = new AnalyticsEngine();

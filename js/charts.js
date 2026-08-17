/**
 * BMA Market Intelligence - Dynamic Chart Engine (Chart.js Integration)
 * Dynamically reacts to Fiscal Year selection, District, and Tier Filters
 */

class DashboardCharts {
  constructor() {
    this.charts = {};
  }

  initOverviewCharts() {
    if (typeof Chart === "undefined") {
      console.warn("Chart.js is not loaded. Charts will be skipped or rendered via fallbacks.");
      return;
    }
    this.renderRevenueRankingChart();
    this.renderFinancialTrendsChart();
    this.renderExpenseBreakdownChart();
    this.renderStallMixChart();
    this.renderFootfallChart();
    this.renderWasteComparisonChart();
  }

  renderRevenueRankingChart() {
    if (typeof Chart === "undefined") return;
    const ctx = document.getElementById("chartRevenueRanking");
    if (!ctx) return;

    if (this.charts.revenueRanking) {
      this.charts.revenueRanking.destroy();
    }

    const app = window.app;
    const targetYear = app ? app.selectedFiscalYear : 2569;
    const filteredMarkets = app ? app.getFilteredMarkets() : BMA_MARKETS_DATA;

    const labels = filteredMarkets.map(m => m.officialName.replace("ตลาด", ""));
    const revenues = filteredMarkets.map(m => {
      const fin = app ? app.getMarketFinancialsForYear(m, targetYear) : { revenue: m.financials.annualRevenueTotal };
      return +(fin.revenue / 1000000).toFixed(1);
    });
    const profits = filteredMarkets.map(m => {
      const fin = app ? app.getMarketFinancialsForYear(m, targetYear) : { profit: m.financials.netProfit };
      return +(fin.profit / 1000000).toFixed(1);
    });

    this.charts.revenueRanking = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: `รายได้รวม ปี ${targetYear} (ล้านบาท)`,
            data: revenues,
            backgroundColor: "rgba(16, 185, 129, 0.85)",
            borderColor: "#10b981",
            borderWidth: 1,
            borderRadius: 6
          },
          {
            label: `กำไรสุทธิ ปี ${targetYear} (ล้านบาท)`,
            data: profits,
            backgroundColor: "rgba(14, 165, 233, 0.85)",
            borderColor: "#0ea5e9",
            borderWidth: 1,
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
            labels: { color: "#cbd5e1", font: { family: "Prompt", size: 12 } }
          },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.dataset.label}: ฿${ctx.parsed.y.toLocaleString()} ล้านบาท`
            }
          }
        },
        scales: {
          x: {
            ticks: { color: "#94a3b8", font: { family: "Prompt", size: 11 }, maxRotation: 45, minRotation: 20 },
            grid: { color: "rgba(255, 255, 255, 0.05)" }
          },
          y: {
            ticks: {
              color: "#94a3b8",
              callback: (v) => `฿${v}M`
            },
            grid: { color: "rgba(255, 255, 255, 0.08)" }
          }
        }
      }
    });
  }

  renderFinancialTrendsChart(marketId = "all") {
    if (typeof Chart === "undefined") return;
    const ctx = document.getElementById("chartFinancialTrends");
    if (!ctx) return;

    if (this.charts.financialTrends) {
      this.charts.financialTrends.destroy();
    }

    const app = window.app;
    const filteredMarkets = app ? app.getFilteredMarkets() : BMA_MARKETS_DATA;

    let years = [2566, 2567, 2568, 2569, 2570];
    let revenues = [0, 0, 0, 0, 0];
    let expenses = [0, 0, 0, 0, 0];
    let profits = [0, 0, 0, 0, 0];

    years.forEach((yr, idx) => {
      filteredMarkets.forEach(m => {
        const hist = m.financials.historical.find(h => h.year === yr);
        if (hist) {
          revenues[idx] += hist.revenue / 1000000;
          expenses[idx] += hist.expense / 1000000;
          profits[idx] += hist.profit / 1000000;
        }
      });
    });

    this.charts.financialTrends = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["ปี 2566 (อดีต)", "ปี 2567 (อดีต)", "ปี 2568 (อดีต)", "ปี 2569 (ปัจจุบัน)", "ปี 2570 (คาดการณ์)"],
        datasets: [
          {
            label: "รายได้จัดเก็บ (ล้านบาท)",
            data: revenues.map(v => +v.toFixed(2)),
            borderColor: "#10b981",
            backgroundColor: "rgba(16, 185, 129, 0.15)",
            borderWidth: 3,
            fill: true,
            tension: 0.35,
            pointRadius: 5
          },
          {
            label: "ค่าใช้จ่ายดำเนินงาน (ล้านบาท)",
            data: expenses.map(v => +v.toFixed(2)),
            borderColor: "#f59e0b",
            backgroundColor: "rgba(245, 158, 11, 0.1)",
            borderWidth: 2,
            borderDash: [5, 5],
            fill: false,
            tension: 0.35,
            pointRadius: 4
          },
          {
            label: "กำไรสุทธิ (ล้านบาท)",
            data: profits.map(v => +v.toFixed(2)),
            borderColor: "#06b6d4",
            backgroundColor: "rgba(6, 182, 212, 0.2)",
            borderWidth: 3,
            fill: false,
            tension: 0.35,
            pointRadius: 5
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
            labels: { color: "#cbd5e1", font: { family: "Prompt", size: 12 } }
          },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.dataset.label}: ฿${ctx.parsed.y.toFixed(2)} ล้านบาท`
            }
          }
        },
        scales: {
          x: {
            ticks: { color: "#94a3b8", font: { family: "Prompt" } },
            grid: { color: "rgba(255, 255, 255, 0.05)" }
          },
          y: {
            ticks: {
              color: "#94a3b8",
              callback: (v) => `฿${v}M`
            },
            grid: { color: "rgba(255, 255, 255, 0.08)" }
          }
        }
      }
    });
  }

  renderExpenseBreakdownChart() {
    if (typeof Chart === "undefined") return;
    const ctx = document.getElementById("chartExpenseBreakdown");
    if (!ctx) return;

    if (this.charts.expenseBreakdown) {
      this.charts.expenseBreakdown.destroy();
    }

    const app = window.app;
    const filteredMarkets = app ? app.getFilteredMarkets() : BMA_MARKETS_DATA;

    const streamMap = {
      "ทำความสะอาดและขยะ": 0,
      "รปภ. และจราจร": 0,
      "ซ่อมบำรุงและวิศวกรรม": 0,
      "เงินเดือนและบุคลากร": 0,
      "ค่าน้ำ-ไฟ และสาธารณูปโภค": 0,
      "ประกันภัยและกองทุนกลาง": 0
    };

    filteredMarkets.forEach(m => {
      m.financials.expenseStreams.forEach(e => {
        if (e.name.includes("ทำความสะอาด")) streamMap["ทำความสะอาดและขยะ"] += e.amount;
        else if (e.name.includes("รปภ") || e.name.includes("ปลอดภัย")) streamMap["รปภ. และจราจร"] += e.amount;
        else if (e.name.includes("บำรุงรักษา") || e.name.includes("ซ่อม")) streamMap["ซ่อมบำรุงและวิศวกรรม"] += e.amount;
        else if (e.name.includes("เงินเดือน") || e.name.includes("บุคลากร")) streamMap["เงินเดือนและบุคลากร"] += e.amount;
        else if (e.name.includes("น้ำ") || e.name.includes("ไฟ")) streamMap["ค่าน้ำ-ไฟ และสาธารณูปโภค"] += e.amount;
        else streamMap["ประกันภัยและกองทุนกลาง"] += e.amount;
      });
    });

    const labels = Object.keys(streamMap);
    const data = Object.values(streamMap).map(v => +(v / 1000000).toFixed(2));

    this.charts.expenseBreakdown = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: [
            "#10b981",
            "#0284c7",
            "#f59e0b",
            "#8b5cf6",
            "#ec4899",
            "#64748b"
          ],
          borderWidth: 2,
          borderColor: "#1e293b"
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "right",
            labels: { color: "#cbd5e1", font: { family: "Prompt", size: 11 }, boxWidth: 12 }
          },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.label}: ฿${ctx.parsed} ล้านบาท`
            }
          }
        },
        cutout: "68%"
      }
    });
  }

  renderStallMixChart() {
    if (typeof Chart === "undefined") return;
    const ctx = document.getElementById("chartStallMix");
    if (!ctx) return;

    if (this.charts.stallMix) {
      this.charts.stallMix.destroy();
    }

    const app = window.app;
    const filteredMarkets = app ? app.getFilteredMarkets() : BMA_MARKETS_DATA;

    const typeSummary = {
      "อาหารสด / ตลาดเปียก": 0,
      "อาหารปรุงสำเร็จ / สตรีทฟู้ด": 0,
      "เสื้อผ้าและแฟชั่น": 0,
      "ต้นไม้และเกษตรกรรม": 0,
      "สัตว์เลี้ยงและอุปกรณ์": 0,
      "พระเครื่อง / หัตถกรรม / ของเก่า": 0,
      "เบ็ดเตล็ด / สินค้าธงฟ้า": 0
    };

    filteredMarkets.forEach(m => {
      m.stalls.stallTypes.forEach(st => {
        const name = st.type;
        if (name.includes("สด") || name.includes("เนื้อสัตว์") || name.includes("ปลา") || name.includes("ผัก")) {
          typeSummary["อาหารสด / ตลาดเปียก"] += st.count;
        } else if (name.includes("ปรุงสำเร็จ") || name.includes("สตรีทฟู้ด") || name.includes("เครื่องดื่ม") || name.includes("ฮาลาล")) {
          typeSummary["อาหารปรุงสำเร็จ / สตรีทฟู้ด"] += st.count;
        } else if (name.includes("เสื้อผ้า") || name.includes("แฟชั่น") || name.includes("แต่งกาย")) {
          typeSummary["เสื้อผ้าและแฟชั่น"] += st.count;
        } else if (name.includes("ต้นไม้") || name.includes("ดอกไม้") || name.includes("จัดสวน")) {
          typeSummary["ต้นไม้และเกษตรกรรม"] += st.count;
        } else if (name.includes("สัตว์เลี้ยง") || name.includes("ปลาสวยงาม")) {
          typeSummary["สัตว์เลี้ยงและอุปกรณ์"] += st.count;
        } else if (name.includes("พระ") || name.includes("หัตถกรรม") || name.includes("เก่า") || name.includes("ศิลปะ")) {
          typeSummary["พระเครื่อง / หัตถกรรม / ของเก่า"] += st.count;
        } else {
          typeSummary["เบ็ดเตล็ด / สินค้าธงฟ้า"] += st.count;
        }
      });
    });

    this.charts.stallMix = new Chart(ctx, {
      type: "polarArea",
      data: {
        labels: Object.keys(typeSummary),
        datasets: [{
          data: Object.values(typeSummary),
          backgroundColor: [
            "rgba(16, 185, 129, 0.75)",
            "rgba(249, 115, 22, 0.75)",
            "rgba(6, 182, 212, 0.75)",
            "rgba(139, 92, 246, 0.75)",
            "rgba(245, 158, 11, 0.75)",
            "rgba(236, 72, 153, 0.75)",
            "rgba(100, 116, 139, 0.75)"
          ],
          borderWidth: 1,
          borderColor: "#0f172a"
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "right",
            labels: { color: "#cbd5e1", font: { family: "Prompt", size: 10 }, boxWidth: 10 }
          },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.label}: ${ctx.parsed.r.toLocaleString()} แผงค้า`
            }
          }
        },
        scales: {
          r: {
            ticks: { display: false },
            grid: { color: "rgba(255, 255, 255, 0.08)" }
          }
        }
      }
    });
  }

  renderFootfallChart() {
    if (typeof Chart === "undefined") return;
    const ctx = document.getElementById("chartFootfall");
    if (!ctx) return;

    if (this.charts.footfall) {
      this.charts.footfall.destroy();
    }

    const hours = ["05:00", "07:00", "09:00", "11:00", "13:00", "15:00", "17:00", "19:00", "21:00", "23:00"];
    const weekendTraffic = [8000, 24000, 42000, 58000, 72000, 85000, 78000, 45000, 22000, 12000];
    const weekdayTraffic = [15000, 32000, 28000, 24000, 21000, 26000, 48000, 38000, 18000, 9000];

    this.charts.footfall = new Chart(ctx, {
      type: "line",
      data: {
        labels: hours,
        datasets: [
          {
            label: "วันเสาร์-อาทิตย์ (คน/ชั่วโมง)",
            data: weekendTraffic,
            borderColor: "#f59e0b",
            backgroundColor: "rgba(245, 158, 11, 0.2)",
            borderWidth: 3,
            fill: true,
            tension: 0.4
          },
          {
            label: "วันธรรมดา จันทร์-ศุกร์ (คน/ชั่วโมง)",
            data: weekdayTraffic,
            borderColor: "#10b981",
            backgroundColor: "rgba(16, 185, 129, 0.15)",
            borderWidth: 3,
            fill: true,
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
            labels: { color: "#cbd5e1", font: { family: "Prompt", size: 11 } }
          }
        },
        scales: {
          x: {
            ticks: { color: "#94a3b8", font: { family: "Inter" } },
            grid: { color: "rgba(255, 255, 255, 0.05)" }
          },
          y: {
            ticks: {
              color: "#94a3b8",
              callback: (v) => `${(v / 1000).toFixed(0)}k`
            },
            grid: { color: "rgba(255, 255, 255, 0.08)" }
          }
        }
      }
    });
  }

  renderWasteComparisonChart() {
    if (typeof Chart === "undefined") return;
    const ctx = document.getElementById("chartWasteComparison");
    if (!ctx) return;

    if (this.charts.wasteComparison) {
      this.charts.wasteComparison.destroy();
    }

    const app = window.app;
    const filteredMarkets = app ? app.getFilteredMarkets() : BMA_MARKETS_DATA;

    const labels = filteredMarkets.map(m => m.officialName.replace("ตลาด", ""));
    const wasteTons = filteredMarkets.map(m => m.wasteManagement.solidWasteTonsPerDay);

    this.charts.wasteComparison = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [{
          label: "ปริมาณขยะมูลฝอย (ตัน/วัน)",
          data: wasteTons,
          backgroundColor: wasteTons.map(t => t >= 15 ? "#ef4444" : (t >= 5 ? "#f59e0b" : "#10b981")),
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ขยะมูลฝอย: ${ctx.parsed.y} ตัน/วัน`
            }
          }
        },
        scales: {
          x: {
            ticks: { color: "#94a3b8", font: { family: "Prompt", size: 10 }, maxRotation: 45 },
            grid: { display: false }
          },
          y: {
            ticks: { color: "#94a3b8", callback: (v) => `${v} ตัน` },
            grid: { color: "rgba(255, 255, 255, 0.06)" }
          }
        }
      }
    });
  }
}

window.DashboardCharts = DashboardCharts;

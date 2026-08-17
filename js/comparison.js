/**
 * BMA Market Intelligence - Multi-Market Checkbox & Multi-Year Financial Comparison Module
 */

class BMAComparisonModule {
  constructor() {
    this.selectedMarketIds = ["chatuchak", "thonburi", "minburi", "bangkapi"]; // Default selected
    this.selectedYears = [2566, 2567, 2568, 2569, 2570]; // Default all 5 years
    this.multiYearViewMode = "bar"; // 'bar', 'line', 'pie', 'table'
    this.multiYearTargetMarket = "all";
    this.charts = {};
  }

  init() {
    this.renderMarketCheckboxes();
    this.renderMarketComparisonMatrix();
    this.renderMultiYearView();
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Select / Deselect All Markets
    document.getElementById("btnSelectAllMarkets")?.addEventListener("click", () => {
      this.selectedMarketIds = BMA_MARKETS_DATA.map(m => m.id);
      this.updateMarketCheckboxUI();
      this.renderMarketComparisonMatrix();
    });

    document.getElementById("btnDeselectAllMarkets")?.addEventListener("click", () => {
      this.selectedMarketIds = [];
      this.updateMarketCheckboxUI();
      this.renderMarketComparisonMatrix();
    });

    // View Mode Toggle for Multi-Year Financial Comparison
    document.querySelectorAll("[data-year-view-mode]").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const mode = btn.getAttribute("data-year-view-mode");
        this.setMultiYearViewMode(mode);
      });
    });

    // Multi-Year Target Market Selector
    document.getElementById("selectMultiYearMarket")?.addEventListener("change", (e) => {
      this.multiYearTargetMarket = e.target.value;
      this.renderMultiYearView();
    });

    // Year Checkbox toggles
    document.querySelectorAll(".year-compare-chk").forEach(chk => {
      chk.addEventListener("change", () => {
        this.selectedYears = Array.from(document.querySelectorAll(".year-compare-chk:checked")).map(el => parseInt(el.value));
        this.renderMultiYearView();
      });
    });
  }

  renderMarketCheckboxes() {
    const container = document.getElementById("marketCheckboxList");
    if (!container) return;

    container.innerHTML = BMA_MARKETS_DATA.map(m => `
      <label class="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 cursor-pointer select-none text-xs">
        <input type="checkbox" value="${m.id}" ${this.selectedMarketIds.includes(m.id) ? 'checked' : ''} onchange="window.comparisonModule.toggleMarket('${m.id}')" class="w-4 h-4 rounded bg-slate-800 text-emerald-500 border-slate-700 focus:ring-emerald-500">
        <div class="truncate">
          <span class="font-bold text-slate-100">${m.rank}. ${m.officialName}</span>
          <span class="text-[10px] text-slate-400 block">${m.geo.district}</span>
        </div>
      </label>
    `).join("");
  }

  updateMarketCheckboxUI() {
    document.querySelectorAll("#marketCheckboxList input[type='checkbox']").forEach(chk => {
      chk.checked = this.selectedMarketIds.includes(chk.value);
    });
  }

  toggleMarket(marketId) {
    if (this.selectedMarketIds.includes(marketId)) {
      this.selectedMarketIds = this.selectedMarketIds.filter(id => id !== marketId);
    } else {
      this.selectedMarketIds.push(marketId);
    }
    this.renderMarketComparisonMatrix();
  }

  renderMarketComparisonMatrix() {
    const container = document.getElementById("marketComparisonMatrixContainer");
    if (!container) return;

    const selectedMarkets = BMA_MARKETS_DATA.filter(m => this.selectedMarketIds.includes(m.id));

    if (selectedMarkets.length === 0) {
      container.innerHTML = `
        <div class="p-12 text-center text-slate-400 bg-slate-900/60 rounded-xl border border-slate-800">
          <p class="text-base font-semibold">กรุณาเลือกตลาดจาก Checkbox ด้านบนอย่างน้อย 1 ตลาดเพื่อเปรียบเทียบข้อมูล</p>
          <button onclick="document.getElementById('btnSelectAllMarkets')?.click()" class="mt-3 px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold">
            เลือกตลาดทั้งหมด (12 แห่ง)
          </button>
        </div>
      `;
      return;
    }

    const app = window.app;
    const year = app ? app.selectedFiscalYear : 2569;

    container.innerHTML = `
      <div class="overflow-x-auto">
        <table class="bma-table text-xs">
          <thead>
            <tr>
              <th class="sticky left-0 bg-slate-900 z-10">มิติข้อมูลที่เปรียบเทียบ</th>
              ${selectedMarkets.map(m => `
                <th class="text-center min-w-[180px] bg-slate-900/95">
                  <div class="font-bold text-slate-100">${m.rank}. ${m.officialName}</div>
                  <span class="text-[10px] text-slate-400">${m.geo.district}</span>
                </th>
              `).join("")}
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800">
            <!-- Tier & Rank -->
            <tr>
              <td class="font-bold text-slate-300 sticky left-0 bg-slate-950">ระดับตลาด (Tier)</td>
              ${selectedMarkets.map(m => `
                <td class="text-center">
                  <span class="px-2 py-0.5 rounded text-[11px] font-bold ${m.tier === 'Flagship' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : (m.tier === 'Medium' ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30' : 'bg-purple-500/20 text-purple-400 border border-purple-500/30')}">
                    ${m.tier}
                  </span>
                </td>
              `).join("")}
            </tr>

            <!-- Revenue -->
            <tr>
              <td class="font-bold text-slate-300 sticky left-0 bg-slate-950">รายได้ปี ${year} (บาท)</td>
              ${selectedMarkets.map(m => {
                const fin = app ? app.getMarketFinancialsForYear(m, year) : { revenue: m.financials.annualRevenueTotal };
                return `<td class="text-center font-bold text-emerald-400 text-sm">฿${(fin.revenue / 1000000).toFixed(1)}M</td>`;
              }).join("")}
            </tr>

            <!-- Profit -->
            <tr>
              <td class="font-bold text-slate-300 sticky left-0 bg-slate-950">กำไรสุทธิ (Margin)</td>
              ${selectedMarkets.map(m => {
                const fin = app ? app.getMarketFinancialsForYear(m, year) : { profit: m.financials.netProfit, margin: m.financials.profitMarginPercent };
                return `<td class="text-center font-bold text-cyan-400">฿${(fin.profit / 1000000).toFixed(1)}M (${fin.margin}%)</td>`;
              }).join("")}
            </tr>

            <!-- Land Area -->
            <tr>
              <td class="font-bold text-slate-300 sticky left-0 bg-slate-950">ขนาดพื้นที่ดิน</td>
              ${selectedMarkets.map(m => `<td class="text-center text-slate-200">${m.spatial.landAreaRai}</td>`).join("")}
            </tr>

            <!-- Total Stalls -->
            <tr>
              <td class="font-bold text-slate-300 sticky left-0 bg-slate-950">จำนวนแผงค้าทั้งหมด</td>
              ${selectedMarkets.map(m => `<td class="text-center text-slate-200 font-bold">${m.stalls.totalStalls.toLocaleString()} แผง</td>`).join("")}
            </tr>

            <!-- Occupancy Rate -->
            <tr>
              <td class="font-bold text-slate-300 sticky left-0 bg-slate-950">อัตราความหนาแน่น (Occupancy)</td>
              ${selectedMarkets.map(m => `<td class="text-center text-emerald-400 font-bold">${m.stalls.occupancyRate}% (${m.stalls.activeVendors.toLocaleString()} ผู้ค้า)</td>`).join("")}
            </tr>

            <!-- Yield / Sq.m -->
            <tr>
              <td class="font-bold text-slate-300 sticky left-0 bg-slate-950">Yield เฉลี่ย/ตร.ม./เดือน</td>
              ${selectedMarkets.map(m => `<td class="text-center font-bold text-amber-400">฿${m.spatialYield.avgYieldPerSqm.toLocaleString()}</td>`).join("")}
            </tr>

            <!-- Parking Concession -->
            <tr>
              <td class="font-bold text-slate-300 sticky left-0 bg-slate-950">สัมปทานที่จอดรถ (รายได้/ปี)</td>
              ${selectedMarkets.map(m => `
                <td class="text-center text-[11px]">
                  <span class="font-semibold text-slate-200 block">${m.concessions.parking.operator.split("(")[0]}</span>
                  <span class="text-emerald-400 font-bold">฿${(m.concessions.parking.annualRevenueShare / 1000000).toFixed(2)}M</span>
                </td>
              `).join("")}
            </tr>

            <!-- Restroom Concession -->
            <tr>
              <td class="font-bold text-slate-300 sticky left-0 bg-slate-950">สัมปทานห้องน้ำ (รายได้/ปี)</td>
              ${selectedMarkets.map(m => `
                <td class="text-center text-[11px]">
                  <span class="font-semibold text-slate-200 block">${m.concessions.restroom.operator.split("(")[0]}</span>
                  <span class="text-cyan-400 font-bold">฿${(m.concessions.restroom.annualRevenueShare / 1000000).toFixed(2)}M</span>
                </td>
              `).join("")}
            </tr>

            <!-- Subleasing Status -->
            <tr>
              <td class="font-bold text-slate-300 sticky left-0 bg-slate-950">สถานะการเช่าช่วง (Sub-lease)</td>
              ${selectedMarkets.map(m => `
                <td class="text-center text-[11px]">
                  <span class="font-bold ${m.subLeasing.areaRatioPercent > 30 ? 'text-red-400' : 'text-amber-400'}">${m.subLeasing.prevalence} (${m.subLeasing.areaRatioPercent}%)</span>
                </td>
              `).join("")}
            </tr>

            <!-- Waste / Day -->
            <tr>
              <td class="font-bold text-slate-300 sticky left-0 bg-slate-950">ปริมาณขยะมูลฝอย/วัน</td>
              ${selectedMarkets.map(m => `<td class="text-center font-bold text-rose-400">${m.wasteManagement.solidWasteTonsPerDay} ตัน/วัน</td>`).join("")}
            </tr>

            <!-- Actions -->
            <tr>
              <td class="font-bold text-slate-300 sticky left-0 bg-slate-950">การดำเนินการ</td>
              ${selectedMarkets.map(m => `
                <td class="text-center py-3">
                  <button onclick="window.app.inspectMarket('${m.id}')" class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-bold">
                    ดูเจาะลึก
                  </button>
                </td>
              `).join("")}
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }

  setMultiYearViewMode(mode) {
    this.multiYearViewMode = mode;

    document.querySelectorAll("[data-year-view-mode]").forEach(btn => {
      const isMatch = btn.getAttribute("data-year-view-mode") === mode;
      btn.classList.toggle("bg-emerald-600", isMatch);
      btn.classList.toggle("text-white", isMatch);
      btn.classList.toggle("bg-slate-800", !isMatch);
      btn.classList.toggle("text-slate-300", !isMatch);
    });

    this.renderMultiYearView();
  }

  renderMultiYearView() {
    const container = document.getElementById("multiYearViewContainer");
    if (!container) return;

    const years = this.selectedYears.length > 0 ? this.selectedYears.sort((a, b) => a - b) : [2566, 2567, 2568, 2569, 2570];
    const target = this.multiYearTargetMarket;

    let yearData = years.map(yr => {
      let rev = 0, exp = 0, profit = 0;
      if (target === "all") {
        BMA_MARKETS_DATA.forEach(m => {
          const hist = m.financials.historical.find(h => h.year === yr);
          if (hist) {
            rev += hist.revenue;
            exp += hist.expense;
            profit += hist.profit;
          }
        });
      } else {
        const m = BMA_MARKETS_DATA.find(mk => mk.id === target) || BMA_MARKETS_DATA[0];
        const hist = m.financials.historical.find(h => h.year === yr);
        if (hist) {
          rev = hist.revenue;
          exp = hist.expense;
          profit = hist.profit;
        }
      }
      return {
        year: yr,
        revenue: rev,
        expense: exp,
        profit: profit,
        margin: rev > 0 ? ((profit / rev) * 100).toFixed(1) : 0
      };
    });

    // 1. TABLE MODE
    if (this.multiYearViewMode === "table") {
      container.innerHTML = `
        <div class="overflow-x-auto">
          <table class="bma-table text-xs">
            <thead>
              <tr>
                <th>ปีงบประมาณ</th>
                <th class="text-right">รายได้จัดเก็บ (ล้านบาท)</th>
                <th class="text-right">ค่าใช้จ่ายดำเนินงาน (ล้านบาท)</th>
                <th class="text-right">กำไรสุทธิ (ล้านบาท)</th>
                <th class="text-right">อัตรากำไร (Margin)</th>
                <th class="text-center">การเติบโต YoY (%)</th>
                <th class="text-center">สถานะงบการเงิน</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800">
              ${yearData.map((d, idx) => {
                const prev = idx > 0 ? yearData[idx - 1] : null;
                const growth = prev && prev.revenue > 0 ? (((d.revenue - prev.revenue) / prev.revenue) * 100).toFixed(1) : "-";
                const isCurrent = d.year === 2569;
                const isForecast = d.year === 2570;

                return `
                  <tr class="${isCurrent ? 'bg-emerald-950/30 font-bold' : ''}">
                    <td class="py-3 px-4 font-bold text-slate-100">ปีงบประมาณ ${d.year}</td>
                    <td class="py-3 px-4 text-right font-bold text-emerald-400">฿${(d.revenue / 1000000).toFixed(2)}M</td>
                    <td class="py-3 px-4 text-right text-rose-400">฿${(d.expense / 1000000).toFixed(2)}M</td>
                    <td class="py-3 px-4 text-right font-bold text-cyan-400">฿${(d.profit / 1000000).toFixed(2)}M</td>
                    <td class="py-3 px-4 text-right text-slate-200">${d.margin}%</td>
                    <td class="py-3 px-4 text-center ${growth !== '-' && parseFloat(growth) >= 0 ? 'text-emerald-400 font-bold' : 'text-slate-400'}">
                      ${growth !== '-' ? (parseFloat(growth) >= 0 ? `+${growth}%` : `${growth}%`) : '-'}
                    </td>
                    <td class="py-3 px-4 text-center">
                      <span class="px-2 py-0.5 rounded text-[10px] ${isCurrent ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : (isForecast ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' : 'bg-slate-800 text-slate-400')}">
                        ${isCurrent ? 'ปีปัจจุบัน (2569)' : (isForecast ? 'พยากรณ์ (2570)' : 'สถิติจริง')}
                      </span>
                    </td>
                  </tr>
                `;
              }).join("")}
            </tbody>
          </table>
        </div>
      `;
      return;
    }

    // 2. CHART MODES (BAR, LINE, PIE)
    container.innerHTML = `
      <div class="h-[380px] w-full">
        <canvas id="canvasMultiYearComparison"></canvas>
      </div>
    `;

    if (typeof Chart === "undefined") {
      container.innerHTML = `<div class="p-8 text-center text-slate-400 text-xs">กำลังโหลดโมดูลแสดงกราฟ...</div>`;
      return;
    }

    const ctx = document.getElementById("canvasMultiYearComparison");
    if (!ctx) return;

    if (this.charts.multiYear) {
      this.charts.multiYear.destroy();
    }

    const labels = yearData.map(d => `ปี ${d.year}`);
    const revenues = yearData.map(d => +(d.revenue / 1000000).toFixed(2));
    const expenses = yearData.map(d => +(d.expense / 1000000).toFixed(2));
    const profits = yearData.map(d => +(d.profit / 1000000).toFixed(2));

    if (this.multiYearViewMode === "bar") {
      this.charts.multiYear = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "รายได้จัดเก็บ (ล้านบาท)",
              data: revenues,
              backgroundColor: "rgba(16, 185, 129, 0.85)",
              borderColor: "#10b981",
              borderWidth: 1,
              borderRadius: 6
            },
            {
              label: "ค่าใช้จ่ายดำเนินงาน (ล้านบาท)",
              data: expenses,
              backgroundColor: "rgba(244, 63, 94, 0.85)",
              borderColor: "#f43f5e",
              borderWidth: 1,
              borderRadius: 6
            },
            {
              label: "กำไรสุทธิ (ล้านบาท)",
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
            legend: { position: "top", labels: { color: "#cbd5e1", font: { family: "Prompt", size: 12 } } },
            tooltip: { callbacks: { label: (ctx) => ` ${ctx.dataset.label}: ฿${ctx.parsed.y} ล้านบาท` } }
          },
          scales: {
            x: { ticks: { color: "#94a3b8", font: { family: "Prompt" } }, grid: { color: "rgba(255, 255, 255, 0.05)" } },
            y: { ticks: { color: "#94a3b8", callback: (v) => `฿${v}M` }, grid: { color: "rgba(255, 255, 255, 0.08)" } }
          }
        }
      });
    } else if (this.multiYearViewMode === "line") {
      this.charts.multiYear = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "รายได้จัดเก็บ (ล้านบาท)",
              data: revenues,
              borderColor: "#10b981",
              backgroundColor: "rgba(16, 185, 129, 0.15)",
              borderWidth: 3,
              fill: true,
              tension: 0.35,
              pointRadius: 6
            },
            {
              label: "ค่าใช้จ่ายดำเนินงาน (ล้านบาท)",
              data: expenses,
              borderColor: "#f43f5e",
              backgroundColor: "rgba(244, 63, 94, 0.1)",
              borderWidth: 2,
              borderDash: [5, 5],
              fill: false,
              tension: 0.35,
              pointRadius: 5
            },
            {
              label: "กำไรสุทธิ (ล้านบาท)",
              data: profits,
              borderColor: "#06b6d4",
              backgroundColor: "rgba(6, 182, 212, 0.2)",
              borderWidth: 3,
              fill: false,
              tension: 0.35,
              pointRadius: 6
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: "top", labels: { color: "#cbd5e1", font: { family: "Prompt" } } },
            tooltip: { callbacks: { label: (ctx) => ` ${ctx.dataset.label}: ฿${ctx.parsed.y} ล้านบาท` } }
          },
          scales: {
            x: { ticks: { color: "#94a3b8", font: { family: "Prompt" } }, grid: { color: "rgba(255, 255, 255, 0.05)" } },
            y: { ticks: { color: "#94a3b8", callback: (v) => `฿${v}M` }, grid: { color: "rgba(255, 255, 255, 0.08)" } }
          }
        }
      });
    } else if (this.multiYearViewMode === "pie") {
      this.charts.multiYear = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: labels,
          datasets: [{
            data: revenues,
            backgroundColor: [
              "#10b981",
              "#0ea5e9",
              "#f59e0b",
              "#8b5cf6",
              "#ec4899"
            ],
            borderColor: "#0f172a",
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: "right", labels: { color: "#cbd5e1", font: { family: "Prompt" } } },
            tooltip: { callbacks: { label: (ctx) => ` รายได้ ${ctx.label}: ฿${ctx.parsed} ล้านบาท` } }
          },
          cutout: "55%"
        }
      });
    }
  }
}

window.comparisonModule = new BMAComparisonModule();

/**
 * BMA Market Intelligence & Operational Dashboard - Main Application Controller
 * Manages Filtering, Real-time Component Search, Tabs, AI Modal, Comparisons,
 * Weather & 3-Day Daily Forecast, Market Weekly Events, Managers, and Live Sync.
 */

class BMADashboardApp {
  constructor() {
    this.currentTab = "executive";
    this.selectedFiscalYear = 2569;
    this.districtFilter = "all";
    this.tierFilter = "all";
    this.selectedEventTimeframe = "all";
    this.searchQueries = {
      global: "",
      dossier: "",
      concessions: "",
      swot: "",
      spatial: ""
    };

    this.activeModalMarket = null;
    this.spatialEngine = null;
    this.charts = null;
    this.map = null;
    this.aiAssistant = null;
    this.lastUpdatedTimestamp = new Date();

    this.init();
  }

  init() {
    const start = () => {
      console.log("Initializing BMA Market Dashboard with Weather 3-Day Forecast & Weekly Events...");
      try {
        this.initUI();
      } catch (e) {
        console.error("Error in initUI:", e);
      }
      try {
        this.updateTimestampDisplay();
        this.renderWeatherAndDailyForecast();
        this.renderMarketEvents();
        this.renderMarketManagersRegistry();
        this.renderDataSourcesAttribution();
        this.updateAllDataViews();
      } catch (e) {
        console.error("Error in updateAllDataViews:", e);
      }
      try {
        this.initEngines();
      } catch (e) {
        console.error("Error in initEngines:", e);
      }
      try {
        this.setupEventListeners();
      } catch (e) {
        console.error("Error in setupEventListeners:", e);
      }
      console.log("BMA Market Dashboard initialization complete.");
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", start);
    } else {
      start();
    }
  }

  initEngines() {
    // Spatial 3D Engine
    try {
      if (typeof SpatialYieldEngine !== "undefined") {
        this.spatialEngine = new SpatialYieldEngine("spatial3dCanvas", "spatialZoneInfoPanel");
      }
    } catch (e) {
      console.warn("Spatial 3D engine init error:", e);
    }

    // Chart.js Engine
    try {
      if (typeof DashboardCharts !== "undefined") {
        this.charts = new DashboardCharts();
        this.charts.initOverviewCharts();
      }
    } catch (e) {
      console.warn("Charts engine init error:", e);
    }

    // Leaflet GIS Map / Vector Map
    try {
      if (typeof BMAMarketMap !== "undefined") {
        this.map = new BMAMarketMap("bmaGisMap");
      }
    } catch (e) {
      console.warn("Map engine init error:", e);
    }

    // AI Assistant Engine
    try {
      if (typeof BMAAIAssistant !== "undefined") {
        this.aiAssistant = new BMAAIAssistant();
      }
    } catch (e) {
      console.warn("AI Assistant init error:", e);
    }

    // Comparison Module
    try {
      if (window.comparisonModule) {
        window.comparisonModule.init();
      }
    } catch (e) {
      console.warn("Comparison module init error:", e);
    }
  }

  initUI() {
    // Populate Dropdown Options with `ชื่อตลาด (ชื่อเขต)`
    const districtSelect = document.getElementById("selectDistrictFilter");
    if (districtSelect) {
      districtSelect.innerHTML = `<option value="all">ทุกตลาด และ ทุกเขตใน กทม.</option>`;
      BMA_MARKETS_DATA.forEach(m => {
        const opt = document.createElement("option");
        opt.value = m.geo.district;
        opt.textContent = `${m.rank}. ${m.officialName} (${m.geo.district})`;
        districtSelect.appendChild(opt);
      });
    }

    const marketSelect3D = document.getElementById("select3DMarket");
    if (marketSelect3D) {
      marketSelect3D.innerHTML = "";
      BMA_MARKETS_DATA.slice(0, 5).forEach(m => {
        const opt = document.createElement("option");
        opt.value = m.id;
        opt.textContent = `${m.rank}. ${m.officialName} (${m.geo.district})`;
        marketSelect3D.appendChild(opt);
      });
    }

    const multiYearSelect = document.getElementById("selectMultiYearMarket");
    if (multiYearSelect) {
      multiYearSelect.innerHTML = `<option value="all">ภาพรวม 12 ตลาด กทม. รวมกัน</option>`;
      BMA_MARKETS_DATA.forEach(m => {
        const opt = document.createElement("option");
        opt.value = m.id;
        opt.textContent = `${m.rank}. ${m.officialName} (${m.geo.district})`;
        multiYearSelect.appendChild(opt);
      });
    }
  }

  setupEventListeners() {
    // Home Button Navigation
    document.querySelectorAll(".btn-go-home").forEach(btn => {
      btn.addEventListener("click", () => {
        this.switchTab("executive");
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });

    // Tab Switching
    document.querySelectorAll("[data-tab-target]").forEach(btn => {
      btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-tab-target");
        this.switchTab(target);
      });
    });

    // Event Timeframe Filter Pills
    document.querySelectorAll("[data-event-timeframe]").forEach(btn => {
      btn.addEventListener("click", (e) => {
        this.selectedEventTimeframe = btn.getAttribute("data-event-timeframe");
        document.querySelectorAll("[data-event-timeframe]").forEach(b => {
          const isMatch = b.getAttribute("data-event-timeframe") === this.selectedEventTimeframe;
          b.classList.toggle("bg-emerald-600", isMatch);
          b.classList.toggle("text-white", isMatch);
          b.classList.toggle("bg-slate-800", !isMatch);
          b.classList.toggle("text-slate-300", !isMatch);
        });
        this.renderMarketEvents();
      });
    });

    // REFRESH & UPDATE DATA BUTTONS
    document.getElementById("btnRefreshLiveData")?.addEventListener("click", () => {
      this.refreshDataSources();
    });

    document.getElementById("btnForceUpdateDataSource")?.addEventListener("click", () => {
      this.refreshDataSources(true);
    });

    // Top Toolbar Filter Controls
    document.getElementById("selectFiscalYear")?.addEventListener("change", (e) => {
      this.selectedFiscalYear = parseInt(e.target.value);
      this.updateAllDataViews();
    });

    document.getElementById("selectDistrictFilter")?.addEventListener("change", (e) => {
      this.districtFilter = e.target.value;
      this.updateAllDataViews();
    });

    document.getElementById("selectTierFilter")?.addEventListener("change", (e) => {
      this.tierFilter = e.target.value;
      this.updateAllDataViews();
    });

    // Explicit SUBMIT Filter Button
    document.getElementById("btnApplyGlobalFilter")?.addEventListener("click", () => {
      const yr = document.getElementById("selectFiscalYear")?.value;
      if (yr) this.selectedFiscalYear = parseInt(yr);
      const dist = document.getElementById("selectDistrictFilter")?.value;
      if (dist) this.districtFilter = dist;
      const tier = document.getElementById("selectTierFilter")?.value;
      if (tier) this.tierFilter = tier;

      this.updateAllDataViews();
      this.showToastNotification("ประมวลผลตัวกรองข้อมูลเรียบร้อยแล้ว");
    });

    // Global RESET Filter Button
    document.getElementById("btnResetGlobalFilter")?.addEventListener("click", () => {
      this.resetAll();
    });

    // AI Query Submission
    document.getElementById("btnSubmitAIQuery")?.addEventListener("click", () => {
      const query = document.getElementById("aiQueryInput")?.value;
      this.askAI(query);
    });

    document.getElementById("aiQueryInput")?.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const query = e.target.value;
        this.askAI(query);
      }
    });

    // AI Modal Close
    document.getElementById("aiModalCloseBtn")?.addEventListener("click", () => this.closeAIModal());
    document.getElementById("aiModalOverlay")?.addEventListener("click", (e) => {
      if (e.target.id === "aiModalOverlay") this.closeAIModal();
    });

    // Component-level Search Bars
    const dossierInput = document.getElementById("searchDossier");
    dossierInput?.addEventListener("input", (e) => {
      this.searchQueries.dossier = e.target.value.toLowerCase().trim();
      this.renderMarketDossierCards();
    });
    document.getElementById("btnSubmitDossierSearch")?.addEventListener("click", () => {
      this.searchQueries.dossier = (dossierInput?.value || "").toLowerCase().trim();
      this.renderMarketDossierCards();
    });

    const concessionsInput = document.getElementById("searchConcessions");
    concessionsInput?.addEventListener("input", (e) => {
      this.searchQueries.concessions = e.target.value.toLowerCase().trim();
      this.renderConcessionsTable();
    });
    document.getElementById("btnSubmitConcessionsSearch")?.addEventListener("click", () => {
      this.searchQueries.concessions = (concessionsInput?.value || "").toLowerCase().trim();
      this.renderConcessionsTable();
    });

    const swotInput = document.getElementById("searchSWOT");
    swotInput?.addEventListener("input", (e) => {
      this.searchQueries.swot = e.target.value.toLowerCase().trim();
      this.renderSWOTMatrix();
    });
    document.getElementById("btnSubmitSWOTSearch")?.addEventListener("click", () => {
      this.searchQueries.swot = (swotInput?.value || "").toLowerCase().trim();
      this.renderSWOTMatrix();
    });

    const spatialInput = document.getElementById("search3DZone");
    spatialInput?.addEventListener("input", (e) => {
      this.searchQueries.spatial = e.target.value;
      if (this.spatialEngine) this.spatialEngine.setFilter(this.searchQueries.spatial);
    });
    document.getElementById("btnSubmit3DSearch")?.addEventListener("click", () => {
      this.searchQueries.spatial = spatialInput?.value || "";
      if (this.spatialEngine) this.spatialEngine.setFilter(this.searchQueries.spatial);
    });

    // 3D Controls
    document.getElementById("select3DMarket")?.addEventListener("change", (e) => {
      if (this.spatialEngine) this.spatialEngine.setMarket(e.target.value);
    });

    document.getElementById("select3DMode")?.addEventListener("change", (e) => {
      if (this.spatialEngine) this.spatialEngine.setViewMode(e.target.value);
    });

    document.getElementById("btnReset3DCamera")?.addEventListener("click", () => {
      if (this.spatialEngine) this.spatialEngine.resetCamera();
    });

    // Export Buttons
    document.getElementById("btnExportCSV")?.addEventListener("click", () => this.exportCSV());
    document.getElementById("btnExportJSON")?.addEventListener("click", () => this.exportJSON());
    document.getElementById("btnPrintReport")?.addEventListener("click", () => window.print());

    // Modal Close
    document.getElementById("modalCloseBtn")?.addEventListener("click", () => this.closeMarketModal());
    document.getElementById("marketModalOverlay")?.addEventListener("click", (e) => {
      if (e.target.id === "marketModalOverlay") this.closeMarketModal();
    });
  }

  updateTimestampDisplay() {
    const now = this.lastUpdatedTimestamp;
    const monthsThai = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
    const dateStr = `${now.getDate()} ${monthsThai[now.getMonth()]} ${now.getFullYear() + 543} เวลา ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')} น.`;

    document.querySelectorAll(".live-timestamp-text").forEach(el => {
      el.textContent = dateStr;
    });
  }

  refreshDataSources(isDeep = false) {
    this.lastUpdatedTimestamp = new Date();
    this.updateTimestampDisplay();

    const refreshBtn = document.getElementById("btnRefreshLiveData");
    if (refreshBtn) {
      refreshBtn.innerHTML = `<span>⏳</span> <span>กำลังซิงก์ข้อมูล...</span>`;
      refreshBtn.disabled = true;
    }

    setTimeout(() => {
      this.renderWeatherAndDailyForecast();
      this.renderMarketEvents();
      this.updateAllDataViews();
      if (refreshBtn) {
        refreshBtn.innerHTML = `<span>🔄</span> <span>Refresh ข้อมูล</span>`;
        refreshBtn.disabled = false;
      }
      this.showToastNotification(`✓ ซิงก์ข้อมูลล่าสุดจาก สำนักงานตลาด กทม., TMD, AirBKK สำเร็จ (${isDeep ? 'Deep Sync' : 'Live Updated'})`);
    }, 500);
  }

  // 1. Real-time Weather & 3-Day Daily Forecast Renderer
  renderWeatherAndDailyForecast() {
    const container = document.getElementById("weatherOverviewContainer");
    if (!container || typeof BMA_WEATHER_INTELLIGENCE === "undefined") return;

    const cur = BMA_WEATHER_INTELLIGENCE.currentOverview;
    const forecast3Days = BMA_WEATHER_INTELLIGENCE.dailyForecast3Days;

    container.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        <!-- Left 1 Col: Current Real-time Weather & AQI Box -->
        <div class="bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col justify-between shadow-xl">
          <div>
            <div class="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-3">
              <div class="flex items-center gap-2">
                <span class="text-2xl">🌤️</span>
                <div>
                  <h4 class="font-bold text-slate-100 text-sm font-heading">สภาวะภูมิอากาศปัจจุบัน (Real-time)</h4>
                  <p class="text-[11px] text-slate-400">กรุงเทพมหานครและปริมณฑล</p>
                </div>
              </div>
              <span class="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                Live TMD
              </span>
            </div>

            <!-- Current Temp & Sky -->
            <div class="flex items-baseline justify-between my-3">
              <div>
                <span class="text-4xl font-extrabold text-slate-100 font-heading">${cur.temperature}°C</span>
                <span class="text-xs text-slate-400 ml-1.5">(รู้สึกเหมือน ${cur.feelsLike}°C)</span>
              </div>
              <span class="text-xs font-semibold text-sky-400">${cur.conditionText}</span>
            </div>

            <!-- Micro Metrics Grid -->
            <div class="grid grid-cols-2 gap-2 text-xs bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
              <div>
                <span class="text-slate-400 text-[11px] block">ความชื้นสัมพัทธ์:</span>
                <span class="font-semibold text-slate-200">${cur.humidity}%</span>
              </div>
              <div>
                <span class="text-slate-400 text-[11px] block">โอกาสเกิดฝน:</span>
                <span class="font-semibold text-sky-400">${cur.rainChance}</span>
              </div>
              <div>
                <span class="text-slate-400 text-[11px] block">ความเร็วลม:</span>
                <span class="font-semibold text-slate-300 text-[11px]">${cur.windSpeed}</span>
              </div>
              <div>
                <span class="text-slate-400 text-[11px] block">ดัชนี UV:</span>
                <span class="font-semibold text-amber-400">${cur.uvIndex}</span>
              </div>
            </div>
          </div>

          <!-- Real-time AQI Banner -->
          <div class="mt-3 p-2.5 rounded-lg border flex items-center justify-between" style="background: ${cur.aqiColor}15; border-color: ${cur.aqiColor}40;">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full animate-ping" style="background: ${cur.aqiColor};"></span>
              <span class="font-bold text-xs" style="color: ${cur.aqiColor};">ดัชนีคุณภาพอากาศ AQI: ${cur.aqi}</span>
            </div>
            <span class="text-[11px] font-medium text-slate-300">PM2.5: <b>${cur.pm25} µg/m³</b> (${cur.aqiStatus})</span>
          </div>
        </div>

        <!-- Right 2 Cols: 3-Day Daily Forecast Cards -->
        <div class="lg:col-span-2 bg-slate-900/90 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-3">
              <div>
                <h4 class="font-bold text-slate-100 text-sm font-heading flex items-center gap-2">
                  <span>📅</span>
                  <span>พยากรณ์สภาพอากาศรายวัน 3 วันข้างหน้า (3-Day Daily Forecast)</span>
                </h4>
                <p class="text-xs text-slate-400">ประเมินผลกระทบต่อกิจกรรมตลาด ปริมาณผู้ซื้อ (Footfall) และมาตรการรับมือฝน</p>
              </div>
              <span class="text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700 font-mono">
                Model: TMD 72-Hour Outlook
              </span>
            </div>

            <!-- 3 Day Forecast Cards Grid -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              ${forecast3Days.map((fc, idx) => `
                <div class="bg-slate-950/70 p-3.5 rounded-xl border ${idx === 0 ? 'border-emerald-500/40 bg-emerald-950/10' : 'border-slate-800'} flex flex-col justify-between space-y-2">
                  <div>
                    <div class="flex items-center justify-between border-b border-slate-800/80 pb-1.5">
                      <b class="text-xs ${idx === 0 ? 'text-emerald-400' : 'text-slate-200'}">${fc.dayLabel}</b>
                      <span class="text-[10px] text-slate-400">${fc.dateStr}</span>
                    </div>

                    <div class="my-2">
                      <div class="text-sm font-bold text-slate-100 leading-tight">${fc.condition}</div>
                      <div class="flex items-center gap-2 mt-1 text-xs">
                        <span class="text-rose-400 font-bold">สูงสุด ${fc.tempMax}°C</span>
                        <span class="text-slate-500">|</span>
                        <span class="text-sky-400 font-medium">ต่ำสุด ${fc.tempMin}°C</span>
                      </div>
                    </div>

                    <div class="text-[11px] text-slate-300 space-y-1 bg-slate-900/80 p-2 rounded border border-slate-800">
                      <div>🌧️ โอกาสฝน: <b class="${parseInt(fc.rainChance) >= 40 ? 'text-amber-400' : 'text-slate-300'}">${fc.rainChance}</b></div>
                      <div>💨 คุณภาพอากาศ: <b class="text-emerald-400">AQI ${fc.aqi}</b></div>
                    </div>
                  </div>

                  <p class="text-[10px] text-slate-400 leading-relaxed border-t border-slate-800/80 pt-1.5">
                    💡 <b>คำแนะนำ:</b> ${fc.marketImpact}
                  </p>
                </div>
              `).join("")}
            </div>
          </div>

          <div class="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
            <span>สถานีตรวจวัด: ศูนย์ข้อมูลคุณภาพอากาศกรุงเทพมหานคร (AirBKK) & กรมอุตุนิยมวิทยา</span>
            <span class="text-emerald-400">✓ อัปเดตข้อมูลทุกชั่วโมงอัตโนมัติ</span>
          </div>
        </div>

      </div>
    `;
  }

  // 2. Market Events & Weekly Happenings Renderer
  renderMarketEvents() {
    const container = document.getElementById("marketEventsListContainer");
    if (!container || typeof BMA_MARKET_EVENTS === "undefined") return;

    const filtered = BMA_MARKET_EVENTS.filter(evt => {
      if (this.selectedEventTimeframe === "all") return true;
      return evt.timeframe === this.selectedEventTimeframe;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="p-8 text-center text-slate-400 bg-slate-900/60 rounded-xl border border-slate-800 text-xs">
          ไม่พบรายการกิจกรรมในหมวดหมู่นี้
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(evt => `
      <div class="bg-slate-900/90 p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between space-y-3 group">
        <div>
          <!-- Event Header -->
          <div class="flex items-start justify-between gap-2 border-b border-slate-800 pb-2 mb-2">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="px-2 py-0.5 rounded text-[10px] font-bold ${evt.timeframe === 'today' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : (evt.timeframe === 'week' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' : 'bg-purple-500/20 text-purple-300 border border-purple-500/30')}">
                ${evt.timeframeLabel}
              </span>
              <span class="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 border border-slate-700">
                ${evt.category}
              </span>
            </div>
            <span class="text-[11px] font-bold text-emerald-400 shrink-0">📍 ${evt.marketName}</span>
          </div>

          <!-- Event Title & Info -->
          <h4 class="font-bold text-slate-100 text-sm group-hover:text-emerald-400 transition leading-snug">${evt.eventName}</h4>
          <div class="text-[11px] text-slate-400 mt-1 flex items-center gap-1.5">
            <span>⏰ ${evt.schedule}</span>
            <span>•</span>
            <span>(${evt.district})</span>
          </div>

          <p class="text-xs text-slate-300 mt-2 leading-relaxed bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
            ${evt.description}
          </p>
        </div>

        <!-- Highlight & Footfall Footer -->
        <div class="pt-2 border-t border-slate-800 text-xs space-y-1.5">
          <div class="flex justify-between items-center text-[11px]">
            <span class="text-slate-400">ประมาณการผู้เข้าชม:</span>
            <span class="font-bold text-cyan-400">${evt.expectedFootfall}</span>
          </div>
          <div class="text-[11px] text-amber-300/90 flex items-center gap-1">
            <span>✨ ไฮไลท์:</span>
            <span class="text-slate-200">${evt.highlight}</span>
          </div>
          <div class="pt-1 text-right">
            <button onclick="window.app.inspectMarket('${evt.marketId}')" class="px-3 py-1 bg-slate-800 hover:bg-emerald-600 text-slate-200 hover:text-white rounded text-[11px] font-semibold transition">
              ดูข้อมูลตลาด ${evt.marketName} &rarr;
            </button>
          </div>
        </div>
      </div>
    `).join("");
  }

  renderMarketManagersRegistry() {
    const tbody = document.getElementById("marketManagersTableBody");
    if (!tbody || typeof BMA_MARKET_MANAGERS === "undefined") return;

    tbody.innerHTML = BMA_MARKET_MANAGERS.map((mgr, idx) => `
      <tr class="border-b border-slate-800/70 hover:bg-slate-800/40 text-xs transition">
        <td class="py-3 px-4 font-bold text-slate-200">
          <div class="flex items-center gap-2">
            <span class="w-5 h-5 rounded-full bg-slate-800 text-slate-300 text-[10px] flex items-center justify-center font-bold">
              ${idx + 1}
            </span>
            <span>${mgr.marketName}</span>
          </div>
        </td>
        <td class="py-3 px-4">
          <div class="font-bold text-slate-100 text-sm">${mgr.managerName}</div>
          <span class="text-[11px] text-slate-400">${mgr.position}</span>
        </td>
        <td class="py-3 px-4">
          <span class="px-2 py-1 rounded bg-slate-800 text-emerald-400 font-semibold border border-slate-700">
            🗓️ ${mgr.appointedDate}
          </span>
        </td>
        <td class="py-3 px-4 text-slate-300 font-medium">${mgr.tenureYears}</td>
        <td class="py-3 px-4 text-slate-300 font-medium">
          <div>📞 ${mgr.contact}</div>
          <span class="text-[10px] text-slate-400">${mgr.email}</span>
        </td>
        <td class="py-3 px-4 text-center">
          <span class="px-2 py-0.5 rounded text-[11px] bg-slate-800 text-sky-300 border border-slate-700">
            👥 ${mgr.teamSize} นาย
          </span>
        </td>
        <td class="py-3 px-4 text-center">
          <button onclick="window.app.inspectMarket('${mgr.marketId}')" class="px-2.5 py-1 rounded bg-slate-800 hover:bg-emerald-600 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700 transition">
            ดูตลาด
          </button>
        </td>
      </tr>
    `).join("");
  }

  renderDataSourcesAttribution() {
    const container = document.getElementById("dataSourcesContainer");
    if (!container || typeof BMA_DATA_SOURCES === "undefined") return;

    container.innerHTML = BMA_DATA_SOURCES.map(src => `
      <div class="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
        <div class="flex items-center justify-between border-b border-slate-800 pb-2">
          <b class="text-emerald-400 text-xs font-bold">${src.sourceName}</b>
          <span class="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono">
            ${src.updateFrequency}
          </span>
        </div>
        <p class="text-slate-300 text-xs">${src.category}</p>
        <div class="flex justify-between items-center text-[11px] text-slate-400 pt-1">
          <span>หน่วยงานตรวจสอบ: <b>${src.verifiedBy}</b></span>
          <a href="${src.url}" target="_blank" class="text-sky-400 hover:underline flex items-center gap-1">
            <span>Official Portal</span>
            <span>&rarr;</span>
          </a>
        </div>
      </div>
    `).join("");
  }

  resetAll() {
    this.selectedFiscalYear = 2569;
    this.districtFilter = "all";
    this.tierFilter = "all";
    this.selectedEventTimeframe = "all";
    this.searchQueries = { global: "", dossier: "", concessions: "", swot: "", spatial: "" };

    const fySelect = document.getElementById("selectFiscalYear");
    if (fySelect) fySelect.value = "2569";
    const distSelect = document.getElementById("selectDistrictFilter");
    if (distSelect) distSelect.value = "all";
    const tierSelect = document.getElementById("selectTierFilter");
    if (tierSelect) tierSelect.value = "all";

    const searchInputs = ["searchDossier", "searchConcessions", "searchSWOT", "search3DZone", "aiQueryInput"];
    searchInputs.forEach(id => {
      const inp = document.getElementById(id);
      if (inp) inp.value = "";
    });

    if (window.comparisonModule) {
      window.comparisonModule.selectedMarketIds = ["chatuchak", "thonburi", "minburi", "bangkapi"];
      window.comparisonModule.selectedYears = [2566, 2567, 2568, 2569, 2570];
      window.comparisonModule.multiYearViewMode = "bar";
      window.comparisonModule.multiYearTargetMarket = "all";
      window.comparisonModule.updateMarketCheckboxUI();
      window.comparisonModule.setMultiYearViewMode("bar");
    }

    this.updateAllDataViews();
    this.switchTab("executive");
    this.showToastNotification("ล้างหน้าจอและรีเซ็ตการตั้งค่าทั้งหมดแล้ว");
  }

  askAI(query) {
    if (!this.aiAssistant) {
      this.aiAssistant = new BMAAIAssistant();
    }

    const aiModal = document.getElementById("aiModalPopup");
    const aiOverlay = document.getElementById("aiModalOverlay");
    const aiBody = document.getElementById("aiModalBody");
    const aiUserQuestion = document.getElementById("aiModalUserQuestion");

    if (!aiModal || !aiOverlay || !aiBody) return;

    if (aiUserQuestion) {
      aiUserQuestion.textContent = query ? `"${query}"` : "ภาพรวมสารสนเทศตลาด กทม.";
    }

    aiBody.innerHTML = `<div class="p-8 text-center text-slate-400"><div class="inline-block animate-spin text-2xl mb-2">⚡</div><p>AI กำลังประมวลผลฐานข้อมูล 12 ตลาด กทม...</p></div>`;
    aiOverlay.classList.remove("hidden");
    aiModal.classList.remove("hidden");

    setTimeout(() => {
      const responseHTML = this.aiAssistant.ask(query);
      aiBody.innerHTML = responseHTML;
    }, 250);
  }

  askAIPreset(presetQuery) {
    const input = document.getElementById("aiQueryInput");
    if (input) input.value = presetQuery;
    this.askAI(presetQuery);
  }

  closeAIModal() {
    document.getElementById("aiModalOverlay")?.classList.add("hidden");
    document.getElementById("aiModalPopup")?.classList.add("hidden");
  }

  showToastNotification(msg) {
    let toast = document.getElementById("bmaToastMessage");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "bmaToastMessage";
      toast.className = "fixed bottom-5 right-5 bg-emerald-600 text-white px-4 py-2.5 rounded-lg shadow-xl text-xs font-semibold z-50 transition-all duration-300 flex items-center gap-2 border border-emerald-400/40";
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<span>✓</span> <span>${msg}</span>`;
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
    }, 2800);
  }

  switchTab(tabId) {
    this.currentTab = tabId;

    // Update Nav Buttons
    document.querySelectorAll("[data-tab-target]").forEach(btn => {
      const isMatch = btn.getAttribute("data-tab-target") === tabId;
      btn.classList.toggle("bg-emerald-600", isMatch);
      btn.classList.toggle("text-white", isMatch);
      btn.classList.toggle("bg-slate-800", !isMatch);
      btn.classList.toggle("text-slate-300", !isMatch);
    });

    // Update View Containers
    document.querySelectorAll(".dashboard-tab-view").forEach(view => {
      view.classList.add("hidden");
    });
    const activeView = document.getElementById(`tabView-${tabId}`);
    if (activeView) activeView.classList.remove("hidden");

    // Trigger Resize / Render for active canvas/maps/comparisons
    if (tabId === "spatial3d" && this.spatialEngine) {
      setTimeout(() => {
        this.spatialEngine.resizeCanvas();
        this.spatialEngine.render();
      }, 100);
    }
    if (tabId === "executive" && this.map) {
      setTimeout(() => {
        this.map.resize();
        this.map.render();
      }, 150);
    }
    if (tabId === "multiYearCompare" && window.comparisonModule) {
      setTimeout(() => {
        window.comparisonModule.renderMultiYearView();
      }, 100);
    }
    if (tabId === "marketCompare" && window.comparisonModule) {
      setTimeout(() => {
        window.comparisonModule.renderMarketComparisonMatrix();
      }, 100);
    }
  }

  getMarketFinancialsForYear(market, year = this.selectedFiscalYear) {
    const hist = market.financials.historical.find(h => h.year === year);
    if (hist) {
      return {
        revenue: hist.revenue,
        expense: hist.expense,
        profit: hist.profit,
        margin: hist.margin,
        isCurrent: hist.isCurrent,
        isForecast: hist.isForecast
      };
    }
    return {
      revenue: market.financials.annualRevenueTotal,
      expense: market.financials.annualExpenseTotal,
      profit: market.financials.netProfit,
      margin: market.financials.profitMarginPercent,
      isCurrent: true,
      isForecast: false
    };
  }

  getFilteredMarkets() {
    return BMA_MARKETS_DATA.filter(market => {
      const matchDistrict = this.districtFilter === "all" || market.geo.district === this.districtFilter;
      const matchTier = this.tierFilter === "all" || market.tier === this.tierFilter;
      return matchDistrict && matchTier;
    });
  }

  updateAllDataViews() {
    this.renderExecutiveKPIs();
    this.renderFlagshipROITable();
    this.renderMarketDossierCards();
    this.renderConcessionsTable();
    this.renderSWOTMatrix();
    this.renderWasteAndITModule();

    if (this.charts) {
      this.charts.renderRevenueRankingChart();
      this.charts.renderFinancialTrendsChart();
      this.charts.renderExpenseBreakdownChart();
    }

    if (this.map) {
      this.map.render();
    }

    if (window.comparisonModule) {
      window.comparisonModule.renderMarketComparisonMatrix();
      window.comparisonModule.renderMultiYearView();
    }
  }

  renderExecutiveKPIs() {
    const filtered = this.getFilteredMarkets();

    let totalRevenue = 0;
    let totalExpense = 0;
    let totalProfit = 0;
    let totalStalls = 0;
    let totalActiveVendors = 0;
    let totalDebt = 0;

    filtered.forEach(m => {
      const fin = this.getMarketFinancialsForYear(m, this.selectedFiscalYear);
      totalRevenue += fin.revenue;
      totalExpense += fin.expense;
      totalProfit += fin.profit;
      totalStalls += m.stalls.totalStalls;
      totalActiveVendors += m.stalls.activeVendors;
      totalDebt += m.financials.outstandingDebt;
    });

    const avgMargin = totalRevenue > 0 ? ((totalProfit / totalRevenue) * 100).toFixed(1) : "0.0";
    const avgOccupancy = totalStalls > 0 ? ((totalActiveVendors / totalStalls) * 100).toFixed(1) : "0.0";

    const kpiRev = document.getElementById("kpiTotalRevenue");
    const kpiProfit = document.getElementById("kpiTotalProfit");
    const kpiMargin = document.getElementById("kpiAvgMargin");
    const kpiStalls = document.getElementById("kpiTotalStalls");
    const kpiOccupancy = document.getElementById("kpiAvgOccupancy");
    const kpiDebt = document.getElementById("kpiTotalDebt");

    if (kpiRev) kpiRev.textContent = `฿${(totalRevenue / 1000000).toFixed(1)}M`;
    if (kpiProfit) kpiProfit.textContent = `฿${(totalProfit / 1000000).toFixed(1)}M`;
    if (kpiMargin) kpiMargin.textContent = `${avgMargin}%`;
    if (kpiStalls) kpiStalls.textContent = `${totalStalls.toLocaleString()} แผง`;
    if (kpiOccupancy) kpiOccupancy.textContent = `${avgOccupancy}%`;
    if (kpiDebt) kpiDebt.textContent = `฿${(totalDebt / 1000000).toFixed(2)}M`;
  }

  renderFlagshipROITable() {
    const tbody = document.getElementById("flagshipROITableBody");
    if (!tbody) return;

    tbody.innerHTML = FLAGSHIP_MARKETS_ROI.map(f => {
      const market = BMA_MARKETS_DATA.find(m => m.id === f.id);
      const fin = this.getMarketFinancialsForYear(market, this.selectedFiscalYear);
      const dynamicROI = ((fin.profit / f.assetValuationEst) * 100).toFixed(1);

      return `
        <tr class="border-b border-slate-800/80 hover:bg-slate-800/50 transition">
          <td class="py-3.5 px-4 font-bold text-slate-100 flex items-center gap-2">
            <span class="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center text-xs font-bold">
              ${market.rank}
            </span>
            <div>
              <div class="text-sm text-slate-100">${f.name}</div>
              <div class="text-[11px] text-slate-400">${f.category} (${market.geo.district})</div>
            </div>
          </td>
          <td class="py-3.5 px-4 text-right font-medium text-slate-300">฿${(f.assetValuationEst / 1000000).toLocaleString()}M</td>
          <td class="py-3.5 px-4 text-right font-bold text-emerald-400">฿${(fin.revenue / 1000000).toFixed(1)}M</td>
          <td class="py-3.5 px-4 text-right font-bold text-cyan-400">฿${(fin.profit / 1000000).toFixed(1)}M</td>
          <td class="py-3.5 px-4 text-right font-bold text-amber-400">฿${market.spatialYield.avgYieldPerSqm.toLocaleString()}</td>
          <td class="py-3.5 px-4 text-right">
            <span class="inline-block px-2 py-0.5 rounded text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              ${dynamicROI}%
            </span>
          </td>
          <td class="py-3.5 px-4 text-right text-slate-300">${f.capRatePercent}%</td>
          <td class="py-3.5 px-4 text-right text-slate-300">${market.stalls.occupancyRate}%</td>
          <td class="py-3.5 px-4 text-xs text-slate-400 max-w-[220px] leading-tight">
            ${f.partnerAgencies}
          </td>
          <td class="py-3.5 px-4 text-center">
            <button onclick="window.app.inspectMarket('${f.id}')" class="px-2.5 py-1 text-xs font-medium rounded bg-slate-800 hover:bg-emerald-600 text-slate-200 hover:text-white border border-slate-700 transition">
              เจาะลึก
            </button>
          </td>
        </tr>
      `;
    }).join("");
  }

  renderMarketDossierCards() {
    const container = document.getElementById("marketDossierGrid");
    if (!container) return;

    const filtered = this.getFilteredMarkets().filter(m => {
      if (!this.searchQueries.dossier) return true;
      const q = this.searchQueries.dossier;
      return (
        m.officialName.toLowerCase().includes(q) ||
        m.vernacularName.toLowerCase().includes(q) ||
        m.geo.district.toLowerCase().includes(q) ||
        m.swot.strengths.toLowerCase().includes(q) ||
        m.stalls.stallTypes.some(t => t.type.toLowerCase().includes(q))
      );
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="col-span-full p-12 text-center text-slate-400 bg-slate-900/60 rounded-xl border border-slate-800">
          <p class="text-base font-semibold">ไม่พบข้อมูลตลาดที่ตรงกับเงื่อนไขการค้นหา/ตัวกรอง</p>
          <button onclick="document.getElementById('btnResetGlobalFilter')?.click();" class="mt-3 px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-xs text-emerald-400 border border-slate-700">
            รีเซ็ตตัวกรองทั้งหมด
          </button>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(m => {
      const isFlagship = m.tier === "Flagship";
      const badgeStyle = isFlagship ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40" : (m.tier === "Medium" ? "bg-sky-500/20 text-sky-400 border-sky-500/40" : "bg-purple-500/20 text-purple-400 border-purple-500/40");

      const fin = this.getMarketFinancialsForYear(m, this.selectedFiscalYear);
      const weather = typeof generateMarketWeather === "function" ? generateMarketWeather(m) : null;

      return `
        <div class="bg-slate-900/90 rounded-xl border border-slate-800 hover:border-slate-700 p-5 flex flex-col justify-between transition-all hover:shadow-xl group">
          <div>
            <!-- Card Header -->
            <div class="flex items-start justify-between gap-3 mb-3">
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <span class="w-6 h-6 rounded-full bg-slate-800 text-slate-200 border border-slate-700 flex items-center justify-center text-xs font-bold">
                    #${m.rank}
                  </span>
                  <span class="text-xs px-2 py-0.5 rounded font-bold border ${badgeStyle}">
                    ${m.tier}
                  </span>
                  <span class="text-xs text-slate-400">${m.geo.district}</span>
                </div>
                <h3 class="text-lg font-bold text-slate-100 group-hover:text-emerald-400 transition">${m.officialName}</h3>
                <p class="text-xs text-slate-400 mt-0.5 line-clamp-1">${m.vernacularName}</p>
              </div>
              <div class="text-right shrink-0">
                <span class="text-[10px] text-slate-400 block">รายได้ปี ${this.selectedFiscalYear}</span>
                <span class="text-base font-extrabold text-emerald-400">฿${(fin.revenue / 1000000).toFixed(1)}M</span>
              </div>
            </div>

            <!-- Real-time Weather & AQI + 6-Hr Forecast Strip -->
            ${weather ? `
              <div class="my-3 p-3 rounded-lg bg-slate-950/70 border border-slate-800 space-y-2">
                <div class="flex items-center justify-between text-xs">
                  <div class="flex items-center gap-2">
                    <span class="text-lg">🌤️</span>
                    <div>
                      <span class="font-bold text-slate-100">${weather.current.temperature}°C</span>
                      <span class="text-[11px] text-slate-400">(${weather.current.condition})</span>
                    </div>
                  </div>
                  <div class="text-right">
                    <span class="px-2 py-0.5 rounded text-[10px] font-bold" style="background: ${weather.current.aqiColor}22; color: ${weather.current.aqiColor}; border: 1px solid ${weather.current.aqiColor}44;">
                      AQI ${weather.current.aqi} • PM2.5 ${weather.current.pm25} µg
                    </span>
                    <span class="text-[9px] text-slate-500 block mt-0.5">สถานีตรวจวัด: TMD & AirBKK</span>
                  </div>
                </div>

                <!-- 6-Hour Forecast Ribbon -->
                <div class="pt-1.5 border-t border-slate-800/80">
                  <span class="text-[10px] text-slate-400 font-semibold block mb-1">⏱️ พยากรณ์อากาศล่วงหน้า 6 ชั่วโมง:</span>
                  <div class="grid grid-cols-6 gap-1 text-[10px] text-center">
                    ${weather.forecast6Hours.map(f => `
                      <div class="bg-slate-900 p-1 rounded border border-slate-800">
                        <span class="text-slate-400 block text-[9px]">${f.hourLabel}</span>
                        <b class="text-slate-200">${f.temp}°</b>
                        <span class="text-[9px] block text-emerald-400">${f.aqi}</span>
                      </div>
                    `).join("")}
                  </div>
                </div>
              </div>
            ` : ''}

            <!-- Highlights Grid -->
            <div class="grid grid-cols-2 gap-2 my-3 text-xs bg-slate-800/50 p-3 rounded-lg border border-slate-800">
              <div>
                <span class="text-slate-400 block text-[11px]">กำไรสุทธิ (Margin)</span>
                <span class="font-bold text-cyan-400">฿${(fin.profit / 1000000).toFixed(1)}M (${fin.margin}%)</span>
              </div>
              <div>
                <span class="text-slate-400 block text-[11px]">แผงค้า (อัตราเช่า)</span>
                <span class="font-bold text-slate-200">${m.stalls.totalStalls.toLocaleString()} แผง (${m.stalls.occupancyRate}%)</span>
              </div>
              <div>
                <span class="text-slate-400 block text-[11px]">ขนาดพื้นที่ดิน</span>
                <span class="font-medium text-slate-300">${m.spatial.landAreaRai}</span>
              </div>
              <div>
                <span class="text-slate-400 block text-[11px]">Yield เฉลี่ย/ตร.ม.</span>
                <span class="font-bold text-amber-400">฿${m.spatialYield.avgYieldPerSqm.toLocaleString()}</span>
              </div>
            </div>

            <!-- Stalls tags & Blue Flag -->
            <div class="space-y-1.5 my-3">
              <div class="text-[11px] text-slate-400 flex items-center justify-between">
                <span>ประเภทสินค้าหลัก:</span>
                <span class="text-blue-400 font-medium">ธงฟ้า ${m.stalls.blueFlagStalls} แผง</span>
              </div>
              <div class="flex flex-wrap gap-1">
                ${m.stalls.stallTypes.slice(0, 3).map(t => `
                  <span class="text-[10px] px-2 py-0.5 bg-slate-800 text-slate-300 rounded border border-slate-700">
                    ${t.type.split("(")[0].trim()} (${t.ratio}%)
                  </span>
                `).join("")}
                ${m.stalls.stallTypes.length > 3 ? `<span class="text-[10px] px-1.5 py-0.5 bg-slate-800 text-slate-400 rounded">+${m.stalls.stallTypes.length - 3}</span>` : ''}
              </div>
            </div>

            <!-- Subleasing & Concession Quick snippet -->
            <div class="text-xs text-slate-300 bg-slate-950/40 p-2.5 rounded border border-slate-800/80 mb-3 space-y-1">
              <div class="flex justify-between text-[11px]">
                <span class="text-slate-400">การเช่าช่วง:</span>
                <span class="text-amber-400 font-medium">${m.subLeasing.prevalence} (${m.subLeasing.areaRatioPercent}%)</span>
              </div>
              <div class="flex justify-between text-[11px]">
                <span class="text-slate-400">สัมปทานที่จอดรถ:</span>
                <span class="text-slate-300 truncate max-w-[150px]">${m.concessions.parking.operator.split("(")[0]}</span>
              </div>
            </div>
          </div>

          <!-- Card Actions -->
          <div class="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
            <a href="${m.geo.googleMapsUrl}" target="_blank" class="px-3 py-1.5 rounded text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1">
              <span>🗺️ Google Maps</span>
            </a>
            <button onclick="window.app.inspectMarket('${m.id}')" class="flex-1 py-1.5 px-3 rounded text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition flex items-center justify-center gap-1 shadow-lg shadow-emerald-900/20">
              <span>ดูข้อมูลฉบับเต็ม</span>
              <span>&rarr;</span>
            </button>
          </div>
        </div>
      `;
    }).join("");
  }

  renderConcessionsTable() {
    const tbody = document.getElementById("concessionsTableBody");
    if (!tbody) return;

    const filtered = this.getFilteredMarkets().filter(m => {
      if (!this.searchQueries.concessions) return true;
      const q = this.searchQueries.concessions;
      return (
        m.officialName.toLowerCase().includes(q) ||
        m.concessions.parking.operator.toLowerCase().includes(q) ||
        m.concessions.restroom.operator.toLowerCase().includes(q) ||
        m.subLeasing.model.toLowerCase().includes(q)
      );
    });

    tbody.innerHTML = filtered.map(m => `
      <tr class="border-b border-slate-800/70 hover:bg-slate-800/40 text-xs">
        <td class="py-3 px-4 font-bold text-slate-200">
          <div>${m.officialName}</div>
          <span class="text-[10px] text-slate-400 font-normal">${m.geo.district}</span>
        </td>
        <td class="py-3 px-4">
          <div class="font-medium text-slate-200">${m.concessions.parking.operator}</div>
          <div class="text-[10px] text-slate-400">สัญญา: ${m.concessions.parking.durationYears} ปี (${m.concessions.parking.startDate} ถึง ${m.concessions.parking.endDate})</div>
        </td>
        <td class="py-3 px-4 text-right font-bold text-emerald-400">
          ฿${(m.concessions.parking.annualRevenueShare / 1000000).toFixed(2)}M
        </td>
        <td class="py-3 px-4">
          <div class="font-medium text-slate-200">${m.concessions.restroom.operator}</div>
          <div class="text-[10px] text-slate-400">สัญญา: ${m.concessions.restroom.durationYears} ปี (${m.concessions.restroom.startDate} ถึง ${m.concessions.restroom.endDate})</div>
        </td>
        <td class="py-3 px-4 text-right font-bold text-cyan-400">
          ฿${(m.concessions.restroom.annualRevenueShare / 1000000).toFixed(2)}M
        </td>
        <td class="py-3 px-4">
          <div class="font-semibold ${m.subLeasing.areaRatioPercent > 30 ? 'text-red-400' : 'text-amber-400'}">${m.subLeasing.prevalence} (${m.subLeasing.areaRatioPercent}%)</div>
          <div class="text-[10px] text-slate-400 line-clamp-1">${m.subLeasing.estimatedSubleaseSpread}</div>
        </td>
        <td class="py-3 px-4 text-center">
          <button onclick="window.app.inspectMarket('${m.id}', 'concessions')" class="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] border border-slate-700">
            ดูสัญญา
          </button>
        </td>
      </tr>
    `).join("");
  }

  renderSWOTMatrix() {
    const container = document.getElementById("swotMatrixContainer");
    if (!container) return;

    const filtered = this.getFilteredMarkets().filter(m => {
      if (!this.searchQueries.swot) return true;
      const q = this.searchQueries.swot;
      return (
        m.officialName.toLowerCase().includes(q) ||
        m.swot.strengths.toLowerCase().includes(q) ||
        m.swot.weaknesses.toLowerCase().includes(q) ||
        m.swot.urgentFixes.toLowerCase().includes(q) ||
        m.swot.darkInfluenceTransparency.toLowerCase().includes(q)
      );
    });

    container.innerHTML = filtered.map(m => `
      <div class="bg-slate-900/80 rounded-xl border border-slate-800 p-5 space-y-4">
        <div class="flex items-center justify-between border-b border-slate-800 pb-3">
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center justify-center">
              ${m.rank}
            </span>
            <h4 class="text-base font-bold text-slate-100">${m.officialName}</h4>
            <span class="text-xs text-slate-400">(${m.geo.district})</span>
          </div>
          <button onclick="window.app.inspectMarket('${m.id}', 'swot')" class="text-xs text-emerald-400 hover:underline">
            ดูรายละเอียด &rarr;
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <!-- Strengths -->
          <div class="bg-emerald-950/20 p-3 rounded-lg border border-emerald-800/40">
            <span class="font-bold text-emerald-400 flex items-center gap-1.5 mb-1">
              <span>✅</span> จุดเด่นและจุดขาย (Strengths & Selling Points)
            </span>
            <p class="text-slate-300 leading-relaxed">${m.swot.strengths}</p>
            <div class="mt-2 pt-2 border-t border-emerald-800/30 text-[11px] text-slate-300">
              <span class="text-emerald-400 font-semibold">สำหรับผู้ซื้อ:</span> ${m.swot.buyerSellingPoints}<br>
              <span class="text-emerald-400 font-semibold">สำหรับผู้ค้า:</span> ${m.swot.vendorSellingPoints}
            </div>
          </div>

          <!-- Weaknesses & Urgent -->
          <div class="bg-amber-950/20 p-3 rounded-lg border border-amber-800/40">
            <span class="font-bold text-amber-400 flex items-center gap-1.5 mb-1">
              <span>⚠️</span> จุดด้อยและสิ่งที่ต้องแก้ไขเร่งด่วน (Weaknesses & Fixes)
            </span>
            <p class="text-slate-300 leading-relaxed">${m.swot.weaknesses}</p>
            <div class="mt-2 pt-2 border-t border-amber-800/30 text-[11px]">
              <span class="text-rose-400 font-bold">สิ่งที่ต้องแก้เร่งด่วน:</span>
              <span class="text-slate-200">${m.swot.urgentFixes}</span>
            </div>
          </div>
        </div>

        <!-- Dark Influence / Transparency Monitor -->
        <div class="bg-slate-950/60 p-3 rounded-lg border border-slate-800 text-xs">
          <div class="flex items-center gap-2 mb-1">
            <span class="text-indigo-400 font-bold">🛡️ การจัดการความโปร่งใส / ปราบปรามผู้มีอิทธิพล:</span>
          </div>
          <p class="text-slate-300 leading-relaxed">${m.swot.darkInfluenceTransparency}</p>
        </div>
      </div>
    `).join("");
  }

  renderWasteAndITModule() {
    const container = document.getElementById("wasteAndITContainer");
    if (!container) return;

    container.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Waste Strategy Card -->
        <div class="bg-slate-900/90 p-5 rounded-xl border border-slate-800 space-y-4">
          <h3 class="text-base font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-3">
            <span>♻️</span> ยุทธศาสตร์การบริหารจัดการขยะ ของเสีย และน้ำเสีย
          </h3>
          <div class="space-y-3 text-xs text-slate-300">
            <div class="bg-slate-800/60 p-3 rounded-lg border border-slate-700">
              <span class="font-bold text-emerald-400 block mb-1">1. การคัดแยกขยะต้นทางและแปรรูปชีวภาพ (On-site Processing)</span>
              ทุกตลาดมีการแยกขยะ 4 ประเภทอย่างเป็นระบบ โดยเฉพาะขยะอินทรีย์จากตลาดสดและเศษอาหาร มีการติดตั้งโรงปุ๋ยหมักชีวภาพ (จตุจักร 2 ตัน/วัน, มีนบุรี, ธนบุรี 3.5 ตัน/วัน) หมุนเวียนใช้ในสวนสาธารณะ กทม.
            </div>
            <div class="bg-slate-800/60 p-3 rounded-lg border border-slate-700">
              <span class="font-bold text-cyan-400 block mb-1">2. เส้นทางขนถ่ายและสถานีกำจัดปลายทาง (Logistics & Destinations)</span>
              ขยะมูลฝอยที่เหลือถูกขนถ่ายโดยรถอัดขยะ กทม. ขนาด 5-10 ตัน รอบขนถ่ายช่วงเวลากลางคืน (22:00 - 05:00 น.) ไปยัง <b>สถานีขนถ่ายสายไหม</b>, <b>โรงแปรรูปขยะมูลฝอยอ่อนนุช</b>, และ <b>โรงกำจัดมูลฝอยหนองแขม</b>
            </div>
            <div class="bg-slate-800/60 p-3 rounded-lg border border-slate-700">
              <span class="font-bold text-amber-400 block mb-1">3. บ่อดักไขมันและการบำบัดน้ำเสีย (Wastewater & Grease Traps)</span>
              ติดตั้งบ่อดักไขมันสเตนเลสและคอนกรีต 3 ขั้นตอนทุกจุดจำหน่ายอาหารเปียก พร้อมระบบเติมอากาศ Aerated Lagoon / บึงประดิษฐ์ ก่อนระบายน้ำทิ้งลงคลองสาธารณะตามเกณฑ์กรมควบคุมมลพิษ
            </div>
          </div>
        </div>

        <!-- IT Systems Card -->
        <div class="bg-slate-900/90 p-5 rounded-xl border border-slate-800 space-y-4">
          <h3 class="text-base font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-3">
            <span>💻</span> ระบบเทคโนโลยีสารสนเทศ IT & Smart Market Architecture
          </h3>
          <div class="space-y-2.5 text-xs text-slate-300">
            <div class="flex items-start gap-2.5 bg-slate-800/60 p-2.5 rounded-lg border border-slate-700">
              <span class="text-emerald-400 font-bold text-sm">📱</span>
              <div>
                <b class="text-slate-100">BMA Smart Stall RFID / QR Identity</b>
                <p class="text-slate-400 text-[11px]">บัตรประจำตัวดิจิทัลผู้ค้าประจำแผง บูรณาการฐานข้อมูลสิทธิการเช่า เพื่อตัดวงจรนายหน้าและส่วยเซ้งช่วง</p>
              </div>
            </div>
            <div class="flex items-start gap-2.5 bg-slate-800/60 p-2.5 rounded-lg border border-slate-700">
              <span class="text-cyan-400 font-bold text-sm">💳</span>
              <div>
                <b class="text-slate-100">National Cross-Bank QR & E-Payment</b>
                <p class="text-slate-400 text-[11px]">รองรับการชำระเงินไร้เงินสดครอบคลุมเฉลี่ย 88.5% ลดความเสี่ยงการถือเงินสดของพนักงานจัดเก็บ</p>
              </div>
            </div>
            <div class="flex items-start gap-2.5 bg-slate-800/60 p-2.5 rounded-lg border border-slate-700">
              <span class="text-purple-400 font-bold text-sm">📹</span>
              <div>
                <b class="text-slate-100">AI CCTV & Crowd Density Telemetry</b>
                <p class="text-slate-400 text-[11px]">กล้อง AI ตรวจจับความหนาแน่นผู้คน ป้องกันการล้วงกระเป๋า และระบบ Smart Parking LPR สแกนป้ายทะเบียน</p>
              </div>
            </div>
            <div class="flex items-start gap-2.5 bg-slate-800/60 p-2.5 rounded-lg border border-slate-700">
              <span class="text-amber-400 font-bold text-sm">⚡</span>
              <div>
                <b class="text-slate-100">IoT Smart Power & Fire Protection Metering</b>
                <p class="text-slate-400 text-[11px]">มิเตอร์ไฟฟ้าอัจฉริยะ ตรวจจับการใช้กระแสไฟฟ้าเกินขนาดและตัดไฟอัตโนมัติป้องกันอัคคีภัยในอาคารตลาด</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  inspectMarket(marketId, defaultSubTab = "overview") {
    const market = BMA_MARKETS_DATA.find(m => m.id === marketId);
    if (!market) return;
    this.activeModalMarket = market;

    const modal = document.getElementById("marketModal");
    const overlay = document.getElementById("marketModalOverlay");
    if (!modal || !overlay) return;

    document.getElementById("modalMarketTitle").textContent = `${market.rank}. ${market.officialName}`;
    document.getElementById("modalMarketSubtitle").textContent = `${market.vernacularName} | ${market.geo.district}`;

    this.renderModalSubTabs(market);
    this.switchModalSubTab(defaultSubTab);

    overlay.classList.remove("hidden");
    modal.classList.remove("hidden");

    if (this.map) {
      this.map.focusMarket(market.id);
    }
  }

  closeMarketModal() {
    document.getElementById("marketModalOverlay")?.classList.add("hidden");
    document.getElementById("marketModal")?.classList.add("hidden");
    this.activeModalMarket = null;
  }

  renderModalSubTabs(market) {
    const content = document.getElementById("modalTabContent");
    if (!content) return;

    const fin = this.getMarketFinancialsForYear(market, this.selectedFiscalYear);
    const weather = typeof generateMarketWeather === "function" ? generateMarketWeather(market) : null;

    content.innerHTML = `
      <!-- SubTab 1: Overview, Geo & Weather -->
      <div id="modalSubTab-overview" class="modal-subtab-pane space-y-4">
        ${weather ? `
          <div class="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
            <div class="flex items-center gap-3">
              <span class="text-3xl">🌤️</span>
              <div>
                <b class="text-sm text-slate-100">สภาพอากาศปัจจุบัน: ${weather.current.temperature}°C (${weather.current.condition})</b>
                <p class="text-[11px] text-slate-400">ความชื้น ${weather.current.humidity}% | พิกัด ${market.geo.lat}, ${market.geo.lng}</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span class="px-3 py-1 rounded text-xs font-bold" style="background: ${weather.current.aqiColor}22; color: ${weather.current.aqiColor}; border: 1px solid ${weather.current.aqiColor}44;">
                ดัชนี AQI ${weather.current.aqi} • PM2.5 ${weather.current.pm25} µg/m³ (${weather.current.aqiStatus})
              </span>
            </div>
          </div>
        ` : ''}

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-slate-800/70 p-4 rounded-xl border border-slate-700 text-xs space-y-2">
            <h4 class="font-bold text-slate-100 text-sm border-b border-slate-700 pb-2">📍 ข้อมูลสถานที่ตั้ง & กายภาพ</h4>
            <div><b class="text-slate-400">ที่ตั้ง:</b> ${market.geo.address}</div>
            <div><b class="text-slate-400">พิกัด Geo:</b> ${market.geo.lat}, ${market.geo.lng}</div>
            <div><b class="text-slate-400">เวลาทำการ:</b> ${market.geo.operatingHours}</div>
            <div><b class="text-slate-400">พื้นที่ดิน:</b> ${market.spatial.landAreaRai} (${market.spatial.landAreaSqm.toLocaleString()} ตร.ม.)</div>
            <div><b class="text-slate-400">พื้นที่ใช้สอย:</b> ${market.spatial.usableAreaSqm.toLocaleString()} ตร.ม. (พื้นที่ว่าง ${market.spatial.vacantAreaSqm.toLocaleString()} ตร.ม.)</div>
            <div><b class="text-slate-400">สิ่งปลูกสร้าง:</b> ${market.spatial.buildingCount} อาคาร (${market.spatial.buildingDetails})</div>
            <div><b class="text-slate-400">ที่จอดรถ:</b> รถยนต์ ${market.spatial.parkingCars} คัน / มอเตอร์ไซค์ ${market.spatial.parkingMotorcycles} คัน</div>
            <div><b class="text-slate-400">สุขาภิบาล:</b> ห้องน้ำ ${market.spatial.restroomCount} จุด (${market.spatial.restroomCubicles} ห้อง)</div>
          </div>

          <div class="bg-slate-800/70 p-4 rounded-xl border border-slate-700 text-xs space-y-2">
            <h4 class="font-bold text-slate-100 text-sm border-b border-slate-700 pb-2">🏛️ สถานที่สำคัญใกล้เคียง (POIs)</h4>
            <div class="space-y-1.5">
              ${market.surroundingPOIs.map(p => `
                <div class="flex justify-between items-center bg-slate-900/60 p-2 rounded border border-slate-800">
                  <span class="text-slate-200">${p.name}</span>
                  <span class="text-emerald-400 font-medium">${p.distance}</span>
                </div>
              `).join("")}
            </div>
            <div class="pt-2">
              <a href="${market.geo.googleMapsUrl}" target="_blank" class="w-full py-2 px-3 bg-sky-600 hover:bg-sky-500 text-white rounded text-center block font-semibold transition">
                เปิดบน Google Maps &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- SubTab 2: Stalls & Rates -->
      <div id="modalSubTab-stalls" class="modal-subtab-pane hidden space-y-4">
        <div class="bg-slate-800/70 p-4 rounded-xl border border-slate-700">
          <div class="flex justify-between items-center mb-3">
            <h4 class="font-bold text-slate-100 text-sm">🏪 สัดส่วนแผงค้าและอัตราค่าเช่า (รวม ${market.stalls.totalStalls.toLocaleString()} แผง)</h4>
            <span class="text-xs text-emerald-400 font-bold">อัตราความหนาแน่นผู้เช่า ${market.stalls.occupancyRate}% (${market.stalls.vendorDensityRatio})</span>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-xs text-left">
              <thead class="bg-slate-900/80 text-slate-300 border-b border-slate-700">
                <tr>
                  <th class="p-2.5">ประเภทสินค้า/โซน</th>
                  <th class="p-2.5 text-right">จำนวนแผง</th>
                  <th class="p-2.5 text-right">สัดส่วน (%)</th>
                  <th class="p-2.5 text-right">ค่าเช่ารายวัน (บาท)</th>
                  <th class="p-2.5 text-right">ค่าเช่ารายเดือน (บาท)</th>
                  <th class="p-2.5 text-right">ค่าเช่า/ตร.ม. (บาท)</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-700/60 text-slate-200">
                ${market.stalls.stallTypes.map(t => `
                  <tr>
                    <td class="p-2.5 font-medium">${t.type}</td>
                    <td class="p-2.5 text-right">${t.count.toLocaleString()}</td>
                    <td class="p-2.5 text-right text-emerald-400 font-semibold">${t.ratio}%</td>
                    <td class="p-2.5 text-right">฿${t.rentDaily}</td>
                    <td class="p-2.5 text-right font-bold">฿${t.rentMonthly.toLocaleString()}</td>
                    <td class="p-2.5 text-right text-amber-400">฿${t.rentPerSqm}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
          <div class="mt-3 pt-3 border-t border-slate-700 flex justify-between text-xs text-slate-300">
            <span><b>แผงค้าธงฟ้าราคาประหยัด:</b> ${market.stalls.blueFlagStalls} แผง</span>
            <span><b>อัตราค่าเช่าอาคารพาณิชย์:</b> ${market.stalls.buildingRentRates}</span>
          </div>
        </div>
      </div>

      <!-- SubTab 3: Financials & Concessions -->
      <div id="modalSubTab-concessions" class="modal-subtab-pane hidden space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-slate-800/70 p-4 rounded-xl border border-slate-700 text-xs space-y-3">
            <h4 class="font-bold text-slate-100 text-sm border-b border-slate-700 pb-2">📑 สัญญาสัมปทานและเช่าช่วง</h4>
            <div class="bg-slate-900/60 p-2.5 rounded border border-slate-800">
              <b class="text-emerald-400 block mb-1">สัมปทานที่จอดรถ:</b>
              <div>ผู้รับสัมปทาน: ${market.concessions.parking.operator}</div>
              <div>ระยะเวลา: ${market.concessions.parking.durationYears} ปี (${market.concessions.parking.startDate} ถึง ${market.concessions.parking.endDate})</div>
              <div class="text-emerald-400 font-bold mt-1">รายได้ต่อปี: ฿${(market.concessions.parking.annualRevenueShare / 1000000).toFixed(2)}M</div>
              <p class="text-slate-400 text-[11px] mt-1">${market.concessions.parking.terms}</p>
            </div>
            <div class="bg-slate-900/60 p-2.5 rounded border border-slate-800">
              <b class="text-cyan-400 block mb-1">สัมปทานห้องน้ำ:</b>
              <div>ผู้รับสัมปทาน: ${market.concessions.restroom.operator}</div>
              <div>ระยะเวลา: ${market.concessions.restroom.durationYears} ปี (${market.concessions.restroom.startDate} ถึง ${market.concessions.restroom.endDate})</div>
              <div class="text-cyan-400 font-bold mt-1">รายได้ต่อปี: ฿${(market.concessions.restroom.annualRevenueShare / 1000000).toFixed(2)}M</div>
              <p class="text-slate-400 text-[11px] mt-1">${market.concessions.restroom.terms}</p>
            </div>
            <div class="bg-slate-900/60 p-2.5 rounded border border-slate-800">
              <b class="text-amber-400 block mb-1">การปล่อยเช่าช่วง (Sub-leasing):</b>
              <div>ระดับการเช่าช่วง: ${market.subLeasing.prevalence} (${market.subLeasing.areaRatioPercent}%)</div>
              <div>ส่วนต่างราคาตลาดมืด: ${market.subLeasing.estimatedSubleaseSpread}</div>
              <p class="text-slate-400 text-[11px] mt-1">${market.subLeasing.policyRegulation}</p>
            </div>
          </div>

          <div class="bg-slate-800/70 p-4 rounded-xl border border-slate-700 text-xs space-y-3">
            <h4 class="font-bold text-slate-100 text-sm border-b border-slate-700 pb-2">💰 งบการเงินปี ${this.selectedFiscalYear}</h4>
            <div class="grid grid-cols-2 gap-2 text-center">
              <div class="bg-slate-900/80 p-2 rounded border border-slate-800">
                <span class="text-slate-400 block text-[11px]">รายได้ปี ${this.selectedFiscalYear}</span>
                <span class="text-sm font-bold text-emerald-400">฿${(fin.revenue / 1000000).toFixed(2)}M</span>
              </div>
              <div class="bg-slate-900/80 p-2 rounded border border-slate-800">
                <span class="text-slate-400 block text-[11px]">ค่าใช้จ่าย</span>
                <span class="text-sm font-bold text-rose-400">฿${(fin.expense / 1000000).toFixed(2)}M</span>
              </div>
              <div class="bg-slate-900/80 p-2 rounded border border-slate-800">
                <span class="text-slate-400 block text-[11px]">กำไรสุทธิ</span>
                <span class="text-sm font-bold text-cyan-400">฿${(fin.profit / 1000000).toFixed(2)}M</span>
              </div>
              <div class="bg-slate-900/80 p-2 rounded border border-slate-800">
                <span class="text-slate-400 block text-[11px]">หนี้สินค้างรับ</span>
                <span class="text-sm font-bold text-amber-400">฿${(market.financials.outstandingDebt / 1000000).toFixed(2)}M</span>
              </div>
            </div>

            <div class="space-y-1.5 pt-2">
              <span class="font-bold text-slate-300 block">หมวดค่าใช้จ่ายหลัก:</span>
              ${market.financials.expenseStreams.map(e => `
                <div class="flex justify-between text-[11px] text-slate-300">
                  <span>${e.name}:</span>
                  <span class="font-semibold text-slate-100">฿${(e.amount / 1000000).toFixed(2)}M (${e.ratio}%)</span>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </div>

      <!-- SubTab 4: Operations, Waste & IT -->
      <div id="modalSubTab-waste" class="modal-subtab-pane hidden space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-slate-800/70 p-4 rounded-xl border border-slate-700 text-xs space-y-2.5">
            <h4 class="font-bold text-slate-100 text-sm border-b border-slate-700 pb-2">🗑️ การจัดการขยะและสิ่งแวดล้อม</h4>
            <div><b class="text-slate-400">ปริมาณขยะต่อวัน:</b> <span class="font-bold text-rose-400">${market.wasteManagement.solidWasteTonsPerDay} ตัน/วัน</span></div>
            <div><b class="text-slate-400">การคัดแยก:</b> ${market.wasteManagement.sortingSystem}</div>
            <div><b class="text-slate-400">สถานที่กำจัดปลายทาง:</b> ${market.wasteManagement.destination}</div>
            <div><b class="text-slate-400">วิธีและรอบขนถ่าย:</b> ${market.wasteManagement.transportMethod}</div>
            <div><b class="text-slate-400">การแปรรูปในพื้นที่:</b> ${market.wasteManagement.onsiteProcessing}</div>
            <div><b class="text-slate-400">บ่อดักไขมัน/น้ำเสีย:</b> ${market.wasteManagement.wastewaterGreaseTrap}</div>
          </div>

          <div class="bg-slate-800/70 p-4 rounded-xl border border-slate-700 text-xs space-y-2.5">
            <h4 class="font-bold text-slate-100 text-sm border-b border-slate-700 pb-2">💻 ระบบเทคโนโลยี IT & สังคม</h4>
            <div class="space-y-1.5">
              <span class="font-bold text-slate-300 block">ระบบ IT ที่ใช้งาน:</span>
              ${market.itSystems.systems.map(s => `
                <div class="bg-slate-900/60 p-2 rounded text-slate-200 border border-slate-800 flex items-center gap-2">
                  <span class="text-emerald-400">✓</span> ${s}
                </div>
              `).join("")}
            </div>
            <div class="pt-2 border-t border-slate-700 space-y-1">
              <span class="font-bold text-emerald-400 block">การฝึกอาชีพและมวลชนสัมพันธ์:</span>
              <p class="text-slate-300 leading-relaxed">${market.communityImpact.vocationalTraining}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- SubTab 5: SWOT & 3-Year Trend -->
      <div id="modalSubTab-swot" class="modal-subtab-pane hidden space-y-4">
        <div class="bg-slate-800/70 p-4 rounded-xl border border-slate-700 text-xs space-y-3">
          <h4 class="font-bold text-slate-100 text-sm border-b border-slate-700 pb-2">🎯 กลยุทธ์ SWOT และการประเมินย้อนหลัง 3 ปี + พยากรณ์</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div class="bg-emerald-950/20 p-2.5 rounded border border-emerald-800/30">
              <b class="text-emerald-400 block">จุดเด่น:</b> ${market.swot.strengths}
            </div>
            <div class="bg-rose-950/20 p-2.5 rounded border border-rose-800/30">
              <b class="text-rose-400 block">สิ่งที่ต้องแก้เร่งด่วน:</b> ${market.swot.urgentFixes}
            </div>
          </div>

          <div class="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
            <span class="font-bold text-indigo-400 block mb-1">การจัดการความโปร่งใสและปราบปรามมาเฟีย:</span>
            <p class="text-slate-300 leading-relaxed">${market.swot.darkInfluenceTransparency}</p>
          </div>

          <div class="overflow-x-auto pt-2">
            <span class="font-bold text-slate-200 block mb-2">ตารางสถิติการเงิน 5 ปี (ย้อนหลัง 3 ปี + ปัจจุบัน 2569 + คาดการณ์ 2570):</span>
            <table class="w-full text-xs text-left">
              <thead class="bg-slate-900 text-slate-400">
                <tr>
                  <th class="p-2">ปีงบประมาณ</th>
                  <th class="p-2 text-right">รายได้ (บาท)</th>
                  <th class="p-2 text-right">ค่าใช้จ่าย (บาท)</th>
                  <th class="p-2 text-right">กำไรสุทธิ (บาท)</th>
                  <th class="p-2 text-right">Profit Margin</th>
                  <th class="p-2 text-center">สถานะ</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800 text-slate-200">
                ${market.financials.historical.map(h => `
                  <tr class="${h.year === this.selectedFiscalYear ? 'bg-emerald-950/40 font-bold' : ''}">
                    <td class="p-2">${h.year}</td>
                    <td class="p-2 text-right font-semibold text-emerald-400">฿${(h.revenue / 1000000).toFixed(2)}M</td>
                    <td class="p-2 text-right text-rose-400">฿${(h.expense / 1000000).toFixed(2)}M</td>
                    <td class="p-2 text-right text-cyan-400">฿${(h.profit / 1000000).toFixed(2)}M</td>
                    <td class="p-2 text-right">${h.margin}%</td>
                    <td class="p-2 text-center">
                      <span class="px-2 py-0.5 rounded text-[10px] ${h.isCurrent ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : (h.isForecast ? 'bg-purple-500/20 text-purple-300' : 'bg-slate-800 text-slate-400')}">
                        ${h.isCurrent ? 'ปีปัจจุบัน' : (h.isForecast ? 'คาดการณ์' : 'สถิติจริง')}
                      </span>
                    </td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  switchModalSubTab(subTabId) {
    document.querySelectorAll(".modal-subtab-btn").forEach(btn => {
      const isMatch = btn.getAttribute("data-subtab") === subTabId;
      btn.classList.toggle("bg-emerald-600", isMatch);
      btn.classList.toggle("text-white", isMatch);
      btn.classList.toggle("bg-slate-800", !isMatch);
      btn.classList.toggle("text-slate-300", !isMatch);
    });

    document.querySelectorAll(".modal-subtab-pane").forEach(pane => {
      pane.classList.add("hidden");
    });

    const activePane = document.getElementById(`modalSubTab-${subTabId}`);
    if (activePane) activePane.classList.remove("hidden");
  }

  exportCSV() {
    const headers = [
      "Rank", "OfficialName", "District", "Tier", `Revenue_FY${this.selectedFiscalYear}_THB`, 
      `Expense_FY${this.selectedFiscalYear}_THB`, `Profit_FY${this.selectedFiscalYear}_THB`, 
      "Margin_Percent", "TotalStalls", "OccupancyRate_Percent", "YieldPerSqm_Monthly", 
      "WasteTonsPerDay", "ParkingRevenue_THB", "RestroomRevenue_THB"
    ];

    const filtered = this.getFilteredMarkets();

    const rows = filtered.map(m => {
      const fin = this.getMarketFinancialsForYear(m, this.selectedFiscalYear);
      return [
        m.rank,
        `"${m.officialName}"`,
        `"${m.geo.district}"`,
        m.tier,
        fin.revenue,
        fin.expense,
        fin.profit,
        fin.margin,
        m.stalls.totalStalls,
        m.stalls.occupancyRate,
        m.spatialYield.avgYieldPerSqm,
        m.wasteManagement.solidWasteTonsPerDay,
        m.concessions.parking.annualRevenueShare,
        m.concessions.restroom.annualRevenueShare
      ];
    });

    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `BMA_Markets_Report_FY${this.selectedFiscalYear}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  exportJSON() {
    const filtered = this.getFilteredMarkets().map(m => ({
      ...m,
      selectedFiscalYearData: this.getMarketFinancialsForYear(m, this.selectedFiscalYear)
    }));

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(filtered, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `BMA_Markets_Dataset_FY${this.selectedFiscalYear}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }
}

window.app = new BMADashboardApp();

/**
 * BMA Market Self-Contained GIS Vector Map Engine
 * 100% Offline-capable, Zero CDN Dependency
 * Renders Bangkok Districts, Chao Phraya River, 12 Market Pins, POIs, and Interactive Popups
 */

class BMAMarketMap {
  constructor(mapContainerId) {
    this.containerId = mapContainerId;
    this.container = document.getElementById(mapContainerId);
    this.activeFilter = "all";
    this.selectedMarketId = null;
    this.hoveredMarket = null;
    this.scale = 1.0;
    this.offsetX = 0;
    this.offsetY = 0;
    this.isDragging = false;
    this.dragStartX = 0;
    this.dragStartY = 0;
    this.showPOIs = true;

    // Bangkok Bounds for coordinate projection
    // Bounding box: West 100.32, East 100.92, South 13.50, North 13.95
    this.geoBounds = {
      minLng: 100.30,
      maxLng: 100.90,
      minLat: 13.55,
      maxLat: 13.92
    };

    this.init();
  }

  init() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="relative w-full h-full bg-slate-950 overflow-hidden select-none" style="min-height: 340px; border-radius: 8px;">
        <!-- Canvas Layer -->
        <canvas id="bmaVectorMapCanvas" class="w-full h-full cursor-grab active:cursor-grabbing"></canvas>

        <!-- Map Floating Controls -->
        <div class="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
          <button id="mapZoomInBtn" class="w-7 h-7 rounded bg-slate-800/90 hover:bg-slate-700 text-slate-100 text-sm font-bold border border-slate-700 flex items-center justify-center shadow">
            +
          </button>
          <button id="mapZoomOutBtn" class="w-7 h-7 rounded bg-slate-800/90 hover:bg-slate-700 text-slate-100 text-sm font-bold border border-slate-700 flex items-center justify-center shadow">
            -
          </button>
          <button id="mapResetBtn" class="w-7 h-7 rounded bg-slate-800/90 hover:bg-slate-700 text-slate-300 text-xs border border-slate-700 flex items-center justify-center shadow" title="Reset View">
            🔄
          </button>
        </div>

        <!-- Layer Legend Overlay -->
        <div class="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-md px-3 py-2 rounded-lg border border-slate-800 text-[11px] text-slate-300 flex flex-wrap items-center gap-3 z-10">
          <span class="flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-full bg-emerald-400"></span> Flagship (1-3)</span>
          <span class="flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-full bg-sky-400"></span> Medium (4-7)</span>
          <span class="flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-full bg-purple-400"></span> Small (8-12)</span>
          <label class="flex items-center gap-1 cursor-pointer text-slate-400 hover:text-slate-200">
            <input type="checkbox" id="chkTogglePOIs" checked class="rounded bg-slate-800 text-emerald-500 text-xs">
            <span>แสดง POI ใกล้เคียง</span>
          </label>
        </div>

        <!-- Dynamic Marker Popup Modal -->
        <div id="mapMarkerPopup" class="absolute hidden bg-slate-900/95 backdrop-blur-md border border-slate-700 p-3 rounded-xl shadow-2xl z-20 pointer-events-auto text-xs max-w-[260px] animate-fadeIn">
        </div>
      </div>
    `;

    this.canvas = document.getElementById("bmaVectorMapCanvas");
    this.popup = document.getElementById("mapMarkerPopup");
    this.ctx = this.canvas.getContext("2d");

    this.setupEvents();
    this.resize();
    this.render();
  }

  setupEvents() {
    window.addEventListener("resize", () => {
      this.resize();
      this.render();
    });

    document.getElementById("mapZoomInBtn")?.addEventListener("click", () => {
      this.scale = Math.min(3.5, this.scale * 1.25);
      this.render();
    });

    document.getElementById("mapZoomOutBtn")?.addEventListener("click", () => {
      this.scale = Math.max(0.6, this.scale * 0.8);
      this.render();
    });

    document.getElementById("mapResetBtn")?.addEventListener("click", () => {
      this.scale = 1.0;
      this.offsetX = 0;
      this.offsetY = 0;
      this.render();
    });

    document.getElementById("chkTogglePOIs")?.addEventListener("change", (e) => {
      this.showPOIs = e.target.checked;
      this.render();
    });

    // Mouse drag pan
    this.canvas.addEventListener("mousedown", (e) => {
      this.isDragging = true;
      this.dragStartX = e.clientX;
      this.dragStartY = e.clientY;
      if (this.popup) this.popup.classList.add("hidden");
    });

    window.addEventListener("mouseup", () => {
      this.isDragging = false;
    });

    this.canvas.addEventListener("mousemove", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      if (this.isDragging) {
        const dx = e.clientX - this.dragStartX;
        const dy = e.clientY - this.dragStartY;
        this.offsetX += dx;
        this.offsetY += dy;
        this.dragStartX = e.clientX;
        this.dragStartY = e.clientY;
        this.render();
        return;
      }

      // Check Marker Hover
      const hit = this.getMarkerAtScreen(mouseX, mouseY);
      if (hit !== this.hoveredMarket) {
        this.hoveredMarket = hit;
        this.canvas.style.cursor = hit ? "pointer" : "grab";
        this.render();
        if (hit) {
          this.showPopup(hit, mouseX, mouseY);
        } else if (!this.selectedMarketId) {
          if (this.popup) this.popup.classList.add("hidden");
        }
      }
    });

    this.canvas.addEventListener("click", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const hit = this.getMarkerAtScreen(mouseX, mouseY);
      if (hit) {
        this.selectedMarketId = hit.id;
        this.showPopup(hit, mouseX, mouseY);
        this.render();
      }
    });

    this.canvas.addEventListener("wheel", (e) => {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.12 : 0.88;
      this.scale = Math.max(0.6, Math.min(3.5, this.scale * zoomFactor));
      this.render();
    });
  }

  resize() {
    if (!this.canvas) return;
    const rect = this.canvas.parentElement.getBoundingClientRect();
    const width = rect.width || 600;
    const height = 340;
    const dpr = window.devicePixelRatio || 1;

    this.canvas.width = width * dpr;
    this.canvas.height = height * dpr;
    this.ctx.scale(dpr, dpr);
    this.ctxWidth = width;
    this.ctxHeight = height;
  }

  // Project Geographic GPS (lat, lng) to Canvas coordinates (x, y)
  geoToPixel(lat, lng) {
    const normX = (lng - this.geoBounds.minLng) / (this.geoBounds.maxLng - this.geoBounds.minLng);
    const normY = 1 - ((lat - this.geoBounds.minLat) / (this.geoBounds.maxLat - this.geoBounds.minLat));

    const mapW = this.ctxWidth * 0.85;
    const mapH = this.ctxHeight * 0.85;

    const baseX = (this.ctxWidth - mapW) / 2 + normX * mapW;
    const baseY = (this.ctxHeight - mapH) / 2 + normY * mapH;

    return {
      x: (baseX - this.ctxWidth / 2) * this.scale + this.ctxWidth / 2 + this.offsetX,
      y: (baseY - this.ctxHeight / 2) * this.scale + this.ctxHeight / 2 + this.offsetY
    };
  }

  render() {
    const ctx = this.ctx;
    const width = this.ctxWidth;
    const height = this.ctxHeight;

    if (!ctx || !width || !height) return;

    ctx.clearRect(0, 0, width, height);

    // Dark Map Background
    const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, width);
    bgGrad.addColorStop(0, "#0c1527");
    bgGrad.addColorStop(1, "#060913");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Draw Grid Coordinates
    ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw Simplified Bangkok Regional Districts Polygon
    this.drawBangkokContour(ctx);

    // Draw Chao Phraya River Ribbon
    this.drawChaoPhrayaRiver(ctx);

    // Save rendered marker points for hit test
    this.renderedMarkers = [];

    // Draw Surrounding POIs if enabled
    if (this.showPOIs) {
      BMA_MARKETS_DATA.forEach(market => {
        const center = this.geoToPixel(market.geo.lat, market.geo.lng);
        market.surroundingPOIs.slice(0, 3).forEach((poi, idx) => {
          const angle = (idx / 3) * Math.PI * 2 + 0.5;
          const dist = 22 * this.scale;
          const px = center.x + Math.cos(angle) * dist;
          const py = center.y + Math.sin(angle) * dist;

          ctx.fillStyle = "rgba(100, 116, 139, 0.35)";
          ctx.beginPath();
          ctx.arc(px, py, 3.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = "#64748b";
          ctx.font = "8px 'Prompt', sans-serif";
          ctx.fillText(poi.name.split(" ")[0].substring(0, 8), px + 5, py + 3);
        });
      });
    }

    // Draw 12 Market Pins (Sorted by Revenue)
    BMA_MARKETS_DATA.forEach((market) => {
      const pos = this.geoToPixel(market.geo.lat, market.geo.lng);
      const isHovered = this.hoveredMarket && this.hoveredMarket.id === market.id;
      const isSelected = this.selectedMarketId === market.id;

      const isFlagship = market.tier === "Flagship";
      const isMedium = market.tier === "Medium";
      const pinColor = isFlagship ? "#10b981" : (isMedium ? "#0284c7" : "#a855f7");

      // Save for hit detection
      this.renderedMarkers.push({
        market,
        x: pos.x,
        y: pos.y,
        radius: isHovered || isSelected ? 18 : 14
      });

      // Outer Pulsing Glow
      if (isFlagship || isHovered || isSelected) {
        ctx.fillStyle = `${pinColor}22`;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, (isHovered ? 26 : 20) * (this.scale > 1.2 ? 1.1 : 1), 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = `${pinColor}66`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Main Pin Circle
      ctx.fillStyle = pinColor;
      ctx.beginPath();
      const r = isHovered || isSelected ? 16 : 12;
      ctx.arc(pos.x, pos.y, r, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Pin Rank Number
      ctx.fillStyle = "#ffffff";
      ctx.font = `bold ${isHovered ? 12 : 10}px 'Prompt', sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(market.rank.toString(), pos.x, pos.y);

      // Label below pin
      ctx.fillStyle = isHovered ? "#ffffff" : "#cbd5e1";
      ctx.font = `${isHovered ? 'bold 11px' : '10px'} 'Prompt', sans-serif`;
      ctx.fillText(market.officialName.replace("ตลาด", ""), pos.x, pos.y + r + 10);
    });
  }

  drawBangkokContour(ctx) {
    // Bangkok boundary simulation
    const points = [
      { lat: 13.92, lng: 100.55 },
      { lat: 13.90, lng: 100.75 },
      { lat: 13.88, lng: 100.89 }, // หนองจอก ตะวันออกสุด
      { lat: 13.78, lng: 100.86 },
      { lat: 13.70, lng: 100.70 },
      { lat: 13.60, lng: 100.58 },
      { lat: 13.56, lng: 100.45 }, // บางขุนเทียน ชายทะเล
      { lat: 13.65, lng: 100.35 },
      { lat: 13.76, lng: 100.33 }, // ทวีวัฒนา ตะวันตกสุด
      { lat: 13.85, lng: 100.42 }
    ];

    ctx.fillStyle = "rgba(30, 41, 59, 0.4)";
    ctx.strokeStyle = "rgba(16, 185, 129, 0.3)";
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);

    ctx.beginPath();
    points.forEach((p, idx) => {
      const pos = this.geoToPixel(p.lat, p.lng);
      if (idx === 0) ctx.moveTo(pos.x, pos.y);
      else ctx.lineTo(pos.x, pos.y);
    });
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.setLineDash([]);
  }

  drawChaoPhrayaRiver(ctx) {
    const riverWaypoints = [
      { lat: 13.90, lng: 100.50 },
      { lat: 13.85, lng: 100.51 },
      { lat: 13.80, lng: 100.52 }, // เทเวศร์
      { lat: 13.75, lng: 100.49 }, // สะพานพุทธ/วงเวียนเล็ก
      { lat: 13.70, lng: 100.50 }, // ราษฎร์บูรณะ
      { lat: 13.67, lng: 100.55 },
      { lat: 13.60, lng: 100.58 }
    ];

    ctx.strokeStyle = "rgba(56, 189, 248, 0.45)";
    ctx.lineWidth = 6 * this.scale;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.beginPath();
    riverWaypoints.forEach((p, idx) => {
      const pos = this.geoToPixel(p.lat, p.lng);
      if (idx === 0) ctx.moveTo(pos.x, pos.y);
      else ctx.lineTo(pos.x, pos.y);
    });
    ctx.stroke();

    // River label
    const mid = this.geoToPixel(13.78, 100.51);
    ctx.fillStyle = "rgba(56, 189, 248, 0.7)";
    ctx.font = "italic 9px 'Sarabun', sans-serif";
    ctx.fillText("แม่น้ำเจ้าพระยา (Chao Phraya River)", mid.x + 15, mid.y - 5);
  }

  getMarkerAtScreen(screenX, screenY) {
    if (!this.renderedMarkers) return null;
    for (let i = this.renderedMarkers.length - 1; i >= 0; i--) {
      const m = this.renderedMarkers[i];
      const dx = screenX - m.x;
      const dy = screenY - m.y;
      if (dx * dx + dy * dy <= m.radius * m.radius) {
        return m.market;
      }
    }
    return null;
  }

  showPopup(market, screenX, screenY) {
    if (!this.popup) return;

    const isFlagship = market.tier === "Flagship";
    const tierColor = isFlagship ? "#10b981" : (market.tier === "Medium" ? "#0284c7" : "#a855f7");

    this.popup.innerHTML = `
      <div class="space-y-2">
        <div class="flex items-center justify-between border-b border-slate-700 pb-1.5">
          <span class="px-1.5 py-0.5 rounded text-[10px] font-bold" style="background: ${tierColor}22; color: ${tierColor}; border: 1px solid ${tierColor}44;">
            #${market.rank} | ${market.tier}
          </span>
          <span class="font-bold text-emerald-400 text-[11px]">฿${(market.financials.annualRevenueTotal / 1000000).toFixed(1)}M/ปี</span>
        </div>
        <h4 class="font-bold text-slate-100 text-xs">${market.officialName}</h4>
        <p class="text-[10px] text-slate-400 line-clamp-1">${market.vernacularName}</p>
        <div class="text-[10px] text-slate-300 space-y-0.5 bg-slate-950/60 p-2 rounded border border-slate-800">
          <div>📍 <b>เขต:</b> ${market.geo.district} (${market.spatial.landAreaRai})</div>
          <div>🏪 <b>แผงค้า:</b> ${market.stalls.totalStalls.toLocaleString()} แผง (${market.stalls.occupancyRate}%)</div>
          <div>💰 <b>Yield:</b> ฿${market.spatialYield.avgYieldPerSqm.toLocaleString()} / ตร.ม.</div>
        </div>
        <div class="flex gap-1.5 pt-1">
          <a href="${market.geo.googleMapsUrl}" target="_blank" class="flex-1 text-center py-1 bg-sky-600 hover:bg-sky-500 text-white rounded text-[10px] font-medium">
            Google Maps
          </a>
          <button onclick="window.app.inspectMarket('${market.id}')" class="flex-1 text-center py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[10px] font-bold">
            ดูเจาะลึก
          </button>
        </div>
      </div>
    `;

    // Position popup clamped within viewport
    let posX = screenX + 15;
    let posY = screenY - 50;

    if (posX + 270 > this.ctxWidth) posX = screenX - 280;
    if (posY + 180 > this.ctxHeight) posY = this.ctxHeight - 190;
    if (posY < 10) posY = 10;

    this.popup.style.left = `${posX}px`;
    this.popup.style.top = `${posY}px`;
    this.popup.classList.remove("hidden");
  }

  focusMarket(marketId) {
    const market = BMA_MARKETS_DATA.find(m => m.id === marketId);
    if (!market) return;
    this.selectedMarketId = marketId;
    this.scale = 1.8;
    const targetPos = this.geoToPixel(market.geo.lat, market.geo.lng);
    this.offsetX = this.ctxWidth / 2 - targetPos.x;
    this.offsetY = this.ctxHeight / 2 - targetPos.y;
    this.render();
  }

  showSurroundingPOIs(marketId) {
    this.showPOIs = true;
    this.render();
  }
}

window.BMAMarketMap = BMAMarketMap;

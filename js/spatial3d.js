/**
 * BMA Market 3D Spatial Yield & Occupancy Engine
 * Interactive Isometric / 3D Canvas Visualizer with Heatmap Modes, Hover Inspection & Zone Drilldown
 */

class SpatialYieldEngine {
  constructor(canvasId, infoPanelId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    this.infoPanel = document.getElementById(infoPanelId);

    this.currentMarketId = "chatuchak";
    this.viewMode = "yield"; // "yield", "occupancy", "concession"
    this.filterQuery = "";

    // Camera & Transform state
    this.scale = 1.0;
    this.offsetX = 0;
    this.offsetY = 0;
    this.angle = 45 * (Math.PI / 180);
    this.pitch = 30 * (Math.PI / 180);

    this.isDragging = false;
    this.dragStartX = 0;
    this.dragStartY = 0;
    this.hoveredZone = null;
    this.selectedZone = null;

    this.initLayoutData();
    this.setupEventListeners();
    this.resizeCanvas();
    this.render();
  }

  initLayoutData() {
    // 3D Spatial Blocks layout definition for each market
    this.marketLayouts = {
      chatuchak: {
        title: "ตลาดนัดจตุจักร - แผนผังจำลองโครงสร้าง 3D & วิเคราะห์ Yield",
        gridSize: { cols: 8, rows: 6 },
        zones: [
          { id: "Z-A1", name: "Zone A1 (โครงการ 2-4: แฟชั่น & สตรีทแวร์)", x: 1, y: 1, w: 2, h: 2, height: 45, sqm: 18500, yieldPerSqm: 4850, occupancy: 98.2, stalls: 3650, concession: "Stall Regular", desc: "ศูนย์กลางแฟชั่นและเสื้อผ้าสำเร็จรูป Traffic หนาแน่นสูงสุด" },
          { id: "Z-B1", name: "Zone B1 (โครงการ 7-8: หัตถกรรม & เซรามิก)", x: 3, y: 1, w: 2, h: 2, height: 38, sqm: 14200, yieldPerSqm: 3920, occupancy: 94.5, stalls: 2150, concession: "Stall Regular", desc: "สินค้าคราฟต์ ของตกแต่งบ้าน และของที่ระลึกส่งออก" },
          { id: "Z-C1", name: "Zone C1 (โครงการ 1, 3, 4: ศูนย์อาหาร & เครื่องดื่ม)", x: 5, y: 1, w: 2, h: 2, height: 50, sqm: 12000, yieldPerSqm: 5600, occupancy: 99.0, stalls: 1420, concession: "Food Concession", desc: "ศูนย์รวมสตรีทฟู้ด ขนมหวาน เครื่องดื่ม และร้านอาหารตามสั่ง" },
          { id: "Z-D1", name: "Zone D1 (โครงการ 9, 11, 13: สัตว์เลี้ยง & อุปกรณ์)", x: 1, y: 3, w: 2, h: 2, height: 32, sqm: 10500, yieldPerSqm: 3200, occupancy: 92.0, stalls: 680, concession: "Stall Regular", desc: "โซนสัตว์เลี้ยง นก ปลา อุปกรณ์เลี้ยงและยาสัตว์" },
          { id: "Z-E1", name: "Zone E1 (โครงการ 22-26: ของเก่า & งานศิลปะ)", x: 3, y: 3, w: 2, h: 2, height: 35, sqm: 9800, yieldPerSqm: 3120, occupancy: 91.0, stalls: 850, concession: "Stall Regular", desc: "แกลเลอรี ภาพวาด ของสะสมโบราณ และหนังสือเก่า" },
          { id: "Z-F1", name: "Zone F1 (ลานต้นไม้ & สัมปทานกิจกรรม)", x: 5, y: 3, w: 2, h: 2, height: 25, sqm: 16000, yieldPerSqm: 2150, occupancy: 91.5, stalls: 980, concession: "Event Space", desc: "ตลาดนัดต้นไม้พุธ-พฤหัส และลานกิจกรรมโปรโมชันสุดสัปดาห์" },
          { id: "Z-HQ", name: "อาคารกองอำนวยการ & ศูนย์บริการนักท่องเที่ยว", x: 7, y: 1, w: 1, h: 2, height: 60, sqm: 4200, yieldPerSqm: 1800, occupancy: 100, stalls: 0, concession: "Admin BMA", desc: "สำนักงานตลาดจตุจักร ศูนย์ CCTV กองอำนวยการร่วม" },
          { id: "Z-PARK", name: "ลานจอดรถ e-Parking อัจฉริยะ (1,500 คัน)", x: 1, y: 5, w: 4, h: 1, height: 18, sqm: 14000, yieldPerSqm: 2320, occupancy: 94.0, stalls: 0, concession: "Parking Concession", desc: "สัมปทานเอกชน ระบบกล้อง LPR สแกนป้ายทะเบียนอัตโนมัติ" },
          { id: "Z-WC", name: "จุดบริการสุขามาตรฐาน HAS (8 จุด)", x: 5, y: 5, w: 2, h: 1, height: 22, sqm: 1500, yieldPerSqm: 9866, occupancy: 100, stalls: 0, concession: "Restroom Concession", desc: "สัมปทานเอกชนควบคุมความสะอาด 5 บาท/ครั้ง" }
        ]
      },
      thonburi: {
        title: "ตลาดธนบุรี (สนามหลวง 2) - ผัง 3D 110 ไร่ & วิเคราะห์ Yield",
        gridSize: { cols: 7, rows: 5 },
        zones: [
          { id: "TB-1", name: "โซน 1-2 (ตลาดไม้ดอก ไม้ประดับ & อุปกรณ์จัดสวน)", x: 1, y: 1, w: 3, h: 2, height: 35, sqm: 32000, yieldPerSqm: 920, occupancy: 93.0, stalls: 1450, concession: "Stall Regular", desc: "แหล่งจำหน่ายกล้วยไม้ ไม้ใบ แคคตัส ดินปลูก กระถาง ปุ๋ยอินทรีย์" },
          { id: "TB-2", name: "โซน 3 (ปลาสวยงาม สัตว์เลี้ยง & อุปกรณ์)", x: 4, y: 1, w: 2, h: 2, height: 38, sqm: 16000, yieldPerSqm: 1050, occupancy: 89.5, stalls: 720, concession: "Stall Regular", desc: "ศูนย์รวมปลาคาร์ฟ ปลาคัดเกรด นก สุนัข และอาหารสัตว์" },
          { id: "TB-3", name: "โซน 4 (ตลาดสด อาหารทะเล & ศูนย์อาหาร)", x: 1, y: 3, w: 2, h: 2, height: 42, sqm: 14000, yieldPerSqm: 1240, occupancy: 92.0, stalls: 680, concession: "Food & Fresh", desc: "อาหารทะเลสด ผักผลไม้ปลอดสาร และอาหารปรุงสำเร็จ" },
          { id: "TB-4", name: "โซน 5 (พระเครื่อง พระบูชา & วัตถุโบราณ)", x: 3, y: 3, w: 2, h: 2, height: 28, sqm: 12000, yieldPerSqm: 650, occupancy: 82.0, stalls: 480, concession: "Stall Regular", desc: "ศูนย์พระเครื่อง วัตถุมงคล และของเก่าสะสมฝั่งธนบุรี" },
          { id: "TB-5", name: "โซน 6 (เสื้อผ้า เบ็ดเตล็ด & สินค้าชุมชน)", x: 5, y: 3, w: 1, h: 2, height: 30, sqm: 8000, yieldPerSqm: 720, occupancy: 85.0, stalls: 520, concession: "Stall Regular", desc: "เสื้อผ้าแฟชั่น เครื่องประดับ และของใช้ในครัวเรือน" },
          { id: "TB-PARK", name: "ลานจอดรถใหญ่เชื่อมสวนทวีวนารมย์ (2,000 คัน)", x: 1, y: 5, w: 5, h: 1, height: 15, sqm: 24000, yieldPerSqm: 340, occupancy: 88.0, stalls: 0, concession: "Parking Concession", desc: "พื้นที่จอดรถกว้างขวาง ร่มรื่น มีไม้ใหญ่ล้อมรอบ" }
        ]
      },
      minburi: {
        title: "ตลาดนัดจตุจักร 2 (มีนบุรี) - ผัง 3D & Transit Hub",
        gridSize: { cols: 6, rows: 5 },
        zones: [
          { id: "MB-1", name: "อาคาร 1-2 (ตลาดสด & อาหารทะเลสด)", x: 1, y: 1, w: 2, h: 2, height: 42, sqm: 12500, yieldPerSqm: 1680, occupancy: 95.0, stalls: 980, concession: "Fresh Market", desc: "ตลาดสดค้าส่ง-ค้าปลีก เนื้อสัตว์ อาหารทะเลสด ผักผลไม้" },
          { id: "MB-2", name: "ศูนย์อาหารฮาลาล & สตรีทฟู้ดมีนบุรี", x: 3, y: 1, w: 2, h: 2, height: 45, sqm: 8500, yieldPerSqm: 1820, occupancy: 96.5, stalls: 580, concession: "Food Concession", desc: "ศูนย์รวมอาหารฮาลาลต้นตำรับ ข้าวหมกไก่ โรตีมะตะบะ ซุปหางวัว" },
          { id: "MB-3", name: "อาคาร 3 (เสื้อผ้า แฟชั่น & ของใช้ชุมชน)", x: 1, y: 3, w: 2, h: 2, height: 34, sqm: 7500, yieldPerSqm: 1150, occupancy: 88.0, stalls: 520, concession: "Stall Regular", desc: "เสื้อผ้ามุสลิม เครื่องแต่งกาย รองเท้า ของใช้ประจำวัน" },
          { id: "MB-4", name: "โซนต้นไม้ & สัตว์เลี้ยงมีนบุรี", x: 3, y: 3, w: 1, h: 2, height: 28, sqm: 4000, yieldPerSqm: 880, occupancy: 84.0, stalls: 320, concession: "Stall Regular", desc: "พันธุ์ไม้ผล ไม้ดอก สวนครัว และสัตว์เลี้ยง" },
          { id: "MB-HUB", name: "ลานจอดรถ & ทางเชื่อมรถไฟฟ้าสายสีชมพู", x: 4, y: 3, w: 2, h: 2, height: 22, sqm: 4000, yieldPerSqm: 720, occupancy: 92.0, stalls: 0, concession: "Transit Parking", desc: "เชื่อมต่อสถานีตลาดมีนบุรี (สายสีชมพู) และอู่รถเมล์ ขสมก." }
        ]
      },
      bangkapi: {
        title: "ตลาดบางกะปิ - ผัง 3D 24 ชม. & แยกลำสาลี Hub",
        gridSize: { cols: 6, rows: 4 },
        zones: [
          { id: "BK-1", name: "อาคารตลาดสด 24 ชม. (ค้าส่งเช้า/โต้รุ่งเย็น)", x: 1, y: 1, w: 3, h: 2, height: 48, sqm: 7500, yieldPerSqm: 1950, occupancy: 98.0, stalls: 900, concession: "Fresh Market 24H", desc: "ผักสด ผลไม้ เนื้อหมู ไก่ เป็ด อาหารทะเลส่งร้านอาหาร" },
          { id: "BK-2", name: "สตรีทฟู้ดหน้าตลาด & อาหารตามสั่ง", x: 4, y: 1, w: 2, h: 2, height: 44, sqm: 5200, yieldPerSqm: 1820, occupancy: 96.0, stalls: 260, concession: "Street Food", desc: "อาหารจานด่วน โต้รุ่ง เครื่องดื่ม รอบแยกลำสาลี" },
          { id: "BK-3", name: "ชั้น 2 เสื้อผ้า & เครื่องใช้ไฟฟ้า", x: 1, y: 3, w: 3, h: 1, height: 30, sqm: 3500, yieldPerSqm: 720, occupancy: 78.0, stalls: 180, concession: "Stall Regular", desc: "เสื้อผ้าราคาถูก เครื่องครัว ซ่อมโทรศัพท์" },
          { id: "BK-PARK", name: "ลานจอดรถ & จุดขนถ่ายสินค้าสายสีเหลือง", x: 4, y: 3, w: 2, h: 1, height: 20, sqm: 2000, yieldPerSqm: 550, occupancy: 92.0, stalls: 0, concession: "Parking Concession", desc: "ระบบไม้กั้นอัจฉริยะ ใกล้ MRT สายสีเหลืองบางกะปิ" }
        ]
      },
      prachanivet: {
        title: "ตลาดประชานิเวศน์ 1 - ผัง 3D อาคารโกลด์มาร์เก็ต",
        gridSize: { cols: 5, rows: 4 },
        zones: [
          { id: "PN-1", name: "ศูนย์อาหาร & เบเกอรี่พรีเมียม", x: 1, y: 1, w: 2, h: 2, height: 46, sqm: 5400, yieldPerSqm: 1850, occupancy: 97.0, stalls: 320, concession: "Food Hall", desc: "อาหารปรุงสำเร็จยอดนิยม อาหารเพื่อสุขภาพ เบเกอรี่ชาววัง" },
          { id: "PN-2", name: "ตลาดสด & ผักผลไม้ออร์แกนิก", x: 3, y: 1, w: 2, h: 2, height: 40, sqm: 4200, yieldPerSqm: 1450, occupancy: 95.0, stalls: 420, concession: "Fresh Premium", desc: "อาหารสดคุณภาพสูง โครงการหลวง ผักปลอดสารพิษ" },
          { id: "PN-HQ", name: "อาคารโกลด์มาร์เก็ต (สำนักงานตลาด กทม.)", x: 1, y: 3, w: 2, h: 1, height: 65, sqm: 3200, yieldPerSqm: 1600, occupancy: 92.0, stalls: 60, concession: "Commercial BMA", desc: "ที่ตั้งสำนักงานตลาด กทม. ชั้น 5 และร้านค้าพาณิชย์" },
          { id: "PN-PARK", name: "อาคารจอดรถ Smart Parking 2 ชั้น", x: 3, y: 3, w: 2, h: 1, height: 28, sqm: 2000, yieldPerSqm: 680, occupancy: 94.0, stalls: 0, concession: "Smart Parking", desc: "ระบบจอดรถกล้อง AI สแกนป้ายทะเบียน" }
        ]
      }
    };
  }

  setupEventListeners() {
    window.addEventListener("resize", () => {
      this.resizeCanvas();
      this.render();
    });

    this.canvas.addEventListener("mousedown", (e) => {
      this.isDragging = true;
      this.dragStartX = e.clientX;
      this.dragStartY = e.clientY;
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

      // Check hover
      const hit = this.getZoneAtScreen(mouseX, mouseY);
      if (hit !== this.hoveredZone) {
        this.hoveredZone = hit;
        this.canvas.style.cursor = hit ? "pointer" : "grab";
        this.render();
        if (hit) {
          this.renderHoverTooltip(hit, mouseX, mouseY);
        }
      }
    });

    this.canvas.addEventListener("click", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const hit = this.getZoneAtScreen(mouseX, mouseY);
      if (hit) {
        this.selectedZone = hit;
        this.render();
        this.showZoneDetail(hit);
      }
    });

    this.canvas.addEventListener("wheel", (e) => {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
      this.scale = Math.max(0.4, Math.min(2.5, this.scale * zoomFactor));
      this.render();
    });
  }

  resizeCanvas() {
    const parent = this.canvas.parentElement;
    if (!parent) return;
    const width = parent.clientWidth || 800;
    const height = 480;
    const dpr = window.devicePixelRatio || 1;

    this.canvas.width = width * dpr;
    this.canvas.height = height * dpr;
    this.canvas.style.width = width + "px";
    this.canvas.style.height = height + "px";
    this.ctx.scale(dpr, dpr);
    this.ctxWidth = width;
    this.ctxHeight = height;
  }

  setMarket(marketId) {
    this.currentMarketId = this.marketLayouts[marketId] ? marketId : "chatuchak";
    this.selectedZone = null;
    this.hoveredZone = null;
    this.offsetX = 0;
    this.offsetY = 0;
    this.scale = 1.0;
    this.render();
    if (this.infoPanel) {
      this.infoPanel.innerHTML = `<div class="p-4 text-center text-slate-400">คลิกที่บล็อก 3 มิติ เพื่อดูผลวิเคราะห์ Yield รายโซน</div>`;
    }
  }

  setViewMode(mode) {
    this.viewMode = mode;
    this.render();
  }

  setFilter(query) {
    this.filterQuery = (query || "").trim().toLowerCase();
    this.render();
  }

  resetCamera() {
    this.offsetX = 0;
    this.offsetY = 0;
    this.scale = 1.0;
    this.angle = 45 * (Math.PI / 180);
    this.pitch = 30 * (Math.PI / 180);
    this.render();
  }

  // Isometric Project: (x, y, z) -> screen (sx, sy)
  projectIso(x, y, z, originX, originY, tileW, tileH) {
    const isoX = (x - y) * Math.cos(this.pitch) * (tileW / 2);
    const isoY = (x + y) * Math.sin(this.pitch) * (tileH / 2) - z;
    return {
      x: originX + isoX,
      y: originY + isoY
    };
  }

  getZoneColor(zone) {
    if (this.viewMode === "yield") {
      // Color gradient by Yield/sqm (High = Emerald, Med = Amber, Low = Purple/Slate)
      const yieldVal = zone.yieldPerSqm;
      if (yieldVal >= 4000) return { top: "#059669", sideL: "#047857", sideR: "#065f46", text: "#ecfdf5", label: "Super Yield" };
      if (yieldVal >= 2500) return { top: "#10b981", sideL: "#059669", sideR: "#047857", text: "#f0fdf4", label: "High Yield" };
      if (yieldVal >= 1500) return { top: "#f59e0b", sideL: "#d97706", sideR: "#b45309", text: "#fffbeb", label: "Moderate Yield" };
      if (yieldVal >= 800) return { top: "#8b5cf6", sideL: "#7c3aed", sideR: "#6d28d9", text: "#f5f3ff", label: "Controlled Yield" };
      return { top: "#64748b", sideL: "#475569", sideR: "#334155", text: "#f8fafc", label: "Service Area" };
    } else if (this.viewMode === "occupancy") {
      const occ = zone.occupancy;
      if (occ >= 96) return { top: "#ef4444", sideL: "#dc2626", sideR: "#b91c1c", text: "#fef2f2", label: "High Density (>96%)" };
      if (occ >= 90) return { top: "#10b981", sideL: "#059669", sideR: "#047857", text: "#f0fdf4", label: "Optimal (90-95%)" };
      if (occ >= 80) return { top: "#3b82f6", sideL: "#2563eb", sideR: "#1d4ed8", text: "#eff6ff", label: "Normal (80-89%)" };
      return { top: "#94a3b8", sideL: "#64748b", sideR: "#475569", text: "#f8fafc", label: "Underutilized (<80%)" };
    } else {
      // Concession View
      const c = zone.concession;
      if (c.includes("Parking")) return { top: "#0284c7", sideL: "#0369a1", sideR: "#075985", text: "#f0f9ff", label: "Parking Concession" };
      if (c.includes("Restroom")) return { top: "#0d9488", sideL: "#0f766e", sideR: "#115e59", text: "#f0fdfa", label: "Restroom Concession" };
      if (c.includes("Food")) return { top: "#f97316", sideL: "#ea580c", sideR: "#c2410c", text: "#fff7ed", label: "Food Concession" };
      if (c.includes("Admin")) return { top: "#6366f1", sideL: "#4f46e5", sideR: "#4338ca", text: "#eef2ff", label: "BMA Admin Facility" };
      return { top: "#10b981", sideL: "#059669", sideR: "#047857", text: "#f0fdf4", label: "Stall Leased" };
    }
  }

  render() {
    const ctx = this.ctx;
    const width = this.ctxWidth;
    const height = this.ctxHeight;

    ctx.clearRect(0, 0, width, height);

    // Background grid & subtle gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, "#0f172a");
    bgGrad.addColorStop(1, "#1e293b");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Grid Floor
    ctx.save();
    ctx.translate(width / 2 + this.offsetX, height / 2 - 20 + this.offsetY);
    ctx.scale(this.scale, this.scale);

    const layout = this.marketLayouts[this.currentMarketId] || this.marketLayouts.chatuchak;
    const tileW = 76;
    const tileH = 44;
    const cols = layout.gridSize.cols;
    const rows = layout.gridSize.rows;

    const originX = 0;
    const originY = -50;

    // Draw Floor Grid
    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    ctx.lineWidth = 1;
    for (let c = 0; c <= cols; c++) {
      const p1 = this.projectIso(c, 0, 0, originX, originY, tileW, tileH);
      const p2 = this.projectIso(c, rows, 0, originX, originY, tileW, tileH);
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    }
    for (let r = 0; r <= rows; r++) {
      const p1 = this.projectIso(0, r, 0, originX, originY, tileW, tileH);
      const p2 = this.projectIso(cols, r, 0, originX, originY, tileW, tileH);
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    }

    // Sort zones by depth (x + y) so back blocks draw first
    const sortedZones = [...layout.zones].sort((a, b) => (a.x + a.y) - (b.x + b.y));

    // Save zone screen polygons for hit testing
    this.renderedPolygons = [];

    sortedZones.forEach((zone) => {
      const isFiltered = this.filterQuery && !zone.name.toLowerCase().includes(this.filterQuery) && !zone.desc.toLowerCase().includes(this.filterQuery);
      const isHovered = this.hoveredZone && this.hoveredZone.id === zone.id;
      const isSelected = this.selectedZone && this.selectedZone.id === zone.id;

      const colors = this.getZoneColor(zone);
      const lift = isHovered || isSelected ? 12 : 0;
      const h = zone.height + lift;

      const p0 = this.projectIso(zone.x, zone.y, 0, originX, originY, tileW, tileH);
      const p1 = this.projectIso(zone.x + zone.w, zone.y, 0, originX, originY, tileW, tileH);
      const p2 = this.projectIso(zone.x + zone.w, zone.y + zone.h, 0, originX, originY, tileW, tileH);
      const p3 = this.projectIso(zone.x, zone.y + zone.h, 0, originX, originY, tileW, tileH);

      const t0 = this.projectIso(zone.x, zone.y, h, originX, originY, tileW, tileH);
      const t1 = this.projectIso(zone.x + zone.w, zone.y, h, originX, originY, tileW, tileH);
      const t2 = this.projectIso(zone.x + zone.w, zone.y + zone.h, h, originX, originY, tileW, tileH);
      const t3 = this.projectIso(zone.x, zone.y + zone.h, h, originX, originY, tileW, tileH);

      // Save for hit detection (in local scale coordinates)
      this.renderedPolygons.push({
        zone,
        poly: [t0, t1, t2, t3, p2, p3]
      });

      const alpha = isFiltered ? 0.25 : 1.0;
      ctx.globalAlpha = alpha;

      // Draw Shadow
      ctx.fillStyle = "rgba(0, 0, 0, 0.45)";
      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
      ctx.lineTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.lineTo(p3.x, p3.y);
      ctx.closePath();
      ctx.fill();

      // Left Side (Face facing southwest: p3 -> p2 -> t2 -> t3)
      ctx.fillStyle = colors.sideL;
      ctx.beginPath();
      ctx.moveTo(p3.x, p3.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.lineTo(t2.x, t2.y);
      ctx.lineTo(t3.x, t3.y);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.15)";
      ctx.stroke();

      // Right Side (Face facing southeast: p2 -> p1 -> t1 -> t2)
      ctx.fillStyle = colors.sideR;
      ctx.beginPath();
      ctx.moveTo(p2.x, p2.y);
      ctx.lineTo(p1.x, p1.y);
      ctx.lineTo(t1.x, t1.y);
      ctx.lineTo(t2.x, t2.y);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.15)";
      ctx.stroke();

      // Top Face (t0 -> t1 -> t2 -> t3)
      ctx.fillStyle = isSelected ? "#38bdf8" : (isHovered ? "#34d399" : colors.top);
      ctx.beginPath();
      ctx.moveTo(t0.x, t0.y);
      ctx.lineTo(t1.x, t1.y);
      ctx.lineTo(t2.x, t2.y);
      ctx.lineTo(t3.x, t3.y);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = isSelected ? "#ffffff" : (isHovered ? "#fef08a" : "rgba(255,255,255,0.4)");
      ctx.lineWidth = isSelected || isHovered ? 2.5 : 1;
      ctx.stroke();

      // Draw Label & Metrics on Top Face
      const centerX = (t0.x + t1.x + t2.x + t3.x) / 4;
      const centerY = (t0.y + t1.y + t2.y + t3.y) / 4;

      ctx.fillStyle = colors.text;
      ctx.font = "bold 11px 'Prompt', 'Sarabun', sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const shortName = zone.name.split("(")[0].trim();
      ctx.fillText(shortName, centerX, centerY - 8);

      ctx.font = "10px 'Inter', 'Sarabun', sans-serif";
      if (this.viewMode === "yield") {
        ctx.fillText(`฿${zone.yieldPerSqm.toLocaleString()}/m²`, centerX, centerY + 8);
      } else if (this.viewMode === "occupancy") {
        ctx.fillText(`${zone.occupancy}% Occupied`, centerX, centerY + 8);
      } else {
        ctx.fillText(`${zone.stalls ? zone.stalls + " แผง" : zone.concession}`, centerX, centerY + 8);
      }

      ctx.globalAlpha = 1.0;
    });

    ctx.restore();

    // Render Overlay Legend
    this.renderLegend();
  }

  renderLegend() {
    const ctx = this.ctx;
    const x = 16;
    const y = 16;

    ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(x, y, 220, 105, 8);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#f8fafc";
    ctx.font = "bold 12px 'Prompt', sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";

    let title = "3D Mode: ";
    if (this.viewMode === "yield") title += "Yield ต่อ ตร.ม. (฿/m²)";
    else if (this.viewMode === "occupancy") title += "ความหนาแน่นเชิงสเปซ (Occupancy %)";
    else title += "ประเภทสัมปทาน / สิทธิการใช้พื้นที่";

    ctx.fillText(title, x + 10, y + 8);

    const legendItems = this.viewMode === "yield" ? [
      { color: "#059669", label: "> ฿4,000 / m² (Max Yield)" },
      { color: "#10b981", label: "฿2,500 - ฿4,000 / m² (High)" },
      { color: "#f59e0b", label: "฿1,500 - ฿2,500 / m² (Moderate)" },
      { color: "#8b5cf6", label: "< ฿1,500 / m² (Controlled)" }
    ] : this.viewMode === "occupancy" ? [
      { color: "#ef4444", label: "หนาแน่นสูงมาก (>96%)" },
      { color: "#10b981", label: "ความหนาแน่นเหมาะสม (90-95%)" },
      { color: "#3b82f6", label: "ปานกลาง (80-89%)" },
      { color: "#94a3b8", label: "มีพื้นที่ว่าง (<80%)" }
    ] : [
      { color: "#10b981", label: "แผงค้าปกติ กทม." },
      { color: "#f97316", label: "สัมปทานศูนย์อาหาร" },
      { color: "#0284c7", label: "สัมปทานที่จอดรถ" },
      { color: "#0d9488", label: "สัมปทานห้องน้ำ" }
    ];

    legendItems.forEach((item, idx) => {
      const iy = y + 32 + idx * 16;
      ctx.fillStyle = item.color;
      ctx.fillRect(x + 10, iy, 12, 10);
      ctx.fillStyle = "#cbd5e1";
      ctx.font = "11px 'Sarabun', sans-serif";
      ctx.fillText(item.label, x + 28, iy - 1);
    });
  }

  renderHoverTooltip(zone, mouseX, mouseY) {
    // We let the detail panel show or render dynamic tooltip
  }

  getZoneAtScreen(screenX, screenY) {
    if (!this.renderedPolygons) return null;

    // Convert screen coordinates back into local scaled space
    const localX = (screenX - (this.ctxWidth / 2 + this.offsetX)) / this.scale;
    const localY = (screenY - (this.ctxHeight / 2 - 20 + this.offsetY)) / this.scale;

    for (let i = this.renderedPolygons.length - 1; i >= 0; i--) {
      const item = this.renderedPolygons[i];
      if (this.isPointInPolygon({ x: localX, y: localY }, item.poly)) {
        return item.zone;
      }
    }
    return null;
  }

  isPointInPolygon(point, vs) {
    let x = point.x, y = point.y;
    let inside = false;
    for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      let xi = vs[i].x, yi = vs[i].y;
      let xj = vs[j].x, yj = vs[j].y;
      let intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  }

  showZoneDetail(zone) {
    if (!this.infoPanel) return;

    const colors = this.getZoneColor(zone);

    this.infoPanel.innerHTML = `
      <div class="space-y-4 animate-fadeIn">
        <div class="flex items-start justify-between border-b border-slate-700 pb-3">
          <div>
            <span class="inline-block px-2 py-0.5 text-xs font-semibold rounded" style="background-color: ${colors.top}22; color: ${colors.top}; border: 1px solid ${colors.top}">
              ${zone.id} | ${colors.label}
            </span>
            <h4 class="text-base font-bold text-slate-100 mt-1">${zone.name}</h4>
          </div>
        </div>

        <p class="text-xs text-slate-300 leading-relaxed bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/60">
          ${zone.desc}
        </p>

        <div class="grid grid-cols-2 gap-3 text-xs">
          <div class="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
            <span class="text-slate-400 block text-[11px]">Yield รายเดือน / ตร.ม.</span>
            <span class="text-base font-bold text-emerald-400">฿${zone.yieldPerSqm.toLocaleString()}</span>
            <span class="text-[10px] text-slate-400 block">บาท/ตร.ม./เดือน</span>
          </div>
          <div class="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
            <span class="text-slate-400 block text-[11px]">อัตราเช่าพื้นที่ (Occupancy)</span>
            <span class="text-base font-bold ${zone.occupancy >= 95 ? 'text-amber-400' : 'text-cyan-400'}">${zone.occupancy}%</span>
            <span class="text-[10px] text-slate-400 block">ของพื้นที่โซน</span>
          </div>
          <div class="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
            <span class="text-slate-400 block text-[11px]">ขนาดพื้นที่ทั้งหมด</span>
            <span class="text-sm font-bold text-slate-200">${zone.sqm.toLocaleString()} ตร.ม.</span>
          </div>
          <div class="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
            <span class="text-slate-400 block text-[11px]">จำนวนแผงค้าในโซน</span>
            <span class="text-sm font-bold text-slate-200">${zone.stalls ? zone.stalls.toLocaleString() + ' แผง' : 'พื้นที่บริการ'}</span>
          </div>
        </div>

        <div class="bg-slate-800/50 p-3 rounded-lg border border-slate-700 text-xs space-y-2">
          <div class="flex justify-between items-center text-[11px]">
            <span class="text-slate-400">ประเภทสัญญาสิทธิ:</span>
            <span class="font-medium text-slate-200">${zone.concession}</span>
          </div>
          <div class="flex justify-between items-center text-[11px]">
            <span class="text-slate-400">ประมาณการรายได้โซน:</span>
            <span class="font-bold text-emerald-400">฿${(zone.sqm * zone.yieldPerSqm).toLocaleString()} / เดือน</span>
          </div>
          <div class="flex justify-between items-center text-[11px]">
            <span class="text-slate-400">สถานะความหนาแน่น:</span>
            <span class="px-1.5 py-0.5 rounded text-[10px] ${zone.occupancy >= 95 ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'}">
              ${zone.occupancy >= 95 ? 'หนาแน่นสูงสุด (Peak Zone)' : 'คล่องตัว (Optimal)'}
            </span>
          </div>
        </div>
      </div>
    `;
  }
}

window.SpatialYieldEngine = SpatialYieldEngine;

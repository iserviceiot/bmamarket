/**
 * BMA Markets Comprehensive Dataset (สำนักงานตลาดกรุงเทพมหานคร)
 * Strictly sorted by Annual Revenue (Descending)
 * Covers all 12 official markets under BMA Market Office jurisdiction
 */

const BMA_MARKETS_DATA = [
  {
    id: "chatuchak",
    rank: 1,
    officialName: "ตลาดนัดจตุจักร",
    vernacularName: "ตลาดนัดจตุจักร / เจเจ (JJ Market) / ตลาดนัดสวนจตุจักร",
    tier: "Flagship",
    badgeColor: "success",
    geo: {
      lat: 13.7999,
      lng: 100.5505,
      district: "เขตจตุจักร",
      address: "ถนนกำแพงเพชร 2 แขวงจตุจักร เขตจตุจักร กรุงเทพฯ 10900",
      googleMapsUrl: "https://maps.google.com/?q=13.7999,100.5505",
      operatingHours: "พุธ-พฤหัส (ตลาดต้นไม้) 05:00-18:00 น. | ศุกร์ (ค้าส่ง) 18:00-24:00 น. | เสาร์-อาทิตย์ (ตลาดนัดทั่วไป) 09:00-18:00 น."
    },
    spatial: {
      landAreaRai: "68 ไร่ 1 งาน 88 ตารางวา",
      landAreaSqm: 109552,
      usableAreaSqm: 85200,
      buildingCount: 8,
      buildingDetails: "อาคารกองอำนวยการ 3 ชั้น, อาคารอเนกประสงค์, หอนาฬิกา, ซุ้มประตู 4 ด้าน, อาคารศูนย์บริการนักท่องเที่ยว",
      parkingCars: 1500,
      parkingMotorcycles: 2200,
      parkingConcession: "สัมปทานเอกชนจัดเก็บ (e-Parking)",
      restroomCount: 8,
      restroomCubicles: 142,
      vacantAreaSqm: 4500
    },
    surroundingPOIs: [
      { name: "สวนจตุจักร & สวนวชิรเบญจทัศ (สวนรถไฟ)", type: "park", distance: "0.1 กม." },
      { name: "สถานีกลางกรุงเทพอภิวัฒน์ (บางซื่อ)", type: "transit", distance: "1.2 กม." },
      { name: "BTS หมอชิต & MRT สวนจตุจักร/กำแพงเพชร", type: "transit", distance: "0.05 กม." },
      { name: "โรงพยาบาลเปาโล พหลโยธิน", type: "hospital", distance: "1.5 กม." },
      { name: "วัดไผ่ตัน", type: "temple", distance: "1.8 กม." },
      { name: "ศาลเจ้าพ่อเสือ จตุจักร", type: "shrine", distance: "0.4 กม." }
    ],
    stalls: {
      totalStalls: 10334,
      activeVendors: 9850,
      occupancyRate: 95.3,
      vendorDensityRatio: "1.15 ผู้ค้า/แผง (มีการแชร์ช่วงเวลา)",
      stallTypes: [
        { type: "เสื้อผ้าและเครื่องแต่งกายแฟชั่น (โครงการ 2-4, 12, 14, 16)", count: 3650, ratio: 35.3, rentDaily: 150, rentMonthly: 3600, rentPerSqm: 720 },
        { type: "หัตถกรรม ศิลปะ ของที่ระลึก (โครงการ 7-8, 22-26)", count: 2150, ratio: 20.8, rentDaily: 140, rentMonthly: 3360, rentPerSqm: 672 },
        { type: "อาหารปรุงสำเร็จ เครื่องดื่ม และของหวาน (โครงการ 1, 3, 4)", count: 1420, ratio: 13.7, rentDaily: 220, rentMonthly: 5280, rentPerSqm: 1056 },
        { type: "ของเก่า โบราณวัตถุ และของสะสม (โครงการ 26)", count: 850, ratio: 8.2, rentDaily: 130, rentMonthly: 3120, rentPerSqm: 624 },
        { type: "ต้นไม้และอุปกรณ์จัดสวน (พุธ-พฤหัส กลางวัน)", count: 980, ratio: 9.5, rentDaily: 110, rentMonthly: 2640, rentPerSqm: 528 },
        { type: "สัตว์เลี้ยงและอุปกรณ์ (โครงการ 9, 11, 13)", count: 680, ratio: 6.6, rentDaily: 160, rentMonthly: 3840, rentPerSqm: 768 },
        { type: "เบ็ดเตล็ด / สินค้าธงฟ้า / หนังสือ (โครงการ 1, 27)", count: 604, ratio: 5.9, rentDaily: 90, rentMonthly: 2160, rentPerSqm: 432 }
      ],
      blueFlagStalls: 45,
      buildingRentRates: "อาคารพาณิชย์ริมรั้ว 12,000 - 25,000 บาท/เดือน/คูหา"
    },
    subLeasing: {
      prevalence: "สูงมาก (ประมาณ 40-50% ของแผงค้าทั้งหมด)",
      model: "การโอนสิทธิครอบครองแฝง, สัญญาช่วยขาย, การเซ้งต่อรายเดือนระหว่างผู้ถือสิทธิเดิมกับผู้ค้ารายย่อยจริง",
      contractYears: "1-3 ปี (สัญญาของสำนักงานตลาดทำรอบละ 1-2 ปี)",
      currentPeriod: "1 ม.ค. 2567 - 31 ธ.ค. 2568 (กำลังปรับระบบสัญญาสมาร์ท)",
      areaRatioPercent: 42.5,
      estimatedSubleaseSpread: "ส่วนต่างค่าเช่าช่วง 15,000 - 35,000 บาท/แผง/เดือน (กทม. เก็บ 3,600 บาท)",
      policyRegulation: "จัดทำระบบสแกนใบหน้าและ QR ผู้ค้าประจำแผงเพื่อตัดวงจรนายหน้าเซ้งช่วง"
    },
    concessions: {
      parking: {
        operator: "บริษัท ควอลิตี้ พาร์คกิ้ง แมเนจเมนท์ จำกัด (สัญญาสัมปทาน)",
        durationYears: 3,
        startDate: "2024-04-01",
        endDate: "2027-03-31",
        annualRevenueShare: 32500000,
        terms: "ประกันรายได้ขั้นต่ำปีละ 30 ล้านบาท + ส่วนแบ่งกำไร 12% เกินเป้า ระบบกล้อง LPR สแกนป้ายทะเบียน"
      },
      restroom: {
        operator: "กิจการร่วมค้า บีเอ็มเอ คลีนนิ่ง เซอร์วิส จำกัด",
        durationYears: 3,
        startDate: "2024-01-01",
        endDate: "2026-12-31",
        annualRevenueShare: 14800000,
        terms: "คิดค่าบริการ 5 บาท/ครั้ง (ผู้พิการ/คนชราเข้าฟรี) ดูแลความสะอาดตามมาตรฐาน HAS ของ สธ."
      }
    },
    financials: {
      annualRevenueTotal: 385500000,
      annualExpenseTotal: 212400000,
      netProfit: 173100000,
      profitMarginPercent: 44.9,
      outstandingDebt: 18450000,
      revenueStreams: [
        { name: "ค่าเช่าแผงค้าและค่าธรรมเนียมสิทธิ", amount: 288400000, ratio: 74.8 },
        { name: "สัมปทานที่จอดรถ", amount: 32500000, ratio: 8.4 },
        { name: "สัมปทานห้องน้ำและบริการ", amount: 14800000, ratio: 3.8 },
        { name: "ค่าสาธารณูปโภค (ไฟฟ้า-ประปา)", amount: 31200000, ratio: 8.1 },
        { name: "ค่าป้ายโฆษณาและพื้นที่จัดกิจกรรมพิเศษ", amount: 18600000, ratio: 4.8 }
      ],
      expenseStreams: [
        { name: "ค่าจ้างเหมาทำความสะอาดและขนขยะ", amount: 54200000, ratio: 25.5 },
        { name: "ค่ารักษาความปลอดภัยและจราจร", amount: 42100000, ratio: 19.8 },
        { name: "ค่าบำรุงรักษาซ่อมแซมและวิศวกรรม", amount: 36800000, ratio: 17.3 },
        { name: "เงินเดือนและบุคลากรสำนักงานตลาด", amount: 48500000, ratio: 22.8 },
        { name: "ค่าน้ำประปา ไฟฟ้า สาธารณูปโภคหลัก", amount: 22800000, ratio: 10.7 },
        { name: "ค่าประกันภัยและสมทบกองทุน กทม.", amount: 8000000, ratio: 3.8 }
      ],
      historical: [
        { year: 2566, revenue: 325000000, expense: 195000000, profit: 130000000, margin: 40.0 },
        { year: 2567, revenue: 360000000, expense: 204000000, profit: 156000000, margin: 43.3 },
        { year: 2568, revenue: 385500000, expense: 212400000, profit: 173100000, margin: 44.9 },
        { year: 2569, revenue: 412000000, expense: 225000000, profit: 187000000, margin: 45.4, isCurrent: true },
        { year: 2570, revenue: 445000000, expense: 238000000, profit: 207000000, margin: 46.5, isForecast: true }
      ]
    },
    footfallDynamics: {
      weekdayAvg: 18500,
      weekendAvg: 220000,
      peakHours: "เสาร์-อาทิตย์ 13:00 - 17:30 น. (หนาแน่นสูงสุด 45,000 คน/ชม.)",
      events: "JJ Night Market ทุกคืนวันศุกร์-อาทิตย์, เทศกาลต้นไม้และพรรณไม้งามทุกสัปดาห์แรกของเดือน"
    },
    communityImpact: {
      vocationalTraining: "โครงการศูนย์ฝึกอาชีพจตุจักร (อบรมร้อยลูกปัด, งานคราฟต์, ชงกาแฟ, ต่อยอดสินค้า OTOP)",
      blueFlagDiscountPolicy: "โซนโครงการ 1 จัดแผงจำหน่ายสินค้าอุปโภคบริโภคราคาโรงงานและไข่ไก่/ข้าวสารธงฟ้า กทม."
    },
    itSystems: {
      systems: [
        "BMA Smart Stall RFID / QR Code บัตรผู้ค้าประจำแผง",
        "E-Payment Cross-Bank QR Payment สนับสนุนไร้เงินสด 92%",
        "ระบบกล้อง AI CCTV ตรวจจับความหนาแน่นและแจ้งเตือนมิจฉาชีพ 184 จุด",
        "IoT Smart Power Metering ตรวจวัดการใช้ไฟฟ้าและตัดไฟอัตโนมัติป้องกันไฟไหม้",
        "แอปพลิเคชัน JJ Guide Navigator สำหรับนักท่องเที่ยวชาวไทยและต่างชาติ"
      ]
    },
    wasteManagement: {
      solidWasteTonsPerDay: 48.5,
      sortingSystem: "แยก 4 ถัง: ขยะเปียก/อินทรีย์ (42%), ขยะรีไซเคิล (35%), ขยะทั่วไป (21%), ขยะอันตราย (2%)",
      destination: "สถานีขนถ่ายมูลฝอยสายไหม และโรงแปรรูปขยะอ่อนนุช (กทม.)",
      transportMethod: "รถอัดขยะ กทม. 10 ล้อ ขนาด 5 ตัน รอบขนถ่ายวันละ 8-12 เที่ยว (ช่วง 22:00 - 05:00 น.)",
      onsiteProcessing: "มีโรงปุ๋ยหมักชีวภาพขนาด 2 ตัน/วัน แปรรูปเศษผักและกากผลไม้แจกจ่ายสวนสาธารณะ กทม.",
      wastewaterGreaseTrap: "บ่อดักไขมันรวม 6 จุด กำลังบำบัดน้ำเสีย 1,200 ลบ.ม./วัน ก่อนระบายลงคลองบางซื่อ"
    },
    spatialYield: {
      avgYieldPerSqm: 3519,
      zones: [
        { name: "Zone A (โครงการ 2-4: แฟชั่น & สตรีทแวร์)", sqm: 18500, yieldPerSqm: 4850, occupancy: 98.2, status: "High Yield" },
        { name: "Zone B (โครงการ 7-8: หัตถกรรม & ศิลปะ)", sqm: 14200, yieldPerSqm: 3920, occupancy: 94.5, status: "High Yield" },
        { name: "Zone C (โครงการ 1, 3, 4: ศูนย์อาหารและเครื่องดื่ม)", sqm: 12000, yieldPerSqm: 5600, occupancy: 99.0, status: "Max Yield" },
        { name: "Zone D (โครงการ 9-13: สัตว์เลี้ยง & อุปกรณ์)", sqm: 10500, yieldPerSqm: 3200, occupancy: 92.0, status: "Moderate Yield" },
        { name: "Zone E (ลานเร่ & ตลาดต้นไม้)", sqm: 16000, yieldPerSqm: 2150, occupancy: 91.5, status: "Controlled Yield" },
        { name: "Zone F (ที่จอดรถและพื้นที่ส่วนกลาง)", sqm: 14000, yieldPerSqm: 1890, occupancy: 88.0, status: "Service Zone" }
      ]
    },
    swot: {
      strengths: "เป็น Landmark ตลาดนัดระดับโลก มีนักท่องเที่ยวต่างชาติมหาศาล แบรนด์แข็งแกร่ง มีระบบรถไฟฟ้า BTS/MRT ล้อมรอบ",
      weaknesses: "สภาพอากาศร้อนอบอ้าวในซอยย่อย การระบายอากาศไม่ดี โครงสร้างอาคารบางโซนเก่าทรุดโทรม และสัญญาซับซ้อน",
      urgentFixes: "ติดตั้งระบบพัดลมไอน้ำระบายอากาศแนวเพดาน, ปรับปรุงระบบท่อดับเพลิงและหัวฉีดอัตโนมัติป้องกันอัคคีภัย, แก้ไขการเซ้งช่วงผิดกฎหมาย",
      darkInfluenceTransparency: "มาตรการปราบปรามกลุ่มผู้มีอิทธิพลเก็บค่าคุ้มครอง/ค่าวิน/แผงลอยเถื่อนรอบรั้ว โดยบูรณาการตำรวจ สน.บางซื่อ และระบบบัตรดิจิทัลไม่ผ่านคนกลาง",
      vendorSellingPoints: "Traffic สูงที่สุดในอาเซียน มียอดซื้อต่อบิลสูง เหมาะสำหรับสินค้าแฟชั่นและงานคราฟต์ส่งออก",
      buyerSellingPoints: "มีสินค้าให้เลือกหลากหลายนับแสนรายการ มีเอกลักษณ์ มีจุดต่อรถไฟฟ้าสะดวกสบาย"
    }
  },
  {
    id: "thonburi",
    rank: 2,
    officialName: "ตลาดธนบุรี",
    vernacularName: "ตลาดธนบุรี / สนามหลวง 2 / ตลาดนัดฝั่งธน",
    tier: "Flagship",
    badgeColor: "success",
    geo: {
      lat: 13.7548,
      lng: 100.3475,
      district: "เขตทวีวัฒนา",
      address: "ถนนเลียบคลองทวีวัฒนา แขวงทวีวัฒนา เขตทวีวัฒนา กรุงเทพฯ 10170",
      googleMapsUrl: "https://maps.google.com/?q=13.7548,100.3475",
      operatingHours: "เปิดบริการทุกวัน 06:00 - 18:30 น. (คึกคักเป็นพิเศษ เสาร์-อาทิตย์)"
    },
    spatial: {
      landAreaRai: "110 ไร่",
      landAreaSqm: 176000,
      usableAreaSqm: 98000,
      buildingCount: 6,
      buildingDetails: "อาคารศูนย์จำหน่ายไม้ดอกไม้ประดับ 3 หลัง, อาคารตลาดสด 1 หลัง, อาคารพาณิชย์กึ่งถาวร 2 หลัง",
      parkingCars: 2000,
      parkingMotorcycles: 1500,
      parkingConcession: "สำนักงานตลาดจัดเก็บร่วมกับระบบสัมปทาน",
      restroomCount: 6,
      restroomCubicles: 96,
      vacantAreaSqm: 12000
    },
    surroundingPOIs: [
      { name: "สวนทวีวนารมย์ (สวนสาธารณะขนาดใหญ่ติดตลาด)", type: "park", distance: "0.05 กม." },
      { name: "มหาวิทยาลัยกรุงเทพธนบุรี", type: "education", distance: "2.1 กม." },
      { name: "วัดศาลาแดง", type: "temple", distance: "2.5 กม." },
      { name: "โรงพยาบาลราชพิพัฒน์", type: "hospital", distance: "3.2 กม." },
      { name: "ศาลเจ้าพ่อกวนอู ทวีวัฒนา", type: "shrine", distance: "1.4 กม." }
    ],
    stalls: {
      totalStalls: 3850,
      activeVendors: 3420,
      occupancyRate: 88.8,
      vendorDensityRatio: "1.08 ผู้ค้า/แผง",
      stallTypes: [
        { type: "ต้นไม้ ไม้ดอก ไม้ประดับ อุปกรณ์จัดสวน (โซน 1-2)", count: 1450, ratio: 37.7, rentDaily: 80, rentMonthly: 1920, rentPerSqm: 384 },
        { type: "สัตว์เลี้ยง ปลาสวยงาม นก สุนัข และอาหารสัตว์ (โซน 3)", count: 720, ratio: 18.7, rentDaily: 110, rentMonthly: 2640, rentPerSqm: 528 },
        { type: "ตลาดสด อาหารทะเลสด ผักผลไม้ปลอดสาร (โซน 4)", count: 680, ratio: 17.7, rentDaily: 100, rentMonthly: 2400, rentPerSqm: 480 },
        { type: "พระเครื่อง พระบูชา วัตถุมงคล ของเก่า (โซน 5)", count: 480, ratio: 12.5, rentDaily: 70, rentMonthly: 1680, rentPerSqm: 336 },
        { type: "เสื้อผ้า อาหารปรุงสำเร็จ เบ็ดเตล็ด (โซน 6)", count: 520, ratio: 13.5, rentDaily: 90, rentMonthly: 2160, rentPerSqm: 432 }
      ],
      blueFlagStalls: 30,
      buildingRentRates: "อาคารพาณิชย์ 6,500 - 12,000 บาท/เดือน/คูหา"
    },
    subLeasing: {
      prevalence: "ปานกลาง (ประมาณ 22% ของแผงค้า)",
      model: "การปล่อยเช่าต่อให้กลุ่มเพาะพันธุ์ไม้และฟาร์มปลาสวยงาม",
      contractYears: "1-2 ปี",
      currentPeriod: "1 มี.ค. 2567 - 28 ก.พ. 2569",
      areaRatioPercent: 20.4,
      estimatedSubleaseSpread: "ส่วนต่าง 5,000 - 10,000 บาท/แผง/เดือน",
      policyRegulation: "ลงทะเบียนฐานข้อมูลแปลงเพาะชำตรงกับเกษตรกรผู้ผลิต"
    },
    concessions: {
      parking: {
        operator: "บริษัท ธนบุรีพัฒนาพาร์คเกอร์ จำกัด",
        durationYears: 2,
        startDate: "2024-05-01",
        endDate: "2026-04-30",
        annualRevenueShare: 8200000,
        terms: "จัดเก็บค่าจอดรถ 20 บาทตลอดวันสำหรับวันธรรมดา และระบบบัตรจอดรถอัจฉริยะ"
      },
      restroom: {
        operator: "หจก. ทวีวัฒนาสุขาภิบาล",
        durationYears: 3,
        startDate: "2023-10-01",
        endDate: "2026-09-30",
        annualRevenueShare: 3400000,
        terms: "ค่าบริการ 3-5 บาท/ครั้ง ปรับปรุงระบบสุขภัณฑ์ประหยัดน้ำและแยกห้องน้ำผู้สูงอายุ"
      }
    },
    financials: {
      annualRevenueTotal: 68400000,
      annualExpenseTotal: 42800000,
      netProfit: 25600000,
      profitMarginPercent: 37.4,
      outstandingDebt: 4200000,
      revenueStreams: [
        { name: "ค่าเช่าแผงค้าต้นไม้/สัตว์เลี้ยง/สด", amount: 48600000, ratio: 71.1 },
        { name: "สัมปทานที่จอดรถ", amount: 8200000, ratio: 12.0 },
        { name: "สัมปทานห้องน้ำ", amount: 3400000, ratio: 5.0 },
        { name: "ค่าสาธารณูปโภค", amount: 5600000, ratio: 8.2 },
        { name: "ค่าพื้นที่อีเวนต์และลานกิจกรรม", amount: 2600000, ratio: 3.8 }
      ],
      expenseStreams: [
        { name: "ค่าทำความสะอาดและกำจัดเศษอินทรีย์", amount: 12800000, ratio: 29.9 },
        { name: "ค่า รปภ. และจราจรบนพื้นที่ 110 ไร่", amount: 10500000, ratio: 24.5 },
        { name: "ค่าซ่อมบำรุงทางเท้าและหลังคา", amount: 7800000, ratio: 18.2 },
        { name: "เงินเดือนเจ้าหน้าที่ประจำตลาด", amount: 8200000, ratio: 19.2 },
        { name: "ค่าน้ำ-ไฟ และไฟส่องสว่างลานจอด", amount: 3500000, ratio: 8.2 }
      ],
      historical: [
        { year: 2566, revenue: 58000000, expense: 38500000, profit: 19500000, margin: 33.6 },
        { year: 2567, revenue: 63500000, expense: 40800000, profit: 22700000, margin: 35.7 },
        { year: 2568, revenue: 68400000, expense: 42800000, profit: 25600000, margin: 37.4 },
        { year: 2569, revenue: 74000000, expense: 45000000, profit: 29000000, margin: 39.2, isCurrent: true },
        { year: 2570, revenue: 80500000, expense: 47500000, profit: 33000000, margin: 41.0, isForecast: true }
      ]
    },
    footfallDynamics: {
      weekdayAvg: 8500,
      weekendAvg: 65000,
      peakHours: "เสาร์-อาทิตย์ 08:30 - 15:00 น.",
      events: "มหกรรมประกวดกล้วยไม้และปลาคาร์ฟประจำปี, เทศกาลอาหารฝั่งธนบุรีทุกปลายเดือน"
    },
    communityImpact: {
      vocationalTraining: "โครงการเพาะเลี้ยงเนื้อเยื่อพืช, ขยายพันธุ์แคคตัส และการเพาะปลูกผักไฮโดรโปนิกส์",
      blueFlagDiscountPolicy: "โซนตลาดสดมีร้านธงฟ้าจำหน่ายเนื้อหมู ไก่ ไข่ไก่ ราคาต่ำกว่าท้องตลาด 15-20%"
    },
    itSystems: {
      systems: [
        "BMA Smart Stall System ทะเบียนผู้ค้าพันธุ์ไม้และสัตว์เลี้ยง",
        "E-Payment PromptPay QR ครอบคลุม 85%",
        "ระบบกล้อง CCTV ตรวจตราบริเวณลานจอดรถและแนวสวน 72 จุด",
        "แอปพลิเคชันแนะนำร้านต้นไม้และระบบสั่งจองต้นไม้ล่วงหน้า"
      ]
    },
    wasteManagement: {
      solidWasteTonsPerDay: 18.2,
      sortingSystem: "เน้นคัดแยกขยะอินทรีย์ กิ่งไม้ ใบไม้ เปลือกผลไม้ (คิดเป็น 65% ของขยะทั้งหมด)",
      destination: "โรงกำจัดมูลฝอยหนองแขม (กทม.)",
      transportMethod: "รถบรรทุกขยะ กทม. ขนถ่ายวันละ 3-4 เที่ยว",
      onsiteProcessing: "ศูนย์แปรรูปปุ๋ยอินทรีย์ชีวภาพและดินปลูกต้นไม้ ผลิตได้ 3.5 ตัน/วัน หมุนเวียนใช้ในสวนทวีวนารมย์",
      wastewaterGreaseTrap: "บ่อดักไขมันและระบบบำบัดน้ำเสียแบบบึงประดิษฐ์ (Constructed Wetland) 800 ลบ.ม./วัน"
    },
    spatialYield: {
      avgYieldPerSqm: 698,
      zones: [
        { name: "Zone 1 (ตลาดไม้ดอกไม้ประดับ)", sqm: 32000, yieldPerSqm: 920, occupancy: 93.0, status: "High Yield" },
        { name: "Zone 2 (สัตว์เลี้ยง ปลาสวยงาม)", sqm: 16000, yieldPerSqm: 1050, occupancy: 89.5, status: "High Yield" },
        { name: "Zone 3 (ตลาดสดและอาหารสำเร็จ)", sqm: 14000, yieldPerSqm: 1240, occupancy: 92.0, status: "Max Yield" },
        { name: "Zone 4 (พระเครื่องและของสะสม)", sqm: 12000, yieldPerSqm: 650, occupancy: 82.0, status: "Moderate Yield" },
        { name: "Zone 5 (ลานจอดรถและสวนสาธารณะเชื่อมต่อ)", sqm: 24000, yieldPerSqm: 340, occupancy: 85.0, status: "Service Zone" }
      ]
    },
    swot: {
      strengths: "พื้นที่กว้างขวางถึง 110 ไร่ บรรยากาศร่มรื่น ติดสวนทวีวนารมย์ เป็นศูนย์รวมต้นไม้สัตว์เลี้ยงใหญ่ที่สุดฝั่งธนบุรี",
      weaknesses: "การเดินทางด้วยระบบขนส่งมวลชนสาธารณะยังไม่ทั่วถึง (ต้องพึ่งพารถยนต์ส่วนตัว/สองแถว)",
      urgentFixes: "ปรับปรุงถนนทางเข้าเลียบคลองทวีวัฒนา ขยายจุดจอดรถสองแถวรับส่ง และติดตั้งโซลาร์รูฟท็อปบนหลังคาอาคารตลาดสด",
      darkInfluenceTransparency: "ควบคุมระเบียบการตั้งเต็นท์เร่ภายนอกพื้นที่ให้เข้าสู่ระบบอย่างถูกระเบียบ ไร้ส่วยทางเท้า",
      vendorSellingPoints: "ค่าเช่าถูกเมื่อเทียบกับขนาดพื้นที่ มีกลุ่มลูกค้าครอบครัวและคนรักต้นไม้กำลังซื้อสูง",
      buyerSellingPoints: "ที่จอดรถสะดวก บรรยากาศโปร่งสบายเหมือนเดินในสวน ซื้อต้นไม้และสัตว์เลี้ยงได้ครบวงจร"
    }
  },
  {
    id: "minburi",
    rank: 3,
    officialName: "ตลาดนัดจตุจักร 2 (มีนบุรี)",
    vernacularName: "ตลาดมีนบุรี / ตลาดมีน / จตุจักร 2 มีนบุรี",
    tier: "Flagship",
    badgeColor: "success",
    geo: {
      lat: 13.8138,
      lng: 100.7225,
      district: "เขตมีนบุรี",
      address: "ถนนสีหบุรานุกิจ แขวงมีนบุรี เขตมีนบุรี กรุงเทพฯ 10510",
      googleMapsUrl: "https://maps.google.com/?q=13.8138,100.7225",
      operatingHours: "เปิดบริการทุกวัน 06:00 - 19:00 น. (ตลาดนัดใหญ่ เสาร์-อาทิตย์)"
    },
    spatial: {
      landAreaRai: "30 ไร่ 2 งาน",
      landAreaSqm: 48800,
      usableAreaSqm: 36500,
      buildingCount: 4,
      buildingDetails: "อาคารตลาดสดมีนบุรี 2 หลัง, อาคารโดมเอนกประสงค์ 1 หลัง, อาคารสำนักงานตลาด 2 ชั้น",
      parkingCars: 650,
      parkingMotorcycles: 1200,
      parkingConcession: "สัมปทานเอกชนบริหารลานจอด",
      restroomCount: 4,
      restroomCubicles: 58,
      vacantAreaSqm: 2800
    },
    surroundingPOIs: [
      { name: "สถานีรถไฟฟ้าสายสีชมพู (สถานีตลาดมีนบุรี)", type: "transit", distance: "0.1 กม." },
      { name: "ศาลจังหวัดมีนบุรี & สำนักงานเขตมีนบุรี", type: "gov", distance: "0.6 กม." },
      { name: "มัสยิดฮิดาย่าตุ้ลอิสลามียะฮ์", type: "mosque", distance: "0.8 กม." },
      { name: "วัดบำเพ็ญเหนือ & วัดบางเพ็งใต้ (ตลาดน้ำขวัญเรียม)", type: "temple", distance: "2.3 กม." },
      { name: "โรงพยาบาลนวมินทร์ 9 & รพ.เสรีรักษ์", type: "hospital", distance: "0.9 กม." },
      { name: "สวนเฉลิมพระเกียรติ ร.9 มีนบุรี", type: "park", distance: "1.1 กม." }
    ],
    stalls: {
      totalStalls: 2650,
      activeVendors: 2420,
      occupancyRate: 91.3,
      vendorDensityRatio: "1.10 ผู้ค้า/แผง",
      stallTypes: [
        { type: "ตลาดสด เนื้อสัตว์ ผัก ผลไม้ อาหารทะเล (อาคาร 1-2)", count: 980, ratio: 37.0, rentDaily: 90, rentMonthly: 2160, rentPerSqm: 540 },
        { type: "อาหารปรุงสำเร็จ อาหารฮาลาล ของหวาน (โซนกลาง)", count: 580, ratio: 21.9, rentDaily: 120, rentMonthly: 2880, rentPerSqm: 720 },
        { type: "เสื้อผ้า เครื่องแต่งกาย รองเท้า (อาคาร 3)", count: 520, ratio: 19.6, rentDaily: 85, rentMonthly: 2040, rentPerSqm: 510 },
        { type: "ต้นไม้ พืชผักสวนครัว สัตว์เลี้ยง (โซนเปิดโล่ง)", count: 320, ratio: 12.1, rentDaily: 75, rentMonthly: 1800, rentPerSqm: 450 },
        { type: "เบ็ดเตล็ด สินค้าธงฟ้า สินค้าชุมชนมีนบุรี", count: 250, ratio: 9.4, rentDaily: 60, rentMonthly: 1440, rentPerSqm: 360 }
      ],
      blueFlagStalls: 25,
      buildingRentRates: "อาคารพาณิชย์ 8,000 - 15,000 บาท/เดือน/คูหา"
    },
    subLeasing: {
      prevalence: "ปานกลาง (ประมาณ 28% ของแผงค้า)",
      model: "การให้เช่าช่วงในกลุ่มโซนเสื้อผ้าและอาหารปรุงสำเร็จ",
      contractYears: "1-2 ปี",
      currentPeriod: "1 ม.ค. 2567 - 31 ธ.ค. 2568",
      areaRatioPercent: 25.0,
      estimatedSubleaseSpread: "ส่วนต่าง 6,000 - 14,000 บาท/แผง/เดือน",
      policyRegulation: "จัดจุด One-stop Service เพื่อให้ผู้ค้าตัวจริงเปลี่ยนชื่อในสัญญาได้ตรงไปตรงมา"
    },
    concessions: {
      parking: {
        operator: "หจก. มีนบุรีปาร์คกิ้ง แอนด์ เซอร์วิส",
        durationYears: 3,
        startDate: "2023-11-01",
        endDate: "2026-10-31",
        annualRevenueShare: 5800000,
        terms: "ประกันรายได้ขั้นต่ำ มีระบบกล้องวงจรปิดครอบคลุม 100%"
      },
      restroom: {
        operator: "บริษัท สะอาดดี มีนบุรี จำกัด",
        durationYears: 2,
        startDate: "2024-02-01",
        endDate: "2026-01-31",
        annualRevenueShare: 2200000,
        terms: "ค่าบริการ 3 บาท มีห้องน้ำฮาลาลและแยกห้องน้ำตามหลักสุขอนามัย"
      }
    },
    financials: {
      annualRevenueTotal: 46200000,
      annualExpenseTotal: 29800000,
      netProfit: 16400000,
      profitMarginPercent: 35.5,
      outstandingDebt: 3100000,
      revenueStreams: [
        { name: "ค่าเช่าแผงค้าและค่าทำเนียม", amount: 33400000, ratio: 72.3 },
        { name: "สัมปทานที่จอดรถ", amount: 5800000, ratio: 12.6 },
        { name: "สัมปทานห้องน้ำ", amount: 2200000, ratio: 4.8 },
        { name: "ค่าสาธารณูปโภค", amount: 3600000, ratio: 7.8 },
        { name: "ค่าพื้นที่ประชาสัมพันธ์/โฆษณา", amount: 1200000, ratio: 2.5 }
      ],
      expenseStreams: [
        { name: "ค่าทำความสะอาดตลาดสดและขนขยะ", amount: 8900000, ratio: 29.9 },
        { name: "ค่า รปภ. และบริหารจราจร", amount: 6800000, ratio: 22.8 },
        { name: "ค่าบำรุงรักษาอาคารและระบบน้ำทิ้ง", amount: 5400000, ratio: 18.1 },
        { name: "เงินเดือนบุคลากรและเจ้าหน้าที่", amount: 6200000, ratio: 20.8 },
        { name: "ค่าไฟส่องสว่างและสาธารณูปโภค", amount: 2500000, ratio: 8.4 }
      ],
      historical: [
        { year: 2566, revenue: 38000000, expense: 26000000, profit: 12000000, margin: 31.6 },
        { year: 2567, revenue: 42500000, expense: 28100000, profit: 14400000, margin: 33.9 },
        { year: 2568, revenue: 46200000, expense: 29800000, profit: 16400000, margin: 35.5 },
        { year: 2569, revenue: 51000000, expense: 31500000, profit: 19500000, margin: 38.2, isCurrent: true },
        { year: 2570, revenue: 56000000, expense: 33000000, profit: 23000000, margin: 41.1, isForecast: true }
      ]
    },
    footfallDynamics: {
      weekdayAvg: 16000,
      weekendAvg: 48000,
      peakHours: "ทุกวัน 06:00 - 09:30 น. (ตลาดเช้า) และ 16:00 - 19:00 น.",
      events: "ตลาดนัดวัฒนธรรมไทย-มุสลิมมีนบุรี, เทศกาลอาหารปลอดภัย กทม."
    },
    communityImpact: {
      vocationalTraining: "โครงการฝึกอบรมการทำอาหารฮาลาลเพื่อการส่งออก, การแปรรูปเนื้อสัตว์ และการตลาดออนไลน์",
      blueFlagDiscountPolicy: "จุดจำหน่ายสินค้าธงฟ้าและสินค้าสหกรณ์การเกษตรมีนบุรี-หนองจอก"
    },
    itSystems: {
      systems: [
        "BMA Smart Stall Payment รองรับแม่มณีและ Thai QR 88%",
        "ระบบเชื่อมโยงตั๋วโดยสารร่วม รถไฟฟ้าสายสีชมพู (สถานีตลาดมีนบุรี)",
        "กล้อง CCTV AI ตรวจจับทะเบียนรถและเฝ้าระวัง 48 จุด",
        "หน้าจอ LED แสดงราคากลางสินค้าเกษตรและเนื้อสัตว์ประจำวัน"
      ]
    },
    wasteManagement: {
      solidWasteTonsPerDay: 14.8,
      sortingSystem: "คัดแยกเศษเนื้อสัตว์ เครื่องในสัตว์ เปลือกกุ้ง-ปลา และผักผลไม้ (ขยะอินทรีย์ 62%)",
      destination: "สถานีขนถ่ายมูลฝอยสายไหม (กทม.)",
      transportMethod: "รถขยะ กทม. ขนถ่ายวันละ 3 รอบ (04:00, 13:00, 21:00 น.)",
      onsiteProcessing: "บ่อหมักก๊าซชีวภาพและจุลินทรีย์ EM ดับกลิ่นตลาดสด",
      wastewaterGreaseTrap: "บ่อดักไขมันขนาดใหญ่ 4 บ่อ พร้อมระบบเติมอากาศ Aerated Lagoon ก่อนระบายสู่คลองแสนแสบ"
    },
    spatialYield: {
      avgYieldPerSqm: 1265,
      zones: [
        { name: "Zone 1 (ตลาดสดและอาหารทะเล)", sqm: 12500, yieldPerSqm: 1680, occupancy: 95.0, status: "Max Yield" },
        { name: "Zone 2 (ศูนย์อาหารฮาลาลและสตรีทฟู้ด)", sqm: 8500, yieldPerSqm: 1820, occupancy: 96.5, status: "Max Yield" },
        { name: "Zone 3 (เสื้อผ้า แฟชั่น และของใช้)", sqm: 7500, yieldPerSqm: 1150, occupancy: 88.0, status: "High Yield" },
        { name: "Zone 4 (ต้นไม้และสัตว์เลี้ยง)", sqm: 4000, yieldPerSqm: 880, occupancy: 84.0, status: "Moderate Yield" },
        { name: "Zone 5 (ลานจอดรถและทางเชื่อมรถไฟฟ้า)", sqm: 4000, yieldPerSqm: 720, occupancy: 90.0, status: "Service Zone" }
      ]
    },
    swot: {
      strengths: "เป็น Hub ชุมทางสำคัญของกรุงเทพฯ ฝั่งตะวันออก เชื่อมต่อรถไฟฟ้าสายสีชมพูและอู่รถเมล์ มีอัตลักษณ์อาหารฮาลาลโดดเด่น",
      weaknesses: "สภาพการจราจรหน้าตลาดถนนสีหบุรานุกิจหนาแน่น มีน้ำท่วมขังขอบทางเท้าเวลาฝนตกหนัก",
      urgentFixes: "ยกระดับระบบระบายน้ำรอบตลาดสด ปรับปรุงทางเดิน Skywalk จากสถานีรถไฟฟ้าตลาดมีนบุรีตรงเข้าสู่ตลาด",
      darkInfluenceTransparency: "จัดระเบียบกลุ่มรถแท็กซี่และวินมอเตอร์ไซค์รับจ้าง ไม่ให้มีการเรียกเก็บผลประโยชน์ผิดกฎหมาย",
      vendorSellingPoints: "มีผู้คนสัญจรผ่านตลอดทั้งวันเนื่องจากเป็นจุดต่อรถประจำทางและรถไฟฟ้า กลุ่มลูกค้ามีกำลังซื้อสม่ำเสมอ",
      buyerSellingPoints: "สินค้าสด คุณภาพดี ราคาเป็นมิตร มีอาหารฮาลาลและของพื้นถิ่นหลากหลาย เดินทางง่ายด้วยรถไฟฟ้า"
    }
  },
  {
    id: "bangkapi",
    rank: 4,
    officialName: "ตลาดบางกะปิ",
    vernacularName: "ตลาดบางกะปิ / ตลาดสดบางกะปิ / ตลาดนวมินทร์-ลาดพร้าว",
    tier: "Medium",
    badgeColor: "primary",
    geo: {
      lat: 13.7667,
      lng: 100.6433,
      district: "เขตบางกะปิ",
      address: "ถนนลาดพร้าว แขวงคลองจั่น เขตบางกะปิ กรุงเทพฯ 10240",
      googleMapsUrl: "https://maps.google.com/?q=13.7667,100.6433",
      operatingHours: "เปิดบริการ 24 ชั่วโมง (ผลัดกลางวัน 05:00-18:00 น. | ผลัดโต้รุ่ง/ค้าส่ง 18:00-05:00 น.)"
    },
    spatial: {
      landAreaRai: "14 ไร่ 3 งาน",
      landAreaSqm: 23600,
      usableAreaSqm: 18200,
      buildingCount: 3,
      buildingDetails: "อาคารตลาดสดโครงสร้างเหล็ก 2 ชั้น 1 หลัง, อาคารพาณิชย์รายล้อม 2 หลัง",
      parkingCars: 280,
      parkingMotorcycles: 600,
      parkingConcession: "สัมปทานเอกชนดูแลระบบไม้กั้น",
      restroomCount: 3,
      restroomCubicles: 38,
      vacantAreaSqm: 1200
    },
    surroundingPOIs: [
      { name: "สถานีรถไฟฟ้าสายสีเหลือง (สถานีบางกะปิ)", type: "transit", distance: "0.2 กม." },
      { name: "เดอะมอลล์ไลฟ์สโตร์ บางกะปิ", type: "mall", distance: "0.4 กม." },
      { name: "ท่าเรือคลองแสนแสบ (ท่าวัดศรีบุญเรือง)", type: "transit", distance: "0.5 กม." },
      { name: "วัดบึงทองหลาง & วัดศรีบุญเรือง", type: "temple", distance: "0.9 กม." },
      { name: "โรงพยาบาลเวชธานี & รพ.ลาดพร้าว", type: "hospital", distance: "1.2 กม." },
      { name: "สวนนวมินทร์ภิรมย์", type: "park", distance: "1.6 กม." }
    ],
    stalls: {
      totalStalls: 1450,
      activeVendors: 1380,
      occupancyRate: 95.2,
      vendorDensityRatio: "1.30 ผู้ค้า/แผง (มีการสลับกะ 24 ชม.)",
      stallTypes: [
        { type: "ผักสด ผลไม้ วัตถุดิบประกอบอาหาร (ค้าส่งและปลีก)", count: 520, ratio: 35.9, rentDaily: 110, rentMonthly: 2640, rentPerSqm: 660 },
        { type: "เนื้อหมู ไก่ เป็ด อาหารทะเลสด (โซนเปียก)", count: 380, ratio: 26.2, rentDaily: 130, rentMonthly: 3120, rentPerSqm: 780 },
        { type: "อาหารปรุงสำเร็จ อาหารตามสั่ง โต้รุ่ง (โซนหน้าตลาด)", count: 260, ratio: 17.9, rentDaily: 140, rentMonthly: 3360, rentPerSqm: 840 },
        { type: "เสื้อผ้า ของใช้ในครัวเรือน เครื่องใช้ไฟฟ้า (ชั้น 2)", count: 180, ratio: 12.4, rentDaily: 70, rentMonthly: 1680, rentPerSqm: 420 },
        { type: "สินค้าธงฟ้า ข้าวสาร น้ำมันพืช ของชำ", count: 110, ratio: 7.6, rentDaily: 65, rentMonthly: 1560, rentPerSqm: 390 }
      ],
      blueFlagStalls: 18,
      buildingRentRates: "อาคารพาณิชย์ 10,000 - 18,000 บาท/เดือน/คูหา"
    },
    subLeasing: {
      prevalence: "สูง (ประมาณ 35% ของแผงค้า โดยเฉพาะกะดึกค้าส่ง)",
      model: "การเซ้งช่วงกะกลางคืนระหว่างพ่อค้าคนกลางกับร้านอาหารรายย่อย",
      contractYears: "1 ปี",
      currentPeriod: "1 เม.ย. 2567 - 31 มี.ค. 2568",
      areaRatioPercent: 32.0,
      estimatedSubleaseSpread: "ส่วนต่าง 8,000 - 16,000 บาท/แผง/เดือน",
      policyRegulation: "บังคับลงทะเบียนผู้เช่าช่วงกะกลางคืนเพื่อควบคุมมาตรฐานสุขอนามัย"
    },
    concessions: {
      parking: {
        operator: "บริษัท บางกะปิทราฟฟิก แมเนจเมนท์ จำกัด",
        durationYears: 2,
        startDate: "2024-01-01",
        endDate: "2025-12-31",
        annualRevenueShare: 3400000,
        terms: "จัดเก็บค่าจอดรถแบบชั่วโมงละ 20 บาท"
      },
      restroom: {
        operator: "หจก. บางกะปิสุขาภิบาล",
        durationYears: 3,
        startDate: "2023-08-01",
        endDate: "2026-07-31",
        annualRevenueShare: 1600000,
        terms: "ดูแลรักษาความสะอาดตลอด 24 ชั่วโมง"
      }
    },
    financials: {
      annualRevenueTotal: 25800000,
      annualExpenseTotal: 17200000,
      netProfit: 8600000,
      profitMarginPercent: 33.3,
      outstandingDebt: 1950000,
      revenueStreams: [
        { name: "ค่าเช่าแผงค้าและค่าธรรมเนียม", amount: 18200000, ratio: 70.5 },
        { name: "สัมปทานที่จอดรถ", amount: 3400000, ratio: 13.2 },
        { name: "สัมปทานห้องน้ำ 24 ชม.", amount: 1600000, ratio: 6.2 },
        { name: "ค่าไฟฟ้าและน้ำประปา", amount: 2600000, ratio: 10.1 }
      ],
      expenseStreams: [
        { name: "ค่าทำความสะอาด 24 ชม. และล้างตลาด", amount: 5600000, ratio: 32.6 },
        { name: "ค่า รปภ. ตลอด 24 ชั่วโมง", amount: 4100000, ratio: 23.8 },
        { name: "ค่าบำรุงรักษาบ่อบำบัดน้ำเสีย", amount: 3200000, ratio: 18.6 },
        { name: "เงินเดือนบุคลากร กทม.", amount: 3100000, ratio: 18.0 },
        { name: "ค่าไฟส่องสว่างโต้รุ่ง", amount: 1200000, ratio: 7.0 }
      ],
      historical: [
        { year: 2566, revenue: 21500000, expense: 15200000, profit: 6300000, margin: 29.3 },
        { year: 2567, revenue: 23800000, expense: 16100000, profit: 7700000, margin: 32.4 },
        { year: 2568, revenue: 25800000, expense: 17200000, profit: 8600000, margin: 33.3 },
        { year: 2569, revenue: 28500000, expense: 18400000, profit: 10100000, margin: 35.4, isCurrent: true },
        { year: 2570, revenue: 31500000, expense: 19800000, profit: 11700000, margin: 37.1, isForecast: true }
      ]
    },
    footfallDynamics: {
      weekdayAvg: 22000,
      weekendAvg: 35000,
      peakHours: "04:00 - 08:00 น. (ค้าส่งเช้า) และ 17:00 - 22:00 น. (ตลาดเย็น/โต้รุ่ง)",
      events: "กิจกรรม Big Cleaning Day ทุกวันพุธสัปดาห์ที่ 3, เทศกาลเจบางกะปิ"
    },
    communityImpact: {
      vocationalTraining: "โครงการสุขาภิบาลอาหารปลอดภัย, การแปรรูปอาหารสตรีทฟู้ดมาตรฐาน กทม.",
      blueFlagDiscountPolicy: "แผงจำหน่ายผักและหมูเนื้อแดงธงฟ้าราคาควบคุม"
    },
    itSystems: {
      systems: [
        "BMA Smart Stall QR System",
        "E-Payment QR สำหรับร้านค้าส่งและปลีก 90%",
        "ระบบเซ็นเซอร์กลิ่นและตรวจวัดก๊าซแอมโมเนียในอาคารตลาดสด",
        "กล้อง CCTV AI เชื่อมโยงศูนย์ควบคุมเขตบางกะปิ 36 จุด"
      ]
    },
    wasteManagement: {
      solidWasteTonsPerDay: 16.5,
      sortingSystem: "แยกเศษผักผลไม้ เปลือกหอย เศษปลา (อินทรีย์ 68%)",
      destination: "สถานีขนถ่ายมูลฝอยอ่อนนุช (กทม.)",
      transportMethod: "รถอัดขยะ กทม. ขนถ่ายวันละ 4 เที่ยว (ช่วงเวลาปลอดการจราจร)",
      onsiteProcessing: "เครื่องย่อยเศษอาหารชีวภาพ ผลิตสารปรับปรุงดิน 1 ตัน/วัน",
      wastewaterGreaseTrap: "บ่อดักไขมันคอนกรีต 3 สเต็ป พร้อมระบบเติมอากาศบำบัดน้ำเสีย 500 ลบ.ม./วัน"
    },
    spatialYield: {
      avgYieldPerSqm: 1417,
      zones: [
        { name: "Zone A (ตลาดสดค้าส่งกะดึก/เช้า)", sqm: 7500, yieldPerSqm: 1950, occupancy: 98.0, status: "Max Yield" },
        { name: "Zone B (ตลาดอาหารสดและสตรีทฟู้ดเย็น)", sqm: 5200, yieldPerSqm: 1820, occupancy: 96.0, status: "Max Yield" },
        { name: "Zone C (เสื้อผ้าและของใช้ชั้น 2)", sqm: 3500, yieldPerSqm: 720, occupancy: 78.0, status: "Moderate Yield" },
        { name: "Zone D (ลานจอดรถและจุดขนถ่ายสินค้า)", sqm: 2000, yieldPerSqm: 550, occupancy: 92.0, status: "Service Zone" }
      ]
    },
    swot: {
      strengths: "เปิด 24 ชั่วโมง ทำเลทองใจกลางจุดตัดแยกลำสาลี ใกล้รถไฟฟ้าสายสีเหลือง ท่าเรือแสนแสบ และห้างเดอะมอลล์",
      weaknesses: "พื้นที่จำกัด มีความแออัดสูง การจราจรติดขัด และปัญหาเรื่องกลิ่นคาวหากการล้างไม่ทันท่วงที",
      urgentFixes: "ปรับปรุงระบบระบายอากาศชั้น 2 และยกระดับบ่อดักไขมันป้องกันน้ำมันอุดตันท่อระบายน้ำ",
      darkInfluenceTransparency: "จัดระเบียบรถกระบะส่งของค้าส่งไม่ให้มีส่วยจอดรถริมถนนลาดพร้าว",
      vendorSellingPoints: "ขายได้ 2 กะตลอด 24 ชั่วโมง มีทั้งลูกค้าปลีกและร้านอาหารมารับของส่ง",
      buyerSellingPoints: "ของสดครบทุกประเภท ราคาขายส่ง เปิดตลอดเวลา เดินทางสะดวกด้วยรถไฟฟ้าสายสีเหลือง"
    }
  },
  {
    id: "prachanivet",
    rank: 5,
    officialName: "ตลาดประชานิเวศน์ 1",
    vernacularName: "ตลาดประชานิเวศน์ 1 / ตลาดสิงห์ราษฎร์ดำเนิน / ตลาดวัดเสมียนนารี",
    tier: "Medium",
    badgeColor: "primary",
    geo: {
      lat: 13.8402,
      lng: 100.5482,
      district: "เขตจตุจักร",
      address: "ถนนเทศบาลสงเคราะห์ แขวงลาดยาว เขตจตุจักร กรุงเทพฯ 10900",
      googleMapsUrl: "https://maps.google.com/?q=13.8402,100.5482",
      operatingHours: "เปิดบริการทุกวัน 05:30 - 19:30 น."
    },
    spatial: {
      landAreaRai: "12 ไร่ 1 งาน",
      landAreaSqm: 19600,
      usableAreaSqm: 14800,
      buildingCount: 3,
      buildingDetails: "อาคารโกลด์มาร์เก็ต (ที่ตั้งสำนักงานตลาด กทม.), อาคารตลาดสดปรับปรุงใหม่, อาคารจอดรถ 2 ชั้น",
      parkingCars: 320,
      parkingMotorcycles: 450,
      parkingConcession: "สำนักงานตลาดจัดเก็บเองด้วยระบบ Smart Parking",
      restroomCount: 3,
      restroomCubicles: 32,
      vacantAreaSqm: 800
    },
    surroundingPOIs: [
      { name: "สถานีรถไฟฟ้าสายสีแดง (สถานีวัดเสมียนนารี)", type: "transit", distance: "0.8 กม." },
      { name: "วัดเสมียนนารี พระอารามหลวง", type: "temple", distance: "0.7 กม." },
      { name: "โรงพยาบาลเกษมราษฎร์ ประชาชื่น & รพ.วิภาวดี", type: "hospital", distance: "1.4 กม." },
      { name: "สวนสุขภาพชุมชนประชานิเวศน์", type: "park", distance: "0.2 กม." },
      { name: "สำนักงานตลาดกรุงเทพมหานคร (ชั้น 5 อาคารโกลด์มาร์เก็ต)", type: "gov", distance: "0.0 กม." }
    ],
    stalls: {
      totalStalls: 890,
      activeVendors: 845,
      occupancyRate: 94.9,
      vendorDensityRatio: "1.05 ผู้ค้า/แผง",
      stallTypes: [
        { type: "อาหารปรุงสำเร็จ อาหารเพื่อสุขภาพ เบเกอรี่ (โซนในร่ม)", count: 320, ratio: 36.0, rentDaily: 120, rentMonthly: 2880, rentPerSqm: 720 },
        { type: "ผักผลไม้ปลอดสารพิษ สินค้าออร์แกนิก (โซนกลาง)", count: 240, ratio: 27.0, rentDaily: 100, rentMonthly: 2400, rentPerSqm: 600 },
        { type: "เนื้อสัตว์ อาหารทะเลสดคุณภาพพรีเมียม (โซนเปียก)", count: 180, ratio: 20.2, rentDaily: 110, rentMonthly: 2640, rentPerSqm: 660 },
        { type: "เสื้อผ้า สินค้าเพื่อสุขภาพและของใช้ผู้สูงอายุ", count: 90, ratio: 10.1, rentDaily: 80, rentMonthly: 1920, rentPerSqm: 480 },
        { type: "สินค้าธงฟ้า / โครงการหลวง / ของดี 50 เขต", count: 60, ratio: 6.7, rentDaily: 70, rentMonthly: 1680, rentPerSqm: 420 }
      ],
      blueFlagStalls: 15,
      buildingRentRates: "อาคารโกลด์มาร์เก็ตพาณิชย์ 15,000 - 30,000 บาท/เดือน"
    },
    subLeasing: {
      prevalence: "ต่ำถึงปานกลาง (ประมาณ 15% ของแผงค้า)",
      model: "การส่งต่อสิทธิให้ทายาทหรือกลุ่มแม่บ้านในชุมชนประชานิเวศน์",
      contractYears: "2 ปี",
      currentPeriod: "1 ม.ค. 2567 - 31 ธ.ค. 2568",
      areaRatioPercent: 14.2,
      estimatedSubleaseSpread: "ส่วนต่าง 4,000 - 8,000 บาท/แผง/เดือน",
      policyRegulation: "เน้นการตรวจสอบสิทธิโดยตรงเนื่องจากเป็นตลาดใกล้ที่ทำการสำนักงานตลาด"
    },
    concessions: {
      parking: {
        operator: "สำนักงานตลาด กทม. บริหารเอง (ใช้ระบบบัตรแม่เหล็ก/QR)",
        durationYears: 1,
        startDate: "2024-01-01",
        endDate: "2024-12-31",
        annualRevenueShare: 2800000,
        terms: "จอดฟรี 15 นาทีแรก ชั่วโมงถัดไป 20 บาท"
      },
      restroom: {
        operator: "จ้างเหมาบริการทำความสะอาด กทม.",
        durationYears: 2,
        startDate: "2024-01-01",
        endDate: "2025-12-31",
        annualRevenueShare: 950000,
        terms: "ห้องน้ำติดแอร์ มาตรฐานโรงแรม สะอาด ปลอดภัย"
      }
    },
    financials: {
      annualRevenueTotal: 19400000,
      annualExpenseTotal: 12100000,
      netProfit: 7300000,
      profitMarginPercent: 37.6,
      outstandingDebt: 850000,
      revenueStreams: [
        { name: "ค่าเช่าแผงและอาคารโกลด์มาร์เก็ต", amount: 14200000, ratio: 73.2 },
        { name: "รายได้ที่จอดรถ Smart Parking", amount: 2800000, ratio: 14.4 },
        { name: "รายได้ห้องน้ำและบริการส่วนกลาง", amount: 950000, ratio: 4.9 },
        { name: "ค่าสาธารณูปโภค", amount: 1450000, ratio: 7.5 }
      ],
      expenseStreams: [
        { name: "ค่าทำความสะอาดและรักษาความสะอาดติดแอร์", amount: 3800000, ratio: 31.4 },
        { name: "ค่า รปภ. และเทคโนโลยีความปลอดภัย", amount: 2900000, ratio: 24.0 },
        { name: "ค่าบำรุงรักษาอาคารและลิฟต์โกลด์มาร์เก็ต", amount: 2400000, ratio: 19.8 },
        { name: "เงินเดือนเจ้าหน้าที่ประจำ", amount: 2100000, ratio: 17.4 },
        { name: "ค่าน้ำ-ไฟ และระบบปรับอากาศ", amount: 900000, ratio: 7.4 }
      ],
      historical: [
        { year: 2566, revenue: 16800000, expense: 10900000, profit: 5900000, margin: 35.1 },
        { year: 2567, revenue: 18100000, expense: 11500000, profit: 6600000, margin: 36.5 },
        { year: 2568, revenue: 19400000, expense: 12100000, profit: 7300000, margin: 37.6 },
        { year: 2569, revenue: 21000000, expense: 12800000, profit: 8200000, margin: 39.0, isCurrent: true },
        { year: 2570, revenue: 22800000, expense: 13500000, profit: 9300000, margin: 40.8, isForecast: true }
      ]
    },
    footfallDynamics: {
      weekdayAvg: 11000,
      weekendAvg: 18500,
      peakHours: "06:30 - 11:30 น. (ช่วงเช้าคึกคักมาก)",
      events: "ตลาดนัดสุขภาพกรีนมาร์เก็ตทุกวันเสาร์-อาทิตย์ต้นเดือน"
    },
    communityImpact: {
      vocationalTraining: "ศูนย์ฝึกอาชีพชุมชนประชานิเวศน์ (ทำเบเกอรี่, ชงกาแฟสด, การจัดดอกไม้)",
      blueFlagDiscountPolicy: "บูทโครงการธงฟ้าราคาประหยัดและสินค้าโอทอป กทม."
    },
    itSystems: {
      systems: [
        "BMA Smart Stall System เชื่อมโยงบัญชีสำนักงานใหญ่",
        "E-Payment สแกนจ่าย 95% (กลุ่มลูกค้ามีสมาร์ตโฟนและบัตรเครดิต)",
        "ระบบบริหารลานจอดรถ Smart Parking License Plate Recognition",
        "กล้อง CCTV AI ทั่วบริเวณตลาด 32 จุด"
      ]
    },
    wasteManagement: {
      solidWasteTonsPerDay: 6.4,
      sortingSystem: "คัดแยกขยะ 4 ประเภทอย่างเข้มงวด มีจุดรับขยะรีไซเคิลแลกไข่ไก่",
      destination: "สถานีขนถ่ายมูลฝอยสายไหม (กทม.)",
      transportMethod: "รถขยะ กทม. ขนถ่ายวันละ 2 เที่ยว (ช่วงบ่ายและค่ำ)",
      onsiteProcessing: "บ่อดักไขมันระบบปิดและถังหมักปุ๋ยชีวภาพประจำตลาด",
      wastewaterGreaseTrap: "บ่อดักไขมันสเตนเลสมาตรฐานสูง บำบัดน้ำเสีย 180 ลบ.ม./วัน"
    },
    spatialYield: {
      avgYieldPerSqm: 1310,
      zones: [
        { name: "Zone 1 (อาหารปรุงสำเร็จและของฝากพรีเมียม)", sqm: 5400, yieldPerSqm: 1850, occupancy: 97.0, status: "Max Yield" },
        { name: "Zone 2 (ผักผลไม้ออร์แกนิกและสด)", sqm: 4200, yieldPerSqm: 1450, occupancy: 95.0, status: "High Yield" },
        { name: "Zone 3 (อาคารโกลด์มาร์เก็ตและสำนักงาน)", sqm: 3200, yieldPerSqm: 1600, occupancy: 92.0, status: "High Yield" },
        { name: "Zone 4 (อาคารจอดรถและลานบริการ)", sqm: 2000, yieldPerSqm: 680, occupancy: 94.0, status: "Service Zone" }
      ]
    },
    swot: {
      strengths: "ฐานลูกค้าชุมชนประชานิเวศน์เป็นกลุ่มข้าราชการบำนาญและครอบครัวกำลังซื้อสูงมาก ตลาดสะอาด ได้รับรางวัลมาตรฐาน กทม.",
      weaknesses: "พื้นที่จอดรถช่วงเสาร์-อาทิตย์เช้าไม่เพียงพอ",
      urgentFixes: "ขยายระบบจอดรถอัตโนมัติหรือเช่าพื้นที่เอกชนใกล้เคียงเพื่อรองรับผู้มาใช้บริการ",
      darkInfluenceTransparency: "เป็นตลาดโมเดลต้นแบบความโปร่งใส ไร้ปัญหาผู้มีอิทธิพลหรือเงินใต๊ะโต๊ะ 100%",
      vendorSellingPoints: "ลูกค้ามีกำลังซื้อสูง นิยมสินค้าเกรดพรีเมียมและอาหารคุณภาพดี ไม่เน้นตัดราคา",
      buyerSellingPoints: "ตลาดสะอาดมาก ติดแอร์ในบางโซน อาหารอร่อยขึ้นชื่อระดับตำนาน เดินทางสะดวก"
    }
  },
  {
    id: "thewarat",
    rank: 6,
    officialName: "ตลาดเทวราช",
    vernacularName: "ตลาดเทวราช / ตลาดเทเวศร์ / ตลาดดอกไม้เทเวศร์",
    tier: "Medium",
    badgeColor: "primary",
    geo: {
      lat: 13.7711,
      lng: 100.5002,
      district: "เขตดุสิต",
      address: "ถนนสามเสน แขวงวชิรพยาบาล เขตดุสิต กรุงเทพฯ 10300",
      googleMapsUrl: "https://maps.google.com/?q=13.7711,100.5002",
      operatingHours: "เปิดบริการทุกวัน 05:00 - 19:00 น."
    },
    spatial: {
      landAreaRai: "8 ไร่ 2 งาน",
      landAreaSqm: 13600,
      usableAreaSqm: 10500,
      buildingCount: 2,
      buildingDetails: "อาคารตลาดสดเทวราช 1 หลัง (สถาปัตยกรรมอนุรักษ์ดุสิต), อาคารพาณิชย์ริมคลองผดุงกรุงเกษม",
      parkingCars: 140,
      parkingMotorcycles: 250,
      parkingConcession: "สัมปทานเอกชนบริหารพื้นที่จอดรถริมคลอง",
      restroomCount: 2,
      restroomCubicles: 24,
      vacantAreaSqm: 600
    },
    surroundingPOIs: [
      { name: "ท่าเรือด่วนเจ้าพระยา (ท่าเทเวศร์) & ท่าเรือคลองผดุงกรุงเกษม", type: "transit", distance: "0.1 กม." },
      { name: "วัดราชาธิวาสราชวรวิหาร & วัดเทวราชกุญชร วรวิหาร", type: "temple", distance: "0.3 กม." },
      { name: "โรงพยาบาลวชิรพยาบาล (คณะแพทยศาสตร์ มช.)", type: "hospital", distance: "0.6 กม." },
      { name: "มหาวิทยาลัยนวมินทราธิราช & มทร.พระนคร (เทเวศร์)", type: "education", distance: "0.3 กม." },
      { name: "ธนาคารแห่งประเทศไทย (วังบางขุนพรหม)", type: "gov", distance: "0.7 กม." }
    ],
    stalls: {
      totalStalls: 720,
      activeVendors: 680,
      occupancyRate: 94.4,
      vendorDensityRatio: "1.06 ผู้ค้า/แผง",
      stallTypes: [
        { type: "ตลาดไม้ดอก ไม้ประดับ ไม้มงคล เทเวศร์", count: 260, ratio: 36.1, rentDaily: 90, rentMonthly: 2160, rentPerSqm: 540 },
        { type: "อาหารสด ปลา อาหารทะเล และผักสด", count: 190, ratio: 26.4, rentDaily: 100, rentMonthly: 2400, rentPerSqm: 600 },
        { type: "อาหารสำเร็จ ขนมหวานไทยโบราณสูตรชาววัง", count: 150, ratio: 20.8, rentDaily: 110, rentMonthly: 2640, rentPerSqm: 660 },
        { type: "เสื้อผ้า เครื่องแต่งกาย และของใช้เบ็ดเตล็ด", count: 80, ratio: 11.1, rentDaily: 75, rentMonthly: 1800, rentPerSqm: 450 },
        { type: "สินค้าธงฟ้า ของชำราคาประหยัด", count: 40, ratio: 5.6, rentDaily: 60, rentMonthly: 1440, rentPerSqm: 360 }
      ],
      blueFlagStalls: 10,
      buildingRentRates: "อาคารพาณิชย์ริมถนนสามเสน 12,000 - 20,000 บาท/เดือน"
    },
    subLeasing: {
      prevalence: "ปานกลาง (ประมาณ 20% ของแผงค้า)",
      model: "การเซ้งช่วงในกลุ่มตลาดต้นไม้เทเวศร์ริมคลอง",
      contractYears: "1-2 ปี",
      currentPeriod: "1 ม.ค. 2567 - 31 ธ.ค. 2568",
      areaRatioPercent: 18.5,
      estimatedSubleaseSpread: "ส่วนต่าง 5,000 - 11,000 บาท/แผง/เดือน",
      policyRegulation: "จัดระเบียบห้ามวางล้ำทางเท้าแนวคลองผดุงกรุงเกษม"
    },
    concessions: {
      parking: {
        operator: "หจก. ดุสิตบริการการจอด",
        durationYears: 2,
        startDate: "2024-03-01",
        endDate: "2026-02-28",
        annualRevenueShare: 2100000,
        terms: "จัดเก็บค่าจอดรถ 20 บาท/ชม."
      },
      restroom: {
        operator: "ผู้รับจ้างเหมาบริการสุขอนามัยดุสิต",
        durationYears: 2,
        startDate: "2023-09-01",
        endDate: "2025-08-31",
        annualRevenueShare: 780000,
        terms: "ค่าบริการ 3 บาท ดูแลมาตรฐานความสะอาด"
      }
    },
    financials: {
      annualRevenueTotal: 15600000,
      annualExpenseTotal: 9900000,
      netProfit: 5700000,
      profitMarginPercent: 36.5,
      outstandingDebt: 720000,
      revenueStreams: [
        { name: "ค่าเช่าแผงค้าต้นไม้/อาหาร", amount: 11600000, ratio: 74.4 },
        { name: "สัมปทานที่จอดรถ", amount: 2100000, ratio: 13.5 },
        { name: "สัมปทานห้องน้ำ", amount: 780000, ratio: 5.0 },
        { name: "ค่าไฟฟ้า-ประปา", amount: 1120000, ratio: 7.1 }
      ],
      expenseStreams: [
        { name: "ค่าทำความสะอาดและดูแลแนวคลอง", amount: 3200000, ratio: 32.3 },
        { name: "ค่า รปภ. และจราจรทางร่วมท่าเรือ", amount: 2400000, ratio: 24.2 },
        { name: "ค่าบำรุงรักษาอาคารอนุรักษ์", amount: 1900000, ratio: 19.2 },
        { name: "เงินเดือนเจ้าหน้าที่", amount: 1700000, ratio: 17.2 },
        { name: "ค่าไฟฟ้าส่องสว่าง", amount: 700000, ratio: 7.1 }
      ],
      historical: [
        { year: 2566, revenue: 13500000, expense: 8900000, profit: 4600000, margin: 34.1 },
        { year: 2567, revenue: 14600000, expense: 9400000, profit: 5200000, margin: 35.6 },
        { year: 2568, revenue: 15600000, expense: 9900000, profit: 5700000, margin: 36.5 },
        { year: 2569, revenue: 16800000, expense: 10400000, profit: 6400000, margin: 38.1, isCurrent: true },
        { year: 2570, revenue: 18200000, expense: 11000000, profit: 7200000, margin: 39.6, isForecast: true }
      ]
    },
    footfallDynamics: {
      weekdayAvg: 14000,
      weekendAvg: 16500,
      peakHours: "07:00 - 09:30 น. และ 16:00 - 18:30 น. (ผู้โดยสารเรือด่วนเจ้าพระยา)",
      events: "งานตลาดดอกไม้ริมคลองผดุงกรุงเกษม, เทศกาลลอยกระทงท่าเทเวศร์"
    },
    communityImpact: {
      vocationalTraining: "การทำขนมไทยโบราณตำรับชาววัง, ศิลปะการจัดดอกไม้สดสำหรับบูชาพระ",
      blueFlagDiscountPolicy: "แผงจำหน่ายสินค้าราคาประหยัดร่วมกับสหกรณ์ครูดุสิต"
    },
    itSystems: {
      systems: [
        "BMA Smart Stall QR System",
        "E-Payment QR สำหรับร้านค้า 86%",
        "กล้อง CCTV เฝ้าระวังริมคลองและท่าเรือ 24 จุด"
      ]
    },
    wasteManagement: {
      solidWasteTonsPerDay: 5.2,
      sortingSystem: "เน้นคัดแยกเศษกิ่งไม้ ใบไม้ ดอกไม้ (ขยะอินทรีย์ 60%)",
      destination: "สถานีขนถ่ายมูลฝอยสายไหม (กทม.)",
      transportMethod: "รถขยะ กทม. ขนถ่ายวันละ 2 เที่ยว",
      onsiteProcessing: "บ่อหมักปุ๋ยชีวภาพจากเศษพืชและดอกไม้",
      wastewaterGreaseTrap: "ระบบดักไขมันก่อนปล่อยลงคลองผดุงกรุงเกษม กำลังบำบัด 120 ลบ.ม./วัน"
    },
    spatialYield: {
      avgYieldPerSqm: 1485,
      zones: [
        { name: "Zone 1 (ตลาดต้นไม้และดอกไม้ริมคลอง)", sqm: 4500, yieldPerSqm: 1720, occupancy: 96.0, status: "Max Yield" },
        { name: "Zone 2 (ตลาดสดและขนมไทยโบราณ)", sqm: 3800, yieldPerSqm: 1550, occupancy: 94.0, status: "High Yield" },
        { name: "Zone 3 (พื้นที่บริการ ท่าเรือ และลานจอด)", sqm: 2200, yieldPerSqm: 880, occupancy: 92.0, status: "Service Zone" }
      ]
    },
    swot: {
      strengths: "เป็นตลาดเก่าแก่อัตลักษณ์ต้นไม้และขนมไทยโบราณ ทำเลติดท่าเรือด่วนเจ้าพระยาเทเวศร์และย่านสถานศึกษา/โรงพยาบาล",
      weaknesses: "พื้นที่จอดรถคับแคบ มีทางสัญจรร่วมริมคลองค่อนข้างแคบ",
      urgentFixes: "ปรับภูมิทัศน์ริมคลองผดุงกรุงเกษมและบูรณะสถาปัตยกรรมอาคารตลาดเก่าให้มีความปลอดภัย",
      darkInfluenceTransparency: "จัดระเบียบการจอดเรือและการวางต้นไม้ริมทาง ไม่ให้มีมาเฟียคุมพื้นที่",
      vendorSellingPoints: "มีผู้โดยสารเรือด่วนและบุคลากรโรงพยาบาล/มหาวิทยาลัยเดินผ่านตลอดวัน",
      buyerSellingPoints: "ซื้อดอกไม้ ต้นไม้ในเมืองได้ง่าย มีขนมไทยโบราณรสชาติต้นตำรับที่หาทานยาก"
    }
  },
  {
    id: "ratchada",
    rank: 7,
    officialName: "ตลาดรัชดาภิเษก",
    vernacularName: "ตลาดรัชดาภิเษก / ตลาดพลู กทม. / ตลาดสดรัชดา-ท่าพระ",
    tier: "Medium",
    badgeColor: "primary",
    geo: {
      lat: 13.7188,
      lng: 100.4785,
      district: "เขตธนบุรี",
      address: "ถนนรัชดาภิเษก-ท่าพระ แขวงดาวคะนอง เขตธนบุรี กรุงเทพฯ 10600",
      googleMapsUrl: "https://maps.google.com/?q=13.7188,100.4785",
      operatingHours: "เปิดบริการทุกวัน 05:00 - 21:00 น."
    },
    spatial: {
      landAreaRai: "6 ไร่ 1 งาน",
      landAreaSqm: 10000,
      usableAreaSqm: 7800,
      buildingCount: 2,
      buildingDetails: "อาคารตลาดสด 1 หลัง, อาคารพาณิชย์ 2 ชั้น 1 หลัง",
      parkingCars: 110,
      parkingMotorcycles: 300,
      parkingConcession: "สัมปทานเอกชนจัดเก็บค่าจอด",
      restroomCount: 2,
      restroomCubicles: 20,
      vacantAreaSqm: 400
    },
    surroundingPOIs: [
      { name: "สถานีรถไฟตลาดพลู & BTS ตลาดพลู", type: "transit", distance: "0.5 กม." },
      { name: "เดอะมอลล์ไลฟ์สโตร์ ท่าพระ", type: "mall", distance: "0.8 กม." },
      { name: "วัดราชคฤห์ วรวิหาร & วัดอินทาราม", type: "temple", distance: "0.6 กม." },
      { name: "ศาลเจ้าพ่อกวนอู ตลาดพลู", type: "shrine", distance: "0.4 กม." },
      { name: "โรงพยาบาลสมเด็จพระปิ่นเกล้า (รพ.ทหารเรือ)", type: "hospital", distance: "1.1 กม." }
    ],
    stalls: {
      totalStalls: 580,
      activeVendors: 540,
      occupancyRate: 93.1,
      vendorDensityRatio: "1.08 ผู้ค้า/แผง",
      stallTypes: [
        { type: "อาหารสตรีทฟู้ด ขนมหวาน และกุยช่ายตลาดพลู", count: 220, ratio: 37.9, rentDaily: 110, rentMonthly: 2640, rentPerSqm: 660 },
        { type: "ตลาดสด เนื้อสัตว์ ผัก ผลไม้", count: 180, ratio: 31.0, rentDaily: 95, rentMonthly: 2280, rentPerSqm: 570 },
        { type: "เสื้อผ้า เครื่องแต่งกาย ของใช้ประจำวัน", count: 110, ratio: 19.0, rentDaily: 70, rentMonthly: 1680, rentPerSqm: 420 },
        { type: "สินค้าธงฟ้า ของชำ เครื่องปรุงรส", count: 70, ratio: 12.1, rentDaily: 60, rentMonthly: 1440, rentPerSqm: 360 }
      ],
      blueFlagStalls: 12,
      buildingRentRates: "อาคารพาณิชย์ 9,000 - 15,000 บาท/เดือน"
    },
    subLeasing: {
      prevalence: "ปานกลาง (ประมาณ 24% ของแผงค้า)",
      model: "การเซ้งช่วงร้านอาหารสตรีทฟู้ดชื่อดัง",
      contractYears: "1 ปี",
      currentPeriod: "1 ม.ค. 2567 - 31 ธ.ค. 2567",
      areaRatioPercent: 21.0,
      estimatedSubleaseSpread: "ส่วนต่าง 5,000 - 12,000 บาท/แผง/เดือน",
      policyRegulation: "ควบคุมสุขอนามัยร้านสตรีทฟู้ดที่มารับช่วงต่ออย่างเข้มงวด"
    },
    concessions: {
      parking: {
        operator: "หจก. ท่าพระบริการจอดรถ",
        durationYears: 2,
        startDate: "2024-01-01",
        endDate: "2025-12-31",
        annualRevenueShare: 1650000,
        terms: "จัดเก็บค่าจอดรถ 20 บาท/ชม."
      },
      restroom: {
        operator: "จ้างเหมาบริการเอกชน",
        durationYears: 2,
        startDate: "2023-11-01",
        endDate: "2025-10-31",
        annualRevenueShare: 580000,
        terms: "ค่าบริการ 3 บาท สะอาด ได้มาตรฐาน"
      }
    },
    financials: {
      annualRevenueTotal: 12100000,
      annualExpenseTotal: 7900000,
      netProfit: 4200000,
      profitMarginPercent: 34.7,
      outstandingDebt: 540000,
      revenueStreams: [
        { name: "ค่าเช่าแผงค้าสตรีทฟู้ดและตลาดสด", amount: 9100000, ratio: 75.2 },
        { name: "สัมปทานที่จอดรถ", amount: 1650000, ratio: 13.6 },
        { name: "สัมปทานห้องน้ำ", amount: 580000, ratio: 4.8 },
        { name: "ค่าสาธารณูปโภค", amount: 770000, ratio: 6.4 }
      ],
      expenseStreams: [
        { name: "ค่าทำความสะอาดและล้างบ่อดักไขมัน", amount: 2600000, ratio: 32.9 },
        { name: "ค่า รปภ. และจราจร", amount: 1900000, ratio: 24.1 },
        { name: "ค่าบำรุงรักษาอาคาร", amount: 1400000, ratio: 17.7 },
        { name: "เงินเดือนเจ้าหน้าที่", amount: 1500000, ratio: 19.0 },
        { name: "ค่าไฟส่องสว่าง", amount: 500000, ratio: 6.3 }
      ],
      historical: [
        { year: 2566, revenue: 10400000, expense: 7100000, profit: 3300000, margin: 31.7 },
        { year: 2567, revenue: 11200000, expense: 7500000, profit: 3700000, margin: 33.0 },
        { year: 2568, revenue: 12100000, expense: 7900000, profit: 4200000, margin: 34.7 },
        { year: 2569, revenue: 13200000, expense: 8400000, profit: 4800000, margin: 36.4, isCurrent: true },
        { year: 2570, revenue: 14500000, expense: 9000000, profit: 5500000, margin: 37.9, isForecast: true }
      ]
    },
    footfallDynamics: {
      weekdayAvg: 12500,
      weekendAvg: 21000,
      peakHours: "16:30 - 20:30 น. (ช่วงเย็นคึกคักมากจากสายกินสตรีทฟู้ด)",
      events: "เทศกาลกุยช่ายและสตรีทฟู้ดตลาดพลู, งานไหว้เจ้าเก้าศาลธนบุรี"
    },
    communityImpact: {
      vocationalTraining: "การทำขนมกุยช่ายสูตรโบราณ, สุขาภิบาลอาหารริมทางตามเกณฑ์ กทม.",
      blueFlagDiscountPolicy: "แผงจำหน่ายน้ำมันพืชและวัตถุดิบทำอาหารธงฟ้าราคาถูก"
    },
    itSystems: {
      systems: [
        "BMA Smart Stall QR System",
        "E-Payment QR สำหรับร้านอาหาร 91%",
        "กล้อง CCTV AI ส่องจุดทางเข้าออก 20 จุด"
      ]
    },
    wasteManagement: {
      solidWasteTonsPerDay: 4.8,
      sortingSystem: "เน้นคัดแยกเศษอาหารและน้ำมันพืชใช้แล้วเพื่อแปรรูปไบโอดีเซล",
      destination: "โรงกำจัดมูลฝอยหนองแขม (กทม.)",
      transportMethod: "รถขยะ กทม. ขนถ่ายวันละ 2 เที่ยว",
      onsiteProcessing: "จุดรวบรวมน้ำมันทอดซ้ำส่งบริษัทแปรรูปน้ำมันอากาศยานยั่งยืน (SAF)",
      wastewaterGreaseTrap: "ถังดักไขมันแยกสตรีทฟู้ด บำบัดน้ำเสีย 150 ลบ.ม./วัน"
    },
    spatialYield: {
      avgYieldPerSqm: 1551,
      zones: [
        { name: "Zone 1 (สตรีทฟู้ดและของกินตลาดพลู)", sqm: 3800, yieldPerSqm: 2100, occupancy: 97.0, status: "Max Yield" },
        { name: "Zone 2 (ตลาดสดและของชำ)", sqm: 2500, yieldPerSqm: 1350, occupancy: 91.0, status: "High Yield" },
        { name: "Zone 3 (ลานจอดรถและบริการ)", sqm: 1500, yieldPerSqm: 720, occupancy: 88.0, status: "Service Zone" }
      ]
    },
    swot: {
      strengths: "อิงชื่อเสียงย่านของกินระดับตำนานตลาดพลู มีอาหารสตรีทฟู้ดดึงดูดนักชิมทั้งคนไทยและต่างชาติ ใกล้สถานีรถไฟและ BTS",
      weaknesses: "พื้นที่จอดรถมีจำกัด และช่วงเย็นการจราจรบนถนนรัชดาภิเษก-ท่าพระค่อนข้างติดขัด",
      urgentFixes: "ติดตั้งระบบดักควันและกลิ่นจากร้านอาหารสตรีทฟู้ดเพื่อไม่ให้กระทบชุมชนข้างเคียง",
      darkInfluenceTransparency: "จัดระเบียบโต๊ะเก้าอี้ไม่ให้รุกล้ำทางเท้าสาธารณะ ป้องกันการเก็บเงินนอกระบบ",
      vendorSellingPoints: "มีลูกค้าแวะเวียนมาหาของกินช่วงเย็นหนาแน่น อัตราหมุนเวียนโต๊ะสูง",
      buyerSellingPoints: "มีของอร่อยในตำนานตลาดพลูครบจบในที่เดียว สะอาดกว่าสตรีทฟู้ดริมถนนทั่วไป"
    }
  },
  {
    id: "nongchok",
    rank: 8,
    officialName: "ตลาดหนองจอก",
    vernacularName: "ตลาดหนองจอก / ตลาดสดหนองจอก / ตลาดคลองสิบสาม",
    tier: "Small",
    badgeColor: "secondary",
    geo: {
      lat: 13.8562,
      lng: 100.8625,
      district: "เขตหนองจอก",
      address: "ถนนเลียบวารี แขวงกระทุ่มราย เขตหนองจอก กรุงเทพฯ 10530",
      googleMapsUrl: "https://maps.google.com/?q=13.8562,100.8625",
      operatingHours: "เปิดบริการทุกวัน 05:00 - 18:30 น."
    },
    spatial: {
      landAreaRai: "9 ไร่ 1 งาน",
      landAreaSqm: 14800,
      usableAreaSqm: 11200,
      buildingCount: 2,
      buildingDetails: "อาคารตลาดสดเปิดโล่งทรงไทยประยุกต์ 1 หลัง, อาคารศูนย์บริการชุมชน 1 หลัง",
      parkingCars: 180,
      parkingMotorcycles: 400,
      parkingConcession: "สำนักงานตลาด กทม. จัดเก็บเอง",
      restroomCount: 2,
      restroomCubicles: 20,
      vacantAreaSqm: 1500
    },
    surroundingPOIs: [
      { name: "มัสยิดดารุ้ลอะมาน (หนองจอก)", type: "mosque", distance: "0.4 กม." },
      { name: "สำนักงานเขตหนองจอก", type: "gov", distance: "1.0 กม." },
      { name: "มหาวิทยาลัยเทคโนโลยีมหานคร (MUT)", type: "education", distance: "1.2 กม." },
      { name: "โรงพยาบาลเวชการุณย์รัศมิ์ (รพ.หนองจอก)", type: "hospital", distance: "0.8 กม." },
      { name: "สวนสาธารณะหนองจอก", type: "park", distance: "0.9 กม." },
      { name: "วัดหนองจอก", type: "temple", distance: "1.4 กม." }
    ],
    stalls: {
      totalStalls: 520,
      activeVendors: 460,
      occupancyRate: 88.5,
      vendorDensityRatio: "1.04 ผู้ค้า/แผง",
      stallTypes: [
        { type: "อาหารสด เนื้อวัว แพะ ไก่ ฮาลาล 100% และปลาทุ่ง", count: 210, ratio: 40.4, rentDaily: 70, rentMonthly: 1680, rentPerSqm: 420 },
        { type: "ผักสวนครัว พืชผักพื้นบ้านปลอดสารพิษเกษตรกรหนองจอก", count: 140, ratio: 26.9, rentDaily: 50, rentMonthly: 1200, rentPerSqm: 300 },
        { type: "อาหารปรุงสำเร็จ แกงมุสลิม โรตี มะตะบะ ซุปหางวัว", count: 100, ratio: 19.2, rentDaily: 80, rentMonthly: 1920, rentPerSqm: 480 },
        { type: "เสื้อผ้ามุสลิม เครื่องแต่งกาย และของใช้", count: 45, ratio: 8.7, rentDaily: 60, rentMonthly: 1440, rentPerSqm: 360 },
        { type: "สินค้าธงฟ้า ข้าวสาร น้ำตาลทราย", count: 25, ratio: 4.8, rentDaily: 40, rentMonthly: 960, rentPerSqm: 240 }
      ],
      blueFlagStalls: 14,
      buildingRentRates: "อาคารพาณิชย์ 5,000 - 9,000 บาท/เดือน"
    },
    subLeasing: {
      prevalence: "ต่ำมาก (ประมาณ 8% ของแผงค้า)",
      model: "การสืบทอดแผงค้าในครอบครัวเกษตรกรและชุมชนมุสลิม",
      contractYears: "2 ปี",
      currentPeriod: "1 ม.ค. 2567 - 31 ธ.ค. 2568",
      areaRatioPercent: 7.5,
      estimatedSubleaseSpread: "ส่วนต่าง 2,000 - 4,500 บาท/แผง/เดือน",
      policyRegulation: "สนับสนุนให้เกษตรกรตัวจริงนำผลผลิตมาขายตรงโดยไม่ผ่านพ่อค้าคนกลาง"
    },
    concessions: {
      parking: {
        operator: "สำนักงานตลาด กทม. ดูแลเอง",
        durationYears: 1,
        startDate: "2024-01-01",
        endDate: "2024-12-31",
        annualRevenueShare: 920000,
        terms: "จอดรถยนต์ 10-20 บาท มอเตอร์ไซค์จอดฟรี"
      },
      restroom: {
        operator: "กลุ่มแม่บ้านชุมชนหนองจอก",
        durationYears: 2,
        startDate: "2023-10-01",
        endDate: "2025-09-30",
        annualRevenueShare: 360000,
        terms: "ค่าบริการ 3 บาท ดูแลห้องน้ำและจุดอาบน้ำละหมาด"
      }
    },
    financials: {
      annualRevenueTotal: 8900000,
      annualExpenseTotal: 5800000,
      netProfit: 3100000,
      profitMarginPercent: 34.8,
      outstandingDebt: 410000,
      revenueStreams: [
        { name: "ค่าเช่าแผงค้าเกษตรกรและอาหารฮาลาล", amount: 6900000, ratio: 77.5 },
        { name: "รายได้ที่จอดรถ", amount: 920000, ratio: 10.3 },
        { name: "รายได้ห้องน้ำ", amount: 360000, ratio: 4.1 },
        { name: "ค่าสาธารณูปโภค", amount: 720000, ratio: 8.1 }
      ],
      expenseStreams: [
        { name: "ค่าทำความสะอาดและจัดการขยะอินทรีย์", amount: 1900000, ratio: 32.8 },
        { name: "ค่า รปภ. ประจำตลาด", amount: 1400000, ratio: 24.1 },
        { name: "ค่าซ่อมแซมหลังคาและพื้นตลาด", amount: 1100000, ratio: 19.0 },
        { name: "เงินเดือนเจ้าหน้าที่", amount: 1000000, ratio: 17.2 },
        { name: "ค่าน้ำ-ไฟ", amount: 400000, ratio: 6.9 }
      ],
      historical: [
        { year: 2566, revenue: 7600000, expense: 5100000, profit: 2500000, margin: 32.9 },
        { year: 2567, revenue: 8200000, expense: 5400000, profit: 2800000, margin: 34.1 },
        { year: 2568, revenue: 8900000, expense: 5800000, profit: 3100000, margin: 34.8 },
        { year: 2569, revenue: 9700000, expense: 6200000, profit: 3500000, margin: 36.1, isCurrent: true },
        { year: 2570, revenue: 10600000, expense: 6600000, profit: 4000000, margin: 37.7, isForecast: true }
      ]
    },
    footfallDynamics: {
      weekdayAvg: 7500,
      weekendAvg: 12000,
      peakHours: "06:00 - 09:30 น. (ช่วงเช้าผู้คนออกมาซื้อวัตถุดิบปรุงอาหาร)",
      events: "ตลาดนัดเกษตรอินทรีย์หนองจอกทุกวันศุกร์, งานเทศกาลวันอีดิลฟิฏรี"
    },
    communityImpact: {
      vocationalTraining: "การเพาะเห็ดเศรษฐกิจ, การทำปุ๋ยไส้เดือน, และมาตรฐานเชือดสัตว์ฮาลาล",
      blueFlagDiscountPolicy: "โครงการแผงค้าเกษตรกรขายตรงธงฟ้า ผักสวนครัวกำละ 10 บาท"
    },
    itSystems: {
      systems: [
        "BMA Smart Stall QR System",
        "E-Payment QR สำหรับร้านค้าชุมชน 78%",
        "กล้อง CCTV เฝ้าระวังพื้นที่ 16 จุด"
      ]
    },
    wasteManagement: {
      solidWasteTonsPerDay: 3.6,
      sortingSystem: "ขยะอินทรีย์และเศษผักผลไม้ 72% นำไปทำปุ๋ยหมักชุมชน",
      destination: "สถานีขนถ่ายมูลฝอยสายไหม (กทม.)",
      transportMethod: "รถขยะ กทม. ขนถ่ายวันละ 1 เที่ยว",
      onsiteProcessing: "โรงปุ๋ยหมักชีวภาพชุมชนหนองจอก ส่งมอบปุ๋ยให้เกษตรกรในพื้นที่",
      wastewaterGreaseTrap: "บ่อดักไขมันธรรมชาติและระบบบำบัด 100 ลบ.ม./วัน"
    },
    spatialYield: {
      avgYieldPerSqm: 795,
      zones: [
        { name: "Zone 1 (เนื้อสัตว์ฮาลาลและอาหารสด)", sqm: 5200, yieldPerSqm: 980, occupancy: 92.0, status: "High Yield" },
        { name: "Zone 2 (ผักพื้นบ้านและอาหารปรุงสำเร็จ)", sqm: 3800, yieldPerSqm: 820, occupancy: 88.0, status: "Moderate Yield" },
        { name: "Zone 3 (ลานจอดรถและกิจกรรมชุมชน)", sqm: 2200, yieldPerSqm: 380, occupancy: 82.0, status: "Service Zone" }
      ]
    },
    swot: {
      strengths: "เป็นศูนย์กลางอาหารฮาลาลและผลผลิตการเกษตรปลอดสารพิษใหญ่ที่สุดของ กทม. ตะวันออก มีความผูกพันในชุมชนแน่นแฟ้น",
      weaknesses: "อยู่ห่างไกลจากใจกลางเมือง ระบบขนส่งมวลชนสาธารณะยังมีน้อย",
      urgentFixes: "ติดตั้งหลังคากันสาดเพิ่มกันฝนสาด และยกระดับพื้นโซนขายปลาไม่ให้เปียกแฉะ",
      darkInfluenceTransparency: "ชุมชนช่วยสอดส่องดูแล ไร้ปัญหามาเฟียหรือการเรียกเก็บเงินนอกระบบ",
      vendorSellingPoints: "ค่าเช่าถูกมาก ได้ขายสินค้าตรงให้กับคนในพื้นที่และนักศึกษามหาวิทยาลัยมหานคร",
      buyerSellingPoints: "เนื้อสัตว์ฮาลาลแท้ 100% ผักสดปลอดภัยราคาถูกจากสวนชาวบ้าน"
    }
  },
  {
    id: "bangkaephirom",
    rank: 9,
    officialName: "ตลาดบางแคภิรมย์",
    vernacularName: "ตลาดบางแคภิรมย์ / สวนบางแคภิรมย์ / ตลาดร่มเกล้า-เพชรเกษม 69",
    tier: "Small",
    badgeColor: "secondary",
    geo: {
      lat: 13.6845,
      lng: 100.3712,
      district: "เขตบางแค",
      address: "ซอยเพชรเกษม 69 แขวงหลักสอง เขตบางแค กรุงเทพฯ 10160",
      googleMapsUrl: "https://maps.google.com/?q=13.6845,100.3712",
      operatingHours: "เปิดบริการทุกวัน 06:00 - 20:00 น."
    },
    spatial: {
      landAreaRai: "15 ไร่ (รวมพื้นที่สวนสาธารณะบางแคภิรมย์ 42 ไร่)",
      landAreaSqm: 24000,
      usableAreaSqm: 12500,
      buildingCount: 3,
      buildingDetails: "อาคารตลาดชุมชนสมัยใหม่ 1 หลัง, ซุ้มร้านค้าทรงโมเดิร์นริมสวน, อาคารสุขาภิบาล",
      parkingCars: 260,
      parkingMotorcycles: 450,
      parkingConcession: "สำนักงานตลาด กทม. บริหารร่วมกับสำนักสิ่งแวดล้อม",
      restroomCount: 3,
      restroomCubicles: 28,
      vacantAreaSqm: 2000
    },
    surroundingPOIs: [
      { name: "สวนบางแคภิรมย์ (สวนสาธารณะขนาด 42 ไร่ติดตลาด)", type: "park", distance: "0.01 กม." },
      { name: "MRT หลักสอง (เดอะมอลล์บางแค)", type: "transit", distance: "3.5 กม." },
      { name: "วัดราษฎร์บำรุง & วัดม่วง", type: "temple", distance: "1.8 กม." },
      { name: "โรงพยาบาลเกษมราษฎร์ บางแค", type: "hospital", distance: "3.2 กม." },
      { name: "วิทยาลัยเทคโนโลยีธนบุรี", type: "education", distance: "1.5 กม." }
    ],
    stalls: {
      totalStalls: 450,
      activeVendors: 390,
      occupancyRate: 86.7,
      vendorDensityRatio: "1.02 ผู้ค้า/แผง",
      stallTypes: [
        { type: "อาหารเพื่อสุขภาพ เครื่องดื่ม และสตรีทฟู้ดริมสวน", count: 180, ratio: 40.0, rentDaily: 90, rentMonthly: 2160, rentPerSqm: 540 },
        { type: "ผักสด ผลไม้ และอาหารสดอินทรีย์", count: 120, ratio: 26.7, rentDaily: 75, rentMonthly: 1800, rentPerSqm: 450 },
        { type: "ต้นไม้ ไม้ประดับ แคคตัส และอุปกรณ์จัดสวน", count: 80, ratio: 17.8, rentDaily: 70, rentMonthly: 1680, rentPerSqm: 420 },
        { type: "เสื้อผ้ากีฬา อุปกรณ์ออกกำลังกาย และของใช้", count: 45, ratio: 10.0, rentDaily: 60, rentMonthly: 1440, rentPerSqm: 360 },
        { type: "สินค้าธงฟ้า / OTOP ฝั่งธนบุรี", count: 25, ratio: 5.5, rentDaily: 50, rentMonthly: 1200, rentPerSqm: 300 }
      ],
      blueFlagStalls: 10,
      buildingRentRates: "ซุ้มพาณิชย์ริมสวน 6,000 - 10,000 บาท/เดือน"
    },
    subLeasing: {
      prevalence: "ต่ำ (ประมาณ 10% ของแผงค้า)",
      model: "การแบ่งพื้นที่สำหรับร้านค้าฟู้ดทรัคและเครื่องดื่มสุขภาพ",
      contractYears: "1 ปี",
      currentPeriod: "1 ม.ค. 2567 - 31 ธ.ค. 2567",
      areaRatioPercent: 8.5,
      estimatedSubleaseSpread: "ส่วนต่าง 2,500 - 5,000 บาท/แผง/เดือน",
      policyRegulation: "เน้นเปิดโอกาสให้คนรุ่นใหม่และผู้สูงอายุในเขตบางแคเปิดร้าน"
    },
    concessions: {
      parking: {
        operator: "สำนักงานตลาด กทม. บริหารเอง",
        durationYears: 1,
        startDate: "2024-01-01",
        endDate: "2024-12-31",
        annualRevenueShare: 880000,
        terms: "บริการฟรี 1 ชั่วโมงแรก เพื่อส่งเสริมการออกกำลังกายในสวน"
      },
      restroom: {
        operator: "จ้างเหมาบริการรักษาความสะอาด",
        durationYears: 2,
        startDate: "2023-11-01",
        endDate: "2025-10-31",
        annualRevenueShare: 320000,
        terms: "ห้องน้ำสะอาด มาตรฐาน Green Park"
      }
    },
    financials: {
      annualRevenueTotal: 7400000,
      annualExpenseTotal: 4900000,
      netProfit: 2500000,
      profitMarginPercent: 33.8,
      outstandingDebt: 320000,
      revenueStreams: [
        { name: "ค่าเช่าแผงค้าและซุ้มร้านริมสวน", amount: 5600000, ratio: 75.7 },
        { name: "รายได้ที่จอดรถ", amount: 880000, ratio: 11.9 },
        { name: "รายได้ห้องน้ำ", amount: 320000, ratio: 4.3 },
        { name: "ค่าสาธารณูปโภค", amount: 600000, ratio: 8.1 }
      ],
      expenseStreams: [
        { name: "ค่าทำความสะอาดตลาดและขยะสวน", amount: 1600000, ratio: 32.7 },
        { name: "ค่า รปภ. ตรวจตราเชื่อมต่อสวน", amount: 1200000, ratio: 24.5 },
        { name: "ค่าบำรุงรักษาภูมิทัศน์และไฟส่องสว่าง", amount: 950000, ratio: 19.4 },
        { name: "เงินเดือนบุคลากร", amount: 850000, ratio: 17.3 },
        { name: "ค่าน้ำ-ไฟ", amount: 300000, ratio: 6.1 }
      ],
      historical: [
        { year: 2566, revenue: 6100000, expense: 4200000, profit: 1900000, margin: 31.1 },
        { year: 2567, revenue: 6700000, expense: 4500000, profit: 2200000, margin: 32.8 },
        { year: 2568, revenue: 7400000, expense: 4900000, profit: 2500000, margin: 33.8 },
        { year: 2569, revenue: 8200000, expense: 5300000, profit: 2900000, margin: 35.4, isCurrent: true },
        { year: 2570, revenue: 9100000, expense: 5700000, profit: 3400000, margin: 37.4, isForecast: true }
      ]
    },
    footfallDynamics: {
      weekdayAvg: 6000,
      weekendAvg: 14500,
      peakHours: "06:00 - 08:30 น. และ 16:30 - 19:30 น. (สอดคล้องกับเวลาคนมาออกกำลังกายในสวน)",
      events: "กิจกรรมเดิน-วิ่ง สวนบางแคภิรมย์, ตลาดนัดสุขภาพและสัตว์เลี้ยง Dog Friendly"
    },
    communityImpact: {
      vocationalTraining: "โครงการ Green Business, การปลูกผักสลัดออร์แกนิกในเมือง, และศิลปะเครื่องปั้นดินเผา",
      blueFlagDiscountPolicy: "บูทสินค้าราคาประหยัดเพื่อชุมชนเพชรเกษม 69"
    },
    itSystems: {
      systems: [
        "BMA Smart Stall QR System",
        "E-Payment สแกนจ่าย 92%",
        "กล้อง CCTV AI สอดส่องแนวสวนและลานจอด 22 จุด"
      ]
    },
    wasteManagement: {
      solidWasteTonsPerDay: 2.8,
      sortingSystem: "เน้นคัดแยกขยะพลาสติกเพื่อรีไซเคิล และขยะเศษอาหารแปรรูปปุ๋ย",
      destination: "โรงกำจัดมูลฝอยหนองแขม (กทม.)",
      transportMethod: "รถขยะ กทม. ขนถ่ายวันละ 1 เที่ยว",
      onsiteProcessing: "โรงปุ๋ยหมักชีวภาพป้อนสวนบางแคภิรมย์ (Zero Waste Model)",
      wastewaterGreaseTrap: "ระบบบำบัดน้ำเสียแบบบึงประดิษฐ์ร่วมกับระบบสวน 80 ลบ.ม./วัน"
    },
    spatialYield: {
      avgYieldPerSqm: 592,
      zones: [
        { name: "Zone A (ร้านอาหารสุขภาพและเครื่องดื่มริมสวน)", sqm: 5500, yieldPerSqm: 820, occupancy: 91.0, status: "High Yield" },
        { name: "Zone B (ผักอินทรีย์และต้นไม้)", sqm: 4200, yieldPerSqm: 650, occupancy: 85.0, status: "Moderate Yield" },
        { name: "Zone C (ลานกิจกรรมและที่จอดรถร่วม)", sqm: 2800, yieldPerSqm: 310, occupancy: 80.0, status: "Service Zone" }
      ]
    },
    swot: {
      strengths: "เป็นตลาดโมเดลใหม่ผสมผสานสวนสาธารณะ (Park & Market) บรรยากาศดีที่สุดในฝั่งธนบุรีตอนล่าง เหมาะกับกลุ่มคนรักสุขภาพ",
      weaknesses: "การสัญจรในซอยเพชรเกษม 69 ช่วงเร่งด่วนค่อนข้างหนาแน่น",
      urgentFixes: "เพิ่มแสงสว่างโซนซุ้มร้านค้าริมสวนช่วงค่ำ และจัดระบบทางเดินเชื่อมระหว่างสวนกับตลาด",
      darkInfluenceTransparency: "บริหารจัดการโปร่งใส 100% ไร้ปัญหาส่วยหรือผลประโยชน์ทับซ้อน",
      vendorSellingPoints: "กลุ่มลูกค้าคือคนออกกำลังกายและครอบครัว มีไลฟ์สไตล์รักสุขภาพ ยินดีจ่ายเพื่อสินค้าคุณภาพ",
      buyerSellingPoints: "เดินออกกำลังกายเสร็จแล้วแวะทานอาหารสุขภาพและซื้อต้นไม้ได้ทันที บรรยากาศร่มรื่น"
    }
  },
  {
    id: "ratburana",
    rank: 10,
    officialName: "ตลาดราษฎร์บูรณะ",
    vernacularName: "ตลาดราษฎร์บูรณะ / ตลาดสดราษฎร์บูรณะ / ตลาดวัดราษฎร์บูรณะ",
    tier: "Small",
    badgeColor: "secondary",
    geo: {
      lat: 13.6821,
      lng: 100.5054,
      district: "เขตราษฎร์บูรณะ",
      address: "ถนนราษฎร์บูรณะ แขวงราษฎร์บูรณะ เขตราษฎร์บูรณะ กรุงเทพฯ 10140",
      googleMapsUrl: "https://maps.google.com/?q=13.6821,100.5054",
      operatingHours: "เปิดบริการทุกวัน 05:00 - 18:00 น."
    },
    spatial: {
      landAreaRai: "5 ไร่ 1 งาน",
      landAreaSqm: 8400,
      usableAreaSqm: 6200,
      buildingCount: 1,
      buildingDetails: "อาคารตลาดสดโครงสร้างคอนกรีตเสริมเหล็ก 1 ชั้น",
      parkingCars: 90,
      parkingMotorcycles: 220,
      parkingConcession: "สำนักงานตลาด กทม. จัดเก็บเอง",
      restroomCount: 1,
      restroomCubicles: 16,
      vacantAreaSqm: 600
    },
    surroundingPOIs: [
      { name: "แม่น้ำเจ้าพระยา (ท่าเรือราษฎร์บูรณะ)", type: "transit", distance: "0.2 กม." },
      { name: "วัดราษฎร์บูรณะ & วัดประเสริฐสุทธาวาส", type: "temple", distance: "0.3 กม." },
      { name: "สำนักงานเขตราษฎร์บูรณะ", type: "gov", distance: "0.9 กม." },
      { name: "โรงพยาบาลบางปะกอก 1 & รพ.ราษฎร์บูรณะ", type: "hospital", distance: "1.3 กม." },
      { name: "สวนสาธารณะเฉลิมพระเกียรติ 6 รอบ (สะพานพระราม 9)", type: "park", distance: "1.8 กม." }
    ],
    stalls: {
      totalStalls: 360,
      activeVendors: 315,
      occupancyRate: 87.5,
      vendorDensityRatio: "1.03 ผู้ค้า/แผง",
      stallTypes: [
        { type: "อาหารสด ปลาแม่น้ำ อาหารทะเลสด ผักผลไม้", count: 160, ratio: 44.4, rentDaily: 75, rentMonthly: 1800, rentPerSqm: 450 },
        { type: "อาหารปรุงสำเร็จ ข้าวแกง อาหารเช้า", count: 95, ratio: 26.4, rentDaily: 85, rentMonthly: 2040, rentPerSqm: 510 },
        { type: "เสื้อผ้า ของใช้ในครัวเรือน และของชำ", count: 65, ratio: 18.1, rentDaily: 60, rentMonthly: 1440, rentPerSqm: 360 },
        { type: "สินค้าธงฟ้า ข้าวสาร ไข่ไก่ราคาถูก", count: 40, ratio: 11.1, rentDaily: 45, rentMonthly: 1080, rentPerSqm: 270 }
      ],
      blueFlagStalls: 10,
      buildingRentRates: "อาคารพาณิชย์ 6,000 - 10,000 บาท/เดือน"
    },
    subLeasing: {
      prevalence: "ต่ำ (ประมาณ 12% ของแผงค้า)",
      model: "การส่งต่อแผงระหว่างชาวบ้านในชุมชนริมน้ำ",
      contractYears: "1 ปี",
      currentPeriod: "1 ม.ค. 2567 - 31 ธ.ค. 2567",
      areaRatioPercent: 11.0,
      estimatedSubleaseSpread: "ส่วนต่าง 2,000 - 4,000 บาท/แผง/เดือน",
      policyRegulation: "ตรวจสอบความถูกต้องของสัญญารายปี"
    },
    concessions: {
      parking: {
        operator: "สำนักงานตลาด กทม. บริหารเอง",
        durationYears: 1,
        startDate: "2024-01-01",
        endDate: "2024-12-31",
        annualRevenueShare: 580000,
        terms: "จัดเก็บค่าจอดรถยนต์ 10 บาทตลอดวัน"
      },
      restroom: {
        operator: "จ้างเหมาบริการทำความสะอาด",
        durationYears: 2,
        startDate: "2023-10-01",
        endDate: "2025-09-30",
        annualRevenueShare: 240000,
        terms: "ค่าบริการ 3 บาท"
      }
    },
    financials: {
      annualRevenueTotal: 5900000,
      annualExpenseTotal: 3950000,
      netProfit: 1950000,
      profitMarginPercent: 33.1,
      outstandingDebt: 280000,
      revenueStreams: [
        { name: "ค่าเช่าแผงค้าและของชำ", amount: 4580000, ratio: 77.6 },
        { name: "รายได้ที่จอดรถ", amount: 580000, ratio: 9.8 },
        { name: "รายได้ห้องน้ำ", amount: 240000, ratio: 4.1 },
        { name: "ค่าสาธารณูปโภค", amount: 500000, ratio: 8.5 }
      ],
      expenseStreams: [
        { name: "ค่าทำความสะอาดตลาดสด", amount: 1350000, ratio: 34.2 },
        { name: "ค่า รปภ. ประจำตลาด", amount: 950000, ratio: 24.1 },
        { name: "ค่าบำรุงรักษาอาคารและท่อระบายน้ำ", amount: 750000, ratio: 19.0 },
        { name: "เงินเดือนเจ้าหน้าที่", amount: 650000, ratio: 16.4 },
        { name: "ค่าน้ำ-ไฟ", amount: 250000, ratio: 6.3 }
      ],
      historical: [
        { year: 2566, revenue: 5100000, expense: 3500000, profit: 1600000, margin: 31.4 },
        { year: 2567, revenue: 5500000, expense: 3720000, profit: 1780000, margin: 32.4 },
        { year: 2568, revenue: 5900000, expense: 3950000, profit: 1950000, margin: 33.1 },
        { year: 2569, revenue: 6450000, expense: 4200000, profit: 2250000, margin: 34.9, isCurrent: true },
        { year: 2570, revenue: 7100000, expense: 4500000, profit: 2600000, margin: 36.6, isForecast: true }
      ]
    },
    footfallDynamics: {
      weekdayAvg: 5500,
      weekendAvg: 8500,
      peakHours: "06:00 - 09:00 น. (ตลาดเช้าชุมชนริมน้ำ)",
      events: "งานบุญตักบาตรพระทางน้ำวัดราษฎร์บูรณะ, เทศกาลลอยกระทงริมแม่น้ำเจ้าพระยา"
    },
    communityImpact: {
      vocationalTraining: "การแปรรูปปลาและสัตว์น้ำจืด, การทำน้ำพริกโบราณสูตรชุมชนริมเจ้าพระยา",
      blueFlagDiscountPolicy: "จุดจำหน่ายสินค้าธงฟ้าเพื่อช่วยเหลือผู้มีรายได้น้อยเขตราษฎร์บูรณะ"
    },
    itSystems: {
      systems: [
        "BMA Smart Stall QR System",
        "E-Payment สแกนจ่าย 80%",
        "กล้อง CCTV เฝ้าระวัง 14 จุด"
      ]
    },
    wasteManagement: {
      solidWasteTonsPerDay: 2.4,
      sortingSystem: "คัดแยกเศษปลาและขยะอินทรีย์ 65%",
      destination: "โรงกำจัดมูลฝอยหนองแขม (กทม.)",
      transportMethod: "รถขยะ กทม. ขนถ่ายวันละ 1 เที่ยว",
      onsiteProcessing: "ถังหมักน้ำหมักชีวภาพ EM สำหรับล้างตลาดและดับกลิ่นคาวปลา",
      wastewaterGreaseTrap: "บ่อดักไขมันก่อนระบายลงท่อระบายน้ำ กทม. 70 ลบ.ม./วัน"
    },
    spatialYield: {
      avgYieldPerSqm: 951,
      zones: [
        { name: "Zone 1 (ตลาดสดปลาและอาหารทะเล)", sqm: 3200, yieldPerSqm: 1150, occupancy: 90.0, status: "High Yield" },
        { name: "Zone 2 (อาหารปรุงสำเร็จและของชำ)", sqm: 2000, yieldPerSqm: 950, occupancy: 86.0, status: "Moderate Yield" },
        { name: "Zone 3 (ลานจอดรถและลานขนถ่าย)", sqm: 1000, yieldPerSqm: 420, occupancy: 82.0, status: "Service Zone" }
      ]
    },
    swot: {
      strengths: "เป็นตลาดสดริมแม่น้ำเจ้าพระยา สินค้าปลาและอาหารทะเลสดใหม่ ชุมชนดั้งเดิมมีความเหนียวแน่น",
      weaknesses: "อาคารมีอายุการใช้งานนาน จำเป็นต้องปรับปรุงโครงสร้างหลังคาและระบบระบายน้ำ",
      urgentFixes: "ซ่อมแซมระบบบำบัดน้ำเสียและบ่อดักไขมันไม่ให้มีกลิ่นรบกวน",
      darkInfluenceTransparency: "ดูแลโดยเจ้าหน้าที่ กทม. โดยตรง ไร้ปัญหาผู้มีอิทธิพล",
      vendorSellingPoints: "ค่าเช่าถูกมาก อยู่ใกล้แหล่งชุมชนริมน้ำและโรงงาน มีลูกค้าประจำสม่ำเสมอ",
      buyerSellingPoints: "ปลาแม่น้ำสดใหม่ ราคาชาวบ้าน มีความเป็นกันเองแบบตลาดดั้งเดิม"
    }
  },
  {
    id: "wongwianlek",
    rank: 11,
    officialName: "ตลาดพระเครื่องวงเวียนเล็ก",
    vernacularName: "ตลาดพระเครื่องวงเวียนเล็ก / ตลาดพระกุฎีจีน / ตลาดพระสมเด็จเจ้าพระยา",
    tier: "Small",
    badgeColor: "secondary",
    geo: {
      lat: 13.7345,
      lng: 100.4952,
      district: "เขตคลองสาน",
      address: "ถนนสมเด็จเจ้าพระยา แขวงสมเด็จเจ้าพระยา เขตคลองสาน กรุงเทพฯ 10600",
      googleMapsUrl: "https://maps.google.com/?q=13.7345,100.4952",
      operatingHours: "เปิดบริการทุกวัน 08:30 - 17:00 น. (คึกคักเป็นพิเศษ วันพระและเสาร์-อาทิตย์)"
    },
    spatial: {
      landAreaRai: "3 ไร่ 2 งาน",
      landAreaSqm: 5600,
      usableAreaSqm: 4200,
      buildingCount: 1,
      buildingDetails: "อาคารตลาดพระเครื่องติดแอร์ 1 หลัง พร้อมตู้จัดแสดงวัตถุมงคล",
      parkingCars: 60,
      parkingMotorcycles: 150,
      parkingConcession: "สำนักงานตลาด กทม. บริหารเอง",
      restroomCount: 1,
      restroomCubicles: 12,
      vacantAreaSqm: 300
    },
    surroundingPOIs: [
      { name: "สะพานพระปกเกล้า & สะพานพุทธยอดฟ้า (สวนลอยฟ้าเจ้าพระยา)", type: "transit", distance: "0.4 กม." },
      { name: "ชุมชนกุฎีจีน & โบสถ์ซางตาครู้ส", type: "church", distance: "0.5 กม." },
      { name: "วัดกัลยาณมิตร วรมหาวิหาร & วัดประยุรวงศาวาส", type: "temple", distance: "0.3 กม." },
      { name: "ศาลเจ้าเกียนอันเกง", type: "shrine", distance: "0.4 กม." },
      { name: "โรงพยาบาลตากสิน", type: "hospital", distance: "1.0 กม." }
    ],
    stalls: {
      totalStalls: 280,
      activeVendors: 260,
      occupancyRate: 92.8,
      vendorDensityRatio: "1.05 ผู้ค้า/แผง",
      stallTypes: [
        { type: "แผงพระเครื่อง พระบูชา เหรียญคณาจารย์", count: 180, ratio: 64.3, rentDaily: 70, rentMonthly: 1680, rentPerSqm: 560 },
        { type: "กรอบพระ ตลับพระ สร้อยพระ อุปกรณ์ส่องพระ", count: 55, ratio: 19.6, rentDaily: 65, rentMonthly: 1560, rentPerSqm: 520 },
        { type: "หนังสือพระ ของเก่า และวัตถุโบราณ", count: 30, ratio: 10.7, rentDaily: 60, rentMonthly: 1440, rentPerSqm: 480 },
        { type: "อาหาร เครื่องดื่ม ขนมกุฎีจีน", count: 15, ratio: 5.4, rentDaily: 70, rentMonthly: 1680, rentPerSqm: 560 }
      ],
      blueFlagStalls: 4,
      buildingRentRates: "ตู้โชว์พระเครื่องติดแอร์ 2,500 - 4,500 บาท/เดือน"
    },
    subLeasing: {
      prevalence: "ปานกลาง (ประมาณ 18% ของตู้พระ)",
      model: "การแบ่งเช่าตู้โชว์พระเครื่องระหว่างเซียนพระ",
      contractYears: "1 ปี",
      currentPeriod: "1 ม.ค. 2567 - 31 ธ.ค. 2567",
      areaRatioPercent: 16.0,
      estimatedSubleaseSpread: "ส่วนต่าง 2,000 - 5,000 บาท/ตู้/เดือน",
      policyRegulation: "ลงทะเบียนประวัติเซียนพระประจำตู้เพื่อป้องกันพระปลอมและการฉ้อโกง"
    },
    concessions: {
      parking: {
        operator: "สำนักงานตลาด กทม. บริหารเอง",
        durationYears: 1,
        startDate: "2024-01-01",
        endDate: "2024-12-31",
        annualRevenueShare: 450000,
        terms: "จัดเก็บค่าจอดรถ 20 บาท/ชม."
      },
      restroom: {
        operator: "จ้างเหมาบริการเอกชน",
        durationYears: 2,
        startDate: "2023-11-01",
        endDate: "2025-10-31",
        annualRevenueShare: 180000,
        terms: "ค่าบริการ 3 บาท ติดแอร์"
      }
    },
    financials: {
      annualRevenueTotal: 4200000,
      annualExpenseTotal: 2750000,
      netProfit: 1450000,
      profitMarginPercent: 34.5,
      outstandingDebt: 180000,
      revenueStreams: [
        { name: "ค่าเช่าตู้พระและแผงพระเครื่อง", amount: 3250000, ratio: 77.4 },
        { name: "รายได้ที่จอดรถ", amount: 450000, ratio: 10.7 },
        { name: "รายได้ห้องน้ำ", amount: 180000, ratio: 4.3 },
        { name: "ค่าสาธารณูปโภค", amount: 320000, ratio: 7.6 }
      ],
      expenseStreams: [
        { name: "ค่า รปภ. และระบบความปลอดภัยตู้พระ", amount: 1050000, ratio: 38.2 },
        { name: "ค่าทำความสะอาดและบำรุงรักษาแอร์", amount: 720000, ratio: 26.2 },
        { name: "เงินเดือนเจ้าหน้าที่", amount: 550000, ratio: 20.0 },
        { name: "ค่าไฟฟ้าเครื่องปรับอากาศ", amount: 430000, ratio: 15.6 }
      ],
      historical: [
        { year: 2566, revenue: 3600000, expense: 2400000, profit: 1200000, margin: 33.3 },
        { year: 2567, revenue: 3900000, expense: 2580000, profit: 1320000, margin: 33.8 },
        { year: 2568, revenue: 4200000, expense: 2750000, profit: 1450000, margin: 34.5 },
        { year: 2569, revenue: 4600000, expense: 2950000, profit: 1650000, margin: 35.9, isCurrent: true },
        { year: 2570, revenue: 5100000, expense: 3150000, profit: 1950000, margin: 38.2, isForecast: true }
      ]
    },
    footfallDynamics: {
      weekdayAvg: 2200,
      weekendAvg: 5800,
      peakHours: "10:00 - 15:30 น. (ช่วงกลางวันเซียนพระนัดพบส่องพระ)",
      events: "งานมหกรรมการประกวดพระเครื่องเมืองธนบุรีประจำปี"
    },
    communityImpact: {
      vocationalTraining: "ศิลปะการเลี่ยมกรอบพระกันน้ำ, การดูเนื้อโลหะและผงพุทธคุณเบื้องต้น",
      blueFlagDiscountPolicy: "แผงจำหน่ายหนังสือสวดมนต์และสังฆทานราคาประหยัด"
    },
    itSystems: {
      systems: [
        "BMA Smart Stall QR System",
        "E-Payment QR 88%",
        "ระบบกล้อง AI CCTV ความละเอียดสูงส่องตู้พระ 28 จุด ป้องกันการโจรกรรม"
      ]
    },
    wasteManagement: {
      solidWasteTonsPerDay: 0.8,
      sortingSystem: "ขยะแห้ง กระดาษ กล่องพลาสติก (ไม่มีขยะสดตลาดเปียก)",
      destination: "โรงกำจัดมูลฝอยหนองแขม (กทม.)",
      transportMethod: "รถขยะ กทม. ขนถ่ายสัปดาห์ละ 3 ครั้ง",
      onsiteProcessing: "คัดแยกขยะรีไซเคิล 100%",
      wastewaterGreaseTrap: "ถังดักไขมันขนาดเล็กจากร้านกาแฟ 20 ลบ.ม./วัน"
    },
    spatialYield: {
      avgYieldPerSqm: 1000,
      zones: [
        { name: "Zone A (ตู้โชว์พระเครื่องหลักติดแอร์)", sqm: 2500, yieldPerSqm: 1300, occupancy: 95.0, status: "High Yield" },
        { name: "Zone B (ร้านเลี่ยมกรอบพระและอุปกรณ์)", sqm: 1100, yieldPerSqm: 850, occupancy: 90.0, status: "Moderate Yield" },
        { name: "Zone C (ลานจอดรถและโถงต้อนรับ)", sqm: 600, yieldPerSqm: 380, occupancy: 85.0, status: "Service Zone" }
      ]
    },
    swot: {
      strengths: "เป็นแหล่งนัดพบของวงการพระเครื่องฝั่งธนบุรีที่มีประวัติศาสตร์ยาวนาน ใกล้วัดสำคัญและย่านท่องเที่ยวประวัติศาสตร์กุฎีจีน",
      weaknesses: "กลุ่มลูกค้าเฉพาะกลุ่ม (Niche Market) พื้นที่จำกัด",
      urgentFixes: "ยกระดับระบบกล้องวงจรปิดความปลอดภัยสูงและระบบตรวจจับควันไฟ",
      darkInfluenceTransparency: "จัดตั้งคณะกรรมการสมาคมพระเครื่องร่วมตรวจสอบ ป้องกันมิจฉาชีพหลอกลวง",
      vendorSellingPoints: "ค่าเช่าตู้ไม่แพง มีเซียนพระและนักสะสมแวะเวียนมาแลกเปลี่ยนสม่ำเสมอ",
      buyerSellingPoints: "มีพระเครื่อง พระบูชา และช่างเลี่ยมพระฝีมือดีครบครัน ปลอดภัยในห้องแอร์"
    }
  },
  {
    id: "singha",
    rank: 12,
    officialName: "ตลาดสิงหา",
    vernacularName: "ตลาดสิงหา / ตลาดสิงหาคลองเตย / ตลาดชุมชนสิงหา",
    tier: "Small",
    badgeColor: "secondary",
    geo: {
      lat: 13.7145,
      lng: 100.5588,
      district: "เขตคลองเตย",
      address: "ถนนพระรามที่ 4 แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110",
      googleMapsUrl: "https://maps.google.com/?q=13.7145,100.5588",
      operatingHours: "เปิดบริการทุกวัน 05:00 - 18:00 น."
    },
    spatial: {
      landAreaRai: "2 ไร่ 3 งาน",
      landAreaSqm: 4400,
      usableAreaSqm: 3200,
      buildingCount: 1,
      buildingDetails: "อาคารตลาดสดชุมชนชั้นเดียวโครงสร้างเหล็ก",
      parkingCars: 40,
      parkingMotorcycles: 120,
      parkingConcession: "สำนักงานตลาด กทม. จัดเก็บเอง",
      restroomCount: 1,
      restroomCubicles: 10,
      vacantAreaSqm: 200
    },
    surroundingPOIs: [
      { name: "MRT คลองเตย & MRT ศูนย์การประชุมแห่งชาติสิริกิติ์", type: "transit", distance: "0.6 กม." },
      { name: "การท่าเรือแห่งประเทศไทย", type: "gov", distance: "0.8 กม." },
      { name: "โรงพยาบาลเทพธารินทร์ & รพ.เมดพาร์ค (MedPark)", type: "hospital", distance: "1.2 กม." },
      { name: "วัดสะพาน คลองเตย", type: "temple", distance: "0.7 กม." },
      { name: "สวนเบญจกิติ", type: "park", distance: "1.5 กม." }
    ],
    stalls: {
      totalStalls: 220,
      activeVendors: 195,
      occupancyRate: 88.6,
      vendorDensityRatio: "1.02 ผู้ค้า/แผง",
      stallTypes: [
        { type: "อาหารสด เนื้อหมู ไก่ ผัก ผลไม้ประจำวัน", count: 100, ratio: 45.5, rentDaily: 70, rentMonthly: 1680, rentPerSqm: 420 },
        { type: "อาหารปรุงสำเร็จ ข้าวแกง อาหารเช้าชุมชน", count: 65, ratio: 29.5, rentDaily: 80, rentMonthly: 1920, rentPerSqm: 480 },
        { type: "ของชำ ของใช้ประจำวัน และเสื้อผ้าราคาถูก", count: 35, ratio: 15.9, rentDaily: 55, rentMonthly: 1320, rentPerSqm: 330 },
        { type: "สินค้าธงฟ้า / สินค้าราคาประหยัด กทม.", count: 20, ratio: 9.1, rentDaily: 40, rentMonthly: 960, rentPerSqm: 240 }
      ],
      blueFlagStalls: 8,
      buildingRentRates: "อาคารพาณิชย์ 5,000 - 8,000 บาท/เดือน"
    },
    subLeasing: {
      prevalence: "ต่ำ (ประมาณ 9% ของแผงค้า)",
      model: "การช่วยเหลือกันในชุมชนคลองเตย",
      contractYears: "1 ปี",
      currentPeriod: "1 ม.ค. 2567 - 31 ธ.ค. 2567",
      areaRatioPercent: 8.0,
      estimatedSubleaseSpread: "ส่วนต่าง 1,500 - 3,000 บาท/แผง/เดือน",
      policyRegulation: "เน้นช่วยเหลือผู้มีรายได้น้อยในพื้นที่คลองเตย"
    },
    concessions: {
      parking: {
        operator: "สำนักงานตลาด กทม. ดูแลเอง",
        durationYears: 1,
        startDate: "2024-01-01",
        endDate: "2024-12-31",
        annualRevenueShare: 320000,
        terms: "จอดรถจักรยานยนต์ฟรี รถยนต์ 10 บาท"
      },
      restroom: {
        operator: "กลุ่มแม่บ้านชุมชนสิงหา",
        durationYears: 2,
        startDate: "2023-11-01",
        endDate: "2025-10-31",
        annualRevenueShare: 150000,
        terms: "ค่าบริการ 3 บาท"
      }
    },
    financials: {
      annualRevenueTotal: 3500000,
      annualExpenseTotal: 2350000,
      netProfit: 1150000,
      profitMarginPercent: 32.9,
      outstandingDebt: 150000,
      revenueStreams: [
        { name: "ค่าเช่าแผงค้าชุมชน", amount: 2780000, ratio: 79.4 },
        { name: "รายได้ที่จอดรถ", amount: 320000, ratio: 9.1 },
        { name: "รายได้ห้องน้ำ", amount: 150000, ratio: 4.3 },
        { name: "ค่าสาธารณูปโภค", amount: 250000, ratio: 7.2 }
      ],
      expenseStreams: [
        { name: "ค่าทำความสะอาดและจัดเก็บขยะ", amount: 820000, ratio: 34.9 },
        { name: "ค่า รปภ. ชุมชน", amount: 580000, ratio: 24.7 },
        { name: "ค่าบำรุงรักษาอาคารและท่อระบายน้ำ", amount: 450000, ratio: 19.1 },
        { name: "เงินเดือนเจ้าหน้าที่", amount: 380000, ratio: 16.2 },
        { name: "ค่าน้ำ-ไฟ", amount: 120000, ratio: 5.1 }
      ],
      historical: [
        { year: 2566, revenue: 2950000, expense: 2050000, profit: 900000, margin: 30.5 },
        { year: 2567, revenue: 3200000, expense: 2200000, profit: 1000000, margin: 31.3 },
        { year: 2568, revenue: 3500000, expense: 2350000, profit: 1150000, margin: 32.9 },
        { year: 2569, revenue: 3850000, expense: 2520000, profit: 1330000, margin: 34.5, isCurrent: true },
        { year: 2570, revenue: 4250000, expense: 2700000, profit: 1550000, margin: 36.5, isForecast: true }
      ]
    },
    footfallDynamics: {
      weekdayAvg: 3800,
      weekendAvg: 5200,
      peakHours: "06:00 - 08:30 น. (ตลาดเช้าชุมชน)",
      events: "กิจกรรมตรวจสุขภาพเคลื่อนที่ กทม., ตลาดนัดสินค้าราคาประหยัดสู้ค่าครองชีพ"
    },
    communityImpact: {
      vocationalTraining: "โครงการพัฒนาฝีมือแรงงานชุมชนคลองเตย, การประกอบอาหารตามสั่งสร้างอาชีพ",
      blueFlagDiscountPolicy: "โครงการจำหน่ายไข่ไก่ ข้าวสาร น้ำมันพืช ราคาธงฟ้า กทม. เป็นประจำทุกสัปดาห์"
    },
    itSystems: {
      systems: [
        "BMA Smart Stall QR System",
        "E-Payment สแกนจ่าย 75%",
        "กล้อง CCTV ดูแลความปลอดภัยชุมชน 12 จุด"
      ]
    },
    wasteManagement: {
      solidWasteTonsPerDay: 1.6,
      sortingSystem: "คัดแยกเศษผักผลไม้และขยะทั่วไป",
      destination: "สถานีขนถ่ายมูลฝอยอ่อนนุช (กทม.)",
      transportMethod: "รถขยะ กทม. ขนถ่ายวันละ 1 เที่ยว",
      onsiteProcessing: "บ่อหมักปุ๋ยชีวภาพชุมชน",
      wastewaterGreaseTrap: "บ่อดักไขมัน 40 ลบ.ม./วัน"
    },
    spatialYield: {
      avgYieldPerSqm: 1093,
      zones: [
        { name: "Zone 1 (อาหารสดและกับข้าวปรุงสำเร็จ)", sqm: 1800, yieldPerSqm: 1250, occupancy: 91.0, status: "High Yield" },
        { name: "Zone 2 (ของชำและสินค้าธงฟ้า)", sqm: 900, yieldPerSqm: 980, occupancy: 85.0, status: "Moderate Yield" },
        { name: "Zone 3 (ลานจอดรถและทางเข้า)", sqm: 500, yieldPerSqm: 420, occupancy: 80.0, status: "Service Zone" }
      ]
    },
    swot: {
      strengths: "เป็นตลาดบริการชุมชนคลองเตยที่ช่วยลดค่าครองชีพให้ประชาชนอย่างแท้จริง ค่าเช่าแผงต่ำที่สุดในระบบ กทม.",
      weaknesses: "ขนาดพื้นที่เล็ก สิ่งอำนวยความสะดวกจำกัด",
      urgentFixes: "ปรับปรุงพื้นทางเดินและหลังคาป้องกันน้ำฝนรั่วซึม",
      darkInfluenceTransparency: "ดูแลโดยตรงโดยสำนักงานเขตคลองเตยและสำนักงานตลาด กทม. ไร้ผู้มีอิทธิพล",
      vendorSellingPoints: "ค่าเช่าถูกมาก ได้ช่วยเหลือชุมชน มีลูกค้าซื้อสินค้าจำเป็นทุกวัน",
      buyerSellingPoints: "สินค้าราคาถูกที่สุด ประหยัดค่าใช้จ่าย อยู่ใจกลางชุมชน"
    }
  }
];

// Helper calculations & Flagship ROI matrix
const FLAGSHIP_MARKETS_ROI = [
  {
    id: "chatuchak",
    name: "ตลาดนัดจตุจักร",
    category: "Flagship Mega Tier",
    assetValuationEst: 12500000000,
    annualRevenue: 385500000,
    annualNetProfit: 173100000,
    yieldPerSqm: 3519,
    roiPercent: 18.5,
    capRatePercent: 8.8,
    occupancyRate: 95.3,
    partnerAgencies: "รฟท. (เจ้าของที่ดินสัญญาเช่า), กองบัญชาการตำรวจนครบาล, กรมการขนส่งทางบก, BTS/MRT, สำนักการจราจร กทม.",
    strategicRole: "ศูนย์กลางการค้าปลีกและท่องเที่ยวระดับโลก แหล่งสร้างรายได้อันดับ 1 ของสำนักงานตลาด กทม."
  },
  {
    id: "thonburi",
    name: "ตลาดธนบุรี (สนามหลวง 2)",
    category: "Flagship Regional Tier",
    assetValuationEst: 2800000000,
    annualRevenue: 68400000,
    annualNetProfit: 25600000,
    yieldPerSqm: 698,
    roiPercent: 14.2,
    capRatePercent: 7.2,
    occupancyRate: 88.8,
    partnerAgencies: "สำนักสิ่งแวดล้อม กทม. (สวนทวีวนารมย์), กรมส่งเสริมการเกษตร, สำนักงานเขตทวีวัฒนา, สน.ธรรมศาลา",
    strategicRole: "Green & Pet Hub ฝั่งธนบุรี ศูนย์กระจายพันธุ์ไม้ดอกไม้ประดับและสัตว์เลี้ยงใหญ่ที่สุดของ กทม."
  },
  {
    id: "minburi",
    name: "ตลาดนัดจตุจักร 2 (มีนบุรี)",
    category: "Flagship Transit-Hub Tier",
    assetValuationEst: 1650000000,
    annualRevenue: 46200000,
    annualNetProfit: 16400000,
    yieldPerSqm: 1265,
    roiPercent: 15.8,
    capRatePercent: 7.9,
    occupancyRate: 91.3,
    partnerAgencies: "รฟม. (รถไฟฟ้าสายสีชมพู), ขสมก., กรมการปกครอง, ศาลจังหวัดมีนบุรี, สำนักงานเขตมีนบุรี",
    strategicRole: "Transit Commercial Hub เชื่อมต่อรถไฟฟ้าสายสีชมพู ศูนย์กลางเศรษฐกิจชุมชนไทย-มุสลิมมีนบุรี"
  }
];

// Summary Statistics
const BMA_SUMMARY_STATS = {
  totalMarkets: BMA_MARKETS_DATA.length,
  totalAnnualRevenue: BMA_MARKETS_DATA.reduce((acc, m) => acc + m.financials.annualRevenueTotal, 0),
  totalAnnualExpense: BMA_MARKETS_DATA.reduce((acc, m) => acc + m.financials.annualExpenseTotal, 0),
  totalNetProfit: BMA_MARKETS_DATA.reduce((acc, m) => acc + m.financials.netProfit, 0),
  totalStalls: BMA_MARKETS_DATA.reduce((acc, m) => acc + m.stalls.totalStalls, 0),
  totalActiveVendors: BMA_MARKETS_DATA.reduce((acc, m) => acc + m.stalls.activeVendors, 0),
  avgOccupancyRate: (BMA_MARKETS_DATA.reduce((acc, m) => acc + m.stalls.occupancyRate, 0) / BMA_MARKETS_DATA.length).toFixed(1),
  totalWasteTonsPerDay: BMA_MARKETS_DATA.reduce((acc, m) => acc + m.wasteManagement.solidWasteTonsPerDay, 0).toFixed(1),
  totalBlueFlagStalls: BMA_MARKETS_DATA.reduce((acc, m) => acc + m.stalls.blueFlagStalls, 0),
  totalOutstandingDebt: BMA_MARKETS_DATA.reduce((acc, m) => acc + m.financials.outstandingDebt, 0)
};

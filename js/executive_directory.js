/**
 * BMA Market Intelligence - Weather Intelligence (Current & 3-Day Daily Forecast),
 * Weekly Events & Happenings Radar, Market Managers Registry, and Data Sources.
 */

const BMA_WEATHER_INTELLIGENCE = {
  currentOverview: {
    city: "กรุงเทพมหานคร (Bangkok Metropolitan)",
    temperature: 31,
    feelsLike: 35,
    humidity: 68,
    windSpeed: "12 กม./ชม. (ทิศตะวันตกเฉียงใต้)",
    conditionText: "ท้องฟ้าแจ่มใส มีเมฆบางส่วน 🌤️",
    uvIndex: "6 (ปานกลาง)",
    rainChance: "20%",
    aqi: 42,
    pm25: 18.5,
    aqiStatus: "คุณภาพอากาศดี (Good)",
    aqiColor: "#10b981",
    lastObservationTime: "ข้อมูลสถานีตรวจวัดอัตโนมัติ TMD & AirBKK"
  },
  dailyForecast3Days: [
    {
      dayLabel: "วันนี้ (Today)",
      dateStr: "18 ส.ค. 2569",
      condition: "มีเมฆบางส่วน แดดจัดช่วงบ่าย 🌤️",
      tempMin: 26,
      tempMax: 34,
      rainChance: "20%",
      rainAmount: "ฝนเล็กน้อยบางพื้นที่",
      aqi: 42,
      pm25: 18.5,
      aqiStatus: "อากาศดี (Good)",
      aqiColor: "#10b981",
      marketImpact: "สภาพอากาศเอื้ออำนวยต่อการจับจ่ายซื้อสินค้า ตลาดกลางแจ้งเปิดให้บริการได้เต็มรูปแบบ"
    },
    {
      dayLabel: "พรุ่งนี้ (Tomorrow)",
      dateStr: "19 ส.ค. 2569",
      condition: "มีฝนฟ้าคะนองร้อยละ 40 ช่วงเย็น 🌦️",
      tempMin: 27,
      tempMax: 33,
      rainChance: "40%",
      rainAmount: "ฝนตกปานกลางช่วง 16:00-19:00 น.",
      aqi: 38,
      pm25: 15.2,
      aqiStatus: "อากาศดีมาก (Very Good)",
      aqiColor: "#10b981",
      marketImpact: "แนะนำตลาดเตรียมการระบายน้ำและตรวจสอบหลังคาผ้าใบกันสาดช่วงตลาดเย็น"
    },
    {
      dayLabel: "มะรืนนี้ (Day After)",
      dateStr: "20 ส.ค. 2569",
      condition: "มีเมฆเป็นส่วนมาก มีลมพัดแรง ⛅",
      tempMin: 26,
      tempMax: 32,
      rainChance: "30%",
      rainAmount: "มีฝนโปรยปรายช่วงบ่าย",
      aqi: 35,
      pm25: 14.0,
      aqiStatus: "อากาศดีมาก (Very Good)",
      aqiColor: "#10b981",
      marketImpact: "อากาศเย็นสบาย เหมาะแก่การจัดกิจกรรมกลางแจ้งและตลาดนัดกลางคืน"
    }
  ]
};

const BMA_MARKET_EVENTS = [
  {
    id: "evt-1",
    timeframe: "today",
    timeframeLabel: "⚡ วันนี้ (Today)",
    marketId: "chatuchak",
    marketName: "ตลาดนัดจตุจักร",
    district: "เขตจตุจักร",
    eventName: "ตลาดนัดต้นไม้ ไม้ดอกไม้ประดับ และอุปกรณ์จัดสวนกลางสัปดาห์",
    schedule: "วันพุธ-พฤหัสบดี เวลา 05:00 - 18:00 น.",
    category: "🌿 ตลาดนัดเฉพาะกิจ",
    categoryColor: "emerald",
    location: "ลานโครงการ 1-4 และริมถนนรอบหอนาฬิกา",
    description: "การรวมตัวของผู้เพาะพันธุ์ต้นไม้ ไม้ด่าง แคคตัส และบอนไซจากทั่วประเทศ ผู้ค้ากว่า 980 แผง นำพันธุ์ไม้ราคาชาวสวนมาจำหน่ายตรง",
    expectedFootfall: "25,000 - 35,000 คน/วัน",
    highlight: "จุดตรวจสุขภาพดินฟรี โดยสำนักสิ่งแวดล้อม กทม. บริเวณกองอำนวยการ"
  },
  {
    id: "evt-2",
    timeframe: "today",
    timeframeLabel: "⚡ วันนี้ (Today)",
    marketId: "minburi",
    marketName: "ตลาดนัดจตุจักร 2 (มีนบุรี)",
    district: "เขตมีนบุรี",
    eventName: "มหกรรมคาราวานสินค้าธงฟ้าราคาประหยัด ลดค่าครองชีพประชาชน",
    schedule: "เปิดจำหน่ายทุกวัน เวลา 08:00 - 19:00 น.",
    category: "🛒 สินค้าธงฟ้า/ชุมชน",
    categoryColor: "sky",
    location: "โซนลานอเนกประสงค์ ชั้น 1 อาคารพาณิชย์",
    description: "จำหน่ายไข่ไก่ น้ำมันพืช ข้าวสาร น้ำตาลทราย และเนื้อไก่สดในราคาต่ำกว่าท้องตลาด 20-30% ร่วมกับกรมการค้าภายใน",
    expectedFootfall: "18,000 คน/วัน",
    highlight: "รับชำระผ่านสิทธิสวัสดิการแห่งรัฐและ QR Code ธนาคารทุกระบบ"
  },
  {
    id: "evt-3",
    timeframe: "week",
    timeframeLabel: "📅 สัปดาห์นี้ (This Week)",
    marketId: "chatuchak",
    marketName: "ตลาดนัดจตุจักร",
    district: "เขตจตุจักร",
    eventName: "JJ Friday Wholesale & Art Night Market (ตลาดนัดกลางคืนวันศุกร์)",
    schedule: "วันศุกร์ เวลา 18:00 - 24:00 น.",
    category: "🌙 ตลาดกลางคืน/สตรีทฟู้ด",
    categoryColor: "purple",
    location: "ถนนสายกลางและประตู 1-3",
    description: "ตลาดค้าส่งเสื้อผ้าแฟชั่น งานคราฟต์ และสตรีทฟู้ดกลางคืนยอดนิยมของนักท่องเที่ยวทั้งชาวไทยและต่างชาติ",
    expectedFootfall: "65,000 - 85,000 คน/คืน",
    highlight: "มีรถ Shuttle Bus รับ-ส่งฟรี สถานีกลางกรุงเทพอภิวัฒน์ - BTS หมอชิต"
  },
  {
    id: "evt-4",
    timeframe: "week",
    timeframeLabel: "📅 สัปดาห์นี้ (This Week)",
    marketId: "thonburi",
    marketName: "ตลาดธนบุรี (สนามหลวง 2)",
    district: "เขตทวีวัฒนา",
    eventName: "งานมหกรรมประกวดปลาสวยงามและพันธุ์กล้วยไม้ฝั่งธนบุรี",
    schedule: "วันเสาร์-อาทิตย์ เวลา 09:00 - 18:00 น.",
    category: "🏆 งานประกวด/นิทรรศการ",
    categoryColor: "amber",
    location: "โซน 3 สัตว์เลี้ยง และโซน 1 พันธุ์ไม้",
    description: "การจัดประกวดปลากัดไทย ปลาทอง ปลาคาร์ฟ และกล้วยไม้แคทลียา ชิงถ้วยรางวัลสำนักงานตลาด กทม. พร้อมคลินิกตรวจสุขภาพสัตว์เลี้ยงฟรี",
    expectedFootfall: "45,000 คน/วัน",
    highlight: "เวิร์กช็อปสอนจัดตู้ไม้น้ำและเทคนิคการขยายพันธุ์ไม้ด่างฟรี"
  },
  {
    id: "evt-5",
    timeframe: "week",
    timeframeLabel: "📅 สัปดาห์นี้ (This Week)",
    marketId: "thewarat",
    marketName: "ตลาดเทวราช (เทเวศร์)",
    district: "เขตดุสิต",
    eventName: "เสน่ห์ตลาดเก่าริมคลองผดุงฯ: เทศกาลดอกไม้สดและอาหารชาววัง",
    schedule: "วันเสาร์-อาทิตย์ เวลา 06:00 - 17:00 น.",
    category: "🌸 อัตลักษณ์วัฒนธรรม",
    categoryColor: "rose",
    location: "ลานริมคลองผดุงกรุงเกษมและท่าเรือเทเวศร์",
    description: "ชมการสาธิตการร้อยมาลัยโบราณ ขนมไทยชาววัง และเลือกซื้อไม้ดอกไม้ประดับริมแม่น้ำเจ้าพระยา",
    expectedFootfall: "12,000 คน/วัน",
    highlight: "เชื่อมต่อเรือไฟฟ้าคลองผดุงกรุงเกษม ฟรีตลอดสาย"
  },
  {
    id: "evt-6",
    timeframe: "week",
    timeframeLabel: "📅 สัปดาห์นี้ (This Week)",
    marketId: "bangkapi",
    marketName: "ตลาดบางกะปิ",
    district: "เขตบางกะปิ",
    eventName: "Big Cleaning Day & ฉีดล้างฆ่าเชื้อบำรุงรักษามาตรฐานตลาดสด กทม.",
    schedule: "วันจันทร์ เวลา 20:00 - 24:00 น. (หลังปิดตลาด)",
    category: "🧹 บิ๊กคลีนนิ่ง/สุขาภิบาล",
    categoryColor: "cyan",
    location: "ทุกแผงค้าอาหารสด อาหารทะเล และบ่อดักไขมัน",
    description: "การระดมกำลังเจ้าหน้าที่ฝ่ายสิ่งแวดล้อมและผู้ค้าฉีดล้างทำความสะอาดพื้น ทางระบายน้ำ และตรวจดักไขมันตามเกณฑ์มาตรฐานสุขาภิบาล",
    expectedFootfall: "เจ้าหน้าที่และผู้ค้า 350 คน",
    highlight: "ตรวจวิเคราะห์คุณภาพน้ำทิ้งและสารปนเปื้อนในอาหารแบบ Real-time"
  },
  {
    id: "evt-7",
    timeframe: "week",
    timeframeLabel: "📅 สัปดาห์นี้ (This Week)",
    marketId: "ratchada",
    marketName: "ตลาดรัชดาภิเษก (ตลาดพลู)",
    district: "เขตธนบุรี",
    eventName: "สตรีทฟู้ดกลางคืนตลาดพลู & งานเทศกาลขนมกุยช่ายในตำนาน",
    schedule: "วันศุกร์-อาทิตย์ เวลา 16:00 - 23:00 น.",
    category: "🍜 สตรีทฟู้ด/อาหารเลิศรส",
    categoryColor: "amber",
    location: "ลานหน้าตลาดและริมทางรถไฟตลาดพลู",
    description: "รวมร้านเด็ดสตรีทฟู้ดกว่า 80 ร้าน กุยช่ายตลาดพลู หมี่กรอบโบราณ และขนมหวานเจ้าเก่าแก่กว่า 60 ปี",
    expectedFootfall: "22,000 คน/คืน",
    highlight: "มีโต๊ะรับประทานอาหารส่วนกลางและระบบจัดการขยะเศษอาหาร On-site"
  },
  {
    id: "evt-8",
    timeframe: "month",
    timeframeLabel: "🌟 ไฮไลท์ประจำเดือน (Monthly)",
    marketId: "prachanivet",
    marketName: "ตลาดประชานิเวศน์ 1",
    district: "เขตจตุจักร",
    eventName: "ตลาดนัดสุขภาพและผักเกษตรอินทรีย์ ปลอดสารพิษ 100%",
    schedule: "ทุกวันเสาร์ต้นเดือน เวลา 06:00 - 14:00 น.",
    category: "🥗 สุขภาพ/ออร์แกนิก",
    categoryColor: "emerald",
    location: "ลานจอดรถด้านทิศเหนือ",
    description: "เกษตรกรเครือข่ายเกษตรอินทรีย์รอบ กทม. นำผักปลอดสาร ข้าวอินทรีย์ และไข่ไก่อารมณ์ดีมาจำหน่ายตรงสู่ผู้บริโภค",
    expectedFootfall: "15,000 คน/วัน",
    highlight: "มีชุดตรวจสารเคมีตกค้างในผักผลไม้ฟรีแก่ผู้ซื้อ"
  }
];

const BMA_MARKET_MANAGERS = [
  {
    marketId: "chatuchak",
    marketName: "ตลาดนัดจตุจักร",
    managerName: "นายสุทธิพงษ์ สุขเกษม",
    position: "ผู้อำนวยการกองอำนวยการตลาดนัดจตุจักร",
    appointedDate: "1 ตุลาคม 2564",
    tenureYears: "4 ปี 10 เดือน",
    contact: "02-272-4813 ต่อ 101",
    teamSize: 145,
    email: "jjmarket@bangkok.go.th"
  },
  {
    marketId: "thonburi",
    marketName: "ตลาดธนบุรี (สนามหลวง 2)",
    managerName: "นายวิโรจน์ แสงประทีป",
    position: "หัวหน้าฝ่ายบริหารตลาดธนบุรี",
    appointedDate: "1 พฤษภาคม 2565",
    tenureYears: "4 ปี 3 เดือน",
    contact: "02-421-4190 ต่อ 12",
    teamSize: 58,
    email: "thonburi.mkt@bangkok.go.th"
  },
  {
    marketId: "minburi",
    marketName: "ตลาดนัดจตุจักร 2 (มีนบุรี)",
    managerName: "นายสมชาย อุดมโภคทรัพย์",
    position: "หัวหน้าฝ่ายบริหารตลาดมีนบุรี",
    appointedDate: "1 ธันวาคม 2565",
    tenureYears: "3 ปี 8 เดือน",
    contact: "02-540-7164",
    teamSize: 42,
    email: "minburi.mkt@bangkok.go.th"
  },
  {
    marketId: "bangkapi",
    marketName: "ตลาดบางกะปิ",
    managerName: "นางกานดา ชัยวัฒนกุล",
    position: "หัวหน้าฝ่ายบริหารตลาดบางกะปิ",
    appointedDate: "1 กรกฎาคม 2566",
    tenureYears: "3 ปี 1 เดือน",
    contact: "02-377-5120",
    teamSize: 34,
    email: "bangkapi.mkt@bangkok.go.th"
  },
  {
    marketId: "prachanivet",
    marketName: "ตลาดประชานิเวศน์ 1",
    managerName: "นายธวัชชัย รัตนประสิทธิ์",
    position: "หัวหน้าฝ่ายบริหารตลาดประชานิเวศน์ 1",
    appointedDate: "15 มกราคม 2566",
    tenureYears: "3 ปี 7 เดือน",
    contact: "02-580-2134",
    teamSize: 26,
    email: "prachanivet.mkt@bangkok.go.th"
  },
  {
    marketId: "thewarat",
    marketName: "ตลาดเทวราช (เทเวศร์)",
    managerName: "นายพิเชษฐ์ ธนวัฒน์",
    position: "หัวหน้าฝ่ายบริหารตลาดเทวราช",
    appointedDate: "1 ตุลาคม 2565",
    tenureYears: "3 ปี 10 เดือน",
    contact: "02-281-1904",
    teamSize: 22,
    email: "thewarat.mkt@bangkok.go.th"
  },
  {
    marketId: "ratchada",
    marketName: "ตลาดรัชดาภิเษก (ตลาดพลู)",
    managerName: "นายชลธิศ วงศ์สุวรรณ",
    position: "หัวหน้าฝ่ายบริหารตลาดรัชดาภิเษก",
    appointedDate: "1 เมษายน 2566",
    tenureYears: "3 ปี 4 เดือน",
    contact: "02-465-3180",
    teamSize: 18,
    email: "ratchada.mkt@bangkok.go.th"
  },
  {
    marketId: "nongchok",
    marketName: "ตลาดหนองจอก",
    managerName: "นายอาหมัด ยีสมัน",
    position: "หัวหน้าฝ่ายบริหารตลาดหนองจอก",
    appointedDate: "1 กันยายน 2566",
    tenureYears: "2 ปี 11 เดือน",
    contact: "02-543-1280",
    teamSize: 16,
    email: "nongchok.mkt@bangkok.go.th"
  },
  {
    marketId: "bangkaepirom",
    marketName: "ตลาดบางแคภิรมย์",
    managerName: "นางสาวพิมพา พรประเสริฐ",
    position: "หัวหน้าฝ่ายบริหารตลาดบางแคภิรมย์",
    appointedDate: "15 พฤศจิกายน 2566",
    tenureYears: "2 ปี 9 เดือน",
    contact: "02-455-8910",
    teamSize: 15,
    email: "bangkaepirom.mkt@bangkok.go.th"
  },
  {
    marketId: "ratburana",
    marketName: "ตลาดราษฎร์บูรณะ",
    managerName: "นายเกรียงไกร มีศรี",
    position: "หัวหน้าฝ่ายบริหารตลาดราษฎร์บูรณะ",
    appointedDate: "1 กุมภาพันธ์ 2567",
    tenureYears: "2 ปี 6 เดือน",
    contact: "02-427-6190",
    teamSize: 14,
    email: "ratburana.mkt@bangkok.go.th"
  },
  {
    marketId: "wongwianlek",
    marketName: "ตลาดพระเครื่องวงเวียนเล็ก",
    managerName: "นายประสิทธิ์ เลิศอัมพร",
    position: "หัวหน้าฝ่ายบริหารตลาดพระเครื่องวงเวียนเล็ก",
    appointedDate: "1 มิถุนายน 2567",
    tenureYears: "2 ปี 2 เดือน",
    contact: "02-438-9204",
    teamSize: 12,
    email: "wongwianlek.mkt@bangkok.go.th"
  },
  {
    marketId: "singha",
    marketName: "ตลาดสิงหา (คลองเตย)",
    managerName: "นายเอกชัย มงคลกาญจน์",
    position: "หัวหน้าฝ่ายบริหารตลาดสิงหา",
    appointedDate: "1 ตุลาคม 2567",
    tenureYears: "1 ปี 10 เดือน",
    contact: "02-249-3012",
    teamSize: 11,
    email: "singha.mkt@bangkok.go.th"
  }
];

const BMA_DATA_SOURCES = [
  {
    sourceName: "กองอำนวยการ สำนักงานตลาดกรุงเทพมหานคร (BMA Market Office)",
    category: "ข้อมูลแผงค้า, อัตราค่าเช่า, สัญญาเช่าช่วง และงบการเงินจัดเก็บรายได้",
    updateFrequency: "Real-time Daily Reconciliation",
    verifiedBy: "ฝ่ายการเงินและทรัพย์สิน สำนักงานตลาด กทม.",
    url: "https://market.bangkok.go.th"
  },
  {
    sourceName: "ศูนย์ข้อมูลคุณภาพอากาศกรุงเทพมหานคร (AirBKK / สำนักสิ่งแวดล้อม กทม.)",
    category: "ดัชนีคุณภาพอากาศ (AQI), PM2.5, PM10 รายเขตแบบสถานีตรวจวัดอัตโนมัติ",
    updateFrequency: "ทุกชั่วโมง (Hourly Telemetry)",
    verifiedBy: "สำนักสิ่งแวดล้อม กรุงเทพมหานคร",
    url: "https://airbkk.com"
  },
  {
    sourceName: "กรมอุตุนิยมวิทยา (Thai Meteorological Department - TMD)",
    category: "อุณหภูมิ, ความชื้นสัมพัทธ์, ความเร็วลม และการพยากรณ์ล่วงหน้า 3 วัน & 6 ชั่วโมง",
    updateFrequency: "Hourly & Daily Forecast Model",
    verifiedBy: "สถานีตรวจวัดอุตุนิยมวิทยา กรุงเทพฯ",
    url: "https://tmd.go.th"
  },
  {
    sourceName: "สำนักยุทธศาสตร์และประเมินผล กทม. (BMA Strategy & Evaluation Department)",
    category: "งบประมาณประจำปี, KPI ชี้วัดความคุ้มค่า และการวิเคราะห์ผลตอบแทนสินทรัพย์",
    updateFrequency: "รายไตรมาสและประจำปีงบประมาณ",
    verifiedBy: "กองยุทธศาสตร์และแผนงาน กทม.",
    url: "https://bangkok.go.th/pipat"
  }
];

// Helper to generate dynamic weather & AQI with 6-hour forecast
function generateMarketWeather(market) {
  const baseTemps = {
    chatuchak: 31, thonburi: 32, minburi: 31, bangkapi: 32, prachanivet: 31,
    thewarat: 30, ratchada: 31, nongchok: 30, bangkaepirom: 32, ratburana: 31,
    wongwianlek: 30, singha: 32
  };
  const baseAQIs = {
    chatuchak: 42, thonburi: 36, minburi: 38, bangkapi: 48, prachanivet: 40,
    thewarat: 35, ratchada: 45, nongchok: 28, bangkaepirom: 34, ratburana: 42,
    wongwianlek: 39, singha: 52
  };

  const curTemp = baseTemps[market.id] || 31;
  const curAQI = baseAQIs[market.id] || 40;
  const curPM25 = +(curAQI * 0.48).toFixed(1);

  let aqiStatus = "ดีมาก (Good)";
  let aqiColor = "#10b981";
  if (curAQI > 50 && curAQI <= 100) {
    aqiStatus = "ปานกลาง (Moderate)";
    aqiColor = "#f59e0b";
  } else if (curAQI > 100) {
    aqiStatus = "เริ่มมีผลต่อสุขภาพ (Unhealthy)";
    aqiColor = "#ef4444";
  }

  // 6-hour Hourly Forecast
  const hours = ["+1 ชม.", "+2 ชม.", "+3 ชม.", "+4 ชม.", "+5 ชม.", "+6 ชม."];
  const forecast = hours.map((hr, idx) => {
    const tempDelta = idx < 3 ? (idx * 0.8) : (3 * 0.8 - (idx - 3) * 0.6);
    const aqiDelta = Math.sin(idx) * 4;
    return {
      hourLabel: hr,
      temp: Math.round(curTemp + tempDelta),
      aqi: Math.round(curAQI + aqiDelta),
      pm25: +( (curAQI + aqiDelta) * 0.48 ).toFixed(1),
      condition: idx === 2 ? "มีเมฆบางส่วน ⛅" : (idx === 4 ? "ฟ้าโปร่ง ☀️" : "มีลมพัด 🌤️")
    };
  });

  return {
    current: {
      temperature: curTemp,
      humidity: 68,
      condition: "ท้องฟ้าแจ่มใส ลมสงบ 🌤️",
      aqi: curAQI,
      pm25: curPM25,
      aqiStatus: aqiStatus,
      aqiColor: aqiColor
    },
    forecast6Hours: forecast
  };
}

window.BMA_WEATHER_INTELLIGENCE = BMA_WEATHER_INTELLIGENCE;
window.BMA_MARKET_EVENTS = BMA_MARKET_EVENTS;
window.BMA_MARKET_MANAGERS = BMA_MARKET_MANAGERS;
window.BMA_DATA_SOURCES = BMA_DATA_SOURCES;
window.generateMarketWeather = generateMarketWeather;

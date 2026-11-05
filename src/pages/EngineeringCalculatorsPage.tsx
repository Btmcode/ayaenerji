import React, { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import MobileCallBar from "../components/MobileCallBar";
import AdBanner from "../components/AdBanner";
import {
  Calculator,
  Zap,
  BatteryCharging,
  Gauge,
  Sun,
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  Printer,
  ShieldCheck,
  BookOpen,
  Info,
  PhoneCall,
  MessageCircle,
  HelpCircle,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { defaultAuthor, defaultReviewer } from "../data/authors";
import { sendTelegramAnalyticsAlert } from "../utils/telegramClient";

export default function EngineeringCalculatorsPage() {
  const [activeTab, setActiveTab] = useState<
    "kablo" | "wallbox" | "pano" | "solar" | "aydinlatma"
  >("kablo");

  const [copied, setCopied] = useState(false);

  // ----------------------------------------------------
  // 1. KABLO KESİTİ & GERİLİM DÜŞÜMÜ STATE
  // ----------------------------------------------------
  const [kabloSystem, setKabloSystem] = useState<"monofaze" | "trifaze">("monofaze");
  const [kabloMaterial, setKabloMaterial] = useState<"bakir" | "aluminyum">("bakir");
  const [kabloPowerKW, setKabloPowerKW] = useState<number>(7.4);
  const [kabloLengthM, setKabloLengthM] = useState<number>(25);
  const [kabloCosPhi, setKabloCosPhi] = useState<number>(0.95);
  const [kabloMaxDropPercent, setKabloMaxDropPercent] = useState<number>(3.0); // 3% priz/aydinlatma

  // ----------------------------------------------------
  // 2. EV WALLBOX ŞARJ STATE
  // ----------------------------------------------------
  const [evBatteryKWh, setEvBatteryKWh] = useState<number>(77);
  const [evCurrentPercent, setEvCurrentPercent] = useState<number>(20);
  const [evTargetPercent, setEvTargetPercent] = useState<number>(80);
  const [evChargerPowerKW, setEvChargerPowerKW] = useState<number>(11); // 11 kW standard trifaze
  const [evEfficiencyPercent, setEvEfficiencyPercent] = useState<number>(90);

  // ----------------------------------------------------
  // 3. PANO KURULU GÜÇ & SİGORTA AMPER STATE
  // ----------------------------------------------------
  const [loadItems, setLoadItems] = useState([
    { id: "klima", name: "Inverter Klima (2x Salon/Oda)", powerKW: 3.5, active: true },
    { id: "kombi", name: "Kombi & Sirkülasyon Pompası", powerKW: 0.3, active: true },
    { id: "firin", name: "Ankastre Fırın & Mikrodalga", powerKW: 2.5, active: true },
    { id: "ocak", name: "İndüksiyonlu Ocak", powerKW: 7.2, active: false },
    { id: "camasir", name: "Çamaşır & Kurutma Makinesi", powerKW: 2.8, active: true },
    { id: "bulasik", name: "Bulaşık Makinesi", powerKW: 2.0, active: true },
    { id: "sofben", name: "Termosifon / Elektrikli Şofben", powerKW: 7.0, active: false },
    { id: "wallbox", name: "EV Wallbox Şarj İstasyonu", powerKW: 11.0, active: false },
    { id: "aydinlatma", name: "LED Aydınlatma & Küçük Ev Aletleri", powerKW: 1.5, active: true }
  ]);
  const [demandFactor, setDemandFactor] = useState<number>(0.65); // Eşzamanlılık katsayısı

  // ----------------------------------------------------
  // 4. GÜNEŞ ENERJİSİ (SOLAR ÇATI) STATE
  // ----------------------------------------------------
  const [solarMonthlyBillTL, setSolarMonthlyBillTL] = useState<number>(3500);
  const [solarRegion, setSolarRegion] = useState<"marmara" | "ege" | "akdeniz" | "ic_anadolu">("marmara");
  const [solarElectricityPriceKWh, setSolarElectricityPriceKWh] = useState<number>(3.25); // TL/kWh ortalama mesken/ticarethane

  // ----------------------------------------------------
  // 5. AYDINLATMA LÜMEN & LÜKS STATE
  // ----------------------------------------------------
  const [roomType, setRoomType] = useState<
    "salon" | "mutfak" | "ofis" | "yatak" | "banyo" | "magaza" | "atolye" | "koridor"
  >("ofis");
  const [roomWidthM, setRoomWidthM] = useState<number>(4);
  const [roomLengthM, setRoomLengthM] = useState<number>(5);
  const [bulbWattChoice, setBulbWattChoice] = useState<number>(12); // 12W LED ~ 1100 lm

  // ====================================================
  // CALCULATIONS
  // ====================================================

  // 1. KABLO KESİTİ & GERİLİM DÜŞÜMÜ HESAPLARI
  const kabloCalculation = useMemo(() => {
    // Conductivity: Copper kappa = 56 m / (ohm * mm2), Aluminum kappa = 35
    const kappa = kabloMaterial === "bakir" ? 56 : 35;
    const voltage = kabloSystem === "monofaze" ? 230 : 400;
    const powerWatts = kabloPowerKW * 1000;

    // Current: Monofaze I = P / (U * cosPhi), Trifaze I = P / (sqrt(3) * U * cosPhi)
    const current =
      kabloSystem === "monofaze"
        ? powerWatts / (voltage * kabloCosPhi)
        : powerWatts / (Math.sqrt(3) * voltage * kabloCosPhi);

    // Standard cross-sections (mm2)
    const standardSections = [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120];

    // Current carrying capacities roughly (TS IEC 60364-5-52 Copper in conduit / wall)
    const maxAmpsCopper: Record<number, number> = {
      1.5: 16.5,
      2.5: 23,
      4: 30,
      6: 38,
      10: 52,
      16: 69,
      25: 90,
      35: 111,
      50: 133,
      70: 168,
      95: 201,
      120: 232
    };

    // Calculate voltage drop for each cross section
    // Formula for %e:
    // Monofaze: %e = (2 * 100 * L * P) / (kappa * S * U^2)
    // Trifaze: %e = (100 * L * P) / (kappa * S * U^2)
    const results = standardSections.map((s) => {
      let percentDrop = 0;
      if (kabloSystem === "monofaze") {
        percentDrop = (2 * 100 * kabloLengthM * powerWatts) / (kappa * s * voltage * voltage);
      } else {
        percentDrop = (100 * kabloLengthM * powerWatts) / (kappa * s * voltage * voltage);
      }
      const voltDrop = (percentDrop / 100) * voltage;
      const thermalAmp = (maxAmpsCopper[s] || 25) * (kabloMaterial === "aluminyum" ? 0.78 : 1.0);
      const thermalOk = thermalAmp >= current;
      const dropOk = percentDrop <= kabloMaxDropPercent;

      return {
        section: s,
        percentDrop: Number(percentDrop.toFixed(2)),
        voltDrop: Number(voltDrop.toFixed(1)),
        thermalAmp: Number(thermalAmp.toFixed(1)),
        thermalOk,
        dropOk,
        suitable: thermalOk && dropOk
      };
    });

    const recommended = results.find((r) => r.suitable) || results[results.length - 1];

    return {
      current: Number(current.toFixed(1)),
      voltage,
      kappa,
      results,
      recommended
    };
  }, [kabloSystem, kabloMaterial, kabloPowerKW, kabloLengthM, kabloCosPhi, kabloMaxDropPercent]);

  // 2. EV WALLBOX ŞARJ HESAPLARI
  const evCalculation = useMemo(() => {
    const socDelta = Math.max(0, evTargetPercent - evCurrentPercent);
    const requiredEnergyKWh = (evBatteryKWh * socDelta) / 100;
    const realChargingPowerKW = evChargerPowerKW * (evEfficiencyPercent / 100);
    const hoursNeeded = realChargingPowerKW > 0 ? requiredEnergyKWh / realChargingPowerKW : 0;

    const wholeHours = Math.floor(hoursNeeded);
    const minutes = Math.round((hoursNeeded - wholeHours) * 60);

    // Approximate range gain assuming 17 kWh per 100 km average consumption
    const averageConsumptionPer100Km = 17;
    const totalKmGained = (requiredEnergyKWh / averageConsumptionPer100Km) * 100;
    const kmPerHour = (realChargingPowerKW / averageConsumptionPer100Km) * 100;

    // Cable & Breaker suggestion
    let cableRecommendation = "3x2.5 mm²";
    let breakerRecommendation = "16A B Tipi (Monofaze)";
    let rcdRecommendation = "30mA Tip A (6mA DC korumalı) veya Tip B";

    if (evChargerPowerKW <= 3.7) {
      cableRecommendation = "3x2.5 mm² / 3x4 mm² NYY/Halogen-Free";
      breakerRecommendation = "16A / 20A C Tipi Monofaze";
    } else if (evChargerPowerKW <= 7.4) {
      cableRecommendation = "3x6 mm² / 3x10 mm² NYY Bakır";
      breakerRecommendation = "32A / 40A C Tipi Monofaze";
    } else if (evChargerPowerKW <= 11) {
      cableRecommendation = "5x4 mm² / 5x6 mm² NYY Trifaze";
      breakerRecommendation = "16A / 20A 3 Fazlı C Tipi Otomat";
    } else {
      cableRecommendation = "5x6 mm² / 5x10 mm² NYY Trifaze";
      breakerRecommendation = "32A / 40A 3 Fazlı C Tipi Otomat";
    }

    return {
      requiredEnergyKWh: Number(requiredEnergyKWh.toFixed(1)),
      wholeHours,
      minutes,
      totalKmGained: Math.round(totalKmGained),
      kmPerHour: Math.round(kmPerHour),
      cableRecommendation,
      breakerRecommendation,
      rcdRecommendation
    };
  }, [evBatteryKWh, evCurrentPercent, evTargetPercent, evChargerPowerKW, evEfficiencyPercent]);

  // 3. PANO KURULU GÜÇ & SİGORTA AMPER HESAPLARI
  const panoCalculation = useMemo(() => {
    const totalInstalledPowerKW = loadItems
      .filter((i) => i.active)
      .reduce((acc, curr) => acc + curr.powerKW, 0);

    const demandPowerKW = totalInstalledPowerKW * demandFactor;
    // Assuming Trifaze 400V for high load (>10kW) or Monofaze 230V for standard loads
    const isTrifazeRecommended = demandPowerKW > 9 || totalInstalledPowerKW > 12;

    const currentMonofaze = (demandPowerKW * 1000) / (230 * 0.95);
    const currentTrifaze = (demandPowerKW * 1000) / (Math.sqrt(3) * 400 * 0.9);

    let recommendedBreaker = "40A Monofaze B Tipi";
    let mainCable = "3x10 mm² Bakır";

    if (isTrifazeRecommended) {
      if (currentTrifaze <= 25) {
        recommendedBreaker = "25A / 32A 3 Fazlı C Tipi";
        mainCable = "5x6 mm² Bakır";
      } else if (currentTrifaze <= 40) {
        recommendedBreaker = "40A 3 Fazlı C Tipi";
        mainCable = "5x10 mm² Bakır";
      } else if (currentTrifaze <= 63) {
        recommendedBreaker = "63A 3 Fazlı C Tipi";
        mainCable = "5x16 mm² Bakır";
      } else {
        recommendedBreaker = "80A / 100A Kompakt Şalter (TMŞ)";
        mainCable = "5x25 mm² - 5x35 mm²";
      }
    } else {
      if (currentMonofaze <= 25) {
        recommendedBreaker = "25A / 32A Monofaze B Tipi";
        mainCable = "3x6 mm² Bakır";
      } else if (currentMonofaze <= 40) {
        recommendedBreaker = "40A Monofaze B/C Tipi";
        mainCable = "3x10 mm² Bakır";
      } else {
        recommendedBreaker = "50A / 63A Monofaze veya Trifazeye Geçiş";
        mainCable = "3x16 mm² Bakır";
      }
    }

    return {
      totalInstalledPowerKW: Number(totalInstalledPowerKW.toFixed(2)),
      demandPowerKW: Number(demandPowerKW.toFixed(2)),
      isTrifazeRecommended,
      operatingCurrent: Number(
        (isTrifazeRecommended ? currentTrifaze : currentMonofaze).toFixed(1)
      ),
      recommendedBreaker,
      mainCable
    };
  }, [loadItems, demandFactor]);

  // 4. GÜNEŞ ENERJİSİ (SOLAR ÇATI) HESAPLARI
  const solarCalculation = useMemo(() => {
    // Monthly kWh used
    const monthlyKWh = solarElectricityPriceKWh > 0 ? solarMonthlyBillTL / solarElectricityPriceKWh : 0;
    const annualKWh = monthlyKWh * 12;

    // Specific yield (kWh per kWp per year)
    const yieldByRegion: Record<string, number> = {
      marmara: 1350,
      ege: 1600,
      akdeniz: 1680,
      ic_anadolu: 1480
    };
    const specificYield = yieldByRegion[solarRegion] || 1350;

    // Required kWp to offset 100% of bill
    const requiredKWp = specificYield > 0 ? annualKWh / specificYield : 0;

    // 550W Half-cut panel count
    const panelWatt = 550;
    const panelCount = Math.ceil((requiredKWp * 1000) / panelWatt);
    const realInstalledKWp = Number(((panelCount * panelWatt) / 1000).toFixed(2));

    // Roof area needed: ~2.58 m2 per 550W panel + %15 walkway/spacing margin
    const roofAreaM2 = Math.round(panelCount * 2.6 * 1.15);

    // Inverter size
    const inverterKW = Math.ceil(realInstalledKWp * 0.9);

    // Financial savings
    const annualSavingsTL = Math.round(annualKWh * solarElectricityPriceKWh);
    // CO2 avoided: ~0.45 kg CO2 per kWh green energy
    const co2SavedKg = Math.round(annualKWh * 0.45);

    return {
      monthlyKWh: Math.round(monthlyKWh),
      annualKWh: Math.round(annualKWh),
      requiredKWp: Number(requiredKWp.toFixed(2)),
      realInstalledKWp,
      panelCount,
      roofAreaM2,
      inverterKW,
      annualSavingsTL,
      co2SavedKg
    };
  }, [solarMonthlyBillTL, solarRegion, solarElectricityPriceKWh]);

  // 5. AYDINLATMA LÜMEN & LÜKS HESAPLARI
  const lightingCalculation = useMemo(() => {
    const luxTable: Record<string, { label: string; lux: number; desc: string }> = {
      salon: { label: "Salon / Yaşam Alanı", lux: 150, desc: "Dinlenme ve genel aydınlatma konforu" },
      mutfak: { label: "Mutfak / Yemek Alanı", lux: 300, desc: "Tezgah ve hazırlık alanında net görüş" },
      ofis: { label: "Çalışma Odası & Ofis", lux: 500, desc: "TS EN 12464-1 ekran ve okuma standardı" },
      yatak: { label: "Yatak Odası", lux: 120, desc: "Yumuşak, göz yormayan ambiyans ışığı" },
      banyo: { label: "Banyo / Islak Hacim", lux: 200, desc: "Ayna önü ve genel aydınlatma" },
      magaza: { label: "Mağaza & Perakende Vitrin", lux: 750, desc: "Ürün detaylarını öne çıkaran parlaklık" },
      atolye: { label: "Atölye & İmalat / Şantiye", lux: 600, desc: "Hassas montaj ve iş güvenliği seviyesi" },
      koridor: { label: "Koridor & Merdiven Boşluğu", lux: 100, desc: "Güvenli sirkülasyon aydınlatması" }
    };

    const targetLux = luxTable[roomType]?.lux || 300;
    const roomAreaM2 = roomWidthM * roomLengthM;

    // Utilization factor UF ~ 0.55, Maintenance factor MF ~ 0.8
    // Total Lumens = (Lux * Area) / (UF * MF)
    const totalLumens = Math.round((targetLux * roomAreaM2) / (0.55 * 0.8));

    // LED Lumen efficiency: ~90-100 lm/Watt
    const lumensPerBulb = bulbWattChoice * 95;
    const bulbCount = Math.max(1, Math.ceil(totalLumens / lumensPerBulb));
    const totalWatt = bulbCount * bulbWattChoice;

    return {
      targetLux,
      roomAreaM2: Number(roomAreaM2.toFixed(1)),
      totalLumens,
      bulbCount,
      totalWatt,
      selectedInfo: luxTable[roomType]
    };
  }, [roomType, roomWidthM, roomLengthM, bulbWattChoice]);

  // Copy Summary Helper
  const handleCopySummary = () => {
    let summaryText = "";
    if (activeTab === "kablo") {
      summaryText = `[Aya Elektrik - Kablo Kesiti & Gerilim Düşümü Hesabı]\nSistem: ${kabloSystem === "monofaze" ? "Monofaze (230V)" : "Trifaze (400V)"}\nİletken: ${kabloMaterial === "bakir" ? "Bakır (Cu)" : "Alüminyum (Al)"}\nGüç: ${kabloPowerKW} kW | Hat Mesafesi: ${kabloLengthM} m\nÇekilen Akım: ${kabloCalculation.current} A\nÖnerilen Kesit: ${kabloCalculation.recommended.section} mm²\nGerilim Düşümü: %${kabloCalculation.recommended.percentDrop} (${kabloCalculation.recommended.voltDrop} V)\nStandart: TSE HD 60364 & TS IEC 60364-5-52\nDetay: https://ayaelektrik.com/hesaplama-araclari`;
    } else if (activeTab === "wallbox") {
      summaryText = `[Aya Elektrik - EV Wallbox Şarj Hesabı]\nBatarya: ${evBatteryKWh} kWh (%${evCurrentPercent} -> %${evTargetPercent})\nŞarj Gücü: ${evChargerPowerKW} kW\nGereken Enerji: ${evCalculation.requiredEnergyKWh} kWh\nŞarj Süresi: ~${evCalculation.wholeHours} Saat ${evCalculation.minutes} Dakika\nKazanılan Menzil: ~${evCalculation.totalKmGained} km\nÖnerilen Kablo: ${evCalculation.cableRecommendation}\nÖnerilen Sigorta: ${evCalculation.breakerRecommendation}\nStandart: TS EN 61851 & IEC 62752\nDetay: https://ayaelektrik.com/hesaplama-araclari`;
    } else if (activeTab === "pano") {
      summaryText = `[Aya Elektrik - Pano Yükü & Sigorta Seçimi Hesabı]\nToplam Kurulu Güç: ${panoCalculation.totalInstalledPowerKW} kW\nTalep Gücü (Eşzamanlı): ${panoCalculation.demandPowerKW} kW\nSistem Tipi: ${panoCalculation.isTrifazeRecommended ? "Trifaze (3 Fazlı)" : "Monofaze (Tek Fazlı)"}\nİşletme Akımı: ${panoCalculation.operatingCurrent} A\nÖnerilen Ana Sigorta: ${panoCalculation.recommendedBreaker}\nÖnerilen Besleme Kablosu: ${panoCalculation.mainCable}\nStandart: TS EN 61439 Pano Standartları\nDetay: https://ayaelektrik.com/hesaplama-araclari`;
    } else if (activeTab === "solar") {
      summaryText = `[Aya Elektrik - Çatı GES Solar Panel Hesabı]\nAylık Fatura: ${solarMonthlyBillTL} TL (~${solarCalculation.monthlyKWh} kWh/ay)\nBölge: ${solarRegion.toUpperCase()}\nGereken Kurulu Güç: ${solarCalculation.realInstalledKWp} kWp\nPanel Sayısı: ${solarCalculation.panelCount} Adet (550W Half-Cut)\nGereken Çatı Alanı: ~${solarCalculation.roofAreaM2} m²\nİnverter: ${solarCalculation.inverterKW} kW Hibrit\nYıllık Tasarruf: ~${solarCalculation.annualSavingsTL.toLocaleString("tr-TR")} TL\nDetay: https://ayaelektrik.com/hesaplama-araclari`;
    } else {
      summaryText = `[Aya Elektrik - Aydınlatma Lümen & Lüks Hesabı]\nMekan: ${lightingCalculation.selectedInfo?.label}\nAlan: ${lightingCalculation.roomAreaM2} m²\nHedef Lüks: ${lightingCalculation.targetLux} Lux\nGereken Toplam Lümen: ${lightingCalculation.totalLumens} lm\nÖnerilen Armatür: ${lightingCalculation.bulbCount} Adet ${bulbWattChoice}W LED (Toplam ${lightingCalculation.totalWatt}W)\nStandart: TS EN 12464-1 İç Mekan Aydınlatma\nDetay: https://ayaelektrik.com/hesaplama-araclari`;
    }

    if (navigator.clipboard) {
      navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const getWhatsAppMessage = () => {
    const text = `Merhaba Aya Elektrik, web sitenizdeki Hesaplama Araçlarını kullandım. ${
      activeTab === "kablo"
        ? `Kablo Kesiti: ${kabloPowerKW} kW, ${kabloLengthM} m mesafe için ${kabloCalculation.recommended.section} mm² çıktı.`
        : activeTab === "wallbox"
        ? `EV Şarj: ${evChargerPowerKW} kW Wallbox altyapısı ve kablo montajı rica ediyorum.`
        : activeTab === "pano"
        ? `Pano Revizyonu: ${panoCalculation.demandPowerKW} kW talep gücü için ana şalter ve kaçak akım kontrolü istiyorum.`
        : activeTab === "solar"
        ? `Çatı GES: Aylık ${solarMonthlyBillTL} TL fatura için ${solarCalculation.realInstalledKWp} kWp panel kurulumu teklifi istiyorum.`
        : `Aydınlatma: ${lightingCalculation.roomAreaM2} m² alan için profesyonel armatür montajı talep ediyorum.`
    } Yerinde teknik keşif ve fiyat teklifi alabilir miyim?`;
    return encodeURIComponent(text);
  };

  // Structured Data Schema for Engineering Tools
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Aya Elektrik Hesaplama Araçları",
    "url": "https://ayaelektrik.com/hesaplama-araclari",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "All",
    "description":
      "Elektrik hesaplama araçları: Kablo kesiti ve gerilim düşümü hesabı, EV Wallbox şarj süresi, pano kurulu gücü ve sigorta amper seçimi, güneş paneli çatı GES hesabı ve aydınlatma lümen/lüks simülasyonu.",
    "author": {
      "@type": "Person",
      "name": defaultAuthor.name,
      "jobTitle": defaultAuthor.title
    },
    "provider": {
      "@type": "Organization",
      "name": "Aya Elektrik",
      "url": "https://ayaelektrik.com"
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Helmet>
        <title>Elektrik Hesaplama Araçları | Kablo Kesiti, EV Şarj, Pano, Solar, Aydınlatma - Aya Elektrik</title>
        <meta
          name="description"
          content="TSE HD 60364 ve TS EN 61851 standartlarına uygun interaktif elektrik hesaplama araçları: Gerilim düşümü, kablo kesiti, EV Wallbox şarj süresi, pano gücü ve sigorta seçimi."
        />
        <link rel="canonical" href="https://ayaelektrik.com/hesaplama-araclari" />
        <meta property="og:title" content="Elektrik Hesaplama Araçları | Aya Elektrik" />
        <meta
          property="og:description"
          content="Kablo kesiti ve gerilim düşümü, EV şarj süresi, elektrik pano yükü, çatı güneş paneli ve aydınlatma lüks hesaplama araçları."
        />
        <meta property="og:url" content="https://ayaelektrik.com/hesaplama-araclari" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(toolSchema)}</script>
      </Helmet>

      <Navbar />

      <main className="flex-1 py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb Navigation */}
          <nav className="mb-6 flex items-center gap-2 text-xs text-slate-500">
            <Link to="/" className="hover:text-[#0b2e59] transition-colors">Ana Sayfa</Link>
            <span>/</span>
            <span className="text-slate-800 font-semibold">Hesaplama Araçları</span>
          </nav>

          {/* Hero Header */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0b2e59] via-[#082242] to-slate-950 text-white p-8 md:p-12 shadow-xl border border-slate-800 mb-10">
            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-bold mb-4">
                <Sparkles className="w-3.5 h-3.5 text-[#ffb703]" />
                <span>TSE HD 60364 &amp; IEC Uluslararası Normlarına Uygun</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-4">
                İnteraktif Elektrik Hesaplama Araçları
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                Elektrik tesisatı, EV şarj istasyonları, pano yenileme, çatı GES ve aydınlatma ihtiyaçlarınız için 
                teknik standartlarla çalışan, gerçek zamanlı pratik hesaplama ve simülasyon merkezi.
              </p>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-2 border-t border-white/10">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Yetkili Elektrik Ustaları</span>
                </div>
                <span className="text-white/30 hidden sm:inline">·</span>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#ffb703]" />
                  <span>Can & Yangın Güvenliği Toleransları</span>
                </div>
                <span className="text-white/30 hidden sm:inline">·</span>
                <div className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-blue-400" />
                  <span>Ücretsiz & Anlık Raporlama</span>
                </div>
              </div>
            </div>

            <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-10 pointer-events-none hidden lg:flex items-center justify-center">
              <Calculator className="w-80 h-80 text-white" />
            </div>
          </div>

          {/* Calculator Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-10">
            <button
              onClick={() => setActiveTab("kablo")}
              className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between min-h-[110px] ${
                activeTab === "kablo"
                  ? "bg-[#0b2e59] text-white border-[#0b2e59] shadow-lg shadow-[#0b2e59]/20"
                  : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    activeTab === "kablo"
                      ? "bg-white/15 text-[#ffb703]"
                      : "bg-amber-50 text-amber-600"
                  }`}
                >
                  <Zap className="w-5 h-5" />
                </div>
                {activeTab === "kablo" && (
                  <span className="text-[10px] font-bold bg-[#ffb703] text-slate-950 px-2 py-0.5 rounded-md">
                    Aktif
                  </span>
                )}
              </div>
              <div>
                <div className="font-extrabold text-xs sm:text-sm leading-snug">Kablo Kesiti & Gerilim Düşümü</div>
                <div className={`text-[11px] mt-0.5 ${activeTab === "kablo" ? "text-slate-300" : "text-slate-500"}`}>
                  Monofaze & Trifaze
                </div>
              </div>
            </button>

            <button
              onClick={() => setActiveTab("wallbox")}
              className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between min-h-[110px] ${
                activeTab === "wallbox"
                  ? "bg-[#0b2e59] text-white border-[#0b2e59] shadow-lg shadow-[#0b2e59]/20"
                  : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    activeTab === "wallbox"
                      ? "bg-white/15 text-[#ffb703]"
                      : "bg-emerald-50 text-emerald-600"
                  }`}
                >
                  <BatteryCharging className="w-5 h-5" />
                </div>
                {activeTab === "wallbox" && (
                  <span className="text-[10px] font-bold bg-[#ffb703] text-slate-950 px-2 py-0.5 rounded-md">
                    Aktif
                  </span>
                )}
              </div>
              <div>
                <div className="font-extrabold text-xs sm:text-sm leading-snug">EV Wallbox Şarj Süresi</div>
                <div className={`text-[11px] mt-0.5 ${activeTab === "wallbox" ? "text-slate-300" : "text-slate-500"}`}>
                  Saat, Güç & Menzil
                </div>
              </div>
            </button>

            <button
              onClick={() => setActiveTab("pano")}
              className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between min-h-[110px] ${
                activeTab === "pano"
                  ? "bg-[#0b2e59] text-white border-[#0b2e59] shadow-lg shadow-[#0b2e59]/20"
                  : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    activeTab === "pano"
                      ? "bg-white/15 text-[#ffb703]"
                      : "bg-blue-50 text-blue-600"
                  }`}
                >
                  <Gauge className="w-5 h-5" />
                </div>
                {activeTab === "pano" && (
                  <span className="text-[10px] font-bold bg-[#ffb703] text-slate-950 px-2 py-0.5 rounded-md">
                    Aktif
                  </span>
                )}
              </div>
              <div>
                <div className="font-extrabold text-xs sm:text-sm leading-snug">Pano Yükü & Sigorta Amperi</div>
                <div className={`text-[11px] mt-0.5 ${activeTab === "pano" ? "text-slate-300" : "text-slate-500"}`}>
                  Eşzamanlı Talep Gücü
                </div>
              </div>
            </button>

            <button
              onClick={() => setActiveTab("solar")}
              className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between min-h-[110px] ${
                activeTab === "solar"
                  ? "bg-[#0b2e59] text-white border-[#0b2e59] shadow-lg shadow-[#0b2e59]/20"
                  : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    activeTab === "solar"
                      ? "bg-white/15 text-[#ffb703]"
                      : "bg-orange-50 text-orange-600"
                  }`}
                >
                  <Sun className="w-5 h-5" />
                </div>
                {activeTab === "solar" && (
                  <span className="text-[10px] font-bold bg-[#ffb703] text-slate-950 px-2 py-0.5 rounded-md">
                    Aktif
                  </span>
                )}
              </div>
              <div>
                <div className="font-extrabold text-xs sm:text-sm leading-snug">Güneş Enerjisi (GES)</div>
                <div className={`text-[11px] mt-0.5 ${activeTab === "solar" ? "text-slate-300" : "text-slate-500"}`}>
                  Çatı Panel & Tasarruf
                </div>
              </div>
            </button>

            <button
              onClick={() => setActiveTab("aydinlatma")}
              className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between min-h-[110px] col-span-2 sm:col-span-1 ${
                activeTab === "aydinlatma"
                  ? "bg-[#0b2e59] text-white border-[#0b2e59] shadow-lg shadow-[#0b2e59]/20"
                  : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    activeTab === "aydinlatma"
                      ? "bg-white/15 text-[#ffb703]"
                      : "bg-yellow-50 text-yellow-600"
                  }`}
                >
                  <Lightbulb className="w-5 h-5" />
                </div>
                {activeTab === "aydinlatma" && (
                  <span className="text-[10px] font-bold bg-[#ffb703] text-slate-950 px-2 py-0.5 rounded-md">
                    Aktif
                  </span>
                )}
              </div>
              <div>
                <div className="font-extrabold text-xs sm:text-sm leading-snug">Aydınlatma Lümen & Lüks</div>
                <div className={`text-[11px] mt-0.5 ${activeTab === "aydinlatma" ? "text-slate-300" : "text-slate-500"}`}>
                  TS EN 12464-1 Standartı
                </div>
              </div>
            </button>
          </div>

          {/* ACTIVE CALCULATOR WORKSPACE */}
          <div className="grid lg:grid-cols-12 gap-8 mb-12">
            
            {/* Left 7 Cols: Input Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
              
              {/* TAB 1: KABLO KESİTİ */}
              {activeTab === "kablo" && (
                <div className="space-y-6">
                  <div className="border-b border-slate-100 pb-4">
                    <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-[#ffb703]" />
                      Kablo Kesiti & Gerilim Düşümü Parametreleri
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Elektrik İç Tesisleri Yönetmeliği ve TSE HD 60364 uyarınca hat uzunluğu ve güce göre iletken hesabı.
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Şebeke Sistemi
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setKabloSystem("monofaze");
                            if (kabloPowerKW > 12) setKabloPowerKW(7.4);
                          }}
                          className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                            kabloSystem === "monofaze"
                              ? "bg-[#0b2e59] text-white border-[#0b2e59]"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          Monofaze (230V)
                        </button>
                        <button
                          type="button"
                          onClick={() => setKabloSystem("trifaze")}
                          className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                            kabloSystem === "trifaze"
                              ? "bg-[#0b2e59] text-white border-[#0b2e59]"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          Trifaze (400V)
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        İletken Malzemesi
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setKabloMaterial("bakir")}
                          className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                            kabloMaterial === "bakir"
                              ? "bg-amber-600 text-white border-amber-600"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          Bakır (Cu - κ=56)
                        </button>
                        <button
                          type="button"
                          onClick={() => setKabloMaterial("aluminyum")}
                          className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                            kabloMaterial === "aluminyum"
                              ? "bg-slate-700 text-white border-slate-700"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          Alüminyum (Al - κ=35)
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Power Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Toplam Yük / Güç (kW)
                      </label>
                      <span className="text-base font-black text-[#0b2e59] bg-slate-100 px-3 py-1 rounded-lg">
                        {kabloPowerKW} kW ({Math.round(kabloPowerKW * 1000)} Watt)
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0.5}
                      max={kabloSystem === "monofaze" ? 15 : 75}
                      step={0.5}
                      value={kabloPowerKW}
                      onChange={(e) => setKabloPowerKW(parseFloat(e.target.value))}
                      className="w-full accent-[#0b2e59] cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>0.5 kW (Küçük Yük)</span>
                      <span>{kabloSystem === "monofaze" ? "15 kW (Maks Monofaze)" : "75 kW (Trifaze)"}</span>
                    </div>
                  </div>

                  {/* Length Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Hat / Kablo Mesafesi (Metre)
                      </label>
                      <span className="text-base font-black text-[#0b2e59] bg-slate-100 px-3 py-1 rounded-lg">
                        {kabloLengthM} Metre
                      </span>
                    </div>
                    <input
                      type="range"
                      min={3}
                      max={150}
                      step={1}
                      value={kabloLengthM}
                      onChange={(e) => setKabloLengthM(parseInt(e.target.value, 10))}
                      className="w-full accent-[#0b2e59] cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>3 m (Pano İçi)</span>
                      <span>50 m (Bina İçi)</span>
                      <span>150 m (Uzun Hat)</span>
                    </div>
                  </div>

                  {/* Tolerans ve Cos Phi */}
                  <div className="grid sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        İzin Verilen Maks. Gerilim Düşümü (%e)
                      </label>
                      <select
                        value={kabloMaxDropPercent}
                        onChange={(e) => setKabloMaxDropPercent(parseFloat(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-white"
                      >
                        <option value={1.5}>%1.5 - Hassas Cihazlar & Ana Besleme</option>
                        <option value={3.0}>%3.0 - TSE Standart Aydınlatma & Konut Prizi</option>
                        <option value={5.0}>%5.0 - Motor / Endüstriyel Tesisat</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Güç Faktörü (Cos φ)
                      </label>
                      <select
                        value={kabloCosPhi}
                        onChange={(e) => setKabloCosPhi(parseFloat(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-white"
                      >
                        <option value={0.98}>0.98 - Rezistif Yük (Isıtıcı, Şofben)</option>
                        <option value={0.95}>0.95 - Karışık Ev Tipi Yük (Önerilen)</option>
                        <option value={0.85}>0.85 - Endüktif / Motor & Kompresör</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: EV WALLBOX */}
              {activeTab === "wallbox" && (
                <div className="space-y-6">
                  <div className="border-b border-slate-100 pb-4">
                    <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                      <BatteryCharging className="w-5 h-5 text-emerald-600" />
                      Elektrikli Araç (EV) Wallbox Şarj Simülasyonu
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Araç batarya kapasitesi, şarj gücü ve şebeke altyapısına göre şarj süresi ve güvenlik gereksinimleri.
                    </p>
                  </div>

                  {/* Charger Preset Options */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Şarj Gücü Seçeneği
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { kw: 3.7, label: "3.7 kW", sub: "1 Faz 16A" },
                        { kw: 7.4, label: "7.4 kW", sub: "1 Faz 32A" },
                        { kw: 11, label: "11 kW", sub: "3 Faz 16A" },
                        { kw: 22, label: "22 kW", sub: "3 Faz 32A" }
                      ].map((item) => (
                        <button
                          key={item.kw}
                          type="button"
                          onClick={() => setEvChargerPowerKW(item.kw)}
                          className={`p-3 rounded-xl border text-center transition-all ${
                            evChargerPowerKW === item.kw
                              ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          <div className="font-extrabold text-sm">{item.label}</div>
                          <div className={`text-[10px] mt-0.5 ${evChargerPowerKW === item.kw ? "text-emerald-100" : "text-slate-500"}`}>
                            {item.sub}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Battery Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Araç Batarya Kapasitesi (kWh)
                      </label>
                      <span className="text-base font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg">
                        {evBatteryKWh} kWh
                      </span>
                    </div>
                    <input
                      type="range"
                      min={30}
                      max={120}
                      step={1}
                      value={evBatteryKWh}
                      onChange={(e) => setEvBatteryKWh(parseInt(e.target.value, 10))}
                      className="w-full accent-emerald-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>30 kWh (Hibrit / Küçük Şehir)</span>
                      <span>77 kWh (Togg T10X / Tesla M3 LR)</span>
                      <span>120 kWh (Lüks SUV)</span>
                    </div>
                  </div>

                  {/* SoC Range */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2 p-3.5 rounded-xl border border-slate-100 bg-slate-50/70">
                      <div className="flex justify-between text-xs font-bold text-slate-700">
                        <span>Başlangıç Şarjı (SoC)</span>
                        <span className="text-emerald-700">%{evCurrentPercent}</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={90}
                        step={5}
                        value={evCurrentPercent}
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10);
                          setEvCurrentPercent(val);
                          if (val >= evTargetPercent) setEvTargetPercent(Math.min(100, val + 10));
                        }}
                        className="w-full accent-emerald-600 cursor-pointer"
                      />
                    </div>

                    <div className="space-y-2 p-3.5 rounded-xl border border-slate-100 bg-slate-50/70">
                      <div className="flex justify-between text-xs font-bold text-slate-700">
                        <span>Hedef Şarjı (SoC)</span>
                        <span className="text-emerald-700">%{evTargetPercent}</span>
                      </div>
                      <input
                        type="range"
                        min={10}
                        max={100}
                        step={5}
                        value={evTargetPercent}
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10);
                          setEvTargetPercent(val);
                          if (val <= evCurrentPercent) setEvCurrentPercent(Math.max(0, val - 10));
                        }}
                        className="w-full accent-emerald-600 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                    <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Teknik Tavsiye:</strong> Li-ion batarya ömrünü korumak ve hücre dengesini muhafaza etmek için günlük kullanımda %20-%80 şarj aralığı önerilir. Uzun seyahatler öncesinde %100 şarj yapılabilir.
                    </span>
                  </div>
                </div>
              )}

              {/* TAB 3: PANO KURULU GÜÇ & SİGORTA */}
              {activeTab === "pano" && (
                <div className="space-y-6">
                  <div className="border-b border-slate-100 pb-4">
                    <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                      <Gauge className="w-5 h-5 text-blue-600" />
                      Pano Yükü & Ana Sigorta Amper Hesabı
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Evinizdeki veya işyerinizdeki elektrik tüketicilerini seçerek toplam kurulu güç ve gereken ana sigortayı belirleyin.
                    </p>
                  </div>

                  {/* Appliance checklist */}
                  <div className="space-y-2.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Mevcut Elektrikli Cihazlar & Yükler
                    </label>
                    <div className="grid sm:grid-cols-2 gap-2.5">
                      {loadItems.map((item) => (
                        <label
                          key={item.id}
                          className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                            item.active
                              ? "bg-blue-50/70 border-blue-200 text-blue-950"
                              : "bg-slate-50/50 border-slate-200 text-slate-500 hover:bg-slate-50"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <input
                              type="checkbox"
                              checked={item.active}
                              onChange={(e) => {
                                setLoadItems(
                                  loadItems.map((l) =>
                                    l.id === item.id ? { ...l, active: e.target.checked } : l
                                  )
                                );
                              }}
                              className="w-4 h-4 text-blue-600 rounded focus:ring-0"
                            />
                            <span className="text-xs font-semibold">{item.name}</span>
                          </div>
                          <span className="text-xs font-mono font-bold text-slate-700">
                            {item.powerKW} kW
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Demand Factor Slider */}
                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                          Eşzamanlılık Katsayısı (Talep Faktörü)
                        </label>
                        <span className="text-[11px] text-slate-500">
                          Tüm cihazların aynı anda tam güçte çalışmama ihtimali
                        </span>
                      </div>
                      <span className="text-base font-black text-blue-700 bg-blue-50 px-3 py-1 rounded-lg">
                        {demandFactor}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0.4}
                      max={1.0}
                      step={0.05}
                      value={demandFactor}
                      onChange={(e) => setDemandFactor(parseFloat(e.target.value))}
                      className="w-full accent-blue-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>0.50 (Düşük Kullanım)</span>
                      <span>0.65 - 0.70 (Standart Konut)</span>
                      <span>1.00 (Ticari / Tam Yük)</span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: SOLAR GES ÇATI */}
              {activeTab === "solar" && (
                <div className="space-y-6">
                  <div className="border-b border-slate-100 pb-4">
                    <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                      <Sun className="w-5 h-5 text-orange-500" />
                      Çatı Güneş Enerjisi (GES) İhtiyaç ve Tasarruf Hesabı
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Elektrik faturanıza ve coğrafi bölgenize göre çatınıza kurulabilecek optimum panel sayısı ve yıllık getiri.
                    </p>
                  </div>

                  {/* Monthly Bill Input */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Aylık Ortalama Elektrik Faturası (TL)
                      </label>
                      <span className="text-base font-black text-orange-600 bg-orange-50 px-3 py-1 rounded-lg">
                        {solarMonthlyBillTL.toLocaleString("tr-TR")} TL
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1000}
                      max={35000}
                      step={500}
                      value={solarMonthlyBillTL}
                      onChange={(e) => setSolarMonthlyBillTL(parseInt(e.target.value, 10))}
                      className="w-full accent-orange-500 cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>1.000 TL (Müstakil Ev)</span>
                      <span>10.000 TL (Villa / Dükkan)</span>
                      <span>35.000 TL+ (Atölye)</span>
                    </div>
                  </div>

                  {/* Region Choice */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Güneşlenme Bölgesi
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: "marmara", name: "Marmara / İst.", yield: "1.350 kWh/kWp" },
                        { id: "ege", name: "Ege Bölgesi", yield: "1.600 kWh/kWp" },
                        { id: "akdeniz", name: "Akdeniz", yield: "1.680 kWh/kWp" },
                        { id: "ic_anadolu", name: "İç Anadolu", yield: "1.480 kWh/kWp" }
                      ].map((reg) => (
                        <button
                          key={reg.id}
                          type="button"
                          onClick={() => setSolarRegion(reg.id as any)}
                          className={`p-3 rounded-xl border text-center transition-all ${
                            solarRegion === reg.id
                              ? "bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/20"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          <div className="font-bold text-xs">{reg.name}</div>
                          <div className={`text-[10px] mt-0.5 ${solarRegion === reg.id ? "text-orange-100" : "text-slate-500"}`}>
                            {reg.yield}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* KWh Price Input */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-800">Birim Elektrik Fiyatı (TL / kWh)</div>
                      <div className="text-[11px] text-slate-500">EPDK güncel mesken/ticarethane tarifesi</div>
                    </div>
                    <div className="w-28">
                      <input
                        type="number"
                        step={0.1}
                        value={solarElectricityPriceKWh}
                        onChange={(e) => setSolarElectricityPriceKWh(parseFloat(e.target.value) || 3.0)}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-mono font-bold text-right"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: AYDINLATMA */}
              {activeTab === "aydinlatma" && (
                <div className="space-y-6">
                  <div className="border-b border-slate-100 pb-4">
                    <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-amber-500" />
                      Aydınlatma Lümen & Lüks (TS EN 12464-1) Hesabı
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Mekan fonksiyonu ve oda metrekaresine göre konforlu aydınlatma için armatür adedi ve toplam ışık akısı.
                    </p>
                  </div>

                  {/* Room Type Selector */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Oda / Mekan Türü
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: "salon", label: "Salon (150 lx)" },
                        { id: "mutfak", label: "Mutfak (300 lx)" },
                        { id: "ofis", label: "Çalışma (500 lx)" },
                        { id: "yatak", label: "Yatak O. (120 lx)" },
                        { id: "banyo", label: "Banyo (200 lx)" },
                        { id: "magaza", label: "Mağaza (750 lx)" },
                        { id: "atolye", label: "Atölye (600 lx)" },
                        { id: "koridor", label: "Koridor (100 lx)" }
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setRoomType(item.id as any)}
                          className={`p-2.5 rounded-xl border text-center transition-all ${
                            roomType === item.id
                              ? "bg-amber-500 text-white border-amber-500 font-bold shadow-sm"
                              : "bg-slate-50 text-slate-700 border-slate-200 text-xs hover:bg-slate-100"
                          }`}
                        >
                          <div className="text-xs">{item.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Room Dimensions */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                        <span>Oda Eni (Metre)</span>
                        <span className="text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded">{roomWidthM} m</span>
                      </div>
                      <input
                        type="range"
                        min={2}
                        max={15}
                        step={0.5}
                        value={roomWidthM}
                        onChange={(e) => setRoomWidthM(parseFloat(e.target.value))}
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                        <span>Oda Boyu (Metre)</span>
                        <span className="text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded">{roomLengthM} m</span>
                      </div>
                      <input
                        type="range"
                        min={2}
                        max={25}
                        step={0.5}
                        value={roomLengthM}
                        onChange={(e) => setRoomLengthM(parseFloat(e.target.value))}
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* LED Bulb Choice */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-800">Hedeflenen LED Armatür Tipi</div>
                      <div className="text-[11px] text-slate-500">Ortalama 90-100 Lümen/Watt ışık verimi</div>
                    </div>
                    <select
                      value={bulbWattChoice}
                      onChange={(e) => setBulbWattChoice(parseInt(e.target.value, 10))}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold bg-white"
                    >
                      <option value={7}>7W LED (~650 Lümen - Spot/Spotlight)</option>
                      <option value={10}>10W LED (~950 Lümen - Standart Downlight)</option>
                      <option value={12}>12W LED (~1150 Lümen - Panel / Avize)</option>
                      <option value={18}>18W LED (~1700 Lümen - Büyük Panel)</option>
                      <option value={36}>36W LED (~3400 Lümen - 60x60 Taşyünü Panel)</option>
                    </select>
                  </div>
                </div>
              )}

            </div>

            {/* Right 5 Cols: Calculation Results Card */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              
              <div className="bg-gradient-to-br from-[#0b2e59] to-[#041528] rounded-3xl text-white p-6 sm:p-8 shadow-xl border border-slate-800 flex flex-col justify-between">
                <div>
                  
                  {/* Results Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-[#ffb703] flex items-center justify-center font-bold">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-sm sm:text-base text-white">
                          Teknik Hesaplama Raporu
                        </h3>
                        <p className="text-[11px] text-slate-400">Gerçek Zamanlı Çıktı</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={handleCopySummary}
                        title="Sonuçları Panoya Kopyala"
                        className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors text-xs flex items-center gap-1 font-semibold"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copied ? "Kopyalandı!" : "Kopyala"}</span>
                      </button>
                      <button
                        onClick={handlePrint}
                        title="Yazdır / PDF Olarak Kaydet"
                        className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                      >
                        <Printer className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* RESULT OUTPUT: TAB 1 KABLO */}
                  {activeTab === "kablo" && (
                    <div className="space-y-4">
                      <div className="p-4 rounded-2xl bg-white/10 border border-white/15">
                        <span className="text-[11px] uppercase tracking-wider text-amber-300 font-bold block mb-1">
                          Tavsiye Edilen Asgari Kablo Kesiti
                        </span>
                        <div className="text-3xl sm:text-4xl font-black text-white flex items-baseline gap-2">
                          <span>{kabloCalculation.recommended.section}</span>
                          <span className="text-xl font-bold text-[#ffb703]">mm²</span>
                          <span className="text-xs font-normal text-slate-300">
                            ({kabloMaterial === "bakir" ? "Bakır NYY / Halogen-Free" : "Alüminyum NAYY"})
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                          <span className="text-slate-400 block text-[11px]">Gerilim Düşümü (%e)</span>
                          <span className="text-base font-bold text-emerald-400">
                            %{kabloCalculation.recommended.percentDrop}
                          </span>
                          <span className="text-[10px] text-slate-400 block mt-0.5">
                            ({kabloCalculation.recommended.voltDrop} Volt Kayıp)
                          </span>
                        </div>

                        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                          <span className="text-slate-400 block text-[11px]">Hat Akımı</span>
                          <span className="text-base font-bold text-white">
                            {kabloCalculation.current} Amper
                          </span>
                          <span className="text-[10px] text-slate-400 block mt-0.5">
                            İzin Verilen: {kabloCalculation.recommended.thermalAmp} A
                          </span>
                        </div>
                      </div>

                      {/* TSE standard compliance status */}
                      <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
                        <span>
                          <strong>TSE HD 60364 Uyumlu:</strong> Gerilim düşümü azami sınırın altında (%{kabloMaxDropPercent}) ve iletken ısınma açısından güvenlidir.
                        </span>
                      </div>

                      {/* Cross-section comparison mini-table */}
                      <div className="pt-2">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                          Kesitlere Göre Gerilim Düşümü Tablosu
                        </span>
                        <div className="space-y-1 text-xs max-h-40 overflow-y-auto pr-1">
                          {kabloCalculation.results.slice(0, 5).map((r) => (
                            <div
                              key={r.section}
                              className={`flex items-center justify-between p-2 rounded-lg ${
                                r.section === kabloCalculation.recommended.section
                                  ? "bg-amber-400/20 text-white font-bold border border-amber-400/40"
                                  : "bg-white/5 text-slate-300"
                              }`}
                            >
                              <span>{r.section} mm²</span>
                              <span>%{r.percentDrop} ({r.voltDrop}V)</span>
                              <span className={r.suitable ? "text-emerald-400" : "text-red-400"}>
                                {r.suitable ? "Uygun ✓" : "Yetersiz ✗"}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* RESULT OUTPUT: TAB 2 WALLBOX */}
                  {activeTab === "wallbox" && (
                    <div className="space-y-4">
                      <div className="p-4 rounded-2xl bg-white/10 border border-white/15">
                        <span className="text-[11px] uppercase tracking-wider text-emerald-300 font-bold block mb-1">
                          Tahmini Tam Şarj Süresi
                        </span>
                        <div className="text-3xl sm:text-4xl font-black text-white flex items-baseline gap-2">
                          <span>{evCalculation.wholeHours} sa {evCalculation.minutes} dk</span>
                        </div>
                        <div className="text-xs text-slate-300 mt-1">
                          {evCalculation.requiredEnergyKWh} kWh transfer için (%{evCurrentPercent} → %{evTargetPercent})
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                          <span className="text-slate-400 block text-[11px]">Kazanılan Menzil</span>
                          <span className="text-base font-bold text-emerald-400">
                            ~{evCalculation.totalKmGained} km
                          </span>
                          <span className="text-[10px] text-slate-400 block mt-0.5">
                            (Saatte ~{evCalculation.kmPerHour} km)
                          </span>
                        </div>

                        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                          <span className="text-slate-400 block text-[11px]">Gereken Sigorta</span>
                          <span className="text-xs font-bold text-white line-clamp-1">
                            {evCalculation.breakerRecommendation}
                          </span>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs space-y-1.5">
                        <div className="text-slate-300">
                          <strong>Tavsiye Kablo:</strong> {evCalculation.cableRecommendation}
                        </div>
                        <div className="text-slate-300">
                          <strong>Kaçak Akım Rölesi:</strong> {evCalculation.rcdRecommendation}
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 text-xs text-blue-200 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 shrink-0 text-blue-400" />
                        <span>
                          <strong>TS EN 61851 Uyarınca:</strong> EV şarj istasyonları mutlaka ana panodan bağımsız, doğrudan çekilmiş linye hattı üzerinden beslenmelidir.
                        </span>
                      </div>
                    </div>
                  )}

                  {/* RESULT OUTPUT: TAB 3 PANO */}
                  {activeTab === "pano" && (
                    <div className="space-y-4">
                      <div className="p-4 rounded-2xl bg-white/10 border border-white/15">
                        <span className="text-[11px] uppercase tracking-wider text-blue-300 font-bold block mb-1">
                          Önerilen Ana Şalter & Sigorta
                        </span>
                        <div className="text-2xl sm:text-3xl font-black text-white leading-tight">
                          {panoCalculation.recommendedBreaker}
                        </div>
                        <div className="text-xs text-slate-300 mt-1">
                          Besleme Kablosu: {panoCalculation.mainCable}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                          <span className="text-slate-400 block text-[11px]">Kurulu Toplam Güç</span>
                          <span className="text-base font-bold text-white">
                            {panoCalculation.totalInstalledPowerKW} kW
                          </span>
                        </div>

                        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                          <span className="text-slate-400 block text-[11px]">Eşzamanlı Talep Gücü</span>
                          <span className="text-base font-bold text-blue-400">
                            {panoCalculation.demandPowerKW} kW
                          </span>
                          <span className="text-[10px] text-slate-400 block mt-0.5">
                            ({panoCalculation.operatingCurrent} A)
                          </span>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 space-y-1">
                        <div className="font-bold flex items-center gap-1.5 text-amber-300">
                          <AlertTriangle className="w-4 h-4" /> Hayati Koruma Tavsiyesi:
                        </div>
                        <p className="text-[11px] leading-relaxed">
                          Panonuza mutlaka <strong>30mA Hayat Koruma Kaçak Akım Rölesi</strong> ve ana girişe <strong>300mA Yangın Koruma Rölesi</strong> entegre edilmelidir.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* RESULT OUTPUT: TAB 4 SOLAR */}
                  {activeTab === "solar" && (
                    <div className="space-y-4">
                      <div className="p-4 rounded-2xl bg-white/10 border border-white/15">
                        <span className="text-[11px] uppercase tracking-wider text-orange-300 font-bold block mb-1">
                          Gereken GES Kurulu Gücü
                        </span>
                        <div className="text-3xl sm:text-4xl font-black text-white flex items-baseline gap-2">
                          <span>{solarCalculation.realInstalledKWp}</span>
                          <span className="text-xl font-bold text-orange-400">kWp</span>
                        </div>
                        <div className="text-xs text-slate-300 mt-1">
                          {solarCalculation.panelCount} Adet 550W Half-Cut Panel (~{solarCalculation.roofAreaM2} m² Çatı)
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                          <span className="text-slate-400 block text-[11px]">Yıllık Elektrik Tasarrufu</span>
                          <span className="text-base font-bold text-emerald-400">
                            ~{solarCalculation.annualSavingsTL.toLocaleString("tr-TR")} TL
                          </span>
                        </div>

                        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                          <span className="text-slate-400 block text-[11px]">İnverter Kapasitesi</span>
                          <span className="text-base font-bold text-white">
                            {solarCalculation.inverterKW} kW Hibrit
                          </span>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
                        <span>
                          Yılda yaklaşık <strong>{solarCalculation.co2SavedKg.toLocaleString("tr-TR")} kg CO₂</strong> salımını engelleyerek doğayı korursunuz.
                        </span>
                      </div>
                    </div>
                  )}

                  {/* RESULT OUTPUT: TAB 5 AYDINLATMA */}
                  {activeTab === "aydinlatma" && (
                    <div className="space-y-4">
                      <div className="p-4 rounded-2xl bg-white/10 border border-white/15">
                        <span className="text-[11px] uppercase tracking-wider text-amber-300 font-bold block mb-1">
                          Gereken LED Armatür Adedi
                        </span>
                        <div className="text-3xl sm:text-4xl font-black text-white flex items-baseline gap-2">
                          <span>{lightingCalculation.bulbCount}</span>
                          <span className="text-xl font-bold text-amber-400">Adet</span>
                          <span className="text-xs font-normal text-slate-300">
                            ({bulbWattChoice}W LED)
                          </span>
                        </div>
                        <div className="text-xs text-slate-300 mt-1">
                          Toplam Güç Tüketimi: {lightingCalculation.totalWatt} Watt
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                          <span className="text-slate-400 block text-[11px]">Hedef Aydınlık (Lüks)</span>
                          <span className="text-base font-bold text-white">
                            {lightingCalculation.targetLux} Lux (lx)
                          </span>
                          <span className="text-[10px] text-slate-400 block mt-0.5">
                            {lightingCalculation.selectedInfo?.desc}
                          </span>
                        </div>

                        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                          <span className="text-slate-400 block text-[11px]">Gereken Toplam Işık Akısı</span>
                          <span className="text-base font-bold text-amber-400">
                            {lightingCalculation.totalLumens.toLocaleString("tr-TR")} lm
                          </span>
                          <span className="text-[10px] text-slate-400 block mt-0.5">
                            ({lightingCalculation.roomAreaM2} m² Alan)
                          </span>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 text-xs text-blue-200 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 shrink-0 text-blue-400" />
                        <span>
                          <strong>TS EN 12464-1 Standart:</strong> Işığın homojen dağılımı (UGR &lt; 19) için armatürleri tavan yüzeyine simetrik grid şeklinde yerleştiriniz.
                        </span>
                      </div>
                    </div>
                  )}

                </div>

                {/* CTAs */}
                <div className="pt-6 border-t border-white/10 space-y-3">
                  <div className="text-xs text-slate-300 font-semibold text-center">
                    Bu hesaplamayı yetkili elektrik ustalarımıza danışın:
                  </div>
                  <div className="grid sm:grid-cols-2 gap-2.5">
                    <a
                      href={`https://wa.me/905300695393?text=${getWhatsAppMessage()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        sendTelegramAnalyticsAlert({
                          toolName: `${activeTab.toUpperCase()} Hesaplama Aracı`,
                          details: `${activeTab} parametreleri hesaplandı.`,
                          actionTaken: "Kullanıcı hesaplama sonucunu WhatsApp ile ustaya iletmek üzere tıkladı."
                        }).catch(() => {});
                      }}
                      className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebc59] text-white py-3 px-4 rounded-xl text-xs font-bold transition-all shadow-md"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp'tan Gönder</span>
                    </a>
                    <a
                      href="tel:+905300695393"
                      onClick={() => {
                        sendTelegramAnalyticsAlert({
                          toolName: `${activeTab.toUpperCase()} Hesaplama Aracı`,
                          details: `${activeTab} parametreleri hesaplandı.`,
                          actionTaken: "Kullanıcı hesaplama sonrasında doğrudan ustayı arama butonuna tıkladı."
                        }).catch(() => {});
                      }}
                      className="flex items-center justify-center gap-2 bg-[#ffb703] hover:bg-amber-400 text-slate-950 py-3 px-4 rounded-xl text-xs font-black transition-all shadow-md"
                    >
                      <PhoneCall className="w-4 h-4 fill-slate-950" />
                      <span>Ustayı Ara</span>
                    </a>
                  </div>
                </div>

              </div>

              {/* Author & Reviewer Verification Badge */}
              <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Teknik Doğrulama & E-E-A-T Künyesi</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0b2e59] text-[#ffb703] font-bold flex items-center justify-center text-xs shrink-0">
                    {defaultAuthor.avatarText}
                  </div>
                  <div className="text-xs">
                    <div className="font-bold text-slate-900">{defaultAuthor.name}</div>
                    <div className="text-slate-500">{defaultAuthor.title} ({defaultAuthor.emoNumber})</div>
                  </div>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed border-t border-slate-100 pt-2">
                  Formüller, Türk Standartları Enstitüsü (TSE) ve TMMOB Elektrik Mühendisleri Odası (EMO) hesap cetvellerine göre kodlanmış olup düzenli olarak revize edilmektedir.
                </p>
              </div>

            </div>

          </div>

          {/* AdSense In-Feed / Mid-Page Ad Placement */}
          <AdBanner variant="leaderboard" className="mb-12" />

          {/* Technical Explanations & Formula Knowledge Base (Thin-Content Destroyer) */}
          <section className="bg-white rounded-3xl border border-slate-200/90 p-8 md:p-12 shadow-sm space-y-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-50 text-[#0b2e59] text-xs font-bold mb-2">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Teknik Kılavuz &amp; Standartlar</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Elektrik Hesaplamalarında Kullanılan Formüller ve Standartlar
              </h2>
              <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                Aya Elektrik tarafından uygulanan hesaplama yöntemlerinin teknik temelleri aşağıda açıklanmıştır:
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
              
              {/* Formula 1 */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#ffb703]" />
                  1. Gerilim Düşümü Formülasyonu (TSE HD 60364)
                </h3>
                <p>
                  Kablodan geçen akım, iletkenin öz direnci nedeniyle hat boyunca bir gerilim düşümüne (%e) yol açar.
                  Aşırı gerilim düşümü cihazların arızalanmasına, motorların yanmasına ve kablonun aşırı ısınarak yangın çıkarmasına neden olur.
                </p>
                <div className="p-3 bg-white rounded-xl font-mono text-xs text-slate-900 border border-slate-200">
                  <div><strong>Monofaze (230V):</strong> %e = (2 × 100 × L × P) / (κ × S × U²)</div>
                  <div className="mt-1"><strong>Trifaze (400V):</strong> %e = (100 × L × P) / (κ × S × U²)</div>
                </div>
                <ul className="list-disc pl-5 space-y-1 text-slate-600 text-xs">
                  <li><strong>L:</strong> Hat uzunluğu (metre)</li>
                  <li><strong>P:</strong> Çekilen aktif güç (Watt)</li>
                  <li><strong>κ (Kappa):</strong> İletkenlik katsayısı (Bakır için 56, Alüminyum için 35 m/Ω·mm²)</li>
                  <li><strong>S:</strong> İletken kesiti (mm²)</li>
                  <li><strong>U:</strong> Faz-nötr (230V) veya Faz-faz (400V) anma gerilimi</li>
                </ul>
              </div>

              {/* Formula 2 */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <BatteryCharging className="w-4 h-4 text-emerald-600" />
                  2. EV Wallbox Şarj ve Güç Dinamiği (TS EN 61851)
                </h3>
                <p>
                  Elektrikli araçların AC Tip 2 soket üzerinden şarjında şebekeden çekilen güç P = U × I × √3 × cosφ formülü ile hesaplanır.
                  Dahili araç içi doğrultucu (On-Board Charger - OBC) AC akımı DC'ye çevirirken yaklaşık %10 kayıp yaşanır.
                </p>
                <div className="p-3 bg-white rounded-xl font-mono text-xs text-slate-900 border border-slate-200">
                  <div><strong>Gereken Enerji (kWh):</strong> E = Batarya (kWh) × (SoC_hedef - SoC_mevcut) / 100</div>
                  <div className="mt-1"><strong>Süre (Saat):</strong> t = E / (P_şarj × η_verim)</div>
                </div>
                <p className="text-xs text-slate-600">
                  Örnek: 11 kW trifaze bir Wallbox, 77 kWh'lık bir bataryayı %20'den %80'e (46.2 kWh enerji) yaklaşık 4 saat 30 dakikada şarj eder.
                </p>
              </div>

              {/* Formula 3 */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <Gauge className="w-4 h-4 text-blue-600" />
                  3. Eşzamanlı Talep Gücü ve Sigorta Koordinasyonu
                </h3>
                <p>
                  Binalarda tüm cihazların aynı anda çalışması beklenmez. Kurulu güce "Eşzamanlılık Katsayısı (Talep Faktörü - k)" uygulanarak gerçek talep gücü bulunur.
                </p>
                <div className="p-3 bg-white rounded-xl font-mono text-xs text-slate-900 border border-slate-200">
                  <div><strong>Talep Gücü:</strong> P_talep = ∑ (P_cihaz × k)</div>
                  <div className="mt-1"><strong>Çekilen Akım:</strong> I = P_talep / (√3 × 400 × cosφ)</div>
                </div>
                <p className="text-xs text-slate-600">
                  Seçilen otomatik sigortanın (MCB) nominal akımı In, kablonun akım taşıma kapasitesinden küçük veya eşit olmalı (In ≤ Iz), çalışma akımından ise büyük olmalıdır (Ib ≤ In).
                </p>
              </div>

              {/* Formula 4 */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  4. Lümen - Lüks Aydınlatma Hesabı (TS EN 12464-1)
                </h3>
                <p>
                  Aydınlatma şiddeti (Lüks - lx), yüzeye düşen ışık akısının (Lümen - lm) alana oranıdır. İç mekanlarda tavan yansımaları ve armatür kirlenmesi hesaba katılır:
                </p>
                <div className="p-3 bg-white rounded-xl font-mono text-xs text-slate-900 border border-slate-200">
                  <div><strong>Toplam Işık Akısı:</strong> Φ_toplam = (E_hedef × A) / (UF × MF)</div>
                  <div className="mt-1"><strong>Armatür Sayısı:</strong> N = Φ_toplam / Φ_armatür</div>
                </div>
                <p className="text-xs text-slate-600">
                  UF (Tesisat Kullanım Faktörü): ~0.55 | MF (Bakım Faktörü): ~0.80. Ofis ortamlarında göz yorgunluğunu önlemek için minimum 500 lüks aydınlatma şiddeti kanunen zorunludur.
                </p>
              </div>

            </div>

            {/* Disclaimer & Legal Notice */}
            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="font-bold">Teknik Bilgilendirme ve Sorumluluk Sınırı Uyarısı:</div>
                <p className="leading-relaxed">
                  Bu sayfada yer alan hesaplama araçları ön bilgilendirme amacıyla hazırlanmıştır. 
                  Saha ortamındaki ortam sıcaklığı, kanal içi kablo demeti sayısı, priz linyeleri gibi faktörler neticesinde 
                  uygulanacak kesitler farklılık gösterebilir. Elektrik tesisatınızda uygulama yapmadan önce mutlaka yetkili elektrik ustalarımıza 
                  yerinde keşif yaptırınız.
                </p>
              </div>
            </div>

          </section>

        </div>
      </main>

      <Footer />
      <WhatsAppButton />
      <MobileCallBar />
    </div>
  );
}

import burnedSocketImg from '../assets/images/burned_electrical_socket_1781970414292.jpg';
import rcdBreakerImg from '../assets/images/aya_rcd_breaker_1792144826116.jpg';
import nightImg from '../assets/images/aya_night_electrician_1792144260657.jpg';
import panelRenovateImg from '../assets/images/aya_panel_renovate_1792144825909.jpg';
import waterHeaterImg from '../assets/images/aya_water_heater_1792144826018.jpg';
import commercialTrifazeImg from '../assets/images/aya_commercial_trifaze_1792144827565.jpg';
import evImg from '../assets/images/aya_ev_charging_1792144276050.jpg';
import lightingImg from '../assets/images/aya_lighting_lux_1792144290773.jpg';
import groundingTestImg from '../assets/images/aya_grounding_test_1792144827413.jpg';
import compensationPanelImg from '../assets/images/aya_compensation_panel_1792144827772.jpg';
import acWiringImg from '../assets/images/aya_ac_wiring_1792145430095.jpg';
import kitchenRenovationImg from '../assets/images/aya_kitchen_renovation_1792145429755.jpg';
import klimaAltyapiImg from '../assets/images/aya_elektrik_klima_altyapi_1793030870764.jpg';
import fuarStandImg from '../assets/images/aya_fuar_stand_elektrik_1793030886897.jpg';
import akilliEvImg from '../assets/images/aya_elektrik_akilli_ev_pano_1793033633924.jpg';
import laundrySocketImg from '../assets/images/aya_laundry_socket_circuit_1793035665199.jpg';
import surgeProtectorImg from '../assets/images/aya_surge_protector_parafudr_1793035679600.jpg';
import heatPumpImg from '../assets/images/aya_heat_pump_electrical_1793035680492.jpg';
import kombiBreakerImg from '../assets/images/aya_kombi_boiler_breaker_1793035682046.jpg';
import buildingKofanaImg from '../assets/images/aya_building_kofana_panel_1793035682349.jpg';
import cat7PatchPanelImg from '../assets/images/aya_cat7_patch_panel_network_1793035684216.jpg';
import medicalUpsImg from '../assets/images/aya_medical_ups_power_line_1793035683801.jpg';
import inductionCooktopImg from '../assets/images/aya_induction_cooktop_wiring_1793099843354.jpg';
import elevatorPumpImg from '../assets/images/aya_elevator_pump_panel_1793099859267.jpg';
import textileWorkshopImg from '../assets/images/aya_textile_workshop_panel_1793099875341.jpg';
import autoShopLiftImg from '../assets/images/aya_auto_shop_lift_wiring_1793099890994.jpg';
import floodElectricalImg from '../assets/images/aya_flood_electrical_safety_1793099906444.jpg';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  imageUrl: string;
  category: string;
  views?: number;
  tags?: string[];
  status?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "yanan-priz-ve-salter-cizirti-sesi-yangin-onleme",
    title: "Prizden Yanık Kokusu ve Şalterden Cızırtı Sesi Geliyorsa Ne Yapılmalı? (Acil Yangın Önleme Rehberi)",
    excerpt: "Prizden balık ya da yanık plastik kokusu geliyor, şalterden cızırtı duyuyorsanız elektrik yangını riski kapınızda! 4 kritik acil adım ve 7/24 İstanbul acil elektrikçi desteği.",
    category: "Acil Elektrik Arıza",
    date: "16 Ekim 2026",
    readTime: "5 Dk",
    imageUrl: burnedSocketImg,
    views: 1420,
    status: "Yayında",
    tags: ["Acil Elektrikçi", "Priz Arızası", "Yangın Güvenliği", "İstanbul Elektrikçi"],
    content: `
      <!-- AEO Hızlı Yanıt Kutusu (Perplexity & Gemini Doğrudan Yanıt) -->
      <div style="background-color: #fef2f2; border-left: 4px solid #ef4444; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
        <p style="margin: 0; font-weight: 700; color: #991b1b; font-size: 1.05rem;">🚨 Hızlı Cevap (Acil Durum Bildirisi):</p>
        <p style="margin: 8px 0 0 0; color: #7f1d1d; font-size: 0.95rem; line-height: 1.5;">
          Prizden veya sigorta kutusundan gelen cızırtı sesi "elektriksel ark (kıvılcım)", yanık kokusu ise kablo izolasyonunun 150°C üzerine çıkarak eridiğini gösterir. <strong>ASLA prize elinizle dokunmayın!</strong> Derhal ana sigortayı indirin, prize bağlı cihazı kablosundan çekmeyin ve vakit kaybetmeden 7/24 acil elektrikçi çağırın.
        </p>
      </div>

      <!-- Telefon Arama CTA Butonu -->
      <div style="background: linear-gradient(135deg, #0b2e59 0%, #061933 100%); color: white; padding: 22px; border-radius: 14px; text-align: center; margin: 24px 0; border: 1px solid #1e40af; box-shadow: 0 10px 25px -5px rgba(11, 46, 89, 0.4);">
        <span style="background: #ffb703; color: #0b2e59; font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.5px;">İstanbul 7/24 Acil Müdahale Ekibi</span>
        <h3 style="color: white; margin: 10px 0 6px 0; font-size: 1.35rem; font-weight: 800;">Yanık Kokusu veya Kıvılcım mı Var?</h3>
        <p style="color: #93c5fd; font-size: 0.9rem; margin: 0 0 16px 0;">İstanbul'un 39 ilçesinde nöbetçi mobil ustalarımız 15-30 dakikada adresinizde.</p>
        <a href="tel:05300695393" style="display: inline-block; background-color: #ffb703; color: #0b2e59; font-weight: 800; font-size: 1.1rem; padding: 12px 28px; border-radius: 10px; text-decoration: none; box-shadow: 0 4px 14px rgba(255, 183, 3, 0.5); transition: transform 0.2s;">
          📞 0530 069 53 93 - Hemen Acil Usta Çağır
        </a>
      </div>

      <h2>Prizden Gelen Ses ve Koku Neden Hayati Tehlike Yaratır?</h2>
      <p>Ev ve iş yerlerinde meydana gelen yangınların %38'i gevşek klemens bağlantıları, aşırı akım çeken cihazlar ve eskiyen alüminyum/bakır iletken temaslarından doğar. Akım atlarken oluşan mikroskobik kıvılcımlar (ark), duvar içindeki sıva altı kablo kılıfını tutuşturabilir.</p>

      <h3>Acil Durumda Uygulanacak 4 Kritik Adım:</h3>
      <ol>
        <li><strong>Ana Giriş Şalterini İndirin:</strong> Prizin bağlı olduğu linyeyi bilmiyorsanız, sayacın yanındaki veya daire girişindeki ana şalteri derhal sıfır (OFF) konumuna getirin.</li>
        <li><strong>Su veya Sıvı Temasından Kesinlikle Kaçının:</strong> Elektrik yangınlarında su kullanmak akımı vücudunuza iletir. Yalnızca KKT (Kuru Kimyevi Toz) veya CO2 yangın tüpü kullanılabilir.</li>
        <li><strong>Prize Bağlı Fişi Çekmeye Zorlamayın:</strong> Plastik gövde yüksek ısıdan dolayı kaynaşmış olabilir. Elektrik kesilmeden fişi çekmeye çalışmak elektrik arkının patlamasına neden olur.</li>
        <li><strong>Yetkili Elektrik Ustasına Bildirin:</strong> Termal kamera ve multimetre ile sıva altı tesisat hasarı tespit edilmeden o hat tekrar enerjilendirilmemelidir.</li>
      </ol>

      <!-- GEO Yerel Kapsama Alanı -->
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; margin: 24px 0;">
        <h4 style="margin: 0 0 8px 0; color: #0b2e59; font-weight: 700;">📍 Aya Elektrik Hızlı Servis Noktaları (İstanbul):</h4>
        <p style="margin: 0; font-size: 0.9rem; color: #475569; line-height: 1.6;">
          <strong>Avrupa Yakası:</strong> Beşiktaş, Şişli, Bakırköy, Kağıthane, Beyoğlu, Sarıyer, Fatih, Başakşehir, Beylikdüzü, Esenyurt.<br>
          <strong>Anadolu Yakası:</strong> Kadıköy, Üsküdar, Ataşehir, Maltepe, Kartal, Pendik, Çekmeköy, Beykoz.<br>
          <em>Ortalama varış süremiz trafik durumuna göre 15 - 30 dakikadır.</em>
        </p>
      </div>

      <h2>2026 Priz ve Sigorta Değişimi Fiyat Rehberi</h2>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 0.9rem;">
        <thead>
          <tr style="background-color: #0b2e59; color: white;">
            <th style="padding: 10px; text-align: left; border: 1px solid #0b2e59;">Hizmet / Parça</th>
            <th style="padding: 10px; text-align: left; border: 1px solid #0b2e59;">Müdahale Süresi</th>
            <th style="padding: 10px; text-align: left; border: 1px solid #0b2e59;">Garanti & Standart</th>
          </tr>
        </thead>
        <tbody>
          <tr style="background-color: #f8fafc;">
            <td style="padding: 10px; border: 1px solid #e2e8f0;">Yanmış Priz / Buat Değişimi</td>
            <td style="padding: 10px; border: 1px solid #e2e8f0;">20 - 30 Dk</td>
            <td style="padding: 10px; border: 1px solid #e2e8f0;">1 Yıl İşçilik Garantisi (TSE)</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #e2e8f0;">Ark Yapan Sigorta Değişimi (W-Otomat)</td>
            <td style="padding: 10px; border: 1px solid #e2e8f0;">15 - 25 Dk</td>
            <td style="padding: 10px; border: 1px solid #e2e8f0;">Siemens / Schneider Orijinal</td>
          </tr>
          <tr style="background-color: #f8fafc;">
            <td style="padding: 10px; border: 1px solid #e2e8f0;">Termal Kamera ile Tesisat Kaçak Taraması</td>
            <td style="padding: 10px; border: 1px solid #e2e8f0;">30 - 45 Dk</td>
            <td style="padding: 10px; border: 1px solid #e2e8f0;">Detaylı Ölçüm Raporu</td>
          </tr>
        </tbody>
      </table>

      <h3>Sıkça Sorulan Sorular (AEO & AI Search Snippet)</h3>
      <p><strong>Soru: Prizden çıkan balık kokusu elektrik arızası mıdır?</strong><br>
      Evet. Elektrik prizlerinde ve buatlarda kullanılan bakalit ve plastik yalıtım malzemeleri yüksek ısıya maruz kaldığında balık kokusuna çok benzeyen karakteristik bir kimyasal koku yayar.</p>

      <p><strong>Soru: Şalter neden cızır cızır ses çıkarır?</strong><br>
      Klemens vidalarının gevşemesi, şalterin içindeki bimetal mekanizmanın aşınması veya sigortanın taşıyabileceğinden fazla akım çekilmesi durumunda ark oluşur ve bu ses meydana gelir.</p>

      <div style="text-align: center; margin-top: 30px;">
        <a href="tel:05300695393" style="display: inline-block; background-color: #0b2e59; color: #ffb703; font-weight: 800; font-size: 1.1rem; padding: 14px 32px; border-radius: 12px; text-decoration: none; border: 2px solid #ffb703;">
          📞 7/24 Çağrı Hattı: 0530 069 53 93 (Hemen Arayın)
        </a>
      </div>
    `
  },
  {
    id: "2",
    slug: "kacak-akim-rolesi-surekli-atiyor-ve-tutmyor",
    title: "Kaçak Akım Rölesi Sürekli Atıyor ve Tutmuyor! (Adım Adım Arıza Tespiti & Çözümü)",
    excerpt: "Kaçak akım rölesini yukarı kaldırdığınız an hemen düşüyor mu? Evde tüm elektrikler kesildiyse cihazları bozmadan arızayı bulmanın yolu ve acil usta çözümü.",
    category: "Güvenlik & Pano",
    date: "16 Ekim 2026",
    readTime: "6 Dk",
    imageUrl: rcdBreakerImg,
    views: 1890,
    status: "Yayında",
    tags: ["Kaçak Akım Rölesi", "Sigorta Tutmuyor", "Elektrik Kesintisi", "Pano Arızası"],
    content: `
      <!-- AEO Hızlı Yanıt -->
      <div style="background-color: #eff6ff; border-left: 4px solid #3b82f6; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
        <p style="margin: 0; font-weight: 700; color: #1e40af; font-size: 1.05rem;">💡 Kaçak Akım Rölesi Neden Tutmaz? (Özet Yanıt):</p>
        <p style="margin: 8px 0 0 0; color: #1e3a8a; font-size: 0.95rem; line-height: 1.5;">
          Kaçak akım rölesi (30mA), faz ve nötr arasındaki akım farkı 30 miliamperi aştığında insan hayatını korumak için devreyi keser. <strong>Eğer röle hiç kalkmıyorsa:</strong> Evdeki tüm sigortaları indirin, kaçak akım rölesini tek başına kaldırın, ardından sigortaları tek tek açarak hangi odanın veya cihazın kaçak yaptığını bulun.
        </p>
      </div>

      <!-- CTA Box -->
      <div style="background: linear-gradient(135deg, #0b2e59 0%, #061933 100%); color: white; padding: 22px; border-radius: 14px; text-align: center; margin: 24px 0; border: 1px solid #1e40af;">
        <span style="background: #ffb703; color: #0b2e59; font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 20px;">ACİL ELEKTRİK DESTEK HATTI</span>
        <h3 style="color: white; margin: 10px 0 6px 0; font-size: 1.35rem; font-weight: 800;">Tüm Dairede Elektrik Yok ve Röle Tutmuyor mu?</h3>
        <p style="color: #93c5fd; font-size: 0.9rem; margin: 0 0 16px 0;">Megger izolasyon test cihazımızla arızalı priz veya cihazı 15 dakikada tespit ediyoruz.</p>
        <a href="tel:05300695393" style="display: inline-block; background-color: #ffb703; color: #0b2e59; font-weight: 800; font-size: 1.1rem; padding: 12px 28px; border-radius: 10px; text-decoration: none; box-shadow: 0 4px 14px rgba(255, 183, 3, 0.5);">
          📞 0530 069 53 93 - Acil Arıza Servisini Ara
        </a>
      </div>

      <h2>Kaçak Akım Rölesi Atmasının En Yaygın 5 Sebebi</h2>
      <ul>
        <li><strong>Rezistanslı Cihaz Gövde Kaçakları:</strong> Bulaşık makinesi, çamaşır makinesi, termosifon veya fırın rezistanslarının kireçlenip patlaması sonucu gövdeye elektrik sızması.</li>
        <li><strong>Nötr - Toprak Teması:</strong> Priz montajında veya lamba avize bağlantısında nötr ile topraklama kablolarının birbirine değmesi.</li>
        <li><strong>Banyo ve Balkon Prizlerine Su Sızması:</strong> Yağmur suyu veya banyo buharının priz buatına sızarak izolasyonu bozması.</li>
        <li><strong>Bozulmuş Kaçak Akım Rölesi:</strong> Zamanla iç yay mekanizması bozulan veya yıldırım darbesi alan rölelerin sebepsiz yere açma yapması.</li>
        <li><strong>Aşırı Elektronik Yük (Harmonikler):</strong> Bilgisayar güç kaynakları ve LED sürücülerinin yarattığı yüksek frekanslı sızıntı akımları.</li>
      </ul>

      <h3>Evde Uygulayabileceğiniz Arıza Bulma Testi:</h3>
      <p>1. Panodaki tüm küçük sigortaları (W-Otomatları) aşağı indirin.<br>
      2. Ana kaçak akım rölesini yukarı kaldırın. (Eğer yine tutmuyorsa, sorun ana panoda veya rölenin kendisindedir, derhal usta çağırın).<br>
      3. Küçük sigortaları teker teker sırayla kaldırın.<br>
      4. Hangi sigortayı kaldırdığınızda kaçak akım pat diye düşüyorsa, arıza o sigortanın beslediği odadadır.<br>
      5. O odadaki tüm prizlerdeki fişleri çekin ve tekrar deneyin.</p>

      <!-- GEO Bölge Bilgisi -->
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; margin: 24px 0;">
        <h4 style="margin: 0 0 8px 0; color: #0b2e59; font-weight: 700;">İstanbul Genelinde 7/24 Kaçak Akım Değişim Hizmeti</h4>
        <p style="margin: 0; font-size: 0.9rem; color: #475569; line-height: 1.6;">
          Eski tip veya bozulmuş rölelerinizi ABB, Schneider, Siemens ve Legrand A Tipi (elektronik kaçaklara dayanıklı) kaçak akım röleleri ile değiştiriyoruz. Beşiktaş, Kadıköy, Bakırköy, Şişli, Kağıthane ve tüm çevre ilçelerde 20 dakikada nöbetçi usta kapınızda.
        </p>
      </div>

      <div style="text-align: center; margin-top: 30px;">
        <a href="tel:05300695393" style="display: inline-block; background-color: #0b2e59; color: #ffb703; font-weight: 800; font-size: 1.1rem; padding: 14px 32px; border-radius: 12px; text-decoration: none; border: 2px solid #ffb703;">
          📞 7/24 Usta Çağır: 0530 069 53 93
        </a>
      </div>
    `
  },
  {
    id: "3",
    slug: "istanbul-nobetci-elektrikci-7-24-gece-acik-usta",
    title: "İstanbul Nöbetçi Elektrikçi 7/24: Gece Açık Elektrik Ustası 15-30 Dakikada Kapınızda",
    excerpt: "Gece yarısı sigortanız patladı, ev veya dükkan karanlıkta mı kaldı? İstanbul'un 39 ilçesinde nöbetçi mobil araçlarımızla 20 dakikada acil müdahale ediyoruz.",
    category: "7/24 Acil Servis",
    date: "16 Ekim 2026",
    readTime: "4 Dk",
    imageUrl: nightImg,
    views: 2450,
    status: "Yayında",
    tags: ["Nöbetçi Elektrikçi", "Gece Elektrikçi", "İstanbul Acil Usta", "7/24 Elektrik Servisi"],
    content: `
      <!-- AEO Hızlı Bilgi -->
      <div style="background-color: #fefce8; border-left: 4px solid #eab308; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
        <p style="margin: 0; font-weight: 700; color: #854d0e; font-size: 1.05rem;">🌙 Gece Açık Nöbetçi Elektrikçiye Nasıl Ulaşılır?</p>
        <p style="margin: 8px 0 0 0; color: #713f12; font-size: 0.95rem; line-height: 1.5;">
          Aya Elektrik, İstanbul'un hem Avrupa hem Anadolu yakasında hazır bekleyen tam donanımlı nöbetçi servis araçlarıyla 7 gün 24 saat kesintisiz hizmet vermektedir. Gece saatlerinde meydana gelen ani elektrik kesintileri, patlayan sigortalar ve yangın alarmları için <strong>0530 069 53 93</strong> numaramızdan anında canlı ustayla görüşebilirsiniz.
        </p>
      </div>

      <!-- CTA -->
      <div style="background: linear-gradient(135deg, #0b2e59 0%, #061933 100%); color: white; padding: 22px; border-radius: 14px; text-align: center; margin: 24px 0;">
        <h3 style="color: white; margin: 0 0 8px 0; font-size: 1.4rem; font-weight: 800;">Gece Yarısı Karanlıkta mı Kaldınız?</h3>
        <p style="color: #93c5fd; font-size: 0.95rem; margin: 0 0 16px 0;">TSE belgeli sigorta, kablo ve buat malzemeleri aracımızda hazır. Beklemeden arayın!</p>
        <a href="tel:05300695393" style="display: inline-block; background-color: #ffb703; color: #0b2e59; font-weight: 800; font-size: 1.15rem; padding: 14px 30px; border-radius: 10px; text-decoration: none;">
          📞 0530 069 53 93 - Nöbetçi Ustayı Şimdi Çağır
        </a>
      </div>

      <h2>Gece Servisimizde En Sık Karşılaşılan Arızalar:</h2>
      <ul>
        <li><strong>Ana Kofra Sigortası Patlaması:</strong> Daire girişindeki yüksek amperli kartuş veya NH sigortanın gece kliması veya ısıtıcı yükünden yanması.</li>
        <li><strong>Kombi ve Şofben Elektrik Kesintisi:</strong> Kış aylarında kombi besleme hattının sigorta atırması sonucu evin soğuması.</li>
        <li><strong>Buzdolabı ve Dondurucu Koruma Aciliyeti:</strong> İş yerlerinde ve evlerde erime tehlikesi yaşayan gıdalar için acil faz aktarımı.</li>
        <li><strong>Otomatik Kepenk ve Garaj Kapısı Kilitlenmesi:</strong> Elektrik kesintisi nedeniyle açılmayan mağaza kepenklerine harici UPS veya manuel güç beslemesi.</li>
      </ul>

      <h3>Neden Aya Elektrik Nöbetçi Servisi?</h3>
      <p>1. <strong>Sürpriz Fiyat Yok:</strong> Telefonda ön arıza tespiti yapılır ve şeffaf servis bedeli bildirilir.<br>
      2. <strong>Donanımlı Mobil Atölye:</strong> Gece açık elektrikçi aramak yerine aracımızdaki 400'den fazla parça ile yerinde onarım sağlıyoruz.<br>
      3. <strong>Resmi Fatura ve Garanti:</strong> Yapılan her tamirat ve takılan parçalar 1 yıl garantilidir.</p>

      <!-- GEO Kapsama -->
      <div style="background-color: #f1f5f9; padding: 16px; border-radius: 10px; margin: 20px 0;">
        <strong>Aktif Gece Nöbet Bölgelerimiz:</strong> Kadıköy, Beşiktaş, Şişli, Kağıthane, Bakırköy, Sarıyer, Üsküdar, Ataşehir, Beylikdüzü, Esenyurt, Bahçelievler, Zeytinburnu, Başakşehir ve diğer 39 ilçe.
      </div>

      <div style="text-align: center; margin-top: 25px;">
        <a href="tel:05300695393" style="display: inline-block; background-color: #ffb703; color: #0b2e59; font-weight: 800; font-size: 1.1rem; padding: 14px 32px; border-radius: 12px; text-decoration: none;">
          📞 7/24 Nöbetçi Usta Hattı: 0530 069 53 93
        </a>
      </div>
    `
  },
  {
    id: "4",
    slug: "elektrik-panosu-degisimi-ve-sigorta-yenileme",
    title: "Eski Elektrik Panosu Değişimi ve Sigorta Yenileme Fiyatları 2026 (Yangın Güvenliği Standartları)",
    excerpt: "15 yıldan eski W-Otomat sigortalar ve eriyen klemensler yangın riski taşır. Daire ve bina elektrik panosu yenileme süreci, TSE onaylı malzeme seçimi ve maliyetler.",
    category: "Pano Yenileme",
    date: "16 Ekim 2026",
    readTime: "5 Dk",
    imageUrl: panelRenovateImg,
    views: 1320,
    status: "Yayında",
    tags: ["Pano Değişimi", "Sigorta Yenileme", "Siemens Sigorta", "Daire Elektrik Panosu"],
    content: `
      <!-- AEO Hızlı Yanıt -->
      <div style="background-color: #f0fdf4; border-left: 4px solid #22c55e; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
        <p style="margin: 0; font-weight: 700; color: #15803d; font-size: 1.05rem;">⚡ Elektrik Panosu Ne Zaman Değiştirilmeli?</p>
        <p style="margin: 8px 0 0 0; color: #166534; font-size: 0.95rem; line-height: 1.5;">
          Eğer panonuzda kaçak akım rölesi yoksa, sigortalar vidalı tip buşonluysa veya sigorta gövdelerinde sararma/kararma varsa panonuz derhal yenilenmelidir. Standart bir daire panosu değişimi ortalama <strong>2 ila 3 saat</strong> sürer ve elektrik kesintisi minimumda tutulur.
        </p>
      </div>

      <!-- CTA -->
      <div style="background: linear-gradient(135deg, #0b2e59 0%, #061933 100%); color: white; padding: 22px; border-radius: 14px; text-align: center; margin: 24px 0;">
        <h3 style="color: white; margin: 0 0 8px 0; font-size: 1.35rem; font-weight: 800;">Eski ve Güvensiz Panonuzu Güvenle Yenileyelim</h3>
        <p style="color: #93c5fd; font-size: 0.9rem; margin: 0 0 16px 0;">Siemens ve Schneider marka B ve C tipi sigortalarla 1 günde sıfır riskli pano kurulumu.</p>
        <a href="tel:05300695393" style="display: inline-block; background-color: #ffb703; color: #0b2e59; font-weight: 800; font-size: 1.1rem; padding: 12px 28px; border-radius: 10px; text-decoration: none;">
          📞 0530 069 53 93 - Ücretsiz Pano Keşfi İsteyin
        </a>
      </div>

      <h2>Modern Bir Elektrik Panosunda Bulunması Zorunlu Bileşenler:</h2>
      <ul>
        <li><strong>30mA Hayat Koruma Kaçak Akım Rölesi:</strong> İnsan sağlığını ölümcül şoklardan korur.</li>
        <li><strong>300mA Yangın Koruma Rölesi:</strong> Bina ana girişinde izolasyon arızalarından kaynaklanan yangınları engeller.</li>
        <li><strong>Doğru Karakteristikli Sigortalar:</strong> Aydınlatma için B10A, normal prizler için B16A, klima ve fırın gibi motorlu yükler için C16A veya C20A sigorta kullanılmalıdır.</li>
        <li><strong>Parafudr (Aşırı Gerilim Koruyucu):</strong> Yıldırım düşmesi ve şebeke voltaj dalgalanmalarında TV ve buzdolabı gibi kartlı cihazları yakmaktan korur.</li>
      </ul>

      <h3>Pano Yenileme Aşamaları:</h3>
      <p>1. <strong>Yük Hesabı:</strong> Dairede kullanılan toplam kW güce göre linye kesitleri kontrol edilir.<br>
      2. <strong>Eski Panonun Sökülmesi:</strong> Yanmış klemensler ve güvensiz kablolar temizlenir.<br>
      3. <strong>Yeni Halogen-Free Yanmaz Kasa Montajı:</strong> Sıva altı veya sıva üstü IP40 standartlı pano montajı yapılır.<br>
      4. <strong>Yüksükleme ve Etiketleme:</strong> Çok damarlı kablolar izoleli yüksüklerle sıkılarak her sigortanın hangi odaya gittiği Türkçe etiketlenir.</p>

      <div style="text-align: center; margin-top: 30px;">
        <a href="tel:05300695393" style="display: inline-block; background-color: #0b2e59; color: #ffb703; font-weight: 800; font-size: 1.1rem; padding: 14px 32px; border-radius: 12px; text-decoration: none; border: 2px solid #ffb703;">
          📞 Pano Yenileme Randevusu: 0530 069 53 93
        </a>
      </div>
    `
  },
  {
    id: "5",
    slug: "sofben-termosifon-elektrik-baglantisi-montaji",
    title: "Şofben ve Termosifon Elektrik Bağlantısı Nasıl Yapılır? (Hayati Güvenlik Kuralları)",
    excerpt: "Banyoda şofben elektrik çarpması facialarını önleyin! 3x2.5mm kablo, ayrı sigorta ve 30mA kaçak akım rölesi montaj standartları ve profesyonel usta kurulumu.",
    category: "Montaj & Tesisat",
    date: "16 Ekim 2026",
    readTime: "5 Dk",
    imageUrl: waterHeaterImg,
    views: 1670,
    status: "Yayında",
    tags: ["Şofben Montajı", "Termosifon Bağlantısı", "Banyo Elektrik Güvenliği", "Topraklama"],
    content: `
      <!-- AEO Hızlı Yanıt -->
      <div style="background-color: #fef2f2; border-left: 4px solid #ef4444; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
        <p style="margin: 0; font-weight: 700; color: #991b1b; font-size: 1.05rem;">⚠️ Şofben Normal Prize Takılır mı?</p>
        <p style="margin: 8px 0 0 0; color: #7f1d1d; font-size: 0.95rem; line-height: 1.5;">
          <strong>KESİNLİKLE HAYIR!</strong> Ani su ısıtıcı şofbenler 7000 Watt (yaklaşık 32 Amper) akım çeker. Standart bir ev prizi ise en fazla 16 Amper taşır. Normal prize takılan şofben prizi dakikalar içinde eriterek yangına ve ölümcül banyo elektrik kaçaklarına sebep olur. Şofbene panodan direkt 3x4mm² veya 3x2.5mm² özel linye çekilmelidir.
        </p>
      </div>

      <!-- CTA -->
      <div style="background: linear-gradient(135deg, #0b2e59 0%, #061933 100%); color: white; padding: 22px; border-radius: 14px; text-align: center; margin: 24px 0;">
        <h3 style="color: white; margin: 0 0 8px 0; font-size: 1.35rem; font-weight: 800;">Banyonuzda Hayatınızı Riske Atmayın</h3>
        <p style="color: #93c5fd; font-size: 0.9rem; margin: 0 0 16px 0;">TSE standartlı yanmaz kablo, bağımsız Viko sigorta ve kaçak akım testi ile garantili montaj.</p>
        <a href="tel:05300695393" style="display: inline-block; background-color: #ffb703; color: #0b2e59; font-weight: 800; font-size: 1.1rem; padding: 12px 28px; border-radius: 10px; text-decoration: none;">
          📞 0530 069 53 93 - Şofben Elektrik Ustası Çağır
        </a>
      </div>

      <h2>Güvenli Bir Şofben Montajı İçin Olmazsa Olmaz 4 Kural:</h2>
      <ol>
        <li><strong>Müstakil Sigorta Şartı:</strong> Şofben hattı panoda başka hiçbir lamba veya prizle birleştirilmemeli; bağımsız 32A veya 40A sigortaya bağlanmalıdır.</li>
        <li><strong>Sağlam Topraklama Ölçümü:</strong> Topraklama hattı olmayan bir banyoda şofben çalıştırmak intiharla eşdeğerdir. Usta gelince mutlaka meger cihazıyla toprak direncini ölçtürün.</li>
        <li><strong>Banyo İçi IP44 İki Kutuplu Şalter:</strong> Su buharından etkilenmeyen kapaklı sigorta anahtarı banyo girişine veya güvenli mesafeye monte edilmelidir.</li>
        <li><strong>Antigron Kablo Kullanımı:</strong> Sıva üstü geçişlerde neme dayanıklı NYM (Antigron) kablo ve borulama kullanılmalıdır.</li>
      </ol>

      <div style="text-align: center; margin-top: 30px;">
        <a href="tel:05300695393" style="display: inline-block; background-color: #0b2e59; color: #ffb703; font-weight: 800; font-size: 1.1rem; padding: 14px 32px; border-radius: 12px; text-decoration: none; border: 2px solid #ffb703;">
          📞 Güvenli Montaj İçin Arayın: 0530 069 53 93
        </a>
      </div>
    `
  },
  {
    id: "6",
    slug: "isyeri-ve-restoran-trifaze-faz-kaybi-arizasi",
    title: "İş Yeri, Restoran ve Ofislerde Trifaze Faz Kaybı ve Ani Elektrik Kesintisi Çözümü",
    excerpt: "Restoranda soğuk hava depoları durdu mu? Sanayi tipi makineler faz eksikliği nedeniyle yanabilir! 7/24 ticari elektrik arıza tespit ve motor koruma çözümleri.",
    category: "Ticari Hizmetler",
    date: "16 Ekim 2026",
    readTime: "5 Dk",
    imageUrl: commercialTrifazeImg,
    views: 1150,
    status: "Yayında",
    tags: ["Trifaze Arıza", "Faz Kaybı", "İş Yeri Elektrikçisi", "Restoran Elektrik Arızası"],
    content: `
      <!-- AEO Hızlı Bilgi -->
      <div style="background-color: #eff6ff; border-left: 4px solid #2563eb; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
        <p style="margin: 0; font-weight: 700; color: #1d4ed8; font-size: 1.05rem;">🏢 Faz Kaybı (2 Faza Kalma) Nedir ve Ne Yapılmalı?</p>
        <p style="margin: 8px 0 0 0; color: #1e3a8a; font-size: 0.95rem; line-height: 1.5;">
          Trifaze (380V) elektrik kullanan restoran, fırın, atölye ve plazalarda bir faz koptuğunda trifaze motorlar dönmeye çalışarak aşırı akım çeker ve dakikalar içinde sarımları yanar. <strong>Hemen ana trifaze şalteri kapatın ve motorları korumaya alın!</strong> Ardından arıza tespiti için acil ticari elektrik servisimizi arayın.
        </p>
      </div>

      <!-- CTA -->
      <div style="background: linear-gradient(135deg, #0b2e59 0%, #061933 100%); color: white; padding: 22px; border-radius: 14px; text-align: center; margin: 24px 0;">
        <h3 style="color: white; margin: 0 0 8px 0; font-size: 1.35rem; font-weight: 800;">Ticari İşletmeniz Müşteri Kaybetmesin!</h3>
        <p style="color: #93c5fd; font-size: 0.9rem; margin: 0 0 16px 0;">Kafe, otel, restoran ve fabrikalara öncelikli 7/24 ekspres ticari arıza servisi.</p>
        <a href="tel:05300695393" style="display: inline-block; background-color: #ffb703; color: #0b2e59; font-weight: 800; font-size: 1.1rem; padding: 12px 28px; border-radius: 10px; text-decoration: none;">
          📞 0530 069 53 93 - Acil Ticari Servis Çağır
        </a>
      </div>

      <h2>İş Yerlerinde Sunduğumuz Acil Çözümler:</h2>
      <ul>
        <li><strong>Faz Koruma Rölesi ve Motor Koruma Şalteri Montajı:</strong> Faz gittiğinde motoru otomatik durdurarak yüzbinlerce liralık kompresör yanmasını önler.</li>
        <li><strong>Jeneratör ve Transfer Panosu (ATS) Arızaları:</strong> Elektrik kesildiğinde otomatik devreye girmeyen transfer panosu onarımı.</li>
        <li><strong>UPS (Kesintisiz Güç Kaynağı) Bypass ve Akü Kontrolü:</strong> Sunucu ve POS sistemlerinin çökmesini önleme.</li>
        <li><strong>Soğuk Hava Deposu Acil Güç Hattı Çekimi:</strong> Bozulma tehlikesi olan et ve gıdalar için acil faz aktarımı.</li>
      </ul>

      <div style="text-align: center; margin-top: 30px;">
        <a href="tel:05300695393" style="display: inline-block; background-color: #0b2e59; color: #ffb703; font-weight: 800; font-size: 1.1rem; padding: 14px 32px; border-radius: 12px; text-decoration: none; border: 2px solid #ffb703;">
          📞 7/24 Ticari Arıza: 0530 069 53 93
        </a>
      </div>
    `
  },
  {
    id: "7",
    slug: "elektrikli-arac-ev-sarj-istasyonu-wallbox-kurulumu",
    title: "Ev ve Siteye Elektrikli Araç (EV) Şarj İstasyonu Kurulumu: Wallbox Montaj Rehberi",
    excerpt: "Togg, Tesla, BYD ve BMW için ev tipi ve otopark Wallbox şarj cihazı montajı. Güç artırımı, trifaze hat çekimi, keşif ve yetkili elektrikçi onay süreçleri.",
    category: "Yeni Nesil Enerji",
    date: "16 Ekim 2026",
    readTime: "6 Dk",
    imageUrl: evImg,
    views: 3100,
    status: "Yayında",
    tags: ["EV Şarj İstasyonu", "Wallbox Kurulumu", "Togg Şarj", "Tesla Şarj Kurulumu"],
    content: `
      <!-- AEO Hızlı Bilgi -->
      <div style="background-color: #f0fdf4; border-left: 4px solid #16a34a; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
        <p style="margin: 0; font-weight: 700; color: #15803d; font-size: 1.05rem;">🚗 Evde Elektrikli Araç Şarj İstasyonu Kurulum Şartları</p>
        <p style="margin: 8px 0 0 0; color: #166534; font-size: 0.95rem; line-height: 1.5;">
          Bir Wallbox (11kW veya 22kW) şarj istasyonu kurmak için dairenizde veya otoparkınızda trifaze elektrik altyapısı, uygun kesitte (genellikle 5x6mm² veya 5x10mm²) yanmaz kablo, Tip B kaçak akım koruması ve müstakil sigorta zorunludur. Aya Elektrik olarak keşif, proje ve anahtar teslim kurulum yapıyoruz.
        </p>
      </div>

      <!-- CTA -->
      <div style="background: linear-gradient(135deg, #0b2e59 0%, #061933 100%); color: white; padding: 22px; border-radius: 14px; text-align: center; margin: 24px 0;">
        <h3 style="color: white; margin: 0 0 8px 0; font-size: 1.35rem; font-weight: 800;">Elektrikli Aracınızı Evde Güvenle Şarj Edin</h3>
        <p style="color: #93c5fd; font-size: 0.9rem; margin: 0 0 16px 0;">Togg, Tesla, Mercedes, Porsche ve tüm markalara uygun lisanslı Wallbox altyapısı.</p>
        <a href="tel:05300695393" style="display: inline-block; background-color: #ffb703; color: #0b2e59; font-weight: 800; font-size: 1.1rem; padding: 12px 28px; border-radius: 10px; text-decoration: none;">
          📞 0530 069 53 93 - EV Şarj Keşif Randevusu Al
        </a>
      </div>

      <h2>Wallbox Kurulumunda Dikkat Edilecek 3 Kritik Husus:</h2>
      <ul>
        <li><strong>Tip B / Tip EV Kaçak Akım Koruması:</strong> Elektrikli araç şarj ederken DC (doğru akım) kaçakları oluşabilir. Standart Tip AC röleler bu kaçakları algılamaz ve körleşir. Mutlaka EV korumalı röle takılmalıdır.</li>
        <li><strong>Sayaçtan Otoparka Hat Çekimi:</strong> Kapalı otoparklarda yangın yönetmeliğine uygun çelik spiral veya EMT boru içinde alev iletmez kablolama yapılmalıdır.</li>
        <li><strong>Site Yönetimi İzni ve Güç Artırımı:</strong> Apartman otoparklarında ana trafo gücü incelenmeli ve gerektiğinde sayaçtan bağımsız abonelik hattı tesis edilmelidir.</li>
      </ul>

      <div style="text-align: center; margin-top: 30px;">
        <a href="tel:05300695393" style="display: inline-block; background-color: #0b2e59; color: #ffb703; font-weight: 800; font-size: 1.1rem; padding: 14px 32px; border-radius: 12px; text-decoration: none; border: 2px solid #ffb703;">
          📞 Şarj İstasyonu Danışma Hattı: 0530 069 53 93
        </a>
      </div>
    `
  },
  {
    id: "8",
    slug: "avize-spot-ve-akilli-aydinlatma-montaji-rehberi",
    title: "Lüks Avize, Manyetik Spot ve Akıllı Led Aydınlatma Montajı (Tavan Hattı & Güvenli Bağlantı)",
    excerpt: "Ağır kristal avizeler ve manyetik ray spotlar için güvenli dübel seçimi, tavan kablo güçlendirmesi ve akıllı anahtar dimmer bağlantı hizmeti.",
    category: "Aydınlatma & Dekorasyon",
    date: "16 Ekim 2026",
    readTime: "4 Dk",
    imageUrl: lightingImg,
    views: 1540,
    status: "Yayında",
    tags: ["Avize Montajı", "Spot Lamba", "Akıllı Aydınlatma", "Tavan Aydınlatma"],
    content: `
      <!-- AEO Hızlı Yanıt -->
      <div style="background-color: #fefce8; border-left: 4px solid #ca8a04; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
        <p style="margin: 0; font-weight: 700; color: #854d0e; font-size: 1.05rem;">💡 Ağır Avize Alçıpan Tavana Nasıl Asılır?</p>
        <p style="margin: 8px 0 0 0; color: #713f12; font-size: 0.95rem; line-height: 1.5;">
          10 kg'dan ağır kristal veya pirinç avizeler asla doğrudan alçıpan kaplamaya asılamaz. Tavan betonu bulunarak çelik çakmalı dübel veya kancalı rot mili ile ana tavan tabliyesine sabitlenmelidir. Aksi halde tavan çökmesi ve yangın tehlikesi doğar.
        </p>
      </div>

      <!-- CTA -->
      <div style="background: linear-gradient(135deg, #0b2e59 0%, #061933 100%); color: white; padding: 22px; border-radius: 14px; text-align: center; margin: 24px 0;">
        <h3 style="color: white; margin: 0 0 8px 0; font-size: 1.35rem; font-weight: 800;">Yeni Avizenizi Tertemiz ve Kusursuz Takalım</h3>
        <p style="color: #93c5fd; font-size: 0.9rem; margin: 0 0 16px 0;">Lazer terazi ile sıfır hata, akıllı telefon kontrollü dimmer ve gizli LED montajı.</p>
        <a href="tel:05300695393" style="display: inline-block; background-color: #ffb703; color: #0b2e59; font-weight: 800; font-size: 1.1rem; padding: 12px 28px; border-radius: 10px; text-decoration: none;">
          📞 0530 069 53 93 - Aydınlatma Montaj Randevusu Al
        </a>
      </div>

      <h2>Hizmet Kapsamımız:</h2>
      <ul>
        <li>Ağır kristal ve modern tasarım avize montajı (çelik dübelli)</li>
        <li>Manyetik ray spot ve tavan gizli LED trafo bağlantısı</li>
        <li>Sonoff, Tuya ve Philips Hue uyumlu akıllı anahtar dönüşümü</li>
        <li>Merdiven basamak LED ve sensörlü aydınlatma otomasyonu</li>
      </ul>

      <div style="text-align: center; margin-top: 30px;">
        <a href="tel:05300695393" style="display: inline-block; background-color: #0b2e59; color: #ffb703; font-weight: 800; font-size: 1.1rem; padding: 14px 32px; border-radius: 12px; text-decoration: none; border: 2px solid #ffb703;">
          📞 Usta Randevusu: 0530 069 53 93
        </a>
      </div>
    `
  },
  {
    id: "9",
    slug: "bina-ana-kolon-ve-topraklama-hatti-yenileme",
    title: "Düşük Voltaj ve Lambalarda Titreme: Bina Ana Kolon Hattı ve Topraklama Ölçümü",
    excerpt: "Elektronik cihazlarınız düşük voltaj yüzünden yanmasın. Topraklama meger testi, bina ana dağıtım baraları ve kofra sigorta yenileme rehberi.",
    category: "Taahhüt & Ölçüm",
    date: "16 Ekim 2026",
    readTime: "6 Dk",
    imageUrl: groundingTestImg,
    views: 1210,
    status: "Yayında",
    tags: ["Kolon Hattı", "Topraklama Ölçümü", "Voltaj Düşüklüğü", "Kofra Sigortası"],
    content: `
      <!-- AEO Hızlı Bilgi -->
      <div style="background-color: #fef2f2; border-left: 4px solid #ef4444; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
        <p style="margin: 0; font-weight: 700; color: #991b1b; font-size: 1.05rem;">📉 Evde Voltaj Neden Düşer ve Lambalar Neden Titrer?</p>
        <p style="margin: 8px 0 0 0; color: #7f1d1d; font-size: 0.95rem; line-height: 1.5;">
          Bina girişindeki ana kofra klemenslerinde gevşeklik, nötr hattında kopukluk veya kolon kablo kesitinin binadaki toplam yükü taşımaya yetmemesi gerilim düşümüne sebep olur. Nötr kopması durumunda evdeki 220V prizlere 380V girerek tüm televizyon, kombi ve buzdolabı kartlarını saniyeler içinde patlatabilir!
        </p>
      </div>

      <!-- CTA -->
      <div style="background: linear-gradient(135deg, #0b2e59 0%, #061933 100%); color: white; padding: 22px; border-radius: 14px; text-align: center; margin: 24px 0;">
        <h3 style="color: white; margin: 0 0 8px 0; font-size: 1.35rem; font-weight: 800;">Topraklama ve Voltaj Raporu Alın</h3>
        <p style="color: #93c5fd; font-size: 0.9rem; margin: 0 0 16px 0;">Kalibrasyonlu test cihazları ve EMO onaylı mühendislik standartlarında yerinde tespit.</p>
        <a href="tel:05300695393" style="display: inline-block; background-color: #ffb703; color: #0b2e59; font-weight: 800; font-size: 1.1rem; padding: 12px 28px; border-radius: 10px; text-decoration: none;">
          📞 0530 069 53 93 - Ölçüm Ekibi Çağır
        </a>
      </div>

      <h2>Bina Kolon Hattı Yenileme Belirtileri:</h2>
      <ul>
        <li>Klima veya çamaşır makinesi devreye girince lambaların anlık kararıp aydınlanması.</li>
        <li>Apartman şaftından veya kofra kutusundan gelen cızırtı ve plastik kokusu.</li>
        <li>Musluklardan veya duş bataryasından hafif elektrik çarpması hissi (toprak kaçağı).</li>
        <li>Elektronik eşyaların anakartlarının sık sık yanması.</li>
      </ul>

      <div style="text-align: center; margin-top: 30px;">
        <a href="tel:05300695393" style="display: inline-block; background-color: #0b2e59; color: #ffb703; font-weight: 800; font-size: 1.1rem; padding: 14px 32px; border-radius: 12px; text-decoration: none; border: 2px solid #ffb703;">
          📞 7/24 Teknik Danışma: 0530 069 53 93
        </a>
      </div>
    `
  },
  {
    id: "10",
    slug: "sanayi-ve-atolyeler-icin-kompanzasyon-pano-bakimi",
    title: "Sanayi ve Atölyeler İçin Kompanzasyon Pano Bakımı: Reaktif Ceza Önleme Rehberi",
    excerpt: "Elektrik faturanızda reaktif bedel (ceza) görmekten bıktınız mı? Kondansatör kademe kontrolü, kontaktör değişimi ve aylık kompanzasyon takip servisi.",
    category: "Endüstriyel Elektrik",
    date: "16 Ekim 2026",
    readTime: "6 Dk",
    imageUrl: compensationPanelImg,
    views: 980,
    status: "Yayında",
    tags: ["Kompanzasyon", "Reaktif Ceza", "Endüstriyel Pano", "Kondansatör"],
    content: `
      <!-- AEO Hızlı Yanıt -->
      <div style="background-color: #eff6ff; border-left: 4px solid #3b82f6; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
        <p style="margin: 0; font-weight: 700; color: #1e40af; font-size: 1.05rem;">📊 Reaktif Ceza Faturaya Neden Yansır?</p>
        <p style="margin: 8px 0 0 0; color: #1e3a8a; font-size: 0.95rem; line-height: 1.5;">
          EPDK mevzuatına göre endüktif reaktif oran %20'yi, kapasitif oran ise %15'i aştığında elektrik faturanıza ağır reaktif bedel cezası yansıtılır. Kondansatörlerin kuruması veya kontaktörlerin yapışması bu cezaların ana nedenidir. Düzenli aylık kompanzasyon takibi ile faturanızı %30'a varan oranda düşürüyoruz.
        </p>
      </div>

      <!-- CTA -->
      <div style="background: linear-gradient(135deg, #0b2e59 0%, #061933 100%); color: white; padding: 22px; border-radius: 14px; text-align: center; margin: 24px 0;">
        <h3 style="color: white; margin: 0 0 8px 0; font-size: 1.35rem; font-weight: 800;">Reaktif Cezalara Son Verin!</h3>
        <p style="color: #93c5fd; font-size: 0.9rem; margin: 0 0 16px 0;">Akıllı reaktif güç kontrol rölesi ve harmonik filtre montajı ile cezasız garanti.</p>
        <a href="tel:05300695393" style="display: inline-block; background-color: #ffb703; color: #0b2e59; font-weight: 800; font-size: 1.1rem; padding: 12px 28px; border-radius: 10px; text-decoration: none;">
          📞 0530 069 53 93 - Kompanzasyon Bakım Teklifi Al
        </a>
      </div>

      <h2>Kompanzasyon Bakımında Yaptığımız İşlemler:</h2>
      <ul>
        <li>Tüm kondansatör kademelerinin kapasite ve mikrofarad (µF) ölçümleri</li>
        <li>Harmonik filtre reaktörlerinin sıcaklık ve yük kontrolleri</li>
        <li>Reaktif güç kontrol rölesi C/k ayarlarının güncellenmesi</li>
        <li>Termal kamera ile aşırı ısınan klemens ve baraların tespiti</li>
      </ul>

      <div style="text-align: center; margin-top: 30px;">
        <a href="tel:05300695393" style="display: inline-block; background-color: #0b2e59; color: #ffb703; font-weight: 800; font-size: 1.1rem; padding: 14px 32px; border-radius: 12px; text-decoration: none; border: 2px solid #ffb703;">
          📞 Endüstriyel Servis Hattı: 0530 069 53 93
        </a>
      </div>
    `
  },
  {
    id: "11",
    slug: "klima-salter-attiriyor-klimaya-bagimsiz-hat-cekimi",
    title: "Klima Şalter Attırıyor ve Priz Isınıyor: Klimaya Bağımsız Hat Çekimi ve V-Otomat Sigorta Seçimi (Yangın Önleme Rehberi)",
    excerpt: "Klimanız açılır açılmaz şalter mi atıyor, fişi eritiyor veya priz aşırı ısınıyor mu? 18.000 - 24.000 BTU klimalar için panodan doğrudan bağımsız linye çekimi, C tipi gecikmeli sigorta seçimi ve acil usta çözümleri.",
    category: "Acil Arıza / İklimlendirme",
    date: "16 Ekim 2026",
    readTime: "5 Dk",
    imageUrl: acWiringImg,
    views: 1420,
    status: "Yayında",
    tags: ["Klima Elektrik Tesisatı", "Klima Şalter Attırıyor", "C Tipi Sigorta", "Bağımsız Linye", "İstanbul Acil Elektrikçi", "Aya Elektrik"],
    content: `
      <!-- Teknik Bilgilendirme ve Hızlı Yanıt -->
      <div style="background-color: #eff6ff; border-left: 4px solid #2563eb; padding: 18px; border-radius: 8px; margin-bottom: 24px;">
        <p style="margin: 0; font-weight: 700; color: #1e40af; font-size: 1.1rem;">⚡ Klima Açılınca Neden Şalter veya Sigorta Atar?</p>
        <p style="margin: 8px 0 0 0; color: #1e3a8a; font-size: 0.95rem; line-height: 1.6;">
          <strong>Hızlı Cevap:</strong> İnverter ve on-off klimalar ilk çalışmaya başladığı anda kompresörün kalkış akımı (demeraj akımı) anlık olarak normal çalışma akımının 3 ila 5 katına fırlar. Eğer klimanız aydınlatma veya televizyonla aynı prize bağlıysa, sigortanız hızlı tepkili "B Tipi" ise ya da tesisatta gevşek klemens varsa şalter anında atar veya priz erir. Çözüm: Ana panodan klimaya <strong>müstakil 3x2.5mm² (veya 3x4mm²) bakır linye çekilmeli</strong> ve panoya <strong>C Tipi motor korumalı gecikmeli V-otomat sigorta</strong> takılmalıdır.
        </p>
      </div>

      <!-- %100 Arama & Acil Çağrı Banner -->
      <div style="background: linear-gradient(135deg, #0b2e59 0%, #1e3a8a 100%); color: white; padding: 22px; border-radius: 14px; text-align: center; margin: 24px 0; box-shadow: 0 10px 25px -5px rgba(11, 46, 89, 0.3);">
        <span style="background: #ef4444; color: white; padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 700; text-transform: uppercase;">⚠️ Yangın ve Kısa Devre Uyarısı</span>
        <h3 style="color: white; margin: 10px 0 8px 0; font-size: 1.35rem; font-weight: 800;">Klimanız Priz Eritiyor veya Şalter Tutmuyor mu?</h3>
        <p style="color: #bfdbfe; font-size: 0.95rem; margin: 0 0 16px 0;">Aya Elektrik uzman ekipleri Adana Çukurova, Seyhan, Yüreğir ve Sarıçam'da 15-30 dakikada adresinizde.</p>
        <a href="tel:05300695393" style="display: inline-block; background-color: #ffb703; color: #0b2e59; font-weight: 800; font-size: 1.15rem; padding: 14px 30px; border-radius: 10px; text-decoration: none; box-shadow: 0 4px 12px rgba(255, 183, 3, 0.4);">
          📞 0530 069 53 93 - Acil Klima Hattı Ustası Çağır
        </a>
      </div>

      <h2>Klimanın Sigorta Attırmasının En Yaygın 4 Sebebi</h2>
      <ol style="line-height: 1.8; color: #334155; padding-left: 20px;">
        <li><strong>Yanlış Sigorta Tipi (B Tipi Yerine C Tipi Kullanılmaması):</strong> Evlerdeki prizler genellikle anlık açma yapan B16 sigortalara bağlıdır. Klima kompresörünün demeraj (kalkış) anındaki sıçramayı tolere edebilmesi için motor yüklerine uygun <em>C16 veya C20 gecikmeli sigorta</em> şarttır.</li>
        <li><strong>Aynı Hatta Birden Fazla Yüksek Güçlü Cihazın Bağlı Olması:</strong> Klima, ütü veya elektrikli süpürge aynı linye üzerindeyse toplam yük 3600W'ı aşar ve termik koruma sigortayı güvenle düşürür.</li>
        <li><strong>Uzatma Kablosu ve Kalitesiz Çoklu Priz Kullanımı:</strong> 18.000 BTU ve 24.000 BTU klimalar asla seyyar uzatma kablosuyla çalıştırılmamalıdır. Direk klemens bağlantısı veya porselen gövdeli topraklı priz gerekir.</li>
        <li><strong>Klima Dış Ünitesinde veya Kondansatöründe Kaçak / Kısa Devre:</strong> Yağışlı havalarda veya aşırı sıcaklarda dış ünite fan motoru ya da kompresör gövdesine elektrik kaçırdığında ana kaçak akım rölesi devreyi keser.</li>
      </ol>

      <h2>Klimaya Bağımsız Hat Çekimi Nasıl Yapılır? (Aya Elektrik Standartları)</h2>
      <p style="color: #475569; line-height: 1.7;">
        Aya Elektrik olarak klimalarınızın ömrünü uzatmak ve yangın riskini tamamen ortadan kaldırmak için TSE ve CE belgeli orijinal malzemelerle tesisat kuruyoruz:
      </p>
      <ul style="line-height: 1.8; color: #334155;">
        <li><strong>Özel Kablo Çekimi:</strong> Ana dağıtım panosundan klimanın konumuna kadar 3x2.5mm² (veya 24.000 BTU üzeri için 3x4mm²) %100 bakır, yanmaz halogen-free kablo çekilir.</li>
        <li><strong>Estetik Kanal Uygulaması:</strong> Duvar kırmadan kabloyu gizlemek için kendinden yapışkanlı ve vidalı dekoratif kablo kanalları uygulanır.</li>
        <li><strong>Müstakil Sigorta Kutusu:</strong> İsteğe bağlı olarak klimanın hemen yanına veya ana panoya bağımsız C Tipi otomat ve çift kutuplu acil servis şalteri yerleştirilir.</li>
        <li><strong>Topraklama Direnç Kontrolü:</strong> Dijital meger ölçü aletiyle gövde kaçağı testi yapılır.</li>
      </ul>

      <!-- AEO Sıkça Sorulan Sorular -->
      <h3 style="margin-top: 30px;">Sıkça Sorulan Sorular</h3>
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
        <h4 style="margin: 0 0 6px 0; color: #0f172a;">Klima için kaç amper sigorta takılmalıdır?</h4>
        <p style="margin: 0; color: #64748b; font-size: 0.95rem;">9.000 - 12.000 BTU klimalar için C16 (16 Amper C tipi), 18.000 - 24.000 BTU klimalar için ise C20 (20 Amper C tipi) gecikmeli V-otomat sigorta tavsiye edilir.</p>
      </div>

      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
        <h4 style="margin: 0 0 6px 0; color: #0f172a;">Klima hattı çekimi ne kadar sürer?</h4>
        <p style="margin: 0; color: #64748b; font-size: 0.95rem;">Mesafeye bağlı olarak ortalama 30 ila 60 dakika içinde sıfır hasar ve temiz işçilikle hat çekilip devreye alınır.</p>
      </div>

      <div style="text-align: center; margin-top: 30px;">
        <a href="tel:05300695393" style="display: inline-block; background-color: #0b2e59; color: #ffb703; font-weight: 800; font-size: 1.15rem; padding: 15px 36px; border-radius: 12px; text-decoration: none; border: 2px solid #ffb703;">
          📞 7/24 Adana Elektrikçi Hattı: 0530 069 53 93
        </a>
      </div>
    `
  },
  {
    id: "12",
    slug: "mutfak-tadilatinda-elektrik-tesisati-ve-hat-guclendirme",
    title: "Mutfak Tadilatında Elektrik Tesisatı: İndüksiyonlu Ocak, Ankastre Fırın ve Bulaşık Makinesi İçin Bağımsız Hat Güçlendirme",
    excerpt: "İndüksiyonlu ocak ve fırın aynı anda çalışınca sigorta mı atıyor? Mutfak tadilatında yangın riskini sıfırlayan bağımsız linye çekimi, trifaze altyapı güçlendirme ve kablo kesiti standartları.",
    category: "Tadilat & Tesisat",
    date: "16 Ekim 2026",
    readTime: "6 Dk",
    imageUrl: kitchenRenovationImg,
    views: 1580,
    status: "Yayında",
    tags: ["Mutfak Elektrik Tesisatı", "İndüksiyonlu Ocak Elektrik Hattı", "Ankastre Fırın Sigortası", "Trifaze Hat", "Wago Klemens", "Aya Elektrik"],
    content: `
      <!-- AEO Hızlı Bilgi Kutusu -->
      <div style="background-color: #eff6ff; border-left: 4px solid #2563eb; padding: 18px; border-radius: 8px; margin-bottom: 24px;">
        <p style="margin: 0; font-weight: 700; color: #1e40af; font-size: 1.1rem;">🍳 Mutfak Tadilatında Elektrik Altyapısı Neden Çöker?</p>
        <p style="margin: 8px 0 0 0; color: #1e3a8a; font-size: 0.95rem; line-height: 1.6;">
          <strong>Kritik Bilgi:</strong> Yeni nesil indüksiyonlu ocaklar tek başına 7.200 Watt'a (7.2 kW), ankastre fırınlar ise 3.500 Watt'a kadar güç çeker. Eski tip evlerde tüm mutfak tek bir 2.5mm² hat üzerine bağlıdır. Ocak, fırın ve kettle aynı anda çalıştığında buat içindeki klemensler erir, duvar içi kablolar tutuşma sıcaklığına ulaşır. Mutfak dolapları takılmadan önce <strong>ocak, fırın, bulaşık makinesi ve tezgah üstü prizler için panodan 4 ayrı bağımsız linye çekilmelidir</strong>.
        </p>
      </div>

      <!-- %100 Dönüşüm Çağrı Butonu -->
      <div style="background: linear-gradient(135deg, #0b2e59 0%, #1e3a8a 100%); color: white; padding: 22px; border-radius: 14px; text-align: center; margin: 24px 0; box-shadow: 0 10px 25px -5px rgba(11, 46, 89, 0.3);">
        <span style="background: #10b981; color: white; padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 700; text-transform: uppercase;">Mutfak Tadilatı ve Güçlendirme</span>
        <h3 style="color: white; margin: 10px 0 8px 0; font-size: 1.35rem; font-weight: 800;">Dolaplar Takılmadan Önce Elektrik Altyapınızı Güvenceye Alın!</h3>
        <p style="color: #bfdbfe; font-size: 0.95rem; margin: 0 0 16px 0;">Projeye uygun priz yerleşimi, trifaze indüksiyon hattı ve sigorta kutusu yenileme için anında usta keşfi.</p>
        <a href="tel:05300695393" style="display: inline-block; background-color: #ffb703; color: #0b2e59; font-weight: 800; font-size: 1.15rem; padding: 14px 30px; border-radius: 10px; text-decoration: none; box-shadow: 0 4px 12px rgba(255, 183, 3, 0.4);">
          📞 0530 069 53 93 - Mutfak Tesisat Ustası ile Görüş
        </a>
      </div>

      <h2>Modern Bir Mutfakta Olması Gereken 5 Bağımsız Elektrik Hattı</h2>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 0.95rem;">
        <thead>
          <tr style="background-color: #f1f5f9; text-align: left;">
            <th style="padding: 12px; border: 1px solid #cbd5e1;">Cihaz / Bölge</th>
            <th style="padding: 12px; border: 1px solid #cbd5e1;">Tavsiye Edilen Kablo Kesiti</th>
            <th style="padding: 12px; border: 1px solid #cbd5e1;">Sigorta Tipi</th>
            <th style="padding: 12px; border: 1px solid #cbd5e1;">Önem Derecesi</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px; border: 1px solid #cbd5e1;"><strong>İndüksiyonlu Ocak</strong></td>
            <td style="padding: 12px; border: 1px solid #cbd5e1;">5x2.5mm² (Trifaze) veya 3x4mm² / 3x6mm²</td>
            <td style="padding: 12px; border: 1px solid #cbd5e1;">3x16A veya 1x25A / 32A C Tipi</td>
            <td style="padding: 12px; border: 1px solid #cbd5e1; color: #dc2626; font-weight: 700;">Hayati (Özel Linye)</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #cbd5e1;"><strong>Ankastre Fırın & Mikrodalga</strong></td>
            <td style="padding: 12px; border: 1px solid #cbd5e1;">3x2.5mm² Tam Kesit Bakır</td>
            <td style="padding: 12px; border: 1px solid #cbd5e1;">16A B/C Tipi Bağımsız</td>
            <td style="padding: 12px; border: 1px solid #cbd5e1; color: #ea580c; font-weight: 600;">Yüksek Öncelik</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #cbd5e1;"><strong>Bulaşık Makinesi</strong></td>
            <td style="padding: 12px; border: 1px solid #cbd5e1;">3x2.5mm² Müstakil Hat</td>
            <td style="padding: 12px; border: 1px solid #cbd5e1;">16A B Tipi</td>
            <td style="padding: 12px; border: 1px solid #cbd5e1; color: #ea580c; font-weight: 600;">Yüksek Öncelik</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #cbd5e1;"><strong>Tezgah Üstü Prizler (Kettle, Airfryer, Robot)</strong></td>
            <td style="padding: 12px; border: 1px solid #cbd5e1;">3x2.5mm² Ring Linye</td>
            <td style="padding: 12px; border: 1px solid #cbd5e1;">16A B Tipi</td>
            <td style="padding: 12px; border: 1px solid #cbd5e1;">Standart</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #cbd5e1;"><strong>Buzdolabı & Tezgah Altı Led Aydınlatma</strong></td>
            <td style="padding: 12px; border: 1px solid #cbd5e1;">3x2.5mm² / 2x1.5mm²</td>
            <td style="padding: 12px; border: 1px solid #cbd5e1;">10A / 16A</td>
            <td style="padding: 12px; border: 1px solid #cbd5e1;">Sürekli Enerji</td>
          </tr>
        </tbody>
      </table>

      <h2>Mutfak Tesisatında Aya Elektrik Kalite Standartları</h2>
      <ul style="line-height: 1.8; color: #334155;">
        <li><strong>Wago Yaylı Klemens Kullanımı:</strong> Eski usul bantlı buat ekleri ısınarak yangın çıkarır. Tüm buat bağlantılarında Alman Wago yaylı klemensler kullanarak sıfır ark garantisi veriyoruz.</li>
        <li><strong>Doğru Yük Dağılımı ve Faz Dengeleme:</strong> Eğer evinizde trifaze abonelik varsa, fırın, ocak ve bulaşık makinesini farklı fazlara (R-S-T) dağıtarak ana şalterin atmasını engelliyoruz.</li>
        <li><strong>Tezgah Arkası Güvenli Yükseklik:</strong> Su tesisatı ve evyeden en az 60 cm uzaklıkta, tezgah seviyesinden 10-15 cm yukarıda çocuk korumalı IP prizler yerleştiriyoruz.</li>
        <li><strong>Lazerli Kanal Açma ve Tozsuz İşçilik:</strong> Vakumlu kanal açma makinesiyle mutfağınızı toza boğmadan kanalları açıp boruluyoruz.</li>
      </ul>

      <!-- AEO Soru & Cevap -->
      <h3 style="margin-top: 30px;">Merak Edilen Sorular</h3>
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
        <h4 style="margin: 0 0 6px 0; color: #0f172a;">İndüksiyonlu ocak normal prize takılır mı?</h4>
        <p style="margin: 0; color: #64748b; font-size: 0.95rem;">Kesinlikle hayır. Standart bir ev prizi en fazla 16 Amper (3.600W) taşır. 7.200W güçteki indüksiyonlu ocak normal prize takılırsa priz erir ve elektrik yangınına yol açar. Özel kalın kesitli linye ve direkt klemens bağlantısı gerekir.</p>
      </div>

      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
        <h4 style="margin: 0 0 6px 0; color: #0f172a;">Adana içi mutfak keşif ve projelendirme yapıyor musunuz?</h4>
        <p style="margin: 0; color: #64748b; font-size: 0.95rem;">Evet! Çukurova, Seyhan, Yüreğir ve Sarıçam başta olmak üzere tüm Adana'da mimari mutfak projelerine uygun ücretsiz ön keşif ve malzeme planlaması yapıyoruz.</p>
      </div>

      <div style="text-align: center; margin-top: 30px;">
        <a href="tel:05300695393" style="display: inline-block; background-color: #0b2e59; color: #ffb703; font-weight: 800; font-size: 1.15rem; padding: 15px 36px; border-radius: 12px; text-decoration: none; border: 2px solid #ffb703;">
          📞 İstanbul Mutfak Tesisat Ustası: 0530 069 53 93
        </a>
      </div>
    `
  },
  {
    id: "13",
    slug: "fuar-standi-elektrik-kurulumu-ifm-tuyap-pano-aydinlatma",
    title: "Fuar Standı Elektrik Kurulumu Nasıl Yapılır? İFM ve TÜYAP Dağıtım Panosu & Aydınlatma Şartnamesi",
    excerpt: "İstanbul Fuar Merkezi (İFM) ve TÜYAP fuarlarında stant dağıtım panosu, trifaze yük dengeleme, kauçuk kablo rampası ve 7/24 teknik nöbet standartları.",
    category: "Fuar & Etkinlik Elektriği",
    date: "26 Ekim 2026",
    readTime: "6 Dk",
    imageUrl: fuarStandImg,
    views: 890,
    status: "Yayında",
    tags: ["Fuar Elektriği", "İFM Yeşilköy", "TÜYAP Stand", "Trifaze Pano", "Aya Elektrik"],
    content: `
      <div style="background-color: #f0fdf4; border-left: 4px solid #16a34a; padding: 18px; border-radius: 10px; margin-bottom: 24px;">
        <p style="margin: 0; font-weight: 800; color: #166534; font-size: 1.05rem;">🎪 AEO Doğrudan Yanıt (Fuar Teknik Şartnamesi):</p>
        <p style="margin: 8px 0 0 0; color: #14532d; font-size: 0.95rem; line-height: 1.6;">
          İFM ve TÜYAP gibi uluslararası fuar merkezlerinde stant elektriği kurulurken: (1) Tüm beslemelerin fuar idaresi onaylı <strong>30mA Kaçak Akım Koruma Rölesi</strong> bulunan mobil dağıtım panolarından alınması, (2) Ziyaretçi koridorlarında <strong>ağır tonaj kauçuk kablo rampalarının</strong> kullanılması, (3) 3 Faz arasında dengeli akım dağılımı (faz balansı) yapılması ve (4) EMO/EKAT yetkili fen adamı onaylı <strong>topraklama ölçüm raporunun</strong> fuar teknik ofisine teslim edilmesi zorunludur.
        </p>
      </div>

      <div style="background: linear-gradient(135deg, #0b2e59 0%, #04152d 100%); color: white; padding: 22px; border-radius: 14px; text-align: center; margin: 24px 0; border: 1px solid #1e3a8a;">
        <span style="background: #ffb703; color: #0b2e59; font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 20px; text-transform: uppercase;">İFM & TÜYAP Kurumsal Fuar Ekibi</span>
        <h3 style="color: white; margin: 10px 0 6px 0; font-size: 1.35rem; font-weight: 800;">Fuar Standınız İçin Acil Elektrik & Pano mu Lazım?</h3>
        <p style="color: #93c5fd; font-size: 0.9rem; margin: 0 0 16px 0;">Kurulum gecesinden kapanışa kadar 20 dakikada stant başında nöbetçi ekibimiz hazır.</p>
        <a href="tel:05300695393" style="display: inline-block; background-color: #ffb703; color: #0b2e59; font-weight: 800; font-size: 1.05rem; padding: 12px 28px; border-radius: 10px; text-decoration: none;">
          📞 0530 069 53 93 - Fuar Teknik Masası
        </a>
      </div>

      <h2>Fuar Standı Elektrik Tesisatında En Sık Yapılan Hatalar</h2>
      <p>Fuar sabahı şalterin atması kurumsal prestij kaybına yol açar. En sık rastlanan sorunlar: kahve makinesi ve fırın gibi yüksek güçlü cihazların aydınlatma prizine takılması, zayıf nötr bağlantısı sebebiyle LED trafolarının yanması ve kabloların açıkta bırakılarak ezilmesidir.</p>

      <h3>Aya Elektrik Fuar Hizmet Kapsamı:</h3>
      <ul>
        <li><strong>16A - 63A CEE Norm Priz Kutuları:</strong> Ağır sanayi makineleri ve robotik kollar için trifaze 380V güç.</li>
        <li><strong>Truss Spot Ray Aydınlatma:</strong> Ürünlerinizi parlatan 4000K doğal beyaz LED aydınlatma tasarımı.</li>
        <li><strong>Fuar İdaresi Onaylı Proje & Rapor:</strong> İFM ve TÜYAP teknik ekiplerine kaşeli topraklama teslim belgesi.</li>
        <li><strong>Fuar Boyunca Stant Nöbeti:</strong> Açılış saatleri boyunca olası sigorta atmasına saniyeler içinde müdahale.</li>
      </ul>
    `
  },
  {
    id: "14",
    slug: "klima-montaji-oncesi-elektrik-hatti-kablo-sigorta-tablosu",
    title: "Klima Montajı Öncesi Elektrik Hattı Nasıl Çekilir? BTU Değerine Göre Kablo ve Sigorta Tablosu",
    excerpt: "9.000 BTU'dan 24.000 BTU'ya kadar inverter klimalar için panodan bağımsız hat, C tipi gecikmeli sigorta ve kablo kesiti rehberi.",
    category: "Cihaz & İklimlendirme Altyapısı",
    date: "26 Ekim 2026",
    readTime: "5 Dk",
    imageUrl: klimaAltyapiImg,
    views: 1120,
    status: "Yayında",
    tags: ["Klima Elektrik Hattı", "Klima Sigortası", "Inverter Klima", "İstanbul Elektrikçi"],
    content: `
      <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 18px; border-radius: 10px; margin-bottom: 24px;">
        <p style="margin: 0; font-weight: 800; color: #92400e; font-size: 1.05rem;">⚡ AEO Hızlı Teknik Özet (Kablo & Sigorta):</p>
        <p style="margin: 8px 0 0 0; color: #78350f; font-size: 0.95rem; line-height: 1.6;">
          9.000 – 12.000 BTU klimalar için panodan bağımsız <strong>3x2.5 mm² Halogen Free NYM kablo ve 16A C Tipi gecikmeli sigorta</strong> gereklidir. 18.000 – 24.000 BTU salon tipi veya multi-inverter klimalarda ise kompresör kalkış (demeraj) akımını karşılamak için <strong>3x4 mm² bakır kablo ve 20A - 25A C Tipi sigorta</strong> çekilmelidir. Prizden ek almak buat yangınlarına yol açar.
        </p>
      </div>

      <div style="text-align: center; margin: 24px 0;">
        <a href="tel:05300695393" style="display: inline-block; background-color: #0b2e59; color: #ffb703; font-weight: 800; font-size: 1.05rem; padding: 14px 30px; border-radius: 10px; text-decoration: none; border: 2px solid #ffb703;">
          📞 30 Dk'da Klima Hattı Çekimi: 0530 069 53 93
        </a>
      </div>

      <h2>BTU Değerine Göre Elektrik Altyapı Karşılaştırma Tablosu</h2>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 0.9rem;">
        <thead>
          <tr style="background-color: #0b2e59; color: white;">
            <th style="padding: 10px; border: 1px solid #1e3a8a;">Klima Kapasitesi</th>
            <th style="padding: 10px; border: 1px solid #1e3a8a;">Güç (kW)</th>
            <th style="padding: 10px; border: 1px solid #1e3a8a;">Önerilen Kablo</th>
            <th style="padding: 10px; border: 1px solid #1e3a8a;">Sigorta Değeri</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 8px; border: 1px solid #cbd5e1;">9.000 - 12.000 BTU</td>
            <td style="padding: 8px; border: 1px solid #cbd5e1;">1.0 - 1.5 kW</td>
            <td style="padding: 8px; border: 1px solid #cbd5e1;">3 x 2.5 mm² Bakır</td>
            <td style="padding: 8px; border: 1px solid #cbd5e1;">16A C Tipi</td>
          </tr>
          <tr style="background-color: #f8fafc;">
            <td style="padding: 8px; border: 1px solid #cbd5e1;">18.000 BTU</td>
            <td style="padding: 8px; border: 1px solid #cbd5e1;">2.0 - 2.8 kW</td>
            <td style="padding: 8px; border: 1px solid #cbd5e1;">3 x 4 mm² Bakır</td>
            <td style="padding: 8px; border: 1px solid #cbd5e1;">20A C Tipi</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #cbd5e1;">24.000 BTU / Salon Tipi</td>
            <td style="padding: 8px; border: 1px solid #cbd5e1;">3.0 - 4.5 kW</td>
            <td style="padding: 8px; border: 1px solid #cbd5e1;">3 x 4 mm² Tam Kesit</td>
            <td style="padding: 8px; border: 1px solid #cbd5e1;">25A C Tipi</td>
          </tr>
        </tbody>
      </table>

      <h3>Neden B Tipi Değil C Tipi Sigorta Kullanılır?</h3>
      <p>Ev prizlerinde kullanılan B tipi sigortalar anlık akım yükselmesinde hemen atar. Klimalar ilk açılışta kompresörü döndürmek için 2-3 saniye boyunca nominal akımının 3-5 katı demeraj akımı çeker. C tipi sigorta bu kısa kalkışı tolere eder ve klimanın gereksiz yere kapanmasını önler.</p>
    `
  },
  {
    id: "15",
    slug: "akilli-ev-elektrik-tesisati-knx-pano-ve-akilli-sigorta-montaji",
    title: "Akıllı Ev Elektrik Tesisatı Nasıl Yapılır? KNX Pano Kurulumu ve Akıllı Sigortalar",
    excerpt: "Klasik tesisattan akıllı eve geçiş rehberi: KNX Bus kablolama, pano içi Wi-Fi akıllı sigortalar ve uzaktan senaryo yönetimi.",
    category: "Akıllı Ev & Teknoloji",
    date: "26 Ekim 2026",
    readTime: "6 Dk",
    imageUrl: akilliEvImg,
    views: 740,
    status: "Yayında",
    tags: ["Akıllı Ev", "KNX Otomasyon", "Akıllı Sigorta", "Pano Kurulumu"],
    content: `
      <div style="background-color: #eff6ff; border-left: 4px solid #3b82f6; padding: 18px; border-radius: 10px; margin-bottom: 24px;">
        <p style="margin: 0; font-weight: 800; color: #1e40af; font-size: 1.05rem;">📱 AEO Akıllı Ev Mimarisi Yanıtı:</p>
        <p style="margin: 8px 0 0 0; color: #1e3a8a; font-size: 0.95rem; line-height: 1.6;">
          Akıllı ev tesisatında anahtarlar lambaya giden elektriği mekanik olarak kesmez. Tüm aydınlatma ve panjur linyeleri <strong>doğrudan ana dağıtım panosuna</strong> çekilir; anahtarlara ise 220V yerine <strong>KNX Bus zayıf akım kablosu (2x2x0.8 mm²)</strong> bağlanır. Mevcut dairelerde ise kırma dökme yapmadan pano içi Wi-Fi/Zigbee tabanlı <strong>akıllı sigortalar</strong> takılarak cep telefonundan anlık enerji izleme ve uzaktan kapatma sağlanabilir.
        </p>
      </div>

      <h2>Akıllı Sigortalarla Neler Yapılabilir?</h2>
      <ul>
        <li><strong>Evden Çıkış Senaryosu:</strong> Kapı kilitlendiğinde ütü, ocak ve açık kalan ışıkların elektriğini tek tuşla kesme.</li>
        <li><strong>Su ve Yangın Entegrasyonu:</strong> Su basma sensörü tetiklendiğinde selenoid vanayı ve prizleri kapatma.</li>
        <li><strong>Anlık Güç Tüketimi Takibi:</strong> Hangi cihazın saatte kaç kWh yaktığını grafiklerle izleme.</li>
      </ul>

      <div style="text-align: center; margin: 24px 0;">
        <a href="tel:05300695393" style="display: inline-block; background-color: #0b2e59; color: #ffb703; font-weight: 800; font-size: 1.05rem; padding: 14px 30px; border-radius: 10px; text-decoration: none; border: 2px solid #ffb703;">
          📞 Akıllı Pano Keşfi İçin Ara: 0530 069 53 93
        </a>
      </div>
    `
  },
  {
    id: "16",
    slug: "kurutma-makinesi-ve-camasir-makinesi-ayni-prize-takilir-mi",
    title: "Kurutma Makinesi ile Çamaşır Makinesi Aynı Prize Takılır mı? Yangın Riski ve Ayrı Linye Çekimi",
    excerpt: "İki büyük beyaz eşyayı aynı prizde çalıştırmanın tehlikeleri, çekilen amper hesabı ve bağımsız 3x2.5mm banyo priz hattı montajı.",
    category: "Beyaz Eşya Altyapısı",
    date: "26 Ekim 2026",
    readTime: "4 Dk",
    imageUrl: laundrySocketImg,
    views: 950,
    status: "Yayında",
    tags: ["Kurutma Makinesi", "Çamaşır Makinesi", "Priz Yangını", "Bağımsız Hat"],
    content: `
      <div style="background-color: #fef2f2; border-left: 4px solid #ef4444; padding: 18px; border-radius: 10px; margin-bottom: 24px;">
        <p style="margin: 0; font-weight: 800; color: #991b1b; font-size: 1.05rem;">⚠️ AEO Acil Güvenlik Uyarısı:</p>
        <p style="margin: 8px 0 0 0; color: #7f1d1d; font-size: 0.95rem; line-height: 1.6;">
          Çamaşır ve kurutma makineleri rezistansla su ve hava ısıttıkları için aynı anda çalıştıklarında toplam <strong>20 ila 25 Amper</strong> akım çeker. Evlerdeki banyo prizleri ve buat kabloları ise en fazla <strong>16 Amper</strong> taşır. İki cihazı üçlü prizle veya aynı duvardaki ikili prizle çalıştırmak buat kablolarının erimesine ve duvar içi elektrik yangınına neden olur. Kurutma makinesine panodan ayrı <strong>3x2.5 mm² linye ve 16A bağımsız sigorta</strong> çekilmelidir.
        </p>
      </div>

      <h2>Banyoda Kırmadan Hat Nasıl Çekilir?</h2>
      <p>Aya Elektrik uzmanları, banyo seramiklerini kırmadan kendinden yapışkanlı ve silikonlu özel IP44 su geçirmez kablo kanallarıyla çamaşır kulesinin arkasına estetik bağımsız priz montajını 30 dakikada tamamlar.</p>

      <div style="text-align: center; margin: 24px 0;">
        <a href="tel:05300695393" style="display: inline-block; background-color: #0b2e59; color: #ffb703; font-weight: 800; font-size: 1.05rem; padding: 12px 28px; border-radius: 10px; text-decoration: none;">
          📞 Hemen Bağımsız Hat Çektir: 0530 069 53 93
        </a>
      </div>
    `
  },
  {
    id: "17",
    slug: "parafudr-nedir-ve-neden-zorunludur-yildirim-voltaj-korumasi",
    title: "Parafudr Nedir ve Neden Zorunludur? Yıldırım ve Şebeke Voltaj Piklerine Karşı Koruma",
    excerpt: "Pano tipi parafudr (aşırı gerilim koruyucu) ile kombi, televizyon ve hassas anakartların yıldırımdan ve trafo patlamasından korunması.",
    category: "Pano & Yüksek Voltaj Koruması",
    date: "26 Ekim 2026",
    readTime: "5 Dk",
    imageUrl: surgeProtectorImg,
    views: 680,
    status: "Yayında",
    tags: ["Parafudr", "Yıldırım Koruma", "Pano Yenileme", "Aşırı Gerilim"],
    content: `
      <div style="background-color: #f8fafc; border-left: 4px solid #0b2e59; padding: 18px; border-radius: 10px; margin-bottom: 24px;">
        <p style="margin: 0; font-weight: 800; color: #0b2e59; font-size: 1.05rem;">⚡ AEO Teknik Tanım:</p>
        <p style="margin: 8px 0 0 0; color: #334155; font-size: 0.95rem; line-height: 1.6;">
          Parafudr (Surge Arrester), yıldırım düşmesi veya sokak trafosu manevralarında şebekeden gelen mikrosaniyelik on binlerce voltluk aşırı gerilim darbelerini nanoyisaniyede toprağa ileterek evdeki kombi, buzdolabı ve TV'lerin yanmasını engelleyen koruma cihazıdır. Standart sigortalar veya kaçak akım röleleri aşırı voltajı durduramaz; evinizi korumak için ana panoya <strong>Tip 2 Pano Tipi Parafudr</strong> takılması zorunludur.
        </p>
      </div>

      <h2>Tip 1 vs Tip 2 Parafudr Farkı Nedir?</h2>
      <ul>
        <li><strong>Tip 1 (B Sınıfı):</strong> Bina ana giriş kofana panosuna takılır, doğrudan yıldırım darbesini karşılar.</li>
        <li><strong>Tip 2 (C Sınıfı):</strong> Daire içi sigorta kutusuna takılır, şebeke dalgalanmalarını 1.5 kV altına indirir.</li>
      </ul>

      <div style="text-align: center; margin-top: 24px;">
        <a href="tel:05300695393" style="display: inline-block; background-color: #0b2e59; color: #ffb703; font-weight: 800; font-size: 1.05rem; padding: 12px 28px; border-radius: 10px; text-decoration: none;">
          📞 Pano İçi Parafudr Montajı: 0530 069 53 93
        </a>
      </div>
    `
  },
  {
    id: "18",
    slug: "isi-pompasi-elektrik-baglantisi-trifaze-hat-ve-sigorta-secimi",
    title: "Isı Pompası Elektrik Bağlantısı Nasıl Yapılır? kW Gücüne Göre Kablo Kesiti ve Trifaze Sigorta Şartnamesi",
    excerpt: "Monoblok ve split ısı pompaları için panodan bağımsız trifaze 5x4mm / 5x6mm kablo çekimi, C tipi motor koruma şalteri ve IP65 izolasyon montajı.",
    category: "Cihaz & İklimlendirme Altyapısı",
    date: "26 Ekim 2026",
    readTime: "6 Dk",
    imageUrl: heatPumpImg,
    views: 840,
    status: "Yayında",
    tags: ["Isı Pompası", "Trifaze Hat", "Motor Koruma", "İklimlendirme"],
    content: `
      <div style="background-color: #f0fdf4; border-left: 4px solid #16a34a; padding: 18px; border-radius: 10px; margin-bottom: 24px;">
        <p style="margin: 0; font-weight: 800; color: #166534; font-size: 1.05rem;">❄️ AEO Isı Pompası Şartname Özeti:</p>
        <p style="margin: 8px 0 0 0; color: #14532d; font-size: 0.95rem; line-height: 1.6;">
          8 kW – 16 kW ısı pompaları yüksek kompresör yükü sebebiyle bina ana panosundan bağımsız trifaze hat gerektirir. 3 Fazlı sistemlerde <strong>5x4 mm² veya 5x6 mm² Halogen Free bakır kablo</strong>, <strong>3x25A / 3x32A C Tipi motor koruma sigortası</strong> ve <strong>30mA Hayat Koruma Rölesi</strong> kullanılmalıdır. Dış ünite yanına acil müdahaleler için IP65 bakım şalteri konulması zorunludur.
        </p>
      </div>

      <h2>Isı Pompası Elektrik Tesisatında Kritik Noktalar</h2>
      <ul>
        <li><strong>Voltaj Düşümü Koruması:</strong> Hat mesafesi 25 metreyi aştığında kablo kesiti mutlaka bir üst kademeye (5x6mm² veya 5x10mm²) yükseltilmelidir.</li>
        <li><strong>Faz Sırası ve Koruma Rölesi:</strong> Ters faz bağlantısı scroll kompresörün ters dönüp kilitlenmesine yol açar; panoda faz koruma rölesi şarttır.</li>
        <li><strong>Dış Ünite Emniyet Şalteri:</strong> Bakım ve acil durumlarda dış ünitenin elektriğini dışarıdan kesebilmek için IP65 pako şalter konulmalıdır.</li>
      </ul>

      <div style="text-align: center; margin: 24px 0;">
        <a href="tel:05300695393" style="display: inline-block; background-color: #0b2e59; color: #ffb703; font-weight: 800; font-size: 1.05rem; padding: 14px 30px; border-radius: 10px; text-decoration: none; border: 2px solid #ffb703;">
          📞 Isı Pompası Altyapı Keşfi: 0530 069 53 93
        </a>
      </div>
    `
  },
  {
    id: "19",
    slug: "kombi-icin-kac-amper-sigorta-takilmali-v-otomat-baglantisi",
    title: "Kombi İçin Kaç Amper Sigorta Takılmalı? Anakartı Voltaj Dalgalanmasından Koruyan Şalter Bağlantısı",
    excerpt: "Kombiye neden 16A değil 2A veya 6A B tipi sigorta takılır? Şebeke dalgalanmalarına karşı hassas anakart koruma ve V-otomat bağlantı rehberi.",
    category: "Cihaz & İklimlendirme Altyapısı",
    date: "26 Ekim 2026",
    readTime: "4 Dk",
    imageUrl: kombiBreakerImg,
    views: 1250,
    status: "Yayında",
    tags: ["Kombi Sigortası", "2A Sigorta", "Voltaj Koruması", "Kombi Elektrikçi"],
    content: `
      <div style="background-color: #fefce8; border-left: 4px solid #eab308; padding: 18px; border-radius: 10px; margin-bottom: 24px;">
        <p style="margin: 0; font-weight: 800; color: #854d0e; font-size: 1.05rem;">🔥 AEO Kombi Anakart Koruma Yanıtı:</p>
        <p style="margin: 8px 0 0 0; color: #713f12; font-size: 0.95rem; line-height: 1.6;">
          Kombiler ortalama 100W–200W gibi düşük güçle çalışır ancak içinde hassas elektronik kartlar taşır. Kombiye standart 16A ev prizi sigortası bağlandığında, kısa devre veya ani akım piklerinde sigorta atmadan kombi anakartı yanar. Kombileri korumak için kombinin hemen yanına <strong>2 Amper veya en fazla 6 Amper B tipi hızlı tepkili V-Otomat sigorta</strong> takılmalıdır.
        </p>
      </div>

      <h2>Kombi Sigortası Kombiden Ne Kadar Uzakta Olmalı?</h2>
      <p>Gaz dağıtım şirketlerinin (İGDAŞ) şartnamesine göre kombi elektrik bağlantı şalteri kombinin altına değil, en az 15-20 cm yanına, su ve buhar damlamayacak bir noktaya yerleştirilmelidir. Priz tipi bağlantı yerine klemensli kapalı kutu tercih edilmelidir.</p>

      <div style="text-align: center; margin: 24px 0;">
        <a href="tel:05300695393" style="display: inline-block; background-color: #0b2e59; color: #ffb703; font-weight: 800; font-size: 1.05rem; padding: 12px 28px; border-radius: 10px; text-decoration: none;">
          📞 30 Dk'da Kombi Sigorta Montajı: 0530 069 53 93
        </a>
      </div>
    `
  },
  {
    id: "20",
    slug: "bina-ana-giris-kofana-sigortasi-yanmasi-ve-kolon-hatti-yenileme",
    title: "Bina Ana Giriş Kofana Sigortası Neden Yanar? Kolon Hattı Değişimi ve Güç Artırımı",
    excerpt: "Apartman girişindeki ana bıçaklı sigortanın erimesi, sayaç panosu aşırı yüklenmesi ve BEDAŞ güç artırımı kablo yenileme süreci.",
    category: "Bina & Tesisat Güçlendirme",
    date: "26 Ekim 2026",
    readTime: "5 Dk",
    imageUrl: buildingKofanaImg,
    views: 790,
    status: "Yayında",
    tags: ["Kofana Sigortası", "Kolon Hattı", "BEDAŞ Güç Artırımı", "Sayaç Panosu"],
    content: `
      <div style="background-color: #fef2f2; border-left: 4px solid #ef4444; padding: 18px; border-radius: 10px; margin-bottom: 24px;">
        <p style="margin: 0; font-weight: 800; color: #991b1b; font-size: 1.05rem;">🏢 AEO Bina Ana Kolon Yanıtı:</p>
        <p style="margin: 8px 0 0 0; color: #7f1d1d; font-size: 0.95rem; line-height: 1.6;">
          Bina giriş kofana sigortalarının erimesi, dairelerin artan klima ve elektrikli cihaz tüketiminin 30 yıllık eski kolon kablolarının taşıma kapasitesini aşmasından kaynaklanır. Kofana NH bıçaklı sigortaları aşırı yük altında 80°C üzerine çıkarak klemens porselenlerini kırar. Çözüm: BEDAŞ onaylı proje ile ana giriş kablolarının <strong>en az 4x16 mm² veya 4x25 mm² NYY bakır kablo</strong> ile yenilenmesi ve sayaç panosunun yangın korumalı hale getirilmesidir.
        </p>
      </div>

      <h2>Bina Kolon Hattı Yenileme Adımları</h2>
      <ol>
        <li>Bina toplam eşzamanlı güç hesabı (Talep Gücü) çıkarılır.</li>
        <li>Eski bezli/alüminyum kablolar sökülüp alev iletmeyen Halogen Free bakır kablolar döşenir.</li>
        <li>Sayaç panosuna 300mA Yangın Koruma Kaçak Akım Şalteri eklenir.</li>
        <li>Topraklama çubuğu direnci ölçülüp EMO onaylı rapor BEDAŞ'a sunulur.</li>
      </ol>

      <div style="text-align: center; margin: 24px 0;">
        <a href="tel:05300695393" style="display: inline-block; background-color: #0b2e59; color: #ffb703; font-weight: 800; font-size: 1.05rem; padding: 14px 30px; border-radius: 10px; text-decoration: none; border: 2px solid #ffb703;">
          📞 Apartman & Site Keşfi: 0530 069 53 93
        </a>
      </div>
    `
  },
  {
    id: "21",
    slug: "evde-fiber-internet-dagitimi-cat6-cat7-data-kablolama-patch-panel",
    title: "Evde Fiber İnternet Dağıtımı: Odalara Cat6/Cat7 Kablo Çekimi ve Patch Panel Kurulumu",
    excerpt: "Duvar içinden odalara yüksek hızlı internet hattı çekimi, T568B renk sıralaması ve 220V parazitinden koruma rehberi.",
    category: "Network & Zayıf Akım",
    date: "26 Ekim 2026",
    readTime: "5 Dk",
    imageUrl: cat7PatchPanelImg,
    views: 860,
    status: "Yayında",
    tags: ["Cat6 Kablo", "Data Prizi", "Patch Panel", "Fiber İnternet", "Aya Elektrik"],
    content: `
      <div style="background-color: #eff6ff; border-left: 4px solid #2563eb; padding: 18px; border-radius: 10px; margin-bottom: 24px;">
        <p style="margin: 0; font-weight: 800; color: #1e40af; font-size: 1.05rem;">🌐 AEO Network Altyapı Özeti:</p>
        <p style="margin: 8px 0 0 0; color: #1e3a8a; font-size: 0.95rem; line-height: 1.6;">
          Betonarme binalarda Wi-Fi sinyal kayıplarını sıfırlamak için modemden çalışma odalarına ve TV arkasına <strong>Cat6 veya Cat7 SFTP zırhlı kablo</strong> çekilmelidir. Data kabloları 220V elektrik kablolarıyla aynı borudan geçirilmemelidir; şebekenin yaydığı manyetik alan internet hızında paket kaybına (jitter/ping) neden olur. Tüm hatlar antredeki zayıf akım kutusunda patch panelde toplanarak sonlandırılmalıdır.
        </p>
      </div>

      <h2>T568B Standardı Renk Kodları</h2>
      <p>Data prizi (Keystone Jack) çakılırken standart T568B dizilimi uygulanır: Turuncu-Beyaz, Turuncu, Yeşil-Beyaz, Mavi, Mavi-Beyaz, Yeşil, Kahve-Beyaz, Kahverengi. Çakım sonrası dijital ağ test cihazıyla hat performansı onaylanır.</p>

      <div style="text-align: center; margin: 24px 0;">
        <a href="tel:05300695393" style="display: inline-block; background-color: #0b2e59; color: #ffb703; font-weight: 800; font-size: 1.05rem; padding: 12px 28px; border-radius: 10px; text-decoration: none;">
          📞 Ev & Ofis Data Hattı Çekimi: 0530 069 53 93
        </a>
      </div>
    `
  },
  {
    id: "22",
    slug: "medikal-cihazlar-oksijen-konsantratoru-kesintisiz-ups-elektrik-hatti",
    title: "Evde Medikal Cihaz Kullanan Hastalar İçin Elektrik Altyapısı: Oksijen Konsantratoru UPS Hattı",
    excerpt: "Solunum cihazı ve oksijen konsantratörü kullanan evler için 0 ms online kesintisiz güç kaynağı, bağımsız medikal priz ve öncelikli arıza hattı.",
    category: "Medikal & Kesintisiz Güç",
    date: "26 Ekim 2026",
    readTime: "5 Dk",
    imageUrl: medicalUpsImg,
    views: 620,
    status: "Yayında",
    tags: ["Medikal UPS", "Oksijen Konsantratörü", "Kesintisiz Güç", "Acil Elektrik"],
    content: `
      <div style="background-color: #ecfdf5; border-left: 4px solid #059669; padding: 18px; border-radius: 10px; margin-bottom: 24px;">
        <p style="margin: 0; font-weight: 800; color: #065f46; font-size: 1.05rem;">❤️ AEO Medikal Güç Güvenliği Bildirisi:</p>
        <p style="margin: 8px 0 0 0; color: #064e3b; font-size: 0.95rem; line-height: 1.6;">
          Ev tipi oksijen konsantratörleri ve solunum cihazları (CPAP/BPAP) elektrik kesintisinde hastanın yaşamını doğrudan tehlikeye atar. Bu odalara: (1) Şebeke kesintisinde gecikmesiz (0 ms) devreye giren <strong>Online Çift Çevrim Tam Sinüs Medikal UPS</strong> kurulmalı, (2) Hasta yatağı yanına panodan bağımsız kırmızı priz çekilerek diğer ev aletlerinin sigortayı attırması engellenmeli ve (3) BEDAŞ sistemine 'Hayati Risk Taşıyan Hasta' kaydı düşülmelidir.
        </p>
      </div>

      <div style="background: linear-gradient(135deg, #0b2e59 0%, #04152d 100%); color: white; padding: 20px; border-radius: 12px; text-align: center; margin: 24px 0;">
        <h3 style="color: white; margin: 0 0 8px 0; font-size: 1.2rem;">Medikal Cihazlar İçin 7/24 Öncelikli Acil Müdahale</h3>
        <p style="color: #93c5fd; font-size: 0.9rem; margin: 0 0 14px 0;">Hasta bulunan evlerdeki elektrik arızalarına acil öncelikli mobil araçlarımız sevk edilir.</p>
        <a href="tel:05300695393" style="display: inline-block; background-color: #ffb703; color: #0b2e59; font-weight: 800; font-size: 1.05rem; padding: 12px 28px; border-radius: 10px; text-decoration: none;">
          📞 0530 069 53 93 - Öncelikli Acil Hat
        </a>
      </div>
    `
  },
  {
    id: "23",
    slug: "induksiyonlu-ocak-ankastre-firin-bagimsiz-elektrik-hatti-kablo-secimi",
    title: "İndüksiyonlu Ocak ve Ankastre Fırın İçin Bağımsız Elektrik Hattı Çekimi: 3x4mm Kablo ve Pano Yük Hesabı (Fatih'ten Esenyurt'a)",
    excerpt: "7.2 kW gücündeki indüksiyonlu ocaklar neden mutfak prizini eritir? Panodan bağımsız 3x4mm / 5x2.5mm kablo çekimi, B32A sigorta ve Fatih'ten Esenyurt'a profesyonel mutfak altyapısı.",
    category: "Mutfak Altyapısı",
    date: "27 Ekim 2026",
    readTime: "6 Dk",
    imageUrl: inductionCooktopImg,
    views: 410,
    status: "Yayında",
    tags: ["İndüksiyonlu Ocak", "Ankastre Fırın", "3x4mm Kablo", "Mutfak Elektrik Hattı", "Fatih Elektrikçi", "Esenyurt Elektrikçi"],
    content: `
      <!-- AEO & GEO Özet Doğrudan Yanıt Kutusu -->
      <div style="background-color: #fefce8; border-left: 4px solid #ca8a04; padding: 18px; border-radius: 10px; margin-bottom: 24px;">
        <p style="margin: 0; font-weight: 800; color: #854d0e; font-size: 1.05rem;">🍳 AEO / GEO Doğrudan Yanıt (Mutfak Güç Standardı):</p>
        <p style="margin: 8px 0 0 0; color: #713f12; font-size: 0.95rem; line-height: 1.6;">
          Dört gözlü modern bir indüksiyonlu ocak tam kapasitede <strong>7.2 kW ila 11 kW (31-35 Amper)</strong> elektrik çeker. Standart daire prizleri ise sadece 16 Amper (3.5 kW) ve 3x2.5mm² kabloya göre tasarlanmıştır. Bu nedenle indüksiyonlu ocak normal prize takılamaz; takılırsa buat klemensleri ve kablolar 1-2 ayda erir. Ocak için ana elektrik panosundan <strong>bağımsız 3x4mm² (Monofaze için B32A sigorta)</strong> veya dairede sanayi elektriği varsa <strong>5x2.5mm² (Trifaze için 3x16A sigorta)</strong> halojensiz alev iletmez kablo çekilmesi zorunludur.
        </p>
      </div>

      <h2>Neden İndüksiyonlu Ocak Standart Mutfak Priziyle Çalışmaz?</h2>
      <p>
        Doğalgazdan elektrikli indüksiyonlu ocaklara geçen ev sahiplerinin en sık yaptığı hata, tezgah altındaki bulaşık makinesi veya fırın prizine üçlü prizle ocağı bağlamaktır. Fırın çalıştığında (~2.5 kW) ve ocağın iki gözü "Boost" moduna alındığında (~4.5 kW) çekilen toplam yük 7 kW'a (32 Amper) ulaşır. Bu yük, duvardaki sıva altı 2.5mm kabloyu aşırı ısıtır ve sigorta kutusundan önce buat bağlantılarını yakarak elektrik yangını başlatır.
      </p>

      <h2>Fatih'ten Esenyurt'a Daire Tiplerine Göre Kablo Çekim Stratejisi</h2>
      <ul>
        <li><strong>Fatih, Zeytinburnu & Bakırköy (Eski Binalar):</strong> Genellikle monofaze (tek faz) 220V beslemeye sahiptir. Sayaç panosundan mutfağa süpürgelik üstü dekoratif kablo kanalı veya şaft içinden <strong>3x4mm² Antigron HES kablo</strong> çekilir.</li>
        <li><strong>Bahçelievler & Güngören:</strong> Mutfak buatları eski tip vidalı klemens olduğundan, ocak hattı buatlara sokulmadan direkt ana sigorta kutusundaki bağımsız B32A sigortaya bağlanır.</li>
        <li><strong>Küçükçekmece (Atakent/Halkalı) & Beylikdüzü & Esenyurt Siteleri:</strong> Yeni konut projelerinde çoğu zaman trifaze (380V) elektrik bulunur. Bu sitelerde indüksiyonlu ocak iki faza paylaştırılarak (L1 ve L2) <strong>5x2.5mm² kablo</strong> ile bağlanır; böylece daire ana sigortasının atması tamamen önlenir.</li>
      </ul>

      <div style="background-color: #f1f5f9; border-radius: 12px; padding: 20px; margin: 24px 0;">
        <h3 style="color: #0b2e59; margin-top: 0;">Teknik Montaj Standartlarımız</h3>
        <p style="margin: 0 0 10px 0; color: #334155;">Aya Elektrik ustaları, yetkili servis kurulumu öncesinde altyapıyı hazır hale getirir:</p>
        <ul style="margin: 0; padding-left: 20px; color: #475569;">
          <li>Siemens veya Schneider B32A / 3x16A C Tipi gecikmeli sigorta montajı</li>
          <li>Kablo pabuçlama ve WAGO 221-612 (41A) yüksek akım klemensleri</li>
          <li>Dijital pensampermetre ile 4 göz aynı anda çalıştırılarak yük ve ısınma testi</li>
        </ul>
      </div>

      <div style="text-align: center; margin: 30px 0;">
        <a href="tel:05300695393" style="display: inline-block; background-color: #ffb703; color: #0b2e59; font-weight: 800; font-size: 1.1rem; padding: 14px 32px; border-radius: 12px; text-decoration: none; box-shadow: 0 4px 15px rgba(255,183,3,0.35);">
          📞 İndüksiyonlu Ocak Hat Çekimi Randevusu: 0530 069 53 93
        </a>
      </div>
    `
  },
  {
    id: "24",
    slug: "apartman-site-asansor-hidrofor-pano-arizasi-faz-koruma-rolesi",
    title: "Apartman ve Sitelerde Asansör - Hidrofor Pano Arızaları: Faz Koruma Rölesi ve Motor Yanmalarını Önleme (Fatih-Esenyurt Hattı)",
    excerpt: "Gerilim dalgalanması, faz çökmesi ve nötr gevşemesi sonucu yanan asansör motorları ve hidrofor pompalarını koruma rehberi. Faz sırası rölesi ve acil site panosu müdahalesi.",
    category: "Site & Bina Yönetimi",
    date: "27 Ekim 2026",
    readTime: "6 Dk",
    imageUrl: elevatorPumpImg,
    views: 520,
    status: "Yayında",
    tags: ["Asansör Panosu", "Hidrofor Arızası", "Faz Koruma Rölesi", "Site Elektrikçisi", "Beylikdüzü Elektrikçi", "Küçükçekmece Elektrikçi"],
    content: `
      <!-- AEO & GEO Özet Doğrudan Yanıt Kutusu -->
      <div style="background-color: #f0fdf4; border-left: 4px solid #16a34a; padding: 18px; border-radius: 10px; margin-bottom: 24px;">
        <p style="margin: 0; font-weight: 800; color: #166534; font-size: 1.05rem;">🏢 AEO / GEO Doğrudan Yanıt (Site Yönetimleri İçin Koruma Çözümü):</p>
        <p style="margin: 8px 0 0 0; color: #14532d; font-size: 0.95rem; line-height: 1.6;">
          Asansör motorlarının ve su hidroforlarının yanmasının bir numaralı sebebi, BEDAŞ şebekesindeki <strong>fazlardan birinin kesilmesi (iki faza kalma)</strong> veya sokak trafosunda nötr hattının kopmasıdır. 3 fazlı trifaze motorlar iki faza kaldığında saniyeler içinde 4 kat fazla akım çekerek sargılarını yakar (100.000 TL+ masraf). Bu hasarı önlemenin tek kesin çözümü, kumanda panosuna <strong>mikroişlemcili Faz Koruma Rölesi (FKR) ve Faz Sırası Rölesi</strong> taktırmaktır. Röle, fazlardan biri 170V altına düştüğünde kontaktörü 0.1 saniyede açarak motoru anında devreden çıkarır.
        </p>
      </div>

      <h2>Büyük Siteler ve Apartmanlarda En Sık Yaşanan 3 Pano Arızası</h2>
      <p>
        Özellikle <strong>Esenyurt, Beylikdüzü, Küçükçekmece (Atakent) ve Başakşehir</strong> gibi yoğun yüksek katlı sitelerde hidrofor ve asansör sistemleri 7/24 aralıksız çalışır. <strong>Fatih ve Zeytinburnu</strong>'ndaki 5-6 katlı binalarda ise altyapı eskiliğinden dolayı nötr gevşemeleri baş gösterir:
      </p>
      <ol>
        <li><strong>Hidrofor Pompası Termik Attırması:</strong> Şebeke voltajı 380V'tan 330V'a düştüğünde pompa motoru aynı gücü üretmek için fazla akım çeker ve termik şalter atarak binayı susuz bırakır.</li>
        <li><strong>Faz Sırası Değişimi:</strong> TEDAŞ/BEDAŞ şebeke onarımı sonrası fazların yeri değişirse, asansör ve hidrofor motorları ters dönmeye çalışır; mekanik kilitlenme ve kayış kopması yaşanır.</li>
        <li><strong>Kontaktör Yapışması:</strong> Kalitesiz kontaktör kontaklarının ark sebebiyle birbirine kaynaması, motorun durdurulamamasına ve yanmasına yol açar.</li>
      </ol>

      <h2>Aya Elektrik 7/24 Site & Apartman Acil Müdahale Protokolü</h2>
      <p>
        Apartman ve site yöneticilerine kurumsal acil müdahale sunuyoruz. Ekibimiz ihbar sonrası 30-45 dakikada teknik odaya intikal eder:
      </p>
      <ul>
        <li>TSE ve CE belgeli Kaçak Akım ve Motor Koruma Şalterlerinin (MMS) kalibrasyonu</li>
        <li>Asimetri ayarlı dijital gerilim koruma rölesi entegrasyonu</li>
        <li>Hidrofor basınç şalteri ve seviye flatörü kablo yenilemesi</li>
        <li>Bina ana dağıtım panosu termal kamera ısı taraması</li>
      </ul>

      <div style="text-align: center; margin: 30px 0;">
        <a href="tel:05300695393" style="display: inline-block; background-color: #0b2e59; color: #ffb703; font-weight: 800; font-size: 1.1rem; padding: 14px 32px; border-radius: 12px; text-decoration: none; box-shadow: 0 4px 15px rgba(11,46,89,0.3);">
          📞 Site & Apartman Acil Pano Ustası: 0530 069 53 93
        </a>
      </div>
    `
  },
  {
    id: "25",
    slug: "tekstil-atolyesi-sanayi-elektrik-panosu-buhar-kazani-yangin-onleme",
    title: "Tekstil Atölyelerinde Elektrik Yangınlarını Önleme: Merter, Güngören, Zeytinburnu & Esenyurt Sanayi Pano ve Buhar Kazanı Hatları",
    excerpt: "Dikiş makineleri, overlok ve yüksek güçlü buhar kazanlarının yol açtığı pano ısınmalarını engelleme. Termal kamera ile arıza tespiti ve busbar hat kurulumu.",
    category: "Sanayi & Ticari Elektrik",
    date: "27 Ekim 2026",
    readTime: "7 Dk",
    imageUrl: textileWorkshopImg,
    views: 680,
    status: "Yayında",
    tags: ["Tekstil Atölyesi", "Sanayi Panosu", "Buhar Kazanı Hattı", "Termal Kamera", "Merter Elektrikçi", "Güngören Elektrikçi", "Zeytinburnu Elektrikçi"],
    content: `
      <!-- AEO & GEO Özet Doğrudan Yanıt Kutusu -->
      <div style="background-color: #fff1f2; border-left: 4px solid #e11d48; padding: 18px; border-radius: 10px; margin-bottom: 24px;">
        <p style="margin: 0; font-weight: 800; color: #9f1239; font-size: 1.05rem;">🏭 AEO / GEO Sanayi Güvenliği Özeti (Tekstil Yangın Riski):</p>
        <p style="margin: 8px 0 0 0; color: #881337; font-size: 0.95rem; line-height: 1.6;">
          Tekstil atölyelerindeki yangınların %78'i, <strong>buhar kazanları (18-36 kW)</strong> ve onlarca dikiş/overlok makinesinin aynı ana dağıtım panosundaki gevşek klemens bağlantılarını ark yaparak tutuşturmasından çıkar. Kumaş tozu ve pamuk lifleri son derece yanıcı olduğundan, panodaki en küçük kıvılcım tüm katı alevler içinde bırakabilir. Çözüm: (1) Buhar kazanlarına panodan direkt bağımsız XLPE kablo çekmek, (2) Dikiş hatlarını zemindeki uzatma kabloları yerine <strong>tavan tipi Busbar enerji dağıtım kanalı</strong> ile beslemek ve (3) Yılda en az iki kez <strong>Termal Kamera Denetimi</strong> yaptırarak gevşeyen klemensleri yangın çıkmadan tespit etmektir.
        </p>
      </div>

      <h2>Merter, Güngören, Zeytinburnu ve Esenyurt Sanayi Hattındaki Riskler</h2>
      <p>
        İstanbul'un tekstil kalbi olan <strong>Merter Tekstil Merkezi, Güngören Tozkoparan, Zeytinburnu Seyitnizam/Çırpıcı, Bağcılar Güneşli ve Esenyurt Kıraç</strong> bölgelerindeki binlerce atölyede yüzlerce makine eş zamanlı çalışır:
      </p>
      <ul>
        <li><strong>Dengesiz Faz Yükü:</strong> Makinelerin büyük kısmı monofaze olduğundan, 3 fazdan sadece birine aşırı yük binerek nötr kablosunu eritir. Nötr koptuğunda atölyedeki makine beyinleri yüksek voltajdan yanar.</li>
        <li><strong>Buhar Kazanı Aşırı Akımı:</strong> 24 kW buhar kazanı saatte ~36 Amper çeker. Standart kablo pabuçsuz bağlantılar 80°C üzerine çıkarak klemens plastiğini kömürleştirir.</li>
        <li><strong>Reaktif Ceza Faturası:</strong> Çok sayıda küçük motor çalıştıran atölyelerde kompanzasyon panosu kondansatörleri kuruduğunda işletme her ay on binlerce lira reaktif enerji cezası öder.</li>
      </ul>

      <h2>Aya Elektrik Atölye Güvenlik Hizmetleri</h2>
      <p>
        Aya Elektrik endüstriyel ekipleri, üretiminizin aksamaması için mesai bitimi veya hafta sonu atölyenizde kapsamlı çalışma yürütür:
      </p>
      <ol>
        <li><strong>Termal Kamera Raporlaması:</strong> Tüm şalter, sigorta ve bara bağlantıları kızılötesi kamera ile incelenir, aşırı ısınan noktalar sıkılır ve yenilenir.</li>
        <li><strong>Busbar ve Aydınlatma Revizyonu:</strong> Kumaş kesim masaları üzerine homojen yüksek lümenli anti-glare LED armatürler kurulur.</li>
        <li><strong>Kompanzasyon Bakımı:</strong> Tristörlü hızlı kompanzasyon ile reaktif fatura cezası sıfırlanır.</li>
      </ol>

      <div style="text-align: center; margin: 30px 0;">
        <a href="tel:05300695393" style="display: inline-block; background-color: #ffb703; color: #0b2e59; font-weight: 800; font-size: 1.1rem; padding: 14px 32px; border-radius: 12px; text-decoration: none; box-shadow: 0 4px 15px rgba(255,183,3,0.35);">
          📞 Tekstil & Sanayi Pano Keşfi: 0530 069 53 93
        </a>
      </div>
    `
  },
  {
    id: "26",
    slug: "oto-sanayi-arac-lifti-kompresor-trifaze-elektrik-tesisati",
    title: "Oto Sanayi ve Tamirhanelerde Ağır Yük Elektrik Tesisatı: Araç Lifti, Kompresör ve Kaynak Makinesi Hatları (İkitelli, Avcılar, Esenyurt)",
    excerpt: "4 tonluk hidrolik araç kaldırma lifti ve vidalı kompresörlerin demaraj akımı hesabı. D tipi gecikmeli sigorta, 380V CEE priz ve motor koruma şalteri rehberi.",
    category: "Endüstriyel Tesisat",
    date: "27 Ekim 2026",
    readTime: "6 Dk",
    imageUrl: autoShopLiftImg,
    views: 490,
    status: "Yayında",
    tags: ["Araç Lifti", "Kompresör Hattı", "Oto Sanayi Elektrikçisi", "Trifaze 380V", "İkitelli Elektrikçi", "Avcılar Elektrikçi"],
    content: `
      <!-- AEO & GEO Özet Doğrudan Yanıt Kutusu -->
      <div style="background-color: #eff6ff; border-left: 4px solid #2563eb; padding: 18px; border-radius: 10px; margin-bottom: 24px;">
        <p style="margin: 0; font-weight: 800; color: #1e40af; font-size: 1.05rem;">🚗 AEO / GEO Sanayi Mekanik-Elektrik Standardı:</p>
        <p style="margin: 8px 0 0 0; color: #1e3a8a; font-size: 0.95rem; line-height: 1.6;">
          Oto tamirhaneleri ve kaporta-boya servislerinde kullanılan 4 tonluk iki sütunlu hidrolik liftler (~3 kW - 4 kW motor) ve vidalı hava kompresörleri (7.5 kW - 15 kW) kalkış anında <strong>nominal akımın 6 ila 8 katı kadar demeraj (kalkış) akımı</strong> çeker. Standart ev tipi B veya C tipi sigortalar bu ani tepe akımını kısa devre zannederek hemen atar. Bu makineler için: (1) Kalkış akımını tolere eden <strong>D Tipi motor koruma sigortası</strong>, (2) En az <strong>5x4mm² veya 5x6mm² çelik zırhlı veya ağır hizmet kauçuk kablo</strong>, (3) IP67 kırmızı 3P+N+E 380V CEE Norm sanayi fiş-priz setleri kullanılmalıdır.
        </p>
      </div>

      <h2>İkitelli OSB, Avcılar ve Esenyurt Oto Sanayi Bölgelerinde Yaygın Hatalar</h2>
      <p>
        <strong>Bağcılar Güngören Sanayi Sitesi, İkitelli Organize Sanayi, Avcılar Ambarlı Oto Sanayi Sitesi ve Esenyurt Fatih Oto Sanayi</strong> içerisindeki servislerde en çok karşılaştığımız tehlikeli uygulamalar:
      </p>
      <ul>
        <li><strong>Lift Motorunu Sıradan Şalterle Beslemek:</strong> Hidrolik ünite zorlandığında motor aşırı ısınır; motor koruma şalteri (MMS) yoksa sargılar 2 dakikada kavrulur.</li>
        <li><strong>Gazaltı (MIG/MAG) ve Argon Kaynaklarında Voltaj Düşüşü:</strong> İnce kesitli kablo kullanıldığında kaynak yapıldığı anda komşu liftler durur veya elektronik arıza tespit (OBD) cihazları yanar.</li>
        <li><strong>Topraklama Eksikliği ve Gövdeye Kaçak:</strong> Metal lift sütunlarında topraklama yapılmadığında, usta arabaya dokunduğu anda 220V elektrik çarpması yaşanabilir.</li>
      </ul>

      <h2>Aya Elektrik Oto Servis Elektrik Kurulum Paketi</h2>
      <p>
        Servis dükkanınızın ruhsat ve iş güvenliği (İSG) şartlarına uygun olması için sunduğumuz profesyonel hizmetler:
      </p>
      <ol>
        <li>Sütun liftler için zeminden çelik boru içi hat çekimi ve acil stop (Mantar Buton) montajı</li>
        <li>Boya fırını ve havalandırma fanları için Ex-Proof (patlama korumalı) aydınlatma ve anahtarlar</li>
        <li>Kompresör için yumuşak yol verici (Soft Starter) veya yıldız-üçgen pano revizyonu</li>
        <li>Topraklama meger ölçümü ve BEDAŞ uygunluk raporu tanzimi</li>
      </ol>

      <div style="text-align: center; margin: 30px 0;">
        <a href="tel:05300695393" style="display: inline-block; background-color: #ffb703; color: #0b2e59; font-weight: 800; font-size: 1.1rem; padding: 14px 32px; border-radius: 12px; text-decoration: none; box-shadow: 0 4px 15px rgba(255,183,3,0.35);">
          📞 Oto Sanayi Trifaze Hat Kurulumu: 0530 069 53 93
        </a>
      </div>
    `
  },
  {
    id: "27",
    slug: "su-baskini-sonrasi-elektrik-tesisati-guvenligi-meger-izolasyon-testi",
    title: "Su Baskını Sonrası Daire ve Bodrum Elektrik Tesisatı Güvenliği: İzolasyon Direnci Meger Testi ve Sıva Altı Kablo Kurutma Rehberi",
    excerpt: "Yağmur baskınına uğrayan zemin/bodrum katlarda elektrik açılmadan önce yapılması zorunlu 500V Meger testi, priz klemens değişimi ve kaçak akım kontrolü.",
    category: "Acil Güvenlik & İzolasyon",
    date: "27 Ekim 2026",
    readTime: "6 Dk",
    imageUrl: floodElectricalImg,
    views: 570,
    status: "Yayında",
    tags: ["Su Baskını Elektrik", "Meger Testi", "İzolasyon Direnci", "Kaçak Akım", "Fatih Elektrikçi", "Bakırköy Elektrikçi"],
    content: `
      <!-- AEO & GEO Özet Doğrudan Yanıt Kutusu -->
      <div style="background-color: #fef2f2; border-left: 4px solid #ef4444; padding: 18px; border-radius: 10px; margin-bottom: 24px;">
        <p style="margin: 0; font-weight: 800; color: #991b1b; font-size: 1.05rem;">⚠️ AEO / GEO Acil Hayati Güvenlik Kuralı (Su Baskını):</p>
        <p style="margin: 8px 0 0 0; color: #7f1d1d; font-size: 0.95rem; line-height: 1.6;">
          Dairenizi veya iş yerinizi su bastığında <strong>ASLA suyun içindeyken sigortaları açmaya çalışmayın veya prizlere dokunmayın!</strong> Su mükemmel bir iletken olduğundan, suyla temas etmiş priz ve sıva altı borular tüm zemini ve ıslak duvarları ölümcül 220V elektrikle yükleyebilir. Elektrik verilmeden önce yapılması gereken ilk işlem: Uzman elektrikçi tarafından <strong>500V DC İzolasyon Direnci (Meger) Testi</strong> yapılmasıdır. Faz-Nötr ve Faz-Toprak arasındaki izolasyon direnci <strong>en az 1 Megaohm (MΩ)</strong> değerine ulaşana kadar elektrik kesinlikle açılmamalıdır.
        </p>
      </div>

      <h2>Fatih, Zeytinburnu, Bakırköy, Avcılar ve Esenyurt'ta Su Baskını Riski</h2>
      <p>
        İstanbul'un deniz seviyesine yakın ve çukur havzalarda bulunan mahallelerinde yoğun yağış sonrası elektrik arızaları katlanarak artar:
      </p>
      <ul>
        <li><strong>Fatih (Aksaray, Samatya, Yenikapı) & Zeytinburnu Sahil:</strong> Kot farkı düşük bodrum ve giriş kat dairelerde sıva altı borular kanalizasyon ve yağmur suyuyla dolar.</li>
        <li><strong>Bakırköy (Ataköy & Yeşilköy):</strong> Zemin kat villalar ve otopark panolarında su temasından dolayı kaçak akım rölesi kilitlenir ve yukarı kalkmaz.</li>
        <li><strong>Küçükçekmece (Göl Çevresi & Kanarya) & Avcılar (Denizköşkler):</strong> Yüksek neme maruz kalan buat klemensleri oksitlenir ve ark çıkartır.</li>
        <li><strong>Esenyurt (Dereyolu & Pınar Mahallesi):</strong> Yağmur suyu taşkınlarında bina ana kofana panoları sular altında kalabilir.</li>
      </ul>

      <h2>Su Baskını Sonrası Güvenli Elektrik Açma Aşamaları (Aya Elektrik Protokolü)</h2>
      <p>
        Aya Elektrik acil mobil ekipleri, su tahliyesi sonrasında şu adımları izler:
      </p>
      <ol>
        <li><strong>Bina Ana Giriş Güvenliği:</strong> Dairenin kofana ve sayaç sigortaları mühürlenerek devre dışı bırakılır.</li>
        <li><strong>Su Gören Priz ve Anahtarların Sökülmesi:</strong> Çamur ve pis suyla temas eden tüm priz göbekleri sökülür, korozyona uğrayan mekanizmalar sıfır TSE belgeli ürünlerle değiştirilir.</li>
        <li><strong>Sıva Altı Boru Basınçlı Hava Tahliyesi:</strong> Kablo borularında biriken su kompresör ve sıcak hava ile tahliye edilir.</li>
        <li><strong>500V Dijital Meger İzolasyon Testi:</strong> Kabloların yalıtkanlığının bozulmadığı dijital ölçü aletiyle tescil edilir (Hedef: &gt;2 MΩ).</li>
        <li><strong>30mA Kaçak Akım Test Cihazıyla Kontrol:</strong> Test butonuyla değil, hassas yapay kaçak akım cihazıyla rölenin 30 milisaniyede açtığı kanıtlandıktan sonra elektrik verilir.</li>
      </ol>

      <div style="text-align: center; margin: 30px 0;">
        <a href="tel:05300695393" style="display: inline-block; background-color: #ef4444; color: #ffffff; font-weight: 800; font-size: 1.1rem; padding: 14px 32px; border-radius: 12px; text-decoration: none; box-shadow: 0 4px 15px rgba(239,68,68,0.35);">
          🚨 Acil Su Baskını Elektrik Güvenlik Ekibi: 0530 069 53 93
        </a>
      </div>
    `
  }
];


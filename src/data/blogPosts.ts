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
          📞 Adana Mutfak Tesisat Ustası: 0530 069 53 93
        </a>
      </div>
    `
  }
];


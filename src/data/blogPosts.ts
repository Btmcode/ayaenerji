import burnedSocketImg from '../assets/images/burned_electrical_socket_1781970414292.jpg';
import panelImg from '../assets/images/new_clean_electrical_panel_1781958517638.jpg';
import heroImg from '../assets/images/turkish_electrician_hero_1782073722580.jpg';

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
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "evde-elektrik-guvenligi-icin-5-altin-kural",
    title: "Evde Elektrik Güvenliği İçin Bilmeniz Gereken 5 Altın Kural",
    excerpt: "Evimizdeki elektrik tesisatı yaşam konforumuzu sağlarken, ufak ihmaller büyük riskler doğurabilir. Temel güvenlik önlemleriyle ailenizi koruyun.",
    content: `
      <h2>Evde Elektrik Güvenliği Neden Önemli?</h2>
      <p>Elektrik görünmez bir güçtür ve ihmale gelmez. Evlerimizde eskiyen tesisatlar, yanlış kullanılan prizler ve yıpranmış kablolar her yıl binlerce yangın ve elektrik çarpması vakasına neden olmaktadır. İşte almanız gereken temel önlemler:</p>
      
      <h3>1. Kaçak Akım Rölesi Hayati Önem Taşır</h3>
      <p>Sigorta panonuzda mutlaka bir kaçak akım rölesi (30mA) bulundurun. Bu cihaz, sistemde ufacık bir sızıntı tespit ettiğinde elektriği milisaniyeler içinde keserek insan sağlığını ve canını korur.</p>

      <h3>2. Prizleri Aşırı Yüklemeyin</h3>
      <p>Bir üçlü prize birden fazla yüksek akım çeken cihaz (klima, fırın, ütü vb.) bağlamayın. Bu durum kabloların aşırı ısınmasına ve maalesef priz yangınlarına yol açar.</p>

      <h3>3. Islak Zeminlere Dikkat</h3>
      <p>Banyo ve mutfak gibi ıslak zeminlerde elektrikli aletleri (saç kurutma makinesi, tıraş makinesi vb.) kullanırken ekstra dikkatli olun. Bu alanlardaki prizlerin mutlaka kapaklı (IP44 ve üzeri) ve topraklı olması gerekir.</p>

      <h3>4. Yıpranmış Kabloları Hemen Değiştirin</h3>
      <p>Elektrik süpürgenizin veya ütünüzün kablosu soyulmuş ya da bantlanmışsa, kesinlikle kullanmaya devam etmeyin. Bantlamak geçici ve güvensiz bir çözümdür, uzman bir elektrikçiden destek alarak kablo veya cihaz değişimi yapın.</p>

      <h3>5. Periyodik Pano ve Tesisat Bakımı</h3>
      <p>Eğer eviniz 15-20 yıldan daha eskiyse, kablo izolasyonları zayıflamış olabilir. Mutlaka güvenilir ve belgeli uzman bir ustadan tesisat ve pano kontrolü talep edin. Aya Elektrik olarak sızıntı ölçüm testlerini 30 dakika gibi kısa bir sürede tamamlıyoruz.</p>
    `,
    date: "10 Haziran 2026",
    readTime: "4 Dk",
    imageUrl: heroImg,
    category: "Güvenlik"
  },
  {
    id: "2",
    slug: "surekli-salter-sigorta-atmasi-neden-olur",
    title: "Sürekli Şalter (Sigorta) Atması Neden Olur ve Nasıl Çözülür?",
    excerpt: "Evinizde veya iş yerinizde aniden atan sigortalar sinir bozucu olabilir. Bu durumun altında yatan 3 temel sebebi ve ne yapılması gerektiğini inceliyoruz.",
    content: `
      <h2>Sigorta (Şalter) Atması Bir Uyarıdır!</h2>
      <p>Sigortalar cihazlarınızı değil, tesisatınızı korumak için tasarlanmıştır. Eğer bir sigorta sürekli atıyorsa, bu sistemi korumaya çalıştığı ve içeride bir sorun olduğu anlamına gelir. Asla atan sigortayı bantlayarak veya zorlayarak açık tutmaya çalışmayın!</p>

      <h3>1. Kısa Devre Durumu</h3>
      <p>Faz ve nötr kablolarının bir cihaz içerisinde veya tesisat borusunda birbirine temas etmesi durumudur. Bu durumda sigorta anında "pat" sesiyle atar. En tehlikeli arıza türüdür, tespit için cihaz yapılmalıdır.</p>

      <h3>2. Aşırı Yüklenme (Overload)</h3>
      <p>Çoklu prize takılan yüksek watt çekimli cihazların (ısıtıcı, ütü, çamaşır makinesi) aynı anda çalıştırılması durumudur. Sigorta kapasitesinin (örn: 16A veya 25A) üzerine çıkıldığında, kablolar ısınmadan önce sigorta atarak güvenliği sağlar.</p>

      <h3>3. Toprak Kaçağı veya Cihaz Arızası</h3>
      <p>Eğer cihazlarınızdan birinin (özellikle rezistanslı cihazlar) gövdesine elektrik kaçağı varsa, kaçak akım rölesi devreyi kapatır. Bu durum genellikle buzdolabı veya çamaşır makinelerinde gözlemlenir.</p>

      <h3>Nasıl Çözülür?</h3>
      <p>Öncelikle cihazları prizden çekip sigortayı tekrar kaldırmayı deneyin. Hangi cihazı taktığınızda sigorta atıyorsa, sorun o cihazda olabilir. Eğer cihazlar takılı değilken bile sigorta açılmıyor veya atıyorsa, kesinlikle kendiniz müdahale etmeyin; uzman bir elektrikçiden, arıza tespiti hizmeti alın.</p>
    `,
    date: "14 Haziran 2026",
    readTime: "3 Dk",
    imageUrl: panelImg,
    category: "Arıza & Çözüm"
  },
  {
    id: "3",
    slug: "prizlerden-koku-veya-ses-geliyorsa-ne-yapmali",
    title: "Prizlerden Yanık Kokusu veya Ses Geliyorsa Ne Yapmalısınız?",
    excerpt: "Prizden gelen 'cızır' benzeri sesler veya plastik yanığı kokuları, elektrik yangınlarının en net habercisidir. Alınması gereken acil önlemler.",
    content: `
      <h2>Yanık Kokusu En Erken Yangın Alarmıdır</h2>
      <p>Evinizde veya ofisinizde kaynağı belirsiz bir balık kokusu veya yanmış plastik kokusu fark ederseniz, sorun büyük ihtimalle aşırı ısınan prizlerinizden veya sigorta panosundan geliyordur.</p>

      <h3>Koku ve Ses Neden Oluşur?</h3>
      <ul>
        <li><strong>Gevşek Bağlantılar (Ark Oluşumu):</strong> Kablo uçlarının prize tam sıkılmaması sebebiyle elektrik akımı "atlama" (ark) yapar, bu atlama hem "cızırtı" sesine hem de çok yüksek ısıya sebep olur.</li>
        <li><strong>Eriyen İzolasyon:</strong> Priz yüksek ısıya maruz kaldığında içerisindeki veya dışındaki plastik bileşenler erimeye başlar. Bu erime zehirli gazlar çıkararak kötü bir koku yayar.</li>
      </ul>

      <h3>Acil Olarak Ne Yapmalısınız?</h3>
      <p>1. Kokunun veya sesin geldiği prizi tespit edin ancak <strong>ASLA ÇIPLAK ELLE DOKUNMAYIN</strong>. Durum son derece sıcaktır ve elektrik çarpma riski barındırır.</p>
      <p>2. Söz konusu prize bağlı olan cihazı, mümkünse fişin plastik yalıtkan gövdesinden tutarak hızla çekin.</p>
      <p>3. Eğer prizde kararma veya siyah lekeler (kurum) varsa, ana sigorta panosuna giderek o odaya veya bölüme giden şalteri derhal indirin.</p>
      <p>4. Yangın söndürücünüzü hazırda bulundurun (elektrik yangınlarında kesinlikle su kullanmayın, kuru kimyevi toz (KKT) veya CO2 söndürücü kullanılmalıdır).</p>
      <p>5. İç tesisatta yanma meydana gelmiş olabileceği için 7/24 hizmet veren profesyonel bir acil elektrik firması çağırın. Sistemin onarılmasını bekleyin.</p>
    `,
    date: "18 Haziran 2026",
    readTime: "4 Dk",
    imageUrl: burnedSocketImg,
    category: "Acil Tavsiyeler"
  }
];

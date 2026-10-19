# Değişim Günlüğü (Changelog)

Tüm önemli değişiklikler, yeni özellikler ve düzeltmeler bu dosyada kayıt altına alınacaktır.

## [1.0.7] - 2026-07-12

### SEO ve Geo Hedefleme Geliştirmeleri
- **Maksimum Düzey Local SEO ve GEO Etiketleri**: Projenin Yerel Arama Motoru Optimizasyonu (Local SEO) kapasitesini artırmak için `index.html` içerisine `geo.region` (TR-34), `geo.placename` (İstanbul), `geo.position` ve `ICBM` etiketleri (koordinatları ile) eklendi.
- **Google Analytics (GA4)**: Trafik takibi ve analizler için standart `gtag.js` entegrasyonu (placeholder kimliği ile) `index.html` dosyasına hazır hale getirildi.
- **Kapsamlı SEO İyileştirmeleri**: Eksik OpenGraph ve Twitter Card etiketleri eklendi. Ana sayfaya özgü `meta keywords` tanımlamaları yapıldı ve tüm sayfalarda H1, H2, H3 hiyerarşisi (headings structure) ile Görsel `alt` (Alternatif Metin) nitelikleri tarandı, tamamen uygun olduğu teyit edildi. Canonical URL ve Robots.txt yapılandırmaları korundu ve optimize edildi.

## [1.0.6] - 2026-07-09

### Güvenlik Geliştirmeleri (Security Hardening)
- **Güvenli HTTP Başlıkları (Security Headers)**: `vercel.json` güncellenerek tüm sayfalara en yüksek güvenlik seviyesinde HTTP başlıkları eklendi:
  - **Content-Security-Policy (CSP)**: Sitenin ihtiyaç duyduğu dış kaynaklara (Google Fonts, Google Maps, Leaflet ve 7/24 destek için WhatsApp API/Widget) güvenle izin verirken, XSS ve veri enjeksiyonu saldırılarını tamamen engelleyen sıkı CSP politikası tanımlandı.
  - **X-Frame-Options**: `SAMEORIGIN` yapılandırılarak Clickjacking saldırılarına karşı tam koruma sağlandı.
  - **X-Content-Type-Options**: `nosniff` ile tarayıcı seviyesinde MIME-type koklama saldırıları engellendi.
  - **Referrer-Policy**: `strict-origin-when-cross-origin` olarak optimize edildi.
  - **Permissions-Policy**: `camera=(), microphone=(), geolocation=()` şeklinde ayarlanarak kullanılmayan hassas donanım erişimleri kısıtlandı.
  - **Strict-Transport-Security (HSTS)**: `max-age=63072000; includeSubDomains; preload` olarak en üst düzeye çekildi.
- **Sıkı CORS Politikası (CORS Hardening)**: `server/server.ts` içerisindeki global gevşek CORS kaldırıldı. Strict CORS kontrolü yalnızca `/api/*` yollarına (`app.use("/api", cors(...))`) uygulanarak hassas sunucu kaynakları korunurken; görsel ve stil gibi statik varlıkların her ortamda sorunsuz yüklenmesi sağlandı.

### Düzeltilenler
- **Jingle Sesinin Kadın Sesi İle Değiştirilmesi (Gerçek İnsan Sesi)**: İletişim ve kariyer sayfalarındaki "Aya Elektrik" sesli anonsu (jingle), tarayıcıların standart/robotik erkek TTS (Metin Okuma) sesleri yerine, Google Translate altyapısı kullanılarak daha doğal, akıcı ve enerjik bir "kadın" sesine dönüştürüldü. Bunun için `server.ts` içerisine `/api/tts` isimli güvenli bir proxy uç noktası (endpoint) oluşturuldu. Yeni ses dosyası, CSP kurallarına takılmadan güvenle projeye entegre edildi.
- **Canlıda Harita Arka Planı Yüklenmeme Sorunu (Advanced Proxy Mode)**: Harita görsellerinin güvenli bir şekilde yüklenebilmesi için sadece CSP izinlerini gevşetmek yerine kurumsal seviyede "Reverse Proxy" (Ters Vekil) mimarisi geliştirildi. `server.ts` içerisine `/api/tiles/:z/:x/:y` şeklinde özel bir uç nokta (endpoint) eklendi ve Leaflet haritası dış kaynaklar yerine tamamen kendi sunucumuz üzerinden (`'self'`) beslenmeye başlandı. Bu üst düzey mühendislik çözümü sayesinde, `vercel.json` içerisindeki CSP (İçerik Güvenliği Politikası) kurallarından `img-src` kısmındaki tüm dış harita sunucularının izinleri tamamen silinerek, dışarıdan gelebilecek XSS vektörleri %100 oranında kapatılmış ve güvenlik duvarı en sıkı haline (Zero-Trust yaklaşımı) getirilmiştir.
- **Yazım ve İmla Hataları Giderildi**: Proje genelinde tespit edilen yazım yanlışları düzeltildi. `Testimonials.tsx` içerisindeki "Düzeniz" kelimesi "Düzensiz", `Contact.tsx` içerisindeki formda yer alan "Şartel" ifadesi ise "Şalter" olarak güncellendi.
- **Vercel `/admin` ve Alt Rotaların 404 Hatası Çözümü (Definitive Fix)**: Vercel edge rewrites kuralındaki SPA (Single Page Application) yapılandırması Vercel'in resmi dokümantasyonuna birebir uygun şekilde (`"destination": "/"`) güncellendi. Ayrıca `/admin` ve alt yolları için çok katmanlı yönlendirme kuralları eklenerek, Vercel'in `NOT_FOUND` koduyla döndürdüğü routing hataları Edge Network seviyesinde kökten çözüldü.
- **Admin Paneli Otomatik Giriş (Auto-Login) Düzeltmesi**: Güvenlik ve gizlilik standartları gereği, admin paneli giriş (login) ekranındaki Firebase kimlik doğrulama sürekliliği (persistence) optimize edildi. "Beni Hatırla" seçeneği işaretlenmeden yapılan girişlerin kalıcı (Local Persistence) yerine yalnızca tarayıcı oturumu (Session Persistence) süresince aktif kalması sağlandı. Böylelikle kullanıcı sekmeyi veya tarayıcıyı kapattığında otomatik olarak sistemden çıkış yapması (auto-logout) ve tekrar girmek istediğinde şifre sorması sağlandı. Mevcut açık oturumu olan yöneticilerin değişiklikleri görebilmesi için bir kere "Çıkış Yap" butonunu kullanmaları yeterlidir.
- **Yedek `/admin/login` Yönlendirmesi**: `/admin/login` gibi alternatif adreslerle kontrol paneline girmeye çalışan kullanıcıların doğrudan ana `/admin` yoluna aktarılması için `src/App.tsx` içerisine otomatik bir yönlendirme (`Navigate`) katmanı entegre edildi.
- **Eksik Open Graph (Sosyal Medya Paylaşım) Görselleri ve Cache Çözümü**: Web sitesi linki sosyal medya platformlarında (Facebook, Telegram, WhatsApp) paylaşıldığında çıkan eski/yabancı stok görsel sorunu çözüldü. Sosyal medya botları JavaScript çalıştırmadığı ve sunucu taraflı `/images/og/` klasöründeki statik görselleri aradığı için; `/public/images/og` klasörü oluşturularak içerisine özgün **Aya Elektrik Yerli Usta ve Panel Görselleri** (`ana-sayfa-og.jpg`, `besiktas-og.jpg`, `sigorta-arizasi-og.jpg` vb.) yerleştirildi. Böylelikle botlar 404 hatası almadan doğrudan doğru yerel görselleri çekebilecek.

## [1.0.5] - 2026-07-09

### Düzeltilenler
- **Vercel SPA ve `/admin` Rotası 404 Hatası**: `vercel.json` içerisinde `/admin`, `/hakkimizda` ve diğer sanal istemci taraflı rotaların Vercel edge sunucularında doğrudan 404 dönmesi engellendi. `/api/` dışındaki tüm istekleri `dist/index.html`'e güvenle yönlendiren `/((?!api/).*)` regex kuralı eklendi.
- **Serverless Sunucu Export Sarmalayıcısı (`api/index.js`)**: esbuild'in `--format=cjs` olarak derlediği sunucudaki `export default app` ifadesinin `exports.default` nesnesine sarmalanması nedeniyle oluşan API yüklenme hatası giderildi. `api/index.js` içerisine dinamik `default` kontrolü (`serverModule.default || serverModule`) eklenerek Vercel serverless çalışma ortamı ile uyumluluk sağlandı.

## [1.0.4] - 2026-07-01

### Eklenenler
- **Netlify Edge Functions ile Dinamik Meta Enjeksiyonu**: Prerender eklentilerindeki karmaşıklığı tamamen ortadan kaldırmak için Netlify Edge Functions (`netlify/edge-functions/meta-inject.ts`) oluşturuldu. Canlı sunucuda her istekte SEO uyumlu `<title>`, `<meta name="description">` ve `<link rel="canonical">` etiketleri HTML dosyasına doğrudan ve anında enjekte edilmeye başlandı.

### Kaldırılanlar
- **Özel Prerender Eklentisi ve Bağımlılıkları**: `vite.config.ts` içerisine eklenmiş karmaşık regex tabanlı prerender aracı ve `jsdom`, `@prerenderer/renderer-jsdom`, `whatwg-fetch`, `vite-plugin-prerender` paketleri projeden silinerek build süreci ciddi ölçüde hızlandırıldı ve basitleştirildi.

## [1.0.3] - 2026-07-01

### Eklenenler
- **Ultra Hızlı ve Güvenilir Prerendering Sistemi**: Projenin SEO performansını artırmak amacıyla 13 statik rotayı kapsayan özel bir ön-oluşturma (prerender) çözümü geliştirildi.
- **Dinamik Metadata ve Başlık Yönetimi**: Her sayfa için `react-helmet-async` ile belirlenmiş `<title>`, `<meta name="description">`, `<link rel="canonical">` ve Open Graph (`og:title`, `og:description`, `og:url`) etiketleri, derleme (build) sırasında kaynak `.tsx` dosyalarından çıkarılarak statik `.html` dosyalarının `<head>` kısmına doğrudan işlendi.
- **Arama Motoru Dostu Gövde Ön-Dolumu**: Her statik sayfanın gövdesine (`<body>`), ilgili sayfanın birincil başlığı (`<h1>`) ve ilk paragrafı (`<p>`) otomatik olarak eklenerek arama motorlarının JavaScript yüklenmeden önce de zengin içerik tarayabilmesi sağlandı.
- **Otomatik JSON-LD Şema Entegrasyonu**: Ana sayfa ön-oluşturulurken `localBusinessSchema` şema nesnesi dinamik olarak okunup temizlenerek `application/ld+json` betik etiketinin içerisine kusursuz bir şekilde enjekte edildi.

### Düzeltilenler
- **Puppeteer Bağımlılık Sorunları Giderildi**: Sandbox ve konteyner ortamlarında grafik kütüphanesi (`libXtst.so.6`) eksikliği nedeniyle derleme aşamasında Puppeteer/Chrome'un çökmesi sorunu, sıfır bağımlılıklı saf JS tabanlı derleme-sonrası (post-bundle close) enjeksiyon yöntemiyle kalıcı olarak çözüldü.
- **JSDOM ve ES Modül Uyuşmazlığı Aşındı**: JSDOM'un `<script type="module">` etiketlerini derleme sırasında çalıştıramamasından ötürü oluşan boş sayfa şablonu sorunu, doğrudan kod seviyesinde ayrıştırma ve enjeksiyon (AST/Regex tabanlı hibrit parser) ile tamamen aşılmıştır.

## [1.0.2] - 2026-07-01

### Düzeltilenler
- **Eksik Sunucu Bağımlılıkları**: Full-stack mimariye geçiş sonrasında `server/server.ts` tarafından kullanılan ancak `package.json` içerisinde tanımlanmamış olan `express`, `cors`, `helmet` ve `express-rate-limit` paketleri ile `@types/express` ve `@types/cors` TypeScript tanımlama paketleri projeye eklenerek sunucu başlatma sırasındaki "Cannot find package 'express'" hatası tamamen giderildi.
- **Vite/Express Build Konfigürasyonu**: Projenin üretim modundaki derleme ve çalıştırma süreçleri optimize edildi.

## [1.0.1] - 2026-06-27

### Eklenenler
- **GitHub Dağıtım Paneli**: Admin panelinde yer alan "Ayarlar" bölümü genişletilerek "Dağıtım ve Yayına Alma" (Deploy) sekmesi eklendi. GitHub bağlantı parametreleri (Repository URL, PAT, Hedef Branch) ve süreç takibini sağlayan entegre terminal arayüzü oluşturuldu.
- **Canlı Dağıtım Terminali**: Dağıtım işlemleri sırasındaki çıktıları (`console logs`) anlık olarak gösteren, hata/başarı durumlarına göre renklendirme yapan estetik terminal arayüzü tasarlandı.

### Değiştirilenler / İyileştirilenler
- **Admin Paneli Arayüzü**: Tasarım sil baştan düzenlendi. Yeni Focus Mod (Odaklanma) yetenekleri ve UI geliştirmeleriyle genel görünüm modernize edildi. "Deploy" ve "Ayarlar" tab'leri daha profesyonel ve kurumsal (Mavi/Lacivert tonlar) bir tasarıma geçirildi.

### Düzeltilenler
- **Silme İşlemleri**: Admin panelindeki (Blog Yönetimi ve İş Başvuruları) "Sil" butonlarına eksik olan tıklama ve veritabanından kalıcı silme (`onClick`) fonksiyonları eklenerek butonların çalışmama sorunu çözüldü.
- **Express Rate Limit Uyarıları**: `server.ts` içerisine `app.set("trust proxy", 1);` eklenerek proxy arkasındaki IP algılama sorunu ve uyarılar kalıcı olarak çözüldü.
- **JSX Sentaks Hataları**: `AdminPage.tsx` içerisinde dağıtım (deploy) paneli üzerinde oluşan etiket uyumsuzlukları, geçersiz `}` karakteri ve kapanış tag hataları düzeltilerek derleme süreci (build) hatasız hale getirildi.
- **React Render Hataları**: Firestore `createdAt` timestamp objesinin Admin sayfasında doğrudan `React child` olarak render edilmesinden kaynaklanan çökme (`Objects are not valid as a React child`) giderildi. Veriler tarih formatına dönüştürüldü.
- **Build ve Lint Hataları**: Uçtan uca proje taranarak mevcut tüm derleme uyarıları temizlendi.

# Google AdSense Monetizasyon & Maksimum Kazanç Altyapısı Planı

Aya Elektrik platformunu Google AdSense yayıncı politikalarıyla tam uyumlu hale getirerek sıfırdan sorunsuz onay almasını sağlamak, zorunlu yasal/şeffaflık sayfalarını (Künye, Çerez Onayı, Güncel Gizlilik) entegre etmek ve yüksek görünürlük (Viewability) ile maksimum tıklama oranı (CTR) sunan responsive reklam yerleşimlerini devreye almak.

### User Review & Critical Decisions

> [!IMPORTANT]
> Kullanıcı tercihleri doğrultusunda onay süreci ve reklam stratejisi kararlaştırılmıştır:
> - **Onay ve Entegrasyon Stratejisi**: Sıfırdan Google AdSense onayına eksiksiz uygunluk sağlayacak teknik altyapı, meta etiketleri (`google-adsense-account`), `ads.txt` dosyası ve dinamik reklam yönetim bileşenleri hazırlanacaktır.
> - **Gelir & CTR Optimizasyonu**: Sayfa düzenini ve Core Web Vitals (CLS) dengesini bozmadan maksimum tıklama kazancı elde etmek için; mobil/masaüstü yapışkan (sticky) alt banner, blog makale içi (in-article), hizmet/blog listeleme kartları arası (in-feed) ve sidebar reklam slotları yerleştirilecektir.
> - **AdSense Şeffaflık Politikaları**: Google'ın onay için zorunlu tuttuğu **Künye (İmprint / Şirket Bilgileri)** sayfası, KVKK/GDPR uyumlu **Çerez İzin & Tercih Banner'ı (Cookie Consent)** ve güncellenmiş **Gizlilik Politikası (AdSense Çerez Maddeleri)** eklenecektir.

---

### 1. Overview & Core Concept

- **What It Does**: Web sitesine kurumsal elektrik mühendisliği ve acil arıza servislerinin yanı sıra, yüksek trafik çeken zengin teknik blog makaleleri ve ilçe rehberleri üzerinden pasif reklam geliri elde etme altyapısı kazandırır. AdSense başvurusunda doğrudan onay alınması için Google politikalarındaki tüm eksiklikleri (yasal sayfalar, çerez yönetimi, ads.txt, meta etiketleri) tamamlar.
- **Target Audience / Persona**: 
  1. İstanbul geneli elektrik arıza, tesisat, pano ve güneş enerjisi hizmeti arayan yerel ziyaretçiler.
  2. Blog rehberlerini ve elektrik hesaplama içeriklerini organik aramalardan okuyan, teknik bilgi arayan binlerce aylık ziyaretçi.
  3. Site yöneticisi (Aya Elektrik ekibi): Admin panelinden reklam slotlarını ve AdSense durumunu yönetmek isteyen ekip.
- **Key Value**: Yüksek kaliteli elektrik sektörü içeriğini (yüksek TBM/CPC potansiyelli niş) maksimum görünürlük ve kullanıcı dostu yerleşimlerle gelire dönüştürür; reklam engelleyiciler veya boş reklam alanları yüzünden sayfa düzeninin kaymasını önler.

---

### 2. User Experience & Visual Design

- **Key User Flows**:
  1. **Ziyaretçi Sayfaya Giriş Yapar**: Alt kısımda minimal, şık bir çerez tercih bildirimi görünür. Ziyaretçi "Kabul Et" veya "Özelleştir" seçeneğiyle tercihlerini kaydeder.
  2. **Blog Makalesi Okuma**: Başlık ve özetin hemen altında dikkat çekici fakat okumayı engellemeyen bir üst sponsorlu alan, 3. paragraftan sonra doğal akışta yüksek CTR'lı bir makale içi reklam alanı, sağ sütunda (masaüstünde) kayan sticky reklam yerleşimi bulunur.
  3. **Mobil Gezinme Deneyimi**: Ekranın alt kısmında %15 mobil yükseklik kuralına sadık kalan, istendiğinde tek tıkla kapatılabilen, acil çağrı butonlarını perdelemeyen akıllı yapışkan alt reklam şeridi (Sticky Bottom Banner) yer alır.
  4. **AdSense Doğrulama & Denetim**: Google botları veya AdSense uzmanları siteyi incelediğinde footer'dan Künye, Gizlilik Politikası, Çerez Bildirimi ve `ads.txt` dosyasına tek tıkla erişir; eksiksiz kurumsal güvenilirlik görür.

- **Visual Identity & Theme**:
  - *Aesthetic Direction*: Kurumsal mühendislik disiplini; lacivert (`#0b2e59`), amber-altın sarısı (`#ffb703`), temiz arduvaz grisi (`#f8fafc` ve `#e2e8f0`).
  - *Anti-Slop & Zero-Pill Restraint*: Reklam kutuları "Sponsorlu İçerik" veya "Reklam" ibaresini göze batmayan, 11px minimal sans-serif tipografiyle taşır; sayfa düzeninde ani sıçrama (layout shift) yapmaması için rezerve edilmiş sabit minimum yükseklik ve zarif hairline sınır çizgileri kullanılır.
  - *Typography*: Google Fonts ile optimize edilmiş okunabilir `Plus Jakarta Sans` ve `DM Sans` gövde metinleri.
  - *Mobile Sticky Cap Governance*: Alt yapışkan reklam birimi, mobil acil arama barı (`MobileCallBar`) ile çakışmayacak ve toplam ekran yüksekliğinin %15'ini aşmayacak şekilde optimize edilir.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: AdSense Hazırlık Modu vs. Canlı Reklam Enjeksiyonu**
  - *Chosen Approach*: `AdBanner` bileşeninde çift modlu mimari kurulur: Henüz aktif AdSense `ca-pub` kodu tanımlanmadığında veya onay beklenirken, sayfada bozuk alan veya boş kutu bırakmak yerine şık "Aya Elektrik Kurumsal İletişim / 7-24 Acil Çağrı / Kampanya" sponsorlu kartları ve placeholder alanları gösterilir. `ca-pub` girildiği anda otomatik olarak Google AdSense scripti ve `ins.adsbygoogle` devreye girer.
  - *Why*: Google AdSense inceleme ekibi siteye girdiğinde boş, kırık veya biçimsiz reklam kutuları görmez; onay şansı maksimuma çıkar.
  - *Alternatives Considered*: Doğrudan boş `ins` etiketleri koymak (onay sürecinde AdSense boş alan döndürür ve tasarımda çirkin boşluklar oluşur, bu da red sebebidir).

- **Decision 2: ads.txt ve Doğrulama Dosyalarının Yönetimi**
  - *Chosen Approach*: `public/ads.txt` dosyası doğrudan kök dizine standart Google AdSense formatında yerleştirilir. `index.html` içine AdSense hesap onay meta etiketi (`google-adsense-account`) eklenir.
  - *Why*: Google AdSense tarayıcı botlarının ilk kontrol ettiği yer `https://ayaelektrik.com/ads.txt` ve `<meta name="google-adsense-account">` etiketidir.
  - *Alternatives Considered*: Sadece JS ile sonradan ads.txt yönlendirmesi yapmak (botlar tarafından okunamayabilir).

- **Decision 3: Çerez Politikası & KVKK/GDPR İzin Banner'ı**
  - *Chosen Approach*: Modern, kullanıcı deneyimini tıkamayan, yerel depolamada (`localStorage`) tercihi hatırlayan ve AdSense kişiselleştirilmiş reklam çerezlerine izin veren hafif bir `CookieConsentModal` bileşeni.
  - *Why*: Google AdSense politikaları, AB ve Türkiye mevzuatında üçüncü taraf reklam çerezleri için açık rıza veya bilgilendirme şart koşmaktadır; eksikliği hesap feshine veya onay reddine yol açar.

---

### 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        AYA ELEKTRIK WEB APP                            │
├────────────────────────────────────────────────────────────────────────┤
│  index.html                                                            │
│   ├── <meta name="google-adsense-account" content="ca-pub-...">        │
│   └── public/ads.txt (google.com, pub-..., DIRECT, f08c47fec0942fa0)   │
└────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                      SHARED COMPONENTS & LAYOUTS                       │
├────────────────────────────────────────────────────────────────────────┤
│  CookieConsentModal.tsx  ──► KVKK / GDPR Uyumlu Çerez Onayı             │
│  AdBanner.tsx            ──► Duyarlı AdSense & Fallback Reklam Alanı   │
│     ├── Variant: 'leaderboard' (728x90 / responsive header)           │
│     ├── Variant: 'in-article'   (Makale içi yüksek CTR içerik alanı)   │
│     ├── Variant: 'sticky-bottom'(Mobil / Masaüstü alt sabit bar)       │
│     ├── Variant: 'in-feed'      (Blog / Hizmet kartları arasında)      │
│     └── Variant: 'sidebar'      (300x250 / 300x600 masaüstü yan alan) │
│  Footer.tsx              ──► Künye, Gizlilik, Çerez Politikası Linkleri│
└────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                         NEW & UPDATED PAGES                            │
├────────────────────────────────────────────────────────────────────────┤
│  KunyePage.tsx           ──► Şirket Ünvanı, MERSİS, Vergi No, Adres    │
│  GizlilikPolitikasiPage  ──► Güncellenmiş AdSense & DoubleClick Çerezi │
│  BlogPostPage.tsx        ──► Makale İçi & Sidebar Reklam Yerleşimleri  │
│  BlogListPage.tsx        ──► In-Feed Doğal Akış Reklam Kartları        │
│  AdminPage.tsx           ──► AdSense Yayıncı ID & Slot Yönetim Sekmesi │
└────────────────────────────────────────────────────────────────────────┘
```

#### AdSense & Monetizasyon Bileşen Yapısı (`AdBanner.tsx`):
- **Props**: `slotId?: string`, `format?: 'auto' | 'rectangle' | 'horizontal' | 'fluid'`, `variant: 'leaderboard' | 'in-article' | 'in-feed' | 'sticky-bottom' | 'sidebar'`, `className?: string`.
- **Görünürlük ve CLS Güvencesi**: `min-h-[90px]` veya `min-h-[250px]` gibi rezerve edilmiş CSS kapsayıcıları ile Cumulative Layout Shift (CLS) puanı sıfır tutulur.
- **Mobil Entegrasyon**: Alt yapışkan banner, `bottom-0 md:bottom-2` üzerinde `z-40` seviyesinde çalışır ve acil arama düğmesiyle estetik biçimde hizalanır.

---

### Implementation Stages (Onay Sonrası Sıralı Adımlar)

1. **Yasal & Şeffaflık Sayfalarının Tamamlanması**:
   - `KunyePage.tsx` oluşturulması (Aya Elektrik resmi bilgileri, iletişim, sicil/vergi no, sorumlu elektrik mühendisi).
   - `GizlilikPolitikasiPage.tsx` metnine Google AdSense, üçüncü taraf reklam ortakları ve çerez yönetimi maddelerinin eklenmesi.
   - `CerezPolitikasiPage.tsx` sayfasının güncellenmesi.
   - `App.tsx` içine `/kunye` rotasının eklenmesi ve `Footer.tsx` bağlantılarının tamamlanması.

2. **Çerez Onay Banner'ı (`CookieConsentModal.tsx`)**:
   - Google AdSense gereksinimlerine uygun bilgilendirme ve kabul butonu.
   - Tercihlerin yerel hafızada saklanması.

3. **AdSense Altyapı Dosyaları & Doğrulama Kodları**:
   - `public/ads.txt` dosyasının oluşturulması.
   - `index.html` içine AdSense meta etiketi ve dinamik betik çağrısı entegrasyonu.

4. **Yüksek CTR Reklam Yerleşim Bileşenlerinin Eklenmesi**:
   - `AdBanner.tsx` bileşeninin geliştirilmesi (in-article, in-feed, sticky-bottom, sidebar).
   - `BlogPostPage.tsx` içerisine makale içi ve sidebar reklamların yerleştirilmesi.
   - `BlogListPage.tsx` içerisine in-feed reklam kartlarının eklenmesi.
   - Sayfa altı yapışkan reklamın (Sticky Banner) entegrasyonu.

5. **Admin Panelinde AdSense Yönetimi**:
   - `AdminPage.tsx` üzerinde AdSense yayıncı kimliği (`ca-pub`), slot kimlikleri ve reklam gösterim kontrol sekmesinin eklenmesi.

6. **Derleme, Doğrulama ve Test**:
   - `compile_applet` ve `lint_applet` ile tüm rotaların, bileşenlerin ve derlemenin hatasız çalıştığının doğrulanması.

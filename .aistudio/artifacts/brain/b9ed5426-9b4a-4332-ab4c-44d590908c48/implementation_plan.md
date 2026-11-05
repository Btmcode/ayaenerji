# Aya Elektrik 7/24 Operasyonel Telegram Botu & CRM Entegrasyon Planı

## 1. Üst Düzey Yönetici Özeti (Senior Manager Executive Summary)
Aya Elektrik, İstanbul Avrupa Yakası'nda 7/24 acil elektrik arıza, bakım ve onarım hizmeti sunan saha odaklı bir işletmedir. Bir elektrik arıza işletmesinde **dönüşümün ve müşteri memnuniyetinin %80'i ilk 3-5 dakika içinde verilen hızlı tepkiye** bağlıdır.

Bu plan; web sitesinden gelen acil arıza taleplerini, hesaplama aracı etkileşimlerini ve müşteri dönüşümlerini sahadaki ustalara ve şirket yönetimine **0 gecikmeyle (anlık push)** ulaştıran, usta atama ve durum güncellemelerini tek tıkla Telegram butonları üzerinden gerçekleştiren, servis tamamlandığında ise müşteriye otomatik NPS / memnuniyet anketi gönderen profesyonel bir **Telegram İş Operasyon Botu** mimarisidir.

---

## 2. Sistem Mimarisi & Veri Akışı

```
[Müşteri Web Sitesi] 
       │
       ├─► Acil Servis Formu / WhatsApp Butonu / Hesaplama Aracı Terki
       │          │
       │          ▼
       ├─► [Express Backend / API & Firestore]
       │          │
       │          ▼
       ├─► [Telegram Bot API Engine (server/telegram.ts)]
       │          │
       │          ├─► Anlık Bildirim (HTML Formatlı, Acil Çağrı Kartı)
       │          ├─► Inline Butonlar: [📞 Müşteriyi Ara] [📍 Haritada Aç] [⚡ Ustaya Ata]
       │          └─► [Yönetim & Saha Ustaları Telegram Grubu / Kanalı]
       │
[Admin Paneli / Ayarlar] ◄───► Dinamik Token & Chat ID & Bildirim Açma/Kapama Ayarları
       │
[Servis Tamamlandı Aksiyonu] ───► Müşteri SMS/WhatsApp Memnuniyet Anketi Tetikleme
       │
[Gece 23:59 Cron Job] ──────────► Günlük & Haftalık Ciro / Talep / Performans Özeti
```

---

## 3. Temel Fonksiyonel Modüller & Çözümler

### A. Anlık Acil Çağrı & Usta Atama Kartı (Lead Dispatcher)
Web sitesinden (İletişim formu, Hızlı Çağrı, Arıza Bildirimi) yeni bir talep geldiğinde Telegram grubuna görsel olarak zenginleştirilmiş, acil durum seviyesine göre renklendirilmiş bir bildirim düşer:
- **Başlık:** `🚨 YENİ 7/24 ACİL SERVİS ÇAĞRISI`
- **Müşteri Bilgisi:** Ad Soyad, Telefon numarası
- **Adres & İlçe:** Açık adres ve tespit edilen ilçe (Büyükçekmece, Beylikdüzü, Esenyurt vb.)
- **Arıza Tipi:** Sigorta atması, pano yanması, priz arızası, aydınlatma, acil bakım
- **İnline Aksiyon Butonları:**
  - `📞 Müşteriyi Ara` (Doğrudan `tel:` linkiyle arama başlatır)
  - `📍 Konumu Aç` (Google Maps veya Apple Maps rotasını haritada açar)
  - `👷 Ahmet Ustaya Yönlendir` / `👷 Mehmet Ustaya Yönlendir`
  - `✅ Çağrıyı Üzerime Alıyorum` (Diğer ustaların mükerrer aramasını önler)

### B. Müşteri Deneyimi & Otomatik Memnuniyet Anketi (Post-Service NPS)
- Servis tamamlandı olarak işaretlendiğinde (Admin panelinden veya Telegram üzerinden `✅ Tamamlandı` butonuna basıldığında):
- Müşterinin WhatsApp veya SMS hattına profesyonel, robotik olmayan tek tıkla puanlama bağlantısı hazırlanır.
- Müşterinin verdiği 1-5 yıldız değerlendirmesi ve geri bildirimi anında Telegram yönetim kanalına düşer. 5 yıldız veren müşteriye Google Haritalar işletme profili yorum linki önerilir.

### C. Dönüşüm Takibi & Hesaplama Aracı Terk Alarmları (Growth Analytics)
- Sitede kablo kesiti hesabı, kompanzasyon veya elektrikli araç şarj istasyonu (EV Wallbox) hesaplama araçlarını kullanıp son aşamada iletişim formunda telefonunu bırakıp butona basmayan / tereddütte kalan potansiyel müşteriler için:
  - `⚠️ POTANSİYEL PROJE MÜŞTERİSİ ALARMI`
  - "Büyükçekmece bölgesinden bir kullanıcı 22kW EV Şarj İstasyonu hesaplaması yaptı, WhatsApp butonuna tıkladı."
- Bu sayede pazarlama ve kullanıcı deneyimi boşlukları anında tespit edilir.

### D. Günlük ve Haftalık Performans & Ciro Raporu (Automated Cron)
- `node-cron` ile her gece saat 23:59'da Telegram yönetim kanalına otomatik özet:
  - 📊 **Bugünkü Toplam Çağrı Sayısı:** X adet
  - ⚡ **Acil Müdahale Edilen:** Y adet
  - ⏱️ **Ortalama Sahaya Ulaşım Süresi:** ~28 dakika
  - ⭐ **Günün Memnuniyet Puanı:** 4.9 / 5.0
  - 🏆 **En Çok Çağrı Gelen Bölge:** Alkent 2000 & Beykent

### E. Admin Paneli: "Telegram Bot Ayarları" Modülü
Yöneticinin (`ayaenerji@gmail.com` ve `ahmetcafoglu@hotmail.com`) kod değiştirmeden sistemi yönetmesi için:
- **Bot Token Girişi:** (BotFather'dan alınan token)
- **Yönetim Chat ID / Grup ID:** (Bildirimlerin gideceği grup/kanal ID'si)
- **Bildirim Seçenekleri (Toggle Switchler):**
  - [x] Yeni Acil Servis Taleplerinde Bildir
  - [x] Müşteri WhatsApp İletişim Tıklamalarında Bildir
  - [x] Hesaplama Aracı Kullanımlarında Bildir
  - [x] Günlük Gece Özeti İlet
- **"Test Bildirimi Gönder" Butonu:** Girilen yapılandırmanın çalıştığını anında Telegram'a deneme mesajı atarak test eder.
- **Bot Kurulum Rehberi Modal:** BotFather'dan bot açma ve grup ID'si bulma adımlarını Türkçe ekran görüntüleriyle gösterir.

---

## 4. Kullanıcı İncelemesi Gerektiren Konular (User Review Required)
1. **Telegram Kanal / Grup Tercihi:**
   - Bot doğrudan kişisel özel mesajınıza mı yoksa şirket içi ustalar ve yönetimin bulunduğu ortak bir Telegram grubuna mı bildirim göndersin? (Önerimiz: Ortak Telegram Grubu, böylece boştaki usta tek tıkla işi alabilir).
2. **BotFather Token Temini:**
   - Test ve simülasyon aşamasında dahili test modülü ve admin paneli arayüzü hazır olarak sunulacak, dilediğiniz zaman gerçek tokenınızı admin paneline tek tıkla yapıştırıp aktif edebileceksiniz.

---

## 5. Değişiklik Yapılacak Dosyalar & Uygulama Adımları

### Adım 1: Backend Telegram Servisi & Endpointleri
- **Dosya:** `/server/telegram.ts` (Yeni servis dosyası)
  - Telegram Bot API wrapper (mesaj gönderme, inline buton desteği, test bağlantısı).
  - Acil servis talep şablonu oluşturucu (`formatEmergencyCallMessage`).
  - Günlük özet raporlayıcı (`formatDailyReportMessage`).
  - Dönüşüm / hesaplama alarmı oluşturucu (`formatAnalyticsAlertMessage`).
- **Dosya:** `/server/server.ts` (Mevcut express sunucusu)
  - `/api/telegram/send-alert`: Acil talep ve analitik bildirimleri alan güvenli route.
  - `/api/telegram/test`: Admin panelinden test mesajı gönderme endpointi.
  - `/api/telegram/config`: Bot ayarlarını Firestore veya güvenli konfigürasyondan çekme/güncelleme.
  - `node-cron` servisine gece 23:59 günlük rapor cron görevinin eklenmesi.

### Adım 2: Admin Paneli "Telegram" Modülü
- **Dosya:** `/src/pages/admin/TelegramTab.tsx` (Yeni admin bileşeni)
  - Bot Token, Chat ID, Usta Listesi tanımlama formları.
  - Canlı bildirim anahtarları (Acil servis, Hesaplama, Günlük rapor).
  - Canlı "Telegram Bağlantısını Test Et" butonu ve durum göstergesi (Bağlandı / Hata).
  - Adım adım Türkçe BotFather rehberi.
- **Dosya:** `/src/pages/AdminPage.tsx`
  - Sidebar ve sekmeler arasına **"Telegram"** sekmesinin eklenmesi.

### Adım 3: İstemci Tarafı Bildirim Entegrasyonları (Web Site Tetikleyicileri)
- **Dosya:** `/src/components/Contact.tsx`
  - Müşteri acil servis formu gönderdiğinde Firestore'a kayıt anında arka planda Telegram dispatch servisine de sinyal gönderilmesi.
- **Dosya:** `/src/utils/telegramClient.ts` (Yeni yardımcı modül)
  - Frontend üzerinden acil çağrı ve dönüşüm olaylarını `/api/telegram/send-alert` route'una ileten hafif ve hataya dayanıklı istemci.

---

## 6. Doğrulama ve Test Planı (Verification Plan)

### Otomatik Testler
1. `npm run lint` (`tsc --noEmit`): Sıfır tip veya import hatası.
2. `npm run build`: Vite ve esbuild server paketlemesinin başarıyla tamamlanması.

### Manuel / Fonksiyonel Senaryolar
1. **Admin Paneli Testi:**
   - Admin paneline giriş yapılıp "Telegram" sekmesine tıklanması.
   - Ayarların kaydedilmesi ve "Test Bildirimi Gönder" butonuyla Telegram API simülasyonunun ve bağlantısının doğrulanması.
2. **Acil Talep Bildirimi Testi:**
   - Web sitesi iletişim formundan örnek bir acil arıza kaydı oluşturulması.
   - Bildirimin tüm müşteri detayları, konum butonu ve doğrudan arama butonu ile Telegram'a formatlı düştüğünün teyidi.
3. **Hesaplama Aracı Alarm Testi:**
   - Sitedeki hesaplama araçlarından birinin kullanılıp dönüşüm sinyalinin üretildiğinin kontrolü.

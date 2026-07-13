# Aya Elektrik - Akıllı Yerel SEO ve Yönetim CRM Paneli

Aya Elektrik, İstanbul Avrupa Yakası'nda 7/24 hizmet veren profesyonel elektrik mühendisliği ve arıza/bakım servisi için özel olarak tasarlanmış, tam donanımlı, full-stack bir web uygulaması ve CRM yönetim panelidir.

## 🚀 Proje Özellikleri

- **7/24 Acil Elektrik Arıza CRM**: Gelen çağrıları, form taleplerini ve iş başvurularını anlık takip eden gelişmiş müşteri yönetim sistemi.
- **Yapay Zeka Destekli SEO İçerik Motoru & Görsel Üretimi**: Gemini API ve Imagen 3 motorları ile entegre, yerel SEO uyumlu blog yazıları, sosyal medya gönderileri ve GMB güncellemelerini eş zamanlı olarak ilgili görsel taslaklarıyla üreten otomasyon.
- **Otomatik Günlük SEO Taslak Kampanyası**: Tek tıkla İstanbul'un farklı ilçeleri ve elektrik uzmanlık alanları için otomatik toplu SEO blog içeriği ve görseli üreten günlük kampanya motoru.
- **Güvenli Yönetici Paneli (Google 2FA Destekli)**: 
  - Değiştirilebilir e-posta ve şifreli gelişmiş kimlik doğrulama.
  - İsteğe bağlı olarak açılıp kapatılabilen, Google Authenticator uyumlu iki adımlı doğrulama (2FA/f2a) güvenlik katmanı.
- **Performans ve Çağrı Analizleri**: Yapay zekanın usta performanslarını ve çağrı kayıtlarını analiz ederek zorluk, kârlılık ve süre tahmini yaptığı veri analiz tabloları.
- **A/B Test Altyapısı**: Web sitesi dönüşüm oranlarını artırmak için tasarlanmış canlı dönüşüm testi yönetim aracı.

---

## 🛠️ Yerel Kurulum ve Çalıştırma

Projeyi kendi bilgisayarınızda yerel olarak çalıştırmak için aşağıdaki adımları takip edebilirsiniz:

### 1. Gereksinimler
- Node.js (v18+)
- npm veya yarn paket yöneticisi

### 2. Bağımlılıkları Yükleyin
```bash
npm install
```

### 3. Çevre Değişkenlerini Yapılandırın
Kök dizinde yer alan `.env.example` dosyasını `.env` olarak kopyalayın ve `GEMINI_API_KEY` değerini ekleyin:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Geliştirme Sunucusunu Başlatın
```bash
npm run dev
```
Uygulama tarayıcınızda `http://localhost:3000` adresinde çalışmaya başlayacaktır.

---

## 🐙 Projenizi GitHub'a Yükleme Rehberi

Sandbox ortamının doğası gereği, terminalden doğrudan `git push` komutları çalıştırmak için kişisel GitHub SSH/Token bilgilerinize erişim yoktur. Projenizi GitHub'a yüklemek için şu iki yöntemden birini kullanabilirsiniz:

### Yöntem A: AI Studio Arayüzü ile Doğrudan Aktarım (Önerilen)
1. **Google AI Studio** arayüzünün sağ üst tarafındaki **Settings / Ayarlar** menüsüne gidin.
2. **Export to GitHub** veya **Connect GitHub** seçeneğini kullanarak hesabınızı bağlayın.
3. Tek tıkla projenizi dilediğiniz GitHub deposuna güvenle aktarın.

### Yöntem B: Bilgisayarınız Üzerinden Manuel Yükleme
Uygulamayı ZIP olarak bilgisayarınıza indirdikten sonra, terminalinizde aşağıdaki komutları sırasıyla çalıştırarak kendi GitHub deponuza gönderebilirsiniz:

```bash
# Git deposunu başlatın
git init

# Tüm dosyaları ekleyin (node_modules ve .env dosyaları .gitignore ile otomatik hariç tutulur)
git add .

# İlk yükleme commit'ini yapın
git commit -m "feat: Aya Elektrik full-stack CRM and Admin Panel first commit"

# Ana dalı belirleyin
git branch -M main

# Uzak depoyu (remote origin) kendi deponuzla bağlayın
git remote add origin https://github.com/Btmcode/ayaenerji.git

# Değişiklikleri zorunlu olarak ana dala gönderin (push)
git push -u origin main -f
```

---

## 🔐 İlk Giriş ve Güvenlik Bilgileri

Yönetici paneline ilk defa giriş yaparken kullanabileceğiniz varsayılan kimlik bilgileri:

- **E-posta**: `admin@ayaelektrik.com`
- **Şifre**: `admin123`

*Giriş yaptıktan sonra **Ayarlar** sekmesinden e-posta adresi, şifre ve **Google 2FA** güvenlik doğrulaması ayarlarını özelleştirebilirsiniz.*

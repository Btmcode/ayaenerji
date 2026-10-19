import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  PhoneCall, 
  MessageCircle, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  ChevronRight, 
  CheckCircle2, 
  Zap, 
  AlertTriangle,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import MobileCallBar from '../components/MobileCallBar';
import { getDistrictBySlug, ISTANBUL_DISTRICTS } from '../data/istanbulDistricts';
import { getWhatsAppLink } from '../utils/whatsapp';

export default function DistrictPage() {
  const { districtSlug } = useParams<{ districtSlug: string }>();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [districtSlug]);

  if (!districtSlug) {
    return <Navigate to="/bolgelerimiz" replace />;
  }

  const district = getDistrictBySlug(districtSlug);

  if (!district) {
    // If not found in dynamic list, fallback to 404
    return <Navigate to="/404" replace />;
  }

  const phoneDisplay = district.phone || '+90 530 069 53 93';
  const phoneClean = phoneDisplay.replace(/[\s-]/g, '');
  const whatsAppText = encodeURIComponent(`Merhaba Aya Elektrik, ${district.name} bölgesinden acil elektrikçi ustası çağırmak istiyorum. Arızam: `);

  // Schema data for SEO & GEO
  const districtSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "EmergencyService"],
        "@id": `https://ayaelektrik.com/hizmet-bolgeleri/${district.slug}#localbusiness`,
        "name": `Aya Elektrik - ${district.name} Nöbetçi Elektrikçi`,
        "image": "https://ayaelektrik.com/images/og/ana-sayfa-og.jpg",
        "telephone": phoneClean,
        "priceRange": "₺₺",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "00:00",
            "closes": "23:59"
          }
        ],
        "address": {
          "@type": "PostalAddress",
          "addressLocality": district.name,
          "addressRegion": "İstanbul",
          "addressCountry": "TR"
        },
        "areaServed": district.neighborhoods.map(nh => ({
          "@type": "AdministrativeArea",
          "name": `${district.name} ${nh} Mahallesi`
        })),
        "url": `https://ayaelektrik.com/hizmet-bolgeleri/${district.slug}`,
        "description": district.description
      },
      {
        "@type": "FAQPage",
        "@id": `https://ayaelektrik.com/hizmet-bolgeleri/${district.slug}#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": `${district.name} bölgesinde elektrik arızasına ne kadar sürede ulaşıyorsunuz?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `${district.name} ve çevre mahallelerinde hazır bekleyen mobil nöbetçi servis araçlarımızla çağrınızı aldıktan sonra ortalama ${district.averageArrivalTime} içinde adresinize ulaşıyoruz.`
            }
          },
          {
            "@type": "Question",
            "name": `${district.name} acil elektrikçi hizmetiniz 7/24 kesintisiz mi?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Evet, Aya Elektrik olarak ${district.name} genelinde hafta sonu, resmi tatil ve gece saatleri dahil 7 gün 24 saat kesintisiz acil nöbetçi elektrikçi servisi sunuyoruz.`
            }
          },
          {
            "@type": "Question",
            "name": `Yapılan elektrik tamirat ve pano işlemlerinde garanti veriyor musunuz?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Evet, servislerimizde TSE ve CE standartlarında garantili orijinal malzemeler kullanılır, tüm işçiliklerimiz firma garantimiz altındadır.`
            }
          }
        ]
      }
    ]
  };

  // Other neighboring districts for internal linking
  const nearbyDistricts = ISTANBUL_DISTRICTS
    .filter(d => d.side === district.side && d.slug !== district.slug)
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-[72px] md:pb-0 font-sans selection:bg-[#ffb703] selection:text-[#0b2e59]">
      <Helmet>
        <title>{district.name} Elektrikçi | 7/24 Acil Nöbetçi Servis - Aya Elektrik</title>
        <meta 
          name="description" 
          content={`${district.name} ve çevre mahallelerinde 7/24 acil nöbetçi elektrikçi. Ortalama ${district.averageArrivalTime} içinde adresteyiz. Sigorta atması, pano tamiri ve garantili tesisat çözümleri.`} 
        />
        <meta name="keywords" content={`${district.name} elektrikçi, ${district.name} acil elektrikçi, ${district.name} nöbetçi elektrikçi, ${district.name} elektrik arıza, ${district.name} elektrik ustası`} />
        <link rel="canonical" href={`https://ayaelektrik.com/hizmet-bolgeleri/${district.slug}`} />
        <meta property="og:title" content={`${district.name} Elektrikçi | 7/24 Acil Nöbetçi Servis - Aya Elektrik`} />
        <meta property="og:description" content={`${district.name} genelinde 7/24 acil elektrikçi servisi. Ortalama ${district.averageArrivalTime} içinde adresteyiz.`} />
        <meta property="og:url" content={`https://ayaelektrik.com/hizmet-bolgeleri/${district.slug}`} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify(districtSchema)}
        </script>
      </Helmet>

      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 mb-6">
          <nav className="flex items-center gap-2 text-sm text-slate-500 flex-wrap">
            <Link to="/" className="hover:text-[#0b2e59] transition-colors">Ana Sayfa</Link>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <Link to="/#bolgeler" className="hover:text-[#0b2e59] transition-colors">Hizmet Bölgeleri</Link>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <span className="text-slate-900 font-semibold">{district.name} Elektrikçi</span>
          </nav>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-b from-[#0b2e59] to-[#082242] text-white py-14 px-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#ffb703]/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#ffb703] font-semibold text-xs md:text-sm mb-4 backdrop-blur-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffb703] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ffb703]"></span>
                </span>
                {district.name} &bull; {district.side} Yakası 7/24 Nöbetçi Ekip
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
                {district.name} <span className="text-[#ffb703]">Nöbetçi Elektrikçi</span> & Acil Servis
              </h1>

              <p className="text-base sm:text-lg text-slate-200 mb-6 leading-relaxed max-w-3xl">
                {district.description}
              </p>

              {/* Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-sm">
                  <Clock className="w-5 h-5 text-[#ffb703] flex-shrink-0" />
                  <div>
                    <div className="text-xs text-slate-300">Ortalama Varış</div>
                    <div className="font-bold text-white text-sm">{district.averageArrivalTime}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-sm">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-slate-300">Güvence</div>
                    <div className="font-bold text-white text-sm">TSE & Yetki Belgeli</div>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-sm col-span-2 sm:col-span-1">
                  <Zap className="w-5 h-5 text-[#ffb703] flex-shrink-0" />
                  <div>
                    <div className="text-xs text-slate-300">Hizmet Saati</div>
                    <div className="font-bold text-white text-sm">7 Gün 24 Saat Kesintisiz</div>
                  </div>
                </div>
              </div>

              {/* Fast Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`tel:${phoneClean}`}
                  className="inline-flex items-center justify-center gap-3 px-6 py-4 bg-[#ffb703] hover:bg-[#e0a100] text-[#0b2e59] font-extrabold rounded-xl shadow-lg shadow-[#ffb703]/20 transition-all hover:scale-[1.02] text-base"
                >
                  <PhoneCall className="w-5 h-5" />
                  <span>HEMEN ARA: {phoneDisplay}</span>
                </a>
                <a
                  href={`https://wa.me/905300695393?text=${whatsAppText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-6 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-xl shadow-lg shadow-emerald-900/20 transition-all hover:scale-[1.02] text-base"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>WhatsApp ile Konum Gönder</span>
                </a>
              </div>
            </div>

            {/* Quick Emergency Card */}
            <div className="lg:col-span-4 bg-white text-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-100">
              <div className="flex items-center gap-2 text-rose-600 font-bold text-sm mb-3">
                <AlertTriangle className="w-4 h-4 animate-bounce" />
                <span>Acil Elektrik Arızası mı Var?</span>
              </div>
              <h3 className="text-xl font-extrabold text-[#0b2e59] mb-3">
                {district.name} Hızlı Müdahale
              </h3>
              <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                Sigortanız mı attı, koku mu geliyor? Can ve yangın güvenliğiniz için elektrik panosuna çıplak elle müdahale etmeyin. Mobil ekibimiz {district.name} lokasyonuna yola çıksın.
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 mb-4 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span>Bölge Durumu:</span>
                  <span className="font-bold text-emerald-600 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Nöbetçi Ekip Aktif
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span>Müdahale Süresi:</span>
                  <span className="font-bold text-[#0b2e59]">{district.averageArrivalTime}</span>
                </div>
              </div>

              <a
                href={`tel:${phoneClean}`}
                className="w-full py-3.5 bg-[#0b2e59] hover:bg-[#133e73] text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors text-sm"
              >
                <PhoneCall className="w-4 h-4 text-[#ffb703]" />
                Nöbetçi Ustayı Çağır
              </a>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left 8 cols: Detailed Service & Neighborhoods */}
            <div className="lg:col-span-8 space-y-10">
              {/* Common Issues in District */}
              <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm">
                <h2 className="text-2xl font-extrabold text-[#0b2e59] mb-4 flex items-center gap-2">
                  <Zap className="w-6 h-6 text-[#ffb703]" />
                  {district.name} Bölgesinde En Sık Karşılaşılan Arızalar
                </h2>
                <p className="text-slate-600 text-sm mb-6">
                  {district.name} yapılaşma tipi ve konut özellikleri dikkate alınarak nöbetçi servis araçlarımızda tam donanımlı yedek parça ve test cihazları hazır bulundurulmaktadır.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {district.commonIssues.map((issue, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-100 rounded-xl">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm font-semibold text-slate-800">{issue}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Neighborhoods List */}
              <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                  <h2 className="text-2xl font-extrabold text-[#0b2e59] flex items-center gap-2">
                    <MapPin className="w-6 h-6 text-[#ffb703]" />
                    {district.name} Hizmet Verdiğimiz Mahalleler
                  </h2>
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                    {district.neighborhoods.length} Mahalle Kapsamı
                  </span>
                </div>
                <p className="text-slate-600 text-sm mb-6">
                  {district.name} sınırları içerisindeki tüm mahalle ve sokaklara gezici mobil servis ekiplerimiz en geç {district.averageArrivalTime} içinde ulaşmaktadır.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {district.neighborhoods.map((nh, idx) => (
                    <div 
                      key={idx}
                      className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-xs font-semibold text-slate-700 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ffb703]"></span>
                      {nh} Mahallesi
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ Section */}
              <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm">
                <h2 className="text-2xl font-extrabold text-[#0b2e59] mb-6">
                  {district.name} Elektrikçi Hakkında Sıkça Sorulan Sorular
                </h2>
                
                <div className="space-y-4">
                  <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
                    <h3 className="font-bold text-[#0b2e59] text-base mb-2">
                      {district.name} bölgesinde servis ücreti nasıl belirlenir?
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Arıza tespiti ve müdahale öncesinde usta adresinize gelerek sorunu inceler, malzeme ve işçilik bedelini şeffaf şekilde size iletir. Onayınız olmadan hiçbir işlem yapılmaz, sürpriz ek ücret çıkarılmaz.
                    </p>
                  </div>

                  <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
                    <h3 className="font-bold text-[#0b2e59] text-base mb-2">
                      Gece saatlerinde aradığımda ustanız geliyor mu?
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Evet. {district.name} nöbetçi elektrikçi ekibimiz 24 saat aktif vardiya sistemiyle çalışır. Gece 02:00 veya sabah 05:00 fark etmeksizin acil çağrılara hemen cevap verilerek usta yönlendirilir.
                    </p>
                  </div>

                  <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
                    <h3 className="font-bold text-[#0b2e59] text-base mb-2">
                      İnternet arızası veya kablo çekimi yapıyor musunuz?
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Evet, CAT6 data kablosu çekimi, modem ve priz bağlantıları, fiber optik sonlandırma ve internet kopma arızaları ekibimizin uzmanlık alanıdır.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 4 cols: Sticky Contact Card & Nearby Districts */}
            <div className="lg:col-span-4 space-y-6">
              {/* Direct Call Card */}
              <div className="bg-[#0b2e59] text-white p-6 rounded-2xl shadow-xl sticky top-28">
                <div className="text-xs uppercase tracking-wider text-[#ffb703] font-bold mb-2">
                  Acil Nöbetçi Hattı
                </div>
                <h3 className="text-2xl font-extrabold mb-3">
                  {district.name} Nöbetçi Servis
                </h3>
                <p className="text-slate-200 text-sm mb-6 leading-relaxed">
                  Gecikmeden ekibimize ulaşın, adresinizi paylaşın ve nöbetçi aracımız kapınıza gelsin.
                </p>

                <a
                  href={`tel:${phoneClean}`}
                  className="w-full py-4 bg-[#ffb703] hover:bg-[#e0a100] text-[#0b2e59] font-black rounded-xl flex items-center justify-center gap-2 mb-3 shadow-lg transition-all"
                >
                  <PhoneCall className="w-5 h-5" />
                  {phoneDisplay}
                </a>

                <a
                  href={`https://wa.me/905300695393?text=${whatsAppText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp'tan Konum Gönder
                </a>

                <hr className="my-6 border-white/10" />

                <div className="space-y-3 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#ffb703]" />
                    <span>20-30 Dk Ortalama Servis Süresi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#ffb703]" />
                    <span>TSE Onaylı Orijinal Malzemeler</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#ffb703]" />
                    <span>Faturalı ve Garantili İşçilik</span>
                  </div>
                </div>

                {/* Neighboring Districts */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <h4 className="text-sm font-bold text-white mb-3">
                    Yakındaki Hizmet Bölgeleri
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {nearbyDistricts.map(nd => (
                      <Link
                        key={nd.slug}
                        to={`/hizmet-bolgeleri/${nd.slug}`}
                        className="text-xs px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-[#ffb703] hover:text-[#0b2e59] transition-colors text-slate-200"
                      >
                        {nd.name} Elektrikçi
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
      <MobileCallBar />
    </div>
  );
}

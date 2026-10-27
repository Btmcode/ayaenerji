import React, { useState } from "react";
import { BookOpen, CheckCircle, Info, Target, Users, Map, FileText, ChevronDown, ChevronRight, Zap } from "lucide-react";

export default function GuideTab() {
  const [openSection, setOpenSection] = useState<string | null>("crm");

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 overflow-y-auto w-full">
      <div className="flex items-start lg:items-center justify-between flex-col lg:flex-row gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-[#0b2e59]/10 rounded-2xl text-[#0b2e59]">
            <BookOpen className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-[#0b2e59]">Sistem Rehberi ve Kullanım Kılavuzu</h2>
            <p className="text-slate-500 font-medium mt-1">Admin Panelinin tüm modülleri, etkili kullanım ipuçları ve iş akışı optimizasyonu.</p>
          </div>
        </div>
        <div className="bg-green-50 text-green-700 font-bold px-4 py-2 border border-green-200 rounded-lg text-sm flex items-center gap-2">
          <Zap className="w-4 h-4" /> V2.0 Aktif (Canlı Veritabanı)
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2"><Target className="w-5 h-5 text-blue-600" /> Amacımız Nedir?</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Bu panelin temel amacı, gelen tüm potansiyel müşteri çağrılarını anında yakalamak, onlara hızlı bir teklif sunmak ve süreci 'İş Tamamlandı' aşamasına kadar %100 verimle takip etmektir. Hiçbir müşterinin gözden kaçmadığı bir sistem hedeflenmektedir.
          </p>
        </div>
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2"><Users className="w-5 h-5 text-amber-600" /> Nasıl Çalışmalısınız?</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Her gün panelinizi kontrol edin. Yeni gelen çağrıları CRM (Potansiyel Müşteri) panosuna aktarın. CRM panosu şirketinizin nabzıdır. Biten işleri ise Müşteriler listesinde arşivleyerek tekrar pazarlama için saklayın.
          </p>
        </div>
      </div>

      <h3 className="text-lg font-black text-slate-800 mb-4 border-b border-slate-100 pb-2">Modül Kullanım Detayları</h3>

      <div className="space-y-4">
        <GuideAccordion 
          id="crm"
          title="1. Müşteri Yönetimi (Arama Kayıtları & CRM & Müşteriler)" 
          icon={<Users className="w-5 h-5 text-[#0b2e59]" />}
          isOpen={openSection === "crm"}
          onToggle={() => toggleSection("crm")}
        >
          <div className="space-y-4 text-sm text-slate-600">
            <p><strong>Etkili Kullanım Senaryosu:</strong></p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Arama Kayıtları:</strong> Müşteri sizi aradığında sistem çağrıyı "Arama Kayıtları" bölümüne düşürür. İlk olarak buradan çağrının durumunu (Cevaplandı/Cevapsız) kontrol edin.</li>
              <li><strong>CRM (Potansiyel) Panosu:</strong> Aramaya yanıt verdiğinizde ve müşteri fiyat ya da hizmet teklifi istediğinde, hemen <b>"Yeni Talep"</b> butonu ile müşteriyi CRM panosuna kaydedin.
                <ul className="list-circle pl-5 mt-1 space-y-1 text-slate-500">
                  <li>Müşteriye dönüş yapınca kartı <i>"Müşteri Arandı"</i> kolonuna alın.</li>
                  <li>Fiyat verilip anlaşılınca <i>"Teklif Verildi"</i> (veya İş Onaylandı) kolonuna alın.</li>
                  <li>Personel (usta) işi bitirdiğinde <i>"İş Tamamlandı"</i> kolonuna aktarın.</li>
                </ul>
              </li>
              <li><strong>Müşteriler:</strong> İş tamamen bitip ödeme alındıktan sonra bu müşteriyi kalıcı olarak "Müşteriler" listesine ekleyin. Böylece ileride yıllık bakım veya yeni arızalarda geçmiş detaylarını hızlıca bulabilirsiniz.</li>
            </ul>
          </div>
        </GuideAccordion>

        <GuideAccordion 
          id="marketing"
          title="2. Pazarlama (Blog Yönetimi & AI İçerik Asistanı & SEO)" 
          icon={<FileText className="w-5 h-5 text-[#0b2e59]" />}
          isOpen={openSection === "marketing"}
          onToggle={() => toggleSection("marketing")}
        >
          <div className="space-y-4 text-sm text-slate-600">
            <p><strong>Web sitenizin Google'da yükselmesi için gereken en önemli adım içerik üretimidir.</strong></p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>AI İçerik Asistanı:</strong> Google aramalarında üst sıralara çıkmak için (Örn: "Kağıthane Acil Elektrikçi") yapay zeka aracımızı kullanın. Hizmet türünü seçin ve anahtar kelimenizi girin. Sistem otomatik olarak SEO uyumlu, hiyerarşik (H1, H2, H3 etiketleri) bir makale oluşturacaktır.</li>
              <li><strong>Bloga Kaydetme:</strong> Yapay zekanın yazdığı makaleyi tek tıkla "Blog'a Kaydet" diyerek taslak halinde Blog Yönetimi sayfasına atabilirsiniz.</li>
              <li><strong>Blog Yönetimi:</strong> Kaydettiğiniz taslakları yayınlamak veya yeni haberler/duyurular eklemek için bu modülü kullanın.</li>
              <li><strong>SEO Performansı:</strong> Web sitenize dışarıdan gelen aylık organik trafiği ve tıklama oranlarını (CTR) izleyin. En çok hangi hizmetlerden ziyaretçi geldiğini tespit edip o yönde blog yazıları üretin.</li>
            </ul>
          </div>
        </GuideAccordion>

        <GuideAccordion 
          id="analytics"
          title="3. Analizler (Çağrı Analizi & Finansal Takip & Usta Puanları)" 
          icon={<Map className="w-5 h-5 text-[#0b2e59]" />}
          isOpen={openSection === "analytics"}
          onToggle={() => toggleSection("analytics")}
        >
           <div className="space-y-4 text-sm text-slate-600">
            <p><strong>İşinizin finansal verimliliğini ve operasyonel hızını analiz edin.</strong></p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Çağrı Analizi:</strong> Hangi bölgeden (Örn: Şişli, Beşiktaş) günün hangi saatlerinde çağrı geldiğini gösterir. Bu veriyi kullanarak akşam/gece nöbetine bırakacağınız usta sayısını optimize edebilirsiniz.</li>
              <li><strong>Finansal Takip:</strong> Aylık bazda yapılan ciro (Gelir) ve harcamaları (Maliyet) göstererek net kâr marjınızı hesaplar. Büyüme hedeflerinizi buna göre şekillendirin.</li>
              <li><strong>Usta Puanları:</strong> Sahaya giden personelin (ustaların) tamamladığı iş sayısı ve müşteriden alınan memnuniyet puanları (Örn: 4.8/5.0). Performansı düşük ustalar için önlem alabilirsiniz.</li>
              <li><strong>Rakip İzleme:</strong> Google sıralamalarında rakiplerinizin konumlarını ve arama hacimlerini kıyaslar.</li>
            </ul>
          </div>
        </GuideAccordion>
        <GuideAccordion 
          id="changelog"
          title="Sistem Güncellemeleri (Changelog)" 
          icon={<Zap className="w-5 h-5 text-[#0b2e59]" />}
          isOpen={openSection === "changelog"}
          onToggle={() => toggleSection("changelog")}
        >
           <div className="space-y-4 text-sm text-slate-600">
            <p><strong>Son Güncellemeler ve Yenilikler:</strong></p>
            <div className="space-y-3">
              <div className="p-3 border border-slate-100 rounded-lg bg-slate-50">
                <span className="text-xs font-bold bg-[#ffb703] text-[#0b2e59] px-2 py-0.5 rounded mr-2">V2.2 - Yeni</span>
                <span className="font-semibold text-slate-800">Sıfır Maliyet Altyapısı & Akıllı Modüller</span>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-xs">
                  <li><strong>Sıfır Maliyet & API Değişimi:</strong> Mimari, gelecekte ücretli olabilecek servislere alternatif olarak tamamen ücretsiz açık kaynak (Groq/HuggingFace vb.) sağlayıcıların eklenebileceği esnek bir altyapıya göre ayarlandı.</li>
                  <li><strong>Sesli Bildirimler (Voice TTS):</strong> Kanban CRM ekranına entegre edilen "Text-to-Speech" modülü sayesinde, sisteme yeni bir müşteri talebi geldiğinde adminlere Türkçe sesli bildirim uyarısı yapılmaya başlandı.</li>
                  <li><strong>Lead Gen (Akıllı Müşteri Analizi):</strong> CRM panosuna "Yapay Zeka Analiz Ediyor..." özelliği eklendi. Sisteme giren her yeni talebin zorluk derecesi, tahmini süresi ve karlılık skoru (Cazibe puanı) arka planda yapay zeka tarafından otomatik belirleniyor.</li>
                  <li><strong>Akıllı Görsel & İçerik Uyum Sistemi:</strong> AI İçerik Asistanı tarafından üretilen makalelerin bağlamına %100 uyumlu, İngilizce SEO ve resim promptları yaratıp eş zamanlı olarak otomatik arka planda Görsel Üretimi modülünü tetikleme özelliği geliştirildi.</li>
                  <li><strong>Deploy Aracı:</strong> Sistem paneline Vercel / Netlify / GitHub webhooklarını barındıran basit ve etkili bir deployment aracı eklendi.</li>
                </ul>
              </div>
              <div className="p-3 border border-slate-100 rounded-lg bg-slate-50">
                <span className="text-xs font-bold bg-[#0b2e59] text-white px-2 py-0.5 rounded mr-2">V2.1</span>
                <span className="font-semibold text-slate-800">Tamamlanan Modüller & Entegrasyonlar</span>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-xs">
                  <li><strong>Görsel Üretimi:</strong> Pazarlama menüsüne Imagen 3 tabanlı Görsel Üretimi sekmesi eklendi. Blog ve sosyal medya için otomatik afiş üretimi aktif.</li>
                  <li><strong>AI İçerik Asistanı:</strong> Google Trends API bağlantısı kuruldu. Gerçek zamanlı arama trendlerine göre anahtar kelime önerileri sağlandı.</li>
                  <li><strong>Potansiyel Müşteri (CRM):</strong> Kanban panosuna "Yeni Talep" modalı eklendi. Sürükle bırak mantığındaki hatalar giderildi, renk kodlu tasarım geliştirildi.</li>
                  <li><strong>Blog Yönetimi:</strong> Eksik olan yeni yazı ekleme modalı tamamlandı ve veritabanı bağlantısı kuruldu.</li>
                  <li><strong>Ayarlar:</strong> Sistem ayarları güncellenebilir hale getirildi (Firma adı, e-posta değişikliği ve şifre modülleri aktif edildi).</li>
                </ul>
              </div>
            </div>
          </div>
        </GuideAccordion>
      </div>

      <div className="mt-8 p-5 bg-[#0b2e59]/5 border border-[#0b2e59]/10 rounded-xl flex gap-4">
        <Info className="w-6 h-6 shrink-0 text-[#0b2e59]" />
        <p className="text-sm text-slate-700">
          <strong>Önemli Sistem Notu:</strong> Firebase veritabanı (Firestore) aktiftir. Yapılan tüm eklemeler, güncellemeler ve silme işlemleri doğrudan canlı veritabanında gerçekleştirilir ve diğer yetkili panelleriyle eşzamanlı çalışır. Form submit işlemleri gecikmeli olarak analizlere yansıyabilir. Yardım ve destek için sistem yöneticinizle iletişime geçebilirsiniz.
        </p>
      </div>
    </div>
  );
}

function GuideAccordion({ 
  id, 
  title, 
  icon, 
  isOpen, 
  onToggle, 
  children 
}: { 
  id: string, 
  title: string, 
  icon: React.ReactNode, 
  isOpen: boolean, 
  onToggle: () => void, 
  children: React.ReactNode 
}) {
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white hover:border-[#0b2e59]/30 transition-colors">
      <button 
        onClick={onToggle}
        className={`w-full flex items-center justify-between p-4 ${isOpen ? 'bg-slate-50 border-b border-slate-100' : ''}`}
      >
        <h4 className="font-bold text-slate-800 flex items-center gap-3">
          {icon} {title}
        </h4>
        {isOpen ? <ChevronDown className="w-5 h-5 text-slate-400" /> : <ChevronRight className="w-5 h-5 text-slate-400" />}
      </button>
      {isOpen && (
        <div className="p-5 bg-white animate-fade-in">
          {children}
        </div>
      )}
    </div>
  );
}


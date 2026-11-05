import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqData = [
  {
    question: "Fiyatlandırma ve arıza keşif politikanız nasıl çalışıyor?",
    answer: "Elektrik arızalarında görmeden sabit fiyat vermek doğru değildir. Arızanın kaynağına ve gerekli şalt malzemenin niteliğine göre yerinde şeffaf ön tespit yapıyoruz; yapılacak işlem ve parça bedeli müşterimize onaylatılmadan hiçbir işlem başlatılmaz."
  },
  {
    question: "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
    answer: "Müşterilerimize kolaylık sağlamak adına nakit, anında havale/EFT (FAST) ve mobil pos ile kredi kartı kabul etmekteyiz. Kurumsal işletmeler, siteler ve ticari firmalar için kurumsal faturalı işlem yapılmaktadır."
  },
  {
    question: "Kullanılan malzemelerin ve yapılan işçiliğin garanti süresi nedir?",
    answer: "Kullandığımız tüm şalt malzemeler (Siemens, Schneider, Hes) üretici firma garantisi altındadır. İşçiliğimizden kaynaklanabilecek olası her duruma karşı ise ücretsiz geri dönüşümlü 1 yıl koşulsuz servis garantisi veriyoruz."
  },
  {
    question: "Arıza kaydı oluşturduktan ne kadar süre sonra adrese ulaşırsınız?",
    answer: "İstanbul'un 39 ilçesinde nöbet tutan motorize ve gezici mobil servis ekiplerimiz sayesinde, trafik yoğunluğuna bağlı olarak ortalama 15–30 dakika içinde belirttiğiniz adrese ulaşıyoruz."
  },
  {
    question: "Elektrikli araç (Wallbox) ve bina pano revizyonu yapıyor musunuz?",
    answer: "Evet, Aya Elektrik sadece basit acil arızaları değil; Togg, Tesla gibi araçlar için bağımsız Wallbox şarj hattı çekimi, Tip B kaçak akım panoları, bina ana dağıtım panoları ve jeneratör transfer sistemleri gibi taahhüt projelerini de üstlenmektedir."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="text-xs font-mono font-bold tracking-widest text-amber-600 uppercase mb-2">
            MERAK EDİLENLER
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#071d36] tracking-tight">
            Sıkça Sorulan Sorular
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Hizmet süreçlerimiz, fiyatlandırma ilkelerimiz ve teknik garantilerimiz hakkında detaylı bilgiler.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-3">
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`bg-slate-50 border rounded-xl overflow-hidden transition-all ${
                  isOpen ? 'border-[#071d36] bg-white shadow-xs' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <button
                  aria-expanded={isOpen}
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left outline-none"
                >
                  <span className={`font-bold text-sm sm:text-base pr-4 ${isOpen ? 'text-[#071d36]' : 'text-slate-800'}`}>
                    {faq.question}
                  </span>
                  <div className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                    isOpen ? 'bg-[#071d36] text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>
                
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

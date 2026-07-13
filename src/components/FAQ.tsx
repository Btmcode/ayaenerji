import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqData = [
  {
    question: "Fiyatlandırma politikanız nasıl çalışıyor?",
    answer: "Elektrik arızalarında sabit fiyat vermek doğru değildir. Arıza tespitine ve yapılacak işin zorluğuna göre yerinde ücretsiz keşif yaparak standart, şeffaf ve sürpriz içermeyen fiyatlandırma sunuyoruz."
  },
  {
    question: "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
    answer: "Müşterilerimize kolaylık sağlamak adına nakit, anında havale/EFT ve kredi kartı ile ödeme kabul etmekteyiz. Kurumsal çözümler için faturalı işlem yapılmaktadır."
  },
  {
    question: "Yaptığınız işin ve malzemelerin garanti süresi nedir?",
    answer: "Kullandığımız (TSE onaylı) tüm yedek parçalar üretici firma garantisi altındadır. Kendi işçiliğimizden kaynaklanabilecek her türlü duruma karşı ise tamamen ücretsiz geri dönüşümü kapsayan koşulsuz 1 yıl işçilik garantisi veriyoruz."
  },
  {
    question: "Arıza kaydı oluşturduktan ne kadar süre sonra ulaşırsınız?",
    answer: "Avrupa Yakası genelinde dolaşan acil destek mobil servis araçlarımız sayesinde, arıza kaydınızın ardından trafik yoğunluğuna bağlı olarak ortalama 30-45 dakika içinde belirttiğiniz adrese ulaşıyoruz."
  },
  {
    question: "Büyük çaplı sistem odası veya akıllı ev projesi yapıyor musunuz?",
    answer: "Evet, Aya Elektrik sadece arıza servisi değil, aynı zamanda A'dan Z'ye taahhüt, yapısal kablolama, akıllı ev otomasyonu ve UPS/jeneratör transfer panosu kurulumu gibi mühendislik gerektiren projeleri de üstlenmektedir."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 md:py-28 px-6 bg-[#f8f9fa] border-t border-slate-100">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0b2e59] mb-4">Sıkça Sorulan Sorular</h2>
          <div className="w-20 h-1.5 bg-[#ffb703] rounded-full mx-auto"></div>
          <p className="mt-6 text-lg text-slate-600">
            Hizmetlerimiz, fiyatlandırma ve garantilerimiz hakkında aklınıza takılan soruların yanıtları.
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen ? 'border-[#0b2e59] shadow-md' : 'border-slate-200 hover:border-[#ffb703]'
                }`}
              >
                <button aria-expanded={isOpen} aria-controls={`faq-answer-${index}`}
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left outline-none"
                >
                  <span className={`font-bold text-lg ${isOpen ? 'text-[#0b2e59]' : 'text-slate-700'}`}>
                    {faq.question}
                  </span>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    isOpen ? 'bg-[#ffb703] text-[#0b2e59]' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-5 md:px-6 text-slate-600 leading-relaxed border-t border-slate-100 pt-4 mt-2 mx-6">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

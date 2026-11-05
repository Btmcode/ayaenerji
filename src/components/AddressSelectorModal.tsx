import React, { useState, useEffect } from "react";
import {
  X,
  MapPin,
  Hash,
  Home,
  ArrowRight,
  ArrowLeft,
  Search,
  CheckCircle2,
} from "lucide-react";

interface AddressSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAddress: (fullAddress: string) => void;
  initialAddress?: string;
}

// Popular European side districts & their neighborhoods + streets for realistic selector
const districtsData: Record<
  string,
  { neighborhoods: string[]; streets: string[] }
> = {
  Arnavutköy: {
    neighborhoods: [
      "Merkez Mahallesi",
      "Hadımköy",
      "Boğazköy",
      "Bolluca",
      "Taşoluk",
      "İmrahor",
      "Haraççı",
    ],
    streets: [
      "Atatürk Caddesi",
      "Fatih Caddesi",
      "Egemenlik Caddesi",
      "Yıldırım Beyazıt Caddesi",
      "Ayasofya Caddesi",
    ],
  },
  Avcılar: {
    neighborhoods: [
      "Merkez Mahallesi",
      "Ambarlı",
      "Cihangir",
      "Gümüşpala",
      "Denizköşkler",
      "Mustafa Kemalpaşa",
      "Tahtakale",
      "Yeşilkent",
    ],
    streets: [
      "Reşitpaşa Caddesi",
      "Marmara Caddesi",
      "E-5 Yan Yol",
      "Fevzi Çakmak Caddesi",
      "Namık Kemal Caddesi",
    ],
  },
  Bağcılar: {
    neighborhoods: [
      "Güneşli",
      "Kirazlı",
      "Hürriyet",
      "Demirkapı",
      "Yüzyıl",
      "Fatih Mahallesi",
      "Göztepe",
      "Yavuz Selim",
    ],
    streets: [
      "Menderes Caddesi",
      "Bağcılar Caddesi",
      "Halkalı Caddesi",
      "Fevzi Çakmak Caddesi",
      "Evren Caddesi",
    ],
  },
  Bahçelievler: {
    neighborhoods: [
      "Şirinevler",
      "Yenibosna",
      "Yayla",
      "Soğanlı",
      "Kocasinan",
      "Fevzi Çakmak",
      "Cumhuriyet",
      "Zafer",
    ],
    streets: [
      "Adnan Menderes Caddesi",
      "Talalatpaşa Bulvarı",
      "Kıbrıs Caddesi",
      "Yıldırım Beyazıt Caddesi",
      "Mustafa Kemal Paşa Caddesi",
    ],
  },
  Bakırköy: {
    neighborhoods: [
      "Ataköy 1. Kısım",
      "Ataköy 7-8-9-10. Kısım",
      "Yeşilköy",
      "Florya",
      "Zuhuratbaba",
      "Kartaltepe",
      "Yenimahalle",
      "Şenlikköy",
    ],
    streets: [
      "İstasyon Caddesi",
      "İncirli Caddesi",
      "Fermeneciler Caddesi",
      "Halit Ziya Uşaklıgil Caddesi",
      "Yeşilköy Caddesi",
    ],
  },
  Başakşehir: {
    neighborhoods: [
      "Bahçeşehir 1. Kısım",
      "Bahçeşehir 2. Kısım",
      "Kayaşehir",
      "Altınşehir",
      "Güvercintepe",
      "Ziya Gökalp",
      "Şahintepe",
    ],
    streets: [
      "Olimpiyat Bulvarı",
      "İstiklal Caddesi",
      "Atatürk Bulvarı",
      "Süleyman Demirel Bulvarı",
      "Hürriyet Caddesi",
    ],
  },
  Bayrampaşa: {
    neighborhoods: [
      "Yenidoğan",
      "Kocatepe",
      "Altıntepsi",
      "Muratpaşa",
      "Yıldırım",
      "Kartaltepe",
      "Cevatpaşa",
    ],
    streets: [
      "Abdi İpekçi Caddesi",
      "Uygur Caddesi",
      "İstanbul Caddesi",
      "Kenan Evren Caddesi",
      "Demirkapı Caddesi",
    ],
  },
  Beşiktaş: {
    neighborhoods: [
      "Bebek",
      "Ortaköy",
      "Arnavutköy Mh.",
      "Etiler",
      "Levazım",
      "Levent",
      "Ulus",
      "Dikilitaş",
      "Abbasağa",
      "Yıldız",
    ],
    streets: [
      "Barbaros Bulvarı",
      "Nispetiye Caddesi",
      "Şair Nedim Caddesi",
      "Büyükdere Caddesi",
      "Çırağan Caddesi",
    ],
  },
  Beylikdüzü: {
    neighborhoods: [
      "Adnan Kahveci",
      "Barış Mahallesi",
      "Cumhuriyet Mh.",
      "Gürpınar",
      "Kavaklı",
      "Yakuplu",
      "Marmara",
      "Dereağzı",
    ],
    streets: [
      "Yavuz Sultan Selim Bulvarı",
      "Anadolu Caddesi",
      "Atatürk Bulvarı",
      "E-5 Karayolu",
      "Hürriyet Bulvarı",
    ],
  },
  Beyoğlu: {
    neighborhoods: [
      "Cihangir",
      "Gümüşsuyu",
      "Karaköy",
      "Sütlüce",
      "Hasköy",
      "Kasımpaşa",
      "İstiklal",
      "Tarlabaşı",
      "Tomtom",
    ],
    streets: [
      "İstiklal Caddesi",
      "Sıraselviler Caddesi",
      "Meclis-i Mebusan Caddesi",
      "Voyvoda Caddesi",
      "Yeni Çarşı Caddesi",
    ],
  },
  Büyükçekmece: {
    neighborhoods: [
      "Mimaroba",
      "Sinanoba",
      "Celaliye",
      "Kumburgaz",
      "Alkent 2000",
      "Fatih Mh.",
      "Ekinoba",
      "Karaağaç",
    ],
    streets: [
      "Mustafa Kemal Bulvarı",
      "Londra Asfaltı Caddesi",
      "Atatürk Alışveriş Caddesi",
      "Sahil Yolu",
    ],
  },
  Çatalca: {
    neighborhoods: [
      "Kale İçi",
      "Ferhatpaşa",
      "Kaleiçi",
      "Subaşı",
      "Binkılıç",
      "Karacaköy",
      "İnceğiz",
    ],
    streets: [
      "Atatürk Caddesi",
      "Cevat Rüzgâr Caddesi",
      "İstanbul Caddesi",
      "Yalı Caddesi",
    ],
  },
  Esenler: {
    neighborhoods: [
      "Menderes",
      "Birlik",
      "Oruçreis",
      "Tuna",
      "Fatih Mh.",
      "Havaalanı",
      "Nene Hatun",
      "Kemer",
    ],
    streets: [
      "Atışalanı Caddesi",
      "Davutpaşa Caddesi",
      "Karaosmanoğlu Caddesi",
      "Ulubatlı Hasan Caddesi",
    ],
  },
  Esenyurt: {
    neighborhoods: [
      "Mehterçeşme",
      "Yeşilkent",
      "Bağlarçeşme",
      "Güzelyurt",
      "Piri Reis",
      "Safa",
      "Cumhuriyet Mh.",
      "Akçaburgaz",
    ],
    streets: [
      "Doğan Araslı Bulvarı",
      "Fatih Sultan Mehmet Caddesi",
      "Cumhuriyet Caddesi",
      "Hadımköy Yolu",
    ],
  },
  Eyüpsultan: {
    neighborhoods: [
      "Göktürk",
      "Alibeyköy",
      "Kemerburgaz",
      "Emniyettepe",
      "Silahtarağa",
      "Yeşilpınar",
      "Rami Cuma",
    ],
    streets: [
      "Kemerburgaz Caddesi",
      "Silahtarağa Caddesi",
      "İstanbul Caddesi",
      "Atatürk Caddesi",
    ],
  },
  Fatih: {
    neighborhoods: [
      "Aksaray",
      "Balat",
      "Fener",
      "Eminönü",
      "Kocamustafapaşa",
      "Sultanahmet",
      "Cerrahpaşa",
      "Karagümrük",
      "Haseki",
    ],
    streets: [
      "Vatan Caddesi",
      "Millet Caddesi",
      "Atatürk Bulvarı",
      "Fevzipaşa Caddesi",
      "Ordu Caddesi",
    ],
  },
  Gaziosmanpaşa: {
    neighborhoods: [
      "Karadeniz",
      "Bağlarbaşı",
      "Barbaros Hayrettinpaşa",
      "Yıldıztabya",
      "Küçükköy",
      "Hürriyet Mh.",
      "Karlıtepe",
    ],
    streets: [
      "Cengiz Topel Caddesi",
      "Küçükköy Yolu",
      "Ordu Caddesi",
      "Atatürk Caddesi",
    ],
  },
  Güngören: {
    neighborhoods: [
      "Merter",
      "Haznedar",
      "Tozkoparan",
      "Güneştepe",
      "Akıncılar",
      "Mareşal Çakmak",
      "Sanayi",
    ],
    streets: [
      "Abdi İpekçi Caddesi",
      "Postane Caddesi",
      "Kınalı Caddesi",
      "Eski Londra Asfaltı",
    ],
  },
  Kağıthane: {
    neighborhoods: [
      "Gültepe",
      "Çeliktepe",
      "Seyrantepe",
      "Hamidiye",
      "Talâtpaşa",
      "Sanayi Mahallesi",
      "Nurtepe",
      "Şirintepe",
    ],
    streets: [
      "Cendere Caddesi",
      "Talâtpaşa Caddesi",
      "Gümüşhane Caddesi",
      "Büyükdere Caddesi",
    ],
  },
  Küçükçekmece: {
    neighborhoods: [
      "Halkalı",
      "Sefaköy",
      "Atakent",
      "Cennet",
      "Kanarya",
      "İnönü",
      "Fevzi Çakmak",
      "Yeşilova",
    ],
    streets: [
      "Halkalı Caddesi",
      "Fevzi Çakmak Caddesi",
      "Reyhan Caddesi",
      "İstasyon Caddesi",
    ],
  },
  Sarıyer: {
    neighborhoods: [
      "Tarabya",
      "İstinye",
      "Yeniköy",
      "Maslak",
      "Zekeriyaköy",
      "Emirgan",
      "Baltalimanı",
      "Bahçeköy",
      "Kireçburnu",
    ],
    streets: [
      "Katar Caddesi",
      "Büyükdere Caddesi",
      "Dereboyu Caddesi",
      "Sarıyer Dereiçi Caddesi",
    ],
  },
  Silivri: {
    neighborhoods: [
      "Mimarsinan",
      "Alibey",
      "Gümüşyaka",
      "Selimpaşa",
      "Ortaköy Mh.",
      "Fatih Mh.",
      "Piri Mehmet Paşa",
    ],
    streets: [
      "Turgut Özal Bulvarı",
      "Halim Uluşahin Caddesi",
      "General Ali İhsan Türkkan Caddesi",
    ],
  },
  Sultangazi: {
    neighborhoods: [
      "50. Yıl",
      "75. Yıl",
      "Esentepe",
      "Cebeci",
      "Sultançiftliği",
      "Uğur Mumcu",
      "Yunus Emre",
    ],
    streets: [
      "Lütfi Aykaç Bulvarı",
      "Eski Edirne Asfaltı",
      "Atatürk Bulvarı",
      "Cebeci Caddesi",
    ],
  },
  Şişli: {
    neighborhoods: [
      "Nişantaşı",
      "Teşvikiye",
      "Mecidiyeköy",
      "Fulya",
      "Feriköy",
      "Kurtuluş",
      "Esentepe",
      "Kuştepe",
      "Halide Edip Adıvar",
    ],
    streets: [
      "Halaskargazi Caddesi",
      "Büyükdere Caddesi",
      "Valikonağı Caddesi",
      "Rumeli Caddesi",
      "Ortaklar Caddesi",
    ],
  },
  Zeytinburnu: {
    neighborhoods: [
      "Merkezefendi",
      "Gökalp",
      "Telsiz",
      "Beştelsiz",
      "Yeşiltepe",
      "Çırpıcı",
      "Seyitnizam",
      "Kazlıçeşme",
    ],
    streets: [
      "Mevlana Caddesi",
      "Gümüşsuyu Caddesi",
      "10. Yıl Caddesi",
      "Zeytinburnu Bulvarı",
    ],
  },
};

export default function AddressSelectorModal({
  isOpen,
  onClose,
  onSelectAddress,
  initialAddress = "",
}: AddressSelectorModalProps) {
  const [step, setStep] = useState(1);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("");
  const [customNeighborhood, setCustomNeighborhood] = useState("");
  const [selectedStreet, setSelectedStreet] = useState("");
  const [customStreet, setCustomStreet] = useState("");
  const [buildingNo, setBuildingNo] = useState("");
  const [apartmentNo, setApartmentNo] = useState("");
  const [districtSearch, setDistrictSearch] = useState("");

  useEffect(() => {
    if (isOpen) {
      // Reset state on open unless initial address parses perfectly
      setStep(1);
      setSelectedDistrict("");
      setSelectedNeighborhood("");
      setCustomNeighborhood("");
      setSelectedStreet("");
      setCustomStreet("");
      setBuildingNo("");
      setApartmentNo("");
      setDistrictSearch("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Filter districts based on search
  const filteredDistricts = Object.keys(districtsData).filter((d) =>
    d.toLowerCase().includes(districtSearch.toLowerCase()),
  );

  const handleNext = () => {
    if (step === 1 && selectedDistrict) {
      setStep(2);
    } else if (step === 2) {
      const currentNeigh = selectedNeighborhood || customNeighborhood;
      const currentStreet = selectedStreet || customStreet;
      if (currentNeigh && currentStreet) {
        setStep(3);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleComplete = () => {
    const finalNeigh = selectedNeighborhood || customNeighborhood || "";
    const finalStreet = selectedStreet || customStreet || "";
    const bNo = buildingNo ? `No: ${buildingNo}` : "";
    const aNo = apartmentNo ? `Daire: ${apartmentNo}` : "";

    const parts = [
      finalNeigh,
      finalStreet,
      bNo,
      aNo,
      `${selectedDistrict} / İstanbul`,
    ].filter((p) => p.trim() !== "");

    const fullAddress = parts.join(", ");
    onSelectAddress(fullAddress);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-100 flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-[#0b2e59] text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-xl">
              <MapPin className="w-5 h-5 text-[#ffb703]" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Kolay Adres Seçici</h3>
              <p className="text-xs text-white/70">
                İstanbul Avrupa Yakası hızlı konum bildrimi
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/10 rounded-full transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500">
          <div className="flex items-center gap-2">
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${step >= 1 ? "bg-[#0b2e59] border-[#0b2e59] text-white" : "border-slate-300 text-slate-400"}`}
            >
              1
            </span>
            <span className={step >= 1 ? "text-[#0b2e59]" : ""}>
              İlçe Seçin
            </span>
          </div>
          <div className="flex-1 h-0.5 bg-slate-200 mx-4">
            <div
              className={`h-full bg-[#0b2e59] transition-all duration-300 ${step === 2 ? "w-1/2" : step === 3 ? "w-full" : "w-0"}`}
            />
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${step >= 2 ? "bg-[#0b2e59] border-[#0b2e59] text-white" : "border-slate-300 text-slate-400"}`}
            >
              2
            </span>
            <span className={step >= 2 ? "text-[#0b2e59]" : ""}>
              Mahalle & Sokak
            </span>
          </div>
          <div className="flex-1 h-0.5 bg-slate-200 mx-4">
            <div
              className={`h-full bg-[#0b2e59] transition-all duration-300 ${step === 3 ? "w-full" : "w-0"}`}
            />
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${step >= 3 ? "bg-[#0b2e59] border-[#0b2e59] text-white" : "border-slate-300 text-slate-400"}`}
            >
              3
            </span>
            <span className={step >= 3 ? "text-[#0b2e59]" : ""}>
              Bina & Kapı
            </span>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-y-auto bg-white">
          {step === 1 && (
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="İlçe adı ile ara (Örn: Beşiktaş, Esenyurt...)"
                  value={districtSearch}
                  onChange={(e) => setDistrictSearch(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-[#0b2e59] focus:ring-4 focus:ring-[#0b2e59]/10 transition-all font-medium text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {filteredDistricts.map((d) => (
                  <button
                    key={d}
                    onClick={() => {
                      setSelectedDistrict(d);
                      setSelectedNeighborhood("");
                      setSelectedStreet("");
                      setStep(2);
                    }}
                    className={`flex items-center gap-2 p-3.5 rounded-xl border text-sm font-bold text-left transition-all ${
                      selectedDistrict === d
                        ? "bg-[#0b2e59]/5 border-[#0b2e59] text-[#0b2e59] shadow-sm"
                        : "border-slate-100 hover:border-slate-200 hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    <MapPin
                      className={`w-4 h-4 ${selectedDistrict === d ? "text-[#ffb703]" : "text-slate-400"}`}
                    />
                    {d}
                  </button>
                ))}
                {filteredDistricts.length === 0 && (
                  <div className="col-span-full py-8 text-center text-slate-400">
                    Avrupa yakasında aradığınız ilçe bulunamadı.
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Seçilen İlçe
                </span>
                <span className="bg-[#0b2e59]/10 text-[#0b2e59] font-bold px-3 py-1 rounded-full text-xs flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#ffb703]" />{" "}
                  {selectedDistrict}
                </span>
              </div>

              {/* Neighborhood Section */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-755 inline-block">
                  Mahalle Seçin veya Yazın
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {districtsData[selectedDistrict]?.neighborhoods.map(
                    (neigh) => (
                      <button
                        key={neigh}
                        onClick={() => {
                          setSelectedNeighborhood(neigh);
                          setCustomNeighborhood("");
                        }}
                        className={`px-4 py-2.5 rounded-xl border text-left text-xs font-bold transition-all ${
                          selectedNeighborhood === neigh
                            ? "bg-[#0b2e59] text-white border-[#0b2e59]"
                            : "border-slate-250 text-slate-650 hover:bg-slate-50"
                        }`}
                      >
                        {neigh}
                      </button>
                    ),
                  )}
                </div>

                <div className="pt-2">
                  <div className="text-xs text-slate-400 mb-1.5 font-semibold">
                    Mahalleniz listede yoksa kendiniz yazabilirsiniz:
                  </div>
                  <input
                    type="text"
                    placeholder="Örn: Barbaros Mahallesi"
                    value={customNeighborhood}
                    onChange={(e) => {
                      setCustomNeighborhood(e.target.value);
                      setSelectedNeighborhood("");
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0b2e59] transition-all text-slate-800"
                  />
                </div>
              </div>

              {/* Street Section */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-755 inline-block">
                  Cadde / Sokak Seçin veya Yazın
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {districtsData[selectedDistrict]?.streets.map((str) => (
                    <button
                      key={str}
                      onClick={() => {
                        setSelectedStreet(str);
                        setCustomStreet("");
                      }}
                      className={`px-4 py-2.5 rounded-xl border text-left text-xs font-bold transition-all ${
                        selectedStreet === str
                          ? "bg-[#0b2e59] text-white border-[#0b2e59]"
                          : "border-slate-250 text-slate-650 hover:bg-slate-50"
                      }`}
                    >
                      {str}
                    </button>
                  ))}
                </div>

                <div className="pt-2">
                  <div className="text-xs text-slate-400 mb-1.5 font-semibold">
                    Cadde veya sokak adı listede yoksa yazabilirsiniz:
                  </div>
                  <input
                    type="text"
                    placeholder="Örn: Akasya Sokak"
                    value={customStreet}
                    onChange={(e) => {
                      setCustomStreet(e.target.value);
                      setSelectedStreet("");
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0b2e59] transition-all text-slate-800"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2 text-sm">
                <div className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                  Özet Bilgi
                </div>
                <div className="text-slate-700 font-medium">
                  <strong>{selectedDistrict}</strong> bölgesinde,{" "}
                  <strong>{selectedNeighborhood || customNeighborhood}</strong>,{" "}
                  <strong>{selectedStreet || customStreet}</strong> seçildi.
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {/* Building Number */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <Hash className="w-4 h-4 text-[#ffb703]" /> Bina / Kapı No
                  </label>
                  <select
                    value={buildingNo}
                    onChange={(e) => setBuildingNo(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-[#0b2e59] text-sm text-slate-800 cursor-pointer"
                  >
                    <option value="">Seçiniz (İsteğe Bağlı)</option>
                    {Array.from({ length: 120 }, (_, i) => String(i + 1)).map(
                      (num) => (
                        <option key={num} value={num}>
                          Bina No: {num}
                        </option>
                      ),
                    )}
                  </select>
                  <div className="pt-1.5">
                    <input
                      type="text"
                      placeholder="Listede yoksa buraya yazın (Örn: 14/A)"
                      value={
                        buildingNo &&
                        !Array.from({ length: 120 }, (_, i) =>
                          String(i + 1),
                        ).includes(buildingNo)
                          ? buildingNo
                          : ""
                      }
                      onChange={(e) => setBuildingNo(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#0b2e59] transition-all text-slate-800"
                    />
                  </div>
                </div>

                {/* Apartment Number */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <Home className="w-4 h-4 text-[#ffb703]" /> Daire / İç Kapı
                    No
                  </label>
                  <select
                    value={apartmentNo}
                    onChange={(e) => setApartmentNo(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-[#0b2e59] text-sm text-slate-800 cursor-pointer"
                  >
                    <option value="">Seçiniz (İsteğe Bağlı)</option>
                    {Array.from({ length: 60 }, (_, i) => String(i + 1)).map(
                      (num) => (
                        <option key={num} value={num}>
                          Daire No: {num}
                        </option>
                      ),
                    )}
                  </select>
                  <div className="pt-1.5">
                    <input
                      type="text"
                      placeholder="Listede yoksa buraya yazın (Örn: Kat: 2, D: 6)"
                      value={
                        apartmentNo &&
                        !Array.from({ length: 60 }, (_, i) =>
                          String(i + 1),
                        ).includes(apartmentNo)
                          ? apartmentNo
                          : ""
                      }
                      onChange={(e) => setApartmentNo(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#0b2e59] transition-all text-slate-800"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 text-amber-800 border border-amber-100 p-4 rounded-2xl text-xs space-y-1">
                <p className="font-bold flex items-center gap-1.5 text-amber-900">
                  <CheckCircle2 className="w-4 h-4 text-[#ffb703]" /> Doğruluk
                  Kontrolü
                </p>
                <p>
                  Nöbetçi ekiplerimiz vereceğiniz bu adrese doğrudan
                  yönlendirilecektir. Girdiğiniz bilgilerin net olması size
                  ulaşma hızımızı artırır.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-t border-slate-100">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${
              step === 1
                ? "text-slate-350 cursor-not-allowed opacity-50"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <ArrowLeft className="w-4 h-4" /> Geri git
          </button>

          {step < 3 ? (
            <button
              onClick={handleNext}
              disabled={
                (step === 1 && !selectedDistrict) ||
                (step === 2 &&
                  !(selectedNeighborhood || customNeighborhood) &&
                  !(selectedStreet || customStreet))
              }
              className={`flex items-center gap-1.5 px-6 py-2.5 bg-[#0b2e59] text-white rounded-xl text-sm font-bold shadow-sm transition-all ${
                (step === 1 && !selectedDistrict) ||
                (step === 2 && !(selectedNeighborhood || customNeighborhood)) ||
                !(selectedStreet || customStreet)
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-[#082244]"
              }`}
            >
              Devam et <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleComplete}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#ffb703] text-[#0b2e59] rounded-xl text-sm font-black shadow-md hover:bg-[#e6a400] transition-all scale-100 hover:scale-[1.02]"
            >
              <CheckCircle2 className="w-4 h-4" /> Adresi Kaydet
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

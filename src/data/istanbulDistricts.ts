export interface DistrictInfo {
  slug: string;
  name: string;
  side: 'Avrupa' | 'Anadolu';
  averageArrivalTime: string;
  searchVolume: 'Çok Yüksek' | 'Yüksek' | 'Orta';
  description: string;
  neighborhoods: string[];
  commonIssues: string[];
  frequentPlaces: string[];
  phone: string;
}

export const ISTANBUL_DISTRICTS: DistrictInfo[] = [
  // Anadolu Yakası
  {
    slug: 'kadikoy',
    name: 'Kadıköy',
    side: 'Anadolu',
    averageArrivalTime: '20-25 Dakika',
    searchVolume: 'Çok Yüksek',
    description: 'Kadıköy ve tüm mahallelerinde 7/24 nöbetçi acil elektrikçi servisi. Moda, Caddebostan, Suadiye ve Fikirtepe başta olmak üzere eski ve yeni binalarda acil sigorta, pano ve tesisat arızalarına 20 dakikada müdahale ediyoruz.',
    neighborhoods: ['Moda', 'Caferağa', 'Caddebostan', 'Fenerbahçe', 'Suadiye', 'Bostancı', 'Göztepe', 'Kozyatağı', 'Acıbadem', 'Fikirtepe', 'Hasanpaşa', 'Rasimpaşa', 'Erenköy', 'Sahrayıcedit', 'Koşuyolu'],
    commonIssues: ['Eski bina sigorta panosu yanması', 'Kaçak akım rölesi sürekli atması', 'Kısa devre arıza tespiti', 'Cafe ve restoran aydınlatma arızası', 'Şofben elektrik hattı çekimi'],
    frequentPlaces: ['Bağdat Caddesi', 'Moda Sahil', 'Söğütlüçeşme', 'Kadıköy Çarşı', 'Fikirtepe Kentsel Dönüşüm Bölgesi'],
    phone: '+90 530 069 53 93'
  },
  {
    slug: 'umraniye',
    name: 'Ümraniye',
    side: 'Anadolu',
    averageArrivalTime: '20-30 Dakika',
    searchVolume: 'Çok Yüksek',
    description: 'Ümraniye genelinde 7/24 nöbetçi acil elektrik ustası. Çakmak, Yamanevler, Dudullu sanayi ve Atakent bölgelerinde konut ve işyerleri için acil müdahale ekibi.',
    neighborhoods: ['Çakmak', 'Atakent', 'Yamanevler', 'Ihlamurkuyu', 'İstiklal', 'Armağanevler', 'Tepetarla', 'Yukarı Dudullu', 'Aşağı Dudullu', 'Şerifali', 'Tatlusu', 'Madenler', 'Altınşehir'],
    commonIssues: ['Sanayi ve atölye trifaze elektrik arızası', 'Kombi ve şofben elektrik bağlantısı', 'Bina ana kofana sigortası atması', 'Priz ve anahtar hattı yenileme'],
    frequentPlaces: ['Alemdağ Caddesi', 'Dudullu Organize Sanayi', 'Canpark AVM Çevresi', 'Ümraniye Çarşı'],
    phone: '+90 530 069 53 93'
  },
  {
    slug: 'atasehir',
    name: 'Ataşehir',
    side: 'Anadolu',
    averageArrivalTime: '20-25 Dakika',
    searchVolume: 'Yüksek',
    description: 'Ataşehir ve Finans Merkezi bölgesinde rezidans, plaza ve konutlara özel 7/24 kesintisiz elektrikçi hizmeti. Akıllı ev sistemleri, pano bakımı ve acil arızalar.',
    neighborhoods: ['Batı Ataşehir', 'Barbaros', 'İçerenköy', 'Küçükbakkalköy', 'Kayışdağı', 'Ferhatpaşa', 'Atatürk Mahallesi', 'Örnek Mahallesi', 'Esatpaşa', 'Yeni Sahra'],
    commonIssues: ['Rezidans akıllı ev elektrik arızası', 'Ofis ve plaza aydınlatma kesintisi', 'UPS ve jeneratör bağlantı sorunu', 'LED ve spot arızaları'],
    frequentPlaces: ['İstanbul Finans Merkezi', 'Watergarden Çevresi', 'Brandium', 'Metropol İstanbul'],
    phone: '+90 530 069 53 93'
  },
  {
    slug: 'uskudar',
    name: 'Üsküdar',
    side: 'Anadolu',
    averageArrivalTime: '20-30 Dakika',
    searchVolume: 'Yüksek',
    description: 'Üsküdar genelinde tarihi binalar ve modern sitelerde 7/24 uzman elektrikçi hizmeti. Çamlıca, Beylerbeyi, Kuzguncuk ve Altunizade bölgelerinde hızlı mobil ekip.',
    neighborhoods: ['Altunizade', 'Acıbadem', 'Beylerbeyi', 'Çengelköy', 'Kuzguncuk', 'Bağlarbaşı', 'Kısıklı', 'Yavuztürk', 'Ünalan', 'Ferah', 'Selimiye', 'Salacak'],
    commonIssues: ['Tarihi ahşap yapı yangın koruma tesisatı', 'Kablo yenileme ve kanal döşeme', 'Avize montajı', 'Topraklama hattı ölçümü'],
    frequentPlaces: ['Üsküdar Meydan', 'Çamlıca Tepesi', 'Çengelköy Sahil', 'Bağlarbaşı Kültür Merkezi'],
    phone: '+90 530 069 53 93'
  },
  {
    slug: 'maltepe',
    name: 'Maltepe',
    side: 'Anadolu',
    averageArrivalTime: '25-30 Dakika',
    searchVolume: 'Yüksek',
    description: 'Maltepe sahil ve E-5 hattında 7/24 acil nöbetçi elektrikçi servisi. Küçükyalı, İdealtepe, Zümrütevler ve Başıbüyük mahallelerinde dakikalar içinde adreste.',
    neighborhoods: ['Küçükyalı', 'İdealtepe', 'Altıntepe', 'Bağlarbaşı', 'Cevizli', 'Zümrütevler', 'Feyzullah', 'Girne', 'Başıbüyük', 'Gülsuyu'],
    commonIssues: ['Site içi aydınlatma ve çevre panosu tamiri', 'Şofben sigortası değişimi', 'İnternet ve data kablosu çekimi'],
    frequentPlaces: ['Maltepe Sahil Parkı', 'Bağdat Caddesi Maltepe Etabı', 'Piazza AVM Çevresi'],
    phone: '+90 530 069 53 93'
  },
  {
    slug: 'kartal',
    name: 'Kartal',
    side: 'Anadolu',
    averageArrivalTime: '25-35 Dakika',
    searchVolume: 'Yüksek',
    description: 'Kartal ve Soğanlık, Cevizli, Uğur Mumcu bölgelerinde acil elektrik arıza ve taahhüt servisi. Yeni konut projeleri ve siteler için garantili servis.',
    neighborhoods: ['Atalar', 'Cevizli', 'Soğanlık', 'Uğur Mumcu', 'Petrol İş', 'Kordonboyu', 'Esentepe', 'Orhantepe', 'Topselvi'],
    commonIssues: ['Merkezi pano şalter arızaları', 'Klima özel elektrik hattı çekimi', 'Kaçak akım testi'],
    frequentPlaces: ['Kartal Sahil', 'Kartal Meydan', 'Anadolu Adliyesi Çevresi'],
    phone: '+90 530 069 53 93'
  },
  {
    slug: 'pendik',
    name: 'Pendik',
    side: 'Anadolu',
    averageArrivalTime: '30-40 Dakika',
    searchVolume: 'Yüksek',
    description: 'Pendik sahil, Kurtköy ve Yenişehir çevresinde 7/24 elektrikçi ve pano arıza servisi. Sabiha Gökçen Havalimanı bölgesi ve sanayi siteleri dahil.',
    neighborhoods: ['Kurtköy', 'Yenişehir', 'Batı Mahallesi', 'Doğu Mahallesi', 'Kaynarca', 'Güzelyalı', 'Esenyalı', 'Velibaba', 'Çamlık'],
    commonIssues: ['Depo ve fabrika aydınlatma', 'Konut sigorta ve buat arızaları', 'Kombiye özel sigorta montajı'],
    frequentPlaces: ['Pendik Marina', 'Kurtköy Viaport', 'Sabiha Gökçen Çevresi'],
    phone: '+90 530 069 53 93'
  },
  {
    slug: 'beykoz',
    name: 'Beykoz',
    side: 'Anadolu',
    averageArrivalTime: '30-40 Dakika',
    searchVolume: 'Orta',
    description: 'Beykoz villa, yalı ve konutlarında acil elektrik servisi. Kavacık iş merkezleri, Riva ve Polonezköy çevresinde jeneratör ve akıllı elektrik çözümleri.',
    neighborhoods: ['Kavacık', 'Paşabahçe', 'Acarlar', 'Gümüşsuyu', 'Kanlıca', 'Anadolu Hisarı', 'Riva', 'Göksu', 'Çubuklu'],
    commonIssues: ['Bahçe aydınlatması ve çevre güvenliği', 'Jeneratör transfer panosu arızası', 'Yüksek voltaj koruma sistemleri'],
    frequentPlaces: ['Kavacık Köprü Çıkışı', 'Acarkent', 'Anadolu Hisarı Sahil'],
    phone: '+90 530 069 53 93'
  },
  {
    slug: 'cekmekoy',
    name: 'Çekmeköy',
    side: 'Anadolu',
    averageArrivalTime: '25-35 Dakika',
    searchVolume: 'Orta',
    description: 'Çekmeköy, Taşdelen ve Ömerli villa bölgelerinde 7/24 elektrikçi desteği. Site ve bağımsız villalar için arıza tespiti ve taahhüt.',
    neighborhoods: ['Taşdelen', 'Merkez', 'Mehmet Akif', 'Mimar Sinan', 'Hamidiye', 'Alemdağ', 'Ömerli', 'Çamlık'],
    commonIssues: ['Villa elektrik panosu arızası', 'Topraklama ölçümü ve paratoner', 'Akıllı priz sistemleri'],
    frequentPlaces: ['Taşdelen Çamlık', 'Şile Otoyolu Çekmeköy Kavşağı'],
    phone: '+90 530 069 53 93'
  },
  {
    slug: 'sancaktepe',
    name: 'Sancaktepe',
    side: 'Anadolu',
    averageArrivalTime: '25-35 Dakika',
    searchVolume: 'Orta',
    description: 'Sancaktepe Samandıra ve Sarıgazi genelinde konut ve ticari elektrik arızalarına 7/24 hızlı mobil servis.',
    neighborhoods: ['Samandıra', 'Sarıgazi', 'Abdurrahmangazi', 'Meclis', 'Emek', 'Eyüp Sultan', 'İnönü'],
    commonIssues: ['Daire içi kablo yanması', 'Merdiven otomatiği ve sensör tamiri', 'Pano yenileme'],
    frequentPlaces: ['Sancaktepe Şehir Hastanesi Çevresi', 'Samandıra Meydan'],
    phone: '+90 530 069 53 93'
  },
  {
    slug: 'sultanbeyli',
    name: 'Sultanbeyli',
    side: 'Anadolu',
    averageArrivalTime: '30-40 Dakika',
    searchVolume: 'Orta',
    description: 'Sultanbeyli genelinde 7/24 elektrikçi ve arıza bakım servisi. Uygun fiyatlı, faturalı ve TSE onaylı malzeme garantisi.',
    neighborhoods: ['Battalgazi', 'Abdurrahmangazi', 'Hasanpaşa', 'Mehmet Akif', 'Turgut Reis', 'Akşemsettin'],
    commonIssues: ['Kısa devre bulma', 'Sayaç ve kofana değişimi', 'Aydınlatma montajı'],
    frequentPlaces: ['Sultanbeyli Gölet', 'Atlaspark AVM Çevresi'],
    phone: '+90 530 069 53 93'
  },
  {
    slug: 'tuzla',
    name: 'Tuzla',
    side: 'Anadolu',
    averageArrivalTime: '35-45 Dakika',
    searchVolume: 'Orta',
    description: 'Tuzla sahil, Marina, Tepeören ve organize sanayi bölgesinde konut ve endüstriyel elektrikçi servisi.',
    neighborhoods: ['İstasyon', 'Postane', 'Aydınlı', 'Yayla', 'Tepeören', 'Akfırat', 'Şifa', 'Mimarsinan'],
    commonIssues: ['Endüstriyel pano ve kontaktör arızası', 'Marina yat elektrik tesisatı', 'Konut elektrik arıza servisi'],
    frequentPlaces: ['Viaport Marina', 'Tuzla Tersaneler Bölgesi', 'Tuzla OSB'],
    phone: '+90 530 069 53 93'
  },
  {
    slug: 'sile',
    name: 'Şile',
    side: 'Anadolu',
    averageArrivalTime: '45-60 Dakika',
    searchVolume: 'Orta',
    description: 'Şile ve Ağva genelinde müstakil evler, yazlıklar ve butik oteller için 7/24 elektrik tesisat ve jeneratör servisi.',
    neighborhoods: ['Balibey', 'Çavuş', 'Hacıkasım', 'Kumbaba', 'Ağva', 'Doğancılı'],
    commonIssues: ['Yıldırım koruma ve topraklama', 'Nem kaynaklı kaçak akım arızası', 'Yazlık elektrik açma ve bakım'],
    frequentPlaces: ['Şile Feneri', 'Kumbaba Sahil', 'Ağva Göksu Nehri Çevresi'],
    phone: '+90 530 069 53 93'
  },
  {
    slug: 'adalar',
    name: 'Adalar',
    side: 'Anadolu',
    averageArrivalTime: 'Randevulu / Acil Servis',
    searchVolume: 'Orta',
    description: 'Büyükada, Heybeliada, Kınalıada ve Burgazada tarihi köşkleri ve konutları için uzman elektrik taahhüt ve arıza çözümleri.',
    neighborhoods: ['Büyükada Nizam', 'Büyükada Maden', 'Heybeliada', 'Kınalıada', 'Burgazada'],
    commonIssues: ['Tarihi ahşap köşk yangın güvenliği', 'Elektrikli araç şarj ünitesi', 'Altyapı kablolama'],
    frequentPlaces: ['Büyükada İskele', 'Heybeliada Çam Limanı'],
    phone: '+90 530 069 53 93'
  },

  // Avrupa Yakası
  {
    slug: 'besiktas',
    name: 'Beşiktaş',
    side: 'Avrupa',
    averageArrivalTime: '20-25 Dakika',
    searchVolume: 'Çok Yüksek',
    description: 'Beşiktaş merkez, Levent, Etiler, Bebek ve Ortaköy hattında 7/24 acil nöbetçi elektrikçi servisi. Restoran, cafe, ofis ve konutlar için 20 dakikada adresteyiz.',
    neighborhoods: ['Levent', 'Etiler', 'Bebek', 'Ortaköy', 'Abbasağa', 'Sinanpaşa', 'Akatlar', 'Konaklar', 'Ulus', 'Gayrettepe', 'Yıldız', 'Kuruçeşme'],
    commonIssues: ['Ticari mutfak ve cafe elektrik arızası', 'Aydınlatma ve otomasyon panosu arızası', 'Sigorta yanması ve koku gelmesi', 'Acil elektrik kesintisi'],
    frequentPlaces: ['Beşiktaş Çarşı', 'Nispetiye Caddesi', 'Ortaköy Meydanı', 'Levent İş Kuleleri'],
    phone: '+90 530 069 53 93'
  },
  {
    slug: 'sisli',
    name: 'Şişli',
    side: 'Avrupa',
    averageArrivalTime: '20-25 Dakika',
    searchVolume: 'Çok Yüksek',
    description: 'Şişli, Mecidiyeköy, Nişantaşı, Bomonti ve Fulya bölgelerinde 7/24 nöbetçi acil elektrikçi. Plaza, mağaza ve evlerde anında arıza müdahalesi.',
    neighborhoods: ['Mecidiyeköy', 'Nişantaşı', 'Teşvikiye', 'Bomonti', 'Fulya', 'Gülbahar', 'Halaskargazi', 'Pangaltı', 'Kuştepe', 'Feriköy', 'Okmeydanı'],
    commonIssues: ['Ofis elektrik dağıtım panosu arızası', 'LED aydınlatma ve spot arızaları', 'Kaçak akım rölesi devresi', 'Data ve internet kablosu çekimi'],
    frequentPlaces: ['Cevahir AVM Çevresi', 'Abdi İpekçi Caddesi', 'Büyükdere Caddesi', 'Bomontiada Çevresi'],
    phone: '+90 530 069 53 93'
  },
  {
    slug: 'bakirkoy',
    name: 'Bakırköy',
    side: 'Avrupa',
    averageArrivalTime: '20-25 Dakika',
    searchVolume: 'Çok Yüksek',
    description: 'Bakırköy merkez, Ataköy, Yeşilköy, Florya ve Yeşilyurt bölgelerinde 7/24 acil uzman elektrik servisi. Konut siteleri ve sahil işletmeleri için garantili arıza onarımı.',
    neighborhoods: ['Ataköy 1-11. Kısım', 'Yeşilköy', 'Florya (Şenlikköy)', 'Yeşilyurt', 'Zuhuratbaba', 'Cevizlik', 'Kartaltepe', 'Osmaniye', 'Sakızağacı'],
    commonIssues: ['Site dairesi sigorta atması', 'Kombi ve klima elektrik besleme hattı', 'Daire içi tesisat yenileme'],
    frequentPlaces: ['Bakırköy Meydan', 'Capacity & Carousel Çevresi', 'Yeşilköy Marina', 'Florya Sahil Parkı'],
    phone: '+90 530 069 53 93'
  },
  {
    slug: 'kagithane',
    name: 'Kağıthane',
    side: 'Avrupa',
    averageArrivalTime: '20-25 Dakika',
    searchVolume: 'Çok Yüksek',
    description: 'Kağıthane Cendere vadisi, Seyrantepe, Çeliktepe ve Gültepe bölgelerinde yeni rezidanslar ve konutlar için 7/24 acil elektrikçi.',
    neighborhoods: ['Seyrantepe', 'Çeliktepe', 'Gültepe', 'Talatpaşa', 'Merkez', 'Çağlayan', 'Şirintepe', 'Hamidiye', 'Gürsel'],
    commonIssues: ['Kentsel dönüşüm bina elektrik panosu', 'Daire arıza bulma', 'İnternet tesisatı kablo çekimi'],
    frequentPlaces: ['Cendere Vadisi Vadistanbul', 'Çağlayan Adliyesi', 'Seyrantepe Metro Çevresi'],
    phone: '+90 530 069 53 93'
  },
  {
    slug: 'kucukcekmece',
    name: 'Küçükçekmece',
    side: 'Avrupa',
    averageArrivalTime: '25-30 Dakika',
    searchVolume: 'Çok Yüksek',
    description: 'Küçükçekmece Atakent, Halkalı ve Sefaköy hattında büyük site projelerine ve evlere 7/24 nöbetçi acil elektrikçi hizmeti.',
    neighborhoods: ['Atakent', 'Halkalı Merkez', 'Sefaköy', 'Cennet', 'İnönü', 'Kanarya', 'Tevfikbey', 'Yarımburgaz', 'Mehmet Akif'],
    commonIssues: ['Büyük site dairesi pano sigortası atması', 'Şofben ve elektrikli ocak hattı', 'Avize montajı'],
    frequentPlaces: ['Atakent Tema İstanbul', 'ArenaPark Çevresi', 'Küçükçekmece Gölü Sahili'],
    phone: '+90 530 069 53 93'
  },
  {
    slug: 'fatih',
    name: 'Fatih',
    side: 'Avrupa',
    averageArrivalTime: '20-30 Dakika',
    searchVolume: 'Çok Yüksek',
    description: 'Tarihi yarımada Fatih, Aksaray, Çapa, Fındıkzade ve Sultanahmet genelinde otel, işyeri ve konutlara 7/24 acil elektrikçi.',
    neighborhoods: ['Aksaray', 'Çapa', 'Fındıkzade', 'Şehremini', 'Kocamustafapaşa', 'Sultanahmet', 'Beyazıt', 'Balat', 'Zeyrek', 'Topkapı'],
    commonIssues: ['Tarihi binalarda tesisat yenileme', 'Otel elektrik kesintisi', 'Kablo kanalları ve priz montajı'],
    frequentPlaces: ['Fatih Camii Çevresi', 'Vatan Caddesi', 'Millet Caddesi', 'Kapalıçarşı Bölgesi'],
    phone: '+90 530 069 53 93'
  },
  {
    slug: 'beyoglu',
    name: 'Beyoğlu',
    side: 'Avrupa',
    averageArrivalTime: '20-25 Dakika',
    searchVolume: 'Çok Yüksek',
    description: 'Taksim, İstiklal, Karaköy, Cihangir ve Galata hattında otel, bar, restoran ve tarihi evlere 7/24 acil nöbetçi elektrikçi servisi.',
    neighborhoods: ['Cihangir', 'Karaköy', 'Galata', 'Gümüşsuyu', 'Asmalımescit', 'Tophane', 'Kasımpaşa', 'Piyalepaşa', 'Halıcıoğlu', 'Sütlüce'],
    commonIssues: ['Gece saatlerinde restoran aydınlatma kesintisi', 'Ses ve ışık sistemleri elektrik panosu', 'Eski tesisat yenileme'],
    frequentPlaces: ['İstiklal Caddesi', 'Galataport', 'Karaköy Rıhtım', 'Taksim Meydanı'],
    phone: '+90 530 069 53 93'
  },
  {
    slug: 'sariyer',
    name: 'Sarıyer',
    side: 'Avrupa',
    averageArrivalTime: '25-35 Dakika',
    searchVolume: 'Yüksek',
    description: 'Sarıyer merkez, Maslak, Tarabya, Yeniköy ve Zekeriyaköy villa bölgelerinde 7/24 uzman elektrikçi ve taahhüt servisi.',
    neighborhoods: ['Maslak', 'Zekeriyaköy', 'Tarabya', 'Yeniköy', 'İstinye', 'Baltalimanı', 'Emirgan', 'Rumelihisarı', 'Büyükdere', 'Kilyos'],
    commonIssues: ['Villa ve yalı elektrik panosu tamiri', 'Bahçe ve havuz aydınlatma arızası', 'Jeneratör arızaları'],
    frequentPlaces: ['Maslak İş Plazaları', 'İstinyePark Çevresi', 'Tarabya Sahil'],
    phone: '+90 530 069 53 93'
  },
  {
    slug: 'eyupsultan',
    name: 'Eyüpsultan',
    side: 'Avrupa',
    averageArrivalTime: '25-35 Dakika',
    searchVolume: 'Yüksek',
    description: 'Eyüpsultan merkez, Göktürk ve Kemerburgaz villa ve rezidans bölgelerinde 7/24 acil elektrikçi hizmeti.',
    neighborhoods: ['Göktürk', 'Kemerburgaz', 'Alibeyköy', 'Yeşilpınar', 'Çırçır', 'Rami', 'İslambey', 'Nişanca'],
    commonIssues: ['Göktürk villa elektrik arızası', 'Kısa devre arıza tespiti', 'Pano revizyonu'],
    frequentPlaces: ['Göktürk İstanbul Caddesi', 'Eyüp Sultan Camii Çevresi', 'Vialand AVM Çevresi'],
    phone: '+90 530 069 53 93'
  },
  {
    slug: 'basaksehir',
    name: 'Başakşehir',
    side: 'Avrupa',
    averageArrivalTime: '25-35 Dakika',
    searchVolume: 'Çok Yüksek',
    description: 'Başakşehir 1-5. Etap, Kayaşehir ve Bahçeşehir genelinde site daireleri ve villalara 7/24 acil elektrikçi.',
    neighborhoods: ['Bahçeşehir 1. Kısım', 'Bahçeşehir 2. Kısım', 'Kayaşehir', 'Başak', 'Başakşehir 1. Etap', 'Ziya Gökalp', 'Güvercintepe', 'Şahintepe'],
    commonIssues: ['Site ortak alan ve daire panosu arızası', 'Akıllı ev sistemleri', 'Şofben ve ocak hattı'],
    frequentPlaces: ['Başakşehir Çam ve Sakura Hastanesi', 'Mall of Istanbul Çevresi', 'Bahçeşehir Gölet'],
    phone: '+90 530 069 53 93'
  },
  {
    slug: 'esenyurt',
    name: 'Esenyurt',
    side: 'Avrupa',
    averageArrivalTime: '25-35 Dakika',
    searchVolume: 'Çok Yüksek',
    description: 'Esenyurt genelinde 7/24 nöbetçi acil elektrikçi servisi. Kule siteler, rezidanslar ve mahalle içi dairelerde 20-30 dakikada servis.',
    neighborhoods: ['Cumhuriyet', 'Güzelyurt', 'Mehterçeşme', 'Yeşilkent', 'İncirtepe', 'Örnek', 'Pınar', 'Akçaburgaz', 'Saadetdere'],
    commonIssues: ['Kule daire ana şalter atması', 'Kaçak akım rölesi devreden çıkması', 'Avize ve aydınlatma montajı'],
    frequentPlaces: ['Esenyurt Meydan', 'Torium Çevresi', 'Akbatı Çevresi'],
    phone: '+90 530 069 53 93'
  },
  {
    slug: 'beylikduzu',
    name: 'Beylikdüzü',
    side: 'Avrupa',
    averageArrivalTime: '25-35 Dakika',
    searchVolume: 'Çok Yüksek',
    description: 'Beylikdüzü Barış, Adnan Kahveci, Yakuplu ve Gürpınar mahallelerinde 7/24 nöbetçi elektrikçi servisi.',
    neighborhoods: ['Adnan Kahveci', 'Barış', 'Beylikdüzü OSB', 'Büyükşehir', 'Cumhuriyet', 'Dereağzı', 'Gürpınar', 'Kavaklı', 'Marmara', 'Yakuplu'],
    commonIssues: ['Yakuplu marina villa tesisatı', 'Daire içi elektrik arızaları', 'Pano yenileme'],
    frequentPlaces: ['Beylikdüzü Yaşam Vadisi', 'West Istanbul Marina', 'Marmara Park Çevresi'],
    phone: '+90 530 069 53 93'
  },
  {
    slug: 'bahcelievler',
    name: 'Bahçelievler',
    side: 'Avrupa',
    averageArrivalTime: '20-25 Dakika',
    searchVolume: 'Çok Yüksek',
    description: 'Bahçelievler Yayla, Şirinevler, Yenibosna ve Kocasinan genelinde 7/24 nöbetçi acil elektrikçi servisi.',
    neighborhoods: ['Bahçelievler Merkez (Yayla)', 'Şirinevler', 'Yenibosna', 'Kocasinan', 'Siyavuşpaşa', 'Soğanlı', 'Hürriyet', 'Zafer', 'Fevzi Çakmak'],
    commonIssues: ['Eski bina sigorta panosu değişimi', 'Merdiven otomatiği tamiri', 'Klima hattı'],
    frequentPlaces: ['Yayla Meydanı', 'Şirinevler Meydan', 'Kadir Has AVM Çevresi'],
    phone: '+90 530 069 53 93'
  },
  {
    slug: 'bagcilar',
    name: 'Bağcılar',
    side: 'Avrupa',
    averageArrivalTime: '20-30 Dakika',
    searchVolume: 'Çok Yüksek',
    description: 'Bağcılar Güneşli, Mahmutbey ve İSTOÇ sanayi bölgesinde konut ve ticari acil elektrik servisi.',
    neighborhoods: ['Güneşli', 'Mahmutbey', 'Hürriyet', 'Bağlar', 'Yenigün', 'Fevzi Çakmak', 'Kirazlı', 'Demirkapı'],
    commonIssues: ['Atölye trifaze elektrik panosu', 'Ev içi sigorta arızaları', 'LED aydınlatma'],
    frequentPlaces: ['İSTOÇ Ticaret Merkezi', 'Basın Ekspres Yolu Plazalar', 'Güneşli Meydan'],
    phone: '+90 530 069 53 93'
  },
  {
    slug: 'gaziosmanpasa',
    name: 'Gaziosmanpaşa',
    side: 'Avrupa',
    averageArrivalTime: '20-30 Dakika',
    searchVolume: 'Yüksek',
    description: 'Gaziosmanpaşa merkez, Bağlarbaşı, Karadeniz ve Yıldıztabya mahallelerinde 7/24 nöbetçi elektrikçi servisi.',
    neighborhoods: ['Bağlarbaşı', 'Karadeniz', 'Merkez', 'Yıldıztabya', 'Sarıgöl', 'Karlıtepe', 'Barbaros Hayrettin Paşa', 'Mevlana'],
    commonIssues: ['Kentsel dönüşüm panosu', 'Sigorta arızaları', 'Kablo çekimi'],
    frequentPlaces: ['GOP Meydanı', 'Venezia Mega Outlet Çevresi'],
    phone: '+90 530 069 53 93'
  },
  {
    slug: 'sultangazi',
    name: 'Sultangazi',
    side: 'Avrupa',
    averageArrivalTime: '25-35 Dakika',
    searchVolume: 'Yüksek',
    description: 'Sultangazi Cebeci, Sultançiftliği ve 50. Yıl mahallelerinde 7/24 acil nöbetçi elektrikçi servisi.',
    neighborhoods: ['50. Yıl', 'Cebeci', 'Sultançiftliği', 'Uğur Mumcu', 'İsmetpaşa', 'Esentepe', 'Gazi', 'Yayla'],
    commonIssues: ['Ana kofana değişimi', 'Daire içi kısa devre tespiti', 'Kaçak akım rölesi montajı'],
    frequentPlaces: ['Sultangazi Kent Meydanı', 'Haseki Hastanesi Çevresi'],
    phone: '+90 530 069 53 93'
  },
  {
    slug: 'bayrampasa',
    name: 'Bayrampaşa',
    side: 'Avrupa',
    averageArrivalTime: '20-25 Dakika',
    searchVolume: 'Yüksek',
    description: 'Bayrampaşa merkez, Kartaltepe, Muratpaşa ve Mega Center bölgesinde sanayi ve ev elektrikçi servisi.',
    neighborhoods: ['Muratpaşa', 'Kartaltepe', 'Kocatepe', 'Yıldırım', 'Orta Mahalle', 'Yenidoğan', 'Terzidere', 'Altıntepsi'],
    commonIssues: ['İşyeri aydınlatma panosu', 'Ev sigorta arızaları', 'Data ve kablolama'],
    frequentPlaces: ['Forum İstanbul Çevresi', 'Mega Center', 'Bayrampaşa Meydan'],
    phone: '+90 530 069 53 93'
  },
  {
    slug: 'zeytinburnu',
    name: 'Zeytinburnu',
    side: 'Avrupa',
    averageArrivalTime: '20-25 Dakika',
    searchVolume: 'Yüksek',
    description: 'Zeytinburnu sahil rezidansları, tekstil atölyeleri ve daireler için 7/24 acil nöbetçi elektrik ustası.',
    neighborhoods: ['Kazlıçeşme', 'Merkezefendi', 'Seyitnizam', 'Beştelsiz', 'Sümer', 'Yeşiltepe', 'Telsiz', 'Gökalp', 'Çırpıcı'],
    commonIssues: ['Rezidans elektrik arızası', 'Atölye makine elektrik hattı', 'Pano bakım'],
    frequentPlaces: ['Kazlıçeşme Sahil', 'Marmara Forum Çevresi', 'Zeytinburnu Meydan'],
    phone: '+90 530 069 53 93'
  },
  {
    slug: 'gungoren',
    name: 'Güngören',
    side: 'Avrupa',
    averageArrivalTime: '20-25 Dakika',
    searchVolume: 'Yüksek',
    description: 'Güngören Merter tekstil merkezi ve konut mahallelerinde 7/24 acil elektrikçi hizmeti.',
    neighborhoods: ['Merter (M. Nesih Özmen)', 'Haznedar', 'Güven', 'Güneştepe', 'Akıncılar', 'Sanayi', 'Gençosman', 'Mareşal Çakmak'],
    commonIssues: ['Merter mağaza ve atölye aydınlatması', 'Ev sigorta arızası', 'Kısa devre tamiri'],
    frequentPlaces: ['Merter Tekstil Çarşısı', 'Kale Outlet Çevresi'],
    phone: '+90 530 069 53 93'
  },
  {
    slug: 'esenler',
    name: 'Esenler',
    side: 'Avrupa',
    averageArrivalTime: '20-30 Dakika',
    searchVolume: 'Yüksek',
    description: 'Esenler Dörtyol, Menderes ve Atışalanı mahallelerinde 7/24 kesintisiz elektrikçi servisi.',
    neighborhoods: ['Dörtyol (Menderes)', 'Nine Hatun', 'Fevzi Çakmak', 'Kazım Karabekir', 'Kemer', 'Havaalanı', 'Turgut Reis', 'Oruçreis'],
    commonIssues: ['Bina giriş panosu yanması', 'Daire içi elektrik kaçağı', 'Avize takma'],
    frequentPlaces: ['Esenler Dörtyol Meydanı', 'Esenler Otogarı Çevresi'],
    phone: '+90 530 069 53 93'
  },
  {
    slug: 'avcilar',
    name: 'Avcılar',
    side: 'Avrupa',
    averageArrivalTime: '25-35 Dakika',
    searchVolume: 'Yüksek',
    description: 'Avcılar merkez, Parseller, Cihangir, Tahtakale ve Firuzköy mahallelerinde 7/24 nöbetçi acil elektrikçi.',
    neighborhoods: ['Merkez', 'Ambarlı', 'Cihangir', 'Denizköşkler', 'Firuzköy', 'Gümüşpala', 'Mustafa Kemal Paşa', 'Tahtakale (Ispartakule)', 'Üniversite'],
    commonIssues: ['Ispartakule site daire panoları', 'Denizköşkler sahil nemli hava kaçak akım arızası', 'Kablo yenileme'],
    frequentPlaces: ['Avcılar Sahil Parkı', 'Pelikan Mall Çevresi', 'Ispartakule Çarşı'],
    phone: '+90 530 069 53 93'
  },
  {
    slug: 'arnavutkoy',
    name: 'Arnavutköy',
    side: 'Avrupa',
    averageArrivalTime: '30-40 Dakika',
    searchVolume: 'Orta',
    description: 'Arnavutköy merkez, Bolluca, Taşoluk ve İstanbul Havalimanı bölgesinde 7/24 elektrikçi ve taahhüt servisi.',
    neighborhoods: ['Merkez', 'Bolluca', 'Taşoluk', 'Haraççı', 'Boğazköy', 'Hadımköy', 'İslambey', 'Deliklikaya'],
    commonIssues: ['Hadımköy lojistik depo aydınlatması', 'Müstakil ev pano kurulumu', 'Arıza servisi'],
    frequentPlaces: ['İstanbul Havalimanı Çevresi', 'Hadımköy Sanayi Bölgesi'],
    phone: '+90 530 069 53 93'
  },
  {
    slug: 'buyukcekmece',
    name: 'Büyükçekmece',
    side: 'Avrupa',
    averageArrivalTime: '30-40 Dakika',
    searchVolume: 'Yüksek',
    description: 'Büyükçekmece sahil, Mimaroba, Sinanoba, Tepecik ve Kumburgaz villa bölgelerinde 7/24 nöbetçi elektrik servisi.',
    neighborhoods: ['Mimaroba (Batıköy)', 'Sinanoba', 'Albatros', 'Fatih', 'Kumburgaz', 'Tepecik', 'Kamiloba', 'Celaliye', 'Türkoba'],
    commonIssues: ['Mimaroba sahil villa tesisatı', 'Yazlık elektrik sigorta açımı', 'Bahçe projektör montajı'],
    frequentPlaces: ['Büyükçekmece Kordonboyu', 'Mimar Sinan Köprüsü', 'Tüyap Çevresi'],
    phone: '+90 530 069 53 93'
  },
  {
    slug: 'catalca',
    name: 'Çatalca',
    side: 'Avrupa',
    averageArrivalTime: '35-50 Dakika',
    searchVolume: 'Orta',
    description: 'Çatalca merkez ve köylerinde çiftlikler, villalar ve işletmeler için 7/24 elektrikçi ve jeneratör desteği.',
    neighborhoods: ['Ferhatpaşa', 'Kaleiçi', 'Çakıl', 'Muratbey', 'İzzettin', 'Subaşı', 'Binkılıç'],
    commonIssues: ['Çiftlik ve tarımsal elektrik panoları', 'Voltaj dalgalanması regülatör montajı', 'Topraklama kazığı çakımı'],
    frequentPlaces: ['Çatalca Meydan', 'Muratbey Gümrük Çevresi'],
    phone: '+90 530 069 53 93'
  },
  {
    slug: 'silivri',
    name: 'Silivri',
    side: 'Avrupa',
    averageArrivalTime: '35-50 Dakika',
    searchVolume: 'Orta',
    description: 'Silivri sahil, Selimpaşa, Değirmenköy ve Gümüşyaka villa ve yazlık bölgelerinde 7/24 uzman elektrikçi servisi.',
    neighborhoods: ['Merkez', 'Selimpaşa', 'Gümüşyaka', 'Değirmenköy', 'Semizkumlar', 'Ortaköy', 'Kavaklı'],
    commonIssues: ['Yazlık nem ve su teması sigorta arızaları', 'Jeneratör bağlantıları', 'Pano yenileme'],
    frequentPlaces: ['Silivri Sahil', 'Selimpaşa Yazlıklar', 'Klassis Golf Çevresi'],
    phone: '+90 530 069 53 93'
  }
];

export function getDistrictBySlug(slug: string): DistrictInfo | undefined {
  const normalized = slug.toLowerCase().trim();
  return ISTANBUL_DISTRICTS.find(d => d.slug === normalized);
}

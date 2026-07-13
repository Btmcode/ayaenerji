// Mevcut etiketleri değiştir veya yoksa ekle
function setOrReplace(html: string, tag: string, content: string): string {
  const titleRegex = /<title>[^<]*<\/title>/i;
  const descRegex = /<meta\s+name=["']description["'][^>]*>/i;
  const canonicalRegex = /<link\s+rel=["']canonical["'][^>]*>/i;

  if (tag === 'title') {
    return titleRegex.test(html)
      ? html.replace(titleRegex, content)
      : html.replace('</head>', `${content}\n  </head>`);
  }
  if (tag === 'description') {
    return descRegex.test(html)
      ? html.replace(descRegex, content)
      : html.replace('</head>', `${content}\n  </head>`);
  }
  if (tag === 'canonical') {
    return canonicalRegex.test(html)
      ? html.replace(canonicalRegex, content)
      : html.replace('</head>', `${content}\n  </head>`);
  }
  return html;
}

export default async (request: Request, context: any) => {
  const url = new URL(request.url);
  
  // Statik dosyaları geç
  if (url.pathname.match(/\.(js|css|png|jpg|webp|svg|ico|json|txt|xml|woff2?)$/)) {
    return context.next();
  }

  const response = await context.next();
  
  // 304 Not Modified veya 200 dışı bir yanıtsa dokunma
  if (response.status !== 200) {
    return response;
  }
  
  // Sadece HTML yanıtlarına müdahale et
  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("text/html")) {
    return response;
  }

  let html = await response.text();
  
  const metaMap: Record<string, {title: string, description: string, canonical: string}> = {
    "/hizmet-bolgeleri/besiktas": {
      title: "Beşiktaş Elektrikçi | 7/24 Acil Elektrik Servisi | Aya Elektrik",
      description: "Beşiktaş bölgesinde 7/24 acil elektrikçi hizmeti. 30 dakikada adresinizdeyiz. Sigorta arızaları, pano yenileme ve tesisat sorunlarınız için garantili çözüm.",
      canonical: "https://ayaelektrik.com/hizmet-bolgeleri/besiktas"
    },
    "/hizmet-bolgeleri/sisli": {
      title: "Şişli Elektrikçi | 7/24 Acil Elektrik Servisi | Aya Elektrik",
      description: "Şişli bölgesinde 7/24 acil elektrikçi hizmeti. 30 dakikada adresinizdeyiz. Sigorta arızaları, pano yenileme ve ofis tesisat sorunlarınız için garantili çözüm.",
      canonical: "https://ayaelektrik.com/hizmet-bolgeleri/sisli"
    },
    "/hizmet-bolgeleri/bakirkoy": {
      title: "Bakırköy Elektrikçi | 7/24 Acil Elektrik Servisi | Aya Elektrik",
      description: "Bakırköy bölgesinde 7/24 acil elektrikçi hizmeti. 30 dakikada adresinizdeyiz. Sigorta arızaları, pano yenileme ve tesisat sorunlarınız için garantili çözüm.",
      canonical: "https://ayaelektrik.com/hizmet-bolgeleri/bakirkoy"
    },
    "/hizmet-bolgeleri/kagithane": {
      title: "Kağıthane Elektrikçi | 7/24 Acil Elektrik Servisi | Aya Elektrik",
      description: "Kağıthane bölgesinde 7/24 acil elektrikçi hizmeti. 30 dakikada adresinizdeyiz. Sigorta arızaları, pano yenileme ve tesisat sorunlarınız için garantili çözüm.",
      canonical: "https://ayaelektrik.com/hizmet-bolgeleri/kagithane"
    },
    "/hizmet-bolgeleri/kucukcekmece": {
      title: "Küçükçekmece Elektrikçi | 7/24 Acil Elektrik Servisi | Aya Elektrik",
      description: "Küçükçekmece bölgesinde 7/24 acil elektrikçi hizmeti. 30 dakikada adresinizdeyiz. Sigorta arızaları, pano yenileme ve tesisat sorunlarınız için garantili çözüm.",
      canonical: "https://ayaelektrik.com/hizmet-bolgeleri/kucukcekmece"
    },
    "/hizmetler/acil-elektrik-ariza": {
      title: "Acil Elektrik Arıza Servisi - 30 Dakikada | Aya Elektrik",
      description: "İstanbul Avrupa Yakası 7/24 acil elektrik arıza servisi. 30 dakikada adresinizdeyiz.",
      canonical: "https://ayaelektrik.com/hizmetler/acil-elektrik-ariza"
    },
    "/hizmetler/elektrik-tesisati": {
      title: "Elektrik Tesisatı Hizmeti | Aya Elektrik İstanbul",
      description: "İstanbul Avrupa Yakası elektrik tesisat işleri. Garantili ve TSE onaylı işçilik.",
      canonical: "https://ayaelektrik.com/hizmetler/elektrik-tesisati"
    },
    "/hizmetler/pano-yenileme": {
      title: "Elektrik Pano Yenileme | Aya Elektrik İstanbul",
      description: "Eski ve arızalı elektrik panolarınızı yeniliyoruz. 7/24 servis.",
      canonical: "https://ayaelektrik.com/hizmetler/pano-yenileme"
    },
    "/hizmetler/sofben-montaji": {
      title: "Şofben Montajı ve Bakımı | Aya Elektrik İstanbul",
      description: "Profesyonel şofben montajı ve bakım hizmeti. İstanbul Avrupa Yakası.",
      canonical: "https://ayaelektrik.com/hizmetler/sofben-montaji"
    },
    "/hizmetler/ups-kurulumu": {
      title: "UPS Kurulumu ve Bakımı | Aya Elektrik İstanbul",
      description: "Kesintisiz güç kaynağı kurulumu. İstanbul Avrupa Yakası 7/24 servis.",
      canonical: "https://ayaelektrik.com/hizmetler/ups-kurulumu"
    },
    "/hizmetler/kacak-akim-rolesi": {
      title: "Kaçak Akım Rölesi Montajı | Aya Elektrik İstanbul",
      description: "Kaçak akım rölesi montajı ve arıza tespiti. Garantili işçilik.",
      canonical: "https://ayaelektrik.com/hizmetler/kacak-akim-rolesi"
    },
    "/hizmetler/sigorta-arizasi": {
      title: "Sigorta Arızası ve Tamiri | Aya Elektrik İstanbul",
      description: "Sigorta atması ve elektrik kesintisi için 30 dakikada adresinizde.",
      canonical: "https://ayaelektrik.com/hizmetler/sigorta-arizasi"
    },
    "/hizmetler": {
      title: "Tüm Elektrik Hizmetlerimiz | Aya Elektrik İstanbul",
      description: "İstanbul Avrupa Yakası elektrik hizmetleri. Arıza, tesisat, pano, şofben ve daha fazlası.",
      canonical: "https://ayaelektrik.com/hizmetler"
    },
    "/sss": {
      title: "Sık Sorulan Sorular | Aya Elektrik 7/24 Elektrikçi",
      description: "Acil elektrik servisi hakkında merak ettiğiniz her şey. Fiyat, süre, bölge bilgileri.",
      canonical: "https://ayaelektrik.com/sss"
    },
    "/hakkimizda": {
      title: "Hakkımızda | Aya Elektrik İstanbul'un Güvenilir Elektrikçisi",
      description: "15 yıllık tecrübe, 10.000+ mutlu müşteri. TSE onaylı Aya Elektrik hakkında.",
      canonical: "https://ayaelektrik.com/hakkimizda"
    },
    "/iletisim": {
      title: "İletişim | Aya Elektrik 7/24 Acil Elektrikçi İstanbul",
      description: "7/24 ulaşın. 30 dakikada adresinizde. İstanbul Avrupa Yakası tüm ilçeler.",
      canonical: "https://ayaelektrik.com/iletisim"
    },
  };

  const pathname = url.pathname.replace(/\/$/, '') || '/';
  console.log('Edge Function çalıştı, path:', pathname);
  const pageMeta = metaMap[pathname] || metaMap['/'];
  if (!pageMeta) {
    const headers = new Headers(response.headers);
    headers.delete('content-encoding');
    headers.delete('content-length');
    headers.set('content-type', 'text/html');
    headers.set('x-edge-pathname', pathname);

    return new Response(html, {
      status: response.status,
      headers: headers
    });
  }

  html = setOrReplace(html, 'title', `<title>${pageMeta.title}</title>`);
  html = setOrReplace(html, 'description', `<meta name="description" content="${pageMeta.description}">`);
  html = setOrReplace(html, 'canonical', `<link rel="canonical" href="${pageMeta.canonical}">`);

  html = html.replace('</head>', `
    <meta property="og:title" content="${pageMeta.title}">
    <meta property="og:description" content="${pageMeta.description}">
    <meta property="og:url" content="${pageMeta.canonical}">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="tr_TR">
  </head>`);

  const headers = new Headers(response.headers);
  headers.delete('content-encoding');
  headers.delete('content-length');
  headers.set('content-type', 'text/html');
  headers.set('x-edge-pathname', pathname);

  return new Response(html, {
    status: response.status,
    headers: headers
  });
};

export const config = { path: "/*" };

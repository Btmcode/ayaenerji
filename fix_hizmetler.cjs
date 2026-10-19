const fs = require('fs');
let code = fs.readFileSync('src/pages/HizmetlerPage.tsx', 'utf8');

if (!code.includes('application/ld+json')) {
  const schemaStr = `
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Tüm Elektrik Hizmetlerimiz",
            "description": "Acil elektrik arıza, tesisat, pano yenileme, şofben montajı ve kaçak akım rölesi kurulumu gibi tüm profesyonel elektrik hizmetlerimiz.",
            "url": "https://ayaelektrik.com/hizmetler"
          })}
        </script>
  `;
  code = code.replace('</Helmet>', `${schemaStr}</Helmet>`);
  fs.writeFileSync('src/pages/HizmetlerPage.tsx', code);
}

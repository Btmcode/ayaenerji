const fs = require('fs');

function addSchema(file, name, desc, url) {
  let code = fs.readFileSync(file, 'utf8');
  if (!code.includes('application/ld+json')) {
    const schemaStr = `
        <script type="application/ld+json">
          {\`{
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "${name}",
            "description": "${desc}",
            "url": "https://ayaelektrik.com${url}"
          }\`}
        </script>
`;
    code = code.replace('</Helmet>', `${schemaStr}</Helmet>`);
    fs.writeFileSync(file, code);
  }
}

addSchema('src/pages/BlogListPage.tsx', 'Elektrik Blogu', 'Elektrik arızaları, tasarruf önerileri ve teknik bilgiler hakkında faydalı içerikler.', '/blog');
addSchema('src/pages/CareersPage.tsx', 'Kariyer ve İş Olanakları', 'Aya Elektrik ekibine katılın. Açık pozisyonlar ve iş başvuru formu.', '/ekibimize-katil');
addSchema('src/pages/NotFoundPage.tsx', 'Sayfa Bulunamadı - 404', 'Aradığınız sayfa bulunamadı. Aya Elektrik ana sayfasına dönün.', '/404');

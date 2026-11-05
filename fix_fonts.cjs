const fs = require('fs');

let css = fs.readFileSync('src/index.css', 'utf8');
css = css.replace(/@import url\("https:\/\/fonts.googleapis.com[^"]+"\);\n?/, '');
fs.writeFileSync('src/index.css', css);

let html = fs.readFileSync('index.html', 'utf8');
html = html.replace('<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>', '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" media="print" onload="this.media=\'all\'">\n    <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"></noscript>');
fs.writeFileSync('index.html', html);

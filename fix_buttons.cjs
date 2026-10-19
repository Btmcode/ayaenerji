const fs = require('fs');

function addAria(file) {
  let code = fs.readFileSync(file, 'utf8');
  if (file.includes('FAQ.tsx')) {
    code = code.replace('<button', '<button aria-expanded={isOpen} aria-controls={`faq-answer-${index}`}');
    code = code.replace('<div\n                  className={`px-5 md:px-6 overflow-hidden', '<div id={`faq-answer-${index}`}\n                  className={`px-5 md:px-6 overflow-hidden');
  }
  fs.writeFileSync(file, code);
}

addAria('src/components/FAQ.tsx');

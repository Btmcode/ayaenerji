const fs = require('fs');
const code = fs.readFileSync('src/pages/AdminPage.tsx', 'utf-8');
const lines = code.split('\n');
const startIndex = lines.findIndex(l => l.includes('{activeTab === "Arama Kayıtları" && ('));
let endIndex = -1;
let braces = 0;
for (let i = startIndex; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('(')) braces += (line.match(/\(/g) || []).length;
  if (line.includes(')')) braces -= (line.match(/\)/g) || []).length;
  if (braces === 0 && line.trim() === ')}') {
     endIndex = i; break;
  }
}
// just taking the block until the next activeTab ===
const nextTabIndex = lines.findIndex((l, i) => i > startIndex && l.includes('{activeTab === '));
const extracted = lines.slice(startIndex + 1, nextTabIndex - 1).join('\n');

const out = `import React, { useState } from 'react';
import { Trash2, Phone, Search, ChevronLeft, ChevronRight } from 'lucide-react';

export default function AramaKayitlariTab() {
  const [isClearLogsModalOpen, setIsClearLogsModalOpen] = useState(false);
  
  return (
    <>
${extracted}
    </>
  );
}
`;
fs.writeFileSync('src/pages/admin/AramaKayitlariTab.tsx', out);

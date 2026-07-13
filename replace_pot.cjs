const fs = require('fs');
let file = fs.readFileSync('src/pages/admin/PotansiyelMusteriTab.tsx', 'utf-8');

file = file.replace(/import \{([^}]+)\} from 'lucide-react';/, (match, group) => {
  if(!group.includes('Maximize2')) group += ', Maximize2';
  if(!group.includes('Trash2')) group += ', Trash2';
  return `import {${group}} from 'lucide-react';`;
});

// Add handleDeleteRequest inside the component
file = file.replace(/const triggerCopy =/, `
  const handleDeleteRequest = async (id: string) => {
    showConfirm(
      "Talebi Sil",
      "Bu acil çağrı / arıza talebini tamamen silmek istediğinize emin misiniz?",
      async () => {
        try {
          await removeRequestDb(id);
          showToast("Talep başarıyla silindi.", "success");
        } catch (e: any) {
          showToast("Silme hatası: " + e.message, "error");
        }
      }
    );
  };

  const triggerCopy =`);

fs.writeFileSync('src/pages/admin/PotansiyelMusteriTab.tsx', file);

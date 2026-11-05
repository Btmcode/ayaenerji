const fs = require('fs');
let content = fs.readFileSync('src/pages/admin/PotansiyelMusteriTab.tsx', 'utf-8');
if(content.includes('triggerCopy')) {
  console.log("has triggerCopy");
}

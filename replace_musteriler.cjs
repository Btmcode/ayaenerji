const fs = require('fs');
let lines = fs.readFileSync('src/pages/AdminPage.tsx', 'utf-8').split('\n');

const startIndex = 2644; // '{activeTab === "Müşteriler" && (' is at index 2644 (line 2645)
const endIndex = 2811;   // '          )}' for Müşteriler ends at 2811 (line 2812)

const before = lines.slice(0, startIndex);
const after = lines.slice(endIndex + 1);

const injection = `          {activeTab === "Müşteriler" && (
            <MusterilerTab
              customers={customers}
              isCustomerModalOpen={isCustomerModalOpen}
              setIsCustomerModalOpen={setIsCustomerModalOpen}
              customerForm={customerForm}
              setCustomerForm={setCustomerForm}
              editingCustomer={editingCustomer}
              setEditingCustomer={setEditingCustomer}
              handleSaveCustomer={handleSaveCustomer}
              handleDeleteCustomer={handleDeleteCustomer}
            />
          )}`;

const newLines = [...before, injection, ...after];

let newContent = newLines.join('\n');
newContent = `import MusterilerTab from './admin/MusterilerTab';\n` + newContent;

fs.writeFileSync('src/pages/AdminPage.tsx', newContent);

const fs = require('fs');
let lines = fs.readFileSync('src/pages/AdminPage.tsx', 'utf-8').split('\n');
const block = lines.slice(2645, 2812).join('\n');

const componentCode = `import React from 'react';
import { Plus, X, MessageSquare } from 'lucide-react';

interface MusterilerTabProps {
  customers: any[];
  isCustomerModalOpen: boolean;
  setIsCustomerModalOpen: (val: boolean) => void;
  customerForm: any;
  setCustomerForm: (val: any) => void;
  editingCustomer: any;
  setEditingCustomer: (val: any) => void;
  handleSaveCustomer: () => void;
  handleDeleteCustomer: (id: string) => void;
}

export default function MusterilerTab({
  customers,
  isCustomerModalOpen,
  setIsCustomerModalOpen,
  customerForm,
  setCustomerForm,
  editingCustomer,
  setEditingCustomer,
  handleSaveCustomer,
  handleDeleteCustomer
}: MusterilerTabProps) {
  return (
    <>
${block.replace('          {activeTab === "Müşteriler" && (', '').replace(/          \)}?$/, '')}
    </>
  );
}
`;

fs.writeFileSync('src/pages/admin/MusterilerTab.tsx', componentCode);

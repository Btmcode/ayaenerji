const fs = require('fs');
let lines = fs.readFileSync('src/pages/AdminPage.tsx', 'utf-8').split('\n');
const block = lines.slice(2103, 2645).join('\n'); // Adjust indices if needed

const componentCode = `import React from 'react';
import { 
  Activity, Award, Briefcase, CheckCircle, Copy, DollarSign, 
  FileText, Filter, Maximize, MessageSquare, Phone, Plus, 
  Save, Search, Sparkles, Target, Trash, TrendingUp, User, X 
} from 'lucide-react';

type RequestStatus = "Yeni Talep" | "Müşteri Arandı" | "Teklif Verildi" | "İş Tamamlandı";

interface PotansiyelMusteriTabProps {
  crmStats: any;
  crmSearch: string;
  setCrmSearch: (val: string) => void;
  crmDifficultyFilter: string;
  setCrmDifficultyFilter: (val: string) => void;
  crmProfitFilter: string;
  setCrmProfitFilter: (val: string) => void;
  isNewRequestModalOpen: boolean;
  setIsNewRequestModalOpen: (val: boolean) => void;
  newRequestForm: any;
  setNewRequestForm: (val: any) => void;
  isScoringLead: boolean;
  handleYeniTalep: () => void;
  filteredRequests: any[];
  handleDragOver: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent, colStatus: RequestStatus) => void;
  handleDragStart: (e: React.DragEvent, id: string | number) => void;
  setSelectedCrmLead: (val: any) => void;
  updateRequestStatus: (id: string | number, status: RequestStatus) => void;
  handleAnalyzeLead: (lead: any) => void;
  isAnalyzingCrmLead: boolean;
  selectedCrmLead: any;
  leadNotes: string;
  setLeadNotes: (val: string) => void;
  handleSaveLeadNotes: (id: string) => void;
  isSavingLeadNotes: boolean;
  removeRequestDb: (id: string) => void;
  showConfirm: (title: string, msg: string, onConfirm: () => void) => void;
  showToast: (msg: string, type: "success" | "error" | "info" | "warning") => void;
}

export default function PotansiyelMusteriTab({
  crmStats,
  crmSearch,
  setCrmSearch,
  crmDifficultyFilter,
  setCrmDifficultyFilter,
  crmProfitFilter,
  setCrmProfitFilter,
  isNewRequestModalOpen,
  setIsNewRequestModalOpen,
  newRequestForm,
  setNewRequestForm,
  isScoringLead,
  handleYeniTalep,
  filteredRequests,
  handleDragOver,
  handleDrop,
  handleDragStart,
  setSelectedCrmLead,
  updateRequestStatus,
  handleAnalyzeLead,
  isAnalyzingCrmLead,
  selectedCrmLead,
  leadNotes,
  setLeadNotes,
  handleSaveLeadNotes,
  isSavingLeadNotes,
  removeRequestDb,
  showConfirm,
  showToast
}: PotansiyelMusteriTabProps) {

  const triggerCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    showToast("Kopyalandı!", "success");
  };

  return (
    <>
${block.replace('          {activeTab === "Potansiyel Müşteri" && (', '').replace(/          \)}?$/, '')}
    </>
  );
}
`;

fs.writeFileSync('src/pages/admin/PotansiyelMusteriTab.tsx', componentCode);

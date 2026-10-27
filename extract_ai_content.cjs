const fs = require('fs');
let lines = fs.readFileSync('src/pages/AdminPage.tsx', 'utf-8').split('\n');
const block = lines.slice(2376, 2727).join('\n');

const componentCode = `import React from 'react';
import { Sparkles, Activity, FileText, Check, Save } from 'lucide-react';

interface AiIcerikAsistaniTabProps {
  aiForm: any;
  setAiForm: (val: any) => void;
  isFetchingTrends: boolean;
  handleGenerateAIResource: () => void;
  isGenerating: boolean;
  generatedContent: string;
  generatedMetaTitle: string;
  generatedMetaDescription: string;
  triggerCopy: (text: string, fieldName: string) => void;
  copiedField: string | null;
  isPublishingGmb: boolean;
  isBulkGenerating: boolean;
  handleSuggestTrend: () => void;
}

export default function AiIcerikAsistaniTab({
  aiForm,
  setAiForm,
  isFetchingTrends,
  handleGenerateAIResource,
  isGenerating,
  generatedContent,
  generatedMetaTitle,
  generatedMetaDescription,
  triggerCopy,
  copiedField,
  isPublishingGmb,
  isBulkGenerating,
  handleSuggestTrend
}: AiIcerikAsistaniTabProps) {
  return (
    <>
${block.replace(/          \)}?$/, '')}
    </>
  );
}
`;

fs.writeFileSync('src/pages/admin/AiIcerikAsistaniTab.tsx', componentCode);

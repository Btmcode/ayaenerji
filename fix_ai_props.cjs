const fs = require('fs');

let content = fs.readFileSync('src/pages/admin/AiIcerikAsistaniTab.tsx', 'utf8');

// Fix imports
content = content.replace(
  /import \{ Sparkles, Activity, FileText, Check, Save \} from 'lucide-react';/,
  "import { Sparkles, Activity, FileText, Check, Save, TrendingUp, Globe, Copy } from 'lucide-react';"
);

// Add to props interface
const newPropsInterface = `interface AiIcerikAsistaniTabProps {
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
  handleRunDailyCampaign: (count?: number) => void;
  bulkProgress: number;
  bulkTotal: number;
  bulkLogs: string[];
  handleFetchTrends: () => void;
  trendKeywords: string[];
  addBlogDb: (item: any) => void;
  showToast: (msg: string, type?: string) => void;
  handlePublishToGmb: () => void;
}`;

content = content.replace(/interface AiIcerikAsistaniTabProps \{[\s\S]*?\}/, newPropsInterface);

// Add to destructuring
const newDestructuring = `export default function AiIcerikAsistaniTab({
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
  handleSuggestTrend,
  handleRunDailyCampaign,
  bulkProgress,
  bulkTotal,
  bulkLogs,
  handleFetchTrends,
  trendKeywords,
  addBlogDb,
  showToast,
  handlePublishToGmb
}: AiIcerikAsistaniTabProps) {`;

content = content.replace(/export default function AiIcerikAsistaniTab\(\{[\s\S]*?\}\: AiIcerikAsistaniTabProps\) \{/, newDestructuring);

fs.writeFileSync('src/pages/admin/AiIcerikAsistaniTab.tsx', content);

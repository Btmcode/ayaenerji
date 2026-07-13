const fs = require('fs');
let lines = fs.readFileSync('src/pages/AdminPage.tsx', 'utf-8').split('\n');

// 1. Get the blog state declarations
const stateLines = [
  '  const [blogModalOpen, setBlogModalOpen] = useState(false);',
  '  const [blogModalMode, setBlogModalMode] = useState<"create" | "edit">("create");',
  '  const [blogForm, setBlogForm] = useState({',
  '    id: "",',
  '    title: "",',
  '    content: "",',
  '    slug: "",',
  '    imagePrompt: "",',
  '    excerpt: "",',
  '    status: "Taslak" as "Yayında" | "Taslak",',
  '    category: "Elektrik Arızası",',
  '    tags: [] as string[],',
  '    imageUrl: "",',
  '  });',
  '  const [coverImageTab, setCoverImageTab] = useState<"ai" | "url">("ai");',
  '  const [editorTab, setEditorTab] = useState<"ai" | "manuel">("ai");',
  '  const [blogSearchQuery, setBlogSearchQuery] = useState("");',
  '  const [blogCategoryFilter, setBlogCategoryFilter] = useState("Hepsi");',
  '  const [blogStatusFilter, setBlogStatusFilter] = useState<"Hepsi" | "Yayında" | "Taslak">("Hepsi");'
];

// 2. Get the JSX block
const startIndex = lines.findIndex(l => l.includes('{activeTab === "Blog Yönetimi" && ('));
let nextTabIndex = -1;
for(let i = startIndex + 1; i < lines.length; i++) {
  if (lines[i].includes('{activeTab === ')) {
    nextTabIndex = i;
    break;
  }
}
const extracted = lines.slice(startIndex + 1, nextTabIndex - 1).join('\n');

const out = `import React, { useState } from 'react';
import { 
  Plus, Search, Filter, Edit, Trash2, Globe, FileText, CheckCircle, Clock, 
  Settings, Image as ImageIcon, Sparkles, AlertCircle, Save 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remarkGfm';

interface BlogTabProps {
  blogPosts: any[];
  addBlogDb: (item: any) => Promise<any>;
  updateBlogDb: (id: string, updates: any) => Promise<any>;
  removeBlogDb: (id: string) => Promise<void>;
  showToast: (msg: string, type: "success" | "error" | "info" | "warning") => void;
  isGenerating: boolean;
  setIsGenerating: (val: boolean) => void;
  isGeneratingImage: boolean;
  setIsGeneratingImage: (val: boolean) => void;
  generatedContent: string;
  setGeneratedContent: (val: string) => void;
  generatedImageUrl: string;
  setGeneratedImageUrl: (val: string) => void;
}

export default function BlogTab({
  blogPosts, addBlogDb, updateBlogDb, removeBlogDb, showToast,
  isGenerating, setIsGenerating, isGeneratingImage, setIsGeneratingImage,
  generatedContent, setGeneratedContent, generatedImageUrl, setGeneratedImageUrl
}: BlogTabProps) {
${stateLines.join('\n')}

  return (
    <>
${extracted}
    </>
  );
}
`;
fs.writeFileSync('src/pages/admin/BlogTab.tsx', out);

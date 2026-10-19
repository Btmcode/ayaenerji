const fs = require('fs');

let code = fs.readFileSync('src/pages/admin/BlogTab.tsx', 'utf-8');

// Fix imports
code = code.replace(/import ReactMarkdown from 'react-markdown';\n/, '');
code = code.replace(/import remarkGfm from 'remarkGfm';\n/, '');
code = code.replace(
  /import \{ \n  Plus,/,
  'import { \n  Plus, Calendar, Copy, X, Check,'
);

// Fix Props
code = code.replace(
  /  showToast: \(msg: string, type: "success" \| "error" \| "info" \| "warning"\) => void;\n/,
  '  showToast: (msg: string, type: "success" | "error" | "info" | "warning") => void;\n  showConfirm: (title: string, msg: string, onConfirm: () => void) => void;\n'
);

// Fix component signature
code = code.replace(
  /blogPosts, addBlogDb, updateBlogDb, removeBlogDb, showToast,\n/,
  'blogPosts, addBlogDb, updateBlogDb, removeBlogDb, showToast, showConfirm,\n'
);

// Fix initial state
code = code.replace(
  /imageUrl: "",\n  \}\);/,
  'imageUrl: "",\n    readTime: "3 Dk",\n  });'
);

// Fix tab states
code = code.replace(
  /const \[coverImageTab, setCoverImageTab\] = useState<"ai" \| "url">/,
  'const [coverImageTab, setCoverImageTab] = useState<"ai" | "url" | "gallery" | "upload">'
);

code = code.replace(
  /const \[editorTab, setEditorTab\] = useState<"ai" \| "manuel">/,
  'const [editorTab, setEditorTab] = useState<"ai" | "manuel" | "edit" | "preview">'
);

// Inject handleImageUpload
const handleImageUploadCode = `
  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setBlogForm({ ...blogForm, imageUrl: e.target?.result as string });
    };
    reader.readAsDataURL(file);
  };
`;
code = code.replace(
  /const handleTitleChange = /,
  handleImageUploadCode + '\n  const handleTitleChange = '
);

fs.writeFileSync('src/pages/admin/BlogTab.tsx', code);

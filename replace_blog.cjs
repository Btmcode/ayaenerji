const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminPage.tsx', 'utf-8');

const stateRegex = /const \[blogModalOpen, setBlogModalOpen\] = useState\(false\);[\s\S]*?const \[blogStatusFilter, setBlogStatusFilter\] = useState<"Hepsi" \| "Yayında" \| "Taslak">\("Hepsi"\);/m;
code = code.replace(stateRegex, '');

const tabRegex = /\{activeTab === "Blog Yönetimi" && \([\s\S]*?(?=\{activeTab === "Görsel Üretimi" && \()/m;
code = code.replace(tabRegex, '{activeTab === "Blog Yönetimi" && <BlogTab blogPosts={blogPosts} addBlogDb={addBlogDb} updateBlogDb={updateBlogDb} removeBlogDb={removeBlogDb} showToast={showToast} isGenerating={isGenerating} setIsGenerating={setIsGenerating} isGeneratingImage={isGeneratingImage} setIsGeneratingImage={setIsGeneratingImage} generatedContent={generatedContent} setGeneratedContent={setGeneratedContent} generatedImageUrl={generatedImageUrl} setGeneratedImageUrl={setGeneratedImageUrl} />}\n          ');

fs.writeFileSync('src/pages/AdminPage.tsx', code);

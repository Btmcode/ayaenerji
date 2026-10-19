const fs = require('fs');

const handlers = `
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);

  const slugify = (text: string) => {
    let trMap: { [key: string]: string } = {
        'çÇ':'c',
        'ğĞ':'g',
        'şŞ':'s',
        'üÜ':'u',
        'ıİ':'i',
        'öÖ':'o'
    };
    for(let key in trMap) {
        text = text.replace(new RegExp('['+key+']','g'), trMap[key]);
    }
    return text.replace(/[^-a-zA-Z0-9\s]+/ig, '')
               .replace(/\s/gi, "-")
               .replace(/[-]+/gi, "-")
               .toLowerCase();
  };

  const handleTitleChange = (newTitle: string) => {
    setBlogForm(prev => ({
      ...prev,
      title: newTitle,
      slug: slugify(newTitle)
    }));
  };

  const handleOpenCreateBlogModal = () => {
    setBlogModalMode("create");
    setSelectedBlogId(null);
    setBlogForm({
      id: "",
      title: "",
      category: "Aydınlatma & Avize",
      slug: "",
      excerpt: "",
      content: "<h2>Yazı Başlığı Altı</h2><p>Elektrik güvenliği ve arıza ipuçlarına dair içeriğinizi buraya yazın...</p>",
      status: "Taslak",
      imageUrl: "/images/blog/evde-elektrik-guvenligi.jpg",
      imagePrompt: "",
      tags: []
    });
    setEditorTab("manuel" as any);
    setBlogModalOpen(true);
  };

  const handleOpenEditBlogModal = (post: any) => {
    setBlogModalMode("edit");
    setSelectedBlogId(post.id);
    setBlogForm({
      id: post.id || "",
      title: post.title || "",
      category: post.category || "Genel",
      slug: post.slug || slugify(post.title || ""),
      excerpt: post.excerpt || "",
      content: post.content || "",
      status: post.status === "Yayında" ? "Yayında" : "Taslak",
      imageUrl: post.imageUrl || post.image || "/images/blog/evde-elektrik-guvenligi.jpg",
      imagePrompt: post.imagePrompt || "",
      tags: post.tags || []
    });
    setEditorTab("manuel" as any);
    setBlogModalOpen(true);
  };

  const handleSaveBlog = async () => {
    if (!blogForm.title || !blogForm.category || !blogForm.slug) {
      showToast("Lütfen başlık, kategori ve SEO linki alanlarını doldurun.", "warning");
      return;
    }

    const payload = {
      title: blogForm.title,
      category: blogForm.category,
      slug: blogForm.slug,
      excerpt: blogForm.excerpt || (blogForm.content ? blogForm.content.replace(/<[^>]*>/g, '').substring(0, 150) + "..." : ""),
      content: blogForm.content,
      readTime: "4 Dk",
      status: blogForm.status,
      imageUrl: blogForm.imageUrl,
      date: new Date().toLocaleDateString("tr-TR"),
      updatedAt: new Date().toLocaleDateString("tr-TR")
    };

    try {
      if (blogModalMode === "create") {
        await addBlogDb({
          ...payload,
          createdAt: new Date().toLocaleDateString("tr-TR"),
          views: 0
        });
        showToast("Blog yazısı başarıyla oluşturuldu.", "success");
      } else if (blogModalMode === "edit" && selectedBlogId) {
        await updateBlogDb(selectedBlogId, payload);
        showToast("Blog yazısı başarıyla güncellendi.", "success");
      }
      setBlogModalOpen(false);
    } catch (error: any) {
      showToast("Blog kaydedilirken bir hata oluştu: " + error.message, "error");
    }
  };
`;

let blogCode = fs.readFileSync('src/pages/admin/BlogTab.tsx', 'utf-8');
blogCode = blogCode.replace(
  'const [blogStatusFilter, setBlogStatusFilter] = useState<"Hepsi" | "Yayında" | "Taslak">("Hepsi");',
  'const [blogStatusFilter, setBlogStatusFilter] = useState<"Hepsi" | "Yayında" | "Taslak">("Hepsi");\n' + handlers
);
fs.writeFileSync('src/pages/admin/BlogTab.tsx', blogCode);

let adminCode = fs.readFileSync('src/pages/AdminPage.tsx', 'utf-8');
const adminHandlersRegex = /const handleTitleChange = \([\s\S]*?const \{ data: metrics \} = useCollection\("metrics"\);/m;
adminCode = adminCode.replace(adminHandlersRegex, 'const { data: metrics } = useCollection("metrics");');

// We also need to remove `slugify` if it's there
const slugifyRegex = /const slugify = \([\s\S]*?toLowerCase\(\);\n  };\n/m;
adminCode = adminCode.replace(slugifyRegex, '');

fs.writeFileSync('src/pages/AdminPage.tsx', adminCode);

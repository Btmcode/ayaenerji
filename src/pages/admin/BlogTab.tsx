import React, { useState } from 'react';
import { 
  Plus, Calendar, Copy, X, Check, Search, Filter, Edit, Trash2, Globe, FileText, CheckCircle, Clock, 
  Settings, Image as ImageIcon, Sparkles, AlertCircle, Save 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BlogTabProps {
  blogPosts: any[];
  addBlogDb: (item: any) => Promise<any>;
  updateBlogDb: (id: string, updates: any) => Promise<any>;
  removeBlogDb: (id: string) => Promise<void>;
  showToast: (msg: string, type: "success" | "error" | "info" | "warning") => void;
  showConfirm: (title: string, msg: string, onConfirm: () => void) => void;
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
  blogPosts, addBlogDb, updateBlogDb, removeBlogDb, showToast, showConfirm,
  isGenerating, setIsGenerating, isGeneratingImage, setIsGeneratingImage,
  generatedContent, setGeneratedContent, generatedImageUrl, setGeneratedImageUrl
}: BlogTabProps) {
  const [blogModalOpen, setBlogModalOpen] = useState(false);
  const [blogModalMode, setBlogModalMode] = useState<"create" | "edit">("create");
  const [blogForm, setBlogForm] = useState({
    id: "",
    title: "",
    content: "",
    slug: "",
    imagePrompt: "",
    excerpt: "",
    status: "Taslak" as "Yayında" | "Taslak",
    category: "Elektrik Arızası",
    tags: [] as string[],
    imageUrl: "",
    readTime: "3 Dk",
  });
  const [coverImageTab, setCoverImageTab] = useState<"ai" | "url" | "gallery" | "upload">("ai");
  const [editorTab, setEditorTab] = useState<"ai" | "manuel" | "edit" | "preview">("ai");
  const [blogSearchQuery, setBlogSearchQuery] = useState("");
  const [blogCategoryFilter, setBlogCategoryFilter] = useState("Hepsi");
  const [blogStatusFilter, setBlogStatusFilter] = useState<"Hepsi" | "Yayında" | "Taslak">("Hepsi");

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
    return text.replace(/[^-a-zA-Z0-9s]+/ig, '')
               .replace(/s/gi, "-")
               .replace(/[-]+/gi, "-")
               .toLowerCase();
  };

  
  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setBlogForm({ ...blogForm, imageUrl: e.target?.result as string });
    };
    reader.readAsDataURL(file);
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
      tags: [],
      readTime: "3 Dk"
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
      tags: post.tags || [],
      readTime: post.readTime || "3 Dk"
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


  return (
    <>
            <div className="space-y-6 animate-fade-in">
              {/* Blog Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-gradient-to-br from-white to-blue-50/20 p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Toplam İçerik</p>
                    <p className="text-2xl font-black text-[#0b2e59] mt-1">{blogPosts.length}</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-blue-50 text-[#0b2e59] border border-blue-100/50">
                    <FileText className="w-5 h-5" />
                  </div>
                </div>
                <div className="bg-gradient-to-br from-white to-emerald-50/20 p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Yayında</p>
                    <p className="text-2xl font-black text-emerald-600 mt-1">
                      {blogPosts.filter((p: any) => p.status === "Yayında").length}
                    </p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100/50">
                    <Globe className="w-5 h-5" />
                  </div>
                </div>
                <div className="bg-gradient-to-br from-white to-amber-50/20 p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Taslaklar</p>
                    <p className="text-2xl font-black text-amber-600 mt-1">
                      {blogPosts.filter((p: any) => p.status !== "Yayında").length}
                    </p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-amber-50 text-amber-600 border border-amber-100/50">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Main Container */}
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden min-h-[600px] flex flex-col">
                <div className="px-8 py-6 border-b border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-slate-50/30">
                  <div>
                    <h3 className="font-extrabold text-slate-800 text-lg">Blog Yönetim Masası</h3>
                    <p className="text-xs text-slate-500 mt-0.5 font-medium">İstanbul Avrupa Yakası için hazırlanan profesyonel bilgilendirme içeriklerini tasarlayın</p>
                  </div>
                  <button 
                    onClick={handleOpenCreateBlogModal}
                    className="bg-[#0b2e59] hover:bg-[#082244] text-white px-6 py-3 rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer hover:shadow-lg active:scale-95 shrink-0"
                  >
                    <Plus className="w-4 h-4" /> Yeni Makale Yaz
                  </button>
                </div>

                {/* Filters & Status Tabs */}
                <div className="p-6 border-b border-slate-100 bg-white flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
                  {/* Status Tabs */}
                  <div className="flex bg-slate-100/80 p-1 rounded-2xl self-start">
                    <button
                      onClick={() => setBlogStatusFilter("Hepsi")}
                      className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                        blogStatusFilter === "Hepsi"
                          ? "bg-white text-[#0b2e59] shadow-sm"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      Hepsi ({blogPosts.length})
                    </button>
                    <button
                      onClick={() => setBlogStatusFilter("Yayında")}
                      className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                        blogStatusFilter === "Yayında"
                          ? "bg-white text-emerald-700 shadow-sm"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      Yayında ({blogPosts.filter((p: any) => p.status === "Yayında").length})
                    </button>
                    <button
                      onClick={() => setBlogStatusFilter("Taslak")}
                      className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                        blogStatusFilter === "Taslak"
                          ? "bg-white text-amber-700 shadow-sm"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      Taslaklar ({blogPosts.filter((p: any) => p.status !== "Yayında").length})
                    </button>
                  </div>

                  {/* Search and Category Select */}
                  <div className="flex flex-col sm:flex-row gap-3 flex-1 max-w-xl justify-end">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Başlık veya içerikte ara..."
                        value={blogSearchQuery}
                        onChange={(e) => setBlogSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2e59]/20 transition-all text-xs font-semibold"
                      />
                    </div>
                    <div className="w-full sm:w-48">
                      <select
                        value={blogCategoryFilter}
                        onChange={(e) => setBlogCategoryFilter(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2e59]/20 transition-all text-xs font-bold text-slate-700 cursor-pointer"
                      >
                        <option value="Hepsi">Tüm Kategoriler</option>
                        <option value="Güvenlik">Güvenlik</option>
                        <option value="Arıza & Çözüm">Arıza & Çözüm</option>
                        <option value="Acil Tavsiyeler">Acil Tavsiyeler</option>
                        <option value="Aydınlatma & Avize">Aydınlatma & Avize</option>
                        <option value="Pano & Sigorta">Pano & Sigorta</option>
                        <option value="Enerji Tasarrufu">Enerji Tasarrufu</option>
                        <option value="Genel">Genel</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Blog Posts Display List */}
                <div className="p-6 flex-1">
                  {blogPosts.length === 0 ? (
                    <div className="py-24 text-center border border-dashed border-slate-200 rounded-3xl max-w-md mx-auto my-12 p-8 bg-slate-50/30">
                      <div className="w-14 h-14 bg-white border border-slate-100 rounded-2xl flex items-center justify-center mx-auto text-slate-400 mb-4 shadow-sm">
                        <FileText className="w-6 h-6 text-[#0b2e59]" />
                      </div>
                      <h4 className="font-extrabold text-slate-800 text-sm">Hiç Blog Yazısı Bulunmuyor</h4>
                      <p className="text-xs text-slate-500 mt-2 max-w-xs mx-auto leading-relaxed font-semibold">
                        Henüz sisteme eklenmiş bir blog içeriği yok. "Yeni Makale Yaz" butonunu kullanarak ilk içeriğinizi tasarlayabilirsiniz.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                      {blogPosts
                        .filter((post: any) => {
                          const matchesSearch = 
                            (post.title || "").toLowerCase().includes(blogSearchQuery.toLowerCase()) || 
                            (post.content || "").toLowerCase().includes(blogSearchQuery.toLowerCase());
                          const matchesCategory = 
                            blogCategoryFilter === "Hepsi" || 
                            post.category === blogCategoryFilter;
                          const matchesStatus =
                            blogStatusFilter === "Hepsi" ||
                            post.status === blogStatusFilter;
                          return matchesSearch && matchesCategory && matchesStatus;
                        })
                        .map((post: any, idx: number) => (
                          <div 
                            key={post.id || idx}
                            className="bg-white border border-slate-150 hover:border-slate-300 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col md:flex-row h-full group"
                          >
                            {/* Blog Cover Thumbnail */}
                            <div className="md:w-[35%] bg-slate-100 relative aspect-video md:aspect-auto overflow-hidden shrink-0">
                              <img 
                                src={post.imageUrl || post.image || "/images/blog/evde-elektrik-guvenligi.jpg"} 
                                alt={post.title} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute top-3 left-3 z-10">
                                <span className="bg-white/95 backdrop-blur-md text-[#0b2e59] text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-lg shadow-sm border border-slate-100">
                                  {post.category || "Genel"}
                                </span>
                              </div>
                            </div>

                            {/* Blog Card Body */}
                            <div className="p-5 flex-1 flex flex-col justify-between">
                              <div>
                                <div className="flex items-center justify-between gap-2 mb-2">
                                  <span className={`px-2.5 py-0.5 rounded-lg text-[9px] font-bold ${
                                    post.status === "Yayında" 
                                      ? "bg-emerald-50 text-emerald-700 border border-emerald-150" 
                                      : "bg-amber-50 text-amber-700 border border-amber-150"
                                  }`}>
                                    {post.status || "Taslak"}
                                  </span>
                                  <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold">
                                    <Clock className="w-3.5 h-3.5" />
                                    <span>{post.readTime || "4 Dk"}</span>
                                  </div>
                                </div>

                                <h4 className="font-extrabold text-slate-800 text-sm md:text-base leading-snug group-hover:text-[#0b2e59] transition-colors line-clamp-2">
                                  {post.title}
                                </h4>

                                <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed font-semibold">
                                  {post.excerpt || "Kısa özet belirtilmemiş."}
                                </p>
                              </div>

                              <div className="flex items-center justify-between border-t border-slate-100 pt-3.5 mt-4">
                                <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {post.date || "Bugün"}
                                </span>

                                <div className="flex items-center gap-1.5">
                                  {/* Quick status toggle slider */}
                                  <button
                                    onClick={async () => {
                                      const nextStatus = post.status === "Yayında" ? "Taslak" : "Yayında";
                                      await updateBlogDb(post.id, { status: nextStatus });
                                      showToast(`Yazı durumu "${nextStatus}" olarak güncellendi.`, "success");
                                    }}
                                    className="px-2.5 py-1 text-[10px] font-bold text-[#0b2e59] hover:bg-slate-50 rounded-lg border border-slate-200 transition-all cursor-pointer"
                                    title="Durumu Değiştir"
                                  >
                                    {post.status === "Yayında" ? "Taslağa Al" : "Yayınla"}
                                  </button>

                                  {/* Copy URL helper */}
                                  <button
                                    onClick={() => {
                                      const fullUrl = `https://ayaelektrik.com/blog/${post.slug}`;
                                      navigator.clipboard.writeText(fullUrl);
                                      showToast("Bağlantı panoya kopyalandı!", "success");
                                    }}
                                    className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                                    title="Bağlantıyı Kopyala"
                                  >
                                    <Copy className="w-3.5 h-3.5" />
                                  </button>

                                  <button
                                    onClick={() => handleOpenEditBlogModal(post)}
                                    className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-[#0b2e59] hover:text-white hover:border-[#0b2e59] transition-colors cursor-pointer"
                                    title="Düzenle"
                                  >
                                    <Edit className="w-3.5 h-3.5" />
                                  </button>

                                  <button
                                    onClick={() => {
                                      showConfirm(
                                        "Yazıyı Sil",
                                        "Bu blog yazısını sistemden tamamen silmek istediğinize emin misiniz?",
                                        async () => {
                                          try {
                                            await removeBlogDb(post.id);
                                            showToast("Yazı başarıyla silindi.", "success");
                                          } catch (err: any) {
                                            showToast("Silme hatası: " + err.message, "error");
                                          }
                                        }
                                      );
                                    }}
                                    className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-colors cursor-pointer"
                                    title="Sil"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Redesigned Premium Blog Editor Modal */}
              {blogModalOpen && (
                <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
                  <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden">
                    {/* Modal Header */}
                    <div className="px-8 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 shrink-0">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#0b2e59] px-2.5 py-1 bg-[#0b2e59]/5 rounded-lg border border-[#0b2e59]/10">
                          {blogModalMode === "create" ? "YENİ MAKALE TASARIMI" : "İÇERİK DÜZENLEME PANELİ"}
                        </span>
                        <h3 className="font-black text-slate-800 text-base md:text-lg mt-1.5">
                          {blogModalMode === "create" ? "Yeni Makale Oluştur" : blogForm.title}
                        </h3>
                      </div>
                      <button 
                        onClick={() => setBlogModalOpen(false)} 
                        className="text-slate-400 hover:text-slate-600 p-2 rounded-xl hover:bg-slate-200/50 transition-colors cursor-pointer"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Modal Scrollable Workspace */}
                    <div className="flex-1 overflow-y-auto flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
                      {/* Form Area - Left (45%) */}
                      <div className="w-full lg:w-[45%] p-6 space-y-4 overflow-y-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Kategori</label>
                            <select
                              value={blogForm.category}
                              onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2e59]/20 transition-all text-xs font-bold text-slate-700 cursor-pointer"
                            >
                              <option value="Güvenlik">Güvenlik</option>
                              <option value="Arıza & Çözüm">Arıza & Çözüm</option>
                              <option value="Acil Tavsiyeler">Acil Tavsiyeler</option>
                              <option value="Aydınlatma & Avize">Aydınlatma & Avize</option>
                              <option value="Pano & Sigorta">Pano & Sigorta</option>
                              <option value="Enerji Tasarrufu">Enerji Tasarrufu</option>
                              <option value="Genel">Genel</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Okuma Süresi</label>
                            <input
                              type="text"
                              value={blogForm.readTime}
                              onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2e59]/20 transition-all text-xs font-bold text-slate-700"
                              placeholder="Örn: 4 Dk"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Blog Başlığı</label>
                          <input
                            type="text"
                            value={blogForm.title}
                            onChange={(e) => handleTitleChange(e.target.value)}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2e59]/20 transition-all text-sm font-bold text-slate-800"
                            placeholder="Örn: Evde Sürekli Sigorta Atmasının Nedenleri"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider flex items-center justify-between">
                            <span>SEO Linki (Slug)</span>
                            <span className="text-[10px] text-emerald-600 font-bold normal-case">ayaelektrik.com/blog/{"{slug}"}</span>
                          </label>
                          <input
                            type="text"
                            value={blogForm.slug}
                            onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value })}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2e59]/20 transition-all text-xs font-mono text-slate-600"
                            placeholder="ornek-seo-linki"
                          />
                        </div>

                        {/* Interactive Visual Cover Image Section */}
                        <div className="space-y-2">
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
                            <span>Kapak Görseli</span>
                            <span className="text-[10px] text-slate-400 font-semibold normal-case">Dışarıdan dosya yükleyebilir veya hazır galeri seçebilirsiniz</span>
                          </label>

                          {/* Image Selector Tab Bar */}
                          <div className="flex bg-slate-100 p-0.5 rounded-xl text-[10px] font-bold">
                            <button
                              type="button"
                              onClick={() => setCoverImageTab("gallery")}
                              className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
                                coverImageTab === "gallery" ? "bg-white text-[#0b2e59] shadow-xs" : "text-slate-500 hover:text-slate-800"
                              }`}
                            >
                              Hazır Galeri
                            </button>
                            <button
                              type="button"
                              onClick={() => setCoverImageTab("upload")}
                              className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
                                coverImageTab === "upload" ? "bg-white text-[#0b2e59] shadow-xs" : "text-slate-500 hover:text-slate-800"
                              }`}
                            >
                              Görsel Yükle
                            </button>
                            <button
                              type="button"
                              onClick={() => setCoverImageTab("url")}
                              className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
                                coverImageTab === "url" ? "bg-white text-[#0b2e59] shadow-xs" : "text-slate-500 hover:text-slate-800"
                              }`}
                            >
                              URL ile Ekle
                            </button>
                          </div>

                          {/* Tab Contents */}
                          {coverImageTab === "gallery" && (
                            <div className="grid grid-cols-2 gap-2 mt-1.5">
                              {[
                                { url: "/images/blog/evde-elektrik-guvenligi.jpg", name: "Ev Güvenliği" },
                                { url: "/images/blog/sigorta-atmasi-cozum.jpg", name: "Sigorta & Pano" },
                                { url: "/images/blog/elektrik-arizasi-ustasi.jpg", name: "Arıza Servisi" },
                                { url: "/images/blog/pano-yenileme-servisi.jpg", name: "Pano Yenileme" },
                              ].map((item) => (
                                <div
                                  key={item.url}
                                  onClick={() => setBlogForm({ ...blogForm, imageUrl: item.url })}
                                  className={`relative rounded-xl overflow-hidden border-2 cursor-pointer aspect-video transition-all ${
                                    blogForm.imageUrl === item.url
                                      ? "border-[#0b2e59] ring-2 ring-blue-100"
                                      : "border-transparent opacity-80 hover:opacity-100 hover:border-slate-300"
                                  }`}
                                >
                                  <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                                  <div className="absolute inset-x-0 bottom-0 bg-black/60 p-1.5 text-center">
                                    <p className="text-[9px] text-white font-bold">{item.name}</p>
                                  </div>
                                  {blogForm.imageUrl === item.url && (
                                    <div className="absolute top-1 right-1 bg-[#0b2e59] text-white p-0.5 rounded-full shadow">
                                      <Check className="w-3 h-3" />
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}

                          {coverImageTab === "upload" && (
                            <div className="space-y-3 mt-1.5">
                              {/* Drag and Drop Zone */}
                              <div 
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={(e) => {
                                  e.preventDefault();
                                  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                                    handleImageUpload(e.dataTransfer.files[0]);
                                  }
                                }}
                                className="border-2 border-dashed border-slate-200 hover:border-[#0b2e59] rounded-2xl p-5 text-center cursor-pointer transition-all bg-slate-50/50 hover:bg-blue-50/10 flex flex-col items-center justify-center min-h-[120px] group"
                                onClick={() => {
                                  const fileInput = document.getElementById("blog-cover-upload") as HTMLInputElement;
                                  if (fileInput) fileInput.click();
                                }}
                              >
                                <input 
                                  id="blog-cover-upload"
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                      handleImageUpload(e.target.files[0]);
                                    }
                                  }}
                                />
                                <div className="w-9 h-9 rounded-full bg-slate-100 group-hover:bg-blue-50 text-slate-500 group-hover:text-[#0b2e59] flex items-center justify-center transition-colors mb-2">
                                  <ImageIcon className="w-4 h-4" />
                                </div>
                                <p className="text-xs font-extrabold text-slate-700">Tıklayın veya Görseli Sürükleyin</p>
                                <p className="text-[10px] text-slate-400 font-semibold mt-1">PNG, JPG veya WEBP (Max 5MB)</p>
                              </div>

                              {/* Live Custom Image Preview */}
                              {blogForm.imageUrl && blogForm.imageUrl.startsWith("data:") && (
                                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-3">
                                  <div className="w-16 h-12 rounded-lg overflow-hidden border shrink-0">
                                    <img src={blogForm.imageUrl} className="w-full h-full object-cover" alt="Yüklenen görsel" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-[10px] font-bold text-slate-700 truncate">Özel Görsel Başarıyla Yüklendi</p>
                                    <p className="text-[9px] text-slate-400 font-bold">Resim optimize edilerek yerel veri olarak atandı.</p>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => setBlogForm({ ...blogForm, imageUrl: "/images/blog/evde-elektrik-guvenligi.jpg" })}
                                    className="p-1 rounded-lg hover:bg-red-50 text-red-500 hover:text-red-700 transition-colors"
                                    title="Görseli Sıfırla"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              )}
                            </div>
                          )}

                          {coverImageTab === "url" && (
                            <div className="space-y-2 mt-1.5">
                              <input
                                type="text"
                                value={blogForm.imageUrl}
                                onChange={(e) => setBlogForm({ ...blogForm, imageUrl: e.target.value })}
                                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2e59]/20 transition-all text-xs font-semibold text-slate-700"
                                placeholder="Görsel web URL'sini yapıştırın..."
                              />
                              <div className="p-2 border border-slate-100 rounded-lg bg-slate-50/50 flex gap-2 items-center">
                                <span className="text-[9px] text-slate-400 font-bold shrink-0">Önizleme:</span>
                                <span className="text-[9px] text-slate-500 truncate font-mono">{blogForm.imageUrl}</span>
                              </div>
                            </div>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Kısa Özet (Excerpt)</label>
                          <textarea
                            value={blogForm.excerpt}
                            onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                            rows={2}
                            maxLength={160}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2e59]/20 transition-all text-xs leading-relaxed font-semibold text-slate-600"
                            placeholder="Arama motoru sonuçlarında ve kartlarda görünecek en fazla 155 karakterlik kısa özet yazın."
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Yayınlanma Durumu</label>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => setBlogForm({ ...blogForm, status: "Taslak" })}
                              className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                                blogForm.status === "Taslak" 
                                  ? "bg-slate-150 border-slate-300 text-slate-700 shadow-sm" 
                                  : "bg-white border-slate-200 text-slate-400 hover:text-slate-600"
                              }`}
                            >
                              Taslak (Gizli)
                            </button>
                            <button
                              type="button"
                              onClick={() => setBlogForm({ ...blogForm, status: "Yayında" })}
                              className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                                blogForm.status === "Yayında" 
                                  ? "bg-emerald-50 border-emerald-300 text-emerald-700 shadow-sm" 
                                  : "bg-white border-slate-200 text-slate-400 hover:text-emerald-600"
                              }`}
                            >
                              Yayında (Herkese Açık)
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Content & Editor Area - Right (55%) */}
                      <div className="w-full lg:w-[55%] flex flex-col h-full bg-slate-50/30">
                        {/* Editor Controls Tab */}
                        <div className="px-5 py-3 border-b border-slate-100 bg-white flex items-center justify-between shrink-0">
                          <span className="text-[11px] font-black text-slate-600 flex items-center gap-1.5 uppercase tracking-wider">
                            <Sparkles className="w-4 h-4 text-[#ffb703] animate-pulse" />
                            İçerik Editörü
                          </span>
                          <div className="flex bg-slate-100 p-0.5 rounded-xl">
                            <button
                              type="button"
                              onClick={() => setEditorTab("edit")}
                              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                                editorTab === "edit" ? "bg-white text-[#0b2e59] shadow-sm" : "text-slate-500 hover:text-slate-800"
                              }`}
                            >
                              Düzenle
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditorTab("preview")}
                              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                                editorTab === "preview" ? "bg-white text-[#0b2e59] shadow-sm" : "text-slate-500 hover:text-slate-800"
                              }`}
                            >
                              Gerçek Zamanlı Önizleme
                            </button>
                          </div>
                        </div>

                        {/* Editor Workspace Panels */}
                        <div className="flex-1 p-5 overflow-y-auto flex flex-col">
                          {editorTab === "edit" ? (
                            <div className="h-full flex flex-col flex-1">
                              {/* Quick Template Blocks Injection Toolbar */}
                              <div className="mb-3 flex flex-wrap gap-2 items-center">
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider mr-1">Hazır Bloklar:</span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const snippet = "\n<h2>Yeni Alt Başlık</h2>\n";
                                    setBlogForm(prev => ({ ...prev, content: prev.content + snippet }));
                                    showToast("Alt başlık şablonu eklendi.", "success");
                                  }}
                                  className="px-2 py-1 text-[9px] font-bold bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-slate-600 transition-colors flex items-center gap-1 cursor-pointer"
                                >
                                  <Plus className="w-3 h-3" /> Alt Başlık (H2)
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const snippet = "\n<p>Buraya yeni paragraf metnini yazın...</p>\n";
                                    setBlogForm(prev => ({ ...prev, content: prev.content + snippet }));
                                    showToast("Paragraf şablonu eklendi.", "success");
                                  }}
                                  className="px-2 py-1 text-[9px] font-bold bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-slate-600 transition-colors flex items-center gap-1 cursor-pointer"
                                >
                                  <Plus className="w-3 h-3" /> Paragraf (P)
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const snippet = "\n<div className=\"bg-blue-50 border-l-4 border-[#0b2e59] p-4 rounded-r-xl my-4\">\n  <p className=\"text-[10px] font-black text-[#0b2e59] uppercase tracking-wider\">⚡ ÖNEMLİ GÜVENLİK UYARISI</p>\n  <p className=\"text-xs text-slate-700 font-semibold mt-1\">Buraya elektrik arıza, sigorta veya priz güvenliği uyarınızı girebilirsiniz.</p>\n</div>\n";
                                    setBlogForm(prev => ({ ...prev, content: prev.content + snippet }));
                                    showToast("Önemli uyarı kutusu şablonu eklendi.", "success");
                                  }}
                                  className="px-2 py-1 text-[9px] font-bold bg-blue-50/50 hover:bg-blue-50 border border-blue-100 rounded-lg text-blue-800 transition-colors flex items-center gap-1 cursor-pointer"
                                >
                                  <Plus className="w-3 h-3" /> Uyarı Kutusu
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const snippet = "\n<div className=\"bg-gradient-to-br from-[#0b2e59] to-[#082244] text-white p-6 rounded-2xl text-center my-6 shadow-md border border-slate-800\">\n  <h4 className=\"font-bold text-sm md:text-base\">İstanbul Avrupa Yakası 7/24 Acil Elektrikçi</h4>\n  <p className=\"text-[11px] text-blue-100 mt-1 max-w-md mx-auto font-semibold\">Dakikalar içinde TSE belgeli malzeme ve uzman kadromuzla adresteyiz. En uygun fiyat ve servis garantisi!</p>\n  <a href=\"tel:05368481515\" className=\"inline-flex items-center gap-1.5 bg-[#ffb703] text-slate-900 font-extrabold text-[10px] px-4 py-2 rounded-lg shadow-sm hover:scale-105 transition-all mt-3\">\n    📞 Hemen Ustayı Ara: 0536 848 15 15\n  </a>\n</div>\n";
                                    setBlogForm(prev => ({ ...prev, content: prev.content + snippet }));
                                    showToast("7/24 Elektrikçi CTA şablonu eklendi.", "success");
                                  }}
                                  className="px-2 py-1 text-[9px] font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 border border-amber-600/10 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                                >
                                  <Plus className="w-3 h-3" /> 7/24 Destek (CTA)
                                </button>
                              </div>

                              <textarea
                                value={blogForm.content}
                                onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                                className="w-full flex-1 p-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0b2e59]/20 transition-all text-xs font-mono text-slate-700 leading-relaxed resize-none min-h-[320px] shadow-sm"
                                placeholder="Makale içeriğini buraya yazın. Yukarıdaki hazır şablon butonlarını kullanarak hızlıca alt başlıklar, paragraflar, dikkat çekici kutular veya 7/24 ustayı arama butonları yerleştirebilirsiniz!"
                              />
                              <div className="mt-2.5 p-3.5 bg-blue-50/50 border border-blue-100 rounded-xl">
                                <p className="text-[10px] text-[#0b2e59] leading-relaxed font-semibold">
                                  💡 <b>İpucu:</b> Editörümüz HTML formatını tam olarak destekler. Yukarıdaki pratik butonlar sayesinde doğrudan kod yazmadan arama motoru dostu zengin makaleler oluşturabilirsiniz.
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div className="bg-white border border-slate-200 rounded-2xl p-6 min-h-[350px] overflow-y-auto shadow-sm prose prose-slate max-w-none">
                              {blogForm.title && (
                                <h1 className="text-2xl font-black text-[#0b2e59] border-b border-slate-100 pb-3 mb-4 leading-tight">
                                  {blogForm.title}
                                </h1>
                              )}
                              <div 
                                className="text-slate-700 text-xs md:text-sm leading-relaxed space-y-4"
                                dangerouslySetInnerHTML={{ __html: blogForm.content || "<p class='text-slate-400 italic text-xs font-bold'>Yazı içeriği boş. Bir şeyler yazarak önizleyebilirsiniz.</p>" }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Modal Footer */}
                    <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3 shrink-0">
                      <button 
                        onClick={() => setBlogModalOpen(false)} 
                        className="px-4 py-2 font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors text-xs cursor-pointer"
                      >
                        İptal
                      </button>
                      <button 
                        onClick={handleSaveBlog} 
                        className="px-6 py-2.5 font-extrabold text-white bg-[#0b2e59] hover:bg-[#082244] rounded-xl transition-all shadow-md text-xs cursor-pointer active:scale-95 flex items-center gap-1.5"
                      >
                        <Save className="w-4 h-4" /> Makaleyi Kaydet
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

    </>
  );
}

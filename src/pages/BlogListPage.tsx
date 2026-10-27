import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import MobileCallBar from '../components/MobileCallBar';
import { blogPosts, BlogPost } from '../data/blogPosts';
import { useCollection } from '../utils/firebaseHooks';
import { 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  Calendar, 
  Search, 
  X, 
  SlidersHorizontal, 
  PhoneCall, 
  ShieldCheck, 
  Sparkles,
  BookOpen,
  ChevronDown
} from 'lucide-react';
import AdBanner from '../components/AdBanner';
import fallbackImage from '../assets/images/new_clean_electrical_panel_1781958517638.jpg';

export default function BlogListPage() {
  const { data: dbBlogPosts } = useCollection("blogPosts");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tümü");

  // Combine static and dynamic blog posts
  const combinedPosts = useMemo(() => {
    const publishedDbPosts = (dbBlogPosts || [])
      .filter((post: any) => post.status === "Yayında")
      .map((post: any) => {
        const staticMatch = blogPosts.find(p => p.slug === post.slug);
        return {
          id: post.id,
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          date: post.date || new Date().toLocaleDateString("tr-TR"),
          readTime: post.readTime || "4 Dk",
          imageUrl: staticMatch?.imageUrl || post.imageUrl || post.image || fallbackImage,
          category: post.category || "Genel",
          tags: post.tags || []
        };
      });

    const all: BlogPost[] = [...publishedDbPosts];
    blogPosts.forEach(staticPost => {
      if (!all.some(p => p.slug === staticPost.slug)) {
        all.push({
          ...staticPost,
          tags: staticPost.tags || []
        });
      }
    });
    return all;
  }, [dbBlogPosts]);

  // Curated high-level topic pillars to prevent 26-button ribbon clutter
  const TOPIC_PILLARS = [
    { id: "all", label: "Tüm Rehberler", match: () => true },
    { id: "emergency", label: "Acil Arıza & Yangın", match: (cat: string) => /acil|yangın|arıza|güvenlik|şalter|priz|izolasyon/i.test(cat) },
    { id: "panel", label: "Pano & Voltaj", match: (cat: string) => /pano|voltaj|kofana|ölçüm|taahhüt|topraklama|trifaze/i.test(cat) },
    { id: "appliances", label: "Klima & Cihaz", match: (cat: string) => /klima|kombi|cihaz|mutfak|beyaz|şofben|iklimlendirme/i.test(cat) },
    { id: "commercial", label: "Sanayi & Ticari", match: (cat: string) => /sanayi|ticari|endüstriyel|fuar|medikal|bina|site/i.test(cat) },
    { id: "smart", label: "Akıllı Ev & Zayıf Akım", match: (cat: string) => /akıllı|network|aydınlatma|enerji/i.test(cat) },
  ];

  const [activeTopic, setActiveTopic] = useState("all");
  const [activeSubCategory, setActiveSubCategory] = useState("all");

  // Sorted list of all individual sub-categories for dropdown
  const subCategories = useMemo(() => {
    const list = Array.from(new Set(combinedPosts.map(p => p.category).filter(Boolean))) as string[];
    return list.sort((a, b) => a.localeCompare(b, "tr"));
  }, [combinedPosts]);

  // Filter posts based on search query, topic cluster, and specific sub-category
  const filteredPosts = useMemo(() => {
    const activePillar = TOPIC_PILLARS.find(p => p.id === activeTopic) || TOPIC_PILLARS[0];

    return combinedPosts.filter(post => {
      // 1. Topic pillar check
      if (activeTopic !== "all" && !activePillar.match(post.category || "")) {
        return false;
      }

      // 2. Exact sub-category check (if user picked from dropdown)
      if (activeSubCategory !== "all" && post.category !== activeSubCategory) {
        return false;
      }

      // 3. Search query check
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const titleMatch = post.title?.toLowerCase().includes(q);
      const excerptMatch = post.excerpt?.toLowerCase().includes(q);
      const categoryMatch = post.category?.toLowerCase().includes(q);
      const tagsMatch = post.tags?.some((t: string) => t.toLowerCase().includes(q));

      return titleMatch || excerptMatch || categoryMatch || tagsMatch;
    });
  }, [combinedPosts, activeTopic, activeSubCategory, searchQuery]);

  // Featured marquee article (first item when viewing "Tümü" and no search query)
  const isDefaultView = activeTopic === "all" && activeSubCategory === "all" && searchQuery.trim() === "";
  const featuredPost = isDefaultView && filteredPosts.length > 0 ? filteredPosts[0] : null;
  const regularPosts = featuredPost ? filteredPosts.slice(1) : filteredPosts;

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleResetFilters = () => {
    setActiveTopic("all");
    setActiveSubCategory("all");
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans pb-[72px] md:pb-0">
      <Helmet>
        <title>Aya Elektrik Blog &amp; Teknik Rehber | Arıza İpuçları ve Güvenlik</title>
        <meta 
          name="description" 
          content="İstanbul genelinde uzman elektrik mühendisleri ve TSE sertifikalı ustalarımız tarafından hazırlanan arıza teşhisi, ev güvenliği ve tesisat standartları rehberi." 
        />
        <link rel="canonical" href="https://ayaelektrik.com/blog" />
        <meta property="og:title" content="Aya Elektrik Blog &amp; Teknik Rehber | Arıza İpuçları ve Güvenlik" />
        <meta property="og:description" content="Uzman elektrik ustalarımız tarafından hazırlanan arıza çözüm ipuçları, ev güvenliği standartları ve güncel tesisat yenileme rehberleri." />
        <meta property="og:url" content="https://ayaelektrik.com/blog" />
        <meta property="og:image" content="https://ayaelektrik.com/images/og/blog-og.jpg" />
        <meta property="og:locale" content="tr_TR" />
      
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Aya Elektrik Bilgi Merkezi ve Teknik Rehber",
            "description": "Elektrik arızaları, can ve yangın güvenliği, kaçak akım rölesi ve pano tesisatı rehberleri.",
            "url": "https://ayaelektrik.com/blog"
          }`}
        </script>
      </Helmet>

      <Navbar />
      
      <main className="flex-1">
        {/* Editorial Hero Header */}
        <header className="bg-gradient-to-b from-[#0b2e59] via-[#092547] to-[#0b2e59] text-white pt-20 pb-16 px-4 sm:px-6 border-b border-white/10">
          <div className="max-w-6xl mx-auto text-center">
            
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#ffb703] uppercase tracking-wider mb-4 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Teknik Bilgi Bankası &amp; Arıza Kılavuzu</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 leading-tight tracking-tight text-white max-w-3xl mx-auto [text-wrap:balance]">
              Elektrik Arıza, Güvenlik ve Tesisat Rehberleri
            </h1>
            
            <p className="text-slate-200 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed [text-wrap:balance]">
              İstanbul genelinde TSE belgeli usta kadromuz ve EMO tescilli mühendislerimiz tarafından derlenen güncel teknik ipuçları, can güvenliği yönergeleri ve arıza çözümleri.
            </p>

            {/* Interactive Real-Time Search Bar */}
            <div className="mt-8 max-w-2xl mx-auto relative">
              <div className="relative flex items-center">
                <Search className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Arıza tipi, sigorta, priz, pano veya klima araması yapın..."
                  className="w-full pl-12 pr-10 py-3.5 bg-white text-slate-900 rounded-2xl text-sm font-medium placeholder:text-slate-400 shadow-xl border border-white/20 focus:outline-none focus:ring-4 focus:ring-[#ffb703]/30 transition-all"
                  aria-label="Rehberlerde ve arıza konularında ara"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3.5 p-1 text-slate-400 hover:text-slate-600 rounded-lg"
                    aria-label="Aramayı Temizle"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

          </div>
        </header>

        {/* Category Filter Toolbar & Results Bar */}
        <section className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 py-3 px-4 sm:px-6 shadow-xs">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
            
            {/* Left Zone: 5 Curated Core Topic Tabs + Granular Sub-Category Dropdown */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Segmented Top Pillars */}
              <nav 
                className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5"
                aria-label="Ana konulara göre filtrele"
              >
                {TOPIC_PILLARS.map((pillar) => {
                  const isActive = activeTopic === pillar.id && activeSubCategory === "all";
                  return (
                    <button
                      key={pillar.id}
                      type="button"
                      onClick={() => {
                        setActiveTopic(pillar.id);
                        setActiveSubCategory("all");
                      }}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap shrink-0 transition-all ${
                        isActive
                          ? "bg-[#0b2e59] text-white shadow-xs"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      {pillar.label}
                    </button>
                  );
                })}
              </nav>

              {/* Granular Sub-Category Dropdown (replaces the messy 26-button ribbon) */}
              <div className="relative inline-flex items-center shrink-0">
                <select
                  value={activeSubCategory}
                  onChange={(e) => {
                    const val = e.target.value;
                    setActiveSubCategory(val);
                    if (val !== "all") {
                      setActiveTopic("all");
                    }
                  }}
                  className={`text-xs font-semibold py-1.5 pl-3 pr-8 rounded-lg border appearance-none transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0b2e59] ${
                    activeSubCategory !== "all"
                      ? "bg-[#0b2e59] text-white border-[#0b2e59]"
                      : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                  }`}
                  aria-label="Detaylı 26 alt kategoriye göre filtrele"
                >
                  <option value="all">Alt Konular ({subCategories.length} Kategori) ▾</option>
                  {subCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <ChevronDown className={`w-3.5 h-3.5 absolute right-2.5 pointer-events-none ${
                  activeSubCategory !== "all" ? "text-white" : "text-slate-400"
                }`} />
              </div>

              {/* Clear Filter Button */}
              {(activeTopic !== "all" || activeSubCategory !== "all" || searchQuery) && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-xs font-bold text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 px-2.5 py-1 rounded-lg transition-colors whitespace-nowrap inline-flex items-center gap-1"
                  title="Filtreleri Temizle"
                >
                  <span>Temizle</span>
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Right Zone: Results Counter & Emergency Hotline Link */}
            <div className="flex items-center justify-between md:justify-end gap-3 text-xs text-slate-500 shrink-0 pt-1 md:pt-0 border-t md:border-t-0 border-slate-100">
              <span className="font-medium whitespace-nowrap">
                <strong className="text-slate-900 tabular-nums">{filteredPosts.length}</strong> teknik rehber
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <a 
                href="tel:05300695393"
                className="inline-flex items-center gap-1 text-[#0b2e59] hover:text-[#ffb703] font-bold transition-colors whitespace-nowrap"
              >
                <PhoneCall className="w-3.5 h-3.5 text-amber-500" />
                <span>Nöbetçi Usta Hattı</span>
              </a>
            </div>

          </div>
        </section>

        {/* Content Container */}
        <section className="py-10 md:py-14 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto space-y-12">

            {/* Back link */}
            <div className="flex items-center justify-between">
              <Link 
                to="/" 
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#0b2e59] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Ana Sayfaya Dön</span>
              </Link>

              {(searchQuery || activeTopic !== "all" || activeSubCategory !== "all") && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-xs font-semibold text-amber-700 hover:text-amber-800 underline"
                >
                  Filtreleri Temizle
                </button>
              )}
            </div>

            {/* Empty State */}
            {filteredPosts.length === 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center max-w-xl mx-auto shadow-sm">
                <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Search className="w-6 h-6" />
                </div>
                <h2 className="text-lg font-bold text-slate-900 mb-2">
                  Aradığınız kriterde rehber bulunamadı
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm mb-6 leading-relaxed">
                  {searchQuery ? `"${searchQuery}" araması` : "Seçtiğiniz kategoride"} içerik listelenemedi. Başka bir anahtar kelime deneyebilir ya da 7/24 nöbetçi ustamıza doğrudan sorabilirsiniz.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="w-full sm:w-auto px-4 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                  >
                    Tüm Rehberleri Göster
                  </button>
                  <a
                    href="tel:05300695393"
                    className="w-full sm:w-auto px-4 py-2.5 text-xs font-black text-slate-950 bg-[#ffb703] hover:bg-[#e0a000] rounded-xl transition-colors inline-flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>0530 069 53 93</span>
                  </a>
                </div>
              </div>
            )}

            {/* Featured Marquee Article Spotlight (When viewing all with no search) */}
            {featuredPost && (
              <article className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
                <div className="grid md:grid-cols-12 gap-0 items-stretch">
                  
                  {/* Left Visual Carrier */}
                  <div className="md:col-span-7 relative overflow-hidden bg-slate-900 min-h-[260px] md:min-h-[380px]">
                    <Link to={`/blog/${featuredPost.slug}`} className="block h-full w-full">
                      <img 
                        src={featuredPost.imageUrl} 
                        alt={featuredPost.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        fetchPriority="high"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent md:hidden" />
                    </Link>
                  </div>

                  {/* Right Editorial Story */}
                  <div className="md:col-span-5 p-6 sm:p-8 md:p-10 flex flex-col justify-between bg-white">
                    <div>
                      {/* Zero-Pill Unboxed Metadata */}
                      <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold mb-3">
                        <span className="text-[#0b2e59] font-black uppercase tracking-wider">
                          {featuredPost.category}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{featuredPost.readTime} Okuma</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-emerald-700 flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Mühendis Onaylı</span>
                        </span>
                      </div>

                      <Link to={`/blog/${featuredPost.slug}`} className="block group-hover:text-[#0b2e59] transition-colors mb-3">
                        <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug [text-wrap:balance]">
                          {featuredPost.title}
                        </h2>
                      </Link>

                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3 mb-6">
                        {featuredPost.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{featuredPost.date}</span>
                      </div>

                      <Link 
                        to={`/blog/${featuredPost.slug}`}
                        className="inline-flex items-center gap-1.5 font-black text-xs text-[#0b2e59] group-hover:text-amber-600 transition-colors"
                      >
                        <span>Rehberi İncele</span>
                        <ArrowRight className="w-4 h-4 -translate-x-0.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>

                  </div>

                </div>
              </article>
            )}

            {/* Regular Grid of Posts */}
            {regularPosts.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {regularPosts.map((post, idx) => (
                  <React.Fragment key={post.id || post.slug}>
                    <article 
                      className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 group flex flex-col"
                    >
                      {/* Card Thumbnail */}
                      <Link to={`/blog/${post.slug}`} className="block relative overflow-hidden aspect-[16/10] bg-slate-100">
                        <img 
                          src={post.imageUrl} 
                          alt={post.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </Link>

                      {/* Card Body */}
                      <div className="p-5 sm:p-6 flex-1 flex flex-col">
                        
                        {/* Zero-Pill Unboxed Metadata */}
                        <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 mb-2.5">
                          <span className="text-[#0b2e59] font-bold">
                            {post.category}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="inline-flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            <span>{post.readTime}</span>
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{post.date}</span>
                        </div>
                        
                        <Link to={`/blog/${post.slug}`} className="block group-hover:text-[#0b2e59] transition-colors mb-2.5">
                          <h2 className="text-base sm:text-lg font-bold text-slate-900 line-clamp-2 leading-snug">
                            {post.title}
                          </h2>
                        </Link>
                        
                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-5 line-clamp-3 flex-1">
                          {post.excerpt}
                        </p>
                        
                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
                          <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3" />
                            <span>TSE &amp; EMO Uyumlu</span>
                          </span>

                          <Link 
                            to={`/blog/${post.slug}`} 
                            className="inline-flex items-center gap-1 text-xs font-bold text-[#0b2e59] group-hover:text-amber-600 transition-colors"
                          >
                            <span>Oku</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>

                      </div>
                    </article>

                    {/* High CTR In-Feed AdSlot between articles */}
                    {idx === 2 && (
                      <div className="sm:col-span-2 lg:col-span-3">
                        <AdBanner variant="in-feed" className="my-2" />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}

            {/* Fast Dispatch & Master Electrician Consultation Banner */}
            <div className="bg-gradient-to-br from-[#0b2e59] to-[#061833] rounded-3xl p-6 sm:p-8 text-white border border-white/10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <span className="text-[#ffb703] text-xs font-extrabold uppercase tracking-wider block">
                  İstanbul 39 İlçede 7/24 Kesintisiz Hizmet
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Elektrik Arızanız mı Var? Kendinizi Riske Atmayın!
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm max-w-xl leading-relaxed">
                  Pano yangınları, şalter atması veya sigorta arızalarında nöbetçi motorize ekiplerimiz 15-30 dakikada adresinizde.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
                <a
                  href="tel:05300695393"
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#ffb703] hover:bg-[#e0a000] text-slate-950 font-black text-xs sm:text-sm text-center transition-colors shadow-md inline-flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>0530 069 53 93'ü Ara</span>
                </a>
                <a
                  href={`https://wa.me/905300695393?text=${encodeURIComponent('Merhaba Aya Elektrik, blog rehberinizi inceledim. Elektrik arızası / montaj desteği almak istiyorum.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm text-center transition-colors border border-white/20 inline-flex items-center justify-center gap-2"
                >
                  <span>WhatsApp Keşif Talebi</span>
                </a>
              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
      <MobileCallBar />
    </div>
  );
}

import React, { useEffect, useMemo, useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import MobileCallBar from '../components/MobileCallBar';
import AdBanner from '../components/AdBanner';
import { blogPosts, BlogPost } from '../data/blogPosts';
import { useCollection } from '../utils/firebaseHooks';
import {
  ArrowLeft,
  Clock,
  Calendar,
  CheckCircle,
  Share2,
  Copy,
  Check,
  ShieldCheck,
  BookOpen,
  ArrowRight,
  MessageCircle,
  PhoneCall,
  AlertTriangle,
  ListTree,
  ChevronDown,
  ChevronUp,
  FileText
} from 'lucide-react';
import fallbackImage from '../assets/images/new_clean_electrical_panel_1781958517638.jpg';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function BlogPostPage() {
  const { data: dbBlogPosts } = useCollection("blogPosts");
  const { slug } = useParams<{ slug: string }>();
  
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [activeTocId, setActiveTocId] = useState<string>("");
  const [mobileTocOpen, setMobileTocOpen] = useState(true);

  const post = useMemo(() => {
    const dbPost = (dbBlogPosts || []).find((p: any) => p.slug === slug);
    if (dbPost) {
      const staticMatch = blogPosts.find(p => p.slug === slug);
      return {
        id: dbPost.id,
        slug: dbPost.slug,
        title: dbPost.title,
        excerpt: dbPost.excerpt,
        content: dbPost.content,
        date: dbPost.date || new Date().toLocaleDateString("tr-TR"),
        readTime: dbPost.readTime || "4 Dk",
        imageUrl: staticMatch?.imageUrl || dbPost.imageUrl || dbPost.image || fallbackImage,
        category: dbPost.category || "Genel"
      };
    }
    return blogPosts.find((p) => p.slug === slug);
  }, [dbBlogPosts, slug]);

  // Calculate detailed word count & reading time
  const readingStats = useMemo(() => {
    if (!post?.content) return { words: 0, minutes: 4, label: "4 Dk" };
    const plainText = post.content.replace(/<[^>]*>/g, ' ');
    const words = plainText.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(2, Math.ceil(words / 175)); // 175 words/min avg Turkish reading speed
    return {
      words,
      minutes,
      label: `${minutes} Dk`
    };
  }, [post?.content]);

  // Parse HTML content to extract Table of Contents and inject anchor IDs
  const { processedContent, toc } = useMemo(() => {
    if (!post?.content) return { processedContent: '', toc: [] };

    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(post.content, 'text/html');
      const headings = doc.querySelectorAll('h2, h3');
      const items: TocItem[] = [];

      headings.forEach((heading, index) => {
        const text = heading.textContent?.trim() || '';
        if (!text) return;

        // Generate deterministic slug for anchor jump
        const anchorId = `bolum-${index + 1}-${text
          .toLowerCase()
          .replace(/[^a-z0-9ğüşıöç]+/gi, '-')
          .replace(/^-+|-+$/g, '')
          .slice(0, 40)}`;

        heading.setAttribute('id', anchorId);
        // Add scroll margin so sticky header doesn't cover heading
        heading.setAttribute('style', `${heading.getAttribute('style') || ''}; scroll-margin-top: 110px;`);

        items.push({
          id: anchorId,
          text,
          level: heading.tagName.toLowerCase() === 'h2' ? 2 : 3
        });
      });

      return {
        processedContent: doc.body.innerHTML,
        toc: items
      };
    } catch {
      return { processedContent: post.content, toc: [] };
    }
  }, [post?.content]);

  // Handle scroll progress, sticky sub-bar, and active TOC item
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;

      if (totalScroll > 0) {
        const progress = Math.min(100, Math.max(0, (currentScroll / totalScroll) * 100));
        setScrollProgress(progress);
      }

      setShowStickyBar(currentScroll > 320);

      // Track active heading in TOC
      if (toc.length > 0) {
        const headingElements = toc
          .map(item => ({ id: item.id, el: document.getElementById(item.id) }))
          .filter(item => item.el !== null);

        for (let i = headingElements.length - 1; i >= 0; i--) {
          const item = headingElements[i];
          if (item.el) {
            const rect = item.el.getBoundingClientRect();
            if (rect.top <= 140) {
              setActiveTocId(item.id);
              break;
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [toc]);

  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return blogPosts
      .filter((p) => p.slug !== post.slug)
      .slice(0, 3);
  }, [post]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [post]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleSmoothJump = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveTocId(id);
    }
  };

  const remainingMinutes = Math.max(
    1,
    Math.round(readingStats.minutes * (1 - scrollProgress / 100))
  );

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://ayaelektrik.com/blog/${post.slug}`
    },
    "headline": post.title,
    "description": post.excerpt,
    "image": post.imageUrl,
    "author": {
      "@type": "Organization",
      "name": "Aya Elektrik Teknik Ekip"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Aya Elektrik",
      "logo": {
        "@type": "ImageObject",
        "url": "https://ayaelektrik.com/logo.png"
      }
    },
    "datePublished": "2026-06-29",
    "dateModified": "2026-10-17"
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans pb-[72px] md:pb-0">
      
      {/* 1. Global Reading Progress Indicator (Fixed At Viewport Top) */}
      <div
        className="fixed top-0 left-0 right-0 h-1 bg-slate-100 z-50 pointer-events-none"
        aria-hidden="true"
      >
        <div 
          className="h-full bg-gradient-to-r from-[#ffb703] via-amber-400 to-[#0b2e59] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* 2. Sticky Reading Progress Header (Slides down after scrolling past hero) */}
      <div 
        className={`fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs transition-transform duration-300 ${
          showStickyBar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          
          {/* Article Title Snippet */}
          <div className="flex items-center gap-3 min-w-0">
            <Link 
              to="/blog"
              className="text-xs font-bold text-slate-500 hover:text-[#0b2e59] transition-colors shrink-0 hidden sm:inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Rehber</span>
            </Link>
            <span aria-hidden="true" className="text-slate-300 hidden sm:inline">/</span>
            <span className="text-xs sm:text-sm font-bold text-slate-900 truncate">
              {post.title}
            </span>
          </div>

          {/* Reading Stats & Call CTA */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            
            {/* Live Progress & Remaining Time */}
            <div className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-slate-600 bg-slate-100/90 px-2.5 py-1 rounded-lg">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>%{Math.round(scrollProgress)} okundu</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-slate-500 hidden sm:inline">~{remainingMinutes} dk kaldı</span>
            </div>

            {/* Quick Emergency Call Button */}
            <a
              href="tel:05300695393"
              className="px-3 py-1.5 bg-[#0b2e59] hover:bg-[#143f75] text-white rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-1.5 shadow-xs"
            >
              <PhoneCall className="w-3 h-3 text-[#ffb703]" />
              <span className="hidden md:inline">0530 069 53 93</span>
              <span className="md:hidden">Ara</span>
            </a>

          </div>

        </div>
      </div>

      <Helmet>
        <title>{`${post.title} | Aya Elektrik Rehberi`}</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={`https://ayaelektrik.com/blog/${post.slug}`} />
        <meta property="og:title" content={`${post.title} | Aya Elektrik`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={`https://ayaelektrik.com/blog/${post.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={post.imageUrl} />
        <meta property="og:locale" content="tr_TR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${post.title} | Aya Elektrik`} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.imageUrl} />
        <script type="application/ld+json">
          {JSON.stringify(blogSchema)}
        </script>
      </Helmet>

      <Navbar />
      
      <main className="flex-1 bg-white">
        
        {/* Article Header Hero */}
        <div className="relative h-[42vh] min-h-[360px] md:h-[50vh] w-full overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              className="w-full h-full object-cover object-center"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020813] via-[#0b2e59]/85 to-transparent"></div>
          </div>
          
          <div className="absolute inset-0 z-10 flex flex-col justify-end">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-10 w-full">
              <Link to="/blog" className="inline-flex items-center gap-2 text-white/80 hover:text-[#ffb703] text-sm font-semibold mb-4 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Elektrik Rehberine Dön
              </Link>
              
              <div className="mb-2">
                <span className="text-[#ffb703] text-xs font-bold uppercase tracking-wider">
                  {post.category}
                </span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight tracking-tight [text-wrap:balance]">
                {post.title}
              </h1>
              
              {/* Unboxed Metadata & Reading Indicators */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm font-medium text-slate-300">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#ffb703]" />
                  <span>{post.date}</span>
                </div>
                <span aria-hidden="true" className="text-slate-500">·</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#ffb703]" />
                  <span>{readingStats.label} Okuma Süresi</span>
                </div>
                <span aria-hidden="true" className="text-slate-500">·</span>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <FileText className="w-4 h-4 text-[#ffb703]" />
                  <span>{readingStats.words.toLocaleString("tr-TR")} Kelime</span>
                </div>
                <span aria-hidden="true" className="text-slate-500">·</span>
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Teknik Kadro Onaylı</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Article Body & Sidebar */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-16 flex flex-col lg:flex-row gap-10">
          
          {/* Main Article Content */}
          <div className="w-full lg:w-2/3">
            
            {/* Lead Excerpt */}
            {post.excerpt && (
              <div className="p-5 mb-8 bg-slate-50 border border-slate-200 rounded-2xl text-slate-700 text-sm sm:text-base font-medium leading-relaxed italic">
                {post.excerpt}
              </div>
            )}

            {/* High-Conversion Fast Dispatch & Safety Warning Box */}
            <div className="mb-8 p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-black text-amber-900 uppercase tracking-wide">
                      Hayati Güvenlik Uyarısı &amp; Acil Usta Desteği
                    </span>
                    <span className="text-[10px] bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded-full">
                      Yetkisiz Müdahale Etmeyiniz
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-amber-950 mt-1.5 leading-relaxed font-medium">
                    Elektrikli şofben, klima ve sigorta panosu gibi yüksek akım gerektiren noktalarda yanlış kablo seçimi ölümcül yangın ve çarpılma riski doğurur. İstanbul'un 39 ilçesinde <strong>15-30 dakikada nöbetçi motorize usta</strong> çağırabilirsiniz.
                  </p>
                  
                  <div className="mt-3.5 flex flex-wrap items-center gap-3">
                    <a
                      href="tel:+905300695393"
                      className="inline-flex items-center gap-2 bg-[#0b2e59] hover:bg-[#143f75] text-white px-4 py-2.5 rounded-xl font-black text-xs transition-colors shadow-sm"
                    >
                      <PhoneCall className="w-3.5 h-3.5 text-[#ffb703]" />
                      <span>Ustayla Görüş (0530 069 53 93)</span>
                    </a>
                    <a
                      href={`https://wa.me/905300695393?text=${encodeURIComponent(`Merhaba Aya Elektrik, ${post.title} makalenizi okudum. Bu konuda acil usta desteği veya keşif rica ediyorum.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2.5 rounded-xl font-bold text-xs transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp'tan Sor</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. In-Article Table of Contents (Mobile & Desktop Quick Jump Card) */}
            {toc.length > 0 && (
              <div className="mb-10 bg-slate-50 rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs">
                <button
                  type="button"
                  onClick={() => setMobileTocOpen(!mobileTocOpen)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-slate-100/70 transition-colors"
                  aria-expanded={mobileTocOpen}
                  aria-controls="article-toc-list"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#0b2e59] text-[#ffb703] flex items-center justify-center shrink-0">
                      <ListTree className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-slate-900 leading-tight">
                        İçindekiler &amp; Hızlı Atlama
                      </h2>
                      <p className="text-[11px] text-slate-500">
                        {toc.length} konu başlığı · İlgili bölüme doğrudan geçiş yapın
                      </p>
                    </div>
                  </div>

                  <div className="text-slate-400 p-1">
                    {mobileTocOpen ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </button>

                {mobileTocOpen && (
                  <nav 
                    id="article-toc-list"
                    className="px-5 pb-5 pt-1 border-t border-slate-200/70 space-y-1.5"
                    aria-label="Makale içindekiler tablosu"
                  >
                    {toc.map((item, idx) => {
                      const isActive = activeTocId === item.id;
                      return (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          onClick={(e) => handleSmoothJump(e, item.id)}
                          className={`group flex items-start gap-2.5 py-1.5 px-2.5 rounded-lg text-xs transition-colors leading-relaxed ${
                            item.level === 3 ? "pl-6" : ""
                          } ${
                            isActive
                              ? "bg-amber-50 text-[#0b2e59] font-bold"
                              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                          }`}
                        >
                          <span className={`text-[11px] font-mono tabular-nums shrink-0 mt-0.5 ${
                            isActive ? "text-amber-600 font-bold" : "text-slate-400"
                          }`}>
                            {String(idx + 1).padStart(2, '0')}.
                          </span>
                          <span className="group-hover:underline">
                            {item.text}
                          </span>
                        </a>
                      );
                    })}
                  </nav>
                )}
              </div>
            )}

            {/* Article Content with Dynamic Injected Heading Anchors */}
            <article
              className="prose prose-slate prose-lg md:prose-xl max-w-none prose-headings:text-[#0b2e59] prose-h2:font-extrabold prose-h3:font-bold prose-p:text-slate-700 prose-p:leading-relaxed prose-a:text-[#0b2e59] prose-a:font-semibold prose-a:underline prose-li:text-slate-700 prose-strong:text-slate-900"
              dangerouslySetInnerHTML={{ __html: processedContent }}
            />
            
            {/* In-Article High-Value Placement */}
            <AdBanner variant="in-article" className="mt-10" />

            {/* Author Byline & Verification */}
            <div className="mt-10 p-5 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col sm:flex-row items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#0b2e59] text-[#ffb703] flex items-center justify-center shrink-0 font-bold text-lg">
                AYA
              </div>
              <div className="flex-1 text-center sm:text-left">
                <div className="text-sm font-bold text-slate-900 flex items-center justify-center sm:justify-start gap-1.5">
                  <span>Aya Elektrik Mühendislik Kadrosu</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Bu rehber, EMO tescilli elektrik mühendislerimiz ve TSE yetkili fen adamlarımız tarafından ulusal elektrik iç tesisleri yönetmeliğine uygun şekilde incelenmiş ve doğrulanmıştır.
                </p>
              </div>
            </div>

            {/* Share and Action Bar */}
            <div className="mt-6 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                  <Share2 className="w-3.5 h-3.5 text-[#0b2e59]" /> Paylaş:
                </span>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`${post.title} - ${window.location.href}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-semibold hover:bg-emerald-100 transition-colors"
                  title="WhatsApp'ta Paylaş"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
                <button
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-200 transition-colors"
                  title="Bağlantıyı Kopyala"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Kopyalandı!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Linki Kopyala</span>
                    </>
                  )}
                </button>
              </div>

              <Link
                to="/blog"
                className="text-xs font-bold text-[#0b2e59] hover:text-[#ffb703] transition-colors"
              >
                Tüm Makaleleri Gör →
              </Link>
            </div>
          </div>
          
          {/* Sidebar */}
          <aside className="w-full lg:w-1/3">
            <div className="sticky top-20 space-y-6">
              
              {/* Desktop Sticky Table of Contents */}
              {toc.length > 0 && (
                <div className="hidden lg:block bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
                  <div className="flex items-center gap-2 mb-3.5 pb-2.5 border-b border-slate-100">
                    <ListTree className="w-4 h-4 text-[#ffb703]" />
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      İçindekiler ({toc.length})
                    </h3>
                  </div>

                  <nav className="space-y-1 max-h-[45vh] overflow-y-auto pr-1 text-xs">
                    {toc.map((item, idx) => {
                      const isActive = activeTocId === item.id;
                      return (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          onClick={(e) => handleSmoothJump(e, item.id)}
                          className={`block py-1.5 px-2 rounded-lg leading-snug transition-all ${
                            item.level === 3 ? "pl-5 text-[11px]" : ""
                          } ${
                            isActive
                              ? "bg-amber-50 text-[#0b2e59] font-bold border-l-2 border-[#ffb703]"
                              : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                          }`}
                          title={item.text}
                        >
                          <span className="line-clamp-1">
                            <span className="text-[10px] font-mono text-slate-400 mr-1.5">
                              {String(idx + 1).padStart(2, '0')}.
                            </span>
                            {item.text}
                          </span>
                        </a>
                      );
                    })}
                  </nav>
                </div>
              )}

              {/* Emergency Call Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-[#0b2e59] mb-3 flex items-center gap-2">
                   Yardıma mı İhtiyacınız Var?
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm mb-5 leading-relaxed">
                  Yazıdaki teknik adımlarda şüpheye düşerseniz veya ekipmanınız eksikse asla riske girmeyin. Uzman ekibimiz 7/24 hizmetinizde.
                </p>
                
                <ul className="space-y-2.5 mb-6">
                   <li className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                     <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> TSE Onaylı Malzeme
                   </li>
                   <li className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                     <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> 30 Dk İçinde Şok Müdahale
                   </li>
                   <li className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                     <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> %100 Garantili İşçilik
                   </li>
                </ul>

                <a 
                  href="tel:+905300695393" 
                  className="w-full flex items-center justify-center gap-2 bg-[#ffb703] hover:bg-[#e0a000] text-[#0b2e59] px-5 py-3 rounded-xl font-bold transition-colors shadow-md text-center text-sm"
                >
                  Hemen Usta Çağır
                </a>
              </div>

              {/* Sidebar Native Placement */}
              <AdBanner variant="sidebar" />
            </div>
          </aside>
          
        </div>

        {/* Related Guides Section */}
        {relatedPosts.length > 0 && (
          <section className="bg-slate-50 border-t border-slate-200 py-12 px-6">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#ffb703]" />
                    İlginizi Çekebilecek Diğer Rehberler
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Elektrik güvenliği, arıza tespitleri ve güncel teknik ipuçları
                  </p>
                </div>
                <Link
                  to="/blog"
                  className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-[#0b2e59] hover:underline"
                >
                  Tümü <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid sm:grid-cols-3 gap-5">
                {relatedPosts.map((rel) => (
                  <Link
                    key={rel.id || rel.slug}
                    to={`/blog/${rel.slug}`}
                    className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col"
                  >
                    <div className="aspect-video relative overflow-hidden bg-slate-100">
                      <img
                        src={rel.imageUrl}
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <span className="absolute top-2 left-2 bg-[#0b2e59] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                        {rel.category}
                      </span>
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-2 group-hover:text-[#ffb703] transition-colors leading-snug mb-2">
                        {rel.title}
                      </h4>
                      <div className="flex items-center justify-between text-[11px] text-slate-400 mt-auto pt-2 border-t border-slate-100">
                        <span>{rel.readTime}</span>
                        <span className="text-[#0b2e59] font-medium group-hover:underline">Oku →</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
      <WhatsAppButton />
      <MobileCallBar />
    </div>
  );
}

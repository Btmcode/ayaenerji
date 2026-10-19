import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import MobileCallBar from '../components/MobileCallBar';
import AdBanner from '../components/AdBanner';
import { blogPosts } from '../data/blogPosts';
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
  MessageCircle
} from 'lucide-react';
import fallbackImage from '../assets/images/new_clean_electrical_panel_1781958517638.jpg';

export default function BlogPostPage() {
  const { data: dbBlogPosts } = useCollection("blogPosts");
  const { slug } = useParams<{ slug: string }>();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalScroll) * 100));
        setScrollProgress(progress);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      {/* Reading Progress Indicator */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-[#ffb703] to-amber-500 z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

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
            <div className="max-w-4xl mx-auto px-6 pb-10 w-full">
              <Link to="/blog" className="inline-flex items-center gap-2 text-white/80 hover:text-[#ffb703] text-sm font-semibold mb-5 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Elektrik Rehberine Dön
              </Link>
              
              <div className="mb-3">
                <span className="bg-[#ffb703] text-[#0b2e59] text-xs font-extrabold px-3 py-1 rounded-md shadow-sm uppercase tracking-wider">
                  {post.category}
                </span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight tracking-tight">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm font-medium text-slate-300">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#ffb703]" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#ffb703]" />
                  <span>{post.readTime} Okuma Süresi</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Teknik Kadro Onaylı</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Article Body & Sidebar */}
        <div className="max-w-4xl mx-auto px-6 py-10 md:py-16 flex flex-col lg:flex-row gap-10">
          
          {/* Main Article Content */}
          <div className="w-full lg:w-2/3">
            {/* Lead Excerpt */}
            {post.excerpt && (
              <div className="p-4 sm:p-5 mb-8 bg-slate-50 border-l-4 border-[#0b2e59] rounded-r-2xl text-slate-700 text-sm sm:text-base font-medium leading-relaxed italic">
                {post.excerpt}
              </div>
            )}

            <article
              className="prose prose-slate prose-lg md:prose-xl max-w-none prose-headings:text-[#0b2e59] prose-h2:font-extrabold prose-h3:font-bold prose-p:text-slate-700 prose-p:leading-relaxed prose-a:text-[#0b2e59] prose-a:font-semibold prose-a:underline prose-li:text-slate-700 prose-strong:text-slate-900"
              dangerouslySetInnerHTML={{ __html: post.content }}
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
            <div className="sticky top-28 space-y-6">
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
            <div className="max-w-4xl mx-auto">
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

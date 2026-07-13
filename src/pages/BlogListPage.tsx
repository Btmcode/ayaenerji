import React, { useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import MobileCallBar from '../components/MobileCallBar';
import { blogPosts } from '../data/blogPosts';
import { useCollection } from '../utils/firebaseHooks';
import { ArrowLeft, ArrowRight, Clock, Calendar } from 'lucide-react';
import fallbackImage from '../assets/images/new_clean_electrical_panel_1781958517638.jpg';

export default function BlogListPage() {
  const { data: dbBlogPosts } = useCollection("blogPosts");

  // Combine static and dynamic blog posts
  const combinedPosts = useMemo(() => {
    const publishedDbPosts = (dbBlogPosts || [])
      .filter((post: any) => post.status === "Yayında")
      .map((post: any) => ({
        id: post.id,
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        date: post.date || new Date().toLocaleDateString("tr-TR"),
        readTime: post.readTime || "4 Dk",
        imageUrl: post.imageUrl || post.image || fallbackImage,
        category: post.category || "Genel"
      }));

    const all = [...publishedDbPosts];
    // Avoid duplicates by slug
    blogPosts.forEach(staticPost => {
      if (!all.some(p => p.slug === staticPost.slug)) {
        all.push(staticPost);
      }
    });
    return all;
  }, [dbBlogPosts]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-[72px] md:pb-0">
      <Helmet>
        <title>Aya Elektrik Blog | Arıza İpuçları ve Güvenlik Rehberi</title>
        <meta name="description" content="Uzman elektrik ustalarımız tarafından hazırlanan arıza çözüm ipuçları, ev güvenliği standartları ve güncel tesisat yenileme rehberleri." />
        <link rel="canonical" href="https://ayaelektrik.com/blog" />
        <meta property="og:title" content="Aya Elektrik Blog | Arıza İpuçları ve Güvenlik Rehberi" />
        <meta property="og:description" content="Uzman elektrik ustalarımız tarafından hazırlanan arıza çözüm ipuçları, ev güvenliği standartları ve güncel tesisat yenileme rehberleri." />
        <meta property="og:url" content="https://ayaelektrik.com/blog" />
        <meta property="og:image" content="https://ayaelektrik.com/images/og/blog-og.jpg" />
        <meta property="og:locale" content="tr_TR" />
      
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Elektrik Blogu",
            "description": "Elektrik arızaları, tasarruf önerileri ve teknik bilgiler hakkında faydalı içerikler.",
            "url": "https://ayaelektrik.com/blog"
          }`}
        </script>
</Helmet>
      <Navbar />
      
      <main className="flex-1">
        {/* Header */}
        <section className="bg-[#0b2e59] text-white pt-24 pb-16 px-6 border-b border-white/10">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Elektrik Rehberi ve Blog</h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
              Uzman elektrik ustalarımız tarafından hazırlanan arıza çözüm ipuçları, ev güvenliği standartları ve güncel tesisat yenileme rehberleri.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-[#0b2e59] font-medium mb-10 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              Ana Sayfaya Dön
            </Link>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {combinedPosts.map((post) => (
                <article 
                  key={post.id} 
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col"
                >
                  <Link to={`/blog/${post.slug}`} className="block relative overflow-hidden aspect-video">
                    <img 
                      src={post.imageUrl} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 bg-[#ffb703] text-[#0b2e59] text-xs font-bold px-3 py-1.5 rounded-lg shadow-md uppercase tracking-wider">
                      {post.category}
                    </div>
                  </Link>
                  <div className="p-6 md:p-8 flex-1 flex flex-col">
                    <div className="flex items-center gap-4 text-xs font-medium text-slate-400 mb-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime} Okuma</span>
                      </div>
                    </div>
                    
                    <Link to={`/blog/${post.slug}`} className="block group-hover:text-[#ffb703] transition-colors mb-3">
                      <h2 className="text-xl font-bold text-[#0b2e59] line-clamp-2 leading-snug">
                        {post.title}
                      </h2>
                    </Link>
                    
                    <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>
                    
                    <Link 
                      to={`/blog/${post.slug}`} 
                      className="inline-flex items-center gap-2 font-bold text-[#0b2e59] group-hover:text-[#ffb703] transition-colors mt-auto w-fit"
                    >
                      Devamını Oku 
                      <ArrowRight className="w-4 h-4 -translate-x-1 group-hover:translate-x-0 transition-transform" />
                    </Link>
                  </div>
                </article>
              ))}
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

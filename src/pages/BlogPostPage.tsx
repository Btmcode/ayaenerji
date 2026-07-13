import React, { useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import MobileCallBar from '../components/MobileCallBar';
import { blogPosts } from '../data/blogPosts';
import { useCollection } from '../utils/firebaseHooks';
import { ArrowLeft, Clock, Calendar, CheckCircle } from 'lucide-react';
import fallbackImage from '../assets/images/new_clean_electrical_panel_1781958517638.jpg';

export default function BlogPostPage() {
  const { data: dbBlogPosts } = useCollection("blogPosts");
  const { slug } = useParams<{ slug: string }>();

  const post = useMemo(() => {
    const dbPost = (dbBlogPosts || []).find((p: any) => p.slug === slug);
    if (dbPost) {
      return {
        id: dbPost.id,
        slug: dbPost.slug,
        title: dbPost.title,
        excerpt: dbPost.excerpt,
        content: dbPost.content,
        date: dbPost.date || new Date().toLocaleDateString("tr-TR"),
        readTime: dbPost.readTime || "4 Dk",
        imageUrl: dbPost.imageUrl || dbPost.image || fallbackImage,
        category: dbPost.category || "Genel"
      };
    }
    return blogPosts.find((p) => p.slug === slug);
  }, [dbBlogPosts, slug]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [post]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

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
      "name": "Aya Elektrik"
    },  
    "publisher": {
      "@type": "Organization",
      "name": "Aya Elektrik",
      "logo": {
        "@type": "ImageObject",
        "url": "https://ayaelektrik.com/images/og/ana-sayfa-og.jpg"
      }
    },
    "datePublished": post.date
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-[72px] md:pb-0">
      <Helmet>
        <title>{post.title} | Aya Elektrik Blog</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={`https://ayaelektrik.com/blog/${post.slug}`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={`https://ayaelektrik.com/blog/${post.slug}`} />
        <meta property="og:image" content={post.imageUrl} />
        <meta property="og:locale" content="tr_TR" />
        <script type="application/ld+json">
          {JSON.stringify(blogSchema)}
        </script>
      </Helmet>
      <Navbar />
      
      <main className="flex-1 bg-white">
        {/* Article Header */}
        <div className="relative h-[40vh] min-h-[350px] md:h-[50vh] w-full overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              className="w-full h-full object-cover object-center"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020813] via-[#0b2e59]/80 to-transparent"></div>
          </div>
          
          <div className="absolute inset-0 z-10 flex flex-col justify-end">
            <div className="max-w-4xl mx-auto px-6 pb-12 w-full">
              <Link to="/blog" className="inline-flex items-center gap-2 text-white/70 hover:text-[#ffb703] font-medium mb-6 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                Blog'a Dön
              </Link>
              
              <div className="mb-4">
                <span className="bg-[#ffb703] text-[#0b2e59] text-xs font-bold px-3 py-1.5 rounded-lg shadow-md uppercase tracking-wider">
                  {post.category}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-slate-300">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#ffb703]" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#ffb703]" />
                  <span>{post.readTime} Okuma Süresi</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Article Body */}
        <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 flex flex-col lg:flex-row gap-12">
          
          {/* Main Content */}
          <article className="prose prose-slate prose-lg md:prose-xl max-w-none prose-headings:text-[#0b2e59] prose-h2:font-extrabold prose-h3:font-bold prose-p:text-slate-700 prose-a:text-[#ffb703] prose-li:text-slate-700 prose-strong:text-slate-900 w-full lg:w-2/3" dangerouslySetInnerHTML={{ __html: post.content }} />
          
          {/* Sidebar */}
          <aside className="w-full lg:w-1/3">
            <div className="sticky top-28 bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-[#0b2e59] mb-4 flex items-center gap-2">
                 Yardıma mı İhtiyacınız Var?
              </h3>
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                Yazıdaki adımları uygularken şüpheye düşerseniz veya teknik donanımınız eksikse asla riske girmeyin. Uzman ekibimiz 7/24 hizmetinizde.
              </p>
              
              <ul className="space-y-3 mb-6">
                 <li className="flex items-center gap-2 text-sm font-semibold text-slate-700"><CheckCircle className="w-4 h-4 text-green-500" /> TSE Onaylı Malzeme</li>
                 <li className="flex items-center gap-2 text-sm font-semibold text-slate-700"><CheckCircle className="w-4 h-4 text-green-500" /> 30 Dk İçinde Şok Müdahale</li>
                 <li className="flex items-center gap-2 text-sm font-semibold text-slate-700"><CheckCircle className="w-4 h-4 text-green-500" /> %100 Garantili İşçilik</li>
              </ul>

              <a 
                href="tel:+905300695393" 
                className="w-full flex items-center justify-center gap-2 bg-[#ffb703] hover:bg-[#e0a000] text-[#0b2e59] px-6 py-3.5 rounded-xl font-bold transition-colors shadow-md text-center"
              >
                Hemen Usta Çağır
              </a>
            </div>
          </aside>
          
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
      <MobileCallBar />
    </div>
  );
}

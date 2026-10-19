import React from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import { ArrowRight, Clock, Calendar } from 'lucide-react';

export default function BlogSection() {
  return (
    <section className="py-20 md:py-28 px-6 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 relative">
          <span className="bg-[#0b2e59]/10 text-[#0b2e59] px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-4 inline-block">Bilgi Bankası</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0b2e59] mb-4">
            Elektrik Rehberi & Güncel Bilgiler
          </h2>
          <div className="w-20 h-1.5 bg-[#ffb703] rounded-full mx-auto"></div>
          <p className="mt-6 text-lg text-slate-500 max-w-2xl mx-auto">
            Ailenizin güvenliği ve sistemlerinizin ömrünü uzatmak için faydalı ipuçları, arıza çözümleri ve uzman önerileri.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.slice(0, 3).map((post) => (
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
                  <h3 className="text-xl font-bold text-[#0b2e59] line-clamp-2 leading-snug">
                    {post.title}
                  </h3>
                </Link>
                
                <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                  {post.excerpt}
                </p>
                
                <Link 
                  to={`/blog/${post.slug}`} 
                  className="inline-flex items-center gap-2 font-bold text-[#0b2e59] group-hover:text-[#ffb703] transition-colors mt-auto w-fit"
                >
                  Yazıyı Oku 
                  <ArrowRight className="w-4 h-4 -translate-x-1 group-hover:translate-x-0 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center">
          <Link 
            to="/blog" 
            className="inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-[#0b2e59] px-8 py-3.5 rounded-xl font-bold transition-colors"
          >
            Tüm Yazıları Gör
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

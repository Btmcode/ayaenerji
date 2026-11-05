import React from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import { ArrowRight, Clock, Calendar } from 'lucide-react';

export default function BlogSection() {
  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="text-xs font-mono font-bold tracking-widest text-amber-600 uppercase mb-2">
            MÜHENDİSLİK BİLGİ BANKASI
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#071d36] tracking-tight">
            Elektrik Rehberi &amp; Teknik Kılavuzlar
          </h2>
          
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Can güvenliği, yangından korunma, şarj istasyonu altyapısı ve sigorta arızaları hakkında deneyimli elektrik ustası tavsiyeleri.
          </p>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {blogPosts.slice(0, 3).map((post) => (
            <article 
              key={post.id} 
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col group"
            >
              <Link to={`/blog/${post.slug}`} className="block relative overflow-hidden aspect-[16/10] bg-slate-900">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-[#071d36]/90 border border-slate-700 text-white text-[11px] font-mono font-medium px-2.5 py-1 rounded">
                  {post.category}
                </div>
              </Link>
              
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs font-mono text-slate-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{post.date}</span>
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>
                  
                  <Link to={`/blog/${post.slug}`} className="block group-hover:text-amber-600 transition-colors mb-2">
                    <h3 className="text-base sm:text-lg font-bold text-[#071d36] leading-snug line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>
                  
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <Link 
                    to={`/blog/${post.slug}`} 
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#071d36] group-hover:text-amber-600 transition-colors"
                  >
                    <span>Yazının Devamı</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Action Link */}
        <div className="text-center">
          <Link 
            to="/blog" 
            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-[#071d36] border border-slate-300 px-6 py-3 rounded-lg font-bold text-xs sm:text-sm transition-colors shadow-xs"
          >
            <span>Tüm 10 Teknik Makaleyi Görüntüle</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}

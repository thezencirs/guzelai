import React, { useState } from "react";
import { TranslationSchema } from "../i18n/translations";
import { ArrowUpRight, BookOpen, Clock, Tag } from "lucide-react";
import {
  AtelierCropMarks,
  AtelierIllustratorStamp,
  AtelierTailorLines,
  BotanicalIllustratorFlourish,
} from "./IllustratorFlourishes";

interface MagazineSectionProps {
  t: TranslationSchema;
  onOpenStudio?: () => void;
}

export const MagazineSection: React.FC<MagazineSectionProps> = ({ t, onOpenStudio }) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedPost, setSelectedPost] = useState<any | null>(null);

  const filteredPosts = t.blog.posts.filter((post) => {
    if (activeCategory === "all") return true;
    return post.category.toLowerCase() === activeCategory.toLowerCase();
  });

  return (
    <section id="magazine-section" className="relative py-20 sm:py-28 bg-[#FAF8F5] border-b border-[#171717]/8 overflow-hidden">
      {/* Atelier Corner Crop Marks */}
      <AtelierCropMarks className="opacity-30" />

      {/* Editorial Watermark Stamp */}
      <div className="absolute right-10 top-16 hidden lg:block opacity-40 pointer-events-none">
        <AtelierIllustratorStamp title="REVUE" subtitle="DIGITAL GAZETTE" year="2026" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-3xl">
          <div className="space-y-3">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#B8A1CF]">
              {t.blog.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#171717] tracking-tight">
              {t.blog.title}
            </h2>
            <p className="text-base text-[#171717]/70 font-normal leading-relaxed">
              {t.blog.subtitle}
            </p>
          </div>
        </div>

        {/* Category Filter Pills (Digital Magazine Tags) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap ${
              activeCategory === "all"
                ? "bg-[#171717] text-white"
                : "bg-white border border-[#171717]/10 text-[#171717]/70 hover:bg-[#FAF8F5]"
            }`}
          >
            Tüm Konular
          </button>
          {t.blog.categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap ${
                activeCategory === cat
                  ? "bg-[#171717] text-white"
                  : "bg-white border border-[#171717]/10 text-[#171717]/70 hover:bg-[#FAF8F5]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Editorial Magazine Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredPosts.map((post, idx) => (
            <article
              key={idx}
              onClick={() => setSelectedPost(post)}
              className="bg-white rounded-3xl p-6 border border-[#171717]/8 hover:border-[#171717]/20 transition-all duration-300 shadow-xs hover:shadow-xl hover:shadow-black/4 flex flex-col justify-between group cursor-pointer"
            >
              <div className="space-y-4">
                {/* Image */}
                <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-[#171717]/5 relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white/95 text-[#171717] backdrop-blur shadow-xs">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Date & Reading time */}
                <div className="flex items-center gap-3 text-xs text-[#171717]/50 font-semibold">
                  <span>{post.date}</span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readMinutes} {t.blog.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-[#171717] group-hover:text-[#E65A7F] transition-colors leading-snug tracking-tight">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-[#171717]/70 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              {/* Read link */}
              <div className="pt-6 border-t border-[#171717]/6 mt-6 flex items-center justify-between text-xs font-bold text-[#171717]">
                <span className="group-hover:text-[#E65A7F] transition">{t.blog.readMore}</span>
                <ArrowUpRight className="w-4 h-4 text-[#171717]/60 group-hover:text-[#E65A7F] transition" />
              </div>
            </article>
          ))}
        </div>

        {/* Post Modal / Reader */}
        {selectedPost && (
          <div
            className="fixed inset-0 z-50 bg-[#171717]/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedPost(null)}
          >
            <div
              className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#171717]/10 space-y-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FAF8F5] text-[#171717] border border-[#171717]/10">
                  {selectedPost.category}
                </span>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="text-xs font-bold text-[#171717]/60 hover:text-[#171717]"
                >
                  Kapat &times;
                </button>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight">
                {selectedPost.title}
              </h3>

              <div className="text-xs text-[#171717]/50 font-semibold">
                {selectedPost.date} &bull; {selectedPost.readMinutes} okuma
              </div>

              <div className="aspect-[16/9] rounded-2xl overflow-hidden">
                <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" />
              </div>

              <p className="text-base text-[#171717]/80 leading-relaxed">
                {selectedPost.excerpt}
              </p>

              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#171717]/8 text-xs text-[#171717]/70 leading-relaxed">
                GuzelAI Medya editoryal ekibi olarak reklam ve yaratıcı teknoloji alanındaki son gelişmeleri bültenimizde ve dijital dergimizde paylaşıyoruz.
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

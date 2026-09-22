import React, { useState } from "react";
import { TranslationSchema } from "../i18n/translations";
import { ArrowUpRight, Check, X, Sparkles } from "lucide-react";
import {
  AtelierCropMarks,
  AtelierIllustratorStamp,
  AtelierTailorLines,
  CoutureSilhouetteSketch,
} from "./IllustratorFlourishes";

interface ProjectsSectionProps {
  t: TranslationSchema;
  onOpenStudio: () => void;
  onOpenProjectBriefModal?: () => void;
}

interface ProjectDetail {
  title: string;
  category: string;
  description: string;
  metric: string;
  color: string;
  image: string;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ t, onOpenStudio }) => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);

  const filterOptions = [
    { id: "all", label: t.projects.filterAll },
    { id: "ai", label: "Yapay Zeka" },
    { id: "content", label: "İçerik & Video" },
    { id: "design", label: "Tasarım & 3D" },
    { id: "media", label: "Dijital Medya" },
  ];

  const filteredProjects = t.projects.items.filter((item) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "ai") return item.category.toLowerCase().includes("yapay") || item.category.toLowerCase().includes("ai");
    if (activeFilter === "content") return item.category.toLowerCase().includes("içerik") || item.category.toLowerCase().includes("content");
    if (activeFilter === "design") return item.category.toLowerCase().includes("tasarım") || item.category.toLowerCase().includes("design");
    if (activeFilter === "media") return item.category.toLowerCase().includes("medya") || item.category.toLowerCase().includes("media");
    return true;
  });

  return (
    <section id="projects-section" className="relative py-20 sm:py-28 bg-[#FAF8F5] border-b border-[#171717]/8 overflow-hidden">
      {/* Atelier Corner Crop Marks */}
      <AtelierCropMarks className="opacity-30" />

      {/* Atelier Floating Stamp */}
      <div className="absolute right-12 top-20 hidden lg:block opacity-40 pointer-events-none">
        <AtelierIllustratorStamp title="LOOKBOOK" subtitle="HAUTE PORTFOLIO" year="2026" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#FB5D2E]">
                {t.projects.badge}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/5 text-[#171717]/60">
                ILLUSTRATION &amp; 3D
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#171717] tracking-tight">
              {t.projects.title}
            </h2>
            <p className="text-base text-[#171717]/70 font-normal leading-relaxed">
              {t.projects.subtitle}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {filterOptions.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition whitespace-nowrap ${
                  activeFilter === filter.id
                    ? "bg-[#171717] text-white"
                    : "bg-white border border-[#171717]/10 text-[#171717]/70 hover:bg-[#FAF8F5]"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetric Editorial Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
          {filteredProjects.map((project, idx) => {
            // Asymmetric widths: 7 cols & 5 cols
            const isWide = idx % 3 === 0 || idx % 3 === 2;
            const colSpan = isWide ? "md:col-span-7" : "md:col-span-5";

            return (
              <div
                key={idx}
                onClick={() => setSelectedProject(project)}
                className={`${colSpan} group cursor-pointer bg-white rounded-3xl overflow-hidden border border-[#171717]/8 hover:border-[#171717]/20 transition-all duration-300 shadow-xs hover:shadow-xl hover:shadow-black/4 flex flex-col`}
              >
                {/* Image Container with Editorial Aspect Ratio */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#171717]/5">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Category Pill */}
                  <div className="absolute top-4 left-4">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-xs backdrop-blur-sm"
                      style={{ backgroundColor: project.color }}
                    >
                      {project.category}
                    </span>
                  </div>

                  {/* Top Right Click Cue */}
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 text-[#171717] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform group-hover:rotate-45 shadow-sm">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#171717] group-hover:text-[#E65A7F] transition-colors tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-sm text-[#171717]/70 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Bottom Metric Bar */}
                  <div className="pt-4 border-t border-[#171717]/6 flex items-center justify-between text-xs">
                    <span className="font-extrabold text-[#171717]" style={{ color: project.color }}>
                      {project.metric}
                    </span>
                    <span className="text-[#171717]/50 group-hover:text-[#171717] font-semibold transition">
                      İncele &rarr;
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Project Detail Modal */}
        {selectedProject && (
          <div
            className="fixed inset-0 z-50 bg-[#171717]/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <div
              className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#171717]/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/9]">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-2"
                    style={{ backgroundColor: selectedProject.color }}
                  >
                    {selectedProject.category}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#171717]">
                    {selectedProject.title}
                  </h3>
                </div>

                <p className="text-base text-[#171717]/80 leading-relaxed">
                  {selectedProject.description}
                </p>

                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#171717]/8 flex items-center justify-between">
                  <span className="text-xs text-[#171717]/60 font-semibold">Kampanya Başarı Metriği:</span>
                  <span className="text-sm font-extrabold text-[#171717]">
                    {selectedProject.metric}
                  </span>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setSelectedProject(null);
                      onOpenStudio();
                    }}
                    className="flex-1 py-3 rounded-full bg-[#171717] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#262626] transition"
                  >
                    <Sparkles className="w-4 h-4 text-[#44BDBD]" />
                    <span>Benzer AI Çekimi Yap</span>
                  </button>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-6 py-3 rounded-full border border-[#171717]/15 text-xs sm:text-sm font-bold text-[#171717] hover:bg-[#FAF8F5] transition"
                  >
                    Kapat
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

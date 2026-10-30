import React, { useState } from 'react';
import { ArrowUpRight, Github, ExternalLink, Filter, Sparkles, Layers, Cpu, Music, Share2 } from 'lucide-react';
import { Project } from '../types';
import { ProjectModal } from './ProjectModal';

interface ProjectsProps {
  projects: Project[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [filter, setFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = [
    { id: 'all', label: 'Semua Karya' },
    { id: 'iot', label: 'IoT & Arduino (Wokwi)' },
    { id: 'creative', label: 'Tata Artistik & Audio' },
    { id: 'pdd', label: 'PDD & Media Sosial' },
  ];

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-20 lg:py-28 border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-semibold text-amber-400 font-mono-code uppercase tracking-wider mb-2">
              03. Achievement & Projects · Work Gallery
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-zinc-100">
              Galeri Proyek & Pengalaman Terpilih
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-xl font-body">
              Dokumentasi karya perancangan sirkuit IoT, tata artistik produksi pertunjukan drama, dan pengelolaan publikasi media sosial.
            </p>
          </div>

          {/* Segmented Filter Control */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-zinc-900 border border-zinc-800 rounded-xl">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-150 whitespace-nowrap cursor-pointer ${
                  filter === cat.id
                    ? 'bg-zinc-100 text-zinc-950 font-semibold shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {filteredProjects.map((project, index) => {
            const isWide = index === 0 || project.featured;
            return (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`group cursor-pointer rounded-2xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900/90 hover:border-zinc-700/80 transition-all duration-300 flex flex-col overflow-hidden ${
                  isWide ? 'lg:col-span-8' : 'lg:col-span-4'
                }`}
              >
                {/* Media Frame */}
                <div className={`relative overflow-hidden bg-zinc-950 border-b border-zinc-800/80 ${isWide ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                  />
                  {/* Category icon overlay */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-zinc-950/80 backdrop-blur-md border border-zinc-800 text-[11px] font-mono-code text-amber-300 flex items-center gap-1.5">
                    {project.category === 'iot' ? (
                      <Cpu className="w-3.5 h-3.5" />
                    ) : project.category === 'creative' ? (
                      <Music className="w-3.5 h-3.5" />
                    ) : (
                      <Share2 className="w-3.5 h-3.5" />
                    )}
                    <span className="capitalize">{project.category}</span>
                  </div>

                  {/* Corner inspect icon */}
                  <div className="absolute top-3 right-3 p-2 rounded-lg bg-zinc-950/80 backdrop-blur-md border border-zinc-700/60 text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-4 h-4 text-amber-400" />
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between space-y-4">
                  <div className="space-y-2">
                    {/* Unboxed clean metadata (NO static pills) */}
                    <div className="flex items-center gap-2 text-xs font-mono-code text-zinc-400">
                      <span className="text-amber-400 uppercase font-semibold">{project.year}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.role}</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold font-heading text-zinc-100 group-hover:text-amber-300 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-zinc-400 line-clamp-2 leading-relaxed font-body">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech stack inline text & links */}
                  <div className="pt-3 border-t border-zinc-800/60 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex flex-wrap items-center gap-1.5 text-zinc-400 font-mono-code">
                      {project.techStack.slice(0, 3).map((tech, i) => (
                        <React.Fragment key={tech}>
                          {i > 0 && <span className="text-zinc-600">/</span>}
                          <span>{tech}</span>
                        </React.Fragment>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 font-mono-code text-zinc-400 shrink-0">
                      <span className="text-amber-400 group-hover:underline inline-flex items-center gap-1 font-medium">
                        Detail Karya <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox / Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

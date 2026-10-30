import React, { useEffect, useState } from 'react';
import { X, ExternalLink, Github, CheckCircle2, Layers, Cpu, Play, Music, Sparkles } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'simulation'>('overview');
  const [imageError, setImageError] = useState(false);
  const [pinState, setPinState] = useState<{ [pin: number]: boolean }>({ 13: true, 12: false, 11: true });

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const togglePin = (pin: number) => {
    setPinState((prev) => ({ ...prev, [pin]: !prev[pin] }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden text-zinc-100 animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-title"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800/80 bg-zinc-950/60 shrink-0">
          <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono-code">
            <span className="text-amber-400 font-semibold uppercase">{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>{project.year}</span>
            <span aria-hidden="true">·</span>
            <span className="hidden sm:inline">{project.role}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label="Tutup modal (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto flex-1 p-6 sm:p-8 space-y-8">
          {/* Title & Subtitle */}
          <div>
            <h2 id="modal-project-title" className="text-2xl sm:text-3xl font-extrabold font-heading text-zinc-100">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 mt-2 font-body">
              {project.subtitle}
            </p>
          </div>

          {/* Project Media Showcase */}
          <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950">
            {!imageError ? (
              <img
                src={project.image}
                alt={project.title}
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-zinc-900 to-zinc-950 text-center">
                <Layers className="w-12 h-12 text-zinc-600 mb-3" />
                <p className="text-sm font-medium text-zinc-300">{project.title}</p>
                <p className="text-xs text-zinc-400 font-mono-code mt-1">Dokumentasi Portofolio Proyek</p>
              </div>
            )}
          </div>

          {/* Interactive Case Study Tabs */}
          <div className="flex items-center gap-1 p-1 bg-zinc-950/80 rounded-lg border border-zinc-800/80 w-fit text-xs font-mono-code">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3.5 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-zinc-800 text-amber-300 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Ringkasan & Hasil
            </button>
            <button
              onClick={() => setActiveTab('architecture')}
              className={`px-3.5 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'architecture'
                  ? 'bg-zinc-800 text-amber-300 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Teknologi & Metode
            </button>
            <button
              onClick={() => setActiveTab('simulation')}
              className={`px-3.5 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'simulation'
                  ? 'bg-zinc-800 text-amber-300 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Simulasi Interaktif
            </button>
          </div>

          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-6 text-sm">
              <div className="space-y-2">
                <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider font-mono-code">
                  Latar Belakang & Deskripsi
                </h3>
                <p className="text-zinc-300 leading-relaxed font-body">
                  {project.extendedDescription}
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider font-mono-code">
                  Poin Capaian & Eksekusi Utama
                </h3>
                <ul className="space-y-2.5">
                  {project.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Tab 2: Architecture */}
          {activeTab === 'architecture' && (
            <div className="space-y-6 text-sm">
              <div className="space-y-3">
                <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider font-mono-code">
                  Stack Alat & Perangkat Terapan
                </h3>
                <div className="flex flex-wrap gap-2 text-xs font-mono-code">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-md bg-zinc-800/80 border border-zinc-700/60 text-zinc-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800 space-y-2 font-mono-code text-xs text-zinc-300">
                <div className="text-amber-400 font-bold">Implementasi Logika Sistem:</div>
                <p className="text-zinc-400 leading-relaxed">
                  Menekankan pada efisiensi eksekusi, pencegahan latensi delay mikrokontroler, serta penataan hierarki estetika visual yang konsisten bagi audiens dan pengguna.
                </p>
              </div>
            </div>
          )}

          {/* Tab 3: Interactive Simulation */}
          {activeTab === 'simulation' && (
            <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-zinc-100 font-heading">
                    {project.category === 'iot'
                      ? 'Simulasi Logika Pin Digital Arduino'
                      : project.category === 'creative'
                      ? 'Simulasi Track Audio Pertunjukan Drama'
                      : 'Simulasi Jadwal Konten Media Sosial PDD'}
                  </h4>
                  <p className="text-xs text-zinc-400 font-mono-code">
                    Interaksi langsung untuk menguji respon komponen
                  </p>
                </div>
              </div>

              {project.category === 'iot' ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-3">
                    {[13, 12, 11].map((pin) => (
                      <div
                        key={pin}
                        onClick={() => togglePin(pin)}
                        className={`p-3 rounded-lg border transition-all cursor-pointer flex flex-col justify-between ${
                          pinState[pin]
                            ? 'bg-amber-400/10 border-amber-400 text-amber-300'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                        }`}
                      >
                        <div className="text-xs font-mono-code">PIN D{pin} (Digital)</div>
                        <div className="text-lg font-bold font-mono-code mt-2">
                          {pinState[pin] ? 'HIGH (1)' : 'LOW (0)'}
                        </div>
                        <div className="text-[10px] mt-1 font-mono-code">
                          {pinState[pin] ? 'LED Menyala' : 'LED Padam'}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-zinc-500 font-mono-code">
                    Klik pin untuk menyimulasikan perubahan status input/output seperti pada platform Wokwi.
                  </p>
                </div>
              ) : (
                <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 space-y-2 text-xs font-mono-code text-zinc-300">
                  <div className="flex items-center justify-between text-amber-400 font-semibold">
                    <span>Status Pelaksanaan: Selesai</span>
                    <span>100% Tercapai</span>
                  </div>
                  <p className="text-zinc-400">
                    Proyek berhasil dipentaskan dan didokumentasikan dengan alur koordinasi tim yang rapi serta apresiasi positif dari audiens sekolah.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-t border-zinc-800/80 bg-zinc-950/60 shrink-0">
          <div className="flex items-center gap-4 text-xs font-mono-code text-zinc-400">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-zinc-100 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Repositori</span>
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 transition-colors font-semibold"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Buka Referensi Wokwi</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium rounded-lg border border-zinc-700 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer"
          >
            Tutup Tampilan
          </button>
        </div>
      </div>
    </div>
  );
};

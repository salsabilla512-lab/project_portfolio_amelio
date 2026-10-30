import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Phone } from 'lucide-react';
import { ProfileData } from '../types';

interface FooterProps {
  profile: ProfileData;
  openResume: () => void;
  openCustomizer: () => void;
}

export const Footer: React.FC<FooterProps> = ({ profile, openResume, openCustomizer }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-14 bg-zinc-950 border-t border-zinc-800 text-zinc-400 text-xs font-mono-code">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-zinc-800/60">
          <div>
            <div className="text-base font-bold font-heading text-zinc-100">{profile.name}</div>
            <p className="text-zinc-500 mt-1 max-w-md font-body">
              NIM: {profile.nim} · {profile.prodi} · {profile.university}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <a href="#about" className="hover:text-zinc-200 transition-colors">Tentang</a>
            <a href="#services" className="hover:text-zinc-200 transition-colors">Keahlian</a>
            <a href="#projects" className="hover:text-zinc-200 transition-colors">Proyek</a>
            <a href="#sandbox" className="hover:text-zinc-200 transition-colors">Lab IoT</a>
            <a href="#skills" className="hover:text-zinc-200 transition-colors">Pendidikan</a>
            <button
              onClick={openResume}
              className="text-amber-400 hover:text-amber-300 font-semibold cursor-pointer"
            >
              CV ATS
            </button>
            <button
              onClick={openCustomizer}
              className="text-zinc-400 hover:text-zinc-100 cursor-pointer"
            >
              Rubrik Tugas
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-zinc-500">
          <div>
            © {new Date().getFullYear()} {profile.name}. Portofolio Akademik & Penugasan Sistem Informasi UNESA.
          </div>

          <div className="flex items-center gap-6">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-zinc-300 transition-colors flex items-center gap-1.5"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-zinc-300 transition-colors flex items-center gap-1.5"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="hover:text-zinc-300 transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email</span>
            </a>
            <button
              onClick={scrollToTop}
              className="hover:text-zinc-200 transition-colors flex items-center gap-1 cursor-pointer"
              aria-label="Kembali ke atas"
            >
              <span>Atas</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

import React, { useState } from 'react';
import { ArrowUpRight, Github, Linkedin, Mail, MapPin, Download, Phone, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';
import { ProfileData } from '../types';

interface HeroProps {
  profile: ProfileData;
  openResume: () => void;
  openContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ profile, openResume, openContact }) => {
  const [imageLoaded, setImageLoaded] = useState(true);

  return (
    <section id="about" className="relative pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            {/* Kicker with unboxed metadata separator */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium font-mono-code tracking-wide text-zinc-400">
              <span className="text-amber-400 font-bold uppercase">{profile.prodi}</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span className="text-zinc-200 font-semibold">{profile.university}</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span className="text-zinc-400">NIM: {profile.nim}</span>
            </div>

            {/* Display Headline with balance */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-heading text-zinc-100 leading-[1.15] [text-wrap:balance]">
              {profile.name}
            </h1>

            {/* Sub-headline / Headline */}
            <p className="text-lg sm:text-xl font-medium text-amber-300/90 font-heading">
              {profile.headline}
            </p>

            {/* Bio paragraph */}
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-body">
              {profile.bio}
            </p>

            {/* Aktivitas Utama */}
            <div className="space-y-2 pt-1">
              <span className="text-xs font-mono-code uppercase tracking-wider text-zinc-400 block font-semibold">
                Fokus Aktivitas & Pengembangan:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono-code text-zinc-300">
                {profile.activities.map((act, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-zinc-900/60 border border-zinc-800/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                    <span className="truncate">{act}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Availability status line */}
            <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono-code pt-1">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{profile.status}</span>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold rounded-lg bg-zinc-100 text-zinc-950 hover:bg-white hover:shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                <span>Lihat Karya & Proyek</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href={profile.cvPdfUrl}
                download="CV_ATS_Salsabilla_Atha.pdf"
                className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-semibold rounded-lg bg-amber-400 text-zinc-950 hover:bg-amber-300 transition-all cursor-pointer shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>Unduh CV PDF</span>
              </a>

              <button
                onClick={openResume}
                className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-medium rounded-lg border border-zinc-700 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-200 hover:text-white transition-all cursor-pointer"
              >
                <span>Preview CV ATS</span>
              </button>
            </div>

            {/* Social & Contact Bar */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4 border-t border-zinc-800/80 text-xs text-zinc-400 font-mono-code">
              <span className="text-zinc-500 uppercase tracking-wider">Kontak:</span>
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{profile.email}</span>
              </a>
              <span aria-hidden="true" className="text-zinc-700 hidden sm:inline">·</span>
              <a
                href={`https://wa.me/6287735633492`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{profile.phone}</span>
              </a>
              <span aria-hidden="true" className="text-zinc-700 hidden sm:inline">·</span>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-zinc-100 transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
              <span aria-hidden="true" className="text-zinc-700 hidden sm:inline">·</span>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-zinc-100 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            </div>
          </div>

          {/* Right Column: Visual Anchor / Digital Academic Identity Card (No Person Photo) */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900/90 to-zinc-950 p-6 sm:p-7 shadow-2xl space-y-6 relative overflow-hidden group">
              {/* Subtle decorative mesh background glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

              {/* Card Top: Campus & Status Header */}
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 font-bold font-heading text-sm">
                    UNESA
                  </div>
                  <div>
                    <div className="text-xs font-bold font-heading text-zinc-100">
                      Universitas Negeri Surabaya
                    </div>
                    <div className="text-[11px] font-mono-code text-amber-400">
                      S1 Sistem Informasi · 2026
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono-code text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Aktif</span>
                </div>
              </div>

              {/* Card Middle: Core Student Identity */}
              <div className="space-y-4">
                <div>
                  <div className="text-[11px] font-mono-code text-zinc-400 uppercase tracking-wider">
                    Nama Lengkap Mahasiswa
                  </div>
                  <div className="text-xl font-bold font-heading text-zinc-100 mt-0.5 leading-snug">
                    {profile.name}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 font-mono-code">
                  <div>
                    <div className="text-[10px] text-zinc-400 uppercase tracking-wider">NIM Mahasiswa</div>
                    <div className="text-sm font-bold text-amber-300 tabular-nums mt-0.5">
                      {profile.nim}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-400 uppercase tracking-wider">Jenjang Studi</div>
                    <div className="text-sm font-semibold text-zinc-200 mt-0.5">
                      S1 (Sarjana)
                    </div>
                  </div>
                </div>

                {/* Focus Areas */}
                <div className="space-y-2 text-xs font-mono-code">
                  <span className="text-[11px] text-zinc-400 uppercase tracking-wider block font-semibold">
                    Konsentrasi & Minat Studi:
                  </span>
                  <div className="space-y-1.5 text-zinc-300">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                      <span>UI/UX Exploration & Desain Grafis</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                      <span>Logika Pemrograman & Sirkuit IoT (Arduino/Wokwi)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                      <span>Tata Artistik Media & Tata Suara Panggung</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Bottom: Verification & QR Style Matrix */}
              <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono-code text-zinc-400">
                <div>
                  <div className="text-[10px] text-zinc-400 uppercase">Verifikasi Portofolio</div>
                  <div className="text-zinc-300 font-semibold text-[11px]">UNESA-SI-26051214177</div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={openResume}
                    className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-amber-300 font-medium text-xs transition-colors cursor-pointer"
                  >
                    Buka CV ATS
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-Column Metric Strip below the split */}
        <div className="mt-12 pt-8 border-t border-zinc-800/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {profile.stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl border border-zinc-800/80 bg-zinc-900/40 hover:bg-zinc-900/70 transition-colors"
              >
                <div className="text-2xl sm:text-3xl font-extrabold font-heading text-zinc-100 tabular-nums">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold text-amber-400/90 mt-1 uppercase tracking-wider font-mono-code">
                  {stat.label}
                </div>
                <div className="text-xs text-zinc-400 mt-1 leading-snug">
                  {stat.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

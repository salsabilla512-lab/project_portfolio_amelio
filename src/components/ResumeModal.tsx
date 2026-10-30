import React, { useState } from 'react';
import { X, Printer, Copy, Check, Download, Mail, MapPin, Phone, Linkedin, ExternalLink } from 'lucide-react';
import { ProfileData } from '../types';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, profile }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyMarkdown = () => {
    const text = `# ${profile.name}
${profile.location} | ${profile.email} | ${profile.phone} | ${profile.linkedin}

## PROFILE
${profile.bio}

## PROJECT
${profile.projects
  .map(
    (p) => `### ${p.title} | ${p.role}
${p.highlights.map((h) => `- ${h}`).join('\n')}`
  )
  .join('\n\n')}

## EXPERIENCES
${profile.experiences
  .map(
    (e) => `### ${e.role} | ${e.company} (${e.period})
${e.description.map((d) => `- ${d}`).join('\n')}`
  )
  .join('\n\n')}

## SKILLS
- Hard Skills: Python (Basic), C/C++ for Arduino (Basic), Wokwi Simulation, Circuit Design Basics, Audio Editing, Microsoft Word, Social Media Management, Content Editing.
- Soft Skills: Creative Thinking, Visual Aesthetic Layout, Event Production, Problem Solving, Team Collaboration.
- Languages: Bahasa Indonesia (Native), English (Elementary).

## EDUCATION
- Universitas Negeri Surabaya (2026 — Present) — S1 Sistem Informasi
- SMA Negeri 1 Cepu (2023 — 2026) — Jurusan IPA
`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-black/85 backdrop-blur-md overflow-y-auto print:p-0 print:bg-white">
      <div
        className="relative w-full max-w-3xl max-h-[92vh] flex flex-col bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden text-zinc-100 print:border-none print:shadow-none print:max-h-none print:bg-white print:text-black"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Toolbar (hidden when printing) */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/80 shrink-0 print:hidden">
          <div className="text-xs font-semibold font-mono-code text-zinc-300 flex items-center gap-2">
            <span className="text-amber-400 font-bold">Format ATS Friendly</span>
            <span aria-hidden="true">·</span>
            <span>CV Salsabilla Atha Athiyya Kurniawan</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={profile.cvPdfUrl}
              download="CV_ATS_Salsabilla_Atha.pdf"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-400 text-zinc-950 hover:bg-amber-300 transition-colors cursor-pointer"
              title="Unduh file PDF resmi"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Unduh PDF Resmi</span>
            </a>

            <button
              onClick={handleCopyMarkdown}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-zinc-700 hover:bg-zinc-800 text-zinc-300 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Tersalin' : 'Salin Teks'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-zinc-700 hover:bg-zinc-800 text-zinc-300 transition-colors cursor-pointer hidden sm:flex"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak / Print</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable ATS Resume Body */}
        <div className="overflow-y-auto flex-1 p-8 sm:p-12 space-y-7 font-body text-zinc-300 print:text-black print:p-0">
          {/* Header */}
          <div className="border-b border-zinc-800 print:border-black pb-5 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold font-heading text-zinc-100 print:text-black tracking-tight">
              {profile.name}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono-code text-zinc-400 print:text-zinc-600 mt-2">
              <span>{profile.location}</span>
              <span>|</span>
              <a href={`mailto:${profile.email}`} className="text-amber-400 print:text-black underline">
                {profile.email}
              </a>
              <span>|</span>
              <span>{profile.phone}</span>
              <span>|</span>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-amber-400 print:text-black underline"
              >
                Linkedin Profile
              </a>
            </div>
          </div>

          {/* Profile Section */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold font-mono-code uppercase tracking-wider text-amber-400 print:text-black border-b border-zinc-800/80 print:border-zinc-300 pb-1">
              PROFILE
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 print:text-zinc-800 leading-relaxed font-body">
              {profile.bio}
            </p>
          </div>

          {/* Projects Section */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold font-mono-code uppercase tracking-wider text-amber-400 print:text-black border-b border-zinc-800/80 print:border-zinc-300 pb-1">
              PROJECT
            </h2>
            {profile.projects.map((proj) => (
              <div key={proj.id} className="space-y-1 text-xs">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-sm text-zinc-100 print:text-black">
                    {proj.title}
                  </span>
                  <span className="text-zinc-400 print:text-zinc-600 font-mono-code">{proj.year}</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-zinc-300 print:text-zinc-700 pl-1">
                  {proj.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Experiences Section */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold font-mono-code uppercase tracking-wider text-amber-400 print:text-black border-b border-zinc-800/80 print:border-zinc-300 pb-1">
              EXPERIENCES
            </h2>
            {profile.experiences.map((exp) => (
              <div key={exp.id} className="space-y-1 text-xs">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-sm text-zinc-100 print:text-black">
                    {exp.role}
                  </span>
                  <span className="text-zinc-400 print:text-zinc-600 font-mono-code">{exp.period}</span>
                </div>
                <div className="text-[11px] text-zinc-400 print:text-zinc-600 font-mono-code">
                  {exp.company}
                </div>
                <ul className="list-disc list-inside space-y-1 text-zinc-300 print:text-zinc-700 pl-1">
                  {exp.description.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Skills Section */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold font-mono-code uppercase tracking-wider text-amber-400 print:text-black border-b border-zinc-800/80 print:border-zinc-300 pb-1">
              SKILLS
            </h2>
            <ul className="list-disc list-inside space-y-1 text-xs text-zinc-300 print:text-zinc-700 pl-1">
              <li>
                <strong className="text-zinc-100 print:text-black">Hard Skills:</strong> Python (Basic), C/C++ for Arduino (Basic), Wokwi Simulation, Circuit Design Basics, Audio Editing, Microsoft Word, Social Media Management, Content Editing.
              </li>
              <li>
                <strong className="text-zinc-100 print:text-black">Soft Skills:</strong> Creative Thinking, Visual Aesthetic Layout, Event Production, Problem Solving, Team Collaboration.
              </li>
              <li>
                <strong className="text-zinc-100 print:text-black">Languages:</strong> Bahasa Indonesia (Native), English (Elementary).
              </li>
            </ul>
          </div>

          {/* Education Section */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold font-mono-code uppercase tracking-wider text-amber-400 print:text-black border-b border-zinc-800/80 print:border-zinc-300 pb-1">
              EDUCATION
            </h2>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-baseline">
                <div>
                  <span className="font-bold text-zinc-100 print:text-black">SMA Negeri 1 Cepu</span>
                  <div className="text-zinc-400 print:text-zinc-600">Jurusan IPA</div>
                </div>
                <span className="font-mono-code text-zinc-400 print:text-zinc-600">2023 — 2026</span>
              </div>
              <div className="flex justify-between items-baseline pt-1">
                <div>
                  <span className="font-bold text-zinc-100 print:text-black">Universitas Negeri Surabaya</span>
                  <div className="text-zinc-400 print:text-zinc-600">S1 Sistem Informasi · NIM: {profile.nim}</div>
                </div>
                <span className="font-mono-code text-zinc-400 print:text-zinc-600">2026 — Present</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

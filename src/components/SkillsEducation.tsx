import React from 'react';
import { GraduationCap, Award, BookOpen, Code2, Check, ArrowRight, Sparkles, Languages, CheckCircle2 } from 'lucide-react';
import { EducationEntry, SkillCategory } from '../types';

interface SkillsEducationProps {
  educationHistory: EducationEntry[];
  skills: SkillCategory[];
  nim: string;
}

export const SkillsEducation: React.FC<SkillsEducationProps> = ({
  educationHistory,
  skills,
  nim,
}) => {
  return (
    <section id="skills" className="py-20 lg:py-28 border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Education History */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="text-xs font-semibold text-amber-400 font-mono-code uppercase tracking-wider mb-2">
                05. Education · Riwayat Pendidikan
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-zinc-100">
                Pendidikan Formal
              </h2>
              <p className="text-sm text-zinc-400 mt-2 font-body">
                Jejak akademis dari SMA jurusan IPA hingga jenjang Sarjana Sistem Informasi di Universitas Negeri Surabaya.
              </p>
            </div>

            {/* Education Timeline Cards */}
            <div className="space-y-4">
              {educationHistory.map((edu, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 space-y-3 hover:border-zinc-700/80 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs font-mono-code text-amber-400 font-semibold uppercase">
                        {edu.level}
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold font-heading text-zinc-100 mt-0.5">
                        {edu.institution}
                      </h3>
                      <p className="text-sm font-medium text-zinc-300 mt-0.5">
                        {edu.major}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-mono-code text-zinc-400 bg-zinc-950 px-2.5 py-1 rounded-md border border-zinc-800">
                        {edu.period}
                      </span>
                    </div>
                  </div>

                  <div className="text-xs text-zinc-400 font-mono-code flex items-center gap-1.5">
                    <span>{edu.location}</span>
                  </div>

                  {edu.notes && (
                    <p className="text-xs text-zinc-400 pt-2 border-t border-zinc-800/80 font-body leading-relaxed">
                      {edu.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Soft Skills & Working Principles */}
            <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/30 space-y-3">
              <h3 className="text-xs font-semibold font-mono-code text-amber-400 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Soft Skills & Karakter Kerja</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono-code text-zinc-300 pt-1">
                {[
                  'Creative Thinking',
                  'Visual Aesthetic Layout',
                  'Event Production',
                  'Problem Solving',
                  'Team Collaboration',
                  'Adaptabilitas Teknologi',
                ].map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Categorized Technical Proficiencies */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="text-xs font-semibold text-amber-400 font-mono-code uppercase tracking-wider mb-2">
                Kompetensi & Perangkat
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-zinc-100">
                Skills & Tech Stack
              </h2>
              <p className="text-sm text-zinc-400 mt-2 font-body">
                Keterampilan teknis terapan, simulasi sistem, tata multimedia, dan produktivitas digital.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {skills.map((cat) => (
                <div
                  key={cat.title}
                  className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900/70 transition-colors space-y-4"
                >
                  <h3 className="text-sm font-semibold font-mono-code uppercase tracking-wider text-zinc-200 border-b border-zinc-800 pb-3 flex items-center justify-between">
                    <span>{cat.title}</span>
                    <Code2 className="w-4 h-4 text-amber-400" />
                  </h3>

                  <div className="space-y-2.5">
                    {cat.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="flex items-center justify-between text-xs font-mono-code"
                      >
                        <span className="text-zinc-300 font-medium">{skill.name}</span>
                        {skill.level && (
                          <span className="text-zinc-500 font-normal">
                            {skill.level}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

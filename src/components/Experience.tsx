import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, Image as ImageIcon } from 'lucide-react';
import { Experience as ExperienceType } from '../types';

interface ExperienceProps {
  experiences: ExperienceType[];
}

export const Experience: React.FC<ExperienceProps> = ({ experiences }) => {
  return (
    <section id="experience" className="py-20 lg:py-28 border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14">
          <div className="text-xs font-semibold text-amber-400 font-mono-code uppercase tracking-wider mb-2">
            06. Experiences · Rekam Jejak & Kontribusi Nyata
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-zinc-100">
            Pengalaman Organisasi & Proyek Lapangan
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-xl font-body">
            Dokumentasi keterlibatan aktif dalam kepanitiaan publikasi dan dokumentasi acara, produksi panggung pertunjukan drama, serta eksplorasi sistem logika IoT.
          </p>
        </div>

        {/* Experience Timeline Cards */}
        <div className="space-y-8">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="p-6 sm:p-8 rounded-2xl border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900/70 transition-all duration-200"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                {/* Content Side */}
                <div className={`${exp.image ? 'lg:col-span-8' : 'lg:col-span-12'} space-y-4`}>
                  <div className="pb-4 border-b border-zinc-800/70 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono-code text-zinc-400 mb-1">
                        <span className="text-amber-400 font-semibold">{exp.company}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-zinc-500">{exp.type}</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold font-heading text-zinc-100">
                        {exp.role}
                      </h3>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs font-mono-code text-zinc-400 shrink-0">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                        <span>{exp.period}</span>
                      </span>
                      <span aria-hidden="true" className="text-zinc-700">·</span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                        <span>{exp.location}</span>
                      </span>
                    </div>
                  </div>

                  {/* Bulleted quantified accomplishments */}
                  <div className="space-y-3">
                    <ul className="space-y-2">
                      {exp.description.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-zinc-300 font-body leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech Skills unboxed */}
                    <div className="pt-3 flex flex-wrap items-center gap-2 text-xs font-mono-code text-zinc-400">
                      <span className="text-zinc-500 uppercase">Keahlian Terapan:</span>
                      {exp.skills.map((skill, si) => (
                        <React.Fragment key={skill}>
                          {si > 0 && <span className="text-zinc-700">·</span>}
                          <span className="text-zinc-300">{skill}</span>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Relevant Image Side */}
                {exp.image && (
                  <div className="lg:col-span-4">
                    <div className="rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 aspect-[4/3] group relative shadow-md">
                      <img
                        src={exp.image}
                        alt={`Dokumentasi ${exp.role}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                      />
                      <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-zinc-950/90 to-transparent text-[11px] font-mono-code text-zinc-300 flex items-center justify-between">
                        <span className="truncate">{exp.company}</span>
                        <span className="text-amber-400/90 shrink-0">Dokumentasi</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

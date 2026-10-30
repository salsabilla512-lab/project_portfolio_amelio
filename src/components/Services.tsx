import React from 'react';
import { Cpu, Palette, Code2, Headphones, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { ServicePillar } from '../types';

interface ServicesProps {
  services: ServicePillar[];
}

export const Services: React.FC<ServicesProps> = ({ services }) => {
  return (
    <section id="services" className="py-20 lg:py-24 border-b border-zinc-800/80 bg-zinc-950/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14">
          <div className="text-xs font-semibold text-amber-400 font-mono-code uppercase tracking-wider mb-2">
            02. What I Can Do · Layanan & Kapabilitas
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-zinc-100">
            Kombinasi Logika Sistem & Kreativitas Digital
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-2xl font-body">
            Fokus keahlian ganda yang memadukan pemikiran komputasional perancangan sirkuit IoT dengan kepekaan tata artistik visual dan multimedia.
          </p>
        </div>

        {/* 2 Main Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((srv, idx) => {
            const isIoT = srv.id === 'iot-logic';
            return (
              <div
                key={srv.id}
                className="p-7 sm:p-9 rounded-2xl border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900/70 hover:border-zinc-700/80 transition-all duration-300 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                      {isIoT ? <Cpu className="w-6 h-6" /> : <Palette className="w-6 h-6" />}
                    </div>
                    <span className="text-xs font-mono-code text-zinc-500 font-semibold">
                      PILAR {idx + 1}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs font-mono-code text-amber-400 font-medium">
                      {srv.subtitle}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold font-heading text-zinc-100 mt-1">
                      {srv.title}
                    </h3>
                  </div>

                  <p className="text-sm text-zinc-300 leading-relaxed font-body">
                    {srv.description}
                  </p>
                </div>

                {/* Tech & Tools List (unboxed) */}
                <div className="pt-4 border-t border-zinc-800/80 space-y-3">
                  <span className="text-xs font-mono-code uppercase tracking-wider text-zinc-400 block font-semibold">
                    Tools & Perangkat yang Digunakan:
                  </span>
                  <div className="flex flex-wrap gap-2 text-xs font-mono-code">
                    {srv.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-3 py-1.5 rounded-lg bg-zinc-950/80 border border-zinc-800 text-zinc-200"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

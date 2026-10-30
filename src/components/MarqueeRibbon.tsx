import React from 'react';

export const MarqueeRibbon: React.FC = () => {
  const items = [
    's1 sistem informasi unesa',
    'simulasi sirkuit iot & wokwi',
    'ui/ux exploration & tata visual',
    'tata artistik panggung drama & audio',
    'staf pdd & manajemen media sosial',
    'pemrograman python & c/c++ arduino',
    'logika sistem & komputasi',
    'kolaborasi kreatif digital',
  ];

  return (
    <div className="w-full overflow-hidden py-3 bg-zinc-900/60 border-y border-zinc-800/80 select-none">
      <div className="flex w-max animate-marquee space-x-6 text-xs font-mono-code uppercase tracking-widest text-zinc-400">
        {[...items, ...items, ...items].map((item, index) => (
          <div key={index} className="flex items-center space-x-6 shrink-0">
            <span>{item}</span>
            <span aria-hidden="true" className="text-amber-400 font-bold">·</span>
          </div>
        ))}
      </div>
    </div>
  );
};

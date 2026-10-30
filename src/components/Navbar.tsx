import React, { useState } from 'react';
import { FileText, SlidersHorizontal, Sun, Moon, Menu, X, Download } from 'lucide-react';

interface NavbarProps {
  name: string;
  isDark: boolean;
  toggleTheme: () => void;
  openResume: () => void;
  openCustomizer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  name,
  isDark,
  toggleTheme,
  openResume,
  openCustomizer,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Tentang', href: '#about' },
    { label: 'Keahlian', href: '#services' },
    { label: 'Proyek', href: '#projects' },
    { label: 'Simulasi IoT', href: '#sandbox' },
    { label: 'Pendidikan & Riwayat', href: '#skills' },
    { label: 'Kontak', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md border-b transition-colors duration-200 bg-zinc-950/85 border-zinc-800/80 text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand title, one line wordmark */}
        <a
          href="#"
          className="text-lg font-bold tracking-tight font-heading whitespace-nowrap shrink-0 hover:text-amber-400 transition-colors flex items-center gap-2"
        >
          <span className="truncate max-w-[200px] sm:max-w-xs">{name}</span>
          <span className="text-zinc-500 font-normal text-xs font-mono-code hidden md:inline">
            / S1 Sistem Informasi UNESA
          </span>
        </a>

        {/* Zone 2: 4-5 single-line nav links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-zinc-400">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-zinc-100 transition-colors whitespace-nowrap shrink-0 relative group py-1"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-200 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action + controls */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={openCustomizer}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-zinc-700 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            title="Kustomisasi Profil & Rubrik Penilaian Tugas"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Rubrik Tugas</span>
            <span className="sm:hidden">Edit</span>
          </button>

          <button
            onClick={toggleTheme}
            aria-label="Toggle tema gelap / terang"
            className="p-2 text-zinc-400 hover:text-zinc-100 rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={openResume}
            className="flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-all duration-150 whitespace-nowrap shrink-0 shadow-sm cursor-pointer active:scale-95"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Lihat CV ATS</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-400 hover:text-zinc-100 rounded-lg hover:bg-zinc-800 cursor-pointer"
            aria-label="Buka menu navigasi"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-zinc-800 bg-zinc-950 px-4 pt-3 pb-6 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-zinc-300 hover:text-amber-400 py-1.5 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

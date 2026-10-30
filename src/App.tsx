import React, { useState, useEffect } from 'react';
import { defaultProfile } from './data/initialData';
import { ProfileData } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MarqueeRibbon } from './components/MarqueeRibbon';
import { Services } from './components/Services';
import { Projects } from './components/Projects';
import { InteractiveSandbox } from './components/InteractiveSandbox';
import { SkillsEducation } from './components/SkillsEducation';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { CustomizerDrawer } from './components/CustomizerDrawer';

export default function App() {
  const [profile, setProfile] = useState<ProfileData>(() => {
    try {
      const saved = localStorage.getItem('folio_profile_salsabilla_v2');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return defaultProfile;
  });

  const [isDark, setIsDark] = useState<boolean>(true);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  // Sync profile changes to localStorage
  const handleUpdateProfile = (updated: ProfileData) => {
    setProfile(updated);
    try {
      localStorage.setItem('folio_profile_salsabilla_v2', JSON.stringify(updated));
    } catch (e) {
      // ignore
    }
  };

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  // Keep html class in sync with theme
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  }, [isDark]);

  return (
    <div className={`min-h-screen transition-colors duration-200 ${isDark ? 'bg-zinc-950 text-zinc-100' : 'bg-zinc-50 text-zinc-900'}`}>
      {/* Top Bar Contract Navigation */}
      <Navbar
        name={profile.name}
        isDark={isDark}
        toggleTheme={toggleTheme}
        openResume={() => setIsResumeOpen(true)}
        openCustomizer={() => setIsCustomizerOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. About Me: Split Hero with Typographic Hierarchy, Portrait, and Metric Strip */}
        <Hero
          profile={profile}
          openResume={() => setIsResumeOpen(true)}
          openContact={() => {
            const el = document.getElementById('contact');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Section Marquee Ribbon */}
        <MarqueeRibbon />

        {/* 2. What I Can Do: Skills & Layanan Pillars */}
        <Services services={profile.services} />

        {/* 3. Achievement & Projects: Selected Works Bento Grid & Lightbox */}
        <Projects projects={profile.projects} />

        {/* 4. Interactive Engineering Lab: Simulasi Sirkuit IoT Arduino Wokwi & Skrip C++/Python */}
        <InteractiveSandbox />

        {/* 5. Riwayat Pendidikan & Tech Stack Matrix */}
        <SkillsEducation
          educationHistory={profile.educationHistory}
          skills={profile.skills}
          nim={profile.nim}
        />

        {/* 6. Experiences: PDD, Produksi Audio Drama & Praktikum IoT */}
        <Experience experiences={profile.experiences} />

        {/* 7. Contact: Call to Action & Formulir Komunikasi */}
        <Contact profile={profile} />
      </main>

      {/* Footer */}
      <Footer
        profile={profile}
        openResume={() => setIsResumeOpen(true)}
        openCustomizer={() => setIsCustomizerOpen(true)}
      />

      {/* ATS Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        profile={profile}
      />

      {/* Assignment Customizer & Rubric Drawer */}
      <CustomizerDrawer
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        profile={profile}
        onUpdateProfile={handleUpdateProfile}
      />
    </div>
  );
}

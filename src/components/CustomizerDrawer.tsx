import React, { useState } from 'react';
import { X, Check, RotateCcw, Copy, CheckCircle2, Sparkles, BookOpen, User, Layers, ShieldCheck } from 'lucide-react';
import { ProfileData } from '../types';
import { defaultProfile } from '../data/initialData';

interface CustomizerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
  onUpdateProfile: (newProfile: ProfileData) => void;
}

export const CustomizerDrawer: React.FC<CustomizerDrawerProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateProfile,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'rubric'>('profile');
  const [formData, setFormData] = useState<ProfileData>(profile);
  const [copiedConfig, setCopiedConfig] = useState(false);
  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    identity: true,
    responsive: true,
    semantic: true,
    iotLab: true,
    projects: true,
    cvAts: true,
    contact: true,
    unesa: true,
  });

  if (!isOpen) return null;

  const handleFieldChange = (field: keyof ProfileData, value: any) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    onUpdateProfile(updated);
  };

  const resetToDefault = () => {
    setFormData(defaultProfile);
    onUpdateProfile(defaultProfile);
  };

  const copyConfigJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(formData, null, 2));
    setCopiedConfig(true);
    setTimeout(() => setCopiedConfig(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-xl h-full bg-zinc-950 border-l border-zinc-800 flex flex-col text-zinc-100 shadow-2xl">
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/60 shrink-0">
          <div>
            <h2 className="text-base font-bold font-heading text-zinc-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Studio Penugasan & Kustomisasi Profil</span>
            </h2>
            <p className="text-xs text-zinc-400 font-mono-code mt-0.5">
              Edit data profil mahasiswa atau periksa rubrik kelengkapan tugas
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 px-6 py-3 border-b border-zinc-800 bg-zinc-950 text-xs font-mono-code">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-amber-400 text-zinc-950 font-bold'
                : 'text-zinc-400 hover:text-zinc-200 bg-zinc-900'
            }`}
          >
            Edit Profil Mahasiswa
          </button>
          <button
            onClick={() => setActiveTab('rubric')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'rubric'
                ? 'bg-amber-400 text-zinc-950 font-bold'
                : 'text-zinc-400 hover:text-zinc-200 bg-zinc-900'
            }`}
          >
            Rubrik Penilaian Tugas
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 text-xs">
          {/* TAB 1: Profile Editor */}
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <div>
                <label className="block font-mono-code uppercase text-zinc-400 mb-1.5">
                  Nama Lengkap Mahasiswa
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleFieldChange('name', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono-code uppercase text-zinc-400 mb-1.5">
                    NIM
                  </label>
                  <input
                    type="text"
                    value={formData.nim}
                    onChange={(e) => handleFieldChange('nim', e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block font-mono-code uppercase text-zinc-400 mb-1.5">
                    Program Studi
                  </label>
                  <input
                    type="text"
                    value={formData.prodi}
                    onChange={(e) => handleFieldChange('prodi', e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono-code uppercase text-zinc-400 mb-1.5">
                  Perguruan Tinggi / Universitas
                </label>
                <input
                  type="text"
                  value={formData.university}
                  onChange={(e) => handleFieldChange('university', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block font-mono-code uppercase text-zinc-400 mb-1.5">
                  Headline Portofolio
                </label>
                <input
                  type="text"
                  value={formData.headline}
                  onChange={(e) => handleFieldChange('headline', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block font-mono-code uppercase text-zinc-400 mb-1.5">
                  Deskripsi Singkat (Bio)
                </label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => handleFieldChange('bio', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono-code uppercase text-zinc-400 mb-1.5">
                    Email Kontak
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleFieldChange('email', e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block font-mono-code uppercase text-zinc-400 mb-1.5">
                    Nomor WhatsApp / Telepon
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => handleFieldChange('phone', e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono-code uppercase text-zinc-400 mb-1.5">
                    LinkedIn URL
                  </label>
                  <input
                    type="text"
                    value={formData.linkedin}
                    onChange={(e) => handleFieldChange('linkedin', e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block font-mono-code uppercase text-zinc-400 mb-1.5">
                    GitHub URL
                  </label>
                  <input
                    type="text"
                    value={formData.github}
                    onChange={(e) => handleFieldChange('github', e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono-code uppercase text-zinc-400 mb-1.5">
                  Pesan Ajakan (Call to Action)
                </label>
                <input
                  type="text"
                  value={formData.callToAction}
                  onChange={(e) => handleFieldChange('callToAction', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          )}

          {/* TAB 2: Assignment Rubric */}
          {activeTab === 'rubric' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
                <div className="font-semibold text-amber-400 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Kesesuaian Rubrik Penilaian Portofolio Mahasiswa</span>
                </div>
                <p className="text-zinc-300 font-body leading-relaxed">
                  Ceklis kelengkapan instrumen penilaian tugas pembuatan portofolio digital:
                </p>
              </div>

              <div className="space-y-2.5 font-mono-code">
                {[
                  {
                    key: 'identity',
                    title: '1. Identitas Akademik Lengkap',
                    detail: 'Menampilkan Nama Lengkap, NIM (26051214177), Program Studi S1 Sistem Informasi, dan Universitas Negeri Surabaya.',
                  },
                  {
                    key: 'projects',
                    title: '2. Portofolio Proyek Terstruktur (3 Bidang)',
                    detail: 'Dokumentasi Proyek Pemrograman & IoT (Wokwi), Pertunjukan Drama, dan Staf PDD & Humas.',
                  },
                  {
                    key: 'iotLab',
                    title: '3. Simulasi Interaktif & Bukti Logika Kode',
                    detail: 'Laboratorium interaktif input sensor Arduino Uno, timing delay, dan generator skrip C++ & Python.',
                  },
                  {
                    key: 'cvAts',
                    title: '4. Lampiran CV ATS & Unduh PDF Resmi',
                    detail: 'Tersedia modal penampil CV format ATS dan tombol pengunduhan langsung file PDF CV asli.',
                  },
                  {
                    key: 'responsive',
                    title: '5. Desain Responsif & Estetis',
                    detail: 'Tampilan rapi dan proporsional di perangkat ponsel (375px), tablet, hingga layar desktop (1440px).',
                  },
                  {
                    key: 'contact',
                    title: '6. Akses Komunikasi & Kontak Lengkap',
                    detail: 'Tautan langsung ke Email (Salsabillaaak32@gmail.com), WhatsApp, LinkedIn, dan GitHub repositori.',
                  },
                ].map((item) => (
                  <label
                    key={item.key}
                    className="flex items-start gap-3 p-3 rounded-lg bg-zinc-900/40 border border-zinc-800/80 cursor-pointer hover:bg-zinc-900/80 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={checklist[item.key] || false}
                      onChange={(e) =>
                        setChecklist({ ...checklist, [item.key]: e.target.checked })
                      }
                      className="mt-1 accent-amber-400 cursor-pointer"
                    />
                    <div>
                      <div className="font-semibold text-zinc-200">{item.title}</div>
                      <div className="text-zinc-400 text-[11px] leading-snug mt-0.5">
                        {item.detail}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-4 px-6 border-t border-zinc-800 bg-zinc-900/80 flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={resetToDefault}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Data</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={copyConfigJSON}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-zinc-700 hover:bg-zinc-800 text-zinc-300 transition-colors cursor-pointer"
            >
              {copiedConfig ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedConfig ? 'Tersalin' : 'Ekspor JSON'}</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-amber-400 text-zinc-950 hover:bg-amber-300 transition-colors cursor-pointer"
            >
              Selesai
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

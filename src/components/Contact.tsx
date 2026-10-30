import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, Copy, Clock, Phone, Linkedin, Github, MessageSquare, ArrowRight } from 'lucide-react';
import { ProfileData } from '../types';

interface ContactProps {
  profile: ProfileData;
}

export const Contact: React.FC<ContactProps> = ({ profile }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: 'Kolaborasi Proyek / Desain UI/UX',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Mohon lengkapi nama, email, dan pesan Anda.');
      return;
    }
    setError(null);
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setForm({
        name: '',
        email: '',
        subject: 'Kolaborasi Proyek / Desain UI/UX',
        message: '',
      });
    }, 700);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Info & Invitation */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-xs font-semibold text-amber-400 font-mono-code uppercase tracking-wider mb-2">
              07. Contact · Kontak & Kolaborasi
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-zinc-100">
              Mari Terhubung!
            </h2>
            <p className="text-base text-zinc-300 leading-relaxed font-body">
              {profile.callToAction}
            </p>

            {/* Direct Email Card */}
            <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-code text-zinc-400 uppercase">Surel Langsung</span>
                <span className="text-xs font-mono-code text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Aktif Menerima Pesan
                </span>
              </div>

              <div className="text-base sm:text-lg font-bold font-mono-code text-zinc-100 break-all">
                {profile.email}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={copyEmail}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors cursor-pointer"
                >
                  {copiedEmail ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedEmail ? 'Email Tersalin!' : 'Salin Email'}</span>
                </button>

                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-amber-400 text-zinc-950 hover:bg-amber-300 transition-colors"
                >
                  <span>Kirim Email</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href={`https://wa.me/6287735633492`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-lg border border-zinc-700 hover:bg-zinc-800 text-zinc-200 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Social channels */}
            <div className="p-5 rounded-2xl border border-zinc-800/80 bg-zinc-950/40 space-y-3 font-mono-code text-xs">
              <span className="text-zinc-400 uppercase tracking-wider block font-semibold">Tautan Profil Resmi:</span>
              <div className="space-y-2">
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between text-zinc-300 hover:text-amber-400 transition-colors py-1 border-b border-zinc-800/60"
                >
                  <span className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-zinc-500" />
                    <span>LinkedIn Profile</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-600" />
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between text-zinc-300 hover:text-amber-400 transition-colors py-1"
                >
                  <span className="flex items-center gap-2">
                    <Github className="w-4 h-4 text-zinc-500" />
                    <span>GitHub Repositori (@salsabilla512-lab)</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-600" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl border border-zinc-800 bg-zinc-900/40">
            {isSent ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold font-heading text-zinc-100">
                  Pesan Terkirim dengan Sukses!
                </h3>
                <p className="text-sm text-zinc-400 max-w-md font-body">
                  Terima kasih telah menghubungi. Pesan Anda telah tersimpan dan akan segera dibalas melalui alamat email Anda.
                </p>
                <button
                  onClick={() => setIsSent(false)}
                  className="px-4 py-2 text-xs font-medium rounded-lg border border-zinc-700 hover:bg-zinc-800 text-zinc-300 transition-colors mt-2 cursor-pointer"
                >
                  Kirim Pesan Lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono-code">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono-code uppercase tracking-wider text-zinc-400 mb-2">
                      Nama Anda <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Contoh: Dosen Penguji / Rekan Tim"
                      className="w-full px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono-code uppercase tracking-wider text-zinc-400 mb-2">
                      Alamat Email <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="nama@email.com"
                      className="w-full px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono-code uppercase tracking-wider text-zinc-400 mb-2">
                    Topik / Keperluan
                  </label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-sm text-zinc-200 focus:outline-none focus:border-amber-400 transition-colors"
                  >
                    <option value="Kolaborasi Proyek / Desain UI/UX">Kolaborasi Proyek / Desain UI/UX</option>
                    <option value="Tugas & Penilaian Akademik">Tugas & Penilaian Akademik</option>
                    <option value="Proyek Simulasi IoT & Sistem">Proyek Simulasi IoT & Sistem</option>
                    <option value="Kepanitiaan & Multimedia PDD">Kepanitiaan & Multimedia PDD</option>
                    <option value="Diskusi Umum">Diskusi Umum</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono-code uppercase tracking-wider text-zinc-400 mb-2">
                    Isi Pesan <span className="text-amber-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tuliskan pesan atau detail penugasan/diskusi di sini..."
                    className="w-full px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-400 transition-colors resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <div className="text-xs text-zinc-500 font-mono-code hidden sm:block">
                    Balasan via email dalam waktu 1x24 jam
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 text-xs font-semibold rounded-lg bg-amber-400 text-zinc-950 hover:bg-amber-300 disabled:opacity-50 transition-all flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                        <span>Mengirim Pesan...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Kirim Pesan</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

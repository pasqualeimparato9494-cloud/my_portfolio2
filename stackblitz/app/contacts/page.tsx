'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

type Lang = 'en' | 'it';

export default function ContactsPage() {
  const searchParams = useSearchParams();
  const langParam = searchParams.get('lang');
  const lang: Lang = langParam === 'en' ? 'en' : 'it';

  const copy = {
    it: {
      back: '← Torna al profilo',
      eyebrow: 'Contatti',
      title: 'Rimaniamo in contatto',
      intro:
        'Qui trovi i miei principali riferimenti professionali e accademici, oppure puoi inviarmi un messaggio diretto tramite il form contatti.',

      linkedinLabel: 'Profilo professionale',
      linkedinTitle: 'LinkedIn',
      linkedinText:
        'Esperienza lavorativa, certificazioni e aggiornamenti di carriera.',

      scholarLabel: 'Profilo accademico',
      scholarTitle: 'Google Scholar',
      scholarText: 'Pubblicazioni, citazioni e attività di ricerca.',

      formLabel: 'Contatto diretto',
      formTitle: 'Modulo contatti',
      formText:
        'Usa questo modulo per inviarmi un messaggio diretto e privato',
      name: 'Nome',
      email: 'Email',
      message: 'Messaggio',
      submit: 'Invia messaggio',
      note:
        'Il modulo utilizza Formspree',
      placeholderName: 'Il tuo nome',
      placeholderEmail: 'tua@email.com',
      placeholderMessage: 'Scrivi qui il tuo messaggio...',
    },

    en: {
      back: '← Back to profile',
      eyebrow: 'Contacts',
      title: 'Get in touch',
      intro:
        'Here you can find my main professional and academic references, or send me a direct message through the contact form.',

      linkedinLabel: 'Professional profile',
      linkedinTitle: 'LinkedIn',
      linkedinText:
        'Work experience, certifications, and career updates.',

      scholarLabel: 'Academic profile',
      scholarTitle: 'Google Scholar',
      scholarText: 'Publications, citations, and research activity.',

      formLabel: 'Direct contact',
      formTitle: 'Contact form',
      formText:
        'Use this form to send me a direct and private message.',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      submit: 'Send message',
      note:
        'This form uses Formspree.',
      placeholderName: 'Your name',
      placeholderEmail: 'your@email.com',
      placeholderMessage: 'Write your message here...',
    },
  } as const;

  const t = copy[lang];

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#06153a] text-white">
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:48px_48px]" />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.10),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.08),transparent_24%)]" />

      <div className="relative mx-auto max-w-4xl px-6 py-6 md:px-8 md:py-8">
        <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-sm">
          <header className="flex items-center justify-between gap-4 border-b border-white/10 px-6 py-6 md:px-10">
            <Link
              href={`/?lang=${lang}`}
              className="inline-flex items-center rounded-full border border-white/15 px-4 py-2 text-sm text-white transition-colors hover:border-sky-400/40 hover:text-sky-300"
            >
              {t.back}
            </Link>
          </header>

          <section className="border-b border-white/10 px-6 py-10 md:px-10 md:py-14">
            <div className="space-y-4">
              <div className="text-xs uppercase tracking-[0.22em] text-slate-400">
                {t.eyebrow}
              </div>

              <h1 className="text-[34px] font-light tracking-[-0.04em] text-white md:text-[56px]">
                {t.title}
              </h1>

              <p className="max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">
                {t.intro}
              </p>
            </div>
          </section>

          <section className="px-6 py-8 md:px-10 md:py-10">
            <div className="grid gap-4">
              <a
                href="https://www.linkedin.com/in/pasquale-imparato-pmp-a10b79169/"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-sky-400/30 md:p-6"
              >
                <div className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  {t.linkedinLabel}
                </div>

                <div className="mt-2 text-[24px] font-light leading-tight tracking-[-0.03em] text-white md:text-[34px]">
                  {t.linkedinTitle}
                </div>

                <p className="mt-3 text-sm leading-relaxed text-slate-300 md:text-[15px]">
                  {t.linkedinText}
                </p>
              </a>

              <a
                href="https://scholar.google.com/citations?user=YOUR_ID"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-sky-400/30 md:p-6"
              >
                <div className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  {t.scholarLabel}
                </div>

                <div className="mt-2 text-[24px] font-light leading-tight tracking-[-0.03em] text-white md:text-[34px]">
                  {t.scholarTitle}
                </div>

                <p className="mt-3 text-sm leading-relaxed text-slate-300 md:text-[15px]">
                  {t.scholarText}
                </p>
              </a>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-6">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  {t.formLabel}
                </div>

                <div className="mt-2 text-[24px] font-light leading-tight tracking-[-0.03em] text-white md:text-[34px]">
                  {t.formTitle}
                </div>

                <p className="mt-3 text-sm leading-relaxed text-slate-300 md:text-[15px]">
                  {t.formText}
                </p>

                <form
                  action="https://formspree.io/f/xaqllaag"
                  method="POST"
                  className="mt-6 space-y-4"
                >
                  <div>
                    <label className="mb-2 block text-sm text-slate-300">
                      {t.name}
                    </label>

                    <input
                      type="text"
                      name="name"
                      required
                      placeholder={t.placeholderName}
                      className="w-full rounded-xl border border-white/10 bg-[#081331] px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-sky-400/40"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">
                      {t.email}
                    </label>

                    <input
                      type="email"
                      name="email"
                      required
                      placeholder={t.placeholderEmail}
                      className="w-full rounded-xl border border-white/10 bg-[#081331] px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-sky-400/40"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">
                      {t.message}
                    </label>

                    <textarea
                      name="message"
                      required
                      rows={6}
                      placeholder={t.placeholderMessage}
                      className="w-full rounded-xl border border-white/10 bg-[#081331] px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-sky-400/40"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex rounded-xl bg-amber-600 px-5 py-3 text-sm font-medium text-slate-950 transition-colors hover:bg-amber-500"
                  >
                    {t.submit}
                  </button>
                </form>

                <p className="mt-4 text-xs text-slate-500">{t.note}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

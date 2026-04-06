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
        'Esperienza lavorativa, background di delivery, certificazioni e aggiornamenti di carriera.',

      scholarLabel: 'Profilo accademico',
      scholarTitle: 'Google Scholar',
      scholarText: 'Pubblicazioni, citazioni e attività di ricerca.',

      formLabel: 'Contatto diretto',
      formTitle: 'Modulo contatti',

      formText:
        'Usa questo modulo invece di mostrare un indirizzo email pubblico nel codice della pagina.',

      name: 'Nome',
      email: 'Email',
      message: 'Messaggio',
      submit: 'Invia messaggio',

      note:
        'Il modulo utilizza Formspree. Puoi sostituire l’endpoint con il tuo backend.',

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
        'Work experience, delivery background, certifications, and career updates.',

      scholarLabel: 'Academic profile',
      scholarTitle: 'Google Scholar',
      scholarText: 'Publications, citations, and research activity.',

      formLabel: 'Direct contact',
      formTitle: 'Contact form',

      formText:
        'Use this form instead of exposing a public email address in the page source.',

      name: 'Name',
      email: 'Email',
      message: 'Message',
      submit: 'Send message',

      note:
        'Replace the form action with your Formspree or backend endpoint.',

      placeholderName: 'Your name',
      placeholderEmail: 'your@email.com',
      placeholderMessage: 'Write your message here...',
    },
  } as const;

  const t = copy[lang];

  return (
    <main className="min-h-screen bg-[#06153a] text-white overflow-x-hidden">

      <div className="absolute inset-0 pointer-events-none opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:48px_48px]" />

      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.10),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.08),transparent_24%)]" />

      <div className="relative max-w-4xl mx-auto px-6 py-6 md:px-8 md:py-8">

        <div className="rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">

          <header className="px-6 md:px-10 py-6 border-b border-white/10 flex items-center justify-between gap-4">

            <Link
              href={`/?lang=${lang}`}
              className="inline-flex items-center rounded-full border border-white/15 px-4 py-2 text-sm text-white hover:border-sky-400/40 hover:text-sky-300 transition-colors"
            >
              {t.back}
            </Link>

          </header>

          <section className="px-6 md:px-10 py-10 md:py-14 border-b border-white/10">

            <div className="space-y-4">

              <div className="text-xs uppercase tracking-[0.22em] text-slate-400">
                {t.eyebrow}
              </div>

              <h1 className="text-[34px] md:text-[56px] font-light tracking-[-0.04em] text-white">
                {t.title}
              </h1>

              <p className="max-w-2xl text-sm md:text-base leading-relaxed text-slate-300">
                {t.intro}
              </p>

            </div>

          </section>

          <section className="px-6 md:px-10 py-8 md:py-10">

            <div className="grid gap-4">

              <a
                href="https://www.linkedin.com/in/pasquale-imparato-pmp-a10b79169/"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-6 hover:border-sky-400/30 transition-colors"
              >
                <div className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  {t.linkedinLabel}
                </div>

                <div className="mt-2 text-[24px] md:text-[34px] leading-tight tracking-[-0.03em] font-light text-white">
                  {t.linkedinTitle}
                </div>

                <p className="mt-3 text-sm md:text-[15px] leading-relaxed text-slate-300">
                  {t.linkedinText}
                </p>

              </a>

              <a
                href="https://scholar.google.com/citations?user=YOUR_ID"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-6 hover:border-sky-400/30 transition-colors"
              >
                <div className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  {t.scholarLabel}
                </div>

                <div className="mt-2 text-[24px] md:text-[34px] leading-tight tracking-[-0.03em] font-light text-white">
                  {t.scholarTitle}
                </div>

                <p className="mt-3 text-sm md:text-[15px] leading-relaxed text-slate-300">
                  {t.scholarText}
                </p>

              </a>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-6">

                <div className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  {t.formLabel}
                </div>

                <div className="mt-2 text-[24px] md:text-[34px] leading-tight tracking-[-0.03em] font-light text-white">
                  {t.formTitle}
                </div>

                <p className="mt-3 text-sm md:text-[15px] leading-relaxed text-slate-300">
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
                    className="inline-flex px-5 py-3 bg-amber-600 text-slate-950 text-sm font-medium hover:bg-amber-500 transition-colors rounded-xl"
                  >
                    {t.submit}
                  </button>

                </form>

                <p className="mt-4 text-xs text-slate-500">
                  {t.note}
                </p>

              </div>

            </div>

          </section>

        </div>

      </div>

    </main>
  );
}

"use client";
import { useEffect, useState } from "react";
import { dict, Lang, TEAM, REVIEWS } from "@/lib/i18n";
import { CLINIC, SERVICES } from "@/lib/clinic";
import BookingForm from "@/components/BookingForm";
import ChatWidget from "@/components/ChatWidget";

const ids = ["services", "team", "gallery", "reviews", "contact"];
const gallery = ["from-[#F6E9D0] to-[#C9A86A]", "from-[#EADBC0] to-[#8C6D2E]", "from-[#FFF5E4] to-[#D9C08A]", "from-[#E9D3B0] to-[#B8954A]", "from-[#F8EEDC] to-[#A88440]", "from-[#F1E2C6] to-[#7A5C25]"];
const gLabels = { en: ["Skin Glow", "Lip Contour", "Laser Results", "Jawline", "Peel Results", "Hair PRP"], ar: ["إشراقة البشرة", "نحت الشفاه", "نتائج الليزر", "خط الفك", "نتائج التقشير", "بلازما الشعر"] };

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const t = dict[lang];
  const wa = `https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent(lang === "ar" ? "مرحباً، أود حجز موعد" : "Hello, I would like to book an appointment")}`;
  useEffect(() => { document.documentElement.lang = lang; document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"; }, [lang]);

  return (
    <main>
      <header className="sticky top-0 z-40 border-b border-gold/20 bg-cream/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="#" className="font-serif text-xl tracking-wide text-ink">Lumière<span className="text-gold">.</span></a>
          <nav className="hidden gap-7 text-sm md:flex">{t.nav.map((n, i) => <a key={n} href={`#${ids[i]}`} className="hover:text-gold">{n}</a>)}</nav>
          <div className="flex items-center gap-3">
            <button onClick={() => setLang(lang === "en" ? "ar" : "en")} className="rounded-full border border-gold/40 px-3 py-1 text-sm text-gold-dark">{lang === "en" ? "العربية" : "English"}</button>
            <a href="#book" className="btn-gold hidden !px-5 !py-2 text-sm sm:inline-block">{t.book}</a>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-br from-cream via-cream-dark to-gold-light/60">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-gold/20 blur-3xl" />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 md:grid-cols-2 md:py-28">
          <div>
            <p className="eyebrow">{t.heroEyebrow}</p>
            <h1 className="mt-4 font-serif text-4xl leading-tight md:text-6xl">{t.heroTitle}</h1>
            <p className="mt-5 max-w-md text-lg text-ink/70">{t.heroSub}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#book" className="btn-gold">{t.book}</a>
              <a href={wa} target="_blank" rel="noreferrer" className="btn-outline">💬 {t.wa}</a>
            </div>
          </div>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm rounded-[2rem] bg-gradient-to-br from-gold-light via-[#E9D6AE] to-gold-dark shadow-2xl">
            <div className="absolute inset-6 rounded-[1.5rem] border border-white/50" />
            <div className="absolute bottom-8 left-8 right-8 rounded-2xl bg-white/80 p-5 backdrop-blur">
              <p className="font-serif text-2xl">4.9 ★</p><p className="text-sm text-ink/70">1,200+ Google reviews</p>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="section-title text-center">{t.servicesT}</h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <div key={s.id} className="rounded-2xl border border-gold/20 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <h3 className="font-serif text-xl">{s[lang]}</h3>
              <p className="mt-2 text-sm text-ink/60">{lang === "en" ? s.dEn : s.dAr}</p>
              <p className="mt-5 text-gold-dark"><span className="text-xs">{t.from} </span><span className="text-2xl font-semibold">{s.price.toLocaleString()}</span> {t.aed}</p>
            </div>))}
        </div>
      </section>

      <section id="team" className="bg-cream-dark/60 py-20">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="section-title text-center">{t.teamT}</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {TEAM.map((d) => (
              <div key={d.en} className="text-center">
                <div className={`mx-auto flex h-44 w-44 items-center justify-center rounded-full bg-gradient-to-br ${d.g} font-serif text-5xl text-white shadow-lg`}>{d.en.split(" ")[1][0]}</div>
                <h3 className="mt-5 font-serif text-xl">{d[lang]}</h3>
                <p className="text-sm text-gold-dark">{lang === "en" ? d.rEn : d.rAr}</p>
              </div>))}
          </div>
        </div>
      </section>

      <section id="gallery" className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="section-title text-center">{t.galleryT}</h2>
        <p className="mt-2 text-center text-xs text-ink/50">{t.galleryNote}</p>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
          {gallery.map((g, i) => (
            <div key={i} className={`flex aspect-square items-end rounded-2xl bg-gradient-to-br ${g} p-4 shadow`}>
              <span className="rounded-full bg-white/80 px-3 py-1 text-xs">{gLabels[lang][i]}</span>
            </div>))}
        </div>
      </section>

      <section id="reviews" className="bg-ink py-20 text-cream">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="section-title text-center !text-cream">{t.reviewsT}</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {REVIEWS.map((r) => (
              <div key={r.n} className="rounded-2xl border border-gold/30 p-7">
                <p className="text-gold">★★★★★</p><p className="mt-3 text-cream/80">“{r[lang]}”</p><p className="mt-4 font-serif text-gold-light">{r.n}</p>
              </div>))}
          </div>
        </div>
      </section>

      <section id="book" className="mx-auto max-w-3xl px-5 py-20">
        <h2 className="section-title text-center">{t.bookT}</h2>
        <BookingForm lang={lang} />
      </section>

      <section id="contact" className="bg-cream-dark/60 py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-2">
          <div>
            <h2 className="section-title">{t.contactT}</h2>
            <p className="mt-6 eyebrow">{t.addrL}</p><p className="mt-1">{CLINIC.address}</p>
            <p className="mt-5 eyebrow">{t.hoursL}</p><p className="mt-1">{CLINIC.hours[lang]}</p>
            <p className="mt-5 eyebrow">{t.phoneL}</p><p className="mt-1" dir="ltr">{CLINIC.phone}</p>
            <a href={wa} target="_blank" rel="noreferrer" className="btn-gold mt-6">💬 {t.wa}</a>
          </div>
          <div className="relative min-h-[260px] overflow-hidden rounded-2xl bg-[repeating-linear-gradient(45deg,#EFE3CB_0_20px,#F6EEDD_20px_40px)] shadow-inner">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="text-4xl">📍</div><p className="mt-2 rounded-full bg-white px-4 py-1 text-sm shadow">Jumeirah 1, Dubai</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-ink py-10 text-center text-sm text-cream/60">
        <p className="font-serif text-xl text-cream">Lumière<span className="text-gold">.</span></p>
        <p className="mt-2">© {new Date().getFullYear()} {CLINIC.name}. {t.rights}</p>
      </footer>
      <ChatWidget lang={lang} />
    </main>
  );
}

"use client";
import { useState } from "react";
import { dict, Lang } from "@/lib/i18n";
import { SERVICES, SLOTS } from "@/lib/clinic";
export default function BookingForm({ lang }: { lang: Lang }) {
  const t = dict[lang];
  const [f, setF] = useState({ name: "", phone: "", service: "", date: "", time: "" });
  const [st, setSt] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const today = new Date().toISOString().split("T")[0];
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setSt("sending");
    try { const r = await fetch("/api/book", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) });
      if (!r.ok) throw new Error(); setSt("ok"); setF({ name: "", phone: "", service: "", date: "", time: "" }); } catch { setSt("err"); }
  }
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setF({ ...f, [k]: e.target.value });
  return (
    <form onSubmit={submit} className="mt-10 grid gap-4 rounded-3xl border border-gold/20 bg-white p-6 shadow-xl sm:grid-cols-2 md:p-10">
      <input required className="input" placeholder={t.name} value={f.name} onChange={set("name")} />
      <input required className="input" type="tel" placeholder={t.phone} value={f.phone} onChange={set("phone")} />
      <select required className="input sm:col-span-2" value={f.service} onChange={set("service")}>
        <option value="">{t.service}</option>
        {SERVICES.map((s) => <option key={s.id} value={s.en}>{s[lang]} — {s.price} {t.aed}</option>)}
      </select>
      <label className="text-sm text-ink/60">{t.date}<input required className="input mt-1" type="date" min={today} value={f.date} onChange={set("date")} /></label>
      <div className="text-sm text-ink/60">{t.time}
        <div className="mt-1 grid grid-cols-5 gap-1">{SLOTS.map((s) => (
          <button type="button" key={s} onClick={() => setF({ ...f, time: s })} className={`rounded-md border py-2 text-xs ${f.time === s ? "border-gold bg-gold text-white" : "border-gold/30 hover:border-gold"}`}>{s}</button>))}
        </div>
      </div>
      <button disabled={st === "sending" || !f.time} className="btn-gold sm:col-span-2 disabled:opacity-60">{st === "sending" ? t.sending : t.submit}</button>
      {st === "ok" && <p className="text-green-700 sm:col-span-2">{t.ok}</p>}
      {st === "err" && <p className="text-red-600 sm:col-span-2">{t.err}</p>}
    </form>
  );
}

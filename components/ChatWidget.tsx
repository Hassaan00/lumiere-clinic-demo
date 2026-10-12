"use client";
import { useEffect, useRef, useState } from "react";
import { dict, Lang } from "@/lib/i18n";
type Msg = { role: "user" | "assistant"; content: string };
export default function ChatWidget({ lang }: { lang: Lang }) {
  const t = dict[lang];
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => { end.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, open]);
  async function send(e: React.FormEvent) {
    e.preventDefault(); if (!input.trim() || busy) return;
    const next: Msg[] = [...msgs, { role: "user", content: input.trim() }];
    setMsgs(next); setInput(""); setBusy(true);
    try { const r = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: next }) });
      const d = await r.json(); setMsgs([...next, { role: "assistant", content: d.reply }]);
    } catch { setMsgs([...next, { role: "assistant", content: t.err }]); } finally { setBusy(false); }
  }
  return (
    <div className="fixed bottom-5 end-5 z-50">
      {open && (
        <div className="mb-3 flex h-[28rem] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-gold/30 bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-gradient-to-r from-gold to-gold-dark px-4 py-3 text-white">
            <span className="font-serif">✨ {t.chatT}</span><button onClick={() => setOpen(false)} aria-label="close">✕</button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto bg-cream p-4 text-sm">
            <div className="max-w-[85%] rounded-2xl bg-white p-3 shadow-sm">{t.chatHi}</div>
            {msgs.map((m, i) => <div key={i} dir="auto" className={`max-w-[85%] whitespace-pre-wrap rounded-2xl p-3 shadow-sm ${m.role === "user" ? "ms-auto bg-gold text-white" : "bg-white"}`}>{m.content}</div>)}
            {busy && <div className="w-12 rounded-2xl bg-white p-3 text-center shadow-sm">…</div>}
            <div ref={end} />
          </div>
          <form onSubmit={send} className="flex gap-2 border-t border-gold/20 p-3">
            <input dir="auto" className="flex-1 rounded-full border border-gold/30 px-4 py-2 text-sm outline-none focus:border-gold" placeholder={t.chatPh} value={input} onChange={(e) => setInput(e.target.value)} />
            <button className="rounded-full bg-gold px-4 text-sm text-white">{t.send}</button>
          </form>
        </div>)}
      <button onClick={() => setOpen(!open)} className="ms-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-dark text-2xl text-white shadow-xl shadow-gold/40" aria-label="chat">{open ? "✕" : "💬"}</button>
    </div>
  );
}

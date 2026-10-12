import { NextResponse } from "next/server";
import { CLINIC, SERVICES, SLOTS } from "@/lib/clinic";
type Msg = { role: "user" | "assistant"; content: string };
const SYSTEM = `You are the friendly virtual receptionist of ${CLINIC.name} in Dubai.
Services and starting prices:
${SERVICES.map((s) => `- ${s.en} (${s.ar}): from AED ${s.price}. ${s.dEn}`).join("\n")}
Hours: ${CLINIC.hours.en}. Location: ${CLINIC.address}. Phone/WhatsApp: ${CLINIC.phone}. Booking slots: ${SLOTS.join(", ")}.
Rules: Always reply in the same language the user writes in (Arabic or English). Keep answers short (2-4 sentences), warm and premium.
Never give medical diagnoses; suggest a consultation. Always guide the user to book via the "Book Now" form on the website or WhatsApp.`;

function fallback(text: string): string {
  const q = text.toLowerCase(); const ar = /[\u0600-\u06FF]/.test(text);
  const svc = SERVICES.find((s) => q.includes(s.id) || q.includes(s.en.toLowerCase().split(" ")[0]) || text.includes(s.ar.split(" ").pop()!));
  if (svc) return ar ? `${svc.ar}: ${svc.dAr} السعر يبدأ من ${svc.price} درهم. هل تودين الحجز؟ استخدمي نموذج "احجز الآن" أو واتساب.` : `${svc.en}: ${svc.dEn} Starting from AED ${svc.price}. Would you like to book? Use the "Book Now" form or WhatsApp us.`;
  if (/price|cost|how much|سعر|اسعار|أسعار|كم/.test(q)) return (ar ? "أسعارنا:\n" : "Our prices:\n") + SERVICES.map((s) => `• ${ar ? s.ar : s.en}: ${ar ? `${s.price} درهم` : `AED ${s.price}`}`).join("\n");
  if (/hour|time|open|timing|موعد|ساعات|مفتوح|دوام/.test(q)) return ar ? `ساعات العمل: ${CLINIC.hours.ar}` : `We are open ${CLINIC.hours.en}.`;
  if (/where|location|address|map|وين|أين|عنوان|موقع/.test(q)) return ar ? `موقعنا: فيلا 12، شارع الوصل، جميرا 1، دبي.` : `We are at ${CLINIC.address}.`;
  if (/book|appointment|reserve|حجز|احجز|موعد/.test(q)) return ar ? `يسعدنا حجز موعدك! املئي نموذج "احجز الآن" في الصفحة أو راسلينا على واتساب ${CLINIC.phone}.` : `We'd love to see you! Fill in the "Book Now" form on this page or WhatsApp us at ${CLINIC.phone}.`;
  if (/hi|hello|hey|salam|مرحبا|السلام|اهلا|أهلا/.test(q)) return ar ? "أهلاً وسهلاً بك في لوميير! كيف يمكنني مساعدتك اليوم؟" : "Welcome to Lumière! How can I help you today? Ask about treatments, prices, hours or booking.";
  return ar ? `يمكنني مساعدتك في العلاجات والأسعار والمواعيد. للاستشارة احجزي عبر "احجز الآن" أو واتساب ${CLINIC.phone}.` : `I can help with treatments, prices, hours and bookings. For a personal consultation, use "Book Now" or WhatsApp us at ${CLINIC.phone}.`;
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const messages: Msg[] = Array.isArray(body.messages) ? body.messages.slice(-10) : [];
  const last = messages[messages.length - 1]?.content || "";
  const key = process.env.GROQ_API_KEY?.trim();
  let diag = key ? "key:" + key.length : "nokey";
  if (key) {
    try {
      const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
        body: JSON.stringify({ model: "openai/gpt-oss-20b", temperature: 0.4, max_tokens: 800, messages: [{ role: "system", content: SYSTEM }, ...messages] }),
      });
      diag += " status:" + r.status;
      if (r.ok) { const d = await r.json(); const reply = d.choices?.[0]?.message?.content; if (reply) return NextResponse.json({ reply, source: "groq" }); }
    } catch (e) { diag += " err"; }
  }
  return NextResponse.json({ reply: fallback(last), source: "rules", diag });
}

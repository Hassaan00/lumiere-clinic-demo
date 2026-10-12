export const CLINIC = {
  name: "Lumière Aesthetic Clinic",
  address: "Villa 12, Al Wasl Road, Jumeirah 1, Dubai, UAE",
  phone: "+92 332 2309346",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "923322309346",
  hours: { en: "Sat–Thu 10:00–21:00, Fri 14:00–21:00", ar: "السبت–الخميس 10:00–21:00، الجمعة 14:00–21:00" },
};
export const SERVICES = [
  { id: "hydrafacial", en: "HydraFacial Signature", ar: "هيدرافيشل سيجنتشر", price: 650, dEn: "Deep cleanse, exfoliation and hydration for instant glow.", dAr: "تنظيف عميق وتقشير وترطيب لإشراقة فورية." },
  { id: "botox", en: "Anti-Wrinkle (Botox)", ar: "حقن البوتوكس", price: 1200, dEn: "Smooths forehead, frown lines and crow's feet.", dAr: "يخفف خطوط الجبهة والعبوس وحول العينين." },
  { id: "fillers", en: "Dermal Fillers", ar: "الفيلر", price: 1800, dEn: "Lip, cheek and jawline contouring with premium HA.", dAr: "نحت الشفاه والخدود والفك بحمض الهيالورونيك." },
  { id: "laser", en: "Laser Hair Removal", ar: "إزالة الشعر بالليزر", price: 450, dEn: "Full-body packages with the latest diode laser.", dAr: "باقات للجسم كامل بأحدث أجهزة الديود." },
  { id: "peel", en: "Chemical Peel", ar: "التقشير الكيميائي", price: 550, dEn: "Even tone and reduce pigmentation and acne marks.", dAr: "توحيد لون البشرة وتقليل التصبغات وآثار حب الشباب." },
  { id: "prp", en: "PRP Hair & Skin", ar: "البلازما للشعر والبشرة", price: 950, dEn: "Natural regeneration using your own platelets.", dAr: "تجديد طبيعي باستخدام صفائح الدم الخاصة بك." },
];
export const SLOTS = ["10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];

# Lumière Aesthetic Clinic — Demo Website

A premium sales demo for Gulf clinics and salons: Next.js 14 (App Router) + TypeScript + Tailwind.

## Features
- Hero with Book Now and WhatsApp (wa.me) buttons
- Services with AED prices, doctors, gradient gallery, reviews, location and hours, footer
- English / Arabic toggle with full RTL
- Booking form → `POST /api/book` → saved to `data/bookings.json` (view at `GET /api/book`)
- Floating AI chat widget → `/api/chat` (Groq `openai/gpt-oss-20b` if `GROQ_API_KEY` is set, rule-based EN/AR fallback otherwise)

## Run locally
```bash
npm install
cp .env.example .env.local   # optional: add GROQ_API_KEY (free at console.groq.com)
npm run dev                  # http://localhost:3000
```

## Deploy to Vercel
1. Push this folder to a GitHub repo.
2. On vercel.com, click **Add New → Project**, import the repo (Next.js is auto-detected).
3. Add env vars `GROQ_API_KEY` and `NEXT_PUBLIC_WHATSAPP_NUMBER`, then deploy.
   Or from the CLI: `npx vercel` then `npx vercel --prod`.

Note: Vercel's filesystem is temporary, so bookings go to `/tmp` there and are lost on restart. Use Google Sheets (below) for real clients.

## Swap JSON storage for Google Sheets
Easiest option, using Google Apps Script:
1. Create a Sheet, then go to **Extensions → Apps Script** and paste:
   ```js
   function doPost(e){const d=JSON.parse(e.postData.contents);
   SpreadsheetApp.getActiveSheet().appendRow([new Date(),d.name,d.phone,d.service,d.date,d.time]);
   return ContentService.createTextOutput("ok");}
   ```
2. **Deploy → Web app** (access: Anyone) and copy the URL into `SHEETS_WEBHOOK_URL`.
3. In `app/api/book/route.ts`, replace the file write with:
   `await fetch(process.env.SHEETS_WEBHOOK_URL!, { method: "POST", body: JSON.stringify(booking) });`
   (For a production setup, use the `googleapis` package with a service account.)

## Connecting WhatsApp (Twilio)
1. Create a Twilio account, then open **Messaging → Try it out → WhatsApp sandbox** (free for demos).
2. Add a route such as `app/api/whatsapp/route.ts` that reads the incoming `Body` (form-encoded), runs the same logic as `/api/chat`, and returns TwiML: `<Response><Message>reply</Message></Response>`.
3. Set that URL (`https://your-app.vercel.app/api/whatsapp`) as the sandbox's "When a message comes in" webhook.
4. For a real clinic, register the clinic's own WhatsApp Business number through Twilio or Meta's WhatsApp Cloud API.

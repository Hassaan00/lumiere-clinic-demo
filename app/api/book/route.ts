import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
export const runtime = "nodejs";
// Vercel's filesystem is read-only except /tmp; locally we save to data/bookings.json
const FILE = process.env.VERCEL ? "/tmp/bookings.json" : path.join(process.cwd(), "data", "bookings.json");
export async function POST(req: Request) {
  const b = await req.json().catch(() => null);
  if (!b || !b.name || !b.phone || !b.service || !b.date || !b.time) return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  const booking = { id: Date.now().toString(36), name: String(b.name), phone: String(b.phone), service: String(b.service), date: String(b.date), time: String(b.time), createdAt: new Date().toISOString() };
  let list: unknown[] = [];
  try { list = JSON.parse(await fs.readFile(FILE, "utf8")); } catch {}
  list.push(booking);
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(list, null, 2));
  return NextResponse.json({ ok: true, booking });
}
export async function GET() {
  try { return NextResponse.json(JSON.parse(await fs.readFile(FILE, "utf8"))); } catch { return NextResponse.json([]); }
}

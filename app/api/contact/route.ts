import { NextResponse } from "next/server";

// Les demandes du site sont déposées dans la collection « administration » du Strapi de
// Novel-Index (origine « vpa ») et se lisent sur la page admin /messages-vpa de Novel-Index.
// Pas d'envoi de mail pour l'instant.
// Variable d'environnement facultative : NI_STRAPI_URL (défaut : le Strapi de production).

const STRAPI_URL = process.env.NI_STRAPI_URL || "https://api-test.novel-index.com";

const MAX_LINES = 10;
const MAX_LABEL = 40;
const MAX_VALUE = 2000;
const MAX_NAME = 120;

// Anti-abus simple : 5 envois / 10 min par adresse IP (mémoire de l'instance)
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const clean = (value: unknown, max: number) =>
  typeof value === "string" ? value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, max) : "";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Champ piège invisible : un robot le remplit, un humain non. On répond « ok » sans rien enregistrer.
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "inconnue";
  if (rateLimited(ip)) return NextResponse.json({ ok: false }, { status: 429 });

  const pro = body.kind === "pro";
  const name = clean(body.name, MAX_NAME) || "Sans nom";
  const lines = (Array.isArray(body.lines) ? body.lines : [])
    .slice(0, MAX_LINES)
    .map((line) => (Array.isArray(line) ? [clean(line[0], MAX_LABEL), clean(line[1], MAX_VALUE)] : ["", ""]))
    .filter(([label, value]) => label && value);

  if (lines.length === 0) return NextResponse.json({ ok: false }, { status: 400 });

  const contenu = [`Nom : ${name}`, ...lines.map(([l, v]) => `${l} : ${v}`)].join("\n");

  const res = await fetch(`${STRAPI_URL}/api/administrations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: {
        titre: `${pro ? "Demande pro" : "Demande"} – ${name}`.slice(0, 250),
        contenu,
        signalement: false,
        origine: "vpa",
      },
    }),
  });

  if (!res.ok) {
    console.error("[contact] Novel-Index a refusé l'enregistrement", res.status, await res.text());
    return NextResponse.json({ ok: false }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}

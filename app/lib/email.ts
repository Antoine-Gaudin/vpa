// Envoi des demandes via la route serveur /api/contact (dépôt dans le Strapi de Novel-Index)

export type SendStatus = "idle" | "sending" | "success" | "error";
export type RequestKind = "contact" | "pro";

// Chaque ligne non vide devient « Libellé : valeur » dans le message enregistré
export async function sendRequest(
  kind: RequestKind,
  name: string,
  lines: [label: string, value: string][],
  options: { website?: string } = {}
) {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      kind,
      name,
      lines: lines.filter(([, value]) => value.trim() !== ""),
      website: options.website ?? "",
    }),
  });
  if (!res.ok) throw new Error(`Envoi refusé (${res.status})`);
}

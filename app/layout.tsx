import type { Metadata } from "next";
import "./globals.css";

// Polices chargées par <link> : next/font/google plante sous Turbopack (Next 16.0.7)
const GOOGLE_FONTS =
  "https://fonts.googleapis.com/css2?family=Chivo:wght@600;700;800&family=JetBrains+Mono:wght@500;700&family=Work+Sans:wght@400;500;600;700&display=swap";
const MATERIAL_SYMBOLS =
  "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0..1,0&display=block";

export const metadata: Metadata = {
  title: "Vexin Pièces Autos – Pièces auto neuves à Gisors (27)",
  description:
    "Vexin Pièces Autos, franchisé ID Rechange à Gisors : pièces automobiles neuves toutes marques, outillage, matériel d'atelier et pare-brise, pour particuliers et professionnels.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href={GOOGLE_FONTS} />
        <link rel="stylesheet" href={MATERIAL_SYMBOLS} />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}

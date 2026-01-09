"use client";

import { useState } from "react";

/* =====================================================
    ANNOTATION →   (flèche vers la droite)
===================================================== */
function AnnotationRight({
  label,
  top,
  left,
  tooltip,
}: {
  label: string;
  top: string;
  left: string;
  tooltip?: string;
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="absolute hidden md:flex items-center gap-1 lg:gap-2 text-[10px] md:text-xs lg:text-sm"
      style={{ top, left }}
    >
      {/* Conteneur avec hover */}
      <div 
        className="relative z-20"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {/* Texte */}
        <div className="bg-white shadow-md px-2 py-1 lg:px-3 rounded-md whitespace-nowrap cursor-pointer hover:bg-gray-50 transition-colors">
          {label}
        </div>

        {/* Tooltip */}
        {tooltip && (
          <div 
            className={`absolute top-full mt-2 left-0 bg-gray-900 text-white text-xs px-3 py-2 rounded-md shadow-lg w-64 z-50 whitespace-normal transition-all duration-300 ease-in-out ${
              showTooltip ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
            }`}
          >
            {tooltip}
          </div>
        )}
      </div>

      {/* Flèche → */}
      <div className="w-6 lg:w-10 h-[2px] bg-black relative z-20">
        <span
          className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 
                     border-t-2 border-r-2 border-black rotate-45"
        />
      </div>
    </div>
  );
}

/* =====================================================
    ANNOTATION ←   (flèche vers la gauche)
===================================================== */
function AnnotationLeft({
  label,
  top,
  left,
  tooltip,
}: {
  label: string;
  top: string;
  left: string;
  tooltip?: string;
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="absolute hidden md:flex items-center gap-1 lg:gap-2 text-[10px] md:text-xs lg:text-sm"
      style={{ top, left }}
    >
      {/* Flèche ← */}
      <div className="w-6 lg:w-10 h-[2px] bg-black relative rotate-180 z-20">
        <span
          className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 
                     border-t-2 border-r-2 border-black rotate-45"
        />
      </div>

      {/* Conteneur avec hover */}
      <div 
        className="relative z-20"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {/* Texte */}
        <div className="bg-white shadow-md px-2 py-1 lg:px-3 rounded-md whitespace-nowrap cursor-pointer hover:bg-gray-50 transition-colors">
          {label}
        </div>

        {/* Tooltip */}
        {tooltip && (
          <div 
            className={`absolute top-full mt-2 right-0 bg-gray-900 text-white text-xs px-3 py-2 rounded-md shadow-lg w-64 z-50 whitespace-normal transition-all duration-300 ease-in-out ${
              showTooltip ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
            }`}
          >
            {tooltip}
          </div>
        )}
      </div>
    </div>
  );
}

/* =====================================================
    POINT MOBILE (au clic)
===================================================== */
function MobilePoint({
  label,
  tooltip,
  top,
  left,
}: {
  label: string;
  tooltip: string;
  top: string;
  left: string;
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="absolute md:hidden z-20"
      style={{ top, left }}
    >
      {/* Point blanc */}
      <button
        onClick={() => setShowTooltip(!showTooltip)}
        className="w-4 h-4 bg-white border-2 border-gray-800 rounded-full shadow-lg hover:scale-110 transition-transform cursor-pointer"
        aria-label={label}
      />

      {/* Tooltip */}
      {tooltip && (
        <div 
          className={`absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-2 rounded-md shadow-lg w-56 z-50 whitespace-normal transition-all duration-300 ease-in-out ${
            showTooltip ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
          }`}
        >
          <div className="font-semibold mb-1">{label}</div>
          {tooltip}
        </div>
      )}
    </div>
  );
}

/* =====================================================
    PAGE COMPLÈTE : IMAGE + ANNOTATIONS
===================================================== */

export default function Gondole() {
  return (
    <section className="w-full py-12 md:py-16 flex flex-col items-center bg-white">
      {/* TITRE DE LA SECTION */}
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
          Voici tout ce qu'on propose
        </h2>
        <div className="mt-3 h-1 w-24 bg-blue-600 rounded-full mx-auto" />
      </div>

      {/* 
        ─────────────────────────────────────────────
        CONTENEUR PRINCIPAL RESPONSIVE
        → Les annotations s'adaptent à la taille d'écran
        → L'image reste centrée et proportionnelle
        → Sur mobile : seulement l'image, pas d'annotations
        ─────────────────────────────────────────────
      */}

      <div className="relative w-full max-w-6xl h-[400px] md:h-[500px] lg:h-[600px] flex justify-center items-center px-4">

        {/* ===== IMAGE CENTRÉE RESPONSIVE ===== */}
        <img
          src="/photo/tete_de_gondole.png"
          className="
            absolute left-1/2 top-1/2
            -translate-x-1/2 -translate-y-1/2
            w-[60%] md:w-[40%] lg:w-[33%]
            h-auto
            z-10
          "
          alt="Tête de gondole"
        />

        {/* ===== ANNOTATION exemple droite ===== */}
        <AnnotationRight
          label="Moteur & Filtration"
          top="15%"     // ← TU MODIFIES SIMPLEMENT
          left="22%"    // ← POSITION LIBRE
          tooltip="– Filtres (air, huile, carburant), pièces de moteur, courroies, distribution, alternateurs, démarreurs…"
        />
        <AnnotationRight
          label="Freinage & Suspension"
          top="37%"     // ← TU MODIFIES SIMPLEMENT
          left="18%"    // ← POSITION LIBRE
          tooltip="– Plaquettes, disques, tambours, kits de frein, étriers, capteurs ABS, amortisseurs, ressorts, bras de suspension, rotules, biellettes, silent-blocs…"
        />

        <AnnotationRight
          label="Carrosserie & Habitacle"
          top="58%"     // ← TU MODIFIES SIMPLEMENT
          left="18%"    // ← POSITION LIBRE
          tooltip="– Rétros, poignées, pare-chocs, lève-vitres, rétroviseurs."
        />
        {/* ===== ANNOTATION exemple gauche ===== */}
        <AnnotationLeft
          label="Électricité & Électronique"
          top="18%"     
          left="65%"
          tooltip="– Batterie, capteurs, éclairage, faisceaux, démarreurs alternateurs, relais…"
        />
                <AnnotationLeft
          label="Suspension & Direction"
          top="37%"     
          left="65%"
          tooltip="– Amortisseurs, bras, rotules, silent-blocs, biellettes, colonne de direction…"
        />

                        <AnnotationLeft
          label="Transmission & Embrayage"
          top="58%"     
          left="65%"
          tooltip="– Cardans, kits d'embrayage, volant moteur, boîte, joints homocinétiques…"
        />

        {/* ===== POINTS MOBILE (cliquables) ===== */}
        <MobilePoint
          label="Moteur & Filtration"
          top="10%"     // ← TU MODIFIES SIMPLEMENT
          left="32%"    // ← POSITION LIBRE
          tooltip="– Filtres (air, huile, carburant), pièces de moteur, courroies, distribution, alternateurs, démarreurs…"
        />
        <MobilePoint
          label="Freinage & Suspension"
          top="31%"
          left="30%"
          tooltip="– Plaquettes, disques, tambours, kits de frein, étriers, capteurs ABS, amortisseurs, ressorts, bras de suspension, rotules, biellettes, silent-blocs…"
        />
        <MobilePoint
          label="Carrosserie & Habitacle"
          top="60%"
          left="30%"
          tooltip="– Rétros, poignées, pare-chocs, lève-vitres, rétroviseurs."
        />
        <MobilePoint
          label="Électricité & Électronique"
          top="14%"
          left="65%"
          tooltip="– Batterie, capteurs, éclairage, faisceaux, démarreurs alternateurs, relais…"
        />
        <MobilePoint
          label="Suspension & Direction"
          top="37%"
          left="71%"
          tooltip="– Amortisseurs, bras, rotules, silent-blocs, biellettes, colonne de direction…"
        />
        <MobilePoint
          label="Transmission & Embrayage"
          top="60%"
          left="55%"
          tooltip="– Cardans, kits d'embrayage, volant moteur, boîte, joints homocinétiques…"
        />

        {/* → Tu peux en ajouter autant que tu veux ici */}
      </div>
    </section>
  );
}

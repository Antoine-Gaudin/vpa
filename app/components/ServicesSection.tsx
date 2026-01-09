"use client";

import { useEffect, useRef, useState } from "react";

export default function ServicesSection() {
  const section1Ref = useRef<HTMLDivElement | null>(null);
  const section2Ref = useRef<HTMLDivElement | null>(null);
  const section3Ref = useRef<HTMLDivElement | null>(null);

  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          if (entry.target === section1Ref.current) setShow1(true);
          if (entry.target === section2Ref.current) setShow2(true);
          if (entry.target === section3Ref.current) setShow3(true);
        });
      },
      { threshold: 0.2 }
    );

    if (section1Ref.current) observer.observe(section1Ref.current);
    if (section2Ref.current) observer.observe(section2Ref.current);
    if (section3Ref.current) observer.observe(section3Ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full">

      {/* SECTION 1 : Matériel d'atelier */}
      <section
        ref={section1Ref}
        className={`
          relative w-full h-[250px] md:h-[300px] lg:h-[350px] overflow-hidden bg-white
          transition-all duration-700 ease-out
          ${show1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}
        `}
      >
        <img
          src="/categorie/images.jpg"
          alt="Matériel d'atelier"
          className="
            hidden sm:block
            absolute
            top-[5%] right-[5%] md:right-[7%]
            w-[auto] h-[85%] md:h-[90%]
            z-[1]
            object-cover
          "
        />

        <div
          className="
            absolute
            top-[0%] left-[0%]
            w-[100%] md:w-[70%] lg:w-[65%] h-[110%]
            bg-[#2563eb]
            z-[2]
          "
          style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0 100%)' }}
        />

        <div
          className="
            absolute
            top-[8%] md:top-[10%] left-[5%]
            z-[3]
            max-w-[90%] sm:max-w-[85%] md:max-w-[45%] lg:max-w-[38%]
            text-white text-[85%] md:text-[88%] lg:text-[95%] leading-relaxed
          "
        >
          <h2 className="text-base md:text-xl lg:text-2xl font-semibold mb-2 md:mb-3 lg:mb-4">Matériel d&apos;atelier</h2>

          <p className="mb-2 md:mb-3 lg:mb-4">
            Nous proposons une large gamme d&apos;équipements pour ateliers et garages :
            servantes, machines de vidange, démonte-pneus, compresseurs, appareils
            de géométrie, presses, équilibreuses et bien plus encore.
          </p>

          <p className="hidden md:block">
            Du petit équipement aux machines professionnelles, nous fournissons du
            matériel robuste, fiable et adapté à tous les besoins.
          </p>
        </div>
      </section>

      {/* SECTION 2 : L'outillage */}
      <section
        ref={section2Ref}
        className={`
          relative w-full h-[250px] md:h-[300px] lg:h-[350px] overflow-hidden bg-white
          transition-all duration-700 ease-out
          ${show2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}
        `}
      >
        <img
          src="/categorie/servante.jpg"
          alt="L'outillage"
          className="
            hidden sm:block
            absolute
            top-[50%] left-[0%]
            w-[45%] h-[90%]
            -translate-y-[50%]
            z-[1]
            object-cover
          "
        />

        <div
          className="
            absolute
            top-[0%] right-[0%] md:right-[5%]
            w-[100%] md:w-[70%] lg:w-[65%] h-[110%]
            bg-white
            z-[2]
          "
          style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0 100%)' }}
        />

        <div
          className="
            absolute
            top-[12%] md:top-[18%] right-[5%] md:right-[8%]
            z-[3]
            max-w-[90%] sm:max-w-[85%] md:max-w-[45%] lg:max-w-[38%]
            text-black text-[85%] md:text-[88%] lg:text-[95%] leading-relaxed
          "
        >
          <h2 className="text-base md:text-xl lg:text-2xl font-semibold mb-2 md:mb-3 lg:mb-4">L&apos;outillage</h2>

          <p className="mb-2 md:mb-3 lg:mb-4">
            Nous proposons un large choix d&apos;outillage pour les particuliers
            et les professionnels : clés, douilles, coffrets complets, outils de
            diagnostic, outils de carrosserie et matériel spécialisé pour toutes
            les interventions mécaniques.
          </p>

          <p className="hidden md:block">
            Que ce soit pour un simple entretien ou pour des travaux techniques,
            nous fournissons des outils fiables, durables et adaptés à tous les besoins.
          </p>
        </div>
      </section>

      {/* SECTION 3 : Pare-brise */}
      <section
        ref={section3Ref}
        className={`
          relative w-full h-[250px] md:h-[300px] lg:h-[350px] overflow-hidden bg-white
          transition-all duration-700 ease-out
          ${show3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}
        `}
      >
        <img
          src="/categorie/par brise.png"
          alt="Pare-brise"
          className="
            hidden sm:block
            absolute
            bottom-[-10%] right-[5%]
            w-[40%] md:w-[30%] h-[115%] md:h-[120%]
            z-[1]
            object-contain
          "
        />

        <div
          className="
            absolute
            top-[-15%] left-[0%]
            w-[100%] md:w-[70%] lg:w-[65%] h-[125%]
            bg-[#2563eb]
            z-[2]
          "
          style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0 100%)' }}
        />

        <div
          className="
            absolute
            top-[10%] md:top-[12%] left-[5%]
            z-[3]
            max-w-[90%] sm:max-w-[85%] md:max-w-[45%] lg:max-w-[38%]
            text-white text-[85%] md:text-[88%] lg:text-[95%] leading-relaxed
          "
        >
          <h2 className="text-base md:text-xl lg:text-2xl font-semibold mb-2 md:mb-3 lg:mb-4">Pare-brise</h2>

          <p className="mb-2 md:mb-3 lg:mb-4">
            Nous proposons des pare-brise et vitrages pour tous types de véhicules :
            citadines, utilitaires, SUV et modèles spécialisés.
          </p>

          <p className="hidden md:block">
            Que ce soit pour un remplacement complet ou un besoin spécifique,
            nous fournissons des vitrages fiables, adaptés et prêts à être installés.
          </p>
        </div>
      </section>

    </div>
  );
}

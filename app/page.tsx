"use client";

import { useEffect, useRef, useState } from "react";
import BrandsScroller from "./components/BrandsScroller";
import Footer from "./components/Footer";
import GoogleMap from "./components/GoogleMap";
import Navbar from "./components/navbar";
import ServicesSection from "./components/ServicesSection";
import TeteDeGondole from "./components/TeteDeGondole";

export default function Home() {
  const textRef = useRef<HTMLDivElement | null>(null);
  const [showText, setShowText] = useState(false);
  const [logoOpacity, setLogoOpacity] = useState(1);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          if (entry.target === textRef.current) {
            setShowText(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (textRef.current) observer.observe(textRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const fadeStart = 400;
      const fadeEnd = 800;
      
      if (scrollY <= fadeStart) {
        setLogoOpacity(1);
      } else if (scrollY >= fadeEnd) {
        setLogoOpacity(0);
      } else {
        const opacity = 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart);
        setLogoOpacity(opacity);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <Navbar />

      {/* HERO PARALLAX */}
      <section
        className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] bg-scroll md:bg-fixed bg-[center_30%] md:bg-center bg-cover"
        style={{ backgroundImage: "url('/photo/header.png')" }}
      />
{/* TEXTE EXACT SOUS LE HERO AVEC ANIMATION + LOGO STICKY */}
<section
  ref={textRef}
  className={`
    w-full py-12 px-6
    transition-all duration-700 ease-out
    ${showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
  `}
>
  {/* CONTENEUR FLEX : 70% texte + 30% logo */}
  <div className="max-w-7xl mx-auto flex gap-4">
    {/* COLONNE TEXTE (70%) */}
    <div className="w-full lg:w-[70%]">
    <h2 className="text-[130%] md:text-[150%] lg:text-[170%] mb-6 font-normal">
      Vexin Pièces Autos
    </h2>

    <p className="mb-4 text-[95%] md:text-[110%] lg:text-[120%] leading-relaxed">
      Vexin Pièces Autos, franchisé <strong>ID Rechange</strong>, est une entreprise basée
      à Gisors <br/> spécialisée dans la vente de pièces automobiles neuves pour toutes marques.
      <br/>Nous travaillons avec les particuliers comme avec les professionnels, <br/>en proposant
      des pièces fiables et rapidement disponibles.
    </p>

    <p className="mb-4 text-[95%] md:text-[110%] lg:text-[120%] leading-relaxed">
      Notre réactivité fait la différence : la plupart des commandes sont préparées ou
      <br/>livrées dans la demi-journée, et l&apos;équipe accompagne chaque client pour trouver la
      bonne référence ou une alternative adaptée.
    </p>

    <p className="text-[95%] md:text-[110%] lg:text-[120%] leading-relaxed">
      Vexin Pièces Autos, c’est un service local, simple et efficace, pensé pour répondre
      vite et bien <br/>à tous les besoins en pièces détachées automobile.
    </p>    </div>

    {/* COLONNE LOGO (30%) - sticky, poussé à droite */}
    <div className="hidden lg:flex lg:w-[30%] justify-end">
      <div className="sticky top-[20vh] h-fit z-10 transition-opacity duration-300" style={{ opacity: logoOpacity }}>
        <img
          src="/marques/idrechangehd.png"
          alt="ID Rechange"
          className="w-full max-w-[250px] h-auto"
        />
      </div>
    </div>
  </div>
</section>

      <BrandsScroller />
      <TeteDeGondole />
      <ServicesSection />
      <GoogleMap />
      <Footer />
    </div>
  );
}

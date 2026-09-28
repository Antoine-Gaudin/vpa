"use client";

import Image from "next/image";

const brandLogos = [
  "/marques/image 1.png",
  "/marques/Image3.png",
  "/marques/Image4.png",
  "/marques/Image5.png",
  "/marques/Image6.png",
  "/marques/Image7.png",
  "/marques/Image8.png",
  "/marques/Image9.png",
  "/marques/Image10.png",
  "/marques/Image11.png",
  "/marques/Image12.png",
  "/marques/Image13.png",
  "/marques/Image14.png",
  "/marques/Image15.png",
  "/marques/Image16.png",
  "/marques/Image17.png",
  "/marques/Image18.png",
  "/marques/Image19.png",
  "/marques/Image20.png",
];

export default function BrandsScroller() {
  return (
    <section className="bg-subtle py-5 border-y border-surface-container">
      <div className="max-w-[1320px] mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center gap-4 md:gap-8">
        <span className="label-badge uppercase text-muted whitespace-nowrap">Nos marques</span>
        <div className="overflow-hidden w-full [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex gap-8 md:gap-12 w-max animate-marques">
            {brandLogos.concat(brandLogos).map((src, index) => (
              <div key={index} className="flex-shrink-0">
                <Image
                  src={src}
                  alt={index < brandLogos.length ? `Marque ${index + 1}` : ""}
                  width={140}
                  height={70}
                  className="h-10 md:h-12 w-auto object-contain mix-blend-multiply"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-marques {
          animation: marques 35s linear infinite;
        }

        @keyframes marques {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-marques {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}

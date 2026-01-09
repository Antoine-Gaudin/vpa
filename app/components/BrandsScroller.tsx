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
    <div className="mt-10 overflow-hidden w-full">
      <div className="flex gap-6 md:gap-10 animate-marques">
        {brandLogos.concat(brandLogos).map((src, index) => (
          <div key={index} className="flex-shrink-0">
            <Image
              src={src}
              alt={`Marque ${index + 1}`}
              width={140}
              height={70}
              className="h-10 md:h-16 w-auto object-contain"
            />
          </div>
        ))}
      </div>

      {/* Animation locale */}
      <style jsx>{`
        .animate-marques {
          animation: marques 25s linear infinite;
        }

        @keyframes marques {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}

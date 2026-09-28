// Cinq étoiles pleines (icône Material « star » avec remplissage forcé)
export default function Stars({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex text-plate-yellow ${className}`} role="img" aria-label="5 étoiles sur 5">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} aria-hidden="true" className="icon" style={{ fontVariationSettings: "'FILL' 1" }}>
          star
        </span>
      ))}
    </span>
  );
}

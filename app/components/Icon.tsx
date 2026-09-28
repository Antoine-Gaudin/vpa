// Icône Material Symbols (police chargée dans layout.tsx)
export default function Icon({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  return (
    <span aria-hidden="true" className={`icon select-none ${className}`}>
      {name}
    </span>
  );
}

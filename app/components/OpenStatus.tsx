"use client";

import { useStoreStatus } from "../lib/useStoreStatus";

export default function OpenStatus({ className = "" }: { className?: string }) {
  const status = useStoreStatus();

  if (status === null) {
    return <span className={`label-badge uppercase text-slate-soft ${className}`}>Comptoir de Gisors</span>;
  }

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span
        className={`inline-flex w-2.5 h-2.5 rounded-full ${status.open ? "bg-express animate-pulse" : "bg-outline"}`}
      />
      <span className={`label-badge uppercase ${status.open ? "text-express" : "text-slate-soft"}`}>
        {status.open ? "Comptoir ouvert" : "Comptoir fermé"}
      </span>
    </span>
  );
}

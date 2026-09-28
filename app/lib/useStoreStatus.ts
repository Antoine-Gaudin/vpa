"use client";

import { useEffect, useState } from "react";
import { StoreStatus, getStoreStatus } from "./hours";

// null tant que le composant n'est pas monté : évite un écart serveur / navigateur
export function useStoreStatus(): StoreStatus | null {
  const [status, setStatus] = useState<StoreStatus | null>(null);

  useEffect(() => {
    const update = () => setStatus(getStoreStatus());
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  return status;
}

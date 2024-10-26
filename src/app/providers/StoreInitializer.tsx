"use client";

import { useUserDataStore } from "@/lib/store";
import { useEffect } from "react";

export function StoreInitializer() {
  const setName = useUserDataStore((state) => state.setName);
  const session = useUserDataStore((state) => state.session);
  useEffect(() => {
    setName();
  }, [session]);

  return null;
}

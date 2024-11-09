"use client";

import { useUserDataStore } from "@/lib/store";
import { useEffect } from "react";

export function StoreInitializer() {
  const setName = useUserDataStore((state) => state.setName);
  const getUserId = useUserDataStore((state) => state.setUserId);
  const getLists = useUserDataStore((state) => state.syncWithSupabase);
  const userId = useUserDataStore((state) => state.userId);
  const getProfilePic = useUserDataStore((state) => state.getProfilePic);

  useEffect(() => {
    if (!userId) {
      getUserId();
    }
  }, []);

  useEffect(() => {
    if (userId) {
      getProfilePic();
      setName();
      getLists(userId);
    }
  }, [userId, setName, getLists]);

  return null;
}

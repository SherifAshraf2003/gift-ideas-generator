import { create } from "zustand";
import { userData } from "./types";

export const useUserDataStore = create<userData>((set) => ({
  username: "",
  session: "",
  setName: async () => {
    const res = await fetch("/api/userData/username");
    const data = await res.json();
    set((state) => ({ ...state, username: data.username }));
  },
  setSessionStatus: async () => {},
}));

import { create } from "zustand";
import { GiftList, userData } from "./types";
import { createClient } from "@/app/utils/supabase/client";
import { persist, createJSONStorage } from "zustand/middleware";

const supabase = createClient();

export const viewedGiftList = create<GiftList>()(
  persist(
    (set) => ({
      id: "",
      items: [],
      createdAt: "",
      search_terms: [],
      user_id: "",
      setGiftList: (giftList: Partial<GiftList>) => set(giftList),
    }),
    {
      name: "viewedGiftList",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useUserDataStore = create<userData>()(
  persist(
    (set) => ({
      username: "",
      giftLists: {},
      profilePic: "",
      isLoading: false,
      userId: "",
      error: null,
      session: "",
      setName: async () => {
        try {
          const res = await fetch("/api/userData/username");
          if (!res.ok) throw new Error("Failed to fetch username");
          const data = await res.json();
          set((state) => ({ ...state, username: data.username }));
        } catch (error) {
          set((state) => ({ ...state, error: error as string }));
        }
      },
      setUserId: async () => {
        try {
          const res = await fetch("/api/userData/userId");
          if (!res.ok) throw new Error("Failed to fetch userId");
          const data = await res.json();
          set((state) => ({ ...state, userId: data.userId }));
        } catch (error) {
          set((state) => ({ ...state, error: error as string }));
        }
      },
      getProfilePic: async () => {
        const { data } = await supabase.storage.from("avatars").list("", {
          search: `${useUserDataStore.getState().userId}`,
        });
        const image = data;
        if (data && data.length > 0) {
          console.log(image);
          const { data } = supabase.storage
            .from("avatars")
            .getPublicUrl(`${useUserDataStore.getState().userId}`);
          set((state) => ({
            ...state,
            profilePic: data.publicUrl,
          }));
          console.log(data);
        } else {
          set((state) => ({
            ...state,
            profilePic: "",
          }));
        }
      },
      setProfilePic: (url: string) => {
        set({ profilePic: url });
      },
      setSessionStatus: async () => {},
      syncWithSupabase: async (userId: string) => {
        try {
          set({ isLoading: true, error: null });
          const { data, error } = await supabase
            .from("gift_lists")
            .select("*")
            .eq("user_id", userId);
          if (error) throw error;
          const giftListRecord = data.reduce<Record<string, GiftList>>(
            (acc, list) => ({
              ...acc,
              [list.id]: list,
            }),
            {}
          );
          set({ giftLists: giftListRecord });
        } catch (error) {
          set({ error: error as string });
          console.error("Error syncing with database", error);
        } finally {
          set({ isLoading: false });
        }
      },
      addGiftList: async (userId: string, giftList: GiftList) => {
        try {
          set({ isLoading: true, error: null });
          const { error } = await supabase
            .from("gift_lists")
            .upsert({
              id: giftList.id,
              items: giftList.items,
              created_at: giftList.createdAt,
              search_terms: giftList.search_terms,
              user_id: userId,
            })
            .select()
            .single();
          if (error) throw error;

          set((state) => ({
            giftLists: { ...state.giftLists, [giftList.id]: giftList },
          }));
        } catch (error) {
          set({ error: error as string });
          console.error("Error adding gift list", error);
        } finally {
          set({ isLoading: false });
        }
      },
      deleteGiftList: async (userId: string, listId: string) => {
        try {
          set({ isLoading: true, error: null });

          const { error } = await supabase
            .from("gift_lists")
            .delete()
            .match({ id: listId, user_id: userId });
          if (error) throw error;

          set((state) => {
            const newGiftLists = { ...state.giftLists };
            delete newGiftLists[listId];
            return { giftLists: newGiftLists };
          });
        } catch (error) {
          set({ error: error as string });
          console.error("Error deleting gift list", error);
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "userData",
      storage: createJSONStorage(() => localStorage),

      partialize: (state) => ({
        username: state.username,
        userId: state.userId,
        giftLists: state.giftLists,
        profilePic: state.profilePic,
      }),
    }
  )
);

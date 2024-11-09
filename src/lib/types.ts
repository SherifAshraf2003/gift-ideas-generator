import { z } from "zod";

const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

export interface GiftList {
  id: string;
  items: any[][];
  createdAt: string;
  search_terms: string[];
  user_id: string;
}

export interface userData {
  username: string;
  userId: string;
  profilePic: string;
  session: string;
  giftLists: Record<string, GiftList>;
  isLoading: boolean;
  error: string | null;
  setName: () => Promise<void>;
  setUserId: () => Promise<void>;
  setProfilePic: (url: string) => void;
  getProfilePic: () => Promise<void>;
  setSessionStatus: () => Promise<void>;
  syncWithSupabase: (userId: string) => Promise<void>;
  addGiftList: (userId: string, giftList: GiftList) => Promise<void>;
  deleteGiftList: (userId: string, listId: string) => Promise<void>;
}

export default formSchema;

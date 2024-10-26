import { z } from "zod";

const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

interface GiftList {
  id: string;
  items: any[][];
  createdAt: string;
  searchTerms: string[];
}

export interface userData {
  username: string;
  session: string;
  giftLists: Record<string, GiftList>;
  setName: () => Promise<void>;
  setSessionStatus: () => Promise<void>;
}

export default formSchema;

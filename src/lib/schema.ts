import { z } from "zod";

const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

export default formSchema;

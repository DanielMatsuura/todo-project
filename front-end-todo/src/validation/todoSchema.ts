import { z } from "zod";

export const todoSchema = z.object({
  title: z.string().nonempty("Title is required"),
  description: z.string().nonempty("Description is required"),
});

export type TodoFormData = z.infer<typeof todoSchema>;

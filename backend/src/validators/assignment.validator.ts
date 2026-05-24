import { z } from "zod";

export const assignmentSchema = z.object({
  body: z.object({
    dueDate: z.coerce.date(),
    questionConfigs: z
      .array(
        z.object({
          type: z.enum(["mcq", "short", "diagram", "numerical", "long"]),
          count: z.number().min(1),
          marks: z.number().min(1),
        })
      )
      .min(1),
    instructions: z.string().optional(),
  }),
  query: z.object({}).optional(),
  params: z.object({}).optional(),
});

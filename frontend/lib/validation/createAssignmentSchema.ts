import { z } from "zod";

export const createAssignmentSchema = z.object({
  dueDate: z.string().min(1),

  questionConfigs: z
    .array(
      z.object({
        type: z.string(),

        count: z.number().min(1),

        marks: z.number().min(1),
      })
    )
    .min(1),
});
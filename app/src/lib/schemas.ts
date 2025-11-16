import { z } from "zod";

export const ClassSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1),
    link: z.url(),
    courseId: z.number()
});

export const ClassUpdateSchema = ClassSchema.extend({
    id: z.number().int()
});

import { z } from 'zod';

export const DegreeSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1)
});

export const DegreeUpdateSchema = DegreeSchema.extend({
    id: z.number().int()
});

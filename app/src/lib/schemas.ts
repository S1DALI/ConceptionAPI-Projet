import { z } from 'zod';

export const DegreeSchema = z.object({
    id: z.number().int().optional(),
    name: z.string().min(1)
});

export const DegreeUpdateSchema = DegreeSchema.extend({
    id: z.number().int()
});

export const UserSchema = z.object({
    id: z.number().optional(),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.email(),
    role: z.number().int().min(0).max(3),
    password: z.string().min(6),
    degreeId: z.number().int()
});

export const UserUpdateRoleSchema = z.object({
    role: z.number().int().min(0).max(3)
});

export const UserUpdateDegreeSchema = z.object({
    degreeId: z.number().int()
});

export const ClassSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1),
    link: z.url(),
    courseId: z.number()
});

export const ClassUpdateSchema = ClassSchema.extend({
    id: z.number().int()
});

export const CourseSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1),
    degreeId: z.number().int(),
    description: z.string(),
});





import { z } from 'zod';
import { ClassSchema, CourseSchema, DegreeSchema } from '$lib/schemas';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
  try {
    // Charger tous les degrees
    const degreesRes = await fetch('/api/v1/degrees');
    if (!degreesRes.ok) throw new Error('Erreur lors du chargement des diplômes');
    const degrees = z.array(DegreeSchema).parse(await degreesRes.json());

    // Charger tous les courses
    const courses: Array<any> = [];
    for (const degree of degrees) {
      const res = await fetch(`/api/v1/degrees/${degree.id}/courses`);
      if (res.ok) {
        const degreeCourses = z.array(CourseSchema).parse(await res.json());
        courses.push(...degreeCourses);
      }
    }

    // Charger toutes les classes pour chaque course
    const classes: Array<any> = [];
    for (const course of courses) {
      const res = await fetch(`/api/v1/courses/${course.id}/classes`);
      if (res.ok) {
        const courseClasses = z.array(ClassSchema).parse(await res.json());
        classes.push(...courseClasses);
      }
    }

    return { classes, courses };
  } catch (error) {
    throw error;
  }
};

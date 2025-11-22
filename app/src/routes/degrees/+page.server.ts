


import { z } from 'zod';
import { DegreeSchema, CourseSchema } from '$lib/schemas';
import type { PageServerLoad } from './$types';


export const load: PageServerLoad = async ({ fetch }) => {
  try {
    const degreesRes = await fetch('/api/v1/degrees');
    if (!degreesRes.ok) throw new Error('Erreur lors du chargement des diplômes');
    const degrees = z.array(DegreeSchema).parse(await degreesRes.json());

    // Pour chaque degree, charger ses courses
    const courses: Array<any> = [];
    for (const degree of degrees) {
      const res = await fetch(`/api/v1/degrees/${degree.id}/courses`);
      if (res.ok) {
        const degreeCourses = z.array(CourseSchema).parse(await res.json());
        courses.push(...degreeCourses);
      }
    }

    return { degrees, courses };
  } catch (error) {
    throw error;
  }
};

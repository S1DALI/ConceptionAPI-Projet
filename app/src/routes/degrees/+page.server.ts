import { z } from 'zod';
import { DegreeSchema, CourseSchema } from '$lib/schemas';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
  try {
    const degreesRes = await event.fetch('/api/v1/degrees');

    const degrees = z.array(DegreeSchema).parse(await degreesRes.json());

    // Charger tous les courses
    const courses: Array<any> = [];
    for (const degree of degrees) {
      const res = await event.fetch(`/api/v1/degrees/${degree.id}/courses`);
      if (res.ok) {
        const degreeCourses = z.array(CourseSchema).parse(await res.json());
        courses.push(...degreeCourses);
      }
    }

    return {
      degrees,
      courses
    };
  } catch (error) {
    console.error('Erreur load:', error);
    throw error;
  }
};

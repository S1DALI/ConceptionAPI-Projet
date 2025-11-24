import { z } from 'zod';
import { DegreeSchema, CourseSchema } from '$lib/schemas';
import { getAllDegrees, getCourses } from '$lib/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  try {
    const degreesRaw = getAllDegrees();
    const coursesRaw = getCourses();

    const degrees = z.array(DegreeSchema).parse(degreesRaw);
    const courses = z.array(CourseSchema).parse(coursesRaw);

    return {
      degrees,
      courses
    };
  } catch (error) {
    console.error('Erreur load:', error);
    throw error;
  }
};

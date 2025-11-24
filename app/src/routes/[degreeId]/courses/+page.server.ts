import type { PageServerLoad } from './$types';
import { DegreeSchema, CourseSchema, ClassSchema } from '$lib/schemas';
import { z } from 'zod';

export const load: PageServerLoad = async ({ fetch, params, url }) => {
  const degreeId = Number(params.degreeId);
  const courseId = Number(url.searchParams.get('course'));

  const degreesRes = await fetch('/api/v1/degrees');
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

  let classes : Array<any> = [];
  if (courseId) {
    const classesRes = await fetch(`/api/v1/courses/${courseId}/classes`)
    classes = z.array(ClassSchema).parse(await classesRes.json());
  }

  return {
    degreeId,
    courseId,
    degrees,
    courses,
    classes
  };
};

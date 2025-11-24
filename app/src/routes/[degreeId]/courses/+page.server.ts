import type { PageServerLoad } from './$types';
import { DegreeSchema, CourseSchema, ClassSchema } from '$lib/schemas';
import { z } from 'zod';

export const load: PageServerLoad = async ({ fetch, params, url }) => {
  const degreeId = Number(params.degreeId);
  const courseId = Number(url.searchParams.get('course'));

  const degreeRes = await fetch(`/api/v1/degrees/${degreeId}`);
  const degree = DegreeSchema.parse(await degreeRes.json());

  // Charger toutes les courses du degree sélectionné
  const courses: Array<any> = [];
  const res = await fetch(`/api/v1/degrees/${degreeId}/courses`);
  if (res.ok) {
    const degreeCourses = CourseSchema.array().parse(await res.json());
    courses.push(...degreeCourses);
  }

  let classes: Array<any> = [];
  if (courseId) {
    const classesRes = await fetch(`/api/v1/courses/${courseId}/classes`)
    classes = ClassSchema.array().parse(await classesRes.json());
  }

  return {
    degreeId,
    courseId,
    degree,
    courses,
    classes
  };
};

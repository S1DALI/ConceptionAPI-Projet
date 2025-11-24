import type { PageServerLoad } from './$types';
import { getCourses, getAllDegrees } from '$lib/db';
import db from '$lib/db';

export const load: PageServerLoad = async ({ params, url }) => {
  const degreeId = Number(params.degreeId);
  const courseId = Number(url.searchParams.get('course'));

  const degrees = getAllDegrees();
  const courses = getCourses().filter(c => c.degreeId === degreeId);

  let classes = [];
  if (courseId) {
    classes = db.prepare("SELECT * FROM classes WHERE courseId = ?").all(courseId);
  }

  return {
    degreeId,
    courseId,
    degrees,
    courses,
    classes
  };
};

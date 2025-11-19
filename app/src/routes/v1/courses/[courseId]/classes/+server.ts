import { json, error } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import db from "$lib/db";

export async function GET({ params }: RequestEvent) {
    const courseId = Number(params.courseId);
    if (isNaN(courseId)) throw error(400, "Invalid course ID");

    const course = db.prepare("SELECT * FROM courses WHERE id = ?").get(courseId);
    if (!course) throw error(404, "Course not found");

    const classes = db
        .prepare("SELECT * FROM classes WHERE courseId = ?")
        .all(courseId);

    return json(classes);
}
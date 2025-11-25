import { json, error } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import db from "$lib/db";

export async function GET({ params }: RequestEvent) {
    const courseId = Number(params.courseId);
    if (isNaN(courseId)) return new Response('Bad Request', { status: 400 });

    const course = db.prepare("SELECT * FROM courses WHERE id = ?").get(courseId);
    if (!course) return new Response("Course not found", { status: 404 });

    const classes = db
        .prepare("SELECT * FROM classes WHERE courseId = ?")
        .all(courseId);

    return json(classes);
}
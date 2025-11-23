import { json, error } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import { db } from "$lib/db";
import { checkAuth } from '../+server';

let courses = [
	{ id: 12, name: "Introduction to Algorithms", degreeId: 1 },
	{ id: 13, name: "Data Structures", degreeId: 1 }
];


export async function DELETE({ params, locals }: RequestEvent) {
    checkAuth(locals);

    const id = Number(params.courseId);
    if (isNaN(id)) throw error(400, "Invalid course ID");

    const course = db.prepare("SELECT id FROM courses WHERE id = ?").get(id);
    if (!course) throw error(404, "Course not found");

    db.prepare("DELETE FROM courses WHERE id = ?").run(id);

    return json({ message: "Course deleted" });
}
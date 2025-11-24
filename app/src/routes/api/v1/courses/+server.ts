import { json, error } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import { canEditCourse } from "$lib/server/auth";
import db from "$lib/db";


export async function POST({ request, locals }: RequestEvent) {
    const user = locals.user;

    if (!user) {
        return new Response("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { name, degreeId } = body;

    if (!name || !degreeId) throw error(400, 'Bad Request');

    if (!canEditCourse(user, degreeId)) {
        return new Response("Unauthorized", { status: 401 });
    }

    const stmt = db.prepare("INSERT INTO courses (name, degreeId) VALUES (?, ?)");
    const result = stmt.run(name, degreeId);

    return json({ id: result.lastInsertRowid, name, degreeId });
}

export async function PUT({ request, locals }: RequestEvent) {
    const user = locals.user;

    if (!user) {
        return new Response("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { id, name, degreeId } = body;

    if (!id || !name || !degreeId) throw error(400, 'Bad Request');

    if (!canEditCourse(user, degreeId)) {
        return new Response("Unauthorized", { status: 401 });
    }

    const stmt = db.prepare("UPDATE courses SET name = ?, degreeId = ? WHERE id = ?");
    const result = stmt.run(name, degreeId, id);

    if (result.changes === 0) throw error(404, 'Course not found');

    return json({ message: "Course updated" });
}

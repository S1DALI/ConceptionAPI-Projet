// POST et PUT sur le endpoint /v1/courses
import { json, error } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import db from "$lib/db";

function checkAuth(locals: any) {
    const sessionUser = locals.user;

    if (!sessionUser) throw error(401, "Unauthorized");

    const user = db.prepare("SELECT role FROM users WHERE id = ?").get(sessionUser.id);

    if (!user) throw error(401, "Unauthorized");

    /*const allowed = ["admin", "teacher", "class_representative"]; // a voir je sais pas comment on gère les rôles

    if (!allowed.includes(user.role)) {
        throw error(403, "Forbidden");
    }*/

    return user;
}


export async function POST({ request, locals }: RequestEvent) {
    checkAuth(locals);

    const body = await request.json();
    const { name, degreeId } = body;

    if (!name || !degreeId) throw error(400, 'Missing fields');

    const stmt = db.prepare("INSERT INTO courses (name, degreeId) VALUES (?, ?)");
    const result = stmt.run(name, degreeId);

    return json({ id: result.lastInsertRowid, name, degreeId });
}

export async function PUT({ request, locals }: RequestEvent) {
    checkAuth(locals);

    const body = await request.json();
    const { id, name, degreeId } = body;

    if (!id || !name || !degreeId) throw error(400, 'Invalid fields');

    const stmt = db.prepare("UPDATE courses SET name = ?, degreeId = ? WHERE id = ?");
    const result = stmt.run(name, degreeId, id);

    if (result.changes === 0) throw error(404, 'Course not found');

    return json({ message: "Course updated" });
}

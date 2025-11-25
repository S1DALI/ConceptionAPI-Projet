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
    const { name, degreeId, description } = body;

    if (!name || !degreeId || !description) return new Response('Bad Request', { status: 400 });

    const degreeStmt = db.prepare(`
        SELECT id FROM degrees WHERE id = ?
    `);
    const degree = degreeStmt.get(degreeId);
    if (!degree) {
        return new Response("Degree not found", { status: 404 });
    }

    if (!canEditCourse(user, degreeId)) {
        return new Response("Unauthorized", { status: 401 });
    }

    const stmt = db.prepare("INSERT INTO courses (name, degreeId, description) VALUES (?, ?, ?)");
    const result = stmt.run(name, degreeId, description);

    return json({ id: result.lastInsertRowid, name, degreeId, description });
}

export async function PUT({ request, locals }: RequestEvent) {
    const user = locals.user;

    if (!user) {
        return new Response("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { id, name, degreeId, description } = body;

    if (!id || !name || !degreeId || !description) return new Response('Bad Request', { status: 400 });

    const degreeStmt = db.prepare(`
        SELECT id FROM degrees WHERE id = ?
    `);
    const degree = degreeStmt.get(degreeId);
    if (!degree) {
        return new Response("Degree not found", { status: 404 });
    }

    if (!canEditCourse(user, degreeId)) {
        return new Response("Unauthorized", { status: 401 });
    }

    const stmt = db.prepare("UPDATE courses SET name = ?, degreeId = ?, description = ? WHERE id = ?");
    const result = stmt.run(name, degreeId, description, id);

    if (result.changes === 0) return new Response("Course not found", { status: 404 });

    return new Response('Successful update of course', { status: 200 });
}

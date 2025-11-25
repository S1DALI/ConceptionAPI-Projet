import db from '$lib/db';
import { json, type RequestHandler } from '@sveltejs/kit';
import { UserSchema, UserUpdateSchema } from '$lib/schemas';
import { canEditUser } from "$lib/server/auth";

export const GET: RequestHandler = async ({ params, locals }) => {
    if (!locals.user) {
        return new Response("Unauthorized", { status: 401 });
    }

    if (!canEditUser(locals.user)) {
        return new Response("Unauthorized", { status: 401 });
    }

    const userId = Number(params.userId);

    if (isNaN(userId)) {
        return new Response("Bad Request", { status: 400 });
    }

    const user = db.prepare(`
        SELECT id, firstName, lastName, email, role, degreeId 
        FROM users WHERE id = ?
    `).get(userId);

    if (!user) {
        return new Response("User not found", { status: 404 });
    }
    return new Response(JSON.stringify(user), { status: 200 });
}

export const PATCH: RequestHandler = async ({ request, params, locals }) => {
    if (!locals.user) {
        return new Response("Unauthorized", { status: 401 });
    }

    if (!canEditUser(locals.user)) {
        return new Response("Unauthorized", { status: 401 });
    }

    const userId = Number(params.userId);
    if (isNaN(userId)) {
        return new Response("Bad Request", { status: 400 });
    }

    const data = await request.json();
    const parsed = UserUpdateSchema.safeParse(data);

    if (!parsed.success) {
        return new Response("Bad Request", { status: 400 });
    }

    const { role, degreeId } = parsed.data;

    const user = db.prepare('SELECT id FROM users WHERE id = ?').get(userId);
    if (!user) {
        return new Response("User not found", { status: 404 });
    }

    const updates: string[] = [];
    const values: any[] = [];

    if (role !== undefined) {
        updates.push('role = ?');
        values.push(role);
    }
    if (degreeId !== undefined) {
        updates.push('degreeId = ?');
        values.push(degreeId);
    }

    if (updates.length === 0) {
        return new Response("Bad Request", { status: 400 });
    }

    values.push(userId);

    try {
        db.prepare(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`).run(...values);
    } catch (err: any) {
        return new Response("Bad Request", { status: 400 });
    }

    const updatedUser = db.prepare(`
        SELECT id, firstName, lastName, email, role, degreeId 
        FROM users WHERE id = ?
    `).get(userId);

    return new Response("Sucessful update of user", { status: 200 });
}

export const DELETE: RequestHandler = async ({ params, locals }) => {
    if (!locals.user) {
        return new Response("Unauthorized", { status: 401 });
    }

    if (!canEditUser(locals.user)) {
        return new Response("Unauthorized", { status: 401 });
    }

    const userId = Number(params.userId);

    if (isNaN(userId)) {
        return new Response("Bad Request", { status: 400 });
    }

    const info = db.prepare('DELETE FROM users WHERE id = ?').run(userId);

    if (info.changes === 0) {
        return new Response("User not found", { status: 404 });
    }
    return new Response('User deleted successfully', { status: 200 });
}

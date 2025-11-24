import db from '$lib/db';
import { json, type RequestHandler } from '@sveltejs/kit';
import { UserSchema } from '$lib/schemas';
import { canEditUser } from "$lib/server/auth";

export const GET: RequestHandler = async ({ params, locals }) => {
    if (!locals.user) {
        return new Response("Unauthorized", { status: 401 });
    }

    if (!canEditUser(locals.user)) {
        return new Response("Unauthorized", { status: 401 });
    }

    const { userId } = params;

    const user = db.prepare(`
        SELECT id, firstName, lastName, email, role, degreeId 
        FROM users WHERE id = ?
    `).get(userId);

    if (!user) {
        return json({ error: 'User not found' }, { status: 404 });
    }
    return json(user, { status: 200 });

}

export const DELETE: RequestHandler = async ({ params, locals }) => {
    if (!locals.user) {
        return new Response("Unauthorized", { status: 401 });
    }

    if (!canEditUser(locals.user)) {
        return new Response("Unauthorized", { status: 401 });
    }

    const { userId } = params;

    const info = db.prepare('DELETE FROM users WHERE id = ?').run(userId);

    if (info.changes === 0) {
        return json({ error: 'User not found' }, { status: 404 });
    }

    return json({ message: 'User deleted successfully', status: 200 });
}

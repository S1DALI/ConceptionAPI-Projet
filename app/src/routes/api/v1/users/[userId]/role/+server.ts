import db from '$lib/db';
import { json } from '@sveltejs/kit';
import { UserUpdateRoleSchema } from '$lib/schemas';
import { canEditUser } from '$lib/server/auth';

export async function PATCH({ request, params, locals }){
    const { userId } = params;
    const data = await request.json();
    const { role } = data;
    const user = locals.user;

    const parsed = UserUpdateRoleSchema.safeParse(data);
    if(!parsed.success){
        return json({ message: "Bad Request" } , { status: 400 });
    }
    
    if(!canEditUser(user)) {
        return json({ message: "Unauthorized" }, { status: 401 });
    }

    let requestedUser = db.prepare('SELECT id FROM users WHERE id = ?').get(userId);

    if (!requestedUser) {
        return json({ error: 'User not found' }, { status: 404 });
    }

    const updateRole = db.prepare('UPDATE users SET role = ? WHERE id = ?').run(role, userId);

    requestedUser = db.prepare(`
        SELECT id, firstName, lastName, email, role, degreeId 
        FROM users WHERE id = ?
    `).get(userId);
    return json(requestedUser, {status: 200});
}
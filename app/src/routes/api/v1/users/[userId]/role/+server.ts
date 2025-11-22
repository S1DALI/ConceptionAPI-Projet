import db from '$lib/db';
import { json } from '@sveltejs/kit';
import { UserUpdateRoleSchema } from '$lib/schemas';

export async function PATCH({ request, params }){
    const { userId } = params;
    const data = await request.json();
    const { role } = data;

    const parsed = UserUpdateRoleSchema.safeParse(data);
    if(!parsed.success){
        return json({ message: "Bad Request" } , { status: 400 });
    }

    let user = db.prepare('SELECT id FROM users WHERE id = ?').get(userId);

    if (!user) {
        return json({ error: 'User not found' }, { status: 404 });
    }

    const updateRole = db.prepare('UPDATE users SET role = ? WHERE id = ?').run(role, userId);

    user = db.prepare(`
        SELECT id, firstName, lastName, email, role, degreeId 
        FROM users WHERE id = ?
    `).get(userId);
    return json(user, {status: 200});
}
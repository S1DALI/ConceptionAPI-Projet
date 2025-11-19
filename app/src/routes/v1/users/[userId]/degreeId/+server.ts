import db from '$lib/db';
import { json } from '@sveltejs/kit';
import { UserUpdateDegreeSchema } from '$lib/schemas';

export async function PATCH({ request, params }){
    const { userId } = params;
    const data = await request.json();
    const { degreeId } = data;

    const parsed = UserUpdateDegreeSchema.safeParse(data);
    if(!parsed){
        return new Response("Bad Request", { status: 400 });
    }

    let user = db.prepare('SELECT id FROM users WHERE id = ?').get(userId);

    if (!user) {
        return json({ error: 'User not found' }, { status: 404 });
    }

    const updateDegree = db.prepare('UPDATE users SET degreeId = ? WHERE id = ?').run(degreeId, userId);
    if(updateDegree.changes === 0){
        return new Response("Error while updating degree Request", { status: 500 });
    }

    user = db.prepare(`
        SELECT id, firstName, lastName, email, role, degreeId 
        FROM users WHERE id = ?
    `).get(userId);
    return json(user, {status: 200});
}
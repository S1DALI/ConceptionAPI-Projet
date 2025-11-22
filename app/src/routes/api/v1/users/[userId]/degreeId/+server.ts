import db from '$lib/db';
import { json } from '@sveltejs/kit';
import { UserUpdateDegreeSchema } from '$lib/schemas';

export async function PATCH({ request, params }){
    const { userId } = params;
    const data = await request.json();
    const { degreeId } = data;

    const parsed = UserUpdateDegreeSchema.safeParse(data);
    if(!parsed.success){
        return new Response("Bad Request", { status: 400 });
    }

    let user = db.prepare('SELECT id FROM users WHERE id = ?').get(userId);

    if (!user) {
        return json({ error: 'User not found' }, { status: 404 });
    }

    try{
        const updateDegree = db.prepare('UPDATE users SET degreeId = ? WHERE id = ?').run(degreeId, userId);
    } catch (err: any){

        if (err.message.includes("FOREIGN KEY")) {
            return new Response("Foreign key constraint failed", { status: 400 });
        }

         if (err.message.includes("constraint")) {
            return new Response("Constraint violation", { status: 400 });
        }

        return new Response("Internal Server Error", { status: 500 });
    }
    user = db.prepare(`
        SELECT id, firstName, lastName, email, role, degreeId 
        FROM users WHERE id = ?
    `).get(userId);
    return json(user, {status: 200});
}
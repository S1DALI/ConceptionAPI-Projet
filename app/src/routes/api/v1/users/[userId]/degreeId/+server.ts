import db from '$lib/db';
import { json } from '@sveltejs/kit';
import { UserUpdateDegreeSchema } from '$lib/schemas';
import { canEditUser } from '$lib/server/auth';

export async function PATCH({ request, params, locals }){
    const { userId } = params;
    const data = await request.json();
    const { degreeId } = data;
    const user = locals.user;

    const parsed = UserUpdateDegreeSchema.safeParse(data);
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

    try{
        const updateDegree = db.prepare('UPDATE users SET degreeId = ? WHERE id = ?').run(degreeId, userId);
    } catch (err: any){

        if (err.message.includes("FOREIGN KEY")) {
           return json({ message: "Invalid degree ID provided" }, { status: 400 });
        }

        return new Response("Internal Server Error", { status: 500 });
    }
    requestedUser = db.prepare(`
        SELECT id, firstName, lastName, email, role, degreeId 
        FROM users WHERE id = ?
    `).get(userId);
    return json(requestedUser, {status: 200});
}
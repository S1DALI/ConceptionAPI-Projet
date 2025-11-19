import db from '$lib/db';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { UserSchema } from '$lib/schemas';

export const GET: RequestHandler = async () => {
    const users = db.prepare("SELECT * FROM users").all();
    return json(users, { status: 200 });
};

export const POST: RequestHandler = async ({ request }) => {
    const data = await request.json();
    const parsed = UserSchema.safeParse(data);

    if(!parsed.success){
        return new Response("Bad Request", { status: 400 });
    }

    const stmt = db.prepare(`
        INSERT INTO users (firstName, lastName, email, role, password, degreeId)
        VALUES (?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(parsed.data.firstName, parsed.data.lastName, parsed.data.email, parsed.data.role, parsed.data.password, parsed.data.degreeId);
    if(result.changes === 0){
        return new Response("Insertion failed", { status: 400 });
    }

    return json(result, { status: 201 });
}


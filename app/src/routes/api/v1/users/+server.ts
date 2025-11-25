import db from '$lib/db';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { UserSchema } from '$lib/schemas';
import { canEditUser } from "$lib/server/auth";

export const GET: RequestHandler = async ({ locals }) => {
    const user = locals.user;

    if (!user) {
        return new Response("Unauthorized", { status: 401 });
    }

    if (!canEditUser(user)) {
        return new Response("Unauthorized", { status: 401 });
    }

    const users = db.prepare("SELECT * FROM users").all();
    return json(users, { status: 200 });
};

export const POST: RequestHandler = async ({ request, locals }) => {
    const data = await request.json();
    const parsed = UserSchema.safeParse(data);
    const user = locals.user;

    if (!parsed.success) {
        return json({ message: "Bad Request" }, { status: 400 });
    }

    if(!canEditUser(user)) {
        return json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const stmt = db.prepare(`
            INSERT INTO users (firstName, lastName, email, role, password, degreeId)
            VALUES (?, ?, ?, ?, ?, ?)
        `);

        const result = stmt.run(
            parsed.data.firstName,
            parsed.data.lastName,
            parsed.data.email,
            parsed.data.role,
            parsed.data.password,
            parsed.data.degreeId
        );

        return json(result, { status: 201 });

    } catch (err: any) {

        if (err.message.includes("FOREIGN KEY")) {
            return json({ message: "Bad Request" }, { status: 400 });
        }

        if (err.message.includes("UNIQUE")) {
            return json({ message: "Email already exists" }, { status: 409 });
        }

        return json({ message: "Internal Server Error" }, { status: 500 });
    }
}


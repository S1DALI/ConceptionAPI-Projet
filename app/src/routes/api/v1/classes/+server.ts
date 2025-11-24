import type { RequestHandler } from "@sveltejs/kit";
import { ClassSchema } from "$lib/schemas";
import { ClassUpdateSchema } from "$lib/schemas";
import { canEditClass } from "$lib/server/auth";
import db from "$lib/db";


export const POST: RequestHandler = async ({ request, locals }) => {
    const user = locals.user;

    if (!user) {
        return new Response("Unauthorized", { status: 401 });
    }

    const data = await request.json();
    const parsed = ClassSchema.safeParse(data);

    if (!parsed.success) {
        return new Response("Bad Request", { status: 400 });
    }

    if (!canEditClass(user, parsed.data.courseId)) {
        return new Response("Unauthorized", { status: 401 });
    }

    const statement = db.prepare(`
        INSERT INTO classes (name, link, courseId)
        VALUES (?, ?, ?)
    `);

    const result = statement.run(parsed.data.name, parsed.data.link, parsed.data.courseId);

    const createdClass = {
        id: result.lastInsertRowid as number,
        name: parsed.data.name,
        link: parsed.data.link,
        courseId: parsed.data.courseId
    };

    return new Response(JSON.stringify(createdClass), { status: 200 });
};

export const PUT: RequestHandler = async ({ request, locals }) => {
    const user = locals.user;

    if (!user) {
        return new Response("Unauthorized", { status: 401 });
    }

    const data = await request.json();
    const parsed = ClassUpdateSchema.safeParse(data);

    if (!parsed.success) {
        return new Response("Bad Request", { status: 400 });
    }

    if (!canEditClass(user, parsed.data.courseId)) {
        return new Response("Unauthorized", { status: 401 });
    }

    const { id, name, link, courseId } = parsed.data;

    const statement = db.prepare(`
        UPDATE classes
        SET name = ?, link = ?, courseId = ?
        WHERE id = ?
    `);

    const result = statement.run(name, link, courseId, id);

    if (result.changes === 0) {
        return new Response("Class not found", { status: 404 });
    }

    return new Response("Successful update of class", { status: 200 });
};

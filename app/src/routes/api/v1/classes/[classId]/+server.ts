import type { RequestHandler } from "@sveltejs/kit";
import { canEditClass } from "$lib/server/auth";
import db from "$lib/db";


export const GET: RequestHandler = ({ params, locals }) => {
    const user = locals.user;
    const id = Number(params.classId);

    if (isNaN(id)) {
        return new Response("Bad Request", { status: 400 });
    }
    if(!user) {
        return new Response("Unauthorized", { status: 401 });
    }

    const statement = db.prepare(`
        SELECT id, name, link, courseId
        FROM classes
        WHERE id = ?
    `);

    const cls = statement.get(id);

    if (!cls) {
        return new Response("Class not found", { status: 404 });
    }

    return new Response(JSON.stringify(cls), { status: 200 });
};

export const DELETE: RequestHandler = ({ params, locals }) => {
    const user = locals.user;

    if (!user) {
        return new Response("Unauthorized", { status: 401 });
    }

    const id = Number(params.classId);

    if (isNaN(id)) {
        return new Response("Bad Request", { status: 400 });
    }

    if (!canEditClass(user, id)) {
        return new Response("Unauthorized", { status: 401 });
    }

    const statement = db.prepare(`
        DELETE FROM classes
        WHERE id = ?
    `);

    const result = statement.run(id);

    if (result.changes === 0) {
        return new Response("Class not found", { status: 404 });
    }

    return new Response("Class deleted", { status: 200 });
};

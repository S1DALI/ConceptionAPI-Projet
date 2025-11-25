import type { RequestHandler } from "@sveltejs/kit";
import { canEditDegree, canViewDegree } from "$lib/server/auth";
import db from "$lib/db";


export const GET: RequestHandler = ({ params, locals }) => {
    const user = locals.user;
    const id = Number(params.degreeId);

    if (isNaN(id)) {
        return new Response("Bad Request", { status: 400 });
    }
    
    if (!canViewDegree(user, id)) {
        return new Response("Unauthorized", { status: 401 });
    }

    const statement = db.prepare(`
        SELECT id, name
        FROM degrees
        WHERE id = ?
    `);

    const degree = statement.get(id);

    if (!degree) {
        return new Response("Degree not found", { status: 404 });
    }

    return new Response(JSON.stringify(degree), { status: 200 });
};

export const DELETE: RequestHandler = ({ params, locals }) => {
    const user = locals.user;

    if (!user) {
        return new Response("Unauthorized", { status: 401 });
    }

    const id = Number(params.degreeId);

    if (isNaN(id)) {
        return new Response("Bad Request", { status: 400 });
    }

    if (!canEditDegree(user)) {
        return new Response("Unauthorized", { status: 401 });
    }

    const statement = db.prepare(`
        DELETE FROM degrees
        WHERE id = ?
    `);

    const result = statement.run(id);

    if (result.changes === 0) {
        return new Response("Degree not found", { status: 404 });
    }

    return new Response("Degree deleted", { status: 200 });
};

import type { RequestHandler } from "@sveltejs/kit";
import db from "$lib/db";


export const GET: RequestHandler = ({ params }) => {
    const degreeId = Number(params.degreeId);

    if (isNaN(degreeId)) {
        return new Response("Bad Request", { status: 400 });
    }

    const statement = db.prepare(`
        SELECT id, name, degreeId, description
        FROM courses
        WHERE degreeId = ?
    `);

    const courses = statement.all(degreeId);

    return new Response(JSON.stringify(courses), { status: 200 });
};

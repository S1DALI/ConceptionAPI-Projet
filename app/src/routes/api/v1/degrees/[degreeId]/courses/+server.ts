import type { RequestHandler } from "@sveltejs/kit";
import db from "$lib/db";


export const GET: RequestHandler = ({ params }) => {
    const degreeId = Number(params.degreeId);

    if (isNaN(degreeId)) {
        return new Response("Bad Request", { status: 400 });
    }

    const degreeStmt = db.prepare(`
        SELECT id FROM degrees WHERE id = ?
    `);
    const degree = degreeStmt.get(degreeId);
    if (!degree) {
        return new Response("Degree not found", { status: 404 });
    }

    const coursesStmt = db.prepare(`
        SELECT id, name, degreeId, description
        FROM courses
        WHERE degreeId = ?
    `);
    const courses = coursesStmt.all(degreeId);

    return new Response(JSON.stringify(courses), { status: 200 });
};

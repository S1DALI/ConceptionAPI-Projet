import type { RequestHandler } from "@sveltejs/kit";
import { DegreeSchema } from "$lib/schemas";
import { DegreeUpdateSchema } from "$lib/schemas";
import db from "$lib/db";


export const GET: RequestHandler = () => {
    const rows = db.prepare("SELECT * FROM degrees").all();
    return new Response(JSON.stringify(rows), { status: 200 });
};

export const POST: RequestHandler = async ({ request }) => {
    const json = await request.json();
    const parsed = DegreeSchema.safeParse(json);

    if (!parsed.success) {
        return new Response("Bad Request", { status: 400 });
    }

    const statement = db.prepare(`
        INSERT INTO degrees (name)
        VALUES (?)
    `);

    const result = statement.run(parsed.data.name);

    const created = {
        id: result.lastInsertRowid as number,
        name: parsed.data.name
    };

    return new Response(JSON.stringify(created), { status: 200 });
};

export const PUT: RequestHandler = async ({ request }) => {
    const json = await request.json();
    const parsed = DegreeUpdateSchema.safeParse(json);

    if (!parsed.success) {
        return new Response("Bad Request", { status: 400 });
    }

    const { id, name } = parsed.data;

    const statement = db.prepare(`
        UPDATE degrees
        SET name = ?
        WHERE id = ?
    `);

    const result = statement.run(name, id);

    if (result.changes === 0) {
        return new Response("Degree not found", { status: 404 });
    }

    return new Response("Successful update of degree", { status: 200 });
};

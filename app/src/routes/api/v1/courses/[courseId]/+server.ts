import { json, error } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import { canEditClass } from "$lib/server/auth";
import db from "$lib/db";


export async function DELETE({ params, locals }: RequestEvent) {
    const user = locals.user;

    if (!user) {
        return new Response("Unauthorized", { status: 401 });
    }

    const id = Number(params.courseId);
    if (isNaN(id)) return new Response('Bad Request', { status: 400 });

    if (!canEditClass(user, id)) {
        return new Response("Unauthorized", { status: 401 });
    }

    const course = db.prepare("SELECT id FROM courses WHERE id = ?").get(id);
    if (!course) return new Response("Course not found", { status: 404 });

    db.prepare("DELETE FROM courses WHERE id = ?").run(id);

    return new Response("Course successfully deleted", { status: 200 });
}
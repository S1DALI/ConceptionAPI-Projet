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
    if (isNaN(id)) throw error(400, "Bad Request");

    if (!canEditClass(user, id)) {
        return new Response("Unauthorized", { status: 401 });
    }

    const course = db.prepare("SELECT id FROM courses WHERE id = ?").get(id);
    if (!course) throw error(404, "Course not found");

    db.prepare("DELETE FROM courses WHERE id = ?").run(id);

    return json({ message: "Course deleted" });
}
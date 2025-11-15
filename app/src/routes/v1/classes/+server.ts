import type { RequestHandler } from "@sveltejs/kit";
import { ClassSchema } from "$lib/schemas";

let classes = [
    { id: 101, name: "Lecture 1: Big O Notation", link: "https://www.example.com/lecture1", courseId: 12 },
    { id: 102, name: "Lecture 2: Arrays", link: "https://www.example.com/lecture2", courseId: 12 }
];

export const POST: RequestHandler = async ({ request }) => {
    const data = await request.json();
    const parsed = ClassSchema.safeParse(data);

    if (!parsed.success) {
        return new Response("Bad Request", { status: 400 });
    }

    const newClass = {
        id: Math.max(...classes.map(c => c.id)) + 1,
        ...parsed.data
    };

    classes.push(newClass);

    return new Response(JSON.stringify(newClass), { status: 200 });
};

export const PUT: RequestHandler = async ({ request }) => {
    const data = await request.json();
    const parsed = ClassSchema.safeParse(data);

    if (!parsed.success) {
        return new Response("Bad Request", { status: 400 });
    }

    if (!parsed.data.id) {
        return new Response("Bad Request", { status: 400 });
    }

    const index = classes.findIndex(c => c.id === parsed.data.id);

    if (index === -1) {
        return new Response("Class not found", { status: 404 });
    }

    classes[index] = { id: parsed.data.id, name: parsed.data.name, link: parsed.data.link, courseId: parsed.data.courseId };

    return new Response("Successful update of class", { status: 200 });
};

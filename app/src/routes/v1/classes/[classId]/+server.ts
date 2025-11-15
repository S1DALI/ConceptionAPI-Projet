import type { RequestHandler } from "@sveltejs/kit";

let classes = [
    { id: 101, name: "Lecture 1: Big O Notation", link: "https://www.example.com/lecture1", courseId: 12 },
    { id: 102, name: "Lecture 2: Recursion", link: "https://www.example.com/lecture2", courseId: 12 }
];

export const GET: RequestHandler = ({ params }) => {
    const id = Number(params.classId);

    if (isNaN(id)) {
        return new Response("Bad Request", { status: 400 });
    }

    const cls = classes.find(c => c.id === id);
    if (!cls) {
        return new Response("Class not found", { status: 404 });
    }

    return new Response(JSON.stringify(cls), { status: 200 });
};

export const DELETE: RequestHandler = ({ params }) => {
    const id = Number(params.classId);

    if (isNaN(id)) {
        return new Response("Bad Request", { status: 400 });
    }

    const exists = classes.some(c => c.id === id);
    if (!exists) {
        return new Response("Class not found", { status: 404 });
    }

    classes = classes.filter(c => c.id !== id);

    return new Response("Class deleted", { status: 200 });
};

import type { RequestHandler } from "@sveltejs/kit";

let degrees = [
    { id: 1, name: "Computer Science" },
    { id: 2, name: "Business Administration" }
];

export const GET: RequestHandler = ({ params }) => {
    const id = Number(params.degreeId);

    if (isNaN(id)) {
        return new Response("Bad Request", { status: 400 });
    }

    const degree = degrees.find(d => d.id === id);

    if (!degree) {
        return new Response("Degree not found", { status: 404 });
    }

    return new Response(JSON.stringify(degree), { status: 200 });
};

export const DELETE: RequestHandler = ({ params }) => {
    const id = Number(params.degreeId);

    if (isNaN(id)) {
        return new Response("Bad Request", { status: 400 });
    }

    const exists = degrees.some(d => d.id === id);

    if (!exists) {
        return new Response("Degree not found", { status: 404 });
    }

    degrees = degrees.filter(d => d.id !== id);

    return new Response("Degree deleted", { status: 200 });
};

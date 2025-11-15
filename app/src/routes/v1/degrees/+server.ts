import type { RequestHandler } from "@sveltejs/kit";
import { DegreeSchema } from "$lib/schemas";

let degrees = [
    { id: 1, name: "Computer Science" },
    { id: 2, name: "Business Administration" }
];

export const GET: RequestHandler = () => {
    return new Response(JSON.stringify(degrees), { status: 200 });
};

export const POST: RequestHandler = async ({ request }) => {
    const json = await request.json();
    const parsed = DegreeSchema.safeParse(json);

    if (!parsed.success) {
        return new Response("Bad Request", { status: 400 });
    }

    const newDegree = {
        id: Math.max(...degrees.map(d => d.id)) + 1,
        name: parsed.data.name
    };

    degrees.push(newDegree);

    return new Response(JSON.stringify(newDegree), { status: 200 });
};

export const PUT: RequestHandler = async ({ request }) => {
    const json = await request.json();
    const parsed = DegreeSchema.safeParse(json);

    if (!parsed.success) {
        return new Response("Bad Request", { status: 400 });
    }

    const { id, name } = parsed.data;
    if (!id) {
        return new Response("Bad Request", { status: 400 });
    }

    const degree = degrees.find(d => d.id === id);
    if (!degree) {
        return new Response("Degree not found", { status: 404 });
    }

    degree.name = name;

    return new Response(JSON.stringify(degree), { status: 200 });
};

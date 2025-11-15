import type { RequestHandler } from "@sveltejs/kit";

let courses = [
    { id: 12, name: "Introduction to Algorithms", degreeId: 1 },
    { id: 13, name: "Data Structures", degreeId: 1 }
];

export const GET: RequestHandler = ({ params }) => {
    const id = Number(params.degreeId);

    if (isNaN(id)) {
        return new Response("Bad Request", { status: 400 });
    }

    const list = courses.filter(c => c.degreeId === id);

    return new Response(JSON.stringify(list), { status: 200 });
};

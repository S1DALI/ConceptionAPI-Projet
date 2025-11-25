import { json, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ cookies, locals }) => {
    const user = locals.user;
    if(!user) {
        return json({ message: "Unauthorized" }, { status: 401 });
    }
    cookies.delete('authToken', { path: '/' });
    throw redirect(303, '/');
};
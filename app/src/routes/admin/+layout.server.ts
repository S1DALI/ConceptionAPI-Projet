import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
    if (!locals.user || locals.user.role !== 3) {
        throw redirect(302, '/');
    }

    return {
        user: locals.user
    };
};

import db from '$lib/db';
import { redirect, fail } from '@sveltejs/kit';

export const load = async ({ params }) => {
    const userId = Number(params.userId);

    if (isNaN(userId)) {
        throw redirect(302, '/admin/users');
    }

    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
    const degrees = db.prepare('SELECT * FROM degrees').all();

    if (!user) {
        throw redirect(302, '/admin/users');
    }

    return {
        targetUser: user,
        degrees
    };
};

export const actions = {
    default: async ({ request, params, fetch }) => {
        const userId = params.userId;
        const data = await request.formData();

        const role = Number(data.get('role'));
        const degreeId = Number(data.get('degreeId'));

        if (isNaN(role) || isNaN(degreeId)) {
            return fail(400, { message: 'Invalid data' });
        }

        console.log(`Sending PATCH request to /api/v1/users/${userId}`, { role, degreeId });
        const response = await fetch(`/api/v1/users/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ role, degreeId })
        });

        console.log('Response status:', response.status);
        if (!response.ok) {
            const text = await response.text();
            console.log('Response error:', text);
            return fail(response.status, { message: `Update failed: ${text}` });
        }

        throw redirect(303, '/admin/users');
    }
};

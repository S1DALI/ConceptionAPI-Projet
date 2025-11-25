import { redirect, fail } from '@sveltejs/kit';

export const load = async ({ params, fetch }) => {
    const userId = Number(params.userId);

    if (isNaN(userId)) {
        throw redirect(302, '/admin/users');
    }

    const [userResponse, degreesResponse] = await Promise.all([
        fetch(`/api/v1/users/${userId}`),
        fetch('/api/v1/degrees')
    ]);

    if (!userResponse.ok) {
        throw redirect(302, '/admin/users');
    }

    const user = await userResponse.json();
    const degrees = await degreesResponse.json();

    return {
        targetUser: user,
        degrees
    };
};

export const actions = {
    patch: async ({ request, params, fetch }) => {
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
    },

    delete: async ({ params, fetch }) => {
        const userId = params.userId;
        console.log(`Sending DELETE request to /api/v1/users/${userId}`);

        const response = await fetch(`/api/v1/users/${userId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            const text = await response.text();
            return fail(response.status, { message: `Delete failed: ${text}` });
        }

        throw redirect(303, '/admin/users');
    }
};
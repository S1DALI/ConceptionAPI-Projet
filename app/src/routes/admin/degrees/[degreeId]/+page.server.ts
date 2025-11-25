import { redirect, fail } from '@sveltejs/kit';

export const load = async ({ params, fetch }) => {
    const degreeId = Number(params.degreeId);

    if (isNaN(degreeId)) {
        throw redirect(302, '/admin/degrees');
    }

    const [degreeResponse] = await Promise.all([
        fetch(`/api/v1/degrees/${degreeId}`)
    ]);

    if (!degreeResponse.ok) {
        throw redirect(302, '/admin/degree');
    }

    const degree = await degreeResponse.json();
    return {
        targetDegree: degree
    };
};

export const actions = {
    put: async ({ request, params, fetch }) => {
        const degreeId = params.degreeId;
        const data = await request.formData();

        const name = Number(data.get('name'));
        console.log("eedrefrfrfr");
        if (isNaN(name)) {
            return fail(400, { message: 'Invalid data' });
        }

        const response = await fetch(`/api/v1/degrees`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ degreeId, name })
        });

        console.log('Response status:', response.status);
        if (!response.ok) {
            const text = await response.text();
            console.log('Response error:', text);
            return fail(response.status, { message: `Update failed: ${text}` });
        }

        throw redirect(303, '/admin/degrees');
    },

    delete: async ({ params, fetch }) => {
        const degreeId = params.degreeId;

        const response = await fetch(`/api/v1/degrees/${degreeId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            const text = await response.text();
            return fail(response.status, { message: `Delete failed: ${text}` });
        }

        throw redirect(303, '/admin/degrees');
    }
};
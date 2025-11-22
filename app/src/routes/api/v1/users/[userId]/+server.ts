import db from '$lib/db';
import { json } from '@sveltejs/kit';
import { UserSchema } from '$lib/schemas';

export function GET({ params }) {
    const { userId } = params;

    const user = db.prepare(`
        SELECT id, firstName, lastName, email, role, degreeId 
        FROM users WHERE id = ?
    `).get(userId);

    if (!user) {
        return json({ error: 'User not found' }, { status: 404 });
    }
    return json(user, { status : 200});

}

export function DELETE({ params }) {
    const { userId } = params;

    const user = db.prepare('SELECT id FROM users WHERE id = ?').get(userId);
    
    if (!user) {
        return json({ error: 'User not found' }, { status: 404 });
    }

    db.prepare('DELETE FROM users WHERE id = ?').run(userId);
    return json({ message: 'User deleted successfully', status : 200 });
}

import db from '$lib/db';

export const load = async () => {
    const users = db.prepare(`
        SELECT users.*, degrees.name as degreeName 
        FROM users 
        LEFT JOIN degrees ON users.degreeId = degrees.id
    `).all();
    return {
        users
    };
};

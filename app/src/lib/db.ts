import Database from "better-sqlite3";

const db = new Database('mydb.db');

db.exec(`
    DROP TABLE IF EXISTS classes;
    DROP TABLE IF EXISTS courses;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS degrees;

    CREATE TABLE degrees (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
    );

    CREATE TABLE courses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        degreeId INT NOT NULL,
        description TEXT,
        FOREIGN KEY (degreeId) REFERENCES degrees(id)
    );

    CREATE TABLE classes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        link TEXT NOT NULL,
        courseId INT NOT NULL,
        FOREIGN KEY (courseId) REFERENCES courses(id)
    );

    CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        role INT NOT NULL,
        password TEXT,
        degreeId INT NOT NULL,
				googleId TEXT UNIQUE,
        FOREIGN KEY (degreeId) REFERENCES degrees(id)
    );
`);


const defaultDegrees = [
    { name: "Computer Science" },
    { name: "Business Administration" }
];

const insert = db.prepare("INSERT INTO degrees (name) VALUES (?)");

const insertMany = db.transaction((rows: { name: string }[]) => {
    for (const r of rows) {
        insert.run(r.name);
    }
});

insertMany(defaultDegrees);

const insertUser = db.prepare(`
    INSERT OR IGNORE INTO users (firstName, lastName, email, role, password, degreeId) 
    VALUES (?, ?, ?, ?, ?, ?)
`);

insertUser.run('Admin', 'System', 'admin@univ.fr', 0, 'admin123', 1);

export function getUserByEmail(email: string): any {
	const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
	const user = stmt.get(email) as any;
	if (!user) return null;

	return {
		id: user.id,
		firstname: user.firstName,
		lastname: user.lastName,
		email: user.email,
		degreeId: user.degreeId,
		role: user.role,
		googleId: user.googleId
	};
}

export function getUserByGoogleId(googleId: string): any {
	const stmt = db.prepare('SELECT * FROM users WHERE googleId = ?');
	const user = stmt.get(googleId) as any;
	if (!user) return null;

	return {
		id: user.id,
		firstname: user.firstName,
		lastname: user.lastName,
		email: user.email,
		degreeId: user.degreeId,
		role: user.role,
		googleId: user.googleId
	};
}

export function createOrUpdateUserFromGoogle(data: {
	email: string;
	firstName: string;
	lastName: string;
	googleId: string;
}): any {
	const existingUser = getUserByEmail(data.email) || getUserByGoogleId(data.googleId);

	if (existingUser) {
		const stmt = db.prepare('UPDATE users SET googleId = ? WHERE email = ?');
		stmt.run(data.googleId, data.email);
		return getUserByEmail(data.email);
	} else {
		const stmt = db.prepare(`
            INSERT INTO users (firstName, lastName, email, googleId, role, password, degreeId)
            VALUES (?, ?, ?, ?, 0, NULL, NULL)
        `);
		stmt.run(data.firstName, data.lastName, data.email, data.googleId);
		return getUserByEmail(data.email);
	}
}

export default db;
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
        FOREIGN KEY (degreeId) REFERENCES degrees(id) ON DELETE CASCADE
    );

    CREATE TABLE classes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        link TEXT NOT NULL,
        courseId INT NOT NULL,
        FOREIGN KEY (courseId) REFERENCES courses(id) ON DELETE CASCADE
    );

    CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        role INT NOT NULL,
        password TEXT,
        degreeId INT,
		googleId TEXT UNIQUE,
        FOREIGN KEY (degreeId) REFERENCES degrees(id) ON DELETE CASCADE
    );
`);


// ------------------------------------------------------
//   DEFAULT DEGREES
// ------------------------------------------------------

const defaultDegrees = [
    { name: "Computer Science" },           // id = 1
    { name: "Business Administration" }     // id = 2
];

const insertDegree = db.prepare("INSERT INTO degrees (name) VALUES (?)");
const insertManyDegrees = db.transaction((rows: { name: string }[]) => {
    for (const r of rows) insertDegree.run(r.name);
});
insertManyDegrees(defaultDegrees);


// ------------------------------------------------------
//   DEFAULT COURSES
// ------------------------------------------------------

const defaultCourses = [
    // --- CS (degreeId = 1) ---
    { name: "Algorithms", degreeId: 1, description: "Introduction to algorithms and complexity." },
    { name: "Databases", degreeId: 1, description: "SQL, relational design and transactions." },

    // --- Business (degreeId = 2) ---
    { name: "Marketing Basics", degreeId: 2, description: "Core principles of marketing." },
];

const insertCourse = db.prepare(
    "INSERT INTO courses (name, degreeId, description) VALUES (?, ?, ?)"
);

const insertManyCourses = db.transaction((rows: any[]) => {
    for (const c of rows) insertCourse.run(c.name, c.degreeId, c.description);
});
insertManyCourses(defaultCourses);


// ------------------------------------------------------
//   DEFAULT CLASSES
// ------------------------------------------------------

// On récupère les IDs des cours qu’on vient d’insérer
const allCourses = db.prepare("SELECT * FROM courses").all();

const defaultClasses = allCourses.flatMap((course) => [
    {
        name: `${course.name} - Introduction`,
        link: "https://example.com/video1",
        courseId: course.id
    },
    {
        name: `${course.name} - Advanced`,
        link: "https://example.com/video2",
        courseId: course.id
    }
]);

const insertClass = db.prepare(
    "INSERT INTO classes (name, link, courseId) VALUES (?, ?, ?)"
);

const insertManyClasses = db.transaction((rows: any[]) => {
    for (const cl of rows)
        insertClass.run(cl.name, cl.link, cl.courseId);
});
insertManyClasses(defaultClasses);


// ------------------------------------------------------
//   DEFAULT USERS
// ------------------------------------------------------

const insertUser = db.prepare(`
    INSERT OR IGNORE INTO users (firstName, lastName, email, role, password, degreeId) 
    VALUES (?, ?, ?, ?, ?, ?)
`);

insertUser.run('Admin', 'System', 'admin@univ.fr', 0, 'admin123', 1);

// ------------------------------------------------------
//   EXPORTS
// ------------------------------------------------------ 

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
            VALUES (?, ?, ?, ?, 3, NULL, NULL)
        `);
        stmt.run(data.firstName, data.lastName, data.email, data.googleId);
        return getUserByEmail(data.email);
    }
}

export function getAllDegrees() {
    const stmt = db.prepare("SELECT * FROM degrees");
    return stmt.all();
}

export function getCourses() {
    const stmt = db.prepare("SELECT * FROM courses");
    return stmt.all();
}

export default db;
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
        password TEXT NOT NULL,
        degreeId INT NOT NULL,
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
export default db;
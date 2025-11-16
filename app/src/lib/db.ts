import Database from "better-sqlite3";

const db = new Database('mydb.db');

db.exec(`
    CREATE TABLE IF NOT EXISTS degrees (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS courses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        degreeId INT NOT NULL,
        FOREIGN KEY (degreeId) REFERENCES degrees(id)
    );

    CREATE TABLE IF NOT EXISTS classes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        link TEXT NOT NULL,
        courseId INT NOT NULL,
        FOREIGN KEY (courseId) REFERENCES courses(id)
    );

    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        email TEXT NOT NULL,
        role INT NOT NULL,
        password TEXT NOT NULL,
        degreeId INT NOT NULL,
        FOREIGN KEY (degreeId) REFERENCES degrees(id)
    );
`);

// --- DEGREES ---
db.prepare("DELETE FROM degrees").run();

const defaultDegrees = [
    { name: "Computer Science" },
    { name: "Business Administration" }
];

const insertDegree = db.prepare("INSERT INTO degrees (name) VALUES (?)");

const insertManyDegrees = db.transaction((rows: { name: string }[]) => {
    for (const r of rows) {
        insertDegree.run(r.name);
    }
});

insertManyDegrees(defaultDegrees);

// --- CLASSES ---

db.prepare("DELETE FROM classes").run();

let defaultClasses = [
    { name: "Lecture 1: Big O Notation", link: "https://www.example.com/lecture1", courseId: 1 },
    { name: "Lecture 2: Recursion", link: "https://www.example.com/lecture2", courseId: 1 }
];

const insertClass = db.prepare("INSERT INTO classes (name, link, courseId) VALUES (?, ?, ?)");

const insertManyClasses = db.transaction((rows: { name: string, link: string, courseId: number }[]) => {
    for (const r of rows) {
        insertClass.run(r.name, r.link, r.courseId);
    }
});

insertManyClasses(defaultClasses);

export default db;

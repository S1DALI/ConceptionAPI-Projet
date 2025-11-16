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

db.prepare("DELETE FROM degrees").run();

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

export default db;

import { json } from "@sveltejs/kit";
import Database from "better-sqlite3";

export async function GET(): Promise<Response> {
    // Si "mydb.sqlite" n'existe pas → il sera créé automatiquement
    const db = new Database('mydb.db');
    // Créer une table si elle n'existe pas
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
    return json({ message: 'je test le backend' });
}

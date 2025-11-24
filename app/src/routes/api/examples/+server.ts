import { json } from "@sveltejs/kit";
import Database from "better-sqlite3";

const db = new Database('mydb.db');



/*
Exemple d'utilisation de la bd il faut ajouter les paramêtres et hasher le mdp c'est juste pour voir comment utiliser
*/
export async function POST(): Promise<Response> {

  // Ajout de degrees
  db.exec(`
    INSERT INTO degrees (name) VALUES 
    ('Licence Informatique'),
    ('Master Génie Logiciel'),
    ('Diplôme Ingénieur Réseaux')
  `);

  // Ajout de cours
  db.exec(`
    INSERT INTO courses (name, degreeId, description) VALUES
    ('Algorithmes et Structures de Données', 1, 'Fondamentaux des algorithmes'),
    ('Programmation Web', 1, 'Développement front-end et back-end'),
    ('Architecture Logicielle', 2, 'Design patterns et architecture'),
    ('Administration Réseaux', 3, 'Gestion et configuration des réseaux')
  `);

  // Ajout de users
  db.exec(`
    INSERT INTO users (firstName, lastName, email, role, password, degreeId) VALUES
    ('Alice', 'Dupont', 'alice.dupont@example.com', 1, 'password1', 1),
    ('Bob', 'Martin', 'bob.martin@example.com', 1, 'password2', 1),
    ('Marie', 'Lefevre', 'marie.lefevre@example.com', 2, 'password3', 2),
    ('Jean', 'Admin', 'admin@example.com', 0, 'adminpass', 1),
    ('Sophie', 'Dubois', 'sophie.dubois@example.com', 3, 'password4', 1)
  `);

  // Ajout de séances (classes)
  db.exec(`
    INSERT INTO classes (name, link, courseId) VALUES
    ('Cours 1 - Introduction', 'https://example.com/course/algo-1', 1),
    ('Cours 2 - Structures Avancées', 'https://example.com/course/algo-2', 1),
    ('TP HTML/CSS', 'https://example.com/course/web-1', 2),
    ('TP JavaScript', 'https://example.com/course/web-2', 2)
  `);

  return json({message : 'Exemple : degrees, courses, users et classes insérés'});
}


  export async function GET(): Promise<Response> {
    let query = db.prepare(`
        SELECT * FROM degrees 
    `);

    let result = query.all();
    

    console.log(result);
    return json({message : 'je test le backend'});
  }

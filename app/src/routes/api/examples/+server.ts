import { json } from "@sveltejs/kit";
import Database from "better-sqlite3";

const db = new Database('mydb.db');



/*
Exemple d'utilisation de la bd il faut ajouter les paramêtres et hasher le mdp c'est juste pour voir comment utiliser
*/
export async function POST(): Promise<Response> {
    db.exec(`
        INSERT INTO degrees (name) VALUES 
        ('Master'),
        ('Licence')
    `);
    

    return json({message : 'je test le backend'});
  }


  export async function GET(): Promise<Response> {
    let query = db.prepare(`
        SELECT * FROM degrees 
    `);

    let result = query.all();
    

    console.log(result);
    return json({message : 'je test le backend'});
  }

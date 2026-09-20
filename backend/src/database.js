import sqlite3 from "sqlite3";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);



const dbPath =
process.env.DATABASE_PATH ||
"./database/database.sqlite";




const db = new sqlite3.Database(
    dbPath,
    (err) => {

        if (err) {

            console.error(
                "Database connection error:",
                err.message
            );

        } else {

            console.log(
                "SQLite connected"
            );

        }

    }
);



db.serialize(() => {

    db.run(`

    CREATE TABLE IF NOT EXISTS acceptances (

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        name TEXT NOT NULL,

        company TEXT,

        position TEXT,

        phone TEXT NOT NULL,

        email TEXT,

        tracking_code TEXT UNIQUE,

        created_at DATETIME DEFAULT CURRENT_TIMESTAMP

    )
        

    `);
    db.run(`

CREATE TABLE IF NOT EXISTS admins (

id INTEGER PRIMARY KEY AUTOINCREMENT,

phone TEXT UNIQUE NOT NULL,

password TEXT NOT NULL,

created_at DATETIME DEFAULT CURRENT_TIMESTAMP

)

`);

});



export default db;
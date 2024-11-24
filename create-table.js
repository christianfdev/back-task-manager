import { sql } from "./db.js";

// sql`DROP TABLE IF EXISTS tasks`.then(() => {
//     console.log('Tabela apagada!')
// })

sql`
CREATE TABLE tasks (
    id  TEXT PRIMARY KEY,
    title TEXT,
    description TEXT,
    isCompleted BOOLEAN
);
`.then(() => {
    console.log('Tabela Criada!');
})
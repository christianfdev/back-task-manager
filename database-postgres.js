import { randomUUID } from "crypto";
import { sql } from './db.js';


export class DatabasePostgres {


    async list(search){
        let tasks; 

        if (search) {
            tasks = await sql`select * from tasks where title ilike ${'%' + search + '%'}`;
        } else {
            tasks = await sql`select * from tasks`;
        }

        return tasks;
    }

    async create(task) {
        const taskId = randomUUID();

        const { title, description } = task;

        await sql`insert into tasks (id, title, description) VALUES (${taskId}, ${title}, ${description})`;
        
    }

    async update(taskId, task) {
        
        const { title, description } = task;

        await sql`update tasks set title = ${title}, description = ${description} WHERE id = ${taskId}`;
        
    }

    async delete(id) {
     
        await sql`delete from tasks where id = ${id}`; 
    }
}
import { fastify } from 'fastify';
import { DatabasePostgres } from './database-postgres.js';

import cors from '@fastify/cors';


const database = new DatabasePostgres()

const server = fastify();

server.register(cors, {
    origin: '*', // Permite todas as origens. Substitua com uma URL específica para restringir.
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
    credentials: true, // Se true, permite o envio de cookies e headers de autenticação
  });


server.post('/tasks', async (request, reply) => {
    

    const { title, description } = request.body;

    await database.create({
        title,
        description,
    })

    return reply.status(201).send();
    
})



server.get('/tasks', async (request) => {
    
    const search = request.query.search;

    console.log(search);
    
    const tasks = await database.list(search);

    return tasks;
})



server.put('/tasks/:id', async (request, reply) => {
    
    const taskId = request.params.id;
    const { title, description } = request.body;

    await database.update(taskId, {
        title,
        description,
    });

    return reply.status(204).send();

})


server.delete('/tasks/:id', async (request, reply) => {
    
    const taskId = request.params.id;
    
    await database.delete(taskId);
    
    return reply.status(204).send();

})


server.listen({
    host: '0.0.0.0', 
    port: process.env.PORT || 3333,
})
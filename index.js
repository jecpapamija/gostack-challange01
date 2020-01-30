const express = require('express');

const server = express();
server.use(express.json());

const projects = [];
request_count = 0;

// global middleware 
server.use((request, response, next) => {
    console.log(request_count++);
    return next();
});

// checar se o id existe
function checkIdExists(request, response, next){
    project = projects.find(prj => prj.id == request.params.id)

    if(!project){
        return response.status(400).json({error: "Project id does not exists"});
    }
    return next();
}

// cadastrar um projeto
server.post('/projects', (request, response) => {
    const {id, title} = request.body;
    
    const project = {
        id,
        title,
        tasks:[]
    };

    projects.push(project);
    return response.json(projects);
});

// obter lista de todos os projetos
server.get('/projects', (request, response) => {
    return response.json(projects);
});

// Alterar titulo do projeto
server.put('/projects/:id', checkIdExists, (request, response) => {
    const {id} = request.params;
    const {title} = request.body;

    project = projects.find(prj => prj.id == id);
    project.title = title;

    return response.json(projects);
});

// Delete a project
server.delete('/projects/:id', checkIdExists, (request, response) => {
    const {id} = request.params;
    
    index = projects.findIndex(prj => prj.id == id);
    projects.splice(index, 1);
    return response.send();
});

// add tarefa
server.post('/projects/:id/tasks', checkIdExists, (request, response) => {
    const {id} = request.params;
    const {title} = request.body;

    project = projects.find(prj => prj.id == id);
    project.tasks.push(title);

    return response.json(projects);
});

server.listen(3333);
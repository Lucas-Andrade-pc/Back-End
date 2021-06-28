const { response, request } = require('express');
const express = require('express'); //usando a função express
const {uuid} = require('uuidv4') // gerando Id unicos 
const cors = require('cors')


/**
 * Métodos HTTP:
 * 
 * GET: Buscar informações no back-end
 * POST: Criar uma informação no back-end
 * PUT/PATCH: Atualizar uma informação no back-end
 * DELETE: Deleta uma informação no back-end
 */

/**
 * Tipos de paramentros
 * 
 * Query params: Filtros e paginação
 * Route Params: Identificar recursos(Atualziar/Deletar)
 * Request Body: Conteúdo na hora de criar ou editar um recurso (JSON)
 */

/**
 * Middleware
 * 
 * Interceptador de requisições que interrompe totalmente a requisição ou alterar dados da requisição
 */


const app = express(); // app recebe express, onde essa função é responsavel pelo os metodos get,post..

app.use(cors())

app.use(express.json())

const projects = []; // Arry de projetos, onde vou armazenar meus projetos

app.get('/projects', (request, response) => {  //metodo get onde vou retornar todos os meus projetos do array
    
    const {title} = request.query;

    const result = title
        ?projects.filter(project => project.title.includes(title))
        :projects
    
    return response.json(result) // retornando os metodos em json
})

app.post('/projects', (request, response) => {
    const {title, owner} = request.body;

    const project = {id: uuid(), title, owner };

    projects.push(project);

    return response.json(project);
})

app.put('/projects/:id', (request, response) => {
    const {id} = request.params;
    const {title, owner} = request.body;
    const projectIndex = projects.findIndex(project => project.id == id);

    if (projectIndex < 0){
        return response.status(400).json({ error: 'Not found'})
    }

    const project = {
        id,
        title,
        owner
    }

    projects[projectIndex] = project

    return response.json(project)

})

app.delete('/projects/:id', (request,response) => {
    const {id} = request.params;
    const projectIndex = projects.findIndex(project => project.id == id);

    if (projectIndex < 0){
        return response.status(400).json({ error: 'Not found'})
    }

    projects.splice(projectIndex, 1)

    return response.status(204).send()

})


app.listen(3333, () =>{
    console.log('Started Servidor...📡')
});
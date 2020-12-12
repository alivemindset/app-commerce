import Router from 'express'
import ClientController from './app/controllers/ClientController'

const routes = Router()

routes.get('/', async (request, response) => response.status(200))

routes.get('/clientes', new ClientController().index)
routes.get('/clientes/:id', new ClientController().show)
routes.post('/clientes', new ClientController().store)
routes.put('/clientes/:id', new ClientController().update)
routes.delete('/clientes/:id', new ClientController().remove)

export default routes

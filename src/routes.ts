import Router from 'express'
import ClientController from './app/controllers/ClientController'
import ProductController from './app/controllers/ProductController'

const routes = Router()

routes.get('/', async (request, response) => response.status(200))

routes.get('/clientes', new ClientController().index)
routes.get('/clientes/:id', new ClientController().show)
routes.post('/clientes', new ClientController().store)
routes.put('/clientes/:id', new ClientController().update)
routes.delete('/clientes/:id', new ClientController().remove)

routes.get('/produtos', new ProductController().index)
routes.get('/produtos/:id', new ProductController().show)

export default routes

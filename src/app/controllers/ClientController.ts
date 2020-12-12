import { Request, Response } from 'express'
import Clients from '../models/Clients'
import { getRepository } from 'typeorm'
import { isNumber } from '../utils/utils'

export default class ClientController {
  async index (request: Request, response: Response) {
    const clients = await getRepository(Clients).find()

    return response.status(200).json(clients)
  }

  async show (request: Request, response: Response) {
    const { id } = request.params

    if (!isNumber(id)) return response.status(400).json({ message: 'Invalid params' })

    const client = await getRepository(Clients).findOne({ id: Number(id) })

    return response.status(200).json(client)
  }

  async store (request: Request, response: Response) {
    const { name, email, document, genre } = request.body

    if (!name || name.trim() === '') return response.status(400).json({ message: 'Name is required' })
    if (!email || email.trim() === '') return response.status(400).json({ message: 'E-mail is required' })
    if (!document || document.trim() === '') return response.status(400).json({ message: 'Document is required' })
    if (!genre || genre.trim() === '') return response.status(400).json({ message: 'Genre is required' })

    const hasDocument = !!await await getRepository(Clients).findOne({ document })
    const hasEmail = !!await await getRepository(Clients).findOne({ email })

    if (hasDocument) return response.status(409).json({ message: 'Document already exists' })
    if (hasEmail) return response.status(409).json({ message: 'E-mail already exists' })

    const newClient = new Clients()
    newClient.name = name
    newClient.email = email
    newClient.document = document
    newClient.genre = genre

    const client = await getRepository(Clients).save(newClient)

    if (client.id >= 0) return response.status(201).json({ message: 'Client created', client })
    else return response.status(500).json({ message: 'Error in create a new client', client })
  }

  async update (request: Request, response: Response) {
    const { id } = request.params
    const { name, document, email, genre } = request.body

    if (!isNumber(id)) return response.status(400).json({ message: 'Invalid params' })

    const client = await getRepository(Clients).findOne({ id: Number(id) })
    if (typeof client === 'undefined') return response.status(404).json({ message: 'Client not found' })

    client.name = name
    client.document = document
    client.email = email
    client.genre = genre

    const userSaved = await getRepository(Clients).save(client)

    return response.status(200).json({ message: 'Client updated', client: userSaved })
  }

  async remove (request: Request, response: Response) {
    const { id } = request.params
    if (!isNumber(id)) return response.status(400).json({ message: 'Invalid params' })

    const deletedClient = await getRepository(Clients).delete({ id: Number(id) })

    return response.status(200).json({ message: 'Client deleted', client: deletedClient })
  }
}

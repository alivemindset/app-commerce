import { Request, Response } from 'express'
import Clients from '../models/Clients'
import { getRepository } from 'typeorm'
import { notSetOrEmpty } from '../utils/utils'
import { alreadyHasClientWithThisDocument, alreadyHasClientWithThisEmail, getClientById, saveClient } from '../utils/ClientUtils'
import { isRequired } from '../views/errors/isRequired'

export default class ClientController {
  async index (request: Request, response: Response) {
    const clients = await getRepository(Clients).find()

    return response.status(200).json(clients)
  }

  async show (request: Request, response: Response) {
    const { id } = request.params
    const client = await getClientById(id)

    return response.status(200).json(client)
  }

  async store (request: Request, response: Response) {
    const { name, email, document, genre } = request.body

    if (notSetOrEmpty(name)) return isRequired('Name', response)
    if (notSetOrEmpty(email)) return isRequired('E-mail', response)
    if (notSetOrEmpty(document)) return isRequired('Document', response)
    if (notSetOrEmpty(genre)) return isRequired('Genre', response)

    await alreadyHasClientWithThisEmail(email)
    await alreadyHasClientWithThisDocument(document)

    const newClient = new Clients()
    newClient.name = name
    newClient.email = email
    newClient.document = document
    newClient.genre = genre

    const client = await saveClient(newClient)

    if (client.id >= 0) return response.status(201).json({ message: 'Client created', client })
  }

  async update (request: Request, response: Response) {
    const { id } = request.params
    const { name, document, email, genre } = request.body

    const client = await getClientById(id)
    await alreadyHasClientWithThisEmail(email)
    await alreadyHasClientWithThisDocument(document)

    client.name = name
    client.document = document
    client.email = email
    client.genre = genre

    const clientSaved = await saveClient(client)

    return response.status(200).json({ message: 'Client updated', client: clientSaved })
  }

  async remove (request: Request, response: Response) {
    const { id } = request.params

    const client = await getClientById(id)
    await getRepository(Clients).delete({ id: Number(id) })

    return response.status(200).json({ message: 'Client deleted', client: client })
  }
}

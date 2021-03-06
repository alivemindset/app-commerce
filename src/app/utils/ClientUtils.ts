import Clients from '../models/Clients'
import { getRepository } from 'typeorm'
import { ClientNotFound, ConflictDocument, ConflictEmail, isNumber, NotIsNumber } from './utils'

export const getClientById = async (id: number | string) => {
  if (!isNumber(id)) throw new NotIsNumber()

  const client = await getRepository(Clients).findOne({ id: Number(id) })
  if (!client) throw new ClientNotFound()

  return client
}

export const alreadyHasClientWithThisEmail = async (email: string) => {
  const client = await getRepository(Clients).findOne({ email })
  if (client) throw new ConflictEmail()
  else return false
}

export const alreadyHasClientWithThisDocument = async (document: string) => {
  const client = await getRepository(Clients).findOne({ document })
  if (client) throw new ConflictDocument()
  else return false
}

export const saveClient = async (client: Clients) => {
  const clientSaved = await getRepository(Clients).save(client)

  return clientSaved
}

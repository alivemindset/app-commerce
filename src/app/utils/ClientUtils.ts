import Clients from '../models/Clients'
import { getRepository } from 'typeorm'
import { isNumber } from './utils'

export class NotIsNumber extends Error {}
export class ClientNotFound extends Error {}

export const getClientById = async (id: number | string) => {
  if (!isNumber(id)) throw new NotIsNumber()

  const client = await getRepository(Clients).findOne({ id: Number(id) })
  if (!client) throw new ClientNotFound()

  return client
}

import Orders from '../models/Orders'
import { getRepository } from 'typeorm'
import { OrderNotFound, isNumber, NotIsNumber } from './utils'

export const getOrderById = async (id: number | string) => {
  if (!isNumber(id)) throw new NotIsNumber()

  const order = await getRepository(Orders).findOne({
    relations: ['products'],
    where: { id: Number(id) }
  })
  if (!order) throw new OrderNotFound()

  return order
}

export const saveOrder = async (order: Orders) => {
  const orderSaved = await getRepository(Orders).save(order)

  return orderSaved
}

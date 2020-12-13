import { ErrorRequestHandler } from 'express'
import { notFound } from '../app/views/errors/notFound'
import { invalidParameters } from '../app/views/errors/invalidParameters'
import { conflictData } from '../app/views/errors/conflictData'
import { ProductNotFound, ClientNotFound, NotIsNumber, ConflictEmail, ConflictDocument, OrderNotFound, InvalidProduct } from '../app/utils/utils'
import { getRepository } from 'typeorm'
import Orders from '../app/models/Orders'
import ShoppingCarts from '../app/models/ShoppingCarts'

const errorHandler: ErrorRequestHandler = async (error, request, response, next) => {
  if (error instanceof ClientNotFound) return notFound('Client', response)
  if (error instanceof ProductNotFound) return notFound('Product', response)
  if (error instanceof OrderNotFound) return notFound('Order', response)

  if (error instanceof NotIsNumber) return invalidParameters(response)
  if (error instanceof ConflictEmail) return conflictData('email', response)
  if (error instanceof ConflictDocument) return conflictData('document', response)

  if (error instanceof InvalidProduct) {
    await getRepository(ShoppingCarts).delete({ order_id: Number(error.message) })
    await getRepository(Orders).delete({ id: Number(error.message) })
    return notFound('Product', response)
  }

  console.error(error)
  return response.status(500).json({ message: 'Internal server error ' })
}

export default errorHandler

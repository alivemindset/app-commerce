import { ErrorRequestHandler } from 'express'
import { ClientNotFound, NotIsNumber } from '../app/utils/ClientUtils'
import { notFound } from '../app/views/notFound'
import { invalidParameters } from '../app/views/invalidParameters'

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
  if (error instanceof ClientNotFound) return notFound('Client', response)
  if (error instanceof NotIsNumber) return invalidParameters(response)

  return response.status(500).json({ message: 'Internal server error ' })
}

export default errorHandler

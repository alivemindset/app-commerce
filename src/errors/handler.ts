import { ErrorRequestHandler } from 'express'
import { ClientNotFound, NotIsNumber, ConflictEmail } from '../app/utils/ClientUtils'
import { notFound } from '../app/views/errors/notFound'
import { invalidParameters } from '../app/views/errors/invalidParameters'
import { conflictEmail } from '../app/views/errors/conflictEmail'

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
  if (error instanceof ClientNotFound) return notFound('Client', response)
  if (error instanceof NotIsNumber) return invalidParameters(response)
  if (error instanceof ConflictEmail) return conflictEmail(response)

  return response.status(500).json({ message: 'Internal server error ' })
}

export default errorHandler

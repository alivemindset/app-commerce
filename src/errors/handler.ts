import { ErrorRequestHandler } from 'express'
import { ClientNotFound, NotIsNumber, ConflictEmail, ConflictDocument } from '../app/utils/ClientUtils'
import { notFound } from '../app/views/errors/notFound'
import { invalidParameters } from '../app/views/errors/invalidParameters'
import { conflictData } from '../app/views/errors/conflictData'

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
  if (error instanceof ClientNotFound) return notFound('Client', response)
  if (error instanceof NotIsNumber) return invalidParameters(response)
  if (error instanceof ConflictEmail) return conflictData('email', response)
  if (error instanceof ConflictDocument) return conflictData('document', response)

  console.error(error)
  return response.status(500).json({ message: 'Internal server error ' })
}

export default errorHandler

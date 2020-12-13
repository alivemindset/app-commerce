import { Response } from 'express'

export const notFound = (whatNotFound: string, response: Response) => {
  return response.status(404).json({ message: `${whatNotFound} not found` })
}

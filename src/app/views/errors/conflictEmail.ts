import { Response } from 'express'

export const conflictEmail = (response: Response) => {
  return response.status(409).json({ message: 'Already has client with this e-mail' })
}

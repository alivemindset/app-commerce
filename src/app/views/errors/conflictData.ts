import { Response } from 'express'

export const conflictData = (input: string, response: Response) => {
  return response.status(409).json({ message: `Already has client with this ${input}` })
}

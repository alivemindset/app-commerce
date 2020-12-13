import { Response } from 'express'

export const invalidParameters = (response: Response) => {
  return response.status(400).json({ message: 'Invalid parameters' })
}

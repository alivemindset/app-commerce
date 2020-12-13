import { Response } from 'express'

export const isRequired = (input: string, response: Response) => {
  return response.status(400).json({ message: `${input} is required` })
}

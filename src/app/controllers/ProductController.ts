import { Request, Response } from 'express'
import Products from '../models/Products'
import { getRepository } from 'typeorm'
import { isNumber } from '../utils/utils'

export default class ProductController {
  async index (request: Request, response: Response) {
    const products = await getRepository(Products).find()

    return response.status(200).json(products)
  }

  async show (request: Request, response: Response) {
    const { id } = request.params

    if (!isNumber(id)) return response.status(400).json({ message: 'Invalid params' })

    const product = await getRepository(Products).findOne({ id: Number(id) })

    if (!product) return response.status(404).json({ message: 'Product not found' })

    return response.status(200).json(product)
  }

  async store (request: Request, response: Response) {
    const { name, color, size, value } = request.body

    if (!name || name.trim() === '') return response.status(400).json({ message: 'Name is required' })
    if (!color || color.trim() === '') return response.status(400).json({ message: 'Color is required' })
    if (!size || size.trim() === '') return response.status(400).json({ message: 'Size is required' })
    if (!value || value.trim() === '') return response.status(400).json({ message: 'Value is required' })

    if (!isNumber(size)) return response.status(400).json({ message: 'Size should be a number' })

    const newProduct = new Products()
    newProduct.name = name
    newProduct.color = color
    newProduct.size = size
    newProduct.value = value
  }
}

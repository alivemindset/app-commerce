import { Request, Response } from 'express'
import Products from '../models/Products'
import { getRepository } from 'typeorm'
import { isBRLCurrency, isNumber } from '../utils/utils'

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
    if (!isBRLCurrency(value)) return response.status(400).json({ message: 'Value should be a BRL currency' })

    const newProduct = new Products()
    newProduct.name = name
    newProduct.color = color
    newProduct.size = size
    newProduct.value = value

    const product = await getRepository(Products).save(newProduct)

    if (product.id >= 0) return response.status(201).json({ message: 'Product created', product })
    else return response.status(500).json({ message: 'Error in create a new product', product })
  }

  async update (request: Request, response: Response) {
    const { id } = request.params
    const { name, color, size, value } = request.body

    if (!isNumber(id)) return response.status(400).json({ message: 'Invalid params' })
    if (size && !isNumber(size)) return response.status(400).json({ message: 'Size should be a number' })
    if (value && !isBRLCurrency(value)) return response.status(400).json({ message: 'Value should be a BRL currency' })

    const product = await getRepository(Products).findOne({ id: Number(id) })
    if (!product) return response.status(404).json({ message: 'Product not found' })

    product.name = name
    product.color = color
    product.size = size
    product.value = value

    const productSaved = await getRepository(Products).save(product)

    return response.status(200).json({ message: 'Product updated', product: productSaved })
  }

  async remove (request: Request, response: Response) {
    const { id } = request.params
    if (!isNumber(id)) return response.status(400).json({ message: 'Invalid params' })

    const deletedProduct = await getRepository(Products).delete({ id: Number(id) })

    if (!deletedProduct.affected || deletedProduct.affected <= 0) return response.status(404).json({ message: 'Product not found' })

    return response.status(200).json({ message: 'Product deleted', product: deletedProduct })
  }
}

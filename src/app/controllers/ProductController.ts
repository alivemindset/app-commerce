import { Request, Response } from 'express'
import Products from '../models/Products'
import { getRepository } from 'typeorm'
import { isBRLCurrency, isNumber, notSetOrEmpty } from '../utils/utils'
import { getProductById, saveProduct } from '../utils/ProductUtils'
import { isRequired } from '../views/errors/isRequired'

export default class ProductController {
  async index (request: Request, response: Response) {
    const products = await getRepository(Products).find()

    return response.status(200).json(products)
  }

  async show (request: Request, response: Response) {
    const { id } = request.params

    const product = await getProductById(id)

    return response.status(200).json(product)
  }

  async store (request: Request, response: Response) {
    const { name, color, size, value } = request.body

    if (notSetOrEmpty(name)) return isRequired('Name', response)
    if (notSetOrEmpty(color)) return isRequired('Color', response)
    if (notSetOrEmpty(size)) return isRequired('Size', response)
    if (notSetOrEmpty(value)) return isRequired('Value', response)

    if (!isNumber(size)) return response.status(400).json({ message: 'Size should be a number' })
    if (!isBRLCurrency(value)) return response.status(400).json({ message: 'Value should be a BRL currency, ex.: R$ 9,90' })

    const newProduct = new Products()
    newProduct.name = name
    newProduct.color = color
    newProduct.size = size
    newProduct.value = value

    const product = await saveProduct(newProduct)

    if (product.id >= 0) return response.status(201).json({ message: 'Product created', product })
  }

  async update (request: Request, response: Response) {
    const { id } = request.params
    const { name, color, size, value } = request.body

    const product = await getProductById(id)
    if (size && !isNumber(size)) return response.status(400).json({ message: 'Size should be a number' })
    if (value && !isBRLCurrency(value)) return response.status(400).json({ message: 'Value should be a BRL currency, ex.: R$ 9,90' })

    product.name = name
    product.color = color
    product.size = size
    product.value = value

    const productSaved = await saveProduct(product)

    return response.status(200).json({ message: 'Product updated', product: productSaved })
  }

  async remove (request: Request, response: Response) {
    const { id } = request.params

    const product = await getProductById(id)
    await getRepository(Products).delete({ id: Number(id) })

    return response.status(200).json({ message: 'Product deleted', product })
  }
}

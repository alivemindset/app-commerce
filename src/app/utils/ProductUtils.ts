import Products from '../models/Products'
import { getRepository } from 'typeorm'
import { ProductNotFound, isNumber, NotIsNumber } from './utils'

export const getProductById = async (id: number | string) => {
  if (!isNumber(id)) throw new NotIsNumber()

  const products = await getRepository(Products).findOne({ id: Number(id) })
  if (!products) throw new ProductNotFound()

  return products
}

export const saveProduct = async (product: Products) => {
  const productSaved = await getRepository(Products).save(product)

  return productSaved
}

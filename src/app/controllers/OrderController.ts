/* eslint-disable camelcase */
import { Request, Response } from 'express'
import Orders from '../models/Orders'
import Clients from '../models/Clients'
import ShoppingCarts from '../models/ShoppingCarts'
import { getRepository } from 'typeorm'
import { isNumber } from '../utils/utils'
import Products from '../models/Products'
import mail from '../services/mail'
import { orderHTML } from '../views/mail/order'

interface IProduct {
  product_id: number
  quantity?: number
}

export default class OrderController {
  async index (request: Request, response: Response) {
    const orders = await getRepository(Orders).find({
      relations: ['products']
    })

    return response.status(200).json(orders)
  }

  async show (request: Request, response: Response) {
    const { id } = request.params

    if (!isNumber(id)) return response.status(400).json({ message: 'Invalid params' })

    const order = await getRepository(Orders).findOne({
      relations: ['products'],
      where: { id: Number(id) }
    })

    if (!order) return response.status(404).json({ message: 'Order not found' })

    return response.status(200).json(order)
  }

  async store (request: Request, response: Response) {
    const { client_id, observation, payment_method, created_at } = request.body
    const products: IProduct[] = request.body.products
    const payment_methods = ['dinheiro', 'cartão', 'cheque']

    if (!isNumber(client_id)) return response.status(400).json({ message: 'Invalid client_id' })
    const client = await getRepository(Clients).findOne({ id: client_id })
    if (!client) return response.status(404).json({ message: 'Client not found' })

    if (!payment_method || payment_method.trim() === '') return response.status(400).json({ message: 'Payment method is required' })
    if (!payment_methods.includes(payment_method)) return response.status(400).json({ message: 'Payment method invalid, please use: dinheiro, cartão, cheque' })

    if (!products || products.length === 0) return response.status(400).json({ message: 'Products is required' })

    const newOrder = new Orders()
    newOrder.client_id = client_id
    newOrder.observation = observation
    newOrder.payment_method = payment_method
    newOrder.created_at = created_at

    const order = await getRepository(Orders).save(newOrder)

    const invalidProducts = await Promise.all(products.map(async product => {
      const isProduct = await getRepository(Products).findOne({ id: product.product_id })
      if (!isProduct) return { invalid_product_id: product.product_id }

      const newShoppingCart = new ShoppingCarts()
      newShoppingCart.product_id = product.product_id
      newShoppingCart.quantity = product.quantity || 1
      newShoppingCart.order_id = order.id
      await getRepository(ShoppingCarts).save(newShoppingCart)
    }))

    if (invalidProducts.find(invalid => invalid?.invalid_product_id)) {
      await getRepository(ShoppingCarts).delete({ order_id: order.id })
      await getRepository(Orders).delete({ id: order.id })
      return response.status(404).json({ message: 'Products not found', products: invalidProducts })
    }

    if (order.id >= 0) return response.status(201).json({ message: 'Order created', order: { ...order, products: products } })
    else return response.status(500).json({ message: 'Error in create a new order', order: { ...order, products: products } })
  }

  async update (request: Request, response: Response) {
    const { id } = request.params
    const { client_id, observation, payment_method, created_at } = request.body
    const products: IProduct[] = request.body.products
    const payment_methods = ['dinheiro', 'cartão', 'cheque']

    if (!isNumber(id)) return response.status(400).json({ message: 'Invalid param id' })
    const order = await getRepository(Orders).findOne({ id: Number(id) })
    if (!order) return response.status(404).json({ message: 'Order not found' })

    if (typeof client_id !== 'undefined') {
      const client = await getRepository(Clients).findOne({ id: client_id })
      if (!client) return response.status(404).json({ message: 'Client not found' })
    }
    if (typeof payment_method !== 'undefined' && !payment_methods.includes(payment_method)) return response.status(400).json({ message: 'Payment method invalid, please use: dinheiro, cartão, cheque' })

    order.client_id = client_id
    order.created_at = created_at
    order.observation = observation
    order.payment_method = payment_method

    if (products) {
      const initialProducts = await getRepository(ShoppingCarts).find({ order_id: order.id })
      await getRepository(ShoppingCarts).delete({ order_id: order.id })

      const invalidProducts = await Promise.all(products.map(async product => {
        const isProduct = await getRepository(Products).findOne({ id: product.product_id })
        if (!isProduct) return { invalid_product_id: product.product_id }

        const newShoppingCart = new ShoppingCarts()
        newShoppingCart.product_id = product.product_id
        newShoppingCart.quantity = product.quantity || 1
        newShoppingCart.order_id = order.id
        await getRepository(ShoppingCarts).save(newShoppingCart)
      }))

      if (invalidProducts.find(invalid => invalid?.invalid_product_id)) {
        await getRepository(ShoppingCarts).delete({ order_id: order.id })
        await getRepository(ShoppingCarts).save(initialProducts)
        return response.status(404).json({ message: 'Products not found', products: invalidProducts })
      }
    }

    const orderUpated = await getRepository(Orders).save(order)

    return response.status(200).json({ message: 'Order updated', order: orderUpated })
  }

  async remove (request: Request, response: Response) {
    const { id } = request.params
    if (!isNumber(id)) return response.status(400).json({ message: 'Invalid params' })

    const deletedOrder = await getRepository(Orders).delete({ id: Number(id) })
    const deletedShoppingCart = await getRepository(ShoppingCarts).delete({ order_id: Number(id) })

    const notDeletedOrder = !deletedOrder.affected || deletedOrder.affected <= 0
    const notDeletedShoppingCart = !deletedShoppingCart.affected || deletedShoppingCart.affected <= 0

    if (notDeletedOrder && notDeletedShoppingCart) return response.status(404).json({ message: 'Order not found' })

    return response.status(200).json({ message: 'Order deleted' })
  }

  async sendmail (request: Request, response: Response) {
    const { id } = request.params
    if (!isNumber(id)) return response.status(400).json({ message: 'Invalid params' })

    const order = await getRepository(Orders).findOne({
      relations: ['products'], where: { id: Number(id) }
    })
    if (!order) return response.status(404).json({ message: 'Order not found' })

    const client = await getRepository(Clients).findOne({ id: order.client_id })
    if (!client) return response.status(500).json({ message: 'Client not found?' })

    const products = await Promise.all(order.products.map(async product => {
      const productInfo = await getRepository(Products).findOne({ id: product.product_id })
      return productInfo
    })) as Products[]

    const mailOptions = {
      from: process.env.MAIL_FROM,
      to: client.email,
      subject: 'Anotamos o seu pedido!',
      html: orderHTML(order, products, client)
    }

    mail.sendMail(mailOptions, async (error, infoMail) => {
      if (error) return response.status(500).json({ status: true, mailSend: false, message: 'Problem with send mail', error })

      if (client.email === infoMail.accepted[0]) return response.status(201).json({ status: true, mailSend: true, clientMail: client.email })
      else return response.status(500).json({ status: true, mailSend: false, message: 'The recipient declined the email' })
    })
  }
}

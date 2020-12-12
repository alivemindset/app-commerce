/* eslint camelcase: 0 */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import ShoppingCarts from './ShoppingCarts'

@Entity('orders')
export default class Orders {
  @PrimaryGeneratedColumn('increment')
  id!: number

  @Column()
  client_id!: number

  @Column()
  observation!: string

  @Column()
  payment_method!: string

  @Column()
  created_at!: Date

  @OneToMany(type => ShoppingCarts, shoppingcarts => shoppingcarts.order)
  products!: ShoppingCarts[]
}

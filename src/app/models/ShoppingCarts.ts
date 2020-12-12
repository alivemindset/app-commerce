/* eslint camelcase: 0 */
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import Orders from './Orders'

@Entity('shopping_carts')
export default class ShoppingCarts {
  @PrimaryGeneratedColumn('increment')
  id!: number

  @Column()
  order_id!: number

  @Column()
  product_id!: number

  @Column()
  quantity!: number

  @ManyToOne(type => Orders)
  @JoinColumn({ name: 'order_id', referencedColumnName: 'id' })
  order!: Orders
}

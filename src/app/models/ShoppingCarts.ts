/* eslint camelcase: 0 */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

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
}

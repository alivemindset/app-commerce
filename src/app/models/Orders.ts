/* eslint camelcase: 0 */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

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
}

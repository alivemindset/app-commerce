import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('products')
export default class Products {
  @PrimaryGeneratedColumn('increment')
  id!: number

  @Column()
  name!: string

  @Column()
  color!: string

  @Column()
  width!: string

  @Column()
  value!: string
}

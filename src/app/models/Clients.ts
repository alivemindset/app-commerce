import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('clients')
export default class Clients {
  @PrimaryGeneratedColumn('increment')
  id!: number

  @Column()
  name!: string

  @Column()
  document!: string

  @Column()
  genre!: string

  @Column()
  email!: string
}

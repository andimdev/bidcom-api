import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ type: 'text', nullable: true })
  description: string | null

  @Column('real')
  price: number

  @Column('integer')
  stock: number

  @Column()
  category: string

  @Column()
  brand: string
}
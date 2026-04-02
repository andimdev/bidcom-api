import {
  Entity,
  Column,
  Unique,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('products')
@Unique(['name'])
export class ProductOrmEntity {
  @PrimaryColumn('text')
  id!: string

  @Column('text')
  name!: string

  @Column('text', { nullable: true })
  description!: string | null

  @Column('float')
  price!: number

  @Column('integer', { default: 0 })
  stock!: number

  @Column('text')
  category!: string

  @Column('text')
  brand!: string

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn({ nullable: true })
  updatedAt!: Date | null

  @Column('datetime', { nullable: true })
  deletedAt!: Date | null
}
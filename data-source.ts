import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Product } from './src/products/entities/product.entity'

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'db.sqlite',
  entities: [Product],
  migrations: ['src/migrations/*.ts'],
})
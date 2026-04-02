import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { _env } from './src/config/vars'
import { ProductOrmEntity } from './src/infrastructure/database/product.orm-entity'

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: _env.DATABASE_URL,
  entities: [ProductOrmEntity],
  migrations: ['src/migrations/*.ts'],
})
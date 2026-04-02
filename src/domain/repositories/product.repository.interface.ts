import { Product } from '@domain/entities/product.entity'

export type SearchFilters = Partial<{
  name: string
  category: string
  brand: string
  minPrice: number
  maxPrice: number
  limit: number
  offset: number
}>

export interface ProductRepository {
  create(product: Product): Promise<Product>
  findById(id: string): Promise<Product | null>
  search(filters: SearchFilters): Promise<{ total: number; items: Product[] }>
  update(product: Product): Promise<Product>
  delete(id: string): Promise<void>
}
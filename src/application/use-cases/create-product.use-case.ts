import { Product } from '@domain/entities/product.entity'
import { ProductRepository } from '@domain/repositories/product.repository.interface'

export class CreateProductUseCase {
  constructor(private repo: ProductRepository) {}

  execute(input: any) {
    const product = Product.create(input)
    return this.repo.create(product)
  }
}
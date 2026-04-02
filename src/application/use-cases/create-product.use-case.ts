import {
  Injectable,
  Inject,
} from '@nestjs/common'
import { Product } from '@domain/entities/product.entity'
import type { ProductRepository } from '@domain/repositories/product.repository.interface'

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject('ProductRepository')
    private repo: ProductRepository,
  ) {}

  async execute(input: any) {
    const existing = await this.repo.search({
      name: input.name,
      limit: 1,
    })

    if (existing.items.length > 0) {
      throw new Error('Product with this name already exists')
    }

    const product = Product.create(input)
    return this.repo.create(product)
  }
}
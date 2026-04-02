import {
  Injectable,
  Inject,
} from '@nestjs/common'
import { Product } from '@domain/entities/product.entity'
import { ProductAlreadyExistsError } from '@domain/errors/product.errors'
import { MissingRequiredFieldsError } from '@domain/errors/product.errors'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import type { ProductRepository } from '@domain/repositories/product.repository.interface'
import type { Cache } from 'cache-manager'

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject('ProductRepository') private repo: ProductRepository,
    @Inject(CACHE_MANAGER) private cache: Cache,
  ) {}

  async execute(input: any) {
    const existing = await this.repo.search({
      name: input.name,
      limit: 1,
    })

    const required = ['name', 'price', 'category', 'brand']
    const missing = required.filter((field) => !input[field])

    if (missing.length > 0)
      throw new MissingRequiredFieldsError(missing)

    if (existing.items.length > 0)
      throw new ProductAlreadyExistsError(input.name)

    const product = Product.create(input)
    const result = await this.repo.create(product)
    await this.cache.clear()

    return result
  }
}
import {
  Inject,
  Injectable,
} from '@nestjs/common'
import { ProductNotFoundError } from '@domain/errors/product.errors'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import type { ProductRepository } from '@domain/repositories/product.repository.interface'
import type { Cache } from 'cache-manager'

@Injectable()
export class UpdateProductUseCase {
  constructor(
    @Inject('ProductRepository') private repo: ProductRepository,
    @Inject(CACHE_MANAGER) private cache: Cache,
  ) {}

  async execute(id: string, data: any) {
    const product = await this.repo.findById(id)

    if (!product || product.isDeleted())
      throw new ProductNotFoundError(id)

    product.update(data)

    const result = await this.repo.update(product)
    await this.cache.clear()

    return result
  }
}
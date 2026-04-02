import {
  Inject,
  Injectable,
} from '@nestjs/common'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import type { ProductRepository } from '@domain/repositories/product.repository.interface'
import type { Cache } from 'cache-manager'

@Injectable()
export class DeleteProductUseCase {
  constructor(
    @Inject('ProductRepository') private repo: ProductRepository,
    @Inject(CACHE_MANAGER) private cache: Cache,
  ) {}

  async execute(id: string) {
    await this.repo.delete(id)
    await this.cache.clear()
  }
}
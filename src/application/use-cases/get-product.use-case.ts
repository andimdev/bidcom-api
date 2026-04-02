import {
  Injectable,
  Inject,
} from '@nestjs/common'
import type { ProductRepository } from '@domain/repositories/product.repository.interface'
import { ProductNotFoundError } from '@domain/errors/product.errors'

@Injectable()
export class GetProductUseCase {
  constructor(
    @Inject('ProductRepository')
    private repo: ProductRepository,
  ) {}

  async execute(id: string) {
    const product = await this.repo.findById(id)

    if (!product || product.isDeleted())
      throw new ProductNotFoundError(id)

    return product
  }
}
import {
  Injectable,
  Inject,
} from '@nestjs/common'
import type { ProductRepository } from '@domain/repositories/product.repository.interface'

@Injectable()
export class GetProductUseCase {
  constructor(
    @Inject('ProductRepository')
    private repo: ProductRepository,
  ) {}

  async execute(id: string) {
    const product = await this.repo.findById(id)

    if (!product || product.isDeleted()) {
      throw new Error('Product not found')
    }

    return product
  }
}
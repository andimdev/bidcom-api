import {
  Inject,
  Injectable,
} from '@nestjs/common'
import type { ProductRepository } from '@domain/repositories/product.repository.interface'

@Injectable()
export class UpdateProductUseCase {
  constructor(
    @Inject('ProductRepository')
    private repo: ProductRepository,
  ) {}

  async execute(id: string, data: any) {
    const product = await this.repo.findById(id)

    if (!product || product.isDeleted()) {
      throw new Error('Product not found')
    }

    product.update(data)

    return this.repo.update(product)
  }
}
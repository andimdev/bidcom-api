import {
  Inject,
  Injectable,
} from '@nestjs/common'
import type { ProductRepository } from '@domain/repositories/product.repository.interface'

@Injectable()
export class DeleteProductUseCase {
  constructor(
    @Inject('ProductRepository')
    private repo: ProductRepository,
  ) {}

  async execute(id: string) {
    await this.repo.delete(id)
  }
}
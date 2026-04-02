import { ProductRepository } from '@domain/repositories/product.repository.interface'

export class DeleteProductUseCase {
  constructor(private repo: ProductRepository) {}

  async execute(id: string) {
    await this.repo.delete(id)
  }
}
import { ProductRepository } from '@domain/repositories/product.repository.interface'

export class SearchProductsUseCase {
  constructor(private repo: ProductRepository) {}

  execute(filters: any) {
    return this.repo.search(filters)
  }
}
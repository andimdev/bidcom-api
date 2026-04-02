import {
  Inject,
  Injectable,
} from '@nestjs/common'
import type { ProductRepository } from '@domain/repositories/product.repository.interface'

@Injectable()
export class ListProductsUseCase {
  constructor(
    @Inject('ProductRepository')
    private repo: ProductRepository,
  ) {}

  execute(pagination: any) {
    return this.repo.search(pagination)
  }
}
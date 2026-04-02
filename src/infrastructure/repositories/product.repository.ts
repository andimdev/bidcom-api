import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Product } from '@domain/entities/product.entity'
import { ProductRepository } from '@domain/repositories/product.repository.interface'
import { ProductOrmEntity } from '@infrastructure/database/product.orm-entity'

@Injectable()
export class ProductRepositoryImpl implements ProductRepository {
  constructor(
    @InjectRepository(ProductOrmEntity)
    private repo: Repository<ProductOrmEntity>,
  ) {}

  toDomain(e: ProductOrmEntity) {
    return Product.rehydrate(e)
  }

  toOrm(p: Product) {
    return this.repo.create(p.toJSON())
  }

  async create(product: Product) {
    const saved = await this.repo.save(this.toOrm(product))
    return this.toDomain(saved)
  }

  async findById(id: string) {
    const data = await this.repo.findOne({ where: { id } })
    return data ? this.toDomain(data) : null
  }

  async search(filters: any) {
    const qb = this.repo.createQueryBuilder('p')

    qb.where('p.deletedAt IS NULL')

    if (filters.name) qb.andWhere('p.name LIKE :name', { name: `%${filters.name}%` })

    qb.skip(filters.offset ?? 0)
    qb.take(filters.limit ?? 20)

    const limit = filters.limit ?? 10
    const offset = filters.offset ?? 0

    qb.skip(offset)
    qb.take(limit)

    const [items, total] = await qb.getManyAndCount()

    return {
      total,
      limit,
      offset,
      next: offset + limit < total ? `?limit=${limit}&offset=${offset + limit}` : null,
      prev: offset > 0 ? `?limit=${limit}&offset=${offset - limit}` : null,
      items: items.map((e) => this.toDomain(e)),
    }
  }

  async update(product: Product) {
    await this.repo.save(this.toOrm(product))
    const updated = await this.repo.findOneBy({ id: product.id })
    return this.toDomain(updated!)
  }

  async delete(id: string) {
    await this.repo.update(id, { deletedAt: new Date() })
  }
}
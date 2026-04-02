import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductController } from '@presentation/controllers/product.controller'
import { ProductOrmEntity } from '@infrastructure/database/product.orm-entity'
import { ProductRepositoryImpl } from '@infrastructure/repositories/product.repository'
import { CreateProductUseCase } from '@application/use-cases/create-product.use-case'
import { SearchProductsUseCase } from '@application/use-cases/search-product.use-case'
import { DeleteProductUseCase } from '@application/use-cases/delete-product.use-case'
import { GetProductUseCase } from '@application/use-cases/get-product.use-case'
import { UpdateProductUseCase } from '@application/use-cases/update-product.use-case'
import { ListProductsUseCase } from '@application/use-cases/list-product.use-case'
import { CacheModule } from '@nestjs/cache-manager'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [ProductOrmEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([ProductOrmEntity]),
    CacheModule.register({
      isGlobal: true,
      ttl: 60,
    }),
  ],
  controllers: [ProductController],
  providers: [
    {
      provide: 'ProductRepository',
      useClass: ProductRepositoryImpl,
    },
    CreateProductUseCase,
    SearchProductsUseCase,
    DeleteProductUseCase,
    GetProductUseCase,
    UpdateProductUseCase,
    ListProductsUseCase,
  ],
})

export class AppModule {}
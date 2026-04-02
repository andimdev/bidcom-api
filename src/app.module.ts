import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductController } from '@presentation/controllers/product.controller'
import { ProductOrmEntity } from '@infrastructure/database/product.orm-entity'
import { ProductRepositoryImpl } from '@infrastructure/repositories/product.repository'
import { CreateProductUseCase } from '@application/use-cases/create-product.use-case'
import { SearchProductsUseCase } from '@application/use-cases/search-product.use-case'
import { DeleteProductUseCase } from '@application/use-cases/delete-product.use-case'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [ProductOrmEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([ProductOrmEntity]),
  ],
  controllers: [ProductController],
  providers: [
    { provide: 'ProductRepository', useClass: ProductRepositoryImpl },

    {
      provide: CreateProductUseCase,
      useFactory: (repo) => new CreateProductUseCase(repo),
      inject: ['ProductRepository'],
    },
    {
      provide: SearchProductsUseCase,
      useFactory: (repo) => new SearchProductsUseCase(repo),
      inject: ['ProductRepository'],
    },
    {
      provide: DeleteProductUseCase,
      useFactory: (repo) => new DeleteProductUseCase(repo),
      inject: ['ProductRepository'],
    },
  ],
})

export class AppModule {}
import {
  Post,
  Get,
  Delete,
  Param,
  Query,
  Body,
  Controller,
} from '@nestjs/common'
import { randomUUID } from 'crypto'
import { CreateProductUseCase } from '@application/use-cases/create-product.use-case'
import { SearchProductsUseCase } from '@application/use-cases/search-product.use-case'
import { DeleteProductUseCase } from '@application/use-cases/delete-product.use-case'

@Controller('products')
export class ProductController {
  constructor(
    private createUC: CreateProductUseCase,
    private searchUC: SearchProductsUseCase,
    private deleteUC: DeleteProductUseCase,
  ) {}

  @Post()
  create(@Body() body: any) {
    return this.createUC.execute({
      ...body,
      id: randomUUID(),
    })
  }

  @Get('search')
  search(@Query() query: any) {
    return this.searchUC.execute(query)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.deleteUC.execute(id)
  }
}
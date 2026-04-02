import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  Query,
  Put,
  Patch,
} from '@nestjs/common'
import { randomUUID } from 'crypto'
import { CreateProductUseCase } from '@application/use-cases/create-product.use-case'
import { SearchProductsUseCase } from '@application/use-cases/search-product.use-case'
import { DeleteProductUseCase } from '@application/use-cases/delete-product.use-case'
import { GetProductUseCase } from '@application/use-cases/get-product.use-case'
import { UpdateProductUseCase } from '@application/use-cases/update-product.use-case'
import { ListProductsUseCase } from '@application/use-cases/list-product.use-case'
import { CreateProductDto } from '../dtos/create-product.dto'
import { UpdateProductDto } from '../dtos/update-product.dto'
import { SearchProductDto } from '../dtos/search-product.dto'
import { PaginationDto } from '../dtos/pagination.dto'

@Controller('products')
export class ProductController {
  constructor(
    private createUC: CreateProductUseCase,
    private searchUC: SearchProductsUseCase,
    private deleteUC: DeleteProductUseCase,
    private getUC: GetProductUseCase,
    private updateUC: UpdateProductUseCase,
    private listUC: ListProductsUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.createUC.execute({
      ...dto,
      id: randomUUID(),
    })
  }

  @Get()
  list(@Query() query: PaginationDto) {
    return this.listUC.execute(query)
  }

  @Get('search')
  search(@Query() query: SearchProductDto) {
    return this.searchUC.execute(query)
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.getUC.execute(id)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: CreateProductDto) {
    return this.updateUC.execute(id, dto)
  }

  @Patch(':id')
  patch(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.updateUC.execute(id, dto)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.deleteUC.execute(id)
  }
}
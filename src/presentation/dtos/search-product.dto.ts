import {
  IsOptional,
  IsString,
  IsNumber,
} from 'class-validator'
import { Type } from 'class-transformer'
import { PaginationDto } from './pagination.dto'

export class SearchProductDto extends PaginationDto {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsString()
  category?: string

  @IsOptional()
  @IsString()
  brand?: string

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minPrice?: number

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxPrice?: number
}
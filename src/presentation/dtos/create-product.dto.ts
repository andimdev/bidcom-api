import {
  IsString,
  IsNumber,
  IsOptional,
  IsNotEmpty,
} from 'class-validator'

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name!: string

  @IsOptional()
  @IsString()
  description?: string

  @IsNumber()
  price!: number

  @IsOptional()
  @IsNumber()
  stock?: number

  @IsString()
  @IsNotEmpty()
  category!: string

  @IsString()
  @IsNotEmpty()
  brand!: string
}
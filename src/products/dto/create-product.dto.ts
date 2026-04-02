import { Type } from 'class-transformer'
import {
  IsString,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator'

export class CreateProductDto {
  @IsString()
  public name: string
  @IsOptional()
  @IsString()
  public description?: string | null
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Type(() => Number)
  public price: number
  @IsNumber({ maxDecimalPlaces: 0 })
  @Min(0)
  @Type(() => Number)
  public stock: number
  @IsString()
  public category: string
  @IsString()
  public brand: string
}
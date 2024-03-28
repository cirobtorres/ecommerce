import { IsNumber, IsOptional, IsString } from "class-validator";
import { ProductSrcEntity } from "../entity/product-src.entity";

export class ProductDTO {
  @IsString()
  manufacturerId: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsOptional()
  src?: ProductSrcEntity[];

  // @IsString()
  // @IsOptional()
  // voltage?: string;

  @IsNumber()
  price: number;

  @IsNumber()
  purchasePrice: number;

  @IsNumber()
  sellingPrice: number;
}

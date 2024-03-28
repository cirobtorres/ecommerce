import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "./entity/product.entity";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  exports: [ProductService],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}

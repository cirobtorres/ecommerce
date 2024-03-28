import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductDTO } from "./dto/product.dto";

@Controller("api/product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get(":id")
  retrieve(@Param("id", ParseIntPipe) id: number) {
    return this.productService.retrieve(id);
  }

  @Get()
  list() {
    return this.productService.list();
  }

  @Post()
  create(@Body() body: ProductDTO) {
    return this.productService.create(body);
  }

  @Post()
  update() {}

  @Post()
  delete() {}
}

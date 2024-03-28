import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "./entity/product.entity";
import { Repository } from "typeorm";
import { ProductDTO } from "./dto/product.dto";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>
  ) {}
  async create(formData: ProductDTO) {
    const product = this.productRepository.create(formData);
    return this.productRepository.save(product);
  }

  async retrieve(id: number) {
    return this.productRepository.findOneBy({ id });
  }

  async list() {
    return this.productRepository.find();
  }

  async update() {}

  async delete() {}
}

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ManufacturerEntity } from "./entity/manufacturer.entity";
import { Repository } from "typeorm";
import { ManufacturerDTO } from "./dto/manufacturer.dto";

@Injectable()
export class ManufacturerService {
  constructor(
    @InjectRepository(ManufacturerEntity)
    private manufacturerRepository: Repository<ManufacturerEntity>
  ) {}

  async retrieve(id: number) {
    return this.manufacturerRepository.findOneBy({ id });
  }

  async list() {
    return this.manufacturerRepository.find();
  }

  async create(formData: ManufacturerDTO) {
    const manufacturer = this.manufacturerRepository.create(formData);
    return this.manufacturerRepository.save(manufacturer);
  }

  async update(id: number) {}

  async delete(id: number) {}
}

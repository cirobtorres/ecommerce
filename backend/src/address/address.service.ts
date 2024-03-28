import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AddressEntity } from "./entity/address.entity";
import { Repository } from "typeorm";
import { AddressDTO } from "./dto/address.dto";

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private addressRepository: Repository<AddressEntity>
  ) {}

  async create(formData: AddressDTO) {
    // const address = this.addressRepository.create(formData);
    // return this.addressRepository.save(address);
  }
}

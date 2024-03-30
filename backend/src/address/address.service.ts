import { Injectable, NotFoundException } from "@nestjs/common";
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

  async retrieve(id: number) {
    return this.addressRepository.findOne({ where: { id } });
  }

  async listAll(id: number) {
    return this.addressRepository.find({ where: { userId: id } });
  }

  async listCount(userId: number) {
    const userTotalAddresses = await this.addressRepository.findAndCountBy({
      userId,
    });
    return userTotalAddresses[1];
  }

  async create(formData: AddressDTO) {
    if ((await this.listCount(formData.userId)) === 0) {
      formData.defaultAddress = true;
    }
    const address = this.addressRepository.create(formData);
    this.addressRepository.save(address);
    return { status: "success" };
  }

  async update() {
    // default
  }

  async destroy(id: number) {
    if (!(await this.retrieve(id))) {
      throw new NotFoundException("Address not found");
    }
    this.addressRepository.delete(id);
    const userTotalAddressesLeft = await this.addressRepository.findAndCountBy({
      id,
    });
    if (userTotalAddressesLeft[1] < 1) {
      const lastAddressLeft = userTotalAddressesLeft[0][0];
      lastAddressLeft.defaultAddress = true;
      this.addressRepository.save(lastAddressLeft);
    }
    return { success: "success" };
  }
}

import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entity/user.entity";
import { Repository } from "typeorm";
import { CreateUserDTO } from "./dto/create-user.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>
  ) {}

  async create(formData: CreateUserDTO) {
    if (await this.userRepository.exists({ where: { email: formData.email } }))
      throw new BadRequestException("E-mail já cadastrado");
    const salt = await bcrypt.genSalt();
    formData.password = await bcrypt.hash(formData.password, salt);
    const user = this.userRepository.create(formData);
    return this.userRepository.save(user);
  }
}

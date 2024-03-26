import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entity/user.entity";
import { Repository } from "typeorm";
import { CreateUserDTO } from "./dto/create-user.dto";
import * as bcrypt from "bcrypt";

interface queryDTO {
  skip: number;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>
  ) {}

  async list(query: queryDTO) {
    const take = 10;
    const skip = query.skip || 0;

    const [data, total] = await this.userRepository.findAndCount({
      order: { firstName: "ASC", lastName: "ASC" },
      take,
      skip,
    });

    return {
      total,
      data,
    };
  }

  async retrieve(id: number) {
    await this.exists(id);
    return this.userRepository.findOneBy({ id });
  }

  async create(formData: CreateUserDTO) {
    if (await this.userRepository.exists({ where: { email: formData.email } }))
      throw new BadRequestException("E-mail já cadastrado");
    const salt = await bcrypt.genSalt();
    formData.password = await bcrypt.hash(formData.password, salt);
    const user = this.userRepository.create(formData);
    return this.userRepository.save(user);
  }

  async exists(id: number) {
    if (!(await this.userRepository.existsBy({ id })))
      throw new NotFoundException("Usuário não existe");
  }
}

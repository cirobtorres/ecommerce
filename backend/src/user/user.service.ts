import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entity/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { UserPFEntity } from "./entity/pf.entity";
import { UserPJEntity } from "./entity/pj.entity";
import { UserDTO } from "./dto/user.dto";
import { AddressEntity } from "../address/entity/address.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(AddressEntity)
    private addressRepository: Repository<AddressEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(UserPFEntity)
    private userPFRepository: Repository<UserPFEntity>,
    @InjectRepository(UserPJEntity)
    private userPJRepository: Repository<UserPJEntity>
  ) {}

  async list(query: { skip: number }) {
    const take = 10;
    const skip = query.skip || 0;

    const [data, total] = await this.userRepository.findAndCount({
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
    const user = await this.userRepository.findOneBy({ id });
    const userAddress = await this.addressRepository.findBy({ userId: id });
    user.address = userAddress;
    delete user.password;
    if (user.PF) delete user.PJ;
    if (user.PJ) delete user.PF;
    return user;
  }

  async create(formData: UserDTO) {
    if (await this.userRepository.exists({ where: { email: formData.email } }))
      throw new BadRequestException("E-mail já cadastrado");
    const salt = await bcrypt.genSalt();
    formData.password = await bcrypt.hash(formData.password, salt);
    if (formData.PF) {
      const { PF } = formData;
      let pf = this.userPFRepository.create(PF);
      pf = await this.userPFRepository.save(pf);
      let user = this.userRepository.create({ ...formData, PF: pf });
      user = await this.userRepository.save(user);
      await this.userPFRepository.update(pf.id, { userId: user });
      return this.retrieve(user.id);
    } else if (formData.PJ) {
      const { PJ } = formData;
      let pj = this.userPJRepository.create(PJ);
      pj = await this.userPJRepository.save(pj);
      let user = this.userRepository.create({ ...formData, PJ: pj });
      user = await this.userRepository.save(user);
      await this.userPJRepository.update(pj.id, { userId: user });
      return this.retrieve(user.id);
    } else {
      throw new BadRequestException("Missing PF or PJ data from body");
    }
  }

  async exists(id: number) {
    if (!(await this.userRepository.existsBy({ id })))
      throw new NotFoundException("Usuário não existe");
  }

  async update() {}

  async delete() {}
}

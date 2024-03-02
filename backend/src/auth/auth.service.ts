import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { UserEntity } from "src/user/entity/user.entity";
import { UserService } from "src/user/user.service";
import { RegisterAuthDTO } from "./dto/register-auth.dto";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  createToken(user: UserEntity) {
    return {
      jwt: this.jwtService.sign(
        { id: user.id }, // TODO: image
        { expiresIn: "7 days", issuer: "login", audience: `${user.privileges}` }
      ),
    };
  }

  async register(formData: RegisterAuthDTO) {
    delete formData.privileges;
    const user = await this.userService.create(formData);
    return this.createToken(user);
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) throw new UnauthorizedException("E-mail e/ou senha incorretos");
    if (!(await bcrypt.compare(password, user.password)))
      throw new NotFoundException("E-mail e/ou senha incorretos");
    const jwt = this.createToken(user);
    return {
      jwt,
      id: user.id,
      name: user.firstName + user.lastName,
      email: user.email,
    };
  }
}

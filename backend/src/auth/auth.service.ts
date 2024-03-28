import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { UserEntity } from "../user/entity/user.entity";
import { UserService } from "../user/user.service";
import { RegisterAuthDTO } from "./dto/register-auth.dto";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { IdentifyCPF } from "../utils/cpf";

const maxTokenAge = "7 days";

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
      accessToken: this.jwtService.sign(
        { sub: user.id }, // TODO: image
        // { expiresIn: "7 days", issuer: "login", audience: `${user.privileges}` }
        {
          expiresIn: maxTokenAge,
          issuer: "login",
          audience: `${user.privileges}`,
        }
      ),
    };
  }

  checkToken(token: string) {
    try {
      const payload = this.jwtService.verify(token, {
        issuer: "login",
      });
      return payload;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async register(formData: RegisterAuthDTO) {
    delete formData.privileges;
    if (formData.birthAt === "") {
      delete formData.birthAt;
    }
    const user = await this.userService.create(formData);
    // return this.createToken(user);
    return { status: "success" };
  }

  async login(login: string, password: string) {
    const email = login;
    const cpf = new IdentifyCPF(login); // TODO: create a custom guard to check if its a CPF
    let chosenInput = {};

    if (email.includes("@")) {
      chosenInput = {
        email: email,
      };
    } else if (cpf.isValid) {
      chosenInput = {
        cpf: cpf.CPF,
      };
    } else {
      throw new BadRequestException("E-mail e/ou senha incorretos");
    }

    const user = await this.userRepository.findOne({
      where: { ...chosenInput },
      relations: {
        address: true,
      },
    });

    if (!user) throw new UnauthorizedException("E-mail e/ou senha incorretos");
    if (!(await bcrypt.compare(password, user.password)))
      throw new NotFoundException("E-mail e/ou senha incorretos");

    const jwt = this.createToken(user);

    return {
      jwt: jwt.accessToken,
      id: user.id,
      name: user.firstName + ` ${user.lastName}`,
    };
  }
}

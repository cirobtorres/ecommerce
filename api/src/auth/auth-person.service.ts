import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { UserPersonService } from "src/user/user-person.service";
import { CreateUserDTO } from "../user/dtos/user-create.dto";
import { TokenPersonService } from "../token/token-person.service";
import { AuthLoginDTO } from "./dtos/auth-login.dto";
import * as bcrypt from "bcrypt";
import { UpdateUserDTO } from "../user/dtos/user-update.dto";

@Injectable()
export class AuthPersonService {
  constructor(
    private readonly userPersonService: UserPersonService,
    private readonly tokenPersonService: TokenPersonService
  ) {}

  async register(body: CreateUserDTO) {
    const user = await this.userPersonService.create(body);
    return user;
  }

  async login(body: AuthLoginDTO) {
    const { cpf, email, password } = body;

    const user =
      (cpf && (await this.userPersonService.retrieveByCPF(cpf))) ||
      (email && (await this.userPersonService.retrieveByEmail(email)));

    // The reason why I'm not throwing an UnauthorizedException
    // is to not give further information for malicious users
    // that some of the credentials given was correct and thus
    // the user might exist
    if (!user) throw new NotFoundException("Email, CPF or password incorrects");

    if (!(await bcrypt.compare(password, user.password))) {
      throw new NotFoundException("Email, CPF or password incorrects");
    }

    await this.userPersonService.updateLastLogin(user.id);

    return this.tokenPersonService.signToken(user.id);
  }

  async refresh(refreshToken: string) {
    const decoded =
      await this.tokenPersonService.validateRefreshToken(refreshToken);

    if (!decoded) {
      throw new UnauthorizedException("Invalid refresh token");
    }

    const { accessToken } = this.tokenPersonService.signToken(decoded.sub);

    return { accessToken };
  }

  async update(userId: string, body: UpdateUserDTO) {
    const { name, cpf, gender, rg, phone, birth_date } = body;

    await this.userPersonService.update(userId, {
      name,
      cpf,
      gender,
      rg,
      phone,
      birth_date,
    });

    return this.tokenPersonService.signToken(userId);
  }

  async forget() {}

  async reset() {}

  async delete() {}
}

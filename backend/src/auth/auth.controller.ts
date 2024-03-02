import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterAuthDTO } from "./dto/register-auth.dto";
import { AuthLoginDTO } from "./dto/login-auth.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/user/entity/user.entity";
import { Repository } from "typeorm";

@Controller("api/auth")
export class AuthController {
  constructor(
    @InjectRepository(UserEntity) private userService: Repository<UserEntity>,
    private readonly authService: AuthService
  ) {}

  @Post("register")
  register(@Body() body: RegisterAuthDTO) {
    const error = {
      emailExists: false,
      cpfExists: false,
    };

    if (this.userService.findOneBy({ email: body.email })) {
      error.emailExists = true;
    }

    if (this.userService.findOneBy({ cpf: body.cpf })) {
      // TODO: create a custom guard to validate CPF
      error.cpfExists = true;
    }

    if (!!Object.values(error).filter((anyTrue) => anyTrue).length) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: JSON.stringify(error),
        },
        HttpStatus.BAD_REQUEST,
        { cause: JSON.stringify(error) }
      );
    }

    return this.authService.register(body);
  }

  @Post("login")
  login(@Body() { login, password }: AuthLoginDTO) {
    return this.authService.login(login, password);
  }

  @Post("forget")
  forget() {}

  @Post("reset")
  reset() {}

  @Post("me")
  me() {}
}

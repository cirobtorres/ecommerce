import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterAuthDTO } from "./dto/register-auth.dto";
import { AuthLoginDTO } from "./dto/login-auth.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../user/entity/user.entity";
import { Repository } from "typeorm";
import { AuthGuard, CPFGuard } from "./guards/auth.guard";
import { Auth } from "./decorators/auth.decorator";

@Controller("api/auth")
export class AuthController {
  constructor(
    @InjectRepository(UserEntity) private userService: Repository<UserEntity>,
    private readonly authService: AuthService
  ) {}

  @UseGuards(CPFGuard)
  @Post("register")
  register(@Body() body: RegisterAuthDTO) {
    return this.authService.register(body);
  }

  @Post("login")
  login(@Body() { login, password }: AuthLoginDTO) {
    return this.authService.login(login, password);
  }

  @UseGuards(AuthGuard)
  @Post("user-data")
  userData(@Auth() user: UserEntity) {
    return user;
  }

  @Post("forget")
  forget() {}

  @Post("reset")
  reset() {}

  @Post("me")
  me() {}
}

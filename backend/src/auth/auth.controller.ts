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
import { UserEntity } from "src/user/entity/user.entity";
import { Repository } from "typeorm";
import { AuthGuard } from "src/guards/auth.guard";
import { User } from "src/decorators/user.decorator";

@Controller("api/auth")
export class AuthController {
  constructor(
    @InjectRepository(UserEntity) private userService: Repository<UserEntity>,
    private readonly authService: AuthService
  ) {}

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
  userData(@User() user: UserEntity) {
    return user;
  }

  @Post("forget")
  forget() {}

  @Post("reset")
  reset() {}

  @Post("me")
  me() {}
}

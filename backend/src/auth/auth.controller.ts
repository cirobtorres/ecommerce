import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterAuthDTO } from "./dto/register-auth.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  register(@Body() body: RegisterAuthDTO) {
    return this.authService.register(body);
  }

  @Post("login")
  login() {}

  @Post("forget")
  forget() {}

  @Post("reset")
  reset() {}

  @Post("me")
  me() {}
}

import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterAuthDTO } from "./dto/register-auth.dto";
import { AuthLoginDTO } from "./dto/login-auth.dto";

@Controller("api/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  register(@Body() body: RegisterAuthDTO) {
    return this.authService.register(body);
  }

  @Post("login")
  login(@Body() { email, password }: AuthLoginDTO) {
    return this.authService.login(email, password);
  }

  @Post("forget")
  forget() {}

  @Post("reset")
  reset() {}

  @Post("me")
  me() {}
}

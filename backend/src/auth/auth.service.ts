import { Injectable } from "@nestjs/common";
import { UserEntity } from "src/user/entity/user.entity";
import { UserService } from "src/user/user.service";
import { RegisterAuthDTO } from "./dto/register-auth.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  createToken(user: UserEntity) {
    return {
      accessToken: this.jwtService.sign(
        { id: user.id },
        { expiresIn: "7 days", issuer: "login", audience: `${user.privileges}` }
      ),
    };
  }

  async register(formData: RegisterAuthDTO) {
    delete formData.privileges;
    const user = await this.userService.create(formData);
    return this.createToken(user);
  }
}

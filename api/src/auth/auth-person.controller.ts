import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { AuthPersonService } from "./auth-person.service";
import { AddressPersonService } from "../address/address-person.service";
import { AvatarPersonService } from "../avatar/avatar-person.service";
import { CreatePersonDTO } from "../user/dtos/person-create.dto";
import { AuthLoginDTO } from "./dtos/auth-login.dto";

@Controller("api/auth/person")
export class AuthPersonController {
  constructor(
    private readonly authPersonService: AuthPersonService,
    private readonly addressPersonService: AddressPersonService,
    private readonly avatarPersonService: AvatarPersonService
  ) {}

  @Post("sign-up")
  @HttpCode(201)
  async signUp(@Body() body: CreatePersonDTO) {
    return this.authPersonService.signUp(body);
  }

  @Post("generate-email-link")
  @HttpCode(200)
  async resendAuthEmailLink(@Body() body: AuthLoginDTO) {
    try {
      const { properties, user } =
        await this.authPersonService.generateEmailLink(body);

      return this.authPersonService.sendAuthenticationEmail(properties, user);
    } catch (error) {
      throw error; // TODO
    }
  }

  @Post("exists/cpf")
  @HttpCode(200)
  async cpfExists(@Body() { cpf }: { cpf: string }) {
    return this.authPersonService.cpfExists(cpf);
  }
}

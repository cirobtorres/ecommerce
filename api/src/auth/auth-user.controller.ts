import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
} from "@nestjs/common";
import { AuthPersonService } from "./auth-person.service";
import { AddressPersonService } from "../address/address-person.service";
import { AvatarPersonService } from "../avatar/avatar-person.service";
import { CreatePersonDTO } from "../user/dtos/person-create.dto";
import { AuthLoginDTO } from "./dtos/auth-login.dto";
import { AuthCompanyService } from "./auth-company.service";
import { CreateCompanyDTO } from "../user/dtos/company-create.dto";
import { AuthUserService } from "./auth-user.service";
import { CNPJValidator, CPFValidator } from "src/utils/docValidator";

@Controller("api/auth/user")
export class AuthUserController {
  constructor(
    private readonly authPersonService: AuthPersonService,
    private readonly authCompanyService: AuthCompanyService,
    private readonly authUserService: AuthUserService,
    private readonly addressPersonService: AddressPersonService,
    private readonly avatarPersonService: AvatarPersonService
  ) {}

  @Post("person-data/sign-up")
  @HttpCode(201)
  async personSignUp(@Body() body: CreatePersonDTO) {
    return this.authPersonService.signUp(body);
  }

  @Post("company-data/sign-up")
  @HttpCode(201)
  async companySignUp(@Body() body: CreateCompanyDTO) {
    return this.authCompanyService.signUp(body as CreateCompanyDTO);
  }

  @Post("generate-email-link-by/email")
  @HttpCode(200)
  async resendAuthEmailLinkByEmail(@Body() body: AuthLoginDTO) {
    const { email, password } = body;
    const { properties, user } =
      await this.authUserService.generateEmailLinkByEmail(email, password);
    return this.authUserService.sendAuthenticationEmail(properties, user);
  }

  @Post("generate-email-link-by/cpf")
  @HttpCode(200)
  async resendAuthEmailLinkByCpf(@Body() body: AuthLoginDTO) {
    const { cpf, password } = body;
    const { properties, user } =
      await this.authPersonService.generateEmailLinkByCpf(cpf, password);
    return this.authUserService.sendAuthenticationEmail(properties, user);
  }

  @Post("generate-email-link-by/cnpj")
  @HttpCode(200)
  async resendAuthEmailLinkByCnpj(@Body() body: AuthLoginDTO) {
    const { cnpj, password } = body;
    const { properties, user } =
      await this.authCompanyService.generateEmailLinkByCnpj(cnpj, password);
    return this.authUserService.sendAuthenticationEmail(properties, user);
  }

  @Post("reset-password")
  @HttpCode(200)
  async generatePasswordResetLink(@Body() { body }: { body: AuthLoginDTO }) {
    const cpfData = new CPFValidator(body as string);
    const cnpjData = new CNPJValidator(body as string);
    const emailData = body as string;
    if (cpfData.isValid) {
      const { email } = await this.authPersonService.retrieveEmailByCpf(
        cpfData.cpf
      );
      return this.authUserService.generatePasswordResetLinkByEmail(email);
    } else if (cnpjData.isValid) {
      const { email } = await this.authCompanyService.retrieveEmailByCnpj(
        cnpjData.cnpj
      );
      return this.authUserService.generatePasswordResetLinkByEmail(email);
    } else if (emailData.includes("@")) {
      return this.authUserService.generatePasswordResetLinkByEmail(emailData);
    } else {
      throw new BadRequestException("Invalid credentials");
    }
  }

  @Post("exists/cpf") // ok
  @HttpCode(200)
  async cpfExists(@Body() { cpf }: { cpf: string }) {
    return this.authPersonService.cpfExists(cpf);
  }

  @Post("exists/cnpj") // ok
  @HttpCode(200)
  async cnpjExists(@Body() { cnpj }: { cnpj: string }) {
    return this.authCompanyService.cnpjExists(cnpj);
  }
}

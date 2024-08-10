import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { AuthCompanyService } from "./auth-company.service";
import { CreateCompanyDTO } from "../user/dtos/company-create.dto";

@Controller("api/auth/company")
export class AuthCompanyController {
  constructor(private readonly authCompanyService: AuthCompanyService) {}

  @Post("sign-up")
  @HttpCode(201)
  async signUp(@Body() body: CreateCompanyDTO) {
    return this.authCompanyService.signUp(body);
  }

  @Post("exists/cnpj")
  @HttpCode(200)
  async cnpjExists(@Body() { cnpj }: { cnpj: string }) {
    return this.authCompanyService.cnpjExists(cnpj);
  }
}

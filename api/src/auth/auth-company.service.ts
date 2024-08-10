import { Injectable } from "@nestjs/common";
import { AuthLoginDTO } from "./dtos/auth-login.dto";
import { UpdateUserDTO } from "../user/dtos/person-update.dto";
import { UserCompanyService } from "../user/user-company.service";
import { CreateCompanyDTO } from "../user/dtos/company-create.dto";

@Injectable()
export class AuthCompanyService {
  constructor(private readonly userCompanyService: UserCompanyService) {}

  async signUp(body: CreateCompanyDTO) {
    return this.userCompanyService.create(body);
  }

  async login(body: AuthLoginDTO) {}

  async update(userId: string, body: UpdateUserDTO) {}

  async forget() {}

  async reset() {}

  async delete() {}

  // async emailExists(email: string) {
  //   return this.userPersonService.emailExists(email);
  // }

  async cnpjExists(cnpj: string) {
    return this.userCompanyService.cnpjExists(cnpj);
  }
}

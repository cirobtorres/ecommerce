import { Injectable } from "@nestjs/common";
import { UserPersonService } from "src/user/user-person.service";
import { CreateUserDTO } from "../user/dtos/user-create.dto";
import { AuthLoginDTO } from "./dtos/auth-login.dto";
import { UpdateUserDTO } from "../user/dtos/user-update.dto";

@Injectable()
export class AuthPersonService {
  constructor(private readonly userPersonService: UserPersonService) {}

  async signUp(body: CreateUserDTO) {
    return this.userPersonService.create(body);
  }

  async login(body: AuthLoginDTO) {}

  async update(userId: string, body: UpdateUserDTO) {}

  async forget() {}

  async reset() {}

  async delete() {}

  // async emailExists(email: string) {
  //   return this.userPersonService.emailExists(email);
  // }

  async cpfExists(cpf: string) {
    return this.userPersonService.cpfExists(cpf);
  }
}

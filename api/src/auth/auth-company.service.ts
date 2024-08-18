import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { AuthLoginDTO } from "./dtos/auth-login.dto";
import { UpdateUserDTO } from "../user/dtos/person-update.dto";
import { UserCompanyService } from "../user/user-company.service";
import { CreateCompanyDTO } from "../user/dtos/company-create.dto";
import { SUPABASE_CLIENT } from "../utils/constants/supabase.constants";
import { SupabaseClient } from "@supabase/supabase-js";

@Injectable()
export class AuthCompanyService {
  constructor(
    @Inject(SUPABASE_CLIENT)
    private readonly supabaseClient: SupabaseClient,
    private readonly userCompanyService: UserCompanyService
  ) {}

  async signUp(body: CreateCompanyDTO) {
    return this.userCompanyService.create(body);
  }

  async generateEmailLinkByCnpj(cnpj: string, password: string) {
    try {
      const { email: retrievedEmail } =
        await this.userCompanyService.retrieveEmailByCnpj(cnpj);

      const {
        data: { properties, user },
        error,
      } = await this.supabaseClient.auth.admin.generateLink({
        type: "signup",
        email: retrievedEmail,
        password,
      });

      if (error) throw error;

      return { properties, user };
    } catch (error) {
      console.log(
        "----------\nAuthCompanyService: generateEmailLinkByCnpj ERROR\n",
        error,
        "\n----------\n"
      );
      throw new BadRequestException(error);
    }
  }

  async cnpjExists(cnpj: string) {
    return this.userCompanyService.cnpjExists(cnpj);
  }
}

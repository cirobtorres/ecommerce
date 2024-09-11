import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { UserPersonService } from "src/user/user-person.service";
import { CreatePersonDTO } from "../user/dtos/person-create.dto";
import { AuthLoginDTO } from "./dtos/auth-login.dto";
import { UpdateUserDTO } from "../user/dtos/person-update.dto";
import { SUPABASE_CLIENT } from "src/utils/constants/supabase.constants";
import { SupabaseClient, User } from "@supabase/supabase-js";
import { EmailService } from "src/mailer/mailer.provider";

@Injectable()
export class AuthPersonService {
  constructor(
    @Inject(SUPABASE_CLIENT)
    private readonly supabaseClient: SupabaseClient,
    private readonly mailerService: EmailService,
    private readonly userPersonService: UserPersonService
  ) {}

  async signUp(body: CreatePersonDTO) {
    return this.userPersonService.create(body);
  }

  async retrieveEmailByCpf(cpf: string) {
    const { email } = await this.userPersonService.retrieveEmailByCpf(cpf);

    return { email };
  }

  async generateEmailLinkByCpf(cpf: string, password: string) {
    try {
      const { email } = await this.retrieveEmailByCpf(cpf);

      const {
        data: { properties, user },
        error,
      } = await this.supabaseClient.auth.admin.generateLink({
        type: "signup",
        email,
        password,
      });

      if (error) throw error;

      return { properties, user };
    } catch (error) {
      console.log(
        "----------\nAuthPersonService: generateEmailLink ERROR\n",
        error,
        "\n----------\n"
      );
      throw new BadRequestException(error);
    }
  }

  async cpfExists(cpf: string) {
    return this.userPersonService.cpfExists(cpf);
  }
}

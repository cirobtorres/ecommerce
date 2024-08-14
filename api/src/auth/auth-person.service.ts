import { Inject, Injectable } from "@nestjs/common";
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

  async generateEmailLink(body: AuthLoginDTO) {
    const { email, password } = body;

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
  }

  async sendAuthenticationEmail(properties, user: User) {
    try {
      const completeUserData =
        await this.userPersonService.extractUserRelatedData(user);

      const { action_link, hashed_token, email_otp } = properties; // action_link, hashed_token, email_otp, redirect_to, verification_type
      const { email } = completeUserData;
      const { display_name, full_name } = completeUserData.refrigel_users;
      const { brand_name } = completeUserData.refrigel_users.company_data;

      if (brand_name) {
        await this.mailerService.sendUserConfirmation(
          { email, contactName: brand_name },
          action_link
        );
        return { ok: true };
      }

      await this.mailerService.sendUserConfirmation(
        { email, contactName: display_name },
        action_link
      );
      return { ok: true };
    } catch (error) {
      throw error;
    }
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

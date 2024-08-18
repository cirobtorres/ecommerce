import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { SUPABASE_CLIENT } from "src/utils/constants/supabase.constants";
import {
  GenerateLinkProperties,
  SupabaseClient,
  User,
} from "@supabase/supabase-js";
import { EmailService } from "src/mailer/mailer.provider";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthUserService {
  constructor(
    @Inject(SUPABASE_CLIENT)
    private readonly supabaseClient: SupabaseClient,
    private readonly mailerService: EmailService,
    private readonly userService: UserService
  ) {}

  async generateEmailLinkByEmail(email: string, password: string) {
    try {
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
        "----------\nAuthUserService: generateEmailLinkByEmail ERROR\n",
        error,
        "\n----------\n"
      );
      throw new BadRequestException(error);
    }
  }

  async sendAuthenticationEmail(
    properties: GenerateLinkProperties,
    user: User
  ) {
    try {
      const completeUserData =
        await this.userService.extractUserRelatedData(user);

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
}

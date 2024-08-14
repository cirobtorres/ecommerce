import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { SUPABASE_CLIENT } from "../utils/constants/supabase.constants";
import { SupabaseClient } from "@supabase/supabase-js";
import { CNPJValidator } from "../utils/docValidator";
import { CreateCompanyDTO } from "./dtos/company-create.dto";
import { UserPrivileges } from "./enums/privileges.enum";
import { UserType } from "./enums/user-types.enum";

@Injectable()
export class UserCompanyService {
  constructor(
    @Inject(SUPABASE_CLIENT)
    private readonly supabaseClient: SupabaseClient
  ) {}

  async cnpjExists(cnpj: string) {
    if (!new CNPJValidator(cnpj).isValid) {
      throw new BadRequestException("CNPJ invalid");
    }

    const { data: cnpjExists } = await this.supabaseClient
      .from("company_data")
      .select("id, cnpj")
      .eq("cnpj", cnpj)
      .single();

    if (cnpjExists) {
      throw new BadRequestException("CNPJ exists");
    }
  }

  async create(body: CreateCompanyDTO) {
    const {
      email,
      password,
      phone,
      name,
      brand_name,
      legal_name,
      tax_info,
      cnpj,
      ie,
      im,
      establishment_at,
      allow_email_newsletter,
      agreed_data_policies,
    } = body;

    this.cnpjExists(cnpj);

    const { data: authData, error: authError } =
      await this.supabaseClient.auth.signUp({
        email,
        phone,
        password,
      });

    if (authError) {
      throw authError;
    }

    const authUserId = authData.user?.id;

    const { data: refrigelUser, error: refrigelUserError } =
      await this.supabaseClient
        .from("refrigel_users")
        .insert([
          {
            auth_user_id: authUserId,
            privileges: UserPrivileges.USER,
            user_type: UserType.COMPANY,
            display_name: name.split(" ")[0],
            full_name: name,
            allow_email_newsletter,
            agreed_data_policies,
          },
        ])
        .select()
        .single();

    if (refrigelUserError) {
      throw refrigelUserError;
    }

    const refrigelUserId = refrigelUser.id;

    const { data: companyData, error: companyDataError } =
      await this.supabaseClient.from("company_data").insert([
        {
          refrigel_user_id: refrigelUserId,
          // Even though the user does not give its full name, nor the string contains any " " character, split(" ")[0] won't return any error
          // The attempt to access any unexistance index will return undefined
          brand_name,
          legal_name,
          cnpj,
          tax_info,
          ie,
          im,
          // rg,
          establishment_at,
        },
      ]);

    if (companyDataError) {
      throw companyDataError;
    }

    return { ok: true };
  }
}

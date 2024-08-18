import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { SUPABASE_CLIENT } from "../utils/constants/supabase.constants";
import { SupabaseClient } from "@supabase/supabase-js";
import { CreatePersonDTO } from "./dtos/person-create.dto";
import { UserPrivileges } from "./enums/privileges.enum";
import { CPFValidator } from "../utils/docValidator";
import { UserType } from "./enums/user-types.enum";

@Injectable()
export class UserPersonService {
  constructor(
    @Inject(SUPABASE_CLIENT)
    private readonly supabaseClient: SupabaseClient
  ) {}

  async retrieveEmailByCpf(cpf: string) {
    const { data: personUser, error: personError } = await this.supabaseClient
      .from("person_data")
      .select("*")
      .eq("cpf", cpf)
      .single();

    const { data: refrigelUser, error: refrigelUserError } =
      await this.supabaseClient
        .from("refrigel_users")
        .select("*")
        .eq("id", personUser.refrigel_user_id)
        .single();

    const { data: authData, error: authError } =
      await this.supabaseClient.auth.admin.getUserById(
        refrigelUser.auth_user_id
      );

    const { email } = authData.user;

    return { email };
  }

  async cpfExists(cpf: string) {
    if (!new CPFValidator(cpf).isValid) {
      throw new BadRequestException("CPF invalid");
    }

    const { data: cpfExists } = await this.supabaseClient
      .from("person_data")
      .select("id, cpf")
      .eq("cpf", cpf)
      .single();

    if (cpfExists) {
      throw new BadRequestException("CPF exists");
    } else {
      return false;
    }
  }

  async create(body: CreatePersonDTO) {
    const {
      email,
      password,
      phone,
      name,
      cpf,
      gender,
      birth_date,
      allow_email_newsletter,
      agreed_data_policies,
    } = body;

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
            user_type: UserType.PERSON,
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

    const { error: personDataError } = await this.supabaseClient
      .from("person_data")
      .insert([
        {
          refrigel_user_id: refrigelUserId,
          // Even though the user does not give its full name, nor the string contains any " " character, split(" ")[0] won't return any error
          // The attempt to access any unexistance index will return undefined
          cpf,
          // rg,
          gender,
          birth_date,
        },
      ]);

    if (personDataError) {
      throw personDataError;
    }

    return true;
  }
}

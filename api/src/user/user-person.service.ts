import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { SUPABASE_CLIENT } from "../utils/constants/supabase.constants";
import { SupabaseClient } from "@supabase/supabase-js";
import { CreateUserDTO } from "./dtos/user-create.dto";
import { UserPrivileges } from "./enums/privileges.enum";
import { UserType } from "./enums/user-types.enum";
import { Gender } from "./enums/gender.enum";
import { UpdateUserDTO } from "./dtos/user-update.dto";
import enumParser from "../utils/enum-parse";
import { CPFValidator } from "src/utils/docValidator";

@Injectable()
export class UserPersonService {
  constructor(
    @Inject(SUPABASE_CLIENT)
    private readonly supabaseClient: SupabaseClient
  ) {}

  // async emailExists(email: string) {
  //   const { data: emailExists } = await this.supabaseClient.rpc(
  //     "get_user_id_by_email",
  //     {
  //       email,
  //     }
  //   );

  //   if (emailExists) {
  //     throw new BadRequestException("E-mail exists");
  //   } else {
  //     return false;
  //   }
  // }

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

  async create(body: CreateUserDTO) {
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
        password: password,
      });

    if (authError) {
      console.log("-----1 authError", authError);
      throw authError;
    }

    const authUserId = authData.user?.id;
    const { data: refrigelUser, error: refrigelUserError } =
      await this.supabaseClient
        .from("refrigel_users")
        .insert([
          {
            auth_user_id: authUserId,
            privileges: UserPrivileges.USER, // 1 = User (2 = Admin)
            user_type: UserType.PERSON, // F = Física (J = Jurídica)
            allow_email_newsletter,
            agreed_data_policies,
          },
        ])
        .select()
        .single();

    if (refrigelUserError) {
      console.log("-----2 refrigelUserError", refrigelUserError);
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
          display_name: name.split(" ")[0],
          full_name: name,
          cpf,
          // rg,
          birth_date,
          gender,
        },
      ]);

    if (personDataError) {
      console.log("-----3 personDataError", personDataError);
      throw personDataError;
    }

    return { ok: true };
  }
}

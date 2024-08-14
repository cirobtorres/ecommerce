import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { SUPABASE_CLIENT } from "../utils/constants/supabase.constants";
import { SupabaseClient, User } from "@supabase/supabase-js";
import { CreatePersonDTO } from "./dtos/person-create.dto";
import { UserPrivileges } from "./enums/privileges.enum";
import { UserType } from "./enums/user-types.enum";
import { Gender } from "./enums/gender.enum";
import { UpdateUserDTO } from "./dtos/person-update.dto";
import enumParser from "../utils/enum-parse";
import { CPFValidator } from "../utils/docValidator";
import { AuthLoginDTO } from "../auth/dtos/auth-login.dto";

type PersonData = {
  id?: string;
  refrigel_user_id?: string;
  cpf?: string;
  rg?: string | null;
  gender?: string; // ENUM
  birth_date?: string;
};

type CompanyData = {
  id?: string;
  refrigel_user_id?: string;
  legal_name?: string;
  brand_name?: string;
  cnpj?: string;
  tax_info?: number; // ENUM
  ie?: string | null;
  im?: string | null;
  establishment_at?: string;
};

type AddressData = {
  id: string;
  refrigel_user_id?: string;
  street: string;
  number: string;
  district: string;
  city: string;
  zip_code: string;
  place: string;
  is_default: boolean;
  updated_at: string;
  created_at: string;
  uf: string; // ENUM
};

type PersonType = {
  id: string;
  auth_user_id?: string;
  user_type: "F" | "J"; // ENUM
  privileges: number; // ENUM
  display_name: string;
  full_name: string;
  avatar_url: string;
  allow_email_newsletter: boolean;
  agreed_data_policies: boolean;
  person_data: PersonData | null;
  company_data: CompanyData | null;
  address: AddressData[];
};

type RefrigelUser = User & {
  refrigel_users: PersonType;
};

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

    return { ok: true };
  }

  async getUserType(refrigel_user_id: string, user_type: "F" | "J") {
    if (user_type === "F") {
      const { data: personData, error: personError } = await this.supabaseClient
        .from("person_data")
        .select("*")
        .eq("refrigel_user_id", refrigel_user_id)
        .single();
      delete personData?.refrigel_user_id;
      return {
        company_data: null,
        person_data: personData,
        userError: personError,
      };
    } else if (user_type === "J") {
      const { data: companyData, error: companyError } =
        await this.supabaseClient
          .from("company_data")
          .select("*")
          .eq("refrigel_user_id", refrigel_user_id)
          .single();
      delete companyData?.refrigel_user_id;
      return {
        company_data: companyData,
        person_data: null,
        userError: companyError,
      };
    } else {
      return {
        person_data: null,
        company_data: null,
        userError: "invalid user_type",
      };
    }
  }

  async extractUserRelatedData(user: User) {
    const { data: refrigelUserData, error: refrigelUserError } =
      await this.supabaseClient
        .from("refrigel_users")
        .select()
        .eq("auth_user_id", user.id)
        .single();

    if (refrigelUserError) throw refrigelUserError;

    const { id: refrigel_user_id, user_type } = refrigelUserData;

    const { company_data, person_data, userError } = await this.getUserType(
      refrigel_user_id,
      user_type
    );

    if (userError) throw userError;

    const { data: address_data, error: addressError } =
      await this.supabaseClient
        .from("addresses")
        .select("*")
        .eq("refrigel_user_id", refrigel_user_id);

    if (addressError) throw addressError;

    return {
      ...user,
      refrigel_users: {
        ...refrigelUserData,
        person_data: { ...person_data },
        company_data: { ...company_data },
        address: address_data || [],
      },
    };
  }
}

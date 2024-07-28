import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { SUPABASE_CLIENT } from "src/utils/constants/supabase.constants";
import { SupabaseClient } from "@supabase/supabase-js";
import { CreateUserDTO } from "./dtos/user-create.dto";
import { UserPrivileges } from "./enums/privileges.enum";
import { UserType } from "./enums/user-types.enum";
import * as bcrypt from "bcrypt";
import { Gender } from "./enums/gender.enum";
import { UpdateUserDTO } from "./dtos/user-update.dto";

@Injectable()
export class PersonService {
  constructor(
    @Inject(SUPABASE_CLIENT)
    private readonly supabaseClient: SupabaseClient
  ) {}

  async retrieveById(userId: string) {
    const { data, error } = await this.supabaseClient
      .from("users")
      .select(
        "*, person_data (name, gender, cpf, rg, birth_date), avatars (secure_url), addresses (id)"
      )
      .eq("id", userId)
      .single();

    if (error) throw error;

    if (data && data.password) {
      delete data.password;
    }

    return data;
  }

  async retrieveByEmail(email: string) {
    const { data, error } = await this.supabaseClient
      .from("users")
      .select("*, person_data (name, cpf, rg, gender, birth_date)")
      .eq("email", email)
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116 = zero rows
      // .select().eq() is returning zero rows, and .single() expect at least 1 row
      throw error;
    }

    return data;
  }

  async retrieveByCPF(cpf: string) {
    const { data, error } = await this.supabaseClient
      .from("users")
      .select("*, person_data (name, cpf, rg, gender, birth_date)")
      .eq("person_data.cpf", cpf)
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116 = zero rows
      // .select().eq() is returning zero rows, and .single() expect at least 1 row
      throw error;
    }

    return data;
  }

  async create(body: CreateUserDTO) {
    const { email, password, phone, name, cpf, rg, gender, birth_date } = body;

    if ((await this.retrieveByEmail(email)) !== null)
      throw new BadRequestException("Email already taken");

    if ((await this.retrieveByCPF(cpf)) !== null)
      throw new BadRequestException("CPF already taken");

    // Creating `users`
    const { data: userData } = await this.supabaseClient
      .from("users")
      .insert([
        {
          email,
          password: await bcrypt.hash(password, await bcrypt.genSalt()),
          phone,
          privileges: UserPrivileges.USER,
          user_type: UserType.PERSON,
        },
      ])
      .select(); // Return an array

    const userId = userData[0].id;

    // Creating `person_data`
    await this.supabaseClient
      .from("person_data")
      .insert([
        {
          user_id: userId,
          name,
          cpf,
          rg: rg ?? null,
          gender: gender ?? Gender.NONE,
          birth_date: birth_date ?? null,
        },
      ])
      .select();

    return { message: "User created successfully" };
  }

  async update(userId: string, data: UpdateUserDTO): Promise<void> {
    const { phone, ...dataPersonRelated } = data;

    const { error: userError } = await this.supabaseClient
      .from("users")
      .update({ phone, updated_at: new Date().toISOString() })
      .eq("id", userId);

    if (userError) throw userError;

    const { error: personError } = await this.supabaseClient
      .from("person_data")
      .update({ ...dataPersonRelated })
      .eq("user_id", userId);

    if (personError) throw personError;
  }

  async updateLastLogin(userId: string) {
    const { error } = await this.supabaseClient
      .from("users")
      .update({
        last_login: new Date().toISOString(),
      })
      .eq("id", userId);

    if (error) throw error;
  }
}

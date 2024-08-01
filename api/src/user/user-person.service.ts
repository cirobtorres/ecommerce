import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { SUPABASE_CLIENT } from "../utils/constants/supabase.constants";
import { SupabaseClient } from "@supabase/supabase-js";
import { CreateUserDTO } from "./dtos/user-create.dto";
import { UserPrivileges } from "./enums/privileges.enum";
import { UserType } from "./enums/user-types.enum";
import * as bcrypt from "bcrypt";
import { Gender } from "./enums/gender.enum";
import { UpdateUserDTO } from "./dtos/user-update.dto";

interface UserData {
  id: string;
  email: string;
  phone: string;
  privileges: number;
  active: boolean;
  email_verified: boolean;
  last_login: string | null;
  user_type: string;
  avatar_id: string | null;
  created_at: string;
  updated_at: string;
  allow_sms: boolean;
  allow_email: boolean;
}

@Injectable()
export class UserPersonService {
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

    // if (data && data.password) {
    //   delete data.password;
    // }

    return data;
  }

  async retrieveByEmail(email: string) {
    const { data, error } = await this.supabaseClient
      .from("users")
      .select(
        "*, person_data (name, gender, cpf, rg, birth_date), avatars (secure_url), addresses (id)"
      )
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
      .from("person_data")
      .select("*")
      .eq("cpf", cpf)
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116 = zero rows
      // .select().eq() is returning zero rows, and .single() expect at least 1 row
      throw error;
    }

    return data;
  }

  async create(body: CreateUserDTO): Promise<{
    message: string;
  }> {
    const { email, password, phone, name, cpf, rg, gender, birth_date } = body;

    if ((await this.retrieveByEmail(email)) !== null)
      throw new BadRequestException("Email already taken");

    if ((await this.retrieveByCPF(cpf)) !== null)
      throw new BadRequestException("CPF already taken");

    // Creating `users`
    const { data: userData, error: userError } = await this.supabaseClient
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
      .select()
      .single<UserData>();

    if (userError) throw userError;

    const userId = userData.id;

    // Creating `person_data`
    await this.supabaseClient.from("person_data").insert([
      {
        user_id: userId,
        name,
        cpf,
        rg: rg ?? null,
        gender: gender ?? Gender.NONE,
        birth_date: birth_date ?? null,
      },
    ]);

    return { message: "User created successfully" };
  }

  async update(
    userId: string,
    data: UpdateUserDTO
  ): Promise<{
    message: string;
  }> {
    const { phone, name, cpf, gender, rg, birth_date } = data;

    if (phone) {
      const { error: userError } = await this.supabaseClient
        .from("users")
        .update({ phone, updated_at: new Date().toISOString() })
        .eq("id", userId);

      if (userError) throw userError;
    }

    if (name || cpf || gender || rg || birth_date) {
      const { error: personError } = await this.supabaseClient
        .from("person_data")
        .update({ name, cpf, gender, rg, birth_date })
        .eq("user_id", userId);

      if (personError) throw personError;
    }

    return { message: "User updated successfully" };
  }

  async updateLastLogin(userId: string): Promise<{
    message: string;
  }> {
    const { error } = await this.supabaseClient
      .from("users")
      .update({
        last_login: new Date().toISOString(),
      })
      .eq("id", userId);

    if (error) throw error;

    return { message: "User last_login updated successfully" };
  }
}

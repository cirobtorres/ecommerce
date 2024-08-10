import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { SUPABASE_CLIENT } from "../utils/constants/supabase.constants";
import { SupabaseClient } from "@supabase/supabase-js";
import { CNPJValidator } from "../utils/docValidator";
import { CreateCompanyDTO } from "./dtos/company-create.dto";

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
    } else {
      return false;
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

    console.log(
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
      agreed_data_policies
    );

    return { ok: true };
  }
}

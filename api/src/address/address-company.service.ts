import { Inject, Injectable } from "@nestjs/common";
import { SUPABASE_CLIENT } from "src/utils/constants/supabase.constants";
import { SupabaseClient } from "@supabase/supabase-js";

@Injectable()
export class CompanyAddressService {
  constructor(
    @Inject(SUPABASE_CLIENT)
    private readonly supabaseClient: SupabaseClient
  ) {}

  async list() {}

  async create() {}

  async update() {}

  async setDefault() {}

  async destroyAddress() {}
}

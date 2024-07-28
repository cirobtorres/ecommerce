import { Injectable, BadRequestException, Inject } from "@nestjs/common";
import { CreateAddressDTO } from "./dtos/address-create.dto";
import { UpdateAddressDTO } from "./dtos/address-update.dto";
import { SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_CLIENT } from "src/utils/constants/supabase.constants";

@Injectable()
export class AddressPersonService {
  constructor(
    @Inject(SUPABASE_CLIENT)
    private readonly supabaseClient: SupabaseClient
  ) {}

  async list(userId: string) {
    const { data, error } = await this.supabaseClient
      .from("addresses")
      .select("*")
      .eq("user_id", userId)
      .order("is_default", { ascending: false })
      .order("created_at", { ascending: true });

    if (error) throw error;

    return data;
  }

  async create(userId: string, addressData: CreateAddressDTO) {
    delete addressData.is_default; // There is a proper method to handle with is_default (setDefault)

    const { data, error } = await this.supabaseClient
      .from("addresses")
      .select("*")
      .eq("user_id", userId)
      .select();

    if (data && data.length > 4)
      throw new BadRequestException(
        "Reached max number of addresses per user, with is 5"
      );

    const defaultExists = data.filter((row) => row.is_default)[0];
    if (!defaultExists) addressData.is_default = true;

    return await this.supabaseClient
      .from("addresses")
      .insert({ ...addressData, user_id: userId })
      .select();
  }

  async update(addressId: string, addressData: UpdateAddressDTO) {
    delete addressData.is_default; // There is a proper method to handle with is_default (setDefault)
    const { data, error } = await this.supabaseClient
      .from("addresses")
      .update({ ...addressData })
      .eq("id", addressId)
      .select();

    if (error) throw error;

    return data;
  }

  async setDefault(userId: string, addressId: string) {
    const { data, error } = await this.supabaseClient
      .from("addresses")
      .update({ is_default: false })
      .eq("user_id", userId)
      .neq("id", addressId)
      .eq("is_default", true);

    if (error) throw error;

    await this.supabaseClient
      .from("addresses")
      .update({ is_default: true })
      .eq("id", addressId);

    return true;
  }

  async destroyAddress(userId: string, addressId: string) {
    const { data, error } = await this.supabaseClient
      .from("addresses")
      .select("*")
      .eq("id", addressId)
      .single();

    if (error) throw error;

    if (data.is_default) {
      const { data: newDefaultAddress, error: newDefaultError } =
        await this.supabaseClient
          .from("addresses")
          .select("*")
          .eq("user_id", userId)
          .neq("id", addressId)
          .order("created_at", { ascending: true })
          .limit(1)
          .single();

      if (newDefaultError && newDefaultError.code !== "PGRST116")
        throw newDefaultError;

      if (newDefaultAddress) {
        await this.supabaseClient
          .from("addresses")
          .update({ is_default: true })
          .eq("id", newDefaultAddress.id);
      }
    }

    const { error: deleteError } = await this.supabaseClient
      .from("addresses")
      .delete()
      .eq("id", addressId);

    if (deleteError) throw deleteError;

    return { message: "Address deleted" };
  }
}

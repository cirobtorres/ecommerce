import { Inject, Injectable } from "@nestjs/common";
import { CLOUDINARY } from "../utils/constants/cloudinary.constants";
import { v2 as cloudinary } from "cloudinary";
import { SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_CLIENT } from "src/utils/constants/supabase.constants";

@Injectable()
export class AvatarPersonService {
  constructor(
    @Inject(SUPABASE_CLIENT)
    private readonly supabaseClient: SupabaseClient,
    @Inject(CLOUDINARY)
    private readonly cloudinaryService: typeof cloudinary
  ) {}
}

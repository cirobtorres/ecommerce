import { Inject, Injectable } from "@nestjs/common";
import {
  CLOUDINARY,
  CLOUDINARY_USERS_COMPANY_FOLDER,
} from "../utils/constants/cloudinary.constants";
import { v2 as cloudinary } from "cloudinary";
import { SUPABASE_CLIENT } from "src/utils/constants/supabase.constants";
import { SupabaseClient } from "@supabase/supabase-js";

@Injectable()
export class AvatarCompanyService {
  constructor(
    @Inject(SUPABASE_CLIENT)
    private readonly supabaseClient: SupabaseClient,
    @Inject(CLOUDINARY)
    private readonly cloudinaryService: typeof cloudinary
  ) {}

  async saveAvatar() {}

  async retrieveAvatar() {}
}

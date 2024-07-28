import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import {
  CLOUDINARY,
  CLOUDINARY_USERS_PERSON_FOLDER,
} from "../utils/constants/cloudinary.constants";
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

  async saveOrReplaceAvatar(user: any, file: Express.Multer.File) {
    try {
      const { error: oldAvatarError } = await this.supabaseClient
        .from("avatars")
        .delete()
        .eq("id", user.avatar_id);

      if (oldAvatarError && oldAvatarError.code !== "22P02")
        throw oldAvatarError;

      const uploadResult = await this.cloudinaryService.uploader.upload(
        file.path,
        {
          public_id: user.id,
          folder: CLOUDINARY_USERS_PERSON_FOLDER,
        }
      );

      delete uploadResult.api_key;

      const { data: imageData, error: imageError } = await this.supabaseClient
        .from("avatars")
        .insert({ ...uploadResult })
        .select();

      if (imageError) throw imageError;

      const imageId = imageData[0].id;

      const { data: userData, error: userError } = await this.supabaseClient
        .from("users")
        .update({ avatar_id: imageId })
        .eq("id", user.id);

      if (userError) throw userError;

      return { message: "Avatar saved" };
    } catch (error) {
      if (error.message === "Invalid image file" && error.http_code === 400) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  async retrieveAvatar(avatarId: string) {
    return await this.supabaseClient
      .from("avatars")
      .select()
      .eq("id", avatarId);
  }

  async destroyAvatar(userId: string, avatarId: string) {
    const { data: deletedAvatarArray, error: deletedAvatarArrayError } =
      await this.supabaseClient
        .from("avatars")
        .delete()
        .eq("id", avatarId)
        .select();

    // if (deletedAvatarArrayError)
    //   throw new NotFoundException("No image to delete");

    const deletedAvatar = deletedAvatarArray[0];

    const cloudinaryResponse = await this.cloudinaryService.uploader.destroy(
      deletedAvatar.public_id
    );

    return { message: "Avatar deleted" };
  }
}

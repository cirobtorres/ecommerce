import { forwardRef, Module } from "@nestjs/common";
import { CloudinaryProvider } from "src/cloudinary/cloudinary.provider";
import { AvatarPersonService } from "./avatar-person.service";
import { AvatarCompanyService } from "./avatar-company.service";
import { UserModule } from "src/user/user.module";
import { SupabaseModule } from "src/supabase/supabase.module";

@Module({
  imports: [
    // SupabaseModule,
    forwardRef(() => UserModule),
  ],
  controllers: [],
  providers: [AvatarPersonService, AvatarCompanyService, CloudinaryProvider],
  exports: [AvatarPersonService, AvatarCompanyService],
})
export class AvatarModule {}

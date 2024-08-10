import { forwardRef, Module } from "@nestjs/common";
import { CloudinaryProvider } from "src/cloudinary/cloudinary.provider";
import { AvatarPersonService } from "./avatar-person.service";
import { UserModule } from "src/user/user.module";

@Module({
  imports: [
    // SupabaseModule,
    forwardRef(() => UserModule),
  ],
  controllers: [],
  providers: [AvatarPersonService, CloudinaryProvider],
  exports: [AvatarPersonService],
})
export class AvatarModule {}

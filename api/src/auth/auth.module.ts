import { forwardRef, Module } from "@nestjs/common";
import { AuthPersonController } from "./auth-person.controller";
import { AuthPersonService } from "./auth-person.service";
import { UserModule } from "src/user/user.module";
import { AvatarModule } from "src/avatar/avatar.module";
import { MulterModule } from "@nestjs/platform-express";
import { AddressModule } from "src/address/address.module";

@Module({
  imports: [
    // SupabaseModule,
    forwardRef(() => UserModule),
    forwardRef(() => AvatarModule),
    forwardRef(() => AddressModule),
    MulterModule.register({
      dest: "./uploads",
    }),
  ],
  controllers: [AuthPersonController],
  providers: [AuthPersonService],
  exports: [AuthPersonService],
})
export class AuthModule {}

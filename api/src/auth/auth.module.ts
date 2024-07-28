import { forwardRef, Module } from "@nestjs/common";
import { TokenModule } from "src/token/token.module";
import { AuthPersonController } from "./auth-person.controller";
import { AuthPersonService } from "./auth-person.service";
import { AuthCompanyService } from "./auth-company.service";
import { AuthCompanyController } from "./auth-company.controller";
import { UserModule } from "src/user/user.module";
import { AvatarModule } from "src/avatar/avatar.module";
import { MulterModule } from "@nestjs/platform-express";
import { AddressModule } from "src/address/address.module";
import { SupabaseModule } from "src/supabase/supabase.module";

@Module({
  imports: [
    // SupabaseModule,
    forwardRef(() => TokenModule),
    forwardRef(() => UserModule),
    forwardRef(() => AvatarModule),
    forwardRef(() => AddressModule),
    MulterModule.register({
      dest: "./uploads",
    }),
  ],
  controllers: [AuthPersonController, AuthCompanyController],
  providers: [AuthPersonService, AuthCompanyService],
  exports: [AuthPersonService, AuthCompanyService],
})
export class AuthModule {}

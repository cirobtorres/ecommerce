import { forwardRef, Module } from "@nestjs/common";
import { AuthPersonService } from "./auth-person.service";
import { UserModule } from "src/user/user.module";
import { AvatarModule } from "src/avatar/avatar.module";
import { MulterModule } from "@nestjs/platform-express";
import { AddressModule } from "src/address/address.module";
import { AuthCompanyService } from "./auth-company.service";
import { EmailModule } from "src/mailer/mailer.module";
import { AuthUserController } from "./auth-user.controller";
import { AuthUserService } from "./auth-user.service";

@Module({
  imports: [
    // SupabaseModule, // Global
    EmailModule,
    forwardRef(() => UserModule),
    forwardRef(() => AvatarModule),
    forwardRef(() => AddressModule),
    MulterModule.register({
      dest: "./uploads",
    }),
  ],
  controllers: [AuthUserController],
  providers: [AuthUserService, AuthPersonService, AuthCompanyService],
  exports: [AuthUserService, AuthPersonService, AuthCompanyService],
})
export class AuthModule {}

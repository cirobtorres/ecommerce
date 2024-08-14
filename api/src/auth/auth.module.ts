import { forwardRef, Module } from "@nestjs/common";
import { AuthPersonController } from "./auth-person.controller";
import { AuthPersonService } from "./auth-person.service";
import { UserModule } from "src/user/user.module";
import { AvatarModule } from "src/avatar/avatar.module";
import { MulterModule } from "@nestjs/platform-express";
import { AddressModule } from "src/address/address.module";
import { AuthCompanyController } from "./auth-company.controller";
import { AuthCompanyService } from "./auth-company.service";
import { EmailModule } from "src/mailer/mailer.module";

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
  controllers: [AuthPersonController, AuthCompanyController],
  providers: [AuthPersonService, AuthCompanyService],
  exports: [AuthPersonService, AuthCompanyService],
})
export class AuthModule {}

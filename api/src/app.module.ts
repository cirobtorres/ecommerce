import { forwardRef, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { AddressModule } from "./address/address.module";
import { AvatarModule } from "./avatar/avatar.module";
import { SupabaseModule } from "./supabase/supabase.module";
import { EmailService } from "./mailer/mailer.provider";
import { EmailModule } from "./mailer/mailer.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
    }),
    SupabaseModule,
    EmailModule,
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
    forwardRef(() => AddressModule),
    forwardRef(() => AvatarModule),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

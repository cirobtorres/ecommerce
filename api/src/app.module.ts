import { forwardRef, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { AddressModule } from "./address/address.module";
import { AvatarModule } from "./avatar/avatar.module";
import { SupabaseModule } from "./supabase/supabase.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
    }),
    SupabaseModule,
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
    forwardRef(() => AddressModule),
    forwardRef(() => AvatarModule),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TokenPersonService } from "./token-person.service";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
    }),
    JwtModule.register({
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
    }),
  ],
  controllers: [],
  providers: [TokenPersonService],
  exports: [TokenPersonService],
})
export class TokenModule {}

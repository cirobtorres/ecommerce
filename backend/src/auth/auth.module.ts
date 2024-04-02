import { Module, forwardRef } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "../user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { UserEntity } from "../user/entity/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserPFEntity } from "../user/entity/pf.entity";
import { UserPJEntity } from "../user/entity/pj.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserPFEntity, UserPJEntity]),
    JwtModule.register({
      secret: String(process.env.JWT_SECRET_KEY),
    }),
    forwardRef(() => UserModule),
  ],
  exports: [AuthService],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

import { Module, forwardRef } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entity/user.entity";
import { AuthModule } from "../auth/auth.module";
import { UserPFEntity } from "./entity/pf.entity";
import { UserPJEntity } from "./entity/pj.entity";
import { AddressEntity } from "../address/entity/address.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AddressEntity,
      UserEntity,
      UserPFEntity,
      UserPJEntity,
    ]),
    forwardRef(() => AuthModule),
  ],
  exports: [UserService],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}

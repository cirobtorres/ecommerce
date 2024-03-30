import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AddressEntity } from "./entity/address.entity";
import { AddressService } from "./address.service";
import { AddressController } from "./address.controller";
import { AuthModule } from "../auth/auth.module";
import { UserModule } from "../user/user.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([AddressEntity]),
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
  ],
  exports: [AddressService],
  providers: [AddressService],
  controllers: [AddressController],
})
export class AddressModule {}

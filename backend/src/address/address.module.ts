import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AddressEntity } from "./entity/address.entity";
import { AddressService } from "./address.service";

@Module({
  imports: [TypeOrmModule.forFeature([AddressEntity])],
  exports: [AddressService],
  providers: [AddressService],
  controllers: [],
})
export class AddressModule {}

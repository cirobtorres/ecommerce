import { Module } from "@nestjs/common";
import { ManufacturerService } from "./manufacturer.service";
import { ManufacturerController } from "./manufacturer.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ManufacturerEntity } from "./entity/manufacturer.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ManufacturerEntity])],
  exports: [ManufacturerService],
  controllers: [ManufacturerController],
  providers: [ManufacturerService],
})
export class ManufacturerModule {}

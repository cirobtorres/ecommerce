import { Module } from "@nestjs/common";
import { UserPersonService } from "./user-person.service";

@Module({
  imports: [],
  controllers: [],
  providers: [UserPersonService],
  exports: [UserPersonService],
})
export class UserModule {}

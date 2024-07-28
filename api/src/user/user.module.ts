import { Module } from "@nestjs/common";
import { PersonService } from "./user-person.service";

@Module({
  imports: [],
  controllers: [],
  providers: [PersonService],
  exports: [PersonService],
})
export class UserModule {}

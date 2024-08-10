import { Module } from "@nestjs/common";
import { UserPersonService } from "./user-person.service";
import { UserCompanyService } from "./user-company.service";

@Module({
  imports: [],
  controllers: [],
  providers: [UserPersonService, UserCompanyService],
  exports: [UserPersonService, UserCompanyService],
})
export class UserModule {}

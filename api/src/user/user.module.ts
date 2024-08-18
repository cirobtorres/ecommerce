import { Module } from "@nestjs/common";
import { UserPersonService } from "./user-person.service";
import { UserCompanyService } from "./user-company.service";
import { UserService } from "./user.service";

@Module({
  imports: [],
  controllers: [],
  providers: [UserService, UserPersonService, UserCompanyService],
  exports: [UserService, UserPersonService, UserCompanyService],
})
export class UserModule {}

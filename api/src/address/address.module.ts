import { forwardRef, Module } from "@nestjs/common";
import { AddressPersonService } from "./address-person.service";
import { CompanyAddressService } from "./address-company.service";
import { UserModule } from "src/user/user.module";
import { SupabaseModule } from "src/supabase/supabase.module";

@Module({
  imports: [
    // SupabaseModule,
    forwardRef(() => UserModule),
  ],
  controllers: [],
  providers: [AddressPersonService, CompanyAddressService],
  exports: [AddressPersonService, CompanyAddressService],
})
export class AddressModule {}

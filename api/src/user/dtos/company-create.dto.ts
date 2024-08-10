import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { IsCNPJ } from "../../utils/custom-validation/cnpj.validation";
import { IsDate } from "../../utils/custom-validation/date.validation";
import { CreateUserDTO } from "./user-create.dto";
import { TaxInfo } from "../enums/tax-info.enum";

export class CreateCompanyDTO extends CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  legal_name: string;

  @IsNotEmpty()
  @IsString()
  brand_name: string;

  @IsNotEmpty()
  @IsString()
  @IsCNPJ()
  cnpj: string;

  @IsNotEmpty()
  @IsEnum(TaxInfo)
  tax_info: number;

  @IsNotEmpty()
  @IsString()
  ie?: string;

  @IsOptional()
  @IsString()
  im?: string;

  @IsNotEmpty()
  @IsString()
  @IsDate() // Custom validator! yyyy/mm/dd or yyyy-mm-dd
  establishment_at: string;
}

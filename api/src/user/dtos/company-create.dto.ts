import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { IsCNPJ } from "../../utils/custom-validation/cnpj.validation";
import { IsDate } from "../../utils/custom-validation/date.validation";

export class CreateCompanyDTO {
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
  @IsString()
  ie: string;

  @IsOptional()
  @IsString()
  im?: string;

  @IsNotEmpty()
  @IsString()
  @IsDate() // Custom validator! yyyy/mm/dd or yyyy-mm-dd
  establishment_at: string;
}

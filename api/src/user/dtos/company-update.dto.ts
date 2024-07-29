import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { IsCNPJ } from "../../utils/custom-validation/cnpj.validation";
import { IsDate } from "../../utils/custom-validation/date.validation";

export class UpdateCompanyDTO {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  legal_name?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  brand_name?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsCNPJ()
  cnpj?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  ie?: string;

  @IsOptional()
  @IsString()
  im?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsDate() // Custom validator! yyyy/mm/dd or yyyy-mm-dd
  establishment_at?: string;
}

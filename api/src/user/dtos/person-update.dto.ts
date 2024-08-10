import { IsEnum, IsOptional, IsString } from "class-validator";
import { IsDate } from "../../utils/custom-validation/date.validation";
import { IsCPF } from "../../utils/custom-validation/cpf.validation";
import { IsPhone } from "../../utils/custom-validation/phone.validation";
import { Gender } from "../enums/gender.enum";

export class UpdateUserDTO {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  @IsCPF()
  cpf?: string;

  @IsOptional()
  @IsEnum(Gender)
  gender?: string;

  @IsOptional()
  @IsString()
  rg?: string;

  @IsOptional()
  @IsString()
  @IsPhone()
  phone?: string;

  @IsOptional()
  @IsString()
  @IsDate() // Custom validator! dd/MM/yyyy dd-MM-yyyy dd.MM.yyyy
  birth_date?: string;
}

import { IsEnum, IsOptional, IsString } from "class-validator";
import { IsDate } from "src/utils/validators/date.validator";
import { IsCPF } from "src/utils/validators/documents.validator";
import { IsPhone } from "src/utils/validators/phone.validator";
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

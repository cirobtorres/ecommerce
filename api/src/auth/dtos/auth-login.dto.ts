import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from "class-validator";
import { IsCPF } from "src/utils/custom-validation/cpf.validation";
import { IsCNPJ } from "src/utils/custom-validation/cnpj.validation";

export class AuthLoginDTO {
  @IsOptional()
  @IsString()
  @IsCPF()
  cpf?: string;

  @IsOptional()
  @IsString()
  @IsCNPJ()
  cnpj?: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password?: string;
}

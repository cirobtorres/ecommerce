import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsStrongPassword,
} from "class-validator";
import { Privileges } from "../enum/privilege.enum";

export class CreateUserDTO {
  @IsString()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsDateString()
  @IsOptional()
  birthAt?: string;

  @IsString()
  cpf: string;

  @IsString()
  phone: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;

  @IsBoolean()
  privacyPolicy: boolean;

  @IsBoolean()
  active?: boolean;

  @IsEnum(Privileges)
  privileges?: number;
}

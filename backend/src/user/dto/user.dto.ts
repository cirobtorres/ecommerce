import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsJSON,
  IsNumber,
  IsString,
  IsStrongPassword,
} from "class-validator";
import { Privileges } from "../enum/privilege.enum";

export class UserDTO {
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

  @IsJSON()
  PF?: {
    firstName: string;
    lastName: string;
    cpf: string;
    rg?: string;
    birthAt: string;
  };

  @IsJSON()
  PJ?: {
    legalName: string;
    brandName: string;
    cnpj: string;
    ie: string;
    im: string;
    establishmentAt: string;
  };
}

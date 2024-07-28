import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from "class-validator";
import { IsPhone } from "../../utils/validators/phone.validator";
import { IsCPF } from "src/utils/validators/documents.validator";
import { IsDate } from "../../utils/validators/date.validator";
import { Gender } from "../enums/gender.enum";

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsPhone()
  phone: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsCPF()
  cpf: string;

  @IsOptional()
  @IsEnum(Gender)
  gender?: string;

  @IsOptional()
  @IsString()
  rg?: string;

  @IsNotEmpty()
  @IsString()
  @IsDate() // Custom validator! yyyy/mm/dd or yyyy-mm-dd
  birth_date?: string;
}

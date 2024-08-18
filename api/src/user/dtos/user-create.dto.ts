import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from "class-validator";
import { IsPhone } from "../../utils/custom-validation/phone.validation";
import { UserType } from "../enums/user-types.enum";

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
  @IsEnum(UserType)
  user_type: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsBoolean()
  allow_email_newsletter?: boolean; // default = false

  @IsNotEmpty()
  @IsBoolean()
  agreed_data_policies?: boolean; // default = true
}

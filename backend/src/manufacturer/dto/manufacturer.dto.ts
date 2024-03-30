import { IsEmail, IsString } from "class-validator";

export class ManufacturerDTO {
  @IsString()
  brandName: string;

  @IsString()
  legalName: string;

  @IsString()
  cnpj: string;

  @IsString()
  ie: string;

  @IsString()
  im: string;

  @IsString()
  phone: string;

  @IsString()
  @IsEmail()
  email: string;
}

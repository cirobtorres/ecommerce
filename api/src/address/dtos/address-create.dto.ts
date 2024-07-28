import { IsBoolean, IsEnum, IsOptional, IsString } from "class-validator";
import { IsCEP } from "src/utils/validators/cep.validator";
import { UF } from "../enums/uf";

export class CreateAddressDTO {
  @IsString()
  street: string;

  @IsString()
  number: string;

  @IsString()
  district: string;

  @IsString()
  city: string;

  @IsEnum(UF)
  @IsString()
  uf: string;

  @IsString()
  @IsCEP()
  zip_code: string;

  @IsOptional()
  @IsString()
  place?: string;

  @IsOptional()
  @IsBoolean()
  is_default?: boolean;
}

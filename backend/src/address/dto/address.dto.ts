import { IsBoolean, IsNumber, IsString } from "class-validator";

export class AddressDTO {
  @IsString()
  street: string;

  @IsNumber()
  number: number;

  @IsString()
  neighborhood: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  zipCode: string; // CEP

  @IsString()
  place: string; // Complemento

  @IsNumber()
  userId: number;

  @IsBoolean()
  defaultAddress: boolean;
}

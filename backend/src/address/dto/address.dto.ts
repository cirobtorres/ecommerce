import { IsNumber, IsString } from "class-validator";

export class AddressDTO {
  @IsString()
  street: string;

  @IsString()
  number: string;

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
  user: number;
}

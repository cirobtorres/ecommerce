import { IsBoolean, IsNumber, IsString } from "class-validator";
import { UserEntity } from "../../user/entity/user.entity";

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
  user: UserEntity;

  @IsBoolean()
  defaultAddress: boolean;
}

import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { IsCPF } from "../../utils/custom-validation/cpf.validation";
import { IsDate } from "../../utils/custom-validation/date.validation";
import { Gender } from "../enums/gender.enum";
import { CreateUserDTO } from "./user-create.dto";

export class CreatePersonDTO extends CreateUserDTO {
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

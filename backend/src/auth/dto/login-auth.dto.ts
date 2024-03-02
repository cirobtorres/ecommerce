import { IsString, IsStrongPassword } from "class-validator";
import { RegisterAuthDTO } from "./register-auth.dto";

// export class AuthLoginDTO extends RegisterAuthDTO {}
export class AuthLoginDTO {
  @IsString()
  login: string;

  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;
}

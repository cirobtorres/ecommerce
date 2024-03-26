import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { UserService } from "../user/user.service";
import { IdentifyCPF } from "../utils/cpf";
import { Repository } from "typeorm";
import { UserEntity } from "../user/entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    try {
      const data = this.authService.checkToken(
        (authorization ?? "").split(" ")[1]
      );
      request.payload = data;
      request.user = await this.userService.retrieve(data.sub);
      return true;
    } catch (error) {
      return false;
    }
  }
}

@Injectable()
export class RegisterGuard implements CanActivate {
  constructor(
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const cpf = new IdentifyCPF(request.body.cpf);
    if (cpf.isValid) {
      if (!(await this.userRepository.findOneBy({ cpf: cpf.CPF }))) return true;
      throw new HttpException(
        "Forbidden: CPF já cadastrado",
        HttpStatus.FORBIDDEN
      );
    }
    throw new HttpException(
      "Unauthorized: CPF inválido",
      HttpStatus.UNAUTHORIZED
    );
  }
}

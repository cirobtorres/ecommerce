import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthService } from "../auth.service";
import { UserService } from "../../user/user.service";
import { IdentifyCPF } from "../../utils/cpf";
import { Repository } from "typeorm";
import { UserEntity } from "../../user/entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UserPFEntity } from "../../user/entity/pf.entity";
import { UserPJEntity } from "../../user/entity/pj.entity";

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
export class CPFGuard implements CanActivate {
  constructor(
    // @InjectRepository(UserEntity)
    // private userRepository: Repository<UserEntity>,
    @InjectRepository(UserPFEntity)
    private userPFRepository: Repository<UserPFEntity>,
    @InjectRepository(UserPJEntity)
    private userPJRepository: Repository<UserPJEntity>
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if (request.body.PF) {
      const cpf = new IdentifyCPF(request.body.PF.cpf);
      if (cpf.isValid) {
        if (!(await this.userPFRepository.findOneBy({ cpf: cpf.CPF })))
          return true;
        throw new HttpException(
          "Forbidden: CPF já cadastrado",
          HttpStatus.FORBIDDEN
        );
      }
    } else if (request.body.PJ) {
      const cnpj = request.body.PJ.cnpj;
      if (cnpj) {
        if (!(await this.userPJRepository.findOneBy({ cnpj }))) return true;
        throw new HttpException(
          "Forbidden: CNPJ já cadastrado",
          HttpStatus.FORBIDDEN
        );
      }
    } else {
      throw new HttpException(
        "Forbidden: user is neither PF nor PJ",
        HttpStatus.FORBIDDEN
      );
    }
    throw new HttpException(
      "Unauthorized: CPF inválido",
      HttpStatus.UNAUTHORIZED
    );
  }
}

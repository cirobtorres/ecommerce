import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { TokenPersonService } from "src/token/token-person.service";
import { PersonService } from "../../user/user-person.service";

@Injectable()
export class AuthPersonGuard implements CanActivate {
  constructor(
    private readonly tokenPersonService: TokenPersonService,
    private readonly userPersonService: PersonService
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    const data = this.tokenPersonService.verifyToken(
      (authorization ?? "").split(" ")[1] // "bearer token"
    );
    request.payload = data;
    request.user = await this.userPersonService.retrieveById(data.sub);
    delete request.user.password;
    return true;
  }
  catch(error: any) {
    return false;
  }
}

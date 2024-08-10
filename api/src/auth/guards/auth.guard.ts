import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { UserPersonService } from "../../user/user-person.service";

@Injectable()
export class AuthPersonGuard implements CanActivate {
  constructor(private readonly userPersonService: UserPersonService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    // Query
    return true;
  }
  catch(error: any) {
    return false;
  }
}

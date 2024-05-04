import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthService } from "../../auth/auth.service";
import { AddressService } from "../address.service";

@Injectable()
export class ReadAddressGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    // Validates if user is really him by evaluating user id from token authorization and user id from params
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    try {
      const data = this.authService.checkToken(
        (authorization ?? "").split(" ")[1]
      );
      if (
        data.sub === Number(request.params.userId) && // This userId is an URL param, not the user id attribute!!
        data.aud === "1" &&
        data.iss === "login"
      ) {
        // data.sub = user id from token
        // request.params.user = user id from params
        return true;
      }
    } catch (error) {
      return false;
    }
  }
}

@Injectable()
export class CreateAddressGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly addressService: AddressService
  ) {}

  async canActivate(context: ExecutionContext) {
    // Validates if user is really him by evaluating user id from token authorization and user id from body
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    try {
      const data = this.authService.checkToken(
        (authorization ?? "").split(" ")[1]
      );
      const userAddressesCount = await this.addressService.listCount(data.sub);
      if (data.sub === request.body.user.id && userAddressesCount < 5) {
        // data.sub = user id from token
        // request.body.user = user id from body
        // userAddressesCount = maximum user addresses allowed (5)
        return true;
      }
    } catch (error) {
      return false;
    }
  }
}

@Injectable()
export class UpdateAddressGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    // Validates if user is really him by evaluating user id from token authorization and user id from body
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    try {
      const data = this.authService.checkToken(
        (authorization ?? "").split(" ")[1]
      );
      if (data.sub === request.body.user.id) return true;
    } catch (error) {
      // data.sub = user id from token
      // request.params.user = user id from params
      return false;
    }
  }
}

@Injectable()
export class DeleteAddressGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    // Validates if user is really him by evaluating user id from token authorization and user id from params
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    try {
      const data = this.authService.checkToken(
        (authorization ?? "").split(" ")[1]
      );
      if (data.sub === Number(request.params.id)) {
        // data.sub = user id from token
        // request.params.id = user id from params
        return true;
      }
    } catch (error) {
      return false;
    }
    return false;
  }
}

import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class TokenCompanyService {
  constructor(private readonly companyJWTService: JwtService) {}

  signToken() {}

  verifyToken() {}

  isValid() {}
}

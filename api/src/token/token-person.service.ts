import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class TokenPersonService {
  constructor(private readonly personJWTService: JwtService) {}

  signToken(payload: string) {
    // For payload, user id only
    return {
      accessToken: this.personJWTService.sign(
        {
          sub: payload,
        },
        {
          expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
          issuer: "/api/auth/person/login",
          audience: "refrigel-login",
        }
      ),
      refreshToken: this.personJWTService.sign(
        {
          sub: payload,
        },
        {
          secret: process.env.JWT_REFRESH_TOKEN_SECRET,
          expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
          issuer: "/api/auth/person/refresh",
          audience: "refrigel-refresh",
        }
      ),
    };
  }

  async validateRefreshToken(refreshToken: string) {
    try {
      const decoded = this.personJWTService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      });
      return decoded;
    } catch (error) {
      return null;
    }
  }

  verifyToken(token: string) {
    try {
      const payload = this.personJWTService.verify(token, {
        issuer: "/api/auth/person/login", // Who created
        audience: "refrigel-login",
      });
      return payload;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  isValid() {}
}

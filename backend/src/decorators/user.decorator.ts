import {
  ExecutionContext,
  NotFoundException,
  createParamDecorator,
} from "@nestjs/common";

export const User = createParamDecorator(
  (filter: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if (request.user) {
      if (filter) return request.user[filter];
      delete request.user.password;
      delete request.user.createdAt;
      delete request.user.updatedAt;
      delete request.user.privacyPolicy;
      return request.user;
    } else {
      throw new NotFoundException("Usuário não encontrado");
    }
  }
);

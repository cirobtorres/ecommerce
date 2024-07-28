import {
  ExecutionContext,
  NotFoundException,
  createParamDecorator,
} from "@nestjs/common";

export const UserPersonGuard = createParamDecorator(
  (filter: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if (request.user) {
      return request.user;
    } else {
      throw new NotFoundException(
        "User not found. AuthGuard is needed to extract user from payload"
      );
    }
  }
);

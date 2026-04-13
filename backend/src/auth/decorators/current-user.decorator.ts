import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { JwtPayload } from 'src/auth/types/jwt-payload.type';

type AuthenticatedRequest = Request & {
  user?: JwtPayload;
};

export const CurrentUser = createParamDecorator(
  (data: keyof JwtPayload | undefined, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<AuthenticatedRequest>();
    const user = req.user;

    return data ? user?.[data] : user;
  }
);

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthRequest } from './custom.request';

export const IdentityProviderId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: AuthRequest = ctx.switchToHttp().getRequest();
    return request.user.sub;
  },
);

import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtPayload, decode } from 'jsonwebtoken';
import { AuthRequest } from './custom.request';
import { IdentityProviderInterface } from '../../domain/user/repository/identity-provider.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject('IdentityProviderInterface')
    private readonly identityProvider: IdentityProviderInterface,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request: AuthRequest = context.switchToHttp().getRequest();
      const accessToken = request.headers['accesstoken'] as string;
      if (!accessToken) {
        return false;
      }
      const isValid = await this.identityProvider.validateToken(accessToken);
      if (!isValid) {
        return false;
      }
      const decodedToken = decode(accessToken) as JwtPayload;
      const sub = decodedToken.sub;
      request.user = { sub };
      return true;
    } catch (error) {
      return false;
    }
  }
}

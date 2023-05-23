import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { JwtPayload, decode } from 'jsonwebtoken'
import { AuthRequest } from './custom.request'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {

      const request: AuthRequest = context.switchToHttp().getRequest()
      const accessToken = request.headers['accesstoken'] as string
      if (!accessToken) {
        return false 
      }
      const decodedToken = decode(accessToken) as JwtPayload
      const sub = decodedToken.sub
      request.user = { sub } 
      return true
    } catch (error) {
      return false
    }
  }
}

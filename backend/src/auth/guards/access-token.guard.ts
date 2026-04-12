import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JwtPayload } from 'src/auth/types/jwt-payload.type';

type AuthenticatedRequest = Request & {
  user?: JwtPayload;
};

@Injectable()
export class AccessTokenGuard implements CanActivate {
  private readonly accessSecret: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.accessSecret = this.configService.getOrThrow<string>(
      'ACCESS_TOKEN_SECRET',
    );
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<AuthenticatedRequest>();

    const cookieToken = req.cookies?.accessToken as string | undefined;

    if (!cookieToken) {
      throw new UnauthorizedException('Invalid token');
    }

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(
        cookieToken,
        {
          secret: this.accessSecret,
        },
      );

      req.user = payload;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}

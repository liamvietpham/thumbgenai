import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { LoginDto } from 'src/auth/dto/login.dto';
import type { Response, Request } from 'express';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto, @Res({ passthrough: true }) res: Response) {
    const result = await this.authService.register(registerDto);
    const { user } = result;

    this.setAuthCookies(res, result, true);

    return { user };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const result = await this.authService.login(loginDto);
    const { user } = result;

    this.setAuthCookies(res, result, loginDto.remember ?? true);

    return { user };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Res({ passthrough: true }) res: Response, @Req() req: Request) {
    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'prod',
      sameSite: 'strict'
    });
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'prod',
      sameSite: 'strict',
      path: '/auth'
    });

    const refreshToken = req.cookies?.refreshToken as string | undefined;
    await this.authService.logout(refreshToken);

    return {
      message: 'Logged out successfully'
    };
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Res({ passthrough: true }) res: Response, @Req() req: Request) {
    const refreshToken = req.cookies?.refreshToken as string | undefined;
    const result = await this.authService.refresh(refreshToken);
    const {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      accessTokenMaxAgeMs,
      refreshTokenMaxAgeMs
    } = result;

    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'prod',
      sameSite: 'strict',
      maxAge: accessTokenMaxAgeMs
    });

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'prod',
      sameSite: 'strict',
      maxAge: refreshTokenMaxAgeMs,
      path: '/auth'
    });

    return {
      message: 'Refresh successful'
    };
  }

  @Get('me')
  @UseGuards(AccessTokenGuard)
  me(@CurrentUser('sub') userId: string) {
    return this.authService.me(userId);
  }

  private setAuthCookies(
    res: Response,
    result: Awaited<ReturnType<AuthService['login']>>,
    remember: boolean
  ) {
    const baseCookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'prod',
      sameSite: 'strict' as const
    };

    const accessCookieOptions = remember
      ? {
          ...baseCookieOptions,
          maxAge: result.accessTokenMaxAgeMs
        }
      : baseCookieOptions;

    const refreshCookieOptions = remember
      ? {
          ...baseCookieOptions,
          maxAge: result.refreshTokenMaxAgeMs,
          path: '/auth'
        }
      : {
          ...baseCookieOptions,
          path: '/auth'
        };

    res.cookie('accessToken', result.accessToken, accessCookieOptions);
    res.cookie('refreshToken', result.refreshToken, refreshCookieOptions);
  }
}

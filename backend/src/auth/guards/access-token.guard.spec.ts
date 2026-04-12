import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenGuard } from './access-token.guard';
import { JwtPayload } from 'src/auth/types/jwt-payload.type';

type AuthenticatedRequest = {
  cookies?: {
    accessToken?: string;
  };
  user?: JwtPayload;
};

describe('AccessTokenGuard', () => {
  let guard: AccessTokenGuard;
  let jwtService: JwtService;
  let verifyAsyncSpy: jest.SpiedFunction<JwtService['verifyAsync']>;

  beforeEach(() => {
    jwtService = new JwtService();
    verifyAsyncSpy = jest.spyOn(jwtService, 'verifyAsync');

    const configService = {
      getOrThrow: jest.fn().mockReturnValue('test-access-secret'),
    } as unknown as ConfigService;

    guard = new AccessTokenGuard(jwtService, configService);
  });

  const buildContext = (request: AuthenticatedRequest) =>
    ({
      switchToHttp: () => ({
        getRequest: () => request,
      }),
    }) as ExecutionContext;

  it('attaches the decoded JWT payload to the request when the cookie is valid', async () => {
    const request: AuthenticatedRequest = {
      cookies: {
        accessToken: 'valid-token',
      },
    };
    const payload = {
      sub: 'user-1',
      email: 'john@example.com',
      sid: 'session-1',
      type: 'access' as const,
    };

    verifyAsyncSpy.mockResolvedValue(payload);

    await expect(guard.canActivate(buildContext(request))).resolves.toBe(true);
    expect(verifyAsyncSpy).toHaveBeenCalledWith('valid-token', {
      secret: 'test-access-secret',
    });
    expect(request.user).toEqual(payload);
  });

  it('rejects requests when the access token cookie is missing', async () => {
    await expect(
      guard.canActivate(buildContext({ cookies: {} })),
    ).rejects.toThrow(UnauthorizedException);
    expect(verifyAsyncSpy).not.toHaveBeenCalled();
  });

  it('rejects requests when JWT verification fails', async () => {
    verifyAsyncSpy.mockRejectedValue(new Error('invalid'));

    await expect(
      guard.canActivate(
        buildContext({
          cookies: {
            accessToken: 'invalid-token',
          },
        }),
      ),
    ).rejects.toThrow(UnauthorizedException);
  });
});

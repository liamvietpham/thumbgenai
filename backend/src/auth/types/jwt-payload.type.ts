export type JwtTokenType = 'access' | 'refresh';

export type JwtPayload = {
  sub: string;
  email: string;
  sid: string;
  type: JwtTokenType;
};

export type AccessTokenPayload = JwtPayload & {
  type: 'access';
};

export type RefreshTokenPayload = JwtPayload & {
  type: 'refresh';
};

export type JwtExpPayload = {
  exp: number;
};

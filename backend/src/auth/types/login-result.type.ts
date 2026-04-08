import { PublicUser } from 'src/users/mappers/user.mapper';

export type LoginResult = {
  accessToken: string;
  refreshToken: string;
  accessTokenMaxAgeMs: number;
  refreshTokenMaxAgeMs: number;
  user: PublicUser;
};

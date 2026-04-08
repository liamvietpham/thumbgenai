export type CreateSession = {
  sid: string;
  userId: string;
  refreshToken: string;
  expiresAt: string;
  ttl: number;
};

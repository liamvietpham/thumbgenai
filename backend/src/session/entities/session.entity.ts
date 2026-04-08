export type SessionEntity = {
  id: string;
  userId: string;
  refreshToken: string;
  ttl: number;
  revokedAt?: string;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
};

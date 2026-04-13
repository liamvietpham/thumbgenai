import { UserEntity } from 'src/users/entities/user.entity';

export type PublicUser = Omit<UserEntity, 'password'>;

export function mapUserToPublicUser(user: UserEntity): PublicUser {
  const { id, name, email, credits, createdAt, updatedAt, lastLoginAt, pwdUpdatedAt } = user;

  return {
    id,
    name,
    email,
    credits,
    createdAt,
    updatedAt,
    lastLoginAt,
    pwdUpdatedAt
  };
}

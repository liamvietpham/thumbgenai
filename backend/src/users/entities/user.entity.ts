export type UserEntity = {
  id: string;
  name: string;
  email: string;
  password: string;
  credits: number;
  createdAt?: string;
  updatedAt?: string;
  lastLoginAt?: string;
  pwdUpdatedAt?: string;
};

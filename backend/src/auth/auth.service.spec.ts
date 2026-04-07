import { BadRequestException, ConflictException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersRepository } from 'src/users/users.repository';

type MockUsersRepository = {
  findByEmail: jest.MockedFunction<UsersRepository['findByEmail']>;
  createUser: jest.MockedFunction<UsersRepository['createUser']>;
};

describe('AuthService', () => {
  let service: AuthService;
  let usersRepository: MockUsersRepository;

  beforeEach(() => {
    usersRepository = {
      findByEmail: jest.fn(),
      createUser: jest.fn(),
    };

    service = new AuthService(usersRepository as unknown as UsersRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('throws BadRequestException when password confirmation does not match', async () => {
    await expect(
      service.register({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password-123',
        confirmPassword: 'password-456',
      }),
    ).rejects.toBeInstanceOf(BadRequestException);

    expect(usersRepository.findByEmail).not.toHaveBeenCalled();
    expect(usersRepository.createUser).not.toHaveBeenCalled();
  });

  it('throws ConflictException when user already exists', async () => {
    usersRepository.findByEmail.mockResolvedValue({
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com',
      password: 'hashed-password',
      credits: 15,
    });

    await expect(
      service.register({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password-123',
        confirmPassword: 'password-123',
      }),
    ).rejects.toBeInstanceOf(ConflictException);

    expect(usersRepository.findByEmail).toHaveBeenCalledWith(
      'john@example.com',
    );
    expect(usersRepository.createUser).not.toHaveBeenCalled();
  });

  it('hashes password, creates user, and returns public user payload', async () => {
    usersRepository.findByEmail.mockResolvedValue(null);
    let capturedCreateUserPayload:
      | Parameters<UsersRepository['createUser']>[0]
      | undefined;

    usersRepository.createUser.mockImplementation((input) => {
      capturedCreateUserPayload = input;

      return Promise.resolve({
        id: 'user-2',
        name: input.name,
        email: input.email,
        password: input.password,
        credits: 15,
        createdAt: '2026-04-07T00:00:00.000Z',
        updatedAt: '2026-04-07T00:00:00.000Z',
        pwdUpdatedAt: '2026-04-07T00:00:00.000Z',
      });
    });

    const result = await service.register({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password-123',
      confirmPassword: 'password-123',
    });

    expect(usersRepository.findByEmail).toHaveBeenCalledWith(
      'john@example.com',
    );
    expect(usersRepository.createUser).toHaveBeenCalledTimes(1);
    expect(usersRepository.createUser).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'John Doe',
        email: 'john@example.com',
      }),
    );
    if (!capturedCreateUserPayload) {
      throw new Error('Expected createUser payload');
    }

    expect(capturedCreateUserPayload.password).not.toBe('password-123');
    expect(typeof capturedCreateUserPayload.password).toBe('string');

    expect(result).toEqual({
      id: 'user-2',
      name: 'John Doe',
      email: 'john@example.com',
      credits: 15,
      createdAt: '2026-04-07T00:00:00.000Z',
      updatedAt: '2026-04-07T00:00:00.000Z',
      pwdUpdatedAt: '2026-04-07T00:00:00.000Z',
    });
    expect(result).not.toHaveProperty('password');
  });
});

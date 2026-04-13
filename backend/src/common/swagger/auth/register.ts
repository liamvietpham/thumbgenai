import type { OpenAPIObject } from '@nestjs/swagger';
import {
  buildErrorExamples,
  buildSuccessSchemaWithDataRef,
  ensureCommonSchemas,
  PUBLIC_USER_SCHEMA
} from 'src/common/swagger/shared';

export function patchAuthRegisterOpenApi(document: OpenAPIObject): void {
  ensureCommonSchemas(document);

  const registerOperation = document.paths?.['/auth/register']?.post;

  if (!registerOperation) return;

  registerOperation.tags ??= ['Auth'];
  registerOperation.summary ??= 'Register new user';
  registerOperation.description ??=
    'Create a new user account with normalized email and hashed password.';

  registerOperation.responses = {
    ...registerOperation.responses,
    '201': {
      description: 'User registered successfully',
      content: {
        'application/json': {
          schema: buildSuccessSchemaWithDataRef(PUBLIC_USER_SCHEMA),
          example: {
            success: true,
            statusCode: 201,
            data: {
              id: '01961a12-3f2d-73b4-8ea4-2d68f2fd0f8d',
              name: 'John Doe',
              email: 'john@example.com',
              credits: 15,
              createdAt: '2026-04-08T00:00:00.000Z',
              updatedAt: '2026-04-08T00:00:00.000Z',
              pwdUpdatedAt: '2026-04-08T00:00:00.000Z'
            }
          }
        }
      }
    },
    '400': {
      description: 'Bad Request',
      content: buildErrorExamples({
        validationError: {
          summary: 'DTO validation failed',
          value: {
            success: false,
            statusCode: 400,
            message: ['email must be an email'],
            timestamp: '2026-04-08T00:00:00.000Z',
            path: '/auth/register'
          }
        },
        passwordMismatch: {
          summary: 'Password confirmation mismatch',
          value: {
            success: false,
            statusCode: 400,
            message: 'Password confirmation does not match',
            timestamp: '2026-04-08T00:00:00.000Z',
            path: '/auth/register'
          }
        }
      })
    },
    '409': {
      description: 'Conflict',
      content: buildErrorExamples({
        userAlreadyExists: {
          summary: 'Email already exists',
          value: {
            success: false,
            statusCode: 409,
            message: 'User already exists',
            timestamp: '2026-04-08T00:00:00.000Z',
            path: '/auth/register'
          }
        }
      })
    },
    '500': {
      description: 'Internal Server Error',
      content: buildErrorExamples({
        internalServerError: {
          summary: 'Unexpected server error',
          value: {
            success: false,
            statusCode: 500,
            message: 'Internal server error',
            timestamp: '2026-04-08T00:00:00.000Z',
            path: '/auth/register'
          }
        }
      })
    }
  };
}

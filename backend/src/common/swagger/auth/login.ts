import type { OpenAPIObject } from '@nestjs/swagger';
import {
  buildErrorExamples,
  buildSuccessSchemaWithDataRef,
  ensureCommonSchemas,
  PUBLIC_USER_SCHEMA
} from 'src/common/swagger/shared';
const LOGIN_DATA_SCHEMA = '#/components/schemas/LoginData';

export function patchAuthLoginOpenApi(document: OpenAPIObject): void {
  ensureCommonSchemas(document);
  document.components ??= {};
  document.components.schemas ??= {};
  document.components.schemas.LoginData ??= {
    type: 'object',
    required: ['user'],
    properties: {
      user: { $ref: PUBLIC_USER_SCHEMA }
    }
  };

  const loginOperation = document.paths?.['/auth/login']?.post;

  if (!loginOperation) return;

  loginOperation.tags ??= ['Auth'];
  loginOperation.summary ??= 'Login';
  loginOperation.description ??=
    'Authenticate user credentials and set access/refresh tokens in HttpOnly cookies.';

  loginOperation.responses = {
    ...loginOperation.responses,
    '200': {
      description: 'Login successful',
      headers: {
        'Set-Cookie': {
          description: 'HttpOnly cookies for accessToken and refreshToken are returned.',
          schema: { type: 'string' }
        }
      },
      content: {
        'application/json': {
          schema: buildSuccessSchemaWithDataRef(LOGIN_DATA_SCHEMA),
          example: {
            success: true,
            statusCode: 200,
            data: {
              user: {
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
            path: '/auth/login'
          }
        }
      })
    },
    '401': {
      description: 'Unauthorized',
      content: buildErrorExamples({
        invalidCredentials: {
          summary: 'Email or password is invalid',
          value: {
            success: false,
            statusCode: 401,
            message: 'Invalid credentials',
            timestamp: '2026-04-08T00:00:00.000Z',
            path: '/auth/login'
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
            path: '/auth/login'
          }
        }
      })
    }
  };
}

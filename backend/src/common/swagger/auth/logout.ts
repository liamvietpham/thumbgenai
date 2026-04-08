import type { OpenAPIObject } from '@nestjs/swagger';
import {
  buildErrorExamples,
  buildSuccessSchemaWithDataRef,
  ensureCommonSchemas,
} from 'src/common/swagger/shared';

const LOGOUT_DATA_SCHEMA = '#/components/schemas/LogoutData';

export function patchAuthLogoutOpenApi(document: OpenAPIObject): void {
  ensureCommonSchemas(document);
  document.components ??= {};
  document.components.schemas ??= {};
  document.components.schemas.LogoutData ??= {
    type: 'object',
    required: ['message'],
    properties: {
      message: {
        type: 'string',
        example: 'Logged out successfully',
      },
    },
  };

  const logoutOperation = document.paths?.['/auth/logout']?.post;

  if (!logoutOperation) return;

  logoutOperation.tags ??= ['Auth'];
  logoutOperation.summary ??= 'Logout';
  logoutOperation.description ??=
    'Clear auth cookies and revoke the current refresh-token-backed session.';

  logoutOperation.responses = {
    ...logoutOperation.responses,
    '200': {
      description: 'Logout successful',
      headers: {
        'Set-Cookie': {
          description:
            'Expired accessToken and refreshToken cookies are returned.',
          schema: { type: 'string' },
        },
      },
      content: {
        'application/json': {
          schema: buildSuccessSchemaWithDataRef(LOGOUT_DATA_SCHEMA),
          example: {
            success: true,
            statusCode: 200,
            data: {
              message: 'Logged out successfully',
            },
          },
        },
      },
    },
    '400': {
      description: 'Bad Request',
      content: buildErrorExamples({
        missingRefreshToken: {
          summary: 'Refresh token cookie is missing',
          value: {
            success: false,
            statusCode: 400,
            message: 'Refresh token is required',
            timestamp: '2026-04-08T00:00:00.000Z',
            path: '/auth/logout',
          },
        },
      }),
    },
    '401': {
      description: 'Unauthorized',
      content: buildErrorExamples({
        invalidRefreshToken: {
          summary: 'Refresh token is invalid or expired',
          value: {
            success: false,
            statusCode: 401,
            message: 'Invalid refresh token',
            timestamp: '2026-04-08T00:00:00.000Z',
            path: '/auth/logout',
          },
        },
      }),
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
            path: '/auth/logout',
          },
        },
      }),
    },
  };
}

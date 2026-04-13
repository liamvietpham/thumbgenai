import type { OpenAPIObject } from '@nestjs/swagger';
import {
  buildErrorExamples,
  buildSuccessSchemaWithDataRef,
  ensureCommonSchemas
} from 'src/common/swagger/shared';

const REFRESH_DATA_SCHEMA = '#/components/schemas/RefreshData';

export function patchAuthRefreshOpenApi(document: OpenAPIObject): void {
  ensureCommonSchemas(document);
  document.components ??= {};
  document.components.schemas ??= {};
  document.components.schemas.RefreshData ??= {
    type: 'object',
    required: ['message'],
    properties: {
      message: {
        type: 'string',
        example: 'Refresh successful'
      }
    }
  };

  const refreshOperation = document.paths?.['/auth/refresh']?.post;

  if (!refreshOperation) return;

  refreshOperation.tags ??= ['Auth'];
  refreshOperation.summary ??= 'Refresh tokens';
  refreshOperation.description ??=
    'Rotate the refresh token from HttpOnly cookies and issue a new access token.';

  refreshOperation.responses = {
    ...refreshOperation.responses,
    '200': {
      description: 'Refresh successful',
      headers: {
        'Set-Cookie': {
          description:
            'HttpOnly cookies for the rotated accessToken and refreshToken are returned.',
          schema: { type: 'string' }
        }
      },
      content: {
        'application/json': {
          schema: buildSuccessSchemaWithDataRef(REFRESH_DATA_SCHEMA),
          example: {
            success: true,
            statusCode: 200,
            data: {
              message: 'Refresh successful'
            }
          }
        }
      }
    },
    '401': {
      description: 'Unauthorized',
      content: buildErrorExamples({
        invalidRefreshToken: {
          summary: 'Refresh token is invalid, expired, or already rotated',
          value: {
            success: false,
            statusCode: 401,
            message: 'Invalid refresh token',
            timestamp: '2026-04-09T00:00:00.000Z',
            path: '/auth/refresh'
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
            timestamp: '2026-04-09T00:00:00.000Z',
            path: '/auth/refresh'
          }
        }
      })
    }
  };
}

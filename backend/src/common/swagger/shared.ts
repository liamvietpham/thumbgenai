import type { OpenAPIObject } from '@nestjs/swagger';

export const SUCCESS_RESPONSE_SCHEMA = '#/components/schemas/SuccessResponse';
export const ERROR_RESPONSE_SCHEMA = '#/components/schemas/ErrorResponse';
export const PUBLIC_USER_SCHEMA = '#/components/schemas/PublicUser';

type ExampleValue = Record<string, unknown>;
type OpenApiSchema = Record<string, unknown>;

export function ensureCommonSchemas(document: OpenAPIObject): void {
  document.components ??= {};
  document.components.schemas ??= {};

  document.components.schemas.SuccessResponse ??= {
    type: 'object',
    required: ['success', 'statusCode', 'data'],
    properties: {
      success: { type: 'boolean', example: true },
      statusCode: { type: 'integer', example: 200 },
      data: { type: 'object', additionalProperties: true },
    },
  };

  document.components.schemas.ErrorResponse ??= {
    type: 'object',
    required: ['success', 'statusCode', 'message', 'timestamp', 'path'],
    properties: {
      success: { type: 'boolean', example: false },
      statusCode: { type: 'integer', example: 400 },
      message: {
        oneOf: [
          { type: 'string', example: 'Invalid request payload' },
          {
            type: 'array',
            items: { type: 'string' },
            example: ['email must be an email', 'password should not be empty'],
          },
        ],
      },
      timestamp: {
        type: 'string',
        format: 'date-time',
        example: '2026-04-08T00:00:00.000Z',
      },
      path: { type: 'string', example: '/auth/login' },
    },
  };

  document.components.schemas.PublicUser ??= {
    type: 'object',
    required: ['id', 'name', 'email', 'credits'],
    properties: {
      id: { type: 'string', example: '01961a12-3f2d-73b4-8ea4-2d68f2fd0f8d' },
      name: { type: 'string', example: 'John Doe' },
      email: { type: 'string', format: 'email', example: 'john@example.com' },
      credits: { type: 'integer', example: 15 },
      createdAt: {
        type: 'string',
        format: 'date-time',
        example: '2026-04-08T00:00:00.000Z',
      },
      updatedAt: {
        type: 'string',
        format: 'date-time',
        example: '2026-04-08T00:00:00.000Z',
      },
      lastLoginAt: {
        type: 'string',
        format: 'date-time',
        example: '2026-04-08T00:00:00.000Z',
      },
      pwdUpdatedAt: {
        type: 'string',
        format: 'date-time',
        example: '2026-04-08T00:00:00.000Z',
      },
    },
  };
}

export function buildSuccessSchemaWithDataRef(
  dataSchemaRef: string,
): OpenApiSchema {
  return {
    allOf: [
      { $ref: SUCCESS_RESPONSE_SCHEMA },
      {
        type: 'object',
        required: ['data'],
        properties: {
          data: { $ref: dataSchemaRef },
        },
      },
    ],
  };
}

export function buildErrorExamples(
  examples: Record<
    string,
    {
      summary: string;
      value: ExampleValue;
    }
  >,
) {
  return {
    'application/json': {
      schema: { $ref: ERROR_RESPONSE_SCHEMA },
      examples,
    },
  };
}

import type { OpenAPIObject } from '@nestjs/swagger';

const SUCCESS_RESPONSE_SCHEMA = '#/components/schemas/SuccessResponse';
const ERROR_RESPONSE_SCHEMA = '#/components/schemas/ErrorResponse';
const PUBLIC_USER_SCHEMA = '#/components/schemas/PublicUser';

type ExampleValue = Record<string, unknown>;
type OpenApiSchema = Record<string, unknown>;

function ensureAuthSchemas(document: OpenAPIObject): void {
  document.components ??= {};
  document.components.schemas ??= {};

  document.components.schemas.SuccessResponse = {
    type: 'object',
    required: ['success', 'statusCode', 'data'],
    properties: {
      success: { type: 'boolean', example: true },
      statusCode: { type: 'integer', example: 200 },
      data: { type: 'object', additionalProperties: true },
    },
  };

  document.components.schemas.ErrorResponse = {
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
      path: { type: 'string', example: '/auth/register' },
    },
  };

  document.components.schemas.PublicUser = {
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

function buildSuccessSchemaWithDataRef(dataSchemaRef: string): OpenApiSchema {
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

function buildErrorExamples(
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

export function patchAuthRegisterOpenApi(document: OpenAPIObject): void {
  ensureAuthSchemas(document);

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
              pwdUpdatedAt: '2026-04-08T00:00:00.000Z',
            },
          },
        },
      },
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
            path: '/auth/register',
          },
        },
        passwordMismatch: {
          summary: 'Password confirmation mismatch',
          value: {
            success: false,
            statusCode: 400,
            message: 'Password confirmation does not match',
            timestamp: '2026-04-08T00:00:00.000Z',
            path: '/auth/register',
          },
        },
      }),
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
            path: '/auth/register',
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
            path: '/auth/register',
          },
        },
      }),
    },
  };
}

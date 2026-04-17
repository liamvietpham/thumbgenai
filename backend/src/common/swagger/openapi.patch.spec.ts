import type { OpenAPIObject } from '@nestjs/swagger';
import { applyOpenApiPatches } from './openapi.patch';

describe('applyOpenApiPatches', () => {
  it('adds documented responses for health, register, logout, and refresh routes', () => {
    const document = {
      openapi: '3.0.0',
      info: {
        title: 'ThumbgenAI API',
        version: '1.0.0'
      },
      paths: {
        '/health': {
          get: {
            responses: {
              '200': {
                description: ''
              }
            }
          }
        },
        '/auth/register': {
          post: {
            responses: {
              '201': {
                description: ''
              }
            }
          }
        },
        '/auth/login': {
          post: {
            responses: {
              '201': {
                description: ''
              }
            }
          }
        },
        '/auth/logout': {
          post: {
            responses: {
              '200': {
                description: ''
              }
            }
          }
        },
        '/auth/refresh': {
          post: {
            responses: {
              '200': {
                description: ''
              }
            }
          }
        }
      },
      components: {
        schemas: {}
      }
    } as OpenAPIObject;

    const patchedDocument = applyOpenApiPatches(document);

    expect(patchedDocument.paths?.['/health']?.get?.responses?.['200']).toMatchObject({
      description: 'Service health status'
    });
    expect(patchedDocument.paths?.['/auth/register']?.post?.responses?.['201']).toMatchObject({
      description: 'User registered successfully',
      headers: {
        'Set-Cookie': {
          schema: { type: 'string' }
        }
      }
    });
    expect(patchedDocument.paths?.['/auth/logout']?.post?.responses?.['200']).toMatchObject({
      description: 'Logout successful',
      headers: {
        'Set-Cookie': {
          schema: { type: 'string' }
        }
      }
    });
    expect(patchedDocument.paths?.['/auth/logout']?.post?.responses?.['401']).toBeDefined();
    expect(patchedDocument.paths?.['/auth/refresh']?.post?.responses?.['200']).toMatchObject({
      description: 'Refresh successful',
      headers: {
        'Set-Cookie': {
          schema: { type: 'string' }
        }
      }
    });
  });
});

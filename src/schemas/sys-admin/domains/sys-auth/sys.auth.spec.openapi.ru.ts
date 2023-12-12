import { OpenApi } from '../../../../core/decorators';
import { NSysAuth } from '../../../../../types/schemas/sys-admin/sys.auth';
import { SysAuthSymbols } from './sys.auth.symbols';
import { Openapi } from '@Packages/Types';

@OpenApi<NSysAuth.Paths>(SysAuthSymbols.SpecOpenapi, {
  signup: (agents) => {
    const { openapi } = agents.baseAgent.specification;

    return [
      {
        post: {
          description: 'Registration user',
          requestBody: {
            description: 'Registration user payload',
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    firstName: {
                      type: 'string',
                      required: true,
                      example: 'John',
                    },
                    middleName: {
                      type: 'string',
                      example: 'Mirovich',
                    },
                  },
                },
              },
            },
          },
          security: openapi.validateResponse,
          responses: {
            201: {
              description: '',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      type: {
                        type: 'string',
                        example: 'OK',
                      },
                      format: {
                        type: 'string',
                        example: 'json',
                      },
                      data: {
                        type: 'object',
                        properties: {
                          userId: {
                            type: 'string',
                            example: '767c9db2-e859-405a-8d3c-fa3054cfb954',
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            400: openapi.validateResponse,
          },
        },
      },
    ];
  },
  login: (agents) => {
    return [];
  },
  logout: (agents) => {
    return [];
  },
  activateAccount: (agents) => {
    return [];
  },
  forgotPassword: (agents) => {
    return [];
  },
  revalidateAccessToken: (agents) => {
    return [];
  },
})
export class SysAuthSpecOpenapiRu {}

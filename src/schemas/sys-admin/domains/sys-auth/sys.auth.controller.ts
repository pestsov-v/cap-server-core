import { setController } from '@Vendor';
import { NSysAuth } from '../../../../../types/schemas/sys-admin/sys.auth';
import { SchemaResponse } from '@Vendor/Types';
import { ResponseType, StatusCode } from '@common';

export const SysAuthController = setController<NSysAuth.Controller>({
  signup: async (request, agents): Promise<SchemaResponse> => {
    return {
      format: 'json',
      statusCode: StatusCode.FOUND,
      responseType: ResponseType.SUCCESS,
      data: {
        any: 'any',
      },
    };
  },
  login: async (request, agents): Promise<SchemaResponse> => {
    return {
      format: 'json',
      statusCode: StatusCode.FOUND,
      responseType: ResponseType.SUCCESS,
      data: {
        any: 'any',
      },
    };
  },
  logout: async (request, agents): Promise<SchemaResponse> => {
    return {
      format: 'json',
      statusCode: StatusCode.FOUND,
      responseType: ResponseType.SUCCESS,
      data: {
        any: 'any',
      },
    };
  },
  forgotPassword: async (request, agents): Promise<SchemaResponse> => {
    return {
      format: 'json',
      statusCode: StatusCode.FOUND,
      responseType: ResponseType.SUCCESS,
      data: {
        any: 'any',
      },
    };
  },
  activateAccount: async (request, agents): Promise<SchemaResponse> => {
    return {
      format: 'json',
      statusCode: StatusCode.FOUND,
      responseType: ResponseType.SUCCESS,
      data: {
        any: 'any',
      },
    };
  },
});

import { Packages, yup } from '@Packages';
const { injectable, inject } = Packages.inversify;

import { IValidatorBaseOperation, NValidatorBaseOperation, SchemaResponse } from '@Core/Types';
import { ResponseType, StatusCode } from '@common';

@injectable()
export class ValidatorBaseOperation implements IValidatorBaseOperation {
  constructor() {}

  public getDefValidateResponse(e: any): SchemaResponse<NValidatorBaseOperation.ResponseData> {
    if (e instanceof yup.ValidationError) {
      return {
        responseType: ResponseType.VALIDATION,
        format: 'json',
        type: 'OK',
        statusCode: StatusCode.BAD_REQUEST,
        data: {
          errors: e.errors,
          message: e.message,
        },
      };
    } else {
      return {
        responseType: ResponseType.ERROR,
        format: 'json',
        type: 'OK',
        statusCode: StatusCode.SERVER_ERROR,
        data: {
          message: 'An unknown error occurred during data validation',
        },
      };
    }
  }
}

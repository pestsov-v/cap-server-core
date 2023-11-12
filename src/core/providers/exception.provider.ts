import { Packages } from '@Packages';
const { injectable } = Packages.inversify;
import { ResponseType, StatusCode } from '@common';

import {
  IExceptionProvider,
  IValidatorError,
  NExceptionProvider,
  NValidatorProvider,
} from '@Core/Types';

class ValidatorError extends Error implements IValidatorError {
  public readonly errors: NValidatorProvider.ErrorResult[];

  constructor(message: string, errors: NValidatorProvider.ErrorResult[]) {
    super(message);

    this.errors = errors;
  }
}

@injectable()
export class ExceptionProvider implements IExceptionProvider {
  public throwValidation(errors: NValidatorProvider.ErrorResult[]): IValidatorError {
    return new ValidatorError('Validation error', errors);
  }

  public resolveValidation(e: IValidatorError): NExceptionProvider.ValidationData {
    return {
      statusCode: StatusCode.BAD_REQUEST,
      payload: {
        responseType: ResponseType.VALIDATION,
        data: { errors: e.errors },
      },
    };
  }
}

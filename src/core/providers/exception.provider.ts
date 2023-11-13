import { Packages } from '@Packages';
const { injectable } = Packages.inversify;
import { ResponseType, StatusCode } from '@common';

import {
  ICoreError,
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

class CoreError extends Error implements ICoreError {
  public readonly namespace: string;
  public readonly tag: string | undefined;
  public readonly requestId: string | undefined;
  public readonly sessionId: string | undefined;
  public readonly trace: string | undefined;
  public readonly msg: string | undefined;

  constructor(message: string, options: NExceptionProvider.CoreError) {
    super(message);

    this.namespace = options.namespace;
    this.tag = options.tag;
    this.requestId = options.requestId;
    this.sessionId = options.sessionId;
    this.trace = this.stack;
    this.msg = this.message;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
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

  public throwError(message: string, options: NExceptionProvider.CoreError): ICoreError {
    return new CoreError(message, options);
  }
}

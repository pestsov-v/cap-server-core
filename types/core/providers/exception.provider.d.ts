import { NValidatorProvider } from './validator.provider';
import { NLoggerService } from '../services';

export interface IExceptionProvider {
  throwValidation(errors: NValidatorProvider.ErrorResult[]): IValidatorError;
  resolveValidation(e: IValidatorError): NExceptionProvider.ValidationData;
  throwError(message: any, options: NExceptionProvider.CoreError): ICoreError;
}

export interface IValidatorError {
  errors: NValidatorProvider.ErrorResult[];
}

export interface ICoreError {
  namespace: string;
  tag?: string;
  requestId?: string;
  sessionId?: string;
  trace?: string;
  msg?: string;
}

export namespace NExceptionProvider {
  export type ValidationData = {
    statusCode: number;
    payload: {
      responseType: string;
      data: {
        errors: NValidatorProvider.ErrorResult[];
      };
    };
  };

  export type CoreError = {
    namespace: string;
    requestId?: string;
    sessionId?: string;
    tag?: string;
    errorType: NLoggerService.ErrorType;
  };
}

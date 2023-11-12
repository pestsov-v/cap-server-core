import { NValidatorProvider } from './validator.provider';

export interface IExceptionProvider {
  throwValidation(errors: NValidatorProvider.ErrorResult[]): IValidatorError;
  resolveValidation(e: IValidatorError): NExceptionProvider.ValidationData;
}

export interface IValidatorError {
  errors: NValidatorProvider.ErrorResult[];
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
}

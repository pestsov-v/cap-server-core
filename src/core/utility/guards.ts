import { IValidatorError } from '@Core/Types';

export class Guards {
  public static isNotUndefined(x: undefined | any): boolean {
    return typeof x !== 'undefined';
  }

  public static isValidationError(x: IValidatorError | unknown): x is IValidatorError {
    return typeof x === 'object' && x !== null && 'errors' in x;
  }

  public static isString(x: string | unknown): x is string {
    return typeof x === 'string';
  }
}

import { ISchemaExceptionError, IValidatorError, NSessionService } from '@Core/Types';

export class Guards {
  public static isNotUndefined(x: undefined | any): boolean {
    return typeof x !== 'undefined';
  }

  public static isValidationError(x: IValidatorError | unknown): x is IValidatorError {
    return typeof x === 'object' && x !== null && 'errors' in x;
  }

  public static isSchemaExceptionError(
    x: ISchemaExceptionError | unknown
  ): x is ISchemaExceptionError {
    return typeof x === 'object' && x !== null && 'isNotResource' in x && 'statusCode' in x;
  }

  public static isString(x: string | unknown): x is string {
    return typeof x === 'string';
  }

  public static isSocketStructure(x: NSessionService.ClientData): x is NSessionService.ClientData {
    return typeof x === 'object' && x !== null && 'event' in x && 'payload' in x;
  }

  public static isSessionEvent(x: string): x is NSessionService.ClientEvent {
    return Object.values(NSessionService.ClientEvent).includes(x as NSessionService.ClientEvent);
  }
}

import {
  ISchemaExceptionError,
  IValidatorError,
  NLocalizationService,
  NSessionService,
} from '@Core/Types';
import ClientEvent = NSessionService.ClientEvent;

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

  public static isSocketStructure(
    x: NSessionService.EventStructure<ClientEvent, string, void> | unknown
  ): x is NSessionService.EventStructure<ClientEvent, string, void> {
    return typeof x === 'object' && x !== null && 'event' in x && 'payload' in x;
  }

  public static isClientHandshake(
    x: NSessionService.ClientHandshakePayload | unknown
  ): x is NSessionService.ClientHandshakePayload {
    return typeof x === 'object' && x !== null && 'userId' in x && 'sessionId' in x;
  }
}

import { IAuthBaseOperation, IValidatorBaseOperation } from '../base-operations';

export interface IBaseOperationAgent {
  readonly validator: NBaseOperationAgent.Validator;
  readonly auth: NBaseOperationAgent.Auth;
}

export namespace NBaseOperationAgent {
  export type Validator = {
    validateOrThrow: IValidatorBaseOperation['validateOrThrow'];
  };

  export type Auth = {
    getNonUnauthorized: IAuthBaseOperation['getFailResponse'];
  };
}

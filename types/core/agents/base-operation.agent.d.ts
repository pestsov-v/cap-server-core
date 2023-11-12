import { IValidatorBaseOperation } from '../base-operations';

export interface IBaseOperationAgent {
  readonly validator: NBaseOperationAgent.Validator;
}

export namespace NBaseOperationAgent {
  export type Validator = {
    validateOrThrow: IValidatorBaseOperation['validateOrThrow'];
  };
}
